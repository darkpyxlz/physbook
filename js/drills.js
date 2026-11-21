/* Scibook practice-gym drill generators. Each gen(r) returns { q, answer, unit, solution, tol? }.
   r is a seeded random source with r.int(lo, hi), r.step(lo, hi, step) and r.pick(array). */
(function () {
  const R = PB.R, D = PB.addDrills, g = 9.8;
  const f = (x, s) => +(+x).toPrecision(s || 3);
  const deg = Math.PI / 180;

  D('toolkit', [
    { title: 'Unit conversion', gen(r) {
      const v = r.int(20, 130);
      return { q: R`<p>Convert $${v}\ \mathrm{km/h}$ to metres per second.</p>`, answer: v / 3.6, unit: 'm/s', solution: R`<p>Divide by 3.6: $${v}/3.6 = ${f(v / 3.6)}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Dot product', gen(r) {
      const a = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], b = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)];
      const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      return { q: R`<p>Find $\vec A\cdot\vec B$ for $\vec A = (${a.join(', ')})$ and $\vec B = (${b.join(', ')})$.</p>`, answer: d, tol: 0.001, unit: '', solution: R`<p>Multiply matching components and add: $${d}$.</p>` }; } },
    { title: 'Binomial approximation', gen(r) {
      const x = r.step(0.01, 0.06, 0.005), n = r.pick([-2, -0.5, 0.5, 3]);
      return { q: R`<p>Use $(1+x)^n \approx 1 + nx$ to estimate $(1 + ${x})^{${n}}$.</p>`, answer: 1 + n * x, tol: 0.002, unit: '', solution: R`<p>$1 + (${n})(${x}) = ${f(1 + n * x, 5)}$. The exact value is $${f(Math.pow(1 + x, n), 5)}$.</p>` }; } }
  ]);

  D('kinematics', [
    { title: 'Stopping distance', gen(r) {
      const v = r.int(10, 35), a = r.step(3, 8, 0.5);
      return { q: R`<p>A car moving at $${v}\ \mathrm{m/s}$ brakes at a constant $${a}\ \mathrm{m/s^2}$. How far does it travel before stopping?</p>`, answer: v * v / (2 * a), unit: 'm', solution: R`<p>$v^2 = u^2 - 2as$ with $v = 0$: $s = u^2/2a = ${v * v}/${2 * a} = ${f(v * v / (2 * a))}\ \mathrm m$.</p>` }; } },
    { title: 'Projectile range', gen(r) {
      const v = r.int(10, 30), th = r.pick([15, 20, 30, 35, 40, 50, 55, 60, 70]);
      const R0 = v * v * Math.sin(2 * th * deg) / g;
      return { q: R`<p>A ball is launched at $${v}\ \mathrm{m/s}$ and $${th}^\circ$ above level ground. Find its range. ($g = 9.8\ \mathrm{m/s^2}$)</p>`, answer: R0, unit: 'm', solution: R`<p>$R = v^2\sin2\theta/g = ${v * v}\sin${2 * th}^\circ/9.8 = ${f(R0)}\ \mathrm m$.</p>` }; } },
    { title: 'Dropped from a height', gen(r) {
      const hgt = r.int(5, 80);
      return { q: R`<p>A stone is dropped from rest from a height of $${hgt}\ \mathrm m$. How long does it take to reach the ground?</p>`, answer: Math.sqrt(2 * hgt / g), unit: 's', solution: R`<p>$t = \sqrt{2h/g} = \sqrt{${2 * hgt}/9.8} = ${f(Math.sqrt(2 * hgt / g))}\ \mathrm s$.</p>` }; } }
  ]);

  D('newton', [
    { title: 'Atwood machine', gen(r) {
      const m1 = r.int(2, 9), m2 = r.int(1, m1 - 1);
      const a = (m1 - m2) * g / (m1 + m2);
      return { q: R`<p>Masses of $${m1}\ \mathrm{kg}$ and $${m2}\ \mathrm{kg}$ hang over a light frictionless pulley. Find their acceleration.</p>`, answer: a, unit: 'm/s²', solution: R`<p>$a = \dfrac{(m_1 - m_2)g}{m_1 + m_2} = \dfrac{${m1 - m2}(9.8)}{${m1 + m2}} = ${f(a)}\ \mathrm{m/s^2}$.</p>` }; } },
    { title: 'Rough incline', gen(r) {
      const th = r.pick([25, 30, 35, 40, 45, 50]), mu = r.step(0.1, 0.4, 0.05);
      const a = g * (Math.sin(th * deg) - mu * Math.cos(th * deg));
      return { q: R`<p>A block slides down a $${th}^\circ$ slope with $\mu_k = ${mu}$. Find its acceleration.</p>`, answer: a, unit: 'm/s²', solution: R`<p>$a = g(\sin\theta - \mu_k\cos\theta) = 9.8(${f(Math.sin(th * deg))} - ${mu}\times${f(Math.cos(th * deg))}) = ${f(a)}\ \mathrm{m/s^2}$.</p>` }; } },
    { title: 'Lift scale', gen(r) {
      const m = r.int(45, 95), a = r.step(0.5, 3, 0.5), up = r.pick([true, false]);
      const N = m * (g + (up ? a : -a));
      return { q: R`<p>A ${m} kg person stands on scales in a lift accelerating ${up ? 'upward' : 'downward'} at $${a}\ \mathrm{m/s^2}$. What force do the scales read?</p>`, answer: N, unit: 'N', solution: R`<p>$N = m(g ${up ? '+' : '-'} a) = ${m}(9.8 ${up ? '+' : '-'} ${a}) = ${f(N)}\ \mathrm N$.</p>` }; } }
  ]);

  D('energy', [
    { title: 'Speed at the bottom', gen(r) {
      const hgt = r.step(0.5, 12, 0.5);
      return { q: R`<p>A frictionless slide drops $${hgt}\ \mathrm m$. How fast is a child moving at the bottom if they start from rest?</p>`, answer: Math.sqrt(2 * g * hgt), unit: 'm/s', solution: R`<p>$v = \sqrt{2gh} = \sqrt{2(9.8)(${hgt})} = ${f(Math.sqrt(2 * g * hgt))}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Spring energy', gen(r) {
      const k = r.int(50, 800), x = r.step(0.02, 0.3, 0.01);
      return { q: R`<p>How much energy is stored in a spring of stiffness $${k}\ \mathrm{N/m}$ compressed by $${x}\ \mathrm m$?</p>`, answer: 0.5 * k * x * x, unit: 'J', solution: R`<p>$U = \tfrac12 kx^2 = \tfrac12(${k})(${x})^2 = ${f(0.5 * k * x * x)}\ \mathrm J$.</p>` }; } },
    { title: 'Power climbing stairs', gen(r) {
      const m = r.int(40, 90), hgt = r.int(3, 15), t = r.int(4, 20);
      return { q: R`<p>A ${m} kg student runs up stairs of total height $${hgt}\ \mathrm m$ in $${t}\ \mathrm s$. What average power do they develop against gravity?</p>`, answer: m * g * hgt / t, unit: 'W', solution: R`<p>$P = mgh/t = ${m}(9.8)(${hgt})/${t} = ${f(m * g * hgt / t)}\ \mathrm W$.</p>` }; } }
  ]);

  D('momentum', [
    { title: 'Sticking together', gen(r) {
      const m1 = r.int(1, 6), m2 = r.int(1, 6), u = r.int(2, 9);
      return { q: R`<p>A ${m1} kg cart moving at $${u}\ \mathrm{m/s}$ hits a stationary ${m2} kg cart and they stick. Find their common speed.</p>`, answer: m1 * u / (m1 + m2), unit: 'm/s', solution: R`<p>$v = m_1u/(m_1 + m_2) = ${m1 * u}/${m1 + m2} = ${f(m1 * u / (m1 + m2))}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Average impact force', gen(r) {
      const m = r.step(0.05, 0.5, 0.05), v1 = r.int(5, 30), v2 = r.int(5, 30), t = r.int(2, 20);
      const F = m * (v1 + v2) / (t / 1000);
      return { q: R`<p>A $${m}\ \mathrm{kg}$ ball hits a wall at $${v1}\ \mathrm{m/s}$ and rebounds at $${v2}\ \mathrm{m/s}$. Contact lasts $${t}\ \mathrm{ms}$. Find the average force.</p>`, answer: F, unit: 'N', solution: R`<p>$\bar F = m\Delta v/\Delta t = ${m}(${v1 + v2})/${t / 1000} = ${f(F)}\ \mathrm N$.</p>` }; } },
    { title: 'Recoil', gen(r) {
      const M = r.int(2, 8), m = r.step(0.005, 0.05, 0.005), v = r.int(200, 900);
      return { q: R`<p>A $${M}\ \mathrm{kg}$ rifle fires a $${m * 1000}\ \mathrm g$ bullet at $${v}\ \mathrm{m/s}$. What is the rifle's recoil speed?</p>`, answer: m * v / M, unit: 'm/s', solution: R`<p>Momentum is conserved: $V = mv/M = ${f(m * v)}/${M} = ${f(m * v / M)}\ \mathrm{m/s}$.</p>` }; } }
  ]);

  D('rotation', [
    { title: 'Rolling speed', gen(r) {
      const shape = r.pick([['solid sphere', 0.4], ['solid cylinder', 0.5], ['hoop', 1], ['hollow sphere', 2 / 3]]), hgt = r.step(0.5, 5, 0.5);
      const v = Math.sqrt(2 * g * hgt / (1 + shape[1]));
      return { q: R`<p>A ${shape[0]} rolls without slipping from rest down a height of $${hgt}\ \mathrm m$. Find its speed at the bottom.</p>`, answer: v, unit: 'm/s', solution: R`<p>$v = \sqrt{2gh/(1 + k)}$ with $k = ${f(shape[1])}$: $v = ${f(v)}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Torque and angular acceleration', gen(r) {
      const M = r.int(1, 10), Rr = r.step(0.1, 0.5, 0.05), F = r.int(2, 30);
      const a = F * Rr / (0.5 * M * Rr * Rr);
      return { q: R`<p>A force of $${F}\ \mathrm N$ is applied tangentially to the rim of a uniform disc ($${M}\ \mathrm{kg}$, radius $${Rr}\ \mathrm m$) on a fixed axle. Find the angular acceleration.</p>`, answer: a, unit: 'rad/s²', solution: R`<p>$\alpha = FR/(\tfrac12 MR^2) = 2F/(MR) = ${f(a)}\ \mathrm{rad/s^2}$.</p>` }; } },
    { title: 'Spinning up', gen(r) {
      const I1 = r.int(2, 10), w1 = r.int(1, 6), I2 = r.step(0.5, I1 - 0.5, 0.5);
      return { q: R`<p>A skater with $I = ${I1}\ \mathrm{kg\,m^2}$ spins at $${w1}\ \mathrm{rad/s}$, then pulls in her arms to $I = ${I2}\ \mathrm{kg\,m^2}$. What is her new angular speed?</p>`, answer: I1 * w1 / I2, unit: 'rad/s', solution: R`<p>$I_1\omega_1 = I_2\omega_2$: $\omega_2 = ${I1 * w1}/${I2} = ${f(I1 * w1 / I2)}\ \mathrm{rad/s}$.</p>` }; } }
  ]);

  D('gravitation', [
    { title: 'Orbital speed', gen(r) {
      const hk = r.int(200, 2000), rr = 6.37e6 + hk * 1000, GM = 3.986e14;
      return { q: R`<p>Find the speed of a satellite in a circular orbit $${hk}\ \mathrm{km}$ above Earth's surface. ($GM_E = 3.986\times10^{14}\ \mathrm{m^3/s^2}$, $R_E = 6370\ \mathrm{km}$)</p>`, answer: Math.sqrt(GM / rr), unit: 'm/s', solution: R`<p>$v = \sqrt{GM/r}$ with $r = ${f(rr / 1e6, 4)}\times10^6\ \mathrm m$: $v = ${f(Math.sqrt(GM / rr))}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Kepler period', gen(r) {
      const a = r.step(0.4, 30, 0.1);
      return { q: R`<p>A planet orbits the Sun with semi-major axis $${a}\ \mathrm{AU}$. What is its period in years?</p>`, answer: Math.pow(a, 1.5), unit: 'years', solution: R`<p>$T = a^{3/2} = ${f(Math.pow(a, 1.5))}$ years.</p>` }; } },
    { title: 'Surface gravity', gen(r) {
      const mr = r.step(0.1, 5, 0.1), rr = r.step(0.3, 3, 0.1);
      return { q: R`<p>A planet has ${mr} times Earth's mass and ${rr} times Earth's radius. What is its surface gravity? (Earth: $9.8\ \mathrm{m/s^2}$)</p>`, answer: 9.8 * mr / (rr * rr), unit: 'm/s²', solution: R`<p>$g \propto M/R^2$: $9.8 \times ${mr}/${rr}^2 = ${f(9.8 * mr / (rr * rr))}\ \mathrm{m/s^2}$.</p>` }; } }
  ]);

  D('oscillations', [
    { title: 'Pendulum period', gen(r) {
      const L = r.step(0.2, 3, 0.1);
      return { q: R`<p>Find the period of a simple pendulum of length $${L}\ \mathrm m$.</p>`, answer: 2 * Math.PI * Math.sqrt(L / g), unit: 's', solution: R`<p>$T = 2\pi\sqrt{L/g} = ${f(2 * Math.PI * Math.sqrt(L / g))}\ \mathrm s$.</p>` }; } },
    { title: 'Spring frequency', gen(r) {
      const k = r.int(20, 600), m = r.step(0.1, 3, 0.1);
      return { q: R`<p>A $${m}\ \mathrm{kg}$ mass oscillates on a spring with $k = ${k}\ \mathrm{N/m}$. Find the frequency in hertz.</p>`, answer: Math.sqrt(k / m) / (2 * Math.PI), unit: 'Hz', solution: R`<p>$f = \frac{1}{2\pi}\sqrt{k/m} = ${f(Math.sqrt(k / m) / (2 * Math.PI))}\ \mathrm{Hz}$.</p>` }; } },
    { title: 'Maximum speed in SHM', gen(r) {
      const A = r.step(0.02, 0.3, 0.01), fr = r.step(0.5, 5, 0.5);
      return { q: R`<p>An oscillator has amplitude $${A}\ \mathrm m$ and frequency $${fr}\ \mathrm{Hz}$. What is its maximum speed?</p>`, answer: A * 2 * Math.PI * fr, unit: 'm/s', solution: R`<p>$v_{\max} = A\omega = ${A}(2\pi\times${fr}) = ${f(A * 2 * Math.PI * fr)}\ \mathrm{m/s}$.</p>` }; } }
  ]);

  D('fluids', [
    { title: 'Pressure at depth', gen(r) {
      const d = r.int(2, 60);
      return { q: R`<p>What is the gauge pressure (above atmospheric) at a depth of $${d}\ \mathrm m$ in fresh water?</p>`, answer: 1000 * g * d, unit: 'Pa', solution: R`<p>$\rho gh = 1000(9.8)(${d}) = ${f(1000 * g * d)}\ \mathrm{Pa}$.</p>` }; } },
    { title: 'Floating fraction', gen(r) {
      const rb = r.int(300, 950), rf = r.pick([1000, 1025, 1260]);
      return { q: R`<p>A block of density $${rb}\ \mathrm{kg/m^3}$ floats in a liquid of density $${rf}\ \mathrm{kg/m^3}$. What percentage of its volume is submerged?</p>`, answer: 100 * rb / rf, unit: '%', solution: R`<p>Submerged fraction $= \rho_b/\rho_f = ${f(100 * rb / rf)}\%$.</p>` }; } },
    { title: 'Continuity', gen(r) {
      const d1 = r.int(3, 10), d2 = r.int(1, d1 - 1), v = r.step(0.5, 3, 0.5);
      return { q: R`<p>Water flows at $${v}\ \mathrm{m/s}$ in a pipe of diameter $${d1}\ \mathrm{cm}$, which narrows to $${d2}\ \mathrm{cm}$. Find the speed in the narrow part.</p>`, answer: v * (d1 / d2) * (d1 / d2), unit: 'm/s', solution: R`<p>$v_2 = v_1(d_1/d_2)^2 = ${v}(${d1}/${d2})^2 = ${f(v * (d1 / d2) * (d1 / d2))}\ \mathrm{m/s}$.</p>` }; } }
  ]);

  D('waves', [
    { title: 'Wavelength', gen(r) {
      const fr = r.int(100, 2000);
      return { q: R`<p>What is the wavelength of a $${fr}\ \mathrm{Hz}$ sound wave in air ($v = 343\ \mathrm{m/s}$)?</p>`, answer: 343 / fr, unit: 'm', solution: R`<p>$\lambda = v/f = 343/${fr} = ${f(343 / fr)}\ \mathrm m$.</p>` }; } },
    { title: 'String harmonic', gen(r) {
      const L = r.step(0.3, 2, 0.1), v = r.int(100, 500), n = r.int(1, 5);
      return { q: R`<p>A string of length $${L}\ \mathrm m$ fixed at both ends carries waves at $${v}\ \mathrm{m/s}$. Find the frequency of harmonic number $n = ${n}$.</p>`, answer: n * v / (2 * L), unit: 'Hz', solution: R`<p>$f_n = nv/2L = ${n}(${v})/${f(2 * L)} = ${f(n * v / (2 * L))}\ \mathrm{Hz}$.</p>` }; } },
    { title: 'Doppler', gen(r) {
      const f0 = r.int(300, 1000), u = r.int(10, 40), app = r.pick([true, false]);
      const fp = f0 * 343 / (343 + (app ? -u : u));
      return { q: R`<p>A source emitting $${f0}\ \mathrm{Hz}$ moves ${app ? 'toward' : 'away from'} you at $${u}\ \mathrm{m/s}$. What frequency do you hear? ($v = 343\ \mathrm{m/s}$)</p>`, answer: fp, tol: 0.005, unit: 'Hz', solution: R`<p>$f' = f\,v/(v ${app ? '-' : '+'} u) = ${f(fp, 4)}\ \mathrm{Hz}$.</p>` }; } }
  ]);

  D('thermal', [
    { title: 'Heating water', gen(r) {
      const m = r.step(0.1, 3, 0.1), dT = r.int(5, 80);
      return { q: R`<p>How much heat raises $${m}\ \mathrm{kg}$ of water by $${dT}\ \mathrm K$? ($c = 4186\ \mathrm{J\,kg^{-1}K^{-1}}$)</p>`, answer: m * 4186 * dT, unit: 'J', solution: R`<p>$Q = mc\Delta T = ${f(m * 4186 * dT)}\ \mathrm J$.</p>` }; } },
    { title: 'RMS speed', gen(r) {
      const gas = r.pick([['helium', 0.004], ['nitrogen', 0.028], ['oxygen', 0.032], ['argon', 0.040], ['hydrogen', 0.002]]), T = r.int(100, 1000);
      const v = Math.sqrt(3 * 8.314 * T / gas[1]);
      return { q: R`<p>Find the rms speed of ${gas[0]} molecules ($M = ${gas[1]}\ \mathrm{kg/mol}$) at $${T}\ \mathrm K$.</p>`, answer: v, unit: 'm/s', solution: R`<p>$v_{\text{rms}} = \sqrt{3RT/M} = ${f(v)}\ \mathrm{m/s}$.</p>` }; } },
    { title: 'Ideal gas', gen(r) {
      const n = r.step(0.5, 5, 0.5), T = r.int(250, 600), V = r.int(5, 50);
      const P = n * 8.314 * T / (V / 1000);
      return { q: R`<p>$${n}$ mol of ideal gas at $${T}\ \mathrm K$ fills $${V}\ \mathrm L$. Find its pressure.</p>`, answer: P, unit: 'Pa', solution: R`<p>$P = nRT/V = ${n}(8.314)(${T})/${V / 1000} = ${f(P)}\ \mathrm{Pa}$.</p>` }; } }
  ]);

  D('thermodynamics', [
    { title: 'Carnot efficiency', gen(r) {
      const Tc = r.int(250, 400), Th = r.int(Tc + 100, 1200);
      return { q: R`<p>What is the maximum efficiency (in %) of an engine running between $${Th}\ \mathrm K$ and $${Tc}\ \mathrm K$?</p>`, answer: 100 * (1 - Tc / Th), unit: '%', solution: R`<p>$\eta = 1 - T_C/T_H = ${f(100 * (1 - Tc / Th))}\%$.</p>` }; } },
    { title: 'Isothermal work', gen(r) {
      const n = r.step(0.5, 4, 0.5), T = r.int(250, 500), ratio = r.pick([1.5, 2, 3, 4, 5]);
      const W = n * 8.314 * T * Math.log(ratio);
      return { q: R`<p>$${n}$ mol of ideal gas expands isothermally at $${T}\ \mathrm K$ to ${ratio} times its volume. How much work does it do?</p>`, answer: W, unit: 'J', solution: R`<p>$W = nRT\ln(V_2/V_1) = ${f(W)}\ \mathrm J$.</p>` }; } },
    { title: 'Adiabatic compression', gen(r) {
      const T1 = r.int(250, 350), rr = r.int(2, 15), gam = r.pick([1.4, 5 / 3]);
      const T2 = T1 * Math.pow(rr, gam - 1);
      return { q: R`<p>An ideal gas with $\gamma = ${f(gam)}$ at $${T1}\ \mathrm K$ is compressed adiabatically to $1/${rr}$ of its volume. Find the final temperature.</p>`, answer: T2, unit: 'K', solution: R`<p>$T_2 = T_1 r^{\gamma - 1} = ${f(T2)}\ \mathrm K$.</p>` }; } }
  ]);

  D('electrostatics', [
    { title: 'Coulomb force', gen(r) {
      const q1 = r.int(1, 9), q2 = r.int(1, 9), d = r.step(0.05, 0.5, 0.05);
      const F = 8.988e9 * q1 * q2 * 1e-12 / (d * d);
      return { q: R`<p>Find the force between charges of $${q1}\ \mu\mathrm C$ and $${q2}\ \mu\mathrm C$ that are $${d}\ \mathrm m$ apart.</p>`, answer: F, unit: 'N', solution: R`<p>$F = kq_1q_2/r^2 = ${f(F)}\ \mathrm N$.</p>` }; } },
    { title: 'Field of a point charge', gen(r) {
      const q = r.int(1, 20), d = r.step(0.1, 2, 0.1);
      return { q: R`<p>What is the electric field strength $${d}\ \mathrm m$ from a $${q}\ \mathrm{nC}$ point charge?</p>`, answer: 8.988e9 * q * 1e-9 / (d * d), unit: 'N/C', solution: R`<p>$E = kq/r^2 = ${f(8.988e9 * q * 1e-9 / (d * d))}\ \mathrm{N/C}$.</p>` }; } },
    { title: 'Energy from a potential difference', gen(r) {
      const V = r.int(50, 5000);
      return { q: R`<p>A proton accelerates from rest through $${V}\ \mathrm V$. What kinetic energy does it gain, in joules?</p>`, answer: 1.602e-19 * V, unit: 'J', solution: R`<p>$K = eV = (1.602\times10^{-19})(${V}) = ${f(1.602e-19 * V)}\ \mathrm J$, i.e. $${V}\ \mathrm{eV}$.</p>` }; } }
  ]);

  D('circuits', [
    { title: 'Parallel resistors', gen(r) {
      const a = r.int(2, 100), b = r.int(2, 100);
      return { q: R`<p>Find the equivalent resistance of $${a}\ \Omega$ and $${b}\ \Omega$ in parallel.</p>`, answer: a * b / (a + b), unit: 'Ω', solution: R`<p>$R = ab/(a + b) = ${a * b}/${a + b} = ${f(a * b / (a + b))}\ \Omega$.</p>` }; } },
    { title: 'Power in a resistor', gen(r) {
      const V = r.int(3, 240), Rr = r.int(5, 500);
      return { q: R`<p>What power does a $${Rr}\ \Omega$ resistor dissipate with $${V}\ \mathrm V$ across it?</p>`, answer: V * V / Rr, unit: 'W', solution: R`<p>$P = V^2/R = ${V * V}/${Rr} = ${f(V * V / Rr)}\ \mathrm W$.</p>` }; } },
    { title: 'RC time constant', gen(r) {
      const Rk = r.int(1, 100), C = r.int(1, 470), frac = r.pick([0.5, 0.25, 0.1]);
      const t = Rk * 1e3 * C * 1e-6 * Math.log(1 / frac);
      return { q: R`<p>A $${C}\ \mu\mathrm F$ capacitor discharges through $${Rk}\ \mathrm{k}\Omega$. How long until its voltage falls to ${frac * 100}% of the starting value?</p>`, answer: t, unit: 's', solution: R`<p>$t = RC\ln(1/${frac}) = ${f(Rk * C / 1000)}\ \mathrm s \times ${f(Math.log(1 / frac))} = ${f(t)}\ \mathrm s$.</p>` }; } }
  ]);

  D('magnetism', [
    { title: 'Field of a wire', gen(r) {
      const I = r.int(1, 50), d = r.step(0.01, 0.2, 0.01);
      return { q: R`<p>Find the magnetic field $${d}\ \mathrm m$ from a long straight wire carrying $${I}\ \mathrm A$.</p>`, answer: 2e-7 * I / d, unit: 'T', solution: R`<p>$B = \mu_0I/(2\pi r) = (2\times10^{-7})(${I})/${d} = ${f(2e-7 * I / d)}\ \mathrm T$.</p>` }; } },
    { title: 'Cyclotron radius', gen(r) {
      const v = r.int(1, 9), B = r.step(0.1, 2, 0.1);
      const rr = 1.673e-27 * v * 1e6 / (1.602e-19 * B);
      return { q: R`<p>A proton moves at $${v}\times10^6\ \mathrm{m/s}$ perpendicular to a $${B}\ \mathrm T$ field. Find the radius of its path.</p>`, answer: rr, unit: 'm', solution: R`<p>$r = mv/(qB) = ${f(rr)}\ \mathrm m$.</p>` }; } },
    { title: 'Force on a wire', gen(r) {
      const I = r.int(1, 20), L = r.step(0.1, 2, 0.1), B = r.step(0.05, 1, 0.05), th = r.pick([30, 45, 60, 90]);
      const F = I * L * B * Math.sin(th * deg);
      return { q: R`<p>A $${L}\ \mathrm m$ wire carrying $${I}\ \mathrm A$ makes $${th}^\circ$ with a $${B}\ \mathrm T$ field. Find the force on it.</p>`, answer: F, unit: 'N', solution: R`<p>$F = ILB\sin\theta = ${f(F)}\ \mathrm N$.</p>` }; } }
  ]);

  D('induction', [
    { title: 'Motional emf', gen(r) {
      const B = r.step(0.1, 1.5, 0.1), L = r.step(0.1, 1, 0.1), v = r.int(1, 20);
      return { q: R`<p>A $${L}\ \mathrm m$ rod moves at $${v}\ \mathrm{m/s}$ perpendicular to a $${B}\ \mathrm T$ field. Find the induced emf.</p>`, answer: B * L * v, unit: 'V', solution: R`<p>$\mathcal E = BLv = ${f(B * L * v)}\ \mathrm V$.</p>` }; } },
    { title: 'Inductive reactance', gen(r) {
      const L = r.int(5, 500), fr = r.pick([50, 60, 100, 400, 1000]);
      return { q: R`<p>Find the reactance of a $${L}\ \mathrm{mH}$ inductor at $${fr}\ \mathrm{Hz}$.</p>`, answer: 2 * Math.PI * fr * L / 1000, unit: 'Ω', solution: R`<p>$X_L = 2\pi fL = ${f(2 * Math.PI * fr * L / 1000)}\ \Omega$.</p>` }; } },
    { title: 'Resonant frequency', gen(r) {
      const L = r.int(1, 200), C = r.int(1, 100);
      const fr = 1 / (2 * Math.PI * Math.sqrt(L * 1e-3 * C * 1e-6));
      return { q: R`<p>Find the resonant frequency of an LC circuit with $L = ${L}\ \mathrm{mH}$ and $C = ${C}\ \mu\mathrm F$.</p>`, answer: fr, unit: 'Hz', solution: R`<p>$f_0 = 1/(2\pi\sqrt{LC}) = ${f(fr)}\ \mathrm{Hz}$.</p>` }; } }
  ]);

  D('geometric-optics', [
    { title: 'Thin lens image', gen(r) {
      const fl = r.int(5, 30), dO = r.int(fl + 3, 4 * fl);
      const di = dO * fl / (dO - fl);
      return { q: R`<p>An object is $${dO}\ \mathrm{cm}$ from a converging lens of focal length $${fl}\ \mathrm{cm}$. Where is the image (distance from the lens, in cm)?</p>`, answer: di, unit: 'cm', solution: R`<p>$1/d_i = 1/f - 1/d_o$, so $d_i = ${f(di)}\ \mathrm{cm}$.</p>` }; } },
    { title: 'Snell’s law', gen(r) {
      const n2 = r.pick([1.33, 1.46, 1.5, 1.52, 1.65, 2.42]), th = r.int(10, 80);
      const t2 = Math.asin(Math.sin(th * deg) / n2) / deg;
      return { q: R`<p>Light passes from air into a medium with $n = ${n2}$ at $${th}^\circ$ to the normal. Find the angle of refraction.</p>`, answer: t2, unit: '°', tol: 0.01, solution: R`<p>$\sin\theta_2 = \sin${th}^\circ/${n2}$, so $\theta_2 = ${f(t2)}^\circ$.</p>` }; } },
    { title: 'Critical angle', gen(r) {
      const n = r.pick([1.33, 1.46, 1.5, 1.52, 1.65, 1.8, 2.42]);
      return { q: R`<p>Find the critical angle for light inside a material with $n = ${n}$ meeting a boundary with air.</p>`, answer: Math.asin(1 / n) / deg, unit: '°', tol: 0.01, solution: R`<p>$\theta_c = \arcsin(1/${n}) = ${f(Math.asin(1 / n) / deg)}^\circ$.</p>` }; } }
  ]);

  D('wave-optics', [
    { title: 'Fringe spacing', gen(r) {
      const lam = r.int(400, 700), d = r.step(0.1, 1, 0.05), L = r.step(0.5, 3, 0.5);
      const y = lam * 1e-9 * L / (d * 1e-3) * 1000;
      return { q: R`<p>Two slits $${d}\ \mathrm{mm}$ apart are lit by $${lam}\ \mathrm{nm}$ light. Find the fringe spacing on a screen $${L}\ \mathrm m$ away, in mm.</p>`, answer: y, unit: 'mm', solution: R`<p>$\Delta y = \lambda L/d = ${f(y)}\ \mathrm{mm}$.</p>` }; } },
    { title: 'Grating angle', gen(r) {
      const lam = r.int(400, 700), N = r.pick([100, 300, 500, 600, 1000]), m = r.int(1, 2);
      const s = m * lam * 1e-9 * N * 1000;
      if (s >= 1) return this.gen(PB.rng(r.int(1, 1e9)));
      return { q: R`<p>Light of $${lam}\ \mathrm{nm}$ hits a grating with $${N}$ lines per mm. Find the angle of the order $m = ${m}$ maximum.</p>`, answer: Math.asin(s) / deg, unit: '°', tol: 0.01, solution: R`<p>$\sin\theta = m\lambda/d = ${f(s)}$, so $\theta = ${f(Math.asin(s) / deg)}^\circ$.</p>` }; } },
    { title: 'Malus’s law', gen(r) {
      const I0 = r.int(10, 200), th = r.int(10, 80);
      return { q: R`<p>Polarised light of intensity $${I0}\ \mathrm{W/m^2}$ meets a polariser at $${th}^\circ$ to its polarisation. What intensity passes?</p>`, answer: I0 * Math.pow(Math.cos(th * deg), 2), unit: 'W/m²', solution: R`<p>$I = I_0\cos^2\theta = ${f(I0 * Math.pow(Math.cos(th * deg), 2))}\ \mathrm{W/m^2}$.</p>` }; } }
  ]);

  D('relativity', [
    { title: 'Lorentz factor', gen(r) {
      const b = r.step(0.1, 0.99, 0.01);
      return { q: R`<p>Find $\gamma$ for a speed of $${b}c$.</p>`, answer: 1 / Math.sqrt(1 - b * b), unit: '', solution: R`<p>$\gamma = 1/\sqrt{1 - ${b}^2} = ${f(1 / Math.sqrt(1 - b * b), 4)}$.</p>` }; } },
    { title: 'Time dilation', gen(r) {
      const b = r.step(0.5, 0.99, 0.01), t0 = r.int(1, 20);
      return { q: R`<p>A clock moving at $${b}c$ ticks off $${t0}\ \mathrm s$ of proper time. How much time passes in the lab?</p>`, answer: t0 / Math.sqrt(1 - b * b), unit: 's', solution: R`<p>$\Delta t = \gamma\Delta\tau = ${f(t0 / Math.sqrt(1 - b * b))}\ \mathrm s$.</p>` }; } },
    { title: 'Velocity addition', gen(r) {
      const u = r.step(0.1, 0.9, 0.1), v = r.step(0.1, 0.9, 0.1);
      return { q: R`<p>A ship moving at $${v}c$ fires a probe forward at $${u}c$ relative to itself. How fast does the probe move in the original frame (as a fraction of $c$)?</p>`, answer: (u + v) / (1 + u * v), unit: 'c', tol: 0.005, solution: R`<p>$w = (u + v)/(1 + uv) = ${f((u + v) / (1 + u * v), 4)}c$.</p>` }; } }
  ]);

  D('quantum', [
    { title: 'Photon energy', gen(r) {
      const lam = r.int(100, 1500);
      return { q: R`<p>Find the energy of a $${lam}\ \mathrm{nm}$ photon in eV.</p>`, answer: 1240 / lam, unit: 'eV', solution: R`<p>$E = 1240/${lam} = ${f(1240 / lam)}\ \mathrm{eV}$.</p>` }; } },
    { title: 'Hydrogen transition', gen(r) {
      const n1 = r.int(1, 3), n2 = r.int(n1 + 1, n1 + 4);
      const E = 13.6 * (1 / (n1 * n1) - 1 / (n2 * n2));
      return { q: R`<p>Find the wavelength (in nm) of the photon emitted when hydrogen drops from $n = ${n2}$ to $n = ${n1}$.</p>`, answer: 1240 / E, unit: 'nm', solution: R`<p>$\Delta E = 13.6(1/${n1 * n1} - 1/${n2 * n2}) = ${f(E)}\ \mathrm{eV}$, so $\lambda = 1240/\Delta E = ${f(1240 / E)}\ \mathrm{nm}$.</p>` }; } },
    { title: 'Photoelectric energy', gen(r) {
      const phi = r.pick([2.1, 2.28, 3.0, 4.3, 4.7]), lam = r.int(120, Math.floor(1240 / phi) - 20);
      return { q: R`<p>Light of $${lam}\ \mathrm{nm}$ hits a metal with work function $${phi}\ \mathrm{eV}$. Find the maximum kinetic energy of the electrons in eV.</p>`, answer: 1240 / lam - phi, unit: 'eV', solution: R`<p>$K_{\max} = 1240/${lam} - ${phi} = ${f(1240 / lam - phi)}\ \mathrm{eV}$.</p>` }; } }
  ]);

  D('nuclear', [
    { title: 'Remaining after decay', gen(r) {
      const T = r.int(2, 30), t = r.int(1, 90), N0 = r.pick([1000, 5000, 1e4, 1e6]);
      return { q: R`<p>A sample of ${N0} nuclei has a half-life of $${T}\ \mathrm{days}$. How many remain after $${t}\ \mathrm{days}$?</p>`, answer: N0 * Math.pow(0.5, t / T), unit: 'nuclei', solution: R`<p>$N = N_0(1/2)^{t/T} = ${f(N0 * Math.pow(0.5, t / T))}$.</p>` }; } },
    { title: 'Decay constant', gen(r) {
      const T = r.int(1, 1000);
      return { q: R`<p>What is the decay constant of an isotope with half-life $${T}\ \mathrm s$?</p>`, answer: Math.LN2 / T, unit: '1/s', solution: R`<p>$\lambda = \ln2/T_{1/2} = ${f(Math.LN2 / T)}\ \mathrm{s^{-1}}$.</p>` }; } },
    { title: 'Mass to energy', gen(r) {
      const du = r.step(0.001, 0.03, 0.001);
      return { q: R`<p>A reaction converts $${du}\ \mathrm u$ of mass into energy. How many MeV are released?</p>`, answer: du * 931.5, unit: 'MeV', solution: R`<p>$Q = ${du}\times931.5 = ${f(du * 931.5)}\ \mathrm{MeV}$.</p>` }; } }
  ]);

  D('analytical', [
    { title: 'Effective potential minimum', gen(r) {
      const L = r.step(1, 5, 0.5), m = r.step(0.5, 3, 0.5), k = r.step(1, 10, 1);
      const r0 = L * L / (m * k);
      return { q: R`<p>A particle of mass $${m}$ moves in the potential $U = -k/r$ with $k = ${k}$ and angular momentum $L = ${L}$ (SI units). Find the radius of its circular orbit.</p>`, answer: r0, unit: 'm', solution: R`<p>$U_{\text{eff}} = L^2/(2mr^2) - k/r$ is smallest at $r_0 = L^2/(mk) = ${f(r0)}\ \mathrm m$.</p>` }; } },
    { title: 'Bead on a rotating hoop', gen(r) {
      const Rr = r.step(0.1, 1, 0.05), w = r.step(4, 15, 0.5);
      const c = g / (w * w * Rr);
      if (c >= 1) return this.gen(PB.rng(r.int(1, 1e9)));
      return { q: R`<p>A bead slides on a frictionless hoop of radius $${Rr}\ \mathrm m$ spinning about its vertical diameter at $${w}\ \mathrm{rad/s}$. At what angle from the bottom is the bead in stable equilibrium?</p>`, answer: Math.acos(c) / deg, unit: '°', tol: 0.01, solution: R`<p>$\cos\theta = g/(\omega^2R) = ${f(c)}$, so $\theta = ${f(Math.acos(c) / deg)}^\circ$.</p>` }; } },
    { title: 'Reduced mass', gen(r) {
      const a = r.int(1, 20), b = r.int(1, 20);
      return { q: R`<p>Find the reduced mass of two bodies of masses $${a}\ \mathrm{kg}$ and $${b}\ \mathrm{kg}$.</p>`, answer: a * b / (a + b), unit: 'kg', solution: R`<p>$\mu = m_1m_2/(m_1 + m_2) = ${f(a * b / (a + b))}\ \mathrm{kg}$.</p>` }; } }
  ]);

  D('astrophysics', [
    { title: 'Wien temperature', gen(r) {
      const lam = r.int(100, 1500);
      return { q: R`<p>A star's spectrum peaks at $${lam}\ \mathrm{nm}$. Estimate its surface temperature.</p>`, answer: 2.898e-3 / (lam * 1e-9), unit: 'K', solution: R`<p>$T = b/\lambda_{\max} = 2.898\times10^{-3}/${lam}\times10^{-9} = ${f(2.898e-3 / (lam * 1e-9))}\ \mathrm K$.</p>` }; } },
    { title: 'Hubble distance', gen(r) {
      const v = r.int(500, 30000);
      return { q: R`<p>A galaxy recedes at $${v}\ \mathrm{km/s}$. Using $H_0 = 70\ \mathrm{km\,s^{-1}Mpc^{-1}}$, how far away is it in Mpc?</p>`, answer: v / 70, unit: 'Mpc', solution: R`<p>$d = v/H_0 = ${v}/70 = ${f(v / 70)}\ \mathrm{Mpc}$.</p>` }; } },
    { title: 'Magnitudes', gen(r) {
      const dm = r.step(0.5, 10, 0.5);
      return { q: R`<p>Two stars differ by $${dm}$ magnitudes. What is the ratio of their brightnesses?</p>`, answer: Math.pow(100, dm / 5), unit: '', solution: R`<p>Ratio $= 100^{\Delta m/5} = 10^{0.4\times${dm}} = ${f(Math.pow(100, dm / 5))}$.</p>` }; } }
  ]);

  D('experimental', [
    { title: 'Relative uncertainty of a product', gen(r) {
      const a = r.int(1, 8), b = r.int(1, 8);
      const tot = Math.sqrt(a * a + b * b);
      return { q: R`<p>A quantity is $Q = xy$. $x$ has a ${a}% uncertainty and $y$ a ${b}% uncertainty (independent). What is the percentage uncertainty of $Q$?</p>`, answer: tot, unit: '%', solution: R`<p>Add relative uncertainties in quadrature: $\sqrt{${a}^2 + ${b}^2} = ${f(tot)}\%$.</p>` }; } },
    { title: 'Uncertainty of a power', gen(r) {
      const p = r.pick([2, 3, 0.5, -2]), u = r.int(1, 6);
      return { q: R`<p>$Q = x^{${p}}$ and $x$ has a ${u}% uncertainty. What is the percentage uncertainty of $Q$?</p>`, answer: Math.abs(p) * u, unit: '%', solution: R`<p>$\delta Q/Q = |n|\,\delta x/x = ${Math.abs(p) * u}\%$.</p>` }; } },
    { title: 'Standard error', gen(r) {
      const sd = r.step(0.1, 2, 0.1), n = r.pick([4, 9, 16, 25, 36, 100]);
      return { q: R`<p>$${n}$ repeated measurements have a standard deviation of $${sd}$. What is the standard error of their mean?</p>`, answer: sd / Math.sqrt(n), unit: '', solution: R`<p>$\sigma/\sqrt N = ${sd}/${Math.sqrt(n)} = ${f(sd / Math.sqrt(n))}$.</p>` }; } }
  ]);
})();
