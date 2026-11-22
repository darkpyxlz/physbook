(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-enzymes', subject: 'biology', num: 4, part: 'Cells and Molecules',
    title: 'Enzymes',
    subtitle: R`Biological catalysts. How enzymes lower activation energy, the Michaelis–Menten equation, the effects of temperature and pH, and how inhibitors and allostery control metabolism.`,
    goals: ['Explain how enzymes lower activation energy', 'Use the Michaelis–Menten equation and interpret K_M and V_max', 'Read a Lineweaver–Burk plot', 'Distinguish competitive, non-competitive and uncompetitive inhibition', 'Explain temperature and pH optima, Q₁₀ and allostery'],
    sections: [
      {
        title: 'How enzymes work',
        html: R`
<p>Enzymes are proteins (a few are RNA) that speed reactions up, often by factors of $10^{6}$ to $10^{17}$, without being used up. The substrate binds to the <strong>active site</strong>, a pocket whose shape and charges complement it. The <strong>induced-fit model</strong> says the site changes shape slightly as the substrate binds, straining bonds and stabilising the <strong>transition state</strong>.</p>
<p>Catalysis lowers the <strong>activation energy</strong> $E_a$; it does not change $\Delta G$ or the equilibrium position. By the Arrhenius relation, rate $\propto e^{-E_a/RT}$, so lowering $E_a$ by 34 kJ/mol at 37 °C speeds a reaction up about $e^{34000/(8.314\times310)} \approx 5\times10^5$ times.</p>
<p>Many enzymes need <strong>cofactors</strong>: metal ions (Zn²⁺ in carbonic anhydrase, Mg²⁺ with ATP) or organic <strong>coenzymes</strong> derived from vitamins (NAD⁺ from niacin, FAD from riboflavin, coenzyme A from pantothenate).</p>`
      },
      {
        title: 'Michaelis–Menten kinetics',
        html: R`
<p>The scheme $\mathrm{E + S \rightleftharpoons ES \rightarrow E + P}$ with a steady-state ES concentration gives</p>
$$v = \frac{V_{\max}[S]}{K_M + [S]}.$$
<ul>
<li>$V_{\max} = k_{\text{cat}}[E]_{\text{total}}$ is the rate when every enzyme is busy. $k_{\text{cat}}$, the <strong>turnover number</strong>, is reactions per enzyme per second: 600 000 s⁻¹ for carbonic anhydrase.</li>
<li>$K_M$ is the substrate concentration at half $V_{\max}$. A low $K_M$ means the enzyme works well at low substrate levels.</li>
<li>$k_{\text{cat}}/K_M$ measures efficiency at low [S]. The ceiling, set by diffusion, is about $10^8$–$10^9$ M⁻¹ s⁻¹; enzymes near it are called "catalytically perfect".</li>
</ul>
<p>Taking reciprocals gives a straight line, the <strong>Lineweaver–Burk plot</strong>:</p>
$$\frac{1}{v} = \frac{K_M}{V_{\max}}\cdot\frac{1}{[S]} + \frac{1}{V_{\max}}.$$
<p>The y-intercept is $1/V_{\max}$ and the x-intercept is $-1/K_M$.</p>
<details class="example"><summary><span class="lbl">Worked example</span> An enzyme has $K_M = 2$ mM and $V_{\max} = 100$ μmol/min. What is the rate at [S] = 6 mM?<span class="tog">Solution</span></summary><div class="sol"><p>$v = 100\times6/(2+6) = 75$ μmol/min. At [S] = 3K_M the enzyme runs at 75% of its maximum.</p></div></details>`
      },
      {
        title: 'Temperature and pH',
        html: R`
<p>Raising temperature speeds molecules up, so rates rise, typically doubling for every 10 °C: the <strong>temperature coefficient</strong></p>
$$Q_{10} = \left(\frac{R_2}{R_1}\right)^{10/(T_2-T_1)}$$
<p>is about 2 for enzyme reactions. Above the optimum (about 37–40 °C in humans, 80 °C or more in thermophiles) vibrations break the hydrogen and ionic bonds holding the active site, and the enzyme <strong>denatures</strong>. Denaturation is usually irreversible; slowing by cold is not.</p>
<p>pH changes the charges on amino acid side chains in and around the active site. Pepsin in the stomach works best at pH 2, trypsin in the small intestine at pH 8, most cytoplasmic enzymes near 7.</p>`
      },
      {
        title: 'Inhibition and control',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Type</th><th>Binds</th><th>Effect</th><th>Lineweaver–Burk</th></tr></thead><tbody>
<tr><td>Competitive</td><td>active site (resembles substrate)</td><td>$K_M$ ↑ by $(1 + [I]/K_i)$; $V_{\max}$ unchanged</td><td>lines cross on the y-axis</td></tr>
<tr><td>Non-competitive</td><td>another site, on E or ES equally</td><td>$V_{\max}$ ↓ by $(1 + [I]/K_i)$; $K_M$ unchanged</td><td>lines cross on the x-axis</td></tr>
<tr><td>Uncompetitive</td><td>only the ES complex</td><td>both $K_M$ and $V_{\max}$ ↓ by the same factor</td><td>parallel lines</td></tr>
</tbody></table></div>
<p>Competitive inhibition can be overcome by flooding the enzyme with substrate; non-competitive cannot. Examples: methotrexate (competitive with folate) in chemotherapy; cyanide binding cytochrome oxidase; irreversible inhibitors like aspirin acetylating cyclooxygenase.</p>
<p><strong>Allosteric enzymes</strong> have several subunits and give sigmoid rather than hyperbolic curves. In <strong>end-product inhibition</strong> the last product of a pathway binds an allosteric site on the first enzyme, so the pathway switches itself off when its product builds up: ATP inhibits phosphofructokinase in glycolysis.</p>
<div class="key"><strong>Key idea.</strong> Competitive inhibitors change how much substrate you need; non-competitive inhibitors change how much enzyme you effectively have.</div>`
      }
    ],
    labs: [
      { sim: 'enzyme', title: 'Michaelis–Menten and inhibitors', desc: 'The rate curve and its Lineweaver–Burk plot. The dashed line is the uninhibited enzyme.',
        tasks: ['With no inhibitor, read off the rate at [S] = K_M. What fraction of V_max is it?', 'Add a competitive inhibitor at [I]/K_i = 1. Where do the two double-reciprocal lines meet?', 'Repeat for non-competitive and uncompetitive inhibitors and describe each pattern.'] }
    ],
    formulas: [
      ['Michaelis–Menten', R`v = \dfrac{V_{\max}[S]}{K_M + [S]}`],
      ['Maximum rate', R`V_{\max} = k_{\text{cat}}[E]_0`],
      ['Lineweaver–Burk', R`\dfrac1v = \dfrac{K_M}{V_{\max}}\dfrac1{[S]} + \dfrac1{V_{\max}}`],
      ['Competitive inhibition', R`K_M' = K_M(1 + [I]/K_i)`],
      ['Temperature coefficient', R`Q_{10} = (R_2/R_1)^{10/\Delta T}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'What enzymes change', q: R`<p>An enzyme catalyses a reaction. Which quantity does it change?</p>`, options: ['ΔG of the reaction', 'The equilibrium constant', 'The activation energy', 'The amount of product at equilibrium'], answer: 2, hints: [R`Catalysts change the path, not the endpoints.`], solution: R`<p>Only the activation energy, so equilibrium is reached faster.</p>` },
      { level: 'concept', type: 'mcq', title: 'Overcoming inhibition', q: R`<p>Which inhibition is reduced by adding much more substrate?</p>`, options: ['Competitive', 'Non-competitive', 'Irreversible', 'Uncompetitive'], answer: 0, hints: [R`Which one competes for the same site?`], solution: R`<p>Competitive: substrate out-competes the inhibitor for the active site.</p>` },
      { level: 'concept', type: 'mcq', title: 'Pathway switch-off', q: R`<p>The final product of a pathway inhibits its first enzyme. This is called…</p>`, options: ['Positive feedback', 'End-product (feedback) inhibition', 'Competitive activation', 'Denaturation'], answer: 1, hints: [R`Negative feedback on the pathway.`], solution: R`<p>End-product inhibition, usually allosteric.</p>` },
      { level: 'core', type: 'num', title: 'Rate from M–M', q: R`<p>$K_M = 0.5$ mM and $V_{\max} = 80$ μmol/min. Find $v$ at [S] = 1.5 mM.</p>`, answer: 60, tol: 0.002, unit: 'μmol/min', hints: [R`$80\times1.5/2.0$.`], solution: R`<p>60 μmol/min.</p>` },
      { level: 'core', type: 'num', title: 'Substrate for 90%', q: R`<p>At what multiple of $K_M$ does an enzyme reach 90% of $V_{\max}$?</p>`, answer: 9, tol: 0.002, unit: '× K_M', hints: [R`Solve $0.9 = S/(K_M + S)$.`], solution: R`<p>$S = 9K_M$: getting the last 10% needs a lot more substrate.</p>` },
      { level: 'core', type: 'num', title: 'Turnover number', q: R`<p>0.01 μmol of enzyme gives $V_{\max} = 1.2$ μmol of product per second. What is $k_{\text{cat}}$, in s⁻¹?</p>`, answer: 120, tol: 0.002, unit: 's⁻¹', hints: [R`$k_{cat} = V_{max}/[E]$.`], solution: R`<p>$1.2/0.01 = 120$ s⁻¹.</p>` },
      { level: 'core', type: 'num', title: 'Q₁₀', q: R`<p>A reaction rate rises from 4.0 to 11.0 units when the temperature rises from 20 to 35 °C. Find $Q_{10}$.</p>`, answer: 1.963, tol: 0.01, unit: '', hints: [R`Exponent $10/15$.`], solution: R`<p>$(11/4)^{2/3} = 2.75^{0.667} = 1.96$.</p>` },
      { level: 'core', type: 'num', title: 'From the double-reciprocal plot', q: R`<p>A Lineweaver–Burk plot has y-intercept 0.02 min/μmol and x-intercept −0.25 mM⁻¹. Find $K_M$ in mM.</p>`, answer: 4, tol: 0.002, unit: 'mM', hints: [R`x-intercept $= -1/K_M$.`], solution: R`<p>$K_M = 4$ mM (and $V_{\max} = 50$ μmol/min).</p>` },
      { level: 'olympiad', type: 'num', title: 'Competitive inhibitor', q: R`<p>$K_M = 2$ mM, $V_{\max} = 100$, [S] = 2 mM. A competitive inhibitor is added at $[I] = 3K_i$. What is the new rate?</p>`, answer: 20, tol: 0.002, unit: '', hints: [R`$K_M' = 2\times4 = 8$ mM.`], solution: R`<p>$v = 100\times2/(8 + 2) = 20$, down from 50.</p>` },
      { level: 'olympiad', type: 'num', title: 'Lowering the barrier', q: R`<p>An enzyme lowers $E_a$ from 86 to 50 kJ/mol. At 310 K, by what factor does the rate increase? Give the answer in units of 10⁶.</p>`, answer: 1.16, tol: 0.03, unit: '×10⁶', hints: [R`$e^{\Delta E_a/RT}$ with $\Delta E_a = 36\,000$ J/mol.`], solution: R`<p>$e^{36000/(8.314\times310)} = e^{13.97} = 1.16\times10^6$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Non-competitive inhibitor', q: R`<p>A non-competitive inhibitor with $K_i = 1$ mM is present at 4 mM. By what percentage is $V_{\max}$ reduced?</p>`, answer: 80, tol: 0.002, unit: '%', hints: [R`$V_{\max}' = V_{\max}/(1 + 4)$.`], solution: R`<p>$V_{\max}$ falls to 1/5, an 80% reduction, whatever the substrate concentration.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-enzymes', [
    { title: 'Michaelis–Menten rate', gen(r) { const K = r.step(0.2, 8, 0.1), V = r.int(20, 200), S = r.step(0.1, 20, 0.1); const v = V * S / (K + S); return { q: R`<p>$K_M = ${f(K)}$ mM, $V_{\max} = ${V}$ μmol/min. Find the rate at [S] = ${f(S)} mM.</p>`, answer: v, tol: 0.005, unit: 'μmol/min', solution: R`<p>$${V}\times${f(S)}/(${f(K)} + ${f(S)}) = ${f(v)}$.</p>` }; } },
    { title: 'Competitive inhibition', gen(r) { const K = r.int(1, 10), V = r.int(50, 200), S = r.int(1, 20), n = r.int(1, 6); const v = V * S / (K * (1 + n) + S); return { q: R`<p>$K_M = ${K}$ mM, $V_{\max} = ${V}$, [S] = ${S} mM, and a competitive inhibitor is present at $[I] = ${n}K_i$. Find the rate.</p>`, answer: v, tol: 0.005, unit: '', solution: R`<p>$K_M' = ${K * (1 + n)}$ mM, so $v = ${V}\times${S}/${K * (1 + n) + S} = ${f(v)}$.</p>` }; } },
    { title: 'Q₁₀', gen(r) { const R1 = r.int(2, 20), q = r.step(1.5, 3, 0.1), dT = r.pick([5, 10, 15, 20]); const R2 = R1 * Math.pow(q, dT / 10); return { q: R`<p>A rate rises from ${R1} to ${f(R2)} units over a ${dT} °C rise. Find $Q_{10}$.</p>`, answer: q, tol: 0.01, unit: '', solution: R`<p>$(${f(R2)}/${R1})^{10/${dT}} = ${f(q)}$.</p>` }; } }
  ]);
})();
