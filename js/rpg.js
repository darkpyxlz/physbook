/* Scibook RPG (survivor-style). Gear in six slots and six rarities that you upgrade only by merging three
   identical items; pets that fight beside you; roguelite skill picks inside each fight; chests, eggs and a
   daily supply; unit bosses and the endless Trials. Every currency is earned by learning. */
(function () {
  'use strict';
  const PB = window.PB;

  /* ---------------- Data ---------------- */
  const RAR = [
    { name: 'Common', mult: 1, col: '#9aa3b5', dark: '#5d6578' },
    { name: 'Good', mult: 2, col: '#34c26f', dark: '#17703d' },
    { name: 'Better', mult: 3.5, col: '#3d8bff', dark: '#1d4fa8' },
    { name: 'Excellent', mult: 6, col: '#b05cff', dark: '#6b23b8' },
    { name: 'Epic', mult: 10, col: '#ffb020', dark: '#b06a00' },
    { name: 'Legend', mult: 16, col: '#ff4d4d', dark: '#a81616' }
  ];
  const SLOTS = [['weapon', 'Weapon', 'atk', 12, '🗡️'], ['necklace', 'Necklace', 'atk', 6, '📿'], ['gloves', 'Gloves', 'atk', 6, '🧤'], ['armour', 'Armour', 'hp', 60, '🛡️'], ['belt', 'Belt', 'hp', 40, '🎗️'], ['boots', 'Boots', 'hp', 30, '👢']];
  const slotInfo = (s) => SLOTS.find((x) => x[0] === s);
  // Passive values for [Excellent, Epic, Legend].
  const BASES = [
    { id: 'laser', slot: 'weapon', name: 'Laser Pointer', icon: '🔦', p: 'crit', v: [0.06, 0.12, 0.2], desc: (x) => '+' + Math.round(x * 100) + '% critical-hit chance' },
    { id: 'tesla', slot: 'weapon', name: 'Tesla Coil', icon: '⚡', p: 'double', v: [0.15, 0.25, 0.4], desc: (x) => Math.round(x * 100) + '% chance to strike twice' },
    { id: 'electron', slot: 'necklace', name: 'Lucky Electron', icon: '🧿', p: 'loot', v: [0.15, 0.3, 0.5], desc: (x) => '+' + Math.round(x * 100) + '% gold and egg fragments from fights' },
    { id: 'golden', slot: 'necklace', name: 'Golden Ratio Pendant', icon: '📿', p: 'atkpct', v: [0.08, 0.15, 0.25], desc: (x) => '+' + Math.round(x * 100) + '% attack' },
    { id: 'nitrile', slot: 'gloves', name: 'Nitrile Gloves', icon: '🧤', p: 'opener', v: [1.5, 2, 3], desc: (x) => 'first hit of each fight deals ×' + x },
    { id: 'tweezers', slot: 'gloves', name: 'Precision Tweezers', icon: '🥢', p: 'combo', v: [0.06, 0.1, 0.16], desc: (x) => '+' + Math.round(x * 100) + '% damage per correct answer in a row' },
    { id: 'coat', slot: 'armour', name: 'Lab Coat', icon: '🥼', p: 'block', v: [1, 1, 2], desc: (x) => 'blocks the first ' + (x > 1 ? x + ' hits' : 'hit') + ' of each fight' },
    { id: 'faraday', slot: 'armour', name: 'Faraday Suit', icon: '🛡️', p: 'dr', v: [0.1, 0.2, 0.32], desc: (x) => '−' + Math.round(x * 100) + '% damage taken' },
    { id: 'utility', slot: 'belt', name: 'Utility Belt', icon: '🎒', p: 'coffee', v: [1, 1, 2], desc: (x) => '+' + x + ' free coffee per fight' },
    { id: 'mito', slot: 'belt', name: 'Mitochondria Belt', icon: '🦠', p: 'lifesteal', v: [0.03, 0.06, 0.1], desc: (x) => 'heal ' + Math.round(x * 100) + '% max HP on each correct answer' },
    { id: 'rocket', slot: 'boots', name: 'Rocket Boots', icon: '🚀', p: 'dodge', v: [0.08, 0.15, 0.25], desc: (x) => Math.round(x * 100) + '% chance to dodge a strike' },
    { id: 'field', slot: 'boots', name: 'Field Boots', icon: '🥾', p: 'revive', v: [0.2, 0.35, 0.6], desc: (x) => 'revive once at ' + Math.round(x * 100) + '% HP' }
  ];
  const base = (id) => BASES.find((b) => b.id === id);
  // Pets: one active. Bonus to hero ATK and HP by rarity, plus an ability that scales with rarity.
  const PET_BONUS = [0.03, 0.06, 0.1, 0.15, 0.22, 0.3];
  const PETS = [
    { id: 'pavlov', name: 'Pavlov', kind: 'dog', icon: '🐕', p: 'bite', v: [0.2, 0.3, 0.45, 0.6, 0.8, 1], desc: (x) => 'bites for ' + Math.round(x * 100) + '% ATK on each correct answer' },
    { id: 'schrodinger', name: 'Schrödinger', kind: 'cat', icon: '🐈', p: 'dodge', v: [0.05, 0.08, 0.12, 0.16, 0.2, 0.25], desc: (x) => Math.round(x * 100) + '% chance the strike both hits and misses you (it misses)' },
    { id: 'darwin', name: 'Darwin', kind: 'finch', icon: '🐦', p: 'lifesteal', v: [0.02, 0.03, 0.04, 0.06, 0.08, 0.1], desc: (x) => 'heals ' + Math.round(x * 100) + '% max HP on each correct answer' },
    { id: 'tardi', name: 'Tardi', kind: 'tardigrade', icon: '🐛', p: 'survive', v: [0.1, 0.15, 0.2, 0.3, 0.4, 0.5], desc: (x) => 'once per fight, survive a lethal hit and heal ' + Math.round(x * 100) + '%' },
    { id: 'dolly', name: 'Dolly', kind: 'sheep', icon: '🐑', p: 'clone', v: [0.1, 0.15, 0.2, 0.25, 0.3, 0.4], desc: (x) => Math.round(x * 100) + '% chance to clone your hit' },
    { id: 'fermi', name: 'Fermi', kind: 'fox', icon: '🦊', p: 'auto', v: [0.1, 0.15, 0.22, 0.3, 0.4, 0.5], desc: (x) => 'pounces for ' + Math.round(x * 100) + '% ATK every turn' }
  ];
  const pet = (id) => PETS.find((p) => p.id === id);
  // In-fight skills (roguelite picks). Each goes to level 5, where it evolves (×1.5).
  const SKILLS = [
    { id: 'beam', name: 'Proton Beam', evo: 'Particle Accelerator', icon: '🔆', desc: (l, e) => '+' + Math.round(20 * l * e) + '% damage' },
    { id: 'drone', name: 'Lab Drone', evo: 'Drone Swarm', icon: '🛸', desc: (l, e) => 'shoots for ' + Math.round(15 * l * e) + '% ATK every turn' },
    { id: 'cage', name: 'Faraday Cage', evo: 'Superconducting Shield', icon: '🧲', desc: (l, e) => '−' + Math.round(Math.min(60, 8 * l * e)) + '% damage taken' },
    { id: 'rod', name: 'Lightning Rod', evo: 'Thunderstorm', icon: '🌩️', desc: (l, e) => Math.round(Math.min(90, 12 * l * e)) + '% chance of a bonus full-ATK strike' },
    { id: 'acid', name: 'Acid Splash', evo: 'Aqua Regia', icon: '🧪', desc: (l, e) => 'each correct answer adds a burn of ' + Math.round(6 * l * e) + '% ATK per turn (up to 5 stacks)' },
    { id: 'heal', name: 'Second Wind', evo: 'Regeneration', icon: '💚', desc: (l, e) => 'heal 10% now, then ' + Math.round(2 * l * e) + '% per correct answer' },
    { id: 'focus', name: 'Laser Focus', evo: 'Perfect Aim', icon: '🎯', desc: (l, e) => '+' + Math.round(6 * l * e) + '% crit chance' },
    { id: 'field', name: 'Force Field', evo: 'Event Horizon', icon: '🔵', desc: (l, e) => 'gain a block every ' + Math.max(1, Math.round((6 - l) / e)) + ' turns' }
  ];
  const skill = (id) => SKILLS.find((s) => s.id === id);
  const SKILL_AT = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
  const CLASSES = {
    physicist: { name: 'Physicist', icon: '⚛️', subject: 'physics', attr: 'Might', perk: '+20% attack' },
    chemist: { name: 'Chemist', icon: '⚗️', subject: 'chemistry', attr: 'Alchemy', perk: 'coffee heals double' },
    biologist: { name: 'Biologist', icon: '🧬', subject: 'biology', attr: 'Vitality', perk: '+25% HP' },
    astronomer: { name: 'Astronomer', icon: '🔭', subject: 'astronomy', attr: 'Insight', perk: '+10% critical-hit chance' },
    mathematician: { name: 'Mathematician', icon: '∑', subject: 'maths', attr: 'Logic', perk: 'four skill choices at every level-up instead of three' }
  };
  const ATTR = { maths: 'Logic', physics: 'Might', chemistry: 'Alchemy', biology: 'Vitality', astronomy: 'Insight' };
  const BOSS_NAMES = {
    maths: { 'Precalculus': ['The Asymptote Serpent', '🐍'], 'Calculus': ['The Infinitesimal Imp', '😈'], 'Further Calculus': ['The Divergent Dragon', '🐲'], 'Olympiad Foundations': ['The Pigeonhole Golem', '🗿'], 'Olympiad Topics': ['The Lemma Leviathan', '🐙'] },
    physics: { 'Foundations': ['The Dimensional Golem', '🗿'], 'Mechanics': ['Newton’s Juggernaut', '🦏'], 'Thermal Physics': ['The Entropy Wyrm', '🐉'], 'Electricity & Magnetism': ['The Maxwell Hydra', '🐍'], 'Optics': ['The Prism Wraith', '👻'], 'Modern Physics': ['The Quantum Phantom', '🌫️'], 'Olympiad Extensions': ['The Lagrangian Leviathan', '🐋'] },
    chemistry: { 'Foundations': ['The Mole Rat King', '🐀'], 'Physical Chemistry': ['The Gibbs Behemoth', '🦣'], 'Inorganic Chemistry': ['The Lanthanide Lich', '💀'], 'Organic Chemistry': ['The Carbocation Chimera', '🦁'], 'Analysis': ['The Spectral Sphinx', '🗝️'] },
    biology: { 'Cells and Molecules': ['The Rogue Ribosome', '🧫'], 'Genetics': ['The Mutant Mendel', '🧟'], 'Physiology': ['The Adrenal Ogre', '👹'], 'Diversity of Life': ['The Chimeric Kraken', '🦑'], 'Evolution and Ecology': ['The Red Queen', '👑'] },
    astronomy: { 'The Sky': ['The Eclipse Serpent', '🌑'], 'The Solar System': ['The Comet Drake', '☄️'], 'The Stars': ['The Red Giant', '🔴'], 'Galaxies and Cosmology': ['The Dark Energy Titan', '🌌'] }
  };
  const SUPPLY = [['gold', 200], ['gems', 30], ['keys', 1], ['frags', 6], ['gold', 500], ['gems', 60], ['keys', 3]];
  const TOWER_RUNS = 3;
  const CHESTS = {
    supply: { kind: 'gear', name: 'Supply Crate', icon: '📦', cost: ['keys', 1], odds: [70, 25, 5, 0, 0, 0] },
    premium: { kind: 'gear', name: 'Research Grant Chest', icon: '🎁', cost: ['gems', 120], odds: [0, 55, 33, 10, 2, 0], pity: 30 },
    premium10: { kind: 'gear', name: '10 × Research Grant', icon: '🎁', cost: ['gems', 1080], n: 10, odds: [0, 55, 33, 10, 2, 0], pity: 30 },
    egg: { kind: 'pet', name: 'Pet Egg', icon: '🥚', cost: ['frags', 10], odds: [60, 30, 10, 0, 0, 0] },
    goldegg: { kind: 'pet', name: 'Golden Egg', icon: '🪺', cost: ['gems', 150], odds: [0, 55, 33, 10, 2, 0], pity: 30 }
  };
  const ICON = { gold: '◉', gems: '💎', keys: '🗝️', frags: '🧩' };
  const NAME = { gold: 'gold', gems: 'gems', keys: 'keys', frags: 'egg fragments' };

  /* ---------------- State and migration ---------------- */
  const R = function () {
    const S = PB.S;
    if (!S.rpg) S.rpg = {};
    const r = S.rpg;
    if (!r.v2) {
      let refund = 0;
      const old = { goggles: 60, cap: 160, helmet: 420, coat: 80, vest: 220, exosuit: 520, rule: 70, scope: 190, collider: 480, electron: 110, mito: 260, galaxy: 340 };
      Object.keys(r.owned || {}).forEach((k) => { refund += old[k] || 0; });
      r.gold = (r.gold || 0) + refund;
      r.owned = {}; r.equip = {}; r.inv = []; r.uid = 1;
      r.gems = 200; r.keys = 3; r.scrolls = { weapon: 3, necklace: 3, gloves: 3, armour: 3, belt: 3, boots: 3 };
      r.pity = 0; r.supply = { last: null, streak: 0 }; r.tower = { best: 0, day: null, runs: 0 };
      r.v2 = 1; r.starter = false;
    }
    if (!r.v3) {
      // Gear levelling was removed: refund gold spent on levels, turn design scrolls into egg fragments.
      let refund = 0;
      (r.inv || []).forEach((it) => { refund += it.spent || 0; it.l = 1; delete it.spent; delete it.sc; });
      r.gold = (r.gold || 0) + refund;
      r.frags = (r.frags || 0) + Object.keys(r.scrolls || {}).reduce((a, k) => a + (r.scrolls[k] || 0), 0);
      delete r.scrolls;
      r.pets = r.pets || []; r.pet = null; r.petPity = 0; r.evolved = 0;
      r.v3 = 1;
    }
    r.gold = r.gold || 0; r.earned = r.earned || 0; r.potions = r.potions || 0; r.defeated = r.defeated || {}; r.trophies = r.trophies || {};
    r.inv = r.inv || []; r.equip = r.equip || {}; r.pets = r.pets || []; r.frags = r.frags || 0; r.uid = r.uid || 1;
    r.gems = r.gems || 0; r.keys = r.keys || 0; r.tower = r.tower || { best: 0, day: null, runs: 0 }; r.supply = r.supply || { last: null, streak: 0 };
    return r;
  };
  const newItem = (b, rar) => { const r = R(); const it = { uid: r.uid++, b: b, r: rar }; r.inv.push(it); return it; };
  const newPet = (p, rar) => { const r = R(); const it = { uid: r.uid++, p: p, r: rar }; r.pets.push(it); return it; };
  const item = (uid) => R().inv.find((i) => i.uid === uid);
  const petItem = (uid) => R().pets.find((i) => i.uid === uid);
  const equipped = (it) => (it.p ? R().pet === it.uid : R().equip[base(it.b).slot] === it.uid);

  /* ---------------- Stats ---------------- */
  const itemStat = (it) => { const sl = slotInfo(base(it.b).slot); return { kind: sl[2], val: Math.round(sl[3] * RAR[it.r].mult) }; };
  const passiveOf = (it) => { const b = base(it.b); return it.r >= 3 ? { p: b.p, v: b.v[it.r - 3] } : null; };
  function earnedIn(sid) { let n = 0; Object.keys(PB.S.solved).forEach((pid) => { const p = PB.problem(pid); if (p && PB.chapter(p.chapter).subject === sid) n += PB.S.solved[pid].pts; }); return n; }
  function attrs() { const o = {}; PB.SUBJECTS.forEach((s) => { o[s.id] = 1 + Math.floor(Math.sqrt(earnedIn(s.id)) / 2); }); return o; }
  function stats() {
    const r = R(), a = attrs(), lv = PB.levelInfo().level;
    let atk = 20 + 2 * lv, hp = 150 + 10 * lv;
    const pass = {};
    SLOTS.forEach((s) => { const it = item(r.equip[s[0]]); if (!it) return; const st = itemStat(it); if (st.kind === 'atk') atk += st.val; else hp += st.val; const ps = passiveOf(it); if (ps) pass[ps.p] = (pass[ps.p] || 0) + ps.v; });
    hp += 3 * a.biology;
    if (pass.atkpct) atk *= 1 + pass.atkpct;
    const pi = petItem(r.pet), pd = pi ? pet(pi.p) : null;
    if (pi) { atk *= 1 + PET_BONUS[pi.r]; hp *= 1 + PET_BONUS[pi.r]; }
    if (r.cls === 'physicist') atk *= 1.2;
    if (r.cls === 'biologist') hp *= 1.25;
    const crit = Math.min(0.6, 0.05 + a.astronomy * 0.005 + (pass.crit || 0) + (r.cls === 'astronomer' ? 0.1 : 0));
    atk = Math.round(atk); hp = Math.round(hp);
    const petAb = pi ? { p: pd.p, v: pd.v[pi.r], pet: pd, it: pi } : null;
    return { level: lv, attrs: a, atk: atk, hp: hp, crit: crit, pass: pass, pet: petAb, cls: CLASSES[r.cls], power: Math.round(atk * 4 + hp * 0.6 + crit * 500 + Object.keys(pass).length * 120 + (pi ? 150 * (pi.r + 1) : 0)) };
  }

  /* ---------------- Currencies ---------------- */
  function give(kind, n, why, quiet) {
    if (!(n > 0)) return;
    const r = R();
    if (kind === 'gold') { r.gold += n; r.earned += n; } else r[kind] = (r[kind] || 0) + n;
    PB.save();
    PB.emit({ type: 'gold', amount: n, kind: kind });
    if (!quiet && kind !== 'gold') PB.emit({ type: 'loot', icon: ICON[kind], text: '+' + n + ' ' + NAME[kind] + (why ? ' · ' + why : '') });
  }
  PB.rpg = { gold: () => R().gold, gems: () => R().gems, keys: () => R().keys, frags: () => R().frags, stats: stats, give: give, hasHero: () => !!R().cls };
  let gymCount = 0;
  PB.on(function (ev) {
    if (ev.type === 'xp' && ev.amount > 0) {
      const reason = ev.reason || '', r = R();
      let g = 0;
      if (reason.indexOf('Solved ') === 0) {
        g = ev.amount * 0.5;
        const p = PB.problem(reason.slice(7));
        if (p && r.cls && CLASSES[r.cls].subject === PB.chapter(p.chapter).subject) g *= 1.25;
        if (p && PB.isDaily(p)) give('keys', 1, 'daily challenge');
        if (p && p.level === 'olympiad') give('frags', 1, 'olympiad problem', true);
      } else if (reason.indexOf('Gym') === 0) { g = ev.amount * 0.3; gymCount++; if (gymCount % 5 === 0) give('frags', 1, 'gym streak', true); }
      else if (reason.indexOf('Read') === 0 || reason.indexOf('Explored') === 0) g = 2;
      if (g) give('gold', Math.max(1, Math.round(g)));
    }
    if (ev.type === 'quest') give('gems', ev.quest && /All three/.test(ev.quest.text) ? 40 : 15, 'quest', true);
    if (ev.type === 'badge') give('gems', 20, 'badge', true);
    if (ev.type === 'levelup') { give('gems', 50, 'level up'); give('keys', 2, 'level up'); }
    if (ev.type === 'unlock') give('keys', 1, 'chapter unlocked');
  });

  /* ---------------- Gear and pet actions ---------------- */
  const isPet = (it) => !!it.p;
  const listOf = (it) => (isPet(it) ? R().pets : R().inv);
  const sameAs = (it) => (x) => (isPet(it) ? x.p === it.p : x.b === it.b) && x.r === it.r && x.uid !== it.uid;
  const mergeable = (it) => listOf(it).filter(sameAs(it));
  function merge(it) {
    const r = R(), mates = mergeable(it);
    if (it.r >= 5 || mates.length < 2) return null;
    const use = [it].concat(mates.sort((a, b) => (equipped(b) ? 1 : 0) - (equipped(a) ? 1 : 0)).slice(0, 2));
    const wasEq = use.some(equipped);
    let out;
    if (isPet(it)) { r.pets = r.pets.filter((x) => use.indexOf(x) < 0); out = newPet(it.p, it.r + 1); if (wasEq) r.pet = out.uid; }
    else { r.inv = r.inv.filter((x) => use.indexOf(x) < 0); out = newItem(it.b, it.r + 1); if (wasEq) r.equip[base(it.b).slot] = out.uid; }
    PB.checkBadges(); PB.save();
    return out;
  }
  function autoMerge() { let n = 0, again = true; while (again) { again = false; for (const it of R().inv.concat(R().pets).sort((a, b) => a.r - b.r)) { if (it.r < 5 && mergeable(it).length >= 2) { merge(it); n++; again = true; break; } } } return n; }
  function equip(it) { if (isPet(it)) R().pet = it.uid; else R().equip[base(it.b).slot] = it.uid; PB.checkBadges(); PB.save(); }
  function salvage(it) {
    const r = R();
    if (isPet(it)) { if (r.pet === it.uid) r.pet = null; r.pets = r.pets.filter((x) => x.uid !== it.uid); }
    else { if (equipped(it)) r.equip[base(it.b).slot] = null; r.inv = r.inv.filter((x) => x.uid !== it.uid); }
    const back = { gold: 15 * Math.pow(it.r + 1, 2), frags: it.r + 1 };
    r.gold += back.gold; r.frags += back.frags; PB.save();
    return back;
  }
  function roll(odds) { const t = odds.reduce((a, x) => a + x, 0); let u = Math.random() * t; for (let i = 0; i < odds.length; i++) { if (u < odds[i]) return i; u -= odds[i]; } return 0; }
  function openChest(key) {
    const c = CHESTS[key], r = R(), n = c.n || 1, pk = c.kind === 'pet' ? 'petPity' : 'pity';
    if ((r[c.cost[0]] || 0) < c.cost[1]) return null;
    r[c.cost[0]] -= c.cost[1];
    const got = [];
    for (let i = 0; i < n; i++) {
      let rr = roll(c.odds);
      if (c.pity) { r[pk] = (r[pk] || 0) + 1; if (rr >= 4) r[pk] = 0; else if (r[pk] >= c.pity) { rr = 4; r[pk] = 0; } }
      got.push(c.kind === 'pet' ? newPet(PETS[Math.floor(Math.random() * PETS.length)].id, rr) : newItem(BASES[Math.floor(Math.random() * BASES.length)].id, rr));
    }
    PB.checkBadges(); PB.save();
    return got;
  }
  // A chest granted as a reward (no cost). Returns the items, and announces the best one.
  PB.rpg.grantChest = function (key) {
    const c = CHESTS[key], r = R();
    if (!c) return [];
    r[c.cost[0]] = (r[c.cost[0]] || 0) + c.cost[1];
    const got = openChest(key) || [];
    if (got.length) { const best = got.reduce((a, x) => (x.r > a.r ? x : a)); const bb = isPet(best) ? pet(best.p) : base(best.b); PB.emit({ type: 'loot', icon: bb.icon, text: c.name + ': ' + RAR[best.r].name + ' ' + bb.name }); }
    return got;
  };
  PB.rpg.chestName = (key) => (CHESTS[key] ? CHESTS[key].name : key);
  PB.rpg.chestIcon = (key) => (CHESTS[key] ? CHESTS[key].icon : '🎁');
  const dayKeyOf = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function claimSupply() {
    const r = R(), t = PB.today();
    if (r.supply.last === t) return null;
    const y = new Date(); y.setDate(y.getDate() - 1);
    r.supply.streak = r.supply.last === dayKeyOf(y) ? r.supply.streak + 1 : 0;
    r.supply.last = t;
    const g = SUPPLY[r.supply.streak % 7];
    give(g[0], g[1], 'daily supply');
    return g;
  }

  /* ---------------- Bosses ---------------- */
  const BOSSES = [];
  function buildBosses() {
    BOSSES.length = 0;
    PB.SUBJECTS.forEach((sub) => {
      sub.parts.forEach((part, i) => {
        const chs = PB.chaptersOf(sub.id).filter((c) => c.part === part);
        if (!chs.length) return;
        const nm = (BOSS_NAMES[sub.id] || {})[part] || ['Guardian of ' + part, '🐲'];
        const tier = i + 1;
        BOSSES.push({ id: sub.id + '-' + i, subject: sub.id, part: part, name: nm[0], icon: nm[1], chapters: chs, tier: tier,
          hp: Math.round(260 * Math.pow(1.55, tier - 1)), atk: Math.round(38 * Math.pow(1.35, tier - 1)), need: Math.min(3, chs.length),
          gold: 120 + 60 * tier, gems: 50 + 10 * tier, xp: 40 + 10 * tier });
      });
    });
  }
  const bossReady = (b) => b.chapters.filter((c) => PB.isPassed(c)).length >= b.need;
  buildBosses();

  /* ---------------- Badges ---------------- */
  PB.BADGES.push(
    { id: 'boss1', mark: '⚔', name: 'Giant Slayer', desc: 'Defeat a unit boss.', test: () => Object.keys(R().defeated).length >= 1 },
    { id: 'boss5', mark: '⚔5', name: 'Monster Hunter', desc: 'Defeat 5 different unit bosses.', test: () => Object.keys(R().defeated).length >= 5 },
    { id: 'bossall', mark: '♛', name: 'Legend of Scibook', desc: 'Defeat every unit boss.', test: () => BOSSES.length > 0 && BOSSES.every((b) => R().defeated[b.id]) },
    { id: 'rich', mark: '◉', name: 'Grant Funded', desc: 'Earn 1000 gold in total.', test: () => R().earned >= 1000 },
    { id: 'kitted', mark: '⚙', name: 'Fully Kitted', desc: 'Fill all six equipment slots.', test: () => SLOTS.every((s) => item(R().equip[s[0]])) },
    { id: 'epicgear', mark: 'E', name: 'Epic Find', desc: 'Own an Epic item.', test: () => R().inv.some((i) => i.r >= 4) },
    { id: 'legendgear', mark: 'L', name: 'Legendary', desc: 'Merge a Legend item.', test: () => R().inv.some((i) => i.r >= 5) },
    { id: 'tower10', mark: 'T10', name: 'Tower Climber', desc: 'Reach floor 10 of the Trials.', test: () => (R().tower.best || 0) >= 10 },
    { id: 'pet1', mark: '🐾', name: 'Lab Companion', desc: 'Hatch a pet.', test: () => R().pets.length >= 1 },
    { id: 'petepic', mark: '🐾E', name: 'Best in Show', desc: 'Own an Epic pet.', test: () => R().pets.some((p) => p.r >= 4) },
    { id: 'evolve', mark: '✦', name: 'Evolution', desc: 'Evolve a skill to level 5 in a fight.', test: () => (R().evolved || 0) >= 1 }
  );

  /* ---------------- Card art ---------------- */
  const h = (...a) => PB.h(...a);
  function card(it, onClick, extra) {
    const rr = RAR[it.r], pt = isPet(it), b = pt ? pet(it.p) : base(it.b);
    const stars = '★'.repeat(it.r + 1);
    const slotIco = pt ? '🐾' : slotInfo(b.slot)[4];
    return h('button', { class: 'gcard r' + it.r + (extra || ''), type: 'button', style: '--rc:' + rr.col + ';--rd:' + rr.dark, title: rr.name + ' ' + b.name + (pt ? ' (pet)' : ''), onclick: onClick }, [
      h('span', { class: 'gcard-slot', text: slotIco }),
      h('span', { class: 'gcard-art', text: b.icon }),
      h('span', { class: 'gcard-stars', text: stars }),
      equipped(it) ? h('span', { class: 'gcard-eq', text: pt ? 'ACTIVE' : 'E' }) : null,
      it.r >= 4 ? h('span', { class: 'gcard-shine' }) : null
    ]);
  }
  function emptyCard(label, ico, onClick) { return h('button', { class: 'gcard empty', type: 'button', title: label + ': empty', onclick: onClick }, [h('span', { class: 'gcard-art', text: ico }), h('span', { class: 'gcard-stars', text: label })]); }
  function currencyBar() {
    const r = R();
    return h('div', { class: 'cur-bar' }, [['◉', r.gold, 'gold'], ['💎', r.gems, 'gems'], ['🗝️', r.keys, 'keys'], ['🧩', r.frags, 'egg fragments (10 hatch an egg)'], ['☕', r.potions, 'coffee']].map((c) => h('span', { class: 'cur', title: c[2] }, [h('b', { text: c[0] + ' ' + c[1] })])));
  }
  function hpBar(cur, max, cls) { const fr = Math.max(0, Math.min(1, cur / max)); return h('div', { class: 'hpbar ' + (cls || '') }, [h('span', { style: 'width:' + Math.round(fr * 100) + '%' }), h('b', { text: Math.max(0, Math.round(cur)) + ' / ' + max + ' HP' })]); }

  /* ---------------- Hero page ---------------- */
  let tab = 'hero', sel = null, slotFilter = 'all', lastLoot = null;
  function viewHero() {
    const r = R();
    buildBosses();
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Your character' }));
    wrap.appendChild(h('h1', { text: 'Hero & bosses', style: 'font-size:34px;margin-top:6px' }));
    if (!r.cls) {
      wrap.appendChild(h('p', { class: 'lede', text: 'Choose a class. Everything you learn then pays out: gold, gems, keys and egg fragments. Open chests for gear, hatch pets, merge three identical cards into a stronger one, and in every fight pick new skills as you answer correctly.' }));
      const g = h('div', { class: 'class-grid' });
      Object.keys(CLASSES).forEach((k) => {
        const c = CLASSES[k];
        g.appendChild(h('button', { class: 'class-card subj-' + c.subject, type: 'button', onclick: () => { r.cls = k; PB.save(); viewHero(); } }, [
          h('span', { class: 'class-ico', text: c.icon }), h('h3', { text: c.name }),
          h('p', { text: 'Main attribute: ' + c.attr + '. Perk: ' + c.perk + '. +25% gold from ' + PB.subject(c.subject).name.toLowerCase() + ' problems.' })
        ]));
      });
      wrap.appendChild(g);
      wrap.appendChild(h('p', { class: 'input-hint', text: 'You start with a Good weapon, a lab coat, a pet dog, 200 gems and 3 keys.' }));
      PB.setView([wrap], 'hero');
      return;
    }
    if (!r.starter) { r.starter = true; const c = CLASSES[r.cls]; equip(newItem(c.subject === 'physics' ? 'tesla' : 'laser', 1)); equip(newItem('coat', 0)); }
    if (!r.petStarter) { r.petStarter = true; equip(newPet('pavlov', 0)); }
    PB.save();
    wrap.appendChild(currencyBar());
    const tabs = h('nav', { class: 'tabs', style: 'margin-top:12px' });
    [['hero', 'Equipment'], ['bag', 'Bag (' + r.inv.length + ')'], ['pets', 'Pets (' + r.pets.length + ')'], ['chests', 'Chests & supply'], ['bosses', 'Bosses'], ['tower', 'Trials'], ['skills', 'Skills']].forEach((t) => tabs.appendChild(h('a', { class: 'tab' + (tab === t[0] ? ' active' : ''), href: '#hero', onclick: (e) => { e.preventDefault(); tab = t[0]; sel = null; viewHero(); } }, [t[1]])));
    wrap.appendChild(tabs);
    const body = h('div');
    wrap.appendChild(body);
    ({ hero: tabHero, bag: tabBag, pets: tabPets, chests: tabChests, bosses: tabBosses, tower: tabTower, skills: tabSkills })[tab](body);
    PB.setView([wrap], 'hero');
  }

  function detailPanel(it, rerender) {
    const pt = isPet(it), b = pt ? pet(it.p) : base(it.b), rr = RAR[it.r], mates = mergeable(it);
    const box = h('div', { class: 'gear-panel', style: '--rar:' + rr.col });
    box.appendChild(h('div', { class: 'gear-panel-head' }, [card(it, null, ' big'), h('div', {}, [h('b', { text: rr.name + ' ' + b.name }), h('small', { text: pt ? 'Pet · the ' + b.kind : slotInfo(b.slot)[1] })])]));
    if (pt) box.appendChild(h('p', { html: '<b>⚔ ATK +' + Math.round(PET_BONUS[it.r] * 100) + '% · ❤ HP +' + Math.round(PET_BONUS[it.r] * 100) + '%</b>' }));
    else { const st = itemStat(it); box.appendChild(h('p', { html: '<b>' + (st.kind === 'atk' ? '⚔ ATK +' : '❤ HP +') + st.val + '</b>' })); }
    const pl = h('ul', { class: 'gear-passives' });
    if (pt) RAR.forEach((x, k) => pl.appendChild(h('li', { class: it.r >= k ? 'on' : '', html: '<span style="color:' + x.col + '">' + x.name + '</span>: ' + b.desc(b.v[k]) + (it.r === k ? ' ✓' : '') })));
    else [3, 4, 5].forEach((k) => pl.appendChild(h('li', { class: it.r >= k ? 'on' : '', html: '<span style="color:' + RAR[k].col + '">' + RAR[k].name + '</span>: ' + b.desc(b.v[k - 3]) + (it.r === k ? ' ✓' : '') })));
    box.appendChild(pl);
    const acts = h('div', { class: 'hero-cta' });
    acts.appendChild(h('button', { class: 'btn small primary', type: 'button', disabled: equipped(it), text: equipped(it) ? (pt ? 'Active' : 'Equipped') : (pt ? 'Make active' : 'Equip'), onclick: () => { equip(it); rerender(); } }));
    acts.appendChild(h('button', { class: 'btn small', type: 'button', disabled: it.r >= 5 || mates.length < 2, text: it.r >= 5 ? 'Max rarity' : 'Merge (' + Math.min(mates.length + 1, 3) + '/3) → ' + RAR[Math.min(5, it.r + 1)].name, onclick: () => { const o = merge(it); if (o) { sel = o.uid; PB.emit({ type: 'loot', icon: (isPet(o) ? pet(o.p) : base(o.b)).icon, text: 'Merged into ' + RAR[o.r].name + ' ' + (isPet(o) ? pet(o.p) : base(o.b)).name }); } rerender(); } }));
    acts.appendChild(h('button', { class: 'btn small ghost warn', type: 'button', text: 'Salvage', onclick: () => { const back = salvage(it); sel = null; PB.emit({ type: 'loot', icon: '♻️', text: 'Salvaged: +◉' + back.gold + ', +🧩' + back.frags }); rerender(); } }));
    box.appendChild(acts);
    box.appendChild(h('p', { class: 'input-hint', text: it.r < 5 ? 'Three ' + rr.name + ' ' + b.name + 's merge into one ' + RAR[it.r + 1].name + '. Rarity is the only way to make ' + (pt ? 'a pet' : 'gear') + ' stronger.' : 'Fully upgraded.' }));
    return box;
  }

  function tabHero(body) {
    const r = R(), st = stats(), cls = st.cls;
    const hc = h('section', { class: 'hero-card' });
    const doll = h('div', { class: 'hero-avatar subj-' + cls.subject });
    const left = h('div', { class: 'doll-col' }), right = h('div', { class: 'doll-col' }), mid = h('div', { class: 'doll-mid' });
    SLOTS.forEach((s, i) => { const it = item(r.equip[s[0]]); const go = () => { tab = 'bag'; slotFilter = s[0]; sel = it ? it.uid : null; viewHero(); }; (i < 3 ? left : right).appendChild(it ? card(it, go) : emptyCard(s[1], s[4], go)); });
    mid.appendChild(h('span', { class: 'class-ico big', text: cls.icon }));
    const pi = petItem(r.pet);
    mid.appendChild(pi ? card(pi, () => { tab = 'pets'; sel = pi.uid; viewHero(); }, ' pet-slot') : emptyCard('Pet', '🐾', () => { tab = 'pets'; viewHero(); }));
    doll.append(left, mid, right);
    hc.appendChild(doll);
    const info = h('div', { class: 'hero-info' });
    const nameIn = h('input', { class: 'hero-name', value: r.name || 'Nameless ' + cls.name, 'aria-label': 'Hero name', onchange: () => { r.name = nameIn.value.slice(0, 40); PB.save(); } });
    info.appendChild(nameIn);
    info.appendChild(h('div', { class: 'eyebrow', text: 'Level ' + st.level + ' ' + cls.name + ' · ' + PB.levelInfo().title + (r.title ? ' · ' + r.title : '') }));
    info.appendChild(h('div', { class: 'power', html: '⚡ Power <b>' + st.power.toLocaleString('en-US') + '</b>' }));
    info.appendChild(h('div', { class: 'stat-row' }, [
      h('div', { class: 'stat' }, [h('b', { text: '⚔ ' + st.atk }), h('span', { text: 'attack' })]),
      h('div', { class: 'stat' }, [h('b', { text: '❤ ' + st.hp }), h('span', { text: 'HP' })]),
      h('div', { class: 'stat' }, [h('b', { text: Math.round(st.crit * 100) + '%' }), h('span', { text: 'crit chance' })])
    ]));
    const ag = h('div', { class: 'attr-grid' });
    PB.SUBJECTS.forEach((s) => ag.appendChild(h('div', { class: 'attr subj-' + s.id }, [h('span', { class: 'subj-badge', text: s.mark }), h('b', { text: String(st.attrs[s.id]) }), h('small', { text: ATTR[s.id] + ' · +' + (st.attrs[s.id] * 5) + '% dmg' })])));
    info.appendChild(ag);
    info.appendChild(h('p', { class: 'input-hint', text: 'Perk: ' + cls.perk + '. ' + (st.pet ? 'Pet: ' + st.pet.pet.name + ' ' + st.pet.pet.desc(st.pet.v) + '. ' : '') + 'Against a boss your damage is multiplied by (1 + attribute/20) for its science.' }));
    hc.appendChild(info);
    body.appendChild(hc);
    body.appendChild(h('div', { class: 'hero-cta' }, [
      h('button', { class: 'btn', type: 'button', text: 'Equip best', onclick: () => { SLOTS.forEach((s) => { const best = R().inv.filter((i) => base(i.b).slot === s[0]).sort((a, b) => b.r - a.r)[0]; if (best) R().equip[s[0]] = best.uid; }); const bp = R().pets.slice().sort((a, b) => b.r - a.r)[0]; if (bp) R().pet = bp.uid; PB.checkBadges(); PB.save(); viewHero(); } }),
      h('button', { class: 'btn', type: 'button', text: 'Merge all', onclick: () => { const n = autoMerge(); PB.emit({ type: 'loot', icon: '✨', text: n ? n + ' merge' + (n > 1 ? 's' : '') + ' done' : 'Nothing to merge yet' }); viewHero(); } }),
      h('button', { class: 'btn ghost', type: 'button', disabled: r.gold < 300, text: 'Change class (◉300)', onclick: () => { if (r.gold < 300) return; r.gold -= 300; r.cls = null; PB.save(); viewHero(); } })
    ]));
  }

  function gridView(body, list, isPets) {
    const lay = h('div', { class: 'bag-layout' }), grid = h('div', { class: 'bag-grid' });
    if (!list.length) grid.appendChild(h('p', { class: 'empty', text: isPets ? 'No pets yet. Hatch an egg in Chests & supply.' : 'No items here yet. Open chests to find equipment.' }));
    list.forEach((it) => grid.appendChild(card(it, () => { sel = it.uid; viewHero(); }, (sel === it.uid ? ' sel' : '') + (it.r < 5 && mergeable(it).length >= 2 ? ' can-merge' : ''))));
    lay.appendChild(grid);
    const it = isPets ? petItem(sel) : item(sel);
    lay.appendChild(it ? detailPanel(it, viewHero) : h('div', { class: 'gear-panel muted' }, [h('p', { text: 'Select a card to ' + (isPets ? 'make it your active pet' : 'equip it') + ', merge it or salvage it. Glowing cards can merge now.' })]));
    body.appendChild(lay);
  }
  function tabBag(body) {
    const filt = h('div', { class: 'seg', role: 'group', style: 'margin:12px 0' });
    [['all', 'All']].concat(SLOTS.map((s) => [s[0], s[1]])).forEach((s) => filt.appendChild(h('button', { type: 'button', class: slotFilter === s[0] ? 'on' : '', text: s[1], onclick: () => { slotFilter = s[0]; viewHero(); } })));
    body.appendChild(filt);
    gridView(body, R().inv.filter((i) => slotFilter === 'all' || base(i.b).slot === slotFilter).sort((a, b) => b.r - a.r || a.b.localeCompare(b.b)), false);
  }
  function tabPets(body) {
    body.appendChild(h('p', { class: 'input-hint', style: 'margin-top:12px', text: 'Your active pet boosts your attack and HP and fights beside you. Hatch eggs with 10 egg fragments (🧩) or gems, and merge three of the same pet and rarity to raise it.' }));
    gridView(body, R().pets.slice().sort((a, b) => b.r - a.r || a.p.localeCompare(b.p)), true);
  }

  function tabChests(body) {
    const r = R(), t = PB.today();
    const sup = h('section', { class: 'lock-box' });
    const claimed = r.supply.last === t;
    sup.appendChild(h('h2', { text: 'Daily supply' }));
    const row = h('div', { class: 'supply-row' });
    const y = new Date(); y.setDate(y.getDate() - 1);
    const next = claimed ? r.supply.streak % 7 : (r.supply.last === dayKeyOf(y) ? (r.supply.streak + 1) % 7 : 0);
    SUPPLY.forEach((g, i) => row.appendChild(h('div', { class: 'supply-day' + (i === next ? (claimed ? ' done' : ' today') : '') }, [h('small', { text: 'Day ' + (i + 1) }), h('b', { text: ICON[g[0]] + ' ' + g[1] })])));
    sup.appendChild(row);
    sup.appendChild(h('button', { class: 'btn primary', type: 'button', disabled: claimed, text: claimed ? 'Claimed today: come back tomorrow' : 'Claim today’s supply', onclick: () => { claimSupply(); viewHero(); } }));
    body.appendChild(sup);
    const cg = h('div', { class: 'chest-grid' });
    Object.keys(CHESTS).forEach((k) => {
      const c = CHESTS[k], can = (r[c.cost[0]] || 0) >= c.cost[1], pityV = c.kind === 'pet' ? r.petPity || 0 : r.pity || 0;
      cg.appendChild(h('div', { class: 'chest-card' + (c.kind === 'pet' ? ' pet' : '') }, [
        h('span', { class: 'chest-ico', text: c.icon }), h('b', { text: c.name }),
        h('small', { html: (c.kind === 'pet' ? 'Pet · ' : 'Gear · ') + c.odds.map((o, i) => (o ? '<span style="color:' + RAR[i].col + '">' + RAR[i].name + ' ' + o + '%</span>' : '')).filter(Boolean).join(' · ') + (c.pity ? '<br>Epic guaranteed within ' + c.pity + ' (' + (c.pity - pityV) + ' to go)' : '') }),
        h('button', { class: 'btn small ' + (can ? 'primary' : ''), type: 'button', disabled: !can, text: 'Open: ' + ICON[c.cost[0]] + ' ' + c.cost[1], onclick: () => { const got = openChest(k); if (got) { lastLoot = got.map((x) => x.uid); const best = got.reduce((a, x) => (x.r > a.r ? x : a)); const bb = isPet(best) ? pet(best.p) : base(best.b); PB.emit({ type: 'loot', icon: bb.icon, text: 'Found ' + RAR[best.r].name + ' ' + bb.name + (got.length > 1 ? ' and ' + (got.length - 1) + ' more' : '') }); } viewHero(); } })
      ]));
    });
    cg.appendChild(h('div', { class: 'chest-card' }, [h('span', { class: 'chest-ico', text: '☕' }), h('b', { text: 'Coffee' }), h('small', { text: 'Heals 25% HP in a fight (double for chemists). You own ' + r.potions + '.' }), h('button', { class: 'btn small', type: 'button', disabled: r.gold < 60, text: 'Buy: ◉ 60', onclick: () => { if (r.gold < 60) return; r.gold -= 60; r.potions++; PB.save(); viewHero(); } })]));
    cg.appendChild(h('div', { class: 'chest-card' }, [h('span', { class: 'chest-ico', text: '🧩' }), h('b', { text: 'Fragment pack' }), h('small', { text: '10 egg fragments: one Pet Egg.' }), h('button', { class: 'btn small', type: 'button', disabled: r.gold < 400, text: 'Buy: ◉ 400', onclick: () => { if (r.gold < 400) return; r.gold -= 400; give('frags', 10, 'pack'); viewHero(); } })]));
    body.appendChild(cg);
    const shown = (lastLoot || []).map((u) => item(u) || petItem(u)).filter(Boolean);
    if (shown.length) { const lg = h('div', { class: 'bag-grid loot' }); shown.forEach((it) => lg.appendChild(card(it, () => { sel = it.uid; tab = isPet(it) ? 'pets' : 'bag'; slotFilter = 'all'; viewHero(); }, ' pop'))); body.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Just found' })])); body.appendChild(lg); }
    body.appendChild(h('div', { class: 'lock-box' }, [h('h2', { text: 'How to earn' }), h('ul', { html: '<li>◉ <b>Gold</b>: every problem solved (half its points), gym drills, sections and labs, bosses, Trials floors.</li><li>💎 <b>Gems</b>: daily quests, badges, level-ups (+50), first boss wins, every 5th Trials floor.</li><li>🗝️ <b>Keys</b>: the daily challenge, unlocking a chapter, level-ups (+2), every boss win, every 10th Trials floor.</li><li>🧩 <b>Egg fragments</b>: olympiad problems, every 5 correct gym drills, bosses, each Trials floor, salvaging.</li>' })]));
  }

  function tabBosses(body) {
    const r = R(), st = stats();
    body.appendChild(h('p', { class: 'input-hint', style: 'margin-top:12px', text: Object.keys(r.defeated).length + ' of ' + BOSSES.length + ' defeated. A boss appears once you pass three chapters of its unit (or all, if fewer). Bosses can be fought again for gold, keys and fragments.' }));
    PB.SUBJECTS.forEach((sub) => {
      const list = BOSSES.filter((b) => b.subject === sub.id);
      if (!list.length) return;
      body.appendChild(h('div', { class: 'part-label', text: sub.name }));
      const g = h('div', { class: 'boss-grid' });
      list.forEach((b) => {
        const ready = bossReady(b), won = r.defeated[b.id], passed = b.chapters.filter((c) => PB.isPassed(c)).length;
        const rec = Math.round(b.hp / 5 * 4 + b.atk * 6 * 0.6);
        g.appendChild(h('div', { class: 'boss-card subj-' + sub.id + (won ? ' won' : ready ? ' ready' : ' locked') }, [
          h('span', { class: 'boss-ico', text: ready || won ? b.icon : '❔' }),
          h('div', {}, [h('h3', { text: ready || won ? b.name : 'Unknown foe' }), h('p', { text: b.part + ' · ❤ ' + b.hp + ' · ⚔ ' + b.atk }),
            h('small', { html: won ? 'Defeated' + (r.trophies[b.id] ? ' · ' + r.trophies[b.id] : '') : ready ? 'Recommended power ' + rec.toLocaleString('en-US') + (st.power < rec ? ' <span style="color:var(--bad)">(yours ' + st.power + ')</span>' : '') : 'Pass ' + (b.need - passed) + ' more chapter' + (b.need - passed > 1 ? 's' : '') + ' of this unit' })]),
          ready || won ? h('a', { class: 'btn small ' + (won ? '' : 'primary'), href: '#boss-' + b.id, text: won ? 'Rematch' : 'Fight' }) : null
        ]));
      });
      body.appendChild(g);
    });
  }
  function tabTower(body) {
    const r = R(), t = PB.today();
    if (r.tower.day !== t) { r.tower.day = t; r.tower.runs = 0; PB.save(); }
    const left = TOWER_RUNS - r.tower.runs;
    body.appendChild(h('section', { class: 'lock-box' }, [
      h('h2', { text: '🏛️ The Trials' }),
      h('p', { text: 'An endless tower of ever-stronger monsters, with questions from every chapter you have open. Your skills carry from floor to floor during a run, so the longer you last the stronger you get. Every floor pays gold and an egg fragment; every 5th floor gems; every 10th a key.' }),
      h('div', { class: 'stat-row' }, [h('div', { class: 'stat' }, [h('b', { text: String(r.tower.best || 0) }), h('span', { text: 'best floor' })]), h('div', { class: 'stat' }, [h('b', { text: left + ' / ' + TOWER_RUNS }), h('span', { text: 'runs left today' })])]),
      h('div', { class: 'hero-cta' }, [h('a', { class: 'btn primary' + (left ? '' : ' disabled'), href: left ? '#trials' : '#hero', text: left ? 'Enter the Trials' : 'Come back tomorrow', onclick: (e) => { if (!left) e.preventDefault(); } })])
    ]));
  }
  function tabSkills(body) {
    body.appendChild(h('p', { class: 'input-hint', style: 'margin-top:12px', text: 'Skills are picked during a fight. After your 1st, 3rd, 6th, 10th… correct answer you level up and choose one of three skills. Each skill goes to level 5, where it evolves into a stronger form. Skills last for the whole fight, or the whole run in the Trials.' }));
    const g = h('div', { class: 'skill-grid' });
    SKILLS.forEach((s) => g.appendChild(h('div', { class: 'skill-card' }, [h('span', { class: 'skill-ico', text: s.icon }), h('b', { text: s.name }), h('small', { text: 'Lv 1: ' + s.desc(1, 1) }), h('small', { text: 'Lv 5 → ' + s.evo + ': ' + s.desc(5, 1.5) })])));
    body.appendChild(g);
  }

  /* ---------------- Fights ---------------- */
  function fightView(cfg) {
    const r = R(), st = stats();
    const attr = cfg.subject ? st.attrs[cfg.subject] : Math.round(Object.values(st.attrs).reduce((a, x) => a + x, 0) / 4);
    const P = st.pass, PET = st.pet;
    const F = { hp: st.hp, foe: Object.assign({}, cfg.foe), fhp: cfg.foe.hp, turn: 0, correct: 0, log: [], streak: 0, blocks: P.block || 0, revived: false, survived: false, free: P.coffee || 0, over: false, first: true, inst: null, floor: cfg.floor || 0, sk: {}, acid: 0, fieldT: 0, choice: null, picks: 0 };
    const wrap = h('div', { class: 'wrap' }), arena = h('section', { class: 'battle' + (cfg.subject ? ' subj-' + cfg.subject : '') });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#hero">Hero</a> · ' + cfg.eyebrow }));
    wrap.appendChild(arena);
    const pool = cfg.pool.reduce((a, c) => a.concat(PB.drills[c.id] || []), []);
    const lv = (id) => F.sk[id] || 0, ev = (id) => (F.sk[id] >= 5 ? 1.5 : 1);
    function newQ() { const d = pool[Math.floor(Math.random() * pool.length)]; const inst = d.gen(PB.rng((Math.random() * 4294967296) >>> 0)); inst.title = d.title; inst.ch = PB.chapter(d.chapter).title; F.inst = inst; }
    function offer() {
      const avail = SKILLS.filter((s) => lv(s.id) < 5).sort(() => Math.random() - 0.5).slice(0, r.cls === 'mathematician' ? 4 : 3);
      F.choice = avail.length ? avail.map((s) => s.id) : null;
    }
    function pick(id) {
      F.sk[id] = lv(id) + 1; F.picks++; F.choice = null;
      if (id === 'heal') F.hp = Math.min(st.hp, F.hp + Math.round(st.hp * 0.1));
      if (F.sk[id] === 5) { r.evolved = (r.evolved || 0) + 1; PB.save(); PB.checkBadges(); F.log.unshift('✦ ' + skill(id).name + ' evolves into ' + skill(id).evo + '!'); }
      else F.log.unshift(skill(id).icon + ' ' + skill(id).name + ' → Lv ' + F.sk[id]);
      draw();
    }
    const foeHit = (d) => { F.fhp -= d; return d; };
    function endTurn() {
      // Automatic effects every turn.
      const extra = [];
      if (lv('drone')) extra.push('🛸 ' + foeHit(Math.round(st.atk * 0.15 * lv('drone') * ev('drone'))));
      if (F.acid) extra.push('🧪 ' + foeHit(Math.round(st.atk * 0.06 * lv('acid') * ev('acid') * F.acid)));
      if (PET && PET.p === 'auto') extra.push(PET.pet.icon + ' ' + foeHit(Math.round(st.atk * PET.v)));
      if (lv('field')) { F.fieldT++; if (F.fieldT >= Math.max(1, Math.round((6 - lv('field')) / ev('field')))) { F.fieldT = 0; if (F.blocks < 2) { F.blocks++; extra.push('🔵 shield'); } } }
      if (extra.length) F.log.unshift('Auto: ' + extra.join(' · '));
    }
    function strike(ok) {
      F.turn++;
      if (ok) {
        F.streak++; F.correct++;
        let dmg = st.atk * (1 + attr / 20) * (1 + (P.combo || 0) * (F.streak - 1)) * (1 + 0.2 * lv('beam') * ev('beam'));
        if (F.first && P.opener) dmg *= P.opener;
        F.first = false;
        const crit = Math.random() < Math.min(0.9, st.crit + 0.06 * lv('focus') * ev('focus')); if (crit) dmg *= 2;
        let hits = 1; if (P.double && Math.random() < P.double) hits++; if (PET && PET.p === 'clone' && Math.random() < PET.v) hits++;
        dmg = Math.round(dmg);
        foeHit(dmg * hits);
        let line = (crit ? '💥 Critical! ' : '⚔ ') + 'You hit for ' + dmg + (hits > 1 ? ' ×' + hits : '');
        if (lv('rod') && Math.random() < Math.min(0.9, 0.12 * lv('rod') * ev('rod'))) line += ' · 🌩️ ' + foeHit(st.atk);
        if (PET && PET.p === 'bite') line += ' · ' + PET.pet.icon + ' ' + foeHit(Math.round(st.atk * PET.v));
        F.log.unshift(line + '.');
        if (lv('acid')) F.acid = Math.min(5, F.acid + 1);
        let heal = (P.lifesteal || 0) + (lv('heal') ? 0.02 * lv('heal') * ev('heal') : 0) + (PET && PET.p === 'lifesteal' ? PET.v : 0);
        if (heal) F.hp = Math.min(st.hp, F.hp + Math.round(st.hp * heal));
        if (SKILL_AT.indexOf(F.correct) >= 0) offer();
      } else {
        F.streak = 0;
        const dodge = (P.dodge || 0) + (PET && PET.p === 'dodge' ? PET.v : 0);
        if (F.blocks > 0) { F.blocks--; F.log.unshift('🛡️ Blocked!'); }
        else if (dodge && Math.random() < dodge) F.log.unshift(PET && PET.p === 'dodge' ? '🐈 Schrödinger’s strike misses you.' : '🚀 You dodge!');
        else { const dr = Math.min(0.75, (P.dr || 0) + Math.min(0.6, 0.08 * lv('cage') * ev('cage'))); const dmg = Math.round(F.foe.atk * (0.85 + Math.random() * 0.3) * (1 - dr)); F.hp -= dmg; F.log.unshift(F.foe.icon + ' ' + F.foe.name + ' strikes for ' + dmg + '.'); }
        if (F.hp <= 0 && PET && PET.p === 'survive' && !F.survived) { F.survived = true; F.hp = Math.max(1, Math.round(st.hp * PET.v)); F.log.unshift('🐛 Tardi refuses to let you fall!'); }
        if (F.hp <= 0 && P.revive && !F.revived) { F.revived = true; F.hp = Math.round(st.hp * P.revive); F.log.unshift('🥾 You get back up with ' + F.hp + ' HP!'); }
      }
      if (F.fhp > 0 && F.hp > 0) endTurn();
      if (F.fhp <= 0) { const txt = cfg.onWin(F); if (cfg.next) { const nf = cfg.next(F); if (nf) { F.foe = nf; F.fhp = nf.hp; F.first = true; F.blocks = Math.max(F.blocks, P.block || 0); F.acid = 0; F.log.unshift('🏆 ' + txt + ' Next: ' + nf.name + '.'); newQ(); draw(); return; } } F.over = 'win'; F.reward = txt; }
      else if (F.hp <= 0) { F.over = 'lose'; F.reward = cfg.onLose ? cfg.onLose(F) : ''; }
      else newQ();
      draw();
    }
    function skillBar() {
      const ids = Object.keys(F.sk);
      const next = SKILL_AT.find((x) => x > F.correct);
      return h('div', { class: 'skill-bar' }, [h('span', { class: 'skill-xp', text: 'Skills · next pick at ' + (next || '—') + ' correct (now ' + F.correct + ')' })].concat(ids.map((id) => h('span', { class: 'skill-chip' + (F.sk[id] >= 5 ? ' evo' : ''), title: (F.sk[id] >= 5 ? skill(id).evo : skill(id).name) + ': ' + skill(id).desc(F.sk[id], ev(id)), text: skill(id).icon + ' ' + F.sk[id] }))));
    }
    function draw() {
      arena.innerHTML = '';
      arena.appendChild(h('div', { class: 'battle-top' }, [
        h('div', { class: 'fighter' }, [h('span', { class: 'fighter-ico', html: st.cls.icon + (PET ? '<span class="fighter-pet">' + PET.pet.icon + '</span>' : '') }), h('b', { text: (r.name || st.cls.name) + ' · ⚔' + st.atk + (F.blocks ? ' · 🛡️' + F.blocks : '') }), hpBar(F.hp, st.hp, 'me')]),
        h('span', { class: 'vs', text: F.floor ? 'F' + F.floor : 'VS' }),
        h('div', { class: 'fighter boss' }, [h('span', { class: 'fighter-ico', text: F.foe.icon }), h('b', { text: F.foe.name + ' · ⚔' + F.foe.atk + (F.acid ? ' · 🧪' + F.acid : '') }), hpBar(F.fhp, F.foe.hp, 'foe')])
      ]));
      arena.appendChild(skillBar());
      if (F.over) {
        arena.appendChild(h('div', { class: 'battle-end ' + F.over }, [
          h('h2', { text: F.over === 'win' ? 'Victory!' : 'Defeated' }),
          h('p', { text: F.reward || '' }),
          h('div', { class: 'hero-cta' }, [h('a', { class: 'btn primary', href: '#hero', text: 'Back to the hero' }), cfg.again ? h('button', { class: 'btn', type: 'button', text: 'Fight again', onclick: cfg.again }) : null])
        ]));
      } else if (F.choice) {
        const box = h('div', { class: 'skill-pick' }, [h('h3', { text: '⬆ Level up! Choose a skill' })]);
        const row = h('div', { class: 'skill-grid' });
        F.choice.forEach((id) => { const s = skill(id), nl = lv(id) + 1, e = nl >= 5 ? 1.5 : 1; row.appendChild(h('button', { class: 'skill-card pickable' + (nl >= 5 ? ' evo' : ''), type: 'button', onclick: () => pick(id) }, [h('span', { class: 'skill-ico', text: s.icon }), h('b', { text: (nl >= 5 ? '✦ ' + s.evo : s.name) }), h('small', { text: 'Lv ' + nl + (nl >= 5 ? ' (evolves)' : '') + ': ' + s.desc(nl, e) })])); });
        box.appendChild(row);
        arena.appendChild(box);
      } else {
        const q = F.inst, cq = h('div', { class: 'battle-q' });
        cq.appendChild(h('div', { class: 'eyebrow', text: 'Turn ' + (F.turn + 1) + ' · ' + q.ch + ' · ' + q.title }));
        cq.appendChild(h('div', { class: 'prob-q', html: q.q }));
        const input = h('input', { class: 'num-input', type: 'text', placeholder: 'Answer to attack' + (q.unit ? ' (' + q.unit + ')' : ''), autocomplete: 'off' });
        const fb = h('div', { class: 'feedback' });
        const go = () => { const ok = PB.drillOk(q, input.value); if (ok === null) { fb.textContent = 'Enter a number.'; return; } if (!ok) F.log.unshift('✗ The answer was ' + PB.fmt(q.answer, 4) + (q.unit ? ' ' + q.unit : '') + '.'); strike(ok); };
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
        const cof = F.free + r.potions;
        cq.appendChild(h('div', { class: 'answer-row' }, [input, h('button', { class: 'btn primary', type: 'button', text: '⚔ Attack', onclick: go }),
          h('button', { class: 'btn', type: 'button', disabled: !cof || F.hp >= st.hp, text: '☕ Coffee (' + cof + ')', onclick: () => { if (F.free > 0) F.free--; else { r.potions--; PB.save(); } const heal = Math.round(st.hp * (r.cls === 'chemist' ? 0.5 : 0.25)); F.hp = Math.min(st.hp, F.hp + heal); F.log.unshift('☕ You recover ' + heal + ' HP.'); draw(); } }),
          h('a', { class: 'btn ghost', href: '#hero', text: 'Flee', onclick: () => { if (cfg.onLose && F.floor) cfg.onLose(F); } })]));
        cq.appendChild(fb);
        arena.appendChild(cq);
        PB.typeset(cq);
        setTimeout(() => input.focus(), 30);
      }
      const log = h('ul', { class: 'battle-log' });
      F.log.slice(0, 6).forEach((l) => log.appendChild(h('li', { text: l })));
      arena.appendChild(log);
    }
    newQ();
    PB.setView([wrap], 'hero');
    draw();
    window.scrollTo(0, 0);
  }

  const lootMult = () => 1 + (stats().pass.loot || 0);
  function viewBoss(id) {
    const r = R();
    buildBosses();
    const b = BOSSES.find((x) => x.id === id);
    if (!b || !r.cls || !(bossReady(b) || r.defeated[b.id])) { location.hash = '#hero'; return; }
    fightView({ eyebrow: PB.subject(b.subject).name + ' · ' + b.part, subject: b.subject, pool: b.chapters, foe: { name: b.name, icon: b.icon, hp: b.hp, atk: b.atk },
      again: () => viewBoss(id),
      onWin: () => {
        const first = !r.defeated[b.id], m = lootMult(), gold = Math.round((first ? b.gold : b.gold * 0.4) * m), fr = Math.round((first ? 5 : 2) * m);
        r.defeated[b.id] = r.defeated[b.id] || Date.now();
        give('gold', gold, null, true); give('keys', first ? 2 : 1, null, true); give('frags', fr, null, true);
        if (first) { give('gems', b.gems, null, true); r.trophies[b.id] = b.name.replace(/^The /, '') + ' Bane'; r.title = r.trophies[b.id]; PB.addXP(b.xp, 'Defeated ' + b.name); }
        PB.emit({ type: 'loot', icon: b.icon, text: 'Defeated ' + b.name });
        PB.checkBadges(); PB.save();
        return 'Rewards: ◉' + gold + ', 🗝️' + (first ? 2 : 1) + ', 🧩' + fr + (first ? ', 💎' + b.gems + ', ' + b.xp + ' XP and the title "' + r.trophies[b.id] + '"' : ' (rematch)') + '.';
      },
      onLose: () => 'Merge gear and pets, study this unit to raise your attribute, pick defensive skills early, or bring coffee.' });
  }
  function towerFoe(f) { const names = [['Lab Rat', '🐀'], ['Rogue Electron', '⚡'], ['Acid Slime', '🧪'], ['Feral Fungus', '🍄'], ['Clockwork Beetle', '🪲'], ['Plasma Wisp', '🔥'], ['Gravity Golem', '🪨'], ['Void Comet', '☄️']]; const n = names[(f - 1) % names.length]; return { name: n[0] + ' (floor ' + f + ')', icon: n[1], hp: Math.round(120 * Math.pow(1.22, f - 1)), atk: Math.round(25 * Math.pow(1.14, f - 1)) }; }
  function viewTrials() {
    const r = R(), t = PB.today();
    if (!r.cls) { location.hash = '#hero'; return; }
    if (r.tower.day !== t) { r.tower.day = t; r.tower.runs = 0; }
    if (r.tower.runs >= TOWER_RUNS) { location.hash = '#hero'; return; }
    r.tower.runs++; PB.save();
    const open = PB.chapters.filter((c) => PB.isUnlocked(c) && PB.drills[c.id]);
    let floor = 1, gold = 0, fr = 0, gems = 0, keys = 0;
    const payFloor = (f) => { const m = lootMult(); const g = Math.round(15 * f * m); gold += g; give('gold', g, null, true); give('frags', 1, null, true); fr++; if (f % 5 === 0) { give('gems', 20, null, true); gems += 20; } if (f % 10 === 0) { give('keys', 1, null, true); keys++; } if (f > (r.tower.best || 0)) r.tower.best = f; PB.checkBadges(); PB.save(); };
    const summary = () => 'Reached floor ' + floor + '. Earned ◉' + gold + ', 🧩' + fr + (gems ? ', 💎' + gems : '') + (keys ? ', 🗝️' + keys : '') + '. Best floor: ' + (r.tower.best || 0) + '.';
    fightView({ eyebrow: 'The Trials', subject: null, pool: open.length ? open : [PB.chapters[0]], foe: towerFoe(1), floor: 1,
      onWin: (F) => { payFloor(floor); const txt = 'Floor ' + floor + ' cleared!'; floor++; F.floor = floor; return txt; },
      next: () => towerFoe(floor),
      onLose: () => { PB.emit({ type: 'loot', icon: '🏛️', text: 'Trials: floor ' + floor + ', ◉' + gold }); return summary(); } });
  }

  PB.views = PB.views || {};
  PB.views.hero = viewHero;
  PB.views.trials = viewTrials;
  BOSSES.forEach((b) => { PB.views['boss-' + b.id] = () => viewBoss(b.id); });

  const prevHome = PB.homeExtras;
  PB.homeExtras = function (wrap) {
    if (prevHome) prevHome(wrap);
    const r = R();
    buildBosses();
    const ready = BOSSES.filter((b) => bossReady(b) && !r.defeated[b.id]);
    const st = r.cls ? stats() : null, supplyReady = r.supply.last !== PB.today();
    wrap.appendChild(h('a', { class: 'hero-strip', href: '#hero' }, [
      h('span', { class: 'class-ico', text: r.cls ? CLASSES[r.cls].icon : '🛡️' }),
      h('div', {}, [h('b', { text: r.cls ? (r.name || CLASSES[r.cls].name) + ' · ⚡ ' + st.power.toLocaleString('en-US') + ' power · ◉ ' + r.gold + ' · 💎 ' + r.gems + ' · 🗝️ ' + r.keys + ' · 🧩 ' + r.frags : 'Create your hero' }),
        h('small', { text: r.cls ? [supplyReady ? 'Daily supply ready' : null, r.keys ? r.keys + ' chest key' + (r.keys > 1 ? 's' : '') : null, r.frags >= 10 ? 'enough fragments for a pet egg' : null, ready.length ? ready.length + ' boss' + (ready.length > 1 ? 'es' : '') + ' waiting' : null].filter(Boolean).join(' · ') || 'Merge gear and pets, climb the Trials, defeat unit bosses' : 'Pick a class, collect gear and pets, merge them, and fight with skills you choose as you answer.' })]),
      h('span', { class: 'btn small primary', text: r.cls && (supplyReady || ready.length) ? 'Go' : 'Open' })
    ]));
  };
})();
