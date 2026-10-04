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

## Deploy

    npm run build
    npm run deploy   # scripts/deploy.sh

The script uploads `dist/` with `~/code/hetzner-ops-familyarcade/scripts/deploy-static.sh`,
which Caddy serves from /opt/static/learn.familyarcade.eu/.

## Licence

Content CC BY 4.0, code MIT. See LICENSE. The rounded font is under the SIL OFL
(src/assets/fonts/OFL.txt). The pixel font, Press Start 2P, is bundled from
`@fontsource/press-start-2p` under the SIL OFL (LICENSE-press-start-2p).
