(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'astro-hr', subject: 'astronomy', num: 11, part: 'The Stars',
    title: 'The Hertzsprung–Russell Diagram and the Sun',
    subtitle: R`Sorting the stars. The HR diagram and its regions, the main sequence and the mass–luminosity relation, how the Sun shines by nuclear fusion, its structure, and solar activity.`,
    goals: ['Read the HR diagram and place stars on it', 'Use the mass–luminosity relation and main-sequence lifetimes', 'Explain hydrostatic equilibrium and energy transport', 'Describe the proton–proton chain and the CNO cycle', 'Describe sunspots, the solar cycle and the solar wind'],
    sections: [
      {
        title: 'The HR diagram',
        html: R`
<p>Plot luminosity against surface temperature (hot on the left, by tradition) and stars fall into groups, not randomly: the <strong>Hertzsprung–Russell diagram</strong> (1910s).</p>
<ul>
<li>About 90% lie on the <strong>main sequence</strong>, a band from hot, luminous O stars to cool, dim M dwarfs. These stars fuse hydrogen in their cores.</li>
<li><strong>Giants</strong> and <strong>supergiants</strong> sit above the main sequence: cool but very luminous, so they must be huge.</li>
<li><strong>White dwarfs</strong> lie below: hot but faint, so tiny.</li>
</ul>
<p>Since $L = 4\pi R^2\sigma T^4$, lines of constant radius run diagonally across the diagram. Position on the main sequence is set almost entirely by <strong>mass</strong>.</p>`
      },
      {
        title: 'Mass, luminosity and lifetime',
        html: R`
<p>For main-sequence stars, luminosity rises steeply with mass:</p>
$$\frac{L}{L_\odot} \approx \left(\frac{M}{M_\odot}\right)^{3.5}\quad(\text{roughly } 0.5 \text{ to } 50\,M_\odot).$$
<p>A star's fuel is proportional to $M$, but it burns it at a rate $L$, so its main-sequence lifetime is</p>
$$t \approx 10\ \text{Gyr}\times\left(\frac{M}{M_\odot}\right)^{-2.5}.$$
<p>A 10 M☉ star lasts about 30 million years; a 0.2 M☉ red dwarf over a trillion years, far longer than the age of the universe. Masses range from about 0.08 M☉ (below which hydrogen never ignites, leaving a <strong>brown dwarf</strong>) to about 150 M☉ or more.</p>
<p>In a star cluster, all stars formed together. The most massive stars leave the main sequence first, so the <strong>turn-off point</strong> dates the cluster.</p>`
      },
      {
        title: 'Inside the Sun',
        html: R`
<p>A star is a ball of gas in <strong>hydrostatic equilibrium</strong>: at every depth, the outward pressure gradient balances gravity, $\dfrac{dP}{dr} = -\dfrac{GM(r)\rho}{r^2}$. A rough estimate of the central pressure is $P_c \sim GM^2/R^4$, and the virial theorem gives a central temperature $T_c \sim GM m_p/kR$, about $10^7$ K for the Sun (the real value is $1.57\times10^7$ K).</p>
<p>At these temperatures hydrogen nuclei fuse into helium. In the Sun, the <strong>proton–proton chain</strong> dominates: net, $4\,{}^1\text{H} \to {}^4\text{He} + 2e^+ + 2\nu_e$, releasing 26.7 MeV, 0.7% of the mass. Stars over about 1.3 M☉ use the <strong>CNO cycle</strong>, in which carbon, nitrogen and oxygen act as catalysts; it is far more sensitive to temperature ($\propto T^{17}$ against $T^4$).</p>
<p>The Sun converts $4.3\times10^9$ kg of mass into energy each second ($L/c^2$). Energy crawls out by <strong>radiation</strong> through the inner 70% (a photon random-walks for about 170 000 years) and then by <strong>convection</strong>, visible as granulation on the <strong>photosphere</strong>. Neutrinos escape directly; detecting them confirmed the fusion model, once neutrino oscillations were understood.</p>`
      },
      {
        title: 'Solar activity',
        html: R`
<p>Above the photosphere lie the <strong>chromosphere</strong> and the <strong>corona</strong>, which is mysteriously hot (1–2 million K), seen during total eclipses and in X-rays. The corona streams outward as the <strong>solar wind</strong> at 400–800 km/s.</p>
<p><strong>Sunspots</strong> are cooler (about 4000 K) regions where strong magnetic fields block convection. Their number rises and falls in an 11-year <strong>solar cycle</strong> (22 years for the magnetic polarity). Flares and coronal mass ejections from active regions can trigger aurorae and disrupt satellites and power grids. Tracking sunspots shows the Sun rotates differentially: about 25 days at the equator and over 30 near the poles.</p>`
      }
    ],
    labs: [
      { sim: 'hrdiagram', title: 'The HR diagram', desc: 'A main-sequence star of chosen mass (big dot) among named stars, with dotted lines of constant radius.',
        tasks: ['Move the mass from 0.1 to 40 M☉. How do luminosity and lifetime change?', 'Which named stars are giants, which are white dwarfs? Read their radii from the dotted lines.', 'Find the mass of a star that would live exactly 1 billion years.'] }
    ],
    formulas: [
      ['Mass–luminosity', R`L \propto M^{3.5}`],
      ['Main-sequence lifetime', R`t \approx 10\,\text{Gyr}\,(M/M_\odot)^{-2.5}`],
      ['Hydrostatic equilibrium', R`dP/dr = -GM(r)\rho/r^2`],
      ['Central temperature estimate', R`T_c \sim GMm_p/kR`],
      ['Hydrogen burning', R`4\,{}^1\mathrm H \to {}^4\mathrm{He} + 26.7\ \text{MeV}`],
      ['Mass loss rate', R`\dot M = L/c^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Giants', q: R`<p>A star is cool (3500 K) but 1000 times more luminous than the Sun. It must be…</p>`, options: ['A white dwarf', 'Very large: a giant', 'Very dense', 'On the main sequence'], answer: 1, hints: [R`$L \propto R^2T^4$.`], solution: R`<p>Low temperature with high luminosity needs a huge radius.</p>` },
      { level: 'concept', type: 'mcq', title: 'Main-sequence position', q: R`<p>What mainly determines where a star sits on the main sequence?</p>`, options: ['Its age', 'Its mass', 'Its distance', 'Its composition'], answer: 1, hints: [R`Vogt–Russell theorem.`], solution: R`<p>Mass (with small effects from composition and age).</p>` },
      { level: 'concept', type: 'mcq', title: 'Sunspots', q: R`<p>Why are sunspots dark?</p>`, options: ['They are holes in the Sun', 'They are about 1500 K cooler than their surroundings', 'Dust covers them', 'They are shadows of planets'], answer: 1, hints: [R`Magnetic fields block convection.`], solution: R`<p>They are cooler, so by Stefan's law much less bright, though still very hot.</p>` },
      { level: 'core', type: 'num', title: 'Luminosity from mass', q: R`<p>Estimate the luminosity of a 3 M☉ main-sequence star, in L☉.</p>`, answer: 46.8, tol: 0.01, unit: 'L☉', hints: [R`$3^{3.5}$.`], solution: R`<p>$3^{3.5} = 46.8$.</p>` },
      { level: 'core', type: 'num', title: 'Lifetime', q: R`<p>Estimate the main-sequence lifetime of a 5 M☉ star, in millions of years.</p>`, answer: 178.9, tol: 0.01, unit: 'Myr', hints: [R`$10^{10}\times5^{-2.5}$.`], solution: R`<p>$10^{10}/55.9 = 1.79\times10^8$ years.</p>` },
      { level: 'core', type: 'num', title: 'Mass converted', q: R`<p>How much mass does the Sun turn into energy each second? Give the answer in units of 10⁹ kg ($L = 3.83\times10^{26}$ W).</p>`, answer: 4.26, tol: 0.01, unit: '×10⁹ kg', hints: [R`$L/c^2$.`], solution: R`<p>$3.83\times10^{26}/9\times10^{16} = 4.26\times10^9$ kg/s.</p>` },
      { level: 'core', type: 'num', title: 'Neutrinos', q: R`<p>Each fusion of 4 protons releases 26.7 MeV and 2 neutrinos. How many neutrinos does the Sun emit per second? Give the answer in units of 10³⁸.</p>`, answer: 1.79, tol: 0.01, unit: '×10³⁸', hints: [R`$L/(26.7\ \text{MeV})\times2$.`], solution: R`<p>$3.83\times10^{26}/(4.28\times10^{-12}) = 8.95\times10^{37}$ reactions; $\times2 = 1.79\times10^{38}$ neutrinos per second.</p>` },
      { level: 'core', type: 'num', title: 'Cluster age', q: R`<p>A cluster's main-sequence turn-off is at 2 M☉. Estimate its age in Gyr.</p>`, answer: 1.77, tol: 0.01, unit: 'Gyr', hints: [R`Lifetime of a 2 M☉ star.`], solution: R`<p>$10\times2^{-2.5} = 1.77$ Gyr.</p>` },
      { level: 'olympiad', type: 'num', title: 'Central temperature', q: R`<p>Estimate the Sun's central temperature from $T \sim GMm_p/(kR)$ with $M = 1.99\times10^{30}$ kg, $R = 6.96\times10^8$ m. Give the answer in units of 10⁷ K.</p>`, answer: 2.31, tol: 0.02, unit: '×10⁷ K', hints: [R`$m_p = 1.67\times10^{-27}$ kg, $k = 1.38\times10^{-23}$ J/K.`], solution: R`<p>$2.3\times10^7$ K: the right order of magnitude (actual $1.57\times10^7$ K).</p>` },
      { level: 'olympiad', type: 'num', title: 'Sun\'s hydrogen budget', q: R`<p>The Sun will fuse about 10% of its mass of hydrogen on the main sequence, converting 0.7% of that to energy. At constant luminosity, how long does this last, in Gyr?</p>`, answer: 10.4, tol: 0.02, unit: 'Gyr', hints: [R`$0.1\times0.007\,Mc^2/L$.`], solution: R`<p>$0.0007\times1.99\times10^{30}\times9\times10^{16}/3.83\times10^{26} = 3.27\times10^{17}$ s $= 10.4$ Gyr.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sunspot brightness', q: R`<p>A sunspot umbra is at 4000 K, the photosphere at 5772 K. What fraction of the photosphere's surface brightness does the umbra emit?</p>`, answer: 0.2306, tol: 0.01, unit: '', hints: [R`$(T_1/T_2)^4$.`], solution: R`<p>$(4000/5772)^4 = 0.23$: dark only by contrast.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('astro-hr', [
    { title: 'Mass–luminosity', gen(r) { const M = r.step(0.5, 30, 0.1); return { q: R`<p>Estimate the luminosity of a ${f(M)} M☉ main-sequence star using $L \propto M^{3.5}$, in L☉.</p>`, answer: Math.pow(M, 3.5), tol: 0.01, unit: 'L☉', solution: R`<p>$${f(M)}^{3.5} = ${f(Math.pow(M, 3.5))}$.</p>` }; } },
    { title: 'Main-sequence lifetime', gen(r) { const M = r.step(0.5, 30, 0.1); const t = 10 * Math.pow(M, -2.5); return { q: R`<p>Estimate the main-sequence lifetime of a ${f(M)} M☉ star, in Gyr.</p>`, answer: t, tol: 0.01, unit: 'Gyr', solution: R`<p>$10\times${f(M)}^{-2.5} = ${f(t)}$ Gyr.</p>` }; } },
    { title: 'Turn-off mass', gen(r) { const age = r.pick([0.01, 0.05, 0.1, 0.5, 1, 3, 5, 12]); const M = Math.pow(age / 10, -0.4); return { q: R`<p>A cluster is ${age} Gyr old. What is the mass of stars now leaving the main sequence, in M☉?</p>`, answer: M, tol: 0.01, unit: 'M☉', solution: R`<p>$M = (t/10\ \text{Gyr})^{-1/2.5} = ${f(M)}\,M_\odot$.</p>` }; } }
  ]);
})();
