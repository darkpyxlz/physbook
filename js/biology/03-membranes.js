(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-membranes', subject: 'biology', num: 3, part: 'Cells and Molecules',
    title: 'Membranes and Transport',
    subtitle: R`The fluid mosaic membrane and how substances cross it: diffusion, osmosis, facilitated and active transport, and the ion gradients that make membrane potentials.`,
    goals: ['Describe the fluid mosaic model', 'Apply Fick\'s law of diffusion', 'Explain osmosis using water potential', 'Distinguish passive and active transport', 'Calculate equilibrium potentials with the Nernst equation'],
    sections: [
      {
        title: 'The fluid mosaic model',
        html: R`
<p>A membrane is a <strong>phospholipid bilayer</strong>, about 7 nm thick, with proteins floating in it like tiles in a moving mosaic. The hydrophobic core blocks ions and large polar molecules; small non-polar molecules (O₂, CO₂, steroids) pass straight through.</p>
<ul>
<li><strong>Channel proteins</strong>: water-filled pores for specific ions, often gated by voltage or a ligand. Aquaporins speed up water movement.</li>
<li><strong>Carrier proteins</strong>: bind a molecule and change shape to move it across.</li>
<li><strong>Glycoproteins and glycolipids</strong>: carbohydrate chains on the outside for cell recognition and signalling.</li>
<li><strong>Cholesterol</strong>: buffers fluidity, stiffening a warm membrane and stopping a cold one from freezing.</li>
</ul>
<p>Unsaturated fatty acid tails increase fluidity; organisms adapted to the cold have more of them.</p>`
      },
      {
        title: 'Diffusion',
        html: R`
<p><strong>Diffusion</strong> is the net movement of particles from high to low concentration by random motion. It needs no energy. Across a membrane, <strong>Fick's law</strong> gives the rate:</p>
$$\text{rate} \propto \frac{\text{surface area} \times \text{concentration difference}}{\text{thickness}}, \qquad J = -D\frac{\Delta c}{\Delta x}.$$
<p>Exchange surfaces are therefore large, thin and kept steep by flow on both sides: alveoli (about 70 m² of surface, 0.5 μm thick), villi, gills with countercurrent flow.</p>
<p><strong>Facilitated diffusion</strong> uses channel or carrier proteins but is still downhill. Because the number of carriers is limited, the rate saturates at high concentration, like an enzyme.</p>`
      },
      {
        title: 'Osmosis and water potential',
        html: R`
<p><strong>Osmosis</strong> is the net movement of water across a partially permeable membrane from higher to lower <strong>water potential</strong>, $\Psi$. Pure water at atmospheric pressure has $\Psi = 0$; everything else is negative.</p>
$$\Psi = \Psi_s + \Psi_p, \qquad \Psi_s = -iCRT$$
<p>where $i$ is the number of particles each solute unit gives (1 for sucrose, 2 for NaCl), $C$ the concentration in mol/L, $R = 0.00831$ L MPa mol⁻¹ K⁻¹ and $T$ in kelvin. Pressure potential $\Psi_p$ is positive in a turgid plant cell pushing on its wall.</p>
<ul>
<li>Animal cells in a hypotonic solution swell and burst (lysis); in a hypertonic one they shrink (crenation).</li>
<li>Plant cells in a hypotonic solution become turgid; in a hypertonic one the protoplast pulls away from the wall: <strong>plasmolysis</strong>.</li>
</ul>
<details class="example"><summary><span class="lbl">Worked example</span> What is the solute potential of 0.3 mol/L sucrose at 25 °C?<span class="tog">Solution</span></summary><div class="sol"><p>$\Psi_s = -(1)(0.3)(0.00831)(298) = -0.74$ MPa.</p></div></details>`
      },
      {
        title: 'Active transport and bulk transport',
        html: R`
<p><strong>Active transport</strong> moves substances against their concentration gradient using ATP. The <strong>sodium–potassium pump</strong> exports 3 Na⁺ and imports 2 K⁺ per ATP; it uses about a quarter of a resting human's ATP and up to two-thirds of a neuron's.</p>
<p><strong>Secondary active transport</strong> (co-transport) lets one gradient drive another: the Na⁺–glucose symporter in the gut uses the Na⁺ gradient made by the pump to pull glucose in against its gradient.</p>
<p>Large particles move by <strong>endocytosis</strong> (the membrane engulfs them; phagocytosis for solids) and <strong>exocytosis</strong> (vesicles fuse with the membrane to release their contents, as in secretion of hormones and neurotransmitters).</p>`
      },
      {
        title: 'Membrane potentials',
        html: R`
<p>Because the pump and selective channels separate ions, the inside of a cell is negative, typically −70 mV. For a single ion the voltage that exactly balances its concentration gradient is the <strong>Nernst potential</strong>:</p>
$$E = \frac{RT}{zF}\ln\frac{[\text{out}]}{[\text{in}]} \approx \frac{61.5\ \text{mV}}{z}\log_{10}\frac{[\text{out}]}{[\text{in}]}\quad(37\ ^\circ\text{C}).$$
<p>With several permeable ions the resting potential is a weighted compromise, given by the <strong>Goldman–Hodgkin–Katz equation</strong>:</p>
$$V_m = 61.5\log_{10}\frac{P_K[\mathrm{K}^+]_o + P_{Na}[\mathrm{Na}^+]_o + P_{Cl}[\mathrm{Cl}^-]_i}{P_K[\mathrm{K}^+]_i + P_{Na}[\mathrm{Na}^+]_i + P_{Cl}[\mathrm{Cl}^-]_o}.$$
<p>At rest K⁺ permeability dominates, so $V_m$ lies near $E_K$. During an action potential Na⁺ channels open and $V_m$ swings towards $E_{Na}$ (chapter 14).</p>
<div class="key"><strong>Key idea.</strong> Membrane potential is set by which ions the membrane lets through, and their gradients. Raise external K⁺ and neurons and heart cells depolarise: this is why potassium chloride injected into the blood stops the heart.</div>`
      }
    ],
    labs: [
      { sim: 'ghk', title: 'Resting and action potentials', desc: 'Set the ion concentrations and the relative permeability of Na⁺ to K⁺. The bars show each ion\'s Nernst potential and the membrane potential from the GHK equation.',
        tasks: ['With the default values, how far is the resting potential from E_K? Why not exactly at it?', 'Raise external K⁺ from 5 to 20 mM. What happens to the resting potential?', 'Switch to the peak of the action potential. Which equilibrium potential does V_m now approach?'] }
    ],
    formulas: [
      ['Fick\'s law', R`J = -D\,\dfrac{\Delta c}{\Delta x}`],
      ['Water potential', R`\Psi = \Psi_s + \Psi_p`],
      ['Solute potential', R`\Psi_s = -iCRT`],
      ['Nernst potential (37 °C)', R`E = \dfrac{61.5}{z}\log_{10}\dfrac{c_o}{c_i}\ \text{mV}`],
      ['Na⁺/K⁺ pump', R`3\,\mathrm{Na^+_{out}},\ 2\,\mathrm{K^+_{in}}\ \text{per ATP}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Passes the bilayer', q: R`<p>Which substance crosses a phospholipid bilayer most easily without proteins?</p>`, options: ['Na⁺', 'Glucose', 'O₂', 'Amino acids'], answer: 2, hints: [R`Small and non-polar.`], solution: R`<p>O₂ is small and non-polar and dissolves in the hydrophobic core.</p>` },
      { level: 'concept', type: 'mcq', title: 'Plasmolysis', q: R`<p>A plant cell is placed in concentrated salt solution. What happens?</p>`, options: ['It bursts', 'Water leaves and the protoplast pulls away from the wall', 'Salt enters and the cell swells', 'Nothing, because the wall is rigid'], answer: 1, hints: [R`Water moves to the lower water potential.`], solution: R`<p>Water leaves by osmosis and the cell plasmolyses.</p>` },
      { level: 'concept', type: 'mcq', title: 'Saturating rate', q: R`<p>The rate of glucose uptake levels off at high external glucose concentration. This shows uptake is by…</p>`, options: ['Simple diffusion', 'A limited number of carrier proteins', 'Osmosis', 'Exocytosis'], answer: 1, hints: [R`Simple diffusion rises linearly.`], solution: R`<p>Carriers saturate, so the rate plateaus.</p>` },
      { level: 'core', type: 'num', title: 'Solute potential', q: R`<p>Find the solute potential of 0.2 mol/L NaCl at 27 °C, in MPa. Take $i = 2$ and $R = 0.00831$ L MPa mol⁻¹ K⁻¹.</p>`, answer: -0.997, tol: 0.01, unit: 'MPa', hints: [R`$T = 300$ K.`], solution: R`<p>$-2(0.2)(0.00831)(300) = -1.00$ MPa.</p>` },
      { level: 'core', type: 'num', title: 'Water potential of a cell', q: R`<p>A cell has solute potential −0.9 MPa and pressure potential 0.4 MPa. What is its water potential?</p>`, answer: -0.5, tol: 0.002, unit: 'MPa', hints: [R`Add them.`], solution: R`<p>$-0.9 + 0.4 = -0.5$ MPa.</p>` },
      { level: 'core', type: 'num', title: 'Potassium potential', q: R`<p>[K⁺] is 140 mM inside and 4 mM outside. Find E_K at 37 °C, in mV.</p>`, answer: -95, tol: 0.01, unit: 'mV', hints: [R`$61.5\log_{10}(4/140)$.`], solution: R`<p>$61.5\times\log_{10}(0.0286) = 61.5\times(-1.544) = -95$ mV.</p>` },
      { level: 'core', type: 'num', title: 'Calcium potential', q: R`<p>Ca²⁺ is 2 mM outside and 0.0001 mM inside a cell. Find E_Ca at 37 °C, in mV.</p>`, answer: 132.3, tol: 0.01, unit: 'mV', hints: [R`$z = 2$.`], solution: R`<p>$(61.5/2)\log_{10}(20\,000) = 30.75\times4.301 = 132$ mV.</p>` },
      { level: 'core', type: 'num', title: 'Fick\'s law', q: R`<p>A disease doubles the thickness of the alveolar membrane and halves its area. By what factor does the diffusion rate change?</p>`, answer: 0.25, tol: 0.002, unit: '×', hints: [R`Rate ∝ area / thickness.`], solution: R`<p>$(1/2)/2 = 1/4$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Equilibrium concentration', q: R`<p>A cell has resting potential −80 mV. If Cl⁻ is at equilibrium and [Cl⁻] outside is 120 mM, what is [Cl⁻] inside, in mM? Use 61.5 mV at 37 °C.</p>`, answer: 6.0, tol: 0.02, unit: 'mM', hints: [R`$z = -1$: $-80 = -61.5\log_{10}(c_o/c_i)$.`], solution: R`<p>$\log_{10}(c_o/c_i) = 1.301$, so $c_o/c_i = 20.0$ and $c_i = 6.0$ mM.</p>` },
      { level: 'olympiad', type: 'num', title: 'GHK resting potential', q: R`<p>Ignoring Cl⁻: K⁺ is 140 mM in, 5 mM out; Na⁺ is 15 mM in, 145 mM out; $P_{Na}/P_K = 0.05$. Find the resting potential at 37 °C, in mV.</p>`, answer: -65.2, tol: 0.01, unit: 'mV', hints: [R`$61.5\log_{10}\frac{5 + 0.05(145)}{140 + 0.05(15)}$.`], solution: R`<p>$\frac{12.25}{140.75} = 0.0870$, and $61.5\log_{10}(0.0870) = 61.5\times(-1.060) = -65.2$ mV, a little above $E_K = -89$ mV because of the Na⁺ leak.</p>` },
      { level: 'olympiad', type: 'num', title: 'Pump energy', q: R`<p>Moving one mole of Na⁺ out of a cell costs $\Delta G = RT\ln(c_o/c_i) + zFV$, with $c_o/c_i = 10$, $V$ the potential outside minus inside $= +70$ mV, $T = 310$ K. Find $\Delta G$ in kJ/mol.</p>`, answer: 12.69, tol: 0.02, unit: 'kJ/mol', hints: [R`$RT\ln10 = 5.93$ kJ/mol; $FV = 96485\times0.070$.`], solution: R`<p>$5.93 + 6.75 = 12.7$ kJ/mol. Three Na⁺ cost 38 kJ, which ATP (about 50 kJ/mol in the cell) can just pay together with the K⁺ step.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-membranes', [
    { title: 'Nernst potential', gen(r) { const ion = r.pick([['K⁺', 1, 120, 160, 2, 10], ['Na⁺', 1, 5, 20, 130, 150], ['Cl⁻', -1, 4, 30, 100, 130], ['Ca²⁺', 2, 0.0001, 0.0001, 1, 3]]); const ci = r.step(ion[2], ion[3], ion[2] < 1 ? 0.0001 : 1), co = r.step(ion[4], ion[5], ion[4] < 5 ? 0.5 : 1); const E = 61.5 / ion[1] * Math.log10(co / ci); return { q: R`<p>${ion[0]} is ${ci} mM inside and ${co} mM outside. Find its Nernst potential at 37 °C, in mV.</p>`, answer: E, tol: 0.01, unit: 'mV', solution: R`<p>$E = \frac{61.5}{${ion[1]}}\log_{10}\frac{${co}}{${ci}} = ${f(E)}$ mV.</p>` }; } },
    { title: 'Solute potential', gen(r) { const C = r.step(0.05, 1.0, 0.05), i = r.pick([[1, 'sucrose'], [2, 'NaCl'], [3, 'CaCl₂']]), T = r.int(273, 310); const P = -i[0] * C * 0.00831 * T; return { q: R`<p>Find the solute potential of ${f(C)} mol/L ${i[1]} at ${T} K, in MPa ($R = 0.00831$ L MPa mol⁻¹ K⁻¹).</p>`, answer: P, tol: 0.01, unit: 'MPa', solution: R`<p>$-${i[0]}\times${f(C)}\times0.00831\times${T} = ${f(P)}$ MPa.</p>` }; } },
    { title: 'Fick\'s law', gen(r) { const a = r.pick([0.5, 2, 3, 4]), t = r.pick([0.5, 2, 3]), d = r.pick([0.5, 2, 4]); const v = a * d / t; return { q: R`<p>The surface area is multiplied by ${a}, the concentration difference by ${d} and the membrane thickness by ${t}. By what factor does the diffusion rate change?</p>`, answer: v, tol: 0.005, unit: '×', solution: R`<p>$${a}\times${d}/${t} = ${f(v)}$.</p>` }; } }
  ]);
})();
