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

## Steps

- One action per step. If a step needs several clicks, make them numbered
  sub-steps under it.
- Name the exact button or tab. When GitHub shows an icon for it, show the
  icon too, using GitHub's real Octicons (`src/components/GhIcon.astro`;
  add icons from `@primer/octicons`, MIT, credited in `LICENSE-octicons`).

## Pictures and diagrams

- Show only real things: real games, real pages. Never a made-up game or a
  fake account in a screenshot.
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

## Facts and promises

- Every claim about privacy, ages, prices, accounts, hosting and what is
  stored must be true today. Rewording is fine; dropping a caveat or adding
  a new promise is not. "Might one day" is the most a future feature gets.
- The arcade promises "No ads. No tracking." Say no tracking, never "no
  analytics".
- Contact: mario@knyflores.com.

## Checking a change

```
mise x node@22 -- npm run build
mise x node@22 -- npx astro preview --port 4370
```

Then look at every changed page in a real browser at the three widths, in
both themes, and say what you see. Deploy with `scripts/deploy.sh` (the
server keeps no access log).
