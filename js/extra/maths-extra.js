/* Maths: a further concept, core and olympiad problem for each of the original 16 maths chapters. Loaded last so ids stay stable. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3), X = PB.addProblems;
  const M = (title, q, options, answer, hint, sol) => ({ level: 'concept', type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: [hint], solution: '<p>' + sol + '</p>' });
  const N = (level, title, q, answer, hint, sol, tol) => ({ level: level, type: 'num', title: title, q: '<p>' + q + '</p>', answer: answer, tol: tol || 0.005, hints: [hint], solution: '<p>' + sol + '</p>' });

  X('math-functions', [
    M('Even and odd', R`Which function is odd, i.e. $f(-x) = -f(x)$?`, ['$x^2 + 1$', '$\\cos x$', '$x^3 - x$', '$|x|$'], 2, R`Replace $x$ by $-x$.`, R`$(-x)^3 - (-x) = -(x^3 - x)$: odd, with a graph symmetric under a half-turn about the origin.`),
    N('core', 'Composite inverse', R`$f(x) = 3x - 2$ and $g(x) = x^2 + 1$ (for $x \ge 0$). Find $(f\circ g)^{-1}(28)$.`, 3, R`Solve $3(x^2 + 1) - 2 = 28$.`, R`$3x^2 + 1 = 28$, $x^2 = 9$, $x = 3$.`),
    N('olympiad', 'Floor sum', R`Evaluate $\lfloor\log_2 1\rfloor + \lfloor\log_2 2\rfloor + \dots + \lfloor\log_2 64\rfloor$.`, (() => { let s = 0; for (let k = 1; k <= 64; k++) s += Math.floor(Math.log2(k) + 1e-12); return s; })(), R`$\lfloor\log_2k\rfloor = m$ for $2^m \le k < 2^{m+1}$: that is $2^m$ values of $k$.`, R`$\sum_{m=0}^{5}m\,2^m + 6 = 0 + 2 + 8 + 24 + 64 + 160 + 6 = 264$.`)
  ]);
  X('math-limits', [
    M('Removable', R`$f(x) = \dfrac{x^2 - 4}{x - 2}$ for $x \ne 2$. Which value of $f(2)$ makes $f$ continuous?`, ['0', '2', '4', 'none'], 2, R`Find the limit at 2.`, R`$x + 2 \to 4$, so set $f(2) = 4$.`),
    N('core', 'Limit at infinity', R`Find $\displaystyle\lim_{x\to\infty}x\sin\frac{1}{x}$.`, 1, R`Put $u = 1/x \to 0$.`, R`$\dfrac{\sin u}{u} \to 1$.`),
    N('olympiad', 'Nested radical', R`Find the limit of $\sqrt{2}, \sqrt{2 + \sqrt2}, \sqrt{2 + \sqrt{2 + \sqrt2}}, \dots$`, 2, R`If it converges to $L$, then $L = \sqrt{2 + L}$.`, R`$L^2 = 2 + L$, $L = 2$ (the sequence is increasing and bounded by 2).`)
  ]);
  X('math-derivatives', [
    M('Differentiability', R`At $x = 0$, the function $|x|$ is…`, ['differentiable with slope 0', 'continuous but not differentiable', 'not continuous', 'differentiable with slope 1'], 1, R`Compare slopes from the left and right.`, R`The left slope is −1 and the right slope +1: a corner, so continuous but not differentiable.`),
    N('core', 'Inverse function slope', R`$f(x) = x^3 + x$. Find $(f^{-1})'(2)$.`, 0.25, R`$f(1) = 2$, and $(f^{-1})'(2) = 1/f'(1)$.`, R`$f'(1) = 3 + 1 = 4$, so the answer is $\tfrac14$.`),
    N('olympiad', 'Tangent through a point', R`Find the positive slope of a tangent line to $y = x^2$ that passes through $(0, -4)$.`, 4, R`A tangent at $(a, a^2)$ is $y = 2ax - a^2$.`, R`It passes through $(0, -4)$ if $-a^2 = -4$, $a = 2$, slope $2a = 4$.`)
  ]);
  X('math-applications', [
    M('Concavity', R`If $f''(x) > 0$ on an interval, the graph there is…`, ['concave up (cup-shaped)', 'concave down', 'a straight line', 'decreasing'], 0, R`The slope is increasing.`, R`Concave up.`),
    N('core', 'Closest point', R`Find the minimum distance from the origin to the line $y = 10 - 2x$.`, 10 / Math.sqrt(5), R`Minimise $D^2 = x^2 + (10 - 2x)^2$.`, R`$D^2$ is least at $x = 4$: $D = \sqrt{16 + 4} = \sqrt{20} = ${f(10 / Math.sqrt(5), 4)}$.`),
    N('olympiad', 'Mean value theorem', R`For $f(x) = x^3$ on $[0, 3]$, find the point $c$ guaranteed by the mean value theorem.`, Math.sqrt(3), R`$f'(c) = \dfrac{f(3) - f(0)}{3}$.`, R`$3c^2 = 9$, $c = \sqrt3 \approx 1.732$.`)
  ]);
  X('math-integrals', [
    M('Even integrand', R`If $f$ is even, $\int_{-a}^{a}f\,\mathrm dx = $`, ['0', '$2\\int_0^a f\\,\\mathrm dx$', '$\\int_0^a f\\,\\mathrm dx$', '$-\\int_0^a f$'], 1, R`The two halves are mirror images.`, R`$2\int_0^af\,\mathrm dx$.`),
    N('core', 'Area under a reciprocal', R`Find the area under $y = 1/x$ from $x = 1$ to $x = 10$.`, Math.log(10), R`$\ln x$.`, R`$\ln10 \approx 2.303$.`),
    N('olympiad', 'Integral of a floor', R`Evaluate $\int_0^{3}\lfloor x\rfloor\,x\,\mathrm dx$, where $\lfloor x\rfloor$ is the floor (integer part) of $x$.`, (() => { let s = 0; for (let k = 0; k < 3; k++) s += k * ((k + 1) * (k + 1) - k * k) / 2; return s; })(), R`On $[k, k + 1)$ the floor is $k$: integrate $kx$ there.`, R`$\sum_{k=0}^{2}k\cdot\tfrac{(k + 1)^2 - k^2}{2} = 0 + \tfrac32 + 5 = 6.5$.`)
  ]);
  X('math-techniques', [
    M('Improper integral', R`Which improper integral converges?`, ['$\\int_1^\\infty \\dfrac{\\mathrm dx}{x}$', '$\\int_1^\\infty \\dfrac{\\mathrm dx}{\\sqrt x}$', '$\\int_1^\\infty \\dfrac{\\mathrm dx}{x^2}$', '$\\int_1^\\infty 1\\,\\mathrm dx$'], 2, R`$\int_1^\infty x^{-p}$ converges for $p > 1$.`, R`$\int_1^\infty x^{-2}\,\mathrm dx = 1$.`),
    N('core', 'Trig substitution', R`Evaluate $\int_0^1\sqrt{1 - x^2}\,\mathrm dx$.`, Math.PI / 4, R`It is a quarter of the unit disc.`, R`$\pi/4 \approx 0.785$ (or substitute $x = \sin\theta$).`),
    N('olympiad', 'Feynman’s trick', R`Evaluate $\int_0^1\dfrac{x^4 - 1}{\ln x}\,\mathrm dx$.`, Math.log(5), R`Consider $I(a) = \int_0^1\dfrac{x^a - 1}{\ln x}\,\mathrm dx$; then $I'(a) = \int_0^1x^a\,\mathrm dx$.`, R`$I'(a) = \dfrac1{a + 1}$, $I(0) = 0$, so $I(a) = \ln(a + 1)$ and $I(4) = \ln5 \approx 1.609$.`)
  ]);
  X('math-series', [
    M('Alternating harmonic', R`$1 - \tfrac12 + \tfrac13 - \tfrac14 + \dots = $`, ['0', '$\\ln 2$', '$\\pi/4$', 'it diverges'], 1, R`Put $x = 1$ in the series for $\ln(1 + x)$.`, R`$\ln2 \approx 0.693$.`),
    N('core', 'Radius of convergence', R`Find the radius of convergence of $\sum\dfrac{x^n}{3^n n}$.`, 3, R`Ratio test: $|a_{n+1}/a_n| \to |x|/3$.`, R`Converges for $|x| < 3$: radius 3.`),
    N('olympiad', 'Series for π', R`Using $\arctan x = x - x^3/3 + \dots$ and Machin's formula $\pi/4 = 4\arctan\frac15 - \arctan\frac1{239}$, compute the first-term approximation $4(4/5 - 1/239)$.`, 4 * (4 / 5 - 1 / 239), R`Take only the first term of each arctan series.`, R`$4(0.8 - 0.004184) = 3.183$; adding a couple more terms of each series quickly gives many digits of $\pi$.`)
  ]);
  X('math-odes', [
    M('Linear or not', R`Which differential equation is linear?`, ['$y\' = y^2$', '$y\' + xy = \\sin x$', '$yy\' = 1$', '$y\' = \\sin y$'], 1, R`Linear in $y$ and its derivatives.`, R`$y' + xy = \sin x$.`),
    N('core', 'Equilibrium temperature', R`A room obeys $\dfrac{\mathrm dT}{\mathrm dt} = 0.2(15 - T) + 1.5$ (°C per hour, with a heater). What temperature does it settle at?`, 22.5, R`Set the rate to zero.`, R`$0.2(15 - T) = -1.5$, $T = 22.5$ °C.`),
    N('olympiad', 'Chain of tanks', R`Tank 1 has $x' = -x$, $x(0) = 1$, and drains into tank 2 with $y' = x - y$, $y(0) = 0$. Find the largest value of $y$.`, 1 / Math.E, R`Solve: $y = te^{-t}$.`, R`Maximum at $t = 1$: $y = 1/e \approx 0.368$.`)
  ]);
  X('math-multivar', [
    M('Level sets', R`For $f(x, y, z) = x^2 + y^2 + z^2$, the level sets are…`, ['planes', 'spheres', 'cylinders', 'cones'], 1, R`$x^2 + y^2 + z^2 = c$.`, R`Spheres centred on the origin.`),
    N('core', 'Tangent plane', R`Use the tangent plane of $f = \sqrt{x^2 + y^2}$ at $(3, 4)$ to estimate $f(3.1, 3.9)$.`, 5 + (3 * 0.1 + 4 * -0.1) / 5, R`$f_x = x/f$, $f_y = y/f$.`, R`$5 + 0.6(0.1) + 0.8(-0.1) = 4.98$.`),
    N('olympiad', 'Volume of a cone', R`Use a double integral in polar coordinates to find the volume under $z = 2 - \sqrt{x^2 + y^2}$ and above $z = 0$.`, 8 * Math.PI / 3, R`$\int_0^{2\pi}\int_0^2(2 - r)r\,\mathrm dr\,\mathrm d\theta$.`, R`$2\pi(4 - \tfrac83) = \tfrac{8\pi}3 \approx 8.378$, matching $\tfrac13\pi r^2h$.`)
  ]);
  X('math-complex', [
    M('Conjugate', R`If $z\bar z = 25$, then…`, ['$z = 5$', '$|z| = 5$', '$\\arg z = 0$', '$z$ is real'], 1, R`$z\bar z = |z|^2$.`, R`$|z| = 5$: $z$ lies on the circle of radius 5.`),
    N('core', 'Cube roots', R`Find the real part of the cube root of $-8$ that lies in the first quadrant.`, 1, R`$-8 = 8e^{i\pi}$; roots $2e^{i(\pi + 2\pi k)/3}$.`, R`$2e^{i\pi/3} = 1 + i\sqrt3$: real part 1.`),
    N('olympiad', 'Sum of powers', R`Let $\omega = e^{2\pi i/5}$. Compute $(1 - \omega)(1 - \omega^2)(1 - \omega^3)(1 - \omega^4)$.`, 5, R`$\dfrac{z^5 - 1}{z - 1} = (z - \omega)\cdots(z - \omega^4) = 1 + z + z^2 + z^3 + z^4$.`, R`Put $z = 1$: the product is 5.`)
  ]);
  X('math-proof', [
    M('Well-ordering', R`The well-ordering principle says…`, ['every set of integers has a largest element', 'every non-empty set of positive integers has a smallest element', 'every sequence converges', 'every number is prime or composite'], 1, R`It underpins induction and descent.`, R`Every non-empty set of positive integers has a least element.`),
    N('core', 'Induction formula', R`Use $\sum_{k=1}^{n}k(k + 1) = \dfrac{n(n + 1)(n + 2)}{3}$ (provable by induction) to find $1\cdot2 + 2\cdot3 + \dots + 10\cdot11$.`, 440, R`$n = 10$.`, R`$10\cdot11\cdot12/3 = 440$.`),
    N('olympiad', 'Pigeonhole sums', R`What is the smallest $n$ such that any $n$ integers contain a non-empty subset whose sum is divisible by 10?`, 10, R`Look at the 10 prefix sums $s_1, \dots, s_{10}$ mod 10, or a zero.`, R`With 10 numbers, either a prefix sum is $0 \bmod 10$ or two prefix sums agree and their difference works. Nine copies of 1 show 9 is not enough. Answer 10.`)
  ]);
  X('math-numbertheory', [
    M('Units digit', R`The last digit of $3^{2025}$ is…`, ['1', '3', '7', '9'], 1, R`Powers of 3 end in 3, 9, 7, 1, repeating.`, R`$2025 \equiv 1 \pmod 4$, so the last digit is 3.`),
    N('core', 'Euler phi', R`Find $\varphi(360)$.`, 360 * (1 / 2) * (2 / 3) * (4 / 5), R`$360 = 2^3\cdot3^2\cdot5$.`, R`$360\cdot\tfrac12\cdot\tfrac23\cdot\tfrac45 = 96$.`),
    N('olympiad', 'Wilson', R`Find $16! \bmod 17$.`, 16, R`Wilson's theorem: $(p - 1)! \equiv -1 \pmod p$.`, R`$-1 \equiv 16$.`)
  ]);
  X('math-combinatorics', [
    M('Circular arrangements', R`How many ways can 6 people sit round a circular table (rotations count as the same)?`, ['720', '120', '360', '60'], 1, R`Fix one person's seat.`, R`$5! = 120$.`),
    N('core', 'Expected draws', R`A bag has 3 red and 7 blue balls. You draw 4 without replacement. What is the expected number of red balls?`, 1.2, R`Linearity: each draw is red with probability $3/10$.`, R`$4\times0.3 = 1.2$.`),
    N('olympiad', 'Surjections', R`How many ways can 5 different books be given to 3 students so that every student gets at least one?`, 243 - 3 * 32 + 3, R`Inclusion–exclusion on students who get nothing.`, R`$3^5 - 3\cdot2^5 + 3\cdot1^5 = 243 - 96 + 3 = 150$.`)
  ]);
  X('math-inequalities', [
    M('Tangent line trick', R`For $x > 0$, which is always true?`, ['$\\ln x \\ge x - 1$', '$\\ln x \\le x - 1$', '$e^x \\le 1 + x$', '$\\sin x \\ge x$'], 1, R`$\ln$ is concave, and $y = x - 1$ is its tangent at $x = 1$.`, R`$\ln x \le x - 1$, with equality only at $x = 1$.`),
    N('core', 'Weighted AM–GM', R`Positive $x, y$ satisfy $2x + y = 12$. Find the maximum of $x^2y$.`, 64, R`Split $2x$ into $x + x$: AM–GM on $x, x, y$.`, R`$\dfrac{x + x + y}{3} = 4 \ge \sqrt[3]{x^2y}$, so $x^2y \le 64$, with equality when $x = x = y = 4$ (and indeed $2\cdot4 + 4 = 12$).`, 0.005),
    N('olympiad', 'Schur-type minimum', R`For positive reals with $abc = 1$, find the minimum of $a + b + c$.`, 3, R`AM–GM.`, R`$a + b + c \ge 3\sqrt[3]{abc} = 3$.`)
  ]);
  X('math-algebra', [
    M('Integer roots', R`Which could be an integer root of $x^3 - 4x^2 + x + 6$?`, ['4', '5', '−1', '7'], 2, R`Integer roots divide the constant term 6.`, R`$-1$: $-1 - 4 - 1 + 6 = 0$. (The roots are −1, 2, 3.)`),
    N('core', 'Polynomial division', R`Find the remainder when $x^{100}$ is divided by $x^2 - 1$; it has the form $ax + b$. Give $a + b$.`, 1, R`Evaluate at $x = 1$ and $x = -1$.`, R`$a + b = 1$ and $-a + b = 1$, so $a = 0$, $b = 1$: remainder 1, and $a + b = 1$.`),
    N('olympiad', 'Functional equation', R`Find $f(2025)$ if $f(x + 1) - f(x) = 2x + 1$ for all $x$ and $f(0) = 0$.`, 2025 * 2025, R`Telescope from 0 to $n$.`, R`$f(n) = \sum_{k=0}^{n-1}(2k + 1) = n^2$, so $f(2025) = 2025^2 = 4\,100\,625$.`, 1e-6)
  ]);
  X('math-geometry', [
    M('Exterior angle', R`An exterior angle of a triangle equals…`, ['the adjacent interior angle', 'the sum of the two opposite interior angles', '180°', 'half the opposite angle'], 1, R`Angles on a line and in a triangle both sum to 180°.`, R`The sum of the two non-adjacent interior angles.`),
    N('core', 'Sine rule', R`In triangle $ABC$, $A = 30^\circ$, $B = 45^\circ$ and $a = 10$. Find $b$.`, 10 * Math.sin(Math.PI / 4) / Math.sin(Math.PI / 6), R`$b = a\sin B/\sin A$.`, R`$10\cdot\dfrac{\sqrt2/2}{1/2} = 10\sqrt2 \approx 14.14$.`),
    N('olympiad', 'Shoelace', R`Find the area of the triangle with vertices $(1, 2)$, $(6, 4)$ and $(3, 9)$.`, 0.5 * Math.abs(1 * (4 - 9) + 6 * (9 - 2) + 3 * (2 - 4)), R`$\tfrac12|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$.`, R`$\tfrac12|{-5} + 42 - 6| = 15.5$.`)
  ]);
})();
