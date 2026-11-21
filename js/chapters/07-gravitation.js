(function () {
  const R = PB.R;
  const GM = 6.674e-11 * 5.97e24;
  PB.addChapter({
    id: 'gravitation', num: 7, part: 'Mechanics',
    title: 'Gravitation and Orbits',
    subtitle: R`Newton's universal law, gravitational potential energy, escape speed, Kepler's laws and orbital manoeuvres, with the energy tricks that make orbit problems quick.`,
    goals: ['Use the inverse-square law and the shell theorem', 'Work with U = −GMm/r and escape speed', 'Derive Kepler’s laws for circular orbits', 'Use vis-viva and orbital energy', 'Plan a Hohmann transfer'],
    sections: [
      {
        title: "Newton's law of gravitation",
        html: R`
<p>Every pair of point masses attracts with a force along the line joining them:</p>
<div class="key">$$F = \frac{Gm_1m_2}{r^2},\qquad G = 6.674\times10^{-11}\ \mathrm{N\,m^2\,kg^{-2}}.$$</div>
<p>The <strong>shell theorem</strong> makes this law usable for planets: a uniform spherical shell attracts an outside mass as if all its mass were at the centre, and exerts <em>no net force</em> on a mass inside it. So outside a spherically symmetric planet, $g = GM/r^2$.</p>
<p>Inside a uniform planet, only the mass within radius $r$ pulls: $M(r) = M r^3/R^3$, so $g(r) = GMr/R^3$, growing linearly from zero at the centre. A frictionless tunnel through such a planet would turn any dropped object into a simple harmonic oscillator.</p>`
      },
      {
        title: 'Gravitational potential energy and escape',
        html: R`
<p>Integrating the force from infinity gives the potential energy, with zero at infinite separation:</p>
<div class="key">$$U(r) = -\frac{GMm}{r}.$$</div>
<p>Near the surface, $U(R + h) - U(R) \approx mgh$, recovering the familiar result. To escape from the surface entirely you need total energy $\ge 0$:</p>
$$\tfrac12 mv_{\text{esc}}^2 - \frac{GMm}{R} = 0\quad\Rightarrow\quad v_{\text{esc}} = \sqrt{\frac{2GM}{R}}.$$
<p>For Earth this is $11.2\ \mathrm{km/s}$. Note that escape speed is $\sqrt2$ times the speed of a circular orbit at the same radius.</p>`
      },
      {
        title: "Orbits and Kepler's laws",
        html: R`
<p>For a circular orbit of radius $r$, gravity supplies the centripetal force: $GMm/r^2 = mv^2/r$, so</p>
<div class="key">$$v = \sqrt{\frac{GM}{r}},\qquad T^2 = \frac{4\pi^2}{GM}r^3,\qquad E = K + U = -\frac{GMm}{2r}.$$</div>
<p>Kepler's three laws hold for all bound orbits:</p>
<ol>
<li>Orbits are ellipses with the central body at one focus.</li>
<li>The line from the sun to the planet sweeps equal areas in equal times. This is conservation of angular momentum: $\dd A/\dd t = L/(2m)$.</li>
<li>$T^2 \propto a^3$, where $a$ is the semi-major axis.</li>
</ol>
<p>For an elliptical orbit, the total energy depends only on $a$: $E = -GMm/(2a)$. Combining with $E = \tfrac12 mv^2 - GMm/r$ gives the <strong>vis-viva equation</strong>:</p>
<div class="key">$$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right).$$</div>
<div class="insight"><p>At perihelion and aphelion the velocity is perpendicular to the radius, so $r_pv_p = r_av_a$ by angular-momentum conservation. Together with energy conservation, these two equations solve almost every ellipse problem without any geometry.</p></div>
<p>The <strong>virial theorem</strong> for circular orbits, $K = -\tfrac12 U$ and $E = -K$, explains the satellite paradox: losing energy to air drag makes a satellite spiral inward and speed <em>up</em>.</p>`
      },
      {
        title: 'Manoeuvres, two bodies and tides',
        html: R`
<p>A <strong>Hohmann transfer</strong> moves a spacecraft between two circular orbits $r_1$ and $r_2$ using half an ellipse with $a = (r_1 + r_2)/2$. One burn at $r_1$ raises the aphelion to $r_2$; a second burn at $r_2$ circularises the orbit. The trip takes half the transfer period, $\tfrac12 T_{\text{transfer}}$.</p>
<h3>Two-body problem</h3>
<p>Two bodies orbit their common centre of mass. Their relative motion is identical to that of a single particle of reduced mass $\mu = m_1m_2/(m_1+m_2)$ around a fixed mass $m_1 + m_2$. Kepler's third law becomes</p>
$$T^2 = \frac{4\pi^2 d^3}{G(m_1 + m_2)},$$
<p>where $d$ is the separation. This is how astronomers weigh binary stars and detect exoplanets.</p>
<h3>Tidal forces</h3>
<p>Gravity varies across an extended body. Across a body of size $\Delta r$ at distance $r$ from mass $M$, the difference in field is about $2GM\Delta r/r^3$. Falling off as $1/r^3$, tides are dominated by the nearby Moon rather than the more massive but distant Sun.</p>`
      }
    ],
    labs: [
      { sim: 'orbit', title: 'Orbit launcher', desc: 'Launch a satellite from one planetary radius at a chosen speed and angle. Distances are in units of the launch radius r₀, and periods in units of the circular orbit period T₀ at r₀.',
        tasks: ['Launch at exactly 1.00 times circular speed. Then try 1.41 (≈ √2). What changes?', 'With Kepler shading on, compare the sector areas near perihelion and aphelion.', 'Launch at 0.8× circular speed and read off the period. Check it against T ∝ a<sup>3/2</sup>.', 'Find a launch that crashes into the planet even though the speed is above 0.5× circular speed.'] }
    ],
    formulas: [
      ['Newton’s law of gravitation', R`F = Gm_1m_2/r^2`],
      ['Field outside a sphere', R`g = GM/r^2`],
      ['Field inside a uniform sphere', R`g = GMr/R^3`],
      ['Potential energy', R`U = -GMm/r`],
      ['Escape speed', R`v_{\text{esc}} = \sqrt{2GM/R}`],
      ['Circular orbit speed', R`v = \sqrt{GM/r}`],
      ['Kepler’s third law', R`T^2 = 4\pi^2a^3/(GM)`],
      ['Orbital energy', R`E = -GMm/(2a)`],
      ['Vis-viva', R`v^2 = GM(2/r - 1/a)`],
      ['Binary period', R`T^2 = 4\pi^2d^3/[G(m_1+m_2)]`],
      ['Tidal field difference', R`\Delta g \approx 2GM\Delta r/r^3`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Satellite paradox',
        q: R`<p>A satellite in a circular orbit briefly fires its engine forward to speed up, then eventually settles into a new circular orbit. Compared with before, the new orbit has:</p>`,
        options: ['Smaller radius and higher speed', 'Larger radius and higher speed', 'Larger radius and lower speed', 'The same radius and higher speed'], answer: 2,
        hints: [R`Adding energy raises $E = -GMm/(2r)$, so $r$ grows. What does $v = \sqrt{GM/r}$ then do?`],
        solution: R`<p>The burn adds energy, so the orbit ends up larger ($E$ less negative). In a larger circular orbit the speed $\sqrt{GM/r}$ is lower. (In practice two burns are needed to circularise.)</p>` },
      { level: 'concept', type: 'mcq', title: 'Halfway down',
        q: R`<p>Treat the Earth as a uniform sphere. At a depth of half the Earth's radius, the gravitational field is:</p>`,
        options: [R`$g/4$`, R`$g/2$`, R`$g$`, R`$4g$`], answer: 1,
        hints: [R`Only the mass inside radius $r$ pulls, and $g(r) = GMr/R^3$.`],
        solution: R`<p>$g(r) \propto r$ inside a uniform sphere, so at $r = R/2$ the field is $g/2$.</p>` },
      { level: 'concept', type: 'mcq', title: "Kepler's third law",
        q: R`<p>If a moon's orbital radius were four times larger, its orbital period would be:</p>`,
        options: ['2 times longer', '4 times longer', '8 times longer', '16 times longer'], answer: 2,
        hints: [R`$T \propto r^{3/2}$.`],
        solution: R`<p>$T \propto r^{3/2}$, and $4^{3/2} = 8$.</p>` },
      { level: 'core', type: 'num', title: 'Escaping the Moon',
        q: R`<p>Find the escape speed from the surface of the Moon. ($M = 7.35\times10^{22}\ \mathrm{kg}$, $R = 1.737\times10^6\ \mathrm{m}$)</p>`,
        answer: Math.sqrt(2 * 6.674e-11 * 7.35e22 / 1.737e6), tol: 0.01, unit: 'm/s',
        hints: [R`$v_{\text{esc}} = \sqrt{2GM/R}$.`],
        solution: R`<p>$v = \sqrt{\dfrac{2(6.674\times10^{-11})(7.35\times10^{22})}{1.737\times10^6}} = 2.38\ \mathrm{km/s}$. This low value is why the Moon has kept no atmosphere.</p>` },
      { level: 'core', type: 'num', title: 'Geostationary orbit',
        q: R`<p>A geostationary satellite orbits once per sidereal day ($86\,164\ \mathrm{s}$). Find its orbital radius in kilometres. ($M_E = 5.97\times10^{24}\ \mathrm{kg}$)</p>`,
        answer: Math.cbrt(GM * 86164 * 86164 / (4 * Math.PI * Math.PI)) / 1000, tol: 0.01, unit: 'km',
        hints: [R`$r^3 = GMT^2/(4\pi^2)$.`],
        solution: R`<p>$r = \left(\dfrac{GMT^2}{4\pi^2}\right)^{1/3} = 4.22\times10^4\ \mathrm{km}$, about 6.6 Earth radii.</p>` },
      { level: 'core', type: 'num', title: 'Space station speed',
        q: R`<p>The International Space Station orbits $400\ \mathrm{km}$ above the surface. Find its orbital speed. ($R_E = 6370\ \mathrm{km}$, $M_E = 5.97\times10^{24}\ \mathrm{kg}$)</p>`,
        answer: Math.sqrt(GM / 6.77e6), tol: 0.01, unit: 'm/s',
        hints: [R`Use the radius from Earth's centre, $r = R_E + h$.`],
        solution: R`<p>$v = \sqrt{GM/r} = \sqrt{3.98\times10^{14}/6.77\times10^6} = 7.67\ \mathrm{km/s}$, one orbit every 92 minutes.</p>` },
      { level: 'core', type: 'num', title: 'Raising an orbit',
        q: R`<p>How much energy is needed to move a $1000\ \mathrm{kg}$ satellite from a circular orbit of radius $7000\ \mathrm{km}$ to one of radius $14\,000\ \mathrm{km}$? ($M_E = 5.97\times10^{24}\ \mathrm{kg}$)</p>`,
        answer: GM * 1000 / 2 * (1 / 7e6 - 1 / 1.4e7), tol: 0.01, unit: 'J',
        hints: [R`$E = -GMm/(2r)$ for each orbit.`],
        solution: R`<p>$\Delta E = \dfrac{GMm}{2}\left(\dfrac1{r_1} - \dfrac1{r_2}\right) = \dfrac{3.98\times10^{17}}{2}(7.14\times10^{-8}) = 1.42\times10^{10}\ \mathrm{J}$.</p>` },
      { level: 'core', type: 'num', title: 'A year on Mars',
        q: R`<p>Mars orbits the Sun with a semi-major axis of $1.524\ \mathrm{AU}$. How long is a Martian year, in Earth years?</p>`,
        answer: Math.pow(1.524, 1.5), tol: 0.01, unit: 'years',
        hints: [R`In units of AU and years, Kepler's third law for the Sun is simply $T^2 = a^3$.`],
        solution: R`<p>$T = 1.524^{3/2} = 1.88$ years.</p>` },
      { level: 'olympiad', type: 'num', title: 'Trip to Mars',
        q: R`<p>A spacecraft travels from Earth's orbit ($1.000\ \mathrm{AU}$) to Mars's orbit ($1.524\ \mathrm{AU}$) on a Hohmann transfer ellipse. Treat both orbits as circular. How long is the trip, in days? (1 year = 365.25 days)</p>`,
        answer: 0.5 * Math.pow((1 + 1.524) / 2, 1.5) * 365.25, tol: 0.01, unit: 'days',
        hints: [R`The transfer ellipse has $a = (r_1 + r_2)/2$.`, R`The trip is half of one orbital period of that ellipse.`],
        solution: R`<p>$a = 1.262\ \mathrm{AU}$, so $T = 1.262^{3/2} = 1.418$ years. The trip takes half of this: $0.709$ years $= 259$ days. Launch windows open only when Mars is about $44^\circ$ ahead of Earth, every 26 months.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gravity train',
        q: R`<p>A straight frictionless tunnel is drilled through the centre of a uniform Earth ($R = 6.37\times10^6\ \mathrm{m}$, $g = 9.8\ \mathrm{m/s^2}$ at the surface). An object is dropped in at one end. How many minutes until it reaches the other end?</p>`,
        answer: Math.PI * Math.sqrt(6.37e6 / 9.8) / 60, tol: 0.01, unit: 'min',
        hints: [R`Inside the Earth, $F = -mgr/R$, a Hooke's-law force.`, R`The trip is half a period of SHM with $\omega = \sqrt{g/R}$.`],
        solution: R`<p>The restoring force is $-(mg/R)r$, giving SHM with $\omega = \sqrt{g/R}$. One-way trip $= \pi\sqrt{R/g} = \pi(806\ \mathrm{s}) = 2530\ \mathrm{s} = 42.2\ \mathrm{min}$. Surprisingly, a straight tunnel between <em>any</em> two surface points takes the same time, and this period equals that of a satellite skimming the surface.</p>` },
      { level: 'olympiad', type: 'num', title: 'Binary star',
        q: R`<p>Two stars, each of mass $2.0\times10^{30}\ \mathrm{kg}$, orbit their common centre of mass in circles. Their separation is $1.5\times10^{11}\ \mathrm{m}$. Find the orbital period in days.</p>`,
        answer: 2 * Math.PI * Math.sqrt(Math.pow(1.5e11, 3) / (6.674e-11 * 4e30)) / 86400, tol: 0.01, unit: 'days',
        hints: [R`Each star moves on a circle of radius $d/2$, but the force between them uses the full separation $d$.`, R`Equivalently, use $T^2 = 4\pi^2d^3/[G(m_1+m_2)]$.`],
        solution: R`<p>For each star, $\dfrac{GM^2}{d^2} = M\omega^2\dfrac d2$, so $\omega^2 = \dfrac{2GM}{d^3} = \dfrac{G(2M)}{d^3}$. Then $T = 2\pi\sqrt{\dfrac{d^3}{G(2M)}} = 2.23\times10^7\ \mathrm{s} = 259$ days.</p>` }
    ]
  });
})();
