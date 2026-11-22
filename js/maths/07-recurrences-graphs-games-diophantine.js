/* Mathematics: recurrences and generating functions, graph theory, games and invariants, Diophantine equations. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.001 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.001 } : {}, o || {});
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };

  /* ===================== 18. Recurrences and generating functions ===================== */
  PB.addChapter({
    id: 'math-recurrences', subject: 'maths', num: 18, part: 'Olympiad Foundations',
    title: 'Recurrences and Generating Functions',
    subtitle: R`Counting by building up. Setting up recurrences, solving linear recurrences with the characteristic equation, Catalan numbers, and generating functions that turn sequences into algebra.`,
    big: 'Many counting problems are easiest if you ask: how does the answer for n relate to the answers for smaller n? That gives a recurrence. Generating functions then package the whole sequence into one function, so that combinatorics becomes algebra.',
    goals: ['Set up a recurrence for a counting problem', 'Solve linear recurrences with constant coefficients', 'Recognise Fibonacci and Catalan patterns', 'Build and use simple generating functions', 'Use recurrences in probability (gambler’s ruin)'],
    sections: [
      { title: 'Setting up a recurrence', html: R`
<p>How many ways can you climb $n$ stairs taking 1 or 2 steps at a time? Look at the <em>last</em> move: it was a 1-step (leaving $n - 1$ stairs before it) or a 2-step (leaving $n - 2$). So</p>
$$a_n = a_{n-1} + a_{n-2},\qquad a_1 = 1,\ a_2 = 2,$$
<p>the Fibonacci recurrence: 1, 2, 3, 5, 8, 13, … The same idea counts tilings of a $2\times n$ strip by dominoes, binary strings with no two consecutive 1s, and subsets with no two neighbours.</p>
<div class="key"><p>Recipe: describe the objects of size $n$ by what happens at one end (first or last step), and count each case using smaller sizes.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many ways are there to climb 8 stairs taking 1 or 2 steps at a time?`, 34, [R`$a_n$: 1, 2, 3, 5, 8, 13, 21, …`], R`$a_8 = 34$.`)] },
      { title: 'Solving linear recurrences', html: R`
<p>For $a_n = pa_{n-1} + qa_{n-2}$, try $a_n = x^n$: it works if $x^2 = px + q$, the <strong>characteristic equation</strong>. With two different roots $\alpha, \beta$, every solution is</p>
$$a_n = A\alpha^n + B\beta^n,$$
<p>with $A, B$ fixed by the first two terms. For Fibonacci ($x^2 = x + 1$) this gives Binet's formula $F_n = \dfrac{\varphi^n - \psi^n}{\sqrt5}$, $\varphi = \frac{1 + \sqrt5}2$, $\psi = \frac{1 - \sqrt5}2$. Since $|\psi| < 1$, $F_n$ is the nearest integer to $\varphi^n/\sqrt5$.</p>
<p>A repeated root $\alpha$ gives $a_n = (A + Bn)\alpha^n$. A first-order recurrence $a_n = ra_{n-1} + c$ has solution $a_n = L + (a_0 - L)r^n$ with $L = c/(1 - r)$.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`$a_n = 5a_{n-1} - 6a_{n-2}$, $a_0 = 2$, $a_1 = 5$. Find $a_4$.`, Math.pow(2, 4) + Math.pow(3, 4), [R`Characteristic roots 2 and 3: $a_n = A2^n + B3^n$.`, R`$A + B = 2$, $2A + 3B = 5$ give $A = B = 1$.`], R`$a_n = 2^n + 3^n$, so $a_4 = 16 + 81 = 97$.`)] },
      { title: 'Catalan numbers', html: R`
<p>How many ways can $n$ pairs of brackets be correctly matched? For $n = 3$: ((())), (()()), (())(), ()(()), ()()() — five. Split by where the bracket opened first is closed: $C_n = \sum_{k=0}^{n-1}C_kC_{n-1-k}$, giving</p>
<div class="key"><p>$$C_n = \frac{1}{n + 1}\binom{2n}{n}:\quad 1, 1, 2, 5, 14, 42, 132, \dots$$</p></div>
<p>The same numbers count lattice paths that stay below the diagonal, triangulations of a polygon with $n + 2$ sides, and full binary trees with $n + 1$ leaves. When you meet a sequence starting 1, 2, 5, 14, think Catalan.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In how many ways can a convex hexagon be cut into triangles by non-crossing diagonals?`, 14, [R`An $(n + 2)$-gon has $C_n$ triangulations.`], R`Hexagon: $n = 4$, $C_4 = 14$.`)] },
      { title: 'Generating functions', html: R`
<p>Store a sequence as the coefficients of a power series: $G(x) = a_0 + a_1x + a_2x^2 + \dots$ Multiplying generating functions combines choices. For example, the number of ways to pay $n$ pence with 1p and 2p coins is the coefficient of $x^n$ in</p>
$$(1 + x + x^2 + \dots)(1 + x^2 + x^4 + \dots) = \frac{1}{(1 - x)(1 - x^2)}.$$
<p>Recurrences become equations: for Fibonacci, $G = x + xG + x^2G$, so $G(x) = \dfrac{x}{1 - x - x^2}$. And $\dfrac{1}{(1 - x)^k} = \sum\binom{n + k - 1}{k - 1}x^n$ is stars and bars again.</p>
<p><strong>Gambler's ruin.</strong> Recurrences also solve probability: if you start with $k$ coins and bet 1 on fair coin flips until you have $N$ or 0, $p_k = \tfrac12p_{k+1} + \tfrac12p_{k-1}$ with $p_0 = 0$, $p_N = 1$, so $p_k = k/N$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many ways can you pay 10p using only 1p and 2p coins (order does not matter)?`, 6, [R`Choose the number of 2p coins: 0 to 5.`], R`6 ways.`)] }
    ],
    figures: [
      { s: 1, title: 'Fibonacci ratios and Binet', caption: 'The ratio F_{n+1}/F_n homes in on φ = 1.618…, alternating above and below.', params: { controls: [S('n', 'n', 1, 25, 1, 10)],
        plots: [{ x: [1, 25], y: [0.9, 2.1], zero: false, xlabel: 'n', ylabel: 'F₍ₙ₊₁₎ / Fₙ', n: 24, curves: () => { const F = [0, 1, 1]; for (let i = 3; i < 30; i++) F.push(F[i - 1] + F[i - 2]); return [{ f: (n) => F[Math.round(n) + 1] / F[Math.round(n)] }, { f: () => (1 + Math.sqrt(5)) / 2, color: 'ink3', dash: [4, 4], label: 'φ' }]; }, pts: (v) => { const F = [0, 1, 1]; for (let i = 3; i < 30; i++) F.push(F[i - 1] + F[i - 2]); return [{ x: v.n, y: F[v.n + 1] / F[v.n] }]; } }],
        readout: (v) => { const F = [0, 1, 1]; for (let i = 3; i < 30; i++) F.push(F[i - 1] + F[i - 2]); const ph = (1 + Math.sqrt(5)) / 2; return [['Fₙ', String(F[v.n])], ['Binet φⁿ/√5', f(Math.pow(ph, v.n) / Math.sqrt(5), 6)]]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Gambler’s ruin', desc: 'Start with k coins, bet 1 each round, win with probability p, stop at 0 or N. The curve is the chance of reaching N, from solving the recurrence.',
        tasks: ['With p = 0.5, check that the chance is k/N.', 'With p = 0.48 (a slightly unfair casino), how much does your chance of doubling 50 coins drop?', 'Why does a tiny edge matter so much over many bets?'],
        params: { aspect: 0.45, controls: [S('p', 'Win probability p', 0.3, 0.7, 0.005, 0.5), S('N', 'Target N', 4, 100, 1, 20), S('k', 'Start k', 1, 99, 1, 10)],
          plots: [{ x: (v) => [0, v.N], y: [0, 1], xlabel: 'starting coins k', ylabel: 'P(reach N)', curves: (v) => [{ f: (k) => { const q = 1 - v.p; if (Math.abs(v.p - 0.5) < 1e-6) return k / v.N; const r = q / v.p; return (1 - Math.pow(r, k)) / (1 - Math.pow(r, v.N)); } }], pts: (v) => { const k = Math.min(v.k, v.N), q = 1 - v.p; const val = Math.abs(v.p - 0.5) < 1e-6 ? k / v.N : (1 - Math.pow(q / v.p, k)) / (1 - Math.pow(q / v.p, v.N)); return [{ x: k, y: val }]; } }],
          readout: (v) => { const k = Math.min(v.k, v.N), q = 1 - v.p; const val = Math.abs(v.p - 0.5) < 1e-6 ? k / v.N : (1 - Math.pow(q / v.p, k)) / (1 - Math.pow(q / v.p, v.N)); return [['P(reach N)', f(val, 4)], ['expected bets (fair game) k(N − k)', f(k * (v.N - k))]]; } } },
      { sim: 'explore', title: 'Coin change counter', desc: 'Number of ways to make n pence from the chosen coins: the coefficients of a product of geometric series.',
        tasks: ['How many ways to make 100p from 1p, 2p and 5p?', 'Add 10p and 20p coins. How fast does the count grow?'],
        params: { aspect: 0.45, controls: [S('n', 'Amount n (p)', 1, 200, 1, 50), { type: 'select', id: 'set', label: 'Coins', value: '1,2,5', options: [['1,2', '1p, 2p'], ['1,2,5', '1p, 2p, 5p'], ['1,2,5,10', '1p, 2p, 5p, 10p'], ['1,2,5,10,20,50', '1p, 2p, 5p, 10p, 20p, 50p']] }],
          plots: [{ x: [0, 200], y: 'auto', xlabel: 'n', ylabel: 'ways (log₁₀)', n: 200, curves: (v) => { const coins = v.set.split(',').map(Number); const W = new Array(201).fill(0); W[0] = 1; coins.forEach((c) => { for (let i = c; i <= 200; i++) W[i] += W[i - c]; }); return [{ f: (x) => Math.log10(W[Math.round(x)]) }]; }, vlines: (v) => [{ x: v.n }] }],
          readout: (v) => { const coins = v.set.split(',').map(Number); const W = new Array(201).fill(0); W[0] = 1; coins.forEach((c) => { for (let i = c; i <= 200; i++) W[i] += W[i - c]; }); return [['ways to make ' + v.n + 'p', String(W[v.n])]]; } } }
    ],
    formulas: [['Characteristic equation', 'a_n = pa_{n-1} + qa_{n-2} \\to x^2 = px + q'], ['General solution', 'a_n = A\\alpha^n + B\\beta^n\\ (\\alpha \\ne \\beta),\\ (A + Bn)\\alpha^n'], ['Binet', 'F_n = \\dfrac{\\varphi^n - \\psi^n}{\\sqrt5}'], ['Catalan', 'C_n = \\dfrac1{n + 1}\\binom{2n}n'], ['Geometric series', '\\dfrac1{1 - x} = \\sum x^n'], ['Gambler’s ruin (fair)', 'P(\\text{reach }N) = k/N']],
    problems: [
      P('concept', 'mcq', 'Domino tilings', R`The number of ways to tile a $2\times n$ strip with $1\times2$ dominoes follows which recurrence?`, 1, [R`Look at the left end: one vertical domino, or two horizontal ones.`], R`$t_n = t_{n-1} + t_{n-2}$ (Fibonacci).`, { options: ['$t_n = 2t_{n-1}$', '$t_n = t_{n-1} + t_{n-2}$', '$t_n = t_{n-1} + 1$', '$t_n = nt_{n-1}$'] }),
      P('concept', 'mcq', 'Characteristic roots', R`The recurrence $a_n = 4a_{n-1} - 4a_{n-2}$ has characteristic root(s)…`, 2, [R`$x^2 - 4x + 4 = 0$.`], R`A repeated root 2, so $a_n = (A + Bn)2^n$.`, { options: ['1 and 4', '−2 and 2', '2 (repeated)', '4 (repeated)'] }),
      P('concept', 'mcq', 'Spot the sequence', R`A counting problem gives 1, 2, 5, 14, 42 for $n = 1..5$. Most likely the answer is…`, 3, [R`Compare with famous sequences.`], R`The Catalan numbers.`, { options: ['Fibonacci', 'powers of 3', 'triangular numbers', 'Catalan numbers'] }),
      P('concept', 'mcq', 'Generating function', R`$\dfrac{1}{1 - 2x}$ is the generating function of…`, 0, [R`Geometric series with ratio $2x$.`], R`$1, 2, 4, 8, \dots$, i.e. $a_n = 2^n$.`, { options: ['$2^n$', '$n + 2$', '$2n$', '$n^2$'] }),
      P('core', 'num', 'Binary strings', R`How many binary strings of length 10 have no two consecutive 1s?`, 144, [R`$s_n = s_{n-1} + s_{n-2}$ with $s_1 = 2$, $s_2 = 3$.`], R`$2, 3, 5, 8, \dots$: $s_{10} = 144$.`),
      P('core', 'num', 'Solve a recurrence', R`$a_n = 3a_{n-1} + 4$ with $a_0 = 1$. Find $a_5$.`, (() => { let a = 1; for (let i = 0; i < 5; i++) a = 3 * a + 4; return a; })(), [R`Fixed point $L = -2$: $a_n = -2 + 3\cdot3^n$.`], R`$a_5 = -2 + 3\cdot243 = 727$.`),
      P('core', 'num', 'Catalan', R`How many ways can 5 pairs of brackets be correctly matched?`, 42, [R`$C_5 = \tfrac16\binom{10}5$.`], R`42.`),
      P('core', 'num', 'Fair game', R`You have 3 coins and bet 1 on fair coin flips until you have 10 or nothing. What is the probability you reach 10?`, 0.3, [R`Fair gambler's ruin: $k/N$.`], R`$3/10 = 0.3$.`),
      P('core', 'num', 'Tribonacci stairs', R`How many ways can you climb 7 stairs taking 1, 2 or 3 steps at a time?`, 44, [R`$a_n = a_{n-1} + a_{n-2} + a_{n-3}$, $a_0 = 1$, $a_1 = 1$, $a_2 = 2$.`], R`1, 1, 2, 4, 7, 13, 24, 44: $a_7 = 44$.`),
      P('olympiad', 'num', 'Regions of a circle', R`Place $n$ points on a circle in general position and draw all chords. With $n = 6$, into how many regions is the disc divided?`, 1 + C(6, 2) + C(6, 4), [R`Each chord adds a region, and each interior crossing adds one more.`, R`Regions $= 1 + \binom n2 + \binom n4$.`], R`$1 + 15 + 15 = 31$ (not 32, despite the pattern 1, 2, 4, 8, 16).`),
      P('olympiad', 'num', 'Derangement recurrence', R`Derangements satisfy $D_n = (n - 1)(D_{n-1} + D_{n-2})$ with $D_1 = 0$, $D_2 = 1$. Find $D_7$.`, (() => { const D = [1, 0, 1]; for (let n = 3; n <= 7; n++) D.push((n - 1) * (D[n - 1] + D[n - 2])); return D[7]; })(), [R`Compute $D_3 = 2$, $D_4 = 9$, …`], R`2, 9, 44, 265, 1854: $D_7 = 1854$.`),
      P('olympiad', 'num', 'Coin generating function', R`How many ways can you pay 20p with 1p, 2p and 5p coins?`, (() => { const W = new Array(21).fill(0); W[0] = 1; [1, 2, 5].forEach((c) => { for (let i = c; i <= 20; i++) W[i] += W[i - c]; }); return W[20]; })(), [R`Fix the number of 5p coins (0 to 4); for each, the rest is 1p and 2p.`], R`With $k$ fives the remaining $20 - 5k$ can be made in $\lfloor(20 - 5k)/2\rfloor + 1$ ways: $11 + 8 + 6 + 3 + 1 = 29$.`)
    ]
  });
  PB.addDrills('math-recurrences', [
    { title: 'Linear recurrence', gen: (r) => { const p = r.int(1, 3), q = r.int(1, 3), a0 = r.int(0, 3), a1 = r.int(1, 4), n = r.int(4, 7); const a = [a0, a1]; for (let i = 2; i <= n; i++) a.push(p * a[i - 1] + q * a[i - 2]); return { q: R`<p>$a_n = ${p}a_{n-1} + ${q}a_{n-2}$, $a_0 = ${a0}$, $a_1 = ${a1}$. Find $a_${n}$.</p>`, answer: a[n], tol: 0.0001, solution: R`<p>Terms: ${a.join(', ')}.</p>` }; } },
    { title: 'Stair climbing', gen: (r) => { const n = r.int(4, 15); const a = [1, 1]; for (let i = 2; i <= n; i++) a.push(a[i - 1] + a[i - 2]); return { q: R`<p>Ways to climb ${n} stairs with steps of 1 or 2?</p>`, answer: a[n], tol: 0.0001, solution: R`<p>Fibonacci: ${a[n]}.</p>` }; } },
    { title: 'Catalan number', gen: (r) => { const n = r.int(2, 9); return { q: R`<p>Find the Catalan number $C_${n} = \tfrac1{${n + 1}}\binom{${2 * n}}{${n}}$.</p>`, answer: C(2 * n, n) / (n + 1), tol: 0.0001, solution: R`<p>${C(2 * n, n) / (n + 1)}.</p>` }; } }
  ]);

  /* ===================== 22. Graph theory ===================== */
  const GRAPHS = {
    k4: { n: 4, e: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]], name: 'K₄ (complete)' },
    house: { n: 5, e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4]], name: 'house' },
    k5: { n: 5, e: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]], name: 'K₅ (not planar)' },
    cube: { n: 8, e: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]], name: 'cube' },
    k33: { n: 6, e: [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]], name: 'K₃,₃ (utilities)' },
    pete: { n: 10, e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [1, 6], [2, 7], [3, 8], [4, 9], [5, 7], [7, 9], [9, 6], [6, 8], [8, 5]], name: 'Petersen' }
  };
  const segCross = (a, b, c, d) => { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0; };
  PB.addChapter({
    id: 'math-graphs', subject: 'maths', num: 22, part: 'Olympiad Topics',
    title: 'Graph Theory',
    subtitle: R`Dots and lines. Degrees and the handshake lemma, walks and Euler trails, trees, planar graphs and Euler's formula, colouring, and Ramsey theory.`,
    big: 'A graph is just dots (vertices) joined by lines (edges): cities and roads, people and friendships, atoms and bonds. Asking simple questions, like "can I cross every bridge once?", leads to beautiful results that need no algebra at all.',
    goals: ['Use degrees and the handshake lemma', 'Decide when an Euler trail or circuit exists', 'Count edges in trees', 'Apply Euler’s formula V − E + F = 2 for planar graphs', 'Reason about colourings and Ramsey numbers'],
    sections: [
      { title: 'Vertices, edges and degrees', html: R`
<p>A <strong>graph</strong> has vertices and edges. The <strong>degree</strong> of a vertex is the number of edges at it. Each edge has two ends, so</p>
<div class="key"><p><strong>Handshake lemma:</strong> $\sum\deg v = 2E$. In particular, the number of odd-degree vertices is even.</p></div>
<p>So at a party, the number of people who shook an odd number of hands is even. And there is no graph with degrees 3, 3, 3, 2, 2 (sum 13 is odd).</p>
<p>The <strong>complete graph</strong> $K_n$ joins every pair: it has $\binom n2$ edges. A graph is <strong>connected</strong> if you can walk from any vertex to any other.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A graph has 10 vertices, each of degree 3. How many edges does it have?`, 15, [R`Handshake lemma.`], R`$10\times3/2 = 15$.`)] },
      { title: 'Euler trails and the bridges of Königsberg', html: R`
<p>Can you walk along every edge exactly once? Euler (1736) answered this for the seven bridges of Königsberg. Every time a walk passes through a vertex it uses two edges, so:</p>
<div class="key"><p>A connected graph has an <strong>Euler circuit</strong> (ending where it started) if and only if every vertex has even degree, and an <strong>Euler trail</strong> if and only if exactly 0 or 2 vertices have odd degree (then the trail must start and end at those two).</p></div>
<p>Königsberg had four land masses of degrees 5, 3, 3, 3: four odd vertices, so no walk exists. The similar-sounding question of visiting every <em>vertex</em> once (a Hamiltonian cycle) has no simple test and is famously hard.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The "house" shape (a square with a triangle roof) has two vertices of degree 3 and three of degree 2. Can it be drawn without lifting the pen?`, ['Yes, starting at a degree-3 vertex', 'Yes, starting anywhere', 'No', 'Only if you retrace an edge'], 0, [R`Count odd-degree vertices.`], R`Exactly two odd vertices: an Euler trail exists, and it must start at one of them.`)] },
      { title: 'Trees and planar graphs', html: R`
<p>A <strong>tree</strong> is a connected graph with no cycles. Every tree on $n$ vertices has exactly $n - 1$ edges, and there is exactly one path between any two vertices. Removing any edge disconnects it; adding any edge creates a cycle.</p>
<p>A graph is <strong>planar</strong> if it can be drawn without crossings. Then the edges divide the plane into faces (counting the outside), and</p>
<div class="key"><p><strong>Euler's formula:</strong> $V - E + F = 2$ for any connected planar graph. For a cube: $8 - 12 + 6 = 2$.</p></div>
<p>Each face is bounded by at least 3 edges, so $3F \le 2E$, giving $E \le 3V - 6$. $K_5$ has $10 > 9$ edges, so it is not planar; nor is $K_{3,3}$, the "three houses, three utilities" puzzle. Try the lab: you will always be left with a crossing.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A connected planar graph has 10 vertices and 15 edges. How many faces does it have?`, 7, [R`$V - E + F = 2$.`], R`$F = 2 - 10 + 15 = 7$.`)] },
      { title: 'Colouring and Ramsey theory', html: R`
<p>Colour the vertices so that adjacent vertices differ. The minimum number of colours is the <strong>chromatic number</strong>. Odd cycles need 3; complete graphs $K_n$ need $n$; and the <strong>four colour theorem</strong> says every planar map needs at most 4 (proved in 1976 with a computer).</p>
<p><strong>Ramsey theory</strong>: total disorder is impossible. Among any 6 people, either 3 all know each other or 3 are mutual strangers. Proof: pick one person; of the other 5, at least 3 are (say) friends of theirs (pigeonhole). If any two of those 3 are friends, we have a friendly triangle; if not, those 3 are strangers. Five people are not enough, so $R(3, 3) = 6$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the chromatic number of a cycle with 7 vertices?`, 3, [R`Alternate two colours round the cycle. What happens at the end?`], R`An odd cycle cannot be 2-coloured, so it needs 3.`)] }
    ],
    figures: [
      { s: 0, title: 'Drag the vertices', caption: 'Drag any vertex around. Degrees, edges and crossings update live. Can you untangle K₃,₃ or K₅? (You can’t: they are not planar.)', params: { aspect: 0.55, picFrac: 1, controls: [{ type: 'select', id: 'g', label: 'Graph', value: 'k33', options: Object.keys(GRAPHS).map((k) => [k, GRAPHS[k].name]), onChange: (v) => { v.pos = null; } }],
        init: (v) => { v.pos = null; },
        drag: (v) => { const G = GRAPHS[v.g]; return Array.from({ length: G.n }, (_, i) => ({ pic: true, get: (vv, b) => { if (!vv.pos || vv.pos.length !== G.n) return null; return [b.x + vv.pos[i][0] * b.w, b.y + vv.pos[i][1] * b.h]; }, set: (vv, x, y, b) => { vv.pos[i] = [Math.max(0.03, Math.min(0.97, (x - b.x) / b.w)), Math.max(0.05, Math.min(0.95, (y - b.y) / b.h))]; } })); },
        draw: (ctx, Cc, v, b, U) => { const G = GRAPHS[v.g]; if (!v.pos || v.pos.length !== G.n) v.pos = Array.from({ length: G.n }, (_, i) => { const a = 2 * Math.PI * i / G.n - Math.PI / 2, rr = v.g === 'pete' && i >= 5 ? 0.2 : v.g === 'cube' && i >= 4 ? 0.18 : 0.38; return [0.5 + rr * Math.cos(v.g === 'pete' ? a * 1 : a) * (b.h / b.w), 0.5 + rr * Math.sin(a)]; }); const P = v.pos.map((q) => [b.x + q[0] * b.w, b.y + q[1] * b.h]); let cross = 0; G.e.forEach((e, i) => G.e.forEach((g, j) => { if (j > i && e.indexOf(g[0]) < 0 && e.indexOf(g[1]) < 0 && segCross(P[e[0]], P[e[1]], P[g[0]], P[g[1]])) cross++; })); G.e.forEach((e) => { let bad = false; G.e.forEach((g) => { if (g !== e && e.indexOf(g[0]) < 0 && e.indexOf(g[1]) < 0 && segCross(P[e[0]], P[e[1]], P[g[0]], P[g[1]])) bad = true; }); ctx.strokeStyle = bad ? Cc.rust : Cc.accent; ctx.lineWidth = bad ? 2.5 : 2; ctx.beginPath(); ctx.moveTo(P[e[0]][0], P[e[0]][1]); ctx.lineTo(P[e[1]][0], P[e[1]][1]); ctx.stroke(); }); const deg = new Array(G.n).fill(0); G.e.forEach((e) => { deg[e[0]]++; deg[e[1]]++; }); P.forEach((p, i) => U.text(ctx, String(deg[i]), p[0] + 10, p[1] - 10, Cc.ink2, U.ui(11, 700))); v.cross = cross; v.deg = deg; U.text(ctx, cross ? cross + ' crossing' + (cross > 1 ? 's' : '') : 'no crossings: a planar drawing!', b.x + 10, b.y + 18, cross ? Cc.rust : Cc.good, U.ui(13, 700)); },
        readout: (v) => { const G = GRAPHS[v.g], deg = v.deg || []; const odd = deg.filter((d) => d % 2).length; return [['V, E', G.n + ', ' + G.e.length], ['sum of degrees', String(deg.reduce((a, d) => a + d, 0))], ['odd vertices', String(odd)], ['Euler trail?', odd === 0 ? 'circuit' : odd === 2 ? 'trail' : 'no'], ['E ≤ 3V − 6?', G.e.length <= 3 * G.n - 6 ? 'yes' : 'no: not planar']]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Greedy colouring', desc: 'Colour random graphs greedily: each vertex gets the smallest colour not used by its neighbours. Greedy may use more colours than needed.',
        tasks: ['How many colours does greedy use on average as the edge probability rises?', 'Find a seed where greedy uses more colours than the best possible.'],
        params: { aspect: 0.55, picFrac: 1, controls: [S('n', 'Vertices', 4, 16, 1, 10), S('p', 'Edge probability', 0.05, 0.9, 0.05, 0.3), S('seed', 'Random seed', 1, 50, 1, 7)],
          draw: (ctx, Cc, v, b, U) => { const r = PB.rng(v.seed * 101 + v.n); const P = Array.from({ length: v.n }, (_, i) => { const a = 2 * Math.PI * i / v.n; return [b.x + b.w / 2 + Math.cos(a) * Math.min(b.w, b.h) * 0.4, b.y + b.h / 2 + Math.sin(a) * Math.min(b.w, b.h) * 0.4]; }); const E = []; for (let i = 0; i < v.n; i++) for (let j = i + 1; j < v.n; j++) if (r() < v.p) E.push([i, j]); const col = new Array(v.n).fill(-1); for (let i = 0; i < v.n; i++) { const used = new Set(E.filter((e) => e.indexOf(i) >= 0).map((e) => col[e[0] === i ? e[1] : e[0]])); let c = 0; while (used.has(c)) c++; col[i] = c; } const pal = [Cc.accent, Cc.rust, Cc.teal, Cc.points, Cc.good, '#b05cff', '#e0489a', Cc.ink3, '#7c5a2e', '#2ec4c4']; ctx.strokeStyle = U.alpha(Cc.ink3, 0.6); ctx.lineWidth = 1.4; E.forEach((e) => { ctx.beginPath(); ctx.moveTo(P[e[0]][0], P[e[0]][1]); ctx.lineTo(P[e[1]][0], P[e[1]][1]); ctx.stroke(); }); P.forEach((p, i) => { U.dot(ctx, p[0], p[1], 10, pal[col[i] % pal.length], Cc.ink); }); v.colours = Math.max.apply(null, col) + 1; v.E = E.length; },
          readout: (v) => [['edges', String(v.E || 0)], ['colours used by greedy', String(v.colours || 0)]] } }
    ],
    formulas: [['Handshake lemma', '\\sum\\deg v = 2E'], ['Complete graph', 'E(K_n) = \\binom n2'], ['Euler trail', '0\\text{ or }2\\text{ odd vertices}'], ['Trees', 'E = V - 1'], ['Euler’s formula', 'V - E + F = 2'], ['Planar bound', 'E \\le 3V - 6'], ['Ramsey', 'R(3, 3) = 6']],
    problems: [
      P('concept', 'mcq', 'Odd vertices', R`In any graph, the number of vertices with odd degree is…`, 0, [R`Handshake lemma.`], R`Always even.`, { options: ['always even', 'always odd', 'at most 2', 'equal to the number of edges'] }),
      P('concept', 'mcq', 'Königsberg', R`Why is there no walk crossing each of Königsberg's seven bridges exactly once?`, 2, [R`Count the odd vertices.`], R`All four land masses have odd degree; an Euler trail allows at most two.`, { options: ['There are too many bridges', 'The graph is not connected', 'Four vertices have odd degree', 'The graph has a cycle'] }),
      P('concept', 'mcq', 'Tree edges', R`A tree with 30 vertices has how many edges?`, 1, [R`$E = V - 1$.`], R`29.`, { options: ['30', '29', '31', '60'] }),
      P('concept', 'mcq', 'Planarity', R`Which graph is planar?`, 3, [R`Use $E \le 3V - 6$, and recall the two famous non-planar graphs.`], R`The cube graph can be drawn flat (a square inside a square). $K_5$ and $K_{3,3}$ cannot.`, { options: ['$K_5$', '$K_{3,3}$', '$K_6$', 'the cube graph'] }),
      P('core', 'num', 'Complete graph', R`A round-robin tournament has 12 teams. How many matches are played?`, C(12, 2), [R`Edges of $K_{12}$.`], R`$\binom{12}2 = 66$.`),
      P('core', 'num', 'Faces of a polyhedron', R`A convex polyhedron has 12 vertices and 30 edges. How many faces does it have?`, 20, [R`$V - E + F = 2$.`], R`$F = 20$ (an icosahedron).`),
      P('core', 'num', 'Planar edge limit', R`What is the largest number of edges a simple planar graph with 8 vertices can have?`, 18, [R`$3V - 6$.`], R`$3\times8 - 6 = 18$.`),
      P('core', 'num', 'Degree sum', R`A graph has 7 vertices with degrees 1, 2, 2, 3, 3, 4, 5. How many edges does it have?`, 10, [R`Half the degree sum.`], R`$20/2 = 10$.`),
      P('core', 'num', 'Spanning trees', R`How many different spanning trees does the complete graph $K_4$ have? (Cayley: $n^{n-2}$.)`, 16, [R`$4^{4-2}$.`], R`16.`),
      P('olympiad', 'num', 'Soccer ball', R`A football is a polyhedron made of pentagons and hexagons, with 3 faces meeting at each vertex. How many pentagons must it have?`, 12, [R`Let there be $p$ pentagons and $h$ hexagons: $E = (5p + 6h)/2$, $V = (5p + 6h)/3$, $F = p + h$.`, R`Substitute into $V - E + F = 2$.`], R`The hexagons cancel and $p/6 = 2$, so $p = 12$ whatever the number of hexagons.`),
      P('olympiad', 'num', 'Ramsey', R`What is the smallest number of people such that among them there must be 3 mutual friends or 3 mutual strangers?`, 6, [R`Show 5 is not enough (a pentagon of friendships).`], R`$R(3, 3) = 6$.`),
      P('olympiad', 'num', 'Triangle-free', R`What is the largest number of edges in a graph on 10 vertices with no triangle? (Mantel's theorem.)`, 25, [R`Split the vertices into two groups and join every cross pair.`], R`$\lfloor n^2/4\rfloor = 25$, achieved by $K_{5,5}$.`)
    ]
  });
  PB.addDrills('math-graphs', [
    { title: 'Edges of K_n', gen: (r) => { const n = r.int(3, 30); return { q: R`<p>How many edges does the complete graph $K_{${n}}$ have?</p>`, answer: n * (n - 1) / 2, tol: 0.0001, solution: R`<p>$\binom{${n}}{2} = ${n * (n - 1) / 2}$.</p>` }; } },
    { title: 'Euler’s formula', gen: (r) => { const V = r.int(4, 30), F = r.int(3, 30); const E = V + F - 2; return { q: R`<p>A connected planar graph has ${V} vertices and ${F} faces. How many edges?</p>`, answer: E, tol: 0.0001, solution: R`<p>$E = V + F - 2 = ${E}$.</p>` }; } },
    { title: 'Regular graph', gen: (r) => { const n = 2 * r.int(2, 15), d = r.int(2, 6); return { q: R`<p>A graph has ${n} vertices, each of degree ${d}. How many edges?</p>`, answer: n * d / 2, tol: 0.0001, solution: R`<p>$${n}\times${d}/2 = ${n * d / 2}$.</p>` }; } }
  ]);

  /* ===================== 23. Games and invariants ===================== */
  PB.addChapter({
    id: 'math-games', subject: 'maths', num: 23, part: 'Olympiad Topics',
    title: 'Games, Invariants and Strategy',
    subtitle: R`Who wins, and how? Winning and losing positions, subtraction games, Nim and the XOR trick, symmetry strategies, strategy stealing, monovariants and colouring arguments.`,
    big: 'In a two-player game with no luck, every position is either a win or a loss for the player to move, and you can work out which by going backwards from the end. Many puzzles also hide a quantity that never changes, or only ever goes down: find it and the puzzle falls.',
    goals: ['Classify positions as winning (N) or losing (P)', 'Solve subtraction games by finding the pattern', 'Win at Nim using binary XOR', 'Use symmetry and strategy-stealing arguments', 'Prove impossibility with invariants, monovariants and colourings'],
    sections: [
      { title: 'Winning and losing positions', html: R`
<p>In a <strong>subtraction game</strong>, players take turns removing 1, 2 or 3 counters from a pile; whoever takes the last counter wins. Work backwards:</p>
<ul><li>0 counters: the player to move has already lost. Call it a <strong>P-position</strong> (the Previous player wins).</li>
<li>1, 2, 3: you can move to 0, so they are <strong>N-positions</strong> (the Next player wins).</li>
<li>4: every move goes to an N-position, so 4 is a P-position. Then 5, 6, 7 are N, 8 is P, …</li></ul>
<div class="key"><p>A position is P if <em>every</em> move leads to an N-position, and N if <em>some</em> move leads to a P-position. The winning strategy: always move to a P-position.</p></div>
<p>Here the P-positions are the multiples of 4: if your opponent leaves you a multiple of 4, you are lost; otherwise, take enough to leave one.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In the 1-2-3 game with 21 counters, how many should the first player take to win?`, 1, [R`Leave a multiple of 4.`], R`Take 1, leaving 20.`)] },
      { title: 'Nim', html: R`
<p>In <strong>Nim</strong> there are several piles; a move takes any number of counters from one pile; taking the last counter wins. Bouton (1901) found the complete answer:</p>
<div class="key"><p>Write the pile sizes in binary and add them <strong>without carrying</strong> (XOR, written $\oplus$). The position is a P-position exactly when this <strong>nim-sum</strong> is 0.</p></div>
<p>Example: piles 3, 5, 6: $011 \oplus 101 \oplus 110 = 000$, so the player to move loses. With piles 3, 4, 5: $011 \oplus 100 \oplus 101 = 010 \ne 0$, so you can win: change one pile so the nim-sum becomes 0 (take 2 from the pile of 3, leaving 1, 4, 5).</p>
<p>The Sprague–Grundy theorem says every such game is secretly a Nim pile, which makes Nim the master key to impartial games.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Find the nim-sum $7 \oplus 5 \oplus 3$.`, 7 ^ 5 ^ 3, [R`$111 \oplus 101 = 010$, then $\oplus\,011$.`], R`$010 \oplus 011 = 001 = 1$.`)] },
      { title: 'Symmetry and strategy stealing', html: R`
<p><strong>Symmetry.</strong> Two players take turns putting coins on a round table without overlapping; whoever cannot move loses. The first player wins: put the first coin exactly in the centre, then always copy the opponent's move reflected through the centre. Whenever the opponent finds room, so do you.</p>
<p><strong>Strategy stealing.</strong> In Hex, or in Chomp (players eat squares of a chocolate bar, and everything above and to the right; the poisoned bottom-left square loses), the first player can win, though nobody knows how in general. Suppose the second player had a winning strategy. The first player makes a harmless move and then pretends to be second, "stealing" that strategy. Contradiction. So the first player must win.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In the round-table coin game, why does the first player win?`, ['The table is round', 'Copying through the centre is always possible after taking the centre', 'Coins are indistinguishable', 'The second player moves randomly'], 1, [R`After your reply the position is symmetric again.`], R`Taking the centre first and mirroring every move guarantees a reply is always available.`)] },
      { title: 'Invariants, monovariants and colourings', html: R`
<p>An <strong>invariant</strong> never changes; a <strong>monovariant</strong> only moves one way. Both prove things impossible or guarantee that a process stops.</p>
<p><strong>Colouring.</strong> Can a $10\times10$ board be tiled by $1\times4$ strips? Colour the squares diagonally in 4 colours ($i + j \bmod 4$); each strip covers one of each colour. But the colours appear 25, 26, 25, 24 times. Impossible.</p>
<p><strong>Monovariant.</strong> Some people sit in a room; anyone with more enemies than friends inside switches rooms. Does this stop? Yes: each switch strictly reduces the total number of enemy pairs sitting together, a positive whole number, so it cannot decrease for ever.</p>
<p><strong>Parity.</strong> The 15-puzzle with two tiles swapped cannot be solved: every move changes the permutation parity together with the blank's position, a combination that is invariant.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`The numbers 1 to 10 are written down. You may replace any two by their sum. After 9 moves one number is left. It is…`, ['always 55', 'always odd', 'it depends on the moves', 'always 10'], 0, [R`What happens to the total?`], R`The total is invariant: always 55.`)] }
    ],
    figures: [
      { s: 1, title: 'Play Nim against the computer', caption: 'Three piles. Choose a pile and how many to take, then press Take. The computer then plays the perfect XOR strategy. Can you leave it a nim-sum of 0?', params: { picFrac: 1, aspect: 0.4, controls: [{ type: 'select', id: 'pile', label: 'Pile', value: '0', options: [['0', 'Pile A'], ['1', 'Pile B'], ['2', 'Pile C']] }, S('take', 'Take', 1, 9, 1, 1)],
        buttons: [{ label: 'Take', primary: true, action: (v) => { const i = +v.pile; if (v.over || v.piles[i] < 1) return; const took = Math.min(v.take, v.piles[i]); v.piles[i] -= took; v.msg = 'You took ' + took + ' from pile ' + 'ABC'[i] + '.'; if (v.piles.every((x) => !x)) { v.over = 'You win!'; v.wins = (v.wins || 0) + 1; return; } const x = v.piles[0] ^ v.piles[1] ^ v.piles[2]; let done = false; if (x) for (let j = 0; j < 3 && !done; j++) { const t = v.piles[j] ^ x; if (t < v.piles[j]) { v.msg += ' Computer takes ' + (v.piles[j] - t) + ' from ' + 'ABC'[j] + '.'; v.piles[j] = t; done = true; } } if (!done) { const j = v.piles.findIndex((p) => p > 0); v.piles[j]--; v.msg += ' Computer (losing) takes 1 from ' + 'ABC'[j] + '.'; } if (v.piles.every((p) => !p)) v.over = 'The computer took the last counter.'; } }, { label: 'New game', action: (v) => { const r = PB.rng(Date.now() % 100000); v.piles = [r.int(1, 9), r.int(1, 9), r.int(1, 9)]; v.over = null; v.msg = 'New game: your move.'; } }],
        init: (v) => { v.piles = [3, 5, 7]; v.msg = 'Your move. (3, 5, 7 has nim-sum 1, so you can win!)'; },
        draw: (ctx, Cc, v, b, U) => { const w = b.w / 3; v.piles.forEach((p, i) => { const x = b.x + w * i + w / 2; for (let k = 0; k < p; k++) U.dot(ctx, x, b.y + b.h - 26 - k * 18, 8, [Cc.accent, Cc.rust, Cc.teal][i], Cc.ink); U.text(ctx, 'ABC'[i] + ': ' + p + ' = ' + p.toString(2).padStart(4, '0'), x, b.y + b.h - 6, Cc.ink, U.mono(12), 'center'); }); U.text(ctx, v.over || v.msg || '', b.x + 8, b.y + 16, v.over ? Cc.points : Cc.ink2, U.ui(12.5, 700)); },
        readout: (v) => [['nim-sum', String(v.piles[0] ^ v.piles[1] ^ v.piles[2]) + ' (' + (v.piles[0] ^ v.piles[1] ^ v.piles[2] ? 'you can win' : 'losing for the mover') + ')'], ['your wins', String(v.wins || 0)]] } }
    ],
    labs: [
      { sim: 'explore', title: 'Subtraction game table', desc: 'Positions 0…40 for a game where you may remove any number from a chosen set S. Red = P (losing for the mover), blue = N. Find the pattern for each S.',
        tasks: ['S = {1, 2, 3}: check the P-positions are the multiples of 4.', 'S = {1, 3, 4}: what is the period of the pattern?', 'S = {2, 5}: is there a pattern at all?'],
        params: { aspect: 0.4, picFrac: 1, controls: [{ type: 'select', id: 'S', label: 'Allowed moves S', value: '1,2,3', options: [['1,2', '{1, 2}'], ['1,2,3', '{1, 2, 3}'], ['1,3,4', '{1, 3, 4}'], ['2,5', '{2, 5}'], ['1,4', '{1, 4}'], ['1,2,6', '{1, 2, 6}']] }],
          draw: (ctx, Cc, v, b, U) => { const S2 = v.S.split(',').map(Number), N = 41, Pp = []; for (let n = 0; n < N; n++) Pp.push(!S2.some((s) => s <= n && Pp[n - s])); const cols = 14, s = Math.min(b.w / cols, b.h / 3.3); for (let n = 0; n < N; n++) { const x = b.x + (n % cols) * s + 4, y = b.y + Math.floor(n / cols) * s + 4; ctx.fillStyle = Pp[n] ? U.alpha(Cc.rust, 0.85) : U.alpha(Cc.accent, 0.25); ctx.fillRect(x, y, s - 6, s - 6); U.text(ctx, String(n), x + (s - 6) / 2, y + (s - 6) / 2 + 4, Pp[n] ? '#fff' : Cc.ink, U.mono(11), 'center'); } v.Pl = Pp.map((p, i) => (p ? i : -1)).filter((i) => i >= 0).slice(0, 12).join(', '); },
          readout: (v) => [['P-positions', v.Pl || '']] } }
    ],
    formulas: [['P and N', 'P: \\text{all moves} \\to N;\\ N: \\text{some move} \\to P'], ['Nim', 'a_1\\oplus a_2\\oplus\\cdots = 0 \\iff P\\text{-position}'], ['1-to-k subtraction', 'P\\text{-positions} = \\text{multiples of } k + 1'], ['Monovariant', '\\text{strictly decreasing positive integer} \\Rightarrow \\text{process stops}']],
    problems: [
      P('concept', 'mcq', 'P-position', R`A position from which every move leads to a position where the next player can win is…`, 0, [R`The player to move is stuck.`], R`A P-position: the player who just moved wins.`, { options: ['a P-position', 'an N-position', 'a draw', 'impossible'] }),
      P('concept', 'mcq', 'Nim-sum zero', R`In Nim, if the nim-sum is zero on your turn, then…`, 2, [R`Bouton's theorem.`], R`Against perfect play you lose.`, { options: ['you can win immediately', 'it is a draw', 'you lose against perfect play', 'you must take the biggest pile'] }),
      P('concept', 'mcq', 'Chomp', R`In Chomp on a rectangular bar, which player can force a win?`, 0, [R`Strategy stealing.`], R`The first player (though the strategy is generally unknown).`, { options: ['the first player', 'the second player', 'neither', 'it depends on the bar’s colour'] }),
      P('concept', 'mcq', 'Monovariant', R`Why must a process stop if a positive integer quantity strictly decreases at every step?`, 3, [R`Positive integers cannot fall for ever.`], R`A strictly decreasing sequence of positive integers is finite.`, { options: ['Because of symmetry', 'Because the quantity is even', 'Because steps are random', 'Positive integers cannot decrease for ever'] }),
      P('core', 'num', 'Take 1 to 5', R`Players remove 1 to 5 counters; taking the last wins. With 50 counters, how many should the first player take?`, 2, [R`P-positions are multiples of 6.`], R`Leave 48: take 2.`),
      P('core', 'num', 'Nim move', R`Nim piles 4, 6, 9. The winning move reduces the pile of 9 to how many?`, 4 ^ 6, [R`Make the nim-sum zero: the new pile must equal $4 \oplus 6$.`], R`$4 \oplus 6 = 2$, so reduce 9 to 2.`),
      P('core', 'num', 'Count P-positions', R`In the subtraction game with moves {1, 3, 4}, how many of the positions 0, 1, …, 20 are P-positions?`, (() => { const Pp = []; for (let n = 0; n <= 20; n++) Pp.push(![1, 3, 4].some((s) => s <= n && Pp[n - s])); return Pp.filter(Boolean).length; })(), [R`Work up from 0. The pattern repeats with period 7: P at 0 and 2 (mod 7).`], R`P-positions 0, 2, 7, 9, 14, 16: that is 6.`),
      P('core', 'num', 'Board colouring', R`Two opposite corners are removed from a chessboard. Non-overlapping dominoes ($1\times2$) are placed on the remaining 62 squares. What is the smallest possible number of squares left uncovered?`, 2, [R`Each domino covers one black and one white square; 32 of one colour and 30 of the other remain.`], R`The removed corners have the same colour, leaving 30 of one colour and 32 of the other. Each domino covers one of each, so at most 30 dominoes fit and at least 2 squares stay uncovered (and 30 dominoes can be placed). A full tiling is impossible.`),
      P('core', 'num', 'Sum invariant', R`Start with 1, 2, …, 20. Replace any two numbers $a, b$ by $a + b - 1$. After 19 moves, what number remains?`, 210 - 19, [R`Each move decreases the total by 1.`], R`$210 - 19 = 191$.`),
      P('olympiad', 'num', 'Turning the tables', R`Two players alternately say numbers; the first says 1 to 10, then each says a number 1 to 10 larger than the last. Whoever says 100 wins. What should the first player say?`, 1, [R`P-positions work backwards: 100, 89, 78, …`], R`Saying $100 - 11k$: 1, 12, 23, …, 89, 100. Start with 1.`),
      P('olympiad', 'num', 'Product invariant', R`On a board are 1, 2, …, 10. Replace $a, b$ by $ab + a + b$. What number is left at the end?`, (() => { let p = 1; for (let k = 2; k <= 11; k++) p *= k; return p - 1; })(), [R`$ab + a + b + 1 = (a + 1)(b + 1)$.`, R`So $\prod(x + 1)$ is invariant.`], R`$\prod(x + 1) = 11!$, so the last number is $11! - 1 = 39\,916\,799$.`, { tol: 1e-6 }),
      P('olympiad', 'num', 'Lights out', R`Each of 2024 lamps is off. Person $k$ toggles every lamp whose number is a multiple of $k$ ($k = 1..2024$). How many lamps are on at the end?`, Math.floor(Math.sqrt(2024)), [R`Lamp $n$ is toggled once per divisor of $n$.`], R`Lamps with an odd number of divisors are perfect squares: $\lfloor\sqrt{2024}\rfloor = 44$.`)
    ]
  });
  PB.addDrills('math-games', [
    { title: 'Subtraction game', gen: (r) => { const k = r.int(2, 9), n = r.int(20, 120); const t = n % (k + 1); return { q: R`<p>Players remove 1 to ${k} counters; taking the last wins. With ${n} counters, how many should the first player take? (Answer 0 if it is a losing position.)</p>`, answer: t, tol: 0.0001, atol: 1e-9, solution: R`<p>Leave a multiple of ${k + 1}: ${n} mod ${k + 1} = ${t}.</p>` }; } },
    { title: 'Nim-sum', gen: (r) => { const a = r.int(1, 31), b = r.int(1, 31), c = r.int(1, 31); return { q: R`<p>Find the nim-sum $${a} \oplus ${b} \oplus ${c}$.</p>`, answer: a ^ b ^ c, tol: 0.0001, atol: 1e-9, solution: R`<p>Binary XOR: ${a ^ b ^ c}.</p>` }; } },
    { title: 'Lamps', gen: (r) => { const n = r.int(10, 1000); return { q: R`<p>${n} lamps start off; person $k$ toggles every multiple of $k$, for $k = 1..${n}$. How many are on at the end?</p>`, answer: Math.floor(Math.sqrt(n)), tol: 0.0001, solution: R`<p>The perfect squares: ${Math.floor(Math.sqrt(n))}.</p>` }; } }
  ]);

  /* ===================== 24. Diophantine equations ===================== */
  PB.addChapter({
    id: 'math-diophantine', subject: 'maths', num: 24, part: 'Olympiad Topics',
    title: 'Diophantine Equations',
    subtitle: R`Equations in whole numbers. Linear equations, Pythagorean triples, factoring tricks, using remainders to rule out solutions, infinite descent, and Pell's equation.`,
    big: 'Ask for whole-number solutions and ordinary equations become puzzles. Three ideas solve most of them: factorise and match up factors, look at remainders to show something is impossible, and if a solution would lead to a smaller one, there cannot be any at all.',
    goals: ['Solve linear Diophantine equations', 'Generate all Pythagorean triples', 'Use factorisation (including Simon’s favourite factoring trick)', 'Rule out solutions with modular arithmetic', 'Use infinite descent and solve simple Pell equations'],
    sections: [
      { title: 'Linear equations', html: R`
<p>$ax + by = c$ has integer solutions exactly when $\gcd(a, b)$ divides $c$ (Bézout). If $(x_0, y_0)$ is one solution, all of them are</p>
$$x = x_0 + \frac{b}{d}t,\qquad y = y_0 - \frac{a}{d}t,\qquad d = \gcd(a, b),\ t \in \mathbb Z.$$
<p>Example: $7x + 5y = 100$ in positive integers. One solution is $x = 0, y = 20$; the others are $x = 5t$, $y = 20 - 7t$. Positive: $t = 1, 2$, giving $(5, 13)$ and $(10, 6)$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many solutions in positive integers does $3x + 5y = 47$ have?`, (() => { let c = 0; for (let x = 1; x < 47; x++) { const y = (47 - 3 * x) / 5; if (y >= 1 && Number.isInteger(y)) c++; } return c; })(), [R`$x \equiv 4 \pmod 5$ since $47 - 3x$ must be a multiple of 5.`], R`$x = 4, 9, 14$ give $y = 7, 4, 1$: 3 solutions.`)] },
      { title: 'Pythagorean triples', html: R`
<p>$a^2 + b^2 = c^2$ in whole numbers: $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, … Every <strong>primitive</strong> triple (no common factor) comes from coprime $m > n$ of opposite parity:</p>
<div class="key"><p>$$a = m^2 - n^2,\qquad b = 2mn,\qquad c = m^2 + n^2.$$</p></div>
<p>The proof is a factorisation: $b^2 = (c - a)(c + a)$, and the two factors must be (twice) perfect squares. Geometrically, primitive triples correspond to rational points on the unit circle.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Which hypotenuse comes from $m = 4$, $n = 1$?`, 17, [R`$c = m^2 + n^2$.`], R`$c = 17$: the triple $(15, 8, 17)$.`)] },
      { title: 'Factoring and remainders', html: R`
<p><strong>Factor.</strong> Solve $xy = 2x + 3y$ in positive integers: rearrange to $xy - 2x - 3y = 0$ and add 6 to both sides, $(x - 3)(y - 2) = 6$. Now list factor pairs of 6: $(x, y) = (4, 8), (5, 5), (6, 4), (9, 3)$. ("Simon's favourite factoring trick".)</p>
<p><strong>Remainders.</strong> Squares are $0$ or $1 \pmod 4$, so a sum of two squares is never $3 \pmod 4$: $x^2 + y^2 = 2023$ has no solutions. Squares mod 3 are 0 or 1, mod 8 are 0, 1, 4, and cubes mod 9 are 0, ±1. Choosing the right modulus is the art.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which number can be written as a sum of two squares?`, ['2023', '2047', '2025', '2031'], 2, [R`Numbers $\equiv 3 \pmod 4$ cannot.`], R`$2025 = 45^2 + 0^2 = 27^2 + 36^2$. The others are all $3 \bmod 4$.`)] },
      { title: 'Descent and Pell’s equation', html: R`
<p><strong>Infinite descent</strong> (Fermat): if every solution produces a smaller positive solution, there can be none, since positive integers cannot decrease for ever. For example $x^2 + y^2 = 3z^2$: mod 3 forces $x$ and $y$ to be multiples of 3, then $z$ too, giving a smaller solution $(x/3, y/3, z/3)$. So only $0, 0, 0$.</p>
<p><strong>Pell's equation</strong> $x^2 - Dy^2 = 1$ ($D$ not a square) always has infinitely many solutions. Find the smallest, $(x_1, y_1)$; then all come from</p>
$$x_k + y_k\sqrt D = (x_1 + y_1\sqrt D)^k.$$
<p>For $D = 2$: $(3, 2)$, then $(3 + 2\sqrt2)^2 = 17 + 12\sqrt2$, giving $(17, 12)$, then $(99, 70)$… The ratios $x/y$ are superb approximations of $\sqrt2$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`The smallest solution of $x^2 - 3y^2 = 1$ is $(2, 1)$. Square $2 + \sqrt3$ to find the next solution's $x$.`, 7, [R`$(2 + \sqrt3)^2 = 7 + 4\sqrt3$.`], R`$x = 7$, $y = 4$: $49 - 48 = 1$.`)] }
    ],
    figures: [
      { s: 1, title: 'Pythagorean triples as points', caption: 'Every primitive triple (a, b, c) up to c = 500, plotted at (a, b). They lie on lines through the origin corresponding to rational points of the unit circle. Choose m and n to highlight one.', params: { aspect: 0.55, controls: [S('m', 'm', 2, 20, 1, 4), S('n', 'n', 1, 19, 1, 1)],
        plots: [{ x: [0, 500], y: [0, 500], xlabel: 'a', ylabel: 'b', n: 2, curves: () => [], pts: (v) => { const p = []; for (let m = 2; m <= 22; m++) for (let n = 1; n < m; n++) { if ((m - n) % 2 === 0 || gcd(m, n) !== 1) continue; const a = m * m - n * n, b = 2 * m * n; if (m * m + n * n > 500) continue; p.push({ x: a, y: b, r: 2.6, ring: false, color: 'accent' }); p.push({ x: b, y: a, r: 2.6, ring: false, color: 'accent' }); } const m = v.m, n = Math.min(v.n, v.m - 1); p.push({ x: m * m - n * n, y: 2 * m * n, r: 6, label: '(' + (m * m - n * n) + ', ' + 2 * m * n + ', ' + (m * m + n * n) + ')' }); return p; } }],
        readout: (v) => { const m = v.m, n = Math.min(v.n, v.m - 1); const prim = (m - n) % 2 === 1 && gcd(m, n) === 1; return [['triple', (m * m - n * n) + ', ' + 2 * m * n + ', ' + (m * m + n * n)], ['primitive?', prim ? 'yes' : 'no (needs coprime m, n of opposite parity)']]; } } }
    ],
    labs: [
      { sim: 'explore', title: 'Lattice points on a line', desc: 'Integer solutions of ax + by = c are lattice points on a line. They are spaced evenly along it, b/d apart in x.',
        tasks: ['Make gcd(a, b) not divide c. How many lattice points are on the line?', 'Find a, b, c with exactly one positive solution.'],
        params: { aspect: 0.5, controls: [S('a', 'a', 1, 12, 1, 7), S('b', 'b', 1, 12, 1, 5), S('c', 'c', 1, 120, 1, 100)],
          plots: [{ x: [-2, 20], y: [-2, 25], zero: false, xlabel: 'x', ylabel: 'y', curves: (v) => [{ f: (x) => (v.c - v.a * x) / v.b }], pts: (v) => { const p = []; for (let x = -2; x <= 20; x++) { const y = (v.c - v.a * x) / v.b; if (Number.isInteger(y) && y >= -2 && y <= 25) p.push({ x: x, y: y, r: 5, color: x > 0 && y > 0 ? 'good' : 'points' }); } return p; } }],
          readout: (v) => { const d = gcd(v.a, v.b); let pos = 0; for (let x = 1; x < v.c; x++) { const y = (v.c - v.a * x) / v.b; if (y >= 1 && Number.isInteger(y)) pos++; } return [['gcd(a, b)', String(d)], ['solvable?', v.c % d === 0 ? 'yes' : 'no'], ['positive solutions', String(pos)]]; } } },
      { sim: 'explore', title: 'Pell solutions approximate √D', desc: 'Solutions of x² − Dy² = 1 generated by powers of the smallest one. Their ratios x/y converge to √D extremely fast.',
        tasks: ['For D = 2, how many correct digits does each new solution add?', 'Try D = 61: its smallest solution is famously huge.'],
        params: { aspect: 0.4, controls: [{ type: 'select', id: 'D', label: 'D', value: '2', options: [['2', '2'], ['3', '3'], ['5', '5'], ['7', '7'], ['13', '13'], ['61', '61']] }],
          plots: [{ x: [1, 6], y: [-16, 0], zero: false, xlabel: 'k', ylabel: 'log₁₀ |x/y − √D|', n: 5, curves: (v) => { const D = +v.D, base = { 2: [3, 2], 3: [2, 1], 5: [9, 4], 7: [8, 3], 13: [649, 180], 61: [1766319049, 226153980] }[D]; const sols = [base]; for (let k = 1; k < 6; k++) { const s = sols[k - 1]; sols.push([s[0] * base[0] + D * s[1] * base[1], s[0] * base[1] + s[1] * base[0]]); } return [{ f: (k) => { const s = sols[Math.round(k) - 1]; return Math.log10(Math.abs(s[0] / s[1] - Math.sqrt(D)) + 1e-17); } }]; } }],
          readout: (v) => { const D = +v.D, base = { 2: [3, 2], 3: [2, 1], 5: [9, 4], 7: [8, 3], 13: [649, 180], 61: [1766319049, 226153980] }[D]; const s2 = [base[0] * base[0] + D * base[1] * base[1], 2 * base[0] * base[1]]; return [['smallest solution', '(' + base[0] + ', ' + base[1] + ')'], ['next', D === 61 ? 'about 6×10¹⁸' : '(' + s2[0] + ', ' + s2[1] + ')']]; } } }
    ],
    formulas: [['Linear', 'ax + by = c \\text{ solvable} \\iff \\gcd(a, b) \\mid c'], ['General solution', 'x = x_0 + \\tfrac bd t,\\ y = y_0 - \\tfrac ad t'], ['Pythagorean triples', '(m^2 - n^2,\\ 2mn,\\ m^2 + n^2)'], ['Squares mod 4', 'x^2 \\equiv 0, 1 \\pmod 4'], ['Pell', 'x_k + y_k\\sqrt D = (x_1 + y_1\\sqrt D)^k']],
    problems: [
      P('concept', 'mcq', 'Solvable?', R`Does $6x + 15y = 10$ have integer solutions?`, 1, [R`$\gcd(6, 15) = 3$.`], R`No: 3 does not divide 10.`, { options: ['Yes', 'No', 'Only one', 'Infinitely many positive ones'] }),
      P('concept', 'mcq', 'Squares mod 4', R`A perfect square leaves which remainders on division by 4?`, 2, [R`Try even and odd numbers.`], R`0 or 1.`, { options: ['0, 1, 2, 3', '1 only', '0 or 1', '0 or 2'] }),
      P('concept', 'mcq', 'Primitive triple', R`Which is a primitive Pythagorean triple?`, 3, [R`No common factor and $a^2 + b^2 = c^2$.`], R`$(20, 21, 29)$: $400 + 441 = 841$.`, { options: ['(6, 8, 10)', '(9, 12, 15)', '(5, 12, 14)', '(20, 21, 29)'] }),
      P('concept', 'mcq', 'Descent', R`Infinite descent works because…`, 0, [R`Think about the smallest solution.`], R`There is no infinite strictly decreasing sequence of positive integers.`, { options: ['positive integers cannot decrease for ever', 'every equation has a solution', 'primes are infinite', 'squares are positive'] }),
      P('core', 'num', 'Stamps again', R`In how many ways can you make 100 using only 7s and 11s (non-negative counts)?`, (() => { let c = 0; for (let x = 0; x * 7 <= 100; x++) if ((100 - 7 * x) % 11 === 0) c++; return c; })(), [R`Try the number of 11s: $100 - 11y$ must be a multiple of 7.`], R`$y = 4$: $100 - 44 = 56 = 7\times8$. Only one way.`),
      P('core', 'num', 'Factor trick', R`How many ordered pairs of positive integers satisfy $xy = 2x + 3y$?`, 4, [R`$(x - 3)(y - 2) = 6$.`], R`Factor pairs of 6 (positive): 4 pairs.`),
      P('core', 'num', 'Hypotenuse count', R`How many primitive Pythagorean triples have hypotenuse 65?`, (() => { let c = 0; for (let m = 2; m < 9; m++) for (let n = 1; n < m; n++) if (m * m + n * n === 65 && (m - n) % 2 && gcd(m, n) === 1) c++; return c; })(), [R`Solve $m^2 + n^2 = 65$ with coprime $m > n$ of opposite parity.`], R`$65 = 8^2 + 1^2 = 7^2 + 4^2$: two triples, (63, 16, 65) and (33, 56, 65).`),
      P('core', 'num', 'Pell', R`Find the smallest $x > 1$ with $x^2 - 2y^2 = 1$ for some positive integer $y$, beyond the solution $(3, 2)$.`, 17, [R`$(3 + 2\sqrt2)^2$.`], R`$17 + 12\sqrt2$: $x = 17$.`),
      P('core', 'num', 'Sum of two squares', R`In how many ways can 50 be written as $a^2 + b^2$ with $0 \le a \le b$?`, 2, [R`Try $b$ from 5 to 7.`], R`$1^2 + 7^2$ and $5^2 + 5^2$: 2 ways.`),
      P('olympiad', 'num', 'Factorials', R`Find the sum of all $n$ for which $1! + 2! + \dots + n!$ is a perfect square.`, 1 + 3, [R`From $n = 4$ on the sum ends in 3 (look at last digits).`], R`$n = 1$ (sum 1) and $n = 3$ (sum 9); from $n = 4$ the last digit is 3 and squares never end in 3. Answer $1 + 3 = 4$.`),
      P('olympiad', 'num', 'Difference of squares', R`How many pairs of integers $(x, y)$ satisfy $x^2 - y^2 = 2022$?`, 0, [R`Squares are 0 or 1 mod 4, so $x^2 - y^2 \equiv 0, 1$ or $3 \pmod 4$.`], R`$2022 \equiv 2 \pmod 4$, which a difference of two squares can never be: 0 solutions.`, { atol: 0.5 }),
      P('olympiad', 'num', 'Square triangular numbers', R`Triangular numbers $T_n = n(n + 1)/2$ that are also perfect squares: 1, 36, … Find the next one.`, 1225, [R`$n(n + 1)/2 = m^2$ becomes the Pell equation $(2n + 1)^2 - 8m^2 = 1$.`], R`The next is $T_{49} = 1225 = 35^2$.`)
    ]
  });
  PB.addDrills('math-diophantine', [
    { title: 'Pythagorean triple', gen: (r) => { const m = r.int(2, 9), n = r.int(1, m - 1); return { q: R`<p>For $m = ${m}$, $n = ${n}$, find the hypotenuse $m^2 + n^2$ and check: what is $(m^2 - n^2)^2 + (2mn)^2$?</p>`, answer: Math.pow(m * m + n * n, 2), tol: 0.0001, solution: R`<p>$${m * m + n * n}^2 = ${Math.pow(m * m + n * n, 2)}$.</p>` }; } },
    { title: 'Positive solutions', gen: (r) => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(20, 120); let k = 0; for (let x = 1; x < c; x++) { const y = (c - a * x) / b; if (y >= 1 && Number.isInteger(y)) k++; } return { q: R`<p>How many solutions in positive integers does $${a}x + ${b}y = ${c}$ have?</p>`, answer: k, tol: 0.0001, atol: 1e-9, solution: R`<p>Check each $x$ from 1 up: ${k}.</p>` }; } },
    { title: 'Remainder of a square', gen: (r) => { const n = r.int(10, 999), m = r.pick([3, 4, 5, 7, 8]); return { q: R`<p>What is $${n}^2 \bmod ${m}$?</p>`, answer: (n * n) % m, tol: 0.0001, atol: 1e-9, solution: R`<p>$${n} \equiv ${n % m}$, so $${n}^2 \equiv ${(n * n) % m}$.</p>` }; } }
  ]);
})();
