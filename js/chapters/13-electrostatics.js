(function () {
  const R = PB.R;
  const k = 8.988e9;
  PB.addChapter({
    id: 'electrostatics', num: 13, part: 'Electricity & Magnetism',
    title: 'Electrostatics',
    subtitle: R`Charges at rest: Coulomb's law, electric fields, Gauss's law, potential and energy, conductors, and the method of images.`,
    goals: ['Add Coulomb forces and fields as vectors', 'Use Gauss’s law for symmetric charge distributions', 'Move between field and potential', 'Compute electrostatic energy', 'Solve conductor problems with images'],
    sections: [
      {
        title: "Charge and Coulomb's law",
        html: R`
<p>Electric charge comes in two signs, is conserved, and is quantised in units of $e = 1.602\times10^{-19}\ \mathrm C$. Two point charges exert forces along the line joining them:</p>
<div class="key">$$F = \frac{1}{4\pi\varepsilon_0}\frac{|q_1q_2|}{r^2} = k\frac{|q_1q_2|}{r^2},\qquad k = 8.988\times10^9\ \mathrm{N\,m^2\,C^{-2}}.$$</div>
<p>Like charges repel; unlike charges attract. Forces from several charges add as vectors (superposition). The electric force is enormously stronger than gravity: between two protons the ratio is about $10^{36}$.</p>
<p>In <strong>conductors</strong>, some charges move freely; in <strong>insulators</strong> they cannot. A charged rod attracts a neutral scrap of paper by <em>polarising</em> it: the nearer side acquires opposite charge and is pulled more strongly than the far side is pushed.</p>`
      },
      {
        title: 'The electric field',
        html: R`
<p>The field $\vec E$ is the force per unit positive test charge, $\vec F = q\vec E$. For a point charge, $E = kq/r^2$ radially. Useful results for extended distributions (derived by integration or Gauss's law):</p>
<div class="table-wrap"><table><thead><tr><th>Source</th><th>Field</th></tr></thead><tbody>
<tr><td>Infinite line, charge per length $\lambda$</td><td>$\dfrac{\lambda}{2\pi\varepsilon_0 r}$</td></tr>
<tr><td>Infinite plane, charge per area $\sigma$</td><td>$\dfrac{\sigma}{2\varepsilon_0}$, uniform</td></tr>
<tr><td>Ring radius $a$, on axis at distance $z$</td><td>$\dfrac{kQz}{(z^2 + a^2)^{3/2}}$</td></tr>
<tr><td>Dipole $p$, far away on axis</td><td>$\dfrac{2kp}{r^3}$</td></tr>
</tbody></table></div>
<p>Field lines start on positive charges and end on negative ones; their density shows the field strength. A dipole $\vec p$ in a uniform field feels torque $\vec\tau = \vec p\times\vec E$ and has energy $U = -\vec p\cdot\vec E$.</p>`
      },
      {
        title: "Gauss's law and conductors",
        html: R`
<p>The electric flux through any closed surface equals the enclosed charge divided by $\varepsilon_0$:</p>
<div class="key">$$\oint\vec E\cdot\dd\vec A = \frac{Q_{\text{enc}}}{\varepsilon_0}.$$</div>
<p>It is always true, but only <em>useful</em> when symmetry lets you pull $E$ out of the integral: spheres, infinite cylinders and infinite planes.</p>
<details class="example"><summary><span class="lbl">Worked example</span>Find the field inside and outside a uniformly charged solid sphere of radius $R$ and charge $Q$.<span class="tog">Solution</span></summary><div class="sol"><p>Outside: a spherical Gaussian surface encloses all of $Q$, so $E = kQ/r^2$. Inside: it encloses $Q(r/R)^3$, so $E = kQr/R^3$, growing linearly from zero. This is the same shape as gravity inside a uniform planet.</p></div></details>
<h3>Conductors in equilibrium</h3>
<ul>
<li>$\vec E = 0$ everywhere inside the conducting material.</li>
<li>Any net charge sits on the surface.</li>
<li>Just outside, $\vec E$ is perpendicular to the surface with magnitude $\sigma/\varepsilon_0$.</li>
<li>The field inside an empty cavity is zero: a Faraday cage shields its interior.</li>
</ul>`
      },
      {
        title: 'Electric potential and energy',
        html: R`
<p>Because the electric force is conservative, we can define a potential (energy per unit charge), measured in volts:</p>
<div class="key">$$V(\vec r) = -\int_\infty^{\vec r}\vec E\cdot\dd\vec\ell,\qquad \vec E = -\nabla V,\qquad V_{\text{point}} = \frac{kq}{r}.$$</div>
<p>Potentials from several charges simply add as scalars, which is usually easier than adding field vectors. Equipotential surfaces are perpendicular to field lines, and the surface of a conductor is an equipotential.</p>
<p>A charge $q$ moved through a potential difference $\Delta V$ changes its energy by $q\Delta V$. An electron accelerated through $1\ \mathrm V$ gains $1\ \mathrm{eV} = 1.602\times10^{-19}\ \mathrm J$.</p>
<p>The energy to assemble a system of point charges is $U = \sum_{i\lt j}kq_iq_j/r_{ij}$. For continuous distributions, the energy is stored in the field with density $u = \tfrac12\varepsilon_0E^2$.</p>
<div class="insight"><p><strong>Method of images.</strong> A point charge $q$ at distance $d$ from a grounded conducting plane induces surface charge. The field on the charge's side is exactly that of $q$ plus an "image" charge $-q$ at the mirror point, because that pair already makes the plane an equipotential at $V = 0$. The charge is attracted to the plane with force $kq^2/(2d)^2$.</p></div>`
      }
    ],
    labs: [
      { sim: 'efield', title: 'Field lines and equipotentials', desc: 'Click to place charges, drag to move them. Colour shows potential (warm positive, cool negative) with bands marking equipotentials. Hover to probe the field.',
        tasks: ['Load the dipole. Check that field lines always cross equipotential bands at right angles.', 'Load two like charges. Find the point where the field vanishes. Is it stable for a positive test charge?', 'Load +2q and −q. Some field lines from +2q escape to infinity. What fraction, and why?', 'Load the parallel plates. Where is the field most uniform?'] }
    ],
    formulas: [
      ['Coulomb’s law', R`F = kq_1q_2/r^2`],
      ['Field of a point charge', R`E = kq/r^2`],
      ['Gauss’s law', R`\oint\vec E\cdot\dd\vec A = Q_{\text{enc}}/\varepsilon_0`],
      ['Line charge', R`E = \lambda/(2\pi\varepsilon_0r)`],
      ['Plane of charge', R`E = \sigma/(2\varepsilon_0)`],
      ['Outside a conductor', R`E = \sigma/\varepsilon_0`],
      ['Potential of a point charge', R`V = kq/r`],
      ['Field from potential', R`\vec E = -\nabla V`],
      ['Pair energy', R`U = kq_1q_2/r`],
      ['Field energy density', R`u = \tfrac12\varepsilon_0E^2`],
      ['Dipole in a field', R`\vec\tau = \vec p\times\vec E,\ U = -\vec p\cdot\vec E`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Inside a charged shell',
        q: R`<p>A hollow metal sphere carries a net charge. What is the electric field at points inside the hollow?</p>`,
        options: ['Zero', 'Uniform and nonzero', 'Pointing toward the centre', 'Strongest at the centre'], answer: 0,
        hints: [R`Use a Gaussian sphere inside the hollow. How much charge does it enclose?`],
        solution: R`<p>The charge sits on the outer surface; a Gaussian sphere inside encloses nothing, and by symmetry the field must vanish. This is electrostatic shielding.</p>` },
      { level: 'concept', type: 'mcq', title: 'Doubling the distance',
        q: R`<p>The distance between two point charges is doubled. The force between them:</p>`,
        options: ['Halves', 'Falls to a quarter', 'Doubles', 'Is unchanged'], answer: 1,
        hints: [R`Inverse-square law.`],
        solution: R`<p>$F \propto 1/r^2$, so doubling $r$ gives $F/4$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Equipotentials',
        q: R`<p>At every point, equipotential surfaces are:</p>`,
        options: ['Parallel to the electric field', 'Perpendicular to the electric field', 'At 45° to the electric field', 'Unrelated to the field direction'], answer: 1,
        hints: [R`Moving along an equipotential, $\dd V = -\vec E\cdot\dd\vec\ell = 0$.`],
        solution: R`<p>No work is done moving along an equipotential, so the displacement must be perpendicular to $\vec E$.</p>` },
      { level: 'core', type: 'num', title: 'Two charges',
        q: R`<p>Charges of $+3.0\ \mu\mathrm C$ and $-5.0\ \mu\mathrm C$ are $20\ \mathrm{cm}$ apart. What is the magnitude of the force between them?</p>`,
        answer: k * 3e-6 * 5e-6 / 0.04, tol: 0.01, unit: 'N',
        hints: [R`$F = k|q_1q_2|/r^2$ with $r = 0.20\ \mathrm m$.`],
        solution: R`<p>$F = (8.988\times10^9)(15\times10^{-12})/0.040 = 3.37\ \mathrm N$ (attractive).</p>` },
      { level: 'core', type: 'num', title: 'Field between charges',
        q: R`<p>Charges of $+2.0\ \mu\mathrm C$ and $-2.0\ \mu\mathrm C$ are $10\ \mathrm{cm}$ apart. What is the field strength at the midpoint?</p>`,
        answer: 2 * k * 2e-6 / 0.0025, tol: 0.01, unit: 'N/C',
        hints: [R`Both charges produce fields pointing the same way at the midpoint.`],
        solution: R`<p>Each contributes $kq/(0.05)^2 = 7.19\times10^6\ \mathrm{N/C}$ toward the negative charge, totalling $1.44\times10^7\ \mathrm{N/C}$.</p>` },
      { level: 'core', type: 'num', title: 'Electron gun',
        q: R`<p>An electron starts from rest and is accelerated through a potential difference of $500\ \mathrm V$. What is its final speed (non-relativistic)?</p>`,
        answer: Math.sqrt(2 * 1.602e-19 * 500 / 9.109e-31), tol: 0.01, unit: 'm/s',
        hints: [R`$eV = \tfrac12 mv^2$.`],
        solution: R`<p>$v = \sqrt{2eV/m} = \sqrt{\dfrac{2(1.602\times10^{-19})(500)}{9.109\times10^{-31}}} = 1.33\times10^7\ \mathrm{m/s}$, about 4% of $c$, so the classical formula is fine.</p>` },
      { level: 'core', type: 'num', title: 'Line of charge',
        q: R`<p>A long straight wire carries $5.0\ \mathrm{nC/m}$. What is the field $10\ \mathrm{cm}$ from it?</p>`,
        answer: 2 * k * 5e-9 / 0.1, tol: 0.01, unit: 'N/C',
        hints: [R`$E = \lambda/(2\pi\varepsilon_0r) = 2k\lambda/r$.`],
        solution: R`<p>$E = 2(8.988\times10^9)(5.0\times10^{-9})/0.10 = 899\ \mathrm{N/C}$.</p>` },
      { level: 'core', type: 'num', title: 'Assembling a triangle',
        q: R`<p>How much work is needed to bring three charges of $+1.0\ \mu\mathrm C$ from far apart to the corners of an equilateral triangle of side $10\ \mathrm{cm}$?</p>`,
        answer: 3 * k * 1e-12 / 0.1, tol: 0.01, unit: 'J',
        hints: [R`There are three pairs, each contributing $kq^2/a$.`],
        solution: R`<p>$U = 3kq^2/a = 3(8.988\times10^9)(10^{-12})/0.10 = 0.270\ \mathrm J$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Charge near a metal plate',
        q: R`<p>A $1.0\ \mu\mathrm C$ point charge is held $5.0\ \mathrm{cm}$ from a large grounded metal plate. What force does the plate exert on it?</p>`,
        answer: k * 1e-12 / 0.01, tol: 0.01, unit: 'N',
        hints: [R`Replace the plate with an image charge $-q$ at the mirror point.`],
        solution: R`<p>The image is $-q$ at distance $2d = 10\ \mathrm{cm}$ from the real charge. $F = kq^2/(2d)^2 = (8.988\times10^9)(10^{-12})/0.010 = 0.899\ \mathrm N$, attractive.</p>` },
      { level: 'olympiad', type: 'num', title: 'Energy of a charged ball',
        q: R`<p>A total charge of $1.0\ \mu\mathrm C$ is spread uniformly through a solid sphere of radius $10\ \mathrm{cm}$. How much electrostatic energy is stored?</p>`,
        answer: 3 * k * 1e-12 / (5 * 0.1), tol: 0.01, unit: 'J',
        hints: [R`Build the sphere shell by shell: adding $\dd q$ at radius $r$ costs $\dd q\cdot kq(r)/r$.`, R`Or integrate $\tfrac12\varepsilon_0E^2$ over all space, inside and outside.`],
        solution: R`<p>With $q(r) = Q(r/R)^3$ and $\dd q = 3Qr^2\,\dd r/R^3$:</p>$$U = \int_0^R \frac{kq(r)}{r}\,\dd q = \frac{3kQ^2}{R^6}\int_0^R r^4\,\dd r = \frac35\frac{kQ^2}{R} = 0.0539\ \mathrm J.$$<p>The same calculation with gravity gives the binding energy of a star, $\tfrac35 GM^2/R$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Oscillating through a ring',
        q: R`<p>A fixed ring of radius $10\ \mathrm{cm}$ carries charge $+1.0\ \mu\mathrm C$. A small bead of mass $1.0\ \mathrm g$ and charge $-1.0\ \mathrm{nC}$ can slide along the ring's axis. Find the period of small oscillations of the bead about the ring's centre. Ignore gravity.</p>`,
        answer: 2 * Math.PI / Math.sqrt(k * 1e-6 * 1e-9 / (1e-3 * 1e-3)), tol: 0.01, unit: 's',
        hints: [R`On the axis, $E = \dfrac{kQz}{(z^2 + a^2)^{3/2}} \approx \dfrac{kQ}{a^3}z$ for small $z$.`],
        solution: R`<p>The force on the bead is $-\dfrac{kQq}{a^3}z$ for small $z$, so $\omega^2 = \dfrac{kQq}{ma^3} = \dfrac{(8.988\times10^9)(10^{-6})(10^{-9})}{(10^{-3})(10^{-3})} = 8.99\ \mathrm{s^{-2}}$. Then $T = 2\pi/\omega = 2.10\ \mathrm s$. Displacements in the plane of the ring would be unstable, as Earnshaw's theorem requires.</p>` }
    ]
  });
})();
