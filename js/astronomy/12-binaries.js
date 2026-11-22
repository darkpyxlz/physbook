(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-binaries', subject: 'astronomy', num: 12, part: 'The Stars',
    title: 'Binary Stars and Stellar Masses',
    subtitle: R`Most stars have companions, and binaries are how we weigh stars. Visual, spectroscopic and eclipsing binaries, the mass function, radii from eclipse timing, and interacting binaries.`,
    goals: ['Classify binary stars by how they are detected', 'Find masses of visual binaries from Kepler\'s third law', 'Use radial-velocity curves to find mass ratios and the mass function', 'Find radii from eclipse timing', 'Describe mass transfer and its consequences'],
    sections: [
      {
        title: 'Kinds of binary',
        html: R`
<p>About half of Sun-like stars, and most massive stars, are in multiple systems. They are detected in different ways:</p>
<ul>
<li><strong>Visual binaries</strong>: both stars are resolved and seen to orbit over years or centuries.</li>
<li><strong>Astrometric binaries</strong>: one star wobbles around an unseen companion; this is how Sirius B was predicted (1844) before it was seen.</li>
<li><strong>Spectroscopic binaries</strong>: unresolved, but spectral lines shift back and forth periodically. If lines of both stars are seen it is double-lined.</li>
<li><strong>Eclipsing binaries</strong>: the orbit is nearly edge-on, so the stars block each other and the light curve dips twice per orbit. Algol, the "Demon Star", fades every 2.87 days.</li>
</ul>`
      },
      {
        title: 'Weighing stars',
        html: R`
<p>For a visual binary with angular semi-major axis $\alpha$ (arcsec) and parallax $p$, the true semi-major axis is $a = \alpha/p$ AU, and Kepler's third law gives the total mass:</p>
$$M_1 + M_2 = \frac{a^3}{P^2}\quad(M_\odot,\ \text{AU},\ \text{yr}).$$
<p>Each star orbits the centre of mass, with $M_1a_1 = M_2a_2$, so measuring the two orbits separately gives the mass ratio and then the individual masses.</p>
<p>For a spectroscopic binary with velocity semi-amplitudes $K_1$ and $K_2$ (circular orbits):</p>
$$\frac{M_2}{M_1} = \frac{K_1}{K_2},\qquad (M_1 + M_2)\sin^3 i = \frac{P(K_1 + K_2)^3}{2\pi G}.$$
<p>If only one star's lines are seen, we get the <strong>mass function</strong> $f = \dfrac{(M_2\sin i)^3}{(M_1 + M_2)^2} = \dfrac{PK_1^3}{2\pi G}$, a lower limit on the companion's mass. This is how black holes in X-ray binaries are weighed: Cygnus X-1's unseen companion has over 15 M☉, far above the maximum mass of a neutron star.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Sirius A and B orbit in 50.1 years; the angular semi-major axis is 7.50″ and the parallax 0.379″. Find the total mass.<span class="tog">Solution</span></summary><div class="sol"><p>$a = 7.50/0.379 = 19.8$ AU; $M = 19.8^3/50.1^2 = 7760/2510 = 3.09\,M_\odot$ (actually 2.06 + 1.02).</p></div></details>`
      },
      {
        title: 'Eclipsing binaries',
        html: R`
<p>An eclipsing binary has $i \approx 90^\circ$, so combining its radial velocities with the light curve gives true masses. The eclipse timing gives radii: the smaller star crosses its own diameter between first and second contact, and the larger star's diameter between first and third contact, so with relative speed $v = v_1 + v_2$:</p>
$$2R_s = v(t_2 - t_1),\qquad 2R_\ell = v(t_3 - t_1),$$
<p>where $t_1$, $t_2$ and $t_3$ are the first, second and third contacts of the eclipse. The depths of the two eclipses compare surface brightnesses: the deeper (primary) eclipse occurs when the hotter star is hidden.</p>
<p>Detached eclipsing binaries give stellar masses and radii to 1%, the gold standard that tests models of stellar structure. They also serve as distance indicators.</p>`
      },
      {
        title: 'Close binaries and mass transfer',
        html: R`
<p>Each star is surrounded by a teardrop-shaped <strong>Roche lobe</strong>; gas outside it can flow to the companion. When a star expands into a giant and fills its lobe, mass pours onto the other star, often through an <strong>accretion disc</strong> that glows brightly.</p>
<ul>
<li>The <strong>Algol paradox</strong>: the less massive star is the more evolved one, because it was originally the heavier star and has given much of its mass away.</li>
<li>Accretion onto a white dwarf builds up hydrogen that ignites in a <strong>nova</strong>; if it reaches the Chandrasekhar limit, it explodes as a <strong>Type Ia supernova</strong>.</li>
<li>Accretion onto neutron stars and black holes produces powerful <strong>X-ray binaries</strong>.</li>
<li>Pairs of compact objects spiral together by emitting gravitational waves; LIGO first detected two merging black holes in 2015.</li>
</ul>`
      }
    ],
    labs: [
      { sim: 'binary', title: 'Eclipsing binary', desc: 'The light curve (top) and the radial-velocity curves of both stars (bottom) for a binary with a chosen configuration.',
        tasks: ['Reduce the inclination from 90°. At what angle do the eclipses disappear?', 'Make star 2 hotter than star 1. Which eclipse becomes the primary (deeper) one?', 'Check that K₁/K₂ equals M₂/M₁ for several mass choices.'] }
    ],
    formulas: [
      ['Total mass (visual)', R`M_1 + M_2 = a^3/P^2`],
      ['True separation', R`a = \alpha/p`],
      ['Centre of mass', R`M_1a_1 = M_2a_2`],
      ['Mass ratio', R`M_2/M_1 = K_1/K_2`],
      ['Masses from velocities', R`(M_1 + M_2)\sin^3i = P(K_1 + K_2)^3/2\pi G`],
      ['Mass function', R`f = PK_1^3/2\pi G`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Which type', q: R`<p>A star's spectral lines shift back and forth every 4 days, but no companion is visible. It is…</p>`, options: ['A visual binary', 'A spectroscopic binary', 'An optical double', 'A variable star'], answer: 1, hints: [R`Doppler shifts.`], solution: R`<p>A single-lined spectroscopic binary.</p>` },
      { level: 'concept', type: 'mcq', title: 'Why eclipsing binaries matter', q: R`<p>Why are eclipsing binaries especially valuable?</p>`, options: ['They are the brightest stars', 'Their inclination is known, so true masses and radii can be measured', 'They are always nearby', 'They have no spectral lines'], answer: 1, hints: [R`$\sin i \approx 1$.`], solution: R`<p>Knowing $i \approx 90^\circ$ removes the $\sin i$ ambiguity.</p>` },
      { level: 'concept', type: 'mcq', title: 'Algol paradox', q: R`<p>In Algol, the less massive star is a subgiant and the more massive one is still on the main sequence. How?</p>`, options: ['The stars formed at different times', 'The subgiant was originally more massive and transferred mass to its companion', 'Measurement error', 'The main-sequence star is younger'], answer: 1, hints: [R`Roche lobe overflow.`], solution: R`<p>The originally heavier star evolved first, filled its Roche lobe and gave mass away.</p>` },
      { level: 'core', type: 'num', title: 'Visual binary mass', q: R`<p>A binary has period 80 years, angular semi-major axis 4.0″ and parallax 0.20″. Find the total mass in M☉.</p>`, answer: 1.25, tol: 0.005, unit: 'M☉', hints: [R`$a = 20$ AU.`], solution: R`<p>$8000/6400 = 1.25\,M_\odot$.</p>` },
      { level: 'core', type: 'num', title: 'Mass ratio', q: R`<p>In a double-lined binary, $K_1 = 30$ km/s and $K_2 = 90$ km/s. If the total mass is 4 M☉, what is the mass of star 1?</p>`, answer: 3, tol: 0.002, unit: 'M☉', hints: [R`$M_2/M_1 = 1/3$.`], solution: R`<p>$M_1 = 3$, $M_2 = 1\,M_\odot$.</p>` },
      { level: 'core', type: 'num', title: 'Centre of mass', q: R`<p>Two stars of 2.0 and 0.5 M☉ are 10 AU apart. How far is the heavier star from the centre of mass, in AU?</p>`, answer: 2, tol: 0.002, unit: 'AU', hints: [R`$a_1 = aM_2/(M_1 + M_2)$.`], solution: R`<p>$10\times0.5/2.5 = 2$ AU.</p>` },
      { level: 'core', type: 'num', title: 'Orbit size', q: R`<p>Two Sun-like stars (1 M☉ each) orbit every 10 days. What is their separation, in AU?</p>`, answer: 0.1145, tol: 0.01, unit: 'AU', hints: [R`$a^3 = MP^2$ with $P = 10/365.25$ yr.`], solution: R`<p>$a = (2\times0.02738^2)^{1/3} = 0.115$ AU.</p>` },
      { level: 'core', type: 'num', title: 'Eclipse radius', q: R`<p>In an edge-on binary the relative orbital speed is 150 km/s. The small star takes 2.0 hours to go from first contact to second contact (fully behind the edge). What is its radius, in R☉?</p>`, answer: 0.776, tol: 0.01, unit: 'R☉', hints: [R`$2R_s = v\Delta t$.`], solution: R`<p>$2R_s = 1.5\times10^5\times7200 = 1.08\times10^9$ m, so $R_s = 5.4\times10^8$ m $= 0.78\,R_\odot$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Masses from velocities', q: R`<p>An eclipsing binary ($i = 90^\circ$) has $P = 5.0$ days, $K_1 = 70$ km/s and $K_2 = 105$ km/s. Find the total mass in M☉.</p>`, answer: 2.77, tol: 0.01, unit: 'M☉', hints: [R`$P(K_1 + K_2)^3/2\pi G$.`], solution: R`<p>$4.32\times10^5\times(1.75\times10^5)^3/(2\pi\times6.674\times10^{-11}) = 5.52\times10^{30}$ kg $= 2.77\,M_\odot$, with $M_1 = 1.66$ and $M_2 = 1.11\,M_\odot$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mass function', q: R`<p>Cygnus X-1's visible star has $K_1 = 75$ km/s and $P = 5.6$ days. Find the mass function in M☉.</p>`, answer: 0.245, tol: 0.02, unit: 'M☉', hints: [R`$PK^3/2\pi G$, then divide by $1.99\times10^{30}$.`], solution: R`<p>$f = 4.84\times10^5\times4.22\times10^{14}/4.19\times10^{-10} = 4.87\times10^{29}$ kg $= 0.245\,M_\odot$. With the supergiant's ~40 M☉ and $i \approx 27^\circ$, the companion comes out above 15 M☉.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sirius B', q: R`<p>Sirius A and B are 19.8 AU apart and Sirius A is 6.4 AU from the centre of mass. The total mass is 3.08 M☉. What is the mass of Sirius B?</p>`, answer: 0.996, tol: 0.01, unit: 'M☉', hints: [R`$M_B/M_{\text{tot}} = a_A/a$.`], solution: R`<p>$3.08\times6.4/19.8 = 1.00\,M_\odot$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-binaries', [
    { title: 'Visual binary mass', gen(r) { const al = r.step(0.5, 10, 0.1), p = r.step(0.05, 0.6, 0.01), P = r.step(5, 200, 1); const a = al / p, M = a ** 3 / P ** 2; if (M < 0.2 || M > 50) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>A visual binary has angular semi-major axis ${f(al)}″, parallax ${f(p)}″ and period ${f(P)} years. What is the total mass, in M☉?</p>`, answer: M, tol: 0.01, unit: 'M☉', solution: R`<p>$a = ${f(a)}$ AU; $M = a^3/P^2 = ${f(M)}\,M_\odot$.</p>` }; } },
    { title: 'Mass ratio', gen(r) { const K1 = r.int(10, 150), K2 = r.int(10, 150), M = r.step(1, 20, 0.5); const M1 = M * K2 / (K1 + K2); return { q: R`<p>A binary has $K_1 = ${K1}$ km/s, $K_2 = ${K2}$ km/s and total mass ${f(M)} M☉. What is $M_1$?</p>`, answer: M1, tol: 0.005, unit: 'M☉', solution: R`<p>$M_1 = M\,K_2/(K_1 + K_2) = ${f(M1)}\,M_\odot$.</p>` }; } },
    { title: 'Binary separation', gen(r) { const M = r.step(0.5, 20, 0.5), P = r.step(0.5, 100, 0.5); const a = Math.pow(M * Math.pow(P / 365.25, 2), 1 / 3); return { q: R`<p>Two stars with total mass ${f(M)} M☉ orbit every ${f(P)} days. What is their separation, in AU?</p>`, answer: a, tol: 0.01, unit: 'AU', solution: R`<p>$a = (MP^2)^{1/3} = ${f(a)}$ AU.</p>` }; } }
  ]);
})();
