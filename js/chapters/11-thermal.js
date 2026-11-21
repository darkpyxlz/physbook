(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'thermal', num: 11, part: 'Thermal Physics',
    title: 'Temperature, Heat and Kinetic Theory',
    subtitle: R`What temperature really measures, how heat moves by conduction, convection and radiation, and how the pressure of a gas emerges from molecules bouncing off walls.`,
    goals: ['Handle thermal expansion and calorimetry', 'Compute conduction, cooling and radiation rates', 'Derive gas pressure from molecular motion', 'Use equipartition and the Maxwell distribution', 'Estimate mean free paths'],
    sections: [
      {
        title: 'Temperature and thermal expansion',
        html: R`
<p>Two bodies in thermal contact eventually stop exchanging energy; they are then at the same <strong>temperature</strong>. The zeroth law (if A and B are each in equilibrium with C, they are in equilibrium with each other) is what makes thermometers possible. The SI scale is kelvin: $T(\mathrm K) = T(^\circ\mathrm C) + 273.15$.</p>
<p>Most solids expand when heated. For a length $L$, area $A$ or volume $V$:</p>
$$\Delta L = \alpha L\,\Delta T,\qquad \Delta A \approx 2\alpha A\,\Delta T,\qquad \Delta V = \beta V\,\Delta T,\ \ \beta \approx 3\alpha.$$
<p>Every dimension scales by the same factor, so a hole in a heated plate gets <em>bigger</em>, just as if it were made of the same material. Water is famously anomalous: it is densest at $4^\circ\mathrm C$, which is why lakes freeze from the top.</p>`
      },
      {
        title: 'Heat and calorimetry',
        html: R`
<p>Heat $Q$ is energy transferred because of a temperature difference. Raising the temperature of a mass $m$ takes</p>
<div class="key">$$Q = mc\,\Delta T,$$</div>
<p>with specific heat $c$ ($4186\ \mathrm{J\,kg^{-1}K^{-1}}$ for water, unusually large). A phase change happens at constant temperature and needs latent heat: $Q = mL$. For water, $L_f = 3.34\times10^5\ \mathrm{J/kg}$ (melting) and $L_v = 2.26\times10^6\ \mathrm{J/kg}$ (boiling).</p>
<p>In an insulated mixture, the heat lost by hot bodies equals the heat gained by cold ones: $\sum Q_i = 0$. Be careful to check whether all the ice actually melts before assuming a final temperature above $0^\circ\mathrm C$.</p>`
      },
      {
        title: 'Heat transfer',
        html: R`
<p><strong>Conduction</strong> through a slab of area $A$, thickness $d$ and conductivity $k$:</p>
$$P = \frac{kA\,\Delta T}{d}.$$
<p>The thermal resistance $R = d/(kA)$ adds in series and combines in parallel exactly like electrical resistance, with temperature difference playing the role of voltage.</p>
<p><strong>Convection</strong> carries heat with moving fluid. A common model is <strong>Newton's law of cooling</strong>, $\dd T/\dd t = -\kappa(T - T_{\text{env}})$, giving exponential approach to room temperature.</p>
<p><strong>Radiation</strong>: every surface emits electromagnetic waves. A black body radiates</p>
<div class="key">$$P = \sigma A T^4,\qquad \lambda_{\max}T = 2.898\times10^{-3}\ \mathrm{m\,K}\ \ \text{(Wien's law)}.$$</div>
<p>Real surfaces radiate $\varepsilon\sigma AT^4$ with emissivity $\varepsilon \le 1$, and good emitters are also good absorbers.</p>
<div class="insight"><p>Energy balance gives planetary temperatures. A planet at distance $d$ from a star of radius $R_\star$ and temperature $T_\star$, absorbing a fraction $1 - a$ of sunlight on a disc and radiating from its whole sphere, reaches $T = T_\star\sqrt{R_\star/(2d)}\,(1 - a)^{1/4}$.</p></div>`
      },
      {
        title: 'Kinetic theory of gases',
        html: R`
<p>An ideal gas obeys $PV = nRT = Nk_BT$, with $R = 8.314\ \mathrm{J\,mol^{-1}K^{-1}}$ and $k_B = R/N_A = 1.381\times10^{-23}\ \mathrm{J/K}$.</p>
<p>Where does pressure come from? A molecule bouncing off a wall delivers impulse $2mv_x$. Counting the collisions per second on area $A$ and averaging over molecules gives</p>
<div class="key">$$P = \tfrac13\,n\,m\,\langle v^2\rangle\quad\Rightarrow\quad \tfrac12 m\langle v^2\rangle = \tfrac32 k_BT,$$</div>
<p>where $n = N/V$. <strong>Temperature measures the average translational kinetic energy per molecule.</strong> The root-mean-square speed is $v_{\text{rms}} = \sqrt{3k_BT/m} = \sqrt{3RT/M}$, about $500\ \mathrm{m/s}$ for air.</p>
<h3>Equipartition</h3>
<p>Each quadratic term in a molecule's energy gets $\tfrac12 k_BT$ on average. A monatomic gas has 3 translational terms, so $U = \tfrac32 nRT$. A diatomic molecule adds 2 rotations: $U = \tfrac52 nRT$. Vibrations only switch on at high temperatures.</p>
<h3>Distribution of speeds and mean free path</h3>
<p>Molecular speeds follow the Maxwell–Boltzmann distribution, peaked near $\sqrt{2k_BT/m}$ with a long high-speed tail. Between collisions a molecule of diameter $d$ travels on average</p>
$$\lambda = \frac{k_BT}{\sqrt2\,\pi d^2 P},$$
<p>tens of nanometres in air at room conditions: hundreds of molecular diameters.</p>`
      }
    ],
    labs: [
      { sim: 'gas', title: 'A gas in a box', desc: 'Hard-disc molecules in a 2D box. The histogram shows their speeds against the 2D Maxwell distribution, and the readout compares the measured wall pressure with P = NkT/A.',
        tasks: ['Start all molecules with similar speeds (press Re-thermalise), then watch collisions spread the histogram into the Maxwell shape.', 'Double N at fixed T. Does P double?', 'Push the piston in quickly and watch the measured temperature rise. This is adiabatic compression.', 'Pull the piston out slowly. Does the gas cool?', 'The measured pressure comes out a few per cent above NkT/A. Why? (Hint: the molecules are not points.)'] }
    ],
    formulas: [
      ['Linear expansion', R`\Delta L = \alpha L\Delta T`],
      ['Specific heat', R`Q = mc\Delta T`],
      ['Latent heat', R`Q = mL`],
      ['Conduction', R`P = kA\Delta T/d`],
      ['Newton cooling', R`T - T_e = (T_0 - T_e)e^{-\kappa t}`],
      ['Stefan–Boltzmann', R`P = \varepsilon\sigma AT^4`],
      ['Wien’s law', R`\lambda_{\max}T = 2.898\times10^{-3}\ \mathrm{m\,K}`],
      ['Ideal gas', R`PV = nRT = Nk_BT`],
      ['Kinetic pressure', R`P = \tfrac13 nm\langle v^2\rangle`],
      ['Mean kinetic energy', R`\tfrac12 m\langle v^2\rangle = \tfrac32 k_BT`],
      ['RMS speed', R`v_{\text{rms}} = \sqrt{3RT/M}`],
      ['Mean free path', R`\lambda = k_BT/(\sqrt2\pi d^2P)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Heated washer',
        q: R`<p>A metal plate with a circular hole in it is heated uniformly. The hole:</p>`,
        options: ['Gets smaller', 'Gets larger', 'Stays the same size', 'Becomes oval'], answer: 1,
        hints: [R`Imagine the hole filled with a disc of the same metal. What would the disc do?`],
        solution: R`<p>Uniform expansion scales every length by the same factor, including the hole's diameter. Engineers heat a ring to slip it onto a shaft.</p>` },
      { level: 'concept', type: 'mcq', title: 'Hydrogen and oxygen',
        q: R`<p>Hydrogen and oxygen gases are at the same temperature. Which is true?</p>`,
        options: ['Their molecules have the same average speed', 'Their molecules have the same average translational kinetic energy', 'Oxygen molecules have more kinetic energy on average', 'Hydrogen molecules have more kinetic energy on average'], answer: 1,
        hints: [R`$\tfrac12 m\langle v^2\rangle = \tfrac32 k_BT$ depends only on $T$.`],
        solution: R`<p>Same $T$ means the same average translational kinetic energy. Hydrogen, being 16 times lighter, moves 4 times faster on average. That is why Earth has lost its hydrogen to space.</p>` },
      { level: 'concept', type: 'mcq', title: 'Hotter star',
        q: R`<p>If a star's surface temperature doubled at fixed radius, its power output would increase by a factor of:</p>`,
        options: ['2', '4', '8', '16'], answer: 3,
        hints: [R`$P \propto T^4$.`],
        solution: R`<p>$2^4 = 16$. Its peak wavelength would also halve (Wien's law).</p>` },
      { level: 'core', type: 'num', title: 'Mixing water',
        q: R`<p>$0.20\ \mathrm{kg}$ of water at $80^\circ\mathrm C$ is mixed with $0.30\ \mathrm{kg}$ of water at $20^\circ\mathrm C$ in an insulated cup. What is the final temperature in °C?</p>`,
        answer: (0.2 * 80 + 0.3 * 20) / 0.5, tol: 0.01, unit: '°C',
        hints: [R`With the same substance, the final temperature is the mass-weighted average.`],
        solution: R`<p>$T = \dfrac{0.20(80) + 0.30(20)}{0.50} = 44^\circ\mathrm C$.</p>` },
      { level: 'core', type: 'num', title: 'From ice to water',
        q: R`<p>How much heat is needed to turn $0.50\ \mathrm{kg}$ of ice at $-10^\circ\mathrm C$ into water at $20^\circ\mathrm C$? ($c_{\text{ice}} = 2100$, $c_{\text{water}} = 4186\ \mathrm{J\,kg^{-1}K^{-1}}$, $L_f = 3.34\times10^5\ \mathrm{J/kg}$)</p>`,
        answer: 0.5 * (2100 * 10 + 3.34e5 + 4186 * 20), tol: 0.01, unit: 'J',
        hints: [R`Three stages: warm the ice to $0^\circ\mathrm C$, melt it, warm the water.`],
        solution: R`<p>$Q = 0.50[2100(10) + 3.34\times10^5 + 4186(20)] = 0.50(21\,000 + 334\,000 + 83\,720) = 2.19\times10^5\ \mathrm{J}$. Melting dominates.</p>` },
      { level: 'core', type: 'num', title: 'Nitrogen speed',
        q: R`<p>What is the rms speed of nitrogen molecules ($M = 0.028\ \mathrm{kg/mol}$) at $300\ \mathrm{K}$?</p>`,
        answer: Math.sqrt(3 * 8.314 * 300 / 0.028), tol: 0.01, unit: 'm/s',
        hints: [R`$v_{\text{rms}} = \sqrt{3RT/M}$.`],
        solution: R`<p>$v_{\text{rms}} = \sqrt{3(8.314)(300)/0.028} = 517\ \mathrm{m/s}$, faster than sound, as you would expect since sound is carried by molecular motion.</p>` },
      { level: 'core', type: 'num', title: 'Heat through a window',
        q: R`<p>A $1.0\ \mathrm{m^2}$ pane of glass ($k = 0.80\ \mathrm{W\,m^{-1}K^{-1}}$) is $4.0\ \mathrm{mm}$ thick. Its faces are at temperatures differing by $20\ \mathrm{K}$. What is the rate of heat flow?</p>`,
        answer: 0.8 * 1 * 20 / 0.004, tol: 0.01, unit: 'W',
        hints: [R`$P = kA\Delta T/d$.`],
        solution: R`<p>$P = (0.80)(1.0)(20)/0.0040 = 4000\ \mathrm{W}$. In reality, thin air layers on each side of the glass add much more thermal resistance than the glass itself, which is why double glazing works.</p>` },
      { level: 'core', type: 'num', title: 'Rail gap',
        q: R`<p>A $25\ \mathrm{m}$ steel rail ($\alpha = 1.2\times10^{-5}\ \mathrm{K^{-1}}$) warms by $40\ \mathrm{K}$. How much does it lengthen, in millimetres?</p>`,
        answer: 25 * 1.2e-5 * 40 * 1000, tol: 0.01, unit: 'mm',
        hints: [R`$\Delta L = \alpha L\Delta T$.`],
        solution: R`<p>$\Delta L = (1.2\times10^{-5})(25)(40) = 0.012\ \mathrm m = 12\ \mathrm{mm}$.</p>` },
      { level: 'olympiad', type: 'num', title: "Earth's temperature",
        q: R`<p>Estimate Earth's average surface temperature with no greenhouse effect. The Sun has surface temperature $5778\ \mathrm K$ and radius $6.96\times10^8\ \mathrm m$; Earth orbits at $1.496\times10^{11}\ \mathrm m$ and reflects 30% of incoming sunlight. Treat Earth as a black body radiator with uniform temperature.</p>`,
        answer: 5778 * Math.sqrt(6.96e8 / (2 * 1.496e11)) * Math.pow(0.7, 0.25), tol: 0.01, unit: 'K',
        hints: [R`Absorbed: $(1-a)\,\sigma T_\odot^4 (R_\odot/d)^2\,\pi R_E^2$. Emitted: $\sigma T^4\,4\pi R_E^2$.`],
        solution: R`<p>Balancing absorbed and emitted power, $(1-a)T_\odot^4\dfrac{R_\odot^2}{d^2}\pi R_E^2 = T^4\,4\pi R_E^2$, so</p>$$T = T_\odot\sqrt{\frac{R_\odot}{2d}}\,(1-a)^{1/4} = 5778\times0.0482\times0.915 = 255\ \mathrm K.$$<p>That is $-18^\circ\mathrm C$. The actual average, about $288\ \mathrm K$, is higher because of the greenhouse effect.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cooling coffee',
        q: R`<p>A cup of coffee at $90^\circ\mathrm C$ sits in a $20^\circ\mathrm C$ room. After 10 minutes it is at $60^\circ\mathrm C$. Assuming Newton's law of cooling, after how many minutes (from the start) does it reach $40^\circ\mathrm C$?</p>`,
        answer: 10 * Math.log(3.5) / Math.log(1.75), tol: 0.01, unit: 'min',
        hints: [R`$T - 20 = 70e^{-\kappa t}$. Use the 10-minute data to find $e^{-10\kappa}$.`],
        solution: R`<p>$40 = 70e^{-10\kappa}$ gives $e^{-10\kappa} = 4/7$. Then $20 = 70e^{-\kappa t}$ gives $e^{-\kappa t} = 2/7$, so $t = 10\dfrac{\ln(7/2)}{\ln(7/4)} = 22.4\ \mathrm{min}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mean free path',
        q: R`<p>Estimate the mean free path of nitrogen molecules (diameter $3.7\times10^{-10}\ \mathrm m$) at $273\ \mathrm K$ and $1.013\times10^5\ \mathrm{Pa}$. Give the answer in nanometres.</p>`,
        answer: 1.381e-23 * 273 / (Math.SQRT2 * Math.PI * 3.7e-10 * 3.7e-10 * 1.013e5) * 1e9, tol: 0.02, unit: 'nm',
        hints: [R`A molecule sweeps out a collision cylinder of cross-section $\pi d^2$. The $\sqrt2$ accounts for the motion of the other molecules.`],
        solution: R`<p>$\lambda = \dfrac{k_BT}{\sqrt2\pi d^2P} = \dfrac{(1.381\times10^{-23})(273)}{1.414\pi(3.7\times10^{-10})^2(1.013\times10^5)} = 6.1\times10^{-8}\ \mathrm m \approx 61\ \mathrm{nm}$, about 170 molecular diameters and 18 times the average spacing between molecules.</p>` }
    ]
  });
})();
