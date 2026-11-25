/* Expanded text for physics 17–24: geometric optics, wave optics, relativity, quantum physics,
   nuclear physics, analytical mechanics, astrophysics, experimental physics. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('geometric-optics', {
    0: { html: R`<h3 class="sub">Snell's law, total internal reflection and dispersion</h3>
<p>Light travels at $c/n$ in a medium of refractive index $n$. At a boundary, $n_1\sin\theta_1 = n_2\sin\theta_2$. Going from a dense to a less dense medium, beyond the <strong>critical angle</strong> $\sin\theta_c = n_2/n_1$ no light is transmitted at all: <strong>total internal reflection</strong>.</p>
<div class="worked"><p>An optical fibre has a core of index 1.48 and cladding of 1.46. Find the critical angle, and the largest angle to the axis at which light entering from air stays trapped.</p>
<p>$\sin\theta_c = 1.46/1.48$, $\theta_c = 80.6°$. Inside, rays must travel within $9.4°$ of the axis; at entry, $\sin\theta_{\text{air}} = 1.48\sin9.4° = 0.242$, so $\theta_{\text{air}} = 14°$. That $0.242$ is the fibre's <strong>numerical aperture</strong>, $\sqrt{n_1^2 - n_2^2}$.</p></div>
<p>Refraction makes pools look shallower: viewed from straight above, apparent depth is real depth ÷ $n$ (about three-quarters for water). Because $n$ depends slightly on wavelength (<strong>dispersion</strong>; for glass, violet bends more than red), prisms split white light and rainbows form: sunlight refracts into raindrops, reflects inside once and leaves at about 42° from the antisolar point for red and 40° for violet.</p>
<p>Fermat's principle unifies these laws: light takes the path of least (strictly, stationary) time between two points. Snell's law follows by minimising travel time across the boundary, like a lifeguard running on sand then swimming.</p>` },
    1: { html: R`<h3 class="sub">Ray diagrams and the mirror equation</h3>
<p>A spherical mirror of radius $R$ has focal length $f = R/2$ (positive for concave). With the "real is positive" convention:</p>
<div class="key"><p>$\dfrac1u + \dfrac1v = \dfrac1f$, $\quad m = -\dfrac{v}{u}$</p></div>
<p>Three rays locate any image: a ray parallel to the axis reflects through the focus; a ray through the focus reflects parallel; a ray to the centre of curvature returns on itself.</p>
<div class="worked"><p>A concave shaving mirror has $f = 20$ cm. Where is the image of a face 15 cm away, and how big?</p>
<p>$1/v = 1/20 - 1/15 = -1/60$, so $v = -60$ cm: a virtual image 60 cm behind the mirror, upright and magnified $m = 60/15 = 4$ times.</p></div>
<p>Convex mirrors ($f &lt; 0$) always give small, upright, virtual images with a wide field of view, ideal for car wing mirrors ("objects in mirror are closer than they appear"). A plane mirror is the limit $f\to\infty$: the image is as far behind as the object is in front, and you need a mirror only half your height to see all of yourself, at any distance.</p>
<p>Spherical mirrors focus imperfectly (<strong>spherical aberration</strong>); parabolic mirrors bring parallel rays to an exact focus, which is why telescope mirrors and satellite dishes are parabolic.</p>` },
    2: { html: R`<h3 class="sub">Lens combinations and the lensmaker's equation</h3>
<p>A thin lens obeys the same equation as a mirror (with real images on the far side). Its focal length comes from its shape and material:</p>
<div class="key"><p>$\dfrac1f = (n - 1)\left(\dfrac1{R_1} - \dfrac1{R_2}\right)$</p></div>
<p>Lens <strong>power</strong> $P = 1/f$ is measured in dioptres (m⁻¹); thin lenses in contact add their powers.</p>
<div class="worked"><p>Two converging lenses of focal lengths 10 cm and 15 cm are 40 cm apart. An object is 15 cm in front of the first. Where is the final image?</p>
<p>First lens: $1/v = 1/10 - 1/15$, $v = 30$ cm, magnification $-2$. This image is 10 cm before the second lens: $1/v = 1/15 - 1/10 = -1/30$, so $v = -30$ cm, a virtual image 30 cm in front of the second lens, magnification $+3$. Overall $m = -6$: inverted and six times larger.</p></div>
<div class="worked"><p>A biconvex glass lens ($n = 1.5$) has both radii 20 cm. What is its focal length in air and in water ($n = 1.33$)?</p>
<p>Air: $1/f = 0.5\cdot(2/20)$, $f = 20$ cm. In water the relevant index is $1.5/1.33 = 1.128$: $1/f = 0.128\cdot0.1$, $f = 78$ cm. That is why everything is blurry when you open your eyes underwater: the cornea loses most of its power.</p></div>` },
    3: { html: R`<h3 class="sub">Eyes, magnifiers, microscopes and telescopes</h3>
<p>The eye focuses mainly with the cornea; the lens fine-tunes (<strong>accommodation</strong>) to focus from the near point (about 25 cm in young adults) to infinity. Short sight (the eyeball too long) is corrected with diverging lenses; long sight and the age-related loss of accommodation (presbyopia) with converging lenses.</p>
<div class="worked"><p>A short-sighted person cannot focus beyond 50 cm. What lens power do they need?</p>
<p>The lens must form an image of a distant object at 50 cm in front: $f = -50$ cm, power $-2$ D.</p></div>
<p>Instruments increase the <em>angle</em> an object subtends. A magnifying glass of focal length $f$ gives angular magnification about $25\ \text{cm}/f$. A compound microscope multiplies the objective's linear magnification by the eyepiece's angular magnification. A refracting telescope focused at infinity has angular magnification $M = f_o/f_e$ and length $f_o + f_e$.</p>
<div class="worked"><p>A telescope has an objective of focal length 1.2 m and an eyepiece of 25 mm. What is its magnification, and how large does the Moon (0.52° across) appear?</p>
<p>$M = 1200/25 = 48$; the Moon appears $25°$ across. But magnification is not everything: the objective's diameter sets how much light is gathered and how fine the detail (next chapter).</p></div>` }
  });

  X('wave-optics', {
    0: { html: R`<h3 class="sub">Fringe spacing, coherence and path differences</h3>
<p>Two coherent sources a distance $d$ apart produce bright fringes where the path difference is a whole number of wavelengths, $d\sin\theta = m\lambda$. On a screen at distance $D \gg d$, fringes are equally spaced by</p>
<div class="key"><p>$\Delta y = \dfrac{\lambda D}{d}$</p></div>
<div class="worked"><p>Red light (650 nm) through slits 0.25 mm apart onto a screen 2 m away: find the fringe spacing. What changes if the apparatus is submerged in water?</p>
<p>$650\times10^{-9}\cdot2/2.5\times10^{-4} = 5.2$ mm. In water the wavelength becomes $\lambda/n = 489$ nm, so the spacing shrinks to 3.9 mm.</p></div>
<p>Interference needs <strong>coherent</strong> sources (a fixed phase relationship): Young used one pinhole to illuminate both slits. Ordinary light has a short coherence length (a few micrometres for sunlight), so white-light fringes show only a few coloured bands around a white central one. Lasers are coherent over metres or more.</p>
<p>Young's 1801 experiment was strong evidence that light is a wave. Done one photon at a time, the pattern still builds up, dot by dot, which is the central puzzle of quantum mechanics.</p>` },
    1: { html: R`<h3 class="sub">Soap films, coatings and Newton's rings</h3>
<p>Light reflected from the top and bottom of a thin film interferes. Two rules: the extra path in the film is $2nt$ (at normal incidence), and reflection from a higher-index medium adds a half-wavelength phase shift. Count the shifts, then compare.</p>
<div class="worked"><p>What is the thinnest anti-reflection coating of MgF<sub>2</sub> ($n = 1.38$) on glass ($n = 1.52$) for 550 nm light?</p>
<p>Both reflections (air→MgF<sub>2</sub> and MgF<sub>2</sub>→glass) are from higher index, so both shift: they cancel. Destructive interference needs $2nt = \lambda/2$, so $t = 550/(4\cdot1.38) = 100$ nm, a "quarter-wave" layer. Camera lenses look purple because the coating cancels green best and reflects some red and blue.</p></div>
<div class="worked"><p>A soap film ($n = 1.33$) in air looks black at the top just before it bursts. Why?</p>
<p>Only the top reflection has a phase shift. As the thickness tends to zero, the path difference vanishes, so the reflections cancel exactly: films thinner than about 20 nm reflect nothing.</p></div>
<p><strong>Newton's rings</strong> form in the air gap between a curved lens and a flat plate: dark rings at radii $r_m = \sqrt{m\lambda R}$. They test lens shapes to a fraction of a wavelength. Interferometers (Michelson's, and LIGO's 4 km arms that detected gravitational waves in 2015) use the same principle to measure lengths to tiny fractions of a wavelength.</p>` },
    2: { html: R`<h3 class="sub">Single-slit pattern and the Rayleigh criterion</h3>
<p>Light through a slit of width $a$ spreads: the central maximum is twice as wide as the others, with minima at $a\sin\theta = m\lambda$ ($m = \pm1, \pm2, \dots$). The narrower the slit, the wider the spread. For a circular aperture of diameter $D$ the first dark ring is at $\sin\theta = 1.22\lambda/D$.</p>
<div class="worked"><p>Can the eye (pupil 3 mm) separate a car's headlights (1.5 m apart) 5 km away? What about a 10 cm telescope?</p>
<p>Eye: $\theta_{\min} = 1.22\cdot550\times10^{-9}/0.003 = 2.2\times10^{-4}$ rad; the headlights subtend $1.5/5000 = 3\times10^{-4}$ rad, so just yes. Telescope: $6.7\times10^{-6}$ rad, resolving lights 3.4 cm apart at that range.</p></div>
<p>The <strong>Rayleigh criterion</strong> (two points are just resolved when the centre of one pattern falls on the first minimum of the other) limits all imaging: microscopes cannot see detail much below half a wavelength, which is why electron microscopes and shorter wavelengths are used for viruses and atoms. Radio astronomers link dishes across continents (the Event Horizon Telescope, an Earth-sized aperture) to image the shadow of a black hole.</p>
<p>Diffraction also explains why you can hear around corners but not see around them: sound's wavelength (about 1 m) is comparable to doorways, light's is a million times smaller.</p>` },
    3: { html: R`<h3 class="sub">Gratings and spectroscopy</h3>
<p>A grating with many slits a distance $d$ apart gives very sharp, bright maxima at $d\sin\theta = m\lambda$. More slits make the peaks narrower: the <strong>resolving power</strong> is $\lambda/\Delta\lambda = mN$ for $N$ illuminated slits in order $m$.</p>
<div class="worked"><p>A grating has 600 lines per mm. At what angles does 589 nm sodium light appear, and how many orders are visible? Can it separate the sodium doublet (589.0 and 589.6 nm) if 2 cm of the grating is lit?</p>
<p>$d = 1.667$ μm. $\sin\theta = 0.353m$: $\theta = 20.7°$, $45.0°$; the third order would need $\sin\theta = 1.06$, impossible, so 2 orders each side. Resolving power needed: $589/0.6 \approx 1000$. Lit lines: 12 000, so even the first order ($mN = 12\,000$) separates them easily.</p></div>
<p>Spectroscopy reads the universe: every element has its own line pattern. Helium was discovered in the Sun's spectrum (1868) before it was found on Earth. Spectra reveal stars' compositions, temperatures, motions (Doppler shifts) and magnetic fields.</p>
<p>X-ray diffraction uses the regular rows of atoms in crystals as a grating: <strong>Bragg's law</strong> $2d\sin\theta = n\lambda$ gives atomic spacings, and revealed the structures of salt, DNA and proteins.</p>` },
    4: { html: R`<h3 class="sub">Polarisers, Brewster's angle and everyday uses</h3>
<p>Light is a transverse wave; its electric field direction defines the <strong>polarisation</strong>. A polariser transmits only one direction: unpolarised light loses half its intensity, and polarised light at angle $\theta$ to the polariser axis is reduced by <strong>Malus's law</strong> $I = I_0\cos^2\theta$.</p>
<div class="worked"><p>Two polarisers are crossed, so no light passes. A third is inserted between them at 45°. What fraction of unpolarised light now passes?</p>
<p>$\tfrac12\cdot\cos^245°\cdot\cos^245° = \tfrac18$. Adding a filter lets more light through, a clear sign that polarisers re-project the field rather than just "blocking".</p></div>
<p>Reflection polarises light: at <strong>Brewster's angle</strong> $\tan\theta_B = n_2/n_1$ (53° for water) the reflected light is completely polarised parallel to the surface. Polarised sunglasses, with vertical transmission axes, cut glare from water and roads.</p>
<p>Other uses: LCD screens (liquid crystals rotate polarisation between crossed polarisers, switching pixels); stress analysis (strained plastic rotates polarisation, showing coloured stress patterns); 3D cinema glasses; and bees navigate by the polarisation pattern of the blue sky, which comes from scattering.</p>` }
  });

  X('relativity', {
    0: { html: R`<h3 class="sub">Why the postulates were needed</h3>
<p>Maxwell's equations predict light at speed $c$, but relative to what? Physicists assumed a medium, the aether, and expected Earth's motion through it to change the measured speed of light by about $10^{-4}$. Michelson and Morley (1887) looked for that change with an interferometer sensitive enough to see it, and found nothing.</p>
<p>Einstein's 1905 resolution took two postulates:</p>
<ol><li>The laws of physics are the same in all inertial frames.</li>
<li>The speed of light in vacuum is the same for all inertial observers.</li></ol>
<p>Together they force space and time to depend on the observer.</p>
<div class="worked"><p>A light clock is a pulse bouncing between two mirrors a distance $L$ apart. Seen from a frame where the clock moves at $v$, the pulse travels diagonally. Derive time dilation.</p>
<p>In the clock's frame a tick takes $\tau = 2L/c$. In the other frame the pulse goes along a longer zigzag, still at $c$: $(ct/2)^2 = L^2 + (vt/2)^2$, giving $t = \dfrac{2L/c}{\sqrt{1 - v^2/c^2}} = \gamma\tau$.</p></div>
<p><strong>Simultaneity</strong> is relative: two events simultaneous in one frame are not in another moving along the line joining them. This is the key to every "paradox": always ask in whose frame two events are simultaneous.</p>` },
    1: { html: R`<h3 class="sub">Muons, GPS and the twins</h3>
<p>With $\gamma = 1/\sqrt{1 - v^2/c^2}$, a moving clock runs slow by $\gamma$ and a moving rod is shortened by $\gamma$ along its motion. The <strong>proper time</strong> is measured by a clock present at both events; the <strong>proper length</strong> in the object's own rest frame.</p>
<div class="worked"><p>Muons made 15 km up move at $0.995c$; their half-life at rest is 1.56 μs. What fraction reach the ground, without and with relativity?</p>
<p>Travel time $15\,000/(0.995\cdot3\times10^8) = 50.3$ μs = 32 half-lives: $2^{-32} \approx 2\times10^{-10}$. With $\gamma = 10$, only 3.2 half-lives pass in the muon's frame: $2^{-3.2} = 11\%$, as observed. In the muon's frame, the atmosphere is contracted to 1.5 km instead.</p></div>
<p>GPS satellites (at 3.9 km s⁻¹, 20 000 km up) need two corrections: special relativity slows their clocks by about 7 μs per day; weaker gravity speeds them by about 45 μs per day (general relativity). Uncorrected, the net 38 μs per day would make positions drift by about 11 km a day.</p>
<p>The <strong>twin paradox</strong>: the travelling twin returns younger. There is no contradiction because the situation is not symmetric: the traveller changes inertial frame at the turnaround, which shifts which events count as "simultaneous" at home.</p>` },
    2: { html: R`<h3 class="sub">Velocity addition and the invariant interval</h3>
<p>Velocities do not simply add. A body moving at $u'$ in a frame that moves at $v$ has speed</p>
<div class="key"><p>$u = \dfrac{u' + v}{1 + u'v/c^2}$</p></div>
<div class="worked"><p>A spaceship at $0.8c$ fires a probe forward at $0.8c$ relative to itself. How fast is the probe in the original frame? What about a light pulse?</p>
<p>$1.6c/1.64 = 0.976c$. For light, $u' = c$: $(c + v)/(1 + v/c) = c$, as the second postulate demands.</p></div>
<p>All observers agree on the <strong>spacetime interval</strong> $s^2 = (c\Delta t)^2 - \Delta x^2$, as all observers in ordinary space agree on distances. It classifies event pairs: <strong>timelike</strong> ($s^2 &gt; 0$, one can cause the other), <strong>lightlike</strong> ($s^2 = 0$), or <strong>spacelike</strong> ($s^2 &lt; 0$: no signal can connect them, and different observers disagree about their order).</p>
<p>On a spacetime diagram (time up, space across, light rays at 45°), a moving observer's time and space axes tilt symmetrically towards the light line. Causality survives because the order of timelike-separated events is the same for everyone.</p>` },
    3: { html: R`<h3 class="sub">$E = mc^2$ in practice</h3>
<p>Relativistic momentum is $p = \gamma mv$ and total energy $E = \gamma mc^2$, related by</p>
<div class="key"><p>$E^2 = (pc)^2 + (mc^2)^2$, kinetic energy $K = (\gamma - 1)mc^2$</p></div>
<p>A massless particle (a photon) has $E = pc$. For $v \ll c$, $K \approx \tfrac12mv^2$, recovering Newton.</p>
<div class="worked"><p>An electron is accelerated through 1 MV. Find its total energy, $\gamma$, speed and momentum. ($m_ec^2 = 0.511$ MeV)</p>
<p>$E = 1.511$ MeV, $\gamma = 2.96$, $v = c\sqrt{1 - 1/\gamma^2} = 0.941c$, and $pc = \sqrt{1.511^2 - 0.511^2} = 1.422$ MeV. (The classical formula would give $v = 1.98c$.)</p></div>
<div class="worked"><p>The Sun radiates $3.8\times10^{26}$ W. How much mass does it lose per second?</p>
<p>$\Delta m = P/c^2 = 4.2\times10^9$ kg s⁻¹: over four million tonnes a second, yet only 0.07% of its mass over its whole 10-billion-year life.</p></div>
<p>Mass is not separately conserved: in a nuclear reaction or a chemical one, mass changes by $\Delta E/c^2$ (immeasurably small for chemistry: burning 1 kg of coal loses about 0.3 μg).</p>` }
  });

  X('quantum', {
    0: { html: R`<h3 class="sub">The photoelectric effect and photon momentum</h3>
<p>Light ejects electrons from a metal only above a threshold frequency, however bright; the electrons' maximum energy depends on frequency, not intensity; and emission is instant even in dim light. Einstein (1905) explained all three with photons of energy $E = hf$:</p>
<div class="key"><p>$K_{\max} = hf - \phi$ ($\phi$: the work function)</p></div>
<div class="worked"><p>Light of 250 nm falls on zinc ($\phi = 4.3$ eV). Find the maximum kinetic energy and the stopping potential.</p>
<p>$hc/\lambda = 1240\ \text{eV nm}/250\ \text{nm} = 4.96$ eV, so $K_{\max} = 0.66$ eV and the stopping potential is 0.66 V. Visible light (under 3.1 eV) cannot eject electrons from zinc at all.</p></div>
<p>Photons also carry momentum $p = h/\lambda$. <strong>Compton scattering</strong> (1923) showed it directly: X-rays bouncing off electrons lose energy, lengthening by $\Delta\lambda = \dfrac{h}{m_ec}(1 - \cos\theta)$, exactly as for a billiard-ball collision between a photon and an electron. ($h/m_ec = 2.43$ pm.)</p>
<p>A 1 mW laser pointer at 650 nm emits $10^{-3}/(3.06\times10^{-19}) = 3.3\times10^{15}$ photons per second: so many that light seems continuous.</p>` },
    1: { html: R`<h3 class="sub">De Broglie wavelengths and the uncertainty principle</h3>
<p>Every particle has a wavelength $\lambda = h/p$. For an electron accelerated through voltage $V$ (non-relativistically), $\lambda = h/\sqrt{2meV}$, which is about $1.23/\sqrt{V}$ nm.</p>
<div class="worked"><p>Find the wavelengths of an electron accelerated through 100 V and of a 0.15 kg cricket ball at 40 m s⁻¹.</p>
<p>Electron: 0.123 nm, similar to atomic spacings, so crystals diffract electrons (Davisson and Germer, 1927). Ball: $6.6\times10^{-34}/6 = 1.1\times10^{-34}$ m, absurdly small: quantum effects are invisible for everyday objects.</p></div>
<p>Heisenberg's <strong>uncertainty principle</strong>, $\Delta x\Delta p \ge \hbar/2$, follows from wave nature: a wave confined to a small region must contain a spread of wavelengths, hence momenta. It is not a limitation of instruments.</p>
<div class="worked"><p>Estimate the minimum kinetic energy of an electron confined to an atom ($\Delta x \approx 0.1$ nm).</p>
<p>$p \approx \hbar/\Delta x = 1.05\times10^{-24}$ kg m s⁻¹, $K = p^2/2m \approx 6\times10^{-19}$ J ≈ 4 eV: the right order for atomic energies. Confinement costs energy, which is why atoms do not collapse: the electron cannot sit on the nucleus.</p></div>` },
    2: { html: R`<h3 class="sub">Energy levels and spectral series</h3>
<p>Bohr's model gives hydrogen's levels as $E_n = -\dfrac{13.6\ \text{eV}}{n^2}$. A photon emitted in a jump from $n_i$ to $n_f$ has $\dfrac1\lambda = R_\infty\left(\dfrac1{n_f^2} - \dfrac1{n_i^2}\right)$ with $R_\infty = 1.097\times10^7$ m⁻¹.</p>
<div class="worked"><p>Find the wavelength of the red H-α line ($3\to2$) and the shortest wavelength in the Lyman series.</p>
<p>H-α: $1/\lambda = 1.097\times10^7(1/4 - 1/9) = 1.524\times10^6$, so $\lambda = 656$ nm. Lyman limit ($\infty\to1$): $1/R_\infty = 91.2$ nm, in the ultraviolet.</p></div>
<p>The series are named for their lower level: Lyman ($n_f = 1$, ultraviolet), Balmer (2, visible), Paschen (3, infrared). For a one-electron ion of nuclear charge $Z$ the energies scale as $Z^2$: He⁺ needs 54.4 eV to ionise.</p>
<p>Bohr's quantisation of angular momentum ($L = n\hbar$) has a wave interpretation: a whole number of de Broglie wavelengths must fit around the orbit. The full quantum picture replaces orbits with orbitals but keeps the same energies for hydrogen. Precise spectroscopy shows tiny splittings (fine structure, the Lamb shift) that tested relativistic quantum theory to 12 significant figures.</p>` },
    3: { html: R`<h3 class="sub">Wavefunctions, boxes and tunnelling</h3>
<p>The wavefunction $\psi(x)$ carries all information about a particle; $|\psi|^2$ is the probability density for finding it. In a box of width $L$ with impenetrable walls, standing waves must fit: $\lambda = 2L/n$, giving</p>
<div class="key"><p>$E_n = \dfrac{n^2h^2}{8mL^2}$, $\quad\psi_n = \sqrt{\dfrac2L}\sin\dfrac{n\pi x}{L}$</p></div>
<div class="worked"><p>A dye molecule has a conjugated chain about 1.0 nm long, with electrons filling levels up to $n = 3$. What wavelength does it absorb (exciting $3\to4$)?</p>
<p>$\Delta E = (16 - 9)\dfrac{h^2}{8mL^2} = 7\cdot6.0\times10^{-20}$ J $= 4.2\times10^{-19}$ J, so $\lambda = hc/\Delta E = 470$ nm: blue light is absorbed and the dye looks orange. Longer chains absorb longer wavelengths, which is how chemists tune dye colours.</p></div>
<p>The lowest energy is never zero (zero-point energy), and states with $n &gt; 1$ have nodes where the particle is never found. If the walls are finite, $\psi$ leaks into them, decaying exponentially, and a particle can <strong>tunnel</strong> through a thin barrier it classically could not cross. Tunnelling explains alpha decay, makes fusion possible in the Sun at its "too cold" core temperature, and is used by scanning tunnelling microscopes to image single atoms.</p>` }
  });

  X('nuclear', {
    0: { html: R`<h3 class="sub">Size, density and nuclear notation</h3>
<p>A nucleus $^A_Z\mathrm X$ has $Z$ protons and $A - Z$ neutrons. <strong>Isotopes</strong> share $Z$ but differ in $A$. Rutherford's alpha scattering (1911) showed the nucleus is tiny: its radius is about $R = 1.2A^{1/3}$ fm (1 fm $= 10^{-15}$ m).</p>
<div class="worked"><p>Find the radius and density of a gold-197 nucleus.</p>
<p>$R = 1.2\cdot197^{1/3} = 7.0$ fm. Mass $197\cdot1.66\times10^{-27}$ kg in volume $\tfrac43\pi(7.0\times10^{-15})^3$: density $2.3\times10^{17}$ kg m⁻³, the same for all nuclei since $R^3 \propto A$. A teaspoon of nuclear matter would weigh a billion tonnes: neutron stars are made of it.</p></div>
<div class="worked"><p>How close does a 5 MeV alpha particle get to a gold nucleus head-on?</p>
<p>All kinetic energy becomes potential: $d = \dfrac{k\cdot2\cdot79e^2}{5\ \text{MeV}} = \dfrac{1.44\ \text{MeV fm}\cdot158}{5\ \text{MeV}} = 45$ fm. That is well outside the nucleus, so the alpha feels only electric repulsion, which is why Rutherford's formula worked.</p></div>
<p>The <strong>strong nuclear force</strong> holds nucleons together against proton repulsion; it is very strong but acts only over about 2 fm. Heavier nuclei need more neutrons than protons to stay stable, because the strong force between neighbours cannot keep up with the long-range repulsion of all the protons.</p>` },
    1: { html: R`<h3 class="sub">The binding energy curve</h3>
<p>A nucleus weighs less than its separate nucleons. The <strong>mass defect</strong> times $c^2$ is the binding energy (1 u $= 931.5$ MeV/$c^2$).</p>
<div class="worked"><p>Helium-4 has atomic mass 4.002603 u; hydrogen-1 is 1.007825 u and a neutron 1.008665 u. Find the binding energy per nucleon.</p>
<p>Defect $2(1.007825) + 2(1.008665) - 4.002603 = 0.030377$ u, so the binding energy is 28.3 MeV: 7.07 MeV per nucleon. (Using atomic masses with hydrogen atoms makes the electrons cancel.)</p></div>
<p>Binding energy per nucleon rises steeply for light nuclei, peaks near iron and nickel (about 8.8 MeV), then falls slowly. So energy is released by <strong>fusing</strong> light nuclei and by <strong>splitting</strong> heavy ones. The curve's shape follows from the semi-empirical (liquid-drop) model: a volume term (each nucleon bonds to its neighbours), minus a surface term (surface nucleons have fewer neighbours, important for small nuclei), minus Coulomb repulsion (growing as $Z^2/A^{1/3}$, important for large ones), plus corrections for neutron–proton balance and pairing.</p>
<p>Nuclear energies are about a million times chemical ones: MeV against eV. One kilogram of uranium-235 fully fissioned releases about $8\times10^{13}$ J, as much as burning about 3000 tonnes of coal.</p>` },
    2: { html: R`<h3 class="sub">Decay modes, half-lives and dating</h3>
<ul><li><strong>Alpha</strong>: a heavy nucleus emits $^4_2$He ($A - 4$, $Z - 2$); stopped by paper, dangerous if swallowed or inhaled.</li>
<li><strong>Beta-minus</strong>: a neutron becomes a proton, emitting an electron and an antineutrino ($Z + 1$); stopped by a few mm of aluminium. The electrons have a spread of energies, which led Pauli to predict the neutrino in 1930.</li>
<li><strong>Beta-plus</strong>: a proton becomes a neutron, emitting a positron ($Z - 1$): used in PET scans.</li>
<li><strong>Gamma</strong>: an excited nucleus drops to a lower state, emitting a photon; needs lead or thick concrete to absorb.</li></ul>
<p>Decay is random: $N = N_0e^{-\lambda t}$, half-life $t_{1/2} = \ln2/\lambda$, activity $A = \lambda N$ (in becquerels).</p>
<div class="worked"><p>Wood from an ancient tomb has a carbon-14 activity of 9.6 counts per minute per gram of carbon; living wood gives 15.3. How old is it ($t_{1/2} = 5730$ years)?</p>
<p>$t = \dfrac{t_{1/2}}{\ln2}\ln\dfrac{15.3}{9.6} = 8267\cdot0.466 = 3850$ years.</p></div>
<p>Other clocks: potassium-40 to argon (1.25 billion years) dates volcanic rocks; uranium-238 to lead (4.5 billion years) gave the age of the Earth, 4.54 billion years.</p>` },
    3: { html: R`<h3 class="sub">Chain reactions and the solar furnace</h3>
<p>A slow neutron absorbed by uranium-235 makes it split into two medium nuclei plus 2–3 neutrons and about 200 MeV. If on average at least one neutron causes another fission, a <strong>chain reaction</strong> runs. In a reactor, a <strong>moderator</strong> (water or graphite) slows neutrons so they are captured efficiently; <strong>control rods</strong> (boron, cadmium) absorb neutrons to hold the multiplication factor at exactly 1. Natural uranium is only 0.7% U-235; most reactors use fuel enriched to 3–5%.</p>
<div class="worked"><p>A 1 GW (electrical) reactor runs at 33% efficiency. How much U-235 does it fission per day?</p>
<p>Thermal power 3 GW: $2.6\times10^{14}$ J per day. Each fission gives $200\cdot1.6\times10^{-13} = 3.2\times10^{-11}$ J: $8.1\times10^{24}$ fissions $= 13.4$ mol $\approx 3.2$ kg per day.</p></div>
<p><strong>Fusion</strong> joins light nuclei. In the Sun's core (15 million K) the proton–proton chain turns four protons into helium-4, releasing 26.7 MeV. Protons repel strongly, so even at that temperature fusion relies on quantum tunnelling, and a given proton waits billions of years on average: that slowness is why the Sun lasts 10 billion years. Fusion reactors on Earth (such as ITER) use deuterium and tritium, which fuse more easily, at over 100 million K.</p>` },
    4: { html: R`<h3 class="sub">The Standard Model in brief</h3>
<p>Matter is built from two families of fundamental <strong>fermions</strong>. <strong>Quarks</strong> (up, down, charm, strange, top, bottom) have charges $+\tfrac23$ or $-\tfrac13$ and are always confined in groups: a proton is uud (charge +1), a neutron udd (0); mesons are quark–antiquark pairs. <strong>Leptons</strong> (electron, muon, tau and their three neutrinos) are not confined. Every particle has an antiparticle.</p>
<p>Forces are carried by <strong>bosons</strong>: photons (electromagnetism), gluons (strong force), W and Z bosons (weak force, responsible for beta decay). The Higgs boson, found at CERN in 2012, is linked to the field that gives W, Z, quarks and leptons their masses.</p>
<div class="worked"><p>In beta-minus decay, what happens at the quark level? Check charge conservation.</p>
<p>A down quark becomes an up quark, emitting a W⁻ that decays into an electron and an antineutrino: $-\tfrac13 = +\tfrac23 + (-1) + 0$. Charge, baryon number and lepton number are all conserved.</p></div>
<p>The Standard Model is the most precisely tested theory in science, yet incomplete: it leaves out gravity and explains neither dark matter nor why the universe contains more matter than antimatter.</p>` }
  });

  X('analytical', {
    0: { html: R`<h3 class="sub">Orbits from the effective potential</h3>
<p>For a particle in a central potential $U(r)$, angular momentum $L = mr^2\dot\theta$ is conserved, so the radial motion behaves like one-dimensional motion in an <strong>effective potential</strong>:</p>
<div class="key"><p>$U_{\text{eff}}(r) = U(r) + \dfrac{L^2}{2mr^2}$</p></div>
<p>The second term, the "centrifugal barrier", keeps a particle with angular momentum away from the centre. Circular orbits sit at minima of $U_{\text{eff}}$; bound orbits oscillate between two turning points.</p>
<div class="worked"><p>For gravity, $U = -k/r$. Find the radius of the circular orbit and the frequency of small radial oscillations about it.</p>
<p>$U_{\text{eff}}' = k/r^2 - L^2/(mr^3) = 0$ gives $r_0 = L^2/(mk)$. Then $U_{\text{eff}}''(r_0) = -2k/r_0^3 + 3L^2/(mr_0^4) = k/r_0^3$, so $\omega_r = \sqrt{k/(mr_0^3)}$, exactly the orbital angular frequency. One radial oscillation per orbit means the orbit closes: an ellipse.</p></div>
<p>For most other force laws the two frequencies differ and orbits do not close; they precess. Bertrand's theorem says only the inverse-square and linear (spring) forces give closed orbits for all bound states. Mercury's slight precession, beyond what other planets cause, signalled that gravity is not exactly inverse-square: general relativity.</p>` },
    1: { html: R`<h3 class="sub">Lagrange's equations, worked</h3>
<p>Write the Lagrangian $\mathcal L = T - V$ in any convenient coordinates $q$ (lengths, angles), then for each coordinate</p>
<div class="key"><p>$\dfrac{d}{dt}\dfrac{\partial\mathcal L}{\partial\dot q} = \dfrac{\partial\mathcal L}{\partial q}$</p></div>
<p>Constraint forces (tensions, normal forces) never appear, which is the method's great advantage.</p>
<div class="worked"><p>A bead slides on a frictionless wire bent into a circle of radius $R$ that spins about its vertical diameter at a fixed $\omega$. Find the equation of motion.</p>
<p>With $\theta$ measured from the bottom: $T = \tfrac12m(R^2\dot\theta^2 + \omega^2R^2\sin^2\theta)$, $V = -mgR\cos\theta$. Lagrange: $mR^2\ddot\theta = m\omega^2R^2\sin\theta\cos\theta - mgR\sin\theta$. The equilibria match the rotating-frame result in the toolkit chapter, with no fictitious forces needed.</p></div>
<div class="worked"><p>An Atwood machine with a pulley of moment of inertia $I$ and radius $r$: find the acceleration.</p>
<p>One coordinate $x$: $\mathcal L = \tfrac12(m_1 + m_2 + I/r^2)\dot x^2 + (m_1 - m_2)gx$, giving $\ddot x = \dfrac{(m_1 - m_2)g}{m_1 + m_2 + I/r^2}$ in two lines.</p></div>` },
    2: { html: R`<h3 class="sub">Cyclic coordinates and Noether's theorem</h3>
<p>If $\mathcal L$ does not depend on a coordinate $q$ (it is <strong>cyclic</strong>), Lagrange's equation says $\dfrac{d}{dt}\dfrac{\partial\mathcal L}{\partial\dot q} = 0$: the <strong>generalised momentum</strong> $p_q = \partial\mathcal L/\partial\dot q$ is conserved.</p>
<div class="worked"><p>A particle moves in a plane in a central potential. Which momentum is conserved?</p>
<p>$\mathcal L = \tfrac12m(\dot r^2 + r^2\dot\theta^2) - U(r)$ does not contain $\theta$, so $p_\theta = mr^2\dot\theta$, the angular momentum, is constant.</p></div>
<p>Emmy Noether (1918) showed the general principle: every continuous symmetry of a system gives a conserved quantity.</p>
<ul><li>Symmetry under shifts in space → conservation of linear momentum.</li>
<li>Under rotations → angular momentum.</li>
<li>Under shifts in time (the laws do not change from day to day) → energy.</li></ul>
<p>When $\mathcal L$ has no explicit time dependence, the quantity $H = \sum p_q\dot q - \mathcal L$ (the <strong>Hamiltonian</strong>) is conserved; for ordinary systems it equals $T + V$. Conservation laws are thus not separate facts but consequences of symmetry, a viewpoint central to modern particle physics.</p>` },
    3: { html: R`<h3 class="sub">A double pendulum's normal modes</h3>
<p>For small oscillations, expand $\mathcal L$ to second order: $\mathcal L = \tfrac12\dot{\mathbf q}^TM\dot{\mathbf q} - \tfrac12\mathbf q^TK\mathbf q$. Try $\mathbf q = \mathbf a\cos\omega t$: the modes solve $\det(K - \omega^2M) = 0$.</p>
<div class="worked"><p>A double pendulum has equal masses $m$ and equal lengths $l$. Find its normal-mode frequencies.</p>
<p>To second order, $T = \tfrac12ml^2(2\dot\theta_1^2 + 2\dot\theta_1\dot\theta_2 + \dot\theta_2^2)$ and $V = \tfrac12mgl(2\theta_1^2 + \theta_2^2)$. With $\omega_0^2 = g/l$, the determinant condition is $(2\omega_0^2 - 2\omega^2)(\omega_0^2 - \omega^2) - \omega^4 = 0$, i.e. $\omega^4 - 4\omega_0^2\omega^2 + 2\omega_0^4 = 0$, giving $\omega^2 = (2 \mp \sqrt2)\omega_0^2$: $\omega = 0.765\,\omega_0$ (both rods swing the same way, the lower one through $\sqrt2$ times the angle of the upper) and $1.848\,\omega_0$ (opposite ways).</p></div>
<p>Normal-mode analysis works for any system near a stable equilibrium: molecules (CO<sub>2</sub> has a symmetric stretch, an antisymmetric stretch and two bending modes), bridges and buildings (engineers check that earthquake and wind frequencies avoid their modes), and crystals, where the modes become sound waves.</p>` },
    4: { html: R`<h3 class="sub">Phase space, sensitivity and the logistic map</h3>
<p>The state of a system can be drawn as a point in <strong>phase space</strong> (position and momentum axes). A simple pendulum traces closed loops (oscillation) inside a boundary curve, the <strong>separatrix</strong>, and wavy lines outside it (full rotation). Damped systems spiral into <strong>attractors</strong>.</p>
<p><strong>Chaos</strong> is deterministic motion that is extremely sensitive to initial conditions: nearby trajectories separate exponentially, as $e^{\lambda t}$ (with $\lambda$ the Lyapunov exponent). Long-term prediction becomes impossible because no measurement is exact. Weather forecasts lose skill after about ten days for this reason (Lorenz's "butterfly effect", 1963). Chaos needs at least three dimensions in phase space for continuous motion: a driven pendulum or a double pendulum can be chaotic; a simple pendulum cannot.</p>
<div class="worked"><p>The logistic map $x_{n+1} = rx_n(1 - x_n)$ models a population. For $r = 2.5$, find the fixed point and check its stability.</p>
<p>$x^* = 1 - 1/r = 0.6$. The slope there is $r(1 - 2x^*) = 2 - r = -0.5$, of magnitude under 1, so it is stable. Beyond $r = 3$ the slope's magnitude exceeds 1: the population oscillates with period 2, then 4, 8, … (period doubling), and becomes chaotic above $r \approx 3.57$.</p></div>
<p>The ratio between successive period-doubling intervals approaches Feigenbaum's constant 4.669…, the same for a huge class of systems, from dripping taps to electronic circuits.</p>` }
  });

  X('astrophysics', {
    0: { html: R`<h3 class="sub">Temperatures, sizes and magnitudes from light</h3>
<p>Stars radiate roughly as black bodies. <strong>Wien's law</strong> $\lambda_{\max}T = 2.90\times10^{-3}$ m K gives the surface temperature from the peak colour; the <strong>Stefan–Boltzmann law</strong> $L = 4\pi R^2\sigma T^4$ links luminosity, radius and temperature.</p>
<div class="worked"><p>Betelgeuse peaks at about 830 nm and has luminosity about $10^5L_\odot$. Estimate its temperature and radius ($T_\odot = 5772$ K).</p>
<p>$T = 2.90\times10^{-3}/830\times10^{-9} \approx 3500$ K. $R/R_\odot = \sqrt{L/L_\odot}\,(T_\odot/T)^2 = 316\cdot2.72 \approx 860$: placed at the Sun, it would extend beyond the orbit of Mars.</p></div>
<p>Brightness falls as $b = L/(4\pi d^2)$. Astronomers use <strong>magnitudes</strong>: a difference of 5 magnitudes is a factor of 100 in brightness, and larger magnitudes are fainter. The <strong>distance modulus</strong> $m - M = 5\log_{10}(d/10\ \text{pc})$ compares apparent ($m$) and absolute ($M$) magnitudes.</p>
<p>Spectral lines give much more: composition (from which lines appear), temperature (from line strengths: the O B A F G K M sequence), radial velocity (Doppler shift), and even surface gravity and magnetic fields (line widths and splitting).</p>` },
    1: { html: R`<h3 class="sub">Order-of-magnitude stellar structure</h3>
<p>A star is a ball of gas in <strong>hydrostatic equilibrium</strong>: $\dfrac{dp}{dr} = -\dfrac{GM(r)\rho}{r^2}$. Crude estimates already give the right scales.</p>
<div class="worked"><p>Estimate the Sun's central pressure and temperature ($M = 2\times10^{30}$ kg, $R = 7\times10^8$ m, mean particle mass about $0.6m_p$).</p>
<p>$p \sim GM^2/R^4 = 6.7\times10^{-11}\cdot4\times10^{60}/2.4\times10^{35} \approx 10^{15}$ Pa. For the temperature, thermal energy per particle $\sim$ gravitational energy per particle: $kT \sim GM\cdot0.6m_p/R$, giving $T \sim 10^7$ K. (Detailed models: $2.5\times10^{16}$ Pa and $1.6\times10^7$ K.)</p></div>
<p>Energy leaves the core slowly. A photon random-walks outward, absorbed and re-emitted countless times; it takes the energy of order 100 000 years to reach the surface, then 8 minutes to reach Earth. In the outer third of the Sun, convection carries the energy instead, seen as granulation on its surface.</p>
<p>Stellar lifetimes scale as fuel ÷ luminosity. Since $L \propto M^{3.5}$ roughly on the main sequence, lifetime goes as $M^{-2.5}$: a 10 $M_\odot$ star lasts about 30 million years, a 0.5 $M_\odot$ red dwarf over 50 billion.</p>` },
    2: { html: R`<h3 class="sub">Weighing stars and finding planets</h3>
<p>In a binary, both stars orbit their centre of mass. Kepler's third law in its full form gives the total mass:</p>
<div class="key"><p>$M_1 + M_2 = \dfrac{4\pi^2a^3}{GT^2}$, or in solar units: $M_1 + M_2 = a^3/T^2$ (AU, years)</p></div>
<div class="worked"><p>Sirius A and B have a period of 50.1 years and a semi-major axis of 19.8 AU; Sirius A moves about 0.46 times as far from the centre of mass as B does. Find their masses.</p>
<p>Total $19.8^3/50.1^2 = 3.09\ M_\odot$. Masses inversely proportional to their distances: $M_A/M_B = 1/0.46$, so $M_A = 2.1$ and $M_B = 0.98\ M_\odot$. Sirius B is a white dwarf: a solar mass in an Earth-sized body.</p></div>
<p><strong>Exoplanets</strong> (over 5000 known) are found mainly by:</p>
<ul><li><strong>Radial velocity</strong>: the star wobbles towards and away from us. Jupiter moves the Sun at 12.5 m s⁻¹; Earth only 9 cm s⁻¹.</li>
<li><strong>Transits</strong>: the planet blocks a fraction $(R_p/R_\star)^2$ of the star's light. Jupiter would dim the Sun by 1%, Earth by 0.008%.</li></ul>
<p>Combining both gives a planet's mass and radius, hence its density: rocky, watery or gaseous.</p>` },
    3: { html: R`<h3 class="sub">Expansion, the CMB and the age of the universe</h3>
<p>Galaxies recede with speeds proportional to distance: <strong>Hubble's law</strong> $v = H_0d$, with $H_0 \approx 70$ km s⁻¹ Mpc⁻¹. Space itself is expanding, stretching the light that crosses it: the redshift $z$ satisfies $1 + z = a_{\text{now}}/a_{\text{then}}$, where $a$ is the scale factor.</p>
<div class="worked"><p>Estimate the age of the universe as $1/H_0$.</p>
<p>$H_0 = 70\cdot10^3/3.09\times10^{22} = 2.27\times10^{-18}$ s⁻¹, so $1/H_0 = 4.4\times10^{17}$ s $= 14$ billion years. The detailed answer, accounting for deceleration then acceleration, is 13.8 billion years.</p></div>
<p>The <strong>cosmic microwave background</strong> is light released when the universe cooled to about 3000 K and atoms formed, 380 000 years after the Big Bang. Stretched by a factor of about 1100 since, it now has a temperature of 2.725 K. Its tiny ripples (1 part in 100 000) were the seeds of galaxies.</p>
<p>The universe's contents today are about 5% ordinary matter, 27% <strong>dark matter</strong> (inferred from galaxy rotation curves, gravitational lensing and the CMB) and 68% <strong>dark energy</strong>, which has made the expansion accelerate for the past 5 billion years (discovered in 1998 using distant supernovae as standard candles).</p>` }
  });

  X('experimental', {
    0: { html: R`<h3 class="sub">Types of error and how to quote results</h3>
<p><strong>Random</strong> errors scatter repeated readings either side of the true value; averaging $N$ readings reduces them by $\sqrt N$. <strong>Systematic</strong> errors shift every reading the same way (a zero error, a mis-calibrated scale, parallax, a reaction-time delay) and averaging does nothing; they are found by checking against known standards or changing the method.</p>
<div class="worked"><p>Five timings of 20 pendulum swings: 28.4, 28.9, 28.6, 28.2, 28.7 s. Give the period with its uncertainty.</p>
<p>Mean 28.56 s; standard deviation $s = 0.27$ s; standard error $s/\sqrt5 = 0.12$ s. The period is $T = 1.428 \pm 0.006$ s. Timing many swings divides the reaction-time error by 20.</p></div>
<p>Quote the uncertainty to one or two significant figures, and the value to the same decimal place: $9.81 \pm 0.03$ m s⁻², not $9.8132 \pm 0.0273$. Precision (small scatter) is not the same as accuracy (close to the true value): a precise but inaccurate result usually means an unnoticed systematic error.</p>
<p>The resolution of an instrument sets a minimum uncertainty: about half the smallest division for analogue scales, and one unit of the last digit for digital readouts.</p>` },
    1: { html: R`<h3 class="sub">Propagation rules with examples</h3>
<p>For independent uncertainties:</p>
<ul><li>Sums and differences: add absolute uncertainties in quadrature: $\delta(a \pm b) = \sqrt{\delta a^2 + \delta b^2}$.</li>
<li>Products and quotients: add <em>fractional</em> uncertainties in quadrature.</li>
<li>Powers: $\dfrac{\delta(a^n)}{a^n} = |n|\dfrac{\delta a}{a}$.</li>
<li>Any function: $\delta f = |f'(a)|\,\delta a$.</li></ul>
<p>(Simpler courses just add uncertainties, a safe overestimate.)</p>
<div class="worked"><p>A pendulum gives $L = 0.800 \pm 0.002$ m and $T = 1.795 \pm 0.005$ s. Find $g = 4\pi^2L/T^2$ with its uncertainty.</p>
<p>$g = 9.80$ m s⁻². Fractional uncertainties: $L$ 0.25%, $T^2$: $2\cdot0.28\% = 0.56\%$. In quadrature: 0.61%, so $g = 9.80 \pm 0.06$ m s⁻². The time measurement dominates, so effort should go into timing more swings, not measuring length more precisely.</p></div>
<div class="worked"><p>Two lengths, $50.0 \pm 0.5$ cm and $48.0 \pm 0.5$ cm, are subtracted. What is the fractional uncertainty of the difference?</p>
<p>$2.0 \pm 0.7$ cm: 35%, from two 1% measurements. Avoid designs that subtract nearly equal quantities.</p></div>` },
    2: { html: R`<h3 class="sub">Turning curves into straight lines</h3>
<p>Straight lines are easy to judge by eye, fit and extract constants from. Rearrange a relationship into $y = mx + c$:</p>
<div class="table-wrap"><table class="data"><tr><th>Relation</th><th>Plot</th><th>Gradient gives</th></tr>
<tr><td>$T = 2\pi\sqrt{L/g}$</td><td>$T^2$ against $L$</td><td>$4\pi^2/g$</td></tr>
<tr><td>$y = ax^n$</td><td>$\ln y$ against $\ln x$</td><td>$n$ (intercept $\ln a$)</td></tr>
<tr><td>$N = N_0e^{-\lambda t}$</td><td>$\ln N$ against $t$</td><td>$-\lambda$</td></tr>
<tr><td>$\dfrac1u + \dfrac1v = \dfrac1f$</td><td>$1/v$ against $1/u$</td><td>$-1$; intercepts give $1/f$</td></tr></table></div>
<div class="worked"><p>Data for the drag on a sphere fit $\ln F = 2.04\ln v - 1.7$. What does this tell you?</p>
<p>$F \propto v^{2.04}$: quadratic drag (turbulent regime), with $F = e^{-1.7}v^{2.04} = 0.18v^{2.04}$ in the units used.</p></div>
<p><strong>Least-squares fitting</strong> chooses the line minimising $\sum(y_i - mx_i - c)^2$. Error bars on points show uncertainty; the steepest and shallowest lines still passing through the bars give a quick estimate of the gradient's uncertainty. Always look at the residuals (data minus fit): a pattern in them reveals that the model is wrong, even when the fit "looks good".</p>` },
    3: { html: R`<h3 class="sub">A model experiment, start to finish</h3>
<div class="worked"><p><em>Aim:</em> find how the period of a mass on a spring depends on the mass, and find $k$.</p>
<p><em>Variables:</em> independent, the mass $m$ (6 values, 100–600 g); dependent, the period $T$; controlled, the same spring, small amplitude, the same timing method.</p>
<p><em>Method:</em> time 20 oscillations, three times for each mass, starting the stopwatch at the centre of the motion where the mass moves fastest and timing is sharpest; use a fiducial marker.</p>
<p><em>Analysis:</em> theory says $T^2 = \dfrac{4\pi^2}{k}m$; plot $T^2$ against $m$. Gradient $= 4\pi^2/k$. A positive intercept suggests the spring's own mass matters (theory: it adds about a third of the spring's mass).</p>
<p><em>Evaluation:</em> the largest uncertainty is probably timing, so more oscillations or a light gate would help; check that the amplitude did not affect the period; compare $k$ with a static measurement from extension under load.</p></div>
<p>A good report lets someone else repeat the experiment: aim, method with diagram, raw data with units and uncertainties, processed data, graph, result with uncertainty, comparison with theory or accepted values, and an honest evaluation. "Human error" is never an acceptable source of error; name the specific mechanism (reaction time, parallax, heat loss) and suggest how to reduce it.</p>
<p>Safety, ethics and the choice of a sensible range (enough points, spread over as wide a range as possible, with repeats) belong in the design, not as afterthoughts.</p>` }
  });
})();
