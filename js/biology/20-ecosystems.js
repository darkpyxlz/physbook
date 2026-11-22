(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-ecosystems', subject: 'biology', num: 20, part: 'Evolution and Ecology',
    title: 'Communities and Ecosystems',
    subtitle: R`How species interact and how energy and matter move through the living world. Competition, predation and symbiosis, energy flow and productivity, nutrient cycles, succession, and human impact.`,
    goals: ['Describe the main interactions between species', 'Analyse the Lotka–Volterra predator–prey model', 'Calculate productivity and ecological efficiency', 'Describe the carbon and nitrogen cycles', 'Explain succession and human impacts on ecosystems'],
    sections: [
      {
        title: 'Interactions between species',
        html: R`
<p>An <strong>ecosystem</strong> is a community of organisms plus their physical environment. Each species has a <strong>niche</strong>: its role, the resources it uses and the conditions it tolerates.</p>
<ul>
<li><strong>Competition</strong> (−/−): the <strong>competitive exclusion principle</strong> says two species with identical niches cannot coexist indefinitely (Gause's <em>Paramecium</em> experiments). Coexisting species usually partition resources, as MacArthur's warblers feed in different parts of the same trees.</li>
<li><strong>Predation, herbivory, parasitism</strong> (+/−).</li>
<li><strong>Mutualism</strong> (+/+): mycorrhizal fungi and roots, pollinators, nitrogen-fixing bacteria in legume nodules, coral and its algae.</li>
<li><strong>Commensalism</strong> (+/0): barnacles on a whale.</li>
</ul>
<p>A <strong>keystone species</strong> has an effect far beyond its abundance: removing the sea otter lets urchins destroy kelp forests.</p>`
      },
      {
        title: 'Predators and prey',
        html: R`
<p>The <strong>Lotka–Volterra equations</strong> are the simplest model of prey $x$ and predators $y$:</p>
$$\frac{dx}{dt} = \alpha x - \beta xy, \qquad \frac{dy}{dt} = \varepsilon\beta xy - \gamma y.$$
<p>Prey grow at rate $\alpha$ and are eaten at rate $\beta xy$; predators convert food with efficiency $\varepsilon$ and die at rate $\gamma$. Setting both derivatives to zero gives the equilibrium $x^* = \gamma/(\varepsilon\beta)$, $y^* = \alpha/\beta$. Away from it, both populations cycle, with predators lagging prey by about a quarter of a cycle; small cycles have period about $2\pi/\sqrt{\alpha\gamma}$.</p>
<p>A notable result: raising the prey birth rate $\alpha$ raises the equilibrium number of <em>predators</em>, not prey. Adding prey self-limitation (a carrying capacity) turns the neutral cycles into damped oscillations towards a stable point. The Canadian lynx and snowshoe hare pelt records show roughly 10-year cycles.</p>`
      },
      {
        title: 'Energy flow',
        html: R`
<p>Energy enters as sunlight, is fixed by <strong>producers</strong> and flows through <strong>trophic levels</strong>; it is not recycled. <strong>Gross primary productivity</strong> (GPP) is the rate of photosynthesis; <strong>net primary productivity</strong> is what remains after the plants' own respiration:</p>
$$\text{NPP} = \text{GPP} - R.$$
<p>For consumers, net production = food eaten − faeces − respiration. Only about 10% (typically 5–20%) of the energy at one level becomes biomass at the next; the rest is lost as heat in respiration, in faeces and in uneaten parts. This is why food chains rarely exceed four or five levels, why pyramids of energy are always upright, and why a vegetarian diet needs much less farmland.</p>
$$\text{ecological efficiency} = \frac{\text{production at level } n+1}{\text{production at level } n}\times100\%.$$
<p>Photosynthesis captures only about 1–2% of the sunlight falling on a field: much light misses chloroplasts, is the wrong wavelength, or is reflected.</p>`
      },
      {
        title: 'Nutrient cycles',
        html: R`
<p>Matter, unlike energy, cycles. <strong>Decomposers</strong> (bacteria and fungi) return nutrients from dead matter to the soil and air.</p>
<p><strong>Carbon cycle</strong>: photosynthesis removes CO₂; respiration, decomposition and combustion return it. Fossil fuels release carbon stored for millions of years, raising atmospheric CO₂ from about 280 ppm before 1800 to over 420 ppm today and enhancing the greenhouse effect.</p>
<p><strong>Nitrogen cycle</strong>: N₂ is 78% of air but unusable by most organisms.</p>
<ul>
<li><strong>Nitrogen fixation</strong>: N₂ → NH₃ by <em>Rhizobium</em> in root nodules and free-living bacteria (using nitrogenase, very costly in ATP), by lightning, and by the industrial Haber process.</li>
<li><strong>Ammonification</strong>: decomposers convert proteins and urea to ammonium.</li>
<li><strong>Nitrification</strong>: <em>Nitrosomonas</em> oxidises NH₄⁺ to NO₂⁻, and <em>Nitrobacter</em> oxidises NO₂⁻ to NO₃⁻; this needs oxygen, so aerated soil helps.</li>
<li><strong>Denitrification</strong>: anaerobic bacteria in waterlogged soils return NO₃⁻ to N₂.</li>
</ul>
<p>Fertiliser runoff causes <strong>eutrophication</strong>: algal blooms, then decomposition uses up dissolved oxygen and fish die.</p>`
      },
      {
        title: 'Succession and human impact',
        html: R`
<p><strong>Primary succession</strong> starts on bare rock or sand: pioneer species (lichens, marram grass) tolerate harsh conditions and build soil; mosses, grasses, shrubs and finally trees follow, each changing the conditions. The final stable community is the <strong>climax community</strong>, usually forest in temperate regions. <strong>Secondary succession</strong> follows disturbance where soil remains, such as after a fire or abandoned farmland, and is faster. Diversity and biomass usually rise during succession.</p>
<p>Humans alter ecosystems through deforestation, agriculture, overfishing, pollution, invasive species and climate change. Management aims to balance use with conservation: sustainable fishing quotas, coppicing, protected areas, and reducing greenhouse gas emissions.</p>`
      }
    ],
    labs: [
      { sim: 'lotka', title: 'Predator–prey cycles', desc: 'The Lotka–Volterra model with an optional carrying capacity for the prey. The right panel shows the phase plane: predators against prey.',
        tasks: ['Describe the cycles. Which population peaks first?', 'Double the prey birth rate. Which equilibrium changes, and why is this surprising?', 'Give the prey a carrying capacity of 600. What happens to the oscillations?'] }
    ],
    formulas: [
      ['Lotka–Volterra', R`\dot x = \alpha x - \beta xy,\ \ \dot y = \varepsilon\beta xy - \gamma y`],
      ['Equilibrium', R`x^* = \gamma/\varepsilon\beta,\ \ y^* = \alpha/\beta`],
      ['Cycle period', R`T \approx 2\pi/\sqrt{\alpha\gamma}`],
      ['Net primary productivity', R`\text{NPP} = \text{GPP} - R`],
      ['Ecological efficiency', R`\eta = P_{n+1}/P_n`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Energy pyramids', q: R`<p>Why is a pyramid of energy never inverted?</p>`, options: ['Producers are always more numerous', 'Energy is lost at each transfer, mostly as heat', 'Top predators are smaller', 'Energy is recycled'], answer: 1, hints: [R`Second law of thermodynamics.`], solution: R`<p>Each level receives only a fraction of the energy of the level below.</p>` },
      { level: 'concept', type: 'mcq', title: 'Nitrification', q: R`<p>Which process converts ammonium to nitrate?</p>`, options: ['Nitrogen fixation', 'Nitrification', 'Denitrification', 'Ammonification'], answer: 1, hints: [R`Nitrosomonas and Nitrobacter.`], solution: R`<p>Nitrification, an oxidation that needs aerobic conditions.</p>` },
      { level: 'concept', type: 'mcq', title: 'Mutualism', q: R`<p>Which is mutualism?</p>`, options: ['A tapeworm in a dog', 'Mycorrhizal fungi on tree roots', 'A lion eating a zebra', 'Two plant species competing for light'], answer: 1, hints: [R`Both benefit.`], solution: R`<p>The fungus gets sugars; the tree gets phosphate and water.</p>` },
      { level: 'core', type: 'num', title: 'NPP', q: R`<p>A grassland has GPP of 24 000 kJ m⁻² yr⁻¹ and plant respiration of 14 000 kJ m⁻² yr⁻¹. What is the NPP?</p>`, answer: 10000, tol: 0.002, unit: 'kJ m⁻² yr⁻¹', hints: [R`Subtract.`], solution: R`<p>10 000 kJ m⁻² yr⁻¹.</p>` },
      { level: 'core', type: 'num', title: 'Efficiency', q: R`<p>Herbivores have production 1200 kJ m⁻² yr⁻¹ and their predators 90 kJ m⁻² yr⁻¹. What is the ecological efficiency, in %?</p>`, answer: 7.5, tol: 0.002, unit: '%', hints: [R`90/1200.`], solution: R`<p>7.5%.</p>` },
      { level: 'core', type: 'num', title: 'Top of the chain', q: R`<p>Producers fix 50 000 kJ m⁻² yr⁻¹. With 10% efficiency at each transfer, how much reaches the tertiary consumers?</p>`, answer: 50, tol: 0.002, unit: 'kJ m⁻² yr⁻¹', hints: [R`Three transfers.`], solution: R`<p>$50\,000\times0.1^3 = 50$.</p>` },
      { level: 'core', type: 'num', title: 'Equilibrium prey', q: R`<p>In a Lotka–Volterra model, $\gamma = 0.6$, $\beta = 0.02$ and $\varepsilon = 0.4$. What is the prey equilibrium?</p>`, answer: 75, tol: 0.002, unit: '', hints: [R`$\gamma/\varepsilon\beta$.`], solution: R`<p>$0.6/0.008 = 75$.</p>` },
      { level: 'core', type: 'num', title: 'Consumer budget', q: R`<p>A caterpillar eats 200 J of leaf, egests 110 J as faeces and respires 60 J. How much becomes new caterpillar biomass, in J?</p>`, answer: 30, tol: 0.002, unit: 'J', hints: [R`Production = intake − faeces − respiration.`], solution: R`<p>30 J: 15% of what it ate.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cycle period', q: R`<p>Prey birth rate $\alpha = 1.0$ per year and predator death rate $\gamma = 0.5$ per year. Estimate the period of small predator–prey cycles, in years.</p>`, answer: 8.886, tol: 0.005, unit: 'years', hints: [R`$2\pi/\sqrt{\alpha\gamma}$.`], solution: R`<p>$2\pi/\sqrt{0.5} = 8.9$ years, comparable with the lynx–hare cycle.</p>` },
      { level: 'olympiad', type: 'num', title: 'Photosynthetic efficiency', q: R`<p>A field receives $5.0\times10^6$ kJ m⁻² yr⁻¹ of sunlight. Its GPP is 60 000 kJ m⁻² yr⁻¹. What percentage of the sunlight is fixed?</p>`, answer: 1.2, tol: 0.002, unit: '%', hints: [R`Divide.`], solution: R`<p>1.2%.</p>` },
      { level: 'olympiad', type: 'num', title: 'Feeding the world', q: R`<p>Producers on a farm make 10⁷ kJ of edible food per hectare per year; cattle convert plant food to beef at 10% efficiency. A person needs about 3.65 × 10⁶ kJ per year. How many people can a hectare feed on plants alone, compared with beef alone? Give the ratio.</p>`, answer: 10, tol: 0.002, unit: '×', hints: [R`One extra trophic level.`], solution: R`<p>2.7 people on plants versus 0.27 on beef: a factor of 10.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-ecosystems', [
    { title: 'Energy up the chain', gen(r) { const E = r.int(10, 200) * 1000, eff = r.int(5, 20), n = r.int(1, 4); const v = E * Math.pow(eff / 100, n); const lv = ['primary consumers', 'secondary consumers', 'tertiary consumers', 'quaternary consumers'][n - 1]; return { q: R`<p>Producers have net production ${E} kJ m⁻² yr⁻¹. With ${eff}% efficiency at every transfer, how much reaches the ${lv}?</p>`, answer: v, tol: 0.005, unit: 'kJ m⁻² yr⁻¹', solution: R`<p>$${E}\times${eff / 100}^{${n}} = ${f(v)}$.</p>` }; } },
    { title: 'Consumer energy budget', gen(r) { const I = r.int(100, 2000), F = Math.round(I * r.step(0.2, 0.6, 0.05)), Rr = Math.round(I * r.step(0.1, 0.35, 0.05)); return { q: R`<p>An animal eats ${I} J, loses ${F} J in faeces and respires ${Rr} J. What is its production, in J?</p>`, answer: I - F - Rr, tol: 0.002, unit: 'J', solution: R`<p>$${I} - ${F} - ${Rr} = ${I - F - Rr}$ J.</p>` }; } },
    { title: 'Lotka–Volterra equilibrium', gen(r) { const a = r.step(0.2, 2, 0.1), b = r.step(0.005, 0.05, 0.001), c = r.step(0.2, 2, 0.1), e = r.step(0.1, 0.8, 0.05); const which = r.pick(['prey', 'predator']); const v = which === 'prey' ? c / (e * b) : a / b; return { q: R`<p>A Lotka–Volterra model has $\alpha = ${f(a)}$, $\beta = ${f(b)}$, $\gamma = ${f(c)}$ and $\varepsilon = ${f(e)}$. What is the ${which} equilibrium population?</p>`, answer: v, tol: 0.005, unit: '', solution: R`<p>${which === 'prey' ? '$\\gamma/\\varepsilon\\beta' : '$\\alpha/\\beta'} = ${f(v)}$.</p>` }; } }
  ]);
})();
