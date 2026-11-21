/* Physbook equation board: type equations, wire matching variables together to substitute,
   click a variable to solve for it, and enter known values to get numbers out.
   The algebra is done by SymPy (js/solver-engine.js) running in Pyodide, loaded on first use. */
(function () {
  'use strict';
  const PB = window.PB;
  const h = PB.h;
  const KEY = 'physbook-solver-v1';
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  const SVGNS = 'http://www.w3.org/2000/svg';

  const EXAMPLES = [
    { name: 'Orbital speed', note: 'Gravity supplies the centripetal force. Open the link on F and substitute.',
      eqs: ['F = m*v^2/r', 'F = G*M*m/r^2'], links: [[0, 'F', 1, 'F']] },
    { name: 'Timeless kinematics', note: 'Eliminate t between the two SUVAT equations.',
      eqs: ['v = u + a*t', 's = u*t + 1/2*a*t^2'], links: [[0, 't', 1, 't']] },
    { name: 'Pendulum at the bottom', note: 'Energy conservation plus the geometry of the drop.',
      eqs: ['m*g*h = 1/2*m*v^2', 'h = L*(1 - cos(theta))'], links: [[1, 'h', 0, 'h']] },
    { name: 'Conical pendulum period', note: 'Use (2) to remove r from both (1) and (3), then drag v between the two new cards and solve for T.',
      eqs: ['tan(theta) = v^2/(r*g)', 'r = L*sin(theta)', 'v = 2*pi*r/T'], links: [[1, 'r', 0, 'r'], [1, 'r', 2, 'r']] },
    { name: 'Fall then slide', note: 'Final speed of the drop (v) is the starting speed (u) of the slide: link different names.',
      eqs: ['v^2 = 2*g*h', 'd = u^2/(2*mu*g)'], links: [[0, 'v', 1, 'u']] }
  ];

  /* ---------- Engine (Pyodide + SymPy, loaded on demand) ---------- */
  let enginePromise = null;
  const engine = { state: 'idle', msg: 'Algebra engine not loaded', api: null };
  const engineSubs = [];
  function setEngine(state, msg) { engine.state = state; engine.msg = msg; engineSubs.forEach(function (f) { f(); }); }
  function loadEngine() {
    if (enginePromise) return enginePromise;
    setEngine('loading', 'Downloading the algebra engine…');
    enginePromise = new Promise(function (res, rej) {
      if (window.loadPyodide) return res();
      const s = document.createElement('script');
      s.src = PYODIDE + 'pyodide.js';
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error('Could not download Pyodide. The board needs an internet connection the first time.')); };
      document.head.appendChild(s);
    }).then(function () {
      setEngine('loading', 'Starting Python…');
      return window.loadPyodide({ indexURL: PYODIDE });
    }).then(function (py) {
      setEngine('loading', 'Loading SymPy…');
      return py.loadPackage('sympy', { messageCallback: function () {} }).then(function () { return py; });
    }).then(function (py) {
      py.runPython(PB.SOLVER_PY);
      const fn = py.globals.get('api');
      engine.api = function (name, args) { return JSON.parse(fn(name, JSON.stringify(args))); };
      setEngine('ready', 'SymPy ready');
      return engine.api;
    }).catch(function (e) {
      enginePromise = null;
      setEngine('error', e.message || 'The algebra engine failed to load.');
      throw e;
    });
    return enginePromise;
  }
  function syncSigns(api) { api('set_signs', [JSON.stringify(S.signs || {})]); }
  function call(name, args) { return loadEngine().then(function (api) { syncSigns(api); return api(name, args); }); }
  const MATHLIVE = 'https://cdn.jsdelivr.net/npm/mathlive@0.109.2/';
  let mathlivePromise = null;
  function loadMathLive() {
    if (mathlivePromise) return mathlivePromise;
    mathlivePromise = new Promise(function (res, rej) {
      if (window.MathfieldElement) return res();
      const s = document.createElement('script');
      s.src = MATHLIVE + 'mathlive.min.js';
      s.onload = function () { res(); };
      s.onerror = function () { mathlivePromise = null; rej(new Error('Could not download the equation maker (MathLive).')); };
      document.head.appendChild(s);
    }).then(function () {
      window.MathfieldElement.fontsDirectory = MATHLIVE + 'fonts/';
      window.MathfieldElement.soundsDirectory = null;
    });
    return mathlivePromise;
  }

  /* ---------- State ---------- */
  function fresh() { return { cards: [], links: [], knowns: {}, knownFrom: {}, signs: {}, sel: {}, deg: false, next: 1, seq: 1 }; }
  function canBeNeg(name) { return !!(S.signs && S.signs[name] === 'real'); }
  function toggleSign(name) {
    snapshot();
    if (canBeNeg(name)) delete S.signs[name]; else S.signs[name] = 'real';
    save();
    refreshSignMarks();
    syncKnownInputs();
    evaluateAll();
    toast(canBeNeg(name) ? name + ' may now be negative. New results keep negative roots for it.' : name + ' is treated as positive again.');
  }
  function refreshSignMarks() {
    if (!ui) return;
    ui.cards.querySelectorAll('.port').forEach(function (q) { q.classList.toggle('neg', canBeNeg(q.getAttribute('data-var'))); });
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw); if (s && Array.isArray(s.cards)) return Object.assign(fresh(), s); }
    } catch (e) { /* storage unavailable */ }
    return fresh();
  }
  let S = loadState();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
  const undoStack = [];
  function snapshot() { undoStack.push(JSON.stringify(S)); if (undoStack.length > 40) undoStack.shift(); if (ui) ui.undoBtn.disabled = false; }
  function undo() {
    if (!undoStack.length) return;
    S = JSON.parse(undoStack.pop());
    save();
    closeMenu();
    renderAll(true);
    renderGraph();
    ui.undoBtn.disabled = !undoStack.length;
  }
  function card(id) { return S.cards.find(function (c) { return c.id === id; }); }
  function label(c) { return '(' + c.n + ')'; }
  function varOf(c, name) { return c.vars.find(function (v) { return v.name === name; }); }
  function vtex(c, name) { const v = varOf(c, name); return v ? v.tex : name; }
  function allVars() {
    const m = {};
    S.cards.forEach(function (c) { c.vars.forEach(function (v) { if (!m[v.name]) m[v.name] = v.tex; }); });
    return Object.keys(m).sort(function (a, b) { return a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : (a < b ? -1 : 1); })
      .map(function (k) { return { name: k, tex: m[k] }; });
  }

  /* One colour per variable name, so the same quantity looks the same everywhere. */
  const HUES = [212, 8, 150, 282, 32, 186, 328, 96, 250, 52, 0, 170];
  function hue(name) { let x = 0; for (let i = 0; i < name.length; i++) x = (x * 31 + name.charCodeAt(i)) >>> 0; return HUES[x % HUES.length]; }
  function col(name, a) { return 'hsl(' + hue(name) + ' 72% var(--wire-l)' + (a ? ' / ' + a : '') + ')'; }

  /* ---------- View ---------- */
  let ui = null;
  const els = new Map(); // card id -> element

  function view() {
    els.clear();
    const status = h('span', { class: 'eng-pill', role: 'status' });
    const input = h('input', { class: 'eq-input', type: 'text', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off',
      placeholder: 'v = u + a*t   or LaTeX:  \\frac{1}{2}mv^2 = mgh', 'aria-label': 'Equation to add, as plain text or LaTeX' });
    const addBtn = h('button', { class: 'btn primary', type: 'submit', text: 'Add' });
    const form = h('form', { class: 'eq-form' }, [input, addBtn]);
    const preview = h('div', { class: 'eq-preview', 'aria-live': 'polite' });
    const libBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Equation lookup' });
    const makerBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Equation maker' });
    const exportBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Export LaTeX' });
    const maker = h('div', { class: 'eq-panel eq-maker', hidden: true });
    const exporter = h('div', { class: 'eq-panel eq-export', hidden: true });
    const exSel = h('select', { class: 'ex-select', 'aria-label': 'Load an example board' }, [h('option', { value: '', text: 'Load an example…' })]);
    EXAMPLES.forEach(function (ex, i) { exSel.appendChild(h('option', { value: String(i), text: ex.name })); });
    const degBtn = h('button', { class: 'btn small', type: 'button', 'aria-pressed': S.deg ? 'true' : 'false' });
    const undoBtn = h('button', { class: 'btn small', type: 'button', text: 'Undo', disabled: !undoStack.length });
    const clearBtn = h('button', { class: 'btn small warn', type: 'button', text: 'Clear board' });
    const lib = h('div', { class: 'eq-panel eq-lib', hidden: true });
    const graph = h('section', { class: 'eq-panel graph-panel', hidden: true, 'aria-label': 'Graph' });
    const hint = h('div', { class: 'board-hint' });

    const canvas = h('div', { class: 'board-canvas' });
    const prov = document.createElementNS(SVGNS, 'svg'); prov.setAttribute('class', 'board-svg prov'); prov.setAttribute('aria-hidden', 'true');
    const wires = document.createElementNS(SVGNS, 'svg'); wires.setAttribute('class', 'board-svg wires');
    wires.innerHTML = '<defs><marker id="sv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--ink-2)"/></marker></defs>';
    const cardsLayer = h('div', { class: 'cards-layer' });
    const empty = h('div', { class: 'board-empty' }, [
      h('h3', { text: 'Your board is empty' }),
      h('p', { html: 'Add a couple of equations above (or pick from the library), then <b>drag from a variable on one card to the same variable on another</b> to substitute one into the other. Click any variable to solve for it.' })
    ]);
    canvas.append(prov, cardsLayer, wires, empty);
    const board = h('div', { class: 'board', tabindex: '-1' }, [canvas]);

    const knownList = h('div', { class: 'known-list' });
    const side = h('aside', { class: 'board-side', 'aria-label': 'Known values' }, [
      h('h3', { text: 'Known values' }),
      h('p', { class: 'side-note', html: 'Enter numbers in SI units. Every card then shows what it can work out from them.' }),
      knownList
    ]);

    const wrap = h('div', { class: 'solver' }, [
      h('div', { class: 'solver-head' }, [
        h('div', {}, [h('div', { class: 'eyebrow', text: 'Tool' }), h('h1', { text: 'Equation board' })]),
        h('p', { class: 'solver-lede', html: 'Wire matching variables between equations to substitute and eliminate, step by step. Drag a variable onto another card’s variable; click a variable to rearrange for it.' })
      ]),
      h('div', { class: 'solver-bar' }, [form, h('div', { class: 'bar-tools' }, [makerBtn, libBtn, exSel, exportBtn, degBtn, undoBtn, clearBtn, status])]),
      preview, maker, lib, exporter, hint,
      h('div', { class: 'board-wrap' }, [board, side]),
      graph
    ]);

    ui = { wrap: wrap, board: board, canvas: canvas, prov: prov, wires: wires, cards: cardsLayer, empty: empty, knownList: knownList,
      input: input, addBtn: addBtn, preview: preview, exporter: exporter, graph: graph, exportBtn: exportBtn, status: status, undoBtn: undoBtn, hint: hint, degBtn: degBtn, menu: null, pending: null };

    /* engine status */
    function showStatus() {
      status.className = 'eng-pill ' + engine.state;
      status.innerHTML = '';
      status.append(h('span', { class: 'dot' }), document.createTextNode(engine.msg));
      if (engine.state === 'error') status.append(' ', h('button', { class: 'linkish', type: 'button', text: 'Retry', onclick: function () { loadEngine().then(evaluateAll, function () {}); } }));
      addBtn.textContent = engine.state === 'loading' ? 'Add (loading…)' : 'Add';
    }
    engineSubs.length = 0;
    engineSubs.push(showStatus);
    showStatus();

    /* add equation */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) { input.focus(); return; }
      addEquation(text).then(function (ok) { if (ok) { input.value = ''; preview.innerHTML = ''; } });
    });
    let pvTimer = null;
    input.addEventListener('input', function () {
      clearTimeout(pvTimer);
      const text = input.value.trim();
      if (!text) { preview.innerHTML = ''; return; }
      pvTimer = setTimeout(function () {
        if (engine.state !== 'ready') return;
        syncSigns(engine.api);
        const r = engine.api('parse_eq', [text]);
        if (input.value.trim() !== text) return;
        if (r.ok) { preview.className = 'eq-preview'; preview.innerHTML = '<span class="pv-k">Preview</span> $' + r.tex + '$'; PB.typeset(preview); }
        else if (text.indexOf('=') > 0) { preview.className = 'eq-preview err'; preview.textContent = r.error; }
        else { preview.className = 'eq-preview'; preview.textContent = ''; }
      }, 280);
    });

    const panels = [[libBtn, lib], [makerBtn, maker], [exportBtn, exporter]];
    function showPanel(btn, open) {
      panels.forEach(function (pp) {
        const on = pp[0] === btn && open;
        pp[1].hidden = !on;
        pp[0].setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    ui.showPanel = showPanel;
    makerBtn.addEventListener('click', function () {
      const open = maker.hidden;
      showPanel(makerBtn, open);
      if (open) buildMaker(maker);
    });
    exportBtn.addEventListener('click', function () {
      const open = exporter.hidden;
      showPanel(exportBtn, open);
      if (open) renderExport();
    });
    libBtn.addEventListener('click', function () {
      if (lib.hidden) { showPanel(libBtn, true); buildLibrary(lib); }
      else showPanel(libBtn, false);
    });

    exSel.addEventListener('change', function () {
      const ex = EXAMPLES[+exSel.value];
      exSel.value = '';
      if (ex) loadExample(ex);
    });
    function degLabel() { degBtn.textContent = S.deg ? 'Angles: degrees' : 'Angles: radians'; degBtn.setAttribute('aria-pressed', S.deg ? 'true' : 'false'); }
    degLabel();
    degBtn.addEventListener('click', function () { S.deg = !S.deg; save(); degLabel(); evaluateAll(); if (S.graph) { S.graph.range = null; renderGraph(); } });
    undoBtn.addEventListener('click', undo);
    clearBtn.addEventListener('click', function () {
      if (!S.cards.length) return;
      snapshot();
      S = Object.assign(fresh(), { deg: S.deg });
      save(); closeMenu(); renderAll(true);
      toast('Board cleared. Press Undo to bring it back.');
    });

    /* background clicks close menus / cancel linking */
    board.addEventListener('pointerdown', function (e) {
      if (ui.menu && !ui.menu.contains(e.target)) closeMenu();
      if (ui.pending && !e.target.closest('.port')) setPending(null);
    });
    const onKey = function (e) {
      if (e.key === 'Escape') { closeMenu(); setPending(null); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); undo(); }
    };
    document.addEventListener('keydown', onKey);
    const ro = new ResizeObserver(function () { sizeCanvas(); drawWires(); });
    ro.observe(board);
    PB.setView([wrap], 'solver');
    /* register cleanup after setView, which tears down the previous view */
    const mine = ui;
    PB.onViewDestroy(function () { document.removeEventListener('keydown', onKey); ro.disconnect(); if (ui === mine) { ui = null; els.clear(); } });
    window.scrollTo(0, 0);
    renderAll(true);
    loadEngine().then(function () { evaluateAll(); if (S.graph) renderGraph(); }, function () {});
  }

  /* ---------- Rendering ---------- */
  function renderAll(full) {
    if (!ui) return;
    if (full) { els.forEach(function (el) { el.remove(); }); els.clear(); geo.clear(); }
    const ids = new Set(S.cards.map(function (c) { return c.id; }));
    els.forEach(function (el, id) { if (!ids.has(id)) { el.remove(); els.delete(id); geo.delete(id); } });
    S.cards.forEach(function (c) { if (!els.has(c.id)) { const el = cardEl(c); els.set(c.id, el); ui.cards.appendChild(el); PB.typeset(el); } });
    ui.empty.hidden = S.cards.length > 0;
    updateExportBtn();
    if (!ui.exporter.hidden) renderExport();
    renderKnowns();
    sizeCanvas();
    drawWires();
    setHint();
    evaluateAll();
    if (ui.graph && !ui.graph.hidden && (!S.graph || !card(S.graph.card))) renderGraph();
  }

  function rerenderCard(c) {
    const el = els.get(c.id);
    const nel = cardEl(c);
    if (el) el.replaceWith(nel); else ui.cards.appendChild(nel);
    els.set(c.id, nel);
    PB.typeset(nel);
  }

  function cardEl(c) {
    const head = h('div', { class: 'eq-head' }, [
      h('span', { class: 'eq-num', text: label(c) }),
      h('span', { class: 'eq-origin', html: c.via ? c.via : (c.title ? esc(c.title) : 'given'), title: c.title || null })
    ]);
    const pick = h('button', { class: 'eq-pick', type: 'button', 'aria-pressed': S.sel[c.id] ? 'true' : 'false', title: 'Select for LaTeX export',
      'aria-label': 'Select equation ' + label(c) + ' for LaTeX export',
      html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path class="tick" d="M4.8 8.2l2.2 2.2 4.4-4.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onclick: function () { toggleSelect(c.id); } });
    head.insertBefore(pick, head.firstChild);
    if (c.calc) head.appendChild(h('button', { class: 'eq-x eq-calc', type: 'button', text: '∫d', title: 'Evaluate the derivatives and integrals, treating quantities not written in terms of the variable as constants',
      'aria-label': 'Evaluate derivatives and integrals in ' + label(c), onclick: function () { evalCalc(c); } }));
    if (c.src != null) head.appendChild(h('button', { class: 'eq-x', type: 'button', 'aria-label': 'Edit equation ' + label(c), title: 'Edit', html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M11 2.5l2.5 2.5L6 12.5H3.5V10z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>', onclick: function () { editCard(c); } }));
    head.appendChild(h('button', { class: 'eq-x', type: 'button', 'aria-label': 'Delete equation ' + label(c), title: 'Delete', html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>', onclick: function () { deleteCard(c.id); } }));
    const body = h('div', { class: 'eq-tex', html: '$$' + c.tex + '$$' });
    const ports = h('div', { class: 'eq-ports' });
    c.vars.forEach(function (v) {
      const mean = meaningOf(c, v.name);
      const p = h('button', { class: 'port', type: 'button', 'data-card': c.id, 'data-var': v.name, title: mean ? meanText(mean) : null,
        'aria-label': 'Variable ' + v.name + (mean ? ', ' + mean[0] : '') + ' in equation ' + label(c) + '. Drag to another card to link, or press for options.', html: '$' + v.tex + '$' });
      p.style.setProperty('--vc', col(v.name));
      p.style.setProperty('--vc-soft', col(v.name, 0.13));
      if (canBeNeg(v.name)) p.classList.add('neg');
      ports.appendChild(p);
    });
    const el = h('div', { class: 'eq-card' + (c.parents && c.parents.length ? ' derived' : '') + (S.sel[c.id] ? ' selected' : ''), 'data-id': c.id }, [head, body, ports]);
    if (c.steps && c.steps.length) {
      const det = h('details', { class: 'eq-steps' }, [h('summary', { text: 'Working' })]);
      const ol = h('ol');
      c.steps.forEach(function (s) { ol.appendChild(h('li', { html: '$' + s + '$' })); });
      det.appendChild(ol);
      det.addEventListener('toggle', function () { measure(c.id); sizeCanvas(); drawWires(); });
      el.appendChild(det);
    }
    el.appendChild(h('div', { class: 'eq-eval', hidden: true }));
    place(el, c);
    bindCardDrag(el, head, c);
    ports.querySelectorAll('.port').forEach(function (p) { bindPort(p, c); });
    /* measure only when the card's size changes (typesetting, working opened), never while dragging */
    new ResizeObserver(function () { if (ui && els.get(c.id) === el) { measure(c.id); sizeCanvasSoon(); drawWires(); } }).observe(el);
    return el;
  }

  let sizeTimer = null;
  function sizeCanvasSoon() { clearTimeout(sizeTimer); sizeTimer = setTimeout(sizeCanvas, 60); }
  function sizeCanvas() {
    if (!ui) return;
    let w = 0, ht = 0;
    S.cards.forEach(function (c) { const g = gOf(c); w = Math.max(w, c.x + g.w); ht = Math.max(ht, c.y + g.h); });
    const W = Math.max(ui.board.clientWidth, w + 260), H = Math.max(ui.board.clientHeight, ht + 220);
    ui.canvas.style.width = W + 'px'; ui.canvas.style.height = H + 'px';
    [ui.prov, ui.wires].forEach(function (s) { s.setAttribute('width', W); s.setAttribute('height', H); s.setAttribute('viewBox', '0 0 ' + W + ' ' + H); });
  }

  function setHint() {
    if (!ui) return;
    let t = '';
    if (ui.pending) {
      const c = card(ui.pending.c);
      t = 'Linking $' + vtex(c, ui.pending.v) + '$ from ' + label(c) + ': now press the variable on another card that is the same quantity. Esc cancels.';
    } else if (S.cards.length === 1) t = 'Add another equation that shares a variable, then drag between the matching variables.';
    else if (S.cards.length > 1 && !S.links.length) t = 'Drag from a variable chip on one card onto the matching chip on another card. Hovering a chip shows its matches as dotted lines.';
    ui.hint.innerHTML = t;
    ui.hint.hidden = !t;
    ui.hint.classList.toggle('active', !!ui.pending);
    if (t) PB.typeset(ui.hint);
  }

  /* ---------- Geometry and wires ---------- */
  function portEl(cid, name) { const el = els.get(cid); return el ? el.querySelector('.port[data-var="' + cssEsc(name) + '"]') : null; }
  function cssEsc(s) { return window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/"/g, '\\"'); }
  function rel(el) {
    const a = ui.canvas.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - a.left, y: r.top - a.top, w: r.width, h: r.height };
  }
  /* Card geometry is cached: card position comes from state, port offsets from the last measurement.
     Drawing wires therefore never forces the browser to recompute layout while something moves. */
  const geo = new Map();
  function measure(id) {
    const el = els.get(id);
    if (!el) return;
    const g = { w: el.offsetWidth, h: el.offsetHeight, ports: {} };
    el.querySelectorAll('.port').forEach(function (p) { g.ports[p.getAttribute('data-var')] = { x: p.offsetLeft + p.offsetWidth / 2, y: p.offsetTop + p.offsetHeight }; });
    geo.set(id, g);
  }
  function gOf(c) { return geo.get(c.id) || { w: 260, h: 150, ports: {} }; }
  function place(el, c) { el.style.transform = 'translate3d(' + c.x + 'px,' + c.y + 'px,0)'; }
  function pt(cid, name) {
    const c = card(cid);
    if (!c) return null;
    const p = gOf(c).ports[name];
    return p ? { x: c.x + p.x, y: c.y + p.y } : null;
  }
  function portPt(p) { return pt(p.getAttribute('data-card'), p.getAttribute('data-var')) || { x: 0, y: 0 }; }
  function curve(a, b) {
    const d = Math.min(160, 50 + Math.abs(a.x - b.x) * 0.12 + Math.abs(a.y - b.y) * 0.2);
    const p1 = { x: a.x, y: a.y + d }, p2 = { x: b.x, y: b.y + d };
    const mid = { x: (a.x + 3 * p1.x + 3 * p2.x + b.x) / 8, y: (a.y + 3 * p1.y + 3 * p2.y + b.y) / 8 };
    return { d: 'M' + a.x + ' ' + a.y + ' C' + p1.x + ' ' + p1.y + ' ' + p2.x + ' ' + p2.y + ' ' + b.x + ' ' + b.y, mid: mid };
  }
  function svg(tag, attrs) { const e = document.createElementNS(SVGNS, tag); Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); }); return e; }

  let wireRaf = null;
  function drawWires() {
    if (!ui || wireRaf) return;
    wireRaf = requestAnimationFrame(function () { wireRaf = null; drawNow(); });
  }
  function drawNow() {
    if (!ui) return;
    const W = ui.wires, P = ui.prov;
    Array.from(W.childNodes).forEach(function (n) { if (n.tagName !== 'defs') n.remove(); });
    P.innerHTML = '';
    /* provenance: parent -> derived card */
    S.cards.forEach(function (c) {
      (c.parents || []).forEach(function (pid) {
        const pc = card(pid);
        if (!pc) return;
        const ga = gOf(pc), gb = gOf(c);
        const a = { x: pc.x, y: pc.y, w: ga.w, h: ga.h }, b = { x: c.x, y: c.y, w: gb.w, h: gb.h };
        let s, t;
        if (a.x + a.w < b.x) { s = { x: a.x + a.w, y: a.y + a.h / 2 }; t = { x: b.x - 2, y: b.y + b.h / 2 }; }
        else if (b.x + b.w < a.x) { s = { x: a.x, y: a.y + a.h / 2 }; t = { x: b.x + b.w + 2, y: b.y + b.h / 2 }; }
        else if (a.y < b.y) { s = { x: a.x + a.w / 2, y: a.y + a.h }; t = { x: b.x + b.w / 2, y: b.y - 2 }; }
        else { s = { x: a.x + a.w / 2, y: a.y }; t = { x: b.x + b.w / 2, y: b.y + b.h + 2 }; }
        const horiz = Math.abs(t.x - s.x) > Math.abs(t.y - s.y);
        const k = horiz ? (t.x - s.x) / 2 : (t.y - s.y) / 2;
        const d = horiz ? 'M' + s.x + ' ' + s.y + ' C' + (s.x + k) + ' ' + s.y + ' ' + (t.x - k) + ' ' + t.y + ' ' + t.x + ' ' + t.y
          : 'M' + s.x + ' ' + s.y + ' C' + s.x + ' ' + (s.y + k) + ' ' + t.x + ' ' + (t.y - k) + ' ' + t.x + ' ' + t.y;
        P.appendChild(svg('path', { d: d, class: 'prov-line', 'marker-end': 'url(#sv-parrow)' }));
      });
    });
    /* arrowhead marker needs to live in the same svg for the provenance layer */
    if (!P.querySelector('defs')) P.insertAdjacentHTML('afterbegin', '<defs><marker id="sv-parrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink-3)"/></marker></defs>');
    /* links */
    const badges = [];
    S.links.forEach(function (L) {
      let A = pt(L.a.c, L.a.v), B = pt(L.b.c, L.b.v);
      if (!A || !B) return;
      if (L.used && L.used.from === L.b.c) { const t = A; A = B; B = t; }
      const cv = curve(A, B);
      const stroke = L.a.v === L.b.v ? col(L.a.v) : 'var(--ink-2)';
      const cls = 'link' + (L.used ? ' used' : '');
      const g = svg('g', { class: cls });
      const line = svg('path', { d: cv.d, class: 'link-line' });
      line.style.stroke = stroke;
      if (L.used) line.setAttribute('marker-end', 'url(#sv-arrow)');
      const hit = svg('path', { d: cv.d, class: 'link-hit' });
      g.append(hit, line);
      /* badges are drawn after every wire so a crossing wire never covers one */
      const badge = svg('g', { class: cls + ' link-badge', transform: 'translate(' + cv.mid.x + ' ' + cv.mid.y + ')', tabindex: '0', role: 'button',
        'aria-label': 'Link between ' + L.a.v + ' in ' + label(card(L.a.c)) + ' and ' + L.b.v + ' in ' + label(card(L.b.c)) + '. Press for options.' });
      const circ = svg('circle', { r: 11 });
      circ.style.stroke = stroke;
      const txt = svg('text', { 'text-anchor': 'middle', dy: '0.35em' });
      txt.textContent = L.used ? '✓' : (L.a.v === L.b.v ? '⇄' : '≡');
      badge.append(circ, txt);
      const open = function (e) { e.stopPropagation(); openLinkMenu(L, cv.mid); };
      [g, badge].forEach(function (el) {
        el.addEventListener('click', open);
        el.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
        el.addEventListener('pointerenter', function () { g.classList.add('hot'); });
        el.addEventListener('pointerleave', function () { g.classList.remove('hot'); });
      });
      badge.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); } });
      W.appendChild(g);
      badges.push(badge);
    });
    badges.forEach(function (b) { W.appendChild(b); });
    /* hover ghosts */
    if (hoverPort) {
      const from = portPt(hoverPort);
      const name = hoverPort.getAttribute('data-var'), cid = hoverPort.getAttribute('data-card');
      S.cards.forEach(function (o) {
        if (o.id === cid) return;
        const q = pt(o.id, name);
        if (!q) return;
        const ghost = svg('path', { d: curve(from, q).d, class: 'ghost-line' });
        ghost.style.stroke = col(name);
        W.appendChild(ghost);
      });
    }
    if (dragWire) {
      const temp = svg('path', { d: curve(dragWire.from, dragWire.to).d, class: 'temp-line' });
      temp.style.stroke = col(dragWire.v);
      W.appendChild(temp);
    }
  }

  /* ---------- Interaction: cards ---------- */
  let zTop = 1;
  function bindCardDrag(el, handle, c) {
    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('button')) return;
      e.preventDefault();
      closeMenu();
      const sx = e.clientX, sy = e.clientY, ox = c.x, oy = c.y;
      let moved = false;
      handle.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      el.style.zIndex = String(++zTop); // bring to front without moving the element in the DOM
      const move = function (ev) {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 3) return;
        if (!moved) { moved = true; snapshot(); }
        c.x = Math.max(0, Math.round(ox + dx)); c.y = Math.max(0, Math.round(oy + dy));
        place(el, c);
        drawWires();
      };
      const up = function () {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        el.classList.remove('dragging');
        if (moved) { save(); sizeCanvas(); drawWires(); }
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });
  }

  function deleteCard(id) {
    snapshot();
    S.cards = S.cards.filter(function (c) { return c.id !== id; });
    delete S.sel[id];
    if (S.graph && S.graph.card === id) S.graph = null;
    S.links = S.links.filter(function (L) { return L.a.c !== id && L.b.c !== id; });
    S.cards.forEach(function (c) { if (c.parents) c.parents = c.parents.filter(function (p) { return p !== id; }); });
    S.links.forEach(function (L) { if (L.used && L.used.results) L.used.results = L.used.results.filter(function (r) { return r !== id; }); });
    save(); closeMenu(); renderAll(false);
  }

  function editCard(c) {
    const el = els.get(c.id);
    if (!el) return;
    const body = el.querySelector('.eq-tex');
    const inp = h('input', { class: 'eq-input small', type: 'text', value: c.src, spellcheck: 'false', autocomplete: 'off', 'aria-label': 'Edit equation ' + label(c) });
    const msg = h('div', { class: 'eq-edit-msg' });
    const box = h('div', { class: 'eq-edit' }, [inp, msg]);
    body.replaceWith(box);
    inp.focus(); inp.select();
    let done = false;
    function finish(commit) {
      if (done) return;
      if (!commit || inp.value.trim() === c.src) { done = true; box.replaceWith(body); return; }
      call('parse_eq', [inp.value.trim(), c.mode || 'auto']).then(function (r) {
        if (!r.ok) { msg.textContent = r.error; inp.focus(); return; }
        done = true;
        snapshot();
        Object.assign(c, { src: inp.value.trim(), L: r.L, R: r.R, tex: r.tex, vars: r.vars });
        const names = new Set(r.vars.map(function (v) { return v.name; }));
        S.links = S.links.filter(function (L) { return !((L.a.c === c.id && !names.has(L.a.v)) || (L.b.c === c.id && !names.has(L.b.v))); });
        S.links.forEach(function (L) { if (L.a.c === c.id || L.b.c === c.id) L.used = null; });
        save();
        const nel = cardEl(c); el.replaceWith(nel); els.set(c.id, nel); PB.typeset(nel);
        renderAll(false);
      }, function () { msg.textContent = 'The algebra engine is not available.'; });
    }
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); finish(true); } if (e.key === 'Escape') { e.stopPropagation(); finish(false); } });
    inp.addEventListener('blur', function () { setTimeout(function () { finish(true); }, 120); });
  }

  /* ---------- Interaction: ports (variables) ---------- */
  let hoverPort = null, dragWire = null;
  function bindPort(p, c) {
    const name = p.getAttribute('data-var');
    p.addEventListener('pointerenter', function () { if (!dragWire) { hoverPort = p; highlight(name, true); drawWires(); } });
    p.addEventListener('pointerleave', function () { if (hoverPort === p) { hoverPort = null; highlight(name, false); drawWires(); } });
    p.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      closeMenu();
      const start = portPt(p), sx = e.clientX, sy = e.clientY;
      const br = ui.board.getBoundingClientRect(), bl = ui.board.clientLeft, bt = ui.board.clientTop;
      let moved = false, lastEv = null, frame = null, dropEl = null;
      p.setPointerCapture(e.pointerId);
      const tick = function () {
        frame = null;
        if (!lastEv || !ui) return;
        const ev = lastEv;
        dragWire = { from: start, to: { x: ev.clientX - br.left - bl + ui.board.scrollLeft, y: ev.clientY - br.top - bt + ui.board.scrollTop }, v: name };
        const t = targetAt(ev, c);
        if (t !== dropEl) { if (dropEl) dropEl.classList.remove('drop'); if (t) t.classList.add('drop'); dropEl = t; }
        autoScroll(ev, br);
        drawNow();
      };
      const move = function (ev) {
        if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
        moved = true;
        lastEv = ev;
        if (!frame) frame = requestAnimationFrame(tick);
      };
      const up = function (ev) {
        if (frame) { cancelAnimationFrame(frame); frame = null; }
        p.removeEventListener('pointermove', move);
        p.removeEventListener('pointerup', up);
        p.removeEventListener('pointercancel', up);
        ui.cards.querySelectorAll('.port.drop').forEach(function (q) { q.classList.remove('drop'); });
        if (moved) {
          dragWire = null;
          const t = ev.type === 'pointerup' ? targetAt(ev, c) : null;
          if (t) addLink({ c: c.id, v: name }, { c: t.getAttribute('data-card'), v: t.getAttribute('data-var') });
          else drawWires();
        } else portClick(p, c, name);
      };
      p.addEventListener('pointermove', move);
      p.addEventListener('pointerup', up);
      p.addEventListener('pointercancel', up);
    });
    p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); portClick(p, c, name); } });
  }
  function targetAt(ev, c) {
    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    const t = el && el.closest ? el.closest('.port') : null;
    return t && t.getAttribute('data-card') !== c.id ? t : null;
  }
  function autoScroll(ev, r) {
    const m = 30;
    if (ev.clientX > r.right - m) ui.board.scrollLeft += 12; else if (ev.clientX < r.left + m) ui.board.scrollLeft -= 12;
    if (ev.clientY > r.bottom - m) ui.board.scrollTop += 12; else if (ev.clientY < r.top + m) ui.board.scrollTop -= 12;
  }
  function highlight(name, on) {
    ui.cards.querySelectorAll('.port[data-var="' + cssEsc(name) + '"]').forEach(function (q) { q.classList.toggle('kin', on); });
  }
  function setPending(pd) {
    if (!ui) return;
    ui.pending = pd;
    ui.cards.querySelectorAll('.port.pending').forEach(function (q) { q.classList.remove('pending'); });
    ui.wrap.classList.toggle('linking', !!pd);
    if (pd) { const p = portEl(pd.c, pd.v); if (p) p.classList.add('pending'); }
    setHint();
  }
  function portClick(p, c, name) {
    if (ui.pending) {
      const pd = ui.pending;
      setPending(null);
      if (pd.c !== c.id) addLink(pd, { c: c.id, v: name });
      return;
    }
    const tex = vtex(c, name);
    const items = [];
    items.push(menuBtn('Solve ' + label(c) + ' for $' + tex + '$', function (btn) { solveFor(c, name, btn); }, true));
    if (c.vars.length > 1) items.push(menuBtn('Graph $' + tex + '$ against another quantity', function () { openGraph(c, name); }));
    const others = S.cards.filter(function (o) { return o.id !== c.id && varOf(o, name) && !linkBetween({ c: c.id, v: name }, { c: o.id, v: name }); });
    others.slice(0, 6).forEach(function (o) {
      items.push(menuBtn('Link to $' + tex + '$ in ' + label(o), function () { closeMenu(); addLink({ c: c.id, v: name }, { c: o.id, v: name }); }));
    });
    items.push(menuBtn('Link to a different variable…', function () { closeMenu(); setPending({ c: c.id, v: name }); }));
    items.push(menuBtn(canBeNeg(name) ? 'Treat $' + tex + '$ as positive' : 'Allow $' + tex + '$ to be negative', function () { closeMenu(); toggleSign(name); }));
    items.push(menuBtn('Rename $' + tex + '$ in ' + label(c) + ' only…', function () { openRename(c, name, p); }));
    items.push(menuBtn('Enter a value for $' + tex + '$', function () {
      closeMenu();
      const inp = ui.knownList.querySelector('input[data-var="' + cssEsc(name) + '"]');
      if (inp) { inp.scrollIntoView({ block: 'nearest' }); inp.focus(); }
    }));
    const r = rel(p);
    const mean = meaningOf(c, name);
    openMenu('$' + tex + '$ in ' + label(c) + (mean ? '<span class="menu-mean">' + esc(meanText(mean)) + '</span>' : ''), items, { x: r.x, y: r.y + r.h + 6 }, p);
  }

  /* ---------- Menus ---------- */
  function menuBtn(html, fn, primary) {
    const b = h('button', { class: 'menu-item' + (primary ? ' primary' : ''), type: 'button', html: html });
    b.addEventListener('click', function () { fn(b); });
    return b;
  }
  function openMenu(titleHtml, items, at, returnFocus) {
    closeMenu();
    const msg = h('div', { class: 'menu-msg', hidden: true, role: 'alert' });
    const m = h('div', { class: 'board-menu', role: 'dialog', 'aria-label': 'Options' }, [h('div', { class: 'menu-title', html: titleHtml })].concat(items, [msg]));
    m.style.left = Math.max(6, at.x) + 'px';
    m.style.top = at.y + 'px';
    m._msg = msg;
    m._return = returnFocus;
    ui.canvas.appendChild(m);
    PB.typeset(m);
    /* keep it inside the canvas horizontally */
    requestAnimationFrame(function () {
      if (!m.isConnected) return;
      const cw = ui.canvas.clientWidth, mw = m.offsetWidth;
      if (m.offsetLeft + mw > cw - 6) m.style.left = Math.max(6, cw - mw - 6) + 'px';
      const first = m.querySelector('.menu-item');
      if (first) first.focus({ preventScroll: true });
      const r = m.getBoundingClientRect(), br = ui.board.getBoundingClientRect();
      if (r.bottom > br.bottom) ui.board.scrollTop += r.bottom - br.bottom + 10;
    });
    m.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); closeMenu(true); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const list = Array.from(m.querySelectorAll('.menu-item'));
        const i = list.indexOf(document.activeElement);
        const n = list[(i + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length];
        if (n) n.focus();
      }
    });
    ui.menu = m;
    return m;
  }
  function closeMenu(restore) {
    if (!ui || !ui.menu) return;
    const r = ui.menu._return;
    ui.menu.remove(); ui.menu = null;
    if (restore && r && r.isConnected && r.focus) r.focus();
  }
  function menuError(text) {
    if (!ui || !ui.menu) { toast(text); return; }
    ui.menu._msg.hidden = false;
    ui.menu._msg.innerHTML = text;
    PB.typeset(ui.menu._msg);
  }
  function busy(btn, on) { if (btn) { btn.disabled = on; btn.classList.toggle('busy', on); } }

  /* ---------- Links ---------- */
  function linkBetween(a, b) {
    return S.links.find(function (L) { return (L.a.c === a.c && L.a.v === a.v && L.b.c === b.c && L.b.v === b.v) || (L.a.c === b.c && L.a.v === b.v && L.b.c === a.c && L.b.v === a.v); });
  }
  function addLink(a, b) {
    if (a.c === b.c) return;
    let L = linkBetween(a, b);
    if (!L) {
      snapshot();
      L = { id: 'l' + (S.seq++), a: a, b: b, used: null };
      S.links.push(L);
      save();
      setHint();
    }
    drawNow();
    const A = pt(a.c, a.v), B = pt(b.c, b.v);
    const mid = A && B ? curve(A, B).mid : { x: 40, y: 40 };
    openLinkMenu(L, mid);
  }
  function openLinkMenu(L, mid) {
    const A = card(L.a.c), B = card(L.b.c);
    if (!A || !B) return;
    const ta = vtex(A, L.a.v), tb = vtex(B, L.b.v);
    const same = L.a.v === L.b.v;
    const title = same ? 'Link: $' + ta + '$ in ' + label(A) + ' and ' + label(B)
      : 'Link: $' + ta + '$ in ' + label(A) + ' is the same quantity as $' + tb + '$ in ' + label(B);
    const items = [
      menuBtn('Use ' + label(A) + ' to replace $' + tb + '$ in ' + label(B), function (btn) { applyLink(L, true, btn); }, true),
      menuBtn('Use ' + label(B) + ' to replace $' + ta + '$ in ' + label(A), function (btn) { applyLink(L, false, btn); })
    ];
    const ma = meaningOf(A, L.a.v), mb = meaningOf(B, L.b.v);
    if (ma && mb && ma[0] !== mb[0]) {
      items.unshift(h('div', { class: 'menu-note warn', html: 'Careful: $' + ta + '$ in ' + label(A) + ' is ' + esc(ma[0]) + ', but $' + tb + '$ in ' + label(B) + ' is ' + esc(mb[0]) + '. Only link them if they really are the same quantity.' }));
    }
    if (L.used && L.used.results && L.used.results.length) {
      const res = L.used.results.map(card).filter(Boolean);
      if (res.length) items.unshift(h('div', { class: 'menu-note', html: 'Already used: gave ' + res.map(label).join(', ') + '.' }));
    }
    items.push(menuBtn('Remove link', function () {
      snapshot();
      S.links = S.links.filter(function (x) { return x !== L; });
      save(); closeMenu(); drawWires(); setHint();
    }));
    openMenu(title, items, { x: mid.x - 120, y: mid.y + 16 });
  }

  function applyLink(L, forward, btn) {
    const src = forward ? L.a : L.b, dst = forward ? L.b : L.a;
    const A = card(src.c), B = card(dst.c);
    busy(btn, true);
    call('substitute', [A.L, A.R, src.v, B.L, B.R, dst.v, label(A), label(B)]).then(function (r) {
      busy(btn, false);
      if (!r.ok) { menuError(r.error); return; }
      snapshot();
      const via = (src.v === dst.v ? 'eliminate $' + vtex(A, src.v) + '$' : '$' + vtex(A, src.v) + ' \\equiv ' + vtex(B, dst.v) + '$') + ': ' + label(A) + ' → ' + label(B);
      const made = r.results.map(function (res, i) {
        const nc = newCard(res, { parents: [A.id, B.id], via: via, near: [A, B], offset: i });
        inheritMeaning(nc, [B, A]);
        return nc;
      });
      L.used = { from: A.id, to: B.id, results: made.map(function (c) { return c.id; }) };
      save(); closeMenu(); renderAll(false);
      flash(made);
    }, function () { busy(btn, false); menuError('The algebra engine is not available. ' + engine.msg); });
  }

  function solveFor(c, name, btn) {
    busy(btn, true);
    call('solve_for', [c.L, c.R, name]).then(function (r) {
      busy(btn, false);
      if (!r.ok) { menuError(r.error); return; }
      snapshot();
      const made = r.results.map(function (res, i) {
        const nc = newCard(res, { parents: [c.id], via: 'rearrange ' + label(c) + ' for $' + vtex(c, name) + '$', near: [c], offset: i });
        inheritMeaning(nc, [c]);
        return nc;
      });
      save(); closeMenu(); renderAll(false);
      flash(made);
    }, function () { busy(btn, false); menuError('The algebra engine is not available. ' + engine.msg); });
  }

  function flash(cards) {
    requestAnimationFrame(function () {
      cards.forEach(function (c, i) {
        const el = els.get(c.id);
        if (!el) return;
        el.classList.add('fresh');
        setTimeout(function () { el.classList.remove('fresh'); }, 1600);
        if (i === 0) el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      });
    });
  }

  /* ---------- Creating cards ---------- */
  function sizeOf(c) { return gOf(c); }
  function overlaps(x, y, w, ht, skip) {
    return S.cards.some(function (o) {
      if (o === skip) return false;
      const s = sizeOf(o);
      return x < o.x + s.w + 16 && x + w + 16 > o.x && y < o.y + s.h + 16 && y + ht + 16 > o.y;
    });
  }
  function freeSpot(x, y, w, ht) {
    for (let i = 0; i < 60; i++) {
      if (!overlaps(x, y, w, ht)) return { x: x, y: y };
      y += 40;
      if (i % 12 === 11) { x += 140; y -= 480; if (y < 16) y = 16; }
    }
    return { x: x, y: y };
  }
  function newCard(res, o) {
    o = o || {};
    let x = 24, y = 24;
    if (o.near && o.near.length) {
      const right = Math.max.apply(null, o.near.map(function (c) { return c.x + sizeOf(c).w; }));
      const top = o.near.reduce(function (a, c) { return a + c.y; }, 0) / o.near.length;
      x = right + 70; y = Math.round(top + (o.offset || 0) * 200);
      /* no room to the right in the visible board: go below the parents instead */
      const bw = ui ? ui.board.clientWidth : 900;
      if (x + 260 > Math.max(bw, 600) - 16) {
        x = Math.min.apply(null, o.near.map(function (c) { return c.x; }));
        y = Math.max.apply(null, o.near.map(function (c) { return c.y + sizeOf(c).h; })) + 60;
        x += (o.offset || 0) * 320;
      }
    } else {
      const bw = ui ? ui.board.clientWidth : 900;
      let placed = false;
      for (let row = 0; row < 30 && !placed; row++) for (let col2 = 0; col2 * 300 + 280 < Math.max(bw, 600) && !placed; col2++) {
        if (!overlaps(24 + col2 * 300, 24 + row * 190, 260, 150)) { x = 24 + col2 * 300; y = 24 + row * 190; placed = true; }
      }
    }
    const spot = freeSpot(x, y, 260, 150);
    const c = { id: 'c' + (S.seq++), n: S.next++, src: o.src != null ? o.src : null, L: res.L, R: res.R, tex: res.tex, vars: res.vars, calc: !!res.calc,
      x: spot.x, y: spot.y, parents: o.parents || [], via: o.via || '', steps: res.steps || [] };
    S.cards.push(c);
    return c;
  }
  function addEquation(text, mode) {
    return call('parse_eq', [text, mode || 'auto']).then(function (r) {
      if (!r.ok) {
        if (ui) { ui.preview.className = 'eq-preview err'; ui.preview.textContent = r.error; }
        return false;
      }
      snapshot();
      const c = newCard(r, { src: text });
      if (mode) c.mode = mode;
      const known = libEntryFor(text);
      if (known) { c.meaning = meaningsOf(known); c.title = known.title; }
      save(); renderAll(false); flash([c]);
      return true;
    }, function () {
      if (ui) { ui.preview.className = 'eq-preview err'; ui.preview.textContent = 'The algebra engine is not available. ' + engine.msg; }
      return false;
    });
  }
  function loadExample(ex) {
    call('parse_eq', ['x = 1']).then(function () {
      const parsed = ex.eqs.map(function (t) { return engine.api('parse_eq', [t]); });
      if (parsed.some(function (r) { return !r.ok; })) return;
      if (S.cards.length) snapshot();
      S = Object.assign(fresh(), { deg: S.deg, signs: S.signs || {} });
      const made = parsed.map(function (r, i) {
        const c = newCard(r, { src: ex.eqs[i] });
        const known = libEntryFor(ex.eqs[i]);
        if (known) { c.meaning = meaningsOf(known); c.title = known.title; }
        c.x = 24 + i * 300; c.y = 24 + (i % 2) * 40;
        return c;
      });
      ex.links.forEach(function (l) { S.links.push({ id: 'l' + (S.seq++), a: { c: made[l[0]].id, v: l[1] }, b: { c: made[l[2]].id, v: l[3] }, used: null }); });
      save(); closeMenu(); renderAll(true);
      toast(ex.name + ': ' + ex.note + (undoStack.length ? ' Undo restores your old board.' : ''));
    }, function () {});
  }

  /* the shared toast lays out its children in a row, so keep each message in one element */
  function toast(html) { PB.toast('<span>' + html + '</span>'); }

  /* ---------- Meanings: telling apart quantities that share a letter ---------- */
  function esc(t) { return String(t).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  const GREEK_U = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ', lamda: 'λ', lambda: 'λ',
    mu: 'μ', nu: 'ν', xi: 'ξ', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ',
    Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω', hbar: 'ħ' };
  function nameText(n) {
    let pre = '';
    if (/^Delta./.test(n)) { pre = 'Δ'; n = n.slice(5).replace(/^_/, ''); }
    const parts = n.split('_');
    const sub = parts.slice(1).map(function (q) { return GREEK_U[q] || q; }).join(',');
    return pre + (GREEK_U[parts[0]] || parts[0]) + (sub ? '_' + sub : '');
  }
  function nameHtml(n) {
    let pre = '';
    if (/^Delta./.test(n)) { pre = 'Δ'; n = n.slice(5).replace(/^_/, ''); }
    const parts = n.split('_');
    const sub = parts.slice(1).map(function (q) { return GREEK_U[q] || q; }).join(',');
    return pre + '<i>' + esc(GREEK_U[parts[0]] || parts[0]) + '</i>' + (sub ? '<sub>' + esc(sub) + '</sub>' : '');
  }
  function meaningOf(c, name) { return c && c.meaning ? c.meaning[name] || null : null; }
  function meanText(m) { return m[0] + (m[1] ? ' (' + m[1] + ')' : ''); }
  function meaningsOf(entry) { const m = {}; entry.vars.forEach(function (v) { m[v[0]] = [v[1], v[2], v[3]]; }); return m; }
  function normEq(t) { return String(t).replace(/\s+/g, ''); }
  function libEntryFor(text) {
    const n = normEq(text);
    return (PB.EQ_LIBRARY || []).find(function (e) { return normEq(e.eq) === n; }) || null;
  }
  function inheritMeaning(nc, parents) {
    const m = {};
    nc.vars.forEach(function (v) {
      for (let i = 0; i < parents.length; i++) { const pm = meaningOf(parents[i], v.name); if (pm) { m[v.name] = pm; break; } }
    });
    if (Object.keys(m).length) nc.meaning = m;
  }
  /* name -> meaning of that letter on the board, from cards whose meanings are known */
  function boardMeanings(skipId) {
    const out = {};
    S.cards.forEach(function (c) {
      if (c.id === skipId || !c.meaning) return;
      Object.keys(c.meaning).forEach(function (n) { if (!out[n] && varOf(c, n)) out[n] = { m: c.meaning[n], c: c }; });
    });
    return out;
  }
  function nameInUse(n) { return S.cards.some(function (c) { return varOf(c, n); }); }
  function freshName(name, tag, meaning, bm) {
    const tries = [];
    if (tag && tag.length >= 3 && tag !== name && !/^\d+$/.test(tag)) tries.push(name + '_' + tag);
    for (let k = 2; k < 30; k++) tries.push(name + '_' + k);
    for (let i = 0; i < tries.length; i++) {
      const t = tries[i], o = bm[t];
      if (o && o.m[0] === meaning) return t;   // the same quantity is already on the board: reuse its name
      if (!o && !nameInUse(t)) return t;
    }
    return name + '_' + Date.now() % 1000;
  }

  /* ---------- Equation lookup ---------- */
  function buildLibrary(panel) {
    if (panel._input) { setTimeout(function () { panel._input.focus(); }, 0); return; }
    const LIB = PB.EQ_LIBRARY || [];
    const topics = [];
    LIB.forEach(function (e) { if (topics.indexOf(e.topic) < 0) topics.push(e.topic); });
    const index = LIB.map(function (e) {
      return { e: e, title: e.title.toLowerCase(), meta: (e.topic + ' ' + e.kw).toLowerCase(), names: e.vars.map(function (v) { return v[0]; }),
        lnames: e.vars.map(function (v) { return v[0].toLowerCase(); }), means: e.vars.map(function (v) { return v[1]; }).join(' ').toLowerCase(), eq: e.eq };
    });
    let topic = 'All', limit = 30, timer = null;
    const inp = h('input', { type: 'search', class: 'eq-input lib-search', spellcheck: 'false', autocomplete: 'off',
      placeholder: 'Search ' + LIB.length + ' equations: try pendulum, heat, capacitor, Q, theta or derivative', 'aria-label': 'Search the equation library' });
    const chips = h('div', { class: 'lib-topics', role: 'group', 'aria-label': 'Filter by topic' });
    ['All'].concat(topics).forEach(function (t) {
      chips.appendChild(h('button', { class: 'lib-topic', type: 'button', 'aria-pressed': t === topic ? 'true' : 'false', text: t, onclick: function () {
        topic = t; limit = 30;
        chips.querySelectorAll('.lib-topic').forEach(function (b) { b.setAttribute('aria-pressed', b.textContent === t ? 'true' : 'false'); });
        run();
      } }));
    });
    const count = h('p', { class: 'panel-note', 'aria-live': 'polite' });
    const list = h('div', { class: 'lib-results' });
    const more = h('button', { class: 'btn small ghost', type: 'button', text: 'Show more', hidden: true, onclick: function () { limit += 30; run(); } });
    function score(x, toks) {
      let total = 0;
      for (let i = 0; i < toks.length; i++) {
        const tok = toks[i], tl = tok.toLowerCase();
        let s = 0;
        if (x.names.indexOf(tok) >= 0) s += 5; else if (x.lnames.indexOf(tl) >= 0) s += 2;
        if (tok.length > 1) {
          if (x.title.indexOf(tl) >= 0) s += 3 + (x.title.indexOf(tl) === 0 || x.title.indexOf(' ' + tl) > 0 && x.title.split(' ').length <= 3 ? 1 : 0);
          if (x.means.indexOf(tl) >= 0) s += 1.5;
          if (x.meta.indexOf(tl) >= 0) s += 1;
          if (x.eq.indexOf(tok) >= 0) s += 0.5;
        }
        if (!s) return 0;
        total += s;
      }
      return total;
    }
    function run() {
      const q = inp.value.trim();
      const toks = q ? q.split(/\s+/) : [];
      let hits = index.filter(function (x) { return topic === 'All' || x.e.topic === topic; })
        .map(function (x, i) { return { x: x, s: toks.length ? score(x, toks) : 1, i: i }; })
        .filter(function (r) { return r.s > 0; });
      hits.sort(function (a, b) { return b.s - a.s || a.i - b.i; });
      count.textContent = hits.length ? (hits.length + ' equation' + (hits.length === 1 ? '' : 's') + (q ? ' match' + (hits.length === 1 ? 'es' : '') : '')) : 'Nothing matches. Try a quantity (heat, current), a symbol (Q) or a topic.';
      list.innerHTML = '';
      hits.slice(0, limit).forEach(function (r) {
        const e = r.x.e;
        const legend = h('div', { class: 'li-vars' });
        e.vars.forEach(function (v) { legend.appendChild(h('span', { html: nameHtml(v[0]) + ' ' + esc(v[1]) + (v[2] ? ' <span class="u">' + esc(v[2]) + '</span>' : '') })); });
        const add = h('button', { class: 'btn small primary', type: 'button', text: 'Add', 'aria-label': 'Add ' + e.title + ' to the board', onclick: function () { addLibrary(e, add); } });
        list.appendChild(h('div', { class: 'lib-item' }, [
          h('div', { class: 'li-main' }, [
            h('div', { class: 'li-head' }, [h('b', { text: e.title }), h('span', { class: 'li-topic', text: e.topic })]),
            h('div', { class: 'li-tex', html: '$' + e.tex + '$' }),
            legend
          ]),
          add
        ]));
      });
      more.hidden = hits.length <= limit;
      PB.typeset(list);
    }
    inp.addEventListener('input', function () { clearTimeout(timer); limit = 30; timer = setTimeout(run, 140); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); const b = list.querySelector('.btn.primary'); if (b) b.click(); } });
    panel.append(h('div', { class: 'lib-bar' }, [inp]), chips, count, list, more);
    panel._input = inp;
    run();
    setTimeout(function () { inp.focus(); }, 0);
  }

  function addLibrary(entry, btn) {
    busy(btn, true);
    return call('parse_eq', [entry.eq, 'plain']).then(function (r) {
      busy(btn, false);
      if (!r.ok) { toast(esc(r.error)); return; }
      const meaning = meaningsOf(entry);
      const bm = boardMeanings();
      const notes = [];
      let res = r;
      r.vars.forEach(function (v) {
        const m = meaning[v.name], other = bm[v.name];
        if (!m || !other || other.m[0] === m[0]) return;
        const nn = freshName(v.name, m[2], m[0], bm);
        const rr = engine.api('rename', [res.L, res.R, v.name, nn]);
        if (!rr.ok) return;
        res = rr;
        meaning[rr.name] = m;
        delete meaning[v.name];
        notes.push(nameHtml(v.name) + ' here is ' + esc(m[0]) + ', but ' + nameHtml(v.name) + ' on the board is ' + esc(other.m[0]) + ', so this one is ' + nameHtml(rr.name) + '.');
      });
      snapshot();
      const c = newCard(res, { src: notes.length ? null : entry.eq });
      c.meaning = meaning;
      c.title = entry.title;
      save(); renderAll(false); flash([c]);
      if (notes.length) toast(notes.join(' ') + ' Undo puts it back.');
    }, function () { busy(btn, false); toast('The algebra engine is not available.'); });
  }

  /* ---------- Rename a variable in one card ---------- */
  function openRename(c, name, anchor) {
    const inp = h('input', { class: 'eq-input small', type: 'text', value: name + '_', spellcheck: 'false', autocomplete: 'off', 'aria-label': 'New name for ' + name });
    const ok = h('button', { class: 'btn small primary', type: 'button', text: 'Rename' });
    const box = h('div', { class: 'rename-box' }, [
      h('p', { class: 'panel-note', html: 'Only ' + label(c) + ' changes. Use a subscript to tell quantities apart, like <i>Q</i><sub>heat</sub> (type <code>Q_heat</code>) or <i>v</i><sub>1</sub>.' }),
      h('div', { class: 'rename-row' }, [inp, ok])
    ]);
    const r = rel(anchor);
    openMenu('Rename $' + vtex(c, name) + '$ in ' + label(c), [box], { x: r.x, y: r.y + r.h + 6 }, anchor);
    setTimeout(function () { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }, 30);
    const go = function () { renameVar(c, name, inp.value.trim(), ok); };
    ok.addEventListener('click', go);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
  }
  function renameVar(c, old, nn, btn) {
    if (!nn || nn === old) { closeMenu(); return; }
    busy(btn, true);
    call('rename', [c.L, c.R, old, nn]).then(function (r) {
      busy(btn, false);
      if (!r.ok) { menuError(esc(r.error)); return; }
      if (varOf(c, r.name)) { menuError('This equation already has ' + esc(r.name) + '.'); return; }
      snapshot();
      Object.assign(c, { L: r.L, R: r.R, tex: r.tex, vars: r.vars, src: null });
      if (c.meaning && c.meaning[old]) { c.meaning[r.name] = c.meaning[old]; delete c.meaning[old]; }
      S.links.forEach(function (L) {
        if (L.a.c === c.id && L.a.v === old) L.a.v = r.name;
        if (L.b.c === c.id && L.b.v === old) L.b.v = r.name;
      });
      if (S.graph && S.graph.card === c.id) { if (S.graph.y === old) S.graph.y = r.name; if (S.graph.x === old) S.graph.x = r.name; }
      save(); closeMenu();
      rerenderCard(c);
      renderAll(false);
      if (S.graph && S.graph.card === c.id) renderGraph();
      toast(nameHtml(old) + ' in ' + label(c) + ' is now ' + nameHtml(r.name) + '. Its known value is now separate.');
    }, function () { busy(btn, false); menuError('The algebra engine is not available.'); });
  }

  /* ---------- Evaluate derivatives and integrals ---------- */
  function evalCalc(c) {
    call('eval_calculus', [c.L, c.R]).then(function (r) {
      if (!r.ok) { toast(esc(r.error)); return; }
      snapshot();
      const made = r.results.map(function (res, i) {
        const nc = newCard(res, { parents: [c.id], via: 'evaluate calculus in ' + label(c), near: [c], offset: i });
        inheritMeaning(nc, [c]);
        return nc;
      });
      save(); renderAll(false); flash(made);
    }, function () { toast('The algebra engine is not available.'); });
  }

  /* ---------- Graphs ---------- */
  function openGraph(c, yname) {
    closeMenu();
    const others = c.vars.map(function (v) { return v.name; }).filter(function (n) { return n !== yname; });
    const prefer = ['t', 'x', 'theta', 'r', 'v', 'L', 'm'];
    let x = others.find(function (n) { return prefer.indexOf(n) >= 0 && S.knowns[n] == null; }) || others.find(function (n) { return S.knowns[n] == null; }) || others[0];
    S.graph = { card: c.id, y: yname, x: x, params: {}, range: null };
    save();
    renderGraph(true);
  }
  function niceStep(span, n) {
    const raw = span / Math.max(1, n), mag = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / mag;
    return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
  }
  function defaultRange(name, pos) {
    const k = S.knowns[name];
    if (/^theta|^phi|^alpha/.test(name)) return S.deg ? [0, 90] : [0, Math.PI / 2];
    if (k != null && k !== 0) return pos ? [0, 2 * Math.abs(k)] : [-2 * Math.abs(k), 2 * Math.abs(k)];
    return pos ? [0, 10] : [-10, 10];
  }
  function renderGraph(scroll) {
    if (!ui) return;
    const panel = ui.graph, G = S.graph;
    const c = G ? card(G.card) : null;
    if (!G || !c) { panel.hidden = true; panel.innerHTML = ''; return; }
    panel.hidden = false;
    panel.innerHTML = '';
    const ySel = h('select', { class: 'ex-select', 'aria-label': 'Quantity on the vertical axis' });
    const xSel = h('select', { class: 'ex-select', 'aria-label': 'Quantity on the horizontal axis' });
    c.vars.forEach(function (v) {
      ySel.appendChild(h('option', { value: v.name, text: nameText(v.name) }));
      if (v.name !== G.y) xSel.appendChild(h('option', { value: v.name, text: nameText(v.name) }));
    });
    ySel.value = G.y; xSel.value = G.x;
    const lo = h('input', { class: 'g-num', type: 'text', inputmode: 'decimal', 'aria-label': 'Smallest value on the horizontal axis' });
    const hi = h('input', { class: 'g-num', type: 'text', inputmode: 'decimal', 'aria-label': 'Largest value on the horizontal axis' });
    const close = h('button', { class: 'eq-x', type: 'button', 'aria-label': 'Close the graph', html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      onclick: function () { S.graph = null; save(); renderGraph(); } });
    const cv = h('canvas', { class: 'g-canvas', role: 'img', 'aria-label': 'Graph' });
    const readout = h('div', { class: 'g-readout', 'aria-live': 'off' });
    const params = h('div', { class: 'g-params' });
    const msg = h('p', { class: 'panel-note' });
    const formula = h('div', { class: 'g-formula' });
    panel.append(
      h('div', { class: 'g-head' }, [h('h3', { html: 'Graph from ' + label(c) }), formula, close]),
      h('div', { class: 'g-controls' }, [
        h('label', {}, ['Plot ', ySel]), h('label', {}, ['against ', xSel]),
        h('label', { class: 'g-range' }, ['from ', lo, ' to ', hi]),
        h('button', { class: 'btn small ghost', type: 'button', text: 'Reset', title: 'Back to the known values and the default range', onclick: function () { G.params = {}; G.range = null; save(); renderGraph(); } })
      ]),
      h('div', { class: 'g-body' }, [h('div', { class: 'g-plot' }, [cv, readout]), params]),
      msg
    );
    ySel.addEventListener('change', function () { G.y = ySel.value; if (G.x === G.y) G.x = c.vars.map(function (v) { return v.name; }).find(function (n) { return n !== G.y; }); G.range = null; save(); renderGraph(); });
    xSel.addEventListener('change', function () { G.x = xSel.value; G.range = null; save(); renderGraph(); });
    if (scroll) setTimeout(function () { panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 50);
    msg.textContent = 'Working out the curve…';
    call('graph_fn', [c.L, c.R, G.y, G.x, !!S.deg]).then(function (r) {
      if (!ui || ui.graph !== panel || S.graph !== G) return;
      if (!r.ok) { msg.className = 'panel-note err'; msg.textContent = r.error; cv.hidden = true; return; }
      msg.className = 'panel-note';
      msg.innerHTML = 'Other quantities start at their known values (or 1); drag the sliders to see how the curve changes. ' +
        (S.knowns[G.y] != null ? 'The dashed line is the known value of ' + nameHtml(G.y) + '; where it meets the curve is the answer. ' : '') +
        (S.knowns[G.x] != null ? 'The dot marks the known ' + nameHtml(G.x) + '.' : '');
      formula.innerHTML = r.branch_tex.map(function (t) { return '$' + t + '$'; }).join(', ');
      PB.typeset(formula);
      let fns;
      try {
        fns = r.branches.map(function (code) { return new Function(r.params.map(function (q) { return q.js; }).join(','), 'return (' + code + ');'); });
      } catch (e) { msg.textContent = 'This curve could not be drawn.'; return; }
      const xp = r.params[0];
      const range = G.range || defaultRange(G.x, xp.pos);
      lo.value = PB.fmt(range[0], 4); hi.value = PB.fmt(range[1], 4);
      const setRange = function () {
        const a = PB.parseNumber(lo.value), b = PB.parseNumber(hi.value);
        if (a == null || b == null || !(b > a)) { lo.classList.toggle('bad', a == null); hi.classList.toggle('bad', !(b > a)); return; }
        lo.classList.remove('bad'); hi.classList.remove('bad');
        G.range = [a, b]; save(); draw();
      };
      lo.addEventListener('change', setRange); hi.addEventListener('change', setRange);
      const vals = {};
      r.params.slice(1).forEach(function (q) {
        const start = G.params[q.name] != null ? G.params[q.name] : (S.knowns[q.name] != null ? S.knowns[q.name] : 1);
        vals[q.name] = start;
        const span = Math.max(Math.abs(start) * 2, 1);
        const min = q.pos ? 0 : -span, max = span;
        const slider = h('input', { type: 'range', min: String(min), max: String(max), step: String((max - min) / 400), value: String(start), 'aria-label': 'Value of ' + q.name });
        const box = h('input', { class: 'g-num', type: 'text', inputmode: 'decimal', value: PB.fmt(start, 4), 'aria-label': 'Value of ' + q.name });
        slider.addEventListener('input', function () { vals[q.name] = +slider.value; box.value = PB.fmt(+slider.value, 4); G.params[q.name] = +slider.value; draw(); });
        slider.addEventListener('change', save);
        box.addEventListener('change', function () {
          const v = PB.parseNumber(box.value);
          if (v == null) { box.classList.add('bad'); return; }
          box.classList.remove('bad');
          vals[q.name] = v; G.params[q.name] = v;
          if (v > +slider.max) slider.max = String(v * 2);
          if (v < +slider.min) slider.min = String(v * 2);
          slider.step = String((+slider.max - +slider.min) / 400);
          slider.value = String(v);
          save(); draw();
        });
        const row = h('div', { class: 'g-param' }, [h('span', { class: 'g-sym', html: '$' + q.tex + '$' }), slider, box]);
        row.style.setProperty('--vc', col(q.name));
        params.appendChild(row);
      });
      if (r.params.length < 2) params.appendChild(h('p', { class: 'panel-note', text: 'No other quantities: this curve is fixed.' }));
      PB.typeset(params);
      let hover = null;
      function args(x) { return [x].concat(r.params.slice(1).map(function (q) { return vals[q.name]; })); }
      function draw() { drawPlot(cv, { fns: fns, args: args, range: G.range || range, yname: G.y, xname: G.x, hover: hover }); }
      cv.onpointermove = function (e) { const b = cv.getBoundingClientRect(); hover = e.clientX - b.left; draw(); };
      cv.onpointerleave = function () { hover = null; readout.textContent = ''; draw(); };
      cv._readout = readout;
      draw();
      if (panel._ro) panel._ro.disconnect();
      panel._ro = new ResizeObserver(function () { if (panel.isConnected) draw(); });
      panel._ro.observe(cv);
    }, function () { msg.textContent = 'The algebra engine is not available.'; });
  }

  function drawPlot(cv, o) {
    const W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return;
    const dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const cs = getComputedStyle(document.documentElement);
    const ink = cs.getPropertyValue('--ink').trim(), ink3 = cs.getPropertyValue('--ink-3').trim(), line = cs.getPropertyValue('--line').trim();
    const pts = cs.getPropertyValue('--points').trim(), wl = cs.getPropertyValue('--wire-l').trim() || '45%';
    const curveCol = 'hsl(' + hue(o.yname) + ' 72% ' + wl + ')';
    const x0 = o.range[0], x1 = o.range[1];
    const ml = 58, mr = 14, mt = 12, mb = 36, pw = W - ml - mr, ph = H - mt - mb;
    const N = Math.max(120, Math.min(800, Math.round(pw)));
    const series = o.fns.map(function (f) {
      const out = [];
      for (let i = 0; i <= N; i++) {
        const x = x0 + (x1 - x0) * i / N;
        let y;
        try { y = f.apply(null, o.args(x)); } catch (e) { y = NaN; }
        out.push([x, typeof y === 'number' && isFinite(y) ? y : NaN]);
      }
      return out;
    });
    const ky = S.knowns[o.yname], kx = S.knowns[o.xname];
    let ys = [];
    series.forEach(function (sr) { sr.forEach(function (p) { if (!isNaN(p[1])) ys.push(p[1]); }); });
    if (!ys.length) {
      ctx.fillStyle = ink3; ctx.font = '13px ' + cs.getPropertyValue('--f-ui');
      ctx.fillText('No real values in this range. Try a different range or slider values.', ml, mt + 20);
      return;
    }
    ys.sort(function (a, b) { return a - b; });
    let y0 = ys[Math.floor(ys.length * 0.02)], y1 = ys[Math.ceil(ys.length * 0.98) - 1];
    if (ky != null) { y0 = Math.min(y0, ky); y1 = Math.max(y1, ky); }
    if (y0 > 0 && y0 < (y1 - y0) * 0.6) y0 = 0;
    if (y1 < 0 && -y1 < (y1 - y0) * 0.6) y1 = 0;
    if (y1 - y0 < 1e-12 * Math.max(1, Math.abs(y0))) { y0 -= Math.abs(y0) * 0.5 || 1; y1 += Math.abs(y1) * 0.5 || 1; }
    const pad = (y1 - y0) * 0.08; y0 -= pad; y1 += pad;
    const X = function (x) { return ml + (x - x0) / (x1 - x0) * pw; };
    const Y = function (y) { return mt + (1 - (y - y0) / (y1 - y0)) * ph; };
    ctx.font = '11.5px ' + (cs.getPropertyValue('--f-mono') || 'monospace');
    ctx.lineWidth = 1;
    const sx = niceStep(x1 - x0, Math.max(3, Math.floor(pw / 90))), sy = niceStep(y1 - y0, Math.max(3, Math.floor(ph / 50)));
    ctx.strokeStyle = line; ctx.fillStyle = ink3; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + sx * 1e-9; x += sx) {
      ctx.beginPath(); ctx.moveTo(X(x), mt); ctx.lineTo(X(x), mt + ph); ctx.stroke();
      ctx.fillText(PB.fmt(Math.abs(x) < sx * 1e-6 ? 0 : x, 3), X(x), mt + ph + 6);
    }
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + sy * 1e-9; y += sy) {
      ctx.beginPath(); ctx.moveTo(ml, Y(y)); ctx.lineTo(ml + pw, Y(y)); ctx.stroke();
      ctx.fillText(PB.fmt(Math.abs(y) < sy * 1e-6 ? 0 : y, 3), ml - 6, Y(y));
    }
    ctx.strokeStyle = ink3; ctx.lineWidth = 1.2;
    if (y0 < 0 && y1 > 0) { ctx.beginPath(); ctx.moveTo(ml, Y(0)); ctx.lineTo(ml + pw, Y(0)); ctx.stroke(); }
    if (x0 < 0 && x1 > 0) { ctx.beginPath(); ctx.moveTo(X(0), mt); ctx.lineTo(X(0), mt + ph); ctx.stroke(); }
    ctx.fillStyle = ink; ctx.font = '600 12.5px ' + cs.getPropertyValue('--f-ui');
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText(nameText(o.xname) + ' →', ml + pw, H - 2);
    ctx.save(); ctx.translate(12, mt); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillText(nameText(o.yname) + ' →', 0, 0); ctx.restore();
    ctx.save();
    ctx.beginPath(); ctx.rect(ml, mt, pw, ph); ctx.clip();
    if (ky != null) {
      ctx.setLineDash([6, 5]); ctx.strokeStyle = pts; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(ml, Y(ky)); ctx.lineTo(ml + pw, Y(ky)); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.strokeStyle = curveCol; ctx.lineWidth = 2.4; ctx.lineJoin = 'round';
    const jump = (y1 - y0) * 1.5;
    series.forEach(function (sr) {
      ctx.beginPath();
      let pen = false, prev = null;
      sr.forEach(function (p) {
        if (isNaN(p[1]) || (prev != null && Math.abs(p[1] - prev) > jump)) { pen = false; prev = isNaN(p[1]) ? null : p[1]; if (isNaN(p[1])) return; }
        if (!pen) { ctx.moveTo(X(p[0]), Y(p[1])); pen = true; } else ctx.lineTo(X(p[0]), Y(p[1]));
        prev = p[1];
      });
      ctx.stroke();
    });
    if (kx != null && kx >= x0 && kx <= x1) {
      o.fns.forEach(function (f) {
        let y; try { y = f.apply(null, o.args(kx)); } catch (e) { y = NaN; }
        if (!isFinite(y)) return;
        ctx.fillStyle = pts; ctx.beginPath(); ctx.arc(X(kx), Y(y), 5, 0, Math.PI * 2); ctx.fill();
      });
    }
    ctx.restore();
    if (o.hover != null && o.hover >= ml && o.hover <= ml + pw) {
      const x = x0 + (o.hover - ml) / pw * (x1 - x0);
      ctx.strokeStyle = ink3; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(o.hover, mt); ctx.lineTo(o.hover, mt + ph); ctx.stroke(); ctx.setLineDash([]);
      const vals = [];
      o.fns.forEach(function (f) {
        let y; try { y = f.apply(null, o.args(x)); } catch (e) { y = NaN; }
        if (!isFinite(y)) return;
        vals.push(PB.fmt(y, 4));
        ctx.fillStyle = curveCol; ctx.beginPath(); ctx.arc(o.hover, Y(y), 4, 0, Math.PI * 2); ctx.fill();
      });
      if (cv._readout) cv._readout.textContent = nameText(o.xname) + ' = ' + PB.fmt(x, 4) + '   ' + nameText(o.yname) + ' = ' + (vals.join(' or ') || 'none');
    }
  }

  /* ---------- Equation maker (MathLive visual editor) ---------- */
  function finePointer() { return !window.matchMedia || window.matchMedia('(pointer: fine)').matches; }
  function buildMaker(panel) {
    if (panel._mf) { if (finePointer()) setTimeout(function () { panel._mf.focus(); }, 0); return; }
    if (panel._loading) return;
    panel._loading = true;
    panel.innerHTML = '';
    const status = h('p', { class: 'panel-note', text: 'Loading the equation maker…' });
    panel.appendChild(status);
    loadMathLive().then(function () {
      panel._loading = false;
      panel.innerHTML = '';
      const mf = new window.MathfieldElement();
      mf.setAttribute('aria-label', 'Equation maker');
      mf.className = 'maker-field';
      mf.smartFence = true;
      const pv = h('div', { class: 'eq-preview maker-preview', 'aria-live': 'polite' });
      const add = h('button', { class: 'btn primary small', type: 'button', text: 'Add to board' });
      const keep = function (e) { e.preventDefault(); }; // MathLive will not take focus back from a button, so never give it away
      const kb = h('button', { class: 'btn small', type: 'button', text: 'Keyboard', onpointerdown: keep });
      const clr = h('button', { class: 'btn small ghost', type: 'button', text: 'Clear', onpointerdown: keep });
      const INSERTS = [['a/b', '\\frac{#@}{#?}', 'Fraction'], ['x_□', '#@_{#?}', 'Subscript'], ['x^□', '#@^{#?}', 'Power'], ['√', '\\sqrt{#?}', 'Square root'],
        ['d/dt', '\\frac{d#?}{dt}', 'Derivative with respect to t'], ['d²/dt²', '\\frac{d^2#?}{dt^2}', 'Second derivative'], ['ẋ', '\\dot{#?}', 'Time derivative (dot)'],
        ['∫ᵃᵇ', '\\int_{#?}^{#?}#?\\,dx', 'Definite integral'], ['∫', '\\int #?\\,dx', 'Indefinite integral'],
        ['f(t)', '#?(t)', 'Quantity as a function of t'], ['sin', '\\sin(#?)', 'Sine'], ['cos', '\\cos(#?)', 'Cosine'], ['eˣ', 'e^{#?}', 'Exponential'], ['ln', '\\ln(#?)', 'Natural log'],
        ['Δ', '\\Delta ', 'Delta (change in)'], ['θ', '\\theta', 'theta'], ['ω', '\\omega', 'omega'], ['λ', '\\lambda', 'lambda']];
      const bar = h('div', { class: 'maker-bar', role: 'toolbar', 'aria-label': 'Insert' });
      INSERTS.forEach(function (it) {
        bar.appendChild(h('button', { class: 'maker-ins', type: 'button', text: it[0], title: it[2], 'aria-label': 'Insert ' + it[2],
          onpointerdown: function (e) { e.preventDefault(); }, // keep the caret where it is in the field
          onclick: function () {
          if (!mf.hasFocus()) mf.focus();
          mf.executeCommand(['insert', it[1], { selectionMode: 'placeholder' }]);
          preview();
        } }));
      });
      panel.append(
        h('p', { class: 'panel-note', html: 'Build the equation visually. Type <kbd>/</kbd> for a fraction, <kbd>^</kbd> for a power, <kbd>_</kbd> for a subscript, <kbd>sqrt</kbd> for a root, and Greek names such as <kbd>theta</kbd> or <kbd>omega</kbd>. Letters side by side multiply, so <i>mgh</i> means <i>m·g·h</i>; write a multi-letter name as a subscript (<i>v</i><sub>max</sub>). The buttons insert derivatives, integrals and functions such as <i>x</i>(<i>t</i>).' }),
        bar, mf, pv, h('div', { class: 'maker-actions' }, [add, kb, clr])
      );
      panel._mf = mf;
      let t = null;
      function preview() {
        clearTimeout(t);
        t = setTimeout(function () {
          const latex = mf.value.trim();
          if (!latex) { pv.textContent = ''; pv.className = 'eq-preview maker-preview'; return; }
          if (engine.state !== 'ready') return;
          syncSigns(engine.api);
          const r = engine.api('parse_eq', [latex, 'latex']);
          if (r.ok) { pv.className = 'eq-preview maker-preview'; pv.innerHTML = '<span class="pv-k">Reads as</span> $' + r.tex + '$'; PB.typeset(pv); }
          else if (latex.indexOf('=') >= 0) { pv.className = 'eq-preview maker-preview err'; pv.textContent = r.error; }
          else { pv.className = 'eq-preview maker-preview'; pv.textContent = 'Add an = sign.'; }
        }, 250);
      }
      function submit() {
        const latex = mf.value.trim();
        if (!latex) { mf.focus(); return; }
        addEquation(latex, 'latex').then(function (ok) {
          if (ok) { mf.value = ''; pv.textContent = ''; mf.focus(); }
          else { pv.className = 'eq-preview maker-preview err'; pv.textContent = ui && ui.preview.textContent; ui.preview.textContent = ''; }
        });
      }
      mf.addEventListener('input', preview);
      mf.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); submit(); } }, true);
      add.addEventListener('click', submit);
      clr.addEventListener('click', function () { mf.value = ''; preview(); mf.focus(); });
      kb.addEventListener('click', function () {
        mf.focus();
        const vk = window.mathVirtualKeyboard;
        if (vk) { if (vk.visible) vk.hide(); else vk.show(); }
      });
      /* on touch screens the math keyboard would cover the field, so wait for a tap and keep the field in view */
      mf.addEventListener('focus', function () { setTimeout(function () { mf.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 350); });
      if (finePointer()) setTimeout(function () { mf.focus(); }, 0);
    }, function (e) {
      panel._loading = false;
      status.className = 'panel-note err';
      status.textContent = e.message + ' You can still type LaTeX into the box above.';
    });
  }

  /* ---------- Selecting and exporting LaTeX ---------- */
  function toggleSelect(id, on) {
    const v = on == null ? !S.sel[id] : on;
    if (v) S.sel[id] = true; else delete S.sel[id];
    const el = els.get(id);
    if (el) {
      el.classList.toggle('selected', v);
      const b = el.querySelector('.eq-pick');
      if (b) b.setAttribute('aria-pressed', v ? 'true' : 'false');
    }
    save();
    if (ui && !ui.exporter.hidden) renderExport();
    updateExportBtn();
  }
  function updateExportBtn() {
    if (!ui) return;
    const n = S.cards.filter(function (c) { return S.sel[c.id]; }).length;
    ui.exportBtn.textContent = n ? 'Export LaTeX (' + n + ')' : 'Export LaTeX';
  }
  const ENVS = [['equation', 'equation (one per card)'], ['equation*', 'equation* (unnumbered)'], ['align', 'align (one block)'], ['align*', 'align* (one block)'],
    ['gather', 'gather (one block)'], ['dmath', '\\[ … \\] (display math)']];
  function plainVia(c) {
    return (c.via || 'given').replace(/\$/g, '').replace(/→/g, '->').replace(/\\equiv/g, '=');
  }
  function latexExport(cards, o) {
    const out = ['% Exported from the Physbook equation board' + (o.env !== 'dmath' ? ' (needs \\usepackage{amsmath})' : '')];
    const lab = function (c) { return o.label && !/\*$/.test(o.env) && o.env !== 'dmath' ? '\\label{eq:' + c.n + '}' : ''; };
    if (o.env === 'equation' || o.env === 'equation*' || o.env === 'dmath') {
      cards.forEach(function (c) {
        out.push('');
        if (o.notes) out.push('% (' + c.n + ') ' + plainVia(c));
        if (o.env === 'dmath') { out.push('\\[ ' + c.tex + ' \\]'); return; }
        out.push('\\begin{' + o.env + '}', '  ' + c.tex);
        if (lab(c)) out.push('  ' + lab(c));
        out.push('\\end{' + o.env + '}');
      });
    } else {
      out.push('', '\\begin{' + o.env + '}');
      cards.forEach(function (c, i) {
        if (o.notes) out.push('  % (' + c.n + ') ' + plainVia(c));
        let t = c.tex;
        if (/^align/.test(o.env)) { const k = t.indexOf(' = '); if (k >= 0) t = t.slice(0, k) + ' &= ' + t.slice(k + 3); }
        out.push('  ' + t + (lab(c) ? ' ' + lab(c) : '') + (i < cards.length - 1 ? ' \\\\' : ''));
      });
      out.push('\\end{' + o.env + '}');
    }
    return out.join('\n') + '\n';
  }
  function renderExport() {
    if (!ui) return;
    const panel = ui.exporter;
    const o = S.exportOpts = Object.assign({ env: 'equation', label: true, notes: false }, S.exportOpts || {});
    const chosen = S.cards.filter(function (c) { return S.sel[c.id]; }).sort(function (a, b) { return a.n - b.n; });
    panel.innerHTML = '';
    const envSel = h('select', { class: 'ex-select', 'aria-label': 'LaTeX environment' });
    ENVS.forEach(function (e) { envSel.appendChild(h('option', { value: e[0], text: e[1] })); });
    envSel.value = o.env;
    const labBox = h('input', { type: 'checkbox' }); labBox.checked = o.label;
    const noteBox = h('input', { type: 'checkbox' }); noteBox.checked = o.notes;
    const ta = h('textarea', { class: 'export-out', readonly: true, spellcheck: 'false', 'aria-label': 'Exported LaTeX' });
    const msg = h('span', { class: 'panel-note', 'aria-live': 'polite' });
    function refresh() {
      o.env = envSel.value; o.label = labBox.checked; o.notes = noteBox.checked; save();
      ta.value = chosen.length ? latexExport(chosen, o) : '';
      ta.placeholder = 'Tick the box at the top left of each card you want, or press Select all.';
    }
    [envSel, labBox, noteBox].forEach(function (el) { el.addEventListener('change', refresh); });
    const copy = h('button', { class: 'btn primary small', type: 'button', text: 'Copy', onclick: function () {
      if (!ta.value) return;
      const done = function () { msg.textContent = 'Copied.'; };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); document.execCommand('copy'); done(); });
      else { ta.select(); document.execCommand('copy'); done(); }
    } });
    const dl = h('button', { class: 'btn small', type: 'button', text: 'Download .tex', onclick: function () {
      if (!ta.value) return;
      const a = h('a', { href: URL.createObjectURL(new Blob([ta.value], { type: 'text/x-tex' })), download: 'equations.tex' });
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    } });
    panel.append(
      h('div', { class: 'export-top' }, [
        h('b', { text: chosen.length + ' of ' + S.cards.length + ' equations selected' }),
        h('button', { class: 'btn small ghost', type: 'button', text: 'Select all', onclick: function () { S.cards.forEach(function (c) { toggleSelect(c.id, true); }); } }),
        h('button', { class: 'btn small ghost', type: 'button', text: 'Select none', onclick: function () { S.cards.forEach(function (c) { toggleSelect(c.id, false); }); } })
      ]),
      h('div', { class: 'export-opts' }, [
        h('label', {}, ['Environment ', envSel]),
        h('label', { class: 'chk' }, [labBox, ' \\label{eq:n}']),
        h('label', { class: 'chk' }, [noteBox, ' Comment where each came from'])
      ]),
      ta,
      h('div', { class: 'maker-actions' }, [copy, dl, msg])
    );
    refresh();
  }

  /* ---------- Known values and numerical answers ---------- */
  function renderKnowns() {
    if (!ui) return;
    const vars = allVars();
    const box = ui.knownList;
    const key = vars.map(function (v) { return v.name; }).join('|');
    Object.keys(S.knowns).forEach(function (k) { if (!vars.some(function (v) { return v.name === k; })) { delete S.knowns[k]; delete S.knownFrom[k]; } });
    if (box._key === key) { syncKnownInputs(); return; }
    box._key = key;
    box.innerHTML = '';
    if (!vars.length) { box.appendChild(h('p', { class: 'side-empty', text: 'Variables from your equations appear here.' })); return; }
    vars.forEach(function (v) {
      const inp = h('input', { type: 'text', inputmode: 'decimal', 'data-var': v.name, autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Value of ' + v.name, placeholder: '?' });
      const from = h('span', { class: 'kfrom' });
      const clr = h('button', { class: 'kclear', type: 'button', 'aria-label': 'Clear ' + v.name, text: '×', onclick: function () { inp.value = ''; setKnown(v.name, ''); } });
      inp.addEventListener('input', function () { setKnown(v.name, inp.value); });
      const sign = h('button', { class: 'ksign', type: 'button', text: '±', title: 'Allow negative values', 'aria-label': 'Allow ' + v.name + ' to be negative', 'aria-pressed': 'false',
        onclick: function (e) { e.preventDefault(); toggleSign(v.name); } });
      const bmv = boardMeanings()[v.name];
      const row = h('label', { class: 'known', title: bmv ? meanText(bmv.m) : null }, [h('span', { class: 'ksym', html: '$' + v.tex + '$' }), inp, sign, clr, from]);
      row.style.setProperty('--vc', col(v.name));
      box.appendChild(row);
    });
    syncKnownInputs();
    PB.typeset(box);
  }
  function syncKnownInputs() {
    ui.knownList.querySelectorAll('.known').forEach(function (row) {
      const inp = row.querySelector('input'), name = inp.getAttribute('data-var');
      const v = S.knowns[name];
      if (document.activeElement !== inp) inp.value = v == null ? '' : (S.knownFrom[name] ? PB.fmt(v, 5) : (inp._raw != null && PB.parseNumber(inp._raw) === v ? inp._raw : String(v)));
      const src = S.knownFrom[name] ? card(S.knownFrom[name]) : null;
      const neg = canBeNeg(name);
      row.querySelector('.ksign').setAttribute('aria-pressed', neg ? 'true' : 'false');
      const kf = row.querySelector('.kfrom');
      kf.classList.toggle('warn', v != null && v < 0 && !neg);
      kf.textContent = v != null && v < 0 && !neg ? 'negative, but set as positive: press ±' : (src ? 'from ' + label(src) : '');
      row.classList.toggle('has', v != null);
    });
  }
  function setKnown(name, raw) {
    const inp = ui.knownList.querySelector('input[data-var="' + cssEsc(name) + '"]');
    if (inp) inp._raw = raw;
    const v = PB.parseNumber(raw);
    if (v == null || !isFinite(v)) delete S.knowns[name]; else S.knowns[name] = v;
    delete S.knownFrom[name];
    if (inp) inp.classList.toggle('bad', raw.trim() !== '' && (v == null || !isFinite(v)));
    save(); syncKnownInputs(); evaluateAll();
    graphSoon();
  }
  let graphTimer = null;
  function graphSoon() { clearTimeout(graphTimer); graphTimer = setTimeout(function () { if (ui && S.graph && !ui.graph.hidden) renderGraph(); }, 400); }

  let evalTimer = null;
  function evaluateAll() {
    clearTimeout(evalTimer);
    evalTimer = setTimeout(evalNow, 120);
  }
  function evalNow() {
    if (!ui || engine.state !== 'ready') return;
    const anyKnown = Object.keys(S.knowns).length > 0;
    let synced = false;
    S.cards.forEach(function (c) {
      const el = els.get(c.id);
      if (!el) return;
      const out = el.querySelector('.eq-eval');
      const relevant = anyKnown && c.vars.some(function (v) { return S.knowns[v.name] != null; });
      if (!relevant) { out.hidden = true; out.innerHTML = ''; return; }
      const kn = {};
      c.vars.forEach(function (v) { if (S.knowns[v.name] != null) kn[v.name] = S.knowns[v.name]; });
      if (!synced) { syncSigns(engine.api); synced = true; }
      const r = engine.api('evaluate', [c.L, c.R, JSON.stringify(kn), !!S.deg]);
      out.hidden = false; out.innerHTML = ''; out.className = 'eq-eval';
      if (!r.ok) { out.textContent = r.error; return; }
      if (r.kind === 'value') {
        if (!r.values.length) { out.classList.add('warn'); out.innerHTML = 'No positive value of $' + r.tex + '$ fits these numbers.'; }
        else r.values.forEach(function (x) {
          const already = S.knowns[r.name] != null && Math.abs(S.knowns[r.name] - x) <= 1e-9 * Math.max(1, Math.abs(x));
          out.append(h('span', { class: 'ev-val', html: '$' + r.tex + ' = ' + texNum(x) + '$' + (S.deg && /theta|phi|alpha|beta/.test(r.name) ? '°' : '') }));
          if (!already && r.name) out.append(h('button', { class: 'ev-use', type: 'button', text: 'Use', title: 'Add this to the known values', onclick: function () {
            S.knowns[r.name] = x; S.knownFrom[r.name] = c.id; save(); syncKnownInputs(); evaluateAll(); graphSoon();
          } }));
        });
      } else if (r.kind === 'need') {
        out.classList.add('need');
        out.innerHTML = 'Know ' + (r.unknowns.length - 1) + ' more of ' + r.unknowns.map(function (u) { return '$' + u.tex + '$'; }).join(', ') + ' to get a number';
      } else if (r.kind === 'check') {
        out.classList.add(r.consistent ? 'good' : 'warn');
        out.textContent = r.consistent ? '✓ These values satisfy the equation' : '✗ These values do not satisfy the equation';
      }
      PB.typeset(out);
    });
  }
  function texNum(x) {
    const s = PB.fmt(x, 4);
    const m = s.match(/^(-?[\d.]+)e(-?\d+)$/);
    return m ? m[1] + '\\times 10^{' + m[2] + '}' : s;
  }

  PB.views = PB.views || {};
  PB.views.solver = view;
  if (decodeURIComponent((location.hash || '').replace(/^#/, '')) === 'solver') view();
})();
