(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-spectro', subject: 'chemistry', num: 20, part: 'Analysis',
    title: 'Spectroscopy and Analysis',
    subtitle: R`How chemists identify what they have made. Mass spectrometry, infrared and NMR spectroscopy, chromatography, and putting the evidence together to solve a structure.`,
    goals: ['Read molecular ions and isotope patterns in mass spectra', 'Assign IR absorptions to functional groups', 'Interpret ¹H NMR shifts, integrations and splitting', 'Count ¹³C environments', 'Combine data to deduce a structure'],
    sections: [
      {
        title: 'Mass spectrometry',
        html: R`
<p>A mass spectrometer ionises molecules and sorts the ions by mass-to-charge ratio. The peak at the highest m/z (apart from isotope peaks) is usually the <strong>molecular ion</strong> M⁺, giving the molar mass. Fragments show which pieces break off: a peak 15 below M⁺ means loss of CH₃; m/z 43 often means CH₃CO⁺.</p>
<p>Isotopes leave fingerprints. Chlorine (³⁵Cl : ³⁷Cl ≈ 3 : 1) gives M and M+2 in a 3 : 1 ratio; bromine (⁷⁹Br : ⁸¹Br ≈ 1 : 1) gives equal M and M+2 peaks. The M+1 peak from ¹³C (1.1% per carbon) estimates the number of carbons. High-resolution instruments measure masses to four decimal places, enough to pin down the formula.</p>`
      },
      {
        title: 'Infrared spectroscopy',
        html: R`
<p>Bonds vibrate like springs, and absorb infrared light at their vibrational frequency, $\tilde\nu = \dfrac{1}{2\pi c}\sqrt{\dfrac k\mu}$. Stronger bonds and lighter atoms absorb at higher wavenumbers.</p>
<div class="table-wrap"><table><thead><tr><th>Bond</th><th>Wavenumber (cm⁻¹)</th><th>Appearance</th></tr></thead><tbody>
<tr><td>O–H (alcohol)</td><td>3200–3550</td><td>broad</td></tr>
<tr><td>O–H (acid)</td><td>2500–3300</td><td>very broad</td></tr>
<tr><td>N–H</td><td>3300–3500</td><td>medium</td></tr>
<tr><td>C–H</td><td>2850–3100</td><td>sharp</td></tr>
<tr><td>C≡N, C≡C</td><td>2100–2260</td><td>sharp</td></tr>
<tr><td>C=O</td><td>1680–1750</td><td>strong, sharp</td></tr>
<tr><td>C=C</td><td>1620–1680</td><td>variable</td></tr>
</tbody></table></div>
<p>The region below 1500 cm⁻¹ is the <strong>fingerprint region</strong>, unique to each compound and used to match against a database.</p>`
      },
      {
        title: 'NMR spectroscopy',
        html: R`
<p>Nuclei with spin (¹H, ¹³C) in a strong magnetic field absorb radio waves at frequencies that depend on their electronic surroundings. A ¹H NMR spectrum gives three kinds of information:</p>
<ul>
<li><strong>Chemical shift</strong> δ (ppm): electronegative neighbours deshield protons and move them downfield. Alkyl C–H ≈ 0.9–1.5; next to C=O ≈ 2.0–2.7; next to O ≈ 3.3–4.2; alkene ≈ 4.5–6.5; aromatic ≈ 7–8; aldehyde ≈ 9.5–10; acid ≈ 11–12.</li>
<li><strong>Integration</strong>: the area of each signal is proportional to the number of protons in that environment.</li>
<li><strong>Splitting</strong>: a signal is split into $n + 1$ lines by $n$ equivalent protons on neighbouring carbons (the n+1 rule), with intensities from Pascal's triangle. An ethyl group shows a triplet (CH₃) and a quartet (CH₂). O–H protons usually appear as singlets.</li>
</ul>
<p>¹³C NMR shows one signal per distinct carbon environment, which makes it ideal for counting symmetry.</p>`
      },
      {
        title: 'Chromatography and solving structures',
        html: R`
<p>Chromatography separates mixtures by how strongly components stick to a stationary phase while a mobile phase moves past. In thin-layer chromatography the <strong>retention factor</strong> $R_f$ = distance moved by the spot ÷ distance moved by the solvent. Gas chromatography coupled to mass spectrometry (GC–MS) separates and identifies mixtures in one go.</p>
<p>A systematic route to a structure: molecular formula (from MS or combustion analysis) → degree of unsaturation → functional groups (IR) → carbon skeleton and neighbours (NMR) → check every piece of data against your proposal.</p>
<div class="insight"><p>Isotope substitution shifts IR frequencies predictably. Replacing H by D roughly doubles the reduced mass, so a C–H stretch near 2900 cm⁻¹ moves to about 2100 cm⁻¹. Comparing spectra of deuterated compounds is a classic way to assign bands, and a favourite olympiad calculation.</p></div>`
      }
    ],
    labs: [
      { sim: 'nmr', title: '¹H NMR simulator', desc: 'Simulated 400 MHz proton NMR spectra with n+1 splitting (J = 7 Hz) and the integration curve.',
        tasks: ['Explain the triplet and quartet of ethanol. Why is the OH a singlet?', 'Why does 2-chloropropane show a doublet and a septet?', 'Propanone has a single peak. What does that tell you about its symmetry?', 'Use the integration steps to find the ratio of protons in butanone.'] }
    ],
    formulas: [
      ['n+1 rule', R`\text{lines} = n + 1`],
      ['Vibrational wavenumber', R`\tilde\nu = \frac1{2\pi c}\sqrt{k/\mu}`],
      ['Reduced mass', R`\mu = m_1m_2/(m_1 + m_2)`],
      ['Retention factor', R`R_f = d_{\text{spot}}/d_{\text{solvent}}`],
      ['Carbons from M+1', R`n_C \approx \frac{I(M+1)}{1.1\%\times I(M)}`],
      ['Wavelength from wavenumber', R`\lambda(\mu\mathrm m) = 10^4/\tilde\nu(\mathrm{cm^{-1}})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Read the IR', q: R`<p>An IR spectrum shows a very broad band from 2500 to 3300 cm⁻¹ and a strong band at 1710 cm⁻¹. The compound is most likely:</p>`, options: ['An alcohol', 'A ketone', 'A carboxylic acid', 'An alkene'], answer: 2, hints: [R`Broad O–H plus C=O.`], solution: R`<p>The very broad, hydrogen-bonded O–H together with C=O is typical of a carboxylic acid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Twin peaks', q: R`<p>A mass spectrum shows M⁺ and M+2 peaks of equal height. The compound contains:</p>`, options: ['Chlorine', 'Bromine', 'Sulfur', 'Nitrogen'], answer: 1, hints: [R`Which halogen has two isotopes in equal amounts?`], solution: R`<p>⁷⁹Br and ⁸¹Br are about 50 : 50.</p>` },
      { level: 'concept', type: 'mcq', title: 'Splitting', q: R`<p>In ¹H NMR, a CH₃ group next to a CH₂ group appears as a:</p>`, options: ['Singlet', 'Doublet', 'Triplet', 'Quartet'], answer: 2, hints: [R`n + 1 with n = 2.`], solution: R`<p>Two neighbouring protons split it into a triplet.</p>` },
      { level: 'core', type: 'num', title: 'Proton environments', q: R`<p>How many different ¹H NMR environments does propan-2-ol, (CH₃)₂CHOH, have?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`The two methyls are equivalent.`], solution: R`<p>CH₃ (6H), CH (1H), OH (1H): three.</p>` },
      { level: 'core', type: 'num', title: 'Carbon environments', q: R`<p>How many ¹³C NMR signals does 1,4-dimethylbenzene give?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Use the molecule's symmetry.`], solution: R`<p>CH₃ carbons, ring carbons bearing CH₃, and ring C–H carbons: three.</p>` },
      { level: 'core', type: 'num', title: 'Counting carbons', q: R`<p>A compound's M⁺ peak has intensity 100 and its M+1 peak 3.3. Estimate the number of carbon atoms.</p>`, answer: 3, tol: 0.02, unit: '', hints: [R`Each carbon contributes about 1.1%.`], solution: R`<p>$3.3/1.1 = 3$.</p>` },
      { level: 'core', type: 'num', title: 'Carbonyl wavelength', q: R`<p>A C=O stretch absorbs at 1715 cm⁻¹. What wavelength is that, in μm?</p>`, answer: 1e4 / 1715, tol: 0.005, unit: 'μm', hints: [R`$\lambda = 10^4/\tilde\nu$ μm.`], solution: R`<p>5.83 μm.</p>` },
      { level: 'core', type: 'num', title: 'TLC', q: R`<p>A spot travels 3.6 cm while the solvent front travels 8.0 cm. What is its Rf?</p>`, answer: 0.45, tol: 0.01, unit: '', hints: [R`Ratio of distances.`], solution: R`<p>0.45.</p>` },
      { level: 'olympiad', type: 'num', title: 'Deuterium shift', q: R`<p>A C–H stretch absorbs at 2900 cm⁻¹. Assuming the same force constant, where does the C–D stretch absorb?</p>`, answer: 2900 * Math.sqrt((12 * 1 / 13) / (12 * 2 / 14)), tol: 0.005, unit: 'cm⁻¹', hints: [R`$\tilde\nu \propto 1/\sqrt\mu$ with μ(C–H) = 12/13 u and μ(C–D) = 24/14 u.`], solution: R`<p>$2900\sqrt{0.923/1.714} = 2128\ \mathrm{cm^{-1}}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Stiffness of HCl', q: R`<p>H³⁵Cl absorbs at 2886 cm⁻¹. Find the force constant of the bond, in N/m. (u = 1.6605×10⁻²⁷ kg, c = 2.998×10¹⁰ cm/s)</p>`, answer: (1 * 35 / 36 * 1.6605e-27) * Math.pow(2 * Math.PI * 2.998e10 * 2886, 2), tol: 0.01, unit: 'N/m', hints: [R`$k = \mu(2\pi c\tilde\nu)^2$.`], solution: R`<p>$\mu = 0.972\ \mathrm u = 1.614\times10^{-27}\ \mathrm{kg}$, $k = 477\ \mathrm{N/m}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'One signal only', q: R`<p>A compound C₃H₆O shows a strong IR band at 1715 cm⁻¹ and a single ¹H NMR signal. How many ¹³C NMR signals does it give?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`Identify the compound first.`], solution: R`<p>It is propanone: equivalent CH₃ carbons and one C=O carbon, so 2 signals.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-spectro', [
    { title: 'Isotope shift', gen(r) { const nu = r.int(1000, 3600), m1 = r.pick([12, 14, 16]); const mu1 = m1 / (m1 + 1), mu2 = 2 * m1 / (m1 + 2); return { q: R`<p>An X–H stretch (X has mass ${m1} u) absorbs at ${nu} cm⁻¹. Estimate the X–D stretch.</p>`, answer: nu * Math.sqrt(mu1 / mu2), unit: 'cm⁻¹', solution: R`<p>$${nu}\sqrt{\mu_H/\mu_D} = ${f(nu * Math.sqrt(mu1 / mu2))}\ \mathrm{cm^{-1}}$.</p>` }; } },
    { title: 'Splitting pattern', gen(r) { const n = r.int(0, 6); return { q: R`<p>A proton has ${n} equivalent neighbouring protons. Into how many lines is its signal split?</p>`, answer: n + 1, tol: 0, atol: 0.01, unit: '', solution: R`<p>$n + 1 = ${n + 1}$.</p>` }; } },
    { title: 'NMR environments', gen(r) { const c = r.pick([['ethanol', 3], ['propanone', 1], ['ethyl ethanoate', 3], ['methylbenzene (aromatic H counted as one)', 2], ['butanone', 3], ['2-methylpropane', 2], ['propan-1-ol', 4], ['methyl propanoate', 3], ['1,2-dichloroethane', 1]]); return { q: R`<p>How many ¹H NMR environments does ${c[0]} have?</p>`, answer: c[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${c[1]}.</p>` }; } }
  ]);
})();
