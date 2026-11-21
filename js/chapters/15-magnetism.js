(function () {
  const R = PB.R;
  const mu0 = 4 * Math.PI * 1e-7;
  PB.addChapter({
    id: 'magnetism', num: 15, part: 'Electricity & Magnetism',
    title: 'Magnetic Fields and Forces',
    subtitle: R`Moving charges feel magnetic forces and create magnetic fields. Cyclotron motion, forces on currents, the Biot–Savart law and Ampère's law.`,
    goals: ['Apply F = qv × B and the right-hand rule', 'Analyse circular and helical motion of charges', 'Compute forces and torques on currents', 'Find fields with Biot–Savart and Ampère', 'Explain velocity selectors and mass spectrometers'],
    sections: [
      {
        title: 'Force on a moving charge',
        html: R`
<p>A charge moving through a magnetic field $\vec B$ (measured in tesla) feels the <strong>Lorentz force</strong>. Including an electric field:</p>
<div class="key">$$\vec F = q\left(\vec E + \vec v\times\vec B\right).$$</div>
<p>The magnetic part is perpendicular to the velocity, so it <strong>never does work</strong>: it changes the direction of motion but not the speed. A charge moving perpendicular to a uniform field travels in a circle:</p>
$$qvB = \frac{mv^2}{r}\quad\Rightarrow\quad r = \frac{mv}{qB},\qquad \omega_c = \frac{qB}{m}.$$
<p>The cyclotron frequency $\omega_c$ does not depend on speed, which is what makes the cyclotron accelerator work. A velocity component along $\vec B$ is unaffected, so the general path is a helix.</p>
<p>In crossed fields, a charge drifts sideways at $v_d = E/B$ in the direction of $\vec E\times\vec B$, whatever its charge or mass. A <strong>velocity selector</strong> uses this: only particles with $v = E/B$ pass straight through.</p>`
      },
      {
        title: 'Force and torque on currents',
        html: R`
<p>A current is many moving charges, so a straight wire of length $L$ carrying current $I$ in a field $\vec B$ feels</p>
<div class="key">$$\vec F = I\vec L\times\vec B.$$</div>
<p>On a closed loop in a uniform field the net force is zero, but there is a torque. A flat coil of $N$ turns and area $A$ has <strong>magnetic moment</strong> $\vec\mu = NI\vec A$ (direction by the right-hand rule around the current), and</p>
$$\vec\tau = \vec\mu\times\vec B,\qquad U = -\vec\mu\cdot\vec B.$$
<p>This torque turns electric motors and the needles of analogue meters. The <strong>Hall effect</strong>, a sideways voltage across a current-carrying strip in a field, reveals the sign and density of charge carriers.</p>`
      },
      {
        title: 'Magnetic fields from currents',
        html: R`
<p>The <strong>Biot–Savart law</strong> gives the field of a small current element:</p>
<div class="key">$$\dd\vec B = \frac{\mu_0}{4\pi}\frac{I\,\dd\vec\ell\times\hat r}{r^2},\qquad \mu_0 = 4\pi\times10^{-7}\ \mathrm{T\,m/A}.$$</div>
<p>Integrating gives the standard results:</p>
<div class="table-wrap"><table><thead><tr><th>Source</th><th>Field</th></tr></thead><tbody>
<tr><td>Long straight wire, distance $r$</td><td>$\dfrac{\mu_0 I}{2\pi r}$, circling the wire</td></tr>
<tr><td>Centre of a circular loop of radius $R$</td><td>$\dfrac{\mu_0 I}{2R}$</td></tr>
<tr><td>Finite straight segment</td><td>$\dfrac{\mu_0 I}{4\pi d}(\sin\theta_1 + \sin\theta_2)$</td></tr>
<tr><td>Loop, on axis at distance $z$</td><td>$\dfrac{\mu_0 IR^2}{2(R^2 + z^2)^{3/2}}$</td></tr>
</tbody></table></div>
<p>Two parallel wires carrying currents $I_1$ and $I_2$ a distance $d$ apart attract (same direction) or repel (opposite) with force per length $\dfrac{\mu_0I_1I_2}{2\pi d}$.</p>`
      },
      {
        title: "Ampère's law",
        html: R`
<p>For steady currents, the line integral of $\vec B$ around any closed loop equals $\mu_0$ times the current threading the loop:</p>
<div class="key">$$\oint\vec B\cdot\dd\vec\ell = \mu_0 I_{\text{enc}}.$$</div>
<p>Like Gauss's law, it is always true but only useful with high symmetry. Applications:</p>
<ul>
<li>Long straight wire: $B(2\pi r) = \mu_0I$ recovers $B = \mu_0I/(2\pi r)$.</li>
<li>Long solenoid with $n$ turns per metre: uniform field $B = \mu_0nI$ inside and almost zero outside.</li>
<li>Toroid with $N$ turns: $B = \mu_0NI/(2\pi r)$ inside the core.</li>
</ul>
<p>Magnetic field lines never begin or end: $\oint\vec B\cdot\dd\vec A = 0$. There are no magnetic monopoles, as far as anyone has found.</p>
<div class="insight"><p>Superposition plus symmetry handles awkward shapes. The field inside a cylindrical hole drilled off-centre through a current-carrying wire is <em>uniform</em>: treat it as a full wire plus a wire of opposite current filling the hole, and add their fields.</p></div>`
      }
    ],
    labs: [
      { sim: 'bfield', title: 'Charges in E and B fields', desc: 'A charge moves in the plane. B points out of (•) or into (×) the screen; E points along the screen’s vertical. Units are scaled so that q/m = ±1.',
        tasks: ['With E = 0, double the speed. The radius doubles, but does the period change?', 'Flip the charge sign. Which way does it now circle?', 'Turn on a small E field. The particle drifts sideways at E/B. Does the drift direction depend on the sign of the charge?', 'Start the particle at rest with E on. Describe the cycloid it traces.'] }
    ],
    formulas: [
      ['Lorentz force', R`\vec F = q(\vec E + \vec v\times\vec B)`],
      ['Cyclotron radius', R`r = mv/(qB)`],
      ['Cyclotron frequency', R`\omega_c = qB/m`],
      ['E×B drift', R`v_d = E/B`],
      ['Force on a wire', R`\vec F = I\vec L\times\vec B`],
      ['Torque on a loop', R`\vec\tau = \vec\mu\times\vec B,\ \mu = NIA`],
      ['Biot–Savart', R`\dd\vec B = \frac{\mu_0}{4\pi}\frac{I\dd\vec\ell\times\hat r}{r^2}`],
      ['Long wire', R`B = \mu_0I/(2\pi r)`],
      ['Loop centre', R`B = \mu_0I/(2R)`],
      ['Parallel wires', R`F/L = \mu_0I_1I_2/(2\pi d)`],
      ['Ampère’s law', R`\oint\vec B\cdot\dd\vec\ell = \mu_0I_{\text{enc}}`],
      ['Solenoid', R`B = \mu_0nI`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'No work done',
        q: R`<p>A charged particle moves through a region containing only a static magnetic field. Its kinetic energy:</p>`,
        options: ['Increases', 'Decreases', 'Stays constant', 'Oscillates'], answer: 2,
        hints: [R`$\vec F\cdot\vec v = q(\vec v\times\vec B)\cdot\vec v$.`],
        solution: R`<p>The magnetic force is always perpendicular to the velocity, so it does no work and the speed is constant.</p>` },
      { level: 'concept', type: 'mcq', title: 'Parallel currents',
        q: R`<p>Two long parallel wires carry currents in the same direction. They:</p>`,
        options: ['Attract each other', 'Repel each other', 'Exert no force on each other', 'Twist to become perpendicular'], answer: 0,
        hints: [R`Find the field of wire 1 at wire 2, then apply $\vec F = I\vec L\times\vec B$.`],
        solution: R`<p>Parallel currents attract and antiparallel currents repel, the opposite of the rule for like charges. This force once defined the ampere.</p>` },
      { level: 'concept', type: 'mcq', title: 'Which way?',
        q: R`<p>An electron moves due east through a horizontal magnetic field pointing due north. The magnetic force on it points:</p>`,
        options: ['Up', 'Down', 'West', 'South'], answer: 1,
        hints: [R`With east = $\hat x$, north = $\hat y$, up = $\hat z$: $\hat x\times\hat y = \hat z$. Then remember the electron's charge is negative.`],
        solution: R`<p>$\vec v\times\vec B$ points up, but $q = -e$ flips it: the force points down.</p>` },
      { level: 'core', type: 'num', title: 'Proton orbit',
        q: R`<p>A proton moves at $2.0\times10^6\ \mathrm{m/s}$ perpendicular to a $0.50\ \mathrm T$ field. Find the radius of its path.</p>`,
        answer: 1.673e-27 * 2e6 / (1.602e-19 * 0.5), tol: 0.01, unit: 'm',
        hints: [R`$r = mv/(qB)$.`],
        solution: R`<p>$r = \dfrac{(1.673\times10^{-27})(2.0\times10^6)}{(1.602\times10^{-19})(0.50)} = 0.0418\ \mathrm m$.</p>` },
      { level: 'core', type: 'num', title: 'Field near a wire',
        q: R`<p>A long straight wire carries $10\ \mathrm A$. What is the magnetic field $5.0\ \mathrm{cm}$ away?</p>`,
        answer: mu0 * 10 / (2 * Math.PI * 0.05), tol: 0.01, unit: 'T',
        hints: [R`$B = \mu_0I/(2\pi r)$; note $\mu_0/2\pi = 2\times10^{-7}$.`],
        solution: R`<p>$B = (2\times10^{-7})(10)/0.050 = 4.0\times10^{-5}\ \mathrm T$, comparable to Earth's field.</p>` },
      { level: 'core', type: 'num', title: 'Solenoid',
        q: R`<p>A solenoid $0.50\ \mathrm m$ long has $1000$ turns and carries $2.0\ \mathrm A$. Find the field inside.</p>`,
        answer: mu0 * 2000 * 2, tol: 0.01, unit: 'T',
        hints: [R`$n = N/L$.`],
        solution: R`<p>$B = \mu_0nI = (4\pi\times10^{-7})(2000)(2.0) = 5.03\times10^{-3}\ \mathrm T$.</p>` },
      { level: 'core', type: 'num', title: 'Force between wires',
        q: R`<p>Two long parallel wires $10\ \mathrm{cm}$ apart carry $20\ \mathrm A$ and $30\ \mathrm A$. What is the force per metre on each?</p>`,
        answer: 2e-7 * 600 / 0.1, tol: 0.01, unit: 'N/m',
        hints: [R`$F/L = \mu_0I_1I_2/(2\pi d)$.`],
        solution: R`<p>$F/L = (2\times10^{-7})(20)(30)/0.10 = 1.2\times10^{-3}\ \mathrm{N/m}$.</p>` },
      { level: 'core', type: 'num', title: 'Motor torque',
        q: R`<p>A rectangular coil of 100 turns and area $0.010\ \mathrm{m^2}$ carries $0.50\ \mathrm A$ in a $0.20\ \mathrm T$ field. What is the maximum torque on it?</p>`,
        answer: 100 * 0.5 * 0.01 * 0.2, tol: 0.01, unit: 'N m',
        hints: [R`$\tau_{\max} = NIAB$, when the field lies in the plane of the coil.`],
        solution: R`<p>$\tau_{\max} = (100)(0.50)(0.010)(0.20) = 0.10\ \mathrm{N\,m}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mass spectrometer',
        q: R`<p>Singly charged carbon-12 ions ($m = 12 \times 1.6605\times10^{-27}\ \mathrm{kg}$) pass straight through a velocity selector with $E = 1.0\times10^4\ \mathrm{V/m}$ and $B = 0.10\ \mathrm T$. They then enter a region of uniform field $B' = 0.10\ \mathrm T$ and travel a semicircle before hitting a detector. How far from the entry slit do they land?</p>`,
        answer: 2 * 12 * 1.6605e-27 * 1e5 / (1.602e-19 * 0.1), tol: 0.01, unit: 'm',
        hints: [R`The selector passes only $v = E/B$.`, R`They land one diameter, $2r$, from the slit.`],
        solution: R`<p>$v = E/B = 1.0\times10^5\ \mathrm{m/s}$. $r = \dfrac{mv}{qB'} = \dfrac{(1.993\times10^{-26})(10^5)}{(1.602\times10^{-19})(0.10)} = 0.124\ \mathrm m$, so they land $2r = 0.249\ \mathrm m$ away. Carbon-13 would land 8% farther.</p>` },
      { level: 'olympiad', type: 'num', title: 'Square loop',
        q: R`<p>A square loop of wire with side $0.20\ \mathrm m$ carries $5.0\ \mathrm A$. Find the magnetic field at its centre.</p>`,
        answer: 2 * Math.SQRT2 * mu0 * 5 / (Math.PI * 0.2), tol: 0.01, unit: 'T',
        hints: [R`Each side is a finite segment at distance $d = a/2$ from the centre, subtending $\pm45^\circ$.`, R`$B_{\text{side}} = \dfrac{\mu_0I}{4\pi d}(\sin45^\circ + \sin45^\circ)$.`],
        solution: R`<p>Each side gives $\dfrac{\mu_0I}{4\pi(a/2)}\sqrt2$, and the four sides add: $B = \dfrac{2\sqrt2\,\mu_0I}{\pi a} = 2.83\times10^{-5}\ \mathrm T$. A circular loop of the same perimeter would give slightly less.</p>` },
      { level: 'olympiad', type: 'num', title: 'Helical path',
        q: R`<p>A proton enters a uniform $0.10\ \mathrm T$ field at $1.0\times10^6\ \mathrm{m/s}$, with its velocity at $30^\circ$ to the field direction. Find the pitch of its helical path (the distance it advances along $\vec B$ per revolution).</p>`,
        answer: 2 * Math.PI * 1.673e-27 * 1e6 * Math.cos(Math.PI / 6) / (1.602e-19 * 0.1), tol: 0.01, unit: 'm',
        hints: [R`The period $2\pi m/(qB)$ does not depend on speed.`, R`Pitch $= v_\parallel \times T$.`],
        solution: R`<p>$T = 2\pi m/(qB) = 6.56\times10^{-7}\ \mathrm s$ and $v_\parallel = v\cos30^\circ = 8.66\times10^5\ \mathrm{m/s}$. Pitch $= v_\parallel T = 0.568\ \mathrm m$. Charged particles from the Sun spiral along Earth's field lines this way to make the aurora.</p>` }
    ]
  });
})();
