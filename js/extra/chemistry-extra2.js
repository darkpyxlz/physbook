/* Chemistry: a third batch of problems (one concept, one core, one olympiad per chapter). Answers are computed in code. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3).replace(/^(-?[0-9.]+)e(-?[0-9]+)$/, '$1\\times10^{$2}'), X = PB.addProblems, Rg = 8.314;
  const M = (level, title, q, options, answer, hint, sol) => ({ level: level, type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: [hint], solution: '<p>' + sol + '</p>' });
  const N = (level, title, q, answer, unit, hint, sol, tol) => ({ level: level, type: 'num', title: title, q: '<p>' + q + '</p>', answer: answer, tol: tol || 0.02, unit: unit, hints: [hint], solution: '<p>' + sol + '</p>' });
  const quad = (K, c) => (-K + Math.sqrt(K * K + 4 * K * c)) / 2;

  const nAl = 10 / 26.98, nCl = 30 / 70.9, mAlCl3 = nCl * 2 / 3 * 133.34;
  X('chem-moles', [
    M('concept', 'Atoms in water', R`How many atoms are in 1 mol of water?`, ['$N_A$', '$2N_A$', '$3N_A$', '$18N_A$'], 2, R`Each H₂O molecule has three atoms.`, R`$3N_A \approx 1.81\times10^{24}$ atoms.`),
    N('core', 'From analysis to formula', R`A compound is 40.0% C, 6.7% H and 53.3% O by mass, and its molar mass is 180 g/mol. How many carbon atoms are in one molecule?`, 6, '', R`Find the empirical formula first.`, R`Moles per 100 g: C 3.33, H 6.65, O 3.33, so CH₂O (30 g/mol). $180/30 = 6$: C₆H₁₂O₆.`, 0.001),
    N('olympiad', 'Limiting reagent', R`10.0 g of aluminium reacts with 30.0 g of chlorine: 2Al + 3Cl₂ → 2AlCl₃. What mass of AlCl₃ forms?`, mAlCl3, 'g', R`Compare the mole ratio needed with the one supplied.`, R`$n(\text{Al}) = ${f(nAl)}$, $n(\text{Cl}_2) = ${f(nCl)}$. Al would need ${f(1.5 * nAl)} mol Cl₂, so chlorine limits: $n(\text{AlCl}_3) = ${f(nCl * 2 / 3)}$ mol, mass ${f(mAlCl3)} g.`)
  ]);
  const Pi = 2.5 / 760 * 101325, cP = Pi / (Rg * 298.15), Mprot = 1 / (cP * 1e-4);
  X('chem-solutions', [
    M('concept', 'Lowest freezing point', R`Which 0.10 mol/kg aqueous solution has the lowest freezing point?`, ['Glucose', 'NaCl', 'CaCl₂', 'Sucrose'], 2, R`Colligative properties depend on the number of dissolved particles.`, R`CaCl₂ gives three ions per formula unit ($i \approx 3$).`),
    N('core', 'Dilution', R`25.0 mL of 12.0 M HCl is diluted to 500 mL. What is the new concentration?`, 0.6, 'mol/L', R`$c_1V_1 = c_2V_2$.`, R`$12.0 \times 25.0/500 = 0.600$ M.`),
    N('olympiad', 'Protein by osmometry', R`1.00 g of a protein in 100 mL of solution has an osmotic pressure of 2.50 mmHg at 25 °C. Estimate its molar mass.`, Mprot, 'g/mol', R`$\Pi = cRT$; convert mmHg to Pa.`, R`$\Pi = ${f(Pi)}$ Pa, $c = ${f(cP)}$ mol/m³, $n = ${f(cP * 1e-4)}$ mol, $M \approx ${f(Mprot)}$ g/mol.`)
  ]);
  X('chem-atom', [
    M('concept', 'Impossible orbital', R`Which set of quantum numbers $(n, l, m_l)$ is impossible?`, ['(2, 1, 0)', '(3, 2, −2)', '(2, 2, 1)', '(4, 0, 0)'], 2, R`$l$ runs from 0 to $n - 1$.`, R`(2, 2, 1): for $n = 2$, $l$ can only be 0 or 1.`),
    N('core', 'Red photon', R`What is the energy (eV) of a photon of hydrogen's red line at 656.3 nm?`, 1239.84 / 656.3, 'eV', R`$E = hc/\lambda$, $hc = 1239.84$ eV nm.`, R`$E = ${f(1239.84 / 656.3)}$ eV.`),
    N('olympiad', 'Slater for potassium', R`Use Slater's rules to find the effective nuclear charge on the 4s electron of potassium (Z = 19).`, 2.2, '', R`Electrons in shell n − 1 shield 0.85 each; deeper shells shield 1.00.`, R`8 electrons in n = 3 give 6.80; 10 deeper give 10.00. $Z_{\text{eff}} = 19 - 16.8 = 2.2$.`)
  ]);
  X('chem-periodic', [
    M('concept', 'Ionisation anomaly', R`Which of these has the highest first ionisation energy?`, ['B', 'C', 'N', 'O'], 2, R`Half-filled 2p shell.`, R`N (1402 kJ/mol): oxygen's fourth p electron is paired and easier to remove.`),
    N('core', 'He⁺ ionisation', R`What is the ionisation energy of the hydrogen-like ion He⁺ in eV?`, 54.4, 'eV', R`$E = 13.6Z^2/n^2$.`, R`$13.6 \times 4 = 54.4$ eV.`),
    N('olympiad', 'Born–Haber', R`Use: ΔH<sub>f</sub>(NaCl) = −411, sublimation of Na = +107, IE₁(Na) = +496, ½ D(Cl₂) = +121, EA(Cl) = −349 (all kJ/mol). Find the magnitude of the lattice enthalpy of NaCl.`, 786, 'kJ/mol', R`Lattice formation completes the cycle from gaseous ions to the solid.`, R`$U = -411 - 107 - 496 - 121 + 349 = -786$ kJ/mol.`)
  ]);
  const muIon = 1.602e-19 * 1.275e-10 / 3.336e-30;
  X('chem-bonding', [
    M('concept', 'O₂⁺ bond order', R`What is the bond order of O₂⁺ in molecular-orbital theory?`, ['1.5', '2', '2.5', '3'], 2, R`Removing an electron from O₂ takes it out of a π* orbital.`, R`O₂ has bond order 2; removing an antibonding electron gives 2.5.`),
    N('core', 'Nitrate nitrogen', R`What is the formal charge on nitrogen in the nitrate ion?`, 1, '', R`Formal charge = valence electrons − non-bonding electrons − bonds.`, R`N has 5 valence electrons, no lone pairs and 4 bonds: $5 - 0 - 4 = +1$.`, 0.001),
    N('olympiad', 'Ionic character', R`HCl has dipole moment 1.08 D and bond length 127.5 pm. Estimate its percentage ionic character. (1 D = 3.336×10⁻³⁰ C m.)`, 108 / muIon, '%', R`Compare with the dipole of a full charge $e$ at that distance.`, R`$\mu_{\text{ionic}} = ed = ${f(muIon)}$ D, so ionic character $= 1.08/${f(muIon)} = ${f(108 / muIon)}\%$.`)
  ]);
  X('chem-shapes', [
    M('concept', 'XeF₄', R`What is the shape of XeF₄?`, ['Tetrahedral', 'Seesaw', 'Square planar', 'Square pyramidal'], 2, R`Six electron domains, two of them lone pairs.`, R`Square planar: the lone pairs sit opposite each other.`),
    N('core', 'ClF₃ lone pairs', R`How many lone pairs are on the central atom of ClF₃?`, 2, '', R`Cl has 7 valence electrons; three are used in bonds.`, R`$7 - 3 = 4$ electrons, two lone pairs (T-shaped molecule).`, 0.001),
    M('olympiad', 'Which is polar?', R`Which of these molecules is polar?`, ['PCl₅', 'SF₄', 'XeF₄', 'BF₃'], 1, R`Look for an asymmetric arrangement of electron domains.`, R`SF₄ is seesaw-shaped, so its bond dipoles do not cancel. The others are symmetric.`)
  ]);
  const rho = 101325 * 0.044 / (Rg * 298.15), Pvdw = 0.083145 * 300 / (0.5 - 0.04267) - 3.64 / 0.25;
  X('chem-gases', [
    M('concept', 'Effusion', R`Which gas effuses fastest through a pinhole at the same temperature?`, ['H₂', 'He', 'N₂', 'CO₂'], 0, R`Graham's law: rate $\propto 1/\sqrt M$.`, R`H₂ (2 g/mol), the lightest.`),
    N('core', 'CO₂ density', R`Find the density of CO₂ at 25 °C and 1.00 atm in g/L.`, rho, 'g/L', R`$\rho = PM/RT$.`, R`$\rho = ${f(rho)}$ g/L, so CO₂ settles in hollows.`),
    N('olympiad', 'Van der Waals', R`Find the pressure of 1.00 mol CO₂ in 0.500 L at 300 K using $a = 3.640$ L² bar mol⁻², $b = 0.04267$ L mol⁻¹. ($R = 0.083145$ L bar K⁻¹ mol⁻¹.)`, Pvdw, 'bar', R`$P = \dfrac{RT}{V - b} - \dfrac{a}{V^2}$.`, R`$P = ${f(0.083145 * 300 / (0.5 - 0.04267))} - ${f(3.64 / 0.25)} = ${f(Pvdw)}$ bar, against ${f(0.083145 * 600)} bar for an ideal gas.`)
  ]);
  X('chem-thermo', [
    M('concept', 'Zero formation enthalpy', R`Which has a standard enthalpy of formation of exactly zero?`, ['H₂O(l)', 'O₂(g)', 'O₃(g)', 'C(diamond)'], 1, R`Elements in their standard states.`, R`O₂(g). Ozone and diamond are not the standard states of their elements.`),
    N('core', 'Bond enthalpy estimate', R`Estimate ΔH for CH₄ + 2O₂ → CO₂ + 2H₂O(g) using C–H 413, O=O 498, C=O 805, O–H 463 kJ/mol.`, 4 * 413 + 2 * 498 - 2 * 805 - 4 * 463, 'kJ/mol', R`Bonds broken minus bonds formed.`, R`Broken: 2648; formed: 3462. $\Delta H = -814$ kJ/mol.`),
    N('olympiad', 'Kirchhoff', R`For H₂(g) + ½O₂(g) → H₂O(g), ΔH°₂₉₈ = −241.8 kJ/mol and ΔC<sub>p</sub> = −9.9 J K⁻¹ mol⁻¹. Find ΔH at 373 K.`, -241.8 - 9.9 * 75 / 1000, 'kJ/mol', R`$\Delta H(T_2) = \Delta H(T_1) + \Delta C_p(T_2 - T_1)$.`, R`$-241.8 - 9.9\times75/1000 = ${f(-241.8 - 0.7425, 5)}$ kJ/mol.`, 0.001)
  ]);
  const Tb = 1 / (1 / 373.15 - Rg * Math.log(0.7) / 40700) - 273.15;
  X('chem-gibbs', [
    M('concept', 'Hot enough', R`A reaction has ΔH > 0 and ΔS > 0. It is spontaneous…`, ['at all temperatures', 'at no temperature', 'only at high temperature', 'only at low temperature'], 2, R`$\Delta G = \Delta H - T\Delta S$.`, R`Only when $T > \Delta H/\Delta S$.`),
    N('core', 'Limestone', R`For CaCO₃ → CaO + CO₂, ΔH° = +178 kJ/mol and ΔS° = +161 J/(K mol). Above what temperature is it spontaneous?`, 178000 / 161, 'K', R`Set ΔG = 0.`, R`$T = 178\,000/161 = ${f(178000 / 161)}$ K.`),
    N('olympiad', 'Boiling on a mountain', R`Water boils at 100 °C at 1.00 atm, with ΔH<sub>vap</sub> = 40.7 kJ/mol. At what temperature does it boil at 0.70 atm?`, Tb, '°C', R`Clausius–Clapeyron: $\ln(P_2/P_1) = -\dfrac{\Delta H}{R}\left(\dfrac1{T_2} - \dfrac1{T_1}\right)$.`, R`$1/T_2 = 1/373.15 - R\ln0.7/\Delta H$, giving $T_2 = ${f(Tb + 273.15, 4)}$ K $= ${f(Tb)}$ °C.`, 0.005)
  ]);
  const KpA = 0.5 / Math.pow(0.08206 * 673.15, 2), alpha = Math.sqrt(0.15 / 4.15);
  X('chem-equilibrium', [
    M('concept', 'Inert gas', R`Argon is added to an equilibrium gas mixture at constant volume. The equilibrium…`, ['shifts to fewer moles', 'shifts to more moles', 'does not shift', 'shifts endothermic'], 2, R`Do any partial pressures change?`, R`It does not shift: the partial pressures of the reacting gases are unchanged.`),
    N('core', 'K<sub>c</sub> to K<sub>p</sub>', R`For N₂ + 3H₂ ⇌ 2NH₃, K<sub>c</sub> = 0.50 at 673 K. Find K<sub>p</sub> (pressures in atm, R = 0.08206 L atm K⁻¹ mol⁻¹).`, KpA, '', R`$K_p = K_c(RT)^{\Delta n}$ with $\Delta n = -2$.`, R`$K_p = 0.50/(${f(0.08206 * 673.15)})^2 = ${f(KpA)}$.`),
    N('olympiad', 'Degree of dissociation', R`For N₂O₄ ⇌ 2NO₂, K<sub>p</sub> = 0.15 (bar). Find the fraction α of N₂O₄ dissociated at a total pressure of 1.0 bar.`, alpha, '', R`Mole fractions: $(1 - \alpha)/(1 + \alpha)$ and $2\alpha/(1 + \alpha)$.`, R`$K_p = \dfrac{4\alpha^2}{1 - \alpha^2}P$, so $\alpha^2 = 0.15/4.15$ and $\alpha = ${f(alpha)}$.`)
  ]);
  const hA = quad(1.8e-5, 0.1), Kb = 1e-14 / Math.pow(10, -10.33), oh = quad(Kb, 0.01);
  X('chem-acids', [
    M('concept', 'Conjugate base', R`What is the conjugate base of HSO₄⁻?`, ['H₂SO₄', 'SO₄²⁻', 'SO₃²⁻', 'H₃O⁺'], 1, R`Remove one H⁺.`, R`SO₄²⁻.`),
    N('core', 'Vinegar pH', R`Find the pH of 0.10 M ethanoic acid, K<sub>a</sub> = 1.8×10⁻⁵.`, -Math.log10(hA), '', R`Solve $x^2/(0.10 - x) = K_a$.`, R`$[\text{H}^+] = ${f(hA)}$ M, pH $= ${f(-Math.log10(hA))}$.`, 0.005),
    N('olympiad', 'Washing soda', R`Find the pH of 0.010 M Na₂CO₃. For HCO₃⁻, pK<sub>a</sub> = 10.33. Ignore the second hydrolysis step.`, 14 + Math.log10(oh), '', R`CO₃²⁻ is a base with $K_b = K_w/K_{a2}$.`, R`$K_b = ${f(Kb)}$; solving $x^2/(0.010 - x) = K_b$ gives $[\text{OH}^-] = ${f(oh)}$ M, pH $= ${f(14 + Math.log10(oh))}$.`, 0.005)
  ]);
  const ohE = Math.sqrt(1e-14 / 1.8e-5 * 0.05);
  X('chem-titration', [
    M('concept', 'Choosing an indicator', R`Which indicator suits the titration of ethanoic acid with sodium hydroxide?`, ['Methyl orange', 'Phenolphthalein', 'Bromophenol blue', 'Methyl red'], 1, R`The equivalence point is above pH 7.`, R`Phenolphthalein, which changes over pH 8.3–10.`),
    N('core', 'Silver chloride', R`K<sub>sp</sub>(AgCl) = 1.8×10⁻¹⁰. What is its molar solubility in pure water?`, Math.sqrt(1.8e-10), 'mol/L', R`$K_{sp} = s^2$.`, R`$s = ${f(Math.sqrt(1.8e-10))}$ mol/L.`),
    N('olympiad', 'Equivalence pH', R`25.0 mL of 0.100 M ethanoic acid (K<sub>a</sub> = 1.8×10⁻⁵) is titrated with 0.100 M NaOH. What is the pH at the equivalence point?`, 14 + Math.log10(ohE), '', R`At equivalence you have 0.050 M ethanoate, a weak base.`, R`$K_b = 5.56\times10^{-10}$, $[\text{OH}^-] = \sqrt{K_b \times 0.050} = ${f(ohE)}$ M, pH $= ${f(14 + Math.log10(ohE))}$.`, 0.005)
  ]);
  const Ea = Rg * Math.LN2 / (1 / 300 - 1 / 310) / 1000;
  X('chem-kinetics', [
    M('concept', 'What a catalyst changes', R`A catalyst…`, ['raises the equilibrium constant', 'lowers the activation energy for both directions', 'makes ΔH more negative', 'only speeds up the forward reaction'], 1, R`It provides a new pathway.`, R`It lowers $E_a$ for both directions equally, so equilibrium is reached faster but $K$ is unchanged.`),
    N('core', 'Half-life', R`A first-order reaction has $k = 0.0231$ min⁻¹. What is its half-life?`, Math.LN2 / 0.0231, 'min', R`$t_{1/2} = \ln2/k$.`, R`$0.693/0.0231 = ${f(Math.LN2 / 0.0231)}$ min.`),
    N('olympiad', 'Doubling per ten degrees', R`A reaction's rate doubles between 300 K and 310 K. Find its activation energy.`, Ea, 'kJ/mol', R`$\ln(k_2/k_1) = \dfrac{E_a}{R}\left(\dfrac1{T_1} - \dfrac1{T_2}\right)$.`, R`$E_a = \dfrac{R\ln2}{1/300 - 1/310} = ${f(Ea)}$ kJ/mol.`)
  ]);
  X('chem-electro', [
    M('concept', 'Anode', R`In a galvanic cell, oxidation happens at…`, ['the cathode', 'the anode', 'the salt bridge', 'both electrodes'], 1, R`"An Ox, Red Cat".`, R`The anode, which is the negative electrode in a galvanic cell.`),
    N('core', 'Daniell cell energy', R`The Daniell cell has E° = 1.10 V. Find ΔG° in kJ/mol.`, -2 * 96485 * 1.1 / 1000, 'kJ/mol', R`$\Delta G^\circ = -nFE^\circ$ with $n = 2$.`, R`$-2\times96\,485\times1.10 = ${f(-2 * 96485 * 1.1 / 1000)}$ kJ/mol.`),
    N('olympiad', 'Nernst', R`Find the EMF of Zn | Zn²⁺(0.010 M) || Cu²⁺(1.0 M) | Cu at 25 °C (E° = 1.10 V).`, 1.1 + 0.05916, 'V', R`$E = E^\circ - \dfrac{0.05916}{n}\log Q$ with $Q = [\text{Zn}^{2+}]/[\text{Cu}^{2+}]$.`, R`$E = 1.10 - 0.02958\log(0.010) = ${f(1.15916, 4)}$ V.`, 0.005)
  ]);
  X('chem-maingroup', [
    M('concept', 'Amphoteric oxide', R`Which oxide is amphoteric?`, ['Na₂O', 'MgO', 'Al₂O₃', 'SO₃'], 2, R`It dissolves in both acids and alkalis.`, R`Al₂O₃ forms Al³⁺ salts with acids and aluminates with alkalis.`),
    N('core', 'Hydrogen from sodium', R`What volume of hydrogen (L, at 25 °C and 1 atm, molar volume 24.47 L) is produced when 1.00 g of sodium reacts with water?`, 1 / 22.99 / 2 * 24.47, 'L', R`2Na + 2H₂O → 2NaOH + H₂.`, R`$n(\text{H}_2) = \tfrac12 \times 1.00/22.99 = ${f(1 / 22.99 / 2)}$ mol, volume ${f(1 / 22.99 / 2 * 24.47)} L.`),
    N('olympiad', 'Banana bonds', R`How many three-centre two-electron bonds are there in diborane, B₂H₆?`, 2, '', R`Count the bridging hydrogens.`, R`Two B–H–B bridges, each a 3c–2e bond; the four terminal B–H bonds are ordinary.`, 0.001)
  ]);
  X('chem-transition', [
    M('concept', 'Colourless scandium', R`Why are Sc³⁺ compounds colourless?`, ['Sc³⁺ has no d electrons', 'Sc³⁺ has a full d shell', 'Scandium is not a metal', 'Its ligand field is too strong'], 0, R`Count the d electrons in Sc³⁺.`, R`Sc³⁺ is d⁰, so there are no d–d transitions.`),
    N('core', 'Spin-only moment', R`Find the spin-only magnetic moment of high-spin Fe³⁺ in Bohr magnetons.`, Math.sqrt(35), 'BM', R`$\mu = \sqrt{n(n + 2)}$.`, R`d⁵ high spin has 5 unpaired electrons: $\sqrt{35} = ${f(Math.sqrt(35))}$ BM.`),
    N('olympiad', 'Low-spin d⁶', R`What is the crystal field stabilisation energy of a low-spin octahedral d⁶ ion, in units of Δ<sub>o</sub> (ignore pairing energy)?`, -2.4, 'Δo', R`t₂g orbitals lie at −0.4Δ<sub>o</sub>.`, R`All six electrons in t₂g: $6\times(-0.4) = -2.4\Delta_o$.`, 0.001)
  ]);
  X('chem-organic', [
    M('concept', 'Pentane isomers', R`How many structural isomers does C₅H₁₂ have?`, ['2', '3', '4', '5'], 1, R`Pentane, and two branched skeletons.`, R`Three: pentane, 2-methylbutane and 2,2-dimethylpropane.`),
    N('core', 'Degree of unsaturation', R`What is the degree of unsaturation of C₇H₇NO?`, 5, '', R`$\text{DoU} = (2C + 2 + N - H)/2$.`, R`$(14 + 2 + 1 - 7)/2 = 5$, e.g. benzamide (ring + 3 C=C + C=O).`, 0.001),
    N('olympiad', 'Aldohexoses', R`How many stereoisomers are possible for the open-chain aldohexose (the family that includes glucose)?`, 16, '', R`Count the stereocentres; none of the isomers is meso.`, R`Four stereocentres (C2–C5) and no internal symmetry: $2^4 = 16$.`, 0.001)
  ]);
  X('chem-mechanisms', [
    M('concept', 'S<sub>N</sub>1 rate', R`The rate of an S<sub>N</sub>1 reaction depends on…`, ['the nucleophile only', 'the substrate only', 'both substrate and nucleophile', 'neither'], 1, R`The slow step is ionisation.`, R`Only the substrate: rate $= k[\text{RX}]$.`),
    M('core', 'Fastest S<sub>N</sub>2', R`Which reacts fastest with hydroxide by S<sub>N</sub>2?`, ['CH₃Br', '(CH₃)₂CHBr', '(CH₃)₃CBr', 'C₆H₅Br'], 0, R`Backside attack needs space.`, R`Methyl bromide: the least hindered. Tertiary and aryl halides barely react by S<sub>N</sub>2.`),
    M('olympiad', 'Bulky base', R`2-Bromo-2-methylbutane is treated with potassium tert-butoxide. What is the major alkene?`, ['2-methylbut-2-ene', '2-methylbut-1-ene', '3-methylbut-1-ene', 'pent-2-ene'], 1, R`A bulky base removes the most accessible hydrogen.`, R`2-Methylbut-1-ene, the Hofmann product; ethoxide would give mostly the Zaitsev product, 2-methylbut-2-ene.`)
  ]);
  X('chem-synthesis', [
    M('concept', 'Grignard and ketone', R`A Grignard reagent reacts with a ketone, followed by acid work-up. The product is…`, ['a primary alcohol', 'a secondary alcohol', 'a tertiary alcohol', 'a carboxylic acid'], 2, R`The new C–C bond forms at the carbonyl carbon, which already has two carbon groups.`, R`A tertiary alcohol.`),
    N('core', 'Overall yield', R`A four-step synthesis has 80% yield in every step. What is the overall yield?`, 100 * Math.pow(0.8, 4), '%', R`Multiply the yields.`, R`$0.8^4 = ${f(100 * Math.pow(0.8, 4))}\%$.`),
    M('olympiad', 'Friedel–Crafts fails', R`Which compound will not undergo Friedel–Crafts acylation?`, ['Toluene', 'Anisole', 'Nitrobenzene', 'Benzene'], 2, R`Strongly electron-withdrawing groups deactivate the ring.`, R`Nitrobenzene: the ring is too deactivated to attack the acylium ion (it is even used as a solvent for the reaction).`)
  ]);
  X('chem-spectro', [
    M('concept', 'IR at 1715', R`A strong, sharp IR band near 1715 cm⁻¹ shows…`, ['O–H', 'C=O', 'C≡N', 'C–H'], 1, R`Carbonyl stretches lie at 1650–1780 cm⁻¹.`, R`A C=O stretch, typical of a saturated ketone.`),
    N('core', 'Beer–Lambert', R`A solution has absorbance 0.45 in a 1.0 cm cell, with ε = 15 000 L mol⁻¹ cm⁻¹. What is its concentration in μmol/L?`, 30, 'μmol/L', R`$A = \varepsilon cl$.`, R`$c = 0.45/15\,000 = 3.0\times10^{-5}$ M $= 30$ μM.`),
    N('olympiad', 'NMR signals', R`How many signals appear in the ¹H NMR spectrum of 2-methylbutane?`, 4, '', R`Find the sets of equivalent hydrogens.`, R`(CH₃)₂CH–CH₂–CH₃: the two equivalent CH₃ groups, CH, CH₂ and the terminal CH₃ give 4 signals.`, 0.001)
  ]);
  const rhoNaCl = 4 * 58.44 / (6.022e23 * Math.pow(5.64e-8, 3));
  X('chem-solid', [
    M('concept', 'fcc neighbours', R`What is the coordination number of an atom in a face-centred cubic metal?`, ['6', '8', '12', '4'], 2, R`Close-packed.`, R`12, as in all close-packed structures.`),
    N('core', 'Salt density', R`NaCl has a cubic cell of edge 564 pm containing 4 formula units. Find its density in g/cm³.`, rhoNaCl, 'g/cm³', R`$\rho = ZM/(N_Aa^3)$.`, R`$\rho = ${f(rhoNaCl)}$ g/cm³ (measured 2.17).`),
    N('olympiad', 'Radius ratio', R`What is the minimum cation/anion radius ratio for the cation to touch all 8 anions in a CsCl-type structure?`, Math.sqrt(3) - 1, '', R`Ions touch along the body diagonal: $2(r_+ + r_-) = \sqrt3 a$ with $a = 2r_-$.`, R`$r_+/r_- = \sqrt3 - 1 = ${f(Math.sqrt(3) - 1)}$.`)
  ]);
  X('chem-sblock', [
    M('concept', 'Most reactive', R`Which alkali metal reacts most vigorously with water?`, ['Li', 'Na', 'K', 'Cs'], 3, R`Ionisation energy falls down the group.`, R`Caesium.`),
    N('core', 'Lime', R`What mass of CaO is formed by fully decomposing 50.0 g of CaCO₃?`, 50 / 100.09 * 56.08, 'g', R`CaCO₃ → CaO + CO₂.`, R`$50.0/100.09 \times 56.08 = ${f(50 / 100.09 * 56.08)}$ g.`),
    M('olympiad', 'Diagonal relationship', R`Which pair shows a diagonal relationship?`, ['Li and Mg', 'Na and Ca', 'Be and Mg', 'Li and Na'], 0, R`Similar charge density.`, R`Li and Mg: both form nitrides with N₂, covalent-ish organometallics, and carbonates that decompose on heating.`)
  ]);
  X('chem-pblock', [
    M('concept', 'Inert pair', R`Thallium forms Tl⁺ more readily than Tl³⁺ because of…`, ['the inert pair effect', 'the lanthanide contraction alone', 'its small radius', 'hydrogen bonding'], 0, R`The 6s² pair resists bonding.`, R`The inert pair effect: the 6s electrons are poorly shielded and held tightly.`),
    N('core', 'Phosphorous acid', R`What is the oxidation state of phosphorus in H₃PO₃?`, 3, '', R`H is +1, O is −2.`, R`$3 + x - 6 = 0$, so $x = +3$.`, 0.001),
    N('olympiad', 'Hydrolysing PCl₅', R`1 mol of PCl₅ is fully hydrolysed. How many moles of NaOH are needed to neutralise all the products?`, 8, 'mol', R`PCl₅ + 4H₂O → H₃PO₄ + 5HCl.`, R`H₃PO₄ is triprotic (3) and HCl gives 5: 8 mol.`, 0.001)
  ]);
  X('chem-chalcogens', [
    M('concept', 'Strongest oxidant', R`Which halogen is the strongest oxidising agent?`, ['F₂', 'Cl₂', 'Br₂', 'I₂'], 0, R`Look at E° values.`, R`F₂ (E° = +2.87 V).`),
    N('core', 'Thiosulfate sulfur', R`What is the average oxidation state of sulfur in S₂O₃²⁻?`, 2, '', R`Three oxygens at −2 and an overall charge of −2.`, R`$2x - 6 = -2$, so $x = +2$.`, 0.001),
    N('olympiad', 'Iodate by iodometry', R`25.0 mL of an iodate solution is added to excess acidified KI. The I₂ released needs 30.0 mL of 0.100 M thiosulfate. Find [IO₃⁻].`, 0.02, 'mol/L', R`IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O, and I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻.`, R`1 IO₃⁻ ≡ 6 S₂O₃²⁻. $n = 3.00\times10^{-3}/6 = 5.0\times10^{-4}$ mol in 25.0 mL: 0.0200 M.`)
  ]);
  X('chem-coord', [
    M('concept', 'EDTA', R`EDTA⁴⁻ is a ligand of what denticity?`, ['Bidentate', 'Tridentate', 'Tetradentate', 'Hexadentate'], 3, R`Count the N and carboxylate O donors.`, R`Hexadentate: 2 N + 4 O.`),
    N('core', 'Cis and trans', R`How many geometric isomers does octahedral [Co(NH₃)₄Cl₂]⁺ have?`, 2, '', R`Are the chlorides next to each other or opposite?`, R`Two: cis and trans.`, 0.001),
    N('olympiad', 'With ethylenediamine', R`How many stereoisomers (counting enantiomers separately) does [Co(en)₂Cl₂]⁺ have?`, 3, '', R`The cis form is chiral.`, R`trans (achiral) plus a pair of cis enantiomers: 3.`, 0.001)
  ]);
  X('chem-redox', [
    M('concept', 'Frost diagram', R`On a Frost diagram, a species lying above the line joining its two neighbours will…`, ['comproportionate', 'disproportionate', 'be the most stable', 'not react'], 1, R`It is at a "convex" point.`, R`It is unstable towards disproportionation into its neighbours.`),
    N('core', 'Latimer', R`E°(Cu²⁺/Cu⁺) = 0.153 V and E°(Cu⁺/Cu) = 0.521 V. Find E°(Cu²⁺/Cu).`, (0.153 + 0.521) / 2, 'V', R`Add the ΔG values, $-nFE$, not the potentials.`, R`$E = (1\times0.153 + 1\times0.521)/2 = ${f(0.337)}$ V.`),
    N('olympiad', 'Iron by permanganate', R`An iron(II) sample needs 20.0 mL of 0.0200 M KMnO₄ in acid. What mass of iron does it contain?`, 5 * 0.02 * 0.02 * 55.845, 'g', R`MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O.`, R`$n(\text{Fe}) = 5 \times 4.00\times10^{-4} = 2.00\times10^{-3}$ mol, mass ${f(0.11169)} g.`)
  ]);
})();
