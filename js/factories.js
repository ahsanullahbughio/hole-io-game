// ====== 3D OBJECT FACTORIES ======
// All factories return THREE.Group objects.
// THREE must be available globally (loaded via CDN in index.html)

function mat(color) {
  return new THREE.MeshLambertMaterial({ color });
}

// ====== SOUQ FACTORIES ======
export function createDates() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 6), mat(0x228B22));
  stem.position.y = 0.5; g.add(stem);
  for (let i = 0; i < 5; i++) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), mat(0x5C3317));
    d.position.set(Math.cos(i*1.26)*0.15, 0.2 + Math.random()*0.15, Math.sin(i*1.26)*0.15);
    d.castShadow = true; g.add(d);
  }
  return g;
}

export function createCoffee() {
  const g = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.35, 8), mat(0xF5F5DC));
  cup.position.y = 0.18; cup.castShadow = true; g.add(cup);
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 8), mat(0x3E1C00));
  liquid.position.y = 0.33; g.add(liquid);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 6, 8, Math.PI), mat(0xF5F5DC));
  handle.position.set(0.25, 0.2, 0); handle.rotation.z = Math.PI/2; g.add(handle);
  return g;
}

export function createIncense() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8), mat(0xB8860B));
  base.position.y = 0.08; base.castShadow = true; g.add(base);
  const bowl = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.25, 8), mat(0xDAA520));
  bowl.position.y = 0.28; bowl.rotation.x = Math.PI; g.add(bowl);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mat(0xFF6600));
  flame.position.y = 0.45; g.add(flame);
  return g;
}

export function createSandals() {
  const g = new THREE.Group();
  for (let s = -1; s <= 1; s += 2) {
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.35), mat(0xD2B48C));
    sole.position.set(s * 0.12, 0.02, 0); sole.castShadow = true; g.add(sole);
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.04), mat(0x8B4513));
    strap.position.set(s * 0.12, 0.05, 0.08); g.add(strap);
  }
  return g;
}

export function createCat() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.55), mat(0xFF8C00));
  body.position.y = 0.2; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.22, 0.22), mat(0xFF8C00));
  head.position.set(0, 0.32, 0.32); head.castShadow = true; g.add(head);
  for (let s = -1; s <= 1; s += 2) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), mat(0xFF8C00));
    ear.position.set(s * 0.08, 0.46, 0.32); g.add(ear);
  }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.4, 6), mat(0xFF8C00));
  tail.position.set(0, 0.35, -0.3); tail.rotation.x = -0.5; g.add(tail);
  return g;
}

export function createPot() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), mat(0xCD853F));
  body.position.y = 0.2; body.castShadow = true; g.add(body);
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.2, 6), mat(0xCD853F));
  spout.position.set(0.2, 0.3, 0); spout.rotation.z = -0.6; g.add(spout);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 6, 8, Math.PI), mat(0xCD853F));
  handle.position.set(-0.15, 0.3, 0); handle.rotation.y = Math.PI/2; g.add(handle);
  const lid = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6, 0, Math.PI*2, 0, Math.PI/2), mat(0xB8860B));
  lid.position.y = 0.38; g.add(lid);
  return g;
}

export function createLantern() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.3, 8), mat(0xCC0000));
  body.position.y = 0.2; body.castShadow = true; g.add(body);
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.12, 8), mat(0xDAA520));
  top.position.y = 0.41; g.add(top);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), new THREE.MeshBasicMaterial({ color: 0xFFAA00 }));
  glow.position.y = 0.2; g.add(glow);
  return g;
}

export function createMelon() {
  const g = new THREE.Group();
  const melon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), mat(0x228B22));
  melon.position.y = 0.22; melon.castShadow = true; g.add(melon);
  for (let i = 0; i < 4; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.4, 0.04), mat(0x006400));
    stripe.position.y = 0.22;
    stripe.rotation.y = i * Math.PI / 4;
    stripe.position.x = Math.cos(i * Math.PI/4) * 0.2;
    stripe.position.z = Math.sin(i * Math.PI/4) * 0.2;
    g.add(stripe);
  }
  return g;
}

export function createBread() {
  const g = new THREE.Group();
  const loaf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), mat(0xDEB887));
  loaf.scale.set(1, 0.6, 1.5); loaf.position.y = 0.12; loaf.castShadow = true; g.add(loaf);
  const line = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.35), mat(0xD2691E));
  line.position.y = 0.2; g.add(line);
  return g;
}

export function createRing() {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 8, 16), mat(0xFFD700));
  ring.position.y = 0.15; ring.rotation.x = Math.PI / 6; ring.castShadow = true; g.add(ring);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.04), mat(0x00CED1));
  gem.position.set(0, 0.27, 0); g.add(gem);
  return g;
}

export function createSpices() {
  const g = new THREE.Group();
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.4, 0.35, 10), mat(0x8B4513));
  basket.position.y = 0.18; basket.castShadow = true; g.add(basket);
  const colors = [0xFF4500, 0xFFD700, 0x8B0000, 0xD2691E, 0x228B22];
  for (let i = 0; i < 5; i++) {
    const pile = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), mat(colors[i]));
    pile.position.set(Math.cos(i*1.26)*0.25, 0.38, Math.sin(i*1.26)*0.25);
    pile.scale.y = 0.5; g.add(pile);
  }
  return g;
}

export function createCarpet() {
  const g = new THREE.Group();
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.2, 12), mat(0x8B0000));
  roll.position.y = 0.25; roll.rotation.z = Math.PI/2; roll.castShadow = true; g.add(roll);
  for (let i = -2; i <= 2; i++) {
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.06, 12), mat(0xDAA520));
    band.position.set(i * 0.22, 0.25, 0); band.rotation.z = Math.PI/2; g.add(band);
  }
  return g;
}

export function createCrate() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.5), mat(0xA0522D));
  box.position.y = 0.28; box.castShadow = true; g.add(box);
  const edgeMat = mat(0x6B3410);
  for (let x = -1; x <= 1; x += 2) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.55, 0.5), edgeMat);
    edge.position.set(x * 0.35, 0.28, 0); g.add(edge);
  }
  return g;
}

export function createPerson() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.25), mat(0xFFFFF0));
  body.position.y = 0.55; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), mat(0xDEB887));
  head.position.y = 1.05; head.castShadow = true; g.add(head);
  const ghutra = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.35), mat(0xFFFFFF));
  ghutra.position.y = 1.15; g.add(ghutra);
  for (let s = -1; s <= 1; s += 2) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.12), mat(0xFFFFF0));
    leg.position.set(s * 0.1, 0.2, 0); g.add(leg);
  }
  return g;
}

export function createWoman() {
  const g = new THREE.Group();
  const robe = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.9, 8), mat(0x1a1a2e));
  robe.position.y = 0.45; robe.castShadow = true; g.add(robe);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), mat(0xDEB887));
  head.position.y = 1.0; head.castShadow = true; g.add(head);
  const hijab = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), mat(0x1a1a2e));
  hijab.position.y = 1.02; hijab.scale.set(1, 0.85, 1); g.add(hijab);
  return g;
}

export function createGoat() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.7), mat(0xF5F5DC));
  body.position.y = 0.4; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.25), mat(0xF5F5DC));
  head.position.set(0, 0.55, 0.4); g.add(head);
  for (let s = -1; s <= 1; s += 2) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.15, 6), mat(0x8B8378));
    horn.position.set(s * 0.08, 0.7, 0.4); horn.rotation.z = s * 0.3; g.add(horn);
  }
  for (let x = -1; x <= 1; x += 2) for (let z = -1; z <= 1; z += 2) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6), mat(0xF5F5DC));
    leg.position.set(x * 0.14, 0.15, z * 0.25); g.add(leg);
  }
  return g;
}

export function createBarrel() {
  const g = new THREE.Group();
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 10), mat(0x2F4F4F));
  barrel.position.y = 0.4; barrel.castShadow = true; g.add(barrel);
  for (const y of [0.15, 0.65]) {
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 10), mat(0xCC0000));
    band.position.y = y; g.add(band);
  }
  return g;
}

export function createBench() {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.35), mat(0x8B4513));
  seat.position.y = 0.35; seat.castShadow = true; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.05), mat(0x8B4513));
  back.position.set(0, 0.55, -0.15); g.add(back);
  for (let x = -1; x <= 1; x += 2) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.3), mat(0x4A3520));
    leg.position.set(x * 0.38, 0.17, 0); g.add(leg);
  }
  return g;
}

export function createFountain() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.25, 12), mat(0x8B8682));
  base.position.y = 0.13; base.castShadow = true; g.add(base);
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.3, 12), mat(0x9E9E9E));
  bowl.position.y = 0.4; g.add(bowl);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 12),
    new THREE.MeshLambertMaterial({ color: 0x4FC3F7, transparent: true, opacity: 0.7 }));
  water.position.y = 0.5; g.add(water);
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8), mat(0x8B8682));
  pillar.position.y = 0.65; g.add(pillar);
  return g;
}

export function createCart() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), mat(0x808080));
  body.position.y = 0.4; body.castShadow = true; g.add(body);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6), mat(0x606060));
  handle.position.set(0, 0.5, -0.35); handle.rotation.x = 0.5; g.add(handle);
  for (let x = -1; x <= 1; x += 2) for (let z = -1; z <= 1; z += 2) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 8), mat(0x333333));
    wheel.position.set(x * 0.25, 0.08, z * 0.18); wheel.rotation.z = Math.PI/2; g.add(wheel);
  }
  return g;
}

export function createStall() {
  const g = new THREE.Group();
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 1.2), mat(0xA0522D));
  counter.position.y = 0.4; counter.castShadow = true; g.add(counter);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.6), mat(0xCC3333));
  roof.position.y = 1.6; roof.castShadow = true; g.add(roof);
  for (let x = -1; x <= 1; x += 2) for (let z = -1; z <= 1; z += 2) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6), mat(0x8B4513));
    pole.position.set(x * 1.0, 0.8, z * 0.55); g.add(pole);
  }
  for (let i = 0; i < 4; i++) {
    const item = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.3), mat([0xFFD700,0xFF6347,0x32CD32,0x87CEEB][i]));
    item.position.set(-0.7 + i * 0.45, 1.0, 0); g.add(item);
  }
  return g;
}

export function createCar() {
  const g = new THREE.Group();
  const colors = [0x3498DB, 0xE74C3C, 0x2ECC71, 0xF39C12, 0x9B59B6];
  const c = colors[Math.floor(Math.random() * colors.length)];
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.8), mat(c));
  body.position.y = 0.4; body.castShadow = true; g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.9), mat(c));
  roof.position.set(0, 0.78, -0.15); roof.castShadow = true; g.add(roof);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.3, 0.05),
    new THREE.MeshLambertMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.6 }));
  windshield.position.set(0, 0.72, 0.32); g.add(windshield);
  for (let x = -1; x <= 1; x += 2) for (let z = -1; z <= 1; z += 2) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8), mat(0x222222));
    wheel.position.set(x * 0.5, 0.15, z * 0.65); wheel.rotation.z = Math.PI/2; g.add(wheel);
  }
  for (let x = -1; x <= 1; x += 2) {
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mat(0xFFFF99));
    light.position.set(x * 0.35, 0.4, 0.9); g.add(light);
  }
  return g;
}

export function createTruck() {
  const g = new THREE.Group();
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.8), mat(0x2980B9));
  cab.position.set(0, 0.6, 1.0); cab.castShadow = true; g.add(cab);
  const cargo = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.8), mat(0xECF0F1));
  cargo.position.set(0, 0.65, -0.2); cargo.castShadow = true; g.add(cargo);
  for (let x = -1; x <= 1; x += 2) for (const z of [-0.8, 0, 0.9]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 8), mat(0x222222));
    wheel.position.set(x * 0.6, 0.18, z); wheel.rotation.z = Math.PI/2; g.add(wheel);
  }
  return g;
}

export function createCamel() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 1.2), mat(0xC4A882));
  body.position.y = 0.9; body.castShadow = true; g.add(body);
  const hump = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), mat(0xB8976A));
  hump.position.set(0, 1.3, 0); hump.scale.y = 0.7; g.add(hump);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 8), mat(0xC4A882));
  neck.position.set(0, 1.2, 0.55); neck.rotation.x = -0.5; g.add(neck);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.28), mat(0xC4A882));
  head.position.set(0, 1.45, 0.85); g.add(head);
  for (let x = -1; x <= 1; x += 2) for (let z = -1; z <= 1; z += 2) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 6), mat(0xC4A882));
    leg.position.set(x * 0.2, 0.35, z * 0.4); g.add(leg);
  }
  return g;
}

export function createPalm() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.5, 8), mat(0x8B5A2B));
  trunk.position.y = 1.25; trunk.castShadow = true; g.add(trunk);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.15, 1.2, 4), mat(0x228B22));
    leaf.position.set(Math.cos(angle)*0.5, 2.5+Math.random()*0.2, Math.sin(angle)*0.5);
    leaf.rotation.x = Math.cos(angle)*0.8; leaf.rotation.z = -Math.sin(angle)*0.8;
    leaf.scale.set(1, 1, 2.5); g.add(leaf);
  }
  for (let i = 0; i < 3; i++) {
    const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), mat(0x5C3317));
    coconut.position.set(Math.cos(i*2.1)*0.15, 2.35, Math.sin(i*2.1)*0.15); g.add(coconut);
  }
  return g;
}

export function createTent() {
  const g = new THREE.Group();
  const tentColors = [0xCC3333, 0xCC6600, 0x336633, 0x333399];
  const tentColor = tentColors[Math.floor(Math.random() * tentColors.length)];
  const tent = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.5, 4), mat(tentColor));
  tent.position.y = 0.75; tent.rotation.y = Math.PI/4; tent.castShadow = true; g.add(tent);
  for (let i = 0; i < 4; i++) {
    const angle = (i/4)*Math.PI*2+Math.PI/4;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,1.6,6), mat(0x8B4513));
    pole.position.set(Math.cos(angle)*1.0, 0.8, Math.sin(angle)*1.0); g.add(pole);
  }
  const trim = new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.2,0.1,4), mat(0xDAA520));
  trim.position.y = 0.05; trim.rotation.y = Math.PI/4; g.add(trim);
  return g;
}

export function createBuilding() {
  const g = new THREE.Group();
  const wallColor = [0xF5DEB3,0xDEB887,0xD2B48C,0xE8D5B0][Math.floor(Math.random()*4)];
  const walls = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.5, 2.5), mat(wallColor));
  walls.position.y = 1.25; walls.castShadow = true; g.add(walls);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.15, 2.7), mat(0x8B4513));
  roof.position.y = 2.55; roof.castShadow = true; g.add(roof);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.0, 0.05), mat(0x5C3317));
  door.position.set(0, 0.5, 1.26); g.add(door);
  for (let x = -1; x <= 1; x += 2) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.7 }));
    win.position.set(x * 0.9, 1.6, 1.26); g.add(win);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.03), mat(0x5C3317));
    frame.position.set(x * 0.9, 1.6, 1.27); g.add(frame);
  }
  const parapet = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.3, 0.1), mat(wallColor));
  parapet.position.set(0, 2.7, 1.3); g.add(parapet);
  return g;
}

export function createTower() {
  const g = new THREE.Group();
  const tower = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.0, 2.0), mat(0x808080));
  tower.position.y = 2.0; tower.castShadow = true; g.add(tower);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 0.15), mat(0xFFD700));
  arm.position.set(0.8, 4.2, 0); g.add(arm);
  const mast = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.2, 0.15), mat(0xFFD700));
  mast.position.set(-0.3, 4.6, 0); g.add(mast);
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,2.0,4), mat(0x333333));
  wire.position.set(2.0, 3.2, 0); g.add(wire);
  for (let i = 0; i < 3; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.2, 2.05), mat(i%2===0?0xFFD700:0x222222));
    stripe.position.y = 0.1 + i * 0.2; g.add(stripe);
  }
  return g;
}

export function createMosque() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.5, 3.5), mat(0xFFF8F0));
  body.position.y = 1.25; body.castShadow = true; g.add(body);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.2,16,12,0,Math.PI*2,0,Math.PI/2), mat(0xDAA520));
  dome.position.y = 2.5; dome.castShadow = true; g.add(dome);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), mat(0xFFD700));
  finial.position.y = 3.7; g.add(finial);
  const finialPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.3,6), mat(0xFFD700));
  finialPole.position.y = 3.5; g.add(finialPole);
  for (let s = -1; s <= 1; s += 2) {
    const minaret = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.25,3.8,8), mat(0xFFF8F0));
    minaret.position.set(s*2.2, 1.9, 0); minaret.castShadow = true; g.add(minaret);
    const mTop = new THREE.Mesh(new THREE.ConeGeometry(0.25,0.6,8), mat(0xDAA520));
    mTop.position.set(s*2.2, 4.1, 0); g.add(mTop);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8), mat(0xFFD700));
    ball.position.set(s*2.2, 4.5, 0); g.add(ball);
    const balcony = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.04,6,12), mat(0xDEB887));
    balcony.position.set(s*2.2,2.8,0); balcony.rotation.x = Math.PI/2; g.add(balcony);
  }
  const arch = new THREE.Mesh(new THREE.BoxGeometry(0.8,1.4,0.05), mat(0x5C3317));
  arch.position.set(0, 0.7, 1.76); g.add(arch);
  const archTop = new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,0.06,8,1,false,0,Math.PI), mat(0xDAA520));
  archTop.position.set(0,1.4,1.76); archTop.rotation.z = Math.PI/2; archTop.rotation.y = Math.PI/2; g.add(archTop);
  return g;
}

export function createBonus5() {
  const g = new THREE.Group();
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,0.08,16), new THREE.MeshBasicMaterial({color:0x00FF88}));
  face.position.y = 0.4; g.add(face);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.04,8,16), new THREE.MeshBasicMaterial({color:0x00CC66}));
  rim.position.y = 0.4; g.add(rim);
  const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.03,0.2,0.03), new THREE.MeshBasicMaterial({color:0xFFFFFF}));
  hand1.position.set(0,0.5,0); hand1.rotation.z = 0.3; g.add(hand1);
  const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.02,0.14,0.02), new THREE.MeshBasicMaterial({color:0xFFFFFF}));
  hand2.position.set(0,0.47,0); hand2.rotation.z = -0.8; g.add(hand2);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.4,12,12), new THREE.MeshBasicMaterial({color:0x00FF88,transparent:true,opacity:0.15}));
  glow.position.y = 0.4; g.add(glow);
  return g;
}

export function createBonus10() {
  const g = new THREE.Group();
  const topCone = new THREE.Mesh(new THREE.ConeGeometry(0.35,0.45,8), new THREE.MeshBasicMaterial({color:0xFFD700}));
  topCone.position.y = 0.7; topCone.rotation.x = Math.PI; g.add(topCone);
  const botCone = new THREE.Mesh(new THREE.ConeGeometry(0.35,0.45,8), new THREE.MeshBasicMaterial({color:0xFFD700}));
  botCone.position.y = 0.25; g.add(botCone);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.12,8), new THREE.MeshBasicMaterial({color:0xFFAA00}));
  neck.position.y = 0.47; g.add(neck);
  for (const yy of [0.92, 0.02]) {
    const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.35,0.04,6,12), new THREE.MeshBasicMaterial({color:0xFFAA00}));
    rimRing.position.y = yy; rimRing.rotation.x = Math.PI/2; g.add(rimRing);
  }
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.55,12,12), new THREE.MeshBasicMaterial({color:0xFFD700,transparent:true,opacity:0.12}));
  glow.position.y = 0.47; g.add(glow);
  return g;
}

// ====== NYC FACTORIES ======
export function createHotdog() {
  const g = new THREE.Group();
  const bun = new THREE.Mesh(new THREE.BoxGeometry(0.45,0.15,0.15), mat(0xD2691E));
  bun.position.y = 0.08; bun.castShadow = true; g.add(bun);
  const sausage = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.4,8), mat(0x8B0000));
  sausage.rotation.z = Math.PI/2; sausage.position.y = 0.12; g.add(sausage);
  const mustard = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.3,6), mat(0xFFD700));
  mustard.rotation.z = Math.PI/2; mustard.position.y = 0.15; g.add(mustard);
  return g;
}

export function createCoffeeNY() {
  const g = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.12,0.35,8), mat(0x4169E1));
  cup.position.y = 0.18; cup.castShadow = true; g.add(cup);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.03,8), mat(0xFFFFFF));
  lid.position.y = 0.36; g.add(lid);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.151,0.151,0.1,8), mat(0xFFFFFF));
  band.position.y = 0.25; g.add(band);
  return g;
}

export function createPigeon() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.12,0.22), mat(0x808080));
  body.position.y = 0.12; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8), mat(0x696969));
  head.position.set(0,0.18,0.14); g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.02,0.05,6), mat(0xFF8C00));
  beak.position.set(0,0.18,0.2); beak.rotation.x = Math.PI/2; g.add(beak);
  for (const side of [-1,1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.14,0.02,0.18), mat(0x696969));
    wing.position.set(side*0.12, 0.12, 0); g.add(wing);
  }
  return g;
}

export function createSneakers() {
  const g = new THREE.Group();
  for (const side of [-1,1]) {
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.03,0.18), mat(0x000000));
    sole.position.set(side*0.08, 0.02, 0); sole.castShadow = true; g.add(sole);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11,0.08,0.16), mat(side<0?0xFFFFFF:0xFF0000));
    shoe.position.set(side*0.08, 0.06, 0.01); g.add(shoe);
    const laces = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.01,0.05), mat(0x333333));
    laces.position.set(side*0.08, 0.1, 0.05); g.add(laces);
  }
  return g;
}

export function createRat() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.16,0.08,0.22), mat(0x3A3A3A));
  body.position.y = 0.06; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.06,8,8), mat(0x2F2F2F));
  head.position.set(0,0.08,0.14); g.add(head);
  for (const side of [-1,1]) {
    const ear = new THREE.Mesh(new THREE.CircleGeometry(0.03,8), mat(0xFF69B4));
    ear.position.set(side*0.05, 0.12, 0.14); ear.rotation.y = side*Math.PI/3; g.add(ear);
  }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.25,6), mat(0x3A3A3A));
  tail.position.set(0,0.04,-0.15); tail.rotation.x = Math.PI/4; g.add(tail);
  return g;
}

export function createPizza() {
  const g = new THREE.Group();
  const slice = new THREE.Mesh(new THREE.ConeGeometry(0.18,0.04,3), mat(0xFFD700));
  slice.rotation.x = -Math.PI/2; slice.position.y = 0.02; slice.castShadow = true; g.add(slice);
  for (let i = 0; i < 3; i++) {
    const pep = new THREE.Mesh(new THREE.SphereGeometry(0.025,6,6), mat(0x8B0000));
    pep.position.set((Math.random()-0.5)*0.1, 0.04, (Math.random()-0.5)*0.1); g.add(pep);
  }
  return g;
}

export function createNewspaper() {
  const g = new THREE.Group();
  const paper = new THREE.Mesh(new THREE.BoxGeometry(0.25,0.02,0.18), mat(0xE0E0E0));
  paper.position.y = 0.01; paper.castShadow = true; g.add(paper);
  for (let i = 0; i < 4; i++) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.005,0.01), mat(0x000000));
    line.position.set(0,0.025,-0.05+i*0.03); g.add(line);
  }
  return g;
}

export function createPretzel() {
  const g = new THREE.Group();
  const pm = mat(0x8B4513);
  const loop1 = new THREE.Mesh(new THREE.TorusGeometry(0.12,0.025,8,16,Math.PI), pm);
  loop1.rotation.x = -Math.PI/2; loop1.position.y = 0.08; loop1.castShadow = true; g.add(loop1);
  const loop2 = new THREE.Mesh(new THREE.TorusGeometry(0.12,0.025,8,16,Math.PI), pm);
  loop2.rotation.x = -Math.PI/2; loop2.rotation.z = Math.PI; loop2.position.y = 0.08; g.add(loop2);
  for (let i = 0; i < 6; i++) {
    const salt = new THREE.Mesh(new THREE.SphereGeometry(0.01,4,4), mat(0xFFFFFF));
    salt.position.set((Math.random()-0.5)*0.15, 0.08+Math.random()*0.02, (Math.random()-0.5)*0.15);
    g.add(salt);
  }
  return g;
}

export function createBagel() {
  const g = new THREE.Group();
  const bagel = new THREE.Mesh(new THREE.TorusGeometry(0.12,0.045,12,20), mat(0xD2B48C));
  bagel.rotation.x = -Math.PI/2; bagel.position.y = 0.045; bagel.castShadow = true; g.add(bagel);
  for (let i = 0; i < 8; i++) {
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.008,4,4), mat(0xF5DEB3));
    const angle = (i/8)*Math.PI*2;
    seed.position.set(Math.cos(angle)*0.12, 0.08, Math.sin(angle)*0.12); g.add(seed);
  }
  return g;
}

export function createWatch() {
  const g = new THREE.Group();
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.02,16), mat(0xC0C0C0));
  face.position.y = 0.02; face.castShadow = true; g.add(face);
  const screen = new THREE.Mesh(new THREE.CircleGeometry(0.06,16), mat(0x000000));
  screen.position.y = 0.031; screen.rotation.x = -Math.PI/2; g.add(screen);
  const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.01,0.001,0.04), mat(0xFFD700));
  hand1.position.set(0,0.032,-0.02); g.add(hand1);
  const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.01,0.001,0.03), mat(0xFFD700));
  hand2.position.set(0.015,0.032,0); hand2.rotation.y = Math.PI/2; g.add(hand2);
  const band = new THREE.Mesh(new THREE.BoxGeometry(0.03,0.005,0.2), mat(0x000000));
  band.position.y = 0.01; g.add(band);
  return g;
}

export function createVendorCart() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.15,0.35), mat(0xC0C0C0));
  base.position.y = 0.4; base.castShadow = true; g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.6,6), mat(0x333333));
  pole.position.y = 0.75; g.add(pole);
  const umbrella = new THREE.Mesh(new THREE.ConeGeometry(0.4,0.25,8), mat(0xFF6347));
  umbrella.position.y = 1.1; umbrella.rotation.x = Math.PI; g.add(umbrella);
  for (const x of [-0.2,0.2]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.04,12), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.08,-0.15); g.add(wheel);
  }
  return g;
}

export function createMailbox() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.25,0.35,0.22), mat(0x0047AB));
  box.position.y = 0.5; box.castShadow = true; g.add(box);
  const logo = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.08,0.01), mat(0xFFFFFF));
  logo.position.set(0,0.55,0.12); g.add(logo);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.02,0.01), mat(0x000000));
  slot.position.set(0,0.65,0.12); g.add(slot);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.5,8), mat(0x333333));
  pole.position.y = 0.25; g.add(pole);
  return g;
}

export function createDumpster() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6,0.4,0.4), mat(0x3A5F3A));
  body.position.y = 0.25; body.castShadow = true; g.add(body);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(0.62,0.05,0.42), mat(0x2F4F2F));
  lid.position.y = 0.48; g.add(lid);
  for (const x of [-0.25,0.25]) for (const z of [-0.15,0.15]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.04,8), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.05,z); g.add(wheel);
  }
  return g;
}

export function createPedestrian() {
  const g = new THREE.Group();
  for (const x of [-0.06,0.06]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.3,0.08), mat(0x4A4A4A));
    leg.position.set(x,0.15,0); leg.castShadow = true; g.add(leg);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.22,0.35,0.12), mat(0x2F4F4F));
  torso.position.y = 0.48; g.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), mat(0xFFDBAC));
  head.position.y = 0.75; g.add(head);
  for (const x of [-0.16,0.16]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.28,0.06), mat(0x2F4F4F));
    arm.position.set(x,0.48,0); g.add(arm);
  }
  return g;
}

export function createTourist() {
  const g = new THREE.Group();
  for (const x of [-0.06,0.06]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.25,0.08), mat(0xC3B091));
    leg.position.set(x,0.13,0); leg.castShadow = true; g.add(leg);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.24,0.32,0.14), mat(0xFF6B6B));
  torso.position.y = 0.45; g.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.09,8,8), mat(0xFFDBAC));
  head.position.y = 0.7; g.add(head);
  const cam = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.06,0.08), mat(0x000000));
  cam.position.set(0.1,0.4,0.12); g.add(cam);
  return g;
}

export function createDog() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.14,0.12,0.24), mat(0x8B4513));
  body.position.y = 0.15; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8), mat(0xA0522D));
  head.position.set(0,0.18,0.16); g.add(head);
  for (const side of [-1,1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.03,0.08,4), mat(0x8B4513));
    ear.position.set(side*0.06,0.24,0.16); ear.rotation.z = side*Math.PI/6; g.add(ear);
  }
  for (const x of [-0.05,0.05]) for (const z of [-0.08,0.08]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.12,6), mat(0x8B4513));
    leg.position.set(x,0.06,z); g.add(leg);
  }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.01,0.14,6), mat(0x8B4513));
  tail.position.set(0,0.2,-0.15); tail.rotation.x = Math.PI/3; g.add(tail);
  return g;
}

export function createHydrant() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.35,8), mat(0xDC143C));
  body.position.y = 0.18; body.castShadow = true; g.add(body);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), mat(0xFFD700));
  dome.position.y = 0.38; g.add(dome);
  for (const side of [-1,1]) {
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.12,6), mat(0xC0C0C0));
    nozzle.rotation.z = Math.PI/2; nozzle.position.set(side*0.12,0.25,0); g.add(nozzle);
  }
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.04,8), mat(0xA52A2A));
  base.position.y = 0.02; g.add(base);
  return g;
}

export function createBenchNY() {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.04,0.18), mat(0x2F4F2F));
  seat.position.y = 0.22; seat.castShadow = true; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.25,0.04), mat(0x2F4F2F));
  back.position.set(0,0.35,-0.07); g.add(back);
  for (const x of [-0.2,0.2]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04,0.22,0.04), mat(0x1A1A1A));
    leg.position.set(x,0.11,0); g.add(leg);
  }
  return g;
}

export function createStatue() {
  const g = new THREE.Group();
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.4,0.3), mat(0x808080));
  pedestal.position.y = 0.2; pedestal.castShadow = true; g.add(pedestal);
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.25,0.1), mat(0x696969));
  body.position.y = 0.53; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8), mat(0x696969));
  head.position.y = 0.73; g.add(head);
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.08,0.01), mat(0xCD7F32));
  plaque.position.set(0,0.15,0.16); g.add(plaque);
  return g;
}

export function createBike() {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.05,0.05), mat(0x4169E1));
  frame.position.y = 0.25; frame.castShadow = true; g.add(frame);
  for (const x of [-0.18,0.18]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.12,0.02,8,16), mat(0x1A1A1A));
    wheel.position.set(x,0.12,0); wheel.rotation.y = Math.PI/2; g.add(wheel);
  }
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.02,0.12), mat(0x000000));
  seat.position.y = 0.35; g.add(seat);
  return g;
}

export function createFoodtruck() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.0,0.5,0.6), mat(0xFF69B4));
  body.position.y = 0.45; body.castShadow = true; g.add(body);
  const win = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.2,0.01), mat(0xFFFFFF));
  win.position.set(-0.2,0.5,0.31); g.add(win);
  const menu = new THREE.Mesh(new THREE.BoxGeometry(0.25,0.15,0.01), mat(0x000000));
  menu.position.set(0.2,0.55,0.31); g.add(menu);
  for (const x of [-0.35,-0.1,0.35]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.08,12), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.12,-0.25); g.add(wheel);
  }
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.3,8), mat(0xC0C0C0));
  chimney.position.set(0.3,0.85,0); g.add(chimney);
  return g;
}

export function createTaxi() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.3,0.45), mat(0xFFD700));
  body.position.y = 0.25; body.castShadow = true; g.add(body);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.2,0.4), mat(0xFFD700));
  cab.position.y = 0.45; g.add(cab);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.48,0.15,0.01), mat(0x87CEEB));
  windshield.position.set(0,0.45,0.21); g.add(windshield);
  const light = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.05,0.08), mat(0x000000));
  light.position.y = 0.58; g.add(light);
  for (const x of [-0.3,0.3]) for (const z of [-0.18,0.18]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.06,12), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.1,z); g.add(wheel);
  }
  return g;
}

export function createBus() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.2,0.5,0.5), mat(0xFFD700));
  body.position.y = 0.45; body.castShadow = true; g.add(body);
  for (let i = 0; i < 4; i++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.15,0.01), mat(0x333333));
    win.position.set(-0.45+i*0.3,0.55,0.26); g.add(win);
  }
  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.3,0.48), mat(0xFFD700));
  hood.position.set(0.65,0.35,0); g.add(hood);
  for (const x of [-0.5,0,0.5]) for (const z of [-0.22,0.22]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.08,12), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.12,z); g.add(wheel);
  }
  return g;
}

export function createHorse() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.2,0.5), mat(0x8B4513));
  body.position.y = 0.5; body.castShadow = true; g.add(body);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.3,0.12), mat(0xA0522D));
  neck.position.set(0,0.65,0.3); g.add(neck);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.18,0.2), mat(0xA0522D));
  head.position.set(0,0.85,0.35); g.add(head);
  for (const x of [-0.1,0.1]) for (const z of [-0.18,0.18]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.4,8), mat(0x8B4513));
    leg.position.set(x,0.2,z); g.add(leg);
  }
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.03,0.3,0.03), mat(0x000000));
  tail.position.set(0,0.45,-0.3); tail.rotation.x = -Math.PI/4; g.add(tail);
  return g;
}

export function createTreeNY() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,0.7,8), mat(0x8B4513));
  trunk.position.y = 0.35; trunk.castShadow = true; g.add(trunk);
  for (let i = 0; i < 5; i++) {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18+Math.random()*0.08,8,8), mat(0x228B22));
    sphere.position.set((Math.random()-0.5)*0.3, 0.65+Math.random()*0.15, (Math.random()-0.5)*0.3);
    sphere.castShadow = true; g.add(sphere);
  }
  return g;
}

export function createHotdogStand() {
  const g = new THREE.Group();
  const cart = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.3,0.5), mat(0xC0C0C0));
  cart.position.y = 0.4; cart.castShadow = true; g.add(cart);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,6), mat(0x333333));
  pole.position.y = 0.9; g.add(pole);
  const umbrella = new THREE.Mesh(new THREE.ConeGeometry(0.5,0.3,8), mat(0xFF0000));
  umbrella.position.y = 1.35; umbrella.rotation.x = Math.PI; g.add(umbrella);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.1,0.02), mat(0xFFD700));
  sign.position.set(0,0.6,0.26); g.add(sign);
  for (const x of [-0.25,0.25]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.06,12), mat(0x1A1A1A));
    wheel.rotation.z = Math.PI/2; wheel.position.set(x,0.1,-0.2); g.add(wheel);
  }
  return g;
}

export function createBrownstone() {
  const g = new THREE.Group();
  const building = new THREE.Mesh(new THREE.BoxGeometry(0.6,1.8,0.5), mat(0x8B4513));
  building.position.y = 0.9; building.castShadow = true; g.add(building);
  const steps = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.15,0.2), mat(0x696969));
  steps.position.set(0,0.08,0.35); g.add(steps);
  for (let floor = 0; floor < 5; floor++) for (let col = 0; col < 2; col++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.15,0.01), mat(0xF0E68C));
    win.position.set((col-0.5)*0.25, 0.3+floor*0.32, 0.26); g.add(win);
  }
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.25,0.01), mat(0x3A2010));
  door.position.set(0,0.2,0.26); g.add(door);
  return g;
}

export function createCraneNY() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.5), mat(0xFFD700));
  base.position.y = 0.15; base.castShadow = true; g.add(base);
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.12,1.8,0.12), mat(0x696969));
  tower.position.y = 1.05; g.add(tower);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2,0.08,0.08), mat(0xFFD700));
  arm.position.set(0.5,1.9,0); g.add(arm);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.8,6), mat(0x000000));
  cable.position.set(0.8,1.5,0); g.add(cable);
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.06,0.06), mat(0x808080));
  hook.position.set(0.8,1.1,0); g.add(hook);
  return g;
}

export function createSkyscraper() {
  const g = new THREE.Group();
  const building = new THREE.Mesh(new THREE.BoxGeometry(0.7,2.5,0.7), mat(0x4682B4));
  building.position.y = 1.25; building.castShadow = true; g.add(building);
  for (let floor = 0; floor < 12; floor++) for (let col = 0; col < 3; col++) for (const side of [0.36,-0.36]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.15,0.01), mat(0x191970));
    win.position.set((col-1)*0.22, 0.15+floor*0.2, side); g.add(win);
  }
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.5,6), mat(0xC0C0C0));
  antenna.position.y = 2.75; g.add(antenna);
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.03,6,6), mat(0xFF0000));
  light.position.y = 3.0; g.add(light);
  return g;
}

// ====== FACTORY MAPS ======
export const FACTORIES_SOUQ = {
  dates: createDates, coffee: createCoffee, incense: createIncense,
  sandals: createSandals, cat: createCat, pot: createPot,
  lantern: createLantern, melon: createMelon, bread: createBread, ring: createRing,
  spices: createSpices, carpet: createCarpet, crate: createCrate,
  person: createPerson, woman: createWoman, goat: createGoat,
  barrel: createBarrel, bench: createBench, fountain: createFountain, cart: createCart,
  stall: createStall, car: createCar, truck: createTruck,
  camel: createCamel, palm: createPalm, tent: createTent,
  building: createBuilding, tower: createTower, mosque: createMosque,
  bonus5: createBonus5, bonus10: createBonus10,
};

export const FACTORIES_NY = {
  hotdog: createHotdog, coffee_ny: createCoffeeNY, pigeon: createPigeon,
  sneakers: createSneakers, rat: createRat, pizza: createPizza,
  newspaper: createNewspaper, pretzel: createPretzel, bagel: createBagel, watch: createWatch,
  vendor_cart: createVendorCart, mailbox: createMailbox, dumpster: createDumpster,
  pedestrian: createPedestrian, tourist: createTourist, dog: createDog,
  hydrant: createHydrant, bench_ny: createBenchNY, statue: createStatue, bike: createBike,
  foodtruck: createFoodtruck, taxi: createTaxi, bus: createBus,
  horse: createHorse, tree_ny: createTreeNY, hotdog_stand: createHotdogStand,
  brownstone: createBrownstone, crane_ny: createCraneNY, skyscraper: createSkyscraper,
  bonus5: createBonus5, bonus10: createBonus10,
};

// Combined factory lookup for custom maps
export const ALL_FACTORIES = { ...FACTORIES_SOUQ, ...FACTORIES_NY };
