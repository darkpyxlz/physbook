/* Mathematics: sequences and the binomial theorem, vector calculus, vectors and matrices, probability and statistics. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.005 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.005 } : {}, o || {});
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
  const arrow = (ctx, x0, y0, x1, y1, col, w) => { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w || 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const a = Math.atan2(y1 - y0, x1 - x0), L = Math.min(10, Math.hypot(x1 - x0, y1 - y0) * 0.4); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - L * Math.cos(a - 0.4), y1 - L * Math.sin(a - 0.4)); ctx.lineTo(x1 - L * Math.cos(a + 0.4), y1 - L * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill(); };
  const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));

  /* ===================== 2. Sequences and the binomial theorem ===================== */
  PB.addChapter({
    id: 'math-sequences', subject: 'maths', num: 2, part: 'Precalculus',
    title: 'Sequences, Sums and the Binomial Theorem',
    subtitle: R`Patterns of numbers. Arithmetic and geometric sequences, sigma notation and standard sums, recurrence relations, and expanding $(a + b)^n$.`,
    big: 'A sequence is a list with a rule. Add the same amount each time and you get an arithmetic sequence; multiply by the same amount and you get a geometric one. Spotting the rule lets you jump straight to the 100th term or the sum of the first million, without writing them all out.',
    goals: ['Find terms and sums of arithmetic sequences', 'Find terms and sums of geometric sequences', 'Use sigma notation and the standard sums', 'Work with simple recurrences', 'Expand (a + b)ⁿ with the binomial theorem'],
    sections: [
      { title: 'Arithmetic sequences', html: R`
<p>In an <strong>arithmetic sequence</strong> each term is the previous one plus a fixed <strong>common difference</strong> $d$: $3, 7, 11, 15, \dots$ has $d = 4$. The $n$th term is</p>
$$a_n = a_1 + (n - 1)d.$$
<p>To add the first $n$ terms, pair the first with the last, the second with the second-last, and so on. Every pair has the same sum $a_1 + a_n$, and there are $n/2$ pairs:</p>
<div class="key"><p>$$S_n = \frac n2(a_1 + a_n) = \frac n2\big(2a_1 + (n - 1)d\big).$$</p></div>
<p>So $1 + 2 + \dots + 100 = 50\times101 = 5050$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the 20th term of $5, 8, 11, 14, \dots$`, 62, [R`$d = 3$, so $a_{20} = 5 + 19\times3$.`], R`$5 + 57 = 62$.`, { tol: 0.001 })] },
      { title: 'Geometric sequences', html: R`
<p>In a <strong>geometric sequence</strong> each term is the previous one times a fixed <strong>ratio</strong> $r$: $3, 6, 12, 24, \dots$ has $r = 2$. Then $a_n = a_1r^{n-1}$, and</p>
<div class="key"><p>$$S_n = a_1\frac{1 - r^n}{1 - r}\quad(r \ne 1),\qquad S_\infty = \frac{a_1}{1 - r}\ \text{if } |r| < 1.$$</p></div>
<p>(Multiply $S_n$ by $r$ and subtract: almost everything cancels.) Geometric growth is everywhere: compound interest, population growth, radioactive decay, the chessboard legend where the grains double on each square ($2^{64} - 1$ grains in all).</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $1 + 2 + 4 + \dots + 2^{9}$.`, 1023, [R`$a_1 = 1$, $r = 2$, $n = 10$ terms.`], R`$\dfrac{2^{10} - 1}{2 - 1} = 1023$.`, { tol: 0.001 })] },
      { title: 'Sigma notation and recurrences', html: R`
<p>$\displaystyle\sum_{k=1}^{n}a_k$ means $a_1 + a_2 + \dots + a_n$. Sums split and scale: $\sum(2k + 3) = 2\sum k + 3n$. The standard results (all provable by induction):</p>
$$\sum_{k=1}^{n}k = \frac{n(n + 1)}2,\qquad \sum_{k=1}^{n}k^2 = \frac{n(n + 1)(2n + 1)}6,\qquad \sum_{k=1}^nk^3 = \left(\frac{n(n + 1)}2\right)^2.$$
<p>A <strong>recurrence</strong> defines each term from earlier ones, like the Fibonacci numbers $F_{n+1} = F_n + F_{n-1}$ with $F_1 = F_2 = 1$: $1, 1, 2, 3, 5, 8, 13, \dots$ The ratio of neighbours tends to the golden ratio $\varphi = \frac{1 + \sqrt5}2 \approx 1.618$. Recurrences such as $u_{n+1} = ru_n + c$ settle towards a fixed point $L = rL + c$ when $|r| < 1$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\displaystyle\sum_{k=1}^{10}(2k + 1)$.`, 120, [R`$2\sum k + \sum1 = 2(55) + 10$.`], R`$110 + 10 = 120$.`, { tol: 0.001 })] },
      { title: 'The binomial theorem', html: R`
<p>Expanding $(a + b)^n$ means choosing $a$ or $b$ from each of the $n$ brackets. The terms with $a^{n-k}b^k$ come from choosing $b$ in $k$ of the brackets, which can be done in $\binom nk$ ways:</p>
<div class="key"><p>$$(a + b)^n = \sum_{k=0}^{n}\binom nk a^{n-k}b^k,\qquad \binom nk = \frac{n!}{k!\,(n - k)!}.$$</p></div>
<p>The coefficients are the rows of Pascal's triangle: $(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$. For example, the coefficient of $x^3$ in $(2 + x)^5$ is $\binom53 2^2 = 40$.</p>
<p>For small $x$, $(1 + x)^n \approx 1 + nx + \frac{n(n - 1)}2x^2$, and this works for any real $n$ when $|x| < 1$ (Newton's generalised binomial series).</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the coefficient of $x^2$ in $(1 + 3x)^6$.`, C(6, 2) * 9, [R`$\binom62(3x)^2$.`], R`$15\times9 = 135$.`, { tol: 0.001 })] }
    ],
    figures: [
      { s: 1, title: 'Arithmetic versus geometric growth', caption: 'Drag the dots to set the first term and the step. A geometric sequence with r > 1 always overtakes any arithmetic one in the end.', params: { controls: [S('a', 'First term a₁', 1, 10, 0.1, 2), S('d', 'Common difference d', 0, 10, 0.1, 4), S('r', 'Common ratio r', 0.5, 1.6, 0.01, 1.25)],
        drag: [{ plot: 0, get: (v) => [1, v.a], set: (v, x, y) => { v.a = Math.max(1, Math.min(10, +y.toFixed(1))); }, label: 'a₁' }, { plot: 0, get: (v) => [2, v.a * v.r], set: (v, x, y) => { v.r = Math.max(0.5, Math.min(1.6, +(y / v.a).toFixed(2))); }, color: 'rust', label: 'r' }],
        plots: [{ x: [1, 20], y: [0, 120], xlabel: 'n', ylabel: 'aₙ', n: 19, curves: (v) => [{ f: (n) => v.a + (Math.round(n) - 1) * v.d, label: 'arithmetic' }, { f: (n) => v.a * Math.pow(v.r, Math.round(n) - 1), color: 'rust', label: 'geometric' }] }],
        readout: (v) => { let sa = 0, sg = 0; for (let n = 1; n <= 20; n++) { sa += v.a + (n - 1) * v.d; sg += v.a * Math.pow(v.r, n - 1); } return [['sum of 20 (arith.)', f(sa)], ['sum of 20 (geom.)', f(sg)], ['geometric limit', v.r < 1 ? f(v.a / (1 - v.r)) : '∞']]; } } },
      { s: 3, title: 'Binomial coefficients', caption: 'The coefficients of (1 + x)ⁿ: a row of Pascal’s triangle. They grow towards the middle and become bell-shaped for large n.', params: { controls: [S('n', 'n', 1, 30, 1, 8)],
        plots: [{ x: (v) => [-0.5, v.n + 0.5], y: 'auto', xlabel: 'k', ylabel: 'C(n, k)', n: 400, curves: (v) => [{ f: (x) => { const k = Math.round(x); return Math.abs(x - k) < 0.35 ? C(v.n, k) : 0; } }] }],
        readout: (v) => [['row sum 2ⁿ', String(Math.pow(2, v.n))], ['largest coefficient', String(C(v.n, Math.floor(v.n / 2)))]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Cobweb diagram for a recurrence', desc: 'For u_{n+1} = g(u_n), bounce between the curve y = g(x) and the line y = x. The iterates spiral or staircase into a fixed point, or run away.',
        tasks: ['With g(x) = rx + c, find the fixed point and check it is c/(1 − r).', 'Make |r| > 1. What happens?', 'Switch to the logistic map and raise λ past 3. What changes?'],
        params: { aspect: 0.5, controls: [{ type: 'select', id: 'g', label: 'g(x)', value: 'lin', options: [['lin', 'rx + c'], ['log', 'logistic λx(1 − x)'], ['cos', 'cos x']] }, S('r', 'r or λ', -1.5, 4, 0.01, 0.6), S('c', 'c', -1, 1, 0.01, 0.3), S('u0', 'Start u₀', 0, 1, 0.01, 0.1)],
          drag: [{ plot: 0, get: (v) => [v.u0, 0], set: (v, x) => { v.u0 = Math.max(0, Math.min(1, +x.toFixed(2))); }, label: 'u₀' }],
          plots: [{ x: [-0.2, 1.2], y: [-0.2, 1.2], zero: false, xlabel: 'uₙ', ylabel: 'uₙ₊₁', n: 300, curves: (v) => { const g = (x) => (v.g === 'lin' ? v.r * x + v.c : v.g === 'log' ? v.r * x * (1 - x) : Math.cos(x)); const out = [{ f: g, label: 'g(x)' }, { f: (x) => x, color: 'ink3', dash: [4, 4], label: 'y = x' }]; let x = v.u0; const pts = [[x, 0]]; for (let i = 0; i < 40; i++) { const y = g(x); pts.push([x, y]); pts.push([y, y]); x = y; if (!isFinite(x) || Math.abs(x) > 5) break; } for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; if (Math.abs(b[0] - a[0]) > 1e-9) out.push({ f: () => a[1], color: 'rust', from: Math.min(a[0], b[0]), to: Math.max(a[0], b[0]), width: 1.4 }); } return out; },
            pts: (v) => { const g = (x) => (v.g === 'lin' ? v.r * x + v.c : v.g === 'log' ? v.r * x * (1 - x) : Math.cos(x)); const p = []; let x = v.u0, y0 = 0; for (let i = 0; i < 40; i++) { const y = g(x); if (!isFinite(y) || Math.abs(y) > 5) break; for (let k = 0; k <= 14; k++) p.push({ x: x, y: y0 + (y - y0) * k / 14, r: 1, ring: false, color: 'rust' }); p.push({ x: x, y: y, r: 2.8, ring: false, color: 'rust' }); y0 = y; x = y; } return p; } }],
          readout: (v) => { const g = (x) => (v.g === 'lin' ? v.r * x + v.c : v.g === 'log' ? v.r * x * (1 - x) : Math.cos(x)); let x = v.u0; const s = []; for (let i = 0; i < 60; i++) { x = g(x); if (i >= 54) s.push(f(x, 4)); if (!isFinite(x) || Math.abs(x) > 1e6) break; } return [['u₅₅…u₆₀', s.join(', ')], ['linear fixed point c/(1 − r)', v.g === 'lin' && v.r !== 1 ? f(v.c / (1 - v.r), 4) : '—']]; } } },
      { sim: 'explore', title: 'Compound interest and e', desc: 'Invest 1 at an annual rate of 100%, compounded n times a year: (1 + 1/n)ⁿ. As n grows the result approaches e = 2.71828…',
        tasks: ['What do you get with yearly, monthly and daily compounding?', 'Change the rate to x: the limit is eˣ.'],
        params: { aspect: 0.45, controls: [S('x', 'Annual rate x', 0.1, 2, 0.05, 1), S('n', 'Compounding periods n', 1, 365, 1, 12)],
          plots: [{ x: [1, 365], y: 'auto', zero: false, xlabel: 'n', ylabel: 'value after a year', curves: (v) => [{ f: (n) => Math.pow(1 + v.x / n, n) }, { f: () => Math.exp(v.x), color: 'ink3', dash: [4, 4], label: 'eˣ' }], pts: (v) => [{ x: v.n, y: Math.pow(1 + v.x / v.n, v.n) }] }],
          readout: (v) => [['(1 + x/n)ⁿ', f(Math.pow(1 + v.x / v.n, v.n), 6)], ['eˣ', f(Math.exp(v.x), 6)]] } }
    ],
    formulas: [['Arithmetic', 'a_n = a_1 + (n - 1)d,\\ S_n = \\tfrac n2(a_1 + a_n)'], ['Geometric', 'a_n = a_1r^{n-1},\\ S_n = a_1\\dfrac{1 - r^n}{1 - r}'], ['Infinite geometric', 'S_\\infty = \\dfrac{a_1}{1 - r},\\ |r| < 1'], ['Standard sums', '\\sum k = \\tfrac{n(n+1)}2,\\ \\sum k^2 = \\tfrac{n(n+1)(2n+1)}6'], ['Binomial theorem', '(a + b)^n = \\sum\\binom nk a^{n-k}b^k'], ['Golden ratio', 'F_{n+1}/F_n \\to \\varphi = \\tfrac{1 + \\sqrt5}2']],
    problems: [
      P('concept', 'mcq', 'Which kind?', R`Is $2, 6, 18, 54, \dots$ arithmetic, geometric or neither?`, 1, [R`Look at differences and ratios.`], R`Geometric with ratio 3.`, { options: ['arithmetic', 'geometric', 'neither', 'both'] }),
      P('concept', 'mcq', 'Converging series', R`For which ratio does an infinite geometric series converge?`, 2, [R`Terms must shrink.`], R`$|r| < 1$, e.g. $r = -0.5$.`, { options: ['$r = 1$', '$r = -1.2$', '$r = -0.5$', '$r = 2$'] }),
      P('concept', 'mcq', 'Pascal row', R`Row 5 of Pascal's triangle (the coefficients of $(a + b)^5$) is…`, 0, [R`Each entry is the sum of the two above.`], R`1, 5, 10, 10, 5, 1.`, { options: ['1, 5, 10, 10, 5, 1', '1, 4, 6, 4, 1', '1, 5, 10, 5, 1', '1, 6, 15, 20, 15, 6, 1'] }),
      P('concept', 'mcq', 'Fixed point', R`The recurrence $u_{n+1} = \tfrac12u_n + 4$ settles towards…`, 3, [R`Solve $L = \tfrac12L + 4$.`], R`$L = 8$.`, { options: ['4', '2', '0', '8'] }),
      P('core', 'num', 'Arithmetic sum', R`Find the sum of the odd numbers from 1 to 99.`, 2500, [R`50 terms, first 1, last 99.`], R`$\tfrac{50}2(1 + 99) = 2500 = 50^2$.`, { tol: 0.001 }),
      P('core', 'num', 'Seats in a theatre', R`A theatre has 30 rows; the first has 20 seats and each row has 2 more than the one in front. How many seats in total?`, 30 / 2 * (2 * 20 + 29 * 2), [R`Arithmetic with $a_1 = 20$, $d = 2$, $n = 30$.`], R`$15(40 + 58) = 1470$.`, { tol: 0.001 }),
      P('core', 'num', 'Savings', R`You save 100 in month 1 and 5% more each month after. How much have you saved in total after 24 months?`, 100 * (Math.pow(1.05, 24) - 1) / 0.05, [R`Geometric: $a_1 = 100$, $r = 1.05$, $n = 24$.`], R`$100\cdot\dfrac{1.05^{24} - 1}{0.05} = ${f(100 * (Math.pow(1.05, 24) - 1) / 0.05, 5)}$.`),
      P('core', 'num', 'Binomial coefficient', R`Find the coefficient of $x^3$ in $(2 + x)^5$.`, 40, [R`$\binom53 2^2x^3$.`], R`$10\times4 = 40$.`, { tol: 0.001 }),
      P('core', 'num', 'Sum of squares', R`Find $\displaystyle\sum_{k=1}^{20}k^2$.`, 20 * 21 * 41 / 6, [R`$n(n + 1)(2n + 1)/6$.`], R`$20\cdot21\cdot41/6 = 2870$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Constant term', R`Find the constant term in the expansion of $\left(x^2 + \dfrac1x\right)^{9}$.`, C(9, 6), [R`The general term is $\binom9k(x^2)^{9-k}x^{-k} = \binom9kx^{18 - 3k}$.`], R`$18 - 3k = 0$ gives $k = 6$: $\binom96 = 84$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Fibonacci sum', R`Find $F_1 + F_2 + \dots + F_{20}$, where $F_1 = F_2 = 1$ are the Fibonacci numbers.`, (() => { const F = [0, 1, 1]; for (let i = 3; i <= 22; i++) F.push(F[i - 1] + F[i - 2]); return F[22] - 1; })(), [R`Telescoping: $F_k = F_{k+2} - F_{k+1}$.`], R`The sum is $F_{22} - 1 = 17711 - 1 = 17710$.`, { tol: 0.0001 }),
      P('olympiad', 'num', 'Approximate root', R`Use $(1 + x)^{1/2} \approx 1 + \tfrac12x - \tfrac18x^2$ to estimate $\sqrt{1.1}$ (5 decimal places).`, 1 + 0.05 - 0.00125, [R`$x = 0.1$.`], R`$1 + 0.05 - 0.00125 = 1.04875$ (true $1.048809$).`, { tol: 0.0002 })
    ]
  });
  PB.addDrills('math-sequences', [
    { title: 'nth term', gen: (r) => { const a = r.int(-10, 20), d = r.int(-5, 9) || 3, n = r.int(10, 60); return { q: R`<p>Arithmetic sequence with $a_1 = ${a}$, $d = ${d}$. Find $a_{${n}}$.</p>`, answer: a + (n - 1) * d, tol: 0.0001, atol: 1e-9, solution: R`<p>$${a} + ${n - 1}\times${d} = ${a + (n - 1) * d}$.</p>` }; } },
    { title: 'Geometric sum', gen: (r) => { const a = r.int(1, 9), q = r.int(2, 4), n = r.int(3, 9); const s = a * (Math.pow(q, n) - 1) / (q - 1); return { q: R`<p>Sum the first ${n} terms of $${a}, ${a * q}, ${a * q * q}, \dots$</p>`, answer: s, tol: 0.0001, solution: R`<p>$${a}\cdot\dfrac{${q}^{${n}} - 1}{${q - 1}} = ${s}$.</p>` }; } },
    { title: 'Binomial coefficient', gen: (r) => { const n = r.int(4, 9), k = r.int(1, n - 1), a = r.int(1, 3); const val = C(n, k) * Math.pow(a, k); return { q: R`<p>Coefficient of $x^${k}$ in $(1 + ${a}x)^${n}$?</p>`, answer: val, tol: 0.0001, solution: R`<p>$\binom{${n}}{${k}}${a}^${k} = ${val}$.</p>` }; } }
  ]);

  /* ===================== 11. Vector calculus ===================== */
  const FIELDS = { rot: [(x, y) => [-y, x], 'rotation (−y, x)'], src: [(x, y) => [x, y], 'source (x, y)'], shear: [(x, y) => [y, 0], 'shear (y, 0)'], sad: [(x, y) => [x, -y], 'saddle (x, −y)'] };
  const divF = { rot: () => 0, src: () => 2, shear: () => 0, sad: () => 0 }, curlF = { rot: () => 2, src: () => 0, shear: () => -1, sad: () => 0 };
  PB.addChapter({
    id: 'math-vectorcalc', subject: 'maths', num: 11, part: 'Further Calculus',
    title: 'Vector Calculus',
    subtitle: R`Calculus for fields. Parametric curves, vector fields, line integrals and work, divergence and curl, and the theorems of Green, Gauss and Stokes.`,
    big: 'A vector field puts an arrow at every point, like wind on a weather map. Divergence asks "is stuff flowing out of here?", curl asks "is it swirling here?", and the big theorems say that adding up what happens inside a region tells you what crosses its boundary.',
    goals: ['Differentiate parametric curves and find arc length', 'Sketch and interpret vector fields', 'Compute line integrals and recognise conservative fields', 'Compute divergence and curl', 'Use Green’s, the divergence and Stokes’ theorems'],
    sections: [
      { title: 'Parametric curves', html: R`
<p>A curve can be traced by a moving point $\vec r(t) = (x(t), y(t))$. The unit circle is $(\cos t, \sin t)$; a projectile is $(v_xt, v_yt - \tfrac12gt^2)$. The velocity is $\vec r\,'(t) = (x', y')$, tangent to the curve, and the speed is its length. Arc length adds up the speed:</p>
$$L = \int_a^b|\vec r\,'(t)|\,\mathrm dt = \int_a^b\sqrt{x'^2 + y'^2}\,\mathrm dt.$$
<p>For the circle, $|\vec r\,'| = 1$, so going round once ($0 \le t \le 2\pi$) has length $2\pi$, as it should.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A particle moves on $\vec r(t) = (3t, 4t)$. What is its speed?`, 5, [R`$|\vec r\,'| = \sqrt{3^2 + 4^2}$.`], R`5.`, { tol: 0.001 })] },
      { title: 'Vector fields and line integrals', html: R`
<p>A <strong>vector field</strong> $\vec F(x, y)$ assigns a vector to each point: a force field, the velocity of a fluid, an electric field. The <strong>work</strong> done by $\vec F$ on a particle moving along a curve $C$ is the <strong>line integral</strong></p>
$$W = \int_C\vec F\cdot\mathrm d\vec r = \int_a^b\vec F(\vec r(t))\cdot\vec r\,'(t)\,\mathrm dt.$$
<p>A field is <strong>conservative</strong> if it is a gradient, $\vec F = \nabla\varphi$. Then the work depends only on the endpoints: $\int_C\nabla\varphi\cdot\mathrm d\vec r = \varphi(B) - \varphi(A)$, and round any closed loop it is zero. Gravity and electrostatic forces are conservative, which is why they have potential energies.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`$\vec F = \nabla\varphi$ with $\varphi = x^2y$. Find the work done moving from $(0, 0)$ to $(2, 3)$ along any path.`, 12, [R`Only the endpoints matter.`], R`$\varphi(2, 3) - \varphi(0, 0) = 12$.`, { tol: 0.001 })] },
      { title: 'Divergence and curl', html: R`
<p>For $\vec F = (P, Q)$ in the plane:</p>
<div class="key"><p><strong>Divergence</strong> $\nabla\cdot\vec F = P_x + Q_y$: the net outflow per unit area. Positive at a source, negative at a sink.<br><strong>Curl</strong> (its $z$-component) $Q_x - P_y$: twice the local rate of rotation. Put a tiny paddle wheel in the flow; the curl says how fast it spins.</p></div>
<p>Examples: $(x, y)$ has divergence 2 and curl 0 (it spreads out without swirling); $(-y, x)$ has divergence 0 and curl 2 (pure rotation). In three dimensions the curl is a vector, $\nabla\times\vec F$, and Maxwell's equations are written in these terms: $\nabla\cdot\vec E = \rho/\varepsilon_0$ says charges are sources of electric field.</p>
<p>A smooth field with zero curl on a simply connected region is conservative.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the divergence of $\vec F = (x^2, 3y)$ at $(1, 5)$.`, 5, [R`$\partial_x(x^2) + \partial_y(3y)$.`], R`$2x + 3 = 5$.`, { tol: 0.001 })] },
      { title: 'Green, Gauss and Stokes', html: R`
<p>All three big theorems say the same thing: <em>adding up a derivative over a region equals adding up the field over its boundary</em>, just like the fundamental theorem of calculus.</p>
<div class="key"><p><strong>Green:</strong> $\displaystyle\oint_C P\,\mathrm dx + Q\,\mathrm dy = \iint_D(Q_x - P_y)\,\mathrm dA$.<br><strong>Divergence (Gauss):</strong> $\displaystyle\oiint_{\partial V}\vec F\cdot\mathrm d\vec A = \iiint_V\nabla\cdot\vec F\,\mathrm dV$.<br><strong>Stokes:</strong> $\displaystyle\oint_{\partial S}\vec F\cdot\mathrm d\vec r = \iint_S(\nabla\times\vec F)\cdot\mathrm d\vec A$.</p></div>
<p>Green's theorem gives a neat way to find areas: with $\vec F = \tfrac12(-y, x)$ (curl 1), the area of a region is $\tfrac12\oint(x\,\mathrm dy - y\,\mathrm dx)$. That is how a planimeter, and the shoelace formula for polygons, work.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Use Green's theorem: the circulation of $\vec F = (-y, x)$ around the unit circle equals $\iint 2\,\mathrm dA$ over the disc. Find it.`, 2 * Math.PI, [R`The curl is 2; the disc has area $\pi$.`], R`$2\pi \approx 6.283$.`)] }
    ],
    figures: [
      { s: 1, title: 'A vector field and a path', caption: 'Arrows show the field. Drag the two end points: for the conservative fields (source, saddle) the work along the straight path depends only on the ends.', params: { aspect: 0.55, controls: [{ type: 'select', id: 'fn', label: 'Field', value: 'rot', options: Object.keys(FIELDS).map((k) => [k, FIELDS[k][1]]) }, S('ax', 'Start x', -2, 2, 0.05, -1.5), S('ay', 'Start y', -2, 2, 0.05, -1), S('bx', 'End x', -2, 2, 0.05, 1.5), S('by', 'End y', -2, 2, 0.05, 1)],
        drag: [{ plot: 0, get: (v) => [v.ax, v.ay], set: (v, x, y) => { v.ax = +x.toFixed(2); v.ay = +y.toFixed(2); }, label: 'A' }, { plot: 0, get: (v) => [v.bx, v.by], set: (v, x, y) => { v.bx = +x.toFixed(2); v.by = +y.toFixed(2); }, color: 'rust', label: 'B' }],
        plots: [{ x: [-2.2, 2.2], y: [-2.2, 2.2], zero: false, xlabel: 'x', ylabel: 'y', n: 2, curves: (v) => { const out = []; const F = FIELDS[v.fn][0]; for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { const x = i * 0.5, y = j * 0.5, q = F(x, y), L = Math.hypot(q[0], q[1]) || 1, s = 0.2; const x2 = x + s * q[0] / L; if (Math.abs(q[0]) > 1e-9) out.push({ f: (t) => y + (t - x) * q[1] / q[0], from: Math.min(x, x2), to: Math.max(x, x2), color: 'ink3', width: 1.3 }); else out.push({ f: (t) => (Math.abs(t - x) < 0.01 ? y + 0.1 * Math.sign(q[1]) : NaN), from: x - 0.01, to: x + 0.01, color: 'ink3' }); } const m = (v.by - v.ay) / ((v.bx - v.ax) || 1e-9); out.push({ f: (t) => v.ay + (t - v.ax) * m, from: Math.min(v.ax, v.bx), to: Math.max(v.ax, v.bx), color: 'accent', width: 3 }); return out; },
          pts: (v) => { const F = FIELDS[v.fn][0], p = []; for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { const x = i * 0.5, y = j * 0.5, q = F(x, y), L = Math.hypot(q[0], q[1]); if (L > 1e-9) p.push({ x: x + 0.2 * q[0] / L, y: y + 0.2 * q[1] / L, r: 2, ring: false, color: 'ink3' }); } return p; } }],
        readout: (v) => { const F = FIELDS[v.fn][0]; let W = 0; const N = 400; for (let k = 0; k < N; k++) { const t = (k + 0.5) / N, x = v.ax + t * (v.bx - v.ax), y = v.ay + t * (v.by - v.ay), q = F(x, y); W += (q[0] * (v.bx - v.ax) + q[1] * (v.by - v.ay)) / N; } return [['work along AB', f(Math.abs(W) < 1e-9 ? 0 : W, 4)], ['divergence', String(divF[v.fn]())], ['curl', String(curlF[v.fn]())]]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Paddle wheel in a flow', desc: 'Particles drift in the field; the readout gives divergence and curl at the probe point, which you can drag.',
        tasks: ['Find a field with curl but no divergence.', 'In the shear field (y, 0), why does a paddle wheel spin even though every particle moves in a straight line?'],
        params: { aspect: 0.5, animate: true, controls: [{ type: 'select', id: 'fn', label: 'Field', value: 'shear', options: Object.keys(FIELDS).map((k) => [k, FIELDS[k][1]]) }, S('px', 'Probe x', -1.8, 1.8, 0.05, 0.5), S('py', 'Probe y', -1.8, 1.8, 0.05, 0.5)],
          init: (v) => { v.parts = []; for (let i = 0; i < 120; i++) v.parts.push([Math.random() * 4 - 2, Math.random() * 4 - 2]); v.ang = 0; },
          step: (v, dt) => { const F = FIELDS[v.fn][0]; v.parts.forEach((p) => { const q = F(p[0], p[1]); p[0] += q[0] * dt * 0.4; p[1] += q[1] * dt * 0.4; if (Math.abs(p[0]) > 2.2 || Math.abs(p[1]) > 2.2 || Math.hypot(p[0], p[1]) < 0.02) { p[0] = Math.random() * 4 - 2; p[1] = Math.random() * 4 - 2; } }); v.ang += curlF[v.fn]() * 0.5 * dt * 0.4; },
          drag: [{ plot: 0, get: (v) => [v.px, v.py], set: (v, x, y) => { v.px = +x.toFixed(2); v.py = +y.toFixed(2); }, label: 'probe' }],
          plots: [{ x: [-2.2, 2.2], y: [-2.2, 2.2], zero: false, xlabel: 'x', ylabel: 'y', n: 2, curves: (v) => { const out = []; for (let k = 0; k < 4; k++) { const a = v.ang + k * Math.PI / 2; out.push({ f: (t) => v.py + (t - v.px) * Math.tan(a), from: v.px - 0.25 * Math.abs(Math.cos(a)), to: v.px + 0.25 * Math.abs(Math.cos(a)), color: 'rust', width: 3 }); } return out; }, pts: (v) => v.parts.map((p) => ({ x: p[0], y: p[1], r: 2.2, ring: false, color: 'accent' })) }],
          readout: (v) => [['divergence', String(divF[v.fn]())], ['curl (spin rate × 2)', String(curlF[v.fn]())]] } },
      { sim: 'explore', title: 'Shoelace area from Green’s theorem', desc: 'Drag the four corners of a quadrilateral. Its area is ½∮(x dy − y dx), which for a polygon is the shoelace formula.',
        tasks: ['Check the area of a 2 × 1 rectangle.', 'Cross two sides so the polygon twists. What does the formula give, and why?'],
        params: { aspect: 0.5, controls: [S('x1', 'x₁', -2, 2, 0.1, -1.5), S('y1', 'y₁', -2, 2, 0.1, -1), S('x2', 'x₂', -2, 2, 0.1, 1.5), S('y2', 'y₂', -2, 2, 0.1, -1), S('x3', 'x₃', -2, 2, 0.1, 1), S('y3', 'y₃', -2, 2, 0.1, 1.2), S('x4', 'x₄', -2, 2, 0.1, -1.2), S('y4', 'y₄', -2, 2, 0.1, 0.8)],
          drag: [1, 2, 3, 4].map((i) => ({ plot: 0, get: (v) => [v['x' + i], v['y' + i]], set: (v, x, y) => { v['x' + i] = +x.toFixed(1); v['y' + i] = +y.toFixed(1); }, label: String(i) })),
          plots: [{ x: [-2.2, 2.2], y: [-2.2, 2.2], zero: false, xlabel: 'x', ylabel: 'y', n: 200, curves: (v) => { const P = [1, 2, 3, 4, 1].map((i) => [v['x' + i], v['y' + i]]); const out = []; for (let k = 0; k < 4; k++) { const a = P[k], b = P[k + 1]; if (Math.abs(b[0] - a[0]) < 1e-6) out.push({ f: (t) => NaN }); else out.push({ f: (t) => a[1] + (t - a[0]) * (b[1] - a[1]) / (b[0] - a[0]), from: Math.min(a[0], b[0]), to: Math.max(a[0], b[0]), width: 2.5 }); } return out; } }],
          readout: (v) => { const P = [1, 2, 3, 4].map((i) => [v['x' + i], v['y' + i]]); let s = 0; for (let k = 0; k < 4; k++) { const a = P[k], b = P[(k + 1) % 4]; s += a[0] * b[1] - b[0] * a[1]; } return [['½Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)', f(s / 2, 4)], ['orientation', s > 0 ? 'anticlockwise' : s < 0 ? 'clockwise' : '—']]; } } }
    ],
    formulas: [['Arc length', 'L = \\int|\\vec r\\,\'(t)|\\,\\mathrm dt'], ['Line integral', '\\int_C\\vec F\\cdot\\mathrm d\\vec r = \\int\\vec F(\\vec r(t))\\cdot\\vec r\\,\'(t)\\,\\mathrm dt'], ['Conservative', '\\int_C\\nabla\\varphi\\cdot\\mathrm d\\vec r = \\varphi(B) - \\varphi(A)'], ['Divergence and curl', '\\nabla\\cdot\\vec F = P_x + Q_y,\\ (\\nabla\\times\\vec F)_z = Q_x - P_y'], ['Green', '\\oint P\\,\\mathrm dx + Q\\,\\mathrm dy = \\iint(Q_x - P_y)\\,\\mathrm dA'], ['Divergence theorem', '\\oiint\\vec F\\cdot\\mathrm d\\vec A = \\iiint\\nabla\\cdot\\vec F\\,\\mathrm dV']],
    problems: [
      P('concept', 'mcq', 'Velocity direction', R`The velocity vector $\vec r\,'(t)$ of a moving point is…`, 0, [R`Think of a car on a road.`], R`Tangent to its path.`, { options: ['tangent to the path', 'perpendicular to the path', 'towards the origin', 'always horizontal'] }),
      P('concept', 'mcq', 'Conservative loop', R`The work done by a conservative force around a closed loop is…`, 1, [R`$\varphi(B) - \varphi(A)$ with $B = A$.`], R`Zero.`, { options: ['positive', 'zero', 'negative', 'it depends on the loop'] }),
      P('concept', 'mcq', 'Source', R`At a source of a fluid flow, the divergence is…`, 0, [R`Fluid is flowing out.`], R`Positive.`, { options: ['positive', 'zero', 'negative', 'undefined'] }),
      P('concept', 'mcq', 'Curl test', R`Which field could be conservative?`, 2, [R`A conservative field has zero curl.`], R`$(2x, 2y)$, the gradient of $x^2 + y^2$.`, { options: ['$(-y, x)$', '$(y, 0)$', '$(2x, 2y)$', '$(y, -x)$'] }),
      P('core', 'num', 'Helix length', R`Find the length of one turn of the helix $\vec r(t) = (\cos t, \sin t, t)$, $0 \le t \le 2\pi$.`, 2 * Math.PI * Math.SQRT2, [R`$|\vec r\,'| = \sqrt{\sin^2 + \cos^2 + 1}$.`], R`$\sqrt2\cdot2\pi \approx ${f(2 * Math.PI * Math.SQRT2, 4)}$.`),
      P('core', 'num', 'Line integral', R`Find $\int_C\vec F\cdot\mathrm d\vec r$ for $\vec F = (y, x)$ along $\vec r(t) = (t, t^2)$, $0 \le t \le 1$.`, 1, [R`$\vec F\cdot\vec r\,' = t^2\cdot1 + t\cdot2t = 3t^2$.`], R`$\int_0^13t^2\,\mathrm dt = 1$. (Also $\vec F = \nabla(xy)$, so it is $1\cdot1 - 0 = 1$.)`),
      P('core', 'num', 'Divergence', R`Find $\nabla\cdot\vec F$ for $\vec F = (xy, yz, zx)$ at $(1, 2, 3)$.`, 2 + 3 + 1, [R`$\partial_x(xy) + \partial_y(yz) + \partial_z(zx) = y + z + x$.`], R`$2 + 3 + 1 = 6$.`),
      P('core', 'num', 'Curl', R`Find the curl (scalar, in 2D) of $\vec F = (x^2y, xy^2)$ at $(1, 2)$.`, 4 - 1, [R`$Q_x - P_y = y^2 - x^2$.`], R`$4 - 1 = 3$.`),
      P('core', 'num', 'Flux out of a sphere', R`Use the divergence theorem to find the flux of $\vec F = (x, y, z)$ out of a sphere of radius 2.`, 3 * 4 / 3 * Math.PI * 8, [R`$\nabla\cdot\vec F = 3$.`], R`$3\times\tfrac43\pi(2)^3 = 32\pi \approx ${f(32 * Math.PI, 4)}$.`),
      P('olympiad', 'num', 'Area by Green', R`Use $A = \tfrac12\oint(x\,\mathrm dy - y\,\mathrm dx)$ to find the area inside the ellipse $(3\cos t, 2\sin t)$.`, 6 * Math.PI, [R`$x\,y' - y\,x' = 3\cos t\cdot2\cos t + 2\sin t\cdot3\sin t = 6$.`], R`$\tfrac12\int_0^{2\pi}6\,\mathrm dt = 6\pi$, matching $\pi ab$.`),
      P('olympiad', 'num', 'Gauss’s law check', R`For $\vec E = \dfrac{\hat r}{r^2}$ (a point charge), find the flux through a sphere of radius 5 centred on the charge.`, 4 * Math.PI, [R`On the sphere $\vec E\cdot\hat n = 1/25$.`], R`$\dfrac1{25}\times4\pi\cdot25 = 4\pi$: independent of the radius, which is Gauss's law.`),
      P('olympiad', 'num', 'Work in a whirl', R`Find the work done by $\vec F = (-y, x)$ on a particle going once anticlockwise round the square with corners $(0,0), (2,0), (2,2), (0,2)$.`, 8, [R`Green: the curl is 2.`], R`$2\times\text{area} = 2\times4 = 8$.`)
    ]
  });
  PB.addDrills('math-vectorcalc', [
    { title: 'Divergence', gen: (r) => { const a = r.int(1, 5), b = r.int(1, 5), x = r.int(-3, 3), y = r.int(-3, 3); return { q: R`<p>Find $\nabla\cdot\vec F$ for $\vec F = (${a}x^2, ${b}xy)$ at $(${x}, ${y})$.</p>`, answer: 2 * a * x + b * x, tol: 0.001, atol: 1e-9, solution: R`<p>$${2 * a}x + ${b}x$ at $x = ${x}$: $${2 * a * x + b * x}$.</p>` }; } },
    { title: 'Speed on a curve', gen: (r) => { const a = r.int(1, 6), b = r.int(1, 6); return { q: R`<p>A particle moves on $(${a}\cos t, ${a}\sin t, ${b}t)$. What is its speed?</p>`, answer: Math.hypot(a, b), tol: 0.002, solution: R`<p>$\sqrt{${a}^2 + ${b}^2} = ${f(Math.hypot(a, b), 4)}$.</p>` }; } },
    { title: 'Conservative work', gen: (r) => { const x = r.int(-3, 4), y = r.int(-3, 4); return { q: R`<p>$\vec F = \nabla(x^2 + 3xy)$. Find the work done from $(0, 0)$ to $(${x}, ${y})$.</p>`, answer: x * x + 3 * x * y, tol: 0.001, atol: 1e-9, solution: R`<p>$\varphi(${x}, ${y}) = ${x * x + 3 * x * y}$.</p>` }; } }
  ]);

  /* ===================== 13. Vectors and matrices ===================== */
  PB.addChapter({
    id: 'math-linear', subject: 'maths', num: 13, part: 'Linear Algebra and Statistics',
    title: 'Vectors and Matrices',
    subtitle: R`Linear algebra. Vectors, dot and cross products, matrices as transformations, determinants as area scale factors, solving linear systems, and eigenvectors.`,
    big: 'A matrix is a machine that moves every point of the plane in a straight-line-preserving way: stretching, rotating, shearing or flipping. Its determinant says how much it scales areas, and its eigenvectors are the special directions it only stretches, never turns.',
    goals: ['Add vectors and use dot and cross products', 'Multiply matrices and see them as transformations', 'Compute determinants and inverses', 'Solve linear systems', 'Find eigenvalues and eigenvectors of 2 × 2 matrices'],
    sections: [
      { title: 'Vectors, dot and cross products', html: R`
<p>A vector has size and direction; in coordinates $\vec a = (a_1, a_2, a_3)$. Add componentwise; scale by multiplying each component.</p>
<p>The <strong>dot product</strong> $\vec a\cdot\vec b = a_1b_1 + a_2b_2 + a_3b_3 = |\vec a||\vec b|\cos\theta$ measures how much two vectors point the same way. It is zero exactly when they are perpendicular. The <strong>cross product</strong> $\vec a\times\vec b$ is a vector perpendicular to both, with length $|\vec a||\vec b|\sin\theta$: the area of the parallelogram they span.</p>
<p>Example: the angle between $(1, 2, 2)$ and $(2, 1, -2)$: dot product $2 + 2 - 4 = 0$, so they are perpendicular.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $(3, -1, 2)\cdot(1, 4, 5)$.`, 3 - 4 + 10, [R`Multiply matching components and add.`], R`$3 - 4 + 10 = 9$.`, { tol: 0.001 })] },
      { title: 'Matrices as transformations', html: R`
<p>A $2\times2$ matrix $A = \begin{pmatrix}a & b\\ c & d\end{pmatrix}$ sends the vector $(x, y)$ to $(ax + by,\ cx + dy)$. Its columns are where the basis vectors $\hat\imath = (1, 0)$ and $\hat\jmath = (0, 1)$ land. That is all you need to picture it:</p>
<ul><li>$\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ rotates by $\theta$.</li>
<li>$\begin{pmatrix}k & 0\\ 0 & k\end{pmatrix}$ scales by $k$; $\begin{pmatrix}1 & 1\\ 0 & 1\end{pmatrix}$ is a shear.</li></ul>
<p>Doing $B$ then $A$ is the product $AB$ (rows of $A$ dotted with columns of $B$). Order matters: in general $AB \ne BA$.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Where does $\begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix}$ send the point $(1, 0)$?`, ['$(1, 0)$', '$(0, 1)$', '$(-1, 0)$', '$(0, -1)$'], 1, [R`The first column is where $(1, 0)$ goes.`], R`$(0, 1)$: it is a rotation by $90^\circ$.`)] },
      { title: 'Determinants, inverses and linear systems', html: R`
<div class="key"><p>$\det\begin{pmatrix}a & b\\ c & d\end{pmatrix} = ad - bc$: the factor by which the transformation scales areas (negative if it flips orientation).</p></div>
<p>If $\det A \ne 0$ the transformation can be undone: $A^{-1} = \dfrac1{ad - bc}\begin{pmatrix}d & -b\\ -c & a\end{pmatrix}$. If $\det A = 0$ the plane is squashed onto a line and information is lost.</p>
<p>A system of equations such as $2x + y = 5$, $x - y = 1$ is $A\vec x = \vec b$, solved by $\vec x = A^{-1}\vec b$, or by elimination: adding the equations gives $3x = 6$, so $x = 2$, $y = 1$. A $3\times3$ determinant is the volume scale factor and is found by expanding along a row.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\det\begin{pmatrix}4 & 3\\ 2 & 5\end{pmatrix}$.`, 14, [R`$ad - bc$.`], R`$20 - 6 = 14$.`, { tol: 0.001 })] },
      { title: 'Eigenvalues and eigenvectors', html: R`
<p>An <strong>eigenvector</strong> of $A$ is a non-zero vector that $A$ only stretches: $A\vec v = \lambda\vec v$. The stretch factor $\lambda$ is the <strong>eigenvalue</strong>. Rearranging, $(A - \lambda I)\vec v = \vec 0$ has a non-zero solution only if</p>
$$\det(A - \lambda I) = 0\quad\Longrightarrow\quad\lambda^2 - (a + d)\lambda + (ad - bc) = 0.$$
<p>So the eigenvalues add to the trace $a + d$ and multiply to the determinant. For $\begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$: $\lambda^2 - 4\lambda + 3 = 0$, so $\lambda = 1, 3$, with eigenvectors $(1, -1)$ and $(1, 1)$.</p>
<p>Eigenvectors are the natural axes of a problem: principal axes of a spinning body, normal modes of coupled oscillators (Chapter 8 of Physics), and the long-run behaviour of $A^n\vec x$, which lines up with the eigenvector of the largest eigenvalue. Google's original PageRank was exactly such an eigenvector.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the larger eigenvalue of $\begin{pmatrix}4 & 1\\ 2 & 3\end{pmatrix}$.`, 5, [R`$\lambda^2 - 7\lambda + 10 = 0$.`], R`$(\lambda - 5)(\lambda - 2) = 0$: the larger is 5.`, { tol: 0.001 })] }
    ],
    figures: [
      { s: 1, title: 'A matrix moves the grid', caption: 'Drag the tips of the two column vectors (where î and ĵ land). The unit square becomes a parallelogram whose signed area is the determinant.', params: { aspect: 0.55, controls: [S('a', 'a', -2, 2, 0.05, 1.5), S('c', 'c', -2, 2, 0.05, 0.5), S('b', 'b', -2, 2, 0.05, -0.5), S('d', 'd', -2, 2, 0.05, 1)],
        drag: [{ plot: 0, get: (v) => [v.a, v.c], set: (v, x, y) => { v.a = +x.toFixed(2); v.c = +y.toFixed(2); }, label: 'Aî' }, { plot: 0, get: (v) => [v.b, v.d], set: (v, x, y) => { v.b = +x.toFixed(2); v.d = +y.toFixed(2); }, color: 'rust', label: 'Aĵ' }],
        plots: [{ x: [-3, 3], y: [-2.6, 2.6], zero: false, xlabel: 'x', ylabel: 'y', n: 200, curves: (v) => { const out = []; const seg = (p, q, col, w) => { if (Math.abs(q[0] - p[0]) < 1e-6) out.push({ f: (t) => NaN }); else out.push({ f: (t) => p[1] + (t - p[0]) * (q[1] - p[1]) / (q[0] - p[0]), from: Math.min(p[0], q[0]), to: Math.max(p[0], q[0]), color: col, width: w }); }; const T = (x, y) => [v.a * x + v.b * y, v.c * x + v.d * y]; for (let k = -2; k <= 2; k++) { seg(T(-2, k), T(2, k), 'ink3', 1); seg(T(k, -2), T(k, 2), 'ink3', 1); } seg([0, 0], T(1, 0), 'accent', 3); seg([0, 0], T(0, 1), 'rust', 3); seg(T(1, 0), T(1, 1), 'good', 2); seg(T(0, 1), T(1, 1), 'good', 2); return out; } }],
        readout: (v) => { const det = v.a * v.d - v.b * v.c, tr = v.a + v.d, disc = tr * tr - 4 * det; return [['det A (area factor)', f(det, 4)], ['eigenvalues', disc >= 0 ? f((tr + Math.sqrt(disc)) / 2, 4) + ', ' + f((tr - Math.sqrt(disc)) / 2, 4) : 'complex (a rotation is involved)']]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Hunting for eigenvectors', desc: 'Drag the input vector x round the circle. The output Ax is drawn too. Eigenvectors are where x and Ax line up.',
        tasks: ['For [[2, 1], [1, 2]], find the two directions where Ax ∥ x. What are the stretch factors?', 'For a rotation matrix, why do no directions line up?', 'Make the matrix singular (det 0). Where does everything go?'],
        params: { aspect: 0.55, controls: [S('a', 'a', -2, 3, 0.1, 2), S('b', 'b', -2, 3, 0.1, 1), S('c', 'c', -2, 3, 0.1, 1), S('d', 'd', -2, 3, 0.1, 2), S('t', 'Angle of x', 0, 360, 1, 30, '°')],
          drag: [{ plot: 0, get: (v) => [Math.cos(v.t * Math.PI / 180), Math.sin(v.t * Math.PI / 180)], set: (v, x, y) => { v.t = Math.round(((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360); }, label: 'x' }],
          plots: [{ x: [-4, 4], y: [-3.2, 3.2], zero: false, xlabel: '', ylabel: '', n: 300, curves: (v) => { const c = Math.cos(v.t * Math.PI / 180), s = Math.sin(v.t * Math.PI / 180), ax = v.a * c + v.b * s, ay = v.c * c + v.d * s; const out = [{ f: (x) => (Math.abs(x) <= 1 ? Math.sqrt(1 - x * x) : NaN), color: 'ink3', dash: [3, 3] }, { f: (x) => (Math.abs(x) <= 1 ? -Math.sqrt(1 - x * x) : NaN), color: 'ink3', dash: [3, 3] }]; if (Math.abs(c) > 1e-6) out.push({ f: (x) => x * s / c, from: Math.min(0, c), to: Math.max(0, c), color: 'points', width: 3 }); if (Math.abs(ax) > 1e-6) out.push({ f: (x) => x * ay / ax, from: Math.min(0, ax), to: Math.max(0, ax), color: 'accent', width: 3, label: 'Ax' }); return out; }, pts: (v) => { const c = Math.cos(v.t * Math.PI / 180), s = Math.sin(v.t * Math.PI / 180); return [{ x: v.a * c + v.b * s, y: v.c * c + v.d * s, color: 'accent', label: 'Ax' }]; } }],
          readout: (v) => { const c = Math.cos(v.t * Math.PI / 180), s = Math.sin(v.t * Math.PI / 180), ax = v.a * c + v.b * s, ay = v.c * c + v.d * s; const cross = c * ay - s * ax; return [['angle between x and Ax', f(Math.abs(Math.atan2(cross, c * ax + s * ay)) * 180 / Math.PI) + '°'], ['|Ax|', f(Math.hypot(ax, ay), 4)], ['aligned?', Math.abs(cross) < 0.02 ? 'yes: an eigenvector!' : 'no']]; } } },
      { sim: 'explore', title: 'Two lines, one solution', desc: 'The system a₁x + b₁y = c₁, a₂x + b₂y = c₂ is two lines. One crossing means one solution; parallel lines (det = 0) mean none or infinitely many.',
        tasks: ['Make the lines parallel. What is the determinant?', 'Make them the same line. How many solutions now?'],
        params: { aspect: 0.5, controls: [S('a1', 'a₁', -3, 3, 0.1, 2), S('b1', 'b₁', -3, 3, 0.1, 1), S('c1', 'c₁', -5, 5, 0.1, 5), S('a2', 'a₂', -3, 3, 0.1, 1), S('b2', 'b₂', -3, 3, 0.1, -1), S('c2', 'c₂', -5, 5, 0.1, 1)],
          plots: [{ x: [-5, 5], y: [-5, 5], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => (Math.abs(v.b1) > 1e-9 ? (v.c1 - v.a1 * x) / v.b1 : NaN), label: 'line 1' }, { f: (x) => (Math.abs(v.b2) > 1e-9 ? (v.c2 - v.a2 * x) / v.b2 : NaN), color: 'rust', label: 'line 2' }], pts: (v) => { const D = v.a1 * v.b2 - v.a2 * v.b1; return Math.abs(D) > 1e-9 ? [{ x: (v.c1 * v.b2 - v.c2 * v.b1) / D, y: (v.a1 * v.c2 - v.a2 * v.c1) / D, label: 'solution' }] : []; } }],
          readout: (v) => { const D = v.a1 * v.b2 - v.a2 * v.b1; return [['det', f(D, 4)], ['solution', Math.abs(D) > 1e-9 ? '(' + f((v.c1 * v.b2 - v.c2 * v.b1) / D, 4) + ', ' + f((v.a1 * v.c2 - v.a2 * v.c1) / D, 4) + ')' : 'none or infinitely many']]; } } }
    ],
    formulas: [['Dot product', '\\vec a\\cdot\\vec b = \\sum a_ib_i = |\\vec a||\\vec b|\\cos\\theta'], ['Cross product', '|\\vec a\\times\\vec b| = |\\vec a||\\vec b|\\sin\\theta'], ['Determinant', '\\det\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix} = ad - bc'], ['Inverse', 'A^{-1} = \\dfrac1{ad - bc}\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}'], ['Rotation', '\\begin{pmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}'], ['Eigenvalues', '\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0']],
    problems: [
      P('concept', 'mcq', 'Perpendicular', R`Two non-zero vectors are perpendicular exactly when…`, 1, [R`$\cos90^\circ = 0$.`], R`Their dot product is zero.`, { options: ['their cross product is zero', 'their dot product is zero', 'they have equal length', 'their sum is zero'] }),
      P('concept', 'mcq', 'Order', R`For matrices, in general…`, 2, [R`Rotate then shear vs shear then rotate.`], R`$AB \ne BA$: matrix multiplication is not commutative.`, { options: ['$AB = BA$', '$AB = -BA$', '$AB \\ne BA$', '$AB = A + B$'] }),
      P('concept', 'mcq', 'Zero determinant', R`If $\det A = 0$, the transformation…`, 3, [R`Area scale factor zero.`], R`Squashes the plane onto a line (or a point) and has no inverse.`, { options: ['is a rotation', 'doubles areas', 'is the identity', 'has no inverse'] }),
      P('concept', 'mcq', 'Trace and determinant', R`The eigenvalues of a $2\times2$ matrix multiply to…`, 0, [R`Vieta on $\lambda^2 - (\operatorname{tr})\lambda + \det = 0$.`], R`The determinant.`, { options: ['the determinant', 'the trace', '1', 'zero'] }),
      P('core', 'num', 'Angle between vectors', R`Find the angle (degrees) between $(1, 0, 1)$ and $(0, 1, 1)$.`, 60, [R`$\cos\theta = \dfrac{1}{\sqrt2\sqrt2}$.`], R`$\cos\theta = \tfrac12$, so $60^\circ$.`),
      P('core', 'num', 'Triangle area', R`Find the area of the triangle with vertices $(0, 0, 0)$, $(2, 0, 0)$ and $(0, 3, 4)$.`, 0.5 * Math.hypot(0, -8, 6), [R`Half the length of $(2, 0, 0)\times(0, 3, 4)$.`], R`The cross product is $(0, -8, 6)$ with length 10, so the area is 5.`),
      P('core', 'num', 'Solve a system', R`Solve $3x + 2y = 12$, $x - y = -1$. Give $x$.`, 2, [R`From the second, $x = y - 1$.`], R`$3(y - 1) + 2y = 12$, $y = 3$, $x = 2$.`),
      P('core', 'num', '3 × 3 determinant', R`Find $\det\begin{pmatrix}1 & 2 & 0\\ 0 & 1 & 3\\ 2 & 0 & 1\end{pmatrix}$.`, 1 * (1 - 0) - 2 * (0 - 6) + 0, [R`Expand along the first row.`], R`$1(1) - 2(0 - 6) + 0 = 13$.`),
      P('core', 'num', 'Inverse entry', R`For $A = \begin{pmatrix}2 & 1\\ 5 & 3\end{pmatrix}$, find the top-left entry of $A^{-1}$.`, 3, [R`$\det A = 1$.`], R`$A^{-1} = \begin{pmatrix}3 & -1\\ -5 & 2\end{pmatrix}$: 3.`),
      P('olympiad', 'num', 'Matrix power', R`Let $A = \begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix}$. Find the top-right entry of $A^{10}$.`, 55, [R`$A^n = \begin{pmatrix}F_{n+1} & F_n\\ F_n & F_{n-1}\end{pmatrix}$.`], R`$F_{10} = 55$.`),
      P('olympiad', 'num', 'Long-run growth', R`Rabbits: $\begin{pmatrix}a\\ j\end{pmatrix}_{n+1} = \begin{pmatrix}1 & 2\\ 0.5 & 0\end{pmatrix}\begin{pmatrix}a\\ j\end{pmatrix}_n$. By what factor does the population grow each step in the long run?`, (1 + Math.sqrt(1 + 4)) / 2, [R`The largest eigenvalue: $\lambda^2 - \lambda - 1 = 0$.`], R`$\lambda = \dfrac{1 + \sqrt5}{2} \approx 1.618$.`),
      P('olympiad', 'num', 'Reflection eigenvalues', R`A $2\times2$ matrix reflects the plane in the line $y = 2x$. What is the sum of its eigenvalues?`, 0, [R`Vectors along the line stay put; vectors perpendicular to it flip.`], R`Eigenvalues $1$ and $-1$: sum 0 (the trace of any reflection).`, { atol: 1e-6 })
    ]
  });
  PB.addDrills('math-linear', [
    { title: 'Dot product', gen: (r) => { const a = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], b = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; return { q: R`<p>Find $(${a.join(', ')})\cdot(${b.join(', ')})$.</p>`, answer: d, tol: 0.001, atol: 1e-9, solution: R`<p>${d}.</p>` }; } },
    { title: 'Determinant', gen: (r) => { const a = r.int(-6, 6), b = r.int(-6, 6), c = r.int(-6, 6), d = r.int(-6, 6); return { q: R`<p>Find $\det\begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}$.</p>`, answer: a * d - b * c, tol: 0.001, atol: 1e-9, solution: R`<p>$${a}\cdot${d} - ${b}\cdot${c} = ${a * d - b * c}$.</p>` }; } },
    { title: 'Eigenvalue', gen: (r) => { const l1 = r.int(-3, 6), l2 = r.int(-3, 6), b = r.int(1, 4); const a = l1, d = l2; return { q: R`<p>Find the larger eigenvalue of $\begin{pmatrix}${a} & ${b}\\ 0 & ${d}\end{pmatrix}$.</p>`, answer: Math.max(l1, l2), tol: 0.001, atol: 1e-9, solution: R`<p>A triangular matrix has its diagonal entries as eigenvalues: ${Math.max(l1, l2)}.</p>` }; } }
  ]);

  /* ===================== 14. Probability and statistics ===================== */
  PB.addChapter({
    id: 'math-stats', subject: 'maths', num: 14, part: 'Linear Algebra and Statistics',
    title: 'Probability and Statistics',
    subtitle: R`Reasoning with uncertainty. Conditional probability and Bayes, random variables, mean and variance, the binomial and normal distributions, the central limit theorem, confidence intervals and correlation.`,
    big: 'Probability runs forward from a known model to likely data; statistics runs backwards from data to the model. The normal bell curve appears everywhere because averages of many small random effects always end up bell-shaped.',
    goals: ['Use conditional probability and Bayes’ theorem', 'Compute means and variances of random variables', 'Use the binomial and normal distributions', 'Apply the central limit theorem and build confidence intervals', 'Interpret correlation and fit a regression line'],
    sections: [
      { title: 'Conditional probability and Bayes', html: R`
<p>$P(A\mid B)$, the probability of $A$ given that $B$ happened, is $\dfrac{P(A\cap B)}{P(B)}$. Events are <strong>independent</strong> if $P(A\mid B) = P(A)$.</p>
<div class="key"><p><strong>Bayes' theorem:</strong> $P(A\mid B) = \dfrac{P(B\mid A)P(A)}{P(B)}$.</p></div>
<p>A famous trap: a disease affects 1% of people; a test catches 90% of cases but also gives 5% false positives. If you test positive, $P(\text{ill}\mid +) = \dfrac{0.9\times0.01}{0.9\times0.01 + 0.05\times0.99} \approx 0.15$. Most positives are false, because healthy people vastly outnumber ill ones. Thinking in counts (of 1000 people: 9 true positives, about 50 false ones) makes it obvious.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two cards are drawn from a pack without replacement. What is the probability both are aces?`, 4 / 52 * 3 / 51, [R`$P(\text{2nd ace}\mid\text{1st ace}) = 3/51$.`], R`$\tfrac4{52}\cdot\tfrac3{51} = \tfrac1{221} \approx 0.00452$.`, { tol: 0.01 })] },
      { title: 'Random variables, mean and variance', html: R`
<p>A <strong>random variable</strong> $X$ takes values with given probabilities. Its <strong>mean</strong> (expected value) is $\mu = E[X] = \sum xP(X = x)$ and its <strong>variance</strong> measures spread:</p>
$$\operatorname{Var}(X) = E[(X - \mu)^2] = E[X^2] - \mu^2,\qquad \sigma = \sqrt{\operatorname{Var}X}.$$
<p>For a fair die: $\mu = 3.5$, $E[X^2] = 91/6$, so $\operatorname{Var} = 91/6 - 12.25 \approx 2.92$. Rules: $E[aX + b] = aE[X] + b$ and $\operatorname{Var}(aX + b) = a^2\operatorname{Var}X$; for <em>independent</em> variables variances add.</p>
<p>The <strong>binomial distribution</strong> counts successes in $n$ independent trials with success probability $p$: mean $np$, variance $np(1 - p)$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A coin is tossed 100 times. What is the standard deviation of the number of heads?`, 5, [R`$\sigma = \sqrt{np(1 - p)}$.`], R`$\sqrt{25} = 5$.`, { tol: 0.001 })] },
      { title: 'The normal distribution and the central limit theorem', html: R`
<p>The <strong>normal distribution</strong> $N(\mu, \sigma^2)$ is the bell curve. About 68% of values lie within $1\sigma$ of the mean, 95% within $2\sigma$ (more precisely $1.96\sigma$), and 99.7% within $3\sigma$. To use tables, standardise: $Z = (X - \mu)/\sigma$.</p>
<div class="key"><p><strong>Central limit theorem.</strong> The mean of $n$ independent samples from <em>any</em> distribution with mean $\mu$ and standard deviation $\sigma$ is approximately $N(\mu, \sigma^2/n)$ for large $n$.</p></div>
<p>That is why heights, measurement errors and exam scores look bell-shaped, and why averaging $n$ measurements shrinks the uncertainty by $\sqrt n$, the standard error $\sigma/\sqrt n$ used in every physics lab.</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`IQ scores are $N(100, 15^2)$. What percentage of people score above 130?`, 100 * (1 - Phi(2)), [R`$Z = (130 - 100)/15 = 2$.`], R`$P(Z > 2) \approx 2.3\%$.`, { tol: 0.03 })] },
      { title: 'Estimation and correlation', html: R`
<p>From a sample of size $n$ with mean $\bar x$ and standard deviation $s$, a 95% <strong>confidence interval</strong> for the true mean is $\bar x \pm 1.96\,s/\sqrt n$ (for large $n$). Quadrupling the sample halves its width.</p>
<p>The <strong>correlation coefficient</strong> $r$ (between −1 and 1) measures how well points fit a straight line. The least-squares line $y = a + bx$ has slope $b = r\,s_y/s_x$ and passes through $(\bar x, \bar y)$. Correlation is not causation: ice-cream sales correlate with drownings because both rise in summer.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A sample of 100 measurements has mean 9.79 and standard deviation 0.20. Find the half-width of the 95% confidence interval for the mean.`, 1.96 * 0.2 / 10, [R`$1.96\,s/\sqrt n$.`], R`$1.96\times0.02 = 0.0392$.`, { tol: 0.01 })] }
    ],
    figures: [
      { s: 0, title: 'Bayes with natural frequencies', caption: 'Out of 1000 people, how many test positive, and how many of those are ill? Change the base rate, sensitivity and false-positive rate.', params: { picFrac: 0.55, controls: [S('prev', 'Base rate', 0.1, 30, 0.1, 1, '%'), S('sens', 'Sensitivity', 50, 100, 1, 90, '%'), S('fp', 'False positives', 0, 20, 0.5, 5, '%')],
        draw: (ctx, Cc, v, b, U) => { const N = 1000, cols = 40, rows = 25, s = Math.min(b.w / cols, b.h / rows), ox = b.x + (b.w - s * cols) / 2, oy = b.y + (b.h - s * rows) / 2; const ill = Math.round(N * v.prev / 100), tp = Math.round(ill * v.sens / 100), fpn = Math.round((N - ill) * v.fp / 100); for (let i = 0; i < N; i++) { const isIll = i < ill, pos = isIll ? i < tp : i - ill < fpn; ctx.fillStyle = isIll ? (pos ? Cc.rust : U.alpha(Cc.rust, 0.3)) : (pos ? Cc.points : U.alpha(Cc.ink3, 0.18)); ctx.fillRect(ox + (i % cols) * s + 0.5, oy + Math.floor(i / cols) * s + 0.5, s - 1, s - 1); } },
        plots: [{ x: [0, 30], y: [0, 1], xlabel: 'base rate (%)', ylabel: 'P(ill | positive)', curves: (v) => [{ f: (p) => { const a = p / 100 * v.sens / 100, bq = (1 - p / 100) * v.fp / 100; return a / (a + bq || 1); } }], pts: (v) => { const a = v.prev / 100 * v.sens / 100, bq = (1 - v.prev / 100) * v.fp / 100; return [{ x: v.prev, y: a / (a + bq || 1) }]; } }],
        readout: (v) => { const ill = Math.round(1000 * v.prev / 100), tp = Math.round(ill * v.sens / 100), fpn = Math.round((1000 - ill) * v.fp / 100); return [['true positives (red)', String(tp)], ['false positives (orange)', String(fpn)], ['P(ill | positive)', f(tp / ((tp + fpn) || 1), 3)]]; } } },
      { s: 2, title: 'The central limit theorem', caption: 'The distribution of the mean of n rolls of a fair die. Even n = 5 already looks like a bell.', params: { controls: [S('n', 'Dice averaged n', 1, 30, 1, 5)],
        plots: [{ x: [1, 6], y: 'auto', xlabel: 'mean of the n dice', ylabel: 'probability', n: 600, curves: (v) => { let dist = [0, 1, 1, 1, 1, 1, 1].map((x) => x / 6); dist[0] = 0; let cur = [1]; for (let k = 0; k < v.n; k++) { const nx = new Array(cur.length + 6).fill(0); cur.forEach((pp, s) => { for (let fc = 1; fc <= 6; fc++) nx[s + fc] += pp / 6; }); cur = nx; } const mu = 3.5, sg = Math.sqrt(35 / 12 / v.n); return [{ f: (m) => { const s = Math.round(m * v.n); return Math.abs(m * v.n - s) < 0.25 && cur[s] ? cur[s] : 0; } }, { f: (m) => Math.exp(-Math.pow((m - mu) / sg, 2) / 2) / (sg * Math.sqrt(2 * Math.PI)) / v.n, color: 'rust', dash: [4, 4], label: 'normal approx.' }]; } }],
        readout: (v) => [['mean', '3.5'], ['standard error σ/√n', f(Math.sqrt(35 / 12) / Math.sqrt(v.n), 4)]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Least squares by dragging', desc: 'Drag the five data points. The regression line and the correlation r update live; the dotted residuals are what least squares minimises (the sum of their squares).',
        tasks: ['Line the points up perfectly. What is r?', 'Drag one point far away (an outlier). How much does the line move?', 'Make r close to 0 while keeping a clear pattern (a U shape).'],
        params: { aspect: 0.5, controls: [S('x1', 'x₁', 0, 10, 0.1, 1), S('y1', 'y₁', 0, 10, 0.1, 2), S('x2', 'x₂', 0, 10, 0.1, 3), S('y2', 'y₂', 0, 10, 0.1, 3.5), S('x3', 'x₃', 0, 10, 0.1, 5), S('y3', 'y₃', 0, 10, 0.1, 4.5), S('x4', 'x₄', 0, 10, 0.1, 7), S('y4', 'y₄', 0, 10, 0.1, 7.5), S('x5', 'x₅', 0, 10, 0.1, 9), S('y5', 'y₅', 0, 10, 0.1, 8)],
          drag: [1, 2, 3, 4, 5].map((i) => ({ plot: 0, get: (v) => [v['x' + i], v['y' + i]], set: (v, x, y) => { v['x' + i] = +x.toFixed(1); v['y' + i] = +y.toFixed(1); } })),
          plots: [{ x: [0, 10], y: [0, 10], xlabel: 'x', ylabel: 'y', n: 300, curves: (v) => { const P = [1, 2, 3, 4, 5].map((i) => [v['x' + i], v['y' + i]]), mx = P.reduce((a, p) => a + p[0], 0) / 5, my = P.reduce((a, p) => a + p[1], 0) / 5; const sxy = P.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0), sxx = P.reduce((a, p) => a + (p[0] - mx) * (p[0] - mx), 0); const bb = sxx ? sxy / sxx : 0; return [{ f: (x) => my + bb * (x - mx), color: 'rust', label: 'least-squares line' }]; }, pts: (v) => { const P = [1, 2, 3, 4, 5].map((i) => [v['x' + i], v['y' + i]]), mx = P.reduce((a, p) => a + p[0], 0) / 5, my = P.reduce((a, p) => a + p[1], 0) / 5; const sxy = P.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0), sxx = P.reduce((a, p) => a + (p[0] - mx) * (p[0] - mx), 0); const bb = sxx ? sxy / sxx : 0; const out = []; P.forEach((p) => { const yh = my + bb * (p[0] - mx); for (let k = 0; k <= 12; k++) out.push({ x: p[0], y: yh + (p[1] - yh) * k / 12, r: 1, ring: false, color: 'points' }); }); return out; } }],
          readout: (v) => { const P = [1, 2, 3, 4, 5].map((i) => [v['x' + i], v['y' + i]]), mx = P.reduce((a, p) => a + p[0], 0) / 5, my = P.reduce((a, p) => a + p[1], 0) / 5; const sxy = P.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0), sxx = P.reduce((a, p) => a + (p[0] - mx) * (p[0] - mx), 0), syy = P.reduce((a, p) => a + (p[1] - my) * (p[1] - my), 0); const bb = sxx ? sxy / sxx : 0; return [['slope', f(bb, 4)], ['intercept', f(my - bb * mx, 4)], ['r', sxx && syy ? f(sxy / Math.sqrt(sxx * syy), 4) : '—']]; } } },
      { sim: 'explore', title: 'Normal probabilities', desc: 'Shade the area under N(μ, σ²) between two values. The shaded area is the probability.',
        tasks: ['Check the 68–95–99.7 rule.', 'Heights are N(170, 7²) cm. What fraction are over 180 cm?'],
        params: { aspect: 0.45, controls: [S('mu', 'Mean μ', -5, 5, 0.1, 0), S('sg', 'Standard deviation σ', 0.3, 4, 0.1, 1), S('lo', 'From', -10, 10, 0.1, -1), S('hi', 'To', -10, 10, 0.1, 1)],
          drag: [{ plot: 0, get: (v) => [v.lo, 0], set: (v, x) => { v.lo = +x.toFixed(1); }, label: 'from' }, { plot: 0, get: (v) => [v.hi, 0], set: (v, x) => { v.hi = +x.toFixed(1); }, color: 'rust', label: 'to' }],
          plots: [{ x: [-10, 10], y: [0, 1.4], xlabel: 'x', ylabel: 'density', n: 500, curves: (v) => [{ f: (x) => Math.exp(-Math.pow((x - v.mu) / v.sg, 2) / 2) / (v.sg * Math.sqrt(2 * Math.PI)) }, { f: (x) => Math.exp(-Math.pow((x - v.mu) / v.sg, 2) / 2) / (v.sg * Math.sqrt(2 * Math.PI)), from: Math.min(v.lo, v.hi), to: Math.max(v.lo, v.hi), color: 'points', width: 5 }], bands: (v) => [{ x0: Math.min(v.lo, v.hi), x1: Math.max(v.lo, v.hi), color: 'points' }] }],
          readout: (v) => { const a = Math.min(v.lo, v.hi), bq = Math.max(v.lo, v.hi); return [['P(from < X < to)', f(Phi((bq - v.mu) / v.sg) - Phi((a - v.mu) / v.sg), 4)], ['z-scores', f((a - v.mu) / v.sg, 3) + ' to ' + f((bq - v.mu) / v.sg, 3)]]; } } }
    ],
    formulas: [['Conditional', 'P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}'], ['Bayes', 'P(A\\mid B) = \\dfrac{P(B\\mid A)P(A)}{P(B)}'], ['Mean and variance', 'E[X] = \\sum xp,\\ \\operatorname{Var}X = E[X^2] - E[X]^2'], ['Binomial', '\\mu = np,\\ \\sigma^2 = np(1 - p)'], ['Standardise', 'Z = \\dfrac{X - \\mu}{\\sigma}'], ['Standard error', '\\sigma_{\\bar x} = \\sigma/\\sqrt n'], ['95% interval', '\\bar x \\pm 1.96\\,s/\\sqrt n']],
    problems: [
      P('concept', 'mcq', 'Independence', R`If $A$ and $B$ are independent, $P(A\cap B) = $`, 2, [R`Independence means $P(A\mid B) = P(A)$.`], R`$P(A)P(B)$.`, { options: ['$P(A) + P(B)$', '$P(A\\mid B)$', '$P(A)P(B)$', '0'] }),
      P('concept', 'mcq', 'Averaging', R`Averaging 16 independent measurements reduces the random uncertainty by a factor of…`, 1, [R`$\sigma/\sqrt n$.`], R`4.`, { options: ['16', '4', '2', '256'] }),
      P('concept', 'mcq', 'Correlation', R`A correlation coefficient of $r = -0.95$ means…`, 3, [R`Sign gives direction, size gives strength.`], R`A strong negative linear relationship: as one rises, the other falls.`, { options: ['no relationship', 'a weak positive trend', 'one causes the other', 'a strong negative linear relationship'] }),
      P('concept', 'mcq', 'Variance rule', R`If $\operatorname{Var}X = 4$, then $\operatorname{Var}(3X + 7) = $`, 0, [R`Shifts do not spread; scaling by 3 multiplies variance by 9.`], R`36.`, { options: ['36', '19', '12', '43'] }),
      P('core', 'num', 'Bayes', R`A factory's machine A makes 60% of items with a 2% defect rate, machine B 40% with a 5% rate. An item is defective. What is the probability it came from B?`, 0.4 * 0.05 / (0.4 * 0.05 + 0.6 * 0.02), [R`$\dfrac{0.4\times0.05}{0.4\times0.05 + 0.6\times0.02}$.`], R`$\dfrac{0.020}{0.032} = 0.625$.`),
      P('core', 'num', 'Binomial probability', R`A fair coin is tossed 10 times. What is the probability of exactly 7 heads?`, C(10, 7) / 1024, [R`$\binom{10}7/2^{10}$.`], R`$120/1024 \approx 0.117$.`, { tol: 0.01 }),
      P('core', 'num', 'Expected winnings', R`A game costs 2 to play. You roll a die and win 6 if it shows 6, otherwise nothing. What is your expected profit per game?`, 6 / 6 - 2, [R`$E[\text{win}] = 6\times\tfrac16$.`], R`$1 - 2 = -1$: you lose 1 per game on average.`),
      P('core', 'num', 'Normal tail', R`Heights are $N(170, 7^2)$ cm. What fraction of people are taller than 184 cm?`, 1 - Phi(2), [R`$Z = 14/7 = 2$.`], R`$P(Z > 2) \approx 0.0228$.`, { tol: 0.03 }),
      P('core', 'num', 'Sample size', R`A measurement has $\sigma = 0.5$. How many independent repeats are needed for a standard error of 0.05?`, 100, [R`$0.5/\sqrt n = 0.05$.`], R`$\sqrt n = 10$, $n = 100$.`),
      P('olympiad', 'num', 'Birthday-style', R`Five people each pick a whole number from 1 to 10 at random. What is the probability that at least two pick the same number?`, 1 - 10 * 9 * 8 * 7 * 6 / 1e5, [R`Complement: all different.`], R`$1 - \dfrac{10\cdot9\cdot8\cdot7\cdot6}{10^5} = 1 - 0.3024 = 0.6976$.`),
      P('olympiad', 'num', 'Monty Hall', R`In the Monty Hall game (three doors, host always opens an empty door you did not pick and offers a switch), what is the probability of winning if you always switch?`, 2 / 3, [R`You win by switching exactly when your first pick was wrong.`], R`$\tfrac23$.`),
      P('olympiad', 'num', 'Variance of a sum', R`Find the variance of the total of 10 fair dice.`, 10 * 35 / 12, [R`One die has variance $35/12$; independent variances add.`], R`$350/12 \approx 29.17$.`)
    ]
  });
  PB.addDrills('math-stats', [
    { title: 'Binomial mean and SD', gen: (r) => { const n = r.int(10, 400), p = r.step(0.1, 0.9, 0.1); return { q: R`<p>$X \sim B(${n}, ${p})$. Find the standard deviation of $X$.</p>`, answer: Math.sqrt(n * p * (1 - p)), tol: 0.003, solution: R`<p>$\sqrt{${n}\times${p}\times${f(1 - p)}} = ${f(Math.sqrt(n * p * (1 - p)), 4)}$.</p>` }; } },
    { title: 'z-score', gen: (r) => { const mu = r.int(50, 150), sg = r.int(5, 20), x = mu + r.int(-3, 3) * sg + r.int(-4, 4); return { q: R`<p>$X \sim N(${mu}, ${sg}^2)$. Find the $z$-score of $x = ${x}$.</p>`, answer: (x - mu) / sg, tol: 0.003, atol: 1e-9, solution: R`<p>$(${x} - ${mu})/${sg} = ${f((x - mu) / sg, 4)}$.</p>` }; } },
    { title: 'Conditional probability', gen: (r) => { const a = r.int(1, 9) / 10, b = r.int(1, 9) / 10; const pab = +(a * b).toFixed(2); return { q: R`<p>$P(A\cap B) = ${pab}$ and $P(B) = ${b}$. Find $P(A\mid B)$.</p>`, answer: pab / b, tol: 0.003, solution: R`<p>$${pab}/${b} = ${f(pab / b, 4)}$.</p>` }; } }
  ]);
})();
