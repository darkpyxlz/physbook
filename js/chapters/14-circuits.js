(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'circuits', num: 14, part: 'Electricity & Magnetism',
    title: 'Capacitors, Current and DC Circuits',
    subtitle: R`Storing charge in capacitors, driving it through resistors, analysing networks with Kirchhoff's rules, and watching RC circuits charge and discharge.`,
    goals: ['Compute capacitance and stored energy', 'Relate current to drift velocity and resistivity', 'Reduce networks and apply Kirchhoff’s rules', 'Use symmetry on resistor puzzles', 'Analyse RC charging and discharging'],
    sections: [
      {
        title: 'Capacitance',
        html: R`
<p>A capacitor is two conductors holding charges $+Q$ and $-Q$. The charge is proportional to the potential difference, $Q = CV$, and the capacitance $C$ depends only on geometry. For parallel plates of area $A$ and separation $d$:</p>
<div class="key">$$C = \frac{\varepsilon_0 A}{d},\qquad U = \frac12 CV^2 = \frac{Q^2}{2C} = \frac12 QV.$$</div>
<p>Filling the gap with a dielectric multiplies $C$ by its dielectric constant $\kappa$. Capacitors in parallel add ($C = C_1 + C_2$); in series, reciprocals add ($1/C = 1/C_1 + 1/C_2$).</p>
<div class="warn-box"><p>Know what is held fixed. If a capacitor stays connected to a battery, $V$ is fixed and inserting a dielectric increases $Q$ and $U$. If it is isolated, $Q$ is fixed and inserting a dielectric reduces $V$ and $U$ (the dielectric is pulled in).</p></div>`
      },
      {
        title: 'Current, resistance and power',
        html: R`
<p>Current is the rate of charge flow, $I = \dd Q/\dd t$. In a wire with $n$ carriers per unit volume, each of charge $q$, drifting at $v_d$:</p>
$$I = nqAv_d.$$
<p>Drift velocities are tiny, fractions of a millimetre per second, yet lights switch on instantly because the field propagates at nearly the speed of light.</p>
<p>Ohmic materials obey $V = IR$, with $R = \rho L/A$ for a uniform wire of resistivity $\rho$. Power dissipated in a resistor is</p>
<div class="key">$$P = IV = I^2R = \frac{V^2}{R}.$$</div>
<p>A real battery has an emf $\mathcal E$ and internal resistance $r$, so its terminal voltage is $\mathcal E - Ir$. It delivers maximum power to an external load when $R_{\text{load}} = r$, giving $P_{\max} = \mathcal E^2/(4r)$.</p>`
      },
      {
        title: "Networks and Kirchhoff's rules",
        html: R`
<p>Resistors in series add ($R = R_1 + R_2$); in parallel, reciprocals add ($1/R = 1/R_1 + 1/R_2$). When a network cannot be reduced this way, use <strong>Kirchhoff's rules</strong>:</p>
<ul>
<li><strong>Junction rule:</strong> the current into any junction equals the current out (charge conservation).</li>
<li><strong>Loop rule:</strong> the sum of potential changes around any closed loop is zero (energy conservation).</li>
</ul>
<p>Label unknown currents, write one equation per independent junction and loop, and solve. A negative answer simply means the current flows opposite to your guess.</p>
<div class="insight"><p>Olympiad resistor puzzles yield to symmetry. Points at the same potential can be joined by a wire, or a wire between them removed, without changing anything. For an infinite ladder, adding one more section leaves the network unchanged, so $R_{\text{eq}}$ satisfies a self-consistent equation. For a cube of resistors, current symmetry tells you how it splits at each corner.</p></div>
<details class="example"><summary><span class="lbl">Worked example</span>Find the equivalent resistance of an infinite ladder in which each section has a series resistor $R$ followed by a shunt resistor $R$.<span class="tog">Solution</span></summary><div class="sol"><p>Call the answer $x$. Adding one section in front gives $R$ in series with ($R$ parallel to $x$), which must equal $x$: $x = R + \dfrac{Rx}{R + x}$. So $x^2 - Rx - R^2 = 0$ and $x = \dfrac{1 + \sqrt5}{2}R$, the golden ratio.</p></div></details>`
      },
      {
        title: 'RC circuits',
        html: R`
<p>A capacitor charging through a resistor from an emf $\mathcal E$ obeys $\mathcal E = IR + Q/C$ with $I = \dd Q/\dd t$. The solution is exponential with time constant $\tau = RC$:</p>
<div class="key">$$\text{charging: } V_C = \mathcal E\left(1 - e^{-t/RC}\right),\qquad \text{discharging: } V_C = V_0e^{-t/RC}.$$</div>
<p>The current starts at $\mathcal E/R$ (an uncharged capacitor acts like a wire) and decays to zero (a fully charged capacitor acts like a break in the circuit). After $5\tau$ the capacitor is more than 99% charged.</p>
<p>A surprising result: when a capacitor charges from a battery through any resistor, exactly half of the energy delivered by the battery is stored and the other half is dissipated as heat, whatever the value of $R$.</p>`
      }
    ],
    labs: [
      { sim: 'rc', title: 'RC charging and discharging', desc: 'Capacitor voltage (top) and current (bottom). Dashed lines mark multiples of the time constant τ = RC.',
        tasks: ['Charge the capacitor and read V<sub>C</sub> at t = τ. It should be 63% of the emf.', 'Discharge it. What fraction remains after 2τ?', 'Double R and halve C. Does anything change? Why?'] }
    ],
    formulas: [
      ['Capacitance', R`C = Q/V`],
      ['Parallel plates', R`C = \varepsilon_0\kappa A/d`],
      ['Capacitor energy', R`U = \tfrac12 CV^2`],
      ['Current and drift', R`I = nqAv_d`],
      ['Resistance', R`R = \rho L/A`],
      ['Ohm’s law', R`V = IR`],
      ['Power', R`P = IV = I^2R = V^2/R`],
      ['Terminal voltage', R`V = \mathcal E - Ir`],
      ['Max power transfer', R`P_{\max} = \mathcal E^2/4r`],
      ['RC time constant', R`\tau = RC`],
      ['Charging', R`V_C = \mathcal E(1 - e^{-t/RC})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Dielectric in an isolated capacitor',
        q: R`<p>A charged capacitor is disconnected from its battery. A dielectric slab is then inserted between its plates. The voltage across it:</p>`,
        options: ['Increases', 'Decreases', 'Stays the same', 'Drops to zero'], answer: 1,
        hints: [R`$Q$ is fixed and $C$ increases.`],
        solution: R`<p>$V = Q/C$ with $Q$ fixed and $C$ larger, so $V$ falls. The stored energy $Q^2/(2C)$ also falls.</p>` },
      { level: 'concept', type: 'mcq', title: 'Another bulb',
        q: R`<p>Two identical bulbs are in series with a battery. A third identical bulb is added in series. The original two bulbs:</p>`,
        options: ['Get brighter', 'Get dimmer', 'Stay equally bright', 'Go out'], answer: 1,
        hints: [R`The total resistance rises, so the current falls.`],
        solution: R`<p>The current drops to two-thirds of its value, so the power in each bulb ($I^2R$) drops to four-ninths.</p>` },
      { level: 'concept', type: 'mcq', title: 'The first instant',
        q: R`<p>An uncharged capacitor is connected to a battery through a resistor. Immediately after the switch closes, the capacitor behaves like:</p>`,
        options: ['An open circuit (a break)', 'A short circuit (a plain wire)', 'A second battery', 'A resistor of value R'], answer: 1,
        hints: [R`The voltage across a capacitor is $Q/C$, and $Q$ cannot change instantly.`],
        solution: R`<p>At $t = 0$, $Q = 0$ so $V_C = 0$: no voltage across it, like a wire. The full emf appears across the resistor, giving $I = \mathcal E/R$.</p>` },
      { level: 'core', type: 'num', title: 'Parallel plates',
        q: R`<p>A parallel-plate capacitor has plates of area $0.020\ \mathrm{m^2}$ separated by $1.0\ \mathrm{mm}$ of air. Find its capacitance in picofarads.</p>`,
        answer: 8.854e-12 * 0.02 / 1e-3 * 1e12, tol: 0.01, unit: 'pF',
        hints: [R`$C = \varepsilon_0A/d$.`],
        solution: R`<p>$C = (8.854\times10^{-12})(0.020)/(1.0\times10^{-3}) = 1.77\times10^{-10}\ \mathrm F = 177\ \mathrm{pF}$.</p>` },
      { level: 'core', type: 'num', title: 'Current divider',
        q: R`<p>A $6\ \Omega$ and a $3\ \Omega$ resistor are in parallel, and the pair is in series with a $4\ \Omega$ resistor across a $12\ \mathrm V$ battery. What current flows through the $3\ \Omega$ resistor?</p>`,
        answer: 4 / 3, tol: 0.01, unit: 'A',
        hints: [R`The parallel pair is $2\ \Omega$, so the total is $6\ \Omega$.`],
        solution: R`<p>Total current $= 12/6 = 2\ \mathrm A$. Voltage across the parallel pair $= 2 \times 2 = 4\ \mathrm V$, so $I_3 = 4/3 = 1.33\ \mathrm A$.</p>` },
      { level: 'core', type: 'num', title: 'Most power from a battery',
        q: R`<p>A battery has emf $12\ \mathrm V$ and internal resistance $0.50\ \Omega$. What is the maximum power it can deliver to an external resistor?</p>`,
        answer: 144 / 2, tol: 0.01, unit: 'W',
        hints: [R`Maximise $P = \mathcal E^2R/(R + r)^2$ over $R$.`],
        solution: R`<p>The maximum occurs at $R = r$, giving $P = \mathcal E^2/(4r) = 144/2.0 = 72\ \mathrm W$. At this point the battery is only 50% efficient.</p>` },
      { level: 'core', type: 'num', title: 'Discharging',
        q: R`<p>A $100\ \mu\mathrm F$ capacitor charged to $9.0\ \mathrm V$ discharges through a $10\ \mathrm{k}\Omega$ resistor. How long until its voltage is $3.0\ \mathrm V$?</p>`,
        answer: 1 * Math.log(3), tol: 0.01, unit: 's',
        hints: [R`$V = V_0e^{-t/RC}$ and $RC = 1.0\ \mathrm s$.`],
        solution: R`<p>$t = RC\ln(V_0/V) = (1.0\ \mathrm s)\ln 3 = 1.10\ \mathrm s$.</p>` },
      { level: 'core', type: 'num', title: 'Drift speed',
        q: R`<p>A copper wire of cross-section $2.0\ \mathrm{mm^2}$ carries $5.0\ \mathrm A$. Copper has $8.5\times10^{28}$ free electrons per cubic metre. What is the drift speed?</p>`,
        answer: 5 / (8.5e28 * 1.602e-19 * 2e-6), tol: 0.01, unit: 'm/s',
        hints: [R`$v_d = I/(nqA)$. Convert $\mathrm{mm^2}$ to $\mathrm{m^2}$.`],
        solution: R`<p>$v_d = \dfrac{5.0}{(8.5\times10^{28})(1.602\times10^{-19})(2.0\times10^{-6})} = 1.8\times10^{-4}\ \mathrm{m/s}$, less than a millimetre per second.</p>` },
      { level: 'olympiad', type: 'num', title: 'Infinite ladder',
        q: R`<p>An infinite ladder network is built from $1.0\ \Omega$ resistors: each section is one resistor in series along the rail followed by one resistor across to the return rail. What is the resistance measured at the input?</p>`,
        answer: (1 + Math.sqrt(5)) / 2, tol: 0.01, unit: 'Ω',
        hints: [R`Adding one more section at the front does not change an infinite ladder.`],
        solution: R`<p>$x = 1 + \dfrac{x}{1 + x}$ gives $x^2 - x - 1 = 0$, so $x = \dfrac{1 + \sqrt5}{2} = 1.618\ \Omega$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Resistor cube',
        q: R`<p>Twelve $1.0\ \Omega$ resistors form the edges of a cube. What is the resistance between two diagonally opposite corners of the cube?</p>`,
        answer: 5 / 6, tol: 0.01, unit: 'Ω',
        hints: [R`By symmetry, the current $I$ entering one corner splits equally into three edges, then each of those splits into two.`, R`Add up the voltage drops along any path: $I/3 + I/6 + I/3$.`],
        solution: R`<p>Current $I$ splits into three edges ($I/3$ each), then into six edges ($I/6$ each), then recombines into three edges ($I/3$ each). Along any path, $V = (I/3 + I/6 + I/3)R = \tfrac56 IR$, so $R_{\text{eq}} = 5/6\ \Omega = 0.833\ \Omega$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sharing charge',
        q: R`<p>A $4.0\ \mu\mathrm F$ capacitor charged to $100\ \mathrm V$ is connected across an uncharged $6.0\ \mu\mathrm F$ capacitor. How much energy is lost in the process?</p>`,
        answer: 0.5 * (4e-6 * 6e-6 / 10e-6) * 1e4, tol: 0.01, unit: 'J',
        hints: [R`Charge is conserved: the final common voltage is $Q/(C_1 + C_2)$.`, R`Compare the energies before and after.`],
        solution: R`<p>$Q = 400\ \mu\mathrm C$, final $V = 400/10 = 40\ \mathrm V$. Before: $\tfrac12(4\ \mu\mathrm F)(100)^2 = 0.020\ \mathrm J$. After: $\tfrac12(10\ \mu\mathrm F)(40)^2 = 0.008\ \mathrm J$. Lost: $0.012\ \mathrm J$, which equals $\tfrac12\dfrac{C_1C_2}{C_1 + C_2}V_0^2$. It goes into heat in the wires and radiation, however small their resistance.</p>` }
    ]
  });
})();
