---
title: Copy the game starter and publish it
description: Copy the game starter on GitHub and put it on the web, in about ten minutes.
sidebar:
  label: Copy the game starter
  order: 2
---

## Make your copy

1. Sign in to GitHub. Then open the
   **[game starter](https://github.com/family-arcade/arcade-game-starter)**.
2. Click the green **Use this template** button, then **Create a new
   repository**. A repository is your game's home on GitHub. It contains the
   game's code and files.
3. Give your game a name, in small letters with dashes instead of spaces:
   `dragon-dash`. You can change it later.
4. Choose **Public**, then click **Create repository**.

You now have your own repository for the game.

## Put it on the web

1. In your new repository, open **Settings**, the tab with the cog. Then open
   **Pages** in the list on the left.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the **Actions** tab. Click **Deploy to GitHub Pages** on the left.
   Then click **Run workflow**, and click **Run workflow** again. A workflow
   is the set of steps GitHub follows to publish your game.
4. Wait a minute or two for the dot to turn green.

Your game is now at:

```
https://<your-github-name>.github.io/<game-name>/
```

Open it. You should see your game's empty home page: its name, who is
playing, and a **Play together** button. It is empty because you have not
asked for a game yet. Try **Play together** on two devices to check it
works.

:::tip
Bookmark your game's address. On a phone or tablet, add it to the home
screen.
:::

Next: [Connect Claude to your game](/make/ai-helper/).
