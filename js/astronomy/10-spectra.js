(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-spectra', subject: 'astronomy', num: 10, part: 'The Stars',
    title: 'Starlight and Spectra',
    subtitle: R`What light tells us. Blackbody radiation, Wien's and Stefan's laws, stellar radii, spectral lines and Kirchhoff's laws, the spectral classes OBAFGKM, colour indices, and Doppler shifts.`,
    goals: ['Apply Wien\'s law and the Stefan–Boltzmann law to stars', 'Find stellar radii from luminosity and temperature', 'Explain absorption and emission spectra', 'Use the spectral sequence and colour index', 'Measure radial velocities from Doppler shifts'],
    sections: [
      {
        title: 'Stars as blackbodies',
        html: R`
<p>A star's spectrum is close to that of a <strong>blackbody</strong>, a perfect absorber and emitter whose spectrum depends only on temperature (Planck's law). Two consequences:</p>
<ul>
<li><strong>Wien's law</strong>: the spectrum peaks at $\lambda_{\max} = \dfrac{b}{T}$ with $b = 2.898\times10^{-3}$ m K. The Sun (5772 K) peaks at about 500 nm; Betelgeuse (3600 K) in the infrared and looks orange-red; Rigel (12 000 K) in the ultraviolet and looks blue-white.</li>
<li><strong>Stefan–Boltzmann law</strong>: each square metre emits $\sigma T^4$, with $\sigma = 5.67\times10^{-8}$ W m⁻² K⁻⁴. For a spherical star,
$$L = 4\pi R^2\sigma T^4.$$</li>
</ul>
<p>Combining these gives a star's radius from its luminosity and colour. In solar units: $\dfrac{R}{R_\odot} = \sqrt{\dfrac{L}{L_\odot}}\left(\dfrac{T_\odot}{T}\right)^2$.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Betelgeuse has $L \approx 1.2\times10^5\,L_\odot$ and $T = 3600$ K. How big is it?<span class="tog">Solution</span></summary><div class="sol"><p>$R = \sqrt{1.2\times10^5}\times(5772/3600)^2 = 346\times2.57 = 890\,R_\odot$, about 4 AU: it would swallow Jupiter's orbit.</p></div></details>`
      },
      {
        title: 'Spectral lines',
        html: R`
<p><strong>Kirchhoff's laws</strong>: a hot dense body gives a continuous spectrum; a hot thin gas gives bright <strong>emission lines</strong>; a cooler thin gas in front of a hotter source gives dark <strong>absorption lines</strong>. Stars show absorption lines because their cooler outer layers absorb light from the hotter interior.</p>
<p>Each line is a jump between energy levels of an atom or ion: $E = hc/\lambda$. Hydrogen's visible <strong>Balmer series</strong> (from level 2) includes Hα at 656.3 nm. Lines identify elements: helium was discovered in the Sun's spectrum in 1868, before it was found on Earth.</p>`
      },
      {
        title: 'Spectral classes and colour',
        html: R`
<p>Stars are classified by their absorption lines into the sequence <strong>O B A F G K M</strong>, from hottest to coolest, each split into subclasses 0–9. Cecilia Payne showed in 1925 that this is a temperature sequence, not a composition sequence, and that stars are mostly hydrogen.</p>
<div class="table-wrap"><table><thead><tr><th>Class</th><th>T (K)</th><th>Colour</th><th>Strongest lines</th><th>Example</th></tr></thead><tbody>
<tr><td>O</td><td>&gt; 30 000</td><td>blue</td><td>ionised helium</td><td>ζ Puppis</td></tr>
<tr><td>B</td><td>10 000–30 000</td><td>blue-white</td><td>neutral helium</td><td>Rigel</td></tr>
<tr><td>A</td><td>7500–10 000</td><td>white</td><td>hydrogen (Balmer strongest)</td><td>Sirius, Vega</td></tr>
<tr><td>F</td><td>6000–7500</td><td>yellow-white</td><td>ionised metals</td><td>Procyon</td></tr>
<tr><td>G</td><td>5200–6000</td><td>yellow</td><td>ionised calcium, metals</td><td>Sun</td></tr>
<tr><td>K</td><td>3700–5200</td><td>orange</td><td>neutral metals</td><td>Arcturus</td></tr>
<tr><td>M</td><td>&lt; 3700</td><td>red</td><td>molecules (TiO)</td><td>Betelgeuse, Proxima</td></tr>
</tbody></table></div>
<p>Balmer lines peak in A stars: in hotter stars hydrogen is ionised, in cooler ones few atoms sit in level 2. The <strong>colour index</strong> $B - V$ (the difference of magnitudes through blue and visual filters) measures temperature cheaply: about −0.3 for hot B stars, 0.65 for the Sun, 1.8 for M stars.</p>`
      },
      {
        title: 'Doppler shifts',
        html: R`
<p>Motion along the line of sight shifts lines:</p>
$$\frac{\Delta\lambda}{\lambda_0} = \frac{v_r}{c}\quad (v \ll c).$$
<p>Redshift means receding, blueshift approaching. Doppler shifts measure radial velocities of stars, rotation (lines are broadened when one limb approaches and the other recedes), orbits of binary stars and exoplanets, and the expansion of the universe. <strong>Line widths</strong> also reveal temperature (thermal broadening) and pressure, which distinguishes giants (narrow lines, low pressure) from dwarfs: the luminosity classes I (supergiant) to V (main sequence). The Sun is a G2 V star.</p>`
      }
    ],
    labs: [
      { sim: 'blackbody', title: 'Blackbody spectrum', desc: 'The Planck spectrum at temperature T, with the visible band shaded and the perceived colour shown.',
        tasks: ['Find the temperature at which the peak sits in the middle of the visible band.', 'Why are there no green stars?', 'Double the temperature. By what factor does the total area under the curve grow?'] }
    ],
    formulas: [
      ['Wien\'s law', R`\lambda_{\max}T = 2.898\times10^{-3}\ \text{m K}`],
      ['Stefan–Boltzmann', R`L = 4\pi R^2\sigma T^4`],
      ['Radius in solar units', R`R/R_\odot = \sqrt{L/L_\odot}\,(T_\odot/T)^2`],
      ['Photon energy', R`E = hc/\lambda`],
      ['Doppler shift', R`\Delta\lambda/\lambda_0 = v_r/c`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Spectral order', q: R`<p>Which star is hottest?</p>`, options: ['A G2 star', 'An M5 star', 'A B0 star', 'An F5 star'], answer: 2, hints: [R`OBAFGKM.`], solution: R`<p>B0.</p>` },
      { level: 'concept', type: 'mcq', title: 'Absorption lines', q: R`<p>Why do most stars show absorption lines?</p>`, options: ['Interstellar dust', 'Cooler gas in the star\'s atmosphere absorbs light from hotter layers below', 'Earth\'s atmosphere', 'The stars are moving'], answer: 1, hints: [R`Kirchhoff's third law.`], solution: R`<p>The photosphere's outer layers are cooler than those beneath.</p>` },
      { level: 'concept', type: 'mcq', title: 'Balmer lines', q: R`<p>Why are hydrogen Balmer lines weak in O stars, even though they are mostly hydrogen?</p>`, options: ['They contain little hydrogen', 'Hydrogen is mostly ionised', 'The lines are in the infrared', 'Rotation blurs them'], answer: 1, hints: [R`No electron, no line.`], solution: R`<p>At over 30 000 K hydrogen is ionised.</p>` },
      { level: 'core', type: 'num', title: 'Wien peak', q: R`<p>At what wavelength (nm) does a 10 000 K star's spectrum peak?</p>`, answer: 289.8, tol: 0.005, unit: 'nm', hints: [R`$b/T$.`], solution: R`<p>290 nm, in the ultraviolet.</p>` },
      { level: 'core', type: 'num', title: 'Temperature from peak', q: R`<p>A star's spectrum peaks at 850 nm. What is its temperature?</p>`, answer: 3409, tol: 0.01, unit: 'K', hints: [R`$b/\lambda$.`], solution: R`<p>3400 K: an M star.</p>` },
      { level: 'core', type: 'num', title: 'Luminosity ratio', q: R`<p>A star has twice the Sun's radius and twice its temperature. How many times more luminous is it?</p>`, answer: 64, tol: 0.002, unit: '×', hints: [R`$R^2T^4$.`], solution: R`<p>$4\times16 = 64$.</p>` },
      { level: 'core', type: 'num', title: 'Radial velocity', q: R`<p>Hα (rest 656.28 nm) is observed at 656.50 nm. What is the radial velocity, in km/s?</p>`, answer: 100.5, tol: 0.01, unit: 'km/s', hints: [R`$c\,\Delta\lambda/\lambda$.`], solution: R`<p>$3\times10^5\times0.22/656.28 = 101$ km/s, receding.</p>` },
      { level: 'core', type: 'num', title: 'Solar luminosity', q: R`<p>Calculate the Sun's luminosity from $R = 6.96\times10^8$ m and $T = 5772$ K, in units of 10²⁶ W.</p>`, answer: 3.83, tol: 0.01, unit: '×10²⁶ W', hints: [R`$4\pi R^2\sigma T^4$.`], solution: R`<p>$3.83\times10^{26}$ W.</p>` },
      { level: 'olympiad', type: 'num', title: 'White dwarf size', q: R`<p>Sirius B has $L = 0.056\,L_\odot$ and $T = 25\,200$ K. Find its radius in Earth radii ($R_\odot = 109\,R_\oplus$).</p>`, answer: 1.35, tol: 0.02, unit: 'R⊕', hints: [R`$\sqrt{0.056}(5772/25200)^2$ in solar radii.`], solution: R`<p>$0.2366\times0.05246 = 0.0124\,R_\odot = 1.35\,R_\oplus$: a Sun's mass packed into an Earth.</p>` },
      { level: 'olympiad', type: 'num', title: 'Rotation broadening', q: R`<p>A star's lines are broadened by ±0.05 nm at 500 nm by rotation. If its radius is 2 R☉, what is its rotation period (equator seen edge-on), in days?</p>`, answer: 3.37, tol: 0.02, unit: 'days', hints: [R`$v = c\Delta\lambda/\lambda = 30$ km/s; $P = 2\pi R/v$.`], solution: R`<p>$v = 30$ km/s; $P = 2\pi\times1.392\times10^9/3\times10^4 = 2.92\times10^5$ s $= 3.37$ days.</p>` },
      { level: 'olympiad', type: 'num', title: 'Balmer energy', q: R`<p>Find the energy of an Hα photon (656.3 nm) in eV ($hc = 1240$ eV nm), and check it against $13.6(1/4 - 1/9)$ eV. Give the photon energy.</p>`, answer: 1.889, tol: 0.005, unit: 'eV', hints: [R`$1240/656.3$.`], solution: R`<p>1.89 eV; the Bohr model gives $13.6\times5/36 = 1.89$ eV.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-spectra', [
    { title: 'Wien\'s law', gen(r) { const T = r.int(25, 400) * 100; return { q: R`<p>At what wavelength, in nm, does a ${T} K blackbody peak?</p>`, answer: 2.898e6 / T, tol: 0.005, unit: 'nm', solution: R`<p>$2.898\times10^6/${T} = ${f(2.898e6 / T)}$ nm.</p>` }; } },
    { title: 'Stellar radius', gen(r) { const L = Math.pow(10, r.step(-3, 5.5, 0.1)), T = r.int(25, 400) * 100; const Rr = Math.sqrt(L) * Math.pow(5772 / T, 2); return { q: R`<p>A star has $L = ${f(L)}\,L_\odot$ and $T = ${T}$ K. What is its radius, in solar radii? (T☉ = 5772 K.)</p>`, answer: Rr, tol: 0.01, unit: 'R☉', solution: R`<p>$\sqrt{${f(L)}}\times(5772/${T})^2 = ${f(Rr)}\,R_\odot$.</p>` }; } },
    { title: 'Doppler velocity', gen(r) { const l0 = r.pick([[656.28, 'Hα'], [486.13, 'Hβ'], [393.37, 'Ca II K'], [589.0, 'Na D']]), v = r.int(-500, 500); if (!v) return this.gen(PB.rng(r.int(1, 1e9))); const l = l0[0] * (1 + v / 299792); return { q: R`<p>The ${l0[1]} line (rest ${l0[0]} nm) is observed at ${l.toFixed(3)} nm. What is the radial velocity, in km/s? (Positive = receding.)</p>`, answer: 299792 * (+l.toFixed(3) - l0[0]) / l0[0], tol: 0.02, atol: 0.5, unit: 'km/s', solution: R`<p>$c\,\Delta\lambda/\lambda_0 = ${f(299792 * (+l.toFixed(3) - l0[0]) / l0[0])}$ km/s.</p>` }; } }
  ]);
})();
