/* Astronomy: a third batch of problems (one concept, one core, one olympiad per chapter). Answers are computed in code. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3).replace(/^(-?[0-9.]+)e(-?[0-9]+)$/, '$1\\times10^{$2}'), X = PB.addProblems, rad = Math.PI / 180, G = 6.674e-11, Msun = 1.989e30, pc = 3.086e16;
  const M = (level, title, q, options, answer, hint, sol) => ({ level: level, type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: [hint], solution: '<p>' + sol + '</p>' });
  const N = (level, title, q, answer, unit, hint, sol, tol) => ({ level: level, type: 'num', title: title, q: '<p>' + q + '</p>', answer: answer, tol: tol || 0.02, unit: unit, hints: [hint], solution: '<p>' + sol + '</p>' });

  X('astro-sphere', [
    M('concept', 'Pole star', R`The altitude of the north celestial pole above the horizon equals…`, ['your longitude', 'your latitude', '90° minus your latitude', '23.4°'], 1, R`At the North Pole it is overhead.`, R`Your latitude.`),
    N('core', 'Highest altitude', R`From latitude 50° N, what is the highest altitude reached by a star of declination +20°?`, 60, '°', R`Upper culmination: $h = 90^\circ - \varphi + \delta$.`, R`$90 - 50 + 20 = 60^\circ$.`),
    N('olympiad', 'Circumpolar limit', R`From latitude 35° N, what is the smallest declination a star can have and still be circumpolar?`, 55, '°', R`Its lower culmination must be above the horizon.`, R`$\delta > 90^\circ - \varphi = 55^\circ$.`)
  ]);
  const H = Math.acos(-Math.tan(52 * rad) * Math.tan(23.44 * rad)) / rad;
  X('astro-time', [
    M('concept', 'Sidereal day', R`Why is a sidereal day about 4 minutes shorter than a solar day?`, ['Earth’s rotation is slowing', 'Earth moves along its orbit, so it must turn a little extra to face the Sun again', 'The Moon’s tides', 'Time zones'], 1, R`About 1° of orbit per day.`, R`Earth moves about 1° round the Sun each day, so it needs about 4 extra minutes of rotation to bring the Sun back to the meridian.`),
    N('core', 'Midsummer noon', R`What is the Sun's altitude at noon on the June solstice from latitude 40° N? (Obliquity 23.44°.)`, 90 - 40 + 23.44, '°', R`$h = 90^\circ - \varphi + \delta_\odot$.`, R`$90 - 40 + 23.44 = ${f(73.44, 4)}^\circ$.`),
    N('olympiad', 'Longest day', R`Ignoring refraction and the Sun's size, how long (hours) is the longest day at latitude 52° N?`, 2 * H / 15, 'h', R`Sunset hour angle: $\cos H = -\tan\varphi\tan\delta$.`, R`$H = ${f(H)}^\circ$, day length $= 2H/15 = ${f(2 * H / 15)}$ h.`)
  ]);
  const syn = 1 / (1 / 27.32 - 1 / 365.25), tide = 7.35e22 / Msun * Math.pow(1.496e11 / 3.844e8, 3);
  X('astro-moon', [
    M('concept', 'Lunar eclipse phase', R`A lunar eclipse can only happen at…`, ['new moon', 'first quarter', 'full moon', 'any phase'], 2, R`Earth must be between the Sun and the Moon.`, R`Full moon, and only when it is near a node of its orbit.`),
    N('core', 'Synodic month', R`The sidereal month is 27.32 days and the year 365.25 days. Find the synodic month.`, syn, 'days', R`$1/S = 1/P_{\text{sid}} - 1/P_{\text{year}}$.`, R`$S = ${f(syn, 4)}$ days.`),
    N('olympiad', 'Moon vs Sun tides', R`How many times larger is the Moon's tidal effect on Earth than the Sun's? Moon mass 7.35×10²² kg at 3.844×10⁸ m; Sun 1.989×10³⁰ kg at 1.496×10¹¹ m.`, tide, '', R`Tidal acceleration $\propto M/d^3$.`, R`Ratio $= \dfrac{M_m}{M_s}\left(\dfrac{d_s}{d_m}\right)^3 = ${f(tide)}$.`)
  ]);
  const dm = 5 * Math.log10(8000 / 7);
  X('astro-telescopes', [
    M('concept', 'Light grasp', R`Doubling a telescope's aperture multiplies its light-gathering power by…`, ['2', '4', '8', '√2'], 1, R`It is proportional to area.`, R`4, since area $\propto D^2$.`),
    N('core', 'Magnification', R`A telescope has a 1200 mm objective and a 25 mm eyepiece. What is its magnification?`, 48, '×', R`$M = f_{\text{obj}}/f_{\text{eye}}$.`, R`$1200/25 = 48$.`),
    N('olympiad', 'Fainter by', R`How many magnitudes fainter can an 8.0 m telescope see than a 7.0 mm dark-adapted eye (same detector efficiency)?`, dm, 'mag', R`$\Delta m = 2.5\log(D_1^2/D_2^2)$.`, R`$5\log(8000/7) = ${f(dm)}$ mag.`)
  ]);
  const aH = (1 + 1.524) / 2, tH = 0.5 * Math.pow(aH, 1.5) * 365.25;
  X('astro-kepler', [
    M('concept', 'Speed at perihelion', R`By Kepler's second law, a planet moves fastest…`, ['at aphelion', 'at perihelion', 'at the ends of the minor axis', 'uniformly'], 1, R`Equal areas in equal times.`, R`At perihelion, where it is closest to the Sun.`),
    N('core', 'Asteroid period', R`An asteroid orbits at a semi-major axis of 2.8 AU. What is its period in years?`, Math.pow(2.8, 1.5), 'yr', R`$P^2 = a^3$.`, R`$2.8^{1.5} = ${f(Math.pow(2.8, 1.5))}$ yr.`),
    N('olympiad', 'Hohmann to Mars', R`How many days does a Hohmann transfer from Earth (1 AU) to Mars (1.524 AU) take?`, tH, 'days', R`The transfer ellipse has $a = (r_1 + r_2)/2$; the trip is half an orbit.`, R`$a = ${f(aH, 4)}$ AU, time $= \tfrac12a^{1.5}$ yr $= ${f(tH)}$ days.`)
  ]);
  const TMars = 278.6 * Math.pow(0.75, 0.25) / Math.sqrt(1.524), roche = 2.44 * 58232 * Math.cbrt(687 / 900);
  X('astro-planets', [
    M('concept', 'Hottest planet', R`Why is Venus hotter than Mercury?`, ['It is closer to the Sun', 'Its thick CO₂ atmosphere traps heat (greenhouse effect)', 'It has active volcanoes heating it', 'It rotates fastest'], 1, R`Mercury is closer but airless.`, R`A runaway greenhouse effect in its 92-bar CO₂ atmosphere keeps it at about 740 K.`),
    N('core', 'Mars temperature', R`A fast-rotating black body at 1 AU has equilibrium temperature 278.6 K. Find Mars's equilibrium temperature (albedo 0.25, 1.524 AU).`, TMars, 'K', R`$T \propto (1 - A)^{1/4}d^{-1/2}$.`, R`$T = 278.6 \times 0.75^{0.25}/\sqrt{1.524} = ${f(TMars)}$ K.`),
    N('olympiad', 'Saturn’s Roche limit', R`Using the fluid Roche limit $d = 2.44R(\rho_P/\rho_m)^{1/3}$, find the distance (km) at which an icy moon ($\rho = 900$ kg/m³) would break up near Saturn ($R = 58\,232$ km, $\rho = 687$ kg/m³).`, roche, 'km', R`Plug in.`, R`$d = ${f(roche)}$ km; the main rings lie inside this.`)
  ]);
  const Mast = 4 / 3 * Math.PI * 1e12 * 2000, vesc = Math.sqrt(2 * G * Mast / 1e4);
  X('astro-smallbodies', [
    M('concept', 'Comet tail', R`A comet's ion tail always points…`, ['along its orbit, behind it', 'away from the Sun', 'towards the Sun', 'towards Earth'], 1, R`The solar wind pushes it.`, R`Away from the Sun, even when the comet is moving outwards.`),
    N('core', 'Jumping off', R`What is the escape speed from a spherical asteroid of radius 10 km and density 2000 kg/m³?`, vesc, 'm/s', R`$v = \sqrt{2GM/R}$.`, R`$M = ${f(Mast)}$ kg, $v = ${f(vesc)}$ m/s: you could not jump off, but a thrown ball could.`),
    N('olympiad', 'Rocket equation', R`A rocket with exhaust speed 4.4 km/s needs Δv = 9.4 km/s to reach low orbit. What initial-to-final mass ratio does it need (single stage)?`, Math.exp(9.4 / 4.4), '', R`$\Delta v = v_e\ln(m_0/m_f)$.`, R`$m_0/m_f = e^{9.4/4.4} = ${f(Math.exp(9.4 / 4.4))}$, which is why rockets have stages.`)
  ]);
  const depth = Math.pow(69911 / 695700, 2) * 100, Krv = 1.898e27 / Msun * 13070;
  X('astro-exoplanets', [
    M('concept', 'Transit method', R`A transit light curve directly measures the planet's…`, ['mass', 'radius relative to the star', 'temperature', 'orbital eccentricity'], 1, R`The dip depth is an area ratio.`, R`Its radius relative to the star's, from depth $= (R_p/R_\star)^2$.`),
    N('core', 'Jupiter transit', R`What fractional dip (%) would Jupiter (radius 69 911 km) cause transiting the Sun (695 700 km)?`, depth, '%', R`Depth $= (R_p/R_\star)^2$.`, R`$${f(depth)}\%$.`),
    N('olympiad', 'Solar wobble', R`Jupiter orbits at 13.07 km/s. What is the amplitude of the Sun's reflex radial velocity (m/s) for an edge-on observer? Jupiter's mass is 1.898×10²⁷ kg.`, Krv, 'm/s', R`Momentum balance about the centre of mass.`, R`$v_\odot = (M_J/M_\odot)v_J = ${f(Krv)}$ m/s.`)
  ]);
  X('astro-magnitudes', [
    M('concept', 'Magnitude scale', R`Star A has magnitude 1 and star B magnitude 6. Which is brighter, and by how much?`, ['B, 5×', 'A, 100×', 'A, 5×', 'B, 100×'], 1, R`Smaller magnitude is brighter; 5 magnitudes is a factor 100.`, R`A, 100 times brighter.`),
    N('core', 'Distance modulus', R`A star has apparent magnitude 10 and absolute magnitude 0. How far away is it?`, 1000, 'pc', R`$m - M = 5\log(d/10\text{ pc})$.`, R`$\log(d/10) = 2$, so $d = 1000$ pc.`),
    N('olympiad', 'Unresolved pair', R`Two stars of magnitude 3.0 appear as one point. What is their combined magnitude?`, 3 - 2.5 * Math.log10(2), '', R`Add fluxes, not magnitudes.`, R`$m = 3.0 - 2.5\log2 = ${f(3 - 2.5 * Math.log10(2))}$.`)
  ]);
  const vth = Math.sqrt(2 * 1.381e-23 * 1e4 / 1.674e-27), dl = 656.3 * vth / 3e8;
  X('astro-spectra', [
    M('concept', 'Absorption lines', R`The dark absorption lines in a star's spectrum form…`, ['in the core', 'in cooler gas above the photosphere', 'in Earth’s atmosphere only', 'in the interstellar medium only'], 1, R`Kirchhoff's laws.`, R`In the cooler outer layers in front of the hotter photosphere.`),
    N('core', 'Receding galaxy', R`Hα (rest 656.3 nm) is observed at 662.9 nm. What is the recession speed in km/s?`, 3e5 * 6.6 / 656.3, 'km/s', R`$v = cz$ for small $z$.`, R`$z = 6.6/656.3$, $v = ${f(3e5 * 6.6 / 656.3)}$ km/s.`),
    N('olympiad', 'Thermal broadening', R`Estimate the thermal Doppler width $\Delta\lambda = \lambda v/c$ of Hα in a 10 000 K hydrogen gas, using $v = \sqrt{2kT/m}$. Answer in nm.`, dl, 'nm', R`$m_H = 1.674\times10^{-27}$ kg.`, R`$v = ${f(vth / 1000)}$ km/s, $\Delta\lambda = ${f(dl)}$ nm.`)
  ]);
  X('astro-hr', [
    M('concept', 'Main sequence', R`Stars on the main sequence are…`, ['fusing hydrogen in their cores', 'fusing helium in their cores', 'contracting without fusion', 'white dwarfs'], 0, R`It is the longest stage.`, R`Fusing hydrogen into helium in their cores.`),
    N('core', 'Twice as hot', R`A star has the Sun's radius but twice its surface temperature. How many times more luminous is it?`, 16, '×', R`$L = 4\pi R^2\sigma T^4$.`, R`$2^4 = 16$.`),
    N('olympiad', 'Massive star lifetime', R`If main-sequence lifetime scales as $M^{-2.5}$ and the Sun's is 10 billion years, how long does a 10 M☉ star last, in millions of years?`, 1e4 * Math.pow(10, -2.5), 'Myr', R`$t = 10^{10}\text{ yr}\times(M/M_\odot)^{-2.5}$.`, R`$10^{10}\times10^{-2.5} = ${f(1e4 * Math.pow(10, -2.5))}$ Myr.`)
  ]);
  const Mtot = 864000 * Math.pow(6e4, 3) / (2 * Math.PI * G) / Msun;
  X('astro-binaries', [
    M('concept', 'Eclipsing binaries', R`Eclipsing binaries are especially valuable because they give…`, ['distances directly', 'stellar radii and, with radial velocities, masses', 'ages', 'metallicities'], 1, R`The eclipse durations depend on sizes.`, R`Radii from eclipse timing and, with a velocity curve, absolute masses since $i \approx 90^\circ$.`),
    N('core', 'Binary mass', R`A visual binary has a semi-major axis of 10 AU and a period of 20 years. What is the total mass in solar masses?`, 1000 / 400, 'M☉', R`$M = a^3/P^2$.`, R`$1000/400 = 2.5$ M☉.`),
    N('olympiad', 'Spectroscopic masses', R`An eclipsing double-lined binary has $P = 10.0$ days and velocity amplitudes 20 and 40 km/s on circular orbits. Find the total mass in M☉.`, Mtot, 'M☉', R`$M = \dfrac{P(K_1 + K_2)^3}{2\pi G}$ for $i = 90^\circ$.`, R`$M = \dfrac{864\,000\times(60\,000)^3}{2\pi G} = ${f(Mtot)}$ M☉, split 2 : 1 (the slower star is heavier).`)
  ]);
  const dmH = (4 * 1.007825 - 4.002603) * 931.5, Pns = 30 * 86400 * Math.pow(10 / 7000, 2);
  X('astro-evolution', [
    M('concept', 'White dwarfs', R`What supports a white dwarf against gravity?`, ['Thermal gas pressure', 'Radiation pressure', 'Electron degeneracy pressure', 'Neutron degeneracy pressure'], 2, R`No fusion is happening.`, R`Electron degeneracy pressure, up to the Chandrasekhar limit (about 1.4 M☉).`),
    N('core', 'Hydrogen burning', R`Find the energy released (MeV) when four hydrogen atoms (1.007825 u) become one helium-4 atom (4.002603 u).`, dmH, 'MeV', R`1 u = 931.5 MeV.`, R`$\Delta m = ${f(4 * 1.007825 - 4.002603, 4)}$ u, energy ${f(dmH, 4)} MeV (0.7% of the mass).`),
    N('olympiad', 'Spinning up', R`A stellar core of radius 7000 km rotates once in 30 days. It collapses to a 10 km neutron star, conserving angular momentum (uniform sphere both times). What is the new period, in seconds?`, Pns, 's', R`$P \propto R^2$.`, R`$P = 30\text{ d}\times(10/7000)^2 = ${f(Pns)}$ s. Real cores spin faster; many pulsars spin in milliseconds.`)
  ]);
  const Psun = 2 * Math.PI * 8.2 * pc / 230 / 3.156e13, Mgal = Math.pow(2.3e5, 2) * 8.2e3 * pc / G / Msun / 1e10;
  X('astro-milkyway', [
    M('concept', 'Where we are', R`The Sun lies…`, ['at the centre of the Galaxy', 'in the disc, about 8 kpc from the centre', 'in the halo', 'in the central bulge'], 1, R`We look towards Sagittarius to see the centre.`, R`In the disc, about 8 kpc from the centre, near the Orion spur.`),
    N('core', 'Galactic year', R`The Sun orbits at 230 km/s at 8.2 kpc from the Galactic centre. Find its orbital period in millions of years (1 pc = 3.086×10¹³ km).`, Psun, 'Myr', R`$P = 2\pi R/v$.`, R`$P = ${f(Psun)}$ Myr.`),
    N('olympiad', 'Mass inside the orbit', R`Using $M = v^2R/G$ with $v = 230$ km/s and $R = 8.2$ kpc, estimate the mass inside the Sun's orbit in units of $10^{10}$ M☉.`, Mgal, '× 10¹⁰ M☉', R`Assume a spherical mass distribution.`, R`$M = ${f(Mgal)}\times10^{10}$ M☉.`)
  ]);
  const ang = 30e3 / 100e6 / rad * 3600;
  X('astro-galaxies', [
    M('concept', 'Standard candles', R`Cepheid variables are useful distance indicators because…`, ['they are all the same colour', 'their pulsation period reveals their luminosity', 'they never vary', 'they are always in binaries'], 1, R`Henrietta Leavitt.`, R`Of the period–luminosity relation.`),
    N('core', 'Hubble distance', R`A galaxy recedes at 7000 km/s. With $H_0 = 70$ km/s/Mpc, how far is it?`, 100, 'Mpc', R`$d = v/H_0$.`, R`$7000/70 = 100$ Mpc.`),
    N('olympiad', 'Angular size', R`A galaxy 30 kpc across is 100 Mpc away. What angle does it subtend, in arcseconds?`, ang, '″', R`Small-angle formula.`, R`$\theta = 3\times10^{-4}$ rad $= ${f(ang)}''$.`)
  ]);
  const H0 = 70 / 3.086e19, rhoc = 3 * H0 * H0 / (8 * Math.PI * G);
  X('astro-cosmology', [
    M('concept', 'CMB', R`The cosmic microwave background is…`, ['starlight from the first galaxies', 'radiation from recombination, redshifted by expansion', 'emission from dust in the Milky Way', 'radio noise from Earth'], 1, R`It dates from about 380 000 years after the Big Bang.`, R`Radiation released when the universe became transparent (recombination), redshifted by a factor of about 1100.`),
    N('core', 'Early temperature', R`The CMB is now at 2.725 K. What was its temperature at redshift z = 1100?`, 2.725 * 1101, 'K', R`$T \propto 1 + z$.`, R`$2.725 \times 1101 = ${f(2.725 * 1101)}$ K, near the temperature at which hydrogen recombines.`),
    N('olympiad', 'Critical density', R`With $H_0 = 70$ km/s/Mpc, find the critical density in hydrogen atoms per cubic metre ($m_H = 1.674\times10^{-27}$ kg).`, rhoc / 1.674e-27, 'atoms/m³', R`$\rho_c = 3H_0^2/8\pi G$.`, R`$\rho_c = ${f(rhoc)}$ kg/m³, about ${f(rhoc / 1.674e-27)} hydrogen atoms per cubic metre.`)
  ]);
})();
