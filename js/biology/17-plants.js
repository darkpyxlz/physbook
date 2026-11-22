(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-plants', subject: 'biology', num: 17, part: 'Physiology',
    title: 'Plant Transport and Plant Biology',
    subtitle: R`How a tree lifts water 100 m without a pump. Water potential in plants, transpiration and the cohesion–tension theory, phloem and translocation, stomata, and plant hormones.`,
    goals: ['Apply water potential to plant cells and tissues', 'Explain the cohesion–tension theory', 'Describe the factors affecting transpiration', 'Explain mass flow in the phloem', 'Describe the roles of plant hormones'],
    sections: [
      {
        title: 'Water potential in plant cells',
        html: R`
<p>Water moves from higher to lower water potential, $\Psi = \Psi_s + \Psi_p$ (chapter 3). A plant cell differs from an animal cell because of its wall: as the protoplast swells, the wall pushes back with a positive <strong>pressure potential</strong>.</p>
<ul>
<li><strong>Turgid</strong>: $\Psi_p$ large, the cell is firm, supporting non-woody plants.</li>
<li><strong>Incipient plasmolysis</strong>: $\Psi_p = 0$ and the protoplast just touches the wall. Here $\Psi = \Psi_s$.</li>
<li><strong>Plasmolysed</strong>: the protoplast has shrunk away from the wall.</li>
</ul>
<p>To find a tissue's water potential, soak samples in a range of sucrose solutions and measure the change in mass. The concentration giving no change has the same water potential as the tissue.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Potato discs neither gain nor lose mass in 0.30 mol/L sucrose at 20 °C. What is their water potential?<span class="tog">Solution</span></summary><div class="sol"><p>$\Psi = -CRT = -0.30\times0.00831\times293 = -0.73$ MPa.</p></div></details>`
      },
      {
        title: 'Transpiration and the xylem',
        html: R`
<p>Water enters root hairs by osmosis, crosses the cortex through cell walls (the <strong>apoplast</strong> pathway) and cytoplasm (<strong>symplast</strong>), and is forced into the symplast at the endodermis by the waterproof <strong>Casparian strip</strong>, which lets the plant control what enters the xylem.</p>
<p><strong>Xylem</strong> vessels are dead, hollow tubes with lignified walls. Water rises by the <strong>cohesion–tension</strong> mechanism: evaporation from leaf cells into air spaces and out through stomata (<strong>transpiration</strong>) pulls water from the xylem; hydrogen bonding (cohesion) holds the water column together and adhesion to the walls helps. The xylem is under negative pressure: tension, as much as −2 MPa in tall trees.</p>
<p>Lifting water by height $h$ needs a tension of about $\rho gh$, which is 0.01 MPa per metre, plus friction losses that roughly double it. The 115 m redwoods are near the physical limit, where columns break by <strong>cavitation</strong>.</p>
<p>Transpiration rises with light (stomata open), temperature, wind and low humidity. It is measured with a <strong>potometer</strong>, which really measures water uptake: rate = distance moved by the bubble × cross-sectional area of the capillary.</p>
<p><strong>Xerophytes</strong> reduce water loss with thick cuticles, sunken stomata, rolled leaves and hairs that trap humid air (marram grass, cacti).</p>`
      },
      {
        title: 'Stomata',
        html: R`
<p>Each stoma is a pore between two <strong>guard cells</strong>. In light, guard cells pump in K⁺ (driven by a proton pump), water potential falls, water enters, and the cells bow apart because their inner walls are thicker. In drought the hormone <strong>abscisic acid</strong> (ABA) triggers K⁺ loss and closure.</p>
<p>Stomata face a trade-off: they must open to let CO₂ in for photosynthesis but lose water while doing so. A typical C₃ plant loses about 400 water molecules for every CO₂ fixed; C₄ and CAM plants do much better (chapter 6).</p>`
      },
      {
        title: 'Phloem and translocation',
        html: R`
<p>Sugars (mainly sucrose) and amino acids move in living <strong>phloem</strong> tissue: sieve tube elements with perforated sieve plates, each supported by a <strong>companion cell</strong> packed with mitochondria. Movement is from <strong>sources</strong> (photosynthesising leaves, storage organs in spring) to <strong>sinks</strong> (roots, fruits, growing tips), and can go up or down.</p>
<p>The <strong>mass flow</strong> (pressure-flow) hypothesis: companion cells actively load sucrose into sieve tubes at the source by H⁺–sucrose co-transport. Water follows by osmosis from the xylem, building high hydrostatic pressure. At the sink, sucrose is unloaded and used, water leaves, and pressure falls. Sap flows down the pressure gradient at up to about 1 m per hour.</p>
<p>Evidence: aphid stylets cut off from the aphid ooze sap under pressure; radioactive ¹⁴CO₂ given to a leaf appears in sinks; ringing a stem (removing the phloem) makes sugars accumulate above the ring.</p>`
      },
      {
        title: 'Plant hormones',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Hormone</th><th>Main effects</th></tr></thead><tbody>
<tr><td>Auxin (IAA)</td><td>cell elongation; phototropism and gravitropism; apical dominance; rooting powders</td></tr>
<tr><td>Gibberellins</td><td>stem elongation; seed germination (switch on amylase in barley grains)</td></tr>
<tr><td>Cytokinins</td><td>cell division; delay leaf ageing</td></tr>
<tr><td>Abscisic acid</td><td>stomatal closure; seed dormancy</td></tr>
<tr><td>Ethene</td><td>fruit ripening; leaf fall</td></tr>
</tbody></table></div>
<p>In <strong>phototropism</strong>, light from one side moves auxin to the shaded side of a shoot tip; cells there elongate more and the shoot bends towards the light. Darwin and his son showed in 1880 that the tip senses the light.</p>`
      }
    ],
    labs: [
      { sim: 'waterpot', title: 'Plasmolysis', desc: 'A plant cell in solutions of different concentration. The cell reaches equilibrium when its water potential equals the solution\'s.',
        tasks: ['Find the external concentration at which the cell is just at incipient plasmolysis. How does it relate to the cell sap concentration?', 'Put the cell in pure water. Why does it not burst?', 'Why can a cell\'s water potential be equal to the solution\'s while its solute potential is very different?'] }
    ],
    formulas: [
      ['Water potential', R`\Psi = \Psi_s + \Psi_p`],
      ['Solute potential', R`\Psi_s = -CRT`],
      ['Tension to lift water', R`\Delta P \approx \rho g h`],
      ['Potometer rate', R`\text{rate} = \pi r^2 \times \dfrac{\text{distance}}{\text{time}}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Xylem pressure', q: R`<p>In a transpiring plant, the water in the xylem is…</p>`, options: ['Under high positive pressure from the roots', 'Under tension (negative pressure)', 'At atmospheric pressure', 'Pumped by companion cells'], answer: 1, hints: [R`Water is pulled from above.`], solution: R`<p>Under tension, pulled by evaporation from the leaves.</p>` },
      { level: 'concept', type: 'mcq', title: 'Casparian strip', q: R`<p>What does the Casparian strip do?</p>`, options: ['Pumps water into the xylem', 'Blocks the apoplast pathway, forcing water and ions through cell membranes', 'Stores starch', 'Opens stomata'], answer: 1, hints: [R`It is a waterproof band.`], solution: R`<p>It forces everything through the endodermal cells' membranes, so the plant can select ions.</p>` },
      { level: 'concept', type: 'mcq', title: 'Ringing', q: R`<p>A ring of bark (containing the phloem) is removed from a tree trunk. What happens first?</p>`, options: ['Leaves wilt', 'Sugars build up above the ring', 'Roots get more sugar', 'Water stops rising'], answer: 1, hints: [R`The xylem is deeper, in the wood.`], solution: R`<p>Sugars moving down accumulate above the ring; the roots eventually starve.</p>` },
      { level: 'core', type: 'num', title: 'Tissue water potential', q: R`<p>Beetroot discs show no mass change in 0.40 mol/L sucrose at 25 °C. What is their water potential, in MPa?</p>`, answer: -0.991, tol: 0.005, unit: 'MPa', hints: [R`$-CRT$ with $T = 298$ K.`], solution: R`<p>$-0.4\times0.00831\times298 = -0.99$ MPa.</p>` },
      { level: 'core', type: 'num', title: 'Water movement', q: R`<p>Cell A has $\Psi_s = -1.2$ MPa and $\Psi_p = 0.5$ MPa; cell B has $\Psi_s = -0.9$ MPa and $\Psi_p = 0.1$ MPa. What is the water potential difference $\Psi_B - \Psi_A$, in MPa? (Water moves from B to A if positive.)</p>`, answer: -0.1, tol: 0.005, unit: 'MPa', hints: [R`$\Psi_A = -0.7$, $\Psi_B = -0.8$.`], solution: R`<p>$-0.8 - (-0.7) = -0.1$ MPa: water moves from A to B, even though A has the more negative solute potential.</p>` },
      { level: 'core', type: 'num', title: 'Potometer', q: R`<p>A bubble moves 45 mm in 5 minutes along a capillary of radius 0.5 mm. What is the rate of water uptake, in mm³/min?</p>`, answer: 7.07, tol: 0.01, unit: 'mm³/min', hints: [R`$\pi r^2\times9$ mm/min.`], solution: R`<p>$\pi(0.25)(9) = 7.07$ mm³/min.</p>` },
      { level: 'core', type: 'num', title: 'Tension for a tree', q: R`<p>What tension, in MPa, is needed just to hold a water column 100 m tall against gravity? ($\rho = 1000$ kg/m³, $g = 9.8$ m/s².)</p>`, answer: 0.98, tol: 0.005, unit: 'MPa', hints: [R`$\rho gh$.`], solution: R`<p>$1000\times9.8\times100 = 9.8\times10^5$ Pa ≈ 1 MPa. With friction, nearly 2 MPa.</p>` },
      { level: 'core', type: 'num', title: 'Water per CO₂', q: R`<p>A plant loses 400 molecules of water per CO₂ fixed. How many grams of water does it transpire to make 1 g of glucose?</p>`, answer: 240, tol: 0.005, unit: 'g', hints: [R`6 CO₂ per glucose: 2400 H₂O per glucose.`], solution: R`<p>$2400\times18/180 = 240$ g.</p>` },
      { level: 'olympiad', type: 'num', title: 'Phloem speed', q: R`<p>A source loads 5 mg of sucrose per hour into a sieve tube bundle of total cross-section 0.02 mm². The sap contains 200 mg/mL sucrose. What is the sap speed, in mm/h?</p>`, answer: 1250, tol: 0.005, unit: 'mm/h', hints: [R`Volume flow 0.025 mL/h = 25 mm³/h.`], solution: R`<p>$25/0.02 = 1250$ mm/h, about 1.25 m/h: typical for phloem.</p>` },
      { level: 'olympiad', type: 'num', title: 'Capillary rise', q: R`<p>How high can water rise by capillarity alone in a xylem vessel of radius 20 μm? Use $h = 2\gamma/(\rho g r)$ with $\gamma = 0.072$ N/m and perfect wetting. Answer in m.</p>`, answer: 0.735, tol: 0.01, unit: 'm', hints: [R`$2(0.072)/(1000\times9.8\times2\times10^{-5})$.`], solution: R`<p>0.73 m: capillarity alone cannot explain tall trees.</p>` },
      { level: 'olympiad', type: 'num', title: 'Incipient plasmolysis', q: R`<p>Onion cells are 50% plasmolysed in 0.35 mol/L sucrose at 20 °C. At this point $\Psi_p = 0$. What is the solute potential of the cell sap, in MPa?</p>`, answer: -0.852, tol: 0.01, unit: 'MPa', hints: [R`At incipient plasmolysis $\Psi_{\text{cell}} = \Psi_s = \Psi_{\text{solution}}$.`], solution: R`<p>$-0.35\times0.00831\times293 = -0.85$ MPa.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-plants', [
    { title: 'Water potential', gen(r) { const s = -r.step(0.3, 2.0, 0.05), p = r.step(0, 1.0, 0.05); return { q: R`<p>A cell has solute potential ${f(s)} MPa and pressure potential ${f(p)} MPa. What is its water potential, in MPa?</p>`, answer: s + p, tol: 0.005, atol: 0.005, unit: 'MPa', solution: R`<p>$${f(s)} + ${f(p)} = ${f(s + p)}$ MPa.</p>` }; } },
    { title: 'Potometer', gen(r) { const d = r.int(5, 80), t = r.int(1, 10), rad = r.step(0.25, 1, 0.05); const v = Math.PI * rad * rad * d / t; return { q: R`<p>A potometer bubble moves ${d} mm in ${t} min in a capillary of radius ${f(rad)} mm. What is the water uptake rate, in mm³/min?</p>`, answer: v, tol: 0.01, unit: 'mm³/min', solution: R`<p>$\pi(${f(rad)})^2\times${d}/${t} = ${f(v)}$ mm³/min.</p>` }; } },
    { title: 'Isotonic sucrose', gen(r) { const C = r.step(0.1, 0.8, 0.05), T = r.int(15, 30); const P = -C * 0.00831 * (T + 273); return { q: R`<p>Tissue shows no mass change in ${f(C)} mol/L sucrose at ${T} °C. What is its water potential, in MPa?</p>`, answer: P, tol: 0.01, unit: 'MPa', solution: R`<p>$-${f(C)}\times0.00831\times${T + 273} = ${f(P)}$ MPa.</p>` }; } }
  ]);
})();
