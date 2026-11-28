/* Expanded text for computing 9–14: JavaScript, the DOM, asynchronous code, C++ basics, memory, the STL. */
(function () {
  const { R, K, c } = PB.csKit();
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('js-basics', {
    0: { html: R`
<h3 class="sub">Scope: where a variable lives</h3>
<p>${c('let')} and ${c('const')} are <strong>block-scoped</strong>: a variable declared inside ${c('{ }')} (an if, a loop, a function) exists only there. Using it before its declaration is an error (the "temporal dead zone"). ${c('const')} prevents reassigning the name, but not changing the object it refers to: ${c('const xs = []; xs.push(1)')} is fine.</p>
${K('javascript', R`
const limit = 3;
for (let i = 0; i < limit; i++) {
  const square = i * i;      // a fresh 'square' each time round
  console.log(i, square);
}
// console.log(square);      // ReferenceError: square is not defined here
const user = { name: "Ada" };
user.name = "Grace";         // allowed: the object changes, the name does not
console.log(user, typeof user, Array.isArray([]), typeof null);`, true)}
<h3 class="sub">Numbers, strings and conversions</h3>
<p>${c('Number("42")')} and ${c('parseInt("42px")')} convert text to numbers (the second stops at the first non-digit); ${c('String(42)')} or a template literal go the other way. ${c('(3.14159).toFixed(2)')} formats, ${c('Math.round')}, ${c('Math.floor')}, ${c('Math.random()')} and ${c('Math.max(...xs)')} cover everyday maths.</p>
<div class="worked"><p>What do ${c('parseInt("08")')}, ${c('Number("")')}, ${c('Number("12abc")')} and ${c('parseInt("12abc")')} give?</p>
<p>8, 0 (the empty string converts to 0!), NaN, and 12. Validate user input explicitly rather than trusting conversions.</p></div>` },
    1: { html: R`
<h3 class="sub">The full set of conversion rules</h3>
<p>With ${c('+')}, if either side is a string, both become strings and are joined. Other arithmetic operators convert to numbers. ${c('==')} converts types before comparing, with rules few people remember: ${c('[] == false')} is true, ${c('"" == 0')} is true, but ${c('null == 0')} is false. The modern style avoids the whole question:</p>
<ul><li>Always compare with ${c('===')} and ${c('!==')}.</li>
<li>Convert explicitly with ${c('Number()')}, ${c('String()')}, ${c('Boolean()')}.</li>
<li>Use ${c('??')} (nullish coalescing) for defaults: ${c('count ?? 0')} replaces only ${c('null')}/${c('undefined')}, while ${c('count || 0')} would also replace a legitimate 0.</li>
<li>Use optional chaining ${c('user?.address?.city')} to read nested properties that might be missing, instead of crashing with "cannot read properties of undefined".</li></ul>
<div class="worked"><p>Predict: ${c('1 + "2" + 3')}, ${c('1 + 2 + "3"')}, ${c('"5" * "2"')}, ${c('true + 1')}, ${c('[1, 2] + [3]')}.</p>
<p>${c('"123"')}, ${c('"33"')} (left to right: 3 then joined), ${c('10')}, ${c('2')}, and ${c('"1,23"')} (arrays become strings). TypeScript, a typed superset of JavaScript, flags most of these at compile time.</p></div>` },
    2: { html: R`
<h3 class="sub">Higher-order functions and this</h3>
<p>A <strong>higher-order function</strong> takes or returns functions. ${c('setTimeout(fn, 1000)')}, ${c('addEventListener("click", fn)')} and ${c('xs.map(fn)')} all take callbacks; ${c('makeCounter')} returns one. Composing small functions is the heart of the functional style:</p>
${K('javascript', R`
const compose = (f, g) => (x) => f(g(x));
const double = (x) => 2 * x, inc = (x) => x + 1;
console.log(compose(double, inc)(5), compose(inc, double)(5));   // 12 11

function memo(fn) {                         // cache results of a slow function
  const cache = new Map();
  return (n) => cache.has(n) ? cache.get(n) : (cache.set(n, fn(n)), cache.get(n));
}
const slowSquare = (n) => { for (let i = 0; i < 1e7; i++); return n * n; };
const fastSquare = memo(slowSquare);
console.log(fastSquare(9), fastSquare(9));  // the second call is instant`, true)}
<p>Inside a method, ${c('this')} is the object the method was called on. Regular functions get their own ${c('this')}; arrow functions inherit it from the surrounding code, which is why arrows are convenient for callbacks inside methods.</p>
<div class="worked"><p>Why does every button print the same number? ${c('for (var i = 0; i < 3; i++) btns[i].onclick = () => console.log(i);')}</p>
<p>${c('var')} creates one ${c('i')} shared by all three closures, and by the time anyone clicks it is 3. Changing ${c('var')} to ${c('let')} gives each iteration its own ${c('i')}.</p></div>` },
    3: { html: R`
<h3 class="sub">Spread, rest and destructuring</h3>
${K('javascript', R`
const a = [1, 2, 3];
const b = [...a, 4];                       // copy and extend
const merged = { ...{ x: 1, y: 2 }, y: 5 };  // { x: 1, y: 5 }: later keys win
const [first, ...rest] = b;                // 1, [2, 3, 4]
const { name, age = 18 } = { name: "Ada" };  // default if missing
function total(...nums) { return nums.reduce((s, n) => s + n, 0); }
console.log(b, merged, first, rest, name, age, total(1, 2, 3));`, true)}
<h3 class="sub">Map, Set and array methods worth knowing</h3>
<p>${c('Map')} is a dictionary with keys of any type and a ${c('size')}; ${c('Set')} stores unique values (${c('[...new Set(xs)]')} removes duplicates). Besides map/filter/reduce: ${c('find')} and ${c('findIndex')} (first match), ${c('some')} and ${c('every')}, ${c('flat')} and ${c('flatMap')}, ${c('slice')} (copy part) versus ${c('splice')} (modify in place), ${c('Object.entries(obj)')} to loop over key–value pairs.</p>
<div class="worked"><p>Count word frequencies in a sentence and list the top two.</p>
<p>${c('const counts = new Map(); for (const w of text.split(" ")) counts.set(w, (counts.get(w) || 0) + 1);')} then ${c('[...counts].sort((x, y) => y[1] - x[1]).slice(0, 2)')}.</p></div>
<div class="warn-box"><p>${c('sort')}, ${c('reverse')} and ${c('splice')} change the original array; ${c('toSorted')}, ${c('toReversed')}, ${c('slice')} and spread copies do not. Mutating shared arrays is a common source of bugs in large programs.</p></div>` }
  });

  X('js-dom', {
    0: { html: R`
<h3 class="sub">Forms, inputs and accessibility</h3>
<p>Forms collect input with ${c('<input>')} (types: text, number, email, password, checkbox, radio, date, range), ${c('<select>')}, ${c('<textarea>')} and a submit ${c('<button>')}. Every input should have a ${c('<label for="id">')}: screen readers announce it, and clicking it focuses the field. Built-in validation attributes (${c('required')}, ${c('min')}, ${c('max')}, ${c('pattern')}, ${c('type="email"')}) catch mistakes before any JavaScript runs.</p>
${K('web', R`
<form>
  <label for="age">Age</label>
  <input id="age" type="number" min="0" max="120" required>
  <label><input type="checkbox" name="news"> Send me news</label>
  <button>Submit</button>
</form>`, true)}
<p>Accessibility is not optional: about one in six people has a disability. Use real buttons and links (not clickable ${c('<div>')}s), keep a logical heading order, give images ${c('alt')} text, ensure strong colour contrast, and check that everything works with the keyboard alone (Tab, Enter, Space).</p>
<div class="worked"><p>Why is ${c('<div onclick="save()">Save</div>')} worse than ${c('<button>')}?</p>
<p>The div cannot be reached with Tab, does not respond to Enter or Space, and is not announced as a button by screen readers. The button gets all of that for free.</p></div>` },
    1: { html: R`
<h3 class="sub">Layout with flexbox and grid</h3>
<p>Elements are <strong>block</strong> (take the full width, stack vertically: div, p, h1) or <strong>inline</strong> (flow within text: span, a, strong). Flexbox arranges children along one axis; CSS grid in two dimensions:</p>
${K('web', R`
<style>
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  .card { padding: 12px; border-radius: 8px; background: #eef; }
  .bar { display: flex; justify-content: space-between; align-items: center; }
  @media (max-width: 500px) { .bar { flex-direction: column; } }   /* responsive */
</style>
<div class="bar"><b>Logo</b><span>Menu</span></div>
<div class="cards"><div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div></div>`, true)}
<p><strong>Media queries</strong> adapt the layout to the screen: the same page reflows from three columns on a laptop to one on a phone. Units matter: ${c('px')} is fixed, ${c('%')} relative to the parent, ${c('rem')} relative to the root font size (respecting users who enlarge text), ${c('vw')}/${c('vh')} relative to the window.</p>
<h3 class="sub">The cascade and specificity, precisely</h3>
<p>When rules conflict, the browser compares specificity as a triple (ids, classes/attributes/pseudo-classes, elements): ${c('#nav a')} is (1, 0, 1), ${c('.menu .item a')} is (0, 2, 1). Higher wins, compared left to right; ties go to the rule that comes later. Inline ${c('style=""')} beats all selectors, and ${c('!important')} beats everything (use it sparingly).</p>` },
    2: { html: R`
<h3 class="sub">Navigating and building the tree</h3>
<p>Every element knows its relatives: ${c('el.parentElement')}, ${c('el.children')}, ${c('el.firstElementChild')}, ${c('el.nextElementSibling')}, and ${c('el.closest(".card")')} climbs to the nearest matching ancestor. Attributes are read with ${c('el.getAttribute("href")')} and custom data with ${c('el.dataset')} (from ${c('data-*')} attributes).</p>
${K('web', R`
<ul id="list"></ul>
<script>
  const fruits = ["apple", "banana", "cherry"];
  const list = document.getElementById("list");
  const frag = document.createDocumentFragment();   // build off-screen, insert once
  for (const f of fruits) {
    const li = document.createElement("li");
    li.textContent = f;
    li.dataset.name = f;
    frag.appendChild(li);
  }
  list.appendChild(frag);
  console.log(list.children.length, list.lastElementChild.dataset.name);
</script>`, true)}
<p>Each DOM change can trigger layout and repaint, so batch changes: build elements in a fragment or a string and insert once, and read layout properties (like ${c('offsetHeight')}) before writing rather than alternating.</p>
<div class="worked"><p>How would you remove all completed items from a list where done items have class ${c('done')}?</p>
<p>${c('document.querySelectorAll("#list .done").forEach((li) => li.remove())')}. ${c('querySelectorAll')} returns a static list, so removing while looping is safe.</p></div>` },
    3: { html: R`
<h3 class="sub">Bubbling and event delegation</h3>
<p>An event starts at the element clicked and <strong>bubbles</strong> up through its ancestors, triggering their listeners too. Instead of attaching a listener to each of 1000 list items (including ones added later), attach one to the list and check ${c('e.target')}:</p>
${K('web', R`
<ul id="todo"><li>Learn bubbling <button class="del">×</button></li><li>Use delegation <button class="del">×</button></li></ul>
<script>
  document.getElementById("todo").addEventListener("click", (e) => {
    if (e.target.matches(".del")) e.target.closest("li").remove();
  });
</script>`, true)}
<h3 class="sub">Keyboard, input and timing events</h3>
<p>Useful events: ${c('input')} (every keystroke in a field), ${c('change')} (after editing ends), ${c('keydown')} with ${c('e.key')}, ${c('submit')}, ${c('scroll')}, ${c('resize')}, ${c('DOMContentLoaded')}. For events that fire rapidly, <strong>debounce</strong>: wait until the user pauses before doing expensive work such as a search request.</p>
<div class="worked"><p>Write a debounce helper.</p>
<p>${c('const debounce = (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; };')} then ${c('input.addEventListener("input", debounce(search, 300))')}. Each keystroke cancels the previous timer; only a 300 ms pause runs the search.</p></div>
<p>Saving state: ${c('localStorage.setItem("todos", JSON.stringify(todos))')} keeps data in the browser between visits (for that site only), and ${c('JSON.parse(localStorage.getItem("todos") || "[]")')} reads it back.</p>` }
  });

  X('js-async', {
    0: { html: R`
<h3 class="sub">Blocking versus non-blocking</h3>
<p>Synchronous code that waits (a long calculation, a huge loop) blocks the main thread: no clicks are handled and no frames are drawn. A browser draws about 60 frames a second, so any task longer than 16 ms causes visible stutter; tasks over 50 ms feel sluggish. Long work can be split into chunks with ${c('setTimeout')} or ${c('requestAnimationFrame')}, or moved to a <strong>Web Worker</strong>, which runs in parallel and talks to the page by messages.</p>
${K('javascript', R`
console.log("start");
const t0 = Date.now();
setTimeout(() => console.log("timer fired after", Date.now() - t0, "ms"), 10);
while (Date.now() - t0 < 200) {}         // block for 200 ms
console.log("loop done");                 // the 10 ms timer had to wait`, true)}
<p>Timers are a minimum delay, not a promise: a 10 ms timer waiting behind 200 ms of busy code fires after about 200 ms.</p>` },
    1: { html: R`
<h3 class="sub">Error handling and combinators</h3>
<p>A rejected promise skips the following ${c('.then')} callbacks until a ${c('.catch')}. Unhandled rejections are reported in the console. Combinators wait for several promises:</p>
<ul><li>${c('Promise.all')}: all succeed (fails fast on the first rejection).</li>
<li>${c('Promise.allSettled')}: waits for all, reporting each success or failure.</li>
<li>${c('Promise.race')}: the first to settle, handy for timeouts.</li>
<li>${c('Promise.any')}: the first success.</li></ul>
${K('javascript', R`
const wait = (ms, v, fail) => new Promise((res, rej) => setTimeout(() => (fail ? rej(new Error(v)) : res(v)), ms));
const timeout = (p, ms) => Promise.race([p, wait(ms, "timed out", true)]);
const results = await Promise.allSettled([wait(100, "fast"), wait(300, "broken", true), timeout(wait(500, "slow"), 200)]);
console.log(results.map((r) => r.status + ": " + (r.value ?? r.reason.message)));`, true)}
<div class="worked"><p>Why is "callback hell" hard to maintain, and how do promises fix it?</p>
<p>Nested callbacks drift rightwards, each needs its own error handling, and the order is hard to follow. Promise chains (and await) read top to bottom, and a single catch handles errors from every step.</p></div>` },
    2: { html: R`
<h3 class="sub">await in loops, sequentially or in parallel</h3>
${K('javascript', R`
const fakeFetch = (id) => new Promise((res) => setTimeout(() => res({ id, name: "user" + id }), 200));
let t = performance.now();
for (const id of [1, 2, 3]) await fakeFetch(id);            // one after another: ~600 ms
console.log("sequential", Math.round(performance.now() - t));
t = performance.now();
const users = await Promise.all([1, 2, 3].map(fakeFetch));   // all at once: ~200 ms
console.log("parallel", Math.round(performance.now() - t), users.map((u) => u.name));`, true)}
<p>Use the sequential form only when each step needs the previous result. ${c('forEach')} does not wait for async callbacks; use ${c('for…of')} with await, or ${c('Promise.all')} with ${c('map')}.</p>
<h3 class="sub">Sending data</h3>
<p>${c('fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })')} sends JSON to an API. Real APIs need authentication (usually a token in an ${c('Authorization')} header), handle rate limits (status 429), and paginate long lists. The browser's same-origin policy blocks reading responses from other sites unless they send <strong>CORS</strong> headers allowing it, which protects your logged-in sessions from malicious pages.</p>` },
    3: { html: R`
<h3 class="sub">A small JSON API with Express</h3>
${K('javascript', R`
// npm install express ; node api.js
const express = require("express");
const app = express();
app.use(express.json());                     // parse JSON bodies
let notes = [{ id: 1, text: "Learn Node" }];

app.get("/api/notes", (req, res) => res.json(notes));
app.post("/api/notes", (req, res) => {
  if (!req.body.text) return res.status(400).json({ error: "text required" });
  const note = { id: Date.now(), text: req.body.text };
  notes.push(note);
  res.status(201).json(note);
});
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((n) => n.id !== Number(req.params.id));
  res.status(204).end();
});
app.listen(3000, () => console.log("listening on 3000"));`)}
<p>Real servers add a <strong>database</strong> (SQL such as PostgreSQL, or document stores such as MongoDB) so data survives restarts, <strong>authentication</strong> (sessions or tokens), input validation (never trust the client), logging, and tests. They are deployed to cloud machines or platforms, often in <strong>containers</strong> that package the code with its exact dependencies.</p>
<div class="worked"><p>Node handles thousands of simultaneous connections on one thread. How?</p>
<p>Most of a web server's time is spent waiting for the network and the database. Node's event loop starts each slow operation and moves on, handling whichever finishes next, so one thread stays busy instead of idling. CPU-heavy work, by contrast, blocks everyone and belongs in worker threads.</p></div>` }
  });

  X('cpp-basics', {
    0: { html: R`
<h3 class="sub">From source to executable</h3>
<p>Building a C++ program has stages: the <strong>preprocessor</strong> pastes in ${c('#include')}d headers and expands macros; the <strong>compiler</strong> turns each source file into machine code (an object file), checking types; the <strong>linker</strong> joins object files and libraries into one executable. Errors at each stage look different: "expected ';'" is a compile error, "undefined reference to ..." a link error (a function declared but never defined).</p>
<p>Compiler flags matter: ${c('-O2')} optimises (often 5–10× faster), ${c('-Wall -Wextra')} turns on warnings that catch many bugs, ${c('-g')} adds debugging information, ${c('-fsanitize=address,undefined')} detects memory errors and undefined behaviour at run time.</p>
<div class="worked"><p>A program prints the right answer with ${c('-O0')} but garbage with ${c('-O2')}. What is the likely cause?</p>
<p>Undefined behaviour (reading an uninitialised variable, overflowing a signed int, going out of bounds). The optimiser is allowed to assume it never happens, so results change. Compile with warnings and sanitizers to find it.</p></div>` },
    1: { html: R`
<h3 class="sub">Initialisation, constants and conversions</h3>
<p>A local variable that is declared but not initialised (${c('int x;')}) holds whatever bits were in memory: always initialise. Brace initialisation ${c('int x{3.7};')} refuses narrowing conversions at compile time, while ${c('int x = 3.7;')} silently truncates to 3. ${c('const')} marks values that never change, and ${c('constexpr')} ones computed at compile time.</p>
${K('cpp', R`
#include <iostream>
#include <cmath>
using namespace std;
int main() {
    constexpr int N = 1'000'000;        // digit separators for readability
    double avg = 7 / 2;                 // integer division first: 3, then 3.0!
    double ok = 7 / 2.0;                // 3.5
    int rounded = (int)round(2.6);      // 3
    unsigned int u = 0;
    u = u - 1;                          // wraps to 4294967295 (well-defined for unsigned)
    cout << N << " " << avg << " " << ok << " " << rounded << " " << u << "\n";
}`, true)}
<div class="warn-box"><p>Comparing a signed with an unsigned value converts the signed one: ${c('-1 < v.size()')} is false, because −1 becomes a huge unsigned number. Compilers warn about this with ${c('-Wall')}.</p></div>` },
    2: { html: R`
<h3 class="sub">Reading input until it ends, and switch</h3>
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long x, sum = 0; int count = 0;
    while (cin >> x) { sum += x; count++; }      // stops at end of input
    cout << count << " numbers, sum " << sum << "\n";
    char grade = 'B';
    switch (grade) {
        case 'A': cout << "excellent\n"; break;
        case 'B': cout << "good\n"; break;     // without break, execution falls through
        default:  cout << "keep going\n";
    }
    cout << fixed << setprecision(3) << 2.0 / 3 << "\n";   // 0.667
}`, true)}
<p>${c('while (cin >> x)')} is the idiom for "read numbers until there are no more"; the expression is false when reading fails. ${c('getline(cin, line)')} reads whole lines (mixing it with ${c('>>')} needs care: ${c('>>')} leaves the newline behind). ${c('setprecision')} with ${c('fixed')} controls decimal output, which matters when a judge expects a fixed number of decimals.</p>
<div class="worked"><p>Input: ${c('5 3 9 1')}. What does the first part print?</p>
<p>${c('4 numbers, sum 18')}.</p></div>` },
    3: { html: R`
<h3 class="sub">Declarations, recursion and the call stack</h3>
<p>A function can be declared (its <strong>prototype</strong>, ending in ${c(';')}) before it is defined, which lets two functions call each other and lets headers announce functions defined in other files. Recursion works as in Python, but each call takes stack space; very deep recursion (around a million levels) overflows the stack and crashes.</p>
${K('cpp', R`
#include <iostream>
using namespace std;
long long gcd(long long a, long long b);            // declaration
long long gcd(long long a, long long b) {           // definition
    return b == 0 ? a : gcd(b, a % b);
}
double area(double r) { return 3.14159 * r * r; }   // overloading:
double area(double w, double h) { return w * h; }   // same name, different parameters
void sort3(int& a, int& b, int& c) {                 // references let us change the caller's values
    if (a > b) swap(a, b);
    if (b > c) swap(b, c);
    if (a > b) swap(a, b);
}
int main() {
    int x = 9, y = 2, z = 5;
    sort3(x, y, z);
    cout << gcd(84, 36) << " " << area(1.0) << " " << area(2, 3) << " " << x << y << z << "\n";
}`, true)}
<p>Pass small values (ints, doubles) by value, large objects by ${c('const&')} (read-only, no copy), and use a plain reference ${c('&')} only when the function must change the argument.</p>` }
  });

  X('cpp-memory', {
    0: { html: R`
<h3 class="sub">How big are things?</h3>
<p>${c('sizeof')} reports sizes in bytes: on typical 64-bit systems ${c('char')} 1, ${c('int')} 4, ${c('long long')} 8, ${c('double')} 8, any pointer 8. Structs may contain <strong>padding</strong> so that each member sits at an address that is a multiple of its size, which the hardware reads fastest: ${c('struct { char c; int i; }')} takes 8 bytes, not 5.</p>
<p>Memory has a hierarchy: a few registers in the CPU (instant), caches of kilobytes to megabytes (a few nanoseconds), main memory of gigabytes (about 100 ns), and disk (micro- to milliseconds). Programs that walk through memory in order are fast because whole cache lines (64 bytes) arrive at once; jumping around randomly is often 10–100× slower. That is why ${c('vector')} usually beats a linked list even when the textbook says otherwise.</p>
<div class="worked"><p>A 2D array ${c('int a[1000][1000]')} is summed by rows (${c('a[i][j]')} with j inner) or by columns (i inner). Which is faster?</p>
<p>By rows: C++ stores rows contiguously, so the inner loop walks consecutive addresses. By columns, each access jumps 4000 bytes and misses the cache; it can be several times slower for the same arithmetic.</p></div>` },
    1: { html: R`
<h3 class="sub">Pointers to pointers, const and functions</h3>
<p>Read declarations right to left: ${c('const int* p')} is a pointer to a constant int (you cannot change the int through it); ${c('int* const p')} is a constant pointer (it cannot point elsewhere). A pointer to a pointer, ${c('int** pp')}, is how C passes a 2D structure or lets a function change which object a pointer points to.</p>
${K('cpp', R`
#include <iostream>
using namespace std;
void setToNull(int*& p) { p = nullptr; }      // reference to a pointer
int main() {
    int a = 1, b = 2;
    int* p = &a;
    int** pp = &p;
    **pp = 10;            // a is now 10
    *pp = &b;             // p now points to b
    *p = 20;              // b is now 20
    setToNull(p);
    cout << a << " " << b << " " << (p == nullptr) << "\n";   // 10 20 1
}`, true)}
<p>In C++, prefer references for "another name for this object" and pointers only when "nothing" (${c('nullptr')}) is a valid value or the target must change. Smart pointers (next sections) handle ownership.</p>
<div class="worked"><p>After ${c('int x = 5; int& r = x; int* p = &r; *p += 1; r *= 2;')}, what is ${c('x')}?</p>
<p>${c('r')} and ${c('*p')} are both ${c('x')}: 5 + 1 = 6, then 12.</p></div>` },
    2: { html: R`
<h3 class="sub">Strings in C and C++, and buffer overflows</h3>
<p>A C string is a ${c('char')} array ending in a zero byte ${c("'\\0'")}. Functions like ${c('strcpy')} copy until they find that zero, with no idea how big the destination is: copying a long string into a short buffer overwrites whatever lies beyond. Attackers exploit exactly this to overwrite a function's return address and hijack a program, the classic <strong>buffer overflow</strong> (the 1988 Morris worm, and many since).</p>
<p>C++ ${c('std::string')} manages its own memory and grows as needed, and ${c('std::vector')} with ${c('.at()')} checks indices. Tools catch the rest: ${c('-fsanitize=address')} reports out-of-bounds access the moment it happens, with the line number.</p>
<div class="worked"><p>${c('int a[3] = {1, 2, 3}; int b = 7; a[3] = 99;')} What value might ${c('b')} have afterwards?</p>
<p>Anything: it is undefined behaviour. If the compiler placed ${c('b')} right after ${c('a')}, it becomes 99; if not, something else is corrupted, or the program crashes, or nothing visible happens until later. Never rely on any of these.</p></div>
<p>Languages like Rust were designed to make such errors impossible at compile time while keeping C++'s speed; memory-safety bugs account for about 70% of serious security holes in large C and C++ codebases.</p>` },
    3: { html: R`
<h3 class="sub">Ownership with smart pointers</h3>
${K('cpp', R`
#include <iostream>
#include <memory>
#include <vector>
using namespace std;
struct Node {
    int value;
    unique_ptr<Node> next;                   // each node owns the next one
    Node(int v) : value(v) { cout << "make " << v << "\n"; }
    ~Node() { cout << "free " << value << "\n"; }   // destructor
};
int main() {
    auto head = make_unique<Node>(1);
    head->next = make_unique<Node>(2);
    shared_ptr<int> a = make_shared<int>(42);
    shared_ptr<int> b = a;                   // two owners, reference count 2
    cout << *b << " owners: " << a.use_count() << "\n";
}                                            // everything freed here, in reverse order`, true)}
<p>${c('unique_ptr')} has exactly one owner and cannot be copied (only moved); it costs nothing over a raw pointer. ${c('shared_ptr')} counts its owners and frees the object when the last one disappears. A destructor (${c('~Node')}) runs automatically when an object's lifetime ends, which is how RAII closes files, releases locks and frees memory even when an exception is thrown.</p>
<div class="worked"><p>When should you write ${c('new')} and ${c('delete')} yourself in modern C++?</p>
<p>Almost never: use containers (${c('vector')}, ${c('string')}, ${c('map')}) for collections and ${c('make_unique')} for single objects. If you find yourself writing ${c('delete')}, ask which object should own that memory instead.</p></div>` }
  });

  X('cpp-stl', {
    0: { html: R`
<h3 class="sub">Iterators and how vector grows</h3>
<p>An <strong>iterator</strong> is a generalised pointer: ${c('*it')} gives the element, ${c('++it')} moves on. Every container provides ${c('begin()')} and ${c('end()')}, so the same algorithms work on all of them. A vector stores its elements contiguously; when it runs out of space it allocates a bigger block (typically double), moves everything and frees the old block. So ${c('push_back')} is fast on average, but any pointer or iterator into the vector becomes invalid after a reallocation.</p>
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v;
    v.reserve(100);                          // allocate once if you know the size
    for (int i = 0; i < 10; i++) v.push_back(i * i);
    for (auto it = v.begin(); it != v.end(); ++it) cout << *it << " ";
    cout << "\nsize " << v.size() << " capacity " << v.capacity() << "\n";
    v.erase(remove_if(v.begin(), v.end(), [](int x) { return x % 2; }), v.end());   // drop odd values
    for (int x : v) cout << x << " ";
    string s = "competitive";
    cout << "\n" << s.find("pet") << " " << s.substr(3, 3) << " " << count(s.begin(), s.end(), 't') << "\n";
}`, true)}
<p>Other sequence containers: ${c('deque')} (fast at both ends), ${c('list')} (linked list), ${c('array<int, N>')} (fixed size), and adaptors ${c('stack')}, ${c('queue')} and ${c('priority_queue')}.</p>` },
    1: { html: R`
<h3 class="sub">Ordered containers do more than lookups</h3>
<p>Because ${c('set')} and ${c('map')} are sorted (balanced binary search trees), they answer "nearest" questions in $O(\log n)$: ${c('s.lower_bound(x)')} gives the first element ≥ x, ${c('upper_bound')} the first > x, and ${c('prev(it)')} steps back. ${c('multiset')} allows duplicates.</p>
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    set<int> booked = {10, 20, 35, 50};
    int t = 27;
    auto it = booked.lower_bound(t);                 // first booking at or after 27
    cout << "next " << *it << ", previous " << *prev(it) << "\n";   // 35, 20
    map<string, vector<int>> scores;
    scores["Ada"].push_back(91); scores["Ada"].push_back(88); scores["Alan"].push_back(78);
    for (auto& [name, list] : scores)
        cout << name << " best " << *max_element(list.begin(), list.end()) << "\n";
    multiset<int> ms = {5, 1, 5, 3};
    ms.erase(ms.find(5));                            // erase one copy, not all
    cout << ms.size() << " " << *ms.begin() << " " << *ms.rbegin() << "\n";   // 3 1 5
}`, true)}
<div class="warn-box"><p>${c('ms.erase(5)')} removes <em>every</em> 5 from a multiset; ${c('ms.erase(ms.find(5))')} removes one. And ${c('unordered_map')} can be attacked: adversarial contest tests that cause many hash collisions turn its $O(1)$ into $O(n)$, so ${c('map')} is the safe default when in doubt.</p></div>` },
    2: { html: R`
<h3 class="sub">Lambdas with captures, and more algorithms</h3>
<p>A lambda can <strong>capture</strong> variables from the surrounding scope: ${c('[k]')} by value, ${c('[&total]')} by reference, ${c('[&]')} everything by reference. This lets algorithms use local data:</p>
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    int k = 4, total = 0;
    int big = count_if(v.begin(), v.end(), [k](int x) { return x > k; });
    for_each(v.begin(), v.end(), [&total](int x) { total += x; });
    vector<int> idx(v.size());
    iota(idx.begin(), idx.end(), 0);                       // 0, 1, 2, ...
    sort(idx.begin(), idx.end(), [&](int a, int b) { return v[a] < v[b]; });   // sort indices by value
    cout << big << " " << total << " | ";
    for (int i : idx) cout << i << " ";
    nth_element(v.begin(), v.begin() + v.size() / 2, v.end());   // median in O(n)
    cout << "| median " << v[v.size() / 2] << "\n";
    next_permutation(v.begin(), v.begin() + 3);
}`, true)}
<p>Sorting indices instead of values keeps the original positions, a frequent contest need. ${c('next_permutation')} steps through permutations in lexicographic order (start from a sorted range to see them all), ${c('binary_search')}, ${c('partial_sum')}, ${c('accumulate')} and ${c('gcd')} cover much of the rest.</p>
<div class="worked"><p>What do ${c('big')} and ${c('total')} print above?</p>
<p>Values greater than 4: 5, 8, 9, so 3. The sum: 28.</p></div>` },
    3: { html: R`
<h3 class="sub">Encapsulation, constructors and operator overloading</h3>
${K('cpp', R`
#include <iostream>
using namespace std;
class Fraction {
    long long n, d;                                  // private: only methods can touch them
    static long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }
public:
    Fraction(long long num, long long den = 1) : n(num), d(den) {   // constructor with initialiser list
        if (d < 0) { n = -n; d = -d; }
        long long g = gcd(n < 0 ? -n : n, d); n /= g; d /= g;          // always kept in lowest terms
    }
    Fraction operator+(const Fraction& o) const { return Fraction(n * o.d + o.n * d, d * o.d); }
    Fraction operator*(const Fraction& o) const { return Fraction(n * o.n, d * o.d); }
    bool operator<(const Fraction& o) const { return n * o.d < o.n * d; }
    friend ostream& operator<<(ostream& os, const Fraction& f) { return os << f.n << "/" << f.d; }
};
int main() {
    Fraction a(1, 2), b(1, 3);
    cout << a + b << " " << a * b << " " << (b < a) << " " << Fraction(6, -8) << "\n";   // 5/6 1/6 1 -3/4
}`, true)}
<p>The class guarantees an <strong>invariant</strong>: every Fraction is in lowest terms with a positive denominator, because the only way to create one is through the constructor. That is the point of making data private. Overloaded operators make the type feel built in, and ${c('const')} methods promise not to modify the object.</p>
<p>Templates generalise further: ${c('template <typename T> T clamp(T x, T lo, T hi)')} works for ints, doubles and Fractions alike, and the compiler generates a separate, fully optimised version for each.</p>` }
  });
})();
