(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'induction', num: 16, part: 'Electricity & Magnetism',
    title: 'Induction, AC Circuits and EM Waves',
    subtitle: R`Changing magnetic flux drives currents. Faraday's and Lenz's laws, inductance, LC oscillation, generators, transformers, AC circuits and the electromagnetic waves that tie it all together.`,
    goals: ['Compute induced emf from changing flux', 'Predict current directions with Lenz’s law', 'Analyse RL and LC circuits', 'Use reactance, impedance and phasors', 'Connect Maxwell’s equations to light'],
    sections: [
      {
        title: "Faraday's law and Lenz's law",
        html: R`
<p>The magnetic flux through a surface is $\Phi_B = \int\vec B\cdot\dd\vec A$ (unit: weber). Whenever the flux through a circuit changes, an emf is induced:</p>
<div class="key">$$\mathcal E = -N\frac{\dd\Phi_B}{\dd t}.$$</div>
<p>The flux can change because $B$ changes, the area changes, or the orientation changes. The minus sign is <strong>Lenz's law</strong>: the induced current flows so as to <em>oppose</em> the change in flux that caused it. Lenz's law is energy conservation in disguise; if the induced current helped the change, you would get a runaway.</p>
<p>A rod of length $L$ sliding at speed $v$ across a field $B$ has <strong>motional emf</strong> $\mathcal E = BLv$, which you can derive either from flux or from the force $q\vec v\times\vec B$ on its charges.</p>
<div class="insight"><p>A magnet dropped through a copper pipe falls slowly because eddy currents in the pipe oppose its motion. The faster it falls, the larger the braking force, so it quickly reaches a terminal speed, just as with a rod sliding on rails.</p></div>`
      },
      {
        title: 'Inductance and magnetic energy',
        html: R`
<p>A coil's own changing current changes its own flux, inducing a back-emf: $\mathcal E = -L\,\dd I/\dd t$. The <strong>self-inductance</strong> $L$ (in henries) depends on geometry; a long solenoid has $L = \mu_0n^2A\ell$. Two coils share a mutual inductance $M$, with $\mathcal E_2 = -M\,\dd I_1/\dd t$.</p>
<p>An inductor stores energy in its magnetic field:</p>
<div class="key">$$U = \tfrac12 LI^2,\qquad u_B = \frac{B^2}{2\mu_0}.$$</div>
<p>In an RL circuit the current cannot jump. Switched on, it rises as $I = \dfrac{\mathcal E}{R}\left(1 - e^{-t/\tau}\right)$ with $\tau = L/R$.</p>
<p>An inductor and capacitor together form an <strong>LC circuit</strong>, where energy sloshes between electric and magnetic forms exactly like a mass on a spring, at $\omega_0 = 1/\sqrt{LC}$.</p>`
      },
      {
        title: 'Generators and transformers',
        html: R`
<p>A coil of $N$ turns and area $A$ rotating at angular speed $\omega$ in a field $B$ has flux $NBA\cos\omega t$, so it generates an alternating emf</p>
$$\mathcal E = NBA\omega\sin\omega t.$$
<p>A <strong>transformer</strong> couples two coils with an iron core so that both see the same changing flux. The voltages scale with the turns, and (ideally) power is conserved:</p>
<div class="key">$$\frac{V_s}{V_p} = \frac{N_s}{N_p},\qquad I_pV_p = I_sV_s.$$</div>
<p>Power lines use very high voltage to reduce current and so reduce $I^2R$ losses.</p>`
      },
      {
        title: 'AC circuits',
        html: R`
<p>For sinusoidal currents, inductors and capacitors act like frequency-dependent resistors. Their <strong>reactances</strong> are</p>
$$X_L = \omega L,\qquad X_C = \frac{1}{\omega C}.$$
<p>The voltage across an inductor leads the current by $90^\circ$; across a capacitor it lags by $90^\circ$. Representing each voltage as a rotating arrow (a <strong>phasor</strong>), a series RLC circuit has</p>
<div class="key">$$Z = \sqrt{R^2 + (X_L - X_C)^2},\qquad I = \frac{V}{Z},\qquad \tan\phi = \frac{X_L - X_C}{R}.$$</div>
<p>At <strong>resonance</strong>, $\omega_0 = 1/\sqrt{LC}$, the reactances cancel, the impedance is just $R$, and the current is largest. This is how radios select a station. The sharpness is set by $Q = \dfrac1R\sqrt{L/C}$.</p>
<p>Average power is $\bar P = I_{\text{rms}}V_{\text{rms}}\cos\phi = I_{\text{rms}}^2R$, with $I_{\text{rms}} = I_0/\sqrt2$. Only the resistor dissipates energy on average.</p>`
      },
      {
        title: "Maxwell's equations and light",
        html: R`
<p>Maxwell noticed that Ampère's law fails for a charging capacitor and added a <strong>displacement current</strong> $\varepsilon_0\,\dd\Phi_E/\dd t$. The complete set, in integral form:</p>
$$\oint\vec E\cdot\dd\vec A = \frac{Q}{\varepsilon_0},\quad \oint\vec B\cdot\dd\vec A = 0,\quad \oint\vec E\cdot\dd\vec\ell = -\frac{\dd\Phi_B}{\dd t},\quad \oint\vec B\cdot\dd\vec\ell = \mu_0 I + \mu_0\varepsilon_0\frac{\dd\Phi_E}{\dd t}.$$
<p>A changing $E$ makes $B$ and a changing $B$ makes $E$, so the fields can sustain each other as a wave travelling at</p>
<div class="key">$$c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} = 3.00\times10^8\ \mathrm{m/s}.$$</div>
<p>This matched the measured speed of light: light is an electromagnetic wave. In the wave, $E = cB$, the fields are perpendicular to each other and to the direction of travel, and the intensity is $I = \tfrac12 c\varepsilon_0E_0^2$. Light also carries momentum, exerting radiation pressure $I/c$ on an absorber (twice that on a mirror).</p>`
      }
    ],
    labs: [
      { sim: 'rlc', title: 'Series RLC circuit', desc: 'A 10 V peak source drives R, L and C in series. Left: rotating phasors. Right: peak current against frequency (log scale), with the dashed line at resonance.',
        tasks: ['Tune the frequency to resonance. What happens to V<sub>L</sub> and V<sub>C</sub>, and to the phase angle?', 'Below resonance, is the circuit capacitive or inductive? Check the sign of the phase.', 'Reduce R. How do the peak height and Q change?', 'At resonance, can V<sub>L</sub> be larger than the source voltage? Explain.'] }
    ],
    formulas: [
      ['Faraday’s law', R`\mathcal E = -N\,\dd\Phi_B/\dd t`],
      ['Motional emf', R`\mathcal E = BLv`],
      ['Self-inductance', R`\mathcal E = -L\,\dd I/\dd t`],
      ['Solenoid inductance', R`L = \mu_0n^2A\ell`],
      ['Inductor energy', R`U = \tfrac12 LI^2`],
      ['RL time constant', R`\tau = L/R`],
      ['LC frequency', R`\omega_0 = 1/\sqrt{LC}`],
      ['Generator emf', R`\mathcal E_0 = NBA\omega`],
      ['Transformer', R`V_s/V_p = N_s/N_p`],
      ['Reactances', R`X_L = \omega L,\ X_C = 1/(\omega C)`],
      ['Impedance', R`Z = \sqrt{R^2 + (X_L - X_C)^2}`],
      ['Speed of light', R`c = 1/\sqrt{\mu_0\varepsilon_0}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Magnet in a pipe',
        q: R`<p>A strong magnet is dropped down a vertical copper pipe. Compared with free fall, it:</p>`,
        options: ['Falls faster', 'Falls more slowly', 'Falls at the same rate', 'Sticks to the pipe'], answer: 1,
        hints: [R`Copper is not magnetic, but it conducts. What do changing fluxes do in a conductor?`],
        solution: R`<p>The moving magnet induces eddy currents in the pipe that oppose its motion (Lenz). It reaches a low terminal speed, sometimes a few centimetres per second.</p>` },
      { level: 'concept', type: 'mcq', title: 'At resonance',
        q: R`<p>A series RLC circuit is driven at its resonant frequency. Which statement is true?</p>`,
        options: ['The current is smallest and leads the voltage', 'The current is largest and in phase with the source voltage', 'The impedance is largest', 'The capacitor and inductor voltages are both zero'], answer: 1,
        hints: [R`At resonance $X_L = X_C$.`],
        solution: R`<p>The reactances cancel, so $Z = R$ (its minimum), the current is largest, and $\phi = 0$. The inductor and capacitor voltages are equal and opposite, and can each exceed the source voltage.</p>` },
      { level: 'concept', type: 'mcq', title: "Lenz's law",
        q: R`<p>A conducting ring faces the north pole of a magnet and is pulled away from it. The induced current makes the face of the ring nearest the magnet behave like:</p>`,
        options: ['A north pole, repelling the magnet', 'A south pole, attracting the magnet', 'No pole: the current is zero', 'Alternately north and south'], answer: 1,
        hints: [R`The flux through the ring is decreasing. The ring tries to keep it.`],
        solution: R`<p>To oppose the decrease in flux, the ring's own field points the same way as the magnet's field through it, making its near face a south pole that attracts the receding north pole. Pulling the ring away therefore takes work, which becomes heat in the ring.</p>` },
      { level: 'core', type: 'num', title: 'Sliding rod',
        q: R`<p>A $0.50\ \mathrm m$ rod slides at a constant $4.0\ \mathrm{m/s}$ along rails in a $0.30\ \mathrm T$ field perpendicular to the rails. The rails are joined by a $2.0\ \Omega$ resistor. What force must be applied to keep the rod moving at constant speed?</p>`,
        answer: 0.09 * 0.25 * 4 / 2, tol: 0.01, unit: 'N',
        hints: [R`$\mathcal E = BLv$, $I = \mathcal E/R$, and the magnetic force on the rod is $BIL$.`],
        solution: R`<p>$\mathcal E = 0.60\ \mathrm V$, $I = 0.30\ \mathrm A$, $F = BIL = B^2L^2v/R = 0.045\ \mathrm N$. The mechanical power $Fv = 0.18\ \mathrm W$ equals the heat $I^2R$.</p>` },
      { level: 'core', type: 'num', title: 'Generator',
        q: R`<p>A coil of 200 turns, each of area $0.050\ \mathrm{m^2}$, rotates at $50\ \mathrm{Hz}$ in a $0.20\ \mathrm T$ field. What is the peak emf?</p>`,
        answer: 200 * 0.2 * 0.05 * 2 * Math.PI * 50, tol: 0.01, unit: 'V',
        hints: [R`$\mathcal E_0 = NBA\omega$ with $\omega = 2\pi f$.`],
        solution: R`<p>$\mathcal E_0 = (200)(0.20)(0.050)(2\pi\times50) = 628\ \mathrm V$.</p>` },
      { level: 'core', type: 'num', title: 'Phone charger',
        q: R`<p>A transformer steps $120\ \mathrm V$ down to $6.0\ \mathrm V$. The primary has 400 turns. How many turns does the secondary have?</p>`,
        answer: 20, tol: 0.01, unit: 'turns',
        hints: [R`$N_s/N_p = V_s/V_p$.`],
        solution: R`<p>$N_s = 400 \times 6.0/120 = 20$ turns.</p>` },
      { level: 'core', type: 'num', title: 'RL rise time',
        q: R`<p>An RL circuit has $L = 0.50\ \mathrm H$ and $R = 10\ \Omega$. After switching on the battery, how long does the current take to reach 90% of its final value?</p>`,
        answer: 0.05 * Math.log(10), tol: 0.01, unit: 's',
        hints: [R`$1 - e^{-t/\tau} = 0.9$ with $\tau = L/R$.`],
        solution: R`<p>$\tau = 0.050\ \mathrm s$ and $t = \tau\ln10 = 0.115\ \mathrm s$.</p>` },
      { level: 'core', type: 'num', title: 'LC tank',
        q: R`<p>An LC circuit has $L = 10\ \mathrm{mH}$ and $C = 1.0\ \mu\mathrm F$. At what frequency (in hertz) does it oscillate?</p>`,
        answer: 1 / (2 * Math.PI * Math.sqrt(1e-2 * 1e-6)), tol: 0.01, unit: 'Hz',
        hints: [R`$f = 1/(2\pi\sqrt{LC})$.`],
        solution: R`<p>$f = \dfrac{1}{2\pi\sqrt{10^{-8}}} = 1.59\ \mathrm{kHz}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Falling rod',
        q: R`<p>A horizontal rod of mass $0.10\ \mathrm{kg}$ and length $0.50\ \mathrm m$ slides without friction down two vertical conducting rails, which are joined at the top by a $0.20\ \Omega$ resistor. A horizontal $0.80\ \mathrm T$ field is perpendicular to the plane of the rails. Find the rod's terminal speed.</p>`,
        answer: 0.1 * 9.8 * 0.2 / (0.64 * 0.25), tol: 0.01, unit: 'm/s',
        hints: [R`At terminal speed, the magnetic braking force $B^2L^2v/R$ equals $mg$.`],
        solution: R`<p>$v_t = \dfrac{mgR}{B^2L^2} = \dfrac{(0.10)(9.8)(0.20)}{(0.64)(0.25)} = 1.23\ \mathrm{m/s}$. At this speed, gravitational power $mgv$ equals Joule heating $\mathcal E^2/R$. The approach is exponential with time constant $mR/(B^2L^2) = 0.125\ \mathrm s$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Coupled loops',
        q: R`<p>A small coil of area $1.0\ \mathrm{cm^2}$ (one turn) sits at the centre of a large circular loop of radius $0.20\ \mathrm m$, coaxial with it. Find their mutual inductance.</p>`,
        answer: 4 * Math.PI * 1e-7 * 1e-4 / 0.4, tol: 0.01, unit: 'H',
        hints: [R`$M$ is the same whichever coil carries the current, so put the current in the large loop.`, R`The large loop's field at its centre is $\mu_0I/(2R)$, nearly uniform over the small coil.`],
        solution: R`<p>Flux through the small coil: $\Phi = \dfrac{\mu_0I}{2R}a$, so $M = \dfrac{\mu_0a}{2R} = \dfrac{(4\pi\times10^{-7})(10^{-4})}{0.40} = 3.1\times10^{-10}\ \mathrm H$. Computing it the other way, from the small coil's dipole field threading the big loop, would be far harder: reciprocity saves the day.</p>` },
      { level: 'olympiad', type: 'num', title: 'Power in an RLC circuit',
        q: R`<p>A series circuit with $R = 40\ \Omega$, $L = 0.10\ \mathrm H$ and $C = 20\ \mu\mathrm F$ is connected to a $120\ \mathrm V$ (rms), $60\ \mathrm{Hz}$ supply. What average power does it draw?</p>`,
        answer: (function () { const w = 2 * Math.PI * 60, XL = w * 0.1, XC = 1 / (w * 20e-6), Z = Math.sqrt(1600 + Math.pow(XL - XC, 2)), I = 120 / Z; return I * I * 40; })(), tol: 0.01, unit: 'W',
        hints: [R`$X_L = 37.7\ \Omega$ and $X_C = 132.6\ \Omega$.`, R`$\bar P = I_{\text{rms}}^2R$.`],
        solution: R`<p>$Z = \sqrt{40^2 + (37.7 - 132.6)^2} = 103\ \Omega$, $I_{\text{rms}} = 120/103 = 1.16\ \mathrm A$, and $\bar P = I_{\text{rms}}^2R = 54.3\ \mathrm W$. The power factor $\cos\phi = R/Z = 0.39$ is poor because the circuit is far below its resonance at $113\ \mathrm{Hz}$.</p>` }
    ]
  });
})();
