(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-magnitudes', subject: 'astronomy', num: 9, part: 'The Stars',
    title: 'Brightness and Distance',
    subtitle: R`How bright and how far. Flux and the inverse-square law, the magnitude scale, absolute magnitude and the distance modulus, parallax, extinction, and the units of astronomical distance.`,
    goals: ['Use the inverse-square law for flux', 'Convert between magnitude differences and flux ratios', 'Use absolute magnitude and the distance modulus', 'Measure distance by parallax', 'Correct for interstellar extinction'],
    sections: [
      {
        title: 'Flux and luminosity',
        html: R`
<p>A star's <strong>luminosity</strong> $L$ is its total power output (the Sun: $L_\odot = 3.83\times10^{26}$ W). What we measure is the <strong>flux</strong> (brightness) $F$, the power per square metre arriving at Earth. Spreading over a sphere,</p>
$$F = \frac{L}{4\pi d^2}.$$
<p>Two stars can look equally bright because one is luminous and far, the other dim and near. To know $L$ we need $d$.</p>
<p>Units of distance: the <strong>astronomical unit</strong> (1 AU = $1.496\times10^{11}$ m), the <strong>light-year</strong> ($9.46\times10^{15}$ m) and the <strong>parsec</strong> (1 pc = 206 265 AU = 3.26 ly = $3.086\times10^{16}$ m).</p>`
      },
      {
        title: 'Magnitudes',
        html: R`
<p>Hipparchus ranked stars from 1st magnitude (brightest) to 6th (faintest visible). Pogson (1856) made it exact: a difference of 5 magnitudes is a factor of exactly 100 in flux, so each magnitude is a factor $100^{1/5} = 2.512$.</p>
$$m_1 - m_2 = -2.5\log_{10}\frac{F_1}{F_2},\qquad \frac{F_1}{F_2} = 10^{-0.4(m_1 - m_2)}.$$
<p>The scale runs backwards (brighter = smaller) and can go negative: Sirius −1.46, Venus up to −4.9, the full Moon −12.7, the Sun −26.74. Vega defines roughly 0. The faintest objects seen by JWST are about magnitude 31.</p>
<p>Magnitudes do not add: to combine stars, add fluxes first. Two equal stars together are $2.5\log_{10}2 = 0.75$ mag brighter than one.</p>`
      },
      {
        title: 'Absolute magnitude and the distance modulus',
        html: R`
<p>The <strong>absolute magnitude</strong> $M$ is the apparent magnitude a star would have at 10 pc. Comparing with the inverse-square law:</p>
$$m - M = 5\log_{10}\frac{d}{10\ \text{pc}} = 5\log_{10}d - 5.$$
<p>The quantity $m - M$ is the <strong>distance modulus</strong>. The Sun has $M_V = 4.83$; Rigel about −7. Luminosities follow from $M_1 - M_2 = -2.5\log_{10}(L_1/L_2)$.</p>
<p>Dust between the stars dims and reddens light: <strong>extinction</strong> $A$ (in magnitudes) makes stars look fainter, so</p>
$$m - M = 5\log_{10}d - 5 + A.$$
<p>Ignoring it overestimates distances. In the Galactic plane $A_V$ is about 1–2 mag per kpc; towards the Galactic centre it is about 30 mag, which is why we study the centre in infrared and radio.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A star has $m = 9.0$ and $M = -1.0$, with no extinction. How far away is it?<span class="tog">Solution</span></summary><div class="sol"><p>$m - M = 10 = 5\log_{10}d - 5$, so $\log_{10}d = 3$ and $d = 1000$ pc.</p></div></details>`
      },
      {
        title: 'Parallax',
        html: R`
<p>As Earth orbits, a nearby star shifts against distant ones. Its <strong>parallax</strong> $p$ is half the total shift, the angle subtended by 1 AU at the star. By definition of the parsec:</p>
$$d\,[\text{pc}] = \frac{1}{p\,[\text{arcsec}]}.$$
<p>Bessel measured the first parallax in 1838 (61 Cygni, 0.31″). The nearest star, Proxima Centauri, has $p = 0.768''$, so $d = 1.30$ pc. From the ground, parallaxes are limited to about 0.01″ (100 pc). The Hipparcos satellite reached about 1 mas; <strong>Gaia</strong> measures nearly 2 billion stars to about 0.02 mas for bright stars, mapping a large part of the Milky Way in 3D.</p>
<p>A star's path over a year is an ellipse with semi-major axis $p$ and semi-minor axis $p\sin\beta$, where $\beta$ is its ecliptic latitude. Stars also drift across the sky by <strong>proper motion</strong> $\mu$; their sideways speed is $v_t = 4.74\,\mu d$ km/s ($\mu$ in ″/yr, $d$ in pc).</p>`
      }
    ],
    labs: [
      { sim: 'parallax', title: 'Parallax over a year', desc: 'Earth goes round the Sun (left, not to scale) and the near star traces an ellipse on the sky against the background (right).',
        tasks: ['At 10 pc, what is the parallax? At 100 pc?', 'Change the ecliptic latitude from 0° to 90°. How does the shape change?', 'Up to what distance can Gaia measure a parallax to 10%?'] }
    ],
    formulas: [
      ['Inverse-square law', R`F = L/4\pi d^2`],
      ['Pogson\'s relation', R`m_1 - m_2 = -2.5\log_{10}(F_1/F_2)`],
      ['Distance modulus', R`m - M = 5\log_{10}d - 5 + A`],
      ['Parallax', R`d = 1/p`],
      ['Luminosity from M', R`L/L_\odot = 10^{-0.4(M - 4.83)}`],
      ['Tangential speed', R`v_t = 4.74\mu d`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Magnitude direction', q: R`<p>Star A has magnitude 2 and star B magnitude 5. Which is brighter, and by what factor?</p>`, options: ['B, by 3', 'A, by about 16', 'A, by 3', 'B, by about 16'], answer: 1, hints: [R`$2.512^3$.`], solution: R`<p>A is brighter by $10^{1.2} = 15.8$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Absolute magnitude', q: R`<p>What does absolute magnitude measure?</p>`, options: ['Brightness as seen from Earth', 'Intrinsic brightness: the magnitude at 10 pc', 'Brightness corrected for the atmosphere', 'Temperature'], answer: 1, hints: [R`Standard distance.`], solution: R`<p>The apparent magnitude at 10 pc, a measure of luminosity.</p>` },
      { level: 'concept', type: 'mcq', title: 'Ignoring dust', q: R`<p>If you ignore interstellar extinction, your distance estimates will be…</p>`, options: ['Too small', 'Too large', 'Correct', 'Random'], answer: 1, hints: [R`Dust makes stars fainter.`], solution: R`<p>Too large: the star looks fainter, so it seems farther.</p>` },
      { level: 'core', type: 'num', title: 'Flux ratio', q: R`<p>By what factor is Sirius ($m = -1.46$) brighter than Polaris ($m = 1.98$)?</p>`, answer: 23.8, tol: 0.01, unit: '×', hints: [R`$10^{0.4\times3.44}$.`], solution: R`<p>$10^{1.376} = 23.8$.</p>` },
      { level: 'core', type: 'num', title: 'Parallax distance', q: R`<p>Sirius has a parallax of 0.379″. What is its distance in light-years?</p>`, answer: 8.6, tol: 0.01, unit: 'ly', hints: [R`$1/p$ pc × 3.26.`], solution: R`<p>2.64 pc = 8.6 ly.</p>` },
      { level: 'core', type: 'num', title: 'Absolute magnitude', q: R`<p>Sirius has $m = -1.46$ at 2.64 pc. Find its absolute magnitude.</p>`, answer: 1.43, tol: 0.01, unit: '', hints: [R`$M = m - 5\log_{10}d + 5$.`], solution: R`<p>$-1.46 - 2.108 + 5 = 1.43$.</p>` },
      { level: 'core', type: 'num', title: 'Luminosity', q: R`<p>Using $M_\odot = 4.83$, find the luminosity of Sirius ($M = 1.43$) in solar units.</p>`, answer: 22.9, tol: 0.01, unit: 'L☉', hints: [R`$10^{0.4(4.83 - 1.43)}$.`], solution: R`<p>$10^{1.36} = 22.9\ L_\odot$ (in the V band).</p>` },
      { level: 'core', type: 'num', title: 'Combined magnitude', q: R`<p>A double star has components of magnitude 3.0 and 4.0. What is the combined magnitude?</p>`, answer: 2.64, tol: 0.005, unit: '', hints: [R`Add fluxes: $10^{-1.2} + 10^{-1.6}$.`], solution: R`<p>$F = 0.0631 + 0.0251 = 0.0882$; $m = -2.5\log_{10}0.0882 = 2.64$.</p>` },
      { level: 'olympiad', type: 'num', title: 'With extinction', q: R`<p>A star of $M = -3.0$ is seen at $m = 12.0$ through 2.0 mag of extinction. Find its distance in pc.</p>`, answer: 3981, tol: 0.01, unit: 'pc', hints: [R`$5\log_{10}d - 5 = 15 - 2$.`], solution: R`<p>$\log_{10}d = 3.6$, $d = 3980$ pc. Ignoring dust you would get 10 000 pc.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sun from far away', q: R`<p>What would the Sun's apparent magnitude be from Alpha Centauri, 1.34 pc away?</p>`, answer: 0.46, tol: 0.03, unit: '', hints: [R`$4.83 + 5\log_{10}1.34 - 5$.`], solution: R`<p>$4.83 + 0.635 - 5 = 0.47$: a bright star.</p>` },
      { level: 'olympiad', type: 'num', title: 'Barnard\'s star', q: R`<p>Barnard's star has proper motion 10.4″/yr at 1.83 pc. Find its tangential speed in km/s.</p>`, answer: 90.2, tol: 0.01, unit: 'km/s', hints: [R`$4.74\mu d$.`], solution: R`<p>$4.74\times10.4\times1.83 = 90.2$ km/s.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-magnitudes', [
    { title: 'Distance modulus', gen(r) { const M = r.step(-8, 12, 0.1), d = Math.pow(10, r.step(0.3, 4.5, 0.05)); const m = M + 5 * Math.log10(d) - 5; return { q: R`<p>A star of absolute magnitude ${f(M)} has apparent magnitude ${f(m)}. How far away is it, in pc? (No extinction.)</p>`, answer: d, tol: 0.01, unit: 'pc', solution: R`<p>$d = 10^{(m - M + 5)/5} = ${f(d)}$ pc.</p>` }; } },
    { title: 'Flux ratio', gen(r) { const m1 = r.step(-2, 15, 0.1), m2 = r.step(-2, 15, 0.1); if (Math.abs(m1 - m2) < 0.2) return this.gen(PB.rng(r.int(1, 1e9))); const ratio = Math.pow(10, 0.4 * Math.abs(m1 - m2)); return { q: R`<p>Two stars have magnitudes ${f(m1)} and ${f(m2)}. By what factor is the brighter one brighter?</p>`, answer: ratio, tol: 0.01, unit: '×', solution: R`<p>$10^{0.4\times${f(Math.abs(m1 - m2))}} = ${f(ratio)}$.</p>` }; } },
    { title: 'Parallax', gen(r) { const p = r.step(0.002, 0.8, 0.001); return { q: R`<p>A star has a parallax of ${p}″. How far is it, in light-years?</p>`, answer: 3.2616 / p, tol: 0.01, unit: 'ly', solution: R`<p>$1/${p} = ${f(1 / p)}$ pc $= ${f(3.2616 / p)}$ ly.</p>` }; } }
  ]);
})();
