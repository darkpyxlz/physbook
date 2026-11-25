/* Expanded text for astronomy 9–16: brightness and distance, spectra, the HR diagram and the Sun, binaries,
   stellar evolution, the Milky Way, galaxies and the distance ladder, cosmology. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('astro-magnitudes', {
    0: { html: R`
<h3 class="sub">The inverse-square law</h3>
<p>A star's <strong>luminosity</strong> $L$ (total power, in watts) spreads over a sphere of area $4\pi d^2$, so the <strong>flux</strong> we receive is</p>
<div class="key"><p>$F = \dfrac{L}{4\pi d^2}$. For a star of radius $R$ and temperature $T$: $L = 4\pi R^2\sigma T^4$ (Stefan–Boltzmann).</p></div>
<div class="worked"><p>The solar flux at Earth is 1361 W m⁻². Find the Sun's luminosity, and the flux at Mars (1.52 AU).</p>
<p>$L = 4\pi(1.496\times10^{11})^2\cdot1361 = 3.83\times10^{26}$ W. At Mars: $1361/1.52^2 = 589$ W m⁻², 43% of Earth's.</p></div>
<p>Flux alone cannot tell a nearby dim star from a distant bright one: we need either the distance or some independent clue to the luminosity. Much of astronomy is the search for such clues.</p>` },
    1: { html: R`
<h3 class="sub">Working with magnitudes</h3>
<p>Hipparchus ranked stars from first magnitude (brightest) to sixth (faintest visible). The modern scale makes a difference of 5 magnitudes exactly a factor of 100 in flux, so 1 magnitude is a factor $100^{1/5} = 2.512$:</p>
<div class="key"><p>$m_1 - m_2 = -2.5\log_{10}\dfrac{F_1}{F_2}$, &emsp; $\dfrac{F_1}{F_2} = 10^{-0.4(m_1 - m_2)}$.</p></div>
<p>Smaller (even negative) magnitudes are brighter: the Sun −26.7, full Moon −12.7, Venus at best −4.6, Sirius −1.46, Vega about 0, the faintest naked-eye stars +6, and Hubble's deepest images about +31.</p>
<div class="worked"><p>How much brighter is Sirius than a 6th-magnitude star? What magnitude does a binary of two equal 3.0-magnitude stars appear to have?</p>
<p>$10^{0.4\cdot7.46} = 960$ times. Combined: doubling the flux lowers the magnitude by $2.5\log2 = 0.75$, so 2.25. Magnitudes do not add; fluxes do.</p></div>` },
    2: { html: R`
<h3 class="sub">Distances from the distance modulus</h3>
<p>The <strong>absolute magnitude</strong> $M$ is the magnitude a star would have at 10 parsecs. Comparing it with the apparent magnitude gives the distance:</p>
<div class="key"><p>$m - M = 5\log_{10}\dfrac{d}{10\ \text{pc}}$ (plus extinction $A$ if dust dims the light).</p></div>
<div class="worked"><p>A Cepheid with $M = -4.0$ appears at $m = 21.0$. How far away is it?</p>
<p>$m - M = 25$, so $d = 10^{25/5 + 1} = 10^6$ pc = 1 Mpc. That is the method Hubble used for the Andromeda galaxy.</p></div>
<p>The Sun has $M = +4.83$: placed 10 pc away it would be just visible to the naked eye. Luminosity relates to absolute magnitude by $M - M_\odot = -2.5\log(L/L_\odot)$: a star with $M = -0.17$ is 100 times as luminous as the Sun. <strong>Bolometric</strong> magnitudes count all wavelengths; ordinary ones use a filter, usually V (visual).</p>` },
    3: { html: R`
<h3 class="sub">Measuring parallax</h3>
<p>As the Earth orbits, nearby stars shift against distant ones. The parallax angle $p$ is half the total shift (the angle subtended by 1 AU):</p>
<div class="key"><p>$d\ (\text{pc}) = \dfrac{1}{p\ (\text{arcsec})}$; 1 pc $= 206\,265$ AU $= 3.086\times10^{16}$ m $= 3.26$ light-years.</p></div>
<div class="worked"><p>Proxima Centauri has $p = 0.768''$. How far is it, and how long does its light take to arrive?</p>
<p>$d = 1.30$ pc = 4.24 light-years.</p></div>
<p>Parallaxes are tiny: even the nearest star shifts less than the width of a coin seen from 5 km. The first was measured by Bessel in 1838 (61 Cygni, 0.31″). The Gaia satellite now measures parallaxes to about 20 microarcseconds for over a billion stars, mapping the Milky Way in 3D out to thousands of parsecs and calibrating every other distance method. It also measures <strong>proper motions</strong>: combined with Doppler shifts, these give stars' true velocities through space.</p>` }
  });

  X('astro-spectra', {
    0: { html: R`
<h3 class="sub">Colour as a thermometer</h3>
<p>A star's continuous spectrum is close to a <strong>blackbody</strong> curve, which peaks at a wavelength set by temperature alone (Wien's law):</p>
<div class="key"><p>$\lambda_{\max}T = 2.898\times10^{-3}$ m K.</p></div>
<p>The Sun (5772 K) peaks at 502 nm in the green, but its mix of all colours looks white. Cooler stars peak in the red or infrared and look orange-red (Betelgeuse, 3500 K); hotter ones peak in the ultraviolet and look blue-white (Rigel, 12 000 K). Astronomers measure colour with the <strong>colour index</strong> B − V (blue magnitude minus visual magnitude): negative for hot blue stars, about +0.65 for the Sun, +1.5 or more for red stars.</p>
<div class="worked"><p>Betelgeuse has $T = 3500$ K and $L = 1.0\times10^5L_\odot$. Find its peak wavelength and its radius.</p>
<p>$\lambda_{\max} = 828$ nm (near infrared). $R/R_\odot = \sqrt{L/L_\odot}\,(T_\odot/T)^2 = 316\cdot2.72 = 860$: wider than the orbit of Mars.</p></div>` },
    1: { html: R`
<h3 class="sub">Kirchhoff's laws and what lines tell us</h3>
<p>A hot dense body gives a continuous spectrum; a hot thin gas gives bright <strong>emission lines</strong>; cooler thin gas in front of a continuous source gives dark <strong>absorption lines</strong> at the same wavelengths. Stellar spectra are absorption spectra: the cooler outer layers absorb light from the hotter interior.</p>
<p>Each element absorbs at its own wavelengths (its electron energy levels), so lines reveal composition. Helium was discovered in the Sun's spectrum in 1868, 27 years before it was found on Earth. Line strengths, widths and shapes also measure temperature, pressure (higher-pressure atmospheres of dwarfs give broader lines than giants), magnetic fields (Zeeman splitting) and rotation.</p>
<div class="worked"><p>Cecilia Payne showed in 1925 that stars are mostly hydrogen, although hydrogen lines are weak in the Sun. How?</p>
<p>The strength of a line depends on how many atoms are in the right energy level, which depends sharply on temperature (the Saha and Boltzmann equations). In the Sun few hydrogen atoms are excited to level 2, where Balmer absorption starts; correcting for this showed hydrogen outnumbers metals a million to one.</p></div>` },
    2: { html: R`
<h3 class="sub">OBAFGKM and luminosity classes</h3>
<p>Spectral types run from the hottest O stars (above 30 000 K, ionised helium lines) through B, A (strongest hydrogen lines, about 10 000 K), F, G (the Sun, G2), K, to the coolest M stars (below 3700 K, with molecular bands of titanium oxide). Each type has subdivisions 0–9. Hydrogen lines peak at A because hotter stars ionise their hydrogen and cooler ones do not excite it.</p>
<p>A Roman numeral gives the <strong>luminosity class</strong>: I supergiants, III giants, V main-sequence dwarfs. The Sun is G2 V, Betelgeuse M1 Ia, Sirius A1 V. Two stars of the same temperature but different sizes have different surface gravities, and pressure broadening of their lines tells them apart: this gives <strong>spectroscopic parallax</strong>, a distance from the spectrum alone.</p>
<div class="worked"><p>A G2 V star appears at magnitude 9.8. Estimate its distance.</p>
<p>G2 V means Sun-like: $M \approx 4.8$. $m - M = 5.0$, so $d = 10^{2}$ = 100 pc.</p></div>` },
    3: { html: R`
<h3 class="sub">Doppler shifts and their uses</h3>
<p>Motion along the line of sight shifts lines: $\dfrac{\Delta\lambda}{\lambda} = \dfrac{v_r}{c}$ for speeds much less than light. Redshift means receding, blueshift approaching. Motion across the sky does not shift lines.</p>
<div class="worked"><p>The hydrogen-alpha line (656.28 nm) is observed at 656.50 nm in a star. What is its radial velocity?</p>
<p>$v = c\cdot0.22/656.28 = 100$ km/s, moving away.</p></div>
<p>Uses: binary star orbits and exoplanets (periodic shifts); stellar rotation (lines broadened as one limb approaches and the other recedes); galaxy rotation curves (evidence for dark matter); the expanding universe (redshifts growing with distance). At large redshifts the relativistic formula or the cosmological redshift $1 + z = a_{\text{now}}/a_{\text{then}}$ must be used.</p>` }
  });

  X('astro-hr', {
    0: { html: R`
<h3 class="sub">Reading the Hertzsprung–Russell diagram</h3>
<p>Plotting luminosity (or absolute magnitude) against temperature (or spectral type, hot on the left) shows that stars are not scattered at random. About 90% lie on the <strong>main sequence</strong>, a diagonal band from hot, luminous blue stars to cool, faint red dwarfs. Above it lie the <strong>giants</strong> and <strong>supergiants</strong>: cool but luminous, so they must be huge. Below lie the <strong>white dwarfs</strong>: hot but faint, so they must be tiny.</p>
<p>Lines of constant radius run diagonally across the diagram, because $L = 4\pi R^2\sigma T^4$. A white dwarf with $T = 10\,000$ K and $L = 10^{-3}L_\odot$ has $R \approx \sqrt{10^{-3}}\cdot(5772/10\,000)^2R_\odot = 0.011R_\odot$: about the size of the Earth.</p>
<p>The diagram is a snapshot of stellar <em>evolution</em>: stars spend most of their lives on the main sequence, then move to the giant branch, and end as white dwarfs (or explode). Its shape for a star cluster, all of one age, gives the cluster's age (see The Milky Way).</p>` },
    1: { html: R`
<h3 class="sub">Why mass is destiny</h3>
<p>On the main sequence, luminosity rises steeply with mass: roughly $L \propto M^{3.5}$. Fuel grows only as $M$, so lifetime $\tau \propto M/L \propto M^{-2.5}$:</p>
<div class="key"><p>$\tau \approx 10^{10}\ \text{yr}\left(\dfrac{M}{M_\odot}\right)^{-2.5}$</p></div>
<div class="worked"><p>Estimate the main-sequence lifetimes of a 10 $M_\odot$ star and a 0.2 $M_\odot$ red dwarf.</p>
<p>10 $M_\odot$: $10^{10}\cdot10^{-2.5} = 3\times10^7$ years. 0.2 $M_\odot$: $10^{10}\cdot0.2^{-2.5} = 5.6\times10^{11}$ years, far longer than the age of the universe: no red dwarf has yet left the main sequence.</p></div>
<p>Massive stars burn hydrogen by the <strong>CNO cycle</strong>, whose rate rises as about $T^{17}$, so their cores are fierce and convective. Stars below 0.08 $M_\odot$ never get hot enough to fuse hydrogen at all: they are <strong>brown dwarfs</strong>. Above about 150 $M_\odot$, radiation pressure tears a forming star apart.</p>` },
    2: { html: R`
<h3 class="sub">The Sun's power source</h3>
<p>In the core (15 million K), the <strong>proton–proton chain</strong> converts four hydrogen nuclei into one helium-4 nucleus. The helium is 0.7% lighter than the four protons, and that mass becomes energy, $E = \Delta mc^2 = 26.7$ MeV per helium nucleus.</p>
<div class="worked"><p>How much mass does the Sun convert to energy each second, and how long can it shine?</p>
<p>$\Delta m = L/c^2 = 3.83\times10^{26}/(9\times10^{16}) = 4.3\times10^9$ kg/s: four million tonnes a second. About 10% of its hydrogen (the core) will be used, releasing $0.007\cdot0.1\cdot2\times10^{30}\cdot c^2 \approx 1.3\times10^{44}$ J; divided by $L$, about 10 billion years.</p></div>
<p>Energy leaves the core by <strong>radiation</strong> (photons random-walk outward, taking roughly 100 000 years) and then by <strong>convection</strong> in the outer 30%, visible as granulation on the surface. Neutrinos from the reactions fly straight out in 2 seconds; detecting them confirmed the core's fusion, once the "missing" two-thirds were explained by neutrino oscillations (Nobel prize 2015).</p>` },
    3: { html: R`
<h3 class="sub">Sunspots, the cycle and space weather</h3>
<p>The Sun's differential rotation (25 days at the equator, about 35 near the poles) winds up its magnetic field. Where strong field loops break through the surface, they block convection and make cooler, darker <strong>sunspots</strong> (about 4000 K against 5800 K). The number of spots rises and falls over an <strong>11-year cycle</strong>, and the magnetic polarity flips each cycle (a 22-year magnetic cycle). From 1645 to 1715 sunspots almost vanished (the Maunder minimum), during the coldest part of the Little Ice Age.</p>
<p>Twisted fields release energy in <strong>flares</strong> and <strong>coronal mass ejections</strong>, billion-tonne clouds of plasma. When one hits Earth it shakes the magnetosphere, causing aurorae, but also currents that can damage power grids and satellites: the 1859 Carrington event set telegraph paper on fire. The corona, oddly, is over a million kelvin, heated by magnetic waves and tiny flares.</p>
<div class="worked"><p>Using solar rotation, how could Galileo prove sunspots are on the Sun, not planets passing in front?</p>
<p>Spots move across the disc in about 13½ days, appear foreshortened near the edge, and return after about 27 days: they rotate with the surface.</p></div>` }
  });

  X('astro-binaries', {
    0: { html: R`
<h3 class="sub">How binaries reveal themselves</h3>
<p>About half of Sun-like stars have companions. <strong>Visual binaries</strong> are resolved in a telescope and their orbit traced over years. <strong>Spectroscopic binaries</strong> are too close to resolve, but their spectral lines shift back and forth (double-lined if both stars are seen). <strong>Eclipsing binaries</strong> dim regularly as the stars pass in front of each other. <strong>Astrometric binaries</strong> show a wobbling path across the sky, revealing an unseen companion; Sirius B, a white dwarf, was predicted this way in 1844 and seen in 1862.</p>
<p>Optical doubles, by contrast, just happen to line up and are not bound. Binaries matter because they are the only direct way to measure stellar masses, the property that controls a star's life.</p>` },
    1: { html: R`
<h3 class="sub">From orbit to masses</h3>
<p>Kepler's third law for a binary, with $a$ in AU, $P$ in years and masses in solar masses: $M_1 + M_2 = \dfrac{a^3}{P^2}$. The angular size of the orbit $\alpha$ (arcsec) and the parallax $p$ give $a = \alpha/p$ AU. The individual masses follow from the centre of mass: each star's distance from it (or its orbital speed) is inversely proportional to its mass, $M_1/M_2 = a_2/a_1 = v_2/v_1$.</p>
<div class="worked"><p>Sirius A and B orbit with $P = 50.1$ yr; the semi-major axis is 7.5″ and the parallax 0.379″. B is 2.1 times as far from the centre of mass as A. Find both masses.</p>
<p>$a = 7.5/0.379 = 19.8$ AU, $M_1 + M_2 = 19.8^3/50.1^2 = 3.1\ M_\odot$. With $M_A = 2.1M_B$: $M_B = 1.0$, $M_A = 2.1\ M_\odot$. A white dwarf with the Sun's mass, about Earth's size: a teaspoon of it weighs several tonnes.</p></div>` },
    2: { html: R`
<h3 class="sub">Reading a light curve</h3>
<p>The depths of the two eclipses compare the stars' surface brightnesses (temperatures): the deeper eclipse happens when the hotter star is hidden. The durations of ingress and egress give the radii relative to the orbit. Combined with spectroscopic velocities, which give the orbit's size in km, eclipsing binaries give absolute radii and masses, the gold standard for testing stellar models.</p>
<div class="worked"><p>In an eclipsing binary seen edge-on, the eclipse takes 10 hours from first to last contact, the flat bottom lasts 6 hours, the period is 5 days and the stars' relative speed is 200 km/s. Estimate the radii.</p>
<p>The small star crosses the edge of the large one in 2 hours: $2R_s = 200\cdot7200$ km, $R_s = 720\,000$ km ≈ 1.0 $R_\odot$. First to last contact covers $2(R_L + R_s) = 200\cdot36\,000$ km, so $R_L + R_s = 3.6\times10^6$ km and $R_L \approx 2.9\times10^6$ km ≈ 4.1 $R_\odot$.</p></div>
<p>Algol ("the demon star") dims every 2.87 days; its puzzling evolution led to the discovery of mass transfer.</p>` },
    3: { html: R`
<h3 class="sub">Mass transfer and its consequences</h3>
<p>Each star in a binary has a teardrop-shaped zone of gravitational control, its <strong>Roche lobe</strong>. When a star swells (as a giant) and overflows its lobe, gas streams through the inner Lagrangian point onto the companion, usually forming an <strong>accretion disc</strong>. This explains the <strong>Algol paradox</strong>: the less massive star is the more evolved, because it was once the more massive and has given away much of its mass.</p>
<p>Accretion onto compact objects is violent. Onto a white dwarf, it builds a layer of hydrogen that ignites in a <strong>nova</strong>; if the white dwarf is pushed towards 1.4 $M_\odot$, it detonates as a <strong>type Ia supernova</strong>, the standard candles of cosmology. Onto a neutron star or black hole, the disc heats to millions of degrees and shines in X-rays: Cygnus X-1 was the first black hole identified this way.</p>
<p>Two neutron stars or black holes in a tight orbit radiate <strong>gravitational waves</strong>, spiral in and merge. LIGO detected the first such merger in 2015; the 2017 neutron-star merger GW170817 was also seen in light, showing such collisions forge much of the universe's gold and platinum.</p>` }
  });

  X('astro-evolution', {
    0: { html: R`
<h3 class="sub">Collapse and the Jeans mass</h3>
<p>Stars form in cold (10–20 K), dense molecular clouds. A clump collapses if its gravity beats its thermal pressure, i.e. if its mass exceeds the <strong>Jeans mass</strong>, which grows with temperature and falls with density: $M_J \propto T^{3/2}\rho^{-1/2}$. Collapse is often triggered by a passing shock (a supernova, a spiral arm). Clouds fragment as they collapse, so stars are born in clusters.</p>
<p>A collapsing core heats up as gravitational energy is released, becoming a <strong>protostar</strong> wrapped in dust (visible only in the infrared) and fed by a disc, often launching jets. When the centre reaches about 10 million K, hydrogen fusion starts and the new star settles onto the <strong>zero-age main sequence</strong>. This takes about 50 million years for the Sun, but only 100 000 years for an O star.</p>
<div class="worked"><p>By the virial theorem, half the gravitational energy released heats the gas and half is radiated. Estimate how long the Sun could shine on gravitational contraction alone (the Kelvin–Helmholtz time).</p>
<p>$\tau \approx \dfrac{GM^2}{RL} = \dfrac{6.67\times10^{-11}(2\times10^{30})^2}{7\times10^8\cdot3.8\times10^{26}} \approx 10^{15}$ s ≈ 30 million years, far too short for the geological record. That puzzle pointed to a nuclear energy source.</p></div>` },
    1: { html: R`
<h3 class="sub">The Sun's future, stage by stage</h3>
<ol><li><strong>Main sequence</strong> (10 billion years): hydrogen burning in the core. The Sun is about halfway through and slowly brightening.</li>
<li><strong>Red giant branch</strong>: the core runs out of hydrogen, contracts and heats, while hydrogen burns in a shell around it; the envelope swells to over 100 times the Sun's radius, engulfing Mercury and Venus.</li>
<li><strong>Helium flash</strong> and <strong>horizontal branch</strong>: at 100 million K helium ignites (triple-alpha process: three ⁴He → ¹²C, then ¹²C + ⁴He → ¹⁶O), burning steadily for about 100 million years.</li>
<li><strong>Asymptotic giant branch</strong>: helium and hydrogen burn in shells around a carbon–oxygen core; pulsations and winds blow off the envelope.</li>
<li><strong>Planetary nebula</strong> and <strong>white dwarf</strong>: the ejected envelope glows, lit by the exposed core, for about 10 000 years; the core, Earth-sized, cools for ever.</li></ol>
<p>A white dwarf is held up by <strong>electron degeneracy pressure</strong> (the Pauli principle forbids the electrons from crowding further), not by heat. Above 1.4 $M_\odot$, the <strong>Chandrasekhar limit</strong>, degeneracy pressure cannot win.</p>` },
    2: { html: R`
<h3 class="sub">Onion shells and core collapse</h3>
<p>Stars above about 8 $M_\odot$ fuse ever heavier elements in shells: hydrogen, helium, carbon, neon, oxygen, silicon. Each stage is shorter: for a 25 $M_\odot$ star, hydrogen lasts 7 million years, helium 700 000 years, carbon 600 years, oxygen 6 months and silicon one day. The end is an iron core, from which no fusion can release energy (iron has the highest binding energy per nucleon).</p>
<p>When the iron core exceeds the Chandrasekhar mass it collapses in under a second, from Earth size to 20 km. Electrons and protons merge into neutrons, releasing a flood of neutrinos; the infalling layers rebound off the stiff neutron core, and the neutrinos drive the shock outward: a <strong>type II supernova</strong>, briefly outshining its galaxy.</p>
<div class="worked"><p>How much energy does the collapse release? (Core 1.4 $M_\odot$ shrinking to 10 km.)</p>
<p>$E \approx \dfrac{GM^2}{R} = \dfrac{6.67\times10^{-11}(2.8\times10^{30})^2}{10^4} \approx 5\times10^{46}$ J. About 99% leaves as neutrinos; just 1% powers the explosion, and 0.01% the light. Supernova 1987A's neutrino burst (24 neutrinos detected) confirmed the picture.</p></div>
<p>Supernovae and neutron-star mergers scatter the elements: the oxygen we breathe, the iron in our blood and the gold in jewellery were made in stars.</p>` },
    3: { html: R`
<h3 class="sub">Extreme objects</h3>
<p>A <strong>neutron star</strong> packs 1.4–2 $M_\odot$ into a sphere 20 km across, with the density of an atomic nucleus (a teaspoon weighs a billion tonnes), held up by neutron degeneracy and nuclear forces. Collapse spins it up (conserving angular momentum) and concentrates its magnetic field. Beams from its magnetic poles sweep past us like a lighthouse: a <strong>pulsar</strong>, discovered by Jocelyn Bell Burnell in 1967. The Crab pulsar spins 30 times a second; some "millisecond pulsars" spin 700 times, kept more accurate than atomic clocks.</p>
<p>Above about 2–3 $M_\odot$ nothing can stop the collapse, and a <strong>black hole</strong> forms. Its event horizon is at the <strong>Schwarzschild radius</strong> $R_s = 2GM/c^2$, about 3 km per solar mass: inside, escape would need more than the speed of light.</p>
<div class="worked"><p>Find the Schwarzschild radius of the Milky Way's central black hole, Sagittarius A* ($4.3\times10^6\ M_\odot$).</p>
<p>$3\ \text{km}\cdot4.3\times10^6 = 1.3\times10^7$ km, about 0.09 AU, smaller than Mercury's orbit. Its shadow was imaged by the Event Horizon Telescope in 2022.</p></div>` }
  });

  X('astro-milkyway', {
    0: { html: R`
<h3 class="sub">Our place in the Galaxy</h3>
<p>The Milky Way is a barred spiral about 30 kpc across, with 100–400 billion stars. Its parts: a thin <strong>disc</strong> (young stars, gas, dust, spiral arms) only about 300 pc thick; a central <strong>bulge</strong> and bar of older stars; and a vast, sparse <strong>halo</strong> of old stars, globular clusters and dark matter. The Sun lies in the disc, 8.2 kpc from the centre, orbiting at about 230 km/s.</p>
<div class="worked"><p>How long is a "galactic year", and how many orbits has the Sun completed?</p>
<p>$T = 2\pi r/v = 2\pi\cdot8.2\cdot3.086\times10^{19}/(2.3\times10^5) = 6.9\times10^{15}$ s ≈ 220 million years. In 4.6 billion years, about 20 orbits; the last time the Sun was here, dinosaurs were just appearing.</p></div>
<p>Herschel mapped the Galaxy by counting stars and concluded the Sun was near the centre; dust had hidden the rest. Shapley, using globular clusters (which avoid the dusty disc and swarm round the true centre), moved the centre to Sagittarius in 1918.</p>` },
    1: { html: R`
<h3 class="sub">Ageing a cluster</h3>
<p>All stars in a cluster formed together at the same distance, so its HR diagram shows stars of one age but many masses. Massive stars leave the main sequence first, so the <strong>turn-off point</strong> moves down the main sequence as the cluster ages; the turn-off mass gives the age through $\tau \propto M^{-2.5}$.</p>
<div class="worked"><p>A cluster's turn-off is at 2 $M_\odot$. How old is it?</p>
<p>$10^{10}\cdot2^{-2.5} = 1.8$ billion years. The Pleiades (turn-off about 6 $M_\odot$) are about 100 million years old; globular clusters (turn-off about 0.8 $M_\odot$) are 12–13 billion.</p></div>
<p><strong>Open clusters</strong> (dozens to thousands of young stars in the disc) slowly disperse. <strong>Globular clusters</strong> (100 000s of old stars, tightly bound, in the halo) are among the oldest objects known. Their stars are poor in heavy elements (<strong>Population II</strong>), made before many supernovae had enriched the gas; disc stars like the Sun are metal-rich <strong>Population I</strong>.</p>` },
    2: { html: R`
<h3 class="sub">Gas, dust and the 21 cm line</h3>
<p>The space between stars holds about 10% of the disc's mass, mostly hydrogen, in phases from cold molecular clouds (10 K, where stars form) through warm neutral gas to hot ionised bubbles (a million K, blown by supernovae). <strong>Dust</strong> (about 1% of the mass) absorbs and scatters starlight, dimming and <strong>reddening</strong> distant stars (blue light scatters more, as in a sunset); it re-emits the energy in the infrared.</p>
<p>Neutral hydrogen emits radio waves at 21 cm when the electron's spin flips relative to the proton's, a transition each atom makes once in about 10 million years. But there is so much hydrogen that the line is bright, and it passes through dust. Its Doppler shifts mapped the Galaxy's spiral arms and rotation in the 1950s.</p>
<p>Hot young stars ionise the gas around them into glowing <strong>H II regions</strong>, like the Orion Nebula, whose red light is the Balmer Hα line.</p>` },
    3: { html: R`
<h3 class="sub">The rotation curve problem</h3>
<p>If most of the Galaxy's mass were in the visible bulge and disc, stars far out should orbit slowly, as planets do: $v \propto 1/\sqrt r$. Instead, measurements of the 21 cm line show the <strong>rotation curve</strong> stays flat, about 220–230 km/s, out to the edge of the gas. Since $v^2 = GM(r)/r$, a flat curve means the enclosed mass $M(r)$ keeps growing in proportion to $r$, far beyond the light.</p>
<div class="worked"><p>What mass lies within 50 kpc if the rotation speed is still 220 km/s there?</p>
<p>$M = v^2r/G = (2.2\times10^5)^2\cdot1.54\times10^{21}/6.67\times10^{-11} = 1.1\times10^{42}$ kg $\approx 6\times10^{11}\ M_\odot$, several times the mass of all the stars and gas.</p></div>
<p>The extra mass is <strong>dark matter</strong>: it neither emits nor absorbs light and is detected only by its gravity, in galaxy rotation, galaxy clusters, gravitational lensing and the cosmic microwave background. It is not ordinary matter in disguise; most likely a still-undetected particle, sought in underground detectors and at the LHC.</p>` }
  });

  X('astro-galaxies', {
    0: { html: R`
<h3 class="sub">Hubble's tuning fork and beyond</h3>
<p><strong>Elliptical</strong> galaxies (E0–E7, by flattening) are smooth, red and old, with little gas; the largest, in the centres of clusters, hold trillions of stars. <strong>Spiral</strong> galaxies (Sa–Sc, by arm tightness and bulge size, barred SBa–SBc) have discs, gas and ongoing star formation. <strong>Lenticular</strong> S0 galaxies have discs without arms. <strong>Irregular</strong> galaxies like the Magellanic Clouds have no clear shape.</p>
<p>Spiral arms are not rigid: they are <strong>density waves</strong>, traffic jams that stars and gas move through. Gas compressed in the arms forms bright young stars that die before leaving, so the arms are outlined by blue stars and H II regions.</p>
<p>Galaxies grow by merging. The Milky Way and Andromeda (approaching at 110 km/s) will collide in about 4.5 billion years and probably form an elliptical; the stars, so far apart, will almost never hit each other.</p>` },
    1: { html: R`
<h3 class="sub">Climbing the ladder, rung by rung</h3>
<ol><li><strong>Radar</strong> and spacecraft give the AU.</li>
<li><strong>Parallax</strong> gives distances to stars up to several kpc (Gaia).</li>
<li><strong>Main-sequence fitting</strong>: comparing a cluster's main sequence with a nearby calibrated one.</li>
<li><strong>Cepheid variables</strong>: the period of pulsation predicts luminosity (Leavitt's law, 1912), useful to about 40 Mpc. Calibrated by parallax.</li>
<li><strong>Type Ia supernovae</strong>: nearly uniform peak luminosity, visible to billions of light-years. Calibrated in galaxies with Cepheids.</li>
<li><strong>Hubble's law</strong> for the most distant objects.</li></ol>
<p>Each rung calibrates the next, so errors propagate upward. Today's tension in the Hubble constant (about 73 km/s/Mpc from the ladder, 67 from the cosmic microwave background) may hide new physics or an unnoticed error.</p>
<div class="worked"><p>A Cepheid with a 10-day period has $M = -4.0$. In a galaxy it appears at $m = 24.0$. A type Ia supernova in the same galaxy peaked at $m = 8.7$. What was the supernova's peak absolute magnitude?</p>
<p>The Cepheid gives the distance modulus $24.0 - (-4.0) = 28.0$ (40 Mpc), so the supernova had $M = 8.7 - 28.0 = -19.3$. Calibrated this way in a few dozen galaxies, type Ia supernovae then measure distances a thousand times greater, where no Cepheid could be seen.</p></div>` },
    2: { html: R`
<h3 class="sub">Using Hubble's law</h3>
<div class="key"><p>$v = H_0d$, with $H_0 \approx 70$ km s⁻¹ Mpc⁻¹; for small redshifts $v \approx cz$. The <strong>Hubble time</strong> $1/H_0 \approx 14$ billion years estimates the age of the universe.</p></div>
<div class="worked"><p>A galaxy has $z = 0.023$. How far away is it?</p>
<p>$v = 0.023c = 6900$ km/s; $d = 6900/70 = 99$ Mpc, about 320 million light-years.</p></div>
<p>Hubble's law does not put us at the centre: in a uniformly expanding space, every observer sees all others receding with speed proportional to distance, like raisins in rising dough. Nearby galaxies have their own "peculiar" velocities (Andromeda approaches us), so Hubble's law is only reliable beyond about 10 Mpc.</p>` },
    3: { html: R`
<h3 class="sub">Quasars, clusters and gravitational lenses</h3>
<p><strong>Active galactic nuclei</strong> are powered by gas falling onto supermassive black holes: accretion can turn 10% of the infalling mass into radiation, far more efficient than fusion (0.7%). <strong>Quasars</strong>, the brightest, outshine their host galaxies a thousandfold from a region the size of the Solar System (their brightness varies in days). Different viewing angles of the same engine explain the zoo of AGN types (Seyferts, radio galaxies, blazars with jets pointing at us).</p>
<p><strong>Galaxy clusters</strong> are the largest bound structures: hundreds to thousands of galaxies, hot X-ray-emitting gas (holding more mass than the galaxies) and, mostly, dark matter. Zwicky first inferred dark matter in the Coma cluster in 1933.</p>
<p>Mass bends light (general relativity), so clusters act as <strong>gravitational lenses</strong>, producing arcs and multiple images of galaxies behind them. The bending angle for light grazing a mass $M$ at distance $b$ is $\dfrac{4GM}{c^2b}$, 1.75″ at the Sun's edge (confirmed in the 1919 eclipse). Lensing maps dark matter directly; the Bullet Cluster shows it separated from the hot gas after a collision.</p>` }
  });

  X('astro-cosmology', {
    0: { html: R`
<h3 class="sub">What expansion means</h3>
<p>Galaxies are not flying apart through space; space itself is stretching. We describe it with a <strong>scale factor</strong> $a(t)$ (equal to 1 today): all cosmic distances grow in proportion to $a$. Light stretches too, so its <strong>redshift</strong> measures how much the universe has grown since it was emitted:</p>
<div class="key"><p>$1 + z = \dfrac{\lambda_{\text{obs}}}{\lambda_{\text{emit}}} = \dfrac{1}{a(t_{\text{emit}})}$</p></div>
<p>A quasar at $z = 3$ emitted its light when the universe was a quarter of its present size. The most distant galaxies seen by JWST, at $z \approx 14$, show us the universe less than 300 million years after the Big Bang.</p>
<p>The <strong>cosmological principle</strong> (on large scales the universe is the same everywhere and in every direction) is supported by galaxy surveys and the near-perfect uniformity of the microwave background. It is what lets us describe the whole universe with one function $a(t)$.</p>` },
    1: { html: R`
<h3 class="sub">Density, curvature and fate</h3>
<p>The Friedmann equation, $H^2 = \dfrac{8\pi G}{3}\rho - \dfrac{kc^2}{a^2}$, balances the expansion rate against gravity. The <strong>critical density</strong> $\rho_c = \dfrac{3H^2}{8\pi G}$ makes space flat ($k = 0$); today it is about $9\times10^{-27}$ kg m⁻³, roughly 5 hydrogen atoms per cubic metre. Densities are quoted as fractions $\Omega = \rho/\rho_c$.</p>
<div class="worked"><p>Compute the critical density for $H_0 = 70$ km/s/Mpc.</p>
<p>$H_0 = 70\times10^3/3.086\times10^{22} = 2.27\times10^{-18}$ s⁻¹; $\rho_c = \dfrac{3(2.27\times10^{-18})^2}{8\pi\cdot6.67\times10^{-11}} = 9.2\times10^{-27}$ kg m⁻³.</p></div>
<p>Measurements give $\Omega_{\text{total}} = 1.00 \pm 0.002$: space is flat. The budget: ordinary matter about 5%, dark matter 27%, dark energy 68%. Each component dilutes differently as the universe grows: matter as $a^{-3}$, radiation as $a^{-4}$ (it is also redshifted), dark energy not at all. So radiation dominated first, then matter, and now dark energy.</p>` },
    2: { html: R`
<h3 class="sub">The evidence for a hot Big Bang</h3>
<ol><li><strong>Expansion</strong>: Hubble's law.</li>
<li><strong>The cosmic microwave background</strong>: 380 000 years after the beginning, the universe cooled to about 3000 K, electrons joined nuclei (recombination) and light flew free. Stretched by a factor of 1100, it now has a blackbody spectrum at 2.725 K, the most perfect blackbody ever measured, uniform to 1 part in 100 000.</li>
<li><strong>Light elements</strong>: in the first three minutes, fusion made about 25% helium by mass, plus traces of deuterium and lithium, exactly as observed in the oldest stars and gas.</li>
<li><strong>Evolution</strong>: distant (young) galaxies look different from nearby ones; quasars were commoner in the past.</li></ol>
<div class="worked"><p>Why does the CMB peak in microwaves?</p>
<p>Wien's law: $\lambda_{\max} = 2.898\times10^{-3}/2.725 = 1.06$ mm. Light emitted at about 1 μm (3000 K) has been stretched by 1100.</p></div>
<p>The tiny ripples in the CMB are the seeds of all structure: gravity amplified the slightly denser regions into the cosmic web of galaxies. Their pattern of sizes pins down the age (13.8 billion years) and the contents of the universe with percent precision.</p>` },
    3: { html: R`
<h3 class="sub">Acceleration and dark energy</h3>
<p>In 1998 two teams found that distant type Ia supernovae are about 25% fainter than expected in a universe slowed by gravity: the expansion is <strong>accelerating</strong>, and has been for about 5 billion years (Nobel prize 2011). Something with negative pressure, <strong>dark energy</strong>, drives it. The simplest candidate is Einstein's cosmological constant Λ, the energy of empty space itself, whose density stays constant as space grows; quantum theory predicts a value about $10^{120}$ times too big, the worst prediction in physics.</p>
<p>The standard model of cosmology, ΛCDM (Λ plus cold dark matter), fits the CMB, galaxy clustering and supernovae with just six parameters. If dark energy is a true constant, the future is a "big freeze": distant galaxies will accelerate beyond our horizon, leaving only our merged Local Group visible, as stars burn out over trillions of years.</p>
<div class="worked"><p>Why does inflation, a burst of accelerated expansion in the first $10^{-32}$ s, explain why the CMB is so uniform?</p>
<p>Without it, opposite sides of the sky would never have been in contact. Inflation stretched a tiny, already-uniform region to larger than our whole observable universe, smoothing and flattening it, and quantum fluctuations stretched with it became the ripples we see.</p></div>` }
  });
})();
