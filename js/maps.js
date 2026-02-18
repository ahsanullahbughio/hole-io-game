import {
  TILES_N, Z_ROAD, Z_SAND, Z_MARKET, Z_SPICE, Z_TEXTILE,
  Z_FOOD, Z_PLAZA, Z_PARKING,
  ZONE_COLORS_SOUQ, ZONE_COLORS_NY,
  TYPES_SOUQ, SPAWN_SOUQ, TYPES_NY, SPAWN_NY,
} from './constants.js';

// ====== TILE MAP STATE ======
export let tileMap = [];

// ====== SOUQ MAP BUILDER ======
export function buildMapSouq() {
  tileMap = [];
  for (let x = 0; x < TILES_N; x++) {
    tileMap[x] = [];
    for (let y = 0; y < TILES_N; y++) tileMap[x][y] = Z_SAND;
  }

  for (let x = 2; x < 38; x++)
    for (let y = 2; y < 38; y++) tileMap[x][y] = Z_MARKET;

  // Ring roads
  for (let i = 2; i < 38; i++) {
    tileMap[i][2] = Z_ROAD; tileMap[i][3] = Z_ROAD;
    tileMap[i][36] = Z_ROAD; tileMap[i][37] = Z_ROAD;
    tileMap[2][i] = Z_ROAD; tileMap[3][i] = Z_ROAD;
    tileMap[36][i] = Z_ROAD; tileMap[37][i] = Z_ROAD;
  }

  // Main boulevards
  for (const rx of [11, 12, 20, 21, 29, 30])
    for (let y = 2; y < 38; y++) tileMap[rx][y] = Z_ROAD;
  for (const ry of [11, 12, 20, 21, 29, 30])
    for (let x = 2; x < 38; x++) tileMap[x][ry] = Z_ROAD;

  // Secondary streets
  for (const rx of [7, 16, 25, 33])
    for (let y = 4; y < 36; y++) tileMap[rx][y] = Z_ROAD;
  for (const ry of [7, 16, 25, 33])
    for (let x = 4; x < 36; x++) tileMap[x][ry] = Z_ROAD;

  // Districts
  const districts = [
    { x1:4, x2:11, y1:4, y2:11, z:Z_SPICE },
    { x1:13, x2:20, y1:4, y2:11, z:Z_TEXTILE },
    { x1:22, x2:29, y1:4, y2:11, z:Z_MARKET },
    { x1:31, x2:36, y1:4, y2:11, z:Z_MARKET },
    { x1:4, x2:11, y1:13, y2:20, z:Z_FOOD },
    { x1:13, x2:20, y1:13, y2:20, z:Z_PLAZA },
    { x1:22, x2:29, y1:13, y2:20, z:Z_PLAZA },
    { x1:31, x2:36, y1:13, y2:20, z:Z_MARKET },
    { x1:4, x2:11, y1:22, y2:29, z:Z_SPICE },
    { x1:13, x2:20, y1:22, y2:29, z:Z_SPICE },
    { x1:22, x2:29, y1:22, y2:29, z:Z_MARKET },
    { x1:31, x2:36, y1:22, y2:36, z:Z_PARKING },
    { x1:4, x2:31, y1:31, y2:36, z:Z_MARKET },
  ];

  for (const d of districts)
    for (let x = d.x1; x < d.x2; x++)
      for (let y = d.y1; y < d.y2; y++)
        if (tileMap[x][y] !== Z_ROAD) tileMap[x][y] = d.z;

  // Inner plaza courtyard
  for (let x = 15; x < 18; x++)
    for (let y = 15; y < 18; y++) tileMap[x][y] = Z_PLAZA;

  // Re-paint roads last
  for (const rx of [11, 12, 20, 21, 29, 30])
    for (let y = 2; y < 38; y++) tileMap[rx][y] = Z_ROAD;
  for (const ry of [11, 12, 20, 21, 29, 30])
    for (let x = 2; x < 38; x++) tileMap[x][ry] = Z_ROAD;
  for (const rx of [7, 16, 25, 33])
    for (let y = 4; y < 36; y++) tileMap[rx][y] = Z_ROAD;
  for (const ry of [7, 16, 25, 33])
    for (let x = 4; x < 36; x++) tileMap[x][ry] = Z_ROAD;
  for (let i = 2; i < 38; i++) {
    tileMap[i][2] = Z_ROAD; tileMap[i][3] = Z_ROAD;
    tileMap[i][36] = Z_ROAD; tileMap[i][37] = Z_ROAD;
    tileMap[2][i] = Z_ROAD; tileMap[3][i] = Z_ROAD;
    tileMap[36][i] = Z_ROAD; tileMap[37][i] = Z_ROAD;
  }

  return tileMap;
}

// ====== NYC MAP BUILDER ======
export function buildMapNY() {
  tileMap = [];
  for (let x = 0; x < TILES_N; x++) {
    tileMap[x] = [];
    for (let y = 0; y < TILES_N; y++) tileMap[x][y] = Z_MARKET;
  }

  // Waterfront rivers
  for (let x = 0; x < 2; x++)
    for (let y = 0; y < TILES_N; y++) { tileMap[x][y] = Z_SAND; tileMap[TILES_N-1-x][y] = Z_SAND; }

  // Main avenues (vertical)
  for (const ax of [7, 8, 16, 17, 25, 26])
    for (let y = 0; y < TILES_N; y++) tileMap[ax][y] = Z_ROAD;

  // Cross streets (horizontal every 4 rows)
  for (let sy = 3; sy < TILES_N - 1; sy += 4)
    for (let x = 2; x < TILES_N - 2; x++) tileMap[x][sy] = Z_ROAD;

  // Districts
  const districts = [
    { x1:9, x2:16, y1:2, y2:15, z:Z_PLAZA },   // Central Park
    { x1:3, x2:7, y1:2, y2:19, z:Z_TEXTILE },  // Upper West Side
    { x1:18, x2:25, y1:2, y2:15, z:Z_MARKET }, // Upper East Side
    { x1:27, x2:38, y1:2, y2:23, z:Z_MARKET }, // Midtown East skyscrapers
    { x1:3, x2:7, y1:20, y2:27, z:Z_FOOD },    // Times Square / Midtown West
    { x1:9, x2:16, y1:16, y2:23, z:Z_TEXTILE },// Herald Square / Garment
    { x1:18, x2:25, y1:16, y2:27, z:Z_SPICE }, // Koreatown / Flatiron
    { x1:27, x2:38, y1:24, y2:31, z:Z_TEXTILE },// Gramercy / Murray Hill
    { x1:3, x2:16, y1:28, y2:35, z:Z_FOOD },   // Chelsea / Greenwich
    { x1:18, x2:38, y1:28, y2:36, z:Z_MARKET },// SoHo / Tribeca
    { x1:3, x2:38, y1:36, y2:40, z:Z_PLAZA },  // Battery Park waterfront
    { x1:19, x2:22, y1:20, y2:24, z:Z_PLAZA }, // Madison Square Park
    { x1:10, x2:14, y1:20, y2:24, z:Z_PLAZA }, // Bryant Park
  ];

  for (const d of districts)
    for (let x = d.x1; x < Math.min(d.x2, TILES_N); x++)
      for (let y = d.y1; y < Math.min(d.y2, TILES_N); y++)
        if (tileMap[x][y] !== Z_ROAD) tileMap[x][y] = d.z;

  // Transport hubs
  for (let x = 9; x < 16; x++)
    for (let y = 24; y < 27; y++)
      if (tileMap[x][y] !== Z_ROAD) tileMap[x][y] = Z_PARKING;
  for (let x = 18; x < 25; x++)
    for (let y = 12; y < 15; y++)
      if (tileMap[x][y] !== Z_ROAD) tileMap[x][y] = Z_PARKING;

  // Re-paint roads last
  for (const ax of [7, 8, 16, 17, 25, 26])
    for (let y = 0; y < TILES_N; y++) tileMap[ax][y] = Z_ROAD;
  for (let sy = 3; sy < TILES_N - 1; sy += 4)
    for (let x = 2; x < TILES_N - 2; x++) tileMap[x][sy] = Z_ROAD;
  // Park internal paths
  for (let x = 9; x < 16; x++) tileMap[x][8] = Z_ROAD;
  for (let y = 2; y < 15; y++) tileMap[12][y] = Z_ROAD;

  return tileMap;
}

// ====== CUSTOM MAP BUILDER (from saved data) ======
export function buildMapCustom(savedTileMap) {
  tileMap = savedTileMap.map(col => [...col]);
  return tileMap;
}

// ====== MAPS REGISTRY ======
// Custom maps are loaded from localStorage and merged in at runtime
export const BUILT_IN_MAPS = {
  souq: {
    id: 'souq',
    name: 'Saudi Souq',
    subtitle: 'Devour the entire market!',
    buildMap: buildMapSouq,
    types: TYPES_SOUQ,
    spawn: SPAWN_SOUQ,
    zoneColors: ZONE_COLORS_SOUQ,
    skyColor: '#87CEEB',
    fogColor: '#87CEEB',
    builtIn: true,
  },
  newyork: {
    id: 'newyork',
    name: 'New York City',
    subtitle: 'Eat your way through Manhattan!',
    buildMap: buildMapNY,
    types: TYPES_NY,
    spawn: SPAWN_NY,
    zoneColors: ZONE_COLORS_NY,
    skyColor: '#B0C4DE',
    fogColor: '#B0C4DE',
    builtIn: true,
  },
};

// ====== CUSTOM MAP STORAGE ======
const STORAGE_KEY = 'holeGame_customMaps';

export function loadCustomMaps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveCustomMap(mapData) {
  const maps = loadCustomMaps();
  const idx = maps.findIndex(m => m.id === mapData.id);
  if (idx >= 0) maps[idx] = mapData;
  else maps.push(mapData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
}

export function deleteCustomMap(mapId) {
  const maps = loadCustomMaps().filter(m => m.id !== mapId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
}

export function getAllMaps() {
  const custom = loadCustomMaps();
  const all = { ...BUILT_IN_MAPS };
  for (const cm of custom) {
    all[cm.id] = {
      ...cm,
      buildMap: () => buildMapCustom(cm.tileMap),
      types: cm.itemTheme === 'ny' ? TYPES_NY : TYPES_SOUQ,
      spawn: cm.spawn || (cm.itemTheme === 'ny' ? SPAWN_NY : SPAWN_SOUQ),
      zoneColors: cm.zoneColors || ZONE_COLORS_SOUQ,
      skyColor: cm.skyColor || '#87CEEB',
      fogColor: cm.fogColor || '#87CEEB',
      builtIn: false,
    };
  }
  return all;
}

// Helper: get zone at world coordinate
export function zoneAt(wx, wy) {
  const gx = Math.floor(wx / 60), gy = Math.floor(wy / 60);
  if (gx < 0 || gx >= TILES_N || gy < 0 || gy >= TILES_N) return Z_SAND;
  return tileMap[gx][gy];
}

// Helper: find random position in a zone
export function randomPosInZone(zoneName, radius, W) {
  const zoneMap = {
    spice: Z_SPICE, textile: Z_TEXTILE, food: Z_FOOD,
    market: Z_MARKET, plaza: Z_PLAZA, parking: Z_PARKING,
    road: Z_ROAD, any: -1,
  };
  const zt = zoneMap[zoneName] ?? -1;
  const margin = radius + 10;
  for (let attempt = 0; attempt < 60; attempt++) {
    const wx = margin + Math.random() * (W - margin * 2);
    const wy = margin + Math.random() * (W - margin * 2);
    const z = zoneAt(wx, wy);
    if (zt === -1 || z === zt || (zt === Z_ROAD && (z === Z_ROAD || z === Z_MARKET))) {
      return { x: wx, y: wy };
    }
  }
  return { x: 200 + Math.random() * (W - 400), y: 200 + Math.random() * (W - 400) };
}
