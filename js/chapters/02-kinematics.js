(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'kinematics', num: 2, part: 'Mechanics',
    title: 'Kinematics',
    subtitle: R`Describing motion without asking what causes it: position, velocity and acceleration in one and two dimensions, projectiles, relative motion and circular motion.`,
    goals: ['Move between x(t), v(t) and a(t) with calculus and graphs', 'Use the constant-acceleration equations', 'Solve projectile problems, including from a height', 'Add velocities between frames', 'Describe uniform and non-uniform circular motion'],
    sections: [
      {
        title: 'Position, velocity and acceleration',
        html: R`
<p>Kinematics describes motion with three functions of time. Position $x(t)$ tells you where the object is. Velocity is the rate of change of position, and acceleration is the rate of change of velocity:</p>
$$v = \frac{\dd x}{\dd t},\qquad a = \frac{\dd v}{\dd t} = \frac{\dd^2 x}{\dd t^2}.$$
<p>Going the other way, you integrate: $\Delta x = \int v\,\dd t$ is the <strong>area under the velocity–time graph</strong>, and $\Delta v = \int a\,\dd t$ is the area under the acceleration–time graph. On an $x$–$t$ graph, velocity is the slope; on a $v$–$t$ graph, acceleration is the slope.</p>
<div class="warn-box"><p>Speed is the magnitude of velocity. Average speed (distance ÷ time) and the magnitude of average velocity (|displacement| ÷ time) differ whenever the motion reverses direction. A runner completing one lap of a track has zero average velocity.</p></div>
<p>A useful trick when acceleration depends on position rather than time is the chain rule:</p>
$$a = \frac{\dd v}{\dd t} = \frac{\dd v}{\dd x}\frac{\dd x}{\dd t} = v\frac{\dd v}{\dd x}\quad\Rightarrow\quad \int a\,\dd x = \tfrac12 v^2 + \text{const}.$$
<p>This is the seed of the work–energy theorem you will meet in Chapter 4.</p>`
      },
      {
        title: 'Motion with constant acceleration',
        html: R`
<p>When $a$ is constant, integrating twice gives the standard set of equations. With initial velocity $u$ (or $v_0$), final velocity $v$, displacement $s$ and time $t$:</p>
<div class="key">$$v = u + at,\qquad s = ut + \tfrac12 at^2,\qquad v^2 = u^2 + 2as,\qquad s = \tfrac12(u+v)t.$$</div>
<p>Each equation leaves out one of the five variables, so choose the one that omits the quantity you neither know nor want.</p>
<h3>Free fall</h3>
<p>Near Earth's surface and ignoring air resistance, every object falls with the same acceleration $g \approx 9.8\ \mathrm{m/s^2}$ downward, whatever its mass. Pick a sign convention (for example, up is positive so $a = -g$) and stick with it.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A ball is thrown upward at $15\ \mathrm{m/s}$ from the edge of a $20\ \mathrm{m}$ cliff. When does it hit the ground below?<span class="tog">Solution</span></summary><div class="sol"><p>Take up as positive with the origin at the launch point. The ground is at $s = -20\ \mathrm{m}$: $-20 = 15t - 4.9t^2$, so $4.9t^2 - 15t - 20 = 0$ and $t = \dfrac{15 + \sqrt{225 + 392}}{9.8} = 4.06\ \mathrm{s}$. The negative root corresponds to an earlier time the parabola "would have" passed that height.</p></div></details>`
      },
      {
        title: 'Projectile motion',
        html: R`
<p>In two dimensions, the key fact is that <strong>horizontal and vertical motions are independent</strong>. With no air resistance, the horizontal velocity is constant and the vertical motion is free fall:</p>
$$x = v_0\cos\theta\; t,\qquad y = v_0\sin\theta\; t - \tfrac12 g t^2.$$
<p>Eliminating $t$ gives a parabola, $y = x\tan\theta - \dfrac{g x^2}{2v_0^2\cos^2\theta}$. On level ground:</p>
<div class="key">$$\text{time of flight } T = \frac{2v_0\sin\theta}{g},\qquad \text{range } R = \frac{v_0^2\sin 2\theta}{g},\qquad \text{max height } H = \frac{v_0^2\sin^2\theta}{2g}.$$</div>
<p>The range is largest at $\theta = 45^\circ$, and complementary angles ($30^\circ$ and $60^\circ$) give the same range.</p>
<div class="insight"><p>To find the <em>minimum launch speed</em> to reach a point $(d, h)$, or the set of all reachable points, write the trajectory as a quadratic in $\tan\theta$ using $1/\cos^2\theta = 1 + \tan^2\theta$:</p>$$\frac{g d^2}{2v_0^2}\tan^2\theta - d\tan\theta + \left(h + \frac{g d^2}{2v_0^2}\right) = 0.$$<p>A real angle exists only if the discriminant is non-negative. Setting it to zero gives the boundary of the reachable region, the <strong>safety parabola</strong> $y = \dfrac{v_0^2}{2g} - \dfrac{g x^2}{2v_0^2}$, and the minimum speed $v_{\min}^2 = g\left(h + \sqrt{h^2 + d^2}\right)$.</p></div>
<p>Air resistance breaks the symmetry. The descent is steeper than the ascent, the range shrinks and the best launch angle drops below $45^\circ$. Try it in the lab.</p>`
      },
      {
        title: 'Relative motion',
        html: R`
<p>Velocities measured in different frames add as vectors. If $\vec v_{A/G}$ is the velocity of $A$ relative to the ground and $\vec v_{G/B}$ is the velocity of the ground relative to $B$:</p>
$$\vec v_{A/B} = \vec v_{A/G} + \vec v_{G/B}.$$
<p>(The subscripts "cancel" like fractions.) This classical rule fails near the speed of light; see Chapter 19.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A swimmer can move at $1.0\ \mathrm{m/s}$ relative to the water, and the river flows at $0.6\ \mathrm{m/s}$. In which direction must she swim to cross straight to the opposite bank?<span class="tog">Solution</span></summary><div class="sol"><p>Her upstream component must cancel the current: $1.0\sin\phi = 0.6$, so $\phi = 36.9^\circ$ upstream of straight across. Her speed across is $1.0\cos\phi = 0.8\ \mathrm{m/s}$. (If she only wants to cross as <em>fast</em> as possible, she should aim straight across and accept the drift.)</p></div></details>
<div class="insight"><p>Changing frames often turns a hard problem into an easy one. Two objects in free fall have zero relative acceleration, so in the frame of one, the other moves in a straight line at constant velocity. A "monkey and hunter" problem becomes trivial: aim directly at the monkey.</p></div>`
      },
      {
        title: 'Circular motion',
        html: R`
<p>An object moving in a circle of radius $r$ at constant speed $v$ is accelerating, because the direction of its velocity changes. The acceleration points to the centre:</p>
<div class="key">$$a_c = \frac{v^2}{r} = \omega^2 r,\qquad v = \omega r,\qquad T = \frac{2\pi r}{v} = \frac{2\pi}{\omega}.$$</div>
<p>If the speed also changes, there is a tangential component $a_t = \dd v/\dd t$, and the total acceleration has magnitude $\sqrt{a_c^2 + a_t^2}$.</p>
<h3>Polar coordinates</h3>
<p>For general planar motion with $\vec r = r\hat r$, the velocity and acceleration are</p>
$$\vec v = \dot r\,\hat r + r\dot\theta\,\hat\theta,\qquad \vec a = (\ddot r - r\dot\theta^2)\,\hat r + (r\ddot\theta + 2\dot r\dot\theta)\,\hat\theta.$$
<p>The $-r\dot\theta^2$ term is the centripetal acceleration and $2\dot r\dot\theta$ is the Coriolis term. These are the natural coordinates for orbits (Chapter 7).</p>`
      }
    ],
    labs: [
      { sim: 'projectile', title: 'Projectile launcher', desc: 'Launch a ball with and without quadratic air drag. The dashed curve is the drag-free parabola; solid trails are your launches.',
        tasks: ['With no drag on level ground, launch at 30° and 60°. Do the ranges match? Which flight takes longer?', 'Raise the launch height to 15 m. Is 45° still the best angle? (Theory: the best angle is below 45°.)', 'Turn the drag up to 0.02. Find the angle that now gives maximum range.', 'Switch to the Moon. By what factor does the range grow, and why exactly that factor?'] }
    ],
    formulas: [
      ['Velocity', R`v = \dd x/\dd t`],
      ['Constant acceleration', R`v = u + at`],
      ['Displacement', R`s = ut + \tfrac12 at^2`],
      ['Timeless equation', R`v^2 = u^2 + 2as`],
      ['Projectile range', R`R = v_0^2\sin2\theta/g`],
      ['Projectile max height', R`H = v_0^2\sin^2\theta/2g`],
      ['Minimum speed to reach (d, h)', R`v_{\min}^2 = g\left(h + \sqrt{h^2+d^2}\right)`],
      ['Centripetal acceleration', R`a_c = v^2/r = \omega^2 r`],
      ['Relative velocity', R`\vec v_{A/B} = \vec v_{A/C} + \vec v_{C/B}`],
      ['Polar acceleration', R`\vec a = (\ddot r - r\dot\theta^2)\hat r + (r\ddot\theta + 2\dot r\dot\theta)\hat\theta`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'At the top',
        q: R`<p>A ball is thrown straight up. At the highest point of its flight (no air resistance):</p>`,
        options: ['Velocity is zero and acceleration is zero', 'Velocity is zero and acceleration is g downward', 'Velocity is g downward and acceleration is zero', 'Both velocity and acceleration point downward'], answer: 1,
        hints: [R`Gravity does not switch off at the top. If the acceleration were zero there, would the ball ever come back down?`],
        solution: R`<p>The velocity passes through zero as it changes from upward to downward, but the acceleration is $g$ downward throughout the flight.</p>` },
      { level: 'concept', type: 'mcq', title: 'Reading a graph',
        q: R`<p>On a velocity–time graph, what does the area between the curve and the time axis represent?</p>`,
        options: ['Acceleration', 'Displacement', 'Distance travelled, always', 'Average speed'], answer: 1,
        hints: [R`$\Delta x = \int v\,\dd t$.`],
        solution: R`<p>The integral of velocity over time is displacement. Area below the axis counts as negative. It equals distance only if the velocity never changes sign.</p>` },
      { level: 'concept', type: 'mcq', title: 'Drag and the best angle',
        q: R`<p>For a projectile launched from level ground, how does quadratic air drag change the launch angle that gives the maximum range?</p>`,
        options: ['It stays exactly 45°', 'It becomes larger than 45°', 'It becomes smaller than 45°', 'Every angle gives the same range'], answer: 2,
        hints: [R`High launches spend longer in the air, so drag has more time to act on them.`],
        solution: R`<p>Drag hurts long, high flights most, so the optimum shifts to flatter trajectories below $45^\circ$. Check this in the lab.</p>` },
      { level: 'core', type: 'num', title: 'Accelerating car',
        q: R`<p>A car accelerates uniformly from rest to $27\ \mathrm{m/s}$ in $9.0\ \mathrm{s}$. How far does it travel in that time?</p>`,
        answer: 0.5 * 27 * 9, tol: 0.01, unit: 'm',
        hints: [R`Use $s = \tfrac12(u + v)t$.`],
        solution: R`<p>$s = \tfrac12(0 + 27)(9.0) = 122\ \mathrm{m}$ (121.5 m).</p>` },
      { level: 'core', type: 'num', title: 'Listening for the splash',
        q: R`<p>A stone is dropped from rest off a bridge. The splash is heard $3.0\ \mathrm{s}$ after release. Taking $g = 9.8\ \mathrm{m/s^2}$ and the speed of sound as $340\ \mathrm{m/s}$, how high is the bridge above the water?</p>`,
        answer: (function () { const a = Math.sqrt(2 / 9.8); const u = (-a + Math.sqrt(a * a + 12 / 340)) / (2 / 340); return u * u; })(), tol: 0.01, unit: 'm',
        hints: [R`Total time = fall time + sound travel time: $\sqrt{2h/g} + h/340 = 3.0$.`, R`Substitute $u = \sqrt h$ to get a quadratic in $u$.`],
        solution: R`<p>With $u = \sqrt h$: $\dfrac{u^2}{340} + \sqrt{\dfrac{2}{9.8}}\,u - 3.0 = 0$. Solving, $u = 6.38$, so $h = 40.7\ \mathrm{m}$. Ignoring the sound delay would give $44\ \mathrm{m}$, an 8% error.</p>` },
      { level: 'core', type: 'num', title: 'Off the cliff',
        q: R`<p>A ball is thrown horizontally at $15\ \mathrm{m/s}$ from the top of a $45\ \mathrm{m}$ cliff. How far from the base of the cliff does it land?</p>`,
        answer: 15 * Math.sqrt(90 / 9.8), tol: 0.01, unit: 'm',
        hints: [R`The fall time depends only on the height.`],
        solution: R`<p>$t = \sqrt{2(45)/9.8} = 3.03\ \mathrm{s}$, so $x = 15 \times 3.03 = 45.5\ \mathrm{m}$.</p>` },
      { level: 'core', type: 'num', title: 'Crossing the river',
        q: R`<p>A river is $120\ \mathrm{m}$ wide and flows at $1.5\ \mathrm{m/s}$. A boat moves at $2.5\ \mathrm{m/s}$ relative to the water and is steered so that it travels straight across. How long does the crossing take?</p>`,
        answer: 120 / Math.sqrt(2.5 * 2.5 - 1.5 * 1.5), tol: 0.01, unit: 's',
        hints: [R`The boat's velocity relative to the water and the current form a right triangle with the ground velocity.`],
        solution: R`<p>The ground speed straight across is $\sqrt{2.5^2 - 1.5^2} = 2.0\ \mathrm{m/s}$, so $t = 120/2.0 = 60\ \mathrm{s}$.</p>` },
      { level: 'core', type: 'num', title: 'Speeding up on a curve',
        q: R`<p>A car travels around a curve of radius $50\ \mathrm{m}$. At the instant its speed is $20\ \mathrm{m/s}$, it is speeding up at $3.0\ \mathrm{m/s^2}$. What is the magnitude of its total acceleration?</p>`,
        answer: Math.sqrt(64 + 9), tol: 0.01, unit: 'm/s²',
        hints: [R`Combine centripetal $v^2/r$ and tangential components at right angles.`],
        solution: R`<p>$a_c = 400/50 = 8.0\ \mathrm{m/s^2}$ and $a_t = 3.0\ \mathrm{m/s^2}$, so $a = \sqrt{64 + 9} = 8.54\ \mathrm{m/s^2}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cheapest throw',
        q: R`<p>You stand on level ground and want to throw a ball so that it passes through a point $30\ \mathrm{m}$ away horizontally and $10\ \mathrm{m}$ above the launch point. What is the minimum launch speed? ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: Math.sqrt(9.8 * (10 + Math.sqrt(100 + 900))), tol: 0.01, unit: 'm/s',
        hints: [R`Write the trajectory equation as a quadratic in $\tan\theta$. When does a real solution exist?`, R`The optimal angle bisects the angle between the vertical and the line to the target.`],
        solution: R`<p>The trajectory through $(d, h)$ gives a quadratic in $\tan\theta$ whose discriminant must be non-negative:</p>$$d^2 - 4\frac{gd^2}{2v^2}\left(h + \frac{gd^2}{2v^2}\right) \ge 0 \;\Rightarrow\; v^4 - 2ghv^2 - g^2d^2 \ge 0.$$<p>The smallest $v$ satisfies $v^2 = g\left(h + \sqrt{h^2 + d^2}\right) = 9.8(10 + 31.62) = 407.9$, so $v_{\min} = 20.2\ \mathrm{m/s}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Best throw from a tower',
        q: R`<p>A ball is launched at $20\ \mathrm{m/s}$ from the top of a $15\ \mathrm{m}$ tower over level ground. With the best choice of angle, what is the maximum horizontal range? ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: (20 / 9.8) * Math.sqrt(400 + 2 * 9.8 * 15), tol: 0.01, unit: 'm',
        hints: [R`The landing point lies on the safety parabola $y = \dfrac{v^2}{2g} - \dfrac{gx^2}{2v^2}$, measured from the launch point.`, R`Set $y = -H$ and solve for $x$.`],
        solution: R`<p>Every reachable point lies inside the safety parabola, and the farthest landing point lies on it. Setting $y = -H$:</p>$$-H = \frac{v^2}{2g} - \frac{gx^2}{2v^2}\;\Rightarrow\; x_{\max} = \frac{v}{g}\sqrt{v^2 + 2gH} = \frac{20}{9.8}\sqrt{400 + 294} = 53.8\ \mathrm{m}.$$<p>The optimal angle is $\tan\theta = v/\sqrt{v^2 + 2gH}$, about $37^\circ$, below $45^\circ$ as expected.</p>` },
      { level: 'olympiad', type: 'num', title: 'Four bugs',
        q: R`<p>Four bugs start at the corners of a square of side $1.2\ \mathrm{m}$. Each crawls at a constant $5.0\ \mathrm{cm/s}$, always heading straight towards the next bug clockwise. How long until they meet?</p>`,
        answer: 1.2 / 0.05, tol: 0.01, unit: 's',
        hints: [R`By symmetry the bugs always form a square. Consider the velocity of one bug relative to the bug it is chasing.`, R`The chased bug moves perpendicular to the line joining them, so it never helps or hinders the closing speed.`],
        solution: R`<p>By symmetry the bugs remain at the corners of a shrinking, rotating square. Bug A moves straight at bug B at speed $v$, while B moves perpendicular to the line AB. So the distance AB shrinks at exactly $v$, and they meet after $t = a/v = 1.2/0.05 = 24\ \mathrm{s}$. Each bug travels a total of $1.2\ \mathrm{m}$ along a logarithmic spiral.</p>` }
    ]
  });
})();
