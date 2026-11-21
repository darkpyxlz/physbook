(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'oscillations', num: 8, part: 'Mechanics',
    title: 'Oscillations',
    subtitle: R`Simple harmonic motion is everywhere: springs, pendulums, circuits, atoms. Learn to spot it, solve it, damp it, drive it to resonance and couple it into normal modes.`,
    goals: ['Recognise SHM and find ω from any restoring force', 'Analyse simple and physical pendulums', 'Describe damping regimes and Q', 'Predict resonance amplitude and phase', 'Find normal modes of coupled oscillators'],
    sections: [
      {
        title: 'Simple harmonic motion',
        html: R`
<p>Any system with a restoring force proportional to displacement obeys</p>
<div class="key">$$\ddot x = -\omega^2 x\quad\Rightarrow\quad x(t) = A\cos(\omega t + \phi).$$</div>
<p>The amplitude $A$ and phase $\phi$ are fixed by initial conditions; the angular frequency $\omega$ is fixed by the system. For a mass on a spring, $\omega = \sqrt{k/m}$, and the period $T = 2\pi/\omega$ does not depend on amplitude.</p>
<p>Velocity and acceleration follow by differentiation: $v = -A\omega\sin(\omega t + \phi)$ and $a = -\omega^2 x$. Speed is greatest at equilibrium; acceleration is greatest at the turning points. Energy sloshes between kinetic and potential with a constant total:</p>
$$E = \tfrac12 kA^2 = \tfrac12 mv^2 + \tfrac12 kx^2\quad\Rightarrow\quad v = \omega\sqrt{A^2 - x^2}.$$
<p>Springs combine like capacitors: in parallel $k = k_1 + k_2$; in series $1/k = 1/k_1 + 1/k_2$.</p>`
      },
      {
        title: 'Pendulums and small oscillations',
        html: R`
<p>A simple pendulum of length $\ell$ obeys $\ddot\theta = -(g/\ell)\sin\theta$. For small angles $\sin\theta\approx\theta$, giving SHM with</p>
<div class="key">$$T = 2\pi\sqrt{\ell/g}.$$</div>
<p>A <strong>physical pendulum</strong> (any rigid body swinging about a pivot a distance $d$ from its centre of mass) has $I\ddot\theta = -Mgd\,\theta$, so $T = 2\pi\sqrt{I/(Mgd)}$.</p>
<div class="insight"><p>The general recipe for small oscillations: write the energy as $E = \tfrac12 m_{\text{eff}}\dot q^2 + U(q)$ in a single coordinate $q$, then $\omega^2 = U''(q_0)/m_{\text{eff}}$. For a ball rolling in a bowl, rotational kinetic energy simply increases $m_{\text{eff}}$. This energy method beats force diagrams for most olympiad oscillation problems.</p></div>
<p>At larger amplitudes the pendulum slows down: $T \approx T_0\left(1 + \theta_0^2/16\right)$. At $30^\circ$ the correction is under 2%.</p>`
      },
      {
        title: 'Damped oscillations',
        html: R`
<p>Adding linear damping $-b\dot x$ gives $\ddot x + \gamma\dot x + \omega_0^2x = 0$ with $\gamma = b/m$. Three regimes follow:</p>
<ul>
<li><strong>Underdamped</strong> ($\gamma \lt 2\omega_0$): $x = Ae^{-\gamma t/2}\cos(\omega_d t + \phi)$ with $\omega_d = \sqrt{\omega_0^2 - \gamma^2/4}$.</li>
<li><strong>Critically damped</strong> ($\gamma = 2\omega_0$): returns to equilibrium fastest without overshooting. Car suspensions and door closers aim for this.</li>
<li><strong>Overdamped</strong> ($\gamma \gt 2\omega_0$): creeps back slowly.</li>
</ul>
<p>The <strong>quality factor</strong> $Q = \omega_0/\gamma$ counts how many radians of oscillation happen as the energy falls by a factor $e$. The amplitude decays as $e^{-\gamma t/2}$, so it falls to $1/e$ after a time $2/\gamma = 2Q/\omega_0$. A tuning fork has $Q\sim10^3$; a quartz crystal, $\sim10^5$.</p>`
      },
      {
        title: 'Driven oscillations and resonance',
        html: R`
<p>Drive a damped oscillator with force $F_0\cos\omega t$. After transients die away, it oscillates at the <em>driving</em> frequency with amplitude and phase lag</p>
<div class="key">$$A(\omega) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + \gamma^2\omega^2}},\qquad \tan\delta = \frac{\gamma\omega}{\omega_0^2 - \omega^2}.$$</div>
<p>Below resonance the mass follows the drive in phase. At $\omega = \omega_0$ it lags by $90^\circ$ and the drive pumps in energy most efficiently. Far above resonance it moves opposite to the drive ($180^\circ$ lag) with small amplitude. The resonance peak has width $\Delta\omega\approx\gamma$, so high-$Q$ systems are sharply tuned.</p>`
      },
      {
        title: 'Coupled oscillators and normal modes',
        html: R`
<p>Two identical pendulums joined by a weak spring have two <strong>normal modes</strong>, patterns in which everything oscillates at one frequency:</p>
<ul>
<li>In phase (spring never stretched): $\omega_1 = \sqrt{g/\ell}$.</li>
<li>Out of phase (spring stretched both ways): $\omega_2 = \sqrt{g/\ell + 2k/m}$.</li>
</ul>
<p>Any motion is a superposition of normal modes. Start one pendulum swinging and the other at rest, and the energy transfers back and forth between them: the two modes beat against each other, with complete transfer after time $\pi/(\omega_2 - \omega_1)$.</p>
<div class="insight"><p>To find normal modes, guess that every coordinate oscillates as $e^{i\omega t}$, write the equations as a matrix, and require the determinant to vanish. Symmetry usually lets you guess the mode shapes directly.</p></div>`
      }
    ],
    labs: [
      { sim: 'oscillator', title: 'Driven, damped oscillator', desc: 'A mass on a spring with natural frequency 1 Hz. The top plot shows displacement (blue) and the driving force (faint orange); the bottom plot is the steady-state resonance curve.',
        tasks: ['Set the drive strength to zero and press Kick. Raise γ until the mass returns without overshooting. Theory says this happens at γ = 2ω₀ = 4π ≈ 12.6 /s.', 'With small damping, sweep the drive frequency slowly through 1.0. How does the phase between force and displacement change?', 'Halve γ. How does the peak height change? How does its width change?'] }
    ],
    formulas: [
      ['SHM equation', R`\ddot x = -\omega^2 x`],
      ['Mass on spring', R`\omega = \sqrt{k/m}`],
      ['Simple pendulum', R`T = 2\pi\sqrt{\ell/g}`],
      ['Physical pendulum', R`T = 2\pi\sqrt{I/(Mgd)}`],
      ['Speed in SHM', R`v = \omega\sqrt{A^2 - x^2}`],
      ['Springs in series', R`1/k = 1/k_1 + 1/k_2`],
      ['Damped frequency', R`\omega_d = \sqrt{\omega_0^2 - \gamma^2/4}`],
      ['Quality factor', R`Q = \omega_0/\gamma`],
      ['Driven amplitude', R`A = \frac{F_0/m}{\sqrt{(\omega_0^2-\omega^2)^2 + \gamma^2\omega^2}}`],
      ['Energy method', R`\omega^2 = U''(q_0)/m_{\text{eff}}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Pendulum on the Moon',
        q: R`<p>A pendulum clock is taken from Earth to the Moon. Its period:</p>`,
        options: ['Gets shorter', 'Gets longer', 'Stays the same', 'Depends on the mass of the bob'], answer: 1,
        hints: [R`$T = 2\pi\sqrt{\ell/g}$ and $g_{\text{Moon}} \approx g/6$.`],
        solution: R`<p>Smaller $g$ means a longer period, by a factor $\sqrt6 \approx 2.45$. The clock runs slow.</p>` },
      { level: 'concept', type: 'mcq', title: 'Where is it fastest?',
        q: R`<p>For a mass in simple harmonic motion, which statement is correct?</p>`,
        options: ['Speed and acceleration are both largest at the turning points', 'Speed is largest at equilibrium; acceleration is largest at the turning points', 'Speed is largest at the turning points; acceleration is largest at equilibrium', 'Both are largest at equilibrium'], answer: 1,
        hints: [R`$a = -\omega^2 x$ and $v = \omega\sqrt{A^2 - x^2}$.`],
        solution: R`<p>At equilibrium $x = 0$, so $a = 0$ and the speed is $A\omega$. At the turning points $v = 0$ and $|a| = \omega^2 A$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Driving fast',
        q: R`<p>An oscillator with natural frequency $\omega_0$ is driven at $\omega \gg \omega_0$. In the steady state, its displacement is:</p>`,
        options: ['In phase with the driving force', '90° behind the driving force', 'Nearly 180° out of phase with the driving force', 'Unpredictable'], answer: 2,
        hints: [R`Look at $\tan\delta = \gamma\omega/(\omega_0^2 - \omega^2)$ when $\omega \gg \omega_0$.`],
        solution: R`<p>The denominator becomes large and negative, so $\delta\to180^\circ$. At high frequency the mass's inertia dominates, and it moves opposite to the force with small amplitude.</p>` },
      { level: 'core', type: 'num', title: 'Spring frequency',
        q: R`<p>A $0.50\ \mathrm{kg}$ mass hangs from a spring with $k = 200\ \mathrm{N/m}$. What is its oscillation frequency in hertz?</p>`,
        answer: Math.sqrt(400) / (2 * Math.PI), tol: 0.01, unit: 'Hz',
        hints: [R`$f = \dfrac{1}{2\pi}\sqrt{k/m}$. Gravity only shifts the equilibrium.`],
        solution: R`<p>$f = \dfrac{1}{2\pi}\sqrt{400} = 3.18\ \mathrm{Hz}$.</p>` },
      { level: 'core', type: 'num', title: 'Swinging rod',
        q: R`<p>A uniform $1.0\ \mathrm{m}$ rod swings about a pivot at one end. Find its period for small oscillations.</p>`,
        answer: 2 * Math.PI * Math.sqrt(2 / (3 * 9.8)), tol: 0.01, unit: 's',
        hints: [R`$I = \tfrac13 ML^2$ and $d = L/2$.`],
        solution: R`<p>$T = 2\pi\sqrt{\dfrac{ML^2/3}{MgL/2}} = 2\pi\sqrt{\dfrac{2L}{3g}} = 1.64\ \mathrm{s}$. It matches a simple pendulum of length $2L/3$.</p>` },
      { level: 'core', type: 'num', title: 'Speed partway',
        q: R`<p>A $0.50\ \mathrm{kg}$ mass on a spring with $k = 50\ \mathrm{N/m}$ oscillates with amplitude $10\ \mathrm{cm}$. What is its speed when it is $6.0\ \mathrm{cm}$ from equilibrium?</p>`,
        answer: 10 * Math.sqrt(0.01 - 0.0036), tol: 0.01, unit: 'm/s',
        hints: [R`$\omega = \sqrt{k/m} = 10\ \mathrm{rad/s}$.`],
        solution: R`<p>$v = \omega\sqrt{A^2 - x^2} = 10\sqrt{0.10^2 - 0.06^2} = 0.80\ \mathrm{m/s}$.</p>` },
      { level: 'core', type: 'num', title: 'Ringing down',
        q: R`<p>An oscillator with natural frequency $2.0\ \mathrm{Hz}$ has quality factor $Q = 50$. How long does it take for its amplitude to fall to $1/e$ of its initial value?</p>`,
        answer: 2 * 50 / (2 * Math.PI * 2), tol: 0.01, unit: 's',
        hints: [R`The amplitude decays as $e^{-\gamma t/2}$ with $\gamma = \omega_0/Q$.`],
        solution: R`<p>$\gamma = \omega_0/Q = 4\pi/50 = 0.251\ \mathrm{s^{-1}}$. The amplitude reaches $1/e$ at $t = 2/\gamma = 2Q/\omega_0 = 7.96\ \mathrm{s}$, about 16 oscillations.</p>` },
      { level: 'core', type: 'num', title: 'Springs in series',
        q: R`<p>Springs of stiffness $100\ \mathrm{N/m}$ and $300\ \mathrm{N/m}$ are joined end to end and support a $3.0\ \mathrm{kg}$ mass. What is the period of vertical oscillations?</p>`,
        answer: 2 * Math.PI * Math.sqrt(3 / 75), tol: 0.01, unit: 's',
        hints: [R`In series, the same tension acts in both springs and the extensions add.`],
        solution: R`<p>$k = \left(\tfrac1{100} + \tfrac1{300}\right)^{-1} = 75\ \mathrm{N/m}$, so $T = 2\pi\sqrt{3/75} = 1.26\ \mathrm{s}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sympathetic pendulums',
        q: R`<p>Two identical pendulums ($\ell = 1.0\ \mathrm{m}$, $m = 0.20\ \mathrm{kg}$) are joined by a light spring with $k = 0.50\ \mathrm{N/m}$. One is pulled aside and released while the other hangs at rest. How long until all the motion has transferred to the second pendulum? ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: Math.PI / (Math.sqrt(9.8 + 5) - Math.sqrt(9.8)), tol: 0.01, unit: 's',
        hints: [R`Normal modes: $\omega_1 = \sqrt{g/\ell}$ and $\omega_2 = \sqrt{g/\ell + 2k/m}$.`, R`$x_1 \propto \cos\frac{(\omega_2-\omega_1)t}{2}\cos\frac{(\omega_2+\omega_1)t}{2}$, so the first pendulum stops when the slow envelope reaches zero.`],
        solution: R`<p>$\omega_1 = 3.130\ \mathrm{rad/s}$ and $\omega_2 = \sqrt{9.8 + 5.0} = 3.847\ \mathrm{rad/s}$. Starting from one displaced pendulum, $x_1 = A\cos\tfrac{\Delta\omega t}{2}\cos\bar\omega t$, $x_2 = A\sin\tfrac{\Delta\omega t}{2}\sin\bar\omega t$. Pendulum 1 is first at rest when $\Delta\omega\,t/2 = \pi/2$:</p>$$t = \frac{\pi}{\omega_2 - \omega_1} = \frac{\pi}{0.717} = 4.38\ \mathrm{s}.$$` },
      { level: 'olympiad', type: 'num', title: 'Marble in a bowl',
        q: R`<p>A small solid marble of radius $5.0\ \mathrm{cm}$ rolls without slipping inside a spherical bowl of radius $50\ \mathrm{cm}$. Find the period of small oscillations about the bottom.</p>`,
        answer: 2 * Math.PI * Math.sqrt(7 * 0.45 / (5 * 9.8)), tol: 0.01, unit: 's',
        hints: [R`The marble's centre moves on a circle of radius $R - r$. Let $\phi$ be the angle of that circle.`, R`Rolling: $v = (R - r)\dot\phi$ and the marble spins at $v/r$. Total kinetic energy is $\tfrac12\cdot\tfrac75 mv^2$.`],
        solution: R`<p>With $v = (R-r)\dot\phi$: $E = \tfrac{7}{10}m(R-r)^2\dot\phi^2 + mg(R-r)(1 - \cos\phi)$. For small $\phi$, this is SHM with</p>$$\omega^2 = \frac{mg(R-r)}{\tfrac75 m(R-r)^2} = \frac{5g}{7(R-r)},\qquad T = 2\pi\sqrt{\frac{7(0.45)}{5(9.8)}} = 1.59\ \mathrm{s}.$$` },
      { level: 'olympiad', type: 'num', title: 'Sloshing U-tube',
        q: R`<p>Liquid fills a U-tube of uniform cross-section. The total length of the liquid column is $40\ \mathrm{cm}$. If the levels are displaced and released, what is the period of oscillation? Ignore viscosity.</p>`,
        answer: 2 * Math.PI * Math.sqrt(0.4 / (2 * 9.8)), tol: 0.01, unit: 's',
        hints: [R`If one surface rises by $x$, the other falls by $x$, and the height difference is $2x$.`, R`The restoring force acts on the whole column of mass $\rho AL$.`],
        solution: R`<p>Restoring force: $-\rho g A(2x)$. Mass in motion: $\rho AL$. So $\omega^2 = 2g/L$ and $T = 2\pi\sqrt{L/(2g)} = 2\pi\sqrt{0.40/19.6} = 0.898\ \mathrm{s}$. The density and cross-section cancel.</p>` }
    ]
  });
})();
