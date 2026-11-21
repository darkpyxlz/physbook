(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'rotation', num: 6, part: 'Mechanics',
    title: 'Rotational Dynamics',
    subtitle: R`Rigid bodies spin, roll and topple. Moment of inertia, torque, rolling without slipping, statics and the conservation of angular momentum, up to gyroscopic precession.`,
    goals: ['Compute moments of inertia with the axis theorems', 'Apply τ = Iα and static equilibrium', 'Combine translation and rotation for rolling', 'Use conservation of angular momentum', 'Explain gyroscopic precession'],
    sections: [
      {
        title: 'Rotational kinematics',
        html: R`
<p>A rigid body rotating about a fixed axis is described by an angle $\theta$, angular velocity $\omega = \dd\theta/\dd t$ and angular acceleration $\alpha = \dd\omega/\dd t$. A point at distance $r$ from the axis has speed $v = \omega r$, tangential acceleration $a_t = \alpha r$ and centripetal acceleration $\omega^2 r$.</p>
<p>Every linear quantity has a rotational partner:</p>
<div class="table-wrap"><table><thead><tr><th>Linear</th><th>Rotational</th></tr></thead><tbody>
<tr><td>$x,\ v,\ a$</td><td>$\theta,\ \omega,\ \alpha$</td></tr>
<tr><td>mass $m$</td><td>moment of inertia $I$</td></tr>
<tr><td>force $F$</td><td>torque $\tau = rF\sin\phi$</td></tr>
<tr><td>$F = ma$</td><td>$\tau = I\alpha$</td></tr>
<tr><td>$p = mv$</td><td>$L = I\omega$</td></tr>
<tr><td>$K = \tfrac12 mv^2$</td><td>$K = \tfrac12 I\omega^2$</td></tr>
</tbody></table></div>
<p>The constant-acceleration equations carry over directly: $\omega = \omega_0 + \alpha t$, $\theta = \omega_0 t + \tfrac12\alpha t^2$, and so on.</p>`
      },
      {
        title: 'Moment of inertia',
        html: R`
<p>The moment of inertia measures how mass is distributed about the axis: $I = \sum m_ir_i^2 = \int r^2\,\dd m$. Mass far from the axis counts more.</p>
<div class="table-wrap"><table><thead><tr><th>Body (mass $M$)</th><th>Axis</th><th>$I$</th></tr></thead><tbody>
<tr><td>Thin hoop, radius $R$</td><td>Central, perpendicular to plane</td><td>$MR^2$</td></tr>
<tr><td>Solid disc or cylinder</td><td>Central axis</td><td>$\tfrac12 MR^2$</td></tr>
<tr><td>Solid sphere</td><td>Through centre</td><td>$\tfrac25 MR^2$</td></tr>
<tr><td>Thin spherical shell</td><td>Through centre</td><td>$\tfrac23 MR^2$</td></tr>
<tr><td>Thin rod, length $L$</td><td>Through centre, perpendicular</td><td>$\tfrac1{12} ML^2$</td></tr>
<tr><td>Thin rod, length $L$</td><td>Through one end</td><td>$\tfrac13 ML^2$</td></tr>
</tbody></table></div>
<div class="key"><p><strong>Parallel-axis theorem:</strong> $I = I_{\text{cm}} + Md^2$ for an axis parallel to one through the centre of mass at distance $d$.<br><strong>Perpendicular-axis theorem</strong> (flat bodies only): $I_z = I_x + I_y$.</p></div>
<details class="example"><summary><span class="lbl">Worked example</span>Use the perpendicular-axis theorem to find $I$ of a thin disc about a diameter.<span class="tog">Solution</span></summary><div class="sol"><p>$I_z = \tfrac12 MR^2$, and by symmetry $I_x = I_y$. So $I_x = \tfrac14 MR^2$.</p></div></details>`
      },
      {
        title: 'Torque, dynamics and statics',
        html: R`
<p>Torque is the rotational effect of a force: $\vec\tau = \vec r\times\vec F$, with magnitude $rF\sin\phi = F\times(\text{lever arm})$. For rotation about a fixed axis, or about the centre of mass even when it accelerates,</p>
<div class="key">$$\tau_{\text{net}} = I\alpha.$$</div>
<p>A body is in <strong>static equilibrium</strong> when both $\sum\vec F = 0$ and $\sum\vec\tau = 0$. When the net force is zero, the net torque is the same about every point, so pick the point that eliminates the most unknown forces.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A uniform ladder leans against a frictionless wall. Find the minimum angle with the floor before it slips if the floor friction coefficient is $\mu$.<span class="tog">Solution</span></summary><div class="sol"><p>Forces: weight $Mg$ at the middle, floor normal $N_1 = Mg$, floor friction $f$, wall normal $N_2 = f$. Torques about the foot: $N_2 L\sin\theta = Mg\tfrac L2\cos\theta$, so $f = \tfrac12 Mg\cot\theta$. Requiring $f \le \mu Mg$ gives $\tan\theta \ge 1/(2\mu)$.</p></div></details>`
      },
      {
        title: 'Rolling motion',
        html: R`
<p>A wheel of radius $R$ <strong>rolls without slipping</strong> when the contact point is instantaneously at rest: $v_{\text{cm}} = \omega R$ and $a_{\text{cm}} = \alpha R$. Its kinetic energy splits into translation and rotation:</p>
$$K = \tfrac12 Mv^2 + \tfrac12 I\omega^2 = \tfrac12 Mv^2\left(1 + \frac{I}{MR^2}\right).$$
<p>Writing $I = kMR^2$, a body rolling down a slope of angle $\theta$ has</p>
<div class="key">$$a = \frac{g\sin\theta}{1 + k},\qquad v = \sqrt{\frac{2gh}{1+k}}.$$</div>
<p>The result does not depend on mass or radius, only on the shape factor $k$. A solid sphere ($k = 0.4$) beats a disc ($0.5$), which beats a hollow sphere ($0.67$), which beats a hoop ($1$).</p>
<div class="warn-box"><p>Static friction is what makes the body roll, but it does no work when there is no slipping, because the contact point does not move. Energy is still conserved.</p></div>
<p>If a ball is launched sliding (for example, a bowling ball with no initial spin), kinetic friction slows the translation and spins up the rotation until $v = \omega R$. A neat trick: angular momentum about the contact point on the floor is conserved during this phase, because friction acts through that line.</p>`
      },
      {
        title: 'Angular momentum',
        html: R`
<p>Angular momentum of a particle about a point is $\vec L = \vec r\times\vec p$; for a rigid body spinning about a symmetry axis, $\vec L = I\vec\omega$. The rotational form of Newton's second law is</p>
<div class="key">$$\vec\tau_{\text{ext}} = \frac{\dd\vec L}{\dd t}.$$</div>
<p>With no external torque, $\vec L$ is conserved. A figure skater pulling in her arms reduces $I$, so $\omega$ rises. Her kinetic energy $L^2/(2I)$ <em>increases</em>: her muscles do work pulling her arms in.</p>
<h3>Gyroscopic precession</h3>
<p>A spinning top tilted from the vertical feels a gravitational torque $\tau = Mgr$ that is perpendicular to $\vec L$. This changes the direction of $\vec L$ but not its size, so the axis sweeps around the vertical at the precession rate</p>
$$\Omega = \frac{Mgr}{I\omega}.$$
<p>The faster it spins, the slower it precesses.</p>`
      }
    ],
    labs: [
      { sim: 'rolling', title: 'Rolling race', desc: 'Five bodies released together on the same slope. Each lane shows distance along the slope; the readout gives each acceleration and finishing time.',
        tasks: ['Predict the finishing order before pressing Race. Does changing the slope angle change the order?', 'Compute the ratio of hoop time to sphere time from a = g sin θ/(1 + k). Check it against the readout.', 'Why does the frictionless block always win?'] }
    ],
    formulas: [
      ['Moment of inertia', R`I = \int r^2\,\dd m`],
      ['Parallel-axis theorem', R`I = I_{\text{cm}} + Md^2`],
      ['Perpendicular-axis theorem', R`I_z = I_x + I_y`],
      ['Torque', R`\vec\tau = \vec r\times\vec F`],
      ['Rotational second law', R`\tau = I\alpha`],
      ['Rotational kinetic energy', R`K = \tfrac12 I\omega^2`],
      ['Rolling condition', R`v = \omega R`],
      ['Rolling down a slope', R`a = \frac{g\sin\theta}{1 + I/MR^2}`],
      ['Angular momentum', R`\vec L = \vec r\times\vec p = I\vec\omega`],
      ['Torque and L', R`\vec\tau = \dd\vec L/\dd t`],
      ['Precession rate', R`\Omega = Mgr/(I\omega)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Downhill race',
        q: R`<p>A solid sphere, a solid disc, a hollow sphere and a hoop are released together from rest at the top of the same slope and roll without slipping. Which reaches the bottom first?</p>`,
        options: ['Hoop', 'Hollow sphere', 'Solid disc', 'Solid sphere'], answer: 3,
        hints: [R`$a = g\sin\theta/(1 + k)$ with $I = kMR^2$. Smallest $k$ wins.`],
        solution: R`<p>The solid sphere has the smallest $k = 2/5$, so the least energy goes into rotation and it accelerates fastest.</p>` },
      { level: 'concept', type: 'mcq', title: 'Spinning skater',
        q: R`<p>A spinning skater pulls her arms in. What happens to her angular velocity and rotational kinetic energy?</p>`,
        options: ['ω increases, energy is unchanged', 'ω increases, energy increases', 'ω is unchanged, energy increases', 'ω increases, energy decreases'], answer: 1,
        hints: [R`$L = I\omega$ is conserved, and $K = L^2/(2I)$.`],
        solution: R`<p>$I$ falls, so $\omega$ rises to keep $L$ fixed. $K = L^2/(2I)$ rises; the extra energy comes from the work her arms do against the centrifugal tendency.</p>` },
      { level: 'concept', type: 'mcq', title: 'Choosing a pivot',
        q: R`<p>A rigid body is in static equilibrium. About which points is the net torque zero?</p>`,
        options: ['Only about the centre of mass', 'Only about the point where the largest force acts', 'About every point', 'Only about fixed pivots'], answer: 2,
        hints: [R`If $\sum\vec F = 0$, how does the torque change when you move the reference point by $\vec d$?`],
        solution: R`<p>Shifting the reference point by $\vec d$ changes the torque by $-\vec d\times\sum\vec F$, which is zero in equilibrium. So you are free to take torques about whichever point is most convenient.</p>` },
      { level: 'core', type: 'num', title: 'Pulling a disc',
        q: R`<p>A string is wound around a uniform $2.0\ \mathrm{kg}$ disc of radius $0.30\ \mathrm{m}$ that can rotate freely about its fixed axle. A constant $10\ \mathrm{N}$ pull is applied to the string. What is the disc's angular acceleration?</p>`,
        answer: 10 * 0.3 / (0.5 * 2 * 0.09), tol: 0.01, unit: 'rad/s²',
        hints: [R`$I = \tfrac12 MR^2$ and $\tau = FR$.`],
        solution: R`<p>$\alpha = \dfrac{FR}{\tfrac12 MR^2} = \dfrac{3.0}{0.090} = 33.3\ \mathrm{rad/s^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Rolling sphere',
        q: R`<p>A solid ball rolls without slipping from rest down a ramp, dropping a height of $1.5\ \mathrm{m}$. What is its speed at the bottom?</p>`,
        answer: Math.sqrt(10 * 9.8 * 1.5 / 7), tol: 0.01, unit: 'm/s',
        hints: [R`$Mgh = \tfrac12 Mv^2(1 + 2/5)$.`],
        solution: R`<p>$v = \sqrt{10gh/7} = \sqrt{10(9.8)(1.5)/7} = 4.58\ \mathrm{m/s}$, compared with $5.42\ \mathrm{m/s}$ for frictionless sliding.</p>` },
      { level: 'core', type: 'num', title: 'Rod about one end',
        q: R`<p>Find the moment of inertia of a uniform $1.2\ \mathrm{kg}$ rod of length $0.80\ \mathrm{m}$ about an axis through one end, perpendicular to the rod.</p>`,
        answer: 1.2 * 0.64 / 3, tol: 0.01, unit: 'kg m²',
        hints: [R`Parallel-axis theorem: $\tfrac1{12}ML^2 + M(L/2)^2$.`],
        solution: R`<p>$I = \tfrac13 ML^2 = \tfrac13(1.2)(0.64) = 0.256\ \mathrm{kg\,m^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Jumping on',
        q: R`<p>A merry-go-round (a disc with $I = 200\ \mathrm{kg\,m^2}$) spins freely at $1.5\ \mathrm{rad/s}$. A $30\ \mathrm{kg}$ child, initially at rest, steps onto its rim $2.0\ \mathrm{m}$ from the axis. What is the new angular velocity?</p>`,
        answer: 200 * 1.5 / (200 + 30 * 4), tol: 0.01, unit: 'rad/s',
        hints: [R`Angular momentum about the axle is conserved; the child adds $mr^2$ to the moment of inertia.`],
        solution: R`<p>$\omega' = \dfrac{200(1.5)}{200 + 30(2.0)^2} = \dfrac{300}{320} = 0.938\ \mathrm{rad/s}$.</p>` },
      { level: 'core', type: 'num', title: 'Leaning ladder',
        q: R`<p>A uniform ladder rests against a frictionless wall. The coefficient of static friction with the floor is $0.40$. What is the smallest angle the ladder can make with the floor without slipping?</p>`,
        answer: Math.atan(1 / 0.8) * 180 / Math.PI, tol: 0.01, unit: 'degrees',
        hints: [R`Take torques about the foot of the ladder. You should find $\tan\theta_{\min} = 1/(2\mu)$.`],
        solution: R`<p>$\tan\theta_{\min} = \dfrac{1}{2\mu} = 1.25$, so $\theta_{\min} = 51.3^\circ$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Bowling ball',
        q: R`<p>A bowling ball (uniform solid sphere) is launched along the lane at $8.0\ \mathrm{m/s}$ with no spin. Kinetic friction acts until it rolls without slipping. What is its final speed?</p>`,
        answer: 5 / 7 * 8, tol: 0.01, unit: 'm/s',
        hints: [R`Take angular momentum about a fixed point on the floor along the line of motion. Friction and gravity exert no torque about it.`, R`$L = Mv_0R$ initially and $MvR + I\omega$ finally.`],
        solution: R`<p>About a point on the floor: $MRv_0 = MRv + \tfrac25 MR^2(v/R)$, so $v = \tfrac57 v_0 = 5.71\ \mathrm{m/s}$. The result is independent of the friction coefficient, which only sets how long the sliding lasts: $t = 2v_0/(7\mu g)$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gyroscope',
        q: R`<p>A gyroscope's rotor has $I = 0.020\ \mathrm{kg\,m^2}$ and spins at $300\ \mathrm{rad/s}$. The whole gyroscope has mass $1.0\ \mathrm{kg}$, and its centre of mass sits $0.10\ \mathrm{m}$ horizontally from the pivot. What is the precession angular velocity?</p>`,
        answer: 1 * 9.8 * 0.1 / (0.02 * 300), tol: 0.01, unit: 'rad/s',
        hints: [R`The gravitational torque $Mgr$ turns $\vec L$ sideways at rate $\Omega L$.`],
        solution: R`<p>$\tau = \Omega L$ gives $\Omega = \dfrac{Mgr}{I\omega} = \dfrac{0.98}{6.0} = 0.163\ \mathrm{rad/s}$, about one revolution every $38\ \mathrm{s}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Releasing a rod',
        q: R`<p>A uniform $2.0\ \mathrm{kg}$ rod is hinged at one end and held horizontal. It is released from rest. What is the magnitude of the force from the hinge just after release?</p>`,
        answer: 2 * 9.8 / 4, tol: 0.01, unit: 'N',
        hints: [R`Find $\alpha$ from $\tau = I\alpha$ about the hinge, then the acceleration of the centre of mass.`, R`At release $\omega = 0$, so the centre-of-mass acceleration is purely tangential (vertical).`],
        solution: R`<p>$\alpha = \dfrac{Mg\,L/2}{ML^2/3} = \dfrac{3g}{2L}$, so the centre accelerates downward at $a = \alpha L/2 = \tfrac34 g$. Then $Mg - F = M\tfrac34 g$, so $F = \tfrac14 Mg = 4.9\ \mathrm{N}$. The free end accelerates at $\tfrac32 g$, faster than free fall: a coin placed there gets left behind.</p>` }
    ]
  });
})();
