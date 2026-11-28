/* Physical chemistry chapters following Atkins' Physical Chemistry: Focus 4–5 (phase equilibria), 10 (molecular
   symmetry), 11–12 (molecular spectroscopy and magnetic resonance), 13 (statistical thermodynamics),
   16, 18–19 (molecules in motion, reaction dynamics, surfaces). Original text. */
(function () {
  const { R, f, S, QN, QM, P, M } = PB.tbKit();
  const Rg = 8.314, kB = 1.380649e-23, h = 6.62607e-34, c = 2.99792e10, NA = 6.02214e23; // c in cm/s
  const RT = Rg * 298 / 1000;

  /* ================= Atkins Focus 4–5: phase equilibria ================= */
  const bp = (dH, Tb, p) => 1 / (1 / Tb - Rg * Math.log(p) / (dH * 1000));
  const vp = (dH, Tb, T) => Math.exp(-dH * 1000 / Rg * (1 / T - 1 / Tb));
  PB.tbChapter({
    id: 'chem-phases', subject: 'chemistry', title: 'Phase Equilibria',
    subtitle: R`When substances melt, boil, sublime and mix. Chemical potential as the driver of phase changes, phase diagrams with triple and critical points, the phase rule, the Clapeyron and Clausius–Clapeyron equations, Trouton's rule, and the vapour pressures and distillation of ideal mixtures (Raoult's law).`,
    big: 'Each phase of a substance has a chemical potential (its molar Gibbs energy), and matter flows to whichever phase has the lowest. How that potential changes with temperature and pressure draws the boundaries on a phase diagram, and simple equations predict, for example, the temperature at which water boils on a mountain or in a pressure cooker.',
    goals: ['Explain phase stability using chemical potential and its temperature and pressure dependence', 'Read phase diagrams: phase boundaries, triple point, critical point, supercritical fluids', 'Apply the phase rule F = C − P + 2', 'Use the Clapeyron and Clausius–Clapeyron equations and Trouton’s rule', 'Apply Raoult’s law to ideal binary mixtures and explain fractional distillation and azeotropes', 'Estimate pressure effects on melting points'],
    prereqs: ['chem-gibbs'],
    sections: [
      { title: 'Chemical potential and phase stability', plain: 'Every phase has a chemical potential, its molar Gibbs energy, and the phase with the lowest potential is stable; raising the temperature favours phases with high entropy (gas), and raising the pressure favours denser phases.', html: R`
<p>For a pure substance, the <strong>chemical potential</strong> μ of a phase is its molar Gibbs energy. At any temperature and pressure, the phase with the <strong>lowest μ</strong> is stable; two phases coexist where their potentials are equal. How μ changes follows from $dG = V\,dp - S\,dT$:</p>
<div class="key"><p>$\left(\dfrac{\partial\mu}{\partial T}\right)_p = -S_m \qquad \left(\dfrac{\partial\mu}{\partial p}\right)_T = V_m$</p></div>
<p>All entropies are positive, so μ falls as temperature rises, most steeply for gases (largest $S_m$), then liquids, then solids. At low temperature the solid has the lowest μ; heating makes first the liquid, then the gas, the lowest: melting and boiling. Raising the pressure raises μ most for the phase with the largest molar volume, so pressure favours denser phases.</p>
<div class="worked"><p>Is freezing spontaneous for supercooled water at −10 °C? ($\Delta H_{\text{fus}} = 6.01$ kJ/mol, $\Delta S_{\text{fus}} = 22.0$ J/(K mol), taken as constant.)</p>
<p>For freezing, $\Delta G = -6010 + 263\cdot22.0 = -224$ J/mol: negative, so supercooled water will freeze once a crystal nucleus forms. At 273 K, $\Delta G = 0$: the melting point is where $T = \Delta H/\Delta S$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`As temperature rises at constant pressure, the chemical potential of the gas phase falls fastest because…`, ['the gas has the largest molar entropy', 'the gas has the smallest volume', 'gases have no intermolecular forces', 'the gas is the most stable phase'], 0, [R`$\partial\mu/\partial T = -S_m$.`], R`The slope is $-S_m$, steepest for the high-entropy gas.`)] },
      { title: 'Phase diagrams of pure substances', plain: 'A phase diagram maps which phase is stable at each temperature and pressure; lines show where two phases coexist, three meet at the triple point, the liquid–gas line ends at the critical point, and the phase rule counts how many conditions can change freely.', html: R`
<p>A <strong>phase diagram</strong> shows the stable phase at each temperature and pressure. Along <strong>phase boundaries</strong> two phases coexist; at the <strong>triple point</strong> all three do; the liquid–vapour boundary ends at the <strong>critical point</strong>, beyond which liquid and gas cannot be told apart: a <strong>supercritical fluid</strong>.</p>
<ul><li><strong>Water</strong>: triple point 273.16 K and 611 Pa; critical point 647 K and 221 bar. Its solid–liquid line slopes slightly <em>backwards</em> because ice is less dense than water, so pressure lowers the melting point.</li>
<li><strong>Carbon dioxide</strong>: triple point at 5.11 atm and 217 K, so at 1 atm solid CO₂ (dry ice) sublimes rather than melts; critical point 304 K and 73.8 bar. Supercritical CO₂ dissolves caffeine and is used to decaffeinate coffee.</li></ul>
<h3 class="sub">The phase rule</h3>
<p>Gibbs's <strong>phase rule</strong> counts the variables (temperature, pressure, compositions) that can be changed independently while keeping $P$ phases in equilibrium with $C$ components:</p>
<div class="key"><p>$F = C - P + 2$</p></div>
<div class="worked"><p>How many degrees of freedom does a pure substance have at its triple point? On a boiling curve?</p>
<p>Triple point: $F = 1 - 3 + 2 = 0$: a single fixed point (which is why the triple point of water once defined the kelvin). Two phases: $F = 1$: choose the pressure and the boiling temperature is fixed.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Dry ice sublimes at atmospheric pressure because…`, ['CO₂’s triple-point pressure (5.11 atm) is above 1 atm', 'CO₂ has no liquid phase', 'it is below its critical temperature', 'it is an ionic solid'], 0, [R`Below the triple-point pressure there is no stable liquid.`], R`At 1 atm, solid passes directly to gas.`)] },
      { title: 'The Clapeyron and Clausius–Clapeyron equations', plain: 'The slope of a phase boundary is set by the enthalpy and volume change of the transition; for boiling this gives an equation linking vapour pressure to temperature, which predicts boiling points at different pressures.', html: R`
<p>Along any phase boundary, the <strong>Clapeyron equation</strong> gives the slope:</p>
<div class="key"><p>$\dfrac{dp}{dT} = \dfrac{\Delta H_{\text{trs}}}{T\,\Delta V_{\text{trs}}}$</p></div>
<p>For melting, $\Delta V$ is tiny, so the line is steep. For water, $\Delta V_{\text{fus}} = -1.63\ \text{cm}^3/\text{mol}$, so $dT/dp = T\Delta V/\Delta H = 273\cdot(-1.63\times10^{-6})/6010 = -7.4\times10^{-8}$ K/Pa, only −0.0075 K per atmosphere.</p>
<p>For vaporisation, treat the vapour as ideal and neglect the liquid's volume. Integrating gives the <strong>Clausius–Clapeyron equation</strong>:</p>
<div class="key"><p>$\ln\dfrac{p_2}{p_1} = -\dfrac{\Delta H_{\text{vap}}}{R}\left(\dfrac{1}{T_2} - \dfrac{1}{T_1}\right)$</p></div>
<div class="worked"><p>At the top of a 3000 m mountain the pressure is about 0.70 atm. At what temperature does water boil? ($\Delta H_{\text{vap}} = 40.7$ kJ/mol)</p>
<p>$\dfrac{1}{T} = \dfrac{1}{373.15} - \dfrac{8.314\ln0.70}{40\,700} = 0.0026799 + 0.0000729$, so $T = 363$ K = 90 °C: pasta cooks noticeably slower. In a pressure cooker at 2 atm, water boils at about 121 °C.</p></div>
<div data-fig="0"></div>
<p><strong>Trouton's rule</strong>: many liquids have $\Delta S_{\text{vap}} \approx 85$ J/(K mol), so $\Delta H_{\text{vap}} \approx 85\,T_b$. Liquids with hydrogen bonding (water, 109 J/(K mol)) exceed it, because the liquid is more ordered.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Estimate the enthalpy of vaporisation (kJ/mol) of a liquid boiling at 350 K, using Trouton's rule.`, 85 * 350 / 1000, [R`$\Delta H \approx 85T_b$ J/mol.`], R`$29.8$ kJ/mol.`)] },
      { title: 'Mixtures and distillation', plain: 'In an ideal mixture each liquid contributes vapour pressure in proportion to its mole fraction (Raoult’s law), so the vapour is richer in the more volatile liquid, which is how distillation separates liquids, until an azeotrope stops it.', html: R`
<p>In an <strong>ideal solution</strong>, each component's partial vapour pressure is its pure vapour pressure times its mole fraction in the liquid (<strong>Raoult's law</strong>):</p>
<div class="key"><p>$p_A = x_A p_A^*,\qquad p = x_A p_A^* + x_B p_B^*,\qquad y_A = \dfrac{x_Ap_A^*}{p}$</p></div>
<div class="worked"><p>A 50 : 50 (mole) benzene–toluene mixture at 25 °C: $p^*_{\text{benzene}} = 12.7$ kPa, $p^*_{\text{toluene}} = 3.8$ kPa. Find the vapour pressure and the vapour composition.</p>
<p>$p = 6.35 + 1.90 = 8.25$ kPa; $y_{\text{benzene}} = 6.35/8.25 = 0.77$. The vapour is enriched in the more volatile benzene; condensing and re-evaporating it repeatedly (each a "theoretical plate" in a fractionating column) gives nearly pure benzene.</p></div>
<div data-fig="1"></div>
<p>Real mixtures deviate. Where unlike molecules attract each other less than like ones, vapour pressures are higher than Raoult predicts and a minimum-boiling <strong>azeotrope</strong> can form, which distils unchanged: ethanol and water give 95.6% ethanol at best by distillation. Stronger unlike attractions give maximum-boiling azeotropes (HCl–water). Mixtures of solids often have a <strong>eutectic</strong>: the composition with the lowest melting point (tin–lead solder; salt on icy roads).</p>
<p>The colligative properties (boiling-point elevation, freezing-point depression, osmotic pressure) all follow from a solute lowering the solvent's chemical potential.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A mixture has $x_A = 0.3$ with $p_A^* = 20$ kPa and $p_B^* = 5$ kPa. What is the mole fraction of A in the vapour?`, 6 / 9.5, [R`$y_A = x_Ap_A^*/p$.`], R`$p = 6 + 3.5 = 9.5$ kPa; $y_A = 0.63$.`)] }
    ],
    figures: [
      { s: 2, title: 'Vapour pressure and boiling', caption: 'Vapour pressure of a liquid against temperature (Clausius–Clapeyron). It boils where its vapour pressure equals the outside pressure.', params: { aspect: 0.4, minH: 210, controls: [S('dH', 'ΔH_vap', 20, 60, 0.5, 40.7, 'kJ/mol'), S('pe', 'Outside pressure', 0.2, 3, 0.01, 0.7, 'atm')],
        plots: [{ x: [270, 430], y: [0, 3.2], xlabel: 'T (K)', ylabel: 'vapour pressure (atm)', curves: (v) => [{ f: (T) => vp(v.dH, 373.15, T) }], hlines: (v) => [{ y: v.pe, label: 'outside' }], vlines: (v) => [{ x: bp(v.dH, 373.15, v.pe) }] }],
        readout: (v) => [['boiling point', f(bp(v.dH, 373.15, v.pe)) + ' K = ' + f(bp(v.dH, 373.15, v.pe) - 273.15) + ' °C']] } },
      { s: 3, title: 'Raoult’s law', caption: 'Total vapour pressure of an ideal mixture of A (more volatile) and B against liquid composition, with the composition of the vapour in equilibrium.', params: { aspect: 0.4, minH: 210, controls: [S('pa', 'p*_A', 1, 30, 0.1, 12.7, 'kPa'), S('pb', 'p*_B', 1, 30, 0.1, 3.8, 'kPa'), S('x', 'Liquid mole fraction of A', 0, 1, 0.01, 0.5)],
        plots: [{ x: [0, 1], y: [0, 31], xlabel: 'mole fraction of A', ylabel: 'pressure (kPa)', curves: (v) => [{ f: (x) => x * v.pa + (1 - x) * v.pb, label: 'liquid (bubble point)' }, { f: (y) => v.pa * v.pb / (v.pa - (v.pa - v.pb) * y), color: 'rust', label: 'vapour (dew point)' }], pts: (v) => { const p = v.x * v.pa + (1 - v.x) * v.pb; return [{ x: v.x, y: p }, { x: v.x * v.pa / p, y: p, color: 'rust' }]; } }],
        readout: (v) => { const p = v.x * v.pa + (1 - v.x) * v.pb; return [['total p', f(p) + ' kPa'], ['vapour y_A', f(v.x * v.pa / p)]]; } } }
    ],
    labs: [{ sim: 'explore', title: 'Boiling on mountains and in pressure cookers', desc: 'Boiling point of a liquid against outside pressure, from the Clausius–Clapeyron equation, starting from its normal boiling point and enthalpy of vaporisation.',
      tasks: ['At what temperature does water boil on Everest (0.33 atm)?', 'What pressure makes water boil at 120 °C?', 'Why does ethanol’s boiling point change more slowly with pressure than water’s?'],
      params: { aspect: 0.42, controls: [S('Tb', 'Normal boiling point', 250, 450, 0.5, 373.15, 'K'), S('dH', 'ΔH_vap', 15, 60, 0.1, 40.7, 'kJ/mol'), S('p', 'Outside pressure', 0.1, 5, 0.01, 0.7, 'atm')],
        plots: [{ x: [0.1, 5], y: [250, 480], xlabel: 'pressure (atm)', ylabel: 'boiling point (K)', curves: (v) => [{ f: (p) => bp(v.dH, v.Tb, p) }], pts: (v) => [{ x: v.p, y: bp(v.dH, v.Tb, v.p) }] }],
        readout: (v) => [['boiling point', f(bp(v.dH, v.Tb, v.p)) + ' K (' + f(bp(v.dH, v.Tb, v.p) - 273.15) + ' °C)'], ['Trouton estimate of ΔH', f(0.085 * v.Tb) + ' kJ/mol']] } }],
    formulas: [['Chemical potential', 'd\\mu = V_m\\,dp - S_m\\,dT'], ['Phase rule', 'F = C - P + 2'], ['Clapeyron', '\\dfrac{dp}{dT} = \\dfrac{\\Delta H}{T\\Delta V}'], ['Clausius–Clapeyron', '\\ln\\dfrac{p_2}{p_1} = -\\dfrac{\\Delta H_{\\text{vap}}}{R}\\left(\\dfrac1{T_2} - \\dfrac1{T_1}\\right)'], ['Trouton', '\\Delta S_{\\text{vap}} \\approx 85\\ \\text{J K}^{-1}\\text{mol}^{-1}'], ['Raoult', 'p_A = x_Ap_A^*']],
    problems: [
      M('concept', 'Triple point', R`How many degrees of freedom does a one-component system have at its triple point?`, ['0', '1', '2', '3'], 0, [R`$F = C - P + 2$.`], R`$1 - 3 + 2 = 0$.`),
      M('concept', 'Water’s melting line', R`Water's solid–liquid boundary slopes backwards (melting point falls with pressure) because…`, ['ice is less dense than liquid water', 'ice has lower entropy', 'water has hydrogen bonds', 'melting is endothermic'], 0, [R`Clapeyron: sign of ΔV.`], R`$\Delta V_{\text{fus}} < 0$, so $dp/dT < 0$.`),
      M('concept', 'Supercritical fluids', R`Above its critical point, a substance…`, ['has no distinct liquid and gas phases', 'is always solid', 'cannot dissolve anything', 'boils at room temperature'], 0, [R`The liquid–vapour boundary ends.`], R`Liquid and vapour merge into one supercritical fluid.`),
      M('concept', 'Azeotropes', R`Why can't simple distillation give pure ethanol from aqueous ethanol?`, ['A minimum-boiling azeotrope (95.6% ethanol) distils unchanged', 'Ethanol decomposes on boiling', 'Water boils first', 'Raoult’s law is exact for ethanol–water'], 0, [R`The vapour has the same composition as the liquid.`], R`At the azeotrope, distillation stops separating.`),
      P('core', 'num', 'Supercooled water', R`$\Delta H_{\text{fus}} = 6.01$ kJ/mol, $\Delta S_{\text{fus}} = 22.0$ J/(K mol). ΔG for freezing at 263 K (J/mol)?`, -6010 + 263 * 22, [R`$\Delta G = -\Delta H + T\Delta S$ for freezing.`], R`$-224$ J/mol.`, { tol: 0.03 }),
      P('core', 'num', 'Boiling on a mountain', R`Water ($\Delta H_{\text{vap}} = 40.7$ kJ/mol) at 0.70 atm boils at what temperature (°C)?`, bp(40.7, 373.15, 0.7) - 273.15, [R`Clausius–Clapeyron.`], R`$90.1$ °C.`),
      P('core', 'num', 'Pressure cooker', R`At what temperature (°C) does water boil at 2.0 atm?`, bp(40.7, 373.15, 2) - 273.15, [R`Same equation with $p = 2$.`], R`$121$ °C.`),
      P('core', 'num', 'Raoult vapour pressure', R`Equimolar benzene ($p^* = 12.7$ kPa) and toluene ($3.8$ kPa). Total vapour pressure (kPa)?`, 8.25, [R`Average the two.`], R`$8.25$ kPa.`),
      P('core', 'num', 'Vapour composition', R`For that mixture, what is the mole fraction of benzene in the vapour?`, 6.35 / 8.25, [R`$y = x p^*/p$.`], R`$0.77$.`),
      P('core', 'num', 'Melting under pressure', R`By how many kelvin does 100 atm lower the melting point of ice? ($dT/dp = -7.4\times10^{-8}$ K/Pa; 1 atm = 101 325 Pa)`, 7.4e-8 * 100 * 101325, [R`Multiply.`], R`$0.75$ K.`),
      P('olympiad', 'num', 'Vapour pressure of ethanol', R`Ethanol boils at 351.4 K with $\Delta H_{\text{vap}} = 38.6$ kJ/mol. Estimate its vapour pressure at 298 K (kPa).`, 101.325 * vp(38.6, 351.4, 298), [R`Clausius–Clapeyron from 101.3 kPa.`], R`$\ln(p/101.3) = -2.37$: about 9.5 kPa (measured 7.9 kPa; ΔH is not constant).`),
      P('olympiad', 'num', 'Melting ice by pressure', R`What pressure (atm) would lower the melting point of ice to −1 °C?`, 1 / (7.4e-8 * 101325), [R`$\Delta p = \Delta T/(dT/dp)$.`], R`$1/(7.5\times10^{-3}) \approx 134$ atm.`),
      P('olympiad', 'num', 'Eutectic freedom', R`At constant pressure, how many degrees of freedom does a two-component mixture have at its eutectic, where two solids and the liquid coexist?`, 0, [R`At fixed pressure, $F′ = C - P + 1$.`], R`$2 - 3 + 1 = 0$: the eutectic temperature and composition are fixed.`),
      P('olympiad', 'num', 'Everest', R`Water boils at what temperature (°C) on Everest, where the pressure is 0.33 atm?`, bp(40.7, 373.15, 0.33) - 273.15, [R`Clausius–Clapeyron.`], R`About 71 °C.`)
    ],
    drills: [
      { title: 'Boiling points', gen: (r) => { const p = r.pick([0.3, 0.5, 0.7, 0.8, 1.5, 2, 3]); return { q: R`<p>Water ($\Delta H_{\text{vap}} = 40.7$ kJ/mol) at ${p} atm: boiling point in °C?</p>`, answer: bp(40.7, 373.15, p) - 273.15, tol: 0.005, solution: R`<p>Clausius–Clapeyron: ${f(bp(40.7, 373.15, p) - 273.15, 4)} °C.</p>` }; } },
      { title: 'Raoult’s law', gen: (r) => { const pa = r.pick([10, 15, 20, 30]), pb = r.pick([2, 4, 6]), x = r.pick([0.2, 0.4, 0.5, 0.7]); const p = x * pa + (1 - x) * pb; return { q: R`<p>$x_A = ${x}$, $p_A^* = ${pa}$ kPa, $p_B^* = ${pb}$ kPa. Vapour mole fraction of A?</p>`, answer: x * pa / p, tol: 0.01, solution: R`<p>$${x}\cdot${pa}/${f(p, 4)} = ${f(x * pa / p, 4)}$.</p>` }; } }
    ],
    predict: { q: 'At the top of a mountain where the pressure is 0.7 atm, water boils at about…', o: ['90 °C', '100 °C', '110 °C'], a: 0, how: 'set the outside pressure to 0.7 atm in the boiling lab.', why: 'Lower outside pressure is matched by the vapour pressure at a lower temperature: about 90 °C by Clausius–Clapeyron.' },
    wild: ['Freeze-drying', 'Freeze-drying coffee, vaccines and space food works below water’s triple-point pressure: ice sublimes straight to vapour, leaving the structure intact.']
  });

  /* ================= Atkins Focus 10: molecular symmetry ================= */
  const MOL = {
    h2o: ['H₂O', 'C2v', 3], nh3: ['NH₃', 'C3v', 4], ch4: ['CH₄', 'Td', 5], bf3: ['BF₃', 'D3h', 4], co2: ['CO₂', 'D∞h', 3], c6h6: ['benzene', 'D6h', 12], sf6: ['SF₆', 'Oh', 7], ch2cl2: ['CH₂Cl₂', 'C2v', 5],
    pcl5: ['PCl₅', 'D3h', 6], tdce: ['trans-C₂H₂Cl₂', 'C2h', 6], cdce: ['cis-C₂H₂Cl₂', 'C2v', 6], chfclbr: ['CHFClBr', 'C1', 5], ethane: ['ethane (staggered)', 'D3d', 8], xef4: ['XeF₄', 'D4h', 5], h2o2: ['H₂O₂', 'C2', 4], hcl: ['HCl', 'C∞v', 2]
  };
  const ORDER = { C1: 1, C2: 2, Cs: 2, C2v: 4, C3v: 6, C2h: 4, D3h: 12, D3d: 12, D4h: 16, D6h: 24, Td: 24, Oh: 48, 'D∞h': '∞', 'C∞v': '∞' };
  const POLAR = ['C1', 'C2', 'Cs', 'C2v', 'C3v', 'C∞v'], CHIRAL = ['C1', 'C2'];
  const linear = (k) => ['co2', 'hcl'].indexOf(k) >= 0;
  PB.tbChapter({
    id: 'chem-symmetry', subject: 'chemistry', title: 'Molecular Symmetry',
    subtitle: R`The geometry behind spectra and properties. Symmetry elements and operations, classifying molecules into point groups, what symmetry says about polarity and chirality, counting vibrations, and which vibrations show up in infrared and Raman spectra.`,
    big: 'A molecule’s symmetry is a shortcut to many of its properties. Spot its rotation axes, mirror planes and centre of inversion, name its point group, and you can say at once whether it can have a dipole moment, whether it can be chiral, and which of its vibrations an infrared spectrometer will see.',
    goals: ['Identify symmetry elements: rotation axes, mirror planes, inversion centres and improper axes', 'Assign point groups with a systematic flowchart', 'Use point groups to decide whether a molecule can be polar or chiral', 'Count vibrational modes (3N − 6 or 3N − 5)', 'Predict IR and Raman activity, including the rule of mutual exclusion', 'Relate symmetry to degeneracy'],
    prereqs: ['chem-shapes'],
    sections: [
      { title: 'Symmetry elements and operations', plain: 'A symmetry operation moves a molecule into a position that looks identical; the operations are rotations about axes, reflections in mirror planes, inversion through a centre, and rotation followed by reflection.', html: R`
<p>A <strong>symmetry operation</strong> leaves a molecule looking unchanged; the line, plane or point it acts about is the <strong>symmetry element</strong>. There are five kinds:</p>
<ul><li><strong>E</strong>, the identity (do nothing);</li>
<li><strong>Cₙ</strong>, rotation by 360°/n about an axis; the highest-order axis is the principal axis;</li>
<li><strong>σ</strong>, reflection in a mirror plane: σᵥ contains the principal axis, σₕ is perpendicular to it, σ_d bisects two C₂ axes;</li>
<li><strong>i</strong>, inversion through a centre: every atom at (x, y, z) has a partner at (−x, −y, −z);</li>
<li><strong>Sₙ</strong>, an improper rotation: rotate by 360°/n, then reflect in the perpendicular plane. Note S₁ = σ and S₂ = i.</li></ul>
<p>Examples: H₂O has E, a C₂ axis and two mirror planes. NH₃ has a C₃ axis and three σᵥ. Methane has four C₃ axes (along each C–H bond), three C₂ axes, three S₄ axes and six mirror planes. Benzene has a C₆ axis, six C₂ axes, a horizontal mirror plane, six vertical-type planes and a centre of inversion.</p>
<div class="worked"><p>List all the symmetry operations of NH₃.</p>
<p>E; C₃ and C₃² (rotations by 120° and 240°); three reflections σᵥ. Six operations in all: the <strong>order</strong> of its point group is 6.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many C₃ axes does methane have?`, 4, [R`One along each C–H bond.`], R`4.`)] },
      { title: 'Point groups', plain: 'The full set of a molecule’s symmetry operations is its point group, found with a short flowchart: check for linearity and very high symmetry, find the main rotation axis, then look for perpendicular two-fold axes and mirror planes.', html: R`
<p>The set of all symmetry operations of a molecule forms a mathematical group, its <strong>point group</strong>. A flowchart assigns it:</p>
<ol><li>Linear? With a centre of inversion, D∞h (CO₂, N₂); without, C∞v (HCl, HCN).</li>
<li>Very high symmetry? Tetrahedral Td (CH₄), octahedral Oh (SF₆), icosahedral Ih (C₆₀).</li>
<li>Find the principal axis Cₙ. Are there n C₂ axes perpendicular to it? If yes, a D group: with σₕ, Dₙh (BF₃, PCl₅: D₃h; benzene: D₆h; XeF₄: D₄h); with σ_d but no σₕ, Dₙd (staggered ethane: D₃d); neither, Dₙ.</li>
<li>If no perpendicular C₂ axes: with σₕ, Cₙh (trans-dichloroethene: C₂h); with σᵥ, Cₙv (H₂O: C₂v; NH₃: C₃v); neither, Cₙ (H₂O₂: C₂).</li>
<li>No proper axis at all: a mirror plane only, Cs; an inversion centre only, Ci; nothing, C₁ (CHFClBr).</li></ol>
<div class="worked"><p>Assign point groups to cis- and trans-1,2-dichloroethene.</p>
<p>Trans: a C₂ axis perpendicular to the molecular plane, the molecular plane as σₕ, and an inversion centre: C₂h. Cis: a C₂ axis in the plane, bisecting the C=C bond, and two σᵥ (the molecular plane and the plane perpendicular to it): C₂v.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`What is the point group of BF₃ (trigonal planar)?`, ['D₃h', 'C₃v', 'D₃d', 'Td'], 0, [R`C₃ axis, three perpendicular C₂, a horizontal plane.`], R`D₃h.`)] },
      { title: 'Polarity and chirality from symmetry', plain: 'A molecule can have a dipole moment only if its symmetry does not cancel it, which limits polar molecules to a few point groups; a molecule is chiral only if it has no improper rotation axis, including mirror planes and inversion centres.', html: R`
<p>A dipole moment is a vector; it must be unchanged by every symmetry operation. It therefore cannot point perpendicular to any rotation axis or mirror plane, and an inversion centre rules it out completely. Only molecules in the groups <strong>C₁, Cₙ, Cs and Cₙv</strong> (including C∞v) can be <strong>polar</strong>.</p>
<ul><li>H₂O (C₂v) and CH₂Cl₂ (C₂v): polar, dipole along the C₂ axis.</li>
<li>CO₂ (D∞h), BF₃ (D₃h), CCl₄ (Td), XeF₄ (D₄h), trans-dichloroethene (C₂h): non-polar, despite polar bonds.</li></ul>
<p>A molecule is <strong>chiral</strong> (not superimposable on its mirror image) if and only if it has <strong>no improper rotation axis Sₙ</strong>, which includes mirror planes (S₁) and inversion centres (S₂). Chiral molecules belong to Cₙ or Dₙ groups (or C₁). Hydrogen peroxide (C₂) is chiral, though it twists between its enantiomers far too fast to resolve. Some molecules with no stereocentre at all are chiral: 1,3-dichloroallene, ClHC=C=CHCl, belongs to C₂.</p>
<div class="worked"><p>Can a molecule with an S₄ axis but no mirror plane be chiral?</p>
<p>No: any improper axis, even S₄ alone, makes a molecule superimposable on its mirror image. Such molecules are rare but exist, and they are achiral despite having stereocentres.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which molecule is non-polar?`, ['CCl₄', 'CHCl₃', 'CH₂Cl₂', 'CH₃Cl'], 0, [R`Which belongs to a group with no polar direction?`], R`CCl₄ is Td: the four bond dipoles cancel.`)] },
      { title: 'Symmetry and vibrational spectra', plain: 'A molecule of N atoms has 3N − 6 ways to vibrate (3N − 5 if linear); a vibration absorbs infrared light only if it changes the dipole moment, appears in a Raman spectrum only if it changes the polarisability, and in centrosymmetric molecules no vibration does both.', html: R`
<p>A molecule of $N$ atoms has $3N$ degrees of freedom: 3 translations, 3 rotations (2 if linear), and the rest vibrations: <strong>3N − 6</strong> (non-linear) or <strong>3N − 5</strong> (linear) normal modes. Symmetry classifies each mode (by its "symmetry species" in the point group's character table) and decides which are seen:</p>
<ul><li>a mode is <strong>IR-active</strong> if it changes the dipole moment (it transforms like x, y or z);</li>
<li>a mode is <strong>Raman-active</strong> if it changes the polarisability (it transforms like x², xy, …);</li>
<li><strong>rule of mutual exclusion</strong>: in a molecule with a centre of inversion, no mode is both IR- and Raman-active.</li></ul>
<div class="worked"><p>Describe the vibrations of CO₂.</p>
<p>$3\cdot3 - 5 = 4$ modes. The symmetric stretch (1388 cm⁻¹) keeps the dipole zero: IR-inactive, Raman-active. The antisymmetric stretch (2349 cm⁻¹) and the doubly degenerate bend (667 cm⁻¹) create oscillating dipoles: IR-active, Raman-inactive. These IR absorptions are why CO₂ is a greenhouse gas; N₂ and O₂, with no IR-active modes, are not.</p></div>
<div data-fig="0"></div>
<p>Symmetry also explains <strong>degeneracy</strong>: in groups with a three-fold or higher axis, some orbitals and vibrations come in sets of two or three with identical energies, as for CO₂'s bend or the t₂ and e sets of d orbitals in tetrahedral and octahedral complexes.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many vibrational modes does benzene (C₆H₆) have?`, 30, [R`$3N - 6$ with $N = 12$.`], R`$36 - 6 = 30$.`)] }
    ],
    figures: [{ s: 3, title: 'Counting vibrations', caption: 'Number of vibrational modes against number of atoms, for non-linear (3N − 6) and linear (3N − 5) molecules.', params: { aspect: 0.4, minH: 210, controls: [S('N', 'Atoms N', 2, 20, 1, 3)],
      plots: [{ x: [2, 20], y: [0, 56], xlabel: 'atoms N', ylabel: 'vibrational modes', curves: () => [{ f: (n) => 3 * n - 6, label: 'non-linear' }, { f: (n) => 3 * n - 5, color: 'rust', dash: [4, 4], label: 'linear' }], pts: (v) => [{ x: v.N, y: Math.max(0, 3 * v.N - 6) }, { x: v.N, y: 3 * v.N - 5, color: 'rust' }] }],
      readout: (v) => [['non-linear', Math.max(0, 3 * v.N - 6)], ['linear', 3 * v.N - 5]] } }],
    labs: [{ sim: 'explore', title: 'Point-group explorer', desc: 'Pick a molecule to see its point group, the order of the group, whether symmetry allows a dipole moment or chirality, and how many vibrations it has.',
      tasks: ['Which molecules here can be polar? What do their point groups have in common?', 'Which molecule is chiral?', 'Compare cis- and trans-dichloroethene.'],
      params: { aspect: 0.4, controls: [{ id: 'm', type: 'select', label: 'Molecule', value: 'h2o', options: Object.keys(MOL).map((k) => [k, MOL[k][0]]) }],
        draw: (ctx, C, v, b) => { const m = MOL[v.m]; ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.font = '700 ' + Math.round(Math.min(b.w, b.h) * 0.16) + 'px sans-serif'; ctx.fillText(m[0], b.x + b.w / 2, b.y + b.h * 0.42); ctx.fillStyle = C.accent; ctx.font = '700 ' + Math.round(Math.min(b.w, b.h) * 0.2) + 'px sans-serif'; ctx.fillText(m[1], b.x + b.w / 2, b.y + b.h * 0.72); ctx.textAlign = 'start'; },
        readout: (v) => { const m = MOL[v.m], g = m[1]; return [['point group', g], ['order', String(ORDER[g])], ['can be polar?', POLAR.indexOf(g) >= 0 ? 'yes' : 'no'], ['chiral?', CHIRAL.indexOf(g) >= 0 ? 'yes' : 'no'], ['vibrations', String(linear(v.m) ? 3 * m[2] - 5 : 3 * m[2] - 6)]]; } } }],
    formulas: [['Vibrational modes', '3N - 6\\ (\\text{non-linear}),\\ 3N - 5\\ (\\text{linear})'], ['Polar point groups', 'C_1,\\ C_n,\\ C_s,\\ C_{nv}'], ['Chirality', '\\text{chiral} \\iff \\text{no } S_n\\ (S_1 = \\sigma,\\ S_2 = i)'], ['Mutual exclusion', 'i \\Rightarrow \\text{IR and Raman active modes are distinct}']],
    problems: [
      M('concept', 'Water', R`The point group of H₂O is…`, ['C₂v', 'C₃v', 'D₂h', 'Cs'], 0, [R`One C₂ axis and two vertical planes.`], R`C₂v.`),
      M('concept', 'Chirality', R`A molecule is chiral if and only if it lacks…`, ['any improper rotation axis Sₙ (including σ and i)', 'any rotation axis', 'a stereocentre', 'a dipole moment'], 0, [R`S₁ = σ, S₂ = i.`], R`No Sₙ of any order.`),
      M('concept', 'Mutual exclusion', R`For CO₂, which vibration is Raman-active?`, ['the symmetric stretch', 'the antisymmetric stretch', 'the bend', 'none'], 0, [R`It has an inversion centre.`], R`Only the symmetric stretch changes polarisability without a dipole change.`),
      M('concept', 'Greenhouse gases', R`Why is N₂ not a greenhouse gas?`, ['Its only vibration does not change the dipole moment, so it does not absorb IR', 'It is too light', 'It does not vibrate', 'It absorbs only visible light'], 0, [R`D∞h with a single stretch.`], R`Homonuclear diatomics have no IR-active vibration.`),
      P('core', 'num', 'Order of C₃ᵥ', R`How many symmetry operations are in the point group of NH₃?`, 6, [R`E, 2C₃, 3σᵥ.`], R`6.`),
      P('core', 'num', 'Methane vibrations', R`How many vibrational modes does CH₄ have?`, 9, [R`$3N - 6$.`], R`$15 - 6 = 9$.`),
      P('core', 'num', 'CO₂ vibrations', R`How many vibrational modes does CO₂ have?`, 4, [R`Linear: $3N - 5$.`], R`4.`),
      P('core', 'num', 'Order of D₃h', R`What is the order of the D₃h point group (BF₃)?`, 12, [R`E, 2C₃, 3C₂, σₕ, 2S₃, 3σᵥ.`], R`12.`),
      M('core', 'trans-Dichloroethene', R`trans-1,2-Dichloroethene belongs to…`, ['C₂h', 'C₂v', 'D₂h', 'Cs'], 0, [R`C₂ perpendicular to the plane, σₕ, i.`], R`C₂h, so it is non-polar.`),
      M('core', 'Polar or not', R`Which molecule has a dipole moment?`, ['SO₂', 'CO₂', 'BF₃', 'SF₆'], 0, [R`Bent molecules are C₂v.`], R`SO₂ is bent (C₂v); the others are non-polar by symmetry.`),
      P('olympiad', 'num', 'IR bands of CO₂', R`Counting degenerate modes separately, how many of CO₂'s vibrational modes are IR-active?`, 3, [R`Antisymmetric stretch plus the doubly degenerate bend.`], R`$1 + 2 = 3$.`),
      P('olympiad', 'num', 'Benzene mirror planes', R`How many mirror planes does benzene have?`, 7, [R`One horizontal plus six vertical-type.`], R`7.`),
      P('olympiad', 'num', 'SF₆ four-fold axes', R`How many C₄ axes does octahedral SF₆ have?`, 3, [R`One through each opposite pair of F atoms.`], R`3.`),
      P('olympiad', 'num', 'Ethane modes', R`How many vibrational modes does ethane (C₂H₆) have?`, 18, [R`$3\cdot8 - 6$.`], R`18.`)
    ],
    drills: [
      { title: 'Counting modes', gen: (r) => { const N = r.int(2, 14), lin = N === 2 || r.pick([false, false, true]); return { q: R`<p>A ${lin ? 'linear' : 'non-linear'} molecule with ${N} atoms: number of vibrational modes?</p>`, answer: lin ? 3 * N - 5 : Math.max(0, 3 * N - 6), tol: 0.0001, solution: R`<p>${lin ? '$3N - 5 = ' + (3 * N - 5) + '$' : '$3N - 6 = ' + (3 * N - 6) + '$'}.</p>` }; } }
    ],
    predict: { q: 'Does boron trifluoride, BF₃, have a dipole moment?', o: ['No: its symmetry cancels the bond dipoles', 'Yes, pointing towards one fluorine', 'Yes, along the three-fold axis'], a: 0, how: 'pick BF₃ in the point-group explorer.', why: 'BF₃ is D₃h: a dipole would have to lie along the C₃ axis, but the horizontal mirror plane forbids that too.' },
    wild: ['Seeing the greenhouse effect', 'Symmetry rules explain why CO₂, H₂O and CH₄ absorb Earth’s infrared radiation while N₂ and O₂, which make up 99% of the air, do not.']
  });

  /* ================= Atkins Focus 11–12: molecular spectroscopy ================= */
  const kTcm = (T) => kB * T / (h * c); // kT in cm⁻¹
  const rotLine = (B, T, J) => (2 * J + 1) * Math.exp(-B * J * (J + 1) / kTcm(T));
  PB.tbChapter({
    id: 'chem-molspec', subject: 'chemistry', title: 'Molecular Spectroscopy',
    subtitle: R`What light reveals about molecules. Energy levels and the Beer–Lambert law, rotational spectra and bond lengths, vibrational spectra, force constants and isotope shifts, anharmonicity and bond energies, electronic transitions, and the physics of NMR and EPR.`,
    big: 'Molecules absorb light only at energies matching the gaps between their quantised levels: microwaves set them spinning, infrared makes their bonds vibrate, visible and ultraviolet light lift electrons, and radio waves flip nuclear spins in a magnet. Measure where they absorb, and you can calculate bond lengths, bond strengths and molecular structures.',
    goals: ['Relate wavelength, frequency, wavenumber and energy; use the Beer–Lambert law', 'Analyse rotational spectra of diatomics to find bond lengths', 'Relate vibrational wavenumbers to force constants and reduced mass; predict isotope shifts', 'Explain anharmonicity, overtones and dissociation energies', 'Describe electronic transitions, fluorescence and phosphorescence', 'Calculate NMR resonance frequencies and population differences'],
    prereqs: ['chem-spectro', 'chem-atom'],
    sections: [
      { title: 'Light, levels and absorbance', plain: 'Different kinds of light probe different motions: microwaves rotation, infrared vibration, visible and ultraviolet electrons, radio waves nuclear spins; how much light a sample absorbs is proportional to its concentration and path length.', html: R`
<p>A photon of frequency ν carries energy $E = h\nu = hc/\lambda = hc\tilde\nu$, where $\tilde\nu = 1/\lambda$ is the <strong>wavenumber</strong>, usually in cm⁻¹ (1 cm⁻¹ corresponds to 11.96 J/mol). Molecules absorb only photons that match a gap between their energy levels, subject to <strong>selection rules</strong>:</p>
<div class="table-wrap"><table class="data"><tr><th>Region</th><th>Typical $\tilde\nu$</th><th>Motion</th></tr><tr><td>radio</td><td>~0.01 cm⁻¹</td><td>nuclear spin flips (NMR)</td></tr><tr><td>microwave</td><td>1–100 cm⁻¹</td><td>rotation</td></tr><tr><td>infrared</td><td>400–4000 cm⁻¹</td><td>vibration</td></tr><tr><td>visible/UV</td><td>14 000–50 000 cm⁻¹</td><td>electronic transitions</td></tr></table></div>
<p>How strongly a sample absorbs follows the <strong>Beer–Lambert law</strong>:</p>
<div class="key"><p>$A = \log_{10}\dfrac{I_0}{I} = \varepsilon c l$</p></div>
<p>with molar absorption coefficient ε (M⁻¹ cm⁻¹), concentration $c$ and path length $l$.</p>
<div class="worked"><p>A dye with ε = 15 000 M⁻¹ cm⁻¹ gives A = 0.75 in a 1.00 cm cell. What is its concentration, and what fraction of light gets through?</p>
<p>$c = 0.75/15\,000 = 5.0\times10^{-5}$ M. Transmittance $10^{-0.75} = 0.18$: 18% passes.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A solution has absorbance 2.0. What percentage of light is transmitted?`, 1, [R`$T = 10^{-A}$.`], R`$10^{-2} = 1\%$.`)] },
      { title: 'Rotational spectra and bond lengths', plain: 'A spinning molecule has quantised rotational energies set by its moment of inertia; its microwave spectrum is a ladder of equally spaced lines whose spacing gives the bond length very precisely.', html: R`
<p>A diatomic molecule rotates like a rigid dumbbell with moment of inertia $I = \mu r^2$, where $\mu = m_1m_2/(m_1 + m_2)$ is the <strong>reduced mass</strong>. Its rotational energies are quantised:</p>
<div class="key"><p>$E_J = hcBJ(J + 1),\qquad B = \dfrac{h}{8\pi^2cI}\ (\text{in cm}^{-1}),\qquad J = 0, 1, 2, \dots$</p></div>
<p>Only polar molecules have pure rotational spectra, and the selection rule $\Delta J = \pm1$ gives lines at $2B, 4B, 6B, \dots$: equally spaced by $2B$. Line intensities follow the populations: each level has $2J + 1$ states but a Boltzmann factor, so the intensity peaks near $J_{\max} \approx \sqrt{kT/2hcB} - \tfrac12$.</p>
<div class="worked"><p>H³⁵Cl has $B = 10.59\ \text{cm}^{-1}$. Find its bond length.</p>
<p>$I = h/(8\pi^2cB) = 6.626\times10^{-34}/(78.96\cdot2.998\times10^{10}\cdot10.59) = 2.64\times10^{-47}\ \text{kg m}^2$. $\mu = (1\cdot35/36)\ \text{u} = 1.614\times10^{-27}$ kg. $r = \sqrt{I/\mu} = 1.28\times10^{-10}$ m = 128 pm.</p></div>
<div data-fig="0"></div>
<p>Rotational <strong>Raman</strong> spectra follow $\Delta J = \pm2$ and work even for non-polar molecules such as N₂ and H₂.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Rotational lines of a molecule are spaced by 3.86 cm⁻¹. What is $B$?`, 1.93, [R`Spacing $= 2B$.`], R`$1.93\ \text{cm}^{-1}$ (this is CO).`)] },
      { title: 'Vibrational spectra', plain: 'A bond vibrates like a spring: stiffer bonds and lighter atoms vibrate faster, so the infrared frequency gives the force constant, swapping in a heavier isotope lowers it predictably, and real bonds are anharmonic, giving overtones and finite bond energies.', html: R`
<p>Near its equilibrium length, a bond acts as a spring with force constant $k$. The harmonic oscillator has equally spaced levels $E_v = (v + \tfrac12)hc\tilde\nu$ with</p>
<div class="key"><p>$\tilde\nu = \dfrac{1}{2\pi c}\sqrt{\dfrac{k}{\mu}}$</p></div>
<p>The selection rule is $\Delta v = \pm1$, and the vibration must change the dipole moment. Stiffer bonds (triple > double > single) and lighter atoms vibrate faster: C–H stretches lie near 3000 cm⁻¹, C=O near 1700, C–C near 1000.</p>
<div class="worked"><p>H³⁵Cl absorbs at 2886 cm⁻¹. Find the force constant, and predict where D³⁵Cl absorbs.</p>
<p>$k = \mu(2\pi c\tilde\nu)^2 = 1.614\times10^{-27}\cdot(2\pi\cdot2.998\times10^{10}\cdot2886)^2 = 477$ N/m. The force constant is the same for DCl, but $\mu$ becomes $2\cdot35/37 = 1.892$ u: $\tilde\nu_D = 2886\sqrt{0.9722/1.892} = 2069\ \text{cm}^{-1}$ (observed 2091). Isotope shifts let chemists assign which atoms move in a vibration.</p></div>
<p>Real bonds are <strong>anharmonic</strong>: the potential (well described by the Morse function) flattens at long range, so levels converge, overtones ($\Delta v = 2, 3$) appear weakly, and the bond eventually breaks. The energy needed from the lowest level, $D_0$, is the well depth $D_e$ minus the zero-point energy $\tfrac12hc\tilde\nu$.</p>
<div data-fig="1"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which molecule has no infrared absorption?`, ['N₂', 'CO', 'HCl', 'H₂O'], 0, [R`The vibration must change the dipole.`], R`A homonuclear diatomic has no dipole at any bond length.`)] },
      { title: 'Electronic spectra and magnetic resonance', plain: 'Visible and ultraviolet light move electrons between orbitals, after which molecules may glow (fluoresce) or lose the energy as heat; in a magnetic field, nuclear and electron spins have slightly different energies, which NMR and EPR detect with radio waves and microwaves.', html: R`
<p>Electronic transitions (π → π*, n → π*, d–d in transition-metal complexes, charge transfer) happen so fast that nuclei do not move during them (the <strong>Franck–Condon principle</strong>), so absorption bands contain vibrational structure. An excited molecule may return to the ground state by emitting light quickly (<strong>fluorescence</strong>, nanoseconds, from a singlet state), slowly via a triplet state (<strong>phosphorescence</strong>, up to seconds), or non-radiatively as heat.</p>
<h3 class="sub">NMR</h3>
<p>Nuclei with spin $I = \tfrac12$ (¹H, ¹³C, ¹⁹F, ³¹P) have two energy levels in a magnetic field $B_0$, separated by $h\nu$ with the <strong>Larmor frequency</strong> $\nu = \gamma B_0/2\pi$; for ¹H, $\gamma/2\pi = 42.58$ MHz/T, so a 9.4 T magnet gives a "400 MHz" spectrometer. The gap is tiny compared with $kT$, so the population difference is minute, which is why NMR needs concentrated samples or strong magnets.</p>
<div class="worked"><p>At 400 MHz and 298 K, what is the fractional population difference between the two ¹H spin states?</p>
<p>$\Delta E/kT = h\nu/kT = (6.626\times10^{-34}\cdot4\times10^8)/(4.11\times10^{-21}) = 6.4\times10^{-5}$. The excess in the lower state is about half of this: roughly 32 nuclei per million. NMR still works because there are about $10^{20}$ protons in a sample.</p></div>
<p>Electrons in the shielding environment of a molecule change the field each nucleus feels, giving <strong>chemical shifts</strong> (in ppm, independent of the magnet); neighbouring nuclei split signals by <strong>spin–spin coupling</strong>. <strong>EPR</strong> applies the same idea to unpaired electrons (about 28 GHz per tesla), detecting radicals and transition-metal ions. MRI images the distribution of water protons in the body.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the ¹H resonance frequency (MHz) in an 11.7 T magnet?`, 42.58 * 11.7, [R`$42.58$ MHz/T.`], R`About 498 MHz ("500 MHz").`)] }
    ],
    figures: [
      { s: 1, title: 'A rotational spectrum', caption: 'Relative intensities of the rotational lines of a diatomic at temperature T. Lines sit at 2B(J + 1); intensity follows the population of level J.', params: { aspect: 0.4, minH: 210, controls: [S('B', 'Rotational constant B', 0.5, 20, 0.1, 10.59, 'cm⁻¹'), S('T', 'Temperature', 50, 1000, 10, 298, 'K')],
        plots: [{ x: [0, 300], y: [0, 1.05], xlabel: 'wavenumber (cm⁻¹)', ylabel: 'relative intensity', pts: (v) => { const L = []; let mx = 0; for (let J = 0; J < 60; J++) mx = Math.max(mx, rotLine(v.B, v.T, J)); for (let J = 0; J < 60 && 2 * v.B * (J + 1) < 300; J++) L.push({ x: 2 * v.B * (J + 1), y: rotLine(v.B, v.T, J) / mx, r: 4 }); return L; } }],
        readout: (v) => [['line spacing', f(2 * v.B) + ' cm⁻¹'], ['most populated J', String(Math.max(0, Math.round(Math.sqrt(kTcm(v.T) / (2 * v.B)) - 0.5)))]] } },
      { s: 2, title: 'Harmonic and Morse potentials', caption: 'Potential energy of a bond against its length: the harmonic approximation (dashed) and the anharmonic Morse curve, which flattens to the dissociation energy.', params: { aspect: 0.4, minH: 210, controls: [S('De', 'Well depth Dₑ', 100, 600, 5, 445, 'kJ/mol'), S('a', 'Steepness a', 1, 3, 0.05, 1.9, '1/Å')],
        plots: [{ x: [0.5, 4], y: [0, 700], xlabel: 'bond length (Å)', ylabel: 'energy (kJ/mol)', curves: (v) => [{ f: (r) => v.De * Math.pow(1 - Math.exp(-v.a * (r - 1.27)), 2), label: 'Morse' }, { f: (r) => v.De * Math.pow(v.a * (r - 1.27), 2), color: 'ink3', dash: [4, 4], label: 'harmonic' }], hlines: (v) => [{ y: v.De, label: 'Dₑ' }] }] } }
    ],
    labs: [{ sim: 'explore', title: 'Bonds from spectra', desc: 'Choose the masses of a diatomic and its measured rotational constant and vibrational wavenumber. The lab calculates the bond length and force constant.',
      tasks: ['HCl: masses 1 and 35, B = 10.59, wavenumber 2886. Find r and k.', 'Change H to D (mass 2). How do B and the wavenumber change?', 'CO: masses 12 and 16, B = 1.93, wavenumber 2143. Compare its bond stiffness with HCl.'],
      params: { aspect: 0.4, controls: [S('m1', 'Mass 1 (u)', 1, 40, 1, 1), S('m2', 'Mass 2 (u)', 1, 130, 1, 35), S('B', 'Rotational constant B', 0.1, 60, 0.01, 10.59, 'cm⁻¹'), S('w', 'Vibrational wavenumber', 100, 4500, 1, 2886, 'cm⁻¹')],
        plots: [{ x: [0, 4500], y: [0, 2500], xlabel: 'wavenumber (cm⁻¹)', ylabel: 'force constant (N/m)', curves: (v) => { const mu = v.m1 * v.m2 / (v.m1 + v.m2) * 1.66054e-27; return [{ f: (x) => mu * Math.pow(2 * Math.PI * c * x, 2) }]; }, pts: (v) => { const mu = v.m1 * v.m2 / (v.m1 + v.m2) * 1.66054e-27; return [{ x: v.w, y: mu * Math.pow(2 * Math.PI * c * v.w, 2) }]; } }],
        readout: (v) => { const mu = v.m1 * v.m2 / (v.m1 + v.m2) * 1.66054e-27, I = h / (8 * Math.PI * Math.PI * c * v.B), r = Math.sqrt(I / mu); return [['reduced mass', f(v.m1 * v.m2 / (v.m1 + v.m2), 4) + ' u'], ['bond length', f(r * 1e12) + ' pm'], ['force constant', f(mu * Math.pow(2 * Math.PI * c * v.w, 2)) + ' N/m']]; } } }],
    formulas: [['Photon energy', 'E = hc\\tilde\\nu'], ['Beer–Lambert', 'A = \\varepsilon c l'], ['Rotational levels', 'E_J = hcBJ(J + 1),\\ B = \\dfrac{h}{8\\pi^2 c\\mu r^2}'], ['Vibration', '\\tilde\\nu = \\dfrac{1}{2\\pi c}\\sqrt{k/\\mu}'], ['Larmor frequency', '\\nu = \\gamma B_0/2\\pi'], ['Population ratio', 'N_{\\text{upper}}/N_{\\text{lower}} = e^{-\\Delta E/kT}']],
    problems: [
      M('concept', 'Microwave spectra', R`Microwave spectroscopy measures transitions between…`, ['rotational levels', 'vibrational levels', 'electronic levels', 'nuclear spin states'], 0, [R`1–100 cm⁻¹.`], R`Rotational levels.`),
      M('concept', 'Rotational selection rule', R`Which molecule has a pure rotational (microwave) spectrum?`, ['CO', 'CO₂', 'N₂', 'CH₄'], 0, [R`It needs a permanent dipole.`], R`Only CO is polar.`),
      M('concept', 'Fluorescence', R`Phosphorescence lasts much longer than fluorescence because…`, ['it involves a spin-forbidden transition from a triplet state', 'the molecules are larger', 'the light has more energy', 'it happens in solids only'], 0, [R`Spin must flip.`], R`Triplet → singlet emission is spin-forbidden, so slow.`),
      M('concept', 'NMR sensitivity', R`NMR is an insensitive technique mainly because…`, ['the energy gap between spin states is tiny compared with kT, so the population difference is minute', 'nuclei are small', 'radio waves are weak', 'only ¹H nuclei have spin'], 0, [R`Compare hν with kT.`], R`Only a few nuclei per million contribute net absorption.`),
      P('core', 'num', 'Concentration', R`ε = 15 000 M⁻¹ cm⁻¹, $A = 0.75$, $l = 1$ cm. Concentration (units of $10^{-5}$ M)?`, 5, [R`$c = A/\varepsilon l$.`], R`$5.0\times10^{-5}$ M.`),
      P('core', 'num', 'HCl bond length', R`H³⁵Cl has $B = 10.59\ \text{cm}^{-1}$. Bond length (pm)?`, 1e12 * Math.sqrt(h / (8 * Math.PI * Math.PI * c * 10.59) / (35 / 36 * 1.66054e-27)), [R`$I = h/(8\pi^2cB)$, $r = \sqrt{I/\mu}$.`], R`$128$ pm.`),
      P('core', 'num', 'Line spacing', R`What is the spacing between adjacent rotational lines of HCl ($B = 10.59\ \text{cm}^{-1}$), in cm⁻¹?`, 21.18, [R`$2B$.`], R`$21.2\ \text{cm}^{-1}$.`),
      P('core', 'num', 'Force constant', R`H³⁵Cl absorbs at 2886 cm⁻¹. Force constant (N/m)?`, 35 / 36 * 1.66054e-27 * Math.pow(2 * Math.PI * c * 2886, 2), [R`$k = \mu(2\pi c\tilde\nu)^2$, with $c$ in cm/s.`], R`$477$ N/m.`),
      P('core', 'num', 'Isotope shift', R`Predict the D³⁵Cl vibrational wavenumber from H³⁵Cl at 2886 cm⁻¹.`, 2886 * Math.sqrt((35 / 36) / (70 / 37)), [R`$\tilde\nu \propto 1/\sqrt\mu$.`], R`$2069\ \text{cm}^{-1}$.`),
      P('core', 'num', 'NMR frequency', R`¹H resonance frequency (MHz) at 9.4 T?`, 42.58 * 9.4, [R`$42.58$ MHz/T.`], R`$400$ MHz.`),
      P('olympiad', 'num', 'Most intense line', R`For HCl ($B = 10.59\ \text{cm}^{-1}$) at 298 K ($kT/hc = 207$ cm⁻¹), which J level is most populated? Use $J_{\max} \approx \sqrt{kT/2hcB} - \tfrac12$ and round.`, 3, [R`$\sqrt{207/21.18} - 0.5$.`], R`$3.13 - 0.5 = 2.6$, so J = 3.`),
      P('olympiad', 'num', 'Excess spins', R`At 400 MHz and 298 K, roughly how many excess ¹H nuclei per million are in the lower spin state?`, 1e6 * h * 4e8 / (kB * 298) / 2, [R`Excess fraction $\approx \Delta E/2kT$.`], R`About 32 per million.`),
      P('olympiad', 'num', 'Bond energy', R`A bond has well depth $D_e = 445$ kJ/mol and vibrational wavenumber 2990 cm⁻¹. Find $D_0$ (kJ/mol), the energy to break it from the ground state.`, 445 - 0.5 * 2990 * 11.963 / 1000, [R`ZPE $= \tfrac12\tilde\nu$; 1 cm⁻¹ = 11.96 J/mol.`], R`ZPE = 17.9 kJ/mol; $D_0 = 427$ kJ/mol.`),
      P('olympiad', 'num', 'Raman rotational lines', R`Rotational Raman lines of a linear molecule occur at shifts $4B(J + \tfrac32)$. For N₂ ($B = 1.99\ \text{cm}^{-1}$), where is the first line (J = 0), in cm⁻¹?`, 6 * 1.99, [R`$6B$.`], R`$11.9\ \text{cm}^{-1}$.`)
    ],
    drills: [
      { title: 'Beer–Lambert', gen: (r) => { const e = r.pick([500, 2000, 5000, 15000, 40000]), A = r.pick([0.2, 0.4, 0.6, 0.8, 1.2]); return { q: R`<p>ε = ${e} M⁻¹ cm⁻¹, A = ${A}, 1 cm cell. Concentration (μM)?</p>`, answer: A / e * 1e6, tol: 0.01, solution: R`<p>$${A}/${e} = ${f(A / e * 1e6, 4)}$ μM.</p>` }; } },
      { title: 'Isotope shifts', gen: (r) => { const w = r.pick([2886, 2990, 3000, 4160]); return { q: R`<p>An X–H stretch at ${w} cm⁻¹ (X heavy): predict the X–D stretch, using $\tilde\nu_D \approx \tilde\nu_H/\sqrt2$.</p>`, answer: w / Math.SQRT2, tol: 0.01, solution: R`<p>$${w}/\sqrt2 = ${f(w / Math.SQRT2, 4)}\ \text{cm}^{-1}$.</p>` }; } }
    ],
    predict: { q: 'If hydrogen in HCl is replaced by deuterium, the spacing between rotational lines will…', o: ['roughly halve', 'double', 'stay the same'], a: 0, how: 'change mass 1 from 1 to 2 in the bonds lab and compare B (spacing 2B ∝ 1/μ).', why: 'B ∝ 1/μ, and μ almost doubles (0.97 u to 1.89 u) while the bond length stays the same.' },
    wild: ['MRI scanners', 'Hospital MRI uses the same physics as NMR: hydrogen nuclei in water precess at about 64 MHz in a 1.5 T magnet, and field gradients turn their signals into images.']
  });

  /* ================= Atkins Focus 13: statistical thermodynamics ================= */
  const ladder = (eps, T, n) => { const b = eps * 1000 / (Rg * T), w = Array.from({ length: n }, (_, i) => Math.exp(-b * i)), q = w.reduce((a, x) => a + x, 0); return { w: w, q: q, p: w.map((x) => x / q) }; };
  const schottky = (x) => x === 0 ? 0 : x * x * Math.exp(x) / Math.pow(1 + Math.exp(x), 2);
  PB.tbChapter({
    id: 'chem-statmech', subject: 'chemistry', title: 'Statistical Thermodynamics',
    subtitle: R`From molecules to bulk properties. Configurations and the Boltzmann distribution, the partition function as the number of accessible states, translational, rotational and vibrational partition functions, internal energy, heat capacity and entropy from molecular energy levels, residual entropy, and equilibrium constants from molecular properties.`,
    big: 'Thermodynamics describes heat and equilibrium without mentioning molecules; statistical thermodynamics explains it from them. At temperature T, molecules spread over their energy levels following the Boltzmann distribution, and one quantity, the partition function, which counts how many levels are effectively accessible, gives the energy, entropy and even equilibrium constants.',
    goals: ['Count configurations and explain why the Boltzmann distribution is the most probable', 'Calculate population ratios and partition functions for simple systems', 'Estimate translational, rotational and vibrational partition functions', 'Derive internal energy and heat capacity from the partition function', 'Use S = k ln W to explain residual entropy', 'Explain equilibrium constants in terms of partition functions and symmetry numbers'],
    prereqs: ['chem-gibbs'],
    sections: [
      { title: 'The Boltzmann distribution', plain: 'There are vastly more ways to share energy among molecules in some arrangements than others; the overwhelmingly most likely arrangement puts exponentially fewer molecules in higher energy levels, the Boltzmann distribution.', html: R`
<p>Share a fixed total energy among $N$ molecules, each with levels $\varepsilon_0, \varepsilon_1, \dots$. A particular set of populations $\{n_i\}$ (a <strong>configuration</strong>) can be achieved in</p>
<div class="key"><p>$W = \dfrac{N!}{n_0!\,n_1!\,n_2!\cdots}$</p></div>
<p>ways. For large $N$ one configuration is overwhelmingly more probable than all others, and maximising $W$ (with fixed total energy and number) gives the <strong>Boltzmann distribution</strong>:</p>
<div class="key"><p>$\dfrac{n_i}{N} = \dfrac{g_ie^{-\varepsilon_i/kT}}{q}$</p></div>
<p>where $g_i$ is the degeneracy of level $i$ and $q$ normalises the populations. The ratio of populations in two levels depends only on their energy gap compared with $kT$ (about 2.5 kJ/mol, or 207 cm⁻¹, at room temperature).</p>
<div class="worked"><p>Four molecules share two levels. How many ways are there to have two in each level? All four in the lower one? And what is the population ratio of two levels 1.0 kJ/mol apart at 298 K?</p>
<p>$4!/(2!2!) = 6$ versus $4!/(4!0!) = 1$. Population ratio $e^{-1000/(8.314\cdot298)} = e^{-0.404} = 0.67$.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two non-degenerate levels are 5.0 kJ/mol apart. Ratio of upper to lower population at 298 K?`, Math.exp(-5 / RT), [R`$e^{-\Delta\varepsilon/RT}$ per mole.`], R`$e^{-2.02} = 0.13$.`)] },
      { title: 'The partition function', plain: 'The partition function adds up the Boltzmann weights of all a molecule’s states, so it tells you roughly how many states are accessible; it is enormous for movement in space, sizeable for rotation, and close to one for most vibrations at room temperature.', html: R`
<p>The <strong>molecular partition function</strong> $q = \sum_i g_ie^{-\varepsilon_i/kT}$ measures how many states are thermally accessible: at $T \to 0$ only the ground state counts and $q \to g_0$; as $T$ rises, more states join.</p>
<ul><li>Two levels with gap ε: $q = 1 + e^{-\varepsilon/kT}$, never more than 2.</li>
<li>Harmonic vibration: $q_V = 1/(1 - e^{-hc\tilde\nu/kT})$. For HCl at 298 K, $hc\tilde\nu/kT = 2886/207 = 14$, so $q_V = 1.000001$: virtually every molecule is in $v = 0$.</li>
<li>Rotation of a linear molecule: $q_R \approx kT/(\sigma hcB)$, with symmetry number σ = 2 for symmetric molecules such as N₂ and CO₂ and 1 otherwise. For HCl at 298 K, $q_R \approx 207/10.59 = 19.6$.</li>
<li>Translation in volume $V$: $q_T = V/\Lambda^3$, with thermal wavelength $\Lambda = h/\sqrt{2\pi mkT}$.</li></ul>
<div class="worked"><p>Find Λ for N₂ at 298 K, and the number of translational states per molecule in a molar volume of 24.8 L.</p>
<p>$m = 4.65\times10^{-26}$ kg; $\Lambda = h/\sqrt{2\pi mkT} = 1.91\times10^{-11}$ m (19 pm). $q_T/N = V_m/(N_A\Lambda^3) = 0.0248/(6.02\times10^{23}\cdot6.98\times10^{-33}) \approx 6\times10^6$: millions of translational states per molecule, which is why gases behave classically.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`For a harmonic oscillator with $hc\tilde\nu = kT$, what is the vibrational partition function?`, 1 / (1 - Math.exp(-1)), [R`$1/(1 - e^{-1})$.`], R`$1.58$.`)] },
      { title: 'Energy, heat capacity and entropy', plain: 'The partition function gives the average energy and heat capacity: heat capacity rises when the temperature becomes comparable to an energy gap, and entropy counts the ways of arranging the system, which explains why some crystals keep entropy even at absolute zero.', html: R`
<p>The internal energy follows from the partition function: $U - U(0) = NkT^2\,\dfrac{\partial\ln q}{\partial T}$. Heat capacity, $C_V = (\partial U/\partial T)_V$, shows when new modes "switch on":</p>
<ul><li>translation contributes $\tfrac32R$ per mole at all ordinary temperatures;</li>
<li>rotation contributes $R$ (linear) or $\tfrac32R$ (non-linear) once $kT \gg hcB$, which is true at room temperature except for H₂ at low temperature;</li>
<li>vibration contributes $R$ per mode only when $kT$ is comparable to $hc\tilde\nu$, so stiff bonds contribute almost nothing at room temperature. This "freezing out" puzzled classical physics and was explained by quantum theory.</li></ul>
<p>A two-level system has a heat capacity peak (a <strong>Schottky anomaly</strong>) near $kT \approx 0.4\varepsilon$, then falls again because the populations cannot change further.</p>
<div data-fig="1"></div>
<h3 class="sub">Entropy and residual entropy</h3>
<p>Boltzmann's formula $S = k\ln W$ links entropy to the number of microscopic arrangements. A perfect crystal at 0 K has $W = 1$ and $S = 0$ (the third law). But carbon monoxide molecules can freeze in randomly as CO or OC: $W = 2^N$, so a mole keeps $S = R\ln2 = 5.76$ J/(K mol) at absolute zero, close to the measured 4.6. Ice, with disordered hydrogen positions, keeps about $R\ln\tfrac32 = 3.4$ J/(K mol) (Pauling's estimate, matching experiment).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What residual molar entropy would a crystal have if each molecule could freeze in either of 3 orientations at random (J/(K mol))?`, 8.314 * Math.log(3), [R`$S = R\ln W$ per molecule's choices.`], R`$R\ln3 = 9.13$ J/(K mol).`)] },
      { title: 'Equilibrium constants from molecules', plain: 'Equilibrium constants can be calculated from the partition functions of the molecules involved, including their symmetry numbers and energy differences, which explains, for example, why isotopes mix as they do.', html: R`
<p>Since $\Delta G^\circ = -RT\ln K$ and $G$ can be written in terms of partition functions, $K$ can be calculated from molecular data: masses, bond lengths, vibrational frequencies and the energy difference between products and reactants. For a reaction such as A ⇌ B with molecular partition functions $q_A$ and $q_B$ (measured from their own ground states) and a ground-state energy difference $\Delta E_0$:</p>
<div class="key"><p>$K = \dfrac{q_B}{q_A}\,e^{-\Delta E_0/RT}$</p></div>
<p>So two effects compete: energy (favouring the lower ground state) and the number of accessible states (favouring the species with more, closer-spaced levels, an entropy effect).</p>
<div class="worked"><p>For H₂ + D₂ ⇌ 2HD, why does $K$ approach 4 at high temperature?</p>
<p>At high temperature the mass and energy effects nearly cancel, leaving the symmetry numbers: H₂ and D₂ have σ = 2, HD has σ = 1, so the rotational partition functions give $K = (\sigma_{H_2}\sigma_{D_2})/\sigma_{HD}^2 = 4$. Measured values approach 4 as T rises (3.3 at room temperature). Equivalently: randomly pairing H and D atoms gives HH : HD : DD = 1 : 2 : 1, and $2^2/(1\cdot1) = 4$.</p></div>
<p>Such calculations give equilibrium constants of gas reactions to high accuracy and underlie the thermodynamic tables chemists use.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two isomers have equal partition functions, but B lies 2.0 kJ/mol below A. What is $K = [\text{B}]/[\text{A}]$ at 298 K?`, Math.exp(2 / RT), [R`$e^{-\Delta E_0/RT}$ with $\Delta E_0 = -2.0$ kJ/mol.`], R`$e^{0.807} = 2.24$.`)] }
    ],
    figures: [
      { s: 0, title: 'Boltzmann populations', caption: 'Populations of an evenly spaced ladder of levels (like a vibration) at temperature T. Higher temperature spreads molecules upwards.', params: { aspect: 0.4, minH: 210, controls: [S('e', 'Level spacing', 0.1, 10, 0.1, 2.5, 'kJ/mol'), S('T', 'Temperature', 50, 2000, 10, 298, 'K')],
        plots: [{ x: [-0.5, 9.5], y: [0, 1.02], xlabel: 'level', ylabel: 'population fraction', pts: (v) => ladder(v.e, v.T, 10).p.map((p, i) => ({ x: i, y: p, r: 6 })) }],
        readout: (v) => { const L = ladder(v.e, v.T, 60); return [['partition function q', f(L.q, 4)], ['ground-state fraction', f(L.p[0], 4)]]; } } },
      { s: 2, title: 'A two-level heat capacity', caption: 'Heat capacity of a two-level system (per kN) against temperature, in units of the gap ε/k. It peaks and then falls: the Schottky anomaly.', params: { aspect: 0.4, minH: 210, controls: [S('t', 'Temperature (kT/ε)', 0.05, 3, 0.01, 0.42)],
        plots: [{ x: [0.02, 3], y: [0, 0.5], xlabel: 'kT / ε', ylabel: 'C / Nk', curves: () => [{ f: (t) => schottky(1 / t) }], pts: (v) => [{ x: v.t, y: schottky(1 / v.t) }] }],
        readout: (v) => [['C/Nk', f(schottky(1 / v.t), 3)], ['upper-level fraction', f(1 / (1 + Math.exp(1 / v.t)), 3)]] } }
    ],
    labs: [{ sim: 'explore', title: 'How many states are accessible?', desc: 'The partition function of an evenly spaced ladder of levels against temperature, compared with the high-temperature estimate kT/ε. It starts at 1 and grows as more levels become reachable.',
      tasks: ['At what temperature does q reach 2 for a 2.5 kJ/mol spacing?', 'Why is q for a C–H stretch (about 36 kJ/mol) still 1 at room temperature?', 'Compare q with kT/ε at high temperature.'],
      params: { aspect: 0.42, controls: [S('e', 'Level spacing ε', 0.1, 40, 0.1, 2.5, 'kJ/mol'), S('T', 'Temperature', 10, 3000, 10, 298, 'K')],
        plots: [{ x: [10, 3000], y: [0, 25], xlabel: 'T (K)', ylabel: 'partition function q', curves: (v) => [{ f: (T) => 1 / (1 - Math.exp(-v.e * 1000 / (Rg * T))), label: 'ladder' }, { f: (T) => Rg * T / (v.e * 1000), color: 'ink3', dash: [4, 4], label: 'kT/ε' }], pts: (v) => [{ x: v.T, y: 1 / (1 - Math.exp(-v.e * 1000 / (Rg * v.T))) }] }],
        readout: (v) => { const x = v.e * 1000 / (Rg * v.T); return [['ε / kT', f(x, 3)], ['q', f(1 / (1 - Math.exp(-x)), 4)], ['excited fraction', f(Math.exp(-x), 3)]]; } } }],
    formulas: [['Weight of a configuration', 'W = \\dfrac{N!}{\\prod n_i!'], ['Boltzmann distribution', '\\dfrac{n_i}{N} = \\dfrac{g_ie^{-\\varepsilon_i/kT}}{q}'], ['Vibrational q', 'q_V = \\dfrac{1}{1 - e^{-hc\\tilde\\nu/kT}}'], ['Rotational q (linear)', 'q_R \\approx \\dfrac{kT}{\\sigma hcB}'], ['Thermal wavelength', '\\Lambda = \\dfrac{h}{\\sqrt{2\\pi mkT}}'], ['Boltzmann entropy', 'S = k\\ln W']],
    problems: [
      M('concept', 'Meaning of q', R`The partition function measures…`, ['the number of thermally accessible states', 'the total energy', 'the number of molecules', 'the entropy in J/K'], 0, [R`Its limit at T → 0 is the ground-state degeneracy.`], R`Roughly how many states molecules can reach at that temperature.`),
      M('concept', 'Frozen-out vibrations', R`At room temperature, most diatomic gases have $C_V \approx \tfrac52R$ rather than $\tfrac72R$ because…`, ['vibrational levels are too widely spaced to be populated', 'rotation is frozen out', 'translation is quantised', 'molecules do not vibrate'], 0, [R`Compare $hc\tilde\nu$ with $kT$.`], R`$hc\tilde\nu \gg kT$, so vibration contributes almost nothing.`),
      M('concept', 'Residual entropy', R`Crystalline CO has entropy at 0 K because…`, ['molecules freeze in with random CO/OC orientations', 'it is a gas at 0 K', 'it vibrates strongly', 'the third law does not apply to molecules'], 0, [R`Count arrangements.`], R`Random orientations give $W = 2^N$.`),
      M('concept', 'Very low temperature', R`As T → 0, the partition function of a molecule with a non-degenerate ground state approaches…`, ['1', '0', 'infinity', 'N'], 0, [R`Only the ground state is accessible.`], R`$q \to g_0 = 1$.`),
      P('core', 'num', 'Population ratio', R`Two levels 1.0 kJ/mol apart at 298 K: ratio of upper to lower population?`, Math.exp(-1 / RT), [R`$e^{-1000/RT}$.`], R`$0.668$.`),
      P('core', 'num', 'Two-level q', R`A two-level system has $\varepsilon = kT$. Partition function?`, 1 + Math.exp(-1), [R`$1 + e^{-1}$.`], R`$1.37$.`),
      P('core', 'num', 'Vibrational q', R`Harmonic oscillator with $hc\tilde\nu/kT = 1$: $q_V$?`, 1 / (1 - Math.exp(-1)), [R`$1/(1 - e^{-1})$.`], R`$1.58$.`),
      P('core', 'num', 'Counting ways', R`Four molecules, two levels: in how many ways can exactly two be in each level?`, 6, [R`$4!/(2!2!)$.`], R`6.`),
      P('core', 'num', 'CO residual entropy', R`Residual molar entropy of perfectly random CO (J/(K mol))?`, 8.314 * Math.LN2, [R`$R\ln2$.`], R`$5.76$.`),
      P('core', 'num', 'Rotational q of HCl', R`HCl: $B = 10.59\ \text{cm}^{-1}$, σ = 1, $kT/hc = 207\ \text{cm}^{-1}$ at 298 K. Estimate $q_R$.`, 207 / 10.59, [R`$kT/\sigma hcB$.`], R`$19.6$.`),
      P('olympiad', 'num', 'Excited vibrations', R`For HCl ($\tilde\nu = 2886\ \text{cm}^{-1}$) at 298 K ($kT/hc = 207\ \text{cm}^{-1}$), what fraction of molecules is in $v = 1$? (Units of $10^{-7}$.)`, 1e7 * Math.exp(-2886 / 207) * (1 - Math.exp(-2886 / 207)), [R`$e^{-x}(1 - e^{-x})$ with $x = 13.9$.`], R`$e^{-13.94} = 8.8\times10^{-7}$.`),
      P('olympiad', 'num', 'Ice', R`Pauling estimated ice's residual entropy as $R\ln\tfrac32$. Value (J/(K mol))?`, 8.314 * Math.log(1.5), [R`Calculate.`], R`$3.37$, matching experiment.`),
      P('olympiad', 'num', 'Isotope exchange', R`High-temperature limit of $K$ for H₂ + D₂ ⇌ 2HD?`, 4, [R`Symmetry numbers 2, 2 and 1.`], R`$2\cdot2/1^2 = 4$.`),
      P('olympiad', 'num', 'Thermal wavelength', R`Thermal wavelength of N₂ ($m = 4.65\times10^{-26}$ kg) at 298 K, in pm?`, 1e12 * h / Math.sqrt(2 * Math.PI * 4.65e-26 * kB * 298), [R`$\Lambda = h/\sqrt{2\pi mkT}$.`], R`$19.1$ pm, far smaller than the distance between molecules.`)
    ],
    drills: [
      { title: 'Population ratios', gen: (r) => { const e = r.pick([0.5, 1, 2, 5, 10]), T = r.pick([100, 200, 298, 500, 1000]); return { q: R`<p>Gap ${e} kJ/mol at ${T} K: upper/lower population ratio?</p>`, answer: Math.exp(-e * 1000 / (Rg * T)), tol: 0.01, solution: R`<p>$e^{-${e * 1000}/(8.314\cdot${T})} = ${f(Math.exp(-e * 1000 / (Rg * T)), 4)}$.</p>` }; } },
      { title: 'Vibrational partition function', gen: (r) => { const x = r.pick([0.2, 0.5, 1, 2, 5]); return { q: R`<p>$hc\tilde\nu/kT = ${x}$. Vibrational partition function?</p>`, answer: 1 / (1 - Math.exp(-x)), tol: 0.01, solution: R`<p>$1/(1 - e^{-${x}}) = ${f(1 / (1 - Math.exp(-x)), 4)}$.</p>` }; } }
    ],
    predict: { q: 'Raising the temperature makes the partition function…', o: ['larger: more states become accessible', 'smaller', 'unchanged'], a: 0, how: 'raise T in the partition-function lab.', why: 'Every Boltzmann factor e^(−ε/kT) grows with T, so higher levels contribute more.' },
    wild: ['Thermodynamic tables', 'Many of the standard entropies and heat capacities of gases in reference tables are calculated from spectroscopic data through partition functions, rather than measured calorimetrically.']
  });

  /* ================= Atkins Focus 16, 18–19: reaction dynamics and surfaces ================= */
  const lang = (K, p) => K * p / (1 + K * p);
  PB.tbChapter({
    id: 'chem-dynamics', subject: 'chemistry', title: 'Reaction Dynamics and Surfaces',
    subtitle: R`Why reactions have the rates they do. Collision theory and the steric factor, transition-state theory and the Eyring equation (enthalpy and entropy of activation), diffusion and diffusion-controlled reactions in solution, and processes at surfaces: adsorption, the Langmuir isotherm and heterogeneous catalysis.`,
    big: 'For molecules to react they must meet, with enough energy and the right orientation. Collision theory counts encounters; transition-state theory treats the top of the energy barrier as a short-lived molecule with its own entropy. In solution, molecules first have to diffuse together; on a catalyst’s surface, they first have to stick.',
    goals: ['Calculate collision frequencies, mean relative speeds and the fraction of energetic collisions', 'Explain the steric factor and its values', 'Use the Eyring equation to find ΔG‡, ΔH‡ and ΔS‡ and interpret their signs', 'Apply Fick’s laws, the Stokes–Einstein relation and the diffusion-controlled rate limit', 'Distinguish physisorption and chemisorption and use the Langmuir isotherm', 'Explain how heterogeneous catalysts work and why surface reactions change order with pressure'],
    prereqs: ['chem-kinetics'],
    sections: [
      { title: 'Collision theory', plain: 'Molecules react only when they collide hard enough and in the right orientation; counting collisions gives an upper limit for the rate, the Boltzmann factor gives the share with enough energy, and a steric factor accounts for orientation.', html: R`
<p>In a gas, molecules collide billions of times a second. The rate of a bimolecular reaction is at most the collision rate, times the fraction of collisions with enough energy, times a <strong>steric factor</strong> $P$ for correct orientation:</p>
<div class="key"><p>$k = P\,\sigma\sqrt{\dfrac{8kT}{\pi\mu}}\,N_A\,e^{-E_a/RT}$</p></div>
<p>Here σ = πd² is the collision cross-section and $\sqrt{8kT/\pi\mu}$ the mean relative speed. The exponential factor is the fraction of collisions whose energy along the line of centres exceeds $E_a$, and it is tiny: at 298 K, only about $10^{-9}$ of collisions carry 50 kJ/mol.</p>
<div class="worked"><p>Find the mean relative speed of two N₂ molecules at 298 K, and the fraction of collisions exceeding 50 kJ/mol.</p>
<p>$\mu = m/2 = 2.33\times10^{-26}$ kg; $\sqrt{8kT/\pi\mu} = \sqrt{8\cdot4.11\times10^{-21}/(\pi\cdot2.33\times10^{-26})} = 671$ m/s. Fraction $e^{-50\,000/(8.314\cdot298)} = 1.7\times10^{-9}$.</p></div>
<div data-fig="0"></div>
<p>$P$ is often much less than 1 for complex molecules, which must meet in a specific orientation. Occasionally $P > 1$: in K + Br₂ → KBr + Br, the potassium atom transfers an electron from a distance ("harpoon mechanism"), and the resulting ions pull together, so the effective cross-section is far larger than the molecular size.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What fraction of collisions carries at least 25 kJ/mol at 298 K? (Units of $10^{-5}$.)`, 1e5 * Math.exp(-25 / RT), [R`$e^{-E_a/RT}$.`], R`$4.2\times10^{-5}$.`)] },
      { title: 'Transition-state theory', plain: 'Transition-state theory treats the top of the energy barrier as a fleeting activated complex in equilibrium with the reactants; the Eyring equation then gives the rate in terms of the free energy, enthalpy and entropy of activation.', html: R`
<p><strong>Transition-state theory</strong> assumes reactants are in rapid equilibrium with an <strong>activated complex</strong> at the top of the barrier, which falls apart into products at a rate set by $kT/h$. The result is the <strong>Eyring equation</strong>:</p>
<div class="key"><p>$k = \kappa\dfrac{k_BT}{h}e^{-\Delta G^\ddagger/RT} = \kappa\dfrac{k_BT}{h}e^{\Delta S^\ddagger/R}e^{-\Delta H^\ddagger/RT}$</p></div>
<p>(κ, the transmission coefficient, is usually close to 1; $k_BT/h = 6.2\times10^{12}\ \text{s}^{-1}$ at 298 K.) Plotting $\ln(k/T)$ against $1/T$ (an <strong>Eyring plot</strong>) gives slope $-\Delta H^\ddagger/R$ and intercept $\ln(k_B/h) + \Delta S^\ddagger/R$. For reactions in solution, $E_a = \Delta H^\ddagger + RT$.</p>
<div class="worked"><p>A reaction has $k = 1.0\times10^{-3}\ \text{s}^{-1}$ at 298 K. Find ΔG‡.</p>
<p>$\Delta G^\ddagger = RT\ln\dfrac{k_BT}{hk} = 2.478\cdot\ln(6.2\times10^{15}) = 90$ kJ/mol: a half-life of about 12 minutes.</p></div>
<p>The <strong>entropy of activation</strong> is mechanistic evidence: two molecules combining into one activated complex lose freedom, so ΔS‡ is negative (often −50 to −150 J/(K mol)) for associative steps; a molecule loosening as it breaks apart gives a positive ΔS‡.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A reaction has ΔS‡ = −120 J/(K mol). This suggests the rate-determining step…`, ['brings two species together into one ordered activated complex', 'is a unimolecular fragmentation', 'involves no change in order', 'is diffusion-controlled'], 0, [R`Large negative: loss of freedom.`], R`Typical of bimolecular association.`)] },
      { title: 'Molecules in motion: diffusion', plain: 'In liquids molecules wander randomly, so the distance they cover grows only with the square root of time; very fast reactions are limited by how quickly the reactants can diffuse together, about ten billion per molar per second in water.', html: R`
<p>In a liquid, molecules jostle randomly. Their net flux follows <strong>Fick's first law</strong>, $J = -D\,dc/dx$, and the mean square distance travelled grows linearly with time: $\langle r^2\rangle = 6Dt$ in three dimensions. Small molecules in water have $D \approx 10^{-9}\ \text{m}^2/\text{s}$; the <strong>Stokes–Einstein</strong> relation, $D = k_BT/(6\pi\eta a)$, relates $D$ to the viscosity η and the molecular radius $a$.</p>
<div class="worked"><p>How long does a small molecule ($D = 10^{-9}\ \text{m}^2/\text{s}$) take to diffuse 1 μm? And 1 cm?</p>
<p>$t = r^2/6D$: 1 μm takes $1.7\times10^{-4}$ s; 1 cm takes $1.7\times10^4$ s, nearly five hours. Diffusion is fast across a cell, hopeless across a room, which is why organisms need circulation and why stirring speeds reactions.</p></div>
<p>When every encounter leads to reaction, the rate is limited by how fast reactants diffuse together: a <strong>diffusion-controlled</strong> reaction. For neutral molecules the limiting rate constant is about</p>
<div class="key"><p>$k_d = \dfrac{8RT}{3\eta}$</p></div>
<p>which for water at 25 °C ($\eta = 8.9\times10^{-4}$ Pa s) is $7\times10^9\ \text{M}^{-1}\text{s}^{-1}$. Proton transfers between acids and bases, and some enzymes (carbonic anhydrase, catalase), operate near this limit.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Estimate the diffusion-controlled rate constant in a solvent with viscosity $2.0\times10^{-3}$ Pa s at 298 K (units of $10^9\ \text{M}^{-1}\text{s}^{-1}$).`, 8 * Rg * 298 / (3 * 2e-3) / 1000 / 1e9, [R`$8RT/3\eta$ gives m³ mol⁻¹ s⁻¹; multiply by 1000 L/m³.`], R`$3.3\times10^9\ \text{M}^{-1}\text{s}^{-1}$.`)] },
      { title: 'Processes at surfaces', plain: 'Gases stick to solid surfaces either weakly (physisorption) or by forming bonds (chemisorption); the Langmuir isotherm describes how the covered fraction rises and saturates with pressure, explaining why catalysed reactions stop speeding up at high pressure.', html: R`
<p>Molecules <strong>adsorb</strong> on surfaces. <strong>Physisorption</strong> is weak van der Waals attraction (about 20 kJ/mol), reversible and multilayered; <strong>chemisorption</strong> forms chemical bonds (often over 100 kJ/mol), can break molecules apart (H₂ dissociates on platinum), and stops at a monolayer.</p>
<p>The <strong>Langmuir isotherm</strong> assumes identical, independent sites, each holding one molecule. Balancing adsorption ($\propto p(1 - \theta)$) and desorption ($\propto \theta$) gives the fractional coverage:</p>
<div class="key"><p>$\theta = \dfrac{Kp}{1 + Kp}$</p></div>
<div class="worked"><p>With $K = 0.5\ \text{kPa}^{-1}$, what is the coverage at 4 kPa, and what pressure gives 90% coverage?</p>
<p>$\theta = 2/3 = 0.67$. For $\theta = 0.9$: $Kp = 9$, so $p = 18$ kPa.</p></div>
<h3 class="sub">Heterogeneous catalysis</h3>
<p>Solid catalysts adsorb reactants, weaken their bonds and bring them together (the Langmuir–Hinshelwood mechanism), then release products: iron in the Haber–Bosch ammonia process, platinum, palladium and rhodium in car catalytic converters, zeolites in oil refining. A good catalyst binds reactants strongly enough to activate them but weakly enough to release products (the Sabatier principle). The rate is proportional to coverage, so a surface-catalysed reaction is first order in pressure at low pressure (θ ≈ Kp) and <strong>zero order</strong> at high pressure (θ ≈ 1: the surface is full). Catalyst poisons, such as lead or sulfur, bind sites permanently.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Langmuir isotherm with $K = 2\ \text{atm}^{-1}$. Coverage at 0.5 atm?`, 0.5, [R`$\theta = Kp/(1 + Kp)$.`], R`$1/2 = 0.5$.`)] }
    ],
    figures: [{ s: 0, title: 'Energetic collisions', caption: 'Fraction of collisions with energy above Eₐ, e^(−Eₐ/RT), against temperature (log scale). A modest rise in temperature multiplies it.', params: { aspect: 0.4, minH: 210, controls: [S('E', 'Activation energy Eₐ', 10, 150, 1, 50, 'kJ/mol'), S('T', 'Temperature', 200, 1000, 5, 298, 'K')],
      plots: [{ x: [200, 1000], y: [-30, 0], xlabel: 'T (K)', ylabel: 'log₁₀(fraction)', curves: (v) => [{ f: (T) => -v.E * 1000 / (Rg * T) / Math.LN10 }], pts: (v) => [{ x: v.T, y: -v.E * 1000 / (Rg * v.T) / Math.LN10 }] }],
      readout: (v) => [['fraction', f(Math.exp(-v.E * 1000 / (Rg * v.T)), 3)], ['rate ratio for +10 K', f(Math.exp(v.E * 1000 / Rg * (1 / v.T - 1 / (v.T + 10))), 3)]] } }],
    labs: [{ sim: 'explore', title: 'The Langmuir isotherm', desc: 'Fraction of surface sites covered against gas pressure, for an adsorption constant K. The rate of a surface-catalysed reaction follows the coverage.',
      tasks: ['At what pressure is the surface half covered?', 'Where is the reaction roughly first order in pressure, and where zero order?', 'How does a stronger-binding catalyst (larger K) change the curve?'],
      params: { aspect: 0.42, controls: [S('K', 'Adsorption constant K', 0.05, 5, 0.05, 0.5, '1/kPa'), S('p', 'Pressure', 0, 50, 0.1, 4, 'kPa')],
        plots: [{ x: [0, 50], y: [0, 1.02], xlabel: 'pressure (kPa)', ylabel: 'coverage θ', curves: (v) => [{ f: (p) => lang(v.K, p) }], pts: (v) => [{ x: v.p, y: lang(v.K, v.p) }], vlines: (v) => [{ x: 1 / v.K, label: 'θ = ½' }] }],
        readout: (v) => { const t = lang(v.K, v.p); return [['coverage θ', f(t, 3)], ['regime', t < 0.2 ? 'about first order in p' : t > 0.85 ? 'about zero order (surface full)' : 'in between']]; } } }],
    formulas: [['Collision theory', 'k = P\\sigma\\sqrt{\\dfrac{8kT}{\\pi\\mu}}N_Ae^{-E_a/RT}'], ['Eyring', 'k = \\dfrac{k_BT}{h}e^{\\Delta S^\\ddagger/R}e^{-\\Delta H^\\ddagger/RT}'], ['Diffusion', '\\langle r^2\\rangle = 6Dt,\\quad D = \\dfrac{k_BT}{6\\pi\\eta a}'], ['Diffusion limit', 'k_d = \\dfrac{8RT}{3\\eta}'], ['Langmuir isotherm', '\\theta = \\dfrac{Kp}{1 + Kp}']],
    problems: [
      M('concept', 'Steric factor', R`The steric factor P in collision theory accounts for…`, ['the need for the right orientation in a collision', 'the energy of collisions', 'the number of collisions', 'the size of molecules'], 0, [R`Not every energetic collision works.`], R`Orientation requirements; usually P < 1.`),
      M('concept', 'Langmuir assumptions', R`Which is an assumption of the Langmuir isotherm?`, ['all sites are equivalent and adsorption stops at a monolayer', 'molecules form many layers', 'adsorbed molecules attract each other strongly', 'the surface is liquid'], 0, [R`Simple, independent sites.`], R`Identical, independent sites; one molecule each.`),
      M('concept', 'Diffusion control', R`A diffusion-controlled reaction is one whose rate is limited by…`, ['how fast reactants meet in solution', 'the activation energy of bond breaking', 'the concentration of catalyst', 'light absorption'], 0, [R`Every encounter reacts.`], R`The encounter rate sets the speed.`),
      M('concept', 'High pressure', R`At high pressure, a reaction on a saturated catalyst surface is…`, ['zero order in the gas pressure', 'first order', 'second order', 'stopped'], 0, [R`θ ≈ 1.`], R`Coverage no longer changes with pressure.`),
      P('core', 'num', 'Relative speed', R`Mean relative speed (m/s) of two N₂ molecules at 298 K ($\mu = 2.33\times10^{-26}$ kg)?`, Math.sqrt(8 * kB * 298 / (Math.PI * 2.326e-26)), [R`$\sqrt{8kT/\pi\mu}$.`], R`$671$ m/s.`),
      P('core', 'num', 'Langmuir coverage', R`$K = 0.5\ \text{kPa}^{-1}$, $p = 4$ kPa. θ?`, lang(0.5, 4), [R`$Kp/(1 + Kp)$.`], R`$0.667$.`),
      P('core', 'num', 'ΔG‡ from k', R`$k = 1.0\times10^{-3}\ \text{s}^{-1}$ at 298 K. ΔG‡ (kJ/mol)?`, RT * Math.log(6.21e12 / 1e-3), [R`$RT\ln(k_BT/hk)$.`], R`$90$ kJ/mol.`),
      P('core', 'num', 'Diffusion limit in water', R`$k_d = 8RT/3\eta$ for water ($\eta = 8.9\times10^{-4}$ Pa s) at 298 K, in units of $10^9\ \text{M}^{-1}\text{s}^{-1}$?`, 8 * Rg * 298 / (3 * 8.9e-4) * 1000 / 1e9, [R`Convert m³ to L.`], R`$7.4$.`),
      P('core', 'num', 'Diffusion time', R`Time (units of $10^{-4}$ s) for a molecule with $D = 10^{-9}\ \text{m}^2/\text{s}$ to move an rms distance of 1 μm in 3D?`, 1e-12 / 6e-9 * 1e4, [R`$t = r^2/6D$.`], R`$1.67\times10^{-4}$ s.`),
      P('core', 'num', 'Eyring slope', R`An Eyring plot of $\ln(k/T)$ against $1/T$ has slope −8000 K. ΔH‡ (kJ/mol)?`, 8000 * Rg / 1000, [R`Slope $= -\Delta H^\ddagger/R$.`], R`$66.5$ kJ/mol.`),
      P('olympiad', 'num', '90% coverage', R`With $K = 0.5\ \text{kPa}^{-1}$, what pressure (kPa) gives 90% coverage?`, 18, [R`Solve $Kp/(1 + Kp) = 0.9$.`], R`$Kp = 9$: 18 kPa.`),
      P('olympiad', 'num', 'Stokes–Einstein', R`Estimate $D$ for a molecule of radius 0.50 nm in water ($\eta = 8.9\times10^{-4}$ Pa s) at 298 K, in units of $10^{-10}\ \text{m}^2/\text{s}$.`, kB * 298 / (6 * Math.PI * 8.9e-4 * 5e-10) * 1e10, [R`$D = kT/6\pi\eta a$.`], R`$4.9\times10^{-10}\ \text{m}^2/\text{s}$.`),
      P('olympiad', 'num', 'Energetic collisions', R`What fraction of collisions exceeds 50 kJ/mol at 298 K? (Units of $10^{-9}$.)`, 1e9 * Math.exp(-50 / RT), [R`$e^{-E/RT}$.`], R`$1.7\times10^{-9}$.`),
      P('olympiad', 'num', 'Cross-section', R`A molecule has collision diameter 0.37 nm. Collision cross-section σ = πd² in nm²?`, Math.PI * 0.37 * 0.37, [R`$\pi d^2$.`], R`$0.43\ \text{nm}^2$.`)
    ],
    drills: [
      { title: 'Langmuir coverage', gen: (r) => { const K = r.pick([0.1, 0.5, 1, 2, 5]), p = r.pick([0.2, 1, 2, 5, 10]); return { q: R`<p>$K = ${K}$, $p = ${p}$ (consistent units). Coverage θ?</p>`, answer: lang(K, p), tol: 0.01, solution: R`<p>$${f(K * p, 4)}/(1 + ${f(K * p, 4)}) = ${f(lang(K, p), 4)}$.</p>` }; } },
      { title: 'ΔG‡ from a rate constant', gen: (r) => { const k = r.pick([1e-5, 1e-3, 1e-1, 1, 1e3]); return { q: R`<p>$k = ${k}\ \text{s}^{-1}$ at 298 K. ΔG‡ (kJ/mol)?</p>`, answer: RT * Math.log(6.21e12 / k), tol: 0.01, solution: R`<p>$2.478\ln(6.21\times10^{12}/${k}) = ${f(RT * Math.log(6.21e12 / k), 4)}$.</p>` }; } }
    ],
    predict: { q: 'At very high gas pressure, the rate of a reaction on a catalyst surface becomes…', o: ['independent of pressure (zero order)', 'proportional to pressure', 'proportional to pressure squared'], a: 0, how: 'raise the pressure in the Langmuir lab and watch the coverage level off.', why: 'Once every site is occupied (θ ≈ 1), extra gas cannot speed up the surface reaction.' },
    wild: ['Catalytic converters', 'A car’s catalytic converter uses a few grams of platinum, palladium and rhodium on a honeycomb surface to turn CO, unburnt fuel and NOₓ into CO₂, water and N₂.']
  });
})();
