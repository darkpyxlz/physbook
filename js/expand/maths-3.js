/* Expanded text for maths: counting, recurrences, inequalities, polynomials and functional equations,
   olympiad geometry, graph theory, games and invariants, Diophantine equations. */
(function () {
  const R = PB.R;
  const X = (id, sections, add) => PB.expand(id, { sections: sections, add: add });

  /* ---------------- Counting and probability ---------------- */
  X('math-combinatorics', {
    0: { html: R`
<h3 class="sub">Addition and multiplication principles</h3>
<p>If a task is done in stages, the number of ways is the <em>product</em> of the choices at each stage (as long as the number of choices at each stage does not depend on earlier choices). If the outcomes split into separate cases, the total is the <em>sum</em> over the cases. Most counting arguments are careful combinations of these two rules.</p>
<div class="worked"><p>How many 4-digit numbers have all digits different? How many of them are even?</p>
<p>First digit 9 ways (not 0), then 9, 8, 7: $9\cdot9\cdot8\cdot7 = 4536$.</p>
<p>Even: split by last digit. Ending in 0: $9\cdot8\cdot7 = 504$. Ending in 2, 4, 6 or 8: last digit 4 ways, first digit 8 ways (not 0, not the last), then 8 and 7: $4\cdot8\cdot8\cdot7 = 1792$. Total 2296. Choosing the most restricted position first avoids the "it depends" problem.</p></div>
<p><strong>Permutations</strong>: arranging $n$ distinct objects in a row gives $n!$ orders; arranging $k$ of them gives $\dfrac{n!}{(n - k)!}$. Around a circle, rotations are the same, so there are $(n - 1)!$ arrangements. With repeated objects divide by the internal orders: MISSISSIPPI has $\dfrac{11!}{4!\,4!\,2!} = 34\,650$ arrangements.</p>
<h3 class="sub">Counting the complement</h3>
<p>"At least one" is usually easiest as "all minus none". Of the $6^4 = 1296$ outcomes of four dice, $5^4 = 625$ show no six, so 671 show at least one.</p>` },
    1: { html: R`
<h3 class="sub">Combinations</h3>
<p>$\binom nk = \dfrac{n!}{k!(n - k)!}$ counts the ways to <em>choose</em> $k$ of $n$ objects when order does not matter: each unordered choice was counted $k!$ times among the ordered ones.</p>
<div class="worked"><p>A committee of 5 is chosen from 7 women and 6 men. How many committees have at least 3 women?</p>
<p>Cases: $\binom73\binom62 + \binom74\binom61 + \binom75\binom60 = 35\cdot15 + 35\cdot6 + 21 = 525 + 210 + 21 = 756$.</p></div>
<h3 class="sub">Identities by double counting</h3>
<p>Proving that two expressions count the same set is often easier than algebra:</p>
<ul><li>$\binom nk = \binom n{n - k}$: choosing who is in is choosing who is out.</li>
<li>Pascal: $\binom nk = \binom{n-1}{k-1} + \binom{n-1}k$: split by whether a particular person is chosen.</li>
<li>$k\binom nk = n\binom{n-1}{k-1}$: choose a committee and its chair, in either order.</li>
<li>Vandermonde: $\sum_j\binom mj\binom n{k-j} = \binom{m+n}k$: choose $k$ from $m$ women and $n$ men, splitting by the number of women.</li>
<li>Hockey stick: $\binom kk + \binom{k+1}k + \dots + \binom nk = \binom{n+1}{k+1}$.</li></ul>
<p>Lattice paths: to go from $(0, 0)$ to $(m, n)$ moving right and up, choose which $n$ of the $m + n$ steps are "up": $\binom{m+n}n$ paths.</p>` },
    2: { html: R`
<h3 class="sub">Inclusion–exclusion in general</h3>
<p>$|A \cup B \cup C| = |A| + |B| + |C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|$: add singles, subtract pairs, add triples, and so on, alternating.</p>
<div class="worked"><p>How many integers from 1 to 1000 are divisible by none of 2, 3, 5?</p>
<p>Divisible by at least one: $500 + 333 + 200 - 166 - 100 - 66 + 33 = 734$. So $1000 - 734 = 266$ are divisible by none. (Euler's $\varphi(30) = 8$ of every 30 numbers, $\approx 1000\cdot\tfrac{8}{30} \approx 267$, agrees.)</p></div>
<p><strong>Derangements</strong>: the number of ways $n$ letters can all go into the wrong envelopes is $D_n = n!\left(1 - \dfrac1{1!} + \dfrac1{2!} - \dots + \dfrac{(-1)^n}{n!}\right)$, and $D_n/n! \to 1/e \approx 0.368$: whatever $n$ is, a random shuffle leaves nobody in place about 37% of the time.</p>
<h3 class="sub">Stars and bars</h3>
<p>The number of ways to write $n$ as an ordered sum of $k$ non-negative integers is $\binom{n + k - 1}{k - 1}$: line up $n$ stars and choose where to put $k - 1$ bars. If each part must be at least 1, first give one to each: $\binom{n-1}{k-1}$.</p>
<div class="worked"><p>How many ways can 10 identical sweets be shared among 4 children, each getting at least 2?</p>
<p>Give 2 to each first; share the remaining 2 freely: $\binom{2 + 3}{3} = 10$.</p></div>` },
    3: { html: R`
<h3 class="sub">Linearity of expectation</h3>
<p>$E[X + Y] = E[X] + E[Y]$ even when $X$ and $Y$ are dependent. Combined with <strong>indicator variables</strong> (1 if an event happens, 0 if not, with expectation equal to the event's probability), it solves problems that look impossible.</p>
<div class="worked"><p>$n$ people throw their hats in a box and each takes one at random. How many expect to get their own hat?</p>
<p>Let $X_i = 1$ if person $i$ gets their hat; $E[X_i] = 1/n$. So $E\left[\sum X_i\right] = n\cdot\tfrac1n = 1$, whatever $n$ is, even though the events are far from independent.</p></div>
<div class="worked"><p>How many rolls of a die do you expect until you have seen all six faces?</p>
<p>After seeing $k$ faces, a new one turns up with probability $\tfrac{6 - k}{6}$, so it takes $\tfrac{6}{6 - k}$ rolls on average. Total $6\left(\tfrac16 + \tfrac15 + \tfrac14 + \tfrac13 + \tfrac12 + 1\right) = 14.7$: the coupon collector's problem.</p></div>
<h3 class="sub">Geometric probability and symmetry</h3>
<p>When outcomes are points chosen uniformly in a region, probability is a ratio of lengths or areas. Two friends each arrive at a random time between 1 and 2 pm and wait 15 minutes for each other: in the unit square of arrival times they meet when $|x - y| \le \tfrac14$, an area of $1 - \left(\tfrac34\right)^2 = \tfrac7{16}$. Symmetry arguments often shortcut calculation: in a random shuffle, the ace of spades is equally likely to be in any position.</p>` }
  });

  /* ---------------- Recurrences ---------------- */
  X('math-recurrences', {
    0: { html: R`
<h3 class="sub">Finding the recurrence</h3>
<p>Many counting problems become easy once you ask: <em>how does a solution of size $n$ end?</em> Each possible ending reduces to a smaller problem.</p>
<div class="worked"><p>How many ways can a $2\times n$ strip be tiled with $1\times2$ dominoes?</p>
<p>Look at the left end: either one vertical domino (leaving $2\times(n - 1)$) or two horizontal ones stacked (leaving $2\times(n - 2)$). So $T_n = T_{n-1} + T_{n-2}$ with $T_1 = 1$, $T_2 = 2$: Fibonacci numbers. $T_{10} = 89$.</p></div>
<div class="worked"><p>How many binary strings of length $n$ contain no two consecutive 1s? How many subsets of $\{1, \dots, n\}$ contain no two consecutive numbers?</p>
<p>A valid string ends in 0 (after any valid string of length $n - 1$) or in 01 (after any valid string of length $n - 2$): $a_n = a_{n-1} + a_{n-2}$, $a_1 = 2$, $a_2 = 3$, Fibonacci again. Subsets correspond to strings (1 = chosen), so the answer is the same.</p></div>
<p>Other classics: the Tower of Hanoi ($M_n = 2M_{n-1} + 1$), regions cut by lines ($R_n = R_{n-1} + n$), and the number of ways to climb stairs taking 1, 2 or 3 steps ($a_n = a_{n-1} + a_{n-2} + a_{n-3}$).</p>` },
    1: { html: R`
<h3 class="sub">The characteristic equation</h3>
<p>For $a_n = pa_{n-1} + qa_{n-2}$, try $a_n = r^n$: you get $r^2 = pr + q$. If its roots $r_1 \ne r_2$, then $a_n = Ar_1^n + Br_2^n$, with $A, B$ from the first two terms. A repeated root $r$ gives $a_n = (A + Bn)r^n$. This mirrors linear differential equations exactly, with $r^n$ in place of $e^{\lambda x}$.</p>
<div class="worked"><p>Derive Binet's formula for the Fibonacci numbers.</p>
<p>$r^2 = r + 1$ gives $r = \varphi = \frac{1 + \sqrt5}2$ and $\psi = \frac{1 - \sqrt5}{2}$. With $F_0 = 0$, $F_1 = 1$: $A + B = 0$ and $A\varphi + B\psi = 1$, so $A = 1/\sqrt5$. Hence $F_n = \dfrac{\varphi^n - \psi^n}{\sqrt5}$. Since $|\psi| < 1$, $F_n$ is the nearest integer to $\varphi^n/\sqrt5$, and $F_{n+1}/F_n \to \varphi$.</p></div>
<h3 class="sub">Non-homogeneous recurrences</h3>
<p>For $a_n = pa_{n-1} + qa_{n-2} + f(n)$, add a particular solution of the same shape as $f$ to the general solution above. For $a_n = 2a_{n-1} + 1$, try a constant $c$: $c = 2c + 1$, $c = -1$, so $a_n = A2^n - 1$, which is the Hanoi formula $2^n - 1$ when $a_1 = 1$.</p>` },
    2: { html: R`
<h3 class="sub">One number, many objects</h3>
<p>The Catalan numbers $1, 1, 2, 5, 14, 42, 132, \dots$, $C_n = \dfrac{1}{n + 1}\binom{2n}{n}$, count a remarkable range of things:</p>
<ul><li>balanced strings of $n$ pairs of brackets;</li><li>ways to triangulate a convex $(n + 2)$-gon;</li><li>full binary trees with $n + 1$ leaves (ways to bracket a product of $n + 1$ factors);</li><li>lattice paths from $(0, 0)$ to $(n, n)$ that never go above the diagonal;</li><li>ways $2n$ people at a round table can shake hands in pairs without crossing arms.</li></ul>
<p>They all satisfy $C_{n+1} = \sum_{k=0}^{n}C_kC_{n-k}$: split by what the first bracket encloses.</p>
<div class="worked"><p>Why $\frac{1}{n + 1}\binom{2n}n$? The reflection argument.</p>
<p>All paths from $(0, 0)$ to $(n, n)$: $\binom{2n}n$. A bad path first touches the line $y = x + 1$ somewhere; reflect the rest of it in that line, and it ends at $(n - 1, n + 1)$. This is a bijection, so there are $\binom{2n}{n-1}$ bad paths, and $\binom{2n}n - \binom{2n}{n-1} = \dfrac{1}{n + 1}\binom{2n}{n}$.</p></div>` },
    3: { html: R`
<h3 class="sub">Generating functions as a toolkit</h3>
<p>Encode a sequence as the coefficients of a power series $G(x) = \sum a_nx^n$. Operations on sequences become algebra on $G$: shifting multiplies by $x$, partial sums divide by $1 - x$, and a product $A(x)B(x)$ produces the convolution $\sum_k a_kb_{n-k}$.</p>
<div class="worked"><p>In how many ways can you pay 50p with 5p, 10p and 20p coins?</p>
<p>The answer is the coefficient of $x^{50}$ in $\dfrac{1}{(1 - x^5)(1 - x^{10})(1 - x^{20})}$: each factor $1 + x^c + x^{2c} + \dots$ chooses how many of one coin. To extract it by hand: with $k$ 20p coins ($k = 0, 1, 2$), the remaining $50 - 20k$ is paid with 10p and 5p coins in $\lfloor(50 - 20k)/10\rfloor + 1$ ways, giving $6 + 4 + 2 = 12$.</p></div>
<p>Solving recurrences: for Fibonacci, $F(x) - xF(x) - x^2F(x) = x$, so $F(x) = \dfrac{x}{1 - x - x^2}$; partial fractions give Binet's formula again. For Catalan, $C(x) = 1 + xC(x)^2$, a quadratic: $C(x) = \dfrac{1 - \sqrt{1 - 4x}}{2x}$, and the binomial series yields $C_n$. Partition problems ("how many ways to write $n$ as a sum") are where generating functions are irreplaceable: Euler proved that partitions into distinct parts and into odd parts are equinumerous by showing their generating functions are equal.</p>` }
  });

  /* ---------------- Inequalities ---------------- */
  X('math-inequalities', {
    0: { html: R`
<h3 class="sub">Completing the square and sums of squares</h3>
<p>Every inequality proof ends by showing something is non-negative, and the surest non-negative things are squares. Rewrite the difference of the two sides as a sum of squares and you are done.</p>
<div class="worked"><p>Prove $a^2 + b^2 + c^2 \ge ab + bc + ca$ for all real $a, b, c$.</p>
<p>Twice the difference is $(a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$, with equality only when $a = b = c$. ∎</p></div>
<p>Completing the square finds extremes of quadratics: $x^2 - 6x + 13 = (x - 3)^2 + 4 \ge 4$. The discriminant gives another route: if a quadratic $ax^2 + bx + c$ with $a > 0$ is never negative, then $b^2 \le 4ac$; this is how Cauchy–Schwarz is proved.</p>
<h3 class="sub">Rules for manipulating inequalities</h3>
<p>You may add inequalities that point the same way, multiply both sides by a <em>positive</em> number, and apply increasing functions (like $\sqrt{\ }$ on non-negatives, or $\ln$ on positives). Multiplying by a negative reverses the sign; squaring is only safe when both sides are non-negative. Always state the equality case: it is the hint that your argument is sharp.</p>` },
    1: { html: R`
<h3 class="sub">AM–GM in action</h3>
<p>For non-negative reals, $\dfrac{x_1 + \dots + x_n}{n} \ge \sqrt[n]{x_1\cdots x_n}$, with equality exactly when all are equal. Use it to bound a sum below by a product (or a product above by a sum); the trick is to split terms so that the product becomes constant.</p>
<div class="worked"><p>Find the minimum of $x + \dfrac{4}{x}$ for $x > 0$, and of $x^2 + \dfrac{16}{x}$ for $x > 0$.</p>
<p>First: $x + \frac4x \ge 2\sqrt{4} = 4$, equality at $x = 2$.</p>
<p>Second: split $\frac{16}x = \frac8x + \frac8x$ so the product is constant: $x^2 + \frac8x + \frac8x \ge 3\sqrt[3]{64} = 12$, equality when $x^2 = 8/x$, $x = 2$.</p></div>
<p>A two-line proof of the two-variable case: $(\sqrt a - \sqrt b)^2 \ge 0$ expands to $a + b \ge 2\sqrt{ab}$. The general case follows by Cauchy's forward–backward induction, or from Jensen's inequality for $\ln$. Among rectangles with fixed perimeter the square has the most area; among boxes with fixed surface, the cube has the most volume: AM–GM in disguise.</p>
<p>The full chain of means for positive numbers: harmonic $\le$ geometric $\le$ arithmetic $\le$ quadratic (root-mean-square).</p>` },
    2: { html: R`
<h3 class="sub">Using Cauchy–Schwarz</h3>
<p>$(a_1b_1 + \dots + a_nb_n)^2 \le (a_1^2 + \dots + a_n^2)(b_1^2 + \dots + b_n^2)$, with equality when the vectors $\mathbf a$ and $\mathbf b$ are proportional. In vector form, $|\mathbf a\cdot\mathbf b| \le |\mathbf a||\mathbf b|$, which is just $|\cos\theta| \le 1$.</p>
<div class="worked"><p>If $x + 2y + 2z = 9$, find the minimum of $x^2 + y^2 + z^2$.</p>
<p>$81 = (x + 2y + 2z)^2 \le (1 + 4 + 4)(x^2 + y^2 + z^2)$, so the minimum is 9, at $(x, y, z) = (1, 2, 2)$. Geometrically: the squared distance from the origin to a plane.</p></div>
<h3 class="sub">The Engel (Titu) form</h3>
<p>$\dfrac{a_1^2}{b_1} + \dots + \dfrac{a_n^2}{b_n} \ge \dfrac{(a_1 + \dots + a_n)^2}{b_1 + \dots + b_n}$ for positive $b_i$. It handles sums of fractions elegantly.</p>
<div class="worked"><p>Prove Nesbitt's inequality: for positive $a, b, c$, $\dfrac{a}{b + c} + \dfrac{b}{c + a} + \dfrac{c}{a + b} \ge \dfrac32$.</p>
<p>Write each term as $\dfrac{a^2}{a(b + c)}$. By Engel, the sum is at least $\dfrac{(a + b + c)^2}{2(ab + bc + ca)} \ge \dfrac32$, the last step being $a^2 + b^2 + c^2 \ge ab + bc + ca$ from the first section. ∎</p></div>` },
    3: { html: R`
<h3 class="sub">Rearrangement and Chebyshev</h3>
<p>If two lists are sorted the same way, pairing big with big maximises the sum of products, and pairing big with small minimises it. Example: $a^3 + b^3 + c^3 \ge a^2b + b^2c + c^2a$ for positive $a, b, c$, because $(a^2, b^2, c^2)$ and $(a, b, c)$ are sorted alike.</p>
<h3 class="sub">Convexity and Jensen</h3>
<p>A function is <strong>convex</strong> if its graph bends upwards ($f'' \ge 0$): every chord lies above the curve. <strong>Jensen's inequality</strong> says $f\left(\dfrac{x_1 + \dots + x_n}{n}\right) \le \dfrac{f(x_1) + \dots + f(x_n)}{n}$ for convex $f$, reversed for concave $f$.</p>
<div class="worked"><p>Show that in any triangle $\sin A + \sin B + \sin C \le \dfrac{3\sqrt3}{2}$.</p>
<p>$\sin$ is concave on $[0, \pi]$, so the average of the three sines is at most $\sin\left(\dfrac{A + B + C}{3}\right) = \sin60^\circ = \dfrac{\sqrt3}2$. Equality for the equilateral triangle. ∎</p></div>
<h3 class="sub">Strategy</h3>
<ol><li>Find the equality case first (often all variables equal, or one variable zero); your steps must all be equalities there.</li><li>Use constraints to normalise (assume $a + b + c = 1$ for homogeneous inequalities).</li><li>Try the standard tools in order: squares, AM–GM, Cauchy–Schwarz, Jensen.</li><li>If all else fails, assume an ordering $a \ge b \ge c$ and expand.</li></ol>` }
  });

  /* ---------------- Polynomials and functional equations ---------------- */
  X('math-algebra', {
    0: { html: R`
<h3 class="sub">Division and the factor theorem</h3>
<p>Any polynomial $P$ divided by $D$ leaves a quotient $Q$ and a remainder $R$ of lower degree: $P = DQ + R$. Dividing by $(x - a)$ leaves a constant remainder, and putting $x = a$ shows it equals $P(a)$ (the <strong>remainder theorem</strong>). So $P(a) = 0$ exactly when $(x - a)$ is a factor.</p>
<div class="worked"><p>Find the remainder when $P(x) = x^{100} + x + 1$ is divided by $x^2 - 1$.</p>
<p>The remainder is linear, $ax + b$, and $P(x) = (x^2 - 1)Q(x) + ax + b$. Put $x = 1$: $3 = a + b$. Put $x = -1$: $1 = -a + b$. So $a = 1$, $b = 2$: remainder $x + 2$.</p></div>
<h3 class="sub">Rational roots and integer polynomials</h3>
<p>If $p/q$ in lowest terms is a root of a polynomial with integer coefficients, then $p$ divides the constant term and $q$ divides the leading coefficient. For $2x^3 - 3x^2 - 11x + 6$ the candidates are $\pm1, \pm2, \pm3, \pm6, \pm\tfrac12, \pm\tfrac32$; testing gives the roots $3, -2, \tfrac12$.</p>
<p>A useful fact for olympiads: for integer polynomials, $a - b$ divides $P(a) - P(b)$. So if $P(1) = 3$ and $P(5) = 9$, nothing is wrong, but a polynomial with $P(2) = 5$ and $P(6) = 8$ cannot have integer coefficients, since 4 does not divide 3.</p>` },
    1: { html: R`
<h3 class="sub">Vieta for any degree</h3>
<p>If $ax^3 + bx^2 + cx + d$ has roots $r, s, t$, expanding $a(x - r)(x - s)(x - t)$ shows</p>
<div class="key"><p>$r + s + t = -\dfrac ba,\quad rs + st + tr = \dfrac ca,\quad rst = -\dfrac da$.</p></div>
<p>The pattern continues: for degree $n$, the $k$th elementary symmetric sum of the roots is $(-1)^k$ times the coefficient of $x^{n-k}$, divided by the leading coefficient.</p>
<div class="worked"><p>The roots of $x^3 - 6x^2 + 11x - 6 = 0$ are $r, s, t$. Find $r^2 + s^2 + t^2$ and $\frac1r + \frac1s + \frac1t$.</p>
<p>$r + s + t = 6$, $rs + st + tr = 11$, $rst = 6$. Then $r^2 + s^2 + t^2 = 36 - 22 = 14$ and $\frac1r + \frac1s + \frac1t = \frac{11}{6}$. (The roots are 1, 2, 3, which confirms both.)</p></div>
<p>Vieta works backwards too: two numbers with sum $S$ and product $P$ are the roots of $x^2 - Sx + P = 0$. It also builds polynomials with transformed roots: replace $x$ by $x/2$ to double all roots, or by $1/x$ (and clear denominators) to invert them.</p>` },
    2: { html: R`
<h3 class="sub">Power sums and Newton's identities</h3>
<p>Any symmetric polynomial in the roots can be written in terms of the elementary symmetric sums $e_1 = \sum r$, $e_2 = \sum rs$, $e_3 = rst$. For power sums $p_k = r^k + s^k + t^k$ there is a recurrence (Newton's identities): since each root satisfies $x^3 = e_1x^2 - e_2x + e_3$,</p>
$$p_{k} = e_1p_{k-1} - e_2p_{k-2} + e_3p_{k-3}.$$
<div class="worked"><p>If $a + b + c = 0$, show that $a^3 + b^3 + c^3 = 3abc$, and find $a^5 + b^5 + c^5$ in terms of $ab + bc + ca = q$ and $abc = r$.</p>
<p>$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 0$.</p>
<p>With $e_1 = 0$: $p_1 = 0$, $p_2 = -2q$, $p_3 = 3r$, $p_4 = -qp_2 = 2q^2$, $p_5 = -qp_3 + rp_2 = -5qr$.</p></div>
<p>Substitutions like $s = x + y$, $p = xy$ reduce symmetric systems in two unknowns: $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$.</p>` },
    3: { html: R`
<h3 class="sub">A checklist for functional equations</h3>
<ol><li><strong>Substitute</strong> special values: $x = 0$, $y = 0$, $x = y$, $y = -x$, $y = 1$.</li>
<li><strong>Guess</strong> the answer (usually linear, constant, $x^2$ or $1/x$) and check it, so you know what you are aiming for.</li>
<li>Prove <strong>injectivity</strong> ($f(a) = f(b) \Rightarrow a = b$) or <strong>surjectivity</strong> to unlock cancellations.</li>
<li>On the integers or rationals, use <strong>induction</strong> from the values found.</li>
<li>Always verify that your answers satisfy the original equation.</li></ol>
<div class="worked"><p>Find all $f:\mathbb R\to\mathbb R$ with $f(x) + 2f(1 - x) = x^2$ for all $x$.</p>
<p>Replace $x$ by $1 - x$: $f(1 - x) + 2f(x) = (1 - x)^2$. Now we have two linear equations in the two unknowns $f(x)$ and $f(1 - x)$. Doubling the second and subtracting the first: $3f(x) = 2(1 - x)^2 - x^2$, so $f(x) = \dfrac{x^2 - 4x + 2}{3}$. Check: $f(x) + 2f(1 - x) = \frac13\big[(x^2 - 4x + 2) + 2(x^2 + 2x - 1)\big] = x^2$. ✓</p></div>
<p><strong>Cauchy's equation</strong> $f(x + y) = f(x) + f(y)$ forces $f(x) = cx$ on the rationals; on the reals it needs an extra condition such as continuity, monotonicity or boundedness on an interval.</p>` }
  });

  /* ---------------- Olympiad geometry ---------------- */
  X('math-geometry', {
    0: { html: R`
<h3 class="sub">Angle chasing and cyclic quadrilaterals</h3>
<p>The <strong>inscribed angle theorem</strong> (an angle at the circumference is half the angle at the centre on the same arc) has corollaries used constantly: angles in the same segment are equal, the angle in a semicircle is $90^\circ$, and the angle between a tangent and a chord equals the inscribed angle on the other side (the <strong>alternate segment theorem</strong>).</p>
<div class="key"><p>Four points $A, B, C, D$ lie on a circle (are <strong>concyclic</strong>) if and only if $\angle ABD = \angle ACD$, or equivalently, for a convex quadrilateral $ABCD$, opposite angles sum to $180^\circ$.</p></div>
<div class="worked"><p>In triangle $ABC$ the altitudes $BE$ and $CF$ meet at $H$. Show that $A, E, H, F$ are concyclic and that $B, C, E, F$ are concyclic.</p>
<p>$\angle AEH = \angle AFH = 90^\circ$, so in $AEHF$ opposite angles sum to $180^\circ$. And $\angle BEC = \angle BFC = 90^\circ$, so $E$ and $F$ lie on the circle with diameter $BC$. Spotting such hidden circles is the main skill of angle chasing.</p></div>
<p>Write down every angle in terms of a few variables (often the angles $A, B, C$ of the triangle) and look for equal pairs.</p>` },
    1: { html: R`
<h3 class="sub">Similarity and ratios</h3>
<p>Two triangles are similar if two angles match (AA), or the sides are in proportion (SSS), or two sides are in proportion with the included angle equal (SAS). Similar triangles give equal ratios of corresponding sides, and areas in the square of the ratio.</p>
<div class="key"><p><strong>Angle bisector theorem:</strong> the bisector from $A$ meets $BC$ at $D$ with $\dfrac{BD}{DC} = \dfrac{AB}{AC}$.<br><strong>Ceva:</strong> cevians $AD, BE, CF$ are concurrent iff $\dfrac{BD}{DC}\cdot\dfrac{CE}{EA}\cdot\dfrac{AF}{FB} = 1$.<br><strong>Menelaus:</strong> $D, E, F$ on the (extended) sides are collinear iff the same product is $-1$ (with signed lengths).</p></div>
<div class="worked"><p>Prove that the three medians of a triangle meet at one point, two-thirds of the way along each.</p>
<p>For medians, each ratio is 1, so Ceva gives concurrency at the <strong>centroid</strong> $G$. The segment joining the midpoints of $AB$ and $AC$ is parallel to $BC$ and half as long (similar triangles), which gives the 2:1 ratio. In vectors, $G = \frac13(A + B + C)$.</p></div>
<p>Pythagoras generalises: the cosine rule for any triangle, and <strong>Stewart's theorem</strong> for the length of a cevian; for a median, $m_a^2 = \dfrac{2b^2 + 2c^2 - a^2}{4}$.</p>` },
    2: { html: R`
<h3 class="sub">Power, radical axes and tangents</h3>
<p>The <strong>power</strong> of a point $P$ with respect to a circle with centre $O$ and radius $r$ is $|PO|^2 - r^2$. For any line through $P$ meeting the circle at $A$ and $B$, $PA\cdot PB$ equals the power (with sign: negative inside). For a tangent from outside, $PT^2$ is the power.</p>
<div class="worked"><p>From a point 13 cm from the centre of a circle of radius 5, how long is a tangent? A chord through a point 3 cm from the centre is split into two pieces; one is 2 cm, how long is the other?</p>
<p>$PT^2 = 169 - 25 = 144$, $PT = 12$ cm.</p>
<p>Inside, $PA\cdot PB = r^2 - d^2 = 25 - 9 = 16$, so the other piece is 8 cm.</p></div>
<p>The points with equal power with respect to two circles form a straight line, the <strong>radical axis</strong>; for intersecting circles it is the line through their common points. The three radical axes of three circles meet at a single point, the <strong>radical centre</strong>, which settles many concurrency problems.</p>` },
    3: { html: R`
<h3 class="sub">The four classical centres</h3>
<ul><li><strong>Centroid</strong> $G$: meet of the medians; the balance point.</li>
<li><strong>Circumcentre</strong> $O$: meet of the perpendicular bisectors; centre of the circle through $A, B, C$, radius $R = \dfrac{a}{2\sin A}$.</li>
<li><strong>Incentre</strong> $I$: meet of the angle bisectors; centre of the inscribed circle, radius $r = \dfrac{\text{area}}{s}$ with $s$ the semi-perimeter.</li>
<li><strong>Orthocentre</strong> $H$: meet of the altitudes.</li></ul>
<p>$O$, $G$ and $H$ always lie on one line, the <strong>Euler line</strong>, with $OG : GH = 1 : 2$. The midpoints of the sides, the feet of the altitudes and the midpoints of $AH, BH, CH$ all lie on one circle, the <strong>nine-point circle</strong>, of radius $R/2$ (lab: Euler line).</p>
<div class="worked"><p>A triangle has sides 13, 14, 15. Find its area, inradius and circumradius.</p>
<p>Heron: $s = 21$, area $= \sqrt{21\cdot8\cdot7\cdot6} = 84$. $r = 84/21 = 4$. $R = \dfrac{abc}{4\cdot\text{area}} = \dfrac{2730}{336} = 8.125$. Euler's formula $OI^2 = R(R - 2r) = 8.125\cdot0.125$ also shows $R \ge 2r$ for every triangle.</p></div>
<h3 class="sub">Coordinates, vectors and complex numbers</h3>
<p>When synthetic insight fails, compute. Put the circumcircle as the unit circle in the complex plane: then $H = a + b + c$, and many statements become polynomial identities. It is laborious but reliable, and olympiad markers accept a correct computation as a proof.</p>` }
  });

  /* ---------------- Graph theory ---------------- */
  X('math-graphs', {
    0: { html: R`
<h3 class="sub">The handshake lemma and its consequences</h3>
<p>Adding up all the degrees counts every edge twice: $\sum \deg v = 2|E|$. So the sum of degrees is even, and the number of vertices of odd degree is even.</p>
<div class="worked"><p>Can 9 people each shake hands with exactly 3 others?</p>
<p>The degree sum would be $27$, which is odd: impossible. (With 10 people it is possible.)</p></div>
<p>Vocabulary: a <strong>path</strong> visits distinct vertices; a <strong>cycle</strong> returns to its start; a graph is <strong>connected</strong> if any two vertices are joined by a path; the <strong>complete graph</strong> $K_n$ has all $\binom n2$ edges; a graph is <strong>bipartite</strong> if its vertices split into two groups with edges only between groups, which happens exactly when it has no odd cycle.</p>
<p>In any graph with $n \ge 2$ vertices, two vertices have the same degree: degrees range over $0..n-1$, but 0 and $n - 1$ cannot both occur, leaving $n - 1$ values for $n$ vertices (pigeonhole).</p>` },
    1: { html: R`
<h3 class="sub">Euler trails and Hamilton cycles</h3>
<p>A connected graph has an <strong>Euler circuit</strong> (using every edge once and returning home) exactly when every degree is even, and an <strong>Euler trail</strong> exactly when 0 or 2 vertices have odd degree; the trail must start and end at those two. Königsberg's four land masses all had odd degree, so no walk could cross each of its seven bridges once.</p>
<div class="worked"><p>Can you draw the "house" (a square with a triangular roof and both diagonals of the square) without lifting your pen or retracing a line?</p>
<p>The two bottom corners have degree 3 and all other vertices even degree: exactly two odd vertices, so yes, but you must start at one bottom corner and finish at the other.</p></div>
<p>A <strong>Hamilton cycle</strong> visits every <em>vertex</em> once. It looks similar but is far harder: no simple test is known, and deciding whether one exists is NP-complete, the same difficulty class as the travelling salesman problem. A useful sufficient condition is <strong>Dirac's theorem</strong>: if every vertex has degree at least $n/2$, a Hamilton cycle exists.</p>` },
    2: { html: R`
<h3 class="sub">Trees</h3>
<p>A <strong>tree</strong> is a connected graph with no cycles. The following are equivalent for a graph with $n$ vertices: it is a tree; it is connected with $n - 1$ edges; it has no cycles and $n - 1$ edges; any two vertices are joined by exactly one path. Every tree with at least two vertices has at least two <strong>leaves</strong> (degree 1), which makes induction on trees easy: remove a leaf.</p>
<p><strong>Cayley's formula</strong>: there are $n^{n-2}$ labelled trees on $n$ vertices (16 for $n = 4$). Every connected graph contains a <strong>spanning tree</strong>, and the cheapest one (the minimum spanning tree) is found greedily by Kruskal's algorithm.</p>
<h3 class="sub">Planar graphs and Euler's formula</h3>
<p>A connected planar drawing with $V$ vertices, $E$ edges and $F$ faces (counting the outside) satisfies</p>
<div class="key"><p>$V - E + F = 2.$</p></div>
<div class="worked"><p>Show that $K_5$ is not planar.</p>
<p>In a simple planar graph every face has at least 3 edges and every edge borders at most 2 faces, so $3F \le 2E$. With Euler's formula this gives $E \le 3V - 6$. $K_5$ has $V = 5$, $E = 10 > 9$. ∎ The same argument with 4-cycles shows $K_{3,3}$ (three houses, three utilities) is not planar.</p></div>
<p>Applied to a convex polyhedron, Euler's formula shows there are exactly five Platonic solids.</p>` },
    3: { html: R`
<h3 class="sub">Colouring</h3>
<p>The <strong>chromatic number</strong> is the fewest colours needed so that adjacent vertices differ. A graph whose largest degree is $\Delta$ can always be coloured with $\Delta + 1$ colours by colouring greedily. Bipartite graphs need only 2. The <strong>four colour theorem</strong> says every planar map needs at most 4; it was the first major theorem proved with a computer (1976). Scheduling exams without clashes is a colouring problem: subjects are vertices, students taking both are edges, time slots are colours.</p>
<h3 class="sub">Ramsey theory: complete disorder is impossible</h3>
<p>Colour each edge of $K_6$ red or blue: there is always a single-coloured triangle. From any vertex five edges leave, so three share a colour, say red, to $A, B, C$. If any edge among $A, B, C$ is red, it makes a red triangle; otherwise $ABC$ is blue. $K_5$ can avoid it (a red pentagon with a blue pentagram), so $R(3, 3) = 6$.</p>
<div class="worked"><p>Why is $R(4, 4) \le 20$? (The true value is 18.)</p>
<p>The recursion $R(s, t) \le R(s - 1, t) + R(s, t - 1)$ gives $R(3, 4) \le R(2, 4) + R(3, 3) = 4 + 6 = 10$ and $R(4, 4) \le 2R(3, 4) \le 20$. Erdős joked that if aliens demanded $R(5, 5)$ we should all start computing, but for $R(6, 6)$ we should attack them.</p></div>` }
  });

  /* ---------------- Games, invariants and strategy ---------------- */
  X('math-games', {
    0: { html: R`
<h3 class="sub">P-positions and N-positions</h3>
<p>In a finite game where the player who cannot move loses (normal play), every position is either a <strong>P-position</strong> (the Previous player, who just moved, wins: the player to move loses) or an <strong>N-position</strong> (the Next player wins). The rules:</p>
<div class="key"><p>A terminal position is P. A position is N if <em>some</em> move leads to a P-position. A position is P if <em>every</em> move leads to an N-position.</p></div>
<div class="worked"><p>A pile has $n$ counters; a move removes 1, 3 or 4. Which $n$ are losing for the player to move?</p>
<p>Work upwards: 0 is P; 1 (to 0), 3, 4 are N; 2 (only to 1) is P; 5 (to 4, 2, 1: 2 is P) is N, 6 (to 5, 3, 2) is N, 7 (to 6, 4, 3: all N) is P, 8 (to 7) is N, 9 (to 8, 6, 5: all N) is P. The pattern repeats with period 7: P-positions are $n \equiv 0, 2 \pmod 7$.</p></div>
<p>Tabulating small cases and spotting the period is the standard attack for subtraction games.</p>` },
    1: { html: R`
<h3 class="sub">Why the nim-sum works</h3>
<p>Write the pile sizes in binary and XOR them (add each column without carrying). Bouton's theorem: the position is a P-position exactly when the nim-sum is 0. Two facts make it work: from nim-sum 0, any move changes exactly one pile and so changes the nim-sum to non-zero; from a non-zero nim-sum, there is always a move back to zero (take the pile that has a 1 in the leftmost column of the nim-sum, and reduce it to that pile XOR the nim-sum).</p>
<div class="worked"><p>Piles of 3, 5 and 7. Is the first player winning? If so, what is the winning move?</p>
<p>$011 \oplus 101 \oplus 111 = 001$: non-zero, so the first player wins. The leftmost 1 of the nim-sum is in the units column; 3 has a 1 there, and $3 \oplus 1 = 2$. Take one counter from the pile of 3, leaving $2 \oplus 5 \oplus 7 = 0$. (Reducing 5 to 4 or 7 to 6 also works.)</p></div>
<h3 class="sub">Sprague–Grundy</h3>
<p>Every impartial game position is equivalent to a nim pile of some size, its <strong>Grundy value</strong>: the smallest non-negative integer not among the values of the positions you can move to (the mex). A sum of games (you move in one component each turn) has Grundy value equal to the XOR of the components' values. This turns any combination of games into nim.</p>` },
    2: { html: R`
<h3 class="sub">Copycat strategies</h3>
<p>If the board has a symmetry, the second player may win by mirroring every move; the first player may win by making a central move first and mirroring afterwards. You must check that the mirrored move is always legal.</p>
<div class="worked"><p>Two players take turns placing coins (all the same size) on a round table without overlapping. The player who cannot place a coin loses. Who wins?</p>
<p>The first player: place the first coin exactly at the centre, then answer every coin with one diametrically opposite. By symmetry the opposite spot is always free, so the first player always has a move.</p></div>
<h3 class="sub">Strategy stealing</h3>
<p>To show the first player wins without finding the strategy: suppose the second player had a winning strategy. The first player makes an arbitrary move, then follows that strategy as if they were second. An extra piece never hurts in games like Hex or Chomp, so the first player wins, contradicting the assumption. In <strong>Chomp</strong> (eat squares from a chocolate grid; the one who takes the poisoned corner loses), the first player wins on every rectangle larger than $1\times1$, yet no general winning strategy is known.</p>` },
    3: { html: R`
<h3 class="sub">Colouring arguments</h3>
<p>Colour the board so that every allowed piece covers a fixed pattern of colours, then count. The mutilated chessboard uses two colours; harder problems use more.</p>
<div class="worked"><p>Can an $8\times8$ board with one corner removed be tiled by $1\times3$ trominoes?</p>
<p>63 squares is divisible by 3, so plain counting does not forbid it. Colour square $(i, j)$, with $0 \le i, j \le 7$, by $(i + j) \bmod 3$. Every straight tromino covers one square of each colour. Counting, the full board has 21 squares of colour 0, 22 of colour 1 and 21 of colour 2. A tiling of 63 squares by 21 trominoes needs exactly 21 of each colour, so the missing square must have colour 1. The corner $(0, 0)$ has colour 0: no tiling exists. (Using the second colouring $(i - j) \bmod 3$ as well shows only four squares can be removed: those at $(2, 2), (2, 5), (5, 2), (5, 5)$.)</p></div>
<h3 class="sub">Monovariants force termination</h3>
<p>To show a process must stop, find a quantity that strictly decreases at every step and is a non-negative integer: it cannot decrease for ever.</p>
<div class="worked"><p>In a parliament, each member has at most three enemies. Show the members can be split into two houses so that everyone has at most one enemy in their own house.</p>
<p>Start with any split and let $E$ be the number of enemy pairs in the same house. If someone has two or more enemies in their house, move them: they had at most one enemy in the other house, so $E$ drops by at least 1. $E$ is a non-negative integer, so the moves stop, and when they stop everyone is satisfied. ∎</p></div>` }
  });

  /* ---------------- Diophantine equations ---------------- */
  X('math-diophantine', {
    0: { html: R`
<h3 class="sub">Solving ax + by = c completely</h3>
<p>$ax + by = c$ has integer solutions exactly when $d = \gcd(a, b)$ divides $c$. Find one solution $(x_0, y_0)$ with the extended Euclidean algorithm; then all solutions are</p>
<div class="key"><p>$x = x_0 + \dfrac{b}{d}t,\quad y = y_0 - \dfrac{a}{d}t,\quad t \in \mathbb Z.$</p></div>
<div class="worked"><p>A shop sells pens at 7p and pencils at 11p. In how many ways can you spend exactly £1 (100p)?</p>
<p>$7x + 11y = 100$. From $1 = 8\cdot7 - 5\cdot11$: $x_0 = 800$, $y_0 = -500$. General: $x = 800 + 11t$, $y = -500 - 7t$. Non-negative needs $t \ge -72.7$ and $t \le -71.4$, so $t = -72$: $x = 8$, $y = 4$ ($56 + 44 = 100$). Exactly one way.</p></div>
<h3 class="sub">The Frobenius coin problem</h3>
<p>With coprime coin values $a$ and $b$, the largest amount that cannot be paid is $ab - a - b$, and exactly $\frac{(a - 1)(b - 1)}{2}$ amounts cannot be paid. With 3p and 5p stamps: 7 is the largest impossible amount, and 1, 2, 4, 7 are the four impossible ones.</p>` },
    1: { html: R`
<h3 class="sub">The parametrisation and where it comes from</h3>
<p>Every <strong>primitive</strong> Pythagorean triple (with no common factor) is $(m^2 - n^2, 2mn, m^2 + n^2)$ with $m > n > 0$, coprime and of opposite parity; all others are multiples. Geometrically: points on the unit circle with rational coordinates correspond to lines through $(-1, 0)$ with rational slope $n/m$, which meet the circle again at $\left(\dfrac{m^2 - n^2}{m^2 + n^2}, \dfrac{2mn}{m^2 + n^2}\right)$.</p>
<div class="worked"><p>List the primitive triples with hypotenuse below 30, and show one leg is always divisible by 3 and one by 4.</p>
<p>$(m, n) = (2, 1): (3, 4, 5)$; $(3, 2): (5, 12, 13)$; $(4, 1): (15, 8, 17)$; $(4, 3): (7, 24, 25)$; $(5, 2): (21, 20, 29)$.</p>
<p>Mod 3, squares are 0 or 1; if neither leg were divisible by 3, $a^2 + b^2 \equiv 2$, not a square. Mod 4 / mod 8: $2mn$ with one of $m, n$ even is divisible by 4.</p></div>
<p>The triples relate to the arithmetic of the Gaussian integers $a + bi$: $c^2 = a^2 + b^2 = (a + bi)(a - bi)$, and $(m + ni)^2 = (m^2 - n^2) + 2mni$. A prime $p$ is a sum of two squares exactly when $p = 2$ or $p \equiv 1 \pmod 4$ (Fermat).</p>` },
    2: { html: R`
<h3 class="sub">Factoring tricks</h3>
<p>Rewrite the equation as a product equal to a constant; then each factor is a divisor of the constant, leaving finitely many cases.</p>
<div class="worked"><p>Find all positive integers with $xy = 2x + 3y$, and all integers with $x^2 - y^2 = 45$.</p>
<p>$xy - 2x - 3y = 0$, add 6: $(x - 3)(y - 2) = 6$. Positive factor pairs: $(1, 6), (2, 3), (3, 2), (6, 1)$, giving $(x, y) = (4, 8), (5, 5), (6, 4), (9, 3)$. (Simon's favourite factoring trick.)</p>
<p>$(x - y)(x + y) = 45$, both factors of the same parity (both odd here): $(1, 45), (3, 15), (5, 9)$ and negatives, giving $(x, y) = (23, 22), (9, 6), (7, 2)$ up to signs.</p></div>
<h3 class="sub">Bounding and modular checks</h3>
<p>Two more weapons: <strong>size</strong> (if one side grows faster, only small cases remain) and <strong>remainders</strong> (pick a modulus where the two sides cannot agree).</p>
<div class="worked"><p>Solve $2^x + 1 = y^2$ and show $x^2 + y^2 = 4z + 3$ has no solutions.</p>
<p>$2^x = (y - 1)(y + 1)$: two powers of 2 differing by 2, so 2 and 4: $y = 3$, $x = 3$.</p>
<p>Squares are 0 or 1 mod 4, so $x^2 + y^2$ is never $\equiv 3 \pmod 4$.</p></div>` },
    3: { html: R`
<h3 class="sub">Fermat's infinite descent</h3>
<p>If every solution would produce a strictly smaller positive solution, there can be none, because positive integers cannot decrease forever. Fermat used this to prove that $x^4 + y^4 = z^2$ (and so $x^4 + y^4 = z^4$) has no positive solutions.</p>
<div class="worked"><p>Show that $x^2 + y^2 = 3z^2$ has no positive integer solutions.</p>
<p>Mod 3: squares are 0 or 1, so $x^2 + y^2 \equiv 0$ forces $3 \mid x$ and $3 \mid y$. Then $9 \mid 3z^2$, so $3 \mid z$. Dividing by 3 gives a smaller solution $(x/3, y/3, z/3)$. Descent: no solutions. ∎</p></div>
<h3 class="sub">Pell's equation</h3>
<p>$x^2 - Dy^2 = 1$ ($D$ not a square) always has infinitely many solutions. Find the smallest $(x_1, y_1)$ (by search or continued fractions); then all are given by $x + y\sqrt D = (x_1 + y_1\sqrt D)^k$.</p>
<div class="worked"><p>Find the next solutions of $x^2 - 2y^2 = 1$ after $(3, 2)$.</p>
<p>$(3 + 2\sqrt2)^2 = 17 + 12\sqrt2$: $(17, 12)$, since $289 - 288 = 1$. Then $(3 + 2\sqrt2)^3 = 99 + 70\sqrt2$. The ratios $3/2, 17/12, 99/70$ approximate $\sqrt2$ superbly. Pell equations also answer "which triangular numbers are perfect squares?": $1, 36, 1225, \dots$</p></div>
<p>Beyond these lie elliptic curves (like $y^2 = x^3 - 2$), whose study led to the proof of Fermat's Last Theorem by Andrew Wiles in 1994.</p>` }
  });
})();
