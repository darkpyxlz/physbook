# Physbook

An interactive physics textbook for students working toward physics olympiads (and the SYPT/IYPT style of problem solving). It follows the chapter order of the standard university texts, and every chapter has four parts:

- **Learn**: the theory, with key results, worked examples, common traps and "olympiad insight" boxes.
- **Lab**: one or two interactive simulations with suggested experiments.
- **Problems**: a scored set that climbs from concept checks to olympiad-level problems, with hints and full solutions.
- **Formulas**: the chapter's key results, also collected on a book-wide formula sheet.

## Chapters

| # | Chapter | Lab(s) |
|---|---------|--------|
| 1 | The Physicist's Toolkit | Taylor approximation explorer, vector playground |
| 2 | Kinematics | Projectile launcher with air drag |
| 3 | Newton's Laws and Forces | Block on an incline |
| 4 | Work, Energy and Power | Energy on a track |
| 5 | Momentum and Collisions | Collision track (with centre-of-mass frame) |
| 6 | Rotational Dynamics | Rolling race |
| 7 | Gravitation and Orbits | Orbit launcher (Kepler's second law) |
| 8 | Oscillations | Driven, damped oscillator |
| 9 | Fluids | Sink or float |
| 10 | Waves and Sound | Superposition, Doppler and shock cones |
| 11 | Temperature, Heat and Kinetic Theory | Gas in a box (Maxwell distribution, pressure) |
| 12 | The Laws of Thermodynamics | Engine cycles on a P–V diagram |
| 13 | Electrostatics | Field lines and equipotentials |
| 14 | Capacitors, Current and DC Circuits | RC charging and discharging |
| 15 | Magnetic Fields and Forces | Charges in E and B fields |
| 16 | Induction, AC Circuits and EM Waves | Series RLC with phasors |
| 17 | Geometric Optics | Ray diagram bench, refraction and TIR |
| 18 | Wave Optics | Slits and gratings |
| 19 | Special Relativity | Minkowski diagram |
| 20 | Quantum and Atomic Physics | Photoelectric effect, particle in a box |
| 21 | Nuclear and Particle Physics | Radioactive decay (with decay chains) |

231 scored problems in total: 64 concept, 105 core and 62 olympiad.

## Scoring and gamification

- Concept problems are worth 10 points, core 20 and olympiad 40.
- Each hint costs 25% of the base points; a wrong numerical answer costs 15% and a wrong multiple-choice answer 34%. A problem never drops below 20% while you keep trying. Viewing the solution forfeits the problem.
- Reading a section or exploring a lab earns 5 XP. Badges add 25 XP each.
- A daily challenge (a core or olympiad problem picked by date) pays double.
- XP moves you up an 11-level ladder from *Curious Observer* to *Absolute Champion*. Day streaks, chapter stars (one each for finishing the concept, core and olympiad sets) and 25 badges track progress.
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
js/chapters/NN-*.js   one file per chapter: sections, labs, formulas, problems
js/app.js             routing, views, problem cards, HUD
```

## Adding content

Each chapter file calls `PB.addChapter({...})`. Text is HTML with `$...$` and `$$...$$` for math, written inside `PB.R` (`String.raw`) template literals so LaTeX backslashes need no escaping. A problem looks like:

```js
{ level: 'core', type: 'num', title: 'Short title',
  q: R`<p>Question with $math$.</p>`,
  answer: 0.5 * 27 * 9, tol: 0.01, unit: 'm',
  hints: [R`First hint.`],
  solution: R`<p>Worked solution.</p>` }
```

`type` can be `num` (numerical, graded within `tol`), `mcq` (`answer` is the option index) or `multi` (`answer` is an array of indices).
