(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'toolkit', num: 1, part: 'Foundations',
    title: "The Physicist's Toolkit",
    subtitle: R`Units, dimensional analysis, estimation, vectors and approximations. These are the tools that turn a hard olympiad problem into a manageable one before any real physics is done.`,
    goals: ['Check and build formulas with dimensions', 'Make order-of-magnitude estimates', 'Use dot and cross products fluently', 'Apply Taylor and binomial approximations', 'Test answers with limiting cases'],
    sections: [
      {
        title: 'Units and dimensional analysis',
        html: R`
<p>Every physical quantity has a <strong>dimension</strong> built from a few base quantities: mass $[M]$, length $[L]$, time $[T]$, electric current $[I]$ and temperature $[\Theta]$. Speed has dimension $[L T^{-1}]$, force $[M L T^{-2}]$, energy $[M L^2 T^{-2}]$. The SI units of these base quantities are kg, m, s, A and K.</p>
<p>The rule that powers dimensional analysis is simple: <strong>every term in a valid equation has the same dimension</strong>, and the argument of any function like $\sin$, $\exp$ or $\ln$ must be dimensionless. This catches algebra mistakes instantly, and it can even predict formulas.</p>
<h3>Predicting a formula</h3>
<p>Suppose the period $T$ of a pendulum depends on its length $\ell$, the mass $m$ and gravity $g$. Write $T = C\,\ell^a m^b g^c$ with $C$ dimensionless. Matching dimensions:</p>
$$[T] = [L]^a [M]^b [L T^{-2}]^c \;\Rightarrow\; M:\ b=0,\quad L:\ a+c=0,\quad T:\ -2c=1.$$
<p>So $c=-\tfrac12$, $a=\tfrac12$, $b=0$ and $T = C\sqrt{\ell/g}$. The mass drops out, and the full theory only supplies $C = 2\pi$.</p>
<div class="key"><p>If a problem involves $n$ quantities built from $k$ independent dimensions, you can form $n-k$ independent dimensionless groups (the Buckingham $\pi$ theorem). With only one group, the answer is fixed up to a constant.</p></div>
<div class="warn-box"><p>Dimensional analysis cannot find dimensionless constants like $2\pi$, and it fails silently if you forget a relevant variable. If a pendulum swings in a viscous fluid, the viscosity matters and you have more freedom than one formula.</p></div>
<details class="example"><summary><span class="lbl">Worked example</span>The speed of waves on deep water depends only on $g$ and wavelength $\lambda$. How does the speed scale with $\lambda$?<span class="tog">Solution</span></summary><div class="sol"><p>$v = C g^a \lambda^b$: $[LT^{-1}] = [LT^{-2}]^a[L]^b$ gives $-2a = -1$, so $a=\tfrac12$, and $a+b = 1$, so $b = \tfrac12$. Hence $v = C\sqrt{g\lambda}$; long ocean swells outrun short ripples. (The full theory gives $C = 1/\sqrt{2\pi}$.)</p></div></details>`
      },
      {
        title: 'Estimation and orders of magnitude',
        html: R`
<p>Physicists estimate constantly. A <strong>Fermi estimate</strong> breaks an unknown into factors you can guess to within a factor of 2 or 3. Errors in independent factors partly cancel, so the product is often good to within a factor of a few.</p>
<p>Useful anchors: a human is $\sim 70\ \mathrm{kg}$ and $\sim 1.7\ \mathrm{m}$; air has density $\approx 1.2\ \mathrm{kg/m^3}$; water $10^3\ \mathrm{kg/m^3}$; atoms are $\sim 10^{-10}\ \mathrm{m}$ across; one mole is $6\times10^{23}$ particles; a year is $\approx \pi\times10^{7}\ \mathrm{s}$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>Roughly how many air molecules are in a 60 m³ room?<span class="tog">Solution</span></summary><div class="sol"><p>One mole of gas at room conditions occupies about $24\ \mathrm{L} = 0.024\ \mathrm{m^3}$. So $60/0.024 \approx 2500$ mol, or $2500 \times 6\times10^{23} \approx 1.5\times10^{27}$ molecules.</p></div></details>
<h3>Significant figures</h3>
<p>Quote results to the precision your inputs justify. If $g$ is given as $9.8\ \mathrm{m/s^2}$, an answer of $12.3456\ \mathrm{m}$ claims more than you know. Keep extra digits during the calculation and round only at the end.</p>
<div class="insight"><p>Before solving an olympiad problem in detail, estimate the answer. If your final algebra gives a raindrop falling at $3000\ \mathrm{m/s}$, you will know to look for the error.</p></div>`
      },
      {
        title: 'Vectors',
        html: R`
<p>A vector has magnitude and direction. In Cartesian components, $\vec A = A_x\hat{\imath} + A_y\hat{\jmath} + A_z\hat{k}$, with magnitude $|\vec A| = \sqrt{A_x^2 + A_y^2 + A_z^2}$.</p>
<h3>The dot product</h3>
$$\vec A\cdot\vec B = A_xB_x + A_yB_y + A_zB_z = |\vec A||\vec B|\cos\theta.$$
<p>It is a scalar that measures how much two vectors point the same way. It is zero for perpendicular vectors. Work $W = \vec F\cdot\vec d$ is the classic example, and $\vec A\cdot\hat n$ is the component of $\vec A$ along a unit vector $\hat n$.</p>
<h3>The cross product</h3>
$$\vec A\times\vec B = (A_yB_z - A_zB_y,\; A_zB_x - A_xB_z,\; A_xB_y - A_yB_x),\qquad |\vec A\times\vec B| = |\vec A||\vec B|\sin\theta.$$
<p>The result is perpendicular to both vectors, with direction set by the right-hand rule. Its magnitude is the area of the parallelogram spanned by $\vec A$ and $\vec B$. Torque $\vec\tau = \vec r\times\vec F$, angular momentum $\vec L = \vec r\times\vec p$ and the magnetic force $q\vec v\times\vec B$ are all cross products. Note that $\vec A\times\vec B = -\vec B\times\vec A$.</p>
<div class="key"><p>Two identities worth memorising: $\vec A\times(\vec B\times\vec C) = \vec B(\vec A\cdot\vec C) - \vec C(\vec A\cdot\vec B)$ ("BAC minus CAB"), and the triple product $\vec A\cdot(\vec B\times\vec C)$, which is the volume of the parallelepiped and is unchanged by cyclic permutation.</p></div>
<details class="example"><summary><span class="lbl">Worked example</span>Find a unit vector perpendicular to both $\vec A = (1,1,0)$ and $\vec B = (0,1,1)$.<span class="tog">Solution</span></summary><div class="sol"><p>$\vec A\times\vec B = (1\cdot1 - 0\cdot1,\ 0\cdot0 - 1\cdot1,\ 1\cdot1 - 1\cdot0) = (1,-1,1)$, with magnitude $\sqrt3$. So $\hat n = (1,-1,1)/\sqrt3$ (or its negative).</p></div></details>`
      },
      {
        title: 'Calculus and approximations',
        html: R`
<p>Physics is written in calculus. A derivative is a rate: $v = \dd x/\dd t$, $a = \dd v/\dd t$. An integral is a sum of many small pieces: displacement $\Delta x = \int v\,\dd t$ is the area under the $v$–$t$ graph, and work $W = \int \vec F\cdot \dd\vec r$.</p>
<h3>Taylor series</h3>
<p>Near a point, any smooth function looks like a polynomial:</p>
$$f(x) = f(0) + f'(0)\,x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots$$
<p>The approximations you will use again and again (valid for $|x|\ll 1$):</p>
<div class="table-wrap"><table><thead><tr><th>Function</th><th>Approximation</th><th>Typical use</th></tr></thead><tbody>
<tr><td>$\sin x$</td><td>$x - x^3/6$</td><td>Small oscillations of a pendulum</td></tr>
<tr><td>$\cos x$</td><td>$1 - x^2/2$</td><td>Potential energy near a minimum</td></tr>
<tr><td>$(1+x)^n$</td><td>$1 + nx$</td><td>Gravity at altitude, relativity</td></tr>
<tr><td>$e^x$</td><td>$1 + x + x^2/2$</td><td>Early-time exponential growth</td></tr>
<tr><td>$\ln(1+x)$</td><td>$x - x^2/2$</td><td>Small entropy and pressure changes</td></tr>
</tbody></table></div>
<details class="example"><summary><span class="lbl">Worked example</span>Show that the relativistic kinetic energy $(\gamma - 1)mc^2$ reduces to $\tfrac12 mv^2$ for $v\ll c$.<span class="tog">Solution</span></summary><div class="sol"><p>$\gamma = (1 - v^2/c^2)^{-1/2} \approx 1 + \tfrac12 v^2/c^2$ by the binomial approximation with $n = -\tfrac12$ and $x = -v^2/c^2$. Then $(\gamma - 1)mc^2 \approx \tfrac12 mv^2$.</p></div></details>
<p>Try these approximations in the <strong>Lab</strong> tab: you can see exactly where each one starts to fail.</p>`
      },
      {
        title: 'How to attack an olympiad problem',
        html: R`
<p>Olympiad problems are rarely about obscure formulas. They reward a disciplined process:</p>
<ol>
<li><strong>Draw a big, clear diagram</strong> with every force, coordinate and given quantity labelled.</li>
<li><strong>Look for conserved quantities</strong>: energy, momentum, angular momentum, charge. A conservation law often replaces a differential equation.</li>
<li><strong>Exploit symmetry</strong>. If a configuration is symmetric, the answer must be too, and some quantities must vanish.</li>
<li><strong>Choose clever frames and coordinates</strong>: the centre-of-mass frame for collisions, a rotating frame for rotating systems, polar coordinates for central forces.</li>
<li><strong>Solve symbolically and substitute numbers last.</strong> Symbols let you check dimensions and limits.</li>
<li><strong>Check limiting cases</strong>: does the answer behave sensibly when a mass goes to zero, an angle to $90^\circ$, or a friction coefficient to infinity?</li>
</ol>
<div class="insight"><p>Limiting cases are the fastest error detector you have. For an Atwood machine with masses $m_1$ and $m_2$, any proposed tension must give $T = 0$ when either mass is zero (free fall) and $T = mg$ when $m_1 = m_2 = m$. Only $T = 2m_1m_2g/(m_1+m_2)$ passes both tests.</p></div>
<p>In the SYPT and IYPT tradition, physics is also an argument you defend: state your model, its assumptions and where it breaks down. Keep that habit even for written problems.</p>`
      }
    ],
    labs: [
      { sim: 'taylor', title: 'Taylor approximation explorer', desc: 'Compare a function (solid) with its Taylor polynomial (dashed) and read the relative error at a test point.',
        tasks: ['Choose sin x with order 1, so sin x ≈ x. Slide the test point until the error reaches 1%. You should find x ≈ 0.245 rad, about 14°: the small-angle approximation is better than 1% below that.', 'Choose 1/√(1 − x) and order 1. This is γ ≈ 1 + v²/2c² with x = v²/c². How large can v/c be before the error passes 1%?', 'Choose ln(1 + x) and raise the order to 10 with x = 1.5. Why does adding terms make the approximation worse? (Look up radius of convergence.)'] },
      { sim: 'vectors', title: 'Vector playground', desc: 'Set two vectors by magnitude and angle and watch their sum, difference, dot and cross product.',
        tasks: ['Make A and B perpendicular. What happens to A · B? What about |A + B| compared with |A − B|?', 'With |A| and |B| fixed, which angle maximises |A × B|? Which makes |A + B| smallest?', 'Show the projection of A onto B. Check that its length equals A · B / |B|.'] }
    ],
    formulas: [
      ['Dimension of force', R`[F] = M L T^{-2}`],
      ['Dimension of energy', R`[E] = M L^2 T^{-2}`],
      ['Dot product', R`\vec A\cdot\vec B = |A||B|\cos\theta`],
      ['Cross product magnitude', R`|\vec A\times\vec B| = |A||B|\sin\theta`],
      ['BAC–CAB rule', R`\vec A\times(\vec B\times\vec C)=\vec B(\vec A\cdot\vec C)-\vec C(\vec A\cdot\vec B)`],
      ['Taylor series', R`f(x)=\sum_n \frac{f^{(n)}(0)}{n!}x^n`],
      ['Binomial approximation', R`(1+x)^n\approx 1+nx`],
      ['Small angles', R`\sin\theta\approx\theta,\ \cos\theta\approx1-\tfrac{\theta^2}{2}`],
      ['Pendulum by dimensions', R`T = C\sqrt{\ell/g}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Spring period by dimensions',
        q: R`<p>A mass $m$ oscillates on a spring of stiffness $k$ (units N/m). Which expression for the period is dimensionally possible?</p>`,
        options: [R`$2\pi\sqrt{m/k}$`, R`$2\pi\sqrt{k/m}$`, R`$2\pi\, m/k$`, R`$2\pi\sqrt{mk}$`], answer: 0,
        hints: [R`$[k] = [F]/[L] = M T^{-2}$.`],
        solution: R`<p>$[m/k] = M/(M T^{-2}) = T^2$, so $\sqrt{m/k}$ has dimension of time. The others give $T^{-1}$, $T^2$ and $M T^{-1}$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Dimensions of G',
        q: R`<p>Newton's law of gravitation is $F = Gm_1m_2/r^2$. What are the dimensions of $G$?</p>`,
        options: [R`$M^{-1}L^3T^{-2}$`, R`$M L^3 T^{-2}$`, R`$M^{-2}L^2T^{-2}$`, R`$M^{-1}L^2T^{-1}$`], answer: 0,
        hints: [R`Solve for $G = Fr^2/(m_1m_2)$ and substitute dimensions.`],
        solution: R`<p>$[G] = (MLT^{-2})(L^2)/M^2 = M^{-1}L^3T^{-2}$.</p>` },
      { level: 'concept', type: 'multi', title: 'Spot the dimensionless',
        q: R`<p>Which of the following quantities are dimensionless? Select all that apply.</p>`,
        options: ['Strain (change in length ÷ original length)', 'An angle measured in radians', 'Refractive index', 'Coefficient of friction μ', 'Impulse'], answer: [0, 1, 2, 3],
        hints: [R`An angle in radians is arc length divided by radius.`],
        solution: R`<p>Strain is a ratio of lengths, radians are arc length over radius, $n = c/v$ is a ratio of speeds, and $\mu = f/N$ is a ratio of forces. Impulse has dimensions of momentum, $MLT^{-1}$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Limiting cases',
        q: R`<p>Two masses $m_1$ and $m_2$ hang over a frictionless, massless pulley (an Atwood machine). Which expression for the string tension survives every limiting-case test?</p>`,
        options: [R`$T = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$`, R`$T = \dfrac{2m_1m_2g}{m_1 + m_2}$`, R`$T = \dfrac{m_1m_2g}{m_1 + m_2}$`, R`$T = (m_1 + m_2)g$`], answer: 1,
        hints: [R`If $m_2 = 0$, the mass $m_1$ is in free fall. What must the tension be? If $m_1 = m_2 = m$, nothing accelerates.`],
        solution: R`<p>Option A has the wrong dimensions (no mass factor) and changes sign. B gives $T=0$ when either mass vanishes and $T = mg$ for equal masses. C gives $mg/2$ for equal masses, and D never vanishes.</p>` },
      { level: 'core', type: 'num', title: 'Speed of sound by dimensions',
        q: R`<p>The speed of sound in a gas can only depend on the pressure $P$ and density $\rho$, so $v = C\sqrt{P/\rho}$. Air at $P = 1.01\times10^5\ \mathrm{Pa}$ and $\rho = 1.20\ \mathrm{kg/m^3}$ carries sound at $343\ \mathrm{m/s}$. Find the dimensionless constant $C$.</p>`,
        answer: 343 / Math.sqrt(1.01e5 / 1.2), tol: 0.01, unit: '',
        hints: [R`Compute $\sqrt{P/\rho}$ first.`, R`The answer should be close to $\sqrt{\gamma}$ for air, where $\gamma = 1.4$.`],
        solution: R`<p>$\sqrt{P/\rho} = \sqrt{1.01\times10^5/1.20} = 290\ \mathrm{m/s}$, so $C = 343/290 = 1.18$. Laplace showed that $C = \sqrt{\gamma} = \sqrt{1.4} = 1.183$ because sound compressions are adiabatic. Newton had assumed isothermal compressions ($C = 1$) and was 15% too low.</p>` },
      { level: 'core', type: 'num', title: 'Angle between vectors',
        q: R`<p>Find the angle between $\vec A = (3, -2, 1)$ and $\vec B = (1, 4, 2)$.</p>`,
        answer: Math.acos(-3 / Math.sqrt(294)) * 180 / Math.PI, tol: 0.005, unit: 'degrees',
        hints: [R`$\cos\theta = \vec A\cdot\vec B/(|\vec A||\vec B|)$.`],
        solution: R`<p>$\vec A\cdot\vec B = 3 - 8 + 2 = -3$, $|\vec A| = \sqrt{14}$, $|\vec B| = \sqrt{21}$. $\cos\theta = -3/\sqrt{294} = -0.175$, so $\theta = 100.1^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'Area from a cross product',
        q: R`<p>A triangle has vertices at $(0,0,0)$, $(3,-2,1)$ and $(1,4,2)$ (in metres). Find its area.</p>`,
        answer: Math.sqrt(285) / 2, tol: 0.01, unit: 'm²',
        hints: [R`The parallelogram spanned by two edge vectors has area $|\vec A\times\vec B|$. The triangle is half of it.`],
        solution: R`<p>$\vec A\times\vec B = (-8, -5, 14)$, with magnitude $\sqrt{285} = 16.9$. The triangle's area is half: $8.44\ \mathrm{m^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Gravity at altitude',
        q: R`<p>Use the binomial approximation to estimate the percentage by which $g$ decreases at a height of $32\ \mathrm{km}$ above Earth's surface. Take $R_E = 6370\ \mathrm{km}$.</p>`,
        answer: 200 * 32 / 6370, tol: 0.02, unit: '%',
        hints: [R`$g(h) = g_0 R^2/(R+h)^2 = g_0(1 + h/R)^{-2}$.`],
        solution: R`<p>$(1 + h/R)^{-2} \approx 1 - 2h/R$, so the fractional drop is $2h/R = 2(32)/6370 = 0.0100$, i.e. about $1.0\%$. The exact value is $0.997\%$.</p>` },
      { level: 'core', type: 'num', title: 'Molecules in a room',
        q: R`<p>A room measures $5\ \mathrm{m}\times4\ \mathrm{m}\times3\ \mathrm{m}$. The air is at $1.01\times10^5\ \mathrm{Pa}$ and $293\ \mathrm{K}$. How many gas molecules does it contain? ($k_B = 1.381\times10^{-23}\ \mathrm{J/K}$)</p>`,
        answer: 1.01e5 * 60 / (1.381e-23 * 293), tol: 0.03, unit: 'molecules',
        hints: [R`The ideal gas law in molecular form is $PV = Nk_BT$.`],
        solution: R`<p>$N = PV/(k_BT) = (1.01\times10^5)(60)/(1.381\times10^{-23}\times293) = 1.50\times10^{27}$.</p>` },
      { level: 'olympiad', type: 'num', title: "Taylor's blast wave",
        q: R`<p>In 1950 G. I. Taylor estimated the energy of the first atomic bomb test from photographs alone. The radius $R$ of the expanding fireball depends only on the released energy $E$, the time $t$ since detonation and the density of air $\rho$.</p><p>Use dimensional analysis to find $R(E, t, \rho)$, assume the dimensionless constant is 1, and estimate $E$ given that $R = 140\ \mathrm{m}$ at $t = 0.025\ \mathrm{s}$ with $\rho = 1.2\ \mathrm{kg/m^3}$.</p>`,
        answer: 1.2 * Math.pow(140, 5) / Math.pow(0.025, 2), tol: 0.03, unit: 'J',
        hints: [R`Write $R = E^a t^b \rho^c$ and match the powers of $M$, $L$ and $T$.`, R`You should get $R = (Et^2/\rho)^{1/5}$.`],
        solution: R`<p>Mass: $a + c = 0$. Length: $2a - 3c = 1$. Time: $-2a + b = 0$. So $a = \tfrac15$, $c = -\tfrac15$, $b = \tfrac25$, giving $R = (Et^2/\rho)^{1/5}$.</p><p>Inverting, $E = \rho R^5/t^2 = 1.2\times(140)^5/(0.025)^2 = 1.0\times10^{14}\ \mathrm{J}$, about 25 kilotons of TNT. The declassified yield was about 20 kilotons.</p>` },
      { level: 'olympiad', type: 'num', title: 'Wobbling droplets',
        q: R`<p>A free liquid drop oscillates in shape. Its frequency depends only on the surface tension $\sigma$ (units N/m), the density $\rho$ and the radius $R$. A water drop ($\sigma = 0.072\ \mathrm{N/m}$, $\rho = 1000\ \mathrm{kg/m^3}$) of radius $2.0\ \mathrm{mm}$ oscillates at $42.7\ \mathrm{Hz}$.</p><p>At what frequency does a mercury drop ($\sigma = 0.487\ \mathrm{N/m}$, $\rho = 13\,600\ \mathrm{kg/m^3}$) of radius $1.0\ \mathrm{mm}$ oscillate?</p>`,
        answer: 42.7 * Math.sqrt((0.487 / 0.072) * (1000 / 13600) * 8), tol: 0.02, unit: 'Hz',
        hints: [R`$[\sigma] = MT^{-2}$. Find the combination of $\sigma$, $\rho$ and $R$ with dimensions of $T^{-1}$.`, R`$f \propto \sqrt{\sigma/(\rho R^3)}$, so take a ratio and the unknown constant cancels.`],
        solution: R`<p>Dimensional analysis gives $f = C\sqrt{\sigma/(\rho R^3)}$. Taking the ratio of the two drops:</p>$$\frac{f_{Hg}}{f_{w}} = \sqrt{\frac{\sigma_{Hg}}{\sigma_w}\cdot\frac{\rho_w}{\rho_{Hg}}\cdot\left(\frac{R_w}{R_{Hg}}\right)^3} = \sqrt{6.76\times0.0735\times8} = 1.99.$$<p>So $f_{Hg} \approx 85\ \mathrm{Hz}$. This scaling argument is exactly how SYPT/IYPT teams compare experiments with different liquids.</p>` }
    ]
  });
})();
