(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-populations', subject: 'biology', num: 19, part: 'Evolution and Ecology',
    title: 'Population Ecology',
    subtitle: R`How populations grow and are counted. Exponential and logistic growth, carrying capacity, life tables and survivorship, sampling methods, and indices of biodiversity.`,
    goals: ['Model exponential and logistic growth', 'Explain density-dependent and density-independent factors', 'Estimate population size by quadrats and mark–recapture', 'Read survivorship curves and r/K strategies', 'Calculate Simpson\'s diversity index'],
    sections: [
      {
        title: 'Population growth',
        html: R`
<p>With unlimited resources a population grows <strong>exponentially</strong>: $\dfrac{dN}{dt} = rN$, so $N = N_0e^{rt}$ with doubling time $t_d = \ln2/r$. Bacteria, invasive species and the early stages of epidemics behave like this, but not for long.</p>
<p>Resources limit growth. The <strong>logistic model</strong> adds a <strong>carrying capacity</strong> $K$:</p>
$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right),\qquad N(t) = \frac{K}{1 + \left(\frac{K - N_0}{N_0}\right)e^{-rt}}.$$
<p>The curve is S-shaped (sigmoid). Growth is fastest at $N = K/2$, where $dN/dt = rK/4$. This is the idea behind "maximum sustainable yield" in fisheries: harvest at most $rK/4$ per year and keep the stock near $K/2$.</p>
<ul>
<li><strong>Density-dependent</strong> factors get stronger as the population grows: competition, predation, disease, territory.</li>
<li><strong>Density-independent</strong> factors act regardless of numbers: floods, frosts, fires.</li>
</ul>`
      },
      {
        title: 'Life histories',
        html: R`
<p>A <strong>survivorship curve</strong> plots the log of the number surviving against age:</p>
<ul>
<li><strong>Type I</strong>: most survive to old age, then die (humans, large mammals).</li>
<li><strong>Type II</strong>: a constant death rate at all ages (many birds).</li>
<li><strong>Type III</strong>: huge early mortality, few survive (oysters, most fish, trees).</li>
</ul>
<p><strong>r-selected</strong> species have many small offspring, little care, fast maturity and boom-and-bust populations in unstable habitats. <strong>K-selected</strong> species have few large offspring, much parental care, long lives and populations near carrying capacity. Most species sit between.</p>
<p>The <strong>net reproductive rate</strong> $R_0 = \sum l_x m_x$ (survival to age $x$ times births at age $x$) is the average number of daughters per female per generation; the population grows if $R_0 > 1$.</p>`
      },
      {
        title: 'Counting populations',
        html: R`
<p><strong>Quadrats</strong> sample plants and slow animals: place them randomly (coordinates from random numbers), count individuals or percentage cover, and scale up: density × area. A <strong>transect</strong> with quadrats at intervals shows how a community changes along a gradient, such as up a beach.</p>
<p><strong>Mark–release–recapture</strong> estimates mobile populations. Catch and mark $M$ animals, release them, later catch $n$, of which $m$ are marked. If the marked fraction in the sample equals that in the population:</p>
$$\frac{m}{n} = \frac{M}{N}\quad\Rightarrow\quad N = \frac{Mn}{m}\ \ \text{(Lincoln–Petersen)}.$$
<p>Assumptions: marks do not wear off or affect survival; marked animals mix fully; no births, deaths or migration between samples. Chapman's version $\frac{(M+1)(n+1)}{m+1} - 1$ is less biased for small samples.</p>`
      },
      {
        title: 'Biodiversity',
        html: R`
<p>Biodiversity covers genetic diversity, species diversity and ecosystem diversity. <strong>Species richness</strong> is the number of species; <strong>evenness</strong> is how equal their abundances are. <strong>Simpson's index</strong> combines both:</p>
$$D = 1 - \sum\left(\frac{n_i}{N}\right)^2 \quad\text{or, for small samples,}\quad D = 1 - \frac{\sum n_i(n_i - 1)}{N(N - 1)}.$$
<p>$D$ is the probability that two individuals picked at random belong to different species; it runs from 0 (one species) towards 1. The Shannon index $H = -\sum p_i\ln p_i$ is another common measure.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A meadow sample has 40 buttercups, 30 daisies, 20 clover and 10 dandelions. Find Simpson's index (first form).<span class="tog">Solution</span></summary><div class="sol"><p>$\sum p^2 = 0.16 + 0.09 + 0.04 + 0.01 = 0.30$, so $D = 0.70$.</p></div></details>
<p>Biodiversity is lost through habitat destruction, overexploitation, invasive species, pollution and climate change. Conservation works <em>in situ</em> (reserves, corridors) and <em>ex situ</em> (zoos, captive breeding, seed banks such as Svalbard).</p>`
      }
    ],
    labs: [
      { sim: 'recapture', title: 'Mark and recapture', desc: 'A pond with a hidden number of animals. Mark some, release them, catch a second sample and estimate the population.',
        tasks: ['Estimate the population with M = 50 and n = 60. Sample several times: how much do the estimates vary?', 'How does increasing both samples change the reliability?', 'What happens if you mark very few animals? Compare Lincoln–Petersen with Chapman.'] }
    ],
    formulas: [
      ['Exponential growth', R`N = N_0e^{rt}`],
      ['Logistic growth', R`\dfrac{dN}{dt} = rN(1 - N/K)`],
      ['Maximum sustainable yield', R`rK/4\ \text{at}\ N = K/2`],
      ['Lincoln–Petersen', R`N = Mn/m`],
      ['Simpson\'s index', R`D = 1 - \sum p_i^2`],
      ['Shannon index', R`H = -\sum p_i\ln p_i`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Density dependence', q: R`<p>Which is a density-independent factor?</p>`, options: ['Competition for food', 'A disease that spreads by contact', 'A severe frost', 'Predation'], answer: 2, hints: [R`Which kills the same proportion whatever the density?`], solution: R`<p>A frost.</p>` },
      { level: 'concept', type: 'mcq', title: 'Survivorship', q: R`<p>A cod releases millions of eggs, almost all of which die young. Its survivorship curve is…</p>`, options: ['Type I', 'Type II', 'Type III', 'Logistic'], answer: 2, hints: [R`Early mortality.`], solution: R`<p>Type III.</p>` },
      { level: 'concept', type: 'mcq', title: 'Recapture assumption', q: R`<p>Marked animals become easier for predators to spot. How does this bias the Lincoln–Petersen estimate?</p>`, options: ['Underestimate', 'Overestimate', 'No effect', 'Cannot tell'], answer: 1, hints: [R`Fewer marked animals in the second sample.`], solution: R`<p>$m$ is too small, so $N = Mn/m$ is too large.</p>` },
      { level: 'core', type: 'num', title: 'Lincoln–Petersen', q: R`<p>80 newts are marked. A second catch of 60 includes 12 marked. Estimate the population.</p>`, answer: 400, tol: 0.002, unit: '', hints: [R`$Mn/m$.`], solution: R`<p>$80\times60/12 = 400$.</p>` },
      { level: 'core', type: 'num', title: 'Doubling time', q: R`<p>A population grows exponentially with $r = 0.035$ per year. What is its doubling time, in years?</p>`, answer: 19.8, tol: 0.005, unit: 'years', hints: [R`$\ln2/r$.`], solution: R`<p>$0.693/0.035 = 19.8$ years.</p>` },
      { level: 'core', type: 'num', title: 'Maximum yield', q: R`<p>A fish stock has $r = 0.4$ per year and $K = 50\,000$ t. What is the maximum sustainable yield, in t/year?</p>`, answer: 5000, tol: 0.002, unit: 't/year', hints: [R`$rK/4$.`], solution: R`<p>5000 t/year, with the stock kept at 25 000 t.</p>` },
      { level: 'core', type: 'num', title: 'Quadrats', q: R`<p>Ten 0.25 m² quadrats contain a total of 45 daisies. Estimate the number in a 200 m² lawn.</p>`, answer: 3600, tol: 0.002, unit: '', hints: [R`Density 18 per m².`], solution: R`<p>$45/2.5 = 18$ per m², × 200 = 3600.</p>` },
      { level: 'core', type: 'num', title: 'Simpson\'s index', q: R`<p>A sample has species counts 10, 10, 10, 10 (N = 40). Find $D = 1 - \sum n(n-1)/N(N-1)$.</p>`, answer: 0.7692, tol: 0.005, unit: '', hints: [R`$\sum n(n-1) = 360$; $N(N-1) = 1560$.`], solution: R`<p>$1 - 360/1560 = 0.769$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Logistic growth', q: R`<p>A population starts at 100 with $r = 0.5$ per year and $K = 1000$. What is it after 6 years?</p>`, answer: 690.6, tol: 0.005, unit: '', hints: [R`$K/(1 + 9e^{-3})$.`], solution: R`<p>$1000/(1 + 9\times0.0498) = 1000/1.448 = 691$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Net reproductive rate', q: R`<p>A life table gives $l_x$ = 1, 0.5, 0.2, 0.05 and $m_x$ = 0, 1.5, 3, 2 for ages 0–3. What is $R_0$?</p>`, answer: 1.45, tol: 0.002, unit: '', hints: [R`$\sum l_xm_x$.`], solution: R`<p>$0 + 0.75 + 0.6 + 0.1 = 1.45$: the population grows.</p>` },
      { level: 'olympiad', type: 'num', title: 'Shannon index', q: R`<p>Find the Shannon index $H = -\sum p\ln p$ for four equally common species.</p>`, answer: 1.386, tol: 0.005, unit: '', hints: [R`$H = \ln 4$ when all equal.`], solution: R`<p>$\ln4 = 1.39$, the maximum for four species.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-populations', [
    { title: 'Mark–recapture', gen(r) { const N = r.int(100, 5000), M = r.int(20, 200), n = r.int(20, 200); const m = Math.max(1, Math.round(M * n / N)); return { q: R`<p>${M} animals are marked and released. Later a sample of ${n} contains ${m} marked animals. Estimate the population (Lincoln–Petersen).</p>`, answer: M * n / m, tol: 0.005, unit: '', solution: R`<p>$${M}\times${n}/${m} = ${f(M * n / m)}$.</p>` }; } },
    { title: 'Logistic population', gen(r) { const K = r.int(5, 100) * 100, N0 = r.int(10, Math.floor(K / 5)), rr = r.step(0.1, 1.5, 0.05), t = r.int(1, 15); const N = K / (1 + ((K - N0) / N0) * Math.exp(-rr * t)); return { q: R`<p>A population starts at ${N0} with $r = ${f(rr)}$ per year and $K = ${K}$. Using the logistic model, what is it after ${t} years?</p>`, answer: N, tol: 0.01, unit: '', solution: R`<p>$N = ${K}/(1 + ${f((K - N0) / N0)}e^{-${f(rr * t)}}) = ${f(N)}$.</p>` }; } },
    { title: 'Simpson\'s index', gen(r) { const k = r.int(2, 5), ns = []; for (let i = 0; i < k; i++) ns.push(r.int(1, 40)); const N = ns.reduce((a, b) => a + b, 0); const D = 1 - ns.reduce((a, n) => a + n * n, 0) / (N * N); return { q: R`<p>A sample has species counts ${ns.join(', ')}. Find Simpson's index $D = 1 - \sum p_i^2$.</p>`, answer: D, tol: 0.01, atol: 0.005, unit: '', solution: R`<p>$N = ${N}$; $D = ${f(D)}$.</p>` }; } }
  ]);
})();
