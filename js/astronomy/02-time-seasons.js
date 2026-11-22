(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-time', subject: 'astronomy', num: 2, part: 'The Sky',
    title: 'Time, the Sun and the Seasons',
    subtitle: R`The Sun's yearly path along the ecliptic, why there are seasons, solar and sidereal time, the equation of time, calendars, and the slow wobble of precession.`,
    goals: ['Explain the seasons from Earth\'s axial tilt', 'Calculate the Sun\'s noon altitude and day length', 'Distinguish sidereal and solar days', 'Convert between local, standard and sidereal time', 'Describe precession and the calendar'],
    sections: [
      {
        title: 'The ecliptic and the seasons',
        html: R`
<p>As Earth orbits, the Sun appears to move eastwards against the stars by about 1° per day, along a great circle called the <strong>ecliptic</strong>. It passes through the 12 zodiac constellations (plus Ophiuchus). Because Earth's axis is tilted by $\varepsilon = 23.44^\circ$ to its orbit, the ecliptic is tilted by the same angle to the celestial equator, and the Sun's declination swings between $+23.44^\circ$ and $-23.44^\circ$ over the year:</p>
$$\delta_\odot \approx -23.44^\circ\cos\!\left(\frac{360^\circ}{365}(d + 10)\right),$$
<p>with $d$ the day of the year. The <strong>equinoxes</strong> (about 20 March and 22 September) are where the ecliptic crosses the equator; the <strong>solstices</strong> (about 21 June and 21 December) are its extremes.</p>
<p>Seasons come from the tilt, not from distance: Earth is actually closest to the Sun (perihelion) in early January. In summer the Sun is higher, so each square metre of ground receives more power (in proportion to $\sin h$), and it is up for longer.</p>
<ul>
<li>The <strong>tropics</strong> (latitude ±23.44°) are where the Sun can pass overhead.</li>
<li>The <strong>polar circles</strong> (±66.56°) are where there is at least one day of midnight Sun and one of polar night.</li>
</ul>`
      },
      {
        title: 'Noon altitude and day length',
        html: R`
<p>The Sun's altitude when it crosses the meridian (local noon) is</p>
$$h_{\text{noon}} = 90^\circ - |\varphi - \delta_\odot|.$$
<p>The half-day hour angle at sunrise follows from $\cos H_0 = -\tan\varphi\tan\delta_\odot$, giving a day length of $2H_0/15^\circ$ hours. At the equinoxes, $\delta_\odot = 0$ and day and night are 12 hours everywhere. (In reality refraction and the Sun's finite size add a few minutes of daylight.)</p>
<details class="example"><summary><span class="lbl">Worked example</span> How high is the noon Sun in Singapore (1.3° N) at the December solstice, and how long is the day in Oslo (59.9° N) then?<span class="tog">Solution</span></summary><div class="sol"><p>Singapore: $90 - |1.3 + 23.44| = 65.3^\circ$, in the south. Oslo: $\cos H_0 = -\tan59.9^\circ\tan(-23.44^\circ) = 0.7477$, $H_0 = 41.6^\circ$, day $= 5.5$ hours.</p></div></details>`
      },
      {
        title: 'Solar time and sidereal time',
        html: R`
<p>A <strong>solar day</strong> (24 h) is noon to noon. A <strong>sidereal day</strong> is the time for Earth to turn 360° relative to the stars: 23 h 56 min 4 s. The difference arises because Earth moves about 1° along its orbit each day, so it must turn about 361° to bring the Sun back to the meridian. In a year there are 365.25 solar days but 366.25 sidereal days. So stars rise about 4 minutes earlier each night, and the night sky shifts through the year.</p>
<p><strong>Local sidereal time</strong> equals the right ascension currently on the meridian. It is about 0 h at local midnight near the September equinox and advances about 2 h per month.</p>
<p><strong>Apparent solar time</strong> (sundial time) is not uniform, because Earth's orbit is elliptical (Kepler's second law) and the ecliptic is tilted. The difference between sundial time and clock-average <strong>mean solar time</strong> is the <strong>equation of time</strong>, up to about ±16 minutes. Plotting the Sun's position at the same clock time each day gives a figure-eight, the <strong>analemma</strong>.</p>
<p><strong>Time zones</strong>: standard time uses the mean solar time of a central meridian (usually a multiple of 15°). Each 1° of longitude is 4 minutes of time. Places west of their zone meridian see noon later.</p>`
      },
      {
        title: 'Calendars and precession',
        html: R`
<p>The <strong>tropical year</strong> (equinox to equinox) is 365.2422 days. The Julian calendar (a leap year every 4 years) averages 365.25 days and drifted by about 3 days in 400 years. The Gregorian reform of 1582 skips leap years in century years not divisible by 400, averaging 365.2425 days: an error of 1 day in about 3300 years.</p>
<p>Earth's axis slowly traces a cone, like a spinning top, under the torque of the Sun and Moon on its equatorial bulge: <strong>precession</strong>, with a period of about 25 800 years. The equinoxes drift westward along the ecliptic by about 50″ per year, so RA and declination slowly change, star charts give an <strong>epoch</strong> (such as J2000), and in 12 000 years Vega will be near the north pole.</p>
<p>The <strong>sidereal year</strong> (relative to the stars, 365.2564 days) is about 20 minutes longer than the tropical year because of precession.</p>`
      }
    ],
    labs: [
      { sim: 'daylight', title: 'Day length through the year', desc: 'Hours of daylight against date at a chosen latitude. Change the axial tilt to imagine other planets.',
        tasks: ['At latitude 52°, find the longest and shortest days. When is day length changing fastest?', 'Find the latitude where the Sun first stays up all day at the June solstice.', 'Set the tilt to 0°. What happens to the seasons? Then try 90°, like Uranus.'] }
    ],
    formulas: [
      ['Solar declination', R`\delta_\odot \approx -23.44^\circ\cos\big(\tfrac{360^\circ}{365}(d+10)\big)`],
      ['Noon altitude', R`h = 90^\circ - |\varphi - \delta_\odot|`],
      ['Day length', R`2H_0/15^\circ,\ \ \cos H_0 = -\tan\varphi\tan\delta_\odot`],
      ['Sidereal day', R`23^\text{h}56^\text{m}04^\text{s}`],
      ['Longitude and time', R`1^\circ = 4\ \text{min}`],
      ['Insolation', R`\propto \sin h`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Cause of seasons', q: R`<p>What causes Earth's seasons?</p>`, options: ['Changing distance from the Sun', 'The tilt of Earth\'s axis', 'Changes in the Sun\'s output', 'The Moon'], answer: 1, hints: [R`Perihelion is in January.`], solution: R`<p>The 23.4° tilt changes the Sun's altitude and the length of the day.</p>` },
      { level: 'concept', type: 'mcq', title: 'Stars rise earlier', q: R`<p>A star rises at 22:00 tonight. When will it rise in one month?</p>`, options: ['22:00', 'About 20:00', 'About 24:00', 'About 21:56'], answer: 1, hints: [R`4 minutes a day.`], solution: R`<p>30 × 4 min = 2 hours earlier, about 20:00.</p>` },
      { level: 'concept', type: 'mcq', title: 'Midnight Sun', q: R`<p>Where can you see the Sun at midnight in June?</p>`, options: ['Anywhere north of the Tropic of Cancer', 'North of the Arctic Circle', 'Only at the north pole', 'At the equator'], answer: 1, hints: [R`$90 - 23.44$.`], solution: R`<p>North of 66.56° N.</p>` },
      { level: 'core', type: 'num', title: 'Noon Sun', q: R`<p>What is the noon altitude of the Sun at latitude 40° N at the June solstice, in degrees?</p>`, answer: 73.44, tol: 0.002, unit: '°', hints: [R`$90 - |40 - 23.44|$.`], solution: R`<p>73.44°.</p>` },
      { level: 'core', type: 'num', title: 'Find the latitude', q: R`<p>On an equinox, the noon Sun is 35° above the southern horizon. What is the latitude, in degrees north?</p>`, answer: 55, tol: 0.002, unit: '°', hints: [R`At an equinox $h = 90 - \varphi$.`], solution: R`<p>55° N.</p>` },
      { level: 'core', type: 'num', title: 'Longitude time', q: R`<p>A town at longitude 7.5° W uses the time of the 0° meridian. At what clock time (in minutes after 12:00) does the Sun cross its meridian, ignoring the equation of time?</p>`, answer: 30, tol: 0.002, unit: 'min', hints: [R`4 min per degree.`], solution: R`<p>30 minutes late: 12:30.</p>` },
      { level: 'core', type: 'num', title: 'Sidereal days', q: R`<p>How many sidereal days are there in 365.25 solar days?</p>`, answer: 366.25, tol: 0.0001, unit: '', hints: [R`One extra turn per orbit.`], solution: R`<p>366.25.</p>` },
      { level: 'core', type: 'num', title: 'Summer insolation', q: R`<p>At latitude 50° N, by what factor is the noon solar power per square metre of flat ground larger at the June solstice than at the December solstice? (Ignore the atmosphere.)</p>`, answer: 3.14, tol: 0.01, unit: '×', hints: [R`$\sin63.44^\circ/\sin16.56^\circ$.`], solution: R`<p>$h_{\text{June}} = 63.44^\circ$ and $h_{\text{Dec}} = 16.56^\circ$, so the ratio is $0.8945/0.2850 = 3.14$. Longer days make the daily total ratio even larger.</p>` },
      { level: 'olympiad', type: 'num', title: 'Length of a sidereal day', q: R`<p>Using a tropical year of 365.2422 days, calculate the length of the sidereal day in seconds of mean solar time.</p>`, answer: 86164.1, tol: 0.00002, unit: 's', hints: [R`$86400\times365.2422/366.2422$.`], solution: R`<p>86 164.1 s = 23 h 56 min 4.1 s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Day length in Oslo', q: R`<p>Find the length of the day at the June solstice in Oslo (59.9° N), ignoring refraction, in hours.</p>`, answer: 18.46, tol: 0.005, unit: 'h', hints: [R`$\cos H_0 = -\tan59.9^\circ\tan23.44^\circ$.`], solution: R`<p>$\cos H_0 = -0.748$, $H_0 = 138.4^\circ$, day $= 18.46$ h. With refraction it is closer to 18 h 50 min.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gregorian error', q: R`<p>The Gregorian year is 365.2425 days and the tropical year 365.2422 days. After how many years has the calendar drifted by one full day?</p>`, answer: 3333, tol: 0.01, unit: 'years', hints: [R`1/0.0003.`], solution: R`<p>About 3300 years.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-time', [
    { title: 'Noon Sun', gen(r) { const phi = r.int(-60, 66), s = r.pick([[23.44, 'June solstice'], [0, 'an equinox'], [-23.44, 'December solstice']]); const h = 90 - Math.abs(phi - s[0]); return { q: R`<p>Find the Sun's noon altitude at latitude ${phi}° at the ${s[1]}.</p>`, answer: h, tol: 0.003, unit: '°', solution: R`<p>$90 - |${phi} - (${s[0]})| = ${f(h)}^\circ$.</p>` }; } },
    { title: 'Day length', gen(r) { const phi = r.int(0, 65), d = r.step(-23.4, 23.4, 0.1); const x = -Math.tan(phi * Math.PI / 180) * Math.tan(d * Math.PI / 180); const L = 2 * Math.acos(x) * 180 / Math.PI / 15; return { q: R`<p>The Sun's declination is ${f(d)}°. How long is the day at latitude ${phi}° N, in hours? Ignore refraction.</p>`, answer: L, tol: 0.005, unit: 'h', solution: R`<p>$\cos H_0 = ${f(x)}$, day $= ${f(L)}$ h.</p>` }; } },
    { title: 'Longitude and noon', gen(r) { const lon = r.step(-30, 30, 0.5), zone = Math.round(lon / 15) * 15; const dt = (zone - lon) * 4; return { q: R`<p>A place at longitude ${Math.abs(lon)}° ${lon < 0 ? 'W' : 'E'} keeps standard time for the ${Math.abs(zone)}° ${zone < 0 ? 'W' : zone > 0 ? 'E' : ''} meridian. How many minutes after 12:00 is local noon? (Negative means before.)</p>`, answer: dt, tol: 0.002, atol: 0.01, unit: 'min', solution: R`<p>$(${zone} - (${lon}))\times4 = ${f(dt)}$ min.</p>` }; } }
  ]);
})();
