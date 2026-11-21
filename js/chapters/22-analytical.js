(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'analytical', num: 22, part: 'Olympiad Extensions',
    title: 'Analytical Mechanics',
    subtitle: R`The tools olympiad mechanics problems quietly assume: effective potentials for central forces, the Lagrangian method, symmetries and conservation laws, normal modes, and a first look at chaos.`,
    goals: ['Reduce central-force motion to one dimension', 'Write and solve Euler–Lagrange equations', 'Link symmetries to conserved quantities', 'Find normal modes systematically', 'Recognise chaotic motion'],
    sections: [
      {
        title: 'Central forces and the effective potential',
        html: R`
<p>For a particle in a central potential $U(r)$, angular momentum $L = mr^2\dot\theta$ is conserved. Substituting $\dot\theta = L/(mr^2)$ into the energy turns a two-dimensional problem into a one-dimensional one:</p>
<div class="key">$$E = \tfrac12 m\dot r^2 + U_{\text{eff}}(r),\qquad U_{\text{eff}}(r) = U(r) + \frac{L^2}{2mr^2}.$$</div>
<p>The extra term is the <strong>centrifugal barrier</strong>: it keeps a particle with angular momentum away from the centre. Everything you learned about one-dimensional energy diagrams now applies. Turning points (perihelion and aphelion) are where $E = U_{\text{eff}}$, and a circular orbit sits at the minimum of $U_{\text{eff}}$.</p>
<p>For gravity, $U = -k/r$, the minimum is at $r_0 = L^2/(mk)$. Small radial oscillations about it have the same period as the orbit itself, so the orbit closes: that is why Kepler orbits are ellipses that do not precess.</p>
<div class="insight"><p>To test whether circular orbits in a potential $U \propto r^n$ (force $\propto r^{n-1}$) are stable, check that $U_{\text{eff}}''(r_0) \gt 0$. You will find stability requires $n \gt -2$: inverse-square gravity ($n = -1$) is stable, but an inverse-cube force is not.</p></div>`
      },
      {
        title: 'The Lagrangian method',
        html: R`
<p>Instead of forces, describe a system by <strong>generalised coordinates</strong> $q_i$ (any convenient set: angles, distances along wires) and its <strong>Lagrangian</strong></p>
<div class="key">$$\mathcal L = T - V,\qquad \frac{\dd}{\dd t}\frac{\partial\mathcal L}{\partial\dot q_i} = \frac{\partial\mathcal L}{\partial q_i}.$$</div>
<p>One equation per coordinate, and constraint forces such as normal forces and string tensions never appear. That makes the method ideal for beads on wires, pendulums on moving supports and rolling bodies.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A bead slides on a frictionless circular hoop of radius $R$ that spins at $\omega$ about its vertical diameter. Find its equation of motion.<span class="tog">Solution</span></summary><div class="sol"><p>With $\theta$ measured from the bottom, the bead's speed has a component $R\dot\theta$ along the hoop and $\omega R\sin\theta$ around the axis. So $\mathcal L = \tfrac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta) + mgR\cos\theta$. The Euler–Lagrange equation gives</p>$$R\ddot\theta = \sin\theta\,(\omega^2R\cos\theta - g).$$<p>Besides $\theta = 0$, there is an equilibrium at $\cos\theta_0 = g/(\omega^2R)$, which exists only when $\omega^2 \gt g/R$. Above that critical speed the bottom becomes unstable and the bead climbs to $\theta_0$.</p></div></details>`
      },
      {
        title: 'Symmetries and conservation laws',
        html: R`
<p>If $\mathcal L$ does not depend on a coordinate $q$ (a <strong>cyclic</strong> coordinate), the Euler–Lagrange equation says its conjugate momentum $p = \partial\mathcal L/\partial\dot q$ is constant. This is a special case of <strong>Noether's theorem</strong>: every continuous symmetry gives a conservation law.</p>
<div class="table-wrap"><table><thead><tr><th>Symmetry</th><th>Conserved quantity</th></tr></thead><tbody>
<tr><td>Translation in space</td><td>Linear momentum</td></tr>
<tr><td>Rotation about an axis</td><td>Angular momentum about that axis</td></tr>
<tr><td>Translation in time ($\mathcal L$ has no explicit $t$)</td><td>Energy</td></tr>
</tbody></table></div>
<p>In olympiad problems, finding all the conserved quantities first usually reduces the problem to quadratures (integrals) or a single equation. Look for which directions or rotations leave the setup unchanged.</p>`
      },
      {
        title: 'Normal modes from the Lagrangian',
        html: R`
<p>Near a stable equilibrium, expand to second order in the small displacements $x_i$:</p>
$$T = \tfrac12\sum M_{ij}\dot x_i\dot x_j,\qquad V = \tfrac12\sum K_{ij}x_ix_j.$$
<p>Trying $x_i = a_i\cos\omega t$ leads to the eigenvalue problem</p>
<div class="key">$$\det\left(K - \omega^2 M\right) = 0.$$</div>
<p>Each root gives a normal-mode frequency, and the corresponding $a_i$ give the mode shape. Symmetry usually tells you the shapes in advance: symmetric and antisymmetric combinations.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A linear molecule has masses $m$, $M$, $m$ joined by two springs $k$. Find the longitudinal mode frequencies.<span class="tog">Solution</span></summary><div class="sol"><p>There are three modes. Uniform translation has $\omega = 0$. The symmetric stretch (outer atoms move opposite, centre still) has $\omega = \sqrt{k/m}$. In the antisymmetric stretch the centre atom moves against both outer atoms; momentum conservation fixes the amplitudes and gives $\omega = \sqrt{\dfrac km\left(1 + \dfrac{2m}{M}\right)}$. For $\mathrm{CO_2}$ the ratio of the two vibrational frequencies is about 1.9, close to the measured infrared bands.</p></div></details>`
      },
      {
        title: 'Nonlinear dynamics and chaos',
        html: R`
<p>Most systems are not linear. A pendulum's period grows with amplitude; a double pendulum at large angles is <strong>chaotic</strong>: its motion is deterministic, yet two starting states that differ by $10^{-6}$ radians diverge exponentially, $\delta(t) \approx \delta_0e^{\lambda t}$, where $\lambda$ is the Lyapunov exponent. After a short time, prediction becomes impossible in practice.</p>
<p>Chaos needs at least three dimensions in phase space (or two for a periodically driven system) and nonlinearity. Energy is still conserved; it is the <em>shape</em> of the motion that becomes unpredictable. Weather, dripping taps and planetary orbits over billions of years all show it.</p>
<div class="insight"><p>SYPT and IYPT problems often involve a nonlinear system near a bifurcation, where a small parameter change produces a qualitatively new behaviour (like the bead leaving the bottom of the hoop). Identifying the critical parameter and the dimensionless group that controls it is usually the heart of a strong solution.</p></div>`
      }
    ],
    labs: [
      { sim: 'effpot', title: 'Effective potential explorer', desc: 'The effective potential for gravity (solid) and the bare −1/r potential (dashed), in units with GMm = m = 1. The orange line is the total energy; dots mark turning points.',
        tasks: ['Set the energy to the minimum of the curve. What orbit is that?', 'Raise E above zero. Why is there only one turning point?', 'Halve L. What happens to the circular orbit radius? Check against r₀ = L².'] },
      { sim: 'doublependulum', title: 'Chaos in a double pendulum', desc: 'Two double pendulums (blue and red) start almost identically. Watch how long they stay together.',
        tasks: ['Start both arms at 10°. Do the copies stay together? Why are small swings not chaotic?', 'Start at 120°. Roughly how many seconds until the copies visibly separate?', 'Make the initial difference 100 times smaller. How much longer does it take? (For exponential divergence, only a fixed extra time.)'] }
    ],
    formulas: [
      ['Effective potential', R`U_{\text{eff}} = U(r) + \frac{L^2}{2mr^2}`],
      ['Circular Kepler orbit', R`r_0 = L^2/(mk)`],
      ['Lagrangian', R`\mathcal L = T - V`],
      ['Euler–Lagrange equation', R`\frac{\dd}{\dd t}\frac{\partial\mathcal L}{\partial\dot q} = \frac{\partial\mathcal L}{\partial q}`],
      ['Conjugate momentum', R`p = \partial\mathcal L/\partial\dot q`],
      ['Rotating hoop equilibrium', R`\cos\theta_0 = g/(\omega^2R)`],
      ['Normal modes', R`\det(K - \omega^2M) = 0`],
      ['Exponential divergence', R`\delta(t) \approx \delta_0e^{\lambda t}`],
      ['Foucault precession', R`\Omega = \Omega_E\sin\lambda`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Defining the Lagrangian',
        q: R`<p>For a system with kinetic energy $T$ and potential energy $V$, the Lagrangian is:</p>`,
        options: [R`$T + V$`, R`$T - V$`, R`$V - T$`, R`$\tfrac12(T + V)$`], answer: 1,
        hints: [R`It is not the energy.`],
        solution: R`<p>$\mathcal L = T - V$. The total energy $T + V$ is the Hamiltonian for most simple systems.</p>` },
      { level: 'concept', type: 'mcq', title: 'Cyclic coordinates',
        q: R`<p>A Lagrangian does not depend on the coordinate $\phi$ (though it depends on $\dot\phi$). What follows?</p>`,
        options: [R`$\phi$ is constant`, R`$\dot\phi$ is constant`, R`$\partial\mathcal L/\partial\dot\phi$ is constant`, R`The energy is zero`], answer: 2,
        hints: [R`Put $\partial\mathcal L/\partial\phi = 0$ into the Euler–Lagrange equation.`],
        solution: R`<p>The conjugate momentum $p_\phi = \partial\mathcal L/\partial\dot\phi$ is conserved. For a central force, $\phi$ is the azimuthal angle and $p_\phi$ is angular momentum. $\dot\phi$ itself need not be constant: a planet moves faster at perihelion.</p>` },
      { level: 'concept', type: 'mcq', title: 'Centrifugal barrier',
        q: R`<p>In $U_{\text{eff}} = U(r) + L^2/(2mr^2)$, what does the second term represent?</p>`,
        options: ['The gravitational potential energy', 'The kinetic energy of angular motion, acting as a repulsive barrier', 'Energy lost to friction', 'The radial kinetic energy'], answer: 1,
        hints: [R`$\tfrac12 mr^2\dot\theta^2$ with $\dot\theta = L/(mr^2)$.`],
        solution: R`<p>It is the angular part of the kinetic energy written with conserved $L$. Since it grows as $r\to0$, it behaves like a repulsive potential, the centrifugal barrier.</p>` },
      { level: 'core', type: 'num', title: 'Bead on a spinning hoop',
        q: R`<p>A bead slides on a frictionless hoop of radius $0.20\ \mathrm m$ spinning at $10\ \mathrm{rad/s}$ about its vertical diameter. At what angle from the bottom is it in stable equilibrium?</p>`,
        answer: Math.acos(9.8 / 20) * 180 / Math.PI, tol: 0.005, unit: 'degrees',
        hints: [R`$\cos\theta_0 = g/(\omega^2R)$.`],
        solution: R`<p>$\cos\theta_0 = 9.8/(100 \times 0.20) = 0.49$, so $\theta_0 = 60.7^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'Critical spin',
        q: R`<p>For the hoop of radius $0.20\ \mathrm m$, above what angular speed does the bottom of the hoop stop being a stable position?</p>`,
        answer: Math.sqrt(9.8 / 0.2), tol: 0.01, unit: 'rad/s',
        hints: [R`The off-axis equilibrium appears when $g/(\omega^2R)$ drops below 1.`],
        solution: R`<p>$\omega_c = \sqrt{g/R} = \sqrt{49} = 7.0\ \mathrm{rad/s}$. This is a pitchfork bifurcation.</p>` },
      { level: 'core', type: 'num', title: 'Atwood with a heavy pulley',
        q: R`<p>Masses of $5.0\ \mathrm{kg}$ and $3.0\ \mathrm{kg}$ hang over a pulley of radius $0.10\ \mathrm m$ and moment of inertia $0.020\ \mathrm{kg\,m^2}$, with no slipping. Use the Lagrangian (one coordinate) to find the acceleration.</p>`,
        answer: 2 * 9.8 / (8 + 0.02 / 0.01), tol: 0.01, unit: 'm/s²',
        hints: [R`With $x$ the displacement of the heavier mass: $T = \tfrac12(m_1 + m_2 + I/r^2)\dot x^2$, $V = -(m_1 - m_2)gx$.`],
        solution: R`<p>$a = \dfrac{(m_1 - m_2)g}{m_1 + m_2 + I/r^2} = \dfrac{2(9.8)}{8 + 2} = 1.96\ \mathrm{m/s^2}$. The pulley acts like an extra $2\ \mathrm{kg}$ of inertia.</p>` },
      { level: 'core', type: 'num', title: 'Flung along a rod',
        q: R`<p>A bead sits on a frictionless horizontal rod that rotates at a constant $3.0\ \mathrm{rad/s}$ about a vertical axis through one end. The bead starts at rest relative to the rod, $0.10\ \mathrm m$ from the axis. How far from the axis is it after $1.0\ \mathrm s$?</p>`,
        answer: 0.1 * Math.cosh(3), tol: 0.01, unit: 'm',
        hints: [R`The radial equation is $\ddot r = \omega^2 r$.`],
        solution: R`<p>$\ddot r = \omega^2 r$ with $r(0) = r_0$, $\dot r(0) = 0$ gives $r = r_0\cosh\omega t = 0.10\cosh3 = 1.01\ \mathrm m$. The rod must push sideways on the bead, so its angular momentum is not conserved.</p>` },
      { level: 'core', type: 'num', title: 'Orbit in a harmonic well',
        q: R`<p>A $1.0\ \mathrm{kg}$ particle moves in the plane under $U = \tfrac12 kr^2$ with $k = 4.0\ \mathrm{N/m}$ and angular momentum $L = 3.0\ \mathrm{kg\,m^2/s}$. Find the radius of its circular orbit.</p>`,
        answer: Math.pow(9 / 4, 0.25), tol: 0.01, unit: 'm',
        hints: [R`Minimise $U_{\text{eff}} = \tfrac12 kr^2 + L^2/(2mr^2)$.`],
        solution: R`<p>$U_{\text{eff}}' = kr - L^2/(mr^3) = 0$ gives $r_0 = \left(\dfrac{L^2}{mk}\right)^{1/4} = (9/4)^{1/4} = 1.22\ \mathrm m$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Wobbling on the hoop',
        q: R`<p>For the bead on the hoop ($R = 0.20\ \mathrm m$, $\omega = 10\ \mathrm{rad/s}$), find the angular frequency of small oscillations about its off-axis equilibrium.</p>`,
        answer: 10 * Math.sqrt(1 - 0.49 * 0.49), tol: 0.01, unit: 'rad/s',
        hints: [R`Linearise $R\ddot\theta = \sin\theta(\omega^2R\cos\theta - g)$ about $\theta_0$.`, R`The derivative of the right side at $\theta_0$ is $-\omega^2R\sin^2\theta_0$.`],
        solution: R`<p>Writing $\theta = \theta_0 + \epsilon$: $\ddot\epsilon = -\omega^2\sin^2\theta_0\,\epsilon$, so $\Omega = \omega\sin\theta_0 = 10\sqrt{1 - 0.49^2} = 8.72\ \mathrm{rad/s}$. As $\omega\to\omega_c$ from above, $\Omega\to0$: oscillations near a bifurcation are slow ("critical slowing down").</p>` },
      { level: 'olympiad', type: 'num', title: 'Vibrations of CO₂',
        q: R`<p>Model carbon dioxide as masses $16$ (O), $12$ (C), $16$ (O) in a line joined by identical springs. Find the ratio of the antisymmetric to the symmetric stretching frequency.</p>`,
        answer: Math.sqrt(1 + 32 / 12), tol: 0.01, unit: '',
        hints: [R`Symmetric: $\omega_1 = \sqrt{k/m}$. Antisymmetric: $\omega_3 = \sqrt{(k/m)(1 + 2m/M)}$.`],
        solution: R`<p>$\omega_3/\omega_1 = \sqrt{1 + 2(16)/12} = \sqrt{3.67} = 1.91$. The measured bands are at 1388 and 2349 cm⁻¹, a ratio of 1.69; the difference comes from the simple spring model ignoring bond coupling.</p>` },
      { level: 'olympiad', type: 'num', title: 'Foucault pendulum',
        q: R`<p>A Foucault pendulum's swing plane turns at the rate $\Omega_E\sin\lambda$, where $\Omega_E$ is Earth's rotation rate and $\lambda$ the latitude. How many hours does a full turn take at latitude $52^\circ$? (Sidereal day $= 23.93\ \mathrm h$)</p>`,
        answer: 23.93 / Math.sin(52 * Math.PI / 180), tol: 0.01, unit: 'h',
        hints: [R`Only the vertical component of Earth's angular velocity rotates the swing plane.`],
        solution: R`<p>$T = 23.93/\sin52^\circ = 30.4\ \mathrm h$. At the pole it would be one sidereal day; at the equator the plane would not turn at all. The effect comes from the Coriolis force in Earth's rotating frame.</p>` }
    ]
  });
})();
