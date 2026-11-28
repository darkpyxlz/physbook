/* Expanded text for computing 15–21: the competitive programming book. */
(function () {
  const { R, K, c } = PB.csKit();
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('cp-complexity', {
    0: { html: R`
<h3 class="sub">Reading a statement like a contestant</h3>
<ol><li>Read the whole statement, then the input and output format, then the constraints: they decide the algorithm.</li>
<li>Work through the samples by hand. If your understanding does not reproduce them, re-read.</li>
<li>Think of edge cases before coding: smallest input, all equal, maximum values.</li>
<li>Write the simplest correct solution that fits the limits; optimise only if the complexity demands it.</li></ol>
<p>Contests differ: <strong>IOI-style</strong> olympiads award partial points per subtask (small constraints first), so a brute force earns real marks; <strong>ICPC-style</strong> contests are all-or-nothing per problem with time penalties for wrong submissions; <strong>Codeforces</strong> rounds reward speed. Practice platforms (Codeforces, AtCoder, USACO Guide, Kattis, CSES) have thousands of graded problems.</p>
<div class="worked"><p>A problem gives $n \le 10^5$ queries, each asking for the sum of a range of an array of size $10^5$. A friend's solution sums each range with a loop and gets TLE. Why, and what is the fix?</p>
<p>Worst case $10^5 \times 10^5 = 10^{10}$ additions. Prefix sums answer each query in $O(1)$ after $O(n)$ preparation (Sorting and Searching chapter).</p></div>` },
    1: { html: R`
<h3 class="sub">Formal big-O and its cousins</h3>
<p>$f(n) = O(g(n))$ means that for large enough $n$, $f(n) \le C\,g(n)$ for some constant $C$: $g$ is an upper bound on the growth rate. $\Omega$ is a lower bound and $\Theta$ a tight bound (both). In practice people say $O$ when they mean $\Theta$.</p>
<p>Analysing code: sequential parts add (keep the biggest), nested loops multiply, and a loop that halves its range is logarithmic. Recursion gives recurrences: merge sort satisfies $T(n) = 2T(n/2) + O(n)$, so $T(n) = O(n\log n)$; binary search $T(n) = T(n/2) + O(1) = O(\log n)$; naive Fibonacci $T(n) = T(n - 1) + T(n - 2)$ grows like $1.6^n$.</p>
<div class="worked"><p>What is the complexity of this code? ${c('for i in range(n): j = 1')} / ${c('while j < n: j *= 2')} / ${c('for k in range(10): work()')}</p>
<p>Outer $n$, middle $\log n$, inner constant 10: $O(n\log n)$. Constants like 10 disappear in big-O, but they still matter when you compare two solutions with the same complexity.</p></div>
<p><strong>Memory</strong> matters too: a limit of 256 MB holds about 64 million ints or 32 million long longs. A $10^5\times10^5$ table is impossible; a $5000\times5000$ int table (100 MB) is borderline.</p>` },
    2: { html: R`
<h3 class="sub">Python-specific speed tips</h3>
<p>Python is roughly 30–100 times slower than C++ for simple loops, so the constraint table shifts: about $10^7$ simple operations per second. Habits that help:</p>
<ul><li>Read all input at once: ${c('data = sys.stdin.buffer.read().split()')} and walk an index through it. Calling ${c('input()')} $10^5$ times is noticeably slow.</li>
<li>Print once: collect answers in a list and ${c('print("\\n".join(map(str, out)))')}.</li>
<li>Use built-ins written in C: ${c('sorted')}, ${c('sum')}, ${c('max')}, slicing, ${c('collections.Counter')}, ${c('bisect')}, ${c('heapq')}.</li>
<li>Avoid deep recursion (raise the limit with ${c('sys.setrecursionlimit')}, or better, use an explicit stack).</li>
<li>Local variables are faster than global ones: put the main code in a function.</li></ul>
<p>When an $O(n\log n)$ Python solution still times out, the honest answer is often to switch to C++ for that problem. Many contestants prototype in Python and submit in C++.</p>` },
    3: { html: R`
<h3 class="sub">A stress-testing script, step by step</h3>
<p>The workflow: a <strong>generator</strong> that makes small random inputs, a <strong>brute force</strong> you trust, your <strong>fast solution</strong>, and a loop that compares them until they disagree:</p>
${K('shell', R`
# gen.py prints a random test; brute.py and fast.py read it from stdin
$ for i in $(seq 1 500); do
>   python3 gen.py $i > in.txt
>   python3 brute.py < in.txt > a.txt
>   python3 fast.py < in.txt > b.txt
>   cmp -s a.txt b.txt || { echo "differ on test $i"; cat in.txt; break; }
> done`)}
<p>Keep the random tests <em>tiny</em> (2–6 elements, values 1–5): bugs show up quickly and the failing case is easy to trace by hand. Seed the generator with the loop counter so a failure can be reproduced.</p>
<h3 class="sub">Debugging checklist for Wrong Answer</h3>
<ol><li>Overflow: do sums or products exceed $2^{31}$? Use 64-bit integers.</li><li>Off-by-one errors in loops and binary searches.</li><li>Uninitialised or not-reset variables between test cases.</li><li>Edge cases: $n = 1$, empty answer, equal values, negative numbers.</li><li>Output format: spaces, newlines, required decimals, "YES" versus "Yes".</li><li>Misread the statement: re-read every sentence.</li></ol>` }
  });

  X('cp-sorting', {
    0: { html: R`
<h3 class="sub">Sorting as a first move</h3>
<p>When a problem says nothing about order, sorting usually costs nothing ($O(n\log n)$ is cheap) and makes everything else easier:</p>
<ul><li><strong>Duplicates</strong> become neighbours: count distinct values with one pass.</li>
<li><strong>Closest pair</strong> of numbers is between neighbours: the minimum difference is the smallest gap in sorted order.</li>
<li><strong>Greedy</strong> choices become possible (next chapters).</li>
<li><strong>Coordinate compression</strong>: replace values up to $10^9$ by their ranks $0..n-1$, so they can index arrays.</li></ul>
<div class="worked"><p>Given $n$ appointments as (start, end), find whether any two overlap.</p>
<p>Sort by start; then an overlap exists exactly when some appointment starts before the previous one ends. One sort and one pass: $O(n\log n)$, instead of checking all $n^2/2$ pairs.</p></div>
<p>Sorting by a custom key is everywhere: in C++ pass a comparator or sort pairs/tuples (compared element by element); in Python use ${c('key=lambda x: (x[1], -x[0])')}.</p>` },
    1: { html: R`
<h3 class="sub">Variants and off-by-one bugs</h3>
<p>Most binary search bugs come from mixing conventions. Fix one meaning for ${c('lo')} and ${c('hi')} and never break it. The template above searches a half-open range $[lo, hi)$ for the first position where a condition becomes true. Two useful variants:</p>
<ul><li><strong>Last position</strong> where ${c('a[i] <= x')}: ${c('bisect_right(a, x) - 1')}.</li>
<li><strong>Count</strong> of values in $[L, R]$: ${c('bisect_right(a, R) - bisect_left(a, L)')}.</li></ul>
<p>Binary search also works on <strong>real numbers</strong>: repeat 60–100 halvings instead of checking ${c('lo < hi')}, since each halving gains one binary digit.</p>
<div class="worked"><p>Find $\sqrt[3]{2}$ to 9 decimal places by bisection.</p>
<p>Start with $[1, 2]$; check whether ${c('mid ** 3 < 2')} and keep the half containing the root. After about 30 halvings the interval is below $10^{-9}$: 1.259921050. Bisection is slower than Newton's method but can never go wrong.</p></div>` },
    2: { html: R`
<h3 class="sub">Recognising "binary search on the answer"</h3>
<p>Signals in a statement: "minimise the maximum", "maximise the minimum", "smallest time such that…", "largest size that fits". The method needs a <strong>decision version</strong> ("is $T$ achievable?") that is monotone and easier to check than to optimise directly. Typical checks are greedy passes in $O(n)$.</p>
<div class="worked"><p>$n$ machines take $t_i$ seconds per item. What is the least time to make $k$ items with all machines working in parallel?</p>
<p>In time $T$ machine $i$ makes $\lfloor T/t_i\rfloor$ items; the check "$\sum\lfloor T/t_i\rfloor \ge k$?" is monotone in $T$. Binary search $T$ between 1 and $k\cdot\min t_i$. With $t = (2, 3, 7)$ and $k = 10$: at $T = 12$ we get $6 + 4 + 1 = 11 \ge 10$; at $T = 11$, $5 + 3 + 1 = 9$. Answer 12.</p></div>
<p>Watch the search bounds (the upper bound must certainly be achievable) and overflow in the check (the sum can exceed $2^{63}$ for huge $T$: stop adding once it reaches $k$).</p>` },
    3: { html: R`
<h3 class="sub">2D prefix sums and difference arrays</h3>
<p>In a grid, $P[i][j]$ = sum of the rectangle from the top-left corner to $(i, j)$, built by $P[i][j] = a[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]$. Then any rectangle sum is four lookups (inclusion–exclusion).</p>
<p>The reverse trick, a <strong>difference array</strong>, handles many range <em>updates</em>: to add $v$ to positions $l..r$, do ${c('d[l] += v; d[r + 1] -= v')}; after all updates, the prefix sums of $d$ give the final array. $q$ updates cost $O(q + n)$ instead of $O(qn)$.</p>
<div class="worked"><p>Five lamps start off; you switch on ranges 1–3, 2–5 and 2–2 (adding 1 brightness each). Final brightnesses?</p>
<p>d (1-indexed, size 6): +1 at 1, −1 at 4; +1 at 2, −1 at 6; +1 at 2, −1 at 3. d = [1, 2, −1, −1, 0, −1]; prefix sums: 1, 3, 2, 1, 1.</p></div>
<h3 class="sub">Two pointers versus hashing</h3>
<p>For "pairs with sum $k$", sorting plus two pointers costs $O(n\log n)$ and $O(1)$ extra memory; a hash set costs $O(n)$ time and $O(n)$ memory. Both beat $O(n^2)$. The sliding window generalises to "longest substring with at most $k$ distinct characters" and many similar questions.</p>` }
  });

  X('cp-greedy', {
    0: { html: R`
<h3 class="sub">Thinking recursively</h3>
<p>To write a recursive solution, assume the function already works on smaller inputs (the "recursive leap of faith") and ask how to build the answer from those smaller answers. Examples:</p>
<ul><li>Sum of a list: first element + sum of the rest.</li><li>Power set of $\{a\} \cup S$: the subsets of $S$, plus each of them with $a$ added.</li><li>Merge sort: sort each half, then merge.</li><li>Fast power: $x^n = (x^{n/2})^2$, times $x$ if $n$ is odd.</li></ul>
${K('python', R`
def permutations(xs):
    if len(xs) <= 1:
        return [xs]
    out = []
    for i, x in enumerate(xs):                       # choose the first element
        for rest in permutations(xs[:i] + xs[i+1:]):  # permute the others
            out.append([x] + rest)
    return out
print(len(permutations([1, 2, 3, 4])), permutations([1, 2, 3])[:3])`, true)}
<div class="worked"><p>How many calls does ${c('permutations')} make for a list of length 4?</p>
<p>$C(n) = 1 + n\,C(n - 1)$ with $C(1) = 1$: $C(2) = 3$, $C(3) = 10$, $C(4) = 41$. The output alone has $n!$ lists, so this is inherently exponential.</p></div>` },
    1: { html: R`
<h3 class="sub">Pruning makes or breaks a search</h3>
<p>Good pruning rules: stop when the partial answer already exceeds a known best (<strong>branch and bound</strong>); stop when the remaining items cannot possibly reach the target; try the most constrained choice first; and break symmetry so equivalent solutions are only explored once.</p>
${K('python', R`
def subset_sum_count(a, target):
    a = sorted(a, reverse=True)            # big items first: overshoot is detected sooner
    suffix = [0] * (len(a) + 1)
    for i in range(len(a) - 1, -1, -1):
        suffix[i] = suffix[i + 1] + a[i]   # total of everything still available
    count = 0
    def go(i, s):
        nonlocal count
        if s == target: count += 1; return
        if i == len(a) or s > target or s + suffix[i] < target: return   # prune
        go(i + 1, s + a[i])
        go(i + 1, s)
    go(0, 0)
    return count
print(subset_sum_count([3, 34, 4, 12, 5, 2], 9))   # 2: {4, 5} and {3, 4, 2}`, true)}
<p>(The pruning assumes non-negative numbers.) <strong>Meet in the middle</strong> is a stronger trick for $n$ up to about 40: split the items into halves, list all $2^{n/2}$ sums of each half, sort one list, and match pairs with binary search: $O(2^{n/2}n)$ instead of $O(2^n)$.</p>` },
    2: { html: R`
<h3 class="sub">Classic greedy problems</h3>
<ul><li><strong>Coin change</strong> with canonical coins (1, 2, 5, 10, …): take the largest coin that fits.</li>
<li><strong>Fractional knapsack</strong>: take items by value per kilogram, splitting the last one. (The 0/1 version, without splitting, needs DP.)</li>
<li><strong>Minimising waiting time</strong>: serve the shortest jobs first.</li>
<li><strong>Huffman coding</strong>: repeatedly merge the two least frequent symbols; the result is an optimal prefix code.</li>
<li><strong>Minimum spanning tree</strong>: Kruskal adds the cheapest edge that does not form a cycle.</li>
<li><strong>Deadlines</strong>: to finish as many tasks as possible on time, process by deadline and drop the longest task whenever you fall behind (using a heap).</li></ul>
<div class="worked"><p>Fractional knapsack, capacity 50: items (weight, value) = (10, 60), (20, 100), (30, 120). Best value?</p>
<p>Value per kg: 6, 5, 4. Take all of the first two (30 kg, 160), then 20 kg of the third (80): 240. With no splitting allowed, greedy by ratio gives 160 + nothing = 160, but the best is 100 + 120 = 220, which is why 0/1 knapsack needs DP.</p></div>` },
    3: { html: R`
<h3 class="sub">How to test a greedy idea quickly</h3>
<p>Before proving anything, try to break it. Write the brute force, generate small random cases, and compare: most wrong greedy ideas fail on cases with 3–5 items. If it survives thousands of random tests, look for the exchange argument.</p>
<div class="worked"><p>Is "always pick the shortest meeting" optimal for interval scheduling?</p>
<p>No: meetings (1, 5), (4, 7), (6, 10). Shortest is (4, 7), which blocks both others: 1 meeting. Earliest-end picks (1, 5) and (6, 10): 2 meetings.</p></div>
<h3 class="sub">Greedy stays ahead</h3>
<p>Another proof style: show that after each step, the greedy solution is at least as good as any other solution after the same number of steps. For interval scheduling: after $k$ choices, the greedy's $k$th meeting ends no later than the $k$th meeting of any valid schedule (by induction), so the greedy can always fit at least as many meetings.</p>
<p>Many hard problems have no correct greedy; but greedy algorithms often give good <em>approximations</em>, which is how real logistics software handles problems like the travelling salesman.</p>` }
  });

  X('cp-dp', {
    0: { html: R`
<h3 class="sub">Top-down versus bottom-up</h3>
<p><strong>Top-down</strong> (memoised recursion) is easiest to write: copy the recursive definition and add a cache. It only computes the states it needs. <strong>Bottom-up</strong> (tabulation) fills a table in an order where every dependency is ready; it avoids recursion limits and is usually faster, and it makes memory savings visible (keeping only the last row or two).</p>
${K('python', R`
from functools import lru_cache
@lru_cache(maxsize=None)
def ways(n):                       # top-down: ways to climb n steps by 1, 2 or 3
    if n < 0: return 0
    if n == 0: return 1
    return ways(n - 1) + ways(n - 2) + ways(n - 3)

def ways_table(n):                 # bottom-up, keeping only three numbers
    a, b, c = 0, 0, 1              # ways(-2), ways(-1), ways(0)
    for _ in range(n):
        a, b, c = b, c, a + b + c
    return c
print(ways(30), ways_table(30))    # 53798080 53798080`, true)}
<div class="worked"><p>A frog on stone 1 of $n$ stones, heights $h_i$, can jump 1 or 2 stones ahead, paying $|h_i - h_j|$. Define the DP.</p>
<p>State $dp[i]$ = minimum cost to reach stone $i$. Transition $dp[i] = \min(dp[i-1] + |h_i - h_{i-1}|,\ dp[i-2] + |h_i - h_{i-2}|)$. Base $dp[1] = 0$. Answer $dp[n]$. $O(n)$.</p></div>` },
    1: { html: R`
<h3 class="sub">Counting versus optimising</h3>
<p>The same table can count solutions (combine with ${c('+')}) or find the best (combine with ${c('min')}/${c('max')}). Counting problems often ask for the answer modulo $10^9 + 7$: reduce after every addition. Watch the <strong>loop order</strong> in coin problems: looping coins outside and amounts inside counts <em>combinations</em> (1 + 2 and 2 + 1 the same); looping amounts outside counts <em>ordered sequences</em>.</p>
<div class="worked"><p>With coins 1 and 2, how many ways to make 4 as combinations, and as ordered sequences?</p>
<p>Combinations: {1,1,1,1}, {1,1,2}, {2,2}: 3. Ordered: 1111, 112, 121, 211, 22: 5 (Fibonacci).</p></div>
<h3 class="sub">Reconstructing the answer</h3>
<p>To output the solution itself (which coins, which items), store for each state which choice achieved its value, or recompute: walk back from the final state, at each step finding a predecessor consistent with the table. The DP-table lab traces LCS back this way.</p>` },
    2: { html: R`
<h3 class="sub">LIS in O(n log n)</h3>
<p>Keep an array ${c('tails')} where ${c('tails[k]')} is the smallest possible last element of an increasing subsequence of length $k + 1$. For each new value, binary search the first tail ≥ it and replace it (or append if none). ${c('tails')} stays sorted, and its length is the answer.</p>
${K('python', R`
from bisect import bisect_left
def lis(a):
    tails = []
    for x in a:
        i = bisect_left(tails, x)
        if i == len(tails): tails.append(x)
        else: tails[i] = x
    return len(tails)
print(lis([10, 9, 2, 5, 3, 7, 101, 18]), lis([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))   # 4 4`, true)}
<h3 class="sub">Knapsack variants</h3>
<ul><li><strong>Unbounded</strong> (each item any number of times): loop capacity <em>upwards</em>.</li>
<li><strong>Bounded</strong> (item $i$ at most $c_i$ times): split into powers of two (1, 2, 4, …) and treat as 0/1 items.</li>
<li><strong>Value-indexed</strong>: when weights are huge but values small, let the state be "minimum weight to reach value $v$".</li></ul>
<div class="worked"><p>Why does the 0/1 knapsack loop go downwards over capacity?</p>
<p>Going downwards, ${c('best[cap - w]')} still holds the value from <em>before</em> this item was considered, so the item is used at most once. Going upwards would reuse the freshly updated value: the unbounded version.</p></div>` },
    3: { html: R`
<h3 class="sub">More DP shapes</h3>
<ul><li><strong>Interval DP</strong>: $dp[l][r]$ for a segment, combining smaller segments: optimal matrix-chain multiplication, removing a string by palindromes, the classic "burst balloons". Usually $O(n^3)$.</li>
<li><strong>Bitmask DP</strong>: the state includes a set of used items as a bit pattern, for $n \le 20$: travelling salesman in $O(2^nn^2)$, assignment problems.</li>
<li><strong>DP on trees</strong>: compute each node's value from its children's, in one DFS: maximum independent set, tree diameter.</li>
<li><strong>Digit DP</strong>: count numbers up to $N$ with a digit property, going digit by digit with a "still equal to $N$'s prefix" flag.</li></ul>
<div class="worked"><p>Edit distance between "SUNDAY" and "SATURDAY"?</p>
<p>3: insert A, insert T, replace N with R. The DP table (7 × 9) fills in $O(nm)$, and the same recurrence, with biologically motivated costs, aligns DNA sequences.</p></div>
<p>A general recipe when stuck: write the brute-force recursion, notice which arguments actually change (that is your state), check how many distinct states there are, and memoise.</p>` }
  });

  X('cp-graphs', {
    0: { html: R`
<h3 class="sub">Reading graph input</h3>
<p>Contest graphs usually arrive as $n$ and $m$ followed by $m$ edges "a b" (possibly with a weight), vertices numbered from 1. Build an adjacency list of size $n + 1$, adding both directions for undirected graphs. Watch for self-loops and repeated edges, which most algorithms tolerate but some formulas (like "trees have $n - 1$ edges") do not.</p>
<p>Many problems hide a graph: cities and roads obviously, but also words that differ by one letter, states of a puzzle (each move an edge), cells of a grid, or people and friendships. Recognising the graph is often the main step.</p>
<div class="worked"><p>A puzzle has 3 jugs and you can pour between them. How do you find the fewest pours to reach a target amount?</p>
<p>Each state (contents of the three jugs) is a vertex; each possible pour is an edge. BFS from the starting state finds the fewest pours. There are at most $(A + 1)(B + 1)(C + 1)$ states, so it is fast.</p></div>` },
    1: { html: R`
<h3 class="sub">What else DFS finds</h3>
<ul><li><strong>Cycle detection</strong>: in an undirected graph, meeting an already-visited vertex that is not your parent means a cycle. In a directed graph, track vertices "on the current path": an edge back to one is a cycle.</li>
<li><strong>Bipartite check</strong>: colour vertices alternately; a conflict means an odd cycle.</li>
<li><strong>Topological order</strong>: list vertices in reverse order of finishing time.</li>
<li><strong>Flood fill</strong>: counting islands in a grid of land and water.</li></ul>
${K('python', R`
def is_bipartite(n, adj):
    colour = [-1] * n
    for s in range(n):
        if colour[s] != -1: continue
        colour[s] = 0
        stack = [s]
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if colour[v] == -1:
                    colour[v] = 1 - colour[u]; stack.append(v)
                elif colour[v] == colour[u]:
                    return False                 # an odd cycle
    return True
print(is_bipartite(4, [[1, 3], [0, 2], [1, 3], [0, 2]]), is_bipartite(3, [[1, 2], [0, 2], [0, 1]]))   # True False`, true)}` },
    2: { html: R`
<h3 class="sub">BFS variations</h3>
<ul><li><strong>Multi-source BFS</strong>: start with several vertices in the queue at distance 0 (for "distance to the nearest exit" or fire spreading from many points).</li>
<li><strong>Path reconstruction</strong>: store each vertex's parent when you discover it, then follow parents back from the target.</li>
<li><strong>0–1 BFS</strong>: edges of weight 0 or 1, using a deque (weight-0 neighbours to the front).</li>
<li><strong>BFS on states</strong>: (cell, keys collected), (position, direction): the vertex can be any tuple.</li></ul>
<div class="worked"><p>A knight starts at a1. How many squares can it reach in at most 2 moves?</p>
<p>Layer 0: a1. Layer 1: b3, c2. Layer 2: from b3 the new squares are a5, c1, c5, d2, d4; from c2 also a3, b4, e1, e3 (d4 is shared). That is 9 squares at distance 2, so $1 + 2 + 9 = 12$ in total. BFS computes such layers automatically.</p></div>` },
    3: { html: R`
<h3 class="sub">Topological sort with Kahn's algorithm</h3>
<p>In a directed acyclic graph (DAG), repeatedly take a vertex with no incoming edges, output it, and delete its outgoing edges. If vertices remain but none is free, there is a cycle.</p>
${K('python', R`
from collections import deque
def topo(n, edges):                      # edges a -> b mean "a before b"
    adj = [[] for _ in range(n)]; indeg = [0] * n
    for a, b in edges:
        adj[a].append(b); indeg[b] += 1
    q = deque(v for v in range(n) if indeg[v] == 0)
    order = []
    while q:
        u = q.popleft(); order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return order if len(order) == n else None     # None: there is a cycle
print(topo(5, [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]))   # [0, 1, 2, 3, 4]`, true)}
<p>On a DAG, shortest and longest paths are easy: process vertices in topological order and relax edges. Longest path on a DAG gives the critical path of a project schedule. <strong>Floyd–Warshall</strong> handles all pairs on small graphs with a triple loop, ${c('d[i][j] = min(d[i][j], d[i][k] + d[k][j])')}, with ${c('k')} outermost.</p>` }
  });

  X('cp-structures', {
    0: { html: R`
<h3 class="sub">Queues in practice</h3>
<p>Python's ${c('collections.deque')} and C++'s ${c('deque')} give $O(1)$ pushes and pops at both ends. A <strong>monotonic deque</strong> answers sliding-window maximum in $O(n)$: keep indices whose values are decreasing; drop from the back anything smaller than the new value (it can never be the maximum again), and from the front anything that has left the window.</p>
${K('python', R`
from collections import deque
def window_max(a, k):
    dq, out = deque(), []
    for i, x in enumerate(a):
        while dq and a[dq[-1]] <= x: dq.pop()      # smaller values are useless now
        dq.append(i)
        if dq[0] <= i - k: dq.popleft()            # left the window
        if i >= k - 1: out.append(a[dq[0]])
    return out
print(window_max([1, 3, -1, -3, 5, 3, 6, 7], 3))   # [3, 3, 5, 5, 6, 7]`, true)}
<p>The <strong>stack</strong> also evaluates expressions: convert infix to postfix with the shunting-yard algorithm, then evaluate postfix by pushing numbers and popping two for each operator. It is how calculators and compilers handle precedence.</p>` },
    1: { html: R`
<h3 class="sub">Heaps beyond the minimum</h3>
<ul><li><strong>Top k</strong> of a stream: keep a min-heap of size $k$; when it overflows, pop the smallest. $O(n\log k)$.</li>
<li><strong>Merge k sorted lists</strong>: heap of the current head of each list.</li>
<li><strong>Running median</strong>: a max-heap for the lower half and a min-heap for the upper half, rebalanced to differ in size by at most one.</li>
<li><strong>Event simulation</strong>: a heap of (time, event) always gives the next event to process.</li></ul>
<p>Building a heap from $n$ items with ${c('heapify')} takes only $O(n)$ (sifting down from the bottom up), not $O(n\log n)$. A heap does not support "find" or "delete arbitrary item" efficiently: for those use a balanced tree (C++ ${c('set')}) or <strong>lazy deletion</strong> (mark items as deleted and skip them when they reach the top, as Dijkstra does).</p>
<div class="worked"><p>Numbers 5, 15, 1, 3 arrive. Show the two heaps of the running median after each.</p>
<p>5: low {5}. 15: low {5}, high {15}, median 10. 1: low {5, 1}, high {15}, median 5. 3: low {3, 1}, high {5, 15}, median 4 (moving 5 up to keep sizes equal).</p></div>` },
    2: { html: R`
<h3 class="sub">Union-find with extra information</h3>
<p>The roots can carry data about their whole set: its size, its minimum, a count of edges (to detect when a component becomes a cycle). Merging combines them. Weighted union-find also stores, for each element, a value relative to its parent, answering questions like "how much heavier is $a$ than $b$?".</p>
<div class="worked"><p>Edges arrive one at a time: (1,2), (3,4), (2,3), (1,4). After each, how many components are there among vertices 1–5, and does the new edge close a cycle?</p>
<p>Start 5. (1,2): 4. (3,4): 3. (2,3): 2. (1,4): 1 and 4 already share a root, so it closes a cycle and the count stays 2.</p></div>
<h3 class="sub">Kruskal's algorithm</h3>
${K('python', R`
def kruskal(n, edges):                    # edges as (weight, u, v)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    total = 0
    for w, u, v in sorted(edges):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv; total += w
    return total
print(kruskal(4, [(1, 0, 1), (2, 1, 2), (3, 0, 2), (4, 2, 3), (5, 1, 3)]))   # 7`, true)}` },
    3: { html: R`
<h3 class="sub">Segment trees in brief</h3>
<p>A segment tree stores, for each node, a summary (sum, minimum, maximum, gcd…) of a range of the array, with the root covering everything and each node split between two children. Point updates and range queries both take $O(\log n)$, and with <strong>lazy propagation</strong> it also supports range updates ("add 5 to positions 10–2000"). It is longer to write than a Fenwick tree but works for any associative operation, not just sums.</p>
<div class="worked"><p>Which structure would you choose for each? (a) Range-minimum queries on a fixed array; (b) range sums with point updates; (c) range minimum with point updates; (d) "how many elements smaller than $x$ inserted so far".</p>
<p>(a) A sparse table: $O(n\log n)$ preparation, $O(1)$ queries. (b) Fenwick tree. (c) Segment tree. (d) Fenwick tree over compressed values (or an ordered set).</p></div>
<p>Counting <strong>inversions</strong> with a Fenwick tree: go through the array from left to right; for each value, query how many earlier values are larger (total so far minus prefix count up to it), then add it. $O(n\log n)$, the same as merge sort counting.</p>` }
  });

  X('cp-maths', {
    0: { html: R`
<h3 class="sub">Modular arithmetic in code, language by language</h3>
<p>Python integers never overflow, but reducing anyway keeps them small and fast. In C++, ${c('a * b % MOD')} with ${c('long long')} is safe for $a, b < 10^9 + 7$; for moduli near $10^{18}$ use ${c('__int128')}. In JavaScript numbers are exact only to $2^{53}$, so products of two numbers near $10^9$ overflow: use ${c('BigInt')} or split the multiplication.</p>
${K('cpp', R`
const long long MOD = 1'000'000'007;
long long add(long long a, long long b) { return (a + b) % MOD; }
long long sub(long long a, long long b) { return ((a - b) % MOD + MOD) % MOD; }
long long mul(long long a, long long b) { return a * b % MOD; }`)}
<div class="worked"><p>Compute $\sum_{k=1}^{10^6}k^2 \bmod (10^9 + 7)$ without overflow, and check it with the formula.</p>
<p>Loop with ${c('s = (s + k * k % M) % M')}. Formula: $\dfrac{n(n + 1)(2n + 1)}{6}$; modulo a prime, "divide by 6" means multiply by the inverse of 6, i.e. $6^{M-2} \bmod M$. Both give 333333833333500000 mod M.</p></div>` },
    1: { html: R`
<h3 class="sub">Matrix exponentiation</h3>
<p>Fast exponentiation works for anything you can multiply associatively, including matrices. The Fibonacci step is a matrix: $\begin{pmatrix}F_{n+1}\\F_n\end{pmatrix} = \begin{pmatrix}1 & 1\\1 & 0\end{pmatrix}\begin{pmatrix}F_n\\F_{n-1}\end{pmatrix}$, so $F_n$ for $n = 10^{18}$ takes about 60 matrix multiplications. Any linear recurrence of order $k$ works the same way with a $k\times k$ matrix, in $O(k^3\log n)$.</p>
${K('python', R`
M = 10**9 + 7
def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) % M for j in range(len(B[0]))] for i in range(len(A))]
def matpow(A, e):
    R = [[int(i == j) for j in range(len(A))] for i in range(len(A))]
    while e:
        if e & 1: R = matmul(R, A)
        A = matmul(A, A); e >>= 1
    return R
fib = lambda n: matpow([[1, 1], [1, 0]], n)[0][1]
print(fib(10), fib(10**18))`, true)}
<p>Counting paths of length exactly $L$ in a graph is the same trick: the $(i, j)$ entry of $A^L$, where $A$ is the adjacency matrix.</p>` },
    2: { html: R`
<h3 class="sub">Factorising and counting divisors fast</h3>
<p>Trial division up to $\sqrt n$ factorises numbers up to about $10^{12}$ quickly. For many queries up to $10^7$, sieve the <strong>smallest prime factor</strong> of every number once; then each number factorises by repeated division by its smallest prime factor in $O(\log n)$.</p>
${K('python', R`
N = 100
spf = list(range(N + 1))                 # smallest prime factor
for i in range(2, int(N**0.5) + 1):
    if spf[i] == i:
        for j in range(i * i, N + 1, i):
            if spf[j] == j: spf[j] = i
def factor(n):
    out = {}
    while n > 1:
        p = spf[n]; out[p] = out.get(p, 0) + 1; n //= p
    return out
f = factor(84)
divisors = 1
for e in f.values(): divisors *= e + 1
print(f, divisors)                       # {2: 2, 3: 1, 7: 1} 12`, true)}
<p>Other number-theory staples: the <strong>extended Euclidean algorithm</strong> (inverses modulo non-primes and solving $ax + by = c$); the <strong>Chinese remainder theorem</strong> to combine answers modulo several primes; Euler's totient via the factorisation; and <strong>Miller–Rabin</strong> for testing primality of 64-bit numbers.</p>` },
    3: { html: R`
<h3 class="sub">Combinatorics with modular inverses</h3>
<p>With factorials and inverse factorials precomputed, many counting formulas become one-liners:</p>
<ul><li>Paths in an $a\times b$ grid: $\binom{a + b}{a}$.</li><li>Stars and bars: $\binom{n + k - 1}{k - 1}$.</li><li>Catalan numbers: $\binom{2n}{n} - \binom{2n}{n + 1}$.</li><li>Derangements: $D_n = (n - 1)(D_{n-1} + D_{n-2})$.</li></ul>
<div class="worked"><p>How many grid paths from (0, 0) to (6, 6) avoid the blocked point (3, 3)?</p>
<p>All paths $\binom{12}{6} = 924$, minus those through (3, 3): $\binom63^2 = 400$. Answer 524. With several blocked points, sort them and use inclusion–exclusion or a DP over the blocked points.</p></div>
<p><strong>Lucas's theorem</strong> handles $\binom nk \bmod p$ when $n$ exceeds the prime $p$ (write both in base $p$). When the modulus is not prime, inverses may not exist: factorise the modulus, compute modulo each prime power, and combine with the Chinese remainder theorem.</p>
<div class="insight"><p>This chapter is where the two olympiads meet: the Number Theory and Counting chapters of the maths book supply the theorems, and this chapter turns them into programs that run in microseconds.</p></div>` }
  });
})();
