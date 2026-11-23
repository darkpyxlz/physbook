# Design notes: gamification, guided solving and easier explanations

These notes record what the research and the leading learning apps suggest, and how Scibook applies each idea. They cover three features: the gamification layer (`js/loop.js`, `js/loop2.js`), guided step-by-step solving (`js/guide.js`) and the plain-language aids (`js/plain.js`).

## 1. What the evidence says about gamification

- **The effect is real but modest.** The most-cited meta-analysis of gamification in education (Sailer and Homner, 2019) found small positive effects on cognitive outcomes, which held up in the most rigorous studies, and smaller, less stable effects on motivation and behaviour. A later meta-analysis focused on intrinsic motivation and basic psychological needs (35 interventions, about 2500 participants) also found a small but significant effect (Hedges' g ≈ 0.26). Self-determination theory (competence, autonomy, relatedness) is the usual explanation for how game elements could help.
  → Scibook rewards learning behaviour (first-try accuracy, mastery, explaining ideas, coming back) rather than raw time on the site, and it always gives a choice (when to use a boost, which subject to start, whether to see the league).
- **Game elements can backfire.** Analyses of Duolingo's design, and a qualitative case study of gamification misuse in a language app, describe learners chasing points, protecting streaks with minimal effort, or feeling pressure from rankings instead of learning.
  → The league uses bots of similar pace, says so openly, and can be **switched off**. Streak freezes are earned, and the streak-at-risk banner appears only in the evening.
- **Goal gradient and endowed progress.** People speed up as they near a goal (goal-gradient effect) and are more likely to finish when they start with some progress already made (endowed progress, Nunes and Drèze, 2006).
  → A toast at 70% of the daily goal, progress bars on every meter, and a 10 XP head start in the welcome screen.

## 2. What the leading apps do

| Idea | Seen in | In Scibook |
|------|---------|------------|
| Daily goal, streak, streak freeze | Duolingo | Daily goal ring, streak milestones, freezes (`loop.js`) |
| Leagues with promotion and demotion | Duolingo | Weekly league of 15, ten tiers, opt-out (`loop.js`) |
| XP boosts earned for good play | Duolingo (timed 2× XP) | Double XP boosts from quests, perfect sessions, pass tiers; you choose when to start (`loop2.js`) |
| Combo bonus for answers in a row | Duolingo | Combo XP for first-try correct answers, up to +10 (`loop2.js`) |
| Monthly challenges and badges | Duolingo | 1500 XP monthly challenge with a badge (`loop2.js`) |
| Tiered achievements, personal bests | Duolingo | Achievements I–V, personal-best records on the profile (`loop2.js`) |
| Mastery levels and unit tests | Khan Academy (Attempted, Familiar, Proficient, Mastered; course mastery) | Five mastery levels per chapter, course mastery per subject, mastery challenges with crowns (`loop2.js`) |
| Short sessions with an end summary | Duolingo lessons, Brilliant | 10-question adaptive sessions with a summary card (`adaptive.js`) |
| Learn by doing, small steps, immediate feedback | Brilliant | Try-it quizzes in the text, inline checks, guided steps (`learn.js`, `guide.js`) |
| Prerequisite path | Duolingo path, Khan course structure | Skill tree with test-outs (`prereqs.js`) |

## 3. Guided step-by-step solving

- **Step-based tutoring beats answer-based tutoring.** In a 2023 study by VanLehn, Milner and Banerjee, a tutor that gave feedback on each step of building an algebra model did better than a baseline (d = 0.67) and much better than a tutor that only checked answers (d = 0.84).
- **Worked examples, faded.** For beginners, studying worked examples beats solving unaided (the worked-example effect), but the advantage shrinks as expertise grows. LearnLab studies found that adding worked examples whose steps are gradually removed ("faded") to a Cognitive Tutor improved learning, and that fading tailored to the quality of learners' self-explanations helped further.
- **Self-explanation prompts** ("why does this step follow?") matter because learners rarely explain steps to themselves unprompted.
- **Pólya's four phases** (understand, plan, carry out, look back) give a structure that works across subjects. Recent work on AI tutors uses the same phases to ask a question at each stage instead of giving the answer (Llama-Polya), and studies of students solving physics problems with a chatbot look at how they move through these stages.

→ Scibook's guide asks one question per step in Pólya's phases: units and option elimination (understand), order-of-magnitude estimate, the key idea (plan, with a self-explanation check), intermediate numbers (carry out), and a look-back link. Steps can be revealed after two tries, a guided solve is worth 70% of the points (help has a small cost, so it is used when needed), and the warm-up steps fade once chapter mastery passes 65%.

## 4. Easier explanations

- **Advance organisers**: a short summary before new material helps learners place details in a framework. → "In plain words" summaries at the top of all 495 sections, alongside each chapter's "big idea".
- **Reduce extraneous load** (cognitive load theory): define jargon where it is used instead of sending learners elsewhere. → Glossary tooltips on the first use of 328 terms per section, subject-aware, never inside equations.
- **Self-explanation**: putting an idea into your own words improves understanding. → "Say it back" prompts at the end of each section, compared with the summary afterwards.

## Sources

- Sailer, M. and Homner, L. (2019). The gamification of learning: a meta-analysis. *Educational Psychology Review*. https://link.springer.com/article/10.1007/s10648-019-09498-w
- Meta-analysis of gamification, intrinsic motivation and basic psychological needs (2023). *Educational Technology Research and Development*. https://link.springer.com/article/10.1007/s11423-023-10337-7
- Document on gamification and engagement, Universidad Siglo 21 repository. https://repositorio.21.edu.ar/bitstreams/d2e2d14e-48d1-4484-8018-ee81adfda8fd/download
- VanLehn, K., Milner, F. and Banerjee, C. (2023). Step-based tutoring for algebra model construction. *International Journal of Artificial Intelligence in Education*. https://doi.org/10.1007/s40593-023-00328-3
- When gamification spoils your learning: a qualitative case study of gamification misuse in a language-learning app. https://arxiv.org/pdf/2203.16175
- Deconstructor of Fun: how Duolingo uses gaming principles to grow daily users. https://www.deconstructoroffun.com/blog/2025/4/14/duolingo-how-the-15b-app-uses-gaming-principles-to-supercharge-dau-growth
- Why Duolingo's gamification works (and when it doesn't). https://dev.to/pocket_linguist/why-duolingos-gamification-works-and-when-it-doesnt-1d4
- Duolingo: achievement badges. https://blog.duolingo.com/achievement-badges
- Duolingo XP boosts. https://duolingoguides.com/duolingo-xp-boost/
- Brilliant: how Brilliant teaches maths. https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/
- Brilliant: maths tutor. https://brilliant.org/math/tutor/
- Brilliant product analysis. https://deepaksood619.github.io/education/competitors/brilliant-analysis
- Khan Academy: mastery levels. https://support.khanacademy.org/hc/tr/articles/5548760867853
- LearnLab: does learning from worked-out examples improve tutored problem solving? https://learnlab.org/research/wiki/index.php/Does_learning_from_worked-out_examples_improve_tutored_problem_solving%3F
- Worked-example effect. https://en.wikipedia.org/wiki/Worked-example_effect
- Nunes, J. C. and Drèze, X. (2006). The endowed progress effect. https://msbfile03.usc.edu/digitalmeasures/jnunes/intellcont/Endowed%20Progress%20Effect-1.pdf
- Laws of UX: goal-gradient effect. https://lawsofux.com/goal-gradient-effect/
- Analyzing undergraduate problem-solving in physics through interaction with an AI chatbot. https://arxiv.org/html/2508.14778v1
- Llama-Polya: instruction tuning for Pólya's problem-solving. https://arxiv.org/pdf/2501.06682v1
