/* Mathematics 14–16: inequalities, polynomials and functional equations, olympiad geometry. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3), d2r = Math.PI / 180;
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.005 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.005 } : {}, o || {});
  const line = (ctx, a, b) => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };

  /* ===================== 14. Inequalities ===================== */
  PB.addChapter({
    id: 'math-inequalities', subject: 'maths', num: 14, part: 'Olympiad Topics',
    title: 'Inequalities',
    subtitle: R`Proving that one thing is bigger than another, and finding the best possible bound. Squares are non-negative, AM–GM, Cauchy–Schwarz, rearrangement, Jensen, and strategies for olympiad inequalities.`,
    big: 'Almost every classical inequality grows from one fact: a square is never negative. AM–GM and Cauchy–Schwarz package that fact into tools that find maxima and minima without calculus, and they tell you exactly when equality happens.',
    goals: ['Prove inequalities by writing sums of squares', 'Apply AM–GM, including weighted splitting', 'Apply Cauchy–Schwarz', 'Use the rearrangement inequality and Jensen’s inequality', 'Find extreme values and their equality cases'],
    sections: [
      { title: 'Squares are never negative', html: R`
<p>Start from $(a - b)^2 \ge 0$. Expanding gives $a^2 + b^2 \ge 2ab$, with equality only when $a = b$. Divide by $ab > 0$: $\dfrac ab + \dfrac ba \ge 2$. Put $b = 1$: $x + \dfrac1x \ge 2$ for every $x > 0$.</p>
<p>A bigger example: $a^2 + b^2 + c^2 \ge ab + bc + ca$, because twice the difference is $(a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$. Writing a difference as a <strong>sum of squares</strong> (SOS) proves it non-negative and shows when equality holds.</p>
<div class="key"><p>Always ask: <strong>when is it equal?</strong> The equality case tells you what the optimum looks like and checks your proof.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the minimum of $x + \dfrac1x$ for $x > 0$?`, 2, [R`$x + 1/x - 2 = (\sqrt x - 1/\sqrt x)^2$.`], R`2, at $x = 1$.`)] },
      { title: 'AM–GM', html: R`
<div class="key"><p><strong>AM–GM.</strong> For non-negative numbers, the arithmetic mean is at least the geometric mean: $$\frac{a_1 + \dots + a_n}n \ge \sqrt[n]{a_1\cdots a_n},$$ with equality exactly when all $a_i$ are equal.</p></div>
<p>For two numbers this is $(\sqrt a - \sqrt b)^2 \ge 0$. Geometrically: of all rectangles with a given perimeter, the square has the largest area.</p>
<div data-fig="0"></div>
<p><strong>Splitting trick.</strong> To minimise $x^2 + \dfrac{16}x$ for $x > 0$, split the second term so the product is constant: $x^2 + \dfrac8x + \dfrac8x \ge 3\sqrt[3]{64} = 12$, with equality when $x^2 = 8/x$, i.e. $x = 2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Positive $x, y$ satisfy $x + y = 6$. What is the largest possible value of $xy$?`, 9, [R`$\sqrt{xy} \le (x + y)/2 = 3$.`], R`$xy \le 9$, with equality at $x = y = 3$.`)] },
      { title: 'Cauchy–Schwarz', html: R`
<div class="key"><p><strong>Cauchy–Schwarz.</strong> $$(a_1b_1 + \dots + a_nb_n)^2 \le (a_1^2 + \dots + a_n^2)(b_1^2 + \dots + b_n^2),$$ with equality when the vectors are proportional.</p></div>
<p>It is the statement $|\vec a\cdot\vec b| \le |\vec a||\vec b|$, i.e. $|\cos\theta| \le 1$. Example: if $x^2 + y^2 = 1$, then $3x + 4y \le \sqrt{3^2 + 4^2}\sqrt{x^2 + y^2} = 5$.</p>
<p>A very useful form (<strong>Engel's form</strong>, or Titu's lemma): $$\frac{a_1^2}{b_1} + \dots + \frac{a_n^2}{b_n} \ge \frac{(a_1 + \dots + a_n)^2}{b_1 + \dots + b_n}.$$ It proves, for example, $(a + b + c)\left(\tfrac1a + \tfrac1b + \tfrac1c\right) \ge 9$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`If $x + 2y = 5$, what is the minimum of $x^2 + y^2$?`, 5, [R`Cauchy: $(x + 2y)^2 \le (1 + 4)(x^2 + y^2)$.`], R`$25 \le 5(x^2 + y^2)$, so the minimum is 5, at $(x, y) = (1, 2)$.`)] },
      { title: 'Rearrangement, Jensen and strategy', html: R`
<p><strong>Rearrangement.</strong> If $a_1 \le \dots \le a_n$ and $b_1 \le \dots \le b_n$, then $\sum a_ib_i$ is largest when the two lists are sorted the same way and smallest when sorted opposite ways. (Pay the biggest salary to the hardest worker.)</p>
<p><strong>Jensen.</strong> For a <em>convex</em> function (one that curves up, $f'' \ge 0$), the function of the average is at most the average of the function: $f\left(\frac{x_1 + \dots + x_n}n\right) \le \frac{f(x_1) + \dots + f(x_n)}n$. Applied to $-\ln x$ (convex) it gives AM–GM again.</p>
<p><strong>The mean chain</strong> for positive numbers: $\text{QM} \ge \text{AM} \ge \text{GM} \ge \text{HM}$.</p>
<p><strong>Strategy.</strong> Guess the equality case first (often all variables equal, or one of them zero). Normalise using homogeneity (e.g. set $a + b + c = 1$). Then choose the tool whose equality case matches yours.</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For positive $a, b, c$, what is the minimum of $\dfrac ab + \dfrac bc + \dfrac ca$?`, 3, [R`AM–GM on the three terms: their product is 1.`], R`$\ge 3\sqrt[3]{1} = 3$, at $a = b = c$.`)] }
    ],
    figures: [
      { s: 1, title: 'AM–GM in a semicircle', caption: 'Split a diameter into a and b. The radius is the AM, (a + b)/2; the half-chord at the split is the GM, √(ab). The radius always wins.', params: { picFrac: 0.55, controls: [S('a', 'a', 0.1, 9.9, 0.1, 3)],
        draw: (ctx, Cc, v, b, U) => { const a = v.a, bb = 10 - a, R = 5, sc = Math.min(b.w / 11, b.h / 6.5), cx = b.x + b.w / 2, cy = b.y + b.h - 12; ctx.strokeStyle = Cc.ink3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R * sc, Math.PI, 0); ctx.stroke(); line(ctx, [cx - R * sc, cy], [cx + R * sc, cy]); const px = cx - R * sc + a * sc, g = Math.sqrt(a * bb); ctx.strokeStyle = Cc.rust; ctx.lineWidth = 3; line(ctx, [px, cy], [px, cy - g * sc]); ctx.strokeStyle = Cc.accent; line(ctx, [cx, cy], [cx, cy - R * sc]); U.text(ctx, 'GM = √(ab)', px + 5, cy - g * sc / 2, Cc.rust, U.ui(12, 700)); U.text(ctx, 'AM', cx + 5, cy - R * sc + 14, Cc.accent, U.ui(12, 700)); U.text(ctx, 'a', (cx - R * sc + px) / 2, cy + 12, Cc.ink2, U.ui(12), 'center'); U.text(ctx, 'b', (px + cx + R * sc) / 2, cy + 12, Cc.ink2, U.ui(12), 'center'); },
        plots: [{ x: [0, 10], y: [0, 6], xlabel: 'a (with a + b = 10)', ylabel: 'mean', curves: () => [{ f: () => 5, label: 'AM' }, { f: (a) => Math.sqrt(a * (10 - a)), color: 'rust', label: 'GM' }, { f: (a) => 2 * a * (10 - a) / 10, color: 'teal', dash: [4, 4], label: 'HM' }], vlines: (v) => [{ x: v.a }] }],
        readout: (v) => [['AM', '5'], ['GM', f(Math.sqrt(v.a * (10 - v.a)), 4)], ['HM', f(2 * v.a * (10 - v.a) / 10, 4)]] } },
      { s: 3, title: 'Jensen: chords lie above a convex curve', caption: 'For convex f, the average of f(x₁) and f(x₂) (the chord midpoint) is above f of the average.', params: { controls: [S('x1', 'x₁', -2, 2, 0.05, -1.5), S('x2', 'x₂', -2, 2, 0.05, 1.2)],
        plots: [{ x: [-2.2, 2.2], y: [-0.5, 9], zero: false, xlabel: 'x', ylabel: 'f(x) = eˣ', curves: (v) => [{ f: Math.exp }, { f: (x) => Math.exp(v.x1) + (Math.exp(v.x2) - Math.exp(v.x1)) * (x - v.x1) / ((v.x2 - v.x1) || 1e-9), color: 'rust', from: Math.min(v.x1, v.x2), to: Math.max(v.x1, v.x2), label: 'chord' }], pts: (v) => { const m = (v.x1 + v.x2) / 2; return [{ x: m, y: (Math.exp(v.x1) + Math.exp(v.x2)) / 2, color: 'rust', label: 'average of f' }, { x: m, y: Math.exp(m), label: 'f(average)' }]; } }] } }
    ],
    labs: [
      { sim: 'explore', title: 'The four means', desc: 'QM ≥ AM ≥ GM ≥ HM for two positive numbers, all equal only when a = b.',
        tasks: ['Make the four means equal.', 'Make a tiny and b large: which mean is most affected?'],
        params: { aspect: 0.45, controls: [S('a', 'a', 0.1, 10, 0.1, 2), S('b', 'b', 0.1, 10, 0.1, 8)],
          plots: [{ x: [0, 4], y: [0, 10], xlabel: 'QM · AM · GM · HM', ylabel: 'value', n: 400, curves: (v) => { const m = [Math.sqrt((v.a * v.a + v.b * v.b) / 2), (v.a + v.b) / 2, Math.sqrt(v.a * v.b), 2 * v.a * v.b / (v.a + v.b)]; return [{ f: (x) => (x % 1 < 0.7 ? m[Math.min(3, Math.floor(x))] : 0), color: 'accent' }]; } }],
          readout: (v) => [['QM', f(Math.sqrt((v.a * v.a + v.b * v.b) / 2), 4)], ['AM', f((v.a + v.b) / 2, 4)], ['GM', f(Math.sqrt(v.a * v.b), 4)], ['HM', f(2 * v.a * v.b / (v.a + v.b), 4)]] } },
      { sim: 'explore', title: 'Cauchy–Schwarz on the circle', desc: 'On the unit circle x² + y² = 1, the linear function px + qy ranges between ±√(p² + q²), reached when (x, y) points along (p, q).',
        tasks: ['Find the angle that maximises 3x + 4y.', 'Explain why the maximiser is parallel to (p, q).'],
        params: { aspect: 0.45, controls: [S('p', 'p', -5, 5, 0.1, 3), S('q', 'q', -5, 5, 0.1, 4)],
          plots: [{ x: [0, 360], y: [-7.5, 7.5], zero: false, xlabel: 'angle θ of (x, y) = (cos θ, sin θ)', ylabel: 'px + qy', curves: (v) => [{ f: (t) => v.p * Math.cos(t * d2r) + v.q * Math.sin(t * d2r) }], hlines: (v) => [{ y: Math.hypot(v.p, v.q), label: '√(p² + q²)' }, { y: -Math.hypot(v.p, v.q) }] }],
          readout: (v) => [['maximum', f(Math.hypot(v.p, v.q), 4)], ['at θ', f(((Math.atan2(v.q, v.p) / d2r) + 360) % 360) + '°']] } }
    ],
    formulas: [['Two squares', 'a^2 + b^2 \\ge 2ab'], ['AM–GM', '\\dfrac{a_1 + \\dots + a_n}{n} \\ge \\sqrt[n]{a_1\\cdots a_n}'], ['Cauchy–Schwarz', '\\left(\\sum a_ib_i\\right)^2 \\le \\sum a_i^2\\sum b_i^2'], ['Engel form', '\\sum\\dfrac{a_i^2}{b_i} \\ge \\dfrac{(\\sum a_i)^2}{\\sum b_i}'], ['Mean chain', '\\text{QM} \\ge \\text{AM} \\ge \\text{GM} \\ge \\text{HM}'], ['Jensen (convex f)', 'f\\left(\\tfrac{\\sum x_i}n\\right) \\le \\tfrac{\\sum f(x_i)}n']],
    problems: [
      P('concept', 'mcq', 'Equality case', R`Equality in AM–GM for positive numbers holds when…`, 1, [R`Look at $(\sqrt a - \sqrt b)^2 = 0$.`], R`All the numbers are equal.`, { options: ['one of them is zero', 'all of them are equal', 'their sum is 1', 'never'] }),
      P('concept', 'mcq', 'Mean order', R`For positive $a \ne b$, which is smallest?`, 3, [R`QM ≥ AM ≥ GM ≥ HM.`], R`The harmonic mean.`, { options: ['quadratic mean', 'arithmetic mean', 'geometric mean', 'harmonic mean'] }),
      P('concept', 'mcq', 'Convexity', R`Which function is convex on $x > 0$?`, 0, [R`Check $f'' \ge 0$.`], R`$1/x$: $f'' = 2/x^3 > 0$. ($\ln x$ and $\sqrt x$ are concave.)`, { options: ['$1/x$', '$\\ln x$', '$\\sqrt x$', '$-x^2$'] }),
      P('concept', 'mcq', 'Rearrangement', R`With $a = (1, 2, 3)$ and $b$ a permutation of $(4, 5, 6)$, $\sum a_ib_i$ is largest when $b = $`, 2, [R`Sort both the same way.`], R`$(4, 5, 6)$: $4 + 10 + 18 = 32$.`, { options: ['$(6, 5, 4)$', '$(5, 4, 6)$', '$(4, 5, 6)$', 'any order'] }),
      P('core', 'num', 'Minimum by AM–GM', R`Find the minimum of $2x + \dfrac8x$ for $x > 0$.`, 8, [R`$2x + 8/x \ge 2\sqrt{16}$.`], R`8, at $x = 2$.`),
      P('core', 'num', 'Reciprocal sum', R`Find the minimum of $(a + b)\left(\dfrac1a + \dfrac1b\right)$ for positive $a, b$.`, 4, [R`Expand: $2 + a/b + b/a$.`], R`$2 + 2 = 4$, at $a = b$.`),
      P('core', 'num', 'Split AM–GM', R`Find the minimum of $x^2 + \dfrac{16}{x}$ for $x > 0$.`, 12, [R`Write it as $x^2 + \tfrac8x + \tfrac8x$.`], R`$\ge 3\sqrt[3]{64} = 12$, at $x = 2$.`),
      P('core', 'num', 'Cauchy maximum', R`If $a^2 + b^2 + c^2 = 4$, find the maximum of $a + 2b + 2c$.`, 6, [R`$(a + 2b + 2c)^2 \le (1 + 4 + 4)(a^2 + b^2 + c^2)$.`], R`$\sqrt{9\cdot4} = 6$.`),
      P('core', 'num', 'Box', R`A box with a square base and no lid has volume 32. What is the least possible surface area?`, 48, [R`Base $x$, height $32/x^2$: $A = x^2 + 128/x$.`, R`Split: $x^2 + 64/x + 64/x$.`], R`$\ge 3\sqrt[3]{4096} = 48$, at $x = 4$, height 2.`),
      P('olympiad', 'num', 'Nine', R`For positive $x, y, z$, find the minimum of $(x + y + z)\left(\dfrac1x + \dfrac1y + \dfrac1z\right)$.`, 9, [R`Cauchy, or AM–GM on each bracket.`], R`$\ge 3\sqrt[3]{xyz}\cdot\dfrac{3}{\sqrt[3]{xyz}} = 9$.`),
      P('olympiad', 'num', 'Nesbitt', R`For positive $a, b, c$, find the minimum of $\dfrac{a}{b + c} + \dfrac{b}{c + a} + \dfrac{c}{a + b}$.`, 1.5, [R`Add 1 to each term: $(a + b + c)\sum\dfrac1{b + c}$.`, R`Then use $(x + y + z)(\tfrac1x + \tfrac1y + \tfrac1z) \ge 9$ with $x = b + c$ etc.`], R`$\sum \ge \tfrac92 - 3 = \tfrac32$, at $a = b = c$ (Nesbitt's inequality).`),
      P('olympiad', 'num', 'Constrained product', R`Positive $a, b, c$ satisfy $a + b + c = 3$. Find the maximum of $ab + bc + ca$.`, 3, [R`$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$ and $a^2 + b^2 + c^2 \ge ab + bc + ca$.`], R`$9 \ge 3(ab + bc + ca)$, so the maximum is 3, at $a = b = c = 1$.`)
    ]
  });
  PB.addDrills('math-inequalities', [
    { title: 'AM–GM minimum', gen: (r) => { const a = r.int(1, 9), b = r.int(1, 9); return { q: R`<p>Minimum of $${a}x + \dfrac{${b}}{x}$ for $x > 0$?</p>`, answer: 2 * Math.sqrt(a * b), tol: 0.002, solution: R`<p>$2\sqrt{${a}\cdot${b}} = ${f(2 * Math.sqrt(a * b), 4)}$, at $x = \sqrt{${b}/${a}}$.</p>` }; } },
    { title: 'Maximum product', gen: (r) => { const s = r.int(2, 30); return { q: R`<p>Positive $x + y = ${s}$. Largest value of $xy$?</p>`, answer: s * s / 4, tol: 0.001, solution: R`<p>$(${s}/2)^2 = ${f(s * s / 4, 4)}$.</p>` }; } },
    { title: 'Cauchy bound', gen: (r) => { const p = r.int(1, 8), q = r.int(1, 8), R2 = r.int(1, 9); return { q: R`<p>If $x^2 + y^2 = ${R2}$, find the maximum of $${p}x + ${q}y$.</p>`, answer: Math.sqrt((p * p + q * q) * R2), tol: 0.002, solution: R`<p>$\sqrt{(${p}^2 + ${q}^2)\cdot${R2}} = ${f(Math.sqrt((p * p + q * q) * R2), 4)}$.</p>` }; } }
  ]);

  /* ===================== 15. Polynomials and functional equations ===================== */
  PB.addChapter({
    id: 'math-algebra', subject: 'maths', num: 15, part: 'Olympiad Topics',
    title: 'Polynomials and Functional Equations',
    subtitle: R`The algebra of olympiads. The remainder and factor theorems, Vieta's formulas linking roots and coefficients, symmetric expressions in the roots, and solving equations whose unknown is a function.`,
    big: 'A polynomial is pinned down by its roots, and Vieta’s formulas let you work with the roots without ever finding them. Functional equations turn the usual question round: instead of solving for x, you solve for the whole function, by plugging in clever values.',
    goals: ['Use the remainder and factor theorems', 'Apply Vieta’s formulas', 'Compute symmetric expressions such as α² + β² and α³ + β³', 'Interpolate a polynomial through given points', 'Solve functional equations by substitution'],
    sections: [
      { title: 'Remainders and factors', html: R`
<p>Dividing a polynomial $P(x)$ by $x - a$ leaves a constant remainder $r$: $P(x) = (x - a)Q(x) + r$. Put $x = a$:</p>
<div class="key"><p><strong>Remainder theorem:</strong> the remainder is $P(a)$.<br><strong>Factor theorem:</strong> $x - a$ is a factor exactly when $P(a) = 0$.</p></div>
<p>So $x^3 - 6x^2 + 11x - 6$ has the factor $x - 1$ (since $1 - 6 + 11 - 6 = 0$), and dividing out gives $(x - 1)(x - 2)(x - 3)$. Rational roots $p/q$ of an integer polynomial must have $p$ dividing the constant term and $q$ dividing the leading coefficient, which narrows the search.</p>
<p>A polynomial of degree $n$ has at most $n$ roots. Over the complex numbers it has exactly $n$, counted with multiplicity (the fundamental theorem of algebra).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the remainder when $x^3 - 2x + 5$ is divided by $x - 2$.`, 9, [R`Evaluate at $x = 2$.`], R`$8 - 4 + 5 = 9$.`)] },
      { title: 'Vieta’s formulas', html: R`
<p>If a quadratic $ax^2 + bx + c$ has roots $\alpha, \beta$, then $a(x - \alpha)(x - \beta) = ax^2 - a(\alpha + \beta)x + a\alpha\beta$. Comparing coefficients:</p>
<div class="key"><p>$\alpha + \beta = -\dfrac ba,\qquad \alpha\beta = \dfrac ca.$<br>For a cubic $ax^3 + bx^2 + cx + d$: $\sum\alpha = -\dfrac ba$, $\sum\alpha\beta = \dfrac ca$, $\alpha\beta\gamma = -\dfrac da$.</p></div>
<p>The signs alternate, starting with minus. These let you answer questions about the roots without solving: the roots of $x^2 - 7x + 10$ add to 7 and multiply to 10 (they are 2 and 5).</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the sum of the roots of $2x^2 - 7x + 3 = 0$?`, 3.5, [R`$-b/a$.`], R`$7/2 = 3.5$.`)] },
      { title: 'Symmetric expressions', html: R`
<p>Any expression in the roots that does not change when you swap them can be written using $s = \alpha + \beta$ and $p = \alpha\beta$:</p>
$$\alpha^2 + \beta^2 = s^2 - 2p,\qquad \alpha^3 + \beta^3 = s^3 - 3ps,\qquad \frac1\alpha + \frac1\beta = \frac sp.$$
<p>For $x^2 - 5x + 3$: $s = 5$, $p = 3$, so $\alpha^2 + \beta^2 = 25 - 6 = 19$.</p>
<p>To find a new equation whose roots are, say, $\alpha^2$ and $\beta^2$, compute their sum and product: $19$ and $p^2 = 9$, giving $x^2 - 19x + 9 = 0$.</p>
<p><strong>Newton's sums</strong> extend this: the power sums $S_k = \alpha^k + \beta^k$ satisfy $S_k = sS_{k-1} - pS_{k-2}$, a recurrence you can run as far as you like.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`The roots of $x^2 - 5x + 3 = 0$ are $\alpha, \beta$. Find $\alpha^2 + \beta^2$.`, 19, [R`$(\alpha + \beta)^2 - 2\alpha\beta$.`], R`$25 - 6 = 19$.`)] },
      { title: 'Functional equations', html: R`
<p>A <strong>functional equation</strong> asks for all functions satisfying a condition, such as $f(x + y) = f(x) + f(y)$. The main moves:</p>
<ul><li><strong>Plug in special values</strong>: $x = y = 0$ gives $f(0) = 2f(0)$, so $f(0) = 0$.</li>
<li><strong>Swap or substitute</strong> to get a second equation and solve simultaneously (as in Chapter 1's problem with $f(1/x)$).</li>
<li><strong>Build up</strong>: from $f(x + y) = f(x) + f(y)$, $f(2) = 2f(1)$, $f(n) = nf(1)$, then $f(p/q) = \tfrac pqf(1)$. With continuity, $f(x) = cx$ (Cauchy's equation).</li>
<li><strong>Check your answer</strong> in the original equation: substitutions only find candidates.</li></ul>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`$f(x + y) = f(x) + f(y)$ for all $x, y$, and $f(1) = 3$. Find $f(5)$.`, 15, [R`$f(2) = f(1) + f(1)$, and so on.`], R`$f(5) = 5f(1) = 15$.`)] }
    ],
    figures: [
      { s: 1, title: 'Roots and coefficients', caption: 'Slide the three roots of a monic cubic. The coefficients follow Vieta: x³ − (Σr)x² + (Σrr)x − (rrr).', params: { controls: [S('a', 'Root r₁', -3, 3, 0.1, -2), S('b', 'Root r₂', -3, 3, 0.1, 0.5), S('c', 'Root r₃', -3, 3, 0.1, 2)],
        plots: [{ x: [-3.5, 3.5], y: [-12, 12], zero: false, xlabel: 'x', ylabel: 'P(x)', curves: (v) => [{ f: (x) => (x - v.a) * (x - v.b) * (x - v.c) }], pts: (v) => [{ x: v.a, y: 0 }, { x: v.b, y: 0 }, { x: v.c, y: 0 }] }],
        readout: (v) => { const s1 = v.a + v.b + v.c, s2 = v.a * v.b + v.b * v.c + v.c * v.a, s3 = v.a * v.b * v.c; return [['P(x)', 'x³ − (' + f(s1) + ')x² + (' + f(s2) + ')x − (' + f(s3) + ')'], ['sum of roots', f(s1)], ['product', f(s3)]]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Lagrange interpolation', desc: 'Through any n points with different x-values there is exactly one polynomial of degree below n. Move the heights of four points at x = 0, 1, 2, 3.',
        tasks: ['Make all four heights equal. What degree is the polynomial?', 'Set heights 0, 1, 4, 9. Which polynomial appears?', 'Why can a cubic not pass through five points in general?'],
        params: { aspect: 0.45, controls: [S('y0', 'P(0)', -5, 5, 0.1, 1), S('y1', 'P(1)', -5, 5, 0.1, 2), S('y2', 'P(2)', -5, 5, 0.1, -1), S('y3', 'P(3)', -5, 5, 0.1, 3)],
          plots: [{ x: [-0.5, 3.5], y: [-8, 8], zero: false, xlabel: 'x', ylabel: 'P(x)', curves: (v) => { const ys = [v.y0, v.y1, v.y2, v.y3]; return [{ f: (x) => { let s = 0; for (let i = 0; i < 4; i++) { let t = ys[i]; for (let j = 0; j < 4; j++) if (j !== i) t *= (x - j) / (i - j); s += t; } return s; } }]; }, pts: (v) => [v.y0, v.y1, v.y2, v.y3].map((y, i) => ({ x: i, y: y })) }],
          readout: (v) => { const ys = [v.y0, v.y1, v.y2, v.y3]; const d3 = ys[3] - 3 * ys[2] + 3 * ys[1] - ys[0]; return [['leading coefficient (Δ³/6)', f(d3 / 6, 4)], ['P(4) by extrapolation', f(ys[3] * 4 - ys[2] * 6 + ys[1] * 4 - ys[0], 4)]]; } } },
      { sim: 'explore', title: 'Newton’s sums', desc: 'For x² − sx + p with roots α, β, the power sums S_k = αᵏ + βᵏ obey S_k = sS_{k−1} − pS_{k−2}.',
        tasks: ['With s = 1, p = −1 the sums are Lucas numbers 1, 3, 4, 7, 11, … Why?', 'With s = 0, p = 1 the roots are ±i. Explain the period-4 pattern.'],
        params: { aspect: 0.4, controls: [S('s', 's = α + β', -3, 3, 0.1, 1), S('p', 'p = αβ', -3, 3, 0.1, -1)],
          plots: [{ x: [0, 10], y: 'auto', zero: false, xlabel: 'k', ylabel: 'S_k', n: 10, curves: () => [], pts: (v) => { const S = [2, v.s]; for (let k = 2; k <= 10; k++) S.push(v.s * S[k - 1] - v.p * S[k - 2]); return S.map((y, k) => ({ x: k, y: y, r: 4 })); } }],
          readout: (v) => { const S = [2, v.s]; for (let k = 2; k <= 6; k++) S.push(v.s * S[k - 1] - v.p * S[k - 2]); return [['S₀…S₆', S.map((x) => f(x, 4)).join(', ')]]; } } }
    ],
    formulas: [['Remainder theorem', 'P(x) \\bmod (x - a) = P(a)'], ['Vieta (quadratic)', '\\alpha + \\beta = -b/a,\\ \\alpha\\beta = c/a'], ['Vieta (cubic)', '\\sum\\alpha = -b/a,\\ \\sum\\alpha\\beta = c/a,\\ \\alpha\\beta\\gamma = -d/a'], ['Symmetric sums', '\\alpha^2 + \\beta^2 = s^2 - 2p,\\ \\alpha^3 + \\beta^3 = s^3 - 3ps'], ['Newton', 'S_k = sS_{k-1} - pS_{k-2}'], ['Cauchy equation', 'f(x + y) = f(x) + f(y) \\Rightarrow f(x) = cx\\ (\\text{continuous})']],
    problems: [
      P('concept', 'mcq', 'Degree', R`The degree of $(x^3 + 1)(x^4 - x)$ is…`, 2, [R`Degrees add when you multiply.`], R`$3 + 4 = 7$.`, { options: ['4', '12', '7', '3'] }),
      P('concept', 'mcq', 'Factor theorem', R`$x + 2$ is a factor of $P(x)$ exactly when…`, 1, [R`$x + 2 = x - (-2)$.`], R`$P(-2) = 0$.`, { options: ['$P(2) = 0$', '$P(-2) = 0$', '$P(0) = 2$', 'the leading coefficient is 2'] }),
      P('concept', 'mcq', 'Real roots', R`How many real roots does $x^3 + x + 1 = 0$ have?`, 0, [R`The derivative $3x^2 + 1 > 0$: always increasing.`], R`Exactly one.`, { options: ['1', '2', '3', '0'] }),
      P('concept', 'mcq', 'f(0)', R`If $f(x + y) = f(x)f(y)$ for all $x, y$ and $f$ is not identically zero, then $f(0) = $`, 1, [R`Put $y = 0$: $f(x) = f(x)f(0)$.`], R`1.`, { options: ['0', '1', '−1', 'any value'] }),
      P('core', 'num', 'Finding k', R`For which $k$ is $x - 1$ a factor of $x^3 + kx^2 - 4$?`, 3, [R`Need $P(1) = 0$.`], R`$1 + k - 4 = 0$, $k = 3$.`),
      P('core', 'num', 'Sum of squares of roots', R`The roots of $x^3 - 6x^2 + 11x - 6 = 0$ are $a, b, c$. Find $a^2 + b^2 + c^2$.`, 14, [R`$(\sum a)^2 - 2\sum ab$.`], R`$36 - 22 = 14$ (the roots are 1, 2, 3).`),
      P('core', 'num', 'Product of roots', R`Find the product of the roots of $3x^3 - 5x + 12 = 0$.`, -4, [R`$-d/a$.`], R`$-12/3 = -4$.`),
      P('core', 'num', 'Cubes of roots', R`$\alpha, \beta$ are the roots of $x^2 - 3x + 1 = 0$. Find $\alpha^3 + \beta^3$.`, 18, [R`$s^3 - 3ps$ with $s = 3$, $p = 1$.`], R`$27 - 9 = 18$.`),
      P('core', 'num', 'Reciprocal roots', R`Find the sum of the reciprocals of the roots of $x^3 - 7x^2 + 4x + 12 = 0$.`, -1 / 3, [R`$\dfrac1a + \dfrac1b + \dfrac1c = \dfrac{ab + bc + ca}{abc}$.`], R`$\dfrac{4}{-12} = -\tfrac13$.`),
      P('olympiad', 'num', 'Interpolation trick', R`$P$ is a monic cubic with $P(1) = 1$, $P(2) = 2$, $P(3) = 3$. Find $P(4)$.`, 10, [R`$P(x) - x$ has roots 1, 2, 3.`], R`$P(x) = x + (x - 1)(x - 2)(x - 3)$, so $P(4) = 4 + 6 = 10$.`),
      P('olympiad', 'num', 'Simultaneous substitution', R`For all $x$, $f(x) + 2f(1 - x) = x^2$. Find $f(0)$.`, 2 / 3, [R`Write the equation at $x = 0$ and at $x = 1$.`], R`$f(0) + 2f(1) = 0$ and $f(1) + 2f(0) = 1$. Solving: $f(1) = -\tfrac13$, $f(0) = \tfrac23$.`),
      P('olympiad', 'num', 'Power sum', R`$\alpha, \beta$ are the roots of $x^2 - x - 1 = 0$. Find $\alpha^{10} + \beta^{10}$.`, 123, [R`Newton: $S_k = S_{k-1} + S_{k-2}$ with $S_0 = 2$, $S_1 = 1$.`], R`Lucas numbers: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123.`)
    ]
  });
  PB.addDrills('math-algebra', [
    { title: 'Remainder theorem', gen: (r) => { const a = r.int(-3, 3), b = r.int(-5, 5), c = r.int(-5, 5), k = r.int(-3, 3); const val = k * k * k + a * k * k + b * k + c; return { q: R`<p>Remainder when $x^3 + (${a})x^2 + (${b})x + (${c})$ is divided by $x - (${k})$?</p>`, answer: val, tol: 0.001, atol: 1e-9, solution: R`<p>$P(${k}) = ${val}$.</p>` }; } },
    { title: 'Vieta sum and product', gen: (r) => { const p = r.int(-6, 6), q = r.int(-6, 6); return { q: R`<p>The roots of $x^2 - (${p + q})x + (${p * q}) = 0$ are $\alpha, \beta$. Find $\alpha^2 + \beta^2$.</p>`, answer: p * p + q * q, tol: 0.001, atol: 1e-9, solution: R`<p>$s^2 - 2p = ${(p + q) * (p + q)} - ${2 * p * q} = ${p * p + q * q}$.</p>` }; } },
    { title: 'Cauchy equation', gen: (r) => { const c = r.int(2, 9), n = r.int(2, 12); return { q: R`<p>$f(x + y) = f(x) + f(y)$ and $f(1) = ${c}$. Find $f(${n})$.</p>`, answer: c * n, tol: 0.001, solution: R`<p>$f(${n}) = ${n}f(1) = ${c * n}$.</p>` }; } }
  ]);

  /* ===================== 16. Olympiad geometry ===================== */
  PB.addChapter({
    id: 'math-geometry', subject: 'maths', num: 16, part: 'Olympiad Topics',
    title: 'Olympiad Geometry',
    subtitle: R`Seeing why. Angle chasing and circle theorems, similar triangles, power of a point and cyclic quadrilaterals, triangle centres, and trigonometry in triangles with the sine and cosine rules.`,
    big: 'Geometry problems are solved by finding hidden equal angles and similar triangles. A few circle theorems, especially "angles in the same segment are equal", do most of the work; the sine and cosine rules turn the rest into algebra.',
    goals: ['Chase angles with the circle theorems', 'Use similar triangles and ratios', 'Apply power of a point and recognise cyclic quadrilaterals', 'Locate the centroid, circumcentre, incentre and orthocentre', 'Use the sine rule, cosine rule and area formulas'],
    sections: [
      { title: 'Angles and circles', html: R`
<p>Angles on a straight line add to 180°, and so do the angles of a triangle. In an $n$-gon they add to $(n - 2)180^\circ$.</p>
<p>The key circle fact: <strong>an angle at the circumference is half the angle at the centre</strong> standing on the same arc. Consequences:</p>
<ul><li>Angles standing on the same arc are equal (angles in the same segment).</li>
<li>An angle in a semicircle is $90^\circ$ (Thales).</li>
<li>Opposite angles of a cyclic quadrilateral add to $180^\circ$; conversely, if they do, the four points lie on a circle.</li>
<li>A tangent is perpendicular to the radius; the angle between a tangent and a chord equals the angle in the alternate segment.</li></ul>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`An arc subtends $100^\circ$ at the centre of a circle. What angle does it subtend at a point on the rest of the circumference?`, 50, [R`Half the central angle.`], R`$50^\circ$.`)] },
      { title: 'Similar triangles and Pythagoras', html: R`
<p>Triangles are <strong>similar</strong> if their angles match (AA is enough). Then all their sides are in the same ratio, and their areas are in the square of that ratio.</p>
<p>Similar triangles hide everywhere: a line parallel to one side of a triangle cuts off a similar triangle; the altitude to the hypotenuse of a right triangle splits it into two triangles similar to the whole, which proves Pythagoras ($a^2 + b^2 = c^2$) and gives $h^2 = pq$ for the two pieces $p, q$ of the hypotenuse.</p>
<p>The <strong>angle bisector theorem</strong>: the bisector of angle $A$ divides $BC$ in the ratio $AB : AC$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two similar triangles have corresponding sides 3 cm and 7.5 cm. The smaller has area 8 cm². What is the area of the larger (cm²)?`, 50, [R`Areas scale with the square of the ratio $2.5$.`], R`$8\times2.5^2 = 50$ cm².`)] },
      { title: 'Power of a point', html: R`
<p>Draw any line through a point $P$ meeting a circle at $A$ and $B$. The product $PA\cdot PB$ is the same for every such line: the <strong>power</strong> of $P$, equal to $d^2 - r^2$ where $d$ is the distance from $P$ to the centre.</p>
<div class="key"><p><strong>Intersecting chords:</strong> $PA\cdot PB = PC\cdot PD$.<br><strong>Secant and tangent:</strong> $PA\cdot PB = PT^2$ where $PT$ is a tangent.</p></div>
<p>So a tangent from a point 13 units from the centre of a circle of radius 5 has length $\sqrt{13^2 - 5^2} = 12$.</p>
<p><strong>Ptolemy's theorem</strong> for a cyclic quadrilateral $ABCD$: $AC\cdot BD = AB\cdot CD + AD\cdot BC$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Chords $AB$ and $CD$ cross at $P$, with $PA = 3$, $PB = 8$ and $PC = 4$. Find $PD$.`, 6, [R`$PA\cdot PB = PC\cdot PD$.`], R`$24 = 4\cdot PD$, so $PD = 6$.`)] },
      { title: 'Trigonometry and centres of a triangle', html: R`
<p>For a triangle with sides $a, b, c$ opposite angles $A, B, C$ and circumradius $R$:</p>
<div class="key"><p><strong>Sine rule:</strong> $\dfrac a{\sin A} = \dfrac b{\sin B} = \dfrac c{\sin C} = 2R$.<br><strong>Cosine rule:</strong> $c^2 = a^2 + b^2 - 2ab\cos C$.<br><strong>Area:</strong> $\tfrac12ab\sin C = rs = \dfrac{abc}{4R} = \sqrt{s(s - a)(s - b)(s - c)}$ (Heron), with $s$ the semi-perimeter and $r$ the inradius.</p></div>
<p>The four classical centres: the <strong>centroid</strong> $G$ (medians meet, two-thirds of the way down each), the <strong>circumcentre</strong> $O$ (perpendicular bisectors), the <strong>incentre</strong> $I$ (angle bisectors) and the <strong>orthocentre</strong> $H$ (altitudes). Remarkably $O$, $G$, $H$ always lie on one line, the <strong>Euler line</strong>, with $OG : GH = 1 : 2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the area of the triangle with sides 13, 14 and 15.`, 84, [R`Heron with $s = 21$.`], R`$\sqrt{21\cdot8\cdot7\cdot6} = \sqrt{7056} = 84$.`)] }
    ],
    figures: [
      { s: 0, title: 'The inscribed angle theorem', caption: 'Move the point P round the circle: the angle APB stays half the central angle AOB, as long as P stays on the same arc.', params: { picFrac: 1, aspect: 0.5, controls: [S('arc', 'Central angle AOB', 20, 340, 1, 100, '°'), S('p', 'Position of P', 0, 360, 1, 100, '°')],
        draw: (ctx, Cc, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, r = Math.min(b.w, b.h) * 0.4; const pt = (deg) => [cx + r * Math.cos(deg * d2r), cy - r * Math.sin(deg * d2r)]; const a0 = 270 - v.arc / 2, a1 = 270 + v.arc / 2; const A = pt(a0), B = pt(a1), Pp = pt(v.p), O = [cx, cy]; ctx.strokeStyle = Cc.ink3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.strokeStyle = Cc.accent; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, r, -a1 * d2r, -a0 * d2r); ctx.stroke(); ctx.strokeStyle = Cc.teal; ctx.lineWidth = 2; line(ctx, O, A); line(ctx, O, B); ctx.strokeStyle = Cc.rust; line(ctx, Pp, A); line(ctx, Pp, B); [[A, 'A'], [B, 'B'], [Pp, 'P'], [O, 'O']].forEach((q) => { U.dot(ctx, q[0][0], q[0][1], 4.5, Cc.points, Cc.ink); U.text(ctx, q[1], q[0][0] + 7, q[0][1] - 7, Cc.ink, U.ui(13, 700)); }); const ang = (p, q1, q2) => { const u = [q1[0] - p[0], q1[1] - p[1]], w = [q2[0] - p[0], q2[1] - p[1]]; return Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1]))) / d2r; }; const onArc = v.p > a0 && v.p < a1; U.text(ctx, '∠APB = ' + f(ang(Pp, A, B)) + '°' + (onArc ? ' (P on the arc AB itself: 180° − half)' : ''), b.x + 10, b.y + 18, Cc.rust, U.ui(13, 700)); U.text(ctx, '∠AOB = ' + v.arc + '°', b.x + 10, b.y + 36, Cc.teal, U.ui(13, 700)); } } }
    ],
    labs: [
      { sim: 'explore', title: 'The Euler line', desc: 'Drag the vertices of a triangle. The circumcentre O, centroid G and orthocentre H stay on one line with OG : GH = 1 : 2.',
        tasks: ['Make the triangle equilateral. What happens to the three centres?', 'Make it right-angled. Where is H? Where is O?', 'Check OG : GH = 1 : 2 in the readout.'],
        params: { aspect: 0.8, picFrac: 1, controls: [S('ax', 'A: x', -4, 4, 0.1, -3), S('ay', 'A: y', -3, 3, 0.1, -2), S('bx', 'B: x', -4, 4, 0.1, 3.5), S('by', 'B: y', -3, 3, 0.1, -2), S('cx', 'C: x', -4, 4, 0.1, 0.5), S('cy', 'C: y', -3, 3, 0.1, 2.5)],
          draw: (ctx, Cc, v, b, U) => { const sc = Math.min(b.w / 12, b.h / 9.5), X = (x) => b.x + b.w / 2 + x * sc, Y = (y) => b.y + b.h / 2 - y * sc; const A = [v.ax, v.ay], B = [v.bx, v.by], Cp = [v.cx, v.cy]; const D = 2 * (A[0] * (B[1] - Cp[1]) + B[0] * (Cp[1] - A[1]) + Cp[0] * (A[1] - B[1])); if (Math.abs(D) < 1e-6) { U.text(ctx, 'The points are collinear', b.x + 10, b.y + 20, Cc.bad, U.ui(13)); return; } const sq = (p) => p[0] * p[0] + p[1] * p[1]; const O = [(sq(A) * (B[1] - Cp[1]) + sq(B) * (Cp[1] - A[1]) + sq(Cp) * (A[1] - B[1])) / D, (sq(A) * (Cp[0] - B[0]) + sq(B) * (A[0] - Cp[0]) + sq(Cp) * (B[0] - A[0])) / D]; const G = [(A[0] + B[0] + Cp[0]) / 3, (A[1] + B[1] + Cp[1]) / 3]; const H = [3 * G[0] - 2 * O[0], 3 * G[1] - 2 * O[1]]; const Rr = Math.hypot(A[0] - O[0], A[1] - O[1]); ctx.strokeStyle = U.alpha(Cc.ink3, 0.6); ctx.beginPath(); ctx.arc(X(O[0]), Y(O[1]), Rr * sc, 0, 7); ctx.stroke(); ctx.strokeStyle = Cc.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(A[0]), Y(A[1])); ctx.lineTo(X(B[0]), Y(B[1])); ctx.lineTo(X(Cp[0]), Y(Cp[1])); ctx.closePath(); ctx.stroke(); ctx.strokeStyle = Cc.rust; ctx.setLineDash([6, 4]); const dx = H[0] - O[0], dy = H[1] - O[1]; line(ctx, [X(O[0] - dx), Y(O[1] - dy)], [X(H[0] + dx), Y(H[1] + dy)]); ctx.setLineDash([]); [[A, 'A', Cc.ink], [B, 'B', Cc.ink], [Cp, 'C', Cc.ink], [O, 'O', Cc.teal], [G, 'G', Cc.accent], [H, 'H', Cc.rust]].forEach((q) => { U.dot(ctx, X(q[0][0]), Y(q[0][1]), 5, q[2], Cc.ink); U.text(ctx, q[1], X(q[0][0]) + 7, Y(q[0][1]) - 7, q[2], U.ui(13, 700)); }); v.OG = Math.hypot(G[0] - O[0], G[1] - O[1]); v.GH = Math.hypot(H[0] - G[0], H[1] - G[1]); v.R = Rr; },
          readout: (v) => [['OG', f(v.OG || 0, 4)], ['GH', f(v.GH || 0, 4)], ['GH / OG', v.OG > 1e-9 ? f(v.GH / v.OG, 4) : '— (all equal)'], ['circumradius R', f(v.R || 0, 4)]] } },
      { sim: 'explore', title: 'Power of a point', desc: 'A line through P at angle θ meets the circle at A and B. However you turn it, PA·PB stays equal to |d² − r²|.',
        tasks: ['Turn the line. Does PA·PB change?', 'Move P inside the circle. What changes in the formula?', 'Turn the line until it is tangent: PA = PB = the tangent length.'],
        params: { aspect: 0.5, picFrac: 1, controls: [S('d', 'Distance OP', 0, 6, 0.05, 4), S('t', 'Line angle θ', 0, 180, 0.5, 20, '°')],
          draw: (ctx, Cc, v, b, U) => { const r = 2.5, sc = Math.min(b.w / 15, b.h / 7.5), X = (x) => b.x + b.w * 0.42 + x * sc, Y = (y) => b.y + b.h / 2 - y * sc; ctx.strokeStyle = Cc.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(0), Y(0), r * sc, 0, 7); ctx.stroke(); const P = [v.d, 0], u = [Math.cos(v.t * d2r), Math.sin(v.t * d2r)]; const bq = 2 * (P[0] * u[0] + P[1] * u[1]), cq = v.d * v.d - r * r, disc = bq * bq - 4 * cq; ctx.strokeStyle = Cc.ink3; ctx.lineWidth = 1.2; line(ctx, [X(P[0] - 9 * u[0]), Y(P[1] - 9 * u[1])], [X(P[0] + 9 * u[0]), Y(P[1] + 9 * u[1])]); U.dot(ctx, X(0), Y(0), 4, Cc.ink3, Cc.ink); U.text(ctx, 'O', X(0) + 6, Y(0) - 6, Cc.ink2, U.ui(12)); U.dot(ctx, X(P[0]), Y(P[1]), 5, Cc.points, Cc.ink); U.text(ctx, 'P', X(P[0]) + 7, Y(P[1]) + 14, Cc.ink, U.ui(13, 700)); if (disc >= 0) { const t1 = (-bq - Math.sqrt(disc)) / 2, t2 = (-bq + Math.sqrt(disc)) / 2; [[t1, 'A'], [t2, 'B']].forEach((q) => { const x = P[0] + q[0] * u[0], y = P[1] + q[0] * u[1]; U.dot(ctx, X(x), Y(y), 5, Cc.rust, Cc.ink); U.text(ctx, q[1], X(x) + 7, Y(y) - 7, Cc.rust, U.ui(13, 700)); }); v.prod = Math.abs(t1 * t2); v.hit = true; } else { v.hit = false; } v.pow = v.d * v.d - r * r; },
          readout: (v) => [['PA·PB', v.hit ? f(v.prod, 4) : 'line misses the circle'], ['d² − r²', f(v.pow, 4)], ['tangent length', v.pow > 0 ? f(Math.sqrt(v.pow), 4) : 'P is inside']] } }
    ],
    formulas: [['Polygon angles', '(n - 2)\\cdot180^\\circ'], ['Inscribed angle', '\\angle APB = \\tfrac12\\angle AOB'], ['Power of a point', 'PA\\cdot PB = PC\\cdot PD = PT^2 = |d^2 - r^2|'], ['Sine rule', '\\dfrac a{\\sin A} = 2R'], ['Cosine rule', 'c^2 = a^2 + b^2 - 2ab\\cos C'], ['Areas', '\\tfrac12ab\\sin C = rs = \\dfrac{abc}{4R} = \\sqrt{s(s-a)(s-b)(s-c)}'], ['Euler line', 'O, G, H\\ \\text{collinear},\\ OG : GH = 1 : 2']],
    problems: [
      P('concept', 'mcq', 'Hexagon', R`The interior angles of a hexagon add to…`, 2, [R`$(n - 2)\cdot180^\circ$.`], R`$720^\circ$.`, { options: ['360°', '540°', '720°', '1080°'] }),
      P('concept', 'mcq', 'Thales', R`$AB$ is a diameter and $C$ is another point on the circle. Angle $ACB$ is…`, 1, [R`The central angle is 180°.`], R`$90^\circ$.`, { options: ['45°', '90°', '180°', 'it depends on C'] }),
      P('concept', 'mcq', 'Cyclic quadrilateral', R`A quadrilateral has angles 70°, 95°, 110° and 85° in order. Is it cyclic?`, 0, [R`Check opposite pairs.`], R`Yes: $70 + 110 = 180$ and $95 + 85 = 180$.`, { options: ['Yes', 'No', 'Only if it is a rectangle', 'Cannot tell'] }),
      P('concept', 'mcq', 'Similar areas', R`Doubling every side of a triangle multiplies its area by…`, 2, [R`Area scales as length squared.`], R`4.`, { options: ['2', '3', '4', '8'] }),
      P('core', 'num', 'Tangent length', R`A point is 13 cm from the centre of a circle of radius 5 cm. How long is a tangent from the point to the circle?`, 12, [R`The tangent is perpendicular to the radius.`], R`$\sqrt{169 - 25} = 12$ cm.`),
      P('core', 'num', 'Cosine rule', R`Two sides of a triangle are 7 and 8 with an included angle of 60°. Find the third side.`, Math.sqrt(57), [R`$c^2 = 49 + 64 - 2\cdot56\cdot\tfrac12$.`], R`$\sqrt{57} \approx ${f(Math.sqrt(57), 4)}$.`),
      P('core', 'num', 'Circumradius', R`Find the circumradius of a 3–4–5 triangle.`, 2.5, [R`The hypotenuse of a right triangle is a diameter.`], R`$5/2 = 2.5$.`),
      P('core', 'num', 'Inradius', R`Find the inradius of the 13–14–15 triangle (area 84).`, 4, [R`Area $= rs$ with $s = 21$.`], R`$r = 84/21 = 4$.`),
      P('core', 'num', 'Intersecting chords', R`Chords $AB$ and $CD$ meet at $P$ with $AP = 4$, $PB = 6$ and $CP = 3$. How long is $CD$?`, 11, [R`$PD = AP\cdot PB/CP$.`], R`$PD = 8$, so $CD = 3 + 8 = 11$.`),
      P('olympiad', 'num', 'A median', R`In the triangle with sides 13, 14, 15, find the length of the median to the side of length 14.`, 0.5 * Math.sqrt(2 * 169 + 2 * 225 - 196), [R`Apollonius: $m^2 = \tfrac14(2b^2 + 2c^2 - a^2)$.`], R`$m = \tfrac12\sqrt{338 + 450 - 196} = \tfrac12\sqrt{592} \approx ${f(0.5 * Math.sqrt(592), 4)}$.`),
      P('olympiad', 'num', 'Ptolemy in a pentagon', R`A regular pentagon has side 1. Find the length $d$ of its diagonals.`, (1 + Math.sqrt(5)) / 2, [R`Four vertices of the pentagon form a cyclic quadrilateral with three sides 1 and one side $d$, and both diagonals $d$.`, R`Ptolemy: $d\cdot d = 1\cdot1 + d\cdot1$.`], R`$d^2 = d + 1$, so $d = \dfrac{1 + \sqrt5}{2} \approx 1.618$: the golden ratio.`),
      P('olympiad', 'num', 'Angle chase', R`In triangle $ABC$, $\angle A = 50^\circ$. The bisectors of angles $B$ and $C$ meet at $I$. Find $\angle BIC$ in degrees.`, 115, [R`$\angle IBC + \angle ICB = \tfrac12(B + C)$.`], R`$\angle BIC = 180 - \tfrac12(180 - 50) = 90 + 25 = 115^\circ$.`)
    ]
  });
  PB.addDrills('math-geometry', [
    { title: 'Cosine rule', gen: (r) => { const a = r.int(3, 12), b = r.int(3, 12), C = r.pick([30, 45, 60, 90, 120]); const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * d2r)); return { q: R`<p>Sides ${a} and ${b} with included angle ${C}°. Find the third side.</p>`, answer: c, tol: 0.003, solution: R`<p>$\sqrt{${a * a} + ${b * b} - 2\cdot${a}\cdot${b}\cos${C}^\circ} = ${f(c, 4)}$.</p>` }; } },
    { title: 'Heron', gen: (r) => { const t = r.pick([[3, 4, 5], [5, 12, 13], [13, 14, 15], [7, 8, 9], [6, 8, 10], [5, 5, 6], [9, 10, 17], [8, 15, 17]]); const s = (t[0] + t[1] + t[2]) / 2, A = Math.sqrt(s * (s - t[0]) * (s - t[1]) * (s - t[2])); return { q: R`<p>Find the area of the triangle with sides ${t.join(', ')}.</p>`, answer: A, tol: 0.003, solution: R`<p>$s = ${s}$, area $= \sqrt{${s}(${s - t[0]})(${s - t[1]})(${s - t[2]})} = ${f(A, 4)}$.</p>` }; } },
    { title: 'Tangent length', gen: (r) => { const rr = r.int(2, 9), d = rr + r.int(1, 10); return { q: R`<p>A point is ${d} from the centre of a circle of radius ${rr}. Length of a tangent from the point?</p>`, answer: Math.sqrt(d * d - rr * rr), tol: 0.003, solution: R`<p>$\sqrt{${d}^2 - ${rr}^2} = ${f(Math.sqrt(d * d - rr * rr), 4)}$.</p>` }; } }
  ]);
})();
