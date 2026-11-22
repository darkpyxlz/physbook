/* Mathematics 11–13: proof, number theory, counting and probability. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.001 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.001 } : {}, o || {});
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const powmod = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; } return r; };

  /* ===================== 11. Proof ===================== */
  PB.addChapter({
    id: 'math-proof', subject: 'maths', num: 15, part: 'Olympiad Foundations',
    title: 'Proof and Problem-Solving',
    subtitle: R`How to be sure. Logic and direct proof, proof by contradiction, mathematical induction, the pigeonhole principle, invariants and the extremal principle.`,
    big: 'In olympiad mathematics an answer is not enough: you must show it is always true. A handful of proof patterns, used over and over, crack most problems: assume the opposite and find a contradiction, climb a ladder one rung at a time, or count pigeons and holes.',
    goals: ['Distinguish a statement, its converse and its contrapositive', 'Prove by contradiction', 'Prove statements by induction', 'Apply the pigeonhole principle', 'Use invariants and extremal arguments'],
    sections: [
      { title: 'Statements and direct proof', html: R`
<p>A mathematical statement is either true or false. Many have the form "if $P$ then $Q$" ($P \Rightarrow Q$). Its <strong>converse</strong> $Q \Rightarrow P$ is a different statement and may be false: "if $n$ is divisible by 4 then $n$ is even" is true, but its converse is not. The <strong>contrapositive</strong> "if not $Q$ then not $P$" is always equivalent to the original.</p>
<p>A <strong>direct proof</strong> starts from what you know and reasons step by step. <em>Claim: the sum of two odd numbers is even.</em> Write them as $2a + 1$ and $2b + 1$; their sum is $2(a + b + 1)$, which is even. ∎</p>
<p>One <strong>counterexample</strong> is enough to kill a claim that something is always true. "$n^2 + n + 41$ is always prime" survives $n = 0, \dots, 39$, but fails at $n = 40$: $40^2 + 40 + 41 = 41^2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which is the contrapositive of "if it rains, the ground is wet"?`, ['If the ground is wet, it rained', 'If it does not rain, the ground is not wet', 'If the ground is not wet, it did not rain', 'It rains and the ground is wet'], 2, [R`Negate both parts and swap them.`], R`"If the ground is not wet, it did not rain", which is logically the same as the original.`)] },
      { title: 'Proof by contradiction', html: R`
<p>To prove $P$, assume it is false and derive something impossible. The classics:</p>
<p><strong>$\sqrt2$ is irrational.</strong> Suppose $\sqrt2 = p/q$ in lowest terms. Then $p^2 = 2q^2$, so $p^2$ is even, so $p$ is even: $p = 2r$. Then $4r^2 = 2q^2$, so $q^2 = 2r^2$ and $q$ is even too, contradicting "lowest terms". ∎</p>
<p><strong>There are infinitely many primes (Euclid).</strong> Suppose $p_1, \dots, p_n$ were all of them. The number $N = p_1p_2\cdots p_n + 1$ leaves remainder 1 when divided by every $p_i$, so its prime factors are not on the list. Contradiction. ∎</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In the proof that $\sqrt2$ is irrational, the contradiction is that…`, ['$p$ is odd', '$p$ and $q$ are both even, although the fraction was in lowest terms', '$q = 0$', '$\\sqrt2 > 2$'], 1, [R`What did we assume about $p/q$ at the start?`], R`Both turned out even, so $p/q$ was not in lowest terms after all.`)] },
      { title: 'Induction', html: R`
<p>To prove a statement $S(n)$ for every $n \ge 1$, think of dominoes:</p>
<div class="key"><p><strong>Base case:</strong> show $S(1)$ is true.<br><strong>Inductive step:</strong> show that if $S(k)$ is true, then $S(k + 1)$ is true.<br>Then $S(1) \Rightarrow S(2) \Rightarrow S(3) \Rightarrow \cdots$ and every case falls.</p></div>
<p><strong>Example.</strong> $1 + 3 + 5 + \dots + (2n - 1) = n^2$. Base: $1 = 1^2$. Step: if the first $k$ odd numbers sum to $k^2$, adding the next one gives $k^2 + (2k + 1) = (k + 1)^2$. ∎</p>
<div data-fig="0"></div>
<p><strong>Strong induction</strong> assumes all of $S(1), \dots, S(k)$ to prove $S(k + 1)$. It proves, for example, that every integer $n \ge 2$ is a product of primes.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Use the formula $1 + 2 + \dots + n = \tfrac{n(n + 1)}{2}$ (provable by induction) to find $1 + 2 + \dots + 100$.`, 5050, [R`$n = 100$.`], R`$100\cdot101/2 = 5050$, as the young Gauss is said to have found.`)] },
      { title: 'Pigeonhole, invariants and extremes', html: R`
<p><strong>Pigeonhole principle.</strong> If $n + 1$ pigeons sit in $n$ holes, some hole has at least two. Simple, but powerful: among any 13 people, two share a birth month; among any 5 points in a square of side 2, two are within $\sqrt2$ of each other (split it into four unit squares).</p>
<p><strong>Invariants.</strong> Find a quantity that never changes under the allowed moves. Remove two opposite corners from a chessboard: can 31 dominoes cover the remaining 62 squares? Each domino covers one black and one white square, but the removed corners are the same colour, leaving 32 of one colour and 30 of the other. Impossible.</p>
<p><strong>Extremal principle.</strong> Look at the largest, smallest or first example. For instance, in any finite set of points not all on one line, take the pair "point and line through two others" with the smallest positive distance; it leads to a proof that some line passes through exactly two points (Sylvester–Gallai).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A drawer has socks of 3 colours. How many must you take, in the dark, to be sure of a matching pair?`, 4, [R`Worst case: one of each colour first.`], R`3 could all differ, but the 4th must match one of them: 4.`)] }
    ],
    figures: [
      { s: 2, title: 'Odd numbers build squares', caption: 'Each new L-shaped layer adds the next odd number, 2k + 1, turning a k × k square into a (k + 1) × (k + 1) one: the inductive step as a picture.', params: { picFrac: 1, aspect: 0.4, controls: [S('n', 'n', 1, 10, 1, 5)],
        draw: (ctx, Cc, v, b, U) => { const s = Math.min((b.h - 30) / v.n, 34), ox = b.x + (b.w - s * v.n) / 2, oy = b.y + 10; const cols = [Cc.accent, Cc.rust, Cc.teal, Cc.points, Cc.good]; for (let i = 0; i < v.n; i++) for (let j = 0; j < v.n; j++) { const layer = Math.max(i, j); ctx.fillStyle = U.alpha(cols[layer % cols.length], 0.75); ctx.fillRect(ox + i * s + 1, oy + j * s + 1, s - 2, s - 2); } U.text(ctx, Array.from({ length: v.n }, (_, k) => 2 * k + 1).join(' + ') + ' = ' + v.n * v.n, b.x + b.w / 2, oy + v.n * s + 18, Cc.ink, U.ui(13, 700), 'center'); } } }
    ],
    labs: [
      { sim: 'explore', title: 'The Collatz game', desc: 'Start at n. If it is even, halve it; if odd, take 3n + 1. Every starting number ever tried reaches 1, but nobody can prove it must. The plot shows the path.',
        tasks: ['Try n = 27. How many steps, and how high does it climb?', 'Find a number below 100 that takes more than 100 steps.', 'Why does no simple invariant or induction settle this?'],
        params: { aspect: 0.45, controls: [S('n', 'Start n', 1, 200, 1, 27)],
          plots: [{ x: [0, 120], y: 'auto', xlabel: 'step', ylabel: 'value', n: 2, curves: () => [], pts: (v) => { const p = []; let x = v.n, k = 0; while (k <= 120) { p.push({ x: k, y: x, r: 2.5, ring: false, color: 'accent' }); if (x === 1) break; x = x % 2 ? 3 * x + 1 : x / 2; k++; } return p; } }],
          readout: (v) => { let x = v.n, k = 0, mx = x; while (x !== 1 && k < 10000) { x = x % 2 ? 3 * x + 1 : x / 2; mx = Math.max(mx, x); k++; } return [['steps to reach 1', String(k)], ['highest value', String(mx)]]; } } },
      { sim: 'explore', title: 'Checking a formula before proving it', desc: 'Compare Σk² with the conjectured formula n(n + 1)(2n + 1)/6, and Σk³ with (Σk)². Agreement for every n you try is evidence, not proof: induction finishes the job.',
        tasks: ['Check both formulas up to n = 30.', 'Prove the first by induction: what do you add to go from n to n + 1?'],
        params: { aspect: 0.45, controls: [S('n', 'n', 1, 30, 1, 10)],
          plots: [{ x: [1, 30], y: 'auto', xlabel: 'n', ylabel: 'value', n: 29, curves: () => [{ f: (n) => { n = Math.round(n); let s = 0; for (let k = 1; k <= n; k++) s += k * k; return s; }, label: 'Σk²' }, { f: (n) => n * (n + 1) * (2 * n + 1) / 6, color: 'rust', dash: [4, 4], label: 'formula' }], vlines: (v) => [{ x: v.n }] }],
          readout: (v) => { let s2 = 0, s3 = 0; for (let k = 1; k <= v.n; k++) { s2 += k * k; s3 += k * k * k; } return [['Σk²', String(s2)], ['n(n + 1)(2n + 1)/6', String(v.n * (v.n + 1) * (2 * v.n + 1) / 6)], ['Σk³', String(s3)], ['(Σk)²', String(Math.pow(v.n * (v.n + 1) / 2, 2))]]; } } }
    ],
    formulas: [['Contrapositive', '(P \\Rightarrow Q) \\iff (\\lnot Q \\Rightarrow \\lnot P)'], ['Induction', 'S(1) \\land (S(k) \\Rightarrow S(k + 1)) \\Rightarrow \\forall n\\ S(n)'], ['Sums', '\\sum k = \\tfrac{n(n+1)}2,\\ \\sum k^2 = \\tfrac{n(n+1)(2n+1)}6,\\ \\sum k^3 = \\left(\\tfrac{n(n+1)}2\\right)^2'], ['Pigeonhole', 'n\\text{ holes},\\ kn + 1\\text{ pigeons} \\Rightarrow \\text{some hole has } k + 1']],
    problems: [
      P('concept', 'mcq', 'Converse', R`"If $n$ is a multiple of 6, then $n$ is even." The converse is…`, 1, [R`Swap hypothesis and conclusion.`], R`"If $n$ is even, then $n$ is a multiple of 6", which is false ($n = 4$).`, { options: ['true', 'false', 'the same statement', 'meaningless'] }),
      P('concept', 'mcq', 'Counterexample', R`Which disproves "every prime is odd"?`, 0, [R`Look for the smallest prime.`], R`2.`, { options: ['2', '9', '15', '1'] }),
      P('concept', 'mcq', 'Induction step', R`To prove $S(n)$ for all $n \ge 1$ by induction, the base case is…`, 3, [R`The first domino.`], R`$S(1)$.`, { options: ['$S(0)$ always', '$S(k + 1)$', 'any large $n$', '$S(1)$'] }),
      P('concept', 'mcq', 'Pigeonhole', R`In a group of 367 people, there must be two who…`, 2, [R`At most 366 possible birthdays.`], R`Share a birthday (pigeonhole).`, { options: ['have the same name', 'are the same height', 'share a birthday', 'were born in the same year'] }),
      P('core', 'num', 'Handshakes', R`At a party every one of 20 people shakes hands once with every other. How many handshakes are there?`, 190, [R`Each of 20 shakes 19 hands, but each handshake is counted twice.`], R`$20\cdot19/2 = 190$.`),
      P('core', 'num', 'Sum of cubes', R`Find $1^3 + 2^3 + \dots + 10^3$.`, 3025, [R`It equals $(1 + 2 + \dots + 10)^2$.`], R`$55^2 = 3025$.`),
      P('core', 'num', 'Tower of Hanoi', R`The minimum number of moves $M_n$ for the Tower of Hanoi satisfies $M_n = 2M_{n-1} + 1$, $M_1 = 1$. Find $M_{10}$.`, 1023, [R`Guess $M_n = 2^n - 1$ and prove it by induction.`], R`$2^{10} - 1 = 1023$.`),
      P('core', 'num', 'Stamps', R`With only 3p and 5p stamps, what is the largest postage you <em>cannot</em> make?`, 7, [R`Try small values; once three in a row work, add 3s.`], R`8, 9, 10 all work, so everything above does too (strong induction). 7 does not: the answer is 7 $= 3\cdot5 - 3 - 5$.`),
      P('core', 'num', 'Points in a square', R`Five points are placed in a square of side 2. What is the largest guaranteed minimum distance, i.e. what distance $d$ ensures two points are at most $d$ apart?`, Math.SQRT2, [R`Divide the square into four unit squares.`], R`Two points share a unit square, so they are at most its diagonal $\sqrt2 \approx 1.414$ apart.`, { tol: 0.005 }),
      P('olympiad', 'num', 'Lines and regions', R`Ten lines in the plane, no two parallel and no three through one point. Into how many regions do they divide the plane?`, 56, [R`The $k$th line crosses $k - 1$ others and so adds $k$ new regions.`], R`$R_n = 1 + \sum_{k=1}^{n}k = 1 + \dfrac{n(n + 1)}2$, so $R_{10} = 56$.`),
      P('olympiad', 'num', 'An invariant', R`The numbers $1, 2, \dots, 10$ are on a board. Repeatedly erase two numbers $a, b$ and write $|a - b|$. When one number is left, what is it modulo 2?`, 1, [R`What happens to the parity of the total sum at each step?`], R`$a + b$ and $|a - b|$ have the same parity, so the sum's parity never changes. It starts at 55, odd, so the last number is odd: 1.`),
      P('olympiad', 'num', 'Pigeonhole with sums', R`What is the least $n$ such that any $n$ integers include two whose difference is divisible by 7?`, 8, [R`Pigeonholes: remainders mod 7.`], R`Seven remainders, so 8 integers force two with the same remainder; 7 can all differ. Answer 8.`)
    ]
  });
  PB.addDrills('math-proof', [
    { title: 'Sum 1 to n', gen: (r) => { const n = r.int(10, 200); return { q: R`<p>Find $1 + 2 + \dots + ${n}$.</p>`, answer: n * (n + 1) / 2, tol: 0.0001, solution: R`<p>$${n}\cdot${n + 1}/2 = ${n * (n + 1) / 2}$.</p>` }; } },
    { title: 'Handshakes', gen: (r) => { const n = r.int(4, 60); return { q: R`<p>Each pair among ${n} people shakes hands once. How many handshakes?</p>`, answer: n * (n - 1) / 2, tol: 0.0001, solution: R`<p>$\binom{${n}}{2} = ${n * (n - 1) / 2}$.</p>` }; } },
    { title: 'Pigeonhole', gen: (r) => { const h = r.int(3, 12), k = r.int(2, 5); return { q: R`<p>How many objects must go into ${h} boxes to guarantee some box holds at least ${k}?</p>`, answer: h * (k - 1) + 1, tol: 0.0001, solution: R`<p>$${h}(${k} - 1) + 1 = ${h * (k - 1) + 1}$.</p>` }; } }
  ]);

  /* ===================== 12. Number theory ===================== */
  const divisors = (n) => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; };
  PB.addChapter({
    id: 'math-numbertheory', subject: 'maths', num: 16, part: 'Olympiad Foundations',
    title: 'Number Theory',
    subtitle: R`The arithmetic of whole numbers. Primes and factorisation, greatest common divisors and Euclid's algorithm, modular arithmetic, Fermat's little theorem, Euler's theorem and the Chinese remainder theorem.`,
    big: 'Every whole number is built from primes in exactly one way, like a molecule from atoms. Modular arithmetic, "clock arithmetic", throws away everything except remainders, and that is often all a problem needs.',
    goals: ['Factorise and count divisors', 'Compute gcds with Euclid’s algorithm and use Bézout', 'Calculate in modular arithmetic', 'Apply Fermat’s and Euler’s theorems to large powers', 'Solve simultaneous congruences'],
    sections: [
      { title: 'Primes and factorisation', html: R`
<p>A <strong>prime</strong> has exactly two divisors, 1 and itself. The <strong>fundamental theorem of arithmetic</strong>: every integer above 1 is a product of primes in exactly one way (up to order). For example $360 = 2^3\cdot3^2\cdot5$.</p>
<p>The factorisation tells you everything about divisors. A divisor of $360$ is $2^a3^b5^c$ with $0 \le a \le 3$, $0 \le b \le 2$, $0 \le c \le 1$, so it has $(3 + 1)(2 + 1)(1 + 1) = 24$ divisors.</p>
<div class="key"><p>If $n = p_1^{e_1}\cdots p_k^{e_k}$, then the number of divisors is $d(n) = (e_1 + 1)\cdots(e_k + 1)$.</p></div>
<p>To test whether $n$ is prime, you only need to try primes up to $\sqrt n$: if $n = ab$ with both factors bigger than $\sqrt n$, their product would exceed $n$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many positive divisors does $72$ have?`, 12, [R`$72 = 2^3\cdot3^2$.`], R`$(3 + 1)(2 + 1) = 12$.`)] },
      { title: 'GCD, Euclid and Bézout', html: R`
<p>The <strong>greatest common divisor</strong> $\gcd(a, b)$ is the largest number dividing both. <strong>Euclid's algorithm</strong> finds it fast: $\gcd(a, b) = \gcd(b, a \bmod b)$, repeated until the remainder is 0.</p>
$$\gcd(252, 198):\ 252 = 1\cdot198 + 54,\ 198 = 3\cdot54 + 36,\ 54 = 1\cdot36 + 18,\ 36 = 2\cdot18.$$
<p>So the gcd is 18. Running the steps backwards writes it as a combination: <strong>Bézout's identity</strong> says $\gcd(a, b) = ax + by$ for some integers $x, y$. Also $\gcd(a, b)\cdot\text{lcm}(a, b) = ab$.</p>
<p>A linear equation $ax + by = c$ has integer solutions exactly when $\gcd(a, b)$ divides $c$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find $\gcd(91, 65)$.`, 13, [R`$91 = 1\cdot65 + 26$, then $\gcd(65, 26)$.`], R`$65 = 2\cdot26 + 13$, $26 = 2\cdot13$: gcd 13.`)] },
      { title: 'Modular arithmetic', html: R`
<p>Write $a \equiv b \pmod n$ if $n$ divides $a - b$: they leave the same remainder. Think of a clock with $n$ hours. Congruences can be added, subtracted and multiplied like equations:</p>
$$17 \equiv 2,\ 23 \equiv 8 \pmod{15}\ \Rightarrow\ 17\cdot23 \equiv 16 \equiv 1 \pmod{15}.$$
<p>That makes huge powers easy. Last digit of $7^{100}$? Work mod 10: $7^1 \equiv 7$, $7^2 \equiv 9$, $7^3 \equiv 3$, $7^4 \equiv 1$. The powers cycle with period 4, and $100 = 4\cdot25$, so the last digit is 1.</p>
<p>Divisibility tests are modular arithmetic: $10 \equiv 1 \pmod 9$, so a number is congruent to its digit sum mod 9; $10 \equiv -1 \pmod{11}$ gives the alternating-sum test for 11.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is $2^{10} \bmod 7$?`, 2, [R`$2^3 = 8 \equiv 1 \pmod 7$.`], R`$2^{10} = (2^3)^3\cdot2 \equiv 2$.`)] },
      { title: 'Fermat, Euler and the Chinese remainder theorem', html: R`
<div class="key"><p><strong>Fermat's little theorem.</strong> If $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod p$.<br><strong>Euler's theorem.</strong> If $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$, where $\varphi(n)$ counts the numbers in $1..n$ coprime to $n$.</p></div>
<p>So $3^{100} \bmod 7$: $3^6 \equiv 1$, and $100 = 6\cdot16 + 4$, so $3^{100} \equiv 3^4 = 81 \equiv 4$.</p>
<p>For $n = p^aq^b\cdots$, $\varphi(n) = n\left(1 - \tfrac1p\right)\left(1 - \tfrac1q\right)\cdots$; e.g. $\varphi(100) = 40$.</p>
<p><strong>Chinese remainder theorem.</strong> If the moduli are pairwise coprime, a system like $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$ has exactly one solution modulo their product, here $x \equiv 8 \pmod{15}$. (List $3, 8, 13$: the numbers $\equiv 3 \bmod 5$, and pick the one $\equiv 2 \bmod 3$.)</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the smallest positive $x$ with $x \equiv 1 \pmod 4$ and $x \equiv 2 \pmod 5$.`, 17, [R`List $2, 7, 12, 17, \dots$ and test mod 4.`], R`$17 = 4\cdot4 + 1$. So $x = 17$ (mod 20).`)] }
    ],
    figures: [
      { s: 2, title: 'Times tables on a clock', caption: 'Join k to m·k (mod n) round a circle of n points. The 2-times table draws a cardioid; other multipliers make other curves.', params: { picFrac: 1, aspect: 0.5, controls: [S('n', 'Points n', 10, 300, 1, 200), S('m', 'Multiplier m', 2, 51, 1, 2)],
        draw: (ctx, Cc, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, r = Math.min(b.w, b.h) * 0.45; ctx.strokeStyle = U.alpha(Cc.ink3, 0.5); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.strokeStyle = U.alpha(Cc.accent, 0.55); ctx.lineWidth = 0.8; ctx.beginPath(); for (let k = 0; k < v.n; k++) { const a = 2 * Math.PI * k / v.n, c2 = 2 * Math.PI * ((k * v.m) % v.n) / v.n; ctx.moveTo(cx + r * Math.cos(a), cy - r * Math.sin(a)); ctx.lineTo(cx + r * Math.cos(c2), cy - r * Math.sin(c2)); } ctx.stroke(); } } }
    ],
    labs: [
      { sim: 'explore', title: 'Counting primes', desc: 'The prime-counting function π(x) against x / ln x (the prime number theorem says their ratio tends to 1).',
        tasks: ['How many primes are below 1000?', 'Is x / ln x an over- or underestimate?', 'Roughly how far apart are primes near 10 000?'],
        params: { aspect: 0.45, controls: [S('x', 'x', 10, 10000, 10, 1000)],
          init: (v) => { if (!PB._sieve) { const N = 10001, s = new Uint8Array(N); const pi = new Uint16Array(N); let c = 0; for (let i = 2; i < N; i++) { if (!s[i]) { c++; for (let j = i * i; j < N; j += i) s[j] = 1; } pi[i] = c; } PB._sieve = pi; } },
          plots: [{ x: [2, 10000], y: 'auto', xlabel: 'x', ylabel: 'count', curves: () => [{ f: (x) => PB._sieve[Math.floor(x)], label: 'π(x)' }, { f: (x) => x / Math.log(x), color: 'rust', dash: [4, 4], label: 'x / ln x' }], vlines: (v) => [{ x: v.x }] }],
          readout: (v) => [['π(x)', String(PB._sieve[Math.floor(v.x)])], ['x / ln x', f(v.x / Math.log(v.x))], ['average gap ≈ ln x', f(Math.log(v.x))]] } },
      { sim: 'explore', title: 'Euclid’s algorithm and Bézout', desc: 'Watch the remainders shrink, and see gcd(a, b) written as ax + by.',
        tasks: ['Find a pair of numbers under 100 that takes the most steps. (Hint: Fibonacci numbers.)', 'Use the Bézout coefficients to solve 37x ≡ 1 (mod 100).'],
        params: { aspect: 0.3, controls: [S('a', 'a', 1, 500, 1, 252), S('b', 'b', 1, 500, 1, 198)],
          plots: [{ x: [0, 12], y: [0, 500], xlabel: 'step', ylabel: 'remainder', n: 2, curves: () => [], pts: (v) => { const p = []; let a = Math.max(v.a, v.b), bb = Math.min(v.a, v.b), k = 0; p.push({ x: 0, y: a, r: 4 }); while (bb && k < 12) { k++; p.push({ x: k, y: bb, r: 4 }); const t = a % bb; a = bb; bb = t; } return p; } }],
          readout: (v) => { const eg = (a, b) => { if (!b) return [a, 1, 0]; const r = eg(b, a % b); return [r[0], r[2], r[1] - Math.floor(a / b) * r[2]]; }; const r = eg(v.a, v.b); return [['gcd', String(r[0])], ['Bézout', r[0] + ' = ' + v.a + '·(' + r[1] + ') + ' + v.b + '·(' + r[2] + ')'], ['lcm', String(v.a * v.b / r[0])]]; } } }
    ],
    formulas: [['Divisor count', 'd(p_1^{e_1}\\cdots p_k^{e_k}) = (e_1 + 1)\\cdots(e_k + 1)'], ['Euclid', '\\gcd(a, b) = \\gcd(b, a \\bmod b)'], ['Bézout', '\\gcd(a, b) = ax + by'], ['gcd and lcm', '\\gcd(a, b)\\,\\text{lcm}(a, b) = ab'], ['Fermat', 'a^{p-1} \\equiv 1 \\pmod p'], ['Euler', 'a^{\\varphi(n)} \\equiv 1 \\pmod n,\\ \\varphi(n) = n\\prod(1 - 1/p)'], ['Legendre', 'v_p(n!) = \\sum_{k\\ge1}\\lfloor n/p^k\\rfloor']],
    problems: [
      P('concept', 'mcq', 'Prime test', R`Which of these is prime?`, 2, [R`Try dividing by small primes.`], R`97. ($91 = 7\cdot13$, $87 = 3\cdot29$, $119 = 7\cdot17$.)`, { options: ['91', '87', '97', '119'] }),
      P('concept', 'mcq', 'Digit sums', R`A number's digits add to 123. Its remainder on division by 9 is…`, 1, [R`$n \equiv$ digit sum (mod 9).`], R`$123 \equiv 1+2+3 = 6 \pmod 9$.`, { options: ['3', '6', '0', '1'] }),
      P('concept', 'mcq', 'Coprime', R`$\varphi(p)$ for a prime $p$ is…`, 3, [R`Count $1, \dots, p$ coprime to $p$.`], R`$p - 1$.`, { options: ['$p$', '1', '$p + 1$', '$p - 1$'] }),
      P('concept', 'mcq', 'Solvability', R`Does $6x + 10y = 7$ have integer solutions?`, 1, [R`$\gcd(6, 10) = 2$.`], R`No: the left side is always even.`, { options: ['Yes', 'No', 'Only with $x = 0$', 'Infinitely many with $y > 0$'] }),
      P('core', 'num', 'LCM', R`Find $\text{lcm}(12, 18)$.`, 36, [R`$\gcd = 6$, so lcm $= 12\cdot18/6$.`], R`36.`),
      P('core', 'num', 'Trailing zeros', R`How many zeros does $100!$ end with?`, 24, [R`Count factors of 5: $\lfloor100/5\rfloor + \lfloor100/25\rfloor$.`], R`$20 + 4 = 24$.`),
      P('core', 'num', 'Big power', R`Find $3^{100} \bmod 5$.`, 1, [R`$3^4 = 81 \equiv 1 \pmod 5$.`], R`$100$ is a multiple of 4, so $3^{100} \equiv 1$.`),
      P('core', 'num', 'Inverse mod 26', R`Find $x$ in $0..25$ with $7x \equiv 1 \pmod{26}$.`, 15, [R`Euclid: $26 = 3\cdot7 + 5$, $7 = 5 + 2$, $5 = 2\cdot2 + 1$; back-substitute.`], R`$7\cdot15 = 105 = 4\cdot26 + 1$, so $x = 15$.`),
      P('core', 'num', 'Perfect number', R`Find the sum of all positive divisors of 28.`, 56, [R`$28 = 2^2\cdot7$: $\sigma = (1 + 2 + 4)(1 + 7)$.`], R`$7\cdot8 = 56 = 2\cdot28$: 28 is a perfect number.`),
      P('olympiad', 'num', 'Remainder puzzle', R`Find the smallest $n > 1$ that leaves remainder 1 when divided by each of 2, 3, 4, 5 and 6.`, 61, [R`$n - 1$ is divisible by all of them.`], R`$n - 1 = \text{lcm}(2,\dots,6) = 60$, so $n = 61$.`),
      P('olympiad', 'num', 'Huge power', R`Find $2^{2024} \bmod 13$.`, powmod(2, 2024, 13), [R`Fermat: $2^{12} \equiv 1 \pmod{13}$.`, R`$2024 \bmod 12 = 8$.`], R`$2^{2024} \equiv 2^8 = 256 \equiv ${powmod(2, 2024, 13)} \pmod{13}$.`),
      P('olympiad', 'num', 'Last two digits', R`Find the last two digits of $7^{2024}$ (as a number from 0 to 99).`, powmod(7, 2024, 100), [R`$7^4 = 2401 \equiv 1 \pmod{100}$.`], R`$2024$ is a multiple of 4, so $7^{2024} \equiv 1$: the last two digits are 01.`)
    ]
  });
  PB.addDrills('math-numbertheory', [
    { title: 'GCD', gen: (r) => { const g = r.int(2, 15), a = g * r.int(2, 30), b = g * r.int(2, 30); return { q: R`<p>Find $\gcd(${a}, ${b})$.</p>`, answer: gcd(a, b), tol: 0.0001, solution: R`<p>Euclid's algorithm gives ${gcd(a, b)}.</p>` }; } },
    { title: 'Power mod', gen: (r) => { const b = r.int(2, 9), e = r.int(10, 200), m = r.pick([5, 7, 9, 10, 11, 13]); return { q: R`<p>Find $${b}^{${e}} \bmod ${m}$.</p>`, answer: powmod(b, e, m), tol: 0.0001, atol: 1e-9, solution: R`<p>Find the cycle of powers of ${b} mod ${m}: the answer is ${powmod(b, e, m)}.</p>` }; } },
    { title: 'Number of divisors', gen: (r) => { const n = r.pick([12, 18, 24, 30, 36, 48, 60, 72, 84, 90, 96, 100, 120, 144, 180, 210, 240, 360]); return { q: R`<p>How many positive divisors does ${n} have?</p>`, answer: divisors(n), tol: 0.0001, solution: R`<p>From the prime factorisation: ${divisors(n)}.</p>` }; } }
  ]);

  /* ===================== 13. Counting and probability ===================== */
  PB.addChapter({
    id: 'math-combinatorics', subject: 'maths', num: 17, part: 'Olympiad Foundations',
    title: 'Counting and Probability',
    subtitle: R`Counting without listing. The multiplication principle, permutations and combinations, Pascal's triangle and the binomial theorem, inclusion–exclusion, stars and bars, and probability with expected value.`,
    big: 'Counting is the art of not counting one by one. Break a choice into steps and multiply; decide whether order matters; and when it is easier, count what you do not want and subtract. Probability is then just favourable cases over all cases.',
    goals: ['Use the multiplication principle', 'Count permutations and combinations, with repetition', 'Use Pascal’s triangle and the binomial theorem', 'Apply inclusion–exclusion and stars and bars', 'Compute probabilities and expected values'],
    sections: [
      { title: 'Multiply the choices', html: R`
<p>If a task has steps with $a$, then $b$, then $c$ choices, there are $abc$ ways in all: the <strong>multiplication principle</strong>. A licence plate of 3 letters then 3 digits: $26^3\cdot10^3 \approx 17.6$ million.</p>
<p>Arranging $n$ different objects in a row: $n$ choices for the first place, $n - 1$ for the next, …, giving $n! = n(n - 1)\cdots1$ <strong>permutations</strong>. Choosing and arranging $k$ of them: $\dfrac{n!}{(n - k)!}$.</p>
<p>If some objects are identical, divide out their rearrangements: the letters of BANANA can be arranged in $\dfrac{6!}{3!\,2!} = 60$ ways (three A's and two N's).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In how many ways can 5 runners finish first, second and third?`, 60, [R`$5$ choices for gold, then 4, then 3.`], R`$5\cdot4\cdot3 = 60$.`)] },
      { title: 'Combinations and Pascal’s triangle', html: R`
<p>When order does not matter, divide by the $k!$ orders of each selection:</p>
<div class="key"><p>$$\binom nk = \frac{n!}{k!\,(n - k)!}\quad\text{ways to choose } k \text{ of } n.$$</p></div>
<p>A 5-card hand from 52 cards: $\binom{52}{5} = 2\,598\,960$. The numbers $\binom nk$ form <strong>Pascal's triangle</strong>, where each entry is the sum of the two above: $\binom nk = \binom{n-1}{k-1} + \binom{n-1}k$ (either the special item is chosen or it is not).</p>
<p>The <strong>binomial theorem</strong> explains the name: $(x + y)^n = \sum_k\binom nk x^ky^{n-k}$, since each term picks $x$ from $k$ of the $n$ brackets. Setting $x = y = 1$: the entries in row $n$ add to $2^n$, the number of subsets of an $n$-set.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the coefficient of $x^3$ in $(1 + x)^7$.`, 35, [R`It is $\binom73$.`], R`$\dfrac{7\cdot6\cdot5}{6} = 35$.`)] },
      { title: 'Inclusion–exclusion and stars and bars', html: R`
<p><strong>Inclusion–exclusion.</strong> To count things in $A$ or $B$, add and then remove the overlap counted twice: $|A\cup B| = |A| + |B| - |A\cap B|$. With three sets, add back the triple overlap. How many of $1..100$ are divisible by 2 or 3? $50 + 33 - 16 = 67$.</p>
<p><strong>Complements.</strong> "At least one" is usually easiest as "all minus none".</p>
<p><strong>Stars and bars.</strong> The number of ways to write $n$ as an ordered sum of $k$ non-negative integers is $\binom{n + k - 1}{k - 1}$: arrange $n$ stars and $k - 1$ bars in a row. For example, 10 identical sweets among 3 children: $\binom{12}{2} = 66$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many non-negative integer solutions does $x + y + z = 6$ have?`, 28, [R`Stars and bars: $\binom{6 + 2}{2}$.`], R`$\binom82 = 28$.`)] },
      { title: 'Probability and expected value', html: R`
<p>With equally likely outcomes, $P(\text{event}) = \dfrac{\text{favourable}}{\text{total}}$. Two dice: $P(\text{sum} = 7) = 6/36 = 1/6$.</p>
<p>For independent events, probabilities multiply; for mutually exclusive ones they add. The <strong>birthday problem</strong>: with 23 people, $P(\text{all different}) = \dfrac{365\cdot364\cdots343}{365^{23}} \approx 0.49$, so a shared birthday is more likely than not.</p>
<p>The <strong>expected value</strong> is the probability-weighted average: $E[X] = \sum xP(X = x)$. Its secret weapon is <strong>linearity</strong>: $E[X + Y] = E[X] + E[Y]$, even when $X$ and $Y$ are dependent. Expected number of people who get their own hat back when $n$ hats are shuffled? Each person has probability $1/n$, so the expectation is $n\cdot\tfrac1n = 1$, whatever $n$ is.</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the expected total when two fair dice are rolled?`, 7, [R`Linearity: $E[X_1] + E[X_2]$.`], R`$3.5 + 3.5 = 7$.`)] }
    ],
    figures: [
      { s: 1, title: 'Pascal’s triangle modulo m', caption: 'Colour the entries of Pascal’s triangle by their remainder mod m. Mod 2 reveals Sierpiński’s triangle.', params: { picFrac: 1, aspect: 0.5, controls: [S('rows', 'Rows', 8, 64, 1, 32), S('m', 'Modulus m', 2, 7, 1, 2)],
        draw: (ctx, Cc, v, b, U) => { const n = v.rows, s = Math.min(b.w / (n + 1), (b.h - 10) / n); const cols = [Cc.surface2, Cc.accent, Cc.rust, Cc.teal, Cc.points, Cc.good, Cc.ink3]; let row = [1]; for (let i = 0; i < n; i++) { for (let k = 0; k <= i; k++) { const val = row[k] % v.m; ctx.fillStyle = val ? cols[val % cols.length] : U.alpha(Cc.ink3, 0.12); ctx.fillRect(b.x + b.w / 2 + (k - i / 2) * s - s / 2, b.y + 5 + i * s, s - 0.5, s - 0.5); } const nr = [1]; for (let k = 1; k <= i; k++) nr.push((row[k - 1] + row[k]) % 840); nr.push(1); row = nr; } } } },
      { s: 3, title: 'The birthday problem', caption: 'Probability that at least two of n people share a birthday. It passes 50% at just 23 people.', params: { controls: [S('n', 'People n', 1, 80, 1, 23)],
        plots: [{ x: [1, 80], y: [0, 1.05], xlabel: 'n', ylabel: 'P(shared birthday)', curves: () => [{ f: (n) => { let p = 1; for (let k = 0; k < Math.round(n); k++) p *= (365 - k) / 365; return 1 - p; } }], hlines: () => [{ y: 0.5, label: '50%' }], pts: (v) => { let p = 1; for (let k = 0; k < v.n; k++) p *= (365 - k) / 365; return [{ x: v.n, y: 1 - p }]; } }],
        readout: (v) => { let p = 1; for (let k = 0; k < v.n; k++) p *= (365 - k) / 365; return [['P(shared)', f(100 * (1 - p), 4) + '%']]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Binomial distribution', desc: 'Probability of k successes in n independent trials with success probability p: C(n, k)pᵏ(1 − p)ⁿ⁻ᵏ.',
        tasks: ['Where is the peak? Compare it with np.', 'How does the width grow with n? (It goes like √(np(1 − p)).)', 'What is the chance of exactly 5 heads in 10 tosses?'],
        params: { aspect: 0.45, controls: [S('n', 'Trials n', 1, 60, 1, 10), S('p', 'Success probability p', 0.01, 0.99, 0.01, 0.5), S('k', 'Highlight k', 0, 60, 1, 5)],
          plots: [{ x: (v) => [-0.5, v.n + 0.5], y: 'auto', xlabel: 'k', ylabel: 'P(k)', n: 600, curves: (v) => [{ f: (x) => { const k = Math.round(x); return k < 0 || k > v.n ? 0 : C(v.n, k) * Math.pow(v.p, k) * Math.pow(1 - v.p, v.n - k); }, color: 'accent' }], vlines: (v) => [{ x: v.n * v.p, label: 'np' }], pts: (v) => (v.k <= v.n ? [{ x: v.k, y: C(v.n, v.k) * Math.pow(v.p, v.k) * Math.pow(1 - v.p, v.n - v.k) }] : []) }],
          readout: (v) => [['P(k)', v.k <= v.n ? f(C(v.n, v.k) * Math.pow(v.p, v.k) * Math.pow(1 - v.p, v.n - v.k), 4) : '0'], ['mean np', f(v.n * v.p)], ['standard deviation', f(Math.sqrt(v.n * v.p * (1 - v.p)))]] } },
      { sim: 'explore', title: 'Monte Carlo: estimating π', desc: 'Throw N random points into a square; the fraction landing inside the quarter circle tends to π/4. Press "Throw" for a new sample.',
        tasks: ['How does the error shrink as N grows? (Like 1/√N.)', 'Why is this a poor way to compute π but a great way to compute many-dimensional integrals?'],
        params: { aspect: 0.5, picFrac: 0.5, controls: [S('N', 'Points N', 10, 5000, 10, 500)], buttons: [{ label: 'Throw again', primary: true, action: (v) => { v.seed = (v.seed || 1) + 1; } }],
          init: (v) => { v.seed = 1; },
          draw: (ctx, Cc, v, b, U) => { const s = Math.min(b.w, b.h) - 20, ox = b.x + 10, oy = b.y + 10; ctx.strokeStyle = Cc.ink3; ctx.strokeRect(ox, oy, s, s); ctx.beginPath(); ctx.arc(ox, oy + s, s, -Math.PI / 2, 0); ctx.stroke(); const r = PB.rng(v.seed * 7919); let inside = 0; for (let i = 0; i < v.N; i++) { const x = r(), y = r(), hit = x * x + y * y < 1; if (hit) inside++; ctx.fillStyle = hit ? Cc.accent : Cc.rust; ctx.fillRect(ox + x * s - 1, oy + s - y * s - 1, 2, 2); } v.est = 4 * inside / v.N; },
          plots: [{ x: [0, 1], y: [2.6, 3.7], zero: false, xlabel: '', ylabel: 'estimate', n: 2, curves: (v) => [{ f: () => v.est || 3, label: 'estimate' }, { f: () => Math.PI, color: 'ink3', dash: [4, 4], label: 'π' }] }],
          readout: (v) => [['estimate of π', f(v.est || 0, 5)], ['error', f((v.est || 0) - Math.PI, 3)]] } }
    ],
    formulas: [['Permutations', 'n!,\\ \\ {}^nP_k = \\dfrac{n!}{(n - k)!}'], ['Combinations', '\\binom nk = \\dfrac{n!}{k!(n - k)!}'], ['Pascal', '\\binom nk = \\binom{n-1}{k-1} + \\binom{n-1}{k}'], ['Binomial theorem', '(x + y)^n = \\sum\\binom nk x^ky^{n-k}'], ['Inclusion–exclusion', '|A\\cup B| = |A| + |B| - |A\\cap B|'], ['Stars and bars', '\\binom{n + k - 1}{k - 1}'], ['Expectation', 'E[X + Y] = E[X] + E[Y]']],
    problems: [
      P('concept', 'mcq', 'Order or not?', R`Choosing a committee of 3 from 10 people is a question of…`, 1, [R`Does it matter who is picked first?`], R`Combinations: the committee is the same whatever order people are picked in.`, { options: ['permutations', 'combinations', 'neither', 'probability only'] }),
      P('concept', 'mcq', 'Symmetry', R`$\binom{20}{17} = $`, 2, [R`Choosing 17 to keep is choosing 3 to leave out.`], R`$\binom{20}{3} = 1140$.`, { options: ['$\\binom{20}{1}$', '$\\binom{17}{3}$', '$\\binom{20}{3}$', '$20!/17$'] }),
      P('concept', 'mcq', 'Row sum', R`The sum of row $n$ of Pascal's triangle is…`, 3, [R`Set $x = y = 1$ in the binomial theorem.`], R`$2^n$.`, { options: ['$n^2$', '$n!$', '$2n$', '$2^n$'] }),
      P('concept', 'mcq', 'Linearity', R`Expected value is linear…`, 0, [R`It is just a weighted sum.`], R`Always, even for dependent random variables.`, { options: ['always', 'only for independent variables', 'only for symmetric distributions', 'never'] }),
      P('core', 'num', 'Committee', R`How many 5-person committees can be chosen from 12 people?`, C(12, 5), [R`$\binom{12}5$.`], R`$792$.`),
      P('core', 'num', 'Divisible by 3 or 5', R`How many integers from 1 to 1000 are divisible by 3 or 5?`, 333 + 200 - 66, [R`$\lfloor1000/3\rfloor + \lfloor1000/5\rfloor - \lfloor1000/15\rfloor$.`], R`$333 + 200 - 66 = 467$.`),
      P('core', 'num', 'At least one six', R`What is the probability of at least one six in 4 rolls of a die?`, 1 - Math.pow(5 / 6, 4), [R`Complement: no sixes at all.`], R`$1 - (5/6)^4 = ${f(1 - Math.pow(5 / 6, 4), 4)}$.`, { tol: 0.002 }),
      P('core', 'num', 'Grid paths', R`How many shortest paths go along grid lines from one corner of a 6 × 4 grid to the opposite corner?`, C(10, 4), [R`Any arrangement of 6 rights and 4 ups.`], R`$\binom{10}{4} = 210$.`),
      P('core', 'num', 'Arrangements', R`How many distinct arrangements of the letters of MISSISSIPPI are there?`, 34650, [R`11 letters: four I, four S, two P, one M.`], R`$\dfrac{11!}{4!\,4!\,2!} = 34\,650$.`),
      P('olympiad', 'num', 'Derangements', R`Five letters are put into five addressed envelopes at random. In how many ways does no letter end up in its own envelope?`, 44, [R`Inclusion–exclusion: $D_n = n!\sum(-1)^k/k!$.`], R`$D_5 = 120(1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} - \tfrac1{120}) = 44$.`),
      P('olympiad', 'num', 'Catalan', R`How many shortest grid paths from (0, 0) to (5, 5) never go above the diagonal $y = x$?`, 42, [R`These are counted by the Catalan numbers $\dfrac1{n + 1}\binom{2n}n$.`], R`$\dfrac16\binom{10}5 = 42$.`),
      P('olympiad', 'num', 'No neighbours', R`How many subsets of $\{1, 2, \dots, 10\}$ (including the empty set) contain no two consecutive numbers?`, 144, [R`Let $a_n$ be the count for $\{1..n\}$: either $n$ is out ($a_{n-1}$) or in ($a_{n-2}$).`], R`$a_n = a_{n-1} + a_{n-2}$ with $a_1 = 2$, $a_2 = 3$: Fibonacci numbers, giving $a_{10} = 144$.`)
    ]
  });
  PB.addDrills('math-combinatorics', [
    { title: 'Choose', gen: (r) => { const n = r.int(5, 20), k = r.int(2, Math.min(6, n - 1)); return { q: R`<p>Find $\binom{${n}}{${k}}$.</p>`, answer: C(n, k), tol: 0.0001, solution: R`<p>$\dfrac{${n}!}{${k}!\,${n - k}!} = ${C(n, k)}$.</p>` }; } },
    { title: 'Stars and bars', gen: (r) => { const n = r.int(3, 15), k = r.int(2, 5); return { q: R`<p>How many ways can ${n} identical sweets be shared among ${k} children (some may get none)?</p>`, answer: C(n + k - 1, k - 1), tol: 0.0001, solution: R`<p>$\binom{${n + k - 1}}{${k - 1}} = ${C(n + k - 1, k - 1)}$.</p>` }; } },
    { title: 'Dice probability', gen: (r) => { const s = r.int(2, 12); const ways = 6 - Math.abs(s - 7); return { q: R`<p>Two fair dice are rolled. What is the probability that the total is ${s}?</p>`, answer: ways / 36, tol: 0.002, solution: R`<p>${ways} of 36 outcomes: ${f(ways / 36, 4)}.</p>` }; } }
  ]);
})();
