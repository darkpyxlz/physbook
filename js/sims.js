/* Scibook labs, part 1: shared drawing helpers and the mechanics labs (chapters 1–10). */
(function () {
  'use strict';
  const PB = window.PB;
  const U = (PB.simUtil = {});

  U.alpha = function (c, a) {
    c = (c || '').trim();
    if (c[0] !== '#') return c;
    let hx = c.slice(1);
    if (hx.length === 3) hx = hx.split('').map((x) => x + x).join('');
    const n = parseInt(hx, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };
  U.mono = (px, w) => `${w || 500} ${px}px "JetBrains Mono", ui-monospace, monospace`;
  U.ui = (px, w) => `${w || 600} ${px}px Archivo, "Helvetica Neue", Arial, sans-serif`;
  U.text = function (ctx, s, x, y, col, font, align, base) {
    ctx.fillStyle = col; ctx.font = font || U.mono(11); ctx.textAlign = align || 'left'; ctx.textBaseline = base || 'alphabetic';
    ctx.fillText(s, x, y);
  };
  U.arrow = function (ctx, x1, y1, x2, y2, col, lw, head) {
    lw = lw || 2; head = head || 8;
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    if (L < 1) return;
    const ux = dx / L, uy = dy / L, hd = Math.min(head, L * 0.6);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hd * 0.8, y2 - uy * hd * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * hd - uy * hd * 0.5, y2 - uy * hd + ux * hd * 0.5);
    ctx.lineTo(x2 - ux * hd + uy * hd * 0.5, y2 - uy * hd - ux * hd * 0.5);
    ctx.closePath(); ctx.fill();
  };
  U.ticks = function (a, b, n) {
    const span = b - a; if (!(span > 0)) return [a];
    const raw = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const st = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || raw;
    const out = []; for (let v = Math.ceil(a / st) * st; v <= b + st * 1e-9; v += st) out.push(Math.abs(v) < st * 1e-9 ? 0 : v);
    return out;
  };
  U.tickLabel = (v) => { const a = Math.abs(v); if (a !== 0 && (a >= 1e4 || a < 1e-2)) return v.toExponential(0); return String(+v.toPrecision(4)); };
  // Draws a plot frame and returns coordinate maps.
  U.frame = function (ctx, C, b, xr, yr, o) {
    o = o || {};
    const X = (v) => b.x + ((v - xr[0]) / (xr[1] - xr[0])) * b.w;
    const Y = (v) => b.y + b.h - ((v - yr[0]) / (yr[1] - yr[0])) * b.h;
    ctx.save();
    ctx.fillStyle = U.alpha(C.surface, 0.85); ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.lineWidth = 1;
    const xt = o.xticks || U.ticks(xr[0], xr[1], o.nx || 5), yt = o.yticks || U.ticks(yr[0], yr[1], o.ny || 4);
    ctx.strokeStyle = U.alpha(C.ink3, 0.18);
    xt.forEach((v) => { ctx.beginPath(); ctx.moveTo(X(v), b.y); ctx.lineTo(X(v), b.y + b.h); ctx.stroke(); });
    yt.forEach((v) => { ctx.beginPath(); ctx.moveTo(b.x, Y(v)); ctx.lineTo(b.x + b.w, Y(v)); ctx.stroke(); });
    ctx.strokeStyle = C.line; ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
    if (yr[0] < 0 && yr[1] > 0) { ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.beginPath(); ctx.moveTo(b.x, Y(0)); ctx.lineTo(b.x + b.w, Y(0)); ctx.stroke(); }
    if (!o.noLabels) {
      xt.forEach((v) => U.text(ctx, o.xfmt ? o.xfmt(v) : U.tickLabel(v), X(v), b.y + b.h + 13, C.ink3, U.mono(10), 'center'));
      yt.forEach((v) => U.text(ctx, o.yfmt ? o.yfmt(v) : U.tickLabel(v), b.x - 5, Y(v) + 3.5, C.ink3, U.mono(10), 'right'));
    }
    if (o.xlabel) U.text(ctx, o.xlabel, b.x + b.w, b.y + b.h + 26, C.ink2, U.ui(11), 'right');
    if (o.ylabel) U.text(ctx, o.ylabel, b.x + 4, b.y + 13, C.ink2, U.ui(11), 'left');
    ctx.restore();
    return { X: X, Y: Y };
  };
  U.curve = function (ctx, pts, col, lw, dash) {
    if (!pts.length) return;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw || 2; ctx.lineJoin = 'round';
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); let pen = false;
    pts.forEach((p) => { if (p == null || !isFinite(p[1]) || !isFinite(p[0])) { pen = false; return; } if (!pen) { ctx.moveTo(p[0], p[1]); pen = true; } else ctx.lineTo(p[0], p[1]); });
    ctx.stroke(); ctx.restore();
  };
  U.clip = function (ctx, b) { ctx.save(); ctx.beginPath(); ctx.rect(b.x, b.y, b.w, b.h); ctx.clip(); };
  U.dot = function (ctx, x, y, r, col, stroke) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); } };
  U.fmt = (x, s) => PB.fmt(x, s || 3);
  U.deg = Math.PI / 180;
  U.fact = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
  // Pointer helper: returns canvas-local coordinates.
  U.pointer = function (cv, handlers) {
    const el = cv.el;
    const pos = (e) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    let down = false;
    el.addEventListener('pointerdown', (e) => { down = true; el.setPointerCapture(e.pointerId); handlers.down && handlers.down(pos(e), e); });
    el.addEventListener('pointermove', (e) => { const p = pos(e); handlers.move && handlers.move(p, down, e); });
    el.addEventListener('pointerup', (e) => { down = false; handlers.up && handlers.up(pos(e), e); });
    el.addEventListener('pointerleave', () => { handlers.leave && handlers.leave(); });
  };

  /* =============== Ch1: Taylor approximation explorer =============== */
  PB.sims.taylor = function (api) {
    const cv = api.canvas(0.62);
    const binom = (a, n) => { let c = 1; for (let k = 0; k < n; k++) c *= (a - k) / (k + 1); return c; };
    const F = {
      sin: { f: Math.sin, c: (n) => (n % 2 ? Math.pow(-1, (n - 1) / 2) / U.fact(n) : 0), label: 'sin x', dom: [-6, 6] },
      cos: { f: Math.cos, c: (n) => (n % 2 ? 0 : Math.pow(-1, n / 2) / U.fact(n)), label: 'cos x', dom: [-6, 6] },
      exp: { f: Math.exp, c: (n) => 1 / U.fact(n), label: 'eˣ', dom: [-3, 3] },
      ln: { f: (x) => (x > -1 ? Math.log(1 + x) : NaN), c: (n) => (n === 0 ? 0 : Math.pow(-1, n + 1) / n), label: 'ln(1+x)', dom: [-1.5, 2] },
      sqrt: { f: (x) => (x >= -1 ? Math.sqrt(1 + x) : NaN), c: (n) => binom(0.5, n), label: '√(1+x)', dom: [-1.5, 3] },
      gamma: { f: (x) => (x < 1 ? 1 / Math.sqrt(1 - x) : NaN), c: (n) => binom(-0.5, n) * Math.pow(-1, n), label: '1/√(1−x)', dom: [-2, 1.2] },
      geo: { f: (x) => 1 / (1 - x), c: () => 1, label: '1/(1−x)', dom: [-2, 1.5] }
    };
    let fn = 'sin';
    const sel = api.select({ id: 'fn', label: 'Function', value: fn, options: [['sin', 'sin x'], ['cos', 'cos x'], ['exp', 'eˣ'], ['ln', 'ln(1 + x)'], ['sqrt', '√(1 + x)'], ['gamma', '1/√(1 − x)  (Lorentz γ with x = v²/c²)'], ['geo', '1/(1 − x)']], onChange: (v) => { fn = v; draw(); } });
    const ord = api.slider({ id: 'n', label: 'Order of polynomial N', min: 0, max: 10, step: 1, value: 3, format: (v) => String(v), onChange: draw });
    const x0 = api.slider({ id: 'x', label: 'Test point x', min: -2, max: 2, step: 0.01, value: 0.5, format: (v) => v.toFixed(2), onChange: draw });
    const out = api.readout();
    cv.onResize = draw;
    function poly(x, N) { let s = 0, p = 1; for (let n = 0; n <= N; n++) { s += F[fn].c(n) * p; p *= x; } return s; }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, f = F[fn];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 44, y: 14, w: cv.w - 58, h: cv.h - 44 };
      const xr = f.dom, yr = [-3, 3];
      const m = U.frame(ctx, C, b, xr, yr, { xlabel: 'x', ylabel: 'y' });
      U.clip(ctx, b);
      const N = ord.value, pts = [], pp = [];
      for (let i = 0; i <= 300; i++) { const x = xr[0] + ((xr[1] - xr[0]) * i) / 300; const y = f.f(x); pts.push(isFinite(y) && Math.abs(y) < 50 ? [m.X(x), m.Y(y)] : null); const q = poly(x, N); pp.push(Math.abs(q) < 50 ? [m.X(x), m.Y(q)] : null); }
      U.curve(ctx, pts, C.ink, 2.5);
      U.curve(ctx, pp, C.points, 2.5, [7, 5]);
      const xv = x0.value, yv = f.f(xv), pv = poly(xv, N);
      ctx.strokeStyle = U.alpha(C.accent, 0.5); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(m.X(xv), b.y); ctx.lineTo(m.X(xv), b.y + b.h); ctx.stroke(); ctx.setLineDash([]);
      if (isFinite(yv)) U.dot(ctx, m.X(xv), m.Y(yv), 4.5, C.ink);
      U.dot(ctx, m.X(xv), m.Y(pv), 4.5, C.points);
      ctx.restore();
      U.text(ctx, '— ' + f.label, b.x + 10, b.y + 18, C.ink, U.ui(12));
      U.text(ctx, '- - Taylor polynomial, order ' + N, b.x + 10, b.y + 34, C.points, U.ui(12));
      const terms = [];
      for (let n = 0; n <= N; n++) { const c = f.c(n); if (Math.abs(c) > 1e-12) terms.push((c > 0 && terms.length ? '+ ' : c < 0 ? '− ' : '') + (Math.abs(Math.abs(c) - 1) < 1e-12 && n > 0 ? '' : U.fmt(Math.abs(c), 3)) + (n ? 'x' + (n > 1 ? '<sup>' + n + '</sup>' : '') : '')); if (terms.length > 4) break; }
      const err = isFinite(yv) ? Math.abs((pv - yv) / (Math.abs(yv) > 1e-9 ? yv : 1)) : NaN;
      out([['f(x)', isFinite(yv) ? yv.toFixed(5) : 'undefined'], ['polynomial', pv.toFixed(5)], ['relative error', isFinite(err) ? (err * 100).toPrecision(3) + '%' : '—'], ['first terms', terms.join(' ') || '0']]);
    }
    draw();
  };

  /* =============== Ch1: Vector playground =============== */
  PB.sims.vectors = function (api) {
    const cv = api.canvas(0.62);
    const a = api.slider({ id: 'am', label: '|A|', min: 0, max: 5, step: 0.1, value: 3, onChange: draw });
    const at = api.slider({ id: 'at', label: 'Angle of A', min: -180, max: 180, step: 1, value: 20, unit: '°', onChange: draw });
    const b = api.slider({ id: 'bm', label: '|B|', min: 0, max: 5, step: 0.1, value: 2.5, onChange: draw });
    const bt = api.slider({ id: 'bt', label: 'Angle of B', min: -180, max: 180, step: 1, value: 110, unit: '°', onChange: draw });
    let mode = 'sum';
    api.select({ id: 'mode', label: 'Show', value: mode, options: [['sum', 'A + B (parallelogram)'], ['diff', 'A − B'], ['proj', 'Projection of A on B']], onChange: (v) => { mode = v; draw(); } });
    const out = api.readout();
    cv.onResize = draw;
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const s = Math.min(cv.w, cv.h) / 13, ox = cv.w / 2, oy = cv.h / 2;
      const P = (x, y) => [ox + x * s, oy - y * s];
      ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(cv.w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, cv.h); ctx.stroke();
      const A = [a.value * Math.cos(at.value * U.deg), a.value * Math.sin(at.value * U.deg)];
      const B = [b.value * Math.cos(bt.value * U.deg), b.value * Math.sin(bt.value * U.deg)];
      const O = P(0, 0);
      if (mode === 'sum') {
        const S = [A[0] + B[0], A[1] + B[1]];
        ctx.setLineDash([4, 4]);
        U.arrow(ctx, ...P(A[0], A[1]), ...P(S[0], S[1]), U.alpha(C.teal, 0.6), 1.5, 7);
        U.arrow(ctx, ...P(B[0], B[1]), ...P(S[0], S[1]), U.alpha(C.rust, 0.6), 1.5, 7);
        ctx.setLineDash([]);
        U.arrow(ctx, ...O, ...P(S[0], S[1]), C.points, 3.5, 12);
        U.text(ctx, 'A + B', ...P(S[0] + 0.2, S[1] + 0.2), C.points, U.ui(13));
      } else if (mode === 'diff') {
        const D = [A[0] - B[0], A[1] - B[1]];
        U.arrow(ctx, ...P(B[0], B[1]), ...P(A[0], A[1]), U.alpha(C.points, 0.5), 1.5, 7);
        U.arrow(ctx, ...O, ...P(D[0], D[1]), C.points, 3.5, 12);
        U.text(ctx, 'A − B', ...P(D[0] + 0.2, D[1] + 0.2), C.points, U.ui(13));
      } else {
        const bb = b.value || 1e-9, ub = [B[0] / bb, B[1] / bb], pr = A[0] * ub[0] + A[1] * ub[1];
        const Pj = [pr * ub[0], pr * ub[1]];
        ctx.setLineDash([4, 4]); ctx.strokeStyle = C.ink3; ctx.beginPath(); ctx.moveTo(...P(A[0], A[1])); ctx.lineTo(...P(Pj[0], Pj[1])); ctx.stroke(); ctx.setLineDash([]);
        U.arrow(ctx, ...O, ...P(Pj[0], Pj[1]), C.points, 4, 12);
        U.text(ctx, '(A·B̂)B̂', ...P(Pj[0] + 0.2, Pj[1] - 0.4), C.points, U.ui(13));
      }
      U.arrow(ctx, ...O, ...P(A[0], A[1]), C.teal, 3, 11);
      U.arrow(ctx, ...O, ...P(B[0], B[1]), C.rust, 3, 11);
      U.text(ctx, 'A', ...P(A[0] * 1.08 + 0.1, A[1] * 1.08 + 0.1), C.teal, U.ui(14, 700));
      U.text(ctx, 'B', ...P(B[0] * 1.08 + 0.1, B[1] * 1.08 + 0.1), C.rust, U.ui(14, 700));
      const dot = A[0] * B[0] + A[1] * B[1], cross = A[0] * B[1] - A[1] * B[0];
      let ang = Math.abs(at.value - bt.value) % 360; if (ang > 180) ang = 360 - ang;
      out([['A', '(' + A[0].toFixed(2) + ', ' + A[1].toFixed(2) + ')'], ['B', '(' + B[0].toFixed(2) + ', ' + B[1].toFixed(2) + ')'], ['|A + B|', Math.hypot(A[0] + B[0], A[1] + B[1]).toFixed(3)], ['A · B', dot.toFixed(3)], ['(A × B)<sub>z</sub>', cross.toFixed(3)], ['angle between', ang.toFixed(0) + '°']]);
    }
    draw();
  };

  /* =============== Ch2: Projectile with air drag =============== */
  PB.sims.projectile = function (api) {
    const cv = api.canvas(0.56);
    const v0 = api.slider({ id: 'v0', label: 'Launch speed v<sub>0</sub>', min: 5, max: 40, step: 0.5, value: 20, unit: 'm/s', onChange: redraw });
    const th = api.slider({ id: 'th', label: 'Launch angle θ', min: 5, max: 85, step: 1, value: 45, unit: '°', onChange: redraw });
    const h0 = api.slider({ id: 'h0', label: 'Launch height', min: 0, max: 20, step: 0.5, value: 0, unit: 'm', onChange: redraw });
    const gS = api.select({ id: 'g', label: 'Gravity', value: '9.8', options: [['9.8', 'Earth (9.8 m/s²)'], ['1.62', 'Moon (1.62 m/s²)'], ['3.71', 'Mars (3.71 m/s²)'], ['24.8', 'Jupiter (24.8 m/s²)']], onChange: redraw });
    const k = api.slider({ id: 'k', label: 'Quadratic drag k = c/m', min: 0, max: 0.05, step: 0.001, value: 0, unit: '1/m', onChange: redraw });
    api.buttons([{ label: 'Launch', primary: true, onClick: launch }, { label: 'Clear trails', onClick: () => { trails = []; redraw(); } }]);
    const out = api.readout();
    let trails = [], ball = null;
    cv.onResize = redraw;
    function ideal() {
      const g = +gS.value, t = th.value * U.deg, vx = v0.value * Math.cos(t), vy = v0.value * Math.sin(t), y0 = h0.value;
      const T = (vy + Math.sqrt(vy * vy + 2 * g * y0)) / g;
      return { T: T, R: vx * T, H: y0 + (vy * vy) / (2 * g), vx: vx, vy: vy, g: g };
    }
    function simulate() {
      const g = +gS.value, t = th.value * U.deg; let x = 0, y = h0.value, vx = v0.value * Math.cos(t), vy = v0.value * Math.sin(t), tt = 0, H = y;
      const dt = 0.002, path = [[x, y]];
      while (y >= 0 && tt < 60) {
        const v = Math.hypot(vx, vy);
        const ax = -k.value * v * vx, ay = -g - k.value * v * vy;
        vx += ax * dt; vy += ay * dt; x += vx * dt; y += vy * dt; tt += dt; H = Math.max(H, y);
        if (path.length < 4000 && Math.round(tt / dt) % 5 === 0) path.push([x, Math.max(y, 0)]);
      }
      path.push([x, 0]);
      return { path: path, T: tt, R: x, H: H };
    }
    function view() {
      const I = ideal();
      const xmax = Math.max(I.R * 1.08, 10), ymax = Math.max(I.H * 1.15, 5);
      const pad = 36, sc = Math.min((cv.w - pad - 16) / xmax, (cv.h - pad - 12) / ymax);
      return { X: (x) => pad + x * sc, Y: (y) => cv.h - pad + 8 - y * sc, sc: sc, xmax: xmax, ymax: ymax, I: I };
    }
    function launch() {
      const s = simulate();
      ball = { s: s, t: 0 };
      trails.push(s); if (trails.length > 5) trails.shift();
    }
    function redraw() { draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, V = view();
      ctx.clearRect(0, 0, cv.w, cv.h);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, V.Y(0)); ctx.lineTo(cv.w, V.Y(0)); ctx.stroke();
      U.ticks(0, V.xmax, 6).forEach((x) => { U.text(ctx, U.tickLabel(x) + (x ? '' : ' m'), V.X(x), V.Y(0) + 14, C.ink3, U.mono(10), 'center'); });
      if (h0.value > 0) { ctx.fillStyle = U.alpha(C.ink3, 0.3); ctx.fillRect(V.X(0) - 10, V.Y(h0.value), 10, V.Y(0) - V.Y(h0.value)); }
      // ideal (no-drag) parabola
      const I = V.I, pts = [];
      for (let i = 0; i <= 80; i++) { const t = (I.T * i) / 80; pts.push([V.X(I.vx * t), V.Y(h0.value + I.vy * t - 0.5 * I.g * t * t)]); }
      U.curve(ctx, pts, U.alpha(C.ink3, 0.8), 1.5, [5, 5]);
      trails.forEach((s, i) => U.curve(ctx, s.path.map((p) => [V.X(p[0]), V.Y(p[1])]), U.alpha(C.accent, 0.25 + (0.6 * (i + 1)) / trails.length), 2));
      const t0 = th.value * U.deg;
      U.arrow(ctx, V.X(0), V.Y(h0.value), V.X(0) + 40 * Math.cos(t0), V.Y(h0.value) - 40 * Math.sin(t0), C.points, 2.5, 9);
      if (ball) {
        const path = ball.s.path, idx = Math.min(path.length - 1, Math.floor((ball.t / ball.s.T) * (path.length - 1)));
        const p = path[idx]; U.dot(ctx, V.X(p[0]), V.Y(p[1]), 6, C.points, C.ink);
      }
      const last = trails[trails.length - 1];
      out([['no-drag range', I.R.toFixed(2) + ' m'], ['no-drag max height', I.H.toFixed(2) + ' m'], ['no-drag flight time', I.T.toFixed(2) + ' s'],
        ['last launch range', last ? last.R.toFixed(2) + ' m' : '—'], ['last launch height', last ? last.H.toFixed(2) + ' m' : '—'], ['last launch time', last ? last.T.toFixed(2) + ' s' : '—']]);
    }
    api.loop((dt) => { if (ball && ball.t < ball.s.T) { ball.t = Math.min(ball.s.T, ball.t + dt * 1.0); draw(); } });
    draw();
  };

  /* =============== Ch3: Block on an incline with friction =============== */
  PB.sims.incline = function (api) {
    const cv = api.canvas(0.6);
    const ang = api.slider({ id: 'a', label: 'Incline angle θ', min: 0, max: 60, step: 0.5, value: 25, unit: '°', onChange: reset });
    const ms = api.slider({ id: 'ms', label: 'Static friction μ<sub>s</sub>', min: 0, max: 1, step: 0.01, value: 0.5, onChange: reset });
    const mk = api.slider({ id: 'mk', label: 'Kinetic friction μ<sub>k</sub>', min: 0, max: 1, step: 0.01, value: 0.3, onChange: reset });
    const m = api.slider({ id: 'm', label: 'Mass m', min: 0.5, max: 10, step: 0.5, value: 2, unit: 'kg', onChange: reset });
    const comp = api.check({ id: 'comp', label: 'Show components of gravity', value: true, onChange: () => draw() });
    api.buttons([{ label: 'Restart', primary: true, onClick: reset }]);
    const out = api.readout();
    const g = 9.8; let s = 0, v = 0;
    cv.onResize = () => draw();
    function phys() {
      const t = ang.value * U.deg, M = m.value, muk = Math.min(mk.value, ms.value);
      const N = M * g * Math.cos(t), along = M * g * Math.sin(t);
      const slides = along > ms.value * N + 1e-9;
      const f = slides ? muk * N : along;
      const a = slides ? along / M - muk * g * Math.cos(t) : 0;
      return { t: t, N: N, along: along, f: f, a: a, slides: slides, muk: muk };
    }
    function reset() { s = 0; v = 0; draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, P = phys();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const L = Math.min(cv.w * 0.78, (cv.h * 0.78) / Math.max(Math.sin(P.t), 0.25));
      const bx = cv.w * 0.5 + (L / 2) * Math.cos(P.t), by = cv.h - 30;
      const tx = bx - L * Math.cos(P.t), ty = by - L * Math.sin(P.t);
      ctx.fillStyle = U.alpha(C.ink3, 0.18); ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(bx, by); ctx.lineTo(tx, by); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 34, Math.PI, Math.PI + P.t); ctx.stroke();
      U.text(ctx, 'θ', bx - 46, by - 8, C.ink2, U.ui(13));
      const ux = Math.cos(P.t), uy = Math.sin(P.t);
      const smax = L - 60; const sp = Math.min(s * (L / 6), smax);
      const cx = tx + (30 + sp) * ux, cy = ty + (30 + sp) * uy;
      const size = 26 + m.value * 2.2;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(P.t);
      ctx.fillStyle = U.alpha(C.accent, 0.85); ctx.fillRect(-size / 2, -size, size, size);
      ctx.restore();
      const gx = cx + Math.sin(P.t) * (size / 2), gy = cy - Math.cos(P.t) * (size / 2);
      const sc = 3.2 / Math.max(1, m.value / 3);
      const W = m.value * g * sc;
      U.arrow(ctx, gx, gy, gx, gy + W, C.ink, 2.5, 9); U.text(ctx, 'mg', gx + 6, gy + W, C.ink, U.ui(12));
      const Nx = Math.sin(P.t), Ny = -Math.cos(P.t);
      U.arrow(ctx, gx, gy, gx + Nx * P.N * sc, gy + Ny * P.N * sc, C.teal, 2.5, 9); U.text(ctx, 'N', gx + Nx * P.N * sc + 4, gy + Ny * P.N * sc, C.teal, U.ui(12));
      if (P.f > 1e-6) { U.arrow(ctx, gx, gy, gx - ux * P.f * sc, gy - uy * P.f * sc, C.rust, 2.5, 9); U.text(ctx, P.slides ? 'f = μₖN' : 'f (static)', gx - ux * P.f * sc - 60, gy - uy * P.f * sc - 6, C.rust, U.ui(12)); }
      if (comp.value) {
        ctx.setLineDash([4, 3]);
        U.arrow(ctx, gx, gy, gx + ux * P.along * sc, gy + uy * P.along * sc, U.alpha(C.ink, 0.5), 1.5, 7);
        U.arrow(ctx, gx, gy, gx - Nx * P.N * sc, gy - Ny * P.N * sc, U.alpha(C.ink, 0.5), 1.5, 7);
        ctx.setLineDash([]);
      }
      const ratio = P.N > 0 ? P.along / P.N : Infinity;
      out([['state', P.slides ? 'sliding' : 'at rest'], ['tan θ', isFinite(ratio) ? ratio.toFixed(3) : '∞'], ['N = mg cos θ', P.N.toFixed(2) + ' N'], ['mg sin θ', P.along.toFixed(2) + ' N'],
        ['max static friction', (ms.value * P.N).toFixed(2) + ' N'], ['friction now', P.f.toFixed(2) + ' N'], ['acceleration', P.a.toFixed(3) + ' m/s²']]);
    }
    api.loop((dt) => { const P = phys(); if (P.slides && s < 6.5) { v += P.a * dt; s += v * dt; draw(); } });
    draw();
  };

  /* =============== Ch4: Bead on a track (energy bars) =============== */
  PB.sims.track = function (api) {
    const cv = api.canvas(0.6);
    const shapes = {
      bowl: { f: (x) => 0.5 * x * x, d: (x) => x, dd: () => 1, r: [-2, 2] },
      well: { f: (x) => 0.4 * Math.pow(x * x - 1, 2), d: (x) => 1.6 * x * (x * x - 1), dd: (x) => 1.6 * (3 * x * x - 1), r: [-1.8, 1.8] },
      bump: { f: (x) => 0.5 * x * x + 0.6 * Math.exp(-x * x / 0.1), d: (x) => x - 12 * x * Math.exp(-x * x / 0.1), dd: (x) => 1 - 12 * Math.exp(-x * x / 0.1) + 240 * x * x * Math.exp(-x * x / 0.1), r: [-2, 2] }
    };
    let shape = 'well';
    api.select({ id: 'shape', label: 'Track shape', value: shape, options: [['well', 'Double well'], ['bowl', 'Parabolic bowl'], ['bump', 'Bowl with a central hump']], onChange: (v) => { shape = v; release(); } });
    const x0 = api.slider({ id: 'x0', label: 'Release position x<sub>0</sub>', min: -1.8, max: 1.8, step: 0.01, value: -1.6, unit: 'm', onChange: release });
    const b = api.slider({ id: 'b', label: 'Friction (drag rate)', min: 0, max: 1, step: 0.01, value: 0.05, unit: '1/s', onChange: () => {} });
    api.buttons([{ label: 'Release', primary: true, onClick: release }]);
    const out = api.readout();
    const g = 9.8, M = 1;
    let x, v, E0;
    cv.onResize = () => draw();
    function energy() { const S = shapes[shape]; const vs2 = v * v * (1 + S.d(x) ** 2); return { K: 0.5 * M * vs2, U: M * g * S.f(x) }; }
    function release() { const S = shapes[shape]; x = Math.max(S.r[0], Math.min(S.r[1], x0.value)); v = 0; E0 = M * g * S.f(x); draw(); }
    function acc(x, v) { const S = shapes[shape], fp = S.d(x), fpp = S.dd(x); return -(g * fp + fp * fpp * v * v) / (1 + fp * fp) - b.value * v; }
    function step(dt) {
      const n = 20, h = dt / n;
      for (let i = 0; i < n; i++) {
        const k1x = v, k1v = acc(x, v);
        const k2x = v + 0.5 * h * k1v, k2v = acc(x + 0.5 * h * k1x, v + 0.5 * h * k1v);
        const k3x = v + 0.5 * h * k2v, k3v = acc(x + 0.5 * h * k2x, v + 0.5 * h * k2v);
        const k4x = v + h * k3v, k4v = acc(x + h * k3x, v + h * k3v);
        x += (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x); v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
        const S = shapes[shape]; if (x < S.r[0]) { x = S.r[0]; v = -v * 0.5; } if (x > S.r[1]) { x = S.r[1]; v = -v * 0.5; }
      }
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, S = shapes[shape];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const barW = Math.min(170, cv.w * 0.3), tw = cv.w - barW - 30;
      const ymax = Math.max(S.f(S.r[0]), S.f(S.r[1])) * 1.1;
      const sc = Math.min(tw / (S.r[1] - S.r[0]), (cv.h - 50) / ymax);
      const X = (q) => 15 + tw / 2 + q * sc, Y = (q) => cv.h - 24 - q * sc;
      const pts = []; for (let i = 0; i <= 200; i++) { const q = S.r[0] + ((S.r[1] - S.r[0]) * i) / 200; pts.push([X(q), Y(S.f(q))]); }
      U.curve(ctx, pts, C.ink2, 4);
      const e = energy(), Th = Math.max(0, E0 - e.K - e.U);
      ctx.setLineDash([5, 5]); ctx.strokeStyle = U.alpha(C.points, 0.6); ctx.lineWidth = 1.2;
      const hE = (e.K + e.U) / (M * g); ctx.beginPath(); ctx.moveTo(X(S.r[0]), Y(hE)); ctx.lineTo(X(S.r[1]), Y(hE)); ctx.stroke(); ctx.setLineDash([]);
      U.text(ctx, 'mechanical energy level', X(S.r[0]) + 4, Y(hE) - 5, C.points, U.ui(11));
      U.dot(ctx, X(x), Y(S.f(x)) - 9, 9, C.accent, C.ink);
      // bars
      const bx0 = cv.w - barW - 6, bh = cv.h - 70, top = 24, mx = Math.max(E0, 0.01);
      const bars = [['K', e.K, C.accent], ['U', e.U, C.teal], ['heat', Th, C.rust], ['total', e.K + e.U + Th, C.points]];
      const bw = (barW - 20) / 4;
      bars.forEach((r, i) => {
        const hh = (r[1] / mx) * bh, xx = bx0 + 10 + i * bw;
        ctx.fillStyle = U.alpha(r[2], 0.85); ctx.fillRect(xx + 4, top + bh - hh, bw - 8, hh);
        ctx.strokeStyle = C.line; ctx.strokeRect(xx + 4, top, bw - 8, bh);
        U.text(ctx, r[0], xx + bw / 2, top + bh + 16, C.ink2, U.ui(11), 'center');
      });
      const speed = Math.abs(v) * Math.sqrt(1 + S.d(x) ** 2);
      out([['kinetic K', e.K.toFixed(2) + ' J'], ['potential U = mgh', e.U.toFixed(2) + ' J'], ['dissipated', Th.toFixed(2) + ' J'], ['speed', speed.toFixed(2) + ' m/s'], ['height', S.f(x).toFixed(3) + ' m']]);
    }
    api.loop((dt) => { step(dt); draw(); });
    release();
  };

  /* =============== Ch5: 1D collisions =============== */
  PB.sims.collision = function (api) {
    const cv = api.canvas(0.42, 230);
    const m1 = api.slider({ id: 'm1', label: 'Mass m<sub>1</sub>', min: 0.5, max: 5, step: 0.1, value: 1, unit: 'kg', onChange: reset });
    const m2 = api.slider({ id: 'm2', label: 'Mass m<sub>2</sub>', min: 0.5, max: 5, step: 0.1, value: 3, unit: 'kg', onChange: reset });
    const u1 = api.slider({ id: 'u1', label: 'Initial velocity u<sub>1</sub>', min: -3, max: 3, step: 0.1, value: 2, unit: 'm/s', onChange: reset });
    const u2 = api.slider({ id: 'u2', label: 'Initial velocity u<sub>2</sub>', min: -3, max: 3, step: 0.1, value: -0.5, unit: 'm/s', onChange: reset });
    const e = api.slider({ id: 'e', label: 'Coefficient of restitution e', min: 0, max: 1, step: 0.01, value: 1, onChange: reset });
    const cm = api.check({ id: 'cm', label: 'Watch from the centre-of-mass frame', value: false, onChange: () => draw() });
    api.buttons([{ label: 'Play', primary: true, onClick: () => { reset(); run = true; } }, { label: 'Reset', onClick: reset }]);
    const out = api.readout();
    let x1, x2, v1, v2, t, run = false, hit = false;
    cv.onResize = () => draw();
    const size = (m) => 22 + 14 * Math.cbrt(m);
    function reset() { x1 = 3; x2 = 7; v1 = u1.value; v2 = u2.value; t = 0; run = false; hit = false; draw(); }
    function after() {
      const M = m1.value + m2.value, P = m1.value * u1.value + m2.value * u2.value, rel = u1.value - u2.value;
      return [(P - m2.value * e.value * rel) / M, (P + m1.value * e.value * rel) / M];
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const W = 10, sc = cv.w / W, gy = cv.h * 0.62;
      const vcm = (m1.value * u1.value + m2.value * u2.value) / (m1.value + m2.value);
      const shift = cm.value ? vcm * t : 0;
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(cv.w, gy); ctx.stroke();
      for (let q = Math.floor(shift) - 1; q < W + shift + 1; q++) { const px = (q - shift) * sc; ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + 6); ctx.stroke(); }
      const s1 = size(m1.value), s2 = size(m2.value);
      const p1 = (x1 - shift) * sc, p2 = (x2 - shift) * sc;
      ctx.fillStyle = U.alpha(C.teal, 0.9); ctx.fillRect(p1 - s1, gy - s1, s1, s1);
      ctx.fillStyle = U.alpha(C.rust, 0.9); ctx.fillRect(p2, gy - s2, s2, s2);
      U.text(ctx, 'm₁', p1 - s1 / 2, gy - s1 / 2 + 4, '#fff', U.ui(12, 700), 'center');
      U.text(ctx, 'm₂', p2 + s2 / 2, gy - s2 / 2 + 4, '#fff', U.ui(12, 700), 'center');
      const va = v1 - (cm.value ? vcm : 0), vb = v2 - (cm.value ? vcm : 0);
      U.arrow(ctx, p1 - s1 / 2, gy - s1 - 14, p1 - s1 / 2 + va * 22, gy - s1 - 14, C.teal, 2.5, 8);
      U.arrow(ctx, p2 + s2 / 2, gy - s2 - 14, p2 + s2 / 2 + vb * 22, gy - s2 - 14, C.rust, 2.5, 8);
      const xc = (m1.value * (x1 - 0) + m2.value * x2) / (m1.value + m2.value);
      const pc = (xc - shift) * sc;
      ctx.strokeStyle = C.points; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pc, gy + 4); ctx.lineTo(pc, gy + 22); ctx.stroke();
      U.text(ctx, 'CM', pc, gy + 36, C.points, U.ui(11, 700), 'center');
      const A = after(), K0 = 0.5 * m1.value * u1.value ** 2 + 0.5 * m2.value * u2.value ** 2, K1 = 0.5 * m1.value * A[0] ** 2 + 0.5 * m2.value * A[1] ** 2;
      const P0 = m1.value * u1.value + m2.value * u2.value;
      const approaching = u1.value > u2.value;
      out([['v<sub>cm</sub>', vcm.toFixed(3) + ' m/s'], ['total momentum', P0.toFixed(3) + ' kg m/s'], ['v₁ after', approaching ? A[0].toFixed(3) + ' m/s' : 'no collision'], ['v₂ after', approaching ? A[1].toFixed(3) + ' m/s' : 'no collision'],
        ['KE before', K0.toFixed(3) + ' J'], ['KE after', approaching ? K1.toFixed(3) + ' J' : '—'], ['KE lost', approaching ? (K0 - K1).toFixed(3) + ' J' : '—']]);
    }
    api.loop((dt) => {
      if (!run) return;
      t += dt; x1 += v1 * dt; x2 += v2 * dt;
      if (!hit && x1 >= x2 && v1 > v2) { const A = after(); v1 = A[0]; v2 = A[1]; hit = true; x1 = x2; }
      if (t > 12) run = false;
      draw();
    });
    reset();
  };

  /* =============== Ch6: Rolling race =============== */
  PB.sims.rolling = function (api) {
    const cv = api.canvas(0.58);
    const ang = api.slider({ id: 'a', label: 'Slope angle θ', min: 3, max: 45, step: 1, value: 15, unit: '°', onChange: reset });
    const L = 3;
    const objs = [['Frictionless block (slides)', 0, 'block'], ['Solid sphere  I = 2/5 MR²', 0.4, 'sphere'], ['Solid disc / cylinder  I = 1/2 MR²', 0.5, 'disc'], ['Hollow sphere  I = 2/3 MR²', 2 / 3, 'shell'], ['Hoop / thin ring  I = MR²', 1, 'hoop']];
    api.buttons([{ label: 'Race', primary: true, onClick: () => { reset(); run = true; } }, { label: 'Reset', onClick: reset }]);
    const out = api.readout();
    let t = 0, run = false;
    cv.onResize = () => draw();
    function reset() { t = 0; run = false; draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, g = 9.8, th = ang.value * U.deg;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const left = 20, right = cv.w - 30, lane = (cv.h - 30) / objs.length;
      const cols = [C.ink3, C.accent, C.teal, C.points, C.rust];
      const rows = [];
      objs.forEach((o, i) => {
        const a = (g * Math.sin(th)) / (1 + o[1]), T = Math.sqrt((2 * L) / a);
        const s = Math.min(L, 0.5 * a * t * t), y = 22 + i * lane + lane * 0.62, R = Math.min(16, lane * 0.32);
        ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(left, y + R); ctx.lineTo(right, y + R); ctx.stroke();
        ctx.strokeStyle = C.ink3; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(right, y - R - 4); ctx.lineTo(right, y + R + 2); ctx.stroke(); ctx.setLineDash([]);
        const px = left + R + (s / L) * (right - left - 2 * R);
        U.text(ctx, o[0], left, y - R - 6, C.ink2, U.ui(11.5));
        if (o[2] === 'block') { ctx.fillStyle = cols[i]; ctx.fillRect(px - R, y - R, 2 * R, 2 * R); }
        else {
          const phi = s / (R / 100);
          ctx.beginPath(); ctx.arc(px, y, R, 0, 2 * Math.PI);
          if (o[2] === 'hoop' || o[2] === 'shell') { ctx.strokeStyle = cols[i]; ctx.lineWidth = o[2] === 'hoop' ? 3 : 5; ctx.stroke(); ctx.fillStyle = U.alpha(cols[i], o[2] === 'shell' ? 0.15 : 0.04); ctx.fill(); }
          else { ctx.fillStyle = U.alpha(cols[i], o[2] === 'sphere' ? 0.9 : 0.7); ctx.fill(); }
          ctx.strokeStyle = C.surface; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + R * Math.cos(phi), y + R * Math.sin(phi)); ctx.stroke();
        }
        if (s >= L) U.text(ctx, T.toFixed(2) + ' s', right - 4, y - R - 6, cols[i], U.mono(11, 700), 'right');
        rows.push([o[0].split('  ')[0].replace(' (slides)', ''), 'a = ' + a.toFixed(2) + ', t = ' + T.toFixed(2) + ' s']);
      });
      U.text(ctx, 'distance along a ' + L + ' m slope →', cv.w - 30, 14, C.ink3, U.ui(11), 'right');
      out(rows);
    }
    api.loop((dt) => { if (run) { t += dt; draw(); if (t > 20) run = false; } });
    reset();
  };

  /* =============== Ch7: Orbits and Kepler's second law =============== */
  PB.sims.orbit = function (api) {
    const cv = api.canvas(0.66);
    const vr = api.slider({ id: 'v', label: 'Launch speed / circular speed', min: 0.3, max: 1.6, step: 0.01, value: 0.8, onChange: reset });
    const al = api.slider({ id: 'al', label: 'Launch angle from tangent', min: -60, max: 60, step: 1, value: 0, unit: '°', onChange: reset });
    const warp = api.slider({ id: 'w', label: 'Time speed', min: 0.2, max: 4, step: 0.1, value: 1.2, format: (v) => v.toFixed(1) + '×' });
    const kep = api.check({ id: 'k', label: 'Shade equal-time sectors (Kepler II)', value: true, onChange: () => draw() });
    api.buttons([{ label: 'Relaunch', primary: true, onClick: reset }]);
    const out = api.readout();
    let p, v, trail, t, sectors, lastMark, el;
    cv.onResize = () => draw();
    function elements() {
      const r = Math.hypot(p[0], p[1]), E = 0.5 * (v[0] ** 2 + v[1] ** 2) - 1 / r, hh = p[0] * v[1] - p[1] * v[0];
      const e = Math.sqrt(Math.max(0, 1 + 2 * E * hh * hh)), a = E < 0 ? -1 / (2 * E) : Infinity;
      return { E: E, h: hh, e: e, a: a, T: E < 0 ? 2 * Math.PI * Math.pow(a, 1.5) : Infinity, rp: (hh * hh) / (1 + e), ra: E < 0 ? a * (1 + e) : Infinity };
    }
    function reset() {
      const s = vr.value, an = al.value * U.deg;
      p = [1, 0]; v = [-s * Math.sin(an), s * Math.cos(an)];
      trail = [p.slice()]; t = 0; sectors = [[p.slice()]]; lastMark = 0; el = elements(); draw();
    }
    function acc(q) { const r = Math.hypot(q[0], q[1]), r3 = r * r * r; return [-q[0] / r3, -q[1] / r3]; }
    function step(dt) {
      const n = 60, hstep = dt / n;
      for (let i = 0; i < n; i++) {
        const a0 = acc(p); v[0] += 0.5 * hstep * a0[0]; v[1] += 0.5 * hstep * a0[1];
        p[0] += hstep * v[0]; p[1] += hstep * v[1];
        const a1 = acc(p); v[0] += 0.5 * hstep * a1[0]; v[1] += 0.5 * hstep * a1[1];
        t += hstep;
        if (Math.hypot(p[0], p[1]) < 0.06) { p = [NaN, NaN]; return; }
      }
      trail.push(p.slice()); if (trail.length > 1500) trail.shift();
      if (isFinite(el.T)) {
        const dT = el.T / 12; sectors[sectors.length - 1].push(p.slice());
        if (t - lastMark >= dT) { lastMark += dT; sectors.push([p.slice()]); if (sectors.length > 13) sectors.shift(); }
      }
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const ext = isFinite(el.ra) ? Math.max(1.2, el.ra * 1.05) : 4;
      const sc = Math.min(cv.w, cv.h) / (2 * ext + 0.4);
      const ox = cv.w / 2, oy = cv.h / 2;
      const S = (q) => [ox + q[0] * sc, oy - q[1] * sc];
      if (kep.value && isFinite(el.T)) {
        sectors.forEach((sec, i) => {
          if (sec.length < 2) return;
          ctx.beginPath(); ctx.moveTo(...S([0, 0])); sec.forEach((q) => ctx.lineTo(...S(q))); ctx.closePath();
          ctx.fillStyle = U.alpha(i % 2 ? C.accent : C.points, 0.16); ctx.fill();
        });
      }
      U.curve(ctx, trail.filter((q) => isFinite(q[0])).map(S), U.alpha(C.accent, 0.9), 1.8);
      const g = ctx.createRadialGradient(ox, oy, 2, ox, oy, 18); g.addColorStop(0, C.points); g.addColorStop(1, U.alpha(C.points, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ox, oy, 18, 0, Math.PI * 2); ctx.fill();
      U.dot(ctx, ox, oy, 7, C.points);
      if (isFinite(p[0])) {
        const sp = S(p); U.dot(ctx, sp[0], sp[1], 5, C.ink);
        U.arrow(ctx, sp[0], sp[1], sp[0] + v[0] * 40, sp[1] - v[1] * 40, C.teal, 2, 8);
      } else U.text(ctx, 'Crashed into the planet. Relaunch with more sideways speed.', 14, 22, C.bad, U.ui(12));
      ctx.strokeStyle = U.alpha(C.ink3, 0.4); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(ox, oy, sc, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      out([['orbit type', el.E < -1e-9 ? (el.e < 0.01 ? 'circle' : 'ellipse') : Math.abs(el.E) < 1e-9 ? 'parabola (escape)' : 'hyperbola (escape)'], ['eccentricity e', el.e.toFixed(3)], ['specific energy', el.E.toFixed(3) + ' GM/r₀'],
        ['semi-major axis', isFinite(el.a) ? el.a.toFixed(3) + ' r₀' : '∞'], ['period', isFinite(el.T) ? (el.T / (2 * Math.PI)).toFixed(3) + ' T₀' : '—'], ['perihelion', el.rp.toFixed(3) + ' r₀'], ['aphelion', isFinite(el.ra) ? el.ra.toFixed(3) + ' r₀' : '∞']]);
    }
    api.loop((dt) => { if (isFinite(p[0])) { step(dt * warp.value * 2); } draw(); });
    reset();
  };

  /* =============== Ch8: Driven damped oscillator =============== */
  PB.sims.oscillator = function (api) {
    const cv = api.canvas(0.62);
    const w0 = 2 * Math.PI;
    const gam = api.slider({ id: 'g', label: 'Damping rate γ = b/m', min: 0, max: 15, step: 0.05, value: 0.6, unit: '1/s' });
    const wr = api.slider({ id: 'w', label: 'Drive frequency ω/ω<sub>0</sub>', min: 0, max: 2.5, step: 0.01, value: 0.9 });
    const F = api.slider({ id: 'F', label: 'Drive strength F<sub>0</sub>/m', min: 0, max: 40, step: 0.5, value: 10, unit: 'm/s²' });
    api.buttons([{ label: 'Kick it', onClick: () => { v += 1.2; } }, { label: 'Reset', primary: true, onClick: () => { x = 0; v = 0; t = 0; hist = []; } }]);
    const out = api.readout();
    let x = 0, v = 0, t = 0, hist = [];
    cv.onResize = () => draw();
    function amp(w) { return F.value / Math.sqrt((w0 * w0 - w * w) ** 2 + (gam.value * w) ** 2); }
    function step(dt) {
      const n = 30, h = dt / n, w = wr.value * w0;
      const a = (xx, vv, tt) => -w0 * w0 * xx - gam.value * vv + F.value * Math.cos(w * tt);
      for (let i = 0; i < n; i++) {
        const k1x = v, k1v = a(x, v, t);
        const k2x = v + 0.5 * h * k1v, k2v = a(x + 0.5 * h * k1x, v + 0.5 * h * k1v, t + h / 2);
        const k3x = v + 0.5 * h * k2v, k3v = a(x + 0.5 * h * k2x, v + 0.5 * h * k2v, t + h / 2);
        const k4x = v + h * k3v, k4v = a(x + h * k3x, v + h * k3v, t + h);
        x += (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x); v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v); t += h;
      }
      hist.push([t, x, F.value * Math.cos(wr.value * w0 * t)]); while (hist.length && hist[0][0] < t - 8) hist.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const lw = Math.max(110, cv.w * 0.22);
      const A = amp(wr.value * w0), ylim = Math.max(0.05, A * 1.4, ...hist.map((r) => Math.abs(r[1]) * 1.1));
      const cxm = lw / 2, top = 20, eq = cv.h * 0.5;
      const ymass = eq + Math.max(-cv.h * 0.32, Math.min(cv.h * 0.32, (x / ylim) * cv.h * 0.3));
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cxm - 30, top); ctx.lineTo(cxm + 30, top); ctx.stroke();
      ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(cxm, top);
      const coils = 12, sl = (ymass - 22 - top);
      for (let i = 1; i <= coils * 2; i++) ctx.lineTo(cxm + (i % 2 ? 12 : -12), top + (sl * i) / (coils * 2));
      ctx.lineTo(cxm, ymass - 22); ctx.stroke();
      ctx.fillStyle = C.accent; ctx.fillRect(cxm - 22, ymass - 22, 44, 44);
      ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cxm - 40, eq); ctx.lineTo(cxm + 40, eq); ctx.stroke(); ctx.setLineDash([]);
      const b1 = { x: lw + 40, y: 14, w: cv.w - lw - 52, h: cv.h * 0.44 };
      const m1 = U.frame(ctx, C, b1, [t - 8, t], [-ylim, ylim], { ny: 4, xlabel: 't (s)', ylabel: 'x (m)', xfmt: (q) => q.toFixed(0) });
      U.clip(ctx, b1);
      U.curve(ctx, hist.map((r) => [m1.X(r[0]), m1.Y((r[2] / Math.max(F.value, 1e-9)) * ylim * 0.3)]), U.alpha(C.points, 0.5), 1.2);
      U.curve(ctx, hist.map((r) => [m1.X(r[0]), m1.Y(r[1])]), C.accent, 2);
      ctx.restore();
      // resonance curve
      const b2 = { x: lw + 40, y: cv.h * 0.44 + 46, w: cv.w - lw - 52, h: cv.h - cv.h * 0.44 - 74 };
      const amax = Math.min(amp(w0 * Math.sqrt(Math.max(0, 1 - gam.value ** 2 / (2 * w0 * w0)))) * 1.1, 50);
      const m2 = U.frame(ctx, C, b2, [0, 2.5], [0, Math.max(amax, 1e-3)], { ny: 3, xlabel: 'ω/ω₀', ylabel: 'steady amplitude' });
      U.clip(ctx, b2);
      const pts = []; for (let i = 0; i <= 250; i++) { const r = (2.5 * i) / 250; pts.push([m2.X(r), m2.Y(amp(r * w0))]); }
      U.curve(ctx, pts, C.teal, 2);
      ctx.restore();
      U.dot(ctx, m2.X(wr.value), m2.Y(Math.min(A, amax)), 5, C.points, C.ink);
      const w = wr.value * w0, ph = Math.atan2(gam.value * w, w0 * w0 - w * w);
      out([['natural frequency', '1.00 Hz'], ['steady amplitude', U.fmt(A, 3) + ' m'], ['phase lag δ', (ph / U.deg).toFixed(1) + '°'], ['quality factor Q', gam.value > 0 ? (w0 / gam.value).toFixed(1) : '∞'], ['regime (free)', gam.value < 2 * w0 ? 'underdamped' : gam.value === 2 * w0 ? 'critical' : 'overdamped']]);
    }
    api.loop((dt) => { step(dt); draw(); });
    draw();
  };

  /* =============== Ch9: Buoyancy =============== */
  PB.sims.buoyancy = function (api) {
    const cv = api.canvas(0.6);
    const rho = api.slider({ id: 'rb', label: 'Block density ρ<sub>b</sub>', min: 100, max: 3000, step: 10, value: 600, unit: 'kg/m³', onChange: () => {} });
    const fluid = api.select({ id: 'f', label: 'Fluid', value: '1000', options: [['1000', 'Fresh water (1000 kg/m³)'], ['1025', 'Sea water (1025 kg/m³)'], ['800', 'Ethanol (800 kg/m³)'], ['1260', 'Glycerin (1260 kg/m³)'], ['13600', 'Mercury (13 600 kg/m³)']] });
    api.buttons([{ label: 'Drop block', primary: true, onClick: drop }]);
    const out = api.readout();
    const s = 0.3, A = s * s, g = 9.8; // cube side 0.3 m
    let y, v; // y = height of block bottom above fluid surface (negative = below)
    const depth = 1.2;
    cv.onResize = () => draw();
    function drop() { y = 0.5; v = 0; }
    function sub(yy) { return Math.max(0, Math.min(s, -yy)); }
    function step(dt) {
      const n = 20, h = dt / n, m = rho.value * s * s * s, rf = +fluid.value;
      for (let i = 0; i < n; i++) {
        const d = sub(y), Fb = rf * g * A * d, drag = (d > 0 ? 3.5 : 0.1) * Math.sqrt(rf * m) * A * v * 3;
        let a = (Fb - m * g - drag) / m;
        v += a * h; y += v * h;
        if (y < -depth) { y = -depth; v = 0; }
      }
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const sc = (cv.h - 40) / (depth + 0.8), surf = 20 + 0.8 * sc, tankL = cv.w * 0.12, tankR = cv.w * 0.62;
      const rf = +fluid.value;
      ctx.fillStyle = U.alpha(rf > 5000 ? C.ink3 : C.accent, 0.22); ctx.fillRect(tankL, surf, tankR - tankL, depth * sc + 0);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tankL, 10); ctx.lineTo(tankL, surf + depth * sc + s * 0); ctx.lineTo(tankR, surf + depth * sc); ctx.lineTo(tankR, 10); ctx.stroke();
      ctx.strokeStyle = U.alpha(C.accent, 0.8); ctx.beginPath(); ctx.moveTo(tankL, surf); ctx.lineTo(tankR, surf); ctx.stroke();
      const bw = s * sc, bx = (tankL + tankR) / 2 - bw / 2, by = surf - y * sc - bw;
      ctx.fillStyle = U.alpha(C.points, 0.9); ctx.fillRect(bx, by, bw, bw);
      const d = sub(y), m = rho.value * s ** 3, Fb = rf * g * A * d, W = m * g;
      const fs = 60 / Math.max(W, rf * g * A * s * 0.5);
      U.arrow(ctx, bx + bw / 2, by + bw / 2, bx + bw / 2, by + bw / 2 + W * fs, C.ink, 2.5, 9); U.text(ctx, 'W', bx + bw / 2 + 6, by + bw / 2 + W * fs, C.ink, U.ui(12));
      if (Fb > 0) { U.arrow(ctx, bx + bw * 0.25, by + bw / 2, bx + bw * 0.25, by + bw / 2 - Fb * fs, C.teal, 2.5, 9); U.text(ctx, 'F_b', bx + bw * 0.25 - 26, by + bw / 2 - Fb * fs, C.teal, U.ui(12)); }
      const frac = rho.value / rf;
      const px = tankR + 24;
      U.text(ctx, 'Archimedes:', px, 40, C.ink2, U.ui(12)); U.text(ctx, 'F_b = ρ_fluid g V_sub', px, 58, C.ink, U.mono(12));
      U.text(ctx, frac < 1 ? 'floats with' : 'sinks:', px, 92, C.ink2, U.ui(12));
      U.text(ctx, frac < 1 ? (frac * 100).toFixed(1) + '% submerged' : 'ρ_b > ρ_fluid', px, 112, frac < 1 ? C.good : C.bad, U.ui(16, 700));
      out([['weight W', W.toFixed(1) + ' N'], ['buoyant force now', Fb.toFixed(1) + ' N'], ['submerged now', ((d / s) * 100).toFixed(1) + '%'], ['equilibrium fraction', frac < 1 ? (frac * 100).toFixed(1) + '%' : 'sinks'], ['apparent weight (if sunk)', frac >= 1 ? (W - rf * g * s ** 3).toFixed(1) + ' N' : '—']]);
    }
    api.loop((dt) => { step(dt); draw(); });
    drop();
  };

  /* =============== Ch10: Superposition of waves =============== */
  PB.sims.superposition = function (api) {
    const cv = api.canvas(0.64);
    const f1 = api.slider({ id: 'f1', label: 'Frequency f<sub>1</sub>', min: 0.2, max: 3, step: 0.05, value: 1, unit: 'Hz' });
    const f2 = api.slider({ id: 'f2', label: 'Frequency f<sub>2</sub>', min: 0.2, max: 3, step: 0.05, value: 1, unit: 'Hz' });
    const a2 = api.slider({ id: 'a2', label: 'Amplitude ratio A<sub>2</sub>/A<sub>1</sub>', min: 0, max: 1, step: 0.01, value: 1 });
    const opp = api.check({ id: 'opp', label: 'Wave 2 travels to the left', value: true });
    const out = api.readout();
    const vw = 1; let t = 0;
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const k1 = (2 * Math.PI * f1.value) / vw, k2 = (2 * Math.PI * f2.value) / vw, w1 = 2 * Math.PI * f1.value, w2 = 2 * Math.PI * f2.value, dir = opp.value ? -1 : 1;
      const L = 4, ph = (cv.h - 20) / 3;
      const y1 = (x) => Math.sin(k1 * x - w1 * t);
      const y2 = (x) => a2.value * Math.sin(k2 * x - dir * w2 * t);
      const rows = [[y1, C.teal, 'wave 1 →'], [y2, C.rust, opp.value ? '← wave 2' : 'wave 2 →'], [(x) => y1(x) + y2(x), C.points, 'sum']];
      rows.forEach((r, i) => {
        const cy = 10 + ph * i + ph / 2, amp = i === 2 ? ph * 0.22 : ph * 0.32;
        ctx.strokeStyle = U.alpha(C.ink3, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(cv.w, cy); ctx.stroke();
        const pts = []; for (let j = 0; j <= 400; j++) { const x = (L * j) / 400; pts.push([(cv.w * j) / 400, cy - amp * r[0](x)]); }
        U.curve(ctx, pts, r[1], i === 2 ? 3 : 2);
        U.text(ctx, r[2], 10, cy - ph * 0.36, r[1], U.ui(12, 700));
      });
      const fb = Math.abs(f1.value - f2.value);
      const standing = opp.value && fb < 1e-9 && Math.abs(a2.value - 1) < 1e-9;
      if (standing) {
        const lam = vw / f1.value, cy = 10 + ph * 2.5;
        for (let x = 0; x <= L + 1e-9; x += lam / 2) { U.dot(ctx, (x / L) * cv.w, cy, 4, C.ink); }
      }
      out([['wave speed', vw + ' m/s'], ['λ₁ = v/f₁', (vw / f1.value).toFixed(2) + ' m'], ['λ₂ = v/f₂', (vw / f2.value).toFixed(2) + ' m'], ['beat frequency |f₁ − f₂|', opp.value ? '—' : fb.toFixed(2) + ' Hz'], ['pattern', standing ? 'standing wave (dots = nodes)' : opp.value ? 'counter-propagating' : fb < 1e-9 ? 'constructive, same direction' : 'beats']]);
    }
    api.loop((dt) => { t += dt; draw(); });
    draw();
  };

  /* =============== Ch10: Doppler effect and shock cones =============== */
  PB.sims.doppler = function (api) {
    const cv = api.canvas(0.55);
    const M = api.slider({ id: 'M', label: 'Source speed (Mach number u/v)', min: 0, max: 2, step: 0.01, value: 0.5 });
    const f = api.slider({ id: 'f', label: 'Emission rate', min: 1, max: 6, step: 0.5, value: 3, unit: 'pulses/s' });
    const out = api.readout();
    let fronts = [], t = 0, xs = 0, lastEmit = 0;
    cv.onResize = () => draw();
    const vs = 120; // px/s
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const cy = cv.h / 2, sx = 40 + xs;
      fronts.forEach((fr) => {
        const r = (t - fr.t) * vs; ctx.strokeStyle = U.alpha(C.accent, Math.max(0, 0.9 - r / (cv.w * 1.1))); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(fr.x, cy, r, 0, Math.PI * 2); ctx.stroke();
      });
      U.dot(ctx, sx, cy, 7, C.points, C.ink);
      if (M.value > 1) {
        const th = Math.asin(1 / M.value), Lc = cv.w;
        ctx.strokeStyle = U.alpha(C.rust, 0.8); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sx, cy); ctx.lineTo(sx - Lc * Math.cos(th), cy - Lc * Math.sin(th)); ctx.moveTo(sx, cy); ctx.lineTo(sx - Lc * Math.cos(th), cy + Lc * Math.sin(th)); ctx.stroke();
      }
      const m = M.value;
      out([['ahead (approaching)', m < 1 ? 'f′ = ' + (1 / (1 - m)).toFixed(2) + ' f' : 'no sound before the shock'], ['behind (receding)', 'f′ = ' + (1 / (1 + m)).toFixed(2) + ' f'], ['Mach cone half-angle', m > 1 ? (Math.asin(1 / m) / U.deg).toFixed(1) + '°' : '—']]);
    }
    api.loop((dt) => {
      t += dt; const u = M.value * vs; xs += u * dt;
      if (40 + xs > cv.w + 60) { xs = 0; fronts = []; }
      const sx = 40 + xs;
      if (t - lastEmit > 1 / f.value) { lastEmit = t; fronts.push({ x: sx, t: t }); }
      fronts = fronts.filter((fr) => (t - fr.t) * vs < cv.w * 1.3);
      draw();
    });
    draw();
  };
})();
