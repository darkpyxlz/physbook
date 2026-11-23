/* Guided steps for the first core problem of each chemistry chapter. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const N = (phase, q, a, u, e, tol) => ({ phase: phase, type: 'num', q: q, answer: a, unit: u || '', explain: e, tol: tol || 0.03 });
  const C = (phase, q, o, a, e) => ({ phase: phase, type: 'mcq', q: q, options: o, answer: a, explain: e });
  const G = PB.addSteps;

  G('chem-moles-4', [
    C('plan', R`Relative atomic mass is…`, ['the simple average of the isotope masses', 'the abundance-weighted average of the isotope masses', 'the mass of the commonest isotope', 'the mass number'], 1, R`Each isotope contributes its mass times its fractional abundance.`),
    N('do', R`What does $^{35}$Cl contribute? ($0.7578\times34.969$)`, 0.7578 * 34.969, '', R`$${f(0.7578 * 34.969, 5)}$. Add $0.2422\times36.966$.`, 0.002)
  ]);
  G('chem-solutions-4', [
    N('do', R`How many moles of NaCl are needed? ($n = cV$, with $V$ in litres)`, 0.05, 'mol', R`$0.200\times0.2500 = 0.0500$ mol.`),
    C('plan', R`How do you convert moles to grams?`, ['divide by $M$', 'multiply by $M$', 'multiply by $N_A$', 'divide by the volume'], 1, R`$m = nM = 0.0500\times58.44$.`)
  ]);
  G('chem-atom-4', [
    C('understand', R`Mn is [Ar] 3d⁵ 4s². When it forms Mn²⁺, which electrons go first?`, ['two 3d electrons', 'the two 4s electrons', 'one of each', 'none'], 1, R`Transition metals lose their 4s electrons first, leaving [Ar] 3d⁵.`),
    C('do', R`How are five d electrons arranged in five d orbitals?`, ['all paired', 'one in each orbital, parallel spins (Hund)', 'two pairs and one single', 'three pairs'], 1, R`Hund's rule: spread out before pairing, so all five are unpaired.`)
  ]);
  G('chem-periodic-4', [
    C('plan', R`What signals the end of the valence electrons?`, ['the smallest ionisation energy', 'a huge jump between successive ionisation energies', 'equal values', 'the first value'], 1, R`After the valence shell is empty, the next electron comes from a much closer, inner shell.`),
    C('do', R`Where is the big jump?`, ['between the 1st and 2nd', 'between the 2nd and 3rd', 'between the 3rd and 4th', 'there is none'], 2, R`2745 → 11 577 kJ/mol: after the third electron.`)
  ]);
  G('chem-bonding-4', [
    C('plan', R`What does the Born–Haber cycle say?`, ['ΔfH equals the sum of all the steps from the elements to the solid via gaseous ions', 'the lattice enthalpy equals ΔfH', 'electron affinity equals ionisation energy', 'all steps add to zero'], 0, R`Hess's law: going from Na(s) + ½Cl₂(g) to NaCl(s) directly, or via atoms and ions, gives the same total.`),
    N('do', R`Add the four known steps (atomise Na, ionise Na, atomise Cl, add electron to Cl) in kJ/mol.`, 107 + 496 + 122 - 349, 'kJ/mol', R`$107 + 496 + 122 - 349 = 376$ kJ/mol. Then $U = -411 - 376$.`, 0.005)
  ]);
  G('chem-shapes-4', [
    N('understand', R`How many valence electrons does xenon have?`, 8, '', R`Xe is a noble gas: 8.`, 0.001),
    N('do', R`How many of them are used in the four Xe–F bonds?`, 4, '', R`One from Xe for each bond: 4. The remaining $8 - 4 = 4$ electrons form lone pairs.`, 0.001)
  ]);
  G('chem-gases-4', [
    C('plan', R`Which gas constant fits litres and atmospheres?`, ['8.314', '0.08206', '1.987', '62.36'], 1, R`$R = 0.08206$ L atm K⁻¹ mol⁻¹.`),
    C('do', R`Rearranging $PV = nRT$ for $V$ gives…`, ['$V = nRT/P$', '$V = P/nRT$', '$V = nRP/T$', '$V = RT/nP$'], 0, R`Divide both sides by $P$.`)
  ]);
  G('chem-thermo-4', [
    N('do', R`Heat released into the solution, $q = mc\Delta T$ (J)?`, 100 * 4.18 * 6.8, 'J', R`$100\times4.18\times6.8 = 2842$ J.`),
    N('do', R`How many moles of water form?`, 0.05, 'mol', R`$0.0500$ L × 1.00 M = 0.0500 mol of each reactant.`),
    C('check', R`What sign does ΔH have?`, ['positive: heat was absorbed', 'negative: the reaction released heat', 'zero', 'it depends on the volume'], 1, R`The solution warmed up, so the reaction is exothermic: $\Delta H = -q/n$.`)
  ]);
  G('chem-gibbs-4', [
    C('plan', R`ΔS° of reaction is…`, ['Σ S°(reactants) − Σ S°(products)', 'Σ S°(products) − Σ S°(reactants), with coefficients', 'just S°(NH₃)', 'zero for gases'], 1, R`Products minus reactants, each multiplied by its stoichiometric coefficient.`),
    N('do', R`Σ S° of the reactants (J/K)?`, 191.6 + 3 * 130.7, 'J/K', R`$191.6 + 3(130.7) = 583.7$ J/K. Products: $2(192.5) = 385.0$.`, 0.005)
  ]);
  G('chem-equilibrium-4', [
    C('plan', R`For H₂ + I₂ ⇌ 2HI, $K_c$ = …`, ['$[\\mathrm{HI}]/[\\mathrm{H_2}][\\mathrm{I_2}]$', '$[\\mathrm{HI}]^2/[\\mathrm{H_2}][\\mathrm{I_2}]$', '$[\\mathrm{H_2}][\\mathrm{I_2}]/[\\mathrm{HI}]^2$', '$2[\\mathrm{HI}]/[\\mathrm{H_2}]$'], 1, R`Coefficients become powers.`),
    N('do', R`Compute the numerator $[\mathrm{HI}]^2$.`, 0.78 * 0.78, '', R`$0.78^2 = 0.6084$. Denominator $0.11^2 = 0.0121$.`, 0.005)
  ]);
  G('chem-acids-4', [
    C('understand', R`HCl is a strong acid, so [H⁺] = …`, ['0.020 M', '$\\sqrt{0.020}$ M', '0.010 M', '0.040 M'], 0, R`It dissociates completely.`),
    C('plan', R`pH = …`, ['$\\log[\\mathrm H^+]$', '$-\\log[\\mathrm H^+]$', '$-\\ln[\\mathrm H^+]$', '$14 - [\\mathrm H^+]$'], 1, R`Base-10 logarithm with a minus sign.`)
  ]);
  G('chem-titration-4', [
    C('plan', R`For AgCl(s) ⇌ Ag⁺ + Cl⁻ with solubility $s$, $K_{sp} = $`, ['$s$', '$s^2$', '$2s^2$', '$4s^3$'], 1, R`$[\mathrm{Ag^+}] = [\mathrm{Cl^-}] = s$, so $K_{sp} = s^2$ and $s = \sqrt{K_{sp}}$.`)
  ]);
  G('chem-kinetics-4', [
    C('plan', R`If rate $\propto[\mathrm A]^m$, doubling [A] multiplies the rate by…`, ['$2m$', '$2^m$', '$m^2$', '$m/2$'], 1, R`$(2[\mathrm A])^m = 2^m[\mathrm A]^m$. Set $2^m = 4$.`)
  ]);
  G('chem-electro-4', [
    C('understand', R`Which half-cell is the cathode (reduction)?`, ['Zn, because its potential is lower', 'Cu, because its potential is higher', 'both', 'neither'], 1, R`The more positive electrode potential is reduced.`),
    C('plan', R`E°cell = …`, ['E°(cathode) − E°(anode)', 'E°(anode) − E°(cathode)', 'E°(cathode) + E°(anode)', 'E°(cathode) × E°(anode)'], 0, R`$0.34 - (-0.76)$.`)
  ]);
  G('chem-maingroup-4', [
    N('understand', R`How many grams of Al are in one mole (101.96 g) of Al₂O₃?`, 2 * 26.98, 'g', R`Two Al atoms: $2\times26.98 = 53.96$ g.`, 0.002),
    C('plan', R`So the fraction of Al₂O₃'s mass that is aluminium is…`, ['26.98/101.96', '53.96/101.96', '101.96/53.96', '48.00/101.96'], 1, R`Multiply 1000 kg by $53.96/101.96$.`)
  ]);
  G('chem-transition-4', [
    N('understand', R`What is the charge on the complex ion [Fe(CN)₆]ⁿ⁻? (Four K⁺ balance it.)`, -4, '', R`$4\times(+1) + x = 0$, so the complex is −4.`, 0.001),
    C('do', R`Each cyanide is CN⁻. So the iron is…`, ['+6', '+2', '+3', '−4'], 1, R`$x + 6(-1) = -4$, $x = +2$.`)
  ]);
  G('chem-organic-4', [
    C('plan', R`What is the systematic way to count?`, ['List every drawing', 'Start with the longest chain and shorten it by one carbon at a time, adding branches', 'Count hydrogens', 'Use 2ⁿ'], 1, R`Five in a row; four in a row with one methyl; three in a row with two methyls.`)
  ]);
  G('chem-mechanisms-4', [
    C('plan', R`The S<sub>N</sub>2 rate law is…`, ['rate = k[RX]', 'rate = k[RX][Nu⁻]', 'rate = k[Nu⁻]²', 'rate = k'], 1, R`One step involving both: first order in each.`)
  ]);
  G('chem-synthesis-4', [
    C('plan', R`Overall yield over several steps is…`, ['the sum of the yields', 'the product of the yields', 'the average yield', 'the lowest yield'], 1, R`Each step keeps a fraction of what came in: $0.8^5$.`)
  ]);
  G('chem-spectro-4', [
    C('plan', R`Are the two CH₃ groups in (CH₃)₂CHOH equivalent?`, ['yes, by symmetry', 'no', 'only at high temperature', 'only in D₂O'], 0, R`They are related by symmetry, so they give one signal. Then count the CH and OH.`)
  ]);
  G('chem-solid-4', [
    N('understand', R`How many atoms are in a bcc unit cell?`, 2, '', R`8 corners × ⅛ + 1 centre = 2.`, 0.001),
    N('do', R`What is the cell volume in cm³ (units of $10^{-23}$)?`, Math.pow(286.6e-10, 3) / 1e-23, '×10⁻²³ cm³', R`$a = 2.866\times10^{-8}$ cm, $a^3 = ${f(Math.pow(286.6e-10, 3) / 1e-23)}\times10^{-23}$ cm³. Then $\rho = 2M/(N_Aa^3)$.`)
  ]);
  G('chem-sblock-4', [
    N('do', R`How many moles of CaH₂ is 1.00 g?`, 1 / 42.09, 'mol', R`$1.00/42.09 = 0.02376$ mol.`),
    C('plan', R`How many moles of H₂ per mole of CaH₂?`, ['1', '2', '½', '4'], 1, R`From the equation: 2 H₂. Then multiply by 24.79 L/mol.`)
  ]);
  G('chem-pblock-4', [
    C('understand', R`How many electrons are needed per Al³⁺ → Al?`, ['1', '2', '3', '6'], 2, R`Al³⁺ + 3e⁻ → Al.`),
    N('do', R`Moles of Al in 1.00 kg?`, 1000 / 26.98, 'mol', R`$1000/26.98 = 37.06$ mol; then $Q = 3nF$.`)
  ]);
  G('chem-chalcogens-4', [
    C('plan', R`In ClO₃⁻, the oxidation states must add up to…`, ['0', '−1', '+1', '−3'], 1, R`The overall charge of the ion, −1. Oxygen is −2: $x + 3(-2) = -1$.`)
  ]);
  G('chem-coord-4', [
    N('understand', R`What is the oxidation state of Fe in [Fe(CN)₆]⁴⁻?`, 2, '', R`$x - 6 = -4$, $x = +2$.`, 0.001),
    C('do', R`Fe has 8 valence electrons as a neutral atom (3d⁶4s²). Fe²⁺ is therefore…`, ['d⁸', 'd⁶', 'd⁴', 'd²'], 1, R`Remove the two 4s electrons: d⁶.`)
  ]);
  G('chem-redox-4', [
    N('understand', R`What is the oxidation state of Cr in Cr₂O₇²⁻?`, 6, '', R`$2x + 7(-2) = -2$, $x = +6$.`, 0.001),
    C('do', R`Each Cr goes from +6 to +3. With two Cr atoms, the electrons gained are…`, ['3', '6', '2', '12'], 1, R`$2\times3 = 6$.`)
  ]);
})();
