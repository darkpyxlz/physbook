/* Scibook RPG: a hero with a class and attributes, gold earned from learning, a gear shop,
   and a boss guarding every unit (part) of every science. Boss fights use randomised drills from that unit. */
(function () {
  'use strict';
  const PB = window.PB;
  const R = function () {
    const S = PB.S;
    if (!S.rpg) S.rpg = {};
    const r = S.rpg;
    r.gold = r.gold || 0; r.earned = r.earned || 0; r.owned = r.owned || {}; r.equip = r.equip || {}; r.potions = r.potions || 0;
    r.defeated = r.defeated || {}; r.wins = r.wins || 0; r.trophies = r.trophies || {};
    return r;
  };

  const CLASSES = {
    physicist: { name: 'Physicist', icon: '⚛️', subject: 'physics', attr: 'Might', perk: '+20% damage in every fight' },
    chemist: { name: 'Chemist', icon: '⚗️', subject: 'chemistry', attr: 'Alchemy', perk: 'Coffee heals double' },
    biologist: { name: 'Biologist', icon: '🧬', subject: 'biology', attr: 'Vitality', perk: '+40 maximum HP' },
    astronomer: { name: 'Astronomer', icon: '🔭', subject: 'astronomy', attr: 'Insight', perk: '+15% critical-hit chance' }
  };
  const ATTR = { physics: 'Might', chemistry: 'Alchemy', biology: 'Vitality', astronomy: 'Insight' };
  const ITEMS = [
    { id: 'goggles', slot: 'head', icon: '🥽', name: 'Safety Goggles', cost: 60, hp: 15, desc: '+15 max HP' },
    { id: 'cap', slot: 'head', icon: '🎓', name: 'Thinking Cap', cost: 160, crit: 0.06, hp: 10, desc: '+10 max HP, +6% crit' },
    { id: 'helmet', slot: 'head', icon: '🪖', name: 'Astronaut Helmet', cost: 420, hp: 45, armour: 2, desc: '+45 max HP, +2 armour' },
    { id: 'coat', slot: 'body', icon: '🥼', name: 'Lab Coat', cost: 80, armour: 3, desc: '+3 armour' },
    { id: 'vest', slot: 'body', icon: '🦺', name: 'Field Vest', cost: 220, armour: 6, hp: 10, desc: '+6 armour, +10 max HP' },
    { id: 'exosuit', slot: 'body', icon: '🛡️', name: 'Faraday Exosuit', cost: 520, armour: 10, hp: 20, desc: '+10 armour, +20 max HP' },
    { id: 'rule', slot: 'tool', icon: '📏', name: 'Slide Rule', cost: 70, dmg: 4, desc: '+4 damage' },
    { id: 'scope', slot: 'tool', icon: '🔬', name: 'Microscope', cost: 190, dmg: 8, desc: '+8 damage' },
    { id: 'collider', slot: 'tool', icon: '🌀', name: 'Pocket Collider', cost: 480, dmg: 14, crit: 0.04, desc: '+14 damage, +4% crit' },
    { id: 'electron', slot: 'charm', icon: '⚡', name: 'Lucky Electron', cost: 110, crit: 0.08, desc: '+8% crit' },
    { id: 'mito', slot: 'charm', icon: '🦠', name: 'Mitochondrion Charm', cost: 260, regen: 4, hp: 15, desc: 'Heal 4 HP every turn, +15 max HP' },
    { id: 'galaxy', slot: 'charm', icon: '🌌', name: 'Pocket Galaxy', cost: 340, goldBonus: 0.2, desc: '+20% gold from everything' }
  ];
  const SLOTS = [['head', 'Head'], ['body', 'Body'], ['tool', 'Tool'], ['charm', 'Charm']];
  const POTION_COST = 25;
  const BOSS_NAMES = {
    physics: { 'Foundations': ['The Dimensional Golem', '🗿'], 'Mechanics': ['Newton’s Juggernaut', '🦏'], 'Thermal Physics': ['The Entropy Wyrm', '🐉'], 'Electricity & Magnetism': ['The Maxwell Hydra', '🐍'], 'Optics': ['The Prism Wraith', '👻'], 'Modern Physics': ['The Quantum Phantom', '🌫️'], 'Olympiad Extensions': ['The Lagrangian Leviathan', '🐋'] },
    chemistry: { 'Foundations': ['The Mole Rat King', '🐀'], 'Physical Chemistry': ['The Gibbs Behemoth', '🦣'], 'Inorganic Chemistry': ['The Lanthanide Lich', '💀'], 'Organic Chemistry': ['The Carbocation Chimera', '🦁'], 'Analysis': ['The Spectral Sphinx', '🗝️'] },
    biology: { 'Cells and Molecules': ['The Rogue Ribosome', '🧫'], 'Genetics': ['The Mutant Mendel', '🧟'], 'Physiology': ['The Adrenal Ogre', '👹'], 'Diversity of Life': ['The Chimeric Kraken', '🦑'], 'Evolution and Ecology': ['The Red Queen', '👑'] },
    astronomy: { 'The Sky': ['The Eclipse Serpent', '🌑'], 'The Solar System': ['The Comet Drake', '☄️'], 'The Stars': ['The Red Giant', '🔴'], 'Galaxies and Cosmology': ['The Dark Energy Titan', '🌌'] }
  };

  /* ---------- Derived stats ---------- */
  function gear() { const r = R(); return SLOTS.map(function (s) { return ITEMS.find(function (i) { return i.id === r.equip[s[0]]; }); }).filter(Boolean); }
  const sumGear = function (k) { return gear().reduce(function (a, i) { return a + (i[k] || 0); }, 0); };
  function earnedIn(sid) {
    let n = 0;
    Object.keys(PB.S.solved).forEach(function (pid) { const p = PB.problem(pid); if (p && PB.chapter(p.chapter).subject === sid) n += PB.S.solved[pid].pts; });
    return n;
  }
  function attrs() { const o = {}; PB.SUBJECTS.forEach(function (s) { o[s.id] = 1 + Math.floor(Math.sqrt(earnedIn(s.id)) / 2); }); return o; }
  function stats() {
    const r = R(), cls = CLASSES[r.cls], a = attrs(), lv = PB.levelInfo().level;
    return {
      level: lv, attrs: a,
      maxHp: 60 + 8 * lv + 2 * a.biology + sumGear('hp') + (r.cls === 'biologist' ? 40 : 0),
      armour: sumGear('armour'),
      dmg: sumGear('dmg'),
      crit: Math.min(0.5, 0.08 + a.astronomy * 0.01 + sumGear('crit') + (r.cls === 'astronomer' ? 0.15 : 0)),
      regen: sumGear('regen'),
      goldBonus: sumGear('goldBonus'),
      cls: cls
    };
  }

  /* ---------- Gold ---------- */
  function addGold(n, why) {
    if (!(n > 0)) return;
    const r = R(), st = stats();
    n = Math.round(n * (1 + st.goldBonus));
    r.gold += n; r.earned += n; PB.save();
    PB.emit({ type: 'gold', amount: n, reason: why });
  }
  PB.rpg = { gold: function () { return R().gold; }, stats: stats, addGold: addGold };
  PB.on(function (ev) {
    if (ev.type !== 'xp' || !(ev.amount > 0)) return;
    const reason = ev.reason || '';
    let g = 0;
    if (reason.indexOf('Solved ') === 0) {
      g = ev.amount * 0.5;
      const p = PB.problem(reason.slice(7)), r = R();
      if (p && r.cls && CLASSES[r.cls].subject === PB.chapter(p.chapter).subject) g *= 1.25;
    } else if (reason.indexOf('Gym') === 0) g = ev.amount * 0.3;
    else if (reason.indexOf('Quest') === 0 || reason.indexOf('All daily') === 0) g = ev.amount * 0.5;
    else if (reason.indexOf('Read') === 0 || reason.indexOf('Explored') === 0) g = 2;
    if (g) addGold(Math.max(1, Math.round(g)), reason);
  });

  /* ---------- Bosses ---------- */
  const BOSSES = [];
  function buildBosses() {
    BOSSES.length = 0;
    PB.SUBJECTS.forEach(function (sub) {
      sub.parts.forEach(function (part, i) {
        const chs = PB.chaptersOf(sub.id).filter(function (c) { return c.part === part; });
        if (!chs.length) return;
        const nm = (BOSS_NAMES[sub.id] || {})[part] || ['Guardian of ' + part, '🐲'];
        const tier = i + 1;
        BOSSES.push({ id: sub.id + '-' + i, subject: sub.id, part: part, name: nm[0], icon: nm[1], chapters: chs, tier: tier,
          hp: 70 + 22 * chs.length + 25 * tier, atk: 12 + 4 * tier, need: Math.min(3, chs.length),
          gold: 60 + 25 * chs.length + 20 * tier, xp: 40 + 10 * tier });
      });
    });
  }
  function bossReady(b) { return b.chapters.filter(function (c) { return PB.isPassed(c); }).length >= b.need; }

  /* ---------- Badges ---------- */
  PB.BADGES.push(
    { id: 'boss1', mark: '⚔', name: 'Giant Slayer', desc: 'Defeat a unit boss.', test: function () { return Object.keys(R().defeated).length >= 1; } },
    { id: 'boss5', mark: '⚔5', name: 'Monster Hunter', desc: 'Defeat 5 different unit bosses.', test: function () { return Object.keys(R().defeated).length >= 5; } },
    { id: 'bossall', mark: '♛', name: 'Legend of Scibook', desc: 'Defeat every unit boss.', test: function () { return BOSSES.length > 0 && BOSSES.every(function (b) { return R().defeated[b.id]; }); } },
    { id: 'rich', mark: '◉', name: 'Grant Funded', desc: 'Earn 1000 gold in total.', test: function () { return R().earned >= 1000; } },
    { id: 'kitted', mark: '⚙', name: 'Fully Kitted', desc: 'Fill all four gear slots.', test: function () { return SLOTS.every(function (s) { return R().equip[s[0]]; }); } }
  );

  /* ---------- Views ---------- */
  function hpBar(cur, max, cls) { const f = Math.max(0, Math.min(1, cur / max)); return PB.h('div', { class: 'hpbar ' + (cls || '') }, [PB.h('span', { style: 'width:' + Math.round(f * 100) + '%' }), PB.h('b', { text: Math.max(0, Math.round(cur)) + ' / ' + max + ' HP' })]); }

  function viewHero() {
    const h = PB.h, r = R();
    buildBosses();
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Your character' }));
    wrap.appendChild(h('h1', { text: 'Hero & bosses', style: 'font-size:34px;margin-top:6px' }));
    if (!r.cls) {
      wrap.appendChild(h('p', { class: 'lede', text: 'Choose a class. Every problem you solve, lab you explore and quest you finish earns gold; your attributes grow with the points you earn in each science. Spend gold on gear, then take on the boss guarding each unit.' }));
      const g = h('div', { class: 'class-grid' });
      Object.keys(CLASSES).forEach(function (k) {
        const c = CLASSES[k];
        g.appendChild(h('button', { class: 'class-card subj-' + c.subject, type: 'button', onclick: function () { r.cls = k; r.gold += 50; r.earned += 50; PB.save(); PB.emit({ type: 'gold', amount: 50 }); viewHero(); } }, [
          h('span', { class: 'class-ico', text: c.icon }), h('h3', { text: c.name }),
          h('p', { text: 'Main attribute: ' + c.attr + '. ' + c.perk + '. +25% gold from ' + PB.subject(c.subject).name.toLowerCase() + ' problems.' })
        ]));
      });
      wrap.appendChild(g);
      wrap.appendChild(h('p', { class: 'input-hint', text: 'You start with 50 gold. Your class can be changed later for 100 gold.' }));
      PB.setView([wrap], 'hero');
      return;
    }
    const st = stats(), cls = st.cls;
    const card = h('section', { class: 'hero-card' });
    card.appendChild(h('div', { class: 'hero-avatar subj-' + cls.subject }, [h('span', { class: 'class-ico big', text: cls.icon }), h('div', { class: 'hero-gear' }, SLOTS.map(function (s) { const it = ITEMS.find(function (i) { return i.id === r.equip[s[0]]; }); return h('span', { class: 'gear-slot' + (it ? ' on' : ''), title: it ? it.name : s[1] + ': empty', text: it ? it.icon : '·' }); }))]));
    const info = h('div', { class: 'hero-info' });
    const nameIn = h('input', { class: 'hero-name', value: r.name || 'Nameless ' + cls.name, 'aria-label': 'Hero name', onchange: function () { r.name = nameIn.value.slice(0, 40); PB.save(); } });
    info.appendChild(nameIn);
    info.appendChild(h('div', { class: 'eyebrow', text: 'Level ' + st.level + ' ' + cls.name + ' · ' + PB.levelInfo().title + (r.title ? ' · ' + r.title : '') }));
    info.appendChild(hpBar(st.maxHp, st.maxHp));
    const ag = h('div', { class: 'attr-grid' });
    PB.SUBJECTS.forEach(function (s) { ag.appendChild(h('div', { class: 'attr subj-' + s.id }, [h('span', { class: 'subj-badge', text: s.mark }), h('b', { text: String(st.attrs[s.id]) }), h('small', { text: ATTR[s.id] })])); });
    info.appendChild(ag);
    info.appendChild(h('div', { class: 'stat-row' }, [
      h('div', { class: 'stat' }, [h('b', { text: '◉ ' + r.gold }), h('span', { text: 'gold' })]),
      h('div', { class: 'stat' }, [h('b', { text: String(st.armour) }), h('span', { text: 'armour' })]),
      h('div', { class: 'stat' }, [h('b', { text: '+' + st.dmg }), h('span', { text: 'gear damage' })]),
      h('div', { class: 'stat' }, [h('b', { text: Math.round(st.crit * 100) + '%' }), h('span', { text: 'crit chance' })]),
      h('div', { class: 'stat' }, [h('b', { text: '☕ ' + r.potions }), h('span', { text: 'coffees' })])
    ]));
    info.appendChild(h('p', { class: 'input-hint', text: 'Perk: ' + cls.perk + '. Attributes rise with the points you earn in each science; in a boss fight, the boss’s science sets your damage. Vitality adds HP and Insight adds crit chance.' }));
    card.appendChild(info);
    wrap.appendChild(card);

    // Bosses
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Unit bosses' }), h('p', { text: Object.keys(r.defeated).length + ' of ' + BOSSES.length + ' defeated. A boss appears once you pass ' + 'three chapters of its unit (or all, if fewer).' })]));
    PB.SUBJECTS.forEach(function (sub) {
      const list = BOSSES.filter(function (b) { return b.subject === sub.id; });
      if (!list.length) return;
      wrap.appendChild(h('div', { class: 'part-label', text: sub.name }));
      const g = h('div', { class: 'boss-grid' });
      list.forEach(function (b) {
        const ready = bossReady(b), won = r.defeated[b.id];
        const passed = b.chapters.filter(function (c) { return PB.isPassed(c); }).length;
        g.appendChild(h('div', { class: 'boss-card subj-' + sub.id + (won ? ' won' : ready ? ' ready' : ' locked') }, [
          h('span', { class: 'boss-ico', text: ready || won ? b.icon : '❔' }),
          h('div', {}, [h('h3', { text: ready || won ? b.name : 'Unknown foe' }), h('p', { text: b.part + ' · HP ' + b.hp + ' · attack ' + b.atk }),
            h('small', { text: won ? 'Defeated' + (r.trophies[b.id] ? ' · trophy: ' + r.trophies[b.id] : '') : ready ? 'Reward: ◉ ' + b.gold + ' and ' + b.xp + ' XP' : 'Pass ' + (b.need - passed) + ' more chapter' + (b.need - passed > 1 ? 's' : '') + ' of this unit' })]),
          ready || won ? h('a', { class: 'btn small ' + (won ? '' : 'primary'), href: '#boss-' + b.id, text: won ? 'Rematch' : 'Fight' }) : null
        ]));
      });
      wrap.appendChild(g);
    });

    // Shop
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Shop' }), h('p', { text: 'Gear is kept forever; equip one item per slot.' })]));
    const shop = h('div', { class: 'shop-grid' });
    shop.appendChild(h('div', { class: 'shop-item' }, [h('span', { class: 'shop-ico', text: '☕' }), h('div', {}, [h('b', { text: 'Coffee' }), h('small', { text: 'Heals 40 HP in a fight (' + (r.cls === 'chemist' ? '80 for chemists' : 'chemists: 80') + '). You own ' + r.potions + '.' })]),
      h('button', { class: 'btn small', type: 'button', disabled: r.gold < POTION_COST, text: '◉ ' + POTION_COST, onclick: function () { if (r.gold < POTION_COST) return; r.gold -= POTION_COST; r.potions++; PB.save(); PB.renderHUD(); viewHero(); } })]));
    ITEMS.forEach(function (it) {
      const own = r.owned[it.id], on = r.equip[it.slot] === it.id;
      shop.appendChild(h('div', { class: 'shop-item' + (on ? ' on' : '') }, [h('span', { class: 'shop-ico', text: it.icon }), h('div', {}, [h('b', { text: it.name }), h('small', { text: SLOTS.find(function (s) { return s[0] === it.slot; })[1] + ' · ' + it.desc })]),
        own ? h('button', { class: 'btn small' + (on ? ' done' : ''), type: 'button', text: on ? 'Equipped' : 'Equip', onclick: function () { r.equip[it.slot] = on ? null : it.id; PB.checkBadges(); PB.save(); viewHero(); } })
          : h('button', { class: 'btn small primary', type: 'button', disabled: r.gold < it.cost, text: '◉ ' + it.cost, onclick: function () { if (r.gold < it.cost) return; r.gold -= it.cost; r.owned[it.id] = Date.now(); r.equip[it.slot] = it.id; PB.checkBadges(); PB.save(); PB.renderHUD(); PB.emit({ type: 'loot', icon: it.icon, text: 'Bought ' + it.name }); viewHero(); } })]));
    });
    wrap.appendChild(shop);
    wrap.appendChild(h('div', { class: 'hero-cta' }, [h('button', { class: 'btn ghost', type: 'button', disabled: r.gold < 100, text: 'Change class (◉ 100)', onclick: function () { if (r.gold < 100) return; r.gold -= 100; r.cls = null; PB.save(); viewHero(); } })]));
    PB.setView([wrap], 'hero');
    window.scrollTo(0, 0);
  }

  function viewBoss(id) {
    const h = PB.h, r = R();
    buildBosses();
    const b = BOSSES.find(function (x) { return x.id === id; });
    if (!b || !r.cls || !(bossReady(b) || r.defeated[b.id])) { location.hash = '#hero'; return; }
    const st = stats();
    const atkAttr = st.attrs[b.subject];
    const fight = { hp: st.maxHp, bhp: b.hp, turn: 0, log: [], potions: 0, over: false, inst: null };
    const wrap = h('div', { class: 'wrap' });
    const arena = h('section', { class: 'battle subj-' + b.subject });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#hero">Hero</a> · ' + PB.subject(b.subject).name + ' · ' + b.part }));
    wrap.appendChild(arena);
    function newQ() {
      const pool = b.chapters.reduce(function (a, c) { return a.concat(PB.drills[c.id] || []); }, []);
      const d = pool[Math.floor(Math.random() * pool.length)];
      const inst = d.gen(PB.rng((Math.random() * 4294967296) >>> 0)); inst.title = d.title; inst.ch = PB.chapter(d.chapter).title;
      fight.inst = inst;
    }
    function hit(ok) {
      fight.turn++;
      if (ok) {
        let dmg = 12 + 2 * atkAttr + st.dmg;
        if (r.cls === 'physicist') dmg *= 1.2;
        const crit = Math.random() < st.crit;
        if (crit) dmg *= 2;
        dmg = Math.round(dmg);
        fight.bhp -= dmg;
        fight.log.unshift((crit ? '💥 Critical! ' : '⚔ ') + 'You hit ' + b.name + ' for ' + dmg + '.');
      } else {
        const dmg = Math.max(4, b.atk + Math.floor(Math.random() * 5) - st.armour);
        fight.hp -= dmg;
        fight.log.unshift(b.icon + ' ' + b.name + ' strikes back for ' + dmg + '.');
      }
      if (st.regen && fight.hp > 0) fight.hp = Math.min(st.maxHp, fight.hp + st.regen);
      if (fight.bhp <= 0) win(); else if (fight.hp <= 0) lose(); else newQ();
      draw();
    }
    function win() {
      fight.over = 'win';
      const first = !r.defeated[b.id];
      const gold = first ? b.gold : Math.round(b.gold * 0.3);
      r.defeated[b.id] = r.defeated[b.id] || Date.now(); r.wins++;
      if (first) { r.trophies[b.id] = b.name.replace(/^The /, '') + ' Bane'; r.title = r.trophies[b.id]; }
      PB.save();
      addGold(gold, 'Defeated ' + b.name);
      if (first) PB.addXP(b.xp, 'Defeated ' + b.name);
      PB.emit({ type: 'loot', icon: b.icon, text: 'Defeated ' + b.name + (first ? ': title "' + r.trophies[b.id] + '"' : '') });
      PB.checkBadges(); PB.save();
      fight.reward = '◉ ' + gold + ' gold' + (first ? ' · ' + b.xp + ' XP · title "' + r.trophies[b.id] + '"' : ' (rematch)');
    }
    function lose() { fight.over = 'lose'; }
    function draw() {
      arena.innerHTML = '';
      arena.appendChild(h('div', { class: 'battle-top' }, [
        h('div', { class: 'fighter' }, [h('span', { class: 'fighter-ico', text: st.cls.icon }), h('b', { text: r.name || st.cls.name }), hpBar(fight.hp, st.maxHp, 'me')]),
        h('span', { class: 'vs', text: 'VS' }),
        h('div', { class: 'fighter boss' }, [h('span', { class: 'fighter-ico', text: b.icon }), h('b', { text: b.name }), hpBar(fight.bhp, b.hp, 'foe')])
      ]));
      if (fight.over) {
        arena.appendChild(h('div', { class: 'battle-end ' + fight.over }, [
          h('h2', { text: fight.over === 'win' ? 'Victory!' : 'Defeated' }),
          h('p', { text: fight.over === 'win' ? 'Won in ' + fight.turn + ' turns. ' + fight.reward : b.name + ' was too strong this time. Pass more chapters to raise your attributes, buy gear, or bring coffee.' }),
          h('div', { class: 'hero-cta' }, [h('a', { class: 'btn primary', href: '#hero', text: 'Back to the hero' }), h('button', { class: 'btn', type: 'button', text: 'Fight again', onclick: function () { viewBoss(id); } })])
        ]));
      } else {
        const q = fight.inst;
        const card = h('div', { class: 'battle-q' });
        card.appendChild(h('div', { class: 'eyebrow', text: 'Turn ' + (fight.turn + 1) + ' · ' + q.ch + ' · ' + q.title }));
        card.appendChild(h('div', { class: 'prob-q', html: q.q }));
        const input = h('input', { class: 'num-input', type: 'text', placeholder: 'Answer to attack' + (q.unit ? ' (' + q.unit + ')' : ''), autocomplete: 'off' });
        const fb = h('div', { class: 'feedback' });
        const go = function () { const ok = PB.drillOk(q, input.value); if (ok === null) { fb.textContent = 'Enter a number.'; return; } if (!ok) fight.log.unshift('✗ The answer was ' + PB.fmt(q.answer, 4) + (q.unit ? ' ' + q.unit : '') + '.'); hit(ok); };
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
        const r2 = R();
        card.appendChild(h('div', { class: 'answer-row' }, [input, h('button', { class: 'btn primary', type: 'button', text: '⚔ Attack', onclick: go }),
          h('button', { class: 'btn', type: 'button', disabled: !r2.potions || fight.hp >= st.maxHp, text: '☕ Coffee (' + r2.potions + ')', onclick: function () { r2.potions--; const heal = r.cls === 'chemist' ? 80 : 40; fight.hp = Math.min(st.maxHp, fight.hp + heal); fight.log.unshift('☕ You recover ' + heal + ' HP.'); PB.save(); draw(); } }),
          h('a', { class: 'btn ghost', href: '#hero', text: 'Flee' })]));
        card.appendChild(fb);
        arena.appendChild(card);
        PB.typeset(card);
        setTimeout(function () { input.focus(); }, 30);
      }
      const log = h('ul', { class: 'battle-log' });
      fight.log.slice(0, 6).forEach(function (l) { log.appendChild(h('li', { text: l })); });
      arena.appendChild(log);
    }
    newQ();
    PB.setView([wrap], 'hero');
    draw();
    window.scrollTo(0, 0);
  }

  PB.views = PB.views || {};
  PB.views.hero = viewHero;
  function registerBossViews() { buildBosses(); BOSSES.forEach(function (b) { PB.views['boss-' + b.id] = function () { viewBoss(b.id); }; }); }
  registerBossViews();
  window.addEventListener('hashchange', function () { /* new bosses after content loads */ if (!PB.views['boss-physics-0']) registerBossViews(); });

  // A compact hero strip on the dashboard.
  const prevHome = PB.homeExtras;
  PB.homeExtras = function (wrap) {
    if (prevHome) prevHome(wrap);
    const h = PB.h, r = R();
    buildBosses();
    const ready = BOSSES.filter(function (b) { return bossReady(b) && !r.defeated[b.id]; });
    const st = r.cls ? stats() : null;
    wrap.appendChild(h('a', { class: 'hero-strip', href: '#hero' }, [
      h('span', { class: 'class-ico', text: r.cls ? CLASSES[r.cls].icon : '🛡️' }),
      h('div', {}, [h('b', { text: r.cls ? (r.name || CLASSES[r.cls].name) + ' · ◉ ' + r.gold + ' gold · ' + st.maxHp + ' HP' : 'Create your hero' }),
        h('small', { text: r.cls ? (ready.length ? ready.length + ' boss' + (ready.length > 1 ? 'es are' : ' is') + ' waiting: ' + ready.map(function (b) { return b.name; }).slice(0, 2).join(', ') : Object.keys(r.defeated).length + ' of ' + BOSSES.length + ' unit bosses defeated') : 'Pick a class, earn gold from every problem, buy gear and fight the boss of each unit.' })]),
      h('span', { class: 'btn small primary', text: ready.length ? 'Fight' : 'Open' })
    ]));
  };
})();
