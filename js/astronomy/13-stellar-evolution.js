(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-evolution', subject: 'astronomy', num: 13, part: 'The Stars',
    title: 'The Lives and Deaths of Stars',
    subtitle: R`From cloud to remnant. Star formation and the Jeans mass, life after the main sequence, planetary nebulae and white dwarfs, supernovae, neutron stars, pulsars and black holes.`,
    goals: ['Explain star formation with the Jeans criterion', 'Trace the evolution of low- and high-mass stars', 'Explain the Chandrasekhar limit and degeneracy pressure', 'Describe supernovae and the origin of the elements', 'Calculate properties of neutron stars and black holes'],
    sections: [
      {
        title: 'Star formation',
        html: R`
<p>Stars form in cold (10–20 K), dense molecular clouds. A region collapses if its gravity beats its thermal pressure, which happens above the <strong>Jeans mass</strong>:</p>
$$M_J \approx \left(\frac{5kT}{G\mu m_H}\right)^{3/2}\left(\frac{3}{4\pi\rho}\right)^{1/2}.$$
<p>Cold, dense gas collapses most easily. The cloud fragments into clumps that collapse on the <strong>free-fall time</strong> $t_{ff} = \sqrt{3\pi/32G\rho}$, typically 100 000 years. Contracting <strong>protostars</strong> are heated by gravitational energy and hidden in dust, visible in infrared. Spin flattens infalling gas into discs, from which planets form, and jets shoot out along the poles. When the core reaches about 10 million K, hydrogen fusion starts and the star joins the main sequence.</p>`
      },
      {
        title: 'Low-mass stars: red giants and white dwarfs',
        html: R`
<p>When hydrogen runs out in the core of a star like the Sun, the helium core contracts and heats, hydrogen burns in a shell around it, and the envelope swells into a <strong>red giant</strong>, 100 times larger. At about 100 million K helium ignites (in a "helium flash" for stars below about 2 M☉), fusing into carbon and oxygen by the <strong>triple-alpha process</strong>: $3\,{}^4\text{He} \to {}^{12}\text{C}$.</p>
<p>After helium is exhausted, the star becomes an asymptotic giant branch star, pulses, and sheds its outer layers as a glowing <strong>planetary nebula</strong>. The exposed core is a <strong>white dwarf</strong>: about Earth-sized, with density around $10^9$ kg/m³, held up by <strong>electron degeneracy pressure</strong>, a quantum effect of the Pauli exclusion principle. It cools for billions of years.</p>
<p>White dwarfs obey an odd mass–radius relation, $R \propto M^{-1/3}$: heavier ones are smaller. Above the <strong>Chandrasekhar limit</strong> of 1.4 M☉ no white dwarf can exist.</p>`
      },
      {
        title: 'Massive stars and supernovae',
        html: R`
<p>Stars over about 8 M☉ go on fusing carbon, neon, oxygen and silicon in shells like an onion, each stage faster: silicon burning lasts about a day. The chain stops at <strong>iron</strong>, which has the highest binding energy per nucleon: fusing it absorbs energy.</p>
<p>When the iron core exceeds the Chandrasekhar limit it collapses in under a second from Earth size to about 20 km. Electrons and protons merge into neutrons, releasing a flood of neutrinos (detected from SN 1987A). The infalling envelope rebounds and is blasted out in a <strong>core-collapse supernova</strong> (Types II, Ib, Ic), briefly as bright as a galaxy.</p>
<p>A <strong>Type Ia supernova</strong> is different: a white dwarf in a binary is pushed over the limit and explodes completely by runaway carbon fusion. Because they explode at nearly the same mass, they have similar peak luminosity ($M_V \approx -19.3$) and are standard candles.</p>
<p>Supernovae and merging neutron stars spread heavy elements: everything heavier than helium in your body except some lithium was made in stars. Elements beyond iron form by neutron capture (the s- and r-processes); much of the gold in the universe comes from neutron-star collisions.</p>`
      },
      {
        title: 'Neutron stars and black holes',
        html: R`
<p>A <strong>neutron star</strong> has about 1.4 M☉ in a sphere about 12 km across, with nuclear density ($\sim 4\times10^{17}$ kg/m³), held up by neutron degeneracy and nuclear forces. Conserving angular momentum and magnetic flux, it spins fast and has an enormous magnetic field. Beams from its poles sweep past Earth as <strong>pulsar</strong> pulses (discovered by Jocelyn Bell Burnell, 1967). Periods range from milliseconds to seconds and slowly lengthen.</p>
<p>Above about 2–3 M☉ nothing can stop collapse and a <strong>black hole</strong> forms. Its event horizon has the <strong>Schwarzschild radius</strong></p>
$$R_s = \frac{2GM}{c^2} \approx 3\ \text{km}\times\frac{M}{M_\odot}.$$
<p>Which remnant forms depends on the initial mass: below ~8 M☉ a white dwarf; ~8–25 M☉ a neutron star; above that usually a black hole, though mass loss complicates the picture.</p>`
      }
    ],
    labs: [
      { sim: 'hrdiagram', params: { stage: 'rg' }, title: 'Stages of a star\'s life', desc: 'Choose a mass and a stage. The big dot shows where the star sits on the HR diagram, with its fate.',
        tasks: ['Follow a 1 M☉ star through all three stages. How do its radius and temperature change?', 'Find the mass above which the end point is a supernova rather than a white dwarf.', 'Compare the lifetimes of 1 M☉ and 20 M☉ stars. Why do massive stars live fast and die young?'] }
    ],
    formulas: [
      ['Jeans mass', R`M_J \approx \left(\dfrac{5kT}{G\mu m_H}\right)^{3/2}\left(\dfrac{3}{4\pi\rho}\right)^{1/2}`],
      ['Free-fall time', R`t_{ff} = \sqrt{3\pi/32G\rho}`],
      ['Triple-alpha', R`3\,{}^4\mathrm{He}\to{}^{12}\mathrm C`],
      ['White dwarf mass–radius', R`R \propto M^{-1/3}`],
      ['Chandrasekhar limit', R`M_{\text{Ch}} \approx 1.4\,M_\odot`],
      ['Schwarzschild radius', R`R_s = 2GM/c^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Why iron', q: R`<p>Why does fusion in a massive star's core stop at iron?</p>`, options: ['Iron is too heavy to move', 'Fusing iron absorbs energy rather than releasing it', 'There is no iron in stars', 'Iron is radioactive'], answer: 1, hints: [R`Binding energy per nucleon.`], solution: R`<p>Iron-56 sits near the peak of the binding-energy curve.</p>` },
      { level: 'concept', type: 'mcq', title: 'Sun\'s fate', q: R`<p>What will the Sun eventually become?</p>`, options: ['A black hole', 'A neutron star', 'A white dwarf inside a planetary nebula', 'A supernova'], answer: 2, hints: [R`It is below 8 M☉.`], solution: R`<p>A red giant, then a planetary nebula and a white dwarf.</p>` },
      { level: 'concept', type: 'mcq', title: 'Degeneracy', q: R`<p>What holds a white dwarf up against gravity?</p>`, options: ['Thermal pressure from fusion', 'Electron degeneracy pressure', 'Radiation pressure', 'Magnetic fields'], answer: 1, hints: [R`Pauli exclusion principle.`], solution: R`<p>Electron degeneracy pressure, which does not need heat.</p>` },
      { level: 'core', type: 'num', title: 'Schwarzschild radius', q: R`<p>Find the Schwarzschild radius of a 10 M☉ black hole, in km.</p>`, answer: 29.5, tol: 0.01, unit: 'km', hints: [R`$2GM/c^2$.`], solution: R`<p>$2\times6.674\times10^{-11}\times1.99\times10^{31}/9\times10^{16} = 29.5$ km.</p>` },
      { level: 'core', type: 'num', title: 'Neutron star density', q: R`<p>A neutron star has 1.4 M☉ and radius 12 km. Find its mean density, in units of 10¹⁷ kg/m³.</p>`, answer: 3.85, tol: 0.01, unit: '×10¹⁷ kg/m³', hints: [R`$M/(\tfrac43\pi R^3)$.`], solution: R`<p>$2.786\times10^{30}/7.24\times10^{12} = 3.85\times10^{17}$ kg/m³: a teaspoon would weigh about 2 billion tonnes.</p>` },
      { level: 'core', type: 'num', title: 'White dwarf radius', q: R`<p>A 0.6 M☉ white dwarf has radius 8700 km. Using $R \propto M^{-1/3}$, estimate the radius of a 1.2 M☉ white dwarf, in km.</p>`, answer: 6905, tol: 0.01, unit: 'km', hints: [R`$8700\times2^{-1/3}$.`], solution: R`<p>6900 km (real ones shrink faster near the Chandrasekhar limit).</p>` },
      { level: 'core', type: 'num', title: 'Free-fall time', q: R`<p>A molecular cloud core has density $10^{-17}$ kg/m³. Find its free-fall time, in thousands of years.</p>`, answer: 666, tol: 0.02, unit: 'kyr', hints: [R`$\sqrt{3\pi/32G\rho}$.`], solution: R`<p>$t = \sqrt{3\pi/(32\times6.674\times10^{-11}\times10^{-17})} = 2.10\times10^{13}$ s $= 666\,000$ years.</p>` },
      { level: 'core', type: 'num', title: 'Supernova distance', q: R`<p>A Type Ia supernova ($M = -19.3$) peaks at $m = 15.7$. How far away is it, in Mpc?</p>`, answer: 100, tol: 0.01, unit: 'Mpc', hints: [R`$m - M = 35$.`], solution: R`<p>$d = 10^{(35 + 5)/5} = 10^8$ pc $= 100$ Mpc.</p>` },
      { level: 'olympiad', type: 'num', title: 'Pulsar spin-up', q: R`<p>A star's core of radius 6000 km rotates once a day. It collapses to a neutron star of radius 12 km, conserving angular momentum. What is the new period, in ms?</p>`, answer: 345.6, tol: 0.01, unit: 'ms', hints: [R`$P \propto R^2$.`], solution: R`<p>$86\,400\ \text{s}\times(12/6000)^2 = 86\,400\times4\times10^{-6} = 0.346$ s $= 346$ ms, a typical young pulsar.</p>` },
      { level: 'olympiad', type: 'num', title: 'Jeans mass', q: R`<p>Find the Jeans mass for a cloud at 10 K with $\rho = 10^{-17}$ kg/m³ and $\mu = 2.3$, in M☉.</p>`, answer: 10.8, tol: 0.03, unit: 'M☉', hints: [R`Use the formula; $m_H = 1.67\times10^{-27}$ kg.`], solution: R`<p>$(5kT/G\mu m_H)^{3/2} = (2.69\times10^{15})^{1.5} = 1.40\times10^{23}$; times $(3/4\pi\rho)^{1/2} = 1.55\times10^8$ gives $2.2\times10^{31}$ kg $= 11\,M_\odot$. Such a clump fragments as it collapses, making several smaller stars.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gravitational energy', q: R`<p>Estimate the energy released, $\sim GM^2/R$, when a 1.4 M☉ core collapses to 12 km, in units of 10⁴⁶ J.</p>`, answer: 4.32, tol: 0.02, unit: '×10⁴⁶ J', hints: [R`Initial radius is so large it can be ignored.`], solution: R`<p>$6.674\times10^{-11}\times(2.79\times10^{30})^2/1.2\times10^4 = 4.3\times10^{46}$ J. About 99% of it escapes as neutrinos; the visible explosion is only about 1%.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-evolution', [
    { title: 'Schwarzschild radius', gen(r) { const M = r.pick([3, 5, 10, 30, 62, 4.3e6, 6.5e9]); return { q: R`<p>Find the Schwarzschild radius of a black hole of ${M.toLocaleString('en-US')} M☉, in km.</p>`, answer: 2.953 * M, tol: 0.01, unit: 'km', solution: R`<p>$2.95\ \text{km}\times${M} = ${f(2.953 * M)}$ km.</p>` }; } },
    { title: 'Spin-up by collapse', gen(r) { const R1 = r.int(1000, 50000), P1 = r.step(1, 60, 1), R2 = r.int(10, 20); const P2 = P1 * 86400 * (R2 / R1) ** 2 * 1000; return { q: R`<p>A core of radius ${R1} km rotating every ${P1} days collapses to ${R2} km, conserving angular momentum. What is the new period, in ms?</p>`, answer: P2, tol: 0.01, unit: 'ms', solution: R`<p>$P_2 = P_1(R_2/R_1)^2 = ${f(P2)}$ ms.</p>` }; } },
    { title: 'Type Ia distance', gen(r) { const m = r.step(10, 24, 0.1); const d = Math.pow(10, (m + 19.3 + 5) / 5) / 1e6; return { q: R`<p>A Type Ia supernova ($M = -19.3$) peaks at apparent magnitude ${f(m)}. How far away is it, in Mpc?</p>`, answer: d, tol: 0.01, unit: 'Mpc', solution: R`<p>$d = 10^{(m - M + 5)/5}$ pc $= ${f(d)}$ Mpc.</p>` }; } }
  ]);
})();
