// The one gate to run and quote: `npm run gates`.
// Builds the site, runs `npm run shots -- /` when a preview answers at
// SHOTS_URL (default http://localhost:4370), logs everything to files (never
// piped), compares with gates-baseline.json and prints ONE GATES line.
// Exit 1 on a regression. `npm run gates -- --update-baseline` rewrites the
// baseline after an intended change; say in the commit why it moved.
import { spawnSync } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const baselinePath = join(root, 'gates-baseline.json')
const update = process.argv.includes('--update-baseline')
const shotsUrl = process.env.SHOTS_URL || 'http://localhost:4370'

const logDir = join(tmpdir(), `gates-learn-${new Date().toISOString().replace(/[:.]/g, '-')}`)
mkdirSync(logDir, { recursive: true })
const hasHeavy = spawnSync('sh', ['-c', 'command -v heavy'], { encoding: 'utf8' }).status === 0

/** Run a shell command with stdout+stderr going to a file. */
function step(name, kind, cmd) {
  const file = join(logDir, `${name}.log`)
  const fd = openSync(file, 'w')
  const full = hasHeavy ? ['heavy', 'run', '--kind', kind, '--', 'sh', '-c', cmd] : ['sh', '-c', cmd]
  const r = spawnSync(full[0], full.slice(1), { cwd: root, stdio: ['ignore', fd, fd] })
  closeSync(fd)
  return { file, exit: r.status ?? 1, text: readFileSync(file, 'utf8') }
}

const reachable = async () => {
  try {
    const r = await fetch(shotsUrl, { signal: AbortSignal.timeout(3000) })
    return r.ok
  } catch {
    return false
  }
}

const build = step('build', 'build', 'npm run build')
const pagesMatch = build.text.match(/(\d+) page\(s\) built/)
const pages = pagesMatch ? Number(pagesMatch[1]) : null

let shots = 'skipped'
let shotsStep = null
if (await reachable()) {
  shotsStep = step('shots', 'shots', 'npm run shots -- /')
  shots = shotsStep.exit === 0 && /^OK:/m.test(shotsStep.text) ? 'pass' : 'fail'
} else {
  console.log(`Note: no preview at ${shotsUrl}; shots skipped (start \`npx astro preview --port 4370\` or set SHOTS_URL).`)
}

const cur = { build: build.exit === 0 ? 'ok' : 'fail', pages, shots }

console.log('Full logs:')
console.log(`  ${build.file}`)
if (shotsStep) console.log(`  ${shotsStep.file}`)

if (update) {
  if (cur.build !== 'ok' || pages == null || shots === 'fail') {
    console.log('GATES FAIL · not updating the baseline: the build or shots failed or did not parse')
    process.exit(1)
  }
  const old = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : {}
  // A skipped shots run must not erase a known-good result.
  writeFileSync(baselinePath, JSON.stringify({ ...cur, shots: shots === 'skipped' ? (old.shots ?? 'skipped') : shots }, null, 2) + '\n')
  console.log(`Baseline written to ${baselinePath}`)
}

const base = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : null
const bad = []
const mark = (ok, text, label) => {
  if (!ok) bad.push(label)
  return ok ? text : `${text} ✗`
}
const parts = [
  mark(cur.build === 'ok', `build ${cur.build === 'ok' ? 'ok' : `FAILED (exit ${build.exit})`}`, 'build'),
  mark(pages != null && (!base || pages >= base.pages), `pages ${pages ?? '?'} (base ${base?.pages ?? '?'})`, 'pages'),
  mark(shots !== 'fail', `shots ${shots}${shots === 'skipped' ? ' (no preview)' : ''}`, 'shots'),
]
if (!base) bad.push('baseline missing (run with --update-baseline)')
console.log(`GATES ${bad.length ? 'FAIL' : 'ok'} · ${parts.join(' · ')}`)
process.exit(bad.length ? 1 : 0)
