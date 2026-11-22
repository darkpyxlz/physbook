(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-smallbodies', subject: 'astronomy', num: 7, part: 'The Solar System',
    title: 'Moons, Small Bodies and Spaceflight',
    subtitle: R`The rest of the Solar System and how we visit it. Moons and rings, asteroids, comets, meteors and dwarf planets; impacts; and the mechanics of rockets and transfer orbits.`,
    goals: ['Describe the major moons and ring systems', 'Distinguish asteroids, comets, meteoroids and dwarf planets', 'Estimate impact energies and crater sizes', 'Apply the rocket equation', 'Plan a Hohmann transfer and its launch window'],
    sections: [
      {
        title: 'Moons and rings',
        html: R`
<p>Over 290 moons are known. Jupiter's four <strong>Galilean moons</strong> show how tidal heating shapes worlds: Io is the most volcanic body in the Solar System, flexed by Jupiter's tides; Europa and Ganymede hide salty oceans under ice. Saturn's <strong>Titan</strong> has a thick nitrogen atmosphere and lakes of liquid methane; <strong>Enceladus</strong> sprays water geysers from a subsurface ocean. Neptune's <strong>Triton</strong> orbits backwards and is probably a captured Kuiper belt object.</p>
<p>All four giants have rings. Saturn's are made of water-ice pieces from dust to house size, only about 10 m thick yet 280 000 km across. Gaps are cleared by <strong>orbital resonances</strong> with moons: the Cassini division lies where a ring particle would orbit twice for each orbit of Mimas.</p>`
      },
      {
        title: 'Asteroids, comets and dwarf planets',
        html: R`
<ul>
<li><strong>Asteroids</strong> are rocky and metallic bodies, mostly in the main belt between Mars and Jupiter. Jupiter's resonances carve the <strong>Kirkwood gaps</strong>. The total mass of the belt is only about 3% of the Moon's.</li>
<li><strong>Comets</strong> are "dirty snowballs" of ice and dust from the <strong>Kuiper belt</strong> (beyond Neptune, 30–50 AU; short-period comets) and the distant <strong>Oort cloud</strong> (up to about 100 000 AU; long-period comets). Near the Sun the ice sublimates, forming a <strong>coma</strong> and two tails pointing away from the Sun: a straight blue ion tail driven by the solar wind and a curved dust tail pushed by radiation pressure.</li>
<li><strong>Meteoroids</strong> burn up as <strong>meteors</strong> in the atmosphere; survivors that land are <strong>meteorites</strong>. Meteor showers happen when Earth crosses a comet's debris stream (the Perseids come from comet Swift–Tuttle).</li>
<li><strong>Dwarf planets</strong> (Pluto, Eris, Ceres, Haumea, Makemake) are massive enough to be round but have not cleared their orbits.</li>
</ul>`
      },
      {
        title: 'Impacts',
        html: R`
<p>Objects hit Earth at 11–72 km/s, so their kinetic energy is enormous: $E = \tfrac12mv^2$. A 10 m stony body releases about 0.1 megatonnes of TNT (1 Mt = $4.18\times10^{15}$ J), roughly what exploded over Chelyabinsk in 2013 (actually about 20 m and 0.5 Mt). The 10 km Chicxulub impactor 66 million years ago released about $10^{8}$ Mt and ended the age of dinosaurs.</p>
<p>Crater counts date surfaces: heavily cratered terrain (the lunar highlands) is old; smooth plains (the maria) were flooded by lava later. The number of craters larger than $D$ roughly follows $N \propto D^{-2}$. In 2022 NASA's DART spacecraft changed the orbit of the asteroid moon Dimorphos by 33 minutes, the first test of planetary defence.</p>`
      },
      {
        title: 'Rockets and transfer orbits',
        html: R`
<p>A rocket gains speed by throwing mass backwards. With exhaust speed $v_e$, the <strong>Tsiolkovsky rocket equation</strong> gives the change in velocity:</p>
$$\Delta v = v_e\ln\frac{m_0}{m_f}.$$
<p>Reaching low Earth orbit needs about 9.4 km/s including gravity and drag losses; with $v_e \approx 3.5$ km/s that means a mass ratio of about 15, which is why rockets have stages.</p>
<p>The cheapest route between two circular orbits is a <strong>Hohmann transfer</strong>: an ellipse touching both. Its semi-major axis is $a_t = (r_1 + r_2)/2$, and the trip takes half its period:</p>
$$t = \tfrac12 a_t^{3/2}\ \text{years (AU)},\qquad \Delta v_1 = v_1\left(\sqrt{\frac{2r_2}{r_1+r_2}} - 1\right).$$
<p>Earth to Mars takes about 259 days. You must launch when Mars leads Earth by about 44°, which happens once per synodic period (26 months): the <strong>launch window</strong>. Missions to the outer planets save fuel with <strong>gravity assists</strong>, stealing a little orbital energy from a planet during a flyby.</p>`
      }
    ],
    labs: [
      { sim: 'hohmann', title: 'Hohmann transfer', desc: 'A spacecraft (black) flies a transfer ellipse from one planet\'s orbit to another\'s. Launch happens when the target is at the right angle ahead.',
        tasks: ['Plan Earth to Mars (1 to 1.52 AU). Compare the transfer time and lead angle with the text.', 'Try Earth to Jupiter (5.2 AU). How long is the trip? Why do real missions use gravity assists?', 'Plan Earth to Venus (0.72 AU). Should Venus be ahead of or behind Earth at launch?'] }
    ],
    formulas: [
      ['Rocket equation', R`\Delta v = v_e\ln(m_0/m_f)`],
      ['Transfer orbit', R`a_t = (r_1 + r_2)/2`],
      ['Transfer time', R`t = \tfrac12a_t^{3/2}\ \text{yr}`],
      ['Departure burn', R`\Delta v_1 = v_1\big(\sqrt{2r_2/(r_1+r_2)} - 1\big)`],
      ['Kinetic energy', R`E = \tfrac12mv^2`],
      ['TNT equivalent', R`1\ \text{Mt} = 4.18\times10^{15}\ \text{J}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Comet tails', q: R`<p>Which way does a comet's ion tail point?</p>`, options: ['Behind the comet along its orbit', 'Directly away from the Sun', 'Towards the Sun', 'Towards Jupiter'], answer: 1, hints: [R`Solar wind.`], solution: R`<p>Away from the Sun, even when the comet is moving away from the Sun.</p>` },
      { level: 'concept', type: 'mcq', title: 'Pluto', q: R`<p>Why is Pluto classed as a dwarf planet?</p>`, options: ['It is not round', 'It has not cleared its orbital neighbourhood', 'It has moons', 'It is too far away'], answer: 1, hints: [R`The IAU's third criterion.`], solution: R`<p>It shares its region with many Kuiper belt objects.</p>` },
      { level: 'concept', type: 'mcq', title: 'Io', q: R`<p>What powers Io's volcanoes?</p>`, options: ['Radioactive decay', 'Tidal heating from Jupiter', 'Sunlight', 'Impacts'], answer: 1, hints: [R`Its orbit is slightly eccentric because of resonances.`], solution: R`<p>Varying tidal stretching heats its interior.</p>` },
      { level: 'core', type: 'num', title: 'Impact energy', q: R`<p>A 20 m stony asteroid (density 3000 kg/m³) hits at 19 km/s. Find its kinetic energy in megatonnes of TNT.</p>`, answer: 0.543, tol: 0.02, unit: 'Mt', hints: [R`Mass $= \tfrac43\pi r^3\rho$.`], solution: R`<p>$m = \tfrac43\pi(10)^3(3000) = 1.26\times10^7$ kg; $E = \tfrac12(1.26\times10^7)(1.9\times10^4)^2 = 2.27\times10^{15}$ J $= 0.54$ Mt, similar to Chelyabinsk.</p>` },
      { level: 'core', type: 'num', title: 'Rocket mass ratio', q: R`<p>A stage has exhaust speed 3.0 km/s and must provide 4.5 km/s. What mass ratio $m_0/m_f$ is needed?</p>`, answer: 4.48, tol: 0.005, unit: '', hints: [R`$e^{1.5}$.`], solution: R`<p>$e^{1.5} = 4.48$.</p>` },
      { level: 'core', type: 'num', title: 'Delta-v', q: R`<p>A rocket with $v_e = 4.4$ km/s burns from 500 t down to 100 t. What Δv does it gain, in km/s?</p>`, answer: 7.08, tol: 0.005, unit: 'km/s', hints: [R`$4.4\ln5$.`], solution: R`<p>7.08 km/s.</p>` },
      { level: 'core', type: 'num', title: 'Mars transfer time', q: R`<p>How long, in days, does a Hohmann transfer from Earth (1 AU) to Mars (1.524 AU) take?</p>`, answer: 259, tol: 0.01, unit: 'days', hints: [R`$a_t = 1.262$ AU.`], solution: R`<p>$0.5\times1.262^{1.5} = 0.709$ yr $= 259$ days.</p>` },
      { level: 'core', type: 'num', title: 'Comet aphelion', q: R`<p>A comet has perihelion 0.5 AU and period 200 years. Find its aphelion distance, in AU.</p>`, answer: 67.9, tol: 0.01, unit: 'AU', hints: [R`$a = P^{2/3}$, aphelion $= 2a - r_p$.`], solution: R`<p>$a = 34.2$ AU; aphelion $= 68.4 - 0.5 = 67.9$ AU.</p>` },
      { level: 'olympiad', type: 'num', title: 'Departure burn', q: R`<p>Find Δv₁ for a Hohmann transfer from Earth's orbit (1 AU, 29.78 km/s) to Mars's orbit (1.524 AU), in km/s.</p>`, answer: 2.94, tol: 0.01, unit: 'km/s', hints: [R`$29.78(\sqrt{2\times1.524/2.524} - 1)$.`], solution: R`<p>$29.78\times(1.0989 - 1) = 2.95$ km/s beyond Earth's escape.</p>` },
      { level: 'olympiad', type: 'num', title: 'Launch phase', q: R`<p>For the Earth–Mars transfer (259 days; Mars's period 687 days), by how many degrees must Mars lead Earth at launch?</p>`, answer: 44.3, tol: 0.01, unit: '°', hints: [R`Mars moves $360\times259/687$ during the trip; it must arrive at 180°.`], solution: R`<p>$180 - 135.7 = 44.3^\circ$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Resonance', q: R`<p>Mimas orbits Saturn at 185 500 km. At what radius, in km, would a ring particle orbit exactly twice per Mimas orbit (the Cassini division)?</p>`, answer: 116860, tol: 0.01, unit: 'km', hints: [R`$a \propto P^{2/3}$; $P$ halves.`], solution: R`<p>$185\,500\times2^{-2/3} = 116\,900$ km, matching the inner edge of the Cassini division (about 117 500 km).</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-smallbodies', [
    { title: 'Rocket equation', gen(r) { const ve = r.step(2, 4.5, 0.1), ratio = r.step(1.5, 20, 0.5); const dv = ve * Math.log(ratio); return { q: R`<p>A rocket stage with exhaust speed ${f(ve)} km/s has mass ratio ${f(ratio)}. What Δv does it give, in km/s?</p>`, answer: dv, tol: 0.005, unit: 'km/s', solution: R`<p>$${f(ve)}\ln${f(ratio)} = ${f(dv)}$ km/s.</p>` }; } },
    { title: 'Hohmann transfer time', gen(r) { const r1 = r.pick([0.39, 0.72, 1, 1.52]), r2 = r.pick([1.52, 2.8, 5.2, 9.58, 19.2, 30.1]); if (r2 <= r1) return this.gen(PB.rng(r.int(1, 1e9))); const t = 0.5 * Math.pow((r1 + r2) / 2, 1.5) * 365.25; return { q: R`<p>How long, in days, does a Hohmann transfer from ${r1} AU to ${r2} AU take?</p>`, answer: t, tol: 0.005, unit: 'days', solution: R`<p>$a_t = ${f((r1 + r2) / 2)}$ AU; $t = \tfrac12a_t^{3/2} = ${f(t)}$ days.</p>` }; } },
    { title: 'Impact energy', gen(r) { const d = r.pick([5, 10, 20, 50, 100, 300, 1000]), v = r.int(12, 40); const m = 4 / 3 * Math.PI * Math.pow(d / 2, 3) * 3000, E = 0.5 * m * v * v * 1e6 / 4.18e15; return { q: R`<p>A stony asteroid ${d} m across (3000 kg/m³) hits at ${v} km/s. What is its energy, in megatonnes of TNT?</p>`, answer: E, tol: 0.01, unit: 'Mt', solution: R`<p>$m = ${f(m)}$ kg; $E = ${f(E)}$ Mt.</p>` }; } }
  ]);
})();
