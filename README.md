# Hole.io Game

A browser-based hole.io style game with multiple maps featuring Saudi Souq and New York City themes.

## Features

- **Two Unique Maps**:
  - **Saudi Souq**: Traditional market with dates, coffee, camels, mosques, and more
  - **New York City**: Manhattan-style grid with taxis, hot dogs, skyscrapers, and more

- **Progressive Gameplay**: Start small and grow by eating items that fit in your hole
- **29 Unique 3D Objects per Map**: Each map has themed objects from tiny to huge
- **Time Bonuses**: Collect +5s and +10s time bonuses to extend your game
- **Score Tracking**: LocalStorage-based score history showing your top performances
- **Edge Accessibility**: Optimized collision detection allows you to reach corner items
- **Responsive Controls**:
  - Arrow keys or WASD for keyboard control
  - On-screen joystick for touch devices

## How to Play

1. Choose your map (Saudi Souq or New York City)
2. Use arrow keys, WASD, or the on-screen joystick to move your hole
3. Swallow items smaller than your hole to grow
4. Collect time bonuses to extend your 60-second timer
5. Try to reach 100% completion!

## Tech Stack

- **Three.js**: 3D rendering and graphics
- **Vanilla JavaScript**: Game logic and mechanics
- **HTML5 Canvas**: Joystick overlay
- **LocalStorage**: Score persistence

## Local Development

Simply open `hole.html` in a web browser, or serve it with a local HTTP server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/hole.html`

## Game Files

- `hole.html` - Main game file (contains all HTML, CSS, JS, and 3D models)
- `game.html` - Original falling items catch game
- `vercel.json` - Vercel deployment configuration

## Credits

Built with Claude Code - AI-assisted game development
