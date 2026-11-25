/* Computing 15–17 and 21: competitive programming foundations. Complexity and judges, sorting and
   searching, recursion/backtracking/greedy, and number theory for programmers. */
(function () {
  const { R, K, c, QN, QM, P, T, G } = PB.csKit();
  const toks = (s) => s.trim().split(/\s+/);
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const fmtT = (ops, rate) => { const s = ops / rate; return s < 1e-3 ? '< 1 ms' : s < 1 ? Math.round(s * 1000) + ' ms' : s < 120 ? s.toFixed(1) + ' s' : s < 7200 ? Math.round(s / 60) + ' min' : s < 172800 ? Math.round(s / 3600) + ' h' : s < 3.15e9 ? Math.round(s / 86400).toLocaleString() + ' days' : 'longer than civilisation'; };

  /* ===================== 15. Complexity ===================== */
  PB.addChapter({
    id: 'cp-complexity', subject: 'computing', num: 15, part: 'Competitive Programming',
    title: 'Judges, Complexity and Brute Force',
    subtitle: R`How contest problems work and how to tell, before writing a line, whether an idea is fast enough. Online judges and verdicts, counting operations, big-O, reading constraints, and testing with a brute force.`,
    big: 'In competitive programming a correct answer is not enough: it must arrive within the time limit, on inputs with hundreds of thousands of numbers. <strong>Big-O</strong> lets you predict that from the constraints alone. A computer does roughly $10^8$ simple steps a second, so an idea needing $n^2 = 10^{10}$ steps is dead on arrival, however cleverly coded.',
    goals: ['Read a contest problem: statement, constraints, input and output format', 'Know the judge verdicts and what causes each', 'Count operations and express them in big-O', 'Pick an algorithm class from the constraints', 'Stress-test a fast solution against a brute force'],
    sections: [
      { title: 'How a judge works', html: R`
<p>A contest problem (IOI, ICPC, USACO, Codeforces, national olympiads…) gives a story, a precise <strong>input format</strong> and <strong>output format</strong>, <strong>constraints</strong> such as $1 \le n \le 2\cdot10^5$, a time limit (often 1–2 s) and a memory limit. Your program reads standard input and writes standard output; the judge runs it on many hidden tests and compares the output.</p>
${K('text', R`
AC   Accepted                every test passed
WA   Wrong answer            some output differs (logic, edge case, overflow, format)
TLE  Time limit exceeded     too slow: usually the algorithm, not the code
RE   Runtime error           crash: out of bounds, division by zero, stack overflow
MLE  Memory limit exceeded   e.g. a 10^5 x 10^5 table
CE   Compilation error`)}
<p>Passing the samples proves little: hidden tests include the smallest and largest cases and nasty special ones. Read the constraints first; they are the biggest hint in the whole statement. The challenges in this book are judged the same way: press <b>Submit</b> and watch the verdicts.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Your program passes small tests but gets TLE on big ones. The most likely fix is…`, ['print faster', 'a better algorithm', 'more comments', 'a different compiler'], 1, [R`TLE means too many operations.`], R`Usually a better algorithm: from $O(n^2)$ to $O(n \log n)$, say.`)] },
      { title: 'Counting steps: big-O', html: R`
<p>We measure how the number of steps grows with the input size $n$, ignoring constant factors and smaller terms: $3n^2 + 50n + 7$ is $O(n^2)$. Typical shapes:</p>
${K('python', R`
total = sum(a)                      # O(n): one pass
for i in range(n):                  # O(n^2): every pair
    for j in range(i + 1, n):
        ...
a.sort()                            # O(n log n)
lo, hi = 0, n                       # O(log n): halving each time
while lo < hi:
    mid = (lo + hi) // 2
    ...
for mask in range(1 << n): ...      # O(2^n): every subset`)}
<p>Why does $\log n$ appear so often? Halving $10^6$ reaches 1 after only 20 steps, since $2^{20} \approx 10^6$. Divide-and-conquer algorithms and sorted structures exploit that. Exponential algorithms are the opposite: each extra element <em>doubles</em> the work.</p>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is the complexity of: for each of $n$ items, binary-search it in a sorted list of $n$ items?`, ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], 2, [R`$n$ searches of $O(\log n)$ each.`], R`$O(n \log n)$.`)] },
      { title: 'From constraints to algorithm', html: R`
<p>With about $10^8$ simple operations per second in C++ (and about $10^7$ in Python), the constraint tells you which complexity the setter has in mind:</p>
${K('text', R`
n up to      complexity that fits      typical idea
10–11        O(n!)                     try every permutation
20–25        O(2^n)                    every subset, bitmasks
100–500      O(n^3)                    triple loops, Floyd–Warshall
5 000        O(n^2)                    every pair, 2D DP
10^5–10^6    O(n log n) or O(n)        sorting, binary search, prefix sums, heaps
10^9+        O(log n) or O(1)          a formula, binary search on the answer, fast power`)}
<p>So if $n \le 2\cdot10^5$, an $O(n^2)$ idea makes $4\cdot10^{10}$ steps: hopeless. You need $O(n \log n)$. And if $n \le 15$, the setter is inviting you to try all $2^{15}$ subsets. Also check the <em>values</em>: if they reach $10^9$, sums need 64-bit integers.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`$n \le 18$. Which approach does the constraint suggest?`, ['O(n log n) sorting', 'Trying all 2ⁿ subsets', 'A formula', 'O(n²) pairs only'], 1, [R`$2^{18} \approx 2.6\times10^5$.`], R`All subsets: $2^{18}\cdot18 \approx 5\times10^6$ steps is fine.`)] },
      { title: 'Brute force and stress testing', html: R`
<p>Start every problem with the <strong>brute force</strong>: the simplest correct program, however slow. It checks your understanding, scores partial points on small subtasks, and becomes a referee for your fast solution:</p>
${K('python', R`
import random
def brute(a, k):                        # O(n^2), obviously correct
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if a[i] + a[j] == k)
def fast(a, k):                          # O(n) with a dictionary
    seen, cnt = {}, 0
    for x in a:
        cnt += seen.get(k - x, 0)
        seen[x] = seen.get(x, 0) + 1
    return cnt
for t in range(500):                     # stress test: random small cases
    a = [random.randint(-5, 5) for _ in range(random.randint(1, 8))]
    k = random.randint(-6, 6)
    if brute(a, k) != fast(a, k):
        print("MISMATCH", a, k); break
else:
    print("all 500 tests agree")`, true)}
<p>Small random tests find bugs fast, and the failing case is tiny enough to trace by hand. Always also try the edges: $n = 1$, all values equal, the largest values (overflow!), negative numbers, an empty answer.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is the main point of a stress test?`, ['To measure speed', 'To find a small input where two solutions disagree', 'To use up the time limit', 'To print debug output'], 1, [R`Compare a trusted slow answer with the fast one.`], R`It finds a small counterexample automatically.`)] }
    ],
    figures: [
      { s: 1, title: 'How running time grows', caption: 'Operations for each complexity class. Slide n and read the times at 10⁸ steps per second (C++) on the right.', params: { aspect: 0.42, minH: 230, controls: [S('e', 'n = 10^e, e', 1, 9, 0.5, 5)],
        plots: [{ x: [1, 40], y: [0, 600], xlabel: 'n', ylabel: 'steps', curves: () => [{ f: (n) => n, label: 'n' }, { f: (n) => n * Math.log2(n), color: 'teal', label: 'n log n' }, { f: (n) => n * n, color: 'points', label: 'n²' }, { f: (n) => Math.pow(2, n), color: 'rust', label: '2ⁿ' }] }],
        readout: (v) => { const n = Math.pow(10, v.e); return [['n', n >= 1e4 ? '10^' + v.e : String(Math.round(n))], ['O(log n)', fmtT(Math.log2(n), 1e8)], ['O(n)', fmtT(n, 1e8)], ['O(n log n)', fmtT(n * Math.log2(n), 1e8)], ['O(n²)', fmtT(n * n, 1e8)], ['O(2ⁿ)', n > 200 ? 'never' : fmtT(Math.pow(2, n), 1e8)]]; } } }
    ],
    labs: [
      { sim: 'code', title: 'Challenge: pairs with a given sum', desc: 'The classic first lesson in complexity. A double loop passes the small tests; the big hidden test needs something faster.', params: { challenge: 'cp-pairs' } },
      { sim: 'code', title: 'Challenge: zero triples', desc: 'Here the constraints are tiny: brute force is the intended solution.', params: { challenge: 'cp-triples' } },
      { sim: 'code', title: 'Timing playground', desc: 'Feel the difference: time an O(n²) and an O(n) solution of the same problem as n grows.', params: { lang: 'python', langs: ['python', 'javascript', 'cpp'], code: { python: 'import time, random\nfor n in [1000, 2000, 4000]:\n    a = [random.randint(1, 100) for _ in range(n)]\n    t = time.time()\n    slow = sum(1 for i in range(n) for j in range(i + 1, n) if a[i] + a[j] == 100)\n    t1 = time.time() - t\n    t = time.time()\n    seen, fast = {}, 0\n    for x in a:\n        fast += seen.get(100 - x, 0)\n        seen[x] = seen.get(x, 0) + 1\n    t2 = time.time() - t\n    print(f"n={n}: O(n^2) {t1:.3f}s, O(n) {t2:.4f}s, same answer: {slow == fast}")\n', javascript: 'for (const n of [2000, 4000, 8000]) {\n  const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 100));\n  let t = performance.now(), slow = 0;\n  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (a[i] + a[j] === 100) slow++;\n  const t1 = performance.now() - t;\n  t = performance.now();\n  const seen = new Map(); let fast = 0;\n  for (const x of a) { fast += seen.get(100 - x) || 0; seen.set(x, (seen.get(x) || 0) + 1); }\n  console.log(`n=@{n}: O(n^2) @{t1.toFixed(1)}ms, O(n) @{(performance.now() - t).toFixed(2)}ms, same: @{slow === fast}`);\n}\n'.replace(/@\{/g, '${'), cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    for (int n : {5000, 10000, 20000}) {\n        vector<int> a(n);\n        for (auto& x : a) x = 1 + rand() % 100;\n        auto t = chrono::steady_clock::now();\n        long long slow = 0;\n        for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (a[i] + a[j] == 100) slow++;\n        double t1 = chrono::duration<double>(chrono::steady_clock::now() - t).count();\n        cout << "n=" << n << ": O(n^2) " << t1 << " s, pairs " << slow << "\\n";\n    }\n}\n' } } }
    ],
    formulas: [['Operations per second', '\\approx 10^8\\ \\text{(C++)},\\quad \\approx 10^7\\ \\text{(Python)}'], ['Halving', '\\log_2 10^6 \\approx 20,\\ \\log_2 10^9 \\approx 30'], ['Pairs', '\\binom{n}{2} = \\tfrac{n(n-1)}{2}'], ['Subsets', '2^{20} \\approx 10^6'],
      ['Constraint table', 'n≤10: n!   n≤20: 2^n   n≤500: n^3   n≤5000: n^2\nn≤10^6: n log n   n≥10^9: log n', 'text'], ['Fast input in Python', 'import sys\ndata = sys.stdin.buffer.read().split()', 'python']],
    problems: [
      P('concept', 'mcq', 'Drop the constants', R`$5n^2 + 100n\log n + 10^6$ is…`, 2, [R`Keep the fastest-growing term.`], R`$O(n^2)$.`, { options: ['O(1)', 'O(n log n)', 'O(n²)', 'O(n³)'] }),
      P('concept', 'mcq', 'Verdict', R`Your program reads ${c('a[n]')} for an array of size $n$ and crashes. The verdict is…`, 2, [R`It did not finish normally.`], R`Runtime error (out of bounds).`, { options: ['WA', 'TLE', 'RE', 'CE'] }),
      P('concept', 'num', 'Halvings', R`About how many times can you halve $10^9$ before reaching 1?`, 30, [R`$2^{10} \approx 10^3$.`], R`$2^{30} \approx 10^9$: about 30.`, { tol: 0.04 }),
      P('concept', 'mcq', 'From constraints', R`$n \le 10^6$. Which complexity is the setter probably expecting?`, 1, [R`$n^2 = 10^{12}$.`], R`$O(n)$ or $O(n\log n)$.`, { options: ['O(n²)', 'O(n log n)', 'O(2ⁿ)', 'O(n³)'] }),
      P('core', 'num', 'Counting a double loop', R`How many times does the inner body run? ${c('for i in range(n): for j in range(i + 1, n): ...')} with $n = 1000$.`, 499500, [R`Every unordered pair once.`], R`$\binom{1000}{2} = 499\,500$.`, { tol: 0 }),
      P('core', 'num', 'Too slow?', R`An $O(n^2)$ algorithm with $n = 2\cdot10^5$ at $10^8$ steps per second. About how many seconds?`, 400, [R`$n^2 = 4\cdot10^{10}$.`], R`$4\cdot10^{10}/10^8 = 400$ s. The limit is 1–2 s: rejected.`, { tol: 0.01 }),
      P('core', 'num', 'Subsets', R`How many subsets does a set of 20 elements have?`, 1048576, [R`Each element is in or out.`], R`$2^{20} = 1\,048\,576$.`, { tol: 0 }),
      P('core', 'num', 'Doubling n', R`An $O(n^3)$ program takes 2 s for $n = 400$. About how long for $n = 800$?`, 16, [R`Doubling $n$ multiplies $n^3$ by 8.`], R`16 s.`),
      P('core', 'mcq', 'Loop complexity', R`${c('i = 1; while i < n: i *= 2')} inside ${c('for j in range(n):')}. The complexity is…`, 2, [R`The inner loop is logarithmic.`], R`$O(n \log n)$.`, { options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'] }),
      P('olympiad', 'num', 'Harmonic loops', R`${c('for i in range(1, n + 1): for j in range(i, n + 1, i): work()')}. For $n = 10^6$, about how many million times does ${c('work')} run? (Use $\sum 1/i \approx \ln n + 0.58$.)`, 14.4, [R`The inner loop runs $n/i$ times.`], R`$n(\ln n + 0.58) \approx 10^6(13.8 + 0.58) \approx 14.4$ million: $O(n\log n)$, the trick behind the sieve.`, { tol: 0.03 }),
      P('olympiad', 'num', 'Largest n', R`An $O(2^n)$ brute force must finish $10^8$ steps in a second. What is the largest whole $n$ with $2^n \le 10^8$?`, 26, [R`$2^{26} \approx 6.7\times10^7$.`], R`$2^{26} = 67\,108\,864 \le 10^8 < 2^{27}$: 26.`),
      P('olympiad', 'mcq', 'Amortised', R`A Python list's ${c('append')} sometimes copies the whole list (when it grows). Yet $n$ appends take $O(n)$ total. Why?`, 1, [R`How much does it grow each time?`], R`The capacity grows by a constant factor, so copies happen rarely: the total copying is $1 + 2 + 4 + \dots < 2n$. This is <em>amortised</em> $O(1)$ per append.`, { options: ['It never copies', 'The capacity grows geometrically, so copies are rare', 'Python is compiled', 'Lists are linked lists'] })
    ]
  });
  PB.addDrills('cp-complexity', [
    { title: 'Seconds for n²', gen: (r) => { const e = r.int(3, 6), m = r.pick([1, 2, 5]); const n = m * Math.pow(10, e); return { q: R`<p>An $O(n^2)$ algorithm, $n = ${m}\cdot10^{${e}}$, at $10^8$ steps per second. How many seconds?</p>`, answer: n * n / 1e8, tol: 0.01, solution: R`<p>$n^2 = ${(n * n).toExponential(1)}$, divided by $10^8$.</p>` }; } },
    { title: 'Pairs', gen: (r) => { const n = r.int(10, 3000); return { q: R`<p>How many unordered pairs among ${n} items?</p>`, answer: n * (n - 1) / 2, tol: 0.0001, solution: R`<p>$${n}\cdot${n - 1}/2$.</p>` }; } },
    { title: 'Halvings', gen: (r) => { const n = r.int(100, 1e7); return { q: R`<p>How many times must you halve ${n} (rounding down) to reach 1?</p>`, answer: Math.floor(Math.log2(n)), tol: 0.0001, solution: R`<p>$\lfloor\log_2 ${n}\rfloor = ${Math.floor(Math.log2(n))}$.</p>` }; } }
  ]);
  const pairsRef = (s) => { const t = toks(s); const n = +t[0], k = +t[1]; const m = new Map(); let cnt = 0; for (let i = 0; i < n; i++) { const x = +t[2 + i]; cnt += m.get(k - x) || 0; m.set(x, (m.get(x) || 0) + 1); } return cnt + '\n'; };
  PB.addChallenge({ id: 'cp-pairs', chapter: 'cp-complexity', title: 'Pairs with a given sum', level: 'medium', timeLimit: 1,
    statement: R`<p>Count the pairs of positions $i < j$ with $a_i + a_j = k$.</p>`, input: R`<p>The first line holds $n$ and $k$ ($1 \le n \le 10^5$, $|k| \le 2\cdot10^9$). The second line holds $a_1, \dots, a_n$ ($|a_i| \le 10^9$).</p>`, output: R`<p>The number of pairs.</p>`,
    samples: [T(pairsRef)('5 6\n1 5 3 3 7\n')], tests: [T(pairsRef)('1 2\n1\n'), T(pairsRef)('4 0\n0 0 0 0\n'), T(pairsRef)('6 10\n5 5 5 1 9 0\n'), G(pairsRef, (r) => { const n = 60000, a = []; for (let i = 0; i < n; i++) a.push(r.int(1, 2000)); return n + ' 2000\n' + a.join(' ') + '\n'; })],
    hints: [R`The double loop is $O(n^2)$: $10^{10}/2$ steps for the largest test.`, R`Walk through the array once. For each $x$, how many earlier values equal $k - x$? Keep counts in a dictionary / hash map.`, R`The answer can exceed $2^{31}$: use ${c('long long')} in C++.`],
    starter: { python: 'n, k = map(int, input().split())\na = list(map(int, input().split()))\ncount = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        if a[i] + a[j] == k:\n            count += 1\nprint(count)\n' },
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, k = int(d[0]), int(d[1])\nseen, cnt = {}, 0\nfor x in map(int, d[2:2 + n]):\n    cnt += seen.get(k - x, 0)\n    seen[x] = seen.get(x, 0) + 1\nprint(cnt)\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; long long k; cin >> n >> k;\n    unordered_map<long long, int> seen;\n    seen.reserve(2 * n);\n    long long cnt = 0;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        auto it = seen.find(k - x);\n        if (it != seen.end()) cnt += it->second;\n        seen[x]++;\n    }\n    cout << cnt << "\\n";\n}\n' } });
  const triRef = (s) => { const t = toks(s).map(Number); const n = t[0], a = t.slice(1, n + 1); let c2 = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) if (a[i] + a[j] + a[k] === 0) c2++; return c2 + '\n'; };
  PB.addChallenge({ id: 'cp-triples', chapter: 'cp-complexity', title: 'Zero triples', level: 'easy',
    statement: R`<p>Count the triples of positions $i < j < k$ with $a_i + a_j + a_k = 0$. Look at the constraint before looking for anything clever.</p>`, input: R`<p>$n$ ($3 \le n \le 100$), then $n$ integers with $|a_i| \le 1000$.</p>`, output: R`<p>The number of triples.</p>`,
    samples: [T(triRef)('5\n-1 0 1 2 -2\n')], tests: [T(triRef)('3\n0 0 0\n'), T(triRef)('3\n1 2 3\n'), G(triRef, (r) => { const a = []; for (let i = 0; i < 100; i++) a.push(r.int(-20, 20)); return '100\n' + a.join(' ') + '\n'; }, false)],
    hints: [R`$\binom{100}{3} \approx 1.6\times10^5$ triples: just try them all with three nested loops.`],
    solution: { python: 'n = int(input())\na = list(map(int, input().split()))\nc = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        for k in range(j + 1, n):\n            if a[i] + a[j] + a[k] == 0:\n                c += 1\nprint(c)\n' } });

  /* ===================== 16. Sorting and searching ===================== */
  PB.addChapter({
    id: 'cp-sorting', subject: 'computing', num: 16, part: 'Competitive Programming',
    title: 'Sorting, Binary Search, Prefix Sums and Two Pointers',
    subtitle: R`The everyday tools. How sorting algorithms work and why $O(n\log n)$ is the limit, binary search on arrays and on the answer, prefix sums for instant range sums, and the two-pointer technique.`,
    big: 'An astonishing number of problems become easy once the data is <strong>sorted</strong>: duplicates sit together, the nearest values are neighbours, and you can find anything by <strong>binary search</strong>, halving the range at each step. Add <strong>prefix sums</strong> and <strong>two pointers</strong> and you can solve most "easy" contest problems in $O(n \log n)$.',
    goals: ['Explain how insertion, merge and quick sort work', 'Know why comparison sorting needs about n log n comparisons', 'Write a correct binary search', 'Binary search on the answer with a monotone check', 'Answer range-sum queries with prefix sums', 'Use two pointers on sorted data and sliding windows'],
    sections: [
      { title: 'Sorting', html: R`
<p><strong>Insertion sort</strong> inserts each item into the sorted part to its left: $O(n^2)$ in general, but fast on nearly sorted data. <strong>Merge sort</strong> splits the array in half, sorts each half recursively and merges the two sorted halves: $\log_2 n$ levels of $O(n)$ merging, so $O(n\log n)$ always. <strong>Quicksort</strong> partitions around a pivot: $O(n\log n)$ on average and very fast in practice.</p>
<p>Can any comparison sort beat $n\log n$? No: there are $n!$ possible orders, and each comparison has two outcomes, so you need at least $\log_2(n!) \approx n\log_2 n - 1.44n$ comparisons to tell them apart. (Counting sort escapes the bound by not comparing: it counts small integer keys in $O(n + \text{range})$.)</p>
<p>In practice: call the library. ${c('sorted(a, key=...)')} in Python, ${c('sort(v.begin(), v.end())')} in C++, both $O(n\log n)$. Sort pairs to sort by several keys at once.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`At least how many comparisons must any comparison sort make, in the worst case, to sort 3 items? (There are $3! = 6$ orders.)`, 3, [R`$2^2 = 4 < 6 \le 2^3$.`], R`$\lceil\log_2 6\rceil = 3$.`)] },
      { title: 'Binary search', html: R`
<p>To find ${c('x')} in a sorted array, look at the middle: if it is too small, ${c('x')} must be in the right half; otherwise in the left. Each step halves the range, so $\log_2 n$ steps suffice: 20 for a million items. The details are where bugs hide, so learn one template and use it always:</p>
${K('python', R`
def lower_bound(a, x):
    """First index i with a[i] >= x (len(a) if none)."""
    lo, hi = 0, len(a)          # the answer is in [lo, hi]
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1        # answer is to the right of mid
        else:
            hi = mid            # mid might be the answer
    return lo

a = [2, 3, 5, 5, 8, 13]
print(lower_bound(a, 5), lower_bound(a, 6), lower_bound(a, 99))   # 2 4 6
import bisect
print(bisect.bisect_left(a, 5), bisect.bisect_right(a, 5))       # 2 4`, true)}
<p>The ${c('while lo < hi')} loop keeps the <strong>invariant</strong> "the answer is in $[lo, hi]$" and always shrinks the range, so it cannot loop forever. Counting the copies of ${c('x')} is ${c('bisect_right - bisect_left')}.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`At most how many steps does binary search need on a sorted array of 1000 elements?`, 10, [R`$2^{10} = 1024$.`], R`About 10.`)] },
      { title: 'Binary search on the answer', html: R`
<p>Often you can't search an array, but you can <em>check</em> a candidate answer: "can we finish if each worker gets at most $T$ hours?" If the check is <strong>monotone</strong> (once true, it stays true for every larger $T$), binary search over $T$ finds the smallest $T$ that works, with only $\log_2(\text{range})$ checks.</p>
${K('python', R`
# Split books (pages a[i], in order) among k students, each taking a contiguous block.
# Minimise the largest number of pages any student reads.
def ok(T, a, k):                    # can we do it with at most T pages each?
    students, cur = 1, 0
    for p in a:
        if p > T: return False
        if cur + p > T:
            students += 1
            cur = 0
        cur += p
    return students <= k

a, k = [12, 34, 67, 90], 2
lo, hi = 1, sum(a)
while lo < hi:
    mid = (lo + hi) // 2
    if ok(mid, a, k): hi = mid
    else: lo = mid + 1
print(lo)                           # 113`, true)}
<p>Each check is $O(n)$ and the range is up to $10^{14}$, so about 47 checks: $O(n\log(\text{range}))$. Phrases like "minimise the maximum" or "maximise the minimum" usually mean this technique.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Binary searching an answer between 0 and $10^{12}$, about how many checks are needed?`, 40, [R`$2^{40} \approx 1.1\times10^{12}$.`], R`About 40.`, { tol: 0.05 })] },
      { title: 'Prefix sums and two pointers', html: R`
<p><strong>Prefix sums</strong>: store $p_i = a_0 + \dots + a_{i-1}$. Then any range sum is one subtraction, $a_l + \dots + a_r = p_{r+1} - p_l$: $O(n)$ preparation, $O(1)$ per query instead of $O(n)$.</p>
<p><strong>Two pointers</strong>: on a sorted array, to find a pair with sum ${c('k')}, put one pointer at each end; if the sum is too big move the right one left, if too small move the left one right. Each pointer only moves one way, so the scan is $O(n)$. A <strong>sliding window</strong> does the same with both pointers moving right, for example to find the longest block with sum at most $S$ (for non-negative numbers).</p>
${K('python', R`
a = [3, 1, 4, 1, 5, 9, 2, 6]
p = [0]
for x in a: p.append(p[-1] + x)        # p = [0, 3, 4, 8, 9, 14, 23, 25, 31]
print(p[6] - p[2])                      # a[2] + ... + a[5] = 4 + 1 + 5 + 9 = 19

S, best, lo, cur = 10, 0, 0, 0          # longest window with sum <= S
for hi, x in enumerate(a):
    cur += x
    while cur > S:                       # shrink from the left
        cur -= a[lo]; lo += 1
    best = max(best, hi - lo + 1)
print(best)                             # 4  (3, 1, 4, 1)`, true)}
<div data-quiz="0"></div>`,
        quizzes: [QN(R`With prefix sums ${c('p = [0, 2, 7, 8, 12, 20]')}, what is ${c('a[1] + a[2] + a[3]')}?`, 10, [R`$p_4 - p_1$.`], R`$12 - 2 = 10$.`)] }
    ],
    labs: [
      { sim: 'sortviz', title: 'Sorting race', desc: 'Watch six algorithms sort the same data and count their comparisons and writes. Compare the counts with n² / 2 and n log₂ n.', tasks: ['With n = 100, how many comparisons does bubble sort make? And merge sort?', 'Give insertion sort nearly sorted data. Why is it suddenly fast?', 'Give quicksort (last-element pivot) reversed data. What goes wrong?'] },
      { sim: 'bsearch', title: 'Binary search', desc: 'Watch the range halve. Compare the number of steps with a linear search.', tasks: ['How many steps for 63 elements, at most?', 'Search for a value that is not in the array. How does the search end?'] },
      { sim: 'code', title: 'Challenge: range sums', desc: '', params: { challenge: 'cp-rangesum' } },
      { sim: 'code', title: 'Challenge: spreading routers', desc: 'Binary search on the answer.', params: { challenge: 'cp-routers' } }
    ],
    formulas: [['Sorting bound', '\\log_2(n!) \\approx n\\log_2 n'], ['Binary search', 'lo, hi = 0, n\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if a[mid] < x: lo = mid + 1\n    else: hi = mid', 'python'], ['Library', 'bisect_left(a, x)  bisect_right(a, x)\nlower_bound(...)  upper_bound(...)', 'text'],
      ['Prefix sums', 'a_l + \\dots + a_r = p_{r+1} - p_l'], ['Search on the answer', 'smallest T with ok(T) true, where ok is monotone', 'text'], ['Two pointers', 'i, j = 0, n - 1\nwhile i < j:\n    s = a[i] + a[j]\n    if s == k: ...\n    elif s < k: i += 1\n    else: j -= 1', 'python']],
    problems: [
      P('concept', 'mcq', 'Stable sorting', R`A sort is <em>stable</em> if…`, 1, [R`Think of sorting students by grade after sorting them by name.`], R`Equal items keep their original order.`, { options: ['it never crashes', 'equal items keep their original order', 'it uses O(1) memory', 'it is always O(n log n)'] }),
      P('concept', 'mcq', 'Precondition', R`Binary search requires the array to be…`, 2, [R`Why can we throw away half?`], R`Sorted (or the check to be monotone).`, { options: ['small', 'of even length', 'sorted', 'without duplicates'] }),
      P('concept', 'mcq', 'Merge sort', R`Merge sort's running time is…`, 2, [R`log n levels, O(n) work each.`], R`$O(n\log n)$ in every case.`, { options: ['O(n)', 'O(n²) worst case', 'O(n log n) always', 'O(log n)'] }),
      P('concept', 'num', 'Range sum', R`For ${c('a = [5, 2, 7, 1, 4]')}, prefix sums are ${c('[0, 5, 7, 14, 15, 19]')}. What is ${c('a[1] + ... + a[3]')}?`, 10, [R`$p_4 - p_1$.`], R`$15 - 5 = 10$.`),
      P('core', 'num', 'bisect', R`${c('a = [1, 2, 4, 4, 4, 7, 9]')}. What is ${c('bisect_right(a, 4) - bisect_left(a, 4)')}?`, 3, [R`The number of 4s.`], R`$5 - 2 = 3$.`),
      P('core', 'num', 'Bubble sort', R`Bubble sort on the reversed array [5, 4, 3, 2, 1]: how many swaps?`, 10, [R`Every pair is out of order.`], R`One swap per inversion: $\binom{5}{2} = 10$.`),
      P('core', 'num', 'Comparisons', R`About how many comparisons (to the nearest million) does merge sort make on $10^6$ items? Use $n\log_2 n$.`, 20, [R`$\log_2 10^6 \approx 20$.`], R`About $2\times10^7$, i.e. 20 million.`, { tol: 0.05 }),
      P('core', 'num', 'Two pointers', R`How many pairs $i < j$ in the sorted array [1, 2, 3, 4, 5, 6] have sum 7?`, 3, [R`Move the pointers inwards.`], R`(1,6), (2,5), (3,4): 3.`),
      P('core', 'num', 'Books', R`Pages [10, 20, 30, 40] in order, split into 2 contiguous blocks. What is the smallest possible maximum block?`, 60, [R`Try each split point.`], R`[10, 20, 30 | 40] gives 60 and 40; others are worse. 60.`),
      P('olympiad', 'num', 'Sorting lower bound', R`At least how many comparisons does sorting 5 items need in the worst case? ($5! = 120$.)`, 7, [R`$2^6 = 64 < 120 \le 128 = 2^7$.`], R`$\lceil\log_2 120\rceil = 7$, and 7 is in fact achievable.`),
      P('olympiad', 'num', 'Inversions', R`How many inversions (pairs $i < j$ with $a_i > a_j$) does [3, 1, 4, 1, 5, 9, 2, 6] have?`, 8, [R`Count, for each element, the smaller elements to its right.`], R`3: 1, 1, 2 (3). 1: none. 4: 1, 2 (2). 1: 0. 5: 2 (1). 9: 2, 6 (2). 2: 0. Total 8. Merge sort can count them in $O(n\log n)$.`),
      P('olympiad', 'num', 'Window', R`Non-negative array [2, 1, 3, 2, 4, 1, 1]. What is the length of the longest contiguous block with sum at most 6?`, 3, [R`Slide a window.`], R`[2, 1, 3], [1, 3, 2], [4, 1, 1] each sum to 6: length 3. Four elements always exceed 6.`)
    ]
  });
  PB.addDrills('cp-sorting', [
    { title: 'Prefix-sum query', gen: (r) => { const a = Array.from({ length: 7 }, () => r.int(1, 9)), l = r.int(0, 3), rr = r.int(l + 1, 6); const p = [0]; a.forEach((x) => p.push(p[p.length - 1] + x)); return { q: R`<p>Prefix sums ${c('p = [' + p.join(', ') + ']')}. What is ${c('a[' + l + '] + … + a[' + rr + ']')}?</p>`, answer: p[rr + 1] - p[l], tol: 0.0001, solution: R`<p>$p_{${rr + 1}} - p_{${l}} = ${p[rr + 1]} - ${p[l]}$.</p>` }; } },
    { title: 'Binary search steps', gen: (r) => { const n = r.int(10, 1e6); return { q: R`<p>At most how many halvings does binary search need on ${n} sorted elements? Use $\lceil\log_2(n + 1)\rceil$.</p>`, answer: Math.ceil(Math.log2(n + 1)), tol: 0.0001, solution: R`<p>${Math.ceil(Math.log2(n + 1))}.</p>` }; } },
    { title: 'Inversions', gen: (r) => { const a = Array.from({ length: r.int(4, 6) }, () => r.int(1, 9)); let k = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) k++; return { q: R`<p>How many swaps does bubble sort make on [${a.join(', ')}]? (= the number of inversions)</p>`, answer: k, tol: 0.0001, solution: R`<p>${k}.</p>` }; } }
  ]);
  const rsRef = (s) => { const t = toks(s).map(Number); const n = t[0], q = t[1]; const p = [0]; for (let i = 0; i < n; i++) p.push(p[i] + t[2 + i]); const o = []; for (let i = 0; i < q; i++) { const l = t[2 + n + 2 * i], r = t[3 + n + 2 * i]; o.push(p[r] - p[l - 1]); } return o.join('\n') + '\n'; };
  PB.addChallenge({ id: 'cp-rangesum', chapter: 'cp-sorting', title: 'Range sums', level: 'easy',
    statement: R`<p>Answer $q$ questions of the form "what is $a_l + a_{l+1} + \dots + a_r$?" (positions start at 1).</p>`, input: R`<p>$n$ and $q$ ($1 \le n, q \le 10^5$), then $a_1 \dots a_n$ ($|a_i| \le 10^9$), then $q$ lines with $l$ and $r$ ($1 \le l \le r \le n$).</p>`, output: R`<p>$q$ lines, the sums.</p>`,
    samples: [T(rsRef)('5 3\n3 1 4 1 5\n1 5\n2 4\n3 3\n')], tests: [T(rsRef)('1 1\n-7\n1 1\n'), G(rsRef, (r) => { const n = 50000, q = 2500; const a = [], Q = []; for (let i = 0; i < n; i++) a.push(r.int(-1e9, 1e9)); for (let i = 0; i < q; i++) { const l = r.int(1, n); Q.push(l + ' ' + r.int(l, Math.min(n, l + 40000))); } return n + ' ' + q + '\n' + a.join(' ') + '\n' + Q.join('\n') + '\n'; })],
    hints: [R`Summing each range directly is $O(nq) = 10^{10}$.`, R`Build ${c('p')} once; then each answer is ${c('p[r] - p[l - 1]')}. Sums reach $10^{14}$: use 64-bit integers in C++.`, R`In Python, read all input at once with ${c('sys.stdin.buffer.read().split()')} and print once with ${c('"\\n".join(...)')}.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, q = int(d[0]), int(d[1])\np = [0] * (n + 1)\nfor i in range(n):\n    p[i + 1] = p[i] + int(d[2 + i])\nout = []\nidx = 2 + n\nfor _ in range(q):\n    l, r = int(d[idx]), int(d[idx + 1]); idx += 2\n    out.append(p[r] - p[l - 1])\nprint("\\n".join(map(str, out)))\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n, q; cin >> n >> q;\n    vector<long long> p(n + 1, 0);\n    for (int i = 1; i <= n; i++) { long long x; cin >> x; p[i] = p[i - 1] + x; }\n    while (q--) { int l, r; cin >> l >> r; cout << p[r] - p[l - 1] << "\\n"; }\n}\n' } });
  const rtRef = (s) => { const t = toks(s).map(Number); const n = t[0], k = t[1]; const a = t.slice(2, 2 + n).sort((x, y) => x - y); const ok = (d) => { let cnt = 1, last = a[0]; for (let i = 1; i < n; i++) if (a[i] - last >= d) { cnt++; last = a[i]; } return cnt >= k; }; let lo = 0, hi = a[n - 1] - a[0]; while (lo < hi) { const mid = Math.floor((lo + hi + 1) / 2); if (ok(mid)) lo = mid; else hi = mid - 1; } return lo + '\n'; };
  PB.addChallenge({ id: 'cp-routers', chapter: 'cp-sorting', title: 'Spreading routers', level: 'hard',
    statement: R`<p>A street has $n$ houses at integer positions $x_i$. You must put $k$ Wi-Fi routers in $k$ different houses so they interfere as little as possible: <strong>maximise the smallest distance between any two routers</strong>. Print that largest possible minimum distance.</p>`,
    input: R`<p>$n$ and $k$ ($2 \le k \le n \le 10^5$), then $x_1 \dots x_n$ ($0 \le x_i \le 10^9$, all different, in any order).</p>`, output: R`<p>The answer.</p>`,
    samples: [T(rtRef)('5 3\n1 2 8 4 9\n')], tests: [T(rtRef)('2 2\n0 1000000000\n'), T(rtRef)('4 4\n1 3 6 10\n'), G(rtRef, (r) => { const set = new Set(); while (set.size < 50000) set.add(r.int(0, 1e9)); return '50000 777\n' + [...set].join(' ') + '\n'; })],
    hints: [R`If a minimum distance $d$ is achievable, so is every smaller $d$: the check is monotone.`, R`Check $d$ greedily: sort the houses, put a router in the first, then in each next house at least $d$ beyond the last router. Did you place $k$?`, R`Binary search the largest $d$ that passes: $O(n\log n + n\log(10^9))$.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, k = int(d[0]), int(d[1])\nx = sorted(map(int, d[2:2 + n]))\ndef ok(dist):\n    cnt, last = 1, x[0]\n    for v in x:\n        if v - last >= dist:\n            cnt += 1\n            last = v\n            if cnt >= k:\n                return True\n    return cnt >= k\nlo, hi = 0, x[-1] - x[0]\nwhile lo < hi:\n    mid = (lo + hi + 1) // 2\n    if ok(mid):\n        lo = mid\n    else:\n        hi = mid - 1\nprint(lo)\n' } });

  /* ===================== 17. Recursion, backtracking and greedy ===================== */
  PB.addChapter({
    id: 'cp-greedy', subject: 'computing', num: 17, part: 'Competitive Programming',
    title: 'Recursion, Backtracking and Greedy',
    subtitle: R`Two opposite strategies. Recursion and the call stack, generating subsets and permutations with backtracking and pruning, greedy algorithms, and how to prove (or disprove) that a greedy choice is safe.`,
    big: '<strong>Recursion</strong> solves a problem by trusting a smaller copy of itself; <strong>backtracking</strong> uses it to try every possibility, abandoning dead ends early. <strong>Greedy</strong> algorithms go the other way: make the choice that looks best right now and never look back. Greedy is fast and simple, but only right when you can prove it.',
    goals: ['Write recursive functions with a base case', 'Trace the call stack and recursion tree', 'Generate all subsets and permutations', 'Prune a search', 'Solve interval scheduling greedily', 'Prove a greedy choice with an exchange argument, or break it with a counterexample'],
    sections: [
      { title: 'Recursion', html: R`
${K('python', R`
def fact(n):
    if n == 0:            # base case: stops the recursion
        return 1
    return n * fact(n - 1)   # smaller case

def power(b, e):          # fast: halves e each time, so O(log e) calls
    if e == 0: return 1
    half = power(b, e // 2)
    return half * half * (b if e % 2 else 1)

def hanoi(n, a, b, c):    # move n discs from a to c using b
    if n == 0: return 0
    return hanoi(n - 1, a, c, b) + 1 + hanoi(n - 1, b, a, c)

print(fact(10), power(3, 13), hanoi(10, "A", "B", "C"))   # 3628800 1594323 1023`, true)}
<p>A recursive function needs a <strong>base case</strong> that returns directly and a <strong>recursive case</strong> that moves towards it. To believe it works, use induction: assume the smaller call is right, and check that this call is then right too. Each pending call keeps a frame on the stack, so very deep recursion can overflow it (Python's default limit is 1000 levels; ${c('sys.setrecursionlimit')} raises it).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many moves does ${c('hanoi(n, ...)')} make for $n = 6$? (It satisfies $M_n = 2M_{n-1} + 1$.)`, 63, [R`$M_n = 2^n - 1$.`], R`$2^6 - 1 = 63$.`)] },
      { title: 'Backtracking: trying everything', html: R`
<p>To search all possibilities, build a solution one choice at a time; after exploring a choice, undo it and try the next. The choices form a tree, and backtracking walks it depth-first:</p>
${K('python', R`
def subsets(items):
    out, cur = [], []
    def go(i):
        if i == len(items):
            out.append(cur[:]); return
        go(i + 1)                 # leave items[i] out
        cur.append(items[i])
        go(i + 1)                 # put items[i] in
        cur.pop()                 # undo: backtrack
    go(0)
    return out

def queens(n, row=0, cols=set(), d1=set(), d2=set()):
    if row == n: return 1
    total = 0
    for c in range(n):
        if c in cols or row - c in d1 or row + c in d2:
            continue              # prune: attacked square
        total += queens(n, row + 1, cols | {c}, d1 | {row - c}, d2 | {row + c})
    return total

print(len(subsets([1, 2, 3])), queens(8))    # 8 92`, true)}
<p>There are $2^n$ subsets and $n!$ permutations, so this only works for small $n$ (see the constraint table). <strong>Pruning</strong>, abandoning a branch as soon as it cannot lead to a solution, can make it enormously faster: the queens search never places a queen on an attacked square.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many permutations of 6 distinct items are there?`, 720, [R`$6!$.`], R`720.`)] },
      { title: 'Greedy algorithms', html: R`
<p>A <strong>greedy</strong> algorithm builds the answer step by step, each time taking the option that looks best now. Classic example, <strong>interval scheduling</strong>: from a list of meetings (start, end), choose as many as possible that do not overlap.</p>
${K('python', R`
meetings = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]
meetings.sort(key=lambda m: m[1])     # earliest END first
count, free_at = 0, -1
for s, e in meetings:
    if s >= free_at:                  # it fits after the last chosen one
        count += 1
        free_at = e
print(count)                          # 4: (1,4), (5,7), (8,11), (12,16)`, true)}
<p>Why earliest <em>end</em>? Not earliest start (one long early meeting could block everything) and not shortest (a short one can straddle two others). Many greedy algorithms start by sorting by the right key; finding that key is the whole problem.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`For interval scheduling, which rule is always optimal?`, ['earliest start', 'shortest meeting', 'earliest end', 'fewest overlaps'], 2, [R`Finishing early leaves the most room.`], R`Earliest end.`)] },
      { title: 'Proving greedy, or breaking it', html: R`
<p>Greedy is easy to code and easy to get wrong. Two tools decide:</p>
<p><strong>Exchange argument</strong> (to prove it). Take any optimal solution. Its first meeting ends no earlier than the greedy's first choice $g$ (which has the earliest end of all). Swap it for $g$: nothing that came after it overlaps $g$, so the solution is still valid and still optimal. Repeat for the rest: greedy is optimal.</p>
<p><strong>Counterexample</strong> (to disprove it). Paying 6 with coins {1, 3, 4}, the greedy "largest coin first" takes 4 + 1 + 1 (three coins), but 3 + 3 uses two. Greedy change-making works for real currencies, which are designed for it, but not for every coin system. When greedy fails, the fix is usually <strong>dynamic programming</strong>, the next chapter.</p>
<p>In contests, test a greedy idea against a brute force on small random inputs before trusting it.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Coins {1, 5, 6, 9}, amount 11. How many coins does "largest first" use?`, 3, [R`9, then …`], R`9 + 1 + 1 = 3 coins, though 5 + 6 = 2 coins is better.`)] }
    ],
    labs: [
      { sim: 'calltree', title: 'Recursion trees', desc: 'The calls made by the recursive Fibonacci function fib(n) = fib(n − 1) + fib(n − 2). Orange nodes are repeated work.', tasks: ['How many calls does fib(7) make?', 'Turn on memoisation. Which calls disappear?', 'Why does the plain version grow like 1.6ⁿ?'], params: { fn: 'fib' } },
      { sim: 'code', title: 'Challenge: most meetings', desc: '', params: { challenge: 'cp-meetings' } },
      { sim: 'code', title: 'Challenge: subset sums', desc: '', params: { challenge: 'cp-subsets' } }
    ],
    formulas: [['Recursion', 'def f(n):\n    if n == base: return answer\n    return combine(f(smaller))', 'python'], ['Backtracking', 'def go(i):\n    if done: record(); return\n    for choice in options(i):\n        if ok(choice):\n            apply(choice); go(i + 1); undo(choice)', 'python'], ['Counts', '2^n\\ \\text{subsets},\\quad n!\\ \\text{permutations},\\quad \\binom{n}{k}\\ \\text{k-subsets}'],
      ['Hanoi', 'M_n = 2^n - 1'], ['Interval scheduling', 'sort by end; take each interval that starts after the last chosen end', 'text']],
    problems: [
      P('concept', 'mcq', 'Base case', R`What happens if a recursive function has no base case?`, 2, [R`It never stops calling itself.`], R`It recurses until the stack overflows (RecursionError in Python).`, { options: ['It returns 0', 'It runs once', 'Stack overflow', 'A syntax error'] }),
      P('concept', 'num', 'Subsets', R`How many subsets does {a, b, c, d, e} have (including the empty set)?`, 32, [R`$2^5$.`], R`32.`),
      P('concept', 'mcq', 'Greedy', R`A greedy algorithm…`, 1, [R`It never reconsiders.`], R`Makes the locally best choice at each step without going back.`, { options: ['tries every possibility', 'makes the locally best choice and never goes back', 'always finds the optimum', 'uses a table of subproblems'] }),
      P('concept', 'num', 'fact', R`What is ${c('fact(5)')}?`, 120, [R`$5\cdot4\cdot3\cdot2\cdot1$.`], R`120.`),
      P('core', 'num', 'Calls of fib', R`${c('def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)')}. How many calls in total does ${c('fib(5)')} make (counting itself)?`, 15, [R`$C(n) = C(n-1) + C(n-2) + 1$, $C(0) = C(1) = 1$.`], R`1, 1, 3, 5, 9, 15.`),
      P('core', 'num', 'Meetings', R`Meetings (1,3), (2,5), (4,6), (6,8), (5,9), (8,10). A new meeting may start at the moment the previous ends. What is the most that can be attended?`, 4, [R`Sort by end and be greedy.`], R`(1,3), (4,6), (6,8), (8,10): 4.`),
      P('core', 'num', 'Queens', R`How many ways can 4 queens be placed on a 4 × 4 board with none attacking another?`, 2, [R`Backtrack row by row.`], R`2 (mirror images of each other).`),
      P('core', 'num', 'Greedy coins fail', R`Coins {1, 3, 4}, amount 6. What is the fewest coins possible?`, 2, [R`Greedy says 3. Look for better.`], R`3 + 3: 2 coins.`),
      P('core', 'num', 'k-subsets', R`How many 3-element subsets does a 10-element set have?`, 120, [R`$\binom{10}{3}$.`], R`120.`),
      P('olympiad', 'num', 'Pruned search', R`How many binary strings of length 10 have no two adjacent 1s? (Backtracking that never places "11" visits exactly these leaves.)`, 144, [R`$f(n) = f(n-1) + f(n-2)$ with $f(1) = 2$, $f(2) = 3$.`], R`Fibonacci again: 2, 3, 5, 8, 13, 21, 34, 55, 89, 144.`),
      P('olympiad', 'num', 'Exchange argument', R`Jobs with durations 3, 1, 4, 2 are done one after another by one machine. The cost is the sum of their finishing times. What is the minimum cost? (Greedy: shortest first.)`, 20, [R`Order 1, 2, 3, 4: finishing times 1, 3, 6, 10.`], R`$1 + 3 + 6 + 10 = 20$. Swapping any longer job ahead of a shorter one increases the total: an exchange argument.`),
      P('olympiad', 'num', '8 queens', R`The 8-queens backtracking search finds how many solutions?`, 92, [R`Run the code in the text.`], R`92 (12 essentially different up to symmetry).`)
    ]
  });
  PB.addDrills('cp-greedy', [
    { title: 'Hanoi moves', gen: (r) => { const n = r.int(2, 20); return { q: R`<p>Minimum moves for the Tower of Hanoi with ${n} discs?</p>`, answer: Math.pow(2, n) - 1, tol: 0.0001, solution: R`<p>$2^{${n}} - 1 = ${Math.pow(2, n) - 1}$.</p>` }; } },
    { title: 'Greedy change', gen: (r) => { const coins = r.pick([[1, 3, 4], [1, 5, 6, 9], [1, 7, 10], [1, 4, 5]]), x = r.int(6, 30); const best = [0]; for (let v = 1; v <= x; v++) { best[v] = Infinity; coins.forEach((c2) => { if (c2 <= v) best[v] = Math.min(best[v], best[v - c2] + 1); }); } return { q: R`<p>Coins {${coins.join(', ')}}. Fewest coins to make ${x}?</p>`, answer: best[x], tol: 0.0001, solution: R`<p>${best[x]} (greedy may give more).</p>` }; } },
    { title: 'Fib calls', gen: (r) => { const n = r.int(2, 12); const C = [1, 1]; for (let i = 2; i <= n; i++) C.push(C[i - 1] + C[i - 2] + 1); return { q: R`<p>How many calls does naive recursive ${c('fib(' + n + ')')} make in total?</p>`, answer: C[n], tol: 0.0001, solution: R`<p>$C(n) = C(n-1) + C(n-2) + 1$: ${C[n]}.</p>` }; } }
  ]);
  const meetRef = (s) => { const t = toks(s).map(Number); const n = t[0]; const m = []; for (let i = 0; i < n; i++) m.push([t[1 + 2 * i], t[2 + 2 * i]]); m.sort((a, b) => a[1] - b[1]); let cnt = 0, free = -Infinity; m.forEach(([a, b]) => { if (a >= free) { cnt++; free = b; } }); return cnt + '\n'; };
  PB.addChallenge({ id: 'cp-meetings', chapter: 'cp-greedy', title: 'Most meetings', level: 'medium',
    statement: R`<p>There are $n$ meetings; meeting $i$ runs from $s_i$ to $e_i$. You can attend a meeting only if you are not in another one; a meeting may start exactly when the previous one ends. What is the largest number of meetings you can attend?</p>`,
    input: R`<p>$n$ ($1 \le n \le 10^5$), then $n$ lines with $s_i$ and $e_i$ ($0 \le s_i < e_i \le 10^9$).</p>`, output: R`<p>The maximum number of meetings.</p>`,
    samples: [T(meetRef)('5\n1 4\n3 5\n0 6\n5 7\n8 9\n')], tests: [T(meetRef)('1\n0 1\n'), T(meetRef)('3\n1 2\n2 3\n3 4\n'), T(meetRef)('3\n0 10\n1 2\n3 4\n'), G(meetRef, (r) => { let s = '80000\n'; for (let i = 0; i < 80000; i++) { const a = r.int(0, 1e9 - 2); s += a + ' ' + (a + r.int(1, 30000)) + '\n'; } return s; })],
    hints: [R`Sort by end time.`, R`Take a meeting whenever its start is at least the end of the last one you took.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn = int(d[0])\nm = sorted(((int(d[2 + 2 * i]), int(d[1 + 2 * i])) for i in range(n)))\ncnt, free = 0, -1\nfor e, s in m:\n    if s >= free:\n        cnt += 1\n        free = e\nprint(cnt)\n' } });
  const subRef = (s) => { const t = toks(s).map(Number); const n = t[0], S2 = t[1], a = t.slice(2, 2 + n); let cnt = 0; const go = (i, sum) => { if (i === n) { if (sum === S2) cnt++; return; } go(i + 1, sum); go(i + 1, sum + a[i]); }; go(0, 0); return cnt + '\n'; };
  PB.addChallenge({ id: 'cp-subsets', chapter: 'cp-greedy', title: 'Subset sums', level: 'medium',
    statement: R`<p>How many of the $2^n$ subsets of the given numbers have sum exactly $S$? (The empty subset has sum 0. Equal numbers at different positions count as different elements.)</p>`,
    input: R`<p>$n$ and $S$ ($1 \le n \le 18$, $|S| \le 10^9$), then $n$ integers with absolute value at most $10^8$.</p>`, output: R`<p>The number of subsets.</p>`,
    samples: [T(subRef)('4 5\n1 2 3 4\n')], tests: [T(subRef)('1 0\n7\n'), T(subRef)('3 3\n1 1 1\n'), G(subRef, (r) => { const a = []; for (let i = 0; i < 18; i++) a.push(r.int(-20, 30)); return '18 40\n' + a.join(' ') + '\n'; }, false), G(subRef, (r) => { const a = []; for (let i = 0; i < 18; i++) a.push(r.int(1, 10)); return '18 45\n' + a.join(' ') + '\n'; }, false)],
    hints: [R`$2^{18} = 262\,144$ subsets: few enough to try them all.`, R`Recursion: ${c('go(i, total)')} either skips or takes element ${c('i')}. Or loop over bitmasks ${c('0 .. 2**n - 1')}.`],
    solution: { python: 'import sys\nd = sys.stdin.read().split()\nn, S = int(d[0]), int(d[1])\na = list(map(int, d[2:2 + n]))\ncount = 0\ndef go(i, total):\n    global count\n    if i == n:\n        if total == S:\n            count += 1\n        return\n    go(i + 1, total)\n    go(i + 1, total + a[i])\ngo(0, 0)\nprint(count)\n' } });

  /* ===================== 21. Number theory for programmers ===================== */
  const MOD = 1000000007n;
  const mpow = (b, e, m) => { b %= m; if (b < 0n) b += m; let r = 1n; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
  PB.addChapter({
    id: 'cp-maths', subject: 'computing', num: 21, part: 'Competitive Programming',
    title: 'Number Theory for Programmers',
    subtitle: R`The maths that shows up in code. Working modulo $10^9 + 7$, fast exponentiation, gcd, primes and the sieve of Eratosthenes, modular inverses, and counting combinations quickly.`,
    big: 'Answers in counting problems are often astronomically large, so contests ask for them <strong>modulo</strong> a prime like $10^9 + 7$. With a few tools (fast powers, the sieve, Fermat’s little theorem) number theory becomes code that runs in microseconds. This is the meeting point of the maths olympiad and the programming olympiad.',
    goals: ['Do arithmetic modulo m without overflow', 'Compute a^b mod m in O(log b)', 'Use Euclid’s algorithm', 'Sieve primes up to 10^7', 'Find modular inverses with Fermat', 'Compute binomial coefficients mod p'],
    sections: [
      { title: 'Arithmetic modulo m', html: R`
<p>Addition, subtraction and multiplication can be reduced modulo $m$ at every step without changing the final remainder: $(a + b) \bmod m = ((a \bmod m) + (b \bmod m)) \bmod m$, and the same for products. That keeps numbers small. With $m = 10^9 + 7$, a product of two reduced numbers is below $10^{18}$, which fits in a 64-bit integer.</p>
${K('cpp', R`
const long long MOD = 1000000007;
long long a = 123456789, b = 987654321;
long long sum  = (a + b) % MOD;
long long prod = a * b % MOD;              // a*b < 1e18 fits in long long
long long diff = ((a - b) % MOD + MOD) % MOD;   // C++ % can be negative: fix it`)}
<p>Two traps: in C++ (and JavaScript) ${c('%')} of a negative number is negative, so add ${c('MOD')} back; and <em>division does not work</em> this way: you cannot divide remainders. Division needs an inverse (below). Why $10^9 + 7$? It is prime, fits in 32 bits, and its square fits in 64.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is $(17 \cdot 23 + 5) \bmod 7$?`, 4, [R`Reduce first: $17 \equiv 3$, $23 \equiv 2$.`], R`$3\cdot2 + 5 = 11 \equiv 4$. Check: $17\cdot23 + 5 = 396 = 56\cdot7 + 4$.`)] },
      { title: 'Fast exponentiation', html: R`
<p>Computing $a^b$ by multiplying $b$ times is hopeless for $b = 10^{18}$. <strong>Square and multiply</strong> uses the binary digits of $b$: $a^{13} = a^8\cdot a^4\cdot a^1$, and $a, a^2, a^4, a^8, \dots$ come from repeated squaring. That is $O(\log b)$ multiplications: about 60 for $b = 10^{18}$.</p>
${K('python', R`
def power(a, b, m):
    result = 1
    a %= m
    while b > 0:
        if b & 1:                 # this binary digit of b is 1
            result = result * a % m
        a = a * a % m             # a, a^2, a^4, a^8, ...
        b >>= 1
    return result

print(power(2, 10**18, 10**9 + 7), pow(2, 10**18, 10**9 + 7))   # Python's pow does the same`, true)}
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many times does the ${c('while')} loop in ${c('power')} run for $b = 1000$?`, 10, [R`Once per binary digit of $b$.`], R`$2^9 = 512 \le 1000 < 1024$, so $b$ has 10 binary digits: 10 turns.`)] },
      { title: 'GCD and the sieve', html: R`
${K('python', R`
def gcd(a, b):                     # Euclid: O(log min(a, b))
    while b:
        a, b = b, a % b
    return a

def sieve(n):                      # all primes up to n in O(n log log n)
    is_p = [True] * (n + 1)
    is_p[0] = is_p[1] = False
    i = 2
    while i * i <= n:
        if is_p[i]:
            for j in range(i * i, n + 1, i):   # cross out multiples, from i*i
                is_p[j] = False
        i += 1
    return is_p

p = sieve(100)
print(gcd(1071, 462), sum(p))      # 21 25`, true)}
<p>Euclid's algorithm (from the maths number-theory chapter) is the fastest way to a gcd; ${c('lcm(a, b) = a // gcd(a, b) * b')}. The <strong>sieve of Eratosthenes</strong> crosses out the multiples of each prime, starting at $p^2$ because smaller multiples were already crossed out by smaller primes. It finds all primes below $10^7$ in a fraction of a second in C++. To test a single number, trial division up to $\sqrt n$ is enough.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many primes are there below 50?`, 15, [R`2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.`], R`15.`)] },
      { title: 'Inverses and combinations', html: R`
<p>To "divide" by $a$ modulo a prime $p$, multiply by the <strong>modular inverse</strong> $a^{-1}$, the number with $a\cdot a^{-1} \equiv 1 \pmod p$. By <strong>Fermat's little theorem</strong>, $a^{p-1} \equiv 1$, so $a^{-1} \equiv a^{p-2} \pmod p$: one fast power.</p>
<p>That gives binomial coefficients quickly: precompute factorials $0!, 1!, \dots, n!$ mod $p$ and their inverses once, then $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$ is two multiplications per query.</p>
${K('python', R`
MOD = 10**9 + 7
N = 10**6
fact = [1] * (N + 1)
for i in range(1, N + 1):
    fact[i] = fact[i - 1] * i % MOD
inv = [1] * (N + 1)
inv[N] = pow(fact[N], MOD - 2, MOD)          # Fermat
for i in range(N, 0, -1):
    inv[i - 1] = inv[i] * i % MOD            # 1/(i-1)! = i / i!
def C(n, k):
    return 0 if k < 0 or k > n else fact[n] * inv[k] % MOD * inv[n - k] % MOD
print(C(10, 3), C(10**6, 500000))`, true)}
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the inverse of 3 modulo 7? (The number $x$ in 1..6 with $3x \equiv 1$.)`, 5, [R`Try $x = 1, 2, \dots$`], R`$3\cdot5 = 15 = 2\cdot7 + 1$: 5. Fermat agrees: $3^5 = 243 \equiv 5 \pmod 7$.`)] }
    ],
    labs: [
      { sim: 'explore', title: 'The sieve of Eratosthenes', desc: 'Numbers 2 to 200. Move the slider to cross out the multiples of each prime in turn. Every number left uncrossed when you pass √200 ≈ 14 is prime.', tasks: ['Why can you stop at 13 for N = 200?', 'Which composite number is crossed out last?', 'Count the primes below 200.'],
        params: { aspect: 0.48, minH: 260, picFrac: 1, controls: [S('p', 'Cross out multiples of primes up to', 1, 15, 1, 1)],
          draw: (ctx, Cc, v, b) => { const N = 200, cols = 20, rows = 10, w = b.w / cols, hh = (b.h - 10) / rows; const P = [2, 3, 5, 7, 11, 13].filter((p) => p <= v.p); const by = {}; P.forEach((p) => { for (let j = p * p; j <= N; j += p) if (!by[j]) by[j] = p; }); const colOf = { 2: Cc.accent, 3: Cc.teal, 5: Cc.points, 7: Cc.rust, 11: Cc.good, 13: Cc.ink3 }; ctx.font = '600 ' + Math.max(9, Math.min(13, w * 0.38)) + 'px sans-serif'; ctx.textAlign = 'center'; for (let n = 1; n <= N; n++) { const i = (n - 1) % cols, j = Math.floor((n - 1) / cols), x = b.x + i * w, y = b.y + j * hh; const isP = n > 1 && !by[n] && (n <= v.p || v.p >= 14 || P.indexOf(n) >= 0); ctx.fillStyle = n === 1 ? Cc.surface2 : by[n] ? colOf[by[n]] : isP ? Cc.good : Cc.surface; ctx.globalAlpha = by[n] ? 0.28 : 1; ctx.fillRect(x + 1, y + 1, w - 2, hh - 2); ctx.globalAlpha = 1; ctx.fillStyle = isP && !by[n] ? '#fff' : by[n] ? Cc.ink3 : Cc.ink; ctx.fillText(String(n), x + w / 2, y + hh / 2 + 4); if (by[n]) { ctx.strokeStyle = colOf[by[n]]; ctx.beginPath(); ctx.moveTo(x + 4, y + hh - 4); ctx.lineTo(x + w - 4, y + 4); ctx.stroke(); } } },
          readout: (v) => { const N = 200, P = [2, 3, 5, 7, 11, 13].filter((p) => p <= v.p); const cross = {}; P.forEach((p) => { for (let j = p * p; j <= N; j += p) cross[j] = 1; }); let left = 0; for (let n = 2; n <= N; n++) if (!cross[n]) left++; return [['primes used', P.join(', ') || '—'], ['numbers not crossed out', String(left)], ['primes below 200', '46']]; } } },
      { sim: 'code', title: 'Challenge: huge powers', desc: '', params: { challenge: 'cp-modpow' } },
      { sim: 'code', title: 'Challenge: counting primes', desc: '', params: { challenge: 'cp-sieve' } },
      { sim: 'code', title: 'Challenge: binomials mod p', desc: '', params: { challenge: 'cp-binom' } }
    ],
    formulas: [['Reduce as you go', '(a \\pm b) \\bmod m,\\ (a\\cdot b) \\bmod m\\ \\text{at every step}'], ['Fix negatives', '((x % m) + m) % m', 'cpp'], ['Fast power', 'a^b\\ \\text{in}\\ O(\\log b):\\ a^{13} = a^8 a^4 a^1'], ['Fermat inverse', 'a^{-1} \\equiv a^{p-2} \\pmod p'],
      ['Binomial', '\\binom{n}{k} = n!\\,(k!)^{-1}\\,((n-k)!)^{-1} \\bmod p'], ['Euclid', 'while b: a, b = b, a % b', 'python'], ['Sieve', 'O(n\\log\\log n);\\ \\text{start crossing at } p^2']],
    problems: [
      P('concept', 'mcq', 'Why a prime modulus', R`Why do contests use a prime modulus like $10^9 + 7$?`, 1, [R`What do you need to divide?`], R`Every non-zero number has an inverse modulo a prime, so division works.`, { options: ['It is easy to type', 'Every non-zero number has an inverse mod a prime', 'Primes are faster for the CPU', 'It avoids negative numbers'] }),
      P('concept', 'num', 'gcd', R`What is $\gcd(1071, 462)$?`, 21, [R`$1071 = 2\cdot462 + 147$, …`], R`$\gcd(462, 147) = \gcd(147, 21) = 21$.`),
      P('concept', 'num', 'Negative remainder', R`In C++, ${c('-17 % 5')} is −2. What is the proper remainder in 0..4?`, 3, [R`Add 5.`], R`$-2 + 5 = 3$.`),
      P('concept', 'mcq', 'Sieve start', R`When sieving with prime $p$, why start crossing out at $p^2$?`, 0, [R`What about $2p, 3p, \dots, (p-1)p$?`], R`Smaller multiples $kp$ with $k < p$ have a smaller prime factor and were already crossed out.`, { options: ['smaller multiples were already crossed out', 'p² is always prime', 'it saves memory', 'it is required for correctness, not speed'] }),
      P('core', 'num', 'Fast power by hand', R`What is $3^{13} \bmod 7$?`, 3, [R`$3^6 \equiv 1 \pmod 7$ (Fermat).`], R`$3^{13} = (3^6)^2\cdot3 \equiv 3$.`),
      P('core', 'num', 'Loop turns', R`How many turns does the square-and-multiply loop take for $b = 10^{18}$?`, 60, [R`Count the binary digits: $2^{59} \approx 5.8\times10^{17}$.`], R`$2^{59} \le 10^{18} < 2^{60}$, so 60 binary digits: 60 turns, instead of $10^{18}$ multiplications.`),
      P('core', 'num', 'Inverse', R`What is the inverse of 4 modulo 11?`, 3, [R`$4x \equiv 1 \pmod{11}$.`], R`$4\cdot3 = 12 \equiv 1$: 3.`),
      P('core', 'num', 'Binomial mod', R`What is $\binom{10}{5} \bmod 7$?`, 0, [R`$\binom{10}{5} = 252$.`], R`$252 = 36\cdot7$: 0.`),
      P('core', 'num', 'Primes below 100', R`How many primes are below 100?`, 25, [R`Sieve, or remember.`], R`25.`),
      P('olympiad', 'num', 'Last digits', R`What are the last two digits of $7^{2024}$? (Give $7^{2024} \bmod 100$.)`, 1, [R`$7^4 = 2401 \equiv 1 \pmod{100}$.`], R`$2024 = 4\cdot506$, so $7^{2024} \equiv 1$: the last two digits are 01.`),
      P('olympiad', 'num', 'Divisor sieve', R`Using a sieve-like loop "for each d, add 1 to every multiple of d", how many divisors does 360 have?`, 24, [R`$360 = 2^3\cdot3^2\cdot5$.`], R`$(3+1)(2+1)(1+1) = 24$.`),
      P('olympiad', 'num', 'Lucas', R`$p = 3$. Using Lucas's theorem ($\binom{n}{k} \equiv \prod \binom{n_i}{k_i}$ over base-$p$ digits), what is $\binom{8}{4} \bmod 3$?`, 1, [R`$8 = 22_3$, $4 = 11_3$.`], R`$\binom{2}{1}\binom{2}{1} = 4 \equiv 1$. Check: $\binom84 = 70 = 23\cdot3 + 1$.`)
    ]
  });
  PB.addDrills('cp-maths', [
    { title: 'Modular power', gen: (r) => { const m = r.pick([7, 11, 13, 17]), a = r.int(2, 12), b = r.int(5, 60); return { q: R`<p>What is $${a}^{${b}} \bmod ${m}$?</p>`, answer: Number(mpow(BigInt(a), BigInt(b), BigInt(m))), tol: 0.0001, solution: R`<p>Use Fermat: reduce the exponent mod ${m - 1}.</p>` }; } },
    { title: 'gcd', gen: (r) => { const g = r.int(2, 30), a = g * r.int(2, 40), b = g * r.int(2, 40); const gcd = (x, y) => (y ? gcd(y, x % y) : x); return { q: R`<p>$\gcd(${a}, ${b})$?</p>`, answer: gcd(a, b), tol: 0.0001, solution: R`<p>Euclid: ${gcd(a, b)}.</p>` }; } },
    { title: 'Inverse mod p', gen: (r) => { const p = r.pick([7, 11, 13, 17, 19]), a = r.int(2, p - 1); return { q: R`<p>The inverse of ${a} modulo ${p} (a number in 1..${p - 1})?</p>`, answer: Number(mpow(BigInt(a), BigInt(p - 2), BigInt(p))), tol: 0.0001, solution: R`<p>$${a}^{${p - 2}} \bmod ${p}$.</p>` }; } }
  ]);
  const mpRef = (s) => { const t = toks(s); const q = +t[0]; const o = []; for (let i = 0; i < q; i++) o.push(String(mpow(BigInt(t[1 + 2 * i]), BigInt(t[2 + 2 * i]), MOD))); return o.join('\n') + '\n'; };
  PB.addChallenge({ id: 'cp-modpow', chapter: 'cp-maths', title: 'Huge powers', level: 'easy',
    statement: R`<p>For each query print $a^b \bmod (10^9 + 7)$.</p>`, input: R`<p>$q$ ($1 \le q \le 10^4$), then $q$ lines with $a$ and $b$ ($0 \le a \le 10^{18}$, $0 \le b \le 10^{18}$). Take $0^0 = 1$.</p>`, output: R`<p>$q$ lines.</p>`,
    samples: [T(mpRef)('3\n2 10\n3 0\n5 1000000000000000000\n')], tests: [T(mpRef)('2\n0 0\n0 5\n'), T(mpRef)('1\n1000000007 3\n'), G(mpRef, (r) => { let s = '2500\n'; for (let i = 0; i < 2500; i++) s += r.int(0, 1e9) + '' + r.int(0, 999999999) + ' ' + r.int(1, 1e9) + '' + r.int(0, 999999999) + '\n'; return s; })],
    hints: [R`Square and multiply; reduce $a$ modulo $10^9+7$ first (it can be up to $10^{18}$).`, R`In Python, ${c('pow(a, b, m)')} is built in. In C++, use ${c('long long')} and ${c('% MOD')} after every multiplication. In JavaScript, use BigInt.`],
    solution: { python: 'import sys\nd = sys.stdin.read().split()\nq = int(d[0])\nM = 10**9 + 7\nprint("\\n".join(str(pow(int(d[1 + 2 * i]), int(d[2 + 2 * i]), M)) for i in range(q)))\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\nconst long long M = 1000000007;\nlong long pw(long long a, long long b) {\n    long long r = 1; a %= M;\n    while (b > 0) { if (b & 1) r = r * a % M; a = a * a % M; b >>= 1; }\n    return r;\n}\nint main() {\n    int q; cin >> q;\n    while (q--) { long long a, b; cin >> a >> b; cout << pw(a, b) << "\\n"; }\n}\n' } });
  const svRef = (s) => { const t = toks(s).map(Number); const q = t[0], qs = t.slice(1, 1 + q); const N = qs.reduce((a, x) => Math.max(a, x), 2); const comp = new Uint8Array(N + 1); for (let i = 2; i * i <= N; i++) if (!comp[i]) for (let j = i * i; j <= N; j += i) comp[j] = 1; const pre = new Int32Array(N + 1); for (let i = 2; i <= N; i++) pre[i] = pre[i - 1] + (comp[i] ? 0 : 1); return qs.map((x) => pre[x]).join('\n') + '\n'; };
  PB.addChallenge({ id: 'cp-sieve', chapter: 'cp-maths', title: 'Counting primes', level: 'medium',
    statement: R`<p>For each query $x$, print how many primes are at most $x$.</p>`, input: R`<p>$q$ ($1 \le q \le 10^5$), then $q$ integers $1 \le x \le 2\cdot10^6$.</p>`, output: R`<p>$q$ lines.</p>`,
    samples: [T(svRef)('3\n10\n100\n1\n')], tests: [T(svRef)('2\n2\n3\n'), G(svRef, (r) => { const a = []; for (let i = 0; i < 3500; i++) a.push(r.int(1, 2000000)); a[0] = 2000000; return a.length + '\n' + a.join('\n') + '\n'; })],
    hints: [R`Testing each query by trial division is too slow. Sieve once up to the largest query.`, R`Then keep a running count ${c('cnt[i]')} = primes ≤ i, so each query is a lookup.`, R`In Python, a ${c('bytearray')} sieve with slice assignment, ${c('s[i*i::i] = bytes(len(range(i*i, N+1, i)))')}, is fast.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nq = int(d[0])\nxs = list(map(int, d[1:1 + q]))\nN = max(xs + [2])\ns = bytearray([1]) * (N + 1)\ns[0] = s[1] = 0\ni = 2\nwhile i * i <= N:\n    if s[i]:\n        s[i * i::i] = bytes(len(range(i * i, N + 1, i)))\n    i += 1\ncnt = [0] * (N + 1)\nc = 0\nfor k in range(N + 1):\n    c += s[k]\n    cnt[k] = c\nprint("\\n".join(str(cnt[x]) for x in xs))\n' } });
  const bnRef = (s) => { const t = toks(s).map(Number); const q = t[0]; const o = []; let N = 1; for (let i = 0; i < q; i++) N = Math.max(N, t[1 + 2 * i]); const f = [1n]; for (let i = 1; i <= N; i++) f.push(f[i - 1] * BigInt(i) % MOD); const fi = new Array(N + 1); fi[N] = mpow(f[N], MOD - 2n, MOD); for (let i = N; i > 0; i--) fi[i - 1] = fi[i] * BigInt(i) % MOD; for (let i = 0; i < q; i++) { const n = t[1 + 2 * i], k = t[2 + 2 * i]; o.push(k < 0 || k > n ? '0' : String(f[n] * fi[k] % MOD * fi[n - k] % MOD)); } return o.join('\n') + '\n'; };
  PB.addChallenge({ id: 'cp-binom', chapter: 'cp-maths', title: 'Binomials mod p', level: 'hard',
    statement: R`<p>For each query print $\binom{n}{k} \bmod (10^9 + 7)$ (0 if $k > n$).</p>`, input: R`<p>$q$ ($1 \le q \le 10^5$), then $q$ lines with $n$ and $k$ ($0 \le k, n \le 10^5$).</p>`, output: R`<p>$q$ lines.</p>`,
    samples: [T(bnRef)('3\n5 2\n10 0\n3 4\n')], tests: [T(bnRef)('1\n0 0\n'), G(bnRef, (r) => { let s = '2500\n'; for (let i = 0; i < 2500; i++) { const n = r.int(0, 100000); s += n + ' ' + r.int(0, n + 2) + '\n'; } return s; })],
    hints: [R`Pascal's triangle is $O(n^2)$ memory and time: too much.`, R`Precompute factorials and inverse factorials (Fermat for the last one, then walk down).`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nq = int(d[0])\nM = 10**9 + 7\nN = 100000\nf = [1] * (N + 1)\nfor i in range(1, N + 1):\n    f[i] = f[i - 1] * i % M\ninv = [1] * (N + 1)\ninv[N] = pow(f[N], M - 2, M)\nfor i in range(N, 0, -1):\n    inv[i - 1] = inv[i] * i % M\nout = []\nfor i in range(q):\n    n, k = int(d[1 + 2 * i]), int(d[2 + 2 * i])\n    out.append(0 if k > n else f[n] * inv[k] % M * inv[n - k] % M)\nprint("\\n".join(map(str, out)))\n' } });
})();
