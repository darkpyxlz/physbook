/* Computing 5–8: Python. Values and variables, decisions and loops, functions and data structures,
   and files, errors and objects. Every chapter has runnable examples and judged challenges. */
(function () {
  const { R, K, c, QN, QM, P, T, G } = PB.csKit();
  const lines = (s) => s.replace(/\r/g, '').split('\n');
  const nums = (s) => s.trim().split(/\s+/).map(Number);

  /* ===================== 5. Python basics ===================== */
  PB.addChapter({
    id: 'py-basics', subject: 'computing', num: 5, part: 'Python',
    title: 'Python Basics: Values, Variables and Types',
    subtitle: R`Your first programs. Printing, numbers and arithmetic, types, variables, strings and f-strings, and reading input.`,
    big: 'A program is a list of instructions the computer follows exactly, top to bottom. Python works with <strong>values</strong> (numbers, text, true/false), gives them <strong>names</strong> (variables), and combines them with operators. Mistakes are normal: an error message is the computer telling you precisely where it got confused.',
    goals: ['Write and run a program that prints', 'Use the arithmetic operators, including // and %', 'Tell int, float, str and bool apart and convert between them', 'Assign and update variables', 'Build strings with f-strings, indexing and slicing', 'Read input and convert it to numbers'],
    sections: [
      { title: 'Your first program', html: R`
<p>Python reads a file from top to bottom and runs each line. ${c('print')} shows a value; anything after ${c('#')} is a <strong>comment</strong> for humans and is ignored.</p>
${K('python', R`
# My first program
print("Hello, world!")
print(2 + 3)
print("2 + 3 =", 2 + 3)     # print can show several values, separated by spaces`, true)}
<p>Press <b>▶ Try it</b> on any example to open it in the Code lab, change it, and run it again. Breaking things on purpose is a great way to learn. Leave off a quote and Python reports a ${c('SyntaxError')} with the line number; misspell ${c('print')} as ${c('pritn')} and you get a ${c('NameError')}. Read the <em>last</em> line of an error first: it says what went wrong.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What does ${c('print("3 + 4")')} show?`, [c('7'), c('3 + 4'), c('"3 + 4"'), 'an error'], 1, [R`The quotes make it text.`], R`Text in quotes is printed exactly as written: ${c('3 + 4')}.`)] },
      { title: 'Numbers, operators and types', html: R`
<p>Every value has a <strong>type</strong>. Whole numbers are ${c('int')}, numbers with a point are ${c('float')}, text is ${c('str')}, and ${c('True')}/${c('False')} are ${c('bool')}. ${c('type(x)')} tells you which.</p>
${K('python', R`
print(7 + 2, 7 - 2, 7 * 2)   # 9 5 14
print(7 / 2)                 # 3.5   division always gives a float
print(7 // 2)                # 3     floor division: round down
print(7 % 2)                 # 1     remainder ("modulo")
print(2 ** 10)               # 1024  power
print(type(7), type(3.5), type("hi"), type(True))`, true)}
<p>${c('//')} and ${c('%')} go together: ${c('a == (a // b) * b + a % b')}. The remainder is everywhere in programming: ${c('n % 2 == 0')} tests for even numbers, ${c('n % 10')} is the last digit, and ${c('n // 10')} chops it off. Note that ${c('//')} rounds <em>down</em>, so ${c('-7 // 2')} is ${c('-4')}. The usual order of operations applies: ${c('**')} first, then ${c('* / // %')}, then ${c('+ -')}; use brackets when in doubt.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('47 // 5 + 47 % 5')}?`, 11, [R`47 = 9 × 5 + 2.`], R`$9 + 2 = 11$.`)] },
      { title: 'Variables', html: R`
<p>A <strong>variable</strong> is a name that refers to a value. ${c('=')} means "make this name refer to this value", not "is equal to".</p>
${K('python', R`
score = 10
score = score + 5      # take the old value, add 5, store it back
score += 5             # the same thing, shorter
name = "Ada"
print(name, "has", score, "points")   # Ada has 20 points`, true)}
<p>The right side is worked out first, then the name is attached to the result. That is why ${c('x = x + 1')} makes sense in Python even though it is false in algebra. Names may use letters, digits and underscores but not start with a digit; Python is case sensitive (${c('Score')} and ${c('score')} differ). Choose names that say what a value <em>means</em>: ${c('total_price')} beats ${c('tp')}.</p>
<p>A neat trick: ${c('a, b = b, a')} swaps two values in one line.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`After ${c('x = 3')}, ${c('y = x')}, ${c('x = x * 4')}, what is ${c('y')}?`, 3, [R`${c('y = x')} copied the value 3 at that moment.`], R`${c('y')} still refers to 3; only ${c('x')} changed to 12.`)] },
      { title: 'Strings and input', html: R`
<p>A <strong>string</strong> is a sequence of characters. ${c('+')} joins strings, ${c('*')} repeats them, and ${c('len')} counts characters. Each character has a position (<strong>index</strong>) starting at 0; negative indexes count from the end. A <strong>slice</strong> ${c('s[a:b]')} takes positions ${c('a')} up to but not including ${c('b')}.</p>
${K('python', R`
s = "python"
print(s[0], s[-1])      # p n
print(s[1:4])           # yth
print(s.upper(), len(s))
print("ha" * 3)         # hahaha
age = 15
print(f"{s} is fun at {age}, and {age * 12} months")   # f-string`, true)}
<p><strong>f-strings</strong> (with ${c('f')} before the quote) put the value of any expression inside ${c('{ }')} into the text. ${c('input()')} reads one line of text that the user types, always as a string, so convert it before doing maths:</p>
${K('python', R`
a = int(input())          # "12"  -> 12
b = int(input())
print(a + b)              # without int(), "12" + "30" would give "1230"
x, y = map(int, input().split())   # two numbers on one line: "3 4"`)}
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is ${c('"chocolate"[3:6]')}?`, [c('"coc"'), c('"col"'), c('"ola"'), c('"oco"')], 1, [R`Number the letters from 0: c(0) h(1) o(2) c(3) o(4) l(5).`], R`Indices 3, 4 and 5 are c, o, l: ${c('"col"')}. Index 6 is not included.`)] }
    ],
    labs: [
      { sim: 'code', title: 'Python playground', desc: 'A scratchpad. Run it, then change it: make it greet you by name, or work out your age in days.', params: { lang: 'python', langs: ['python'], code: 'name = "Ada"\nage = 15\nprint(f"Hi {name}!")\nprint("In days you are about", age * 365)\nprint(17 // 5, 17 % 5, 2 ** 100)\n' } },
      { sim: 'code', title: 'Challenge: hello, you', desc: '', params: { challenge: 'py-hello' } },
      { sim: 'code', title: 'Challenge: seconds to a clock', desc: '', params: { challenge: 'py-clock' } }
    ],
    formulas: [['Print and comment', 'print("x =", x)   # a comment', 'python'], ['Arithmetic', '+  -  *  /  //  %  **', 'python'], ['Floor division and remainder', 'a == (a // b) * b + a % b', 'python'],
      ['Types', 'int(x)  float(x)  str(x)  bool(x)  type(x)', 'python'], ['Strings', 's[0]  s[-1]  s[a:b]  len(s)  s.upper()  s.split()', 'python'], ['f-strings', 'f"{name} scored {pts:.1f}"', 'python'], ['Input', 'n = int(input())\na, b = map(int, input().split())', 'python']],
    problems: [
      P('concept', 'num', 'Floor division', R`What is ${c('17 // 5')}?`, 3, [R`How many whole 5s fit in 17?`], R`3 (with 2 left over).`),
      P('concept', 'num', 'Remainder', R`What is ${c('17 % 5')}?`, 2, [R`$17 = 3\cdot5 + 2$.`], R`2.`),
      P('concept', 'mcq', 'Adding strings', R`What does ${c('print("3" + "4")')} show?`, 1, [R`Both are strings.`], R`${c('+')} joins strings: ${c('34')}.`, { options: [c('7'), c('34'), c('"3" + "4"'), 'an error'] }),
      P('concept', 'mcq', 'Division type', R`What is the type of ${c('8 / 2')}?`, 1, [R`${c('/')} always gives the same type.`], R`${c('float')}: it is ${c('4.0')}.`, { options: [c('int'), c('float'), c('str'), c('bool')] }),
      P('core', 'num', 'Power', R`What is ${c('2 ** 10')}?`, 1024, [R`Ten 2s multiplied.`], R`1024.`),
      P('core', 'num', 'Rounding down', R`What is ${c('-7 // 2')}?`, -4, [R`Floor division rounds towards minus infinity.`], R`$-3.5$ rounded <em>down</em> is $-4$.`),
      P('core', 'num', 'Converting input', R`The user types ${c('12')}. What does ${c('print(int(input()) * 2 + 1)')} show?`, 25, [R`${c('int')} turns "12" into 12.`], R`$12\cdot2 + 1 = 25$.`),
      P('core', 'num', 'Updating', R`What is ${c('x')} after ${c('x = 5')}, ${c('x += 3')}, ${c('x *= 2')}, ${c('x -= 1')}?`, 15, [R`5 → 8 → 16 → …`], R`15.`),
      P('core', 'mcq', 'Slicing', R`What is ${c('"programming"[-4:]')}?`, 2, [R`The last four characters.`], R`${c('"ming"')}.`, { options: [c('"prog"'), c('"ram"'), c('"ming"'), c('"gnim"')] }),
      P('olympiad', 'num', 'Digits', R`What does ${c('n = 4096; print(n // 10 % 10 + n % 10)')} print?`, 15, [R`${c('n // 10 % 10')} is the tens digit.`], R`Tens digit 9, units 6: 15.`),
      P('olympiad', 'num', 'Precedence', R`What is ${c('2 + 3 * 4 ** 2 // 5')}?`, 11, [R`${c('**')} first, then ${c('*')} and ${c('//')} left to right.`], R`$4^2 = 16$, $3\cdot16 = 48$, $48 // 5 = 9$, $2 + 9 = 11$.`),
      P('olympiad', 'num', 'Swapping', R`After ${c('a, b = 3, 8')} then ${c('a, b = b, a + b')}, what is ${c('a * b')}?`, 88, [R`The right side is worked out completely, using the old values, before assigning.`], R`New ${c('a')} = 8, new ${c('b')} = 3 + 8 = 11. Product 88.`)
    ]
  });
  PB.addDrills('py-basics', [
    { title: 'Floor division and remainder', gen: (r) => { const a = r.int(20, 300), b = r.int(3, 17), k = r.pick(['//', '%']); return { q: R`<p>What is ${c(a + ' ' + k + ' ' + b)}?</p>`, answer: k === '//' ? Math.floor(a / b) : a % b, tol: 0.0001, solution: R`<p>${a} = ${Math.floor(a / b)} × ${b} + ${a % b}.</p>` }; } },
    { title: 'String length and slices', gen: (r) => { const w = r.pick(['algorithm', 'variable', 'function', 'computer', 'olympiad', 'python', 'keyboard']); const a = r.int(0, 3), b = r.int(a + 1, w.length); return { q: R`<p>What is ${c('len("' + w + '"[' + a + ':' + b + '])')}?</p>`, answer: b - a, tol: 0.0001, solution: R`<p>The slice is ${c('"' + w.slice(a, b) + '"')}: ${b - a} characters.</p>` }; } },
    { title: 'Evaluate', gen: (r) => { const a = r.int(2, 9), b = r.int(2, 4), d = r.int(2, 6), e = r.int(1, 9); return { q: R`<p>What is ${c(e + ' + ' + a + ' ** ' + b + ' // ' + d)}?</p>`, answer: e + Math.floor(Math.pow(a, b) / d), tol: 0.0001, solution: R`<p>${a}**${b} = ${Math.pow(a, b)}, // ${d} = ${Math.floor(Math.pow(a, b) / d)}, + ${e}.</p>` }; } }
  ]);
  const helloRef = (s) => 'Hello, ' + lines(s)[0].trim() + '!\n';
  PB.addChallenge({ id: 'py-hello', chapter: 'py-basics', title: 'Hello, you', level: 'easy', xp: 5,
    statement: R`<p>Read a name and greet it: for ${c('Ada')} print ${c('Hello, Ada!')}</p>`, input: R`<p>One line with a name (letters only).</p>`, output: R`<p>One line: ${c('Hello, <name>!')}</p>`,
    samples: [T(helloRef)('Ada\n')], tests: ['Grace\n', 'Linus\n', 'X\n'].map(T(helloRef)),
    hints: [R`${c('name = input()')} then an f-string: ${c('f"Hello, {name}!"')}.`],
    starter: { python: 'name = input()\n# print the greeting\n' }, solution: { python: 'name = input()\nprint(f"Hello, {name}!")\n' } });
  const clockRef = (s) => { const t = +s.trim(); const p = (x) => String(x).padStart(2, '0'); return p(Math.floor(t / 3600)) + ':' + p(Math.floor(t % 3600 / 60)) + ':' + p(t % 60) + '\n'; };
  PB.addChallenge({ id: 'py-clock', chapter: 'py-basics', title: 'Seconds to a clock', level: 'easy',
    statement: R`<p>A number of seconds $t$ ($0 \le t < 360000$) has passed since midnight. Print it as ${c('HH:MM:SS')}, with two digits in each part.</p>`, input: R`<p>One integer $t$.</p>`, output: R`<p>The time as ${c('HH:MM:SS')}.</p>`,
    samples: [T(clockRef)('3725\n')], tests: ['0\n', '59\n', '3600\n', '86399\n', '359999\n'].map(T(clockRef)),
    hints: [R`Hours: ${c('t // 3600')}. Minutes: ${c('t % 3600 // 60')}. Seconds: ${c('t % 60')}.`, R`${c('f"{h:02d}"')} pads a number to two digits with a leading zero.`],
    solution: { python: 't = int(input())\nh, m, s = t // 3600, t % 3600 // 60, t % 60\nprint(f"{h:02d}:{m:02d}:{s:02d}")\n' } });

  /* ===================== 6. Decisions and loops ===================== */
  PB.addChapter({
    id: 'py-control', subject: 'computing', num: 6, part: 'Python',
    title: 'Decisions and Loops',
    subtitle: R`Making programs choose and repeat. Comparisons and Boolean logic, if/elif/else, while loops, for loops over ranges and strings, break and continue, and the classic loop patterns.`,
    big: 'Two ideas turn a list of instructions into a real program: <strong>choosing</strong> (if this, do that) and <strong>repeating</strong> (do this a million times, without writing it a million times). With just these, a computer can search, count, simulate and solve.',
    goals: ['Write conditions with comparisons, and, or and not', 'Branch with if/elif/else', 'Repeat with while and for', 'Use range with start, stop and step', 'Apply the counter, accumulator and maximum patterns', 'Trace a loop by hand'],
    sections: [
      { title: 'Conditions and if', html: R`
<p>Comparisons give a ${c('bool')}: ${c('==')} equal, ${c('!=')} not equal, ${c('<  <=  >  >=')}. Combine them with ${c('and')}, ${c('or')}, ${c('not')}. Note ${c('=')} assigns but ${c('==')} compares.</p>
${K('python', R`
age = 15
if age >= 18:
    print("adult")
elif age >= 13:
    print("teenager")      # only the first true branch runs
else:
    print("child")
print("done")               # not indented: always runs`, true)}
<p><strong>Indentation matters</strong>: the indented lines belong to the ${c('if')}. Python checks the conditions from the top and runs only the first branch that is true. Python even allows chains like ${c('0 <= x < 10')}.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`With ${c('x = 7')}, which branch runs? ${c('if x > 10: A')} / ${c('elif x > 5: B')} / ${c('elif x > 0: C')} / ${c('else: D')}`, ['A', 'B', 'C', 'B and C'], 1, [R`Only the first true condition counts.`], R`${c('x > 5')} is the first true one: B. C is never checked.`)] },
      { title: 'while loops', html: R`
<p>A ${c('while')} loop repeats its body as long as its condition is true. Something inside must eventually make it false, or the loop runs forever (the Code lab stops it after a few seconds).</p>
${K('python', R`
n = 27
steps = 0
while n != 1:            # the Collatz game
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
print(steps)             # 111`, true)}
<p>Use ${c('while')} when you do not know in advance how many times to repeat: until the user types "quit", until a number reaches 1, until the answer is close enough.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many times does the body run? ${c('n = 100')} / ${c('while n > 1: n = n // 3')}`, 4, [R`100 → 33 → 11 → 3 → 1.`], R`Four times.`)] },
      { title: 'for loops and range', html: R`
<p>A ${c('for')} loop walks through a sequence. ${c('range(stop)')} gives 0, 1, …, stop − 1; ${c('range(start, stop)')} and ${c('range(start, stop, step)')} change the start and step. The stop value is never included.</p>
${K('python', R`
for i in range(5):
    print(i, end=" ")        # 0 1 2 3 4
print()
for i in range(10, 0, -3):
    print(i, end=" ")        # 10 7 4 1
print()
for ch in "hey":
    print(ch.upper())         # H  E  Y`, true)}
<p>${c('break')} leaves a loop at once; ${c('continue')} skips to the next turn. Loops can be <strong>nested</strong>: the inner loop runs completely for each turn of the outer one, so two loops of 100 run the inner body 10 000 times.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many numbers does ${c('range(3, 20, 4)')} produce?`, 5, [R`3, 7, 11, …`], R`3, 7, 11, 15, 19: five.`)] },
      { title: 'Loop patterns', html: R`
<p>Most loops follow a few patterns. Learn them and you can write most simple programs:</p>
${K('python', R`
nums = [4, 9, 2, 7, 9, 1]
total = 0                  # accumulator: start at 0, add each item
count = 0                  # counter: start at 0, add 1 when it fits
best = nums[0]             # running maximum: start with the first item
for x in nums:
    total += x
    if x % 2 == 1:
        count += 1
    if x > best:
        best = x
print(total, count, best)  # 32 4 9`, true)}
<p>When a loop misbehaves, <strong>trace</strong> it: write a table with one column per variable and one row per turn, and fill it in by hand. It is the single most useful debugging skill, and olympiad questions often ask for exactly this.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is printed? ${c('s = 0')} / ${c('for i in range(1, 6): s += i * i')} / ${c('print(s)')}`, 55, [R`1 + 4 + 9 + 16 + 25.`], R`55.`)] }
    ],
    labs: [
      { sim: 'code', title: 'Loop playground', desc: 'Change the numbers and predict the output before you run.', params: { lang: 'python', langs: ['python', 'javascript', 'cpp'], code: { python: 'for i in range(1, 6):\n    print("*" * i)\n\nn = 27\nsteps = 0\nwhile n != 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    steps += 1\nprint("Collatz steps:", steps)\n', javascript: 'for (let i = 1; i <= 5; i++) console.log("*".repeat(i));\n\nlet n = 27, steps = 0;\nwhile (n !== 1) { n = n % 2 === 0 ? n / 2 : 3 * n + 1; steps++; }\nconsole.log("Collatz steps:", steps);\n', cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) cout << string(i, \'*\') << "\\n";\n    long long n = 27; int steps = 0;\n    while (n != 1) { n = n % 2 == 0 ? n / 2 : 3 * n + 1; steps++; }\n    cout << "Collatz steps: " << steps << "\\n";\n}\n' } } },
      { sim: 'code', title: 'Challenge: FizzBuzz', desc: 'A classic interview question.', params: { challenge: 'py-fizzbuzz' } },
      { sim: 'code', title: 'Challenge: digit sum', desc: '', params: { challenge: 'py-digits' } }
    ],
    formulas: [['Branching', 'if x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ...', 'python'], ['Logic', '==  !=  <  <=  >  >=   and  or  not', 'python'], ['while', 'while condition:\n    body', 'python'], ['for and range', 'for i in range(start, stop, step):\n    body       # stop is excluded', 'python'], ['Leave or skip', 'break     continue', 'python'], ['Patterns', 'total += x      count += 1\nbest = max(best, x)', 'python']],
    problems: [
      P('concept', 'mcq', 'Compare or assign', R`Which line tests whether ${c('x')} equals 5?`, 1, [R`One symbol assigns, two compare.`], R`${c('x == 5')}.`, { options: [c('x = 5'), c('x == 5'), c('x === 5'), c('x := 5')] }),
      P('concept', 'num', 'range', R`How many times does ${c('for i in range(10):')} repeat?`, 10, [R`0 to 9.`], R`10.`),
      P('concept', 'mcq', 'and / or', R`What is ${c('not (3 > 2 and 2 > 5)')}?`, 0, [R`Work out the inside first.`], R`${c('3 > 2 and 2 > 5')} is False, so the result is ${c('True')}.`, { options: [c('True'), c('False'), 'an error', c('None')] }),
      P('concept', 'mcq', 'Indentation', R`In Python, how do you show which lines belong inside an ${c('if')}?`, 2, [R`No braces in Python.`], R`By indenting them (usually 4 spaces).`, { options: ['Curly braces', 'The word end', 'Indentation', 'Semicolons'] }),
      P('core', 'num', 'Sum of a range', R`What does ${c('print(sum(range(1, 101)))')} print?`, 5050, [R`Gauss: $n(n+1)/2$.`], R`5050.`),
      P('core', 'num', 'Stepping down', R`What is the last number printed by ${c('for i in range(20, 0, -6): print(i)')}?`, 2, [R`20, 14, 8, …`], R`20, 14, 8, 2.`),
      P('core', 'num', 'Nested loops', R`How many stars? ${c('for i in range(4):')} / ${c('    for j in range(i):')} / ${c('        print("*")')}`, 6, [R`The inner loop runs 0, 1, 2, 3 times.`], R`$0 + 1 + 2 + 3 = 6$.`),
      P('core', 'num', 'while with break', R`What is printed? ${c('n = 0')} / ${c('while True:')} / ${c('    n += 7')} / ${c('    if n % 5 == 0: break')} / ${c('print(n)')}`, 35, [R`The first multiple of 7 that is also a multiple of 5.`], R`35.`),
      P('core', 'num', 'Counting', R`How many numbers from 1 to 100 are divisible by 3 or by 5?`, 47, [R`Inclusion–exclusion: 33 + 20 − 6.`], R`$33 + 20 - 6 = 47$. A loop with ${c('if i % 3 == 0 or i % 5 == 0')} confirms it.`),
      P('olympiad', 'num', 'Trace it', R`What is printed? ${c('a, b = 0, 1')} / ${c('for _ in range(10): a, b = b, a + b')} / ${c('print(a)')}`, 55, [R`These are Fibonacci numbers.`], R`After $k$ turns ${c('a')} is $F_k$; $F_{10} = 55$.`),
      P('olympiad', 'num', 'Loop count', R`How many times does the body run? ${c('i = 1')} / ${c('while i < 1000: i *= 2')}`, 10, [R`Powers of 2 below 1000.`], R`1 → 2 → … → 1024: ten doublings.`),
      P('olympiad', 'num', 'Continue', R`What is printed? ${c('t = 0')} / ${c('for i in range(1, 21):')} / ${c('    if i % 4 == 0: continue')} / ${c('    t += i')} / ${c('print(t)')}`, 150, [R`Sum 1..20 minus the multiples of 4.`], R`$210 - (4 + 8 + 12 + 16 + 20) = 210 - 60 = 150$.`)
    ]
  });
  PB.addDrills('py-control', [
    { title: 'Count a range', gen: (r) => { const a = r.int(0, 10), b = r.int(a + 5, 60), s = r.int(2, 7); return { q: R`<p>How many numbers does ${c('range(' + a + ', ' + b + ', ' + s + ')')} produce?</p>`, answer: Math.ceil((b - a) / s), tol: 0.0001, solution: R`<p>⌈(${b} − ${a}) / ${s}⌉ = ${Math.ceil((b - a) / s)}.</p>` }; } },
    { title: 'Accumulate', gen: (r) => { const a = r.int(1, 5), b = r.int(a + 3, 15), sq = r.pick([0, 1]); let t = 0; for (let i = a; i < b; i++) t += sq ? i * i : i; return { q: R`<p>What is printed? ${c('s = 0')} / ${c('for i in range(' + a + ', ' + b + '): s += ' + (sq ? 'i * i' : 'i'))} / ${c('print(s)')}</p>`, answer: t, tol: 0.0001, solution: R`<p>${t}.</p>` }; } },
    { title: 'Halving loop', gen: (r) => { let n = r.int(50, 5000), k = 0; const n0 = n, d = r.pick([2, 3]); while (n > 1) { n = Math.floor(n / d); k++; } return { q: R`<p>How many times does the body run? ${c('n = ' + n0)} / ${c('while n > 1: n //= ' + d)}</p>`, answer: k, tol: 0.0001, solution: R`<p>${k}.</p>` }; } }
  ]);
  const fizzRef = (s) => { const n = +s.trim(); let o = ''; for (let i = 1; i <= n; i++) o += (i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i) + '\n'; return o; };
  PB.addChallenge({ id: 'py-fizzbuzz', chapter: 'py-control', title: 'FizzBuzz', level: 'easy',
    statement: R`<p>Print the numbers from 1 to $n$, one per line, but print ${c('Fizz')} instead of multiples of 3, ${c('Buzz')} instead of multiples of 5, and ${c('FizzBuzz')} instead of multiples of both.</p>`, input: R`<p>One integer $n$ ($1 \le n \le 1000$).</p>`, output: R`<p>$n$ lines.</p>`,
    samples: [T(fizzRef)('15\n')], tests: ['1\n', '5\n', '100\n', '1000\n'].map(T(fizzRef)),
    hints: [R`Check divisibility by 15 (both) <em>first</em>, otherwise multiples of 15 would just print Fizz.`],
    solution: { python: 'n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n' } });
  const digRef = (s) => lines(s).slice(1).filter((l) => l.trim()).map((l) => { let x = l.trim(); while (x.length > 1) x = String([...x].reduce((a, d) => a + +d, 0)); return [...l.trim()].reduce((a, d) => a + +d, 0) + ' ' + x; }).join('\n') + '\n';
  PB.addChallenge({ id: 'py-digits', chapter: 'py-control', title: 'Digit sum and digital root', level: 'medium',
    statement: R`<p>For each number, print the sum of its digits, then its <strong>digital root</strong>: keep summing the digits until a single digit remains. For 9875: 9 + 8 + 7 + 5 = 29, then 2 + 9 = 11, then 1 + 1 = 2.</p>`,
    input: R`<p>The first line holds $q$ ($1 \le q \le 1000$). Then $q$ lines, each a whole number $0 \le x < 10^{18}$.</p>`, output: R`<p>For each number, its digit sum and digital root on one line.</p>`,
    samples: [T(digRef)('2\n9875\n7\n')], tests: [T(digRef)('3\n0\n10\n999999999999999999\n'), G(digRef, (r) => { let s = '300\n'; for (let i = 0; i < 300; i++) s += r.int(0, 999999999) + '' + r.int(0, 999999999) + '\n'; return s; }, false)],
    hints: [R`Use a loop with ${c('x % 10')} and ${c('x //= 10')}, or loop over the characters of the string.`, R`Digital root: ${c('while x >= 10:')} replace x by its digit sum.`],
    solution: { python: 'def dsum(x):\n    s = 0\n    while x > 0:\n        s += x % 10\n        x //= 10\n    return s\n\nq = int(input())\nfor _ in range(q):\n    x = int(input())\n    r = x\n    while r >= 10:\n        r = dsum(r)\n    print(dsum(x), r)\n' } });

  /* ===================== 7. Functions and data structures ===================== */
  PB.addChapter({
    id: 'py-functions', subject: 'computing', num: 7, part: 'Python',
    title: 'Functions, Lists and Dictionaries',
    subtitle: R`Organising code and data. Defining functions with parameters and return values, scope, lists and their methods, references and copies, tuples, dictionaries and sets, comprehensions and sorting with a key.`,
    big: 'A <strong>function</strong> is a named, reusable piece of program: give it inputs, get back an answer, and stop worrying how. <strong>Lists</strong> hold many values in order, <strong>dictionaries</strong> look values up by a key, and <strong>sets</strong> answer "is it in there?" instantly. Choosing the right container is half of programming.',
    goals: ['Define and call functions with parameters and return values', 'Explain local scope', 'Use lists, indexing, slicing and methods', 'Understand that names refer to objects (aliasing)', 'Count and look up with dict and set', 'Write list comprehensions and sort with a key'],
    sections: [
      { title: 'Functions', html: R`
${K('python', R`
def area(width, height=1):       # height has a default value
    """Return the area of a rectangle."""
    return width * height

print(area(3, 4))                # 12
print(area(5))                   # 5
print(area(height=2, width=7))   # 14, by name

def is_prime(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:            # only need divisors up to √n
        if n % d == 0:
            return False         # return leaves the function at once
        d += 1
    return True

print([p for p in range(30) if is_prime(p)])`, true)}
<p><strong>Parameters</strong> are the names in the definition; <strong>arguments</strong> are the values you pass. ${c('return')} sends a value back and ends the call; a function without ${c('return')} gives ${c('None')}. Variables created inside a function are <strong>local</strong>: they vanish when it returns and cannot clash with names outside. Small functions that do one thing, with good names, make programs readable and testable.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('def f(x, y=2): return x ** y')}. What is ${c('f(3) + f(2, 3)')}?`, 17, [R`${c('f(3)')} uses the default ${c('y = 2')}.`], R`$9 + 8 = 17$.`)] },
      { title: 'Lists, and names that share', html: R`
<p>A <strong>list</strong> holds values in order and can change. Indexing and slicing work as for strings.</p>
${K('python', R`
nums = [5, 3, 8]
nums.append(1)          # [5, 3, 8, 1]
nums[0] = 6             # [6, 3, 8, 1]
nums.sort()             # [1, 3, 6, 8]
print(len(nums), sum(nums), max(nums), 8 in nums)
print(nums.pop(), nums) # 8 [1, 3, 6]`, true)}
<p>A crucial fact: a variable holds a <em>reference</em> to an object, an arrow, not a box. ${c('b = a')} copies the arrow, so both names share one list, and changing it through ${c('b')} changes it for ${c('a')} too. To get an independent copy, write ${c('a[:]')} or ${c('list(a)')}. The same happens when you pass a list to a function: the function can change the caller's list. Step through it in the lab's memory diagram.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`${c('a = [1, 2]')}, ${c('b = a')}, ${c('b.append(3)')}, ${c('c = a[:]')}, ${c('c.append(4)')}. What is ${c('len(a)')}?`, 3, [R`${c('b')} is the same list as ${c('a')}; ${c('c')} is a copy.`], R`${c('a')} gained 3 through ${c('b')}, but not 4: length 3.`)] },
      { title: 'Dictionaries, sets and tuples', html: R`
<p>A <strong>dictionary</strong> maps <strong>keys</strong> to values, like a word to its definition. Looking up a key is instant, however big the dictionary. A <strong>set</strong> is a collection with no duplicates and instant membership tests. A <strong>tuple</strong> is like a list that cannot change, handy for fixed pairs like coordinates.</p>
${K('python', R`
text = "the cat and the hat and the bat"
count = {}
for w in text.split():
    count[w] = count.get(w, 0) + 1     # get returns 0 if w is new
print(count)                           # {'the': 3, 'cat': 1, 'and': 2, ...}
print(count["the"], "dog" in count)    # 3 False
for word, k in count.items():
    print(word, k)

seen = set([3, 1, 3, 2, 1])
print(seen, len(seen))                 # {1, 2, 3} 3
point = (3, 4)                         # a tuple
x, y = point                           # unpacking`, true)}
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('len(set("mississippi"))')}?`, 4, [R`Which different letters appear?`], R`m, i, s, p: 4.`)] },
      { title: 'Comprehensions and sorting', html: R`
<p>A <strong>list comprehension</strong> builds a list in one line: ${c('[expression for item in sequence if condition]')}.</p>
${K('python', R`
squares = [n * n for n in range(1, 6)]              # [1, 4, 9, 16, 25]
evens = [n for n in range(20) if n % 2 == 0]
words = ["pear", "fig", "banana", "kiwi"]
print(sorted(words))                                # alphabetical
print(sorted(words, key=len))                       # by length
print(sorted(words, key=lambda w: (-len(w), w)))    # longest first, ties alphabetical
scores = {"Ada": 91, "Alan": 78, "Grace": 95}
best = max(scores, key=scores.get)                  # 'Grace'`, true)}
<p>${c('sorted')} returns a new sorted list; ${c('.sort()')} sorts a list in place. The ${c('key')} function says what to compare: sort by length, by the second item of a pair, or by a tuple of several criteria. A ${c('lambda')} is a tiny unnamed function.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('sum([x * x for x in range(10) if x % 3 == 0])')}?`, 126, [R`x = 0, 3, 6, 9.`], R`$0 + 9 + 36 + 81 = 126$.`)] }
    ],
    labs: [
      { sim: 'memory', title: 'Names and objects', desc: 'Step through two programs and watch which names point at which objects. Arrows are references.',
        tasks: ['Why does changing <code>b</code> change <code>a</code>?', 'In the second program, why does the list change but the number not?'],
        params: { programs: {
          alias: { name: 'Aliasing a list', lang: 'python', code: ['a = [1, 2, 3]', 'b = a', 'b.append(4)', 'c = a[:]', 'c.append(5)', 'print(a, b, c)'], steps: [
            { line: 0, frames: [{ fn: 'global', vars: [['a', '', 'L1']] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3] }], note: 'A list object is created, and the name <code>a</code> points to it.' },
            { line: 1, frames: [{ fn: 'global', vars: [['a', '', 'L1'], ['b', '', 'L1', null, 1]] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3] }], note: '<code>b = a</code> copies the <em>arrow</em>, not the list. Both names point to the same object.' },
            { line: 2, frames: [{ fn: 'global', vars: [['a', '', 'L1'], ['b', '', 'L1']] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3, 4] }], note: 'Appending through <code>b</code> changes the one shared list, so <code>a</code> sees it too.' },
            { line: 3, frames: [{ fn: 'global', vars: [['a', '', 'L1'], ['b', '', 'L1'], ['c', '', 'L2', null, 1]] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3, 4] }, { id: 'L2', label: 'list (a copy)', items: [1, 2, 3, 4] }], note: 'A slice <code>a[:]</code> builds a brand-new list with the same items.' },
            { line: 4, frames: [{ fn: 'global', vars: [['a', '', 'L1'], ['b', '', 'L1'], ['c', '', 'L2']] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3, 4] }, { id: 'L2', label: 'list (a copy)', items: [1, 2, 3, 4, 5] }], note: 'Changing the copy leaves the original alone.' },
            { line: 5, frames: [{ fn: 'global', vars: [['a', '', 'L1'], ['b', '', 'L1'], ['c', '', 'L2']] }], heap: [{ id: 'L1', label: 'list', items: [1, 2, 3, 4] }, { id: 'L2', label: 'list (a copy)', items: [1, 2, 3, 4, 5] }], note: 'Prints <code>[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4, 5]</code>.' }] },
          call: { name: 'Passing to a function', lang: 'python', code: ['def grow(nums, k):', '    nums.append(k)', '    k = k + 1', '', 'x = [7]', 'n = 1', 'grow(x, n)', 'print(x, n)'], steps: [
            { line: 4, frames: [{ fn: 'global', vars: [['x', '', 'L1']] }], heap: [{ id: 'L1', label: 'list', items: [7] }], note: '<code>x</code> points to a list.' },
            { line: 5, frames: [{ fn: 'global', vars: [['x', '', 'L1'], ['n', 1, null, null, 1]] }], heap: [{ id: 'L1', label: 'list', items: [7] }], note: '<code>n</code> refers to the number 1.' },
            { line: 6, frames: [{ fn: 'global', vars: [['x', '', 'L1'], ['n', 1]] }, { fn: 'grow(nums, k)', vars: [['nums', '', 'L1', null, 1], ['k', 1, null, null, 1]] }], heap: [{ id: 'L1', label: 'list', items: [7] }], note: 'Calling <code>grow</code> makes a new frame. Its parameters point to the same objects as the arguments.' },
            { line: 1, frames: [{ fn: 'global', vars: [['x', '', 'L1'], ['n', 1]] }, { fn: 'grow(nums, k)', vars: [['nums', '', 'L1'], ['k', 1]] }], heap: [{ id: 'L1', label: 'list', items: [7, 1] }], note: '<code>nums.append</code> changes the shared list.' },
            { line: 2, frames: [{ fn: 'global', vars: [['x', '', 'L1'], ['n', 1]] }, { fn: 'grow(nums, k)', vars: [['nums', '', 'L1'], ['k', 2, null, null, 1]] }], heap: [{ id: 'L1', label: 'list', items: [7, 1] }], note: '<code>k = k + 1</code> points the <em>local</em> name <code>k</code> at a new number. The global <code>n</code> is untouched.' },
            { line: 7, frames: [{ fn: 'global', vars: [['x', '', 'L1'], ['n', 1]] }], heap: [{ id: 'L1', label: 'list', items: [7, 1] }], note: 'The frame is gone. Prints <code>[7, 1] 1</code>: mutating an object is visible outside, rebinding a name is not.' }] }
        } } },
      { sim: 'code', title: 'Challenge: word frequencies', desc: '', params: { challenge: 'py-words' } },
      { sim: 'code', title: 'Challenge: anagram groups', desc: '', params: { challenge: 'py-anagrams' } }
    ],
    formulas: [['Function', 'def name(a, b=0):\n    return a + b', 'python'], ['List', 'xs.append(v)  xs.pop()  xs.sort()  len(xs)  v in xs\nys = xs[:]   # a real copy', 'python'], ['Dictionary', 'd[k] = v   d.get(k, 0)   k in d\nfor k, v in d.items(): ...', 'python'], ['Set', 's = set()   s.add(v)   v in s   a & b   a | b', 'python'],
      ['Comprehension', '[f(x) for x in xs if cond(x)]', 'python'], ['Sorting', 'sorted(xs, key=len, reverse=True)\nsorted(pairs, key=lambda p: (p[1], p[0]))', 'python']],
    problems: [
      P('concept', 'mcq', 'No return', R`What does a function return if it has no ${c('return')} statement?`, 2, [R`Python's "nothing" value.`], R`${c('None')}.`, { options: [c('0'), c('""'), c('None'), 'an error'] }),
      P('concept', 'mcq', 'The right container', R`You need to check, many times, whether a username is already taken. Which is fastest?`, 1, [R`Which container answers "is it in there?" without searching?`], R`A ${c('set')} (or dict): membership is instant on average, while a list must be searched one by one.`, { options: ['a list', 'a set', 'a string', 'a tuple'] }),
      P('concept', 'num', 'Negative index', R`${c('xs = [4, 8, 15, 16, 23, 42]')}. What is ${c('xs[-2]')}?`, 23, [R`Count from the end: −1 is the last.`], R`23.`),
      P('concept', 'mcq', 'Immutable', R`Which of these cannot be changed after it is created?`, 3, [R`Square brackets versus round ones.`], R`A tuple (and strings, too).`, { options: ['a list', 'a dict', 'a set', 'a tuple'] }),
      P('core', 'num', 'Aliasing', R`${c('a = [1, 2, 3]')}, ${c('b = a')}, ${c('b[0] = 100')}. What is ${c('sum(a)')}?`, 105, [R`${c('a')} and ${c('b')} are the same list.`], R`${c('a')} is ${c('[100, 2, 3]')}: 105.`),
      P('core', 'num', 'Dictionary counting', R`${c('d = {}')} / ${c('for ch in "banana": d[ch] = d.get(ch, 0) + 1')}. What is ${c('d["a"] * 10 + d["n"]')}?`, 32, [R`Count each letter.`], R`a: 3, n: 2, so 32.`),
      P('core', 'num', 'Comprehension', R`What is ${c('len([x for x in range(1, 50) if x % 7 == 0])')}?`, 7, [R`7, 14, …, 49.`], R`7.`),
      P('core', 'num', 'Scope', R`${c('x = 5')} / ${c('def f(): x = 10; return x')} / ${c('y = f()')}. What is ${c('x + y')}?`, 15, [R`The ${c('x')} inside ${c('f')} is local.`], R`Global ${c('x')} stays 5; ${c('y')} is 10. Total 15.`),
      P('core', 'mcq', 'Sorting with a key', R`What is ${c('sorted(["bb", "a", "ccc", "dd"], key=len)')}?`, 1, [R`Ties keep their original order (the sort is stable).`], R`${c('["a", "bb", "dd", "ccc"]')}.`, { options: [c('["a", "bb", "ccc", "dd"]'), c('["a", "bb", "dd", "ccc"]'), c('["ccc", "bb", "dd", "a"]'), c('["a", "dd", "bb", "ccc"]')] }),
      P('olympiad', 'num', 'The default-argument trap', R`${c('def add(v, xs=[]): xs.append(v); return len(xs)')}. What is ${c('add(1) + add(2) + add(3)')}?`, 6, [R`The default list is created once, when the function is defined, and then shared.`], R`The same list grows: lengths 1, 2, 3, sum 6. (Use ${c('xs=None')} and create the list inside.)`),
      P('olympiad', 'num', 'Recursion', R`${c('def f(n): return 1 if n <= 1 else f(n - 1) + f(n - 2)')}. What is ${c('f(6)')}?`, 13, [R`f(0) = f(1) = 1, then add.`], R`1, 1, 2, 3, 5, 8, 13.`),
      P('olympiad', 'num', 'Set algebra', R`${c('a = set(range(0, 30, 2))')}, ${c('b = set(range(0, 30, 3))')}. What is ${c('len(a | b) - len(a & b)')}?`, 15, [R`Union minus intersection: numbers in exactly one.`], R`a has 15, b has 10, a & b (multiples of 6) has 5, a | b has 20. 20 − 5 = 15.`)
    ]
  });
  PB.addDrills('py-functions', [
    { title: 'Comprehension count', gen: (r) => { const n = r.int(20, 120), k = r.int(3, 9); return { q: R`<p>What is ${c('len([x for x in range(' + n + ') if x % ' + k + ' == 0])')}?</p>`, answer: Math.ceil(n / k), tol: 0.0001, solution: R`<p>0, ${k}, 2·${k}, … below ${n}: ${Math.ceil(n / k)}.</p>` }; } },
    { title: 'Distinct letters', gen: (r) => { const w = r.pick(['mississippi', 'banana', 'abracadabra', 'committee', 'programming', 'bookkeeper', 'assessment']); return { q: R`<p>What is ${c('len(set("' + w + '"))')}?</p>`, answer: new Set(w).size, tol: 0.0001, solution: R`<p>The different letters: ${[...new Set(w)].join(', ')}.</p>` }; } },
    { title: 'Aliased sum', gen: (r) => { const a = [r.int(1, 9), r.int(1, 9), r.int(1, 9)], v = r.int(10, 99); return { q: R`<p>${c('a = [' + a.join(', ') + ']')}, ${c('b = a')}, ${c('b.append(' + v + ')')}. What is ${c('sum(a)')}?</p>`, answer: a[0] + a[1] + a[2] + v, tol: 0.0001, solution: R`<p>Both names share one list: ${a[0] + a[1] + a[2] + v}.</p>` }; } }
  ]);
  const wordsRef = (s) => { const L = lines(s); const k = +L[0].split(' ')[1]; const ws = L.slice(1).join(' ').toLowerCase().split(/\s+/).filter(Boolean); const m = new Map(); ws.forEach((w) => m.set(w, (m.get(w) || 0) + 1)); return [...m].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).slice(0, k).map((x) => x[0] + ' ' + x[1]).join('\n') + '\n'; };
  const WORDS = 'the of and to in a is that for it as was with be by on not he this are or his from at which but have an they you were her she there would their we him been has when who will more no if out so said what up its about into than them can only other new some could time these two may then do first any my now such like our over man me even most made after also did many before must through back years where much your way well down should because each just those people how too little state good very make world still own see men work long get here between both life being under never day same another know while last might us great old year off come since against go came right used take three'.split(' ');
  PB.addChallenge({ id: 'py-words', chapter: 'py-functions', title: 'Word frequencies', level: 'medium',
    statement: R`<p>Count how often each word appears (ignoring upper/lower case) and print the $k$ most common, most frequent first. Break ties alphabetically.</p>`,
    input: R`<p>The first line holds $m$ and $k$: the number of text lines and how many words to print. Then $m$ lines of words (letters only) separated by spaces. There are at least $k$ different words; at most $10^5$ words in total.</p>`,
    output: R`<p>$k$ lines: a word and its count.</p>`,
    samples: [T(wordsRef)('2 3\nThe cat and the hat\nand THE bat\n')],
    tests: [T(wordsRef)('1 2\nb a c b a\n'), T(wordsRef)('3 4\nto be or not to be\nthat is the question\nTo be\n'), G(wordsRef, (r) => { let s = '2000 10\n'; for (let i = 0; i < 2000; i++) { const n = r.int(5, 20); const ws = []; for (let j = 0; j < n; j++) ws.push(WORDS[Math.min(WORDS.length - 1, Math.floor(Math.pow(r(), 2.5) * WORDS.length))]); s += ws.join(' ') + '\n'; } return s; })],
    hints: [R`Build a dictionary of counts, as in the text.`, R`${c('sorted(d.items(), key=lambda p: (-p[1], p[0]))')} sorts by count descending, then word.`],
    starter: { python: 'm, k = map(int, input().split())\ncount = {}\nfor _ in range(m):\n    for w in input().lower().split():\n        pass  # count it\n' },
    solution: { python: 'm, k = map(int, input().split())\ncount = {}\nfor _ in range(m):\n    for w in input().lower().split():\n        count[w] = count.get(w, 0) + 1\nfor w, n in sorted(count.items(), key=lambda p: (-p[1], p[0]))[:k]:\n    print(w, n)\n' } });
  const anaRef = (s) => { const ws = lines(s).slice(1).map((x) => x.trim()).filter(Boolean); const m = new Map(); ws.forEach((w) => { const k = [...w].sort().join(''); if (!m.has(k)) m.set(k, []); m.get(k).push(w); }); const g = [...m.values()].map((x) => x.sort()); g.sort((a, b) => b.length - a.length || (a[0] < b[0] ? -1 : 1)); return g.length + '\n' + g.map((x) => x.join(' ')).join('\n') + '\n'; };
  PB.addChallenge({ id: 'py-anagrams', chapter: 'py-functions', title: 'Anagram groups', level: 'medium',
    statement: R`<p>Two words are anagrams if they use the same letters, like ${c('listen')} and ${c('silent')}. Group the words into anagram classes. Print the number of groups, then each group on one line with its words in alphabetical order. List the groups from largest to smallest, and groups of equal size by their first word.</p>`,
    input: R`<p>The first line holds $n$ ($1 \le n \le 20000$). Then $n$ distinct lower-case words, one per line.</p>`, output: R`<p>The number of groups, then the groups.</p>`,
    samples: [T(anaRef)('6\nlisten\nstone\nsilent\nnotes\ntinsel\ncat\n')],
    tests: [T(anaRef)('1\na\n'), T(anaRef)('4\nab\nba\ncd\ndc\n'), G(anaRef, (r) => { const set = new Set(); while (set.size < 20000) { let w = ''; const L = r.int(3, 6); for (let i = 0; i < L; i++) w += 'aeinrst'[r.int(0, 6)]; set.add(w); if (set.size > 3000) break; } return set.size + '\n' + [...set].join('\n') + '\n'; })],
    hints: [R`Anagrams become identical when you sort their letters: ${c('"".join(sorted(w))')}. Use that as a dictionary key.`],
    solution: { python: 'n = int(input())\ngroups = {}\nfor _ in range(n):\n    w = input().strip()\n    groups.setdefault("".join(sorted(w)), []).append(w)\ngs = [sorted(g) for g in groups.values()]\ngs.sort(key=lambda g: (-len(g), g[0]))\nprint(len(gs))\nfor g in gs:\n    print(" ".join(g))\n' } });

  /* ===================== 8. Files, errors and objects ===================== */
  PB.addChapter({
    id: 'py-objects', subject: 'computing', num: 8, part: 'Python',
    title: 'Errors, Files, Modules and Classes',
    subtitle: R`Writing real programs. Exceptions and try/except, reading and writing files, importing modules, and classes: bundling data with the functions that work on it.`,
    big: 'Real programs meet bad input, missing files and surprises. <strong>Exceptions</strong> let you catch problems instead of crashing. <strong>Modules</strong> let you reuse code others wrote. And <strong>classes</strong> let you invent your own types, a <em>BankAccount</em> or a <em>Planet</em>, each object carrying its own data and abilities.',
    goals: ['Read a traceback', 'Handle errors with try/except and raise your own', 'Read and write text files with with open', 'Import and use standard modules', 'Define classes with __init__, attributes and methods', 'Explain what self means'],
    sections: [
      { title: 'Exceptions', html: R`
<p>When something goes wrong, Python <strong>raises an exception</strong>. Uncaught, it stops the program and prints a <strong>traceback</strong>: read it from the bottom, which names the error, up to the line where it happened.</p>
${K('python', R`
def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("cannot divide by zero")
        return None

print(safe_div(6, 3))
print(safe_div(1, 0))
try:
    n = int("twelve")
except ValueError as e:
    print("bad number:", e)
finally:
    print("this always runs")`, true)}
<p>Common ones: ${c('ValueError')} (right type, wrong value, like ${c('int("abc")')}), ${c('TypeError')} (${c('"3" + 4')}), ${c('IndexError')}, ${c('KeyError')}, ${c('ZeroDivisionError')}, ${c('FileNotFoundError')}. Catch the specific errors you expect; a bare ${c('except:')} also hides your own bugs. You can signal problems yourself with ${c('raise ValueError("age must be positive")')}.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which exception does ${c('[1, 2, 3][5]')} raise?`, [c('KeyError'), c('ValueError'), c('IndexError'), c('TypeError')], 2, [R`A list position that does not exist.`], R`${c('IndexError: list index out of range')}.`)] },
      { title: 'Files', html: R`
<p>Programs keep data between runs in files. ${c('open')} gives a file object; using it inside ${c('with')} closes the file automatically, even if an error happens.</p>
${K('python', R`
with open("scores.txt", "w") as f:      # "w" write (replaces), "a" append, "r" read
    f.write("Ada 91\nAlan 78\nGrace 95\n")

with open("scores.txt") as f:
    for line in f:                       # one line at a time, with its "\n"
        name, pts = line.split()
        print(name, int(pts) + 5)`, true)}
<p>Files are opened by path, relative to the program's working directory: the same idea as in the terminal chapter. For structured data, the ${c('csv')} and ${c('json')} modules read and write standard formats that spreadsheets and web APIs use. (In the Code lab, files live in a temporary in-browser file system.)</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which mode adds to the end of a file instead of replacing it?`, [c('"r"'), c('"w"'), c('"a"'), c('"x"')], 2, [R`a for…`], R`${c('"a"')}, append.`)] },
      { title: 'Modules', html: R`
<p>A <strong>module</strong> is a file of Python code you can ${c('import')}. Python comes with "batteries included":</p>
${K('python', R`
import math, random
from collections import Counter, deque
from itertools import permutations

print(math.sqrt(2), math.gcd(84, 36), math.pi)
random.seed(1)
print(random.randint(1, 6), random.choice(["rock", "paper", "scissors"]))
print(Counter("mississippi").most_common(2))     # [('i', 4), ('s', 4)]
print(len(list(permutations("abcd"))))            # 24`, true)}
<p>${c('collections')}, ${c('itertools')}, ${c('heapq')} and ${c('bisect')} are especially useful for competitive programming. Thousands more packages (for science, web servers, games) install with ${c('pip')}; in the browser lab, some like ${c('numpy')} load automatically when imported. Your own ${c('.py')} files are modules too, which is how big programs are split up.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('math.gcd(84, 36)')}?`, 12, [R`84 = 12 × 7, 36 = 12 × 3.`], R`12.`)] },
      { title: 'Classes and objects', html: R`
<p>A <strong>class</strong> is a blueprint for a new type; each <strong>object</strong> made from it has its own <strong>attributes</strong> (data) and shares the class's <strong>methods</strong> (functions).</p>
${K('python', R`
class Account:
    def __init__(self, owner, balance=0):   # runs when an object is created
        self.owner = owner                   # attributes live on self
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount

    def __str__(self):                       # how print shows it
        return f"{self.owner}: {self.balance}"

a = Account("Ada", 50)
b = Account("Alan")
a.deposit(25)
print(a, "|", b)          # Ada: 75 | Alan: 0`, true)}
<p>${c('self')} is the object the method was called on: ${c('a.deposit(25)')} runs ${c('deposit')} with ${c('self')} = ${c('a')}. Classes keep data and the rules for changing it together, so the rest of the program cannot put an account into a nonsense state. A class can also <strong>inherit</strong> from another, ${c('class Savings(Account):')}, reusing its methods and adding more.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Using the ${c('Account')} class above: ${c('x = Account("X", 10)')}, ${c('y = x')}, ${c('y.deposit(5)')}, ${c('x.deposit(1)')}. What is ${c('x.balance')}?`, 16, [R`${c('y')} is the same object as ${c('x')}.`], R`10 + 5 + 1 = 16.`)] }
    ],
    labs: [
      { sim: 'code', title: 'Classes playground', desc: 'A small simulation built from a class. Add a method, or a second species.', params: { lang: 'python', langs: ['python'], code: 'import random\n\nclass Rabbit:\n    count = 0                      # shared by the whole class\n    def __init__(self, name):\n        self.name = name\n        self.age = 0\n        Rabbit.count += 1\n    def birthday(self):\n        self.age += 1\n\nrandom.seed(4)\nwarren = [Rabbit(f"R{i}") for i in range(3)]\nfor year in range(4):\n    for r in list(warren):\n        r.birthday()\n        if r.age >= 1 and random.random() < 0.6:\n            warren.append(Rabbit(r.name + "\'"))\n    print("year", year + 1, "rabbits:", len(warren))\nprint("total ever born:", Rabbit.count)\n' } },
      { sim: 'code', title: 'Challenge: a bank of accounts', desc: '', params: { challenge: 'py-bank' } }
    ],
    formulas: [['Catch errors', 'try:\n    risky()\nexcept ValueError as e:\n    handle(e)\nfinally:\n    cleanup()', 'python'], ['Raise', 'raise ValueError("why")', 'python'], ['Files', 'with open("f.txt") as f:\n    for line in f: ...\nwith open("out.txt", "w") as f:\n    f.write("text\\n")', 'python'],
      ['Imports', 'import math\nfrom collections import Counter, deque', 'python'], ['Class', 'class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def norm(self):\n        return (self.x**2 + self.y**2) ** 0.5', 'python']],
    problems: [
      P('concept', 'mcq', 'Reading a traceback', R`Where in a traceback is the name of the error?`, 1, [R`Python prints the call history first.`], R`On the last line.`, { options: ['The first line', 'The last line', 'In the middle', 'It is not shown'] }),
      P('concept', 'mcq', 'int("abc")', R`What does ${c('int("abc")')} raise?`, 0, [R`The type (string) is fine; the value is not.`], R`${c('ValueError')}.`, { options: [c('ValueError'), c('TypeError'), c('NameError'), c('SyntaxError')] }),
      P('concept', 'mcq', 'Why with?', R`Why open files with ${c('with open(...) as f:')}?`, 2, [R`What happens at the end of the block?`], R`The file is closed automatically, even if an exception happens.`, { options: ['It is faster', 'It allows binary files', 'It closes the file automatically', 'It is required to write'] }),
      P('concept', 'mcq', 'self', R`In ${c('acc.deposit(10)')}, what is ${c('self')} inside ${c('deposit')}?`, 1, [R`The object before the dot.`], R`The object ${c('acc')}.`, { options: ['The class Account', 'The object acc', 'The number 10', 'Nothing'] }),
      P('core', 'num', 'try / except flow', R`What is printed? ${c('t = 0')} / ${c('for s in ["4", "x", "5", "1.5"]:')} / ${c('    try: t += int(s)')} / ${c('    except ValueError: t += 100')} / ${c('print(t)')}`, 209, [R`${c('int("1.5")')} fails too.`], R`4 + 100 + 5 + 100 = 209.`),
      P('core', 'num', 'finally', R`${c('def f():')} / ${c('    try: return 1')} / ${c('    finally: print("bye")')}. What does ${c('f()')} return?`, 1, [R`${c('finally')} runs, but does not change the return value here.`], R`It prints "bye" and returns 1.`),
      P('core', 'num', 'Class attributes', R`${c('class C:')} / ${c('    n = 0')} / ${c('    def __init__(self): C.n += 1')}. After ${c('a = [C() for _ in range(5)]')} and ${c('b = C()')}, what is ${c('C.n')}?`, 6, [R`Every new object bumps the shared counter.`], R`6.`),
      P('core', 'num', 'Counter', R`What is ${c('Counter("abracadabra")["a"]')}?`, 5, [R`Count the a's.`], R`5.`),
      P('olympiad', 'num', 'Inheritance', R`${c('class A: def f(self): return 1')} / ${c('class B(A): def f(self): return super().f() + 10')} / ${c('class C(B): pass')}. What is ${c('C().f()')}?`, 11, [R`C inherits f from B, which calls A's.`], R`$1 + 10 = 11$.`),
      P('olympiad', 'num', 'Permutations', R`What is ${c('len(set(permutations("aabb")))')}?`, 6, [R`$4!/(2!\,2!)$.`], R`24 orderings, but swapping equal letters gives the same tuple: 6 distinct.`),
      P('olympiad', 'mcq', 'Equality and identity', R`${c('p = [1]')}, ${c('q = [1]')}. Which is true?`, 1, [R`${c('==')} compares values, ${c('is')} compares identity.`], R`${c('p == q')} is True (equal contents) but ${c('p is q')} is False (two different objects).`, { options: [c('p is q'), c('p == q and not (p is q)'), c('p != q'), 'both are the same object'] })
    ]
  });
  PB.addDrills('py-objects', [
    { title: 'Counting objects', gen: (r) => { const a = r.int(2, 9), b = r.int(1, 5); return { q: R`<p>A class increments a shared counter in ${c('__init__')}. You create ${a} objects in a list comprehension, then ${b} more one by one. What is the counter?</p>`, answer: a + b, tol: 0.0001, solution: R`<p>${a + b}.</p>` }; } },
    { title: 'Letter counts', gen: (r) => { const w = r.pick(['abracadabra', 'mississippi', 'bookkeeper', 'banana', 'committee']), ch = r.pick([...new Set(w)]); return { q: R`<p>What is ${c('Counter("' + w + '")["' + ch + '"]')}?</p>`, answer: [...w].filter((x) => x === ch).length, tol: 0.0001, solution: R`<p>Count the ${ch}'s.</p>` }; } }
  ]);
  const bankRef = (s) => { const L = lines(s).slice(1).filter((x) => x.trim()); const acc = new Map(); let o = ''; L.forEach((l) => { const p = l.trim().split(/\s+/); const [cmd, name] = p, v = +p[2]; if (cmd === 'open') { if (acc.has(name)) o += 'ERROR exists\n'; else { acc.set(name, 0); o += 'OK\n'; } return; } if (!acc.has(name)) { o += 'ERROR no account\n'; return; } if (cmd === 'deposit') { acc.set(name, acc.get(name) + v); o += acc.get(name) + '\n'; } else if (cmd === 'withdraw') { if (acc.get(name) < v) o += 'ERROR insufficient\n'; else { acc.set(name, acc.get(name) - v); o += acc.get(name) + '\n'; } } else if (cmd === 'balance') o += acc.get(name) + '\n'; }); return o; };
  PB.addChallenge({ id: 'py-bank', chapter: 'py-objects', title: 'A bank of accounts', level: 'medium',
    statement: R`<p>Process bank commands. Each is one of:</p><ul><li>${c('open NAME')}: create an account with balance 0; print ${c('OK')}, or ${c('ERROR exists')} if it already exists.</li><li>${c('deposit NAME X')}: add X; print the new balance.</li><li>${c('withdraw NAME X')}: take out X if the balance is enough and print the new balance; otherwise print ${c('ERROR insufficient')}.</li><li>${c('balance NAME')}: print the balance.</li></ul><p>Any command on an account that does not exist prints ${c('ERROR no account')}. A class with methods that raise exceptions is a tidy way to do it.</p>`,
    input: R`<p>The first line holds $q$ ($1 \le q \le 10^5$). Then $q$ commands; amounts are integers $1 \le X \le 10^9$.</p>`, output: R`<p>One line per command.</p>`,
    samples: [T(bankRef)('7\nopen ada\ndeposit ada 50\nwithdraw ada 80\nwithdraw ada 20\nbalance bob\nopen ada\nbalance ada\n')],
    tests: [T(bankRef)('3\ndeposit x 5\nopen x\nwithdraw x 1\n'), G(bankRef, (r) => { const names = ['ada', 'alan', 'grace', 'linus', 'guido', 'bjarne', 'brendan']; let s = '4500\n'; for (let i = 0; i < 4500; i++) { const k = r.int(0, 9), n = r.pick(names); s += (k === 0 ? 'open ' + n : k < 5 ? 'deposit ' + n + ' ' + r.int(1, 1000) : k < 8 ? 'withdraw ' + n + ' ' + r.int(1, 1500) : 'balance ' + n) + '\n'; } return s; })],
    hints: [R`Keep a dictionary from names to balances (or to Account objects).`, R`Reading 10⁵ lines with ${c('input()')} is fine; for even more, use ${c('sys.stdin')}.`],
    starter: { python: 'class Account:\n    def __init__(self):\n        self.balance = 0\n\naccounts = {}\nq = int(input())\nfor _ in range(q):\n    parts = input().split()\n    cmd, name = parts[0], parts[1]\n    # handle the command\n' },
    solution: { python: 'import sys\nclass Account:\n    def __init__(self):\n        self.balance = 0\n    def deposit(self, x):\n        self.balance += x\n    def withdraw(self, x):\n        if x > self.balance:\n            raise ValueError("insufficient")\n        self.balance -= x\n\naccounts = {}\nout = []\ndata = sys.stdin.read().split("\\n")\nq = int(data[0])\nfor line in data[1:q + 1]:\n    p = line.split()\n    cmd, name = p[0], p[1]\n    if cmd == "open":\n        if name in accounts:\n            out.append("ERROR exists")\n        else:\n            accounts[name] = Account()\n            out.append("OK")\n        continue\n    if name not in accounts:\n        out.append("ERROR no account")\n        continue\n    a = accounts[name]\n    try:\n        if cmd == "deposit":\n            a.deposit(int(p[2]))\n        elif cmd == "withdraw":\n            a.withdraw(int(p[2]))\n        out.append(str(a.balance))\n    except ValueError:\n        out.append("ERROR insufficient")\nprint("\\n".join(out))\n' } });
})();
