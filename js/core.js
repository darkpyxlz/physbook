/* Physbook core: content registry, saved progress, scoring, levels, badges, answer parsing. */
(function () {
  'use strict';
  const PB = (window.PB = window.PB || {});
  PB.chapters = [];
  PB.sims = {};
  PB.R = String.raw;

  PB.addChapter = function (ch) {
    ch.problems = ch.problems || [];
    ch.problems.forEach(function (p, i) {
      p.chapter = ch.id;
      p.num = i + 1;
      p.id = ch.id + '-' + (i + 1);
      if (!p.points) p.points = { concept: 10, core: 20, olympiad: 40 }[p.level] || 10;
    });
    PB.chapters.push(ch);
    PB.chapters.sort(function (a, b) { return a.num - b.num; });
  };
  PB.chapter = function (id) { return PB.chapters.find(function (c) { return c.id === id; }); };
  PB.allProblems = function () { return PB.chapters.reduce(function (a, c) { return a.concat(c.problems); }, []); };
  PB.problem = function (pid) { return PB.allProblems().find(function (p) { return p.id === pid; }); };

  /* ---------- Saved progress ---------- */
  const KEY = 'physbook.progress.v1';
  function fresh() {
    return {
      xp: 0, solved: {}, attempts: {}, hints: {}, revealed: {}, read: {}, labs: {},
      streak: { last: null, count: 0, best: 0 }, badges: {}, dailyDone: {}, firstTryRun: 0,
      lastChapter: null, theme: null, created: Date.now()
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      return Object.assign(fresh(), JSON.parse(raw));
    } catch (e) { return fresh(); }
  }
  PB.S = load();
  PB.save = function () { try { localStorage.setItem(KEY, JSON.stringify(PB.S)); } catch (e) { /* storage unavailable */ } };
  PB.exportProgress = function () { return JSON.stringify(PB.S); };
  PB.importProgress = function (txt) {
    const obj = JSON.parse(txt);
    if (typeof obj !== 'object' || obj === null || typeof obj.xp !== 'number') throw new Error('That text is not a Physbook progress export.');
    PB.S = Object.assign(fresh(), obj); PB.save();
  };
  PB.resetProgress = function () { const t = PB.S.theme; PB.S = fresh(); PB.S.theme = t; PB.save(); };

  /* ---------- Events ---------- */
  const listeners = [];
  PB.on = function (fn) { listeners.push(fn); };
  PB.emit = function (ev) { listeners.forEach(function (fn) { try { fn(ev); } catch (e) { console.error(e); } }); };

  /* ---------- Dates & streak ---------- */
  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  PB.today = dayKey;
  function touchStreak() {
    const t = dayKey();
    const s = PB.S.streak;
    if (s.last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.count = s.last === dayKey(y) ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best || 0, s.count);
  }
  PB.streakAlive = function () {
    const s = PB.S.streak; if (!s.last) return 0;
    const y = new Date(); y.setDate(y.getDate() - 1);
    return (s.last === dayKey() || s.last === dayKey(y)) ? s.count : 0;
  };

  /* ---------- Levels ---------- */
  PB.LEVELS = [
    { xp: 0, title: 'Curious Observer' },
    { xp: 120, title: 'Lab Assistant' },
    { xp: 300, title: 'Free-Body Sketcher' },
    { xp: 600, title: 'Problem Solver' },
    { xp: 1000, title: 'Energy Accountant' },
    { xp: 1500, title: 'Field Theorist' },
    { xp: 2100, title: 'Regional Finalist' },
    { xp: 2800, title: 'National Squad' },
    { xp: 3600, title: 'Olympiad Medalist' },
    { xp: 4500, title: 'Gold Medalist' },
    { xp: 5500, title: 'Absolute Champion' }
  ];
  PB.levelInfo = function (xp) {
    xp = xp == null ? PB.S.xp : xp;
    let i = 0;
    while (i + 1 < PB.LEVELS.length && xp >= PB.LEVELS[i + 1].xp) i++;
    const cur = PB.LEVELS[i], nxt = PB.LEVELS[i + 1];
    const frac = nxt ? (xp - cur.xp) / (nxt.xp - cur.xp) : 1;
    return { level: i + 1, title: cur.title, next: nxt ? nxt.xp : null, frac: frac, floor: cur.xp };
  };

  /* ---------- Daily challenge ---------- */
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  PB.dailyProblem = function () {
    const all = PB.allProblems().filter(function (p) { return p.level !== 'concept'; });
    if (!all.length) return null;
    const t = dayKey();
    if (PB.S.daily && PB.S.daily.date === t) { const p = PB.problem(PB.S.daily.pid); if (p) return p; }
    const open = all.filter(function (p) { return !PB.S.solved[p.id] && !PB.S.revealed[p.id]; });
    const pool = open.length ? open : all;
    const p = pool[hash(t) % pool.length];
    PB.S.daily = { date: t, pid: p.id }; PB.save();
    return p;
  };
  PB.isDaily = function (p) { return PB.S.daily && PB.S.daily.date === dayKey() && PB.S.daily.pid === p.id; };

  /* ---------- Scoring ---------- */
  PB.HINT_COST = 0.25;
  PB.wrongCost = function (p) { return p.type === 'num' ? 0.15 : (p.type === 'multi' ? 0.25 : 0.34); };
  PB.available = function (p) {
    let f = 1 - PB.HINT_COST * (PB.S.hints[p.id] || 0) - PB.wrongCost(p) * (PB.S.attempts[p.id] || 0);
    f = Math.max(f, 0.2);
    let pts = Math.round(p.points * f);
    if (PB.isDaily(p)) pts *= 2;
    return pts;
  };
  PB.status = function (p) {
    if (PB.S.solved[p.id]) return 'solved';
    if (PB.S.revealed[p.id]) return 'revealed';
    if (PB.S.attempts[p.id]) return 'tried';
    return 'open';
  };

  function addXP(n, reason) {
    const before = PB.levelInfo().level;
    PB.S.xp += n;
    const after = PB.levelInfo().level;
    PB.emit({ type: 'xp', amount: n, reason: reason });
    if (after > before) PB.emit({ type: 'levelup', level: after, title: PB.levelInfo().title });
  }

  PB.check = function (p, answer) {
    if (PB.S.solved[p.id] || PB.S.revealed[p.id]) return { done: true };
    let ok = false;
    if (p.type === 'mcq') ok = answer === p.answer;
    else if (p.type === 'multi') {
      const a = (answer || []).slice().sort().join(','), b = p.answer.slice().sort().join(',');
      ok = a === b;
    } else if (p.type === 'num') {
      const x = PB.parseNumber(answer);
      if (x === null || !isFinite(x)) return { invalid: true };
      const tol = p.tol != null ? p.tol : 0.02;
      const target = p.answer;
      ok = target === 0 ? Math.abs(x) <= (p.atol || 1e-6) : Math.abs(x - target) <= tol * Math.abs(target);
    }
    if (ok) {
      const pts = PB.available(p);
      const clean = !(PB.S.attempts[p.id]) && !(PB.S.hints[p.id]);
      PB.S.solved[p.id] = { pts: pts, at: Date.now(), clean: clean };
      PB.S.firstTryRun = clean ? (PB.S.firstTryRun || 0) + 1 : 0;
      if (PB.isDaily(p)) PB.S.dailyDone[dayKey()] = true;
      touchStreak();
      addXP(pts, 'Solved ' + p.id);
      PB.checkBadges();
      PB.save();
      return { ok: true, pts: pts, clean: clean };
    }
    PB.S.attempts[p.id] = (PB.S.attempts[p.id] || 0) + 1;
    PB.S.firstTryRun = 0;
    PB.save();
    return { ok: false };
  };
  PB.useHint = function (p) {
    const n = PB.S.hints[p.id] || 0;
    if (n >= (p.hints || []).length) return n;
    PB.S.hints[p.id] = n + 1; PB.save();
    return n + 1;
  };
  PB.reveal = function (p) {
    if (PB.S.solved[p.id]) return;
    PB.S.revealed[p.id] = true; PB.S.firstTryRun = 0; PB.save();
  };
  PB.markRead = function (chId, idx) {
    const k = chId + ':' + idx;
    if (PB.S.read[k]) return false;
    PB.S.read[k] = Date.now();
    PB.S.lastChapter = chId;
    touchStreak();
    addXP(5, 'Read a section');
    PB.checkBadges(); PB.save();
    return true;
  };
  PB.markLab = function (chId) {
    if (PB.S.labs[chId]) return false;
    PB.S.labs[chId] = Date.now();
    addXP(5, 'Explored a lab');
    PB.checkBadges(); PB.save();
    return true;
  };

  /* ---------- Chapter progress ---------- */
  PB.chapterStats = function (ch) {
    const probs = ch.problems;
    const solved = probs.filter(function (p) { return PB.S.solved[p.id]; });
    const byLevel = function (lv) {
      const all = probs.filter(function (p) { return p.level === lv; });
      return { total: all.length, solved: all.filter(function (p) { return PB.S.solved[p.id]; }).length };
    };
    const read = (ch.sections || []).filter(function (_, i) { return PB.S.read[ch.id + ':' + i]; }).length;
    const earned = solved.reduce(function (a, p) { return a + PB.S.solved[p.id].pts; }, 0);
    const possible = probs.reduce(function (a, p) { return a + p.points; }, 0);
    const c = byLevel('concept'), co = byLevel('core'), o = byLevel('olympiad');
    const stars = (c.total && c.solved === c.total ? 1 : 0) + (co.total && co.solved === co.total ? 1 : 0) + (o.total && o.solved === o.total ? 1 : 0);
    const units = probs.length + (ch.sections || []).length;
    const progress = units ? (solved.length + read) / units : 0;
    return { total: probs.length, solved: solved.length, read: read, sections: (ch.sections || []).length, earned: earned, possible: possible, stars: stars, progress: progress, concept: c, core: co, olympiad: o };
  };

  /* ---------- Badges ---------- */
  const solvedList = function () { return Object.keys(PB.S.solved).map(PB.problem).filter(Boolean); };
  const chaptersDone = function (ids) {
    return PB.chapters.filter(function (c) { return (!ids || ids.indexOf(c.num) >= 0) && c.problems.length && c.problems.every(function (p) { return PB.S.solved[p.id]; }); }).length;
  };
  PB.BADGES = [
    { id: 'first', mark: '1', name: 'First Contact', desc: 'Solve your first problem.', test: function () { return solvedList().length >= 1; } },
    { id: 'ten', mark: '10', name: 'Warming Up', desc: 'Solve 10 problems.', test: function () { return solvedList().length >= 10; } },
    { id: 'fifty', mark: '50', name: 'Problem Machine', desc: 'Solve 50 problems.', test: function () { return solvedList().length >= 50; } },
    { id: 'century', mark: '100', name: 'Centurion', desc: 'Solve 100 problems.', test: function () { return solvedList().length >= 100; } },
    { id: 'olymp1', mark: 'O', name: 'Olympiad Debut', desc: 'Solve an olympiad-level problem.', test: function () { return solvedList().some(function (p) { return p.level === 'olympiad'; }); } },
    { id: 'olymp10', mark: 'O10', name: 'Olympian', desc: 'Solve 10 olympiad-level problems.', test: function () { return solvedList().filter(function (p) { return p.level === 'olympiad'; }).length >= 10; } },
    { id: 'olympall', mark: 'Au', name: 'Gold Standard', desc: 'Solve every olympiad-level problem.', test: function () { const o = PB.allProblems().filter(function (p) { return p.level === 'olympiad'; }); return o.length > 0 && o.every(function (p) { return PB.S.solved[p.id]; }); } },
    { id: 'clean', mark: 'C', name: 'Clean Sheet', desc: 'Solve an olympiad problem first try, no hints.', test: function () { return solvedList().some(function (p) { return p.level === 'olympiad' && PB.S.solved[p.id].clean; }); } },
    { id: 'sharp', mark: '5x', name: 'Sharpshooter', desc: 'Five first-try solves in a row.', test: function () { return (PB.S.firstTryRun || 0) >= 5; } },
    { id: 'sniper', mark: '15x', name: 'Sniper', desc: 'Fifteen first-try solves in a row.', test: function () { return (PB.S.firstTryRun || 0) >= 15; } },
    { id: 'streak3', mark: '3d', name: 'Habit Forming', desc: 'Keep a 3-day streak.', test: function () { return (PB.S.streak.best || 0) >= 3; } },
    { id: 'streak7', mark: '7d', name: 'Week of Physics', desc: 'Keep a 7-day streak.', test: function () { return (PB.S.streak.best || 0) >= 7; } },
    { id: 'streak30', mark: '30d', name: 'Relentless', desc: 'Keep a 30-day streak.', test: function () { return (PB.S.streak.best || 0) >= 30; } },
    { id: 'daily5', mark: 'D5', name: 'Daily Devotee', desc: 'Complete 5 daily challenges.', test: function () { return Object.keys(PB.S.dailyDone).length >= 5; } },
    { id: 'reader', mark: 'R', name: 'Bookworm', desc: 'Read 25 sections.', test: function () { return Object.keys(PB.S.read).length >= 25; } },
    { id: 'readall', mark: 'R+', name: 'Cover to Cover', desc: 'Read every section in the book.', test: function () { const n = PB.chapters.reduce(function (a, c) { return a + (c.sections || []).length; }, 0); return n > 0 && Object.keys(PB.S.read).length >= n; } },
    { id: 'lab5', mark: 'L', name: 'Lab Rat', desc: 'Explore 5 labs.', test: function () { return Object.keys(PB.S.labs).length >= 5; } },
    { id: 'laball', mark: 'L+', name: 'Experimentalist', desc: 'Explore every lab.', test: function () { return PB.chapters.length > 0 && Object.keys(PB.S.labs).length >= PB.chapters.length; } },
    { id: 'chap1', mark: 'M', name: 'Chapter Master', desc: 'Solve every problem in one chapter.', test: function () { return chaptersDone() >= 1; } },
    { id: 'mech', mark: 'Fm', name: 'Mechanic', desc: 'Master every mechanics chapter (1–10).', test: function () { return chaptersDone([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 10; } },
    { id: 'thermo', mark: 'kT', name: 'Heat Engine', desc: 'Master both thermal chapters.', test: function () { return chaptersDone([11, 12]) === 2; } },
    { id: 'em', mark: 'EM', name: 'Maxwellian', desc: 'Master every electricity & magnetism chapter.', test: function () { return chaptersDone([13, 14, 15, 16]) === 4; } },
    { id: 'optics', mark: 'λ', name: 'Lens Crafter', desc: 'Master both optics chapters.', test: function () { return chaptersDone([17, 18]) === 2; } },
    { id: 'modern', mark: 'ħ', name: 'Quantum Leap', desc: 'Master every modern physics chapter.', test: function () { return chaptersDone([19, 20, 21]) === 3; } },
    { id: 'all', mark: '∞', name: 'Theory of Everything', desc: 'Solve every problem in the book.', test: function () { const a = PB.allProblems(); return a.length > 0 && a.every(function (p) { return PB.S.solved[p.id]; }); } }
  ];
  PB.checkBadges = function () {
    PB.BADGES.forEach(function (b) {
      if (!PB.S.badges[b.id] && b.test()) {
        PB.S.badges[b.id] = Date.now();
        PB.S.xp += 25;
        PB.emit({ type: 'badge', badge: b });
      }
    });
  };

  /* ---------- Number / expression parser ---------- */
  // Accepts 3.2e8, 3.2×10^8, 3.2 x 10^8, 2*pi*sqrt(2), 1/3, (4/3)pi, trailing units ("12 m/s").
  PB.parseNumber = function (input) {
    if (input == null) return null;
    let s = String(input).trim();
    if (!s) return null;
    s = s.replace(/[−–]/g, '-').replace(/[×·⋅]/g, '*').replace(/π/g, 'pi').replace(/√/g, 'sqrt')
      .replace(/(\d),(?=\d{3}\b)/g, '$1').replace(/(\d|\))\s*[xX]\s*10\s*\^/g, '$1*10^').replace(/\*\*/g, '^');
    const full = evalExpr(s);
    if (full !== null) return full;
    const m = s.match(/^\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?(?:\s*\*\s*10\s*\^\s*[-+]?\d+)?)\s*[a-zA-Z°%Ω].*$/);
    if (m) return evalExpr(m[1]);
    return null;
  };
  function evalExpr(src) {
    const toks = [];
    const re = /\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+(?:[eE][-+]?\d+)?)|([a-zA-Z_]+)|(\S))/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      if (m[0].trim() === '') break;
      if (m[1]) toks.push({ t: 'n', v: parseFloat(m[1]) });
      else if (m[2]) toks.push({ t: 'id', v: m[2].toLowerCase() });
      else toks.push({ t: 'op', v: m[3] });
    }
    let i = 0;
    const peek = function () { return toks[i]; };
    const FN = { sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs, asin: Math.asin, acos: Math.acos, atan: Math.atan };
    const CONST = { pi: Math.PI, e: Math.E };
    function expr() {
      let v = term();
      while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) { const o = toks[i++].v; const r = term(); v = o === '+' ? v + r : v - r; }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const t = peek();
        if (t && t.t === 'op' && (t.v === '*' || t.v === '/')) { i++; const r = unary(); v = t.v === '*' ? v * r : v / r; }
        else if (t && (t.t === 'id' || t.t === 'n' || (t.t === 'op' && t.v === '('))) { v = v * unary(); }
        else break;
      }
      return v;
    }
    function unary() {
      const t = peek();
      if (t && t.t === 'op' && (t.v === '-' || t.v === '+')) { i++; const v = unary(); return t.v === '-' ? -v : v; }
      return power();
    }
    function power() {
      const b = primary();
      const t = peek();
      if (t && t.t === 'op' && t.v === '^') { i++; return Math.pow(b, unary()); }
      return b;
    }
    function primary() {
      const t = toks[i++];
      if (!t) throw 0;
      if (t.t === 'n') return t.v;
      if (t.t === 'op' && t.v === '(') { const v = expr(); const c = toks[i++]; if (!c || c.v !== ')') throw 0; return v; }
      if (t.t === 'id') {
        if (FN[t.v]) { const c = toks[i++]; if (!c || c.v !== '(') throw 0; const v = expr(); const d = toks[i++]; if (!d || d.v !== ')') throw 0; return FN[t.v](v); }
        if (CONST[t.v] != null) return CONST[t.v];
      }
      throw 0;
    }
    try {
      const v = expr();
      if (i !== toks.length) return null;
      return typeof v === 'number' && isFinite(v) ? v : null;
    } catch (e) { return null; }
  }
  PB._eval = evalExpr;

  /* ---------- Formatting ---------- */
  PB.fmt = function (x, sig) {
    sig = sig || 3;
    if (x === 0) return '0';
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) { const e = Math.floor(Math.log10(a)); return (x / Math.pow(10, e)).toFixed(sig - 1) + 'e' + e; }
    return Number(x.toPrecision(sig)).toString();
  };
})();
