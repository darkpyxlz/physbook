/* Expanded text for chemistry 10–18: equilibrium, acids and bases, titrations and solubility, kinetics,
   electrochemistry, main-group chemistry, transition metals, organic structure, mechanisms. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('chem-equilibrium', {
    0: { html: R`
<h3 class="sub">Writing equilibrium constants</h3>
<p>For $a\mathrm A + b\mathrm B \rightleftharpoons c\mathrm C + d\mathrm D$, at equilibrium</p>
<div class="key"><p>$K_c = \dfrac{[\mathrm C]^c[\mathrm D]^d}{[\mathrm A]^a[\mathrm B]^b}$, &emsp; $K_p = \dfrac{p_{\mathrm C}^c\,p_{\mathrm D}^d}{p_{\mathrm A}^a\,p_{\mathrm B}^b}$, &emsp; $K_p = K_c(RT)^{\Delta n}$.</p></div>
<p>Pure solids and liquids are left out (their "concentration" does not change): for CaCO<sub>3</sub>(s) ⇌ CaO(s) + CO<sub>2</sub>(g), $K_p = p_{\mathrm{CO_2}}$. Rules for manipulating $K$: reversing the equation gives $1/K$; doubling all coefficients gives $K^2$; adding equations multiplies their constants.</p>
<p>The size of $K$ tells you how far the reaction goes: $K > 10^3$ means mostly products, $K < 10^{-3}$ mostly reactants. It says nothing about how fast equilibrium is reached.</p>
<div class="worked"><p>For N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub>, $K_c = 0.50$ at some temperature. What is $K_c$ for NH<sub>3</sub> ⇌ ½N<sub>2</sub> + 3/2H<sub>2</sub>?</p>
<p>Reverse ($1/0.50 = 2.0$) and halve the coefficients (square root): $\sqrt{2.0} = 1.41$.</p></div>` },
    1: { html: R`
<h3 class="sub">Which way will it go? Q versus K</h3>
<p>The <strong>reaction quotient</strong> $Q$ has the same form as $K$ but uses the current concentrations. If $Q < K$ there are too few products and the reaction moves forward; if $Q > K$ it runs backwards; if $Q = K$ it is at equilibrium.</p>
<div class="worked"><p>For H<sub>2</sub> + I<sub>2</sub> ⇌ 2HI, $K_c = 54$ at 700 K. Starting with 1.00 mol dm⁻³ each of H<sub>2</sub> and I<sub>2</sub>, find the equilibrium concentrations.</p>
<p>ICE table: H<sub>2</sub> and I<sub>2</sub> fall to $1 - x$, HI rises to $2x$. $\dfrac{(2x)^2}{(1 - x)^2} = 54$; taking square roots, $\dfrac{2x}{1 - x} = 7.35$, so $x = 0.786$. Equilibrium: [H<sub>2</sub>] = [I<sub>2</sub>] = 0.214, [HI] = 1.57 mol dm⁻³. Check: $1.57^2/0.214^2 = 54$ ✓.</p></div>
<h3 class="sub">The small-x approximation</h3>
<p>When $K$ is small, $x$ is small compared with the starting amounts, so $1 - x \approx 1$. Always check afterwards that $x$ is under about 5% of what you neglected it against; if not, solve the quadratic.</p>` },
    2: { html: R`
<h3 class="sub">Le Chatelier, case by case</h3>
<p>A system at equilibrium responds to a change by partly undoing it. Each case can be explained with $Q$ and $K$:</p>
<ul><li><strong>Adding a reactant</strong> lowers $Q$ below $K$: the reaction shifts forward until $Q = K$ again.</li>
<li><strong>Increasing pressure</strong> (by compressing) favours the side with fewer gas molecules. For N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub> (4 → 2), compression increases the yield of ammonia.</li>
<li><strong>Adding an inert gas at constant volume</strong> changes nothing: no partial pressure changes.</li>
<li><strong>Temperature</strong> is different: it changes $K$ itself. Raising $T$ favours the endothermic direction.</li>
<li>A <strong>catalyst</strong> speeds both directions equally: equilibrium is reached sooner, but its position is unchanged.</li></ul>
<div class="worked"><p>The Haber process: $\Delta H = -92$ kJ mol⁻¹. Why does industry use 450 °C and 200 atm with an iron catalyst?</p>
<p>Low temperature would favour ammonia but make the reaction too slow; 450 °C is a compromise between yield (about 15% per pass) and rate. High pressure raises the yield, but beyond about 200 atm the cost of equipment and compression outweighs the gain. Unreacted gas is recycled, so the overall conversion is about 98%.</p></div>` },
    3: { html: R`
<h3 class="sub">The van 't Hoff equation</h3>
<p>Combining $\Delta G^\circ = -RT\ln K$ with $\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$ gives a straight line:</p>
<div class="key"><p>$\ln K = -\dfrac{\Delta H^\circ}{R}\cdot\dfrac{1}{T} + \dfrac{\Delta S^\circ}{R}$, &emsp; $\ln\dfrac{K_2}{K_1} = -\dfrac{\Delta H^\circ}{R}\left(\dfrac{1}{T_2} - \dfrac{1}{T_1}\right)$</p></div>
<p>A plot of $\ln K$ against $1/T$ has slope $-\Delta H^\circ/R$: falling with temperature for exothermic reactions (positive slope on this plot), rising for endothermic ones.</p>
<div class="worked"><p>An endothermic reaction ($\Delta H^\circ = +50$ kJ mol⁻¹) has $K = 2.0$ at 300 K. Estimate $K$ at 350 K.</p>
<p>$\ln\dfrac{K_2}{2.0} = -\dfrac{50\,000}{8.314}\left(\dfrac1{350} - \dfrac1{300}\right) = 2.86$, so $K_2 = 2.0e^{2.86} \approx 35$. A modest warming shifts the equilibrium a lot.</p></div>
<p>The same equation, applied to vaporisation, is the Clausius–Clapeyron equation for vapour pressure, which is why water boils at only 70 °C on top of Everest.</p>` }
  });

  X('chem-acids', {
    0: { html: R`
<h3 class="sub">Brønsted–Lowry and Lewis</h3>
<p>A <strong>Brønsted–Lowry acid</strong> donates a proton; a base accepts one. Every acid–base reaction pairs two <strong>conjugate pairs</strong>: in HCl + H<sub>2</sub>O → H<sub>3</sub>O⁺ + Cl⁻, HCl/Cl⁻ and H<sub>3</sub>O⁺/H<sub>2</sub>O. Water is <strong>amphoteric</strong>, acting as acid or base. The stronger an acid, the weaker its conjugate base.</p>
<p>A <strong>Lewis acid</strong> accepts an electron pair and a Lewis base donates one. This wider definition covers reactions with no protons, such as BF<sub>3</sub> + NH<sub>3</sub> → F<sub>3</sub>B–NH<sub>3</sub>, and metal ions binding ligands.</p>
<h3 class="sub">Water's self-ionisation</h3>
<p>Water ionises slightly: $K_w = [\mathrm H^+][\mathrm{OH^-}] = 1.0\times10^{-14}$ at 25 °C. In pure water both are $10^{-7}$, so pH 7. Since ionisation is endothermic, $K_w$ grows with temperature: at 50 °C neutral water has pH 6.6, still neutral because $[\mathrm H^+] = [\mathrm{OH^-}]$.</p>
<div class="key"><p>$\mathrm{pH} = -\log_{10}[\mathrm H^+]$, &emsp; $\mathrm{pOH} = -\log[\mathrm{OH^-}]$, &emsp; $\mathrm{pH} + \mathrm{pOH} = 14$ at 25 °C.</p></div>` },
    1: { html: R`
<h3 class="sub">Weak acids and Ka</h3>
<p>A weak acid HA only partly dissociates: $K_a = \dfrac{[\mathrm H^+][\mathrm A^-]}{[\mathrm{HA}]}$, with $\mathrm pK_a = -\log K_a$. Smaller $\mathrm pK_a$ means a stronger acid. For a solution of concentration $c$, assuming little dissociation:</p>
<div class="key"><p>$[\mathrm H^+] \approx \sqrt{K_a c}$, &emsp; $\mathrm{pH} \approx \tfrac12(\mathrm pK_a - \log c)$.</p></div>
<div class="worked"><p>Find the pH of 0.10 mol dm⁻³ ethanoic acid ($K_a = 1.8\times10^{-5}$) and its percentage dissociation.</p>
<p>$[\mathrm H^+] = \sqrt{1.8\times10^{-6}} = 1.34\times10^{-3}$; pH 2.87. Dissociation $1.34\times10^{-3}/0.10 = 1.3\%$: the approximation is fine. Diluting tenfold raises the percentage dissociation (to about 4%) but the pH only rises by half a unit.</p></div>
<p>Weak bases work the same way with $K_b$, and for a conjugate pair $K_aK_b = K_w$. Strong acids (HCl, HNO<sub>3</sub>, H<sub>2</sub>SO<sub>4</sub> first proton) are fully dissociated: 0.010 mol dm⁻³ HCl has pH 2.</p>` },
    2: { html: R`
<h3 class="sub">How buffers work, and their limits</h3>
<p>A buffer contains a weak acid and its conjugate base in comparable amounts. Added H⁺ is mopped up by A⁻; added OH⁻ is neutralised by HA. The pH follows the <strong>Henderson–Hasselbalch equation</strong>:</p>
<div class="key"><p>$\mathrm{pH} = \mathrm pK_a + \log_{10}\dfrac{[\mathrm A^-]}{[\mathrm{HA}]}$</p></div>
<div class="worked"><p>A buffer is 0.10 mol each of ethanoic acid and sodium ethanoate in 1.0 dm³ (pK<sub>a</sub> 4.76). Find the pH before and after adding 0.010 mol HCl.</p>
<p>Before: ratio 1, pH 4.76. After: A⁻ falls to 0.090, HA rises to 0.110; pH $= 4.76 + \log(0.090/0.110) = 4.67$. The same acid in 1 dm³ of pure water would drop the pH from 7 to 2.</p></div>
<p>A buffer works best within about one pH unit of its pK<sub>a</sub>, and its <strong>capacity</strong> grows with the concentrations. Blood is buffered at pH 7.4 by carbonic acid/hydrogencarbonate (with the lungs adjusting CO<sub>2</sub>), and by phosphates and proteins; a shift of 0.4 units is life-threatening.</p>` },
    3: { html: R`
<h3 class="sub">Acids that give more than one proton</h3>
<p>Polyprotic acids lose protons one at a time, each step weaker than the last because removing a positive proton from an increasingly negative ion is harder: for phosphoric acid, pK<sub>a</sub> values are 2.1, 7.2 and 12.4. The pH of a solution of the acid is usually set by the first step alone.</p>
<h3 class="sub">Salts are acids and bases too</h3>
<p>The ions of a salt can react with water (<strong>hydrolysis</strong>):</p>
<ul><li>Strong acid + strong base (NaCl): neutral.</li><li>Weak acid + strong base (sodium ethanoate): basic, because ethanoate takes protons from water.</li><li>Strong acid + weak base (NH<sub>4</sub>Cl): acidic, because NH<sub>4</sub>⁺ donates protons.</li><li>Small, highly charged metal ions (Al³⁺, Fe³⁺) are acidic: they polarise their bound water molecules, which then release H⁺. A solution of FeCl<sub>3</sub> has pH about 2.</li></ul>
<div class="worked"><p>Find the pH of 0.10 mol dm⁻³ sodium ethanoate ($K_a$ of ethanoic acid $1.8\times10^{-5}$).</p>
<p>$K_b = K_w/K_a = 5.6\times10^{-10}$. $[\mathrm{OH^-}] = \sqrt{K_bc} = 7.5\times10^{-6}$, pOH 5.13, pH 8.87.</p></div>` }
  });

  X('chem-titration', {
    0: { html: R`
<h3 class="sub">Reading a titration curve</h3>
<p>Plotting pH against volume of base added gives an S-shaped curve. Key points for a weak acid titrated with a strong base:</p>
<ul><li><strong>Start</strong>: pH of the weak acid alone.</li>
<li><strong>Buffer region</strong>: a gentle slope while HA and A⁻ coexist.</li>
<li><strong>Half-equivalence point</strong>: exactly half the acid is neutralised, [HA] = [A⁻], so <strong>pH = pK<sub>a</sub></strong>. This is how pK<sub>a</sub> values are measured.</li>
<li><strong>Equivalence point</strong>: moles of base = moles of acid; the solution is the salt, slightly basic (pH about 8.7 for ethanoic acid).</li>
<li>After equivalence, excess OH⁻ sets the pH.</li></ul>
<div class="worked"><p>25.0 cm³ of 0.100 mol dm⁻³ ethanoic acid is titrated with 0.100 mol dm⁻³ NaOH. What is the pH after 10.0 cm³ and after 25.0 cm³?</p>
<p>After 10.0 cm³: 1.00 mmol A⁻ and 1.50 mmol HA; pH $= 4.76 + \log(1.00/1.50) = 4.58$.</p>
<p>At 25.0 cm³: 2.50 mmol A⁻ in 50.0 cm³ (0.050 mol dm⁻³). $[\mathrm{OH^-}] = \sqrt{5.6\times10^{-10}\cdot0.050} = 5.3\times10^{-6}$, pH 8.72.</p></div>
<p>A strong acid–strong base curve has a much longer vertical section (pH 3 to 11) centred on 7; a weak acid–weak base curve has almost no sharp jump, so such titrations are avoided.</p>` },
    1: { html: R`
<h3 class="sub">Choosing an indicator</h3>
<p>An indicator is itself a weak acid HIn whose two forms have different colours. It changes colour over about pK<sub>In</sub> ± 1. Choose one whose range lies inside the steep part of the curve:</p>
<div class="table-wrap"><table class="data"><tr><th>Indicator</th><th>Range</th><th>Colours</th><th>Good for</th></tr>
<tr><td>Methyl orange</td><td>3.1–4.4</td><td>red → yellow</td><td>strong acid + weak base</td></tr>
<tr><td>Bromothymol blue</td><td>6.0–7.6</td><td>yellow → blue</td><td>strong acid + strong base</td></tr>
<tr><td>Phenolphthalein</td><td>8.3–10.0</td><td>colourless → pink</td><td>weak acid + strong base</td></tr></table></div>
<p>Use only a few drops: the indicator also consumes titrant. For a strong acid–strong base titration, both methyl orange and phenolphthalein work because the jump spans both ranges.</p>
<p>A <strong>pH meter</strong> avoids the choice altogether and gives the whole curve; the equivalence point is where the slope is steepest (the maximum of the first derivative).</p>` },
    2: { html: R`
<h3 class="sub">Solubility product</h3>
<p>For a sparingly soluble salt in equilibrium with its ions, e.g. AgCl(s) ⇌ Ag⁺ + Cl⁻, the <strong>solubility product</strong> is $K_{sp} = [\mathrm{Ag^+}][\mathrm{Cl^-}] = 1.8\times10^{-10}$. If the molar solubility is $s$:</p>
<ul><li>AB type (AgCl): $K_{sp} = s^2$.</li><li>AB<sub>2</sub> type (PbI<sub>2</sub>, CaF<sub>2</sub>): $K_{sp} = s(2s)^2 = 4s^3$.</li><li>A<sub>3</sub>B<sub>2</sub> type (Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>): $K_{sp} = (3s)^3(2s)^2 = 108s^5$.</li></ul>
<div class="worked"><p>$K_{sp}$ of CaF<sub>2</sub> is $3.9\times10^{-11}$. Find its solubility in mol dm⁻³ and in mg per dm³.</p>
<p>$4s^3 = 3.9\times10^{-11}$, $s = 2.1\times10^{-4}$ mol dm⁻³, i.e. $2.1\times10^{-4}\cdot78.1 = 0.017$ g = 17 mg per dm³.</p></div>
<div class="warn-box"><p>Compare solubilities through $s$, not $K_{sp}$, when the formulas differ: Ag<sub>2</sub>CrO<sub>4</sub> has a smaller $K_{sp}$ ($1.1\times10^{-12}$) than AgCl but is <em>more</em> soluble ($s = 6.5\times10^{-5}$ vs $1.3\times10^{-5}$).</p></div>` },
    3: { html: R`
<h3 class="sub">The common-ion effect and precipitation</h3>
<p>Adding an ion already in the equilibrium pushes it back (Le Chatelier), lowering the solubility. AgCl's solubility in 0.10 mol dm⁻³ NaCl is $K_{sp}/0.10 = 1.8\times10^{-9}$ mol dm⁻³, about 7000 times less than in pure water.</p>
<p>A precipitate forms when the <strong>ion product</strong> $Q$ exceeds $K_{sp}$. Mixing 10 cm³ of $10^{-3}$ mol dm⁻³ Pb(NO<sub>3</sub>)<sub>2</sub> with 10 cm³ of $10^{-3}$ mol dm⁻³ KI gives [Pb²⁺] = [I⁻] = $5\times10^{-4}$ after mixing, $Q = (5\times10^{-4})^3 = 1.25\times10^{-10}$, below $K_{sp}$ of PbI<sub>2</sub> ($9.8\times10^{-9}$): no precipitate.</p>
<h3 class="sub">Selective precipitation</h3>
<p>Adding a precipitating ion slowly separates metals by solubility. In a <strong>Mohr titration</strong> for chloride, silver nitrate first precipitates white AgCl; only when chloride is used up does red-brown Ag<sub>2</sub>CrO<sub>4</sub> form, signalling the end point. Solubility also depends on pH when the anion is basic: metal hydroxides, carbonates and phosphates dissolve in acid, which is why acid rain etches marble and acidic drinks erode tooth enamel (hydroxyapatite).</p>` }
  });

  X('chem-kinetics', {
    0: { html: R`
<h3 class="sub">Finding a rate law from data</h3>
<p>The rate law, rate $= k[\mathrm A]^m[\mathrm B]^n$, must be found by experiment: the orders $m$ and $n$ need not match the coefficients in the equation. The <strong>method of initial rates</strong> varies one concentration at a time.</p>
<div class="worked"><p>For 2NO + O<sub>2</sub> → 2NO<sub>2</sub>: doubling [NO] (with O<sub>2</sub> fixed) quadruples the initial rate; doubling [O<sub>2</sub>] doubles it. Find the rate law and the units of $k$.</p>
<p>Second order in NO ($2^2 = 4$), first order in O<sub>2</sub>: rate $= k[\mathrm{NO}]^2[\mathrm O_2]$, overall third order. Units: (mol dm⁻³ s⁻¹)/(mol dm⁻³)³ = dm⁶ mol⁻² s⁻¹.</p></div>
<p>Zero order means the rate does not depend on that concentration (often because a catalyst surface or enzyme is saturated). Rates are measured by following a property that changes during the reaction: colour (colorimetry), volume of gas, mass lost, pH, or by stopping samples ("quenching") and titrating them.</p>` },
    1: { html: R`
<h3 class="sub">Integrated rate laws and half-lives</h3>
<div class="table-wrap"><table class="data"><tr><th>Order</th><th>Integrated law</th><th>Straight-line plot</th><th>Half-life</th></tr>
<tr><td>0</td><td>$[\mathrm A] = [\mathrm A]_0 - kt$</td><td>[A] vs $t$</td><td>$[\mathrm A]_0/2k$</td></tr>
<tr><td>1</td><td>$\ln[\mathrm A] = \ln[\mathrm A]_0 - kt$</td><td>ln[A] vs $t$</td><td>$\ln2/k$ (constant)</td></tr>
<tr><td>2</td><td>$\dfrac1{[\mathrm A]} = \dfrac{1}{[\mathrm A]_0} + kt$</td><td>1/[A] vs $t$</td><td>$1/(k[\mathrm A]_0)$</td></tr></table></div>
<p>To find the order from a concentration–time series, see which plot is straight. A constant half-life is the fingerprint of first order: radioactive decay and many drug eliminations behave this way.</p>
<div class="worked"><p>A drug is eliminated by first-order kinetics with a half-life of 6.0 h. What fraction remains after 24 h, and how long until 10% remains?</p>
<p>24 h is four half-lives: $(\tfrac12)^4 = 6.25\%$. For 10%: $t = \dfrac{\ln10}{\ln2}\cdot6.0 = 19.9$ h.</p></div>
<p>When one reactant is in large excess its concentration hardly changes, so a second-order reaction behaves as first order in the other (<strong>pseudo-first-order</strong>), a common experimental trick.</p>` },
    2: { html: R`
<h3 class="sub">Why temperature matters so much</h3>
<p>Molecules react only when they collide with at least the activation energy $E_a$ (and in the right orientation). The fraction with enough energy follows the Boltzmann factor $e^{-E_a/RT}$, which grows rapidly with temperature: hence the <strong>Arrhenius equation</strong></p>
<div class="key"><p>$k = Ae^{-E_a/RT}$, &emsp; $\ln k = \ln A - \dfrac{E_a}{R}\cdot\dfrac1T$, &emsp; $\ln\dfrac{k_2}{k_1} = \dfrac{E_a}{R}\left(\dfrac1{T_1} - \dfrac1{T_2}\right)$</p></div>
<p>A plot of $\ln k$ against $1/T$ is a straight line of slope $-E_a/R$.</p>
<div class="worked"><p>A reaction's rate doubles between 25 °C and 35 °C. What is its activation energy?</p>
<p>$\ln2 = \dfrac{E_a}{8.314}\left(\dfrac1{298} - \dfrac1{308}\right)$, so $E_a = \dfrac{0.693\cdot8.314}{1.09\times10^{-4}} = 53$ kJ mol⁻¹. The "rate doubles every 10 °C" rule of thumb corresponds to activation energies around 50 kJ mol⁻¹.</p></div>
<p>The Maxwell–Boltzmann distribution shows the effect: heating shifts the curve to the right and flattens it, and the area beyond $E_a$ (the reacting fraction) grows far more than the average energy does.</p>` },
    3: { html: R`
<h3 class="sub">Mechanisms and the rate-determining step</h3>
<p>Most reactions happen in a series of <strong>elementary steps</strong>. For an elementary step the rate law <em>does</em> follow its molecularity. The slowest step, the <strong>rate-determining step</strong>, controls the overall rate, and the rate law tells you which species take part in it (and before it).</p>
<div class="worked"><p>NO<sub>2</sub> + CO → NO + CO<sub>2</sub> has rate $= k[\mathrm{NO_2}]^2$ below 500 K. Propose a mechanism.</p>
<p>Step 1 (slow): 2NO<sub>2</sub> → NO<sub>3</sub> + NO. Step 2 (fast): NO<sub>3</sub> + CO → NO<sub>2</sub> + CO<sub>2</sub>. The steps add up to the overall equation, NO<sub>3</sub> is an intermediate, and the slow step involves two NO<sub>2</sub> and no CO, matching the rate law.</p></div>
<h3 class="sub">How catalysts work</h3>
<p>A catalyst provides a different route with lower activation energy and is regenerated at the end. <strong>Heterogeneous</strong> catalysts (a different phase, usually a solid surface) adsorb reactants, weaken their bonds and release products: iron in the Haber process, platinum and rhodium in car exhausts. <strong>Homogeneous</strong> catalysts are in the same phase, often transition-metal ions that change oxidation state. <strong>Enzymes</strong> are protein catalysts that can speed reactions by factors of $10^{17}$. Catalyst poisons (lead in old car fuel) block the active surface.</p>` }
  });

  X('chem-electro', {
    0: { html: R`
<h3 class="sub">Oxidation states and balancing half-equations</h3>
<p>Rules for oxidation states: elements are 0; in a compound, F is −1, O is −2 (except in peroxides, −1), H is +1 (except in metal hydrides, −1); the states add up to the charge. <strong>Oxidation</strong> is an increase in oxidation state (loss of electrons), <strong>reduction</strong> a decrease (gain): OIL RIG.</p>
<p>To balance a redox reaction in acid, write two half-equations and for each: balance the main atoms, then O with H<sub>2</sub>O, then H with H⁺, then charge with electrons. Multiply so the electrons cancel, and add.</p>
<div class="worked"><p>Balance the reaction of manganate(VII) with iron(II) in acid.</p>
<p>MnO<sub>4</sub>⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H<sub>2</sub>O and Fe²⁺ → Fe³⁺ + e⁻ (×5). Sum: MnO<sub>4</sub>⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H<sub>2</sub>O. Check charges: $-1 + 8 + 10 = 17$ on the left, $2 + 15 = 17$ on the right ✓.</p></div>
<p>The <strong>oxidising agent</strong> is the species reduced (MnO<sub>4</sub>⁻) and the <strong>reducing agent</strong> is oxidised (Fe²⁺). In basic solution balance as in acid, then add OH⁻ to both sides to cancel H⁺.</p>` },
    1: { html: R`
<h3 class="sub">Electrode potentials and predicting reactions</h3>
<p>Standard electrode potentials $E^\circ$ are measured against the standard hydrogen electrode (0 V) at 1 mol dm⁻³, 100 kPa and 298 K, written as reductions. More positive $E^\circ$ means a stronger oxidising agent (F<sub>2</sub> +2.87 V); more negative means the reduced form is a stronger reducing agent (Li −3.04 V).</p>
<div class="key"><p>$E^\circ_{\text{cell}} = E^\circ_{\text{reduction (cathode)}} - E^\circ_{\text{reduction (anode)}}$; a reaction is feasible when $E^\circ_{\text{cell}} > 0$, and $\Delta G^\circ = -nFE^\circ$.</p></div>
<div class="worked"><p>A Daniell cell uses Zn²⁺/Zn ($-0.76$ V) and Cu²⁺/Cu ($+0.34$ V). Find the cell voltage and $\Delta G^\circ$.</p>
<p>Copper is reduced (cathode, positive), zinc oxidised (anode, negative): $E^\circ = 0.34 - (-0.76) = 1.10$ V. $\Delta G^\circ = -2\cdot96\,485\cdot1.10 = -212$ kJ mol⁻¹.</p></div>
<p>Cell notation lists the anode on the left: Zn | Zn²⁺ ‖ Cu²⁺ | Cu, with ‖ for the salt bridge, which lets ions flow to keep both solutions neutral. Feasibility predicted by $E^\circ$ says nothing about rate: some feasible reactions are too slow to observe.</p>` },
    2: { html: R`
<h3 class="sub">Concentration changes the voltage</h3>
<div class="key"><p>Nernst: $E = E^\circ - \dfrac{RT}{nF}\ln Q = E^\circ - \dfrac{0.0592}{n}\log_{10}Q$ at 25 °C.</p></div>
<div class="worked"><p>Find the voltage of a Daniell cell with [Zn²⁺] = 1.0 and [Cu²⁺] = 0.010 mol dm⁻³.</p>
<p>$Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}] = 100$: $E = 1.10 - \tfrac{0.0592}{2}\cdot2 = 1.04$ V.</p></div>
<p>A <strong>concentration cell</strong> has the same electrodes in different concentrations; its voltage comes entirely from the Nernst term. That is how a pH electrode works (about 59 mV per pH unit) and how nerve cells produce their resting potential (see the Nernst equation in Membranes and Transport). At equilibrium $E = 0$, so $E^\circ = \dfrac{RT}{nF}\ln K$: a 1.10 V cell corresponds to $K \approx 10^{37}$, which is why copper ions are completely displaced by zinc.</p>` },
    3: { html: R`
<h3 class="sub">Electrolysis by the numbers</h3>
<p>In electrolysis an external supply forces a non-spontaneous reaction. Faraday's laws: the amount of product is proportional to the charge passed, $n_{e^-} = \dfrac{It}{F}$, with $F = 96\,485$ C mol⁻¹.</p>
<div class="worked"><p>A current of 2.00 A flows through copper sulfate solution for 30.0 min. What mass of copper is deposited?</p>
<p>$Q = 2.00\cdot1800 = 3600$ C, $n_{e^-} = 0.0373$ mol, Cu²⁺ needs 2 electrons: 0.01865 mol Cu = 1.19 g.</p></div>
<p>In aqueous solutions water competes: at the cathode, hydrogen forms instead of reactive metals (Na, K, Ca, Al); at the anode, oxygen forms unless a halide is concentrated. That is why brine electrolysis gives H<sub>2</sub>, Cl<sub>2</sub> and NaOH, and why aluminium must be made from molten alumina.</p>
<h3 class="sub">Batteries, fuel cells and corrosion</h3>
<p>A lithium-ion battery shuttles Li⁺ ions between a graphite anode and a metal-oxide cathode; charging reverses the reaction. A hydrogen fuel cell combines H<sub>2</sub> and O<sub>2</sub> at 1.23 V with water as the only product. <strong>Rusting</strong> is an electrochemical cell on the iron surface: iron is oxidised where the water drop is thin on oxygen, and oxygen reduced at the edge. It is prevented by barriers (paint, oil), by <strong>sacrificial protection</strong> (zinc on galvanised steel, magnesium blocks on ship hulls corrode instead) or by an impressed current.</p>` }
  });

  X('chem-maingroup', {
    0: { html: R`
<h3 class="sub">Patterns in the s-block</h3>
<p>Group 1 and 2 metals lose their outer electrons easily, and more easily further down, so reactivity increases down each group. With water, lithium fizzes, sodium melts into a ball, potassium bursts into lilac flame, and caesium explodes. Group 2 metals react more slowly: magnesium barely reacts with cold water but burns in steam to MgO and H<sub>2</sub>.</p>
<p>Trends in group 2 compounds are tested often: hydroxides become <em>more</em> soluble down the group (Mg(OH)<sub>2</sub> is milk of magnesia, barely soluble; Ba(OH)<sub>2</sub> dissolves well), while sulfates become <em>less</em> soluble (BaSO<sub>4</sub> is so insoluble it is swallowed safely for X-rays, and its white precipitate is the test for sulfate ions).</p>
<div class="worked"><p>Write equations for calcium with water and for the test for carbon dioxide.</p>
<p>Ca + 2H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub>. Limewater: Ca(OH)<sub>2</sub> + CO<sub>2</sub> → CaCO<sub>3</sub>↓ + H<sub>2</sub>O, the milky precipitate.</p></div>
<p>The Hydrogen and s-Block chapter goes deeper into thermal stability and anomalies.</p>` },
    1: { html: R`
<h3 class="sub">Period 3: from ionic to covalent</h3>
<div class="table-wrap"><table class="data"><tr><th></th><th>Na</th><th>Mg</th><th>Al</th><th>Si</th><th>P</th><th>S</th></tr>
<tr><td>Oxide</td><td>Na<sub>2</sub>O</td><td>MgO</td><td>Al<sub>2</sub>O<sub>3</sub></td><td>SiO<sub>2</sub></td><td>P<sub>4</sub>O<sub>10</sub></td><td>SO<sub>2</sub>, SO<sub>3</sub></td></tr>
<tr><td>Structure</td><td colspan="3">giant ionic</td><td>giant covalent</td><td colspan="2">simple molecular</td></tr>
<tr><td>With water</td><td>NaOH, pH 14</td><td>Mg(OH)<sub>2</sub>, pH 9</td><td>insoluble</td><td>insoluble</td><td>H<sub>3</sub>PO<sub>4</sub>, pH 1</td><td>H<sub>2</sub>SO<sub>3</sub>/H<sub>2</sub>SO<sub>4</sub>, pH 1</td></tr>
<tr><td>Nature</td><td colspan="2">basic</td><td>amphoteric</td><td colspan="3">acidic</td></tr></table></div>
<p>Aluminium oxide is <strong>amphoteric</strong>: it dissolves in acid (to Al³⁺) and in alkali (to [Al(OH)<sub>4</sub>]⁻). Silicon dioxide is acidic but does not dissolve in water; it reacts with hot concentrated NaOH, and with the basic oxide CaO in a blast furnace to make slag.</p>
<p>The chlorides follow the same pattern: NaCl and MgCl<sub>2</sub> dissolve to give near-neutral solutions; AlCl<sub>3</sub>, SiCl<sub>4</sub> and PCl<sub>5</sub> are covalent and hydrolyse violently in water, releasing HCl fumes (SiCl<sub>4</sub> + 2H<sub>2</sub>O → SiO<sub>2</sub> + 4HCl).</p>` },
    2: { html: R`
<h3 class="sub">Halogen chemistry in practice</h3>
<p>Down group 17 the halogens become less reactive oxidising agents: chlorine displaces bromine and iodine from their salts, bromine displaces only iodine. Halide ions become stronger reducing agents down the group, which shows in their reactions with concentrated sulfuric acid: chloride gives only HCl; bromide is oxidised to Br<sub>2</sub> (with SO<sub>2</sub>); iodide to I<sub>2</sub> (with S and H<sub>2</sub>S, smelling of bad eggs).</p>
<div class="worked"><p>How do you identify Cl⁻, Br⁻ and I⁻ in solution?</p>
<p>Acidify with nitric acid, add silver nitrate: AgCl is white, AgBr cream, AgI yellow. Confirm with ammonia: AgCl dissolves in dilute ammonia, AgBr only in concentrated, AgI not at all.</p></div>
<p>Chlorine purifies water: Cl<sub>2</sub> + H<sub>2</sub>O ⇌ HCl + HClO, and chloric(I) acid kills bacteria. In cold dilute alkali chlorine gives bleach, NaClO; in hot alkali it disproportionates to chlorate(V). The noble gases were thought inert until 1962, when xenon was found to form compounds with fluorine and oxygen.</p>` },
    3: { html: R`
<h3 class="sub">Choosing an extraction method</h3>
<p>How a metal is extracted depends on its reactivity and the cost of energy:</p>
<ul><li><strong>Unreactive metals</strong> (gold, platinum) occur native.</li>
<li><strong>Middle metals</strong> (iron, zinc, lead, copper) are reduced from their oxides by carbon or carbon monoxide in a furnace. Sulfide ores are roasted to oxides first, producing SO<sub>2</sub>, which is captured to make sulfuric acid.</li>
<li><strong>Reactive metals</strong> (aluminium, sodium, magnesium) are extracted by electrolysis of molten compounds, which needs a great deal of electricity.</li>
<li>Titanium is reduced from TiCl<sub>4</sub> by sodium or magnesium (the Kroll process), because carbon would form brittle titanium carbide.</li></ul>
<div class="worked"><p>How much aluminium can 1 kWh of electricity make if the cell runs at 4.5 V and 95% current efficiency?</p>
<p>Charge $= 3.6\times10^6/4.5 = 8.0\times10^5$ C; useful $7.6\times10^5$ C $= 7.9$ mol e⁻; Al needs 3 per atom: 2.6 mol = 71 g. So about 14 kWh per kilogram, which is why aluminium smelters are built next to hydroelectric dams and why recycling saves 95% of the energy.</p></div>
<p>In the blast furnace the reactions are: C + O<sub>2</sub> → CO<sub>2</sub>; CO<sub>2</sub> + C → 2CO; Fe<sub>2</sub>O<sub>3</sub> + 3CO → 2Fe + 3CO<sub>2</sub>; and limestone removes sand as slag, CaO + SiO<sub>2</sub> → CaSiO<sub>3</sub>.</p>` }
  });

  X('chem-transition', {
    0: { html: R`
<h3 class="sub">What makes the d-block special</h3>
<p>A <strong>transition element</strong> forms at least one stable ion with a partly filled d subshell (so zinc and scandium are d-block elements but not transition metals). Their characteristic properties all come from the d electrons:</p>
<ul><li><strong>Variable oxidation states</strong>: the 4s and 3d electrons are close in energy, so different numbers can be lost. Manganese ranges from +2 (Mn²⁺, pale pink) to +7 (MnO<sub>4</sub>⁻, purple).</li>
<li><strong>Coloured compounds</strong>, from d–d transitions (below).</li>
<li><strong>Complex ions</strong>, formed with ligands.</li>
<li><strong>Catalytic activity</strong>: changing oxidation state readily (Fe²⁺/Fe³⁺ catalysing the reaction of iodide with peroxodisulfate) or providing a surface (Ni in hydrogenating vegetable oils, V<sub>2</sub>O<sub>5</sub> in the contact process).</li></ul>
<p>Across the series the atoms change little in size (the added electrons go into an inner shell), so transition metals form alloys easily and are dense, hard and high-melting.</p>` },
    1: { html: R`
<h3 class="sub">Complexes, coordination number and shape</h3>
<p>A <strong>complex</strong> is a central metal ion surrounded by <strong>ligands</strong> that donate lone pairs (dative bonds). The number of bonds is the <strong>coordination number</strong>: 6 usually gives an octahedron ([Fe(H<sub>2</sub>O)<sub>6</sub>]³⁺), 4 a tetrahedron ([CuCl<sub>4</sub>]²⁻) or a square plane ([Pt(NH<sub>3</sub>)<sub>2</sub>Cl<sub>2</sub>]), 2 a straight line ([Ag(NH<sub>3</sub>)<sub>2</sub>]⁺, Tollens' reagent).</p>
<p>Ligands can be <strong>monodentate</strong> (H<sub>2</sub>O, NH<sub>3</sub>, Cl⁻, CN⁻), <strong>bidentate</strong> (ethane-1,2-diamine, ethanedioate) or <strong>polydentate</strong> (EDTA⁴⁻ binds through six atoms).</p>
<div class="worked"><p>Copper sulfate solution is blue. Adding a little ammonia gives a pale blue precipitate; excess gives a deep blue solution; adding concentrated HCl gives a yellow-green solution. Explain.</p>
<p>[Cu(H<sub>2</sub>O)<sub>6</sub>]²⁺ is blue. A little ammonia acts as a base: Cu(OH)<sub>2</sub>(H<sub>2</sub>O)<sub>4</sub> precipitates. Excess ammonia replaces four waters: [Cu(NH<sub>3</sub>)<sub>4</sub>(H<sub>2</sub>O)<sub>2</sub>]²⁺, deep blue. Chloride, being larger, fits only four around Cu: tetrahedral [CuCl<sub>4</sub>]²⁻, yellow, which mixes with remaining blue to look green.</p></div>` },
    2: { html: R`
<h3 class="sub">Splitting the d orbitals</h3>
<p>In an octahedral complex the six ligands approach along the $x$, $y$ and $z$ axes. The two d orbitals that point along the axes ($e_g$: $d_{z^2}$, $d_{x^2-y^2}$) are repelled more and rise in energy; the three that point between the axes ($t_{2g}$) fall. The gap is the <strong>crystal-field splitting</strong> $\Delta_o$. In a tetrahedral complex the pattern is inverted and smaller: $\Delta_t \approx \tfrac49\Delta_o$.</p>
<p>The size of $\Delta$ depends on the ligand, following the <strong>spectrochemical series</strong>: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H<sub>2</sub>O < NH<sub>3</sub> < en < CN⁻ < CO. It also grows with the metal's charge and down the d-block (4d and 5d complexes are almost always low spin).</p>
<div class="worked"><p>Find the crystal-field stabilisation energy of high-spin d⁵ and of low-spin d⁶.</p>
<p>Each $t_{2g}$ electron counts $-0.4\Delta_o$ and each $e_g$ electron $+0.6\Delta_o$. High-spin d⁵ ($t_{2g}^3e_g^2$): $-1.2 + 1.2 = 0$. Low-spin d⁶ ($t_{2g}^6$): $-2.4\Delta_o$ (minus the pairing energy), which is why low-spin Co³⁺ complexes are so stable and inert.</p></div>` },
    3: { html: R`
<h3 class="sub">Colour and magnetism from the same diagram</h3>
<p>A complex absorbs light of energy $\Delta$, promoting an electron from $t_{2g}$ to $e_g$, and we see the <strong>complementary colour</strong>. [Ti(H<sub>2</sub>O)<sub>6</sub>]³⁺ (d¹) absorbs green-yellow at about 500 nm and looks purple; the absorbed wavelength gives $\Delta_o = hc/\lambda \approx 240$ kJ mol⁻¹. Changing ligand shifts the colour: aqueous Co²⁺ is pink, its chloride complex blue (the basis of humidity indicators).</p>
<p>No colour arises from d⁰ (Sc³⁺, Ti⁴⁺) or d¹⁰ (Zn²⁺, Cu⁺) ions: there is no possible d–d jump. (Intense colours like permanganate's come from charge transfer between ligand and metal instead.)</p>
<p><strong>High spin or low spin?</strong> For d⁴–d⁷ in octahedral complexes, electrons either pair up in $t_{2g}$ (if $\Delta_o$ exceeds the pairing energy, with strong-field ligands) or spread into $e_g$ (weak field). The number of unpaired electrons $n$ shows in the magnetic moment $\mu \approx \sqrt{n(n + 2)}$ Bohr magnetons.</p>
<div class="worked"><p>[Fe(H<sub>2</sub>O)<sub>6</sub>]²⁺ has $\mu = 4.9\ \mu_B$ and [Fe(CN)<sub>6</sub>]⁴⁻ is diamagnetic. Explain.</p>
<p>Both are d⁶. With water (weak field) the complex is high spin, $t_{2g}^4e_g^2$, 4 unpaired: $\sqrt{24} = 4.9$ ✓. Cyanide (strong field) gives low spin $t_{2g}^6$: no unpaired electrons.</p></div>` }
  });

  X('chem-organic', {
    0: { html: R`
<h3 class="sub">Why carbon makes millions of compounds</h3>
<p>Carbon forms four strong bonds, bonds strongly to itself (chains, rings, branches), and makes stable single, double and triple bonds. A <strong>functional group</strong> is the reactive part of a molecule; compounds with the same group form a <strong>homologous series</strong> with similar reactions and steadily changing physical properties (each CH<sub>2</sub> added raises the boiling point by roughly 20–30 °C).</p>
<div class="table-wrap"><table class="data"><tr><th>Group</th><th>Structure</th><th>Suffix / prefix</th><th>Example</th></tr>
<tr><td>Alkene</td><td>C=C</td><td>-ene</td><td>propene</td></tr><tr><td>Haloalkane</td><td>C–X</td><td>chloro-, bromo-</td><td>bromoethane</td></tr>
<tr><td>Alcohol</td><td>–OH</td><td>-ol</td><td>ethanol</td></tr><tr><td>Aldehyde</td><td>–CHO</td><td>-al</td><td>ethanal</td></tr>
<tr><td>Ketone</td><td>C–CO–C</td><td>-one</td><td>propanone</td></tr><tr><td>Carboxylic acid</td><td>–COOH</td><td>-oic acid</td><td>ethanoic acid</td></tr>
<tr><td>Ester</td><td>–COO–</td><td>-yl -oate</td><td>ethyl ethanoate</td></tr><tr><td>Amine</td><td>–NH<sub>2</sub></td><td>-amine</td><td>methylamine</td></tr>
<tr><td>Amide</td><td>–CONH<sub>2</sub></td><td>-amide</td><td>ethanamide</td></tr><tr><td>Nitrile</td><td>–C≡N</td><td>-nitrile</td><td>propanenitrile</td></tr></table></div>
<p>Alcohols are <strong>primary</strong>, <strong>secondary</strong> or <strong>tertiary</strong> depending on how many carbons are attached to the C–OH carbon; this decides how they oxidise (primary → aldehyde → acid; secondary → ketone; tertiary resist).</p>` },
    1: { html: R`
<h3 class="sub">Naming step by step</h3>
<ol><li>Find the longest carbon chain containing the main functional group: meth, eth, prop, but, pent, hex, hept, oct.</li>
<li>Number it so the main group gets the lowest number (then double bonds, then substituents).</li>
<li>Name substituents (methyl, ethyl, chloro, …) with their positions, in alphabetical order, using di-, tri- for repeats.</li>
<li>The highest-priority group sets the suffix: acid > ester > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene; lower ones become prefixes (hydroxy-, oxo-, amino-).</li></ol>
<div class="worked"><p>Name CH<sub>3</sub>CH(CH<sub>3</sub>)CH<sub>2</sub>CH(OH)CH<sub>3</sub> and CH<sub>3</sub>CH(Cl)CH<sub>2</sub>COOH.</p>
<p>First: five-carbon chain, OH at C2 when numbered from the right, methyl at C4: 4-methylpentan-2-ol.</p>
<p>Second: the acid carbon is C1; chlorine on C3: 3-chlorobutanoic acid.</p></div>
<p>Skeletal formulas show only the carbon skeleton as zigzag lines, with carbon at each corner and end and hydrogens on carbon left out; heteroatoms (O, N, halogens) and their hydrogens are drawn. They are the professional's shorthand.</p>` },
    2: { html: R`
<h3 class="sub">Stereoisomerism in detail</h3>
<p><strong>E/Z isomers</strong> arise around a C=C bond when each carbon carries two different groups. Rank the two groups on each carbon by the <strong>Cahn–Ingold–Prelog</strong> rules (higher atomic number first; if tied, look at the next atoms). If the two higher-priority groups are on the same side it is <em>Z</em> (zusammen), opposite sides <em>E</em> (entgegen).</p>
<p><strong>Optical isomers</strong> arise when a carbon has four different groups: a <strong>chiral centre</strong>. The two mirror-image forms (<strong>enantiomers</strong>) cannot be superimposed, like left and right hands. They have identical physical properties except that they rotate plane-polarised light in opposite directions, and they can behave very differently in the body, where enzymes are themselves chiral. A 50 : 50 mixture (<strong>racemate</strong>) does not rotate light.</p>
<div class="worked"><p>How many stereoisomers does 2,3-dibromobutane have?</p>
<p>Two chiral centres could give $2^2 = 4$, but one form has an internal mirror plane (the <strong>meso</strong> form) and is identical to its mirror image. So there are 3: a pair of enantiomers and the meso compound.</p></div>
<p>Thalidomide is the tragic example: one enantiomer is a sedative, the other caused birth defects, and the body interconverts them.</p>` },
    3: { html: R`
<h3 class="sub">Predicting physical properties</h3>
<p>Intermolecular forces (from Shapes and Intermolecular Forces) explain the trends:</p>
<ul><li>Boiling points rise with chain length (more London forces) and fall with branching (less contact).</li>
<li>Alcohols boil far higher than alkanes of similar mass (ethanol 78 °C, propane −42 °C) because of hydrogen bonding; carboxylic acids higher still, because they form hydrogen-bonded dimers.</li>
<li>Small alcohols, acids and amines dissolve in water (they hydrogen bond with it); solubility falls as the hydrocarbon part grows: methanol to propanol mix completely, but hexanol barely dissolves.</li>
<li>Aldehydes and ketones are polar but cannot hydrogen bond with each other, so they boil between alkanes and alcohols.</li></ul>
<div class="worked"><p>Put in order of boiling point: butane, propan-1-ol, propanal, ethanoic acid (similar molar masses 58–60).</p>
<p>Butane ($-1$ °C, London only) < propanal (49 °C, dipole) < propan-1-ol (97 °C, H-bonding) < ethanoic acid (118 °C, H-bonded dimers).</p></div>` }
  });

  X('chem-mechanisms', {
    0: { html: R`
<h3 class="sub">Reading and drawing curly arrows</h3>
<p>A curly arrow shows the movement of an <em>electron pair</em>: it starts at a lone pair or a bond and ends where a new bond forms (or on an atom that receives the pair as a lone pair). A fish-hook (half) arrow moves a single electron, used for radicals.</p>
<p><strong>Nucleophiles</strong> ("nucleus-loving") are electron-pair donors: OH⁻, CN⁻, NH<sub>3</sub>, H<sub>2</sub>O, halide ions. <strong>Electrophiles</strong> are electron-pair acceptors: H⁺, carbocations, the δ+ carbon of a polar bond, the δ+ end of a polarised Br<sub>2</sub> molecule, NO<sub>2</sub>⁺.</p>
<p>Reaction types: <strong>substitution</strong> (one group replaces another), <strong>addition</strong> (two molecules join), <strong>elimination</strong> (a small molecule is removed, forming a double bond), <strong>condensation</strong> (addition then elimination of water), and <strong>redox</strong>.</p>
<p>Bonds break in two ways: <strong>heterolytically</strong> (both electrons to one atom, giving ions, typical of polar bonds in polar solvents) or <strong>homolytically</strong> (one electron each, giving radicals, typical of non-polar bonds in light or heat).</p>` },
    1: { html: R`
<h3 class="sub">SN2 and SN1 compared</h3>
<div class="table-wrap"><table class="data"><tr><th></th><th>SN2</th><th>SN1</th></tr>
<tr><td>Steps</td><td>one: nucleophile attacks as the leaving group leaves</td><td>two: leaving group leaves to form a carbocation, then attack</td></tr>
<tr><td>Rate law</td><td>$k[\text{RX}][\text{Nu}]$</td><td>$k[\text{RX}]$</td></tr>
<tr><td>Favoured by</td><td>primary substrates, strong nucleophiles, polar aprotic solvents</td><td>tertiary substrates, weak nucleophiles, polar protic solvents</td></tr>
<tr><td>Stereochemistry</td><td>inversion (like an umbrella in the wind)</td><td>racemisation (planar carbocation attacked from either face)</td></tr></table></div>
<p>The tertiary carbocation is stabilised by the electron-donating effect of three alkyl groups (and by hyperconjugation), while three bulky groups block the backside attack that SN2 needs. That is why the mechanism switches.</p>
<div class="worked"><p>Rank the bromoalkanes by rate of hydrolysis with water, and explain the leaving-group effect.</p>
<p>By SN1 with water: 2-bromo-2-methylpropane (tertiary) ≫ 2-bromopropane > 1-bromopropane. The leaving group also matters: C–I is weakest, so iodoalkanes react fastest, then bromo, then chloro; fluoroalkanes are almost inert, which is why fluorinated compounds persist in the environment.</p></div>` },
    2: { html: R`
<h3 class="sub">Elimination versus substitution</h3>
<p>Hydroxide is both a nucleophile and a base. Attacking carbon, it substitutes; removing a proton from the carbon next to C–X, it eliminates (E2, in one step), forming an alkene. Conditions decide:</p>
<ul><li><strong>Substitution</strong>: aqueous, warm, primary haloalkanes.</li>
<li><strong>Elimination</strong>: ethanolic, hot, tertiary haloalkanes, bulky bases.</li></ul>
<p>When several alkenes can form, the more substituted (more stable) one is usually major (<strong>Zaitsev's rule</strong>): 2-bromobutane gives mainly but-2-ene (as both E and Z isomers) with some but-1-ene.</p>
<p>Alcohols also eliminate: heated with concentrated phosphoric or sulfuric acid, the protonated OH leaves as water and an alkene forms (dehydration), e.g. cyclohexanol → cyclohexene.</p>
<div class="worked"><p>What forms when 2-bromo-2-methylpropane is heated with KOH in ethanol?</p>
<p>Elimination dominates for a tertiary substrate in hot ethanolic base: 2-methylpropene, (CH<sub>3</sub>)<sub>2</sub>C=CH<sub>2</sub>, plus KBr and water.</p></div>` },
    3: { html: R`
<h3 class="sub">Electrophilic addition and Markovnikov's rule</h3>
<p>The π electrons of an alkene attack an electrophile. With HBr: the alkene attacks H, forming a carbocation, which bromide then attacks. With an unsymmetrical alkene, H adds to the carbon that already has more hydrogens, because that gives the more stable (more substituted) carbocation: <strong>Markovnikov's rule</strong>. Propene + HBr gives mainly 2-bromopropane.</p>
<p>Bromine water is decolorised by alkenes: the bromine molecule is polarised by the π cloud, and a bromonium ion forms, attacked from the opposite side. Other additions: hydrogen (Ni catalyst, making margarine), steam (acid catalyst, making ethanol), and polymerisation.</p>
<div class="worked"><p>Why does HBr with peroxides add the "wrong" way (anti-Markovnikov) to propene?</p>
<p>Peroxides start a radical chain. A bromine radical adds first, to the end carbon, to form the more stable secondary radical; then H is taken from HBr. The orientation is again set by the most stable intermediate, but now the first atom to add is Br, so the product is 1-bromopropane.</p></div>
<h3 class="sub">Radical substitution</h3>
<p>Alkanes react with chlorine in UV light by a chain reaction: <strong>initiation</strong> (Cl<sub>2</sub> → 2Cl•), <strong>propagation</strong> (Cl• + CH<sub>4</sub> → HCl + CH<sub>3</sub>•; CH<sub>3</sub>• + Cl<sub>2</sub> → CH<sub>3</sub>Cl + Cl•) and <strong>termination</strong> (two radicals combine). Because propagation regenerates radicals, one photon can cause thousands of reactions, and further substitution gives a mixture of products. The same chain chemistry, with CFCs releasing chlorine radicals, destroys stratospheric ozone.</p>` }
  });
})();
