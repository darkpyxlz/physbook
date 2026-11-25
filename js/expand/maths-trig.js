/* Mathematics: Trigonometry, a full chapter in Precalculus (between Functions and Sequences). */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3), d2r = Math.PI / 180;
  const S = (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit });
  const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.001 }, o || {});
  const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' });
  const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.001 } : {}, o || {});

  // Trigonometry slots in as chapter 2; later maths chapters move up by one.
  PB.chaptersOf('maths').forEach((c) => { if (c.num >= 2) c.num += 1; });
  PB.addChapter({
    id: 'math-trig', subject: 'maths', num: 2, part: 'Precalculus',
    title: 'Trigonometry',
    subtitle: R`Measuring turning. Radians and arc length, sine, cosine and tangent from right triangles to the unit circle, exact values, graphs and inverse functions, identities, solving equations, and the sine and cosine rules.`,
    big: 'Trigonometry turns <em>angles</em> into <em>lengths</em>. Walk round a circle of radius 1: your height is the sine of the angle you have turned, your sideways position is the cosine. Everything else, from triangles to waves, sound, orbits and alternating current, grows from that one picture.',
    goals: ['Convert between degrees and radians; find arc lengths and sector areas', 'Define sin, cos and tan on right triangles and on the unit circle', 'Know the exact values at 30°, 45° and 60° and the signs in each quadrant', 'Sketch trigonometric graphs and use inverse trig functions', 'Prove and use the Pythagorean, compound-angle and double-angle identities', 'Solve trigonometric equations, finding every solution in a range', 'Solve any triangle with the sine and cosine rules'],
    sections: [
      { title: 'Angles, radians and arcs', html: R`
<p>An angle measures how far something has turned. Degrees split a full turn into 360 parts, a number inherited from Babylonian astronomers. Mathematicians prefer a natural unit, the <strong>radian</strong>: the angle at the centre of a circle subtended by an arc <em>equal in length to the radius</em>.</p>
<p>A full circle has circumference $2\pi r$, so it contains $2\pi$ radius-lengths: a full turn is $2\pi$ radians. Hence</p>
<div class="key"><p>$360^\circ = 2\pi\ \text{rad}$, so $180^\circ = \pi$ rad, $1\ \text{rad} = \dfrac{180^\circ}{\pi} \approx 57.3^\circ$.<br>To convert degrees to radians multiply by $\dfrac{\pi}{180}$; to go back multiply by $\dfrac{180}{\pi}$.</p></div>
<p>Useful landmarks: $30^\circ = \pi/6$, $45^\circ = \pi/4$, $60^\circ = \pi/3$, $90^\circ = \pi/2$, $270^\circ = 3\pi/2$.</p>
<h3 class="sub">Why radians? Arcs and sectors become simple</h3>
<p>Because the radian is defined by the radius, lengths and areas on a circle need no conversion factors. On a circle of radius $r$, an angle $\theta$ (in radians) cuts off</p>
$$\text{arc length } s = r\theta, \qquad \text{sector area } A = \tfrac12 r^2\theta.$$
<p>(The sector is the fraction $\theta/2\pi$ of the whole disc, and $\frac{\theta}{2\pi}\cdot\pi r^2 = \frac12 r^2\theta$.) In calculus the payoff is bigger still: only in radians is the derivative of $\sin x$ exactly $\cos x$. Unless an angle has a degree sign, assume radians.</p>
<div class="worked"><p>A pizza of radius 15 cm is cut into 8 equal slices. Find the length of crust on one slice and the area of the slice.</p>
<p>Each slice has angle $\theta = 2\pi/8 = \pi/4$. Crust: $s = r\theta = 15\cdot\pi/4 \approx 11.8$ cm. Area: $A = \frac12\cdot15^2\cdot\pi/4 \approx 88.4\ \text{cm}^2$ (one eighth of $\pi\cdot15^2 \approx 707$).</p></div>
<p>Angles can also be negative (turning clockwise) or bigger than a full turn: $\theta$ and $\theta + 2\pi$ point the same way. Two angles that differ by a whole number of turns are called <strong>coterminal</strong>.</p>
<div class="warn-box"><p>Calculators have a degree mode and a radian mode. $\sin 30 = -0.988$ in radian mode, because 30 radians is almost five turns. Most wrong answers in trigonometry come from the wrong mode.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Convert $135^\circ$ to radians, as a multiple of $\pi$ (give the multiplier).`, 0.75, [R`Multiply by $\pi/180$.`], R`$135\cdot\pi/180 = 3\pi/4$, so 0.75.`), QN(R`A sector of radius 6 has area 24. What is its angle in radians?`, 4 / 3, [R`$A = \frac12 r^2\theta$.`], R`$24 = 18\theta$, so $\theta = 4/3$.`)] },
      { title: 'Sine, cosine and tangent', html: R`
<h3 class="sub">In a right-angled triangle</h3>
<p>Fix an acute angle $\theta$ in a right-angled triangle. Every such triangle with the same $\theta$ is similar, so the <em>ratios</em> of its sides depend only on $\theta$. They get names:</p>
<div class="key"><p>$\sin\theta = \dfrac{\text{opposite}}{\text{hypotenuse}},\quad \cos\theta = \dfrac{\text{adjacent}}{\text{hypotenuse}},\quad \tan\theta = \dfrac{\text{opposite}}{\text{adjacent}} = \dfrac{\sin\theta}{\cos\theta}.$</p></div>
<p>(The mnemonic SOH CAH TOA lists them.) With one side and one angle you can find any other side; with two sides you can find the angle using the inverse functions.</p>
<div class="worked"><p>A ladder 5 m long leans against a wall, making $70^\circ$ with the ground. How high up the wall does it reach, and how far is its foot from the wall?</p>
<p>The ladder is the hypotenuse. Height $= 5\sin70^\circ \approx 4.70$ m. Distance $= 5\cos70^\circ \approx 1.71$ m. Check with Pythagoras: $4.70^2 + 1.71^2 \approx 25$.</p></div>
<h3 class="sub">Exact values</h3>
<p>Two triangles give the angles you meet most. Half of a square with side 1 has angles $45^\circ, 45^\circ$ and hypotenuse $\sqrt2$. Half of an equilateral triangle with side 2 has angles $30^\circ, 60^\circ$, sides $1, \sqrt3, 2$. Reading off the ratios:</p>
<div class="table-wrap"><table class="data"><tr><th>$\theta$</th><th>$0$</th><th>$30^\circ = \pi/6$</th><th>$45^\circ = \pi/4$</th><th>$60^\circ = \pi/3$</th><th>$90^\circ = \pi/2$</th></tr>
<tr><td>$\sin\theta$</td><td>$0$</td><td>$\tfrac12$</td><td>$\tfrac{\sqrt2}2$</td><td>$\tfrac{\sqrt3}2$</td><td>$1$</td></tr>
<tr><td>$\cos\theta$</td><td>$1$</td><td>$\tfrac{\sqrt3}2$</td><td>$\tfrac{\sqrt2}2$</td><td>$\tfrac12$</td><td>$0$</td></tr>
<tr><td>$\tan\theta$</td><td>$0$</td><td>$\tfrac1{\sqrt3}$</td><td>$1$</td><td>$\sqrt3$</td><td>undefined</td></tr></table></div>
<p>A pattern helps: $\sin$ of $0, 30, 45, 60, 90$ degrees is $\tfrac{\sqrt0}{2}, \tfrac{\sqrt1}{2}, \tfrac{\sqrt2}{2}, \tfrac{\sqrt3}{2}, \tfrac{\sqrt4}{2}$, and $\cos$ runs the same list backwards.</p>
<h3 class="sub">On the unit circle: any angle at all</h3>
<p>Triangles only allow angles below $90^\circ$. To go further, start at $(1, 0)$ on the circle of radius 1 and turn anticlockwise through $\theta$. The point you reach <em>defines</em></p>
$$(\cos\theta, \sin\theta), \qquad \tan\theta = \frac{\sin\theta}{\cos\theta}.$$
<p>For acute angles this agrees with the triangle definition (the hypotenuse is 1), and it works for every real $\theta$. The signs follow the quadrant: in the first all three are positive; in the second only sine; in the third only tangent; in the fourth only cosine ("All Students Take Calculus", anticlockwise from the first quadrant).</p>
<p>To evaluate any angle, find its <strong>reference angle</strong> (the acute angle to the $x$-axis), take the value for that, and attach the quadrant's sign. For example $\sin 150^\circ = +\sin30^\circ = \tfrac12$ and $\cos 240^\circ = -\cos60^\circ = -\tfrac12$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is $\cos 210^\circ$? (Exact value, as a decimal.)`, -Math.sqrt(3) / 2, [R`Third quadrant; reference angle $30^\circ$.`], R`Cosine is negative in the third quadrant: $-\cos30^\circ = -\sqrt3/2 \approx -0.866$.`), QM(R`In which quadrant are $\sin\theta < 0$ and $\tan\theta > 0$?`, ['first', 'second', 'third', 'fourth'], 2, [R`Tangent positive means sine and cosine have the same sign.`], R`Both negative: the third quadrant.`)] },
      { title: 'Graphs, periods and inverse functions', html: R`
<p>As $\theta$ runs round the circle, $\sin\theta$ rises from 0 to 1, falls through 0 to $-1$ and returns: the familiar wave. Cosine is the same wave shifted left by $\pi/2$, since $\cos\theta = \sin(\theta + \pi/2)$. Both are <strong>periodic</strong> with period $2\pi$ and range $[-1, 1]$. Tangent has period $\pi$ and vertical asymptotes where $\cos\theta = 0$, at $\theta = \pi/2 + k\pi$.</p>
<p>Sine is <strong>odd</strong> ($\sin(-\theta) = -\sin\theta$) and cosine is <strong>even</strong> ($\cos(-\theta) = \cos\theta$): reflect the point on the unit circle in the $x$-axis and see.</p>
<h3 class="sub">Stretching and shifting waves</h3>
<p>The general wave $y = A\sin(B(x - C)) + D$ has <strong>amplitude</strong> $|A|$, <strong>period</strong> $2\pi/|B|$, a horizontal <strong>phase shift</strong> $C$ and a vertical shift $D$: exactly the transformations of the Functions chapter.</p>
<div class="worked"><p>The depth of water in a harbour is $d(t) = 5 + 2\sin\!\left(\dfrac{\pi t}{6}\right)$ metres, $t$ in hours after midnight. Find the greatest depth, the period and the first time the depth is 6 m.</p>
<p>Greatest depth $5 + 2 = 7$ m. Period $2\pi/(\pi/6) = 12$ hours. Depth 6: $\sin(\pi t/6) = \tfrac12$, so $\pi t/6 = \pi/6$, giving $t = 1$: 1 a.m.</p></div>
<h3 class="sub">Inverse trigonometric functions</h3>
<p>Many angles have the same sine, so to invert sine we restrict it to an interval where it takes each value once. By convention</p>
<div class="key"><p>$\arcsin x \in [-\tfrac\pi2, \tfrac\pi2],\quad \arccos x \in [0, \pi],\quad \arctan x \in (-\tfrac\pi2, \tfrac\pi2).$</p></div>
<p>These are the values a calculator's $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$ keys return: the <strong>principal values</strong>. Note that $\sin^{-1}x$ means the inverse function, not $1/\sin x$ (that is $\csc x$; similarly $\sec x = 1/\cos x$ and $\cot x = 1/\tan x$).</p>
<h3 class="sub">Solving equations: find every solution</h3>
<p>$\sin x = \tfrac12$ has infinitely many solutions. The principal value is $\pi/6$; the symmetry $\sin(\pi - x) = \sin x$ gives a second one, $5\pi/6$; then add whole turns:</p>
$$\sin x = a:\ x = \arcsin a + 2k\pi\ \text{ or }\ \pi - \arcsin a + 2k\pi;\qquad \cos x = a:\ x = \pm\arccos a + 2k\pi;\qquad \tan x = a:\ x = \arctan a + k\pi.$$
<div class="worked"><p>Solve $2\cos(2x) = 1$ for $0 \le x < 2\pi$.</p>
<p>$\cos 2x = \tfrac12$, so $2x = \pm\pi/3 + 2k\pi$ and $x = \pm\pi/6 + k\pi$. In the range: $x = \pi/6, 5\pi/6, 7\pi/6, 11\pi/6$. Four solutions, because $2x$ runs over <em>two</em> full turns.</p></div>
<div class="warn-box"><p>Dividing both sides by a trig function loses solutions. In $\sin x\cos x = \sin x$, factorise instead: $\sin x(\cos x - 1) = 0$, so $\sin x = 0$ or $\cos x = 1$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many solutions does $\sin x = 0.3$ have with $0 \le x < 4\pi$?`, 4, [R`Two per full turn.`], R`Two turns, two solutions each: 4.`), QN(R`What is the period of $y = 3\tan(2x)$, as a multiple of $\pi$?`, 0.5, [R`Tangent's period is $\pi$.`], R`$\pi/2$.`)] },
      { title: 'Identities', html: R`
<p>An <strong>identity</strong> is true for every angle. The most important comes straight from the unit circle and Pythagoras:</p>
<div class="key"><p>$\sin^2\theta + \cos^2\theta = 1.$ Dividing by $\cos^2\theta$: $\tan^2\theta + 1 = \sec^2\theta$.</p></div>
<p>So if $\sin\theta = \tfrac35$ with $\theta$ obtuse, then $\cos\theta = -\sqrt{1 - \tfrac9{25}} = -\tfrac45$ (negative in the second quadrant) and $\tan\theta = -\tfrac34$.</p>
<h3 class="sub">Compound angles</h3>
<div class="key"><p>$\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B$<br>$\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B$<br>$\tan(A \pm B) = \dfrac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$</p></div>
<p>They give exact values for new angles: $\sin 75^\circ = \sin(45^\circ + 30^\circ) = \tfrac{\sqrt2}2\cdot\tfrac{\sqrt3}2 + \tfrac{\sqrt2}2\cdot\tfrac12 = \tfrac{\sqrt6 + \sqrt2}{4}$. (A slick proof uses complex numbers: compare real and imaginary parts of $e^{i(A+B)} = e^{iA}e^{iB}$.)</p>
<h3 class="sub">Double angles and the harmonic form</h3>
<p>Putting $B = A$:</p>
$$\sin 2A = 2\sin A\cos A,\qquad \cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A.$$
<p>The last two rearrange to $\cos^2 A = \tfrac12(1 + \cos 2A)$ and $\sin^2 A = \tfrac12(1 - \cos 2A)$, which turn squares into single waves; they are the key to integrating $\sin^2 x$ in the Techniques chapter.</p>
<p>Any combination $a\sin x + b\cos x$ is a single wave: $a\sin x + b\cos x = R\sin(x + \alpha)$ with $R = \sqrt{a^2 + b^2}$ and $\tan\alpha = b/a$. Expand the right side with the compound-angle formula and match coefficients to see why.</p>
<div class="worked"><p>Find the maximum of $3\sin x + 4\cos x$ and where it occurs.</p>
<p>$R = \sqrt{9 + 16} = 5$, $\tan\alpha = 4/3$, $\alpha \approx 0.927$. So $3\sin x + 4\cos x = 5\sin(x + 0.927)$, with maximum 5 when $x + 0.927 = \pi/2$, i.e. $x \approx 0.644$.</p></div>
<h3 class="sub">Proving an identity</h3>
<p>Start from one side (usually the more complicated) and transform it into the other; do not "work on both sides at once". Example: $\dfrac{1 - \cos2x}{\sin2x} = \dfrac{2\sin^2x}{2\sin x\cos x} = \dfrac{\sin x}{\cos x} = \tan x$.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`If $\cos\theta = \tfrac{5}{13}$ and $\theta$ is acute, what is $\sin 2\theta$? (Decimal.)`, 120 / 169, [R`First $\sin\theta = 12/13$.`], R`$2\cdot\tfrac{12}{13}\cdot\tfrac5{13} = \tfrac{120}{169} \approx 0.710$.`), QN(R`What is the maximum value of $5\sin x - 12\cos x$?`, 13, [R`$R = \sqrt{a^2 + b^2}$.`], R`$\sqrt{25 + 144} = 13$.`)] },
      { title: 'Solving triangles', html: R`
<p>For triangles without a right angle, label the sides $a, b, c$ opposite the angles $A, B, C$. Two rules solve every triangle.</p>
<div class="key"><p><strong>Sine rule:</strong> $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C} = 2R$, where $R$ is the radius of the circumscribed circle.<br>
<strong>Cosine rule:</strong> $c^2 = a^2 + b^2 - 2ab\cos C$.<br>
<strong>Area:</strong> $\tfrac12 ab\sin C$.</p></div>
<p>The cosine rule is Pythagoras with a correction: when $C = 90^\circ$ the last term vanishes. Use it when you know three sides (to find an angle) or two sides and the angle between them. Use the sine rule when you know a side and its opposite angle.</p>
<div class="worked"><p>Two ships leave port together. One sails 8 km on a bearing of $040^\circ$, the other 11 km on a bearing of $110^\circ$. How far apart are they?</p>
<p>The angle between their courses is $110^\circ - 40^\circ = 70^\circ$. Cosine rule: $d^2 = 8^2 + 11^2 - 2\cdot8\cdot11\cos70^\circ = 185 - 176\cdot0.342 = 124.8$, so $d \approx 11.2$ km.</p></div>
<h3 class="sub">The ambiguous case</h3>
<p>Given two sides and a non-included angle, there may be two triangles. With $a = 7$, $b = 10$, $A = 35^\circ$: $\sin B = 10\sin35^\circ/7 = 0.819$, so $B \approx 55^\circ$ <em>or</em> $B \approx 125^\circ$. Both leave room for a positive third angle, so both triangles exist. Always check whether $180^\circ - B$ also works.</p>
<p>Why does the sine rule hold? Drop a perpendicular from $C$ to $AB$: its length is $b\sin A$ and also $a\sin B$. Setting them equal gives $a/\sin A = b/\sin B$. The cosine rule follows from Pythagoras in the two right triangles formed the same way.</p>
<div class="insight"><p>In olympiad geometry, $a = 2R\sin A$ converts statements about lengths into statements about angles, which are often easier: this "trig bash" is a reliable last resort for many triangle problems.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A triangle has sides 5, 7 and 8. Find the angle opposite the side 7, in degrees.`, 60, [R`$\cos C = (a^2 + b^2 - c^2)/2ab$.`], R`$\cos C = (25 + 64 - 49)/80 = \tfrac12$: $60^\circ$.`), QN(R`Find the area of a triangle with sides 6 and 9 enclosing an angle of $30^\circ$.`, 13.5, [R`$\tfrac12 ab\sin C$.`], R`$\tfrac12\cdot6\cdot9\cdot\tfrac12 = 13.5$.`)] }
    ],
    labs: [
      { sim: 'explore', title: 'The unit circle and the sine wave', desc: 'Turn the angle and watch the point on the unit circle. Its height is sin θ (traced on the right); its sideways position is cos θ.',
        tasks: ['At which angles is sin θ = cos θ?', 'Find two angles between 0° and 360° with sin θ = 0.5.', 'Why does the graph repeat after 360°?'],
        params: { aspect: 0.45, picFrac: 0.42, controls: [S('a', 'Angle θ', 0, 720, 1, 40, '°')],
          draw: (ctx, C, v, b) => { const r = Math.min(b.w, b.h) * 0.38, cx = b.x + b.w / 2, cy = b.y + b.h / 2, t = v.a * d2r, px = cx + r * Math.cos(t), py = cy - r * Math.sin(t); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - r - 12, cy); ctx.lineTo(cx + r + 12, cy); ctx.moveTo(cx, cy - r - 12); ctx.lineTo(cx, cy + r + 12); ctx.stroke(); ctx.strokeStyle = C.ink3; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.strokeStyle = C.points; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r * 0.22, 0, -t % (2 * Math.PI), true); ctx.stroke(); ctx.strokeStyle = C.ink2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.accent; ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke(); ctx.strokeStyle = C.rust; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke(); ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(px, py, 6, 0, 7); ctx.fill(); ctx.font = '12px sans-serif'; ctx.fillStyle = C.accent; ctx.fillText('sin', px + 6, (py + cy) / 2); ctx.fillStyle = C.rust; ctx.fillText('cos', (px + cx) / 2 - 10, cy + 16); },
          plots: [{ x: [0, 720], y: [-1.2, 1.2], zero: true, xlabel: 'θ (°)', ylabel: 'value', n: 300, curves: () => [{ f: (x) => Math.sin(x * d2r), label: 'sin θ' }, { f: (x) => Math.cos(x * d2r), color: 'rust', dash: [5, 4], label: 'cos θ' }], pts: (v) => [{ x: v.a, y: Math.sin(v.a * d2r) }, { x: v.a, y: Math.cos(v.a * d2r), color: 'rust' }] }],
          readout: (v) => [['θ in radians', f(v.a * d2r, 4)], ['sin θ', f(Math.sin(v.a * d2r), 4)], ['cos θ', f(Math.cos(v.a * d2r), 4)], ['tan θ', Math.abs(Math.cos(v.a * d2r)) < 1e-9 ? 'undefined' : f(Math.tan(v.a * d2r), 4)], ['sin² + cos²', f(Math.pow(Math.sin(v.a * d2r), 2) + Math.pow(Math.cos(v.a * d2r), 2), 6)]] } },
      { sim: 'explore', title: 'One wave from two: a sin x + b cos x', desc: 'Adding a sine and a cosine always gives a single shifted sine wave R sin(x + α). Change a and b and compare the predicted R and α with the curve.',
        tasks: ['Set a = 3, b = 4. Read off the maximum.', 'Make b negative. Which way does the wave shift?', 'For which a, b is the sum zero everywhere?'],
        params: { aspect: 0.4, controls: [S('a', 'a (sine part)', -5, 5, 0.5, 3), S('b', 'b (cosine part)', -5, 5, 0.5, 4)],
          plots: [{ x: [0, 4 * Math.PI], y: [-7.5, 7.5], zero: true, xlabel: 'x (rad)', ylabel: 'y', n: 300, curves: (v) => [{ f: (x) => v.a * Math.sin(x), color: 'ink3', dash: [3, 4], label: 'a sin x' }, { f: (x) => v.b * Math.cos(x), color: 'teal', dash: [3, 4], label: 'b cos x' }, { f: (x) => v.a * Math.sin(x) + v.b * Math.cos(x), label: 'sum' }] }],
          readout: (v) => { const Rr = Math.hypot(v.a, v.b), al = Math.atan2(v.b, v.a); return [['R = √(a² + b²)', f(Rr, 4)], ['α', f(al, 4) + ' rad = ' + f(al / d2r, 4) + '°'], ['maximum at x', f(((Math.PI / 2 - al) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI), 4)]]; } } }
    ],
    formulas: [['Radians', '180^\\circ = \\pi\\ \\text{rad}'], ['Arc and sector', 's = r\\theta,\\quad A = \\tfrac12 r^2\\theta'], ['Unit circle', '(\\cos\\theta, \\sin\\theta),\\ \\tan\\theta = \\sin\\theta/\\cos\\theta'], ['Pythagorean identity', '\\sin^2\\theta + \\cos^2\\theta = 1'],
      ['Compound angle', '\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B'], ['', '\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B'], ['Double angle', '\\sin2A = 2\\sin A\\cos A,\\ \\cos2A = 1 - 2\\sin^2A'], ['Harmonic form', 'a\\sin x + b\\cos x = \\sqrt{a^2+b^2}\\,\\sin(x + \\alpha)'],
      ['General solutions', '\\sin x = a:\\ x = \\arcsin a + 2k\\pi\\ \\text{or}\\ \\pi - \\arcsin a + 2k\\pi'], ['Sine rule', '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = 2R'], ['Cosine rule', 'c^2 = a^2 + b^2 - 2ab\\cos C'], ['Triangle area', '\\tfrac12 ab\\sin C']],
    problems: [
      P('concept', 'num', 'Degrees to radians', R`Convert $300^\circ$ to radians, as a multiple of $\pi$.`, 5 / 3, [R`Multiply by $\pi/180$.`], R`$300/180 = 5/3$, so $5\pi/3$.`),
      P('concept', 'mcq', 'Exact value', R`$\tan 60^\circ$ equals…`, 2, [R`Use the 30-60-90 triangle with sides $1, \sqrt3, 2$.`], R`opposite/adjacent $= \sqrt3/1$.`, { options: ['$\\tfrac{1}{\\sqrt3}$', '$\\tfrac{\\sqrt3}{2}$', '$\\sqrt3$', '$1$'] }),
      P('concept', 'mcq', 'Signs', R`For an angle in the second quadrant, which is positive?`, 0, [R`All, Sine, Tan, Cos, anticlockwise from the first quadrant.`], R`Only sine.`, { options: ['$\\sin$ only', '$\\cos$ only', '$\\tan$ only', 'all three'] }),
      P('concept', 'mcq', 'Principal value', R`What does a calculator return for $\arccos(-1/2)$?`, 3, [R`$\arccos$ returns an angle in $[0, \pi]$.`], R`$2\pi/3$ ($120^\circ$).`, { options: ['$-\\pi/3$', '$\\pi/3$', '$4\\pi/3$', '$2\\pi/3$'] }),
      P('core', 'num', 'Arc length', R`A wheel of radius 0.35 m turns through 3 radians. How far does a point on its rim travel (m)?`, 1.05, [R`$s = r\theta$.`], R`$0.35\cdot3 = 1.05$ m.`),
      P('core', 'num', 'Height of a tree', R`From 20 m away on level ground, the top of a tree is seen at an angle of elevation of $38^\circ$. How tall is the tree (m)?`, 20 * Math.tan(38 * d2r), [R`$\tan38^\circ = h/20$.`], R`$h = 20\tan38^\circ \approx 15.6$ m.`, { tol: 0.01 }),
      P('core', 'num', 'Exact compound angle', R`Find $\cos 15^\circ$ exactly and give it as a decimal.`, (Math.sqrt(6) + Math.sqrt(2)) / 4, [R`$\cos(45^\circ - 30^\circ)$.`], R`$\tfrac{\sqrt2}2\cdot\tfrac{\sqrt3}2 + \tfrac{\sqrt2}2\cdot\tfrac12 = \tfrac{\sqrt6 + \sqrt2}4 \approx 0.966$.`),
      P('core', 'num', 'Counting solutions', R`How many solutions does $\tan x = 2$ have with $0 \le x \le 3\pi$?`, 3, [R`Tangent repeats every $\pi$.`], R`One in each interval of length $\pi$: 3.`),
      P('core', 'num', 'Cosine rule', R`In triangle $ABC$, $b = 6$, $c = 10$ and $A = 120^\circ$. Find $a$.`, 14, [R`$a^2 = b^2 + c^2 - 2bc\cos A$, and $\cos120^\circ = -\tfrac12$.`], R`$a^2 = 36 + 100 + 60 = 196$, $a = 14$.`),
      P('core', 'num', 'Sine rule', R`In triangle $ABC$, $A = 40^\circ$, $B = 75^\circ$ and $a = 8$. Find $b$.`, 8 * Math.sin(75 * d2r) / Math.sin(40 * d2r), [R`$b = a\sin B/\sin A$.`], R`$8\sin75^\circ/\sin40^\circ \approx 12.02$.`, { tol: 0.01 }),
      P('core', 'num', 'Squares to waves', R`What is the minimum value of $\sin^2 x - \cos 2x$?`, -1, [R`Write $\cos2x = 1 - 2\sin^2x$.`], R`$\sin^2x - 1 + 2\sin^2x = 3\sin^2x - 1 \ge -1$, reached when $\sin x = 0$.`),
      P('olympiad', 'num', 'A product of cosines', R`Evaluate $\cos20^\circ\cos40^\circ\cos80^\circ$.`, 0.125, [R`Multiply by $\sin20^\circ$ and use $2\sin\theta\cos\theta = \sin2\theta$ three times.`], R`$\sin20\cos20\cos40\cos80 = \tfrac18\sin160 = \tfrac18\sin20$, so the product is $\tfrac18$.`),
      P('olympiad', 'num', 'Sum of sines', R`Evaluate $\sin^2 1^\circ + \sin^2 2^\circ + \dots + \sin^2 89^\circ$.`, 44.5, [R`Pair $\sin^2 k^\circ$ with $\sin^2(90 - k)^\circ = \cos^2 k^\circ$.`], R`44 pairs each summing to 1, plus $\sin^245^\circ = \tfrac12$: 44.5.`),
      P('olympiad', 'num', 'Ambiguous triangles', R`With $b = 10$ and $A = 30^\circ$, for how many whole-number values of $a$ are there exactly two different triangles?`, 4, [R`Two triangles when $b\sin A < a < b$.`], R`$5 < a < 10$: $a = 6, 7, 8, 9$, four values.`),
      P('olympiad', 'num', 'Tangent addition', R`If $A + B = 45^\circ$, find $(1 + \tan A)(1 + \tan B)$.`, 2, [R`$\tan(A + B) = 1$ gives $\tan A + \tan B = 1 - \tan A\tan B$.`], R`$1 + \tan A + \tan B + \tan A\tan B = 1 + 1 = 2$.`)
    ]
  });
  PB.addDrills('math-trig', [
    { title: 'Degrees to radians', gen: (r) => { const d = r.pick([15, 30, 45, 60, 75, 120, 135, 150, 210, 225, 240, 270, 300, 315, 330]); return { q: R`<p>Convert $${d}^\circ$ to radians (decimal).</p>`, answer: d * d2r, tol: 0.005, solution: R`<p>$${d}\cdot\pi/180 \approx ${f(d * d2r, 4)}$.</p>` }; } },
    { title: 'Unit-circle values', gen: (r) => { const d = r.pick([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]), fn = r.pick(['sin', 'cos']); const v = fn === 'sin' ? Math.sin(d * d2r) : Math.cos(d * d2r); return { q: '<p>Find $\\' + fn + ' ' + d + '^\\circ$ (decimal).</p>', answer: v, tol: 0.005, atol: 0.001, solution: R`<p>Reference angle and quadrant sign: $${f(v, 4)}$.</p>` }; } },
    { title: 'Cosine rule', gen: (r) => { const a = r.int(3, 12), b = r.int(3, 12), C = r.pick([30, 45, 60, 90, 120]); const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * d2r)); return { q: R`<p>Sides $${a}$ and $${b}$ enclose an angle of $${C}^\circ$. Find the third side.</p>`, answer: c, tol: 0.01, solution: R`<p>$c^2 = ${a}^2 + ${b}^2 - 2\cdot${a}\cdot${b}\cos${C}^\circ$, $c \approx ${f(c, 4)}$.</p>` }; } }
  ]);
  PB.chapter('math-trig').plainExtra = Object.assign({}, [
    'Angles can be measured in radians: how many radius-lengths of arc they cut off. A full turn is 2π radians, and arc lengths become simply radius times angle.',
    'Sine, cosine and tangent are ratios of sides in a right-angled triangle; on a circle of radius 1 they are the height, the sideways position and their ratio, for any angle at all.',
    'Sine and cosine repeat every full turn, making waves you can stretch and shift, and inverse functions turn a value back into an angle, though every equation has many solutions.',
    'Identities are rules true for every angle, like sin² + cos² = 1, and they let you rewrite expressions, combine waves and find exact values.',
    'The sine rule and the cosine rule find missing sides and angles in any triangle, not just right-angled ones.'
  ]);
  PB.PREDICT = PB.PREDICT || {};
  Object.assign(PB.PREDICT, { 'math-trig': { q: 'Between 0° and 360°, how many angles have sin θ = 0.5?', o: ['Two', 'One', 'Four'], a: 0, how: 'turn the angle in the unit-circle lab and watch the height.', why: 'The height 0.5 is reached once going up (30°) and once coming down (150°), and the pattern repeats every full turn.' } });
  PB.WILD_EXTRA = Object.assign(PB.WILD_EXTRA || {}, { 'math-trig': ['GPS and surveying', 'Surveyors and satellite navigation locate points by measuring angles and distances to triangles of known reference points.'] });
})();
