(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-telescopes', subject: 'astronomy', num: 4, part: 'The Sky',
    title: 'Light and Telescopes',
    subtitle: R`How astronomers collect light. The electromagnetic spectrum and the atmosphere, refractors and reflectors, light grasp, magnification and resolution, seeing, detectors, and telescopes in space.`,
    goals: ['Explain which wavelengths reach the ground and why', 'Compare refracting and reflecting telescopes', 'Calculate light grasp, magnification, focal ratio and plate scale', 'Use the Rayleigh criterion', 'Explain atmospheric seeing, adaptive optics and interferometry'],
    sections: [
      {
        title: 'Windows in the atmosphere',
        html: R`
<p>Astronomy uses the whole electromagnetic spectrum, from radio waves metres long to gamma rays. Earth's atmosphere lets through only two broad <strong>windows</strong>: visible light (with a little near-ultraviolet and infrared) and radio waves from about 1 cm to 10 m. Ozone absorbs ultraviolet, water vapour and CO₂ absorb much of the infrared, and X-rays and gamma rays are stopped high up. These need telescopes on satellites; infrared telescopes go to high, dry sites or into space (JWST).</p>
<p>Different wavelengths reveal different things: radio shows cold hydrogen gas (the 21 cm line) and pulsars; infrared sees through dust to young stars and very distant galaxies; X-rays show million-degree gas around black holes and in galaxy clusters.</p>`
      },
      {
        title: 'Telescope optics',
        html: R`
<p>A <strong>refractor</strong> uses an objective lens; a <strong>reflector</strong> uses a curved mirror. All large modern telescopes are reflectors: mirrors have no chromatic aberration, can be supported from behind and can be made in segments (the Keck and ELT designs).</p>
<ul>
<li><strong>Light grasp</strong> grows with collecting area, $\propto D^2$. Compared with a dark-adapted eye (pupil 7 mm), a 200 mm telescope gathers $(200/7)^2 \approx 800$ times more light: about 7.3 magnitudes fainter.</li>
<li><strong>Focal ratio</strong> $N = f/D$. Small $N$ ("fast") gives bright, wide images for photography.</li>
<li><strong>Magnification</strong> with an eyepiece of focal length $f_e$: $M = f_o/f_e$. Useful magnification is limited to about twice the aperture in mm, because of resolution and the atmosphere.</li>
<li><strong>Plate scale</strong> at the focus: $206\,265''/f$ per unit length, so a 2 m focal length gives about 103″ per mm.</li>
</ul>
<p>Limiting magnitude for visual use is roughly $m_{\lim} \approx 7.7 + 5\log_{10}(D/\text{cm})$.</p>`
      },
      {
        title: 'Resolution',
        html: R`
<p>Diffraction blurs a point star into an <strong>Airy pattern</strong>. Two stars are just resolved when the centre of one falls on the first dark ring of the other: the <strong>Rayleigh criterion</strong>,</p>
$$\theta = 1.22\frac{\lambda}{D}\ \text{rad} \approx 0.138''\times\frac{\lambda/550\ \text{nm}}{D/1\ \text{m}}.$$
<p>A radio telescope at 21 cm needs to be enormous to compete: the 100 m Green Bank dish resolves only about 9′. <strong>Interferometry</strong> combines widely separated telescopes so the resolution depends on the baseline $B$: $\theta \approx \lambda/B$. The Event Horizon Telescope used a baseline the size of Earth at 1.3 mm to resolve about 25 μas and image the shadow of the black hole in M87.</p>
<details class="example"><summary><span class="lbl">Worked example</span> What is the diffraction limit of the 8.2 m VLT at 2.2 μm?<span class="tog">Solution</span></summary><div class="sol"><p>$1.22\times2.2\times10^{-6}/8.2 = 3.27\times10^{-7}$ rad $= 0.067''$.</p></div></details>`
      },
      {
        title: 'Seeing and detectors',
        html: R`
<p>Turbulence in the air blurs and twinkles stars: <strong>seeing</strong>. At good sites it is 0.5–1″, so from the ground a large telescope is limited by the air, not by diffraction. Solutions: put telescopes in space (Hubble, JWST), or use <strong>adaptive optics</strong>, a deformable mirror that corrects the wavefront hundreds of times per second using a bright guide star or laser.</p>
<p>Modern detectors are <strong>CCDs</strong> and CMOS sensors, which convert over 90% of photons into electrons (the eye manages a few percent and photographic film about 1%). Photon counting means noise is set by Poisson statistics: with $N$ photons the signal-to-noise ratio is $\sqrt N$, so doubling the precision takes four times the exposure.</p>
<p><strong>Spectrographs</strong> spread light with a grating or prism. Resolving power $\mathcal{R} = \lambda/\Delta\lambda$ sets the smallest velocity measurable by Doppler shift: $\Delta v \approx c/\mathcal{R}$, though careful calibration does far better (exoplanet spectrographs reach 1 m/s with $\mathcal R \approx 10^5$).</p>`
      }
    ],
    labs: [
      { sim: 'telescope', title: 'Resolving a double star', desc: 'The diffraction image of two equal stars and its brightness profile. The dashed curves are the stars separately.',
        tasks: ['With D = 100 mm, find the separation at which the dip between the stars first appears.', 'Change the wavelength from 400 to 700 nm. Which colour gives better resolution?', 'What aperture just resolves a 0.5″ double? Would the atmosphere allow it?'] }
    ],
    formulas: [
      ['Rayleigh criterion', R`\theta = 1.22\lambda/D`],
      ['Light grasp', R`\propto D^2`],
      ['Magnification', R`M = f_o/f_e`],
      ['Focal ratio', R`N = f/D`],
      ['Plate scale', R`206\,265''/f`],
      ['Signal-to-noise', R`\text{S/N} = \sqrt N`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Why big telescopes', q: R`<p>What is the main reason for building telescopes with large apertures?</p>`, options: ['Higher magnification', 'To collect more light and resolve finer detail', 'To reduce seeing', 'To see more colours'], answer: 1, hints: [R`Magnification depends on the eyepiece.`], solution: R`<p>Area gives light grasp; diameter gives resolution.</p>` },
      { level: 'concept', type: 'mcq', title: 'X-ray astronomy', q: R`<p>Why must X-ray telescopes be in space?</p>`, options: ['X-rays are too faint', 'The atmosphere absorbs X-rays', 'Mirrors cannot reflect X-rays on Earth', 'Light pollution'], answer: 1, hints: [R`Atmospheric windows.`], solution: R`<p>The atmosphere is opaque to X-rays.</p>` },
      { level: 'concept', type: 'mcq', title: 'Adaptive optics', q: R`<p>What does adaptive optics correct?</p>`, options: ['Chromatic aberration', 'Blurring by atmospheric turbulence', 'Light pollution', 'Diffraction'], answer: 1, hints: [R`Seeing.`], solution: R`<p>It removes most of the seeing, letting ground telescopes approach their diffraction limit.</p>` },
      { level: 'core', type: 'num', title: 'Magnification', q: R`<p>A telescope of focal length 1200 mm is used with a 25 mm eyepiece. What is the magnification?</p>`, answer: 48, tol: 0.002, unit: '×', hints: [R`$f_o/f_e$.`], solution: R`<p>48×.</p>` },
      { level: 'core', type: 'num', title: 'Light grasp', q: R`<p>How many times more light does a 10 m telescope collect than a 2.4 m one?</p>`, answer: 17.36, tol: 0.005, unit: '×', hints: [R`$(10/2.4)^2$.`], solution: R`<p>17.4.</p>` },
      { level: 'core', type: 'num', title: 'Resolution', q: R`<p>Find the diffraction limit of the 2.4 m Hubble telescope at 500 nm, in arcseconds.</p>`, answer: 0.0524, tol: 0.01, unit: '″', hints: [R`$1.22\lambda/D$ in radians × 206 265.`], solution: R`<p>$2.54\times10^{-7}$ rad $= 0.052''$.</p>` },
      { level: 'core', type: 'num', title: 'Plate scale', q: R`<p>A telescope has focal length 2.0 m. A CCD pixel is 15 μm. How many arcseconds does one pixel cover?</p>`, answer: 1.547, tol: 0.005, unit: '″', hints: [R`$206\,265''/2000$ mm per mm.`], solution: R`<p>103.1″/mm × 0.015 mm = 1.55″.</p>` },
      { level: 'core', type: 'num', title: 'Exposure', q: R`<p>A 10-minute exposure gives a signal-to-noise ratio of 20. How long is needed for S/N = 60?</p>`, answer: 90, tol: 0.002, unit: 'min', hints: [R`S/N ∝ √t.`], solution: R`<p>$(60/20)^2\times10 = 90$ minutes.</p>` },
      { level: 'olympiad', type: 'num', title: 'Radio interferometer', q: R`<p>What baseline (in km) does a radio interferometer at λ = 6 cm need to reach 0.01″?</p>`, answer: 1238, tol: 0.01, unit: 'km', hints: [R`$B = \lambda/\theta$.`], solution: R`<p>$0.01'' = 4.85\times10^{-8}$ rad; $B = 0.06/4.85\times10^{-8} = 1.24\times10^6$ m $= 1240$ km.</p>` },
      { level: 'olympiad', type: 'num', title: 'Limiting magnitude', q: R`<p>The naked eye (7 mm pupil) reaches magnitude 6.0. Using light grasp alone, what limiting magnitude does a 300 mm telescope reach?</p>`, answer: 14.16, tol: 0.005, unit: 'mag', hints: [R`$\Delta m = 5\log_{10}(D/7)$.`], solution: R`<p>$6 + 5\log_{10}42.9 = 6 + 8.16 = 14.2$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Seeing-limited', q: R`<p>Above what aperture, in cm, does a telescope at 550 nm become seeing-limited rather than diffraction-limited when the seeing is 1.0″?</p>`, answer: 13.8, tol: 0.01, unit: 'cm', hints: [R`Solve $1.22\lambda/D = 1''$.`], solution: R`<p>$D = 1.22\times550\times10^{-9}/4.85\times10^{-6} = 0.138$ m. Every bigger telescope is limited by the air without adaptive optics.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-telescopes', [
    { title: 'Diffraction limit', gen(r) { const Dm = r.pick([0.1, 0.2, 0.5, 1, 2.4, 4, 8.2, 10, 39]), lam = r.pick([400, 500, 550, 650, 1000, 2200]); const th = 1.22 * lam * 1e-9 / Dm * 206265; return { q: R`<p>Find the diffraction limit of a ${Dm} m telescope at ${lam} nm, in arcseconds.</p>`, answer: th, tol: 0.01, unit: '″', solution: R`<p>$1.22\times${lam}\times10^{-9}/${Dm}\times206\,265 = ${f(th)}''$.</p>` }; } },
    { title: 'Light grasp', gen(r) { const a = r.pick([7, 50, 100, 200, 400, 1000]), b = r.pick([100, 200, 300, 2400, 8200, 10000]); if (b <= a) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>How many times more light does a ${b} mm aperture collect than a ${a} mm aperture?</p>`, answer: (b / a) ** 2, tol: 0.005, unit: '×', solution: R`<p>$(${b}/${a})^2 = ${f((b / a) ** 2)}$.</p>` }; } },
    { title: 'Magnification and exit pupil', gen(r) { const fo = r.pick([500, 750, 900, 1000, 1200, 2000, 2500]), fe = r.pick([6, 9, 12, 15, 20, 25, 32, 40]); return { q: R`<p>What magnification does a ${fo} mm focal length telescope give with a ${fe} mm eyepiece?</p>`, answer: fo / fe, tol: 0.005, unit: '×', solution: R`<p>$${fo}/${fe} = ${f(fo / fe)}\times$.</p>` }; } }
  ]);
})();
