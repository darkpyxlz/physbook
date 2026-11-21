(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'wave-optics', num: 18, part: 'Optics',
    title: 'Wave Optics',
    subtitle: R`When light meets structures comparable to its wavelength, rays fail and waves take over: interference, thin films, diffraction, gratings, resolution limits and polarisation.`,
    goals: ['Locate fringes in double-slit interference', 'Account for phase shifts in thin films', 'Find single-slit minima and resolution limits', 'Use diffraction gratings and resolving power', 'Apply Malus’s law and Brewster’s angle'],
    sections: [
      {
        title: "Interference and Young's double slit",
        html: R`
<p>Light waves from two coherent sources (same frequency, fixed phase relation) add their <em>fields</em>, not their intensities. Where the path difference is a whole number of wavelengths they reinforce; where it is a half-odd number they cancel.</p>
<p>In Young's experiment, slits a distance $d$ apart illuminate a screen at distance $L$. The path difference to angle $\theta$ is $d\sin\theta$, so</p>
<div class="key">$$\text{bright: } d\sin\theta = m\lambda,\qquad \text{dark: } d\sin\theta = \left(m + \tfrac12\right)\lambda,\qquad \Delta y = \frac{\lambda L}{d}.$$</div>
<p>The intensity varies as $I = I_0\cos^2\left(\dfrac{\pi d\sin\theta}{\lambda}\right)$. Young used this in 1801 to measure the wavelength of light, about half a micrometre.</p>`
      },
      {
        title: 'Thin films',
        html: R`
<p>Light reflecting off the top and bottom of a thin film of thickness $t$ and index $n$ interferes. Two effects set the phase difference:</p>
<ul>
<li>The extra path in the film, $2nt$ at normal incidence.</li>
<li>A <strong>half-wavelength phase shift</strong> on reflection from a medium of higher index (none from a lower one).</li>
</ul>
<p>For a soap film in air, only the top reflection is shifted, so</p>
<div class="key">$$\text{constructive: } 2nt = \left(m + \tfrac12\right)\lambda,\qquad \text{destructive: } 2nt = m\lambda.$$</div>
<p>As a film thins to almost nothing, the path difference vanishes but the half-wave shift remains, so the reflections cancel and the film looks black just before it pops.</p>
<p>Anti-reflection coatings use a quarter-wave layer ($nt = \lambda/4$) whose index lies between air and glass, so both reflections are shifted and they cancel.</p>
<p>The <strong>Michelson interferometer</strong> splits a beam, sends the halves along two arms and recombines them. Moving one mirror by $\lambda/2$ shifts the pattern by one fringe. Scaled up to kilometres, it detected gravitational waves.</p>`
      },
      {
        title: 'Diffraction and resolution',
        html: R`
<p>Light spreads after passing through an aperture. For a single slit of width $a$, each part of the slit acts as a source, and they cancel completely at</p>
<div class="key">$$a\sin\theta = m\lambda,\qquad m = \pm1, \pm2, \dots$$</div>
<p>The central bright fringe is twice as wide as the others. The intensity is $I = I_0\left(\dfrac{\sin\beta}{\beta}\right)^2$ with $\beta = \pi a\sin\theta/\lambda$.</p>
<p>A real double slit shows both effects: fast interference fringes inside a slow single-slit envelope. When an interference maximum falls on a diffraction minimum, that order goes missing.</p>
<p>A circular aperture of diameter $D$ produces an Airy pattern whose first dark ring is at $\sin\theta = 1.22\lambda/D$. This sets the <strong>Rayleigh criterion</strong>: two point sources are just resolved when</p>
<div class="key">$$\theta_{\min} = 1.22\frac{\lambda}{D}.$$</div>
<p>Bigger telescopes and shorter wavelengths see finer detail.</p>`
      },
      {
        title: 'Diffraction gratings',
        html: R`
<p>A grating has $N$ slits with spacing $d$. Bright maxima still occur at $d\sin\theta = m\lambda$, but with many slits they become extremely sharp, with $N - 2$ faint secondary maxima between each pair of principal maxima. That makes gratings ideal for measuring wavelengths.</p>
<p>Two wavelengths $\lambda$ and $\lambda + \Delta\lambda$ are resolved in order $m$ if</p>
<div class="key">$$\frac{\lambda}{\Delta\lambda} \le Nm.$$</div>
<p>X-ray diffraction from crystals is the same physics, with atomic planes as the grating: the Bragg condition is $2d\sin\theta = m\lambda$.</p>`
      },
      {
        title: 'Polarisation',
        html: R`
<p>Light is a transverse wave, so its electric field has a direction. Unpolarised light has a randomly varying direction. An ideal polariser transmits only the component along its axis, so it halves the intensity of unpolarised light. For already-polarised light at angle $\theta$ to the axis, <strong>Malus's law</strong> gives</p>
<div class="key">$$I = I_0\cos^2\theta.$$</div>
<p>Light reflected from a surface at <strong>Brewster's angle</strong>, $\tan\theta_B = n_2/n_1$, is completely polarised parallel to the surface. Polarised sunglasses block this glare. Scattered skylight is also partly polarised, which bees use for navigation.</p>`
      }
    ],
    labs: [
      { sim: 'slits', title: 'Slits and gratings', desc: 'Intensity on a distant screen for N slits. The dashed curve is the single-slit envelope; the strip shows what the screen looks like.',
        tasks: ['With N = 2, double d. How does the fringe spacing change?', 'Set d = 4a. Count the bright fringes in the central envelope and find the missing order.', 'Increase N from 2 to 10. What happens to the width of each bright fringe and to the light between them?', 'Change λ from blue to red. Which direction do the fringes move?'] }
    ],
    formulas: [
      ['Double-slit maxima', R`d\sin\theta = m\lambda`],
      ['Fringe spacing', R`\Delta y = \lambda L/d`],
      ['Two-slit intensity', R`I = I_0\cos^2(\pi d\sin\theta/\lambda)`],
      ['Soap film, bright', R`2nt = (m + \tfrac12)\lambda`],
      ['Single-slit minima', R`a\sin\theta = m\lambda`],
      ['Rayleigh criterion', R`\theta_{\min} = 1.22\lambda/D`],
      ['Grating', R`d\sin\theta = m\lambda`],
      ['Resolving power', R`\lambda/\Delta\lambda = Nm`],
      ['Bragg’s law', R`2d\sin\theta = m\lambda`],
      ['Malus’s law', R`I = I_0\cos^2\theta`],
      ['Brewster’s angle', R`\tan\theta_B = n_2/n_1`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Moving the slits apart',
        q: R`<p>In a double-slit experiment the slit separation is increased. The bright fringes on the screen:</p>`,
        options: ['Spread further apart', 'Move closer together', 'Stay where they are', 'Disappear'], answer: 1,
        hints: [R`$\Delta y = \lambda L/d$.`],
        solution: R`<p>Fringe spacing is inversely proportional to $d$, so the fringes crowd together.</p>` },
      { level: 'concept', type: 'mcq', title: 'Black soap film',
        q: R`<p>A vertical soap film looks black at its very top, where it is thinnest. Why?</p>`,
        options: ['No light reaches the top of the film', 'The film absorbs light there', 'The two reflections cancel because one has a half-wave phase shift', 'The film is too thin to reflect anything'], answer: 2,
        hints: [R`As $t\to0$, the path difference vanishes. What phase difference remains?`],
        solution: R`<p>Reflection off the front surface (air to soap) shifts the phase by $\pi$; reflection off the back (soap to air) does not. With negligible path difference, the two reflections are exactly out of phase and cancel.</p>` },
      { level: 'concept', type: 'mcq', title: 'Three polarisers',
        q: R`<p>Unpolarised light passes through two polarisers with perpendicular axes, so nothing gets through. A third polariser at $45^\circ$ is inserted between them. What fraction of the original intensity now emerges?</p>`,
        options: ['0', '1/8', '1/4', '1/2'], answer: 1,
        hints: [R`First polariser: $\tfrac12$. Each later polariser: $\cos^2 45^\circ$.`],
        solution: R`<p>$\tfrac12 \times \cos^2 45^\circ \times \cos^2 45^\circ = \tfrac12 \times \tfrac12 \times \tfrac12 = \tfrac18$. Adding a filter lets more light through, because the middle polariser rotates the polarisation.</p>` },
      { level: 'core', type: 'num', title: "Young's fringes",
        q: R`<p>Slits $0.25\ \mathrm{mm}$ apart are lit by $600\ \mathrm{nm}$ light. The screen is $1.5\ \mathrm m$ away. Find the fringe spacing in millimetres.</p>`,
        answer: 600e-9 * 1.5 / 2.5e-4 * 1000, tol: 0.01, unit: 'mm',
        hints: [R`$\Delta y = \lambda L/d$.`],
        solution: R`<p>$\Delta y = \dfrac{(600\times10^{-9})(1.5)}{2.5\times10^{-4}} = 3.6\times10^{-3}\ \mathrm m = 3.6\ \mathrm{mm}$.</p>` },
      { level: 'core', type: 'num', title: 'Grating angle',
        q: R`<p>Light of wavelength $550\ \mathrm{nm}$ falls on a grating with $600$ lines per millimetre. At what angle is the first-order maximum?</p>`,
        answer: Math.asin(550e-9 * 6e5) * 180 / Math.PI, tol: 0.005, unit: 'degrees',
        hints: [R`$d = 1/600\ \mathrm{mm}$.`],
        solution: R`<p>$\sin\theta = \lambda/d = (550\times10^{-9})(6.0\times10^5) = 0.330$, so $\theta = 19.3^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'Thinnest bright film',
        q: R`<p>A soap film ($n = 1.33$) in air reflects $520\ \mathrm{nm}$ light most strongly. What is the smallest film thickness that does this? Give the answer in nanometres.</p>`,
        answer: 520 / (4 * 1.33), tol: 0.01, unit: 'nm',
        hints: [R`One reflection is phase-shifted, so constructive interference needs $2nt = (m + \tfrac12)\lambda$ with $m = 0$.`],
        solution: R`<p>$t = \dfrac{\lambda}{4n} = \dfrac{520}{4(1.33)} = 97.7\ \mathrm{nm}$.</p>` },
      { level: 'core', type: 'num', title: 'Seeing headlights',
        q: R`<p>Your pupil is $3.0\ \mathrm{mm}$ across. Using $\lambda = 550\ \mathrm{nm}$, what is the greatest distance at which you could resolve a car's two headlights, $1.5\ \mathrm m$ apart? Give the answer in kilometres.</p>`,
        answer: 1.5 / (1.22 * 550e-9 / 3e-3) / 1000, tol: 0.01, unit: 'km',
        hints: [R`$\theta_{\min} = 1.22\lambda/D$, and the headlights subtend $1.5/L$.`],
        solution: R`<p>$\theta_{\min} = 1.22(550\times10^{-9})/(3.0\times10^{-3}) = 2.24\times10^{-4}\ \mathrm{rad}$. $L = 1.5/\theta_{\min} = 6.7\ \mathrm{km}$. In practice, the atmosphere and the eye's imperfections make it shorter.</p>` },
      { level: 'core', type: 'num', title: 'Crossed polarisers',
        q: R`<p>Unpolarised light of intensity $100\ \mathrm{W/m^2}$ passes through a polariser and then an analyser at $30^\circ$ to it. What intensity emerges?</p>`,
        answer: 50 * Math.pow(Math.cos(Math.PI / 6), 2), tol: 0.01, unit: 'W/m²',
        hints: [R`The first polariser halves unpolarised light; then apply Malus's law.`],
        solution: R`<p>$I = 100 \times \tfrac12 \times \cos^2 30^\circ = 50 \times 0.75 = 37.5\ \mathrm{W/m^2}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Splitting the sodium doublet',
        q: R`<p>Sodium's yellow light is a doublet at $589.0\ \mathrm{nm}$ and $589.6\ \mathrm{nm}$. What is the minimum number of grating lines that must be illuminated to resolve the doublet in second order?</p>`,
        answer: 589.3 / (2 * 0.6), tol: 0.01, unit: 'lines',
        hints: [R`$\lambda/\Delta\lambda = Nm$; use the mean wavelength.`],
        solution: R`<p>$N = \dfrac{\lambda}{m\Delta\lambda} = \dfrac{589.3}{2(0.6)} = 491$, so about 491 lines (in practice, round up to 492). Even a cheap grating illuminated over a few millimetres does this easily.</p>` },
      { level: 'olympiad', type: 'num', title: 'Air wedge',
        q: R`<p>Two flat glass plates touch along one edge and are held apart by a hair $0.050\ \mathrm{mm}$ thick placed $10\ \mathrm{cm}$ from that edge. Viewed from above in $500\ \mathrm{nm}$ light, what is the spacing between dark fringes, in millimetres?</p>`,
        answer: 500e-9 * 0.1 / (2 * 5e-5) * 1000, tol: 0.01, unit: 'mm',
        hints: [R`The air gap at distance $x$ is $t = (h/L)x$.`, R`Adjacent dark fringes differ in gap by $\lambda/2$.`],
        solution: R`<p>Successive dark fringes occur when the gap grows by $\lambda/2$: $\Delta x = \dfrac{\lambda}{2}\dfrac{L}{h} = \dfrac{(500\times10^{-9})(0.10)}{2(5.0\times10^{-5})} = 0.50\ \mathrm{mm}$. Counting the 200 fringes measures the hair's thickness to a fraction of a micrometre.</p>` },
      { level: 'olympiad', type: 'num', title: 'Missing orders',
        q: R`<p>A double slit has slit separation $d$ equal to four times the slit width $a$. How many bright interference fringes appear within the central diffraction maximum?</p>`,
        answer: 7, tol: 0.001, unit: 'fringes',
        hints: [R`The central diffraction peak extends to $a\sin\theta = \lambda$, i.e. $d\sin\theta = 4\lambda$.`, R`The order $m = \pm4$ falls exactly on the diffraction minimum and is missing.`],
        solution: R`<p>The central envelope spans $|d\sin\theta| \lt 4\lambda$, which contains orders $m = 0, \pm1, \pm2, \pm3$. The $m = \pm4$ maxima coincide with the diffraction zeros and vanish. Total: 7 bright fringes. In general there are $2d/a - 1$ when $d/a$ is an integer.</p>` }
    ]
  });
})();
