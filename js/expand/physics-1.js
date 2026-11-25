/* Expanded text for physics 1–8: toolkit, kinematics, Newton's laws, energy, momentum, rotation,
   gravitation, oscillations. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('toolkit', {
    0: { html: R`<h3 class="sub">Dimensional analysis as a prediction machine</h3>
<p>If a quantity depends only on a few variables, matching dimensions often fixes the formula up to a number. Write the answer as a product of powers and solve for the exponents.</p>
<div class="worked"><p>The period of small oscillations of a liquid drop might depend on its radius $r$, density $\rho$ and surface tension $\gamma$ (units N m⁻¹ = kg s⁻²). Find the form.</p>
<p>Try $T = r^a\rho^b\gamma^c$. Mass: $0 = b + c$. Length: $0 = a - 3b$. Time: $1 = -2c$. So $c = -\tfrac12$, $b = \tfrac12$, $a = \tfrac32$, and $T \sim \sqrt{\rho r^3/\gamma}$. A raindrop of radius 1 mm wobbles with a period of order $\sqrt{1000\cdot10^{-9}/0.07} \approx 4$ ms.</p></div>
<p>The method fails when there are more variables than dimensions: then it gives <strong>dimensionless groups</strong> (Buckingham π theorem), such as the Reynolds number $\rho vL/\eta$, and says the answer is an unknown function of them. That is still useful: it explains why scale models in wind tunnels work when their dimensionless groups match the real thing.</p>
<p>Always check final answers dimensionally, and test limiting cases (what happens as a mass goes to zero or an angle to 90°?). Both catch most algebra slips.</p>` },
    1: { html: R`<h3 class="sub">Fermi problems step by step</h3>
<p>Break an impossible-looking estimate into factors you can each guess within a factor of 3. Errors partly cancel, so the product is often within a factor of 2–3 of the truth.</p>
<div class="worked"><p>How much power do all humans produce as body heat?</p>
<p>A person eats about 2000 kcal $\approx 8.4$ MJ a day, so $8.4\times10^6/86\,400 \approx 100$ W. Times $8\times10^9$ people: $8\times10^{11}$ W, about 4% of humanity's total primary power use (about 19 TW).</p></div>
<div class="worked"><p>How many atoms are in a human body?</p>
<p>70 kg, mostly water: $70\,000/18 \approx 3900$ mol of molecules, 3 atoms each, so about $1.2\times10^4$ mol $\approx 7\times10^{27}$ atoms.</p></div>
<p>Useful numbers to memorise: Earth's radius 6400 km, a year $\approx \pi\times10^7$ s, atmospheric pressure $10^5$ Pa, an atom $10^{-10}$ m, Avogadro $6\times10^{23}$, solar constant 1.4 kW m⁻², density of rock 3000 kg m⁻³.</p>` },
    2: { html: R`<h3 class="sub">Components, dot and cross products</h3>
<p>Resolve vectors along convenient axes: on an incline, along and perpendicular to the slope; for circular motion, radial and tangential. The <strong>dot product</strong> $\mathbf a\cdot\mathbf b = ab\cos\theta = a_xb_x + a_yb_y + a_zb_z$ gives projections, work and angles; the <strong>cross product</strong> $\mathbf a\times\mathbf b$ has magnitude $ab\sin\theta$ and is perpendicular to both (right-hand rule), giving torque, angular momentum and magnetic force.</p>
<div class="worked"><p>Find the angle between $\mathbf a = (1, 2, 2)$ and $\mathbf b = (2, -1, 2)$, and the area of the parallelogram they span.</p>
<p>$\mathbf a\cdot\mathbf b = 2 - 2 + 4 = 4$, $|\mathbf a| = |\mathbf b| = 3$, so $\cos\theta = 4/9$, $\theta \approx 63.6°$. $\mathbf a\times\mathbf b = (2\cdot2 - 2\cdot(-1),\ 2\cdot2 - 1\cdot2,\ 1\cdot(-1) - 2\cdot2) = (6, 2, -5)$, area $\sqrt{65} \approx 8.06$. Check: $9\sin\theta = 9\sqrt{1 - 16/81} = \sqrt{65}$.</p></div>
<p>Useful identities: $\mathbf a\times(\mathbf b\times\mathbf c) = \mathbf b(\mathbf a\cdot\mathbf c) - \mathbf c(\mathbf a\cdot\mathbf b)$, and the triple product $\mathbf a\cdot(\mathbf b\times\mathbf c)$ is the volume of the parallelepiped.</p>` },
    3: { html: R`<h3 class="sub">Approximations physicists use daily</h3>
<p>For small $x$: $(1 + x)^n \approx 1 + nx$, $\sin x \approx x$, $\cos x \approx 1 - x^2/2$, $\tan x \approx x$, $e^x \approx 1 + x$, $\ln(1 + x) \approx x$. These are the first terms of Taylor series, $f(x_0 + x) \approx f(x_0) + f'(x_0)x + \tfrac12f''(x_0)x^2$.</p>
<div class="worked"><p>By how much does $g$ decrease at the top of a 9 km mountain?</p>
<p>$g \propto (R + h)^{-2} = R^{-2}(1 + h/R)^{-2} \approx R^{-2}(1 - 2h/R)$. The fractional change is $-2\cdot9/6400 \approx -0.28\%$, about 0.028 m s⁻².</p></div>
<p>Separable differential equations appear everywhere: $\dfrac{dN}{dt} = -\lambda N$ gives $N = N_0e^{-\lambda t}$ (decay, cooling, discharging capacitors), and $\ddot x = -\omega^2x$ gives $x = A\cos(\omega t + \phi)$ (all oscillations). Recognising which equation you have is half the solution.</p>
<p>Integrals as sums: to find the mass of a rod with density $\lambda(x)$, add up slices $dm = \lambda\,dx$; to find gravitational or electric fields of extended bodies, add contributions from small pieces, using symmetry to cancel components.</p>` },
    4: { html: R`<h3 class="sub">A worked olympiad attack</h3>
<div class="worked"><p>A bead slides without friction on a vertical circular hoop of radius $R$ that rotates about its vertical diameter at angular speed $\omega$. Where can the bead rest relative to the hoop?</p>
<p><em>Draw and choose a frame.</em> In the rotating frame the bead feels gravity $mg$ down, the normal force, and a centrifugal force $m\omega^2r$ outwards, with $r = R\sin\theta$ ($\theta$ measured from the bottom).</p>
<p><em>Equation.</em> Along the hoop's tangent: $mg\sin\theta = m\omega^2R\sin\theta\cos\theta$. So $\sin\theta = 0$ (bottom or top) or $\cos\theta = g/(\omega^2R)$.</p>
<p><em>Check limits.</em> The off-axis position exists only if $\omega^2 &gt; g/R$; as $\omega\to\infty$, $\theta\to90°$, the bead flies out to the widest point, as expected. At slow rotation only the bottom is stable; above $\omega = \sqrt{g/R}$ the bottom becomes unstable and the bead moves to the side, a simple example of symmetry breaking.</p></div>
<p>Habits that win marks: write down every assumption, keep symbols until the end, sanity-check with special cases and dimensions, and present a clear answer with units. Partial credit rewards good set-ups even when the algebra fails.</p>` }
  });

  X('kinematics', {
    0: { html: R`<h3 class="sub">Reading motion graphs</h3>
<p>On an $x$–$t$ graph the slope is velocity; on a $v$–$t$ graph the slope is acceleration and the <em>area</em> under it is displacement; on an $a$–$t$ graph the area is the change in velocity. Areas below the axis count as negative: the distance travelled is the total area, the displacement the signed area.</p>
<div class="worked"><p>A car's velocity is $v = 12 - 3t$ m s⁻¹ for $0 \le t \le 6$ s. Find the displacement and the distance travelled.</p>
<p>It stops at $t = 4$ s. Displacement $\int_0^6(12 - 3t)\,dt = 72 - 54 = 18$ m. Distance: forward $\int_0^4 = 24$ m, backward $\left|\int_4^6\right| = 6$ m, total 30 m.</p></div>
<p>When acceleration depends on position, use the chain rule: $a = \dfrac{dv}{dt} = v\dfrac{dv}{dx}$. For example a spring gives $v\,dv = -\omega^2x\,dx$, so $v^2 = \omega^2(A^2 - x^2)$ without solving for time at all.</p>` },
    1: { html: R`<h3 class="sub">Choosing the right equation</h3>
<p>The five quantities are $s, u, v, a, t$; each constant-acceleration equation omits one: $v = u + at$ (no $s$), $s = ut + \tfrac12at^2$ (no $v$), $s = vt - \tfrac12at^2$ (no $u$), $v^2 = u^2 + 2as$ (no $t$), $s = \tfrac12(u + v)t$ (no $a$). Pick the one that omits the quantity you neither know nor want.</p>
<div class="worked"><p>A stone is thrown up at 15 m s⁻¹ from the edge of a 20 m cliff. When does it hit the ground below? ($g = 9.8$ m s⁻²)</p>
<p>Taking up as positive: $-20 = 15t - 4.9t^2$, so $4.9t^2 - 15t - 20 = 0$, $t = \dfrac{15 + \sqrt{225 + 392}}{9.8} = \dfrac{15 + 24.84}{9.8} = 4.07$ s. The other root is negative (an earlier time when it "would have" been at ground level).</p></div>
<div class="worked"><p>A driver's reaction time is 0.7 s; brakes give 7 m s⁻². What is the stopping distance from 30 m s⁻¹ (108 km/h)?</p>
<p>Thinking: 21 m. Braking: $30^2/14 = 64$ m. Total 85 m. Braking distance grows with $v^2$, which is why speed limits matter so much.</p></div>` },
    2: { html: R`<h3 class="sub">Range, trajectory and launch from height</h3>
<p>The horizontal and vertical motions are independent. Eliminating $t$ gives the parabola $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$. On level ground, $R = \dfrac{u^2\sin2\theta}{g}$, maximal at 45°, and complementary angles (30° and 60°) give equal ranges.</p>
<div class="worked"><p>From what angle should a shot be thrown at 14 m s⁻¹ from a height of 2 m to go furthest?</p>
<p>The optimum is below 45° when launching from above the landing point: $\tan\theta = u/\sqrt{u^2 + 2gh} = 14/\sqrt{196 + 39.2} = 0.913$, so $\theta \approx 42°$. (Real shot-putters use even less, around 37°, because they can push harder at lower angles.)</p></div>
<p>The set of all points reachable with speed $u$ is bounded by the <strong>safety parabola</strong> $y = \dfrac{u^2}{2g} - \dfrac{gx^2}{2u^2}$. A point inside can be hit by two angles; on the boundary by exactly one, which is the optimal angle for that target.</p>
<p>Air resistance reduces range and makes trajectories asymmetric, steeper on the way down; a golf ball's backspin adds lift and can more than double its range.</p>` },
    3: { html: R`<h3 class="sub">Rivers, rain and closest approach</h3>
<p>Velocities add as vectors: $\mathbf v_{AC} = \mathbf v_{AB} + \mathbf v_{BC}$ (velocity of A relative to C equals A relative to B plus B relative to C).</p>
<div class="worked"><p>A swimmer moves at 1.5 m s⁻¹ through water in a river 60 m wide flowing at 1.0 m s⁻¹. (a) What is the quickest crossing? (b) How should she aim to land directly opposite?</p>
<p>(a) Head straight across: 40 s, drifting 40 m downstream. (b) Aim upstream at angle $\alpha$ with $1.5\sin\alpha = 1.0$, $\alpha = 41.8°$; cross-stream speed $1.5\cos\alpha = 1.12$ m s⁻¹, taking 54 s. If the current were faster than she can swim, landing opposite would be impossible.</p></div>
<p><strong>Closest approach</strong>: work in the frame of one object, so the other moves in a straight line with the relative velocity; the closest distance is the perpendicular from the first object to that line. Two ships, one at the origin moving north at 10 m s⁻¹ and one 1 km east moving west at 10 m s⁻¹, have relative velocity $(-10, -10)$ for the second; its line passes at $1000\sin45° \approx 707$ m from the first.</p>` },
    4: { html: R`<h3 class="sub">Non-uniform circular motion</h3>
<p>For motion on a circle of radius $r$ the acceleration has two parts: <strong>centripetal</strong> $v^2/r = \omega^2r$ towards the centre (changing direction) and <strong>tangential</strong> $dv/dt = r\alpha$ (changing speed). The total magnitude is $\sqrt{(v^2/r)^2 + (dv/dt)^2}$.</p>
<div class="worked"><p>A car accelerates from rest round a bend of radius 50 m at a steady 2 m s⁻². When does its total acceleration reach 5 m s⁻²?</p>
<p>Need $v^2/50 = \sqrt{25 - 4} = 4.58$, so $v^2 = 229$, $v = 15.1$ m s⁻¹, at $t = 7.6$ s. Tyre grip limits the total, so braking hard in a corner reduces the grip left for turning.</p></div>
<p>For a general curved path, the same split works with $r$ replaced by the local <strong>radius of curvature</strong> $\rho$. At the top of a projectile's flight the acceleration $g$ is entirely centripetal, so $\rho = (u\cos\theta)^2/g$.</p>
<p>In polar coordinates, $\mathbf a = (\ddot r - r\dot\theta^2)\hat{\mathbf r} + (r\ddot\theta + 2\dot r\dot\theta)\hat{\boldsymbol\theta}$; the $2\dot r\dot\theta$ term is the Coriolis term, met again in rotating frames.</p>` }
  });

  X('newton', {
    0: { html: R`<h3 class="sub">What the laws really say</h3>
<p>The <strong>first law</strong> defines inertial frames: those in which a free body moves at constant velocity. The <strong>second</strong>, $\mathbf F = d\mathbf p/dt$ (which reduces to $m\mathbf a$ for constant mass), says forces cause changes in motion, not motion itself; the Aristotelian idea that motion needs a force persisted for 2000 years because friction hides inertia. The <strong>third</strong> says forces come in pairs: equal, opposite, of the same type, acting on <em>different</em> bodies.</p>
<div class="worked"><p>If the horse pulls the cart and the cart pulls back equally on the horse, how does anything move?</p>
<p>The pair acts on different bodies, so it never cancels for either one. The horse accelerates because the ground's friction forward on its hooves exceeds the cart's pull backward; the cart accelerates because the horse's pull exceeds the friction on its wheels.</p></div>
<p>Weight $mg$ and the normal force on a book on a table are <em>not</em> a third-law pair: they act on the same body and are different types. The pair to the book's weight is the book's gravitational pull on the Earth.</p>` },
    1: { html: R`<h3 class="sub">Friction and inclines</h3>
<p>Static friction adjusts to whatever is needed, up to $\mu_sN$; kinetic friction is roughly $\mu_kN$ (usually smaller), opposing sliding. On an incline at angle $\theta$, a block stays at rest if $\tan\theta \le \mu_s$, which gives a neat way to measure $\mu_s$: tilt until it slips.</p>
<div class="worked"><p>A 5 kg box is pulled along a floor ($\mu_k = 0.4$) by a rope at angle $\theta$ above horizontal. What angle minimises the tension needed to keep it moving steadily?</p>
<p>Vertically $N = mg - T\sin\theta$; horizontally $T\cos\theta = \mu_k(mg - T\sin\theta)$, so $T = \dfrac{\mu_kmg}{\cos\theta + \mu_k\sin\theta}$. The denominator is maximised at $\tan\theta = \mu_k$: $\theta = 21.8°$, $T = \mu_kmg/\sqrt{1 + \mu_k^2} = 18.2$ N, against 19.6 N pulling horizontally.</p></div>
<p>Friction is less simple than the law suggests: it arises at microscopic contact points whose total area is proportional to the load, which is why it barely depends on apparent contact area. Capstans exploit friction on curves: tension grows as $T_2 = T_1e^{\mu\phi}$ around a post, so a few turns of rope let one sailor hold a ship.</p>` },
    2: { html: R`<h3 class="sub">Pulleys and constraint equations</h3>
<p>Strings impose <strong>constraints</strong>: an inextensible string's total length is fixed, so the positions of the bodies it connects are related, and so are their accelerations. Write the length in terms of coordinates, then differentiate twice.</p>
<div class="worked"><p>Mass $m_1$ hangs from a movable pulley; a string over a fixed pulley connects it to mass $m_2$ on the other side. Find the accelerations.</p>
<p>The string length gives $2y_1 + y_2 = $ const (positions measured downward), so $a_2 = -2a_1$. With tension $T$: $m_1a_1 = m_1g - 2T$ and $m_2a_2 = m_2g - T$. Substituting gives $a_1 = \dfrac{(m_1 - 2m_2)g}{m_1 + 4m_2}$. Check: if $m_1 = 2m_2$, nothing moves (mechanical advantage of 2).</p></div>
<p>For an Atwood machine with masses $m_1 &gt; m_2$: $a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$ and $T = \dfrac{2m_1m_2g}{m_1 + m_2}$. Atwood built it in 1784 to "dilute" gravity so that accelerations could be timed with a pendulum clock.</p>` },
    3: { html: R`<h3 class="sub">Fictitious forces</h3>
<p>In an accelerating frame, add a fictitious force $-m\mathbf A$ to every body and Newton's laws work again. A plumb line in a car accelerating at $A$ hangs at $\tan\theta = A/g$ backwards: an accelerometer.</p>
<p>In a frame rotating at $\boldsymbol\omega$, there are two: the <strong>centrifugal</strong> force $m\omega^2r$ outward, and the <strong>Coriolis</strong> force $-2m\boldsymbol\omega\times\mathbf v$ on moving bodies.</p>
<div class="worked"><p>How fast must a space station of radius 100 m spin to give 1 g at the rim?</p>
<p>$\omega = \sqrt{g/r} = 0.31$ rad s⁻¹, one turn every 20 s. A person running in the direction of spin feels heavier, against it lighter: Coriolis effects that make small stations nauseating.</p></div>
<p>On Earth the Coriolis force deflects winds right in the northern hemisphere, so air spirals anticlockwise into lows (cyclones). It is far too weak to decide which way a bath drains. A Foucault pendulum's swing plane turns once every $24\ \text{h}/\sin\lambda$ at latitude $\lambda$: about 32 hours in Paris.</p>
<p>Banked tracks: at angle $\theta$ with no friction, the ideal speed is $v = \sqrt{rg\tan\theta}$.</p>` },
    4: { html: R`<h3 class="sub">Two drag laws</h3>
<p>At low speeds or small sizes (low Reynolds number) drag is viscous: <strong>Stokes' law</strong> $F = 6\pi\eta rv$, linear in speed. At high Reynolds numbers drag is quadratic: $F = \tfrac12C_d\rho Av^2$, from pushing air aside. Terminal velocity is where drag equals weight.</p>
<div class="worked"><p>Compare terminal speeds of a skydiver (80 kg, area 0.7 m², $C_d = 1$) and a 10 μm fog droplet (viscosity of air $1.8\times10^{-5}$ Pa s).</p>
<p>Skydiver: $v = \sqrt{2mg/(C_d\rho A)} = \sqrt{1568/(1.2\cdot0.7)} \approx 43$ m s⁻¹. Droplet: $\tfrac43\pi r^3\rho_wg = 6\pi\eta rv$ gives $v = \dfrac{2r^2\rho_wg}{9\eta} = \dfrac{2\cdot(10^{-5})^2\cdot1000\cdot9.8}{9\cdot1.8\times10^{-5}} \approx 0.012$ m s⁻¹, which is why fog hangs in the air.</p></div>
<p>With linear drag, $v(t) = v_T(1 - e^{-t/\tau})$ with $\tau = m/b$; with quadratic drag, $v(t) = v_T\tanh(gt/v_T)$. Millikan's oil-drop experiment used Stokes' law to find each drop's size from its terminal speed.</p>` }
  });

  X('energy', {
    0: { html: R`<h3 class="sub">Work as an integral</h3>
<p>For a varying force along a path, $W = \int\mathbf F\cdot d\mathbf s$: the area under a force–displacement graph. Only the component along the motion does work, so a centripetal force does none, and the normal force on a sliding block does none.</p>
<div class="worked"><p>How much work stretches a spring ($k = 200$ N m⁻¹) from 0.1 m to 0.3 m extension?</p>
<p>$\int_{0.1}^{0.3}200x\,dx = 100(0.09 - 0.01) = 8$ J. Not $kx\Delta x$: the force varies.</p></div>
<div class="worked"><p>A 2 kg box is pushed 5 m up a 30° slope by a horizontal 30 N force; $\mu_k = 0.2$. Find the work done by each force.</p>
<p>Push: $30\cos30°\cdot5 = 130$ J. Gravity: $-2\cdot9.8\cdot5\sin30° = -49$ J. Normal force $N = mg\cos30° + 30\sin30° = 17.0 + 15 = 32.0$ N, so friction does $-0.2\cdot32.0\cdot5 = -32$ J. Normal: 0. Net $+49$ J, which becomes kinetic energy.</p></div>` },
    1: { html: R`<h3 class="sub">Using the work–energy theorem</h3>
<p>The net work done on a body equals its change in kinetic energy: $W_{\text{net}} = \Delta(\tfrac12mv^2)$. It follows from $F = ma$ integrated along the path, and it avoids time entirely, so it is the fastest route whenever you want a speed after a known distance.</p>
<div class="worked"><p>A 1200 kg car skids to a stop in 40 m on a road with $\mu_k = 0.7$. How fast was it going?</p>
<p>$\mu_kmg\cdot d = \tfrac12mv^2$, so $v = \sqrt{2\mu_kgd} = \sqrt{2\cdot0.7\cdot9.8\cdot40} = 23.4$ m s⁻¹ (84 km/h). The mass cancels: accident investigators use exactly this.</p></div>
<div class="worked"><p>A bullet (10 g, 400 m s⁻¹) penetrates 8 cm into wood. What is the average resisting force? How deep would a bullet at twice the speed go?</p>
<p>$F = \tfrac12mv^2/d = 800/0.08 = 10^4$ N. Kinetic energy grows fourfold at double speed, so (with the same force) it penetrates 32 cm.</p></div>
<p>Kinetic energy depends on the frame, so the work done does too, but the theorem holds in every inertial frame.</p>` },
    2: { html: R`<h3 class="sub">Force from potential, and energy diagrams</h3>
<p>For a conservative force, $F = -\dfrac{dU}{dx}$ (in 3D, $\mathbf F = -\nabla U$): forces push "downhill" on the potential-energy curve. Equilibria are where $dU/dx = 0$: stable at minima, unstable at maxima.</p>
<div class="worked"><p>The interaction between two atoms is roughly $U(r) = \dfrac{a}{r^{12}} - \dfrac{b}{r^6}$ (the Lennard-Jones potential). Find the equilibrium separation and the binding energy.</p>
<p>$dU/dr = -12a/r^{13} + 6b/r^7 = 0$ gives $r_0 = (2a/b)^{1/6}$, and $U(r_0) = \dfrac{b^2}{4a} - \dfrac{b^2}{2a} = -\dfrac{b^2}{4a}$.</p></div>
<p>On an energy diagram, a horizontal line at total energy $E$ shows where motion is allowed ($U \le E$); the points where $U = E$ are <strong>turning points</strong>. Near any minimum, $U \approx U_0 + \tfrac12U''(x_0)(x - x_0)^2$, so small motions are simple harmonic with $\omega = \sqrt{U''/m}$: the reason oscillations are everywhere.</p>
<p>Friction is non-conservative: the work it does depends on the path, so it has no potential energy.</p>` },
    3: { html: R`<h3 class="sub">Loops, springs and lost energy</h3>
<div class="worked"><p>From what height must a ball start (rolling without slipping is ignored here: assume a sliding bead) to complete a vertical loop of radius $r$?</p>
<p>At the top it needs $v^2 \ge gr$ to keep contact. Energy: $mgh = mg\cdot2r + \tfrac12mv^2 \ge 2mgr + \tfrac12mgr$, so $h \ge 2.5r$. (A rolling solid ball needs $2.7r$ because some energy goes into spin.)</p></div>
<div class="worked"><p>A 0.5 kg block slides from rest down a 1.2 m high frictionless ramp, then along a rough floor ($\mu_k = 0.3$) into a spring ($k = 400$ N m⁻¹) 2 m away. How far does it compress the spring (ignoring friction during compression)?</p>
<p>Energy at the spring: $0.5\cdot9.8\cdot1.2 - 0.3\cdot0.5\cdot9.8\cdot2 = 5.88 - 2.94 = 2.94$ J. Then $\tfrac12\cdot400x^2 = 2.94$, $x = 0.121$ m.</p></div>
<p>Energy "lost" to friction is not destroyed but becomes internal (thermal) energy. Including every form, energy is always conserved; the question is whether the forms you track are complete.</p>` },
    4: { html: R`<h3 class="sub">Power, efficiency and moving vehicles</h3>
<p>Power is the rate of doing work: $P = dW/dt = \mathbf F\cdot\mathbf v$. A car at steady speed delivers just enough power to balance the resistive forces: $P = Fv$. With quadratic air drag $F \propto v^2$, the power needed grows as $v^3$.</p>
<div class="worked"><p>A car needs 15 kW to cruise at 25 m s⁻¹, almost all against air drag. What power is needed at 35 m s⁻¹? And how much fuel energy per kilometre at each speed, with an engine efficiency of 25%?</p>
<p>$15(35/25)^3 = 41$ kW. Energy per km (drag force × distance): at 25 m s⁻¹, $F = 600$ N, so 600 kJ km⁻¹ of work and 2.4 MJ km⁻¹ of fuel; at 35, $F = 1176$ N, so 4.7 MJ km⁻¹ of fuel. Fuel use per km grows as $v^2$.</p></div>
<p>A human climbing stairs: a 60 kg person rising 3 m in 4 s delivers $60\cdot9.8\cdot3/4 = 440$ W. Elite cyclists sustain about 400 W for an hour; the human body is about 20–25% efficient, so the rest (over a kilowatt) is heat to be removed.</p>
<p>Efficiency $= \dfrac{\text{useful power out}}{\text{power in}}$; the kilowatt-hour (3.6 MJ) is the unit on electricity bills.</p>` }
  });

  X('momentum', {
    0: { html: R`<h3 class="sub">Impulse and force–time graphs</h3>
<p>Impulse $\mathbf J = \int\mathbf F\,dt = \Delta\mathbf p$: the area under a force–time graph. For a given change in momentum, a longer contact time means a smaller average force, which is the whole idea behind airbags, crumple zones, bending your knees on landing and following through in sports.</p>
<div class="worked"><p>A 0.145 kg baseball arrives at 40 m s⁻¹ and leaves the bat at 50 m s⁻¹ in the opposite direction, with contact lasting 0.7 ms. Find the average force.</p>
<p>$\Delta p = 0.145\cdot90 = 13.05$ kg m s⁻¹, so $F = 13.05/0.0007 \approx 1.9\times10^4$ N, about 13 000 times the ball's weight.</p></div>
<div class="worked"><p>Hail falls at 20 m s⁻¹ onto a flat roof of area 100 m², with 0.5 kg of hail per square metre per minute, stopping on impact. What extra force does it exert?</p>
<p>Mass per second: $100\cdot0.5/60 = 0.83$ kg s⁻¹, so $F = \dot mv = 16.7$ N. (If the stones bounced back, it would double.)</p></div>` },
    1: { html: R`<h3 class="sub">Working in the centre-of-mass frame</h3>
<p>The centre of mass moves as if all external forces acted on the total mass there: $M\ddot{\mathbf R} = \mathbf F_{\text{ext}}$. Internal forces cancel in pairs. With no external force, the centre of mass moves at constant velocity, whatever explosions or collisions happen inside.</p>
<div class="worked"><p>A 60 kg person walks 4 m from one end of a 120 kg boat to the other on still water. How far does the boat move?</p>
<p>The centre of mass stays put: $60(4 - d) = 120d$, so $d = 1.33$ m, opposite to the person.</p></div>
<div class="worked"><p>A shell fired at 100 m s⁻¹ at 45° explodes at the top into two equal fragments; one falls straight down from rest. Where does the other land?</p>
<p>The centre of mass still lands where the shell would have, at $R = u^2/g = 1020$ m. One fragment lands at $R/2 = 510$ m, so the other lands at $2\cdot1020 - 510 = 1530$ m.</p></div>
<p>The kinetic energy splits as $\tfrac12MV^2 + K_{\text{cm}}$: the motion of the centre plus the motion relative to it. Only the second part can be converted to heat in collisions.</p>` },
    2: { html: R`<h3 class="sub">Ballistic pendulum and Newton's cradle</h3>
<div class="worked"><p>A 10 g bullet embeds in a 2 kg block hanging on strings, which swings up 12 cm. Find the bullet's speed and the fraction of energy lost.</p>
<p>After the collision: $v = \sqrt{2gh} = 1.53$ m s⁻¹. Momentum: $0.01u = 2.01\cdot1.53$, so $u = 308$ m s⁻¹. Energy kept $= m/(m + M) = 0.5\%$: 99.5% becomes heat and deformation. Energy is not conserved in the collision, but momentum is, so the two stages must be treated separately.</p></div>
<p>In Newton's cradle, why does exactly one ball fly out when one hits? With equal masses in elastic collisions, velocities simply swap, and the impulse passes along the chain. Two balls out at half the speed would conserve momentum but not energy.</p>
<p>The <strong>coefficient of restitution</strong> $e = \dfrac{\text{speed of separation}}{\text{speed of approach}}$ measures bounciness: 1 for elastic, 0 for sticking. A ball dropped from height $h$ rebounds to $e^2h$, and bounces forever in a finite time $\dfrac{1 + e}{1 - e}\sqrt{2h/g}$.</p>` },
    3: { html: R`<h3 class="sub">The rocket equation and conveyor belts</h3>
<p>A rocket ejecting exhaust at speed $u$ relative to itself gains $dv = -u\,dm/m$, so</p>
<div class="key"><p>$\Delta v = u\ln\dfrac{m_0}{m_f}$ (Tsiolkovsky)</p></div>
<div class="worked"><p>Reaching low orbit needs about 9.4 km s⁻¹ of $\Delta v$ including losses. With $u = 3.5$ km s⁻¹, what mass ratio does a single-stage rocket need?</p>
<p>$m_0/m_f = e^{9.4/3.5} = e^{2.69} = 14.7$: over 93% of the lift-off mass must be propellant, leaving under 7% for tanks, engines and payload. That is why rockets use stages, discarding empty tanks.</p></div>
<p>A conveyor belt moving at $v$ onto which sand falls at rate $\mu$ (kg s⁻¹) needs a force $F = \mu v$ to keep moving, so power $\mu v^2$. Only half of that becomes kinetic energy of the sand ($\tfrac12\mu v^2$ per second); the other half is dissipated as friction while the sand is brought up to speed, whatever the friction coefficient.</p>
<p>Thrust of a rocket is $\dot m u$; the Saturn V's first stage burned about 13 tonnes of propellant per second at $u \approx 2.6$ km s⁻¹, giving about 34 MN.</p>` }
  });

  X('rotation', {
    0: { html: R`<h3 class="sub">Angular quantities and their analogues</h3>
<p>Angular displacement $\theta$ (radians), angular velocity $\omega = d\theta/dt$, angular acceleration $\alpha = d\omega/dt$. Every linear constant-acceleration equation has a rotational twin: $\omega = \omega_0 + \alpha t$, $\theta = \omega_0t + \tfrac12\alpha t^2$, $\omega^2 = \omega_0^2 + 2\alpha\theta$. A point at radius $r$ moves with $v = r\omega$ and tangential acceleration $r\alpha$.</p>
<div class="worked"><p>A washing machine drum spins down from 1200 rpm to rest in 25 s uniformly. How many turns does it make while stopping?</p>
<p>$\omega_0 = 1200\cdot2\pi/60 = 125.7$ rad s⁻¹; $\theta = \tfrac12\omega_0t = 1571$ rad = 250 turns. (Equivalently: average 600 rpm for 25 s.)</p></div>
<p>Angular velocity is a vector along the rotation axis (right-hand rule). Earth rotates at $7.29\times10^{-5}$ rad s⁻¹ (once per <em>sidereal</em> day, 23 h 56 min), so the equator moves at 465 m s⁻¹, a free boost for rockets launched eastward near the equator.</p>` },
    1: { html: R`<h3 class="sub">Calculating moments of inertia</h3>
<p>$I = \sum mr^2 = \int r^2\,dm$. Standard results: thin rod about centre $\tfrac1{12}ML^2$, about end $\tfrac13ML^2$; ring $MR^2$; disc $\tfrac12MR^2$; solid sphere $\tfrac25MR^2$; thin spherical shell $\tfrac23MR^2$.</p>
<div class="worked"><p>Derive $I$ for a uniform disc about its axis.</p>
<p>Rings of radius $r$, width $dr$: $dm = \dfrac{M}{\pi R^2}2\pi r\,dr$. $I = \int_0^R\dfrac{2M}{R^2}r^3\,dr = \tfrac12MR^2$.</p></div>
<p>Two theorems save effort. <strong>Parallel axis</strong>: $I = I_{\text{cm}} + Md^2$ about any axis parallel to one through the centre of mass (rod about end: $\tfrac1{12}ML^2 + M(L/2)^2 = \tfrac13ML^2$). <strong>Perpendicular axis</strong> (flat objects only): $I_z = I_x + I_y$, so a disc about a diameter has $\tfrac14MR^2$.</p>
<div class="worked"><p>Find $I$ for a solid sphere using discs.</p>
<p>A disc at height $z$ has radius $\sqrt{R^2 - z^2}$ and contributes $\tfrac12(R^2 - z^2)\,dm$ with $dm = \rho\pi(R^2 - z^2)dz$. $\int_{-R}^{R}\tfrac12\rho\pi(R^2 - z^2)^2dz = \tfrac{8}{15}\rho\pi R^5 = \tfrac25MR^2$.</p></div>` },
    2: { html: R`<h3 class="sub">Statics problems</h3>
<p>For equilibrium both the net force and the net torque must vanish, and the torque condition holds about <em>any</em> point. Choose the point where unknown forces act, so they drop out.</p>
<div class="worked"><p>A ladder of length $L$ and weight $W$ leans against a smooth wall at angle $\theta$ to the ground; the floor has friction coefficient $\mu$. What is the smallest angle before it slips?</p>
<p>Wall force $N_w$ (horizontal), floor normal $N = W$, friction $f = N_w$. Torques about the foot: $N_wL\sin\theta = W\tfrac L2\cos\theta$, so $N_w = \dfrac{W}{2\tan\theta}$. Slipping when $N_w &gt; \mu W$: $\tan\theta &lt; \dfrac1{2\mu}$. With $\mu = 0.4$, the ladder must be above 51°.</p></div>
<p>For a body on the point of toppling, the normal force shifts to the edge. A block of width $w$ and height $h$ on a tilting plane topples (rather than slides) if $\tan\theta$ reaches $w/h$ before reaching $\mu$.</p>
<p>Dynamics: $\tau = I\alpha$ about a fixed axis or the centre of mass. A mass $m$ hanging from a string wound on a pulley of moment of inertia $I$ and radius $r$ falls with $a = \dfrac{mg}{m + I/r^2}$.</p>` },
    3: { html: R`<h3 class="sub">The race down the ramp</h3>
<p>Rolling without slipping means $v = R\omega$: the contact point is momentarily at rest, so static friction does no work and energy is conserved. Writing $I = kMR^2$:</p>
<div class="key"><p>$Mgh = \tfrac12Mv^2(1 + k)$, so $v = \sqrt{\dfrac{2gh}{1 + k}}$ and $a = \dfrac{g\sin\theta}{1 + k}$.</p></div>
<div class="worked"><p>A solid sphere, a solid cylinder, a hoop and a sliding (frictionless) block race down the same slope. In what order do they finish?</p>
<p>$k = 0$ (block), $\tfrac25$ (sphere), $\tfrac12$ (cylinder), $1$ (hoop). The block wins, then the sphere, cylinder and hoop. Mass and radius do not matter, only the shape, through $k$.</p></div>
<p>A ball skidding along a floor (say, a bowling ball released with no spin) has kinetic friction acting backwards: it slows the ball and spins it up until $v = R\omega$. For a solid sphere released at $v_0$, rolling starts at $v = \tfrac57v_0$, found from conservation of angular momentum about the contact point.</p>` },
    4: { html: R`<h3 class="sub">Angular momentum in action</h3>
<p>$\mathbf L = \mathbf r\times\mathbf p$ for a particle and $I\boldsymbol\omega$ for a body spinning about a symmetry axis; $d\mathbf L/dt = \boldsymbol\tau$. With no external torque, $\mathbf L$ is conserved.</p>
<div class="worked"><p>A skater spins at 2 rev s⁻¹ with arms out ($I = 3.0$ kg m²), then pulls them in ($I = 1.0$ kg m²). Find the new rate and the change in kinetic energy.</p>
<p>6 rev s⁻¹. $K = L^2/(2I)$ triples: from $\tfrac12\cdot3\cdot(4\pi)^2 = 237$ J to 711 J. The extra 474 J is work done by her arm muscles pulling inward against the centrifugal tendency.</p></div>
<p>A spinning top or gyroscope with spin angular momentum $L$ under a gravity torque $\tau = mgr$ does not fall but <strong>precesses</strong> at $\Omega = \tau/L = mgr/(I\omega)$: the torque changes the direction of $\mathbf L$, not its size. Earth's axis precesses with a 26 000-year period under torques from the Sun and Moon on its equatorial bulge, slowly moving the pole star.</p>
<p>A neutron star forms when a stellar core of radius about 7000 km collapses to 10 km: conservation of angular momentum multiplies its spin by $(700)^2 \approx 5\times10^5$, turning a rotation of days into fractions of a second.</p>` }
  });

  X('gravitation', {
    0: { html: R`<h3 class="sub">Shells, densities and weighing the Earth</h3>
<p>Newton proved two shell theorems: a uniform spherical shell attracts an outside mass as if all its mass were at the centre, and exerts no net force on a mass inside it. So inside a uniform planet, only the mass closer to the centre counts: $g(r) = g_0r/R$, falling linearly to zero at the centre.</p>
<div class="worked"><p>From $g = 9.81$ m s⁻², $R = 6.37\times10^6$ m and $G = 6.67\times10^{-11}$ N m² kg⁻², find Earth's mass and mean density.</p>
<p>$M = gR^2/G = 5.97\times10^{24}$ kg; density $M/(\tfrac43\pi R^3) = 5510$ kg m⁻³, nearly twice that of surface rocks: so the core must be much denser (it is mostly iron).</p></div>
<p>Cavendish measured $G$ in 1798 with a torsion balance: small lead balls on a rod, attracted by large ones, twisted a fibre by a tiny angle. It "weighed the Earth". $G$ remains the least precisely known fundamental constant.</p>
<div class="worked"><p>A straight tunnel is drilled through a uniform Earth. How long does a dropped object take to reach the other side?</p>
<p>The force component along the tunnel is proportional to displacement from its middle, so the motion is simple harmonic with $\omega = \sqrt{g/R}$: half a period, $\pi\sqrt{R/g} = 42$ minutes, for any straight tunnel.</p></div>` },
    1: { html: R`<h3 class="sub">Potential wells and escape</h3>
<p>Gravitational potential energy is $U = -\dfrac{GMm}{r}$, zero at infinity. Near the surface, $U(R + h) - U(R) \approx mgh$, recovering the familiar result. To escape, kinetic energy must at least cancel the negative potential energy:</p>
<div class="key"><p>$v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}} = \sqrt{2gR}$</p></div>
<div class="worked"><p>Find escape speeds from Earth and from the Moon ($M = 7.35\times10^{22}$ kg, $R = 1.74\times10^6$ m).</p>
<p>Earth: $\sqrt{2\cdot9.81\cdot6.37\times10^6} = 11.2$ km s⁻¹. Moon: $\sqrt{2\cdot6.67\times10^{-11}\cdot7.35\times10^{22}/1.74\times10^6} = 2.4$ km s⁻¹.</p></div>
<p>Gas molecules in an atmosphere escape over time if their typical thermal speed is more than about a sixth of the escape speed. Hydrogen at 1000 K in the upper atmosphere has rms speed about 5 km s⁻¹, so Earth loses hydrogen; the Moon, with its tiny escape speed, keeps no atmosphere at all.</p>
<p>Setting $v_{\text{esc}} = c$ gives the <strong>Schwarzschild radius</strong> $r_s = 2GM/c^2$ (the right answer, from a wrong argument): 3 km for the Sun, 9 mm for the Earth.</p>` },
    2: { html: R`<h3 class="sub">Orbital energy and the vis-viva equation</h3>
<p>For a circular orbit, $v = \sqrt{GM/r}$ and the total energy is $E = -\dfrac{GMm}{2r}$: kinetic energy is $+GMm/2r$, potential $-GMm/r$. For an ellipse of semi-major axis $a$, the energy is $E = -GMm/(2a)$, giving the <strong>vis-viva</strong> equation</p>
<div class="key"><p>$v^2 = GM\left(\dfrac{2}{r} - \dfrac{1}{a}\right)$</p></div>
<div class="worked"><p>A geostationary satellite has a period of one sidereal day (86 164 s). Find its orbital radius.</p>
<p>Kepler's third law: $r^3 = GMT^2/(4\pi^2) = 3.986\times10^{14}\cdot(86\,164)^2/39.48 = 7.50\times10^{22}$, so $r = 42\,200$ km, about 35 800 km above the surface.</p></div>
<p>Counter-intuitively, friction with the upper atmosphere makes a satellite <em>speed up</em>: losing energy drops it to a lower orbit, where $v = \sqrt{GM/r}$ is larger. The total energy falls because potential energy drops twice as fast as kinetic energy rises.</p>
<p>Kepler's second law (equal areas in equal times) is conservation of angular momentum: $r^2\dot\theta$ is constant, so planets move fastest at perihelion.</p>` },
    3: { html: R`<h3 class="sub">Hohmann transfers and tides in numbers</h3>
<div class="worked"><p>Find the $\Delta v$ needed to go from a 6700 km circular orbit to geostationary 42 200 km by a Hohmann transfer ($GM = 3.986\times10^{14}$).</p>
<p>Transfer ellipse $a = 24\,450$ km. Circular speeds: 7.71 and 3.07 km s⁻¹. Vis-viva at perigee: $\sqrt{GM(2/r_1 - 1/a)} = 10.14$ km s⁻¹, so the first burn is 2.43 km s⁻¹; at apogee $10.14\cdot6700/42\,200 = 1.61$ km s⁻¹, so the second is 1.46 km s⁻¹. Total 3.9 km s⁻¹, and the trip takes half the ellipse's period, 5.3 hours.</p></div>
<p>Tides come from the <em>difference</em> of gravity across a body: the tidal acceleration across distance $d$ is about $2GMd/r^3$. The Moon's tidal effect on Earth is about 2.2 times the Sun's: the Sun pulls much harder overall, but it is so far away that its pull varies less across Earth. When they align (new and full moon) we get large <strong>spring tides</strong>; at quarter moons, small <strong>neap tides</strong>.</p>
<p>Tidal friction slows Earth's spin (days lengthen by about 2 ms per century) and pushes the Moon outward by 3.8 cm a year, measured with lasers reflected off mirrors left by Apollo astronauts.</p>` }
  });

  X('oscillations', {
    0: { html: R`<h3 class="sub">SHM from energy</h3>
<p>Any system whose restoring force is proportional to displacement, $F = -kx$, performs simple harmonic motion: $x = A\cos(\omega t + \phi)$ with $\omega = \sqrt{k/m}$, independent of amplitude. The energy $\tfrac12kA^2$ sloshes between kinetic and potential: $v = \pm\omega\sqrt{A^2 - x^2}$, so the speed is greatest at the centre and zero at the ends, and acceleration is greatest at the ends.</p>
<div class="worked"><p>A 0.2 kg mass on a spring ($k = 80$ N m⁻¹) is pulled 5 cm and released. Find the period, maximum speed and maximum acceleration.</p>
<p>$\omega = 20$ rad s⁻¹, $T = 0.314$ s; $v_{\max} = A\omega = 1$ m s⁻¹; $a_{\max} = A\omega^2 = 20$ m s⁻².</p></div>
<p>A mass hanging on a vertical spring oscillates with the same $\omega$ about its new equilibrium position: gravity just shifts the centre. Springs in series add like resistors in parallel ($1/k = 1/k_1 + 1/k_2$), and in parallel they add directly. The <strong>energy method</strong> finds $\omega$ quickly for any system: write $E = \tfrac12m_{\text{eff}}\dot x^2 + \tfrac12k_{\text{eff}}x^2$, then $\omega = \sqrt{k_{\text{eff}}/m_{\text{eff}}}$.</p>` },
    1: { html: R`<h3 class="sub">Physical pendulums and large amplitudes</h3>
<p>A rigid body pivoted a distance $d$ from its centre of mass has $I\ddot\theta = -mgd\sin\theta \approx -mgd\,\theta$, so</p>
<div class="key"><p>$T = 2\pi\sqrt{\dfrac{I}{mgd}}$</p></div>
<div class="worked"><p>Find the period of a 1 m metre rule swinging about one end. Where else could it be pivoted to give the same period?</p>
<p>$I = \tfrac13mL^2$, $d = L/2$: $T = 2\pi\sqrt{2L/(3g)} = 1.64$ s, the same as a simple pendulum of length $\tfrac23$ m. Pivoting at $d'$ with $dd' = k^2 = L^2/12$ (where $k$ is the radius of gyration) gives the same period: $d' = 1/6$ m from the centre.</p></div>
<p>That pair of pivots is the basis of Kater's reversible pendulum, which measured $g$ to about one part in $10^5$ without needing to know $I$.</p>
<p>At larger amplitudes $\theta_0$ the period grows: $T \approx T_0(1 + \theta_0^2/16)$. At 20° it is 0.8% longer, which matters for clocks. Huygens found that a bob following a cycloid path has a period exactly independent of amplitude.</p>` },
    2: { html: R`<h3 class="sub">Quality factor and three kinds of damping</h3>
<p>With a damping force $-b\dot x$, the equation $m\ddot x + b\dot x + kx = 0$ has solutions depending on $\gamma = b/(2m)$ compared with $\omega_0$:</p>
<ul><li><strong>Underdamped</strong> ($\gamma &lt; \omega_0$): oscillations decaying as $e^{-\gamma t}$, at $\omega = \sqrt{\omega_0^2 - \gamma^2}$.</li>
<li><strong>Critically damped</strong> ($\gamma = \omega_0$): returns to rest fastest without overshooting, as wanted in car suspensions and meter needles.</li>
<li><strong>Overdamped</strong>: creeps back slowly, like a door closer.</li></ul>
<p>The <strong>quality factor</strong> $Q = \omega_0/(2\gamma)$ measures how many oscillations a system makes before its energy decays: energy falls by a factor $e^{-2\pi/Q}$ per cycle, so $Q \approx 2\pi\times$ energy stored ÷ energy lost per cycle.</p>
<div class="worked"><p>A pendulum's amplitude falls from 10° to 5° in 100 swings. What is its $Q$?</p>
<p>Amplitude falls by half in 100 cycles, so energy by a quarter: $e^{-200\pi/Q} = \tfrac14$, $Q = 200\pi/\ln4 = 453$.</p></div>
<p>Typical $Q$ values: car suspension about 1, a guitar string about 1000, a quartz watch crystal about $10^5$, the best atomic clocks over $10^{15}$.</p>` },
    3: { html: R`<h3 class="sub">The response curve</h3>
<p>Driven by $F_0\cos\omega t$, a damped oscillator settles into motion at the driving frequency with amplitude</p>
<div class="key"><p>$A = \dfrac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}$</p></div>
<p>Far below resonance the mass follows the force in phase; far above, it moves opposite to it (phase lag 180°) with a tiny amplitude; at resonance it lags by 90° and the amplitude is $Q$ times the static displacement $F_0/k$. The resonance peak has width about $\omega_0/Q$: high-$Q$ systems respond strongly but only to a narrow band of frequencies.</p>
<div class="worked"><p>A quartz watch crystal resonates at 32 768 Hz with $Q = 10^5$. What is the bandwidth of its resonance?</p>
<p>$\Delta f \approx f_0/Q = 0.33$ Hz, which is why it keeps such good time. (And $32\,768 = 2^{15}$, so 15 halvings give exactly 1 Hz.)</p></div>
<p>Resonance can be destructive: soldiers break step on bridges, and the Millennium Bridge in London swayed in 2000 when pedestrians fell into step with its sideways motion. It can also be useful: radio tuning, MRI, microwave ovens and musical instruments all rely on it.</p>` },
    4: { html: R`<h3 class="sub">Two pendulums and beats</h3>
<p>Two identical pendulums (frequency $\omega_0$) joined by a weak spring have two <strong>normal modes</strong>: swinging together (the spring is never stretched, so $\omega_1 = \omega_0$) and swinging opposite (the spring adds restoring force, $\omega_2 = \sqrt{\omega_0^2 + 2k/m}$). Any motion is a superposition of these modes.</p>
<div class="worked"><p>One pendulum is pulled aside and released while the other is at rest. Describe what happens.</p>
<p>The initial state is half of each mode. Since the modes have slightly different frequencies, they drift in and out of phase: energy passes completely to the second pendulum and back, with the exchange happening at the beat frequency $\omega_2 - \omega_1$.</p></div>
<p>A system of $N$ coupled masses has $N$ normal modes. As $N\to\infty$ the masses become a continuous string, and the modes become its standing waves with frequencies $f_n = n\,v/(2L)$. In crystals, the quantised normal modes of the atoms are <strong>phonons</strong>, which carry heat and sound.</p>
<p>Coupled oscillations explain the Wilberforce pendulum (energy passing between bouncing and twisting) and how molecules such as CO<sub>2</sub> vibrate, which decides which infrared wavelengths they absorb: the root of the greenhouse effect.</p>` }
  });
})();
