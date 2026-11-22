(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-kepler', subject: 'astronomy', num: 5, part: 'The Solar System',
    title: 'Kepler\'s Laws and Planetary Motion',
    subtitle: R`From Ptolemy to Newton. Retrograde motion, Kepler's three laws, the geometry of ellipses, Newton's form of the third law, orbital speeds and energy, and weighing the planets.`,
    goals: ['Explain retrograde motion with the heliocentric model', 'State and apply Kepler\'s three laws', 'Use the geometry of the ellipse', 'Apply Newton\'s version of Kepler\'s third law to find masses', 'Use the vis-viva equation'],
    sections: [
      {
        title: 'From geocentric to heliocentric',
        html: R`
<p>Planets normally drift eastwards against the stars but sometimes loop westwards for weeks: <strong>retrograde motion</strong>. Ptolemy's Earth-centred model explained it with epicycles. Copernicus (1543) put the Sun at the centre: retrograde motion is simply Earth overtaking an outer planet, as a faster car overtakes a slower one. Galileo's telescope (1610) found the phases of Venus, which only a Sun-centred arrangement explains, and Jupiter's moons, a miniature system not orbiting Earth.</p>
<p>Inner planets (Mercury, Venus) never stray far from the Sun; their maximum <strong>elongation</strong> $\epsilon$ gives their orbital radius directly: $a = \sin\epsilon_{\max}$ AU for a circular orbit. Venus reaches 46°, so $a \approx 0.72$ AU.</p>`
      },
      {
        title: 'Kepler\'s laws',
        html: R`
<p>Using Tycho Brahe's precise observations of Mars, Kepler (1609–1619) found three laws:</p>
<ol>
<li>Planets move in <strong>ellipses</strong> with the Sun at one focus.</li>
<li>The line from the Sun to a planet sweeps out <strong>equal areas in equal times</strong>: planets move fastest at <strong>perihelion</strong>. (This is conservation of angular momentum.)</li>
<li>The square of the period is proportional to the cube of the semi-major axis: $P^2 \propto a^3$. In years and AU for the Sun, $P^2 = a^3$.</li>
</ol>
<p>An ellipse with semi-major axis $a$ and eccentricity $e$ has perihelion and aphelion distances</p>
$$r_p = a(1-e),\qquad r_a = a(1+e),\qquad b = a\sqrt{1 - e^2},$$
<p>and in polar form $r = \dfrac{a(1-e^2)}{1 + e\cos\nu}$, where $\nu$ is the angle from perihelion (the true anomaly).</p>`
      },
      {
        title: 'Newton\'s version',
        html: R`
<p>Newton derived Kepler's laws from gravity. For two bodies orbiting their common centre of mass,</p>
$$P^2 = \frac{4\pi^2a^3}{G(M + m)}.$$
<p>This is the main way to weigh anything in astronomy: measure a moon's period and orbit and you have the planet's mass. In units of years, AU and solar masses: $P^2 = a^3/(M + m)$.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Io orbits Jupiter at 421 700 km every 1.769 days. Find Jupiter's mass.<span class="tog">Solution</span></summary><div class="sol"><p>$M = 4\pi^2a^3/GP^2 = 4\pi^2(4.217\times10^8)^3/(6.674\times10^{-11}\times(1.528\times10^5)^2) = 1.90\times10^{27}$ kg.</p></div></details>`
      },
      {
        title: 'Orbital speed and energy',
        html: R`
<p>The total energy of an orbit depends only on its semi-major axis: $E = -\dfrac{GMm}{2a}$. Combining with kinetic and potential energy gives the <strong>vis-viva equation</strong>:</p>
$$v^2 = GM\left(\frac2r - \frac1a\right).$$
<ul>
<li>Circular orbit: $v_c = \sqrt{GM/r}$. Earth moves at 29.8 km/s.</li>
<li>Escape: $v_{\text{esc}} = \sqrt{2GM/r} = \sqrt2\,v_c$. From Earth's surface, 11.2 km/s.</li>
<li>At perihelion and aphelion: $v_p/v_a = r_a/r_p = (1+e)/(1-e)$.</li>
</ul>
<p>Orbits with $E \lt 0$ are ellipses; $E = 0$ parabolas; $E > 0$ hyperbolas, like the interstellar visitors ʻOumuamua and Borisov.</p>`
      }
    ],
    labs: [
      { sim: 'orbit', title: 'Orbit launcher', desc: 'Launch a body at a chosen speed and angle and watch the orbit. Distances are in units of the launch radius and speeds in units of the circular speed there.',
        tasks: ['Launch horizontally at speeds 0.8, 1.0, 1.2 and 1.4. Which orbits are closed?', 'Find the escape speed. Compare it with √2.', 'For an elliptical orbit, check that the body moves fastest at its closest point.'] }
    ],
    formulas: [
      ['Kepler III (Solar System)', R`P^2 = a^3\ \ (\text{yr, AU})`],
      ['Newton\'s form', R`P^2 = \dfrac{4\pi^2a^3}{G(M+m)}`],
      ['Perihelion, aphelion', R`r = a(1 \mp e)`],
      ['Vis-viva', R`v^2 = GM(2/r - 1/a)`],
      ['Escape speed', R`v_{\text{esc}} = \sqrt{2GM/r}`],
      ['Orbital energy', R`E = -GMm/2a`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Retrograde motion', q: R`<p>Mars appears to move backwards when…</p>`, options: ['Mars slows down', 'Earth overtakes Mars near opposition', 'Mars is at aphelion', 'Mars passes behind the Sun'], answer: 1, hints: [R`Faster inner planet.`], solution: R`<p>Earth overtakes Mars around opposition.</p>` },
      { level: 'concept', type: 'mcq', title: 'Equal areas', q: R`<p>Kepler's second law is a consequence of conservation of…</p>`, options: ['Energy', 'Linear momentum', 'Angular momentum', 'Mass'], answer: 2, hints: [R`Gravity is a central force.`], solution: R`<p>Angular momentum: no torque about the Sun.</p>` },
      { level: 'concept', type: 'mcq', title: 'Phases of Venus', q: R`<p>Why did Galileo's observation of a full set of Venus's phases support the heliocentric model?</p>`, options: ['Venus was shown to be a planet', 'A gibbous Venus is impossible if Venus is always between Earth and the Sun', 'It showed Venus has an atmosphere', 'It proved orbits are ellipses'], answer: 1, hints: [R`In Ptolemy's model Venus stays between us and the Sun.`], solution: R`<p>Seeing Venus nearly full means it can be on the far side of the Sun.</p>` },
      { level: 'core', type: 'num', title: 'Period of Jupiter', q: R`<p>Jupiter's semi-major axis is 5.20 AU. Find its period in years.</p>`, answer: 11.86, tol: 0.005, unit: 'years', hints: [R`$a^{3/2}$.`], solution: R`<p>$5.2^{1.5} = 11.9$ years.</p>` },
      { level: 'core', type: 'num', title: 'Distance from period', q: R`<p>A comet has a period of 76 years. What is its semi-major axis, in AU?</p>`, answer: 17.94, tol: 0.005, unit: 'AU', hints: [R`$P^{2/3}$.`], solution: R`<p>$76^{2/3} = 17.9$ AU (Halley's Comet).</p>` },
      { level: 'core', type: 'num', title: 'Aphelion', q: R`<p>That comet has $e = 0.967$. What is its aphelion distance, in AU?</p>`, answer: 35.29, tol: 0.005, unit: 'AU', hints: [R`$a(1 + e)$.`], solution: R`<p>$17.94\times1.967 = 35.3$ AU, beyond Neptune. Perihelion is $17.94\times0.033 = 0.59$ AU.</p>` },
      { level: 'core', type: 'num', title: 'Venus from elongation', q: R`<p>Venus's greatest elongation is 46.3°. Assuming circular orbits, what is its orbital radius in AU?</p>`, answer: 0.723, tol: 0.005, unit: 'AU', hints: [R`$\sin\epsilon$.`], solution: R`<p>$\sin46.3^\circ = 0.723$ AU.</p>` },
      { level: 'core', type: 'num', title: 'Escape from the Moon', q: R`<p>Find the escape speed from the Moon's surface, in km/s ($M = 7.35\times10^{22}$ kg, $R = 1737$ km).</p>`, answer: 2.375, tol: 0.01, unit: 'km/s', hints: [R`$\sqrt{2GM/R}$.`], solution: R`<p>2.38 km/s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mass of Jupiter', q: R`<p>Callisto orbits Jupiter with $a = 1.883\times10^6$ km and $P = 16.69$ days. Find Jupiter's mass in units of 10²⁷ kg.</p>`, answer: 1.898, tol: 0.01, unit: '×10²⁷ kg', hints: [R`$4\pi^2a^3/GP^2$.`], solution: R`<p>$M = 1.90\times10^{27}$ kg.</p>` },
      { level: 'olympiad', type: 'num', title: 'Speed at perihelion', q: R`<p>Earth's orbit has $a = 1$ AU and $e = 0.0167$. Using vis-viva with $GM_\odot = 1.327\times10^{20}$ m³/s², find Earth's speed at perihelion in km/s (1 AU = 1.496 × 10¹¹ m).</p>`, answer: 30.29, tol: 0.003, unit: 'km/s', hints: [R`$r = 0.9833$ AU.`], solution: R`<p>$v^2 = GM(2/r - 1/a)$ gives $v_p = 30.29$ km/s; at aphelion 29.29 km/s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Binary weighing', q: R`<p>Two stars orbit each other every 50 years with semi-major axis 20 AU. What is their total mass, in solar masses?</p>`, answer: 3.2, tol: 0.002, unit: 'M☉', hints: [R`$M = a^3/P^2$.`], solution: R`<p>$8000/2500 = 3.2\ M_\odot$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-kepler', [
    { title: 'Kepler\'s third law', gen(r) { const a = r.step(0.3, 50, 0.1); return { q: R`<p>A body orbits the Sun with semi-major axis ${f(a)} AU. What is its period, in years?</p>`, answer: Math.pow(a, 1.5), tol: 0.005, unit: 'years', solution: R`<p>$${f(a)}^{3/2} = ${f(Math.pow(a, 1.5))}$ years.</p>` }; } },
    { title: 'Binary mass', gen(r) { const a = r.step(1, 100, 0.5), P = r.step(1, 300, 0.5); const M = a ** 3 / P ** 2; if (M < 0.1 || M > 100) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>A visual binary has period ${f(P)} years and semi-major axis ${f(a)} AU. What is the total mass, in solar masses?</p>`, answer: M, tol: 0.005, unit: 'M☉', solution: R`<p>$${f(a)}^3/${f(P)}^2 = ${f(M)}\ M_\odot$.</p>` }; } },
    { title: 'Perihelion and aphelion', gen(r) { const a = r.step(0.5, 40, 0.1), e = r.step(0.01, 0.95, 0.01), w = r.pick(['perihelion', 'aphelion']); const v = w === 'perihelion' ? a * (1 - e) : a * (1 + e); return { q: R`<p>An orbit has $a = ${f(a)}$ AU and $e = ${f(e)}$. What is its ${w} distance, in AU?</p>`, answer: v, tol: 0.005, unit: 'AU', solution: R`<p>$${f(a)}(1 ${w === 'perihelion' ? '-' : '+'} ${f(e)}) = ${f(v)}$ AU.</p>` }; } }
  ]);
})();
