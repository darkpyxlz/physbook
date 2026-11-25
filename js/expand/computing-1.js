/* Expanded text for computing 1–8: command line, data, internet, web, and the four Python chapters. */
(function () {
  const { R, K, c } = PB.csKit();
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('cs-shell', {
    0: { html: R`
<h3 class="sub">Hidden files, special folders and wildcards</h3>
<p>Names starting with a dot (${c('.bashrc')}, ${c('.git')}) are <strong>hidden</strong>: plain ${c('ls')} skips them so configuration files do not clutter your view. A few folders have conventional jobs on Linux: ${c('/home')} for users, ${c('/etc')} for settings, ${c('/bin')} and ${c('/usr/bin')} for programs, ${c('/tmp')} for temporary files (wiped on reboot), ${c('/dev')} for devices (even your disk is a "file" there).</p>
<p>Wildcards (<strong>globs</strong>) let one name match many files: ${c('*')} matches any run of characters, ${c('?')} exactly one, and ${c('[abc]')} one of a set. The <em>shell</em> expands them before the command runs, so ${c('rm *.tmp')} becomes ${c('rm a.tmp b.tmp c.tmp')}.</p>
<div class="worked"><p>A folder holds ${c('report1.txt, report2.txt, report10.txt, notes.md, data.csv')}. Which files does each pattern match: ${c('report?.txt')}, ${c('*.t*')}, ${c('*[0-9].*')}?</p>
<p>${c('report?.txt')}: report1 and report2 (one character only, so not report10). ${c('*.t*')}: the three .txt files. ${c('*[0-9].*')}: all three reports (a digit just before a dot).</p></div>
<div class="warn-box"><p>Spaces in names confuse the shell: ${c('cd My Documents')} tries to go to "My". Quote it (${c('cd "My Documents"')}) or escape the space (${c('cd My\\ Documents')}). Programmers avoid spaces in file names for this reason.</p></div>` },
    1: { html: R`
<h3 class="sub">Anatomy of a command</h3>
<p>Short options are single letters after one dash and can be combined (${c('ls -l -a')} is ${c('ls -la')}); long options use two dashes and words (${c('ls --all')}). Some options take a value (${c('head -n 5')}). Many commands read from standard input if you give them no file, which is what makes pipes possible.</p>
<p>Productivity tricks worth learning on day one:</p>
<ul><li><kbd>Tab</kbd> completes names; press it twice to see the choices.</li>
<li><kbd>↑</kbd>/<kbd>↓</kbd> walk through history; ${c('history')} lists it; <kbd>Ctrl</kbd>+<kbd>R</kbd> searches it.</li>
<li><kbd>Ctrl</kbd>+<kbd>C</kbd> stops a running program; <kbd>Ctrl</kbd>+<kbd>L</kbd> clears the screen.</li>
<li>${c('cd -')} jumps back to the previous folder; ${c('mkdir -p a/b/c')} makes the whole chain.</li></ul>
<div class="worked"><p>Starting in ${c('/home/ada')}, where are you after ${c('cd projects/site && cd ../.. && cd ./projects')}?</p>
<p>${c('/home/ada/projects/site')} → up two → ${c('/home/ada')} → ${c('/home/ada/projects')}. ${c('&&')} runs the next command only if the previous succeeded, so a typo would stop the chain.</p></div>` },
    2: { html: R`
<h3 class="sub">Standard error and exit codes</h3>
<p>Errors go to a separate stream, <strong>stderr</strong>, so they still appear on screen when you redirect normal output to a file. Redirect it with ${c('2>')} (stream 2), or merge it into stdout with ${c('2>&1')}:</p>
${K('shell', R`
$ ls missing.txt > out.txt            # the error still shows on screen
ls: cannot access 'missing.txt': No such file or directory
$ ls missing.txt > out.txt 2> err.txt # error saved separately
$ make > build.log 2>&1               # everything into one log
$ grep -c "ERROR" build.log           # count error lines`)}
<p>Every program finishes with an <strong>exit code</strong>: 0 means success, anything else failure. ${c('&&')} continues only after success, ${c('||')} only after failure: ${c('mkdir out || echo "could not create"')}. Scripts and build tools rely on exit codes to stop at the first problem.</p>
<h3 class="sub">A few more pipe tools</h3>
<p>${c('cut -d, -f2')} picks a column from CSV; ${c('tr a-z A-Z')} translates characters; ${c('sort -n -k2')} sorts numerically by the second field; ${c('xargs')} turns lines of input into arguments for another command. With them, a one-line pipeline can answer questions like "which ten IP addresses made the most requests to my server?".</p>` },
    3: { html: R`
<h3 class="sub">Users, groups and sudo</h3>
<p>Every file has an owner and a group, shown by ${c('ls -l')}. Programs run with the permissions of the user who started them, so a bug or virus in your programs cannot damage other users' files or the system: this separation is a basic security layer. The administrator, ${c('root')}, can do anything; ${c('sudo command')} runs one command as root after asking for your password. ${c('chown')} changes a file's owner.</p>
<p>For directories the permission bits mean something slightly different: <strong>r</strong> lets you list the names inside, <strong>w</strong> lets you create and delete files in it, and <strong>x</strong> lets you enter it with ${c('cd')} and reach files by name.</p>
<h3 class="sub">Environment variables and PATH</h3>
${K('shell', R`
$ echo $HOME
/home/ada
$ echo $PATH
/usr/local/bin:/usr/bin:/bin
$ which python3
/usr/bin/python3
$ export GREETING="hi"     # set a variable for this shell and its programs`)}
<p>${c('PATH')} is a colon-separated list of folders searched, in order, when you type a command. Installing a tool usually means putting it in one of those folders or adding its folder to PATH. Shell scripts start with a <strong>shebang</strong> line such as ${c('#!/bin/bash')} or ${c('#!/usr/bin/env python3')} naming the interpreter to run them.</p>` }
  });

  X('cs-data', {
    0: { html: R`
<h3 class="sub">Binary arithmetic</h3>
<p>Adding in binary works like decimal with carries at 2: $1 + 1 = 10_2$. So $1011 + 0110 = 10001$ ($11 + 6 = 17$). Shifting left by one place doubles a number (append a 0), shifting right halves it (dropping the last bit rounds down): that is how computers multiply and divide by powers of two cheaply, and what the ${c('<<')} and ${c('>>')} operators do in code.</p>
<p>Logic on bits: <strong>AND</strong> (1 only if both are 1), <strong>OR</strong> (1 if either is), <strong>XOR</strong> (1 if they differ), <strong>NOT</strong> (flip). Bitwise operators apply them column by column: ${c('12 & 10')} is ${c('1100 AND 1010 = 1000')} = 8. Masks use this to test and set individual bits, for example permission bits or pixels.</p>
<div class="worked"><p>How can you test whether a number is a power of two with one bitwise operation?</p>
<p>A power of two has a single 1 bit; subtracting 1 flips it to 0 and turns every lower bit to 1. So ${c('n & (n - 1) == 0')} exactly for powers of two (for $n > 0$). For 8: ${c('1000 & 0111 = 0')}.</p></div>` },
    1: { html: R`
<h3 class="sub">How big is big?</h3>
<p>Data sizes span huge ranges. A plain-text page is about 2 kB; a song as MP3 about 4 MB; an hour of HD video about 3 GB; the whole of English Wikipedia's text about 25 GB; a large data centre stores exabytes ($10^{18}$ bytes). Network speeds are quoted in <em>bits</em> per second, storage in <em>bytes</em>: a "100 Mbit/s" connection moves 12.5 MB per second.</p>
<div class="worked"><p>How long does a 3 GB film take to download at 100 Mbit/s?</p>
<p>$3\times10^9\cdot8 = 2.4\times10^{10}$ bits ÷ $10^8$ bits/s = 240 s = 4 minutes (in practice a bit longer, due to protocol overheads).</p></div>
<h3 class="sub">Compression</h3>
<p>Files are often smaller than their raw size because data has patterns. <strong>Lossless</strong> compression (ZIP, PNG, FLAC) rebuilds the exact original: run-length encoding stores "100 white pixels" instead of 100 copies; Huffman coding gives common symbols short codes. <strong>Lossy</strong> compression (JPEG, MP3, video codecs) throws away detail that eyes and ears barely notice, shrinking files tenfold or more. Random data cannot be compressed at all: there is nothing to exploit.</p>` },
    2: { html: R`
<h3 class="sub">How floats are stored</h3>
<p>A 64-bit <strong>double</strong> (IEEE 754) stores a sign bit, an 11-bit exponent and a 52-bit fraction: the number is $\pm1.f\times2^{e - 1023}$. That gives about 15–16 significant decimal digits and a range up to about $1.8\times10^{308}$. Special values handle edge cases: ${c('inf')} (1/0.0), ${c('-inf')}, and ${c('NaN')} ("not a number", from 0/0), which is not even equal to itself.</p>
<div class="worked"><p>Why does adding 0.1 ten times not give exactly 1.0 in most languages?</p>
<p>0.1 in binary is $0.0001100110011\ldots$, repeating for ever, so it is stored slightly wrongly. Ten rounding errors accumulate: the sum is 0.9999999999999999. For money, use integers (count pennies) or a decimal type.</p></div>
<p>Floating point also loses <strong>small differences between large numbers</strong>: $10^{16} + 1 - 10^{16}$ gives 0, because $10^{16} + 1$ cannot be represented. Numerical programmers rearrange formulas to avoid subtracting nearly equal numbers (catastrophic cancellation).</p>
<div class="warn-box"><p>In C++ and Java, signed integer overflow and float rounding are silent: no error appears, the answer is just wrong. The Ariane 5 rocket exploded in 1996 when a 64-bit float was converted into a 16-bit integer that overflowed.</p></div>` },
    3: { html: R`
<h3 class="sub">How UTF-8 encodes a character</h3>
<p>UTF-8 uses the top bits of each byte to say how many bytes a character takes, so a program can always find where characters begin:</p>
${K('text', R`
code points          bytes   bit pattern
U+0000 – U+007F      1       0xxxxxxx
U+0080 – U+07FF      2       110xxxxx 10xxxxxx
U+0800 – U+FFFF      3       1110xxxx 10xxxxxx 10xxxxxx
U+10000 – U+10FFFF   4       11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`)}
<div class="worked"><p>Encode é (U+00E9) in UTF-8.</p>
<p>E9 = 1110 1001 needs 8 bits, more than 7, so two bytes: 110<b>00011</b> 10<b>101001</b> = C3 A9. That is the "Ã©" you see when UTF-8 is wrongly read one byte at a time.</p></div>
<h3 class="sub">Images and sound as numbers</h3>
<p>A bitmap image is a grid of pixels, each usually 3 bytes (red, green, blue, 0–255 each), so $256^3 \approx 16.7$ million colours. Sound is sampled: CD audio measures the air pressure 44 100 times a second with 16 bits per sample per channel, about 1.4 Mbit/s for stereo. The sampling rate must exceed twice the highest frequency (the <strong>Nyquist</strong> limit; human hearing tops out near 20 kHz), or high notes alias into false low ones.</p>` }
  });

  X('cs-internet', {
    0: { html: R`
<h3 class="sub">How a router decides</h3>
<p>Each router holds a <strong>routing table</strong>: a list of address ranges and which neighbour to send them to. For each packet it finds the most specific matching range (the longest prefix) and forwards it. Routers exchange reachability information with their neighbours using routing protocols; between the large networks of the internet, <strong>BGP</strong> carries announcements like "addresses 151.101.0.0/16 can be reached through me". A mistaken announcement can misroute a slice of the internet, which has happened several times.</p>
<p>Every packet carries a <strong>TTL</strong> (time to live) counter that each router decreases by one; at zero the packet is dropped and an error sent back. That stops lost packets circling for ever, and ${c('traceroute')} exploits it: it sends packets with TTL 1, 2, 3, … and lists the router that replies at each hop.</p>
<div class="worked"><p>A ${c('traceroute')} from London to a server in Sydney shows a jump from 9 ms to 260 ms between two consecutive hops. What happened there?</p>
<p>That hop crossed an ocean: the extra 250 ms round trip is light travelling through roughly 25 000 km of undersea fibre and back. Most of the latency in long-distance connections comes from such long links, not from the routers.</p></div>` },
    1: { html: R`
<h3 class="sub">Private addresses, NAT and DHCP</h3>
<p>Three address ranges are reserved for private networks: ${c('10.0.0.0/8')}, ${c('172.16.0.0/12')} and ${c('192.168.0.0/16')}. Your home router gives each device one of these (automatically, by <strong>DHCP</strong>) and rewrites outgoing packets to use its single public address, remembering which conversation belongs to which device: <strong>network address translation</strong>. That is why your laptop's address starts with 192.168 but websites see something else.</p>
<p>The <strong>subnet mask</strong> splits an address into network and host parts. With ${c('255.255.255.0')} (/24), ${c('192.168.1.20')} and ${c('192.168.1.99')} are on the same local network and talk directly; anything else goes to the default gateway (the router).</p>
<div class="worked"><p>Are ${c('10.1.2.200')} and ${c('10.1.3.5')} on the same /23 network?</p>
<p>A /23 keeps the first 23 bits: the third byte's last bit is free. 2 = 0000001<b>0</b> and 3 = 0000001<b>1</b> share the first 7 bits, so both are in ${c('10.1.2.0/23')} (10.1.2.0 to 10.1.3.255). Yes.</p></div>
<p>IPv6 removes the shortage: $2^{128}$ addresses, enough for every device to have a public address again, written in hex like ${c('2001:db8:85a3::8a2e:370:7334')}.</p>` },
    2: { html: R`
<h3 class="sub">Inside TCP</h3>
<p>TCP numbers every byte. The receiver acknowledges how many bytes it has received in order; anything not acknowledged within a timeout (or after three duplicate acknowledgements) is resent. A <strong>window</strong> lets the sender have many packets in flight at once, rather than waiting for each acknowledgement, which matters on long links: the throughput is at most window ÷ round-trip time.</p>
<div class="worked"><p>With a 64 kB window and a 200 ms round trip, what is the maximum TCP throughput?</p>
<p>$65\,536\cdot8/0.2 = 2.6$ Mbit/s, however fast the link is. Modern TCP scales the window to many megabytes so high-latency links can be filled.</p></div>
<p><strong>Congestion control</strong> keeps the internet working: TCP starts slowly, doubles its sending rate each round trip ("slow start"), and halves it whenever packets are lost, treating loss as a sign of congestion. Every connection backing off politely is what prevents collapse when millions share a link. Video calls, games and the newer QUIC protocol (used by HTTP/3) are built on UDP and do their own lighter-weight version of these tricks.</p>` },
    3: { html: R`
<h3 class="sub">Record types and caching</h3>
<p>DNS stores several kinds of record: <strong>A</strong> (IPv4 address), <strong>AAAA</strong> (IPv6), <strong>CNAME</strong> (an alias pointing to another name), <strong>MX</strong> (which server receives email for a domain), <strong>NS</strong> (which name servers are responsible), and <strong>TXT</strong> (free text, used for verification and anti-spam rules).</p>
${K('shell', R`
$ dig example.com A +short
93.184.215.14
$ dig gmail.com MX +short
5 gmail-smtp-in.l.google.com.`)}
<div class="worked"><p>A record has TTL 3600. You change the address. How long might some users still be sent to the old server?</p>
<p>Up to an hour: resolvers that cached the old answer keep using it until it expires. Administrators lower the TTL a day before a planned move, then raise it again afterwards.</p></div>
<p>DNS was designed without security; answers can be forged (cache poisoning). <strong>DNSSEC</strong> signs records cryptographically, and DNS over HTTPS hides your lookups from people on the same network. Because almost every connection starts with a DNS lookup, an outage at a major DNS provider can make thousands of websites unreachable at once, as happened in 2016.</p>` }
  });

  X('cs-web', {
    0: { html: R`
<h3 class="sub">Encoding in URLs</h3>
<p>URLs may only contain a limited set of characters. Others are <strong>percent-encoded</strong> as % followed by the byte in hex: a space is ${c('%20')} (or ${c('+')} in query strings), ${c('é')} is ${c('%C3%A9')} (its two UTF-8 bytes). ${c('?q=fish & chips')} must be sent as ${c('?q=fish%20%26%20chips')}, because a bare ${c('&')} would start a new parameter.</p>
<p>Links can be <strong>absolute</strong> (${c('https://site.org/a/b.html')}) or <strong>relative</strong> to the current page: ${c('pic.png')} (same folder), ${c('../img/pic.png')} (up a folder), ${c('/img/pic.png')} (from the site's root). These follow exactly the path rules of the command line.</p>
<h3 class="sub">Where web servers live</h3>
<p>A website can be a folder of files served as they are (static hosting, nearly free and very fast), or a program generating pages (a back end on a rented virtual machine, a container, or "serverless" functions). Big sites sit behind <strong>load balancers</strong> that spread requests over many identical servers, and behind <strong>CDNs</strong> that cache copies worldwide.</p>` },
    1: { html: R`
<h3 class="sub">Headers that matter</h3>
<ul><li>${c('Content-Type')} says what the body is (${c('text/html; charset=utf-8')}, ${c('application/json')}, ${c('image/png')}).</li>
<li>${c('Cache-Control')} says how long it may be reused; ${c('ETag')} with ${c('If-None-Match')} lets the browser ask "has it changed?" and get a tiny ${c('304 Not Modified')} instead of the whole file.</li>
<li>${c('Authorization')} carries credentials such as an API token.</li>
<li>${c('Set-Cookie')} options: ${c('HttpOnly')} hides the cookie from JavaScript (protecting it from stolen-script attacks), ${c('Secure')} sends it only over HTTPS, ${c('SameSite')} limits cross-site sending.</li></ul>
<h3 class="sub">REST APIs</h3>
<p>A common design maps resources to URLs and actions to methods: ${c('GET /books')} lists, ${c('POST /books')} creates, ${c('GET /books/42')} reads one, ${c('PUT /books/42')} replaces it, ${c('DELETE /books/42')} removes it. Responses are JSON with meaningful status codes. Try it in the HTTP lab.</p>
<div class="worked"><p>Which status codes fit: (a) a login with the wrong password; (b) a logged-in user opening an admin-only page; (c) too many requests per minute?</p>
<p>(a) 401 Unauthorized (not authenticated). (b) 403 Forbidden (known, but not allowed). (c) 429 Too Many Requests, often with a ${c('Retry-After')} header.</p></div>` },
    2: { html: R`
<h3 class="sub">Public-key cryptography in one picture</h3>
<p>Symmetric encryption uses one shared secret key: fast, but how do two strangers agree on a key over a network anyone can read? <strong>Public-key</strong> cryptography uses a pair: what one key locks, only the other unlocks. A server publishes its public key and keeps the private key secret. In a TLS handshake the two sides use a <strong>key exchange</strong> (Diffie–Hellman) so that both compute the same session key while an eavesdropper, who sees every message, cannot.</p>
<p>A <strong>certificate</strong> binds a domain name to a public key and is signed by a certificate authority. Your browser trusts about 150 root authorities; anything they (or authorities they vouch for) sign is accepted. Let's Encrypt issues free certificates automatically, which is why most sites now use HTTPS.</p>
<h3 class="sub">Storing passwords</h3>
<p>Servers should never store passwords, only a slow, salted <strong>hash</strong> of each (bcrypt, Argon2). A hash is one-way: easy to compute, practically impossible to reverse. The random salt makes identical passwords hash differently, defeating precomputed tables. When a site leaks its database, properly hashed passwords stay safe, except weak ones that attackers guess by brute force.</p>
<div class="worked"><p>An attacker can test $10^{10}$ guesses a second against a fast hash. How long to try every 8-character password of lower-case letters and digits?</p>
<p>$36^8 = 2.8\times10^{12}$ possibilities: under 5 minutes. With 12 characters from 94 symbols, $94^{12} \approx 4.8\times10^{23}$: over a million years. Length beats complexity, and slow hashes multiply the attacker's work.</p></div>` },
    3: { html: R`
<h3 class="sub">The critical rendering path</h3>
<p>The browser builds two trees, the DOM from HTML and the CSSOM from CSS, combines them into a <strong>render tree</strong> of visible elements, computes <strong>layout</strong> (geometry) and <strong>paints</strong>. A ${c('<script>')} tag in the head blocks parsing until the script downloads and runs, so scripts go at the end of the body or carry ${c('defer')}/${c('async')}. Changing layout-affecting properties from JavaScript in a loop can force many re-layouts: one of the commonest causes of sluggish pages.</p>
<h3 class="sub">Measuring and improving speed</h3>
<p>Page speed is mostly about <strong>fewer round trips and fewer bytes</strong>: compress text (gzip, brotli), resize and modernise images (WebP, AVIF), cache aggressively, use a CDN, and load only what the first screen needs. HTTP/2 and HTTP/3 send many files over one connection at once.</p>
<div class="worked"><p>A page needs 2 MB of resources over a 20 Mbit/s mobile link with 100 ms latency and about 6 round trips. Estimate the load time, and the gain from halving the bytes versus halving the round trips.</p>
<p>Transfer $2\times8/20 = 0.8$ s; latency $6\times0.1 = 0.6$ s; about 1.4 s. Halving bytes saves 0.4 s; halving round trips saves 0.3 s. Both matter; on slow-latency links, round trips matter more.</p></div>
<p>The <strong>developer tools</strong> in every browser (F12) show the network waterfall, the DOM, the console and performance profiles: the web developer's lab bench.</p>` }
  });

  X('py-basics', {
    0: { html: R`
<h3 class="sub">How Python runs your code</h3>
<p>Python is an <strong>interpreted</strong> language: the interpreter reads your file and runs it statement by statement (after compiling it to an internal bytecode). You can also use it interactively: type ${c('python3')} in a terminal to get the ${c('>>>')} prompt (a REPL: read, evaluate, print, loop), handy for trying things out. In this book, the Code lab runs real Python (CPython compiled to WebAssembly) inside your browser.</p>
<h3 class="sub">Reading error messages</h3>
${K('python', R`
total = 0
for i in range(3)
    total += i`)}
<p>gives ${c('SyntaxError: expected \':\'')} pointing at line 2: Python could not even start. Other errors happen while running: ${c('NameError')} (a name that was never assigned, often a typo), ${c('TypeError')} (an operation on the wrong kind of value, such as ${c('"5" + 3')}), ${c('ZeroDivisionError')}, ${c('IndentationError')}. The message names the error type, the line, and often the exact problem. Professional programmers spend a large share of their time reading such messages; learning to do it calmly is a core skill.</p>
<div class="worked"><p>What is wrong? ${c('pritn("hi")')}, ${c('print("hi)')}, ${c('print(hi)')}</p>
<p>NameError (no function called ${c('pritn')}); SyntaxError (unterminated string); NameError again, because without quotes ${c('hi')} is a variable name that was never assigned.</p></div>` },
    1: { html: R`
<h3 class="sub">More operators and built-in functions</h3>
<p>${c('abs(-3)')}, ${c('round(2.675, 2)')}, ${c('max(4, 9, 2)')}, ${c('min')}, ${c('pow(2, 10)')} and ${c('divmod(17, 5)')} (which returns ${c('(3, 2)')}, quotient and remainder together) cover most everyday arithmetic. The ${c('math')} module adds ${c('sqrt')}, ${c('pi')}, ${c('sin')}, ${c('log')}, ${c('floor')}, ${c('ceil')}.</p>
<p>Python integers have no size limit: ${c('2 ** 1000')} prints all 302 digits. Floats are 64-bit doubles (see Bits, Bytes and Data), so ${c('0.1 + 0.2')} is ${c('0.30000000000000004')}. Mixing them gives a float: ${c('3 + 2.0')} is ${c('5.0')}.</p>
<div class="worked"><p>Convert 200 minutes into hours and minutes, and find the number of whole weeks in 1000 days.</p>
<p>${c('divmod(200, 60)')} gives ${c('(3, 20)')}: 3 h 20 min. ${c('1000 // 7')} is 142 weeks (with ${c('1000 % 7')} = 6 days left).</p></div>
<h3 class="sub">Booleans are numbers too</h3>
<p>${c('True')} and ${c('False')} behave as 1 and 0 in arithmetic, so ${c('sum([x > 5 for x in data])')} counts how many values exceed 5. Comparisons chain naturally: ${c('0 <= x < 10')}.</p>` },
    2: { html: R`
<h3 class="sub">Names point at values</h3>
<p>In Python a variable is a name attached to an object, not a box with a value inside. ${c('a = 5; b = a; a = 7')} leaves ${c('b')} as 5: the assignment ${c('a = 7')} moved the name ${c('a')} to a new object and left ${c('b')} alone. This matters more for lists (Functions and Lists chapter), where two names can share one object.</p>
<h3 class="sub">Tracing a program by hand</h3>
<p>Before running code, predict it. Write a table with a column per variable and a row per line executed:</p>
${K('python', R`
x = 4
y = x * 3      # x=4, y=12
x = y - x      # x=8, y=12
y = y // x     # x=8, y=1
x, y = y, x    # x=1, y=8
print(x, y)    # 1 8`, true)}
<p>Good names make programs readable: ${c('seconds_per_day = 24 * 60 * 60')} documents itself; ${c('s = 86400')} does not. Python's style guide (PEP 8) recommends ${c('lower_case_with_underscores')} for variables and ${c('UPPER_CASE')} for constants that should never change.</p>
<div class="warn-box"><p>Do not name a variable after a built-in: after ${c('list = [1, 2]')} or ${c('sum = 0')}, the built-in function is hidden and later calls like ${c('sum(nums)')} fail with a confusing TypeError.</p></div>` },
    3: { html: R`
<h3 class="sub">String methods you will use daily</h3>
${K('python', R`
s = "  Hello, World  "
print(s.strip())               # 'Hello, World'   (remove spaces at the ends)
print(s.lower(), s.upper())
print("a,b,c".split(","))      # ['a', 'b', 'c']
print("-".join(["2025", "11", "25"]))   # '2025-11-25'
print("banana".count("a"), "banana".find("n"))   # 3 2
print("hello".replace("l", "L"))         # 'heLLo'
print("data.csv".endswith(".csv"), "42".isdigit())`, true)}
<p>Strings are <strong>immutable</strong>: methods return new strings and never change the original, so you must write ${c('s = s.strip()')} to keep the result.</p>
<h3 class="sub">Formatting numbers</h3>
<p>f-strings accept format codes after a colon: ${c('f"{x:.2f}"')} (2 decimals), ${c('f"{n:5d}"')} (width 5), ${c('f"{n:,}"')} (thousands separators), ${c('f"{x:.1%}"')} (percentage), ${c('f"{n:08b}"')} (8-digit binary).</p>
<div class="worked"><p>Read a line like ${c('"Ada 91 88 95"')} and print the name and the mean score to one decimal.</p>
<p>${c('parts = input().split()')}, then ${c('name = parts[0]')}, ${c('scores = [int(p) for p in parts[1:]]')} and ${c('print(f"{name}: {sum(scores) / len(scores):.1f}")')}, which prints ${c('Ada: 91.3')}.</p></div>` }
  });

  X('py-control', {
    0: { html: R`
<h3 class="sub">Truthiness and combining conditions</h3>
<p>Any value can be used as a condition. Empty things are false: ${c('0')}, ${c('0.0')}, ${c('""')}, ${c('[]')}, ${c('{}')}, ${c('None')}. Everything else is true, so ${c('if name:')} means "if the name is not empty".</p>
<p>${c('and')} and ${c('or')} <strong>short-circuit</strong>: in ${c('x != 0 and 10 / x > 2')} the division is never attempted when ${c('x')} is 0. Brackets make complex conditions readable, and De Morgan's laws help simplify: ${c('not (a and b)')} is ${c('(not a) or (not b)')}.</p>
<div class="worked"><p>A year is a leap year if it is divisible by 4, except century years, which must be divisible by 400. Write the condition.</p>
<p>${c('(y % 4 == 0 and y % 100 != 0) or y % 400 == 0')}. Test it: 2024 yes, 1900 no, 2000 yes, 2023 no. Always test the edge cases a rule singles out.</p></div>
<p>A one-line choice: ${c('label = "even" if n % 2 == 0 else "odd"')}. Python 3.10+ also has ${c('match')} for choosing among many patterns.</p>` },
    1: { html: R`
<h3 class="sub">Input-driven loops and loop invariants</h3>
<p>${c('while')} loops suit situations where you do not know the number of repetitions: reading until a sentinel value, retrying until input is valid, or iterating until a numerical answer converges.</p>
${K('python', R`
# Babylonian square root: repeat until the change is tiny
x, guess = 2.0, 1.0
steps = 0
while abs(guess * guess - x) > 1e-12:
    guess = (guess + x / guess) / 2
    steps += 1
print(guess, steps)     # 1.4142135623730951 5`, true)}
<p>To convince yourself a loop is correct, find an <strong>invariant</strong>: something true before and after every turn. For a sum loop, "${c('total')} equals the sum of the items processed so far". If the invariant holds and the loop stops, the result is right. And to show it stops, find a quantity that changes every turn towards the exit condition.</p>
<div class="worked"><p>How many years until £1000 at 5% interest doubles?</p>
<p>${c('money, years = 1000, 0')} / ${c('while money < 2000: money *= 1.05; years += 1')} gives 15 years (£2079). The "rule of 72" (72 ÷ 5 ≈ 14.4) estimates the same.</p></div>` },
    2: { html: R`
<h3 class="sub">Useful partners for for-loops</h3>
<p>${c('enumerate')} gives index and item together; ${c('zip')} walks several sequences side by side; ${c('reversed')} and ${c('sorted')} change the order; ${c('range(len(xs))')} is rarely needed.</p>
${K('python', R`
names = ["Ada", "Alan", "Grace"]
scores = [91, 78, 95]
for i, name in enumerate(names, start=1):
    print(i, name)
for name, s in zip(names, scores):
    print(f"{name:<6}{s:>4}")
for row in range(1, 4):            # a times table: nested loops
    print(" ".join(f"{row * col:3d}" for col in range(1, 6)))`, true)}
<h3 class="sub">for … else</h3>
<p>A loop's ${c('else')} block runs only if the loop finished without ${c('break')}: perfect for searches.</p>
<div class="worked"><p>Print the first number in a list divisible by 7, or "none".</p>
<p>${c('for x in nums:')} / ${c('    if x % 7 == 0: print(x); break')} / ${c('else: print("none")')}. Without ${c('for…else')} you would need a separate "found" flag.</p></div>` },
    3: { html: R`
<h3 class="sub">More patterns: search, filter, nested and two-pointer</h3>
${K('python', R`
nums = [3, 8, 1, 9, 4, 9]
first_big = None                   # search: stop at the first match
for x in nums:
    if x > 5:
        first_big = x
        break
evens = []                         # filter: build a new list
for x in nums:
    if x % 2 == 0:
        evens.append(x)
pairs = 0                          # nested: every pair i < j
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] == nums[j]:
            pairs += 1
print(first_big, evens, pairs)     # 8 [8, 4] 1`, true)}
<p>Notice the cost: the nested loop compares every pair, about $n^2/2$ comparisons. For 10 numbers that is nothing; for a million it is half a trillion. The Competitive Programming book is largely about replacing such loops with faster ideas.</p>
<div class="worked"><p>Trace: ${c('n = 6; f = 1; while n > 1: f *= n; n -= 2')}. What is ${c('f')}?</p>
<p>n=6: f=6; n=4: f=24; n=2: f=48; n=0 stops. 48 = 6 × 4 × 2, the "double factorial" 6!!.</p></div>` }
  });

  X('py-functions', {
    0: { html: R`
<h3 class="sub">Designing good functions</h3>
<p>A good function does one job, has a name that says what (a verb: ${c('compute_tax')}, ${c('is_valid')}), takes what it needs as parameters rather than reading global variables, and <strong>returns</strong> its answer rather than printing it, so other code can use the result. A docstring explains what it expects and returns.</p>
<h3 class="sub">Keyword arguments, *args and return values</h3>
${K('python', R`
def describe(name, *scores, sep=", "):
    """Return 'name: s1, s2, ... (mean m)'."""
    mean = sum(scores) / len(scores)
    return f"{name}: {sep.join(map(str, scores))} (mean {mean:.1f})"

print(describe("Ada", 91, 88, 95))
print(describe("Alan", 78, 82, sep=" | "))

def min_max(xs):
    return min(xs), max(xs)        # return several values as a tuple
lo, hi = min_max([4, 1, 9])`, true)}
<p>${c('*scores')} gathers any number of positional arguments into a tuple; parameters after it must be given by keyword. Functions are values too: you can pass them to other functions, as ${c('sorted(words, key=len)')} passes ${c('len')}.</p>
<div class="worked"><p>What does ${c('def f(x): x = x * 2')} followed by ${c('y = 3; f(y); print(y)')} print, and why?</p>
<p>3. Inside ${c('f')}, ${c('x')} is a new local name; reassigning it does not affect ${c('y')}. To get a result out, ${c('return x * 2')} and write ${c('y = f(y)')}.</p></div>` },
    1: { html: R`
<h3 class="sub">Slicing, copying and nested lists</h3>
<p>Slices take an optional step: ${c('xs[::2]')} every other item, ${c('xs[::-1]')} the list reversed. Assigning to a slice replaces part of a list: ${c('xs[1:3] = [0]')}. ${c('del xs[0]')} removes by position; ${c('xs.remove(v)')} removes the first matching value.</p>
<p>A list can hold lists, which is how grids are stored: ${c('grid[row][col]')}. But beware the classic trap:</p>
${K('python', R`
bad = [[0] * 3] * 2        # two references to ONE inner list
bad[0][0] = 9
print(bad)                 # [[9, 0, 0], [9, 0, 0]]  surprise!
good = [[0] * 3 for _ in range(2)]   # a new inner list each time
good[0][0] = 9
print(good)                # [[9, 0, 0], [0, 0, 0]]`, true)}
<p>${c('xs[:]')} or ${c('xs.copy()')} copies only the outer list (a <strong>shallow copy</strong>); inner lists are still shared. ${c('copy.deepcopy')} copies everything.</p>
<div class="worked"><p>Rotate ${c('[1, 2, 3, 4, 5]')} left by 2 places with slicing.</p>
<p>${c('xs[2:] + xs[:2]')} gives ${c('[3, 4, 5, 1, 2]')}.</p></div>` },
    2: { html: R`
<h3 class="sub">Why dictionaries and sets are fast</h3>
<p>Dictionaries and sets are <strong>hash tables</strong>: a key is turned into a number (its hash), which says where in an internal array to look. So ${c('key in d')} takes about the same time whether ${c('d')} has 10 or 10 million entries, while ${c('x in some_list')} must check items one by one. Keys must be <strong>immutable</strong> (numbers, strings, tuples), because a key whose hash changed would be lost; lists cannot be keys.</p>
${K('python', R`
from collections import defaultdict, Counter
groups = defaultdict(list)           # missing keys start as []
for word in ["apple", "avocado", "banana", "blueberry", "cherry"]:
    groups[word[0]].append(word)
print(dict(groups))
print(Counter("hello world").most_common(3))
a, b = {1, 2, 3, 4}, {3, 4, 5}
print(a & b, a | b, a - b)          # {3, 4} {1, 2, 3, 4, 5} {1, 2}`, true)}
<div class="worked"><p>Given a list of words, find the first word that has appeared before.</p>
<p>${c('seen = set()')}, then for each word: ${c('if w in seen: print(w); break')} else ${c('seen.add(w)')}. One pass, instant lookups, versus re-scanning the list each time.</p></div>
<p>Since Python 3.7 dictionaries remember insertion order. ${c('d.items()')}, ${c('d.keys()')} and ${c('d.values()')} let you loop over them; ${c('{k: v for k, v in pairs}')} is a dictionary comprehension.</p>` },
    3: { html: R`
<h3 class="sub">Comprehensions, generators and higher-order functions</h3>
<p>Comprehensions can nest and include conditions: ${c('[(x, y) for x in range(3) for y in range(3) if x != y]')}. Replace the brackets with parentheses and you get a <strong>generator</strong>, which produces items one at a time instead of building a list: ${c('sum(x * x for x in range(10**7))')} uses almost no memory.</p>
<p>${c('map(f, xs)')} applies a function to every item; ${c('filter(pred, xs)')} keeps items where the predicate is true; ${c('any')} and ${c('all')} test whether some or every item is truthy.</p>
<h3 class="sub">Stable sorting with several keys</h3>
${K('python', R`
people = [("Ada", 36, "London"), ("Alan", 41, "London"), ("Grace", 85, "New York"), ("Linus", 28, "Helsinki")]
print(sorted(people, key=lambda p: p[1]))                  # by age
print(sorted(people, key=lambda p: (p[2], -p[1])))         # by city, oldest first within a city
print(max(people, key=lambda p: p[1])[0])                  # oldest: Grace`, true)}
<div class="worked"><p>Why does sorting twice, first by name and then by city, give a list sorted by city with names in order inside each city?</p>
<p>Python's sort is <strong>stable</strong>: items that compare equal keep their previous order. The second sort only reorders by city, preserving the name order within each city.</p></div>` }
  });

  X('py-objects', {
    0: { html: R`
<h3 class="sub">EAFP versus LBYL</h3>
<p>Two styles of handling possible failures: "Look Before You Leap" (check first: ${c('if key in d:')}) and "Easier to Ask Forgiveness than Permission" (just try it and catch the exception). Python favours the second when failure is rare, since it avoids race conditions (a file can vanish between your check and your use) and keeps the normal path clear.</p>
<h3 class="sub">Raising your own exceptions and validating input</h3>
${K('python', R`
def read_age(text):
    age = int(text)                     # may raise ValueError itself
    if not 0 <= age <= 150:
        raise ValueError(f"age {age} is out of range")
    return age

for attempt in ["42", "-3", "forty"]:
    try:
        print("ok:", read_age(attempt))
    except ValueError as e:
        print("rejected:", e)`, true)}
<p>Exceptions travel up the call stack until something catches them; unhandled, they end the program with a traceback listing each call on the way. Catch them at the level that knows how to respond (often near the user interface), not deep inside helper functions. ${c('else')} after ${c('except')} runs only if no exception occurred.</p>
<div class="warn-box"><p>${c('except:')} with no type, or ${c('except Exception: pass')}, silently swallows typos and bugs. Catch the specific error you expect.</p></div>` },
    1: { html: R`
<h3 class="sub">Text formats: CSV and JSON</h3>
${K('python', R`
import csv, json
rows = [["name", "score"], ["Ada", 91], ["Alan", 78]]
with open("scores.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)
with open("scores.csv") as f:
    for record in csv.DictReader(f):      # each row as {'name': ..., 'score': ...}
        print(record["name"], int(record["score"]))

data = {"class": "7B", "students": [{"name": "Ada", "score": 91}]}
text = json.dumps(data, indent=2)         # Python objects -> JSON text
print(json.loads(text)["students"][0]["name"])   # and back`, true)}
<p><strong>CSV</strong> is the lingua franca of spreadsheets; the module handles quoting of commas inside fields. <strong>JSON</strong> maps directly onto dictionaries, lists, strings, numbers, booleans and ${c('None')}, and is what web APIs send.</p>
<h3 class="sub">Paths and encodings</h3>
<p>Open text files with an explicit encoding, ${c('open(path, encoding="utf-8")')}, to avoid platform surprises. The ${c('pathlib')} module handles paths portably: ${c('Path("data") / "scores.csv"')} works on Windows and Linux alike, and ${c('Path("data").glob("*.csv")')} lists matching files, the same globbing as the shell.</p>` },
    2: { html: R`
<h3 class="sub">Writing your own module</h3>
<p>Any ${c('.py')} file is a module. If ${c('geometry.py')} defines ${c('def area(r): ...')}, another file in the same folder can ${c('import geometry')} and call ${c('geometry.area(2)')}, or ${c('from geometry import area')}. Code at the top level of a module runs when it is imported, so scripts protect their "main" code:</p>
${K('python', R`
def area(r):
    return 3.14159 * r * r

if __name__ == "__main__":     # true only when run directly, not when imported
    print(area(2))`)}
<p>A folder of modules with an ${c('__init__.py')} file is a <strong>package</strong>. Third-party packages are installed with ${c('pip install name')} from the Python Package Index (over half a million packages), ideally inside a <strong>virtual environment</strong> (${c('python3 -m venv .venv')}) so each project keeps its own versions.</p>
<div class="worked"><p>Which standard modules would you reach for to (a) pick a random question, (b) time how long code takes, (c) find all .txt files, (d) count word frequencies?</p>
<p>(a) ${c('random.choice')}; (b) ${c('time.perf_counter')} or ${c('timeit')}; (c) ${c('pathlib')} or ${c('glob')}; (d) ${c('collections.Counter')}.</p></div>` },
    3: { html: R`
<h3 class="sub">Inheritance and special methods</h3>
${K('python', R`
class Shape:
    def area(self):
        raise NotImplementedError
    def __lt__(self, other):              # lets sorted() compare shapes
        return self.area() < other.area()

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14159 * self.r ** 2
    def __repr__(self): return f"Circle({self.r})"

class Rect(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h
    def __repr__(self): return f"Rect({self.w}, {self.h})"

shapes = [Rect(3, 4), Circle(1), Rect(1, 1)]
print(sorted(shapes))                     # [Rect(1, 1), Circle(1), Rect(3, 4)]
print(sum(s.area() for s in shapes))`, true)}
<p>Each subclass provides its own ${c('area')}; code that loops over shapes calls ${c('s.area()')} without caring which kind it is. This is <strong>polymorphism</strong>, the main payoff of object-oriented design. <strong>Special methods</strong> (double underscores) hook into Python's syntax: ${c('__repr__')} for printing, ${c('__eq__')} and ${c('__lt__')} for comparisons, ${c('__len__')}, ${c('__add__')} for ${c('+')}.</p>
<p>For simple records, ${c('@dataclass')} writes ${c('__init__')}, ${c('__repr__')} and ${c('__eq__')} for you. Prefer composition (an object <em>has</em> another) to deep inheritance chains; inheritance suits genuine "is a kind of" relationships.</p>` }
  });
})();
