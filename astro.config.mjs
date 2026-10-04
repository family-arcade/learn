import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://learn.familyarcade.eu",
  output: "static",
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
      },
      customCss: ["./src/styles/arcade.css"],
      sidebar: [
        { label: "For parents", slug: "parents" },
        { label: "How it works", slug: "how-it-works" },
        { label: "Make a game", items: [{ autogenerate: { directory: "make" } }] },
        { label: "Ideas and prompts", slug: "ideas" },
        { label: "Reference", items: [{ autogenerate: { directory: "reference" } }] },
        { label: "About", slug: "about" },
      ],
    }),
  ],
});
