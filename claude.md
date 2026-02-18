# CLAUDE.md — Hole.io Game: Complete Project Reference

> Full development history, architecture, and technical reference for the hole.io browser game built across multiple Claude Code sessions.

---

## Project Overview

A browser-based hole.io-style game built with **Three.js** (WebGL) and vanilla JavaScript. The player controls a hole that swallows increasingly larger items, growing with each one. Features two hand-crafted maps, a custom map editor, score persistence, and a modular ES module architecture.

**Live URL**: https://hole-io-game.vercel.app/
**GitHub**: https://github.com/ahsanullahbughio/hole-io-game
**Dev Server**: `python3 -m http.server 8080` → http://localhost:8080
**Session Author**: @ahsanullahbughio
**AI Tool**: Claude Code (Sonnet 4.5 → Sonnet 4.6)

---

## File Structure

```
first project/
├── index.html          # Main game UI shell (~404 lines, all logic in js/)
├── admin.html          # Map editor UI (~1247 lines)
├── game.html           # Original falling-items catch game (Phase 1, standalone)
├── CLAUDE.md           # This file
├── README.md           # Public-facing project docs
├── vercel.json         # Vercel static deployment config
├── deploy.sh           # Vercel CLI helper script
├── .gitignore
├── .vercelignore
└── js/
    ├── constants.js    # All shared constants, zone types, item defs (~158 lines)
    ├── maps.js         # Map builders, tile grid, zone queries (~250 lines)
    ├── factories.js    # All 3D object factory functions (~903 lines)
    └── game.js         # Core game engine, loop, input, scoring (~775 lines)
```

**Total codebase**: ~3,737 lines across all files.

---

## Tech Stack

| Layer | Technology |
|---|---|
| 3D Rendering | Three.js v0.160.0 (CDN, loaded as global) |
| Language | Vanilla JavaScript (ES Modules, `type="module"`) |
| Module System | Native ES Modules (`import`/`export`) |
| Persistence | localStorage |
| Maps | Tile-based 40×40 grid (2400×2400 world units) |
| Dev Server | Python `http.server 8080` |
| Deployment | Vercel (via GitHub auto-deploy) |
| Version Control | Git + GitHub CLI (`gh`) |

---

## Development History

### Phase 1 — Falling Items Catch Game (`game.html`)

**Request**: *"Build a browser game where Saudi items fall from the sky. Player moves a basket with arrow keys. Miss 3 = game over."*

- HTML5 Canvas 2D, `requestAnimationFrame` game loop
- Falling Saudi emoji items: 🌴 dates, 🍰 kleeja, ⚔️ swords, ☕ coffee pots
- Screen shake on miss, fireball power-up (spacebar), extra life bonus
- Lives system, score tracking, gravity physics

This file (`game.html`) still exists in the repo as a standalone game.

---

### Phase 2–3 — Hole.io Clone, Canvas 2D

**Request**: *"Make a hole.io game — isometric 3D, Saudi market theme, 60-second timer, score as % eaten."*

- Custom isometric projection (`w2s(wx, wy)` → screen coords)
- 4-tier object system (tiny → huge), progressive hole growth
- NPC wandering + flee AI
- 40×40 tile zone map: road, sand, market, spice, textile, food, plaza, parking
- Virtual joystick (touch + mouse), zone-colored ground

---

### Phase 4 — Three.js Rewrite

**Request**: *User shared hole.io screenshot: "Use a graphics library and make elements proper 3D sprites."*

Complete rewrite:
- `WebGLRenderer` with PCF soft shadows
- `OrthographicCamera` at 45° isometric angle (`position.set(150, 150, 150)`)
- Custom 3D object factories (all geometry from Three.js primitives)
- Hemisphere + Directional lighting with shadow maps
- Canvas-texture-mapped ground plane
- Particle burst system on swallow (3D `SphereGeometry` particles)

---

### Phase 5 — Time Bonus System

**Request**: *"Add +5 and +10 second time bonuses."*

- `bonus5`: Green glowing clock mesh (radius 10, isBonus: true)
- `bonus10`: Golden hourglass mesh (radius 22, isBonus: true)
- Bob/spin animation, CSS floating `+Xs` popup, green particle burst
- Excluded from score percentage (`totalItems` only counts non-bonus objects)

---

### Phase 6–7 — Multi-Map System + NYC Map

**Request**: *"Add home screen with score history. Add New York City map. Fix edge accessibility bug."*

**Edge Bug Fix**:
```javascript
// OLD — prevented 100% completion (corner items unreachable):
hole.worldX = Math.max(hole.radius, Math.min(W - hole.radius, hole.worldX));

// NEW — 30% overshoot tolerance:
hole.worldX = Math.max(-hole.radius * 0.3, Math.min(W + hole.radius * 0.3, hole.worldX));
```

**Map config system** (`MAPS` object in maps.js): each map declares `id`, `name`, `subtitle`, `buildMap`, `types`, `spawn`, `zoneColors`, `skyColor`, `fogColor`, `itemTheme`.

NYC map features: Manhattan grid (avenues every 8 tiles, streets every 5 tiles), Central Park, Times Square, Chinatown, Little Italy, SoHo, Waterfront zones. 29 unique NYC 3D objects.

---

### Phase 8 — Major Refactoring (Modular Architecture)

**Request**: *"Refactor the single-file index.html into separate JS modules."*

Extracted from monolithic `index.html` (~2796 lines) into 4 ES modules:

| File | Contents |
|---|---|
| `js/constants.js` | W, T, SCALE, TILES_N, game tuning params, zone type IDs (Z_ROAD..Z_PARKING), TYPES_SOUQ, SPAWN_SOUQ, TYPES_NY, SPAWN_NY, ALL_ITEM_TYPES, zone color palettes |
| `js/maps.js` | `buildMapSouq()`, `buildMapNY()`, `getAllMaps()`, `zoneAt()`, `randomPosInZone()`, custom map CRUD via localStorage (`holeGame_customMaps`) |
| `js/factories.js` | All 58 factory functions (29 Souq + 29 NYC), `FACTORIES_SOUQ`, `FACTORIES_NY`, `ALL_FACTORIES` exports. THREE accessed as CDN global. |
| `js/game.js` | `initThree()`, `initGame()`, `startGame()`, `endGame()`, `quitGame()`, game loop, input/joystick, NPC updates, collision/swallow, HUD, score persistence |

`index.html` reduced to ~404 lines: HTML structure + CSS + thin `<script type="module">` glue.

**THREE.js loading order** (critical):
```html
<!-- CDN global BEFORE module scripts -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script type="module">
  import { getAllMaps } from './js/maps.js';
  import { startGame, quitGame, ... } from './js/game.js';
  // ...
</script>
```

---

### Phase 9 — Admin Map Editor (`admin.html`)

**Request**: *"Create a map editor where I can create and edit custom maps."*

Full dark command-center UI (1247 lines):

- **Left panel**: Mode toggle (Tiles / Items), zone palette (8 color-coded zone buttons), item palette with emoji + tier
- **Center canvas**: 40×40 tile painter with Paint/Erase/Brush Size/Zoom/Fill/Undo toolbar
- **Right panel**: Mini-map preview canvas, map settings (name, subtitle, sky color, item theme, zone color pickers, spawn count sliders)
- **Modals**: New Map (name/subtitle/base layout), Load Map (dropdown of saved custom maps)
- **Keyboard shortcuts**: `Ctrl+S` save, `Ctrl+Z` undo, `P` paint, `E` erase, `T` tile mode, `I` items mode
- **UX**: Toast notifications, Saved/Unsaved status pill
- Custom maps saved to `localStorage` key `holeGame_customMaps`, appear as blue-tinted cards on home screen

---

### Phase 10 — Quit Button + 100% Win Condition

**Request**: *"User should be able to quit a game in the middle and also game ends if user eats 100% items or time runs out."*

**Changes in `js/game.js`**:

```javascript
// Three possible end reasons
let gameEndReason = 'time'; // 'time' | 'complete' | 'quit'

// 100% win — checked inside updateCollisions() after each score++:
if (score >= totalItems) {
  gameEndReason = 'complete';
  endGame();
  return;
}

// Time out — inside updateTimer():
if (gameTime <= 0) { gameTime = 0; gameEndReason = 'time'; endGame(); }

// Quit — exported function called from UI:
export function quitGame() {
  if (!gameRunning) return;
  gameEndReason = 'quit';
  endGame();
}

// endGame() shows contextual headline:
// 'complete' → "Perfect!" (green) + "You ate everything! 🎉"
// 'quit'     → "Quit"     (amber) + "You devoured"
// 'time'     → "Time's Up!" (amber) + "You devoured"

// startGame() always resets:
gameEndReason = 'time';
```

**Changes in `index.html`**:
- `<button id="quitBtn">✕ Quit</button>` added to HUD
- `<h1 id="gameOverHeadline">` and `<div id="gameOverSubtitle">` for dynamic text
- Quit button wired: `document.getElementById('quitBtn').addEventListener('click', () => quitGame())`
- Restart button uses dynamic import to get live `currentMapId`:
  ```javascript
  document.getElementById('restartBtn').addEventListener('click', () => {
    import('./js/game.js').then(mod => mod.startGame(mod.currentMapId));
  });
  ```

---

## Architecture Reference

### Constants (`js/constants.js`)

```javascript
// World geometry
export const W = 2400;          // World size (world units)
export const T = 60;            // Tile size (world units)
export const TILES_N = 40;      // Grid = 40×40 tiles
export const SCALE = 10;        // Three.js: 1 unit = 10 world units

// Hole tuning
export const HOLE_R0 = 14;      // Starting radius
export const HOLE_RMAX = 110;   // Max radius
export const HOLE_SPD = 65;     // Movement speed
export const GROW = 0.16;       // Grow per item swallowed
export const SWALLOW = 0.85;    // Object must be < hole.radius × 0.85 to be swallowed

// Camera
export const CAM_L = 3.5;       // Camera lerp speed
export const ZM_L = 1.8;        // Frustum lerp speed
export const FRUSTUM_MIN = 55;  // Starting frustum (zoomed in)
export const FRUSTUM_MAX = 130; // Max frustum (zoomed out)

// Game
export const DUR = 60;          // Game duration (seconds)

// Zone type IDs
export const Z_ROAD    = 0;
export const Z_SAND    = 1;
export const Z_MARKET  = 2;
export const Z_SPICE   = 3;
export const Z_TEXTILE = 4;
export const Z_FOOD    = 5;
export const Z_PLAZA   = 6;
export const Z_PARKING = 7;
```

---

### Maps (`js/maps.js`)

**Key exports**:
- `buildMapSouq()` — fills module-level `tileMap[40][40]` with Souq zone layout
- `buildMapNY()` — fills `tileMap` with Manhattan grid layout
- `getAllMaps()` — returns array of all map configs (built-in + custom from localStorage)
- `zoneAt(tx, ty)` — returns zone ID for tile coordinate
- `randomPosInZone(zoneName, radius)` — finds valid spawn position in zone (100-attempt loop, fallback to random)
- `getCustomMaps()` / `saveCustomMap(map)` / `deleteCustomMap(id)` — localStorage CRUD

**Custom map object shape** (stored in `holeGame_customMaps`):
```javascript
{
  id: 'custom_1234567890',
  name: 'Desert Oasis',
  subtitle: 'My custom map',
  tileMap: [[...], ...],  // 40×40 array of zone IDs
  skyColor: '#87CEEB',
  itemTheme: 'souq',      // 'souq' | 'ny'
  spawnCounts: { dates: 12, coffee: 8, ... }
}
```

**`getAllMaps()` output format** (what `game.js` consumes):
```javascript
{
  id: 'souq',
  name: 'Saudi Souq',
  subtitle: 'Devour the entire market!',
  buildMap: buildMapSouq,
  types: TYPES_SOUQ,       // array of item type defs
  spawn: SPAWN_SOUQ,       // { typeName: count } spawn config
  zoneColors: ZONE_COLORS_SOUQ,
  skyColor: '#87CEEB',
  fogColor: '#87CEEB',
  itemTheme: 'souq',
}
```

---

### Factories (`js/factories.js`)

All factory functions return a `THREE.Group`. THREE is accessed as a CDN global (not imported).

**Helper**:
```javascript
function mat(color) {
  return new THREE.MeshLambertMaterial({ color });
}
```

**Exports**:
```javascript
export const FACTORIES_SOUQ = { dates, coffee, incense, sandals, cat, pot, lantern, melon, bread, ring, spices, carpet, crate, person, woman, goat, barrel, bench, fountain, cart, stall, car, truck, camel, palm, tent, building, tower, mosque, bonus5, bonus10 };

export const FACTORIES_NY = { hotdog, coffee_ny, pigeon, sneakers, rat, pizza, newspaper, pretzel, bagel, watch, vendor_cart, mailbox, dumpster, pedestrian, tourist, dog, hydrant, bench_ny, statue, bike, foodtruck, taxi, bus, horse, tree_ny, hotdog_stand, brownstone, crane_ny, skyscraper, bonus5, bonus10 };

export const ALL_FACTORIES = { ...FACTORIES_SOUQ, ...FACTORIES_NY };
```

**Factory resolver in `game.js`**:
```javascript
function getFactoriesForMap(mapConfig) {
  if (mapConfig.id === 'souq') return FACTORIES_SOUQ;
  if (mapConfig.id === 'newyork') return FACTORIES_NY;
  const theme = mapConfig.itemTheme || 'souq';
  return theme === 'ny' ? FACTORIES_NY : FACTORIES_SOUQ;
}
```

---

### Game Engine (`js/game.js`)

**Exported state** (live ES module bindings):
```javascript
export let renderer, scene, threeCamera, dirLight, hemiLight;
export let currentFrustum;
export let currentMapId;
export let gameRunning;
```

**Exported functions**:
```javascript
export function initThree()       // Create renderer, scene, camera, lights
export function onResize()        // Handle window resize
export function initGame(mapId)   // Build map, spawn objects, reset state
export function startGame(mapId)  // Full game start flow (calls initThree if needed)
export function endGame()         // Stop loop, show game-over screen
export function quitGame()        // Set reason='quit', call endGame()
export function getEndReason()    // Returns 'time' | 'complete' | 'quit'
export function loadScores()      // Read from localStorage
export function saveScore(mapId, pct, itemsStr)  // Write to localStorage
export function setupJoystick()   // Attach touch/mouse listeners
export function drawJoystick()    // Render joystick on canvas
export function resetJoystick()   // Reset joystick state
```

**Game loop**:
```
requestAnimationFrame(gameLoop)
  ├── dt = (now - lastTime) / 1000, capped at 0.05
  ├── updateInput(dt)       — apply keyboard/joystick to hole velocity
  ├── updateHole(dt)        — move hole, clamp position (30% overshoot)
  ├── updateNPCs(dt)        — wander + flee behavior
  ├── updateCollisions(dt)  — swallow check, grow, 100% win check
  ├── updateParticles(dt)   — move/fade/remove particles
  ├── updateCamera(dt)      — lerp camera to hole, update frustum
  ├── updateHUD()           — timer, score %, hole size bar
  └── renderer.render(scene, threeCamera)
```

---

## Object Tier System

| Tier | Radius | Souq Examples | NYC Examples |
|---|---|---|---|
| 1 (tiny) | 5–11 | dates, coffee, incense, sandals, cat | hotdog, coffee_ny, pigeon, sneakers, rat |
| 2 (medium) | 14–22 | spices, carpet, crate, person, goat | vendor_cart, mailbox, pedestrian, tourist, dog |
| 3 (large) | 32–48 | stall, car, truck, camel, palm | foodtruck, taxi, bus, horse, tree_ny |
| 4 (huge) | 70–95 | building, tower, mosque | brownstone, crane_ny, skyscraper |
| bonus | 10, 22 | bonus5 (+5s), bonus10 (+10s) | same |

**Swallow condition** (both must be true):
1. `object.radius < hole.radius × SWALLOW (0.85)`
2. `distance(hole, object) < hole.radius × 0.7`

---

## Zone Map Reference

### Saudi Souq Zones

| Zone ID | Name | Souq Color | NYC Color | NYC Meaning |
|---|---|---|---|---|
| Z_ROAD (0) | Road | `#8B7355` | `#3D3D3D` | Asphalt |
| Z_SAND (1) | Sand | `#C4956A` | `#4A6FA5` | Hudson River |
| Z_MARKET (2) | Market | `#A0784F` | `#8B8B8B` | Concrete blocks |
| Z_SPICE (3) | Spice Quarter | `#8B6914` | `#B5321E` | Chinatown |
| Z_TEXTILE (4) | Textile Dist. | `#7A5C3C` | `#9B6B8A` | SoHo |
| Z_FOOD (5) | Food Section | `#6B8C3E` | `#5B8C3E` | Little Italy |
| Z_PLAZA (6) | Central Plaza | `#5B7B3A` | `#4CAF50` | Central Park |
| Z_PARKING (7) | Parking | `#6B6B6B` | `#5A5A5A` | Parking lots |

---

## Score Persistence

**localStorage key**: `holeGameScores`

**Score object**:
```javascript
{ map: 'souq', score: 87, items: '224/257', date: '2026-02-18T01:09:00.000Z' }
```

- Sorted by score descending, capped at 50 entries
- Home screen displays top 10 with rank, map name, %, items count, date
- Score saved on `endGame()` regardless of end reason (time, complete, or quit)

---

## HUD Elements

| Element ID | Content |
|---|---|
| `#timer` | Countdown `M:SS` |
| `#score` | `87% (224/257)` |
| `#mapTitle` | Map name |
| `#holeSizeBar` | Progress bar (hole growth %) |
| `#holeSizeNext` | `Next: Tier 3: ~32` |
| `#quitBtn` | ✕ Quit button |

**Game Over Screen IDs**:
| Element ID | Content |
|---|---|
| `#gameOverHeadline` | "Perfect!" / "Quit" / "Time's Up!" |
| `#gameOverSubtitle` | "You ate everything! 🎉" or "You devoured" |
| `#finalScore` | `87%` |
| `#finalCount` | "You swallowed 224 out of 257 items" |
| `#restartBtn` | Play Again |
| `#homeBtn` | Home |

---

## Input Controls

**Keyboard**: Arrow keys + WASD (both supported simultaneously)

**Joystick**: Bottom-left corner canvas overlay
- 60px radius base circle
- Draggable knob — isometric direction mapping:
  ```javascript
  const angle = Math.atan2(jdy, jdx);
  mx += Math.cos(angle) * strength + Math.sin(angle) * strength;
  my += -Math.cos(angle) * strength + Math.sin(angle) * strength;
  ```
- Touch + mouse events; `pointer-events: auto` on HUD so joystick works during gameplay

---

## Custom Maps Flow

1. User opens `admin.html` (Map Editor)
2. Paints tiles with zone colors on 40×40 canvas
3. Sets map name, subtitle, sky color, item theme (`souq` or `ny`)
4. Saves → stored in `localStorage['holeGame_customMaps']` via `saveCustomMap()`
5. Back on `index.html`, `getAllMaps()` merges built-in maps + custom maps
6. Custom maps appear as blue-tinted cards on home screen
7. When played, `getAllMaps()` assigns `types`/`spawn` based on `itemTheme`:
   ```javascript
   types: cm.itemTheme === 'ny' ? TYPES_NY : TYPES_SOUQ,
   spawn: cm.spawn || (cm.itemTheme === 'ny' ? SPAWN_NY : SPAWN_SOUQ),
   ```
8. `getFactoriesForMap()` picks `FACTORIES_NY` or `FACTORIES_SOUQ` accordingly

---

## Known Issues & Gotchas

### ES Module Live Bindings
`currentMapId` is exported as `let` — primitive exports are copied at import time, not live. The restart button uses dynamic import to get the current value:
```javascript
import('./js/game.js').then(mod => mod.startGame(mod.currentMapId));
```

### THREE.js as CDN Global
`factories.js` uses `THREE` as a global (not imported). This means `factories.js` **must** be loaded after the Three.js CDN script. In `index.html`, the CDN `<script>` tag comes before the `<script type="module">` tag. The module files themselves don't need to import THREE — it's already on `window.THREE`.

### Python HTTP Server
If the server returns empty replies, kill and restart:
```bash
lsof -ti:8080 | xargs kill -9
python3 -m http.server 8080
```
Always run from the project root directory (`/Users/thebug/development/claude training/first project/`).

### Admin Modal Inputs
The admin.html new-map modal IDs don't exist in the DOM until the modal is opened. Access them only inside modal-visible callbacks, not at module initialization time.

---

## Performance Notes

- **Delta time cap**: `dt = Math.min(dt, 0.05)` — prevents physics explosions on tab unfocus
- **Shadow map**: 2048×2048 (balanced quality vs. performance)
- **Pixel ratio cap**: `Math.min(devicePixelRatio, 2)` — prevents 3× render on high-DPI
- **Particle cleanup**: Particles removed from scene array when `life <= 0`
- **Object removal**: `scene.remove(o.mesh)` on swallow completion — no zombie meshes
- **Camera lerp**: `CAM_L = 3.5` — smooth but responsive following
- **Frustum lerp**: `ZM_L = 1.8` — gradual zoom-out as hole grows

---

## Deployment

**Vercel config** (`vercel.json`):
```json
{ "version": 2, "builds": [{ "src": "index.html", "use": "@vercel/static" }] }
```

GitHub auto-deploy: push to `main` → Vercel builds → live at production URL.

**Commits**:
1. `"Initial commit: Hole.io game with two maps"` — Phase 1–8 (monolithic index.html + game.html)
2. `"Refactor to modular architecture + add map editor admin"` — Phase 8–10 (js/ modules + admin.html)

---

## Future Enhancement Ideas

1. **More maps**: Tokyo, Dubai, Paris, Cairo
2. **Sound effects**: Swallow sounds, background music per map
3. **Multiplayer**: WebSocket real-time competitive mode
4. **Power-ups**: Speed boost, magnet, time freeze
5. **Achievements**: "Eat 100 objects", "Reach 100% in under 45s"
6. **Global leaderboard**: Backend score tracking
7. **Mobile optimization**: Larger joystick, landscape lock
8. **Progressive Web App**: Service worker, offline play, installable
9. **GLTF models**: Replace primitive geometry with proper 3D assets
10. **Difficulty modes**: Easy (90s), Normal (60s), Hard (45s)
11. **More custom map tools**: Copy/paste regions, undo history > 20 steps, export/import map JSON

---

*Last updated: 2026-02-18*
*Claude Code session: Sonnet 4.5 → Sonnet 4.6*
