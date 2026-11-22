(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-planets', subject: 'astronomy', num: 6, part: 'The Solar System',
    title: 'The Planets',
    subtitle: R`A tour of the eight planets. Rocky and giant worlds, how the Solar System formed, planetary temperatures and the greenhouse effect, atmospheres and their escape, and interiors.`,
    goals: ['Compare terrestrial and giant planets', 'Outline the nebular theory of Solar System formation', 'Calculate equilibrium temperatures', 'Explain the greenhouse effect quantitatively', 'Decide whether a planet can keep a gas in its atmosphere'],
    sections: [
      {
        title: 'Two families of planets',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Planet</th><th>a (AU)</th><th>Mass (Earth = 1)</th><th>Density (g/cm³)</th><th>Notes</th></tr></thead><tbody>
<tr><td>Mercury</td><td>0.39</td><td>0.055</td><td>5.4</td><td>large iron core, no atmosphere</td></tr>
<tr><td>Venus</td><td>0.72</td><td>0.82</td><td>5.2</td><td>92 bar CO₂, 464 °C surface</td></tr>
<tr><td>Earth</td><td>1.00</td><td>1</td><td>5.5</td><td>liquid water, plate tectonics</td></tr>
<tr><td>Mars</td><td>1.52</td><td>0.11</td><td>3.9</td><td>thin CO₂, ancient river valleys</td></tr>
<tr><td>Jupiter</td><td>5.20</td><td>318</td><td>1.3</td><td>gas giant, Great Red Spot</td></tr>
<tr><td>Saturn</td><td>9.58</td><td>95</td><td>0.7</td><td>would float in water; rings</td></tr>
<tr><td>Uranus</td><td>19.2</td><td>14.5</td><td>1.3</td><td>ice giant, tilted 98°</td></tr>
<tr><td>Neptune</td><td>30.1</td><td>17.1</td><td>1.6</td><td>ice giant, fastest winds</td></tr>
</tbody></table></div>
<p>The inner <strong>terrestrial planets</strong> are small, dense and rocky. The outer <strong>giant planets</strong> are large, low density, made mostly of hydrogen and helium (Jupiter, Saturn) or water, ammonia and methane ices (Uranus, Neptune), with many moons and ring systems.</p>`
      },
      {
        title: 'Formation',
        html: R`
<p>The <strong>nebular theory</strong>: 4.57 billion years ago a cloud of gas and dust collapsed; conservation of angular momentum flattened it into a spinning disc with the proto-Sun at the centre. This explains why the planets orbit in nearly the same plane and direction.</p>
<p>Dust grains stuck together into <strong>planetesimals</strong>, which collided to build planets. Close to the Sun only rock and metal could condense; beyond the <strong>frost line</strong> (about 3 AU) ices condensed too, giving much more solid material. Cores of about 10 Earth masses grew fast enough to capture hydrogen and helium gas before the young Sun blew the disc away: the giants. The Moon likely formed from debris after a Mars-sized body struck the young Earth.</p>
<p>Radioactive dating of meteorites gives the age of the Solar System: the oldest solids (calcium–aluminium-rich inclusions) are 4.567 billion years old.</p>`
      },
      {
        title: 'Temperature and the greenhouse effect',
        html: R`
<p>A planet absorbs sunlight on its cross-section $\pi R^2$ and radiates from its whole surface $4\pi R^2$. Balancing the two, with <strong>Bond albedo</strong> $A$ (fraction reflected) and stellar flux $F = L/4\pi d^2$:</p>
$$T_{\text{eq}} = \left(\frac{(1 - A)L}{16\pi\sigma d^2}\right)^{1/4} \approx 278\ \text{K}\times\frac{(1-A)^{1/4}}{\sqrt{d/\text{AU}}}.$$
<p>For Earth ($A = 0.3$) this gives 255 K, −18 °C, but the mean surface is 288 K. The difference is the <strong>greenhouse effect</strong>: the atmosphere is transparent to sunlight but absorbs infrared from the ground and re-emits part of it downwards. A simple layered model gives $T_s = T_{\text{eq}}(1 + \tfrac34\tau)^{1/4}$ for infrared optical depth $\tau$. Venus has such a thick CO₂ atmosphere that its surface is hotter than Mercury's.</p>
<details class="example"><summary><span class="lbl">Worked example</span> What would Mars's equilibrium temperature be ($d = 1.52$ AU, $A = 0.25$)?<span class="tog">Solution</span></summary><div class="sol"><p>$278\times0.75^{1/4}/\sqrt{1.52} = 278\times0.931/1.233 = 210$ K.</p></div></details>`
      },
      {
        title: 'Keeping an atmosphere',
        html: R`
<p>Gas molecules move at a typical (rms) speed $v_{\text{rms}} = \sqrt{3kT/m}$. A few in the fast tail of the distribution can escape. A planet keeps a gas for billions of years only if</p>
$$v_{\text{esc}} \gtrsim 6\,v_{\text{rms}}.$$
<p>Light, hot gases escape from small planets: the Moon and Mercury kept nothing; Earth lost its hydrogen and helium but kept N₂ and O₂; the cold, massive giants kept everything. Mars lost much of its early atmosphere when its magnetic field died and the solar wind stripped it.</p>
<p>The <strong>scale height</strong> $H = kT/mg$ is how far up the pressure falls by a factor $e$: about 8.5 km on Earth, 11 km on Mars, 16 km on Venus.</p>`
      }
    ],
    labs: [
      { sim: 'eqtemp', title: 'Planetary temperatures', desc: 'Equilibrium (dashed) and greenhouse-warmed (solid) temperature against distance from the star, with the measured temperatures of the planets.',
        tasks: ['With A = 0.3 and no greenhouse effect, what temperature does Earth get? Increase τ until it matches 288 K.', 'Venus has τ ≈ 70 to 100 and albedo 0.76. Can you reproduce its 737 K?', 'Make the star 0.05 L☉, like a red dwarf. Where is the liquid-water zone now?'] }
    ],
    formulas: [
      ['Equilibrium temperature', R`T_{\text{eq}} = 278\,\text{K}\,(1-A)^{1/4}(d/\text{AU})^{-1/2}(L/L_\odot)^{1/4}`],
      ['Greenhouse (grey model)', R`T_s = T_{\text{eq}}(1 + \tfrac34\tau)^{1/4}`],
      ['Stellar flux', R`F = L/4\pi d^2`],
      ['rms speed', R`v_{\text{rms}} = \sqrt{3kT/m}`],
      ['Retention rule', R`v_{\text{esc}} > 6v_{\text{rms}}`],
      ['Scale height', R`H = kT/mg`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Frost line', q: R`<p>Why are the giant planets in the outer Solar System?</p>`, options: ['The Sun\'s gravity is weaker there', 'Beyond the frost line ices condensed, giving more solid material to build big cores', 'They migrated outward after forming', 'The outer disc was hotter'], answer: 1, hints: [R`More solids.`], solution: R`<p>Ices added a lot of solid mass, so cores grew big enough to capture gas.</p>` },
      { level: 'concept', type: 'mcq', title: 'Venus', q: R`<p>Venus is farther from the Sun than Mercury but hotter at the surface because…</p>`, options: ['It has active volcanoes heating it', 'Its thick CO₂ atmosphere gives a huge greenhouse effect', 'It rotates slowly', 'It has a lower albedo'], answer: 1, hints: [R`92 bar of CO₂.`], solution: R`<p>A runaway greenhouse effect.</p>` },
      { level: 'concept', type: 'mcq', title: 'Losing hydrogen', q: R`<p>Why has Earth lost almost all its primordial hydrogen but kept nitrogen?</p>`, options: ['Hydrogen reacted away', 'Light molecules move faster, so more exceed escape speed', 'Nitrogen is heavier and sinks', 'The magnetic field traps nitrogen only'], answer: 1, hints: [R`$v \propto 1/\sqrt m$.`], solution: R`<p>At the same temperature, H₂ moves $\sqrt{14}$ times faster than N₂.</p>` },
      { level: 'core', type: 'num', title: 'Earth\'s equilibrium', q: R`<p>Find Earth's equilibrium temperature with $A = 0.30$, in K.</p>`, answer: 254.3, tol: 0.005, unit: 'K', hints: [R`$278\times0.7^{1/4}$.`], solution: R`<p>$278\times0.915 = 254$ K.</p>` },
      { level: 'core', type: 'num', title: 'Jupiter', q: R`<p>Find Jupiter's equilibrium temperature ($d = 5.2$ AU, $A = 0.34$), in K.</p>`, answer: 109.9, tol: 0.01, unit: 'K', hints: [R`$278(0.66)^{1/4}/\sqrt{5.2}$.`], solution: R`<p>110 K. Jupiter is measured at about 125 K because it still radiates heat left over from its formation.</p>` },
      { level: 'core', type: 'num', title: 'Solar flux at Mars', q: R`<p>The solar flux at Earth is 1361 W/m². What is it at Mars (1.52 AU)?</p>`, answer: 589, tol: 0.01, unit: 'W/m²', hints: [R`Inverse square.`], solution: R`<p>$1361/1.52^2 = 589$ W/m².</p>` },
      { level: 'core', type: 'num', title: 'Density', q: R`<p>Saturn has mass $5.68\times10^{26}$ kg and mean radius 58 200 km. Find its mean density in kg/m³.</p>`, answer: 687, tol: 0.01, unit: 'kg/m³', hints: [R`$M/(\tfrac43\pi R^3)$.`], solution: R`<p>687 kg/m³, less than water.</p>` },
      { level: 'core', type: 'num', title: 'Required τ', q: R`<p>What infrared optical depth τ raises a 255 K planet to 288 K in the grey model?</p>`, answer: 0.84, tol: 0.02, unit: '', hints: [R`$(288/255)^4 = 1 + 0.75\tau$.`], solution: R`<p>$(1.1294)^4 = 1.627$, so $\tau = 0.836$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Can the Moon keep oxygen?', q: R`<p>At 400 K (the lunar day), find $v_{\text{rms}}$ of O₂ (0.032 kg/mol), in km/s. Compare with the Moon's escape speed of 2.38 km/s.</p>`, answer: 0.558, tol: 0.01, unit: 'km/s', hints: [R`$\sqrt{3RT/M}$.`], solution: R`<p>$v = 0.558$ km/s; $6v = 3.35 > 2.38$ km/s, so the Moon loses it.</p>` },
      { level: 'olympiad', type: 'num', title: 'Titan\'s scale height', q: R`<p>Titan's atmosphere is N₂ (0.028 kg/mol) at 94 K, with $g = 1.35$ m/s². Find the scale height in km.</p>`, answer: 20.7, tol: 0.01, unit: 'km', hints: [R`$H = RT/Mg$.`], solution: R`<p>$8.314\times94/(0.028\times1.35) = 20.7$ km: Titan's atmosphere is very extended.</p>` },
      { level: 'olympiad', type: 'num', title: 'Subsolar temperature', q: R`<p>An airless rock that does not conduct heat reaches $T_{\text{ss}} = T_{\text{eq}}\times\sqrt2$ at the point directly under the Sun. What is this for Mercury at 0.39 AU with $A = 0.09$, in K?</p>`, answer: 615, tol: 0.01, unit: 'K', hints: [R`First find $T_{\text{eq}}$.`], solution: R`<p>$T_{\text{eq}} = 278\times0.977/0.6245 = 435$ K; $\times\sqrt2 = 615$ K, close to Mercury's measured 700 K at perihelion noon.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-planets', [
    { title: 'Equilibrium temperature', gen(r) { const d = r.step(0.2, 40, 0.1), A = r.step(0, 0.8, 0.01); const T = 278 * Math.pow(1 - A, 0.25) / Math.sqrt(d); return { q: R`<p>A planet orbits a Sun-like star at ${f(d)} AU with Bond albedo ${f(A)}. Find its equilibrium temperature (use 278 K at 1 AU for A = 0).</p>`, answer: T, tol: 0.005, unit: 'K', solution: R`<p>$278\times(1 - ${f(A)})^{1/4}/\sqrt{${f(d)}} = ${f(T)}$ K.</p>` }; } },
    { title: 'Stellar flux', gen(r) { const d = r.step(0.1, 50, 0.1), L = r.pick([0.01, 0.1, 0.5, 1, 2, 10]); return { q: R`<p>What flux (in W/m²) does a planet receive at ${f(d)} AU from a star of ${L} L☉? (1361 W/m² at 1 AU from the Sun.)</p>`, answer: 1361 * L / (d * d), tol: 0.005, unit: 'W/m²', solution: R`<p>$1361\times${L}/${f(d)}^2 = ${f(1361 * L / (d * d))}$ W/m².</p>` }; } },
    { title: 'Molecular speeds', gen(r) { const gas = r.pick([['H₂', 0.002], ['He', 0.004], ['H₂O', 0.018], ['N₂', 0.028], ['O₂', 0.032], ['CO₂', 0.044]]), T = r.int(50, 1000); const v = Math.sqrt(3 * 8.314 * T / gas[1]) / 1000; return { q: R`<p>Find the rms speed of ${gas[0]} (${gas[1]} kg/mol) at ${T} K, in km/s.</p>`, answer: v, tol: 0.005, unit: 'km/s', solution: R`<p>$\sqrt{3\times8.314\times${T}/${gas[1]}} = ${f(v)}$ km/s.</p>` }; } }
  ]);
})();
