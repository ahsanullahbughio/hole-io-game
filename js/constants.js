// ====== SHARED GAME CONSTANTS ======
export const W = 2400;          // World size (world units)
export const T = 60;            // Tile size (world units)
export const SCALE = 10;        // World-to-3D scale divisor
export const TILES_N = Math.ceil(W / T); // 40

export const HOLE_R0   = 24;    // Initial hole radius
export const HOLE_RMAX = 300;   // Max hole radius
export const HOLE_SPD  = 190;   // Hole movement speed
export const GROW      = 0.16;  // Growth per item eaten
export const SWALLOW   = 0.85;  // Item must be < hole.radius * SWALLOW to be eaten
export const CAM_L     = 0.07;  // Camera lerp speed
export const ZM_L      = 0.03;  // Zoom lerp speed
export const FRUSTUM_MIN = 35;
export const FRUSTUM_MAX = 75;
export const DUR = 60;          // Game duration seconds

// ====== ZONE TYPE CONSTANTS ======
export const Z_ROAD    = 0;
export const Z_SAND    = 1;
export const Z_MARKET  = 2;
export const Z_SPICE   = 3;
export const Z_TEXTILE = 4;
export const Z_FOOD    = 5;
export const Z_PLAZA   = 6;
export const Z_PARKING = 7;

export const ZONE_NAMES = {
  [Z_ROAD]:    'Road',
  [Z_SAND]:    'Sand / Water',
  [Z_MARKET]:  'Market',
  [Z_SPICE]:   'Spice / Cultural',
  [Z_TEXTILE]: 'Textile / Residential',
  [Z_FOOD]:    'Food / Park',
  [Z_PLAZA]:   'Plaza / Green',
  [Z_PARKING]: 'Parking / Transport',
};

// ====== ZONE COLORS ======
export const ZONE_COLORS_SOUQ = {
  [Z_ROAD]:    '#5A5550',
  [Z_SAND]:    '#E8D5A0',
  [Z_MARKET]:  '#C4956A',
  [Z_SPICE]:   '#D4652A',
  [Z_TEXTILE]: '#6B4E9B',
  [Z_FOOD]:    '#7BA23F',
  [Z_PLAZA]:   '#DEB055',
  [Z_PARKING]: '#8A8580',
};

export const ZONE_COLORS_NY = {
  [Z_ROAD]:    '#4A4A4A',
  [Z_SAND]:    '#3A7BC8',
  [Z_MARKET]:  '#9A9A9E',
  [Z_SPICE]:   '#C4453A',
  [Z_TEXTILE]: '#9B7A8E',
  [Z_FOOD]:    '#4E7A3A',
  [Z_PLAZA]:   '#5DBE6A',
  [Z_PARKING]: '#6A6A72',
};

// ====== ITEM TYPE DEFINITIONS ======
export const TYPES_SOUQ = [
  { id:'dates',    radius:14,  tier:1, zone:'spice',   label:'Dates',    emoji:'🌴' },
  { id:'coffee',   radius:16,  tier:1, zone:'food',    label:'Coffee Pot', emoji:'☕' },
  { id:'incense',  radius:16,  tier:1, zone:'spice',   label:'Incense',  emoji:'🪔' },
  { id:'sandals',  radius:15,  tier:1, zone:'market',  label:'Sandals',  emoji:'👡' },
  { id:'cat',      radius:18,  tier:1, zone:'any',     label:'Cat',      emoji:'🐱', npc:true },
  { id:'pot',      radius:15,  tier:1, zone:'food',    label:'Dallah Pot', emoji:'🫖' },
  { id:'lantern',  radius:14,  tier:1, zone:'market',  label:'Lantern',  emoji:'🏮' },
  { id:'melon',    radius:15,  tier:1, zone:'food',    label:'Melon',    emoji:'🍈' },
  { id:'bread',    radius:14,  tier:1, zone:'food',    label:'Bread',    emoji:'🫓' },
  { id:'ring',     radius:12,  tier:1, zone:'market',  label:'Ring',     emoji:'💍' },
  { id:'spices',   radius:30,  tier:2, zone:'spice',   label:'Spice Basket', emoji:'🌶️' },
  { id:'carpet',   radius:32,  tier:2, zone:'textile', label:'Carpet Roll', emoji:'🪄' },
  { id:'crate',    radius:32,  tier:2, zone:'market',  label:'Crate',    emoji:'📦' },
  { id:'person',   radius:26,  tier:2, zone:'road',    label:'Person',   emoji:'🧔', npc:true },
  { id:'woman',    radius:26,  tier:2, zone:'road',    label:'Woman',    emoji:'🧕', npc:true },
  { id:'goat',     radius:28,  tier:2, zone:'any',     label:'Goat',     emoji:'🐐', npc:true },
  { id:'barrel',   radius:28,  tier:2, zone:'market',  label:'Barrel',   emoji:'🛢️' },
  { id:'bench',    radius:26,  tier:2, zone:'plaza',   label:'Bench',    emoji:'🪑' },
  { id:'fountain', radius:34,  tier:2, zone:'plaza',   label:'Fountain', emoji:'⛲' },
  { id:'cart',     radius:28,  tier:2, zone:'food',    label:'Cart',     emoji:'🛒' },
  { id:'stall',    radius:55,  tier:3, zone:'market',  label:'Market Stall', emoji:'⛺' },
  { id:'car',      radius:60,  tier:3, zone:'parking', label:'Car',      emoji:'🚗' },
  { id:'truck',    radius:68,  tier:3, zone:'parking', label:'Truck',    emoji:'🚛' },
  { id:'camel',    radius:50,  tier:3, zone:'any',     label:'Camel',    emoji:'🐪', npc:true },
  { id:'palm',     radius:46,  tier:3, zone:'any',     label:'Palm Tree',emoji:'🌴' },
  { id:'tent',     radius:52,  tier:3, zone:'market',  label:'Tent',     emoji:'⛺' },
  { id:'building', radius:100, tier:4, zone:'market',  label:'Building', emoji:'🏛️' },
  { id:'tower',    radius:110, tier:4, zone:'parking', label:'Tower Crane', emoji:'🏗️' },
  { id:'mosque',   radius:130, tier:4, zone:'plaza',   label:'Mosque',   emoji:'🕌' },
  { id:'bonus5',   radius:18,  tier:1, zone:'any',     label:'+5s Bonus', emoji:'⏱️', isBonus:true, bonusTime:5 },
  { id:'bonus10',  radius:32,  tier:2, zone:'any',     label:'+10s Bonus', emoji:'⌛', isBonus:true, bonusTime:10 },
];

export const SPAWN_SOUQ = {
  dates:14, coffee:12, incense:10, sandals:10, cat:7, pot:10, lantern:14, melon:10, bread:10, ring:7,
  spices:10, carpet:9, crate:10, person:12, woman:10, goat:7, barrel:9, bench:9, fountain:5, cart:9,
  stall:8, car:8, truck:5, camel:5, palm:14, tent:7,
  building:8, tower:5, mosque:3,
  bonus5:9, bonus10:5,
};

export const TYPES_NY = [
  { id:'hotdog',       radius:14,  tier:1, zone:'food',    label:'Hot Dog',    emoji:'🌭' },
  { id:'coffee_ny',    radius:15,  tier:1, zone:'market',  label:'Coffee Cup', emoji:'☕' },
  { id:'pigeon',       radius:16,  tier:1, zone:'any',     label:'Pigeon',     emoji:'🐦', npc:true },
  { id:'sneakers',     radius:14,  tier:1, zone:'market',  label:'Sneakers',   emoji:'👟' },
  { id:'rat',          radius:14,  tier:1, zone:'road',    label:'Rat',        emoji:'🐀', npc:true },
  { id:'pizza',        radius:15,  tier:1, zone:'food',    label:'Pizza Slice',emoji:'🍕' },
  { id:'newspaper',    radius:13,  tier:1, zone:'market',  label:'Newspaper',  emoji:'📰' },
  { id:'pretzel',      radius:14,  tier:1, zone:'food',    label:'Pretzel',    emoji:'🥨' },
  { id:'bagel',        radius:13,  tier:1, zone:'food',    label:'Bagel',      emoji:'🥯' },
  { id:'watch',        radius:12,  tier:1, zone:'market',  label:'Watch',      emoji:'⌚' },
  { id:'vendor_cart',  radius:30,  tier:2, zone:'road',    label:'Vendor Cart',emoji:'🛒' },
  { id:'mailbox',      radius:26,  tier:2, zone:'road',    label:'Mailbox',    emoji:'📮' },
  { id:'dumpster',     radius:32,  tier:2, zone:'market',  label:'Dumpster',   emoji:'🗑️' },
  { id:'pedestrian',   radius:26,  tier:2, zone:'road',    label:'Pedestrian', emoji:'🚶', npc:true },
  { id:'tourist',      radius:26,  tier:2, zone:'plaza',   label:'Tourist',    emoji:'🧳', npc:true },
  { id:'dog',          radius:24,  tier:2, zone:'any',     label:'Dog',        emoji:'🐕', npc:true },
  { id:'hydrant',      radius:24,  tier:2, zone:'road',    label:'Fire Hydrant',emoji:'🚒' },
  { id:'bench_ny',     radius:28,  tier:2, zone:'plaza',   label:'Park Bench', emoji:'🪑' },
  { id:'statue',       radius:32,  tier:2, zone:'plaza',   label:'Statue',     emoji:'🗽' },
  { id:'bike',         radius:26,  tier:2, zone:'road',    label:'Bicycle',    emoji:'🚲' },
  { id:'foodtruck',    radius:58,  tier:3, zone:'road',    label:'Food Truck', emoji:'🚐' },
  { id:'taxi',         radius:60,  tier:3, zone:'parking', label:'Taxi',       emoji:'🚕' },
  { id:'bus',          radius:68,  tier:3, zone:'parking', label:'Bus',        emoji:'🚌' },
  { id:'horse',        radius:52,  tier:3, zone:'plaza',   label:'Horse',      emoji:'🐎', npc:true },
  { id:'tree_ny',      radius:46,  tier:3, zone:'plaza',   label:'Tree',       emoji:'🌳' },
  { id:'hotdog_stand', radius:54,  tier:3, zone:'food',    label:'Hot Dog Stand', emoji:'🌭' },
  { id:'brownstone',   radius:95,  tier:4, zone:'market',  label:'Brownstone', emoji:'🏠' },
  { id:'crane_ny',     radius:100, tier:4, zone:'market',  label:'Crane',      emoji:'🏗️' },
  { id:'skyscraper',   radius:120, tier:4, zone:'market',  label:'Skyscraper', emoji:'🏙️' },
  { id:'bonus5',       radius:18,  tier:1, zone:'any',     label:'+5s Bonus',  emoji:'⏱️', isBonus:true, bonusTime:5 },
  { id:'bonus10',      radius:32,  tier:2, zone:'any',     label:'+10s Bonus', emoji:'⌛', isBonus:true, bonusTime:10 },
];

export const SPAWN_NY = {
  hotdog:14, coffee_ny:14, pigeon:10, sneakers:10, rat:8, pizza:14, newspaper:10, pretzel:10, bagel:10, watch:8,
  vendor_cart:10, mailbox:12, dumpster:10, pedestrian:14, tourist:10, dog:8, hydrant:14, bench_ny:12, statue:6, bike:8,
  foodtruck:8, taxi:10, bus:6, horse:6, tree_ny:18, hotdog_stand:8,
  brownstone:12, crane_ny:6, skyscraper:5,
  bonus5:10, bonus10:6,
};

// All item types combined (for admin/map-editor use)
export const ALL_ITEM_TYPES = {
  souq: TYPES_SOUQ,
  ny: TYPES_NY,
};

// Scale factors for 3D models per tier
export function getModelScale(type) {
  const r = type.radius / SCALE;
  const baseScales = { 1: 1.6, 2: 1.4, 3: 1.2, 4: 1.0 };
  return r * (baseScales[type.tier] || 1.0) * 0.9;
}
