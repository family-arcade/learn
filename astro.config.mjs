import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://learn.familyarcade.eu",
  output: "static",
  // Pages that moved keep their old address working.
  redirects: {
    "/make/first-change/": "/make/first-game/",
  },
  integrations: [
    starlight({
      title: "Family Arcade",
      description: "How the Family Arcade works, and how to make a game with your kids and an AI helper.",
      defaultLocale: "en",
      lastUpdated: false,
      // The arcade is dark by default: set the theme before Starlight reads it.
      head: [
        {
          tag: "script",
          content:
            "try{if(!localStorage.getItem('starlight-theme'))localStorage.setItem('starlight-theme','dark')}catch(e){}",
        },
      ],
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        // A page's sections sit under it in the left sidebar; no right column.
        Sidebar: "./src/components/Sidebar.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
        TwoColumnContent: "./src/components/TwoColumnContent.astro",
        // The front page opens like the arcade: awning, bulbs, a night card.
        Hero: "./src/components/Hero.astro",
        // Previous / Next, then the Impressum link on every page.
        Footer: "./src/components/Footer.astro",
      },
      // Sections listed in the sidebar: a page's h2 headings.
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      // Press Start 2P (SIL OFL, see LICENSE-press-start-2p) is bundled from
      // npm, Latin only, for a few pixel-font accents.
      customCss: ["@fontsource/press-start-2p/latin-400.css", "./src/styles/arcade.css"],
      sidebar: [
        { label: "For parents", slug: "parents" },
        { label: "How the arcade works", slug: "how-it-works" },
        { label: "Make a game", items: [{ autogenerate: { directory: "make" } }] },
        { label: "Game ideas and prompts", slug: "ideas" },
        { label: "Advanced", items: [{ autogenerate: { directory: "advanced" } }] },
        { label: "Reference", items: [{ autogenerate: { directory: "reference" } }] },
        { label: "About the Family Arcade", slug: "about" },
      ],
    }),
  ],
});
