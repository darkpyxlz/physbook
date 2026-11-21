(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-equilibrium', subject: 'chemistry', num: 10, part: 'Physical Chemistry',
    title: 'Chemical Equilibrium',
    subtitle: R`Reactions that run both ways. Equilibrium constants, reaction quotients and ICE tables, Le Chatelier's principle, and how temperature moves K.`,
    goals: ['Write Kc and Kp expressions', 'Use Q to predict the direction of change', 'Solve equilibrium problems with ICE tables', 'Apply Le Chatelier’s principle', 'Use the van ’t Hoff equation'],
    sections: [
      {
        title: 'Dynamic equilibrium and K',
        html: R`
<p>In a closed system a reversible reaction reaches <strong>dynamic equilibrium</strong>: forward and reverse reactions continue at equal rates, so concentrations stop changing. For $a\mathrm A + b\mathrm B \rightleftharpoons c\mathrm C + d\mathrm D$:</p>
<div class="key">$$K_c = \frac{[\mathrm C]^c[\mathrm D]^d}{[\mathrm A]^a[\mathrm B]^b},\qquad K_p = \frac{p_C^c\,p_D^d}{p_A^a\,p_B^b},\qquad K_p = K_c(RT)^{\Delta n}.$$</div>
<p>Pure solids and liquids do not appear (their activity is 1). Reversing an equation inverts K; multiplying it by $n$ raises K to the power $n$; adding equations multiplies their Ks.</p>`
      },
      {
        title: 'The reaction quotient and ICE tables',
        html: R`
<p>The <strong>reaction quotient</strong> $Q$ has the same form as K but uses the current concentrations. If $Q \lt K$ the reaction moves forward; if $Q \gt K$ it moves backward; if $Q = K$ it is at equilibrium.</p>
<p>To find equilibrium amounts, build an <strong>ICE table</strong> (Initial, Change, Equilibrium) in terms of one unknown $x$, substitute into K and solve, usually a quadratic. When K is very small, $x$ is negligible next to the starting concentrations, and the "small $x$" approximation simplifies the algebra (check it afterwards: under 5% is fine).</p>
<details class="example"><summary><span class="lbl">Worked example</span>For H₂ + I₂ ⇌ 2HI, K = 50.0. Starting with 1.00 M H₂ and 1.00 M I₂, find [HI] at equilibrium.<span class="tog">Solution</span></summary><div class="sol"><p>$K = (2x)^2/(1 - x)^2 = 50$, so $2x/(1 - x) = 7.07$ and $x = 0.780$. $[\mathrm{HI}] = 1.56\ \mathrm M$.</p></div></details>`
      },
      {
        title: "Le Chatelier's principle",
        html: R`
<p>A system at equilibrium responds to a disturbance by shifting in the direction that partly undoes it:</p>
<ul>
<li><strong>Adding a reactant</strong> (or removing a product) shifts the equilibrium to the right. K is unchanged; Q has moved.</li>
<li><strong>Increasing pressure</strong> by compression shifts towards fewer moles of gas. Adding an inert gas at constant volume changes nothing.</li>
<li><strong>Raising the temperature</strong> favours the endothermic direction. This is the only change that alters K itself.</li>
<li>A <strong>catalyst</strong> speeds up both directions equally: equilibrium is reached sooner but at the same position.</li>
</ul>`
      },
      {
        title: 'K and temperature',
        html: R`
<p>From $\Delta G^\circ = -RT\ln K = \Delta H^\circ - T\Delta S^\circ$ comes the <strong>van 't Hoff equation</strong>:</p>
<div class="key">$$\ln\frac{K_2}{K_1} = -\frac{\Delta H^\circ}{R}\left(\frac1{T_2} - \frac1{T_1}\right).$$</div>
<p>A plot of $\ln K$ against $1/T$ is a straight line of slope $-\Delta H^\circ/R$. For exothermic reactions K falls as temperature rises, which is the central compromise of the Haber process.</p>
<div class="insight"><p>For a dissociation such as N₂O₄ ⇌ 2NO₂ at total pressure $P$, writing everything in terms of the degree of dissociation $\alpha$ gives $K_p = \dfrac{4\alpha^2P}{1 - \alpha^2}$. Olympiads love this form because measuring the density (or the molar mass) of the equilibrium mixture gives $\alpha$ directly.</p></div>`
      }
    ],
    labs: [
      { sim: 'equilibrium', title: 'Le Chatelier in action', desc: 'A + B ⇌ C approaches equilibrium. Disturb it and watch the concentrations respond. ΔH sets how K depends on temperature.',
        tasks: ['Let it settle, then add A. Which concentrations rise and which fall?', 'With ΔH negative, heat the mixture. Does K go up or down? What about with ΔH positive?', 'Compress the mixture. Why does C increase even though K is unchanged?'] }
    ],
    formulas: [
      ['Equilibrium constant', R`K_c = \frac{[\mathrm C]^c[\mathrm D]^d}{[\mathrm A]^a[\mathrm B]^b}`],
      ['Kp and Kc', R`K_p = K_c(RT)^{\Delta n}`],
      ['Direction of change', R`Q \lt K \Rightarrow \text{forward}`],
      ['van ’t Hoff', R`\ln(K_2/K_1) = -\frac{\Delta H^\circ}{R}\left(\frac1{T_2} - \frac1{T_1}\right)`],
      ['Dissociation equilibrium', R`K_p = 4\alpha^2P/(1 - \alpha^2)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Adding a catalyst', q: R`<p>A catalyst is added to a reaction mixture at equilibrium. The position of equilibrium:</p>`, options: ['Shifts to the products', 'Shifts to the reactants', 'Does not change', 'Depends on ΔH'], answer: 2, hints: [R`A catalyst speeds both directions equally.`], solution: R`<p>K and the equilibrium composition are unchanged; equilibrium is just reached faster.</p>` },
      { level: 'concept', type: 'mcq', title: 'Heating an exothermic reaction', q: R`<p>For an exothermic reaction, raising the temperature makes K:</p>`, options: ['Larger', 'Smaller', 'Unchanged', 'Zero'], answer: 1, hints: [R`Heating favours the endothermic direction, the reverse here.`], solution: R`<p>K falls, consistent with the van 't Hoff equation for ΔH° < 0.</p>` },
      { level: 'concept', type: 'mcq', title: 'Squeezing', q: R`<p>The mixture N₂O₄(g) ⇌ 2NO₂(g) is compressed to half its volume. The equilibrium shifts:</p>`, options: ['Towards NO₂', 'Towards N₂O₄', 'Not at all', 'Towards whichever is coloured'], answer: 1, hints: [R`Which side has fewer moles of gas?`], solution: R`<p>Towards N₂O₄ (1 mol gas rather than 2). The colour first darkens (concentration rises), then partly fades.</p>` },
      { level: 'core', type: 'num', title: 'Calculating K', q: R`<p>At equilibrium, [H₂] = [I₂] = 0.11 M and [HI] = 0.78 M. Find Kc for H₂ + I₂ ⇌ 2HI.</p>`, answer: 0.78 * 0.78 / (0.11 * 0.11), tol: 0.01, unit: '', hints: [R`$K = [\mathrm{HI}]^2/([\mathrm{H_2}][\mathrm{I_2}])$.`], solution: R`<p>$0.608/0.0121 = 50.3$.</p>` },
      { level: 'core', type: 'num', title: 'ICE table', q: R`<p>For H₂ + I₂ ⇌ 2HI, Kc = 50.0. Starting from 1.00 M H₂ and 1.00 M I₂, what is [HI] at equilibrium?</p>`, answer: 2 * Math.sqrt(50) / (2 + Math.sqrt(50)), tol: 0.01, unit: 'mol/L', hints: [R`Take the square root of both sides.`], solution: R`<p>$2x/(1 - x) = 7.07 \Rightarrow x = 0.780$, $[\mathrm{HI}] = 1.56\ \mathrm M$.</p>` },
      { level: 'core', type: 'num', title: 'From Kc to Kp', q: R`<p>For N₂ + 3H₂ ⇌ 2NH₃ at 400 K, Kc = 0.50 (concentrations in mol/L). Find Kp with pressures in bar ($R = 0.08314\ \mathrm{L\,bar\,mol^{-1}K^{-1}}$).</p>`, answer: 0.5 * Math.pow(0.08314 * 400, -2), tol: 0.01, unit: '', hints: [R`$\Delta n = 2 - 4 = -2$.`], solution: R`<p>$K_p = 0.50(33.26)^{-2} = 4.5\times10^{-4}$.</p>` },
      { level: 'core', type: 'num', title: 'Reaction quotient', q: R`<p>A mixture contains [N₂O₄] = 0.10 M and [NO₂] = 0.20 M. What is Q for N₂O₄ ⇌ 2NO₂?</p>`, answer: 0.4, tol: 0.01, unit: '', hints: [R`$Q = [\mathrm{NO_2}]^2/[\mathrm{N_2O_4}]$.`], solution: R`<p>$0.040/0.10 = 0.40$. If Kc were 4.6×10⁻³, Q > K and NO₂ would combine.</p>` },
      { level: 'core', type: 'num', title: 'Dissociating PCl₅', q: R`<p>PCl₅ ⇌ PCl₃ + Cl₂ has Kc = 0.040. Starting with 0.10 M PCl₅, what percentage dissociates?</p>`, answer: 100 * ((-0.04 + Math.sqrt(0.0016 + 0.016)) / 2) / 0.1, tol: 0.01, unit: '%', hints: [R`$x^2/(0.10 - x) = 0.040$: a quadratic.`], solution: R`<p>$x^2 + 0.04x - 0.004 = 0$ gives $x = 0.0463$, so 46.3% dissociates. The small-$x$ approximation would fail here.</p>` },
      { level: 'olympiad', type: 'num', title: 'Doubling with heat', q: R`<p>The equilibrium constant of a reaction doubles when the temperature rises from 298 K to 308 K. Estimate ΔH°.</p>`, answer: 8.314 * Math.log(2) / (1 / 298 - 1 / 308) / 1000, tol: 0.01, unit: 'kJ/mol', hints: [R`van 't Hoff with $K_2/K_1 = 2$.`], solution: R`<p>$\Delta H^\circ = R\ln2/(1/298 - 1/308) = 52.9\ \mathrm{kJ/mol}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Nitrogen dioxide', q: R`<p>For N₂O₄ ⇌ 2NO₂, Kp = 0.148 (bar) at 298 K. Find the degree of dissociation α of N₂O₄ at a total pressure of 1.00 bar.</p>`, answer: Math.sqrt(0.148 / (4 + 0.148)), tol: 0.01, unit: '', hints: [R`$K_p = 4\alpha^2P/(1 - \alpha^2)$.`], solution: R`<p>$\alpha^2 = K_p/(4P + K_p) = 0.0357$, so $\alpha = 0.189$: 19% dissociated.</p>` },
      { level: 'olympiad', type: 'num', title: 'Starting from the product', q: R`<p>2.00 mol of HI is placed in a 1.00 L flask and allowed to reach equilibrium (H₂ + I₂ ⇌ 2HI, Kc = 50.0). What is the equilibrium concentration of H₂?</p>`, answer: 2 / (2 + Math.sqrt(50)), tol: 0.01, unit: 'mol/L', hints: [R`$[\mathrm H_2] = [\mathrm I_2] = x$ and $[\mathrm{HI}] = 2 - 2x$.`], solution: R`<p>$(2 - 2x)/x = 7.07$, so $x = 0.220\ \mathrm M$. The same equilibrium as starting from 1 M H₂ and 1 M I₂, as it must be.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-equilibrium', [
    { title: 'Equilibrium constant', gen(r) { const a = r.step(0.05, 1, 0.01), b = r.step(0.05, 1, 0.01), c = r.step(0.05, 2, 0.01); return { q: R`<p>At equilibrium [A] = ${a} M, [B] = ${b} M, [C] = ${c} M. Find Kc for A + B ⇌ 2C.</p>`, answer: c * c / (a * b), unit: '', solution: R`<p>$K = [\mathrm C]^2/([\mathrm A][\mathrm B]) = ${f(c * c / (a * b))}$.</p>` }; } },
    { title: 'Weak dissociation', gen(r) { const K = r.pick([1e-5, 4e-5, 1e-4, 3e-4, 1e-3]), C = r.step(0.05, 1, 0.05); const x = (-K + Math.sqrt(K * K + 4 * K * C)) / 2; return { q: R`<p>AB ⇌ A + B has Kc = ${K}. Starting from ${C} M AB, find [A] at equilibrium.</p>`, answer: x, unit: 'mol/L', solution: R`<p>$x^2/(${C} - x) = K$ gives $x = ${f(x)}\ \mathrm M$.</p>` }; } },
    { title: 'van ’t Hoff', gen(r) { const H = r.int(-120, 120) || 40, T1 = 298, T2 = r.int(310, 500); const ratio = Math.exp(-H * 1000 / 8.314 * (1 / T2 - 1 / T1)); return { q: R`<p>ΔH° = ${H} kJ/mol. By what factor does K change from 298 K to ${T2} K?</p>`, answer: ratio, unit: '×', solution: R`<p>$K_2/K_1 = \exp[-\Delta H^\circ/R\,(1/T_2 - 1/T_1)] = ${f(ratio)}$.</p>` }; } }
  ]);
})();
