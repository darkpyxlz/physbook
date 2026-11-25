/* Computing 12–14: C++. Compiling and types, memory (stack, heap, references and pointers),
   and the standard library (STL), classes and templates. C++ runs on an online compiler. */
(function () {
  const { R, K, c, QN, QM, P, T, G } = PB.csKit();
  const lines = (s) => s.replace(/\r/g, '').split('\n');
  const toks = (s) => s.trim().split(/\s+/);

  /* ===================== 12. C++ basics ===================== */
  PB.addChapter({
    id: 'cpp-basics', subject: 'computing', num: 12, part: 'C++',
    title: 'C++ Basics: Compiling, Types and Functions',
    subtitle: R`A fast, compiled language. How compilation works, the shape of a C++ program, static types and their sizes, integer overflow, input and output, control flow and functions.`,
    big: 'Python reads your program line by line as it runs. C++ is <strong>compiled</strong>: a compiler translates the whole program into machine code first, checking every type on the way. You write a little more (every variable has a declared type), and in return the program often runs 10 to 100 times faster. That is why it rules competitive programming, games and systems software.',
    goals: ['Describe compiling versus interpreting', 'Write a complete C++ program with input and output', 'Choose int, long long, double, char, bool and string', 'Spot integer overflow and integer division', 'Write functions with typed parameters', 'Translate a Python loop into C++'],
    sections: [
      { title: 'Compiling a program', html: R`
${K('cpp', R`
#include <iostream>          // bring in input/output
using namespace std;         // so we can write cout instead of std::cout

int main() {                 // every program starts in main
    cout << "Hello, C++!" << endl;
    int a = 7, b = 2;
    cout << a / b << " " << a % b << " " << (double)a / b << "\n";   // 3 1 3.5
    return 0;                // 0 means "finished fine"
}`, true)}
<p>The <strong>compiler</strong> (g++ or clang++) turns ${c('main.cpp')} into an executable file of machine instructions, which then runs on its own: ${c('g++ -O2 -o main main.cpp && ./main')}. Mistakes in types or syntax are <strong>compile errors</strong>: nothing runs until you fix them, and the error message gives the line. Here, C++ code is sent to an online compiler (Compiler Explorer), so it needs internet.</p>
<p>Notice the differences from Python: statements end with ${c(';')}, blocks use ${c('{ }')}, and dividing two ${c('int')}s gives an ${c('int')} (rounded towards zero), so ${c('7 / 2')} is 3.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In C++, what is ${c('9 / 4')}?`, [c('2.25'), c('2'), c('3'), 'a compile error'], 1, [R`Both are ints.`], R`Integer division: 2.`)] },
      { title: 'Types and their limits', html: R`
<p>Every variable has a fixed type that decides its size and what it can hold:</p>
${K('text', R`
type         size      range / precision
bool         1 byte    true / false
char         1 byte    one character ('A' is 65)
int          4 bytes   about ±2.1 × 10^9   (2^31 − 1 = 2147483647)
long long    8 bytes   about ±9.2 × 10^18
double       8 bytes   about 15–16 significant digits
string       varies    text`)}
<p><strong>Overflow</strong> is the classic C++ bug. ${c('int')} cannot hold $10^{10}$, and if a calculation goes past $2^{31} - 1$ the result is garbage (strictly, undefined behaviour). In contests, a sum of $10^5$ numbers up to $10^9$ can reach $10^{14}$: use ${c('long long')}. Watch for products too: ${c('int a = 100000; long long x = a * a;')} overflows <em>before</em> the assignment, because ${c('a * a')} is computed as an ${c('int')}; write ${c('1LL * a * a')}.</p>
${K('cpp', R`
#include <iostream>
using namespace std;
int main() {
    int big = 2147483647;
    cout << big + 1 << "\n";                 // overflow: prints a negative number
    long long ok = 2147483647LL + 1;
    cout << ok << "\n";                      // 2147483648
    int a = 100000;
    cout << 1LL * a * a << "\n";             // 10000000000
    auto x = 3.5;                            // auto: the compiler works out the type
    char ch = 'A' + 2;
    cout << x << " " << ch << " " << sizeof(long long) << "\n";
}`, true)}
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A program sums 200 000 numbers, each up to $10^9$. Which type should hold the sum?`, [c('int'), c('long long'), c('char'), c('bool')], 1, [R`The sum can reach $2\times10^{14}$.`], R`${c('long long')}: ${c('int')} stops at about $2.1\times10^9$.`)] },
      { title: 'Input, output and control flow', html: R`
${K('cpp', R`
#include <bits/stdc++.h>          // a GCC shortcut that includes the whole standard library
using namespace std;

int main() {
    ios::sync_with_stdio(false);  // make cin/cout fast
    cin.tie(nullptr);
    int n;
    cin >> n;                     // reads the next number, skipping spaces and newlines
    long long total = 0;
    for (int i = 0; i < n; i++) { // C-style for: start; condition; step
        int x;
        cin >> x;
        if (x % 2 == 0) total += x;
        else if (x < 0) continue;
    }
    cout << total << "\n";        // "\n" is faster than endl
    int k = 0;
    while (k * k < 50) k++;
    cout << k << "\n";            // 8
}`, true)}
<p>${c('cin >> x')} reads whitespace-separated values of the right type; ${c('getline(cin, s)')} reads a whole line. ${c('if')}, ${c('while')}, ${c('break')} and ${c('continue')} work as in JavaScript. The two lines after ${c('main')} switch off syncing with C's I/O, which makes reading big inputs many times faster: always include them in contests.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many times does the body run? ${c('for (int i = 1; i < 100; i *= 3)')}`, 5, [R`i = 1, 3, 9, 27, 81.`], R`5.`)] },
      { title: 'Functions', html: R`
${K('cpp', R`
#include <iostream>
using namespace std;

long long power(long long base, int exp) {   // return type, name, typed parameters
    long long r = 1;
    for (int i = 0; i < exp; i++) r *= base;
    return r;
}
void greet(string name) {                   // void: returns nothing
    cout << "Hi " << name << "\n";
}
void addOne(int& x) { x++; }                // & : a reference to the caller's variable

int main() {
    cout << power(2, 40) << "\n";
    greet("Bjarne");
    int n = 5;
    addOne(n);
    cout << n << "\n";                      // 6
}`, true)}
<p>A function must be declared before it is used, with the types of its parameters and its result. Arguments are normally passed <strong>by value</strong>: the function gets its own copy. Adding ${c('&')} passes <strong>by reference</strong>, so the function works on the caller's variable itself; for big objects like vectors, ${c('const vector<int>& v')} avoids an expensive copy while promising not to change it. Two functions may share a name if their parameter types differ (<strong>overloading</strong>).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('void f(int a, int& b) { a += 10; b += 10; }')} With ${c('x = 1, y = 1')}, after ${c('f(x, y)')}, what is ${c('x + y')}?`, 12, [R`Only ${c('b')} refers to the caller's variable.`], R`${c('x')} stays 1, ${c('y')} becomes 11: 12.`)] }
    ],
    labs: [
      { sim: 'code', title: 'C++ playground', desc: 'Compiled with GCC 13 (-O2, C++17) on Compiler Explorer. Change the types and watch overflow happen.', params: { lang: 'cpp', langs: ['cpp', 'python'], code: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int big = INT_MAX;\n    cout << "INT_MAX = " << big << ", plus one = " << big + 1 << "\\n";\n    long long fact = 1;\n    for (int i = 1; i <= 20; i++) fact *= i;\n    cout << "20! = " << fact << "\\n";\n    double third = 1.0 / 3;\n    cout << setprecision(17) << third << "\\n";\n    cout << sizeof(int) << " " << sizeof(long long) << " " << sizeof(double) << "\\n";\n}\n', python: 'import math\nprint("Python ints never overflow:", 2**31 - 1 + 1)\nprint("20! =", math.factorial(20))\nprint(1 / 3)\n' } } },
      { sim: 'code', title: 'Challenge: a big sum', desc: 'Watch out for overflow.', params: { challenge: 'cpp-sum' } }
    ],
    formulas: [['Skeleton', '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    cout << n << "\\n";\n}', 'cpp'], ['Types', 'int (±2.1e9)  long long (±9.2e18)  double  char  bool  string', 'cpp'],
      ['Avoid overflow', 'long long x = 1LL * a * b;', 'cpp'], ['Loops', 'for (int i = 0; i < n; i++) { ... }\nwhile (cond) { ... }', 'cpp'], ['Functions', 'int f(int a, int& b, const vector<int>& v) { ... }', 'cpp'], ['Compile and run', 'g++ -O2 -std=c++17 -o main main.cpp && ./main < input.txt', 'shell']],
    problems: [
      P('concept', 'mcq', 'Compiled', R`What does a C++ compiler produce?`, 2, [R`Something the processor can run directly.`], R`An executable of machine code.`, { options: ['Python code', 'A web page', 'Machine code (an executable)', 'Nothing until you run it'] }),
      P('concept', 'num', 'int limit', R`About how many billion is the largest 32-bit ${c('int')}? (Give it to the nearest 0.1.)`, 2.1, [R`$2^{31} - 1$.`], R`2 147 483 647 ≈ 2.1 billion.`, { tol: 0.03 }),
      P('concept', 'mcq', 'Statically typed', R`In C++, ${c('int x = 5; x = "hello";')} is…`, 1, [R`The type of ${c('x')} is fixed.`], R`A compile error: a string cannot be stored in an int.`, { options: ['fine', 'a compile error', 'a runtime error', 'x becomes 0'] }),
      P('concept', 'num', 'Integer division', R`What is ${c('-7 / 2')} in C++?`, -3, [R`C++ rounds towards zero (Python's ${c('//')} rounds down).`], R`−3.`),
      P('core', 'num', 'Modulo', R`What is ${c('-7 % 3')} in C++?`, -1, [R`The sign follows the left operand, so that ${c('(a / b) * b + a % b == a')}.`], R`$-7 = (-2)\cdot3 + (-1)$: −1. (Python gives 2.)`),
      P('core', 'num', 'Products overflow', R`With ${c('int a = 50000;')}, the exact value of ${c('a * a')} is $2.5\times10^9$. By how much does it exceed ${c('INT_MAX')} = 2 147 483 647?`, 352516353, [R`Subtract.`], R`$2\,500\,000\,000 - 2\,147\,483\,647 = 352\,516\,353$, so ${c('int')} overflows. Write ${c('1LL * a * a')}.`, { tol: 0 }),
      P('core', 'num', 'Loop', R`What is printed? ${c('int s = 0; for (int i = 10; i > 0; i -= 3) s += i; cout << s;')}`, 22, [R`i = 10, 7, 4, 1.`], R`22.`),
      P('core', 'num', 'char arithmetic', R`What does ${c("cout << (int)('a' + 5);")} print?`, 102, [R`'a' is 97.`], R`102 (the letter f).`),
      P('core', 'mcq', 'Pass by value', R`${c('void twice(int x) { x *= 2; }')} After ${c('int n = 4; twice(n);')}, n is…`, 0, [R`No ${c('&')}.`], R`Still 4: the function changed its own copy.`, { options: ['4', '8', '0', 'undefined'] }),
      P('olympiad', 'num', 'Sum that overflows', R`How many of the numbers 1, 2, …, $N$ can you add before the total exceeds ${c('INT_MAX')} $\approx 2.147\times10^9$? Find the largest $N$ with $N(N+1)/2 \le 2147483647$.`, 65535, [R`$N^2/2 \approx 2.1\times10^9$, so $N \approx 65\,536$.`], R`$65535\cdot65536/2 = 2\,147\,450\,880 \le$ INT_MAX, but $N = 65536$ gives $2\,147\,516\,416 >$ INT_MAX. So 65535.`, { tol: 0 }),
      P('olympiad', 'num', 'Precision', R`A ${c('double')} has a 53-bit mantissa. What is the smallest positive integer that a ${c('double')} cannot represent exactly? Give $\log_2$ of (that integer − 1).`, 53, [R`Every integer up to $2^{53}$ fits.`], R`$2^{53} + 1$ is the first one that cannot be stored: log₂ of $2^{53}$ is 53.`),
      P('olympiad', 'mcq', 'Speed', R`A C++ program does about $10^8$ simple operations per second. Roughly how long might the same loop take in plain Python?`, 2, [R`Python is interpreted, about 30–100 times slower for simple loops.`], R`Tens of seconds: about 10–100 s. That is why time limits are tight for Python, and why fast algorithms matter even more there.`, { options: ['About 0.1 s', 'About 1 s', 'About 10–100 s', 'About a day'] })
    ]
  });
  PB.addDrills('cpp-basics', [
    { title: 'Integer division', gen: (r) => { const a = r.int(-60, 60) || 7, b = r.pick([2, 3, 4, 5, 7]); return { q: R`<p>In C++, what is ${c(a + ' / ' + b)} (both ints)?</p>`, answer: Math.trunc(a / b), tol: 0.0001, solution: R`<p>Rounded towards zero: ${Math.trunc(a / b)}.</p>` }; } },
    { title: 'C++ remainder', gen: (r) => { const a = r.int(-40, 40) || 9, b = r.pick([3, 4, 5, 6]); return { q: R`<p>In C++, what is ${c(a + ' % ' + b)}?</p>`, answer: a % b, tol: 0.0001, solution: R`<p>The sign follows the left side: ${a % b}.</p>` }; } },
    { title: 'Loop sum', gen: (r) => { const a = r.int(1, 5), b = r.int(15, 40), st = r.int(2, 5); let s = 0; for (let i = a; i < b; i += st) s += i; return { q: R`<p>What is printed? ${c('int s = 0; for (int i = ' + a + '; i < ' + b + '; i += ' + st + ') s += i; cout << s;')}</p>`, answer: s, tol: 0.0001, solution: R`<p>${s}.</p>` }; } }
  ]);
  const sumRef = (s) => { const t = toks(s); const n = +t[0]; let tot = 0n; for (let i = 1; i <= n; i++) tot += BigInt(t[i]); return tot + '\n'; };
  PB.addChallenge({ id: 'cpp-sum', chapter: 'cpp-basics', title: 'A big sum', level: 'easy',
    statement: R`<p>Add up $n$ integers. Easy, unless your variable is too small.</p>`, input: R`<p>The first line holds $n$ ($1 \le n \le 2\cdot10^5$). The second line holds $n$ integers $a_i$ with $|a_i| \le 10^9$.</p>`, output: R`<p>The sum.</p>`,
    samples: [T(sumRef)('3\n1 2 3\n')], tests: [T(sumRef)('2\n1000000000 1000000000\n'), T(sumRef)('3\n-1000000000 -1000000000 5\n'), G(sumRef, (r) => { const n = 100000, a = []; for (let i = 0; i < n; i++) a.push(r.int(900000000, 1000000000)); return n + '\n' + a.join(' ') + '\n'; })],
    hints: [R`The total can reach $2\times10^{14}$: use ${c('long long')} in C++. Python's ints never overflow; JavaScript numbers are exact up to $2^{53} \approx 9\times10^{15}$, which is enough here.`],
    starter: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    int total = 0;   // is int big enough?\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        total += x;\n    }\n    cout << total << "\\n";\n}\n' },
    solution: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    long long total = 0;\n    for (int i = 0; i < n; i++) { long long x; cin >> x; total += x; }\n    cout << total << "\\n";\n}\n', python: 'import sys\nd = sys.stdin.read().split()\nprint(sum(map(int, d[1:1 + int(d[0])])))\n' } });

  /* ===================== 13. Memory ===================== */
  const V = (name, value, ref, addr, changed, self) => [name, value, ref || null, addr || null, changed ? 1 : 0, self || null];
  PB.addChapter({
    id: 'cpp-memory', subject: 'computing', num: 13, part: 'C++',
    title: 'Memory: Stack, Heap, References and Pointers',
    subtitle: R`What your variables really are. Memory as numbered bytes, the stack and the heap, references, pointers and addresses, arrays, new and delete, leaks and dangling pointers, and RAII.`,
    big: 'Memory is one enormous row of numbered bytes. A variable is a named spot in it; a <strong>pointer</strong> is a variable that holds the <em>address</em> of another spot. Python hides all of this; C++ lets you see and control it, which makes programs fast, and also makes it possible to break them in spectacular ways.',
    goals: ['Picture memory as numbered bytes', 'Explain the stack and the heap', 'Use references and pointers, & and *', 'Recognise undefined behaviour from out-of-bounds access', 'Manage heap memory with new and delete, then without them using RAII'],
    sections: [
      { title: 'The stack and the heap', html: R`
<p>Each byte of memory has an <strong>address</strong>, a number usually written in hex like ${c('0x7ffc10')}. A program uses two main areas:</p>
<ul><li>The <strong>stack</strong> holds local variables. Each function call pushes a <strong>frame</strong> with its locals; returning pops it, freeing them automatically. It is fast but small (a few MB), so very deep recursion can cause a <strong>stack overflow</strong>.</li>
<li>The <strong>heap</strong> holds memory you ask for explicitly, of any size, that outlives the function that created it, until it is freed.</li></ul>
<p>Python puts every object on the heap and frees it automatically when nothing refers to it any more (<strong>garbage collection</strong>). C++ gives you the choice, and the responsibility.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A local ${c('int')} inside a function lives…`, ['on the heap until deleted', 'on the stack until the function returns', 'forever', 'in the CPU only'], 1, [R`Locals belong to the function's frame.`], R`On the stack; it disappears when the function returns.`)] },
      { title: 'References and pointers', html: R`
${K('cpp', R`
#include <iostream>
using namespace std;
int main() {
    int x = 10;
    int& r = x;        // reference: another name for x
    int* p = &x;       // pointer: holds the address of x   (&x = "address of x")
    r += 5;            // x is now 15
    *p += 1;           // *p = "the thing p points to": x is now 16
    cout << x << " " << p << " " << *p << "\n";   // 16 0x7ffc... 16
    int* none = nullptr;                          // points nowhere
    if (none == nullptr) cout << "null\n";
}`, true)}
<p>Three symbols to keep straight. In a declaration, ${c('int& r')} makes a reference and ${c('int* p')} a pointer. In an expression, ${c('&x')} takes an address and ${c('*p')} <strong>dereferences</strong> (follows) a pointer. A reference must be bound when created and never changes what it refers to; a pointer can be moved to point elsewhere, or be ${c('nullptr')}. Dereferencing ${c('nullptr')} crashes the program (a "segmentation fault").</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('int a = 3; int* p = &a; *p = *p * 4; a += 1;')} What is ${c('*p')}?`, 13, [R`${c('p')} points at ${c('a')} the whole time.`], R`a becomes 12, then 13; *p is a: 13.`)] },
      { title: 'Arrays and undefined behaviour', html: R`
<p>An array is a block of neighbouring elements: in ${c('int a[5]')}, element ${c('a[i]')} sits at address ${c('a + i')}, i.e. $4i$ bytes after the start. That is why indexing is instant, and why C++ does <strong>not</strong> check the index:</p>
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    int a[5] = {1, 2, 3, 4, 5};
    int* p = a;                 // an array name works as a pointer to its first element
    cout << *(p + 2) << " " << p[2] << "\n";     // 3 3
    // a[7] = 99;               // out of bounds: undefined behaviour!
    vector<int> v = {1, 2, 3};
    try { v.at(7) = 99; }       // .at() checks the index and throws
    catch (out_of_range& e) { cout << "caught: " << e.what() << "\n"; }
}`, true)}
<p>Writing past the end of an array is <strong>undefined behaviour</strong>: the program may crash, may silently overwrite another variable, or may seem to work until the day it does not. Many security holes, "buffer overflows", are exactly this. In contests, a wrong answer that changes when you add a ${c('cout')} is often an out-of-bounds bug.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('int a[10];')} starts at address 1000, and an int is 4 bytes. At what address is ${c('a[7]')}?`, 1028, [R`Start + 4 × index.`], R`$1000 + 4\cdot7 = 1028$.`)] },
      { title: 'new, delete and RAII', html: R`
${K('cpp', R`
int* make(int n) {
    int* arr = new int[n];   // on the heap: survives after make returns
    return arr;
}
int main() {
    int* a = make(1000);
    a[0] = 42;
    delete[] a;              // give it back; forget this and it leaks
    a = nullptr;             // a "dangling" pointer is worse than a null one

    std::vector<int> v(1000);                   // RAII: the vector owns its heap memory
    auto box = std::make_unique<int>(7);        // a smart pointer that deletes itself
}                                               // v and box free their memory here, automatically`)}
<p>Every ${c('new')} needs exactly one ${c('delete')}. Forget it and you have a <strong>memory leak</strong>; delete twice, or use the memory after deleting (a <strong>dangling pointer</strong>), and you get undefined behaviour. Modern C++ avoids raw ${c('new')}/${c('delete')} with <strong>RAII</strong> ("resource acquisition is initialisation"): an object that owns a resource frees it in its destructor, which runs automatically when the object goes out of scope. ${c('vector')}, ${c('string')} and ${c('unique_ptr')} all work this way.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A loop runs ${c('new int[1000]')} a million times without ever calling ${c('delete')}. What happens?`, ['Nothing: memory is reused automatically', 'A memory leak: about 4 GB is never freed', 'A compile error', 'The loop runs once'], 1, [R`C++ has no garbage collector.`], R`Each block stays allocated: $10^6 \times 4000$ bytes = 4 GB leaked.`)] }
    ],
    labs: [
      { sim: 'memory', title: 'Pointers and the heap, step by step', desc: 'Step through the programs and watch the stack frames, the heap and where each pointer points.',
        tasks: ['In the swap program, why does swap need pointers (or references) at all?', 'In the heap program, which pointer is left dangling, and why is that dangerous?'],
        params: { programs: {
          swap: { name: 'Swapping through pointers', lang: 'cpp', code: ['void swap(int* a, int* b) {', '    int t = *a;', '    *a = *b;', '    *b = t;', '}', 'int main() {', '    int x = 3, y = 8;', '    swap(&x, &y);', '}'], steps: [
            { line: 6, frames: [{ fn: 'main()', vars: [V('x', 3, null, '0x7ffc10', 1, 'x'), V('y', 8, null, '0x7ffc14', 1, 'y')] }], note: '<code>x</code> and <code>y</code> are on the stack, each at its own address.' },
            { line: 0, frames: [{ fn: 'main()', vars: [V('x', 3, null, '0x7ffc10', 0, 'x'), V('y', 8, null, '0x7ffc14', 0, 'y')] }, { fn: 'swap(a, b)', vars: [V('a', '0x7ffc10', 'x', '0x7ffbf0', 1), V('b', '0x7ffc14', 'y', '0x7ffbf8', 1)] }], note: '<code>swap(&x, &y)</code> passes the <em>addresses</em>. A new frame holds the pointers a and b.' },
            { line: 1, frames: [{ fn: 'main()', vars: [V('x', 3, null, '0x7ffc10', 0, 'x'), V('y', 8, null, '0x7ffc14', 0, 'y')] }, { fn: 'swap(a, b)', vars: [V('a', '0x7ffc10', 'x'), V('b', '0x7ffc14', 'y'), V('t', 3, null, null, 1)] }], note: '<code>t = *a</code> follows a to x and copies its value, 3.' },
            { line: 2, frames: [{ fn: 'main()', vars: [V('x', 8, null, '0x7ffc10', 1, 'x'), V('y', 8, null, '0x7ffc14', 0, 'y')] }, { fn: 'swap(a, b)', vars: [V('a', '0x7ffc10', 'x'), V('b', '0x7ffc14', 'y'), V('t', 3)] }], note: '<code>*a = *b</code> writes 8 into x, in main’s frame, through the pointer.' },
            { line: 3, frames: [{ fn: 'main()', vars: [V('x', 8, null, '0x7ffc10', 0, 'x'), V('y', 3, null, '0x7ffc14', 1, 'y')] }, { fn: 'swap(a, b)', vars: [V('a', '0x7ffc10', 'x'), V('b', '0x7ffc14', 'y'), V('t', 3)] }], note: '<code>*b = t</code> puts 3 into y.' },
            { line: 8, frames: [{ fn: 'main()', vars: [V('x', 8, null, '0x7ffc10', 0, 'x'), V('y', 3, null, '0x7ffc14', 0, 'y')] }], note: 'swap’s frame is popped; its locals are gone, but x and y really were swapped. With plain <code>int a, int b</code> only copies would have been swapped.' }] },
          heap: { name: 'new, delete and a dangling pointer', lang: 'cpp', code: ['int main() {', '    int* p = new int[3]{1, 2, 3};', '    int* q = p;', '    q[1] = 20;', '    delete[] p;', '    p = nullptr;', '    // q still holds the old address!', '    std::vector<int> v = {4, 5};', '}'], steps: [
            { line: 1, frames: [{ fn: 'main()', vars: [V('p', '0x55a0', 'H1', null, 1)] }], heap: [{ id: 'H1', label: 'int[3] at 0x55a0', items: [1, 2, 3] }], note: '<code>new</code> reserves 12 bytes on the heap; p holds their address.' },
            { line: 2, frames: [{ fn: 'main()', vars: [V('p', '0x55a0', 'H1'), V('q', '0x55a0', 'H1', null, 1)] }], heap: [{ id: 'H1', label: 'int[3] at 0x55a0', items: [1, 2, 3] }], note: 'Copying a pointer copies the address: q and p point to the same block.' },
            { line: 3, frames: [{ fn: 'main()', vars: [V('p', '0x55a0', 'H1'), V('q', '0x55a0', 'H1')] }], heap: [{ id: 'H1', label: 'int[3] at 0x55a0', items: [1, 20, 3] }], note: 'Writing through q changes the block p sees.' },
            { line: 4, frames: [{ fn: 'main()', vars: [V('p', '0x55a0', 'H1'), V('q', '0x55a0', 'H1')] }], heap: [{ id: 'H1', label: 'freed memory', items: ['?', '?', '?'], dead: true, note: 'returned to the system' }], note: '<code>delete[]</code> frees the block. The pointers still hold the old address.' },
            { line: 5, frames: [{ fn: 'main()', vars: [V('p', 'nullptr', null, null, 1), V('q', '0x55a0', 'H1')] }], heap: [{ id: 'H1', label: 'freed memory', items: ['?', '?', '?'], dead: true, note: 'may be reused for anything' }], note: 'p is safely null. q is <strong>dangling</strong>: using it is undefined behaviour.' },
            { line: 7, frames: [{ fn: 'main()', vars: [V('p', 'nullptr'), V('q', '0x55a0', 'H1'), V('v', 'vector', 'H2', null, 1)] }], heap: [{ id: 'H1', label: 'freed memory', items: ['?', '?', '?'], dead: true }, { id: 'H2', label: 'owned by v', items: [4, 5] }], note: 'A vector keeps its elements on the heap but owns them (RAII).' },
            { line: 8, frames: [], heap: [{ id: 'H1', label: 'freed memory', items: ['?', '?', '?'], dead: true }, { id: 'H2', label: 'freed by v’s destructor', items: ['?', '?'], dead: true }], note: 'At the closing brace v’s destructor frees its memory automatically: no delete needed, no leak possible.' }] }
        } } },
      { sim: 'code', title: 'Challenge: reverse in place', desc: '', params: { challenge: 'cpp-reverse' } }
    ],
    formulas: [['Address and dereference', 'int* p = &x;   *p = 5;   // p points at x', 'cpp'], ['Reference', 'int& r = x;   r = 5;   // r is another name for x', 'cpp'], ['Array element address', '\\&a[i] = a + i\\ \\text{(i.e. } \\text{start} + i\\cdot\\text{sizeof)}'],
      ['Heap', 'int* a = new int[n];  ...  delete[] a;', 'cpp'], ['RAII instead', 'vector<int> v(n);   auto p = make_unique<Node>();', 'cpp'], ['Checked access', 'v.at(i)   // throws out_of_range', 'cpp']],
    problems: [
      P('concept', 'mcq', 'Address of', R`In an expression, what does ${c('&x')} mean?`, 0, [R`The opposite of ${c('*')}.`], R`The address of x.`, { options: ['the address of x', 'the value x points to', 'x AND something', 'a copy of x'] }),
      P('concept', 'mcq', 'nullptr', R`What happens if you dereference a null pointer?`, 2, [R`There is nothing there to read.`], R`Undefined behaviour, usually a crash (segmentation fault).`, { options: ['You get 0', 'Nothing', 'Undefined behaviour, usually a crash', 'A compile error'] }),
      P('concept', 'mcq', 'Where it lives', R`Memory from ${c('new')} lives…`, 1, [R`It outlives the function.`], R`On the heap, until ${c('delete')}.`, { options: ['on the stack', 'on the heap', 'in a file', 'in the CPU registers'] }),
      P('concept', 'mcq', 'RAII', R`Why prefer ${c('vector<int>')} to ${c('new int[n]')}?`, 3, [R`Who calls delete?`], R`The vector frees its memory automatically when it goes out of scope, and knows its own size.`, { options: ['It is always faster', 'It uses less memory', 'It lives on the stack only', 'It frees its memory automatically'] }),
      P('core', 'num', 'Pointer arithmetic', R`${c('int a[] = {5, 10, 15, 20, 25}; int* p = a + 1;')} What is ${c('*(p + 2)')}?`, 20, [R`p points at a[1].`], R`p + 2 points at a[3] = 20.`),
      P('core', 'num', 'Through a pointer', R`${c('int x = 2, y = 5; int* p = &x; *p = 7; p = &y; *p += x;')} What is ${c('y')}?`, 12, [R`First p points at x, then at y.`], R`x becomes 7; then y = 5 + 7 = 12.`),
      P('core', 'num', 'References', R`${c('int a = 1; int& r = a; int b = r; r = 9; b++;')} What is ${c('a + b')}?`, 11, [R`b is a copy, not a reference.`], R`a = 9, b = 2: 11.`),
      P('core', 'num', 'Sizes', R`On a 64-bit machine a pointer is 8 bytes and an int 4. What is ${c('sizeof(int*) + sizeof(int)')}?`, 12, [R`A pointer stores an address.`], R`8 + 4 = 12.`),
      P('olympiad', 'num', 'Stack depth', R`A recursive function uses 64 bytes of stack per call and the stack is 8 MB ($8\cdot2^{20}$ bytes). About how deep can the recursion go?`, 131072, [R`Divide.`], R`$8\cdot2^{20} / 64 = 2^{17} = 131\,072$ calls. Deep DFS on big graphs can overflow the stack.`, { tol: 0 }),
      P('olympiad', 'num', '2D arrays', R`${c('int g[100][50];')} starts at address 0. Rows are stored one after another and an int is 4 bytes. At what address is ${c('g[3][7]')}?`, 628, [R`Element number $3\cdot50 + 7$.`], R`$(3\cdot50 + 7)\cdot4 = 157\cdot4 = 628$.`),
      P('olympiad', 'mcq', 'Returning a local', R`${c('int* f() { int x = 5; return &x; }')} What is wrong?`, 1, [R`Where does x live, and when does it die?`], R`x is on f's stack frame, which is gone after f returns: the pointer dangles.`, { options: ['Nothing', 'It returns the address of a local that no longer exists', 'It leaks memory', 'It does not compile'] })
    ]
  });
  PB.addDrills('cpp-memory', [
    { title: 'Element address', gen: (r) => { const base = r.int(10, 90) * 100, sz = r.pick([1, 4, 8]), i = r.int(1, 30); return { q: R`<p>An array of ${sz}-byte elements starts at address ${base}. Where is element ${i}?</p>`, answer: base + sz * i, tol: 0.0001, solution: R`<p>${base} + ${sz}·${i} = ${base + sz * i}.</p>` }; } },
    { title: 'Pointer steps', gen: (r) => { const a = [r.int(1, 9) * 5, r.int(1, 9) * 5, r.int(1, 9) * 5, r.int(1, 9) * 5, r.int(1, 9) * 5, r.int(1, 9) * 5], s = r.int(0, 2), k = r.int(0, 3); return { q: R`<p>${c('int a[] = {' + a.join(', ') + '}; int* p = a + ' + s + ';')} What is ${c('*(p + ' + k + ')')}?</p>`, answer: a[s + k], tol: 0.0001, solution: R`<p>a[${s + k}] = ${a[s + k]}.</p>` }; } }
  ]);
  const revRef = (s) => { const t = toks(s); const n = +t[0]; return t.slice(1, n + 1).reverse().join(' ') + '\n'; };
  PB.addChallenge({ id: 'cpp-reverse', chapter: 'cpp-memory', title: 'Reverse in place', level: 'easy',
    statement: R`<p>Read $n$ numbers into an array and print them in reverse order. Try to do it <em>in place</em>: two indices (or pointers) walking inwards from both ends, swapping as they go, with no second array.</p>`, input: R`<p>$n$ ($1 \le n \le 2\cdot10^5$), then $n$ integers.</p>`, output: R`<p>The numbers reversed, separated by spaces.</p>`,
    samples: [T(revRef)('5\n1 2 3 4 5\n')], tests: [T(revRef)('1\n7\n'), T(revRef)('4\n-1 0 -1 3\n'), G(revRef, (r) => { const a = []; for (let i = 0; i < 3500; i++) a.push(r.int(-1e6, 1e6)); return a.length + '\n' + a.join(' ') + '\n'; })],
    hints: [R`${c('int i = 0, j = n - 1; while (i < j) swap(a[i++], a[j--]);')}`],
    solution: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int& x : a) cin >> x;\n    int* lo = a.data();\n    int* hi = a.data() + n - 1;\n    while (lo < hi) swap(*lo++, *hi--);\n    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 < n ? " " : "\\n");\n}\n', python: 'n = int(input())\na = input().split()\ni, j = 0, n - 1\nwhile i < j:\n    a[i], a[j] = a[j], a[i]\n    i += 1\n    j -= 1\nprint(" ".join(a))\n' } });

  /* ===================== 14. The STL, classes and templates ===================== */
  PB.addChapter({
    id: 'cpp-stl', subject: 'computing', num: 14, part: 'C++',
    title: 'The STL, Classes and Templates',
    subtitle: R`C++'s toolbox. vector and string, pair, map, set and unordered_map, sort with lambdas and the standard algorithms, structs and classes, and templates.`,
    big: 'The Standard Template Library gives C++ the same comfortable containers as Python (growable arrays, dictionaries, sets) with the speed of C++, plus dozens of tested algorithms. Learning the STL well is the single biggest step to fast, short contest solutions.',
    goals: ['Use vector, string and pair', 'Choose between map, set and unordered_map', 'Sort with custom comparators and lambdas', 'Use lower_bound, accumulate, max_element and unique', 'Define structs and classes with constructors and operators', 'Read a simple template'],
    sections: [
      { title: 'vector and string', html: R`
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v = {5, 3, 8};
    v.push_back(1);                       // [5, 3, 8, 1]
    sort(v.begin(), v.end());             // [1, 3, 5, 8]
    for (int x : v) cout << x << " ";     // range-based for
    cout << "\n" << v.size() << " " << v.back() << "\n";
    vector<vector<int>> grid(3, vector<int>(4, 0));   // 3 x 4 grid of zeros
    grid[1][2] = 7;

    string s = "hello";
    s += " world";
    cout << s.size() << " " << s.substr(0, 5) << " " << s[1] << "\n";
    reverse(s.begin(), s.end());
    cout << s << "\n";
}`, true)}
<p>${c('vector<T>')} is C++'s list: a growable array that knows its size and cleans up after itself. Most algorithms take a range as two <strong>iterators</strong>, ${c('v.begin()')} and ${c('v.end()')} (one past the last element). Pass vectors to functions by reference to avoid copying them.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('vector<int> v(5, 2); v.push_back(9); v[0] = 4;')} What is the sum of ${c('v')}?`, 21, [R`Five 2s, then a 9, then the first becomes 4.`], R`4 + 2 + 2 + 2 + 2 + 9 = 21.`)] },
      { title: 'Maps and sets', html: R`
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    map<string, int> count;               // sorted by key; O(log n) per operation
    for (string w : {"b", "a", "b", "c", "b"}) count[w]++;   // missing keys start at 0
    for (auto& [word, k] : count) cout << word << ":" << k << " ";  // a:1 b:3 c:1
    cout << "\n";

    set<int> s = {5, 1, 5, 3};            // {1, 3, 5}: sorted, no duplicates
    s.insert(2);
    cout << s.count(3) << " " << *s.begin() << " " << s.size() << "\n";   // 1 1 4

    unordered_map<int, int> seen;          // hash table: O(1) on average, not sorted
    seen[42] = 1;
    if (seen.count(42)) cout << "found\n";
    pair<int, string> p = {3, "c"};        // p.first, p.second
}`, true)}
<p>${c('map')} and ${c('set')} keep their keys sorted (they are balanced binary search trees), so you can iterate in order or find the smallest key; each operation is $O(\log n)$. ${c('unordered_map')} and ${c('unordered_set')} are hash tables, usually faster but in no particular order. Careful: ${c('m[key]')} <em>creates</em> the key if it is missing; use ${c('m.count(key)')} or ${c('m.find(key)')} just to check.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('set<int> s; for (int x : {4, 1, 4, 2, 1, 4}) s.insert(x);')} What is ${c('s.size()')}?`, 3, [R`Duplicates are ignored.`], R`{1, 2, 4}: 3.`)] },
      { title: 'Algorithms and lambdas', html: R`
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v = {7, 2, 9, 2, 5};
    sort(v.begin(), v.end(), greater<int>());                 // descending
    sort(v.begin(), v.end(), [](int a, int b) { return a % 3 < b % 3; });   // a lambda
    sort(v.begin(), v.end());                                 // [2, 2, 5, 7, 9]
    cout << accumulate(v.begin(), v.end(), 0LL) << "\n";      // sum: 25
    cout << *max_element(v.begin(), v.end()) << "\n";         // 9
    auto it = lower_bound(v.begin(), v.end(), 6);             // first element >= 6
    cout << (it - v.begin()) << "\n";                         // index 3
    v.erase(unique(v.begin(), v.end()), v.end());             // remove neighbouring duplicates
    cout << v.size() << "\n";                                 // 4
}`, true)}
<p>A <strong>lambda</strong> ${c('[](int a, int b) { return a < b; }')} is an unnamed function written in place. A comparator must answer "should ${c('a')} come before ${c('b')}?" and must be strict: return ${c('false')} for equal elements, or ${c('sort')} can crash. ${c('lower_bound')} does binary search on a sorted range, in $O(\log n)$. Learn these by heart: they turn 20-line loops into one line with no bugs.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('vector<int> v = {1, 3, 3, 3, 8};')} What is ${c('upper_bound(v.begin(), v.end(), 3) - lower_bound(v.begin(), v.end(), 3)')}?`, 3, [R`lower_bound: first ≥ 3; upper_bound: first > 3.`], R`Indices 4 − 1 = 3: the number of 3s.`)] },
      { title: 'Structs, classes and templates', html: R`
${K('cpp', R`
#include <bits/stdc++.h>
using namespace std;

struct Student {                         // a struct: members are public
    string name;
    int score;
    bool operator<(const Student& o) const {        // how to compare two Students
        if (score != o.score) return score > o.score;   // higher score first
        return name < o.name;                           // then alphabetical
    }
};

class Counter {                          // a class: members private by default
    int n = 0;
public:
    void add() { n++; }
    int get() const { return n; }
};

template <typename T>                    // works for any type with <
T biggest(const vector<T>& v) { return *max_element(v.begin(), v.end()); }

int main() {
    vector<Student> s = {{"Alan", 78}, {"Ada", 91}, {"Grace", 91}};
    sort(s.begin(), s.end());            // uses operator<
    for (auto& x : s) cout << x.name << " ";   // Ada Grace Alan
    Counter c; c.add(); c.add();
    cout << "\n" << c.get() << " " << biggest(vector<double>{1.5, 9.25, 3}) << "\n";
}`, true)}
<p>${c('struct')} and ${c('class')} are almost the same; by convention structs are plain bundles of data and classes hide their data behind methods (${c('private')} versus ${c('public')}), protecting their rules. Defining ${c('operator<')} lets ${c('sort')}, ${c('set')} and ${c('map')} order your type. <strong>Templates</strong> write code once for many types: ${c('vector<T>')} itself is a template.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`With the ${c('Student')} ordering above, which comes first: (Bob, 80) or (Amy, 80)?`, ['Bob', 'Amy', 'Either: they are equal', 'It does not compile'], 1, [R`Equal scores fall back to the name.`], R`Amy: same score, and "Amy" < "Bob".`)] }
    ],
    labs: [
      { sim: 'code', title: 'STL tour', desc: 'A word counter in a few lines of C++: read text, count with a map, sort the pairs by frequency.', params: { lang: 'cpp', langs: ['cpp', 'python'], stdin: 'the quick brown fox jumps over the lazy dog the fox', code: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    map<string, int> cnt;\n    string w;\n    while (cin >> w) cnt[w]++;\n    vector<pair<int, string>> v;\n    for (auto& [word, k] : cnt) v.push_back({-k, word});\n    sort(v.begin(), v.end());\n    for (auto& [k, word] : v) cout << word << " " << -k << "\\n";\n}\n', python: 'from collections import Counter\nimport sys\ncnt = Counter(sys.stdin.read().split())\nfor word, k in sorted(cnt.items(), key=lambda p: (-p[1], p[0])):\n    print(word, k)\n' } } },
      { sim: 'code', title: 'Challenge: distinct values', desc: '', params: { challenge: 'cpp-distinct' } },
      { sim: 'code', title: 'Challenge: leaderboard', desc: '', params: { challenge: 'cpp-leaderboard' } }
    ],
    formulas: [['vector', 'vector<int> v(n, 0);  v.push_back(x);  v.size();  v.back();', 'cpp'], ['sort', 'sort(v.begin(), v.end());\nsort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second < b.second; });', 'cpp'], ['map / set', 'map<string,int> m; m[k]++; m.count(k);\nset<int> s; s.insert(x); s.count(x);', 'cpp'],
      ['Binary search', 'lower_bound(v.begin(), v.end(), x)   // first >= x\nupper_bound(...)                     // first > x', 'cpp'], ['Distinct', 'sort(...); v.erase(unique(v.begin(), v.end()), v.end());', 'cpp'], ['Struct with ordering', 'struct P { int a, b; bool operator<(const P& o) const { return a < o.a; } };', 'cpp']],
    problems: [
      P('concept', 'mcq', 'Sorted container', R`Which container keeps its keys in sorted order?`, 0, [R`It is a balanced tree.`], R`${c('map')} (and ${c('set')}).`, { options: [c('map'), c('unordered_map'), c('vector'), c('queue')] }),
      P('concept', 'mcq', 'end()', R`${c('v.end()')} points…`, 2, [R`Ranges are half-open: [begin, end).`], R`One past the last element; never dereference it.`, { options: ['at the last element', 'at the first element', 'one past the last element', 'at nothing, it is nullptr'] }),
      P('concept', 'mcq', 'operator[] on a map', R`What does ${c('if (m["x"] == 0)')} do to a ${c('map<string,int>')} without the key "x"?`, 1, [R`${c('operator[]')} must return a reference to something.`], R`It inserts "x" with value 0. Use ${c('m.count("x")')} to test without inserting.`, { options: ['Throws an exception', 'Inserts "x" with value 0', 'Nothing', 'Crashes'] }),
      P('concept', 'mcq', 'Complexity', R`Inserting into a ${c('set<int>')} of $n$ elements takes…`, 1, [R`A balanced binary search tree.`], R`$O(\log n)$.`, { options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'] }),
      P('core', 'num', 'unique', R`${c('vector<int> v = {3, 1, 3, 2, 1, 3}; sort(...); v.erase(unique(...), v.end());')} What is ${c('v.size()')}?`, 3, [R`After sorting, unique removes neighbouring duplicates.`], R`{1, 2, 3}: 3.`),
      P('core', 'num', 'lower_bound', R`${c('vector<int> v = {2, 4, 4, 8, 16};')} What index does ${c('lower_bound(v.begin(), v.end(), 5) - v.begin()')} give?`, 3, [R`First element ≥ 5.`], R`8 is at index 3.`),
      P('core', 'num', 'map iteration', R`${c('map<int,int> m; m[5] = 1; m[2] = 7; m[9] = 3;')} The first pair visited by ${c('for (auto& [k, v] : m)')} has which value v?`, 7, [R`Keys are visited in increasing order.`], R`Key 2 comes first, with value 7.`),
      P('core', 'num', 'Comparator', R`Sorting ${c('{5, 12, 7, 20}')} with ${c('[](int a, int b){ return a % 10 < b % 10; }')}. Which number ends up first?`, 20, [R`Compare the last digits: 5, 2, 7, 0.`], R`20 (last digit 0).`),
      P('olympiad', 'num', 'Count in range', R`For a sorted vector, ${c('upper_bound(b) - lower_bound(a)')} counts values in $[a, b]$. For ${c('{1, 2, 2, 5, 7, 7, 7, 10}')}, how many values lie in $[2, 7]$?`, 6, [R`2, 2, 5, 7, 7, 7.`], R`6.`),
      P('olympiad', 'mcq', 'A bad comparator', R`Why can ${c('sort(v.begin(), v.end(), [](int a, int b){ return a <= b; })')} crash?`, 2, [R`What must comp(a, a) return?`], R`The comparator must be a strict ordering: comp(a, a) must be false. With ${c('<=')} the algorithm can run off the end of the array.`, { options: ['<= is not allowed in lambdas', 'It sorts descending', 'It is not a strict ordering (comp(a, a) is true)', 'Lambdas cannot capture'] }),
      P('olympiad', 'num', 'Pairs sort', R`Sorting the pairs ${c('{(2,"b"), (1,"z"), (2,"a"), (1,"c")}')} with the default ${c('<')} (first, then second). What is the position (0-based) of ${c('(2,"b")')}?`, 3, [R`Order: (1,"c"), (1,"z"), (2,"a"), (2,"b").`], R`Position 3.`)
    ]
  });
  PB.addDrills('cpp-stl', [
    { title: 'Distinct count', gen: (r) => { const a = Array.from({ length: r.int(5, 9) }, () => r.int(1, 6)); return { q: R`<p>After sort + unique + erase, how many elements remain of ${c('{' + a.join(', ') + '}')}?</p>`, answer: new Set(a).size, tol: 0.0001, solution: R`<p>The distinct values: ${[...new Set(a)].sort((x, y) => x - y).join(', ')}.</p>` }; } },
    { title: 'lower_bound index', gen: (r) => { const a = Array.from({ length: r.int(5, 9) }, () => r.int(1, 30)).sort((x, y) => x - y), x = r.int(0, 32); let i = a.findIndex((y) => y >= x); if (i < 0) i = a.length; return { q: R`<p>${c('v = {' + a.join(', ') + '}')}. What is ${c('lower_bound(v.begin(), v.end(), ' + x + ') - v.begin()')}?</p>`, answer: i, tol: 0.0001, solution: R`<p>The first element ≥ ${x} is at index ${i}${i === a.length ? ' (none: end)' : ''}.</p>` }; } }
  ]);
  const distRef = (s) => { const t = toks(s); const n = +t[0]; const u = [...new Set(t.slice(1, n + 1).map(Number))].sort((a, b) => a - b); return u.length + '\n' + u.join(' ') + '\n'; };
  PB.addChallenge({ id: 'cpp-distinct', chapter: 'cpp-stl', title: 'Distinct values', level: 'easy',
    statement: R`<p>Print how many different values appear, then those values in increasing order.</p>`, input: R`<p>$n$ ($1 \le n \le 2\cdot10^5$), then $n$ integers with $|a_i| \le 10^9$.</p>`, output: R`<p>The count, then the sorted distinct values on one line.</p>`,
    samples: [T(distRef)('6\n3 1 3 2 1 3\n')], tests: [T(distRef)('1\n-5\n'), T(distRef)('4\n7 7 7 7\n'), G(distRef, (r) => { const a = []; for (let i = 0; i < 100000; i++) a.push(r.int(-2500, 2500)); return a.length + '\n' + a.join(' ') + '\n'; })],
    hints: [R`${c('sort')} then ${c('unique')}, or put everything in a ${c('set')}.`],
    solution: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    vector<long long> v(n);\n    for (auto& x : v) cin >> x;\n    sort(v.begin(), v.end());\n    v.erase(unique(v.begin(), v.end()), v.end());\n    cout << v.size() << "\\n";\n    for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i + 1 < v.size() ? " " : "\\n");\n}\n', python: 'import sys\nd = sys.stdin.read().split()\nu = sorted(set(map(int, d[1:])))\nprint(len(u))\nprint(" ".join(map(str, u)))\n' } });
  const lbRef = (s) => { const L = lines(s).slice(1).filter((x) => x.trim()).map((l) => { const p = l.trim().split(/\s+/); return { n: p[0], s: +p[1], t: +p[2] }; }); L.sort((a, b) => b.s - a.s || a.t - b.t || (a.n < b.n ? -1 : a.n > b.n ? 1 : 0)); return L.map((x, i) => (i + 1) + ' ' + x.n).join('\n') + '\n'; };
  PB.addChallenge({ id: 'cpp-leaderboard', chapter: 'cpp-stl', title: 'Leaderboard', level: 'medium',
    statement: R`<p>Contestants are ranked by score, highest first. Equal scores are ranked by penalty time, lower first. If both are equal, by name in alphabetical (ASCII) order. Print the ranking.</p>`,
    input: R`<p>$n$ ($1 \le n \le 10^5$), then $n$ lines: name (no spaces), score and penalty, both integers from 0 to $10^6$.</p>`, output: R`<p>$n$ lines: rank and name.</p>`,
    samples: [T(lbRef)('4\nada 300 50\nbob 300 40\ncyd 500 90\ndee 300 40\n')], tests: [T(lbRef)('2\nb 0 0\na 0 0\n'), G(lbRef, (r) => { let s = '2500\n'; for (let i = 0; i < 2500; i++) s += 'u' + r.int(0, 999999) + ' ' + r.int(0, 50) * 100 + ' ' + r.int(0, 300) + '\n'; return s; })],
    hints: [R`A struct with ${c('operator<')}, or sort tuples like ${c('(-score, penalty, name)')}.`],
    solution: { cpp: '#include <bits/stdc++.h>\nusing namespace std;\nstruct C {\n    string name; int score, pen;\n    bool operator<(const C& o) const {\n        if (score != o.score) return score > o.score;\n        if (pen != o.pen) return pen < o.pen;\n        return name < o.name;\n    }\n};\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    vector<C> v(n);\n    for (auto& c : v) cin >> c.name >> c.score >> c.pen;\n    sort(v.begin(), v.end());\n    for (int i = 0; i < n; i++) cout << i + 1 << " " << v[i].name << "\\n";\n}\n', python: 'import sys\nd = sys.stdin.read().split()\nn = int(d[0])\nv = sorted((-int(d[2 + 3 * i]), int(d[3 + 3 * i]), d[1 + 3 * i]) for i in range(n))\nprint("\\n".join(f"{i + 1} {x[2]}" for i, x in enumerate(v)))\n' } });
})();
