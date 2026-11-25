/* Computing 9–11: JavaScript and the web. The language, HTML/CSS and the DOM, and asynchronous code,
   fetch and servers. Web labs run real pages in a sandboxed preview. */
(function () {
  const { R, K, c, P, T, G } = PB.csKit();
  const { QN, QM } = PB.csKit();
  const lines = (s) => s.replace(/\r/g, '').split('\n');

  /* ===================== 9. JavaScript fundamentals ===================== */
  PB.addChapter({
    id: 'js-basics', subject: 'computing', num: 9, part: 'JavaScript and the Web',
    title: 'JavaScript Fundamentals',
    subtitle: R`The language of the web. let and const, types and their surprises, == versus ===, functions and arrow functions, closures, arrays and objects, and map, filter and reduce.`,
    big: 'JavaScript is the only language every web browser runs, and with Node.js it runs servers too. If you know Python, most of it will feel familiar, with braces instead of indentation. Its quirks come from being designed in ten days in 1995: learn the handful of traps, and use <code>===</code>.',
    goals: ['Declare variables with let and const', 'Predict type conversions and avoid == surprises', 'Write functions, arrow functions and closures', 'Use arrays and objects', 'Transform data with map, filter and reduce', 'Translate a small Python program into JavaScript'],
    sections: [
      { title: 'Values, variables and types', html: R`
${K('javascript', R`
let score = 10;            // can be reassigned
const name = "Ada";        // cannot be reassigned
score += 5;
console.log(name, score);              // Ada 15
console.log(typeof 42, typeof 4.2);    // number number (one type for both)
console.log(typeof "hi", typeof true, typeof undefined, typeof null);
console.log(7 / 2, Math.floor(7 / 2), 7 % 2, 2 ** 10);
console.log(¨@{name} has @{score * 2} points¨);   // template literal`, true)}
<p>Use ${c('const')} by default and ${c('let')} when the value must change (the old ${c('var')} has odd scoping rules: avoid it). Statements end with ${c(';')} (optional, but conventional) and blocks use ${c('{ }')}. There is a single ${c('number')} type (64-bit floating point), so ${c('7 / 2')} is 3.5 and whole numbers are exact only up to $2^{53}$; ${c('BigInt')} (${c('10n ** 30n')}) handles larger ones. Two "nothing" values exist: ${c('undefined')} (never set) and ${c('null')} (deliberately empty).</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What does ${c('typeof 3.0')} give?`, [c('"int"'), c('"float"'), c('"number"'), c('"double"')], 2, [R`JavaScript has one numeric type.`], R`${c('"number"')}.`)] },
      { title: 'Equality and type surprises', html: R`
<p>JavaScript converts types automatically, sometimes surprisingly:</p>
${K('javascript', R`
console.log("5" + 1);      // "51"  + with a string joins
console.log("5" - 1);      // 4     - converts to numbers
console.log("5" == 5);     // true  == converts first
console.log("5" === 5);    // false === also compares types: use this one
console.log(0 == "", null == undefined, NaN === NaN);   // true true false
console.log(Boolean(""), Boolean("0"), Boolean([]));     // false true true`, true)}
<p><strong>Always use ${c('===')} and ${c('!==')}</strong>. In conditions, these values count as false ("falsy"): ${c('false, 0, "", null, undefined, NaN')}. Everything else, even ${c('"0"')} and empty arrays, is truthy. ${c('NaN')} ("not a number", from ${c('Number("abc")')}) is not even equal to itself: test it with ${c('Number.isNaN(x)')}.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is ${c('"3" * "4"')}?`, [c('"34"'), c('12'), c('"12"'), c('NaN')], 1, [R`Only ${c('+')} joins strings; ${c('*')} converts to numbers.`], R`${c('12')}, a number.`)] },
      { title: 'Functions, arrows and closures', html: R`
${K('javascript', R`
function area(w, h = 1) { return w * h; }
const square = (x) => x * x;              // arrow function
const add = (a, b) => { return a + b; };  // with a block body
console.log(area(3, 4), square(5), add(2, 3));

function makeCounter() {
  let count = 0;                 // private to this counter
  return () => ++count;          // the inner function remembers count
}
const tick = makeCounter();
tick(); tick();
console.log(tick());             // 3

[3, 1, 2].forEach((x, i) => console.log(i, x));   // functions as arguments`, true)}
<p>Functions are values: you can store them in variables, pass them to other functions (<strong>callbacks</strong>), and return them. A function created inside another keeps access to the outer variables even after the outer one has returned: a <strong>closure</strong>. Closures are how JavaScript keeps private state, and they are behind every event handler you will write.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('const f = (n) => (m) => n * m;')} What is ${c('f(3)(7)')}?`, 21, [R`${c('f(3)')} returns a function that multiplies by 3.`], R`21.`)] },
      { title: 'Arrays and objects', html: R`
${K('javascript', R`
const nums = [5, 3, 8, 1];
nums.push(4);
console.log(nums.length, nums[0], nums.includes(8));
console.log(nums.map((x) => x * 2));            // [10, 6, 16, 2, 8]
console.log(nums.filter((x) => x % 2 === 0));   // [8, 4]
console.log(nums.reduce((sum, x) => sum + x, 0)); // 21
console.log([...nums].sort((a, b) => a - b));   // numeric sort: needs a compare function!

const user = { name: "Grace", age: 37, langs: ["COBOL"] };
user.age += 1;
const { name, age } = user;                     // destructuring
console.log(name, age, Object.keys(user));
console.log(JSON.stringify(user));              // text for sending over HTTP
for (const lang of user.langs) console.log(lang);`, true)}
<p>Objects are JavaScript's dictionaries and records in one. ${c('map')}, ${c('filter')} and ${c('reduce')} transform arrays without writing loops by hand. One famous trap: ${c('[10, 9, 1].sort()')} gives ${c('[1, 10, 9]')}, because the default sort compares as <em>text</em>; pass ${c('(a, b) => a - b')} for numbers. Like Python lists, arrays and objects are shared by reference.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('[1, 2, 3, 4, 5].filter(x => x > 2).map(x => x * 10).reduce((a, b) => a + b, 0)')}?`, 120, [R`Keep 3, 4, 5, then multiply by 10.`], R`30 + 40 + 50 = 120.`)] }
    ],
    labs: [
      { sim: 'code', title: 'JavaScript playground', desc: 'Runs in a sandboxed worker in your browser. Try the same idea in Python with the language menu.', params: { lang: 'javascript', langs: ['javascript', 'python'], code: { javascript: 'const people = [\n  { name: "Ada", born: 1815 },\n  { name: "Alan", born: 1912 },\n  { name: "Grace", born: 1906 },\n];\nconst modern = people.filter((p) => p.born > 1900).map((p) => p.name);\nconsole.log(modern);\nconsole.log([10, 9, 1].sort(), [10, 9, 1].sort((a, b) => a - b));\nconsole.log("5" + 1, "5" - 1, "5" == 5, "5" === 5);\n', python: 'people = [{"name": "Ada", "born": 1815}, {"name": "Alan", "born": 1912}, {"name": "Grace", "born": 1906}]\nmodern = [p["name"] for p in people if p["born"] > 1900]\nprint(modern)\nprint(sorted([10, 9, 1]))\n' } } },
      { sim: 'code', title: 'Challenge: above average', desc: '', params: { challenge: 'js-average' } }
    ],
    formulas: [['Variables', 'const x = 1;   let y = 2;', 'javascript'], ['Equality', '=== and !== (never ==)', 'javascript'], ['Functions', 'function f(a, b = 0) { return a + b; }\nconst g = (x) => x * x;', 'javascript'],
      ['Arrays', 'xs.push(v)  xs.length  xs.includes(v)\nxs.map(f)  xs.filter(f)  xs.reduce(f, 0)\nxs.sort((a, b) => a - b)', 'javascript'], ['Objects', 'const o = { k: 1 };  o.k  o["k"]  Object.keys(o)\nconst { k } = o;  JSON.stringify(o)', 'javascript'], ['Template literal', '`Hi @{name}, you are @{age}`', 'javascript']].map((f) => [f[0], PB.csKit().fix(f[1]), f[2]]),
    problems: [
      P('concept', 'mcq', 'Strict equality', R`Which comparison is ${c('false')}?`, 2, [R`${c('===')} checks the type too.`], R`${c('"1" === 1')} is false: a string is not a number.`, { options: [c('"1" == 1'), c('1 === 1'), c('"1" === 1'), c('null == undefined')] }),
      P('concept', 'mcq', 'const', R`What happens on ${c('const x = 1; x = 2;')}?`, 1, [R`const means the name cannot be pointed elsewhere.`], R`A ${c('TypeError')}: assignment to a constant variable.`, { options: ['x becomes 2', 'TypeError', 'x stays 1 silently', 'x becomes undefined'] }),
      P('concept', 'mcq', 'Joining', R`What is ${c('"2" + 2 + 2')}?`, 2, [R`Left to right: string + number first.`], R`${c('"22"')}, then ${c('"222"')}.`, { options: [c('6'), c('"24"'), c('"222"'), c('"42"')] }),
      P('concept', 'mcq', 'Falsy', R`Which value is truthy?`, 3, [R`The falsy ones: false, 0, "", null, undefined, NaN.`], R`${c('"0"')} is a non-empty string, so truthy.`, { options: [c('0'), c('""'), c('null'), c('"0"')] }),
      P('core', 'num', 'Subtraction converts', R`What is ${c('"10" - "4" + 1')}?`, 7, [R`${c('-')} converts strings to numbers.`], R`6 + 1 = 7.`),
      P('core', 'num', 'Closures', R`${c('const c = makeCounter();')} (the counter from the text) is called 4 times, then ${c('const d = makeCounter();')} once. What does ${c('c() + d()')} return?`, 7, [R`Each counter has its own ${c('count')}.`], R`${c('c()')} returns 5, ${c('d()')} returns 2: 7.`),
      P('core', 'num', 'reduce', R`What is ${c('[2, 3, 4].reduce((acc, x) => acc * x, 1)')}?`, 24, [R`Multiply them all.`], R`24.`),
      P('core', 'mcq', 'Default sort', R`What is ${c('[5, 25, 100].sort()')}?`, 1, [R`The default compares the numbers as strings.`], R`As text "100" < "25" < "5": ${c('[100, 25, 5]')}.`, { options: [c('[5, 25, 100]'), c('[100, 25, 5]'), c('[25, 5, 100]'), c('[100, 5, 25]')] }),
      P('core', 'num', 'Integer division', R`JavaScript has no ${c('//')}. What is ${c('Math.floor(-7 / 2)')}?`, -4, [R`Floor rounds down.`], R`−4, like Python's ${c('-7 // 2')}. (${c('Math.trunc')} would give −3.)`),
      P('olympiad', 'num', 'Safe integers', R`${c('Number.MAX_SAFE_INTEGER')} is $2^{53} - 1$. What is ${c('2 ** 53 + 1 - 2 ** 53')} in JavaScript?`, 0, [R`$2^{53} + 1$ cannot be stored exactly: it rounds to $2^{53}$.`], R`0. Above $2^{53}$ not every integer exists as a double; use BigInt.`),
      P('olympiad', 'num', 'Loop closures', R`${c('const fs = []; for (let i = 0; i < 3; i++) fs.push(() => i);')} What is ${c('fs[0]() + fs[1]() + fs[2]()')}?`, 3, [R`${c('let')} makes a fresh ${c('i')} for each turn.`], R`0 + 1 + 2 = 3. With ${c('var')} all three would share one ${c('i')} and return 3 each, giving 9.`),
      P('olympiad', 'num', 'Spread and references', R`${c('const a = [1, 2]; const b = a; const c = [...a]; b.push(3); c.push(4, 5);')} What is ${c('a.length * 10 + c.length')}?`, 34, [R`${c('b')} shares ${c('a')}; ${c('c')} is a copy.`], R`${c('a')} has 3 items, ${c('c')} has 4: 34.`)
    ]
  });
  PB.addDrills('js-basics', [
    { title: 'map, filter, reduce', gen: (r) => { const xs = Array.from({ length: r.int(4, 7) }, () => r.int(1, 12)), t = r.int(3, 8), k = r.int(2, 5); const v = xs.filter((x) => x > t).map((x) => x * k).reduce((a, b) => a + b, 0); return { q: R`<p>What is ${c('[' + xs.join(', ') + '].filter(x => x > ' + t + ').map(x => x * ' + k + ').reduce((a, b) => a + b, 0)')}?</p>`, answer: v, tol: 0.0001, solution: R`<p>${v}.</p>` }; } },
    { title: 'Conversions', gen: (r) => { const a = r.int(2, 30), b = r.int(1, 9), d = r.int(1, 9); return { q: R`<p>What number is ${c('"' + a + '" - ' + b + ' + ' + d)}?</p>`, answer: a - b + d, tol: 0.0001, solution: R`<p>${c('-')} converts: ${a} − ${b} + ${d} = ${a - b + d}.</p>` }; } }
  ]);
  const avgRef = (s) => { const L = lines(s).slice(1).filter((x) => x.trim()).map((l) => { const p = l.trim().split(/\s+/); return [p[0], +p[1]]; }); const avg = L.reduce((a, x) => a + x[1], 0) / L.length; const up = L.filter((x) => x[1] > avg).map((x) => x[0]).sort(); return avg.toFixed(2) + '\n' + up.length + '\n' + up.join('\n') + (up.length ? '\n' : ''); };
  PB.addChallenge({ id: 'js-average', chapter: 'js-basics', title: 'Above average', level: 'easy',
    statement: R`<p>Given students and their scores, print the average score to exactly two decimal places, then how many students scored strictly above the average, then their names in alphabetical order.</p>`,
    input: R`<p>The first line holds $n$ ($1 \le n \le 10^4$). Then $n$ lines: a name and an integer score from 0 to 100. Names are distinct.</p>`, output: R`<p>The average (two decimals), the count, then the names.</p>`,
    samples: [T(avgRef)('4\nAda 91\nAlan 78\nGrace 95\nLinus 64\n')], check: 0.006,
    tests: [T(avgRef)('1\nSolo 50\n'), T(avgRef)('3\nb 10\na 10\nc 10\n'), G(avgRef, (r) => { let s = '5000\n'; for (let i = 0; i < 5000; i++) s += 'p' + i + ' ' + r.int(0, 100) + '\n'; return s; }, false)],
    hints: [R`In JavaScript, ${c('x.toFixed(2)')} formats with two decimals; in Python, ${c('f"{x:.2f}"')}.`, R`Read everything first: you need the average before you can decide who is above it.`],
    starter: { javascript: 'const n = Number(readline());\nconst students = [];\nfor (let i = 0; i < n; i++) {\n  const [name, score] = readline().split(" ");\n  students.push({ name, score: Number(score) });\n}\n// compute the average, then filter, sort and print\n' },
    solution: { javascript: 'const n = Number(readline());\nconst st = [];\nfor (let i = 0; i < n; i++) {\n  const [name, s] = readline().split(" ");\n  st.push({ name, score: Number(s) });\n}\nconst avg = st.reduce((a, x) => a + x.score, 0) / n;\nconst up = st.filter((x) => x.score > avg).map((x) => x.name).sort();\nconsole.log(avg.toFixed(2));\nconsole.log(up.length);\nup.forEach((x) => console.log(x));\n', python: 'n = int(input())\nst = [input().split() for _ in range(n)]\navg = sum(int(s) for _, s in st) / n\nup = sorted(name for name, s in st if int(s) > avg)\nprint(f"{avg:.2f}")\nprint(len(up))\nfor x in up:\n    print(x)\n' } });

  /* ===================== 10. HTML, CSS and the DOM ===================== */
  const COUNTER = '<!doctype html>\n<html>\n<head>\n  <style>\n    body { font-family: system-ui, sans-serif; display: grid; place-items: center; height: 90vh; margin: 0; }\n    .card { text-align: center; padding: 24px 32px; border-radius: 16px; box-shadow: 0 4px 20px #0002; }\n    #n { font-size: 64px; font-weight: 800; margin: 8px 0; }\n    button { font-size: 18px; padding: 8px 16px; margin: 4px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; }\n    .big { color: crimson; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>Counter</h2>\n    <div id="n">0</div>\n    <button id="minus">−</button>\n    <button id="plus">+</button>\n  </div>\n  <script>\n    let count = 0;                                  // the state\n    const out = document.querySelector("#n");\n    function render() {\n      out.textContent = count;\n      out.classList.toggle("big", count >= 10);     // red from 10 up\n    }\n    document.querySelector("#plus").addEventListener("click", () => { count++; render(); });\n    document.querySelector("#minus").addEventListener("click", () => { count--; render(); });\n    console.log("page ready");\n  </script>\n</body>\n</html>\n';
  const TODO = '<!doctype html>\n<html>\n<head>\n  <style>\n    body { font-family: system-ui, sans-serif; max-width: 420px; margin: 24px auto; }\n    form { display: flex; gap: 8px; }\n    input { flex: 1; padding: 8px; font-size: 16px; }\n    li { padding: 6px 0; cursor: pointer; }\n    li.done { text-decoration: line-through; color: #999; }\n  </style>\n</head>\n<body>\n  <h1>To do</h1>\n  <form id="f">\n    <input id="t" placeholder="Something to do" autocomplete="off">\n    <button>Add</button>\n  </form>\n  <ul id="list"></ul>\n  <p id="left"></p>\n  <script>\n    const todos = [{ text: "Learn the DOM", done: false }];\n    const list = document.getElementById("list");\n    function render() {\n      list.innerHTML = "";\n      todos.forEach((t, i) => {\n        const li = document.createElement("li");\n        li.textContent = t.text;\n        if (t.done) li.classList.add("done");\n        li.addEventListener("click", () => { t.done = !t.done; render(); });\n        list.appendChild(li);\n      });\n      document.getElementById("left").textContent = todos.filter((t) => !t.done).length + " left";\n    }\n    document.getElementById("f").addEventListener("submit", (e) => {\n      e.preventDefault();                        // stop the form reloading the page\n      const input = document.getElementById("t");\n      if (input.value.trim()) todos.push({ text: input.value.trim(), done: false });\n      input.value = "";\n      render();\n    });\n    render();\n  </script>\n</body>\n</html>\n';
  PB.addChapter({
    id: 'js-dom', subject: 'computing', num: 10, part: 'JavaScript and the Web',
    title: 'HTML, CSS and the DOM',
    subtitle: R`Building pages that react. HTML elements and structure, CSS selectors, the box model and flexbox, the DOM tree, and events.`,
    big: 'A web page is three languages working together: <strong>HTML</strong> says what things <em>are</em> (a heading, a button), <strong>CSS</strong> says how they <em>look</em>, and <strong>JavaScript</strong> says what they <em>do</em>. JavaScript sees the page as a tree of objects, the <strong>DOM</strong>, and changing that tree changes the page instantly.',
    goals: ['Write well-structured HTML', 'Style elements with CSS selectors and the box model', 'Lay out rows and columns with flexbox', 'Find and change elements through the DOM', 'Respond to clicks, typing and form submission', 'Keep state in variables and re-render from it'],
    sections: [
      { title: 'HTML: the structure', html: R`
<p>HTML marks up content with <strong>elements</strong>: an opening tag, content, and a closing tag. Tags can carry <strong>attributes</strong>, and elements nest inside each other to form a tree.</p>
${K('web', R`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My page</title>
  </head>
  <body>
    <header><h1>Hello</h1></header>
    <main>
      <p>A paragraph with a <a href="https://example.com">link</a> and <strong>bold</strong> text.</p>
      <img src="cat.jpg" alt="A sleepy cat">
      <ul><li>first</li><li>second</li></ul>
      <button id="go" class="primary">Go</button>
    </main>
  </body>
</html>`, true)}
<p>The ${c('<head>')} holds information about the page; the ${c('<body>')} holds what you see. Use elements for their meaning (${c('<h1>')} for the main heading, ${c('<button>')} for buttons, ${c('<nav>')}, ${c('<main>')}): screen readers, search engines and keyboards depend on it. The ${c('alt')} text describes an image for people who cannot see it.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which attribute gives an element a unique name you can find with JavaScript?`, [c('class'), c('id'), c('name'), c('href')], 1, [R`It must be unique in the page.`], R`${c('id')}; ${c('class')} can be shared by many elements.`)] },
      { title: 'CSS: the look', html: R`
${K('web', R`
<style>
  p { color: #333; line-height: 1.5; }            /* every <p> */
  .primary { background: teal; color: white; }    /* class="primary" */
  #go { font-size: 20px; }                        /* id="go" */
  nav a:hover { text-decoration: underline; }     /* <a> inside <nav>, on hover */
  .card {
    padding: 16px;              /* space inside the border */
    border: 2px solid #ccc;
    margin: 12px;               /* space outside the border */
    width: 200px;
  }
  .row { display: flex; gap: 12px; justify-content: space-between; align-items: center; }
</style>
<div class="row"><div class="card">One</div><div class="card">Two</div></div>`, true)}
<p>A CSS rule is a <strong>selector</strong> and a list of <strong>properties</strong>. Every element is a box: <strong>content</strong>, then <strong>padding</strong>, <strong>border</strong> and <strong>margin</strong> around it (the <strong>box model</strong>). With the default sizing, the ${c('.card')} above is $200 + 2\cdot16 + 2\cdot2 = 236$ px wide on screen; ${c('box-sizing: border-box')} makes ${c('width')} include padding and border instead. <strong>Flexbox</strong> (${c('display: flex')}) lines children up in a row or column and spaces them out. When rules conflict, the more <strong>specific</strong> selector wins (id beats class beats tag), and among equals, the later one.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A box has ${c('width: 100px; padding: 10px; border: 5px solid; margin: 20px')} with default sizing. How wide is it on screen, from border edge to border edge, in pixels?`, 130, [R`Margin is outside the border, so it does not count.`], R`$100 + 2\cdot10 + 2\cdot5 = 130$.`)] },
      { title: 'The DOM', html: R`
<p>The browser turns HTML into the <strong>Document Object Model</strong>: a tree of JavaScript objects you can read and change.</p>
${K('javascript', R`
const title = document.querySelector("h1");        // first match of a CSS selector
const items = document.querySelectorAll("li");     // all matches
title.textContent = "Changed!";                    // change the text
title.style.color = "crimson";                     // inline style
title.classList.add("big");                        // add a CSS class
const li = document.createElement("li");           // make a new element
li.textContent = "third";
document.querySelector("ul").appendChild(li);      // put it in the page`)}
<p>Any change shows up immediately. Prefer ${c('textContent')} for text: setting ${c('innerHTML')} from user input can let attackers inject their own HTML and scripts (cross-site scripting).</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which selector does ${c('document.querySelector(".item")')} use?`, ['the tag item', 'the id item', 'the class item', 'the attribute item'], 2, [R`A dot in CSS means…`], R`A class: elements with ${c('class="item"')}.`)] },
      { title: 'Events and state', html: R`
${K('javascript', R`
let count = 0;                                   // state: the data
const btn = document.querySelector("#plus");
const out = document.querySelector("#n");
function render() { out.textContent = count; }   // draw the page from the state
btn.addEventListener("click", () => {            // run this on every click
  count++;
  render();
});
document.querySelector("input").addEventListener("input", (e) => {
  console.log("you typed", e.target.value);       // e describes the event
});`)}
<p>${c('addEventListener(type, handler)')} registers a function for an event: ${c('"click"')}, ${c('"input"')}, ${c('"keydown"')}, ${c('"submit"')}… The handler receives an <strong>event object</strong>. For forms, call ${c('e.preventDefault()')} or the browser reloads the page. A clean pattern for interactive pages: keep the <strong>state</strong> in variables, and write one ${c('render')} function that updates the DOM from it. Frameworks like React are built on exactly that idea.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A form's submit handler adds an item, but the page reloads and the item vanishes. What is missing?`, [c('e.stopPropagation()'), c('e.preventDefault()'), c('return true'), c('location.reload()')], 1, [R`Submitting a form normally sends it and loads a new page.`], R`${c('e.preventDefault()')} stops the default reload.`)] }
    ],
    labs: [
      { sim: 'code', title: 'Web playground: a counter', desc: 'Edit the HTML, CSS and JavaScript and press Run to update the preview. Logs from <code>console.log</code> appear underneath.',
        tasks: ['Add a Reset button.', 'Make the number turn green when it is negative.', 'Stop the counter going below zero.'], params: { lang: 'web', langs: ['web'], code: COUNTER, key: 'web-counter' } },
      { sim: 'code', title: 'Web playground: a to-do list', desc: 'State, render and events together.', tasks: ['Add a button that removes finished items.', 'Save the list with <code>localStorage</code>? (It is blocked in this sandbox: think about why a preview should not store data.)', 'Show the number of finished items too.'], params: { lang: 'web', langs: ['web'], code: TODO, key: 'web-todo' } }
    ],
    formulas: [['Element', '<tag attr="value">content</tag>', 'web'], ['Selectors', 'p  .class  #id  nav a  a:hover  li:first-child', 'text'], ['Box model width', 'width + 2·padding + 2·border (default sizing)', 'text'], ['Flexbox', '.row { display: flex; gap: 8px; justify-content: space-between; align-items: center; }', 'text'],
      ['Find and change', 'const el = document.querySelector("#id");\nel.textContent = "hi";  el.classList.add("on");', 'javascript'], ['Create', 'const li = document.createElement("li");\nlist.appendChild(li);', 'javascript'], ['Events', 'el.addEventListener("click", (e) => { ... });\nform.addEventListener("submit", (e) => { e.preventDefault(); });', 'javascript']],
    problems: [
      P('concept', 'mcq', 'Three languages', R`Which language should decide that warnings are shown in red?`, 1, [R`Appearance.`], R`CSS.`, { options: ['HTML', 'CSS', 'JavaScript', 'HTTP'] }),
      P('concept', 'mcq', 'Head or body', R`Where does the ${c('<title>')} element go?`, 0, [R`It is information about the page, not content on it.`], R`In the ${c('<head>')}.`, { options: [c('<head>'), c('<body>'), c('<main>'), c('<footer>')] }),
      P('concept', 'mcq', 'Specificity', R`${c('p { color: blue }')} and ${c('#intro { color: red }')} both match ${c('<p id="intro">')}. What colour is it?`, 1, [R`An id is more specific than a tag.`], R`Red.`, { options: ['blue', 'red', 'purple', 'black'] }),
      P('concept', 'mcq', 'Alt text', R`What is an image's ${c('alt')} attribute for?`, 2, [R`Who cannot see the image?`], R`A text description for screen readers and when the image fails to load.`, { options: ['Its file name', 'A tooltip only', 'A description for people who cannot see it', 'Search ranking only'] }),
      P('core', 'num', 'Box model', R`${c('width: 300px; padding: 20px; border: 1px solid; margin: 10px')}, default sizing. How many pixels does the element occupy horizontally, <em>including</em> its margins?`, 362, [R`Content + padding + border + margin, both sides.`], R`$300 + 40 + 2 + 20 = 362$.`),
      P('core', 'num', 'border-box', R`The same box with ${c('box-sizing: border-box')}. How wide is it from border edge to border edge?`, 300, [R`width now includes padding and border.`], R`300 px (the content shrinks to 258).`),
      P('core', 'num', 'Counting matches', R`A page has 3 ${c('<li class="a">')}, 2 ${c('<li class="b">')} and 1 ${c('<p class="a">')}. How many elements does ${c('document.querySelectorAll("li.a, p")')} return?`, 4, [R`A comma means "or".`], R`3 + 1 = 4.`),
      P('core', 'num', 'Click handlers', R`${c('let n = 0;')} A button gets ${c('addEventListener("click", () => n++)')} twice (two handlers). After 3 clicks, what is ${c('n')}?`, 6, [R`Every registered handler runs on every click.`], R`2 handlers × 3 clicks = 6.`),
      P('olympiad', 'num', 'DOM tree depth', R`In ${c('<html><body><main><ul><li><a>x</a></li></ul></main></body></html>')}, counting ${c('html')} as depth 1, what is the depth of ${c('a')}?`, 6, [R`Count the nested elements.`], R`html 1, body 2, main 3, ul 4, li 5, a 6.`),
      P('olympiad', 'mcq', 'Cross-site scripting', R`A comment box shows comments with ${c('div.innerHTML = comment')}. Why is that dangerous?`, 1, [R`What if a comment contains HTML?`], R`A comment containing ${c('<img src=x onerror="...">')} would run the attacker's code in every visitor's browser. Use ${c('textContent')}.`, { options: ['It is slow', 'A comment can contain HTML and scripts that run for every reader', 'innerHTML cannot show emoji', 'It breaks CSS'] }),
      P('olympiad', 'mcq', 'Event bubbling', R`A ${c('<button>')} is inside a ${c('<div>')}; both have click handlers. You click the button. What happens?`, 2, [R`Events "bubble" up the tree.`], R`The button's handler runs first, then the div's, unless one calls ${c('e.stopPropagation()')}.`, { options: ['Only the button handler runs', 'Only the div handler runs', 'The button handler, then the div handler', 'The div handler, then the button handler'] })
    ]
  });
  PB.addDrills('js-dom', [
    { title: 'Box width', gen: (r) => { const w = r.int(10, 40) * 10, p = r.int(0, 30), b = r.int(0, 5), m = r.int(0, 30); return { q: R`<p>${c('width: ' + w + 'px; padding: ' + p + 'px; border: ' + b + 'px solid; margin: ' + m + 'px')}, default sizing. Border-edge to border-edge width in px?</p>`, answer: w + 2 * p + 2 * b, tol: 0.0001, solution: R`<p>${w} + 2·${p} + 2·${b} = ${w + 2 * p + 2 * b} (margin is outside).</p>` }; } },
    { title: 'Handlers', gen: (r) => { const hN = r.int(1, 4), k = r.int(2, 9); return { q: R`<p>A button has ${hN} click handler(s), each doing ${c('n++')}. Starting from 0, what is ${c('n')} after ${k} clicks?</p>`, answer: hN * k, tol: 0.0001, solution: R`<p>${hN} × ${k} = ${hN * k}.</p>` }; } }
  ]);

  /* ===================== 11. Asynchronous JavaScript and servers ===================== */
  PB.addChapter({
    id: 'js-async', subject: 'computing', num: 11, part: 'JavaScript and the Web',
    title: 'Asynchronous JavaScript, APIs and Servers',
    subtitle: R`Doing things that take time without freezing. The event loop, callbacks, promises, async/await, fetching JSON from APIs, and JavaScript on the server with Node.js.`,
    big: 'JavaScript runs on a single thread: one thing at a time. If it waited for every network request, the page would freeze. Instead it <em>starts</em> slow jobs, carries on, and handles the results later through the <strong>event loop</strong>. Promises and <code>async</code>/<code>await</code> make that style read almost like ordinary code.',
    goals: ['Explain the call stack, task queue and microtasks', 'Predict the order of output with timers and promises', 'Create and chain promises', 'Use async/await with try/catch', 'Fetch JSON from an API', 'Describe what a back-end server does'],
    sections: [
      { title: 'One thread and the event loop', html: R`
${K('javascript', R`
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// prints A, C, B`, true)}
<p>${c('setTimeout')} does not wait. It asks the browser to run the function later and returns at once. When the timer is due, the callback joins the <strong>task queue</strong>; the <strong>event loop</strong> only moves it onto the <strong>call stack</strong> when the current code has completely finished. So even a 0 ms timer runs after the rest of the script.</p>
<p>The flip side: a long loop blocks everything. While it runs, clicks are not handled and the page cannot repaint. Heavy work belongs in a Web Worker (this site runs your code in one, which is why an infinite loop does not freeze the page).</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is printed? ${c('setTimeout(() => console.log(1), 0); for (let i = 0; i < 1e8; i++) {} console.log(2);')}`, ['1 then 2', '2 then 1', 'only 2', 'it depends on the computer speed'], 1, [R`The loop is synchronous; the timer must wait for it.`], R`2 then 1, however long the loop takes.`)] },
      { title: 'Callbacks and promises', html: R`
<p>A <strong>promise</strong> is an object standing for a value that will arrive later. It is <em>pending</em>, then either <em>fulfilled</em> with a value or <em>rejected</em> with an error. ${c('.then')} registers what to do with the value; ${c('.catch')} handles errors; chains run in order.</p>
${K('javascript', R`
const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

wait(300, 5)
  .then((x) => x * 2)              // 10
  .then((x) => { console.log("got", x); })
  .catch((err) => console.log("failed:", err));

Promise.all([wait(200, "a"), wait(100, "b")])      // run both at once
  .then((vals) => console.log(vals));              // ["a", "b"] after 200 ms

Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("task"), 0);
console.log("sync");                               // sync, microtask, task, ...`, true)}
<p>Promise callbacks go into the <strong>microtask queue</strong>, which is emptied completely before the next task (timer, click). Callbacks nested inside callbacks, "callback hell", were how this used to be written; promises flatten it.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is the order? ${c('setTimeout(() => log("T"), 0); Promise.resolve().then(() => log("P")); log("S");')}`, ['T P S', 'S T P', 'S P T', 'P S T'], 2, [R`Sync first, then microtasks, then tasks.`], R`S, then the promise callback P, then the timer T.`)] },
      { title: 'async/await and fetch', html: R`
${K('javascript', R`
async function showUser(id) {
  try {
    const res = await fetch(¨https://jsonplaceholder.typicode.com/users/@{id}¨);
    if (!res.ok) throw new Error("HTTP " + res.status);   // 404s do not throw by themselves
    const user = await res.json();                        // parse the JSON body
    console.log(user.name, "lives in", user.address.city);
  } catch (err) {
    console.log("Could not load:", err.message);         // network down, bad JSON, ...
  }
}
await showUser(1);
await showUser(99999);`, true)}
<p>An ${c('async')} function always returns a promise. Inside it, ${c('await')} pauses <em>that function</em> until a promise settles, while the rest of the page keeps running. Errors become ordinary exceptions you can ${c('try')}/${c('catch')}. ${c('fetch')} sends an HTTP request (the same requests as in the web chapter) and resolves to a response; an <strong>API</strong> is just a server that answers with JSON for programs instead of HTML for people. Browsers only let a page read responses from other sites that allow it (<strong>CORS</strong>).</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`${c('const r = await fetch("/nope")')} gets a 404. What happens?`, ['fetch throws an error', 'r.ok is false and r.status is 404', 'r is null', 'the page reloads'], 1, [R`fetch only rejects when no response arrives at all.`], R`It resolves normally with ${c('r.ok === false')}: check it yourself.`)] },
      { title: 'JavaScript on the server', html: R`
<p><strong>Node.js</strong> runs JavaScript outside the browser, so the same language can write the <strong>back end</strong>: the server code that checks passwords, talks to the <strong>database</strong>, and answers API requests. A complete web server in a few lines:</p>
${K('javascript', R`
// server.js — run with: node server.js, then open http://localhost:3000
const http = require("http");
const users = [{ id: 1, name: "Ada" }];

http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(3000);`)}
<p>Every request runs the callback; the server matches the method and path (<strong>routing</strong>) and writes a status, headers and body. Real projects use packages from <strong>npm</strong> (such as Express) for routing, and keep data in a database. The <strong>front end</strong> (HTML, CSS and JS in the browser) and the back end talk through HTTP and JSON: that is the whole "full stack". (Servers cannot run in this browser sandbox; install Node.js to try it.)</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which part of a web app should check that a password is correct?`, ['The front end, in JavaScript', 'The back end, on the server', 'The CSS', 'Either, it does not matter'], 1, [R`Anyone can read and change the JavaScript running in their own browser.`], R`The server: never trust checks made only in the browser.`)] }
    ],
    labs: [
      { sim: 'eventloop', title: 'Inside the event loop', desc: 'Step through three short programs and watch the call stack, the browser’s Web APIs and the two queues.', tasks: ['Predict the output of each program before stepping.', 'Why does the promise run before the 0 ms timer?', 'In the async program, what is the page doing while it waits for the network?'] },
      { sim: 'code', title: 'Promise playground', desc: 'Timers and promises run for real in a worker. Predict the order, then run it. (The fetch line needs internet.)', params: { lang: 'javascript', langs: ['javascript'], code: 'const wait = (ms, v) => new Promise((res) => setTimeout(() => res(v), ms));\n\nconsole.log("1 sync");\nsetTimeout(() => console.log("4 timer"), 0);\nPromise.resolve().then(() => console.log("3 microtask"));\nconsole.log("2 sync");\n\nconst t0 = Date.now();\nconst [a, b] = await Promise.all([wait(300, "slow"), wait(100, "fast")]);\nconsole.log(a, b, "after about", Date.now() - t0, "ms");\n\ntry {\n  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");\n  console.log(await res.json());\n} catch (e) {\n  console.log("fetch failed:", e.message);\n}\n' } },
      { sim: 'code', title: 'Challenge: timer order', desc: '', params: { challenge: 'js-timers' } }
    ],
    formulas: [['Order of execution', 'synchronous code → all microtasks (promises) → one task (timer, event) → repeat', 'text'], ['Promise', 'new Promise((resolve, reject) => { ... })\np.then(v => ...).catch(e => ...)\nPromise.all([p1, p2])', 'javascript'],
      ['async / await', 'async function f() {\n  try { const v = await p; } catch (e) { ... }\n}', 'javascript'], ['fetch JSON', 'const res = await fetch(url);\nif (!res.ok) throw new Error(res.status);\nconst data = await res.json();', 'javascript'], ['Node server', 'require("http").createServer((req, res) => {\n  res.writeHead(200, {"Content-Type": "text/plain"});\n  res.end("hi");\n}).listen(3000);', 'javascript']],
    problems: [
      P('concept', 'mcq', 'Single thread', R`Why does a long ${c('for')} loop in a page's JavaScript freeze the page?`, 0, [R`How many things can the main thread do at once?`], R`The page's JavaScript runs on one thread, and clicks and repainting wait until the loop ends.`, { options: ['JavaScript runs one thing at a time on the main thread', 'Loops are slow in JavaScript', 'The browser limits loops', 'The CPU overheats'] }),
      P('concept', 'mcq', 'await', R`Where can you use ${c('await')}?`, 1, [R`(Also at the top level of modules and in this site's playground.)`], R`Inside ${c('async')} functions.`, { options: ['Anywhere', 'Inside async functions', 'Only inside loops', 'Only in Node.js'] }),
      P('concept', 'mcq', 'Promise states', R`Which is <em>not</em> a state of a promise?`, 3, [R`Pending, then settled one of two ways.`], R`Pending, fulfilled and rejected are the three states.`, { options: ['pending', 'fulfilled', 'rejected', 'paused'] }),
      P('concept', 'mcq', 'API', R`A web API usually answers with…`, 2, [R`It is meant for programs.`], R`JSON data.`, { options: ['HTML pages', 'images', 'JSON data', 'CSS'] }),
      P('core', 'mcq', 'Order', R`What does this print? ${c('console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); console.log(4);')}`, 3, [R`Sync, microtasks, tasks.`], R`1, 4, 3, 2.`, { options: ['1 2 3 4', '1 3 2 4', '1 4 2 3', '1 4 3 2'] }),
      P('core', 'num', 'Parallel waiting', R`${c('await Promise.all([wait(300), wait(500), wait(200)])')}. About how many milliseconds does this take?`, 500, [R`They all wait at the same time.`], R`The slowest one: 500 ms.`, { tol: 0.01 }),
      P('core', 'num', 'Sequential waiting', R`${c('await wait(300); await wait(500); await wait(200);')} About how many milliseconds?`, 1000, [R`Each await waits for the previous one.`], R`300 + 500 + 200 = 1000 ms. Use Promise.all when the steps are independent.`, { tol: 0.01 }),
      P('core', 'num', 'Chaining', R`${c('Promise.resolve(2).then(x => x + 3).then(x => x * 4).then(x => console.log(x))')}. What is printed?`, 20, [R`Each then passes its return value on.`], R`(2 + 3) × 4 = 20.`),
      P('core', 'mcq', 'fetch and 404', R`Why check ${c('res.ok')} after ${c('await fetch(url)')}?`, 1, [R`What counts as a failure for fetch?`], R`fetch resolves even for 404 or 500; only network failures reject.`, { options: ['fetch never resolves without it', 'Error statuses like 404 do not make fetch throw', 'It parses the JSON', 'It is required by CORS'] }),
      P('olympiad', 'mcq', 'Microtasks first', R`What is printed? ${c('setTimeout(() => console.log("a"));')} ${c('Promise.resolve().then(() => { console.log("b"); Promise.resolve().then(() => console.log("c")); });')} ${c('console.log("d");')}`, 0, [R`Microtasks queued by a microtask still run before the next task.`], R`d, b, c, a.`, { options: ['d b c a', 'd b a c', 'b c d a', 'd a b c'] }),
      P('olympiad', 'num', 'Blocking a timer', R`${c('const t0 = Date.now(); setTimeout(() => console.log(Date.now() - t0), 100);')} followed by a synchronous loop that runs for 400 ms. Roughly what number is printed?`, 400, [R`A timer is a minimum delay, not a promise of punctuality.`], R`About 400: the callback cannot run until the loop has finished.`, { tol: 0.05 })
    ]
  });
  PB.addDrills('js-async', [
    { title: 'Parallel or sequential', gen: (r) => { const t = [r.int(1, 9) * 100, r.int(1, 9) * 100, r.int(1, 9) * 100], par = r.pick([0, 1]); return { q: R`<p>${par ? c('await Promise.all([wait(' + t.join('), wait(') + ')])') : c('await wait(' + t.join('); await wait(') + ');')} takes about how many ms?</p>`, answer: par ? Math.max(...t) : t[0] + t[1] + t[2], tol: 0.01, solution: R`<p>${par ? 'In parallel: the longest' : 'One after another: the sum'}.</p>` }; } },
    { title: 'Then chains', gen: (r) => { const a = r.int(1, 9), b = r.int(1, 9), d = r.int(2, 5); return { q: R`<p>${c('Promise.resolve(' + a + ').then(x => x + ' + b + ').then(x => x * ' + d + ')')} resolves to?</p>`, answer: (a + b) * d, tol: 0.0001, solution: R`<p>(${a} + ${b}) × ${d} = ${(a + b) * d}.</p>` }; } }
  ]);
  const timRef = (s) => { const L = lines(s).slice(1).filter((x) => x.trim()).map((l, i) => { const p = l.trim().split(/\s+/); return [p[0], +p[1], i]; }); L.sort((a, b) => a[1] - b[1] || a[2] - b[2]); return L.map((x) => x[0]).join('\n') + '\n'; };
  PB.addChallenge({ id: 'js-timers', chapter: 'js-async', title: 'Timer order', level: 'easy',
    statement: R`<p>A program calls ${c('setTimeout(() => console.log(name), delay)')} for $n$ timers, in the order given. In what order are the names printed? Timers with a smaller delay fire first; timers with equal delays fire in the order they were set.</p>`,
    input: R`<p>The first line holds $n$ ($1 \le n \le 10^5$). Then $n$ lines: a name and a delay in ms ($0 \le$ delay $\le 10^6$).</p>`, output: R`<p>The names in firing order.</p>`,
    samples: [T(timRef)('4\nA 100\nB 0\nC 100\nD 50\n')], tests: [T(timRef)('1\nx 5\n'), T(timRef)('3\na 0\nb 0\nc 0\n'), G(timRef, (r) => { let s = '4000\n'; for (let i = 0; i < 4000; i++) s += 't' + i + ' ' + r.int(0, 1000) + '\n'; return s; })],
    hints: [R`This is a <em>stable</em> sort by delay. JavaScript's ${c('sort')} and Python's ${c('sorted')} are stable, so equal delays keep their order.`, R`Fun alternative in JavaScript: actually call ${c('setTimeout')}! (Slow for big inputs, though.)`],
    solution: { javascript: 'const n = Number(readline());\nconst ts = [];\nfor (let i = 0; i < n; i++) {\n  const [name, d] = readline().split(" ");\n  ts.push({ name, d: Number(d) });\n}\nts.sort((a, b) => a.d - b.d);\nconsole.log(ts.map((t) => t.name).join("\\n"));\n', python: 'import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nts = [(int(data[2 + 2 * i]), i, data[1 + 2 * i]) for i in range(n)]\nts.sort()\nprint("\\n".join(t[2] for t in ts))\n' } });
})();
