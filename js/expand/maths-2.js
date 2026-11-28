/* Expanded text for maths: differential equations, several variables, vector calculus, complex numbers,
   vectors and matrices, probability and statistics, proof, number theory. */
(function () {
  const R = PB.R;
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.001 }, o || {});
  const X = (id, sections, add) => PB.expand(id, { sections: sections, add: add });

  /* ---------------- Differential equations ---------------- */
  X('math-odes', {
    0: { html: R`
<h3 class="sub">Reading a differential equation</h3>
<p>A differential equation relates an unknown function to its derivatives. It is a rule for <em>how something changes</em>, and solving it means finding what the something must be. Examples that run the world:</p>
<ul><li>$\dfrac{dN}{dt} = kN$: growth proportional to size (populations, compound interest, radioactive decay with $k < 0$).</li>
<li>$\dfrac{dT}{dt} = -k(T - T_{\text{room}})$: Newton's law of cooling.</li>
<li>$\dfrac{dP}{dt} = rP\left(1 - \dfrac PK\right)$: logistic growth that levels off at the carrying capacity $K$.</li>
<li>$m\ddot x = -kx$: a mass on a spring.</li></ul>
<p>The <strong>order</strong> is the highest derivative that appears. A general solution contains arbitrary constants, one per order; <strong>initial conditions</strong> pin them down.</p>
<div class="worked"><p>Check that $y = Ce^{-2x} + x - \tfrac12$ solves $y' + 2y = 2x$.</p>
<p>$y' = -2Ce^{-2x} + 1$, so $y' + 2y = -2Ce^{-2x} + 1 + 2Ce^{-2x} + 2x - 1 = 2x$. ✓ Checking a proposed solution by substitution is always allowed and always worth doing.</p></div>
<p>A <strong>slope field</strong> draws, at each point, a short segment with the slope the equation demands. Solution curves follow the segments like iron filings following a magnetic field. <strong>Equilibrium</strong> solutions are constant ones (where $y' = 0$): for the logistic equation, $P = 0$ (unstable) and $P = K$ (stable).</p>` },
    1: { html: R`
<h3 class="sub">Separation of variables</h3>
<p>If the equation can be written $\dfrac{dy}{dx} = g(x)h(y)$, separate and integrate: $\displaystyle\int\frac{dy}{h(y)} = \int g(x)\,dx$.</p>
<div class="worked"><p>A cup of tea at 90 °C cools in a 20 °C room. After 5 minutes it is 70 °C. When will it be 40 °C?</p>
<p>$\dfrac{dT}{dt} = -k(T - 20)$ separates to $\ln|T - 20| = -kt + c$, so $T = 20 + 70e^{-kt}$. From $70 = 20 + 70e^{-5k}$: $e^{-5k} = \tfrac57$, $k = 0.0673$. Then $40 = 20 + 70e^{-kt}$ gives $t = \ln3.5/k \approx 18.6$ minutes.</p></div>
<h3 class="sub">Linear first-order equations</h3>
<p>For $y' + p(x)y = q(x)$, multiply by the <strong>integrating factor</strong> $\mu = e^{\int p\,dx}$. The left side becomes $(\mu y)'$, so $\mu y = \int\mu q\,dx$.</p>
<div class="worked"><p>Solve $y' + \dfrac{y}{x} = x^2$ with $y(1) = 1$.</p>
<p>$\mu = e^{\ln x} = x$, so $(xy)' = x^3$, $xy = \tfrac{x^4}{4} + C$. With $y(1) = 1$: $C = \tfrac34$, so $y = \dfrac{x^3}{4} + \dfrac{3}{4x}$.</p></div>
<p>Physics examples: an RC circuit charging, a falling body with linear air resistance ($v' = g - \tfrac km v$, approaching the terminal velocity $mg/k$), and a tank where brine flows in and out.</p>` },
    2: { html: R`
<h3 class="sub">The characteristic equation</h3>
<p>For $ay'' + by' + cy = 0$, try $y = e^{\lambda x}$: you get $a\lambda^2 + b\lambda + c = 0$. Its roots decide everything:</p>
<div class="key"><p>Two real roots: $y = Ae^{\lambda_1x} + Be^{\lambda_2x}$.<br>A repeated root: $y = (A + Bx)e^{\lambda x}$.<br>Complex roots $\alpha \pm i\beta$: $y = e^{\alpha x}(A\cos\beta x + B\sin\beta x)$.</p></div>
<p>For a damped oscillator $m\ddot x + c\dot x + kx = 0$ these are the <strong>overdamped</strong>, <strong>critically damped</strong> and <strong>underdamped</strong> cases. Car suspensions are designed near critical damping, which returns to rest fastest without bouncing.</p>
<div class="worked"><p>Solve $y'' + 2y' + 5y = 0$ with $y(0) = 1$, $y'(0) = 0$.</p>
<p>$\lambda^2 + 2\lambda + 5 = 0$ gives $\lambda = -1 \pm 2i$, so $y = e^{-x}(A\cos2x + B\sin2x)$. $y(0) = A = 1$; $y'(0) = -A + 2B = 0$, $B = \tfrac12$. A decaying oscillation with angular frequency 2.</p></div>
<h3 class="sub">Forcing and resonance</h3>
<p>With a driving term, $y'' + \omega_0^2y = F\cos\omega t$, the solution is the free oscillation plus a <strong>particular solution</strong> at the driving frequency, $y_p = \dfrac{F}{\omega_0^2 - \omega^2}\cos\omega t$. As $\omega \to \omega_0$ the amplitude blows up: <strong>resonance</strong>, which shatters glasses and was the reason soldiers break step on bridges.</p>` },
    3: { html: R`
<h3 class="sub">How Euler's method works, and how wrong it is</h3>
<p>Most differential equations have no formula solution, so we compute. Euler's method walks along the slope field in small steps $h$: $y_{n+1} = y_n + h\,f(x_n, y_n)$. Each step follows the tangent line, so it drifts off a curved solution. The error per step is about $h^2$, and with $1/h$ steps the total error is about $h$: halving the step halves the error (a <strong>first-order</strong> method).</p>
<div class="worked"><p>Use Euler's method with $h = 0.5$ for $y' = y$, $y(0) = 1$, to estimate $y(1) = e$.</p>
<p>$y_1 = 1 + 0.5\cdot1 = 1.5$, $y_2 = 1.5 + 0.5\cdot1.5 = 2.25$. True value $2.718$. With $h = 0.1$ you get $1.1^{10} = 2.594$; with $h = 0.01$, $2.705$. The method computes $(1 + h)^{1/h}$, which tends to $e$.</p></div>
<h3 class="sub">Better methods</h3>
<p><strong>Improved Euler</strong> (Heun) averages the slope at the start of a step and at a trial end point, giving second-order accuracy. The classical <strong>Runge–Kutta</strong> method (RK4) combines four slopes and is fourth-order: halving $h$ cuts the error by 16. Weather forecasts, orbit predictions and the labs in this book integrate equations this way.</p>
<div class="warn-box"><p>Too large a step can make a numerical solution unstable: for $y' = -10y$ with $h = 0.3$, Euler gives $y_{n+1} = -2y_n$, which oscillates and grows, although the true solution decays.</p></div>` }
  });

  /* ---------------- Calculus in several variables ---------------- */
  X('math-multivar', {
    0: { html: R`
<h3 class="sub">Functions of two variables</h3>
<p>A function $f(x, y)$ assigns a number to each point of the plane: a height above a map, a temperature, a profit as a function of price and advertising. Its graph is a surface $z = f(x, y)$. A <strong>contour</strong> (level curve) joins points with the same value; on a hiking map, close contours mean steep ground.</p>
<div class="worked"><p>Describe the contours of $f = x^2 + y^2$, $g = x^2 - y^2$ and $h = xy$.</p>
<p>$f = c$ gives circles: a bowl. $g = c$ gives hyperbolas: a saddle, rising in the $x$-direction and falling in the $y$-direction. $h$ is the same saddle rotated by $45^\circ$.</p></div>
<p>Limits are subtler in two dimensions: a point can be approached along infinitely many paths. $\dfrac{xy}{x^2 + y^2}$ tends to 0 along the axes but to $\tfrac12$ along $y = x$, so it has no limit at the origin.</p>` },
    1: { html: R`
<h3 class="sub">Computing partial derivatives</h3>
<p>$\dfrac{\partial f}{\partial x}$ treats $y$ as a constant and differentiates in $x$: the slope of the surface in the east–west direction. For $f = x^2y^3 + \sin(xy)$: $f_x = 2xy^3 + y\cos(xy)$ and $f_y = 3x^2y^2 + x\cos(xy)$.</p>
<p>Second partials include the mixed ones $f_{xy}$ and $f_{yx}$, which are equal for smooth functions (<strong>Clairaut's theorem</strong>). Above: $f_{xy} = 6xy^2 + \cos(xy) - xy\sin(xy) = f_{yx}$.</p>
<h3 class="sub">The multivariable chain rule and the tangent plane</h3>
<p>If $x$ and $y$ both depend on $t$, then $\dfrac{df}{dt} = f_x\dfrac{dx}{dt} + f_y\dfrac{dy}{dt}$: each route of dependence contributes. Near a point the surface looks like its <strong>tangent plane</strong>, $f(x + h, y + k) \approx f(x, y) + f_xh + f_yk$.</p>
<div class="worked"><p>The volume of a cylinder is $V = \pi r^2h$. If $r = 5$ cm grows at 0.1 cm/s and $h = 12$ cm shrinks at 0.2 cm/s, how fast does $V$ change?</p>
<p>$\dot V = 2\pi rh\,\dot r + \pi r^2\dot h = 2\pi\cdot60\cdot0.1 - \pi\cdot25\cdot0.2 = 12\pi - 5\pi = 7\pi \approx 22$ cm³/s.</p></div>` },
    2: { html: R`
<h3 class="sub">Directional derivatives and steepest ascent</h3>
<p>The gradient $\nabla f = (f_x, f_y)$ packages all the slopes. The rate of change in the direction of a unit vector $\mathbf u$ is the <strong>directional derivative</strong> $D_{\mathbf u}f = \nabla f\cdot\mathbf u = |\nabla f|\cos\theta$. It is largest when $\mathbf u$ points along $\nabla f$ (steepest ascent, rate $|\nabla f|$), zero when $\mathbf u$ is perpendicular to it (along a contour), and most negative straight against it.</p>
<div class="key"><p>$\nabla f$ points uphill, its length is the steepest slope, and it is perpendicular to the contour through the point.</p></div>
<div class="worked"><p>For $f = x^2 + 3xy$ at $(1, 2)$, find the steepest slope and the slope towards $(4, 6)$.</p>
<p>$\nabla f = (2x + 3y, 3x) = (8, 3)$; steepest slope $\sqrt{73} \approx 8.54$. Direction to $(4, 6)$: $(3, 4)/5$; $D_{\mathbf u}f = (24 + 12)/5 = 7.2$.</p></div>
<h3 class="sub">Critical points and the second-derivative test</h3>
<p>At a maximum, minimum or saddle, $\nabla f = 0$. Classify with $D = f_{xx}f_{yy} - f_{xy}^2$: $D > 0$ and $f_{xx} > 0$ is a minimum, $D > 0$ and $f_{xx} < 0$ a maximum, $D < 0$ a saddle. Machine learning minimises functions of millions of variables by repeatedly stepping against the gradient: <strong>gradient descent</strong>.</p>` },
    3: { html: R`
<h3 class="sub">Lagrange multipliers</h3>
<p>To optimise $f(x, y)$ on a constraint curve $g(x, y) = c$: at the best point the contour of $f$ just touches the constraint, so their normals are parallel, $\nabla f = \lambda\nabla g$.</p>
<div class="worked"><p>Find the largest rectangle with perimeter 20.</p>
<p>Maximise $A = xy$ with $2x + 2y = 20$. $\nabla A = (y, x) = \lambda(2, 2)$ gives $x = y$, so $x = y = 5$ and $A = 25$: a square.</p></div>
<h3 class="sub">Double integrals</h3>
<p>$\iint_D f\,dA$ adds up $f$ over a region: a volume under a surface, a mass from a density, a probability from a joint density. Compute it as an <strong>iterated integral</strong>, one variable at a time:</p>
$$\int_0^1\!\!\int_0^2 xy^2\,dy\,dx = \int_0^1 x\cdot\frac83\,dx = \frac43.$$
<p>For non-rectangular regions the inner limits depend on the outer variable. Circular regions are easier in polar coordinates, where the area element is $dA = r\,dr\,d\theta$. That gives the famous result $\int_{-\infty}^\infty e^{-x^2}dx = \sqrt\pi$: square it, write it as a double integral over the plane, and switch to polar coordinates.</p>` }
  });

  /* ---------------- Vector calculus ---------------- */
  X('math-vectorcalc', {
    0: { html: R`
<h3 class="sub">Curves described by a parameter</h3>
<p>A curve $\mathbf r(t) = (x(t), y(t), z(t))$ describes where a particle is at time $t$. Its velocity is $\mathbf r'(t)$, tangent to the curve; its speed is $|\mathbf r'(t)|$; its acceleration $\mathbf r''(t)$. The length of the path is $\int|\mathbf r'(t)|\,dt$.</p>
<div class="worked"><p>A particle moves on $\mathbf r(t) = (\cos t, \sin t, t)$, a helix. Find its speed and the length of one turn.</p>
<p>$\mathbf r' = (-\sin t, \cos t, 1)$, speed $\sqrt2$ at all times. One turn takes $2\pi$, so the length is $2\sqrt2\,\pi \approx 8.89$.</p></div>
<p>The acceleration of uniform circular motion $(R\cos\omega t, R\sin\omega t)$ is $-\omega^2\mathbf r$, pointing to the centre with magnitude $R\omega^2 = v^2/R$: the centripetal acceleration of the physics chapters.</p>` },
    1: { html: R`
<h3 class="sub">Work along a path</h3>
<p>A <strong>vector field</strong> $\mathbf F(x, y)$ attaches an arrow to every point: wind velocity, a gravitational or electric force. The <strong>line integral</strong> $\int_C\mathbf F\cdot d\mathbf r = \int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt$ adds up the component of the field along the path: the work done moving through a force field.</p>
<div class="worked"><p>Find the work done by $\mathbf F = (y, x)$ along $\mathbf r(t) = (t, t^2)$ from $t = 0$ to 1.</p>
<p>$\mathbf F\cdot\mathbf r' = (t^2, t)\cdot(1, 2t) = 3t^2$, integral 1. Along the straight line $(t, t)$: $(t, t)\cdot(1, 1) = 2t$, integral 1 again. Not a coincidence: see below.</p></div>
<h3 class="sub">Conservative fields</h3>
<p>If $\mathbf F = \nabla\phi$ for some <strong>potential</strong> $\phi$, then $\int_C\mathbf F\cdot d\mathbf r = \phi(\text{end}) - \phi(\text{start})$, whatever the path (the fundamental theorem for line integrals). Above, $\phi = xy$. Gravity and electrostatic fields are conservative, which is why potential energy makes sense. In two dimensions a field $(P, Q)$ is conservative (on a simply connected region) when $\partial Q/\partial x = \partial P/\partial y$.</p>` },
    2: { html: R`
<h3 class="sub">What divergence and curl measure</h3>
<p>Imagine the field is the velocity of a fluid. The <strong>divergence</strong> $\nabla\cdot\mathbf F = \dfrac{\partial F_x}{\partial x} + \dfrac{\partial F_y}{\partial y} + \dfrac{\partial F_z}{\partial z}$ measures how much fluid flows out of a tiny box per unit volume: positive at a source, negative at a sink. The <strong>curl</strong> $\nabla\times\mathbf F$ measures rotation: a tiny paddle wheel placed in the flow spins with angular velocity half the curl.</p>
<div class="worked"><p>Compute the divergence and curl of $\mathbf F = (x, y)$ and $\mathbf G = (-y, x)$.</p>
<p>$\mathbf F$ points straight out: $\nabla\cdot\mathbf F = 2$, curl 0. $\mathbf G$ swirls anticlockwise: divergence 0, curl $\partial_xG_y - \partial_yG_x = 2$ (along $z$).</p></div>
<p>Two identities hold for every smooth field: $\nabla\times(\nabla\phi) = 0$ (gradients do not swirl) and $\nabla\cdot(\nabla\times\mathbf F) = 0$ (curls have no sources). Maxwell's equations of electromagnetism are four statements about the divergence and curl of the electric and magnetic fields.</p>` },
    3: { html: R`
<h3 class="sub">The big theorems: inside versus boundary</h3>
<p>All three theorems say the same thing: <em>the total of a derivative over a region equals a total over its boundary</em>, just as $\int_a^bf'\,dx = f(b) - f(a)$.</p>
<div class="key"><p><strong>Green:</strong> $\displaystyle\oint_C(P\,dx + Q\,dy) = \iint_D\left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)dA$<br>
<strong>Gauss (divergence):</strong> $\displaystyle\oiint_S\mathbf F\cdot d\mathbf S = \iiint_V\nabla\cdot\mathbf F\,dV$<br>
<strong>Stokes:</strong> $\displaystyle\oint_C\mathbf F\cdot d\mathbf r = \iint_S(\nabla\times\mathbf F)\cdot d\mathbf S$</p></div>
<div class="worked"><p>Use Green's theorem to find the area of the ellipse $x = a\cos t$, $y = b\sin t$.</p>
<p>With $P = -y/2$, $Q = x/2$ the integrand is 1, so area $= \tfrac12\oint(x\,dy - y\,dx) = \tfrac12\int_0^{2\pi}(ab\cos^2t + ab\sin^2t)\,dt = \pi ab$.</p></div>
<p>Gauss's theorem turns Gauss's law of electrostatics, flux through a closed surface $= Q/\varepsilon_0$, into its local form $\nabla\cdot\mathbf E = \rho/\varepsilon_0$. A planimeter, a mechanical device that measures the area of a shape by tracing its outline, is Green's theorem built in brass.</p>` }
  });

  /* ---------------- Complex numbers ---------------- */
  X('math-complex', {
    0: { html: R`
<h3 class="sub">Arithmetic with complex numbers</h3>
<p>A complex number $z = a + bi$ has a <strong>real part</strong> $a$ and an <strong>imaginary part</strong> $b$, with $i^2 = -1$. Add and multiply like algebra, replacing $i^2$ by $-1$:</p>
$$(2 + 3i)(4 - i) = 8 - 2i + 12i - 3i^2 = 11 + 10i.$$
<p>The <strong>conjugate</strong> $\bar z = a - bi$ satisfies $z\bar z = a^2 + b^2$, a real number, which is the trick for division: multiply top and bottom by the conjugate of the bottom.</p>
<div class="worked"><p>Compute $\dfrac{3 + 4i}{1 - 2i}$.</p>
<p>$\dfrac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)} = \dfrac{3 + 6i + 4i - 8}{5} = -1 + 2i$.</p></div>
<p>Powers of $i$ cycle with period 4: $i, -1, -i, 1$. So $i^{2025} = i^{2024}\cdot i = i$.</p>
<p>Every quadratic now has roots: $x^2 + 2x + 5 = 0$ gives $x = -1 \pm 2i$. Non-real roots of real polynomials come in conjugate pairs. The <strong>fundamental theorem of algebra</strong> says every polynomial of degree $n$ has exactly $n$ complex roots, counted with multiplicity: no further numbers are ever needed.</p>` },
    1: { html: R`
<h3 class="sub">Modulus, argument and polar form</h3>
<p>Plot $z = a + bi$ at the point $(a, b)$ of the <strong>Argand diagram</strong>. Its distance from 0 is the <strong>modulus</strong> $|z| = \sqrt{a^2 + b^2}$; its angle from the positive real axis is the <strong>argument</strong> $\arg z$. Then $z = r(\cos\theta + i\sin\theta)$.</p>
<p>Addition is vector addition. Multiplication is a rotation and a stretch:</p>
<div class="key"><p>$|zw| = |z||w|$ and $\arg(zw) = \arg z + \arg w$. Multiplying by $i$ rotates by $90^\circ$.</p></div>
<div class="worked"><p>Write $z = 1 + \sqrt3\,i$ in polar form and compute $z^6$.</p>
<p>$|z| = 2$, $\arg z = \pi/3$. So $z^6$ has modulus $2^6 = 64$ and argument $2\pi$: $z^6 = 64$.</p></div>
<p>Geometry becomes algebra: $|z - w|$ is the distance between two points; $|z - 2| = 3$ is a circle of radius 3 about 2; $|z - 1| = |z + i|$ is the perpendicular bisector of $1$ and $-i$; and the triangle inequality $|z + w| \le |z| + |w|$ says one side of a triangle is shorter than the other two together.</p>` },
    2: { html: R`
<h3 class="sub">De Moivre and its uses</h3>
<p>From Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$ comes <strong>de Moivre's theorem</strong>: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. Expanding the left side with the binomial theorem produces multiple-angle formulas:</p>
<div class="worked"><p>Express $\cos3\theta$ in terms of $\cos\theta$.</p>
<p>$(c + is)^3 = c^3 + 3ic^2s - 3cs^2 - is^3$. The real part: $\cos3\theta = c^3 - 3cs^2 = c^3 - 3c(1 - c^2) = 4\cos^3\theta - 3\cos\theta$.</p></div>
<p>Euler's formula also gives $\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$ and $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$, which turn trigonometric sums and integrals into geometric series and exponentials.</p>
<h3 class="sub">Why engineers use complex numbers</h3>
<p>An oscillation $A\cos(\omega t + \phi)$ is the real part of $Ae^{i\phi}e^{i\omega t}$. All the information sits in the complex amplitude $Ae^{i\phi}$, a <strong>phasor</strong>. Differentiating multiplies by $i\omega$, so differential equations for AC circuits become algebra: a capacitor behaves like a resistance $1/(i\omega C)$, an inductor like $i\omega L$. The induction chapter of physics uses exactly this.</p>` },
    3: { html: R`
<h3 class="sub">Solving zⁿ = w</h3>
<p>To solve $z^n = w$ with $w = Re^{i\phi}$: the modulus of $z$ is $R^{1/n}$, and the argument can be $\dfrac{\phi + 2\pi k}{n}$ for $k = 0, 1, \dots, n - 1$. The $n$ roots sit at the corners of a regular $n$-gon.</p>
<div class="worked"><p>Solve $z^3 = 8i$.</p>
<p>$8i = 8e^{i\pi/2}$. Modulus 2, arguments $\pi/6, 5\pi/6, 3\pi/2$: $z = \sqrt3 + i$, $-\sqrt3 + i$, $-2i$.</p></div>
<h3 class="sub">Properties of the roots of unity</h3>
<p>The $n$th roots of unity $1, \omega, \omega^2, \dots, \omega^{n-1}$, with $\omega = e^{2\pi i/n}$, are the roots of $z^n - 1 = 0$. Their sum is 0 (the coefficient of $z^{n-1}$, by Vieta; or by symmetry, the vectors balance). Their product is $(-1)^{n+1}$. For $n = 3$, $1 + \omega + \omega^2 = 0$ is the workhorse of many olympiad problems.</p>
<div class="insight"><p>Roots of unity filter sums: to add every third binomial coefficient, $\binom n0 + \binom n3 + \binom n6 + \dots$, average $(1 + x)^n$ over $x = 1, \omega, \omega^2$; the other terms cancel because $1 + \omega^k + \omega^{2k} = 0$ unless 3 divides $k$. The fast Fourier transform, behind every MP3 and video call, is built on the same idea.</p></div>` }
  });

  /* ---------------- Vectors and matrices ---------------- */
  X('math-linear', {
    0: { html: R`
<h3 class="sub">The dot product and angles</h3>
<p>$\mathbf a\cdot\mathbf b = a_1b_1 + a_2b_2 + a_3b_3 = |\mathbf a||\mathbf b|\cos\theta$. It measures how much two vectors point the same way. It is zero for perpendicular vectors, which makes it the tool for right angles, and $\mathbf a\cdot\mathbf a = |\mathbf a|^2$.</p>
<div class="worked"><p>Find the angle between $\mathbf a = (1, 2, 2)$ and $\mathbf b = (3, 0, 4)$, and the projection of $\mathbf b$ onto $\mathbf a$.</p>
<p>$\mathbf a\cdot\mathbf b = 11$, $|\mathbf a| = 3$, $|\mathbf b| = 5$, so $\cos\theta = \tfrac{11}{15}$, $\theta \approx 42.8^\circ$. Projection: $\dfrac{\mathbf a\cdot\mathbf b}{|\mathbf a|^2}\mathbf a = \tfrac{11}{9}(1, 2, 2)$.</p></div>
<h3 class="sub">The cross product, lines and planes</h3>
<p>$\mathbf a\times\mathbf b$ is perpendicular to both, with length $|\mathbf a||\mathbf b|\sin\theta$, the area of the parallelogram they span; the right-hand rule fixes its direction. Torque $\boldsymbol\tau = \mathbf r\times\mathbf F$ and the magnetic force $q\mathbf v\times\mathbf B$ are cross products.</p>
<p>A line through point $\mathbf p$ with direction $\mathbf d$ is $\mathbf r = \mathbf p + t\mathbf d$. A plane through $\mathbf p$ with normal $\mathbf n$ is $\mathbf n\cdot(\mathbf r - \mathbf p) = 0$, i.e. $ax + by + cz = d$. The distance from a point to a plane is $\dfrac{|ax_0 + by_0 + cz_0 - d|}{\sqrt{a^2 + b^2 + c^2}}$.</p>` },
    1: { html: R`
<h3 class="sub">Reading a matrix from its columns</h3>
<p>A $2\times2$ matrix sends the basis vectors $(1, 0)$ and $(0, 1)$ to its two columns, and every other vector follows by linearity. So to build the matrix of a transformation, just ask where the basis vectors go:</p>
<div class="key"><p>Rotation by $\theta$: $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$. Reflection in the $x$-axis: $\begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$. Stretch: $\begin{pmatrix}a & 0\\ 0 & b\end{pmatrix}$. Shear: $\begin{pmatrix}1 & k\\ 0 & 1\end{pmatrix}$.</p></div>
<h3 class="sub">Multiplying matrices is composing transformations</h3>
<p>$AB$ means "do $B$, then $A$". Entry $(i, j)$ of $AB$ is row $i$ of $A$ dotted with column $j$ of $B$. Because the order of transformations matters, $AB \ne BA$ in general: rotating then reflecting differs from reflecting then rotating.</p>
<div class="worked"><p>Show that two rotations combine as the angles add.</p>
<p>Multiplying the rotation matrices for $\alpha$ and $\beta$ gives entries $\cos\alpha\cos\beta - \sin\alpha\sin\beta = \cos(\alpha + \beta)$ and so on: the compound-angle formulas fall out of matrix multiplication.</p></div>
<p>Computer graphics, robotics and every 3D game move points by multiplying by matrices, millions of times per second on a graphics card.</p>` },
    2: { html: R`
<h3 class="sub">What the determinant means</h3>
<p>$\det A$ is the factor by which $A$ scales areas (volumes in 3D), with a sign that says whether orientation flips. For $\begin{pmatrix}a & b\\ c & d\end{pmatrix}$ it is $ad - bc$. Since doing $B$ then $A$ scales by both factors, $\det(AB) = \det A\det B$.</p>
<p>If $\det A = 0$, the transformation squashes the plane onto a line (or a point): information is lost, so there is no inverse. Otherwise $A^{-1} = \dfrac{1}{ad - bc}\begin{pmatrix}d & -b\\ -c & a\end{pmatrix}$.</p>
<div class="worked"><p>Solve $2x + 3y = 8$, $x - y = -1$ with matrices.</p>
<p>$A = \begin{pmatrix}2 & 3\\ 1 & -1\end{pmatrix}$, $\det A = -5$. $A^{-1}\binom{8}{-1} = -\tfrac15\begin{pmatrix}-1 & -3\\ -1 & 2\end{pmatrix}\binom{8}{-1} = -\tfrac15\binom{-5}{-10} = \binom12$. So $x = 1$, $y = 2$.</p></div>
<h3 class="sub">Systems of equations</h3>
<p>$A\mathbf x = \mathbf b$ has exactly one solution when $\det A \ne 0$. When $\det A = 0$ it has either none (inconsistent: parallel lines or planes) or infinitely many. For big systems, <strong>Gaussian elimination</strong> (subtract multiples of rows to make zeros below the diagonal, then back-substitute) is the practical method, and it is what computers do.</p>` },
    3: { html: R`
<h3 class="sub">Finding eigenvalues and eigenvectors</h3>
<p>An eigenvector of $A$ is a direction that $A$ only stretches: $A\mathbf v = \lambda\mathbf v$. Rewrite as $(A - \lambda I)\mathbf v = 0$; a non-zero solution needs $\det(A - \lambda I) = 0$, the <strong>characteristic equation</strong>.</p>
<div class="worked"><p>Find the eigenvalues and eigenvectors of $A = \begin{pmatrix}4 & 1\\ 2 & 3\end{pmatrix}$.</p>
<p>$(4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = 0$, so $\lambda = 5$ or $2$. For $\lambda = 5$: $-x + y = 0$, $\mathbf v = (1, 1)$. For $\lambda = 2$: $2x + y = 0$, $\mathbf v = (1, -2)$. Check: the eigenvalues sum to the trace 7 and multiply to the determinant 10.</p></div>
<h3 class="sub">Why eigenvectors matter</h3>
<p>In the eigenvector basis, $A$ is just a stretch, so its powers are easy: $A^n\mathbf v = \lambda^n\mathbf v$. Repeated application of $A$ to almost any vector lines it up with the eigenvector of the largest $|\lambda|$. That explains long-term population structure (Leslie matrices), the steady state of a Markov chain, Google's PageRank (the eigenvector of the web's link matrix), and the normal modes of vibrating molecules and bridges.</p>
<p>The Fibonacci recurrence is $\binom{F_{n+1}}{F_n} = \begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix}\binom{F_n}{F_{n-1}}$; the matrix's eigenvalues are $\varphi$ and $-1/\varphi$, which is where the golden ratio in Binet's formula comes from.</p>` }
  });

  /* ---------------- Probability and statistics ---------------- */
  X('math-stats', {
    0: { html: R`
<h3 class="sub">The rules of probability</h3>
<div class="key"><p>$P(A \cup B) = P(A) + P(B) - P(A \cap B)$<br>$P(A \cap B) = P(A)\,P(B \mid A)$, and $A, B$ are <strong>independent</strong> when $P(A \cap B) = P(A)P(B)$<br>$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$</p></div>
<p>Tree diagrams organise multi-stage experiments: multiply along branches, add across the branches that give the outcome you want.</p>
<div class="worked"><p>A disease affects 1% of people. A test detects it 95% of the time and gives a false positive 5% of the time. If you test positive, what is the chance you have the disease?</p>
<p>Out of 10 000 people: 100 ill, of whom 95 test positive; 9900 well, of whom 495 test positive. Of 590 positives, only 95 are ill: $P \approx 16\%$. Bayes' theorem in symbols: $P(D \mid +) = \dfrac{P(+ \mid D)P(D)}{P(+)} = \dfrac{0.95\cdot0.01}{0.059}$.</p></div>
<p>The low answer surprises most people, doctors included: when a condition is rare, false positives outnumber true ones. Thinking in natural frequencies (counts out of 10 000) makes Bayes easy.</p>` },
    1: { html: R`
<h3 class="sub">Expectation and variance</h3>
<p>For a random variable $X$, the <strong>expected value</strong> $E[X] = \sum x\,P(X = x)$ is the long-run average, and the <strong>variance</strong> $\operatorname{Var}(X) = E[(X - \mu)^2] = E[X^2] - \mu^2$ measures spread; the standard deviation $\sigma$ is its square root. Rules: $E[aX + b] = aE[X] + b$, $\operatorname{Var}(aX + b) = a^2\operatorname{Var}X$, $E[X + Y] = E[X] + E[Y]$ always, and $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$ for independent variables.</p>
<h3 class="sub">Two named distributions</h3>
<ul><li><strong>Binomial</strong> $B(n, p)$: the number of successes in $n$ independent trials. $P(X = k) = \binom nk p^k(1 - p)^{n-k}$, mean $np$, variance $np(1 - p)$.</li>
<li><strong>Poisson</strong> with rate $\lambda$: counts of rare events in a fixed interval (calls per hour, decays per second). $P(X = k) = e^{-\lambda}\lambda^k/k!$, mean and variance both $\lambda$.</li></ul>
<div class="worked"><p>A multiple-choice test has 20 questions with 4 options each. Guessing randomly, what are the mean and standard deviation of the score, and the probability of exactly 5 right?</p>
<p>$X \sim B(20, 0.25)$: mean 5, variance $3.75$, $\sigma \approx 1.94$. $P(X = 5) = \binom{20}{5}0.25^5\,0.75^{15} \approx 0.202$.</p></div>` },
    2: { html: R`
<h3 class="sub">Working with the normal distribution</h3>
<p>The normal curve $N(\mu, \sigma^2)$ has the bell shape $\dfrac{1}{\sigma\sqrt{2\pi}}e^{-(x - \mu)^2/2\sigma^2}$. Standardise with $Z = \dfrac{X - \mu}{\sigma}$ and use the <strong>68–95–99.7 rule</strong>: about 68% of values lie within $1\sigma$ of the mean, 95% within $2\sigma$, 99.7% within $3\sigma$.</p>
<div class="worked"><p>Adult heights are roughly $N(170, 7^2)$ cm. What fraction are taller than 184 cm?</p>
<p>$z = (184 - 170)/7 = 2$. About 95% lie within $\pm2\sigma$, leaving 5% split between the tails: about 2.5% are taller.</p></div>
<h3 class="sub">Why the bell curve is everywhere</h3>
<p>The <strong>central limit theorem</strong>: the sum (or mean) of many independent random contributions is approximately normal, whatever their own distribution. Measurement errors, heights, exam totals and the mean of a sample all add up many small effects. The mean of $n$ observations has standard deviation $\sigma/\sqrt n$: averaging 100 measurements makes the result 10 times more precise, the basis of the error analysis in the experimental physics chapter.</p>` },
    3: { html: R`
<h3 class="sub">Confidence and significance</h3>
<p>From a sample of size $n$ with mean $\bar x$ and standard deviation $s$, a 95% <strong>confidence interval</strong> for the true mean is roughly $\bar x \pm 2\dfrac{s}{\sqrt n}$. A <strong>hypothesis test</strong> asks: if nothing interesting were going on (the null hypothesis), how surprising would this data be? The <strong>p-value</strong> is that probability; below 0.05 is conventionally called significant.</p>
<div class="worked"><p>A coin gives 60 heads in 100 tosses. Is it biased?</p>
<p>If fair, the number of heads has mean 50 and $\sigma = \sqrt{100\cdot\tfrac14} = 5$. 60 is $2\sigma$ above: a two-sided p-value of about 0.05. Borderline evidence, not proof.</p></div>
<h3 class="sub">Correlation and regression</h3>
<p>The correlation coefficient $r$ (between $-1$ and 1) measures how well points fit a straight line. The <strong>least-squares line</strong> $y = a + bx$ minimises the sum of squared vertical errors; its slope is $b = r\,\dfrac{s_y}{s_x}$ and it passes through $(\bar x, \bar y)$.</p>
<div class="warn-box"><p>Correlation is not causation. Ice-cream sales and drownings rise together because both rise in summer. A strong $r$ also says nothing about a curved relationship, and one outlier can create or destroy a correlation: always look at the scatter plot.</p></div>` }
  });

  /* ---------------- Proof ---------------- */
  X('math-proof', {
    0: { html: R`
<h3 class="sub">The language of proof</h3>
<p>"For all" ($\forall$) and "there exists" ($\exists$) make statements precise. To prove "for all $n$, $P(n)$" you need an argument that covers every $n$; to disprove it, one counterexample. To prove "there exists", one example suffices. Negating swaps them: the negation of "every student passed" is "some student failed".</p>
<p>"If and only if" ($\iff$) means two implications, and both must be proved. "$n^2$ is even $\iff n$ is even": the forward direction is easiest via the contrapositive (if $n$ is odd, $n^2 = 4k^2 + 4k + 1$ is odd), the backward direction directly.</p>
<div class="worked"><p>Prove that the product of any four consecutive integers is one less than a perfect square.</p>
<p>$n(n + 1)(n + 2)(n + 3) = (n^2 + 3n)(n^2 + 3n + 2) = m(m + 2)$ with $m = n^2 + 3n$, and $m(m + 2) = (m + 1)^2 - 1$. ∎ Testing $1\cdot2\cdot3\cdot4 = 24 = 25 - 1$ suggested the claim; algebra proves it for all $n$.</p></div>
<h3 class="sub">Writing a proof</h3>
<p>Say what you assume and what you will show; justify each step; end with a clear conclusion. Draft on scrap paper, then write the clean version. In olympiads, a correct answer with a broken argument earns little, and a clear partial argument earns marks.</p>` },
    1: { html: R`
<h3 class="sub">More classic contradictions</h3>
<p>The pattern: assume the opposite, follow it carefully, reach an impossibility. Contradiction is most natural for statements of "non-existence" (no largest prime, no rational square root of 2, no solution).</p>
<div class="worked"><p>Prove that $\log_2 3$ is irrational.</p>
<p>Suppose $\log_2 3 = p/q$ with $p, q$ positive integers. Then $2^{p/q} = 3$, so $2^p = 3^q$. The left side is even and the right side odd: impossible. ∎</p></div>
<div class="worked"><p>Prove that there is no smallest positive rational number.</p>
<p>If $r$ were the smallest, $r/2$ is positive, rational and smaller. Contradiction. ∎</p></div>
<p>Contradiction is not the same as contrapositive. Proving "if $P$ then $Q$" by contradiction assumes $P$ and not $Q$, and derives <em>any</em> contradiction; contrapositive assumes not $Q$ and derives specifically not $P$. Use contrapositive when it suffices: it is easier to check.</p>` },
    2: { html: R`
<h3 class="sub">Induction done carefully</h3>
<p>The inductive step must work for every $k$ beyond the base case, and it must genuinely <em>use</em> the hypothesis $S(k)$. Write it out in three labelled parts: base case, hypothesis, step.</p>
<div class="worked"><p>Prove that $3^n - 1$ is divisible by 2 for all $n \ge 1$, and that $n! > 2^n$ for $n \ge 4$.</p>
<p>First: base $3 - 1 = 2$. Step: $3^{k+1} - 1 = 3(3^k - 1) + 2$, a multiple of 2 plus 2. ∎</p>
<p>Second: base $24 > 16$. Step: $(k + 1)! = (k + 1)k! > (k + 1)2^k \ge 2\cdot2^k = 2^{k+1}$, using $k + 1 \ge 2$. ∎ The base case is $n = 4$ because the claim fails for $n \le 3$.</p></div>
<div class="warn-box"><p>The "all horses are the same colour" fallacy: an induction whose step secretly fails at one value (from 1 horse to 2, the two groups of $k$ do not overlap). Always check the step for the smallest $k$.</p></div>
<p>Induction proves sums ($\sum k^2 = \frac{n(n+1)(2n+1)}{6}$), divisibilities, inequalities, and facts about recursively defined objects like Fibonacci numbers and binary trees. In programming the same idea proves that loops and recursive functions are correct.</p>` },
    3: { html: R`
<h3 class="sub">Pigeonhole in stronger forms</h3>
<p>If $N$ objects go into $k$ boxes, some box contains at least $\lceil N/k\rceil$ of them. Choosing the right boxes is the whole art.</p>
<div class="worked"><p>Show that among any 6 integers, two have a difference divisible by 5; and that from $\{1, 2, \dots, 2n\}$, any $n + 1$ numbers include two where one divides the other.</p>
<p>First: boxes are the 5 remainders mod 5. Second: write each number as $2^a m$ with $m$ odd. There are only $n$ odd parts $m$ in $1..2n$, so two chosen numbers share the same $m$, and the smaller divides the larger. ∎</p></div>
<h3 class="sub">Invariants and monovariants</h3>
<p>An <strong>invariant</strong> never changes under the allowed moves, so a target with a different value is unreachable. A <strong>monovariant</strong> changes in only one direction (say it always decreases), which proves a process must stop. Examples: parity of a sum, a colouring of the board, the total of some weighted quantity. The Games chapter collects many more.</p>
<div class="worked"><p>Some cells of a $10\times10$ board are infected. Each minute, a cell with at least two infected neighbours becomes infected. Show that at least 10 initially infected cells are needed to infect the whole board.</p>
<p>The perimeter of the infected region never increases: a new cell with $\ge2$ infected neighbours loses at least 2 boundary edges and gains at most 2. The final perimeter is 40 and each initial cell contributes at most 4, so at least 10 cells are needed. ∎</p></div>` }
  });

  /* ---------------- Number theory ---------------- */
  X('math-numbertheory', {
    0: { html: R`
<h3 class="sub">Divisibility and the sum of divisors</h3>
<p>$a \mid b$ ("$a$ divides $b$") means $b = ak$ for some integer $k$. Divisibility is transitive, and if $a \mid b$ and $a \mid c$ then $a$ divides $bx + cy$ for all integers $x, y$: the most-used fact in the subject.</p>
<p>From $n = p_1^{e_1}\cdots p_k^{e_k}$ you get not only the number of divisors but their sum: $\sigma(n) = \prod_i \dfrac{p_i^{e_i + 1} - 1}{p_i - 1}$ (each factor is a geometric series $1 + p + \dots + p^{e}$). For $12 = 2^2\cdot3$: $\sigma = 7\cdot4 = 28$.</p>
<div class="worked"><p>How many zeros does $100!$ end with?</p>
<p>Each zero needs a factor 10 = 2·5, and 5s are rarer. Count the 5s (<strong>Legendre's formula</strong>): $\lfloor100/5\rfloor + \lfloor100/25\rfloor = 20 + 4 = 24$ zeros.</p></div>
<h3 class="sub">Infinitely many primes, and how they thin out</h3>
<p>Euclid proved there are infinitely many primes. They thin out slowly: the <strong>prime number theorem</strong> says that about $n/\ln n$ primes lie below $n$, so near $10^{100}$ roughly one number in 230 is prime. Yet there are arbitrarily long gaps: $n! + 2, \dots, n! + n$ are all composite.</p>` },
    1: { html: R`
<h3 class="sub">The extended Euclidean algorithm</h3>
<p>Running Euclid's algorithm backwards writes the gcd as a combination. For $\gcd(252, 198) = 18$: $18 = 54 - 36 = 54 - (198 - 3\cdot54) = 4\cdot54 - 198 = 4(252 - 198) - 198 = 4\cdot252 - 5\cdot198$.</p>
<p>Consequences of <strong>Bézout's identity</strong> $ax + by = \gcd(a, b)$:</p>
<ul><li>If $\gcd(a, b) = 1$ and $a \mid bc$, then $a \mid c$ (Euclid's lemma), which is what makes prime factorisation unique.</li>
<li>$a$ has an inverse modulo $n$ exactly when $\gcd(a, n) = 1$.</li>
<li>$\gcd(a, b)\cdot\operatorname{lcm}(a, b) = ab$.</li></ul>
<div class="worked"><p>Using jugs of 7 L and 11 L, can you measure exactly 1 L?</p>
<p>$\gcd(7, 11) = 1$, and $1 = 8\cdot7 - 5\cdot11$: fill the 7 L jug eight times, pouring into the 11 L jug and emptying it five times; 1 L remains. With jugs of 6 L and 9 L you could never measure 1 L, since every amount is a multiple of 3.</p></div>
<p>Euclid's algorithm is fast: the numbers at least halve every two steps, so it needs about $2\log_2$ of the smaller number steps. The worst case is consecutive Fibonacci numbers.</p>` },
    2: { html: R`
<h3 class="sub">Solving linear congruences</h3>
<p>$ax \equiv b \pmod n$ is solvable exactly when $d = \gcd(a, n)$ divides $b$, and then it has $d$ solutions modulo $n$. When $\gcd(a, n) = 1$, multiply by the inverse of $a$.</p>
<div class="worked"><p>Solve $7x \equiv 3 \pmod{12}$.</p>
<p>$7\cdot7 = 49 \equiv 1 \pmod{12}$, so $7^{-1} = 7$ and $x \equiv 21 \equiv 9 \pmod{12}$. Check: $63 = 5\cdot12 + 3$. ✓</p></div>
<h3 class="sub">Squares, cubes and quick impossibility proofs</h3>
<p>Squares leave only a few remainders: $0$ or $1 \pmod 4$; $0$, $1$ or $4 \pmod 8$ (every odd square is $1 \pmod 8$); $0$, $1$ or $4 \pmod 5$; $0, 1, 4, 7 \pmod 9$. So 2023 is not a sum of two squares, because $2023 \equiv 3 \pmod 4$ and two squares can only make $0, 1, 2 \pmod 4$. Cubes are $0$ or $\pm1 \pmod 9$, so no sum of three cubes is $4$ or $5 \pmod 9$. Checking a few small moduli is the fastest way to prove an equation has no solutions.</p>
<p>Fast exponentiation works modulo $n$: square repeatedly and reduce at each step. That is how computers handle the 600-digit powers of RSA encryption in milliseconds.</p>` },
    3: { html: R`
<h3 class="sub">Euler's totient and RSA</h3>
<p>$\varphi(n)$ counts the integers from 1 to $n$ coprime to $n$. It is <strong>multiplicative</strong>: $\varphi(mn) = \varphi(m)\varphi(n)$ when $\gcd(m, n) = 1$, and $\varphi(p^k) = p^k - p^{k-1}$. Euler's theorem $a^{\varphi(n)} \equiv 1$ powers the RSA cryptosystem:</p>
<ol><li>Choose primes $p, q$ (hundreds of digits) and publish $n = pq$ and an exponent $e$.</li>
<li>Keep secret $d$ with $ed \equiv 1 \pmod{\varphi(n)}$, where $\varphi(n) = (p - 1)(q - 1)$.</li>
<li>Encrypt $m$ as $c = m^e \bmod n$; decrypt with $c^d = m^{ed} \equiv m \pmod n$.</li></ol>
<p>Finding $d$ needs $\varphi(n)$, which needs the factors of $n$; factoring a 600-digit number is beyond every computer today.</p>
<div class="worked"><p>Find the remainder when $7^{222}$ is divided by 1000.</p>
<p>By the Chinese remainder theorem work mod 8 and mod 125. Mod 8: $7^2 \equiv 1$, so $7^{222} \equiv 1$. Mod 125: $\varphi(125) = 100$, so $7^{222} \equiv 7^{22}$; with $7^2 = 49$, $7^4 = 2401 \equiv 26$, $7^8 \equiv 676 \equiv 51$, $7^{16} \equiv 2601 \equiv 101$, $7^{22} = 7^{16}7^4 7^2 \equiv 101\cdot26\cdot49 \equiv 49 \pmod{125}$ ($101\cdot26 = 2626 \equiv 1$). Then $x \equiv 49 \pmod{125}$ and $x \equiv 1 \pmod 8$: $49 \equiv 1 \pmod 8$, so the answer is 49.</p></div>
<p><strong>Wilson's theorem</strong> completes the toolkit: $p$ is prime exactly when $(p - 1)! \equiv -1 \pmod p$.</p>` }
  });
})();
