(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-milkyway', subject: 'astronomy', num: 14, part: 'Galaxies and Cosmology',
    title: 'The Milky Way',
    subtitle: R`Our home galaxy. Its structure and our place in it, star clusters and populations, the interstellar medium, the rotation curve and dark matter, and the black hole at the centre.`,
    goals: ['Describe the structure of the Milky Way', 'Distinguish open and globular clusters and stellar populations', 'Describe the phases of the interstellar medium', 'Use the rotation curve to find enclosed mass and evidence for dark matter', 'Weigh Sagittarius A* from stellar orbits'],
    sections: [
      {
        title: 'Structure',
        html: R`
<p>The Milky Way is a barred spiral galaxy about 30 kpc across with 100–400 billion stars. Its parts:</p>
<ul>
<li>A thin <strong>disc</strong> (about 300 pc thick) with spiral arms, gas, dust and young stars. The Sun lies in it, 8.2 kpc from the centre, and orbits at about 230 km/s, once every 220 million years: a "galactic year".</li>
<li>A central <strong>bulge</strong> and bar of older stars.</li>
<li>A spherical <strong>halo</strong> of old stars and globular clusters, and a much larger halo of <strong>dark matter</strong>.</li>
</ul>
<p>Herschel tried to map the Galaxy by counting stars and wrongly put the Sun near the centre: dust hid the rest. Shapley (1918) used globular clusters, spread around the true centre in Sagittarius, to show we are far out in the disc.</p>`
      },
      {
        title: 'Clusters and stellar populations',
        html: R`
<p><strong>Open clusters</strong> (the Pleiades, Hyades) hold hundreds to thousands of young stars in the disc and drift apart over a few hundred million years. <strong>Globular clusters</strong> hold up to a million old stars (about 12 billion years) in tight spheres in the halo.</p>
<p>Stars fall into <strong>populations</strong> by age and composition: <strong>Population I</strong> stars (the Sun, disc stars) are young and metal-rich, born from gas enriched by earlier generations; <strong>Population II</strong> stars (halo, globular clusters) are old and metal-poor. ("Metals" in astronomy means every element heavier than helium.) The hypothetical first stars, <strong>Population III</strong>, would be pure hydrogen and helium.</p>`
      },
      {
        title: 'The interstellar medium',
        html: R`
<p>Between the stars is gas (99%) and dust (1%), about 10–15% of the disc's visible mass. It comes in phases: cold molecular clouds (10 K, where stars form); cold neutral hydrogen (100 K); warm gas (8000 K); and hot coronal gas (a million K) blown out by supernovae.</p>
<p>Neutral hydrogen emits the <strong>21 cm line</strong> when the electron's spin flips relative to the proton's, an extremely rare transition, but there is so much hydrogen that the line is bright. Radio astronomers map it right through the dust, and its Doppler shifts trace the rotation and the spiral arms. <strong>H II regions</strong> such as the Orion Nebula are gas ionised by hot young O and B stars and glow red in Hα.</p>
<p>Dust absorbs and scatters blue light more than red (<strong>interstellar reddening</strong>) for the same reason the sky is blue.</p>`
      },
      {
        title: 'Rotation and dark matter',
        html: R`
<p>For a star in a circular orbit at radius $r$, gravity from the mass inside provides the centripetal force:</p>
$$\frac{v^2}{r} = \frac{GM(r)}{r^2}\quad\Rightarrow\quad M(r) = \frac{v^2r}{G}.$$
<p>If most mass were in the bright centre, speeds would fall off like $r^{-1/2}$ beyond it, as planets do. Instead the Milky Way's <strong>rotation curve</strong>, measured with 21 cm gas far beyond the visible disc, stays flat at about 220–230 km/s. So $M(r) \propto r$: mass keeps growing where there is little light. Vera Rubin's measurements of other spirals in the 1970s made the case that galaxies sit in massive halos of <strong>dark matter</strong>, about 5–10 times the mass of their stars and gas.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Find the Milky Way's mass inside the Sun's orbit ($v = 230$ km/s, $r = 8.2$ kpc).<span class="tog">Solution</span></summary><div class="sol"><p>$M = v^2r/G = (2.3\times10^5)^2\times2.53\times10^{20}/6.674\times10^{-11} = 2.0\times10^{41}$ kg $= 1.0\times10^{11}\,M_\odot$.</p></div></details>
<p>At the very centre, stars such as S2 orbit an invisible object in 16 years at up to 7650 km/s. Kepler's third law gives 4.3 million M☉ in a region smaller than the Solar System: the black hole <strong>Sagittarius A*</strong> (Nobel Prize 2020; imaged by the Event Horizon Telescope in 2022).</p>`
      }
    ],
    labs: [
      { sim: 'rotcurve', title: 'Rotation curve', desc: 'Orbital speed against radius for a model galaxy: the bulge, disc and dark halo each contribute, adding in quadrature. Red points are Milky Way-like measurements.',
        tasks: ['Set the halo speed to 0. What happens to the curve beyond 10 kpc?', 'Adjust the components to fit the data as well as you can. What fraction of the mass inside 25 kpc is dark?', 'Why is it the outer part of the curve that reveals dark matter?'] }
    ],
    formulas: [
      ['Enclosed mass', R`M(r) = v^2r/G`],
      ['Keplerian decline', R`v \propto r^{-1/2}`],
      ['Flat curve', R`M(r) \propto r`],
      ['Orbital period', R`P = 2\pi r/v`],
      ['Kepler III (central mass)', R`M = a^3/P^2\ \ (M_\odot,\text{AU},\text{yr})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Flat rotation curve', q: R`<p>What does a flat rotation curve at large radius imply?</p>`, options: ['Mass is concentrated at the centre', 'Enclosed mass grows in proportion to radius, beyond the visible light', 'Stars there are moving outward', 'There is no gravity there'], answer: 1, hints: [R`$M = v^2r/G$ with constant $v$.`], solution: R`<p>$M \propto r$: unseen mass extends far out.</p>` },
      { level: 'concept', type: 'mcq', title: 'Globular clusters', q: R`<p>Compared with open clusters, globular clusters are…</p>`, options: ['Younger and metal-rich', 'Older, metal-poor and in the halo', 'Made of gas', 'Found only in spiral arms'], answer: 1, hints: [R`Population II.`], solution: R`<p>Old, metal-poor halo objects.</p>` },
      { level: 'concept', type: 'mcq', title: '21 cm', q: R`<p>Why is the 21 cm line so useful for mapping the Galaxy?</p>`, options: ['It is very energetic', 'Radio waves pass through dust and neutral hydrogen is everywhere', 'It comes only from stars', 'It is visible to the eye'], answer: 1, hints: [R`Dust blocks visible light.`], solution: R`<p>It traces the most common element and penetrates dust.</p>` },
      { level: 'core', type: 'num', title: 'Galactic year', q: R`<p>The Sun orbits at 230 km/s at 8.2 kpc. Find its orbital period, in millions of years (1 pc = 3.086 × 10¹³ km).</p>`, answer: 219, tol: 0.01, unit: 'Myr', hints: [R`$2\pi r/v$.`], solution: R`<p>$2\pi\times2.53\times10^{17}/230 = 6.91\times10^{15}$ s $= 219$ Myr.</p>` },
      { level: 'core', type: 'num', title: 'Mass inside the Sun', q: R`<p>Find the mass inside the Sun's orbit ($v = 230$ km/s, $r = 8.2$ kpc), in units of 10¹¹ M☉.</p>`, answer: 1.01, tol: 0.02, unit: '×10¹¹ M☉', hints: [R`$v^2r/G$.`], solution: R`<p>$1.0\times10^{11}\,M_\odot$.</p>` },
      { level: 'core', type: 'num', title: 'Mass at 50 kpc', q: R`<p>If the rotation curve stays flat at 220 km/s out to 50 kpc, what is the enclosed mass there, in units of 10¹¹ M☉?</p>`, answer: 5.63, tol: 0.02, unit: '×10¹¹ M☉', hints: [R`$v^2r/G$ with $r = 1.543\times10^{21}$ m.`], solution: R`<p>$5.6\times10^{11}\,M_\odot$, several times the mass of stars and gas.</p>` },
      { level: 'core', type: 'num', title: 'Keplerian expectation', q: R`<p>If all the mass were inside 8 kpc and $v(8\ \text{kpc}) = 230$ km/s, what would $v$ be at 32 kpc?</p>`, answer: 115, tol: 0.005, unit: 'km/s', hints: [R`$v \propto r^{-1/2}$.`], solution: R`<p>$230/2 = 115$ km/s; the measured value is about 200.</p>` },
      { level: 'core', type: 'num', title: '21 cm Doppler', q: R`<p>A hydrogen cloud's 21 cm line (rest frequency 1420.41 MHz) is observed at 1420.00 MHz. What is its radial velocity, in km/s? (Receding positive.)</p>`, answer: 86.6, tol: 0.01, unit: 'km/s', hints: [R`$v = c\,\Delta f/f$ (sign: lower frequency means receding).`], solution: R`<p>$3\times10^5\times0.41/1420.41 = 86.6$ km/s, receding.</p>` },
      { level: 'olympiad', type: 'num', title: 'Weighing Sgr A*', q: R`<p>The star S2 orbits Sgr A* with period 16.05 years and semi-major axis 0.125″, at a distance of 8.2 kpc. Find the black hole's mass in millions of M☉.</p>`, answer: 4.18, tol: 0.03, unit: '×10⁶ M☉', hints: [R`$a = 0.125\times8200$ AU.`], solution: R`<p>$a = 1025$ AU; $M = 1025^3/16.05^2 = 1.077\times10^9/257.6 = 4.18\times10^6\,M_\odot$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Density of dark matter', q: R`<p>For a flat rotation curve, the density falls as $\rho = v^2/(4\pi Gr^2)$. Find the local density at the Sun ($v = 230$ km/s, $r = 8.2$ kpc), in M☉/pc³.</p>`, answer: 0.0145, tol: 0.03, unit: 'M☉/pc³', hints: [R`Work in SI, then convert: 1 M☉/pc³ = 6.77 × 10⁻²⁰ kg/m³.`], solution: R`<p>$\rho = (2.3\times10^5)^2/(4\pi\times6.674\times10^{-11}\times(2.53\times10^{20})^2) = 9.8\times10^{-22}$ kg/m³ $= 0.015\,M_\odot$/pc³, close to the measured local dark-matter density of about 0.01 M☉/pc³.</p>` },
      { level: 'olympiad', type: 'num', title: 'Escape from the Galaxy', q: R`<p>For a halo with flat speed $v_c$ out to $r_{\max}$, the escape speed at $r$ is $v_c\sqrt{2(1 + \ln(r_{\max}/r))}$. With $v_c = 230$ km/s, $r = 8.2$ kpc and $r_{\max} = 100$ kpc, find it in km/s.</p>`, answer: 609, tol: 0.01, unit: 'km/s', hints: [R`$\ln(12.2) = 2.50$.`], solution: R`<p>$230\sqrt{2\times3.50} = 230\times2.646 = 609$ km/s; measured values are about 550–600 km/s.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-milkyway', [
    { title: 'Enclosed mass', gen(r) { const v = r.int(100, 350), kpc = r.step(2, 60, 0.5); const M = (v * 1e3) ** 2 * kpc * 3.086e19 / 6.674e-11 / 1.989e30; return { q: R`<p>Stars at ${f(kpc)} kpc orbit at ${v} km/s. What mass lies inside their orbit, in units of 10¹⁰ M☉?</p>`, answer: M / 1e10, tol: 0.01, unit: '×10¹⁰ M☉', solution: R`<p>$v^2r/G = ${f(M / 1e10)}\times10^{10}\,M_\odot$.</p>` }; } },
    { title: 'Galactic orbit period', gen(r) { const v = r.int(100, 350), kpc = r.step(1, 40, 0.5); const P = 2 * Math.PI * kpc * 3.086e16 / v / 3.156e13; return { q: R`<p>A star orbits at ${f(kpc)} kpc with speed ${v} km/s. What is its period, in Myr?</p>`, answer: P, tol: 0.01, unit: 'Myr', solution: R`<p>$2\pi r/v = ${f(P)}$ Myr.</p>` }; } },
    { title: 'Keplerian falloff', gen(r) { const v0 = r.int(150, 300), k = r.pick([2, 3, 4, 9, 16]); return { q: R`<p>If all of a galaxy's mass were inside radius $r_0$ where $v = ${v0}$ km/s, what would $v$ be at ${k}$r_0$?</p>`, answer: v0 / Math.sqrt(k), tol: 0.005, unit: 'km/s', solution: R`<p>$${v0}/\sqrt{${k}} = ${f(v0 / Math.sqrt(k))}$ km/s.</p>` }; } }
  ]);
})();
