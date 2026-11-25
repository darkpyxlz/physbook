/* Scibook unified skill tree. One map of the whole platform, with maths at the centre: physics branches out
   from maths, chemistry and astronomy branch from physics, and biology grows out of chemistry.
   The units of the map are books (small modular courses of 2–7 modules), not five separate sciences.
   The dashboard is this tree: pick a book, see its modules and the next task for each, and go. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;

  /* ---------- Maths at the centre: physics now grows from maths ---------- */
  const extra = { 'toolkit': ['math-functions'], 'quantum': ['math-complex'], 'analytical': ['math-odes'], 'experimental': ['math-stats'], 'oscillations': ['math-derivatives'] };
  Object.keys(extra).forEach((k) => { PB.PREREQS[k] = (PB.PREREQS[k] || []).concat(extra[k].filter((x) => (PB.PREREQS[k] || []).indexOf(x) < 0)); });

  /* ---------- Books ---------- */
  const ICON = {
    'Precalculus': '📈', 'Calculus': '∫', 'Further Calculus': '∮', 'Linear Algebra and Statistics': '📊', 'Olympiad Foundations': '🧩', 'Olympiad Topics': '🏅',
    'physics/Foundations': '📏', 'Mechanics': '⚙️', 'Thermal Physics': '🔥', 'Electricity & Magnetism': '⚡', 'Optics': '🔍', 'Modern Physics': '⚛️', 'Olympiad Extensions': '🏆',
    'chemistry/Foundations': '⚗️', 'Physical Chemistry': '🌡️', 'Inorganic Chemistry': '🧪', 'Organic Chemistry': '⌬', 'Analysis': '🔬',
    'Cells and Molecules': '🧫', 'Genetics': '🧬', 'Physiology': '🫀', 'Diversity of Life': '🦋', 'Evolution and Ecology': '🌿',
    'The Sky': '🌌', 'The Solar System': '🪐', 'The Stars': '⭐', 'Galaxies and Cosmology': '🌀'
  };
  const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  PB.BOOKS = [];
  PB.SUBJECTS.forEach((sub) => sub.parts.forEach((part) => {
    const chs = PB.chaptersOf(sub.id).filter((c) => c.part === part);
    if (!chs.length) return;
    const b = { id: sub.id + '-' + slug(part), subject: sub.id, title: part === 'Foundations' ? sub.name + ' Foundations' : part, icon: ICON[sub.id + '/' + part] || ICON[part] || sub.mark, chapters: chs };
    chs.forEach((c, i) => { c.book = b.id; c.module = i + 1; });
    PB.BOOKS.push(b);
  }));
  PB.book = (id) => PB.BOOKS.find((b) => b.id === id);
  PB.bookOf = (ch) => PB.book(ch.book);
  PB.BOOKS.forEach((b) => {
    const pre = {};
    b.chapters.forEach((c) => (PB.PREREQS[c.id] || []).forEach((pid) => { const pc = PB.chapter(pid); if (pc && pc.book !== b.id) pre[pc.book] = 1; }));
    b.prereqs = Object.keys(pre);
  });
  function bookStats(b) {
    const n = b.chapters.length, passed = b.chapters.filter((c) => PB.isPassed(c)).length, open = b.chapters.filter((c) => PB.isUnlocked(c)).length;
    let prog = 0; b.chapters.forEach((c) => { prog += PB.chapterStats(c).progress || 0; });
    return { n: n, passed: passed, open: open, progress: prog / n };
  }
  PB.bookStats = bookStats;

  /* ---------- Grandfathering: a chapter you have already worked in stays open ---------- */
  const baseUnlocked = PB.isUnlocked;
  PB.isUnlocked = function (ch) {
    if (baseUnlocked(ch)) return true;
    const s = S();
    if (s.read && ch.sections.some((_, i) => s.read[ch.id + ':' + i])) return true;
    return ch.problems.some((p) => s.solved[p.id]);
  };

  /* ---------- Next tasks for a module ---------- */
  const LV = ['Not started', 'Attempted', 'Familiar', 'Proficient', 'Mastered'];
  function tasks(ch) {
    const s = S(), out = [];
    if (!PB.isUnlocked(ch)) {
      const miss = PB.missingPrereqs(ch);
      return [{ ico: '🔒', text: 'Locked: pass ' + miss.map((c) => c.title).slice(0, 2).join(' and ') + ' first (or test out)', href: '#ch-' + ch.id, locked: true }];
    }
    const i = ch.sections.findIndex((_, k) => !s.read[ch.id + ':' + k]);
    if (i >= 0) out.push({ ico: '📖', text: 'Read §' + (i + 1) + ': ' + ch.sections[i].title.replace(/<[^>]+>/g, ''), rw: '+5 XP', href: '#ch-' + ch.id, sec: i });
    const pr = s.predict && s.predict[ch.id];
    if (PB.PREDICT && PB.PREDICT[ch.id] && !(pr && pr.done)) out.push({ ico: '🎯', text: 'Predict, then test in the lab', rw: 'bet coins', href: '#ch-' + ch.id + '--lab' });
    const st = PB.chapterStats(ch);
    if (!PB.isPassed(ch)) out.push({ ico: '✏️', text: 'Pass it: ' + PB.passNeeds(ch).join(' and '), rw: 'unlocks the next', href: '#ch-' + ch.id + '--problems' });
    else if (st.solved < st.total) out.push({ ico: '✏️', text: 'Problems: ' + st.solved + ' / ' + st.total + ' solved', rw: 'cards drop', href: '#ch-' + ch.id + '--problems' });
    const L = PB.masteryLevel ? PB.masteryLevel(ch) : 0;
    if (L >= 3 && !(s.loop2 && s.loop2.crowns && s.loop2.crowns[ch.id])) out.push({ ico: '👑', text: 'Mastery challenge', rw: 'crown', href: '#challenge-' + ch.id });
    else if (L >= 1 && L < 3) out.push({ ico: '🎚️', text: 'Adaptive practice to reach Proficient', rw: 'mastery', href: '#adapt-' + ch.id });
    return out;
  }
  PB.moduleTasks = tasks;

  /* ---------- Layout: rings around maths ---------- */
  const R = { maths: 175, physics: 410, chemistry: 640, astronomy: 640, biology: 860 };
  const SECTOR = { maths: [-90, 270], physics: null, chemistry: [100, 175], astronomy: [-80, -10], biology: [105, 170] };
  const PHYS_ANGLE = { 'Foundations': 200, 'Mechanics': -55, 'Thermal Physics': 140, 'Electricity & Magnetism': 100, 'Optics': -15, 'Modern Physics': 30, 'Olympiad Extensions': 245 };
  function layout() {
    const pos = {};
    PB.SUBJECTS.forEach((sub) => {
      const bs = PB.BOOKS.filter((b) => b.subject === sub.id), r = R[sub.id];
      bs.forEach((b, i) => {
        let a;
        if (sub.id === 'physics') a = PHYS_ANGLE[b.title.replace('Physics Foundations', 'Foundations')] != null ? PHYS_ANGLE[b.title.replace('Physics Foundations', 'Foundations')] : i * 360 / bs.length;
        else if (sub.id === 'maths') a = -90 + i * 360 / bs.length;
        else { const s = SECTOR[sub.id]; a = bs.length > 1 ? s[0] + (s[1] - s[0]) * i / (bs.length - 1) : (s[0] + s[1]) / 2; }
        const t = a * Math.PI / 180;
        pos[b.id] = [r * Math.cos(t), r * Math.sin(t)];
      });
    });
    return pos;
  }
  const BRANCH = { maths: 'The centre: Maths', physics: 'First branch: Physics', chemistry: 'Branch from physics: Chemistry', astronomy: 'Branch from physics: Astronomy', biology: 'Branch from chemistry: Biology' };

  function svgTree(sel) {
    const pos = layout();
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    Object.values(pos).forEach((q) => { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
    x0 -= 130; y0 -= 90; x1 += 130; y1 += 170;
    let s = '<svg class="sk-svg" viewBox="' + x0.toFixed(0) + ' ' + y0.toFixed(0) + ' ' + (x1 - x0).toFixed(0) + ' ' + (y1 - y0).toFixed(0) + '" role="img" aria-label="Skill tree of books">';
    [R.maths, R.physics, R.chemistry, R.biology].forEach((r) => { s += '<circle cx="0" cy="0" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 10" opacity=".7"/>'; });
    s += '<circle cx="0" cy="0" r="70" fill="var(--s-maths)" opacity=".12"/><text x="0" y="14" text-anchor="middle" font-size="44" fill="var(--s-maths)" font-weight="700">∑</text>';
    PB.BOOKS.forEach((b) => b.prereqs.forEach((pid) => {
      const a = pos[pid], c = pos[b.id]; if (!a || !c) return;
      const mx = (a[0] + c[0]) / 2 * 0.86, my = (a[1] + c[1]) / 2 * 0.86;
      const lit = bookStats(PB.book(pid)).passed > 0;
      s += '<path d="M' + a[0].toFixed(0) + ' ' + a[1].toFixed(0) + ' Q' + mx.toFixed(0) + ' ' + my.toFixed(0) + ' ' + c[0].toFixed(0) + ' ' + c[1].toFixed(0) + '" fill="none" stroke="var(--s-' + b.subject + ')" stroke-width="' + (lit ? 5 : 2.5) + '" opacity="' + (lit ? 0.6 : 0.12) + '"/>';
    }));
    PB.BOOKS.forEach((b) => {
      const p = pos[b.id], st = bookStats(b), open = st.open > 0, r = 56, C = 2 * Math.PI * (r + 7), col = 'var(--s-' + b.subject + ')';
      const words = b.title.split(' '), lines = [];
      words.forEach((w) => { if (lines.length && (lines[lines.length - 1] + ' ' + w).length <= 14) lines[lines.length - 1] += ' ' + w; else lines.push(w); });
      s += '<a href="#home" class="sk-node' + (sel === b.id ? ' sel' : '') + (open ? '' : ' locked') + '" data-book="' + b.id + '" tabindex="0" role="button" aria-label="' + b.title + ', ' + PB.subject(b.subject).name + ', ' + st.passed + ' of ' + st.n + ' modules passed">' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r + 7) + '" fill="none" stroke="var(--line)" stroke-width="6"/>' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r + 7) + '" fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (C * st.progress).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 ' + p[0] + ' ' + p[1] + ')"/>' +
        '<circle class="sk-disc" cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + (open ? col : 'var(--surface-2)') + '" fill-opacity="' + (open ? (st.passed === st.n ? 1 : 0.85) : 1) + '" stroke="' + (sel === b.id ? 'var(--ink)' : 'none') + '" stroke-width="4"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 15) + '" text-anchor="middle" font-size="42" opacity="' + (open ? 1 : 0.35) + '">' + b.icon + '</text>' +
        (open ? '' : '<text x="' + (p[0] + 38) + '" y="' + (p[1] - 30) + '" text-anchor="middle" font-size="24">🔒</text>') +
        lines.map((l, i) => '<text class="sk-label" x="' + p[0] + '" y="' + (p[1] + r + 40 + i * 30) + '" text-anchor="middle" font-size="27" font-weight="700" fill="var(--ink)">' + l.replace(/&/g, '&amp;') + '</text>').join('') +
        '<text x="' + p[0] + '" y="' + (p[1] + r + 40 + lines.length * 30) + '" text-anchor="middle" font-size="22" fill="var(--ink-2)">' + st.passed + '/' + st.n + (st.passed === st.n ? ' ★' : '') + '</text></a>';
    });
    return s + '</svg>';
  }

  /* ---------- Book panel: modules and their next tasks ---------- */
  function bookPanel(b, full) {
    const st = bookStats(b), sub = PB.subject(b.subject);
    const box = h('section', { class: 'bk-panel subj-' + b.subject });
    box.appendChild(h('div', { class: 'bk-head' }, [
      h('span', { class: 'bk-ico', text: b.icon }),
      h('div', {}, [h('div', { class: 'eyebrow', text: sub.name + ' · ' + st.n + ' modules' + (b.prereqs.length ? ' · builds on ' + b.prereqs.map((x) => PB.book(x).title).join(', ') : ' · a starting point') }), h(full ? 'h1' : 'h2', { text: b.title }), h('div', { class: 'xpbar', html: '<span style="width:' + Math.round(st.progress * 100) + '%"></span>' }), h('small', { text: st.passed + ' of ' + st.n + ' passed · ' + Math.round(st.progress * 100) + '% complete' })]),
      full ? null : h('a', { class: 'btn small', href: '#book-' + b.id, text: 'Open book' })
    ]));
    const list = h('ol', { class: 'bk-mods' });
    b.chapters.forEach((c) => {
      const ts = tasks(c), L = PB.masteryLevel ? PB.masteryLevel(c) : 0, open = PB.isUnlocked(c);
      const li = h('li', { class: 'bk-mod' + (open ? '' : ' locked') + (PB.isPassed(c) ? ' passed' : '') });
      li.appendChild(h('div', { class: 'bk-mod-top' }, [
        h('span', { class: 'bk-num', text: String(c.module) }),
        h('a', { class: 'bk-title', href: '#ch-' + c.id, text: c.title }),
        h('span', { class: 'mlevel lv' + L, title: LV[L], html: '<span class="mlevel-dots">' + [1, 2, 3, 4].map((k) => '<i class="mlevel-dot' + (k <= L ? ' on' : '') + '"></i>').join('') + '</span>' + (L >= 4 ? ' ♛' : '') })
      ]));
      const tw = h('div', { class: 'bk-tasks' });
      ts.slice(0, full ? 4 : 3).forEach((t, k) => tw.appendChild(h('a', { class: 'bk-task' + (k === 0 && !t.locked ? ' first' : '') + (t.locked ? ' locked' : ''), href: t.href, onclick: t.sec != null ? () => { PB.pendingSection = t.sec; } : null }, [h('span', { text: t.ico }), h('span', { class: 'bk-task-t', text: t.text }), t.rw ? h('small', { text: t.rw }) : null])));
      if (!ts.length) tw.appendChild(h('span', { class: 'bk-task done', text: '✓ Everything done here' }));
      li.appendChild(tw);
      list.appendChild(li);
    });
    box.appendChild(list);
    return box;
  }

  /* ---------- Recommended tasks across the whole tree ---------- */
  function recommended() {
    const s = S(), out = [], seen = {};
    const push = (c) => { if (!c || seen[c.id] || !PB.isUnlocked(c)) return; const t = tasks(c)[0]; if (t && !t.locked) { seen[c.id] = 1; out.push([c, t]); } };
    if (s.lastChapter) push(PB.chapter(s.lastChapter));
    PB.chapters.filter((c) => !PB.isPassed(c) && PB.isUnlocked(c) && PB.chapterStats(c).progress > 0).forEach(push);
    PB.chapters.filter((c) => PB.isUnlocked(c) && !PB.isPassed(c)).forEach(push);
    return out.slice(0, 3);
  }

  /* ---------- Dashboard ---------- */
  function viewHome() {
    if (PB.syncGames) PB.syncGames();
    const s = S(), L = PB.levelInfo();
    if (!s.treeSel || !PB.book(s.treeSel)) { const c = s.lastChapter && PB.chapter(s.lastChapter); s.treeSel = c ? c.book : PB.BOOKS[0].id; }
    const wrap = h('div', { class: 'wrap-wide' });
    const nPass = PB.chapters.filter((c) => PB.isPassed(c)).length;
    wrap.appendChild(h('div', { class: 'sk-top' }, [
      h('div', {}, [h('div', { class: 'eyebrow', text: PB.BOOKS.length + ' books · ' + PB.chapters.length + ' modules · ' + nPass + ' passed · level ' + L.level + ' ' + L.title }), h('h1', { text: 'Your skill tree', style: 'margin-top:6px' }), h('p', { class: 'lede', text: 'One map of everything, with maths at the centre. Physics grows out of maths, chemistry and astronomy out of physics, and biology out of chemistry. Pick a book to see its modules and your next task in each.' })])
    ]));
    const rec = recommended();
    if (rec.length) {
      const r = h('div', { class: 'sk-rec' }, [h('div', { class: 'eyebrow', text: 'Up next for you' })]);
      rec.forEach(([c, t], k) => r.appendChild(h('a', { class: 'plan-row' + (k === 0 ? ' first' : ''), href: t.href, onclick: t.sec != null ? () => { PB.pendingSection = t.sec; } : null }, [h('span', { class: 'plan-ico', text: t.ico }), h('span', { class: 'plan-txt', html: '<b>' + PB.bookOf(c).title + ' · ' + c.title + '</b> — ' + t.text }), h('span', { class: 'plan-rw', text: t.rw || '' }), h('span', { class: 'plan-go', text: '→' })])));
      wrap.appendChild(r);
    }
    const tree = h('div', { class: 'sk-tree', html: svgTree(s.treeSel) });
    const list = h('div', { class: 'sk-list' });
    PB.SUBJECTS.forEach((sub) => {
      list.appendChild(h('div', { class: 'sk-ring-label subj-' + sub.id, text: BRANCH[sub.id] }));
      const row = h('div', { class: 'sk-chips' });
      PB.BOOKS.filter((b) => b.subject === sub.id).forEach((b) => { const st = bookStats(b); row.appendChild(h('button', { class: 'sk-chip subj-' + b.subject + (s.treeSel === b.id ? ' sel' : '') + (st.open ? '' : ' locked'), type: 'button', 'data-book': b.id }, [h('span', { text: st.open ? b.icon : '🔒' }), h('b', { text: b.title }), h('small', { text: st.passed + '/' + st.n })])); });
      list.appendChild(row);
    });
    const panel = h('div', { class: 'sk-panel' });
    panel.appendChild(bookPanel(PB.book(s.treeSel)));
    const grid = h('div', { class: 'sk-grid' }, [h('div', { class: 'sk-map' }, [tree, list]), panel]);
    wrap.appendChild(grid);
    const pick = (id) => {
      s.treeSel = id; PB.save();
      tree.innerHTML = svgTree(id);
      list.querySelectorAll('.sk-chip').forEach((x) => x.classList.toggle('sel', x.getAttribute('data-book') === id));
      panel.innerHTML = ''; panel.appendChild(bookPanel(PB.book(id)));
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    grid.addEventListener('click', (e) => { const n = e.target.closest && e.target.closest('[data-book]'); if (n && !e.target.closest('.sk-panel')) { e.preventDefault(); pick(n.getAttribute('data-book')); } });
    grid.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const n = e.target.closest && e.target.closest('.sk-node'); if (n) { e.preventDefault(); pick(n.getAttribute('data-book')); } });
    if (PB.homeTop) PB.homeTop(wrap);
    const dp = PB.dailyProblem && PB.dailyProblem();
    if (dp) {
      const dch = PB.chapter(dp.chapter), done = s.solved[dp.id];
      wrap.appendChild(h('section', { class: 'daily' }, [
        h('div', { class: 'daily-badge', html: '<b>×2</b>points' }),
        h('div', {}, [h('div', { class: 'eyebrow', text: "Today's challenge · " + PB.bookOf(dch).title }), h('h3', { text: dch.title + ' · ' + (dp.title || 'Problem') }), h('p', { text: done ? 'Solved today. A new one tomorrow.' : dp.points * 2 + ' points while it lasts.' })]),
        h('a', { class: 'btn ' + (done ? '' : 'primary'), href: '#ch-' + dch.id + '--problems', text: done ? 'Review' : 'Take it on' })
      ]));
    }
    if (PB.homeExtras) PB.homeExtras(wrap);
    PB.setView([wrap], 'home');
  }

  /* ---------- Library and book pages ---------- */
  function viewLibrary() {
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: PB.BOOKS.length + ' books · ' + PB.chapters.length + ' modules' }));
    wrap.appendChild(h('h1', { text: '📚 Library', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every book is a short, self-contained course of a few modules. Books build on each other across the old subject lines: pick any book whose foundations you have.' }));
    PB.SUBJECTS.forEach((sub) => {
      wrap.appendChild(h('div', { class: 'part-label', text: BRANCH[sub.id] }));
      const g = h('div', { class: 'lib-grid' });
      PB.BOOKS.filter((b) => b.subject === sub.id).forEach((b) => {
        const st = bookStats(b);
        g.appendChild(h('a', { class: 'lib-book subj-' + b.subject + (st.open ? '' : ' locked'), href: '#book-' + b.id }, [
          h('span', { class: 'lib-spine' }), h('span', { class: 'bk-ico', text: st.open ? b.icon : '🔒' }),
          h('b', { text: b.title }), h('small', { text: st.n + ' modules · ' + st.passed + ' passed' }),
          h('div', { class: 'xpbar', html: '<span style="width:' + Math.round(st.progress * 100) + '%"></span>' }),
          h('ol', {}, b.chapters.map((c) => h('li', { text: c.title })))
        ]));
      });
      wrap.appendChild(g);
    });
    PB.setView([wrap], 'library');
  }
  function viewBook(id) {
    const b = PB.book(id); if (!b) { location.hash = '#library'; return; }
    S().treeSel = id; PB.save();
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#library">Library</a> · <a href="#home">Skill tree</a>' }));
    wrap.appendChild(bookPanel(b, true));
    const sub = PB.subject(b.subject);
    if (sub.game && PB.gameCard && b === PB.BOOKS.find((x) => x.subject === b.subject)) wrap.appendChild(PB.gameCard(sub));
    PB.setView([wrap], 'book-' + id);
    window.scrollTo(0, 0);
  }
  PB.views.home = viewHome;
  PB.views.tree = viewHome;
  PB.views.library = viewLibrary;
  PB.BOOKS.forEach((b) => { PB.views['book-' + b.id] = () => viewBook(b.id); });
  // Old subject pages now open the first book of that branch.
  PB.SUBJECTS.forEach((sub) => { PB.views[sub.id] = () => { const b = PB.BOOKS.find((x) => x.subject === sub.id); viewBook(b.id); }; });
})();
