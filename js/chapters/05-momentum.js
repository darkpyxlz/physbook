(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'momentum', num: 5, part: 'Mechanics',
    title: 'Momentum and Collisions',
    subtitle: R`Impulse, the centre of mass and conservation of momentum. Collisions of every kind, the centre-of-mass frame, and systems whose mass changes, like rockets.`,
    goals: ['Relate impulse to change in momentum', 'Locate and track the centre of mass', 'Solve elastic and inelastic collisions in 1D and 2D', 'Use the centre-of-mass frame', 'Derive the rocket equation'],
    sections: [
      {
        title: 'Momentum and impulse',
        html: R`
<p>Momentum is $\vec p = m\vec v$. Newton's second law in its original form says $\vec F = \dd\vec p/\dd t$. Integrating over the time a force acts gives the <strong>impulse</strong>:</p>
<div class="key">$$\vec J = \int \vec F\,\dd t = \Delta\vec p.$$</div>
<p>During a short impact the force can be huge but brief. The impulse is what matters for the change of velocity, and the average force is $\bar F = \Delta p/\Delta t$. Airbags, crumple zones and bending your knees on landing all work by stretching $\Delta t$ to reduce $\bar F$.</p>`
      },
      {
        title: 'Centre of mass and conservation of momentum',
        html: R`
<p>For a system of particles, the centre of mass is the mass-weighted average position:</p>
$$\vec R_{\text{cm}} = \frac{\sum m_i\vec r_i}{M},\qquad M\vec V_{\text{cm}} = \sum m_i\vec v_i = \vec P_{\text{total}}.$$
<p>Internal forces cancel in pairs by the third law, so only external forces change the total momentum:</p>
<div class="key">$$\vec F_{\text{ext}} = M\vec A_{\text{cm}} = \frac{\dd\vec P}{\dd t}.$$</div>
<p>If the net external force is zero, the total momentum is conserved and the centre of mass moves at constant velocity, no matter how violently the parts interact. A shell that explodes in flight has fragments whose centre of mass continues along the original parabola.</p>
<div class="insight"><p>Momentum can be conserved along one axis even when it is not conserved overall. A block sliding on a wedge on a frictionless floor conserves horizontal momentum, but not vertical momentum, because the floor pushes up.</p></div>`
      },
      {
        title: 'Collisions',
        html: R`
<p>In every collision between isolated bodies, momentum is conserved. Kinetic energy may or may not be.</p>
<ul>
<li><strong>Elastic</strong>: kinetic energy is conserved.</li>
<li><strong>Inelastic</strong>: some kinetic energy becomes heat, sound or deformation.</li>
<li><strong>Perfectly inelastic</strong>: the bodies stick together, losing the most kinetic energy allowed by momentum conservation.</li>
</ul>
<p>The <strong>coefficient of restitution</strong> measures the bounce: $e = \dfrac{\text{speed of separation}}{\text{speed of approach}}$, with $e = 1$ elastic and $e = 0$ sticking. For a head-on collision of $m_1$ (velocity $u_1$) and $m_2$ ($u_2$):</p>
<div class="key">$$v_1 = \frac{m_1u_1 + m_2u_2 - m_2e(u_1 - u_2)}{m_1 + m_2},\qquad v_2 = \frac{m_1u_1 + m_2u_2 + m_1e(u_1 - u_2)}{m_1 + m_2}.$$</div>
<p>Special elastic cases: equal masses exchange velocities; a light ball bouncing off a heavy one at rest reverses; a heavy ball hitting a light one at rest sends it off at nearly twice its own speed.</p>
<h3>The centre-of-mass frame</h3>
<p>In the frame moving with $\vec V_{\text{cm}}$, total momentum is zero, so the two bodies always move in opposite directions with momenta of equal size. An elastic collision simply rotates these momenta without changing their size. The kinetic energy available to be lost is only the part "in" the CM frame, $\tfrac12\mu v_{\text{rel}}^2$ with reduced mass $\mu = m_1m_2/(m_1+m_2)$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>Show that after an elastic glancing collision between equal masses, one initially at rest, the two velocities are perpendicular.<span class="tog">Solution</span></summary><div class="sol"><p>Momentum: $\vec u = \vec v_1 + \vec v_2$. Energy: $u^2 = v_1^2 + v_2^2$. Squaring the first: $u^2 = v_1^2 + v_2^2 + 2\vec v_1\cdot\vec v_2$, so $\vec v_1\cdot\vec v_2 = 0$. Snooker players use this every game.</p></div></details>`
      },
      {
        title: 'Variable mass: rockets and conveyor belts',
        html: R`
<p>A rocket of mass $m$ ejects exhaust at speed $u$ relative to itself. In time $\dd t$ it loses mass $|\dd m|$ and gains speed $\dd v$. Momentum conservation in the rocket's instantaneous rest frame gives $m\,\dd v = -u\,\dd m$, which integrates to the <strong>Tsiolkovsky rocket equation</strong>:</p>
<div class="key">$$\Delta v = u\ln\frac{m_0}{m_f}.$$</div>
<p>The logarithm is brutal: doubling $\Delta v$ requires squaring the mass ratio. That is why orbital rockets use stages.</p>
<div class="warn-box"><p>$F = m\,\dd v/\dd t$ is not valid when mass changes. Use momentum conservation for the whole system, including the mass that is gained or lost, as in the conveyor-belt problem below.</p></div>`
      }
    ],
    labs: [
      { sim: 'collision', title: 'Collision track', desc: 'Two carts on a frictionless track. Set their masses, velocities and the coefficient of restitution, then press Play.',
        tasks: ['Set equal masses, e = 1, and cart 2 at rest. What happens to cart 1?', 'Make m₂ much larger than m₁. How does cart 1 rebound?', 'Turn on the centre-of-mass frame. Check that before and after the collision the carts move in opposite directions.', 'Set e = 0. Is the kinetic energy lost equal to ½μv²rel, with μ = m₁m₂/(m₁+m₂)?'] }
    ],
    formulas: [
      ['Momentum', R`\vec p = m\vec v`],
      ['Impulse', R`\vec J = \int\vec F\,\dd t = \Delta\vec p`],
      ['Centre of mass', R`\vec R_{\text{cm}} = \sum m_i\vec r_i / M`],
      ['External force on a system', R`\vec F_{\text{ext}} = M\vec A_{\text{cm}}`],
      ['Coefficient of restitution', R`e = v_{\text{sep}}/v_{\text{app}}`],
      ['Elastic, target at rest', R`v_2 = \frac{2m_1}{m_1+m_2}u_1`],
      ['Reduced mass', R`\mu = \frac{m_1m_2}{m_1+m_2}`],
      ['KE available in CM frame', R`K_{\text{cm}} = \tfrac12\mu v_{\text{rel}}^2`],
      ['Rocket equation', R`\Delta v = u\ln(m_0/m_f)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Sticking together',
        q: R`<p>Two carts collide and stick together on a frictionless track. Which statement is true?</p>`,
        options: ['Momentum and kinetic energy are both conserved', 'Momentum is conserved but kinetic energy is not', 'Kinetic energy is conserved but momentum is not', 'Neither is conserved'], answer: 1,
        hints: [R`No external horizontal force acts. What happens to the energy during the crumple?`],
        solution: R`<p>With no external force, momentum is conserved in every collision. A perfectly inelastic collision converts some kinetic energy into heat and deformation.</p>` },
      { level: 'concept', type: 'mcq', title: "Newton's cradle",
        q: R`<p>A ball moving at speed $v$ makes a head-on elastic collision with an identical ball at rest. Afterwards:</p>`,
        options: [R`Both move at $v/2$`, R`The first stops and the second moves at $v$`, R`The first bounces back at $v$`, R`Both move at $v/\sqrt2$`], answer: 1,
        hints: [R`Put $m_1 = m_2$ and $e = 1$ into the collision formulas.`],
        solution: R`<p>With equal masses in an elastic head-on collision the velocities are exchanged. Option D would conserve energy but not momentum, and option A would conserve momentum but lose half the energy.</p>` },
      { level: 'concept', type: 'mcq', title: 'Exploding shell',
        q: R`<p>A shell flying on a parabolic path explodes into fragments in mid-air. Ignoring air resistance, what is the path of the fragments' centre of mass after the explosion?</p>`,
        options: ['It stops and falls straight down', 'It continues along the original parabola', 'It moves in a straight line at constant velocity', 'It cannot be predicted without knowing the fragment masses'], answer: 1,
        hints: [R`The explosion forces are internal. What external force still acts?`],
        solution: R`<p>Only gravity acts externally, so $M\vec A_{\text{cm}} = M\vec g$ before and after. The centre of mass continues along the same parabola (until a fragment hits the ground).</p>` },
      { level: 'core', type: 'num', title: 'Hitting a baseball',
        q: R`<p>A $0.15\ \mathrm{kg}$ ball arrives at $40\ \mathrm{m/s}$ and leaves the bat at $50\ \mathrm{m/s}$ in the opposite direction. The contact lasts $1.2\ \mathrm{ms}$. What is the average force on the ball?</p>`,
        answer: 0.15 * 90 / 0.0012, tol: 0.01, unit: 'N',
        hints: [R`The change of velocity is $90\ \mathrm{m/s}$, not $10$.`],
        solution: R`<p>$\Delta p = 0.15(50 - (-40)) = 13.5\ \mathrm{kg\,m/s}$. $\bar F = 13.5/0.0012 = 1.13\times10^4\ \mathrm{N}$, more than a tonne-weight.</p>` },
      { level: 'core', type: 'num', title: 'Ballistic pendulum',
        q: R`<p>A $10\ \mathrm{g}$ bullet embeds itself in a $2.0\ \mathrm{kg}$ wooden block hanging on strings. The block swings up $12\ \mathrm{cm}$. How fast was the bullet moving?</p>`,
        answer: (2.01 / 0.01) * Math.sqrt(2 * 9.8 * 0.12), tol: 0.01, unit: 'm/s',
        hints: [R`Two stages: momentum is conserved in the collision, then energy is conserved in the swing.`],
        solution: R`<p>After the collision, $V = \sqrt{2gh} = \sqrt{2(9.8)(0.12)} = 1.53\ \mathrm{m/s}$. Momentum: $mv = (m + M)V$, so $v = (2.01/0.010)(1.53) = 308\ \mathrm{m/s}$. Energy is <em>not</em> conserved during the impact; more than 99% of the bullet's kinetic energy becomes heat.</p>` },
      { level: 'core', type: 'num', title: 'Elastic kick',
        q: R`<p>A $2.0\ \mathrm{kg}$ cart moving at $3.0\ \mathrm{m/s}$ collides elastically and head-on with a $1.0\ \mathrm{kg}$ cart at rest. What is the speed of the lighter cart afterwards?</p>`,
        answer: 2 * 2 * 3 / 3, tol: 0.01, unit: 'm/s',
        hints: [R`$v_2 = \dfrac{2m_1}{m_1 + m_2}u_1$.`],
        solution: R`<p>$v_2 = \dfrac{2(2.0)}{3.0}(3.0) = 4.0\ \mathrm{m/s}$. The heavy cart continues at $1.0\ \mathrm{m/s}$.</p>` },
      { level: 'core', type: 'num', title: 'Rocket stage',
        q: R`<p>A rocket's exhaust speed is $3000\ \mathrm{m/s}$ and its initial mass is four times its final (empty) mass. What speed does it gain in deep space?</p>`,
        answer: 3000 * Math.log(4), tol: 0.01, unit: 'm/s',
        hints: [R`$\Delta v = u\ln(m_0/m_f)$.`],
        solution: R`<p>$\Delta v = 3000\ln 4 = 4160\ \mathrm{m/s}$. Low Earth orbit needs about $9.4\ \mathrm{km/s}$ including losses, which is why rockets have stages.</p>` },
      { level: 'core', type: 'num', title: 'Bouncing ball',
        q: R`<p>A ball dropped from $2.0\ \mathrm{m}$ rebounds to $1.28\ \mathrm{m}$. What is the coefficient of restitution between ball and floor?</p>`,
        answer: Math.sqrt(1.28 / 2), tol: 0.01, unit: '',
        hints: [R`Speed scales as $\sqrt{h}$.`],
        solution: R`<p>$e = v_{\text{up}}/v_{\text{down}} = \sqrt{1.28/2.0} = 0.80$.</p>` },
      { level: 'olympiad', type: 'num', title: 'The stacked-ball launcher',
        q: R`<p>A $60\ \mathrm{g}$ tennis ball sits on top of a $600\ \mathrm{g}$ basketball. The pair is dropped from $1.0\ \mathrm{m}$ (measured to the bottom of the basketball, treat the balls as small). All collisions are elastic and happen in quick succession: the basketball bounces off the floor and then hits the tennis ball. How high does the tennis ball rise?</p>`,
        answer: Math.pow((3 * 0.6 - 0.06) / 0.66, 2) * 1.0, tol: 0.02, unit: 'm',
        hints: [R`Just before the second collision, the basketball moves up at $v$ and the tennis ball down at $v$, where $v = \sqrt{2gh}$.`, R`Work in the basketball's frame, or use the general elastic formula with $u_1 = -v$ (tennis) and $u_2 = +v$ (basketball).`],
        solution: R`<p>With up positive, the tennis ball (m) has $u_1 = -v$ and the basketball (M) has $u_2 = +v$. Elastic collision:</p>$$v_1 = \frac{(m - M)u_1 + 2Mu_2}{m + M} = \frac{3M - m}{M + m}v = \frac{1.74}{0.66}v = 2.64v.$$<p>Height scales with $v^2$: $h' = (2.64)^2(1.0) = 6.95\ \mathrm{m}$. In the limit $M \gg m$ the factor is $3^2 = 9$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sand on a conveyor',
        q: R`<p>Sand falls vertically at $2.0\ \mathrm{kg/s}$ onto a conveyor belt moving horizontally at a constant $3.0\ \mathrm{m/s}$. What power must the motor supply to keep the belt moving at constant speed?</p>`,
        answer: 2 * 9, tol: 0.01, unit: 'W',
        hints: [R`The belt must supply horizontal momentum to the sand at rate $(\dd m/\dd t)v$.`, R`Power is force × belt speed. Compare it with the rate at which the sand gains kinetic energy.`],
        solution: R`<p>The force needed is $F = (\dd m/\dd t)v = 6.0\ \mathrm{N}$, so the power is $P = Fv = (\dd m/\dd t)v^2 = 18\ \mathrm{W}$. The sand gains kinetic energy at only $\tfrac12(\dd m/\dd t)v^2 = 9\ \mathrm{W}$; the other half is dissipated by friction while the sand slips up to speed, whatever the friction coefficient.</p>` },
      { level: 'olympiad', type: 'num', title: 'Chain on a scale',
        q: R`<p>A uniform $2.0\ \mathrm{kg}$ chain is held vertically with its lower end just touching a scale, then released. What does the scale read at the moment half the chain has landed? ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: 3 * 1 * 9.8, tol: 0.01, unit: 'N',
        hints: [R`The scale supports the weight of the chain already landed plus the force to stop the arriving links.`, R`After falling distance $x$, the links arrive at $v^2 = 2gx$ and at rate $\lambda v$ per second.`],
        solution: R`<p>Landed weight: $\lambda xg$. Stopping force: $(\dd m/\dd t)v = \lambda v^2 = 2\lambda gx$. Total $= 3\lambda gx$, three times the landed weight. At half the chain, $F = 3(1.0\ \mathrm{kg})(9.8) = 29.4\ \mathrm{N}$.</p>` }
    ]
  });
})();
