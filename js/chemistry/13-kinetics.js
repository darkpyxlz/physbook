(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-kinetics', subject: 'chemistry', num: 13, part: 'Physical Chemistry',
    title: 'Reaction Kinetics',
    subtitle: R`How fast reactions go and why. Rate laws and orders, integrated rate equations and half-lives, the Arrhenius equation, reaction mechanisms and catalysis.`,
    goals: ['Find orders from initial-rate data', 'Use integrated rate laws and half-lives', 'Calculate activation energies with Arrhenius', 'Derive rate laws from mechanisms', 'Explain how catalysts and enzymes work'],
    sections: [
      {
        title: 'Rates and rate laws',
        html: R`
<p>The rate of a reaction is how fast a concentration changes, divided by its coefficient: for $a\mathrm A \to$ products, $\text{rate} = -\frac1a\frac{\dd[\mathrm A]}{\dd t}$. Experiments show it usually follows a <strong>rate law</strong></p>
<div class="key">$$\text{rate} = k[\mathrm A]^m[\mathrm B]^n,$$</div>
<p>where the orders $m$ and $n$ must be measured; they are <em>not</em> the coefficients of the balanced equation, except for elementary steps. The units of $k$ depend on the overall order: s⁻¹ for first order, L mol⁻¹ s⁻¹ for second.</p>
<p>The <strong>method of initial rates</strong> varies one concentration at a time: if doubling [A] doubles the rate, the order in A is 1; if it quadruples, 2; if nothing changes, 0.</p>`
      },
      {
        title: 'Integrated rate laws',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Order</th><th>Integrated law</th><th>Straight-line plot</th><th>Half-life</th></tr></thead><tbody>
<tr><td>0</td><td>$[\mathrm A] = [\mathrm A]_0 - kt$</td><td>[A] vs $t$</td><td>$[\mathrm A]_0/2k$</td></tr>
<tr><td>1</td><td>$\ln[\mathrm A] = \ln[\mathrm A]_0 - kt$</td><td>ln[A] vs $t$</td><td>$\ln2/k$</td></tr>
<tr><td>2</td><td>$1/[\mathrm A] = 1/[\mathrm A]_0 + kt$</td><td>1/[A] vs $t$</td><td>$1/(k[\mathrm A]_0)$</td></tr>
</tbody></table></div>
<p>Only first-order reactions have a half-life independent of concentration, which is why radioactive decay and many drug eliminations are described by half-lives. Plot the data three ways; the straight one reveals the order.</p>`
      },
      {
        title: 'Temperature and the Arrhenius equation',
        html: R`
<p>Molecules react only if they collide with enough energy (the <strong>activation energy</strong> $E_a$) and the right orientation. The fraction with enough energy rises steeply with temperature, giving the <strong>Arrhenius equation</strong>:</p>
<div class="key">$$k = Ae^{-E_a/RT},\qquad \ln\frac{k_2}{k_1} = -\frac{E_a}{R}\left(\frac1{T_2} - \frac1{T_1}\right).$$</div>
<p>A plot of $\ln k$ against $1/T$ has slope $-E_a/R$. The old rule that rates double for each 10 K rise near room temperature corresponds to $E_a \approx 50\ \mathrm{kJ/mol}$.</p>`
      },
      {
        title: 'Mechanisms and catalysis',
        html: R`
<p>Most reactions happen in a series of <strong>elementary steps</strong>, each with a rate law that does follow its own stoichiometry. The slowest step, the <strong>rate-determining step</strong>, controls the overall rate. Intermediates appear in the mechanism but not in the overall equation or the rate law.</p>
<p>Two tools derive a rate law from a mechanism:</p>
<ul>
<li><strong>Pre-equilibrium</strong>: a fast reversible step before a slow one; replace the intermediate's concentration using its equilibrium constant.</li>
<li><strong>Steady-state approximation</strong>: set the rate of change of a reactive intermediate to zero.</li>
</ul>
<p>A <strong>catalyst</strong> provides a different path with a lower activation energy and is regenerated. It changes the rate, not the equilibrium. Enzymes follow <strong>Michaelis–Menten kinetics</strong>: $v = \dfrac{V_{\max}[\mathrm S]}{K_M + [\mathrm S]}$, saturating at high substrate concentration.</p>
<div class="insight"><p>To test a proposed mechanism, derive its rate law and compare with experiment. Agreement does not prove the mechanism, but disagreement disproves it. Olympiads often give a mechanism and ask for the rate law, or give a rate law and ask which mechanism fits.</p></div>`
      }
    ],
    labs: [
      { sim: 'kinetics', title: 'Finding the order', desc: 'Concentration of A over time plotted three ways. The plot that is a straight line (green) reveals the order. Temperature changes k through the Arrhenius equation.',
        tasks: ['For a first-order reaction, how long does it take [A] to halve? Then halve again?', 'Switch to second order. Does the second half-life equal the first?', 'With Eₐ = 50 kJ/mol, how much does k grow from 298 K to 308 K?'] }
    ],
    formulas: [
      ['Rate law', R`\text{rate} = k[\mathrm A]^m[\mathrm B]^n`],
      ['First order', R`\ln[\mathrm A] = \ln[\mathrm A]_0 - kt`],
      ['First-order half-life', R`t_{1/2} = \ln2/k`],
      ['Second order', R`1/[\mathrm A] = 1/[\mathrm A]_0 + kt`],
      ['Arrhenius', R`k = Ae^{-E_a/RT}`],
      ['Two temperatures', R`\ln(k_2/k_1) = -\frac{E_a}{R}\left(\frac1{T_2} - \frac1{T_1}\right)`],
      ['Michaelis–Menten', R`v = V_{\max}[\mathrm S]/(K_M + [\mathrm S])`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Units of k', q: R`<p>What are the units of the rate constant for a second-order reaction?</p>`, options: ['s⁻¹', 'mol L⁻¹ s⁻¹', 'L mol⁻¹ s⁻¹', 'L² mol⁻² s⁻¹'], answer: 2, hints: [R`rate (mol L⁻¹ s⁻¹) = k × (mol L⁻¹)².`], solution: R`<p>$k = \text{rate}/c^2$ has units L mol⁻¹ s⁻¹.</p>` },
      { level: 'concept', type: 'mcq', title: 'How catalysts work', q: R`<p>A catalyst speeds up a reaction by:</p>`, options: ['Increasing the temperature', 'Providing a pathway with lower activation energy', 'Making ΔH more negative', 'Shifting the equilibrium to the products'], answer: 1, hints: [R`It is regenerated and does not change K.`], solution: R`<p>A lower activation barrier means more collisions have enough energy.</p>` },
      { level: 'concept', type: 'mcq', title: 'Constant half-life', q: R`<p>For which order is the half-life independent of the starting concentration?</p>`, options: ['Zero', 'First', 'Second', 'All of them'], answer: 1, hints: [R`$t_{1/2} = \ln2/k$.`], solution: R`<p>Only first-order reactions.</p>` },
      { level: 'core', type: 'num', title: 'Initial rates', q: R`<p>Doubling [A] while keeping everything else fixed makes the initial rate four times larger. What is the order with respect to A?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`$2^m = 4$.`], solution: R`<p>$m = 2$.</p>` },
      { level: 'core', type: 'num', title: 'Half-life', q: R`<p>A first-order reaction has k = 0.0231 min⁻¹. Find its half-life in minutes.</p>`, answer: Math.LN2 / 0.0231, tol: 0.01, unit: 'min', hints: [R`$\ln2/k$.`], solution: R`<p>$0.693/0.0231 = 30.0\ \mathrm{min}$.</p>` },
      { level: 'core', type: 'num', title: 'First-order decay', q: R`<p>A first-order reaction with k = 0.050 s⁻¹ starts at [A]₀ = 0.80 M. What is [A] after 20 s?</p>`, answer: 0.8 * Math.exp(-1), tol: 0.01, unit: 'mol/L', hints: [R`$[\mathrm A] = [\mathrm A]_0e^{-kt}$.`], solution: R`<p>$0.80e^{-1.0} = 0.294\ \mathrm M$.</p>` },
      { level: 'core', type: 'num', title: 'Activation energy', q: R`<p>A rate constant rises from 2.0×10⁻³ to 8.0×10⁻³ s⁻¹ when the temperature goes from 300 K to 320 K. Find Eₐ.</p>`, answer: 8.314 * Math.log(4) / (1 / 300 - 1 / 320) / 1000, tol: 0.01, unit: 'kJ/mol', hints: [R`Two-point Arrhenius.`], solution: R`<p>$E_a = R\ln4/(1/300 - 1/320) = 55.3\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Second-order half-life', q: R`<p>A second-order reaction has k = 0.50 L mol⁻¹ s⁻¹ and [A]₀ = 0.20 M. Find its first half-life.</p>`, answer: 10, tol: 0.01, unit: 's', hints: [R`$t_{1/2} = 1/(k[\mathrm A]_0)$.`], solution: R`<p>$1/(0.50 \times 0.20) = 10\ \mathrm s$. The next half-life takes 20 s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Nitric oxide and oxygen', q: R`<p>A proposed mechanism for $\mathrm{2NO + O_2 \to 2NO_2}$ is a fast pre-equilibrium $\mathrm{2NO \rightleftharpoons N_2O_2}$ followed by a slow step $\mathrm{N_2O_2 + O_2 \to 2NO_2}$. What overall reaction order does it predict?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Rate $= k_2[\mathrm{N_2O_2}][\mathrm{O_2}]$ and $[\mathrm{N_2O_2}] = K[\mathrm{NO}]^2$.`], solution: R`<p>Rate $= k_2K[\mathrm{NO}]^2[\mathrm{O_2}]$: third order overall, as observed. The rate even falls slightly with temperature, because K is exothermic.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ten degrees warmer', q: R`<p>For a reaction with Eₐ = 50 kJ/mol, by what factor does the rate constant grow from 298 K to 308 K?</p>`, answer: Math.exp(50000 / 8.314 * (1 / 298 - 1 / 308)), tol: 0.01, unit: '', hints: [R`Arrhenius ratio.`], solution: R`<p>$\exp[(50\,000/8.314)(1/298 - 1/308)] = 1.93$: nearly doubling, the origin of the 10-degree rule.</p>` },
      { level: 'olympiad', type: 'num', title: 'Enzyme rate', q: R`<p>An enzyme has K_M = 2.0 mM and V_max = 100 μmol/min. What is the rate at [S] = 0.50 mM, in μmol/min?</p>`, answer: 100 * 0.5 / 2.5, tol: 0.01, unit: 'μmol/min', hints: [R`Michaelis–Menten.`], solution: R`<p>$v = 100(0.50)/(2.0 + 0.50) = 20\ \mu\mathrm{mol/min}$. At [S] = K_M it would be exactly half of V_max.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-kinetics', [
    { title: 'First-order concentration', gen(r) { const k = r.step(0.005, 0.2, 0.005), A0 = r.step(0.1, 2, 0.1), t = r.int(5, 200); return { q: R`<p>A first-order reaction has k = ${k} s⁻¹ and [A]₀ = ${A0} M. Find [A] after ${t} s.</p>`, answer: A0 * Math.exp(-k * t), unit: 'mol/L', solution: R`<p>$[\mathrm A] = ${A0}e^{-${f(k * t)}} = ${f(A0 * Math.exp(-k * t))}\ \mathrm M$.</p>` }; } },
    { title: 'Arrhenius', gen(r) { const Ea = r.int(20, 150), T1 = r.int(280, 320), T2 = T1 + r.int(5, 60); const ratio = Math.exp(Ea * 1000 / 8.314 * (1 / T1 - 1 / T2)); return { q: R`<p>Eₐ = ${Ea} kJ/mol. By what factor does k increase from ${T1} K to ${T2} K?</p>`, answer: ratio, unit: '×', solution: R`<p>$k_2/k_1 = ${f(ratio)}$.</p>` }; } },
    { title: 'Half-life', gen(r) { const ord = r.pick([0, 1, 2]), k = r.step(0.01, 1, 0.01), A0 = r.step(0.1, 2, 0.1); const h = ord === 0 ? A0 / (2 * k) : ord === 1 ? Math.LN2 / k : 1 / (k * A0); return { q: R`<p>A ${['zero', 'first', 'second'][ord]}-order reaction has k = ${k} (SI units) and [A]₀ = ${A0} M. Find its first half-life (s).</p>`, answer: h, unit: 's', solution: R`<p>$t_{1/2} = ${f(h)}\ \mathrm s$.</p>` }; } }
  ]);
})();
