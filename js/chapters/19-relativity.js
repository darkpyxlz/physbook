(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'relativity', num: 19, part: 'Modern Physics',
    title: 'Special Relativity',
    subtitle: R`Two postulates overturn absolute time. Time dilation, length contraction, the Lorentz transformation, spacetime diagrams, and the energy–momentum relation behind E = mc².`,
    goals: ['Derive time dilation from a light clock', 'Use the Lorentz transformation and velocity addition', 'Read Minkowski diagrams and the invariant interval', 'Apply relativistic energy and momentum', 'Compute threshold energies for particle reactions'],
    sections: [
      {
        title: 'The postulates',
        html: R`
<p>Einstein built special relativity on two postulates:</p>
<ol>
<li>The laws of physics are the same in every inertial frame.</li>
<li>The speed of light in vacuum, $c$, is the same in every inertial frame, regardless of the motion of the source or observer.</li>
</ol>
<p>The second postulate clashes with everyday velocity addition, and the Michelson–Morley experiment found no sign of an "ether wind". Something about space and time had to give.</p>
<p>The first casualty is <strong>simultaneity</strong>. A flash at the centre of a moving train car reaches both ends at the same time for a passenger, but for a platform observer the rear wall rushes toward the light and the front wall away, so the rear is hit first. Whether two distant events are simultaneous depends on the frame.</p>`
      },
      {
        title: 'Time dilation and length contraction',
        html: R`
<p>Consider a light clock: a pulse bouncing between two mirrors a distance $L$ apart. In its rest frame each tick takes $\Delta\tau = 2L/c$. Seen moving at speed $v$, the light travels a longer diagonal path at the same speed $c$, so each tick takes longer:</p>
<div class="key">$$\Delta t = \gamma\,\Delta\tau,\qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}.$$</div>
<p>$\Delta\tau$ is the <strong>proper time</strong>, measured by a clock present at both events. Moving clocks run slow. Muons created high in the atmosphere live only $2.2\ \mu\mathrm s$ at rest, yet reach the ground because their clocks are dilated.</p>
<p>A rod of proper length $L_0$ moving along its length is measured to be shorter:</p>
<div class="key">$$L = \frac{L_0}{\gamma}.$$</div>
<p>From the muon's point of view, its lifetime is normal but the atmosphere is contracted. Both frames agree on whether it reaches the ground.</p>`
      },
      {
        title: 'Lorentz transformation and spacetime',
        html: R`
<p>For frame $S'$ moving at $v$ along $x$ relative to $S$, with $\beta = v/c$:</p>
<div class="key">$$x' = \gamma(x - vt),\qquad t' = \gamma\left(t - \frac{vx}{c^2}\right).$$</div>
<p>The $vx/c^2$ term is the relativity of simultaneity. Velocities do not simply add: an object moving at $u$ in $S'$ moves at</p>
$$w = \frac{u + v}{1 + uv/c^2}$$
<p>in $S$, which never exceeds $c$.</p>
<h3>The invariant interval</h3>
<p>Different observers disagree about $\Delta t$ and $\Delta x$, but all agree on</p>
<div class="key">$$(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2.$$</div>
<p>If it is positive (timelike), one event can cause the other and every observer sees them in the same order. If negative (spacelike), no signal can connect them, and different observers can disagree about their order. On a Minkowski diagram, light travels on $45^\circ$ lines, and the axes of a moving frame tilt symmetrically toward the light line.</p>
<div class="insight"><p>The twin paradox is resolved by proper time. The travelling twin's worldline has a kink at turnaround, and along any path between two events the elapsed proper time is $\int\dd t/\gamma$, which is greatest for the straight (inertial) worldline. The stay-at-home twin ages more.</p></div>`
      },
      {
        title: 'Relativistic energy and momentum',
        html: R`
<p>To keep momentum conserved in every frame, momentum and energy must be redefined:</p>
<div class="key">$$\vec p = \gamma m\vec v,\qquad E = \gamma mc^2,\qquad E^2 = (pc)^2 + (mc^2)^2.$$</div>
<p>At rest a particle still has energy $mc^2$. Kinetic energy is $K = (\gamma - 1)mc^2$, which reduces to $\tfrac12mv^2$ at low speed. Massless particles such as photons have $E = pc$ and always move at $c$. Particle physicists measure mass in $\mathrm{MeV}/c^2$: the electron is $0.511$ and the proton $938.3$.</p>
<p>In any reaction, total energy and total momentum are conserved, but rest mass is not: kinetic energy can turn into new particles and vice versa.</p>
<div class="insight"><p>For threshold problems, use the invariant $E_{\text{tot}}^2 - (p_{\text{tot}}c)^2$, which is the same in every frame. At threshold, the products are created at rest in the centre-of-momentum frame, so this invariant equals $\left(\sum m_{\text{products}}c^2\right)^2$. Evaluate it in the lab frame and solve.</p></div>
<p>The relativistic Doppler shift for a source receding at speed $\beta c$ is $f_{\text{obs}} = f\sqrt{\dfrac{1 - \beta}{1 + \beta}}$, the basis of measuring redshifts of galaxies.</p>`
      }
    ],
    labs: [
      { sim: 'spacetime', title: 'Minkowski diagram', desc: 'Drag events A and B. The blue axes belong to frame S′, moving at β relative to S. Red dashed lines join events that S′ considers simultaneous with each event.',
        tasks: ['Place A and B at the same ct but different x. Increase β. In S′, which event happens first?', 'Make the interval between A and B timelike. Can any β reverse their order?', 'Put A and B on a light line. What happens to the interval as you change β?'] }
    ],
    formulas: [
      ['Lorentz factor', R`\gamma = 1/\sqrt{1 - v^2/c^2}`],
      ['Time dilation', R`\Delta t = \gamma\Delta\tau`],
      ['Length contraction', R`L = L_0/\gamma`],
      ['Lorentz transformation', R`x' = \gamma(x - vt),\ t' = \gamma(t - vx/c^2)`],
      ['Velocity addition', R`w = \frac{u + v}{1 + uv/c^2}`],
      ['Interval', R`\Delta s^2 = c^2\Delta t^2 - \Delta x^2`],
      ['Momentum', R`p = \gamma mv`],
      ['Energy', R`E = \gamma mc^2`],
      ['Energy–momentum', R`E^2 = (pc)^2 + (mc^2)^2`],
      ['Kinetic energy', R`K = (\gamma - 1)mc^2`],
      ['Relativistic Doppler', R`f_{\text{obs}} = f\sqrt{\frac{1-\beta}{1+\beta}}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Moving clocks',
        q: R`<p>A spaceship passes Earth at high speed. According to observers on Earth, the clocks on the ship:</p>`,
        options: ['Run fast', 'Run slow', 'Run at the normal rate', 'Stop'], answer: 1,
        hints: [R`$\Delta t = \gamma\Delta\tau$ with $\gamma \gt 1$.`],
        solution: R`<p>Earth observers see the ship's clocks run slow. The effect is symmetric: the ship's crew sees Earth's clocks run slow too.</p>` },
      { level: 'concept', type: 'mcq', title: 'Chasing light',
        q: R`<p>You fly toward a lamp at $0.5c$. What speed do you measure for its light?</p>`,
        options: [R`$1.5c$`, R`$c$`, R`$0.5c$`, R`$c/\sqrt{1 - 0.25}$`], answer: 1,
        hints: [R`Second postulate.`],
        solution: R`<p>Every inertial observer measures $c$. The light's frequency is Doppler-shifted, but not its speed.</p>` },
      { level: 'concept', type: 'mcq', title: 'Order of events',
        q: R`<p>Two events are separated by a spacelike interval. Which is true?</p>`,
        options: ['All observers agree which happened first', 'Different observers may disagree about which happened first', 'The events must be simultaneous in every frame', 'One event must have caused the other'], answer: 1,
        hints: [R`Can a light signal connect the events?`],
        solution: R`<p>For spacelike separation, no signal can connect them, and observers moving at different speeds can find either order, or simultaneity. Causality is safe because neither event can influence the other.</p>` },
      { level: 'core', type: 'num', title: 'Muons reach the ground',
        q: R`<p>Muons have a mean lifetime of $2.2\ \mu\mathrm s$ at rest. How far, on average, does a muon travel in the Earth's frame if it moves at $0.995c$? ($c = 2.998\times10^8\ \mathrm{m/s}$)</p>`,
        answer: 0.995 * 2.998e8 * 2.2e-6 / Math.sqrt(1 - 0.995 * 0.995), tol: 0.01, unit: 'm',
        hints: [R`$\gamma = 1/\sqrt{1 - 0.995^2} \approx 10$.`],
        solution: R`<p>$\gamma = 10.0$, so the dilated lifetime is $22\ \mu\mathrm s$ and the distance is $\gamma v\tau = 6.57\ \mathrm{km}$. Without dilation it would be only $656\ \mathrm m$.</p>` },
      { level: 'core', type: 'num', title: 'Short spaceship',
        q: R`<p>A spaceship is $100\ \mathrm m$ long in its own frame. How long is it measured to be as it passes Earth at $0.60c$?</p>`,
        answer: 80, tol: 0.01, unit: 'm',
        hints: [R`$\gamma = 1.25$ at $0.6c$.`],
        solution: R`<p>$L = L_0/\gamma = 100 \times 0.80 = 80\ \mathrm m$.</p>` },
      { level: 'core', type: 'num', title: 'Closing speed',
        q: R`<p>Two spaceships fly directly away from Earth in opposite directions, one at $0.60c$ and the other at $0.70c$. What speed does one measure for the other, as a fraction of $c$?</p>`,
        answer: 1.3 / 1.42, tol: 0.005, unit: 'c',
        hints: [R`$w = (u + v)/(1 + uv/c^2)$.`],
        solution: R`<p>$w = \dfrac{0.60 + 0.70}{1 + 0.42}c = 0.915c$.</p>` },
      { level: 'core', type: 'num', title: 'Fast electron',
        q: R`<p>An electron ($mc^2 = 0.511\ \mathrm{MeV}$) moves at $0.90c$. What is its kinetic energy in MeV?</p>`,
        answer: 0.511 * (1 / Math.sqrt(1 - 0.81) - 1), tol: 0.01, unit: 'MeV',
        hints: [R`$K = (\gamma - 1)mc^2$.`],
        solution: R`<p>$\gamma = 1/\sqrt{0.19} = 2.29$, so $K = 1.29 \times 0.511 = 0.661\ \mathrm{MeV}$. The classical formula would give only $0.207\ \mathrm{MeV}$.</p>` },
      { level: 'core', type: 'num', title: 'Proton momentum',
        q: R`<p>A proton ($mc^2 = 938.3\ \mathrm{MeV}$) has total energy $2.00\ \mathrm{GeV}$. Find its momentum in $\mathrm{MeV}/c$.</p>`,
        answer: Math.sqrt(2000 * 2000 - 938.3 * 938.3), tol: 0.01, unit: 'MeV/c',
        hints: [R`$(pc)^2 = E^2 - (mc^2)^2$.`],
        solution: R`<p>$pc = \sqrt{2000^2 - 938.3^2} = 1766\ \mathrm{MeV}$, so $p = 1.77\ \mathrm{GeV}/c$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Making antiprotons',
        q: R`<p>Antiprotons are made by firing protons at protons at rest: $p + p \to p + p + p + \bar p$. What is the minimum kinetic energy of the beam proton, in GeV? ($m_pc^2 = 0.9383\ \mathrm{GeV}$)</p>`,
        answer: 6 * 0.9383, tol: 0.01, unit: 'GeV',
        hints: [R`Evaluate $E_{\text{tot}}^2 - (p_{\text{tot}}c)^2$ in the lab: $(E + mc^2)^2 - (pc)^2 = 2mc^2E + 2(mc^2)^2$.`, R`At threshold, this invariant equals $(4mc^2)^2$.`],
        solution: R`<p>In the lab, $E_{\text{tot}}^2 - (pc)^2 = 2(mc^2)^2 + 2mc^2E$. At threshold it equals $(4mc^2)^2$, so $E = 7mc^2$ and $K = 6mc^2 = 5.63\ \mathrm{GeV}$. This is why the Bevatron, which discovered the antiproton in 1955, was built for about $6\ \mathrm{GeV}$. Note that only $2mc^2$ goes into new mass; the rest is needed to conserve momentum.</p>` },
      { level: 'olympiad', type: 'num', title: 'Receding galaxy',
        q: R`<p>The hydrogen-alpha line, emitted at $656.3\ \mathrm{nm}$, is observed at $721.9\ \mathrm{nm}$ in the spectrum of a distant galaxy. Using the relativistic Doppler formula, find the galaxy's recession speed as a fraction of $c$.</p>`,
        answer: (Math.pow(721.9 / 656.3, 2) - 1) / (Math.pow(721.9 / 656.3, 2) + 1), tol: 0.01, unit: 'c',
        hints: [R`$\lambda_{\text{obs}}/\lambda = \sqrt{(1 + \beta)/(1 - \beta)}$.`],
        solution: R`<p>$(1 + z)^2 = (721.9/656.3)^2 = 1.210 = \dfrac{1 + \beta}{1 - \beta}$, so $\beta = \dfrac{1.210 - 1}{1.210 + 1} = 0.095$. (For cosmological redshifts the expansion of space matters, but at $z = 0.1$ this is a good approximation.)</p>` },
      { level: 'olympiad', type: 'num', title: 'Twin paradox',
        q: R`<p>One twin travels at $0.80c$ to a star $4.0$ light-years away (in Earth's frame) and immediately returns at the same speed. How many years older is the travelling twin on return?</p>`,
        answer: 6, tol: 0.01, unit: 'years',
        hints: [R`In Earth's frame the trip takes $2 \times 4.0/0.80 = 10$ years.`, R`Divide by $\gamma = 5/3$.`],
        solution: R`<p>Earth time: $10$ years. The traveller's proper time is $10/\gamma = 10 \times 0.6 = 6.0$ years. The asymmetry comes from the traveller changing inertial frames at the turnaround.</p>` }
    ]
  });
})();
