# Rules for working on the Family Arcade guide

learn.familyarcade.eu: an Astro Starlight site for families. Readers are a
parent and a child (about 8 to 12) reading together, often aloud; most have
never used GitHub. The "For parents" page is for adults and must be just as
plain. These rules come from the owner's own review of the guide.

## Titles and headings

- Say exactly what the page or section covers. "How the Family Arcade
  works", never "How it works"; "About the Family Arcade", never "About".
- No questions ("Still stuck?") and no "What/Who…" phrasing ("What it
  costs" → "Costs", "Who your child can play with" → "Playing with others").
- Short enough not to wrap: a page title on one line at 1180px wide, a
  sidebar label on one line. Give a long title a short `sidebar.label`.
- Name the action, not the mechanism: "Start from the template", not "Copy
  the game starter and publish it".

## Names

- Name things what they are. It is "the starter template", or "the
  template" once the page has said "starter template". Never "the starter"
  or "the game starter".
- Use the product's own name: Claude Code, Codex, GitHub Pages, the Family
  Arcade.

## Sentences

- Put the point first; conditions come after it or in the next sentence.
- One idea per sentence. Split long ones.
- No stuffed parentheses or chains of qualifiers. An age limit or a
  condition gets its own sentence or a table row.
- No dangling words: "a grown-up's account", not "the grown-up's".
- Explain a new word the first time, in a few words: repository, branch,
  pull request, merge, workflow.
- Warm and calm; no hype. No rhetorical "not just X but Y"; one example
  where one is enough.
- Set expectations honestly. The first game is basic on purpose; say so
  wherever the first game comes up.

## How a game gets built

- Explain the path early, before the steps use it: repository → branch →
  you look at it → pull request → merge → GitHub publishes → live. Say on
  the development pages, not only on the problems page, that a change only
  goes live after the merge.
- Making the first game and publishing it are separate pages. Publishing
  (turning on GitHub Pages) comes after the first game is merged.

## Example prompts

- Every example ask, anything a family would say or type to Claude, is a
  `<Prompt>` card (`src/components/Prompt.astro`), never a Markdown
  blockquote: a blockquote reads as a quotation. The page must be `.mdx`.
- One ask per card, with two or three changes at most.
- Keep a custom Prompt `label` to about 14 letters (the default is "Say or
  type"). It is in the pixel font, and the label and Copy button must stay
  on one row at 393px.

## Steps

- One action per step. If a step needs several clicks, make them numbered
  sub-steps under it.
- Name the exact button or tab. When GitHub shows an icon for it, show the
  icon too, using GitHub's real Octicons (`src/components/GhIcon.astro`;
  add icons from `@primer/octicons`, MIT, credited in `LICENSE-octicons`).

## Pictures and diagrams

- Show only real things: real games, real pages. Never a made-up game or a
  fake account in a screenshot.
- A game made to show what Claude gives is captioned truthfully: what was
  asked, and that nothing was changed afterwards. Images are webp, sized for
  the page.
- A concept with moving parts gets a diagram (`src/components/ArcadeDiagram.astro`
  style: inline SVG, narrow so it reads on a phone, themed for light and
  dark). Introduce one idea at a time: the first diagram on a page shows
  only what that page starts with.

## Readability and contrast

- Everything readable in dark and light mode, at 393px, 1180px and 1920px:
  body text, links, asides, tables, code, the sidebar, the search box and
  the Previous / Next links at the bottom of each page. Text contrast at
  least 4.5:1 (3:1 for large headings).
- Text 17px or larger for body copy; nothing smaller than 14px.
- The pixel font, Press Start 2P (`var(--fa-pixel)`), is an accent only:
  the front-page kicker, the step-number coins and the Prompt card's label.
  Never body text, a whole heading, a button, or words a child reads aloud.
  Use 14px, never more than 16px, and check it neither wraps nor overflows
  at 393px.

## Facts and promises

- Every claim about privacy, ages, prices, accounts, hosting and what is
  stored must be true today. Rewording is fine; dropping a caveat or adding
  a new promise is not. "Might one day" is the most a future feature gets.
- The arcade promises "No ads. No tracking." Say no tracking, never "no
  analytics".
- Playing together goes through the Family Arcade: friends open the game in
  their own Family Arcade, with their own player. Devices find each other
  through the Family Arcade's own connection service, on our server in
  Germany, which passes only the first hello and keeps no log. Then the
  game's data goes directly between the devices. No other matchmaking
  service is named.
- Voice: Claude Code on the web has no voice mode. Suggest only the
  device's own dictation, or voice mode in the Claude app to talk an idea
  through before building. The Claude account is a grown-up's, and the
  grown-up stays with the child.
- Contact: mario@knyflores.com.

## Checking a change

```
mise x node@22 -- npm run build
mise x node@22 -- npx astro preview --port 4370
mise x node@22 -- npm run shots -- <page paths>
```

`npm run shots` needs the preview running. Set `SHOTS_URL` if it is on
another port. It takes full-page shots of each page at 393px, 1180px and
1920px, in light and dark, and writes them to `shots/`. It also checks
each page for horizontal overflow, broken images and broken internal
links, and exits non-zero if any check fails. Add `--figs` for close-ups
of each picture and call-to-action card.

Then open the shots for every changed page and say what you see. The
script cannot judge contrast, wrapping or layout. Deploy with
`scripts/deploy.sh` (the server keeps no access log).
