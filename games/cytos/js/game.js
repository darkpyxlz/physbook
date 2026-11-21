/* Cytos — core game: state, simulation, automation, replication (prestige), alleles, rendering and UI. */
'use strict';
(function () {
  const CY = window.CY;
  const $ = (s) => document.querySelector(s);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const TAU = Math.PI * 2;
  const SAVE_KEY = 'cytos-save-v2';
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  function fmt(n) {
    if (!isFinite(n)) return '∞';
    const a = Math.abs(n);
    if (a >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (a >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (a >= 1e4) return (n / 1e3).toFixed(1) + 'k';
    if (a >= 100) return Math.floor(n).toString();
    if (Number.isInteger(n)) return String(n);
    return n.toFixed(1);
  }
  function fmtTime(s) {
    s = Math.floor(s);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
  }
  function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  CY.fmt = fmt;

  /* =====================================================================
     STATE
     ===================================================================== */
  let S;
  CY.state = () => S;
  const UI = { tab: 'cell', rates: {}, last: {}, dirty: true, pointerDown: false, round: null, learnFilter: 'all' };

  function newMeta() {
    return {
      insight: 0, mutagen: 0, reps: 0, rolls: 0, objective: 0,
      genes: Object.fromEntries(CY.GENES.map((g) => [g.id, 0])),
      alleles: [null, null, null], pending: null,
      quiz: { items: {}, stats: { rounds: 0, answered: 0, correct: 0, bestStreak: 0, perfect: 0 } },
      totals: { time: 0, atp: 0, protein: 0, puzzles: 0, perfect: 0, mutagen: 0, insight: 0, fast: 0, golden: 0 },
      ach: {}, inspected: {}, maxZoom: 1, seenFluo: false,
      opts: { news: true, sound: true, stain: 'normal' }, savedAt: Date.now(),
    };
  }
  function newRun(meta) {
    return {
      v: 2, meta,
      time: 0,
      res: { atp: 25 + 20 * Math.min(meta.reps, 10), aa: 15, nuc: 15, mrna: Math.min(meta.reps, 3), protein: 6 * Math.min(meta.reps, 10) },
      b: { glut: 1, aat: 1, ent: 1, ribo: 1, mito: 0, receptor: 1, rer: 0, golgi: 0, perox: 0, lyso: 0 },
      resp: 0, lesions: [], virions: [], infections: [], signals: [],
      buffs: { insulin: 0, egf: 0, ifn: 0, famine: 0, hypoxia: 0, bloom: 0, frenzy: 0 },
      golden: null,
      auto: Object.fromEntries(Object.keys(CY.AUTO_TEXT).map((k) => [k, 0])),
      timers: { signal: 35, virus: meta.reps > 0 ? 200 : 330, event: 240, golden: 100, ach: 1 },
      flags: { translated: false, seenVirus: false },
      stats: { transcribed: 0, translated: 0, respired: 0, built: 0, signals: 0, repairs: 0, lesions: 0, viruses: 0, puzzles: 0, perfect: 0, atp: 0 },
    };
  }

  /* =====================================================================
     MODIFIERS
     ===================================================================== */
  const geneLv = (id) => S.meta.genes[id] || 0;
  function lociUnlocked() { return CY.LOCI.filter((l) => S.meta.reps >= l.unlock).length; }
  function allele(trait) {
    let s = 0;
    S.meta.alleles.forEach((a, i) => { if (a && i < lociUnlocked()) for (const t of a.traits) if (t.id === trait) s += t.v; });
    return s;
  }
  const am = (trait) => Math.max(0.1, 1 + allele(trait) / 100);
  const lineage = () => 1 + 0.12 * S.meta.reps;
  const achMult = () => 1 + 0.02 * Object.keys(S.meta.ach || {}).length;
  const lesionPenalty = () => Math.max(0.5, 1 - 0.05 * S.lesions.length) * Math.max(0.6, 1 - 0.08 * S.infections.length);
  function atpMult() { return lineage() * achMult() * lesionPenalty() * am('atp') * (1 + 0.15 * geneLv('hexokinase')); }
  function proteinMult() { return am('protein') * (1 + 0.15 * geneLv('codon')) * (S.buffs.egf > 0 ? 1.5 : 1) * lesionPenalty() * lineage() * achMult(); }
  function capOf(id) {
    let c = CY.RES_BY_ID[id].cap;
    if (id === 'atp') c += 60 * S.b.mito;
    if (id === 'nuc') c += 10;
    return c * am('cap') * (1 + 0.25 * S.meta.reps);
  }
  const room = (id) => Math.max(0, capOf(id) - S.res[id]);
  function add(id, n) {
    S.res[id] = clamp(S.res[id] + n, 0, capOf(id));
    if (id === 'atp' && n > 0) { S.stats.atp += n; S.meta.totals.atp += n; }
    if (id === 'protein' && n > 0) S.meta.totals.protein += n;
  }
  function rates() {
    const frenzy = S.buffs.frenzy > 0 ? 3 : 1;
    const glyco = (0.25 + 0.35 * S.b.glut) * (S.buffs.insulin > 0 ? 2 : 1) * (S.buffs.famine > 0 ? 0.4 : 1) * frenzy;
    const resp = S.resp > 0 && S.buffs.hypoxia <= 0 ? 2 * S.b.mito * frenzy : 0;
    const bloom = S.buffs.bloom > 0 ? 2 : 1;
    const drain = S.infections.length;
    return {
      atp: (glyco + resp) * atpMult(),
      aa: (0.1 + 0.2 * S.b.aat) * am('aa') * bloom * lineage(),
      nuc: (0.08 + 0.15 * S.b.ent) * am('nuc') * bloom * lineage(),
      protein: -0.05 * drain,
      glyco: glyco * atpMult(), resp: resp * atpMult(),
    };
  }
  CY.insightMult = () => (S ? am('insight') : 1);
  CY.addInsight = (n) => { S.meta.insight += n; S.meta.totals.insight += n; UI.dirty = true; };

  /* ---------- costs ---------- */
  function structCost(def) {
    const base = { glut: 1, aat: 1, ent: 1, ribo: 1, receptor: 1 }[def.id] || 0;
    const n = Math.max(0, S.b[def.id] - base);
    const disc = Math.pow(0.92, S.b.golgi) * Math.max(0.3, 1 - allele('build') / 100) * Math.pow(0.95, Math.max(0, geneLv('srp') - 1));
    const out = {};
    for (const k in def.cost) out[k] = Math.ceil(def.cost[k] * Math.pow(def.g, n) * disc);
    return out;
  }
  const geneCost = (g) => Math.ceil(g.cost * Math.pow(g.g, S.meta.genes[g.id]));
  const canAfford = (c) => Object.keys(c).every((k) => S.res[k] >= c[k] - 1e-9);
  const pay = (c) => { for (const k in c) S.res[k] = Math.max(0, S.res[k] - c[k]); };
  const refund = (c) => { for (const k in c) S.res[k] = Math.min(capOf(k), S.res[k] + c[k]); };
  const costHTML = (c) => Object.entries(c).map(([k, v]) => `<span class="cost ${S.res[k] >= v - 1e-9 ? '' : 'no'}">${CY.RES_BY_ID[k].icon} ${fmt(v)}</span>`).join(' ');

  const PROC = {
    transcribe: { cost: () => ({ atp: 4, nuc: 5 }) },
    translate: { cost: () => ({ mrna: 1, aa: 6, atp: 6 }) },
  };
  const mrnaYield = () => 2 * (1 + 0.2 * geneLv('chromatin')) * am('mrna');
  const proteinYield = () => 5 * (1 + 0.5 * (S.b.ribo - 1)) * (1 + 0.3 * S.b.rer) * proteinMult();
  const respDur = () => 60 * am('resp');
  const accuracy = (r) => (r.perfect ? (r.fast ? 1.8 : 1.5) : Math.max(0.5, 1 - 0.1 * r.mistakes - 0.1 * r.hints));

  function repReq() {
    const r = S.meta.reps;
    return {
      mito: 2 + Math.floor(r / 2), ribo: 3 + Math.floor(r / 3),
      cost: { protein: Math.round(30 * Math.pow(1.14, r)), nuc: Math.round(25 * Math.pow(1.12, r)), atp: Math.round(120 * Math.pow(1.15, r)) },
    };
  }
  function repReady() { const q = repReq(); return S.b.mito >= q.mito && S.b.ribo >= q.ribo && canAfford(q.cost); }
  function mutagenGain() {
    const base = 3 + Math.floor(S.stats.built / 4) + Math.floor(S.stats.perfect / 3) + Math.floor(S.meta.reps / 2);
    return Math.max(1, Math.round(base * am('mutagen')));
  }

  /* =====================================================================
     SIMULATION
     ===================================================================== */
  function step(dt, offline = false) {
    const r = rates();
    S.time += dt; S.meta.totals.time += dt;
    add('atp', r.atp * dt);
    add('aa', r.aa * dt);
    add('nuc', r.nuc * dt);
    if (r.protein) S.res.protein = Math.max(0, S.res.protein + r.protein * dt);
    if (S.resp > 0) S.resp = Math.max(0, S.resp - dt);
    for (const k in S.buffs) S.buffs[k] = Math.max(0, S.buffs[k] - dt);

    stepAuto(dt);
    if (offline) return;
    stepLesions(dt);
    stepSignals(dt);
    stepViruses(dt);
    stepEvents(dt);
    stepGolden(dt);
    S.timers.ach -= dt;
    if (S.timers.ach <= 0) { S.timers.ach = 1; checkAchievements(); }
    checkObjective();
  }

  /* ---------- lucky vesicles (golden-cookie style bonus) ---------- */
  function stepGolden(dt) {
    if (S.golden) {
      const g = S.golden; g.life -= dt; g.x += g.vx * dt; g.y += g.vy * dt;
      const d = Math.hypot(g.x, g.y); if (d > 0.82) { g.vx *= -1; g.vy *= -1; }
      if (g.life <= 0) S.golden = null;
      return;
    }
    S.timers.golden -= dt;
    if (S.timers.golden <= 0) {
      S.timers.golden = rand(100, 200);
      const a = rand(0, TAU), r = rand(0.45, 0.75);
      S.golden = { x: Math.cos(a) * r, y: Math.sin(a) * r, vx: rand(-0.02, 0.02), vy: rand(-0.02, 0.02), life: 14 };
    }
  }
  function catchGolden(x, y) {
    S.golden = null; S.meta.totals.golden++;
    spawnBurst(x, y, '#ffd54a', 30); CY.sfx('gold');
    const pool = [['frenzy', 30], ['protein', 25], ['mrna', 15], ['cleanse', S.lesions.length || S.infections.length ? 18 : 0], ['auto', 10], ['mutagen', S.meta.reps ? 4 : 0]];
    let tot = pool.reduce((a, p) => a + p[1], 0), r = Math.random() * tot, kind = 'frenzy';
    for (const [k, w] of pool) { r -= w; if (r <= 0) { kind = k; break; } }
    if (kind === 'frenzy') { S.buffs.frenzy = 30; toast('✨ <b>ATP frenzy!</b> Glycolysis and respiration ×3 for 30 s.', 'good'); }
    else if (kind === 'protein') { const y = proteinYield() * 2; add('protein', y); toast(`✨ <b>Protein windfall!</b> +${fmt(y)} protein.`, 'good'); }
    else if (kind === 'mrna') { add('mrna', 3); add('nuc', 15); toast('✨ <b>Transcription burst!</b> +3 mRNA, +15 nucleotides.', 'good'); }
    else if (kind === 'cleanse') { const n = S.lesions.length + S.infections.length; S.lesions = []; S.infections = []; S.virions = []; toast(`✨ <b>Clean sweep!</b> ${n} lesions and infections cleared.`, 'good'); }
    else if (kind === 'auto') { for (const k in S.auto) S.auto[k] = 1e6; if (S.b.mito) S.resp = Math.min(300, S.resp + 30); toast('✨ <b>Gene surge!</b> All automation fires at once.', 'good'); }
    else if (kind === 'mutagen') { S.meta.mutagen += 1; S.meta.totals.mutagen += 1; toast('✨ <b>Lucky mutation!</b> +1 ☢ Mutagen.', 'good'); }
    UI.dirty = true;
  }

  /* ---------- achievements ---------- */
  function checkAchievements() {
    for (const a of CY.ACHIEVEMENTS) {
      if (S.meta.ach[a.id]) continue;
      let ok = false; try { ok = a.done(S); } catch (e) { ok = false; }
      if (ok) { S.meta.ach[a.id] = Date.now(); toast(`🏆 <b>Achievement:</b> ${a.icon} ${esc(a.name)} <small>(+2% production)</small>`, 'good'); CY.sfx('ach'); UI.dirty = true; }
    }
  }

  /* ---------- sound ---------- */
  let actx = null;
  CY.sfx = (type) => {
    if (!S || !S.meta.opts.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const T = { good: [660, 0.08, 'sine'], bad: [170, 0.14, 'square'], done: [700, 0.22, 'sine'], gold: [880, 0.35, 'triangle'], ach: [600, 0.4, 'triangle'], click: [480, 0.04, 'sine'] }[type] || [480, 0.04, 'sine'];
      const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime;
      o.type = T[2]; o.frequency.setValueAtTime(T[0], t0);
      if (type === 'done' || type === 'gold' || type === 'ach') o.frequency.exponentialRampToValueAtTime(T[0] * 1.6, t0 + T[1]);
      g.gain.setValueAtTime(type === 'bad' ? 0.03 : 0.06, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + T[1]);
      o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + T[1] + 0.02);
    } catch (e) { /* audio unavailable */ }
  };

  /* ---------- automation (genes) ---------- */
  function stepAuto(dt) {
    const speed = am('auto');
    for (const g of CY.GENES) {
      if (!g.auto) continue;
      const lv = geneLv(g.id);
      if (!lv) continue;
      const iv = CY.autoInterval(lv, speed);
      S.auto[g.auto] += dt;
      if (S.auto[g.auto] >= iv) {
        if (autoRun(g.auto)) S.auto[g.auto] = 0;
        else S.auto[g.auto] = iv; // wait until it can run
      }
    }
  }
  function autoRun(kind) {
    if (kind === 'transcribe') { const c = PROC.transcribe.cost(); if (!canAfford(c) || room('mrna') < 0.5) return false; pay(c); add('mrna', mrnaYield()); S.stats.transcribed++; return true; }
    if (kind === 'translate') { const c = PROC.translate.cost(); if (!canAfford(c) || room('protein') < 1) return false; pay(c); add('protein', proteinYield() * 0.75); S.stats.translated++; S.flags.translated = true; return true; }
    if (kind === 'respire') { if (!S.b.mito) return false; S.resp = Math.min(300, S.resp + 30 * am('resp')); return true; }
    if (kind === 'repair') { if (!S.lesions.length) return false; S.lesions.shift(); S.stats.repairs++; return true; }
    if (kind === 'virus') { if (S.infections.length) { S.infections.shift(); S.stats.viruses++; return true; } if (S.virions.length) { S.virions.shift(); S.stats.viruses++; return true; } return false; }
    if (kind === 'signal') { if (!S.signals.length) return false; completeSignal(S.signals.shift().type, 0.75); return true; }
    if (kind === 'build') {
      const opts = ['glut', 'aat', 'ent'].map((id) => CY.STRUCT_BY_ID[id]).sort((a, b) => structCost(a).protein - structCost(b).protein);
      const d = opts.find((x) => canAfford(structCost(x)));
      if (!d) return false;
      pay(structCost(d)); S.b[d.id]++; S.stats.built++; UI.dirty = true; return true;
    }
    return false;
  }

  /* ---------- DNA damage ---------- */
  function addLesion(type) {
    if (S.lesions.length >= 10) return;
    S.lesions.push({ type, u: rand(0.08, 0.92), side: Math.random() < 0.5 ? 0 : 1 });
    S.stats.lesions++;
    if (S.stats.lesions === 1) toast('🧨 Your DNA is damaged! Click the glowing lesion in the nucleus to repair it.', 'bad');
    UI.dirty = true;
  }
  function stepLesions(dt) {
    const respiring = S.resp > 0 && S.buffs.hypoxia <= 0;
    const rate = (0.0015 + (respiring ? 0.0035 * S.b.mito : 0)) * Math.pow(0.8, S.b.perox) * Math.max(0.1, 1 - allele('damage') / 100);
    if (Math.random() < rate * dt) addLesion(Math.random() < 0.06 ? pick(['dsb', 'dsb1']) : 'ox');
  }

  /* ---------- signals ---------- */
  function stepSignals(dt) {
    for (const s of S.signals) s.t -= dt;
    const n0 = S.signals.length;
    S.signals = S.signals.filter((s) => s.t > 0);
    if (S.signals.length !== n0) UI.dirty = true;
    S.timers.signal -= dt;
    if (S.timers.signal <= 0) {
      S.timers.signal = rand(70, 110) / (1 + 0.2 * (S.b.receptor - 1));
      if (S.signals.length < S.b.receptor) {
        const pool = ['insulin', 'insulin', 'egf', 'adrenaline'];
        if (S.flags.seenVirus) pool.push('ifn', S.infections.length ? 'ifn' : 'egf');
        const type = pick(pool);
        S.signals.push({ type, t: 50 });
        toast(`📡 ${CY.CASCADES[type].name} has bound a receptor — relay the signal!`);
        UI.dirty = true;
      }
    }
  }
  function completeSignal(type, mult = 1) {
    S.stats.signals++;
    const d = 90 * mult;
    if (type === 'insulin') S.buffs.insulin = Math.max(S.buffs.insulin, d);
    else if (type === 'egf') S.buffs.egf = Math.max(S.buffs.egf, d);
    else if (type === 'adrenaline') { add('atp', 40 * mult * lineage()); if (S.b.mito) S.resp = Math.min(300, S.resp + 30 * mult); }
    else if (type === 'ifn') { S.buffs.ifn = Math.max(S.buffs.ifn, d); S.virions = []; }
    UI.dirty = true;
  }

  /* ---------- viruses ---------- */
  const MAX_INF = 6;
  function stepViruses(dt) {
    S.timers.virus -= dt;
    if (S.timers.virus <= 0) {
      S.timers.virus = rand(70, 110) / (1 + 0.1 * S.meta.reps);
      spawnVirion();
      if (S.meta.reps >= 3 && Math.random() < 0.3) spawnVirion();
    }
    for (const v of S.virions) {
      v.d -= v.speed * dt; v.a += v.drift * dt; v.rot += dt;
      if (v.d <= 1.02) {
        v.gone = true;
        if (S.buffs.ifn > 0) continue;
        if (Math.random() < Math.min(0.75, 0.15 * S.b.lyso)) { S.stats.viruses++; toast('🟤 A lysosome digested an incoming virus.', 'good'); continue; }
        if (Math.random() < allele('virus') / 100) { S.stats.viruses++; continue; }
        if (S.infections.length >= MAX_INF) continue;
        S.infections.push(newInfection());
        toast('🦠 A virus got in! It is hijacking your ribosomes. Click it inside the cell to destroy it.', 'bad');
        UI.dirty = true;
      }
    }
    S.virions = S.virions.filter((v) => !v.gone);
    // innate immunity slowly clears infections on its own
    S.infections = S.infections.filter(() => Math.random() > 0.01 * dt);
    for (const inf of S.infections) {
      inf.t += dt; inf.wob += dt;
      if (inf.t >= 60) {
        inf.t = 0;
        spawnVirion(Math.atan2(inf.y, inf.x), 1.3);
        if (Math.random() < 0.2 && S.infections.length < MAX_INF) S.infections.push(newInfection());
      }
    }
  }
  function spawnVirion(a, d) {
    if (S.virions.length >= 12) return;
    if (!S.flags.seenVirus) { S.flags.seenVirus = true; toast('🦠 A virus is approaching! Click it before it reaches your membrane.', 'bad'); UI.dirty = true; }
    S.virions.push({ a: a ?? rand(0, TAU), d: d ?? 1.9, speed: rand(0.04, 0.06), drift: rand(-0.04, 0.04), rot: 0 });
  }
  function newInfection() { const a = rand(0, TAU), r = rand(0.45, 0.78); return { x: Math.cos(a) * r, y: Math.sin(a) * r, t: 0, wob: rand(0, 9) }; }

  /* ---------- events ---------- */
  const EVENTS = {
    uv: () => { addLesion('uv'); addLesion('uv'); toast('☀️ UV burst! Thymine dimers formed in your DNA.', 'bad'); },
    famine: () => { S.buffs.famine = 45; toast('🍂 Famine: glucose is scarce, glycolysis slows for 45 s.', 'bad'); },
    hypoxia: () => { S.buffs.hypoxia = 30; toast('🫧 Hypoxia: no oxygen — the ETC stalls for 30 s.', 'bad'); },
    bloom: () => { S.buffs.bloom = 40; toast('🌸 Nutrient bloom: amino-acid & nucleotide import ×2 for 40 s.', 'good'); },
  };
  function stepEvents(dt) {
    S.timers.event -= dt;
    if (S.timers.event <= 0) {
      S.timers.event = rand(120, 200);
      const pool = ['uv', 'bloom', 'famine'];
      if (S.b.mito) pool.push('hypoxia', 'uv');
      EVENTS[pick(pool)]();
      UI.dirty = true;
    }
  }

  /* ---------- objectives ---------- */
  function checkObjective() {
    const o = CY.OBJECTIVES[S.meta.objective];
    if (o && o.done(S)) { S.meta.objective++; toast(`🎯 Objective complete: ${o.text}`, 'good'); UI.dirty = true; }
  }

  /* =====================================================================
     ACTIONS (open puzzles)
     ===================================================================== */
  function puzzleDone(r) {
    S.stats.puzzles++; S.meta.totals.puzzles++;
    if (r.perfect) { S.stats.perfect++; S.meta.totals.perfect++; }
    if (r.fast) { S.meta.totals.fast++; toast('⚡ Speed bonus!', 'good'); }
    UI.dirty = true;
  }
  function runTranscribe() {
    const c = PROC.transcribe.cost();
    if (!canAfford(c)) return toast('Not enough resources to transcribe.', 'bad');
    pay(c);
    CY.openPuzzle(CY.PUZZLES.transcribe(), (r) => {
      puzzleDone(r); const y = mrnaYield() * (r.fast ? 2.5 : r.perfect ? 2 : 1);
      add('mrna', y); S.stats.transcribed++; toast(`📜 +${fmt(y)} mRNA${r.perfect ? ' (perfect: double!)' : ''}`, 'good');
    }, () => refund(c));
  }
  function runTranslate() {
    const c = PROC.translate.cost();
    if (!canAfford(c)) return toast('You need 1 mRNA, 6 amino acids and 6 ATP.', 'bad');
    pay(c);
    CY.openPuzzle(CY.PUZZLES.translate(), (r) => {
      puzzleDone(r); const y = proteinYield() * accuracy(r);
      add('protein', y); S.stats.translated++; S.flags.translated = true; toast(`🧶 +${fmt(y)} protein`, 'good');
    }, () => refund(c));
  }
  function runRespire() {
    if (!S.b.mito) return toast('Build a mitochondrion first.', 'bad');
    CY.openPuzzle(CY.PUZZLES.respire(), (r) => {
      puzzleDone(r); const d = respDur() * accuracy(r);
      S.resp = Math.min(300, S.resp + d); S.stats.respired++; toast(`🔋 Respiration running for ${Math.round(S.resp)} s`, 'good');
    });
  }
  function runBuild(id, quick) {
    const d = CY.STRUCT_BY_ID[id], c = structCost(d);
    if (!canAfford(c)) return toast('Not enough resources.', 'bad');
    pay(c);
    const finish = (r) => {
      S.b[id]++; S.stats.built++;
      if (r && r.perfect) { const back = { protein: Math.floor(c.protein * 0.25) }; refund(back); toast(`🏗 ${d.name} built! Perfect targeting refunded ${back.protein} protein.`, 'good'); }
      else toast(`🏗 ${d.name} built!`, 'good');
      if (W) { const p = organellePos(id, S.b[id] - 1); spawnBurst(p.x, p.y, '#2f8f83', 12); }
      UI.dirty = true;
    };
    if (quick) finish(null);
    else CY.openPuzzle(CY.PUZZLES.target(id), (r) => { puzzleDone(r); finish(r); }, () => refund(c));
  }
  function runSignal(i) {
    const s = S.signals[i]; if (!s) return;
    CY.openPuzzle(CY.PUZZLES.signal(s.type), (r) => {
      puzzleDone(r);
      const idx = S.signals.indexOf(s); if (idx >= 0) S.signals.splice(idx, 1);
      completeSignal(s.type, r.perfect ? 1.3 : 1);
      toast(`📡 ${CY.CASCADES[s.type].name}: ${CY.CASCADES[s.type].effect}`, 'good');
    });
  }
  function runRepair() {
    if (!S.lesions.length) return;
    const ls = S.lesions.slice(0, 3);
    CY.openPuzzle(CY.PUZZLES.repair(ls.map((l) => l.type)), (r) => {
      puzzleDone(r);
      S.lesions = S.lesions.filter((l) => !ls.includes(l));
      S.stats.repairs += ls.length; toast(`🛠 Repaired ${ls.length} lesion${ls.length > 1 ? 's' : ''}.`, 'good');
    });
  }
  function runReplicate() {
    if (!repReady()) return toast('Meet the requirements first.', 'bad');
    CY.openPuzzle(CY.PUZZLES.replicate(), (r1) => {
      puzzleDone(r1);
      CY.openPuzzle(CY.PUZZLES.mitosis(), (r2) => { puzzleDone(r2); replicate(r1.perfect && r2.perfect); });
    });
  }
  function replicate(perfect) {
    const q = repReq();
    if (!canAfford(q.cost)) return toast('You no longer have enough resources to divide.', 'bad');
    pay(q.cost);
    let gain = mutagenGain();
    if (perfect) gain += 1;
    const meta = S.meta;
    meta.reps++; meta.mutagen += gain; meta.totals.mutagen += gain;
    S = newRun(meta);
    UI.dirty = true;
    save();
    const newLocus = CY.LOCI.find((l) => l.unlock === meta.reps);
    showModal(`<h2>🧬 Division complete!</h2>
      <p>Your genome was copied and the cell split in two. A daughter cell carries on with everything you have evolved.</p>
      <ul><li>Replications: <b>${meta.reps}</b> · lineage bonus now <b>×${lineage().toFixed(2)}</b> to all production</li>
      <li>Mutagen earned: <b class="c-mut">+${gain} ☢</b>${perfect ? ' (includes +1 for a flawless division)' : ''}</li>
      ${newLocus ? `<li>New gene locus unlocked: <b>${newLocus.name}</b></li>` : ''}</ul>
      <p class="muted">Spend Mutagen in 🎲 Alleles to roll random gene variants. Good ones give big boosts; bad ones can hurt — you choose whether to keep them.</p>
      <div class="row center-row"><button class="btn primary" data-act="gotoAlleles">🎲 Roll alleles</button><button class="btn" data-act="closeModal">Continue</button></div>`);
  }

  /* ---------- alleles ---------- */
  const rollCost = () => 3;
  function makeAllele() {
    const tot = CY.RARITY.reduce((a, r) => a + r.w, 0);
    let x = Math.random() * tot, ri = 0;
    for (; ri < CY.RARITY.length - 1; ri++) { x -= CY.RARITY[ri].w; if (x <= 0) break; }
    const R = CY.RARITY[ri];
    const pool = CY.TRAITS.slice().sort(() => Math.random() - 0.5);
    const traits = pool.slice(0, R.traits).map((t, i) => {
      const neg = i > 0 && Math.random() < R.neg;
      const v = neg ? -Math.round(t.base * rand(0.5, 1.3)) : Math.round(t.base * R.mult * rand(0.6, 1.4));
      return { id: t.id, v };
    });
    const name = `${pick(CY.GENE_FAMILIES)}${1 + Math.floor(Math.random() * 9)}-${pick(CY.GREEK)}`;
    return { name, r: ri, traits };
  }
  function rollLocus(i) {
    if (i >= lociUnlocked()) return;
    if (S.meta.mutagen < rollCost()) return toast('Not enough Mutagen.', 'bad');
    S.meta.mutagen -= rollCost(); S.meta.rolls++;
    S.meta.pending = { locus: i, allele: makeAllele() };
    save();
    showRollModal();
  }
  function alleleCard(a, title) {
    if (!a) return `<div class="allele empty"><div class="al-title">${title}</div><div class="muted">— empty —</div></div>`;
    const R = CY.RARITY[a.r];
    return `<div class="allele" style="--rc:${R.c}"><div class="al-title">${title}</div><div class="al-name">${esc(a.name)}</div><div class="al-rar">${R.n}</div>
      <ul class="traits">${a.traits.map((t) => `<li class="${t.v >= 0 ? 'c-good' : 'c-bad'}">${t.v >= 0 ? '+' : '−'}${Math.abs(t.v)}% ${esc(CY.TRAIT_BY_ID[t.id].name)}</li>`).join('')}</ul></div>`;
  }
  function showRollModal() {
    const p = S.meta.pending; if (!p) return;
    const old = S.meta.alleles[p.locus];
    const R = CY.RARITY[p.allele.r];
    showModal(`<h2>🎲 ${CY.LOCI[p.locus].name}: a new allele!</h2>
      <div class="rarity-flash" style="--rc:${R.c}">${R.n}</div>
      <div class="compare">${alleleCard(old, 'Current')}<div class="vs">vs</div>${alleleCard(p.allele, 'New')}</div>
      <p class="muted center">Keep the gene you have, or replace it with the new variant? The one you do not choose is lost.</p>
      <div class="row center-row"><button class="btn" data-act="keepOld">Keep current</button><button class="btn primary" data-act="useNew">Equip new</button></div>`, true);
  }

  /* =====================================================================
     RENDERING (canvas) — zoomable, pannable "microscope" view
     ===================================================================== */
  let cv, ctx, W = 0, H = 0, DPR = 1;
  const particles = [];
  const cam = { x: 0, y: 0, z: 1 };
  const ZMIN = 0.7, ZMAX = 5;
  const PALS = {
    normal: {
      bg0: '#f4f8ff', bg1: '#e2eaf7', dust: 'rgba(59,95,184,0.08)', cyto0: '#fbfffe', cyto1: '#e4f3ee', mem: '#2f8f83', memBand: 'rgba(47,143,131,0.22)', memHead: '#3aa596',
      nuc0: '#f1ecff', nuc1: '#d8cbf6', nucEdge: '#7f72c8', chrom: 'rgba(104,84,186,0.28)', chromLine: 'rgba(104,84,186,0.35)', nucleolus: '#b6a2ea', pore: '#e4f3ee',
      mitoOut: '#f7c2b6', mitoMat: '#f39a88', mitoOn: '#f27b66', mitoEdge: '#b63c33', crista: '#c9483d', er: '#9db4ee', erLumen: '#dfe7fb', erRibo: '#3b5fb8',
      golgi: '#efbe62', golgiLumen: '#fbe7bb', lyso: '#d7c0a4', lysoEdge: '#7d522b', lysoGran: '#7d522b', perox: '#c7ead2', peroxEdge: '#1f8a5b', peroxCore: '#4f9d6c',
      ribo: '#3b5fb8', mt: 'rgba(110,130,180,0.20)', vesicle: '#9cc3e6', centriole: '#5a6aa0', text: '#1b2335', halo: 'rgba(255,255,255,0.85)', dna1: '#3b5fb8', dna2: '#d0467a',
      virus: '#f2a7a2', virusEdge: '#b63c33', rna: '#c2413b', glow: false,
    },
    fluo: {
      bg0: '#070a12', bg1: '#020306', dust: 'rgba(120,160,255,0.05)', cyto0: '#0c1322', cyto1: '#080d18', mem: 'rgba(120,255,210,0.75)', memBand: 'rgba(60,200,160,0.12)', memHead: '#6fffd2',
      nuc0: '#1a2a9a', nuc1: '#0d176a', nucEdge: '#4a6cff', chrom: 'rgba(110,140,255,0.55)', chromLine: 'rgba(120,150,255,0.6)', nucleolus: '#0a1150', pore: '#0c1322',
      mitoOut: '#7a0f24', mitoMat: '#d81e45', mitoOn: '#ff3b5c', mitoEdge: '#ff5c7a', crista: '#ff9aae', er: '#1fbf55', erLumen: '#0b3d1e', erRibo: '#7cffa4',
      golgi: '#ffb000', golgiLumen: '#5a3c00', lyso: '#c2009f', lysoEdge: '#ff3fe0', lysoGran: '#ff9cf0', perox: '#007f99', peroxEdge: '#00e5ff', peroxCore: '#8ff4ff',
      ribo: '#5cff95', mt: 'rgba(60,200,255,0.30)', vesicle: '#38d0ff', centriole: '#9fe8ff', text: '#e7ecfb', halo: 'rgba(0,0,0,0.75)', dna1: '#7d95ff', dna2: '#b9c6ff',
      virus: '#fff36b', virusEdge: '#fff9b8', rna: '#fff36b', glow: true,
    },
  };
  let P = PALS.normal;

  function setupCanvas() {
    cv = $('#cv'); ctx = cv.getContext('2d');
    new ResizeObserver(resize).observe(cv);
    setupCamera();
  }
  function resize() {
    const r = cv.getBoundingClientRect(); DPR = window.devicePixelRatio || 1;
    W = r.width; H = r.height; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
  }
  const G = { cx: 0, cy: 0, R: 0, k: 1 };
  const polar = (a, d) => ({ x: G.cx + Math.cos(a) * d * G.R, y: G.cy + Math.sin(a) * d * G.R });
  const memR = (a, t) => 1 + 0.012 * Math.sin(6 * a + t * 0.8) + 0.008 * Math.sin(11 * a - t * 1.3);
  const posCache = {};
  function organellePos(kind, i) {
    const key = kind + i;
    if (!posCache[key]) {
      const seed = kind.split('').reduce((a, c) => a + c.charCodeAt(0), 0) * 13 + i * 7.31;
      const ring = kind === 'golgi' ? [0.4, 0.5] : kind === 'ribo' ? [0.36, 0.86] : [0.44, 0.84];
      posCache[key] = { a: hash(seed) * TAU, d: ring[0] + hash(seed + 1.7) * (ring[1] - ring[0]), rot: hash(seed + 3.3) * TAU, v: hash(seed + 5.1) };
    }
    const p = posCache[key], t = performance.now() / 1000, w = 0.006 * Math.sin(t * 0.5 + p.rot * 3);
    const q = polar(p.a + w, p.d + w); q.rot = p.rot + 0.06 * Math.sin(t * 0.3 + p.a); q.v = p.v; return q;
  }
  function membraneSlots(kind) {
    const n = Math.min(S.b[kind], 40), off = { glut: 0.05, aat: 0.31, ent: 0.45, receptor: 0.75 }[kind] || 0;
    return Array.from({ length: n }, (_, i) => off + i * (TAU / Math.max(n, 6)) + hash(i * 3.1 + off * 10) * 0.2);
  }
  function spawnBurst(x, y, color, n) {
    for (let i = 0; i < n; i++) { const a = rand(0, TAU), s = rand(20, 70); particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.5, 1), max: 1, color, r: rand(1.5, 3) }); }
  }

  /* ---------- camera ---------- */
  const toWorld = (sx, sy) => ({ x: (sx - W / 2 - cam.x) / cam.z + W / 2, y: (sy - H / 2 - cam.y) / cam.z + H / 2 });
  const toScreen = (x, y) => ({ x: (x - W / 2) * cam.z + W / 2 + cam.x, y: (y - H / 2) * cam.z + H / 2 + cam.y });
  function clampCam() {
    cam.z = clamp(cam.z, ZMIN, ZMAX);
    const lim = (G.R || 200) * 1.15 * cam.z;
    cam.x = clamp(cam.x, -lim, lim); cam.y = clamp(cam.y, -lim, lim);
  }
  function zoomAt(sx, sy, f) {
    const w = toWorld(sx, sy);
    cam.z = clamp(cam.z * f, ZMIN, ZMAX);
    cam.x = sx - W / 2 - (w.x - W / 2) * cam.z; cam.y = sy - H / 2 - (w.y - H / 2) * cam.z;
    clampCam();
    if (S) S.meta.maxZoom = Math.max(S.meta.maxZoom || 1, cam.z);
  }
  CY.zoom = (f) => zoomAt(W / 2, H / 2, f);
  CY.zoomReset = () => { cam.x = 0; cam.y = 0; cam.z = 1; };
  const ptrs = new Map();
  let drag = null, pinch = null;
  function setupCamera() {
    const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    cv.addEventListener('pointerdown', (e) => {
      cv.setPointerCapture(e.pointerId);
      const p = pos(e); ptrs.set(e.pointerId, p);
      if (ptrs.size === 1) drag = { sx: p.x, sy: p.y, cx: cam.x, cy: cam.y, moved: false };
      else if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, z: cam.z }; drag = null; }
    });
    cv.addEventListener('pointermove', (e) => {
      const p = pos(e);
      if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, p);
      if (pinch && ptrs.size >= 2) {
        const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
        zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, (pinch.z * d / pinch.d) / cam.z); hideTip(); return;
      }
      if (drag) {
        const dx = p.x - drag.sx, dy = p.y - drag.sy;
        if (!drag.moved && Math.hypot(dx, dy) > 5) drag.moved = true;
        if (drag.moved) { cam.x = drag.cx + dx; cam.y = drag.cy + dy; clampCam(); cv.style.cursor = 'grabbing'; hideTip(); }
        return;
      }
      hover(p.x, p.y, e.clientX, e.clientY);
    });
    const end = (e) => {
      ptrs.delete(e.pointerId);
      if (pinch && ptrs.size < 2) { pinch = null; const rest = [...ptrs.values()][0]; drag = rest ? { sx: rest.x, sy: rest.y, cx: cam.x, cy: cam.y, moved: true } : null; return; }
      if (drag && ptrs.size === 0) { const p = pos(e); if (!drag.moved) canvasClick(p.x, p.y); drag = null; cv.style.cursor = ''; }
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', (e) => { ptrs.delete(e.pointerId); drag = null; pinch = null; });
    cv.addEventListener('wheel', (e) => { e.preventDefault(); const p = pos(e); zoomAt(p.x, p.y, Math.exp(-e.deltaY * 0.0015)); }, { passive: false });
    cv.addEventListener('dblclick', (e) => { const p = pos(e); zoomAt(p.x, p.y, 1.8); });
    cv.addEventListener('mouseleave', () => { UI.hover = null; hideTip(); });
  }

  /* ---------- drawing helpers ---------- */
  function hexPath(x, y, r, rot = 0) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = rot + i * TAU / 6; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); }
  function capsule(x, y, w, h) { const r = h / 2; ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(x + r, y + h); ctx.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); }
  function glow(color, blur) { if (P.glow) { ctx.shadowColor = color; ctx.shadowBlur = blur; } }
  function noGlow() { ctx.shadowBlur = 0; }
  function cellPath(off, t) {
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) { const a = i / 160 * TAU, rr = G.R * memR(a, t) + off; ctx.lineTo(G.cx + Math.cos(a) * rr, G.cy + Math.sin(a) * rr); }
    ctx.closePath();
  }
  const visible = (x, y, pad = 30) => { const s = toScreen(x, y); return s.x > -pad && s.y > -pad && s.x < W + pad && s.y < H + pad; };
  const labels = [];
  function label(x, y, text) { if (cam.z >= 1.9) labels.push({ x, y, text }); }
  function hit(h) { UI.hits.push(h); }
  // quadratic bezier point
  const qb = (a, c, b, u) => ({ x: (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * c.x + u * u * b.x, y: (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * c.y + u * u * b.y });

  function drawMito(p, i, on, t) {
    const k = G.k, len = (30 + p.v * 14) * k, wid = (12 + p.v * 3) * k;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    glow(P.mitoOn, on ? 14 : 4);
    capsule(-len / 2, -wid / 2, len, wid); ctx.fillStyle = P.mitoOut; ctx.fill();
    if (on && !P.glow) { ctx.shadowColor = P.mitoOn; ctx.shadowBlur = 8 + 4 * Math.sin(t * 4 + i); ctx.fill(); }
    noGlow();
    ctx.lineWidth = 1.2 * k; ctx.strokeStyle = P.mitoEdge; ctx.stroke();
    const ins = 2.2 * k;
    capsule(-len / 2 + ins, -wid / 2 + ins, len - 2 * ins, wid - 2 * ins); ctx.fillStyle = on ? P.mitoOn : P.mitoMat; ctx.fill();
    ctx.lineWidth = 0.8 * k; ctx.strokeStyle = P.mitoEdge; ctx.stroke();
    // cristae: folds of the inner membrane reaching in from alternating sides
    ctx.strokeStyle = P.crista; ctx.lineWidth = 1.5 * k; ctx.lineCap = 'round';
    const top = -wid / 2 + ins, bot = wid / 2 - ins, step = wid * 0.42;
    let side = 0;
    for (let x = -len / 2 + wid * 0.55; x < len / 2 - wid * 0.5; x += step, side ^= 1) {
      const y0 = side ? bot : top, y1 = y0 + (side ? -1 : 1) * (wid - 2 * ins) * 0.62;
      ctx.beginPath(); ctx.moveTo(x, y0); ctx.quadraticCurveTo(x + 1.5 * k, (y0 + y1) / 2, x, y1); ctx.stroke();
    }
    ctx.lineCap = 'butt';
    if (cam.z > 1.6) { ctx.fillStyle = P.mitoEdge; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc((hash(i * 9 + j) - 0.5) * len * 0.7, (hash(i * 7 + j) - 0.5) * wid * 0.5, 0.8 * k, 0, TAU); ctx.fill(); } }
    ctx.restore();
  }
  function drawGolgi(p) {
    const k = G.k;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    glow(P.golgi, 10);
    for (let j = 0; j < 5; j++) {
      const r = (14 + j * 3.6) * k, span = 1.25 - j * 0.12;
      ctx.beginPath(); ctx.arc(0, 18 * k, r, -Math.PI / 2 - span / 2, -Math.PI / 2 + span / 2);
      ctx.strokeStyle = P.golgi; ctx.lineWidth = 2.8 * k; ctx.lineCap = 'round'; ctx.stroke();
      ctx.strokeStyle = P.golgiLumen; ctx.lineWidth = 0.9 * k; ctx.stroke();
      for (const s of [-1, 1]) { const a = -Math.PI / 2 + s * span / 2; ctx.beginPath(); ctx.arc(Math.cos(a) * r, 18 * k + Math.sin(a) * r, 2 * k, 0, TAU); ctx.fillStyle = P.golgi; ctx.fill(); }
    }
    for (let j = 0; j < 4; j++) { const a = -Math.PI / 2 + (j - 1.5) * 0.35; ctx.beginPath(); ctx.arc(Math.cos(a) * 36 * k, 18 * k + Math.sin(a) * 36 * k, 1.9 * k, 0, TAU); ctx.fillStyle = P.golgi; ctx.fill(); }
    noGlow(); ctx.lineCap = 'butt';
    ctx.restore();
  }

  let lastFrame = performance.now();
  function render() {
    const now = performance.now(), fdt = Math.min(0.1, (now - lastFrame) / 1000); lastFrame = now;
    const t = now / 1000;
    if (UI.tab !== 'cell') return;
    if (!W) resize();
    if (!W) return;
    P = PALS[S.meta.opts.stain] || PALS.normal;
    G.cx = W / 2; G.cy = H / 2; G.R = Math.min(W, H) * 0.4; G.k = G.R / 250;
    const { cx, cy, R, k } = G, z = cam.z;
    UI.hits = []; labels.length = 0;
    // ---- background (screen space)
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const bg = ctx.createRadialGradient(W / 2 + cam.x, H / 2 + cam.y, R * 0.6 * z, W / 2, H / 2, Math.max(W, H) * 0.8);
    bg.addColorStop(0, P.bg0); bg.addColorStop(1, S.buffs.famine > 0 && !P.glow ? '#f6efe2' : S.buffs.hypoxia > 0 && !P.glow ? '#ece9f6' : P.bg1);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // ---- world space
    ctx.setTransform(DPR * z, 0, 0, DPR * z, DPR * (W / 2 + cam.x - W / 2 * z), DPR * (H / 2 + cam.y - H / 2 * z));
    for (let i = 0; i < 50; i++) {
      const x = (hash(i) * W * 1.6 - W * 0.3 + t * 3 * (0.5 + hash(i + 9))) % (W * 1.6) - W * 0.3, y = hash(i + 3) * H * 1.6 - H * 0.3 + Math.sin(t * 0.3 + i) * 8;
      ctx.fillStyle = P.dust; ctx.beginPath(); ctx.arc(x, y, (1 + hash(i + 5) * 2) * k, 0, TAU); ctx.fill();
    }
    // ---- cytoplasm
    cellPath(0, t);
    const cg = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
    cg.addColorStop(0, P.cyto0); cg.addColorStop(1, P.cyto1);
    ctx.fillStyle = cg; if (!P.glow) { ctx.shadowColor = 'rgba(30,60,110,.16)'; ctx.shadowBlur = 26; } ctx.fill(); noGlow();
    hit({ x: cx, y: cy, r: R, low: 1, tip: '<b>Cytoplasm</b> — cytosol packed with proteins, ribosomes and organelles.' });
    const nR = R * 0.27;
    // ---- cytoskeleton: microtubules from the centrosome
    const ca = -0.85, cpos = { x: cx + Math.cos(ca) * nR * 1.32, y: cy + Math.sin(ca) * nR * 1.32 };
    const mts = [];
    for (let i = 0; i < 22; i++) {
      const a = i / 22 * TAU + hash(i) * 0.15, end = polar(a, 0.9 + hash(i + 2) * 0.06);
      const ctl = { x: (cpos.x + end.x) / 2 + (hash(i + 4) - 0.5) * R * 0.35, y: (cpos.y + end.y) / 2 + (hash(i + 6) - 0.5) * R * 0.35 };
      mts.push([cpos, ctl, end]);
      ctx.beginPath(); ctx.moveTo(cpos.x, cpos.y); ctx.quadraticCurveTo(ctl.x, ctl.y, end.x, end.y);
      ctx.strokeStyle = P.mt; ctx.lineWidth = 1.2 * k / Math.sqrt(z); ctx.stroke();
    }
    hit({ x: mts[5][1].x, y: mts[5][1].y, r: 8 * k, info: 'mt', tip: '<b>Microtubule</b> — track for motor proteins.' });
    // ---- rough ER sheets around the nucleus
    for (let j = 0; j < Math.min(S.b.rer, 7); j++) {
      const rr = nR + (13 + j * 10) * k, a0 = hash(j * 9.1) * TAU, span = 1.3 + hash(j * 2.3) * 1.4;
      const pts = [];
      for (let i = 0; i <= 44; i++) { const a = a0 + span * i / 44, w = rr + 3 * k * Math.sin(i * 0.9 + t * 0.7 + j); pts.push({ x: cx + Math.cos(a) * w, y: cy + Math.sin(a) * w, a }); }
      ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      glow(P.er, 10); ctx.strokeStyle = P.er; ctx.lineWidth = 6 * k; ctx.lineCap = 'round'; ctx.stroke(); noGlow();
      ctx.strokeStyle = P.erLumen; ctx.lineWidth = 2.2 * k; ctx.stroke(); ctx.lineCap = 'butt';
      ctx.fillStyle = P.erRibo;
      for (let i = 1; i < pts.length; i += 2) for (const s of [-1, 1]) { const q = pts[i]; ctx.beginPath(); ctx.arc(q.x + Math.cos(q.a) * s * 4.2 * k, q.y + Math.sin(q.a) * s * 4.2 * k, 1.2 * k, 0, TAU); ctx.fill(); }
      const mid = pts[22]; hit({ x: mid.x, y: mid.y, r: 9 * k, info: 'rer', tip: '<b>Rough ER</b> — ribosome-studded sheets.' });
      if (j === 0) label(mid.x, mid.y - 9 * k, 'Rough ER');
    }
    // ---- nucleus
    ctx.beginPath(); ctx.arc(cx, cy, nR, 0, TAU);
    const ng = ctx.createRadialGradient(cx - nR * 0.3, cy - nR * 0.3, 2, cx, cy, nR);
    ng.addColorStop(0, P.nuc0); ng.addColorStop(1, P.nuc1);
    glow(P.nucEdge, 22); ctx.fillStyle = ng; ctx.fill(); noGlow();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, nR - 2 * k, 0, TAU); ctx.clip();
    ctx.fillStyle = P.chrom; // heterochromatin hugging the envelope
    for (let i = 0; i < 30; i++) { const a = i / 30 * TAU + hash(i) * 0.2, r = nR - (5 + hash(i + 1) * 7) * k; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, (4 + hash(i + 2) * 5) * k, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = P.chromLine; ctx.lineWidth = 1.1 * k; // euchromatin threads
    for (let i = 0; i < 9; i++) {
      const p0 = { x: cx + (hash(i + 20) - 0.5) * nR * 1.4, y: cy + (hash(i + 21) - 0.5) * nR * 1.4 };
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y);
      for (let j = 0; j < 3; j++) ctx.quadraticCurveTo(cx + (hash(i * 5 + j + 30) - 0.5) * nR * 1.5, cy + (hash(i * 5 + j + 40) - 0.5) * nR * 1.5, cx + (hash(i * 5 + j + 50) - 0.5) * nR * 1.4, cy + (hash(i * 5 + j + 60) - 0.5) * nR * 1.4);
      ctx.stroke();
    }
    ctx.restore();
    const nl = { x: cx + nR * 0.36, y: cy + nR * 0.4 };
    ctx.beginPath(); ctx.arc(nl.x, nl.y, nR * 0.2, 0, TAU); ctx.fillStyle = P.nucleolus; ctx.fill();
    ctx.fillStyle = P.chromLine; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(nl.x + (hash(i + 70) - 0.5) * nR * 0.3, nl.y + (hash(i + 80) - 0.5) * nR * 0.3, 1.1 * k, 0, TAU); ctx.fill(); }
    hit({ x: nl.x, y: nl.y, r: nR * 0.2, info: 'nucleolus', tip: '<b>Nucleolus</b> — ribosome factory.' }); label(nl.x, nl.y + nR * 0.2 + 8 * k, 'Nucleolus');
    // double envelope with pores
    ctx.strokeStyle = P.nucEdge; ctx.lineWidth = 1.6 * k; ctx.beginPath(); ctx.arc(cx, cy, nR, 0, TAU); ctx.stroke();
    ctx.lineWidth = 1 * k; ctx.beginPath(); ctx.arc(cx, cy, nR - 3 * k, 0, TAU); ctx.stroke();
    for (let i = 0; i < 22; i++) {
      const a = i / 22 * TAU + 0.1, px = cx + Math.cos(a) * (nR - 1.5 * k), py = cy + Math.sin(a) * (nR - 1.5 * k);
      ctx.save(); ctx.translate(px, py); ctx.rotate(a);
      ctx.fillStyle = P.pore; ctx.fillRect(-2.5 * k, -1.6 * k, 5 * k, 3.2 * k);
      ctx.fillStyle = P.nucEdge; ctx.fillRect(-2.5 * k, -2.4 * k, 1.3 * k, 4.8 * k); ctx.fillRect(1.2 * k, -2.4 * k, 1.3 * k, 4.8 * k);
      ctx.restore();
    }
    // the gene being read, with any DNA lesions
    const gx0 = cx - nR * 0.55, gx1 = cx + nR * 0.2, gy = cy - nR * 0.2;
    for (let s = 0; s < 2; s++) {
      ctx.beginPath();
      for (let i = 0; i <= 50; i++) { const u = i / 50; ctx.lineTo(gx0 + u * (gx1 - gx0), gy + Math.sin(u * 12 + t * 1.2 + s * Math.PI) * nR * 0.07); }
      ctx.strokeStyle = s ? P.dna2 : P.dna1; ctx.lineWidth = 1.8 * k; ctx.stroke();
    }
    hit({ x: cx, y: cy, r: nR, low: 2, info: 'nucleus', tip: `<b>Nucleus</b> — your genome. ${S.lesions.length} lesion(s). Click to inspect.` });
    hit({ x: (gx0 + gx1) / 2, y: gy, r: 10 * k, info: 'chromatin', tip: '<b>Chromatin</b> — an active gene being transcribed.' });
    label(cx, cy - nR - 10 * k, 'Nucleus');
    for (const L of S.lesions) {
      const x = gx0 + L.u * (gx1 - gx0), y = gy + Math.sin(L.u * 12 + t * 1.2 + L.side * Math.PI) * nR * 0.07;
      const col = CY.LESIONS[L.type].color, pr = (4.5 + 1.5 * Math.sin(t * 5)) * k;
      ctx.beginPath(); ctx.arc(x, y, pr + 5 * k, 0, TAU); ctx.fillStyle = col + '44'; ctx.fill();
      glow(col, 12); ctx.beginPath(); ctx.arc(x, y, pr, 0, TAU); ctx.fillStyle = col; ctx.fill(); noGlow();
      hit({ x, y, r: 11 * k, act: 'repair', tip: `<b>${CY.LESIONS[L.type].name}</b> — click to repair.` });
    }
    // ---- centrosome
    ctx.save(); ctx.translate(cpos.x, cpos.y);
    ctx.beginPath(); ctx.arc(0, 0, 9 * k, 0, TAU); ctx.fillStyle = P.mt; ctx.fill();
    ctx.fillStyle = P.centriole; ctx.fillRect(-5 * k, -1.8 * k, 10 * k, 3.6 * k); ctx.fillRect(-1.8 * k, -5 * k, 3.6 * k, 10 * k);
    ctx.restore();
    hit({ x: cpos.x, y: cpos.y, r: 9 * k, info: 'centrosome', tip: '<b>Centrosome</b> — organises microtubules.' }); label(cpos.x, cpos.y - 13 * k, 'Centrosome');
    // ---- organelles
    const respiring = S.resp > 0 && S.buffs.hypoxia <= 0;
    for (let i = 0; i < Math.min(S.b.golgi, 10); i++) {
      const p = organellePos('golgi', i); if (!visible(p.x, p.y)) continue;
      drawGolgi(p); hit({ x: p.x, y: p.y, r: 16 * k, info: 'golgi', tip: '<b>Golgi apparatus</b> — sorts and ships proteins.' });
      if (i === 0) label(p.x, p.y - 18 * k, 'Golgi');
    }
    for (let i = 0; i < Math.min(S.b.mito, 30); i++) {
      const p = organellePos('mito', i); if (!visible(p.x, p.y)) continue;
      drawMito(p, i, respiring, t);
      hit({ x: p.x, y: p.y, r: 16 * k, act: respiring ? null : 'respire', info: 'mito', tip: `<b>Mitochondrion</b> — ${respiring ? 'respiring. Click to inspect.' : 'idle. Click to run the ETC.'}` });
      if (i === 0) label(p.x, p.y - 14 * k, 'Mitochondrion');
    }
    for (let i = 0; i < Math.min(S.b.lyso, 20); i++) {
      const p = organellePos('lyso', i), r = (6.5 + p.v * 3) * k; if (!visible(p.x, p.y)) continue;
      glow(P.lysoEdge, 12); ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fillStyle = P.lyso; ctx.fill(); noGlow();
      ctx.strokeStyle = P.lysoEdge; ctx.lineWidth = 1.1 * k; ctx.stroke();
      ctx.fillStyle = P.lysoGran; for (let j = 0; j < 6; j++) { ctx.beginPath(); ctx.arc(p.x + (hash(i * 11 + j) - 0.5) * r * 1.1, p.y + (hash(i * 13 + j) - 0.5) * r * 1.1, (0.7 + hash(i + j) * 1.3) * k, 0, TAU); ctx.fill(); }
      hit({ x: p.x, y: p.y, r: r + 3, info: 'lyso', tip: '<b>Lysosome</b> — digests viruses.' }); if (i === 0) label(p.x, p.y - r - 6 * k, 'Lysosome');
    }
    for (let i = 0; i < Math.min(S.b.perox, 20); i++) {
      const p = organellePos('perox', i), r = (5.5 + p.v * 2) * k; if (!visible(p.x, p.y)) continue;
      glow(P.peroxEdge, 12); ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fillStyle = P.perox; ctx.fill(); noGlow();
      ctx.strokeStyle = P.peroxEdge; ctx.lineWidth = 1.1 * k; ctx.stroke();
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = P.peroxCore; ctx.fillRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.8); ctx.restore();
      hit({ x: p.x, y: p.y, r: r + 3, info: 'perox', tip: '<b>Peroxisome</b> — catalase removes H₂O₂.' }); if (i === 0) label(p.x, p.y - r - 6 * k, 'Peroxisome');
    }
    // polysomes: spirals of ribosomes on an mRNA
    for (let i = 0; i < Math.min(S.b.ribo, 40); i++) {
      const p = organellePos('ribo', i); if (!visible(p.x, p.y)) continue;
      ctx.fillStyle = P.ribo; glow(P.ribo, 6);
      for (let j = 0; j < 6; j++) { const a = p.rot + j * 1.05, rr = (2 + j * 1.4) * k; ctx.beginPath(); ctx.arc(p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr, 1.7 * k, 0, TAU); ctx.fill(); }
      noGlow();
      hit({ x: p.x, y: p.y, r: 9 * k, info: 'ribo', tip: `<b>Polysome</b> — ribosomes translating one mRNA. ${S.b.ribo} in total.` });
      if (i === 0) label(p.x, p.y - 11 * k, 'Polysome');
    }
    // vesicles riding microtubules
    for (let i = 0; i < 6 + Math.min(S.b.golgi * 2, 8); i++) {
      const m = mts[(i * 7) % mts.length], u = ((t * 0.04 * (0.6 + hash(i + 90))) + hash(i + 91)) % 1, uu = i % 2 ? u : 1 - u;
      const q = qb(m[0], m[1], m[2], 0.15 + uu * 0.75);
      glow(P.vesicle, 8); ctx.beginPath(); ctx.arc(q.x, q.y, 2.6 * k, 0, TAU); ctx.fillStyle = P.vesicle; ctx.fill(); noGlow();
      ctx.strokeStyle = P.mem; ctx.lineWidth = 0.6 * k; ctx.stroke();
      if (i === 0) hit({ x: q.x, y: q.y, r: 6 * k, info: 'vesicle', tip: '<b>Vesicle</b> — cargo on the move.' });
    }
    // ---- infections (viral RNA + assembling capsids)
    for (const inf of S.infections) {
      const x = cx + inf.x * R, y = cy + inf.y * R;
      ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; ctx.lineTo(x - 13 * k + u * 26 * k, y + Math.sin(u * 12 + t * 4 + inf.wob) * 4 * k); }
      glow(P.rna, 12); ctx.strokeStyle = P.rna; ctx.lineWidth = 2.4 * k; ctx.stroke(); noGlow();
      const n = Math.floor(inf.t / 60 * 4);
      for (let j = 0; j < n; j++) { hexPath(x - 12 * k + j * 8 * k, y - 10 * k, 3 * k); ctx.fillStyle = P.virus; ctx.fill(); ctx.strokeStyle = P.virusEdge; ctx.lineWidth = 0.8 * k; ctx.stroke(); }
      ctx.beginPath(); ctx.arc(x, y, 16 * k, -Math.PI / 2, -Math.PI / 2 + TAU * inf.t / 60); ctx.strokeStyle = 'rgba(194,65,59,.5)'; ctx.lineWidth = 2 * k; ctx.stroke();
      hit({ x, y, r: 16 * k, act: 'infection', obj: inf, tip: '<b>Viral genome</b> — hijacking your ribosomes. Click to destroy (4 ATP).' });
    }
    // ---- membrane: lipid bilayer
    cellPath(-2.5 * k, t); ctx.strokeStyle = P.memBand; ctx.lineWidth = 6 * k; ctx.stroke();
    glow(P.mem, 10);
    cellPath(0.5 * k, t); ctx.strokeStyle = P.mem; ctx.lineWidth = 1.3 * k; ctx.stroke();
    cellPath(-5.5 * k, t); ctx.lineWidth = 1 * k; ctx.stroke(); noGlow();
    if (z >= 1.6) { // phospholipid heads become visible
      ctx.fillStyle = P.memHead;
      const step = 3.4 * k / R;
      for (const off of [0.5 * k, -5.5 * k]) for (let a = 0; a < TAU; a += step) {
        const rr = R * memR(a, t) + off, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        if (!visible(x, y, 5)) continue;
        ctx.beginPath(); ctx.arc(x, y, 1.25 * k, 0, TAU); ctx.fill();
      }
    }
    { const p = polar(-Math.PI / 2, 1); label(p.x, p.y - 12 * k, 'Plasma membrane'); }
    // transmembrane proteins
    const tm = (kind, color, info, tip) => {
      membraneSlots(kind).forEach((a, i) => {
        const p = polar(a, memR(a, t)), q = { x: p.x - Math.cos(a) * 2.5 * k, y: p.y - Math.sin(a) * 2.5 * k };
        ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(a);
        glow(color, 8); ctx.fillStyle = color;
        capsule(-7 * k, -4.2 * k, 14 * k, 3.8 * k); ctx.fill(); capsule(-7 * k, 0.4 * k, 14 * k, 3.8 * k); ctx.fill(); noGlow();
        ctx.restore();
        hit({ x: q.x, y: q.y, r: 8 * k, info, tip });
        if (i === 0) label(q.x + Math.cos(a) * 16 * k, q.y + Math.sin(a) * 16 * k, CY.INFO[info].name);
      });
    };
    tm('glut', '#c98a10', 'glut', '<b>GLUT transporter</b> — lets glucose in.');
    tm('aat', '#8a45c2', 'aat', '<b>Amino-acid transporter</b>');
    tm('ent', '#d0467a', 'ent', '<b>Nucleoside transporter</b>');
    membraneSlots('receptor').forEach((a, i) => {
      const sig = S.signals[i], p = polar(a, memR(a, t));
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(a + Math.PI / 2);
      const col = sig ? CY.CASCADES[sig.type].color : '#2f8f5b';
      glow(col, 10); ctx.strokeStyle = col; ctx.lineWidth = 2.6 * k; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, 8 * k); ctx.lineTo(0, -5 * k); ctx.lineTo(-5 * k, -12 * k); ctx.moveTo(0, -5 * k); ctx.lineTo(5 * k, -12 * k); ctx.stroke(); noGlow(); ctx.lineCap = 'butt';
      if (sig) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -15 * k, (4 + Math.sin(t * 6)) * k, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(0, -15 * k, (11 + 3 * Math.sin(t * 6)) * k, 0, TAU); ctx.strokeStyle = col + '66'; ctx.lineWidth = 1.5 * k; ctx.stroke(); }
      ctx.restore();
      hit({ x: p.x, y: p.y, r: 14 * k, act: sig ? 'signal:' + i : null, info: 'receptor', tip: sig ? `<b>${CY.CASCADES[sig.type].name} bound!</b> Click to relay the signal.` : '<b>Receptor</b> — waiting for a ligand.' });
      if (i === 0) label(p.x + Math.cos(a) * 22 * k, p.y + Math.sin(a) * 22 * k, 'Receptor');
    });
    // ---- lucky vesicle
    if (S.golden) {
      const gv = S.golden, x = cx + gv.x * R, y = cy + gv.y * R, r = (8 + 1.5 * Math.sin(t * 5)) * k;
      const gg = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      gg.addColorStop(0, 'rgba(255,215,64,0.9)'); gg.addColorStop(0.35, 'rgba(255,190,40,0.45)'); gg.addColorStop(1, 'rgba(255,190,40,0)');
      ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, TAU); ctx.fill();
      ctx.save(); ctx.translate(x, y); ctx.rotate(t);
      ctx.strokeStyle = 'rgba(255,230,120,0.9)'; ctx.lineWidth = 1.4 * k;
      for (let i = 0; i < 8; i++) { const a = i * TAU / 8; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 1.2, Math.sin(a) * r * 1.2); ctx.lineTo(Math.cos(a) * r * 2, Math.sin(a) * r * 2); ctx.stroke(); }
      ctx.restore();
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#ffd54a'; ctx.fill(); ctx.strokeStyle = '#c98a10'; ctx.lineWidth = 1.5 * k; ctx.stroke();
      hit({ x, y, r: r * 2.2, act: 'golden', tip: '<b>✨ Lucky vesicle!</b> Click it before it fades.' });
    }
    // ---- virions outside
    for (const v of S.virions) {
      const p = polar(v.a, v.d), r = 9 * k;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(v.rot * 0.6);
      glow(P.virus, 12);
      ctx.strokeStyle = P.virusEdge; ctx.lineWidth = 1.3 * k;
      for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a) * (r + 5 * k), Math.sin(a) * (r + 5 * k)); ctx.stroke(); ctx.beginPath(); ctx.arc(Math.cos(a) * (r + 6 * k), Math.sin(a) * (r + 6 * k), 1.4 * k, 0, TAU); ctx.fillStyle = P.virusEdge; ctx.fill(); }
      hexPath(0, 0, r); ctx.fillStyle = P.virus; ctx.fill(); ctx.stroke(); noGlow();
      ctx.beginPath(); for (let i = 0; i < 6; i += 2) { const a = i * TAU / 6; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.lineWidth = 0.8 * k; ctx.stroke();
      ctx.restore();
      hit({ x: p.x, y: p.y, r: 17 * k, act: 'virion', obj: v, tip: '<b>Virus</b> — click to destroy it before it enters (1 ATP).' });
    }
    // ---- particles
    const rr = rates();
    if (particles.length < 160) {
      const gl = membraneSlots('glut');
      if (gl.length && Math.random() < rr.glyco * fdt * 0.7) {
        const a = pick(gl), p = polar(a, 1), q = polar(a + rand(-0.3, 0.3), rand(0.45, 0.8));
        particles.push({ x: p.x, y: p.y, vx: (q.x - p.x) * 0.5, vy: (q.y - p.y) * 0.5, life: 2, max: 2, color: '#c98a10', r: 2.4 * k, hex: true });
      }
      if (respiring && Math.random() < rr.resp * fdt * 0.6) {
        const p = organellePos('mito', Math.floor(Math.random() * Math.min(S.b.mito, 30))), a = rand(0, TAU);
        particles.push({ x: p.x, y: p.y, vx: Math.cos(a) * 25, vy: Math.sin(a) * 25, life: 1.2, max: 1.2, color: P.glow ? '#5fffe0' : '#1f9d8a', r: 2.2 * k });
      }
    }
    for (const p of particles) {
      p.x += p.vx * fdt; p.y += p.vy * fdt; p.life -= fdt;
      ctx.globalAlpha = clamp(p.life / p.max, 0, 1); ctx.fillStyle = p.color;
      if (p.hex) { hexPath(p.x, p.y, p.r + 1); ctx.fill(); } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
    for (let i = particles.length - 1; i >= 0; i--) if (particles[i].life <= 0) particles.splice(i, 1);
    // ---- labels (constant screen size)
    if (labels.length) {
      ctx.font = `600 ${11 / z}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      for (const L of labels) { ctx.lineWidth = 3 / z; ctx.strokeStyle = P.halo; ctx.strokeText(L.text, L.x, L.y); ctx.fillStyle = P.text; ctx.fillText(L.text, L.x, L.y); }
    }
    if (UI.hover) { ctx.beginPath(); ctx.arc(UI.hover.x, UI.hover.y, UI.hover.r + 2 / z, 0, TAU); ctx.strokeStyle = P.glow ? 'rgba(255,255,255,.6)' : 'rgba(27,35,53,.4)'; ctx.lineWidth = 1.2 / z; ctx.stroke(); }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const zl = $('#zoom-level'); if (zl) zl.textContent = `${(z * 400).toFixed(0)}×`;
  }

  function hitAt(sx, sy) {
    const w = toWorld(sx, sy);
    let best = null, bd = Infinity, low = null, lowRank = 0;
    for (const h of UI.hits || []) {
      const d = Math.hypot(h.x - w.x, h.y - w.y);
      if (d > Math.max(h.r, 7 / cam.z)) continue;
      if (h.low) { if (h.low > lowRank || !low) { low = h; lowRank = h.low; } continue; }
      const sc = d - (h.act ? 1000 : 0);
      if (sc < bd) { bd = sc; best = h; }
    }
    return best || low;
  }
  function canvasClick(sx, sy) {
    if (CY.puzzleOpen()) return;
    const h = hitAt(sx, sy); if (!h) return;
    if (!h.act) { if (h.info) showInspect(h.info); return; }
    if (h.act === 'virion') {
      if (S.res.atp < 1) return toast('Need 1 ATP.', 'bad');
      S.res.atp -= 1; S.virions = S.virions.filter((v) => v !== h.obj); S.stats.viruses++; spawnBurst(h.x, h.y, '#c2413b', 12); CY.sfx('click');
    } else if (h.act === 'infection') {
      if (S.res.atp < 4) return toast('Need 4 ATP.', 'bad');
      S.res.atp -= 4; S.infections = S.infections.filter((v) => v !== h.obj); S.stats.viruses++; spawnBurst(h.x, h.y, '#c2413b', 14); CY.sfx('click'); UI.dirty = true;
    } else if (h.act === 'golden') catchGolden(h.x, h.y);
    else if (h.act === 'repair') runRepair();
    else if (h.act === 'respire') runRespire();
    else if (h.act.startsWith('signal:')) runSignal(+h.act.split(':')[1]);
  }
  function hover(sx, sy, cxp, cyp) {
    const h = hitAt(sx, sy);
    UI.hover = h && !h.low ? h : null;
    cv.style.cursor = h && h.act ? 'pointer' : h && h.info ? 'help' : 'grab';
    if (h) showTip(h.tip + (h.act ? '' : h.info ? '<br><small class="muted">Click to inspect</small>' : ''), cxp, cyp); else hideTip();
  }
  function showInspect(key) {
    const I = CY.INFO[key]; if (!I) return;
    S.meta.inspected = S.meta.inspected || {}; S.meta.inspected[key] = true;
    const count = { mito: S.b.mito, ribo: S.b.ribo, rer: S.b.rer, golgi: S.b.golgi, lyso: S.b.lyso, perox: S.b.perox, glut: S.b.glut, aat: S.b.aat, ent: S.b.ent, receptor: S.b.receptor }[key];
    const el = $('#inspect');
    el.innerHTML = `<div class="row between"><b>${I.icon} ${esc(I.name)}</b><button class="btn sm" data-act="closeInspect">✕</button></div>
      ${I.size ? `<div class="muted small">📏 ${esc(I.size)}${count != null ? ` · you have ${count}` : ''}</div>` : count != null ? `<div class="muted small">You have ${count}</div>` : ''}
      <p>${esc(I.text)}</p><p class="fact">💡 ${esc(I.fact)}</p>`;
    el.hidden = false; CY.sfx('click');
  }

  /* =====================================================================
     UI
     ===================================================================== */
  const TABS = [['cell', '🧫 Cell'], ['genes', '🧬 Genes'], ['alleles', '🎲 Alleles'], ['school', '🧠 Cell School'], ['learning', '📈 Learning'], ['ach', '🏆 Achievements'], ['stats', '📊 Stats'], ['options', '⚙️ Options']];
  function renderTabs() {
    const due = CY.School.dueCount();
    $('#tabs').innerHTML = TABS.map(([id, l]) => {
      let badge = '';
      if (id === 'learning' && due) badge = `<span class="badge">${due}</span>`;
      if (id === 'alleles' && S.meta.mutagen >= rollCost() && lociUnlocked()) badge = '<span class="badge">!</span>';
      if (id === 'genes' && CY.GENES.some((g) => S.meta.genes[g.id] < g.max && S.meta.insight >= geneCost(g))) badge = '<span class="badge">!</span>';
      return `<button class="tab ${UI.tab === id ? 'on' : ''}" data-act="tab" data-t="${id}">${l}${badge}</button>`;
    }).join('');
  }
  function renderObjective() {
    const o = CY.OBJECTIVES[S.meta.objective];
    $('#goal').innerHTML = o ? `🎯 <b>Objective:</b> ${esc(o.text)} <span class="muted">— ${esc(o.hint)}</span>` : '🎯 <b>All objectives done!</b> Keep evolving your lineage.';
  }
  function renderHeader() {
    const r = rates().atp;
    $('#h-atp').textContent = fmt(S.res.atp) + ' ATP';
    $('#h-rate').textContent = `${r >= 0 ? '+' : ''}${r.toFixed(2)} ATP/s${S.resp > 0 ? ` · respiring ${Math.ceil(S.resp)} s` : ''}`;
    $('#h-insight').textContent = fmt(S.meta.insight);
    $('#h-mut').innerHTML = S.meta.reps > 0 || S.meta.mutagen > 0 ? ` · <b class="c-mut">${fmt(S.meta.mutagen)}</b> ☢ Mutagen · lineage ×${lineage().toFixed(2)}` : '';
  }

  function renderCellSide() {
    $('#res-chips').innerHTML = CY.RES.map((r) => {
      const v = S.res[r.id], c = capOf(r.id), rt = UI.rates[r.id] || 0;
      return `<div class="chip" data-tip="${esc(`<b>${r.name}</b><br>${r.tip}`)}"><span class="ci" style="color:${r.color}">${r.icon}</span><span class="cn">${r.name}</span>
        <span class="cv mono">${fmt(v)}<small>/${fmt(c)}</small></span>${Math.abs(rt) > 0.01 ? `<span class="cr mono ${rt > 0 ? 'c-good' : 'c-bad'}">${rt > 0 ? '+' : ''}${rt.toFixed(2)}/s</span>` : ''}
        <div class="cbar"><div style="width:${100 * v / c}%;background:${r.color}"></div></div></div>`;
    }).join('');
    const st = [];
    if (S.resp > 0) st.push(`<span class="tag good">🔋 Respiring ${Math.ceil(S.resp)} s</span>`);
    if (S.buffs.frenzy > 0) st.push(`<span class="tag good">✨ ATP frenzy ${Math.ceil(S.buffs.frenzy)} s</span>`);
    if (S.buffs.insulin > 0) st.push(`<span class="tag good">Insulin ${Math.ceil(S.buffs.insulin)} s</span>`);
    if (S.buffs.egf > 0) st.push(`<span class="tag good">EGF ${Math.ceil(S.buffs.egf)} s</span>`);
    if (S.buffs.ifn > 0) st.push(`<span class="tag good">Antiviral ${Math.ceil(S.buffs.ifn)} s</span>`);
    if (S.buffs.bloom > 0) st.push(`<span class="tag good">Bloom ${Math.ceil(S.buffs.bloom)} s</span>`);
    if (S.buffs.famine > 0) st.push(`<span class="tag bad">Famine ${Math.ceil(S.buffs.famine)} s</span>`);
    if (S.buffs.hypoxia > 0) st.push(`<span class="tag bad">Hypoxia ${Math.ceil(S.buffs.hypoxia)} s</span>`);
    if (S.lesions.length) st.push(`<span class="tag bad">${S.lesions.length} DNA lesion${S.lesions.length > 1 ? 's' : ''}</span>`);
    if (S.infections.length) st.push(`<span class="tag bad">${S.infections.length} infection${S.infections.length > 1 ? 's' : ''}</span>`);
    if (S.virions.length) st.push(`<span class="tag warn">${S.virions.length} virus${S.virions.length > 1 ? 'es' : ''} nearby</span>`);
    $('#status-tags').innerHTML = st.join('') || '<span class="muted">All quiet. Hover over anything in the cell to learn what it is.</span>';
  }

  function autoBar(kind) {
    const g = CY.GENES.find((x) => x.auto === kind), lv = geneLv(g.id);
    if (!lv) return `<div class="auto off">🔒 Automate with <b>${g.name}</b> (🧬 Genes)</div>`;
    const iv = CY.autoInterval(lv, am('auto'));
    return `<div class="auto"><span>⚙️ ${g.name} Lv ${lv} · every ${Math.round(iv)} s</span><div class="minibar"><div style="width:${100 * clamp(S.auto[kind] / iv, 0, 1)}%"></div></div></div>`;
  }
  function procCard(o) {
    return `<div class="proc ${o.cls || ''}"><div class="row between"><b>${o.icon} ${o.name}</b>${o.btn || ''}</div>
      <div class="note">${o.desc}</div>${o.io ? `<div class="io">${o.io}</div>` : ''}${o.extra || ''}${o.auto ? autoBar(o.auto) : ''}</div>`;
  }
  function renderProcesses() {
    const tc = PROC.transcribe.cost(), lc = PROC.translate.cost();
    const out = [];
    out.push(procCard({ icon: '📜', name: 'Transcription', desc: 'Express a gene: RNA polymerase copies DNA into mRNA in the nucleus.',
      io: `${costHTML(tc)} → <b>${fmt(mrnaYield())} 〰 mRNA</b> <small>(×2 if perfect)</small>`, auto: 'transcribe',
      btn: `<button class="btn primary" data-act="transcribe" ${canAfford(tc) ? '' : 'disabled'}>Transcribe</button>` }));
    out.push(procCard({ icon: '🧶', name: 'Translation', desc: 'Ribosomes read mRNA codons and link amino acids into protein.',
      io: `${costHTML(lc)} → <b>~${fmt(proteinYield())} ✦ protein</b> <small>(×1.5 if perfect)</small>`, auto: 'translate',
      btn: `<button class="btn primary" data-act="translate" ${canAfford(lc) ? '' : 'disabled'}>Translate</button>` }));
    if (S.b.mito || S.flags.translated) out.push(procCard({ icon: '🔋', name: 'Respiration (ETC)', desc: S.b.mito ? `Assemble the electron transport chain. While respiring, each mitochondrion makes +${fmt(2 * atpMult())} ATP/s.` : 'Build a mitochondrion first.',
      io: S.b.mito ? `→ <b>${Math.round(respDur())} s of respiration</b> <small>(×1.5 if perfect)</small>${S.resp > 0 ? ` · <span class="c-good">${Math.ceil(S.resp)} s left</span>` : ''}` : '', auto: 'respire',
      btn: `<button class="btn primary" data-act="respire" ${S.b.mito ? '' : 'disabled'}>Respire</button>` }));
    if (S.stats.signals || S.signals.length || S.time > 30) {
      const sigs = S.signals.map((s, i) => `<div class="row between sigrow"><span><b style="color:${CY.CASCADES[s.type].color}">${CY.CASCADES[s.type].name}</b> <small class="muted">${CY.CASCADES[s.type].effect} · fades in ${Math.ceil(s.t)} s</small></span><button class="btn sm primary" data-act="signal" data-i="${i}">Relay</button></div>`).join('');
      out.push(procCard({ icon: '📡', name: 'Signal transduction', desc: `Ligands bind your ${S.b.receptor} receptor${S.b.receptor > 1 ? 's' : ''}. Put each cascade in order to trigger its effect.`, extra: sigs || '<div class="muted small">Receptors are quiet…</div>', auto: 'signal' }));
    }
    if (S.stats.lesions || S.lesions.length) out.push(procCard({ icon: '🛠', name: 'DNA repair', cls: S.lesions.length ? 'warn' : '', desc: S.lesions.length ? `${S.lesions.length} lesion${S.lesions.length > 1 ? 's' : ''}: production −${Math.round(100 * (1 - Math.max(0.5, 1 - 0.05 * S.lesions.length)))}%. ROS from respiration and UV damage your DNA.` : 'Your genome is intact.',
      btn: `<button class="btn primary" data-act="repair" ${S.lesions.length ? '' : 'disabled'}>Repair</button>`, auto: 'repair' }));
    if (S.flags.seenVirus) out.push(procCard({ icon: '🦠', name: 'Antiviral defence', cls: S.infections.length ? 'warn' : '', desc: 'Click viruses outside the cell (1 ATP) or viral genomes inside (4 ATP). Lysosomes and interferon help.',
      extra: `<div class="small">${S.virions.length} approaching · ${S.infections.length} inside${S.infections.length ? ` (−${S.infections.length * 8}% production, stealing protein)` : ''}</div>`, auto: 'virus' }));
    const q = repReq();
    const req = [[S.b.mito >= q.mito, `${S.b.mito}/${q.mito} mitochondria`], [S.b.ribo >= q.ribo, `${S.b.ribo}/${q.ribo} ribosomes`],
      ...Object.entries(q.cost).map(([k, v]) => [S.res[k] >= v, `${fmt(S.res[k])}/${v} ${CY.RES_BY_ID[k].name}`])];
    out.push(procCard({ icon: '🧬', name: 'Replication & division', cls: 'rep ' + (repReady() ? 'ready' : ''), desc: `Copy your genome and divide. Resets this cell but earns <b class="c-mut">~${mutagenGain()} ☢ Mutagen</b> and a permanent lineage bonus.`,
      extra: `<ul class="reqs">${req.map(([ok, t]) => `<li class="${ok ? 'ok' : 'no'}">${t}</li>`).join('')}</ul>`,
      btn: `<button class="btn ${repReady() ? 'primary glow' : ''}" data-act="replicate" ${repReady() ? '' : 'disabled'}>Replicate</button>` }));
    $('#p-proc').innerHTML = `<h3>⚗️ Processes</h3>` + out.join('');
  }
  function renderBuild() {
    const quick = geneLv('srp') > 0;
    const vis = CY.STRUCTS.filter((d) => !d.unlock || d.unlock(S) || S.b[d.id] > 0);
    const list = vis.map((d) => {
      const c = structCost(d), ok = canAfford(c);
      return `<div class="bcard ${ok ? '' : 'cant'}" data-tip="${esc(`<b>${d.name}</b><br>${d.bio}`)}"><div class="row between"><b>${d.icon} ${d.name}</b><span class="tag">${S.b[d.id]}</span></div>
        <div class="note">${d.eff}</div><div class="row between"><span>${costHTML(c)}</span><span class="row">${quick ? `<button class="btn sm" data-act="quick" data-id="${d.id}" ${ok ? '' : 'disabled'}>⚡ Quick</button>` : ''}<button class="btn sm primary" data-act="build" data-id="${d.id}" ${ok ? '' : 'disabled'}>Build</button></span></div></div>`;
    }).join('');
    const hidden = CY.STRUCTS.length - vis.length;
    $('#p-build').innerHTML = `<h3>🏗 Build</h3><p class="note">Every new structure's protein must be sent to the right compartment.</p>${list}${hidden ? `<div class="muted small center">${hidden} more structure${hidden > 1 ? 's' : ''} unlock as your cell develops…</div>` : ''}${quick ? autoBar('build') : ''}`;
  }

  function renderGenes() {
    const cards = CY.GENES.map((g) => {
      const lv = S.meta.genes[g.id], max = lv >= g.max, c = geneCost(g), ok = S.meta.insight >= c;
      let eff;
      if (g.auto) eff = `${CY.AUTO_TEXT[g.auto]}${lv ? ` every <b>${Math.round(CY.autoInterval(lv, am('auto')))} s</b>` : ''}${!max ? ` → next level: every ${Math.round(CY.autoInterval(lv + 1, am('auto')))} s` : ''}`;
      else eff = `+${g.per}% ${{ atp: 'ATP production', protein: 'protein yield', mrna: 'mRNA yield' }[g.boost]} per level · now <b>+${g.per * lv}%</b>`;
      return `<div class="gcard ${max ? 'max' : ok ? '' : 'cant'}"><div class="row between"><b>${g.icon} ${g.name}</b><span class="tag">Lv ${lv}/${g.max}</span></div>
        <div class="note">${eff}</div><div class="note muted">${g.bio}</div>
        <button class="btn ${ok && !max ? 'primary' : ''}" data-act="gene" data-id="${g.id}" ${ok && !max ? '' : 'disabled'}>${max ? 'Maxed' : `Buy · ${c} 🧠`}</button></div>`;
    }).join('');
    return `<section class="panel"><h3>🧬 Genes <span class="spacer"></span><small>You have <b class="c-insight">${fmt(S.meta.insight)} 🧠 Insight</b></small></h3>
      <p class="note">Genes are permanent and survive replication. Regulatory genes <b>automate</b> processes — slowly at first, faster with every level. Insight comes only from 🧠 Cell School.</p>
      <div class="upggrid">${cards}</div></section>`;
  }

  function renderAlleles() {
    const nl = lociUnlocked();
    if (!nl) return `<section class="panel"><h3>🎲 Alleles</h3><p class="note">Locked. <b>Replicate</b> your cell once to earn Mutagen ☢ and unlock your first gene locus.</p>
      <p class="note">Each roll gives a random allele, from <b style="color:${CY.RARITY[0].c}">Common</b> to <b style="color:${CY.RARITY[4].c}">Legendary</b>. Alleles carry strong boosts — and sometimes harmful side-effects. You can always keep your old one.</p></section>`;
    const loci = CY.LOCI.map((L, i) => {
      if (i >= nl) return `<div class="locus locked"><h4>${L.name}</h4><p class="muted">Unlocks at ${L.unlock} replications</p></div>`;
      return `<div class="locus"><h4>${L.name}</h4>${alleleCard(S.meta.alleles[i], 'Equipped')}
        <button class="btn primary" data-act="roll" data-i="${i}" ${S.meta.mutagen >= rollCost() ? '' : 'disabled'}>🎲 Roll · ${rollCost()} ☢</button></div>`;
    }).join('');
    const tot = {};
    S.meta.alleles.forEach((a, i) => { if (a && i < nl) a.traits.forEach((t) => { tot[t.id] = (tot[t.id] || 0) + t.v; }); });
    const sum = Object.entries(tot).map(([k, v]) => `<span class="tag ${v >= 0 ? 'good' : 'bad'}">${v >= 0 ? '+' : '−'}${Math.abs(v)}% ${CY.TRAIT_BY_ID[k].name}</span>`).join(' ') || '<span class="muted">No alleles equipped yet.</span>';
    const odds = CY.RARITY.map((r) => `<span class="tag" style="color:${r.c};border-color:${r.c}">${r.n} ${r.w}% · ${r.traits} traits</span>`).join(' ');
    return `<section class="panel"><h3>🎲 Alleles <span class="spacer"></span><small>You have <b class="c-mut">${fmt(S.meta.mutagen)} ☢ Mutagen</b></small></h3>
      <p class="note">Each roll mutates a locus into a new random allele. Compare it with your current one, then keep the old or equip the new.</p>
      <div class="loci">${loci}</div><h4 style="margin-top:14px">Total allele effects</h4><div class="row wrap">${sum}</div>
      <h4 style="margin-top:14px">Rarity odds</h4><div class="row wrap">${odds}</div></section>`;
  }

  function renderStats() {
    const T = S.meta.totals, q = S.meta.quiz.stats;
    const row = (a, b) => `<tr><td>${a}</td><td class="mono">${b}</td></tr>`;
    return `<section class="panel"><h3>📊 Statistics</h3><table class="stats">
      ${row('This cell alive', fmtTime(S.time))}${row('Total play time', fmtTime(T.time))}${row('Replications', S.meta.reps)}${row('Lineage bonus', '×' + lineage().toFixed(2))}
      ${row('ATP made (this cell / all time)', fmt(S.stats.atp) + ' / ' + fmt(T.atp))}${row('Protein made (all time)', fmt(T.protein))}
      ${row('Structures built (this cell)', S.stats.built)}${row('Puzzles solved / perfect (all time)', T.puzzles + ' / ' + T.perfect)}
      ${row('Signals relayed / lesions repaired / viruses destroyed', `${S.stats.signals} / ${S.stats.repairs} / ${S.stats.viruses}`)}
      ${row('Cell School answers', `${q.correct}/${q.answered} correct · ${q.rounds} rounds · ${q.perfect} perfect`)}${row('Insight earned (all time)', fmt(T.insight))}
      ${row('Mutagen earned / alleles rolled', fmt(T.mutagen) + ' / ' + S.meta.rolls)}</table></section>`;
  }
  function renderAch() {
    const got = CY.ACHIEVEMENTS.filter((a) => S.meta.ach[a.id]).length;
    return `<section class="panel"><h3>🏆 Achievements <span class="spacer"></span><small>${got}/${CY.ACHIEVEMENTS.length} · bonus <b class="c-good">+${got * 2}%</b> ATP &amp; protein</small></h3>
      <div class="achgrid">${CY.ACHIEVEMENTS.map((a) => `<div class="ach ${S.meta.ach[a.id] ? 'got' : ''}"><div class="ai">${a.icon}</div><div><b>${esc(a.name)}</b><div class="note">${esc(a.desc)}</div></div></div>`).join('')}</div></section>`;
  }
  function renderOptions() {
    return `<section class="panel"><h3>⚙️ Options</h3><div class="row wrap">
      <button class="btn" data-act="save">💾 Save now</button><button class="btn" data-act="export">📤 Export save</button><button class="btn" data-act="import">📥 Import save</button>
      <button class="btn" data-act="toggleNews">${S.meta.opts.news ? '🗞 Hide' : '🗞 Show'} news ticker</button><button class="btn" data-act="toggleSound">${S.meta.opts.sound ? '🔇 Mute' : '🔊 Unmute'} sounds</button><button class="btn" data-act="help">❓ How to play</button>
      <button class="btn danger" data-act="wipe">🗑 Hard reset</button></div>
      <textarea id="savebox" class="savebox" placeholder="Exported save appears here — paste a save here and press Import."></textarea>
      <p class="note">The game auto-saves every 15 s. While you are away, your automation genes keep working for up to 8 hours.</p></section>`;
  }

  function renderView() {
    UI.dirty = false;
    renderTabs(); renderObjective();
    $('#view-cell').hidden = UI.tab !== 'cell';
    $('#view-other').hidden = UI.tab === 'cell';
    if (UI.tab === 'cell') { renderProcesses(); renderBuild(); renderCellSide(); return; }
    let html = '';
    if (UI.tab === 'genes') html = renderGenes();
    else if (UI.tab === 'alleles') html = renderAlleles();
    else if (UI.tab === 'school') html = UI.round ? CY.School.renderRound(UI.round) : CY.School.renderHome();
    else if (UI.tab === 'learning') html = CY.School.renderLearning(UI.learnFilter);
    else if (UI.tab === 'ach') html = renderAch();
    else if (UI.tab === 'stats') html = renderStats();
    else if (UI.tab === 'options') html = renderOptions();
    const keep = UI.tab === 'options' ? $('#savebox')?.value : null;
    $('#view-other').innerHTML = html;
    if (keep) $('#savebox').value = keep;
  }

  /* ---------- toasts, tooltips, modal ---------- */
  function toast(msg, cls = '') {
    const box = $('#toasts'); if (!box) return;
    const el = document.createElement('div');
    el.className = 'toast ' + cls; el.innerHTML = msg;
    box.appendChild(el);
    setTimeout(() => el.classList.add('out'), 4200);
    setTimeout(() => el.remove(), 4700);
    while (box.children.length > 5) box.firstChild.remove();
  }
  CY.toast = toast;
  function showTip(html, x, y) {
    const t = $('#tooltip'); t.innerHTML = html; t.hidden = false;
    let tx = x + 14, ty = y + 14;
    if (tx + t.offsetWidth > innerWidth - 8) tx = x - t.offsetWidth - 14;
    if (ty + t.offsetHeight > innerHeight - 8) ty = y - t.offsetHeight - 14;
    t.style.left = Math.max(4, tx) + 'px'; t.style.top = Math.max(4, ty) + 'px';
  }
  function hideTip() { $('#tooltip').hidden = true; }
  function showModal(html, sticky) { $('#modal').innerHTML = `<div class="modal-card">${html}</div>`; $('#modal').hidden = false; UI.modalSticky = !!sticky; }
  function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
  function showHelp() {
    showModal(`<h2>🧫 How to be a cell</h2><ul class="help">
      <li><b>Express your DNA.</b> <i>Transcribe</i> a gene into mRNA, then <i>translate</i> it into protein. Each one is a puzzle: drag the right molecules into place. Perfect answers give bonus yield.</li>
      <li><b>Build organelles.</b> Each new protein must be sent to the right compartment by its signal sequence. Transporters bring in nutrients, ribosomes make more protein, and mitochondria make ATP.</li>
      <li><b>Respire.</b> Assemble the electron transport chain to run your mitochondria for a while.</li>
      <li><b>Survive.</b> Relay signals from receptors, repair DNA lesions, and destroy viruses (click them in the cell).</li>
      <li><b>Learn.</b> 🧠 Cell School pays <b>Insight</b>, the only currency for 🧬 Genes. Genes automate processes, slowly at first.</li>
      <li><b>Replicate.</b> Copy your DNA and divide (~20 min the first time). You earn ☢ Mutagen to roll 🎲 Alleles: random gene variants with big boosts — and sometimes drawbacks. Keep the old one or equip the new.</li></ul>
      <p class="muted">Hover over anything for biology notes. Drag pieces with the mouse or a finger — or tap a piece, then tap a spot.</p>
      <div class="row center-row"><button class="btn primary" data-act="closeModal">Let’s go</button></div>`);
  }

  /* ---------- input ---------- */
  document.addEventListener('pointerdown', () => { UI.pointerDown = true; }, true);
  document.addEventListener('pointerup', () => { UI.pointerDown = false; }, true);
  document.addEventListener('mousemove', (ev) => {
    if (ev.target === cv) return;
    const t = ev.target.closest && ev.target.closest('[data-tip]');
    if (t) showTip(t.dataset.tip, ev.clientX, ev.clientY); else hideTip();
  });
  document.addEventListener('click', (ev) => {
    if (CY.puzzleOpen()) return;
    const b = ev.target.closest('[data-act]'); if (!b || b.disabled) return;
    const a = b.dataset.act, d = b.dataset;
    const A = {
      tab: () => { UI.tab = d.t; },
      transcribe: runTranscribe, translate: runTranslate, respire: runRespire, repair: runRepair, replicate: runReplicate,
      signal: () => runSignal(+d.i),
      build: () => runBuild(d.id, false), quick: () => runBuild(d.id, true),
      gene: () => { const g = CY.GENE_BY_ID[d.id], c = geneCost(g); if (S.meta.insight >= c && S.meta.genes[g.id] < g.max) { S.meta.insight -= c; S.meta.genes[g.id]++; toast(`🧬 ${g.name} → Lv ${S.meta.genes[g.id]}`, 'good'); } },
      roll: () => rollLocus(+d.i),
      keepOld: () => { S.meta.pending = null; closeModal(); toast('Kept your current allele.'); save(); },
      useNew: () => { const p = S.meta.pending; S.meta.alleles[p.locus] = p.allele; S.meta.pending = null; closeModal(); toast(`🧬 Equipped ${esc(p.allele.name)}!`, 'good'); save(); },
      gotoAlleles: () => { closeModal(); UI.tab = 'alleles'; },
      closeModal,
      school: () => { UI.round = CY.School.start(d.cat, d.due === '1'); if (!UI.round) toast('Nothing to review right now.', 'bad'); },
      schoolAns: () => { if (UI.round && !UI.round.last) CY.School.answer(UI.round, +d.o); },
      schoolNext: () => { CY.School.next(UI.round); },
      schoolQuit: () => { UI.round = null; },
      learnFilter: () => { UI.learnFilter = d.f; },
      save: () => { save(); toast('💾 Saved.', 'good'); },
      export: () => { save(); const s = btoa(unescape(encodeURIComponent(localStorage.getItem(SAVE_KEY)))); $('#savebox').value = s; navigator.clipboard?.writeText(s).then(() => toast('📋 Save copied to clipboard.', 'good')).catch(() => {}); },
      import: () => { try { const raw = decodeURIComponent(escape(atob($('#savebox').value.trim()))); JSON.parse(raw); localStorage.setItem(SAVE_KEY, raw); S = load(); toast('📥 Save imported.', 'good'); } catch (e) { toast('That does not look like a valid save.', 'bad'); } },
      toggleNews: () => { S.meta.opts.news = !S.meta.opts.news; $('#news').hidden = !S.meta.opts.news; },
      help: showHelp,
      toggleSound: () => { S.meta.opts.sound = !S.meta.opts.sound; },
      zoomIn: () => CY.zoom(1.5), zoomOut: () => CY.zoom(1 / 1.5), zoomReset: () => CY.zoomReset(),
      stain: () => { S.meta.opts.stain = S.meta.opts.stain === 'fluo' ? 'normal' : 'fluo'; if (S.meta.opts.stain === 'fluo') S.meta.seenFluo = true; $('#btn-stain').classList.toggle('on', S.meta.opts.stain === 'fluo'); },
      closeInspect: () => { $('#inspect').hidden = true; },
      wipe: () => showModal(`<h2>Hard reset?</h2><p>This deletes everything: your cell, genes, alleles and Cell School progress.</p><div class="row center-row"><button class="btn" data-act="closeModal">Cancel</button><button class="btn danger" data-act="wipeYes">Delete everything</button></div>`),
      wipeYes: () => { localStorage.removeItem(SAVE_KEY); S = newRun(newMeta()); closeModal(); UI.tab = 'cell'; UI.round = null; showHelp(); },
    };
    if (A[a]) { A[a](); UI.dirty = true; renderView(); renderHeader(); }
  });
  $('#modal').addEventListener('click', (ev) => { if (ev.target.id === 'modal' && !UI.modalSticky) closeModal(); });

  /* ---------- news ticker ---------- */
  function nextNews() {
    const el = $('#news-text'); if (!el) return;
    el.style.animation = 'none'; el.textContent = pick(CY.NEWS);
    void el.offsetWidth;
    el.style.animation = `ticker ${Math.max(18, el.textContent.length * 0.22)}s linear 1`;
  }

  /* ---------- save / load ---------- */
  function save() {
    try { S.meta.savedAt = Date.now(); localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY); if (!raw) return null;
      const d = JSON.parse(raw);
      const fresh = newMeta();
      const m = Object.assign(fresh, d.meta);
      m.genes = Object.assign(newMeta().genes, d.meta.genes);
      m.totals = Object.assign(newMeta().totals, d.meta.totals);
      m.quiz = Object.assign(newMeta().quiz, d.meta.quiz);
      m.opts = Object.assign(newMeta().opts, d.meta.opts);
      m.ach = Object.assign({}, d.meta.ach);
      const base = newRun(m);
      for (const k of Object.keys(base)) {
        if (k === 'meta' || d[k] === undefined) continue;
        if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) Object.assign(base[k], d[k]); else base[k] = d[k];
      }
      return base;
    } catch (e) { return null; }
  }
  function offline() {
    const away = Math.min(8 * 3600, (Date.now() - (S.meta.savedAt || Date.now())) / 1000);
    if (away < 60) return;
    const before = { ...S.res };
    for (let t = 0; t < away; t += 1) step(1, true);
    const gained = CY.RES.map((r) => [r, S.res[r.id] - before[r.id]]).filter(([, v]) => v > 0.5);
    toast(`⏰ Welcome back! You were away ${fmtTime(away)}.${gained.length ? ' ' + gained.map(([r, v]) => `+${fmt(v)} ${r.name}`).join(', ') : ''}`, 'good');
  }

  /* =====================================================================
     MAIN LOOP
     ===================================================================== */
  const TICK = 0.1;
  let acc = 0, uiAcc = 0, rateAcc = 0, saveAcc = 0, lastT = performance.now();
  function frame(now) {
    const dt = Math.min(0.5, (now - lastT) / 1000); lastT = now;
    acc += dt;
    while (acc >= TICK) { step(TICK); acc -= TICK; }
    rateAcc += dt;
    if (rateAcc >= 1) {
      for (const r of CY.RES) { const d = (S.res[r.id] - (UI.last[r.id] ?? S.res[r.id])) / rateAcc; UI.rates[r.id] = UI.rates[r.id] == null ? d : UI.rates[r.id] * 0.6 + d * 0.4; UI.last[r.id] = S.res[r.id]; }
      rateAcc = 0;
    }
    saveAcc += dt; if (saveAcc > 15) { save(); saveAcc = 0; }
    uiAcc += dt;
    if (uiAcc > 0.5 && !UI.pointerDown) {
      uiAcc = 0; renderHeader();
      if (UI.tab === 'cell' || UI.dirty) renderView();
    }
    render();
    requestAnimationFrame(frame);
  }

  function boot() {
    setupCanvas();
    S = load();
    const fresh = !S;
    if (fresh) S = newRun(newMeta()); else offline();
    $('#news').hidden = !S.meta.opts.news;
    $('#btn-stain').classList.toggle('on', S.meta.opts.stain === 'fluo');
    $('#news-text').addEventListener('animationend', nextNews);
    nextNews();
    renderView(); renderHeader();
    if (fresh) showHelp();
    if (S.meta.pending) showRollModal();
    window.addEventListener('beforeunload', save);
    requestAnimationFrame(frame);
  }
  // debug/test hooks
  CY.debug = { get S() { return S; }, step, rates, repReq, repReady, structCost, makeAllele, replicate, runTranscribe, runTranslate, runRespire, runBuild, runReplicate, runRepair, runSignal, rollLocus, mutagenGain, UI };
  boot();
})();
