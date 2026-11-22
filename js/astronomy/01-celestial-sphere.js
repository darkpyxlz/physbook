(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-sphere', subject: 'astronomy', num: 1, part: 'The Sky',
    title: 'The Celestial Sphere',
    subtitle: R`Finding your way around the sky. Constellations, the horizon and equatorial coordinate systems, diurnal motion, culmination, circumpolar stars, and spherical trigonometry.`,
    goals: ['Use altitude–azimuth and right ascension–declination coordinates', 'Relate the altitude of the celestial pole to latitude', 'Calculate culmination altitudes and decide whether a star is circumpolar', 'Compute angular separations', 'Apply the spherical cosine rule'],
    sections: [
      {
        title: 'The sky as a sphere',
        html: R`
<p>Stars are so far away that they look fixed on a huge sphere centred on the observer: the <strong>celestial sphere</strong>. It is a model, not a real object, but it makes positions easy to describe. The sky is divided into 88 official <strong>constellations</strong>, regions with agreed boundaries (IAU, 1928). The bright patterns people know, such as the Plough, are <strong>asterisms</strong>.</p>
<p>Earth rotates west to east once every <strong>sidereal day</strong> (23 h 56 min 4 s), so the sphere appears to turn east to west about the <strong>celestial poles</strong>, the points above Earth's poles. Polaris lies within about 0.7° of the north celestial pole. The <strong>celestial equator</strong> is Earth's equator projected onto the sky.</p>
<p>Angular sizes: your fist at arm's length spans about 10°, a finger about 1°. The Moon and Sun are both about 0.5° across.</p>`
      },
      {
        title: 'Two coordinate systems',
        html: R`
<p><strong>Horizon (alt–az) coordinates</strong> depend on where and when you observe. <strong>Altitude</strong> $h$ is the angle above the horizon (0° to 90° at the <strong>zenith</strong>); <strong>azimuth</strong> $A$ is measured along the horizon from north through east (N = 0°, E = 90°, S = 180°, W = 270°). The <strong>meridian</strong> is the great circle through the poles and the zenith, running north–south.</p>
<p><strong>Equatorial coordinates</strong> are fixed to the stars, like latitude and longitude. <strong>Declination</strong> $\delta$ is the angle north (+) or south (−) of the celestial equator. <strong>Right ascension</strong> $\alpha$ is measured eastwards along the equator from the <strong>vernal equinox</strong> (the point where the Sun crosses the equator going north in March), in hours: 24 h = 360°, so 1 h = 15°.</p>
<p>The <strong>hour angle</strong> $H$ of a star is how far west of the meridian it is, in time units: $H = \text{LST} - \alpha$, where LST is the <strong>local sidereal time</strong>. A star is on the meridian (culminates) when LST equals its right ascension.</p>`
      },
      {
        title: 'Latitude and diurnal motion',
        html: R`
<p>The altitude of the celestial pole equals the observer's latitude $\varphi$. At the north pole Polaris is overhead and stars circle parallel to the horizon; at the equator the poles sit on the horizon and every star rises and sets vertically.</p>
<p>For a star of declination $\delta$ seen from latitude $\varphi$ (northern hemisphere, star culminating south of the zenith):</p>
$$h_{\max} = 90^\circ - \varphi + \delta,\qquad h_{\min} = \varphi + \delta - 90^\circ.$$
<ul>
<li>A star is <strong>circumpolar</strong> (never sets) if $h_{\min} > 0$, that is $\delta > 90^\circ - \varphi$.</li>
<li>It <strong>never rises</strong> if $\delta \lt -(90^\circ - \varphi)$.</li>
<li>The hour angle at rising and setting satisfies $\cos H_0 = -\tan\varphi\tan\delta$, so a star is above the horizon for $2H_0$ of each sidereal day.</li>
</ul>
<details class="example"><summary><span class="lbl">Worked example</span> From London ($\varphi = 51.5^\circ$), how high does Sirius ($\delta = -16.7^\circ$) get, and is Capella ($\delta = +46.0^\circ$) circumpolar?<span class="tog">Solution</span></summary><div class="sol"><p>Sirius: $90 - 51.5 - 16.7 = 21.8^\circ$. Capella needs $\delta > 90 - 51.5 = 38.5^\circ$: yes, it is circumpolar, with $h_{\min} = 51.5 + 46.0 - 90 = 7.5^\circ$.</p></div></details>`
      },
      {
        title: 'Spherical trigonometry',
        html: R`
<p>On a sphere, the sides of a triangle made of great circles are angles too. The workhorse is the <strong>spherical cosine rule</strong>:</p>
$$\cos a = \cos b\cos c + \sin b\sin c\cos A.$$
<p>Two important uses:</p>
<ul>
<li><strong>Angular separation</strong> of two objects at $(\alpha_1,\delta_1)$ and $(\alpha_2,\delta_2)$:
$$\cos\theta = \sin\delta_1\sin\delta_2 + \cos\delta_1\cos\delta_2\cos(\alpha_1 - \alpha_2).$$</li>
<li><strong>Altitude</strong> from hour angle: $\sin h = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos H$.</li>
</ul>
<p>Great-circle distances on Earth use the same rule, with latitude and longitude in place of declination and right ascension. Near the poles, lines of right ascension crowd together: an hour of RA at declination $\delta$ spans only $15^\circ\cos\delta$.</p>`
      }
    ],
    labs: [
      { sim: 'skypath', title: 'Star paths across the sky', desc: 'The path of a star through one sidereal day, plotted as altitude against azimuth. The yellow dot moves along it.',
        tasks: ['At latitude 52°, find the declination at which a star just becomes circumpolar.', 'Move to the equator. How long is every star above the horizon?', 'Go to latitude −34° (Sydney). Where does a star of declination +20° culminate: north or south?'] }
    ],
    formulas: [
      ['Upper culmination', R`h_{\max} = 90^\circ - |\varphi - \delta|`],
      ['Circumpolar condition', R`\delta > 90^\circ - \varphi`],
      ['Hour angle', R`H = \text{LST} - \alpha`],
      ['Rising hour angle', R`\cos H_0 = -\tan\varphi\tan\delta`],
      ['Spherical cosine rule', R`\cos a = \cos b\cos c + \sin b\sin c\cos A`],
      ['Altitude', R`\sin h = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos H`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Altitude of Polaris', q: R`<p>From a place at latitude 40° N, how high is Polaris above the horizon?</p>`, options: ['50°', '40°', '90°', 'It depends on the time of night'], answer: 1, hints: [R`Pole altitude equals latitude.`], solution: R`<p>About 40°, all night and all year.</p>` },
      { level: 'concept', type: 'mcq', title: 'Which coordinate changes', q: R`<p>Over a night, which coordinate of a star changes?</p>`, options: ['Declination', 'Right ascension', 'Altitude', 'None'], answer: 2, hints: [R`Equatorial coordinates are fixed to the sky.`], solution: R`<p>Altitude (and azimuth) change as the sky turns; RA and declination stay fixed.</p>` },
      { level: 'concept', type: 'mcq', title: 'At the equator', q: R`<p>For an observer on the equator, which statement is true?</p>`, options: ['All stars are circumpolar', 'Every star is above the horizon for 12 sidereal hours', 'Only southern stars rise', 'Stars move parallel to the horizon'], answer: 1, hints: [R`$\tan 0 = 0$.`], solution: R`<p>$\cos H_0 = 0$, so $H_0 = 6$ h: every star is up for 12 sidereal hours.</p>` },
      { level: 'core', type: 'num', title: 'Culmination', q: R`<p>Find the maximum altitude of Vega ($\delta = +38.8^\circ$) from latitude 35° N, in degrees.</p>`, answer: 86.2, tol: 0.003, unit: '°', hints: [R`$90 - |\varphi - \delta|$.`], solution: R`<p>$90 - 3.8 = 86.2^\circ$. Because $\delta > \varphi$, Vega culminates 3.8° north of the zenith.</p>` },
      { level: 'core', type: 'num', title: 'Southernmost star', q: R`<p>What is the most southerly declination visible (at all) from latitude 51.5° N, in degrees? Ignore refraction.</p>`, answer: -38.5, tol: 0.003, unit: '°', hints: [R`$\delta \gt -(90 - \varphi)$.`], solution: R`<p>$-38.5^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'RA in degrees', q: R`<p>Betelgeuse has right ascension 5 h 55 min. Convert this to degrees.</p>`, answer: 88.75, tol: 0.002, unit: '°', hints: [R`1 h = 15°, 1 min = 0.25°.`], solution: R`<p>$75 + 13.75 = 88.75^\circ$.</p>` },
      { level: 'core', type: 'num', title: 'Hour angle', q: R`<p>The local sidereal time is 14 h 20 min. Arcturus has RA 14 h 16 min. What is its hour angle, in minutes of time?</p>`, answer: 4, tol: 0.002, unit: 'min', hints: [R`$H = \text{LST} - \alpha$.`], solution: R`<p>4 min: it crossed the meridian 4 minutes ago.</p>` },
      { level: 'core', type: 'num', title: 'Time above the horizon', q: R`<p>A star has $\delta = +20^\circ$. At latitude 50° N, for how many sidereal hours is it above the horizon?</p>`, answer: 15.43, tol: 0.005, unit: 'h', hints: [R`$\cos H_0 = -\tan50^\circ\tan20^\circ$.`], solution: R`<p>$\cos H_0 = -0.4338$, so $H_0 = 115.7^\circ = 7.71$ h and the star is up for $2H_0 = 15.43$ h.</p>` },
      { level: 'olympiad', type: 'num', title: 'Angular separation', q: R`<p>Find the angular separation of Betelgeuse ($\alpha = 88.79^\circ$, $\delta = +7.41^\circ$) and Rigel ($\alpha = 78.63^\circ$, $\delta = -8.20^\circ$), in degrees.</p>`, answer: 18.6, tol: 0.01, unit: '°', hints: [R`Use the spherical cosine rule.`], solution: R`<p>$\cos\theta = \sin7.41\sin(-8.20) + \cos7.41\cos8.20\cos10.16 = 0.9477$, so $\theta = 18.6^\circ$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Altitude at a given hour angle', q: R`<p>From latitude 45° N, what is the altitude of a star of declination +30° at hour angle 3 h, in degrees?</p>`, answer: 51.87, tol: 0.005, unit: '°', hints: [R`$H = 45^\circ$.`], solution: R`<p>$\sin h = \sin45\sin30 + \cos45\cos30\cos45 = 0.3536 + 0.4330 = 0.7866$, so $h = 51.9^\circ$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Great circle flight', q: R`<p>London (51.5° N, 0.1° W) to Tokyo (35.7° N, 139.7° E). Find the great-circle distance in km (Earth radius 6371 km).</p>`, answer: 9560, tol: 0.01, unit: 'km', hints: [R`Longitude difference 139.8°.`], solution: R`<p>$\cos\theta = \sin51.5\sin35.7 + \cos51.5\cos35.7\cos139.8 = 0.4567 - 0.3861 = 0.0706$; $\theta = 85.95^\circ = 1.5002$ rad; distance $= 6371\times1.5002 = 9560$ km.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-sphere', [
    { title: 'Culmination altitude', gen(r) { const phi = r.int(-60, 70), del = r.int(-60, 80); const h = 90 - Math.abs(phi - del); if (h <= 0) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>Find the maximum altitude of a star of declination ${del}° seen from latitude ${phi}°.</p>`, answer: h, tol: 0.002, unit: '°', solution: R`<p>$90 - |${phi} - (${del})| = ${h}^\circ$.</p>` }; } },
    { title: 'Hours to degrees', gen(r) { const hh = r.int(0, 23), mm = r.int(0, 59); return { q: R`<p>Convert a right ascension of ${hh} h ${mm} min to degrees.</p>`, answer: 15 * hh + mm / 4, tol: 0.002, unit: '°', solution: R`<p>$15\times${hh} + ${mm}/4 = ${f(15 * hh + mm / 4)}^\circ$.</p>` }; } },
    { title: 'Time above the horizon', gen(r) { const phi = r.int(10, 60), del = r.int(-40, 40); const x = -Math.tan(phi * Math.PI / 180) * Math.tan(del * Math.PI / 180); if (Math.abs(x) >= 1) return this.gen(PB.rng(r.int(1, 1e9))); const up = 2 * Math.acos(x) * 180 / Math.PI / 15; return { q: R`<p>For how many sidereal hours is a star of declination ${del}° above the horizon at latitude ${phi}° N?</p>`, answer: up, tol: 0.005, unit: 'h', solution: R`<p>$\cos H_0 = -\tan${phi}^\circ\tan(${del}^\circ) = ${f(x)}$, so $2H_0 = ${f(up)}$ h.</p>` }; } }
  ]);
})();
