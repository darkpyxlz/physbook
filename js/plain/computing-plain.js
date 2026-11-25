/* Plain-words summaries and glossary terms: computing. One summary per section, in section order. */
(function () {
  const P = PB.addPlain;
  P('cs-shell', [
    'Everything on a computer lives in one big tree of folders. A path is directions through that tree, either from the very top or from where you are now.',
    'The terminal is a text conversation with the computer: type a command, its options and what to act on, press Enter, read the answer.',
    'Programs read text in and write text out, and the shell can send that text into files or straight into another program, like pipes between machines.',
    'Every file says who may read it, change it, or run it. You must give a script permission to run before ./ can start it.'
  ]);
  P('cs-data', [
    'Computers count with only two digits, 0 and 1. Each extra digit doubles how many different values you can store.',
    'Eight bits make a byte, and programmers write bytes as two hex digits because that is much easier to read than long rows of 0s and 1s.',
    'Numbers are stored in a fixed number of bits, so they can overflow and wrap around, and fractions are stored with tiny rounding errors.',
    'Letters are stored as numbers too. UTF-8 gives every character in every language a code, using one to four bytes.'
  ]);
  P('cs-internet', [
    'Your data travels in small labelled packets that routers pass along hop by hop, each choosing the next step, like letters through post offices.',
    'Every device has an IP address, like a street address, and a port number says which program on that device should get the packet.',
    'TCP checks that everything arrives, in order, and asks again for anything lost. UDP just sends, which is faster when late data is useless.',
    'DNS is the phone book of the internet: it turns a name like example.com into the number computers actually use.'
  ]);
  P('cs-web', [
    'Your browser asks a server for a page, and a URL says exactly which server, and which thing on it, to ask for.',
    'HTTP is a simple text conversation: a request ("GET this page") and a response with a status code ("200 OK", "404 Not Found") and the content.',
    'HTTPS wraps that conversation in encryption, so people on the same network cannot read or change it, and a certificate proves who the server is.',
    'The browser turns HTML into a tree of elements, styles it with CSS, runs the JavaScript, and paints the result on your screen.'
  ]);
  P('py-basics', [
    'A program is a list of instructions run from top to bottom. print shows things on the screen, and error messages tell you where it went wrong.',
    'Python knows different kinds of values, such as whole numbers, decimals and text, and does arithmetic with them, including dividing with a remainder.',
    'A variable is a name stuck onto a value. You can move the name to a new value at any time, for example to keep a running score.',
    'Text is a row of characters you can count, cut up and glue together, and input() reads text typed by the user.'
  ]);
  P('py-control', [
    'An if lets the program choose: it checks a condition and runs one block of code or another.',
    'A while loop repeats something for as long as a condition stays true.',
    'A for loop repeats something once for each item in a list or each number in a range.',
    'Most loops do one of a few jobs: add things up, count things, or keep track of the biggest so far. Tracing a loop by hand finds bugs.'
  ]);
  P('py-functions', [
    'A function packages a few lines under one name, so you can use them again with different inputs and get an answer back.',
    'A list holds many values in order. Two names can point to the very same list, so changing it through one name changes it for both.',
    'A dictionary looks values up by a key, like a word in a dictionary, and a set remembers which things you have seen, with no duplicates.',
    'You can build a list in one line, and sort things by any rule you like, such as by length or by score.'
  ]);
  P('py-objects', [
    'When something goes wrong, Python raises an error. try and except let your program catch it and carry on instead of crashing.',
    'Files keep data after the program ends. with open(...) opens a file to read or write and closes it safely afterwards.',
    'Modules are toolboxes of ready-made code. import brings one in, so you do not have to write everything yourself.',
    'A class is a blueprint for your own kind of object, bundling its data together with the actions it can do.'
  ]);
  P('js-basics', [
    'JavaScript stores values in variables made with let or const, and has one type for all numbers.',
    'JavaScript changes types on its own in surprising ways, so always compare with three equals signs, ===.',
    'Functions are values you can store and pass around, and an inner function remembers the variables around it.',
    'Arrays hold lists and objects hold named fields; map, filter and reduce transform whole arrays in one go.'
  ]);
  P('js-dom', [
    'HTML describes what is on a page, such as headings, paragraphs, links and buttons, nested inside each other like boxes in boxes.',
    'CSS decides how things look: colours, sizes, spacing and layout, chosen by selectors that pick which elements to style.',
    'The DOM is the page as a tree of objects that JavaScript can find and change, and the page updates instantly.',
    'Events let code react to clicks and typing. Keep the data in variables and redraw the page from it after every change.'
  ]);
  P('js-async', [
    'JavaScript does one thing at a time. Slow jobs like timers run in the background and their callbacks wait in a queue until the current code finishes.',
    'A promise stands for a result that will arrive later, and .then says what to do once it does.',
    'async and await let you write waiting code that reads top to bottom, while the page stays responsive. fetch asks a server for data.',
    'Node.js runs JavaScript on servers, which answer requests from browsers and keep the data in databases.'
  ]);
  P('cpp-basics', [
    'C++ is translated into machine code by a compiler before it runs, which makes it very fast and catches many mistakes early.',
    'Every C++ variable has a fixed type with a fixed size, so numbers that grow too big overflow; long long holds much bigger numbers.',
    'cin reads input and cout prints output, and loops and ifs work much like in JavaScript.',
    'Functions say what types they take and return. A & lets a function change the caller’s variable instead of a copy.'
  ]);
  P('cpp-memory', [
    'Memory is one long row of numbered boxes. Local variables live on the stack and vanish when their function ends; the heap keeps things until they are freed.',
    'A pointer is a variable that stores the address of another variable, so you can reach and change that variable through it.',
    'Arrays are boxes side by side, and C++ does not stop you reading past the end, which causes strange, dangerous bugs.',
    'Memory you take with new must be given back with delete. Containers like vector do this for you automatically.'
  ]);
  P('cpp-stl', [
    'vector is a list that grows as needed and knows its size; string holds text.',
    'map and set keep things sorted for quick lookup; unordered_map is a hash table that is usually even faster.',
    'The library has ready-made sort, search and counting tools, and lambdas let you say how to compare things.',
    'A struct or class bundles data into your own type, and templates let one piece of code work for many types.'
  ]);
  P('cp-complexity', [
    'In a contest, a judge runs your program on hidden tests and tells you whether it was right, wrong, too slow or crashed.',
    'Big-O describes how the work grows as the input grows, ignoring small details, so you can compare ideas before coding them.',
    'A computer does about a hundred million simple steps a second, so the input limits tell you how fast your idea must be.',
    'Write the simplest correct solution first, then use it to check your fast solution on many small random tests.'
  ]);
  P('cp-sorting', [
    'Good sorting algorithms take about n log n steps, and no comparison-based method can do much better.',
    'Binary search finds something in a sorted list by checking the middle and throwing away half each time.',
    'If you can check whether an answer is good enough, you can binary search for the best answer.',
    'Prefix sums give any range total with one subtraction, and two pointers walk through sorted data in a single pass.'
  ]);
  P('cp-greedy', [
    'A recursive function solves a problem by calling itself on a smaller version, until it reaches a case small enough to answer directly.',
    'Backtracking tries every choice, one step at a time, and undoes a choice to try the next, skipping branches that cannot work.',
    'A greedy algorithm always takes the choice that looks best right now, such as the meeting that ends first.',
    'Greedy is only correct when you can prove that the best-looking choice is safe; one counterexample shows it is not.'
  ]);
  P('cp-dp', [
    'Plain recursion solves the same small problems again and again. Remembering each answer the first time makes it fast.',
    'Dynamic programming fills a table of answers to small problems, building each one from smaller ones already found.',
    'Classic examples: the most value that fits in a bag, the longest increasing run you can pick out, and the best stretch of a list.',
    'For two strings or a grid, each table cell is built from its neighbours above, to the left and diagonally.'
  ]);
  P('cp-graphs', [
    'A graph is dots joined by lines, and a program stores it as a list of neighbours for each dot.',
    'Depth-first search follows one path as far as it can, then backs up, which finds everything connected to a starting point.',
    'Breadth-first search spreads out in rings from the start, so it finds the shortest route when every step costs the same.',
    'Dijkstra’s algorithm finds shortest routes when roads have different lengths, always finishing the closest unfinished place next.'
  ]);
  P('cp-structures', [
    'A stack takes things off the top, last in first out, which is perfect for matching brackets. A queue serves things in arrival order.',
    'A heap always gives you the smallest item quickly, even while new items keep arriving.',
    'Union-find keeps track of groups that merge, and answers "are these two in the same group?" almost instantly.',
    'A Fenwick tree keeps range totals up to date when single values change, using the binary digits of the positions.'
  ]);
  P('cp-maths', [
    'When answers are huge, contests ask for the remainder after dividing by a big prime, and you can take remainders at every step.',
    'Raising a number to a huge power is fast if you square repeatedly, using the binary digits of the exponent.',
    'Euclid’s algorithm finds greatest common divisors fast, and the sieve finds all primes up to a limit by crossing out multiples.',
    'Dividing in modular arithmetic means multiplying by an inverse, which Fermat’s little theorem gives as a power.'
  ]);

  PB.addGlossary({
    'directory|folder': ['A container for files and other folders. Folders nest inside each other to form a tree.', 'computing'],
    'path': ['Directions to a file or folder through the folder tree, such as /home/ada/notes.txt.', 'computing'],
    'shell': ['The program in a terminal that reads the commands you type and runs them.', 'computing'],
    'pipe': ['The | symbol, which sends the output of one command into the input of the next.', 'computing'],
    'bit': ['A binary digit: a single 0 or 1, the smallest piece of information a computer stores.', 'computing'],
    'byte': ['A group of 8 bits, able to hold 256 different values. File sizes are counted in bytes.', 'computing'],
    'hexadecimal|hex': ['Base 16, with digits 0–9 and A–F. One hex digit stands for exactly 4 bits.', 'computing'],
    'overflow': ['When a number grows too big for the space reserved for it and wraps around or goes wrong.', 'computing'],
    'packet': ['A small chunk of data with a header saying where it comes from and where it is going.', 'computing'],
    'router': ['A device that passes packets on towards their destination, one hop at a time.', 'computing'],
    'IP address': ['The number that identifies a device on the internet, such as 93.184.215.14.', 'computing'],
    'port': ['A number that says which program on a computer a network message is for, such as 443 for HTTPS.', 'computing'],
    'protocol': ['An agreed set of rules for how two computers talk, such as HTTP, TCP or DNS.', 'computing'],
    'server': ['A program or computer that waits for requests and answers them.', 'computing'],
    'client': ['The program that sends requests to a server, such as your web browser.', 'computing'],
    'cookie': ['A small piece of data a website asks your browser to store and send back with later requests.', 'computing'],
    'variable': ['A name that refers to a value in a program, which can change as the program runs.', 'computing'],
    'string': ['A piece of text in a program, a sequence of characters, written in quotes.', 'computing'],
    'loop': ['Code that repeats, either a set number of times or while a condition stays true.', 'computing'],
    'parameter': ['A name in a function’s definition for an input it receives.', 'computing'],
    'list|array': ['An ordered collection of values, reached by position (index) starting at 0.', 'computing'],
    'dictionary|hash map': ['A collection that maps keys to values and looks a key up almost instantly.', 'computing'],
    'exception': ['A signal that something went wrong while a program ran, which can be caught and handled.', 'computing'],
    'class': ['A blueprint for making objects of a new type, with their own data and methods.', 'computing'],
    'method': ['A function that belongs to an object or class, called as object.method().', 'computing'],
    'callback': ['A function handed to other code to be called later, for example when a click or a timer happens.', 'computing'],
    'promise': ['In JavaScript, an object standing for a result that will be ready later.', 'computing'],
    'compiler': ['A program that translates source code into machine code before it runs.', 'computing'],
    'pointer': ['A variable that holds the memory address of another value.', 'computing'],
    'stack': ['A pile where the last thing added is the first taken off. Also the memory area for function calls.', 'computing'],
    'heap': ['A tree-shaped structure that always gives the smallest (or largest) item quickly. Also the memory area for long-lived data.', 'computing'],
    'recursion': ['When a function solves a problem by calling itself on a smaller version of it.', 'computing'],
    'memoisation|memoization': ['Remembering the answer to each function call so it never has to be computed twice.', 'computing'],
    'greedy algorithm': ['An algorithm that always makes the choice that looks best right now.', 'computing'],
    'binary search': ['Finding something in sorted data by checking the middle and discarding half each time.', 'computing'],
    'big-O|complexity': ['A way of describing how the running time grows as the input gets bigger, ignoring constant factors.', 'computing'],
    'graph': ['A set of points (vertices) joined by lines (edges), used to model networks, maps and links.', 'computing'],
    'edge': ['A link between two vertices in a graph, possibly with a direction or a weight.', 'computing'],
    'adjacency list': ['A way to store a graph: for each vertex, the list of its neighbours.', 'computing'],
    'sieve': ['The sieve of Eratosthenes: finding all primes up to a limit by crossing out the multiples of each prime.', 'computing']
  });
})();
