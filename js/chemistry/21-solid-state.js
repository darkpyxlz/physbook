(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const CELLS = { sc: { name: 'Simple cubic', Z: 1, cn: 6, ar: (r) => 2 * r, pf: Math.PI / 6 }, bcc: { name: 'Body-centred cubic', Z: 2, cn: 8, ar: (r) => 4 * r / Math.sqrt(3), pf: Math.PI * Math.sqrt(3) / 8 }, fcc: { name: 'Face-centred cubic (ccp)', Z: 4, cn: 12, ar: (r) => 2 * Math.sqrt(2) * r, pf: Math.PI / (3 * Math.sqrt(2)) } };
  PB.addChapter({
    id: 'chem-solid', subject: 'chemistry', num: 21, part: 'Inorganic Chemistry',
    title: 'Crystal Structures and the Solid State',
    subtitle: R`How atoms and ions pack. Unit cells and close packing, density from crystal structure, the classic ionic lattices and radius ratios, X-ray diffraction and Bragg's law, defects, and band theory.`,
    goals: ['Count atoms per unit cell and find coordination numbers', 'Calculate packing fractions and densities from unit-cell data', 'Describe the NaCl, CsCl, zinc blende and fluorite structures', 'Use the radius-ratio rules', 'Apply Bragg\'s law and systematic absences', 'Explain conductors, semiconductors and insulators with bands'],
    sections: [
      {
        title: 'Unit cells and close packing',
        html: R`
<p>A crystal is a pattern repeated in three dimensions. The smallest repeating box is the <strong>unit cell</strong>. Atoms on its corners are shared by 8 cells, on edges by 4, on faces by 2; atoms inside belong wholly to it. Counting gives the number of atoms per cell, $Z$:</p>
<div class="table-wrap"><table><thead><tr><th>Cubic cell</th><th>Z</th><th>Coordination</th><th>Edge a vs radius r</th><th>Packing fraction</th><th>Metals</th></tr></thead><tbody>
<tr><td>Simple (primitive)</td><td>1</td><td>6</td><td>$a = 2r$</td><td>52%</td><td>Po only</td></tr>
<tr><td>Body-centred (bcc)</td><td>2</td><td>8</td><td>$a = 4r/\sqrt3$</td><td>68%</td><td>Fe, Na, W, Cr</td></tr>
<tr><td>Face-centred (fcc, ccp)</td><td>4</td><td>12</td><td>$a = 2\sqrt2\,r$</td><td>74%</td><td>Cu, Al, Au, Ag</td></tr>
</tbody></table></div>
<p>Stacking close-packed layers ABCABC… gives cubic close packing (= fcc); ABAB… gives <strong>hexagonal close packing</strong> (hcp: Mg, Zn, Ti). Both fill 74% of space, the maximum possible for equal spheres. A close-packed array of N spheres contains N <strong>octahedral holes</strong> and 2N <strong>tetrahedral holes</strong>, which smaller ions can fill.</p>`
      },
      {
        title: 'Density from structure',
        html: R`
<p>The mass of a unit cell is $Z$ formula units; its volume is $a^3$ for a cube. So</p>
$$\rho = \frac{ZM}{N_Aa^3}.$$
<p>Measuring the density and the cell edge by X-ray diffraction gives an accurate value of Avogadro's constant, or the atomic radius.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Copper is fcc with $a = 361.5$ pm. Find its density (M = 63.55 g/mol).<span class="tog">Solution</span></summary><div class="sol"><p>$\rho = \dfrac{4\times63.55}{6.022\times10^{23}\times(3.615\times10^{-8}\ \text{cm})^3} = ${f(4 * 63.55 / (6.022e23 * Math.pow(3.615e-8, 3)))}$ g/cm³. The radius is $a/2\sqrt2 = 128$ pm.</p></div></details>`
      },
      {
        title: 'Ionic structures and radius ratios',
        html: R`
<p>In ionic solids the larger anions usually form the framework and cations fill holes. Each ion wants as many oppositely charged neighbours as possible without anions touching each other, so the ratio $r_+/r_-$ decides the coordination:</p>
<div class="table-wrap"><table><thead><tr><th>$r_+/r_-$</th><th>Coordination</th><th>Structure</th><th>Example</th></tr></thead><tbody>
<tr><td>0.225–0.414</td><td>4 (tetrahedral)</td><td>zinc blende, wurtzite</td><td>ZnS</td></tr>
<tr><td>0.414–0.732</td><td>6 (octahedral)</td><td>rock salt</td><td>NaCl, MgO</td></tr>
<tr><td>&gt; 0.732</td><td>8 (cubic)</td><td>caesium chloride</td><td>CsCl</td></tr>
</tbody></table></div>
<p>The limits come from geometry: an octahedral hole is just filled when $r_+/r_- = \sqrt2 - 1 = 0.414$. Compounds with formula MX₂ adopt the <strong>fluorite</strong> structure (CaF₂: Ca²⁺ 8-coordinate, F⁻ 4-coordinate) or <strong>rutile</strong> (TiO₂: 6 : 3). Real structures also depend on covalency, so the rules often fail (for instance for LiI).</p>
<p>The rock-salt cell contains 4 NaCl units: Na⁺ in all the octahedral holes of an fcc Cl⁻ array.</p>`
      },
      {
        title: 'X-ray diffraction',
        html: R`
<p>X-rays scattered by parallel planes of atoms, spaced $d$ apart, interfere constructively when the path difference is a whole number of wavelengths: <strong>Bragg's law</strong>,</p>
$$n\lambda = 2d\sin\theta.$$
<p>In a cubic crystal the planes with Miller indices $(hkl)$ are spaced $d = a/\sqrt{h^2 + k^2 + l^2}$. Not every reflection appears: in a bcc lattice only $h + k + l$ even survive; in fcc, $h, k, l$ must be all odd or all even. The pattern of allowed $h^2 + k^2 + l^2$ values (sc 1, 2, 3, 4…; bcc 2, 4, 6, 8…; fcc 3, 4, 8, 11, 12…) identifies the lattice.</p>
<details class="example"><summary><span class="lbl">Worked example</span> The first reflection of an fcc metal with Cu Kα X-rays (154.2 pm) is at 2θ = 38.2°. Find a.<span class="tog">Solution</span></summary><div class="sol"><p>First fcc reflection is (111): $d = 154.2/(2\sin19.1^\circ) = ${f(154.2 / (2 * Math.sin(19.1 * Math.PI / 180)))}$ pm; $a = d\sqrt3 = ${f(154.2 / (2 * Math.sin(19.1 * Math.PI / 180)) * Math.sqrt(3))}$ pm (aluminium is 405 pm).</p></div></details>`
      },
      {
        title: 'Defects and band theory',
        html: R`
<p>Real crystals have <strong>defects</strong>: vacancies (Schottky defects: missing cation–anion pairs), interstitials (Frenkel defects: an ion moved into a hole, common in AgCl), and non-stoichiometry (Fe₀.₉₅O). Defects let ions move, which is why some solids conduct ions (solid electrolytes in batteries).</p>
<p>In a metal, atomic orbitals merge into continuous <strong>bands</strong>. If the highest occupied band is only partly full, electrons move freely: a <strong>conductor</strong>. If a full valence band is separated from an empty conduction band by a gap $E_g$, the solid is an <strong>insulator</strong> (diamond, 5.5 eV) or a <strong>semiconductor</strong> (Si, 1.1 eV), whose conductivity rises with temperature as more electrons cross the gap, roughly as $e^{-E_g/2kT}$. <strong>Doping</strong> silicon with P (n-type, extra electrons) or B (p-type, holes) controls conductivity and makes diodes, transistors and solar cells possible. A semiconductor absorbs light with photon energy above $E_g$: the band gap sets its colour and the wavelength of an LED.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Unit cells', desc: 'A cubic unit cell (projection) with its atoms per cell, coordination, packing fraction and the density for a chosen metal.',
        tasks: ['Which cell packs most efficiently? Check the 74% figure.', 'Put iron (r = 124 pm, 55.85 g/mol) in bcc. Compare with the real density 7.87 g/cm³.', 'Why does a phase change from bcc to fcc make iron slightly denser?'],
        params: { controls: [{ type: 'select', id: 'c', label: 'Cell', value: 'fcc', options: [['sc', 'Simple cubic'], ['bcc', 'Body-centred cubic'], ['fcc', 'Face-centred cubic']] }, S('r', 'Atomic radius', 50, 270, 1, 128, 'pm'), S('M', 'Molar mass', 1, 210, 0.1, 63.6, 'g/mol')],
          draw: (ctx, C, v, b, U) => { const c = CELLS[v.c], s = Math.min(b.w, b.h) * 0.6, x0 = b.x + (b.w - s) / 2, y0 = b.y + (b.h - s) / 2, a = c.ar(v.r), k = s / a, rr = v.r * k; ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.5; ctx.strokeRect(x0, y0, s, s); const pts = [[0, 0], [1, 0], [0, 1], [1, 1]]; if (v.c === 'bcc') pts.push([0.5, 0.5]); if (v.c === 'fcc') pts.push([0.5, 0.5], [0.5, 0], [0, 0.5], [1, 0.5], [0.5, 1]); ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, s, s); ctx.clip(); pts.forEach((p) => { ctx.globalAlpha = 0.75; U.dot(ctx, x0 + p[0] * s, y0 + p[1] * s, rr, (p[0] === 0.5 || p[1] === 0.5) ? C.rust : C.accent, C.ink); }); ctx.restore(); U.text(ctx, c.name + ' (face view)', b.x + b.w / 2, b.y + b.h - 8, C.ink2, U.ui(11), 'center'); },
          picFrac: 1,
          readout: (v) => { const c = CELLS[v.c], a = c.ar(v.r); return [['atoms per cell Z', String(c.Z)], ['coordination number', String(c.cn)], ['cell edge a', f(a) + ' pm'], ['packing fraction', f(100 * c.pf) + '%'], ['density', f(c.Z * v.M / (6.022e23 * Math.pow(a * 1e-10, 3))) + ' g/cm³']]; } } },
      { sim: 'explore', title: 'Powder diffraction pattern', desc: 'Positions of the first reflections of a cubic lattice from Bragg’s law, showing only those allowed for the chosen lattice type.',
        tasks: ['Compare the patterns of sc, bcc and fcc with the same a. Which lines are missing?', 'How do the peaks move if a increases?', 'Use the first two peaks of an fcc pattern to find a.'],
        params: { controls: [{ type: 'select', id: 'c', label: 'Lattice', value: 'fcc', options: [['sc', 'Simple cubic'], ['bcc', 'Body-centred cubic'], ['fcc', 'Face-centred cubic']] }, S('a', 'Cell edge a', 250, 700, 1, 405, 'pm'), S('l', 'X-ray wavelength', 50, 250, 0.1, 154.2, 'pm')],
          init: (v) => { v.refl = () => { const out = []; for (let h = 0; h <= 4; h++) for (let k = 0; k <= h; k++) for (let l = 0; l <= k; l++) { if (!h && !k && !l) continue; const s = h * h + k * k + l * l; const ok = v.c === 'sc' || (v.c === 'bcc' && (h + k + l) % 2 === 0) || (v.c === 'fcc' && ((h % 2 === k % 2) && (k % 2 === l % 2))); if (!ok) continue; const sn = v.l * Math.sqrt(s) / (2 * v.a); if (sn < 1 && !out.find((q) => q.s === s)) out.push({ s: s, hkl: '' + h + k + l, tt: 2 * Math.asin(sn) * 180 / Math.PI }); } return out.sort((p, q) => p.s - q.s); }; },
          plots: [{ x: [10, 120], y: [0, 1.2], yticks: [], xlabel: '2θ (degrees)', ylabel: '', curves: () => [], vlines: (v) => v.refl().map((q) => ({ x: q.tt, label: q.hkl, color: 'accent' })) }],
          readout: (v) => v.refl().slice(0, 5).map((q) => ['(' + q.hkl + ')  h²+k²+l² = ' + q.s, f(q.tt) + '°']) } }
    ],
    formulas: [
      ['Density from the unit cell', R`\rho = ZM/N_Aa^3`],
      ['fcc edge', R`a = 2\sqrt2\,r`],
      ['bcc edge', R`a = 4r/\sqrt3`],
      ['Bragg’s law', R`n\lambda = 2d\sin\theta`],
      ['Cubic plane spacing', R`d = a/\sqrt{h^2 + k^2 + l^2}`],
      ['Octahedral hole limit', R`r_+/r_- = \sqrt2 - 1`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Atoms per cell', q: R`<p>How many atoms belong to a body-centred cubic unit cell?</p>`, options: ['1', '2', '4', '9'], answer: 1, hints: [R`8 corners × 1/8 + 1 centre.`], solution: R`<p>2.</p>` },
      { level: 'concept', type: 'mcq', title: 'Coordination in CsCl', q: R`<p>What is the coordination number of Cs⁺ in CsCl?</p>`, options: ['4', '6', '8', '12'], answer: 2, hints: [R`Cubic coordination.`], solution: R`<p>8.</p>` },
      { level: 'concept', type: 'mcq', title: 'Semiconductor temperature', q: R`<p>As a pure semiconductor is heated, its conductivity…</p>`, options: ['Falls, like a metal', 'Rises, as more electrons cross the band gap', 'Stays constant', 'Drops to zero'], answer: 1, hints: [R`Thermal excitation.`], solution: R`<p>Rises.</p>` },
      { level: 'core', type: 'num', title: 'Density of iron', q: R`<p>Iron is bcc with a = 286.6 pm (M = 55.85 g/mol). Find its density, in g/cm³.</p>`, answer: 2 * 55.85 / (6.022e23 * Math.pow(2.866e-8, 3)), tol: 0.01, unit: 'g/cm³', hints: [R`Z = 2.`], solution: R`<p>${f(2 * 55.85 / (6.022e23 * Math.pow(2.866e-8, 3)))} g/cm³.</p>` },
      { level: 'core', type: 'num', title: 'Radius from fcc', q: R`<p>Gold is fcc with a = 407.8 pm. What is its atomic radius, in pm?</p>`, answer: 407.8 / (2 * Math.SQRT2), tol: 0.005, unit: 'pm', hints: [R`Atoms touch along the face diagonal.`], solution: R`<p>${f(407.8 / (2 * Math.SQRT2))} pm.</p>` },
      { level: 'core', type: 'num', title: 'NaCl density', q: R`<p>NaCl has the rock-salt structure with a = 564 pm. Find its density (M = 58.44 g/mol), in g/cm³.</p>`, answer: 4 * 58.44 / (6.022e23 * Math.pow(5.64e-8, 3)), tol: 0.01, unit: 'g/cm³', hints: [R`Z = 4 formula units.`], solution: R`<p>${f(4 * 58.44 / (6.022e23 * Math.pow(5.64e-8, 3)))} g/cm³.</p>` },
      { level: 'core', type: 'num', title: 'Bragg angle', q: R`<p>X-rays of 154 pm reflect in first order from planes 282 pm apart. What is θ, in degrees?</p>`, answer: Math.asin(154 / 564) * 180 / Math.PI, tol: 0.005, unit: '°', hints: [R`$\sin\theta = \lambda/2d$.`], solution: R`<p>${f(Math.asin(154 / 564) * 180 / Math.PI)}°.</p>` },
      { level: 'core', type: 'num', title: 'Radius ratio', q: R`<p>Mg²⁺ (72 pm) and O²⁻ (140 pm). What is $r_+/r_-$, and hence the predicted coordination number? Give the ratio.</p>`, answer: 72 / 140, tol: 0.005, unit: '', hints: [R`Between 0.414 and 0.732: 6.`], solution: R`<p>${f(72 / 140)}: octahedral, rock salt (correct for MgO).</p>` },
      { level: 'core', type: 'num', title: 'LED colour', q: R`<p>A semiconductor has a band gap of 2.0 eV. What wavelength does its LED emit, in nm?</p>`, answer: 1240 / 2, tol: 0.005, unit: 'nm', hints: [R`$\lambda = 1240/E$.`], solution: R`<p>620 nm: red-orange.</p>` },
      { level: 'olympiad', type: 'num', title: 'Avogadro from silicon', q: R`<p>Silicon (diamond structure, Z = 8) has a = 543.10 pm and density 2.3290 g/cm³ (M = 28.0855 g/mol). Calculate $N_A$, in units of 10²³ mol⁻¹.</p>`, answer: 8 * 28.0855 / (2.329 * Math.pow(5.431e-8, 3)) / 1e23, tol: 0.003, unit: '×10²³', hints: [R`$N_A = ZM/\rho a^3$.`], solution: R`<p>${f(8 * 28.0855 / (2.329 * Math.pow(5.431e-8, 3)) / 1e23, 5)} × 10²³: this is how the kilogram was redefined.</p>` },
      { level: 'olympiad', type: 'num', title: 'Identify the lattice', q: R`<p>A cubic metal shows reflections with sin²θ in the ratio 2 : 4 : 6 : 8. The first is at 2θ = 44.7° with λ = 154.2 pm. Find a, in pm.</p>`, answer: 154.2 * Math.sqrt(2) / (2 * Math.sin(22.35 * Math.PI / 180)), tol: 0.005, unit: 'pm', hints: [R`Ratios 2, 4, 6: bcc, first reflection (110).`], solution: R`<p>bcc; $a = \lambda\sqrt2/2\sin\theta = ${f(154.2 * Math.sqrt(2) / (2 * Math.sin(22.35 * Math.PI / 180)))}$ pm: iron.</p>` },
      { level: 'olympiad', type: 'num', title: 'Interstitial site', q: R`<p>What is the largest sphere (as a fraction of the host radius r) that fits in a tetrahedral hole of a close-packed array? ($r_{\text{hole}}/r = \sqrt{3/2} - 1$.)</p>`, answer: Math.sqrt(1.5) - 1, tol: 0.005, unit: '', hints: [R`Compare 0.414 for octahedral holes.`], solution: R`<p>${f(Math.sqrt(1.5) - 1)}: why carbon fits interstitially in iron only at the cost of strain.</p>` }
    ]
  });
  PB.addDrills('chem-solid', [
    { title: 'Density from a unit cell', gen(r) { const c = r.pick([['bcc', 2], ['fcc', 4], ['sc', 1]]), a = r.int(280, 600), M = r.step(20, 200, 0.1); const rho = c[1] * M / (6.022e23 * Math.pow(a * 1e-10, 3)); return { q: R`<p>A metal with M = ${f(M)} g/mol crystallises ${c[0]} with a = ${a} pm. Find its density, in g/cm³.</p>`, answer: rho, tol: 0.01, unit: 'g/cm³', solution: R`<p>Z = ${c[1]}; $\rho = ZM/N_Aa^3 = ${f(rho)}$ g/cm³.</p>` }; } },
    { title: 'Bragg’s law', gen(r) { const l = r.pick([71.1, 154.2, 179.0]), d = r.int(100, 400); if (l / (2 * d) >= 1) return this.gen(PB.rng(r.int(1, 1e9))); const th = Math.asin(l / (2 * d)) * 180 / Math.PI; return { q: R`<p>X-rays of ${l} pm reflect in first order from planes ${d} pm apart. Find θ, in degrees.</p>`, answer: th, tol: 0.01, unit: '°', solution: R`<p>$\sin\theta = ${l}/${2 * d}$, θ = ${f(th)}°.</p>` }; } },
    { title: 'Radius from cell edge', gen(r) { const c = r.pick([['fcc', 2 * Math.SQRT2], ['bcc', 4 / Math.sqrt(3)]]), a = r.int(280, 600); return { q: R`<p>A ${c[0]} metal has a = ${a} pm. What is its atomic radius, in pm?</p>`, answer: a / c[1], tol: 0.005, unit: 'pm', solution: R`<p>r = ${f(a / c[1])} pm.</p>` }; } }
  ]);
})();
