(function () {
  const R = PB.R;
  const F = 96485;
  PB.addChapter({
    id: 'chem-electro', subject: 'chemistry', num: 14, part: 'Physical Chemistry',
    title: 'Electrochemistry',
    subtitle: R`Chemistry that moves electrons through wires. Oxidation numbers and redox equations, galvanic cells and electrode potentials, the Nernst equation, electrolysis and batteries.`,
    goals: ['Assign oxidation numbers and balance redox equations', 'Calculate cell potentials from E° tables', 'Link E°, ΔG° and K', 'Use the Nernst equation', 'Apply Faraday’s laws of electrolysis'],
    sections: [
      {
        title: 'Redox and oxidation numbers',
        html: R`
<p><strong>Oxidation</strong> is loss of electrons; <strong>reduction</strong> is gain ("OIL RIG"). Oxidation numbers keep the books: elements are 0, O is usually −2, H +1, and the numbers in a species add up to its charge. Manganese in MnO₄⁻ is +7.</p>
<p>To balance a redox equation in acid: split it into half-equations; balance atoms other than O and H; add H₂O for O and H⁺ for H; add electrons for charge; multiply so the electrons cancel; add. In base, finish by adding OH⁻ to neutralise H⁺.</p>
<details class="example"><summary><span class="lbl">Worked example</span>Balance the reaction of permanganate with iron(II) in acid.<span class="tog">Solution</span></summary><div class="sol"><p>$\mathrm{MnO_4^- + 8H^+ + 5e^- \to Mn^{2+} + 4H_2O}$ and $\mathrm{Fe^{2+} \to Fe^{3+} + e^-}$ (×5): $\mathrm{MnO_4^- + 8H^+ + 5Fe^{2+} \to Mn^{2+} + 5Fe^{3+} + 4H_2O}$.</p></div></details>`
      },
      {
        title: 'Galvanic cells and electrode potentials',
        html: R`
<p>A galvanic cell separates the two half-reactions so the electrons flow through a wire. Oxidation happens at the <strong>anode</strong> (negative in a galvanic cell) and reduction at the <strong>cathode</strong>. A salt bridge completes the circuit.</p>
<p>Each half-cell has a <strong>standard reduction potential</strong> E°, measured against the standard hydrogen electrode (0 V). The more positive E°, the stronger the oxidising agent. Then</p>
<div class="key">$$E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}},\qquad \Delta G^\circ = -nFE^\circ_{\text{cell}},\qquad E^\circ = \frac{RT}{nF}\ln K.$$</div>
<p>A positive E°cell means a spontaneous reaction. In the Daniell cell (Zn | Zn²⁺ || Cu²⁺ | Cu), E° = 0.34 − (−0.76) = 1.10 V.</p>`
      },
      {
        title: 'The Nernst equation',
        html: R`
<p>Away from 1 M concentrations, the cell potential follows from $\Delta G = \Delta G^\circ + RT\ln Q$:</p>
<div class="key">$$E = E^\circ - \frac{RT}{nF}\ln Q = E^\circ - \frac{0.05916\ \mathrm V}{n}\log_{10}Q\quad(298\ \mathrm K).$$</div>
<p>As a cell discharges, Q grows and E falls, reaching zero at equilibrium (a "flat" battery). A <strong>concentration cell</strong> has the same electrode on both sides, and its voltage comes entirely from the concentration difference; this is how nerve cells and pH electrodes generate potentials.</p>`
      },
      {
        title: 'Electrolysis, batteries and corrosion',
        html: R`
<p>In <strong>electrolysis</strong> an external power supply drives a non-spontaneous reaction. Faraday's laws say the amount of substance is proportional to the charge passed:</p>
<div class="key">$$n_{\text{electrons}} = \frac{It}{F},\qquad F = 96\,485\ \mathrm{C/mol}.$$</div>
<p>In aqueous electrolysis, water competes: at the cathode, H₂ forms unless the metal ion is easier to reduce (Cu²⁺, Ag⁺); at the anode, O₂ forms unless a halide is present in high concentration.</p>
<p>Batteries are galvanic cells engineered for energy density (lithium-ion), rechargeability (lead–acid) or power. Fuel cells burn fuels electrochemically. <strong>Corrosion</strong> of iron is an unwanted galvanic cell; it is prevented by coatings, by galvanising with zinc, or by a sacrificial anode of a more reactive metal.</p>
<div class="insight"><p>Combining half-reactions with different numbers of electrons: E° values do not add directly, but ΔG° values do. Convert each to $-nFE^\circ$, add, and convert back. This trick (and Latimer diagrams built on it) appears often in olympiad inorganic problems.</p></div>`
      }
    ],
    labs: [
      { sim: 'cell', title: 'Galvanic cell builder', desc: 'Choose two half-cells and their ion concentrations. The meter shows the Nernst potential at 298 K; electrons flow from anode to cathode.',
        tasks: ['Build the Daniell cell (Zn and Cu). Check E° = 1.10 V.', 'Dilute the Zn²⁺. Does the voltage go up or down? Explain with Q.', 'Use the same metal on both sides with different concentrations. Where does the voltage come from?', 'Which pair gives the largest voltage?'] }
    ],
    formulas: [
      ['Cell potential', R`E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}`],
      ['Free energy', R`\Delta G^\circ = -nFE^\circ`],
      ['Equilibrium constant', R`\ln K = nFE^\circ/(RT)`],
      ['Nernst equation', R`E = E^\circ - \frac{0.05916}{n}\log Q`],
      ['Faraday’s law', R`n_e = It/F`],
      ['Faraday constant', R`F = 96\,485\ \mathrm{C/mol}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Permanganate', q: R`<p>What is the oxidation number of manganese in KMnO₄?</p>`, options: ['+2', '+4', '+6', '+7'], answer: 3, hints: [R`K is +1, each O is −2.`], solution: R`<p>$1 + x + 4(-2) = 0$, so $x = +7$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Anode', q: R`<p>In a galvanic cell, oxidation takes place at:</p>`, options: ['The cathode, the positive electrode', 'The anode, the negative electrode', 'The salt bridge', 'Both electrodes'], answer: 1, hints: [R`"An Ox, Red Cat".`], solution: R`<p>Oxidation at the anode, which releases electrons into the wire and so is negative in a galvanic cell.</p>` },
      { level: 'concept', type: 'mcq', title: 'More copper ions', q: R`<p>In a Daniell cell, the concentration of Cu²⁺ is increased. The cell voltage:</p>`, options: ['Increases', 'Decreases', 'Is unchanged', 'Reverses'], answer: 0, hints: [R`Cu²⁺ is a reactant: Q falls.`], solution: R`<p>$Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$ falls, so $E = E^\circ - (0.0296)\log Q$ rises.</p>` },
      { level: 'core', type: 'num', title: 'Daniell cell', q: R`<p>E°(Cu²⁺/Cu) = +0.34 V and E°(Zn²⁺/Zn) = −0.76 V. Find E°cell.</p>`, answer: 1.10, tol: 0.005, unit: 'V', hints: [R`Cathode minus anode.`], solution: R`<p>$0.34 - (-0.76) = 1.10\ \mathrm V$.</p>` },
      { level: 'core', type: 'num', title: 'Free energy of the Daniell cell', q: R`<p>Find ΔG° for the Daniell cell reaction (n = 2, E° = 1.10 V), in kJ/mol.</p>`, answer: -2 * F * 1.1 / 1000, tol: 0.005, unit: 'kJ/mol', hints: [R`$\Delta G^\circ = -nFE^\circ$.`], solution: R`<p>$-2(96\,485)(1.10) = -212\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Copper plating', q: R`<p>A current of 2.00 A passes through copper(II) sulfate solution for 30.0 minutes. What mass of copper ($M = 63.55$) is deposited?</p>`, answer: 2 * 1800 / F / 2 * 63.55, tol: 0.01, unit: 'g', hints: [R`$Q = It$; Cu²⁺ needs 2 electrons.`], solution: R`<p>$Q = 3600\ \mathrm C$, 0.0373 mol e⁻, 0.0187 mol Cu $= 1.19\ \mathrm g$.</p>` },
      { level: 'core', type: 'num', title: 'Nernst', q: R`<p>Find E for Zn | Zn²⁺(0.010 M) || Cu²⁺(1.0 M) | Cu at 298 K (E° = 1.10 V).</p>`, answer: 1.10 - 0.05916 / 2 * Math.log10(0.01), tol: 0.002, unit: 'V', hints: [R`$Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}] = 0.010$.`], solution: R`<p>$1.10 - 0.02958\log0.010 = 1.16\ \mathrm V$.</p>` },
      { level: 'core', type: 'num', title: 'Permanganate titration', q: R`<p>In acid, how many moles of Fe²⁺ react with one mole of MnO₄⁻?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Mn goes from +7 to +2.`], solution: R`<p>MnO₄⁻ gains 5 electrons; each Fe²⁺ gives 1. Ratio 5 : 1.</p>` },
      { level: 'olympiad', type: 'num', title: 'How far does it go?', q: R`<p>Find log₁₀ K at 298 K for the Daniell cell reaction (n = 2, E° = 1.10 V).</p>`, answer: 2 * 1.1 / 0.05916, tol: 0.005, unit: '', hints: [R`$\log K = nE^\circ/0.05916$.`], solution: R`<p>$\log K = 37.2$: the reaction goes to completion for every practical purpose.</p>` },
      { level: 'olympiad', type: 'num', title: 'Concentration cell', q: R`<p>Find the voltage of Ag | Ag⁺(0.0010 M) || Ag⁺(0.10 M) | Ag at 298 K.</p>`, answer: 0.05916 * 2, tol: 0.005, unit: 'V', hints: [R`E° = 0, n = 1, Q = 0.0010/0.10.`], solution: R`<p>$E = -0.05916\log(0.01) = 0.118\ \mathrm V$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ksp from potentials', q: R`<p>E°(AgCl/Ag, Cl⁻) = +0.222 V and E°(Ag⁺/Ag) = +0.800 V. Find Ksp of AgCl at 298 K.</p>`, answer: Math.pow(10, (0.222 - 0.8) / 0.05916), tol: 0.03, unit: '', hints: [R`AgCl ⇌ Ag⁺ + Cl⁻ is the difference of the two half-reactions, with n = 1.`], solution: R`<p>$E^\circ = 0.222 - 0.800 = -0.578\ \mathrm V$, so $K_{sp} = 10^{-0.578/0.05916} = 1.7\times10^{-10}$, matching the measured value.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  const HC = [['Mg²⁺/Mg', -2.37, 2], ['Al³⁺/Al', -1.66, 3], ['Zn²⁺/Zn', -0.76, 2], ['Fe²⁺/Fe', -0.44, 2], ['Ni²⁺/Ni', -0.25, 2], ['Cu²⁺/Cu', 0.34, 2], ['Ag⁺/Ag', 0.80, 1], ['Cl₂/Cl⁻', 1.36, 2]];
  PB.addDrills('chem-electro', [
    { title: 'Cell potential', gen(r) { let a = r.pick(HC), b = r.pick(HC); while (b === a) b = r.pick(HC); const E = Math.abs(a[1] - b[1]); return { q: R`<p>A cell combines ${a[0]} (E° = ${a[1]} V) with ${b[0]} (E° = ${b[1]} V). Find E°cell for the spontaneous reaction.</p>`, answer: E, tol: 0.005, unit: 'V', solution: R`<p>$E^\circ = ${f(Math.max(a[1], b[1]))} - (${f(Math.min(a[1], b[1]))}) = ${f(E)}\ \mathrm V$.</p>` }; } },
    { title: 'Electrolysis mass', gen(r) { const m = r.pick([['copper', 63.55, 2], ['silver', 107.87, 1], ['zinc', 65.38, 2], ['aluminium', 26.98, 3], ['nickel', 58.69, 2]]), I = r.step(0.5, 10, 0.5), t = r.int(5, 120); const g = I * t * 60 / F / m[2] * m[1]; return { q: R`<p>What mass of ${m[0]} (M = ${m[1]}, ion charge +${m[2]}) is deposited by ${I} A for ${t} minutes?</p>`, answer: g, unit: 'g', solution: R`<p>$m = \dfrac{It}{zF}M = ${f(g)}\ \mathrm g$.</p>` }; } },
    { title: 'ΔG from E°', gen(r) { const n = r.int(1, 4), E = r.step(0.1, 2.5, 0.01); return { q: R`<p>A cell reaction transfers ${n} electrons with E° = ${E} V. Find ΔG° (kJ/mol).</p>`, answer: -n * F * E / 1000, unit: 'kJ/mol', solution: R`<p>$\Delta G^\circ = -nFE^\circ = ${f(-n * F * E / 1000)}\ \mathrm{kJ/mol}$.</p>` }; } }
  ]);
})();
