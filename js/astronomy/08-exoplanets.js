(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-exoplanets', subject: 'astronomy', num: 8, part: 'The Solar System',
    title: 'Exoplanets and the Search for Life',
    subtitle: R`Planets around other stars. The radial-velocity and transit methods and what each measures, direct imaging and microlensing, habitable zones, biosignatures, and the Drake equation.`,
    goals: ['Explain the radial-velocity and transit methods', 'Calculate planet radius from transit depth and minimum mass from the velocity amplitude', 'Combine both to find density', 'Estimate habitable-zone distances', 'Reason with the Drake equation'],
    sections: [
      {
        title: 'Finding planets',
        html: R`
<p>Over 5800 exoplanets are confirmed. The first around a Sun-like star, 51 Pegasi b (1995), was a "hot Jupiter" orbiting in 4.2 days, a surprise that showed planets can migrate inward.</p>
<p><strong>Radial velocity</strong>: star and planet orbit their common centre of mass, so the star wobbles. Its Doppler shift $\Delta\lambda/\lambda = v_r/c$ reveals a periodic velocity of semi-amplitude</p>
$$K = 28.4\ \text{m/s}\times\frac{M_p\sin i}{M_J}\left(\frac{P}{1\ \text{yr}}\right)^{-1/3}\left(\frac{M_\star}{M_\odot}\right)^{-2/3}.$$
<p>Jupiter makes the Sun wobble at 12.5 m/s; Earth at only 9 cm/s. The method gives the <strong>minimum mass</strong> $M_p\sin i$ because the orbit's tilt $i$ is unknown.</p>
<p><strong>Transits</strong>: if the orbit is edge-on, the planet blocks a fraction of the starlight each orbit:</p>
$$\delta = \left(\frac{R_p}{R_\star}\right)^2.$$
<p>Jupiter crossing the Sun gives a 1% dip; Earth 0.008%. Kepler and TESS found thousands this way. The chance that a random orbit transits is about $R_\star/a$: 0.5% for an Earth twin.</p>`
      },
      {
        title: 'Putting the methods together',
        html: R`
<p>A transiting planet has $i \approx 90^\circ$, so radial velocity then gives the true mass. Mass and radius give density, which tells rock from gas: rocky planets above about 4 g/cm³, gas giants around 1, "puffy" hot Jupiters as low as 0.1. The orbit size follows from Kepler's third law: $a^3 = M_\star P^2$ (AU, years, solar masses).</p>
<p>Other methods: <strong>direct imaging</strong> blocks the star's glare with a coronagraph to photograph young, hot giants far from their stars; <strong>gravitational microlensing</strong> sees a planet's brief extra brightening when a star passes in front of a background star; <strong>astrometry</strong> (Gaia) measures the wobble on the sky; <strong>transit timing variations</strong> reveal unseen companions.</p>
<p>During a transit, starlight filters through the planet's atmosphere, and molecules absorb at particular wavelengths: <strong>transmission spectroscopy</strong>. JWST has detected CO₂, H₂O and SO₂ in exoplanet atmospheres.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A transit dims a Sun-like star by 0.84% every 3.5 days. Find the planet's radius and orbit.<span class="tog">Solution</span></summary><div class="sol"><p>$R_p = \sqrt{0.0084}\,R_\odot = 0.0917\times696\,000 = 63\,800$ km, about 0.9 Jupiter radii. $a = (3.5/365.25)^{2/3} = 0.045$ AU: a hot Jupiter.</p></div></details>`
      },
      {
        title: 'Habitability and life',
        html: R`
<p>The <strong>habitable zone</strong> is where a planet could have liquid surface water. It scales with stellar luminosity as $d \propto \sqrt{L}$: for the Sun roughly 0.95–1.7 AU. Around dim red dwarfs it is very close in, where planets are tidally locked and exposed to flares. The TRAPPIST-1 system has seven Earth-sized planets, three in its habitable zone.</p>
<p><strong>Biosignatures</strong> are gases that life could produce out of chemical equilibrium, such as O₂ with methane together. False positives are a constant worry.</p>
<p>The <strong>Drake equation</strong> organises our ignorance about communicating civilisations:</p>
$$N = R_\star f_p n_e f_l f_i f_c L.$$
<p>Star formation rate, fraction with planets and habitable planets per system are now measured; the rest are guesses. The <strong>Fermi paradox</strong> asks why, if $N$ is large, we see no sign of anyone.</p>`
      }
    ],
    labs: [
      { sim: 'radvel', title: 'Radial-velocity detection', desc: 'The velocity curve of a star with one planet, and 30 simulated measurements with error bars.',
        tasks: ['Set a Jupiter-mass planet in a 1-year orbit around a Sun-like star. What is K?', 'Make it an Earth-mass planet (0.003 M_J). Can you detect it with 1 m/s precision?', 'Increase the eccentricity to 0.6. How does the curve change shape?'] },
      { sim: 'transit', title: 'Transit light curve', desc: 'A planet crosses its star and the light curve records the dip.',
        tasks: ['How does the depth depend on the planet\'s radius?', 'What sets the duration of the transit?', 'What happens to the shape of the dip for a grazing transit?'] }
    ],
    formulas: [
      ['Transit depth', R`\delta = (R_p/R_\star)^2`],
      ['RV semi-amplitude', R`K = 28.4\,\text{m/s}\,(M_p\sin i/M_J)(P/\text{yr})^{-1/3}(M_\star/M_\odot)^{-2/3}`],
      ['Doppler shift', R`\Delta\lambda/\lambda = v_r/c`],
      ['Transit probability', R`\approx R_\star/a`],
      ['Habitable zone scaling', R`d \propto \sqrt L`],
      ['Drake equation', R`N = R_\star f_pn_ef_lf_if_cL`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'What RV measures', q: R`<p>What does the radial-velocity method alone give for a planet?</p>`, options: ['Its radius', 'Its true mass', 'Its minimum mass M sin i', 'Its temperature'], answer: 2, hints: [R`The tilt is unknown.`], solution: R`<p>Only $M_p\sin i$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Transit bias', q: R`<p>Why do transit surveys find mostly planets close to their stars?</p>`, options: ['Close planets are bigger', 'The transit probability R★/a is larger and transits repeat more often', 'Distant planets are too cold', 'Far planets block less light'], answer: 1, hints: [R`Geometry and repetition.`], solution: R`<p>Both the chance of alignment and the number of transits per year fall with distance.</p>` },
      { level: 'concept', type: 'mcq', title: 'Biosignature', q: R`<p>Which combination in an atmosphere would be the strongest hint of life?</p>`, options: ['CO₂ alone', 'O₂ and CH₄ together', 'H₂ and He', 'N₂ alone'], answer: 1, hints: [R`Chemical disequilibrium.`], solution: R`<p>O₂ and CH₄ react; keeping both requires constant replenishment.</p>` },
      { level: 'core', type: 'num', title: 'Transit depth', q: R`<p>What transit depth (in %) does a Neptune-sized planet (24 600 km radius) give in front of a Sun-like star (696 000 km)?</p>`, answer: 0.1249, tol: 0.01, unit: '%', hints: [R`$(R_p/R_\star)^2$.`], solution: R`<p>$(0.0353)^2 = 1.25\times10^{-3} = 0.125\%$.</p>` },
      { level: 'core', type: 'num', title: 'Planet radius', q: R`<p>A red dwarf of 0.2 R☉ shows a 0.5% transit. Find the planet's radius in Earth radii (R☉ = 109 R⊕).</p>`, answer: 1.54, tol: 0.01, unit: 'R⊕', hints: [R`$R_p = \sqrt{0.005}\times0.2\times109$.`], solution: R`<p>1.54 Earth radii: a super-Earth.</p>` },
      { level: 'core', type: 'num', title: 'Semi-amplitude', q: R`<p>Find K for a 2 M_J planet in a 4-year orbit around a 1.2 M☉ star, in m/s.</p>`, answer: 31.7, tol: 0.01, unit: 'm/s', hints: [R`$28.4\times2\times4^{-1/3}\times1.2^{-2/3}$.`], solution: R`<p>$56.8\times0.630\times0.885 = 31.7$ m/s.</p>` },
      { level: 'core', type: 'num', title: 'Habitable zone', q: R`<p>Earth-like insolation is at 1 AU from the Sun. At what distance is it for a star of 0.04 L☉, in AU?</p>`, answer: 0.2, tol: 0.002, unit: 'AU', hints: [R`$\sqrt L$.`], solution: R`<p>0.2 AU.</p>` },
      { level: 'core', type: 'num', title: 'Doppler shift', q: R`<p>A star moves away at 50 m/s. By how much is the 656.3 nm Hα line shifted, in units of 10⁻⁴ nm?</p>`, answer: 1.095, tol: 0.01, unit: '×10⁻⁴ nm', hints: [R`$\lambda v/c$.`], solution: R`<p>$656.3\times50/3\times10^8 = 1.09\times10^{-4}$ nm: spectrographs measure shifts of a thousandth of a pixel.</p>` },
      { level: 'olympiad', type: 'num', title: 'Planet density', q: R`<p>A transiting planet has radius 1.5 R⊕ and mass 5 M⊕ (Earth: 5.51 g/cm³). Find its mean density in g/cm³.</p>`, answer: 8.16, tol: 0.01, unit: 'g/cm³', hints: [R`$\rho \propto M/R^3$.`], solution: R`<p>$5.51\times5/3.375 = 8.16$ g/cm³: iron-rich and rocky.</p>` },
      { level: 'olympiad', type: 'num', title: 'Transit duration', q: R`<p>For a central transit, duration $\approx PR_\star/(\pi a)$. Find it for Earth transiting the Sun, in hours ($R_\odot = 0.00465$ AU).</p>`, answer: 13.0, tol: 0.01, unit: 'h', hints: [R`$8766\ \text{h}\times0.00465/\pi$.`], solution: R`<p>$8766\times0.00465/\pi = 12.97$ h.</p>` },
      { level: 'olympiad', type: 'num', title: 'Drake estimate', q: R`<p>Take $R_\star = 2$/yr, $f_p = 1$, $n_e = 0.2$, $f_l = 0.1$, $f_i = 0.01$, $f_c = 0.1$, $L = 10^5$ years. What is $N$?</p>`, answer: 4, tol: 0.002, unit: '', hints: [R`Multiply.`], solution: R`<p>$2\times1\times0.2\times0.1\times0.01\times0.1\times10^5 = 4$. Change any guess by 100 and the answer changes by 100.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-exoplanets', [
    { title: 'Transit depth', gen(r) { const Rp = r.step(0.5, 15, 0.1), Rs = r.step(0.1, 2, 0.05); const dep = Math.pow(Rp / (Rs * 109.1), 2) * 100; return { q: R`<p>A planet of ${f(Rp)} R⊕ transits a star of ${f(Rs)} R☉ (1 R☉ = 109.1 R⊕). What is the transit depth, in %?</p>`, answer: dep, tol: 0.01, unit: '%', solution: R`<p>$(${f(Rp)}/${f(Rs * 109.1)})^2 = ${f(dep)}\%$.</p>` }; } },
    { title: 'RV semi-amplitude', gen(r) { const m = r.step(0.05, 10, 0.05), P = r.step(0.01, 12, 0.01), Ms = r.step(0.3, 1.8, 0.05); const K = 28.4 * m * Math.pow(P, -1 / 3) * Math.pow(Ms, -2 / 3); return { q: R`<p>A ${f(m)} M_J planet orbits a ${f(Ms)} M☉ star every ${f(P)} years (edge-on). Find K, in m/s.</p>`, answer: K, tol: 0.01, unit: 'm/s', solution: R`<p>$28.4\times${f(m)}\times${f(P)}^{-1/3}\times${f(Ms)}^{-2/3} = ${f(K)}$ m/s.</p>` }; } },
    { title: 'Planet from transit', gen(r) { const dep = r.step(0.01, 2, 0.01), Rs = r.step(0.2, 1.5, 0.05); const Rp = Math.sqrt(dep / 100) * Rs * 109.1; return { q: R`<p>A star of ${f(Rs)} R☉ dims by ${f(dep)}% during transits. What is the planet's radius, in Earth radii?</p>`, answer: Rp, tol: 0.01, unit: 'R⊕', solution: R`<p>$\sqrt{${f(dep / 100)}}\times${f(Rs)}\times109.1 = ${f(Rp)}$ R⊕.</p>` }; } }
  ]);
})();
