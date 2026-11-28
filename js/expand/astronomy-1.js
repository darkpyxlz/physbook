/* Expanded text for astronomy 1–8: the celestial sphere, time and seasons, the Moon, telescopes,
   Kepler's laws, the planets, small bodies and spaceflight, exoplanets. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('astro-sphere', {
    0: { html: R`
<h3 class="sub">Constellations, asterisms and star names</h3>
<p>The International Astronomical Union divides the sky into 88 <strong>constellations</strong> with official boundaries, like countries on a map, so every point of the sky belongs to exactly one. Familiar patterns that are not constellations, such as the Plough (part of Ursa Major) or the Summer Triangle, are <strong>asterisms</strong>. The stars of a constellation are usually unrelated and at very different distances; they only line up from our point of view.</p>
<p>Bright stars have traditional names (many from Arabic: Aldebaran, Betelgeuse, Rigel) and <strong>Bayer designations</strong>, a Greek letter roughly in order of brightness plus the constellation's genitive: Betelgeuse is α Orionis, Rigel β Orionis. Fainter stars get Flamsteed numbers or catalogue numbers.</p>
<div class="worked"><p>Why do the same constellations appear in the evening sky in winter each year?</p>
<p>The Earth's orbit carries the night side round to face a different direction each month, so the stars visible at, say, 9 p.m. drift westward by about 2 hours (30°) per month and return after a year. Orion is a winter evening constellation in the northern hemisphere and a summer one in the south.</p></div>` },
    1: { html: R`
<h3 class="sub">Converting between the systems</h3>
<p><strong>Altitude–azimuth</strong> coordinates are local: they change as the sky turns and differ between observers. <strong>Equatorial</strong> coordinates (right ascension α, measured in hours along the celestial equator from the vernal equinox, and declination δ, in degrees north or south) are fixed to the stars and the same for everyone, which is why catalogues use them.</p>
<p>The link is the <strong>hour angle</strong>: $H = \text{LST} - \alpha$, where LST is the local sidereal time. A star is on the meridian (highest) when its hour angle is zero, i.e. when the local sidereal time equals its right ascension.</p>
<div class="worked"><p>At a place where the local sidereal time is 5h 30m, which of these stars is due south (highest)? Rigel (RA 5h 15m), Sirius (6h 45m), Aldebaran (4h 36m).</p>
<p>Rigel's hour angle is 15 minutes: it crossed the meridian a quarter of an hour ago and is nearly due south. Sirius will cross in 1h 15m; Aldebaran crossed 54 minutes ago.</p></div>
<p>The full conversion uses spherical trigonometry: $\sin h = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos H$ for altitude $h$ at latitude $\varphi$.</p>` },
    2: { html: R`
<h3 class="sub">Circumpolar stars and the noon altitude</h3>
<p>For an observer at latitude $\varphi$ (northern), the celestial pole is at altitude $\varphi$. A star crosses the meridian at altitude</p>
<div class="key"><p>$h_{\max} = 90^\circ - \varphi + \delta$ (for stars culminating south of the zenith).</p></div>
<p>Stars with $\delta > 90^\circ - \varphi$ never set (<strong>circumpolar</strong>); stars with $\delta < -(90^\circ - \varphi)$ never rise.</p>
<div class="worked"><p>From London ($\varphi = 51.5^\circ$), what is the highest altitude of Sirius ($\delta = -16.7^\circ$), and is Polaris's neighbour Kochab ($\delta = +74^\circ$) circumpolar? Can you see Canopus ($\delta = -52.7^\circ$)?</p>
<p>Sirius: $90 - 51.5 - 16.7 = 21.8^\circ$, low in the south. Kochab: $74 > 38.5$, circumpolar. Canopus: $-52.7 < -38.5$, never rises from London; you must travel south of about 37° N to see it.</p></div>
<p>The reverse works for navigation: measure the noon altitude of a star or the Sun with a sextant, look up its declination, and the formula gives your latitude. At the equator every star rises and sets vertically and none are circumpolar; at the poles every visible star is circumpolar and none rise or set.</p>` },
    3: { html: R`
<h3 class="sub">The spherical cosine rule in use</h3>
<p>On a sphere, a triangle's sides are arcs of great circles, measured as angles. The <strong>spherical cosine rule</strong> is $\cos a = \cos b\cos c + \sin b\sin c\cos A$, and the spherical sine rule $\dfrac{\sin a}{\sin A} = \dfrac{\sin b}{\sin B}$. For small triangles they reduce to the flat rules.</p>
<div class="worked"><p>Find the great-circle distance from London (51.5° N, 0°) to New York (40.7° N, 74.0° W).</p>
<p>Use the triangle pole–London–New York: sides $90 - 51.5 = 38.5^\circ$ and $90 - 40.7 = 49.3^\circ$, enclosing an angle of 74.0° at the pole. $\cos d = \cos38.5\cos49.3 + \sin38.5\sin49.3\cos74.0 = 0.5097 + 0.1301 = 0.6398$, so $d = 50.2^\circ$. On Earth that is $50.2\cdot111$ km $\approx 5570$ km. Airline routes follow this great circle, which is why they curve north over Ireland and Newfoundland on a flat map.</p></div>
<p>The angles of a spherical triangle add up to <em>more</em> than 180°; the excess is proportional to its area ($\text{excess} = \text{area}/R^2$ in radians), a first glimpse of curved geometry, the same idea that general relativity applies to space itself.</p>` }
  });

  X('astro-time', {
    0: { html: R`
<h3 class="sub">Why the seasons happen</h3>
<p>The Earth's axis is tilted by 23.4° to the perpendicular of its orbit, and it keeps pointing the same way in space. In June the northern hemisphere leans towards the Sun: the Sun climbs higher and stays up longer. Seasons are <em>not</em> caused by the Earth's distance from the Sun: we are actually closest in early January, during the northern winter.</p>
<p>Two effects heat a hemisphere in summer: the Sun's rays strike more directly (the same beam spread over less ground, intensity $\propto \sin h$), and the days are longer. At the summer solstice in London the Sun reaches 62° and shines for 16½ hours; at the winter solstice, 15° and under 8 hours.</p>
<div class="worked"><p>How much more sunlight per square metre does horizontal ground in London receive at noon in midsummer than in midwinter?</p>
<p>$\sin62^\circ/\sin15^\circ = 0.883/0.259 \approx 3.4$ times, before counting the longer day and the thinner air path.</p></div>
<p>The Sun's path through the stars is the <strong>ecliptic</strong>, tilted 23.4° to the celestial equator. They cross at the <strong>equinoxes</strong> (around 20 March and 23 September), when day and night are nearly equal everywhere.</p>` },
    1: { html: R`
<h3 class="sub">How long is a day?</h3>
<p>At latitude $\varphi$, the Sun with declination $\delta$ rises and sets at hour angles $\pm H_0$ with</p>
<div class="key"><p>$\cos H_0 = -\tan\varphi\tan\delta$, and day length $= \dfrac{2H_0}{15^\circ}$ hours.</p></div>
<div class="worked"><p>Find the day length in Edinburgh ($\varphi = 56^\circ$) at the summer solstice ($\delta = 23.4^\circ$).</p>
<p>$\cos H_0 = -\tan56^\circ\tan23.4^\circ = -1.483\cdot0.433 = -0.642$, so $H_0 = 130^\circ$ and the day lasts $260/15 = 17.3$ hours (refraction adds a few more minutes).</p></div>
<p>If $\tan\varphi\tan\delta > 1$ there is no solution: the Sun does not set (midnight Sun) or does not rise (polar night). That happens beyond the Arctic and Antarctic circles, at $90^\circ - 23.4^\circ = 66.6^\circ$. On the equator days are always about 12 hours.</p>` },
    2: { html: R`
<h3 class="sub">The equation of time and time zones</h3>
<p>Sundials show <strong>apparent solar time</strong>, which runs unevenly through the year for two reasons: the Earth moves faster in its elliptical orbit in January, and the ecliptic is tilted to the equator. The difference from steady <strong>mean solar time</strong> is the <strong>equation of time</strong>, up to about 16 minutes (early November, sundials fast) and 14 minutes (mid-February, sundials slow). Plotting the Sun's noon position for a year traces a figure-of-eight, the <strong>analemma</strong>.</p>
<p>Clocks keep mean time for a time-zone meridian. Local mean time differs by 4 minutes per degree of longitude: Bristol (2.6° W) has local noon about 10 minutes after Greenwich.</p>
<div class="worked"><p>A sidereal day is 23h 56m 4s. Why is it shorter than the solar day, and how many sidereal days are in a year?</p>
<p>As the Earth orbits, it must turn a little extra (about 1°) each day to bring the Sun back to the meridian. Over a year those extra turns add up to one whole rotation: 366.24 sidereal days per 365.24 solar days. A star rises about 4 minutes earlier each night.</p></div>` },
    3: { html: R`
<h3 class="sub">Calendars</h3>
<p>The tropical year (equinox to equinox) is 365.2422 days. The Julian calendar's leap year every 4 years (365.25 days) drifted by a day every 128 years; by 1582 the equinox had moved 10 days. The <strong>Gregorian</strong> reform dropped 10 days and skipped leap years in century years not divisible by 400 (1900 was not a leap year, 2000 was), giving 365.2425 days, an error of a day in about 3200 years.</p>
<h3 class="sub">Precession</h3>
<p>The Sun and Moon pull on the Earth's equatorial bulge, making its axis sweep a cone like a spinning top every 25 800 years. The celestial poles circle among the stars (in 12 000 years Vega will be the pole star) and the equinoxes slide westward along the ecliptic by 50 arcseconds a year. That is why the "first point of Aries" is now in Pisces, and why star coordinates must quote an epoch (J2000.0).</p>
<div class="worked"><p>By how many degrees have the equinoxes moved since Hipparchus discovered precession around 130 BC?</p>
<p>About 2150 years × 50″ ≈ 107 500″ ≈ 30°: a whole zodiac sign.</p></div>` }
  });

  X('astro-moon', {
    0: { html: R`
<h3 class="sub">Sidereal and synodic months</h3>
<p>The Moon orbits the Earth in 27.3 days relative to the stars (the <strong>sidereal month</strong>), but the cycle of phases takes 29.5 days (the <strong>synodic month</strong>), because the Earth has moved round the Sun meanwhile and the Moon needs two more days to catch up to the same Sun–Earth–Moon alignment:</p>
<div class="key"><p>$\dfrac{1}{T_{\text{syn}}} = \dfrac{1}{T_{\text{sid}}} - \dfrac{1}{T_{\text{year}}}$</p></div>
<p>The Moon rises about 50 minutes later each day. A full Moon, opposite the Sun, rises at sunset and sets at sunrise; a first-quarter Moon is due south at sunset; a waning crescent rises shortly before dawn.</p>
<div class="worked"><p>Use the formula to find the synodic month from the sidereal month (27.32 days).</p>
<p>$\dfrac1{27.32} - \dfrac1{365.25} = 0.036603 - 0.002738 = 0.033865$, so $T_{\text{syn}} = 29.53$ days.</p></div>
<p>The Moon always shows the same face because it is <strong>tidally locked</strong>: it rotates once per orbit. Slight wobbles (librations) let us see 59% of its surface over time.</p>` },
    1: { html: R`
<h3 class="sub">Eclipse seasons and the saros</h3>
<p>The Moon's orbit is tilted 5.1° to the ecliptic, so most new and full Moons pass above or below the Sun or the Earth's shadow. Eclipses happen only when a new or full Moon falls near a <strong>node</strong> (where the orbit crosses the ecliptic). This happens in two "eclipse seasons" about 173 days apart each year, giving at least four and at most seven eclipses a year.</p>
<p>Eclipses repeat after the <strong>saros</strong>, 18 years 11 days 8 hours, when the Sun, Moon and nodes return to nearly the same arrangement (223 synodic months ≈ 242 draconic months). The extra 8 hours shift each repeat a third of the way round the Earth.</p>
<div class="worked"><p>Why can a total solar eclipse last at most about 7½ minutes, and why are annular eclipses possible?</p>
<p>The Moon's shadow sweeps across the Earth at over 1700 km/h and the umbra is at most about 270 km wide. When the Moon is near its farthest point (apogee) its disc is slightly smaller than the Sun's, so a ring of sunlight remains: an annular eclipse. The Moon is receding by 3.8 cm a year, so in about 600 million years total eclipses will end.</p></div>` },
    2: { html: R`
<h3 class="sub">Why two tides a day</h3>
<p>The Moon pulls harder on the near side of the Earth than on its centre, and harder on the centre than on the far side. Relative to the centre, the near side is pulled towards the Moon and the far side is left behind: two bulges. The tidal acceleration across a body of radius $R$ at distance $d$ is about $\dfrac{2GMR}{d^3}$, falling with the <em>cube</em> of distance.</p>
<div class="worked"><p>Compare the tidal effects of the Moon and the Sun.</p>
<p>The Sun is 27 million times more massive but 390 times further away: $\dfrac{2.7\times10^7}{390^3} = 0.46$. The Sun's tides are about half the Moon's. When they align (new and full Moon) we get large <strong>spring tides</strong>; at quarter Moons, small <strong>neap tides</strong>.</p></div>
<p>The Earth rotates under the bulges, so most coasts get two high tides about 12 h 25 min apart. Friction drags the bulges ahead of the Moon; their pull slows the Earth's rotation (days lengthen by about 2 milliseconds per century) and pushes the Moon outward. Tides heat Jupiter's moon Io enough to power hundreds of volcanoes.</p>` }
  });

  X('astro-telescopes', {
    0: { html: R`
<h3 class="sub">What reaches the ground</h3>
<p>The atmosphere is transparent in two main <strong>windows</strong>: visible light (with some near-infrared and UV) and radio waves from about 1 cm to 10 m. Gamma rays, X-rays and most ultraviolet are absorbed high up (by ozone and oxygen); much of the infrared is absorbed by water vapour and CO<sub>2</sub>. So X-ray and gamma-ray telescopes must fly in space, infrared telescopes sit on high, dry mountains or in space (JWST), and radio dishes work from the ground, even through cloud and in daylight.</p>
<p>Each band shows different physics: radio reveals cold hydrogen gas and pulsars; infrared sees through dust into star-forming regions; X-rays show million-degree gas around black holes and in galaxy clusters; gamma rays the most violent explosions.</p>
<div class="worked"><p>Why does the JWST observe in the infrared, and why must it be kept so cold?</p>
<p>Light from the first galaxies is redshifted from ultraviolet into the infrared, and infrared passes through dust. A warm telescope glows in the infrared itself, swamping faint sources, so JWST sits behind a sunshield at about 40 K, 1.5 million km from Earth.</p></div>` },
    1: { html: R`
<h3 class="sub">Refractors, reflectors and magnification</h3>
<p>A telescope's main job is to collect light, and its <strong>light grasp</strong> grows with the area of the objective: an 8 m mirror gathers $(8000/7)^2 \approx 1.3$ million times more than a 7 mm dark-adapted pupil. <strong>Refractors</strong> use lenses, which suffer from chromatic aberration (colours focus differently) and sag if large, so the largest refractor is only 1 m. All big telescopes are <strong>reflectors</strong>, now built from segments or thin mirrors held in shape by actuators.</p>
<div class="key"><p>Magnification $M = \dfrac{f_{\text{objective}}}{f_{\text{eyepiece}}}$; focal ratio $= f/D$; image scale $= \dfrac{206\,265''}{f}$ per unit length.</p></div>
<div class="worked"><p>A telescope has a 200 mm mirror with focal length 1200 mm. What magnifications do 25 mm and 6 mm eyepieces give, and what is the focal ratio?</p>
<p>48× and 200×; focal ratio f/6. Useful magnification is limited to about twice the aperture in mm (400×) by diffraction, and in practice to 200–300× by the atmosphere.</p></div>` },
    2: { html: R`
<h3 class="sub">Diffraction and interferometry</h3>
<p>Even a perfect telescope blurs a point into a small disc (the Airy pattern), because light is a wave. The smallest resolvable angle is the <strong>Rayleigh criterion</strong>:</p>
<div class="key"><p>$\theta \approx 1.22\dfrac{\lambda}{D}$ radians $\approx 0.14''\cdot\dfrac{\lambda/550\,\text{nm}}{D/1\,\text{m}}$.</p></div>
<div class="worked"><p>What is the resolution of a 100 m radio dish at 21 cm, and of the human eye?</p>
<p>Radio: $1.22\cdot0.21/100 = 2.6\times10^{-3}$ rad $= 0.15^\circ$, worse than the naked eye. Eye ($D = 5$ mm, 550 nm): $1.3\times10^{-4}$ rad $\approx 28''$, about 1 arcminute in practice.</p></div>
<p>Radio astronomers beat this by <strong>interferometry</strong>: combining dishes far apart gives the resolution of a telescope as wide as their separation. The Event Horizon Telescope linked dishes across the Earth at 1.3 mm to reach 25 microarcseconds, enough to image the shadow of the black hole in M87.</p>` },
    3: { html: R`
<h3 class="sub">Beating the atmosphere</h3>
<p>Turbulent air bends starlight randomly, smearing images to about 1″ at good sites (<strong>seeing</strong>) and making stars twinkle. Solutions: build on high mountains with stable air (Mauna Kea, Atacama), go to space (Hubble), or use <strong>adaptive optics</strong>, measuring the distortion of a guide star (often an artificial star made by a laser exciting sodium atoms 90 km up) and correcting it with a deformable mirror hundreds of times a second.</p>
<h3 class="sub">Detectors</h3>
<p>Modern telescopes record light with <strong>CCD</strong> and CMOS detectors, which register over 90% of incoming photons (photographic plates managed about 1%). Counting photons brings statistics: with $N$ detected photons the signal-to-noise ratio is about $\sqrt N$, so to halve the noise you must observe four times longer. Spectrographs spread light into a spectrum (see Starlight and Spectra), and photometers measure brightness through standard filters (U, B, V, R, I).</p>
<div class="worked"><p>A star gives 400 detected photons per second. How long must you observe for a signal-to-noise ratio of 100?</p>
<p>Need $N = 10\,000$ photons: 25 seconds (ignoring sky background, which in practice adds noise).</p></div>` }
  });

  X('astro-kepler', {
    0: { html: R`
<h3 class="sub">From epicycles to ellipses</h3>
<p>Ptolemy's Earth-centred model (about 150 AD) explained the planets' looping <strong>retrograde motion</strong> with circles on circles (epicycles) and predicted positions well enough for 1400 years. Copernicus (1543) put the Sun at the centre, explaining retrograde motion simply: Earth overtakes an outer planet on the inside track, so it appears to move backwards for a while. His model still used circles and was no more accurate.</p>
<p>Galileo's telescope (1610) supplied evidence: Jupiter has moons (not everything circles the Earth), and Venus shows a full set of phases, impossible in Ptolemy's scheme. Tycho Brahe's naked-eye measurements, accurate to about 1′, let Kepler discover that orbits are <strong>ellipses</strong>, ending 2000 years of perfect circles.</p>
<div class="worked"><p>Mars is in opposition (opposite the Sun) when it shows retrograde motion. Why then?</p>
<p>At opposition Earth passes Mars on the inside. Our line of sight to Mars swings backward against the distant stars, exactly as a slower car seems to move backwards when you overtake it.</p></div>` },
    1: { html: R`
<h3 class="sub">Using the three laws</h3>
<ol><li>Orbits are <strong>ellipses</strong> with the Sun at one focus. Perihelion distance $a(1 - e)$, aphelion $a(1 + e)$, where $a$ is the semi-major axis and $e$ the eccentricity.</li>
<li>A planet sweeps out <strong>equal areas in equal times</strong>: it moves fastest at perihelion. (This is conservation of angular momentum: $r\,v_\perp$ is constant.)</li>
<li>$T^2 \propto a^3$: with $T$ in years and $a$ in AU, $T^2 = a^3$ for anything orbiting the Sun.</li></ol>
<div class="worked"><p>Halley's comet has $T = 76$ years and perihelion 0.586 AU. Find its aphelion and the ratio of its speeds at perihelion and aphelion.</p>
<p>$a = 76^{2/3} = 17.9$ AU, so aphelion $= 2a - 0.586 = 35.3$ AU (beyond Neptune). By the second law, $v_pr_p = v_ar_a$: $v_p/v_a = 35.3/0.586 \approx 60$.</p></div>
<p>The third law gives distances in AU from periods alone. Before radar fixed the AU in kilometres (149.6 million km), astronomers measured it by timing transits of Venus across the Sun from different places on Earth.</p>` },
    2: { html: R`
<h3 class="sub">Newton's derivation and weighing the Sun</h3>
<p>For a circular orbit, gravity provides the centripetal force: $\dfrac{GMm}{r^2} = \dfrac{mv^2}{r}$ with $v = 2\pi r/T$, giving</p>
<div class="key"><p>$T^2 = \dfrac{4\pi^2}{G(M + m)}a^3$ (exact for ellipses too, with $a$ the semi-major axis).</p></div>
<p>This turns Kepler's third law into a scale: measure any orbit's period and size and you have the central mass.</p>
<div class="worked"><p>Find the mass of the Sun from the Earth's orbit, and of Jupiter from its moon Io ($a = 421\,700$ km, $T = 1.769$ days).</p>
<p>Sun: $M = \dfrac{4\pi^2(1.496\times10^{11})^3}{6.674\times10^{-11}(3.156\times10^7)^2} = 1.99\times10^{30}$ kg.</p>
<p>Jupiter: $\dfrac{4\pi^2(4.217\times10^8)^3}{6.674\times10^{-11}(1.528\times10^5)^2} = 1.90\times10^{27}$ kg, about 318 Earth masses.</p></div>
<p>The same method weighs binary stars, galaxies and the black hole at the centre of the Milky Way (4 million Suns, from the orbits of stars around it).</p>` },
    3: { html: R`
<h3 class="sub">The vis-viva equation</h3>
<p>Energy conservation in an orbit gives the speed at any point:</p>
<div class="key"><p>$v^2 = GM\left(\dfrac{2}{r} - \dfrac{1}{a}\right)$. Circular orbit: $v = \sqrt{GM/r}$. Escape: $v = \sqrt{2GM/r}$. Total energy $E = -\dfrac{GMm}{2a}$.</p></div>
<p>The total energy depends only on $a$: negative for bound orbits (ellipses), zero for parabolic escape, positive for hyperbolic flybys. A higher orbit has <em>more</em> energy but <em>lower</em> speed, which leads to the paradox of orbital mechanics: to catch up with a spacecraft ahead of you in the same orbit, you slow down, drop to a lower and faster orbit, then rise again.</p>
<div class="worked"><p>Find the Earth's orbital speed, the escape speed from the Sun at 1 AU, and the speed of a satellite in low Earth orbit (400 km).</p>
<p>$\sqrt{GM_\odot/r} = \sqrt{1.327\times10^{20}/1.496\times10^{11}} = 29.8$ km/s; escape $\sqrt2\cdot29.8 = 42.1$ km/s.</p>
<p>LEO: $\sqrt{3.986\times10^{14}/6.77\times10^6} = 7.67$ km/s, once round in about 92 minutes.</p></div>` }
  });

  X('astro-planets', {
    0: { html: R`
<h3 class="sub">Rocky and giant worlds</h3>
<div class="table-wrap"><table class="data"><tr><th></th><th>Terrestrial</th><th>Gas giants</th><th>Ice giants</th></tr>
<tr><td>Planets</td><td>Mercury, Venus, Earth, Mars</td><td>Jupiter, Saturn</td><td>Uranus, Neptune</td></tr>
<tr><td>Composition</td><td>rock and metal</td><td>mostly H and He</td><td>water, ammonia, methane "ices" with H/He envelopes</td></tr>
<tr><td>Density (g cm⁻³)</td><td>3.9–5.5</td><td>0.7–1.3</td><td>1.3–1.6</td></tr>
<tr><td>Moons and rings</td><td>few, no rings</td><td colspan="2">many moons, ring systems</td></tr></table></div>
<p>Saturn's mean density (0.69 g cm⁻³) is less than water's. Jupiter, 318 Earth masses, contains more than twice as much mass as all the other planets together; deep inside, hydrogen is squeezed into a metallic state whose currents produce the strongest planetary magnetic field.</p>
<div class="worked"><p>Find Mars's mean density from its mass ($6.42\times10^{23}$ kg) and radius (3390 km), and say what it suggests.</p>
<p>$\rho = \dfrac{6.42\times10^{23}}{\frac43\pi(3.39\times10^6)^3} = 3.93\times10^3$ kg m⁻³. Lower than Earth's 5.5: a smaller iron core in proportion, as expected for a body formed further out with less iron.</p></div>` },
    1: { html: R`
<h3 class="sub">From disc to planets</h3>
<p>The Sun formed 4.6 billion years ago from a collapsing cloud. Conservation of angular momentum spun the leftover material into a flat <strong>protoplanetary disc</strong>, which is why the planets orbit in nearly one plane and in the same direction. Dust grains stuck together into pebbles, then kilometre-sized <strong>planetesimals</strong>, which collided to build planets.</p>
<p>The <strong>frost line</strong> (about 3 AU from the young Sun) decided the planets' make-up: inside it only rock and metal could condense, so the inner planets are small and rocky; beyond it ice was abundant too, cores grew to 10 Earth masses quickly, and gravity let them capture hydrogen and helium gas before the young Sun's wind blew it away: the giants.</p>
<p>The young solar system was violent: a Mars-sized body hit the Earth and formed the Moon; giant-planet migration may have scattered comets inward in a "late heavy bombardment" recorded in the Moon's craters. Radioactive dating of meteorites gives the age of 4.567 billion years.</p>` },
    2: { html: R`
<h3 class="sub">Equilibrium temperature</h3>
<p>A planet absorbs sunlight on its cross-section and radiates heat from its whole surface. Balancing the two gives the <strong>equilibrium temperature</strong>:</p>
<div class="key"><p>$T_{\text{eq}} = T_\odot\sqrt{\dfrac{R_\odot}{2d}}\,(1 - A)^{1/4} \approx 278\ \text{K}\cdot\dfrac{(1 - A)^{1/4}}{\sqrt{d/1\,\text{AU}}}$, with albedo $A$.</p></div>
<div class="worked"><p>Find Earth's equilibrium temperature ($A = 0.30$) and compare with the true mean surface temperature of 288 K.</p>
<p>$278\cdot0.70^{1/4} = 255$ K, i.e. −18 °C. The 33 K difference is the natural <strong>greenhouse effect</strong>: water vapour and CO<sub>2</sub> absorb the infrared radiated by the surface and re-emit some of it back down.</p></div>
<p>Venus shows the extreme: its albedo of 0.75 gives an equilibrium temperature of only 230 K, yet its thick CO<sub>2</sub> atmosphere (90 times Earth's pressure) traps heat so well that the surface is 735 K, hotter than Mercury. Mars's thin atmosphere adds only about 5 K.</p>` },
    3: { html: R`
<h3 class="sub">Who keeps an atmosphere?</h3>
<p>A gas molecule's typical speed is $v_{\text{rms}} = \sqrt{3kT/m}$. If it is more than about one-sixth of the escape speed, the fast tail of the distribution leaks away over billions of years.</p>
<div class="worked"><p>Can the Moon keep oxygen? ($v_{\text{esc}} = 2.4$ km/s, daytime surface about 390 K.)</p>
<p>$v_{\text{rms}}$(O<sub>2</sub>) $= \sqrt{3\cdot1.38\times10^{-23}\cdot390/5.3\times10^{-26}} = 551$ m/s, more than a sixth of 2.4 km/s (400 m/s). Over billions of years the Moon loses it. Earth (11.2 km/s) keeps oxygen and nitrogen but not hydrogen or helium, which is why helium is a scarce resource.</p></div>
<p>Other factors matter: a magnetic field shields the upper atmosphere from the solar wind (Mars lost its field and most of its air), and chemistry can lock gases in rocks. Saturn's moon Titan is cold enough (94 K) to hold a nitrogen atmosphere thicker than Earth's despite its low gravity.</p>` }
  });

  X('astro-smallbodies', {
    0: { html: R`
<h3 class="sub">A tour of the major moons</h3>
<p>Jupiter's four Galilean moons are worlds in their own right: <strong>Io</strong> is the most volcanic body known (tidal heating); <strong>Europa</strong> has an ice shell over a salty ocean with more water than Earth's oceans; <strong>Ganymede</strong> is larger than Mercury; <strong>Callisto</strong> is ancient and cratered. Saturn's <strong>Titan</strong> has lakes of liquid methane, and <strong>Enceladus</strong> sprays geysers of water from its south pole. Neptune's <strong>Triton</strong> orbits backwards, so it was probably captured from the Kuiper belt.</p>
<p>Rings exist inside the <strong>Roche limit</strong>, about 2.44 planetary radii (for similar densities), where tidal forces would tear a moon apart and prevent loose material from clumping. Saturn's bright rings are mostly water ice, kilometres-wide gaps cleared by resonances with moons.</p>
<div class="worked"><p>Why do Io, Europa and Ganymede stay heated?</p>
<p>They are locked in a 1 : 2 : 4 <strong>orbital resonance</strong>: their periods are 1.77, 3.55 and 7.15 days. The regular tugs keep their orbits slightly elliptical, so tides flex them continually, turning orbital energy into heat.</p></div>` },
    1: { html: R`
<h3 class="sub">Asteroids, comets and the outer reaches</h3>
<p>The <strong>asteroid belt</strong> between Mars and Jupiter holds rocky and metallic leftovers; its total mass is only about 3% of the Moon's, and Jupiter's resonances clear gaps (the Kirkwood gaps) in it. Ceres, 940 km across, is a <strong>dwarf planet</strong>: round, but it has not cleared its orbit.</p>
<p>Beyond Neptune lies the <strong>Kuiper belt</strong> (30–50 AU), home to Pluto, Eris and many icy bodies, and the source of short-period comets. Far beyond, the <strong>Oort cloud</strong> extends perhaps 100 000 AU, a spherical reservoir of comets disturbed by passing stars, sending long-period comets in from all directions.</p>
<p>A comet nucleus is a "dirty snowball" a few km across. Near the Sun, ices sublimate into a coma and two tails: a straight, bluish <strong>ion tail</strong> blown directly away from the Sun by the solar wind, and a curved, yellowish <strong>dust tail</strong> pushed by sunlight. Dust left along a comet's orbit gives <strong>meteor showers</strong> when Earth crosses it: the Perseids every August come from comet Swift–Tuttle.</p>` },
    2: { html: R`
<h3 class="sub">How big an impact?</h3>
<p>An asteroid arrives at 11–70 km/s, carrying kinetic energy $\tfrac12mv^2$. A 10 km body at 20 km/s (density 3000 kg m⁻³) carries about $3\times10^{23}$ J, the energy of 70 million megatons of TNT: the scale of the Chicxulub impact that ended the dinosaurs 66 million years ago, leaving a 180 km crater and a global layer rich in iridium.</p>
<div class="worked"><p>Estimate the energy of the 2013 Chelyabinsk meteor: about 20 m across, 3300 kg m⁻³, 19 km/s.</p>
<p>Mass $\tfrac43\pi(10)^3\cdot3300 = 1.4\times10^7$ kg; energy $\tfrac12\cdot1.4\times10^7\cdot(1.9\times10^4)^2 = 2.5\times10^{15}$ J, about 600 kilotons. It exploded in the air, injuring 1500 people with broken glass.</p></div>
<p>Small impacts are common and large ones rare: roughly, the number of impactors larger than size $D$ falls as $D^{-2}$. Surveys now track over 90% of near-Earth asteroids larger than 1 km, and in 2022 NASA's DART spacecraft shortened the orbit of the moonlet Dimorphos by 33 minutes, the first test of planetary defence.</p>` },
    3: { html: R`
<h3 class="sub">The rocket equation and delta-v</h3>
<p>A rocket throws mass backwards at exhaust speed $v_e$. Momentum conservation gives Tsiolkovsky's <strong>rocket equation</strong>:</p>
<div class="key"><p>$\Delta v = v_e\ln\dfrac{m_0}{m_f}$</p></div>
<p>Because of the logarithm, each extra km/s needs a multiplication of the mass ratio. Reaching low Earth orbit needs about 9.4 km/s including losses to gravity and drag; with $v_e = 3.3$ km/s that is a mass ratio of $e^{2.85} \approx 17$, which is why rockets are mostly fuel and drop empty stages.</p>
<h3 class="sub">Hohmann transfers</h3>
<p>The cheapest route between two circular orbits is a half-ellipse touching both: speed up at the inner orbit, coast half an orbit, speed up again to circularise. For Earth to Mars ($a = 1.26$ AU) the coast takes $\tfrac12\cdot1.26^{1.5} = 0.71$ years, about 8.5 months, and launch windows recur every synodic period of 26 months, when Mars is 44° ahead of Earth.</p>
<div class="worked"><p>Find the first burn for a Hohmann transfer from Earth's orbit (1 AU) to Mars (1.52 AU).</p>
<p>At perihelion of the transfer ellipse: $v = 29.8\sqrt{\dfrac{2\cdot1.52}{2.52}} = 32.7$ km/s, so the burn is $32.7 - 29.8 = 2.9$ km/s relative to Earth's orbital motion (on top of escaping Earth's own gravity).</p></div>
<p><strong>Gravity assists</strong> steal momentum from planets: Voyager 2 swung past Jupiter, Saturn, Uranus and Neptune, gaining speed at each, a route that lines up only once every 175 years.</p>` }
  });

  X('astro-exoplanets', {
    0: { html: R`
<h3 class="sub">How the transit and radial-velocity methods work</h3>
<p><strong>Transits</strong>: when a planet crosses its star, the star dims by the fraction of its disc covered, $\Delta F/F = (R_p/R_\star)^2$. Earth crossing the Sun dims it by 84 parts per million; Jupiter by 1%. The repeat time gives the period, so Kepler's third law gives the orbit size. Only systems seen nearly edge-on transit (probability about $R_\star/a$, 0.5% for an Earth-like orbit), so surveys like Kepler and TESS watch hundreds of thousands of stars at once.</p>
<p><strong>Radial velocity</strong>: planet and star orbit their common centre of mass, so the star wobbles towards and away from us, Doppler-shifting its spectral lines. Jupiter moves the Sun by 12.5 m/s; Earth by only 9 cm/s. The wobble gives the planet's minimum mass, $M_p\sin i$.</p>
<div class="worked"><p>A transit dims a Sun-like star by 0.5%. How big is the planet?</p>
<p>$R_p = R_\star\sqrt{0.005} = 0.071R_\odot = 49\,000$ km, about 0.7 Jupiter radii.</p></div>` },
    1: { html: R`
<h3 class="sub">Density, composition and atmospheres</h3>
<p>Transit (radius) plus radial velocity (mass) give density, which reveals composition: rocky worlds near 5 g cm⁻³, water worlds lower, puffy gas giants below 1. The 5000+ known exoplanets include types the Solar System lacks: <strong>hot Jupiters</strong> orbiting in a few days, <strong>super-Earths</strong> and <strong>sub-Neptunes</strong> (1–4 Earth radii, the most common kind), and compact systems like TRAPPIST-1 with seven Earth-sized planets.</p>
<p>During a transit, starlight filters through the planet's atmosphere. Gases absorb at their own wavelengths, so the planet looks slightly larger at those wavelengths: <strong>transmission spectroscopy</strong>. JWST has detected water, carbon dioxide, methane and sulfur dioxide this way.</p>
<div class="worked"><p>A planet has 8 Earth masses and 2 Earth radii. Is it rocky?</p>
<p>Density relative to Earth: $8/2^3 = 1.0$, i.e. 5.5 g cm⁻³. At that mass, compression would make a purely rocky planet denser than Earth, so this one probably has some water or a thin gas layer. Models of interior structure turn mass and radius into such conclusions.</p></div>` },
    2: { html: R`
<h3 class="sub">The habitable zone and the Drake equation</h3>
<p>The <strong>habitable zone</strong> is the range of distances where a planet with an atmosphere like Earth's could keep liquid water on its surface. It scales with the square root of the star's luminosity: $d \approx 1\ \text{AU}\sqrt{L/L_\odot}$. Around a red dwarf with 0.01 $L_\odot$ it lies at only 0.1 AU, so its planets are tidally locked and blasted by flares.</p>
<div class="worked"><p>Where is the habitable zone of a star 4 times as luminous as the Sun?</p>
<p>At about $\sqrt4 = 2$ AU, where Earth would receive the same flux as at home.</p></div>
<p>The <strong>Drake equation</strong>, $N = R_\star f_pn_ef_lf_if_cL$, multiplies the star-formation rate by the fractions with planets, habitable planets, life, intelligence and communication, and the lifetime of a civilisation. The early factors are now measured (nearly every star has planets); the later ones remain guesses. Searches look for <strong>biosignatures</strong> (oxygen together with methane, out of chemical equilibrium) and for technosignatures such as narrow-band radio signals.</p>` }
  });
})();
