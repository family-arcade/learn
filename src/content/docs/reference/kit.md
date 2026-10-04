---
title: Arcade kit reference
description: The arcade kit's API, for grown-ups who read code and for AI helpers.
sidebar:
  label: Arcade kit
  order: 1
---

The kit lives in `src/arcade/` in every game made from the starter template. It is the
only part of a game that knows about the arcade. Import `arcade` from it.
Leave the folder itself unchanged so it can be updated.

```ts
import { arcade } from './arcade';
```

## The current player

```ts
arcade.player();                         // { name, colour: '#rrggbb' } or null
await arcade.ui.ensurePlayer(document.body);   // shows "Who's playing?" if nobody yet
arcade.setPlayer({ name: 'Klara', colour: '#e0405f' });
```

When the arcade opens a game, it hands over the player in the link. See [How
the Family Arcade works](/how-it-works/#opening-a-friends-game). The kit reads
the player before your code runs, so `arcade.player()` already has them.

## Saving progress

```ts
arcade.save('best', 12);                 // any JSON value, per player, per game
arcade.load<number>('best');             // 12, or undefined if never saved
arcade.save('best', undefined);          // removes it
```

Saves stay in the browser. Each game can use up to 100 KB in all. `save`
throws a clear error above that limit. Every game on one GitHub account shares
one web address (`<name>.github.io`). The kit therefore keys every save by the
game's `id` from `public/arcade.json`. Keep the `id` stable, or the game
forgets its saves.

## Play together

The quickest way is the kit's own panel. It has **Play together**, **Make a
code**, **I have a code**, who is here and **Leave**.

```ts
const panel = arcade.ui.togetherPanel(container);
panel.onRoom((room) => {
  if (!room) return;                     // null when we leave
  room.people;                           // [{ id, name, colour, isHost, me }]
  room.onPeople((people) => {});
  room.onMessage((msg, fromId) => {});
  room.onStatus((status) => {});         // 'waiting' | 'connected' | 'reconnecting' | 'error' | 'left'
  room.send({ type: 'move', x: 3 });     // guest to host, or host to everyone
  room.sendTo(id, { type: 'hello' });    // host only
});
```

Or without the panel:

```ts
const room = await arcade.together.host();       // room.code is the 4 letters
const room = await arcade.together.join('ABCD');
room.leave();
```

- Up to 4 devices: a host and up to 3 guests.
- **The host runs the game.** Guests send what their player does. The host
  sends back what happens. That keeps everyone's game the same.
- Messages are plain JSON objects, at most 16 KB each. Send positions and
  scores, not pictures.
- Every message is checked when it arrives. Anything else is dropped.

## Returning to the arcade

```ts
arcade.cameFromArcade();   // true if the arcade opened this game, in this tab
arcade.backToArcade();     // go back; does nothing otherwise
```

## Game card file

The game's card is the file `public/arcade.json`.

```json
{
  "id": "dragon-dash",
  "title": "Dragon Dash",
  "players": { "min": 1, "max": 4 },
  "colour": "#5b2fb0",
  "blurb": "Fly through the clouds, collect gems, dodge the thunder.",
  "facts": ["1–4 players", "Play together with a code", "About 3 min"]
}
```

The arcade reads `title` and `colour` when a family adds the game. White text
on `colour` must reach a 4.5:1 contrast. A test checks it. `id` is small
letters, numbers and dashes.
