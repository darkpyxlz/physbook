/* Mathematics 7–10: series, differential equations, several variables, complex numbers. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.01 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.01 } : {}, o || {});
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const TAY = { sin: [Math.sin, (n, x) => (n % 2 ? Math.pow(-1, (n - 1) / 2) * Math.pow(x, n) / fact(n) : 0), 'sin x'], cos: [Math.cos, (n, x) => (n % 2 ? 0 : Math.pow(-1, n / 2) * Math.pow(x, n) / fact(n)), 'cos x'], exp: [Math.exp, (n, x) => Math.pow(x, n) / fact(n), 'eˣ'], ln: [(x) => (x > -1 ? Math.log(1 + x) : NaN), (n, x) => (n === 0 ? 0 : Math.pow(-1, n + 1) * Math.pow(x, n) / n), 'ln(1 + x)'] };

  /* ===================== 7. Series ===================== */
  PB.addChapter({
    id: 'math-series', subject: 'maths', num: 8, part: 'Further Calculus',
    title: 'Sequences, Series and Taylor Polynomials',
    subtitle: R`Adding infinitely many numbers and getting a finite answer. Geometric series, convergence tests, power series, and approximating any smooth function by a polynomial.`,
    big: 'Infinitely many terms can add to a finite total, if they shrink fast enough: ½ + ¼ + ⅛ + … = 1. Taylor series go further and rebuild a whole function, like sin x or eˣ, from the slopes at a single point.',
    goals: ['Find limits of sequences', 'Sum geometric series', 'Test series for convergence', 'Build Taylor polynomials and series', 'Use series for approximations and limits'],
    sections: [
      { title: 'Sequences and geometric series', html: R`
<p>A <strong>sequence</strong> is a list $a_1, a_2, a_3, \dots$; it <strong>converges</strong> if its terms settle towards a limit. A <strong>series</strong> is the sum of a sequence: $\sum a_n$. Its value is the limit of the partial sums $S_N = a_1 + \dots + a_N$, if that exists.</p>
<p>The most important series is <strong>geometric</strong>: each term is $r$ times the previous one.</p>
<div class="key"><p>$$a + ar + ar^2 + \dots = \frac{a}{1 - r}\quad\text{if }|r| < 1.$$ (Proof: $S_N - rS_N = a - ar^{N}$, and $r^N \to 0$.)</p></div>
<p>So $1 + \tfrac12 + \tfrac14 + \dots = 2$ and the recurring decimal $0.\overline{3} = \tfrac3{10}/(1 - \tfrac1{10}) = \tfrac13$. If $|r| \ge 1$ the terms do not shrink and the series diverges.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Sum $3 + 1 + \tfrac13 + \tfrac19 + \dots$`, 4.5, [R`First term 3, ratio $\tfrac13$.`], R`$\dfrac{3}{1 - 1/3} = 4.5$.`)] },
      { title: 'Does it converge?', html: R`
<p>Shrinking terms are necessary but not enough. The <strong>harmonic series</strong> $1 + \tfrac12 + \tfrac13 + \tfrac14 + \dots$ diverges: group the terms as $1 + \tfrac12 + (\tfrac13 + \tfrac14) + (\tfrac15 + \dots + \tfrac18) + \dots$, and each bracket is at least $\tfrac12$.</p>
<p>Tools for deciding:</p>
<ul><li><strong>$p$-series</strong>: $\sum\dfrac1{n^p}$ converges exactly when $p > 1$ (compare with $\int_1^\infty x^{-p}\,\mathrm dx$). So $\sum\frac1{n^2}$ converges (to $\pi^2/6$, a famous result of Euler).</li>
<li><strong>Comparison</strong>: smaller than a convergent series means convergent.</li>
<li><strong>Ratio test</strong>: if $|a_{n+1}/a_n| \to L < 1$ the series converges; $L > 1$ diverges. Ideal for factorials and powers.</li>
<li><strong>Alternating series</strong> with shrinking terms converge: $1 - \tfrac12 + \tfrac13 - \dots = \ln2$.</li></ul>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which series converges?`, ['$\\sum 1/\\sqrt n$', '$\\sum 1/n$', '$\\sum 1/n^{1.5}$', '$\\sum n/(n + 1)$'], 2, [R`$p$-series need $p > 1$.`], R`$\sum1/n^{1.5}$ ($p = 1.5$). The last one's terms do not even go to zero.`)] },
      { title: 'Taylor polynomials', html: R`
<p>Near $x = 0$, a smooth function can be copied by a polynomial that matches its value, slope, curvature and so on. Matching the first $n$ derivatives at 0 gives the <strong>Maclaurin polynomial</strong>:</p>
$$f(x) \approx f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots$$
<div class="key"><p>$e^x = 1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \dots,\qquad \sin x = x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dots,$<br>$\cos x = 1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \dots,\qquad \ln(1 + x) = x - \dfrac{x^2}2 + \dfrac{x^3}3 - \dots\ (|x| < 1)$</p></div>
<div data-fig="1"></div>
<p>The first terms are the approximations used throughout physics: $\sin x \approx x$, $\cos x \approx 1 - x^2/2$, $(1 + x)^n \approx 1 + nx$. Around a general point $a$, replace $x$ by $x - a$ and use derivatives at $a$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Use the first three terms of $e^x$ to estimate $e^{0.1}$.`, 1.105, [R`$1 + 0.1 + 0.01/2$.`], R`$1.105$ (true $1.10517$).`, { tol: 0.0005 })] },
      { title: 'Power series at work', html: R`
<p>Within its <strong>radius of convergence</strong> a power series can be differentiated and integrated term by term. Integrating $\dfrac1{1 + t^2} = 1 - t^2 + t^4 - \dots$ gives $\arctan x = x - \dfrac{x^3}3 + \dfrac{x^5}5 - \dots$, and at $x = 1$ that gives $\dfrac\pi4 = 1 - \dfrac13 + \dfrac15 - \dots$.</p>
<p>Series also crack limits: $\dfrac{\sin x - x}{x^3} = \dfrac{-x^3/6 + \dots}{x^3} \to -\dfrac16$.</p>
<p>And they reveal <strong>Euler's formula</strong>: putting $ix$ into the series for $e^x$ and grouping real and imaginary parts gives $e^{ix} = \cos x + i\sin x$ (Chapter 10).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2}$ using the series for $e^x$.`, 0.5, [R`$e^x - 1 - x = x^2/2 + x^3/6 + \dots$`], R`$\tfrac12$.`)] }
    ],
    figures: [
      { s: 1, title: 'Partial sums', caption: 'Partial sums of three series. The geometric one settles fast, Σ1/n² settles to π²/6, and the harmonic series creeps up forever.', params: { controls: [S('N', 'Terms N', 1, 200, 1, 50)],
        plots: [{ x: [1, 200], y: [0, 6.5], xlabel: 'N', ylabel: 'S_N', n: 200, curves: () => { const H = [0], Q = [0], G = [0]; for (let n = 1; n <= 201; n++) { H.push(H[n - 1] + 1 / n); Q.push(Q[n - 1] + 1 / (n * n)); G.push(G[n - 1] + Math.pow(0.5, n - 1)); } const at = (A) => (x) => A[Math.max(1, Math.round(x))]; return [{ f: at(H), label: 'Σ 1/n', color: 'rust' }, { f: at(Q), label: 'Σ 1/n²' }, { f: at(G), label: 'Σ (½)ⁿ', color: 'teal' }]; }, hlines: () => [{ y: Math.PI * Math.PI / 6, label: 'π²/6' }, { y: 2, label: '2' }], vlines: (v) => [{ x: v.N }] }],
        readout: (v) => { let h = 0, q = 0; for (let n = 1; n <= v.N; n++) { h += 1 / n; q += 1 / (n * n); } return [['Σ 1/n', f(h, 5)], ['Σ 1/n²', f(q, 5) + ' (→ ' + f(Math.PI * Math.PI / 6, 5) + ')']]; } } },
      { s: 2, title: 'Taylor polynomials hug the curve', caption: 'More terms, wider agreement. ln(1 + x) refuses to follow beyond x = 1, its radius of convergence.', params: { controls: [{ type: 'select', id: 'fn', label: 'Function', value: 'sin', options: Object.keys(TAY).map((k) => [k, TAY[k][2]]) }, S('n', 'Degree n', 0, 15, 1, 3)],
        plots: [{ x: [-7, 7], y: [-3, 5], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: TAY[v.fn][0], label: TAY[v.fn][2] }, { f: (x) => { let s = 0; for (let k = 0; k <= v.n; k++) s += TAY[v.fn][1](k, x); return s; }, color: 'rust', label: 'degree ' + v.n }] }] } }
    ],
    labs: [
      { sim: 'explore', title: 'The ratio test', desc: 'Terms aₙ = xⁿ/n^p. The ratio |aₙ₊₁/aₙ| → |x|, so the series converges for |x| < 1 whatever p is; at |x| = 1 it depends on p.',
        tasks: ['Set x = 0.9. How many terms does it take to get within 1% of the limit?', 'Set x = 1 and p = 1: the harmonic series. Now try p = 2.', 'Set x = −1, p = 1. Why does this one converge?'],
        params: { aspect: 0.45, controls: [S('x', 'x', -1.2, 1.2, 0.01, 0.9), S('p', 'p', 0, 3, 0.1, 1)],
          plots: [{ x: [1, 80], y: 'auto', zero: false, xlabel: 'N', ylabel: 'partial sum', n: 80, curves: (v) => { const s = [0]; for (let n = 1; n <= 81; n++) s.push(s[n - 1] + Math.pow(v.x, n) / Math.pow(n, v.p)); return [{ f: (N) => s[Math.max(1, Math.round(N))] }]; } }],
          readout: (v) => [['ratio limit |x|', f(Math.abs(v.x))], ['verdict', Math.abs(v.x) < 1 ? 'converges' : Math.abs(v.x) > 1 ? 'diverges' : v.p > 1 ? 'converges (p > 1)' : v.x < 0 && v.p > 0 ? 'converges (alternating)' : 'diverges']] } },
      { sim: 'explore', title: 'Error of a Taylor polynomial', desc: 'The error of the degree-n Maclaurin polynomial of eˣ at x, on a log scale, with the Lagrange bound eˣ·xⁿ⁺¹/(n + 1)!.',
        tasks: ['How many terms do you need for e¹ to 6 decimal places?', 'Why does the error grow so fast with x?'],
        params: { aspect: 0.45, controls: [S('x', 'x', 0.1, 5, 0.1, 1)],
          plots: [{ x: [0, 20], y: [-16, 3], zero: false, xlabel: 'degree n', ylabel: 'log₁₀ error', n: 20, curves: (v) => [{ f: (n) => { let s = 0; for (let k = 0; k <= Math.round(n); k++) s += Math.pow(v.x, k) / fact(k); return Math.log10(Math.abs(Math.exp(v.x) - s) + 1e-17); }, label: 'actual' }, { f: (n) => Math.log10(Math.exp(v.x) * Math.pow(v.x, Math.round(n) + 1) / fact(Math.round(n) + 1)), color: 'rust', dash: [4, 4], label: 'bound' }], hlines: () => [{ y: -6, label: '10⁻⁶' }] }] } }
    ],
    formulas: [['Geometric series', 'a + ar + ar^2 + \\dots = \\dfrac a{1 - r},\\ |r| < 1'], ['p-series', '\\sum 1/n^p \\text{ converges} \\iff p > 1'], ['Ratio test', '\\lim|a_{n+1}/a_n| < 1 \\Rightarrow \\text{converges}'], ['Taylor series', 'f(x) = \\sum\\dfrac{f^{(n)}(a)}{n!}(x - a)^n'], ['Exponential', 'e^x = \\sum\\dfrac{x^n}{n!}'], ['Sine and cosine', '\\sin x = \\sum\\dfrac{(-1)^nx^{2n+1}}{(2n + 1)!},\\ \\cos x = \\sum\\dfrac{(-1)^nx^{2n}}{(2n)!}'], ['Binomial', '(1 + x)^n \\approx 1 + nx']],
    problems: [
      P('concept', 'mcq', 'Terms to zero', R`If $a_n \to 0$, then $\sum a_n$…`, 2, [R`Think of the harmonic series.`], R`Might or might not converge. Terms going to zero is necessary, not sufficient.`, { options: ['must converge', 'must diverge', 'might or might not converge', 'equals zero'] }),
      P('concept', 'mcq', 'Recurring decimal', R`$0.\overline{9} = 0.999\dots$ equals…`, 1, [R`Geometric series with $a = 0.9$, $r = 0.1$.`], R`$0.9/(1 - 0.1) = 1$ exactly.`, { options: ['slightly less than 1', 'exactly 1', 'it is not a real number', '0.9'] }),
      P('concept', 'mcq', 'Maclaurin coefficient', R`The coefficient of $x^2$ in the Maclaurin series of $\cos x$ is…`, 3, [R`$1 - x^2/2! + \dots$`], R`$-\tfrac12$.`, { options: ['1', '$\\tfrac12$', '0', '$-\\tfrac12$'] }),
      P('concept', 'mcq', 'Ratio test', R`The ratio test applied to $\sum\dfrac{n!}{10^n}$ shows it…`, 1, [R`$a_{n+1}/a_n = (n + 1)/10$.`], R`The ratio grows without bound, so it diverges: factorials beat powers.`, { options: ['converges', 'diverges', 'is inconclusive', 'sums to 10'] }),
      P('core', 'num', 'Bouncing ball', R`A ball dropped from 10 m rebounds to 60% of its previous height each bounce. What total distance does it travel?`, 10 + 2 * 6 / 0.4, [R`Down 10, then up and down $6, 3.6, \dots$ twice each.`], R`$10 + 2\cdot\dfrac{6}{1 - 0.6} = 40$ m.`),
      P('core', 'num', 'Telescoping', R`Find $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n(n + 1)}$.`, 1, [R`$\dfrac1{n(n + 1)} = \dfrac1n - \dfrac1{n + 1}$.`], R`The partial sums are $1 - \dfrac1{N + 1} \to 1$.`),
      P('core', 'num', 'Taylor estimate', R`Use $\sin x \approx x - x^3/6$ to estimate $\sin 0.5$.`, 0.5 - 0.125 / 6, [R`Plug in.`], R`$0.5 - 0.02083 = 0.47917$ (true $0.47943$).`, { tol: 0.0005 }),
      P('core', 'num', 'Series limit', R`Find $\displaystyle\lim_{x\to0}\frac{x - \sin x}{x^3}$.`, 1 / 6, [R`$\sin x = x - x^3/6 + \dots$`], R`$\dfrac{x^3/6}{x^3} = \tfrac16$.`),
      P('core', 'num', 'Coefficient', R`Find the coefficient of $x^4$ in the Maclaurin series of $e^{2x}$.`, 16 / 24, [R`$e^{2x} = \sum(2x)^n/n!$.`], R`$2^4/4! = 16/24 = \tfrac23$.`),
      P('olympiad', 'num', 'Sum with n', R`Evaluate $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2^n}$.`, 2, [R`Differentiate $\sum x^n = \dfrac{1}{1 - x}$ and multiply by $x$.`], R`$\sum nx^n = \dfrac{x}{(1 - x)^2}$; at $x = \tfrac12$ this is 2.`),
      P('olympiad', 'num', 'Basel', R`Given $\sum_{n\ge1}1/n^2 = \pi^2/6$, find $\sum_{n\text{ odd}}1/n^2 = 1 + \tfrac19 + \tfrac1{25} + \dots$`, Math.PI * Math.PI / 8, [R`The even terms are $\sum1/(2m)^2 = \tfrac14\sum1/m^2$.`], R`$\tfrac34\cdot\tfrac{\pi^2}6 = \tfrac{\pi^2}8 \approx ${f(Math.PI * Math.PI / 8, 4)}$.`),
      P('olympiad', 'num', 'Approximating e', R`What is the smallest $n$ such that $\sum_{k=0}^{n}\dfrac1{k!}$ approximates $e$ with error below $10^{-6}$?`, 9, [R`The error is about $\dfrac1{(n + 1)!}\cdot\dfrac{n + 2}{n + 1}$.`], R`$1/10! \approx 2.8\times10^{-7}$ but $1/9! \approx 2.8\times10^{-6}$, so $n = 9$.`, { tol: 0.001 })
    ]
  });
  PB.addDrills('math-series', [
    { title: 'Geometric sum', gen: (r) => { const a = r.int(1, 9), d = r.int(2, 9); return { q: R`<p>Sum $${a} + \dfrac{${a}}{${d}} + \dfrac{${a}}{${d * d}} + \dots$</p>`, answer: a / (1 - 1 / d), tol: 0.002, solution: R`<p>$\dfrac{${a}}{1 - 1/${d}} = ${f(a / (1 - 1 / d), 5)}$.</p>` }; } },
    { title: 'Maclaurin coefficient', gen: (r) => { const k = r.int(2, 4), n = r.int(2, 5); return { q: R`<p>Coefficient of $x^${n}$ in the series for $e^{${k}x}$?</p>`, answer: Math.pow(k, n) / fact(n), tol: 0.002, solution: R`<p>$${k}^${n}/${n}! = ${f(Math.pow(k, n) / fact(n), 5)}$.</p>` }; } },
    { title: 'Binomial approximation', gen: (r) => { const x = r.step(0.01, 0.1, 0.01), n = r.pick([0.5, -1, 2, 3, -0.5]); return { q: R`<p>Estimate $(1 + ${x})^{${n}}$ with $1 + nx$.</p>`, answer: 1 + n * x, tol: 0.001, solution: R`<p>$1 + (${n})(${x}) = ${f(1 + n * x, 5)}$.</p>` }; } }
  ]);

  /* ===================== 8. Differential equations ===================== */
  PB.addChapter({
    id: 'math-odes', subject: 'maths', num: 9, part: 'Further Calculus',
    title: 'Differential Equations',
    subtitle: R`Equations for rates of change. Slope fields, separable and linear first-order equations, growth and decay, second-order equations with constant coefficients, and numerical solution.`,
    big: 'Nature usually tells us how things change, not what they are: "the rate of cooling is proportional to the temperature difference". A differential equation writes that rule down, and solving it predicts the whole future from the starting state.',
    goals: ['Read a slope field', 'Solve separable equations', 'Solve linear first-order equations with an integrating factor', 'Solve ay″ + by′ + cy = 0 and recognise oscillation and damping', 'Step an equation forward with Euler\u2019s method'],
    sections: [
      { title: 'What a differential equation says', html: R`
<p>A <strong>differential equation</strong> relates a function to its derivatives. The simplest, $\dfrac{\mathrm dy}{\mathrm dt} = ky$, says "the rate of growth is proportional to the size". Its solutions are $y = Ce^{kt}$: one curve for each starting value $C = y(0)$.</p>
<p>Without solving anything you can draw a <strong>slope field</strong>: at each point $(t, y)$ draw a short segment with the slope the equation demands. Solutions are curves that follow the segments, like leaves on a stream.</p>
<div data-fig="0"></div>
<p>An <strong>initial condition</strong> such as $y(0) = 3$ picks out one curve. Equilibrium solutions are where the slope is zero everywhere along a horizontal line, like $y = 0$ for $y' = ky$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`$\dfrac{\mathrm dy}{\mathrm dt} = 0.5y$ with $y(0) = 4$. What is $y(2)$?`, 4 * Math.E, [R`$y = 4e^{0.5t}$.`], R`$4e^1 \approx 10.87$.`)] },
      { title: 'Separable and linear first-order equations', html: R`
<p>If the equation can be written $\dfrac{\mathrm dy}{\mathrm dx} = g(x)h(y)$, <strong>separate</strong> the variables and integrate each side:</p>
$$\int\frac{\mathrm dy}{h(y)} = \int g(x)\,\mathrm dx.$$
<p><strong>Newton's cooling.</strong> $\dfrac{\mathrm dT}{\mathrm dt} = -k(T - T_{\text{room}})$ gives $T = T_{\text{room}} + (T_0 - T_{\text{room}})e^{-kt}$: the gap shrinks exponentially.</p>
<p><strong>Logistic growth.</strong> $\dfrac{\mathrm dP}{\mathrm dt} = rP(1 - P/K)$ separates (with partial fractions) to $P = \dfrac{K}{1 + Ae^{-rt}}$: an S-curve levelling off at $K$.</p>
<p>A <strong>linear</strong> equation $y' + p(x)y = q(x)$ is solved by multiplying by the <strong>integrating factor</strong> $\mu = e^{\int p\,\mathrm dx}$, which turns the left side into $(\mu y)'$. Then integrate.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Tea at 90 °C cools in a 20 °C room with $k = 0.1$ per minute. What is its temperature after 10 minutes?`, 20 + 70 * Math.exp(-1), [R`$T = 20 + 70e^{-0.1t}$.`], R`$20 + 70e^{-1} \approx 45.8$ °C.`)] },
      { title: 'Second-order equations: oscillation and damping', html: R`
<p>Newton's second law for a mass on a spring with friction gives $my'' + by' + ky = 0$. Try $y = e^{\lambda t}$: it works if $\lambda$ solves the <strong>characteristic equation</strong> $m\lambda^2 + b\lambda + k = 0$.</p>
<ul><li>Two real roots: $y = Ae^{\lambda_1t} + Be^{\lambda_2t}$ (overdamped: it oozes back).</li>
<li>A repeated root: $y = (A + Bt)e^{\lambda t}$ (critically damped: fastest return without overshoot).</li>
<li>Complex roots $\lambda = -\alpha \pm i\omega$: $y = e^{-\alpha t}(A\cos\omega t + B\sin\omega t)$ (underdamped: it rings and dies away).</li></ul>
<div data-fig="1"></div>
<p>With no damping, $y'' + \omega^2y = 0$ gives pure oscillation $y = A\cos\omega t + B\sin\omega t$: simple harmonic motion.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The characteristic equation of $y'' + 4y' + 13y = 0$ has roots $-2 \pm 3i$. The solution…`, ['grows exponentially', 'oscillates with growing amplitude', 'oscillates with decaying amplitude', 'decays without oscillating'], 2, [R`Real part negative, imaginary part non-zero.`], R`It oscillates with angular frequency 3 inside an envelope $e^{-2t}$.`)] },
      { title: 'Euler\u2019s method', html: R`
<p>Most differential equations have no formula solution. But you can always <strong>step</strong> forward: from $(t, y)$, move a small time $h$ along the current slope,</p>
$$y_{n+1} = y_n + h\,f(t_n, y_n).$$
<p>That is <strong>Euler's method</strong>. Its error is proportional to $h$, so halving the step roughly halves the error. Better schemes (Runge–Kutta) sample the slope at several points per step; their errors fall like $h^4$. Every planetarium, weather forecast and physics engine does this.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Use one Euler step of size $h = 0.1$ for $y' = y$, $y(0) = 1$. What is $y(0.1)$?`, 1.1, [R`$y_1 = 1 + 0.1\times1$.`], R`$1.1$ (true $e^{0.1} = 1.1052$).`)] }
    ],
    figures: [
      { s: 0, title: 'Slope field of the logistic equation', caption: 'Each dash shows the slope rP(1 − P/K). Solutions from any positive start bend towards K.', params: { controls: [S('r', 'r', 0.2, 2, 0.05, 0.8), S('P0', 'Start P₀', 0.05, 1.6, 0.05, 0.1)],
        draw: null,
        plots: [{ x: [0, 10], y: [0, 1.7], xlabel: 't', ylabel: 'P / K', n: 300, curves: (v) => { const segs = []; for (let i = 0; i <= 20; i++) for (let j = 0; j <= 8; j++) { const t0 = i * 0.5, p0 = j * 0.2 + 0.05, m = v.r * p0 * (1 - p0); segs.push({ f: (t) => p0 + m * (t - t0), from: t0 - 0.15, to: t0 + 0.15, color: 'ink3', width: 1.2 }); } segs.push({ f: (t) => 1 / (1 + (1 / v.P0 - 1) * Math.exp(-v.r * t)), color: 'rust', width: 2.6, label: 'solution' }); return segs; } }] } },
      { s: 2, title: 'Damped oscillator', caption: 'y″ + 2ζy′ + y = 0 from y = 1 at rest. ζ < 1 rings, ζ = 1 is critical, ζ > 1 oozes back.', params: { controls: [S('z', 'Damping ζ', 0, 2.5, 0.05, 0.2)],
        plots: [{ x: [0, 20], y: [-1.05, 1.05], zero: false, xlabel: 't', ylabel: 'y', curves: (v) => [{ f: (t) => { const z = v.z; if (Math.abs(z - 1) < 1e-3) return (1 + t) * Math.exp(-t); if (z < 1) { const w = Math.sqrt(1 - z * z); return Math.exp(-z * t) * (Math.cos(w * t) + z / w * Math.sin(w * t)); } const s = Math.sqrt(z * z - 1), l1 = -z + s, l2 = -z - s; const A = -l2 / (l1 - l2), B = 1 - A; return A * Math.exp(l1 * t) + B * Math.exp(l2 * t); } }, { f: (t) => Math.exp(-v.z * t), color: 'ink3', dash: [4, 4], label: 'envelope' }] }],
        readout: (v) => [['regime', v.z < 1 ? 'underdamped' : Math.abs(v.z - 1) < 0.03 ? 'critically damped' : 'overdamped']] } }
    ],
    labs: [
      { sim: 'explore', title: 'Euler against the exact solution', desc: 'Solve y′ = −2ty, y(0) = 1 (exact: e^{−t²}) with Euler steps of size h.',
        tasks: ['Halve h. Does the error halve?', 'Make h large (0.6). What goes wrong?'],
        params: { aspect: 0.45, controls: [S('h', 'Step h', 0.02, 0.8, 0.01, 0.25)],
          plots: [{ x: [0, 3], y: [-0.3, 1.1], zero: false, xlabel: 't', ylabel: 'y', n: 300, curves: (v) => { const pts = [[0, 1]]; let t = 0, y = 1; while (t < 3) { y = y + v.h * (-2 * t * y); t += v.h; pts.push([t, y]); } return [{ f: (x) => Math.exp(-x * x), label: 'exact' }, { f: (x) => { const i = Math.min(pts.length - 2, Math.floor(x / v.h)); const a = pts[i], b = pts[i + 1]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); }, color: 'rust', label: 'Euler' }]; }, pts: (v) => { const p = []; let t = 0, y = 1; while (t <= 3) { p.push({ x: t, y: y, r: 3, color: 'rust' }); y = y + v.h * (-2 * t * y); t += v.h; } return p; } }],
          readout: (v) => { let t = 0, y = 1; while (t < 1 - 1e-9) { y += v.h * (-2 * t * y); t += v.h; } return [['Euler y(≈1)', f(y, 5)], ['exact e⁻¹', f(Math.exp(-1), 5)]]; } } },
      { sim: 'explore', title: 'Predator and prey phase plane', desc: 'x′ = ax − bxy, y′ = −cy + dxy. Plotting y against x shows closed loops: the populations cycle for ever.',
        tasks: ['Start near the equilibrium (c/d, a/b). What happens?', 'Start far away. How does the loop change?'],
        params: { aspect: 0.5, controls: [S('x0', 'Prey start', 0.5, 6, 0.1, 3), S('y0', 'Predator start', 0.5, 6, 0.1, 1)],
          plots: [{ x: [0, 9], y: [0, 7], xlabel: 'prey x', ylabel: 'predators y', n: 2, curves: () => [], pts: (v) => { const p = []; let x = v.x0, y = v.y0; const dt = 0.01; for (let i = 0; i < 2400; i++) { const k1x = x - 0.5 * x * y, k1y = -y + 0.5 * x * y; const xm = x + k1x * dt / 2, ym = y + k1y * dt / 2; x += (xm - 0.5 * xm * ym) * dt; y += (-ym + 0.5 * xm * ym) * dt; if (i % 12 === 0) p.push({ x: x, y: y, r: 1.8, ring: false, color: 'accent' }); } p.push({ x: 2, y: 2, r: 5, color: 'rust', label: 'equilibrium' }); return p; } }] } }
    ],
    formulas: [['Exponential growth', 'y\' = ky \\Rightarrow y = y_0e^{kt}'], ['Separable', '\\int\\dfrac{\\mathrm dy}{h(y)} = \\int g(x)\\,\\mathrm dx'], ['Integrating factor', 'y\' + py = q:\\ \\mu = e^{\\int p},\\ (\\mu y)\' = \\mu q'], ['Characteristic equation', 'ay\'\' + by\' + cy = 0 \\to a\\lambda^2 + b\\lambda + c = 0'], ['Complex roots', '\\lambda = -\\alpha \\pm i\\omega \\Rightarrow y = e^{-\\alpha t}(A\\cos\\omega t + B\\sin\\omega t)'], ['Euler step', 'y_{n+1} = y_n + hf(t_n, y_n)']],
    problems: [
      P('concept', 'mcq', 'Order', R`What is the order of $y''' + 3y' = \sin x$?`, 2, [R`The highest derivative.`], R`Third order.`, { options: ['first', 'second', 'third', 'it depends on $x$'] }),
      P('concept', 'mcq', 'Equilibrium', R`For $\dfrac{\mathrm dP}{\mathrm dt} = 0.3P(1 - P/500)$, the stable equilibrium is…`, 2, [R`Where is the slope zero, and which way do nearby solutions move?`], R`$P = 500$: below it $P$ grows, above it $P$ shrinks.`, { options: ['0', '250', '500', '0.3'] }),
      P('concept', 'mcq', 'Checking a solution', R`Which function satisfies $y'' = -9y$?`, 1, [R`Differentiate twice.`], R`$\cos3x$: $(\cos3x)'' = -9\cos3x$.`, { options: ['$e^{3x}$', '$\\cos3x$', '$\\sin9x$', '$x^3$'] }),
      P('concept', 'mcq', 'Euler accuracy', R`Halving the step size in Euler's method roughly…`, 1, [R`Euler is first order.`], R`Halves the error.`, { options: ['quarters the error', 'halves the error', 'leaves the error unchanged', 'doubles the error'] }),
      P('core', 'num', 'Half-life', R`A substance decays as $\dfrac{\mathrm dN}{\mathrm dt} = -0.05N$ (per year). What is its half-life in years?`, Math.log(2) / 0.05, [R`$N = N_0e^{-0.05t} = N_0/2$.`], R`$t = \ln2/0.05 = ${f(Math.log(2) / 0.05, 4)}$ years.`),
      P('core', 'num', 'Separable', R`Solve $\dfrac{\mathrm dy}{\mathrm dx} = xy^2$ with $y(0) = 1$, and find $y(1)$.`, 2, [R`$\int y^{-2}\mathrm dy = \int x\,\mathrm dx$ gives $-1/y = x^2/2 + C$.`], R`$C = -1$, so $y = \dfrac{1}{1 - x^2/2}$ and $y(1) = 2$.`),
      P('core', 'num', 'Integrating factor', R`Solve $y' + y = e^{x}$ with $y(0) = 0$, and find $y(1)$.`, (Math.E - 1 / Math.E) / 2, [R`$\mu = e^x$: $(e^xy)' = e^{2x}$.`], R`$e^xy = \tfrac12(e^{2x} - 1)$, so $y = \sinh x$ and $y(1) = ${f((Math.E - 1 / Math.E) / 2, 4)}$.`),
      P('core', 'num', 'Oscillation period', R`$y'' + 25y = 0$. What is the period of the oscillation?`, 2 * Math.PI / 5, [R`$\omega = 5$.`], R`$T = 2\pi/5 \approx 1.257$.`),
      P('core', 'num', 'Logistic', R`$\dfrac{\mathrm dP}{\mathrm dt} = P(1 - P/100)$ with $P(0) = 10$. Find $P(2)$.`, 100 / (1 + 9 * Math.exp(-2)), [R`$P = \dfrac{100}{1 + Ae^{-t}}$ with $A = 9$.`], R`$P(2) = \dfrac{100}{1 + 9e^{-2}} = ${f(100 / (1 + 9 * Math.exp(-2)), 4)}$.`),
      P('olympiad', 'num', 'Critical damping', R`A 2 kg mass hangs on a spring with $k = 50$ N/m. What damping constant $b$ (in N s/m) makes it critically damped?`, 2 * Math.sqrt(100), [R`Critical when the characteristic equation $2\lambda^2 + b\lambda + 50 = 0$ has a repeated root.`], R`$b^2 = 4mk = 400$, so $b = 20$ N s/m.`),
      P('olympiad', 'num', 'Draining tank', R`Water drains from a tank so that $\dfrac{\mathrm dh}{\mathrm dt} = -0.2\sqrt h$ (h in m, t in min). If $h(0) = 4$ m, when is it empty?`, 20, [R`Separate: $\int h^{-1/2}\mathrm dh = -0.2\int\mathrm dt$.`], R`$2\sqrt h = 4 - 0.2t$, which is zero at $t = 20$ min (Torricelli's law).`),
      P('olympiad', 'num', 'Resonant forcing', R`Find the steady-state amplitude of $y'' + 0.2y' + y = \cos t$.`, 5, [R`Try $y = A\cos t + B\sin t$.`, R`At resonance only the damping term survives.`], R`Substituting gives $0.2B = 1$, $A = 0$: amplitude $1/0.2 = 5$.`)
    ]
  });
  PB.addDrills('math-odes', [
    { title: 'Exponential growth', gen: (r) => { const k = r.step(0.1, 0.9, 0.1), y0 = r.int(1, 9), t = r.int(1, 5); return { q: R`<p>$y' = ${k}y$, $y(0) = ${y0}$. Find $y(${t})$.</p>`, answer: y0 * Math.exp(k * t), tol: 0.003, solution: R`<p>$${y0}e^{${f(k * t)}} = ${f(y0 * Math.exp(k * t), 5)}$.</p>` }; } },
    { title: 'Euler step', gen: (r) => { const a = r.int(1, 4), y0 = r.int(1, 5), h = r.pick([0.1, 0.2, 0.5]); return { q: R`<p>One Euler step of size ${h} for $y' = ${a}y$ from $y(0) = ${y0}$. Find $y_1$.</p>`, answer: y0 * (1 + a * h), tol: 0.001, solution: R`<p>$${y0} + ${h}\times${a}\times${y0} = ${f(y0 * (1 + a * h), 5)}$.</p>` }; } },
    { title: 'Oscillation frequency', gen: (r) => { const k = r.int(1, 12), m = r.int(1, 6); return { q: R`<p>$${m}y'' + ${k * k}y = 0$. Find the angular frequency $\omega$.</p>`, answer: k / Math.sqrt(m), tol: 0.003, solution: R`<p>$\omega = \sqrt{${k * k}/${m}} = ${f(k / Math.sqrt(m), 4)}$.</p>` }; } }
  ]);

  /* ===================== 9. Several variables ===================== */
  PB.addChapter({
    id: 'math-multivar', subject: 'maths', num: 10, part: 'Further Calculus',
    title: 'Calculus in Several Variables',
    subtitle: R`Functions of two or more inputs. Contour maps, partial derivatives, the gradient, optimisation with Lagrange multipliers, and double integrals.`,
    big: 'With two inputs a function is a landscape. A partial derivative is the slope if you walk due east or due north; the gradient is an arrow pointing straight uphill. Most of physics lives in this world of fields over space.',
    goals: ['Read contour plots', 'Compute partial derivatives', 'Use the gradient for directional slopes and steepest ascent', 'Find critical points and optimise with constraints', 'Evaluate double integrals over rectangles and simple regions'],
    sections: [
      { title: 'Landscapes and contour maps', html: R`
<p>A function $f(x, y)$ assigns a height to every point of the plane. Its graph is a surface. A <strong>contour map</strong> draws the curves where $f$ is constant, like the lines on a hiking map: where contours crowd together the ground is steep.</p>
<p>Examples: $f = x^2 + y^2$ is a bowl with circular contours; $f = x^2 - y^2$ is a saddle with hyperbolic contours; $f = e^{-(x^2 + y^2)}$ is a smooth hill.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The contours of $f(x, y) = 2x + 3y$ are…`, ['circles', 'parallel straight lines', 'hyperbolas', 'parabolas'], 1, [R`Set $2x + 3y = c$.`], R`Parallel lines with slope $-2/3$: a tilted plane.`)] },
      { title: 'Partial derivatives', html: R`
<p>Freeze $y$ and differentiate with respect to $x$: that is the <strong>partial derivative</strong> $\dfrac{\partial f}{\partial x}$, the slope walking in the $x$ direction. Likewise $\dfrac{\partial f}{\partial y}$.</p>
<p>For $f = x^2y + 3y^3$: $f_x = 2xy$, $f_y = x^2 + 9y^2$. Second derivatives $f_{xx}, f_{yy}, f_{xy}$ follow the same way, and for smooth functions $f_{xy} = f_{yx}$.</p>
<p>A small change in both inputs changes $f$ by about</p>
$$\Delta f \approx f_x\,\Delta x + f_y\,\Delta y,$$
<p>which is the basis of error propagation in experiments.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For $f(x, y) = x^3y^2$, find $f_x$ at $(1, 2)$.`, 12, [R`Treat $y$ as a constant: $f_x = 3x^2y^2$.`], R`$3\cdot1\cdot4 = 12$.`)] },
      { title: 'The gradient', html: R`
<p>Collect the partials into a vector, the <strong>gradient</strong>: $\nabla f = (f_x, f_y)$. It has two jobs:</p>
<div class="key"><p>The slope in the direction of a unit vector $\hat u$ is $\nabla f\cdot\hat u$.<br>$\nabla f$ points in the direction of <strong>steepest ascent</strong>, its length is that steepest slope, and it is perpendicular to the contours.</p></div>
<p>In physics, force is minus the gradient of potential energy, $\vec F = -\nabla U$: a ball rolls straight downhill.</p>
<p>At a peak, pit or saddle, $\nabla f = \vec 0$. Classify with $D = f_{xx}f_{yy} - f_{xy}^2$: $D > 0$ and $f_{xx} > 0$ is a minimum, $D > 0$ and $f_{xx} < 0$ a maximum, $D < 0$ a saddle.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For $f = x^2 + 3y^2$, what is the steepest slope at $(1, 1)$, i.e. $|\nabla f|$?`, Math.sqrt(4 + 36), [R`$\nabla f = (2x, 6y) = (2, 6)$.`], R`$\sqrt{4 + 36} = \sqrt{40} \approx 6.32$.`)] },
      { title: 'Constraints and double integrals', html: R`
<p><strong>Lagrange multipliers.</strong> To optimise $f$ subject to a constraint $g = c$, look for points where the gradients are parallel: $\nabla f = \lambda\nabla g$. Geometrically, the best point is where a contour of $f$ just touches the constraint curve.</p>
<p>Example: maximise $xy$ with $x + y = 10$. $\nabla f = (y, x)$, $\nabla g = (1, 1)$, so $y = x = 5$ and the maximum is 25.</p>
<p><strong>Double integrals</strong> add up $f$ over a region: $\iint_R f\,\mathrm dA$, the volume under the surface. Over a rectangle, integrate one variable at a time:</p>
$$\int_0^2\!\!\int_0^1(x + y)\,\mathrm dy\,\mathrm dx = \int_0^2\left(x + \tfrac12\right)\mathrm dx = 3.$$
<p>For circles use polar coordinates, with $\mathrm dA = r\,\mathrm dr\,\mathrm d\theta$. That trick gives the famous $\int_{-\infty}^{\infty}e^{-x^2}\mathrm dx = \sqrt\pi$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Evaluate $\int_0^1\!\int_0^1 xy\,\mathrm dy\,\mathrm dx$.`, 0.25, [R`It factorises: $\left(\int_0^1x\,\mathrm dx\right)\left(\int_0^1y\,\mathrm dy\right)$.`], R`$\tfrac12\cdot\tfrac12 = \tfrac14$.`)] }
    ],
    figures: [
      { s: 0, title: 'Contour map', caption: 'Contours of three surfaces. The dot shows a point and the arrow its gradient: always perpendicular to the contour, pointing uphill.', params: { aspect: 0.55, picFrac: 1, controls: [{ type: 'select', id: 'fn', label: 'Surface', value: 'saddle', options: [['bowl', 'bowl x² + y²'], ['saddle', 'saddle x² − y²'], ['hill', 'hills e^{−r²} bumps']] }, S('px', 'Point x', -1.8, 1.8, 0.05, 0.8), S('py', 'Point y', -1.8, 1.8, 0.05, 0.4)],
        draw: (ctx, C, v, b, U) => { const F = { bowl: (x, y) => x * x + y * y, saddle: (x, y) => x * x - y * y, hill: (x, y) => Math.exp(-((x - 0.7) * (x - 0.7) + y * y) * 2) + 0.8 * Math.exp(-((x + 0.8) * (x + 0.8) + (y - 0.6) * (y - 0.6)) * 2) }[v.fn]; const sz = Math.min(b.w, b.h) - 20, ox = b.x + (b.w - sz) / 2, oy = b.y + 10, N = 90, sc = sz / 4; const toX = (x) => ox + (x + 2) * sc, toY = (y) => oy + (2 - y) * sc; let lo = Infinity, hi = -Infinity; const grid = []; for (let i = 0; i <= N; i++) { grid.push([]); for (let j = 0; j <= N; j++) { const val = F(-2 + 4 * i / N, -2 + 4 * j / N); grid[i].push(val); lo = Math.min(lo, val); hi = Math.max(hi, val); } } const cell = sz / N; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const t = (grid[i][j] - lo) / (hi - lo); ctx.fillStyle = 'hsla(' + (240 - 200 * t) + ',70%,55%,0.28)'; ctx.fillRect(ox + i * cell, oy + sz - (j + 1) * cell, cell + 0.5, cell + 0.5); } ctx.strokeStyle = U.alpha(C.ink, 0.55); ctx.lineWidth = 1; for (let k = 1; k < 12; k++) { const c = lo + (hi - lo) * k / 12; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = grid[i][j] - c, bb = grid[i + 1][j] - c, cc = grid[i][j + 1] - c; if (a * bb < 0 || a * cc < 0) { ctx.fillStyle = U.alpha(C.ink, 0.55); ctx.fillRect(ox + i * cell, oy + sz - (j + 1) * cell, 1.2, 1.2); } } } const e = 1e-4, gx = (F(v.px + e, v.py) - F(v.px - e, v.py)) / (2 * e), gy = (F(v.px, v.py + e) - F(v.px, v.py - e)) / (2 * e), L = Math.hypot(gx, gy) || 1, k = 0.5; const x0 = toX(v.px), y0 = toY(v.py), x1 = toX(v.px + k * gx / L), y1 = toY(v.py + k * gy / L); ctx.strokeStyle = C.rust; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const ang = Math.atan2(y1 - y0, x1 - x0); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 9 * Math.cos(ang - 0.4), y1 - 9 * Math.sin(ang - 0.4)); ctx.lineTo(x1 - 9 * Math.cos(ang + 0.4), y1 - 9 * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fillStyle = C.rust; ctx.fill(); U.dot(ctx, x0, y0, 5, C.points, C.ink); U.text(ctx, '∇f = (' + f(gx) + ', ' + f(gy) + ')', x0 + 8, y0 + 18, C.ink, U.ui(12, 700)); } } }
    ],
    labs: [
      { sim: 'explore', title: 'Lagrange multipliers: the fence problem', desc: 'Maximise the area xy of a rectangle with perimeter constraint 2x + 2y = P. The best rectangle is where the hyperbola xy = A just touches the constraint line.',
        tasks: ['Slide x until the area peaks. What shape is the rectangle?', 'Show that at the best point ∇(xy) is parallel to ∇(2x + 2y).'],
        params: { aspect: 0.5, controls: [S('P', 'Perimeter P', 4, 40, 1, 20), S('x', 'Width x', 0.2, 19.8, 0.1, 3)],
          plots: [{ x: [0, 20], y: [0, 20], xlabel: 'x', ylabel: 'y', curves: (v) => { const x = Math.min(v.x, v.P / 2 - 0.05), A = x * (v.P / 2 - x), Am = v.P * v.P / 16; return [{ f: (t) => v.P / 2 - t, label: 'constraint', from: 0, to: v.P / 2 }, { f: (t) => A / t, color: 'rust', label: 'xy = current area', from: 0.2, to: 20 }, { f: (t) => Am / t, color: 'teal', dash: [4, 4], label: 'xy = max', from: 0.2, to: 20 }]; }, pts: (v) => { const x = Math.min(v.x, v.P / 2 - 0.05); return [{ x: x, y: v.P / 2 - x }]; } }],
          readout: (v) => { const x = Math.min(v.x, v.P / 2 - 0.05); return [['area', f(x * (v.P / 2 - x))], ['best (square)', f(v.P * v.P / 16) + ' at x = y = ' + f(v.P / 4)]]; } } },
      { sim: 'explore', title: 'Volume under a surface', desc: 'Approximate ∬ over the unit square of f(x, y) = x² + y² with an n × n grid of columns. The exact value is 2/3.',
        tasks: ['How fast does the midpoint estimate approach 2/3 as n grows?', 'Why does the midpoint rule beat corner sampling?'],
        params: { aspect: 0.4, controls: [S('n', 'Grid n × n', 1, 40, 1, 4)],
          plots: [{ x: [1, 40], y: [-0.2, 0.05], zero: false, xlabel: 'n', ylabel: 'estimate − 2/3', n: 40, curves: () => [{ f: (n) => { n = Math.round(n); let s = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = (i + 0.5) / n, y = (j + 0.5) / n; s += (x * x + y * y) / (n * n); } return s - 2 / 3; }, label: 'midpoint' }, { f: (n) => { n = Math.round(n); let s = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = i / n, y = j / n; s += (x * x + y * y) / (n * n); } return s - 2 / 3; }, color: 'rust', label: 'lower corner' }], vlines: (v) => [{ x: v.n }] }],
          readout: (v) => { let s = 0; for (let i = 0; i < v.n; i++) for (let j = 0; j < v.n; j++) { const x = (i + 0.5) / v.n, y = (j + 0.5) / v.n; s += (x * x + y * y) / (v.n * v.n); } return [['midpoint estimate', f(s, 6)], ['exact', f(2 / 3, 6)]]; } } }
    ],
    formulas: [['Partial derivative', '\\dfrac{\\partial f}{\\partial x} = \\lim_{h\\to0}\\dfrac{f(x + h, y) - f(x, y)}h'], ['Total change', '\\Delta f \\approx f_x\\Delta x + f_y\\Delta y'], ['Gradient', '\\nabla f = (f_x, f_y),\\ D_{\\hat u}f = \\nabla f\\cdot\\hat u'], ['Second-derivative test', 'D = f_{xx}f_{yy} - f_{xy}^2'], ['Lagrange', '\\nabla f = \\lambda\\nabla g'], ['Polar area element', '\\mathrm dA = r\\,\\mathrm dr\\,\\mathrm d\\theta'], ['Gaussian integral', '\\int_{-\\infty}^{\\infty}e^{-x^2}\\mathrm dx = \\sqrt\\pi']],
    problems: [
      P('concept', 'mcq', 'Gradient direction', R`The gradient of $f$ at a point is…`, 2, [R`Think of a hill.`], R`Perpendicular to the contour through that point, pointing uphill.`, { options: ['tangent to the contour', 'zero everywhere on a hill', 'perpendicular to the contour', 'always horizontal'] }),
      P('concept', 'mcq', 'Saddle', R`At a critical point $D = f_{xx}f_{yy} - f_{xy}^2 < 0$. The point is…`, 2, [R`Curving up one way and down another.`], R`A saddle.`, { options: ['a maximum', 'a minimum', 'a saddle', 'impossible to classify'] }),
      P('concept', 'mcq', 'Mixed partials', R`For $f = x^2y^3$, $f_{xy} = $`, 1, [R`$f_x = 2xy^3$, then differentiate in $y$.`], R`$6xy^2$.`, { options: ['$2xy^3$', '$6xy^2$', '$3x^2y^2$', '$6x^2y$'] }),
      P('concept', 'mcq', 'Polar coordinates', R`In polar coordinates the area element $\mathrm dA$ is…`, 3, [R`A small polar box has sides $\mathrm dr$ and $r\,\mathrm d\theta$.`], R`$r\,\mathrm dr\,\mathrm d\theta$.`, { options: ['$\\mathrm dr\\,\\mathrm d\\theta$', '$r^2\\mathrm dr\\,\\mathrm d\\theta$', '$\\mathrm dr/r$', '$r\\,\\mathrm dr\\,\\mathrm d\\theta$'] }),
      P('core', 'num', 'Directional slope', R`For $f(x, y) = x^2y$, find the slope at $(1, 2)$ in the direction of $(3, 4)$.`, (4 * 3 + 1 * 4) / 5, [R`$\nabla f = (2xy, x^2) = (4, 1)$; unit vector $(0.6, 0.8)$.`], R`$4(0.6) + 1(0.8) = 3.2$.`),
      P('core', 'num', 'Critical point', R`Find the minimum value of $f(x, y) = x^2 + y^2 - 4x + 6y + 20$.`, 7, [R`Complete the squares, or set $\nabla f = 0$.`], R`$(x - 2)^2 + (y + 3)^2 + 7$: minimum 7 at $(2, -3)$.`),
      P('core', 'num', 'Lagrange', R`Maximise $x + y$ subject to $x^2 + y^2 = 8$.`, 4, [R`$\nabla(x + y) = \lambda\nabla(x^2 + y^2)$ gives $x = y$.`], R`$x = y = 2$, so the maximum is 4.`),
      P('core', 'num', 'Double integral', R`Evaluate $\int_0^2\!\int_0^3(x^2 + y)\,\mathrm dy\,\mathrm dx$.`, 3 * 8 / 3 + 2 * 4.5, [R`Inner integral: $3x^2 + 4.5$.`], R`$\int_0^2(3x^2 + 4.5)\,\mathrm dx = 8 + 9 = 17$.`),
      P('core', 'num', 'Error propagation', R`$V = \pi r^2h$ with $r = 2.0$ cm and $h = 5.0$ cm. If $r$ increases by 0.1 cm and $h$ by 0.2 cm, estimate the increase in $V$ (cm³).`, Math.PI * (2 * 2 * 5 * 0.1 + 4 * 0.2), [R`$\Delta V \approx 2\pi rh\,\Delta r + \pi r^2\Delta h$.`], R`$2\pi(10)(0.1) + \pi(4)(0.2) = 2.8\pi \approx ${f(2.8 * Math.PI, 4)}$ cm³.`),
      P('olympiad', 'num', 'Polar integral', R`Evaluate $\iint e^{-(x^2 + y^2)}\,\mathrm dA$ over the whole plane.`, Math.PI, [R`In polar: $\int_0^{2\pi}\!\int_0^\infty e^{-r^2}r\,\mathrm dr\,\mathrm d\theta$.`], R`$2\pi\cdot\tfrac12 = \pi$. Its square root gives $\int e^{-x^2}\mathrm dx = \sqrt\pi$.`),
      P('olympiad', 'num', 'Box in a sphere', R`Find the largest volume of a rectangular box inscribed in a sphere of radius 1.`, 8 / (3 * Math.sqrt(3)), [R`Maximise $8xyz$ with $x^2 + y^2 + z^2 = 1$.`, R`Symmetry: $x = y = z = 1/\sqrt3$.`], R`A cube of side $2/\sqrt3$: volume $\dfrac{8}{3\sqrt3} \approx ${f(8 / (3 * Math.sqrt(3)), 4)}$.`),
      P('olympiad', 'num', 'Least squares line', R`Fit $y = mx$ (through the origin) to the points (1, 2), (2, 3), (3, 7) by minimising $\sum(y_i - mx_i)^2$. Find $m$.`, (2 + 6 + 21) / 14, [R`Differentiate with respect to $m$ and set to zero.`], R`$m = \dfrac{\sum x_iy_i}{\sum x_i^2} = \dfrac{29}{14} \approx ${f(29 / 14, 4)}$.`)
    ]
  });
  PB.addDrills('math-multivar', [
    { title: 'Partial derivative', gen: (r) => { const a = r.int(1, 4), b = r.int(1, 3), x = r.int(1, 3), y = r.int(1, 3); return { q: R`<p>$f = x^${a}y^${b}$. Find $f_x$ at $(${x}, ${y})$.</p>`, answer: a * Math.pow(x, a - 1) * Math.pow(y, b), tol: 0.001, solution: R`<p>$f_x = ${a}x^{${a - 1}}y^{${b}} = ${a * Math.pow(x, a - 1) * Math.pow(y, b)}$.</p>` }; } },
    { title: 'Gradient length', gen: (r) => { const a = r.int(1, 5), b = r.int(1, 5), x = r.int(-3, 3), y = r.int(-3, 3) || 1; const g = Math.hypot(2 * a * x, 2 * b * y); return { q: R`<p>$f = ${a}x^2 + ${b}y^2$. Find $|\nabla f|$ at $(${x}, ${y})$.</p>`, answer: g, tol: 0.002, solution: R`<p>$\nabla f = (${2 * a * x}, ${2 * b * y})$, length $${f(g, 4)}$.</p>` }; } },
    { title: 'Rectangle integral', gen: (r) => { const a = r.int(1, 4), b = r.int(1, 4), c = r.int(1, 3); const val = c * a * a / 2 * b + a * b * b / 2; return { q: R`<p>Evaluate $\int_0^{${a}}\!\int_0^{${b}}(${c}x + y)\,\mathrm dy\,\mathrm dx$.</p>`, answer: val, tol: 0.002, solution: R`<p>$${c}\cdot\tfrac{${a}^2}{2}\cdot${b} + ${a}\cdot\tfrac{${b}^2}2 = ${f(val, 5)}$.</p>` }; } }
  ]);

  /* ===================== 10. Complex numbers ===================== */
  PB.addChapter({
    id: 'math-complex', subject: 'maths', num: 12, part: 'Further Calculus',
    title: 'Complex Numbers',
    subtitle: R`Numbers with a square root of −1. Arithmetic, the complex plane, modulus and argument, Euler's formula, de Moivre's theorem and roots of unity.`,
    big: 'Allow one new number, i, with i² = −1, and suddenly every polynomial has roots, rotations become multiplications, and sines and exponentials turn out to be the same thing: e^{iθ} = cos θ + i sin θ.',
    goals: ['Add, multiply and divide complex numbers', 'Plot numbers on the Argand diagram and use modulus and argument', 'Use Euler\u2019s formula and polar form', 'Apply de Moivre\u2019s theorem', 'Find and use roots of unity'],
    sections: [
      { title: 'A new number', html: R`
<p>The equation $x^2 = -1$ has no real solution. Invent one: $i$, with $i^2 = -1$. A <strong>complex number</strong> is $z = a + bi$ with real part $a$ and imaginary part $b$. Arithmetic is ordinary algebra plus $i^2 = -1$:</p>
$$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 5 + i.$$
<p>The <strong>conjugate</strong> of $z = a + bi$ is $\bar z = a - bi$, and $z\bar z = a^2 + b^2$ is real. That is how to divide: multiply top and bottom by the conjugate of the bottom.</p>
$$\frac{1}{1 + i} = \frac{1 - i}{(1 + i)(1 - i)} = \frac{1 - i}{2}.$$
<p>Now every quadratic has roots: $x^2 + 2x + 5 = 0$ gives $x = -1 \pm 2i$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Compute the real part of $(3 + 2i)(3 - 2i)$.`, 13, [R`$z\bar z = a^2 + b^2$.`], R`$9 + 4 = 13$ (and the imaginary part is 0).`)] },
      { title: 'The complex plane', html: R`
<p>Plot $a + bi$ as the point $(a, b)$: the <strong>Argand diagram</strong>. Adding complex numbers adds them like vectors. The distance from 0 is the <strong>modulus</strong> $|z| = \sqrt{a^2 + b^2}$, and the angle from the positive real axis is the <strong>argument</strong> $\arg z$.</p>
<p>So $z = r(\cos\theta + i\sin\theta)$, the <strong>polar form</strong>. Multiplying two complex numbers <em>multiplies</em> their moduli and <em>adds</em> their arguments. Multiplying by $i$ (modulus 1, argument 90°) rotates by a quarter turn.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $|3 - 4i|$.`, 5, [R`$\sqrt{3^2 + 4^2}$.`], R`5.`)] },
      { title: 'Euler\u2019s formula', html: R`
<p>Put $ix$ into the series $e^x = 1 + x + x^2/2! + \dots$ and sort the terms (Chapter 7):</p>
<div class="key"><p>$$e^{i\theta} = \cos\theta + i\sin\theta.$$ At $\theta = \pi$: $e^{i\pi} + 1 = 0$, linking the five most famous numbers in mathematics.</p></div>
<p>So polar form is simply $z = re^{i\theta}$, and the rule "multiply moduli, add arguments" is just $e^{i\alpha}e^{i\beta} = e^{i(\alpha + \beta)}$. Raising to a power gives <strong>de Moivre's theorem</strong>:</p>
$$(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta.$$
<p>Expanding the left side with the binomial theorem gives multiple-angle formulas for free: $n = 2$ gives $\cos2\theta = \cos^2\theta - \sin^2\theta$ and $\sin2\theta = 2\sin\theta\cos\theta$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Compute the real part of $(1 + i)^8$.`, 16, [R`$1 + i = \sqrt2e^{i\pi/4}$.`], R`$(\sqrt2)^8e^{2\pi i} = 16$.`)] },
      { title: 'Roots of unity', html: R`
<p>The solutions of $z^n = 1$ are $z = e^{2\pi ik/n}$ for $k = 0, 1, \dots, n - 1$: $n$ points equally spaced round the unit circle, the corners of a regular $n$-gon.</p>
<div data-fig="1"></div>
<p>They add to zero (the polygon is balanced around its centre), which gives sums like $\cos\frac{2\pi}5 + \cos\frac{4\pi}5 = -\frac12$. More generally the $n$ roots of $z^n = w$ are spaced at angles $2\pi/n$ around a circle of radius $|w|^{1/n}$.</p>
<p>Complex numbers are central in olympiad geometry (rotations), physics (waves and AC circuits use $e^{i\omega t}$) and in the fast Fourier transform.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many of the six solutions of $z^6 = 64$ have positive real part?`, 3, [R`They are $2e^{i\pi k/3}$ for $k = 0, \dots, 5$.`, R`Which angles $0^\circ, 60^\circ, \dots, 300^\circ$ have positive cosine?`], R`Positive real part needs $\cos(60^\circ k) > 0$: $k = 0, 1, 5$, so there are 3.`, { tol: 0.001 })] }
    ],
    figures: [
      { s: 1, title: 'Multiplying is rotating and scaling', caption: 'z·w has modulus |z||w| and argument arg z + arg w.', params: { picFrac: 1, aspect: 0.5, controls: [S('r1', '|z|', 0.3, 1.6, 0.05, 1.2), S('a1', 'arg z', 0, 360, 1, 30, '°'), S('r2', '|w|', 0.3, 1.6, 0.05, 1.5), S('a2', 'arg w', 0, 360, 1, 60, '°')],
        draw: (ctx, C, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, sc = Math.min(b.w, b.h) / 5.6; ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(b.x + 10, cy); ctx.lineTo(b.x + b.w - 10, cy); ctx.moveTo(cx, b.y + 5); ctx.lineTo(cx, b.y + b.h - 5); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, sc, 0, 7); ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); U.text(ctx, 'Re', b.x + b.w - 26, cy - 6, C.ink3, U.ui(11)); U.text(ctx, 'Im', cx + 6, b.y + 16, C.ink3, U.ui(11)); const d = Math.PI / 180; const pts = [[v.r1, v.a1, C.accent, 'z'], [v.r2, v.a2, C.teal, 'w'], [v.r1 * v.r2, v.a1 + v.a2, C.rust, 'zw']]; pts.forEach((p) => { const x = cx + p[0] * Math.cos(p[1] * d) * sc, y = cy - p[0] * Math.sin(p[1] * d) * sc; ctx.strokeStyle = p[2]; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); U.dot(ctx, x, y, 5, p[2], C.ink); U.text(ctx, p[3], x + 7, y - 6, p[2], U.ui(13, 700)); }); },
        readout: (v) => [['zw modulus', f(v.r1 * v.r2)], ['zw argument', f((v.a1 + v.a2) % 360) + '°']] } },
      { s: 3, title: 'Roots of unity', caption: 'The n solutions of zⁿ = 1 form a regular polygon on the unit circle. Their sum is always zero.', params: { picFrac: 1, aspect: 0.5, controls: [S('n', 'n', 2, 12, 1, 5)],
        draw: (ctx, C, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, r = Math.min(b.w, b.h) * 0.4; ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - r - 10, cy); ctx.lineTo(cx + r + 10, cy); ctx.moveTo(cx, cy - r - 10); ctx.lineTo(cx, cy + r + 10); ctx.stroke(); ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= v.n; k++) { const t = 2 * Math.PI * k / v.n; ctx.lineTo(cx + r * Math.cos(t), cy - r * Math.sin(t)); } ctx.stroke(); for (let k = 0; k < v.n; k++) { const t = 2 * Math.PI * k / v.n; U.dot(ctx, cx + r * Math.cos(t), cy - r * Math.sin(t), 5, C.points, C.ink); U.text(ctx, 'ω' + (k ? '^' + k : '⁰'), cx + (r + 16) * Math.cos(t) - 6, cy - (r + 16) * Math.sin(t) + 4, C.ink2, U.ui(11)); } },
        readout: (v) => [['angle between roots', f(360 / v.n) + '°'], ['sum of roots', '0']] } }
    ],
    labs: [
      { sim: 'explore', title: 'Powers spiral', desc: 'Plot z, z², z³, … for z = re^{iθ}. With r < 1 they spiral in, r > 1 out, r = 1 round the circle.',
        tasks: ['Find θ so that z⁶ = 1 with r = 1.', 'What happens for θ = 360°·(√5 − 1)/2 (the golden angle)?'],
        params: { aspect: 0.5, controls: [S('r', 'r = |z|', 0.8, 1.15, 0.005, 0.97), S('t', 'θ', 1, 180, 0.5, 30, '°'), S('n', 'Powers shown', 3, 60, 1, 30)],
          plots: [{ x: [-2.2, 2.2], y: [-1.6, 1.6], zero: false, xlabel: 'Re', ylabel: 'Im', n: 2, curves: () => [{ f: (x) => (Math.abs(x) <= 1 ? Math.sqrt(1 - x * x) : NaN), color: 'ink3', dash: [3, 3] }, { f: (x) => (Math.abs(x) <= 1 ? -Math.sqrt(1 - x * x) : NaN), color: 'ink3', dash: [3, 3] }], pts: (v) => { const p = []; for (let k = 1; k <= v.n; k++) { const m = Math.pow(v.r, k), a = k * v.t * Math.PI / 180; p.push({ x: m * Math.cos(a), y: m * Math.sin(a), r: 3.5, label: k <= 3 ? 'z' + (k > 1 ? '^' + k : '') : '' }); } return p; } }] } },
      { sim: 'explore', title: 'Mandelbrot strip', desc: 'Iterate z → z² + c from z = 0 for real c. Values in [−2, 0.25] stay bounded; the plot shows where the orbit settles (period doubling towards chaos).',
        tasks: ['Where does the single fixed point split into a 2-cycle?', 'Find a window of period 3 near c = −1.75.'],
        params: { aspect: 0.45, controls: [S('c', 'Highlight c', -2, 0.25, 0.001, -1)],
          plots: [{ x: [-2, 0.25], y: [-2, 2], zero: false, xlabel: 'c', ylabel: 'long-run z', n: 2, curves: () => [], pts: (v) => { const p = []; for (let i = 0; i <= 300; i++) { const c = -2 + 2.25 * i / 300; let z = 0; for (let k = 0; k < 300; k++) z = z * z + c; for (let k = 0; k < 16; k++) { z = z * z + c; p.push({ x: c, y: z, r: 1.2, ring: false, color: 'accent' }); } } let z = 0; for (let k = 0; k < 300; k++) z = z * z + v.c; for (let k = 0; k < 8; k++) { z = z * z + v.c; p.push({ x: v.c, y: z, r: 3.5, color: 'rust' }); } return p; } }] } }
    ],
    formulas: [['Imaginary unit', 'i^2 = -1'], ['Modulus', '|a + bi| = \\sqrt{a^2 + b^2},\\ z\\bar z = |z|^2'], ['Euler', 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'], ['Polar form', 'z = re^{i\\theta},\\ z_1z_2 = r_1r_2e^{i(\\theta_1 + \\theta_2)}'], ['de Moivre', '(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta'], ['Roots of unity', 'z^n = 1 \\iff z = e^{2\\pi ik/n}']],
    problems: [
      P('concept', 'mcq', 'Powers of i', R`$i^{2023} = $`, 3, [R`Powers of $i$ cycle with period 4.`], R`$2023 = 4\cdot505 + 3$, so $i^{2023} = i^3 = -i$.`, { options: ['1', '$i$', '$-1$', '$-i$'] }),
      P('concept', 'mcq', 'Multiplying by i', R`Multiplying a complex number by $i$ on the Argand diagram…`, 1, [R`$i = e^{i\pi/2}$.`], R`Rotates it by 90° anticlockwise about 0.`, { options: ['reflects it in the real axis', 'rotates it 90° anticlockwise', 'doubles its modulus', 'swaps real and imaginary parts without rotating'] }),
      P('concept', 'mcq', 'Conjugate roots', R`A polynomial with real coefficients has root $2 + 3i$. Which must also be a root?`, 2, [R`Take the conjugate of the whole equation.`], R`$2 - 3i$: non-real roots of real polynomials come in conjugate pairs.`, { options: ['$-2 + 3i$', '$3 + 2i$', '$2 - 3i$', '$-2 - 3i$'] }),
      P('concept', 'mcq', 'Euler', R`$e^{i\pi/2} = $`, 0, [R`$\cos\tfrac\pi2 + i\sin\tfrac\pi2$.`], R`$i$.`, { options: ['$i$', '$-1$', '1', '$-i$'] }),
      P('core', 'num', 'Division', R`Find the real part of $\dfrac{5 + 5i}{1 + 2i}$.`, 3, [R`Multiply by $\dfrac{1 - 2i}{1 - 2i}$.`], R`$\dfrac{(5 + 5i)(1 - 2i)}{5} = \dfrac{15 - 5i}{5} = 3 - i$.`),
      P('core', 'num', 'Argument', R`Find $\arg(-1 + i\sqrt3)$ in degrees.`, 120, [R`It lies in the second quadrant.`], R`$\tan^{-1}(\sqrt3/(-1))$ adjusted: $120^\circ$.`),
      P('core', 'num', 'de Moivre', R`Compute the real part of $(\sqrt3 + i)^6$.`, -64, [R`$\sqrt3 + i = 2e^{i\pi/6}$.`], R`$2^6e^{i\pi} = -64$.`),
      P('core', 'num', 'Quadratic', R`Find the product of the roots of $z^2 - 4z + 13 = 0$.`, 13, [R`Vieta, or solve: $2 \pm 3i$.`], R`$(2 + 3i)(2 - 3i) = 13$.`),
      P('core', 'num', 'Modulus of a quotient', R`Find $\left|\dfrac{(3 + 4i)^3}{(1 - i)^4}\right|$.`, 125 / 4, [R`Moduli multiply and divide.`], R`$5^3/(\sqrt2)^4 = 125/4 = 31.25$.`),
      P('olympiad', 'num', 'Cosine sum', R`Evaluate $\cos\dfrac{2\pi}7 + \cos\dfrac{4\pi}7 + \cos\dfrac{6\pi}7$.`, -0.5, [R`The seventh roots of unity sum to zero.`, R`Their real parts: $1 + 2(\text{your sum}) = 0$.`], R`$-\tfrac12$.`),
      P('olympiad', 'num', 'Polygon diagonals', R`A regular $n$-gon is inscribed in the unit circle. The product of the distances from one vertex to all the others equals $n$. For $n = 7$, find that product.`, 7, [R`$z^n - 1 = (z - 1)(z - \omega)\cdots$, so $\prod(1 - \omega^k) = $ derivative-like limit of $\dfrac{z^n - 1}{z - 1}$ at $z = 1$.`], R`$\prod_{k=1}^{n-1}|1 - \omega^k| = n = 7$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Triple angle', R`Using de Moivre, $\cos3\theta = a\cos^3\theta + b\cos\theta$. Find $a + b$.`, 1, [R`Expand $(c + is)^3$ and take the real part, using $s^2 = 1 - c^2$.`], R`$\cos3\theta = 4\cos^3\theta - 3\cos\theta$, so $a + b = 1$ (check: $\theta = 0$).`, { tol: 0.001 })
    ]
  });
  PB.addDrills('math-complex', [
    { title: 'Modulus', gen: (r) => { const a = r.int(-9, 9), b = r.int(-9, 9) || 1; return { q: R`<p>Find $|${a} + (${b})i|$.</p>`, answer: Math.hypot(a, b), tol: 0.002, solution: R`<p>$\sqrt{${a * a} + ${b * b}} = ${f(Math.hypot(a, b), 4)}$.</p>` }; } },
    { title: 'Multiply', gen: (r) => { const a = r.int(-5, 5), b = r.int(-5, 5), c = r.int(-5, 5), d = r.int(-5, 5); const re = a * c - b * d; return { q: R`<p>Real part of $(${a} + ${b}i)(${c} + ${d}i)$?</p>`, answer: re, tol: 0.001, atol: 1e-9, solution: R`<p>$${a}\cdot${c} - ${b}\cdot${d} = ${re}$.</p>` }; } },
    { title: 'Argument', gen: (r) => { const t = r.pick([30, 45, 60, 90, 120, 135, 150, 210, 240, 300, 315]); const m = r.int(1, 5); const x = +(m * Math.cos(t * Math.PI / 180)).toFixed(3), y = +(m * Math.sin(t * Math.PI / 180)).toFixed(3); return { q: R`<p>Find the argument (in degrees, 0 to 360) of $${x} + (${y})i$.</p>`, answer: t, tol: 0.01, solution: R`<p>It is $${m}e^{i\cdot${t}^\circ}$: argument ${t}°.</p>` }; } }
  ]);
})();
