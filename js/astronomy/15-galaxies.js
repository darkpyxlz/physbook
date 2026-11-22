(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-galaxies', subject: 'astronomy', num: 15, part: 'Galaxies and Cosmology',
    title: 'Galaxies and the Distance Ladder',
    subtitle: R`Island universes. The Hubble classification, Cepheids and the cosmic distance ladder, Hubble's law, active galaxies and quasars, clusters, and gravitational lensing.`,
    goals: ['Classify galaxies by shape and explain what the types mean', 'Use the Cepheid period–luminosity relation', 'Describe each rung of the distance ladder', 'Apply Hubble\'s law and find the Hubble time', 'Explain how active galactic nuclei are powered'],
    sections: [
      {
        title: 'Types of galaxy',
        html: R`
<p>In 1924 Hubble found Cepheid variables in the Andromeda "nebula" and showed it lies far outside the Milky Way, settling the Great Debate: the universe is full of galaxies. Hubble sorted them by shape:</p>
<ul>
<li><strong>Ellipticals</strong> (E0–E7, by flattening): smooth, old red stars, little gas, little star formation. The largest, at the centres of clusters, have over $10^{13}$ stars.</li>
<li><strong>Spirals</strong> (Sa–Sc, and barred SBa–SBc): discs with arms of young blue stars and gas, plus a bulge. The Milky Way is roughly SBbc.</li>
<li><strong>Lenticulars</strong> (S0): discs without arms or much gas.</li>
<li><strong>Irregulars</strong>, like the Magellanic Clouds.</li>
</ul>
<p>Galaxies grow by merging. Andromeda is approaching us at 110 km/s and will merge with the Milky Way in about 4.5 billion years, probably producing an elliptical.</p>`
      },
      {
        title: 'The distance ladder',
        html: R`
<p>Each method calibrates the next, longer one:</p>
<ol>
<li><strong>Radar</strong> within the Solar System gives the AU.</li>
<li><strong>Parallax</strong> (Gaia) out to a few kpc.</li>
<li><strong>Cepheid variables</strong>: pulsating supergiants whose period is tied to luminosity (Henrietta Leavitt, 1912). One calibration: $M_V \approx -2.43(\log_{10}P - 1) - 4.05$ with $P$ in days. Measure the period, read off $M$, compare with $m$. Bright enough to reach about 40 Mpc with Hubble/JWST.</li>
<li><strong>Type Ia supernovae</strong> as standard candles to thousands of Mpc. Tip of the red giant branch, Tully–Fisher (spiral rotation speed against luminosity) and surface brightness fluctuations fill in.</li>
<li><strong>Hubble's law</strong> itself for the most distant objects.</li>
</ol>
<p>Errors propagate up the ladder; the current disagreement between ladder and cosmic-background measurements of $H_0$ (about 73 against 67.4 km/s/Mpc) is the <strong>Hubble tension</strong>.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A Cepheid with period 30 days has mean apparent magnitude 24.0. How far away is it?<span class="tog">Solution</span></summary><div class="sol"><p>$M = -2.43(1.477 - 1) - 4.05 = -5.21$. $m - M = 29.21$, so $d = 10^{(29.21 + 5)/5} = 6.96\times10^6$ pc $= 7.0$ Mpc.</p></div></details>`
      },
      {
        title: 'Hubble\'s law',
        html: R`
<p>Slipher and Hubble found that nearly all galaxies are redshifted, and the farther they are, the faster they recede:</p>
$$v = H_0d,\qquad z = \frac{\Delta\lambda}{\lambda_0} \approx \frac vc\ \ (z \ll 1).$$
<p>$H_0 \approx 70$ km/s/Mpc. This is not motion through space away from us but the expansion of space itself: every galaxy sees all others receding (no centre). Running the expansion backwards gives the <strong>Hubble time</strong>,</p>
$$t_H = \frac1{H_0} \approx \frac{977.8}{H_0\ [\text{km/s/Mpc}]}\ \text{Gyr} \approx 14\ \text{Gyr},$$
<p>close to the age of the universe. Nearby galaxies also have <strong>peculiar velocities</strong> of a few hundred km/s, so Hubble's law only works well beyond about 10–20 Mpc.</p>`
      },
      {
        title: 'Active galaxies, clusters and lensing',
        html: R`
<p>Every large galaxy has a <strong>supermassive black hole</strong> at its centre, from millions to billions of solar masses. When gas falls in, the accretion disc can outshine the whole galaxy: an <strong>active galactic nucleus</strong>. <strong>Quasars</strong> are the most luminous, up to $10^{14}\,L_\odot$, seen at redshifts beyond 7. Accretion converts up to about 10% of rest-mass energy into light ($L = \eta\dot Mc^2$), far more efficient than fusion's 0.7%. Rapid brightness changes over a time $\Delta t$ limit the source size to about $c\Delta t$.</p>
<p>Galaxies gather into <strong>groups</strong> (our Local Group of about 80 galaxies) and <strong>clusters</strong> of thousands, filled with X-ray-hot gas. Galaxy speeds in clusters (Zwicky, 1933) and hot gas both point to dark matter, about 85% of all matter. Massive clusters bend light from background galaxies into arcs: <strong>gravitational lensing</strong>, which maps the dark matter directly.</p>`
      }
    ],
    labs: [
      { sim: 'cepheid', title: 'Cepheid distances', desc: 'A Cepheid\'s light curve (left) and its place on the period–luminosity relation (right).',
        tasks: ['Find the distance modulus of a 10-day Cepheid at 0.77 Mpc (Andromeda).', 'Add 1 magnitude of dust. By what factor is the distance overestimated?', 'Which Cepheids are better for distant galaxies, short- or long-period? Why?'] },
      { sim: 'hubble', title: 'Measuring the Hubble constant', desc: 'Simulated galaxies with distance errors and random peculiar velocities. A line through the origin is fitted to find H₀.',
        tasks: ['Survey only to 20 Mpc with 400 km/s scatter. How well is H₀ measured?', 'Extend the survey to 300 Mpc. Why does the precision improve?', 'Set the distance error to 20%. What matters more now: depth or the distance error?'] }
    ],
    formulas: [
      ['Cepheid P–L relation', R`M_V = -2.43(\log_{10}P - 1) - 4.05`],
      ['Hubble\'s law', R`v = H_0d`],
      ['Redshift', R`z = \Delta\lambda/\lambda_0 \approx v/c`],
      ['Hubble time', R`t_H = 977.8/H_0\ \text{Gyr}`],
      ['Accretion luminosity', R`L = \eta\dot Mc^2`],
      ['Size from variability', R`R \lesssim c\Delta t`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Ellipticals', q: R`<p>Elliptical galaxies typically have…</p>`, options: ['Lots of gas and young blue stars', 'Old red stars and little gas', 'Spiral arms', 'Mostly dark matter and no stars'], answer: 1, hints: [R`Little star formation.`], solution: R`<p>Old stellar populations with little cold gas.</p>` },
      { level: 'concept', type: 'mcq', title: 'No centre', q: R`<p>Every galaxy sees the others receding. This means…</p>`, options: ['We are at the centre of the universe', 'Space is expanding uniformly, with no centre', 'Galaxies are repelled by the Milky Way', 'Light gets tired'], answer: 1, hints: [R`Raisins in rising dough.`], solution: R`<p>Uniform expansion looks the same from every point.</p>` },
      { level: 'concept', type: 'mcq', title: 'Quasar power', q: R`<p>What powers a quasar?</p>`, options: ['Nuclear fusion in giant stars', 'Accretion onto a supermassive black hole', 'Supernovae', 'Dark matter annihilation'], answer: 1, hints: [R`Efficiency of up to 10%.`], solution: R`<p>Gas heated as it spirals into a supermassive black hole.</p>` },
      { level: 'core', type: 'num', title: 'Hubble\'s law', q: R`<p>A galaxy recedes at 7000 km/s. With $H_0 = 70$ km/s/Mpc, how far away is it, in Mpc?</p>`, answer: 100, tol: 0.002, unit: 'Mpc', hints: [R`$v/H_0$.`], solution: R`<p>100 Mpc.</p>` },
      { level: 'core', type: 'num', title: 'Redshift', q: R`<p>The Hα line (656.3 nm) of a galaxy is seen at 669.4 nm. What is its recession velocity, in km/s?</p>`, answer: 5988, tol: 0.01, unit: 'km/s', hints: [R`$z = 13.1/656.3$.`], solution: R`<p>$z = 0.01996$; $v = cz = 5990$ km/s.</p>` },
      { level: 'core', type: 'num', title: 'Hubble time', q: R`<p>Find the Hubble time for $H_0 = 67.4$ km/s/Mpc, in Gyr.</p>`, answer: 14.51, tol: 0.005, unit: 'Gyr', hints: [R`977.8/H₀.`], solution: R`<p>14.5 Gyr (the actual age, 13.8 Gyr, depends on how the expansion rate has changed).</p>` },
      { level: 'core', type: 'num', title: 'Cepheid magnitude', q: R`<p>What is the absolute magnitude of a Cepheid with a 50-day period?</p>`, answer: -5.75, tol: 0.005, unit: '', hints: [R`$\log_{10}50 = 1.699$.`], solution: R`<p>$-2.43\times0.699 - 4.05 = -5.75$.</p>` },
      { level: 'core', type: 'num', title: 'Cepheid distance', q: R`<p>A 50-day Cepheid has mean apparent magnitude 25.5. Find its distance in Mpc.</p>`, answer: 17.7, tol: 0.02, unit: 'Mpc', hints: [R`$m - M = 31.25$.`], solution: R`<p>$d = 10^{(31.25 + 5)/5} = 1.78\times10^7$ pc $= 17.8$ Mpc: the Virgo Cluster.</p>` },
      { level: 'olympiad', type: 'num', title: 'Quasar size', q: R`<p>A quasar's brightness doubles in 2 days. What is the maximum size of the emitting region, in AU?</p>`, answer: 346, tol: 0.01, unit: 'AU', hints: [R`$c\Delta t$.`], solution: R`<p>$3\times10^8\times172\,800 = 5.18\times10^{13}$ m $= 346$ AU: a whole galaxy's light from a region the size of the Solar System.</p>` },
      { level: 'olympiad', type: 'num', title: 'Quasar fuel', q: R`<p>A quasar has $L = 10^{40}$ W with 10% efficiency. How much mass does it accrete per year, in M☉?</p>`, answer: 17.6, tol: 0.02, unit: 'M☉/yr', hints: [R`$\dot M = L/\eta c^2$.`], solution: R`<p>$10^{40}/(0.1\times9\times10^{16}) = 1.11\times10^{24}$ kg/s; × 3.156 × 10⁷ s = $3.5\times10^{31}$ kg $= 17.6\,M_\odot$ per year.</p>` },
      { level: 'olympiad', type: 'num', title: 'Andromeda collision', q: R`<p>Andromeda is 0.77 Mpc away and approaching at 110 km/s. If the speed stayed constant, how long until collision, in Gyr? (The real answer is shorter because gravity speeds it up.)</p>`, answer: 6.85, tol: 0.01, unit: 'Gyr', hints: [R`$d/v$; 1 Mpc = 3.086 × 10¹⁹ km.`], solution: R`<p>$2.376\times10^{19}/110 = 2.16\times10^{17}$ s $= 6.8$ Gyr.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-galaxies', [
    { title: 'Hubble distance', gen(r) { const v = r.int(10, 300) * 100, H = r.pick([65, 67.4, 70, 73]); return { q: R`<p>A galaxy recedes at ${v} km/s. With $H_0 = ${H}$ km/s/Mpc, how far away is it, in Mpc?</p>`, answer: v / H, tol: 0.005, unit: 'Mpc', solution: R`<p>$${v}/${H} = ${f(v / H)}$ Mpc.</p>` }; } },
    { title: 'Cepheid distance', gen(r) { const P = r.step(2, 80, 0.5), d = Math.pow(10, r.step(4, 7.5, 0.05)); const M = -2.43 * (Math.log10(P) - 1) - 4.05, m = M + 5 * Math.log10(d) - 5; return { q: R`<p>A Cepheid with period ${f(P)} days has mean apparent magnitude ${m.toFixed(2)}. Using $M_V = -2.43(\log_{10}P - 1) - 4.05$, find its distance in kpc.</p>`, answer: Math.pow(10, (+m.toFixed(2) - M + 5) / 5) / 1000, tol: 0.01, unit: 'kpc', solution: R`<p>$M = ${M.toFixed(2)}$; $d = 10^{(m - M + 5)/5} = ${f(Math.pow(10, (+m.toFixed(2) - M + 5) / 5) / 1000)}$ kpc.</p>` }; } },
    { title: 'Redshift velocity', gen(r) { const z = r.step(0.001, 0.08, 0.001); return { q: R`<p>A galaxy has redshift $z = ${z}$. Using $v = cz$, what is its recession speed, in km/s?</p>`, answer: 299792 * z, tol: 0.005, unit: 'km/s', solution: R`<p>$299\,792\times${z} = ${f(299792 * z)}$ km/s.</p>` }; } }
  ]);
})();
