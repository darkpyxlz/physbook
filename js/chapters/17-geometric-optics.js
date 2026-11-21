(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'geometric-optics', num: 17, part: 'Optics',
    title: 'Geometric Optics',
    subtitle: R`Light as rays: reflection, refraction, total internal reflection, mirrors, lenses and the optical instruments built from them, all unified by Fermat's principle.`,
    goals: ['Apply Snell’s law and find critical angles', 'Use the mirror and lens equations with signs', 'Draw principal-ray diagrams', 'Combine lenses into systems', 'Analyse magnifiers, microscopes and telescopes'],
    sections: [
      {
        title: 'Reflection and refraction',
        html: R`
<p>When light meets a boundary, the angle of reflection equals the angle of incidence (both measured from the normal). The transmitted ray bends according to <strong>Snell's law</strong>:</p>
<div class="key">$$n_1\sin\theta_1 = n_2\sin\theta_2,\qquad n = c/v.$$</div>
<p>Going into a denser medium (larger $n$), light bends toward the normal. Going out of one, it bends away, and beyond the <strong>critical angle</strong> $\sin\theta_c = n_2/n_1$ there is no transmitted ray at all: <strong>total internal reflection</strong>. Optical fibres and diamond sparkle rely on it.</p>
<p>The index of refraction depends slightly on wavelength (dispersion), so prisms and raindrops split white light into colours.</p>
<div class="insight"><p><strong>Fermat's principle:</strong> light travels between two points along the path that takes the least (strictly, stationary) time. The law of reflection and Snell's law both follow from minimising travel time. A lifeguard running along the beach and then swimming to a drowning person faces the same optimisation.</p></div>
<p>An object at depth $d$ under water viewed from directly above appears at depth $d/n$ (apparent depth), which is why pools look shallower than they are.</p>`
      },
      {
        title: 'Mirrors',
        html: R`
<p>A plane mirror forms a virtual, upright image the same size as the object and as far behind the mirror as the object is in front.</p>
<p>A spherical mirror of radius $R$ focuses parallel rays (near the axis) at the focal point, $f = R/2$. Concave mirrors converge light ($f \gt 0$); convex mirrors diverge it ($f \lt 0$). Object and image distances obey</p>
<div class="key">$$\frac{1}{d_o} + \frac{1}{d_i} = \frac1f,\qquad m = -\frac{d_i}{d_o}.$$</div>
<p>Use the "real is positive" convention: $d_i \gt 0$ for real images (in front of a mirror) and $d_i \lt 0$ for virtual ones. A negative magnification means the image is inverted.</p>
<p>Three principal rays locate any image: a ray parallel to the axis reflects through $F$; a ray through $F$ reflects parallel; a ray to the vertex reflects symmetrically about the axis.</p>`
      },
      {
        title: 'Thin lenses',
        html: R`
<p>A thin lens obeys the same equation as a mirror, with $d_i \gt 0$ for real images on the far side. Its focal length comes from the <strong>lensmaker's equation</strong>:</p>
<div class="key">$$\frac1f = (n - 1)\left(\frac1{R_1} - \frac1{R_2}\right),$$</div>
<p>where $R$ is positive for a surface whose centre of curvature lies on the outgoing side. Converging (convex) lenses have $f \gt 0$; diverging (concave) lenses have $f \lt 0$. Optometrists quote power in dioptres, $P = 1/f$ with $f$ in metres.</p>
<div class="table-wrap"><table><thead><tr><th>Converging lens, object at</th><th>Image</th></tr></thead><tbody>
<tr><td>Beyond $2f$</td><td>Real, inverted, reduced (camera)</td></tr>
<tr><td>Between $f$ and $2f$</td><td>Real, inverted, enlarged (projector)</td></tr>
<tr><td>Inside $f$</td><td>Virtual, upright, enlarged (magnifier)</td></tr>
</tbody></table></div>
<p>A diverging lens with a real object always makes a virtual, upright, reduced image.</p>
<p>For several lenses, the image formed by the first lens is the object for the next, and the total magnification is the product of the individual magnifications. Two thin lenses in contact have $1/f = 1/f_1 + 1/f_2$: powers add.</p>`
      },
      {
        title: 'Optical instruments',
        html: R`
<p>The eye's lens changes its focal length to focus on objects from the near point (about $25\ \mathrm{cm}$) to infinity. The apparent size of an object depends on the angle it subtends at the eye, so instruments are rated by <strong>angular magnification</strong>.</p>
<ul>
<li><strong>Magnifying glass:</strong> placing the object at the focal point gives $M = 25\ \mathrm{cm}/f$.</li>
<li><strong>Microscope:</strong> an objective forms an enlarged real image that the eyepiece magnifies further: $M \approx -\dfrac{L}{f_o}\cdot\dfrac{25\ \mathrm{cm}}{f_e}$, with $L$ the tube length.</li>
<li><strong>Telescope:</strong> the objective images a distant object at its focal point and the eyepiece views it: $M = -f_o/f_e$.</li>
</ul>
<p>Short-sightedness is corrected with diverging lenses, long-sightedness with converging ones.</p>`
      }
    ],
    labs: [
      { sim: 'lens', title: 'Ray diagram bench', desc: 'Principal rays through a lens or off a mirror. Dashed lines are virtual extensions; the orange arrow is the image.',
        tasks: ['With the converging lens, move the object from far away through 2f to inside f. Watch the image change from reduced to enlarged to virtual.', 'Put the object exactly at 2f. What is the magnification?', 'Try the diverging lens and the convex mirror. Can you ever make a real image with them?', 'Why do shop security mirrors use convex mirrors?'] },
      { sim: 'snell', title: 'Refraction and total internal reflection', desc: 'A ray hits the boundary between two media. Line thickness shows how the light splits between reflection and transmission (Fresnel equations).',
        tasks: ['With n₁ = 1.5 and n₂ = 1.0, increase θ₁ until the transmitted ray vanishes. Compare with the critical angle.', 'Swap the media so light enters the denser one. Is total internal reflection still possible?', 'At normal incidence from air into glass, what fraction is reflected? (Theory: 4%.)'] }
    ],
    formulas: [
      ['Snell’s law', R`n_1\sin\theta_1 = n_2\sin\theta_2`],
      ['Critical angle', R`\sin\theta_c = n_2/n_1`],
      ['Apparent depth', R`d' = d/n`],
      ['Mirror focal length', R`f = R/2`],
      ['Mirror and lens equation', R`1/d_o + 1/d_i = 1/f`],
      ['Magnification', R`m = -d_i/d_o`],
      ['Lensmaker’s equation', R`1/f = (n-1)(1/R_1 - 1/R_2)`],
      ['Lenses in contact', R`1/f = 1/f_1 + 1/f_2`],
      ['Magnifier', R`M = 25\ \mathrm{cm}/f`],
      ['Telescope', R`M = -f_o/f_e`],
      ['Prism minimum deviation', R`n = \frac{\sin[(A + D)/2]}{\sin(A/2)}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Leaving water',
        q: R`<p>Light travels from water toward the surface and meets it at an angle (from the normal) greater than the critical angle. What happens?</p>`,
        options: ['It refracts into the air, bending toward the normal', 'It refracts into the air, bending away from the normal', 'It is totally reflected back into the water', 'It travels along the surface forever'], answer: 2,
        hints: [R`Snell's law would require $\sin\theta_2 \gt 1$.`],
        solution: R`<p>Beyond the critical angle, no transmitted ray exists and all the light reflects. Looking up from underwater, you see the outside world squeezed into a circle (Snell's window) surrounded by reflections.</p>` },
      { level: 'concept', type: 'mcq', title: 'Plane mirror',
        q: R`<p>The image of an object in a plane mirror is:</p>`,
        options: ['Real, inverted, same size', 'Virtual, upright, same size', 'Virtual, inverted, smaller', 'Real, upright, larger'], answer: 1,
        hints: [R`Can the image be projected on a screen behind the mirror?`],
        solution: R`<p>Reflected rays only appear to come from behind the mirror, so the image is virtual. It is upright and the same size, though left–right reversed (really, front–back reversed).</p>` },
      { level: 'concept', type: 'mcq', title: 'Diverging lens',
        q: R`<p>A real object is placed anywhere in front of a diverging lens. The image is always:</p>`,
        options: ['Real, inverted and enlarged', 'Virtual, upright and reduced', 'Virtual, upright and enlarged', 'Real or virtual depending on the distance'], answer: 1,
        hints: [R`With $f \lt 0$ and $d_o \gt 0$, what sign does $d_i$ have? What size is $|m|$?`],
        solution: R`<p>$\dfrac1{d_i} = \dfrac1f - \dfrac1{d_o} \lt 0$, so the image is virtual, and $|d_i| \lt d_o$ gives $0 \lt m \lt 1$.</p>` },
      { level: 'core', type: 'num', title: 'Critical angle of glass',
        q: R`<p>What is the critical angle for light inside glass ($n = 1.52$) meeting a glass–air boundary?</p>`,
        answer: Math.asin(1 / 1.52) * 180 / Math.PI, tol: 0.005, unit: 'degrees',
        hints: [R`$\sin\theta_c = n_{\text{air}}/n_{\text{glass}}$.`],
        solution: R`<p>$\theta_c = \arcsin(1/1.52) = 41.1^\circ$. A $45^\circ$ prism therefore reflects light totally, which is how binoculars fold their light path.</p>` },
      { level: 'core', type: 'num', title: 'Projector lens',
        q: R`<p>An object is $30\ \mathrm{cm}$ in front of a converging lens of focal length $20\ \mathrm{cm}$. Where is the image, measured from the lens (in cm)?</p>`,
        answer: 60, tol: 0.01, unit: 'cm',
        hints: [R`$1/d_i = 1/f - 1/d_o$.`],
        solution: R`<p>$\dfrac1{d_i} = \dfrac1{20} - \dfrac1{30} = \dfrac1{60}$, so $d_i = 60\ \mathrm{cm}$ (real), with $m = -2$.</p>` },
      { level: 'core', type: 'num', title: 'Shaving mirror',
        q: R`<p>A concave mirror has radius of curvature $40\ \mathrm{cm}$. You hold your face $10\ \mathrm{cm}$ in front of it. What is the magnification?</p>`,
        answer: 2, tol: 0.01, unit: '',
        hints: [R`$f = 20\ \mathrm{cm}$. Expect a virtual image.`],
        solution: R`<p>$\dfrac1{d_i} = \dfrac1{20} - \dfrac1{10} = -\dfrac1{20}$, so $d_i = -20\ \mathrm{cm}$ (virtual) and $m = -d_i/d_o = +2$: upright and twice the size.</p>` },
      { level: 'core', type: 'num', title: 'Deceptive pool',
        q: R`<p>A swimming pool is $2.0\ \mathrm m$ deep. Looking straight down, how deep does it appear? ($n_{\text{water}} = 1.33$)</p>`,
        answer: 2 / 1.33, tol: 0.01, unit: 'm',
        hints: [R`For near-normal viewing, apparent depth $= d/n$.`],
        solution: R`<p>$2.0/1.33 = 1.50\ \mathrm m$.</p>` },
      { level: 'core', type: 'num', title: 'Making a lens',
        q: R`<p>A biconvex lens is made of glass with $n = 1.50$. Its surfaces have radii $R_1 = +20\ \mathrm{cm}$ and $R_2 = -30\ \mathrm{cm}$. What is its focal length in cm?</p>`,
        answer: 24, tol: 0.01, unit: 'cm',
        hints: [R`$1/f = (n - 1)(1/R_1 - 1/R_2)$.`],
        solution: R`<p>$\dfrac1f = 0.50\left(\dfrac1{20} + \dfrac1{30}\right) = 0.50 \times \dfrac{5}{60} = \dfrac1{24}$, so $f = 24\ \mathrm{cm}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Two-lens system',
        q: R`<p>Two converging lenses with focal lengths $10\ \mathrm{cm}$ and $15\ \mathrm{cm}$ are $40\ \mathrm{cm}$ apart. An object stands $15\ \mathrm{cm}$ in front of the first lens. What is the overall magnification of the final image? (Give the signed value.)</p>`,
        answer: -6, tol: 0.01, unit: '',
        hints: [R`Lens 1: $d_i = 30\ \mathrm{cm}$, so its image is $10\ \mathrm{cm}$ in front of lens 2.`, R`Multiply the two magnifications.`],
        solution: R`<p>Lens 1: $\dfrac1{d_i} = \dfrac1{10} - \dfrac1{15}$, $d_i = 30\ \mathrm{cm}$, $m_1 = -2$. This image is $40 - 30 = 10\ \mathrm{cm}$ in front of lens 2, inside its focal length. Lens 2: $\dfrac1{d_i} = \dfrac1{15} - \dfrac1{10} = -\dfrac1{30}$, so $d_i = -30\ \mathrm{cm}$ (virtual) and $m_2 = +3$. Total $m = (-2)(3) = -6$: inverted and six times larger.</p>` },
      { level: 'olympiad', type: 'num', title: 'Measuring a prism',
        q: R`<p>A glass prism with apex angle $60^\circ$ deviates a beam by a minimum of $38^\circ$. What is the refractive index of the glass?</p>`,
        answer: Math.sin(49 * Math.PI / 180) / Math.sin(30 * Math.PI / 180), tol: 0.005, unit: '',
        hints: [R`At minimum deviation the ray passes symmetrically through the prism, so it travels at $A/2$ to each internal normal.`],
        solution: R`<p>At minimum deviation, the internal angle is $A/2 = 30^\circ$ and the external angle is $(A + D)/2 = 49^\circ$. So $n = \sin49^\circ/\sin30^\circ = 1.51$. This symmetric configuration is the standard way to measure $n$ precisely.</p>` },
      { level: 'olympiad', type: 'num', title: 'Glass marble lens',
        q: R`<p>A solid glass sphere ($n = 1.50$) of radius $1.0\ \mathrm{cm}$ is used as a lens. Parallel rays near the axis enter it. How far from the centre of the sphere do they come to a focus?</p>`,
        answer: 1.5 * 1 / (2 * 0.5), tol: 0.01, unit: 'cm',
        hints: [R`Treat the sphere as two refracting surfaces. For one surface, $\dfrac{n_1}{s} + \dfrac{n_2}{s'} = \dfrac{n_2 - n_1}{R}$.`],
        solution: R`<p>First surface: $\dfrac{1.5}{s'} = \dfrac{0.5}{1}$, so the rays head for a point $3\ \mathrm{cm}$ beyond the first surface, i.e. $1\ \mathrm{cm}$ beyond the far surface (a virtual object at $s = -1$). Second surface ($R = -1$): $\dfrac{1.5}{-1} + \dfrac{1}{s'} = \dfrac{-0.5}{-1}$, so $s' = 0.5\ \mathrm{cm}$. The focus is $1.5\ \mathrm{cm}$ from the centre, matching $f = \dfrac{nR}{2(n-1)}$. Antique microscopes by van Leeuwenhoek used tiny glass spheres exactly like this.</p>` }
    ]
  });
})();
