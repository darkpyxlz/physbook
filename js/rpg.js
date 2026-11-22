/* Scibook RPG: a hero whose power comes from equipment (six slots, six rarities, merge three to upgrade),
   levelled with gold and slot scrolls, found in chests opened with keys and gems. Every currency is earned
   by learning. Bosses guard each unit; the Trials tower is a daily grind for currencies. */
(function () {
  'use strict';
  const PB = window.PB;

  /* ---------------- Data ---------------- */
  const RAR = [
    { id: 0, name: 'Common', mult: 1, cap: 10, col: '#8d96a8' },
    { id: 1, name: 'Good', mult: 1.5, cap: 20, col: '#2fae62' },
    { id: 2, name: 'Better', mult: 2.2, cap: 30, col: '#3b82f6' },
    { id: 3, name: 'Excellent', mult: 3.2, cap: 40, col: '#a855f7' },
    { id: 4, name: 'Epic', mult: 4.6, cap: 50, col: '#f59e0b' },
    { id: 5, name: 'Legend', mult: 6.5, cap: 60, col: '#ef4444' }
  ];
  const SLOTS = [['weapon', 'Weapon', 'atk', 12], ['necklace', 'Necklace', 'atk', 6], ['gloves', 'Gloves', 'atk', 6], ['armour', 'Armour', 'hp', 60], ['belt', 'Belt', 'hp', 40], ['boots', 'Boots', 'hp', 30]];
  const slotInfo = (s) => SLOTS.find((x) => x[0] === s);
  // Passive values are given for [Excellent, Epic, Legend].
  const BASES = [
    { id: 'laser', slot: 'weapon', name: 'Laser Pointer', icon: '🔦', p: 'crit', v: [0.06, 0.12, 0.2], desc: (x) => '+' + Math.round(x * 100) + '% critical-hit chance' },
    { id: 'tesla', slot: 'weapon', name: 'Tesla Coil', icon: '⚡', p: 'double', v: [0.15, 0.25, 0.4], desc: (x) => Math.round(x * 100) + '% chance to strike twice' },
    { id: 'electron', slot: 'necklace', name: 'Lucky Electron', icon: '🧿', p: 'loot', v: [0.15, 0.3, 0.5], desc: (x) => '+' + Math.round(x * 100) + '% gold and scrolls from fights' },
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
  const CLASSES = {
    physicist: { name: 'Physicist', icon: '⚛️', subject: 'physics', attr: 'Might', perk: '+20% attack' },
    chemist: { name: 'Chemist', icon: '⚗️', subject: 'chemistry', attr: 'Alchemy', perk: 'coffee heals double' },
    biologist: { name: 'Biologist', icon: '🧬', subject: 'biology', attr: 'Vitality', perk: '+25% HP' },
    astronomer: { name: 'Astronomer', icon: '🔭', subject: 'astronomy', attr: 'Insight', perk: '+10% critical-hit chance' }
  };
  const ATTR = { physics: 'Might', chemistry: 'Alchemy', biology: 'Vitality', astronomy: 'Insight' };
  const BOSS_NAMES = {
    physics: { 'Foundations': ['The Dimensional Golem', '🗿'], 'Mechanics': ['Newton’s Juggernaut', '🦏'], 'Thermal Physics': ['The Entropy Wyrm', '🐉'], 'Electricity & Magnetism': ['The Maxwell Hydra', '🐍'], 'Optics': ['The Prism Wraith', '👻'], 'Modern Physics': ['The Quantum Phantom', '🌫️'], 'Olympiad Extensions': ['The Lagrangian Leviathan', '🐋'] },
    chemistry: { 'Foundations': ['The Mole Rat King', '🐀'], 'Physical Chemistry': ['The Gibbs Behemoth', '🦣'], 'Inorganic Chemistry': ['The Lanthanide Lich', '💀'], 'Organic Chemistry': ['The Carbocation Chimera', '🦁'], 'Analysis': ['The Spectral Sphinx', '🗝️'] },
    biology: { 'Cells and Molecules': ['The Rogue Ribosome', '🧫'], 'Genetics': ['The Mutant Mendel', '🧟'], 'Physiology': ['The Adrenal Ogre', '👹'], 'Diversity of Life': ['The Chimeric Kraken', '🦑'], 'Evolution and Ecology': ['The Red Queen', '👑'] },
    astronomy: { 'The Sky': ['The Eclipse Serpent', '🌑'], 'The Solar System': ['The Comet Drake', '☄️'], 'The Stars': ['The Red Giant', '🔴'], 'Galaxies and Cosmology': ['The Dark Energy Titan', '🌌'] }
  };
  const SUPPLY = [['gold', 200], ['gems', 30], ['keys', 1], ['scrolls', 6], ['gold', 500], ['gems', 60], ['keys', 3]];
  const TOWER_RUNS = 3;
  const CHESTS = {
    supply: { name: 'Supply Crate', icon: '📦', cost: ['keys', 1], odds: [70, 25, 5, 0, 0, 0] },
    premium: { name: 'Research Grant Chest', icon: '🎁', cost: ['gems', 120], odds: [0, 55, 33, 10, 2, 0], pity: 30 },
    premium10: { name: '10 × Research Grant', icon: '🎁', cost: ['gems', 1080], n: 10, odds: [0, 55, 33, 10, 2, 0], pity: 30 }
  };

  /* ---------------- State ---------------- */
  const R = function () {
    const S = PB.S;
    if (!S.rpg) S.rpg = {};
    const r = S.rpg;
    if (!r.v2) {
      // Migrate the first RPG version: refund old gear as gold and gems, keep class, coffee and boss history.
      let refund = 0;
      const old = { goggles: 60, cap: 160, helmet: 420, coat: 80, vest: 220, exosuit: 520, rule: 70, scope: 190, collider: 480, electron: 110, mito: 260, galaxy: 340 };
      Object.keys(r.owned || {}).forEach((k) => { refund += old[k] || 0; });
      r.gold = (r.gold || 0) + refund;
      r.owned = {}; r.equip = {}; r.inv = []; r.uid = 1;
      r.gems = 200; r.keys = 3; r.scrolls = {}; SLOTS.forEach((s) => { r.scrolls[s[0]] = 3; });
      r.pity = 0; r.supply = { last: null, streak: 0 }; r.tower = { best: 0, day: null, runs: 0 };
      r.v2 = 1; r.starter = false;
    }
    r.gold = r.gold || 0; r.earned = r.earned || 0; r.potions = r.potions || 0; r.defeated = r.defeated || {}; r.trophies = r.trophies || {};
    r.inv = r.inv || []; r.equip = r.equip || {}; r.scrolls = r.scrolls || {}; SLOTS.forEach((s) => { r.scrolls[s[0]] = r.scrolls[s[0]] || 0; });
    r.gems = r.gems || 0; r.keys = r.keys || 0; r.tower = r.tower || { best: 0, day: null, runs: 0 }; r.supply = r.supply || { last: null, streak: 0 };
    return r;
  };
  const newItem = (b, rar, lvl) => { const r = R(); const it = { uid: r.uid++, b: b, r: rar, l: lvl || 1 }; r.inv.push(it); return it; };
  const item = (uid) => R().inv.find((i) => i.uid === uid);
  const equipped = (it) => R().equip[base(it.b).slot] === it.uid;

  /* ---------------- Stats ---------------- */
  function itemStat(it) { const sl = slotInfo(base(it.b).slot); return { kind: sl[2], val: Math.round(sl[3] * RAR[it.r].mult * (1 + 0.12 * (it.l - 1))) }; }
  function passiveOf(it) { const b = base(it.b); return it.r >= 3 ? { p: b.p, v: b.v[it.r - 3], text: b.desc(b.v[it.r - 3]) } : null; }
  function earnedIn(sid) { let n = 0; Object.keys(PB.S.solved).forEach((pid) => { const p = PB.problem(pid); if (p && PB.chapter(p.chapter).subject === sid) n += PB.S.solved[pid].pts; }); return n; }
  function attrs() { const o = {}; PB.SUBJECTS.forEach((s) => { o[s.id] = 1 + Math.floor(Math.sqrt(earnedIn(s.id)) / 2); }); return o; }
  function stats() {
    const r = R(), a = attrs(), lv = PB.levelInfo().level;
    let atk = 20 + 2 * lv, hp = 150 + 10 * lv;
    const pass = {};
    SLOTS.forEach((s) => { const it = item(r.equip[s[0]]); if (!it) return; const st = itemStat(it); if (st.kind === 'atk') atk += st.val; else hp += st.val; const ps = passiveOf(it); if (ps) pass[ps.p] = (pass[ps.p] || 0) + ps.v; });
    hp += 3 * a.biology;
    if (pass.atkpct) atk *= 1 + pass.atkpct;
    if (r.cls === 'physicist') atk *= 1.2;
    if (r.cls === 'biologist') hp *= 1.25;
    const crit = Math.min(0.6, 0.05 + a.astronomy * 0.005 + (pass.crit || 0) + (r.cls === 'astronomer' ? 0.1 : 0));
    atk = Math.round(atk); hp = Math.round(hp);
    return { level: lv, attrs: a, atk: atk, hp: hp, crit: crit, pass: pass, cls: CLASSES[r.cls], power: Math.round(atk * 4 + hp * 0.6 + crit * 500 + Object.keys(pass).length * 120) };
  }

  /* ---------------- Currencies ---------------- */
  function give(kind, n, why, quiet) {
    if (!(n > 0)) return;
    const r = R();
    if (kind === 'gold') { r.gold += n; r.earned += n; }
    else if (kind === 'gems') r.gems += n;
    else if (kind === 'keys') r.keys += n;
    else if (kind === 'scrolls') { for (let i = 0; i < n; i++) { const s = SLOTS[Math.floor(Math.random() * SLOTS.length)][0]; r.scrolls[s]++; } }
    else if (r.scrolls[kind] != null) r.scrolls[kind] += n;
    PB.save();
    PB.emit({ type: 'gold', amount: n, kind: kind });
    if (!quiet && kind !== 'gold') PB.emit({ type: 'loot', icon: ICON[kind] || '📜', text: '+' + n + ' ' + (NAME[kind] || kind) + (why ? ' · ' + why : '') });
  }
  const ICON = { gold: '◉', gems: '💎', keys: '🗝️', scrolls: '📜' };
  const NAME = { gold: 'gold', gems: 'gems', keys: 'keys', scrolls: 'scrolls' };
  PB.rpg = { gold: function () { return R().gold; }, gems: function () { return R().gems; }, stats: stats, give: give };

  // Learning pays every currency.
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
        if (p && p.level === 'olympiad') give('scrolls', 1, 'olympiad problem', true);
      } else if (reason.indexOf('Gym') === 0) { g = ev.amount * 0.3; gymCount++; if (gymCount % 5 === 0) give('scrolls', 1, 'gym streak', true); }
      else if (reason.indexOf('Read') === 0 || reason.indexOf('Explored') === 0) g = 2;
      if (g) give('gold', Math.max(1, Math.round(g)));
    }
    if (ev.type === 'quest') give('gems', ev.quest && /All three/.test(ev.quest.text) ? 40 : 15, 'quest', true);
    if (ev.type === 'badge') give('gems', 20, 'badge', true);
    if (ev.type === 'levelup') { give('gems', 50, 'level up'); give('keys', 2, 'level up'); }
    if (ev.type === 'unlock') give('keys', 1, 'chapter unlocked');
  });

  /* ---------------- Gear actions ---------------- */
  function levelCost(it) { return { gold: Math.round(25 * it.l * (1 + it.r * 0.5)), scrolls: 1 + Math.floor(it.l / 4) }; }
  function levelUp(it) {
    const r = R(), c = levelCost(it), sl = base(it.b).slot;
    if (it.l >= RAR[it.r].cap || r.gold < c.gold || r.scrolls[sl] < c.scrolls) return false;
    r.gold -= c.gold; r.scrolls[sl] -= c.scrolls; it.l++; it.spent = (it.spent || 0) + c.gold; it.sc = (it.sc || 0) + c.scrolls; PB.save(); return true;
  }
  function salvage(it) {
    const r = R(), sl = base(it.b).slot;
    if (equipped(it)) r.equip[sl] = null;
    r.inv = r.inv.filter((x) => x.uid !== it.uid);
    const back = { gold: Math.round((it.spent || 0) * 0.8) + 10 * (it.r + 1), scrolls: (it.sc || 0) + 1 + it.r };
    r.gold += back.gold; r.scrolls[sl] += back.scrolls; PB.save();
    return back;
  }
  function mergeable(it) { return R().inv.filter((x) => x.b === it.b && x.r === it.r && x.uid !== it.uid); }
  function merge(it) {
    const r = R(), mates = mergeable(it);
    if (it.r >= 5 || mates.length < 2) return null;
    const use = [it].concat(mates.sort((a, b) => (equipped(b) ? 1 : 0) - (equipped(a) ? 1 : 0) || b.l - a.l).slice(0, 2));
    const wasEq = use.some(equipped), sl = base(it.b).slot;
    const lvl = Math.max.apply(null, use.map((x) => x.l)), spent = use.reduce((a, x) => a + (x.spent || 0), 0), sc = use.reduce((a, x) => a + (x.sc || 0), 0);
    r.inv = r.inv.filter((x) => use.indexOf(x) < 0);
    const out = newItem(it.b, it.r + 1, lvl); out.spent = spent; out.sc = sc;
    if (wasEq) r.equip[sl] = out.uid;
    PB.checkBadges(); PB.save();
    return out;
  }
  function autoMerge() { let n = 0, again = true; while (again) { again = false; for (const it of R().inv.slice().sort((a, b) => a.r - b.r)) { if (it.r < 5 && mergeable(it).length >= 2) { merge(it); n++; again = true; break; } } } return n; }
  function equip(it) { R().equip[base(it.b).slot] = it.uid; PB.checkBadges(); PB.save(); }
  function roll(odds) { const t = odds.reduce((a, x) => a + x, 0); let u = Math.random() * t; for (let i = 0; i < odds.length; i++) { if (u < odds[i]) return i; u -= odds[i]; } return 0; }
  function openChest(key) {
    const c = CHESTS[key], r = R(), n = c.n || 1;
    if (r[c.cost[0]] < c.cost[1]) return null;
    r[c.cost[0]] -= c.cost[1];
    const got = [];
    for (let i = 0; i < n; i++) {
      let rr = roll(c.odds);
      if (c.pity) { r.pity = (r.pity || 0) + 1; if (rr >= 4) r.pity = 0; else if (r.pity >= c.pity) { rr = 4; r.pity = 0; } }
      const b = BASES[Math.floor(Math.random() * BASES.length)];
      got.push(newItem(b.id, rr, 1));
    }
    PB.checkBadges(); PB.save();
    return got;
  }
  function claimSupply() {
    const r = R(), t = PB.today();
    if (r.supply.last === t) return null;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yk = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
    r.supply.streak = r.supply.last === yk ? r.supply.streak + 1 : 0;
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
          hp: Math.round(250 * Math.pow(1.7, tier - 1)), atk: Math.round(40 * Math.pow(1.45, tier - 1)), need: Math.min(3, chs.length),
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
    { id: 'tower10', mark: 'T10', name: 'Tower Climber', desc: 'Reach floor 10 of the Trials.', test: () => (R().tower.best || 0) >= 10 }
  );

  /* ---------------- UI helpers ---------------- */
  let tab = 'hero', sel = null, slotFilter = 'all', lastLoot = null;
  const h = (...a) => PB.h(...a);
  function itemTile(it, onClick, extra) {
    const b = base(it.b), rr = RAR[it.r];
    return h('button', { class: 'gear-tile' + (extra || ''), type: 'button', style: '--rar:' + rr.col, title: rr.name + ' ' + b.name + ' · level ' + it.l, onclick: onClick }, [
      h('span', { class: 'gear-ico', text: b.icon }), h('span', { class: 'gear-lv', text: 'Lv ' + it.l }), equipped(it) ? h('span', { class: 'gear-eq', text: 'E' }) : null
    ]);
  }
  function currencyBar() {
    const r = R();
    return h('div', { class: 'cur-bar' }, [['◉', r.gold, 'gold'], ['💎', r.gems, 'gems'], ['🗝️', r.keys, 'keys'], ['☕', r.potions, 'coffee']].map((c) => h('span', { class: 'cur', title: c[2] }, [h('b', { text: c[0] + ' ' + c[1] })])).concat([h('span', { class: 'cur scrolls', title: 'Design scrolls by slot' }, SLOTS.map((s) => h('small', { text: '📜' + s[1].slice(0, 3) + ' ' + r.scrolls[s[0]] })))]));
  }
  function hpBar(cur, max, cls) { const fr = Math.max(0, Math.min(1, cur / max)); return h('div', { class: 'hpbar ' + (cls || '') }, [h('span', { style: 'width:' + Math.round(fr * 100) + '%' }), h('b', { text: Math.max(0, Math.round(cur)) + ' / ' + max + ' HP' })]); }

  /* ---------------- Hero page ---------------- */
  function viewHero() {
    const r = R();
    buildBosses();
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Your character' }));
    wrap.appendChild(h('h1', { text: 'Hero & bosses', style: 'font-size:34px;margin-top:6px' }));
    if (!r.cls) {
      wrap.appendChild(h('p', { class: 'lede', text: 'Choose a class. Then everything you learn pays out: gold for levelling gear, gems and keys for chests, and design scrolls for each equipment slot. Merge three identical items to make a stronger one and take on the boss of every unit.' }));
      const g = h('div', { class: 'class-grid' });
      Object.keys(CLASSES).forEach((k) => {
        const c = CLASSES[k];
        g.appendChild(h('button', { class: 'class-card subj-' + c.subject, type: 'button', onclick: () => { r.cls = k; if (!r.starter) { r.starter = true; equip(newItem(c.subject === 'physics' ? 'tesla' : 'laser', 1, 1)); equip(newItem('coat', 0, 1)); } PB.save(); viewHero(); } }, [
          h('span', { class: 'class-ico', text: c.icon }), h('h3', { text: c.name }),
          h('p', { text: 'Main attribute: ' + c.attr + '. Perk: ' + c.perk + '. +25% gold from ' + PB.subject(c.subject).name.toLowerCase() + ' problems.' })
        ]));
      });
      wrap.appendChild(g);
      wrap.appendChild(h('p', { class: 'input-hint', text: 'You start with a Good weapon, a lab coat, 200 gems, 3 keys and a few scrolls.' }));
      PB.setView([wrap], 'hero');
      return;
    }
    if (!r.starter) { r.starter = true; const c = CLASSES[r.cls]; equip(newItem(c.subject === 'physics' ? 'tesla' : 'laser', 1, 1)); equip(newItem('coat', 0, 1)); PB.save(); }
    wrap.appendChild(currencyBar());
    const tabs = h('nav', { class: 'tabs', style: 'margin-top:12px' });
    [['hero', 'Equipment'], ['bag', 'Bag (' + r.inv.length + ')'], ['chests', 'Chests & supply'], ['bosses', 'Bosses'], ['tower', 'Trials']].forEach((t) => tabs.appendChild(h('a', { class: 'tab' + (tab === t[0] ? ' active' : ''), href: '#hero', onclick: (e) => { e.preventDefault(); tab = t[0]; viewHero(); } }, [t[1]])));
    wrap.appendChild(tabs);
    const body = h('div');
    wrap.appendChild(body);
    ({ hero: tabHero, bag: tabBag, chests: tabChests, bosses: tabBosses, tower: tabTower })[tab](body);
    PB.setView([wrap], 'hero');
  }

  function itemPanel(it, rerender) {
    const b = base(it.b), rr = RAR[it.r], st = itemStat(it), ps = passiveOf(it), r = R(), c = levelCost(it), mates = mergeable(it);
    const box = h('div', { class: 'gear-panel', style: '--rar:' + rr.col });
    box.appendChild(h('div', { class: 'gear-panel-head' }, [h('span', { class: 'gear-ico big', text: b.icon }), h('div', {}, [h('b', { text: rr.name + ' ' + b.name }), h('small', { text: slotInfo(b.slot)[1] + ' · level ' + it.l + ' / ' + rr.cap })])]));
    box.appendChild(h('p', { html: '<b>' + (st.kind === 'atk' ? '⚔ ATK +' : '❤ HP +') + st.val + '</b>' }));
    const pl = h('ul', { class: 'gear-passives' });
    [3, 4, 5].forEach((k) => { const on = it.r >= k; pl.appendChild(h('li', { class: on ? 'on' : '', html: '<span style="color:' + RAR[k].col + '">' + RAR[k].name + '</span>: ' + b.desc(b.v[k - 3]) + (on && ps && it.r === k ? ' ✓' : '') })); });
    box.appendChild(pl);
    const acts = h('div', { class: 'hero-cta' });
    acts.appendChild(h('button', { class: 'btn small primary', type: 'button', disabled: equipped(it), text: equipped(it) ? 'Equipped' : 'Equip', onclick: () => { equip(it); rerender(); } }));
    acts.appendChild(h('button', { class: 'btn small', type: 'button', disabled: it.l >= rr.cap || r.gold < c.gold || r.scrolls[b.slot] < c.scrolls, text: it.l >= rr.cap ? 'Max level' : 'Level up (◉' + c.gold + ' + 📜' + c.scrolls + ')', onclick: () => { levelUp(it); rerender(); } }));
    acts.appendChild(h('button', { class: 'btn small', type: 'button', disabled: it.r >= 5 || mates.length < 2, text: it.r >= 5 ? 'Max rarity' : 'Merge (' + Math.min(mates.length + 1, 3) + '/3) → ' + RAR[Math.min(5, it.r + 1)].name, onclick: () => { const o = merge(it); if (o) { sel = o.uid; PB.emit({ type: 'loot', icon: base(o.b).icon, text: 'Merged into ' + RAR[o.r].name + ' ' + base(o.b).name }); } rerender(); } }));
    acts.appendChild(h('button', { class: 'btn small ghost warn', type: 'button', text: 'Salvage', onclick: () => { const back = salvage(it); sel = null; PB.emit({ type: 'loot', icon: '♻️', text: 'Salvaged: +◉' + back.gold + ', +📜' + back.scrolls }); rerender(); } }));
    box.appendChild(acts);
    box.appendChild(h('p', { class: 'input-hint', text: 'Merge three ' + rr.name + ' ' + b.name + 's into one ' + (it.r < 5 ? RAR[it.r + 1].name : '') + ' item that keeps the highest level. Excellent and above unlock its special ability.' }));
    return box;
  }

  function tabHero(body) {
    const r = R(), st = stats(), cls = st.cls;
    const card = h('section', { class: 'hero-card' });
    const doll = h('div', { class: 'hero-avatar subj-' + cls.subject });
    const left = h('div', { class: 'doll-col' }), right = h('div', { class: 'doll-col' });
    SLOTS.forEach((s, i) => { const it = item(r.equip[s[0]]); const t = it ? itemTile(it, () => { sel = it.uid; tab = 'bag'; slotFilter = s[0]; viewHero(); }) : h('button', { class: 'gear-tile empty', type: 'button', title: s[1] + ': empty', onclick: () => { tab = 'bag'; slotFilter = s[0]; viewHero(); } }, [h('span', { class: 'gear-ico', text: '+' }), h('span', { class: 'gear-lv', text: s[1] })]); (i < 3 ? left : right).appendChild(t); });
    doll.append(left, h('span', { class: 'class-ico big', text: cls.icon }), right);
    card.appendChild(doll);
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
    const pl = Object.keys(st.pass);
    info.appendChild(h('p', { class: 'input-hint', text: 'Perk: ' + cls.perk + '. ' + (pl.length ? 'Active abilities: ' + pl.length + '. ' : 'Raise gear to Excellent to unlock abilities. ') + 'In a boss fight your damage is multiplied by (1 + attribute/20) for that boss’s science, so studying each subject makes you stronger against its bosses.' }));
    card.appendChild(info);
    body.appendChild(card);
    body.appendChild(h('div', { class: 'hero-cta' }, [
      h('button', { class: 'btn', type: 'button', text: 'Equip best', onclick: () => { SLOTS.forEach((s) => { const best = R().inv.filter((i) => base(i.b).slot === s[0]).sort((a, b) => itemStat(b).val - itemStat(a).val || b.r - a.r)[0]; if (best) R().equip[s[0]] = best.uid; }); PB.checkBadges(); PB.save(); viewHero(); } }),
      h('button', { class: 'btn', type: 'button', text: 'Merge all', onclick: () => { const n = autoMerge(); PB.emit({ type: 'loot', icon: '✨', text: n ? n + ' merge' + (n > 1 ? 's' : '') + ' done' : 'Nothing to merge yet' }); viewHero(); } }),
      h('button', { class: 'btn ghost', type: 'button', disabled: r.gold < 300, text: 'Change class (◉300)', onclick: () => { if (r.gold < 300) return; r.gold -= 300; r.cls = null; PB.save(); viewHero(); } })
    ]));
  }

  function tabBag(body) {
    const r = R();
    const filt = h('div', { class: 'seg', role: 'group', style: 'margin:12px 0' });
    [['all', 'All']].concat(SLOTS.map((s) => [s[0], s[1]])).forEach((s) => filt.appendChild(h('button', { type: 'button', class: slotFilter === s[0] ? 'on' : '', text: s[1], onclick: () => { slotFilter = s[0]; viewHero(); } })));
    body.appendChild(filt);
    const lay = h('div', { class: 'bag-layout' });
    const grid = h('div', { class: 'bag-grid' });
    const items = r.inv.filter((i) => slotFilter === 'all' || base(i.b).slot === slotFilter).sort((a, b) => b.r - a.r || b.l - a.l || a.b.localeCompare(b.b));
    if (!items.length) grid.appendChild(h('p', { class: 'empty', text: 'No items here yet. Open chests to find equipment.' }));
    items.forEach((it) => grid.appendChild(itemTile(it, () => { sel = it.uid; viewHero(); }, (sel === it.uid ? ' sel' : '') + (it.r < 5 && mergeable(it).length >= 2 ? ' can-merge' : ''))));
    lay.appendChild(grid);
    const it = item(sel);
    lay.appendChild(it ? itemPanel(it, viewHero) : h('div', { class: 'gear-panel muted' }, [h('p', { text: 'Select an item to equip, level up, merge or salvage. A glowing item can be merged now.' })]));
    body.appendChild(lay);
  }

  function tabChests(body) {
    const r = R(), t = PB.today();
    const sup = h('section', { class: 'lock-box' });
    const claimed = r.supply.last === t;
    sup.appendChild(h('h2', { text: 'Daily supply' }));
    const row = h('div', { class: 'supply-row' });
    const next = claimed ? r.supply.streak % 7 : (() => { const y = new Date(); y.setDate(y.getDate() - 1); const yk = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0'); return r.supply.last === yk ? (r.supply.streak + 1) % 7 : 0; })();
    SUPPLY.forEach((g, i) => row.appendChild(h('div', { class: 'supply-day' + (i === next ? (claimed ? ' done' : ' today') : '') }, [h('small', { text: 'Day ' + (i + 1) }), h('b', { text: ICON[g[0]] + ' ' + g[1] })])));
    sup.appendChild(row);
    sup.appendChild(h('button', { class: 'btn primary', type: 'button', disabled: claimed, text: claimed ? 'Claimed today: come back tomorrow' : 'Claim today’s supply', onclick: () => { claimSupply(); viewHero(); } }));
    sup.appendChild(h('p', { class: 'input-hint', text: 'Claim on consecutive days to climb the 7-day ladder. Missing a day starts it again.' }));
    body.appendChild(sup);

    const cg = h('div', { class: 'chest-grid' });
    Object.keys(CHESTS).forEach((k) => {
      const c = CHESTS[k], can = r[c.cost[0]] >= c.cost[1];
      cg.appendChild(h('div', { class: 'chest-card' }, [
        h('span', { class: 'chest-ico', text: c.icon }), h('b', { text: c.name }),
        h('small', { html: c.odds.map((o, i) => (o ? '<span style="color:' + RAR[i].col + '">' + RAR[i].name + ' ' + o + '%</span>' : '')).filter(Boolean).join(' · ') + (c.pity ? '<br>Epic guaranteed within ' + c.pity + ' (' + (c.pity - (r.pity || 0)) + ' to go)' : '') }),
        h('button', { class: 'btn small ' + (can ? 'primary' : ''), type: 'button', disabled: !can, text: 'Open: ' + ICON[c.cost[0]] + ' ' + c.cost[1], onclick: () => { const got = openChest(k); if (got) { lastLoot = got.map((x) => x.uid); const best = got.reduce((a, x) => (x.r > a.r ? x : a)); PB.emit({ type: 'loot', icon: base(best.b).icon, text: 'Found ' + RAR[best.r].name + ' ' + base(best.b).name + (got.length > 1 ? ' and ' + (got.length - 1) + ' more' : '') }); } viewHero(); } })
      ]));
    });
    cg.appendChild(h('div', { class: 'chest-card' }, [h('span', { class: 'chest-ico', text: '☕' }), h('b', { text: 'Coffee' }), h('small', { text: 'Heals 25% HP in a fight (double for chemists). You own ' + r.potions + '.' }), h('button', { class: 'btn small', type: 'button', disabled: r.gold < 60, text: 'Buy: ◉ 60', onclick: () => { if (r.gold < 60) return; r.gold -= 60; r.potions++; PB.save(); viewHero(); } })]));
    cg.appendChild(h('div', { class: 'chest-card' }, [h('span', { class: 'chest-ico', text: '📜' }), h('b', { text: 'Scroll bundle' }), h('small', { text: '5 random design scrolls.' }), h('button', { class: 'btn small', type: 'button', disabled: r.gems < 40, text: 'Buy: 💎 40', onclick: () => { if (r.gems < 40) return; r.gems -= 40; give('scrolls', 5, 'bundle'); viewHero(); } })]));
    body.appendChild(cg);
    if (lastLoot) {
      const shown = lastLoot.map(item).filter(Boolean);
      if (shown.length) { const lg = h('div', { class: 'bag-grid loot' }); shown.forEach((it) => lg.appendChild(itemTile(it, () => { sel = it.uid; tab = 'bag'; viewHero(); }))); body.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Just found' })])); body.appendChild(lg); }
    }
    body.appendChild(h('div', { class: 'lock-box' }, [h('h2', { text: 'How to earn' }), h('ul', { html: '<li>◉ <b>Gold</b>: every problem solved (half its points), gym drills, sections and labs, bosses, Trials floors.</li><li>💎 <b>Gems</b>: daily quests (+15, +40 for all three), badges (+20), level-ups (+50), first boss wins, every 5th Trials floor.</li><li>🗝️ <b>Keys</b>: the daily challenge, unlocking a chapter, level-ups (+2), every boss win, every 10th Trials floor.</li><li>📜 <b>Scrolls</b>: olympiad problems, every 5 correct gym drills, bosses, Trials floors, salvaging gear.</li>' })]));
  }

  function tabBosses(body) {
    const r = R();
    body.appendChild(h('p', { class: 'input-hint', text: Object.keys(r.defeated).length + ' of ' + BOSSES.length + ' defeated. A boss appears once you pass three chapters of its unit (or all, if fewer). Bosses can be fought again for gold, keys and scrolls.' }));
    const st = stats();
    PB.SUBJECTS.forEach((sub) => {
      const list = BOSSES.filter((b) => b.subject === sub.id);
      if (!list.length) return;
      body.appendChild(h('div', { class: 'part-label', text: sub.name }));
      const g = h('div', { class: 'boss-grid' });
      list.forEach((b) => {
        const ready = bossReady(b), won = r.defeated[b.id], passed = b.chapters.filter((c) => PB.isPassed(c)).length;
        const rec = Math.round(b.hp / 6 * 4 + b.atk * 6 * 0.6);
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
      h('p', { text: 'An endless tower of ever-stronger monsters. Each floor is a fight with questions from every chapter you have open. Every floor cleared pays gold and a scroll; every 5th floor gems; every 10th a key. You keep everything you earn even when you fall.' }),
      h('div', { class: 'stat-row' }, [h('div', { class: 'stat' }, [h('b', { text: String(r.tower.best || 0) }), h('span', { text: 'best floor' })]), h('div', { class: 'stat' }, [h('b', { text: left + ' / ' + TOWER_RUNS }), h('span', { text: 'runs left today' })])]),
      h('div', { class: 'hero-cta' }, [h('a', { class: 'btn primary' + (left ? '' : ' disabled'), href: left ? '#trials' : '#hero', text: left ? 'Enter the Trials' : 'Come back tomorrow', onclick: (e) => { if (!left) e.preventDefault(); } })])
    ]));
  }

  /* ---------------- Fights ---------------- */
  function fightView(cfg) {
    // cfg: { title, eyebrow, foe: {name, icon, hp, atk}, subject|null, pool: [chapters], onWin(fight) -> reward text, onLose(fight), next?: () => foe }
    const r = R(), st = stats();
    const attr = cfg.subject ? st.attrs[cfg.subject] : Math.round(Object.values(st.attrs).reduce((a, x) => a + x, 0) / 4);
    const P = st.pass;
    const F = { hp: st.hp, foe: Object.assign({}, cfg.foe), fhp: cfg.foe.hp, turn: 0, log: [], streak: 0, blocks: P.block || 0, revived: false, free: P.coffee || 0, over: false, first: true, inst: null, floor: cfg.floor || 0 };
    const wrap = h('div', { class: 'wrap' }), arena = h('section', { class: 'battle' + (cfg.subject ? ' subj-' + cfg.subject : '') });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#hero">Hero</a> · ' + cfg.eyebrow }));
    wrap.appendChild(arena);
    const pool = cfg.pool.reduce((a, c) => a.concat(PB.drills[c.id] || []), []);
    function newQ() { const d = pool[Math.floor(Math.random() * pool.length)]; const inst = d.gen(PB.rng((Math.random() * 4294967296) >>> 0)); inst.title = d.title; inst.ch = PB.chapter(d.chapter).title; F.inst = inst; }
    function strike(ok) {
      F.turn++;
      if (ok) {
        F.streak++;
        let dmg = st.atk * (1 + attr / 20) * (1 + (P.combo || 0) * (F.streak - 1));
        if (F.first && P.opener) dmg *= P.opener;
        F.first = false;
        const crit = Math.random() < st.crit; if (crit) dmg *= 2;
        let hits = 1; if (P.double && Math.random() < P.double) hits = 2;
        dmg = Math.round(dmg);
        F.fhp -= dmg * hits;
        F.log.unshift((crit ? '💥 Critical! ' : '⚔ ') + 'You hit for ' + dmg + (hits > 1 ? ' twice' : '') + (F.streak > 1 && P.combo ? ' (streak ×' + F.streak + ')' : '') + '.');
        if (P.lifesteal) F.hp = Math.min(st.hp, F.hp + Math.round(st.hp * P.lifesteal));
      } else {
        F.streak = 0;
        if (F.blocks > 0) { F.blocks--; F.log.unshift('🥼 Your lab coat absorbs the blow.'); }
        else if (P.dodge && Math.random() < P.dodge) F.log.unshift('🚀 You dodge!');
        else { const dmg = Math.round(F.foe.atk * (0.85 + Math.random() * 0.3) * (1 - (P.dr || 0))); F.hp -= dmg; F.log.unshift(F.foe.icon + ' ' + F.foe.name + ' strikes for ' + dmg + '.'); }
        if (F.hp <= 0 && P.revive && !F.revived) { F.revived = true; F.hp = Math.round(st.hp * P.revive); F.log.unshift('🥾 You get back up with ' + F.hp + ' HP!'); }
      }
      if (F.fhp <= 0) { const txt = cfg.onWin(F); if (cfg.next) { const nf = cfg.next(F); if (nf) { F.foe = nf; F.fhp = nf.hp; F.first = true; F.blocks = P.block || 0; F.log.unshift('🏆 ' + txt + ' Next: ' + nf.name + '.'); newQ(); draw(); return; } } F.over = 'win'; F.reward = txt; }
      else if (F.hp <= 0) { F.over = 'lose'; F.reward = cfg.onLose ? cfg.onLose(F) : ''; }
      else newQ();
      draw();
    }
    function draw() {
      arena.innerHTML = '';
      arena.appendChild(h('div', { class: 'battle-top' }, [
        h('div', { class: 'fighter' }, [h('span', { class: 'fighter-ico', text: st.cls.icon }), h('b', { text: (r.name || st.cls.name) + ' · ⚔' + st.atk }), hpBar(F.hp, st.hp, 'me')]),
        h('span', { class: 'vs', text: F.floor ? 'F' + F.floor : 'VS' }),
        h('div', { class: 'fighter boss' }, [h('span', { class: 'fighter-ico', text: F.foe.icon }), h('b', { text: F.foe.name + ' · ⚔' + F.foe.atk }), hpBar(F.fhp, F.foe.hp, 'foe')])
      ]));
      if (F.over) {
        arena.appendChild(h('div', { class: 'battle-end ' + F.over }, [
          h('h2', { text: F.over === 'win' ? 'Victory!' : 'Defeated' }),
          h('p', { text: F.reward || (F.over === 'lose' ? 'Level up and merge gear, study the unit to raise your attribute, or bring coffee.' : '') }),
          h('div', { class: 'hero-cta' }, [h('a', { class: 'btn primary', href: '#hero', text: 'Back to the hero' }), cfg.again ? h('button', { class: 'btn', type: 'button', text: 'Fight again', onclick: cfg.again }) : null])
        ]));
      } else {
        const q = F.inst, card = h('div', { class: 'battle-q' });
        card.appendChild(h('div', { class: 'eyebrow', text: 'Turn ' + (F.turn + 1) + ' · ' + q.ch + ' · ' + q.title }));
        card.appendChild(h('div', { class: 'prob-q', html: q.q }));
        const input = h('input', { class: 'num-input', type: 'text', placeholder: 'Answer to attack' + (q.unit ? ' (' + q.unit + ')' : ''), autocomplete: 'off' });
        const fb = h('div', { class: 'feedback' });
        const go = () => { const ok = PB.drillOk(q, input.value); if (ok === null) { fb.textContent = 'Enter a number.'; return; } if (!ok) F.log.unshift('✗ The answer was ' + PB.fmt(q.answer, 4) + (q.unit ? ' ' + q.unit : '') + '.'); strike(ok); };
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
        const cof = F.free + r.potions;
        card.appendChild(h('div', { class: 'answer-row' }, [input, h('button', { class: 'btn primary', type: 'button', text: '⚔ Attack', onclick: go }),
          h('button', { class: 'btn', type: 'button', disabled: !cof || F.hp >= st.hp, text: '☕ Coffee (' + cof + ')', onclick: () => { if (F.free > 0) F.free--; else { r.potions--; PB.save(); } const heal = Math.round(st.hp * (r.cls === 'chemist' ? 0.5 : 0.25)); F.hp = Math.min(st.hp, F.hp + heal); F.log.unshift('☕ You recover ' + heal + ' HP.'); draw(); } }),
          h('a', { class: 'btn ghost', href: '#hero', text: 'Flee', onclick: () => { if (cfg.onLose && F.floor) cfg.onLose(F); } })]));
        card.appendChild(fb);
        arena.appendChild(card);
        PB.typeset(card);
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

  function lootMult() { return 1 + (stats().pass.loot || 0); }
  function viewBoss(id) {
    const r = R();
    buildBosses();
    const b = BOSSES.find((x) => x.id === id);
    if (!b || !r.cls || !(bossReady(b) || r.defeated[b.id])) { location.hash = '#hero'; return; }
    fightView({ eyebrow: PB.subject(b.subject).name + ' · ' + b.part, subject: b.subject, pool: b.chapters, foe: { name: b.name, icon: b.icon, hp: b.hp, atk: b.atk },
      again: () => viewBoss(id),
      onWin: () => {
        const first = !r.defeated[b.id], m = lootMult();
        r.defeated[b.id] = r.defeated[b.id] || Date.now();
        give('gold', Math.round((first ? b.gold : b.gold * 0.4) * m), null, true);
        give('keys', first ? 2 : 1, b.name, true);
        give('scrolls', Math.round((first ? 5 : 2) * m), b.name, true);
        if (first) { give('gems', b.gems, b.name, true); r.trophies[b.id] = b.name.replace(/^The /, '') + ' Bane'; r.title = r.trophies[b.id]; PB.addXP(b.xp, 'Defeated ' + b.name); }
        PB.emit({ type: 'loot', icon: b.icon, text: 'Defeated ' + b.name });
        PB.checkBadges(); PB.save();
        return 'Rewards: ◉' + Math.round((first ? b.gold : b.gold * 0.4) * m) + ', 🗝️' + (first ? 2 : 1) + ', 📜' + Math.round((first ? 5 : 2) * m) + (first ? ', 💎' + b.gems + ', ' + b.xp + ' XP and the title "' + r.trophies[b.id] + '"' : ' (rematch)') + '.';
      } });
  }
  function towerFoe(f) { const names = [['Lab Rat', '🐀'], ['Rogue Electron', '⚡'], ['Acid Slime', '🧪'], ['Feral Fungus', '🍄'], ['Clockwork Beetle', '🪲'], ['Plasma Wisp', '🔥'], ['Gravity Golem', '🪨'], ['Void Comet', '☄️']]; const n = names[(f - 1) % names.length]; return { name: n[0] + ' (floor ' + f + ')', icon: n[1], hp: Math.round(120 * Math.pow(1.2, f - 1)), atk: Math.round(25 * Math.pow(1.13, f - 1)) }; }
  function viewTrials() {
    const r = R(), t = PB.today();
    if (!r.cls) { location.hash = '#hero'; return; }
    if (r.tower.day !== t) { r.tower.day = t; r.tower.runs = 0; }
    if (r.tower.runs >= TOWER_RUNS) { location.hash = '#hero'; return; }
    r.tower.runs++; PB.save();
    const open = PB.chapters.filter((c) => PB.isUnlocked(c) && PB.drills[c.id]);
    let floor = 1, gold = 0, sc = 0, gems = 0, keys = 0;
    const payFloor = (f) => { const m = lootMult(); const g = Math.round(15 * f * m); gold += g; give('gold', g, null, true); give('scrolls', 1, null, true); sc++; if (f % 5 === 0) { give('gems', 20, null, true); gems += 20; } if (f % 10 === 0) { give('keys', 1, null, true); keys++; } if (f > (r.tower.best || 0)) r.tower.best = f; PB.checkBadges(); PB.save(); };
    const summary = () => 'Reached floor ' + floor + '. Earned ◉' + gold + ', 📜' + sc + (gems ? ', 💎' + gems : '') + (keys ? ', 🗝️' + keys : '') + '. Best floor: ' + (r.tower.best || 0) + '.';
    fightView({ eyebrow: 'The Trials', subject: null, pool: open.length ? open : [PB.chapters[0]], foe: towerFoe(1), floor: 1,
      onWin: (F) => { payFloor(floor); const txt = 'Floor ' + floor + ' cleared!'; floor++; F.floor = floor; return txt; },
      next: () => towerFoe(floor),
      onLose: () => { PB.emit({ type: 'loot', icon: '🏛️', text: 'Trials: floor ' + floor + ', ◉' + gold }); return summary(); } });
  }

  PB.views = PB.views || {};
  PB.views.hero = viewHero;
  PB.views.trials = viewTrials;
  BOSSES.forEach((b) => { PB.views['boss-' + b.id] = () => viewBoss(b.id); });

  // Dashboard strip.
  const prevHome = PB.homeExtras;
  PB.homeExtras = function (wrap) {
    if (prevHome) prevHome(wrap);
    const r = R();
    buildBosses();
    const ready = BOSSES.filter((b) => bossReady(b) && !r.defeated[b.id]);
    const st = r.cls ? stats() : null, supplyReady = r.supply.last !== PB.today();
    wrap.appendChild(h('a', { class: 'hero-strip', href: '#hero' }, [
      h('span', { class: 'class-ico', text: r.cls ? CLASSES[r.cls].icon : '🛡️' }),
      h('div', {}, [h('b', { text: r.cls ? (r.name || CLASSES[r.cls].name) + ' · ⚡ ' + st.power.toLocaleString('en-US') + ' power · ◉ ' + r.gold + ' · 💎 ' + r.gems + ' · 🗝️ ' + r.keys : 'Create your hero' }),
        h('small', { text: r.cls ? [supplyReady ? 'Daily supply ready' : null, r.keys ? r.keys + ' chest key' + (r.keys > 1 ? 's' : '') + ' to use' : null, ready.length ? ready.length + ' boss' + (ready.length > 1 ? 'es' : '') + ' waiting' : null].filter(Boolean).join(' · ') || 'Merge gear, climb the Trials, defeat unit bosses' : 'Pick a class, collect and merge equipment, and fight the boss of each unit.' })]),
      h('span', { class: 'btn small primary', text: r.cls && (supplyReady || ready.length) ? 'Go' : 'Open' })
    ]));
  };
})();
