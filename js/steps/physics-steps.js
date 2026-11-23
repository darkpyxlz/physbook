/* Guided steps (understand → plan → carry out) for the first core problem of each physics chapter.
   Each step is a small checked question; the learner then enters the final answer. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3), g = 9.8;
  const N = (phase, q, a, u, e, tol) => ({ phase: phase, type: 'num', q: q, answer: a, unit: u || '', explain: e, tol: tol || 0.03 });
  const C = (phase, q, o, a, e) => ({ phase: phase, type: 'mcq', q: q, options: o, answer: a, explain: e });
  const G = PB.addSteps;

  G('toolkit-5', [
    C('understand', R`What are we asked to find?`, ['The speed of sound', 'The pressure of air', 'The number $C$ in $v = C\sqrt{P/\rho}$', 'The density of air'], 2, R`$v$, $P$ and $\rho$ are all given; the only unknown is the pure number $C$.`),
    N('do', R`First compute $\sqrt{P/\rho}$ for air (in m/s).`, Math.sqrt(1.01e5 / 1.2), 'm/s', R`$\sqrt{1.01\times10^5/1.20} = ${f(Math.sqrt(1.01e5 / 1.2))}$ m/s.`),
    C('plan', R`How do you get $C$ from that?`, ['$C = v\\sqrt{P/\\rho}$', '$C = v / \\sqrt{P/\\rho}$', '$C = \\sqrt{P/\\rho} / v$', '$C = v - \\sqrt{P/\\rho}$'], 1, R`Rearrange $v = C\sqrt{P/\rho}$: divide both sides by $\sqrt{P/\rho}$.`)
  ]);
  G('kinematics-4', [
    C('understand', R`Which quantities do we know?`, ['$u = 0$, $v = 27$ m/s, $t = 9.0$ s', '$u = 27$ m/s, $a$, $s$', '$s$ and $t$ only', '$a = 27$ m/s², $t = 9.0$ s'], 0, R`"From rest" means $u = 0$. The final speed and the time are given.`),
    C('plan', R`Which equation links $u$, $v$, $t$ and the distance $s$ without needing $a$?`, ['$v = u + at$', '$s = \\tfrac12(u + v)t$', '$v^2 = u^2 + 2as$', '$s = vt - \\tfrac12at^2$'], 1, R`The average velocity is $\tfrac12(u + v)$ for constant acceleration; multiply by time.`),
    N('do', R`What is the average velocity (m/s)?`, 13.5, 'm/s', R`$\tfrac12(0 + 27) = 13.5$ m/s. Now multiply by 9.0 s.`)
  ]);
  G('newton-4', [
    C('understand', R`Which way does the system accelerate?`, ['The 3 kg side goes down', 'The 5 kg side goes down', 'It does not move', 'It depends on the pulley'], 1, R`The heavier side wins.`),
    N('plan', R`What is the net force driving the system (N)?`, 2 * g, 'N', R`$(5 - 3)g = 2\times9.8 = 19.6$ N.`),
    N('do', R`What total mass does that force accelerate (kg)?`, 8, 'kg', R`Both masses move together: $3 + 5 = 8$ kg. Then $a = F/m$.`)
  ]);
  G('energy-4', [
    C('plan', R`Which energy conversion happens?`, ['Kinetic → elastic', 'Elastic → kinetic', 'Gravitational → kinetic', 'Kinetic → heat'], 1, R`The compressed spring's stored energy becomes the block's kinetic energy.`),
    N('do', R`How much energy is stored in the spring (J)?`, 0.5 * 400 * 0.15 * 0.15, 'J', R`$\tfrac12kx^2 = \tfrac12(400)(0.15)^2 = 4.5$ J. Convert to metres first!`),
    C('do', R`Set $\tfrac12mv^2$ equal to that. Which gives $v$?`, ['$v = \\sqrt{2\\times4.5/0.20}$', '$v = 4.5/0.20$', '$v = \\sqrt{4.5\\times0.20}$', '$v = 2\\times4.5\\times0.20$'], 0, R`$v = \sqrt{2E/m}$.`)
  ]);
  G('momentum-4', [
    C('understand', R`Taking the incoming direction as negative, what is the ball's final velocity?`, ['$-50$ m/s', '$+50$ m/s', '$+40$ m/s', '$-40$ m/s'], 1, R`It leaves in the opposite direction to how it came, so its sign flips.`),
    N('do', R`What is the change in momentum (kg m/s)?`, 0.15 * 90, 'kg m/s', R`$0.15(50 - (-40)) = 0.15\times90 = 13.5$. Watch the double negative!`),
    C('plan', R`How do you turn $\Delta p$ into an average force?`, ['$F = \\Delta p\\cdot\\Delta t$', '$F = \\Delta p/\\Delta t$', '$F = \\Delta p/m$', '$F = m\\Delta t$'], 1, R`Impulse: $F\Delta t = \Delta p$, with $\Delta t = 1.2$ ms $= 0.0012$ s.`)
  ]);
  G('rotation-4', [
    N('plan', R`What torque does the string exert (N m)?`, 3, 'N m', R`$\tau = FR = 10\times0.30 = 3.0$ N m.`),
    N('do', R`What is the disc's moment of inertia (kg m²)?`, 0.5 * 2 * 0.09, 'kg m²', R`Solid disc: $\tfrac12MR^2 = \tfrac12(2.0)(0.30)^2 = 0.090$ kg m².`),
    C('do', R`Which equation gives $\alpha$?`, ['$\\alpha = \\tau I$', '$\\alpha = \\tau/I$', '$\\alpha = I/\\tau$', '$\\alpha = \\tau/R$'], 1, R`Newton's second law for rotation: $\tau = I\alpha$.`)
  ]);
  G('gravitation-4', [
    C('plan', R`Escape speed comes from setting…`, ['kinetic energy = weight', '$\\tfrac12mv^2 = GMm/R$', '$mv^2/R = GMm/R^2$', '$v = gR$'], 1, R`To escape, kinetic energy must pay off the gravitational potential energy $GMm/R$.`),
    N('do', R`Compute $2GM/R$ for the Moon (m²/s²).`, 2 * 6.674e-11 * 7.35e22 / 1.737e6, 'm²/s²', R`$2(6.674\times10^{-11})(7.35\times10^{22})/1.737\times10^6 = ${f(2 * 6.674e-11 * 7.35e22 / 1.737e6)}$ m²/s². Now take the square root.`)
  ]);
  G('oscillations-4', [
    N('plan', R`Find the angular frequency $\omega = \sqrt{k/m}$ (rad/s).`, 20, 'rad/s', R`$\sqrt{200/0.50} = \sqrt{400} = 20$ rad/s.`),
    C('do', R`How do you convert $\omega$ to the frequency $f$ in hertz?`, ['$f = 2\\pi\\omega$', '$f = \\omega/2\\pi$', '$f = 1/\\omega$', '$f = \\omega$'], 1, R`One cycle is $2\pi$ radians.`)
  ]);
  G('fluids-4', [
    C('understand', R`"Absolute" pressure means…`, ['just the water\u2019s contribution', 'water pressure plus atmospheric pressure', 'atmospheric pressure only', 'pressure in atmospheres'], 1, R`Gauge pressure ignores the atmosphere; absolute includes it.`),
    N('do', R`What pressure does the 25 m of seawater add (Pa)?`, 1025 * g * 25, 'Pa', R`$\rho gh = 1025\times9.8\times25 = ${f(1025 * g * 25)}$ Pa. Now add $1.013\times10^5$ Pa.`)
  ]);
  G('waves-4', [
    C('plan', R`For the fundamental on a string fixed at both ends, the wavelength is…`, ['$L$', '$2L$', '$L/2$', '$4L$'], 1, R`Half a wavelength fits between the ends.`),
    N('do', R`What is the wave speed $v = f\lambda$ (m/s)?`, 2 * 0.65 * 110, 'm/s', R`$110\times1.30 = 143$ m/s.`),
    C('do', R`Which formula gives the tension?`, ['$T = \\mu v$', '$T = \\mu v^2$', '$T = v^2/\\mu$', '$T = \\sqrt{\\mu}v$'], 1, R`$v = \sqrt{T/\mu}$, so $T = \mu v^2$ with $\mu = 0.0030$ kg/m.`)
  ]);
  G('thermal-4', [
    C('plan', R`Which principle sets the final temperature?`, ['Heat lost by hot water = heat gained by cold water', 'Temperatures simply average', 'The hotter water wins', 'Pressure balance'], 0, R`In an insulated cup no heat escapes, so the energy lost and gained balance.`),
    C('do', R`Since both are water (same $c$), the final temperature is…`, ['the simple average of 80 and 20', 'the mass-weighted average', '80 − 20', 'always 50 °C'], 1, R`$T = \dfrac{m_1T_1 + m_2T_2}{m_1 + m_2}$: the specific heat cancels.`)
  ]);
  G('thermodynamics-4', [
    C('plan', R`Which formula gives the work in an isothermal expansion?`, ['$W = P\\Delta V$', '$W = nRT\\ln(V_2/V_1)$', '$W = nC_v\\Delta T$', '$W = 0$'], 1, R`Pressure falls as the gas expands, so integrate $P = nRT/V$.`),
    N('do', R`What is $nRT$ here (J)?`, 2 * 8.314 * 300, 'J', R`$2\times8.314\times300 = ${f(2 * 8.314 * 300)}$ J. Multiply by $\ln2$.`)
  ]);
  G('electrostatics-4', [
    C('plan', R`Which law?`, ['$F = kq_1q_2/r^2$', '$F = kq_1q_2/r$', '$F = qE$ with $E$ unknown', '$F = ma$'], 0, R`Coulomb's law for two point charges.`),
    N('do', R`What is $r^2$ in m²?`, 0.04, 'm²', R`$r = 0.20$ m, so $r^2 = 0.040$ m². Use $q_1q_2 = 15\times10^{-12}$ C² (magnitudes).`)
  ]);
  G('circuits-4', [
    C('plan', R`Which formula?`, ['$C = \\varepsilon_0A/d$', '$C = Q/V$ with $Q$ unknown', '$C = \\varepsilon_0d/A$', '$C = A/d$'], 0, R`Parallel-plate capacitor in air.`),
    C('understand', R`What is the separation in metres?`, ['1.0', '0.10', '0.0010', '0.010'], 2, R`1.0 mm $= 1.0\times10^{-3}$ m. Then convert the answer from farads to picofarads ($\times10^{12}$).`)
  ]);
  G('magnetism-4', [
    C('plan', R`The magnetic force provides the centripetal force. So…`, ['$qvB = mv^2/r$', '$qE = mv^2/r$', '$qvB = mg$', '$qB = mv$'], 0, R`Set the magnetic force equal to $mv^2/r$ and solve for $r = mv/qB$.`),
    N('do', R`What is the proton's momentum $mv$ (in units of $10^{-21}$ kg m/s)?`, 1.673e-27 * 2e6 / 1e-21, '×10⁻²¹ kg m/s', R`$1.673\times10^{-27}\times2.0\times10^6 = 3.35\times10^{-21}$.`)
  ]);
  G('induction-4', [
    N('do', R`What is the induced EMF $BLv$ (V)?`, 0.3 * 0.5 * 4, 'V', R`$0.30\times0.50\times4.0 = 0.60$ V.`),
    N('do', R`What current flows (A)?`, 0.3, 'A', R`$I = \mathcal E/R = 0.60/2.0 = 0.30$ A.`),
    C('plan', R`At constant speed the applied force equals…`, ['zero', 'the magnetic force $BIL$ on the rod', '$mg$', '$\\mathcal E I$'], 1, R`No acceleration, so the pull balances the magnetic drag $BIL$.`)
  ]);
  G('geometric-optics-4', [
    C('plan', R`At the critical angle the refracted ray travels…`, ['straight on', 'along the boundary (90°)', 'back into the glass', 'at 45°'], 1, R`So Snell's law gives $n\sin\theta_c = 1\cdot\sin90^\circ$.`),
    N('do', R`What is $\sin\theta_c$?`, 1 / 1.52, '', R`$1/1.52 = ${f(1 / 1.52)}$. Then take the inverse sine.`)
  ]);
  G('wave-optics-4', [
    C('plan', R`Which formula gives the fringe spacing?`, ['$\\Delta y = \\lambda L/d$', '$\\Delta y = d/\\lambda L$', '$\\Delta y = \\lambda d/L$', '$\\Delta y = L/\\lambda$'], 0, R`Small angles: bright fringes where $d\sin\theta = m\lambda$, and $y = L\tan\theta$.`),
    C('understand', R`What is $d$ in metres?`, ['0.25', '$2.5\\times10^{-4}$', '$2.5\\times10^{-3}$', '$2.5\\times10^{-5}$'], 1, R`0.25 mm $= 2.5\times10^{-4}$ m.`)
  ]);
  G('relativity-4', [
    N('do', R`Find $\gamma = 1/\sqrt{1 - 0.995^2}$.`, 1 / Math.sqrt(1 - 0.995 * 0.995), '', R`$1 - 0.990025 = 0.009975$, so $\gamma = ${f(1 / Math.sqrt(1 - 0.995 * 0.995))}$.`),
    C('plan', R`In the Earth frame the muon lives for…`, ['$\\tau$', '$\\gamma\\tau$', '$\\tau/\\gamma$', '$\\gamma^2\\tau$'], 1, R`Moving clocks run slow: the lifetime is dilated. Distance = speed × dilated lifetime.`)
  ]);
  G('quantum-4', [
    C('plan', R`Which shortcut gives photon energy in eV from wavelength in nm?`, ['$E = 1240\\lambda$', '$E = 1240/\\lambda$', '$E = \\lambda/1240$', '$E = hc$'], 1, R`$E = hc/\lambda$ and $hc = 1240$ eV nm.`)
  ]);
  G('nuclear-4', [
    C('plan', R`How does nuclear radius depend on mass number $A$?`, ['$R = R_0A$', '$R = R_0A^{1/3}$', '$R = R_0A^2$', '$R = R_0/A$'], 1, R`Nuclear volume is proportional to $A$, so radius goes as $A^{1/3}$.`),
    N('do', R`Find $197^{1/3}$.`, Math.cbrt(197), '', R`$197^{1/3} = ${f(Math.cbrt(197))}$ (just under $6^3 = 216$).`)
  ]);
  G('analytical-4', [
    C('plan', R`At the off-axis equilibrium, which condition holds?`, ['$\\cos\\theta_0 = g/\\omega^2R$', '$\\sin\\theta_0 = g/\\omega^2R$', '$\\tan\\theta_0 = \\omega^2R/g$', '$\\theta_0 = 0$'], 0, R`Gravity's component along the hoop balances the centrifugal component.`),
    N('do', R`Compute $g/\omega^2R$.`, 0.49, '', R`$9.8/(100\times0.20) = 0.49$. Then $\theta_0 = \arccos0.49$.`)
  ]);
  G('astrophysics-4', [
    C('plan', R`Which law gives luminosity from radius and temperature?`, ['Wien', 'Stefan–Boltzmann: $L = 4\\pi R^2\\sigma T^4$', 'Hubble', 'Kepler'], 1, R`Surface area × power per unit area.`),
    N('do', R`What is $\sigma T^4$ (in MW/m²)?`, 5.67e-8 * Math.pow(5772, 4) / 1e6, 'MW/m²', R`$5.670\times10^{-8}\times5772^4 = ${f(5.67e-8 * Math.pow(5772, 4) / 1e6)}$ MW/m². Multiply by $4\pi R^2$.`)
  ]);
  G('experimental-4', [
    N('do', R`What is the mean period (s)?`, 2.32, 's', R`$(2.31 + 2.35 + 2.29 + 2.33 + 2.32)/5 = 2.32$ s.`, 0.002),
    N('do', R`What is the sample standard deviation (s)?`, Math.sqrt(0.002 / 4), 's', R`Squared deviations sum to 0.0020; divide by $n - 1 = 4$ and square-root: ${f(Math.sqrt(0.0005))}$ s.`),
    C('plan', R`The standard error of the mean is…`, ['$s$', '$s/\\sqrt n$', '$s\\sqrt n$', '$s/n$'], 1, R`Averaging $n$ readings shrinks the random error by $\sqrt n$.`)
  ]);
})();
