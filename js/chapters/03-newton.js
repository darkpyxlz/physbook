(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'newton', num: 3, part: 'Mechanics',
    title: "Newton's Laws and Forces",
    subtitle: R`Why things move the way they do. Free-body diagrams, friction, tension, connected bodies, circular motion, drag and the fictitious forces of accelerating frames.`,
    goals: ['State and apply all three laws', 'Draw correct free-body diagrams', 'Handle static and kinetic friction', 'Use constraints for pulleys and wedges', 'Work in non-inertial frames'],
    sections: [
      {
        title: 'The three laws',
        html: R`
<p><strong>First law.</strong> A body stays at rest or moves with constant velocity unless a net force acts on it. This defines <em>inertial frames</em>: frames in which force-free bodies do not accelerate. The ground is approximately inertial; a braking bus is not.</p>
<p><strong>Second law.</strong> The net force equals the rate of change of momentum:</p>
<div class="key">$$\vec F_{\text{net}} = \frac{\dd\vec p}{\dd t} = m\vec a\quad(\text{for constant } m).$$</div>
<p><strong>Third law.</strong> If body A exerts a force on B, then B exerts an equal and opposite force on A. The two forces act on <em>different</em> bodies and are of the same type (both gravitational, both contact, and so on).</p>
<div class="warn-box"><p>The weight of a book on a table and the normal force from the table are <em>not</em> a third-law pair. Both act on the book; they are equal here only because the book does not accelerate. The partner of the book's weight is the book's gravitational pull on the Earth.</p></div>`
      },
      {
        title: 'Free-body diagrams and common forces',
        html: R`
<p>Isolate one body, draw every force acting <em>on it</em>, choose axes (often along and perpendicular to a slope), and write $\sum F = ma$ for each axis.</p>
<div class="table-wrap"><table><thead><tr><th>Force</th><th>Expression</th><th>Notes</th></tr></thead><tbody>
<tr><td>Weight</td><td>$mg$, downward</td><td>Gravity near Earth's surface</td></tr>
<tr><td>Normal force</td><td>$N$, perpendicular to surface</td><td>Whatever is needed to stop interpenetration; $N \ge 0$</td></tr>
<tr><td>Tension</td><td>$T$, along the string</td><td>Same throughout a massless string over frictionless pulleys</td></tr>
<tr><td>Spring</td><td>$F = -kx$</td><td>Hooke's law, $x$ measured from natural length</td></tr>
<tr><td>Static friction</td><td>$f_s \le \mu_s N$</td><td>Adjusts to prevent slipping, up to a maximum</td></tr>
<tr><td>Kinetic friction</td><td>$f_k = \mu_k N$</td><td>Opposes relative sliding; usually $\mu_k \lt \mu_s$</td></tr>
</tbody></table></div>
<p>A block on an incline of angle $\theta$ stays put as long as $\tan\theta \le \mu_s$. Once sliding, it accelerates at $a = g(\sin\theta - \mu_k\cos\theta)$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>At what angle should you pull a rope to drag a crate along the floor with the least force?<span class="tog">Solution</span></summary><div class="sol"><p>Pulling at angle $\phi$ above horizontal: $N = mg - F\sin\phi$, and sliding requires $F\cos\phi = \mu(mg - F\sin\phi)$, so $F = \dfrac{\mu mg}{\cos\phi + \mu\sin\phi}$. The denominator is maximised when $\tan\phi = \mu$, giving $F_{\min} = \dfrac{\mu mg}{\sqrt{1+\mu^2}}$. Lifting slightly reduces the normal force and hence friction.</p></div></details>`
      },
      {
        title: 'Connected bodies and constraints',
        html: R`
<p>When bodies are linked by strings or contact, write Newton's law for each body separately, then add a <strong>constraint equation</strong> that relates their accelerations.</p>
<p>For an Atwood machine (masses $m_1 \gt m_2$ over a pulley), the constraint is simply that both move with the same magnitude of acceleration:</p>
$$m_1 g - T = m_1 a,\quad T - m_2 g = m_2 a\quad\Rightarrow\quad a = \frac{m_1 - m_2}{m_1 + m_2}g,\quad T = \frac{2m_1m_2}{m_1+m_2}g.$$
<p>For more complicated pulley systems, write the total string length in terms of the positions of the bodies and differentiate twice. If a movable pulley hangs from a loop of string, the pulley moves half as far as the free end.</p>
<div class="insight"><p>Wedge problems are classic olympiad material. If a block slides on a wedge that can itself slide on a frictionless floor, the block's acceleration is <em>not</em> along the wedge surface in the ground frame. Work in the wedge's (accelerating) frame, where the block does move along the surface, and add a fictitious force $-m\vec A$. Horizontal momentum conservation gives a quick check.</p></div>`
      },
      {
        title: 'Circular motion and non-inertial frames',
        html: R`
<p>For uniform circular motion, the net inward force must supply the centripetal acceleration: $\sum F_{\text{in}} = mv^2/r$. There is no separate "centripetal force"; it is whatever combination of tension, gravity, friction or normal force points inward.</p>
<p>On a frictionless banked curve of angle $\theta$, the horizontal component of the normal force does the job: $N\sin\theta = mv^2/r$ and $N\cos\theta = mg$, so</p>
<div class="key">$$\tan\theta = \frac{v^2}{rg}.$$</div>
<h3>Fictitious forces</h3>
<p>In a frame accelerating at $\vec A$, Newton's law holds if you add a fictitious force $-m\vec A$ on every body. In a frame rotating at angular velocity $\vec\omega$, you add the centrifugal force $m\omega^2 r$ outward and the Coriolis force $-2m\vec\omega\times\vec v$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>A pendulum hangs in a car accelerating at $a$. At what angle does it hang?<span class="tog">Solution</span></summary><div class="sol"><p>In the car's frame the bob feels gravity $mg$ downward and a fictitious force $ma$ backward. The string aligns with the effective gravity: $\tan\phi = a/g$, tilted backwards. Effective gravity has magnitude $\sqrt{g^2 + a^2}$, so the pendulum also swings faster.</p></div></details>`
      },
      {
        title: 'Drag and terminal velocity',
        html: R`
<p>A body moving through a fluid feels a drag force opposing its velocity. Two regimes matter:</p>
<ul>
<li><strong>Linear (viscous) drag</strong>, $F = bv$, for small, slow objects (Stokes: $b = 6\pi\eta r$ for a sphere).</li>
<li><strong>Quadratic drag</strong>, $F = \tfrac12 C_d\rho A v^2$, for large or fast objects such as balls, cars and skydivers.</li>
</ul>
<p>When drag balances weight, the body reaches terminal velocity. For quadratic drag, $v_t = \sqrt{2mg/(C_d\rho A)}$. With linear drag, the approach is exponential: $v(t) = v_t(1 - e^{-t/\tau})$ with $\tau = m/b$.</p>
<div class="insight"><p>The Reynolds number $\mathrm{Re} = \rho v L/\eta$ decides which regime applies. Below about 1, viscosity dominates (linear drag). Above about 1000, inertia dominates (quadratic drag). A quick estimate of Re is a standard first step in IYPT-style problems.</p></div>`
      }
    ],
    labs: [
      { sim: 'incline', title: 'Block on an incline', desc: 'Adjust the slope and friction coefficients and watch the free-body diagram respond. The block slides only when mg sin θ exceeds the maximum static friction.',
        tasks: ['Set μs = 0.5 and slowly raise θ. At what angle does the block start to slide? Compare with tan θ = μs.', 'While the block is at rest, how does the friction force compare with μs N? Why is it not equal?', 'Once sliding, does the mass affect the acceleration? Explain from a = g(sin θ − μk cos θ).'] }
    ],
    formulas: [
      ["Newton's second law", R`\vec F = \dd\vec p/\dd t = m\vec a`],
      ['Static friction', R`f_s \le \mu_s N`],
      ['Kinetic friction', R`f_k = \mu_k N`],
      ['Incline acceleration', R`a = g(\sin\theta - \mu_k\cos\theta)`],
      ['Atwood acceleration', R`a = \frac{m_1-m_2}{m_1+m_2}g`],
      ['Banked curve', R`\tan\theta = v^2/(rg)`],
      ['Conical pendulum period', R`T = 2\pi\sqrt{L\cos\theta/g}`],
      ['Quadratic drag', R`F = \tfrac12 C_d\rho A v^2`],
      ['Terminal velocity', R`v_t = \sqrt{2mg/(C_d\rho A)}`],
      ['Capstan equation', R`T_{\text{load}} = T_{\text{hold}}\,e^{\mu\theta}`],
      ['Fictitious forces', R`-m\vec A,\ m\omega^2 r,\ -2m\vec\omega\times\vec v`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Third-law partner',
        q: R`<p>A book rests on a table. What is the third-law partner of the gravitational force of the Earth on the book?</p>`,
        options: ['The normal force of the table on the book', 'The gravitational force of the book on the Earth', 'The force of the book on the table', 'The normal force of the floor on the table'], answer: 1,
        hints: [R`Third-law partners act on different bodies and are the same type of force.`],
        solution: R`<p>The Earth pulls the book down, so the book pulls the Earth up with an equal gravitational force. The normal force acts on the same body (the book) and is a different type of force.</p>` },
      { level: 'concept', type: 'mcq', title: 'Elevator scale',
        q: R`<p>You stand on a bathroom scale in an elevator that is accelerating <em>upward</em> at $a$. What does the scale read?</p>`,
        options: [R`$mg$`, R`$m(g + a)$`, R`$m(g - a)$`, R`$ma$`], answer: 1,
        hints: [R`The scale reads the normal force $N$. Write $N - mg = ma$.`],
        solution: R`<p>$N - mg = ma$, so $N = m(g + a)$. You feel heavier when accelerating upward, which includes the moment a descending elevator slows to a stop.</p>` },
      { level: 'concept', type: 'mcq', title: 'Friction on a slope',
        q: R`<p>A block of mass $m$ rests without slipping on a slope of angle $\theta$. The coefficient of static friction is $\mu_s$. What is the friction force?</p>`,
        options: [R`$\mu_s mg\cos\theta$`, R`$mg\sin\theta$`, R`$\mu_s mg$`, R`$mg\cos\theta$`], answer: 1,
        hints: [R`Static friction is only as large as it needs to be.`],
        solution: R`<p>The block is in equilibrium, so friction exactly balances the component of gravity along the slope: $f = mg\sin\theta$. The value $\mu_s mg\cos\theta$ is only the maximum available.</p>` },
      { level: 'core', type: 'num', title: 'Atwood machine',
        q: R`<p>Masses of $3.0\ \mathrm{kg}$ and $5.0\ \mathrm{kg}$ hang over a light, frictionless pulley. Find the magnitude of their acceleration. ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: 9.8 * 2 / 8, tol: 0.01, unit: 'm/s²',
        hints: [R`Treat the whole system: the net driving force is $(m_1 - m_2)g$ and the total mass being accelerated is $m_1 + m_2$.`],
        solution: R`<p>$a = \dfrac{(5 - 3)(9.8)}{5 + 3} = 2.45\ \mathrm{m/s^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Sliding down',
        q: R`<p>A block slides down a $30^\circ$ slope with coefficient of kinetic friction $0.20$. What is its acceleration?</p>`,
        answer: 9.8 * (0.5 - 0.2 * Math.cos(Math.PI / 6)), tol: 0.01, unit: 'm/s²',
        hints: [R`$a = g(\sin\theta - \mu_k\cos\theta)$.`],
        solution: R`<p>$a = 9.8(0.500 - 0.20 \times 0.866) = 3.20\ \mathrm{m/s^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Banking a curve',
        q: R`<p>A highway curve of radius $120\ \mathrm{m}$ is designed for cars travelling at $25\ \mathrm{m/s}$ with no friction needed. At what angle should it be banked?</p>`,
        answer: Math.atan(625 / (120 * 9.8)) * 180 / Math.PI, tol: 0.01, unit: 'degrees',
        hints: [R`$\tan\theta = v^2/(rg)$.`],
        solution: R`<p>$\tan\theta = \dfrac{25^2}{120 \times 9.8} = 0.531$, so $\theta = 28.0^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'Conical pendulum',
        q: R`<p>A $1.0\ \mathrm{m}$ string makes a constant angle of $30^\circ$ with the vertical as its bob moves in a horizontal circle. What is the period of revolution?</p>`,
        answer: 2 * Math.PI * Math.sqrt(Math.cos(Math.PI / 6) / 9.8), tol: 0.01, unit: 's',
        hints: [R`Vertical: $T\cos\theta = mg$. Horizontal: $T\sin\theta = m\omega^2 L\sin\theta$.`],
        solution: R`<p>Dividing the equations, $\omega^2 = g/(L\cos\theta)$, so $T = 2\pi\sqrt{L\cos\theta/g} = 2\pi\sqrt{0.866/9.8} = 1.87\ \mathrm{s}$.</p>` },
      { level: 'core', type: 'num', title: 'Skydiver',
        q: R`<p>An $80\ \mathrm{kg}$ skydiver falls belly-down with drag coefficient $C_d = 1.0$ and frontal area $0.70\ \mathrm{m^2}$. The air density is $1.2\ \mathrm{kg/m^3}$. What is the terminal speed?</p>`,
        answer: Math.sqrt(2 * 80 * 9.8 / (1.2 * 1.0 * 0.7)), tol: 0.01, unit: 'm/s',
        hints: [R`At terminal speed, $\tfrac12 C_d\rho A v^2 = mg$.`],
        solution: R`<p>$v_t = \sqrt{\dfrac{2(80)(9.8)}{(1.0)(1.2)(0.70)}} = 43.2\ \mathrm{m/s}$, about $155\ \mathrm{km/h}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Block on a free wedge',
        q: R`<p>A $1.0\ \mathrm{kg}$ block slides down the frictionless $30^\circ$ face of a $4.0\ \mathrm{kg}$ wedge, which rests on a frictionless horizontal floor. What is the magnitude of the wedge's acceleration?</p>`,
        answer: 1 * 9.8 * 0.5 * Math.cos(Math.PI / 6) / (4 + 1 * 0.25), tol: 0.01, unit: 'm/s²',
        hints: [R`In the wedge's frame (acceleration $A$ backward), the block feels a fictitious force $mA$ forward and moves along the slope.`, R`Perpendicular to the slope in that frame: $N = mg\cos\theta - mA\sin\theta$. For the wedge: $N\sin\theta = MA$.`],
        solution: R`<p>In the wedge frame, perpendicular to the slope the block has zero acceleration: $N + mA\sin\theta = mg\cos\theta$. The wedge's horizontal equation is $N\sin\theta = MA$. Eliminating $N$:</p>$$A = \frac{mg\sin\theta\cos\theta}{M + m\sin^2\theta} = \frac{(1)(9.8)(0.5)(0.866)}{4 + 0.25} = 1.00\ \mathrm{m/s^2}.$$<p>Check: as $M\to\infty$, $A\to0$; as $\theta\to0$ or $90^\circ$, $A\to0$.</p>` },
      { level: 'olympiad', type: 'num', title: 'The capstan',
        q: R`<p>A sailor holds a rope with a force of $100\ \mathrm{N}$. The rope is wrapped $2.5$ full turns around a fixed post with coefficient of static friction $0.30$. What is the largest load the rope can hold on the other side?</p>`,
        answer: 100 * Math.exp(0.3 * 5 * Math.PI), tol: 0.02, unit: 'N',
        hints: [R`For a small rope element subtending $\dd\theta$, the normal force is $T\,\dd\theta$ and friction can change the tension by at most $\mu T\,\dd\theta$.`, R`This gives $\dd T/\dd\theta = \mu T$.`],
        solution: R`<p>On an element $\dd\theta$, the two tensions $T$ and $T + \dd T$ produce a normal force $N = T\,\dd\theta$, and friction allows $\dd T \le \mu T\,\dd\theta$. Integrating, $T_{\text{load}} = T_{\text{hold}}e^{\mu\theta}$ with $\theta = 2.5 \times 2\pi = 5\pi$:</p>$$T_{\text{load}} = 100\,e^{0.30\times 5\pi} = 100\,e^{4.71} \approx 1.1\times10^4\ \mathrm{N}.$$<p>Each extra turn multiplies the holding power by $e^{2\pi\mu} \approx 6.6$. That is why a few turns of rope on a bollard can hold a ship.</p>` },
      { level: 'olympiad', type: 'num', title: 'Pulling smart',
        q: R`<p>A $10\ \mathrm{kg}$ crate sits on a floor with $\mu_s = 0.50$. You pull on a rope at whatever angle requires the least force. What is that minimum force needed to start the crate moving? ($g = 9.8\ \mathrm{m/s^2}$)</p>`,
        answer: 0.5 * 98 / Math.sqrt(1.25), tol: 0.01, unit: 'N',
        hints: [R`Write the threshold condition with the rope at angle $\phi$ above horizontal and minimise $F(\phi)$.`],
        solution: R`<p>$F(\phi) = \dfrac{\mu mg}{\cos\phi + \mu\sin\phi}$, minimised at $\tan\phi = \mu$ (here $26.6^\circ$), giving $F_{\min} = \dfrac{\mu mg}{\sqrt{1+\mu^2}} = \dfrac{0.5\times98}{1.118} = 43.8\ \mathrm{N}$, compared with $49\ \mathrm{N}$ for a horizontal pull.</p>` }
    ]
  });
})();
