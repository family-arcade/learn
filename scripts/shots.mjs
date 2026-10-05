// Screenshots and page checks against a running `astro preview`.
//
//   npm run shots -- / /make/            full-page shots + checks
//   npm run shots -- --figs /            close-ups of figure.fa-shot, .fa-cta
//
// SHOTS_URL sets the base URL (default http://localhost:4370). Shots go to
// shots/ (git-ignored). Exit code is 1 if any check fails.
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = (process.env.SHOTS_URL ?? 'http://localhost:4370').replace(/\/$/, '');
const args = process.argv.slice(2);
const figs = args.includes('--figs');
const paths = args.filter((a) => !a.startsWith('--'));
if (paths.length === 0) {
  console.error('Usage: npm run shots -- [--figs] <page path> [more paths]');
  process.exit(2);
}

const widths = [393, 1180, 1920];
const themes = ['light', 'dark'];
const outDir = 'shots';
await mkdir(outDir, { recursive: true });

const slug = (p) => p.replace(/^\/|\/$/g, '').replace(/[^a-zA-Z0-9]+/g, '-') || 'home';

async function newPage(browser, width, theme) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: theme });
  await page.addInitScript((t) => {
    try { localStorage.setItem('starlight-theme', t); } catch {}
  }, theme);
  return page;
}

// Scroll the whole page so lazy images load, then return to the top.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, window.innerHeight - 100);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

const linkCache = new Map();
async function linkStatus(href) {
  if (!linkCache.has(href)) {
    linkCache.set(
      href,
      fetch(base + href, { redirect: 'follow' }).then((r) => r.status, () => 0),
    );
  }
  return linkCache.get(href);
}

const failures = [];
const rows = [];
const fail = (msg) => failures.push(msg);

const browser = await chromium.launch(); // headless by default
try {
  for (const path of paths) {
    if (figs) {
      for (const width of widths) {
        for (const theme of themes) {
          const page = await newPage(browser, width, theme);
          await page.goto(base + path, { waitUntil: 'networkidle' });
          const els = page.locator('figure.fa-shot, .fa-cta');
          const n = await els.count();
          let brokenTotal = 0;
          for (let i = 0; i < n; i++) {
            const el = els.nth(i);
            await el.scrollIntoViewIfNeeded();
            await page.waitForTimeout(400);
            const broken = await el.evaluate(
              (e) => [...e.querySelectorAll('img')].filter((img) => !img.complete || img.naturalWidth === 0).length,
            );
            brokenTotal += broken;
            await el.screenshot({ path: `${outDir}/${slug(path)}-fig${i}-${width}-${theme}.png` });
          }
          rows.push(`${path} ${width} ${theme}: ${n} figures, ${brokenTotal} broken images`);
          if (brokenTotal) fail(`${path} ${width} ${theme}: ${brokenTotal} broken images in figures`);
          await page.close();
        }
      }
      continue;
    }

    const checkedLinks = new Set();
    for (const width of widths) {
      for (const theme of themes) {
        const page = await newPage(browser, width, theme);
        const res = await page.goto(base + path, { waitUntil: 'networkidle' });
        if (!res || !res.ok()) fail(`${path}: page returned ${res ? res.status() : 'no response'}`);
        await scrollThrough(page);
        await page.screenshot({ path: `${outDir}/${slug(path)}-${width}-${theme}.png`, fullPage: true });

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        const brokenImgs = await page.evaluate(() =>
          [...document.querySelectorAll('img')]
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.currentSrc || img.src),
        );
        let badLinks = [];
        // Links are the same at every width and theme: check them once per page.
        if (checkedLinks.size === 0) {
          const hrefs = await page.evaluate(() => [
            ...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'))),
          ]);
          for (const href of hrefs) {
            checkedLinks.add(href);
            const status = await linkStatus(href.split('#')[0] || '/');
            if (status < 200 || status >= 300) badLinks.push(`${href} (${status})`);
          }
          checkedLinks.add('');
        }

        rows.push(
          `${path} ${width} ${theme}: overflow ${overflow}, broken images ${brokenImgs.length}` +
            (badLinks.length ? `, broken links ${badLinks.length}` : ''),
        );
        if (overflow > 0) fail(`${path} ${width} ${theme}: horizontal overflow ${overflow}px`);
        for (const src of brokenImgs) fail(`${path} ${width} ${theme}: broken image ${src}`);
        for (const l of badLinks) fail(`${path}: broken link ${l}`);
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}

console.log(rows.join('\n'));
console.log(`\nShots in ${outDir}/`);
if (failures.length) {
  console.log(`\nFAILED: ${failures.length} problem(s)`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log(
  figs
    ? `\nOK: ${paths.length} page(s), no broken images in figures`
    : `\nOK: ${paths.length} page(s), no overflow, broken images or broken links (${linkCache.size} internal links checked)`,
);
