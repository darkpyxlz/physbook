/* Computing 1–4: how computers and the web work. Files and the command line, bits and bytes,
   the internet, and the web (HTTP, HTTPS and what a browser does). */
(function () {
  const { R, K, c, QN, QM, P } = PB.csKit();
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });

  /* ===================== 1. Files and the command line ===================== */
  PB.addChapter({
    id: 'cs-shell', subject: 'computing', num: 1, part: 'How Computers and the Web Work',
    title: 'Files, Folders and the Command Line',
    subtitle: R`Where your work actually lives. The folder tree and paths, the shell and its everyday commands, pipes and redirection, permissions, and running programs.`,
    big: 'Everything on a computer is a file sitting somewhere in one big tree of folders. The command line is a way of talking to the computer in short typed sentences: <em>verb, options, things</em>. A dozen commands, glued together with pipes, do most daily jobs faster than clicking.',
    goals: ['Read and write absolute and relative paths', 'Move around and manage files with the shell', 'Redirect output into files and chain tools with pipes', 'Read and set Unix permissions', 'Run scripts and programs from the terminal'],
    sections: [
      { title: 'Files and the folder tree', html: R`
<p>A <strong>file</strong> is a named sequence of bytes: a photo, a program, an essay. A <strong>folder</strong> (or <strong>directory</strong>) holds files and other folders, so everything forms one upside-down <strong>tree</strong>. On Linux and macOS the top is the <strong>root</strong>, written ${c('/')}. Your own files live in your <strong>home folder</strong>, such as ${c('/home/ada')}, written ${c('~')} for short.</p>
${K('text', R`
/
├── home
│   └── ada            ← ~ (home)
│       ├── notes.txt
│       └── projects
│           └── site
│               └── index.html
├── etc                ← system settings
└── bin                ← programs`)}
<p>A <strong>path</strong> names a place in the tree. An <strong>absolute path</strong> starts at the root: ${c('/home/ada/projects/site/index.html')}. A <strong>relative path</strong> starts from where you are now, the <strong>working directory</strong>. Two special names help: ${c('.')} means "this folder" and ${c('..')} means "the folder above". From ${c('/home/ada/projects')}, the relative path ${c('../notes.txt')} means ${c('/home/ada/notes.txt')}.</p>
<p>The ending of a name, like ${c('.txt')} or ${c('.py')}, is only a convention that tells programs what to expect: renaming ${c('cat.jpg')} to ${c('cat.txt')} does not change a single byte. Windows writes paths differently, ${c('C:\\Users\\Ada\\notes.txt')}, with drive letters and backslashes, but the idea is the same.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`You are in ${c('/home/ada/docs')}. Where does ${c('../pics/cat.jpg')} point?`, [c('/home/ada/docs/pics/cat.jpg'), c('/home/ada/pics/cat.jpg'), c('/home/pics/cat.jpg'), c('/pics/cat.jpg')], 1, [R`${c('..')} climbs one level, from ${c('docs')} to ${c('ada')}.`], R`Up one level is ${c('/home/ada')}; then into ${c('pics')}.`)] },
      { title: 'The shell: talking in commands', html: R`
<p>A <strong>terminal</strong> runs a <strong>shell</strong> (usually bash or zsh), a program that reads a line you type, runs it, and prints the result. Each command is a sentence: the command name, then <strong>options</strong> (flags starting with ${c('-')}), then <strong>arguments</strong> (usually paths).</p>
${K('shell', R`
$ pwd                      # print working directory
/home/ada
$ ls -l projects           # list, in long form
$ cd projects/site         # change directory
$ mkdir images             # make a directory
$ touch todo.txt           # create an empty file
$ cat todo.txt             # print a file
$ cp todo.txt backup.txt   # copy
$ mv backup.txt old.txt    # move or rename
$ rm old.txt               # remove (no recycle bin!)
$ rm -r images             # remove a folder and everything in it`)}
<p>Two habits make the shell fast: press <kbd>Tab</kbd> to complete a name, and <kbd>↑</kbd> to bring back an earlier command. ${c('man ls')} or ${c('ls --help')} shows the manual. Be careful with ${c('rm')}: there is no undo, and ${c('rm -r')} deletes whole folders.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which command deletes the folder ${c('old')} together with everything inside it?`, [c('rm old'), c('rmdir old'), c('rm -r old'), c('del old')], 2, [R`Plain ${c('rm')} refuses folders, and ${c('rmdir')} only removes empty ones.`], R`${c('rm -r')} means "recursively": the folder and all its contents.`)] },
      { title: 'Redirection and pipes', html: R`
<p>Every program has three standard streams: it reads <strong>standard input</strong> (stdin), writes <strong>standard output</strong> (stdout) and reports problems on <strong>standard error</strong> (stderr). Normally the keyboard and the screen. The shell can reroute them:</p>
${K('shell', R`
$ echo "milk" > list.txt      # > writes stdout into a file (replacing it)
$ echo "eggs" >> list.txt     # >> appends
$ sort < list.txt             # < feeds a file to stdin
$ cat list.txt | wc -l        # | pipes one program's output into the next
2`)}
<p>A <strong>pipe</strong> ${c('|')} joins small tools into a production line. Each does one job well: ${c('grep')} keeps matching lines, ${c('sort')} sorts, ${c('uniq')} drops repeated neighbours (so it needs sorted input), ${c('wc -l')} counts lines, ${c('head')} and ${c('tail')} keep the ends. Together:</p>
${K('shell', R`
$ cat access.log | grep "404" | sort | uniq -c | sort -rn | head -3`)}
<p>reads a web server log, keeps the "not found" lines, counts each distinct one, and shows the three most common. That philosophy, many small programs that work together through text, is the heart of Unix.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A file has the five lines ${c('b, a, b, c, a')}. How many lines does ${c('sort file | uniq | wc -l')} print as its count?`, 3, [R`After sorting: a, a, b, b, c. ${c('uniq')} merges neighbours.`], R`a, b, c remain: 3.`)] },
      { title: 'Permissions and running programs', html: R`
<p>${c('ls -l')} shows who may do what. In ${c('-rwxr-x---')} the first character is the type (${c('-')} file, ${c('d')} directory), then three groups of three: the <strong>owner</strong>, the <strong>group</strong>, and <strong>others</strong>. Each group has <strong>r</strong>ead, <strong>w</strong>rite and e<strong>x</strong>ecute.</p>
<p>Each triple is a 3-bit number: r = 4, w = 2, x = 1. So ${c('rwx')} = 7, ${c('r-x')} = 5, ${c('r--')} = 4, and ${c('chmod 755 script.sh')} gives the owner everything and everyone else read and execute. ${c('chmod +x script.sh')} just adds execute permission.</p>
${K('shell', R`
$ ./greet.sh
bash: ./greet.sh: Permission denied
$ chmod +x greet.sh
$ ./greet.sh
Hello!
$ python3 hello.py      # or hand the file to an interpreter`)}
<p>When you type a bare name like ${c('ls')}, the shell searches the folders listed in the <strong>PATH</strong> variable for a program of that name; ${c('./')} says "the one right here". ${c('sudo')} runs a command as the administrator, so use it only when you know why.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Which three-digit number does ${c('chmod')} need for ${c('rwxr-xr--')}?`, 754, [R`r = 4, w = 2, x = 1, added up per group.`], R`rwx = 7, r-x = 5, r-- = 4: ${c('chmod 754')}.`)] }
    ],
    labs: [
      { sim: 'terminal', title: 'A practice terminal', desc: 'A pretend Linux shell with its own small file system: nothing you do here touches your real computer. Work through the missions on the right, then explore freely. Type <code>help</code> for the commands, <code>reset</code> to start over.',
        tasks: ['Finish all 19 missions (3 XP each).', 'Find the hidden file in your home folder. Why did plain <code>ls</code> not show it?', 'Use <code>grep -c</code> and a pipe to count how many scores in <code>Documents/scores.csv</code> belong to Ada.'],
        params: { missions: true } }
    ],
    formulas: [
      ['Where am I, what is here', 'pwd\nls -la', 'shell'], ['Move around', 'cd folder    cd ..    cd ~    cd /', 'shell'], ['Make, copy, move, delete', 'mkdir -p a/b\ntouch f.txt\ncp src dst    mv src dst\nrm file    rm -r folder', 'shell'],
      ['Read files', 'cat f    head -n 5 f    tail -n 5 f', 'shell'], ['Redirect', 'cmd > out.txt     # overwrite\ncmd >> out.txt    # append\ncmd < in.txt      # input', 'shell'],
      ['Pipes', 'cat f | grep word | sort | uniq -c | sort -rn | head', 'shell'], ['Find', 'find . -name "*.txt"\ngrep -n "word" *.txt', 'shell'], ['Permissions', 'r = 4, w = 2, x = 1\nchmod 755 run.sh\nchmod +x run.sh && ./run.sh', 'shell']
    ],
    problems: [
      P('concept', 'mcq', 'Absolute paths', R`An absolute path on Linux always starts with…`, 1, [R`It is measured from the very top of the tree.`], R`The root, ${c('/')}.`, { options: [c('~'), c('/'), c('./'), c('C:')] }),
      P('concept', 'mcq', 'Going up', R`What does ${c('cd ..')} do?`, 2, [R`${c('..')} is the folder above.`], R`It moves you to the parent folder.`, { options: ['Goes to your home folder', 'Goes to the root', 'Goes to the parent folder', 'Lists the folder'] }),
      P('concept', 'mcq', 'Append, do not replace', R`You want to add a line to the end of ${c('log.txt')} without losing what is there. Which do you use?`, 1, [R`One arrow replaces, two arrows add.`], R`${c('>>')} appends; ${c('>')} would wipe the file first.`, { options: [c('echo hi > log.txt'), c('echo hi >> log.txt'), c('echo hi | log.txt'), c('echo hi < log.txt')] }),
      P('concept', 'mcq', 'No recycle bin', R`After ${c('rm notes.txt')} in a terminal, the file is…`, 2, [R`The shell does not use the desktop's trash.`], R`Gone: ${c('rm')} deletes straight away. Back up before deleting.`, { options: ['in the recycle bin', 'hidden with a dot', 'deleted for good', 'moved to /tmp'] }),
      P('core', 'num', 'Climbing the tree', R`You are in ${c('/home/sam/projects/web')}. How many ${c('..')} steps does it take to reach ${c('/home')}?`, 3, [R`Each ${c('..')} removes one name from the end.`], R`${c('web')} → ${c('projects')} → ${c('sam')} → ${c('home')}: ${c('cd ../../..')}, 3 steps.`),
      P('core', 'num', 'Octal permissions', R`What number do you give ${c('chmod')} for ${c('rwxr-x---')}?`, 750, [R`rwx = 4 + 2 + 1, r-x = 4 + 1, --- = 0.`], R`7, 5, 0: ${c('chmod 750')}.`),
      P('core', 'num', 'Distinct lines', R`${c('fruit.txt')} has the lines apple, pear, apple, fig, pear, apple. What number does ${c('sort fruit.txt | uniq | wc -l')} print?`, 3, [R`Sorting puts equal lines next to each other, then ${c('uniq')} keeps one of each.`], R`apple, fig, pear: 3.`),
      P('core', 'mcq', 'Reading ls -l', R`${c('ls -l')} shows ${c('-rw-r--r--  ada staff  report.txt')}. Can a member of the group ${c('staff')} edit it?`, 1, [R`The middle triple is the group's.`], R`The group has ${c('r--')}: read only.`, { options: ['Yes', 'No, only read it', 'No, not even read it', 'Only if it is executable'] }),
      P('core', 'num', 'Overwrite or append', R`What does ${c('wc -l f')} print after these three commands? ${c('echo hi > f')}, ${c('echo hi >> f')}, ${c('echo yo > f')}`, 1, [R`The last command uses a single ${c('>')}.`], R`The final ${c('>')} replaces the file with one line, ${c('yo')}.`),
      P('olympiad', 'num', 'Counting with uniq -c', R`${c('a.txt')} has the lines x, y, x. How many lines does ${c('cat a.txt a.txt | sort | uniq -c')} output?`, 2, [R`Six lines go in: x four times and y twice.`], R`After sorting, ${c('uniq -c')} prints "4 x" and "2 y": 2 lines.`),
      P('olympiad', 'num', 'All the permission settings', R`Each of the 9 permission bits (rwx for owner, group, others) can be on or off. How many different permission settings are there?`, 512, [R`Each bit doubles the count.`], R`$2^9 = 8^3 = 512$: every three-digit octal number from 000 to 777.`),
      P('olympiad', 'mcq', 'Why uniq needs sort', R`Why do people write ${c('sort | uniq')} instead of just ${c('uniq')}?`, 0, [R`What exactly does ${c('uniq')} compare a line with?`], R`${c('uniq')} only compares each line with the one just before it, so duplicates must be next to each other. Sorting guarantees that.`, { options: ['uniq only removes duplicates that are next to each other', 'uniq only works on numbers', 'sort makes uniq faster but is not needed', 'uniq cannot read from a pipe'] })
    ]
  });
  PB.addDrills('cs-shell', [
    { title: 'Octal permissions', gen: (r) => { const t = () => { const k = r.int(0, 7); return [k, (k & 4 ? 'r' : '-') + (k & 2 ? 'w' : '-') + (k & 1 ? 'x' : '-')]; }; const a = t(), b = t(), d = t(); return { q: R`<p>Which number does ${c('chmod')} need for ${c(a[1] + b[1] + d[1])}?</p>`, answer: a[0] * 100 + b[0] * 10 + d[0], tol: 0.0001, solution: R`<p>r = 4, w = 2, x = 1 per group: ${a[0]}${b[0]}${d[0]}.</p>` }; } },
    { title: 'Climb with ..', gen: (r) => { const names = ['home', 'ada', 'work', 'site', 'img', 'old', 'v2']; const depth = r.int(3, 7), up = r.int(1, depth - 1); const path = '/' + names.slice(0, depth).join('/'), target = '/' + names.slice(0, depth - up).join('/'); return { q: R`<p>You are in ${c(path)}. How many ${c('..')} steps reach ${c(target)}?</p>`, answer: up, tol: 0.0001, solution: R`<p>Each ${c('..')} drops one name: ${up}.</p>` }; } },
    { title: 'Lines after uniq', gen: (r) => { const n = r.int(4, 9), pool = ['a', 'b', 'c', 'd', 'e'].slice(0, r.int(2, 5)); const L = []; for (let i = 0; i < n; i++) L.push(r.pick(pool)); const k = new Set(L).size; return { q: R`<p>A file has the lines ${L.join(', ')}. What count does ${c('sort f | uniq | wc -l')} print?</p>`, answer: k, tol: 0.0001, solution: R`<p>The distinct lines: ${[...new Set(L)].sort().join(', ')}, so ${k}.</p>` }; } }
  ]);

  /* ===================== 2. Bits, bytes and data ===================== */
  PB.addChapter({
    id: 'cs-data', subject: 'computing', num: 2, part: 'How Computers and the Web Work',
    title: 'Bits, Bytes and Data',
    subtitle: R`How a machine of switches stores everything. Binary and hexadecimal, bytes and file sizes, negative numbers and overflow, floating point, and text from ASCII to UTF-8.`,
    big: 'A computer only stores <strong>bits</strong>: switches that are off or on, 0 or 1. Numbers, letters, colours and sounds are all just agreed ways of reading patterns of bits. Change the agreement and the same bits mean something else.',
    goals: ['Convert between binary, decimal and hexadecimal', 'Work out file sizes in bytes, kB and MB', 'Explain two’s complement and integer overflow', 'See why 0.1 + 0.2 is not exactly 0.3', 'Encode text with ASCII and UTF-8'],
    sections: [
      { title: 'Binary: counting with two digits', html: R`
<p>In decimal each place is worth ten times the one to its right: 1, 10, 100… In <strong>binary</strong> each place is worth <em>two</em> times: 1, 2, 4, 8, 16, 32… and each digit, a <strong>bit</strong>, is 0 or 1.</p>
$$1011_2 = 1\cdot8 + 0\cdot4 + 1\cdot2 + 1\cdot1 = 11.$$
<p>To go the other way, take out the largest powers of two: $45 = 32 + 8 + 4 + 1 = 101101_2$. Or divide by 2 repeatedly and read the remainders from the bottom up.</p>
<div class="key"><p>With $n$ bits you can make $2^n$ different patterns, so you can count from $0$ to $2^n - 1$. Each extra bit doubles the range.</p></div>
<p>Why two? Electronics is far more reliable when it only has to tell "high voltage" from "low voltage". Billions of tiny transistor switches, each holding a bit, make up the memory and processor.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is $110010_2$ in decimal?`, 50, [R`Place values from the right: 1, 2, 4, 8, 16, 32.`], R`$32 + 16 + 2 = 50$.`)] },
      { title: 'Bytes, hexadecimal and file sizes', html: R`
<p>Bits come in groups of 8 called <strong>bytes</strong>; one byte holds $2^8 = 256$ values, 0 to 255. Long binary strings are hard to read, so programmers use <strong>hexadecimal</strong> (base 16), with digits 0–9 and A–F. One hex digit is exactly 4 bits, so a byte is two hex digits:</p>
${K('text', R`
binary   1111 1010   0010 1101
hex         F    A      2    D    → 0xFA, 0x2D
decimal       250          45`)}
<p>Colours on the web are written this way: ${c('#FF8800')} is red 255, green 136, blue 0. Sizes go up in thousands: 1 kilobyte (kB) = 1000 bytes, 1 megabyte (MB) = 10⁶, 1 gigabyte (GB) = 10⁹. (Operating systems sometimes use powers of two instead: 1 KiB = 1024 bytes.)</p>
<p>A photo of 1920 × 1080 pixels with 3 bytes per pixel (red, green, blue) is about 6.2 MB before compression. Formats like JPEG and PNG shrink it by exploiting patterns.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is ${c('0x3F')} in decimal?`, 63, [R`$3\cdot16 + 15$.`], R`$48 + 15 = 63$.`)] },
      { title: 'Negative numbers, overflow and floating point', html: R`
<p>Computers store whole numbers in a fixed number of bits, often 32 or 64. For negative numbers they use <strong>two's complement</strong>: the top bit counts as <em>minus</em> its usual value. In 8 bits the top place is worth $-128$, so ${c('11111111')} is $-128 + 127 = -1$ and the range is $-128$ to $127$.</p>
<p>Fixed width means <strong>overflow</strong>: add 1 to the largest value and it wraps around to the smallest. A 32-bit signed integer stops at $2^{31} - 1 = 2\,147\,483\,647$. Real bugs have come from this, from video games to rockets. (Python's integers grow as needed, but C++ and JavaScript arrays of ints do not.)</p>
${K('python', R`
print(0.1 + 0.2)          # 0.30000000000000004
print(0.1 + 0.2 == 0.3)   # False
print(abs((0.1 + 0.2) - 0.3) < 1e-9)   # True: compare with a tolerance`, true)}
<p>Fractions use <strong>floating point</strong>: a binary version of scientific notation with about 16 significant decimal digits. Just as 1/3 has no exact decimal, 0.1 has no exact binary form, so tiny rounding errors appear. Never compare floats with ${c('==')}; check that they are close.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In 8-bit two's complement, what number is ${c('10000001')}?`, -127, [R`The top bit is worth $-128$.`], R`$-128 + 1 = -127$.`)] },
      { title: 'Text: ASCII, Unicode and UTF-8', html: R`
<p>Text is stored as numbers too. <strong>ASCII</strong> (1963) gave 128 characters a number each: ${c('A')} = 65, ${c('a')} = 97, ${c('0')} = 48, space = 32. That covers English, but not é, ж, 中 or 😀.</p>
<p><strong>Unicode</strong> gives every character in every writing system a <strong>code point</strong>, written like U+00E9 (é) or U+1F600 (😀): over 150 000 of them. <strong>UTF-8</strong> stores code points in 1 to 4 bytes. ASCII characters keep their single byte, so old English text is already valid UTF-8; accents take 2 bytes, most Asian scripts 3, and emoji 4.</p>
${K('python', R`
s = "héllo €"
print(len(s))                    # 7 characters
print(len(s.encode("utf-8")))    # 10 bytes
print(ord("A"), chr(66))         # 65 B`, true)}
<p>A file is just bytes; a <strong>format</strong> is the agreement about what they mean. Open a ${c('.png')} as text and you see garbage; read UTF-8 as if it were another encoding and you get "mojibake" like ${c('hÃ©llo')}.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In ASCII ${c('A')} is 65. What number is ${c('E')}?`, 69, [R`Letters are in order.`], R`$65 + 4 = 69$.`)] }
    ],
    labs: [
      { sim: 'bits', title: 'Bits, hex and text', desc: 'Flip bits to build numbers and watch the decimal, hexadecimal and signed values change. Below, type any text and see the exact bytes UTF-8 uses.',
        tasks: ['Make 255 with 8 bits, then press +1. What happens, and why?', 'Turn on Signed. Which pattern is −1? Which is the most negative number?', 'Type your name, then add an emoji. How many bytes does the emoji take?'], params: { width: 8 } },
      { sim: 'code', title: 'Python as a number converter', desc: 'Python has built-in conversions. Run this, then change the numbers.',
        params: { lang: 'python', langs: ['python', 'javascript'], code: { python: 'n = 2024\nprint(bin(n), hex(n), oct(n))\nprint(int("101101", 2), int("ff", 16))\nprint(2 ** 31 - 1)       # largest 32-bit signed int\nprint(0.1 + 0.2)\nfor ch in "Aé€😀":\n    print(ch, hex(ord(ch)), ch.encode("utf-8"))\n', javascript: 'const n = 2024;\nconsole.log(n.toString(2), n.toString(16));\nconsole.log(parseInt("101101", 2), parseInt("ff", 16));\nconsole.log(2 ** 53 + 1);   // past the safe integer limit\nconsole.log(0.1 + 0.2);\nfor (const ch of "Aé€😀") console.log(ch, ch.codePointAt(0).toString(16), new TextEncoder().encode(ch));\n' } } },
      { sim: 'code', title: 'Challenge: binary to decimal', desc: 'Your first judged problem. Read the input, print the answer, and press Submit to run it against hidden tests.', params: { challenge: 'cs-bin2dec' } }
    ],
    formulas: [
      ['Values with n bits', '2^n'], ['Unsigned range', '0 \\ldots 2^n - 1'], ['Two’s complement range', '-2^{n-1} \\ldots 2^{n-1} - 1'], ['Hex digit', '1\\ \\text{hex digit} = 4\\ \\text{bits},\\ 1\\ \\text{byte} = 8\\ \\text{bits}'],
      ['Sizes', '1\\,\\text{kB} = 10^3\\,\\text{B},\\ 1\\,\\text{KiB} = 2^{10} = 1024\\,\\text{B}'], ['Conversions in Python', 'bin(45)  hex(255)  int("101101", 2)  int("ff", 16)\nord("A") == 65   chr(97) == "a"', 'python'], ['Comparing floats', 'abs(a - b) < 1e-9', 'python']
    ],
    problems: [
      P('concept', 'num', 'One byte', R`How many different values can one byte (8 bits) hold?`, 256, [R`$2^n$ patterns for $n$ bits.`], R`$2^8 = 256$.`),
      P('concept', 'num', 'Bits per hex digit', R`How many bits does one hexadecimal digit stand for?`, 4, [R`16 = $2^?$`], R`$16 = 2^4$, so 4 bits.`),
      P('concept', 'num', 'ASCII arithmetic', R`${c('A')} is 65 in ASCII and lower-case letters start at ${c('a')} = 97. What is ${c('c')}?`, 99, [R`a, b, c…`], R`$97 + 2 = 99$.`),
      P('concept', 'mcq', 'Floating-point surprise', R`In Python, what does ${c('0.1 + 0.2 == 0.3')} give?`, 1, [R`0.1 has no exact binary form.`], R`${c('False')}: the sum is 0.30000000000000004.`, { options: [c('True'), c('False'), 'an error', c('None')] }),
      P('core', 'num', 'Binary to decimal', R`Convert $101101_2$ to decimal.`, 45, [R`Place values 32, 16, 8, 4, 2, 1.`], R`$32 + 8 + 4 + 1 = 45$.`),
      P('core', 'num', 'Hex to decimal', R`What is ${c('0xFF')} in decimal?`, 255, [R`$15\cdot16 + 15$.`], R`255, the largest byte.`),
      P('core', 'num', 'Raw image size', R`An uncompressed 1920 × 1080 image uses 3 bytes per pixel. How many megabytes ($10^6$ bytes) is that?`, 6.2208, [R`Pixels × 3 bytes.`], R`$1920\cdot1080\cdot3 = 6\,220\,800$ bytes ≈ 6.22 MB.`, { tol: 0.01 }),
      P('core', 'num', 'Two’s complement', R`What value does ${c('11111110')} have as an 8-bit two's complement number?`, -2, [R`$-128 + 64 + 32 + 16 + 8 + 4 + 2$.`], R`$-128 + 126 = -2$.`),
      P('core', 'num', 'Bits needed', R`What is the fewest bits that can give every one of 1000 students a different ID number?`, 10, [R`$2^9 = 512$ is not enough.`], R`$2^{10} = 1024 \ge 1000$: 10 bits.`),
      P('olympiad', 'num', 'Overflow', R`A 32-bit signed integer holds $2^{31} - 1 = 2147483647$. What does it become after adding 1, if it wraps around?`, -2147483648, [R`Wrapping goes to the most negative value.`], R`$-2^{31} = -2147483648$. (In C++ signed overflow is actually undefined behaviour, so never rely on it.)`, { tol: 0 }),
      P('olympiad', 'num', 'UTF-8 bytes', R`How many bytes does the string ${c('héllo€')} take in UTF-8? (é is U+00E9, € is U+20AC.)`, 9, [R`ASCII: 1 byte. U+0080 to U+07FF: 2 bytes. U+0800 to U+FFFF: 3 bytes.`], R`h, l, l, o: 4 bytes; é: 2; €: 3. Total 9.`),
      P('olympiad', 'mcq', 'Mojibake', R`A web page saved in UTF-8 shows ${c('cafÃ©')} instead of ${c('café')}. What went wrong?`, 2, [R`é takes two bytes in UTF-8.`], R`The two bytes of é were each read as a separate one-byte character (as in the old Latin-1 encoding). The fix is to declare ${c('<meta charset="utf-8">')}.`, { options: ['The file is corrupted', 'The font is missing é', 'UTF-8 bytes were read as a one-byte-per-character encoding', 'é is not in Unicode'] })
    ]
  });
  PB.addDrills('cs-data', [
    { title: 'Binary to decimal', gen: (r) => { const n = r.int(5, 255); return { q: R`<p>Convert ${c(n.toString(2))} (binary) to decimal.</p>`, answer: n, tol: 0.0001, solution: R`<p>Add the place values of the 1 bits: ${n}.</p>` }; } },
    { title: 'Hex to decimal', gen: (r) => { const n = r.int(16, 4095); return { q: R`<p>What is ${c('0x' + n.toString(16).toUpperCase())} in decimal?</p>`, answer: n, tol: 0.0001, solution: R`<p>Each hex place is worth 16 times the next: ${n}.</p>` }; } },
    { title: 'Bits needed', gen: (r) => { const n = r.int(3, 5000); const b = Math.ceil(Math.log2(n)); return { q: R`<p>What is the fewest bits that can label ${n} different things?</p>`, answer: b, tol: 0.0001, solution: R`<p>$2^{${b - 1}} = ${Math.pow(2, b - 1)}$ is too few, $2^{${b}} = ${Math.pow(2, b)}$ is enough: ${b} bits.</p>` }; } }
  ]);
  PB.addChallenge({ id: 'cs-bin2dec', chapter: 'cs-data', title: 'Binary to decimal', level: 'easy',
    statement: R`<p>Each line of input is a binary number. Print each one in decimal, on its own line.</p>`,
    input: R`<p>The first line holds $n$ ($1 \le n \le 100$). Then $n$ lines, each a string of 1 to 60 binary digits.</p>`,
    output: R`<p>$n$ lines, the decimal values.</p>`,
    samples: [{ in: '3\n101\n11111111\n0\n', out: '5\n255\n0\n' }],
    tests: [{ in: '2\n1\n10\n', out: '1\n2\n' }, { in: '4\n1101\n100000\n111\n1010101010\n', out: '13\n32\n7\n682\n' }, { in: '1\n111111111111111111111111111111111111111111111111111111111111\n', out: '1152921504606846975\n' }],
    hints: [R`Work left to right: value = value × 2 + digit.`, R`In Python ${c('int(s, 2)')} does it in one go. In C++ use ${c('long long')} (60 bits!). In JavaScript use ${c('BigInt')} for very long inputs.`],
    starter: { python: 'n = int(input())\nfor _ in range(n):\n    s = input().strip()\n    # convert s from binary and print it\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        string s;\n        cin >> s;\n        long long v = 0;\n        // build v from the digits of s\n        cout << v << "\\n";\n    }\n}\n', javascript: 'const n = Number(readline());\nfor (let i = 0; i < n; i++) {\n  const s = readline().trim();\n  // convert s and print it\n}\n' },
    solution: { python: 'n = int(input())\nfor _ in range(n):\n    print(int(input().strip(), 2))\n', cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    while (n--) {\n        string s; cin >> s;\n        long long v = 0;\n        for (char ch : s) v = v * 2 + (ch - \'0\');\n        cout << v << "\\n";\n    }\n}\n' } });

  /* ===================== 3. The internet ===================== */
  PB.addChapter({
    id: 'cs-internet', subject: 'computing', num: 3, part: 'How Computers and the Web Work',
    title: 'How the Internet Works',
    subtitle: R`A network of networks. Packets and routers, IP addresses and ports, TCP and UDP, the layers of the internet, and DNS, its phone book.`,
    big: 'The internet does not send your message as one piece down one wire. It chops it into small <strong>packets</strong>, each labelled with an address, and lets thousands of independent routers pass them along, hop by hop. TCP at the far end puts them back in order and asks again for any that got lost.',
    goals: ['Explain packet switching and routing', 'Read IPv4 addresses and ports', 'Compare TCP and UDP', 'Name the layers of the internet', 'Trace a DNS lookup'],
    sections: [
      { title: 'Packets and routers', html: R`
<p>The old telephone network reserved a whole circuit for each call. The internet uses <strong>packet switching</strong>: data is split into <strong>packets</strong> of up to about 1500 bytes, each with a header saying where it comes from and where it is going. Packets from millions of people share the same cables.</p>
<p><strong>Routers</strong> are the junctions. Each one looks at a packet's destination, checks its routing table, and forwards it one hop closer. No router knows the whole route, and if a cable is cut, routers find another way. Packets of one message can even take different paths and arrive out of order.</p>
<p>The "internet" is literally an inter-network: home networks, school networks, mobile networks and the big backbone networks of internet providers, joined together by agreement to pass each other's packets. Long distances are covered by fibre-optic cables, including ones on the ocean floor, where light travels at about $2\times10^8$ m/s.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A cable between two routers is cut in the middle of a download. What usually happens?`, ['The download fails for good', 'Routers send later packets along another path', 'All packets are lost forever', 'The internet shuts down'], 1, [R`No single path is required.`], R`The network routes around damage; TCP resends anything that was lost.`)] },
      { title: 'Addresses and ports', html: R`
<p>Every device on the internet has an <strong>IP address</strong>. An IPv4 address is 32 bits, written as four bytes: ${c('142.250.180.14')}. That allows only $2^{32} \approx 4.3$ billion addresses, fewer than the devices in use, so homes share one public address between all their devices (<strong>NAT</strong>, using private addresses like ${c('192.168.1.20')}), and the newer <strong>IPv6</strong> uses 128 bits: ${c('2001:db8::1')}.</p>
<p>One computer runs many programs, so packets also carry a <strong>port</strong> number, 0 to 65535, saying which program should get them. Well-known ports: 80 for HTTP, 443 for HTTPS, 22 for SSH, 53 for DNS. ${c('127.0.0.1')} (also called ${c('localhost')}) always means "this machine".</p>
<p>A <strong>subnet</strong> like ${c('192.168.1.0/24')} means "all addresses whose first 24 bits match", leaving 8 bits, 256 addresses, for the devices on that network.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many addresses are in the subnet ${c('10.0.0.0/22')}?`, 1024, [R`$32 - 22$ bits are free.`], R`$2^{10} = 1024$.`)] },
      { title: 'TCP, UDP and the layers', html: R`
<p>IP only does its best: packets can be lost, duplicated or reordered. On top of it sit two transport protocols:</p>
<ul><li><strong>TCP</strong> gives a reliable, ordered stream. It numbers every byte, the receiver sends <strong>acknowledgements</strong>, lost packets are <strong>retransmitted</strong>, and it slows down when the network is congested. A connection starts with a three-way handshake: SYN, SYN-ACK, ACK. Web pages, email and file downloads use TCP.</li>
<li><strong>UDP</strong> just sends packets, with no guarantees and no handshake. Late data is useless for a video call or an online game, so they prefer UDP's speed.</li></ul>
<p>The design is layered, and each layer only talks to the one below:</p>
${K('text', R`
Application   HTTP, DNS, email, games      "what we are saying"
Transport     TCP, UDP (ports)             "which program, reliably or not"
Internet      IP (addresses, routing)      "which computer, hop by hop"
Link          Wi-Fi, Ethernet, fibre       "this cable or radio hop"`)}
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which protocol would a live video call most likely use for its audio and video?`, ['TCP, because nothing may be lost', 'UDP, because late packets are useless anyway', 'DNS', 'FTP'], 1, [R`What is a resent packet worth if it arrives after its moment has passed?`], R`UDP: speed matters more than perfection, and a lost frame is skipped.`)] },
      { title: 'DNS: the phone book', html: R`
<p>People remember names, routers need numbers. The <strong>Domain Name System</strong> turns ${c('example.com')} into ${c('93.184.215.14')}. It is a distributed, hierarchical database:</p>
<ol><li>Your computer asks a <strong>resolver</strong> (from your internet provider, or a public one like ${c('1.1.1.1')}).</li>
<li>The resolver asks a <strong>root server</strong>, which says who handles ${c('.com')}.</li>
<li>The ${c('.com')} servers say which <strong>name servers</strong> are responsible for ${c('example.com')}.</li>
<li>Those answer with the address (an <strong>A record</strong>, or AAAA for IPv6).</li></ol>
<p>Every answer comes with a <strong>TTL</strong> (time to live) saying how long it may be cached, so repeat lookups are almost instant. Your computer also checks the file ${c('/etc/hosts')} first, which is why editing it can redirect a name.</p>
${K('shell', R`
$ nslookup example.com
Name:    example.com
Address: 93.184.215.14
$ ping -c 1 example.com
64 bytes from 93.184.215.14: time=87.3 ms`)}
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Why does the second visit to a website in a few minutes usually skip the DNS lookup?`, ['DNS answers are cached until their TTL runs out', 'The website remembers you', 'Routers store the page', 'DNS only works once'], 0, [R`What does TTL stand for?`], R`Resolvers and browsers cache answers for the TTL.`)] }
    ],
    labs: [
      { sim: 'packets', title: 'Packets on a network', desc: 'Send a message from your computer to a server. It is cut into numbered packets that find their own way through the routers. Turn up the loss, or click links to cut them, and watch TCP-style retransmission and reassembly.',
        tasks: ['With 0% loss, do the packets all take the same route? Do they arrive in order?', 'Cut links until only one path remains, then cut that too. What happens?', 'Set loss to 40%. Roughly how many packets get resent?'] },
      { sim: 'code', title: 'Challenge: valid IPv4 addresses', desc: 'Check addresses the way a network program must.', params: { challenge: 'cs-ipv4' } }
    ],
    formulas: [['IPv4 addresses', '2^{32} \\approx 4.3\\times10^9'], ['IPv6 addresses', '2^{128} \\approx 3.4\\times10^{38}'], ['Subnet /k', '2^{32-k}\\ \\text{addresses}'], ['Ports', '0 \\ldots 65535;\\ 80\\ \\text{HTTP},\\ 443\\ \\text{HTTPS},\\ 22\\ \\text{SSH},\\ 53\\ \\text{DNS}'], ['Propagation delay', 't = d / v,\\ v_{\\text{fibre}} \\approx 2\\times10^8\\ \\text{m/s}'], ['Look things up', 'nslookup example.com\nping example.com\ntraceroute example.com', 'shell']],
    problems: [
      P('concept', 'num', 'IPv4 size', R`How many bits are in an IPv4 address?`, 32, [R`Four bytes.`], R`$4 \times 8 = 32$.`),
      P('concept', 'mcq', 'Names to numbers', R`Which system turns ${c('wikipedia.org')} into an IP address?`, 2, [R`It is the internet's phone book.`], R`DNS, the Domain Name System.`, { options: ['HTTP', 'TCP', 'DNS', 'HTML'] }),
      P('concept', 'mcq', 'Reliable delivery', R`Which protocol guarantees that bytes arrive complete and in order?`, 0, [R`It uses acknowledgements and retransmission.`], R`TCP.`, { options: ['TCP', 'UDP', 'IP', 'Wi-Fi'] }),
      P('concept', 'num', 'HTTPS port', R`Which port does HTTPS use by default?`, 443, [R`HTTP is 80.`], R`443.`),
      P('core', 'num', 'Every IPv4 address', R`How many IPv4 addresses exist in total?`, 4294967296, [R`$2^{32}$.`], R`$2^{32} = 4\,294\,967\,296$, about 4.3 billion.`, { tol: 1e-6 }),
      P('core', 'num', 'A /24 network', R`How many addresses does the subnet ${c('192.168.1.0/24')} contain?`, 256, [R`$32 - 24 = 8$ free bits.`], R`$2^8 = 256$ (two are reserved, so 254 devices).`),
      P('core', 'num', 'Speed of light limit', R`London to Sydney is about 17 000 km of fibre, where light travels at $2\times10^8$ m/s. What is the shortest possible round-trip time in milliseconds?`, 170, [R`There and back is 34 000 km.`], R`$3.4\times10^7 / 2\times10^8 = 0.17$ s = 170 ms. Real pings are higher because cables are not straight.`, { tol: 0.02 }),
      P('core', 'num', 'Packets in a file', R`A 1 000 000-byte file is sent in packets carrying 1460 bytes of data each. How many packets are needed?`, 685, [R`Round up.`], R`$1\,000\,000 / 1460 = 684.9$, so 685 packets.`),
      P('olympiad', 'num', 'Waiting for the first byte', R`The round-trip time to a server is 100 ms. TCP needs one round trip to connect, and the HTTP request and response take another. Ignoring DNS and TLS, how many milliseconds pass before the first byte of the page arrives?`, 200, [R`Count round trips.`], R`2 round trips = 200 ms. HTTPS adds about one more for the TLS handshake.`),
      P('olympiad', 'num', 'IPv6 versus IPv4', R`IPv6 has $2^{128}$ addresses. How many times more is that than IPv4? Give $\log_2$ of the ratio.`, 96, [R`Divide powers by subtracting exponents.`], R`$2^{128}/2^{32} = 2^{96}$, about $7.9\times10^{28}$ times as many.`),
      P('olympiad', 'mcq', 'Out of order', R`Packets 1, 2, 3 of a TCP stream arrive in the order 1, 3, 2. What does the receiving program see?`, 1, [R`TCP sorts by sequence number before handing data up.`], R`TCP buffers packet 3 until 2 arrives, then delivers 1, 2, 3. Programs always see the bytes in order.`, { options: ['1, 3, 2', '1, 2, 3', 'Only 1 and 2', 'An error'] })
    ]
  });
  PB.addDrills('cs-internet', [
    { title: 'Subnet size', gen: (r) => { const k = r.int(16, 30); return { q: R`<p>How many addresses are in a ${c('/' + k)} IPv4 subnet?</p>`, answer: Math.pow(2, 32 - k), tol: 0.0001, solution: R`<p>$2^{32 - ${k}} = ${Math.pow(2, 32 - k)}$.</p>` }; } },
    { title: 'Round trips', gen: (r) => { const rtt = r.int(10, 300), tls = r.pick([0, 1]); return { q: R`<p>RTT ${rtt} ms. TCP handshake (1 RTT)${tls ? ', TLS 1.3 (1 RTT)' : ''} and the HTTP request (1 RTT). How many ms until the first byte?</p>`, answer: rtt * (2 + tls), tol: 0.0001, solution: R`<p>${2 + tls} round trips: ${rtt * (2 + tls)} ms.</p>` }; } },
    { title: 'Packets needed', gen: (r) => { const kb = r.int(5, 900), p = r.pick([512, 1000, 1460]); return { q: R`<p>A ${kb} kB file (1 kB = 1000 bytes) is sent with ${p} bytes of data per packet. How many packets?</p>`, answer: Math.ceil(kb * 1000 / p), tol: 0.0001, solution: R`<p>Round up ${kb * 1000}/${p}: ${Math.ceil(kb * 1000 / p)}.</p>` }; } }
  ]);
  PB.addChallenge({ id: 'cs-ipv4', chapter: 'cs-internet', title: 'Valid IPv4 addresses', level: 'medium',
    statement: R`<p>An IPv4 address is four numbers from 0 to 255 separated by dots, like ${c('192.168.1.20')}. A number may not have leading zeros (${c('01')} is not allowed, but ${c('0')} is), and nothing else may appear. For each line, print ${c('YES')} if it is a valid address and ${c('NO')} otherwise.</p>`,
    input: R`<p>The first line holds $n$ ($1 \le n \le 1000$). Each of the next $n$ lines holds one string of at most 30 visible characters.</p>`,
    output: R`<p>$n$ lines, each ${c('YES')} or ${c('NO')}.</p>`,
    samples: [{ in: '5\n192.168.1.20\n256.1.1.1\n10.0.0\n1.2.3.04\n0.0.0.0\n', out: 'YES\nNO\nNO\nNO\nYES\n' }],
    tests: [{ in: '6\n255.255.255.255\n1.2.3.4.5\na.b.c.d\n1..2.3\n127.0.0.1\n-1.2.3.4\n', out: 'YES\nNO\nNO\nNO\nYES\nNO\n' }, { in: '4\n00.1.1.1\n9.9.9.9\n300.300.300.300\n1.1.1.\n', out: 'NO\nYES\nNO\nNO\n' }],
    hints: [R`Split on ${c('.')}: you need exactly 4 parts.`, R`Each part must be non-empty, all digits, at most 3 long, no leading zero unless it is exactly ${c('0')}, and at most 255.`],
    starter: { python: 'def valid(s):\n    parts = s.split(".")\n    # check the parts\n    return False\n\nn = int(input())\nfor _ in range(n):\n    print("YES" if valid(input().strip()) else "NO")\n' },
    solution: { python: 'def valid(s):\n    parts = s.split(".")\n    if len(parts) != 4:\n        return False\n    for p in parts:\n        if not p.isdigit() or len(p) > 3:\n            return False\n        if len(p) > 1 and p[0] == "0":\n            return False\n        if int(p) > 255:\n            return False\n    return True\n\nn = int(input())\nfor _ in range(n):\n    print("YES" if valid(input().strip()) else "NO")\n' } });

  /* ===================== 4. The web ===================== */
  PB.addChapter({
    id: 'cs-web', subject: 'computing', num: 4, part: 'How Computers and the Web Work',
    title: 'How the Web Works',
    subtitle: R`What happens when you press Enter. Clients and servers, URLs, HTTP requests and responses, status codes and cookies, HTTPS, and how a browser turns HTML into pixels.`,
    big: 'The web is a conversation between your browser (the <strong>client</strong>) and a <strong>server</strong>, in a simple text language called HTTP: "GET me this page, please." "200 OK, here it is." Everything else, from logins to video, is built on that exchange, wrapped in encryption by HTTPS.',
    goals: ['Take a URL apart', 'Read and write HTTP requests and responses', 'Know the main methods and status codes', 'Explain cookies and why HTTP is stateless', 'Describe what HTTPS protects', 'Follow the browser from HTML to pixels'],
    sections: [
      { title: 'Clients, servers and URLs', html: R`
<p>A <strong>server</strong> is a program (on a computer somewhere) that waits for requests and answers them. Your browser is a <strong>client</strong>. A <strong>URL</strong> tells the client exactly what to ask for:</p>
${K('text', R`
https://shop.example.com:443/books/search?q=python&page=2#results
└─┬─┘   └──────┬───────┘└┬┘└─────┬─────┘└────────┬───────┘└──┬──┘
scheme       host      port    path          query        fragment`)}
<p>The <strong>scheme</strong> is the protocol; the <strong>host</strong> is looked up in DNS; the <strong>port</strong> is usually left out (443 for https, 80 for http); the <strong>path</strong> names the resource on that server; the <strong>query</strong> passes extra parameters as ${c('key=value')} pairs joined by ${c('&')}; and the <strong>fragment</strong> after ${c('#')} never leaves your browser: it just scrolls to a spot in the page.</p>
<p>A <strong>static</strong> site sends the same files to everyone. A <strong>dynamic</strong> one runs code on the server (Python, JavaScript, PHP…) to build each answer, often from a database.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which part of ${c('https://site.org/a/b?x=1#top')} is never sent to the server?`, [c('/a/b'), c('x=1'), c('#top'), c('site.org')], 2, [R`It only tells the browser where to scroll.`], R`The fragment ${c('#top')} stays in the browser.`)] },
      { title: 'HTTP: requests and responses', html: R`
<p>HTTP messages are plain text. A <strong>request</strong> has a method, a path and headers; a <strong>response</strong> has a status code, headers and usually a body:</p>
${K('http', R`
GET /books/42 HTTP/1.1
Host: shop.example.com
Accept: application/json
Cookie: session=7f3a9c

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 41

{"id": 42, "title": "Think Python"}`)}
<p>The <strong>methods</strong> say what you want: ${c('GET')} reads, ${c('POST')} creates or submits, ${c('PUT')} replaces, ${c('DELETE')} removes. The <strong>status code</strong> says how it went: <b>2xx</b> success (200 OK, 201 Created), <b>3xx</b> go elsewhere (301 Moved), <b>4xx</b> your mistake (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), <b>5xx</b> the server's mistake (500, 503).</p>
<p>HTTP is <strong>stateless</strong>: each request stands alone, and the server does not remember you. <strong>Cookies</strong> fix that. The server sends ${c('Set-Cookie: session=7f3a9c')}, the browser stores it and sends it back with every later request, and the server looks the session up. APIs usually exchange <strong>JSON</strong>, data written like JavaScript objects.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A request asks for a page that does not exist. What status code comes back?`, 404, [R`4xx means the client asked for something wrong.`], R`404 Not Found.`)] },
      { title: 'HTTPS: encryption and trust', html: R`
<p>Plain HTTP crosses many networks, Wi-Fi in a café, your provider, routers, in readable text. Anyone on the way could read or change it. <strong>HTTPS</strong> is HTTP inside <strong>TLS</strong>, which gives three things:</p>
<ul><li><strong>Confidentiality</strong>: the contents (path, headers, cookies, passwords) are encrypted.</li>
<li><strong>Integrity</strong>: any change in transit is detected.</li>
<li><strong>Authentication</strong>: the server shows a <strong>certificate</strong>, signed by a certificate authority your browser trusts, proving it really is ${c('bank.com')}.</li></ul>
<p>During the TLS handshake, the two sides agree on a fresh secret key using public-key cryptography (the maths of modular arithmetic and elliptic curves), then switch to fast symmetric encryption. What HTTPS does <em>not</em> hide: which site's address you connect to, and how much data flows. And a padlock only says the connection is private, not that the site is honest.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`On public Wi-Fi you log in to a site over HTTPS. What can someone else on the Wi-Fi see?`, ['Your password', 'The pages you read on that site', 'That you connected to that site’s address, but not the contents', 'Nothing at all'], 2, [R`The address has to be visible for routing.`], R`They can see the server you talk to and the amount of traffic, but not the contents.`)] },
      { title: 'From HTML to pixels', html: R`
<p>When the response arrives, the browser:</p>
<ol><li><strong>Parses the HTML</strong> into the <strong>DOM</strong>, a tree of elements (${c('<html>')}, ${c('<body>')}, ${c('<p>')}…).</li>
<li>Finds the linked <strong>CSS</strong>, <strong>JavaScript</strong> and images, and requests each one (over the same connection).</li>
<li>Applies the CSS rules to work out each element's size, position and colour (<strong>layout</strong>), then <strong>paints</strong> pixels.</li>
<li>Runs the JavaScript, which can change the DOM at any time, so the page reacts to clicks without reloading.</li></ol>
${K('web', R`
<!doctype html>
<html>
  <head>
    <title>Hi</title>
    <style> h1 { color: teal; } </style>
  </head>
  <body>
    <h1>Hello, web</h1>
    <button onclick="this.textContent = 'Clicked!'">Click me</button>
  </body>
</html>`, true)}
<p>Speed depends on two things: <strong>latency</strong> (the round-trip time, set by distance) and <strong>bandwidth</strong> (bytes per second). Caching and <strong>CDNs</strong>, copies of a site's files on servers near you, cut the latency.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which language decides a web page's colours and layout?`, ['HTML', 'CSS', 'HTTP', 'DNS'], 1, [R`HTML says what things are; something else says how they look.`], R`CSS (Cascading Style Sheets).`)] }
    ],
    labs: [
      { sim: 'journey', title: 'The journey of a request', desc: 'Step through everything that happens between pressing Enter on <code>https://example.com</code> and seeing the page: DNS, the TCP handshake, TLS, then HTTP. Change the round-trip time and see what dominates.',
        tasks: ['Count the round trips before the first byte with HTTPS on and off.', 'Turn on "Address already cached". How much time is saved?', 'With a 300 ms round trip (a satellite link), how long does the page take?'] },
      { sim: 'http', title: 'Talk HTTP to a server', desc: 'A small pretend server with a web page and a JSON API. Send requests, see the raw text that goes over the wire, and collect status codes.',
        tasks: ['Get a 200, a 201, a 301, a 401, a 404 and a 500.', 'Add a user with POST, then list the users with GET.', 'Get the secret: what must you do first, and how does the server know?'] },
      { sim: 'code', title: 'Challenge: take a URL apart', desc: '', params: { challenge: 'cs-url' } }
    ],
    formulas: [['URL', 'scheme://host:port/path?key=value&k2=v2#fragment', 'text'], ['Request', 'GET /path HTTP/1.1\nHost: example.com\nHeader: value\n\n(body)', 'http'], ['Response', 'HTTP/1.1 200 OK\nContent-Type: text/html\n\n(body)', 'http'],
      ['Methods', 'GET read · POST create · PUT replace · DELETE remove', 'text'], ['Status codes', '2xx ok · 3xx redirect · 4xx client error · 5xx server error\n200 201 204 301 304 400 401 403 404 500 503', 'text'], ['Fetch a page from the shell', 'curl -i https://example.com', 'shell']],
    problems: [
      P('concept', 'mcq', 'Who is the client?', R`When you read a web page, the client is…`, 0, [R`The client asks; the server answers.`], R`Your browser.`, { options: ['your browser', 'the web server', 'the DNS resolver', 'the router'] }),
      P('concept', 'num', 'Created', R`A ${c('POST')} successfully creates a new item. Which status code is the most fitting reply?`, 201, [R`2xx, but more specific than 200.`], R`201 Created.`),
      P('concept', 'mcq', 'Stateless', R`HTTP is "stateless". That means…`, 2, [R`Think about how a server could know you are logged in.`], R`Each request is independent; cookies or tokens carry the state.`, { options: ['it never changes data', 'it cannot send images', 'the server does not remember earlier requests by itself', 'it has no headers'] }),
      P('concept', 'mcq', 'Default port', R`${c('http://example.com/')} with no port number connects to port…`, 0, [R`HTTPS uses 443.`], R`80.`, { options: ['80', '443', '8080', '22'] }),
      P('core', 'mcq', 'Where did it go?', R`A server answers ${c('301 Moved Permanently')}. How does the browser know where to go?`, 1, [R`Look at the headers.`], R`The ${c('Location')} header gives the new URL, and the browser requests it.`, { options: ['It guesses', 'The Location header', 'The body is always the new page', 'DNS tells it'] }),
      P('core', 'num', 'Whose fault?', R`Which status code means "the server crashed while handling your request"?`, 500, [R`5xx is the server's fault.`], R`500 Internal Server Error.`),
      P('core', 'num', 'Query parameters', R`How many query parameters are in ${c('/search?q=cats&page=3&sort=new&lang=en')}?`, 4, [R`They are joined by ${c('&')}.`], R`q, page, sort, lang: 4.`),
      P('core', 'mcq', 'Cookies', R`After you log in, how does the server recognise your next request?`, 3, [R`Look for Set-Cookie.`], R`It sent a session cookie; the browser includes it in every later request.`, { options: ['By your IP address only', 'By your browser version', 'It cannot', 'Your browser sends back the cookie it was given'] }),
      P('core', 'num', 'Page load time', R`A page needs the HTML, then (after reading it) 1 CSS file and 1 JS file fetched in parallel. Round trip 50 ms, the connection is already open, and transfer time is negligible. How many milliseconds until everything has arrived?`, 100, [R`Two waves of requests.`], R`HTML: 50 ms, then CSS and JS together: 50 ms. Total 100 ms.`),
      P('olympiad', 'num', 'Latency or bandwidth?', R`Downloading a 2 MB file ($2\times10^6$ bytes) over a link of 10 megabits per second with a 100 ms round trip. Count one round trip for the request, then the transfer. How many milliseconds in total?`, 1700, [R`10 Mbit/s = 1.25 MB/s.`], R`Transfer: $2\times10^6\cdot8 / 10^7 = 1.6$ s. Plus 0.1 s: 1700 ms.`, { tol: 0.01 }),
      P('olympiad', 'mcq', 'What HTTPS hides', R`Which of these does HTTPS keep secret from someone watching the network?`, 1, [R`The packets still need a visible destination.`], R`The full path and query (like ${c('/search?q=…')}) travel inside the encryption. The server's address and the amount of data do not.`, { options: ['The server’s IP address', 'The path and query of the URL', 'How many bytes were sent', 'When you connected'] }),
      P('olympiad', 'mcq', 'Idempotent methods', R`Sending the same request twice should have the same effect as sending it once. For which method is that usually <em>not</em> true?`, 1, [R`Which method creates something new each time?`], R`${c('POST')}: two POSTs make two items. That is why browsers warn before resubmitting a form.`, { options: ['GET', 'POST', 'PUT', 'DELETE'] })
    ]
  });
  PB.addDrills('cs-web', [
    { title: 'Status code families', gen: (r) => { const L = [[200, 'success'], [201, 'success'], [204, 'success'], [301, 'redirect'], [304, 'redirect'], [400, 'client error'], [401, 'client error'], [404, 'client error'], [500, 'server error'], [503, 'server error']]; const x = r.pick(L); return { q: R`<p>What is the first digit of a status code that means "${x[1]}"?</p>`, answer: Math.floor(x[0] / 100), tol: 0.0001, solution: R`<p>${x[1]}: ${Math.floor(x[0] / 100)}xx, for example ${x[0]}.</p>` }; } },
    { title: 'Count query parameters', gen: (r) => { const n = r.int(1, 6), ks = ['q', 'page', 'sort', 'lang', 'limit', 'from', 'to']; return { q: R`<p>How many query parameters are in ${c('/api?' + ks.slice(0, n).map((k, i) => k + '=' + (i + 1)).join('&'))}?</p>`, answer: n, tol: 0.0001, solution: R`<p>${n}.</p>` }; } },
    { title: 'Transfer time', gen: (r) => { const mb = r.int(1, 50), mbps = r.pick([5, 10, 20, 50, 100]); const s = mb * 8 / mbps; return { q: R`<p>How many seconds does a ${mb} MB file take over a ${mbps} Mbit/s link (ignoring latency)?</p>`, answer: s, tol: 0.01, solution: R`<p>${mb} MB = ${mb * 8} Mbit; ÷ ${mbps} = ${PB.fmt(s, 3)} s.</p>` }; } }
  ]);
  PB.addChallenge({ id: 'cs-url', chapter: 'cs-web', title: 'Take a URL apart', level: 'easy',
    statement: R`<p>Given a URL of the form ${c('scheme://host[:port]/path?query')} (the port, the path and the query may each be missing), print four lines: the scheme, the host, the port, and the path. If the port is missing, use 80 for ${c('http')} and 443 for ${c('https')}. If the path is missing, print ${c('/')}. Ignore the query and any ${c('#fragment')}.</p>`,
    input: R`<p>One line holding the URL (no spaces, at most 200 characters, scheme is ${c('http')} or ${c('https')}).</p>`,
    output: R`<p>Four lines: scheme, host, port, path.</p>`,
    samples: [{ in: 'https://shop.example.com/books/search?q=python\n', out: 'https\nshop.example.com\n443\n/books/search\n' }, { in: 'http://localhost:8000\n', out: 'http\nlocalhost\n8000\n/\n' }],
    tests: [{ in: 'http://a.b/c/d/e.html#top\n', out: 'http\na.b\n80\n/c/d/e.html\n' }, { in: 'https://x.org:8443/?a=1\n', out: 'https\nx.org\n8443\n/\n' }, { in: 'https://site.io#frag\n', out: 'https\nsite.io\n443\n/\n' }],
    hints: [R`Split off the scheme at ${c('://')}. Then cut the rest at the first ${c('#')} and the first ${c('?')}.`, R`The host part ends at the first ${c('/')}; a ${c(':')} inside it starts the port.`],
    starter: { python: 'url = input().strip()\nscheme, rest = url.split("://", 1)\n# remove #fragment and ?query, then split host from path\n', javascript: 'const url = readline().trim();\n// try: const [scheme, rest] = url.split("://");\n' },
    solution: { python: 'url = input().strip()\nscheme, rest = url.split("://", 1)\nrest = rest.split("#", 1)[0].split("?", 1)[0]\nif "/" in rest:\n    hostport, path = rest.split("/", 1)\n    path = "/" + path\nelse:\n    hostport, path = rest, "/"\nif ":" in hostport:\n    host, port = hostport.split(":")\nelse:\n    host, port = hostport, "443" if scheme == "https" else "80"\nprint(scheme, host, port, path, sep="\\n")\n' } });
})();
