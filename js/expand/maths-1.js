/* Expanded text for maths: functions, sequences (with sigma and pi notation), limits, derivatives,
   applications of derivatives, integrals, techniques of integration, series. */
(function () {
  const R = PB.R;
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.001 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const X = (id, sections, add) => PB.expand(id, { sections: sections, add: add });

  /* ---------------- Functions and their graphs ---------------- */
  X('math-functions', {
    0: { html: R`
<h3 class="sub">Domain, range and the vertical line test</h3>
<p>Every function comes with a <strong>domain</strong>, the inputs it accepts, and a <strong>range</strong>, the outputs it actually produces. For $f(x) = \sqrt{x - 2}$ the domain is $x \ge 2$ (we cannot take square roots of negatives) and the range is $y \ge 0$. For $g(x) = \dfrac{1}{x - 3}$ the domain is every real number except 3, and the range is every real number except 0.</p>
<p>A curve in the plane is the graph of a function exactly when every vertical line meets it at most once: one input, one output. A circle fails this test, which is why $x^2 + y^2 = 1$ is described by two functions, $y = \pm\sqrt{1 - x^2}$.</p>
<h3 class="sub">Composition and inverses</h3>
<p>Functions can be chained: $(f \circ g)(x) = f(g(x))$ means "do $g$, then $f$". Order matters. With $f(x) = x^2$ and $g(x) = x + 1$, $f(g(x)) = (x + 1)^2$ but $g(f(x)) = x^2 + 1$.</p>
<p>An <strong>inverse</strong> $f^{-1}$ undoes $f$: $f^{-1}(f(x)) = x$. It exists only if $f$ is <strong>one-to-one</strong> (no horizontal line meets the graph twice). To find it, write $y = f(x)$, swap $x$ and $y$, and solve for $y$. Graphically, $f^{-1}$ is the reflection of $f$ in the line $y = x$.</p>
<div class="worked"><p>Find the inverse of $f(x) = \dfrac{2x + 1}{x - 3}$.</p>
<p>Swap: $x = \dfrac{2y + 1}{y - 3}$, so $x(y - 3) = 2y + 1$, $xy - 2y = 3x + 1$, $y = \dfrac{3x + 1}{x - 2}$. Check with $x = 4$: $f(4) = 9$ and $f^{-1}(9) = 28/7 = 4$.</p></div>
<div class="warn-box"><p>$f^{-1}(x)$ is the inverse function, not $1/f(x)$. For $f(x) = 2x$, $f^{-1}(x) = x/2$ but $1/f(x) = 1/(2x)$.</p></div>
<div data-quiz="0"></div>`, quizzes: [QN(R`$f(x) = 3x - 2$ and $g(x) = x^2$. Find $f(g(2)) - g(f(2))$.`, -6, [R`$f(g(2)) = f(4)$ and $g(f(2)) = g(4)$.`], R`$f(4) = 10$ and $g(4) = 16$: $10 - 16 = -6$.`)] },
    1: { html: R`
<h3 class="sub">The four transformations in one table</h3>
<p>Starting from $y = f(x)$, each change has a predictable effect. The rule of thumb: changes <em>outside</em> the function act on $y$ the way you expect; changes <em>inside</em> act on $x$ the opposite way.</p>
<div class="table-wrap"><table class="data"><tr><th>Equation</th><th>Effect on the graph</th></tr>
<tr><td>$y = f(x) + d$</td><td>up by $d$</td></tr><tr><td>$y = f(x - c)$</td><td>right by $c$ (not left!)</td></tr>
<tr><td>$y = a f(x)$</td><td>vertical stretch by $a$ (reflect in the $x$-axis if $a < 0$)</td></tr>
<tr><td>$y = f(bx)$</td><td>horizontal squash by factor $b$ (reflect in the $y$-axis if $b < 0$)</td></tr></table></div>
<p>When several are combined, apply them in the order of operations on $x$: for $y = 2f(3x - 6) + 1 = 2f(3(x - 2)) + 1$, shift right 2, squash horizontally by 3, stretch vertically by 2, then lift by 1.</p>
<h3 class="sub">Symmetry: even and odd functions</h3>
<p>A function is <strong>even</strong> if $f(-x) = f(x)$ (mirror symmetry in the $y$-axis, like $x^2$ and $\cos x$) and <strong>odd</strong> if $f(-x) = -f(x)$ (half-turn symmetry about the origin, like $x^3$ and $\sin x$). Most functions are neither. Spotting symmetry halves the work in graphing and, later, in integration: the integral of an odd function over $[-a, a]$ is zero.</p>
<div class="worked"><p>Describe how to obtain $y = -(x + 3)^2 + 4$ from $y = x^2$, and find its vertex.</p>
<p>Shift left 3, reflect in the $x$-axis, shift up 4. The vertex moves from $(0, 0)$ to $(-3, 4)$, and the parabola now opens downwards, so 4 is its maximum.</p></div>
<div data-quiz="0"></div>`, quizzes: [QM(R`Which function is odd?`, ['$x^2 + 1$', '$x^3 - x$', '$|x|$', '$x^3 + 1$'], 1, [R`Check $f(-x) = -f(x)$.`], R`$(-x)^3 - (-x) = -(x^3 - x)$.`)] },
    2: { html: R`
<h3 class="sub">Laws of logarithms</h3>
<p>$\log_b x$ is the power you raise $b$ to in order to get $x$: $\log_2 8 = 3$ because $2^3 = 8$. Since logs are exponents, the exponent laws become log laws:</p>
<div class="key"><p>$\log_b(xy) = \log_b x + \log_b y,\quad \log_b\dfrac{x}{y} = \log_b x - \log_b y,\quad \log_b x^k = k\log_b x,\quad \log_b x = \dfrac{\ln x}{\ln b}.$</p></div>
<p>The last, the <strong>change of base</strong> formula, lets you compute any log with the $\ln$ key. Logs turn multiplication into addition, which is why slide rules worked and why scientists use log scales (decibels, pH, earthquake magnitudes, star magnitudes).</p>
<h3 class="sub">Solving exponential equations</h3>
<div class="worked"><p>A colony of bacteria doubles every 20 minutes. Starting from 500, when does it reach $10^6$?</p>
<p>$N(t) = 500\cdot2^{t/20}$. Set $2^{t/20} = 2000$; take logs: $\dfrac{t}{20}\ln2 = \ln2000$, so $t = 20\cdot\dfrac{\ln 2000}{\ln 2} \approx 219$ minutes, about 3 h 39 min.</p></div>
<p>Growth by a fixed percentage is exponential: $A(1 + r)^n$. Continuous growth at rate $k$ is $Ae^{kt}$; the number $e \approx 2.718$ is what $(1 + 1/n)^n$ approaches as interest is compounded more and more often. The <strong>half-life</strong> or <strong>doubling time</strong> of $Ae^{kt}$ is $\ln2/|k|$, the same at every moment: that is the signature of exponential change.</p>
<div class="warn-box"><p>$\log(x + y)$ does not equal $\log x + \log y$, and $\ln(x)/\ln(y)$ is not $\ln(x - y)$. The log laws only apply to products, quotients and powers.</p></div>
<div data-quiz="0"></div>`, quizzes: [QN(R`Solve $3^{2x - 1} = 81$.`, 2.5, [R`$81 = 3^4$.`], R`$2x - 1 = 4$, $x = 2.5$.`)] },
    3: { html: R`
<p>This section is only a first look. The <strong>Trigonometry</strong> chapter, next in this book, develops the unit circle, exact values, identities, equations and the sine and cosine rules in full. Here are the three facts every function-graph question needs:</p>
<ul><li>$\sin$ and $\cos$ have period $2\pi$ and range $[-1, 1]$; $\tan$ has period $\pi$ and asymptotes at $\pi/2 + k\pi$.</li>
<li>$y = A\sin(Bx + C) + D$ has amplitude $|A|$, period $2\pi/|B|$ and midline $y = D$.</li>
<li>$\sin^2x + \cos^2x = 1$ for every $x$.</li></ul>
<div class="worked"><p>Daylight in London varies roughly as $L(t) = 12.2 + 4.3\sin\!\left(\dfrac{2\pi(t - 80)}{365}\right)$ hours, with $t$ the day of the year. What are the longest and shortest days, and when is daylight 12.2 hours?</p>
<p>Longest $12.2 + 4.3 = 16.5$ h, shortest $7.9$ h. The sine is zero when $t = 80$ (about 21 March) and half a period later, $t \approx 262$ (about 19 September): the equinoxes.</p></div>` }
  });

  /* ---------------- Sequences, sums and the binomial theorem ---------------- */
  X('math-sequences', {
    0: { html: R`
<h3 class="sub">The sum of an arithmetic series</h3>
<p>An <strong>arithmetic sequence</strong> adds the same <strong>common difference</strong> $d$ each time: $a, a + d, a + 2d, \dots$, with $n$th term $u_n = a + (n - 1)d$. To add its first $n$ terms, write the sum forwards and backwards:</p>
$$S_n = a + (a + d) + \dots + l,\qquad S_n = l + (l - d) + \dots + a.$$
<p>Adding column by column gives $n$ copies of $(a + l)$, so</p>
<div class="key"><p>$S_n = \dfrac{n}{2}(a + l) = \dfrac{n}{2}\big(2a + (n - 1)d\big)$: the number of terms times the average of the first and last.</p></div>
<div class="worked"><p>A theatre has 20 rows. The first row has 16 seats and each row has 2 more than the one in front. How many seats are there?</p>
<p>$a = 16$, $d = 2$, $n = 20$, last row $l = 16 + 19\cdot2 = 54$. $S_{20} = 10(16 + 54) = 700$ seats.</p></div>
<p>To find how many terms a sequence has, solve $u_n = l$ for $n$: in $7, 11, 15, \dots, 403$, $7 + 4(n - 1) = 403$ gives $n = 100$.</p>` },
    1: { html: R`
<h3 class="sub">Geometric series and the infinite sum</h3>
<p>A <strong>geometric sequence</strong> multiplies by a <strong>common ratio</strong> $r$: $a, ar, ar^2, \dots$, $u_n = ar^{n-1}$. Multiply the sum by $r$ and subtract:</p>
$$S_n - rS_n = a - ar^n\ \Rightarrow\ S_n = \frac{a(1 - r^n)}{1 - r}\quad (r \ne 1).$$
<p>If $|r| < 1$, then $r^n \to 0$ and the sum settles down to a finite limit, the <strong>sum to infinity</strong>:</p>
<div class="key"><p>$S_\infty = \dfrac{a}{1 - r}$ for $|r| < 1$. If $|r| \ge 1$ the series diverges.</p></div>
<div class="worked"><p>A ball dropped from 2 m bounces back to 60% of its previous height each time. What total distance does it travel?</p>
<p>Down 2 m, then up-and-down $2\cdot1.2$, $2\cdot0.72$, … The bounces form a geometric series with $a = 2.4$, $r = 0.6$: $2.4/0.4 = 6$. Total $2 + 6 = 8$ m, even though it bounces infinitely often.</p></div>
<p>Repeating decimals are geometric series: $0.\overline{27} = \dfrac{27}{100} + \dfrac{27}{100^2} + \dots = \dfrac{27/100}{1 - 1/100} = \dfrac{27}{99} = \dfrac{3}{11}$.</p>
<div data-quiz="0"></div>`, quizzes: [QN(R`Find $1 + \tfrac13 + \tfrac19 + \tfrac1{27} + \dots$`, 1.5, [R`$a = 1$, $r = 1/3$.`], R`$1/(1 - 1/3) = 3/2$.`)] },
    2: { html: R`
<h3 class="sub">Reading and using sigma notation</h3>
<p>$\displaystyle\sum_{k=1}^{n} f(k)$ means "substitute $k = 1, 2, \dots, n$ into $f(k)$ and add the results". The letter $k$ is a dummy: $\sum_{k=1}^n k^2$ and $\sum_{j=1}^n j^2$ are the same number. The rules follow from ordinary addition:</p>
<div class="key"><p>$\sum (a_k + b_k) = \sum a_k + \sum b_k,\qquad \sum c\,a_k = c\sum a_k,\qquad \sum_{k=1}^{n} c = nc.$<br>
Standard sums: $\sum_{k=1}^n k = \dfrac{n(n+1)}{2},\quad \sum_{k=1}^n k^2 = \dfrac{n(n+1)(2n+1)}{6},\quad \sum_{k=1}^n k^3 = \left(\dfrac{n(n+1)}{2}\right)^2.$</p></div>
<div class="worked"><p>Evaluate $\displaystyle\sum_{k=1}^{20}(3k^2 - 2k + 1)$.</p>
<p>$3\cdot\dfrac{20\cdot21\cdot41}{6} - 2\cdot\dfrac{20\cdot21}{2} + 20 = 8610 - 420 + 20 = 8210$.</p></div>
<p>You can <strong>shift the index</strong>: $\sum_{k=3}^{n} a_k = \sum_{j=1}^{n-2} a_{j+2}$ (put $j = k - 2$). And a sum from $m$ to $n$ is "all the way to $n$ minus all the way to $m - 1$".</p>
<h3 class="sub">Telescoping sums</h3>
<p>If each term is a difference $b_k - b_{k+1}$, almost everything cancels: $\sum_{k=1}^n (b_k - b_{k+1}) = b_1 - b_{n+1}$. Partial fractions often reveal this: $\dfrac{1}{k(k+1)} = \dfrac1k - \dfrac{1}{k + 1}$, so $\sum_{k=1}^{99}\dfrac{1}{k(k+1)} = 1 - \dfrac{1}{100} = 0.99$.</p>
<h3 class="sub">Pi notation for products</h3>
<p>Just as $\Sigma$ (capital sigma, S for sum) adds, $\Pi$ (capital pi, P for product) multiplies:</p>
<div class="key"><p>$\displaystyle\prod_{k=1}^{n} a_k = a_1\cdot a_2 \cdots a_n.$ For example $\displaystyle\prod_{k=1}^{n} k = n!$ and $\displaystyle\prod_{k=1}^{n} c = c^n$.</p></div>
<p>The rules mirror sigma's, with multiplication in place of addition: $\prod (a_kb_k) = \prod a_k\cdot\prod b_k$ and $\prod c\,a_k = c^n\prod a_k$ (the constant appears $n$ times, so it becomes a power, not a factor). An empty product, with no terms, equals 1, just as an empty sum equals 0; this is why $0! = 1$.</p>
<p>Logarithms convert one notation into the other: $\ln\displaystyle\prod_{k=1}^n a_k = \sum_{k=1}^n \ln a_k$. That is how statisticians handle the product of many probabilities, and how we will estimate $n!$.</p>
<p>Products telescope too, by cancelling factors instead of terms:</p>
<div class="worked"><p>Evaluate $\displaystyle\prod_{k=2}^{100}\left(1 - \frac{1}{k}\right)$ and $\displaystyle\prod_{k=2}^{n}\left(1 - \frac{1}{k^2}\right)$.</p>
<p>First: $\prod_{k=2}^{100}\dfrac{k - 1}{k} = \dfrac12\cdot\dfrac23\cdot\dfrac34\cdots\dfrac{99}{100} = \dfrac{1}{100}$.</p>
<p>Second: $1 - \dfrac1{k^2} = \dfrac{(k - 1)(k + 1)}{k\cdot k}$. The factors $\dfrac{k-1}{k}$ multiply to $\dfrac1n$ and the factors $\dfrac{k+1}{k}$ multiply to $\dfrac{n+1}{2}$, so the product is $\dfrac{n + 1}{2n}$, which tends to $\tfrac12$.</p></div>
<h3 class="sub">Recurrences</h3>
<p>A sequence can also be given by a <strong>recurrence</strong>: a starting value and a rule from each term to the next, such as $u_{n+1} = 2u_n + 1$, $u_1 = 1$, giving $1, 3, 7, 15, \dots = 2^n - 1$. A recurrence $u_{n+1} = ru_n + c$ settles to the <strong>fixed point</strong> $L = c/(1 - r)$ when $|r| < 1$ (solve $L = rL + c$). The Recurrences chapter in Olympiad Foundations goes much further.</p>
<div data-quiz="0"></div>`, quizzes: [QN(R`Evaluate $\displaystyle\prod_{k=1}^{5} 2k$.`, 3840, [R`$2^5\cdot5!$.`], R`$32\cdot120 = 3840$.`), QN(R`Evaluate $\displaystyle\sum_{k=1}^{10}(2k - 1)$.`, 100, [R`The first ten odd numbers.`], R`$2\cdot55 - 10 = 100 = 10^2$.`)] },
    3: { html: R`
<h3 class="sub">Why the binomial coefficients appear</h3>
<p>Expanding $(a + b)^n = (a + b)(a + b)\cdots(a + b)$, each term of the result picks either $a$ or $b$ from each of the $n$ brackets. A term $a^{n-k}b^k$ arises once for every way of choosing which $k$ brackets supply the $b$: there are $\binom{n}{k}$ such ways. Hence</p>
<div class="key"><p>$(a + b)^n = \displaystyle\sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k,\qquad \binom{n}{k} = \frac{n!}{k!\,(n-k)!}.$</p></div>
<p>The coefficients form <strong>Pascal's triangle</strong>, in which each entry is the sum of the two above it: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.</p>
<div class="worked"><p>Find the coefficient of $x^3$ in $(2 - 3x)^7$.</p>
<p>The term is $\binom{7}{3}2^4(-3x)^3 = 35\cdot16\cdot(-27)x^3$, so the coefficient is $-15\,120$. Keep the sign with the $b$ term: $(-3x)^3 = -27x^3$.</p></div>
<h3 class="sub">Useful consequences</h3>
<ul><li>Put $a = b = 1$: $\sum_k \binom nk = 2^n$, the number of subsets of an $n$-element set.</li>
<li>Put $a = 1$, $b = -1$: $\sum_k (-1)^k\binom nk = 0$, so subsets of even and odd size are equally many.</li>
<li>Approximations: $(1 + x)^n \approx 1 + nx$ for small $x$. So $1.01^{10} \approx 1.10$ (the true value is $1.1046$).</li>
<li>For a negative or fractional power, $(1 + x)^r = 1 + rx + \dfrac{r(r-1)}{2!}x^2 + \dots$ is an infinite series that converges for $|x| < 1$: Newton's generalised binomial theorem, a first taste of Taylor series.</li></ul>
<div data-quiz="0"></div>`, quizzes: [QN(R`What is the constant term in $\left(x + \dfrac{2}{x}\right)^6$?`, 160, [R`You need equal powers of $x$ and $1/x$: $k = 3$.`], R`$\binom63 2^3 = 20\cdot8 = 160$.`)] }
  });

  /* ---------------- Limits and continuity ---------------- */
  X('math-limits', {
    0: { html: R`
<h3 class="sub">One-sided limits and when a limit does not exist</h3>
<p>$\lim_{x\to a^-} f(x)$ looks only at $x$ slightly <em>less</em> than $a$, and $\lim_{x\to a^+}$ only at $x$ slightly more. The two-sided limit exists exactly when both one-sided limits exist and agree. For the step function $H(x)$ (0 for $x < 0$, 1 for $x \ge 0$) the left limit at 0 is 0 and the right limit is 1, so there is no limit there.</p>
<p>Limits can also fail by blowing up ($1/x^2$ near 0 grows without bound, which we write $\lim = \infty$) or by oscillating ($\sin(1/x)$ swings between $-1$ and $1$ infinitely often as $x \to 0$, approaching nothing).</p>
<h3 class="sub">The ε–δ definition</h3>
<p>"$f(x)$ gets as close as we like to $L$" is made precise like this: $\lim_{x\to a} f(x) = L$ means that for every tolerance $\varepsilon > 0$ there is a $\delta > 0$ such that $0 < |x - a| < \delta$ guarantees $|f(x) - L| < \varepsilon$. You challenge me with an $\varepsilon$; I answer with a $\delta$.</p>
<div class="worked"><p>Prove that $\lim_{x\to2}(3x + 1) = 7$.</p>
<p>We need $|3x + 1 - 7| = 3|x - 2| < \varepsilon$. Choosing $\delta = \varepsilon/3$ works: if $|x - 2| < \varepsilon/3$ then $3|x - 2| < \varepsilon$. ∎</p></div>
<p>The ε–δ lab lets you play this game visually. In practice we rarely use the definition directly; we use the limit laws, which are proved from it once and for all.</p>` },
    1: { html: R`
<h3 class="sub">A toolkit of algebraic tricks</h3>
<p>Direct substitution works whenever the function is continuous at the point. When it gives a meaningless $\tfrac00$, the limit may still exist; rewrite the expression first:</p>
<ul><li><strong>Factorise and cancel</strong>: $\dfrac{x^2 - 9}{x - 3} = x + 3 \to 6$ as $x \to 3$.</li>
<li><strong>Multiply by the conjugate</strong> to clear roots: $\dfrac{\sqrt{x + 4} - 2}{x} = \dfrac{(x + 4) - 4}{x(\sqrt{x + 4} + 2)} = \dfrac{1}{\sqrt{x + 4} + 2} \to \dfrac14$.</li>
<li><strong>Combine fractions</strong>: $\dfrac1x\left(\dfrac{1}{x + 1} - 1\right) = \dfrac{-1}{x + 1} \to -1$.</li>
<li><strong>Divide by the highest power</strong> for limits at infinity: $\dfrac{3x^2 + 5}{7x^2 - x} = \dfrac{3 + 5/x^2}{7 - 1/x} \to \dfrac37$.</li></ul>
<div class="worked"><p>Find $\displaystyle\lim_{x\to1}\frac{x^3 - 1}{x^2 - 1}$.</p>
<p>Factorise: $\dfrac{(x - 1)(x^2 + x + 1)}{(x - 1)(x + 1)} = \dfrac{x^2 + x + 1}{x + 1} \to \dfrac32$.</p></div>
<div class="warn-box"><p>$\tfrac00$ is not "0" or "1" or "undefined"; it is a signal that the question is not yet answered. The limit could be any number, or not exist.</p></div>` },
    2: { html: R`
<h3 class="sub">Why $\sin x / x \to 1$</h3>
<p>On the unit circle with a small angle $x$, the sector of area $\tfrac x2$ sits between two triangles, of areas $\tfrac12\sin x$ and $\tfrac12\tan x$. So $\sin x \le x \le \tan x$. Dividing by $\sin x$ and taking reciprocals gives $\cos x \le \dfrac{\sin x}{x} \le 1$. As $x \to 0$, $\cos x \to 1$, and the squeeze theorem finishes the job.</p>
<p>From this one limit come others: $\dfrac{\tan x}{x} = \dfrac{\sin x}{x}\cdot\dfrac{1}{\cos x} \to 1$, $\dfrac{\sin 5x}{x} = 5\cdot\dfrac{\sin5x}{5x} \to 5$, and $\dfrac{1 - \cos x}{x^2} = \dfrac{\sin^2x}{x^2(1 + \cos x)} \to \tfrac12$.</p>
<div class="worked"><p>Use the squeeze theorem to find $\displaystyle\lim_{x\to0}x^2\sin\frac1x$.</p>
<p>Whatever $\sin(1/x)$ does, it stays in $[-1, 1]$, so $-x^2 \le x^2\sin(1/x) \le x^2$. Both bounds tend to 0, so the limit is 0, even though $\sin(1/x)$ itself has no limit.</p></div>` },
    3: { html: R`
<h3 class="sub">Kinds of discontinuity</h3>
<p>$f$ is <strong>continuous</strong> at $a$ when $\lim_{x\to a} f(x) = f(a)$: the limit exists, the value exists, and they agree. Things can go wrong in three ways:</p>
<ul><li>a <strong>removable</strong> discontinuity (a hole): $\dfrac{x^2 - 1}{x - 1}$ at $x = 1$, fixed by defining the value as 2;</li>
<li>a <strong>jump</strong>: the one-sided limits differ, as for the step function or the cost of posting a parcel by weight;</li>
<li>an <strong>infinite</strong> discontinuity: a vertical asymptote, as for $1/x$ at 0.</li></ul>
<h3 class="sub">The intermediate value theorem</h3>
<p>If $f$ is continuous on $[a, b]$ and $N$ lies between $f(a)$ and $f(b)$, then $f(c) = N$ for some $c$ in $[a, b]$. A continuous graph cannot jump over a horizontal line. It guarantees roots: $x^5 - 3x + 1$ is $-1$ at $x = 1$ and $27$ at $x = 2$, so it has a root between 1 and 2. Halving the interval repeatedly (<strong>bisection</strong>) pins the root down to any accuracy, one binary digit per step.</p>
<div class="worked"><p>Show that at any moment there are two opposite points on the equator with the same temperature.</p>
<p>Let $g(\theta) = T(\theta) - T(\theta + \pi)$. Then $g(\theta + \pi) = -g(\theta)$, so $g$ takes opposite signs at $\theta$ and $\theta + \pi$ (or is zero already). By the IVT it is zero somewhere in between.</p></div>
<h3 class="sub">Asymptotes</h3>
<p>A <strong>horizontal asymptote</strong> $y = L$ means $f(x) \to L$ as $x \to \pm\infty$. For a rational function compare degrees: top lower than bottom gives $y = 0$; equal degrees give the ratio of leading coefficients; top one higher gives a slant asymptote, found by polynomial division. The exponential beats every power: $x^{100}e^{-x} \to 0$ as $x \to \infty$, and every power beats the logarithm: $\ln x / x^{0.01} \to 0$.</p>` }
  });

  /* ---------------- The derivative ---------------- */
  X('math-derivatives', {
    0: { html: R`
<h3 class="sub">The derivative from first principles</h3>
<p>The slope of the chord from $(x, f(x))$ to $(x + h, f(x + h))$ is $\dfrac{f(x + h) - f(x)}{h}$. Letting $h \to 0$ turns the chord into the tangent:</p>
<div class="key"><p>$f'(x) = \displaystyle\lim_{h\to0}\frac{f(x + h) - f(x)}{h}$, also written $\dfrac{df}{dx}$ or $\dfrac{dy}{dx}$.</p></div>
<div class="worked"><p>Differentiate $f(x) = x^2$ and $g(x) = 1/x$ from first principles.</p>
<p>$\dfrac{(x + h)^2 - x^2}{h} = \dfrac{2xh + h^2}{h} = 2x + h \to 2x$.</p>
<p>$\dfrac{1}{h}\left(\dfrac{1}{x + h} - \dfrac1x\right) = \dfrac{-h}{hx(x + h)} = \dfrac{-1}{x(x + h)} \to -\dfrac{1}{x^2}$.</p></div>
<p>The derivative is itself a function: the slope of $f$ at every point. Where $f$ rises, $f' > 0$; where it falls, $f' < 0$; at a smooth peak or trough, $f' = 0$. Physically, if $s(t)$ is position, then $s'(t)$ is velocity and its derivative $s''(t)$ is acceleration.</p>
<h3 class="sub">When there is no derivative</h3>
<p>$|x|$ has a corner at 0: the slope is $-1$ on the left and $+1$ on the right, so no single tangent exists. A function can be continuous without being differentiable (there are even continuous functions that have a corner everywhere), but differentiable functions are always continuous.</p>` },
    1: { html: R`
<h3 class="sub">The rules, and why they hold</h3>
<div class="key"><p>$\dfrac{d}{dx}x^n = nx^{n-1}$ (any real $n$)<br>$(af + bg)' = af' + bg'$<br>Product rule: $(fg)' = f'g + fg'$<br>Quotient rule: $\left(\dfrac fg\right)' = \dfrac{f'g - fg'}{g^2}$</p></div>
<p>The product rule has a picture: a rectangle of sides $f$ and $g$ grows by a strip $f'\,\Delta x$ times $g$ along one side and $f$ times $g'\,\Delta x$ along the other; the tiny corner $f'g'(\Delta x)^2$ vanishes in the limit.</p>
<p>The power rule covers roots and reciprocals once you rewrite them: $\sqrt x = x^{1/2}$ has derivative $\tfrac12x^{-1/2}$, and $\dfrac{3}{x^2} = 3x^{-2}$ has derivative $-6x^{-3}$.</p>
<div class="worked"><p>Differentiate $y = \dfrac{x^2 + 1}{x - 1}$ and find where the tangent is horizontal.</p>
<p>$y' = \dfrac{2x(x - 1) - (x^2 + 1)}{(x - 1)^2} = \dfrac{x^2 - 2x - 1}{(x - 1)^2}$. Horizontal tangent where $x^2 - 2x - 1 = 0$: $x = 1 \pm \sqrt2$.</p></div>
<div class="warn-box"><p>$(fg)' \ne f'g'$. Check with $f = g = x$: $(x^2)' = 2x$, but $f'g' = 1$.</p></div>` },
    2: { html: R`
<h3 class="sub">Thinking of the chain rule as rates</h3>
<p>If $y$ depends on $u$ and $u$ depends on $x$, then $\dfrac{dy}{dx} = \dfrac{dy}{du}\cdot\dfrac{du}{dx}$: rates multiply. If a balloon's radius grows 2 cm per second and its volume grows $4\pi r^2$ cm³ per cm of radius, its volume grows $4\pi r^2\cdot2$ cm³ per second.</p>
<p>In function notation, $(f(g(x)))' = f'(g(x))\,g'(x)$: differentiate the outer function, keep the inside unchanged, then multiply by the derivative of the inside.</p>
<div class="worked"><p>Differentiate $y = (3x^2 + 1)^5$, $y = \sqrt{1 - x^2}$ and $y = \sin^3(2x)$.</p>
<p>$5(3x^2 + 1)^4\cdot6x = 30x(3x^2 + 1)^4$.</p>
<p>$\tfrac12(1 - x^2)^{-1/2}\cdot(-2x) = \dfrac{-x}{\sqrt{1 - x^2}}$.</p>
<p>Three layers: cube, sine, $2x$. $3\sin^2(2x)\cdot\cos(2x)\cdot2 = 6\sin^2(2x)\cos(2x)$.</p></div>
<p>With practice you peel layers from the outside in without writing $u$. When the derivative of a composition is wrong, it is almost always a forgotten inner factor.</p>` },
    3: { html: R`
<h3 class="sub">The standard derivatives</h3>
<div class="key"><p>$(e^x)' = e^x,\quad (a^x)' = a^x\ln a,\quad (\ln x)' = \dfrac1x$<br>$(\sin x)' = \cos x,\quad (\cos x)' = -\sin x,\quad (\tan x)' = \sec^2 x$<br>$(\arcsin x)' = \dfrac{1}{\sqrt{1 - x^2}},\quad (\arctan x)' = \dfrac{1}{1 + x^2}$</p></div>
<p>The trig derivatives come from the limits $\sin h/h \to 1$ and $(1 - \cos h)/h \to 0$ with the compound-angle formula. The log derivative follows from the exponential one by differentiating $e^{\ln x} = x$ implicitly.</p>
<h3 class="sub">Implicit and logarithmic differentiation</h3>
<p>When $y$ is tangled up with $x$, differentiate both sides with respect to $x$, treating $y$ as a function of $x$ (so $\frac{d}{dx}y^2 = 2y\,y'$), then solve for $y'$.</p>
<div class="worked"><p>Find the slope of the circle $x^2 + y^2 = 25$ at $(3, 4)$, and of $x^3 + y^3 = 6xy$ at $(3, 3)$.</p>
<p>Circle: $2x + 2yy' = 0$, $y' = -x/y = -3/4$, perpendicular to the radius as expected.</p>
<p>Folium: $3x^2 + 3y^2y' = 6y + 6xy'$, so $y' = \dfrac{2y - x^2}{y^2 - 2x} = \dfrac{6 - 9}{9 - 6} = -1$.</p></div>
<p>For products of many factors or powers like $x^x$, take logs first: $\ln y = x\ln x$, so $\dfrac{y'}{y} = \ln x + 1$ and $(x^x)' = x^x(\ln x + 1)$.</p>` }
  });

  /* ---------------- Using derivatives ---------------- */
  X('math-applications', {
    0: { html: R`
<h3 class="sub">Classifying stationary points</h3>
<p>Points where $f'(x) = 0$ are <strong>stationary points</strong>. Each is a local maximum, a local minimum, or a <strong>point of inflection</strong> where the curve flattens but keeps going (like $x^3$ at 0). Two tests decide:</p>
<ul><li><strong>First-derivative test</strong>: if $f'$ changes from $+$ to $-$, it is a maximum; from $-$ to $+$, a minimum; no change of sign, an inflection.</li>
<li><strong>Second-derivative test</strong>: $f'' < 0$ means a maximum (concave down, like a frown), $f'' > 0$ a minimum (concave up). If $f'' = 0$ the test says nothing: use the first test.</li></ul>
<div class="worked"><p>Find and classify the stationary points of $f(x) = x^3 - 6x^2 + 9x + 1$.</p>
<p>$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$, zero at $x = 1, 3$. $f''(x) = 6x - 12$: $f''(1) = -6 < 0$, a maximum at $(1, 5)$; $f''(3) = 6 > 0$, a minimum at $(3, 1)$.</p></div>
<p><strong>Concavity</strong> changes at an inflection point, where $f''$ changes sign; here at $x = 2$. A full sketch combines intercepts, stationary points, concavity, asymptotes and behaviour as $x \to \pm\infty$.</p>
<h3 class="sub">Global extremes on an interval</h3>
<p>On a closed interval $[a, b]$, a continuous function has a largest and a smallest value. They occur either at stationary points inside or at the endpoints, so compare $f$ at all of them. On $[0, 5]$ the function above has values $f(0) = 1$, $f(1) = 5$, $f(3) = 1$, $f(5) = 21$: the global maximum is 21 at the endpoint, not at the "maximum".</p>` },
    1: { html: R`
<h3 class="sub">A recipe for optimisation</h3>
<ol><li>Draw a picture and name the variables.</li><li>Write the quantity to optimise, then use the constraint to reduce it to one variable.</li><li>Note the allowed interval.</li><li>Differentiate, find stationary points, and check they are the maximum or minimum you want (and compare with the endpoints).</li><li>Answer the question asked, with units.</li></ol>
<div class="worked"><p>A cylindrical can must hold 500 cm³. What radius minimises the metal used?</p>
<p>Surface area $A = 2\pi r^2 + 2\pi rh$ and $\pi r^2h = 500$, so $h = 500/(\pi r^2)$ and $A(r) = 2\pi r^2 + \dfrac{1000}{r}$. $A'(r) = 4\pi r - \dfrac{1000}{r^2} = 0$ gives $r^3 = \dfrac{250}{\pi}$, $r \approx 4.30$ cm, and then $h = 2r \approx 8.60$ cm. $A'' > 0$, so it is a minimum. The best can is as tall as it is wide; real cans are taller because the lid and base are made of thicker metal.</p></div>
<div class="worked"><p>Light travels from $A$ in air to $B$ in water, crossing the surface at a point $P$. Show that the fastest path obeys Snell's law.</p>
<p>The time is $T(x) = \dfrac{\sqrt{a^2 + x^2}}{v_1} + \dfrac{\sqrt{b^2 + (d - x)^2}}{v_2}$. Setting $T'(x) = 0$ gives $\dfrac{x}{v_1\sqrt{a^2 + x^2}} = \dfrac{d - x}{v_2\sqrt{b^2 + (d - x)^2}}$, which is $\dfrac{\sin\theta_1}{v_1} = \dfrac{\sin\theta_2}{v_2}$. Nature optimises: this is Fermat's principle.</p></div>` },
    2: { html: R`
<h3 class="sub">Related rates, step by step</h3>
<p>When quantities linked by an equation change with time, differentiate the equation with respect to $t$ (chain rule on every term), then substitute the known values <em>after</em> differentiating.</p>
<div class="worked"><p>A 5 m ladder slides down a wall. When its foot is 3 m from the wall it moves away at 0.5 m/s. How fast is the top sliding down?</p>
<p>$x^2 + y^2 = 25$, so $2x\dot x + 2y\dot y = 0$. With $x = 3$, $y = 4$, $\dot x = 0.5$: $\dot y = -\dfrac{x\dot x}{y} = -\dfrac{1.5}{4} = -0.375$ m/s. The top slides down at 0.375 m/s, and faster and faster as it nears the ground.</p></div>
<div class="worked"><p>Water pours into an inverted cone (top radius 2 m, depth 6 m) at 0.3 m³/min. How fast does the level rise when the water is 3 m deep?</p>
<p>By similar triangles $r = h/3$, so $V = \tfrac13\pi r^2h = \dfrac{\pi h^3}{27}$ and $\dot V = \dfrac{\pi h^2}{9}\dot h$. At $h = 3$: $0.3 = \pi\dot h$, $\dot h \approx 0.095$ m/min.</p></div>
<div class="warn-box"><p>Substituting numbers before differentiating freezes a changing quantity into a constant, and its rate wrongly becomes zero.</p></div>` },
    3: { html: R`
<h3 class="sub">Linear approximation and differentials</h3>
<p>Near $x = a$ a smooth curve looks like its tangent: $f(a + h) \approx f(a) + f'(a)h$. So $\sqrt{4.1} \approx 2 + \tfrac14\cdot0.1 = 2.025$ (true value $2.02485$). In error analysis the same idea says that a small error $\Delta x$ in a measurement causes an error $\Delta y \approx f'(x)\Delta x$; for powers, relative errors multiply by the exponent ($V = \tfrac43\pi r^3$, so a 1% error in $r$ gives about 3% in $V$).</p>
<h3 class="sub">Newton's method</h3>
<p>To solve $f(x) = 0$, start near a root and follow the tangent to the axis: $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$. Near a simple root the number of correct digits roughly doubles each step.</p>
<div class="worked"><p>Find $\sqrt2$ by Newton's method on $f(x) = x^2 - 2$, starting from $x_0 = 1$.</p>
<p>$x_{n+1} = x_n - \dfrac{x_n^2 - 2}{2x_n} = \dfrac12\left(x_n + \dfrac{2}{x_n}\right)$: $1, 1.5, 1.41667, 1.4142157, 1.41421356$. Four steps give eight digits. (This is the Babylonian method, 4000 years old.)</p></div>
<p>It can fail: if $f'(x_n) = 0$ the tangent never meets the axis, and from a bad start the iterates may wander or cycle.</p>
<h3 class="sub">L'Hôpital's rule</h3>
<p>If $f(a) = g(a) = 0$ (or both tend to $\infty$), then $\lim\dfrac{f}{g} = \lim\dfrac{f'}{g'}$, if the latter exists. So $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2} = \lim\frac{e^x - 1}{2x} = \lim\frac{e^x}{2} = \frac12$. Other forms like $0\cdot\infty$ or $1^\infty$ must first be rewritten as a quotient, often with logarithms: $\lim(1 + 1/x)^x = e$ because $x\ln(1 + 1/x) \to 1$.</p>` }
  });

  /* ---------------- The integral ---------------- */
  X('math-integrals', {
    0: { html: R`
<h3 class="sub">Riemann sums in sigma notation</h3>
<p>Split $[a, b]$ into $n$ strips of width $\Delta x = \dfrac{b - a}{n}$ and sample the height at $x_k = a + k\Delta x$. The total area of the rectangles is $\displaystyle\sum_{k=1}^{n} f(x_k)\,\Delta x$, and the <strong>definite integral</strong> is its limit as $n \to \infty$:</p>
<div class="key"><p>$\displaystyle\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{k=1}^{n} f(x_k)\,\Delta x$.</p></div>
<p>The elongated S of the integral sign is a stretched "sum", and $dx$ is the limit of $\Delta x$.</p>
<div class="worked"><p>Compute $\int_0^1 x^2\,dx$ from the definition.</p>
<p>With right endpoints $x_k = k/n$: $\displaystyle\sum_{k=1}^n \frac{k^2}{n^2}\cdot\frac1n = \frac{1}{n^3}\cdot\frac{n(n + 1)(2n + 1)}{6} \to \frac{2}{6} = \frac13$. Archimedes found this area (under a parabola) 2200 years ago by a similar argument.</p></div>
<p>Area below the axis counts as negative, so $\int_0^{2\pi}\sin x\,dx = 0$. For the total geometric area, integrate $|f|$, splitting the interval where $f$ changes sign.</p>` },
    1: { html: R`
<h3 class="sub">A table of antiderivatives</h3>
<div class="key"><p>$\displaystyle\int x^n dx = \frac{x^{n+1}}{n + 1} + C\ (n \ne -1),\quad \int\frac{dx}{x} = \ln|x| + C,\quad \int e^{kx}dx = \frac{e^{kx}}{k} + C$<br>$\displaystyle\int\sin kx\,dx = -\frac{\cos kx}{k} + C,\quad \int\cos kx\,dx = \frac{\sin kx}{k} + C,\quad \int\frac{dx}{1 + x^2} = \arctan x + C$</p></div>
<p>Every rule is a derivative read backwards, and every answer can be checked by differentiating. The constant $C$ matters: an antiderivative is only determined up to a constant, because shifting a graph up does not change its slopes. An <strong>initial condition</strong> fixes $C$.</p>
<div class="worked"><p>A car's velocity is $v(t) = 6t - t^2$ m/s and it starts at $s(0) = 5$ m. Where is it at $t = 3$?</p>
<p>$s(t) = 3t^2 - \tfrac13t^3 + C$, and $s(0) = 5$ gives $C = 5$. So $s(3) = 27 - 9 + 5 = 23$ m.</p></div>
<div class="warn-box"><p>$\int\frac{1}{x}dx$ is $\ln|x|$, not $\frac{x^0}{0}$: the power rule fails exactly at $n = -1$, which is why the logarithm is needed.</p></div>` },
    2: { html: R`
<h3 class="sub">Why the fundamental theorem is true</h3>
<p>Let $A(x) = \int_a^x f(t)\,dt$ be the area from $a$ up to $x$. Increasing $x$ by a little $h$ adds a thin strip of area about $f(x)\cdot h$. So $\dfrac{A(x + h) - A(x)}{h} \approx f(x)$, and in the limit $A'(x) = f(x)$: <strong>the area function is an antiderivative</strong>. Any antiderivative $F$ differs from $A$ by a constant, which gives</p>
<div class="key"><p>$\displaystyle\int_a^b f(x)\,dx = F(b) - F(a)$, where $F' = f$; and $\displaystyle\frac{d}{dx}\int_a^x f(t)\,dt = f(x)$.</p></div>
<p>This links the two halves of calculus: slopes and areas are inverse operations. Before it, every area required a clever limit of sums; after it, finding an antiderivative is enough.</p>
<div class="worked"><p>Find the area enclosed between $y = x$ and $y = x^2$, and find $\dfrac{d}{dx}\displaystyle\int_0^{x^2}\cos t\,dt$.</p>
<p>They cross at 0 and 1, with $x$ on top: $\int_0^1(x - x^2)dx = \tfrac12 - \tfrac13 = \tfrac16$.</p>
<p>By the chain rule, $\cos(x^2)\cdot2x$.</p></div>
<p>Properties worth knowing: $\int_a^b = -\int_b^a$, $\int_a^b + \int_b^c = \int_a^c$, and for odd $f$, $\int_{-a}^a f = 0$; for even $f$, $\int_{-a}^a f = 2\int_0^a f$.</p>` },
    3: { html: R`
<h3 class="sub">Integrals as accumulated totals</h3>
<p>Whenever a rate is added up over an interval, an integral appears. Distance is $\int v\,dt$; the work done by a varying force is $\int F\,dx$; the mass of a rod of density $\lambda(x)$ is $\int\lambda\,dx$; total rainfall is the integral of the rainfall rate. The pattern is always: slice, approximate each slice, add, take the limit.</p>
<h3 class="sub">Average value</h3>
<p>The <strong>mean value</strong> of $f$ on $[a, b]$ is $\bar f = \dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,dx$: the height of the rectangle with the same area. The average of $\sin x$ over half a period is $\frac1\pi\int_0^\pi\sin x\,dx = \frac{2}{\pi} \approx 0.64$, which is why a rectified AC current delivers about 64% of its peak value on average.</p>
<div class="worked"><p>A drug's concentration is $c(t) = 20te^{-0.5t}$ mg/L. Total exposure is the area under the curve from 0 to ∞; find it.</p>
<p>Integration by parts (next chapter) gives $\int_0^\infty te^{-kt}dt = 1/k^2$. With $k = 0.5$: $20\cdot4 = 80$ mg·h/L. Doctors compare drugs and doses by exactly this "AUC".</p></div>` }
  });

  /* ---------------- Techniques of integration ---------------- */
  X('math-techniques', {
    0: { html: R`
<h3 class="sub">How to choose the substitution</h3>
<p>Substitution is the chain rule backwards. Look for a function whose derivative also appears (up to a constant factor): set $u$ equal to that function, replace $dx$ using $du = u'(x)\,dx$, and the integral becomes simpler.</p>
<div class="worked"><p>Evaluate $\displaystyle\int x\,e^{x^2}dx$, $\displaystyle\int\frac{\ln x}{x}dx$ and $\displaystyle\int_0^2\frac{x}{\sqrt{x^2 + 5}}dx$.</p>
<p>$u = x^2$, $du = 2x\,dx$: $\tfrac12\int e^u du = \tfrac12e^{x^2} + C$.</p>
<p>$u = \ln x$, $du = dx/x$: $\int u\,du = \tfrac12(\ln x)^2 + C$.</p>
<p>$u = x^2 + 5$ runs from 5 to 9: $\tfrac12\int_5^9 u^{-1/2}du = [\sqrt u]_5^9 = 3 - \sqrt5$. Change the limits along with the variable and you never need to go back to $x$.</p></div>
<p>A useful special case: $\displaystyle\int\frac{f'(x)}{f(x)}dx = \ln|f(x)| + C$, so $\int\tan x\,dx = -\ln|\cos x| + C$.</p>
<h3 class="sub">Trigonometric substitution</h3>
<p>Expressions like $\sqrt{a^2 - x^2}$ simplify with $x = a\sin\theta$, since $a^2 - a^2\sin^2\theta = a^2\cos^2\theta$. This is how $\int_{-r}^r\sqrt{r^2 - x^2}\,dx = \frac{\pi r^2}{2}$ proves the area of a circle.</p>` },
    1: { html: R`
<h3 class="sub">Choosing u and dv: LIATE</h3>
<p>Integration by parts, $\int u\,dv = uv - \int v\,du$, is the product rule backwards. It helps when differentiating one factor makes it simpler while the other can still be integrated. A rule of thumb for which factor to call $u$ (to differentiate): <strong>L</strong>ogs, <strong>I</strong>nverse trig, <strong>A</strong>lgebraic, <strong>T</strong>rig, <strong>E</strong>xponential, in that order.</p>
<div class="worked"><p>Evaluate $\displaystyle\int x^2e^x dx$, $\displaystyle\int\ln x\,dx$ and $\displaystyle\int e^x\sin x\,dx$.</p>
<p>Twice by parts: $x^2e^x - \int2xe^x = x^2e^x - 2(xe^x - e^x) = e^x(x^2 - 2x + 2) + C$.</p>
<p>Take $u = \ln x$, $dv = dx$: $x\ln x - \int x\cdot\tfrac1x dx = x\ln x - x + C$.</p>
<p>Twice by parts brings the integral $I$ back: $I = e^x\sin x - e^x\cos x - I$, so $I = \tfrac12e^x(\sin x - \cos x) + C$.</p></div>
<p>For repeated parts, a table helps: list derivatives of $u$ down to zero in one column and repeated integrals of $dv$ in the other, then multiply diagonally with alternating signs.</p>` },
    2: { html: R`
<h3 class="sub">Partial fractions in practice</h3>
<p>A rational function with a factorised denominator splits into simple pieces. For distinct linear factors, $\dfrac{3x + 5}{(x - 1)(x + 3)} = \dfrac{A}{x - 1} + \dfrac{B}{x + 3}$. Multiply out and put $x = 1$: $8 = 4A$, $A = 2$; put $x = -3$: $-4 = -4B$, $B = 1$. So the integral is $2\ln|x - 1| + \ln|x + 3| + C$.</p>
<p>Repeated factors need one term per power, $\dfrac{A}{x - 1} + \dfrac{B}{(x - 1)^2}$, and irreducible quadratics need a linear numerator, $\dfrac{Ax + B}{x^2 + 1}$, which integrates to a log plus an arctan. If the top's degree is not lower than the bottom's, divide first.</p>
<h3 class="sub">Powers of sine and cosine</h3>
<ul><li>An odd power: save one factor and convert the rest with $\sin^2 = 1 - \cos^2$. $\int\sin^3x\,dx = \int(1 - \cos^2x)\sin x\,dx = -\cos x + \tfrac13\cos^3x + C$.</li>
<li>Even powers: use the double-angle formulas. $\int\cos^2x\,dx = \int\tfrac12(1 + \cos2x)dx = \tfrac x2 + \tfrac14\sin2x + C$.</li></ul>
<div class="worked"><p>Evaluate $\displaystyle\int_0^{\pi}\sin^2x\,dx$.</p>
<p>$\int_0^\pi\tfrac12(1 - \cos2x)dx = \tfrac\pi2$: half the rectangle $\pi\times1$, as the symmetry of $\sin^2 + \cos^2 = 1$ suggests.</p></div>` },
    3: { html: R`
<h3 class="sub">Volumes of revolution</h3>
<p>Spin the region under $y = f(x)$, $a \le x \le b$, about the $x$-axis. Each thin slice is a disc of radius $f(x)$ and thickness $dx$:</p>
<div class="key"><p>$V = \pi\displaystyle\int_a^b f(x)^2\,dx$ (discs),&emsp; $V = 2\pi\displaystyle\int_a^b x\,f(x)\,dx$ (shells, rotating about the $y$-axis).</p></div>
<div class="worked"><p>Derive the volume of a sphere and of a cone.</p>
<p>Sphere: rotate $y = \sqrt{r^2 - x^2}$: $\pi\int_{-r}^r(r^2 - x^2)dx = \pi\left(2r^3 - \tfrac23r^3\right) = \tfrac43\pi r^3$.</p>
<p>Cone: rotate $y = \tfrac rh x$ for $0 \le x \le h$: $\pi\dfrac{r^2}{h^2}\cdot\dfrac{h^3}{3} = \tfrac13\pi r^2h$.</p></div>
<h3 class="sub">Arc length and improper integrals</h3>
<p>A tiny piece of curve has length $\sqrt{dx^2 + dy^2}$, so the length of $y = f(x)$ is $L = \displaystyle\int_a^b\sqrt{1 + f'(x)^2}\,dx$. Even simple curves give hard integrals; the length of an ellipse has no formula in elementary functions.</p>
<p>An <strong>improper integral</strong> has an infinite limit or an infinite integrand, defined as a limit. $\int_1^\infty\frac{dx}{x^2} = 1$ converges, but $\int_1^\infty\frac{dx}{x}$ diverges. Gabriel's horn, $y = 1/x$ rotated, has finite volume $\pi$ but infinite surface area: you could fill it with paint but not paint it.</p>` }
  });

  /* ---------------- Sequences, series and Taylor polynomials ---------------- */
  X('math-series', {
    0: { html: R`
<h3 class="sub">Limits of sequences</h3>
<p>A sequence $a_n$ <strong>converges</strong> to $L$ if its terms eventually stay as close to $L$ as we like. Useful standard limits: $\frac1n \to 0$, $r^n \to 0$ for $|r| < 1$, $\sqrt[n]{n} \to 1$, $\left(1 + \frac{x}{n}\right)^n \to e^x$, and $\dfrac{n^k}{a^n} \to 0$ for $a > 1$ (exponentials beat powers), $\dfrac{a^n}{n!} \to 0$ (factorials beat exponentials).</p>
<p>A sequence that is increasing and bounded above must converge (the <strong>monotone convergence theorem</strong>): this is how we know that $e$ exists before we know its value.</p>
<h3 class="sub">Series are limits of partial sums</h3>
<p>The series $\sum_{n=1}^\infty a_n$ means the limit of the partial sums $S_N = \sum_{n=1}^N a_n$. If the terms do not tend to zero, the series certainly diverges. The converse is false, which the harmonic series shows.</p>
<div class="worked"><p>Show that $1 + \tfrac12 + \tfrac13 + \tfrac14 + \dots$ diverges.</p>
<p>Group the terms: $\tfrac13 + \tfrac14 > \tfrac12$, $\tfrac15 + \dots + \tfrac18 > \tfrac12$, $\tfrac19 + \dots + \tfrac1{16} > \tfrac12$, and so on. Infinitely many halves add up to infinity. The partial sums grow like $\ln N$: slowly, but without limit.</p></div>` },
    1: { html: R`
<h3 class="sub">The main tests</h3>
<ul><li><strong>Comparison</strong>: if $0 \le a_n \le b_n$ and $\sum b_n$ converges, so does $\sum a_n$. So $\sum\frac{1}{n^2 + n}$ converges by comparison with $\sum\frac1{n^2}$.</li>
<li><strong><em>p</em>-series</strong>: $\sum\frac{1}{n^p}$ converges exactly when $p > 1$ (compare with $\int_1^\infty x^{-p}dx$: the <strong>integral test</strong>).</li>
<li><strong>Ratio test</strong>: if $\left|\dfrac{a_{n+1}}{a_n}\right| \to \rho$, the series converges absolutely for $\rho < 1$ and diverges for $\rho > 1$ ($\rho = 1$ is inconclusive). Ideal for factorials and powers.</li>
<li><strong>Alternating series</strong>: if $b_n$ decreases to 0, then $b_1 - b_2 + b_3 - \dots$ converges, and the error after stopping is less than the first omitted term.</li></ul>
<div class="worked"><p>Does $\displaystyle\sum_{n=1}^\infty\frac{n^2}{2^n}$ converge? What about $1 - \tfrac12 + \tfrac13 - \tfrac14 + \dots$?</p>
<p>Ratio: $\dfrac{(n + 1)^2}{2^{n+1}}\cdot\dfrac{2^n}{n^2} \to \tfrac12 < 1$: converges (to 6, in fact).</p>
<p>Alternating with decreasing terms: converges, to $\ln2$. But the absolute values form the harmonic series, so it converges only <strong>conditionally</strong>; Riemann showed such a series can be rearranged to add up to any number you like.</p></div>` },
    2: { html: R`
<h3 class="sub">Building a Taylor polynomial</h3>
<p>We want a polynomial that matches $f$ at $x = a$ in value, slope, curvature and so on. Matching the $k$th derivative forces the coefficient $\dfrac{f^{(k)}(a)}{k!}$:</p>
<div class="key"><p>$f(x) \approx f(a) + f'(a)(x - a) + \dfrac{f''(a)}{2!}(x - a)^2 + \dots + \dfrac{f^{(n)}(a)}{n!}(x - a)^n$.</p></div>
<p>Around $a = 0$ (Maclaurin series) the standard ones are</p>
$$e^x = \sum_{k\ge0}\frac{x^k}{k!},\quad \sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots,\quad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots,\quad \frac{1}{1 - x} = \sum_{k\ge0}x^k.$$
<div class="worked"><p>Estimate $e^{0.1}$ and $\sin(0.2)$ with three terms, and bound the errors.</p>
<p>$e^{0.1} \approx 1 + 0.1 + 0.005 = 1.105$; the next term is $0.1^3/6 \approx 0.00017$ (true value $1.10517$).</p>
<p>$\sin0.2 \approx 0.2 - 0.008/6 + 0.00032/120 = 0.198669$; the alternating-series bound gives an error below $0.2^7/5040 \approx 2.5\times10^{-9}$.</p></div>
<p>The <strong>Lagrange remainder</strong> makes the error precise: $f(x) - T_n(x) = \dfrac{f^{(n+1)}(c)}{(n + 1)!}(x - a)^{n+1}$ for some $c$ between $a$ and $x$.</p>` },
    3: { html: R`
<h3 class="sub">Radius of convergence</h3>
<p>A power series $\sum c_k(x - a)^k$ converges on an interval centred at $a$, of radius $R$ found by the ratio test. The geometric series $\sum x^k$ has $R = 1$; $e^x$ and $\sin x$ have $R = \infty$; $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots$ has $R = 1$ (and converges at $x = 1$, giving $\ln 2$).</p>
<h3 class="sub">Manipulating series</h3>
<p>Inside the radius, power series can be added, multiplied, differentiated and integrated term by term. That generates new series cheaply:</p>
<ul><li>Integrate $\dfrac{1}{1 + t^2} = 1 - t^2 + t^4 - \dots$ to get $\arctan x = x - \dfrac{x^3}{3} + \dfrac{x^5}{5} - \dots$, and put $x = 1$: $\dfrac\pi4 = 1 - \dfrac13 + \dfrac15 - \dots$ (the Leibniz series).</li>
<li>Substitute: $e^{-x^2} = 1 - x^2 + \dfrac{x^4}{2!} - \dots$, so $\int_0^1e^{-x^2}dx \approx 1 - \tfrac13 + \tfrac1{10} - \tfrac1{42} = 0.743$, an integral with no elementary antiderivative.</li>
<li>Limits: $\dfrac{\sin x - x}{x^3} = -\dfrac1{6} + \dfrac{x^2}{120} - \dots \to -\dfrac16$.</li></ul>
<div class="insight"><p>Put $x = i\theta$ in the series for $e^x$ and separate the real and imaginary parts: you get $e^{i\theta} = \cos\theta + i\sin\theta$, Euler's formula (see Complex Numbers). Series reveal connections that are invisible otherwise.</p></div>` }
  });
})();
