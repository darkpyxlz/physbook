(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'energy', num: 4, part: 'Mechanics',
    title: 'Work, Energy and Power',
    subtitle: R`Energy bookkeeping is the most powerful shortcut in mechanics. If you can track where the energy goes, you rarely need to solve a differential equation.`,
    goals: ['Compute work for constant and variable forces', 'Apply the work–energy theorem', 'Read potential-energy diagrams', 'Find equilibria and their stability', 'Use power P = F·v'],
    sections: [
      {
        title: 'Work',
        html: R`
<p>A force does work when it acts along a displacement. For a constant force and straight-line displacement, $W = \vec F\cdot\vec d = Fd\cos\theta$. For a varying force along a curved path:</p>
<div class="key">$$W = \int_A^B \vec F\cdot \dd\vec r.$$</div>
<p>Work is positive when the force has a component along the motion and negative when it opposes it. A force perpendicular to the velocity, like the tension in a string swinging a ball in a circle or the magnetic force on a charge, does no work.</p>
<details class="example"><summary><span class="lbl">Worked example</span>How much work does it take to stretch a spring of stiffness $k$ from its natural length by $x$?<span class="tog">Solution</span></summary><div class="sol"><p>You must apply $F = kx'$ at each extension $x'$, so $W = \int_0^x kx'\,\dd x' = \tfrac12 kx^2$. This is the area of the triangle under the $F$–$x$ graph.</p></div></details>`
      },
      {
        title: 'Kinetic energy and the work–energy theorem',
        html: R`
<p>Integrating Newton's second law along the path, using $a\,\dd x = v\,\dd v$, gives the <strong>work–energy theorem</strong>:</p>
<div class="key">$$W_{\text{net}} = \Delta K,\qquad K = \tfrac12 mv^2.$$</div>
<p>It relates speeds at two points without any reference to time. That is exactly what you want when a force varies in a complicated way along the path.</p>
<div class="warn-box"><p>The theorem uses the <em>net</em> work of <em>all</em> forces, including friction and normal forces. Leaving one out is the most common energy mistake.</p></div>`
      },
      {
        title: 'Potential energy and conservative forces',
        html: R`
<p>A force is <strong>conservative</strong> if the work it does between two points does not depend on the path. Gravity, spring forces and electrostatic forces are conservative; friction is not. For a conservative force we define a potential energy $U$ with $W = -\Delta U$, so</p>
<div class="key">$$F_x = -\frac{\dd U}{\dd x}\quad\text{(in 3D: } \vec F = -\nabla U).$$</div>
<p>Common examples: $U = mgh$ near Earth, $U = \tfrac12 kx^2$ for a spring, and $U = -GMm/r$ for gravity at any distance.</p>
<h3>Energy diagrams</h3>
<p>Plot $U(x)$ and draw a horizontal line at the total energy $E$. The body can only be where $E \ge U$, since $K = E - U \ge 0$. <strong>Turning points</strong> are where the line meets the curve. Equilibria are where $\dd U/\dd x = 0$: <strong>minima are stable</strong> and <strong>maxima are unstable</strong>.</p>
<div class="insight"><p>Near any stable minimum $x_0$, Taylor expansion gives $U \approx U(x_0) + \tfrac12 U''(x_0)(x-x_0)^2$. That is a spring with $k_{\text{eff}} = U''(x_0)$, so small oscillations have $\omega = \sqrt{U''(x_0)/m}$. This one idea solves a huge family of olympiad problems.</p></div>`
      },
      {
        title: 'Conservation of energy',
        html: R`
<p>If only conservative forces do work, mechanical energy is conserved: $K + U = \text{const}$. With non-conservative forces such as friction:</p>
<div class="key">$$\Delta K + \Delta U = W_{\text{nc}},$$</div>
<p>where $W_{\text{nc}}$ is usually negative and appears as heat. For kinetic friction on a flat surface, $W_{\text{nc}} = -\mu_k N d$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A bead slides without friction from rest at height $h$ into a vertical loop of radius $R$. What is the minimum $h$ for it to stay on the track at the top?<span class="tog">Solution</span></summary><div class="sol"><p>At the top, the track can only push inward, so $mg + N = mv^2/R$ with $N \ge 0$, requiring $v^2 \ge gR$. Energy: $mgh = mg(2R) + \tfrac12 mv^2 \ge 2mgR + \tfrac12 mgR$, so $h \ge 2.5R$. (A rolling ball needs $h \ge 2.7R$ because some energy goes into rotation; see Chapter 6.)</p></div></details>`
      },
      {
        title: 'Power',
        html: R`
<p>Power is the rate of doing work: $P = \dd W/\dd t$. For a force acting on a moving body,</p>
<div class="key">$$P = \vec F\cdot\vec v.$$</div>
<p>A car climbing a hill at constant speed $v$ needs power $P = (mg\sin\theta + F_{\text{drag}})v$. Because quadratic drag grows as $v^2$, the power to overcome it grows as $v^3$. Doubling your cycling speed takes about eight times the power.</p>
<p>The unit is the watt ($1\ \mathrm{W} = 1\ \mathrm{J/s}$). A fit human can sustain about $100$–$200\ \mathrm{W}$; a car engine delivers around $100\ \mathrm{kW}$.</p>`
      }
    ],
    labs: [
      { sim: 'track', title: 'Energy on a track', desc: 'A bead slides on a curved wire. The bars show kinetic energy, potential energy and energy lost to friction. The dashed line is the current mechanical energy.',
        tasks: ['Set friction to zero and release the bead. Confirm that the total bar stays constant and the bead returns to its release height.', 'On the double well, find the lowest release point that still lets the bead cross the central hump.', 'Add friction. Where does the bead finally settle? Is it always the deepest minimum?'] }
    ],
    formulas: [
      ['Work', R`W = \int \vec F\cdot \dd\vec r`],
      ['Kinetic energy', R`K = \tfrac12 mv^2`],
      ['Work–energy theorem', R`W_{\text{net}} = \Delta K`],
      ['Gravitational PE (near Earth)', R`U = mgh`],
      ['Spring PE', R`U = \tfrac12 kx^2`],
      ['Force from potential', R`F_x = -\dd U/\dd x`],
      ['Energy with friction', R`\Delta K + \Delta U = W_{\text{nc}}`],
      ['Small oscillations', R`\omega = \sqrt{U''(x_0)/m}`],
      ['Power', R`P = \vec F\cdot\vec v`],
      ['Loop-the-loop (sliding)', R`h_{\min} = \tfrac52 R`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Work in a circle',
        q: R`<p>A ball on a string moves in a horizontal circle at constant speed. How much work does the string tension do in one revolution?</p>`,
        options: ['Zero', R`$T \times 2\pi r$`, R`$\tfrac12 mv^2$`, 'It depends on the speed'], answer: 0,
        hints: [R`What is the angle between the tension and the velocity?`],
        solution: R`<p>The tension is always perpendicular to the velocity, so $\vec F\cdot\dd\vec r = 0$ at every instant. Consistently, the kinetic energy does not change.</p>` },
      { level: 'concept', type: 'mcq', title: 'Stable equilibrium',
        q: R`<p>On a graph of potential energy $U(x)$, where is a particle in <em>stable</em> equilibrium?</p>`,
        options: [R`Where $U$ is largest`, R`Where $U$ has a local minimum`, R`Where $U = 0$`, R`Where $\dd U/\dd x$ is largest`], answer: 1,
        hints: [R`At equilibrium $F = -\dd U/\dd x = 0$. Displace slightly: does the force push back?`],
        solution: R`<p>At a minimum, displacing the particle in either direction creates a force back toward the minimum. At a maximum, the force pushes it further away.</p>` },
      { level: 'concept', type: 'mcq', title: 'Up or down',
        q: R`<p>From the top of a building, one ball is thrown straight up and an identical ball is thrown straight down with the same speed. Ignoring air resistance, how do their speeds compare when they hit the ground?</p>`,
        options: ['The ball thrown down is faster', 'The ball thrown up is faster', 'They are equally fast', 'It depends on the height'], answer: 2,
        hints: [R`Both start with the same kinetic energy and the same potential energy.`],
        solution: R`<p>Energy conservation gives $v_f^2 = v_0^2 + 2gh$ for both, regardless of direction. The ball thrown up takes longer but arrives with the same speed.</p>` },
      { level: 'core', type: 'num', title: 'Spring launcher',
        q: R`<p>A spring with $k = 400\ \mathrm{N/m}$ is compressed by $15\ \mathrm{cm}$ and launches a $0.20\ \mathrm{kg}$ block along a frictionless horizontal surface. What is the block's speed?</p>`,
        answer: 0.15 * Math.sqrt(400 / 0.2), tol: 0.01, unit: 'm/s',
        hints: [R`$\tfrac12 kx^2 = \tfrac12 mv^2$.`],
        solution: R`<p>$v = x\sqrt{k/m} = 0.15\sqrt{2000} = 6.71\ \mathrm{m/s}$.</p>` },
      { level: 'core', type: 'num', title: 'Loop-the-loop',
        q: R`<p>A small block slides without friction down a ramp into a vertical loop of radius $0.80\ \mathrm{m}$. What is the minimum starting height (above the bottom of the loop) for the block to complete the loop?</p>`,
        answer: 2.5 * 0.8, tol: 0.01, unit: 'm',
        hints: [R`At the top of the loop, gravity alone must at least supply the centripetal force.`],
        solution: R`<p>$h_{\min} = 2.5R = 2.0\ \mathrm{m}$.</p>` },
      { level: 'core', type: 'num', title: 'Hill climb',
        q: R`<p>A $1200\ \mathrm{kg}$ car climbs an $8.0^\circ$ slope at a steady $25\ \mathrm{m/s}$. Ignoring friction and drag, what power must the engine deliver, in kilowatts?</p>`,
        answer: 1200 * 9.8 * Math.sin(8 * Math.PI / 180) * 25 / 1000, tol: 0.01, unit: 'kW',
        hints: [R`At constant speed, the engine force balances $mg\sin\theta$. Then $P = Fv$.`],
        solution: R`<p>$P = mg\sin\theta\, v = 1200(9.8)(0.139)(25) = 40.9\ \mathrm{kW}$.</p>` },
      { level: 'core', type: 'num', title: 'Variable force',
        q: R`<p>A force $F(x) = 3x^2 + 4$ (in newtons, with $x$ in metres) pushes a body along the $x$-axis from $x = 0$ to $x = 2\ \mathrm{m}$. How much work does it do?</p>`,
        answer: 16, tol: 0.01, unit: 'J',
        hints: [R`$W = \int_0^2 (3x^2 + 4)\,\dd x$.`],
        solution: R`<p>$W = [x^3 + 4x]_0^2 = 8 + 8 = 16\ \mathrm{J}$.</p>` },
      { level: 'core', type: 'num', title: 'Rough slope',
        q: R`<p>A $2.0\ \mathrm{kg}$ sled starts from rest at the top of a straight slope $5.0\ \mathrm{m}$ long and $3.0\ \mathrm{m}$ high. The coefficient of kinetic friction is $0.25$. What is its speed at the bottom?</p>`,
        answer: Math.sqrt(2 * 9.8 * (3 - 0.25 * 0.8 * 5)), tol: 0.01, unit: 'm/s',
        hints: [R`$\cos\theta = 4/5$. Friction work is $\mu mg\cos\theta \times L$.`],
        solution: R`<p>$\tfrac12 mv^2 = mgh - \mu mg\cos\theta\,L$, so $v^2 = 2(9.8)(3.0 - 0.25\times0.8\times5.0) = 39.2$ and $v = 6.26\ \mathrm{m/s}$. The mass cancels.</p>` },
      { level: 'olympiad', type: 'num', title: 'Leaving the dome',
        q: R`<p>A small block starts from rest at the very top of a smooth, fixed hemisphere and slides down its outer surface. At what angle from the vertical (measured from the centre) does it lose contact?</p>`,
        answer: Math.acos(2 / 3) * 180 / Math.PI, tol: 0.005, unit: 'degrees',
        hints: [R`Radial equation: $mg\cos\theta - N = mv^2/R$. The block leaves when $N = 0$.`, R`Energy gives $v^2 = 2gR(1 - \cos\theta)$.`],
        solution: R`<p>Setting $N = 0$: $g\cos\theta = v^2/R = 2g(1 - \cos\theta)$, so $\cos\theta = 2/3$ and $\theta = 48.2^\circ$. Remarkably, the answer is independent of $g$, $R$ and $m$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Chain off the table',
        q: R`<p>A uniform chain of length $1.2\ \mathrm{m}$ lies on a frictionless table with $0.30\ \mathrm{m}$ hanging over the edge. It is released from rest. How fast is it moving when the last link leaves the table?</p>`,
        answer: Math.sqrt(9.8 * (1.44 - 0.09) / 1.2), tol: 0.01, unit: 'm/s',
        hints: [R`Track the centre of mass of the hanging part. A hanging length $x$ of mass $\lambda x$ has its centre at depth $x/2$.`, R`$U(x) = -\tfrac12\lambda g x^2$.`],
        solution: R`<p>With mass per length $\lambda$, the hanging part has potential energy $-\tfrac12\lambda g x^2$. Energy conservation from $x = a$ to $x = L$:</p>$$\tfrac12(\lambda L)v^2 = \tfrac12\lambda g(L^2 - a^2)\;\Rightarrow\; v = \sqrt{\frac{g(L^2 - a^2)}{L}} = \sqrt{\frac{9.8(1.44 - 0.09)}{1.2}} = 3.32\ \mathrm{m/s}.$$` },
      { level: 'olympiad', type: 'num', title: 'Oscillating in a double well',
        q: R`<p>A $0.10\ \mathrm{kg}$ particle moves in the potential $U(x) = U_0\left(\dfrac{x^4}{a^4} - \dfrac{2x^2}{a^2}\right)$ with $U_0 = 2.0\ \mathrm{J}$ and $a = 0.50\ \mathrm{m}$. Find the period of small oscillations about the minimum at $x = a$.</p>`,
        answer: 2 * Math.PI / Math.sqrt(8 * 2 / (0.1 * 0.25)), tol: 0.01, unit: 's',
        hints: [R`Compute $U''(a)$ and use $\omega = \sqrt{U''(a)/m}$.`],
        solution: R`<p>$U'' = U_0\left(\dfrac{12x^2}{a^4} - \dfrac{4}{a^2}\right)$, so $U''(a) = 8U_0/a^2 = 64\ \mathrm{N/m}$. Then $\omega = \sqrt{64/0.10} = 25.3\ \mathrm{rad/s}$ and $T = 2\pi/\omega = 0.248\ \mathrm{s}$.</p>` }
    ]
  });
})();
