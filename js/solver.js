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

  /* ---------- Equation library (plain input text, display TeX) ---------- */
  const LIBRARY = [
    ['Kinematics', [
      ['v = u + a*t', 'v = u + at'], ['s = u*t + 1/2*a*t^2', 's = ut + \\tfrac12 at^2'],
      ['v^2 = u^2 + 2*a*s', 'v^2 = u^2 + 2as'], ['s = (u + v)/2*t', 's = \\tfrac{u+v}{2}t'],
      ['x = v_0*cos(theta)*t', 'x = v_0\\cos\\theta\\, t'], ['y = v_0*sin(theta)*t - 1/2*g*t^2', 'y = v_0\\sin\\theta\\,t - \\tfrac12 gt^2']]],
    ['Forces', [
      ['F = m*a', 'F = ma'], ['W = m*g', 'W = mg'], ['f = mu*N', 'f = \\mu N'], ['N = m*g*cos(theta)', 'N = mg\\cos\\theta'],
      ['p = m*v', 'p = mv'], ['F*t = m*v - m*u', 'Ft = mv - mu']]],
    ['Energy', [
      ['KE = 1/2*m*v^2', 'KE = \\tfrac12 mv^2'], ['PE = m*g*h', 'PE = mgh'], ['m*g*h = 1/2*m*v^2', 'mgh = \\tfrac12 mv^2'],
      ['W = F*d*cos(theta)', 'W = Fd\\cos\\theta'], ['P = W/t', 'P = W/t'], ['E_s = 1/2*k*x^2', 'E_s = \\tfrac12 kx^2']]],
    ['Circular & rotation', [
      ['a_c = v^2/r', 'a_c = v^2/r'], ['F_c = m*v^2/r', 'F_c = mv^2/r'], ['v = omega*r', 'v = \\omega r'], ['T = 2*pi*r/v', 'T = 2\\pi r/v'],
      ['tau = I*alpha', '\\tau = I\\alpha'], ['L = I*omega', 'L = I\\omega'], ['KE_r = 1/2*I*omega^2', 'KE_r = \\tfrac12 I\\omega^2']]],
    ['Gravitation', [
      ['F = G*M*m/r^2', 'F = GMm/r^2'], ['g = G*M/R^2', 'g = GM/R^2'], ['T^2 = 4*pi^2*r^3/(G*M)', 'T^2 = 4\\pi^2 r^3/GM'],
      ['U = -G*M*m/r', 'U = -GMm/r'], ['v_e = sqrt(2*G*M/R)', 'v_e = \\sqrt{2GM/R}']]],
    ['Oscillations & waves', [
      ['T = 2*pi*sqrt(m/k)', 'T = 2\\pi\\sqrt{m/k}'], ['T = 2*pi*sqrt(L/g)', 'T = 2\\pi\\sqrt{L/g}'], ['omega = 2*pi*f', '\\omega = 2\\pi f'],
      ['f = 1/T', 'f = 1/T'], ['v = f*lambda', 'v = f\\lambda'], ['v = sqrt(T_s/mu)', 'v = \\sqrt{T_s/\\mu}']]],
    ['Thermal', [
      ['P*V = n*R*T', 'PV = nRT'], ['Q = m*c*DeltaT', 'Q = mc\\Delta T'], ['Q = m*L_f', 'Q = mL_f'], ['eta = 1 - T_c/T_h', '\\eta = 1 - T_c/T_h']]],
    ['Electricity & magnetism', [
      ['V = I*R', 'V = IR'], ['P = I*V', 'P = IV'], ['Q = C*V', 'Q = CV'], ['F = k*q_1*q_2/r^2', 'F = kq_1q_2/r^2'], ['E = V/d', 'E = V/d'],
      ['F = q*v*B', 'F = qvB'], ['r = m*v/(q*B)', 'r = mv/qB'], ['F = B*I*l', 'F = BIl'], ['epsilon = B*l*v', '\\varepsilon = Blv']]],
    ['Optics & modern', [
      ['n_1*sin(theta_1) = n_2*sin(theta_2)', 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2'], ['1/f = 1/u + 1/v', '\\tfrac1f = \\tfrac1u + \\tfrac1v'],
      ['E = h*f', 'E = hf'], ['E = m*c^2', 'E = mc^2'], ['lambda = h/p', '\\lambda = h/p'], ['KE_max = h*f - phi', 'KE_{max} = hf - \\phi'],
      ['N = N_0*e^(-lambda*t)', 'N = N_0e^{-\\lambda t}']]]
  ];

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
    PB.toast(canBeNeg(name) ? name + ' may now be negative. New results keep negative roots for it.' : name + ' is treated as positive again.');
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
    const libBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Equation library' });
    const makerBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Equation maker' });
    const exportBtn = h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false', text: 'Export LaTeX' });
    const maker = h('div', { class: 'eq-panel eq-maker', hidden: true });
    const exporter = h('div', { class: 'eq-panel eq-export', hidden: true });
    const exSel = h('select', { class: 'ex-select', 'aria-label': 'Load an example board' }, [h('option', { value: '', text: 'Load an example…' })]);
    EXAMPLES.forEach(function (ex, i) { exSel.appendChild(h('option', { value: String(i), text: ex.name })); });
    const degBtn = h('button', { class: 'btn small', type: 'button', 'aria-pressed': S.deg ? 'true' : 'false' });
    const undoBtn = h('button', { class: 'btn small', type: 'button', text: 'Undo', disabled: !undoStack.length });
    const clearBtn = h('button', { class: 'btn small warn', type: 'button', text: 'Clear board' });
    const lib = h('div', { class: 'eq-lib', hidden: true });
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
      h('div', { class: 'board-wrap' }, [board, side])
    ]);

    ui = { wrap: wrap, board: board, canvas: canvas, prov: prov, wires: wires, cards: cardsLayer, empty: empty, knownList: knownList,
      input: input, addBtn: addBtn, preview: preview, exporter: exporter, exportBtn: exportBtn, status: status, undoBtn: undoBtn, hint: hint, degBtn: degBtn, menu: null, pending: null };

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

    /* library */
    LIBRARY.forEach(function (grp) {
      const row = h('div', { class: 'lib-row' });
      grp[1].forEach(function (eq) {
        row.appendChild(h('button', { class: 'lib-eq', type: 'button', title: eq[0], html: '$' + eq[1] + '$', onclick: function () { addEquation(eq[0]); } }));
      });
      lib.appendChild(h('div', { class: 'lib-grp' }, [h('div', { class: 'lib-name', text: grp[0] }), row]));
    });
    let libTypeset = false;
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
      if (lib.hidden) showPanel(libBtn, true);
      else { showPanel(libBtn, false); return; }
      if (!lib.hidden && !libTypeset) { libTypeset = true; PB.typeset(lib); }
    });

    exSel.addEventListener('change', function () {
      const ex = EXAMPLES[+exSel.value];
      exSel.value = '';
      if (ex) loadExample(ex);
    });
    function degLabel() { degBtn.textContent = S.deg ? 'Angles: degrees' : 'Angles: radians'; degBtn.setAttribute('aria-pressed', S.deg ? 'true' : 'false'); }
    degLabel();
    degBtn.addEventListener('click', function () { S.deg = !S.deg; save(); degLabel(); evaluateAll(); });
    undoBtn.addEventListener('click', undo);
    clearBtn.addEventListener('click', function () {
      if (!S.cards.length) return;
      snapshot();
      S = Object.assign(fresh(), { deg: S.deg });
      save(); closeMenu(); renderAll(true);
      PB.toast('Board cleared. Press Undo to bring it back.');
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
    loadEngine().then(evaluateAll, function () {});
  }

  /* ---------- Rendering ---------- */
  function renderAll(full) {
    if (!ui) return;
    if (full) { els.forEach(function (el) { el.remove(); }); els.clear(); }
    const ids = new Set(S.cards.map(function (c) { return c.id; }));
    els.forEach(function (el, id) { if (!ids.has(id)) { el.remove(); els.delete(id); } });
    S.cards.forEach(function (c) { if (!els.has(c.id)) { const el = cardEl(c); els.set(c.id, el); ui.cards.appendChild(el); PB.typeset(el); } });
    ui.empty.hidden = S.cards.length > 0;
    updateExportBtn();
    if (!ui.exporter.hidden) renderExport();
    renderKnowns();
    sizeCanvas();
    drawWires();
    setHint();
    evaluateAll();
  }

  function cardEl(c) {
    const head = h('div', { class: 'eq-head' }, [
      h('span', { class: 'eq-num', text: label(c) }),
      h('span', { class: 'eq-origin', html: c.via ? c.via : 'given' })
    ]);
    const pick = h('button', { class: 'eq-pick', type: 'button', 'aria-pressed': S.sel[c.id] ? 'true' : 'false', title: 'Select for LaTeX export',
      'aria-label': 'Select equation ' + label(c) + ' for LaTeX export',
      html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path class="tick" d="M4.8 8.2l2.2 2.2 4.4-4.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onclick: function () { toggleSelect(c.id); } });
    head.insertBefore(pick, head.firstChild);
    if (c.src != null) head.appendChild(h('button', { class: 'eq-x', type: 'button', 'aria-label': 'Edit equation ' + label(c), title: 'Edit', html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M11 2.5l2.5 2.5L6 12.5H3.5V10z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>', onclick: function () { editCard(c); } }));
    head.appendChild(h('button', { class: 'eq-x', type: 'button', 'aria-label': 'Delete equation ' + label(c), title: 'Delete', html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>', onclick: function () { deleteCard(c.id); } }));
    const body = h('div', { class: 'eq-tex', html: '$$' + c.tex + '$$' });
    const ports = h('div', { class: 'eq-ports' });
    c.vars.forEach(function (v) {
      const p = h('button', { class: 'port', type: 'button', 'data-card': c.id, 'data-var': v.name, 'aria-label': 'Variable ' + v.name + ' in equation ' + label(c) + '. Drag to another card to link, or press for options.', html: '$' + v.tex + '$' });
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
      det.addEventListener('toggle', function () { sizeCanvas(); drawWires(); });
      el.appendChild(det);
    }
    el.appendChild(h('div', { class: 'eq-eval', hidden: true }));
    el.style.left = c.x + 'px';
    el.style.top = c.y + 'px';
    bindCardDrag(el, head, c);
    ports.querySelectorAll('.port').forEach(function (p) { bindPort(p, c); });
    new ResizeObserver(function () { if (ui) { drawWires(); } }).observe(el);
    return el;
  }

  function sizeCanvas() {
    if (!ui) return;
    let w = 0, ht = 0;
    els.forEach(function (el) { w = Math.max(w, el.offsetLeft + el.offsetWidth); ht = Math.max(ht, el.offsetTop + el.offsetHeight); });
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
  function portPt(p) { const r = rel(p); return { x: r.x + r.w / 2, y: r.y + r.h }; }
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
        const pe = els.get(pid), ce = els.get(c.id);
        if (!pe || !ce) return;
        const a = rel(pe), b = rel(ce);
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
      const pa = portEl(L.a.c, L.a.v), pb = portEl(L.b.c, L.b.v);
      if (!pa || !pb) return;
      let A = portPt(pa), B = portPt(pb);
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
      ui.cards.querySelectorAll('.port[data-var="' + cssEsc(name) + '"]').forEach(function (p) {
        if (p.getAttribute('data-card') === cid) return;
        const ghost = svg('path', { d: curve(from, portPt(p)).d, class: 'ghost-line' });
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
  function bindCardDrag(el, handle, c) {
    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('button')) return;
      e.preventDefault();
      closeMenu();
      const sx = e.clientX, sy = e.clientY, ox = c.x, oy = c.y;
      let moved = false;
      handle.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      ui.cards.appendChild(el); // bring to front
      const move = function (ev) {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 3) return;
        if (!moved) { moved = true; snapshot(); }
        c.x = Math.max(0, Math.round(ox + dx)); c.y = Math.max(0, Math.round(oy + dy));
        el.style.left = c.x + 'px'; el.style.top = c.y + 'px';
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
      let moved = false;
      p.setPointerCapture(e.pointerId);
      const move = function (ev) {
        if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
        moved = true;
        const a = ui.canvas.getBoundingClientRect();
        dragWire = { from: start, to: { x: ev.clientX - a.left, y: ev.clientY - a.top }, v: name };
        ui.cards.querySelectorAll('.port.drop').forEach(function (q) { q.classList.remove('drop'); });
        const t = targetAt(ev, c);
        if (t) t.classList.add('drop');
        autoScroll(ev);
        drawWires();
      };
      const up = function (ev) {
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
  function autoScroll(ev) {
    const r = ui.board.getBoundingClientRect(), m = 30;
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
    const others = S.cards.filter(function (o) { return o.id !== c.id && varOf(o, name) && !linkBetween({ c: c.id, v: name }, { c: o.id, v: name }); });
    others.slice(0, 6).forEach(function (o) {
      items.push(menuBtn('Link to $' + tex + '$ in ' + label(o), function () { closeMenu(); addLink({ c: c.id, v: name }, { c: o.id, v: name }); }));
    });
    items.push(menuBtn('Link to a different variable…', function () { closeMenu(); setPending({ c: c.id, v: name }); }));
    items.push(menuBtn(canBeNeg(name) ? 'Treat $' + tex + '$ as positive' : 'Allow $' + tex + '$ to be negative', function () { closeMenu(); toggleSign(name); }));
    items.push(menuBtn('Enter a value for $' + tex + '$', function () {
      closeMenu();
      const inp = ui.knownList.querySelector('input[data-var="' + cssEsc(name) + '"]');
      if (inp) { inp.scrollIntoView({ block: 'nearest' }); inp.focus(); }
    }));
    const r = rel(p);
    openMenu('$' + tex + '$ in ' + label(c), items, { x: r.x, y: r.y + r.h + 6 }, p);
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
    if (!ui || !ui.menu) { PB.toast(text); return; }
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
    const pa = portEl(a.c, a.v), pb = portEl(b.c, b.v);
    const mid = pa && pb ? curve(portPt(pa), portPt(pb)).mid : { x: 40, y: 40 };
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
        return newCard(res, { parents: [A.id, B.id], via: via, near: [A, B], offset: i });
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
        return newCard(res, { parents: [c.id], via: 'rearrange ' + label(c) + ' for $' + vtex(c, name) + '$', near: [c], offset: i });
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
  function sizeOf(c) { const el = els.get(c.id); return el ? { w: el.offsetWidth, h: el.offsetHeight } : { w: 260, h: 150 }; }
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
    const c = { id: 'c' + (S.seq++), n: S.next++, src: o.src != null ? o.src : null, L: res.L, R: res.R, tex: res.tex, vars: res.vars,
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
        c.x = 24 + i * 300; c.y = 24 + (i % 2) * 40;
        return c;
      });
      ex.links.forEach(function (l) { S.links.push({ id: 'l' + (S.seq++), a: { c: made[l[0]].id, v: l[1] }, b: { c: made[l[2]].id, v: l[3] }, used: null }); });
      save(); closeMenu(); renderAll(true);
      PB.toast(ex.name + ': ' + ex.note + (undoStack.length ? ' Undo restores your old board.' : ''));
    }, function () {});
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
      const kb = h('button', { class: 'btn small', type: 'button', text: 'Keyboard' });
      const clr = h('button', { class: 'btn small ghost', type: 'button', text: 'Clear' });
      panel.append(
        h('p', { class: 'panel-note', html: 'Build the equation visually. Type <kbd>/</kbd> for a fraction, <kbd>^</kbd> for a power, <kbd>_</kbd> for a subscript, <kbd>sqrt</kbd> for a root, and Greek names such as <kbd>theta</kbd> or <kbd>omega</kbd>. Letters side by side multiply, so <i>mgh</i> means <i>m·g·h</i>; write a multi-letter name as a subscript (<i>v</i><sub>max</sub>).' }),
        mf, pv, h('div', { class: 'maker-actions' }, [add, kb, clr])
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
      const row = h('label', { class: 'known' }, [h('span', { class: 'ksym', html: '$' + v.tex + '$' }), inp, sign, clr, from]);
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
  }

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
          if (!already) out.append(h('button', { class: 'ev-use', type: 'button', text: 'Use', title: 'Add this to the known values', onclick: function () {
            S.knowns[r.name] = x; S.knownFrom[r.name] = c.id; save(); syncKnownInputs(); evaluateAll();
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
