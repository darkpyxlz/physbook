(function () {
  const R = PB.R;
  const G = 6.674e-11, c = 2.998e8, Msun = 1.989e30;
  PB.addChapter({
    id: 'astrophysics', num: 23, part: 'Olympiad Extensions',
    title: 'Astrophysics and Cosmology',
    subtitle: R`Physics at the largest scales: how starlight reveals temperature, size and distance; how stars balance and die; how exoplanets are found; and how the expanding universe began.`,
    goals: ['Relate luminosity, temperature and radius', 'Use magnitudes and parallax', 'Estimate stellar interiors from equilibrium', 'Analyse transits and radial velocities', 'Apply Hubble’s law and cosmological estimates'],
    sections: [
      {
        title: 'Light from stars',
        html: R`
<p>Stars radiate roughly as black bodies. A star of radius $R$ and surface temperature $T$ has luminosity (total power)</p>
<div class="key">$$L = 4\pi R^2\sigma T^4,\qquad \lambda_{\max}T = 2.898\times10^{-3}\ \mathrm{m\,K}.$$</div>
<p>At distance $d$ we receive the flux $F = L/(4\pi d^2)$. Astronomers measure brightness in <strong>magnitudes</strong>, a logarithmic scale where larger numbers are fainter: $m_1 - m_2 = -2.5\log_{10}(F_1/F_2)$, so 5 magnitudes is a factor of exactly 100.</p>
<p>Nearby distances come from <strong>parallax</strong>: as Earth orbits, a star shifts by an angle $p$. A star at 1 parsec shows a parallax of 1 arcsecond, so $d\,(\mathrm{pc}) = 1/p\,(\mathrm{arcsec})$. One parsec is 3.26 light-years.</p>`
      },
      {
        title: 'Inside stars',
        html: R`
<p>A star is a ball of gas in <strong>hydrostatic equilibrium</strong>: at every radius, pressure pushes out exactly as hard as gravity pulls in, $\dd P/\dd r = -G M(r)\rho/r^2$.</p>
<p>A quick estimate of the central temperature comes from the virial theorem: the thermal energy of a particle is of order its gravitational binding energy, $k_BT \sim GMm_p/R$. For the Sun this gives about $2\times10^7\ \mathrm K$, close to the true $1.5\times10^7\ \mathrm K$ and hot enough for fusion (with tunnelling).</p>
<p>The Hertzsprung–Russell diagram (luminosity against temperature) shows most stars on the <strong>main sequence</strong>, burning hydrogen, with $L \propto M^{3.5}$ roughly. Massive stars are far brighter and burn out far faster.</p>
<p>When fuel runs out, stars end as:</p>
<ul>
<li><strong>White dwarfs</strong>, held up by electron degeneracy pressure, up to about $1.4M_\odot$ (the Chandrasekhar limit).</li>
<li><strong>Neutron stars</strong>, held up by neutron degeneracy, about $20\ \mathrm{km}$ across.</li>
<li><strong>Black holes</strong>, when nothing can resist gravity. Light cannot escape from inside the Schwarzschild radius $r_s = 2GM/c^2$.</li>
</ul>`
      },
      {
        title: 'Binaries and exoplanets',
        html: R`
<p>Two bodies orbit their common centre of mass, so a star with a planet wobbles. The star's speed is tiny but measurable through the Doppler shift of its spectrum: the <strong>radial-velocity method</strong>. Momentum balance gives $M_\star v_\star = m_pv_p$.</p>
<p>If the orbit is edge-on, the planet passes in front of its star and blocks a fraction of the light: the <strong>transit method</strong>. The fractional dip is</p>
<div class="key">$$\frac{\Delta F}{F} \approx \left(\frac{R_p}{R_\star}\right)^2.$$</div>
<p>A Jupiter in front of the Sun gives a 1% dip; an Earth only 0.008%. Combining a transit (radius) with radial velocities (mass) gives the planet's density, telling rocky worlds from gas giants.</p>`
      },
      {
        title: 'Cosmology',
        html: R`
<p>Distant galaxies are receding with speeds proportional to their distances: <strong>Hubble's law</strong>,</p>
<div class="key">$$v = H_0d,\qquad H_0 \approx 70\ \mathrm{km\,s^{-1}\,Mpc^{-1}}.$$</div>
<p>Running the expansion backwards suggests a beginning roughly $1/H_0 \approx 14$ billion years ago. The redshift $z = \Delta\lambda/\lambda$ of a distant galaxy measures how much the universe has stretched since the light left: $1 + z = a_{\text{now}}/a_{\text{then}}$.</p>
<p>The early universe was hot and dense. When it cooled to about $3000\ \mathrm K$, electrons and protons combined into atoms and light streamed free. That light, stretched by a factor of about 1100, is the <strong>cosmic microwave background</strong> at $2.725\ \mathrm K$ today.</p>
<p>Whether the universe is spatially flat depends on its density compared with the <strong>critical density</strong> $\rho_c = 3H_0^2/(8\pi G)$, a few hydrogen atoms per cubic metre. Observations show it is very close to flat, with most of the energy in dark matter and dark energy.</p>
<div class="insight"><p>Astrophysics problems at IPhO reward order-of-magnitude reasoning. Most quantities can be estimated with balance arguments (pressure against gravity, heating against radiation) and a handful of constants. Write the balance, drop factors of order one, and check the answer against a known star.</p></div>`
      }
    ],
    labs: [
      { sim: 'blackbody', title: 'Blackbody spectrum', desc: 'The Planck spectrum at temperature T, with the visible band shaded and the perceived colour shown.',
        tasks: ['Lower T to 3000 K. Where is the peak, and what colour does the star appear?', 'At what temperature does the peak sit in the middle of the visible band?', 'Double the temperature. By what factor does σT⁴ grow? Check the readout.'] },
      { sim: 'transit', title: 'Exoplanet transit', desc: 'A planet crosses its star and the light curve records the dip.',
        tasks: ['Compare the dip depth with (R<sub>p</sub>/R<sub>*</sub>)².', 'Turn limb darkening off and on. How does the shape of the bottom of the dip change?', 'Increase the impact parameter past 1. What happens to the transit?'] }
    ],
    formulas: [
      ['Luminosity', R`L = 4\pi R^2\sigma T^4`],
      ['Flux at distance d', R`F = L/(4\pi d^2)`],
      ['Magnitudes', R`m_1 - m_2 = -2.5\log_{10}(F_1/F_2)`],
      ['Parallax distance', R`d\,(\mathrm{pc}) = 1/p\,(\mathrm{arcsec})`],
      ['Hydrostatic equilibrium', R`\dd P/\dd r = -GM(r)\rho/r^2`],
      ['Virial temperature estimate', R`k_BT \sim GMm_p/R`],
      ['Schwarzschild radius', R`r_s = 2GM/c^2`],
      ['Transit depth', R`\Delta F/F \approx (R_p/R_\star)^2`],
      ['Hubble’s law', R`v = H_0 d`],
      ['Redshift', R`1 + z = a_{\text{now}}/a_{\text{then}}`],
      ['Critical density', R`\rho_c = 3H_0^2/(8\pi G)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Twice the size',
        q: R`<p>Two stars have the same surface temperature, but one has twice the radius. Its luminosity is:</p>`,
        options: ['The same', 'Twice as large', 'Four times as large', 'Sixteen times as large'], answer: 2,
        hints: [R`$L \propto R^2T^4$.`],
        solution: R`<p>$L \propto R^2$ at fixed $T$, so the larger star is 4 times as luminous.</p>` },
      { level: 'concept', type: 'mcq', title: 'Magnitude scale',
        q: R`<p>Star A has apparent magnitude 2 and star B has magnitude 7. Which is true?</p>`,
        options: ['A is 100 times brighter than B', 'B is 100 times brighter than A', 'A is 5 times brighter than B', 'They have the same luminosity'], answer: 0,
        hints: [R`Smaller magnitude means brighter; 5 magnitudes is a factor of 100.`],
        solution: R`<p>A is 5 magnitudes brighter, which is exactly a factor of 100 in flux. (Their luminosities depend also on their distances.)</p>` },
      { level: 'concept', type: 'mcq', title: 'Cosmological redshift',
        q: R`<p>Light from very distant galaxies is redshifted mainly because:</p>`,
        options: ['The galaxies are cooler than nearby ones', 'Space has expanded while the light travelled', 'Dust absorbs blue light', 'Gravity of our own galaxy slows the light'], answer: 1,
        hints: [R`$1 + z$ equals the ratio of the universe's size now and then.`],
        solution: R`<p>Wavelengths stretch along with space. For nearby galaxies this looks like a Doppler shift, $z \approx v/c$, but at large distances it is really the expansion.</p>` },
      { level: 'core', type: 'num', title: "The Sun's power",
        q: R`<p>The Sun has radius $6.957\times10^8\ \mathrm m$ and surface temperature $5772\ \mathrm K$. Find its luminosity. ($\sigma = 5.670\times10^{-8}\ \mathrm{W\,m^{-2}K^{-4}}$)</p>`,
        answer: 4 * Math.PI * Math.pow(6.957e8, 2) * 5.670e-8 * Math.pow(5772, 4), tol: 0.01, unit: 'W',
        hints: [R`$L = 4\pi R^2\sigma T^4$.`],
        solution: R`<p>$L = 4\pi(6.957\times10^8)^2(5.670\times10^{-8})(5772)^4 = 3.83\times10^{26}\ \mathrm W$.</p>` },
      { level: 'core', type: 'num', title: 'Parallax',
        q: R`<p>A star has a parallax of $0.25$ arcseconds. How far away is it in parsecs?</p>`,
        answer: 4, tol: 0.01, unit: 'pc',
        hints: [R`$d = 1/p$.`],
        solution: R`<p>$d = 1/0.25 = 4.0\ \mathrm{pc}$, about 13 light-years.</p>` },
      { level: 'core', type: 'num', title: 'Black hole size',
        q: R`<p>Find the Schwarzschild radius of a 10-solar-mass black hole, in kilometres. ($M_\odot = 1.989\times10^{30}\ \mathrm{kg}$)</p>`,
        answer: 2 * G * 10 * Msun / (c * c) / 1000, tol: 0.01, unit: 'km',
        hints: [R`$r_s = 2GM/c^2$.`],
        solution: R`<p>$r_s = 2(6.674\times10^{-11})(1.989\times10^{31})/(2.998\times10^8)^2 = 29.5\ \mathrm{km}$, about 3 km per solar mass.</p>` },
      { level: 'core', type: 'num', title: 'Age from Hubble',
        q: R`<p>Estimate the Hubble time $1/H_0$ in billions of years for $H_0 = 70\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$. ($1\ \mathrm{Mpc} = 3.086\times10^{19}\ \mathrm{km}$, 1 year $= 3.156\times10^7\ \mathrm s$)</p>`,
        answer: 3.086e19 / 70 / 3.156e7 / 1e9, tol: 0.01, unit: 'Gyr',
        hints: [R`Convert $H_0$ to s⁻¹ by dividing by the number of km in a Mpc.`],
        solution: R`<p>$1/H_0 = 3.086\times10^{19}/70\ \mathrm s = 4.41\times10^{17}\ \mathrm s = 14.0\ \mathrm{Gyr}$. The measured age, 13.8 Gyr, is close because deceleration and acceleration of the expansion nearly cancel.</p>` },
      { level: 'core', type: 'num', title: 'Jupiter transit',
        q: R`<p>What fractional dip in the Sun's brightness would a distant observer see as Jupiter ($R = 7.15\times10^7\ \mathrm m$) transits? ($R_\odot = 6.96\times10^8\ \mathrm m$.) Give it in percent.</p>`,
        answer: 100 * Math.pow(7.15e7 / 6.96e8, 2), tol: 0.01, unit: '%',
        hints: [R`$(R_p/R_\star)^2$.`],
        solution: R`<p>$(7.15/69.6)^2 = 0.0106$, about a 1.06% dip.</p>` },
      { level: 'olympiad', type: 'num', title: "The Sun's wobble",
        q: R`<p>Jupiter ($1.898\times10^{27}\ \mathrm{kg}$) orbits the Sun ($1.989\times10^{30}\ \mathrm{kg}$) at $13.07\ \mathrm{km/s}$. What is the Sun's orbital speed about their common centre of mass, in m/s?</p>`,
        answer: 1.898e27 / 1.989e30 * 13070, tol: 0.01, unit: 'm/s',
        hints: [R`Both bodies share the same period and the total momentum is zero.`],
        solution: R`<p>$v_\odot = (m_J/M_\odot)v_J = 9.54\times10^{-4}\times13\,070 = 12.5\ \mathrm{m/s}$, about walking pace. Modern spectrographs detect wobbles below $1\ \mathrm{m/s}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'How hot is the core?',
        q: R`<p>Estimate the Sun's central temperature from $k_BT \approx GMm_p/R$, with $M = 1.989\times10^{30}\ \mathrm{kg}$, $R = 6.957\times10^8\ \mathrm m$, $m_p = 1.673\times10^{-27}\ \mathrm{kg}$.</p>`,
        answer: G * Msun * 1.673e-27 / (1.381e-23 * 6.957e8), tol: 0.02, unit: 'K',
        hints: [R`Just substitute; the point is the order of magnitude.`],
        solution: R`<p>$T \approx \dfrac{(6.674\times10^{-11})(1.989\times10^{30})(1.673\times10^{-27})}{(1.381\times10^{-23})(6.957\times10^8)} = 2.3\times10^7\ \mathrm K$. Detailed models give $1.57\times10^7\ \mathrm K$; a one-line balance argument lands within a factor of 1.5.</p>` },
      { level: 'olympiad', type: 'num', title: 'Critical density',
        q: R`<p>Find the critical density of the universe, $\rho_c = 3H_0^2/(8\pi G)$, for $H_0 = 70\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$. ($1\ \mathrm{Mpc} = 3.086\times10^{22}\ \mathrm m$)</p>`,
        answer: 3 * Math.pow(70e3 / 3.086e22, 2) / (8 * Math.PI * G), tol: 0.02, unit: 'kg/m³',
        hints: [R`$H_0 = 70\times10^3/(3.086\times10^{22})\ \mathrm{s^{-1}}$.`],
        solution: R`<p>$H_0 = 2.27\times10^{-18}\ \mathrm{s^{-1}}$, so $\rho_c = 9.2\times10^{-27}\ \mathrm{kg/m^3}$, about 5.5 proton masses per cubic metre. Ordinary matter makes up only about 5% of this.</p>` }
    ]
  });
})();
