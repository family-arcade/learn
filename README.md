# learn.familyarcade.eu

The documentation site for the Family Arcade: how the arcade works, a page for
parents, and a step-by-step guide to making a game with your child and an AI
helper. Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build). Search runs in the browser
(Pagefind); the site loads nothing from other websites.

Needs Node 22.12 or newer.

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # static site in dist/
    npm run preview  # serve dist/ at http://localhost:4370
    npm run shots -- / /make/   # screenshots and page checks, see below

## Coding agents (Claude Code, Codex)

The agent setup is in the repo, so it works for anyone who clones it. This
site needs no MCP servers.

- **Instructions**: `AGENTS.md` holds the writing and picture rules and how
  to check a change. `CLAUDE.md` only imports it (`@AGENTS.md`) and Codex
  reads `AGENTS.md` directly, so there is one copy to keep.
- **Screenshots and page checks**: `scripts/shots.mjs`, run as
  `npm run shots -- <page paths>` against a running `npm run preview`. It
  takes headless full-page shots at 393, 1180 and 1920px in light and dark
  into `shots/` (git-ignored) and checks overflow, broken images and broken
  internal links. `--figs` takes close-ups of each picture. `SHOTS_URL`
  sets the address (default `http://localhost:4370`).

What a developer brings:

- Node 22.12 or newer.
- Chromium for Playwright. After `npm install`, run
  `npx playwright install chromium` once.
- Optionally, a headless browser MCP server of their own, for looking at
  pages by hand.

Deploying needs the owner's server access. `scripts/deploy.sh` calls
`deploy-static.sh` from a separate `hetzner-ops-familyarcade` checkout at
`~/code/hetzner-ops-familyarcade`, which uploads to the owner's server over
SSH. Without that checkout and access it fails: anyone else can build and
check the site, and the owner deploys it.

## Deploy

    npm run build
    npm run deploy   # scripts/deploy.sh

The script uploads `dist/` with `~/code/hetzner-ops-familyarcade/scripts/deploy-static.sh`,
which Caddy serves from /opt/static/learn.familyarcade.eu/.

## Licence

Content CC BY 4.0, code MIT. See LICENSE. The rounded font is under the SIL OFL
(src/assets/fonts/OFL.txt). The pixel font, Press Start 2P, is bundled from
`@fontsource/press-start-2p` under the SIL OFL (LICENSE-press-start-2p).
