---
title: For parents
description: What the Family Arcade is, what it keeps about your child, who they can play with, and how to help them make a game.
---

The Family Arcade is a small collection of browser games one family made
together, plus a way for other families to make their own and play them
together. It runs at [familyarcade.eu](https://familyarcade.eu) on a server in
Germany. It is free, has no ads, and is not a business.

This page covers what you will want to know before your child uses it.

## What it keeps about your child

**A player name and their scores, on your device only.** When your child makes
a player, the name, their tickets and wins, and their recent games are saved
in the browser of that phone, tablet or computer. Nothing is sent to us, and
there is no account, email address, birthday or photo. Clearing the site's
data in the browser erases it.

**Nothing on our server.** The server only hands out the arcade's files. It
keeps no log of who visited and runs no analytics, ads or trackers.

Because players live on each device, the same child on two devices is two
separate players. Syncing players across a family's devices needs accounts,
which are planned for later and will be run by a parent, never by a child.

## Who your child can play with

**Only people who have your code.** To play together, one device shows four
letters and the others type them in. There is no public list of games, no
search for players, and no chat. Someone your child has never met cannot find
them.

**Directly, device to device.** Once connected, game moves (and video or voice,
if you turn them on) travel straight between the devices, not through a
server. To find each other, devices use a free matchmaking service (PeerJS)
and public helpers from Google and Twilio. Those see the devices' internet
addresses for a moment, not names or games.

**Calls are off until tapped.** Voice and video calls work between two devices.
The camera and microphone stay off until someone taps them, the browser asks
permission every time, and nothing is recorded.

:::tip[Share codes in person or by message to people you know]
Anyone with the four letters can join while the game is open. Treat them like
a house key: family and friends only.
:::

## Games from friends

Families can make their own games and add each other's to the arcade by link.
Those games live on the other family's own website (usually GitHub Pages),
not on ours.

- Opening one hands the game your child's player name and colour, inside the
  link. That part of a link stays in the browser; it is never sent to a
  server.
- The website that hosts the game sees the visit, like any website.
- What the game does is up to the family who made it. Games made from our
  starter follow [rules](/reference/rules/) (no ads, no trackers, nothing
  loaded from other websites, no chat), and the AI helper is told to keep
  them, but nobody checks other families' games.

Only add games from people you know.

## Ages and accounts

Playing in the arcade needs no account at any age.

Making a game needs two accounts, and both have age limits:

| Account | What it is for | Minimum age |
|---|---|---|
| GitHub (free) | keeps the game's code and puts it on the web | 13 |
| Claude, Pro plan or higher | the AI helper that writes the code | 18 |

So for younger children, the accounts are yours and you build together: your
child has the ideas and plays, you type and press the buttons. That is also
the best way to do it. Teenagers can use a free [GitHub](https://github.com)
account and, instead of Claude, Codex in ChatGPT (free plan, for now; 13+ with
a parent's permission under 18) or GitHub Copilot Free (13+).

## What it costs

| | |
|---|---|
| Playing the arcade | free |
| GitHub and its web hosting | free |
| Claude with Claude Code | a paid plan (Pro or higher), monthly |
| Codex in ChatGPT, GitHub Copilot Free | free, with limits |

A long building session can hit the AI plan's usage limit; it resets after a
few hours. That is a natural break.

## Helping your child make a game

- **Let them decide.** What the game is about, what to change next, whether
  it is fun. You type, read Claude's answers aloud if needed, and press merge.
- **Play after every change.** Small steps, played straight away, beat big
  plans. "What should we change next?" is the whole loop.
- **Words, not code.** Your child says how it should feel ("bouncier", "less
  scary", "the dragon is too fast") and Claude works out the code.
- **First names only.** Nothing else about your child belongs in a game.
- **Stop while it is fun.** An hour is plenty for a first session.

Start with [Make a game](/make/).

## What does not exist yet

We say what is true today and mark what is not:

- a grown-up lock on video calls;
- a play-time limit;
- accounts for parents, to keep a family's players in sync across devices;
- a gallery of games from families you do not know (with checks before
  anything is listed).

## Questions

If something here is unclear or you think something is wrong, tell us; we
will fix it. See [About](/about/) for how to reach us.
