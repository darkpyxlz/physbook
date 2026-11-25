# Scibook

An interactive textbook for students working towards olympiads in mathematics, physics, chemistry, biology and astronomy (and the SYPT/IYPT style of problem solving), and for anyone learning to program, from the command line to competitive programming. Instead of separate subjects it is one tech tree of 139 modules in 32 small books, with maths at the centre, physics branching out of maths, chemistry and astronomy out of physics, biology out of chemistry, and computing on its own branch from the centre. Three of the sciences have their own game, and all of them feed one shared level, streak, quest list and badge collection.

Every module (chapter) has four parts:

- **Learn**: the theory, with key results, common traps and insight boxes, plus quizzes and interactive figures inside the text (see below).
- **Lab**: one or two interactive simulations with suggested experiments.
- **Problems**: a scored set that climbs from concept checks to olympiad-level problems, with hints and full solutions.
- **Formulas**: the chapter's key results, also collected on a formula sheet grouped by subject.

| Subject | Chapters | Labs | Scored problems | Drill templates | Game |
|---------|---------:|-----:|----------------:|----------------:|------|
| Maths | 24 | 48 | 336 | 72 | — |
| Physics | 24 | 48 | 516 | 96 | — |
| Chemistry | 26 | 52 | 450 | 104 | ChemCorp |
| Biology | 28 | 56 | 480 | 112 | Cytos |
| Astronomy | 16 | 32 | 288 | 64 | Firmament |
| Computing | 21 | 62 | 246 | 57 | Code lab: 35 judged challenges |
| **Total** | **139** | **298** | **2316** | **505** | |

Every science chapter has at least two labs. Many second labs use a shared explorer engine (`js/sims-explore.js`), so a chapter can describe a small model (controls, curves, a picture and a readout) as a config instead of new drawing code.

## Learning in the text

The Learn tab is built to keep the learning curve gentle (`js/learn.js`, `js/bigideas.js`, `js/figures.js`):

- **The big idea**: every chapter opens with a plain-language summary and an everyday picture, before any formula.
- **Before you start**: a fold-out refresher of the prerequisite chapters, with their big ideas and key formulas.
- **Try it**: the worked examples are quizzes, not reveal boxes. You answer first (number or multiple choice), can ask for one step-by-step hint at a time, and the worked solution opens once you are right or after two honest attempts. Each first solve pays 3 XP.
- **Check your understanding**: each chapter's scored concept checks appear inline, right after the section they test (matched by the words they share). Solving them there counts towards the chapter.
- **Figures**: every chapter has at least one interactive figure inside the text (a slider-driven plot or diagram), 117 in all.
- Maths chapters also carry authored **quick checks** in the middle of each section.
- **In plain words**: every one of the 495 sections opens with a one- or two-sentence summary in everyday language, so you know where the section is going before the details start (`js/plain.js`, `js/plain/*.js`).
- **Glossary**: 328 key terms get a dotted underline the first time they appear in a section. Hover, tap or tab to one to see a plain definition without leaving the page. Words are matched to the subject (so "induction" means one thing in physics and another in maths), text inside equations is never touched, and the whole list is searchable at `#glossary`, where the summaries and underlines can also be switched off.
- **Say it back**: each section ends with a self-explanation prompt. You write the idea in a sentence or two, then compare it with the plain-words summary (+3 XP the first time).

## Adaptive practice

`js/adaptive.js`, page `#adapt` (or `#adapt-<chapter>` for one chapter).

- Every answer anywhere in the book (problems, inline checks, Try-it quizzes, gym drills) updates a per-chapter skill estimate with a simple logistic (Elo-style) model. Each chapter page shows the resulting **mastery** bar.
- Adaptive practice serves the question you have about a 70% chance of getting right, chosen from the chapter's unsolved problems and its randomised drills.
- After a mistake it switches to an easier **stepping stone** and offers a link back to the section that explains the idea. After three right in a row it serves a **stretch** question.
- Chapters where you slipped come back for **spaced review** after 10 minutes, then 1, 3, 7, 16 and 35 days. The dashboard shows how many reviews are due.
- Across the whole book it weights weaker chapters more heavily, and always does due reviews first.
- Practice comes in **sessions of 10 questions**, with a progress bar and an end card (score, XP, best run, time). A perfect session pays 20 XP and a Double XP boost.

## Guided solving

`js/guide.js`. Every problem card has a **Guide me step by step** button that turns the problem into a short tutoring dialogue, following Pólya's four phases (understand, plan, carry out, look back). Each step asks you a question before moving on:

- **Understand**: what unit will the answer have? Which option can you rule out straight away?
- **Estimate**: roughly how big should the answer be (an order-of-magnitude range)?
- **Plan**: what idea or law connects what you know to what you want? (Built from the problem's hints, with a "do you see why?" self-explanation check.)
- **Carry out**: intermediate numbers to calculate, each checked separately, with "Show me this step" if you are stuck.
- **Look back**: after the final answer, a link to more practice on the same idea.

The first core problem of every chapter has hand-written steps (`js/steps/*.js`, via `PB.addSteps`); every other problem gets automatic steps from its units, options and hints. Each correct step pays 2 XP, and a guided solve is worth 70% of the points. Scaffolding fades as you improve: once your mastery of a chapter reaches 65%, the guide skips the warm-up steps.

## Maths

Twenty-four chapters in six parts. It is a self-contained track: the other subjects do not require it.

| Part | Chapters |
|------|----------|
| Precalculus | Functions and their graphs; sequences, sums and the binomial theorem |
| Calculus | Limits and continuity; the derivative; using derivatives; the integral; techniques of integration |
| Further calculus | Sequences, series and Taylor polynomials; differential equations; calculus in several variables; vector calculus; complex numbers |
| Linear algebra and statistics | Vectors and matrices; probability and statistics |
| Olympiad foundations | Proof and problem-solving; number theory; counting and probability; recurrences and generating functions |
| Olympiad topics | Inequalities; polynomials and functional equations; olympiad geometry; graph theory; games, invariants and strategy; Diophantine equations |

Labs include a function transformer, an ε–δ zoom, secant-to-tangent, Newton's method, Riemann sums and the area function, Taylor polynomials, slope fields and Euler's method, contour maps with gradients, roots of unity, Collatz, times tables on a circle, Pascal's triangle mod m, Monte Carlo π, AM–GM in a semicircle, Lagrange interpolation, the inscribed angle theorem, the Euler line and the power of a point. Many figures and labs have **draggable points**: drag matrix columns, vector-field endpoints, regression data, graph vertices or the bounds of a normal distribution, and play Nim against a perfect computer opponent.

## The motivation loop

`js/loop.js`. Learning earns XP; XP fills three meters at once, and each one pays coins, gems, boosts and mystery boxes.

- **Daily goal** (Casual 20, Regular 60, Serious 120 or Intense 200 XP, shown as a ring in the header): reaching it pays coins and keeps your streak. **Streak milestones** at 3, 7, 14, 30, 60 and 100 days pay gems and chests. **Streak freezes** (200 gems, hold up to two) are used automatically if you miss a day.
- **Chapter rewards**: each chapter star pays out (coins, then gems, then a premium box for the third), passing a chapter pays coins, and reaching 50% and 80% mastery pays gems.
- **Today's plan** on the dashboard lists the next best actions with their payoff: the next section to read, reviews due, the ×2 daily challenge, unclaimed pass rewards, or spending your loot.
- **Feedback**: a reward window with confetti for every milestone, a floating "+XP" on each solved problem, level-up celebrations, and damage numbers and hit shakes in fights.

### Gamification v2

`js/loop2.js`, based on a review of how Duolingo, Khan Academy and Brilliant use game elements and on the research behind them (see [docs/GAMIFICATION.md](docs/GAMIFICATION.md)). Rewards are tied to learning behaviour (accuracy, mastery, explaining, coming back), not just time spent.

- **Combo**: each first-try correct answer in a row (without hints or the guide) adds bonus XP, up to +10 per answer.
- **Double XP boosts**: earned by finishing all three daily quests, perfect sessions and from mystery boxes. You choose when to start one (15 minutes); it shows as a ⚡2× chip in the header.
- **Mastery levels** (as on Khan Academy): every chapter is Not started, Attempted, Familiar, Proficient or Mastered, shown on its page and on the chapter cards, and each subject page shows its overall course mastery.
- **Mastery challenge** (`#challenge-<chapter>`): five fresh questions with no hints. Five out of five earns the chapter's crown, Mastered level, 100 gems and a key.
- **Monthly challenge**: earn 1500 XP in a calendar month for 150 gems, a premium mystery box and that month's badge.
- **Achievements with tiers** (I to V) for solving, reading, guided steps, labs, crowns, streaks and perfect sessions, plus **personal bests** (best day, longest combo, longest streak).
- **Gentle nudges**: a toast when you are 70% of the way to your daily goal, and an evening banner if your streak is at risk.
- **Welcome**: a new learner picks a daily goal and a starting subject, and gets a 10 XP head start.

## Tech tree dashboard and books

`js/tree.js`. The dashboard (`#home`) is a tech tree of all 118 modules.

- **One centre, branching outwards**: Functions and Their Graphs sits at the centre. Every other module is placed on a ring by how many prerequisites deep it is (17 rings), in a wedge under the module it most depends on, so the map grows like a tree: maths around the centre, physics branching out of maths, chemistry and astronomy out of physics, biology out of chemistry. Coloured lines are the main branches; faint dashed lines are extra prerequisites. Selecting a module highlights what it needs and what it unlocks.
- Nodes show subject colour, progress ring, mastery (filled more as mastery grows), ★ passed, ♛ mastered and 🔒 locked. Drag to pan, scroll or pinch to zoom, and use the buttons to zoom, see the whole tree or re-centre. On phones a list of books sits under the map.
- Selecting a module opens its book alongside, with that module highlighted and the **next tasks** for each module: read the next section (it jumps straight there), predict and test in the lab, pass it, adaptive practice, or the mastery challenge. **Up next for you** lists the three best tasks across the tree.
- **Books**: the 27 books (the old topic sections, such as Mechanics or Organic Chemistry) are short modular courses of 2–9 modules. The **Library** (`#library`) lists them, each has a page (`#book-<id>`), and the header and sidebar navigate by book.
- **Calculus-based physics**: physics modules need the maths they use (`js/tree.js`): Kinematics and Newton's laws need derivatives; energy, momentum, rotation, gravitation, fluids, thermodynamics and electrostatics need integrals; oscillations, RC circuits and quantum need differential equations; waves and analytical mechanics need several-variable calculus; magnetism and relativity need vectors and matrices; induction and quantum need complex numbers. Chemical kinetics needs integrals and Kepler's laws need derivatives.
- Modules unlock Duolingo-style from their prerequisites (`js/prereqs.js`, plus the maths links in `js/tree.js`); a module you have already worked in always stays open. **Test out**: 4 of 5 drills from the missing prerequisites opens a module for good. Free roaming can be switched on in Level & badges.

## Play

The game layer is built around learning rather than a separate game (`js/wallet.js`, `js/predict.js`, `js/cards.js`, `js/journal.js`, `js/campaign.js`, data in `js/play/`).

- **Wallet**: ◉ coins and 💎 gems. Coins are staked on lab predictions; gems buy streak freezes. Both come from goals, streaks, chapter stars, mastery and the features below.
- **Mystery boxes and critical insights** (variable rewards): boxes hold a random reward (coins, gems, a Double XP boost, a streak freeze, or a rare jackpot). A clean first-try solve sometimes drops one: 3% for concept checks, 8% for core and 18% for olympiad problems, at most three a day, and guaranteed after 14 clean solves without one.
- **Predict, then test**: the Lab tab of every chapter opens with a prediction about its first lab (118 in all). Pick an answer and stake 0–50 coins, run the experiment, and the answer unlocks once you have used the lab. Right pays back double the stake.
- **Collections** (`#cards`): every problem you solve for the first time drops a card from that subject's collection: **Famous numbers** (maths, 95), the **Particle zoo** (physics, 97: quarks, leptons, bosons, mesons, baryons, exotic hadrons, nuclei, quasiparticles and hypothetical particles), the **Periodic table** (chemistry, all 118 elements, laid out as the table), the **Tree of life** (biology, 104 organisms) and the **Messier catalogue** (astronomy, all 110 objects), 524 cards in all. Cards have five rarities sorted as a pyramid in every collection (about 40% common, 27% uncommon, 18% rare, 10% epic, 5% legendary, `js/play/rarity.js`): elements get rarer towards the heavy and synthetic ones, Messier objects by how faint they are, and the album can be sorted by rarity, catalogue order or owned first. Concept, core and olympiad problems have increasingly generous odds, an epic is guaranteed within 25 cards of a collection and a legendary within 80, duplicates become shards, and shards craft any missing card. Completing 25/50/75/100% of a collection pays gems (and a premium box at 100%). Problems solved before collections existed give unopened cards.
- **Mistake journal** (`#journal`): every wrong answer to a scored problem is logged with what you entered. Tag what went wrong (misread, concept, units, algebra, where to start) and the page shows your most common slip with advice. Fixing a mistake at least 20 hours later pays double XP.
- **In the wild** (`#wild`): passing a chapter unlocks a card on where its ideas are used in real life (GPS, mRNA vaccines, RSA encryption…) and an Olympiad challenge, the chapter's hardest problem, worth +25 bonus XP.

The earlier gear RPG, Study Pass, weekly league and raid have been removed; old gold and keys were converted to coins.

## Physics

| # | Chapter | Lab(s) |
|---|---------|--------|
| 1 | The Physicist's Toolkit | Taylor approximation explorer, vector playground |
| 2 | Kinematics | Projectile launcher with air drag |
| 3 | Newton's Laws and Forces | Block on an incline |
| 4 | Work, Energy and Power | Energy on a track |
| 5 | Momentum and Collisions | Collision track (with centre-of-mass frame), rocket staging |
| 6 | Rotational Dynamics | Rolling race |
| 7 | Gravitation and Orbits | Orbit launcher (Kepler's second law) |
| 8 | Oscillations | Driven, damped oscillator |
| 9 | Fluids | Sink or float, draining tank |
| 10 | Waves and Sound | Superposition, Doppler and shock cones |
| 11 | Temperature, Heat and Kinetic Theory | Gas in a box (Maxwell distribution, pressure), blackbody spectrum |
| 12 | The Laws of Thermodynamics | Engine cycles on a P–V diagram |
| 13 | Electrostatics | Field lines and equipotentials |
| 14 | Capacitors, Current and DC Circuits | RC charging and discharging |
| 15 | Magnetic Fields and Forces | Charges in E and B fields, fields of currents |
| 16 | Induction, AC Circuits and EM Waves | Series RLC with phasors, magnet through a coil |
| 17 | Geometric Optics | Ray diagram bench, refraction and TIR |
| 18 | Wave Optics | Slits and gratings |
| 19 | Special Relativity | Minkowski diagram, light clocks |
| 20 | Quantum and Atomic Physics | Photoelectric effect, particle in a box |
| 21 | Nuclear and Particle Physics | Radioactive decay (with decay chains) |
| 22 | Analytical Mechanics | Effective potential explorer, chaos in a double pendulum |
| 23 | Astrophysics and Cosmology | Blackbody spectrum, exoplanet transit |
| 24 | Experimental Physics and Data Analysis | Measuring g with a pendulum (least-squares fit) |

## Chemistry

Parts: Foundations, Physical Chemistry, Inorganic Chemistry, Organic Chemistry, Analysis.

| # | Chapter | Lab |
|---|---------|-----|
| 1–4 | Moles and stoichiometry; solutions; atomic structure; the periodic table | Limiting reagent, Beer–Lambert, Aufbau filler, periodic trends |
| 5–7 | Bonding and lattice energy; molecular shapes; gases | Born–Haber/Kapustinskii, VSEPR shapes, van der Waals gas |
| 8–14 | Thermochemistry; Gibbs energy; equilibrium; acids and bases; titrations; kinetics; electrochemistry | Calorimeter, ΔG = ΔH − TΔS, equilibrium shifts, speciation, titration curves, rate laws, galvanic cell |
| 15–16 | Main-group chemistry; transition metals | Ellingham diagram, crystal-field splitting |
| 17–19 | Organic structure; reaction mechanisms; carbonyls and synthesis | Homologous series, SN1/SN2, synthesis planner |
| 20 | Spectroscopy | ¹H NMR simulator |
| 21 | Crystal Structures and the Solid State | Unit cells, powder diffraction |
| 22 | Hydrogen and the s-Block | Decomposing group 2 carbonates, flame colours |
| 23 | The p-Block: Groups 13 to 15 | The Haber compromise, building silicates |
| 24 | Oxygen, Sulfur, the Halogens and the Noble Gases | The contact process, halogen trends |
| 25 | Coordination Chemistry in Depth | Stepwise complex formation, the chelate effect |
| 26 | Redox Diagrams and Inorganic Analysis | Frost diagrams, Pourbaix diagram of iron |

## Biology

Parts: Cells and Molecules, Genetics, Physiology, Diversity of Life, Evolution and Ecology (following Campbell Biology and the IBO syllabus).

| # | Chapter | Lab |
|---|---------|-----|
| 1 | The Molecules of Life | Amino acid charge against pH |
| 2 | Cells and Microscopy | Diffusion into agar cubes (SA : V) |
| 3 | Membranes and Transport | Nernst and Goldman–Hodgkin–Katz potentials |
| 4 | Enzymes | Michaelis–Menten and Lineweaver–Burk with inhibitors |
| 5 | Cellular Respiration | ATP accounts for glucose and fat |
| 6 | Photosynthesis | Limiting factors |
| 7 | The Cell Cycle, Mitosis and Meiosis | Root tip squash (mitotic index) |
| 8 | DNA, Replication and Biotechnology | PCR amplification curve |
| 9 | Gene Expression | Mutation workbench (real genetic code) |
| 10 | Mendelian Inheritance | Breed and test (χ²) |
| 11 | Linkage, Sex Linkage and Pedigrees | Mapping by recombination |
| 12 | Population Genetics | Wright–Fisher drift and selection |
| 13 | Gas Exchange and Circulation | Oxygen dissociation and the Bohr shift |
| 14 | Nerves, Synapses and Muscle | Live Hodgkin–Huxley neuron |
| 15 | Homeostasis, Hormones and the Kidney | Glucose tolerance test |
| 16 | Immunity and Infectious Disease | SIR epidemic and herd immunity |
| 17 | Plant Transport and Plant Biology | Plasmolysis and water potential |
| 18 | Evolution, Speciation and Phylogeny | Molecular clock with Jukes–Cantor correction |
| 19 | Population Ecology | Mark and recapture |
| 20 | Communities and Ecosystems | Lotka–Volterra predator–prey cycles |
| 21 | Cell Communication | Receptor occupancy, amplification in a cascade |
| 22 | Viruses, Prokaryotes and Protists | Bacterial growth curve, antibiotic selection |
| 23 | Plant and Fungal Diversity | Alternation of generations, a fungal colony |
| 24 | Animal Diversity | Kleiber's law, bone scaling |
| 25 | Animal Nutrition and Digestion | Energy balance, building an absorbing surface |
| 26 | Reproduction and Development | Hormones of the menstrual cycle, cleavage |
| 27 | Plant Growth, Reproduction and Responses | Auxin dose responses, measuring the night |
| 28 | Animal Behaviour | Hawks and doves, when to leave a patch |

## Astronomy

Parts: The Sky, The Solar System, The Stars, Galaxies and Cosmology.

| # | Chapter | Lab |
|---|---------|-----|
| 1 | The Celestial Sphere | Star paths across the sky |
| 2 | Time, the Sun and the Seasons | Day length through the year |
| 3 | The Moon, Eclipses and Tides | Phases of the Moon |
| 4 | Light and Telescopes | Resolving a double star (Airy patterns) |
| 5 | Kepler's Laws and Planetary Motion | Orbit launcher |
| 6 | The Planets | Planetary temperatures and the greenhouse effect |
| 7 | Moons, Small Bodies and Spaceflight | Hohmann transfer |
| 8 | Exoplanets and the Search for Life | Radial-velocity detection, transit light curve |
| 9 | Brightness and Distance | Parallax over a year |
| 10 | Starlight and Spectra | Blackbody spectrum |
| 11 | The Hertzsprung–Russell Diagram and the Sun | HR diagram |
| 12 | Binary Stars and Stellar Masses | Eclipsing binary light and velocity curves |
| 13 | The Lives and Deaths of Stars | Stages of a star's life |
| 14 | The Milky Way | Galaxy rotation curve and dark matter |
| 15 | Galaxies and the Distance Ladder | Cepheid distances, measuring the Hubble constant |
| 16 | Cosmology | Expansion history from the Friedmann equations |

## Computing

Twenty-one modules in five books (`js/computing/*.js`), with a code interpreter built in (`js/code.js`). Computing grows from the centre of the tech tree on its own branch: the command line needs nothing before it.

| Book | Modules |
|------|---------|
| How Computers and the Web Work | Files, folders and the command line; bits, bytes and data; how the internet works; how the web works (HTTP, HTTPS, the browser) |
| Python | Values, variables and types; decisions and loops; functions, lists and dictionaries; errors, files, modules and classes |
| JavaScript and the Web | JavaScript fundamentals; HTML, CSS and the DOM; asynchronous JavaScript, APIs and servers |
| C++ | Compiling, types and functions; memory (stack, heap, references, pointers); the STL, classes and templates |
| Competitive Programming | Judges, complexity and brute force; sorting, binary search, prefix sums and two pointers; recursion, backtracking and greedy; dynamic programming; graphs (DFS, BFS, Dijkstra); data structures (stacks, heaps, union-find, Fenwick trees); number theory for programmers |

Competitive programming lives here rather than under maths; its number-theory module builds on the maths chapter of the same name.

- **Code interpreter** (`js/code.js`, page `#code`): an editor with syntax highlighting, line numbers, auto-indent and Ctrl+Enter to run. **Python** runs in the browser with Pyodide in a Web Worker (the same version as the equation board, so it is cached once), with `input()`, `sys.stdin` and imports of packages such as numpy. **JavaScript** runs in a sandboxed worker with a Node-like `console.log`, `readline()`, `require('fs')`/`require('readline')` and top-level `await`. **C++** (GCC 13, C++17, -O2) is compiled and run on Compiler Explorer (godbolt.org), with Wandbox as a fallback, so it needs internet. **Web pages** (HTML, CSS and JS) render in a sandboxed iframe with their console shown underneath. Infinite loops are stopped by a time limit, and drafts are saved as you type.
- **Judged challenges**: 35 contest-style problems (`PB.addChallenge`) with samples and hidden tests, including large tests that only an efficient algorithm passes. Submit gives a verdict per test, like an online judge: Accepted, Wrong answer, Runtime error, Time limit exceeded or Compilation error. Each challenge has hints and a model solution; the first Accepted pays XP and coins. They appear in chapter labs and in the Problem set tab of `#code`, and open full screen at `#code-<id>`. Expected outputs of hidden tests are computed by JavaScript reference solutions, and every model solution is checked against them. Compiler Explorer cuts program output at about 32 kB, so every test's expected output stays below that.
- **Practice terminal** (`js/terminal.js`): a pretend Unix shell with its own file system (stored in the browser) for the command-line module: `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `cat`, `echo` with `>` and `>>`, pipes, `grep`, `sort`, `uniq`, `wc`, `find`, `tree`, `chmod`, globs, Tab completion and history, plus `python3 file.py` and `node file.js` through the interpreter. 19 guided missions pay 3 XP each.
- **Labs** (`js/sims-cs.js`): bits, hex and UTF-8 bytes; the journey of a web request (DNS, TCP, TLS, HTTP) as a sequence diagram; packets routed through a network with loss, cut links and retransmission; an HTTP playground against a pretend server and JSON API; a sorting race of six algorithms; binary search; BFS, DFS, Dijkstra and A* on a grid you draw; DP tables (LCS, edit distance, knapsack) with traceback; recursion trees with and without memoisation; the JavaScript event loop; memory diagrams of names and objects (Python) and of stack, heap and pointers (C++); a binary heap.
- The cheat sheet tab replaces the formula tab for computing (formula entries with a third element, a language, render as highlighted code), and code examples in the text have a **Try it** button that opens them in the playground.
- The rest of the platform works as for the sciences: plain-words summaries and 40 computing glossary terms, quizzes in the text, drills for the gym and test-outs, a prediction for each module's first lab, In the wild cards, and the **Hall of computing** card collection (59 cards: languages, algorithms, machines, pioneers).

## Games

Each science tab has a game that runs inside Scibook (`#game-chemistry`, `#game-biology`, `#game-astronomy`). They are copies of the standalone games in `games/`:

- **ChemCorp** (chemistry): an organic chemistry idle game; run real reactions, research them and automate a plant.
- **Cytos** (biology): you are a cell; express genes, build organelles, respire, signal, repair DNA and fight viruses.
- **Firmament** (astronomy): run a space corporation on the real night sky and colonise all 88 constellations.

Scibook reads each game's own save to show progress on the subject page, and correct answers in a game's quiz school earn 2 XP each (up to 100 XP a day).

## Equation board

A symbolic solver for working through multi-equation problems visually (sidebar → **Equation board**, or `#solver`).

- **Add equations** in plain text: `v = u + a*t`, `F = G*M*m/r^2`, `T = 2*pi*sqrt(L/g)`, `N = N_0*exp(-lambda*t)`. Use `*` for products (or a space: `m g h`), `^` for powers and Greek names (`theta`, `omega`, `lambda`, `mu`). `DeltaT` shows as $\Delta T$.
- **Subscripts**: `v_0`, `theta_1`, `F_net`, `v_{max}` and `v_{1,x}` all work (multi-letter subscripts are set upright, $F_{\mathrm{net}}$).
- **Functions**: the usual `sin cos tan asin acos atan sinh cosh tanh exp ln log sqrt cbrt abs sign floor ceil`, plus `log(x, b)` for other bases. A quantity can be written as a function of something, such as `x(t) = A*cos(omega*t)` or `v(0) = u` (only when the brackets hold plain names or numbers, so `m(u + v)` is still a product). Linking `x` to another card's `x(t)` substitutes the whole function, and `x(u)` becomes the same expression in `u`.
- **Derivatives and integrals**: `dx/dt`, `d^2x/dt^2`, `d/dt(m*v)`, `diff(x, t)`, `diff(x, t, 2)`, `int(F, x)` and `int(F, x, 0, d)`; in LaTeX `\frac{dx}{dt}`, `\frac{d^2x}{dt^2}`, `\frac{d}{dt}\left(mv\right)`, `\dot{x}`, `\ddot{x}`, `\int_0^d F\,dx` (also with `\mathrm{d}x`, and `\infty` as a limit). A derivative or integral is worked out as soon as what is inside is written in terms of its variable, so linking `x(t) = A cos ωt` into `v = dx/dt` gives `v = −Aω sin ωt`, and linking `F = kx` into `W = ∫₀ᵈ F dx` gives `W = kd²/2`. Until then it stays as `dx/dt`, because `x` might depend on `t`. The **∫d** button on a card works it out anyway, treating everything not written in terms of the variable as a constant. With known values, a lone `dx/dt` can still be solved for as a number.
- **Equation lookup**: a searchable library of 222 equations across 12 topics. Search by name ("pendulum"), quantity ("heat", "current"), symbol (`Q`, `theta`) or idea ("derivative"), or filter by topic. Every symbol is explained with its unit.
- **Same letter, different quantity**: library equations know what each symbol means. If you add one whose `Q` is heat while the board already has `Q` as charge, the new one becomes `Q_heat` automatically (Undo puts it back), so the two never share a known value or get confused. Hovering a chip shows its meaning, and linking two chips with different meanings shows a warning. For any card you can also press a chip and choose **Rename … in this card only**.
- **Or type LaTeX** into the same box: `\frac{1}{2}mv^2 = mgh`, `T = 2\pi\sqrt{\frac{L}{g}}`, `x = A\cos\omega t`, `n_1\sin\theta_1 = n_2\sin\theta_2`, `Q = mc\Delta{T}`. Anything with a backslash is read as LaTeX. In LaTeX, letters side by side multiply (`mgh` is $m\,g\,h$), so write multi-letter names as `\mathrm{KE}` or with a subscript (`v_{\text{max}}`). A pasted `\begin{equation}…\end{equation}` block works too.
- **Equation maker**: a visual editor ([MathLive](https://cortexjs.io/mathlive/), loaded on demand) with an on-screen maths keyboard and buttons for fractions, subscripts, powers, roots, derivatives, integrals, functions of `t` and Greek letters. It shows how the equation will be read before you add it.
- **Graphs**: press a chip and choose **Graph … against another quantity**. The card is rearranged for that quantity and plotted; pick the axes and range, and drag a slider for each other quantity to see how the curve moves. Sliders start from Known values. A known value of the plotted quantity shows as a dashed line (where it crosses the curve is the answer), a known value on the horizontal axis as a dot, and hovering reads off values.
- Each card shows its variables as coloured chips. The same name always has the same colour; hovering a chip draws dotted lines to its matches on other cards.
- **Drag from a chip onto a chip on another card** to say they are the same quantity. The link's menu lets you substitute either way: "use (1) to replace $a$ in (2)" solves (1) for $a$ and puts it into (2), making a new card with the working shown. Linking different names (the $v$ at the end of one stage is the $u$ at the start of the next) works the same way. Taps work too: press a chip, then "Link to a different variable…".
- **Press a chip** to rearrange that card for the variable.
- **Known values**: type numbers (SI units) in the side panel. Each card then shows what it can work out, with a **Use** button to feed the answer back in. Angles can be in radians or degrees.
- **Signs**: quantities are treated as positive by default, so $\sqrt{v^2}$ is $v$ and negative roots are dropped. Press **±** next to a variable in Known values (or "Allow … to be negative" in a chip's menu) for things like velocity, acceleration or charge. Its chips get a ± badge, results keep both roots, and negative numerical answers are shown.
- **Export LaTeX**: tick the box at the top left of the cards you want, then **Export LaTeX**. Choose `equation`, `equation*`, `align`, `align*`, `gather` or `\[ … \]`, optionally add `\label{eq:n}` and comments saying where each result came from, and copy it or download a `.tex` file.
- Undo (or Ctrl+Z) reverses any change. The board is saved in `localStorage`.

The algebra is [SymPy](https://www.sympy.org) running in the browser through [Pyodide](https://pyodide.org) (v0.26.4 from jsDelivr). It downloads on first use (about 15 MB, then cached), so the board needs an internet connection the first time.

## Scoring and gamification

- Concept problems are worth 10 points, core 20 and olympiad 40.
- Each hint costs 25% of the base points; a wrong numerical answer costs 15% and a wrong multiple-choice answer 34%. A problem never drops below 20% while you keep trying. Viewing the solution forfeits the problem.
- Reading a section or exploring a lab earns 5 XP. Badges add 25 XP each.
- A daily challenge (a core or olympiad problem picked by date) pays double.
- XP moves you up a 15-level ladder from *Curious Observer* to *Laureate*. Day streaks, chapter stars (one each for finishing the concept, core and olympiad sets) and 43 badges, including ones for each science and for playing the games, track progress.
- **Daily quests**: three goals a day (for example "solve an olympiad problem" or "reach a ×5 combo") each pay bonus XP, plus 40 XP for finishing all three.
- **Practice gym**: endless drills with fresh numbers every time. Consecutive correct answers build a combo multiplier (up to ×3). **Sprint** mode counts correct answers in 90 seconds and keeps your best. Gym XP is capped at 200 a day.
- The **Level & badges** page shows a 20-week activity heatmap and gym statistics.
- Numerical answers accept scientific notation (`3e8`, `3×10^8`) and simple expressions (`2*pi*sqrt(2)`), and are graded within a tolerance (usually 2%).

Progress is stored in the browser's `localStorage`. The **Level & badges** page can export it as text and import it on another device.

## Running it

It is a static site with no build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`. Math is typeset with MathJax 3 loaded from jsDelivr, so the first load needs an internet connection. The code lab also loads Pyodide from jsDelivr on the first Python run, and compiles C++ online, so those need a connection too.

## Project layout

```
index.html            page shell and script order
css/style.css         all styles (light and dark themes)
js/core.js            content registry, scoring, levels, badges, answer parser
js/sims.js            lab engine helpers and labs for chapters 1–10
js/sims2.js           labs for chapters 11–21
js/sims3.js           added labs (rocket, tank, blackbody, wires, coil, light clock) and labs for chapters 22–24
js/sims-chem.js       chemistry labs
js/sims-bio.js        biology labs
js/sims-astro.js      astronomy labs
js/practice.js        extra problems and labs appended to chapters 1–21
js/drills.js          randomised drill generators for the practice gym
js/gym.js             practice gym, daily quests panel and activity heatmap
js/chapters/NN-*.js   one file per physics chapter: sections, labs, formulas, problems
js/chemistry/NN-*.js  chemistry chapters (with their drills)
js/biology/NN-*.js    biology chapters (with their drills)
js/astronomy/NN-*.js  astronomy chapters (with their drills)
js/maths/*.js         maths chapters, several per file, with their drills, quick checks and figures
js/computing/*.js     computing chapters, several per file, with their drills and judged challenges
js/code.js            code interpreter (Python, JavaScript, C++, web pages), editor, judge, #code and #code-<id>, PB.csKit
js/terminal.js        the practice terminal with its pretend file system and missions
js/sims-cs.js         computing labs (bits, request journey, packets, HTTP, sorting, search, graphs, DP, event loop, memory, heap)
js/play/computing-play.js  computing predictions, In the wild cards, campaign region and card collection
js/bigideas.js        the plain-language "big idea" for every chapter
js/learn.js           Try-it quizzes, inline concept checks, refreshers, PB.addFigures
js/figures.js         interactive figures inside the text of the science chapters
js/adaptive.js        mastery model, adaptive practice and spaced review, #adapt
js/loop.js            daily goal, streaks and freezes, chapter rewards, reward window, #goal
js/tree.js            the unified skill tree dashboard, books, library, #home, #library, #book-<id>
js/guide.js            guided step-by-step solving (Pólya phases, auto and authored steps)
js/steps/*.js          hand-written guided steps for the first core problem of every chapter
js/loop2.js            combos, Double XP boosts, mastery levels and challenges, monthly challenge, achievements, personal bests, nudges, welcome
js/plain.js            plain-words summaries, glossary tooltips, say-it-back prompts, #glossary
js/plain/*.js          the summaries (one per section) and the glossary entries
js/games.js           game tabs and progress read from the games' saves
js/sims-explore.js    the general explorer lab engine and PB.addLabs
js/prereqs.js         the skill tree: prerequisites, locks, test-outs, #tree
js/wallet.js          coins and gems, mystery boxes, critical insights
js/predict.js         lab prediction bets (data: js/play/predictions.js)
js/cards.js           rarity card collections, #cards (data: js/play/collections.js)
js/journal.js         mistake journal, #journal
js/campaign.js        In the wild, #wild (data: js/play/wild-data.js)
js/extra/*.js         second labs, further problem batches (including maths-extra.js) and extra drills (drills-extra.js); loaded last so problem ids stay stable
games/                copies of ChemCorp, Cytos and Firmament
js/app.js             routing, views, problem cards, HUD
js/solver.js          equation board UI (cards, wires, menus, known values)
js/solver-engine.js   the board's SymPy code (Python, as a string run by Pyodide)
js/solver-library.js  the searchable equation library, with a meaning and unit for every symbol
```

## Adding content

Each chapter file calls `PB.addChapter({...})` with a `subject` (`physics` by default, or `maths`, `chemistry`, `biology`, `astronomy`, `computing`) and a `part` from that subject's list in `PB.SUBJECTS`. Text is HTML with `$...$` and `$$...$$` for math, written inside `PB.R` (`String.raw`) template literals so LaTeX backslashes need no escaping. A problem looks like:

```js
{ level: 'core', type: 'num', title: 'Short title',
  q: R`<p>Question with $math$.</p>`,
  answer: 0.5 * 27 * 9, tol: 0.01, unit: 'm',
  hints: [R`First hint.`],
  solution: R`<p>Worked solution.</p>` }
```

`type` can be `num` (numerical, graded within `tol`), `mcq` (`answer` is the option index) or `multi` (`answer` is an array of indices).

A chapter can also carry `big` (its plain-language opening), `figures` (interactive figures in the text: `{ s: sectionIndex, title, caption, params }`, where `params` is an explorer config) and, per section, `quizzes` (quick checks: `{ type: 'num' | 'mcq', q, answer, options, unit, tol, hints, solution }`). An explorer config can declare draggable handles with `drag: [{ plot: 0, get: (v) => [x, y], set: (v, x, y) => { ... } }]` (data coordinates of a plot) or `{ pic: true, ... }` (canvas pixels of the picture). Put `<div data-quiz="0"></div>` or `<div data-fig="0"></div>` in a section's HTML to place a quiz or figure at that spot; otherwise they go at the end of the section. Worked examples written as `<details class="example">` become Try-it quizzes when `PB.EXQ['chapter:section:index']` gives their answer.

To add guided steps to a problem, call `PB.addSteps('chapter-n', [{ phase: 'understand' | 'plan' | 'do' | 'check', type: 'num' | 'mcq' | 'reveal', q, answer, options, unit, tol, explain }])`. Plain-words summaries are a list with one string per section: `PB.addPlain('chapter', [...])`. Glossary entries are `PB.addGlossary({ 'term|alias': ['definition', 'physics,chemistry'] })` (leave the subject list empty for all subjects).

### Computing chapters and challenges

Computing chapter files start with `const { R, K, c, QN, QM, P, T, G } = PB.csKit();`. `K(lang, src, run)` makes a highlighted code block (`run` adds a Try it button) and `c(src)` inline code; write `@{` for a JavaScript `${` and `¨` for a backtick inside raw templates. A judged challenge looks like:

```js
const ref = (input) => /* a correct solution in JavaScript */ output;
PB.addChallenge({ id: 'cp-example', chapter: 'cp-sorting', title: 'Example', level: 'medium',  // easy | medium | hard
  statement: R`<p>...</p>`, input: R`<p>...</p>`, output: R`<p>...</p>`,
  samples: [T(ref)('3\n1 2 3\n')],                    // shown to the student
  tests: [T(ref)('1\n5\n'), G(ref, (r) => bigInput)],  // hidden; G generates a large test from a seeded random r
  hints: [R`...`], starter: { python: '...' }, solution: { python: '...', cpp: '...' },
  timeLimit: 1, check: 'tokens' });                     // or 'exact', 'float', a number (absolute tolerance) or a function
```

and is placed in a lab with `{ sim: 'code', title, desc, params: { challenge: 'cp-example' } }`. A plain playground is `{ sim: 'code', params: { lang, langs, code, stdin } }`, with `lang: 'web'` for a live HTML page.

