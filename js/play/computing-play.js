/* Computing in the play layer: a prediction for each chapter's first lab, "In the wild" cards,
   a campaign region, and the Hall of computing card collection. */
(function () {
  const Q = (q, o, a, how, why) => ({ q: q, o: o, a: a, how: how, why: why });
  const c = (s) => '<code>' + PB.escHTML(s) + '</code>';
  PB.addPredictions({
    'cs-shell': Q('You run ' + c('ls') + ' in your home folder. Will it show the file ' + c('.secret') + '?', ['No: names starting with a dot are hidden', 'Yes: ls shows everything', 'Only if you are the administrator'], 0, 'type ls, then ls -a, in the terminal.', 'By convention, files whose names start with a dot are hidden from plain ls. ls -a ("all") shows them, along with . and .. themselves.'),
    'cs-data': Q('An 8-bit unsigned number holds 255 (all ones). What do you get when you add 1?', ['0: it wraps around', '256', 'An error'], 0, 'make 255 with 8 bits and press +1.', 'There is no ninth bit to carry into, so 11111111 + 1 = 1 00000000 loses the top carry and becomes 0. That is overflow.'),
    'cs-internet': Q('With no packet loss and no cut links, do all the packets of one message take the same route?', ['Not necessarily: each is routed on its own', 'Yes, always', 'Yes, unless the message is long'], 0, 'press Send message and follow the orange packets.', 'Routers decide hop by hop for every packet, so packets can take different paths and arrive out of order. TCP reassembles them by sequence number.'),
    'cs-web': Q('Before the first byte of an HTTPS page arrives, how many round trips to the server are needed (ignoring DNS)?', ['3: TCP, TLS, then HTTP', '1', '2'], 0, 'step through the journey with HTTPS on and count the trips to the server.', 'One round trip for the TCP handshake, one for the TLS 1.3 handshake, and one for the HTTP request and response.'),
    'py-basics': Q('What does ' + c('print(17 // 5, 17 % 5)') + ' show?', ['3 2', '3.4 2', '3 3'], 0, 'edit the playground and run it.', '// is floor division (how many whole 5s fit in 17) and % is the remainder: 17 = 3 × 5 + 2.'),
    'py-control': Q('How many lines does the first loop of the playground print?', ['5', '6', '4'], 0, 'run the playground.', 'range(1, 6) gives 1, 2, 3, 4, 5: the stop value 6 is never included.'),
    'py-functions': Q('After ' + c('b = a') + ' and ' + c('b.append(4)') + ', does the list ' + c('a') + ' change?', ['Yes: a and b are the same list', 'No: b is a copy', 'Only if a is global'], 0, 'step through the "Aliasing a list" program.', 'Assignment copies the reference (the arrow), not the list. Both names point to one list object.'),
    'py-objects': Q('The rabbit simulation runs 4 years. Will the population grow roughly in a straight line, or faster?', ['Faster: each new rabbit can breed too', 'In a straight line', 'It will shrink'], 0, 'run the playground and look at the counts.', 'Every adult can produce offspring, so growth compounds: roughly exponential, like interest on interest.'),
    'js-basics': Q('What is ' + c('[10, 9, 1].sort()') + ' in JavaScript?', [c('[1, 10, 9]'), c('[1, 9, 10]'), c('[10, 9, 1]')], 0, 'run the playground.', 'Without a compare function, sort compares the items as text, and "10" comes before "9" alphabetically. Use sort((a, b) => a - b).'),
    'js-dom': Q('When the counter reaches 10, what changes?', ['The number turns red (a CSS class is added)', 'Nothing', 'The page reloads'], 0, 'click + ten times in the preview.', 'render() toggles the class "big" when count >= 10, and the CSS rule .big { color: crimson } applies at once.'),
    'js-async': Q('In ' + c('setTimeout(cb, 0); Promise.resolve().then(p); console.log("sync")') + ', what runs last?', ['The timeout callback', 'The promise callback', 'console.log'], 0, 'step through the "Promises versus timers" program.', 'Synchronous code first, then every microtask (promise callbacks), and only then the next task such as a timer.'),
    'cpp-basics': Q('In C++, what is ' + c('INT_MAX + 1') + ' for a 32-bit int?', ['A large negative number (overflow)', '2147483648', 'A compile error'], 0, 'run the playground.', 'int has no room for 2³¹. In practice it wraps to −2147483648, though strictly signed overflow is undefined behaviour. Use long long.'),
    'cpp-memory': Q('Inside ' + c('swap(int* a, int* b)') + ', does changing ' + c('*a') + ' change main’s variable x?', ['Yes: a holds x’s address', 'No: a is a copy of x', 'Only after swap returns'], 0, 'step through the swap program.', 'a is a copy of the address of x, and *a follows that address to x itself.'),
    'cpp-stl': Q('In the word counter, which word comes first in the output?', ['"the" (most frequent)', '"brown" (alphabetical)', '"quick" (first in the text)'], 0, 'run the STL tour.', 'Pairs (−count, word) are sorted, so the most frequent word comes first and ties go alphabetically.'),
    'cp-complexity': Q('Going from n = 10⁵ to n = 10⁶, how much longer does an O(n²) algorithm take?', ['100 times', '10 times', '2 times'], 0, 'slide n in the figure and compare the O(n²) times.', '(10n)² = 100 n². Quadratic algorithms slow down with the square of the growth.'),
    'cp-sorting': Q('Sorting 100 random items, which makes fewer comparisons?', ['Merge sort', 'Bubble sort', 'About the same'], 0, 'race the two algorithms with n = 100.', 'Bubble sort makes about n²/2 = 5000 comparisons; merge sort about n log₂ n ≈ 550.'),
    'cp-greedy': Q('How many calls does the plain recursive fib(7) make?', ['41', '7', '13'], 0, 'set n = 7 with memoisation off.', 'C(n) = C(n−1) + C(n−2) + 1 with C(0) = C(1) = 1 gives 1, 1, 3, 5, 9, 15, 25, 41.'),
    'cp-dp': Q('What is the longest common subsequence of ABCBDAB and BDCABA?', ['4', '3', '6'], 0, 'fill the LCS table.', 'For example BCBA. The bottom-right cell holds the answer.'),
    'cp-graphs': Q('On an open grid, which explores fewer cells before reaching G: BFS or A*?', ['A*', 'BFS', 'The same'], 0, 'run both on an empty grid.', 'A* adds a guess of the remaining distance, so it heads towards the goal instead of spreading out in all directions.'),
    'cp-structures': Q('After inserting a value smaller than everything in a min-heap, where does it end up?', ['At the root', 'At the bottom', 'In the middle'], 0, 'insert a small value in the heap lab.', 'It is added at the end, then swapped with its parent until the parent is smaller: all the way to the top.'),
    'cp-maths': Q('With N = 200, after crossing out multiples of which primes is every remaining number prime?', ['2, 3, 5, 7, 11 and 13', 'Only 2 and 3', 'All primes below 100'], 0, 'move the slider and watch the uncrossed numbers.', 'A composite number ≤ 200 has a prime factor ≤ √200 ≈ 14.1, so the primes up to 13 are enough.')
  });

  /* ---- Hall of computing (card collection) ---- */
  const X = (short, name, rar, info, text) => ({ short: short, name: name, rarity: rar, info: info, text: text });
  const hall = [
    X('0/1', 'Bit', 0, 'Idea', 'The smallest unit of information, named by John Tukey in 1947.'), X('B', 'Byte', 0, 'Idea', 'Eight bits, the standard unit of memory.'), X('🖱️', 'Mouse', 0, 'Machine', 'Invented by Douglas Engelbart, shown in the 1968 "Mother of All Demos".'),
    X('⌨', 'Keyboard', 0, 'Machine', 'QWERTY was designed for typewriters in the 1870s.'), X('$', 'Shell', 0, 'Tool', 'The Unix shell: small programs joined by pipes.'), X('py', 'Python', 0, 'Language', 'Created by Guido van Rossum, first released in 1991.'),
    X('JS', 'JavaScript', 0, 'Language', 'Written by Brendan Eich in ten days in 1995.'), X('C++', 'C++', 0, 'Language', 'Bjarne Stroustrup’s "C with classes", from 1985.'), X('</>', 'HTML', 0, 'Language', 'Tim Berners-Lee’s markup for the first web pages, 1991.'),
    X('{}', 'JSON', 0, 'Format', 'Data written like JavaScript objects; popularised by Douglas Crockford.'), X('🔍', 'Binary search', 0, 'Algorithm', 'Halve the range every step: 30 steps search a billion items.'), X('↕', 'Bubble sort', 0, 'Algorithm', 'Simple and slow: O(n²) swaps of neighbours.'),
    X('🌐', 'World Wide Web', 0, 'Invention', 'Proposed at CERN by Tim Berners-Lee in 1989.'), X('@', 'Email', 0, 'Invention', 'Ray Tomlinson chose the @ sign in 1971.'), X('Wi', 'Wi-Fi', 0, 'Invention', 'Radio networking; it grew out of Australian radio-astronomy research.'),
    X('DNS', 'Domain Name System', 0, 'Protocol', 'The internet’s phone book, designed by Paul Mockapetris in 1983.'), X('TCP', 'TCP/IP', 0, 'Protocol', 'Vint Cerf and Bob Kahn’s protocols; the internet switched to them on 1 January 1983.'), X('🐧', 'Linux', 0, 'System', 'Linus Torvalds’ hobby kernel from 1991, now running most servers and phones.'),
    X('∑', 'Euclid’s algorithm', 0, 'Algorithm', 'About 2300 years old and still the fastest way to a gcd.'), X('🧮', 'Abacus', 0, 'Machine', 'Calculating with beads, used for thousands of years.'), X('📱', 'Smartphone', 0, 'Machine', 'A pocket computer millions of times faster than the Apollo guidance computer.'),
    X('🔀', 'Merge sort', 0, 'Algorithm', 'John von Neumann, 1945: split, sort, merge.'), X('🗂', 'Hash table', 0, 'Data structure', 'Find anything in constant time on average.'), X('Git', 'Git', 0, 'Tool', 'Version control written by Linus Torvalds in 2005.'),
    X('⚡', 'Quicksort', 1, 'Algorithm', 'Tony Hoare, 1959, devised while working on machine translation.'), X('🗺', 'Dijkstra’s algorithm', 1, 'Algorithm', 'Designed in about twenty minutes at a café in 1956.'), X('🌲', 'Binary search tree', 1, 'Data structure', 'Left is smaller, right is bigger.'),
    X('C', 'C', 1, 'Language', 'Dennis Ritchie, Bell Labs, 1972: the language of Unix.'), X('Unix', 'Unix', 1, 'System', 'Ken Thompson and Dennis Ritchie, 1969.'), X('🔒', 'RSA', 1, 'Algorithm', 'Rivest, Shamir and Adleman, 1977: security from hard-to-factor numbers.'),
    X('🔐', 'HTTPS / TLS', 1, 'Protocol', 'Encrypts the web; now used for nearly all page loads.'), X('📦', 'Packet switching', 1, 'Idea', 'Paul Baran and Donald Davies, independently, in the 1960s.'), X('🧠', 'Neural network', 1, 'Idea', 'Layers of simple units that learn from examples.'),
    X('Σ', 'Fenwick tree', 1, 'Data structure', 'Peter Fenwick, 1994: prefix sums with updates in O(log n).'), X('⛓', 'Union-find', 1, 'Data structure', 'Nearly constant time per operation: the inverse Ackermann function.'), X('🔁', 'Dynamic programming', 1, 'Idea', 'Richard Bellman chose the name in the 1950s partly because it sounded impressive.'),
    X('Fortran', 'Fortran', 1, 'Language', 'John Backus’s team at IBM, 1957: the first widely used high-level language.'), X('LISP', 'Lisp', 1, 'Language', 'John McCarthy, 1958; the ancestor of many functional languages.'), X('🐞', 'The first bug', 1, 'History', 'A real moth taped into the Harvard Mark II logbook in 1947.'),
    X('👩‍💻', 'Grace Hopper', 2, 'Pioneer', 'Built the first compiler and helped create COBOL.'), X('📜', 'Ada Lovelace', 2, 'Pioneer', 'Wrote the first published algorithm for a machine, in 1843.'), X('∞', 'Alan Turing', 2, 'Pioneer', 'Defined what a computer can compute, and helped break Enigma.'),
    X('🌌', 'Margaret Hamilton', 2, 'Pioneer', 'Led the Apollo flight software team and coined "software engineering".'), X('⚙️', 'Analytical Engine', 2, 'Machine', 'Charles Babbage’s mechanical general-purpose computer, designed in 1837.'), X('ENIAC', 'ENIAC', 2, 'Machine', '1945: 18 000 vacuum tubes, programmed by six women with cables and switches.'),
    X('A*', 'A* search', 2, 'Algorithm', 'Hart, Nilsson and Raphael, 1968, for the Shakey robot.'), X('FFT', 'Fast Fourier transform', 2, 'Algorithm', 'Cooley and Tukey, 1965: n log n instead of n²; it underlies audio, images and fast multiplication.'), X('⚛', 'Quantum computer', 2, 'Machine', 'Qubits in superposition; Shor’s algorithm would factor numbers fast.'),
    X('IOI', 'International Olympiad in Informatics', 2, 'Contest', 'Held every year since 1989, for secondary-school students.'), X('ICPC', 'ICPC', 2, 'Contest', 'The university team programming contest, running since the 1970s.'), X('P?NP', 'P versus NP', 3, 'Open problem', 'Can every quickly checkable answer also be found quickly? A million-dollar prize awaits.'),
    X('🛑', 'Halting problem', 3, 'Theorem', 'Turing, 1936: no program can decide whether every program stops.'), X('λ', 'Lambda calculus', 3, 'Idea', 'Alonzo Church’s model of computation using only functions.'), X('Knuth', 'The Art of Computer Programming', 3, 'Book', 'Donald Knuth’s life work, begun in 1962 and still being written.'),
    X('Apollo', 'Apollo Guidance Computer', 3, 'Machine', 'About 4 KB of RAM landed people on the Moon.'), X('🧬', 'Smith–Waterman', 3, 'Algorithm', 'Dynamic programming that aligns DNA and protein sequences.'), X('Colossus', 'Colossus', 4, 'Machine', 'Tommy Flowers’ 1944 code-breaking machine, the first programmable electronic computer.'),
    X('Z3', 'Zuse Z3', 4, 'Machine', 'Konrad Zuse, 1941: the first working programmable, fully automatic computer.'), X('BB', 'Busy beaver', 4, 'Function', 'Grows faster than any computable function; BB(5) = 47 176 870 was proved in 2024.')
  ];
  PB.COLLECTIONS.push({ id: 'hall', subject: 'computing', name: 'Hall of computing', icon: '💾', cards: hall.map((x, i) => Object.assign({ id: 'hc-' + i }, x)) });

  /* ---- In the wild and the campaign (merged into wild-data.js) ---- */
  PB.WILD_EXTRA = Object.assign(PB.WILD_EXTRA || {}, {
    'cs-shell': ['Servers and the cloud', 'Almost every web server is run from a terminal: engineers manage thousands of machines with shell commands and scripts.'],
    'cs-data': ['Emoji everywhere', 'UTF-8 encodes 98% of the web, which is why one message can mix English, Arabic, Chinese and 😀.'],
    'cs-internet': ['Undersea cables', 'About 99% of intercontinental internet traffic travels as light through cables on the ocean floor.'],
    'cs-web': ['Every page you load', 'Each page view is dozens of HTTP requests, nearly all of them encrypted with TLS.'],
    'py-basics': ['Science and AI', 'Python is the main language of data science, machine learning and scientific computing.'],
    'py-control': ['Simulations', 'Weather, epidemic and traffic models are loops updating a state millions of times.'],
    'py-functions': ['Search engines', 'Inverted indexes, dictionaries from words to pages, answer searches in milliseconds.'],
    'py-objects': ['Games', 'Game engines represent every character, bullet and tree as an object with data and methods.'],
    'js-basics': ['Every browser', 'JavaScript runs on nearly every website and in every web browser on Earth.'],
    'js-dom': ['Web apps', 'Maps, documents and chat in the browser are DOM updates driven by events.'],
    'js-async': ['Live updates', 'Chat apps, multiplayer games and stock tickers rely on asynchronous code waiting for the network.'],
    'cpp-basics': ['Game engines and browsers', 'Chrome, Unreal Engine and most of your operating system are written largely in C++.'],
    'cpp-memory': ['Security', 'Most serious security holes in big C/C++ programs are memory-safety bugs like buffer overflows.'],
    'cpp-stl': ['High-frequency trading', 'Trading systems use C++ containers tuned to respond within microseconds.'],
    'cp-complexity': ['Scaling to billions', 'An O(n²) feature that is fine for 1000 users collapses at a million: big-O decides what can scale.'],
    'cp-sorting': ['Databases', 'Database indexes are sorted trees, so a lookup among billions of rows takes a handful of steps.'],
    'cp-greedy': ['Compression', 'Huffman coding, inside ZIP files and JPEGs, is a greedy algorithm.'],
    'cp-dp': ['DNA and spell checkers', 'Edit-distance DP aligns genomes and suggests corrections when you mistype.'],
    'cp-graphs': ['Satnav', 'Route planners run descendants of Dijkstra’s algorithm on road graphs with millions of junctions.'],
    'cp-structures': ['Operating systems', 'Schedulers use priority queues to decide which program runs next.'],
    'cp-maths': ['Cryptography', 'Fast modular exponentiation is the heart of RSA and of every HTTPS handshake.']
  });
  PB.CAMPAIGN_EXTRA = Object.assign(PB.CAMPAIGN_EXTRA || {}, {
    computing: ['The Silicon Workshop', ['A dark workshop full of humming machines. A blinking cursor waits for your first command.', 'Files, bits and packets make sense now: you can see the web moving through the wires.', 'Python and JavaScript bend to your will; your first programs run.', 'Pointers, memory and the STL: you understand what the machine is really doing.', 'The judges say Accepted. You can turn any idea into a fast, correct program.']]
  });
})();
