---
title: When something breaks
description: What to do when the game, the publishing or Claude gets stuck.
sidebar:
  order: 8
---

Things break. That is normal, and almost always easy to fix.

## The game shows a white screen or does not start

Tell Claude exactly what you see:

> The game shows a white screen since the last change. Please find out why,
> fix it, and run the tests and the build.

## The change does not show up on the web

- Did you **merge** the pull request? A change only goes live after the merge.
- Look at the **Actions** tab on GitHub. A red cross means the tests or the
  build failed and nothing was published. Copy the red error into Claude:

  > Publishing failed with this error: (paste). Please fix it.

- Reload the page. On a phone or tablet, close the game and open it again.

## Play together does not connect

- Both devices need internet.
- The codes are 4 letters; check them again.
- Some school or office networks block it. Try home wifi or mobile data.
- If the person who made the code leaves, the others see **Connection lost**.
  Tap **Leave** under **Room**, then start again with a new code.

## Claude says it has reached a limit

The plan has a usage limit that resets after a few hours. Take a break, play
the game, and write down what to change next.

## The game got worse and you want the old one back

Every merged change is kept. Ask:

> Undo the last change, the one that made the dragon too fast.

Or on GitHub, open the pull request you merged and click **Revert**.

## Still stuck?

Ask Claude to explain, in simple words, what it thinks is wrong. If it
seems to be the starter itself, tell us (see [About](/about/)).
