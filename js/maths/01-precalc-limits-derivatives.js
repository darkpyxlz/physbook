/* Mathematics 1–3: functions, limits, derivatives. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3), d2r = Math.PI / 180;
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.01 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.01 } : {}, o || {});
  const BASE = { sq: (x) => x * x, cube: (x) => x * x * x, abs: Math.abs, sqrt: (x) => (x >= 0 ? Math.sqrt(x) : NaN), sin: Math.sin, exp: Math.exp, recip: (x) => (Math.abs(x) < 1e-3 ? NaN : 1 / x) };

  /* ===================== 1. Functions ===================== */
  PB.addChapter({
    id: 'math-functions', subject: 'maths', num: 1, part: 'Precalculus',
    title: 'Functions and Their Graphs',
    subtitle: R`The language of calculus. What a function is, how graphs move when you change a formula, composition and inverses, exponentials and logarithms, and the trigonometric functions.`,
    big: 'A function is a machine: put a number in, get exactly one number out. Almost all of calculus is about understanding these machines through their graphs, and a handful of families (powers, exponentials, logs, sines) describe most of the world.',
    goals: ['Read and evaluate function notation', 'Predict how a graph moves under a + f(b(x − h)) + k', 'Compose and invert functions', 'Use the laws of exponents and logarithms', 'Work in radians and use the main trig identities'],
    sections: [
      { title: 'What a function is', html: R`
<p>A <strong>function</strong> $f$ takes an input $x$ and returns exactly one output $f(x)$. Think of it as a machine: the rule $f(x) = x^2 - 3x$ means "square the input, subtract three times the input". So $f(5) = 25 - 15 = 10$.</p>
<p>The set of allowed inputs is the <strong>domain</strong> and the set of outputs you can get is the <strong>range</strong>. For $g(x) = \sqrt{x - 2}$ the domain is $x \ge 2$ (you cannot take the square root of a negative number), and the range is $g \ge 0$.</p>
<p>The <strong>graph</strong> of $f$ is the set of points $(x, f(x))$. Because each input has only one output, any vertical line meets the graph at most once: the <strong>vertical line test</strong>. A circle $x^2 + y^2 = 1$ fails it, so it is not the graph of a single function of $x$.</p>
<div class="key"><p>Four questions to ask about any function: What goes in (domain)? What comes out (range)? Where does it cross the axes? What happens for very large $|x|$?</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Let $f(x) = x^2 - 3x$. What is $f(4)$?`, 4, [R`Replace every $x$ by 4.`], R`$f(4) = 16 - 12 = 4$.`),
          QM(R`Which of these is <em>not</em> the graph of a function of $x$?`, ['A straight line $y = 2x + 1$', 'A parabola $y = x^2$', 'A circle $x^2 + y^2 = 4$', 'A sine wave $y = \\sin x$'], 2, [R`Use the vertical line test.`], R`A vertical line through the inside of the circle meets it twice, so the circle is not a function of $x$.`)] },
      { title: 'Moving and combining graphs', html: R`
<p>Start with a graph you know, $y = f(x)$, and change the formula a little:</p>
<ul><li>$y = f(x) + k$ moves the graph <strong>up</strong> by $k$.</li>
<li>$y = f(x - h)$ moves it <strong>right</strong> by $h$. (The minus sign surprises everyone: at $x = h$ the machine sees $0$.)</li>
<li>$y = a f(x)$ stretches it <strong>vertically</strong> by $a$; a negative $a$ also flips it upside down.</li>
<li>$y = f(bx)$ squashes it <strong>horizontally</strong> by a factor $b$.</li></ul>
<div data-fig="0"></div>
<p>Functions can be chained: the <strong>composition</strong> $(f\circ g)(x) = f(g(x))$ means "do $g$ first, then $f$". With $f(x) = x^2$ and $g(x) = x + 1$, $f(g(x)) = (x + 1)^2$ but $g(f(x)) = x^2 + 1$: order matters.</p>
<p>The <strong>inverse</strong> $f^{-1}$ undoes $f$: if $f(2) = 7$ then $f^{-1}(7) = 2$. To find it, write $y = f(x)$ and solve for $x$. Its graph is the mirror image of $f$ in the line $y = x$. Only functions that never repeat an output (one-to-one) have inverses.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`$f(x) = 2x + 3$. What is $f^{-1}(11)$?`, 4, [R`Ask: which input gives 11?`, R`Solve $2x + 3 = 11$.`], R`$2x + 3 = 11$ gives $x = 4$. In general $f^{-1}(y) = (y - 3)/2$.`),
          QM(R`The graph of $y = (x - 3)^2 + 1$ is the graph of $y = x^2$ moved…`, ['3 left and 1 up', '3 right and 1 up', '3 right and 1 down', '3 left and 1 down'], 1, [R`$f(x - h)$ moves right by $h$.`], R`3 right (because of $x - 3$) and 1 up. Its lowest point is $(3, 1)$.`)] },
      { title: 'Exponentials and logarithms', html: R`
<p>An <strong>exponential</strong> $y = a^x$ multiplies by the same factor $a$ for each step in $x$. Money at 5% interest, bacteria doubling, radioactive decay: all are exponentials. The laws of exponents follow from counting factors: $a^m a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^{-n} = 1/a^n$, $a^0 = 1$.</p>
<p>The special base $e \approx 2.718$ is the one whose graph has slope exactly 1 where it crosses the $y$-axis; you will see in Chapter 3 why that makes $e^x$ the natural choice.</p>
<p>A <strong>logarithm</strong> answers the question "what power?": $\log_a y = x$ means $a^x = y$. So $\log_2 8 = 3$ and $\log_{10} 0.01 = -2$. The natural log is $\ln = \log_e$. Logs turn multiplication into addition:</p>
$$\log(xy) = \log x + \log y,\qquad \log(x/y) = \log x - \log y,\qquad \log(x^n) = n\log x.$$
<p>To solve $3^x = 20$, take logs: $x\ln 3 = \ln 20$, so $x = \ln20/\ln3 \approx 2.73$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Solve $2^x = 32$.`, 5, [R`Write 32 as a power of 2.`], R`$32 = 2^5$, so $x = 5$.`),
          QN(R`Evaluate $\log_2 8 + \log_2 4$.`, 5, [R`Each log asks "2 to what power?"`, R`Or combine: $\log_2 32$.`], R`$3 + 2 = 5$, or $\log_2(8\times4) = \log_2 32 = 5$.`)] },
      { title: 'Angles, radians and trigonometric functions', html: R`
<p>Mathematicians measure angles in <strong>radians</strong>: the angle that cuts off an arc equal to the radius. A full turn is $2\pi$ radians, so $180^\circ = \pi$ and $1\text{ rad} \approx 57.3^\circ$. In radians, arc length is simply $s = r\theta$.</p>
<p>Walk round the unit circle: the point at angle $\theta$ has coordinates $(\cos\theta, \sin\theta)$. That definition works for any angle, and it immediately gives $\sin^2\theta + \cos^2\theta = 1$ (Pythagoras). Both functions repeat every $2\pi$.</p>
<div data-fig="1"></div>
<p>The identities you will use most:</p>
$$\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B,\qquad \cos(A \pm B) = \cos A\cos B \mp \sin A\sin B,$$
$$\sin2\theta = 2\sin\theta\cos\theta,\qquad \cos2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta.$$
<p>Memorise a few exact values: $\sin\frac\pi6 = \frac12$, $\sin\frac\pi4 = \frac{\sqrt2}2$, $\sin\frac\pi3 = \frac{\sqrt3}2$, and the same numbers in reverse for cosine.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`If $\cos\theta = 0.6$, what is $\cos2\theta$?`, -0.28, [R`Use $\cos2\theta = 2\cos^2\theta - 1$.`], R`$2(0.36) - 1 = -0.28$.`),
          QN(R`Convert $135^\circ$ to radians (give a decimal).`, 3 * Math.PI / 4, [R`Multiply by $\pi/180$.`], R`$135\pi/180 = 3\pi/4 \approx 2.356$.`)] }
    ],
    figures: [
      { s: 1, title: 'Transforming y = x²', caption: 'y = a·f(x − h) + k. Move the sliders and watch the dashed parent graph turn into the solid one.', params: { aspect: 0.45, controls: [S('a', 'Stretch a', -3, 3, 0.1, 1), S('h', 'Shift right h', -4, 4, 0.1, 1), S('k', 'Shift up k', -4, 4, 0.1, 1)],
        plots: [{ x: [-6, 6], y: [-8, 10], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => x * x, color: 'ink3', dash: [4, 4], label: 'y = x²' }, { f: (x) => v.a * Math.pow(x - v.h, 2) + v.k, label: 'transformed' }], pts: (v) => [{ x: v.h, y: v.k, label: 'vertex' }] }] } },
      { s: 3, title: 'The unit circle unrolled', caption: 'The height of the point on the circle traces the sine curve; its horizontal position traces the cosine.', params: { aspect: 0.4, picFrac: 0.32, controls: [S('t', 'Angle θ', 0, 6.28, 0.01, 1, 'rad')],
        draw: (ctx, C, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, r = Math.min(b.w, b.h) * 0.38; ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - r - 8, cy); ctx.lineTo(cx + r + 8, cy); ctx.moveTo(cx, cy - r - 8); ctx.lineTo(cx, cy + r + 8); ctx.stroke(); const px = cx + r * Math.cos(v.t), py = cy - r * Math.sin(v.t); ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke(); ctx.strokeStyle = C.rust; ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke(); U.dot(ctx, px, py, 5, C.points, C.ink); U.text(ctx, 'sin', px + 4, (py + cy) / 2, C.rust, U.ui(11)); U.text(ctx, 'cos', (px + cx) / 2, cy + 14, C.teal, U.ui(11), 'center'); },
        plots: [{ x: [0, 6.28], y: [-1.15, 1.15], zero: false, xlabel: 'θ (rad)', ylabel: 'value', curves: () => [{ f: Math.sin, color: 'rust', label: 'sin θ' }, { f: Math.cos, color: 'teal', label: 'cos θ' }], vlines: (v) => [{ x: v.t }], pts: (v) => [{ x: v.t, y: Math.sin(v.t), color: 'rust' }, { x: v.t, y: Math.cos(v.t), color: 'teal' }] }],
        readout: (v) => [['θ', f(v.t) + ' rad = ' + f(v.t / d2r) + '°'], ['sin θ', f(Math.sin(v.t))], ['cos θ', f(Math.cos(v.t))], ['sin² + cos²', '1']] } }
    ],
    labs: [
      { sim: 'explore', title: 'Function transformer', desc: 'Pick a parent function and apply y = a·f(b(x − h)) + k. Predict each change before you make it.',
        tasks: ['Make the parent sine curve twice as tall and half as wide. Which sliders did you use?', 'Find a, h, k so that y = x² passes through (2, 5) with its vertex at (1, 2).', 'Turn |x| upside down and lift it so its peak is at height 3.', 'Why does a positive h move the graph right?'],
        params: { aspect: 0.5, controls: [{ type: 'select', id: 'fn', label: 'Parent f', value: 'sq', options: [['sq', 'x²'], ['cube', 'x³'], ['abs', '|x|'], ['sqrt', '√x'], ['sin', 'sin x'], ['exp', 'eˣ'], ['recip', '1/x']] }, S('a', 'a (vertical stretch)', -3, 3, 0.1, 1), S('b', 'b (horizontal squash)', 0.2, 3, 0.1, 1), S('h', 'h (shift right)', -4, 4, 0.1, 0), S('k', 'k (shift up)', -4, 4, 0.1, 0)],
          plots: [{ x: [-6, 6], y: [-6, 6], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => BASE[v.fn](x), color: 'ink3', dash: [4, 4], label: 'parent' }, { f: (x) => v.a * BASE[v.fn](v.b * (x - v.h)) + v.k, label: 'a·f(b(x−h)) + k' }] }],
          readout: (v) => [['formula', 'y = ' + f(v.a) + '·f(' + f(v.b) + '(x − ' + f(v.h) + ')) + ' + f(v.k)]] } },
      { sim: 'explore', title: 'Exponentials and logarithms are mirror images', desc: 'y = aˣ and y = log_a x reflected in the line y = x.',
        tasks: ['What happens to both curves when a = 1? Why is base 1 useless?', 'Find the base for which the exponential touches the line y = x (about 1.44 = e^{1/e}).', 'Read off log₂ 8 from the graph.'],
        params: { aspect: 0.5, controls: [S('a', 'Base a', 0.2, 5, 0.01, 2), S('x', 'Read at x', 0.1, 8, 0.1, 8)],
          plots: [{ x: [-4, 8], y: [-4, 8], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => Math.pow(v.a, x), label: 'aˣ' }, { f: (x) => (x > 0 ? Math.log(x) / Math.log(v.a) : NaN), color: 'rust', label: 'log_a x' }, { f: (x) => x, color: 'ink3', dash: [4, 4], label: 'y = x' }], pts: (v) => [{ x: v.x, y: Math.log(v.x) / Math.log(v.a) }] }],
          readout: (v) => [['log_a(x)', f(Math.log(v.x) / Math.log(v.a))], ['check: a^that', f(Math.pow(v.a, Math.log(v.x) / Math.log(v.a)))]] } }
    ],
    formulas: [['Laws of exponents', 'a^m a^n = a^{m+n},\\ (a^m)^n = a^{mn}'], ['Logarithm', '\\log_a y = x \\iff a^x = y'], ['Log laws', '\\log xy = \\log x + \\log y,\\ \\log x^n = n\\log x'], ['Change of base', '\\log_a x = \\dfrac{\\ln x}{\\ln a}'], ['Pythagorean identity', '\\sin^2\\theta + \\cos^2\\theta = 1'], ['Double angle', '\\sin2\\theta = 2\\sin\\theta\\cos\\theta,\\ \\cos2\\theta = 1 - 2\\sin^2\\theta'], ['Radians', '\\pi\\text{ rad} = 180^\\circ,\\ s = r\\theta']],
    problems: [
      P('concept', 'mcq', 'Domain', R`What is the domain of $f(x) = \dfrac{1}{x - 3}$?`, 2, [R`Which input breaks the formula?`], R`Every real number except 3, where you would divide by zero.`, { options: ['All real numbers', '$x > 3$', 'All real $x \\ne 3$', '$x \\ne 0$'] }),
      P('concept', 'mcq', 'Order of composition', R`$f(x) = x^2$ and $g(x) = x + 1$. What is $g(f(2))$?`, 1, [R`Do $f$ first.`], R`$f(2) = 4$, then $g(4) = 5$. (Compare $f(g(2)) = 9$.)`, { options: ['4', '5', '9', '6'] }),
      P('concept', 'mcq', 'Reading a log', R`$\log_{10} 0.001 = $`, 3, [R`$0.001 = 10^{?}$`], R`$0.001 = 10^{-3}$, so the log is $-3$.`, { options: ['3', '0.001', '−0.001', '−3'] }),
      P('concept', 'mcq', 'Period', R`What is the period of $y = \sin(3x)$?`, 0, [R`$\sin$ repeats when its argument grows by $2\pi$.`], R`$3x$ grows by $2\pi$ when $x$ grows by $2\pi/3$.`, { options: ['$2\\pi/3$', '$3\\pi$', '$6\\pi$', '$\\pi/3$'] }),
      P('core', 'num', 'Solving an exponential', R`Solve $5 \cdot 3^x = 200$.`, Math.log(40) / Math.log(3), [R`Divide by 5 first.`, R`Then take logs: $x = \ln40/\ln3$.`], R`$3^x = 40$, so $x = \ln40/\ln3 = ${f(Math.log(40) / Math.log(3), 4)}$.`),
      P('core', 'num', 'Inverse function', R`Find $f^{-1}(5)$ for $f(x) = \dfrac{2x + 1}{x - 1}$.`, 2, [R`Solve $\dfrac{2x + 1}{x - 1} = 5$.`], R`$2x + 1 = 5x - 5$, so $x = 2$.`),
      P('core', 'num', 'Compound angle', R`Use $\sin(A + B)$ to find $\sin75^\circ$ exactly, and give it as a decimal.`, Math.sin(75 * d2r), [R`$75^\circ = 45^\circ + 30^\circ$.`], R`$\sin45\cos30 + \cos45\sin30 = \dfrac{\sqrt6 + \sqrt2}{4} = ${f(Math.sin(75 * d2r), 4)}$.`),
      P('core', 'num', 'Doubling time', R`A population grows by 3% a year. How many years until it doubles?`, Math.log(2) / Math.log(1.03), [R`Solve $1.03^t = 2$.`], R`$t = \ln2/\ln1.03 = ${f(Math.log(2) / Math.log(1.03), 4)}$ years (the "rule of 70" gives 23).`),
      P('core', 'num', 'Log equation', R`Solve $\log_2(x) + \log_2(x - 2) = 3$ for $x > 2$.`, 4, [R`Combine into one log: $\log_2(x(x - 2)) = 3$.`], R`$x^2 - 2x = 8$, so $(x - 4)(x + 2) = 0$ and $x = 4$.`),
      P('olympiad', 'num', 'A functional value', R`A function satisfies $f(x) + 2f\!\left(\dfrac1x\right) = 3x$ for all $x \ne 0$. Find $f(2)$.`, -1, [R`Write the equation at $x = 2$ and at $x = \tfrac12$.`, R`Solve the pair of simultaneous equations for $f(2)$ and $f(\tfrac12)$.`], R`$f(2) + 2f(\tfrac12) = 6$ and $f(\tfrac12) + 2f(2) = \tfrac32$. Eliminating: $f(2) - 4f(2) = 6 - 3$, so $f(2) = -1$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Trig maximum', R`What is the maximum value of $3\sin x + 4\cos x$?`, 5, [R`Write it as $R\sin(x + \alpha)$.`, R`$R = \sqrt{3^2 + 4^2}$.`], R`$3\sin x + 4\cos x = 5\sin(x + \alpha)$ with $\tan\alpha = 4/3$, so the maximum is 5.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Nested logs', R`Find $x$ if $\log_2(\log_3(\log_4 x)) = 0$.`, 64, [R`Peel the logs from the outside: $\log_3(\log_4 x) = 1$.`], R`$\log_3(\log_4x) = 2^0 = 1$, so $\log_4 x = 3$ and $x = 4^3 = 64$.`, { tol: 0.001 })
    ]
  });
  PB.addDrills('math-functions', [
    { title: 'Evaluate a quadratic', gen: (r) => { const a = r.int(-3, 3) || 1, b = r.int(-6, 6), c = r.int(-9, 9), x = r.int(-4, 5); return { q: R`<p>$f(x) = ${a}x^2 + (${b})x + (${c})$. Find $f(${x})$.</p>`, answer: a * x * x + b * x + c, tol: 0.001, solution: R`<p>$${a}(${x})^2 + (${b})(${x}) + (${c}) = ${a * x * x + b * x + c}$.</p>` }; } },
    { title: 'Solve an exponential', gen: (r) => { const a = r.pick([2, 3, 5, 10]), k = r.int(2, 60); return { q: R`<p>Solve $${a}^x = ${k}$.</p>`, answer: Math.log(k) / Math.log(a), tol: 0.005, solution: R`<p>$x = \ln${k}/\ln${a} = ${f(Math.log(k) / Math.log(a), 4)}$.</p>` }; } },
    { title: 'Degrees to radians', gen: (r) => { const d = r.step(15, 345, 15); return { q: R`<p>Convert $${d}^\circ$ to radians.</p>`, answer: d * d2r, tol: 0.005, solution: R`<p>$${d}\times\pi/180 = ${f(d * d2r, 4)}$.</p>` }; } }
  ]);

  /* ===================== 2. Limits ===================== */
  const sinc = (x) => (x === 0 ? 1 : Math.sin(x) / x);
  PB.addChapter({
    id: 'math-limits', subject: 'maths', num: 2, part: 'Calculus',
    title: 'Limits and Continuity',
    subtitle: R`What value does a function approach, even where it is not defined? Limits from tables and graphs, limit laws, the squeeze theorem, limits at infinity, and continuity.`,
    big: 'A limit asks: as x gets closer and closer to a, what does f(x) get close to? It does not care what happens exactly at a, only nearby. That one idea lets calculus talk about instantaneous speed and areas under curves.',
    goals: ['Estimate a limit from a table or graph', 'Use limit laws and algebra to evaluate limits', 'Recognise sin x / x → 1 and use the squeeze theorem', 'Find limits at infinity and asymptotes', 'Decide where a function is continuous'],
    sections: [
      { title: 'The idea of a limit', html: R`
<p>Consider $f(x) = \dfrac{x^2 - 1}{x - 1}$. At $x = 1$ it is $\tfrac00$: undefined. But try nearby values: $f(0.9) = 1.9$, $f(0.99) = 1.99$, $f(1.01) = 2.01$. The outputs close in on 2. We write</p>
$$\lim_{x\to1}\frac{x^2 - 1}{x - 1} = 2.$$
<p>Algebra confirms it: for $x \ne 1$, $\dfrac{(x - 1)(x + 1)}{x - 1} = x + 1$, which is near 2 when $x$ is near 1. The graph is the line $y = x + 1$ with a single hole at $(1, 2)$.</p>
<div class="key"><p>$\lim_{x\to a} f(x) = L$ means: you can make $f(x)$ as close to $L$ as you like by taking $x$ close enough to $a$ (but not equal to it).</p></div>
<p>A limit can fail to exist. For $f(x) = |x|/x$, values just right of 0 are 1 and just left are $-1$. The <strong>one-sided limits</strong> disagree, so the two-sided limit does not exist.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\displaystyle\lim_{x\to3}\frac{x^2 - 9}{x - 3}$.`, 6, [R`Factor the top: $x^2 - 9 = (x - 3)(x + 3)$.`], R`Cancel to get $x + 3 \to 6$.`)] },
      { title: 'Limit laws and algebraic tricks', html: R`
<p>Limits behave well with arithmetic: the limit of a sum is the sum of the limits, and the same for differences, products, quotients (if the bottom limit is not zero) and powers. So for a polynomial or any "nice" formula, you can just substitute: $\lim_{x\to2}(x^3 - 4x) = 0$.</p>
<p>When substitution gives $\tfrac00$, the formula needs rewriting first. The common tricks:</p>
<ul><li><strong>Factor and cancel</strong>, as in §2.1.</li>
<li><strong>Multiply by the conjugate</strong>: $\dfrac{\sqrt{x} - 2}{x - 4} = \dfrac{(\sqrt x - 2)(\sqrt x + 2)}{(x - 4)(\sqrt x + 2)} = \dfrac1{\sqrt x + 2} \to \dfrac14$ as $x \to 4$.</li>
<li><strong>Simplify a compound fraction</strong> over a common denominator.</li></ul>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\displaystyle\lim_{x\to9}\frac{\sqrt x - 3}{x - 9}$.`, 1 / 6, [R`Multiply top and bottom by $\sqrt x + 3$.`], R`You get $\dfrac1{\sqrt x + 3} \to \dfrac16 \approx 0.1667$.`)] },
      { title: 'The squeeze theorem and sin x / x', html: R`
<p>If $g(x) \le f(x) \le h(x)$ near $a$, and both $g$ and $h$ tend to the same limit $L$, then $f$ is trapped and must tend to $L$ too. This is the <strong>squeeze theorem</strong>.</p>
<p>Example: $-x^2 \le x^2\sin(1/x) \le x^2$, and both outer functions tend to 0, so $x^2\sin(1/x) \to 0$ as $x \to 0$, even though $\sin(1/x)$ itself oscillates wildly.</p>
<p>A geometric squeeze on the unit circle gives the most important trig limit:</p>
$$\lim_{x\to0}\frac{\sin x}{x} = 1\quad(x\text{ in radians}).$$
<div data-fig="0"></div>
<p>It is the reason $\sin x \approx x$ for small angles, and it is exactly what makes the derivative of $\sin x$ equal to $\cos x$. From it: $\lim_{x\to0}\dfrac{\sin 5x}{x} = 5$ and $\lim_{x\to0}\dfrac{1 - \cos x}{x^2} = \tfrac12$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\displaystyle\lim_{x\to0}\frac{\sin 4x}{x}$.`, 4, [R`Write it as $4\cdot\dfrac{\sin4x}{4x}$.`], R`$4\times1 = 4$.`)] },
      { title: 'Infinity and continuity', html: R`
<p>As $x \to \infty$, $\dfrac{3x^2 + 1}{2x^2 - x}$ behaves like $\dfrac{3x^2}{2x^2} = \dfrac32$: divide top and bottom by the highest power. The line $y = \tfrac32$ is a <strong>horizontal asymptote</strong>. Where the bottom of a fraction goes to zero but the top does not, you get a <strong>vertical asymptote</strong>.</p>
<p>Useful growth ranking for large $x$: $\ln x \ll x^n \ll e^x \ll x!$ (each eventually beats the one before), so $\lim_{x\to\infty} x^{10}e^{-x} = 0$.</p>
<p>A function is <strong>continuous</strong> at $a$ if $\lim_{x\to a}f(x) = f(a)$: no holes, jumps or blow-ups, so you could draw it without lifting the pen. Polynomials, exponentials, sines and cosines are continuous everywhere.</p>
<div class="key"><p><strong>Intermediate value theorem.</strong> If $f$ is continuous on $[a, b]$ and $N$ lies between $f(a)$ and $f(b)$, then $f(c) = N$ for some $c$ in between. So a continuous function that changes sign has a root.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\displaystyle\lim_{x\to\infty}\frac{5x^3 - 2x}{2x^3 + 7}$.`, 2.5, [R`Divide everything by $x^3$.`], R`$\dfrac{5 - 2/x^2}{2 + 7/x^3} \to \dfrac52 = 2.5$.`)] }
    ],
    figures: [
      { s: 2, title: 'sin x / x near zero', caption: 'The function is undefined at 0 but its values close in on 1 from both sides.', params: { controls: [S('x', 'x', -3, 3, 0.01, 0.5)],
        plots: [{ x: [-10, 10], y: [-0.4, 1.2], zero: false, xlabel: 'x (rad)', ylabel: 'sin x / x', curves: () => [{ f: (x) => (Math.abs(x) < 1e-6 ? NaN : Math.sin(x) / x) }], hlines: () => [{ y: 1, label: 'limit 1' }], pts: (v) => [{ x: v.x, y: sinc(v.x) }] }],
        readout: (v) => [['sin x / x', f(sinc(v.x), 6)], ['distance from 1', f(1 - sinc(v.x), 3)]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Zooming in on a limit (ε and δ)', desc: 'Choose a tolerance ε around the limit L. The green band shows the x-values (within δ of a) whose outputs stay inside L ± ε.',
        tasks: ['For f(x) = (x² − 1)/(x − 1) at a = 1, how does δ have to shrink as ε shrinks?', 'Switch to sin x / x at a = 0. Is δ roughly proportional to √ε? Why?', 'Switch to the jump function. Show that no δ works for ε = 0.5.'],
        params: { aspect: 0.5, controls: [{ type: 'select', id: 'fn', label: 'Function', value: 'hole', options: [['hole', '(x² − 1)/(x − 1), a = 1, L = 2'], ['sinc', 'sin x / x, a = 0, L = 1'], ['jump', '|x|/x, a = 0, L = 1?']] }, S('e', 'ε (output tolerance)', 0.01, 1, 0.01, 0.3)],
          init: (v) => {},
          plots: [{ x: (v) => (v.fn === 'hole' ? [-1, 3] : [-3, 3]), y: (v) => (v.fn === 'hole' ? [0, 4] : [-1.5, 1.5]), zero: false, xlabel: 'x', ylabel: 'f(x)', curves: (v) => [{ f: (x) => (v.fn === 'hole' ? (Math.abs(x - 1) < 1e-9 ? NaN : x + 1) : v.fn === 'sinc' ? sinc(x) : (x === 0 ? NaN : Math.sign(x))) }],
            hlines: (v) => { const L = v.fn === 'hole' ? 2 : 1; return [{ y: L + v.e, color: 'rust', label: 'L + ε' }, { y: L - v.e, color: 'rust', label: 'L − ε' }]; },
            bands: (v) => { const a = v.fn === 'hole' ? 1 : 0; const d = v.fn === 'hole' ? v.e : v.fn === 'sinc' ? Math.sqrt(6 * v.e) : 0; return d > 0 ? [{ x0: a - d, x1: a + d }] : []; } }],
          readout: (v) => { const d = v.fn === 'hole' ? v.e : v.fn === 'sinc' ? Math.sqrt(6 * v.e) : 0; return [['δ that works', d > 0 ? '≈ ' + f(d) : 'none: the limit does not exist']]; } } },
      { sim: 'explore', title: 'Racing to infinity', desc: 'Compare ln x, x², eˣ on log axes. Every exponential eventually overtakes every power.',
        tasks: ['Where does x¹⁰ finally fall behind eˣ?', 'Show that ln x / x → 0.', 'Which grows faster, x^0.1 or ln x? Check with large x.'],
        params: { aspect: 0.5, controls: [S('n', 'Power n in xⁿ', 0.1, 12, 0.1, 3)],
          plots: [{ x: [1, 60], y: [-1, 30], zero: false, xlabel: 'x', ylabel: 'log₁₀ of value', curves: (v) => [{ f: (x) => Math.log10(Math.log(x) || 1e-9), label: 'ln x', color: 'teal' }, { f: (x) => v.n * Math.log10(x), label: 'xⁿ' }, { f: (x) => x / Math.LN10, label: 'eˣ', color: 'rust' }] }],
          readout: (v) => { let cross = null; for (let x = 1.01; x < 200; x += 0.01) { if (x > v.n * Math.log(x) && x > 2 * v.n) { cross = x; break; } } return [['eˣ overtakes xⁿ for good near', cross ? 'x ≈ ' + f(cross) : '> 200']]; } } }
    ],
    formulas: [['Limit laws', '\\lim(f \\pm g) = \\lim f \\pm \\lim g,\\ \\lim fg = \\lim f\\lim g'], ['Key trig limit', '\\lim_{x\\to0}\\dfrac{\\sin x}{x} = 1'], ['Also', '\\lim_{x\\to0}\\dfrac{1 - \\cos x}{x^2} = \\tfrac12'], ['e as a limit', 'e = \\lim_{n\\to\\infty}\\left(1 + \\tfrac1n\\right)^n'], ['Continuity', '\\lim_{x\\to a} f(x) = f(a)']],
    problems: [
      P('concept', 'mcq', 'What a limit ignores', R`If $f(2) = 7$ but $f(x) \to 5$ as $x \to 2$, then $\lim_{x\to2}f(x) = $`, 1, [R`The limit only looks near 2.`], R`5. The value at the point itself does not matter (and $f$ is discontinuous there).`, { options: ['7', '5', '6', 'It does not exist'] }),
      P('concept', 'mcq', 'One-sided limits', R`$\lim_{x\to0^+}\dfrac1x$ is…`, 2, [R`Try $x = 0.1, 0.01, 0.001$.`], R`$+\infty$: the values grow without bound.`, { options: ['0', '1', '$+\\infty$', '$-\\infty$'] }),
      P('concept', 'mcq', 'Continuity', R`Where is $f(x) = \dfrac{x}{x^2 - 4}$ discontinuous?`, 2, [R`Where is the denominator zero?`], R`At $x = \pm2$.`, { options: ['Nowhere', 'Only at $x = 0$', 'At $x = 2$ and $x = -2$', 'Only at $x = 4$'] }),
      P('concept', 'mcq', 'Growth', R`$\lim_{x\to\infty}\dfrac{x^{100}}{e^x} = $`, 0, [R`Exponentials beat powers.`], R`0: $e^x$ eventually grows faster than any power.`, { options: ['0', '1', '100', '$\\infty$'] }),
      P('core', 'num', 'Factor and cancel', R`Find $\displaystyle\lim_{x\to2}\frac{x^3 - 8}{x - 2}$.`, 12, [R`$x^3 - 8 = (x - 2)(x^2 + 2x + 4)$.`], R`$x^2 + 2x + 4 \to 12$.`),
      P('core', 'num', 'Conjugate', R`Find $\displaystyle\lim_{x\to0}\frac{\sqrt{1 + x} - 1}{x}$.`, 0.5, [R`Multiply by $\sqrt{1 + x} + 1$.`], R`$\dfrac{1}{\sqrt{1 + x} + 1} \to \tfrac12$.`),
      P('core', 'num', 'Trig limit', R`Find $\displaystyle\lim_{x\to0}\frac{\tan 3x}{\sin 2x}$.`, 1.5, [R`Use $\tan u \approx u$ and $\sin u \approx u$ for small $u$.`], R`$\dfrac{3x}{2x} = \tfrac32$.`),
      P('core', 'num', 'Making it continuous', R`For what value of $k$ is $f(x) = \begin{cases}kx + 1 & x < 2\\ x^2 - 1 & x \ge 2\end{cases}$ continuous?`, 1, [R`The two pieces must meet at $x = 2$.`], R`$2k + 1 = 3$, so $k = 1$.`),
      P('core', 'num', 'A famous limit', R`Find $\displaystyle\lim_{n\to\infty}\left(1 + \frac{2}{n}\right)^{n}$.`, Math.exp(2), [R`Compare with $(1 + 1/m)^m \to e$, using $m = n/2$.`], R`$\left[(1 + 1/m)^m\right]^2 \to e^2 \approx ${f(Math.exp(2), 4)}$.`),
      P('olympiad', 'num', 'Cosine limit', R`Find $\displaystyle\lim_{x\to0}\frac{1 - \cos 3x}{x^2}$.`, 4.5, [R`$1 - \cos u \approx u^2/2$.`], R`$\dfrac{(3x)^2/2}{x^2} = \tfrac92 = 4.5$.`),
      P('olympiad', 'num', 'Rationalising at infinity', R`Find $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2 + 6x} - x\right)$.`, 3, [R`Multiply and divide by $\sqrt{x^2 + 6x} + x$.`], R`$\dfrac{6x}{\sqrt{x^2 + 6x} + x} \to \dfrac{6}{1 + 1} = 3$.`),
      P('olympiad', 'num', 'A root by bisection', R`$x^3 + x - 1 = 0$ has exactly one real root. Use the intermediate value theorem and bisection to find it to three decimal places.`, 0.6823, [R`$f(0) < 0 < f(1)$.`, R`Halve the interval repeatedly.`], R`The root is $x \approx 0.6823$.`, { tol: 0.002 })
    ]
  });
  PB.addDrills('math-limits', [
    { title: 'Factor and cancel', gen: (r) => { const a = r.int(-5, 6) || 2, b = r.int(-5, 5); return { q: R`<p>Find $\displaystyle\lim_{x\to${a}}\frac{x^2 + (${b - a})x + (${-a * b})}{x - ${a}}$.</p>`, answer: a + b, tol: 0.001, atol: 1e-9, solution: R`<p>The top factors as $(x - ${a})(x + (${b}))$. Cancel $x - ${a}$: the limit is $${a} + (${b}) = ${a + b}$.</p>` }; } },
    { title: 'Ratio at infinity', gen: (r) => { const a = r.int(1, 9), b = r.int(1, 9), n = r.int(2, 4); return { q: R`<p>Find $\displaystyle\lim_{x\to\infty}\frac{${a}x^${n} + 3x}{${b}x^${n} - 1}$.</p>`, answer: a / b, tol: 0.005, solution: R`<p>Leading terms: $${a}/${b} = ${f(a / b, 4)}$.</p>` }; } },
    { title: 'sin(ax)/(bx)', gen: (r) => { const a = r.int(1, 9), b = r.int(1, 9); return { q: R`<p>Find $\displaystyle\lim_{x\to0}\frac{\sin ${a}x}{${b}x}$.</p>`, answer: a / b, tol: 0.005, solution: R`<p>$\dfrac{${a}}{${b}}\cdot\dfrac{\sin${a}x}{${a}x} \to ${f(a / b, 4)}$.</p>` }; } }
  ]);

  /* ===================== 3. Derivatives ===================== */
  const DF = { sq: [(x) => x * x, (x) => 2 * x, 'x²'], cube: [(x) => x * x * x / 3, (x) => x * x, 'x³/3'], sin: [Math.sin, Math.cos, 'sin x'], exp: [Math.exp, Math.exp, 'eˣ'], ln: [(x) => (x > 0 ? Math.log(x) : NaN), (x) => (x > 0 ? 1 / x : NaN), 'ln x'] };
  PB.addChapter({
    id: 'math-derivatives', subject: 'maths', num: 3, part: 'Calculus',
    title: 'The Derivative',
    subtitle: R`Instantaneous rate of change. Slopes of tangents, the derivative as a limit, the power, product, quotient and chain rules, derivatives of exponentials, logs and trig functions, and implicit differentiation.`,
    big: 'The derivative is the slope of a curve at a single point: zoom in far enough and any smooth curve looks like a straight line, and the derivative is that line\u2019s slope. It answers "how fast is this changing right now?"',
    goals: ['Interpret the derivative as slope and rate', 'Differentiate from first principles', 'Use the power, product, quotient and chain rules', 'Differentiate eˣ, ln x, sin x and cos x', 'Differentiate implicitly'],
    sections: [
      { title: 'From average speed to instantaneous speed', html: R`
<p>A ball falls $s(t) = 5t^2$ metres in $t$ seconds. Its <strong>average speed</strong> between $t = 2$ and $t = 2 + h$ is</p>
$$\frac{s(2 + h) - s(2)}{h} = \frac{5(4 + 4h + h^2) - 20}{h} = 20 + 5h.$$
<p>Shrink the time interval: $h = 0.1$ gives 20.5, $h = 0.01$ gives 20.05. The <strong>instantaneous speed</strong> at $t = 2$ is the limit, 20 m/s.</p>
<p>Geometrically, $\dfrac{f(a + h) - f(a)}{h}$ is the slope of a <strong>secant</strong> line through two points on the graph. As $h \to 0$ the secant turns into the <strong>tangent</strong>, and its slope is the derivative:</p>
<div class="key"><p>$$f'(a) = \lim_{h\to0}\frac{f(a + h) - f(a)}{h}.$$ Other notations: $\dfrac{\mathrm dy}{\mathrm dx}$, $\dfrac{\mathrm d}{\mathrm dx}f(x)$, $\dot s$ (for time).</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For $f(x) = x^2$, the secant slope from $x = 3$ to $x = 3 + h$ is $6 + h$. What is $f'(3)$?`, 6, [R`Let $h \to 0$.`], R`$f'(3) = 6$.`)] },
      { title: 'Rules that save you the limit', html: R`
<p>Working out limits every time would be slow. A few rules do it for you. First, the <strong>power rule</strong>:</p>
$$\frac{\mathrm d}{\mathrm dx}x^n = nx^{n-1}\quad\text{for any real }n.$$
<p>So $(x^5)' = 5x^4$, $(\sqrt x)' = (x^{1/2})' = \tfrac12x^{-1/2}$ and $(1/x)' = -1/x^2$. Constants vanish, constant multiples come along for the ride, and sums can be done term by term: $(3x^4 - 2x + 7)' = 12x^3 - 2$.</p>
<p>For products and quotients:</p>
$$(uv)' = u'v + uv',\qquad \left(\frac uv\right)' = \frac{u'v - uv'}{v^2}.$$
<p>Note that the derivative of a product is <em>not</em> the product of the derivatives. Check with $x\cdot x$: the product rule gives $1\cdot x + x\cdot1 = 2x$, correct.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Differentiate $f(x) = 4x^3 - 6x^2 + 5$ and evaluate $f'(2)$.`, 24, [R`$f'(x) = 12x^2 - 12x$.`], R`$f'(2) = 48 - 24 = 24$.`),
          QN(R`If $f(x) = x^2\sqrt x$, what is $f'(4)$?`, 20, [R`Write it as one power: $x^{5/2}$.`], R`$f'(x) = \tfrac52x^{3/2}$, so $f'(4) = \tfrac52\cdot8 = 20$.`)] },
      { title: 'The chain rule', html: R`
<p>How do you differentiate $(3x + 1)^5$ without expanding it? Think of it as a machine inside a machine: the inner function $u = 3x + 1$ feeds the outer function $u^5$. Rates multiply: if $u$ changes 3 times as fast as $x$, and $y$ changes $5u^4$ times as fast as $u$, then</p>
<div class="key"><p>$$\frac{\mathrm dy}{\mathrm dx} = \frac{\mathrm dy}{\mathrm du}\cdot\frac{\mathrm du}{\mathrm dx}\qquad\text{so}\qquad \frac{\mathrm d}{\mathrm dx}(3x + 1)^5 = 5(3x + 1)^4\cdot3.$$</p></div>
<p>In words: differentiate the outside, keep the inside, then multiply by the derivative of the inside. Example: $\dfrac{\mathrm d}{\mathrm dx}\sqrt{x^2 + 9} = \dfrac{1}{2\sqrt{x^2 + 9}}\cdot2x = \dfrac{x}{\sqrt{x^2 + 9}}$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\dfrac{\mathrm d}{\mathrm dx}(2x - 1)^4$ at $x = 1$.`, 8, [R`Outside: $4u^3$. Inside derivative: 2.`], R`$4(2x - 1)^3\cdot2$; at $x = 1$ this is $4\cdot1\cdot2 = 8$.`)] },
      { title: 'Exponentials, logs, trig and implicit curves', html: R`
<p>The number $e$ is chosen so that $e^x$ is its own derivative: $(e^x)' = e^x$. With the chain rule, $(e^{kx})' = ke^{kx}$: the rate of growth is proportional to the size, which is why $e$ appears in every growth and decay law. Inverting gives $(\ln x)' = 1/x$.</p>
<p>From $\sin x/x \to 1$ (Chapter 2) one finds $(\sin x)' = \cos x$ and $(\cos x)' = -\sin x$. Then the quotient rule gives $(\tan x)' = \sec^2x$.</p>
<div class="key"><p>$(e^x)' = e^x,\quad (\ln x)' = \dfrac1x,\quad (\sin x)' = \cos x,\quad (\cos x)' = -\sin x,\quad (a^x)' = a^x\ln a.$</p></div>
<p>Some curves are given implicitly, such as the circle $x^2 + y^2 = 25$. Differentiate both sides with respect to $x$, treating $y$ as a function of $x$ (chain rule!): $2x + 2y\,y' = 0$, so $y' = -x/y$. At $(3, 4)$ the tangent slope is $-3/4$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the slope of $y = e^{2x}\sin x$ at $x = 0$.`, 1, [R`Product rule: $(e^{2x})'\sin x + e^{2x}(\sin x)'$.`], R`$2e^{2x}\sin x + e^{2x}\cos x$; at 0 this is $0 + 1 = 1$.`),
          QN(R`On the curve $x^2 + xy + y^2 = 7$, find $\mathrm dy/\mathrm dx$ at $(1, 2)$.`, -0.8, [R`Differentiate: $2x + (y + xy') + 2yy' = 0$.`], R`$2 + 2 + y' + 4y' = 0$, so $y' = -4/5 = -0.8$.`)] }
    ],
    figures: [
      { s: 0, title: 'Secant becomes tangent', caption: 'Shrink h and the secant line (orange) swings into the tangent; its slope approaches f′(a).', params: { controls: [S('a', 'Point a', -2, 2, 0.05, 1), S('h', 'Gap h', 0.01, 2, 0.01, 1)],
        plots: [{ x: [-3, 3.5], y: [-2, 9], zero: false, xlabel: 'x', ylabel: 'y = x²', curves: (v) => { const m = ((v.a + v.h) * (v.a + v.h) - v.a * v.a) / v.h; return [{ f: (x) => x * x, label: 'y = x²' }, { f: (x) => v.a * v.a + m * (x - v.a), color: 'rust', label: 'secant' }, { f: (x) => v.a * v.a + 2 * v.a * (x - v.a), color: 'ink3', dash: [4, 4], label: 'tangent' }]; }, pts: (v) => [{ x: v.a, y: v.a * v.a }, { x: v.a + v.h, y: (v.a + v.h) * (v.a + v.h), color: 'rust' }] }],
        readout: (v) => [['secant slope', f(2 * v.a + v.h, 4)], ['tangent slope f′(a) = 2a', f(2 * v.a, 4)]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Graph and derivative side by side', desc: 'The left plot shows f and its tangent at a point; the right shows f′. The height of f′ is the slope of f.',
        tasks: ['Where f has a peak or valley, what is f′?', 'For sin x, check that f′ looks like cos x.', 'For eˣ, why do the two plots look identical?', 'For ln x, where is the slope equal to 1?'],
        params: { aspect: 0.45, controls: [{ type: 'select', id: 'fn', label: 'f(x)', value: 'sin', options: Object.keys(DF).map((k) => [k, DF[k][2]]) }, S('x', 'Point x', -3, 3, 0.01, 1)],
          plots: [{ x: [-3.2, 3.2], y: [-3, 5], zero: false, xlabel: 'x', ylabel: 'f(x)', title: 'f', curves: (v) => [{ f: DF[v.fn][0] }, { f: (x) => DF[v.fn][0](v.x) + DF[v.fn][1](v.x) * (x - v.x), color: 'rust', dash: [5, 4], label: 'tangent', from: v.x - 1.2, to: v.x + 1.2 }], pts: (v) => [{ x: v.x, y: DF[v.fn][0](v.x) }] },
            { x: [-3.2, 3.2], y: [-3, 5], zero: false, xlabel: 'x', ylabel: "f′(x)", title: "f′", curves: (v) => [{ f: DF[v.fn][1], color: 'teal' }], pts: (v) => [{ x: v.x, y: DF[v.fn][1](v.x), color: 'rust' }] }],
          readout: (v) => [['f(x)', f(DF[v.fn][0](v.x))], ["f′(x) = slope", f(DF[v.fn][1](v.x))]] } },
      { sim: 'explore', title: 'Numerical derivative', desc: 'The difference quotient [f(x + h) − f(x)]/h for f = sin at x = 1. Too large an h is inaccurate; too small hits rounding error.',
        tasks: ['How does the error change when you divide h by 10?', 'Compare with the symmetric quotient [f(x + h) − f(x − h)]/2h. Why is it so much better?'],
        params: { aspect: 0.45, controls: [S('lh', 'log₁₀ h', -12, 0, 0.1, -2)],
          plots: [{ x: [-12, 0], y: [-12, 0], zero: false, xlabel: 'log₁₀ h', ylabel: 'log₁₀ |error|', curves: () => [{ f: (l) => { const h = Math.pow(10, l); return Math.log10(Math.abs((Math.sin(1 + h) - Math.sin(1)) / h - Math.cos(1)) + 1e-17); }, label: 'forward' }, { f: (l) => { const h = Math.pow(10, l); return Math.log10(Math.abs((Math.sin(1 + h) - Math.sin(1 - h)) / (2 * h) - Math.cos(1)) + 1e-17); }, color: 'rust', label: 'symmetric' }], vlines: (v) => [{ x: v.lh }] }],
          readout: (v) => { const h = Math.pow(10, v.lh); return [['forward estimate', f((Math.sin(1 + h) - Math.sin(1)) / h, 8)], ['symmetric estimate', f((Math.sin(1 + h) - Math.sin(1 - h)) / (2 * h), 8)], ['true cos 1', f(Math.cos(1), 8)]]; } } }
    ],
    formulas: [['Definition', "f'(x) = \\lim_{h\\to0}\\dfrac{f(x + h) - f(x)}{h}"], ['Power rule', '(x^n)\' = nx^{n-1}'], ['Product rule', '(uv)\' = u\'v + uv\''], ['Quotient rule', '\\left(\\dfrac uv\\right)\' = \\dfrac{u\'v - uv\'}{v^2}'], ['Chain rule', '\\dfrac{\\mathrm dy}{\\mathrm dx} = \\dfrac{\\mathrm dy}{\\mathrm du}\\dfrac{\\mathrm du}{\\mathrm dx}'], ['Standard derivatives', '(e^x)\' = e^x,\\ (\\ln x)\' = 1/x,\\ (\\sin x)\' = \\cos x,\\ (\\cos x)\' = -\\sin x']],
    problems: [
      P('concept', 'mcq', 'Meaning of the derivative', R`$h(t)$ is the height of a rocket in metres after $t$ seconds. What does $h'(10) = 250$ mean?`, 1, [R`Units of $h'$: metres per second.`], R`At $t = 10$ s the rocket is climbing at 250 m/s.`, { options: ['It is 250 m high after 10 s', 'At 10 s it climbs at 250 m/s', 'It takes 250 s to reach 10 m', 'Its average speed over 10 s is 250 m/s'] }),
      P('concept', 'mcq', 'Zero slope', R`At a smooth peak of a graph, the derivative is…`, 0, [R`What does the tangent look like at the top?`], R`Zero: the tangent is horizontal.`, { options: ['zero', 'positive', 'negative', 'undefined'] }),
      P('concept', 'mcq', 'Product rule trap', R`What is $\dfrac{\mathrm d}{\mathrm dx}(x^2\sin x)$?`, 2, [R`Product rule.`], R`$2x\sin x + x^2\cos x$.`, { options: ['$2x\\cos x$', '$2x\\sin x$', '$2x\\sin x + x^2\\cos x$', '$x^2\\cos x$'] }),
      P('concept', 'mcq', 'Chain rule', R`$\dfrac{\mathrm d}{\mathrm dx}\sin(x^2) = $`, 3, [R`Outside $\sin$, inside $x^2$.`], R`$\cos(x^2)\cdot2x$.`, { options: ['$\\cos(x^2)$', '$\\cos(2x)$', '$2\\cos x$', '$2x\\cos(x^2)$'] }),
      P('core', 'num', 'Tangent line', R`Find the $y$-intercept of the tangent to $y = x^3 - 2x$ at $x = 2$.`, -16, [R`Slope $= 3x^2 - 2 = 10$ at $x = 2$; the point is $(2, 4)$.`], R`$y - 4 = 10(x - 2)$ gives $y = 10x - 16$: intercept $-16$.`),
      P('core', 'num', 'Quotient rule', R`Find $f'(1)$ for $f(x) = \dfrac{x^2}{x + 1}$.`, 0.75, [R`$\dfrac{2x(x + 1) - x^2}{(x + 1)^2}$.`], R`$\dfrac{2\cdot2 - 1}{4} = \tfrac34$.`),
      P('core', 'num', 'Chain rule with e', R`Find the derivative of $y = e^{\sin x}$ at $x = 0$.`, 1, [R`$y' = e^{\sin x}\cos x$.`], R`$e^0\cdot1 = 1$.`),
      P('core', 'num', 'Log derivative', R`Find $\dfrac{\mathrm d}{\mathrm dx}\ln(x^2 + 1)$ at $x = 2$.`, 0.8, [R`Chain rule: $\dfrac{2x}{x^2 + 1}$.`], R`$4/5 = 0.8$.`),
      P('core', 'num', 'From first principles', R`Using the definition, the derivative of $f(x) = 1/x$ at $x = 2$ is $\lim_{h\to0}\dfrac{1/(2 + h) - 1/2}{h}$. Evaluate it.`, -0.25, [R`Combine the fractions: $\dfrac{-h}{2(2 + h)h}$.`], R`$\dfrac{-1}{2(2 + h)} \to -\tfrac14$.`),
      P('olympiad', 'num', 'Log differentiation', R`Find $f'(1)$ for $f(x) = x^x$.`, 1, [R`Take logs: $\ln f = x\ln x$.`, R`Differentiate: $f'/f = \ln x + 1$.`], R`$f'(x) = x^x(\ln x + 1)$, so $f'(1) = 1$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Higher derivative', R`Find the 10th derivative of $f(x) = x e^x$ at $x = 0$.`, 10, [R`Compute a few: $f' = (x + 1)e^x$, $f'' = (x + 2)e^x$.`], R`$f^{(n)} = (x + n)e^x$, so $f^{(10)}(0) = 10$.`, { tol: 0.001 }),
      P('olympiad', 'num', 'Common tangent', R`The line $y = mx$ (through the origin) is tangent to $y = e^x$. Find $m$.`, Math.E, [R`At the point of contact $x = a$: $e^a = ma$ and the slope $e^a = m$.`], R`So $ma = m$, $a = 1$ and $m = e \approx 2.718$.`)
    ]
  });
  PB.addDrills('math-derivatives', [
    { title: 'Power rule', gen: (r) => { const a = r.int(1, 6), n = r.int(2, 5), b = r.int(-5, 5), x = r.int(-3, 3); return { q: R`<p>$f(x) = ${a}x^${n} + ${b}x$. Find $f'(${x})$.</p>`, answer: a * n * Math.pow(x, n - 1) + b, tol: 0.001, solution: R`<p>$f'(x) = ${a * n}x^{${n - 1}} + ${b}$, so $f'(${x}) = ${a * n * Math.pow(x, n - 1) + b}$.</p>` }; } },
    { title: 'Chain rule', gen: (r) => { const a = r.int(1, 4), b = r.int(-3, 3), n = r.int(2, 4), x = r.int(0, 2); const val = n * Math.pow(a * x + b, n - 1) * a; return { q: R`<p>Find $\dfrac{\mathrm d}{\mathrm dx}(${a}x + (${b}))^${n}$ at $x = ${x}$.</p>`, answer: val, tol: 0.001, atol: 1e-9, solution: R`<p>$${n}(${a}x + ${b})^{${n - 1}}\cdot${a}$ at $x = ${x}$ gives $${val}$.</p>` }; } },
    { title: 'Exponential slope', gen: (r) => { const k = r.step(0.5, 3, 0.5), x = r.step(0, 2, 0.5); return { q: R`<p>Find the slope of $y = e^{${k}x}$ at $x = ${x}$.</p>`, answer: k * Math.exp(k * x), tol: 0.005, solution: R`<p>$${k}e^{${k}\cdot${x}} = ${f(k * Math.exp(k * x), 4)}$.</p>` }; } }
  ]);
})();
