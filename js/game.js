import {
  W, T, SCALE, TILES_N,
  HOLE_R0, HOLE_RMAX, HOLE_SPD, GROW, SWALLOW,
  CAM_L, ZM_L, FRUSTUM_MIN, FRUSTUM_MAX, DUR,
} from './constants.js';
import { getAllMaps, zoneAt, randomPosInZone } from './maps.js';
import { ALL_FACTORIES, FACTORIES_SOUQ, FACTORIES_NY } from './factories.js';

// Factory resolver: built-in maps get their own factory set; custom maps get ALL_FACTORIES
function getFactoriesForMap(mapConfig) {
  if (mapConfig.id === 'souq') return FACTORIES_SOUQ;
  if (mapConfig.id === 'newyork') return FACTORIES_NY;
  // Custom maps: use itemTheme to pick factory set
  const theme = mapConfig.itemTheme || 'souq';
  return theme === 'ny' ? FACTORIES_NY : FACTORIES_SOUQ;
}

// ====== SCENE / RENDERER GLOBALS ======
export let renderer, scene, threeCamera, dirLight, hemiLight;
export let currentFrustum = FRUSTUM_MIN;
export let currentMapId = 'souq';

let groundMesh, holeGroup, holeCylinder, holeRim, holeMask;

// ====== GAME STATE ======
export let gameRunning = false;
let gameTime, score, totalItems;
let hole, camState, objects, particles3D, lastTime;
let gameEndReason = 'time'; // 'time' | 'complete' | 'quit'

// ====== THREE.JS INIT ======
export function initThree() {
  const container = document.getElementById('container');
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.insertBefore(renderer.domElement, container.firstChild);

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#87CEEB');
  scene.fog = new THREE.Fog('#87CEEB', 180, 280);

  const aspect = window.innerWidth / window.innerHeight;
  const frust = FRUSTUM_MIN;
  threeCamera = new THREE.OrthographicCamera(
    -frust * aspect, frust * aspect, frust, -frust, 0.1, 500
  );
  const camDist = 150;
  threeCamera.position.set(camDist, camDist, camDist);
  threeCamera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xfff5e0, 0.55);
  scene.add(ambient);

  hemiLight = new THREE.HemisphereLight(0x87CEEB, 0xC4956A, 0.35);
  scene.add(hemiLight);

  dirLight = new THREE.DirectionalLight(0xfff8e8, 1.3);
  dirLight.position.set(60, 100, 40);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 350;
  const sc = 140;
  dirLight.shadow.camera.left = -sc; dirLight.shadow.camera.right = sc;
  dirLight.shadow.camera.top = sc; dirLight.shadow.camera.bottom = -sc;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);
  scene.add(dirLight.target);
}

export function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  if (renderer) renderer.setSize(w, h);
  if (threeCamera) {
    const aspect = w / h;
    const frust = currentFrustum || FRUSTUM_MIN;
    threeCamera.left = -frust * aspect;
    threeCamera.right = frust * aspect;
    threeCamera.top = frust;
    threeCamera.bottom = -frust;
    threeCamera.updateProjectionMatrix();
  }
  const jc = document.getElementById('joystickCanvas');
  if (jc) { jc.width = w; jc.height = h; }
}

// ====== GROUND ======
function createGround() {
  const MAPS = getAllMaps();
  const mapConfig = MAPS[currentMapId];
  const tileMap = mapConfig.buildMap();

  const texCanvas = document.createElement('canvas');
  texCanvas.width = TILES_N; texCanvas.height = TILES_N;
  const tctx = texCanvas.getContext('2d');
  for (let x = 0; x < TILES_N; x++) {
    for (let y = 0; y < TILES_N; y++) {
      tctx.fillStyle = mapConfig.zoneColors[tileMap[x][y]];
      tctx.fillRect(x, y, 1, 1);
    }
  }
  const texture = new THREE.CanvasTexture(texCanvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  const worldSize = W / SCALE;
  const geo = new THREE.PlaneGeometry(worldSize, worldSize);
  const mat = new THREE.MeshLambertMaterial({ map: texture });
  groundMesh = new THREE.Mesh(geo, mat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.set(worldSize / 2, 0, worldSize / 2);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);
}

// ====== HOLE MESH ======
function createHoleMesh() {
  holeGroup = new THREE.Group();

  const cylGeo = new THREE.CylinderGeometry(1, 1, 5, 32);
  const cylMat = new THREE.MeshBasicMaterial({ color: 0x050005 });
  holeCylinder = new THREE.Mesh(cylGeo, cylMat);
  holeCylinder.position.y = -2.5;
  holeGroup.add(holeCylinder);

  const maskGeo = new THREE.CircleGeometry(1, 32);
  const maskMat = new THREE.MeshBasicMaterial({ color: 0x080008 });
  holeMask = new THREE.Mesh(maskGeo, maskMat);
  holeMask.rotation.x = -Math.PI / 2;
  holeMask.position.y = 0.02;
  holeGroup.add(holeMask);

  const rimGeo = new THREE.TorusGeometry(1, 0.12, 8, 48);
  const rimMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
  holeRim = new THREE.Mesh(rimGeo, rimMat);
  holeRim.rotation.x = -Math.PI / 2;
  holeRim.position.y = 0.05;
  holeGroup.add(holeRim);

  scene.add(holeGroup);
}

function updateHoleMesh() {
  const r = hole.visualRadius / SCALE;
  const px = hole.worldX / SCALE;
  const pz = hole.worldY / SCALE;
  holeGroup.position.set(px, 0, pz);
  holeCylinder.scale.set(r, 1, r);
  holeMask.scale.set(r, r, 1);
  holeRim.scale.set(r, r, r);
}

// ====== PARTICLES ======
function spawnParticles3D(worldX, worldY, color, count) {
  for (let i = 0; i < count; i++) {
    const geo = new THREE.SphereGeometry(0.1, 4, 4);
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(worldX / SCALE, 0.5 + Math.random(), worldY / SCALE);
    scene.add(mesh);
    particles3D.push({
      mesh,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 3,
      vz: (Math.random() - 0.5) * 4,
      life: 1,
    });
  }
}

function updateParticles3D(dt) {
  for (let i = particles3D.length - 1; i >= 0; i--) {
    const p = particles3D[i];
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;
    p.vy -= 8 * dt;
    p.life -= dt * 2.5;
    p.mesh.material.opacity = Math.max(0, p.life);
    if (p.life <= 0) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      particles3D.splice(i, 1);
    }
  }
}

// ====== SCENE CLEAR ======
function clearScene() {
  if (objects) {
    for (const o of objects) {
      if (o.mesh) {
        scene.remove(o.mesh);
        o.mesh.traverse(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
            else child.material.dispose();
          }
        });
      }
    }
  }
  if (particles3D) {
    for (const p of particles3D) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    }
  }
  if (groundMesh) { scene.remove(groundMesh); groundMesh = null; }
  if (holeGroup) { scene.remove(holeGroup); holeGroup = null; }
}

// ====== MODEL SCALE ======
function getModelScale(type) {
  const r = type.radius / SCALE;
  const baseScales = { 1: 1.6, 2: 1.4, 3: 1.2, 4: 1.0 };
  return r * (baseScales[type.tier] || 1.0) * 0.9;
}

// ====== INIT GAME ======
export function initGame(mapId) {
  currentMapId = mapId || currentMapId;
  const MAPS = getAllMaps();
  const mapConfig = MAPS[currentMapId];

  clearScene();

  scene.background = new THREE.Color(mapConfig.skyColor);
  scene.fog = new THREE.Fog(mapConfig.fogColor, 180, 280);
  if (hemiLight) hemiLight.color = new THREE.Color(mapConfig.skyColor);

  gameTime = DUR;
  score = 0;
  particles3D = [];
  objects = [];

  hole = {
    worldX: W / 2, worldY: W / 2,
    radius: HOLE_R0, targetRadius: HOLE_R0, visualRadius: HOLE_R0,
  };
  camState = { x: W / 2 / SCALE, z: W / 2 / SCALE, frustum: FRUSTUM_MIN, targetFrustum: FRUSTUM_MIN };
  currentFrustum = FRUSTUM_MIN;
  resetJoystick();

  // Rebuild tileMap for this map (so zoneAt() works)
  mapConfig.buildMap();

  createGround();
  createHoleMesh();

  const titleEl = document.getElementById('hudTitle');
  if (titleEl) titleEl.textContent = mapConfig.name;

  // Resolve factories for this map
  const factories = getFactoriesForMap(mapConfig);

  // Spawn objects
  for (const td of mapConfig.types) {
    const count = mapConfig.spawn[td.id] || 4;
    for (let i = 0; i < count; i++) {
      let pos, valid, attempts = 0;
      do {
        pos = randomPosInZone(td.zone, td.radius, W);
        valid = true;
        const dx = pos.x - W / 2, dy = pos.y - W / 2;
        if (Math.sqrt(dx * dx + dy * dy) < 110) valid = false;
        if (valid) {
          for (const o of objects) {
            const ox = pos.x - o.worldX, oy = pos.y - o.worldY;
            if (Math.sqrt(ox * ox + oy * oy) < (td.radius + o.radius) * 1.25) { valid = false; break; }
          }
        }
        attempts++;
      } while (!valid && attempts < 40);

      const factory = factories[td.id];
      if (!factory) continue;
      const mesh = factory();
      const s = getModelScale(td);
      mesh.scale.set(s, s, s);
      mesh.position.set(pos.x / SCALE, 0, pos.y / SCALE);
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.traverse(child => {
        if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
      });
      scene.add(mesh);

      const obj = {
        worldX: pos.x, worldY: pos.y,
        type: td, radius: td.radius,
        alive: true, beingSwallowed: false, swallowProgress: 0,
        mesh, baseScale: s,
      };
      if (td.npc) {
        obj.isNPC = true;
        obj.targetX = pos.x + (Math.random() - 0.5) * 300;
        obj.targetY = pos.y + (Math.random() - 0.5) * 300;
        obj.speed = 22 + Math.random() * 30;
        obj.fleeSpeed = 65 + Math.random() * 40;
        obj.fleeing = false;
        obj.prevX = pos.x; obj.prevY = pos.y;
      }
      objects.push(obj);
    }
  }
  totalItems = objects.filter(o => !o.type.isBonus).length;
  gameRunning = true;
}

// ====== UPDATE FUNCTIONS ======
function updateTimer(dt) {
  gameTime -= dt;
  if (gameTime <= 0) { gameTime = 0; gameEndReason = 'time'; endGame(); }
}

// Keys and joystick state (shared with input module in index.html)
const keys = {};
window.addEventListener('keydown', e => { keys[e.key] = true; e.preventDefault(); });
window.addEventListener('keyup', e => { keys[e.key] = false; });

let joystick = {
  active: false, stickX: 0, stickY: 0,
  dx: 0, dy: 0, touchId: null,
  radius: 60, knobRadius: 22,
};

function getJoystickBase() {
  const jc = document.getElementById('joystickCanvas');
  return { x: 100, y: (jc ? jc.height : window.innerHeight) - 120 };
}

function clampJoystick() {
  const base = getJoystickBase();
  const dx = joystick.stickX - base.x, dy = joystick.stickY - base.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > joystick.radius) {
    joystick.stickX = base.x + (dx / dist) * joystick.radius;
    joystick.stickY = base.y + (dy / dist) * joystick.radius;
  }
}

function updateJoystickDir() {
  const base = getJoystickBase();
  const dx = joystick.stickX - base.x, dy = joystick.stickY - base.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 5) { joystick.dx = 0; joystick.dy = 0; }
  else { joystick.dx = dx / joystick.radius; joystick.dy = dy / joystick.radius; }
}

export function resetJoystick() {
  joystick.active = false; joystick.touchId = null;
  const base = getJoystickBase();
  joystick.stickX = base.x; joystick.stickY = base.y;
  joystick.dx = 0; joystick.dy = 0;
}

export function setupJoystick() {
  const jCanvas = document.getElementById('joystickCanvas');
  if (!jCanvas) return;

  jCanvas.style.pointerEvents = 'auto';

  jCanvas.addEventListener('mousedown', function (e) {
    if (!gameRunning) return;
    const base = getJoystickBase();
    const dx = e.clientX - base.x, dy = e.clientY - base.y;
    if (Math.sqrt(dx * dx + dy * dy) < joystick.radius * 1.5) {
      joystick.active = true;
      joystick.stickX = e.clientX; joystick.stickY = e.clientY;
      clampJoystick(); updateJoystickDir();
      e.preventDefault(); e.stopPropagation();
    }
  });
  jCanvas.addEventListener('mousemove', function (e) {
    if (!joystick.active) return;
    joystick.stickX = e.clientX; joystick.stickY = e.clientY;
    clampJoystick(); updateJoystickDir();
    e.preventDefault();
  });
  window.addEventListener('mouseup', function () { if (joystick.active) resetJoystick(); });

  jCanvas.addEventListener('touchstart', function (e) {
    if (!gameRunning) return;
    for (const t of e.changedTouches) {
      const base = getJoystickBase();
      const dx = t.clientX - base.x, dy = t.clientY - base.y;
      if (Math.sqrt(dx * dx + dy * dy) < joystick.radius * 1.5) {
        joystick.active = true; joystick.touchId = t.identifier;
        joystick.stickX = t.clientX; joystick.stickY = t.clientY;
        clampJoystick(); updateJoystickDir();
        e.preventDefault(); return;
      }
    }
  }, { passive: false });

  jCanvas.addEventListener('touchmove', function (e) {
    if (!joystick.active) return;
    for (const t of e.changedTouches) {
      if (t.identifier === joystick.touchId) {
        joystick.stickX = t.clientX; joystick.stickY = t.clientY;
        clampJoystick(); updateJoystickDir();
        e.preventDefault(); return;
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', function (e) {
    for (const t of e.changedTouches) { if (t.identifier === joystick.touchId) { resetJoystick(); return; } }
  });
  window.addEventListener('touchcancel', function (e) {
    for (const t of e.changedTouches) { if (t.identifier === joystick.touchId) { resetJoystick(); return; } }
  });
}

export function drawJoystick() {
  const jCanvas = document.getElementById('joystickCanvas');
  if (!jCanvas) return;
  const jCtx = jCanvas.getContext('2d');
  jCtx.clearRect(0, 0, jCanvas.width, jCanvas.height);
  if (!gameRunning) return;

  const base = getJoystickBase();
  const r = joystick.radius, kr = joystick.knobRadius;

  jCtx.fillStyle = 'rgba(255,255,255,0.10)';
  jCtx.strokeStyle = 'rgba(255,255,255,0.20)';
  jCtx.lineWidth = 2;
  jCtx.beginPath();
  jCtx.arc(base.x, base.y, r, 0, Math.PI * 2);
  jCtx.fill(); jCtx.stroke();

  jCtx.strokeStyle = 'rgba(255,255,255,0.15)';
  jCtx.lineWidth = 2; jCtx.lineCap = 'round'; jCtx.lineJoin = 'round';
  const cs = 8, cd = r * 0.65;
  [[base.x - cs, base.y - cd + cs, base.x, base.y - cd, base.x + cs, base.y - cd + cs],
  [base.x - cs, base.y + cd - cs, base.x, base.y + cd, base.x + cs, base.y + cd - cs],
  [base.x - cd + cs, base.y - cs, base.x - cd, base.y, base.x - cd + cs, base.y + cs],
  [base.x + cd - cs, base.y - cs, base.x + cd, base.y, base.x + cd - cs, base.y + cs]
  ].forEach(([x1, y1, x2, y2, x3, y3]) => {
    jCtx.beginPath();
    jCtx.moveTo(x1, y1); jCtx.lineTo(x2, y2); jCtx.lineTo(x3, y3);
    jCtx.stroke();
  });

  const kx = joystick.active ? joystick.stickX : base.x;
  const ky = joystick.active ? joystick.stickY : base.y;
  jCtx.fillStyle = joystick.active ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.25)';
  jCtx.strokeStyle = joystick.active ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.35)';
  jCtx.lineWidth = 2;
  jCtx.beginPath();
  jCtx.arc(kx, ky, kr, 0, Math.PI * 2);
  jCtx.fill(); jCtx.stroke();
}

function updateHole(dt) {
  let mx = 0, my = 0;
  if (keys['ArrowUp'] || keys['w'] || keys['W']) { mx -= 1; my -= 1; }
  if (keys['ArrowDown'] || keys['s'] || keys['S']) { mx += 1; my += 1; }
  if (keys['ArrowLeft'] || keys['a'] || keys['A']) { mx -= 1; my += 1; }
  if (keys['ArrowRight'] || keys['d'] || keys['D']) { mx += 1; my -= 1; }
  if (joystick.active) {
    mx += joystick.dx + joystick.dy;
    my += -joystick.dx + joystick.dy;
  }
  const len = Math.sqrt(mx * mx + my * my);
  if (len > 0) {
    mx /= len; my /= len;
    hole.worldX += mx * HOLE_SPD * dt;
    hole.worldY += my * HOLE_SPD * dt;
  }
  hole.worldX = Math.max(-hole.radius * 0.3, Math.min(W + hole.radius * 0.3, hole.worldX));
  hole.worldY = Math.max(-hole.radius * 0.3, Math.min(W + hole.radius * 0.3, hole.worldY));
}

function updateNPCs(dt) {
  for (const o of objects) {
    if (!o.alive || !o.isNPC || o.beingSwallowed) continue;
    o.prevX = o.worldX; o.prevY = o.worldY;
    const dx = o.worldX - hole.worldX, dy = o.worldY - hole.worldY;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < hole.radius * 4 && o.radius < hole.radius * SWALLOW) {
      o.fleeing = true;
      const a = Math.atan2(dy, dx);
      o.worldX += Math.cos(a) * o.fleeSpeed * dt;
      o.worldY += Math.sin(a) * o.fleeSpeed * dt;
    } else {
      o.fleeing = false;
      const tx = o.targetX - o.worldX, ty = o.targetY - o.worldY;
      const td2 = Math.sqrt(tx * tx + ty * ty);
      if (td2 < 5) {
        o.targetX = Math.max(50, Math.min(W - 50, o.worldX + (Math.random() - 0.5) * 300));
        o.targetY = Math.max(50, Math.min(W - 50, o.worldY + (Math.random() - 0.5) * 300));
      } else {
        o.worldX += (tx / td2) * o.speed * dt;
        o.worldY += (ty / td2) * o.speed * dt;
      }
    }
    o.worldX = Math.max(20, Math.min(W - 20, o.worldX));
    o.worldY = Math.max(20, Math.min(W - 20, o.worldY));
  }
}

function updateCollisions() {
  for (const o of objects) {
    if (!o.alive) continue;
    const dx = o.worldX - hole.worldX, dy = o.worldY - hole.worldY;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (o.radius < hole.radius * SWALLOW && d < hole.radius * 0.7) {
      if (!o.beingSwallowed) { o.beingSwallowed = true; o.swallowProgress = 0; }
    }
    if (o.beingSwallowed) {
      o.swallowProgress += 0.06;
      o.worldX += (hole.worldX - o.worldX) * 0.15;
      o.worldY += (hole.worldY - o.worldY) * 0.15;
      if (o.swallowProgress >= 1) {
        o.alive = false;
        if (o.type.isBonus) {
          gameTime += o.type.bonusTime;
          spawnParticles3D(o.worldX, o.worldY, 0x00FF88, 15);
          showTimeBonusPopup(o.worldX, o.worldY, o.type.bonusTime);
        } else {
          score++;
          hole.targetRadius += o.radius * GROW;
          if (hole.targetRadius > HOLE_RMAX) hole.targetRadius = HOLE_RMAX;
          const tierColors = [0xe8b84b, 0xff8844, 0x2ecc71, 0xe74c3c];
          spawnParticles3D(o.worldX, o.worldY, tierColors[o.type.tier - 1], 10);
          // Check for 100% completion
          if (score >= totalItems) {
            gameEndReason = 'complete';
            endGame();
            return;
          }
        }
        if (o.mesh) {
          scene.remove(o.mesh);
          o.mesh.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
              else child.material.dispose();
            }
          });
          o.mesh = null;
        }
      }
    }
  }
}

function updateHoleGrowth() {
  hole.visualRadius += (hole.targetRadius - hole.visualRadius) * 0.08;
  hole.radius = hole.visualRadius;
}

function updateCameraFollow() {
  const targetX = hole.worldX / SCALE;
  const targetZ = hole.worldY / SCALE;
  camState.x += (targetX - camState.x) * CAM_L;
  camState.z += (targetZ - camState.z) * CAM_L;

  const rr = (hole.radius - HOLE_R0) / (HOLE_RMAX - HOLE_R0);
  camState.targetFrustum = FRUSTUM_MIN + (FRUSTUM_MAX - FRUSTUM_MIN) * rr;
  camState.frustum += (camState.targetFrustum - camState.frustum) * ZM_L;
  currentFrustum = camState.frustum;

  const camDist = 150;
  const offset = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(camDist);
  threeCamera.position.set(camState.x + offset.x, offset.y, camState.z + offset.z);
  threeCamera.lookAt(camState.x, 0, camState.z);

  dirLight.position.set(camState.x + 60, 100, camState.z + 40);
  dirLight.target.position.set(camState.x, 0, camState.z);

  const aspect = window.innerWidth / window.innerHeight;
  threeCamera.left = -camState.frustum * aspect;
  threeCamera.right = camState.frustum * aspect;
  threeCamera.top = camState.frustum;
  threeCamera.bottom = -camState.frustum;
  threeCamera.updateProjectionMatrix();
}

function update3DPositions() {
  updateHoleMesh();
  for (const o of objects) {
    if (!o.alive || !o.mesh) continue;
    o.mesh.position.x = o.worldX / SCALE;
    o.mesh.position.z = o.worldY / SCALE;
    if (o.beingSwallowed) {
      const s = Math.max(0.01, 1 - o.swallowProgress);
      const sc = o.baseScale * s;
      o.mesh.scale.set(sc, sc, sc);
      o.mesh.position.y = -o.swallowProgress * 2;
      o.mesh.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = Math.max(0, s);
        }
      });
    } else if (o.type.isBonus) {
      const t = Date.now() * 0.003;
      o.mesh.position.y = 0.3 + Math.sin(t + o.worldX * 0.01) * 0.25;
      o.mesh.rotation.y += 0.03;
    } else {
      o.mesh.position.y = 0;
    }

    if (o.isNPC && !o.beingSwallowed) {
      const dx = o.worldX - (o.prevX || o.worldX);
      const dz = o.worldY - (o.prevY || o.worldY);
      if (Math.abs(dx) > 0.1 || Math.abs(dz) > 0.1) {
        o.mesh.rotation.y = Math.atan2(dx, dz);
      }
    }

    if (!o.beingSwallowed) {
      const dx = o.worldX - hole.worldX, dy = o.worldY - hole.worldY;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < hole.radius * 2.5 && o.radius >= hole.radius * SWALLOW) {
        const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.05;
        o.mesh.scale.set(o.baseScale * pulse, o.baseScale * pulse, o.baseScale * pulse);
      } else {
        o.mesh.scale.set(o.baseScale, o.baseScale, o.baseScale);
      }
    }
  }
}

function showTimeBonusPopup(worldX, worldY, seconds) {
  const pos3D = new THREE.Vector3(worldX / SCALE, 1, worldY / SCALE);
  pos3D.project(threeCamera);
  const sx = (pos3D.x * 0.5 + 0.5) * window.innerWidth;
  const sy = (-pos3D.y * 0.5 + 0.5) * window.innerHeight;
  const popup = document.createElement('div');
  popup.className = 'time-popup';
  popup.textContent = `+${seconds}s`;
  popup.style.left = sx + 'px';
  popup.style.top = sy + 'px';
  if (seconds >= 10) {
    popup.style.color = '#FFD700';
    popup.style.fontSize = '36px';
    popup.style.textShadow = '0 0 16px rgba(255,215,0,0.7), 0 2px 6px rgba(0,0,0,0.6)';
  }
  document.getElementById('container').appendChild(popup);
  setTimeout(() => popup.remove(), 1400);
}

function updateHUD() {
  const mins = Math.floor(gameTime / 60);
  const secs = Math.floor(gameTime % 60);
  const timerEl = document.getElementById('hudTimer');
  if (timerEl) {
    timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    timerEl.style.color = gameTime <= 10 ? '#ff4444' : '#ffffff';
  }
  const pct = totalItems > 0 ? Math.round((score / totalItems) * 100) : 0;
  const scoreEl = document.getElementById('hudScore');
  if (scoreEl) scoreEl.textContent = `${pct}% (${score}/${totalItems})`;

  const ratio = Math.min(1, (hole.radius - HOLE_R0) / (HOLE_RMAX - HOLE_R0));
  const sizeBarEl = document.getElementById('sizeBarInner');
  if (sizeBarEl) sizeBarEl.style.width = `${ratio * 100}%`;

  const nextTier = hole.radius < 30 ? 'Tier 2: ~35'
    : hole.radius < 60 ? 'Tier 3: ~70'
    : hole.radius < 110 ? 'Tier 4: ~120'
    : 'MAX!';
  const tierEl = document.getElementById('tierGuide');
  if (tierEl) tierEl.textContent = `Next: ${nextTier}`;
}

// ====== GAME LOOP ======
function gameLoop(ts) {
  if (!gameRunning) return;
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;

  updateTimer(dt);
  updateHole(dt);
  updateNPCs(dt);
  updateCollisions();
  updateHoleGrowth();
  update3DPositions();
  updateCameraFollow();
  updateParticles3D(dt);
  updateHUD();

  renderer.render(scene, threeCamera);
  drawJoystick();
  requestAnimationFrame(gameLoop);
}

// ====== SCORE PERSISTENCE ======
export function loadScores() {
  const stored = localStorage.getItem('holeGameScores');
  return stored ? JSON.parse(stored) : [];
}

export function saveScore(mapId, scorePct, itemsStr) {
  const scores = loadScores();
  scores.push({ map: mapId, score: scorePct, items: itemsStr, date: new Date().toISOString() });
  scores.sort((a, b) => b.score - a.score);
  if (scores.length > 50) scores.length = 50;
  localStorage.setItem('holeGameScores', JSON.stringify(scores));
}

// ====== GAME FLOW ======
export function getEndReason() { return gameEndReason; }

export function endGame() {
  gameRunning = false;
  const pct = totalItems > 0 ? Math.round((score / totalItems) * 100) : 0;

  // Update headline based on reason
  const headlineEl = document.getElementById('gameOverHeadline');
  const subtitleEl = document.getElementById('gameOverSubtitle');
  if (headlineEl) {
    if (gameEndReason === 'complete') {
      headlineEl.textContent = 'Perfect!';
      headlineEl.style.color = '#2ecc71';
      if (subtitleEl) subtitleEl.textContent = 'You ate everything! 🎉';
    } else if (gameEndReason === 'quit') {
      headlineEl.textContent = 'Quit';
      headlineEl.style.color = '#e8b84b';
      if (subtitleEl) subtitleEl.textContent = 'You devoured';
    } else {
      headlineEl.textContent = "Time's Up!";
      headlineEl.style.color = '#e8b84b';
      if (subtitleEl) subtitleEl.textContent = 'You devoured';
    }
  }

  const finalScoreEl = document.getElementById('finalScore');
  const finalCountEl = document.getElementById('finalCount');
  if (finalScoreEl) finalScoreEl.textContent = pct + '%';
  if (finalCountEl) finalCountEl.textContent = `You swallowed ${score} out of ${totalItems} items`;

  // Only save score if not quit, or save with a 'quit' flag
  saveScore(currentMapId, pct, `${score}/${totalItems}`);

  const gameOverEl = document.getElementById('gameOverScreen');
  const hudEl = document.getElementById('hud');
  if (gameOverEl) gameOverEl.style.display = 'flex';
  if (hudEl) hudEl.style.display = 'none';
}

export function quitGame() {
  if (!gameRunning) return;
  gameEndReason = 'quit';
  endGame();
}

export function startGame(mapId) {
  currentMapId = mapId || currentMapId;
  gameEndReason = 'time';
  const startEl = document.getElementById('startScreen');
  const gameOverEl = document.getElementById('gameOverScreen');
  const hudEl = document.getElementById('hud');
  if (startEl) startEl.style.display = 'none';
  if (gameOverEl) gameOverEl.style.display = 'none';
  if (hudEl) hudEl.style.display = 'block';

  if (!renderer) initThree();
  onResize();
  initGame(mapId);
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}
