/* Mathematics 4–6: applications of derivatives, the integral, techniques of integration. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.01 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.01 } : {}, o || {});
  const simpson = (g, a, b, n) => { n = n || 400; const h = (b - a) / n; let s = g(a) + g(b); for (let i = 1; i < n; i++) s += g(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };

  /* ===================== 4. Applications of the derivative ===================== */
  PB.addChapter({
    id: 'math-applications', subject: 'maths', num: 5, part: 'Calculus',
    title: 'Using Derivatives',
    subtitle: R`What derivatives are for. Increasing and decreasing functions, maxima and minima, optimisation, curve sketching, related rates, linear approximation, Newton's method and L'Hôpital's rule.`,
    big: 'If you know how fast something changes, you know where it peaks: at a maximum or minimum the slope is zero. That single fact turns "what is the best shape, price or path?" into "solve f′(x) = 0".',
    goals: ['Use the sign of f′ to find where f increases or decreases', 'Classify stationary points with the first or second derivative', 'Set up and solve optimisation problems', 'Solve related-rates problems with the chain rule', 'Approximate with tangent lines and Newton’s method; use L’Hôpital’s rule'],
    sections: [
      { title: 'Rising, falling and turning', html: R`
<p>Where $f'(x) > 0$ the graph climbs; where $f'(x) < 0$ it falls. At a smooth peak or valley it does neither, so $f'(x) = 0$. Such points are called <strong>stationary points</strong>.</p>
<p>To classify a stationary point, look at the sign of $f'$ on either side (first-derivative test), or at the <strong>second derivative</strong> $f''$, the rate of change of the slope:</p>
<div class="key"><p>$f'(a) = 0$ and $f''(a) > 0$: a <strong>minimum</strong> (the graph bends up, like a cup).<br>$f'(a) = 0$ and $f''(a) < 0$: a <strong>maximum</strong> (it bends down, like a cap).<br>$f''(a) = 0$: the test is inconclusive; check the signs of $f'$ instead.</p></div>
<p>Example: $f(x) = x^3 - 3x$. Then $f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$, and $f''(x) = 6x$. At $x = 1$, $f'' = 6 > 0$: a minimum, $f(1) = -2$. At $x = -1$, a maximum, $f(-1) = 2$. Where $f''$ changes sign ($x = 0$) the curve switches from cap to cup: a <strong>point of inflection</strong>.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the $x$-coordinate of the minimum of $f(x) = x^2 - 6x + 11$.`, 3, [R`Solve $f'(x) = 2x - 6 = 0$.`], R`$x = 3$, and $f''(x) = 2 > 0$ confirms it is a minimum (value 2).`),
          QM(R`At a point where $f'(a) = 0$ and $f''(a) = -4$, the graph has…`, ['a minimum', 'a maximum', 'a point of inflection', 'no special feature'], 1, [R`Negative $f''$: the slope is decreasing.`], R`A maximum: the graph bends down (concave).`)] },
      { title: 'Optimisation', html: R`
<p>The recipe for "find the largest or smallest" problems:</p>
<ol><li>Draw a picture and name the variables.</li>
<li>Write the quantity to optimise as a function of <em>one</em> variable, using the constraint to eliminate the others.</li>
<li>Solve $f'(x) = 0$, and check the endpoints of the allowed interval too.</li>
<li>Confirm it is a max or min, and answer the actual question asked.</li></ol>
<p><strong>Example.</strong> A farmer has 100 m of fence to make a rectangle against a long wall (no fence on that side). Maximise the area. With sides $x$ (two of them) and $100 - 2x$: $A = x(100 - 2x)$, $A' = 100 - 4x = 0$, so $x = 25$ m and $A = 1250$ m².</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two positive numbers add to 20. What is the largest possible value of their product?`, 100, [R`Product $P = x(20 - x)$.`, R`$P' = 20 - 2x = 0$.`], R`$x = 10$, so the product is $100$.`)] },
      { title: 'Related rates', html: R`
<p>When two quantities are linked by an equation and both change in time, differentiate the equation with respect to $t$. The chain rule turns it into a link between their rates.</p>
<p><strong>Example.</strong> A balloon's radius grows at 2 cm/s. How fast is its volume growing when $r = 10$ cm? $V = \tfrac43\pi r^3$, so $\dfrac{\mathrm dV}{\mathrm dt} = 4\pi r^2\dfrac{\mathrm dr}{\mathrm dt} = 4\pi(100)(2) \approx 2513$ cm³/s.</p>
<p><strong>Example.</strong> A 5 m ladder slides down a wall. Its foot moves out at 0.5 m/s. How fast does the top fall when the foot is 3 m out? $x^2 + y^2 = 25$ gives $2x\dot x + 2y\dot y = 0$. With $x = 3$, $y = 4$: $\dot y = -\dfrac{x\dot x}{y} = -0.375$ m/s.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A circle's radius grows at 3 cm/s. How fast (cm²/s) does its area grow when $r = 5$ cm?`, 2 * Math.PI * 5 * 3, [R`$A = \pi r^2$, so $\dot A = 2\pi r\dot r$.`], R`$2\pi(5)(3) = 30\pi \approx 94.2$ cm²/s.`)] },
      { title: 'Approximations, Newton’s method and L’Hôpital', html: R`
<p>Near $x = a$ the tangent line is a good stand-in for the curve: $f(a + h) \approx f(a) + f'(a)h$. For instance $\sqrt{4.1} \approx 2 + \frac{1}{4}(0.1) = 2.025$ (true: 2.0248).</p>
<p><strong>Newton's method</strong> uses this to solve $f(x) = 0$: follow the tangent from your guess down to the axis,</p>
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.$$
<p>Near a root the number of correct digits roughly doubles each step. For $\sqrt2$ (root of $x^2 - 2$), starting at 1: $1 \to 1.5 \to 1.41667 \to 1.414216$.</p>
<p><strong>L'Hôpital's rule.</strong> If $f(a) = g(a) = 0$ (or both are infinite), then $\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}$, if the right side exists. So $\displaystyle\lim_{x\to0}\frac{e^x - 1}{x} = \lim\frac{e^x}{1} = 1$.</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Do one step of Newton's method for $x^2 - 5 = 0$ starting from $x_0 = 2$.`, 2.25, [R`$x_1 = x_0 - \dfrac{x_0^2 - 5}{2x_0}$.`], R`$2 - \dfrac{-1}{4} = 2.25$ (true $\sqrt5 = 2.2361$).`),
          QN(R`Use L'Hôpital to find $\displaystyle\lim_{x\to0}\frac{\ln(1 + 3x)}{x}$.`, 3, [R`Differentiate top and bottom.`], R`$\dfrac{3/(1 + 3x)}{1} \to 3$.`)] }
    ],
    figures: [
      { s: 0, title: 'A cubic and its derivatives', caption: 'Where f′ (orange) crosses zero, f turns; where f″ (green) crosses zero, f changes from cap to cup.', params: { controls: [S('c', 'c in f = x³ − cx', -3, 6, 0.1, 3)],
        plots: [{ x: [-3, 3], y: [-10, 10], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => x * x * x - v.c * x, label: 'f' }, { f: (x) => 3 * x * x - v.c, color: 'rust', label: "f′" }, { f: (x) => 6 * x, color: 'teal', dash: [4, 4], label: "f″" }], pts: (v) => (v.c > 0 ? [-1, 1].map((s) => { const x = s * Math.sqrt(v.c / 3); return { x: x, y: x * x * x - v.c * x }; }) : []) }],
        readout: (v) => v.c > 0 ? [['stationary at', 'x = ±' + f(Math.sqrt(v.c / 3))], ['max / min values', '±' + f(2 * Math.pow(v.c / 3, 1.5))]] : [['stationary points', v.c === 0 ? 'one (inflection) at 0' : 'none']] } },
      { s: 3, title: 'Newton’s method in action', caption: 'Each step follows the tangent to the x-axis. Watch how few steps it takes to hit √2.', params: { controls: [S('x0', 'Start x₀', 0.3, 4, 0.05, 3), S('n', 'Steps shown', 1, 4, 1, 2)],
        plots: [{ x: [0, 4.2], y: [-3, 15], zero: false, xlabel: 'x', ylabel: 'x² − 2', curves: (v) => { const out = [{ f: (x) => x * x - 2, label: 'f' }]; let x = v.x0; for (let i = 0; i < v.n; i++) { const m = 2 * x, y0 = x * x - 2, xx = x; out.push({ f: (t) => y0 + m * (t - xx), color: 'rust', dash: [4, 3], from: Math.min(xx, xx - y0 / m), to: Math.max(xx, xx - y0 / m) }); x = x - y0 / m; } return out; }, pts: (v) => { const p = []; let x = v.x0; for (let i = 0; i <= v.n; i++) { p.push({ x: x, y: x * x - 2, r: 4 }); x = x - (x * x - 2) / (2 * x); } return p; } }],
        readout: (v) => { let x = v.x0; const s = []; for (let i = 0; i < 4; i++) { x = x - (x * x - 2) / (2 * x); s.push(f(x, 8)); } return [['x₁…x₄', s.join(', ')], ['√2', f(Math.SQRT2, 8)]]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'The open-top box', desc: 'Cut squares of side x from the corners of a sheet and fold up the sides. Which x gives the biggest box?',
        tasks: ['Find the best x for a 30 cm square sheet. Check it with V′(x) = 0.', 'Make the sheet rectangular (W ≠ L). Does the best cut stay at one-sixth of the shorter side?', 'Why must x lie between 0 and half the shorter side?'],
        params: { aspect: 0.45, picFrac: 0.38, controls: [S('W', 'Sheet width', 10, 40, 1, 30, 'cm'), S('L', 'Sheet length', 10, 60, 1, 30, 'cm'), S('x', 'Cut x', 0.1, 14.9, 0.1, 4, 'cm')],
          draw: (ctx, C, v, b, U) => { const x = Math.min(v.x, Math.min(v.W, v.L) / 2 - 0.05), sc = Math.min(b.w / (v.L + 4), b.h / (v.W + 4)), ox = b.x + (b.w - v.L * sc) / 2, oy = b.y + (b.h - v.W * sc) / 2; ctx.fillStyle = U.alpha(C.accent, 0.18); ctx.fillRect(ox, oy, v.L * sc, v.W * sc); ctx.fillStyle = C.surface; [[0, 0], [v.L - x, 0], [0, v.W - x], [v.L - x, v.W - x]].forEach((q) => ctx.fillRect(ox + q[0] * sc, oy + q[1] * sc, x * sc, x * sc)); ctx.strokeStyle = C.accent; ctx.setLineDash([4, 3]); ctx.strokeRect(ox + x * sc, oy + x * sc, (v.L - 2 * x) * sc, (v.W - 2 * x) * sc); ctx.setLineDash([]); U.text(ctx, 'fold up', ox + v.L * sc / 2, oy + x * sc / 2 + 4, C.ink2, U.ui(11), 'center'); },
          plots: [{ x: (v) => [0, Math.min(v.W, v.L) / 2], y: 'auto', xlabel: 'x (cm)', ylabel: 'V (cm³)', curves: (v) => [{ f: (x) => x * (v.W - 2 * x) * (v.L - 2 * x) }], pts: (v) => [{ x: v.x, y: v.x * (v.W - 2 * v.x) * (v.L - 2 * v.x) }] }],
          readout: (v) => { const a = 12, bq = -4 * (v.W + v.L), c = v.W * v.L, xb = (-bq - Math.sqrt(bq * bq - 4 * a * c)) / (2 * a); return [['volume', f(v.x * (v.W - 2 * v.x) * (v.L - 2 * v.x)) + ' cm³'], ['best x (V′ = 0)', f(xb) + ' cm'], ['max volume', f(xb * (v.W - 2 * xb) * (v.L - 2 * xb)) + ' cm³']]; } } },
      { sim: 'explore', title: 'Tangent-line approximation', desc: 'Compare √x with its tangent line at a. The error grows like (x − a)².',
        tasks: ['Estimate √10 from the tangent at a = 9. How big is the error?', 'Double the distance from a. By roughly what factor does the error grow?'],
        params: { aspect: 0.45, controls: [S('a', 'Tangent at a', 1, 16, 0.5, 9), S('x', 'Estimate at x', 0.5, 20, 0.1, 10)],
          plots: [{ x: [0, 20], y: [0, 5], xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: Math.sqrt, label: '√x' }, { f: (x) => Math.sqrt(v.a) + (x - v.a) / (2 * Math.sqrt(v.a)), color: 'rust', dash: [4, 4], label: 'tangent' }], pts: (v) => [{ x: v.x, y: Math.sqrt(v.a) + (v.x - v.a) / (2 * Math.sqrt(v.a)), color: 'rust' }, { x: v.x, y: Math.sqrt(v.x) }] }],
          readout: (v) => { const est = Math.sqrt(v.a) + (v.x - v.a) / (2 * Math.sqrt(v.a)); return [['estimate', f(est, 6)], ['true √x', f(Math.sqrt(v.x), 6)], ['error', f(est - Math.sqrt(v.x), 3)]]; } } }
    ],
    formulas: [['Stationary point', "f'(a) = 0"], ['Second-derivative test', "f''(a) > 0 \\Rightarrow \\min,\\ f''(a) < 0 \\Rightarrow \\max"], ['Linear approximation', "f(a + h) \\approx f(a) + f'(a)h"], ["Newton's method", "x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}"], ["L'Hôpital", "\\lim\\dfrac fg = \\lim\\dfrac{f'}{g'}\\ \\text{for } \\tfrac00 \\text{ or } \\tfrac\\infty\\infty"]],
    problems: [
      P('concept', 'mcq', 'Sign of the derivative', R`On an interval where $f'(x) < 0$, the function is…`, 1, [R`Negative slope.`], R`Decreasing.`, { options: ['increasing', 'decreasing', 'constant', 'concave up'] }),
      P('concept', 'mcq', 'Endpoints matter', R`To find the absolute maximum of a continuous $f$ on $[a, b]$, you must check…`, 2, [R`The maximum may sit at an end.`], R`The stationary points <em>and</em> the endpoints.`, { options: ['only where $f\' = 0$', 'only the endpoints', 'stationary points and endpoints', 'only where $f\'\' = 0$'] }),
      P('concept', 'mcq', 'Inflection', R`For $f(x) = x^4$, at $x = 0$…`, 0, [R`$f'' = 12x^2 \ge 0$ on both sides.`], R`$f''(0) = 0$ but $f'' $ does not change sign, and $f'$ goes from negative to positive: it is a minimum, not an inflection.`, { options: ['there is a minimum', 'there is an inflection point', 'there is a maximum', 'f is not differentiable'] }),
      P('concept', 'mcq', 'When L’Hôpital applies', R`Which limit can L'Hôpital's rule be used on directly?`, 1, [R`It needs $\tfrac00$ or $\tfrac\infty\infty$.`], R`$\dfrac{\sin x}{x}$ at 0 is $\tfrac00$. The others are not indeterminate.`, { options: ['$\\lim_{x\\to1}\\dfrac{x}{x + 1}$', '$\\lim_{x\\to0}\\dfrac{\\sin x}{x}$', '$\\lim_{x\\to0}\\dfrac{\\cos x}{x + 1}$', '$\\lim_{x\\to2}\\dfrac{x^2}{x}$'] }),
      P('core', 'num', 'Cheapest can', R`A closed cylindrical can must hold 500 cm³. What radius (cm) minimises its surface area?`, Math.cbrt(500 / (2 * Math.PI)), [R`$A = 2\pi r^2 + 2\pi rh$ with $\pi r^2h = 500$.`, R`$A = 2\pi r^2 + 1000/r$, so $A' = 4\pi r - 1000/r^2 = 0$.`], R`$r^3 = 500/2\pi$, $r = ${f(Math.cbrt(500 / (2 * Math.PI)), 4)}$ cm. Then $h = 2r$: the best can is as tall as it is wide.`),
      P('core', 'num', 'Maximum value', R`Find the maximum value of $f(x) = xe^{-x}$ for $x \ge 0$.`, 1 / Math.E, [R`$f'(x) = (1 - x)e^{-x}$.`], R`Maximum at $x = 1$: $f(1) = 1/e \approx ${f(1 / Math.E, 4)}$.`),
      P('core', 'num', 'Conical tank', R`Water pours at 2 m³/min into an inverted cone with radius equal to its height. How fast (m/min) does the level rise when the water is 3 m deep?`, 2 / (Math.PI * 9), [R`With $r = h$: $V = \tfrac13\pi h^3$.`, R`$\dot V = \pi h^2\dot h$.`], R`$\dot h = 2/(9\pi) = ${f(2 / (9 * Math.PI), 4)}$ m/min.`),
      P('core', 'num', 'Linear approximation', R`Use the tangent line at $x = 27$ to estimate $\sqrt[3]{28}$.`, 3 + 1 / 27, [R`$f(x) = x^{1/3}$, $f'(27) = \tfrac13\cdot27^{-2/3} = \tfrac1{27}$.`], R`$3 + \tfrac1{27} \approx ${f(3 + 1 / 27, 5)}$ (true $3.03659$).`, { tol: 0.0005 }),
      P('core', 'num', 'L’Hôpital twice', R`Find $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2}$.`, 0.5, [R`Apply the rule twice.`], R`$\dfrac{e^x - 1}{2x} \to \dfrac{e^x}{2} \to \tfrac12$.`),
      P('olympiad', 'num', 'Light through a window', R`A Norman window is a rectangle topped by a semicircle. Its perimeter is 10 m. What width (m) lets in the most light (largest area)?`, 20 / (4 + Math.PI), [R`Width $w = 2r$, height $y$: $2y + 2r + \pi r = 10$.`, R`$A = 2ry + \tfrac12\pi r^2$; eliminate $y$ and differentiate.`], R`$A = r(10 - 2r - \pi r) + \tfrac12\pi r^2$, $A' = 10 - 4r - \pi r = 0$, $r = 10/(4 + \pi)$, so $w = ${f(20 / (4 + Math.PI), 4)}$ m.`),
      P('olympiad', 'num', 'Shortest ladder', R`A fence 8 m high stands 1 m from a tall wall. What is the shortest ladder (m) that reaches from the ground over the fence to the wall?`, Math.pow(Math.pow(8, 2 / 3) + 1, 1.5), [R`If the ladder makes angle $\theta$ with the ground, its length is $L = 8/\sin\theta + 1/\cos\theta$.`, R`$L' = 0$ gives $\tan^3\theta = 8$.`], R`$\tan\theta = 2$, and $L = (8^{2/3} + 1^{2/3})^{3/2} = 5^{3/2} = ${f(Math.pow(5, 1.5), 4)}$ m.`),
      P('olympiad', 'num', 'Snell from calculus', R`A lifeguard runs at 7 m/s and swims at 1 m/s. She is on the shore; the swimmer is 10 m out and 20 m along the beach. How far along the beach (m) should she enter the water to arrive fastest? Give the answer to 3 significant figures.`, (() => { let best = 0, bt = 1e9; for (let x = 0; x <= 20; x += 0.0005) { const t = x / 7 + Math.sqrt(100 + (20 - x) * (20 - x)); if (t < bt) { bt = t; best = x; } } return best; })(), [R`Time $T(x) = x/7 + \sqrt{10^2 + (20 - x)^2}/1$.`, R`$T' = 0$ gives $\dfrac{20 - x}{\sqrt{100 + (20 - x)^2}} = \dfrac17$: Snell's law.`], R`$20 - x = 10/\sqrt{48}$, so $x = 20 - 1.443 = 18.6$ m: run almost all the way first.`)
    ]
  });
  PB.addDrills('math-applications', [
    { title: 'Vertex of a parabola', gen: (r) => { const a = r.int(1, 5) * r.pick([1, -1]), b = r.int(-12, 12); return { q: R`<p>Find the $x$-coordinate of the stationary point of $y = ${a}x^2 + (${b})x + 7$.</p>`, answer: -b / (2 * a), tol: 0.001, atol: 1e-9, solution: R`<p>$y' = ${2 * a}x + ${b} = 0$, so $x = ${f(-b / (2 * a), 4)}$.</p>` }; } },
    { title: 'Newton step', gen: (r) => { const n = r.int(3, 30), x0 = Math.round(Math.sqrt(n)) || 1; const x1 = x0 - (x0 * x0 - n) / (2 * x0); return { q: R`<p>One Newton step for $x^2 - ${n} = 0$ from $x_0 = ${x0}$. Find $x_1$.</p>`, answer: x1, tol: 0.001, solution: R`<p>$x_1 = ${x0} - \dfrac{${x0 * x0 - n}}{${2 * x0}} = ${f(x1, 5)}$.</p>` }; } },
    { title: 'Related rate: circle', gen: (r) => { const rr = r.int(2, 12), dr = r.int(1, 5); return { q: R`<p>A circle's radius grows at ${dr} cm/s. How fast (cm²/s) is the area growing when $r = ${rr}$ cm?</p>`, answer: 2 * Math.PI * rr * dr, tol: 0.005, solution: R`<p>$\dot A = 2\pi r\dot r = ${f(2 * Math.PI * rr * dr, 4)}$.</p>` }; } }
  ]);

  /* ===================== 5. The integral ===================== */
  const FN = { x2: [(x) => x * x, 'x²'], sin: [(x) => Math.sin(x), 'sin x'], exp: [(x) => Math.exp(x / 2), 'e^{x/2}'], lin: [(x) => 1 + 0.5 * x, '1 + x/2'] };
  PB.addChapter({
    id: 'math-integrals', subject: 'maths', num: 6, part: 'Calculus',
    title: 'The Integral',
    subtitle: R`Adding up infinitely many tiny pieces. Area as a limit of rectangles, the definite integral, antiderivatives, the fundamental theorem of calculus, and using integrals for area, distance and averages.`,
    big: 'Integration is the reverse of differentiation and also a way of adding things up. Slice an area into thin rectangles, add them, and let the slices shrink: the total is the integral. The fundamental theorem says you can get it from any function whose derivative is the one you started with.',
    goals: ['Estimate areas with Riemann sums', 'Interpret the definite integral as signed area', 'Find antiderivatives of standard functions', 'Use the fundamental theorem of calculus', 'Compute areas between curves, distances and average values'],
    sections: [
      { title: 'Area by rectangles', html: R`
<p>How far does a car travel if its speed changes? If it went at constant speed $v$ for time $t$, the distance would be $vt$: the area of a rectangle under the speed–time graph. When the speed varies, cut the time into $n$ short pieces of width $\Delta x$, treat the speed as constant on each, and add:</p>
$$\text{area} \approx \sum_{i=1}^{n} f(x_i)\,\Delta x.$$
<p>This is a <strong>Riemann sum</strong>. As the rectangles get thinner the error shrinks, and the limit is the <strong>definite integral</strong>:</p>
<div class="key"><p>$$\int_a^b f(x)\,\mathrm dx = \lim_{n\to\infty}\sum_{i=1}^{n}f(x_i)\,\Delta x.$$ The elongated S is an S for "sum"; $\mathrm dx$ is the infinitely thin width.</p></div>
<div data-fig="0"></div>
<p>Area below the $x$-axis counts as negative, so $\int_0^{2\pi}\sin x\,\mathrm dx = 0$: the hump above cancels the dip below.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Estimate $\int_0^2 x^2\,\mathrm dx$ with 2 rectangles of width 1, using the right-hand endpoint of each.`, 5, [R`Heights $f(1)$ and $f(2)$.`], R`$1\cdot1 + 1\cdot4 = 5$. (The true value is $8/3 \approx 2.67$; right endpoints overestimate a rising function.)`)] },
      { title: 'Antiderivatives', html: R`
<p>An <strong>antiderivative</strong> of $f$ is any function $F$ with $F' = f$. Since constants differentiate to zero, there is a whole family $F(x) + C$. We write the <strong>indefinite integral</strong></p>
$$\int f(x)\,\mathrm dx = F(x) + C.$$
<p>Every derivative rule, read backwards, is an integral rule:</p>
<div class="key"><p>$\displaystyle\int x^n\,\mathrm dx = \frac{x^{n+1}}{n + 1} + C\ (n \ne -1),\quad \int\frac{\mathrm dx}x = \ln|x| + C,\quad \int e^{kx}\mathrm dx = \frac{e^{kx}}k + C,$<br>$\displaystyle\int\sin x\,\mathrm dx = -\cos x + C,\quad \int\cos x\,\mathrm dx = \sin x + C.$</p></div>
<p>Check any antiderivative by differentiating it back. For example $\int(6x^2 - 4x + 1)\,\mathrm dx = 2x^3 - 2x^2 + x + C$, and differentiating gives the original.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which is $\int 3x^2\,\mathrm dx$?`, ['$6x + C$', '$x^3 + C$', '$3x^3 + C$', '$x^2 + C$'], 1, [R`Raise the power by one and divide by the new power.`], R`$3\cdot\dfrac{x^3}3 = x^3$, plus $C$.`)] },
      { title: 'The fundamental theorem of calculus', html: R`
<p>The two big ideas, slopes and areas, are inverses of each other. Let $A(x) = \int_a^x f(t)\,\mathrm dt$ be the area so far. Nudge $x$ by $h$ and the area grows by a thin strip of height about $f(x)$: $A(x + h) - A(x) \approx f(x)h$. So $A'(x) = f(x)$.</p>
<div class="key"><p><strong>Fundamental theorem.</strong> If $F' = f$, then $$\int_a^b f(x)\,\mathrm dx = F(b) - F(a) = \Big[F(x)\Big]_a^b.$$</p></div>
<p>No more limits of sums: just find an antiderivative and subtract. For example $\int_0^2 x^2\,\mathrm dx = \left[\tfrac{x^3}{3}\right]_0^2 = \tfrac83$. And $\int_0^\pi\sin x\,\mathrm dx = [-\cos x]_0^\pi = 1 + 1 = 2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_1^3 (2x + 1)\,\mathrm dx$.`, 10, [R`Antiderivative: $x^2 + x$.`], R`$(9 + 3) - (1 + 1) = 10$.`),
          QN(R`Evaluate $\int_0^1 e^{x}\,\mathrm dx$.`, Math.E - 1, [R`$e^x$ is its own antiderivative.`], R`$e - 1 \approx 1.718$.`)] },
      { title: 'What integrals measure', html: R`
<p><strong>Area between curves.</strong> The area between $y = f(x)$ above and $y = g(x)$ below is $\int_a^b (f - g)\,\mathrm dx$. Between $y = x$ and $y = x^2$ (they meet at 0 and 1): $\int_0^1(x - x^2)\,\mathrm dx = \tfrac12 - \tfrac13 = \tfrac16$.</p>
<p><strong>Distance from velocity.</strong> Displacement is $\int v\,\mathrm dt$; total distance travelled is $\int|v|\,\mathrm dt$.</p>
<p><strong>Average value.</strong> The average of $f$ over $[a, b]$ is $\dfrac{1}{b - a}\int_a^b f\,\mathrm dx$: the height of the rectangle with the same area. The average of $\sin x$ over half a cycle is $2/\pi \approx 0.64$.</p>
<p>Physics is full of such sums: work $\int F\,\mathrm dx$, charge $\int I\,\mathrm dt$, mass $\int\rho\,\mathrm dV$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the average value of $f(x) = x^2$ on $[0, 3]$.`, 3, [R`$\dfrac13\int_0^3x^2\,\mathrm dx$.`], R`$\dfrac13\cdot9 = 3$.`)] }
    ],
    figures: [
      { s: 0, title: 'Riemann sums', caption: 'Rectangles under y = x² on [0, 2]. More rectangles, smaller error: the limit is 8/3.', params: { controls: [S('n', 'Rectangles n', 1, 60, 1, 6), { type: 'select', id: 'rule', label: 'Height from', value: 'mid', options: [['left', 'left end'], ['mid', 'midpoint'], ['right', 'right end']] }],
        draw: null,
        plots: [{ x: [0, 2], y: [0, 4.3], xlabel: 'x', ylabel: 'y', n: 600, curves: (v) => { const w = 2 / v.n, off = v.rule === 'left' ? 0 : v.rule === 'mid' ? 0.5 : 1; return [{ f: (x) => { const i = Math.min(v.n - 1, Math.floor(x / w)); const xs = (i + off) * w; return xs * xs; }, color: 'points', label: 'rectangles' }, { f: (x) => x * x, label: 'y = x²' }]; } }],
        readout: (v) => { const w = 2 / v.n, off = v.rule === 'left' ? 0 : v.rule === 'mid' ? 0.5 : 1; let s = 0; for (let i = 0; i < v.n; i++) { const x = (i + off) * w; s += x * x * w; } return [['sum', f(s, 5)], ['exact 8/3', f(8 / 3, 5)], ['error', f(s - 8 / 3, 3)]]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Area so far: A(x) and f(x)', desc: 'The right plot is the running area A(x) = ∫₀ˣ f. Its slope at each point equals the height of f: the fundamental theorem made visible.',
        tasks: ['Where f is negative, what does A do?', 'At the point where f crosses zero, what does A have?', 'Choose sin x. Why does A(x) look like 1 − cos x?'],
        params: { aspect: 0.45, controls: [{ type: 'select', id: 'fn', label: 'f(x)', value: 'sin', options: Object.keys(FN).map((k) => [k, FN[k][1]]) }, S('x', 'Upper limit x', 0, 6.3, 0.01, 2)],
          plots: [{ x: [0, 6.3], y: 'auto', zero: false, xlabel: 't', ylabel: 'f(t)', title: 'f', curves: (v) => [{ f: FN[v.fn][0] }, { f: (t) => (t <= v.x ? FN[v.fn][0](t) : NaN), color: 'points', width: 5 }], vlines: (v) => [{ x: v.x }] },
            { x: [0, 6.3], y: 'auto', zero: false, xlabel: 'x', ylabel: 'A(x)', title: 'A', curves: (v) => [{ f: (x) => simpson(FN[v.fn][0], 0, x, 60), color: 'rust' }], pts: (v) => [{ x: v.x, y: simpson(FN[v.fn][0], 0, v.x, 200) }] }],
          readout: (v) => [['A(x)', f(simpson(FN[v.fn][0], 0, v.x, 400), 5)], ['slope of A = f(x)', f(FN[v.fn][0](v.x), 5)]] } },
      { sim: 'explore', title: 'Area between two curves', desc: 'The region between y = x and y = xⁿ on [0, 1].',
        tasks: ['Check the area is 1/6 for n = 2.', 'Find the general formula in terms of n.', 'What happens to the area as n → ∞?'],
        params: { aspect: 0.45, controls: [S('n', 'Power n', 1, 10, 0.1, 2)],
          plots: [{ x: [0, 1], y: [0, 1], xlabel: 'x', ylabel: 'y', n: 300, curves: (v) => [{ f: (x) => x, label: 'y = x' }, { f: (x) => Math.pow(x, v.n), color: 'rust', label: 'y = xⁿ' }], bands: () => [] }],
          readout: (v) => [['area = 1/2 − 1/(n + 1)', f(0.5 - 1 / (v.n + 1), 5)]] } }
    ],
    formulas: [['Definite integral', '\\int_a^b f\\,\\mathrm dx = \\lim_{n\\to\\infty}\\sum f(x_i)\\Delta x'], ['Fundamental theorem', '\\int_a^b f\\,\\mathrm dx = F(b) - F(a),\\ F\' = f'], ['Power rule', '\\int x^n\\,\\mathrm dx = \\dfrac{x^{n+1}}{n + 1} + C'], ['Logs and exponentials', '\\int\\dfrac{\\mathrm dx}x = \\ln|x| + C,\\ \\int e^{kx}\\mathrm dx = \\dfrac{e^{kx}}k + C'], ['Trig', '\\int\\sin x = -\\cos x,\\ \\int\\cos x = \\sin x'], ['Average value', '\\bar f = \\dfrac1{b - a}\\int_a^b f\\,\\mathrm dx']],
    problems: [
      P('concept', 'mcq', 'Signed area', R`$\int_{-1}^{1}x^3\,\mathrm dx = $`, 0, [R`$x^3$ is odd: the two halves cancel.`], R`0.`, { options: ['0', '$\\tfrac12$', '$\\tfrac14$', '2'] }),
      P('concept', 'mcq', 'Plus C', R`Why do indefinite integrals carry "$+ C$"?`, 2, [R`What is the derivative of a constant?`], R`Because constants differentiate to zero, so every $F + C$ has the same derivative.`, { options: ['To make the units work', 'It is the area at $x = 0$', 'Any constant differentiates to zero', 'It is the error term'] }),
      P('concept', 'mcq', 'Derivative of an area function', R`If $A(x) = \int_0^x \cos(t^2)\,\mathrm dt$, then $A'(x) = $`, 3, [R`Fundamental theorem.`], R`$\cos(x^2)$.`, { options: ['$\\sin(x^2)$', '$-2x\\sin(x^2)$', '$\\cos(2x)$', '$\\cos(x^2)$'] }),
      P('concept', 'mcq', 'Distance or displacement', R`A particle has velocity $v(t)$. Which gives the total distance it travels from $t = 0$ to $t = 5$?`, 1, [R`Distance never decreases.`], R`$\int_0^5|v|\,\mathrm dt$.`, { options: ['$\\int_0^5 v\\,\\mathrm dt$', '$\\int_0^5 |v|\\,\\mathrm dt$', '$v(5) - v(0)$', '$\\int_0^5 v\'\\,\\mathrm dt$'] }),
      P('core', 'num', 'Polynomial', R`Evaluate $\int_0^2(3x^2 - 2x + 4)\,\mathrm dx$.`, 12, [R`Antiderivative $x^3 - x^2 + 4x$.`], R`$8 - 4 + 8 = 12$.`),
      P('core', 'num', 'Area between curves', R`Find the area enclosed by $y = 4 - x^2$ and $y = 0$.`, 32 / 3, [R`They meet at $x = \pm2$.`], R`$\int_{-2}^{2}(4 - x^2)\,\mathrm dx = 16 - \tfrac{16}3 = \tfrac{32}3 \approx 10.67$.`),
      P('core', 'num', 'Logarithmic integral', R`Evaluate $\int_1^{e^2}\dfrac{\mathrm dx}{x}$.`, 2, [R`$\ln x$.`], R`$\ln e^2 - \ln1 = 2$.`),
      P('core', 'num', 'Distance from speed', R`A car's speed is $v(t) = 3t^2$ m/s. How far does it travel in the first 4 s?`, 64, [R`$\int_0^4 3t^2\,\mathrm dt$.`], R`$[t^3]_0^4 = 64$ m.`),
      P('core', 'num', 'Average of sine', R`Find the average value of $\sin x$ on $[0, \pi]$.`, 2 / Math.PI, [R`$\dfrac1\pi\int_0^\pi\sin x\,\mathrm dx$.`], R`$\dfrac{2}{\pi} \approx 0.637$.`),
      P('olympiad', 'num', 'Limit of a sum', R`Find $\displaystyle\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}\left(\frac kn\right)^3$.`, 0.25, [R`Recognise a Riemann sum for $\int_0^1 x^3\,\mathrm dx$.`], R`$\int_0^1x^3\,\mathrm dx = \tfrac14$.`),
      P('olympiad', 'num', 'Differentiating an integral', R`Let $G(x) = \int_0^{x^2}\sqrt{1 + t^3}\,\mathrm dt$. Find $G'(2)$.`, 4 * Math.sqrt(65), [R`Chain rule with the fundamental theorem: $G'(x) = \sqrt{1 + (x^2)^3}\cdot2x$.`], R`$G'(2) = \sqrt{1 + 64}\cdot4 = 4\sqrt{65} \approx ${f(4 * Math.sqrt(65), 4)}$.`),
      P('olympiad', 'num', 'Symmetric trick', R`Evaluate $\displaystyle\int_0^{\pi/2}\frac{\sin x}{\sin x + \cos x}\,\mathrm dx$.`, Math.PI / 4, [R`Substitute $x \to \pi/2 - x$ to get the same integral with $\cos$ on top.`, R`Add the two forms.`], R`Both versions are equal and they add to $\int_0^{\pi/2}1\,\mathrm dx = \pi/2$, so each is $\pi/4 \approx 0.785$.`)
    ]
  });
  PB.addDrills('math-integrals', [
    { title: 'Power-rule integral', gen: (r) => { const a = r.int(1, 6), n = r.int(1, 4), b = r.int(1, 3); const val = a * Math.pow(b, n + 1) / (n + 1); return { q: R`<p>Evaluate $\int_0^{${b}} ${a}x^${n}\,\mathrm dx$.</p>`, answer: val, tol: 0.002, solution: R`<p>$\left[\dfrac{${a}x^{${n + 1}}}{${n + 1}}\right]_0^{${b}} = ${f(val, 5)}$.</p>` }; } },
    { title: 'Exponential integral', gen: (r) => { const k = r.int(1, 3), b = r.step(0.5, 2, 0.5); const val = (Math.exp(k * b) - 1) / k; return { q: R`<p>Evaluate $\int_0^{${b}} e^{${k}x}\,\mathrm dx$.</p>`, answer: val, tol: 0.003, solution: R`<p>$\dfrac{e^{${k * b}} - 1}{${k}} = ${f(val, 5)}$.</p>` }; } },
    { title: 'Area between lines', gen: (r) => { const a = r.int(1, 5); const val = Math.pow(a, 3) / 6; return { q: R`<p>Find the area between $y = ${a}x$ and $y = x^2$.</p>`, answer: val, tol: 0.003, solution: R`<p>They meet at 0 and ${a}: $\int_0^{${a}}(${a}x - x^2)\,\mathrm dx = ${a}^3/6 = ${f(val, 4)}$.</p>` }; } }
  ]);

  /* ===================== 6. Techniques of integration ===================== */
  PB.addChapter({
    id: 'math-techniques', subject: 'maths', num: 7, part: 'Calculus',
    title: 'Techniques of Integration',
    subtitle: R`Integrating what the table does not list. Substitution, integration by parts, partial fractions, trigonometric integrals, and applications to volumes and arc length.`,
    big: 'Differentiation is mechanical; integration is pattern-spotting. Each technique is a derivative rule run backwards: substitution undoes the chain rule, integration by parts undoes the product rule, and partial fractions break a hard fraction into easy ones.',
    goals: ['Integrate by substitution', 'Integrate by parts', 'Split rational functions into partial fractions', 'Use trig identities to integrate powers of sin and cos', 'Find volumes of revolution and arc lengths'],
    sections: [
      { title: 'Substitution', html: R`
<p>The chain rule says $\dfrac{\mathrm d}{\mathrm dx}F(g(x)) = F'(g(x))\,g'(x)$. So whenever an integrand looks like "a function of $g$, times $g'$", substitute $u = g(x)$, $\mathrm du = g'(x)\,\mathrm dx$:</p>
$$\int 2x\cos(x^2)\,\mathrm dx\ \xrightarrow{u = x^2}\ \int\cos u\,\mathrm du = \sin u + C = \sin(x^2) + C.$$
<p>Look for an "inside" whose derivative is also present (up to a constant). For definite integrals, change the limits too: $\int_0^1 x e^{x^2}\mathrm dx = \tfrac12\int_0^1e^u\,\mathrm du = \tfrac12(e - 1)$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_0^2 2x(x^2 + 1)^3\,\mathrm dx$.`, (Math.pow(5, 4) - 1) / 4, [R`Let $u = x^2 + 1$, so $u$ runs from 1 to 5.`, R`$\int_1^5u^3\,\mathrm du$.`], R`$\left[\tfrac{u^4}4\right]_1^5 = \tfrac{625 - 1}{4} = 156$.`)] },
      { title: 'Integration by parts', html: R`
<p>Integrate the product rule $(uv)' = u'v + uv'$ and rearrange:</p>
<div class="key"><p>$$\int u\,\mathrm dv = uv - \int v\,\mathrm du.$$</p></div>
<p>Choose $u$ to be something that gets simpler when differentiated (a power of $x$, a log) and $\mathrm dv$ something you can integrate. Example: $\int x e^x\,\mathrm dx$ with $u = x$, $\mathrm dv = e^x\mathrm dx$: $= xe^x - \int e^x\,\mathrm dx = (x - 1)e^x + C$.</p>
<p>For $\int\ln x\,\mathrm dx$, take $u = \ln x$ and $\mathrm dv = \mathrm dx$: $= x\ln x - \int x\cdot\tfrac1x\,\mathrm dx = x\ln x - x + C$.</p>
<p>Some integrals return to themselves. For $I = \int e^x\sin x\,\mathrm dx$, parts twice gives $I = e^x\sin x - e^x\cos x - I$, so $I = \tfrac12e^x(\sin x - \cos x) + C$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_0^1 xe^x\,\mathrm dx$.`, 1, [R`Antiderivative $(x - 1)e^x$.`], R`$(0)e - (-1)(1) = 1$.`)] },
      { title: 'Partial fractions and trig integrals', html: R`
<p>A fraction of polynomials can be split into simple pieces. For example $\dfrac{1}{x^2 - 1} = \dfrac{1}{(x - 1)(x + 1)} = \dfrac{A}{x - 1} + \dfrac{B}{x + 1}$. Multiply out: $1 = A(x + 1) + B(x - 1)$; $x = 1$ gives $A = \tfrac12$, $x = -1$ gives $B = -\tfrac12$. Each piece integrates to a log:</p>
$$\int\frac{\mathrm dx}{x^2 - 1} = \tfrac12\ln\left|\frac{x - 1}{x + 1}\right| + C.$$
<p>Powers of sine and cosine yield to identities: $\sin^2x = \tfrac12(1 - \cos2x)$, so $\int_0^\pi\sin^2x\,\mathrm dx = \tfrac\pi2$. Odd powers: save one factor and use $\sin^2 = 1 - \cos^2$ with $u = \cos x$.</p>
<p>Two integrals worth knowing: $\int\dfrac{\mathrm dx}{1 + x^2} = \arctan x + C$ and $\int\dfrac{\mathrm dx}{\sqrt{1 - x^2}} = \arcsin x + C$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_0^1\dfrac{\mathrm dx}{1 + x^2}$.`, Math.PI / 4, [R`It is $\arctan x$.`], R`$\arctan1 - \arctan0 = \pi/4 \approx 0.785$.`),
          QN(R`Evaluate $\int_0^{\pi/2}\cos^2x\,\mathrm dx$.`, Math.PI / 4, [R`$\cos^2x = \tfrac12(1 + \cos2x)$.`], R`$\tfrac12\cdot\tfrac\pi2 = \tfrac\pi4$.`)] },
      { title: 'Volumes and lengths', html: R`
<p>Spin the curve $y = f(x)$ about the $x$-axis. A thin slice at $x$ is a disc of radius $f(x)$ and thickness $\mathrm dx$, so</p>
$$V = \int_a^b\pi f(x)^2\,\mathrm dx.$$
<p>Spinning $y = \sqrt{r^2 - x^2}$ for $-r \le x \le r$ gives a sphere: $V = \pi\int_{-r}^{r}(r^2 - x^2)\,\mathrm dx = \tfrac43\pi r^3$.</p>
<p>The <strong>arc length</strong> of a curve adds up little hypotenuses $\sqrt{\mathrm dx^2 + \mathrm dy^2}$:</p>
$$L = \int_a^b\sqrt{1 + f'(x)^2}\,\mathrm dx.$$
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Spin $y = x$ for $0 \le x \le 3$ about the $x$-axis. Find the volume of the cone.`, 9 * Math.PI, [R`$V = \pi\int_0^3x^2\,\mathrm dx$.`], R`$\pi\cdot9 = 9\pi \approx 28.3$, which matches $\tfrac13\pi r^2h$ with $r = h = 3$.`)] }
    ],
    figures: [
      { s: 3, title: 'Solid of revolution', caption: 'Spin y = xᵏ (0 ≤ x ≤ 1) round the x-axis. The volume is π/(2k + 1).', params: { picFrac: 0.5, controls: [S('k', 'Power k', 0.2, 3, 0.1, 0.5)],
        draw: (ctx, C, v, b, U) => { const x0 = b.x + 20, w = b.w - 40, cy = b.y + b.h / 2, sc = b.h * 0.4; ctx.strokeStyle = C.ink3; ctx.beginPath(); ctx.moveTo(x0 - 10, cy); ctx.lineTo(x0 + w + 10, cy); ctx.stroke(); for (let i = 1; i <= 12; i++) { const x = i / 12, r = Math.pow(x, v.k) * sc; ctx.strokeStyle = U.alpha(C.accent, 0.55); ctx.beginPath(); ctx.ellipse(x0 + x * w, cy, Math.max(2, r * 0.25), r, 0, 0, 7); ctx.stroke(); } ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = i / 60; ctx.lineTo(x0 + x * w, cy - Math.pow(x, v.k) * sc); } ctx.stroke(); ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = i / 60; ctx.lineTo(x0 + x * w, cy + Math.pow(x, v.k) * sc); } ctx.stroke(); },
        plots: [{ x: [0, 1], y: [0, 1.05], xlabel: 'x', ylabel: 'y = xᵏ', curves: (v) => [{ f: (x) => Math.pow(x, v.k) }] }],
        readout: (v) => [['volume', f(Math.PI / (2 * v.k + 1), 4)], ['arc length', f(simpson((x) => Math.sqrt(1 + Math.pow(v.k * Math.pow(Math.max(x, 1e-9), v.k - 1), 2)), 1e-6, 1, 2000), 4)]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Numerical integration race', desc: 'Approximate ∫₀^π sin x dx = 2 with the trapezium rule and Simpson’s rule.',
        tasks: ['Double n. By what factor does each error shrink?', 'Why is Simpson’s rule so much better for smooth functions?'],
        params: { aspect: 0.45, controls: [S('n', 'Intervals n (even)', 2, 40, 2, 4)],
          plots: [{ x: [0, Math.PI], y: [0, 1.1], xlabel: 'x', ylabel: 'sin x', n: 400, curves: (v) => { const h = Math.PI / v.n; return [{ f: Math.sin, label: 'sin x' }, { f: (x) => { const i = Math.min(v.n - 1, Math.floor(x / h)); const a = i * h, t = (x - a) / h; return Math.sin(a) * (1 - t) + Math.sin(a + h) * t; }, color: 'rust', dash: [4, 3], label: 'trapezia' }]; } }],
          readout: (v) => { const h = Math.PI / v.n; let tr = 0; for (let i = 0; i <= v.n; i++) tr += Math.sin(i * h) * (i === 0 || i === v.n ? 1 : 2); tr *= h / 2; const si = simpson(Math.sin, 0, Math.PI, v.n); return [['trapezium', f(tr, 8) + ' (error ' + f(tr - 2, 2) + ')'], ['Simpson', f(si, 8) + ' (error ' + f(si - 2, 2) + ')']]; } } },
      { sim: 'explore', title: 'Gabriel’s horn', desc: 'Spin y = 1/x for 1 ≤ x ≤ X about the x-axis. The volume stays finite as X → ∞ but the surface area does not: you could fill it with paint but never paint it.',
        tasks: ['What does the volume approach as X grows?', 'How does the surface area grow with X?'],
        params: { aspect: 0.45, controls: [S('X', 'Length X', 1.5, 1000, 0.5, 10)],
          plots: [{ x: [0, 3], y: [0, 25], xlabel: 'log₁₀ X', ylabel: 'value', curves: () => [{ f: (l) => Math.PI * (1 - Math.pow(10, -l)), label: 'volume π(1 − 1/X)' }, { f: (l) => 2 * Math.PI * l * Math.LN10, color: 'rust', label: 'area > 2π ln X' }] }],
          readout: (v) => [['volume', f(Math.PI * (1 - 1 / v.X), 5)], ['surface area (lower bound)', f(2 * Math.PI * Math.log(v.X), 5)]] } }
    ],
    formulas: [['Substitution', '\\int f(g(x))g\'(x)\\,\\mathrm dx = \\int f(u)\\,\\mathrm du'], ['By parts', '\\int u\\,\\mathrm dv = uv - \\int v\\,\\mathrm du'], ['Inverse trig', '\\int\\dfrac{\\mathrm dx}{1 + x^2} = \\arctan x,\\ \\int\\dfrac{\\mathrm dx}{\\sqrt{1 - x^2}} = \\arcsin x'], ['Power reduction', '\\sin^2x = \\tfrac12(1 - \\cos2x)'], ['Volume of revolution', 'V = \\pi\\int_a^b f(x)^2\\,\\mathrm dx'], ['Arc length', 'L = \\int_a^b\\sqrt{1 + f\'(x)^2}\\,\\mathrm dx']],
    problems: [
      P('concept', 'mcq', 'Which technique?', R`The best first move for $\int x^2e^{x^3}\,\mathrm dx$ is…`, 0, [R`Is the derivative of the inside present?`], R`Substitute $u = x^3$: $\mathrm du = 3x^2\mathrm dx$ is (almost) there.`, { options: ['substitution $u = x^3$', 'parts with $u = x^2$', 'partial fractions', 'a trig identity'] }),
      P('concept', 'mcq', 'Choosing u', R`For $\int x\ln x\,\mathrm dx$ by parts, choose $u = $`, 1, [R`Pick the factor that simplifies when differentiated and is hard to integrate.`], R`$u = \ln x$ (its derivative $1/x$ is simpler), $\mathrm dv = x\,\mathrm dx$.`, { options: ['$x$', '$\\ln x$', '$x\\ln x$', '$1$'] }),
      P('concept', 'mcq', 'Partial fractions form', R`$\dfrac{5x + 1}{(x - 1)(x + 2)}$ splits as…`, 2, [R`One constant over each linear factor.`], R`$\dfrac A{x - 1} + \dfrac B{x + 2}$ with $A = 2$, $B = 3$.`, { options: ['$\\dfrac{A}{x^2 + x - 2}$', '$\\dfrac{Ax + B}{x - 1}$', '$\\dfrac A{x - 1} + \\dfrac B{x + 2}$', '$A\\ln(x - 1)$'] }),
      P('concept', 'mcq', 'Arctan', R`$\int\dfrac{\mathrm dx}{9 + x^2} = $`, 3, [R`Write it as $\dfrac19\cdot\dfrac{1}{1 + (x/3)^2}$.`], R`$\tfrac13\arctan(x/3) + C$.`, { options: ['$\\arctan(x/3) + C$', '$\\tfrac19\\arctan x + C$', '$\\ln(9 + x^2) + C$', '$\\tfrac13\\arctan(x/3) + C$'] }),
      P('core', 'num', 'Substitution', R`Evaluate $\int_0^{\pi/2}\sin x\cos^3x\,\mathrm dx$.`, 0.25, [R`$u = \cos x$, $\mathrm du = -\sin x\,\mathrm dx$.`], R`$\int_0^1u^3\,\mathrm du = \tfrac14$.`),
      P('core', 'num', 'Parts with a log', R`Evaluate $\int_1^e\ln x\,\mathrm dx$.`, 1, [R`Antiderivative $x\ln x - x$.`], R`$(e - e) - (0 - 1) = 1$.`),
      P('core', 'num', 'Partial fractions', R`Evaluate $\int_2^3\dfrac{\mathrm dx}{x^2 - 1}$.`, 0.5 * Math.log(1.5), [R`$\tfrac12\ln\left|\dfrac{x - 1}{x + 1}\right|$.`], R`$\tfrac12\left[\ln\tfrac24 - \ln\tfrac13\right] = \tfrac12\ln\tfrac32 = ${f(0.5 * Math.log(1.5), 4)}$.`),
      P('core', 'num', 'Volume', R`Spin $y = \sqrt x$ for $0 \le x \le 4$ about the $x$-axis. Find the volume.`, 8 * Math.PI, [R`$V = \pi\int_0^4x\,\mathrm dx$.`], R`$8\pi \approx ${f(8 * Math.PI, 4)}$.`),
      P('core', 'num', 'Parts twice', R`Evaluate $\int_0^1x^2e^x\,\mathrm dx$.`, Math.E - 2, [R`Antiderivative $(x^2 - 2x + 2)e^x$.`], R`$(1)e - 2 = e - 2 \approx 0.718$.`),
      P('olympiad', 'num', 'Gaussian-type', R`Evaluate $\int_0^\infty xe^{-x^2}\,\mathrm dx$.`, 0.5, [R`$u = x^2$.`], R`$\tfrac12\int_0^\infty e^{-u}\mathrm du = \tfrac12$.`),
      P('olympiad', 'num', 'Wallis', R`Evaluate $\int_0^{\pi/2}\sin^4x\,\mathrm dx$.`, 3 * Math.PI / 16, [R`$\sin^4 = \left(\tfrac{1 - \cos2x}2\right)^2$, then reduce $\cos^22x$ again.`, R`Or use $I_n = \tfrac{n - 1}{n}I_{n-2}$.`], R`$\tfrac34\cdot\tfrac12\cdot\tfrac\pi2 = \tfrac{3\pi}{16} \approx ${f(3 * Math.PI / 16, 4)}$.`),
      P('olympiad', 'num', 'Arc length of a parabola', R`Find the length of $y = x^{3/2}$ from $x = 0$ to $x = 4$.`, (Math.pow(10, 1.5) - 1) * 8 / 27, [R`$f'(x) = \tfrac32x^{1/2}$, so $1 + f'^2 = 1 + \tfrac94x$.`], R`$\int_0^4\sqrt{1 + \tfrac94x}\,\mathrm dx = \tfrac8{27}\left[(1 + \tfrac94x)^{3/2}\right]_0^4 = \tfrac8{27}(10^{3/2} - 1) = ${f((Math.pow(10, 1.5) - 1) * 8 / 27, 4)}$.`)
    ]
  });
  PB.addDrills('math-techniques', [
    { title: 'Substitution', gen: (r) => { const n = r.int(1, 4), b = r.int(1, 2); const val = (Math.pow(b * b + 1, n + 1) - 1) / (n + 1); return { q: R`<p>Evaluate $\int_0^{${b}}2x(x^2 + 1)^${n}\,\mathrm dx$.</p>`, answer: val, tol: 0.002, solution: R`<p>$u = x^2 + 1$: $\left[\dfrac{u^{${n + 1}}}{${n + 1}}\right]_1^{${b * b + 1}} = ${f(val, 5)}$.</p>` }; } },
    { title: 'Disc volume', gen: (r) => { const a = r.int(1, 4), h = r.int(1, 5); const val = Math.PI * a * a * h; return { q: R`<p>Spin $y = ${a}$ for $0 \le x \le ${h}$ about the $x$-axis. Find the volume.</p>`, answer: val, tol: 0.003, solution: R`<p>A cylinder: $\pi(${a})^2(${h}) = ${f(val, 4)}$.</p>` }; } },
    { title: 'By parts', gen: (r) => { const k = r.int(1, 3); const val = (Math.exp(k) * (k - 1) + 1) / (k * k); return { q: R`<p>Evaluate $\int_0^1 xe^{${k}x}\,\mathrm dx$.</p>`, answer: val, tol: 0.003, solution: R`<p>$\left[\dfrac{x e^{${k}x}}{${k}} - \dfrac{e^{${k}x}}{${k * k}}\right]_0^1 = ${f(val, 5)}$.</p>` }; } }
  ]);
})();
