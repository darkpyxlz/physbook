/* Physics: a third batch of problems (one concept, one core, one olympiad per chapter). Answers are computed in code. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3).replace(/^(-?[0-9.]+)e(-?[0-9]+)$/, '$1\\times10^{$2}'), g = 9.8, X = PB.addProblems, rad = Math.PI / 180;
  const M = (level, title, q, options, answer, hint, sol) => ({ level: level, type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: [hint], solution: '<p>' + sol + '</p>' });
  const N = (level, title, q, answer, unit, hint, sol, tol) => ({ level: level, type: 'num', title: title, q: '<p>' + q + '</p>', answer: answer, tol: tol || 0.02, unit: unit, hints: [hint], solution: '<p>' + sol + '</p>' });

  X('toolkit', [
    M('concept', 'Dimensionless', R`Which of these quantities is dimensionless?`, ['Strain', 'Stress', 'Pressure', 'Torque'], 0, R`Strain is a change in length divided by a length.`, R`Strain, $\Delta L/L$, has no units. Stress and pressure are N/m²; torque is N·m.`),
    N('core', 'Kilowatt-hours', R`How many megajoules are there in 1 kWh?`, 3.6, 'MJ', R`$1\text{ kWh} = 1000\text{ W} \times 3600\text{ s}$.`, R`$1000 \times 3600 = 3.6\times10^6$ J $= 3.6$ MJ.`),
    N('olympiad', 'Wobbling droplet', R`The vibration frequency of a small water droplet depends only on surface tension $\gamma$ (N/m), density $\rho$ and radius $r$. If $f \propto \gamma^a\rho^b r^c$, find $c$.`, -1.5, '', R`Match kg, m and s: $\gamma$ is kg s⁻², $\rho$ is kg m⁻³.`, R`Seconds: $-2a = -1$, so $a = \tfrac12$. Kilograms: $a + b = 0$, so $b = -\tfrac12$. Metres: $-3b + c = 0$, so $c = -\tfrac32$. Hence $f \sim \sqrt{\gamma/(\rho r^3)}$.`)
  ]);
  const vmin = Math.sqrt(g * (10 + Math.sqrt(500)));
  X('kinematics', [
    M('concept', 'At the top', R`A ball is thrown straight up. At the highest point its acceleration is…`, ['Zero', '9.8 m/s² downwards', '9.8 m/s² upwards', 'Changing direction'], 1, R`Gravity does not switch off when the velocity is zero.`, R`9.8 m/s² downwards; only the velocity is momentarily zero.`),
    N('core', 'River crossing', R`A boat moves at 4.0 m/s relative to the water and points straight across a river 120 m wide that flows at 1.5 m/s. How far downstream does it land?`, 120 / 4 * 1.5, 'm', R`The crossing time is set by the cross-stream speed alone.`, R`$t = 120/4 = 30$ s, drift $= 1.5 \times 30 = ${f(45)}$ m.`),
    N('olympiad', 'Minimum throw', R`What is the minimum launch speed needed to throw a ball from the ground through a point 20 m away horizontally and 10 m up?`, vmin, 'm/s', R`The minimum speed to reach $(x, y)$ satisfies $v^2 = g\left(y + \sqrt{x^2 + y^2}\right)$.`, R`$v^2 = 9.8(10 + \sqrt{500}) = ${f(vmin * vmin)}$, so $v = ${f(vmin)}$ m/s. The optimal launch angle bisects the vertical and the line to the target.`)
  ]);
  X('newton', [
    M('concept', 'Tug of war', R`Two people pull on opposite ends of a rope, each with 200 N. What is the tension in the rope?`, ['0 N', '100 N', '200 N', '400 N'], 2, R`Replace one person with a wall.`, R`200 N: the rope is in equilibrium, and the tension is the force at either end.`),
    N('core', 'Stacked blocks', R`A 2.0 kg block sits on a 5.0 kg block on a frictionless floor. Between the blocks $\mu_s = 0.40$. What is the largest horizontal force on the bottom block for which the top block does not slip?`, 0.4 * g * 7, 'N', R`Friction can give the top block at most $\mu_s g$ of acceleration.`, R`$a_{\max} = 0.40 \times 9.8 = 3.92$ m/s², so $F = 7.0 \times 3.92 = ${f(0.4 * g * 7)}$ N.`),
    N('olympiad', 'Rope over the edge', R`A uniform rope lies on a table with coefficient of static friction 0.25. What is the largest fraction of its length that can hang over the edge without the rope sliding?`, 0.2, '', R`Weight of the hanging part equals maximum friction on the rest: $\lambda x g = \mu\lambda(L - x)g$.`, R`$x/L = \mu/(1 + \mu) = 0.25/1.25 = 0.20$.`)
  ]);
  X('energy', [
    M('concept', 'Circular motion', R`How much work does the centripetal force do on an object in uniform circular motion?`, ['Positive work', 'Negative work', 'Zero', 'It depends on the radius'], 2, R`Compare the directions of force and velocity.`, R`Zero: the force is always perpendicular to the velocity, so the speed and kinetic energy stay constant.`),
    N('core', 'Loop the loop', R`A cart slides without friction down a ramp into a vertical loop of radius 8.0 m. From what minimum height above the bottom of the loop must it start?`, 20, 'm', R`At the top of the loop $mg = mv^2/R$.`, R`$v_{\text{top}}^2 = gR$, and $mgh = mg(2R) + \tfrac12 m gR$, so $h = 2.5R = 20$ m.`),
    N('olympiad', 'Leaving the dome', R`A small block starts at rest on top of a smooth hemisphere of radius 1.5 m and slides off. At what height above the centre does it lose contact?`, 1.0, 'm', R`Contact is lost when $mg\cos\theta = mv^2/R$, with $v^2 = 2gR(1 - \cos\theta)$.`, R`$\cos\theta = 2(1 - \cos\theta)$ gives $\cos\theta = 2/3$, so $h = \tfrac23 R = ${f(1.0)}$ m.`)
  ]);
  const vb = 2.01 / 0.01 * Math.sqrt(2 * g * 0.12);
  X('momentum', [
    M('concept', 'Sticky collision', R`In a perfectly inelastic collision between two carts on a frictionless track, what is conserved?`, ['Kinetic energy only', 'Momentum only', 'Both momentum and kinetic energy', 'Neither'], 1, R`Some kinetic energy becomes heat and deformation.`, R`Momentum only. No external horizontal force acts, but kinetic energy is lost.`),
    N('core', 'Ballistic pendulum', R`A 10 g bullet embeds in a 2.0 kg block hanging on strings, which then rises 12 cm. How fast was the bullet?`, vb, 'm/s', R`Momentum in the collision, then energy in the swing.`, R`$V = \sqrt{2gh} = ${f(Math.sqrt(2 * g * 0.12))}$ m/s, and $v = \dfrac{2.01}{0.01}V = ${f(vb)}$ m/s.`),
    N('olympiad', 'Largest deflection', R`A ball of mass $3m$ collides elastically with a stationary ball of mass $m$. What is the largest angle by which the heavy ball can be deflected?`, Math.asin(1 / 3) / rad, '°', R`In the centre-of-mass frame the heavy ball's velocity rotates on a circle smaller than the frame's speed.`, R`$\sin\theta_{\max} = m_2/m_1 = 1/3$, so $\theta_{\max} = ${f(Math.asin(1 / 3) / rad)}^\circ$.`)
  ]);
  X('rotation', [
    M('concept', 'Spinning skater', R`A spinning skater pulls her arms in. What happens?`, ['ω rises, kinetic energy stays the same', 'ω rises, kinetic energy rises', 'ω stays the same, kinetic energy rises', 'ω falls, kinetic energy falls'], 1, R`$L = I\omega$ is conserved; $K = L^2/2I$.`, R`$I$ falls so $\omega$ rises, and $K = L^2/2I$ rises: her muscles do work pulling her arms in.`),
    N('core', 'Heavy pulley', R`A 1.0 kg mass hangs from a light string wound round a solid disc pulley of mass 2.0 kg. Find the mass's acceleration.`, g / 2, 'm/s²', R`The disc adds an effective inertia $I/R^2 = M/2$.`, R`$a = \dfrac{mg}{m + M/2} = \dfrac{9.8}{2} = ${f(g / 2)}$ m/s².`),
    N('olympiad', 'Falling rod', R`A uniform rod is pivoted at one end and released from horizontal. What is the initial acceleration of its free end?`, 1.5 * g, 'm/s²', R`$\tau = mgL/2$ and $I = mL^2/3$.`, R`$\alpha = \dfrac{3g}{2L}$, so the free end accelerates at $\tfrac32 g = ${f(1.5 * g)}$ m/s², faster than free fall.`)
  ]);
  const rgeo = Math.cbrt(3.986e14 * 86164 * 86164 / (4 * Math.PI * Math.PI)) / 1000;
  const dEorb = 3.986e14 * 500 / 2 * (1 / 7e6 - 1 / 14e6) / 1e9;
  X('gravitation', [
    M('concept', 'Double the radius', R`A satellite's circular orbit radius is doubled. Its period is multiplied by…`, ['2', '$\\sqrt2$', '$2\\sqrt2$', '4'], 2, R`Kepler's third law: $T^2 \propto r^3$.`, R`$T \propto r^{3/2}$, so the factor is $2^{3/2} = 2\sqrt2$.`),
    N('core', 'Geostationary orbit', R`Find the radius of a geostationary orbit in km. Use $GM_\oplus = 3.986\times10^{14}$ m³/s² and a sidereal day of 86 164 s.`, rgeo, 'km', R`$r^3 = GMT^2/4\pi^2$.`, R`$r = ${f(rgeo, 4)}$ km, about 35 800 km above the surface.`),
    N('olympiad', 'Raising an orbit', R`How much energy (in GJ) is needed to move a 500 kg satellite from a circular orbit of radius 7000 km to one of 14 000 km? $GM = 3.986\times10^{14}$ m³/s².`, dEorb, 'GJ', R`The total energy of a circular orbit is $-GMm/2r$.`, R`$\Delta E = \dfrac{GMm}{2}\left(\dfrac1{r_1} - \dfrac1{r_2}\right) = ${f(dEorb)}$ GJ.`)
  ]);
  const Tq = 2 * Math.PI * Math.sqrt(2 * 1.2 / (3 * g)), Qd = Math.PI * 20 / Math.LN2;
  X('oscillations', [
    M('concept', 'Pendulum in a lift', R`A pendulum clock is in a lift accelerating upwards. Its period…`, ['increases', 'decreases', 'is unchanged', 'becomes infinite'], 1, R`The effective gravity is $g + a$.`, R`$T = 2\pi\sqrt{L/(g + a)}$ decreases.`),
    N('core', 'Swinging rod', R`A uniform rod 1.2 m long swings from one end. What is its period for small oscillations?`, Tq, 's', R`$T = 2\pi\sqrt{I/mgd}$ with $I = mL^2/3$, $d = L/2$.`, R`$T = 2\pi\sqrt{2L/3g} = ${f(Tq)}$ s.`),
    N('olympiad', 'Quality factor', R`A lightly damped oscillator's amplitude halves in 20 oscillations. What is its quality factor $Q$?`, Qd, '', R`Amplitude decays as $e^{-\gamma t/2}$ where $Q = \omega/\gamma$.`, R`$\gamma \cdot 20T/2 = \ln 2$, so $Q = \dfrac{\omega}{\gamma} = \dfrac{\pi \cdot 20}{\ln 2} = ${f(Qd)}$.`)
  ]);
  const dh = Math.pow(4 * Math.PI, 2) * 0.01 / (2 * g) * 100;
  X('fluids', [
    M('concept', 'Melting ice cube', R`An ice cube floats in a full glass of water. When it melts, the water level…`, ['rises and overflows', 'falls', 'stays the same', 'depends on the temperature'], 2, R`The floating ice displaces its own weight of water.`, R`It stays the same: the melted ice exactly fills the volume it displaced.`),
    N('core', 'Leaking tank', R`Water leaks from a small hole 2.0 m below the surface of an open tank. How fast does it come out?`, Math.sqrt(2 * g * 2), 'm/s', R`Torricelli: $v = \sqrt{2gh}$.`, R`$v = \sqrt{2 \times 9.8 \times 2.0} = ${f(Math.sqrt(2 * g * 2))}$ m/s.`),
    N('olympiad', 'Spinning bucket', R`A bucket of water of radius 10 cm spins at 2.0 revolutions per second. How much higher (in cm) is the water at the rim than at the centre?`, dh, 'cm', R`The surface is a paraboloid $z = \omega^2 r^2/2g$.`, R`$\omega = 4\pi$ rad/s, so $\Delta z = \dfrac{\omega^2R^2}{2g} = ${f(dh)}$ cm.`)
  ]);
  const vstr = Math.sqrt(70 / 0.0012), fstr = vstr / 1.3, fdop = 1000 * (343 + 30) / (343 - 30);
  X('waves', [
    M('concept', 'Closed pipe', R`A pipe closed at one end produces which harmonics?`, ['All harmonics', 'Odd harmonics only', 'Even harmonics only', 'Only the fundamental'], 1, R`There is a node at the closed end and an antinode at the open end.`, R`Only odd harmonics: $L = \lambda/4, 3\lambda/4, \dots$`),
    N('core', 'Guitar string', R`A string 0.65 m long with linear density 1.2 g/m is under 70 N tension. Find its fundamental frequency.`, fstr, 'Hz', R`$v = \sqrt{T/\mu}$, $f = v/2L$.`, R`$v = ${f(vstr)}$ m/s, $f = ${f(fstr)}$ Hz.`),
    N('olympiad', 'Radar echo', R`A stationary 1000 Hz source sends sound at a car approaching at 30 m/s. What frequency returns to the source? Speed of sound 343 m/s.`, fdop, 'Hz', R`The car first hears a shifted frequency and then re-emits it as a moving source.`, R`$f' = f\dfrac{v + u}{v - u} = ${f(fdop, 4)}$ Hz.`)
  ]);
  const vrms = Math.sqrt(3 * 8.314 * 300 / 0.028), Tmix = (200 * 4.18 * 30 - 50 * 334) / (250 * 4.18);
  X('thermal', [
    M('concept', 'Same temperature', R`Hydrogen and oxygen are at the same temperature. Which molecules have the larger average speed?`, ['Hydrogen', 'Oxygen', 'They are equal', 'It depends on pressure'], 0, R`Equal temperature means equal mean kinetic energy.`, R`Hydrogen: same $\tfrac12mv^2$, smaller $m$, so four times the rms speed.`),
    N('core', 'Nitrogen speed', R`Find the rms speed of nitrogen molecules ($M = 28$ g/mol) at 300 K.`, vrms, 'm/s', R`$v_{\text{rms}} = \sqrt{3RT/M}$.`, R`$v = ${f(vrms)}$ m/s.`),
    N('olympiad', 'Ice in a drink', R`50 g of ice at 0 °C is dropped into 200 g of water at 30 °C. Find the final temperature. $c = 4.18$ J/(g·K), $L_f = 334$ J/g.`, Tmix, '°C', R`First check that the water has enough heat to melt all the ice.`, R`The water can give $200 \times 4.18 \times 30 = 25\,080$ J; melting needs 16 700 J. The rest warms 250 g: $T = \dfrac{8380}{250\times4.18} = ${f(Tmix)}$ °C.`)
  ]);
  const dSmix = 4186 * (Math.log(323.15 / 353.15) + Math.log(323.15 / 293.15));
  X('thermodynamics', [
    M('concept', 'Adiabatic expansion', R`An ideal gas expands adiabatically. Its temperature…`, ['rises', 'falls', 'stays the same', 'depends on the gas'], 1, R`$Q = 0$, and the gas does work.`, R`It falls: $\Delta U = -W < 0$.`),
    N('core', 'Ideal fridge', R`What is the best possible coefficient of performance of a fridge with inside temperature 260 K in a 300 K kitchen?`, 6.5, '', R`$\text{COP} = T_c/(T_h - T_c)$.`, R`$260/40 = 6.5$.`),
    N('olympiad', 'Mixing entropy', R`1.0 kg of water at 80 °C is mixed with 1.0 kg at 20 °C in an insulated vessel. Find the total entropy change. $c = 4186$ J/(kg·K).`, dSmix, 'J/K', R`Each kilogram goes to 50 °C: $\Delta S = mc\ln(T_f/T_i)$.`, R`$\Delta S = 4186\left[\ln\dfrac{323.15}{353.15} + \ln\dfrac{323.15}{293.15}\right] = ${f(dSmix)}$ J/K, positive as it must be.`)
  ]);
  const Cpf = 8.85e-12 * 0.02 / 1e-3 * 1e12, Fimg = 8.99e9 * 1e-12 / (4 * 0.0025);
  X('electrostatics', [
    M('concept', 'Inside a conductor', R`In electrostatic equilibrium, the electric field inside a solid conductor is…`, ['zero', 'uniform and non-zero', 'largest at the centre', 'equal to the surface field'], 0, R`Free charges would move if there were a field.`, R`Zero; any excess charge sits on the surface.`),
    N('core', 'Plate capacitor', R`Two plates of area 0.020 m² are 1.0 mm apart in air. Find the capacitance in pF.`, Cpf, 'pF', R`$C = \varepsilon_0A/d$.`, R`$C = 8.85\times10^{-12}\times0.020/0.001 = ${f(Cpf)}$ pF.`),
    N('olympiad', 'Image charge', R`A 1.0 μC point charge is 5.0 cm from a large earthed conducting plane. What force attracts it to the plane?`, Fimg, 'N', R`Replace the plane with an image charge $-q$ at distance $2d$.`, R`$F = \dfrac{kq^2}{(2d)^2} = ${f(Fimg)}$ N.`)
  ]);
  X('circuits', [
    M('concept', 'One more resistor', R`A resistor is added in parallel to a circuit's existing resistor. The total resistance…`, ['increases', 'decreases', 'stays the same', 'could go either way'], 1, R`A new path is added for the current.`, R`It decreases: conductances add in parallel.`),
    N('core', 'Charging to 90%', R`A 47 μF capacitor charges through 10 kΩ. How long does it take to reach 90% of the supply voltage?`, 0.47 * Math.log(10), 's', R`$1 - e^{-t/RC} = 0.9$.`, R`$t = RC\ln10 = 0.47\times2.303 = ${f(0.47 * Math.log(10))}$ s.`),
    N('olympiad', 'Maximum power', R`A 12 V battery has internal resistance 0.50 Ω. What is the most power it can deliver to an external resistor?`, 72, 'W', R`Maximum transfer when the load equals the internal resistance.`, R`$P = \dfrac{\mathcal{E}^2}{4r} = \dfrac{144}{2} = 72$ W.`)
  ]);
  const rp = 1.6726e-27 * 2e6 / (1.602e-19 * 0.5) * 100, Bsq = 2 * Math.SQRT2 * 4 * Math.PI * 1e-7 * 5 / (Math.PI * 0.1) * 1e6;
  X('magnetism', [
    M('concept', 'Parallel motion', R`What magnetic force acts on a charge moving parallel to a magnetic field?`, ['Maximum', 'Zero', 'Half the maximum', 'Along the field'], 1, R`$F = qvB\sin\theta$.`, R`Zero: $\sin0 = 0$.`),
    N('core', 'Proton circle', R`A proton moves at $2.0\times10^6$ m/s perpendicular to a 0.50 T field. Find the radius of its path in cm.`, rp, 'cm', R`$r = mv/qB$.`, R`$r = ${f(rp)}$ cm.`),
    N('olympiad', 'Square loop', R`A square loop of side 10 cm carries 5.0 A. Find the field at its centre in μT.`, Bsq, 'μT', R`Each side is a finite wire: $B = \dfrac{\mu_0I}{4\pi d}(\sin\alpha_1 + \sin\alpha_2)$ with $d = a/2$ and $\alpha = 45^\circ$.`, R`Each side gives $\dfrac{\mu_0 I}{4\pi(a/2)}\sqrt2$; four sides give $B = \dfrac{2\sqrt2\,\mu_0 I}{\pi a} = ${f(Bsq)}$ μT.`)
  ]);
  X('induction', [
    M('concept', 'Magnet in a pipe', R`A strong magnet is dropped down a vertical copper pipe. Compared with free fall it…`, ['falls faster', 'falls more slowly', 'falls at the same rate', 'sticks to the pipe'], 1, R`Eddy currents oppose the change in flux (Lenz).`, R`It falls more slowly: induced currents in the copper produce a retarding force.`),
    N('core', 'Sliding rod', R`A 0.50 m rod slides at 4.0 m/s on rails in a 0.30 T field. The circuit resistance is 2.0 Ω. Find the current.`, 0.3, 'A', R`$\mathcal{E} = BLv$.`, R`$\mathcal{E} = 0.30\times0.50\times4.0 = 0.60$ V, $I = 0.30$ A.`),
    N('olympiad', 'Terminal rod', R`A 50 g rod falls between vertical rails 0.25 m apart in a horizontal 0.80 T field, closing a circuit of 1.0 Ω. Find its terminal speed.`, 0.05 * g * 1 / (0.64 * 0.0625), 'm/s', R`At terminal speed $B^2L^2v/R = mg$.`, R`$v = \dfrac{mgR}{B^2L^2} = ${f(0.05 * g / 0.04)}$ m/s.`)
  ]);
  X('geometric-optics', [
    M('concept', 'Plane mirror', R`The image in a plane mirror is…`, ['real and inverted', 'virtual and the same size', 'virtual and smaller', 'real and the same size'], 1, R`Rays only appear to come from behind the mirror.`, R`Virtual, upright, the same size and as far behind as the object is in front.`),
    N('core', 'Converging lens', R`An object is 15 cm from a converging lens of focal length 10 cm. How far from the lens is the image?`, 30, 'cm', R`$1/v = 1/f - 1/u$.`, R`$1/v = 1/10 - 1/15 = 1/30$, so $v = 30$ cm (real, magnification −2).`),
    N('olympiad', 'Two layers', R`A coin lies under 4.0 cm of water ($n = 4/3$) with 3.0 cm of oil ($n = 1.5$) floating on top. Looking straight down, how deep does the coin appear?`, 5, 'cm', R`Near-normal viewing: each layer appears $t/n$ thick.`, R`$4.0/(4/3) + 3.0/1.5 = 3.0 + 2.0 = 5.0$ cm.`)
  ]);
  const thEye = 1.22 * 550e-9 / 3e-3;
  X('wave-optics', [
    M('concept', 'Black soap film', R`Just before a soap film bursts, the top looks black in reflected light. Why?`, ['The film absorbs all light', 'The film is so thin that the two reflections cancel because of the half-wave shift at the front surface', 'Light passes straight through without reflection', 'Dust collects at the top'], 1, R`One of the two reflections has a phase change of π.`, R`For thickness ≪ λ the path difference is negligible, and the π shift at the air–soap surface makes the reflections cancel.`),
    N('core', 'Highest order', R`Light of 550 nm falls normally on a grating with 600 lines per mm. What is the highest order visible?`, 3, '', R`$d\sin\theta = n\lambda$ with $\sin\theta \le 1$.`, R`$d = 1.667$ μm, $d/\lambda = 3.03$, so $n_{\max} = 3$.`, 0.001),
    N('olympiad', 'Seeing headlights', R`Car headlights are 1.4 m apart. Using the Rayleigh criterion for a 3.0 mm pupil at 550 nm, at what distance (in km) can you just resolve them?`, 1.4 / thEye / 1000, 'km', R`$\theta = 1.22\lambda/D$.`, R`$\theta = ${f(thEye)}$ rad, so $L = 1.4/\theta = ${f(1.4 / thEye / 1000)}$ km. (In practice, eye defects make it rather less.)`)
  ]);
  const gm = 1 / Math.sqrt(1 - 0.995 * 0.995), dmu = gm * 0.995 * 3e8 * 2.2e-6, ge = 1 / Math.sqrt(1 - 0.99 * 0.99);
  X('relativity', [
    M('concept', 'Invariant', R`Which quantity has the same value in every inertial frame?`, ['Time between two events', 'Distance between two events', 'The spacetime interval between two events', 'Kinetic energy'], 2, R`$s^2 = c^2\Delta t^2 - \Delta x^2$.`, R`The spacetime interval; times and lengths separately are frame-dependent.`),
    N('core', 'Muon range', R`A muon (proper lifetime 2.2 μs) moves at $0.995c$. How far does it travel in one lifetime, as measured on Earth?`, dmu, 'm', R`Dilated lifetime $\gamma\tau$.`, R`$\gamma = ${f(gm)}$, distance $= \gamma v\tau = ${f(dmu)}$ m, not the 660 m you would naively expect.`),
    N('olympiad', 'Fast electron', R`How much kinetic energy (MeV) must be given to an electron ($mc^2 = 0.511$ MeV) to reach $0.99c$?`, (ge - 1) * 0.511, 'MeV', R`$K = (\gamma - 1)mc^2$.`, R`$\gamma = ${f(ge)}$, $K = ${f((ge - 1) * 0.511)}$ MeV.`)
  ]);
  const lam = 6.626e-34 / Math.sqrt(2 * 9.109e-31 * 1.602e-19 * 100) * 1e9;
  X('quantum', [
    M('concept', 'Brighter light', R`In the photoelectric effect, increasing the light intensity at fixed frequency…`, ['raises the maximum kinetic energy', 'raises the number of electrons emitted', 'lowers the threshold frequency', 'has no effect'], 1, R`Intensity is the number of photons; frequency sets each photon's energy.`, R`More photons, so more electrons, each with the same maximum energy.`),
    N('core', 'Electron wavelength', R`Find the de Broglie wavelength (nm) of an electron accelerated from rest through 100 V.`, lam, 'nm', R`$\lambda = h/\sqrt{2meV}$.`, R`$\lambda = ${f(lam)}$ nm, comparable to atomic spacings.`),
    N('olympiad', 'Positronium', R`Positronium is an electron bound to a positron. What is its ground-state energy in eV?`, -6.8, 'eV', R`Energy levels scale with the reduced mass.`, R`$\mu = m_e/2$, so $E_1 = -13.6/2 = -6.8$ eV.`)
  ]);
  const Qa = (209.982874 - 205.974465 - 4.002603) * 931.5, Ka = Qa * 206 / 210;
  X('nuclear', [
    M('concept', 'Beta minus', R`In β⁻ decay, the atomic number…`, ['falls by 1', 'rises by 1', 'falls by 2', 'is unchanged'], 1, R`A neutron becomes a proton.`, R`It rises by 1; the mass number is unchanged.`),
    N('core', 'Old wood', R`A piece of wood has 25% of the carbon-14 activity of living wood. How old is it? Half-life 5730 years.`, 11460, 'years', R`25% is two half-lives.`, R`$2 \times 5730 = 11\,460$ years.`),
    N('olympiad', 'Alpha energy', R`Polonium-210 (209.982874 u) α-decays to lead-206 (205.974465 u). With $m_\alpha = 4.002603$ u, find the α particle's kinetic energy in MeV.`, Ka, 'MeV', R`Find $Q$, then share it by momentum conservation.`, R`$Q = ${f(Qa, 4)}$ MeV; the α takes $Q \times 206/210 = ${f(Ka, 4)}$ MeV.`)
  ]);
  const thb = Math.acos(g / (100 * 0.2)), Om = 10 * Math.sin(thb);
  X('analytical', [
    M('concept', 'Noether', R`Which symmetry of a Lagrangian implies conservation of energy?`, ['Translation in space', 'Rotation', 'Translation in time', 'Reflection'], 2, R`Energy is conjugate to time.`, R`Invariance under time translation, i.e. $L$ has no explicit time dependence.`),
    N('core', 'Bead on a hoop', R`A bead slides on a frictionless hoop of radius 0.20 m spinning at 10 rad/s about its vertical diameter. At what angle from the bottom is its off-axis equilibrium?`, thb / rad, '°', R`$\cos\theta = g/\omega^2R$, which needs $\omega^2R > g$.`, R`$\cos\theta = 9.8/20 = 0.49$, $\theta = ${f(thb / rad)}^\circ$.`),
    N('olympiad', 'Wobbling bead', R`For the bead above (R = 0.20 m, ω = 10 rad/s), find the angular frequency of small oscillations about that equilibrium.`, Om, 'rad/s', R`Expand the effective potential; $\Omega^2 = \omega^2\sin^2\theta_0$.`, R`$\Omega = \omega\sin\theta_0 = 10\sqrt{1 - 0.49^2} = ${f(Om)}$ rad/s.`)
  ]);
  const Ledd = 4 * Math.PI * 6.674e-11 * 1.989e30 * 1.6726e-27 * 3e8 / 6.652e-29 / 1e31;
  X('astrophysics', [
    M('concept', 'Hubble', R`Hubble's law says that distant galaxies…`, ['all move towards us', 'recede at speeds proportional to their distance', 'have the same redshift', 'are older than nearby ones'], 1, R`$v = H_0d$.`, R`They recede with $v = H_0d$, as expected for uniform expansion.`),
    N('core', 'Sun’s peak', R`At what wavelength (nm) does a 5778 K black body radiate most strongly?`, 2.898e-3 / 5778 * 1e9, 'nm', R`Wien: $\lambda_{\max}T = 2.898\times10^{-3}$ m K.`, R`$\lambda = ${f(2.898e-3 / 5778 * 1e9)}$ nm, blue-green.`),
    N('olympiad', 'Eddington limit', R`Find the Eddington luminosity of one solar mass of ionised hydrogen, in units of $10^{31}$ W. Use $\sigma_T = 6.652\times10^{-29}$ m².`, Ledd, '× 10³¹ W', R`Radiation pressure on electrons balances gravity on protons: $L = 4\pi GMm_pc/\sigma_T$.`, R`$L = ${f(Ledd)}\times10^{31}$ W, about 33 000 times the Sun's luminosity.`)
  ]);
  const xs = [1, 2, 3, 4], ys = [2.1, 3.9, 6.2, 7.8], mx = 2.5, my = ys.reduce((a, b) => a + b) / 4;
  const slope = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / xs.reduce((a, x) => a + (x - mx) * (x - mx), 0);
  X('experimental', [
    M('concept', 'Zero error', R`A micrometer reads 0.02 mm with its jaws closed. This is…`, ['a random error', 'a systematic error', 'a parallax error', 'not an error'], 1, R`It shifts every reading the same way.`, R`A systematic (zero) error; subtract it from every reading.`),
    N('core', 'Pendulum g', R`$g = 4\pi^2L/T^2$. $L$ is known to 1.0% and $T$ to 0.50%, independently. What is the percentage uncertainty in $g$ (adding in quadrature)?`, Math.sqrt(1 + 1), '%', R`Relative uncertainties of powers multiply by the power.`, R`$\sqrt{1.0^2 + (2\times0.50)^2} = ${f(Math.SQRT2)}\%$.`),
    N('olympiad', 'Least squares', R`Fit a straight line by least squares to the points (1, 2.1), (2, 3.9), (3, 6.2), (4, 7.8). What is the slope?`, slope, '', R`$m = \dfrac{\sum(x - \bar x)(y - \bar y)}{\sum(x - \bar x)^2}$.`, R`$\bar x = 2.5$, $\bar y = ${f(my)}$, and $m = ${f(slope)}$.`)
  ]);
})();
