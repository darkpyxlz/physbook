(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-atom', subject: 'chemistry', num: 3, part: 'Foundations',
    title: 'Atomic Structure',
    subtitle: R`Where the electrons are. Atomic spectra, quantum numbers and orbital shapes, electron configurations with their famous exceptions, and how shielding sets the effective nuclear charge.`,
    goals: ['Link spectral lines to energy levels', 'Use the four quantum numbers', 'Write configurations for atoms and ions', 'Count nodes and unpaired electrons', 'Estimate effective nuclear charge with Slater’s rules'],
    sections: [
      {
        title: 'Light and atomic spectra',
        html: R`
<p>Heated or excited atoms emit light only at particular wavelengths: a line spectrum. Each line is a photon released as an electron drops between two allowed energy levels, $\Delta E = hf = hc/\lambda$.</p>
<p>For hydrogen the levels are $E_n = -13.6\ \mathrm{eV}/n^2$ (or $-1312\ \mathrm{kJ/mol}/n^2$), giving the Rydberg formula</p>
<div class="key">$$\frac1\lambda = R_H\left(\frac1{n_1^2} - \frac1{n_2^2}\right),\qquad R_H = 1.097\times10^7\ \mathrm{m^{-1}}.$$</div>
<p>Lines converge at short wavelength; the convergence limit of the Lyman series ($n_1 = 1$) gives the ionisation energy of hydrogen. For one-electron ions such as He⁺ and Li²⁺, energies scale as $Z^2$.</p>`
      },
      {
        title: 'Quantum numbers and orbitals',
        html: R`
<p>Quantum mechanics replaces orbits with <strong>orbitals</strong>: regions where an electron is likely to be found. Each orbital is labelled by three quantum numbers, and each electron adds a fourth:</p>
<div class="table-wrap"><table><thead><tr><th>Symbol</th><th>Name</th><th>Allowed values</th><th>Determines</th></tr></thead><tbody>
<tr><td>$n$</td><td>principal</td><td>1, 2, 3, …</td><td>Shell, size and (mostly) energy</td></tr>
<tr><td>$l$</td><td>angular momentum</td><td>0 to $n-1$ (s, p, d, f)</td><td>Subshell and shape</td></tr>
<tr><td>$m_l$</td><td>magnetic</td><td>$-l$ to $+l$</td><td>Orientation; $2l+1$ orbitals per subshell</td></tr>
<tr><td>$m_s$</td><td>spin</td><td>$\pm\tfrac12$</td><td>Spin of the electron</td></tr>
</tbody></table></div>
<p>A shell holds $2n^2$ electrons. An orbital has $n - 1$ nodes in total: $l$ angular nodes (planes or cones) and $n - l - 1$ radial nodes (spheres). So 1s has none, 2p has one nodal plane, and 3s has two spherical nodes.</p>`
      },
      {
        title: 'Electron configurations',
        html: R`
<p>Electrons fill orbitals following three rules:</p>
<ul>
<li><strong>Aufbau principle</strong>: lowest energy first, in the order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p…</li>
<li><strong>Pauli exclusion principle</strong>: at most two electrons per orbital, with opposite spins.</li>
<li><strong>Hund's rule</strong>: in a subshell, electrons occupy separate orbitals with parallel spins before pairing.</li>
</ul>
<p>Iron is $[\mathrm{Ar}]\,3d^6 4s^2$. Chromium and copper are exceptions, $[\mathrm{Ar}]\,3d^5 4s^1$ and $[\mathrm{Ar}]\,3d^{10}4s^1$, because half-filled and filled d subshells are especially stable and 3d and 4s are close in energy.</p>
<div class="warn-box"><p>Transition metals lose their 4s electrons <em>before</em> their 3d electrons when they form ions. Fe²⁺ is $[\mathrm{Ar}]\,3d^6$ and Fe³⁺ is $[\mathrm{Ar}]\,3d^5$, not $3d^4 4s^1$.</p></div>`
      },
      {
        title: 'Shielding and effective nuclear charge',
        html: R`
<p>An outer electron does not feel the full nuclear charge $Z$: inner electrons shield it. The <strong>effective nuclear charge</strong> is $Z_{\text{eff}} = Z - S$. Slater's rules estimate the shielding constant $S$ for an electron in an s or p orbital:</p>
<ul>
<li>Each other electron in the same $(ns, np)$ group: 0.35 (0.30 for 1s).</li>
<li>Each electron in shell $n - 1$: 0.85.</li>
<li>Each electron in shell $n - 2$ or lower: 1.00.</li>
</ul>
<p>For d or f electrons, every electron in lower groups shields by 1.00. A sodium 3s electron has $S = 8(0.85) + 2(1.00) = 8.8$, so $Z_{\text{eff}} = 2.2$: barely more than one proton's worth, which is why sodium loses it so easily.</p>
<div class="insight"><p>$Z_{\text{eff}}$ explains almost every periodic trend in the next chapter. Across a period $Z$ rises by 1 while shielding rises by only 0.35, so outer electrons are held more tightly and atoms shrink.</p></div>`
      }
    ],
    labs: [
      { sim: 'aufbau', title: 'Electron configuration builder', desc: 'Orbital box diagram for elements up to xenon, filled by the Aufbau principle and Hund’s rule (with the real exceptions).',
        tasks: ['Step from Z = 21 to 30. Which two elements break the simple filling order?', 'Find the element in period 4 with the most unpaired electrons.', 'Compare N, O and F. How do the unpaired electrons change?'] }
    ],
    formulas: [
      ['Photon energy', R`\Delta E = hc/\lambda`],
      ['Hydrogen levels', R`E_n = -13.6\ \mathrm{eV}/n^2`],
      ['Hydrogen-like ions', R`E_n = -13.6Z^2/n^2\ \mathrm{eV}`],
      ['Rydberg formula', R`1/\lambda = R_H(1/n_1^2 - 1/n_2^2)`],
      ['Electrons per shell', R`2n^2`],
      ['Orbitals per subshell', R`2l + 1`],
      ['Radial nodes', R`n - l - 1`],
      ['Effective nuclear charge', R`Z_{\text{eff}} = Z - S`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Third shell', q: R`<p>What is the maximum number of electrons the $n = 3$ shell can hold?</p>`, options: ['8', '9', '18', '32'], answer: 2, hints: [R`$2n^2$.`], solution: R`<p>3s (2) + 3p (6) + 3d (10) = 18.</p>` },
      { level: 'concept', type: 'mcq', title: 'Forbidden quantum numbers', q: R`<p>Which set of quantum numbers $(n, l, m_l)$ is impossible?</p>`, options: ['(1, 0, 0)', '(2, 1, −1)', '(2, 2, 0)', '(3, 2, 2)'], answer: 2, hints: [R`$l$ can be at most $n - 1$.`], solution: R`<p>For $n = 2$, $l$ can only be 0 or 1; there is no 2d subshell.</p>` },
      { level: 'concept', type: 'mcq', title: 'Iron(III)', q: R`<p>What is the electron configuration of Fe³⁺ (Fe has Z = 26)?</p>`, options: [R`$[\mathrm{Ar}]\,3d^3 4s^2$`, R`$[\mathrm{Ar}]\,3d^5$`, R`$[\mathrm{Ar}]\,3d^6$`, R`$[\mathrm{Ar}]\,3d^4 4s^1$`], answer: 1, hints: [R`Remove 4s electrons first.`], solution: R`<p>Fe is $3d^6 4s^2$; removing both 4s and one 3d electron gives $3d^5$, a half-filled subshell.</p>` },
      { level: 'core', type: 'num', title: 'Unpaired in manganese(II)', q: R`<p>How many unpaired electrons does a free Mn²⁺ ion (Z = 25) have?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Mn²⁺ is $3d^5$.`], solution: R`<p>Five d electrons, one in each d orbital by Hund's rule: 5 unpaired.</p>` },
      { level: 'core', type: 'num', title: 'Blue-green line', q: R`<p>Find the wavelength of the hydrogen line from $n = 4$ to $n = 2$, in nm.</p>`, answer: 1e9 / (1.097e7 * (1 / 4 - 1 / 16)), tol: 0.005, unit: 'nm', hints: [R`$1/\lambda = R_H(1/4 - 1/16)$.`], solution: R`<p>$1/\lambda = 1.097\times10^7 \times 3/16$, so $\lambda = 486\ \mathrm{nm}$ (H-β).</p>` },
      { level: 'core', type: 'num', title: 'Ionising hydrogen', q: R`<p>Convert the ionisation energy of hydrogen, 13.6 eV per atom, to kJ/mol. ($1\ \mathrm{eV/atom} = 96.485\ \mathrm{kJ/mol}$)</p>`, answer: 13.6 * 96.485, tol: 0.01, unit: 'kJ/mol', hints: [R`Multiply.`], solution: R`<p>$13.6 \times 96.485 = 1312\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Radial nodes', q: R`<p>How many radial (spherical) nodes does a 5d orbital have?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`$n - l - 1$ with $l = 2$.`], solution: R`<p>$5 - 2 - 1 = 2$ radial nodes, plus 2 angular nodes.</p>` },
      { level: 'core', type: 'num', title: 'Sodium’s outer electron', q: R`<p>Use Slater's rules to find $Z_{\text{eff}}$ for the 3s electron of sodium (Z = 11).</p>`, answer: 11 - 8 * 0.85 - 2, tol: 0.01, unit: '', hints: [R`$1s^2\,2s^2 2p^6\,3s^1$.`], solution: R`<p>$S = 8(0.85) + 2(1.00) = 8.8$, $Z_{\text{eff}} = 2.2$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ionising Li²⁺', q: R`<p>What energy (in eV) is needed to remove the only electron from a ground-state Li²⁺ ion?</p>`, answer: 13.6 * 9, tol: 0.01, unit: 'eV', hints: [R`Hydrogen-like: $E = 13.6Z^2$.`], solution: R`<p>$13.6 \times 3^2 = 122.4\ \mathrm{eV}$. This is lithium's third ionisation energy, about 11 800 kJ/mol.</p>` },
      { level: 'olympiad', type: 'num', title: 'Zinc’s 4s electron', q: R`<p>Use Slater's rules to estimate $Z_{\text{eff}}$ for a 4s electron in zinc (Z = 30, $[\mathrm{Ar}]\,3d^{10}4s^2$).</p>`, answer: 30 - (0.35 + 18 * 0.85 + 10), tol: 0.01, unit: '', hints: [R`The other 4s electron: 0.35. All 18 electrons with $n = 3$: 0.85 each. The 10 electrons with $n \le 2$: 1.00 each.`], solution: R`<p>$S = 0.35 + 18(0.85) + 10(1.00) = 25.65$, so $Z_{\text{eff}} = 4.35$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Electron wave in hydrogen', q: R`<p>In the Bohr model, a whole number of de Broglie wavelengths fit around the orbit. What is the electron's wavelength in the hydrogen ground state ($a_0 = 52.9\ \mathrm{pm}$), in nm?</p>`, answer: 2 * Math.PI * 0.0529, tol: 0.01, unit: 'nm', hints: [R`For $n = 1$, one wavelength equals the circumference.`], solution: R`<p>$\lambda = 2\pi a_0 = 0.332\ \mathrm{nm}$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-atom', [
    { title: 'Hydrogen line', gen(r) { const n1 = r.int(1, 3), n2 = r.int(n1 + 1, n1 + 4); const lam = 1e9 / (1.097e7 * (1 / (n1 * n1) - 1 / (n2 * n2))); return { q: R`<p>Find the wavelength (nm) of the hydrogen line $n = ${n2} \to ${n1}$.</p>`, answer: lam, unit: 'nm', solution: R`<p>$\lambda = ${f(lam)}\ \mathrm{nm}$.</p>` }; } },
    { title: 'Unpaired electrons', gen(r) { const z = r.int(1, 36), cfg = PB.simUtil.config(z); let u = 0; cfg.forEach(([o, n]) => { const cap = { s: 2, p: 6, d: 10 }[o.slice(-1)], orb = cap / 2; u += n <= orb ? n : cap - n; }); return { q: R`<p>How many unpaired electrons does a ground-state ${PB.chemSymbols[z - 1]} atom (Z = ${z}) have?</p>`, answer: u, tol: 0.001, unit: '', solution: R`<p>Configuration: ${cfg.map((c) => c[0] + '<sup>' + c[1] + '</sup>').join(' ')}, giving ${u} unpaired.</p>` }; } },
    { title: 'Hydrogen-like ions', gen(r) { const Z = r.int(1, 6), n = r.int(1, 4); return { q: R`<p>What energy (eV) removes the electron from a one-electron ion with Z = ${Z} in level n = ${n}?</p>`, answer: 13.6 * Z * Z / (n * n), unit: 'eV', solution: R`<p>$13.6Z^2/n^2 = ${f(13.6 * Z * Z / (n * n))}\ \mathrm{eV}$.</p>` }; } }
  ]);
})();
