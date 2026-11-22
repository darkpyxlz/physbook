(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-moon', subject: 'astronomy', num: 3, part: 'The Sky',
    title: 'The Moon, Eclipses and Tides',
    subtitle: R`Our nearest neighbour. Lunar phases, sidereal and synodic months, solar and lunar eclipses and the geometry of shadows, tides, and tidal locking.`,
    goals: ['Explain lunar phases and when the Moon rises', 'Relate sidereal and synodic periods', 'Explain why eclipses do not happen every month', 'Use shadow geometry for eclipses', 'Explain tides and tidal locking'],
    sections: [
      {
        title: 'Phases and months',
        html: R`
<p>The Moon is always half lit by the Sun; its <strong>phase</strong> is how much of the lit half we see. At <strong>new moon</strong> it is between Earth and the Sun; at <strong>full moon</strong> opposite the Sun. The illuminated fraction is</p>
$$k = \frac{1 - \cos\theta}{2},$$
<p>where $\theta$ is the Sun–Moon angle (elongation) measured around from new moon. A full moon rises at sunset; a first quarter is highest at sunset; a waning crescent rises before dawn. In the southern hemisphere the Moon looks upside down: a waxing crescent is lit on the left.</p>
<p>The Moon orbits Earth in a <strong>sidereal month</strong> of 27.32 days, but returns to the same phase only after a <strong>synodic month</strong> of 29.53 days, because Earth has moved along its orbit meanwhile. For any two bodies with periods $P_1 \lt P_2$:</p>
$$\frac{1}{S} = \frac{1}{P_1} - \frac{1}{P_2}.$$
<details class="example"><summary><span class="lbl">Worked example</span> Check the synodic month from the sidereal month and the year.<span class="tog">Solution</span></summary><div class="sol"><p>$1/S = 1/27.32 - 1/365.25 = 0.036603 - 0.002738 = 0.033865$, so $S = 29.53$ days.</p></div></details>
<p>The Moon rotates once per orbit, so it keeps the same face towards Earth. Slight wobbles called <strong>librations</strong> let us see 59% of its surface over time.</p>`
      },
      {
        title: 'Eclipses',
        html: R`
<p>A <strong>solar eclipse</strong> happens when the Moon's shadow falls on Earth (at new moon); a <strong>lunar eclipse</strong> when the Moon passes through Earth's shadow (at full moon). They do not happen every month because the Moon's orbit is tilted by 5.1° to the ecliptic. Eclipses need the new or full moon to be near a <strong>node</strong>, where the orbit crosses the ecliptic. This alignment comes round in <strong>eclipse seasons</strong> about every 173 days.</p>
<p>The Sun is about 400 times wider than the Moon and about 400 times farther away, so they look the same size (about 0.5°). Because the Moon's distance varies (356 000 to 407 000 km), sometimes it covers the Sun completely (<strong>total eclipse</strong>, with the corona visible) and sometimes it leaves a ring (<strong>annular eclipse</strong>).</p>
<p>A shadow has a dark central <strong>umbra</strong> and a surrounding <strong>penumbra</strong>. The umbra of a body of radius $r$ lit by a Sun of radius $R_\odot$ at distance $d$ is a cone of length</p>
$$L = \frac{r\,d}{R_\odot - r}.$$
<p>For the Moon $L \approx 374\,000$ km, close to the Earth–Moon distance: total solar eclipses are narrow (a path at most about 270 km wide) and brief (at most 7.5 minutes). Earth's umbra is about 1.4 million km long and about 2.7 Moon diameters wide at the Moon's distance, so totality in a lunar eclipse can last over 1.5 hours. The Moon turns red because Earth's atmosphere refracts reddened sunlight into the shadow.</p>
<p>Eclipses repeat after a <strong>saros</strong> of 18 years 11 days 8 hours: 223 synodic months, almost exactly 242 draconic months.</p>`
      },
      {
        title: 'Tides',
        html: R`
<p>The Moon's gravity is stronger on Earth's near side than at its centre and weaker on the far side. Relative to Earth's centre, both sides are stretched away: the <strong>tidal acceleration</strong> across a body of radius $r$ at distance $d$ from mass $M$ is</p>
$$a_{\text{tide}} \approx \frac{2GMr}{d^3}.$$
<p>This raises two bulges, so most coasts have two high tides a day, about 50 minutes later each day as the Moon moves on. The Sun's tidal effect is about 46% of the Moon's (its huge mass is offset by $d^3$). At new and full moon the two add, giving large <strong>spring tides</strong>; at quarter moons they partly cancel, giving <strong>neap tides</strong>.</p>
<p>Friction makes the bulges lead the Moon slightly. The torque slows Earth's rotation (the day lengthens about 2 ms per century) and pushes the Moon outwards by 3.8 cm per year, measured by lasers bounced off Apollo reflectors. The same process long ago <strong>tidally locked</strong> the Moon's rotation to its orbit.</p>
<p>A moon too close to its planet is pulled apart. Inside the <strong>Roche limit</strong>, about $d \approx 2.44\,R_p(\rho_p/\rho_m)^{1/3}$ for a fluid moon, tides beat self-gravity; Saturn's rings lie inside its Roche limit.</p>`
      }
    ],
    labs: [
      { sim: 'moonphase', title: 'Phases of the Moon', desc: 'The Moon\'s position in its orbit (left, Sun to the right) and how it looks from Earth (right).',
        tasks: ['At what age is the Moon at first quarter? What is the elongation then?', 'Animate a whole month. When does the Moon rise at midnight?', 'Switch to the southern hemisphere view. Which side of a waxing crescent is lit?'] }
    ],
    formulas: [
      ['Illuminated fraction', R`k = \tfrac12(1 - \cos\theta)`],
      ['Synodic period', R`1/S = 1/P_1 - 1/P_2`],
      ['Umbra length', R`L = \dfrac{r d}{R_\odot - r}`],
      ['Tidal acceleration', R`a \approx 2GMr/d^3`],
      ['Roche limit (fluid)', R`d \approx 2.44R_p(\rho_p/\rho_m)^{1/3}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Full moon rising', q: R`<p>At about what time does a full moon rise?</p>`, options: ['Sunrise', 'Noon', 'Sunset', 'Midnight'], answer: 2, hints: [R`It is opposite the Sun.`], solution: R`<p>At sunset.</p>` },
      { level: 'concept', type: 'mcq', title: 'Monthly eclipses', q: R`<p>Why is there not a solar eclipse every new moon?</p>`, options: ['The Moon is too small', 'The Moon\'s orbit is tilted to the ecliptic', 'Earth\'s atmosphere prevents it', 'The Moon\'s orbit is elliptical'], answer: 1, hints: [R`5.1°.`], solution: R`<p>The Moon usually passes above or below the Sun.</p>` },
      { level: 'concept', type: 'mcq', title: 'Spring tides', q: R`<p>When do spring tides occur?</p>`, options: ['In spring', 'At new and full moon', 'At quarter moons', 'When the Moon is at apogee'], answer: 1, hints: [R`Sun and Moon aligned.`], solution: R`<p>At new and full moon, when solar and lunar tides add.</p>` },
      { level: 'core', type: 'num', title: 'Illuminated fraction', q: R`<p>The Moon is 60° from the Sun (waxing). What fraction of its disc is lit, in %?</p>`, answer: 25, tol: 0.002, unit: '%', hints: [R`$(1 - \cos60^\circ)/2$.`], solution: R`<p>25%: a crescent.</p>` },
      { level: 'core', type: 'num', title: 'Synodic period of Mars', q: R`<p>Mars orbits in 1.881 years. How often (in days) is Mars at opposition?</p>`, answer: 779.9, tol: 0.005, unit: 'days', hints: [R`$1/S = 1 - 1/1.881$.`], solution: R`<p>$S = 2.135$ years $= 780$ days.</p>` },
      { level: 'core', type: 'num', title: 'Moon rise delay', q: R`<p>Using the synodic month of 29.53 days, by how many minutes does moonrise get later each day on average?</p>`, answer: 48.8, tol: 0.01, unit: 'min', hints: [R`24 h spread over a synodic month.`], solution: R`<p>$1440/29.53 = 48.8$ min.</p>` },
      { level: 'core', type: 'num', title: 'Sun versus Moon tides', q: R`<p>Compare the Sun's tidal acceleration on Earth with the Moon's. Use $M_\odot/M_{\text{Moon}} = 2.71\times10^7$ and $d_\odot/d_{\text{Moon}} = 389$.</p>`, answer: 0.46, tol: 0.02, unit: '', hints: [R`Ratio $= (M_\odot/M_m)(d_m/d_\odot)^3$.`], solution: R`<p>$2.71\times10^7/389^3 = 0.46$.</p>` },
      { level: 'core', type: 'num', title: 'Moon\'s umbra', q: R`<p>Find the length of the Moon's umbra, in km ($r = 1737$ km, $R_\odot = 696\,000$ km, $d = 1.496\times10^8$ km).</p>`, answer: 374300, tol: 0.01, unit: 'km', hints: [R`$rd/(R_\odot - r)$.`], solution: R`<p>$1737\times1.496\times10^8/694\,263 = 3.74\times10^5$ km.</p>` },
      { level: 'olympiad', type: 'num', title: 'Earth\'s shadow at the Moon', q: R`<p>Earth's umbra has length $L = 1.38\times10^6$ km. How wide is it (diameter, in km) at the Moon's distance of 384 400 km? Earth's radius is 6371 km.</p>`, answer: 9193, tol: 0.01, unit: 'km', hints: [R`It narrows linearly: radius $= R_E(1 - d/L)$.`], solution: R`<p>$2\times6371\times(1 - 0.2786) = 9190$ km, about 2.6 Moon diameters.</p>` },
      { level: 'olympiad', type: 'num', title: 'Roche limit of Saturn', q: R`<p>Saturn has radius 58 230 km and density 690 kg/m³. Find the Roche limit for an icy moon of density 900 kg/m³, in km.</p>`, answer: 130000, tol: 0.01, unit: 'km', hints: [R`$2.44\times58\,230\times(690/900)^{1/3}$.`], solution: R`<p>$2.44\times58\,230\times0.915 = 1.30\times10^5$ km. The main rings end at about 137 000 km.</p>` },
      { level: 'olympiad', type: 'num', title: 'Days in the future', q: R`<p>Earth's day lengthens by 2.3 ms per century. Ignoring other effects, how many centuries until the day is 1 hour longer? Give the answer in millions of years.</p>`, answer: 156.5, tol: 0.01, unit: 'Myr', hints: [R`3600 s / 0.0023 s per century.`], solution: R`<p>$1.565\times10^6$ centuries $= 156$ million years.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-moon', [
    { title: 'Synodic period', gen(r) { const P = r.pick([[0.241, 'Mercury'], [0.615, 'Venus'], [1.881, 'Mars'], [11.86, 'Jupiter'], [29.46, 'Saturn'], [84.0, 'Uranus'], [164.8, 'Neptune']]); const S = 1 / Math.abs(1 - 1 / P[0]); return { q: R`<p>${P[1]} orbits the Sun in ${P[0]} years. What is its synodic period as seen from Earth, in years?</p>`, answer: S, tol: 0.005, unit: 'years', solution: R`<p>$1/S = |1 - 1/${P[0]}|$, so $S = ${f(S)}$ years.</p>` }; } },
    { title: 'Moon phase fraction', gen(r) { const th = r.int(10, 350); const k = (1 - Math.cos(th * Math.PI / 180)) / 2; return { q: R`<p>The Moon is ${th}° past new moon in its cycle. What percentage of its disc is lit?</p>`, answer: 100 * k, tol: 0.005, atol: 0.2, unit: '%', solution: R`<p>$(1 - \cos${th}^\circ)/2 = ${f(100 * k)}\%$.</p>` }; } },
    { title: 'Tidal scaling', gen(r) { const k = r.pick([0.5, 0.8, 1.5, 2, 3]); return { q: R`<p>If the Moon were ${k} times its present distance, by what factor would its tidal effect on Earth change?</p>`, answer: Math.pow(k, -3), tol: 0.005, unit: '×', solution: R`<p>$${k}^{-3} = ${f(Math.pow(k, -3))}$.</p>` }; } }
  ]);
})();
