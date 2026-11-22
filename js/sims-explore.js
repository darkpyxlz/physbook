/* Scibook: a general "explorer" lab. A chapter describes its controls, plots and optional picture as a config,
   so many small interactive models can share one engine. Used as { sim: 'explore', params: {...} }. */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;
  const COLS = ['accent', 'rust', 'teal', 'points', 'good', 'ink3', 'ink2'];
  const col = (C, c) => (c && C[c] ? C[c] : c || C.accent);
  PB.fx = (x, s) => PB.fmt(x, s || 3);
  PB.sims.explore = function (api, P) {
    P = P || {};
    const cv = api.canvas(P.aspect || 0.52, P.minH);
    const v = { t: 0 };
    const ctls = {};
    const redraw = () => { if (!P.animate) draw(0); };
    (P.controls || []).forEach((c) => {
      if (c.type === 'select') ctls[c.id] = api.select({ id: c.id, label: c.label, value: c.value, options: c.options, onChange: (x) => { v[c.id] = x; if (c.onChange) c.onChange(v); redraw(); } });
      else if (c.type === 'check') ctls[c.id] = api.check({ id: c.id, label: c.label, value: !!c.value, onChange: (x) => { v[c.id] = x; redraw(); } });
      else ctls[c.id] = api.slider({ id: c.id, label: c.label, min: c.min, max: c.max, step: c.step, value: c.value, unit: c.unit, format: c.format, onChange: (x) => { v[c.id] = x; if (c.onChange) c.onChange(v); redraw(); } });
      v[c.id] = c.type === 'check' ? !!c.value : c.value;
    });
    if (P.buttons) api.buttons(P.buttons.map((b) => ({ label: b.label, primary: b.primary, onClick: () => { b.action(v, ctls); Object.keys(ctls).forEach((k) => { if (ctls[k] && 'value' in ctls[k] && v[k] !== undefined && typeof v[k] !== 'boolean') { try { ctls[k].value = v[k]; } catch (e) { /* select */ } } }); redraw(); } })));
    const out = P.readout ? api.readout() : null;
    if (P.init) P.init(v);
    cv.onResize = () => redraw();
    function layout() {
      const plots = P.plots || [], hasPic = !!P.draw;
      const n = plots.length + (hasPic ? 1 : 0);
      const boxes = [];
      const W = cv.w, H = cv.h;
      const picFrac = P.picFrac || 0.45;
      let x0 = 0;
      if (hasPic) { const w = plots.length ? W * picFrac : W; boxes.push({ pic: true, x: 0, y: 0, w: w, h: H }); x0 = w; }
      const rest = W - x0, pw = plots.length ? rest / plots.length : 0;
      plots.forEach((p, i) => boxes.push({ plot: p, x: x0 + i * pw + 52, y: 18, w: pw - 66, h: H - 50 }));
      return { boxes: boxes, n: n };
    }
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx;
      if (P.animate) v.t += dt * (P.speed || 1);
      if (P.step) P.step(v, dt);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const L = layout();
      L.boxes.forEach((bx) => {
        if (bx.pic) { ctx.save(); P.draw(ctx, C, v, bx, U); ctx.restore(); return; }
        const p = bx.plot;
        const xr = typeof p.x === 'function' ? p.x(v) : p.x, yr0 = typeof p.y === 'function' ? p.y(v) : p.y;
        const curves = p.curves ? p.curves(v) : [];
        const N = p.n || 240;
        const data = curves.map((c) => { const pts = []; const a = c.from != null ? c.from : xr[0], b = c.to != null ? c.to : xr[1]; for (let i = 0; i <= N; i++) { const x = a + (b - a) * i / N; let y; try { y = c.f(x, v); } catch (e) { y = NaN; } pts.push([x, y]); } return { c: c, pts: pts }; });
        let yr = yr0;
        if (!yr || yr === 'auto') { let lo = Infinity, hi = -Infinity; data.forEach((d) => d.pts.forEach((q) => { if (isFinite(q[1])) { lo = Math.min(lo, q[1]); hi = Math.max(hi, q[1]); } })); if (!isFinite(lo)) { lo = 0; hi = 1; } if (lo === hi) { lo -= 1; hi += 1; } const pad = (hi - lo) * 0.08; yr = [p.zero !== false && lo >= 0 ? 0 : lo - pad, hi + pad]; }
        const m = U.frame(ctx, C, bx, xr, yr, { xlabel: p.xlabel, ylabel: p.ylabel, xticks: p.xticks, yticks: p.yticks, xfmt: p.xfmt, yfmt: p.yfmt, nx: p.nx, ny: p.ny || 4 });
        U.clip(ctx, bx);
        if (p.bands) p.bands(v).forEach((bd) => { ctx.fillStyle = U.alpha(col(C, bd.color || 'good'), bd.alpha || 0.14); ctx.fillRect(m.X(bd.x0), bx.y, m.X(bd.x1) - m.X(bd.x0), bx.h); });
        data.forEach((d) => U.curve(ctx, d.pts.map((q) => [m.X(q[0]), isFinite(q[1]) ? m.Y(Math.max(yr[0] - (yr[1] - yr[0]), Math.min(yr[1] + (yr[1] - yr[0]), q[1]))) : NaN]), col(C, d.c.color), d.c.width || 2.2, d.c.dash));
        if (p.vlines) p.vlines(v).forEach((l) => { ctx.strokeStyle = U.alpha(col(C, l.color || 'ink3'), 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(m.X(l.x), bx.y); ctx.lineTo(m.X(l.x), bx.y + bx.h); ctx.stroke(); ctx.setLineDash([]); if (l.label) U.text(ctx, l.label, m.X(l.x) + 4, bx.y + 12, col(C, l.color || 'ink2'), U.ui(10.5)); });
        if (p.hlines) p.hlines(v).forEach((l) => { ctx.strokeStyle = U.alpha(col(C, l.color || 'ink3'), 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(bx.x, m.Y(l.y)); ctx.lineTo(bx.x + bx.w, m.Y(l.y)); ctx.stroke(); ctx.setLineDash([]); if (l.label) U.text(ctx, l.label, bx.x + bx.w - 4, m.Y(l.y) - 4, col(C, l.color || 'ink2'), U.ui(10.5), 'right'); });
        if (p.pts) p.pts(v).forEach((q) => { if (!isFinite(q.x) || !isFinite(q.y)) return; U.dot(ctx, m.X(q.x), m.Y(q.y), q.r || 5, col(C, q.color || 'points'), q.ring === false ? null : C.ink); if (q.label) U.text(ctx, q.label, m.X(q.x) + 7, m.Y(q.y) - 6, C.ink2, U.ui(10.5)); });
        ctx.restore();
        let ly = bx.y + 14;
        data.forEach((d) => { if (d.c.label) { U.text(ctx, d.c.label, bx.x + bx.w - 6, ly, col(C, d.c.color), U.ui(10.5, 700), 'right'); ly += 14; } });
        if (p.title) U.text(ctx, p.title, bx.x + 2, bx.y - 5, C.ink, U.ui(12, 700));
      });
      if (out) out(P.readout(v));
    }
    if (P.animate) api.loop((dt) => draw(Math.min(dt, 0.05)));
    else draw(0);
  };
  PB.addLabs = function (chId, labs) {
    const ch = PB.chapter(chId);
    if (!ch) { console.warn('addLabs: no chapter ' + chId); return; }
    ch.labs = (ch.labs || []).concat(labs);
  };
})();
