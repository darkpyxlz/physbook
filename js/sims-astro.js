/* Scibook astronomy labs. Standard formulae of spherical astronomy, orbital mechanics and astrophysics. */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;
  const D = Math.PI / 180;
  const randn = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  const logTicks = (a, b) => { const t = []; for (let k = Math.ceil(a); k <= Math.floor(b); k++) t.push(k); return t; };
  const pow10 = (v) => { const x = Math.pow(10, v); return x >= 1000 || x < 0.01 ? '10^' + v : String(+x.toPrecision(3)); };

  /* =============== Paths of stars across the sky (Astro 1) =============== */
  PB.sims.skypath = function (api) {
    const cv = api.canvas(0.5);
    const lat = api.slider({ id: 'lat', label: 'Observer latitude', min: -90, max: 90, step: 1, value: 52, unit: '°', onChange: () => {} });
    const dec = api.slider({ id: 'dec', label: 'Star declination', min: -90, max: 90, step: 1, value: 20, unit: '°' });
    const out = api.readout();
    let H = 0;
    cv.onResize = () => {};
    const altaz = (phi, del, h) => {
      const sa = Math.sin(phi) * Math.sin(del) + Math.cos(phi) * Math.cos(del) * Math.cos(h), alt = Math.asin(Math.max(-1, Math.min(1, sa)));
      const ca = (Math.sin(del) - sa * Math.sin(phi)) / (Math.cos(alt) * Math.cos(phi) || 1e-9);
      let az = Math.acos(Math.max(-1, Math.min(1, ca)));
      if (Math.sin(h) > 0) az = 2 * Math.PI - az;
      return [alt / D, az / D];
    };
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx;
      H = (H + dt * 0.8) % (2 * Math.PI);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 44, y: 16, w: cv.w - 60, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [0, 360], [-90, 90], { xticks: [0, 90, 180, 270, 360], xfmt: (v) => ({ 0: 'N', 90: 'E', 180: 'S', 270: 'W', 360: 'N' })[v], yticks: [-90, -45, 0, 45, 90], ylabel: 'altitude (°)' });
      ctx.fillStyle = U.alpha(C.good, 0.12); ctx.fillRect(b.x, m.Y(0), b.w, b.y + b.h - m.Y(0));
      U.text(ctx, 'below the horizon', b.x + 6, b.y + b.h - 6, C.ink3, U.ui(10.5));
      const phi = lat.value * D;
      const path = (del, col, lw, dash) => { const pts = []; let prev = null; for (let i = 0; i <= 360; i++) { const p = altaz(phi, del, i * D); if (prev != null && Math.abs(p[1] - prev) > 180) pts.push(null); pts.push([m.X(p[1]), m.Y(p[0])]); prev = p[1]; } U.curve(ctx, pts, col, lw, dash); };
      path(0, U.alpha(C.ink3, 0.7), 1.3, [4, 4]);
      path(23.44 * D, U.alpha(C.points, 0.5), 1.2, [2, 4]); path(-23.44 * D, U.alpha(C.points, 0.5), 1.2, [2, 4]);
      path(dec.value * D, C.accent, 2.5);
      const p = altaz(phi, dec.value * D, H);
      U.dot(ctx, m.X(p[1]), m.Y(p[0]), 6, '#ffd75e', C.ink);
      U.text(ctx, 'dashed: celestial equator; dotted: Sun at the solstices', b.x + b.w - 4, b.y + 12, C.ink2, U.ui(10.5), 'right');
      const del = dec.value * D, x = -Math.tan(phi) * Math.tan(del);
      const up = x <= -1 ? 24 : x >= 1 ? 0 : (2 * Math.acos(x) / D) / 15;
      const maxAlt = 90 - Math.abs(lat.value - dec.value);
      out([['highest altitude (upper culmination)', maxAlt.toFixed(0) + '°'], ['lowest altitude', (Math.abs(lat.value + dec.value) - 90).toFixed(0) + '°'], ['time above the horizon', up.toFixed(1) + ' h per sidereal day'], ['status', up >= 24 ? 'circumpolar: never sets' : up <= 0 ? 'never rises here' : 'rises and sets']]);
    }
    api.loop((dt) => draw(Math.min(dt, 0.05)));
  };

  /* =============== Seasons and day length (Astro 2) =============== */
  PB.sims.daylight = function (api) {
    const cv = api.canvas(0.5);
    const lat = api.slider({ id: 'lat', label: 'Latitude', min: -90, max: 90, step: 1, value: 52, unit: '°', onChange: () => draw() });
    const day = api.slider({ id: 'd', label: 'Day of the year', min: 1, max: 365, step: 1, value: 172, format: (v) => { const dt = new Date(2026, 0, v); return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }, onChange: () => draw() });
    const tilt = api.slider({ id: 't', label: 'Axial tilt', min: 0, max: 90, step: 0.5, value: 23.5, unit: '°', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const decl = (d) => -tilt.value * Math.cos(2 * Math.PI * (d + 10) / 365);
    const len = (phi, del) => { const x = -Math.tan(phi * D) * Math.tan(del * D); return x <= -1 ? 24 : x >= 1 ? 0 : (2 * Math.acos(x) / D) / 15; };
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 44, y: 16, w: cv.w - 60, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [1, 365], [0, 24], { xticks: [1, 91, 182, 274, 365], xfmt: (v) => ({ 1: 'Jan', 91: 'Apr', 182: 'Jul', 274: 'Oct', 365: 'Dec' })[v], yticks: [0, 6, 12, 18, 24], ylabel: 'hours of daylight', xlabel: 'date' });
      const p1 = [], p0 = []; for (let d = 1; d <= 365; d++) { p1.push([m.X(d), m.Y(len(lat.value, decl(d)))]); p0.push([m.X(d), m.Y(len(0, decl(d)))]); }
      U.curve(ctx, p0, U.alpha(C.ink3, 0.7), 1.3, [4, 4]); U.curve(ctx, p1, C.accent, 2.5);
      const del = decl(day.value), L = len(lat.value, del);
      U.dot(ctx, m.X(day.value), m.Y(L), 5, C.points, C.ink);
      U.text(ctx, 'dashed: equator', b.x + b.w - 4, b.y + 12, C.ink2, U.ui(10.5), 'right');
      const noon = 90 - Math.abs(lat.value - del);
      const ca = Math.sin(del * D) / Math.cos(lat.value * D);
      const riseAz = Math.abs(ca) <= 1 ? Math.acos(ca) / D : null;
      out([['solar declination', del.toFixed(1) + '°'], ['daylight', L.toFixed(2) + ' h'], ['noon altitude of the Sun', noon.toFixed(1) + '°' + (noon < 0 ? ' (polar night)' : '')], ['sunrise azimuth', riseAz == null ? 'no sunrise' : riseAz.toFixed(0) + '° (90° = due east)'], ['relative insolation at noon', noon > 0 ? (Math.sin(noon * D) * 100).toFixed(0) + '% of overhead Sun' : '0']]);
    }
    draw();
  };

  /* =============== Phases of the Moon (Astro 3) =============== */
  PB.sims.moonphase = function (api) {
    const cv = api.canvas(0.5);
    const age = api.slider({ id: 'a', label: 'Days since new moon', min: 0, max: 29.5, step: 0.1, value: 4, onChange: () => draw() });
    const play = api.check({ id: 'p', label: 'Animate', value: false });
    const south = api.check({ id: 's', label: 'View from the southern hemisphere', value: false, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const names = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const th = 2 * Math.PI * age.value / 29.53;
      const cx = cv.w * 0.26, cy = cv.h / 2, r = Math.min(cv.w * 0.2, cv.h * 0.38);
      // top-down: Sun to the right
      for (let i = 0; i < 6; i++) U.arrow(ctx, cv.w * 0.5, cy - r + i * r * 0.4, cv.w * 0.46, cy - r + i * r * 0.4, U.alpha('#f0b429', 0.7), 1.5, 6);
      U.text(ctx, 'sunlight', cv.w * 0.48, cy - r - 10, '#c98a00', U.ui(11, 700), 'center');
      ctx.strokeStyle = U.alpha(C.ink3, 0.4); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      U.dot(ctx, cx, cy, 12, '#3a7bd5'); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.arc(cx, cy, 12, Math.PI / 2, 3 * Math.PI / 2); ctx.fill();
      const mx = cx + r * Math.cos(th), my = cy - r * Math.sin(th);
      U.dot(ctx, mx, my, 8, '#d9d9d9'); ctx.fillStyle = 'rgba(20,20,30,0.75)'; ctx.beginPath(); ctx.arc(mx, my, 8, Math.PI / 2, 3 * Math.PI / 2); ctx.fill();
      U.text(ctx, 'Earth', cx, cy + 28, C.ink2, U.ui(11), 'center'); U.text(ctx, 'view from above the north pole', cx, cv.h - 8, C.ink3, U.ui(10.5), 'center');
      // appearance
      const ax = cv.w * 0.76, R = Math.min(cv.w * 0.18, cv.h * 0.4);
      ctx.fillStyle = '#0b1020'; ctx.fillRect(cv.w * 0.56, 8, cv.w * 0.42, cv.h - 16);
      U.dot(ctx, ax, cy, R, '#2a2f3a');
      const flip = south.value ? -1 : 1;
      ctx.fillStyle = '#ece8dc'; ctx.beginPath();
      const N = 60;
      for (let i = 0; i <= N; i++) { const y = -R + (2 * R * i) / N, s = Math.sqrt(Math.max(0, 1 - (y / R) * (y / R))); const xl = th <= Math.PI ? R * s : -R * s; const pX = ax + flip * xl; i ? ctx.lineTo(pX, cy + y) : ctx.moveTo(pX, cy + y); }
      for (let i = N; i >= 0; i--) { const y = -R + (2 * R * i) / N, s = Math.sqrt(Math.max(0, 1 - (y / R) * (y / R))); const xt = (th <= Math.PI ? 1 : -1) * R * Math.cos(th) * s; ctx.lineTo(ax + flip * xt, cy + y); }
      ctx.closePath(); ctx.fill();
      U.text(ctx, 'as seen from Earth', ax, cv.h - 16, '#aab', U.ui(10.5), 'center');
      const k = (1 - Math.cos(th)) / 2, idx = Math.round(age.value / 29.53 * 8) % 8;
      const rise = (6 + 24 * age.value / 29.53) % 24;
      out([['phase', names[idx]], ['illuminated fraction', (k * 100).toFixed(0) + '%'], ['elongation from the Sun', (th / D > 180 ? 360 - th / D : th / D).toFixed(0) + '°'], ['rises at about', String(Math.floor(rise)).padStart(2, '0') + ':' + String(Math.round((rise % 1) * 60) % 60).padStart(2, '0') + ' local solar time']]);
    }
    api.loop((dt) => { if (play.value) { age.value = (age.value + dt * 2) % 29.5; draw(); } });
    draw();
  };

  /* =============== Telescope resolution (Astro 4) =============== */
  function J1(x) { let s = 0; const n = 80; for (let i = 0; i < n; i++) { const t = (i + 0.5) * Math.PI / n; s += Math.cos(t - x * Math.sin(t)); } return s / n; }
  const airy = (x) => (Math.abs(x) < 1e-6 ? 1 : Math.pow((2 * J1(x)) / x, 2));
  PB.sims.telescope = function (api) {
    const cv = api.canvas(0.5);
    const Dm = api.slider({ id: 'D', label: 'Aperture diameter', min: 20, max: 500, step: 5, value: 100, unit: 'mm', onChange: () => draw() });
    const sep = api.slider({ id: 's', label: 'Separation of the double star', min: 0.2, max: 6, step: 0.05, value: 1.5, unit: '″', onChange: () => draw() });
    const lam = api.slider({ id: 'l', label: 'Wavelength', min: 400, max: 700, step: 10, value: 550, unit: 'nm', onChange: () => draw() });
    const fl = api.slider({ id: 'f', label: 'Focal length', min: 400, max: 3000, step: 50, value: 1000, unit: 'mm', onChange: () => draw() });
    const ep = api.slider({ id: 'e', label: 'Eyepiece focal length', min: 4, max: 40, step: 1, value: 10, unit: 'mm', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const res = 1.22 * lam.value * 1e-9 / (Dm.value * 1e-3) / D * 3600; // arcsec
      const kx = (a) => Math.PI * (Dm.value * 1e-3) * (a * D / 3600) / (lam.value * 1e-9);
      const half = 5;
      // image
      const S = Math.floor(Math.min(cv.h - 30, cv.w * 0.38)), x0 = 14, y0 = 12, n = 90, cell = S / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const ax = -half + (2 * half * (i + 0.5)) / n, ay = -half + (2 * half * (j + 0.5)) / n;
        const r1 = Math.hypot(ax + sep.value / 2, ay), r2 = Math.hypot(ax - sep.value / 2, ay);
        const I = Math.min(1, 0.55 * (airy(kx(r1)) + airy(kx(r2))));
        const g = Math.round(255 * Math.pow(I, 0.45));
        ctx.fillStyle = 'rgb(' + g + ',' + g + ',' + Math.min(255, g + 20) + ')'; ctx.fillRect(x0 + i * cell, y0 + j * cell, cell + 0.6, cell + 0.6);
      }
      U.text(ctx, '10″ field of view', x0 + S / 2, y0 + S + 14, C.ink2, U.ui(10.5), 'center');
      const b = { x: x0 + S + 50, y: 16, w: cv.w - S - 80, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [-half, half], [0, 1.3], { xlabel: 'angle (″)', ylabel: 'intensity', ny: 2 });
      const p1 = [], p2 = [], ps = [];
      for (let i = 0; i <= 300; i++) { const a = -half + (2 * half * i) / 300, i1 = airy(kx(a + sep.value / 2)), i2 = airy(kx(a - sep.value / 2)); p1.push([m.X(a), m.Y(i1)]); p2.push([m.X(a), m.Y(i2)]); ps.push([m.X(a), m.Y(i1 + i2)]); }
      U.curve(ctx, p1, U.alpha(C.teal, 0.7), 1.2, [4, 3]); U.curve(ctx, p2, U.alpha(C.rust, 0.7), 1.2, [4, 3]); U.curve(ctx, ps, C.accent, 2.3);
      const mag = fl.value / ep.value, lim = 7.7 + 5 * Math.log10(Dm.value / 10);
      out([['Rayleigh limit 1.22λ/D', res.toFixed(2) + '″'], ['double star', sep.value >= res ? 'resolved' : 'not resolved'], ['magnification f/fₑ', mag.toFixed(0) + '×'], ['exit pupil', (Dm.value / mag).toFixed(1) + ' mm'], ['light grasp vs 7 mm eye', Math.round(Math.pow(Dm.value / 7, 2)) + '×'], ['limiting magnitude ≈', lim.toFixed(1)]]);
    }
    draw();
  };

  /* =============== Planetary temperatures (Astro 6) =============== */
  const PLANETS = [['Mercury', 0.387, 0.088, 440], ['Venus', 0.723, 0.76, 737], ['Earth', 1.0, 0.306, 288], ['Mars', 1.524, 0.25, 210], ['Jupiter', 5.20, 0.343, 165], ['Saturn', 9.58, 0.342, 134], ['Uranus', 19.2, 0.30, 76], ['Neptune', 30.1, 0.29, 72]];
  PB.sims.eqtemp = function (api) {
    const cv = api.canvas(0.52);
    const A = api.slider({ id: 'A', label: 'Bond albedo', min: 0, max: 0.9, step: 0.01, value: 0.3, onChange: () => draw() });
    const tau = api.slider({ id: 't', label: 'Greenhouse optical depth τ', min: 0, max: 100, step: 0.1, value: 0.84, onChange: () => draw() });
    const Ls = api.slider({ id: 'L', label: 'Star luminosity', min: 0.01, max: 10, step: 0.01, value: 1, format: (v) => v.toFixed(2) + ' L☉', onChange: () => draw() });
    const d = api.slider({ id: 'd', label: 'Orbital distance', min: 0.1, max: 40, step: 0.01, value: 1, unit: 'AU', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const Teq = (dist, alb) => 278.6 * Math.pow(Ls.value, 0.25) * Math.pow(1 - alb, 0.25) / Math.sqrt(dist);
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 50, y: 16, w: cv.w - 66, h: cv.h - 48 };
      const m = U.frame(ctx, C, b, [-1, 1.7], [0, 800], { xticks: [-1, 0, 1], xfmt: pow10, xlabel: 'distance from the star (AU)', ylabel: 'temperature (K)', ny: 4 });
      const g = Math.pow(1 + 0.75 * tau.value, 0.25);
      // habitable band
      let hzIn = null, hzOut = null;
      for (let i = 0; i <= 400; i++) { const lx = -1 + (2.7 * i) / 400, T = Teq(Math.pow(10, lx), A.value) * g; if (T <= 373 && hzIn == null) hzIn = lx; if (T >= 273) hzOut = lx; }
      if (hzIn != null && hzOut != null && hzOut > hzIn) { ctx.fillStyle = U.alpha(C.good, 0.15); ctx.fillRect(m.X(hzIn), b.y, m.X(hzOut) - m.X(hzIn), b.h); U.text(ctx, 'liquid water', (m.X(hzIn) + m.X(hzOut)) / 2, b.y + b.h - 8, C.good, U.ui(10.5, 700), 'center'); }
      const p1 = [], p2 = [];
      for (let i = 0; i <= 300; i++) { const lx = -1 + (2.7 * i) / 300, dd = Math.pow(10, lx); p1.push([m.X(lx), m.Y(Teq(dd, A.value))]); p2.push([m.X(lx), m.Y(Teq(dd, A.value) * g)]); }
      U.clip(ctx, b); U.curve(ctx, p1, U.alpha(C.ink3, 0.8), 1.5, [5, 4]); U.curve(ctx, p2, C.accent, 2.4); ctx.restore();
      if (Math.abs(Ls.value - 1) < 0.005) PLANETS.forEach((p) => { const x = m.X(Math.log10(p[1])), y = m.Y(Math.min(790, p[3])); U.dot(ctx, x, y, 4, C.rust); U.text(ctx, p[0], x + 5, y - 5, C.ink2, U.ui(10)); });
      const T0 = Teq(d.value, A.value), Ts = T0 * g;
      U.dot(ctx, m.X(Math.log10(d.value)), m.Y(Math.min(790, Ts)), 6, C.points, C.ink);
      out([['equilibrium temperature', T0.toFixed(0) + ' K'], ['surface with greenhouse', Ts.toFixed(0) + ' K (' + (Ts - 273.15).toFixed(0) + ' °C)'], ['stellar flux', (1361 * Ls.value / (d.value * d.value)).toFixed(0) + ' W/m²'], ['red dots', 'measured mean temperatures of the planets']]);
    }
    draw();
  };

  /* =============== Hohmann transfer (Astro 7) =============== */
  PB.sims.hohmann = function (api) {
    const cv = api.canvas(0.55);
    const r1 = api.slider({ id: 'a', label: 'Departure orbit radius', min: 0.3, max: 10, step: 0.01, value: 1, unit: 'AU', onChange: () => reset() });
    const r2 = api.slider({ id: 'b', label: 'Target orbit radius', min: 0.3, max: 30, step: 0.01, value: 1.52, unit: 'AU', onChange: () => reset() });
    api.buttons([{ label: 'Launch at the right moment', primary: true, onClick: () => reset() }]);
    const out = api.readout();
    let t = 0;
    cv.onResize = () => {};
    function reset() { t = 0; }
    api.loop((dt) => {
      const C = api.colors(), ctx = cv.ctx;
      const a1 = r1.value, a2 = r2.value, at = (a1 + a2) / 2, tt = 0.5 * Math.pow(at, 1.5);
      const T1 = Math.pow(a1, 1.5), T2 = Math.pow(a2, 1.5);
      t = Math.min(t + dt * 0.12 * Math.max(0.3, tt), tt * 1.15);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const cx = cv.w * 0.36, cy = cv.h / 2, sc = (Math.min(cv.w * 0.33, cv.h * 0.45)) / Math.max(a1, a2);
      U.dot(ctx, cx, cy, 7, '#f6c443');
      [a1, a2].forEach((r, i) => { ctx.strokeStyle = U.alpha(i ? C.rust : C.accent, 0.45); ctx.beginPath(); ctx.arc(cx, cy, r * sc, 0, Math.PI * 2); ctx.stroke(); });
      // transfer ellipse: perihelion at angle 0 (departure), aphelion at pi if a2 > a1
      const e = Math.abs(a2 - a1) / (a2 + a1), out2 = a2 > a1;
      ctx.strokeStyle = U.alpha(C.points, 0.7); ctx.setLineDash([5, 4]); ctx.beginPath();
      for (let k = 0; k <= 100; k++) { const nu = Math.PI * k / 100, r = at * (1 - e * e) / (1 + (out2 ? 1 : -1) * e * Math.cos(nu)); const x = cx + r * Math.cos(nu) * sc, y = cy - r * Math.sin(nu) * sc; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke(); ctx.setLineDash([]);
      // phase angle so target arrives at pi
      const lead = Math.PI - 2 * Math.PI * tt / T2;
      const th1 = 2 * Math.PI * t / T1, th2 = lead + 2 * Math.PI * t / T2;
      U.dot(ctx, cx + a1 * sc * Math.cos(th1), cy - a1 * sc * Math.sin(th1), 5, C.accent);
      U.dot(ctx, cx + a2 * sc * Math.cos(th2), cy - a2 * sc * Math.sin(th2), 5, C.rust);
      // spacecraft: solve Kepler on the transfer orbit
      const M = (out2 ? 0 : Math.PI) + Math.min(Math.PI, Math.PI * t / tt); let E = M; for (let k = 0; k < 30; k++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2)), rr = at * (1 - e * Math.cos(E));
      const ang = out2 ? nu : nu - Math.PI;
      U.dot(ctx, cx + rr * sc * Math.cos(ang), cy - rr * sc * Math.sin(ang), 4, C.ink);
      U.text(ctx, 'blue: departure planet   red: target   black: spacecraft', 10, cv.h - 8, C.ink2, U.ui(10.5));
      const v1 = 29.78 / Math.sqrt(a1), v2 = 29.78 / Math.sqrt(a2);
      const dv1 = Math.abs(v1 * (Math.sqrt(2 * a2 / (a1 + a2)) - 1)), dv2 = Math.abs(v2 * (1 - Math.sqrt(2 * a1 / (a1 + a2))));
      const syn = 1 / Math.abs(1 / T1 - 1 / T2);
      let leadDeg = (lead / D) % 360; if (leadDeg < 0) leadDeg += 360;
      out([['transfer time', (tt * 365.25).toFixed(0) + ' days (' + tt.toFixed(2) + ' yr)'], ['Δv at departure', dv1.toFixed(2) + ' km/s'], ['Δv at arrival', dv2.toFixed(2) + ' km/s'], ['target must lead by', leadDeg.toFixed(0) + '° at launch'], ['launch windows every', isFinite(syn) ? syn.toFixed(2) + ' yr (synodic period)' : '—']]);
    });
  };

  /* =============== Radial velocity of a star with a planet (Astro 8) =============== */
  PB.sims.radvel = function (api) {
    const cv = api.canvas(0.5);
    const Mp = api.slider({ id: 'm', label: 'Planet mass', min: 0.003, max: 10, step: 0.001, value: 1, format: (v) => (v < 0.1 ? (v * 317.8).toFixed(1) + ' M⊕' : v.toFixed(2) + ' M_J'), onChange: () => obs() });
    const P = api.slider({ id: 'P', label: 'Orbital period', min: 1, max: 4000, step: 1, value: 365, unit: 'days', onChange: () => obs() });
    const Ms = api.slider({ id: 's', label: 'Star mass', min: 0.1, max: 2, step: 0.01, value: 1, unit: 'M☉', onChange: () => obs() });
    const ecc = api.slider({ id: 'e', label: 'Eccentricity', min: 0, max: 0.8, step: 0.01, value: 0, onChange: () => obs() });
    const inc = api.slider({ id: 'i', label: 'Inclination', min: 5, max: 90, step: 1, value: 90, unit: '°', onChange: () => obs() });
    const sig = api.slider({ id: 'n', label: 'Measurement noise', min: 0.1, max: 20, step: 0.1, value: 3, unit: 'm/s', onChange: () => obs() });
    const out = api.readout();
    let pts = [];
    cv.onResize = () => draw();
    const K = () => 28.43 * Mp.value * Math.sin(inc.value * D) * Math.pow(P.value / 365.25, -1 / 3) * Math.pow(Ms.value, -2 / 3) / Math.sqrt(1 - ecc.value * ecc.value);
    const vr = (ph) => { const e = ecc.value, M = 2 * Math.PI * ph; let E = M; for (let k = 0; k < 40; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2)); const w = Math.PI / 2; return K() * (Math.cos(nu + w) + e * Math.cos(w)); };
    function obs() { pts = []; for (let i = 0; i < 30; i++) { const ph = Math.random(); pts.push([ph, vr(ph) + sig.value * randn()]); } draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const k = K(), ym = Math.max(k * 1.6, sig.value * 3, 1) * (1 + ecc.value);
      const b = { x: 56, y: 16, w: cv.w - 72, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [0, 1], [-ym, ym], { xlabel: 'orbital phase', ylabel: 'radial velocity (m/s)', ny: 4 });
      const c = []; for (let i = 0; i <= 300; i++) c.push([m.X(i / 300), m.Y(vr(i / 300))]);
      U.curve(ctx, c, C.accent, 2.3);
      pts.forEach((p) => { ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.beginPath(); ctx.moveTo(m.X(p[0]), m.Y(p[1] - sig.value)); ctx.lineTo(m.X(p[0]), m.Y(p[1] + sig.value)); ctx.stroke(); U.dot(ctx, m.X(p[0]), m.Y(p[1]), 3, C.rust); });
      const a = Math.pow(Ms.value * Math.pow(P.value / 365.25, 2), 1 / 3);
      out([['semi-amplitude K', k.toFixed(2) + ' m/s'], ['orbit size a', a.toFixed(3) + ' AU'], ['measured minimum mass', 'M sin i = ' + (Mp.value * Math.sin(inc.value * D)).toFixed(3) + ' M_J'], ['detectable?', k > 2 * sig.value ? 'yes, clearly' : k > sig.value / 2 ? 'marginal: need many points' : 'no: lost in the noise']]);
    }
    obs();
  };

  /* =============== Stellar parallax (Astro 9) =============== */
  PB.sims.parallax = function (api) {
    const cv = api.canvas(0.5);
    const dist = api.slider({ id: 'd', label: 'Distance to the star', min: 1.3, max: 1000, step: 0.1, value: 10, unit: 'pc' });
    const beta = api.slider({ id: 'b', label: 'Ecliptic latitude of the star', min: 0, max: 90, step: 1, value: 50, unit: '°' });
    const out = api.readout();
    let t = 0;
    const bg = []; for (let i = 0; i < 40; i++) bg.push([Math.random(), Math.random(), Math.random()]);
    cv.onResize = () => {};
    api.loop((dt) => {
      const C = api.colors(), ctx = cv.ctx;
      t = (t + dt * 0.25) % 1;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const th = 2 * Math.PI * t;
      // left: geometry (not to scale)
      const cx = cv.w * 0.22, cy = cv.h * 0.7, R = Math.min(cv.w * 0.12, cv.h * 0.2);
      U.dot(ctx, cx, cy, 7, '#f6c443'); ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.35, 0, 0, Math.PI * 2); ctx.stroke();
      const ex = cx + R * Math.cos(th), ey = cy + R * 0.35 * Math.sin(th);
      U.dot(ctx, ex, ey, 5, '#3a7bd5');
      const sx = cx, sy = 26; U.dot(ctx, sx, sy, 4, C.rust);
      ctx.strokeStyle = U.alpha(C.rust, 0.6); ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy); ctx.stroke();
      U.text(ctx, 'Earth’s orbit (not to scale)', cx, cv.h - 8, C.ink3, U.ui(10.5), 'center');
      // right: sky view
      const bx = cv.w * 0.45, bw = cv.w * 0.52, by = 10, bh = cv.h - 20;
      ctx.fillStyle = '#0b1020'; ctx.fillRect(bx, by, bw, bh);
      bg.forEach((s) => U.dot(ctx, bx + s[0] * bw, by + s[1] * bh, 0.8 + s[2] * 1.2, '#c8cfe0'));
      const p = 1 / dist.value; // arcsec
      const scale = (bw * 0.35) / 1.0; // pixels per arcsec at most 1"
      const px = bx + bw / 2 + scale * p * Math.sin(th), py = by + bh / 2 + scale * p * Math.sin(beta.value * D) * -Math.cos(th);
      ctx.strokeStyle = 'rgba(255,170,120,0.5)'; ctx.beginPath(); ctx.ellipse(bx + bw / 2, by + bh / 2, Math.max(0.5, scale * p), Math.max(0.5, scale * p * Math.sin(beta.value * D)), 0, 0, Math.PI * 2); ctx.stroke();
      U.dot(ctx, px, py, 4, '#ffb070');
      U.text(ctx, 'sky over one year (scale: 1″ = ' + (scale).toFixed(0) + ' px)', bx + bw / 2, by + bh - 8, '#aab', U.ui(10.5), 'center');
      out([['parallax p = 1/d', p >= 0.01 ? p.toFixed(3) + '″' : (p * 1000).toFixed(2) + ' mas'], ['distance', dist.value.toFixed(1) + ' pc = ' + (dist.value * 3.262).toFixed(1) + ' light-years'], ['shape on the sky', beta.value > 85 ? 'circle' : beta.value < 3 ? 'line' : 'ellipse'], ['measurable by', p > 0.05 ? 'ground telescopes' : p > 0.001 ? 'Hipparcos (1 mas)' : p > 2e-5 ? 'Gaia (≈ 0.02 mas)' : 'nothing yet']]);
    });
  };

  /* =============== HR diagram and stellar evolution (Astro 11, 13) =============== */
  const NAMED = [['Sun', 5772, 1], ['Sirius A', 9940, 25.4, 9], ['Vega', 9600, 40, -4], ['Betelgeuse', 3600, 1.2e5, -5], ['Rigel', 12100, 1.2e5], ['Aldebaran', 3910, 440], ['Arcturus', 4290, 170], ['Proxima Cen', 3040, 0.0017, 9], ['Sirius B', 25200, 0.056], ['Antares', 3570, 7.5e4, 11], ['Spica', 25300, 2e4], ['Barnard’s', 3130, 0.0035, -4], ['Procyon B', 7740, 0.00049], ['Deneb', 8500, 2e5]];
  PB.sims.hrdiagram = function (api, params) {
    const cv = api.canvas(0.6);
    const mass = api.slider({ id: 'm', label: 'Star mass', min: 0.1, max: 40, step: 0.05, value: 1, unit: 'M☉', onChange: () => draw() });
    const stage = api.select({ id: 's', label: 'Stage', value: (params && params.stage) || 'ms', options: [['ms', 'Main sequence'], ['rg', 'Red giant or supergiant'], ['end', 'End point']], onChange: () => draw() });
    const names = api.check({ id: 'n', label: 'Show named stars', value: true, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const msL = (M) => (M < 0.43 ? 0.23 * Math.pow(M, 2.3) : M < 2 ? Math.pow(M, 4) : M < 55 ? 1.4 * Math.pow(M, 3.5) : 32000 * M);
    const msR = (M) => (M < 1 ? Math.pow(M, 0.8) : Math.pow(M, 0.57));
    const Tof = (L, R) => 5772 * Math.pow(L / (R * R), 0.25);
    function state() {
      const M = mass.value, L0 = msL(M), R0 = msR(M);
      if (stage.value === 'ms') return { L: L0, T: Tof(L0, R0), R: R0, label: 'core hydrogen fusion' };
      if (stage.value === 'rg') { const L = M < 8 ? 1000 * Math.pow(M, 1.2) : 1.5 * L0; const T = M < 8 ? 4000 : M < 15 ? 3700 : 3500; return { L: L, T: T, R: Math.sqrt(L) * Math.pow(5772 / T, 2), label: M < 8 ? 'hydrogen shell burning, then helium in the core' : 'red supergiant burning heavier elements' }; }
      if (M < 8) { const Mw = Math.min(1.35, 0.11 * M + 0.45); return { L: 0.003, T: 20000, R: 0.012 * Math.pow(Mw / 0.6, -1 / 3), label: 'white dwarf of ' + Mw.toFixed(2) + ' M☉ after a planetary nebula' }; }
      return { L: null, label: M < 25 ? 'core-collapse supernova → neutron star' : 'core-collapse → black hole' };
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 46 };
      const lt = [Math.log10(45000), Math.log10(2300)];
      const m = U.frame(ctx, C, b, lt, [-4.5, 6.2], { xticks: [Math.log10(40000), Math.log10(20000), Math.log10(10000), Math.log10(5000), Math.log10(3000)], xfmt: (v) => String(Math.round(Math.pow(10, v) / 100) * 100), yticks: [-4, -2, 0, 2, 4, 6], yfmt: pow10, xlabel: 'surface temperature (K), hot on the left', ylabel: 'luminosity (L☉)' });
      U.clip(ctx, b);
      // constant radius lines
      [0.01, 0.1, 1, 10, 100, 1000].forEach((R) => { const pts = []; for (let k = 0; k <= 40; k++) { const lT = lt[0] + (lt[1] - lt[0]) * k / 40, T = Math.pow(10, lT); pts.push([m.X(lT), m.Y(Math.log10(R * R * Math.pow(T / 5772, 4)))]); } U.curve(ctx, pts, U.alpha(C.ink3, 0.35), 1, [2, 4]); const T = 2600, y = Math.log10(R * R * Math.pow(T / 5772, 4)); U.text(ctx, R + ' R☉', m.X(Math.log10(T)) - 4, m.Y(y) - 3, C.ink3, U.mono(9), 'right'); });
      // main sequence
      const ms = []; for (let k = 0; k <= 120; k++) { const M = Math.pow(10, -1 + 2.6 * k / 120); ms.push([m.X(Math.log10(Tof(msL(M), msR(M)))), m.Y(Math.log10(msL(M)))]); }
      ctx.lineCap = 'round'; ctx.strokeStyle = U.alpha(C.accent, 0.22); ctx.lineWidth = 14; ctx.beginPath(); ms.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.lineWidth = 1;
      if (names.value) NAMED.forEach((s) => { const x = m.X(Math.log10(s[1])), y = m.Y(Math.log10(s[2])); const rgb = PB.starColour ? PB.starColour(s[1]) : C.ink2; U.dot(ctx, x, y, 3.5, rgb, U.alpha(C.ink, 0.5)); U.text(ctx, s[0], x + 6, y + 3 + (s[3] || 0), C.ink2, U.ui(10)); });
      ctx.restore();
      const st = state();
      if (st.L) { const x = m.X(Math.log10(st.T)), y = m.Y(Math.log10(st.L)); U.dot(ctx, x, y, 7, PB.starColour ? PB.starColour(st.T) : C.points, C.ink); }
      const tms = 10 * Math.pow(mass.value, -2.5);
      out([['luminosity', st.L ? PB.fmt(st.L, 3) + ' L☉' : '—'], ['temperature', st.L ? Math.round(st.T) + ' K' : '—'], ['radius', st.L ? PB.fmt(st.R, 3) + ' R☉' : '—'], ['main-sequence lifetime ≈ 10 Gyr × M⁻²·⁵', tms >= 1 ? tms.toFixed(2) + ' Gyr' : (tms * 1000).toFixed(1) + ' Myr'], ['what is happening', st.label]]);
    }
    draw();
  };
  PB.starColour = function (T) {
    const t = Math.max(2000, Math.min(40000, T)) / 100; let r, g, bl;
    if (t <= 66) { r = 255; g = 99.47 * Math.log(t) - 161.12; bl = t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04; } else { r = 329.7 * Math.pow(t - 60, -0.1332); g = 288.12 * Math.pow(t - 60, -0.0755); bl = 255; }
    const c = (v) => Math.max(0, Math.min(255, Math.round(v)));
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(bl) + ')';
  };

  /* =============== Eclipsing binary (Astro 12) =============== */
  function overlap(r1, r2, d) {
    if (d >= r1 + r2) return 0;
    if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2;
    const a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)), b = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
    return a + b - 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
  }
  PB.sims.binary = function (api) {
    const cv = api.canvas(0.6);
    const M1 = api.slider({ id: 'm1', label: 'Mass of star 1', min: 0.2, max: 10, step: 0.05, value: 2, unit: 'M☉', onChange: () => draw() });
    const M2 = api.slider({ id: 'm2', label: 'Mass of star 2', min: 0.1, max: 10, step: 0.05, value: 1, unit: 'M☉', onChange: () => draw() });
    const P = api.slider({ id: 'P', label: 'Period', min: 0.5, max: 30, step: 0.1, value: 3, unit: 'days', onChange: () => draw() });
    const inc = api.slider({ id: 'i', label: 'Inclination', min: 60, max: 90, step: 0.5, value: 88, unit: '°', onChange: () => draw() });
    const R1 = api.slider({ id: 'r1', label: 'Radius of star 1', min: 0.3, max: 5, step: 0.05, value: 1.8, unit: 'R☉', onChange: () => draw() });
    const R2 = api.slider({ id: 'r2', label: 'Radius of star 2', min: 0.1, max: 5, step: 0.05, value: 1, unit: 'R☉', onChange: () => draw() });
    const T2 = api.slider({ id: 't2', label: 'Temperature of star 2 (star 1: 9000 K)', min: 3000, max: 20000, step: 100, value: 5500, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const Py = P.value / 365.25, aAU = Math.pow((M1.value + M2.value) * Py * Py, 1 / 3), a = aAU * 215.03; // in solar radii
      const ci = Math.cos(inc.value * D), T1 = 9000;
      const s1 = Math.pow(T1, 4), s2 = Math.pow(T2.value, 4), F0 = Math.PI * (R1.value ** 2 * s1 + R2.value ** 2 * s2);
      const flux = (ph) => { const t = 2 * Math.PI * ph, d = a * Math.sqrt(Math.sin(t) ** 2 + (ci * Math.cos(t)) ** 2), ov = overlap(R1.value, R2.value, d); const front2 = Math.cos(t) > 0; return (F0 - ov * (front2 ? s1 : s2)) / F0; };
      const w = cv.w - 70, h1 = cv.h * 0.5;
      const b1 = { x: 54, y: 16, w: w, h: h1 - 30 };
      let fmin = 1; for (let i = 0; i <= 400; i++) fmin = Math.min(fmin, flux(i / 400));
      const lo = Math.min(0.9, fmin - 0.05);
      const m1 = U.frame(ctx, C, b1, [-0.25, 1.25], [lo, 1.03], { ylabel: 'relative brightness', ny: 3, xfmt: (v) => v.toFixed(2) });
      const lc = []; for (let i = 0; i <= 600; i++) { const ph = -0.25 + 1.5 * i / 600; lc.push([m1.X(ph), m1.Y(flux(ph))]); }
      U.curve(ctx, lc, C.accent, 2);
      const K1 = 2 * Math.PI * a * 696000 * M2.value / (M1.value + M2.value) * Math.sin(inc.value * D) / (P.value * 86400), K2 = K1 * M1.value / M2.value;
      const b2 = { x: 54, y: h1 + 10, w: w, h: cv.h - h1 - 40 };
      const km = Math.max(K1, K2) * 1.15;
      const m2 = U.frame(ctx, C, b2, [-0.25, 1.25], [-km, km], { xlabel: 'phase', ylabel: 'radial velocity (km/s)', ny: 2, xfmt: (v) => v.toFixed(2) });
      const v1 = [], v2 = []; for (let i = 0; i <= 300; i++) { const ph = -0.25 + 1.5 * i / 300; v1.push([m2.X(ph), m2.Y(-K1 * Math.sin(2 * Math.PI * ph))]); v2.push([m2.X(ph), m2.Y(K2 * Math.sin(2 * Math.PI * ph))]); }
      U.curve(ctx, v1, C.teal, 2); U.curve(ctx, v2, C.rust, 2);
      U.text(ctx, 'star 1', b2.x + b2.w - 50, b2.y + 13, C.teal, U.ui(11, 700), 'right'); U.text(ctx, 'star 2', b2.x + b2.w - 6, b2.y + 13, C.rust, U.ui(11, 700), 'right');
      const f0 = flux(0), fh = flux(0.5);
      out([['separation a', aAU.toFixed(3) + ' AU = ' + a.toFixed(1) + ' R☉'], ['primary eclipse depth', ((1 - Math.min(f0, fh)) * 100).toFixed(1) + '%'], ['secondary eclipse depth', ((1 - Math.max(f0, fh)) * 100).toFixed(1) + '%'], ['K₁, K₂', K1.toFixed(1) + ', ' + K2.toFixed(1) + ' km/s'], ['mass ratio K₁/K₂ = M₂/M₁', (K1 / K2).toFixed(3)]]);
    }
    draw();
  };

  /* =============== Cepheid distances (Astro 15) =============== */
  PB.sims.cepheid = function (api) {
    const cv = api.canvas(0.5);
    const P = api.slider({ id: 'P', label: 'Pulsation period', min: 1, max: 100, step: 0.1, value: 10, unit: 'days', onChange: () => draw() });
    const d = api.slider({ id: 'd', label: 'Distance', min: 0.1, max: 30, step: 0.05, value: 0.77, unit: 'Mpc', onChange: () => draw() });
    const A = api.slider({ id: 'a', label: 'Dust extinction A_V', min: 0, max: 2, step: 0.05, value: 0, unit: 'mag', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const Mv = (p) => -2.43 * (Math.log10(p) - 1) - 4.05;
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const mu = 5 * Math.log10(d.value * 1e6) - 5, M = Mv(P.value), m = M + mu + A.value;
      const half = cv.w * 0.55;
      const b1 = { x: 48, y: 16, w: half - 64, h: cv.h - 46 };
      const amp = 0.4 + 0.25 * Math.log10(P.value);
      const lc = (t) => { const ph = (t / P.value) % 1; return ph < 0.2 ? -amp * (ph / 0.2) + amp / 2 : -amp / 2 + amp * (ph - 0.2) / 0.8; };
      const m1 = U.frame(ctx, C, b1, [0, 3 * P.value], [m + amp, m - amp], { xlabel: 'days', ylabel: 'apparent magnitude', ny: 3, yfmt: (v) => v.toFixed(1) });
      const c = []; for (let i = 0; i <= 400; i++) { const t = 3 * P.value * i / 400; c.push([m1.X(t), m1.Y(m + lc(t))]); }
      U.curve(ctx, c, C.accent, 2);
      const b2 = { x: half + 36, y: 16, w: cv.w - half - 52, h: cv.h - 46 };
      const m2 = U.frame(ctx, C, b2, [0, 2], [-1.5, -7.5], { xticks: [0, 1, 2], xfmt: (v) => String(Math.pow(10, v)), xlabel: 'period (days)', ylabel: 'absolute magnitude', ny: 3 });
      U.curve(ctx, [[m2.X(0), m2.Y(Mv(1))], [m2.X(2), m2.Y(Mv(100))]], C.rust, 2);
      U.dot(ctx, m2.X(Math.log10(P.value)), m2.Y(M), 5, C.points, C.ink);
      const dWrong = Math.pow(10, (m - M + 5) / 5) / 1e6;
      out([['absolute magnitude from the period', M.toFixed(2)], ['mean apparent magnitude', m.toFixed(2)], ['distance modulus m − M', (m - M).toFixed(2)], ['distance ignoring dust', dWrong.toFixed(2) + ' Mpc' + (A.value > 0 ? ' (overestimate)' : '')], ['luminosity', PB.fmt(Math.pow(10, (4.83 - M) / 2.5), 3) + ' L☉']]);
    }
    draw();
  };

  /* =============== Galaxy rotation curve (Astro 14) =============== */
  PB.sims.rotcurve = function (api) {
    const cv = api.canvas(0.52);
    const Mb = api.slider({ id: 'b', label: 'Bulge mass', min: 0, max: 5, step: 0.1, value: 1, format: (v) => v.toFixed(1) + ' × 10¹⁰ M☉', onChange: () => draw() });
    const Md = api.slider({ id: 'd', label: 'Disc mass', min: 0, max: 15, step: 0.1, value: 6, format: (v) => v.toFixed(1) + ' × 10¹⁰ M☉', onChange: () => draw() });
    const vh = api.slider({ id: 'h', label: 'Dark halo speed', min: 0, max: 300, step: 5, value: 170, unit: 'km/s', onChange: () => draw() });
    const rc = api.slider({ id: 'c', label: 'Halo core radius', min: 1, max: 20, step: 0.5, value: 5, unit: 'kpc', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const G = 4.30e-6, Rd = 3, ab = 0.6;
    const vb = (r) => Math.sqrt(G * Mb.value * 1e10 * r * r / Math.pow(r * r + ab * ab, 1.5) * r);
    const vd = (r) => Math.sqrt(G * Md.value * 1e10 * (1 - (1 + r / Rd) * Math.exp(-r / Rd)) / r);
    const vhalo = (r) => vh.value * Math.sqrt(Math.max(0, 1 - (rc.value / r) * Math.atan(r / rc.value)));
    const DATA = [[1, 190], [2, 205], [3, 215], [4, 222], [5, 225], [6, 226], [7, 228], [8, 230], [9, 229], [10, 228], [12, 226], [14, 224], [16, 224], [18, 222], [20, 220], [22, 219], [25, 218]];
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 50, y: 16, w: cv.w - 66, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [0, 26], [0, 320], { xlabel: 'radius (kpc)', ylabel: 'orbital speed (km/s)', ny: 4 });
      const comp = [[vb, C.points, 'bulge'], [vd, C.teal, 'disc'], [vhalo, U.alpha(C.ink3, 0.9), 'dark halo']];
      const tot = (r) => Math.sqrt(vb(r) ** 2 + vd(r) ** 2 + vhalo(r) ** 2), lum = (r) => Math.sqrt(vb(r) ** 2 + vd(r) ** 2);
      comp.forEach((c, i) => { const p = []; for (let k = 1; k <= 260; k++) { const r = k / 10; p.push([m.X(r), m.Y(c[0](r))]); } U.curve(ctx, p, c[1], 1.6, [5, 4]); U.text(ctx, c[2], b.x + b.w - 6, b.y + 14 + i * 14, c[1], U.ui(10.5, 700), 'right'); });
      const p = []; for (let k = 1; k <= 260; k++) { const r = k / 10; p.push([m.X(r), m.Y(tot(r))]); } U.curve(ctx, p, C.accent, 2.6);
      U.text(ctx, 'total', b.x + b.w - 6, b.y + 56, C.accent, U.ui(10.5, 700), 'right');
      DATA.forEach((q) => U.dot(ctx, m.X(q[0]), m.Y(q[1]), 3, C.rust));
      U.text(ctx, 'red: Milky Way-like measurements', b.x + 8, b.y + b.h - 8, C.rust, U.ui(10.5));
      const r0 = 8.2, Menc = (r) => tot(r) ** 2 * r / G;
      const chi = DATA.reduce((s, q) => s + (tot(q[0]) - q[1]) ** 2, 0) / DATA.length;
      out([['speed at the Sun (8.2 kpc)', tot(r0).toFixed(0) + ' km/s'], ['mass inside 25 kpc', PB.fmt(Menc(25), 3) + ' M☉'], ['dark matter share inside 25 kpc', (100 * vhalo(25) ** 2 / tot(25) ** 2).toFixed(0) + '%'], ['rms misfit to data', Math.sqrt(chi).toFixed(1) + ' km/s'], ['without the halo at 25 kpc', lum(25).toFixed(0) + ' km/s (Keplerian decline)']]);
    }
    draw();
  };

  /* =============== Hubble's law (Astro 15) =============== */
  PB.sims.hubble = function (api) {
    const cv = api.canvas(0.5);
    const H0 = api.slider({ id: 'h', label: 'True Hubble constant', min: 50, max: 90, step: 0.5, value: 70, unit: 'km/s/Mpc', onChange: () => gen() });
    const sig = api.slider({ id: 's', label: 'Peculiar velocity scatter', min: 0, max: 1500, step: 50, value: 400, unit: 'km/s', onChange: () => gen() });
    const dmax = api.slider({ id: 'd', label: 'Survey depth', min: 10, max: 400, step: 10, value: 100, unit: 'Mpc', onChange: () => gen() });
    const derr = api.slider({ id: 'e', label: 'Distance error', min: 0, max: 30, step: 1, value: 8, unit: '%', onChange: () => gen() });
    api.buttons([{ label: 'New sample', primary: true, onClick: () => gen() }]);
    const out = api.readout();
    let pts = [];
    cv.onResize = () => draw();
    function gen() { pts = []; for (let i = 0; i < 40; i++) { const d = dmax.value * (0.05 + 0.95 * Math.random()); const v = H0.value * d + sig.value * randn(); pts.push([d * (1 + derr.value / 100 * randn()), v]); } draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 62, y: 16, w: cv.w - 78, h: cv.h - 46 };
      const vmax = H0.value * dmax.value * 1.25 + sig.value;
      const m = U.frame(ctx, C, b, [0, dmax.value * 1.15], [Math.min(0, -sig.value), vmax], { xlabel: 'distance (Mpc)', ylabel: 'recession velocity (km/s)', ny: 4 });
      const sxy = pts.reduce((s, p) => s + p[0] * p[1], 0), sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), H = sxy / sxx;
      U.curve(ctx, [[m.X(0), m.Y(0)], [m.X(dmax.value * 1.15), m.Y(H * dmax.value * 1.15)]], C.accent, 2);
      pts.forEach((p) => U.dot(ctx, m.X(p[0]), m.Y(p[1]), 3.5, C.rust));
      const res = Math.sqrt(pts.reduce((s, p) => s + (p[1] - H * p[0]) ** 2, 0) / (pts.length - 1));
      const se = res / Math.sqrt(sxx);
      out([['fitted H₀', H.toFixed(1) + ' ± ' + se.toFixed(1) + ' km/s/Mpc'], ['Hubble time 1/H₀', (977.8 / H).toFixed(2) + ' Gyr'], ['redshift of the farthest galaxy', (H0.value * dmax.value / 299792).toFixed(3)], ['tip', 'nearby galaxies are dominated by peculiar motions']]);
    }
    gen();
  };

  /* =============== Expansion history (Astro 16) =============== */
  PB.sims.cosmo = function (api) {
    const cv = api.canvas(0.52);
    const Om = api.slider({ id: 'm', label: 'Matter density Ωₘ', min: 0, max: 3, step: 0.01, value: 0.31, onChange: () => draw() });
    const OL = api.slider({ id: 'l', label: 'Dark energy density Ω_Λ', min: -0.5, max: 1.5, step: 0.01, value: 0.69, onChange: () => draw() });
    const H0 = api.slider({ id: 'h', label: 'Hubble constant', min: 50, max: 90, step: 0.5, value: 67.7, unit: 'km/s/Mpc', onChange: () => draw() });
    api.buttons([{ label: 'Our universe (Planck)', onClick: () => { Om.value = 0.31; OL.value = 0.69; draw(); } }, { label: 'Einstein–de Sitter', onClick: () => { Om.value = 1; OL.value = 0; draw(); } }, { label: 'Closed, recollapsing', onClick: () => { Om.value = 2.5; OL.value = 0; draw(); } }]);
    const out = api.readout();
    cv.onResize = () => draw();
    function integrate(sign) {
      const H = H0.value / 977.8, om = Om.value, ol = OL.value; // per Gyr
      const acc = (a) => H * H * (-om / (2 * a * a) + ol * a);
      let a = 1, v = H, t = 0; const dt = 0.005 * sign, res = [[0, 1]];
      for (let k = 0; k < 20000; k++) {
        const k1a = v, k1v = acc(a), k2a = v + 0.5 * dt * k1v, k2v = acc(a + 0.5 * dt * k1a), k3a = v + 0.5 * dt * k2v, k3v = acc(a + 0.5 * dt * k2a), k4a = v + dt * k3v, k4v = acc(a + dt * k3a);
        a += dt / 6 * (k1a + 2 * k2a + 2 * k3a + k4a); v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v); t += dt;
        if (a <= 0.002 || a > 6 || Math.abs(t) > 60) break;
        if (k % 4 === 0) res.push([t, a]);
      }
      return { res: res, t: t, a: a };
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const H = H0.value / 977.8, Ok = 1 - Om.value - OL.value;
      const E2 = (a) => Om.value / (a * a * a) + Ok / (a * a) + OL.value;
      let bang = true; for (let a = 0.002; a < 1; a += 0.002) if (E2(a) <= 0) { bang = false; break; }
      const back = integrate(-1), fwd = integrate(1);
      const age = bang ? -back.t : NaN;
      const b = { x: 50, y: 16, w: cv.w - 66, h: cv.h - 46 };
      const tmin = bang ? Math.max(-30, back.t) : -30;
      const m = U.frame(ctx, C, b, [-30, 40], [0, 4], { xlabel: 'time from now (Gyr)', ylabel: 'scale factor a', ny: 4 });
      U.clip(ctx, b);
      const pts = back.res.slice().reverse().concat(fwd.res.slice(1));
      U.curve(ctx, pts.map((p) => [m.X(p[0]), m.Y(p[1])]), C.accent, 2.5);
      const lin = [[m.X(-1 / H), m.Y(0)], [m.X(40), m.Y(1 + 40 * H)]];
      U.curve(ctx, lin, U.alpha(C.ink3, 0.6), 1.2, [4, 4]);
      ctx.restore();
      U.dot(ctx, m.X(0), m.Y(1), 5, C.points, C.ink); U.text(ctx, 'now', m.X(0) + 7, m.Y(1) + 14, C.ink2, U.ui(11, 700));
      U.text(ctx, 'dashed: constant expansion rate', b.x + b.w - 4, b.y + 12, C.ink2, U.ui(10.5), 'right');
      const fate = fwd.a <= 0.01 ? 'big crunch in ' + fwd.t.toFixed(0) + ' Gyr' : (OL.value > 0 && fwd.a > 1.5) ? 'accelerating expansion forever' : 'expands forever, slowing';
      out([['age of the universe', bang ? age.toFixed(2) + ' Gyr' : 'no Big Bang (bounce)'], ['Hubble time 1/H₀', (1 / H).toFixed(2) + ' Gyr'], ['curvature Ω_k = 1 − Ωₘ − Ω_Λ', Ok.toFixed(2) + (Math.abs(Ok) < 0.005 ? ' (flat)' : Ok > 0 ? ' (open)' : ' (closed)')], ['deceleration q₀ = Ωₘ/2 − Ω_Λ', (Om.value / 2 - OL.value).toFixed(2) + ((Om.value / 2 - OL.value) < 0 ? ' (accelerating)' : '')], ['future', fate]]);
      void tmin;
    }
    draw();
  };
})();
