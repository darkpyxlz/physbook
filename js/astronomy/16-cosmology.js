(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-cosmology', subject: 'astronomy', num: 16, part: 'Galaxies and Cosmology',
    title: 'Cosmology',
    subtitle: R`The universe as a whole. Expansion and the scale factor, cosmological redshift, the Friedmann equation and critical density, the cosmic microwave background, Big Bang nucleosynthesis, and dark energy.`,
    goals: ['Use the scale factor and cosmological redshift', 'Apply the Friedmann equation and critical density', 'Explain the evidence for the Big Bang', 'Relate the CMB temperature to redshift', 'Describe the evidence for dark energy and the fate of the universe'],
    sections: [
      {
        title: 'The expanding universe',
        html: R`
<p>The <strong>cosmological principle</strong>: on large scales the universe is homogeneous and isotropic. Then all distances grow by the same factor, the <strong>scale factor</strong> $a(t)$, set to 1 today. Hubble's law follows directly, with $H = \dot a/a$.</p>
<p>Light stretches with space, so the <strong>cosmological redshift</strong> measures how much the universe has expanded since the light left:</p>
$$1 + z = \frac{\lambda_{\text{obs}}}{\lambda_{\text{emit}}} = \frac{1}{a_{\text{emit}}}.$$
<p>A galaxy at $z = 3$ emitted its light when the universe was a quarter of its present size. This is not a Doppler shift, so $z$ can exceed 1 without anything moving faster than light. The most distant galaxies JWST has confirmed are beyond $z = 14$.</p>`
      },
      {
        title: 'The Friedmann equation',
        html: R`
<p>General relativity applied to a uniform universe gives the <strong>Friedmann equation</strong>:</p>
$$H^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}.$$
<p>A universe with no cosmological constant is flat ($k = 0$) when its density equals the <strong>critical density</strong></p>
$$\rho_c = \frac{3H_0^2}{8\pi G} \approx 9\times10^{-27}\ \text{kg/m}^3,$$
<p>about 5 hydrogen atoms per cubic metre. Densities are quoted as fractions $\Omega = \rho/\rho_c$. Matter dilutes as $a^{-3}$, radiation as $a^{-4}$ (fewer photons per volume and each one redshifted), and a cosmological constant not at all. In terms of the present values,</p>
$$H(a)^2 = H_0^2\left(\Omega_r a^{-4} + \Omega_m a^{-3} + \Omega_k a^{-2} + \Omega_\Lambda\right).$$
<p>Measurements give a flat universe with $\Omega_m \approx 0.31$ (of which normal matter is only 0.05) and $\Omega_\Lambda \approx 0.69$. For a flat, matter-only universe, $a \propto t^{2/3}$ and the age is $\tfrac23t_H$; dark energy makes the real age (13.8 Gyr) close to $t_H$.</p>`
      },
      {
        title: 'The hot Big Bang',
        html: R`
<p>Going back in time, the universe was denser and hotter, with radiation temperature $T \propto 1/a$, so $T = T_0(1 + z)$. Three pieces of evidence make the Big Bang model compelling:</p>
<ol>
<li><strong>Expansion</strong> (Hubble's law).</li>
<li><strong>The cosmic microwave background</strong> (CMB), found by Penzias and Wilson in 1965: a near-perfect blackbody at $T_0 = 2.725$ K coming from every direction. It is light released at <strong>recombination</strong>, when the universe cooled to about 3000 K ($z \approx 1100$, age 380 000 years) and electrons joined nuclei, making the gas transparent. Its tiny ripples (1 part in 100 000), mapped by COBE, WMAP and Planck, are the seeds of all galaxies and pin down the cosmological parameters.</li>
<li><strong>Big Bang nucleosynthesis</strong>: in the first few minutes, at about $10^9$ K, protons and neutrons fused into helium, about 25% by mass, plus traces of deuterium and lithium, exactly as observed in the oldest gas. Heavier elements came later from stars.</li>
</ol>
<p>The CMB is uniform even across regions that could never have been in contact, the horizon problem; and the universe is surprisingly flat. <strong>Inflation</strong>, a burst of exponential expansion in the first $10^{-32}$ s, is the leading explanation.</p>`
      },
      {
        title: 'Dark energy and the fate of the universe',
        html: R`
<p>In 1998 two teams used Type Ia supernovae to measure the expansion history and found distant supernovae fainter than expected: the expansion is <strong>accelerating</strong> (Nobel Prize 2011). Something with negative pressure, <strong>dark energy</strong>, makes up about 69% of the universe's energy. The simplest version is Einstein's cosmological constant, the energy of empty space. Its predicted size from quantum theory is about $10^{120}$ times too large, one of the deepest puzzles in physics.</p>
<p>The <strong>deceleration parameter</strong> $q_0 = \Omega_m/2 - \Omega_\Lambda$ is negative today ($\approx -0.53$). Expansion switched from slowing to speeding up about 6 billion years ago. If dark energy stays constant, the universe will expand forever, galaxies outside our Local Group will fade beyond view, and stars will eventually burn out: a cold, dark future. With enough matter and no dark energy it could have recollapsed in a "big crunch".</p>`
      }
    ],
    labs: [
      { sim: 'cosmo', title: 'Expansion history', desc: 'The scale factor against time for a universe with chosen matter and dark-energy densities, integrated from the Friedmann equations. The dashed line is constant expansion.',
        tasks: ['For our universe, read the age. Compare it with the Hubble time.', 'Try the Einstein–de Sitter universe. Check that the age is two-thirds of the Hubble time.', 'Make a closed universe with Ωₘ = 2.5 and no dark energy. When does it recollapse?'] }
    ],
    formulas: [
      ['Cosmological redshift', R`1 + z = 1/a`],
      ['Friedmann equation', R`H^2 = \tfrac{8\pi G}{3}\rho - kc^2/a^2 + \Lambda c^2/3`],
      ['Critical density', R`\rho_c = 3H_0^2/8\pi G`],
      ['Expansion rate', R`H^2 = H_0^2(\Omega_ma^{-3} + \Omega_ka^{-2} + \Omega_\Lambda)`],
      ['CMB temperature', R`T = T_0(1 + z)`],
      ['Deceleration parameter', R`q_0 = \Omega_m/2 - \Omega_\Lambda`],
      ['Matter-only age', R`t_0 = \tfrac23\,t_H`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'CMB origin', q: R`<p>The cosmic microwave background comes from…</p>`, options: ['The first stars', 'The moment the universe became transparent, about 380 000 years after the Big Bang', 'Radio galaxies', 'Dust in the Milky Way'], answer: 1, hints: [R`Recombination.`], solution: R`<p>Light released at recombination, redshifted by a factor of 1100.</p>` },
      { level: 'concept', type: 'mcq', title: 'Dark energy evidence', q: R`<p>The first strong evidence for dark energy came from…</p>`, options: ['Galaxy rotation curves', 'Distant Type Ia supernovae appearing fainter than expected', 'The CMB temperature', 'Helium abundance'], answer: 1, hints: [R`1998.`], solution: R`<p>Supernovae showed the expansion is accelerating.</p>` },
      { level: 'concept', type: 'mcq', title: 'Helium', q: R`<p>Why is about 25% of the ordinary matter in the universe helium?</p>`, options: ['Stars made it all', 'It was made in the first few minutes, in Big Bang nucleosynthesis', 'It comes from radioactive decay', 'Dark matter decays into it'], answer: 1, hints: [R`Stars cannot make that much.`], solution: R`<p>Big Bang nucleosynthesis.</p>` },
      { level: 'core', type: 'num', title: 'Scale factor', q: R`<p>A quasar has $z = 4$. How big was the universe then, as a fraction of today?</p>`, answer: 0.2, tol: 0.002, unit: '', hints: [R`$1/(1+z)$.`], solution: R`<p>One fifth.</p>` },
      { level: 'core', type: 'num', title: 'CMB in the past', q: R`<p>What was the CMB temperature at $z = 6$?</p>`, answer: 19.08, tol: 0.005, unit: 'K', hints: [R`$2.725\times7$.`], solution: R`<p>19.1 K.</p>` },
      { level: 'core', type: 'num', title: 'Observed wavelength', q: R`<p>The Lyman-α line (121.6 nm) is emitted at $z = 9$. At what wavelength is it observed, in nm?</p>`, answer: 1216, tol: 0.002, unit: 'nm', hints: [R`$\lambda(1 + z)$.`], solution: R`<p>1216 nm, in the infrared: why JWST works in infrared.</p>` },
      { level: 'core', type: 'num', title: 'Critical density', q: R`<p>Find the critical density for $H_0 = 70$ km/s/Mpc, in units of 10⁻²⁶ kg/m³.</p>`, answer: 0.92, tol: 0.01, unit: '×10⁻²⁶ kg/m³', hints: [R`$H_0 = 2.27\times10^{-18}$ s⁻¹.`], solution: R`<p>$3(2.27\times10^{-18})^2/(8\pi\times6.674\times10^{-11}) = 9.2\times10^{-27}$ kg/m³.</p>` },
      { level: 'core', type: 'num', title: 'Matter-only age', q: R`<p>A flat, matter-only universe has $H_0 = 70$ km/s/Mpc. What is its age, in Gyr?</p>`, answer: 9.31, tol: 0.005, unit: 'Gyr', hints: [R`$\tfrac23\times977.8/70$.`], solution: R`<p>9.3 Gyr: younger than the oldest stars, one sign that dark energy was needed.</p>` },
      { level: 'olympiad', type: 'num', title: 'CMB peak', q: R`<p>At what wavelength does the CMB (2.725 K) peak, in mm?</p>`, answer: 1.063, tol: 0.005, unit: 'mm', hints: [R`Wien's law.`], solution: R`<p>$2.898\times10^{-3}/2.725 = 1.06$ mm: microwaves.</p>` },
      { level: 'olympiad', type: 'num', title: 'Matter–radiation equality', q: R`<p>Today $\Omega_m = 0.31$ and $\Omega_r = 9.1\times10^{-5}$. At what redshift were their densities equal?</p>`, answer: 3406, tol: 0.01, unit: '', hints: [R`$\rho_r/\rho_m \propto 1/a$.`], solution: R`<p>$a = \Omega_r/\Omega_m = 2.94\times10^{-4}$, so $z = 1/a - 1 = 3400$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Acceleration began', q: R`<p>In a flat universe with $\Omega_m = 0.31$ and $\Omega_\Lambda = 0.69$, acceleration starts when $\Omega_m a^{-3} = 2\Omega_\Lambda$. At what redshift?</p>`, answer: 0.646, tol: 0.01, unit: '', hints: [R`$a^3 = 0.31/1.38$.`], solution: R`<p>$a = 0.608$, $z = 0.65$, about 6 billion years ago.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-cosmology', [
    { title: 'Redshift and scale', gen(r) { const z = r.step(0.1, 15, 0.1), q = r.pick(['scale', 'temp', 'lambda']); if (q === 'scale') return { q: R`<p>An object has $z = ${f(z)}$. What was the scale factor when its light was emitted?</p>`, answer: 1 / (1 + z), tol: 0.005, unit: '', solution: R`<p>$1/(1 + ${f(z)}) = ${f(1 / (1 + z))}$.</p>` }; if (q === 'temp') return { q: R`<p>What was the CMB temperature at $z = ${f(z)}$, in K?</p>`, answer: 2.725 * (1 + z), tol: 0.005, unit: 'K', solution: R`<p>$2.725(1 + ${f(z)}) = ${f(2.725 * (1 + z))}$ K.</p>` }; return { q: R`<p>Hα (656.3 nm) is emitted at $z = ${f(z)}$. At what wavelength is it observed, in μm?</p>`, answer: 0.6563 * (1 + z), tol: 0.005, unit: 'μm', solution: R`<p>$0.6563(1 + ${f(z)}) = ${f(0.6563 * (1 + z))}\ \mu$m.</p>` }; } },
    { title: 'Critical density', gen(r) { const H = r.pick([50, 60, 67.4, 70, 73, 80]); const Hs = H / 3.0857e19; const rc = 3 * Hs * Hs / (8 * Math.PI * 6.674e-11); return { q: R`<p>Find the critical density for $H_0 = ${H}$ km/s/Mpc, in units of 10⁻²⁷ kg/m³.</p>`, answer: rc * 1e27, tol: 0.01, unit: '×10⁻²⁷ kg/m³', solution: R`<p>$3H_0^2/8\pi G = ${f(rc * 1e27)}\times10^{-27}$ kg/m³.</p>` }; } },
    { title: 'Deceleration parameter', gen(r) { const m = r.step(0.1, 1.5, 0.01), l = r.step(0, 1.2, 0.01); const q = m / 2 - l; return { q: R`<p>A universe has $\Omega_m = ${f(m)}$ and $\Omega_\Lambda = ${f(l)}$. What is $q_0$? (Negative means accelerating.)</p>`, answer: q, tol: 0.005, atol: 0.005, unit: '', solution: R`<p>$${f(m)}/2 - ${f(l)} = ${f(q)}$.</p>` }; } }
  ]);
})();
