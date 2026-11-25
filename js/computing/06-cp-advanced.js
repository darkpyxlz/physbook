/* Computing 18–20: dynamic programming, graphs, and data structures for contests. */
(function () {
  const { R, K, c, QN, QM, P, T, G } = PB.csKit();
  const toks = (s) => s.trim().split(/\s+/);
  const lines = (s) => s.replace(/\r/g, '').split('\n');
  // A small binary min-heap of [key, value] pairs, for the reference solutions.
  function Heap() { const a = []; return { size: () => a.length, push(x) { a.push(x); let i = a.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } }, pop() { const top = a[0], last = a.pop(); if (a.length) { a[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } } return top; } }; }

  /* ===================== 18. Dynamic programming ===================== */
  PB.addChapter({
    id: 'cp-dp', subject: 'computing', num: 18, part: 'Competitive Programming',
    title: 'Dynamic Programming',
    subtitle: R`Solving each subproblem once. Overlapping subproblems and memoisation, tabulation with states and transitions, coins and knapsacks, longest increasing subsequence, maximum subarray, and DP on two strings and grids.`,
    big: 'Plain recursion often solves the same small problem millions of times. <strong>Dynamic programming</strong> remembers each answer the first time and looks it up afterwards. The art is choosing the <strong>state</strong>: a small description of a subproblem, such as "the best value using the first $i$ items with capacity $c$". Then the answer to each state is built from a few smaller ones.',
    goals: ['Recognise overlapping subproblems', 'Memoise a recursive function', 'Define state, transition, base case and answer', 'Solve coin change and 0/1 knapsack', 'Compute LIS, maximum subarray and LCS', 'Estimate a DP’s time and memory from its table size'],
    sections: [
      { title: 'Remember, don’t recompute', html: R`
${K('python', R`
from functools import lru_cache

calls = 0
def fib_slow(n):
    global calls; calls += 1
    return n if n < 2 else fib_slow(n - 1) + fib_slow(n - 2)

@lru_cache(maxsize=None)              # memoisation: cache every answer
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib_slow(25)
print(calls)                          # 242785 calls
print(fib(90))                        # instant: 2880067194370816120`, true)}
<p>The naive recursion makes about $1.6^n$ calls because it recomputes ${c('fib(n - 2)')} inside ${c('fib(n - 1)')} again and again (see the recursion tree in the lab). There are only $n$ <em>different</em> subproblems, so remembering each answer (<strong>memoisation</strong>) makes it $O(n)$. A problem suits DP when it has <strong>optimal substructure</strong> (the best answer is built from best answers to subproblems) and <strong>overlapping subproblems</strong>.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`With memoisation, how many <em>different</em> calls does ${c('fib(30)')} make (arguments 0 to 30)?`, 31, [R`Each value of n is computed once.`], R`31, instead of about 2.7 million.`)] },
      { title: 'Tabulation: state, transition, order', html: R`
<p>Instead of recursion, fill a table from the smallest subproblems up. Four questions define every DP:</p>
<ol><li><strong>State</strong>: what does ${c('dp[i]')} mean? (Number of ways to climb $i$ steps, taking 1 or 2 at a time.)</li>
<li><strong>Transition</strong>: how is it built from smaller states? (${c('dp[i] = dp[i-1] + dp[i-2]')}: the last step was 1 or 2.)</li>
<li><strong>Base case</strong>: ${c('dp[0] = 1')}.</li>
<li><strong>Answer and order</strong>: ${c('dp[n]')}, filling $i$ upwards.</li></ol>
${K('python', R`
# Number of ways to pay x with coins (order does not matter): each coin type in turn
coins, x = [1, 2, 5], 12
ways = [1] + [0] * x
for c in coins:
    for v in range(c, x + 1):
        ways[v] += ways[v - c]
print(ways[x])          # 13

# Fewest coins to pay x (or -1)
INF = float("inf")
best = [0] + [INF] * x
for v in range(1, x + 1):
    for c in coins:
        if c <= v and best[v - c] + 1 < best[v]:
            best[v] = best[v - c] + 1
print(best[x] if best[x] < INF else -1)     # 3  (5 + 5 + 2)`, true)}
<p>Time = (number of states) × (work per state); here $O(x\cdot k)$ for $k$ coin types. This DP fixes the greedy failure from the last chapter: with coins {1, 3, 4} it correctly finds 3 + 3.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Ways to climb 8 steps taking 1 or 2 at a time? (${c('dp[0] = dp[1] = 1')})`, 34, [R`1, 1, 2, 3, 5, …`], R`Fibonacci: 34.`)] },
      { title: 'Knapsack, LIS and maximum subarray', html: R`
<p><strong>0/1 knapsack</strong>: items with weights and values, a bag of capacity $C$. State ${c('best[c]')} = best value with capacity $c$ using the items so far; for each item, loop the capacity <em>downwards</em> so each item is used at most once: $O(nC)$.</p>
${K('python', R`
items, C = [(2, 3), (3, 4), (4, 5), (5, 6)], 5      # (weight, value)
best = [0] * (C + 1)
for w, v in items:
    for cap in range(C, w - 1, -1):                 # downwards!
        best[cap] = max(best[cap], best[cap - w] + v)
print(best[C])                                      # 7: items of weight 2 and 3

a = [3, 1, 4, 1, 5, 9, 2, 6]
lis = [1] * len(a)                                  # longest increasing subsequence ending at i
for i in range(len(a)):
    for j in range(i):
        if a[j] < a[i]:
            lis[i] = max(lis[i], lis[j] + 1)
print(max(lis))                                     # 4, e.g. 1 4 5 9

b = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
cur = best_sum = b[0]                               # Kadane: best subarray ending here
for x in b[1:]:
    cur = max(x, cur + x)
    best_sum = max(best_sum, cur)
print(best_sum)                                     # 6: 4 -1 2 1`, true)}
<p>Kadane's algorithm is DP with a one-number table: the best subarray ending at position $i$ either starts fresh at $i$ or extends the best one ending at $i - 1$. LIS also has an $O(n\log n)$ version using binary search.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Maximum subarray sum of ${c('[2, -1, 2, -5, 3, 1, -1]')}?`, 4, [R`Compare 2 − 1 + 2 with 3 + 1.`], R`Both give 4.`)] },
      { title: 'Two strings and grids', html: R`
<p>With two sequences, the state is a pair of prefixes. The <strong>longest common subsequence</strong> of $A$ and $B$: ${c('L[i][j]')} for the first $i$ letters of $A$ and $j$ of $B$. If the last letters match, ${c('L[i][j] = L[i-1][j-1] + 1')}; otherwise drop one of them: ${c('max(L[i-1][j], L[i][j-1])')}. That is $O(nm)$ time. <strong>Edit distance</strong> (the fewest insertions, deletions and replacements, used by spell checkers and DNA alignment) has the same shape.</p>
${K('python', R`
def lcs(A, B):
    n, m = len(A), len(B)
    L = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            L[i][j] = L[i-1][j-1] + 1 if A[i-1] == B[j-1] else max(L[i-1][j], L[i][j-1])
    return L[n][m]
print(lcs("ABCBDAB", "BDCABA"))       # 4 (BCBA)

grid = ["..#", "...", "#.."]          # paths moving right/down avoiding #
R, C = 3, 3
ways = [[0] * C for _ in range(R)]
for r in range(R):
    for c in range(C):
        if grid[r][c] == "#": continue
        ways[r][c] = 1 if r == c == 0 else (ways[r-1][c] if r else 0) + (ways[r][c-1] if c else 0)
print(ways[R-1][C-1])                 # 4`, true)}
<p>Memory can be a limit: a $10^4\times10^4$ table of 4-byte ints is 400 MB. When each row only needs the previous one, keep just two rows.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many cells does the LCS table have for strings of lengths 4 and 6 (including the empty-prefix row and column)?`, 35, [R`$(n + 1)(m + 1)$.`], R`$5\cdot7 = 35$.`)] }
    ],
    labs: [
      { sim: 'dptable', title: 'Filling a DP table', desc: 'Watch longest common subsequence, edit distance and knapsack tables fill cell by cell. The orange cell is being computed from the blue ones it depends on; at the end, the green outline traces the answer back.', tasks: ['For LCS, which cells does a match depend on? And a mismatch?', 'Edit distance between KITTEN and SITTING: predict it, then fill.', 'Why does the knapsack row for item i only look at row i − 1?'] },
      { sim: 'calltree', title: 'Memoisation, seen as a tree', desc: 'The same fib recursion as before. Switch memoisation on and off.', params: { fn: 'fib' } },
      { sim: 'code', title: 'Challenge: fewest coins', desc: '', params: { challenge: 'cp-coins' } },
      { sim: 'code', title: 'Challenge: maximum subarray', desc: '', params: { challenge: 'cp-maxsub' } },
      { sim: 'code', title: 'Challenge: longest common subsequence', desc: '', params: { challenge: 'cp-lcs' } }
    ],
    formulas: [['Memoise in Python', 'from functools import lru_cache\n@lru_cache(maxsize=None)\ndef f(state): ...', 'python'], ['Coin change', '\\text{best}[v] = \\min_c(\\text{best}[v - c] + 1)'], ['0/1 knapsack', '\\text{best}[c] = \\max(\\text{best}[c],\\ \\text{best}[c - w] + v)\\ \\text{(c downwards)}'],
      ['LCS', 'L_{i,j} = L_{i-1,j-1} + 1\\ \\text{if}\\ a_i = b_j,\\ \\text{else}\\ \\max(L_{i-1,j}, L_{i,j-1})'], ['Kadane', '\\text{cur} = \\max(x, \\text{cur} + x)'], ['Cost', '\\text{time} = \\#\\text{states} \\times \\text{work per state}']],
    problems: [
      P('concept', 'mcq', 'When DP helps', R`DP helps when a problem has optimal substructure and…`, 1, [R`What does the cache save?`], R`Overlapping subproblems: the same subproblems come up again and again.`, { options: ['a greedy choice', 'overlapping subproblems', 'a sorted input', 'no recursion'] }),
      P('concept', 'mcq', 'Memoisation', R`Memoisation means…`, 0, [R`A memo is a note to yourself.`], R`Storing each computed answer and reusing it.`, { options: ['storing results of calls and reusing them', 'writing comments', 'sorting the input first', 'using less memory'] }),
      P('concept', 'num', 'Stairs', R`Ways to climb 5 steps taking 1 or 2 at a time?`, 8, [R`1, 1, 2, 3, 5, 8.`], R`8.`),
      P('concept', 'num', 'Table size', R`A DP over $n = 1000$ items and capacity $C = 10^4$ fills how many million cells?`, 10, [R`$n\cdot C$.`], R`$10^7$: 10 million, fine in C++.`),
      P('core', 'num', 'Coin ways', R`In how many ways (order not mattering) can you pay 10 with coins of 1, 2 and 5?`, 10, [R`Use the ways table, one coin type at a time.`], R`10.`),
      P('core', 'num', 'Fewest coins', R`Coins {1, 3, 4}. Fewest coins for 10?`, 3, [R`best[v] = min(best[v − c]) + 1.`], R`4 + 3 + 3: 3 coins.`),
      P('core', 'num', 'Knapsack', R`Items (weight, value): (1, 1), (3, 4), (4, 5), (5, 7). Capacity 7. Best total value?`, 9, [R`Try pairs that fit.`], R`(3, 4) + (4, 5) = 9; (1, 1) + (5, 7) = 8. Best 9.`),
      P('core', 'num', 'LIS', R`Length of the longest strictly increasing subsequence of [10, 9, 2, 5, 3, 7, 101, 18]?`, 4, [R`2, 3, 7, 18.`], R`4.`),
      P('core', 'num', 'Grid paths', R`How many shortest paths (right and down only) lead from the top-left to the bottom-right corner of a 4 × 4 grid of cells?`, 20, [R`3 rights and 3 downs in some order.`], R`$\binom{6}{3} = 20$.`),
      P('olympiad', 'num', 'Edit distance', R`What is the edit distance between "KITTEN" and "SITTING"?`, 3, [R`Replace, replace, insert.`], R`K→S, E→I, insert G: 3.`),
      P('olympiad', 'num', 'LCS', R`Length of the longest common subsequence of "AGGTAB" and "GXTXAYB"?`, 4, [R`GTAB.`], R`4.`),
      P('olympiad', 'num', 'Bitmask DP', R`A travelling-salesman DP has states (set of visited cities, current city). For 15 cities, how many states is that? ($2^{15}\cdot15$)`, 491520, [R`$32768\cdot15$.`], R`491 520 states, each with up to 15 transitions: about $7\times10^6$ steps, which is why $O(2^n n^2)$ works for $n \le 15$ or so.`, { tol: 0 })
    ]
  });
  PB.addDrills('cp-dp', [
    { title: 'Stairs (1 or 2 steps)', gen: (r) => { const n = r.int(3, 30); const f = [1, 1]; for (let i = 2; i <= n; i++) f.push(f[i - 1] + f[i - 2]); return { q: R`<p>Ways to climb ${n} steps taking 1 or 2 at a time?</p>`, answer: f[n], tol: 0.0001, solution: R`<p>dp[i] = dp[i−1] + dp[i−2]: ${f[n]}.</p>` }; } },
    { title: 'Grid paths', gen: (r) => { const a = r.int(2, 8), b = r.int(2, 8); const C = (n, k) => { let x = 1; for (let i = 0; i < k; i++) x = x * (n - i) / (i + 1); return Math.round(x); }; return { q: R`<p>Right/down paths across a grid of ${a} × ${b} cells, corner to corner?</p>`, answer: C(a + b - 2, a - 1), tol: 0.0001, solution: R`<p>$\binom{${a + b - 2}}{${a - 1}}$.</p>` }; } },
    { title: 'Maximum subarray', gen: (r) => { const a = Array.from({ length: r.int(5, 8) }, () => r.int(-6, 7)); let cur = a[0], best = a[0]; for (let i = 1; i < a.length; i++) { cur = Math.max(a[i], cur + a[i]); best = Math.max(best, cur); } return { q: R`<p>Largest sum of a non-empty contiguous block of [${a.join(', ')}]?</p>`, answer: best, tol: 0.0001, solution: R`<p>Kadane: ${best}.</p>` }; } }
  ]);
  const coinRef = (s) => { const t = toks(s).map(Number); const n = t[0], x = t[1], cs = t.slice(2, 2 + n); const best = new Int32Array(x + 1).fill(1e9); best[0] = 0; for (let v = 1; v <= x; v++) for (const c2 of cs) if (c2 <= v && best[v - c2] + 1 < best[v]) best[v] = best[v - c2] + 1; return (best[x] >= 1e9 ? -1 : best[x]) + '\n'; };
  PB.addChallenge({ id: 'cp-coins', chapter: 'cp-dp', title: 'Fewest coins', level: 'medium', timeLimit: 2,
    statement: R`<p>Using coins of the given values (as many of each as you like), pay exactly $x$ with as few coins as possible. Print $-1$ if it cannot be done.</p>`, input: R`<p>$n$ and $x$ ($1 \le n \le 100$, $1 \le x \le 10^4$), then $n$ distinct coin values from 1 to $10^4$.</p>`, output: R`<p>The fewest coins, or $-1$.</p>`,
    samples: [T(coinRef)('3 11\n1 5 7\n')], tests: [T(coinRef)('1 3\n2\n'), T(coinRef)('3 6\n1 3 4\n'), G(coinRef, (r) => { const set = new Set(); while (set.size < 60) set.add(r.int(30, 1500)); return '60 10000\n' + [...set].join(' ') + '\n'; }, false), G(coinRef, (r) => '3 9999\n' + [r.pick([4, 6, 8]), 10, 22].join(' ') + '\n', false)],
    hints: [R`Greedy fails: with {1, 5, 7} and 11, greedy uses 7 + 1 + 1 + 1 + 1, but 5 + 5 + 1 is better.`, R`${c('best[v] = min over coins c ≤ v of best[v − c] + 1')}, with ${c('best[0] = 0')}.`],
    solution: { python: 'n, x = map(int, input().split())\ncoins = list(map(int, input().split()))\nINF = 10**9\nbest = [0] + [INF] * x\nfor v in range(1, x + 1):\n    b = INF\n    for c in coins:\n        if c <= v and best[v - c] + 1 < b:\n            b = best[v - c] + 1\n    best[v] = b\nprint(best[x] if best[x] < INF else -1)\n' } });
  const msRef = (s) => { const t = toks(s).map(Number); const n = t[0]; let cur = t[1], best = t[1]; for (let i = 2; i <= n; i++) { cur = Math.max(t[i], cur + t[i]); best = Math.max(best, cur); } return best + '\n'; };
  PB.addChallenge({ id: 'cp-maxsub', chapter: 'cp-dp', title: 'Maximum subarray', level: 'easy',
    statement: R`<p>Find the largest possible sum of a non-empty block of consecutive numbers.</p>`, input: R`<p>$n$ ($1 \le n \le 2\cdot10^5$), then $n$ integers with $|a_i| \le 10^9$.</p>`, output: R`<p>The largest block sum.</p>`,
    samples: [T(msRef)('9\n-2 1 -3 4 -1 2 1 -5 4\n')], tests: [T(msRef)('3\n-5 -2 -9\n'), T(msRef)('1\n7\n'), G(msRef, (r) => { const a = []; for (let i = 0; i < 100000; i++) a.push(r.int(-1e9, 1e9)); return a.length + '\n' + a.join(' ') + '\n'; })],
    hints: [R`All blocks: $O(n^2)$. Too slow.`, R`Kadane: the best block ending at $i$ is either $a_i$ alone or the best block ending at $i - 1$ plus $a_i$. Watch for all-negative input and 64-bit sums.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn = int(d[0])\na = list(map(int, d[1:1 + n]))\ncur = best = a[0]\nfor x in a[1:]:\n    cur = x if cur < 0 else cur + x\n    if cur > best:\n        best = cur\nprint(best)\n' } });
  const lcsRef = (s) => { const L = lines(s).map((x) => x.trim()).filter(Boolean); const A = L[0], B = L[1]; const m = B.length; let prev = new Int32Array(m + 1), cur = new Int32Array(m + 1); for (let i = 1; i <= A.length; i++) { for (let j = 1; j <= m; j++) cur[j] = A[i - 1] === B[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]); [prev, cur] = [cur, prev]; } return prev[m] + '\n'; };
  PB.addChallenge({ id: 'cp-lcs', chapter: 'cp-dp', title: 'Longest common subsequence', level: 'medium', timeLimit: 2,
    statement: R`<p>A subsequence keeps some letters of a string in order (not necessarily next to each other). Find the length of the longest string that is a subsequence of both $A$ and $B$.</p>`, input: R`<p>Two lines, $A$ and $B$, of upper-case letters, each of length 1 to 1000.</p>`, output: R`<p>The length of the longest common subsequence.</p>`,
    samples: [T(lcsRef)('ABCBDAB\nBDCABA\n')], tests: [T(lcsRef)('A\nB\n'), T(lcsRef)('AGGTAB\nGXTXAYB\n'), G(lcsRef, (r) => { let a = '', b = ''; for (let i = 0; i < 900; i++) a += 'ACGT'[r.int(0, 3)]; for (let i = 0; i < 900; i++) b += 'ACGT'[r.int(0, 3)]; return a + '\n' + b + '\n'; })],
    hints: [R`${c('L[i][j]')} for prefixes of lengths $i$ and $j$; see the text and the DP table lab.`, R`In Python, keep only two rows, and make the inner loop as plain as possible: $8\times10^5$ cells must fit in the time limit.`],
    solution: { python: 'A = input().strip()\nB = input().strip()\nm = len(B)\nprev = [0] * (m + 1)\nfor a in A:\n    cur = [0] * (m + 1)\n    for j in range(1, m + 1):\n        if a == B[j - 1]:\n            cur[j] = prev[j - 1] + 1\n        else:\n            cur[j] = prev[j] if prev[j] > cur[j - 1] else cur[j - 1]\n    prev = cur\nprint(prev[m])\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    string A, B; cin >> A >> B;\n    int n = A.size(), m = B.size();\n    vector<vector<int>> L(n + 1, vector<int>(m + 1, 0));\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= m; j++)\n            L[i][j] = A[i-1] == B[j-1] ? L[i-1][j-1] + 1 : max(L[i-1][j], L[i][j-1]);\n    cout << L[n][m] << "\\n";\n}\n' } });

  /* ===================== 19. Graphs ===================== */
  PB.addChapter({
    id: 'cp-graphs', subject: 'computing', num: 19, part: 'Competitive Programming',
    title: 'Graphs: DFS, BFS and Shortest Paths',
    subtitle: R`Things and the links between them. Storing graphs, depth-first search and connected components, breadth-first search and shortest paths in unweighted graphs and grids, Dijkstra's algorithm, and topological order.`,
    big: 'Road maps, friendships, web links, mazes, game states: all are <strong>graphs</strong>, vertices joined by edges. Two simple ways of exploring, going deep first (<strong>DFS</strong>) or spreading out in rings (<strong>BFS</strong>), answer "can I get there?", "how many separate pieces?" and "what is the shortest route?". Add a priority queue and you get <strong>Dijkstra</strong>, the algorithm in every satnav.',
    goals: ['Store a graph as an adjacency list', 'Explore with DFS and count connected components', 'Find shortest paths in unweighted graphs and grids with BFS', 'Find weighted shortest paths with Dijkstra', 'Know when each algorithm applies', 'Order tasks with a topological sort'],
    sections: [
      { title: 'Storing a graph', html: R`
<p>A graph has $n$ <strong>vertices</strong> and $m$ <strong>edges</strong>; edges may be <strong>directed</strong> (one-way) and may carry <strong>weights</strong> (lengths, costs). The usual representation is an <strong>adjacency list</strong>: for each vertex, the list of its neighbours. It uses $O(n + m)$ memory, against $O(n^2)$ for an adjacency matrix, which only suits small dense graphs.</p>
${K('python', R`
n, edges = 6, [(1, 2), (2, 3), (1, 3), (4, 5)]
adj = [[] for _ in range(n + 1)]       # vertices 1..n
for a, b in edges:
    adj[a].append(b)
    adj[b].append(a)                   # undirected: both directions
print(adj)                             # [[], [2, 3], [1, 3], [2, 1], [5], [4], []]`, true)}
<p>A <strong>grid</strong> is a graph too: each open cell is a vertex joined to its up/down/left/right neighbours, with no need to build the list explicitly. A <strong>tree</strong> is a connected graph with no cycles; it always has exactly $n - 1$ edges. The maths graph theory chapter has the theory; here we make it run.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`An undirected graph has 5 vertices and edges 1–2, 2–3, 2–4. What is the degree (number of neighbours) of vertex 2?`, 3, [R`Count the edges touching 2.`], R`3.`)] },
      { title: 'Depth-first search', html: R`
<p>DFS goes as deep as it can along one path, then backs up and tries the next branch: exactly the backtracking of chapter 17. Marking vertices as <strong>visited</strong> stops it going round in circles. Starting a DFS from every unvisited vertex counts the <strong>connected components</strong>.</p>
${K('python', R`
def components(n, adj):
    seen = [False] * (n + 1)
    count = 0
    for s in range(1, n + 1):
        if seen[s]: continue
        count += 1
        stack = [s]; seen[s] = True       # an explicit stack avoids deep recursion
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    stack.append(v)
    return count

adj = [[], [2, 3], [1, 3], [2, 1], [5], [4], []]
print(components(6, adj))                 # 3: {1,2,3}, {4,5}, {6}`, true)}
<p>Each vertex and edge is handled once: $O(n + m)$. DFS also finds cycles, flood-fills regions in images, and solves mazes (though not by the shortest route).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A graph has 10 vertices and edges 1–2, 2–3, 4–5, 6–7, 7–8, 8–6. How many connected components?`, 5, [R`Don't forget isolated vertices 9 and 10.`], R`{1,2,3}, {4,5}, {6,7,8}, {9}, {10}: 5.`)] },
      { title: 'Breadth-first search', html: R`
<p>BFS explores in rings: first the start, then all its neighbours, then theirs… using a <strong>queue</strong>. Because it reaches every vertex by the fewest edges first, it finds <strong>shortest paths in unweighted graphs</strong>, in $O(n + m)$.</p>
${K('python', R`
from collections import deque
grid = ["S.#.....",
        ".##.###.",
        "....#E..",
        ".##...#."]
R, C = len(grid), len(grid[0])
start = next((r, c) for r in range(R) for c in range(C) if grid[r][c] == "S")
dist = {start: 0}
q = deque([start])
while q:
    r, c = q.popleft()
    if grid[r][c] == "E":
        print("shortest path:", dist[(r, c)], "steps"); break
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in dist:
            dist[(nr, nc)] = dist[(r, c)] + 1
            q.append((nr, nc))
else:
    print("no path")`, true)}
<p>Use ${c('collections.deque')} (or C++'s ${c('queue')}), not a list with ${c('pop(0)')}, which is $O(n)$ per pop. Mark a cell when you <em>add</em> it to the queue, not when you take it out, or it can be queued many times.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which search guarantees the fewest edges to every vertex in an unweighted graph?`, ['DFS', 'BFS', 'both', 'neither'], 1, [R`Which one explores in order of distance?`], R`BFS.`)] },
      { title: 'Weighted shortest paths: Dijkstra', html: R`
<p>With weights, the fewest edges is not the shortest route. <strong>Dijkstra's algorithm</strong> repeatedly settles the unsettled vertex with the smallest known distance (found quickly with a <strong>priority queue</strong>, a heap) and relaxes its edges: if going through it gives a neighbour a shorter distance, update it.</p>
${K('python', R`
import heapq
def dijkstra(n, adj, s):            # adj[u] = [(v, w), ...], weights >= 0
    INF = float("inf")
    dist = [INF] * (n + 1)
    dist[s] = 0
    pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue      # an outdated entry: skip it
        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist

adj = [[], [(2, 7), (3, 2)], [(4, 1)], [(2, 3), (4, 8)], []]
print(dijkstra(4, adj, 1))          # [inf, 0, 5, 2, 6]`, true)}
<p>It runs in $O((n + m)\log n)$. It needs non-negative weights; with negative edges use Bellman–Ford ($O(nm)$). For all pairs on small graphs, Floyd–Warshall is three nested loops, $O(n^3)$. And for tasks with prerequisites (a directed graph with no cycle), a <strong>topological order</strong> lists them so that every task comes after the ones it depends on: exactly how this book's skill tree decides what unlocks what.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In the example graph above, what is the shortest distance from 1 to 4?`, 6, [R`1 → 3 → 2 → 4.`], R`$2 + 3 + 1 = 6$, better than $7 + 1$ or $2 + 8$.`)] }
    ],
    labs: [
      { sim: 'gridpath', title: 'Path finding on a grid', desc: 'Draw walls and mud, drag S and G, then run BFS, DFS, Dijkstra or A*. Brighter cells were explored later.', tasks: ['Compare the cells explored by BFS and A* on an open grid.', 'Why is the DFS path often absurdly long?', 'Add mud across the BFS path. Which algorithm goes around it?'] },
      { sim: 'code', title: 'Challenge: connected components', desc: '', params: { challenge: 'cp-components' } },
      { sim: 'code', title: 'Challenge: escape the maze', desc: '', params: { challenge: 'cp-maze' } },
      { sim: 'code', title: 'Challenge: shortest roads', desc: 'Dijkstra.', params: { challenge: 'cp-dijkstra' } }
    ],
    formulas: [['Adjacency list', 'adj = [[] for _ in range(n + 1)]\nadj[a].append(b); adj[b].append(a)', 'python'], ['BFS', 'q = deque([s]); dist[s] = 0\nwhile q:\n    u = q.popleft()\n    for v in adj[u]:\n        if dist[v] is None: dist[v] = dist[u] + 1; q.append(v)', 'python'],
      ['Dijkstra', 'pq = [(0, s)]\nwhile pq:\n    d, u = heappop(pq)\n    if d > dist[u]: continue\n    for v, w in adj[u]:\n        if d + w < dist[v]: dist[v] = d + w; heappush(pq, (dist[v], v))', 'python'], ['Costs', '\\text{DFS, BFS: } O(n + m);\\ \\text{Dijkstra: } O((n + m)\\log n);\\ \\text{Floyd: } O(n^3)'], ['Tree', 'n\\ \\text{vertices} \\Rightarrow n - 1\\ \\text{edges}']],
    problems: [
      P('concept', 'mcq', 'Queue or stack', R`BFS uses a…`, 0, [R`First in, first out.`], R`Queue.`, { options: ['queue', 'stack', 'heap', 'hash set'] }),
      P('concept', 'mcq', 'Negative weights', R`Dijkstra's algorithm can give wrong answers when…`, 2, [R`It assumes settled distances never improve.`], R`Some edge weights are negative.`, { options: ['the graph is directed', 'there are cycles', 'some weights are negative', 'the graph is large'] }),
      P('concept', 'num', 'Tree edges', R`A tree has 100 vertices. How many edges?`, 99, [R`$n - 1$.`], R`99.`),
      P('concept', 'mcq', 'Memory', R`A graph has $10^5$ vertices and $2\cdot10^5$ edges. Which representation fits in memory comfortably?`, 0, [R`A matrix needs $n^2 = 10^{10}$ cells.`], R`An adjacency list.`, { options: ['adjacency list', 'adjacency matrix', 'both', 'neither'] }),
      P('core', 'num', 'Grid BFS', R`In an empty 5 × 5 grid, how many steps does BFS's shortest path take from one corner to the opposite one?`, 8, [R`Right 4, down 4.`], R`8.`),
      P('core', 'num', 'Edges of a complete graph', R`How many edges does the complete graph on 20 vertices have?`, 190, [R`Every pair.`], R`$\binom{20}{2} = 190$.`),
      P('core', 'num', 'Components', R`A forest (a graph with no cycles) has 50 vertices and 42 edges. How many connected components does it have?`, 8, [R`Each tree component with $k$ vertices has $k - 1$ edges.`], R`$50 - 42 = 8$.`),
      P('core', 'num', 'Dijkstra by hand', R`Edges (undirected): A–B 4, A–C 1, C–B 2, B–D 1, C–D 6. Shortest distance from A to D?`, 4, [R`A → C → B → D.`], R`$1 + 2 + 1 = 4$.`),
      P('core', 'num', 'BFS layers', R`In a complete binary tree of depth 4 (root at depth 0), BFS from the root: how many vertices are at distance exactly 4?`, 16, [R`Each layer doubles.`], R`$2^4 = 16$.`),
      P('olympiad', 'num', 'Knight moves', R`What is the fewest number of knight moves from one corner of an 8 × 8 chessboard to the opposite corner (a1 to h8)?`, 6, [R`BFS on the 64 squares; each move changes the colour.`], R`6.`),
      P('olympiad', 'num', 'Topological orders', R`Tasks A, B, C, D with A before B, A before C, B before D, C before D. How many valid orders are there?`, 2, [R`A first, D last.`], R`A, B, C, D or A, C, B, D: 2.`),
      P('olympiad', 'mcq', '0–1 BFS', R`Edge weights are only 0 or 1. Which is a neat $O(n + m)$ shortest-path method?`, 1, [R`Push to the front for weight 0.`], R`A deque: weight-0 edges go to the front, weight-1 edges to the back ("0–1 BFS").`, { options: ['DFS', 'BFS with a deque, 0-edges at the front', 'Floyd–Warshall', 'sorting the edges'] })
    ]
  });
  PB.addDrills('cp-graphs', [
    { title: 'Complete graph edges', gen: (r) => { const n = r.int(4, 60); return { q: R`<p>Edges in the complete graph on ${n} vertices?</p>`, answer: n * (n - 1) / 2, tol: 0.0001, solution: R`<p>$\binom{${n}}{2}$.</p>` }; } },
    { title: 'Forest components', gen: (r) => { const n = r.int(10, 200), k = r.int(1, 9); return { q: R`<p>A forest with ${n} vertices has ${n - k} edges. How many components?</p>`, answer: k, tol: 0.0001, solution: R`<p>vertices − edges = ${k}.</p>` }; } },
    { title: 'Grid distance', gen: (r) => { const a = r.int(2, 30), b = r.int(2, 30); return { q: R`<p>In an empty ${a} × ${b} grid, BFS distance from the top-left cell to the bottom-right cell?</p>`, answer: a + b - 2, tol: 0.0001, solution: R`<p>${a - 1} + ${b - 1}.</p>` }; } }
  ]);
  const compRef = (s) => { const t = toks(s).map(Number); const n = t[0], m = t[1]; const p = new Int32Array(n + 1); for (let i = 0; i <= n; i++) p[i] = i; const f = (x) => { while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } return x; }; let k = n; for (let i = 0; i < m; i++) { const a = f(t[2 + 2 * i]), b = f(t[3 + 2 * i]); if (a !== b) { p[a] = b; k--; } } return k + '\n'; };
  PB.addChallenge({ id: 'cp-components', chapter: 'cp-graphs', title: 'Connected components', level: 'easy',
    statement: R`<p>Islands are joined by bridges. How many separate groups of islands (connected components) are there?</p>`, input: R`<p>$n$ and $m$ ($1 \le n \le 10^5$, $0 \le m \le 10^5$), then $m$ lines with two islands $a, b$ joined by a bridge (1-based; there may be repeated bridges and bridges from an island to itself).</p>`, output: R`<p>The number of components.</p>`,
    samples: [T(compRef)('6 4\n1 2\n2 3\n1 3\n4 5\n')], tests: [T(compRef)('1 0\n'), T(compRef)('3 3\n1 1\n2 3\n3 2\n'), G(compRef, (r) => { const n = 50000, m = 40000; let s = n + ' ' + m + '\n'; for (let i = 0; i < m; i++) s += r.int(1, n) + ' ' + r.int(1, n) + '\n'; return s; })],
    hints: [R`DFS or BFS from each unvisited vertex, counting how many times you start.`, R`Recursive DFS may overflow the stack (Python's limit is 1000 levels): use an explicit stack, or union-find (next chapter).`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, m = int(d[0]), int(d[1])\nadj = [[] for _ in range(n + 1)]\nfor i in range(m):\n    a, b = int(d[2 + 2 * i]), int(d[3 + 2 * i])\n    adj[a].append(b)\n    adj[b].append(a)\nseen = [False] * (n + 1)\ncount = 0\nfor s in range(1, n + 1):\n    if seen[s]:\n        continue\n    count += 1\n    seen[s] = True\n    stack = [s]\n    while stack:\n        u = stack.pop()\n        for v in adj[u]:\n            if not seen[v]:\n                seen[v] = True\n                stack.append(v)\nprint(count)\n' } });
  const mazeRef = (s) => { const L = lines(s).filter((x) => x.length); const [R2, C2] = L[0].trim().split(/\s+/).map(Number); const g = L.slice(1, 1 + R2); let sr = 0, sc = 0; for (let r = 0; r < R2; r++) { const k = g[r].indexOf('S'); if (k >= 0) { sr = r; sc = k; } } const dist = new Int32Array(R2 * C2).fill(-1); dist[sr * C2 + sc] = 0; const q = [sr * C2 + sc]; let qi = 0; while (qi < q.length) { const u = q[qi++], r = (u / C2) | 0, c2 = u % C2; if (g[r][c2] === 'E') return dist[u] + '\n'; for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nr = r + dr, nc = c2 + dc; if (nr >= 0 && nc >= 0 && nr < R2 && nc < C2 && g[nr][nc] !== '#' && dist[nr * C2 + nc] < 0) { dist[nr * C2 + nc] = dist[u] + 1; q.push(nr * C2 + nc); } } } return '-1\n'; };
  const mkMaze = (r, R2, C2, wall) => { const g = []; for (let i = 0; i < R2; i++) { let row = ''; for (let j = 0; j < C2; j++) row += r() < wall ? '#' : '.'; g.push(row.split('')); } g[0][0] = 'S'; g[R2 - 1][C2 - 1] = 'E'; return R2 + ' ' + C2 + '\n' + g.map((x) => x.join('')).join('\n') + '\n'; };
  PB.addChallenge({ id: 'cp-maze', chapter: 'cp-graphs', title: 'Escape the maze', level: 'medium',
    statement: R`<p>A grid maze has open cells ${c('.')}, walls ${c('#')}, one start ${c('S')} and one exit ${c('E')}. Each step moves up, down, left or right into a non-wall cell. Print the fewest steps from S to E, or $-1$ if E cannot be reached.</p>`, input: R`<p>$R$ and $C$ ($1 \le R, C \le 300$), then $R$ lines of $C$ characters.</p>`, output: R`<p>The fewest steps, or $-1$.</p>`,
    samples: [T(mazeRef)('4 8\nS.#.....\n.##.###.\n....#E..\n.##...#.\n')], tests: [T(mazeRef)('1 2\nSE\n'), T(mazeRef)('3 3\nS#.\n##.\n..E\n'), G(mazeRef, (r) => mkMaze(r, 300, 300, 0.28)), G(mazeRef, (r) => mkMaze(r, 200, 250, 0.36))],
    hints: [R`BFS from S over the grid cells; the first time you reach E, its distance is the answer.`, R`Store distances in a 2D array (or one array indexed ${c('r * C + c')}) rather than a dict for speed.`],
    solution: { python: 'import sys\nfrom collections import deque\ndata = sys.stdin.read().split("\\n")\nR, C = map(int, data[0].split())\ng = data[1:1 + R]\nfor r in range(R):\n    if "S" in g[r]:\n        s = r * C + g[r].index("S")\ndist = [-1] * (R * C)\ndist[s] = 0\nq = deque([s])\nans = -1\nwhile q:\n    u = q.popleft()\n    r, c = divmod(u, C)\n    if g[r][c] == "E":\n        ans = dist[u]\n        break\n    for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n        if 0 <= nr < R and 0 <= nc < C and g[nr][nc] != "#":\n            v = nr * C + nc\n            if dist[v] < 0:\n                dist[v] = dist[u] + 1\n                q.append(v)\nprint(ans)\n' } });
  const djRef = (s) => { const t = toks(s).map(Number); const n = t[0], m = t[1]; const adj = Array.from({ length: n + 1 }, () => []); for (let i = 0; i < m; i++) { const a = t[2 + 3 * i], b = t[3 + 3 * i], w = t[4 + 3 * i]; adj[a].push([b, w]); adj[b].push([a, w]); } const dist = new Array(n + 1).fill(Infinity); dist[1] = 0; const h = Heap(); h.push([0, 1]); while (h.size()) { const [d, u] = h.pop(); if (d > dist[u]) continue; for (const [v, w] of adj[u]) if (d + w < dist[v]) { dist[v] = d + w; h.push([dist[v], v]); } } return dist.slice(1).map((x) => (x === Infinity ? -1 : x)).join(' ') + '\n'; };
  PB.addChallenge({ id: 'cp-dijkstra', chapter: 'cp-graphs', title: 'Shortest roads', level: 'hard',
    statement: R`<p>Towns $1..n$ are joined by two-way roads of given lengths. Print the shortest distance from town 1 to every town, or $-1$ for towns that cannot be reached.</p>`, input: R`<p>$n$ and $m$ ($1 \le n \le 5\cdot10^4$, $0 \le m \le 10^5$), then $m$ lines $a\ b\ w$ ($1 \le w \le 10^6$).</p>`, output: R`<p>$n$ numbers on one line.</p>`,
    samples: [T(djRef)('5 5\n1 2 7\n1 3 2\n3 2 3\n2 4 1\n3 4 8\n')], tests: [T(djRef)('1 0\n'), T(djRef)('3 1\n2 3 5\n'), G(djRef, (r) => { const n = 3000, m = 60000; let s = n + ' ' + m + '\n'; for (let i = 0; i < m; i++) s += r.int(1, n) + ' ' + r.int(1, n) + ' ' + r.int(1, 1e6) + '\n'; return s; })],
    hints: [R`Dijkstra with a heap: ${c('heapq')} in Python, ${c('priority_queue<pair<long long,int>, vector<...>, greater<...>>')} in C++.`, R`Distances can reach $5\cdot10^{10}$: 64-bit integers in C++.`],
    solution: { python: 'import sys, heapq\nd = sys.stdin.buffer.read().split()\nn, m = int(d[0]), int(d[1])\nadj = [[] for _ in range(n + 1)]\nfor i in range(m):\n    a, b, w = int(d[2 + 3 * i]), int(d[3 + 3 * i]), int(d[4 + 3 * i])\n    adj[a].append((b, w))\n    adj[b].append((a, w))\nINF = float("inf")\ndist = [INF] * (n + 1)\ndist[1] = 0\npq = [(0, 1)]\nwhile pq:\n    du, u = heapq.heappop(pq)\n    if du > dist[u]:\n        continue\n    for v, w in adj[u]:\n        nd = du + w\n        if nd < dist[v]:\n            dist[v] = nd\n            heapq.heappush(pq, (nd, v))\nprint(" ".join(str(x) if x < INF else "-1" for x in dist[1:]))\n' } });

  /* ===================== 20. Data structures for contests ===================== */
  PB.addChapter({
    id: 'cp-structures', subject: 'computing', num: 20, part: 'Competitive Programming',
    title: 'Data Structures: Stacks, Heaps, Union-Find and Fenwick Trees',
    subtitle: R`The right container makes the algorithm. Stacks and queues (bracket matching, monotonic stacks), heaps and priority queues, union-find for merging groups, and Fenwick trees for prefix sums that change.`,
    big: 'Many contest problems are really questions about which <strong>data structure</strong> answers the needed operation fast. "Undo the most recent thing?" A stack. "Give me the smallest so far?" A heap. "Are these two in the same group?" Union-find. "Sum of a range, while values keep changing?" A Fenwick tree. Each turns an $O(n)$ operation into $O(\log n)$ or better.',
    goals: ['Use a stack for nesting and a queue for order', 'Solve next-greater-element with a monotonic stack', 'Use a heap for repeated minimums and top-k', 'Implement union-find with path compression', 'Update values and query prefix sums with a Fenwick tree', 'Choose a structure from the operations a problem needs'],
    sections: [
      { title: 'Stacks and queues', html: R`
<p>A <strong>stack</strong> is last-in-first-out (a pile of plates): push and pop at the top. A <strong>queue</strong> is first-in-first-out (a line at a shop). Both are $O(1)$ per operation. Stacks naturally match nested structure, such as brackets or function calls:</p>
${K('python', R`
def balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    st = []
    for ch in s:
        if ch in "([{":
            st.append(ch)
        elif not st or st.pop() != pairs[ch]:
            return False
    return not st                       # leftover openers are unmatched

print(balanced("{[()()]}"), balanced("([)]"), balanced("(("))   # True False False

a = [2, 7, 3, 5, 4, 6, 8]               # next greater element, O(n) with a monotonic stack
ans, st = [-1] * len(a), []              # st holds indices still waiting for a bigger value
for i, x in enumerate(a):
    while st and a[st[-1]] < x:
        ans[st.pop()] = x
    st.append(i)
print(ans)                               # [7, 8, 5, 6, 6, 8, -1]`, true)}
<p>The <strong>monotonic stack</strong> trick looks $O(n^2)$ but each index is pushed and popped once: $O(n)$ in total.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which string is balanced?`, [c('(]'), c('([)]'), c('{[]}()'), c('))((')], 2, [R`Each closer must match the most recent opener.`], R`${c('{[]}()')}.`)] },
      { title: 'Heaps and priority queues', html: R`
<p>A <strong>binary heap</strong> is a complete binary tree stored in an array, where every parent is at most its children. The minimum is always at the top; inserting or removing it takes $O(\log n)$ by swapping along one path (watch it in the lab). The children of index $i$ are $2i + 1$ and $2i + 2$.</p>
${K('python', R`
import heapq
h = []
for x in [5, 1, 8, 3, 9, 2]:
    heapq.heappush(h, x)
print(heapq.heappop(h), heapq.heappop(h))     # 1 2
print(heapq.nsmallest(3, [5, 1, 8, 3, 9, 2])) # [1, 2, 3]
# Max-heap trick in Python: push -x.
# C++: priority_queue<int> is a max-heap; priority_queue<int, vector<int>, greater<int>> a min-heap.`, true)}
<p>Heaps power Dijkstra, "the $k$ largest", merging $k$ sorted lists, scheduling the next event in a simulation, and the running median (one max-heap for the lower half, one min-heap for the upper half).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In a heap stored in an array, what is the index of the parent of index 10?`, 4, [R`Parent of $i$ is $\lfloor (i - 1)/2 \rfloor$.`], R`$\lfloor 9/2 \rfloor = 4$.`)] },
      { title: 'Union-find', html: R`
<p>The <strong>disjoint set union</strong> (union-find) keeps a collection of groups under two operations: <em>merge</em> two groups, and <em>find</em> which group an element is in. Each group is a tree; its root names the group.</p>
${K('python', R`
parent = list(range(10))
size = [1] * 10
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path compression (halving)
        x = parent[x]
    return x
def union(a, b):
    a, b = find(a), find(b)
    if a == b: return False             # already together
    if size[a] < size[b]: a, b = b, a
    parent[b] = a                       # hang the smaller tree under the larger
    size[a] += size[b]
    return True

union(1, 2); union(3, 4); union(2, 4)
print(find(1) == find(3), find(1) == find(5))   # True False`, true)}
<p>With union by size and path compression, each operation is practically $O(1)$ (the inverse Ackermann function, below 5 for any real input). Union-find counts components while edges arrive one by one, detects cycles, and is the heart of <strong>Kruskal's algorithm</strong> for minimum spanning trees: sort the edges by weight and add each one that joins two different groups.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`10 elements start in separate groups. After 6 unions, of which 2 joined elements already in the same group, how many groups are there?`, 6, [R`Only successful unions reduce the count.`], R`$10 - 4 = 6$.`)] },
      { title: 'Fenwick trees: prefix sums that change', html: R`
<p>Prefix sums answer range sums in $O(1)$, but one changed value forces an $O(n)$ rebuild. A <strong>Fenwick tree</strong> (binary indexed tree) does both in $O(\log n)$: each cell stores the sum of a block whose length is the lowest set bit of its index.</p>
${K('python', R`
class Fenwick:
    def __init__(self, n):
        self.n, self.t = n, [0] * (n + 1)       # 1-based
    def add(self, i, delta):                     # a[i] += delta
        while i <= self.n:
            self.t[i] += delta
            i += i & -i                           # next block that covers i
    def prefix(self, i):                         # a[1] + ... + a[i]
        s = 0
        while i > 0:
            s += self.t[i]
            i -= i & -i                           # strip the lowest set bit
        return s
    def range(self, l, r):
        return self.prefix(r) - self.prefix(l - 1)

f = Fenwick(8)
for i, x in enumerate([3, 1, 4, 1, 5, 9, 2, 6], start=1):
    f.add(i, x)
print(f.range(3, 6))       # 4 + 1 + 5 + 9 = 19
f.add(5, 10)               # a[5] becomes 15
print(f.range(3, 6))       # 29`, true)}
<p>${c('i & -i')} isolates the lowest set bit, so each loop runs at most $\log_2 n$ times. A <strong>segment tree</strong> generalises the idea to minimums, maximums and more complex range operations. Choosing a structure:</p>
${K('text', R`
need                                   structure           cost
undo / matching nesting                stack               O(1)
process in arrival order, BFS          queue / deque       O(1)
repeatedly take the smallest           heap                O(log n)
membership, counting                   hash set / map      O(1) average
sorted order, predecessor/successor    balanced tree (set) O(log n)
merge groups, same group?              union-find          ~O(1)
range sums with updates                Fenwick tree        O(log n)
range min / max with updates           segment tree        O(log n)`)}
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('12 & -12')}? (12 is 1100 in binary.)`, 4, [R`The lowest set bit of 1100.`], R`0100 = 4.`)] }
    ],
    labs: [
      { sim: 'heapviz', title: 'A binary heap at work', desc: 'Insert and pop and watch values bubble up and sift down, in the tree and in the array that stores it.', tasks: ['Insert a very small number. How many swaps does it take to reach the top?', 'Pop the minimum. Why is the last element moved to the top first?', 'Use "Heapsort out" to see the values leave in sorted order.'] },
      { sim: 'code', title: 'Challenge: balanced brackets', desc: '', params: { challenge: 'cp-brackets' } },
      { sim: 'code', title: 'Challenge: priority queue', desc: '', params: { challenge: 'cp-heap' } },
      { sim: 'code', title: 'Challenge: friend groups', desc: 'Union-find.', params: { challenge: 'cp-dsu' } },
      { sim: 'code', title: 'Challenge: changing sums', desc: 'Fenwick tree.', params: { challenge: 'cp-fenwick' } }
    ],
    formulas: [['Stack and queue', 'st.append(x); st.pop()\nq = deque(); q.append(x); q.popleft()', 'python'], ['Heap', 'heapq.heappush(h, x); heapq.heappop(h)\npriority_queue<int, vector<int>, greater<int>> pq;', 'text'], ['Heap indices', '\\text{children of } i: 2i+1,\\ 2i+2;\\ \\text{parent: } \\lfloor(i-1)/2\\rfloor'],
      ['Union-find', 'def find(x):\n    while p[x] != x: p[x] = p[p[x]]; x = p[x]\n    return x', 'python'], ['Fenwick', 'add: i += i & -i\nprefix: i -= i & -i', 'text'], ['Lowest set bit', 'i\\ \\&\\ (-i)']],
    problems: [
      P('concept', 'mcq', 'LIFO', R`Which structure is last-in-first-out?`, 1, [R`Think of plates.`], R`A stack.`, { options: ['queue', 'stack', 'heap', 'set'] }),
      P('concept', 'mcq', 'Heap top', R`In a min-heap, the root holds…`, 0, [R`Every parent is at most its children.`], R`The smallest value.`, { options: ['the smallest value', 'the largest value', 'the median', 'the newest value'] }),
      P('concept', 'mcq', 'Union-find answers', R`Union-find quickly answers…`, 2, [R`Its two operations.`], R`Whether two elements are in the same group (while groups merge).`, { options: ['shortest paths', 'the k-th smallest', 'whether two elements are in the same group', 'range sums'] }),
      P('concept', 'num', 'Heap children', R`In an array heap, what are the indices of the children of index 3? Give the larger one.`, 8, [R`$2i + 1$ and $2i + 2$.`], R`7 and 8.`),
      P('core', 'num', 'Stack trace', R`Starting empty: push 1, push 2, pop, push 3, push 4, pop, pop, push 5. What is the sum of what remains?`, 6, [R`Track the stack.`], R`[1] → [1,2] → [1] → [1,3] → [1,3,4] → [1,3] → [1] → [1,5]: 6.`),
      P('core', 'num', 'Heap height', R`A binary heap holds 1000 elements. What is its height (levels below the root)?`, 9, [R`$\lfloor\log_2 1000\rfloor$.`], R`9: so at most 9 swaps per insert.`),
      P('core', 'num', 'Next greater', R`Using a monotonic stack on [4, 5, 2, 25], what is the next greater element of 2?`, 25, [R`The first larger value to its right.`], R`25.`),
      P('core', 'num', 'Kruskal', R`Edges with weights: A–B 1, B–C 2, A–C 3, C–D 4, B–D 5. What is the total weight of the minimum spanning tree?`, 7, [R`Take edges in increasing order, skipping ones that make a cycle.`], R`1 + 2 + 4 = 7 (A–C 3 would close a cycle).`),
      P('core', 'num', 'Fenwick blocks', R`In a Fenwick tree, cell ${c('t[12]')} stores the sum of how many array elements? (12 = 1100₂.)`, 4, [R`The lowest set bit of 12.`], R`4: a[9..12].`),
      P('olympiad', 'num', 'Fenwick steps', R`How many cells does ${c('prefix(13)')} add up? (13 = 1101₂.)`, 3, [R`One per set bit.`], R`13 → 12 → 8 → 0: 3 cells (t[13], t[12], t[8]).`),
      P('olympiad', 'num', 'Running median', R`Numbers arrive: 5, 15, 1, 3, 8. Using two heaps, what is the median after all five?`, 5, [R`Sorted: 1, 3, 5, 8, 15.`], R`5.`),
      P('olympiad', 'num', 'Amortised stack', R`A monotonic-stack algorithm processes $n = 10^6$ numbers. At most how many pops can happen in total?`, 1000000, [R`Each index is pushed once.`], R`At most $n = 10^6$: something can only be popped once after it was pushed.`, { tol: 0 })
    ]
  });
  PB.addDrills('cp-structures', [
    { title: 'Lowest set bit', gen: (r) => { const i = r.int(1, 200); return { q: R`<p>What is ${c(i + ' & -' + i)}?</p>`, answer: i & -i, tol: 0.0001, solution: R`<p>${i} = ${i.toString(2)}₂: the lowest 1 bit is worth ${i & -i}.</p>` }; } },
    { title: 'Heap parent', gen: (r) => { const i = r.int(1, 500); return { q: R`<p>Parent index of ${i} in an array heap?</p>`, answer: Math.floor((i - 1) / 2), tol: 0.0001, solution: R`<p>⌊(${i} − 1)/2⌋ = ${Math.floor((i - 1) / 2)}.</p>` }; } },
    { title: 'Groups after unions', gen: (r) => { const n = r.int(8, 40), k = r.int(2, 7), wasted = r.int(0, 2); return { q: R`<p>${n} elements, ${k + wasted} unions of which ${wasted} joined elements already together. How many groups?</p>`, answer: n - k, tol: 0.0001, solution: R`<p>${n} − ${k}.</p>` }; } }
  ]);
  const brRef = (s) => { const L = lines(s).map((x) => x.trim()); const q = +L[0]; const o = []; for (let i = 1; i <= q; i++) { const str = L[i] || '', st = []; let ok = true; for (const ch of str) { if ('([{'.includes(ch)) st.push(ch); else { const want = { ')': '(', ']': '[', '}': '{' }[ch]; if (!st.length || st.pop() !== want) { ok = false; break; } } } o.push(ok && !st.length ? 'YES' : 'NO'); } return o.join('\n') + '\n'; };
  const mkBr = (r, len, good) => { let s = '', st = []; for (let i = 0; i < len; i++) { if (st.length && (r() < 0.5 || st.length > len - i - 1)) s += { '(': ')', '[': ']', '{': '}' }[st.pop()]; else { const o = '([{'[r.int(0, 2)]; st.push(o); s += o; } } while (st.length) s += { '(': ')', '[': ']', '{': '}' }[st.pop()]; if (!good) { const i = r.int(0, s.length - 1); s = s.slice(0, i) + '([{)]}'[r.int(0, 5)] + s.slice(i + 1); } return s; };
  PB.addChallenge({ id: 'cp-brackets', chapter: 'cp-structures', title: 'Balanced brackets', level: 'easy',
    statement: R`<p>For each string of brackets ${c('()[]{}')}, print ${c('YES')} if it is balanced (every opener is closed by the matching closer, properly nested) and ${c('NO')} otherwise.</p>`, input: R`<p>$q$ ($1 \le q \le 1000$), then $q$ non-empty strings of up to $2\cdot10^4$ brackets.</p>`, output: R`<p>$q$ lines.</p>`,
    samples: [T(brRef)('4\n{[()()]}\n([)]\n((\n()[]{}\n')], tests: [T(brRef)('3\n)\n(\n[]\n'), G(brRef, (r) => { let s = '200\n'; for (let i = 0; i < 200; i++) s += mkBr(r, r.int(1, 1000), r() < 0.5) + '\n'; return s; }, false), G(brRef, (r) => '2\n' + mkBr(r, 20000, true) + '\n' + mkBr(r, 20000, false) + '\n')],
    hints: [R`Push openers; on a closer, the top of the stack must be its partner.`, R`At the end the stack must be empty.`],
    solution: { python: 'import sys\nL = sys.stdin.read().split()\nq = int(L[0])\npairs = {")": "(", "]": "[", "}": "{"}\nout = []\nfor s in L[1:1 + q]:\n    st = []\n    ok = True\n    for ch in s:\n        if ch in "([{":\n            st.append(ch)\n        elif not st or st.pop() != pairs[ch]:\n            ok = False\n            break\n    out.append("YES" if ok and not st else "NO")\nprint("\\n".join(out))\n' } });
  const hpRef = (s) => { const L = lines(s).slice(1).filter((x) => x.trim()); const h = Heap(); const o = []; L.forEach((l) => { const p = l.trim().split(/\s+/); if (p[0] === 'push') h.push([+p[1], 0]); else o.push(h.size() ? h.pop()[0] : 'EMPTY'); }); return o.join('\n') + (o.length ? '\n' : ''); };
  PB.addChallenge({ id: 'cp-heap', chapter: 'cp-structures', title: 'Priority queue', level: 'easy',
    statement: R`<p>Process operations: ${c('push x')} adds $x$; ${c('pop')} removes and prints the smallest number, or prints ${c('EMPTY')} if there is none.</p>`, input: R`<p>$q$ ($1 \le q \le 10^5$), then $q$ operations ($|x| \le 10^9$).</p>`, output: R`<p>One line per ${c('pop')}.</p>`,
    samples: [T(hpRef)('6\npush 5\npush 1\npop\npush 3\npop\npop\n')], tests: [T(hpRef)('2\npop\npush 4\n'), G(hpRef, (r) => { let s = '80000\n'; for (let i = 0; i < 80000; i++) s += (r() < 0.97 ? 'push ' + r.int(-1e9, 1e9) : 'pop') + '\n'; return s; })],
    hints: [R`${c('heapq')} in Python; in C++ a ${c('priority_queue')} with ${c('greater<long long>')}.`],
    solution: { python: 'import sys, heapq\nL = sys.stdin.read().split("\\n")\nq = int(L[0])\nh, out = [], []\nfor line in L[1:1 + q]:\n    if line.startswith("push"):\n        heapq.heappush(h, int(line.split()[1]))\n    else:\n        out.append(str(heapq.heappop(h)) if h else "EMPTY")\nprint("\\n".join(out))\n' } });
  const dsuRef = (s) => { const t = toks(s); const n = +t[0], q = +t[1]; const p = new Int32Array(n + 1); for (let i = 0; i <= n; i++) p[i] = i; const f = (x) => { while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } return x; }; const o = []; let k = 2; for (let i = 0; i < q; i++) { const op = t[k], a = f(+t[k + 1]), b = f(+t[k + 2]); k += 3; if (op === 'union') { if (a !== b) p[a] = b; } else o.push(a === b ? 'YES' : 'NO'); } return o.join('\n') + (o.length ? '\n' : ''); };
  PB.addChallenge({ id: 'cp-dsu', chapter: 'cp-structures', title: 'Friend groups', level: 'medium',
    statement: R`<p>$n$ people start as strangers. ${c('union a b')} makes $a$ and $b$ friends, and friends of friends are in the same group. ${c('same a b')} asks whether $a$ and $b$ are in the same group: print ${c('YES')} or ${c('NO')}.</p>`, input: R`<p>$n$ and $q$ ($1 \le n, q \le 10^5$), then $q$ operations.</p>`, output: R`<p>One line per ${c('same')}.</p>`,
    samples: [T(dsuRef)('5 5\nunion 1 2\nsame 1 2\nsame 1 3\nunion 2 3\nsame 1 3\n')], tests: [T(dsuRef)('1 1\nsame 1 1\n'), G(dsuRef, (r) => { const n = 60000; let s = n + ' 80000\n'; for (let i = 0; i < 80000; i++) s += (r() < 0.93 ? 'union ' : 'same ') + r.int(1, n) + ' ' + r.int(1, n) + '\n'; return s; })],
    hints: [R`Re-running a BFS for every query is too slow.`, R`Union-find with path compression: each operation is almost $O(1)$.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, q = int(d[0]), int(d[1])\np = list(range(n + 1))\ndef find(x):\n    while p[x] != x:\n        p[x] = p[p[x]]\n        x = p[x]\n    return x\nout = []\nk = 2\nfor _ in range(q):\n    op, a, b = d[k], find(int(d[k + 1])), find(int(d[k + 2]))\n    k += 3\n    if op == b"union":\n        if a != b:\n            p[a] = b\n    else:\n        out.append("YES" if a == b else "NO")\nprint("\\n".join(out))\n' } });
  const fwRef = (s) => { const t = toks(s); const n = +t[0], q = +t[1]; const a = new Array(n + 1).fill(0); const bit = new Array(n + 1).fill(0); const add = (i, d) => { for (; i <= n; i += i & -i) bit[i] += d; }; const pre = (i) => { let r = 0; for (; i > 0; i -= i & -i) r += bit[i]; return r; }; for (let i = 1; i <= n; i++) { a[i] = +t[1 + i]; add(i, a[i]); } const o = []; let k = 2 + n; for (let i = 0; i < q; i++) { const op = t[k], x = +t[k + 1], y = +t[k + 2]; k += 3; if (op === 'set') { add(x, y - a[x]); a[x] = y; } else o.push(pre(y) - pre(x - 1)); } return o.join('\n') + (o.length ? '\n' : ''); };
  PB.addChallenge({ id: 'cp-fenwick', chapter: 'cp-structures', title: 'Changing sums', level: 'hard',
    statement: R`<p>An array changes while you are asked about it. ${c('set i x')} sets $a_i = x$; ${c('sum l r')} asks for $a_l + \dots + a_r$.</p>`, input: R`<p>$n$ and $q$ ($1 \le n, q \le 10^5$), then $a_1 \dots a_n$, then $q$ operations. All values satisfy $|x| \le 10^6$.</p>`, output: R`<p>One line per ${c('sum')}.</p>`,
    samples: [T(fwRef)('5 4\n1 2 3 4 5\nsum 1 5\nset 3 10\nsum 2 4\nsum 3 3\n')], tests: [T(fwRef)('1 2\n-4\nsum 1 1\nset 1 7\n'), G(fwRef, (r) => { const n = 50000, q = 50000; const a = []; for (let i = 0; i < n; i++) a.push(r.int(-1e6, 1e6)); let s = n + ' ' + q + '\n' + a.join(' ') + '\n'; for (let i = 0; i < q; i++) { if (r() < 0.95) s += 'set ' + r.int(1, n) + ' ' + r.int(-1e6, 1e6) + '\n'; else { const l = r.int(1, n); s += 'sum ' + l + ' ' + r.int(l, n) + '\n'; } } return s; })],
    hints: [R`Plain prefix sums need an $O(n)$ rebuild after each ${c('set')}: $10^{10}$ in the worst case.`, R`A Fenwick tree: ${c('set')} becomes ${c('add(i, x - a[i])')}; ${c('sum')} is two prefix queries.`],
    solution: { python: 'import sys\nd = sys.stdin.buffer.read().split()\nn, q = int(d[0]), int(d[1])\na = [0] + [int(x) for x in d[2:2 + n]]\nt = [0] * (n + 1)\nfor i in range(1, n + 1):\n    t[i] += a[i]\n    j = i + (i & -i)\n    if j <= n:\n        t[j] += t[i]\ndef add(i, dl):\n    while i <= n:\n        t[i] += dl\n        i += i & -i\ndef pre(i):\n    s = 0\n    while i > 0:\n        s += t[i]\n        i -= i & -i\n    return s\nout = []\nk = 2 + n\nfor _ in range(q):\n    op, x, y = d[k], int(d[k + 1]), int(d[k + 2])\n    k += 3\n    if op == b"set":\n        add(x, y - a[x])\n        a[x] = y\n    else:\n        out.append(pre(y) - pre(x - 1))\nprint("\\n".join(map(str, out)))\n' } });
})();
