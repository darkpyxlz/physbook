(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'thermodynamics', num: 12, part: 'Thermal Physics',
    title: 'The Laws of Thermodynamics',
    subtitle: R`Energy conservation for heat and work, the processes an ideal gas can follow, heat engines and refrigerators, and entropy: the reason heat flows from hot to cold.`,
    goals: ['Apply the first law with correct sign conventions', 'Analyse isothermal, adiabatic, isobaric and isochoric processes', 'Compute efficiencies of engine cycles', 'Calculate entropy changes', 'Find the maximum work extractable from a system'],
    sections: [
      {
        title: 'The first law',
        html: R`
<p>Energy is conserved when heat is included. For a system that absorbs heat $Q$ and does work $W$ on its surroundings:</p>
<div class="key">$$\Delta U = Q - W,\qquad W = \int P\,\dd V.$$</div>
<p>Work is the area under the process curve on a $P$–$V$ diagram, and it depends on the path. Internal energy $U$ is a <strong>state function</strong>: it depends only on the state, not on how the system got there. For an ideal gas, $U$ depends on temperature alone: $U = nC_VT$.</p>
<div class="warn-box"><p>Some books (especially in chemistry) write $\Delta U = Q + W$ with $W$ the work done <em>on</em> the gas. Always check which convention a problem uses.</p></div>`
      },
      {
        title: 'Ideal-gas processes',
        html: R`
<p>Molar heat capacities depend on the path. At constant volume, $C_V = \tfrac f2 R$ ($f$ = degrees of freedom: 3 for monatomic, 5 for diatomic). At constant pressure the gas also does work, so $C_P = C_V + R$ (Mayer's relation). Their ratio is $\gamma = C_P/C_V = 1 + 2/f$.</p>
<div class="table-wrap"><table><thead><tr><th>Process</th><th>Constant</th><th>Work by gas</th><th>Heat in</th></tr></thead><tbody>
<tr><td>Isochoric</td><td>$V$</td><td>$0$</td><td>$nC_V\Delta T$</td></tr>
<tr><td>Isobaric</td><td>$P$</td><td>$P\Delta V$</td><td>$nC_P\Delta T$</td></tr>
<tr><td>Isothermal</td><td>$T$</td><td>$nRT\ln(V_2/V_1)$</td><td>$= W$</td></tr>
<tr><td>Adiabatic</td><td>$PV^\gamma$</td><td>$\dfrac{P_1V_1 - P_2V_2}{\gamma - 1}$</td><td>$0$</td></tr>
</tbody></table></div>
<p>In an adiabatic process $TV^{\gamma-1}$ is also constant, so compressing a gas heats it. A diesel engine ignites fuel this way, without a spark.</p>
<details class="example"><summary><span class="lbl">Worked example</span>Why is an adiabat steeper than an isotherm on a $P$–$V$ diagram?<span class="tog">Solution</span></summary><div class="sol"><p>Isotherm: $\dd P/\dd V = -P/V$. Adiabat: $\dd P/\dd V = -\gamma P/V$. Since $\gamma \gt 1$, the adiabat is steeper: compressing without letting heat escape raises the temperature as well as the density.</p></div></details>`
      },
      {
        title: 'Heat engines and refrigerators',
        html: R`
<p>A heat engine takes heat $Q_H$ from a hot reservoir, does work $W$, and dumps $Q_C$ into a cold reservoir. Over a cycle $\Delta U = 0$, so $W = Q_H - Q_C$ and the efficiency is</p>
$$\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}.$$
<p>The <strong>Carnot cycle</strong> (two isotherms joined by two adiabats) is reversible and achieves the maximum possible efficiency between two temperatures:</p>
<div class="key">$$\eta_{\text{Carnot}} = 1 - \frac{T_C}{T_H}.$$</div>
<p>The Otto cycle of a petrol engine has $\eta = 1 - r^{1-\gamma}$, where $r$ is the compression ratio.</p>
<p>A refrigerator runs the cycle backwards, using work to move heat from cold to hot. Its coefficient of performance is $Q_C/W \le T_C/(T_H - T_C)$. A heat pump, rated by $Q_H/W \le T_H/(T_H - T_C)$, can deliver several joules of heat per joule of electricity.</p>`
      },
      {
        title: 'Entropy and the second law',
        html: R`
<p>The second law has many equivalent forms. Clausius: heat does not flow spontaneously from cold to hot. Kelvin: no engine can turn heat entirely into work. Both follow from one statement about <strong>entropy</strong>:</p>
<div class="key">$$\dd S = \frac{\dd Q_{\text{rev}}}{T},\qquad \Delta S_{\text{universe}} \ge 0.$$</div>
<p>Entropy is a state function, so to find $\Delta S$ for any process, invent a reversible path between the same end states. For a substance heated at constant pressure, $\Delta S = mc\ln(T_2/T_1)$. For an ideal gas, $\Delta S = nC_V\ln(T_2/T_1) + nR\ln(V_2/V_1)$.</p>
<p>Boltzmann gave entropy its meaning: $S = k_B\ln\Omega$, where $\Omega$ counts the microscopic arrangements consistent with what we see. Systems drift toward macrostates with overwhelmingly more microstates. In a free expansion into vacuum, no heat flows and no work is done, yet entropy rises by $nR\ln(V_2/V_1)$ because the molecules have more room.</p>
<div class="insight"><p>To find the <em>maximum work</em> from two bodies at different temperatures, run a reversible engine between them until they reach a common temperature. Reversibility means $\Delta S_{\text{total}} = 0$, which fixes the final temperature; energy conservation then gives the work. See the last problem in this chapter.</p></div>`
      }
    ],
    labs: [
      { sim: 'engine', title: 'Engine cycles on a P–V diagram', desc: 'One mole of ideal gas runs around a cycle. The shaded area is the net work; the readout compares the efficiency with the Carnot limit for the same extreme temperatures.',
        tasks: ['For the Carnot cycle, confirm that the efficiency equals 1 − T<sub>C</sub>/T<sub>H</sub> and does not depend on the volume ratio.', 'For the Otto cycle, raise the compression ratio. How does the efficiency follow 1 − r<sup>1−γ</sup>?', 'Switch the gas from diatomic to monatomic. Which cycles improve and which do not?', 'Why is the rectangular cycle always well below the Carnot limit?'] }
    ],
    formulas: [
      ['First law', R`\Delta U = Q - W`],
      ['Work by gas', R`W = \int P\,\dd V`],
      ['Ideal-gas internal energy', R`U = nC_VT,\ C_V = \tfrac f2 R`],
      ['Mayer’s relation', R`C_P = C_V + R`],
      ['Isothermal work', R`W = nRT\ln(V_2/V_1)`],
      ['Adiabatic process', R`PV^\gamma = \text{const},\ TV^{\gamma-1} = \text{const}`],
      ['Engine efficiency', R`\eta = W/Q_H = 1 - Q_C/Q_H`],
      ['Carnot efficiency', R`\eta_C = 1 - T_C/T_H`],
      ['Otto efficiency', R`\eta = 1 - r^{1-\gamma}`],
      ['Entropy', R`\dd S = \dd Q_{\text{rev}}/T`],
      ['Entropy on heating', R`\Delta S = mc\ln(T_2/T_1)`],
      ['Boltzmann entropy', R`S = k_B\ln\Omega`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Squeezing quickly',
        q: R`<p>An ideal gas is compressed adiabatically. Its temperature:</p>`,
        options: ['Rises', 'Falls', 'Stays the same', 'Depends on the gas'], answer: 0,
        hints: [R`$Q = 0$ and the work done on the gas is positive, so $\Delta U \gt 0$.`],
        solution: R`<p>With no heat exchanged, the work done on the gas goes into internal energy, so $T$ rises. Pumping a bicycle tyre warms the pump.</p>` },
      { level: 'concept', type: 'mcq', title: 'Free expansion',
        q: R`<p>An ideal gas in an insulated container expands freely into a vacuum when a partition is removed. What happens to its temperature and entropy?</p>`,
        options: ['T falls, S stays the same', 'T stays the same, S increases', 'T stays the same, S stays the same', 'T rises, S increases'], answer: 1,
        hints: [R`$Q = 0$ and $W = 0$ (nothing to push against), so $\Delta U = 0$. Is the process reversible?`],
        solution: R`<p>No heat, no work, so $U$ and hence $T$ are unchanged for an ideal gas. The process is irreversible: $\Delta S = nR\ln(V_2/V_1) \gt 0$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Open fridge door',
        q: R`<p>You leave the refrigerator door open in a closed, insulated kitchen. Over time, the kitchen:</p>`,
        options: ['Cools down', 'Warms up', 'Stays at the same temperature', 'Cools down, then warms up to the original temperature'], answer: 1,
        hints: [R`Treat the whole kitchen as the system. What energy enters it?`],
        solution: R`<p>The fridge only moves heat around inside the kitchen, but the electrical work it consumes ends up as heat. The kitchen warms.</p>` },
      { level: 'core', type: 'num', title: 'Isothermal expansion',
        q: R`<p>Two moles of ideal gas expand isothermally at $300\ \mathrm K$ until their volume doubles. How much work do they do?</p>`,
        answer: 2 * 8.314 * 300 * Math.log(2), tol: 0.01, unit: 'J',
        hints: [R`$W = nRT\ln(V_2/V_1)$.`],
        solution: R`<p>$W = 2(8.314)(300)\ln 2 = 3.46\times10^3\ \mathrm J$, all supplied as heat from the surroundings.</p>` },
      { level: 'core', type: 'num', title: 'Diesel compression',
        q: R`<p>Air ($\gamma = 1.4$) at $300\ \mathrm K$ is compressed adiabatically to one tenth of its volume. What is its final temperature?</p>`,
        answer: 300 * Math.pow(10, 0.4), tol: 0.01, unit: 'K',
        hints: [R`$TV^{\gamma-1}$ is constant.`],
        solution: R`<p>$T_2 = 300 \times 10^{0.4} = 754\ \mathrm K$, hot enough to ignite diesel fuel.</p>` },
      { level: 'core', type: 'num', title: 'Carnot engine',
        q: R`<p>A Carnot engine works between $500\ \mathrm K$ and $300\ \mathrm K$ and absorbs $1000\ \mathrm J$ per cycle from the hot reservoir. How much work does it do per cycle?</p>`,
        answer: 400, tol: 0.01, unit: 'J',
        hints: [R`$\eta = 1 - T_C/T_H$.`],
        solution: R`<p>$\eta = 1 - 300/500 = 0.40$, so $W = 400\ \mathrm J$ and $600\ \mathrm J$ is rejected.</p>` },
      { level: 'core', type: 'num', title: 'Heating at constant pressure',
        q: R`<p>How much heat is needed to raise the temperature of $3.0$ moles of a monatomic ideal gas by $50\ \mathrm K$ at constant pressure?</p>`,
        answer: 3 * 2.5 * 8.314 * 50, tol: 0.01, unit: 'J',
        hints: [R`$C_P = \tfrac52 R$ for a monatomic gas.`],
        solution: R`<p>$Q = nC_P\Delta T = 3.0(2.5)(8.314)(50) = 3.12\times10^3\ \mathrm J$. Of this, $nR\Delta T = 1.25\ \mathrm{kJ}$ goes into work.</p>` },
      { level: 'core', type: 'num', title: 'Entropy of melting',
        q: R`<p>What is the entropy change when $1.0\ \mathrm{kg}$ of ice melts at $0^\circ\mathrm C$? ($L_f = 3.34\times10^5\ \mathrm{J/kg}$)</p>`,
        answer: 3.34e5 / 273.15, tol: 0.01, unit: 'J/K',
        hints: [R`At constant temperature, $\Delta S = Q/T$. Use kelvin.`],
        solution: R`<p>$\Delta S = \dfrac{3.34\times10^5}{273.15} = 1.22\times10^3\ \mathrm{J/K}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Entropy of mixing',
        q: R`<p>$1.0\ \mathrm{kg}$ of water at $80^\circ\mathrm C$ is mixed with $1.0\ \mathrm{kg}$ of water at $20^\circ\mathrm C$ in an insulated container. Find the total entropy change of the water. ($c = 4186\ \mathrm{J\,kg^{-1}K^{-1}}$)</p>`,
        answer: 4186 * (Math.log(323.15 / 353.15) + Math.log(323.15 / 293.15)), tol: 0.02, unit: 'J/K',
        hints: [R`The final temperature is $50^\circ\mathrm C$. Compute $mc\ln(T_f/T_i)$ for each half separately, in kelvin.`],
        solution: R`<p>$\Delta S = mc\left[\ln\dfrac{323.15}{353.15} + \ln\dfrac{323.15}{293.15}\right] = 4186(-0.0888 + 0.0974) = 36\ \mathrm{J/K}$. The hot water loses less entropy than the cold water gains, because it gives up the same heat at a higher temperature.</p>` },
      { level: 'olympiad', type: 'num', title: 'Maximum work',
        q: R`<p>Two identical bodies, each with constant heat capacity $C = 1000\ \mathrm{J/K}$, start at $400\ \mathrm K$ and $100\ \mathrm K$. A reversible engine runs between them until they reach the same temperature. How much work does it deliver?</p>`,
        answer: 1000 * (400 + 100 - 2 * Math.sqrt(400 * 100)), tol: 0.01, unit: 'J',
        hints: [R`Reversible means the total entropy change is zero: $C\ln(T_f/T_1) + C\ln(T_f/T_2) = 0$.`, R`Then $W = $ heat out of the hot body $-$ heat into the cold body.`],
        solution: R`<p>$\Delta S = 0$ gives $T_f^2 = T_1T_2$, so $T_f = \sqrt{400\times100} = 200\ \mathrm K$. Then $W = C(T_1 - T_f) - C(T_f - T_2) = C(T_1 + T_2 - 2T_f) = 1000(500 - 400) = 1.0\times10^5\ \mathrm J$. Simply mixing them would give $T_f = 250\ \mathrm K$ and no work.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cooler as you climb',
        q: R`<p>Air rising in the atmosphere expands adiabatically. Show that its temperature falls at a constant rate with height and find that rate in kelvin per kilometre. Use $M = 0.029\ \mathrm{kg/mol}$, $\gamma = 1.4$ and $g = 9.8\ \mathrm{m/s^2}$.</p>`,
        answer: 9.8 * 0.029 * 0.4 / (1.4 * 8.314) * 1000, tol: 0.01, unit: 'K/km',
        hints: [R`Hydrostatics: $\dd P/\dd z = -\rho g = -PMg/(RT)$.`, R`Adiabatic: $P^{1-\gamma}T^\gamma = \text{const}$, so $\dfrac{\dd T}{T} = \dfrac{\gamma - 1}{\gamma}\dfrac{\dd P}{P}$.`],
        solution: R`<p>Combining the two relations:</p>$$\frac{\dd T}{\dd z} = \frac{\gamma - 1}{\gamma}\frac TP\frac{\dd P}{\dd z} = -\frac{\gamma - 1}{\gamma}\frac{Mg}{R} = -\frac{0.4}{1.4}\cdot\frac{0.029\times9.8}{8.314} = -9.8\ \mathrm{K/km}.$$<p>This is the dry adiabatic lapse rate. Moist air cools more slowly (about 6 K/km) because condensing water releases latent heat.</p>` }
    ]
  });
})();
