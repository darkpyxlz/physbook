# Scibook

An interactive textbook for students working towards olympiads in mathematics, physics, chemistry, biology and astronomy (and the SYPT/IYPT style of problem solving). Each subject has its own tab and chapters, three of the sciences have their own game, and all of them feed one shared level, streak, quest list and badge collection.

Every chapter has four parts:

- **Learn**: the theory, with key results, common traps and insight boxes, plus quizzes and interactive figures inside the text (see below).
- **Lab**: one or two interactive simulations with suggested experiments.
- **Problems**: a scored set that climbs from concept checks to olympiad-level problems, with hints and full solutions.
- **Formulas**: the chapter's key results, also collected on a formula sheet grouped by subject.

| Subject | Chapters | Labs | Scored problems | Drill templates | Game |
|---------|---------:|-----:|----------------:|----------------:|------|
| Maths | 16 | 32 | 192 | 48 | — |
| Physics | 24 | 48 | 516 | 72 | — |
| Chemistry | 26 | 52 | 450 | 78 | ChemCorp |
| Biology | 28 | 56 | 480 | 84 | Cytos |
| Astronomy | 16 | 32 | 288 | 48 | Firmament |
| **Total** | **110** | **220** | **1926** | **330** | |

Every chapter has at least two labs. Many second labs use a shared explorer engine (`js/sims-explore.js`), so a chapter can describe a small model (controls, curves, a picture and a readout) as a config instead of new drawing code.

## Learning in the text

The Learn tab is built to keep the learning curve gentle (`js/learn.js`, `js/bigideas.js`, `js/figures.js`):

- **The big idea**: every chapter opens with a plain-language summary and an everyday picture, before any formula.
- **Before you start**: a fold-out refresher of the prerequisite chapters, with their big ideas and key formulas.
- **Try it**: the worked examples are quizzes, not reveal boxes. You answer first (number or multiple choice), can ask for one step-by-step hint at a time, and the worked solution opens once you are right or after two honest attempts. Each first solve pays 3 XP.
- **Check your understanding**: each chapter's scored concept checks appear inline, right after the section they test (matched by the words they share). Solving them there counts towards the chapter.
- **Figures**: every chapter has at least one interactive figure inside the text (a slider-driven plot or diagram), 117 in all.
- Maths chapters also carry authored **quick checks** in the middle of each section.

## Adaptive practice

`js/adaptive.js`, page `#adapt` (or `#adapt-<chapter>` for one chapter).

- Every answer anywhere in the book (problems, inline checks, Try-it quizzes, gym drills) updates a per-chapter skill estimate with a simple logistic (Elo-style) model. Each chapter page shows the resulting **mastery** bar.
- Adaptive practice serves the question you have about a 70% chance of getting right, chosen from the chapter's unsolved problems and its randomised drills.
- After a mistake it switches to an easier **stepping stone** and offers a link back to the section that explains the idea. After three right in a row it serves a **stretch** question.
- Chapters where you slipped come back for **spaced review** after 10 minutes, then 1, 3, 7, 16 and 35 days. The dashboard shows how many reviews are due.
- Across the whole book it weights weaker chapters more heavily, and always does due reviews first.

## Maths

Sixteen chapters in five parts. It is a self-contained track: the other subjects do not require it.

| Part | Chapters |
|------|----------|
| Precalculus | Functions and their graphs |
| Calculus | Limits and continuity; the derivative; using derivatives; the integral; techniques of integration |
| Further calculus | Sequences, series and Taylor polynomials; differential equations; calculus in several variables; complex numbers |
| Olympiad foundations | Proof and problem-solving; number theory; counting and probability |
| Olympiad topics | Inequalities; polynomials and functional equations; olympiad geometry |

Labs include a function transformer, an ε–δ zoom, secant-to-tangent, Newton's method, Riemann sums and the area function, Taylor polynomials, slope fields and Euler's method, contour maps with gradients, roots of unity, Collatz, times tables on a circle, Pascal's triangle mod m, Monte Carlo π, AM–GM in a semicircle, Lagrange interpolation, the inscribed angle theorem, the Euler line and the power of a point. The RPG adds five maths bosses, a Logic attribute and a Mathematician class (four skill choices per level-up).

## Skill tree

Chapters unlock Duolingo-style. Each chapter lists its prerequisites in `js/prereqs.js`, within its own science and across sciences: chemistry needs physics foundations (for example, Atomic Structure needs Electrostatics), biology needs chemistry (Enzymes needs Reaction Kinetics), and astronomy needs physics (Kepler's Laws needs Gravitation). A chapter is **passed** when all its concept checks and at least two core problems are solved.

- Locked chapters show what they need, with links straight to the missing problems.
- **Test out**: answer 5 randomised drills from the missing prerequisites; 4 right opens the chapter for good.
- The **Skill tree** page (`#tree`) shows every chapter and its dependencies.
- The tree can be switched off on the Level & badges page for free roaming. The problem arena, daily challenge and gym only draw from open chapters.

## Hero and bosses

A Survivor.io-style equipment RPG on top of the XP system (`js/rpg.js`, page `#hero`):

- **Classes**: Mathematician (four skill choices per level-up), Physicist (+20% attack), Chemist (coffee heals double), Biologist (+25% HP) or Astronomer (+10% crit). Your class's subject pays 25% more gold.
- **Equipment**: six slots (weapon, necklace, gloves for attack; armour, belt, boots for HP), twelve items and six rarities: Common, Good, Better, Excellent, Epic, Legend. Each item has a special ability that unlocks at Excellent and grows at Epic and Legend (double strikes, crits, blocks, dodges, lifesteal, revives, combo damage, bonus loot).
- **Merge**: three copies of the same item at the same rarity merge into one of the next rarity. Merging is the only way to make gear stronger; there are no item levels. "Merge all" and "Equip best" do it in one click. Salvage spare cards for gold and egg fragments.
- **Pets**: Pavlov the dog (bites on correct answers), Schrödinger the cat (dodges), Darwin the finch (heals), Tardi the tardigrade (survives a lethal hit), Dolly the sheep (clones your hit) and Fermi the fox (pounces every turn). One pet is active; it adds 3–30% to attack and HP by rarity, and its ability grows with rarity. Pets merge like gear.
- **Skills**: in every fight your 1st, 3rd, 6th, 10th… correct answer is a level-up where you pick one of three skills (Proton Beam, Lab Drone, Faraday Cage, Lightning Rod, Acid Splash, Second Wind, Laser Focus, Force Field). A skill at level 5 evolves into a stronger form. Skills last the whole fight, or the whole run in the Trials.
- **Currencies, all earned by learning**:
  - ◉ gold from problems, drills, sections and labs;
  - 💎 gems from quests, badges, level-ups and first boss wins;
  - 🗝️ keys from the daily challenge, unlocking chapters, level-ups and bosses;
  - 🧩 egg fragments from olympiad problems, gym streaks, bosses, the Trials and salvaging.
- **Chests and eggs**: a Supply Crate (one key), a Research Grant Chest (gems; an Epic is guaranteed within 30), a Pet Egg (10 fragments) and a Golden Egg (gems; Epic pet within 30). There is also a 7-day daily supply ladder.
- **Attributes**: Logic, Might, Alchemy, Vitality and Insight grow with the points earned in each subject and multiply your damage against that subject's bosses.
- **Unit bosses**: every part of every subject has a boss (26 in all). A boss appears once you pass three chapters of its unit; correct answers to drills from that unit strike it, wrong answers let it strike back. Bosses can be re-fought for gold, keys and fragments.
- **The Trials**: an endless tower of stronger and stronger monsters, three runs a day, using questions from every open chapter. Skills carry from floor to floor. Every floor pays gold and a fragment, every 5th gems and every 10th a key.
- Eleven badges cover bosses, gear, pets, skills, gold and the Trials. Older saves are migrated: gold spent on item levels is refunded and design scrolls become egg fragments.

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

then visit `http://localhost:8000`. Math is typeset with MathJax 3 loaded from jsDelivr, so the first load needs an internet connection.

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
js/bigideas.js        the plain-language "big idea" for every chapter
js/learn.js           Try-it quizzes, inline concept checks, refreshers, PB.addFigures
js/figures.js         interactive figures inside the text of the science chapters
js/adaptive.js        mastery model, adaptive practice and spaced review, #adapt
js/games.js           game tabs and progress read from the games' saves
js/sims-explore.js    the general explorer lab engine and PB.addLabs
js/prereqs.js         the skill tree: prerequisites, locks, test-outs, #tree
js/rpg.js             hero, gear, pets, skills, bosses, #hero
js/extra/*.js         second labs and two further batches of problems (loaded last so problem ids stay stable)
games/                copies of ChemCorp, Cytos and Firmament
js/app.js             routing, views, problem cards, HUD
js/solver.js          equation board UI (cards, wires, menus, known values)
js/solver-engine.js   the board's SymPy code (Python, as a string run by Pyodide)
js/solver-library.js  the searchable equation library, with a meaning and unit for every symbol
```

## Adding content

Each chapter file calls `PB.addChapter({...})` with a `subject` (`physics` by default, or `chemistry`, `biology`, `astronomy`) and a `part` from that subject's list in `PB.SUBJECTS`. Text is HTML with `$...$` and `$$...$$` for math, written inside `PB.R` (`String.raw`) template literals so LaTeX backslashes need no escaping. A problem looks like:

```js
{ level: 'core', type: 'num', title: 'Short title',
  q: R`<p>Question with $math$.</p>`,
  answer: 0.5 * 27 * 9, tol: 0.01, unit: 'm',
  hints: [R`First hint.`],
  solution: R`<p>Worked solution.</p>` }
```

`type` can be `num` (numerical, graded within `tol`), `mcq` (`answer` is the option index) or `multi` (`answer` is an array of indices).

A chapter can also carry `big` (its plain-language opening), `figures` (interactive figures in the text: `{ s: sectionIndex, title, caption, params }`, where `params` is an explorer config) and, per section, `quizzes` (quick checks: `{ type: 'num' | 'mcq', q, answer, options, unit, tol, hints, solution }`). Put `<div data-quiz="0"></div>` or `<div data-fig="0"></div>` in a section's HTML to place a quiz or figure at that spot; otherwise they go at the end of the section. Worked examples written as `<details class="example">` become Try-it quizzes when `PB.EXQ['chapter:section:index']` gives their answer.
