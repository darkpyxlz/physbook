/* Scibook unified skill tree. One map of the whole platform, with maths at the centre: physics branches out
   from maths, chemistry and astronomy branch from physics, and biology grows out of chemistry.
   The units of the map are books (small modular courses of 2–7 modules), not five separate sciences.
   The dashboard is this tree: pick a book, see its modules and the next task for each, and go. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;

  /* ---------- Maths at the centre: physics now grows from maths ---------- */
  // Calculus-based physics: each physics module needs the maths it actually uses.
  const extra = {
    'toolkit': ['math-functions'],
    'kinematics': ['math-derivatives'],            // v = dx/dt, a = dv/dt
    'newton': ['math-derivatives'],
    'energy': ['math-integrals'],                  // W = ∫F·dx
    'momentum': ['math-integrals'],                // impulse = ∫F dt, centre of mass
    'rotation': ['math-integrals'],                // moments of inertia
    'gravitation': ['math-integrals'],             // potential energy and escape
    'fluids': ['math-integrals'],                  // pressure with depth
    'oscillations': ['math-odes'],                 // x'' + γx' + ω²x = F(t)
    'waves': ['math-multivar'],                    // the wave equation uses partial derivatives
    'thermodynamics': ['math-integrals'],          // W = ∫p dV, ΔS = ∫dQ/T
    'electrostatics': ['math-integrals'],          // fields of charge distributions, Gauss
    'circuits': ['math-odes'],                     // RC charging
    'magnetism': ['math-linear'],                  // cross products
    'induction': ['math-derivatives', 'math-complex'], // emf = −dΦ/dt, AC phasors
    'relativity': ['math-linear'],                 // Lorentz transformation as a matrix
    'quantum': ['math-complex', 'math-odes'],      // the Schrödinger equation
    'analytical': ['math-odes', 'math-multivar'],  // Lagrangians, normal modes
    'experimental': ['math-stats'],
    'chem-kinetics': ['math-integrals'],           // integrated rate laws
    'astro-kepler': ['math-derivatives']
  };
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

  /* ---------- Tech-tree layout: every module is a node, placed by how far it is from the centre ---------- */
  const STEP = 96, R0 = 70, NODE = 25, SUBJ_ORDER = { maths: 0, physics: 1, astronomy: 2, chemistry: 3, biology: 4 };
  let LAY = null;
  function layout() {
    if (LAY) return LAY;
    const depth = {}, dep = (id) => { if (depth[id] != null) return depth[id]; const pr = (PB.PREREQS[id] || []).filter((x) => PB.chapter(x)); depth[id] = pr.length ? 1 + Math.max.apply(null, pr.map(dep)) : 0; return depth[id]; };
    PB.chapters.forEach((c) => dep(c.id));
    // Primary parent: the deepest prerequisite (so a child sits exactly one ring further out).
    const parent = {}, kids = {};
    PB.chapters.forEach((c) => {
      const pr = (PB.PREREQS[c.id] || []).filter((x) => PB.chapter(x));
      if (!pr.length) return;
      pr.sort((a, b) => depth[b] - depth[a] || (PB.chapter(a).subject === c.subject ? -1 : 1));
      parent[c.id] = pr[0]; (kids[pr[0]] = kids[pr[0]] || []).push(c.id);
    });
    const ord = (id) => { const c = PB.chapter(id); return SUBJ_ORDER[c.subject] * 1000 + PB.chapters.indexOf(c); };
    Object.keys(kids).forEach((k) => kids[k].sort((a, b) => ord(a) - ord(b)));
    const leaves = {}, lv = (id) => { if (leaves[id] != null) return leaves[id]; leaves[id] = (kids[id] || []).reduce((a, k) => a + lv(k), 0) || 1; return leaves[id]; };
    const roots = PB.chapters.filter((c) => !parent[c.id]).map((c) => c.id);
    const pos = {}, ang = {};
    function place(id, a0, a1) {
      const a = (a0 + a1) / 2, r = depth[id] ? R0 + depth[id] * STEP : 0;
      ang[id] = a; pos[id] = [r * Math.cos(a), r * Math.sin(a)];
      let t = a0; const W = (k) => Math.pow(lv(k), 0.6), tot = (kids[id] || []).reduce((x, k) => x + W(k), 0);
      (kids[id] || []).forEach((k) => { const w = (a1 - a0) * W(k) / tot; place(k, t, t + w); t += w; });
    }
    let t = -Math.PI / 2; const all = roots.reduce((a, r) => a + lv(r), 0);
    roots.forEach((r) => { const w = 2 * Math.PI * lv(r) / all; place(r, t, t + w); t += w; });
    const maxD = Math.max.apply(null, Object.values(depth));
    LAY = { pos: pos, depth: depth, parent: parent, maxD: maxD };
    return LAY;
  }
  const BRANCH = { maths: 'The centre: Maths', physics: 'First branch: Physics', chemistry: 'Branch from physics: Chemistry', astronomy: 'Branch from physics: Astronomy', biology: 'Branch from chemistry: Biology' };
  const short = (t, n) => (t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : t);

  function svgTree(sel) {
    const L = layout(), pos = L.pos, R = R0 + (L.maxD + 1) * STEP;
    const selCh = PB.chapter(sel), near = {};
    if (selCh) { near[sel] = 1; (PB.PREREQS[sel] || []).forEach((x) => { near[x] = 1; }); PB.chapters.forEach((c) => { if ((PB.PREREQS[c.id] || []).indexOf(sel) >= 0) near[c.id] = 1; }); }
    let s = '<svg class="sk-svg" viewBox="' + (-R) + ' ' + (-R) + ' ' + 2 * R + ' ' + 2 * R + '" role="img" aria-label="Tech tree of all modules">';
    for (let d = 1; d <= L.maxD; d++) s += '<circle cx="0" cy="0" r="' + (R0 + d * STEP) + '" fill="none" stroke="var(--line)" stroke-width="1.5" opacity=".55"/>';
    // Connections: first the extra prerequisites (faint), then the main branch lines.
    PB.chapters.forEach((c) => (PB.PREREQS[c.id] || []).forEach((pid) => {
      const a = pos[pid], b = pos[c.id]; if (!a || !b) return;
      const main = L.parent[c.id] === pid, hl = sel && (c.id === sel || pid === sel), lit = PB.isPassed(PB.chapter(pid));
      if (!main && !hl) { s += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="var(--ink-3)" stroke-width="1.2" stroke-dasharray="3 6" opacity=".35"/>'; return; }
      // Main branch: leave the parent radially, then bend towards the child.
      const ra = Math.hypot(a[0], a[1]), rb = Math.hypot(b[0], b[1]), th = Math.atan2(b[1], b[0]), rm = (ra + rb) / 2;
      const cx = rm * Math.cos(th), cy = rm * Math.sin(th);
      s += '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + '" fill="none" stroke="var(--s-' + c.subject + ')" stroke-width="' + (hl ? 6 : lit ? 4.5 : 3) + '" opacity="' + (hl ? 0.95 : lit ? 0.75 : 0.35) + '" stroke-linecap="round"/>';
    }));
    PB.chapters.forEach((c) => {
      const p = pos[c.id], open = PB.isUnlocked(c), passed = PB.isPassed(c), Lv = PB.masteryLevel ? PB.masteryLevel(c) : 0, col = 'var(--s-' + c.subject + ')', b = PB.bookOf(c);
      const C = 2 * Math.PI * (NODE + 5), prog = PB.chapterStats(c).progress || 0, isSel = sel === c.id, dim = sel && !near[c.id];
      s += '<g class="sk-node' + (isSel ? ' sel' : '') + (near[c.id] ? ' near' : '') + (open ? '' : ' locked') + '" data-ch="' + c.id + '" tabindex="0" role="button" opacity="' + (dim ? 0.55 : 1) + '" aria-label="' + c.title.replace(/"/g, '') + ', ' + (passed ? 'passed' : open ? 'open' : 'locked') + '">' +
        '<title>' + b.title.replace(/&/g, '&amp;') + ' · ' + c.title.replace(/&/g, '&amp;').replace(/</g, '') + '</title>' +
        (isSel ? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (NODE + 13) + '" fill="none" stroke="var(--ink)" stroke-width="3"/>' : '') +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (NODE + 5) + '" fill="var(--surface)" stroke="' + col + '" stroke-opacity="0.35" stroke-width="4"/>' +
        (prog ? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (NODE + 5) + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-dasharray="' + (C * prog).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 ' + p[0] + ' ' + p[1] + ')"/>' : '') +
        '<circle class="sk-disc" cx="' + p[0] + '" cy="' + p[1] + '" r="' + NODE + '" fill="' + (open ? col : 'var(--surface-2)') + '" fill-opacity="' + (open ? [0.45, 0.6, 0.75, 0.9, 1][Lv] : 1) + '"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 8) + '" text-anchor="middle" font-size="22" opacity="' + (open ? 1 : 0.4) + '">' + (Lv >= 4 ? '♛' : passed ? '★' : open ? b.icon : '🔒') + '</text>' +
        '<text class="sk-label" x="' + p[0] + '" y="' + (p[1] + NODE + 22) + '" text-anchor="middle" font-size="15" font-weight="' + (isSel ? 800 : 600) + '" fill="' + (open ? 'var(--ink)' : 'var(--ink-3)') + '" paint-order="stroke" stroke="var(--surface)" stroke-width="4">' + short(c.title, 22).replace(/&/g, '&amp;') + '</text></g>';
    });
    return s + '</svg>';
  }

  /* ---------- Pan and zoom ---------- */
  function panZoom(box, getSvg, onPick) {
    let vb = null, drag = null, pts = {};
    const R = R0 + (layout().maxD + 1) * STEP;
    function apply() { const svg = getSvg(); if (svg && vb) { svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h); svg.classList.toggle('far', vb.w > 1900); } }
    function fit(cx, cy, w) { const asp = box.clientHeight / Math.max(1, box.clientWidth); vb = { w: w, h: w * asp, x: cx - w / 2, y: cy - w * asp / 2 }; apply(); }
    function zoom(f, px, py) {
      const r = box.getBoundingClientRect(), ux = vb.x + (px - r.left) / r.width * vb.w, uy = vb.y + (py - r.top) / r.height * vb.h;
      const nw = Math.max(300, Math.min(2.4 * R, vb.w * f)), k = nw / vb.w;
      vb = { w: nw, h: vb.h * k, x: ux - (ux - vb.x) * k, y: uy - (uy - vb.y) * k }; apply();
    }
    box.addEventListener('wheel', (e) => { e.preventDefault(); zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
    box.addEventListener('pointerdown', (e) => { if (e.target.closest && e.target.closest('.sk-ctrls')) return; pts[e.pointerId] = [e.clientX, e.clientY]; drag = { x: e.clientX, y: e.clientY, moved: 0, n: Object.keys(pts).length }; box.setPointerCapture(e.pointerId); });
    box.addEventListener('pointermove', (e) => {
      if (!pts[e.pointerId]) return;
      const ids = Object.keys(pts);
      if (ids.length === 2) {
        const o = ids.map((i) => pts[i]), d0 = Math.hypot(o[0][0] - o[1][0], o[0][1] - o[1][1]);
        pts[e.pointerId] = [e.clientX, e.clientY];
        const n = ids.map((i) => pts[i]), d1 = Math.hypot(n[0][0] - n[1][0], n[0][1] - n[1][1]);
        if (d0 > 0 && d1 > 0) zoom(d0 / d1, (n[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2);
        drag.moved = 99; return;
      }
      const p = pts[e.pointerId], r = box.getBoundingClientRect();
      vb.x -= (e.clientX - p[0]) * vb.w / r.width; vb.y -= (e.clientY - p[1]) * vb.h / r.height;
      drag.moved += Math.abs(e.clientX - p[0]) + Math.abs(e.clientY - p[1]);
      pts[e.pointerId] = [e.clientX, e.clientY]; apply();
    });
    const up = (e) => {
      const was = drag; delete pts[e.pointerId];
      if (was && was.moved < 6 && was.n === 1) { const el = document.elementFromPoint(e.clientX, e.clientY), n = el && el.closest && el.closest('.sk-node'); if (n) onPick(n.getAttribute('data-ch')); }
      if (!Object.keys(pts).length) drag = null;
    };
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', (e) => { delete pts[e.pointerId]; drag = null; });
    return { fit: fit, zoom: (f) => { const r = box.getBoundingClientRect(); zoom(f, r.left + r.width / 2, r.top + r.height / 2); }, all: () => { const P = Object.values(layout().pos), xs = P.map((q) => q[0]), ys = P.map((q) => q[1]); const x0 = Math.min.apply(null, xs) - 90, x1 = Math.max.apply(null, xs) + 90, y0 = Math.min.apply(null, ys) - 70, y1 = Math.max.apply(null, ys) + 110; const asp = box.clientHeight / Math.max(1, box.clientWidth); fit((x0 + x1) / 2, (y0 + y1) / 2, Math.max(x1 - x0, (y1 - y0) / asp)); }, focus: (id, w) => { const p = layout().pos[id] || [0, 0]; fit(p[0], p[1], w || Math.min(1500, 2.15 * R)); }, apply: apply };
  }

  /* ---------- Book panel: modules and their next tasks ---------- */
  function bookPanel(b, full, hl) {
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
      const li = h('li', { class: 'bk-mod' + (open ? '' : ' locked') + (PB.isPassed(c) ? ' passed' : '') + (hl === c.id ? ' hl' : '') });
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
    if (PB.book(s.treeSel)) s.treeSel = PB.book(s.treeSel).chapters[0].id;
    if (!s.treeSel || !PB.chapter(s.treeSel)) s.treeSel = (s.lastChapter && PB.chapter(s.lastChapter)) ? s.lastChapter : PB.chapters.find((c) => !(PB.PREREQS[c.id] || []).length).id;
    const wrap = h('div', { class: 'wrap-wide' });
    const nPass = PB.chapters.filter((c) => PB.isPassed(c)).length;
    wrap.appendChild(h('div', { class: 'sk-top' }, [
      h('div', {}, [h('div', { class: 'eyebrow', text: PB.BOOKS.length + ' books · ' + PB.chapters.length + ' modules · ' + nPass + ' passed · level ' + L.level + ' ' + L.title }), h('h1', { text: 'Your tech tree', style: 'margin-top:6px' }), h('p', { class: 'lede', text: 'Every module is a node. The centre is where everything starts; each ring outwards needs the ring before it. Maths grows into physics, physics into chemistry and astronomy, chemistry into biology. Drag to move, scroll or pinch to zoom, and tap a node to see its tasks.' })])
    ]));
    const rec = recommended();
    if (rec.length) {
      const r = h('div', { class: 'sk-rec' }, [h('div', { class: 'eyebrow', text: 'Up next for you' })]);
      rec.forEach(([c, t], k) => r.appendChild(h('a', { class: 'plan-row' + (k === 0 ? ' first' : ''), href: t.href, onclick: t.sec != null ? () => { PB.pendingSection = t.sec; } : null }, [h('span', { class: 'plan-ico', text: t.ico }), h('span', { class: 'plan-txt', html: '<b>' + PB.bookOf(c).title + ' · ' + c.title + '</b> — ' + t.text }), h('span', { class: 'plan-rw', text: t.rw || '' }), h('span', { class: 'plan-go', text: '→' })])));
      wrap.appendChild(r);
    }
    const legend = h('div', { class: 'sk-legend' }, PB.SUBJECTS.map((sub) => h('span', { class: 'subj-' + sub.id }, [h('i', { style: 'background:var(--s-' + sub.id + ')' }), sub.name])).concat([h('span', {}, ['★ passed']), h('span', {}, ['♛ mastered']), h('span', {}, ['🔒 locked'])]));
    const box = h('div', { class: 'sk-tree' });
    const draw = () => { box.querySelectorAll('svg').forEach((x) => x.remove()); box.insertAdjacentHTML('afterbegin', svgTree(s.treeSel)); pz && pz.apply(); };
    const ctrls = h('div', { class: 'sk-ctrls' }, [
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Zoom in', text: '+', onclick: () => pz.zoom(1 / 1.35) }),
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Zoom out', text: '−', onclick: () => pz.zoom(1.35) }),
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Show the whole tree', text: '⤢', onclick: () => pz.all() }),
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Centre on the selected module', text: '◎', onclick: () => pz.focus(s.treeSel) })
    ]);
    box.appendChild(ctrls);
    const list = h('div', { class: 'sk-list' });
    PB.SUBJECTS.forEach((sub) => {
      list.appendChild(h('div', { class: 'sk-ring-label subj-' + sub.id, text: BRANCH[sub.id] }));
      const row = h('div', { class: 'sk-chips' });
      PB.BOOKS.filter((b) => b.subject === sub.id).forEach((b) => { const st = bookStats(b); row.appendChild(h('button', { class: 'sk-chip subj-' + b.subject + (PB.chapter(s.treeSel).book === b.id ? ' sel' : '') + (st.open ? '' : ' locked'), type: 'button', 'data-book': b.id }, [h('span', { text: st.open ? b.icon : '🔒' }), h('b', { text: b.title }), h('small', { text: st.passed + '/' + st.n })])); });
      list.appendChild(row);
    });
    const panel = h('div', { class: 'sk-panel' });
    const showPanel = () => { panel.innerHTML = ''; const c = PB.chapter(s.treeSel); panel.appendChild(bookPanel(PB.bookOf(c), false, c.id)); };
    showPanel();
    wrap.appendChild(h('div', { class: 'sk-grid' }, [h('div', { class: 'sk-map' }, [legend, box, list]), panel]));
    let pz = null;
    const pick = (id, fromList) => {
      s.treeSel = id; PB.save(); draw();
      list.querySelectorAll('.sk-chip').forEach((x) => x.classList.toggle('sel', x.getAttribute('data-book') === PB.chapter(id).book));
      showPanel();
      if (fromList) pz.focus(id);
      const m = panel.querySelector('.bk-mod.hl');
      if (m && window.innerWidth < 1100) m.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    list.addEventListener('click', (e) => { const n = e.target.closest && e.target.closest('[data-book]'); if (n) pick(PB.book(n.getAttribute('data-book')).chapters[0].id, true); });
    box.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const n = e.target.closest && e.target.closest('.sk-node'); if (n) { e.preventDefault(); pick(n.getAttribute('data-ch')); } });
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
    draw();
    pz = panZoom(box, () => box.querySelector('svg'), (id) => pick(id));
    pz.focus(s.treeSel, 1300);
    window.addEventListener('resize', function onR() { if (!document.body.contains(box)) return window.removeEventListener('resize', onR); pz.focus(s.treeSel); });
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
  PB.techLayout = layout;
  PB.views.library = viewLibrary;
  PB.BOOKS.forEach((b) => { PB.views['book-' + b.id] = () => viewBook(b.id); });
  // Old subject pages now open the first book of that branch.
  PB.SUBJECTS.forEach((sub) => { PB.views[sub.id] = () => { const b = PB.BOOKS.find((x) => x.subject === sub.id); viewBook(b.id); }; });
})();
