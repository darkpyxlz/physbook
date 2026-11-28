/* Maths chapters following a calculus-for-engineers course: plane analytic geometry (conics and polar
   coordinates), applications of the definite integral, vectors and three-dimensional geometry, and multiple
   integrals. Also an in-text figure for Trigonometry. Original text. */
(function () {
  const { R, f, S, QN, QM, P, M } = PB.tbKit();
  const PI = Math.PI;
  // Equal-aspect drawing frame for parametric pictures.
  const frame = (b, xr, yr) => { const s = Math.min(b.w / (xr[1] - xr[0]), b.h / (yr[1] - yr[0])) * 0.92, cx = b.x + b.w / 2, cy = b.y + b.h / 2, mx = (xr[0] + xr[1]) / 2, my = (yr[0] + yr[1]) / 2; return { X: (x) => cx + (x - mx) * s, Y: (y) => cy - (y - my) * s, s: s }; };
  const axes = (ctx, C, F, xr, yr) => { ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(F.X(xr[0]), F.Y(0)); ctx.lineTo(F.X(xr[1]), F.Y(0)); ctx.moveTo(F.X(0), F.Y(yr[0])); ctx.lineTo(F.X(0), F.Y(yr[1])); ctx.stroke(); };
  const path = (ctx, F, pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w || 2; ctx.beginPath(); let pen = false; pts.forEach((p) => { if (!p || !isFinite(p[0]) || !isFinite(p[1])) { pen = false; return; } if (!pen) { ctx.moveTo(F.X(p[0]), F.Y(p[1])); pen = true; } else ctx.lineTo(F.X(p[0]), F.Y(p[1])); }); ctx.stroke(); };
  const dot = (ctx, F, x, y, col, r) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(F.X(x), F.Y(y), r || 4, 0, 7); ctx.fill(); };
  const simpson = (g, a, b, n) => { n = n || 400; const hh = (b - a) / n; let s = g(a) + g(b); for (let i = 1; i < n; i++) s += g(a + i * hh) * (i % 2 ? 4 : 2); return s * hh / 3; };

  /* ================= Plane analytic geometry: conics and polar coordinates ================= */
  const conicPts = (e, p) => { const L = []; for (let i = 0; i <= 720; i++) { const t = -PI + i * 2 * PI / 720, d = 1 + e * Math.cos(t); if (d < 0.04) { L.push(null); continue; } const r = e * p / d; L.push([r * Math.cos(t), r * Math.sin(t)]); } return L; };
  const POLAR = { card: ['cardioid r = 1 + cos θ', (t) => 1 + Math.cos(t), 2 * PI, 1.5 * PI], rose2: ['four-petal rose r = cos 2θ', (t) => Math.cos(2 * t), 2 * PI, PI / 2], rose3: ['three-petal rose r = cos 3θ', (t) => Math.cos(3 * t), PI, PI / 4], circ: ['circle r = 2 cos θ', (t) => 2 * Math.cos(t), PI, PI], spiral: ['spiral r = θ/π', (t) => t / PI, 4 * PI, null] };
  PB.tbChapter({
    id: 'math-conics', subject: 'maths', title: 'Conic Sections and Polar Coordinates',
    subtitle: R`The curves you get by slicing a cone, and a second way of describing the plane. Circles and completing the square, parabolas, ellipses and hyperbolas with their foci and eccentricity, classifying quadratic curves, polar coordinates and polar curves, areas in polar form, and the polar equation of conics that describes every orbit.`,
    big: 'Slice a cone at different angles and you get a circle, an ellipse, a parabola or a hyperbola. Each is defined by distances to special points called foci, and all of them share one simple polar equation with a single number, the eccentricity, deciding which one you get. Planets, comets and satellite dishes all follow these curves.',
    goals: ['Find centres and radii of circles by completing the square', 'Use focus–directrix definitions of the parabola, and the foci of ellipses and hyperbolas', 'Find eccentricity, asymptotes and foci from standard equations', 'Classify general quadratic curves with the discriminant B² − 4AC', 'Convert between polar and Cartesian coordinates and sketch polar curves', 'Calculate areas in polar coordinates and use the polar equation of conics for orbits'],
    prereqs: ['math-trig'],
    sections: [
      { title: 'Circles and parabolas', plain: 'A circle is all points at a fixed distance from a centre, found by completing the square; a parabola is all points equally far from a fixed point (the focus) and a fixed line (the directrix), which gives it its focusing property.', html: R`
<p>A <strong>circle</strong> with centre $(a, b)$ and radius $r$ is $(x - a)^2 + (y - b)^2 = r^2$. Any equation $x^2 + y^2 + Dx + Ey + F = 0$ is a circle (or a point, or nothing), revealed by <strong>completing the square</strong>.</p>
<div class="worked"><p>Find the centre and radius of $x^2 + y^2 - 6x + 4y - 12 = 0$.</p>
<p>$(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4$, so $(x - 3)^2 + (y + 2)^2 = 25$: centre $(3, -2)$, radius 5.</p></div>
<p>A <strong>parabola</strong> is the set of points equidistant from a point (the <strong>focus</strong>) and a line (the <strong>directrix</strong>). With focus $(p, 0)$ and directrix $x = -p$, squaring the equal distances gives</p>
<div class="key"><p>$y^2 = 4px$</p></div>
<p>The chord through the focus perpendicular to the axis (the latus rectum) has length $4p$. The parabola's <strong>reflective property</strong>, that every ray parallel to the axis reflects through the focus, makes it the shape of satellite dishes, solar furnaces, car headlights and radio telescopes. The graph $y = ax^2$ is a parabola with focus at height $1/4a$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Where is the focus of $y^2 = 12x$? Give its x-coordinate.`, 3, [R`Compare with $y^2 = 4px$.`], R`$4p = 12$, so the focus is at $(3, 0)$.`)] },
      { title: 'Ellipses and hyperbolas', plain: 'An ellipse is the set of points whose distances to two foci add to a constant, a hyperbola where they differ by a constant; their shapes are measured by eccentricity, and the sign pattern of a quadratic equation tells you which curve you have.', html: R`
<p>An <strong>ellipse</strong> is the set of points whose distances to two foci add to a constant $2a$. Centred at the origin with its long axis along $x$:</p>
<div class="key"><p>$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1,\qquad c^2 = a^2 - b^2,\qquad e = \dfrac{c}{a} &lt; 1$</p></div>
<p>The foci are at $(\pm c, 0)$ and the <strong>eccentricity</strong> $e$ measures how stretched it is: 0 for a circle, near 1 for a long thin ellipse. A <strong>hyperbola</strong> is the set of points whose distances to two foci <em>differ</em> by $2a$:</p>
<div class="key"><p>$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1,\qquad c^2 = a^2 + b^2,\qquad e = \dfrac{c}{a} > 1,\qquad \text{asymptotes } y = \pm\dfrac bax$</p></div>
<div class="worked"><p>Find $a$, $b$, the foci and the eccentricity of $9x^2 + 25y^2 = 225$.</p>
<p>Divide by 225: $x^2/25 + y^2/9 = 1$, so $a = 5$, $b = 3$, $c = \sqrt{25 - 9} = 4$, foci $(\pm4, 0)$, $e = 0.8$. Earth's orbit has $e = 0.017$: very nearly a circle.</p></div>
<h3 class="sub">Classifying quadratic curves</h3>
<p>Every curve $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ is a conic (or a degenerate case). Its type follows from the <strong>discriminant</strong> $B^2 - 4AC$: negative for an ellipse (or circle), zero for a parabola, positive for a hyperbola. An $xy$ term means the axes are rotated; rotating the coordinates by $\theta$ with $\cot2\theta = (A - C)/B$ removes it.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For the hyperbola $x^2/16 - y^2/9 = 1$, how far is each focus from the centre?`, 5, [R`$c^2 = a^2 + b^2$.`], R`$\sqrt{16 + 9} = 5$.`)] },
      { title: 'Polar coordinates', plain: 'Polar coordinates describe a point by its distance from the origin and its angle, which makes circles, spirals, roses and cardioids easy to write, and areas are found by adding thin wedges.', html: R`
<p>A point can be located by its distance $r$ from the origin and the angle θ from the positive x-axis: <strong>polar coordinates</strong> $(r, \theta)$, linked to Cartesian ones by</p>
<div class="key"><p>$x = r\cos\theta,\quad y = r\sin\theta,\qquad r^2 = x^2 + y^2,\quad \tan\theta = y/x$</p></div>
<p>(Choose the quadrant of θ by the signs of $x$ and $y$; and the same point has many polar descriptions.) Curves with rotational character are simple in polar form: $r = 2a\cos\theta$ is a circle through the origin; $r = a(1 + \cos\theta)$ a <strong>cardioid</strong>; $r = \cos n\theta$ a <strong>rose</strong> ($n$ petals if $n$ is odd, $2n$ if even); $r = a\theta$ an Archimedean spiral.</p>
<div data-fig="0"></div>
<p>To find areas, add up thin wedges of angle $d\theta$ and area $\tfrac12r^2\,d\theta$:</p>
<div class="key"><p>$A = \tfrac12\displaystyle\int_\alpha^\beta r^2\,d\theta$</p></div>
<div class="worked"><p>Find the area inside the cardioid $r = 1 + \cos\theta$.</p>
<p>$A = \tfrac12\int_0^{2\pi}(1 + 2\cos\theta + \cos^2\theta)\,d\theta = \tfrac12(2\pi + 0 + \pi) = \dfrac{3\pi}{2} \approx 4.71$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Convert the polar point $(r, \theta) = (4, \pi/3)$ to Cartesian. What is $y$?`, 4 * Math.sin(PI / 3), [R`$y = r\sin\theta$.`], R`$4\cdot\tfrac{\sqrt3}2 = 3.46$.`)] },
      { title: 'Conics in polar form: orbits', plain: 'With a focus at the origin, every conic has the polar equation r = ep / (1 + e cos θ); its eccentricity decides whether it is an ellipse, parabola or hyperbola, which is exactly how planets, comets and spacecraft move.', html: R`
<p>Every conic can be defined as the set of points whose distance from a focus is $e$ times their distance from a directrix. Put the focus at the origin and the directrix at $x = p$, and every conic has the same polar equation:</p>
<div class="key"><p>$r = \dfrac{ep}{1 + e\cos\theta}$</p></div>
<p>$e &lt; 1$ gives an ellipse, $e = 1$ a parabola, $e > 1$ a hyperbola. Newton proved that a body moving under an inverse-square force follows exactly such a curve with the attracting body at a focus: bound orbits are ellipses (Kepler's first law), escaping ones hyperbolas.</p>
<p>For an ellipse the closest and farthest points (perihelion and aphelion) are at $\theta = 0$ and π:</p>
<div class="key"><p>$r_{\min} = \dfrac{ep}{1 + e},\qquad r_{\max} = \dfrac{ep}{1 - e},\qquad e = \dfrac{r_{\max} - r_{\min}}{r_{\max} + r_{\min}}$</p></div>
<div class="worked"><p>Halley's comet has $e = 0.967$ and perihelion 0.586 AU. How far out does it go?</p>
<p>$ep = r_{\min}(1 + e) = 0.586\cdot1.967 = 1.153$ AU, so $r_{\max} = 1.153/0.033 = 35$ AU, beyond Neptune.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`An orbit has closest distance 1 and farthest distance 3 (any units). Eccentricity?`, 0.5, [R`$e = (r_{\max} - r_{\min})/(r_{\max} + r_{\min})$.`], R`$2/4 = 0.5$.`)] }
    ],
    figures: [{ s: 2, title: 'Polar curves', caption: 'Some classic curves drawn in polar coordinates, with the area each encloses.', params: { aspect: 0.5, minH: 240, controls: [{ id: 'c', type: 'select', label: 'Curve', value: 'card', options: Object.keys(POLAR).map((k) => [k, POLAR[k][0]]) }, S('t', 'Draw up to θ (× π)', 0.05, 4, 0.05, 2)],
      draw: (ctx, C, v, b) => { const pc = POLAR[v.c], xr = [-2.4, 2.4], yr = [-2.4, 2.4], F = frame(b, xr, yr); axes(ctx, C, F, xr, yr); const T = Math.min(v.t * PI, pc[2]), L = []; for (let i = 0; i <= 600; i++) { const t = i * T / 600, r = pc[1](t); L.push([r * Math.cos(t), r * Math.sin(t)]); } path(ctx, F, L, C.accent, 2.2); const r = pc[1](T); dot(ctx, F, r * Math.cos(T), r * Math.sin(T), C.points, 5); },
      readout: (v) => { const pc = POLAR[v.c]; return [['curve', pc[0]], ['enclosed area', pc[3] ? f(pc[3], 4) + ' (= ' + (v.c === 'card' ? '3π/2' : v.c === 'rose2' ? 'π/2' : v.c === 'rose3' ? 'π/4' : 'π') + ')' : 'not closed']]; } } }],
    labs: [{ sim: 'explore', title: 'The conic explorer', desc: 'The curve r = ep/(1 + e cos θ) with its focus at the origin (the dot). Change the eccentricity to move from circle to ellipse, parabola and hyperbola.',
      tasks: ['Which value of e gives a parabola? What happens to the far end of the ellipse as e approaches it?', 'Find the e of an orbit whose farthest point is 3 times its nearest point.', 'Why do comets on hyperbolic paths never return?'],
      params: { aspect: 0.5, minH: 260, controls: [S('e', 'Eccentricity e', 0.05, 2, 0.01, 0.6), S('p', 'Focus–directrix distance p', 0.3, 3, 0.05, 1.5)],
        draw: (ctx, C, v, b) => { const xr = [-6, 3], yr = [-4.5, 4.5], F = frame(b, xr, yr); axes(ctx, C, F, xr, yr); ctx.strokeStyle = C.ink3; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(F.X(v.p), F.Y(yr[0])); ctx.lineTo(F.X(v.p), F.Y(yr[1])); ctx.stroke(); ctx.setLineDash([]); path(ctx, F, conicPts(v.e, v.p), C.accent, 2.4); dot(ctx, F, 0, 0, C.points, 5); },
        readout: (v) => { const kind = v.e < 1 ? (v.e < 0.1 ? 'ellipse (nearly a circle)' : 'ellipse') : Math.abs(v.e - 1) < 0.005 ? 'parabola' : 'hyperbola'; return [['type', kind], ['nearest point', f(v.e * v.p / (1 + v.e), 3)], ['farthest point', v.e < 1 ? f(v.e * v.p / (1 - v.e), 3) : 'infinite']]; } } }],
    formulas: [['Circle', '(x - a)^2 + (y - b)^2 = r^2'], ['Parabola', 'y^2 = 4px'], ['Ellipse', '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1,\\ c^2 = a^2 - b^2'], ['Hyperbola', '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1,\\ c^2 = a^2 + b^2'], ['Discriminant', 'B^2 - 4AC'], ['Polar area', 'A = \\tfrac12\\int r^2\\,d\\theta'], ['Polar conic', 'r = \\dfrac{ep}{1 + e\\cos\\theta}']],
    problems: [
      M('concept', 'Eccentricity of a circle', R`A circle has eccentricity…`, ['0', '1', 'between 0 and 1 but not 0', 'greater than 1'], 0, [R`The foci coincide.`], R`$c = 0$, so $e = 0$.`),
      M('concept', 'Classify', R`The curve $x^2 + 4xy + y^2 = 1$ is…`, ['a hyperbola', 'an ellipse', 'a parabola', 'a circle'], 0, [R`$B^2 - 4AC = 16 - 4$.`], R`$12 > 0$: hyperbola.`),
      M('concept', 'Reflective property', R`Light from a lamp at the focus of a parabolic mirror reflects…`, ['into a beam parallel to the axis', 'back to the focus', 'in all directions', 'to the directrix'], 0, [R`Run the dish backwards.`], R`That is how headlights make a beam.`),
      M('concept', 'Polar form', R`The polar equation $r = 4\sin\theta$ describes…`, ['a circle of radius 2 through the origin', 'a line', 'a parabola', 'a spiral'], 0, [R`Multiply by r: $x^2 + y^2 = 4y$.`], R`$x^2 + (y - 2)^2 = 4$.`),
      P('core', 'num', 'Completing the square', R`Radius of the circle $x^2 + y^2 - 6x + 4y - 12 = 0$?`, 5, [R`Complete the square in x and y.`], R`$(x - 3)^2 + (y + 2)^2 = 25$: radius 5.`),
      P('core', 'num', 'Ellipse eccentricity', R`Eccentricity of $9x^2 + 25y^2 = 225$?`, 0.8, [R`$a = 5$, $b = 3$.`], R`$c = 4$, $e = 0.8$.`),
      P('core', 'num', 'Hyperbola foci', R`For $x^2/16 - y^2/9 = 1$, what is $c$?`, 5, [R`$c^2 = a^2 + b^2$.`], R`5.`),
      P('core', 'num', 'Cardioid area', R`Area inside $r = 1 + \cos\theta$?`, 1.5 * PI, [R`$\tfrac12\int_0^{2\pi}(1 + \cos\theta)^2d\theta$.`], R`$3\pi/2 = 4.71$.`),
      P('core', 'num', 'Polar to Cartesian', R`$(r, \theta) = (4, \pi/3)$: find $x$.`, 2, [R`$x = r\cos\theta$.`], R`2.`),
      P('core', 'num', 'Halley’s comet', R`$e = 0.967$, perihelion 0.586 AU. Aphelion (AU)?`, 0.586 * 1.967 / 0.033, [R`$ep = r_{\min}(1 + e)$; $r_{\max} = ep/(1 - e)$.`], R`About 35 AU.`),
      P('olympiad', 'num', 'One petal', R`Area of one petal of the rose $r = \cos2\theta$?`, PI / 8, [R`One petal: $-\pi/4 \le \theta \le \pi/4$.`], R`$\tfrac12\int_{-\pi/4}^{\pi/4}\cos^22\theta\,d\theta = \pi/8 = 0.393$.`),
      P('olympiad', 'num', 'Focal chord', R`Length of the latus rectum of $y^2 = 12x$?`, 12, [R`$4p$.`], R`12.`),
      P('olympiad', 'num', 'Distance between foci', R`Distance between the foci of $9x^2 + 25y^2 = 225$?`, 8, [R`$2c$.`], R`8.`),
      P('olympiad', 'num', 'Ellipse area', R`The area of an ellipse is $\pi ab$. Find the area of $4x^2 + 9y^2 = 36$.`, 6 * PI, [R`$a = 3$, $b = 2$.`], R`$6\pi = 18.85$.`)
    ],
    drills: [
      { title: 'Ellipse eccentricity', gen: (r) => { const a = r.int(3, 10), b = r.int(1, a - 1); return { q: R`<p>Eccentricity of $x^2/${a * a} + y^2/${b * b} = 1$?</p>`, answer: Math.sqrt(a * a - b * b) / a, tol: 0.01, solution: R`<p>$c = \sqrt{${a * a} - ${b * b}}$, $e = ${f(Math.sqrt(a * a - b * b) / a, 4)}$.</p>` }; } },
      { title: 'Polar conversion', gen: (r) => { const rr = r.int(1, 6), d = r.pick([30, 45, 60, 120, 150, 210, 300]); return { q: R`<p>$(r, \theta) = (${rr}, ${d}^\circ)$. Find $x$.</p>`, answer: rr * Math.cos(d * PI / 180), tol: 0.01, atol: 0.01, solution: R`<p>$${rr}\cos${d}^\circ = ${f(rr * Math.cos(d * PI / 180), 4)}$.</p>` }; } }
    ],
    predict: { q: 'The conic r = ep/(1 + e cos θ) with e = 1 is…', o: ['a parabola', 'a circle', 'a hyperbola'], a: 0, how: 'set e = 1 in the conic explorer.', why: 'Eccentricity 1 means every point is equally far from the focus and the directrix: the definition of a parabola.' },
    wild: ['Satellite dishes and orbits', 'Parabolic dishes focus radio waves onto a receiver, and spacecraft trajectories are planned as ellipses and hyperbolas: the same conic equations, three centuries after Kepler and Newton.']
  });

  /* ================= Applications of the definite integral ================= */
  const FN = { sqrt: ['√x', (x) => Math.sqrt(Math.max(x, 0)), [0, 4]], sq: ['x²', (x) => x * x, [0, 2]], sin: ['sin x', (x) => Math.sin(x), [0, PI]], inv: ['1/x', (x) => 1 / x, [1, 5]], exp: ['e^(−x)', (x) => Math.exp(-x), [0, 3]] };
  const deriv = (g, x) => (g(x + 1e-5) - g(x - 1e-5)) / 2e-5;
  PB.tbChapter({
    id: 'math-intapps', subject: 'maths', title: 'Applications of Integration',
    subtitle: R`What integrals are for. Areas between curves, volumes of solids by discs, washers, shells and slices, arc length and surface area, and the engineering uses: work done by variable forces and in pumping liquids, hydrostatic force on dams, centres of mass and Pappus's theorem.`,
    big: 'An integral adds up infinitely many thin pieces. Choose the right piece (a strip, a disc, a shell, a short length of curve, a thin layer of water) and the same idea gives areas, volumes, lengths, the work to empty a tank, the force on a dam and where a shape balances.',
    goals: ['Find areas between curves, integrating in x or in y', 'Find volumes of revolution by discs, washers and shells, and volumes by known cross-sections', 'Calculate arc length and surface area of revolution', 'Calculate work done by variable forces, including pumping liquids', 'Calculate hydrostatic forces on submerged surfaces', 'Find centroids and use Pappus’s theorem'],
    prereqs: ['math-techniques'],
    sections: [
      { title: 'Areas between curves', plain: 'The area between two curves is the integral of the top curve minus the bottom one between the points where they cross; sometimes slicing horizontally and integrating in y is easier.', html: R`
<p>If $f(x) \ge g(x)$ on $[a, b]$, the area between them is the sum of thin vertical strips of height $f - g$:</p>
<div class="key"><p>$A = \displaystyle\int_a^b\big[f(x) - g(x)\big]\,dx$</p></div>
<p>Find the limits by solving $f(x) = g(x)$. If the curves cross inside the interval, split it so you always subtract bottom from top. When the region is easier to describe sideways, use horizontal strips: $A = \int[x_{\text{right}}(y) - x_{\text{left}}(y)]\,dy$.</p>
<div class="worked"><p>Find the area enclosed by $y = x^2$ and $y = x + 2$.</p>
<p>They meet where $x^2 = x + 2$: $x = -1$ and $x = 2$. Area $= \int_{-1}^2(x + 2 - x^2)\,dx = \left[\tfrac{x^2}2 + 2x - \tfrac{x^3}3\right]_{-1}^2 = \tfrac{10}3 + \tfrac76 = 4.5$.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Area between $y = x$ and $y = x^2$ for $0 \le x \le 1$?`, 1 / 6, [R`$\int_0^1(x - x^2)dx$.`], R`$\tfrac12 - \tfrac13 = \tfrac16$.`)] },
      { title: 'Volumes', plain: 'Spinning a region about an axis makes a solid whose volume is a sum of thin discs, washers or cylindrical shells; any solid with known cross-sections can be sliced the same way.', html: R`
<p>Rotate the region under $y = f(x)$ about the x-axis. Each thin slice is a <strong>disc</strong> of radius $f(x)$:</p>
<div class="key"><p>$V = \pi\displaystyle\int_a^b f(x)^2\,dx$ (discs); $\quad V = \pi\int_a^b(R^2 - r^2)\,dx$ (washers, with a hole)</p></div>
<p>Rotating about the y-axis, it is often easier to use <strong>cylindrical shells</strong>: a strip at distance $x$ sweeps out a thin tube of area $2\pi x f(x)$:</p>
<div class="key"><p>$V = 2\pi\displaystyle\int_a^b x\,f(x)\,dx$</p></div>
<div class="worked"><p>Rotate the region under $y = \sqrt x$, $0 \le x \le 4$, about the x-axis. Then derive the volume of a sphere.</p>
<p>$V = \pi\int_0^4x\,dx = 8\pi \approx 25.1$. Sphere: rotate $y = \sqrt{r^2 - x^2}$: $V = \pi\int_{-r}^r(r^2 - x^2)\,dx = \pi\left(2r^3 - \tfrac23r^3\right) = \tfrac43\pi r^3$.</p></div>
<p>More generally, if every cross-section perpendicular to an axis has known area $A(x)$, then $V = \int A(x)\,dx$ (Cavalieri's principle): this is how a pyramid's volume, $\tfrac13 \times$ base $\times$ height, follows from its square cross-sections growing as $x^2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Volume when the region under $y = x$ for $0 \le x \le 3$ is rotated about the x-axis (a cone)?`, 9 * PI, [R`$\pi\int_0^3x^2dx$.`], R`$9\pi = 28.3$, matching $\tfrac13\pi r^2h$ with $r = h = 3$.`)] },
      { title: 'Arc length and surface area', plain: 'The length of a curve adds up tiny hypotenuses √(1 + y′²) dx, and spinning a curve sweeps out a surface whose area adds up thin bands; a famous horn has finite volume but infinite surface.', html: R`
<p>A short piece of curve has length $\sqrt{dx^2 + dy^2} = \sqrt{1 + (y')^2}\,dx$, so</p>
<div class="key"><p>$L = \displaystyle\int_a^b\sqrt{1 + f'(x)^2}\,dx,\qquad S = 2\pi\int_a^b f(x)\sqrt{1 + f'(x)^2}\,dx$</p></div>
<p>where $S$ is the area of the surface made by rotating the curve about the x-axis (adding thin bands of circumference $2\pi f$). For parametric curves, $L = \int\sqrt{\dot x^2 + \dot y^2}\,dt$. Few functions give arc-length integrals with simple answers, so they are often done numerically.</p>
<div class="worked"><p>Find the length of $y = \tfrac23x^{3/2}$ from $x = 0$ to 3.</p>
<p>$y' = \sqrt x$, so $L = \int_0^3\sqrt{1 + x}\,dx = \tfrac23\left[(1 + x)^{3/2}\right]_0^3 = \tfrac23(8 - 1) = \tfrac{14}3 \approx 4.67$.</p></div>
<p>A paradox: rotating $y = 1/x$ for $x \ge 1$ gives <strong>Gabriel's horn</strong>, whose volume $\pi\int_1^\infty x^{-2}dx = \pi$ is finite but whose surface area $\ge 2\pi\int_1^\infty x^{-1}dx$ is infinite: you could fill it with paint but never paint its inside surface.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Use the surface-area formula for a sphere: rotate $y = \sqrt{1 - x^2}$, $-1 \le x \le 1$. Area?`, 4 * PI, [R`$f\sqrt{1 + f'^2} = 1$ here.`], R`$2\pi\int_{-1}^1 1\,dx = 4\pi$.`)] },
      { title: 'Work, pressure and centres of mass', plain: 'Integrals add up varying forces and distances: the work to stretch a spring or pump water out of a tank, the force of water on a dam, and the balance point of a shape, which also gives volumes through Pappus’s theorem.', html: R`
<p><strong>Work</strong> by a variable force is $W = \int F(x)\,dx$; for a spring, $\int kx\,dx = \tfrac12kx^2$. To <strong>pump</strong> a liquid out of a tank, slice it into thin layers: each has weight $\rho gA(y)\,dy$ and must be lifted its own distance to the top.</p>
<div class="worked"><p>A cylindrical tank of radius 1 m and height 2 m is full of water. How much work pumps all the water out over the top?</p>
<p>A layer at height $y$ is lifted $2 - y$: $W = \int_0^2\rho g\pi(1)^2(2 - y)\,dy = 1000\cdot9.8\cdot\pi\cdot2 = 61.6$ kJ, the same as lifting all the water by the distance its centre of mass rises (1 m).</p></div>
<p><strong>Hydrostatic force</strong>: pressure $\rho gh$ grows with depth, so the force on a vertical wall is $\int\rho gh\,w(h)\,dh$; on a rectangular dam of width $w$ and water depth $H$ it is $\tfrac12\rho gwH^2$.</p>
<p>The <strong>centroid</strong> (centre of mass of a uniform region) under $y = f(x)$ is at $\bar x = \dfrac{\int xf\,dx}{\int f\,dx}$, $\bar y = \dfrac{\int\tfrac12f^2\,dx}{\int f\,dx}$. For a semicircular disc of radius $r$ it lies $4r/3\pi$ from the straight edge. <strong>Pappus's theorem</strong>: rotating a region of area $A$ about an external axis gives volume $V = 2\pi\bar dA$, where $\bar d$ is the distance from the centroid to the axis (so $2\pi\bar d$ is how far the centroid travels). A torus (a circle of radius $r$ at distance $R$) has $V = 2\pi R\cdot\pi r^2 = 2\pi^2Rr^2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Force (MN) of water on a vertical dam 20 m wide holding water 10 m deep ($\rho g = 9800$ N/m³)?`, 0.5 * 9800 * 20 * 100 / 1e6, [R`$\tfrac12\rho gwH^2$.`], R`$9.8$ MN.`)] }
    ],
    figures: [{ s: 0, title: 'Area between curves', caption: 'The region between y = x² and the line y = x + c. Its boundaries move as you change c.', params: { aspect: 0.42, minH: 220, controls: [S('c', 'Line offset c', 0.1, 4, 0.05, 2)],
      plots: [{ x: [-2.5, 3], y: [-0.5, 8], xlabel: 'x', ylabel: 'y', zero: true, curves: (v) => [{ f: (x) => x * x, label: 'y = x²' }, { f: (x) => x + v.c, color: 'rust', label: 'y = x + c' }], vlines: (v) => { const d = Math.sqrt(1 + 4 * v.c); return [{ x: (1 - d) / 2 }, { x: (1 + d) / 2 }]; } }],
      readout: (v) => { const d = Math.sqrt(1 + 4 * v.c); return [['crossing points', f((1 - d) / 2, 3) + ', ' + f((1 + d) / 2, 3)], ['enclosed area', f(Math.pow(d, 3) / 6, 4)]]; } } }],
    labs: [{ sim: 'explore', title: 'Area, volume and length', desc: 'For a curve you choose, the area under it, the volume of the solid made by spinning that area about the x-axis (discs), and the length of the curve, all computed numerically.',
      tasks: ['For √x on [0, 4], check the volume 8π.', 'For sin x on [0, π], compare the arc length with the straight distance π.', 'For 1/x, push b far to the right. Which grows without limit: the area or the volume?'],
      params: { aspect: 0.42, controls: [{ id: 'g', type: 'select', label: 'Curve', value: 'sqrt', options: Object.keys(FN).map((k) => [k, 'y = ' + FN[k][0]]) }, S('a', 'From a', 0, 5, 0.05, 0), S('b', 'To b', 0.1, 50, 0.05, 4)],
        plots: [{ x: [0, 6], y: [-0.2, 4.2], xlabel: 'x', ylabel: 'y', zero: true, curves: (v) => [{ f: (x) => FN[v.g][0] === '1/x' && x < 0.05 ? NaN : FN[v.g][1](x) }], vlines: (v) => [{ x: v.a }, { x: Math.min(v.b, 6) }] }],
        readout: (v) => { const g = FN[v.g][1], a = v.g === 'inv' ? Math.max(v.a, 0.05) : v.a, b = Math.max(v.b, a + 1e-3); return [['area', f(simpson(g, a, b))], ['volume (discs)', f(PI * simpson((x) => g(x) * g(x), a, b)) + ' = ' + f(simpson((x) => g(x) * g(x), a, b)) + 'π'], ['arc length', f(simpson((x) => Math.sqrt(1 + Math.pow(deriv(g, Math.max(x, 1e-4)), 2)), Math.max(a, 1e-4), b, 2000))]]; } } }],
    formulas: [['Area between curves', 'A = \\int_a^b (f - g)\\,dx'], ['Discs', 'V = \\pi\\int f^2\\,dx'], ['Shells', 'V = 2\\pi\\int x f\\,dx'], ['Arc length', 'L = \\int\\sqrt{1 + f′^2}\\,dx'], ['Surface of revolution', 'S = 2\\pi\\int f\\sqrt{1 + f′^2}\\,dx'], ['Work', 'W = \\int F\\,dx'], ['Pappus', 'V = 2\\pi\\bar d A']],
    problems: [
      M('concept', 'Shells or discs', R`To rotate the region under $y = e^{-x^2}$ ($0 \le x \le 1$) about the y-axis, the easier method is…`, ['cylindrical shells', 'discs in y', 'washers in y', 'arc length'], 0, [R`Solving for x in terms of y is awkward.`], R`Shells: $2\pi\int_0^1xe^{-x^2}dx = \pi(1 - e^{-1})$.`),
      M('concept', 'Arc length', R`The arc length of $y = f(x)$ from $a$ to $b$ is…`, ['$\\int_a^b\\sqrt{1 + f′(x)^2}\\,dx$', '$\\int_a^b f(x)\\,dx$', '$\\int_a^b\\sqrt{1 + f(x)^2}\\,dx$', '$\\pi\\int_a^b f^2dx$'], 0, [R`Pythagoras on a tiny piece.`], R`$ds = \sqrt{dx^2 + dy^2}$.`),
      M('concept', 'Units of work', R`If force is in newtons and distance in metres, $\int F\,dx$ is in…`, ['joules', 'watts', 'newtons', 'pascals'], 0, [R`N × m.`], R`Joules.`),
      M('concept', 'Centroid by symmetry', R`The centroid of a region symmetric about the y-axis lies…`, ['on the y-axis', 'on the x-axis', 'at the origin always', 'outside the region'], 0, [R`Balance.`], R`$\bar x = 0$ by symmetry.`),
      P('core', 'num', 'Area between curves', R`Area enclosed by $y = x^2$ and $y = x + 2$?`, 4.5, [R`Limits −1 and 2.`], R`4.5.`),
      P('core', 'num', 'Volume of revolution', R`Volume when the region under $y = \sqrt x$, $0 \le x \le 4$, is rotated about the x-axis?`, 8 * PI, [R`$\pi\int_0^4x\,dx$.`], R`$8\pi = 25.1$.`),
      P('core', 'num', 'Sphere', R`Volume of a sphere of radius 3 from the disc method?`, 36 * PI, [R`$\tfrac43\pi r^3$.`], R`$36\pi = 113.1$.`),
      P('core', 'num', 'Arc length', R`Length of $y = \tfrac23x^{3/2}$ from 0 to 3?`, 14 / 3, [R`$\int_0^3\sqrt{1 + x}\,dx$.`], R`$14/3 = 4.67$.`),
      P('core', 'num', 'Emptying a tank', R`Work (kJ) to pump water over the top of a full cylindrical tank of radius 1 m and height 2 m ($\rho g = 9800$ N/m³)?`, 9800 * PI * 2 / 1000, [R`$\int_0^2\rho g\pi(2 - y)\,dy$.`], R`$61.6$ kJ.`),
      P('core', 'num', 'Centroid of a semicircle', R`Distance of the centroid of a semicircular disc of radius 3 from its straight edge?`, 4 * 3 / (3 * PI), [R`$4r/3\pi$.`], R`$1.27$.`),
      P('olympiad', 'num', 'Torus', R`Volume of a torus made by rotating a circle of radius 1 whose centre is 3 from the axis (Pappus)?`, 2 * PI * PI * 3, [R`$2\pi R\cdot\pi r^2$.`], R`$6\pi^2 = 59.2$.`),
      P('olympiad', 'num', 'Gabriel’s horn', R`Volume of the solid made by rotating $y = 1/x$, $x \ge 1$, about the x-axis?`, PI, [R`$\pi\int_1^\infty x^{-2}dx$.`], R`$\pi$, although the surface area is infinite.`),
      P('olympiad', 'num', 'Shell method', R`Volume when the region under $y = e^{-x^2}$, $0 \le x \le 1$, is rotated about the y-axis?`, PI * (1 - Math.exp(-1)), [R`$2\pi\int_0^1xe^{-x^2}dx$.`], R`$\pi(1 - e^{-1}) = 1.99$.`),
      P('olympiad', 'num', 'Spring work', R`A spring with $k = 400$ N/m is stretched from 0.10 m to 0.30 m beyond its natural length. Work (J)?`, 200 * (0.09 - 0.01), [R`$\int_{0.1}^{0.3}400x\,dx$.`], R`$200(0.09 - 0.01) = 16$ J.`)
    ],
    drills: [
      { title: 'Disc volumes', gen: (r) => { const n = r.pick([1, 2, 3]), b = r.pick([1, 2, 3]); return { q: R`<p>Rotate the region under $y = x^{${n}}$, $0 \le x \le ${b}$, about the x-axis. Volume?</p>`, answer: PI * Math.pow(b, 2 * n + 1) / (2 * n + 1), tol: 0.01, solution: R`<p>$\pi\int_0^{${b}}x^{${2 * n}}dx = \pi\cdot${b}^{${2 * n + 1}}/${2 * n + 1} = ${f(PI * Math.pow(b, 2 * n + 1) / (2 * n + 1), 4)}$.</p>` }; } },
      { title: 'Area between curves', gen: (r) => { const c = r.pick([2, 6, 12]); const d = Math.sqrt(1 + 4 * c); return { q: R`<p>Area enclosed by $y = x^2$ and $y = x + ${c}$?</p>`, answer: Math.pow(d, 3) / 6, tol: 0.01, solution: R`<p>The roots differ by $\sqrt{1 + 4\cdot${c}} = ${f(d, 4)}$; area $= d^3/6 = ${f(Math.pow(d, 3) / 6, 4)}$.</p>` }; } }
    ],
    predict: { q: 'Rotating the region under y = √x (0 ≤ x ≤ 4) about the x-axis gives a volume of…', o: ['8π', '4π', '16π'], a: 0, how: 'choose √x on [0, 4] in the area, volume and length lab.', why: 'Discs of radius √x have area πx, and the integral of πx from 0 to 4 is 8π.' },
    wild: ['Engineering design', 'Integrals give the volume of fuel in a curved tank, the force of water on a dam and the bending of a beam: they are everyday tools in engineering software.']
  });

  /* ================= Vectors and geometry in space ================= */
  PB.tbChapter({
    id: 'math-space', subject: 'maths', title: 'Vectors and Geometry in Space',
    subtitle: R`Three-dimensional analytic geometry. Coordinates, spheres and vectors in space, lines (vector, parametric and symmetric forms; skew lines), planes and their normals, distances from points to lines and planes, intersections and angles, quadric surfaces, and cylindrical and spherical coordinates.`,
    big: 'Vectors make three-dimensional geometry algebraic. A line is a point plus multiples of a direction; a plane is everything perpendicular to a normal vector. Dot and cross products then give angles, distances, areas and volumes, and two other coordinate systems, cylindrical and spherical, make round shapes easy.',
    goals: ['Work with coordinates, distances and spheres in three dimensions', 'Write equations of lines in vector, parametric and symmetric form; identify skew lines', 'Find the equation of a plane from a point and normal, or from three points', 'Calculate distances from a point to a line or plane, and between skew lines', 'Find intersections and angles of lines and planes', 'Recognise quadric surfaces and convert to cylindrical and spherical coordinates'],
    prereqs: ['math-linear'],
    sections: [
      { title: 'Coordinates and vectors in space', plain: 'Points in space have three coordinates, distances follow from Pythagoras twice, and vectors with dot, cross and triple products give angles, perpendicular directions, areas and volumes.', html: R`
<p>In 3D, the distance between $(x_1, y_1, z_1)$ and $(x_2, y_2, z_2)$ is $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$, and the sphere of radius $r$ about $(a, b, c)$ is $(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$.</p>
<p>Vectors are handled component by component. Three products do most of the work:</p>
<ul><li><strong>dot product</strong> $\mathbf u\cdot\mathbf v = |\mathbf u||\mathbf v|\cos\theta$: angles, perpendicularity ($\mathbf u\cdot\mathbf v = 0$), and the projection of $\mathbf u$ onto $\mathbf v$, $\dfrac{\mathbf u\cdot\mathbf v}{|\mathbf v|^2}\mathbf v$;</li>
<li><strong>cross product</strong> $\mathbf u\times\mathbf v$: a vector perpendicular to both, of length $|\mathbf u||\mathbf v|\sin\theta$ (the area of the parallelogram they span);</li>
<li><strong>triple product</strong> $\mathbf u\cdot(\mathbf v\times\mathbf w)$: the volume of the parallelepiped they span (zero if they lie in one plane).</li></ul>
<div class="worked"><p>Find the distance between $(1, 2, 3)$ and $(4, 6, 15)$, and the volume of the box spanned by $(1, 0, 0)$, $(1, 1, 0)$ and $(1, 1, 1)$.</p>
<p>$\sqrt{9 + 16 + 144} = 13$. Volume: $\mathbf v\times\mathbf w = (1, 1, 0)\times(1, 1, 1) = (1, -1, 0)$, and $(1, 0, 0)\cdot(1, -1, 0) = 1$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Radius of the sphere $x^2 + y^2 + z^2 - 2x + 4z = 4$?`, 3, [R`Complete the squares.`], R`$(x - 1)^2 + y^2 + (z + 2)^2 = 9$: radius 3.`)] },
      { title: 'Lines in space', plain: 'A line in space is a starting point plus any multiple of a direction vector; two lines can meet, be parallel, or miss each other without being parallel (skew), and cross products give the distance from a point to a line.', html: R`
<p>The line through point $\mathbf r_0$ with direction $\mathbf v$ is</p>
<div class="key"><p>$\mathbf r = \mathbf r_0 + t\mathbf v$, i.e. $x = x_0 + at,\ y = y_0 + bt,\ z = z_0 + ct$, or $\dfrac{x - x_0}a = \dfrac{y - y_0}b = \dfrac{z - z_0}c$</p></div>
<p>Two lines in space are <strong>parallel</strong> (directions proportional), <strong>intersecting</strong> (solve for a common point), or <strong>skew</strong>: not parallel and never meeting, like a road crossing over a railway.</p>
<p>The distance from point $Q$ to a line through $P$ with direction $\mathbf v$ is the height of the parallelogram spanned by $\overrightarrow{PQ}$ and $\mathbf v$:</p>
<div class="key"><p>$d = \dfrac{|\overrightarrow{PQ}\times\mathbf v|}{|\mathbf v|}$</p></div>
<div class="worked"><p>Find the distance from $(1, 2, 3)$ to the line through the origin with direction $(1, 1, 1)$.</p>
<p>$\overrightarrow{PQ}\times\mathbf v = (1, 2, 3)\times(1, 1, 1) = (2 - 3,\ 3 - 1,\ 1 - 2) = (-1, 2, -1)$, of length $\sqrt6$. Divide by $|\mathbf v| = \sqrt3$: $d = \sqrt2 \approx 1.41$.</p></div>
<p>The shortest distance between skew lines is the projection of any connecting vector onto $\mathbf v_1\times\mathbf v_2$, the direction perpendicular to both.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The lines $\mathbf r = (0, 0, 0) + t(1, 0, 0)$ and $\mathbf r = (0, 1, 0) + s(0, 0, 1)$ are…`, ['skew', 'parallel', 'intersecting', 'the same line'], 0, [R`Directions are not parallel; can they meet?`], R`Meeting needs $y = 0$ and $y = 1$ at once: impossible. Skew, 1 unit apart.`)] },
      { title: 'Planes', plain: 'A plane is all points whose displacement from a fixed point is perpendicular to a normal vector, giving ax + by + cz = d; the normal comes from a cross product, and it gives distances from points and angles between planes.', html: R`
<p>A plane through $\mathbf r_0$ with <strong>normal vector</strong> $\mathbf n = (a, b, c)$ is $\mathbf n\cdot(\mathbf r - \mathbf r_0) = 0$:</p>
<div class="key"><p>$ax + by + cz = d$</p></div>
<p>Through three points $P, Q, R$, take $\mathbf n = \overrightarrow{PQ}\times\overrightarrow{PR}$. Parallel planes share a normal. The angle between two planes is the angle between their normals. A line meets a plane where its parametric coordinates satisfy the plane's equation.</p>
<div class="key"><p>Distance from $(x_0, y_0, z_0)$ to the plane: $d = \dfrac{|ax_0 + by_0 + cz_0 - d|}{\sqrt{a^2 + b^2 + c^2}}$</p></div>
<div class="worked"><p>Find the plane through $(1, 0, 0)$, $(0, 2, 0)$ and $(0, 0, 3)$, and its distance from the origin.</p>
<p>Intercept form: $\dfrac x1 + \dfrac y2 + \dfrac z3 = 1$, i.e. $6x + 3y + 2z = 6$. Distance from the origin $= 6/\sqrt{36 + 9 + 4} = 6/7 \approx 0.857$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Angle (degrees) between the planes $x + y = 1$ and $y + z = 1$?`, 60, [R`Normals (1, 1, 0) and (0, 1, 1).`], R`$\cos\theta = 1/2$: 60°.`)] },
      { title: 'Quadric surfaces and other coordinates', plain: 'Second-degree equations in x, y and z give quadric surfaces such as ellipsoids, paraboloids, hyperboloids and cones, recognised by their slices; cylindrical and spherical coordinates describe round shapes simply.', html: R`
<p>Second-degree equations in $x, y, z$ define <strong>quadric surfaces</strong>, best recognised by their <strong>traces</strong> (slices parallel to the coordinate planes):</p>
<ul><li><strong>ellipsoid</strong> $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$: every trace an ellipse;</li>
<li><strong>elliptic paraboloid</strong> $z = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$: a bowl (satellite dishes);</li>
<li><strong>hyperbolic paraboloid</strong> $z = \dfrac{x^2}{a^2} - \dfrac{y^2}{b^2}$: a saddle (crisps, some roofs);</li>
<li><strong>hyperboloid of one sheet</strong> $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = 1$: cooling towers, made of straight lines;</li>
<li><strong>hyperboloid of two sheets</strong> (right side −1) and the <strong>cone</strong> (right side 0).</li></ul>
<h3 class="sub">Cylindrical and spherical coordinates</h3>
<p><strong>Cylindrical</strong> $(r, \theta, z)$: polar coordinates in the xy-plane plus height. <strong>Spherical</strong> $(\rho, \phi, \theta)$: distance from the origin ρ, angle φ down from the positive z-axis, and the same θ:</p>
<div class="key"><p>$x = \rho\sin\phi\cos\theta,\quad y = \rho\sin\phi\sin\theta,\quad z = \rho\cos\phi$</p></div>
<div class="worked"><p>Convert $(1, 1, \sqrt2)$ to spherical coordinates.</p>
<p>$\rho = \sqrt{1 + 1 + 2} = 2$; $\cos\phi = \sqrt2/2$, so $\phi = 45^\circ$; $\theta = 45^\circ$. In spherical coordinates a sphere is simply $\rho = $ constant, and a cone $\phi = $ constant.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The surface $x^2 + y^2 - z^2 = 1$ is…`, ['a hyperboloid of one sheet', 'a hyperboloid of two sheets', 'a cone', 'an ellipsoid'], 0, [R`One minus sign, right side +1.`], R`Its horizontal traces are circles at every height.`)] }
    ],
    figures: [{ s: 3, title: 'Spherical coordinates', caption: 'A point described by its distance ρ from the origin, the angle φ from the z-axis and the angle θ around it (shown in an oblique view).', params: { aspect: 0.5, minH: 240, controls: [S('rho', 'ρ', 0.5, 3, 0.05, 2), S('phi', 'φ (from the z-axis)', 0, 180, 1, 45, '°'), S('th', 'θ (around the z-axis)', 0, 360, 1, 45, '°')],
      draw: (ctx, C, v, b) => { const p = v.phi * PI / 180, t = v.th * PI / 180, x = v.rho * Math.sin(p) * Math.cos(t), y = v.rho * Math.sin(p) * Math.sin(t), z = v.rho * Math.cos(p); const proj = (X, Y, Z) => [X * 0.9 - Y * 0.5, Z + (-X * 0.3 - Y * 0.35)]; const F = frame(b, [-3.4, 3.4], [-3, 3.4]); const ax = (a, c) => path(ctx, F, [proj(0, 0, 0), proj(a[0], a[1], a[2])], c, 1.4); ax([3, 0, 0], C.ink3); ax([0, 3, 0], C.ink3); ax([0, 0, 3], C.ink3); path(ctx, F, [proj(0, 0, 0), proj(x, y, z)], C.accent, 2.2); path(ctx, F, [proj(x, y, 0), proj(x, y, z)], C.ink3, 1); path(ctx, F, [proj(0, 0, 0), proj(x, y, 0)], C.ink3, 1); const q = proj(x, y, z); dot(ctx, F, q[0], q[1], C.points, 5); ctx.fillStyle = C.ink2; ctx.font = '12px sans-serif'; [['x', 3.2, 0, 0], ['y', 0, 3.2, 0], ['z', 0, 0, 3.2]].forEach((L) => { const s = proj(L[1], L[2], L[3]); ctx.fillText(L[0], F.X(s[0]), F.Y(s[1])); }); },
      readout: (v) => { const p = v.phi * PI / 180, t = v.th * PI / 180; return [['x', f(v.rho * Math.sin(p) * Math.cos(t), 3)], ['y', f(v.rho * Math.sin(p) * Math.sin(t), 3)], ['z', f(v.rho * Math.cos(p), 3)]]; } } }],
    labs: [{ sim: 'explore', title: 'Distance to a plane', desc: 'The distance from a point to the plane ax + by + cz = d, and the foot of the perpendicular. The graph shows how the distance changes as the point slides in x.',
      tasks: ['Check the distance from the origin to 6x + 3y + 2z = 6.', 'Where does the graph touch zero, and why is it V-shaped?', 'Make the plane x = 2. What does the distance become?'],
      params: { aspect: 0.42, controls: [S('a', 'a', -5, 5, 1, 6), S('b', 'b', -5, 5, 1, 3), S('c', 'c', -5, 5, 1, 2), S('d', 'd', -10, 10, 1, 6), S('x0', 'point x₀', -5, 5, 0.1, 0), S('y0', 'point y₀', -5, 5, 0.1, 0), S('z0', 'point z₀', -5, 5, 0.1, 0)],
        plots: [{ x: [-5, 5], y: [0, 8], xlabel: 'x₀ (with y₀, z₀ fixed)', ylabel: 'distance', curves: (v) => { const n = Math.hypot(v.a, v.b, v.c) || 1; return [{ f: (x) => Math.abs(v.a * x + v.b * v.y0 + v.c * v.z0 - v.d) / n }]; }, pts: (v) => { const n = Math.hypot(v.a, v.b, v.c) || 1; return [{ x: v.x0, y: Math.abs(v.a * v.x0 + v.b * v.y0 + v.c * v.z0 - v.d) / n }]; } }],
        readout: (v) => { const n2 = v.a * v.a + v.b * v.b + v.c * v.c; if (!n2) return [['plane', 'a, b, c cannot all be zero']]; const s = (v.a * v.x0 + v.b * v.y0 + v.c * v.z0 - v.d) / n2; return [['distance', f(Math.abs(s) * Math.sqrt(n2), 4)], ['foot of perpendicular', '(' + [v.x0 - s * v.a, v.y0 - s * v.b, v.z0 - s * v.c].map((q) => f(q, 3)).join(', ') + ')']]; } } }],
    formulas: [['Line', '\\mathbf r = \\mathbf r_0 + t\\mathbf v'], ['Plane', 'ax + by + cz = d,\\ \\mathbf n = (a, b, c)'], ['Point to plane', 'd = \\dfrac{|ax_0 + by_0 + cz_0 - d|}{|\\mathbf n|}'], ['Point to line', 'd = \\dfrac{|\\overrightarrow{PQ}\\times\\mathbf v|}{|\\mathbf v|}'], ['Box volume', 'V = |\\mathbf u\\cdot(\\mathbf v\\times\\mathbf w)|'], ['Spherical', 'x = \\rho\\sin\\phi\\cos\\theta,\\ y = \\rho\\sin\\phi\\sin\\theta,\\ z = \\rho\\cos\\phi']],
    problems: [
      M('concept', 'Parallel planes', R`Two planes are parallel when…`, ['their normal vectors are parallel', 'they share a point', 'their d values are equal', 'their normals are perpendicular'], 0, [R`Same orientation.`], R`Proportional normals.`),
      M('concept', 'Normal vector', R`A normal vector to the plane $2x - y + 3z = 4$ is…`, ['(2, −1, 3)', '(2, 1, 3)', '(4, 0, 0)', '(1, 2, 0)'], 0, [R`Read off the coefficients.`], R`$(a, b, c) = (2, -1, 3)$.`),
      M('concept', 'Skew lines', R`Skew lines are lines that…`, ['are not parallel and do not intersect', 'are parallel', 'meet at right angles', 'lie in the same plane'], 0, [R`Only possible in 3D.`], R`They lie in different planes.`),
      M('concept', 'Saddle', R`The surface $z = x^2 - y^2$ is…`, ['a hyperbolic paraboloid (saddle)', 'an elliptic paraboloid', 'a cone', 'a sphere'], 0, [R`Up in x, down in y.`], R`A saddle.`),
      P('core', 'num', 'Distance in 3D', R`Distance between $(1, 2, 3)$ and $(4, 6, 15)$?`, 13, [R`$\sqrt{9 + 16 + 144}$.`], R`13.`),
      P('core', 'num', 'Point to line', R`Distance from $(1, 2, 3)$ to the line through the origin with direction $(1, 1, 1)$?`, Math.SQRT2, [R`$|\overrightarrow{PQ}\times\mathbf v|/|\mathbf v|$.`], R`$\sqrt2 = 1.41$.`),
      P('core', 'num', 'Point to plane', R`Distance from the origin to $6x + 3y + 2z = 6$?`, 6 / 7, [R`$|{-6}|/7$.`], R`$6/7 = 0.857$.`),
      P('core', 'num', 'Angle between planes', R`Angle (degrees) between $x + y = 1$ and $y + z = 1$?`, 60, [R`Angle between normals.`], R`60°.`),
      P('core', 'num', 'Spherical ρ', R`ρ for the point $(1, 1, \sqrt2)$?`, 2, [R`Distance from the origin.`], R`2.`),
      P('core', 'num', 'Box volume', R`Volume of the parallelepiped spanned by $(1, 0, 0)$, $(1, 1, 0)$, $(1, 1, 1)$?`, 1, [R`Triple product.`], R`1.`),
      P('olympiad', 'num', 'Skew distance', R`Distance between the skew lines $\mathbf r = t(1, 0, 0)$ and $\mathbf r = (0, 1, 0) + s(0, 0, 1)$?`, 1, [R`Project $(0, 1, 0)$ onto $\mathbf v_1\times\mathbf v_2 = (0, -1, 0)$.`], R`1.`),
      P('olympiad', 'num', 'Line meets plane', R`Where does $\mathbf r = (1, 0, 0) + t(1, 2, 3)$ meet the plane $x + y + z = 7$? Give $t$.`, 1, [R`Substitute: $(1 + t) + 2t + 3t = 7$.`], R`$6t = 6$: $t = 1$, at $(2, 2, 3)$.`),
      P('olympiad', 'num', 'Triangle area in space', R`Area of the triangle with vertices $(1, 0, 0)$, $(0, 2, 0)$, $(0, 0, 3)$?`, 3.5, [R`Half the magnitude of a cross product.`], R`$\overrightarrow{PQ}\times\overrightarrow{PR} = (6, 3, 2)$, length 7: area 3.5.`),
      P('olympiad', 'num', 'Spherical height', R`A point has $\rho = 4$, $\phi = 60^\circ$. Its z-coordinate?`, 2, [R`$z = \rho\cos\phi$.`], R`2.`)
    ],
    drills: [
      { title: 'Distance to a plane', gen: (r) => { const a = r.int(1, 4), b = r.int(-3, 3), c = r.int(1, 4), d = r.int(-6, 9), x = r.int(-3, 3), y = r.int(-3, 3), z = r.int(-3, 3); const n = Math.hypot(a, b, c); return { q: R`<p>Distance from $(${x}, ${y}, ${z})$ to $${a}x + (${b})y + ${c}z = ${d}$?</p>`, answer: Math.abs(a * x + b * y + c * z - d) / n, tol: 0.01, atol: 0.01, solution: R`<p>$|${a * x + b * y + c * z - d}|/\sqrt{${a * a + b * b + c * c}} = ${f(Math.abs(a * x + b * y + c * z - d) / n, 4)}$.</p>` }; } },
      { title: '3D distances', gen: (r) => { const p = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], q = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; const d = Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); return { q: R`<p>Distance between $(${p.join(', ')})$ and $(${q.join(', ')})$?</p>`, answer: d, tol: 0.01, atol: 0.01, solution: R`<p>$${f(d, 4)}$.</p>` }; } }
    ],
    predict: { q: 'The distance from the origin to the plane 6x + 3y + 2z = 6 is…', o: ['6/7', '1', '6'], a: 0, how: 'enter the plane in the distance lab with the point at the origin.', why: 'd = |6|/√(36 + 9 + 4) = 6/7.' },
    wild: ['Computer graphics', '3D games and CAD programs constantly compute ray–plane intersections, normals by cross products and distances to surfaces: the geometry of this chapter, millions of times a second.']
  });

  /* ================= Multiple integrals ================= */
  const MF = { lin: ['x + y² on [0, 2] × [0, 1]', (x, y) => x + y * y, [0, 2], [0, 1], 8 / 3], sin: ['sin x · sin y on [0, π]²', (x, y) => Math.sin(x) * Math.sin(y), [0, PI], [0, PI], 4], gauss: ['e^(−x²−y²) on [−2, 2]²', (x, y) => Math.exp(-x * x - y * y), [-2, 2], [-2, 2], 3.1122704] };
  const mid = (k, n) => { const m = MF[k], hx = (m[2][1] - m[2][0]) / n, hy = (m[3][1] - m[3][0]) / n; let s = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += m[1](m[2][0] + (i + 0.5) * hx, m[3][0] + (j + 0.5) * hy); return s * hx * hy; };
  const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
  PB.tbChapter({
    id: 'math-multiple', subject: 'maths', title: 'Multiple Integrals',
    subtitle: R`Integrating over areas and volumes. Double integrals as volumes, iterated integrals and Fubini's theorem, general regions and reversing the order of integration, polar coordinates and the Gaussian integral, triple integrals in cylindrical and spherical coordinates, Jacobians, and applications to mass, centres of mass and moments of inertia.`,
    big: 'A double integral adds up a quantity over a region of the plane, a triple integral over a solid. Computed as repeated single integrals, they give volumes, masses and balance points. Choosing coordinates that match the shape, polar for discs, spherical for balls, turns hard integrals into easy ones, and even proves that the area under the bell curve is √π.',
    goals: ['Interpret and evaluate double integrals as iterated integrals (Fubini)', 'Set up integrals over general regions and reverse the order of integration', 'Convert double integrals to polar coordinates (dA = r dr dθ)', 'Evaluate the Gaussian integral', 'Set up triple integrals in rectangular, cylindrical and spherical coordinates', 'Use Jacobians, and compute mass, centres of mass and moments of inertia'],
    prereqs: ['math-multivar'],
    sections: [
      { title: 'Double integrals over rectangles', plain: 'A double integral adds up a function over a region, giving for example the volume under a surface; over a rectangle it can be worked out as two ordinary integrals, one after the other, in either order.', html: R`
<p>Divide a rectangle into small pieces of area $\Delta A$, multiply $f$ at a point of each by $\Delta A$, and add: as the pieces shrink, the sum tends to the <strong>double integral</strong> $\iint_R f(x, y)\,dA$. For $f \ge 0$ it is the volume under the surface $z = f(x, y)$; divided by the area of $R$ it is the average value of $f$.</p>
<p><strong>Fubini's theorem</strong>: for continuous $f$ on a rectangle, the double integral equals an <strong>iterated integral</strong> in either order:</p>
<div class="key"><p>$\displaystyle\iint_R f\,dA = \int_a^b\left(\int_c^d f(x, y)\,dy\right)dx = \int_c^d\left(\int_a^b f(x, y)\,dx\right)dy$</p></div>
<div class="worked"><p>Evaluate $\int_0^2\int_0^1(x + y^2)\,dy\,dx$.</p>
<p>Inner (y, with x fixed): $\left[xy + \tfrac{y^3}3\right]_0^1 = x + \tfrac13$. Outer: $\int_0^2(x + \tfrac13)\,dx = 2 + \tfrac23 = \tfrac83$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_0^1\int_0^2 xy\,dx\,dy$.`, 1, [R`It separates: $\int_0^2x\,dx\cdot\int_0^1y\,dy$.`], R`$2\cdot\tfrac12 = 1$.`)] },
      { title: 'General regions and reversing the order', plain: 'For regions with curved edges, the inner integral’s limits become functions; sometimes an integral that cannot be done one way becomes easy when the order of integration is reversed.', html: R`
<p>For a region between two curves, $D = \{a \le x \le b,\ g_1(x) \le y \le g_2(x)\}$, integrate first in $y$ between the curves, then in $x$:</p>
<div class="key"><p>$\displaystyle\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}f(x, y)\,dy\,dx$</p></div>
<p>The same region can often be described the other way round, with $x$ between functions of $y$. Sketch the region before switching: the limits change, not just their order.</p>
<div class="worked"><p>Evaluate $\int_0^1\int_x^1e^{y^2}\,dy\,dx$.</p>
<p>$e^{y^2}$ has no elementary antiderivative, so reverse. The region is $0 \le x \le y \le 1$: for each $y$, $x$ runs from 0 to $y$. So the integral is $\int_0^1\int_0^ye^{y^2}\,dx\,dy = \int_0^1ye^{y^2}\,dy = \tfrac12(e - 1) \approx 0.859$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Area of the region between $y = x$ and $y = x^2$, as a double integral?`, 1 / 6, [R`$\int_0^1\int_{x^2}^x1\,dy\,dx$.`], R`$\int_0^1(x - x^2)dx = 1/6$.`)] },
      { title: 'Polar coordinates and the Gaussian integral', plain: 'Over circles and discs, polar coordinates make double integrals simple, remembering that the small area element is r dr dθ; this trick even finds the area under the bell curve, √π.', html: R`
<p>In polar coordinates a small region has sides $dr$ and $r\,d\theta$, so</p>
<div class="key"><p>$dA = r\,dr\,d\theta$</p></div>
<p>(The extra factor $r$ is the Jacobian of the change of variables.) Discs, rings and sectors become rectangles in $(r, \theta)$.</p>
<div class="worked"><p>Find the volume under the paraboloid $z = 4 - x^2 - y^2$ and above the xy-plane.</p>
<p>The region is the disc $r \le 2$: $V = \int_0^{2\pi}\int_0^2(4 - r^2)r\,dr\,d\theta = 2\pi\left[2r^2 - \tfrac{r^4}4\right]_0^2 = 2\pi(8 - 4) = 8\pi$.</p></div>
<h3 class="sub">The Gaussian integral</h3>
<p>$e^{-x^2}$ has no elementary antiderivative, yet $I = \int_{-\infty}^\infty e^{-x^2}dx$ can be found exactly. Square it and switch to polar coordinates:</p>
<div class="key"><p>$I^2 = \displaystyle\iint_{\mathbb R^2}e^{-(x^2 + y^2)}\,dA = \int_0^{2\pi}\int_0^\infty e^{-r^2}r\,dr\,d\theta = 2\pi\cdot\tfrac12 = \pi$, so $I = \sqrt\pi$</p></div>
<p>This is why $\sqrt\pi$ appears in the normal distribution, $\tfrac1{\sqrt{2\pi}}e^{-x^2/2}$, and throughout physics.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\iint(x^2 + y^2)\,dA$ over the unit disc.`, PI / 2, [R`$\int_0^{2\pi}\int_0^1r^2\cdot r\,dr\,d\theta$.`], R`$2\pi\cdot\tfrac14 = \pi/2$.`)] },
      { title: 'Triple integrals and applications', plain: 'Triple integrals add up over solids; cylindrical and spherical coordinates, with their own volume factors, handle round solids, and the same integrals give mass, centre of mass and moment of inertia.', html: R`
<p>A <strong>triple integral</strong> $\iiint_E f\,dV$ adds up $f$ over a solid; with $f = 1$ it gives the volume, with $f = $ density the mass. In different coordinates the volume element changes:</p>
<div class="key"><p>Cartesian $dV = dx\,dy\,dz$; cylindrical $dV = r\,dr\,d\theta\,dz$; spherical $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$</p></div>
<div class="worked"><p>Find the volume of a ball of radius $R$ in spherical coordinates.</p>
<p>$\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\tfrac{R^3}3 = \tfrac43\pi R^3$.</p></div>
<p>For a general substitution $x = x(u, v)$, $y = y(u, v)$, the area element is $|J|\,du\,dv$ with the <strong>Jacobian</strong> $J = \dfrac{\partial(x, y)}{\partial(u, v)} = x_uy_v - x_vy_u$; for polar coordinates $J = r$.</p>
<p><strong>Applications</strong>: mass $m = \iiint\rho\,dV$; centre of mass $\bar x = \tfrac1m\iiint x\rho\,dV$ (and similarly for $y$, $z$); moment of inertia about an axis $I = \iiint d^2\rho\,dV$, where $d$ is the distance from the axis. These integrals give the standard results used in Rotation, such as $\tfrac12MR^2$ for a disc and $\tfrac25MR^2$ for a solid sphere.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Volume of a ball of radius 2 from the spherical-coordinates integral?`, 32 * PI / 3, [R`$\tfrac43\pi R^3$.`], R`$32\pi/3 = 33.5$.`)] }
    ],
    figures: [{ s: 2, title: 'Area under the bell curve', caption: 'The integral of e^(−x²) from −a to a approaches √π ≈ 1.7725 as a grows, although e^(−x²) has no elementary antiderivative.', params: { aspect: 0.4, minH: 210, controls: [S('a', 'Half-width a', 0.1, 3, 0.05, 1)],
      plots: [{ x: [-3, 3], y: [0, 1.05], xlabel: 'x', ylabel: 'e^(−x²)', curves: () => [{ f: (x) => Math.exp(-x * x) }], vlines: (v) => [{ x: -v.a }, { x: v.a }] }],
      readout: (v) => [['∫ from −a to a', f(Math.sqrt(PI) * erf(v.a), 5)], ['√π', '1.77245']] } }],
    labs: [{ sim: 'explore', title: 'Riemann sums in two dimensions', desc: 'Approximate a double integral by the midpoint rule on an n × n grid, and watch the error shrink as n grows.',
      tasks: ['How large must n be for an error below 0.001 for sin x sin y?', 'Doubling n: by what factor does the error shrink?', 'Why is the Gaussian over [−2, 2]² slightly less than π?'],
      params: { aspect: 0.42, controls: [{ id: 'k', type: 'select', label: 'Integral', value: 'sin', options: Object.keys(MF).map((k) => [k, MF[k][0]]) }, S('n', 'Grid n × n', 1, 40, 1, 4)],
        plots: [{ x: [1, 40], y: [-4, 0.5], xlabel: 'grid size n', ylabel: 'log₁₀ |error|', curves: (v) => [{ f: (n) => Math.log10(Math.abs(mid(v.k, Math.max(1, Math.round(n))) - MF[v.k][4]) + 1e-12) }], pts: (v) => [{ x: v.n, y: Math.log10(Math.abs(mid(v.k, v.n) - MF[v.k][4]) + 1e-12) }] }],
        readout: (v) => [['midpoint estimate', f(mid(v.k, v.n), 6)], ['exact', f(MF[v.k][4], 6)], ['error', f(Math.abs(mid(v.k, v.n) - MF[v.k][4]), 3)]] } }],
    formulas: [['Fubini', '\\iint_R f\\,dA = \\int_a^b\\int_c^d f\\,dy\\,dx'], ['Polar', 'dA = r\\,dr\\,d\\theta'], ['Gaussian integral', '\\int_{-\\infty}^{\\infty}e^{-x^2}dx = \\sqrt\\pi'], ['Cylindrical', 'dV = r\\,dr\\,d\\theta\\,dz'], ['Spherical', 'dV = \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta'], ['Jacobian', 'J = x_uy_v - x_vy_u'], ['Moment of inertia', 'I = \\iiint d^2\\rho\\,dV']],
    problems: [
      M('concept', 'Fubini', R`Fubini's theorem says that, for continuous $f$ on a rectangle,…`, ['the iterated integrals in either order are equal', 'the integral is always zero', 'only the dx dy order works', 'double integrals cannot be computed'], 0, [R`Order of integration.`], R`Both orders give the double integral.`),
      M('concept', 'Polar area element', R`In polar coordinates, $dA$ equals…`, ['$r\\,dr\\,d\\theta$', '$dr\\,d\\theta$', '$r^2\\,dr\\,d\\theta$', '$\\sin\\theta\\,dr\\,d\\theta$'], 0, [R`The small region has sides dr and r dθ.`], R`$r\,dr\,d\theta$.`),
      M('concept', 'Spherical volume element', R`In spherical coordinates, $dV$ equals…`, ['$\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$', '$\\rho\\,d\\rho\\,d\\phi\\,d\\theta$', '$d\\rho\\,d\\phi\\,d\\theta$', '$\\rho^2\\cos\\phi\\,d\\rho\\,d\\phi\\,d\\theta$'], 0, [R`φ is measured from the z-axis.`], R`$\rho^2\sin\phi$.`),
      M('concept', 'Reversing order', R`$\int_0^1\int_0^x f\,dy\,dx$ written in the other order is…`, ['$\\int_0^1\\int_y^1 f\\,dx\\,dy$', '$\\int_0^1\\int_0^y f\\,dx\\,dy$', '$\\int_0^x\\int_0^1 f\\,dx\\,dy$', '$\\int_0^1\\int_0^1 f\\,dx\\,dy$'], 0, [R`Sketch the triangle $0 \le y \le x \le 1$.`], R`For each y, x runs from y to 1.`),
      P('core', 'num', 'Iterated integral', R`$\int_0^2\int_0^1(x + y^2)\,dy\,dx$?`, 8 / 3, [R`Inner integral first.`], R`$8/3 = 2.67$.`),
      P('core', 'num', 'Reverse the order', R`$\int_0^1\int_x^1e^{y^2}\,dy\,dx$?`, (Math.E - 1) / 2, [R`Reverse: $\int_0^1ye^{y^2}dy$.`], R`$(e - 1)/2 = 0.859$.`),
      P('core', 'num', 'Paraboloid volume', R`Volume under $z = 4 - x^2 - y^2$ above the xy-plane?`, 8 * PI, [R`Polar coordinates, $r \le 2$.`], R`$8\pi = 25.1$.`),
      P('core', 'num', 'Disc area', R`Area of a disc of radius 3, as $\int_0^{2\pi}\int_0^3r\,dr\,d\theta$?`, 9 * PI, [R`Compute.`], R`$9\pi = 28.3$.`),
      P('core', 'num', 'Over the unit disc', R`$\iint(x^2 + y^2)\,dA$ over the unit disc?`, PI / 2, [R`$\int_0^{2\pi}\int_0^1r^3dr\,d\theta$.`], R`$\pi/2 = 1.571$.`),
      P('core', 'num', 'Ball volume', R`Volume of a ball of radius 2?`, 32 * PI / 3, [R`Spherical coordinates.`], R`$33.5$.`),
      P('olympiad', 'num', 'Gaussian integral', R`$\int_{-\infty}^{\infty}e^{-x^2}dx$?`, Math.sqrt(PI), [R`Square it; use polar coordinates.`], R`$\sqrt\pi = 1.772$.`),
      P('olympiad', 'num', 'Half a Gaussian', R`$\int_0^\infty e^{-x^2}dx$?`, Math.sqrt(PI) / 2, [R`Symmetry.`], R`$\sqrt\pi/2 = 0.886$.`),
      P('olympiad', 'num', 'Ice-cream cone', R`Volume inside the sphere $\rho = 2$ and the cone $\phi \le \pi/4$?`, 2 * PI * (1 - Math.cos(PI / 4)) * 8 / 3, [R`$\int_0^{2\pi}\int_0^{\pi/4}\int_0^2\rho^2\sin\phi$.`], R`$2\pi(1 - \tfrac{\sqrt2}2)\tfrac83 = 4.91$.`),
      P('olympiad', 'num', 'Disc moment of inertia', R`A uniform disc of mass 2 kg and radius 3 m: $I = \iint r^2\sigma\,dA$ about its axis. Value (kg m²)?`, 9, [R`$\tfrac12MR^2$.`], R`$\tfrac12\cdot2\cdot9 = 9$ kg m².`)
    ],
    drills: [
      { title: 'Rectangle integrals', gen: (r) => { const a = r.int(1, 4), b = r.int(1, 4), p = r.int(1, 3), q = r.int(1, 3); return { q: R`<p>$\int_0^{${a}}\int_0^{${b}} x^{${p}}y^{${q}}\,dy\,dx$?</p>`, answer: Math.pow(a, p + 1) / (p + 1) * Math.pow(b, q + 1) / (q + 1), tol: 0.01, solution: R`<p>It separates: $\tfrac{${a}^{${p + 1}}}{${p + 1}}\cdot\tfrac{${b}^{${q + 1}}}{${q + 1}} = ${f(Math.pow(a, p + 1) / (p + 1) * Math.pow(b, q + 1) / (q + 1), 4)}$.</p>` }; } },
      { title: 'Polar integrals', gen: (r) => { const R0 = r.int(1, 4), n = r.int(0, 3); return { q: R`<p>$\iint r^{${n}}\,dA$ over the disc of radius ${R0} (with $dA = r\,dr\,d\theta$)?</p>`, answer: 2 * PI * Math.pow(R0, n + 2) / (n + 2), tol: 0.01, solution: R`<p>$2\pi\cdot${R0}^{${n + 2}}/${n + 2} = ${f(2 * PI * Math.pow(R0, n + 2) / (n + 2), 4)}$.</p>` }; } }
    ],
    predict: { q: 'Doubling the number of grid squares in each direction makes the midpoint-rule error about…', o: ['a quarter as big', 'half as big', 'unchanged'], a: 0, how: 'compare n = 4 and n = 8 in the Riemann-sum lab.', why: 'The midpoint rule’s error falls as the square of the grid spacing.' },
    wild: ['Probability and physics', 'The Gaussian integral normalises the bell curve used in statistics, and triple integrals give the moments of inertia that engineers use to design flywheels, propellers and satellites.']
  });

  /* ---------- an in-text figure for Trigonometry ---------- */
  const trig = PB.chapter('math-trig');
  if (trig && !(trig.figures || []).length) {
    trig.figures = [{ s: 2, title: 'Stretching and shifting a sine wave', caption: 'y = A sin(Bx + C): A sets the height, B squeezes the wave (period 2π/B), and C slides it sideways by C/B.', params: { aspect: 0.42, minH: 220, controls: [S('A', 'Amplitude A', 0.2, 3, 0.1, 1), S('B', 'Frequency B', 0.25, 4, 0.05, 1), S('C', 'Phase C', -PI, PI, 0.05, 0)],
      plots: [{ x: [0, 4 * PI], y: [-3.2, 3.2], xlabel: 'x (rad)', ylabel: 'y', zero: true, n: 400, curves: (v) => [{ f: (x) => v.A * Math.sin(v.B * x + v.C), label: 'A sin(Bx + C)' }, { f: (x) => Math.sin(x), color: 'ink3', dash: [4, 4], label: 'sin x' }] }],
      readout: (v) => [['period', f(2 * PI / v.B, 4)], ['shift', f(-v.C / v.B, 4)]] } }];
    const sec = trig.sections[2];
    if (sec && sec.html.indexOf('data-fig') < 0) sec.html += '<div data-fig="0"></div>';
  }
})();
