(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  PB.addChapter({
    id: 'bio-behaviour', subject: 'biology', num: 28, part: 'Evolution and Ecology',
    title: 'Animal Behaviour',
    subtitle: R`Why animals do what they do. Tinbergen’s four questions, innate and learned behaviour, orientation and communication, optimal foraging, game theory and evolutionarily stable strategies, and the evolution of cooperation and altruism.`,
    goals: ['Apply Tinbergen’s four questions', 'Distinguish fixed action patterns, taxes, kineses, imprinting and forms of learning', 'Describe animal communication including the honeybee dance', 'Use the marginal value theorem for foraging', 'Find evolutionarily stable strategies in the hawk–dove game', 'Apply Hamilton’s rule to altruism'],
    sections: [
      {
        title: 'Four questions',
        html: R`
<p>Niko Tinbergen asked four kinds of question about any behaviour: <strong>mechanism</strong> (what stimuli, nerves and hormones cause it?), <strong>development</strong> (how does it arise during an individual’s life?), <strong>function</strong> (how does it help survival and reproduction?) and <strong>evolution</strong> (how did it arise in the lineage?). The first two are proximate causes, the last two ultimate causes; a full answer needs both.</p>`
      },
      {
        title: 'Innate and learned behaviour',
        html: R`
<ul>
<li><strong>Fixed action patterns</strong> run to completion once triggered by a <strong>sign stimulus</strong>: a male stickleback attacks anything with a red underside; a greylag goose rolls back any egg-shaped object.</li>
<li><strong>Kinesis</strong>: a change in speed or turning rate with stimulus intensity (woodlice move faster in dry places). <strong>Taxis</strong>: movement directly towards or away from a stimulus (phototaxis of moths, chemotaxis of bacteria).</li>
<li><strong>Imprinting</strong>: learning during a critical period, such as goslings following the first moving object (Lorenz).</li>
<li><strong>Habituation</strong>: learning to ignore a repeated harmless stimulus.</li>
<li><strong>Classical conditioning</strong> (Pavlov): associating a neutral stimulus with a reward or punishment. <strong>Operant conditioning</strong> (Skinner): learning from the consequences of one’s own actions. Insight learning and social learning (tool use in chimpanzees and New Caledonian crows) go further.</li>
</ul>
<p>Most behaviour combines genes and experience: song sparrows have an innate template but must hear adult song during a sensitive period to sing properly.</p>`
      },
      {
        title: 'Orientation and communication',
        html: R`
<p>Animals navigate using the Sun (with an internal clock to compensate for its motion), stars, Earth’s magnetic field, smell and landmarks. Communication uses sight, sound, touch, smell (pheromones) and electric fields.</p>
<p>Honeybees perform the <strong>waggle dance</strong> (von Frisch): the angle of the waggle run from vertical equals the angle of the food from the Sun, and the duration of the waggle run encodes distance (roughly 1 s per km). Signals are often honest because they are costly to fake (a peacock’s tail, the handicap principle).</p>`
      },
      {
        title: 'Optimal foraging and games',
        html: R`
<p>Natural selection should favour foraging that maximises the net rate of energy gain. In a patchy environment, the <strong>marginal value theorem</strong> (Charnov) says: leave a patch when your instantaneous gain rate falls to the average rate for the whole habitat, including travel. If patches are far apart (long travel), stay longer.</p>
<p>When the best action depends on what others do, use <strong>game theory</strong>. In the <strong>hawk–dove game</strong> with resource value V and cost of fighting injury C: hawks always escalate, doves display and retreat. If $V < C$, neither pure strategy is stable; the <strong>evolutionarily stable strategy</strong> (ESS, Maynard Smith) is a mixture with a fraction $p = V/C$ of hawks, at which both strategies earn the same payoff.</p>
<details class="example"><summary><span class="lbl">Worked example</span> V = 4, C = 10. What fraction of hawks is stable?<span class="tog">Solution</span></summary><div class="sol"><p>$p = 4/10 = 0.4$.</p></div></details>`
      },
      {
        title: 'Altruism and cooperation',
        html: R`
<p>Why help others at a cost to yourself? Hamilton’s <strong>kin selection</strong>: a gene for helping spreads if</p>
$$rB > C,$$
<p>where $r$ is the relatedness to the recipient (½ for full siblings or offspring, ¼ for half-siblings, ⅛ for cousins), $B$ the benefit to the recipient and $C$ the cost to the helper, both in offspring. J. B. S. Haldane joked he would lay down his life for two brothers or eight cousins. In haplodiploid ants and bees, sisters share ¾ of their genes, which may have favoured sterile worker castes.</p>
<p>Unrelated individuals cooperate through <strong>reciprocal altruism</strong> (vampire bats sharing blood meals with roost-mates that shared before), stable when interactions repeat and cheats can be recognised, as in the "tit for tat" strategy of the repeated prisoner’s dilemma.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Hawks and doves', desc: 'Payoffs of hawk and dove strategies against the fraction p of hawks in the population, and the replicator dynamics that move p towards the evolutionarily stable mix.',
        tasks: ['With V = 4 and C = 10, where do the payoff lines cross? Check it equals V/C.', 'Make V > C. What happens to the stable fraction of hawks?', 'Start from almost all doves. How quickly do hawks invade?'],
        params: { controls: [S('V', 'Resource value V', 1, 20, 0.5, 4), S('C', 'Cost of injury C', 1, 30, 0.5, 10), S('p0', 'Starting hawk fraction', 0.01, 0.99, 0.01, 0.05)],
          init: (v) => { v.pay = (p) => { const hh = (v.V - v.C) / 2, hd = v.V, dh = 0, dd = v.V / 2; return { H: p * hh + (1 - p) * hd, D: p * dh + (1 - p) * dd }; }; v.traj = () => { let p = v.p0; const out = [p]; for (let i = 0; i < 300; i++) { const P = v.pay(p), w0 = 20; const wH = w0 + P.H, wD = w0 + P.D, wb = p * wH + (1 - p) * wD; p = p * wH / wb; out.push(p); } return out; }; },
          plots: [{ x: [0, 1], y: 'auto', zero: false, xlabel: 'fraction of hawks p', ylabel: 'payoff', title: 'Payoffs', curves: (v) => [{ f: (p) => v.pay(p).H, color: 'rust', label: 'hawk' }, { f: (p) => v.pay(p).D, label: 'dove' }], vlines: (v) => [{ x: Math.min(1, v.V / v.C), label: 'V/C' }] },
            { x: [0, 300], y: [0, 1], xlabel: 'generation', ylabel: 'p', title: 'Evolution', curves: (v) => { const t = v.traj(); return [{ f: (g) => t[Math.round(g)], color: 'rust' }]; } }],
          readout: (v) => { const t = v.traj(); return [['ESS fraction of hawks', f(Math.min(1, v.V / v.C))], ['after 300 generations', f(t[300])], ['average payoff at ESS', f(v.pay(Math.min(1, v.V / v.C)).H)]]; } } },
      { sim: 'explore', title: 'When to leave a patch', desc: 'Cumulative energy gained in a patch with diminishing returns, $G(t) = G_{\\max}(1 - e^{-t/\\tau})$. The best residence time is where a line from the start of travel touches the curve (marginal value theorem).',
        tasks: ['Double the travel time. What happens to the best residence time?', 'Make patches richer (larger G_max). Does the forager stay longer or shorter?', 'Why do birds feeding young far from the nest carry bigger loads per trip?'],
        params: { controls: [S('T', 'Travel time between patches', 1, 60, 0.5, 10, 's'), S('G', 'Patch richness G_max', 10, 200, 1, 100, 'J'), S('tau', 'Depletion time τ', 2, 60, 0.5, 15, 's')],
          init: (v) => { v.best = () => { let bt = 0, br = 0; for (let t = 0.1; t <= 200; t += 0.1) { const rr = v.G * (1 - Math.exp(-t / v.tau)) / (t + v.T); if (rr > br) { br = rr; bt = t; } } return { t: bt, r: br }; }; },
          plots: [{ x: (v) => [-v.T, Math.max(4 * v.tau, 30)], y: (v) => [0, v.G * 1.05], xlabel: 'time (s), travel shown left of 0', ylabel: 'energy gained (J)', curves: (v) => { const b = v.best(); return [{ f: (t) => (t < 0 ? NaN : v.G * (1 - Math.exp(-t / v.tau))), label: 'gain in patch' }, { f: (t) => b.r * (t + v.T), color: 'rust', dash: [5, 4], label: 'best average rate' }]; }, vlines: (v) => [{ x: v.best().t, label: 'leave' }] }],
          readout: (v) => { const b = v.best(); return [['best residence time', f(b.t) + ' s'], ['energy per visit', f(v.G * (1 - Math.exp(-b.t / v.tau))) + ' J'], ['long-run rate', f(b.r) + ' W']]; } } }
    ],
    formulas: [
      ['Hamilton’s rule', R`rB > C`],
      ['Hawk–dove ESS', R`p^* = V/C\quad(V \lt C)`],
      ['Hawk vs hawk payoff', R`(V - C)/2`],
      ['Marginal value theorem', R`G'(t^*) = \dfrac{G(t^*)}{t^* + T}`],
      ['Relatedness', R`r = \tfrac12\ \text{siblings},\ \tfrac14\ \text{half-sibs},\ \tfrac18\ \text{cousins}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Habituation', q: R`<p>Snails stop withdrawing into their shells when repeatedly touched harmlessly. This is…</p>`, options: ['Imprinting', 'Habituation', 'Classical conditioning', 'Taxis'], answer: 1, hints: [R`Learning to ignore.`], solution: R`<p>Habituation.</p>` },
      { level: 'concept', type: 'mcq', title: 'Kinesis', q: R`<p>Woodlice move faster and turn more in dry air, ending up in damp places. This is…</p>`, options: ['A taxis', 'A kinesis', 'A fixed action pattern', 'Operant conditioning'], answer: 1, hints: [R`No direction towards the stimulus.`], solution: R`<p>A kinesis.</p>` },
      { level: 'concept', type: 'mcq', title: 'Proximate cause', q: R`<p>Which is a proximate explanation of birdsong?</p>`, options: ['Song attracts mates, increasing fitness', 'Testosterone in spring activates song nuclei in the brain', 'Song evolved from simpler calls', 'Song defends territories'], answer: 1, hints: [R`Mechanism.`], solution: R`<p>The hormonal and neural mechanism.</p>` },
      { level: 'core', type: 'num', title: 'ESS', q: R`<p>In a hawk–dove game, V = 6 and C = 15. What fraction of hawks is evolutionarily stable?</p>`, answer: 0.4, tol: 0.005, unit: '', hints: [R`V/C.`], solution: R`<p>0.4.</p>` },
      { level: 'core', type: 'num', title: 'Hamilton’s rule', q: R`<p>An alarm call costs the caller 0.1 offspring and saves 0.3 offspring-equivalents for each of 2 full siblings. What is rB − C?</p>`, answer: 0.5 * 0.6 - 0.1, tol: 0.005, atol: 0.001, unit: '', hints: [R`r = ½, B = 0.6.`], solution: R`<p>0.3 − 0.1 = 0.2 > 0: favoured.</p>` },
      { level: 'core', type: 'num', title: 'Waggle dance', q: R`<p>A bee’s waggle run points 40° to the right of vertical and lasts 2.5 s (≈ 1 s per km). How far away is the food, in km?</p>`, answer: 2.5, tol: 0.005, unit: 'km', hints: [R`Duration codes distance.`], solution: R`<p>2.5 km, 40° clockwise from the Sun’s direction.</p>` },
      { level: 'core', type: 'num', title: 'Relatedness', q: R`<p>In haplodiploid Hymenoptera, what is the relatedness between full sisters?</p>`, answer: 0.75, tol: 0.005, unit: '', hints: [R`They share all of the father’s genes.`], solution: R`<p>¾.</p>` },
      { level: 'core', type: 'num', title: 'Hawk payoff', q: R`<p>With V = 10 and C = 30, what is a hawk’s expected payoff in a population of all hawks?</p>`, answer: -10, tol: 0.005, unit: '', hints: [R`(V − C)/2.`], solution: R`<p>−10: so doves can invade.</p>` },
      { level: 'core', type: 'num', title: 'Cousins', q: R`<p>Following Haldane, how many first cousins must be saved to make a sacrifice of one’s own life (cost 1) worthwhile?</p>`, answer: 8, tol: 0.001, unit: '', hints: [R`r = 1/8.`], solution: R`<p>More than 8.</p>` },
      { level: 'olympiad', type: 'num', title: 'Marginal value', q: R`<p>A patch yields $G(t) = 100(1 - e^{-t/10})$ J and travel takes 10 s. Numerically, what residence time (s) maximises $G(t)/(t + 10)$?</p>`, answer: (function () { let bt = 0, br = 0; for (let t = 0.01; t < 100; t += 0.01) { const r = 100 * (1 - Math.exp(-t / 10)) / (t + 10); if (r > br) { br = r; bt = t; } } return bt; })(), tol: 0.01, unit: 's', hints: [R`Solve $e^{t/10} = 2 + t/10$.`], solution: R`<p>$t \approx ${f((function () { let bt = 0, br = 0; for (let t = 0.01; t < 100; t += 0.01) { const r = 100 * (1 - Math.exp(-t / 10)) / (t + 10); if (r > br) { br = r; bt = t; } } return bt; })())}$ s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mixed ESS payoff', q: R`<p>For V = 4, C = 10, what is the average payoff per contest in the ESS population?</p>`, answer: 0.6 * 2, tol: 0.005, unit: '', hints: [R`At the ESS, payoffs equal the dove payoff: (1 − p)V/2.`], solution: R`<p>Dove payoff $(1 - 0.4)\times2 = 1.2$, less than the 2 of an all-dove population: the cost of the arms race.</p>` },
      { level: 'olympiad', type: 'num', title: 'Reciprocity', q: R`<p>Helping costs 1 and gives the partner 3. In a repeated game, cooperation is stable if the probability w of another round exceeds C/B. What is the minimum w?</p>`, answer: 1 / 3, tol: 0.005, unit: '', hints: [R`C/B.`], solution: R`<p>${f(1 / 3)}.</p>` }
    ]
  });
  PB.addDrills('bio-behaviour', [
    { title: 'Hawk–dove ESS', gen(r) { const V = r.int(1, 20), C = r.int(V + 1, 40); return { q: R`<p>In a hawk–dove game with V = ${V} and C = ${C}, what is the ESS fraction of hawks?</p>`, answer: V / C, tol: 0.005, unit: '', solution: R`<p>${V}/${C} = ${f(V / C)}.</p>` }; } },
    { title: 'Hamilton’s rule', gen(r) { const rel = r.pick([[0.5, 'full sibling'], [0.25, 'half-sibling'], [0.125, 'first cousin'], [0.5, 'offspring'], [0.25, 'grandchild']]), B = r.step(0.5, 10, 0.5), C = r.step(0.1, 3, 0.1); return { q: R`<p>Helping a ${rel[1]} gives them B = ${f(B)} and costs C = ${f(C)}. What is rB − C? (Positive means the help is favoured.)</p>`, answer: rel[0] * B - C, tol: 0.005, atol: 0.003, unit: '', solution: R`<p>${rel[0]} × ${f(B)} − ${f(C)} = ${f(rel[0] * B - C)}.</p>` }; } },
    { title: 'Waggle dance distance', gen(r) { const s = r.step(0.2, 6, 0.1), k = r.pick([0.75, 1, 1.25]); return { q: R`<p>A waggle run lasts ${f(s)} s; in this colony 1 s codes ${k} km. How far is the food, in km?</p>`, answer: s * k, tol: 0.005, unit: 'km', solution: R`<p>${f(s * k)} km.</p>` }; } }
  ]);
})();
