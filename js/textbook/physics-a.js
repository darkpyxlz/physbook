/* Physics chapters following Young & Freedman's University Physics: ch. 11 (equilibrium and elasticity),
   ch. 41 (quantum mechanics II: atomic structure), ch. 42 (molecules and condensed matter). Original text. */
(function () {
  const { R, f, S, QN, QM, P, M } = PB.tbKit();
  const g = 9.8, eV = 1.602177e-19, hbar = 1.054572e-34, me = 9.10938e-31, kB = 1.380649e-23, h = 6.62607e-34;

  /* ================= Y&F 11: equilibrium and elasticity ================= */
  const MAT = { steel: ['steel', 2.0e11, 5.0e8, 7800], al: ['aluminium', 7.0e10, 1.1e8, 2700], cu: ['copper', 1.1e11, 2.2e8, 8960], bone: ['bone (tension)', 1.6e10, 1.3e8, 1900], nylon: ['nylon', 3.0e9, 7.5e7, 1150] };
  PB.tbChapter({
    id: 'elasticity', subject: 'physics', title: 'Equilibrium and Elasticity',
    subtitle: R`When things do not move, and how they deform when loaded. The two conditions for equilibrium, centre of gravity and stability, solving statics problems with beams, cables and hinges, and stress, strain and the elastic moduli (Young's, bulk and shear), up to elastic energy, yield and fracture.`,
    big: 'A bridge, a ladder or a bone at rest has zero net force and zero net torque on it, and those two equations solve most statics problems. But no material is perfectly rigid: every load stretches, squeezes or shears it a little. Elastic moduli tell how much, and strength tells when it breaks.',
    goals: ['Apply ΣF = 0 and Στ = 0, choosing pivot points that simplify the algebra', 'Locate the centre of gravity and judge stability and toppling', 'Solve problems with beams, struts, cables and hinge forces', 'Define stress and strain and use Young’s, bulk and shear moduli', 'Calculate elastic energy and identify the elastic limit, yield point and breaking stress', 'Estimate the limits of structures under their own weight'],
    prereqs: ['rotation'],
    sections: [
      { title: 'Conditions for equilibrium', plain: 'An object stays at rest only if the forces on it add to zero and the turning effects (torques) about any point add to zero; its weight acts at the centre of gravity, and it stays upright while that point is over its base.', html: R`
<p>A rigid body is in <strong>static equilibrium</strong> when it neither accelerates nor starts rotating:</p>
<div class="key"><p>$\sum\vec F = 0$ (first condition), $\qquad\sum\vec\tau = 0$ about <em>any</em> point (second condition)</p></div>
<p>If the net force is zero, the net torque is the same about every point, so you are free to choose the pivot that eliminates the most unknown forces. Gravity on an extended body acts as if concentrated at the <strong>centre of gravity</strong>, which coincides with the centre of mass where $g$ is uniform.</p>
<div class="worked"><p>A uniform 4.0 m plank weighing 200 N rests on supports at its two ends. A 600 N person stands 1.0 m from the left end. Find the support forces.</p>
<p>Torques about the left end: $R_2\cdot4 = 200\cdot2 + 600\cdot1$, so $R_2 = 250$ N. Then $R_1 = 800 - 250 = 550$ N. The support nearer the person carries more.</p></div>
<div data-fig="0"></div>
<h3 class="sub">Stability</h3>
<p>An object resting on a base is stable while a vertical line through its centre of gravity falls within the base. Tilt it until the line passes the edge, and gravity's torque tips it over. Low centres of gravity and wide bases (racing cars, the stance of a wrestler) resist toppling.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A 2.0 m uniform rod of weight 50 N is supported at both ends; a 100 N load hangs 0.5 m from the right end. Force at the right support (N)?`, (50 * 1 + 100 * 1.5) / 2, [R`Take torques about the left end.`], R`$R_R\cdot2 = 50\cdot1 + 100\cdot1.5$: $R_R = 100$ N.`)] },
      { title: 'Solving equilibrium problems', plain: 'Draw every force on the object, pick a pivot that removes unknown forces from the torque equation, then use the force balances to find the rest, including the push or pull of hinges.', html: R`
<p>A reliable method: (1) draw a free-body diagram of one body, marking where each force acts; (2) choose axes and write the force equations; (3) pick a pivot through which unknown forces pass and write the torque equation; (4) solve, and check signs (a negative answer means the force points the other way).</p>
<div class="worked"><p>A sign weighing 200 N hangs from the end of a light horizontal beam hinged to a wall. A cable from the beam's end to the wall makes 30° with the beam. Find the cable tension and the hinge force.</p>
<p>Torques about the hinge (beam length $L$): $T\sin30^\circ\cdot L = 200\cdot L$, so $T = 400$ N. Horizontally, the hinge pushes outwards with $T\cos30^\circ = 346$ N; vertically, $T\sin30^\circ = 200$ N already balances the sign, so the hinge's vertical force is zero. A shallower cable would need far more tension.</p></div>
<p>The same steps solve ladders against walls (see Rotation), cranes, the forearm holding a weight (muscle forces many times the load because muscles attach close to joints), and trusses in bridges, where each joint is a small equilibrium problem.</p>
<div class="worked"><p>A box 1.0 m tall and 0.40 m wide, of mass 50 kg, is pushed horizontally at its top edge. If friction stops it sliding, what push makes it start to tip?</p>
<p>About the far bottom edge: tipping begins when $F\cdot1.0 = mg\cdot0.20$, so $F = 98$ N.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`In the sign example, what tension (N) would be needed if the cable made 20° with the beam?`, 200 / Math.sin(20 * Math.PI / 180), [R`$T\sin\theta = 200$.`], R`$200/\sin20^\circ = 585$ N.`)] },
      { title: 'Stress, strain and elastic moduli', plain: 'Stress is force per area, strain is the fractional change in shape, and their ratio is a property of the material: Young’s modulus for stretching, the bulk modulus for squeezing all round, and the shear modulus for sliding layers.', html: R`
<p>Load a material and it deforms. <strong>Stress</strong> is the force per unit area causing it (units Pa); <strong>strain</strong> is the fractional deformation (no units). For small deformations they are proportional (Hooke's law), and the ratio is an <strong>elastic modulus</strong>:</p>
<ul><li><strong>Tension or compression</strong>: Young's modulus $Y = \dfrac{F/A}{\Delta l/l_0}$. Steel $2.0\times10^{11}$ Pa, aluminium $7\times10^{10}$, bone about $1.6\times10^{10}$, rubber about $10^6$.</li>
<li><strong>Uniform pressure</strong>: bulk modulus $B = -\dfrac{\Delta p}{\Delta V/V_0}$. Water $2.2\times10^9$ Pa (its compressibility $1/B$ is small, but not zero).</li>
<li><strong>Shear</strong> (forces parallel to opposite faces): shear modulus $S = \dfrac{F_\parallel/A}{x/h}$. Fluids have no shear modulus: they flow.</li></ul>
<div class="worked"><p>A steel wire 2.0 m long with cross-section 1.0 mm² carries 200 N. How much does it stretch? And how much is water compressed at the bottom of the Mariana Trench ($1.1\times10^8$ Pa)?</p>
<p>Stress $= 200/10^{-6} = 2\times10^8$ Pa; strain $= 2\times10^8/2\times10^{11} = 10^{-3}$; stretch $= 2$ mm. Water: $\Delta V/V = 1.1\times10^8/2.2\times10^9 = 5\%$, so the deep ocean is slightly denser, and sea level is about 30 m lower than it would be if water were incompressible.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`An aluminium rod ($Y = 7.0\times10^{10}$ Pa) 1.0 m long, cross-section 2.0 cm², carries 14 kN in tension. Extension in mm?`, 14000 / 2e-4 / 7e10 * 1000, [R`$\Delta l = Fl_0/(YA)$.`], R`Stress $7\times10^7$ Pa, strain $10^{-3}$: 1.0 mm.`)] },
      { title: 'Elastic energy, yielding and breaking', plain: 'Up to a limit, a stretched material stores energy and springs back; beyond the elastic limit it deforms permanently, and at its breaking stress it fails, which even limits how long a wire can hang under its own weight.', html: R`
<p>A stress–strain curve starts straight (Hooke's law) up to the <strong>proportional limit</strong>. Up to the <strong>elastic limit</strong> the material springs back fully; beyond it, at the <strong>yield point</strong>, it deforms permanently (plastic flow). The largest stress it withstands is its <strong>ultimate tensile strength</strong>; then it breaks. <strong>Ductile</strong> materials (copper, mild steel) stretch a lot plastically before breaking; <strong>brittle</strong> ones (glass, cast iron, ceramics) break soon after the elastic limit.</p>
<p>A stretched wire stores elastic energy $U = \tfrac12F\Delta l = \dfrac{YA}{2l_0}(\Delta l)^2$, or per unit volume $\tfrac12\times\text{stress}\times\text{strain}$.</p>
<div class="worked"><p>How long can a vertical steel wire hang before it breaks under its own weight? (Tensile strength $5\times10^8$ Pa, density 7800 kg/m³.)</p>
<p>At the top, stress $= \rho gL$ (the weight of wire below, per unit area, independent of the area). Breaking when $\rho gL = \sigma$: $L = 5\times10^8/(7800\cdot9.8) = 6.5$ km. This is why space elevators would need materials such as carbon nanotubes, whose strength-to-density ratio is a hundred times better.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How much elastic energy (J) is stored in the 2.0 m steel wire stretched 2.0 mm by 200 N?`, 0.2, [R`$U = \tfrac12F\Delta l$.`], R`$0.5\cdot200\cdot0.002 = 0.20$ J.`)] }
    ],
    figures: [{ s: 0, title: 'Support forces on a plank', caption: 'A 4 m plank (200 N) on supports at each end, with a 600 N person standing at position x. Each support takes more load as the person walks towards it.', params: { aspect: 0.4, minH: 210, controls: [S('x', 'Person’s position', 0, 4, 0.05, 1, 'm')],
      plots: [{ x: [0, 4], y: [0, 800], xlabel: 'person’s position x (m)', ylabel: 'support force (N)', curves: () => [{ f: (x) => 800 - (400 + 600 * x) / 4, label: 'left support' }, { f: (x) => (400 + 600 * x) / 4, color: 'rust', label: 'right support' }], vlines: (v) => [{ x: v.x }] }],
      readout: (v) => [['left support', f(800 - (400 + 600 * v.x) / 4) + ' N'], ['right support', f((400 + 600 * v.x) / 4) + ' N']] } }],
    labs: [{ sim: 'explore', title: 'Stretching a wire', desc: 'Hang a load on a wire of a chosen material. The lab gives the stress, strain and extension, and warns when the stress passes the breaking strength.',
      tasks: ['Double the wire’s diameter. What happens to the extension?', 'What load breaks a 1 mm steel wire?', 'Compare bone and steel: which is stronger per kilogram?'],
      params: { aspect: 0.42, controls: [{ id: 'm', type: 'select', label: 'Material', value: 'steel', options: Object.keys(MAT).map((k) => [k, MAT[k][0]]) }, S('d', 'Diameter', 0.2, 5, 0.1, 1, 'mm'), S('L', 'Length', 0.5, 10, 0.5, 2, 'm'), S('F', 'Load', 0, 2000, 10, 200, 'N')],
        plots: [{ x: [0, 2000], y: [0, 40], xlabel: 'load (N)', ylabel: 'extension (mm)', curves: (v) => { const A = Math.PI * Math.pow(v.d / 2000, 2), mt = MAT[v.m]; return [{ f: (F) => F / A > mt[2] ? NaN : 1000 * F * v.L / (mt[1] * A) }]; }, pts: (v) => { const A = Math.PI * Math.pow(v.d / 2000, 2), mt = MAT[v.m]; return [{ x: v.F, y: Math.min(40, 1000 * v.F * v.L / (mt[1] * A)), color: v.F / A > mt[2] ? 'rust' : 'points' }]; } }],
        readout: (v) => { const A = Math.PI * Math.pow(v.d / 2000, 2), mt = MAT[v.m], st = v.F / A; return [['stress', f(st / 1e6) + ' MPa'], ['strain', f(st / mt[1], 3)], ['extension', f(1000 * v.F * v.L / (mt[1] * A)) + ' mm'], ['status', st > mt[2] ? 'BROKEN (beyond tensile strength)' : f(100 * st / mt[2]) + '% of breaking stress'], ['breaking load', f(mt[2] * A) + ' N']]; } } }],
    formulas: [['Equilibrium', '\\sum\\vec F = 0,\\quad\\sum\\vec\\tau = 0'], ['Young’s modulus', 'Y = \\dfrac{F/A}{\\Delta l/l_0}'], ['Bulk modulus', 'B = -\\dfrac{\\Delta p}{\\Delta V/V_0}'], ['Shear modulus', 'S = \\dfrac{F_\\parallel/A}{x/h}'], ['Elastic energy', 'U = \\tfrac12F\\Delta l'], ['Breaking length', 'L = \\sigma_{\\text{ult}}/(\\rho g)']],
    problems: [
      M('concept', 'The second condition', R`An object has zero net force on it. To be in equilibrium it also needs…`, ['zero net torque', 'zero velocity only', 'equal forces at each support', 'its centre of gravity at its centre'], 0, [R`It could still spin up.`], R`Zero net torque, about any point.`),
      M('concept', 'Ductile materials', R`A ductile material…`, ['deforms plastically a lot before breaking', 'breaks just beyond its elastic limit', 'has no elastic region', 'cannot be stretched'], 0, [R`Copper wire.`], R`Ductile metals can be drawn into wires.`),
      M('concept', 'Units', R`The SI unit of Young's modulus is…`, ['the pascal', 'the newton', 'N/m', 'dimensionless'], 0, [R`Stress divided by a pure number.`], R`Pa (N/m²).`),
      M('concept', 'Fluids', R`Why do fluids have no shear modulus?`, ['They flow instead of resisting a steady shear stress', 'They are incompressible', 'Their molecules are too far apart', 'They have no weight'], 0, [R`What happens when you push layers of water sideways?`], R`A fluid deforms continuously under shear.`),
      P('core', 'num', 'Plank support', R`A 4.0 m, 200 N uniform plank on end supports with a 600 N person 1.0 m from the left. Right support force (N)?`, 250, [R`Torques about the left end.`], R`$(400 + 600)/4 = 250$ N.`),
      P('core', 'num', 'Cable tension', R`A light horizontal beam holds a 200 N sign at its end, supported by a cable at 30° to the beam. Tension (N)?`, 400, [R`$T\sin30^\circ L = 200L$.`], R`400 N.`),
      P('core', 'num', 'Wire stretch', R`Steel wire ($Y = 2\times10^{11}$ Pa), length 2.0 m, area 1.0 mm², load 200 N. Extension (mm)?`, 2, [R`$\Delta l = Fl/(YA)$.`], R`2.0 mm.`),
      P('core', 'num', 'Deep water', R`Fractional volume change (%) of water ($B = 2.2\times10^9$ Pa) at $1.1\times10^8$ Pa?`, 5, [R`$\Delta V/V = \Delta p/B$.`], R`5%.`),
      P('core', 'num', 'Shear', R`A steel block ($S = 8\times10^{10}$ Pa) 5.0 cm high with a 10 cm × 10 cm top face carries a sideways force of $1.0\times10^5$ N on the top. Sideways displacement in μm?`, 1e5 * 0.05 / (8e10 * 0.01) * 1e6, [R`$x = F_\parallel h/(SA)$.`], R`$6.25$ μm.`),
      P('core', 'num', 'Tipping box', R`A 50 kg box, 1.0 m tall and 0.40 m wide, is pushed horizontally at its top. Push (N) that starts it tipping (no sliding)?`, 50 * g * 0.2, [R`Torques about the far bottom edge.`], R`$98$ N.`),
      P('olympiad', 'num', 'Hanging steel', R`Longest steel wire (strength $5\times10^8$ Pa, density 7800 kg/m³) that can hang vertically without breaking, in km?`, 5e8 / (7800 * g) / 1000, [R`$L = \sigma/\rho g$.`], R`$6.5$ km.`),
      P('olympiad', 'num', 'Wires in series', R`A 100 N load hangs from a steel wire (1.0 m, $Y = 2\times10^{11}$ Pa) joined below a copper wire (1.0 m, $Y = 1.1\times10^{11}$ Pa), both 1.0 mm² in area. Total extension (mm)?`, (100 * 1 / (2e11 * 1e-6) + 100 * 1 / (1.1e11 * 1e-6)) * 1000, [R`Each carries the full load; add extensions.`], R`$0.50 + 0.91 = 1.41$ mm.`),
      P('olympiad', 'num', 'Thermal stress', R`A steel rail ($Y = 2\times10^{11}$ Pa, $\alpha = 1.2\times10^{-5}$ K⁻¹) is clamped at both ends and heated by 30 K. What stress (MPa) builds up?`, 2e11 * 1.2e-5 * 30 / 1e6, [R`Prevented strain $= \alpha\Delta T$.`], R`$72$ MPa.`),
      P('olympiad', 'num', 'Elastic energy density', R`What elastic energy per cubic metre (MJ/m³) does steel store at a stress of 400 MPa?`, 0.5 * 4e8 * 4e8 / 2e11 / 1e6, [R`$\tfrac12\sigma^2/Y$.`], R`$0.4$ MJ/m³; rubber, far more stretchy, stores much more per kilogram.`)
    ],
    drills: [
      { title: 'Extension of a wire', gen: (r) => { const F = r.pick([50, 100, 200, 500]), L = r.pick([1, 2, 3]), A = r.pick([0.5, 1, 2]); return { q: R`<p>Steel ($Y = 2\times10^{11}$ Pa): ${F} N on a ${L} m wire of area ${A} mm². Extension (mm)?</p>`, answer: F * L / (2e11 * A * 1e-6) * 1000, tol: 0.01, solution: R`<p>$${F}\cdot${L}/(2\times10^{11}\cdot${A}\times10^{-6}) = ${f(F * L / (2e11 * A * 1e-6) * 1000, 4)}$ mm.</p>` }; } },
      { title: 'Support forces', gen: (r) => { const L = r.pick([2, 4, 5]), W = r.pick([100, 200]), P2 = r.pick([300, 500, 700]), x = r.pick([0.5, 1, 1.5]); return { q: R`<p>Uniform ${L} m plank of ${W} N on end supports; ${P2} N load ${x} m from the left. Right support (N)?</p>`, answer: (W * L / 2 + P2 * x) / L, tol: 0.01, solution: R`<p>$(${W}\cdot${L / 2} + ${P2}\cdot${x})/${L} = ${f((W * L / 2 + P2 * x) / L, 4)}$ N.</p>` }; } }
    ],
    predict: { q: 'Doubling a wire’s diameter, with the same load and length, changes its stretch to…', o: ['a quarter as much', 'half as much', 'the same'], a: 0, how: 'double the diameter in the wire lab.', why: 'Area grows as the diameter squared, so stress and strain fall to a quarter.' },
    wild: ['Bridges and buildings', 'Engineers check every beam with ΣF = 0 and Στ = 0, then size it so stresses stay well below the yield strength: the same two equations hold up every bridge.']
  });

  /* ================= Y&F 41: atomic structure ================= */
  const radial = (n, r) => n === '1s' ? 4 * r * r * Math.exp(-2 * r) : n === '2s' ? r * r * Math.pow(2 - r, 2) * Math.exp(-r) / 8 : n === '2p' ? Math.pow(r, 4) * Math.exp(-r) / 24 : n === '3s' ? 4 * r * r * Math.pow(27 - 18 * r + 2 * r * r, 2) * Math.exp(-2 * r / 3) / 19683 : 0;
  const kAlpha = (Z) => 10.2 * Math.pow(Z - 1, 2); // eV
  PB.tbChapter({
    id: 'atoms', subject: 'physics', title: 'Atomic Structure',
    subtitle: R`Quantum mechanics applied to atoms. The hydrogen atom in three dimensions and its quantum numbers, orbital angular momentum and probability distributions, magnetic moments and the Zeeman effect, electron spin and the Stern–Gerlach experiment, the exclusion principle and the periodic table, X-ray spectra (Moseley's law) and lasers.`,
    big: 'Solving the Schrödinger equation for hydrogen gives the same energies as Bohr’s model, but replaces orbits with clouds of probability labelled by quantum numbers. Add the electron’s spin and the Pauli exclusion principle, and the whole periodic table follows. Magnetic fields split the levels; inner-shell electrons give X-rays that identify each element.',
    goals: ['State the quantum numbers n, l, mₗ and mₛ and their allowed values', 'Calculate orbital angular momentum and its z-component', 'Interpret radial probability distributions for hydrogen orbitals', 'Explain the Zeeman effect and calculate level splittings with the Bohr magneton', 'Explain electron spin, the Stern–Gerlach experiment and the exclusion principle', 'Apply Moseley’s law and the X-ray cutoff; explain how lasers work'],
    prereqs: ['quantum'],
    sections: [
      { title: 'The hydrogen atom in three dimensions', plain: 'The Schrödinger equation for hydrogen gives energy levels depending only on n, while two more quantum numbers fix the size and direction of the electron’s orbital angular momentum, and orbitals are clouds of probability rather than paths.', html: R`
<p>In three dimensions the Schrödinger equation for the hydrogen atom has solutions labelled by three quantum numbers:</p>
<ul><li><strong>principal</strong> $n = 1, 2, 3, \dots$, which sets the energy $E_n = -\dfrac{13.6\ \text{eV}}{n^2}$ (the same as Bohr's model);</li>
<li><strong>orbital</strong> $l = 0, 1, \dots, n - 1$ (labelled s, p, d, f…), giving angular momentum of magnitude $L = \sqrt{l(l + 1)}\,\hbar$;</li>
<li><strong>magnetic</strong> $m_l = -l, \dots, +l$, giving its component along any chosen axis, $L_z = m_l\hbar$.</li></ul>
<p>Because $|L_z| &lt; L$ (except when $l = 0$), the angular momentum can never point exactly along an axis: its direction is uncertain. Each level $n$ contains $n^2$ orbital states ($2n^2$ with spin), all with the same energy in hydrogen.</p>
<p>$|\psi|^2$ gives the probability density. The <strong>radial probability</strong> $P(r) = 4\pi r^2|\psi|^2$ (for spherical states) peaks at the Bohr radius $a_0 = 52.9$ pm for the 1s state. The 2s state has a node (a radius of zero probability) and the 2p state none in its radial part, so it peaks at $4a_0$.</p>
<div class="worked"><p>For an electron with $l = 2$, find $L$ and all the possible values of $L_z$, and the smallest angle $\vec L$ can make with the z-axis.</p>
<p>$L = \sqrt6\,\hbar = 2.45\hbar$. $L_z = -2\hbar, \dots, 2\hbar$ (five values). Smallest angle: $\cos\theta = 2/\sqrt6$, $\theta = 35.3^\circ$.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many states (including spin) have $n = 3$?`, 18, [R`$2n^2$.`], R`18.`)] },
      { title: 'Magnetic moments, the Zeeman effect and spin', plain: 'An orbiting electron is a tiny magnet, so a magnetic field splits energy levels according to their angular momentum direction (the Zeeman effect); the Stern–Gerlach experiment showed electrons also carry an intrinsic spin with only two orientations.', html: R`
<p>An electron with orbital angular momentum behaves as a current loop with magnetic moment $\vec\mu = -\dfrac{e}{2m}\vec L$. Its component along $z$ is $-m_l\mu_B$, where the <strong>Bohr magneton</strong> is</p>
<div class="key"><p>$\mu_B = \dfrac{e\hbar}{2m} = 9.274\times10^{-24}\ \text{J/T} = 5.788\times10^{-5}\ \text{eV/T}$</p></div>
<p>In a magnetic field $B$, a level splits into $2l + 1$ sublevels with energies shifted by $U = m_l\mu_BB$: the <strong>Zeeman effect</strong>. Astronomers measure magnetic fields on the Sun from the splitting of its spectral lines.</p>
<div class="worked"><p>How far apart are adjacent Zeeman sublevels in a 1.0 T field, and how large is the wavelength shift of a 656 nm line?</p>
<p>$\Delta E = \mu_BB = 5.79\times10^{-5}$ eV. $\Delta\lambda = \lambda^2\Delta E/hc = (656\ \text{nm})^2\cdot5.79\times10^{-5}\ \text{eV}/1240\ \text{eV nm} = 0.020$ nm: small, but easily resolved by a good grating.</p></div>
<h3 class="sub">Spin</h3>
<p>In 1922 Otto Stern and Walther Gerlach sent silver atoms through a non-uniform magnetic field. Classically the beam should smear out; it split into exactly <strong>two</strong>. Silver's outer electron has $l = 0$, so the splitting comes from an intrinsic angular momentum, <strong>spin</strong>, with $s = \tfrac12$ and only two components, $m_s = \pm\tfrac12$. The spin magnetic moment is about one Bohr magneton. Coupling between spin and orbital motion (<strong>spin–orbit coupling</strong>) splits levels slightly: the sodium D line is really a doublet, 589.0 and 589.6 nm.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Zeeman splitting between adjacent sublevels in a 2.0 T field, in units of $10^{-4}$ eV?`, 2 * 5.788e-5 * 1e4, [R`$\Delta E = \mu_BB$.`], R`$1.16\times10^{-4}$ eV.`)] },
      { title: 'The exclusion principle and the periodic table', plain: 'No two electrons in an atom can share all four quantum numbers, so electrons fill shells in order of energy, and inner electrons shield outer ones from the nucleus, which explains the structure of the periodic table.', html: R`
<p>The <strong>Pauli exclusion principle</strong>: no two electrons in an atom can have the same set of quantum numbers $(n, l, m_l, m_s)$. So each orbital holds at most two electrons (spins opposite), a subshell holds $2(2l + 1)$, and a shell $2n^2$. Filling states in order of increasing energy builds the periodic table: the noble gases close shells, alkali metals have one electron beyond a closed shell, and so on.</p>
<p>In many-electron atoms, subshells with the same $n$ no longer have equal energies: an s electron penetrates closer to the nucleus than a p or d electron, so it is less <strong>screened</strong> by inner electrons and lies lower. The outer electron sees an <strong>effective nuclear charge</strong> $Z_{\text{eff}}$, and its energy is roughly $-13.6\,Z_{\text{eff}}^2/n^2$ eV.</p>
<div class="worked"><p>Lithium's outer 2s electron is bound by 5.39 eV. What effective charge does it feel?</p>
<p>$13.6\,Z_{\text{eff}}^2/4 = 5.39$ gives $Z_{\text{eff}} = 1.26$: the nucleus's +3 is screened by the two 1s electrons, but not completely.</p></div>
<p>The exclusion principle has huge consequences beyond atoms: it makes matter take up space, gives metals their conduction electrons a high-energy "Fermi sea", and holds up white dwarf stars against gravity.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Maximum number of electrons in a d subshell?`, 10, [R`$2(2l + 1)$ with $l = 2$.`], R`10.`)] },
      { title: 'X-rays and lasers', plain: 'When an inner-shell electron is knocked out, the vacancy is filled with the emission of an X-ray whose energy depends on the square of the nuclear charge (Moseley’s law); lasers produce intense, coherent light by stimulated emission from a population inversion.', html: R`
<p>Electrons hitting a metal target produce two kinds of X-rays. <strong>Bremsstrahlung</strong> ("braking radiation") forms a continuous spectrum with a sharp short-wavelength cutoff, $\lambda_{\min} = hc/eV$, when an electron gives up all its energy $eV$ to one photon. <strong>Characteristic</strong> lines appear when an incoming electron knocks out an inner (K-shell) electron and an L electron drops into the hole: the <strong>Kα</strong> line.</p>
<p>The L electron sees the nucleus screened by the one remaining K electron, so roughly $Z - 1$ charges. Bohr's formula then gives <strong>Moseley's law</strong>:</p>
<div class="key"><p>$E_{K\alpha} \approx 13.6\ \text{eV}\,(Z - 1)^2\left(1 - \tfrac14\right) = 10.2\ \text{eV}\,(Z - 1)^2$</p></div>
<p>In 1913 Henry Moseley used it to show that atomic number, not atomic mass, orders the elements, and to predict missing elements (43, 61, 72, 75).</p>
<div class="worked"><p>Estimate the Kα energy of copper (Z = 29) and the cutoff wavelength of an X-ray tube at 30 kV.</p>
<p>$10.2\cdot28^2 = 8.0$ keV (measured 8.05 keV, the standard copper X-ray line for crystallography). Cutoff: $\lambda_{\min} = 1240\ \text{eV nm}/30\,000\ \text{eV} = 0.041$ nm.</p></div>
<h3 class="sub">Lasers</h3>
<p>A photon of the right energy can trigger an excited atom to emit an identical photon (<strong>stimulated emission</strong>), same direction and phase. Normally more atoms are in lower states, so absorption wins. A laser pumps atoms into a long-lived (metastable) excited state to create a <strong>population inversion</strong>; mirrors bounce light back and forth so stimulated emission builds up into an intense, coherent, single-wavelength beam (the helium–neon laser at 632.8 nm, diode lasers in barcode readers and fibre optics).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Estimate the Kα energy (keV) of molybdenum (Z = 42).`, kAlpha(42) / 1000, [R`$10.2(Z - 1)^2$ eV.`], R`$10.2\cdot41^2 = 17.1$ keV (measured 17.5).`)] }
    ],
    figures: [{ s: 0, title: 'Radial probability in hydrogen', caption: 'Probability of finding the electron at distance r from the nucleus (in Bohr radii) for different states. Peaks mark the most probable radii; zeros are radial nodes.', params: { aspect: 0.4, minH: 210, controls: [{ id: 'o', type: 'select', label: 'State', value: '1s', options: [['1s', '1s'], ['2s', '2s'], ['2p', '2p'], ['3s', '3s']] }],
      plots: [{ x: [0, 20], y: [0, 0.6], xlabel: 'r / a₀', ylabel: 'P(r)', n: 400, curves: (v) => [{ f: (r) => radial(v.o, r) }] }],
      readout: (v) => { let best = 0, bx = 0; for (let r = 0.01; r < 20; r += 0.01) { const p = radial(v.o, r); if (p > best) { best = p; bx = r; } } return [['most probable r', f(bx, 3) + ' a₀ = ' + f(bx * 52.9, 3) + ' pm']]; } } }],
    labs: [{ sim: 'explore', title: 'Moseley’s law', desc: 'Kα X-ray energy and wavelength for any element, from E ≈ 10.2 eV (Z − 1)². Moseley’s straight line of √f against Z ordered the periodic table.',
      tasks: ['Which element emits Kα X-rays of 6.4 keV?', 'Why is the plot of √E against Z a straight line?', 'Find an element whose Kα wavelength is close to 0.1 nm.'],
      params: { aspect: 0.42, controls: [S('Z', 'Atomic number Z', 5, 92, 1, 29)],
        plots: [{ x: [0, 95], y: [0, 100], xlabel: 'Z', ylabel: '√(E / eV)', curves: () => [{ f: (z) => Math.sqrt(Math.max(0, kAlpha(z))) }], pts: (v) => [{ x: v.Z, y: Math.sqrt(kAlpha(v.Z)) }] }],
        readout: (v) => [['Kα energy', f(kAlpha(v.Z) / 1000) + ' keV'], ['wavelength', f(1239.84 / kAlpha(v.Z), 3) + ' nm']] } }],
    formulas: [['Hydrogen energies', 'E_n = -\\dfrac{13.6\\ \\text{eV}}{n^2}'], ['Orbital angular momentum', 'L = \\sqrt{l(l+1)}\\,\\hbar,\\quad L_z = m_l\\hbar'], ['Bohr magneton', '\\mu_B = \\dfrac{e\\hbar}{2m} = 5.788\\times10^{-5}\\ \\text{eV/T}'], ['Zeeman shift', 'U = m_l\\mu_BB'], ['Moseley’s law', 'E_{K\\alpha} \\approx 10.2\\ \\text{eV}(Z - 1)^2'], ['X-ray cutoff', '\\lambda_{\\min} = hc/eV']],
    problems: [
      M('concept', 'Stern–Gerlach', R`Silver atoms passing through a non-uniform magnetic field split into two beams. This shows…`, ['the electron has spin with two possible orientations', 'silver has two isotopes', 'the field was too strong', 'orbital angular momentum l = 1'], 0, [R`Silver’s outer electron has l = 0.`], R`Two beams: $m_s = \pm\tfrac12$.`),
      M('concept', 'Exclusion principle', R`The Pauli exclusion principle states that no two electrons in an atom can…`, ['have the same four quantum numbers', 'be in the same shell', 'have the same spin', 'have the same energy'], 0, [R`n, l, mₗ, mₛ.`], R`Each complete set of quantum numbers holds at most one electron.`),
      M('concept', 'Zeeman effect', R`The Zeeman effect is the splitting of spectral lines by…`, ['a magnetic field', 'an electric field', 'temperature', 'pressure'], 0, [R`Magnetic moments.`], R`A magnetic field.`),
      M('concept', 'Lasers', R`A laser needs a population inversion, meaning…`, ['more atoms in the upper level than the lower one', 'more atoms in the ground state', 'equal populations', 'no atoms excited'], 0, [R`Stimulated emission must beat absorption.`], R`Upper-level population exceeds lower.`),
      P('core', 'num', 'States with n = 3', R`How many states (including spin) have $n = 3$?`, 18, [R`$2n^2$.`], R`18.`),
      P('core', 'num', 'Angular momentum', R`Magnitude of the orbital angular momentum for $l = 3$, in units of $\hbar$?`, Math.sqrt(12), [R`$\sqrt{l(l+1)}$.`], R`$\sqrt{12} = 3.46$.`),
      P('core', 'num', 'Copper Kα', R`Moseley estimate of copper's (Z = 29) Kα energy, in keV?`, kAlpha(29) / 1000, [R`$10.2(Z - 1)^2$.`], R`$8.0$ keV.`),
      P('core', 'num', 'X-ray cutoff', R`Shortest X-ray wavelength (nm) from a tube operating at 30 kV?`, 1239.84 / 30000, [R`$\lambda = hc/eV$.`], R`$0.041$ nm.`),
      P('core', 'num', 'Lithium', R`With $Z_{\text{eff}} = 1.26$, estimate the binding energy (eV) of lithium's 2s electron.`, 13.6 * 1.26 * 1.26 / 4, [R`$13.6Z_{\text{eff}}^2/n^2$.`], R`$5.40$ eV (measured 5.39).`),
      P('core', 'num', 'Angle of L', R`For $l = 1$, $m_l = 1$, what angle (degrees) does $\vec L$ make with the z-axis?`, Math.acos(1 / Math.SQRT2) * 180 / Math.PI, [R`$\cos\theta = m_l/\sqrt{l(l+1)}$.`], R`$45^\circ$.`),
      P('olympiad', 'num', 'Zeeman in wavelength', R`Shift (nm) of a 656 nm line between adjacent Zeeman components in a 1.0 T field?`, 656 * 656 * 5.788e-5 / 1239.84, [R`$\Delta\lambda = \lambda^2\Delta E/hc$.`], R`$0.020$ nm.`),
      P('olympiad', 'num', 'Identify the element', R`An unknown sample emits Kα X-rays at 6.40 keV. Its atomic number?`, 26, [R`Solve $10.2(Z - 1)^2 = 6400$.`], R`$Z - 1 = 25.0$: iron.`),
      P('olympiad', 'num', 'Most probable 2p radius', R`The 2p radial probability $P \propto r^4e^{-r/a_0}$ peaks where? Give the answer in pm ($a_0 = 52.9$ pm).`, 4 * 52.9, [R`Differentiate: $4r^3 - r^4/a_0 = 0$.`], R`$r = 4a_0 = 212$ pm, matching Bohr's $n^2a_0$.`),
      P('olympiad', 'num', 'Shell capacity', R`How many electrons can the n = 4 shell hold?`, 32, [R`$2n^2$.`], R`32.`)
    ],
    drills: [
      { title: 'Moseley’s law', gen: (r) => { const Z = r.int(11, 82); return { q: R`<p>Estimate the Kα energy (keV) for Z = ${Z}.</p>`, answer: kAlpha(Z) / 1000, tol: 0.01, solution: R`<p>$10.2\cdot${Z - 1}^2 = ${f(kAlpha(Z) / 1000, 4)}$ keV.</p>` }; } },
      { title: 'Counting states', gen: (r) => { const n = r.int(1, 6); return { q: R`<p>How many electron states (with spin) are in shell $n = ${n}$?</p>`, answer: 2 * n * n, tol: 0.0001, solution: R`<p>$2n^2 = ${2 * n * n}$.</p>` }; } }
    ],
    predict: { q: 'The energy of an element’s Kα X-rays grows roughly as…', o: ['(Z − 1)²', 'Z', '√Z'], a: 0, how: 'slide Z in the Moseley lab and watch √E rise in a straight line.', why: 'The L electron falling into the K-shell hole sees about Z − 1 nuclear charges, and Bohr energies scale as charge squared.' },
    wild: ['X-ray fluorescence', 'Handheld XRF guns identify metals in scrap yards, lead in old paint and the pigments of famous paintings by reading the characteristic X-ray lines Moseley explained.']
  });

  /* ================= Y&F 42: molecules and condensed matter ================= */
  const fd = (E, Ef, T) => 1 / (Math.exp((E - Ef) * eV / (kB * T)) + 1);
  const diode = (V, T) => Math.exp(V * eV / (kB * T)) - 1;
  PB.tbChapter({
    id: 'condensed', subject: 'physics', title: 'Molecules and Condensed Matter',
    subtitle: R`From bonds to transistors. Molecular bonds and molecular spectra, crystal lattices, the free-electron model and the Fermi energy, energy bands that separate conductors, insulators and semiconductors, doping and the p–n junction (diodes, LEDs, solar cells, transistors), and superconductivity.`,
    big: 'When atoms come together, their outer electron levels broaden into bands. Whether the highest occupied band is full or partly full decides whether a solid conducts. Semiconductors sit in between, and adding a few impurity atoms per million turns them into the diodes, LEDs, solar cells and transistors of modern technology.',
    goals: ['Describe ionic, covalent, van der Waals and hydrogen bonds and molecular energy levels', 'Describe common crystal lattices and calculate densities and packing fractions', 'Use the free-electron model to find the Fermi energy, and the Fermi–Dirac distribution', 'Explain conductors, insulators and semiconductors with band theory', 'Explain doping, the p–n junction, diodes, LEDs and solar cells', 'Describe superconductivity and its applications'],
    prereqs: ['atoms'],
    sections: [
      { title: 'Molecular bonds and spectra', plain: 'Atoms bond by transferring electrons (ionic), sharing them (covalent), or through weaker attractions such as van der Waals forces and hydrogen bonds; molecules have rotational and vibrational energy levels much closer together than electronic ones.', html: R`
<p><strong>Ionic bonds</strong> form when an electron transfers (Na → Cl) and the ions attract; <strong>covalent bonds</strong> share electrons, with the shared pair concentrated between the nuclei. Weaker interactions hold molecules to each other: <strong>van der Waals</strong> forces between fluctuating dipoles (they keep geckos on ceilings and let noble gases liquefy), and <strong>hydrogen bonds</strong> between an H on N, O or F and a lone pair (they hold DNA strands together and make water's boiling point so high). Bond energies range from a few eV (covalent) to tenths of an eV (hydrogen bonds) to hundredths (van der Waals).</p>
<p>Besides electronic levels, molecules have <strong>rotational</strong> levels, $E = \dfrac{\hbar^2}{2I}l(l + 1)$, spaced by about $10^{-3}$ eV, and <strong>vibrational</strong> levels, $E = (n + \tfrac12)\hbar\omega$, spaced by about 0.1–0.5 eV (see Molecular Spectroscopy). Comparing with $kT \approx 0.026$ eV at room temperature: many rotational levels are populated, but vibrations are mostly in their ground state.</p>
<div class="worked"><p>H₂ vibrates at 4161 cm⁻¹. What is its vibrational quantum in eV, and how many times $kT$ at 300 K?</p>
<p>$E = hc\tilde\nu = 4161\cdot1.24\times10^{-4}\ \text{eV} = 0.516$ eV; $kT = 0.0259$ eV, so the ratio is 20. Almost no H₂ molecules vibrate at room temperature, which is why hydrogen's heat capacity is $\tfrac52R$.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which interaction is weakest?`, ['van der Waals attraction between argon atoms', 'a hydrogen bond in water', 'the covalent bond in H₂', 'the ionic bond in NaCl'], 0, [R`Fluctuating dipoles.`], R`Van der Waals forces are around 0.01 eV per pair.`)] },
      { title: 'Crystals', plain: 'In crystals atoms repeat in regular lattices such as simple cubic, body-centred and face-centred cubic; counting atoms per unit cell gives the density, and the way the atoms are bonded decides whether the solid is ionic, covalent, metallic or molecular.', html: R`
<p>A <strong>crystal</strong> is a regular, repeating arrangement: a <strong>lattice</strong> of points with an identical <strong>basis</strong> (atom or group) at each. Common cubic lattices:</p>
<ul><li><strong>simple cubic</strong>: 1 atom per cell (polonium);</li>
<li><strong>body-centred cubic</strong>: 2 atoms per cell (iron, sodium);</li>
<li><strong>face-centred cubic</strong>: 4 atoms per cell (copper, aluminium, gold), the densest packing of spheres, filling 74% of space ($\pi/(3\sqrt2)$).</li></ul>
<div class="worked"><p>Copper is fcc with cube edge 361 pm and atomic mass 63.55 u. Calculate its density.</p>
<p>$\rho = \dfrac{4\cdot63.55\cdot1.6605\times10^{-27}}{(3.61\times10^{-10})^3} = \dfrac{4.22\times10^{-25}}{4.70\times10^{-29}} = 8970\ \text{kg/m}^3$ (measured 8960).</p></div>
<p>By bonding, solids are <strong>ionic</strong> (NaCl: each ion surrounded by six of the other kind), <strong>covalent</strong> (diamond, silicon: each atom bonded tetrahedrally to four others; very hard), <strong>metallic</strong> (positive ions in a sea of shared electrons; ductile and conducting) or <strong>molecular</strong> (held by van der Waals or hydrogen bonds; soft, low melting). Real crystals have defects (vacancies, impurities, dislocations), which control strength and doping.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many atoms are in a body-centred cubic unit cell?`, 2, [R`8 corners × 1/8 + 1 centre.`], R`2.`)] },
      { title: 'Free electrons and energy bands', plain: 'In a metal, free electrons fill states up to the Fermi energy, several electronvolts, and only those near the top can respond to heat; in all solids allowed energies form bands, and whether the highest band is full or partly full decides whether the material conducts.', html: R`
<p>In the <strong>free-electron model</strong>, the valence electrons of a metal move freely in a box. The exclusion principle forces them to fill states up to the <strong>Fermi energy</strong>:</p>
<div class="key"><p>$E_F = \dfrac{\hbar^2}{2m}\left(3\pi^2n\right)^{2/3}$</p></div>
<div class="worked"><p>Copper has $n = 8.5\times10^{28}$ free electrons per m³. Find $E_F$ and the speed of electrons at the Fermi surface.</p>
<p>$(3\pi^2n)^{2/3} = (2.52\times10^{30})^{2/3} = 1.85\times10^{20}\ \text{m}^{-2}$; $E_F = 1.11\times10^{-68}\cdot1.85\times10^{20}/(1.82\times10^{-30}) = 1.13\times10^{-18}$ J = 7.0 eV. Speed $\sqrt{2E_F/m} = 1.6\times10^6$ m/s, even at absolute zero.</p></div>
<p>At temperature $T$, occupation follows the <strong>Fermi–Dirac distribution</strong> $f(E) = 1/(e^{(E - E_F)/kT} + 1)$: a step at $E_F$ smoothed over only a few $kT$ (0.026 eV at room temperature). Only electrons near $E_F$ can absorb thermal energy, which is why metals' electronic heat capacity is small, a puzzle classical physics could not explain.</p>
<div data-fig="0"></div>
<h3 class="sub">Bands</h3>
<p>Bringing $N$ atoms together splits each atomic level into $N$ closely spaced levels: a <strong>band</strong>. In a <strong>conductor</strong> the highest occupied band is partly full, so electrons can move into nearby empty states. In an <strong>insulator</strong> the top occupied band (valence band) is full and separated from the empty conduction band by a large <strong>gap</strong> (diamond 5.5 eV). A <strong>semiconductor</strong> has a small gap (silicon 1.12 eV, germanium 0.67 eV, GaAs 1.42 eV), so heat lifts a few electrons across, leaving <strong>holes</strong> that also carry current; the number grows roughly as $e^{-E_g/2kT}$, so semiconductors conduct better when hot.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the Fermi temperature $T_F = E_F/k$ of copper ($E_F = 7.0$ eV), in thousands of kelvin?`, 7 * eV / kB / 1000, [R`$k = 8.62\times10^{-5}$ eV/K.`], R`$81\,000$ K: room temperature is tiny by comparison.`)] },
      { title: 'Semiconductor devices and superconductors', plain: 'Adding a few impurity atoms makes semiconductors n-type or p-type; joining the two makes a diode that conducts one way, and the same junction makes LEDs, solar cells and transistors, while superconductors carry current with no resistance at all below a critical temperature.', html: R`
<p><strong>Doping</strong> silicon with a few parts per million of a group-15 element (phosphorus, arsenic) adds electrons just below the conduction band: <strong>n-type</strong>. A group-13 dopant (boron, gallium) adds acceptor levels that create holes: <strong>p-type</strong>.</p>
<p>At a <strong>p–n junction</strong>, electrons and holes diffuse across and recombine, leaving a <strong>depletion region</strong> with a built-in electric field (about 0.7 V for silicon). Forward bias lowers the barrier and current rises exponentially; reverse bias raises it and almost no current flows:</p>
<div class="key"><p>$I = I_s\left(e^{eV/kT} - 1\right)$</p></div>
<div class="worked"><p>At 300 K, by what factor does diode current rise when the forward voltage increases by 60 mV?</p>
<p>$e^{0.060/0.0259} = e^{2.32} = 10$: a tenfold rise every 60 mV, the "60 mV per decade" rule of electronics.</p></div>
<div data-fig="1"></div>
<ul><li><strong>LEDs</strong>: electrons and holes recombining at the junction emit photons with energy close to the band gap: $\lambda \approx 1240\ \text{nm}/E_g(\text{eV})$. Blue LEDs needed gallium nitride (3.4 eV) and earned the 2014 Nobel prize.</li>
<li><strong>Solar cells</strong> run the process backwards: photons with $E > E_g$ create electron–hole pairs that the junction field separates.</li>
<li><strong>Transistors</strong> (most now MOSFETs, in which a gate voltage controls a conducting channel) switch and amplify; a modern chip holds tens of billions.</li></ul>
<h3 class="sub">Superconductivity</h3>
<p>Below a critical temperature, some materials lose all electrical resistance and expel magnetic fields (the <strong>Meissner effect</strong>), because electrons pair up (Cooper pairs) and move without scattering. Niobium–titanium wire cooled to 4 K carries the huge currents of MRI and particle-accelerator magnets; copper-oxide "high-temperature" superconductors work above 77 K, cooled by cheap liquid nitrogen.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What wavelength (nm) does an LED with a band gap of 1.9 eV emit?`, 1239.84 / 1.9, [R`$\lambda = 1240/E_g$.`], R`$653$ nm: red.`)] }
    ],
    figures: [
      { s: 2, title: 'The Fermi–Dirac distribution', caption: 'Probability that a state of energy E is occupied, for a metal with Fermi energy Eꜰ at temperature T. The step blurs only over a few kT.', params: { aspect: 0.4, minH: 210, controls: [S('Ef', 'Fermi energy', 1, 10, 0.1, 7, 'eV'), S('T', 'Temperature', 1, 20000, 1, 300, 'K')],
        plots: [{ x: [0, 12], y: [0, 1.05], xlabel: 'E (eV)', ylabel: 'occupation f(E)', n: 500, curves: (v) => [{ f: (E) => fd(E, v.Ef, v.T) }], vlines: (v) => [{ x: v.Ef, label: 'Eꜰ' }] }],
        readout: (v) => [['kT', f(kB * v.T / eV, 3) + ' eV'], ['width (10%–90%)', f(4.4 * kB * v.T / eV, 3) + ' eV']] } },
      { s: 3, title: 'A diode’s I–V curve', caption: 'Current through an ideal p–n diode (in units of the saturation current) against voltage. Forward bias opens it exponentially; reverse bias blocks it.', params: { aspect: 0.4, minH: 210, controls: [S('V', 'Voltage', -0.2, 0.2, 0.005, 0.1, 'V'), S('T', 'Temperature', 200, 400, 5, 300, 'K')],
        plots: [{ x: [-0.2, 0.2], y: [-5, 2000], xlabel: 'voltage (V)', ylabel: 'I / Iₛ', curves: (v) => [{ f: (V) => diode(V, v.T) }], pts: (v) => [{ x: v.V, y: diode(v.V, v.T) }] }],
        readout: (v) => [['I / Iₛ', f(diode(v.V, v.T), 4)], ['mV per decade', f(1000 * kB * v.T / eV * Math.LN10, 3)]] } }
    ],
    labs: [{ sim: 'explore', title: 'Band gaps and colour', desc: 'Pick a semiconductor band gap. The lab gives the photon wavelength an LED of that material would emit, what a solar cell of it could absorb, and how many electrons heat lifts across the gap compared with silicon.',
      tasks: ['Which gap gives green light (about 530 nm)?', 'Why is silicon (1.12 eV) good for solar cells but useless for visible LEDs?', 'How much more intrinsic conduction does germanium (0.67 eV) have than silicon at 300 K?'],
      params: { aspect: 0.42, controls: [S('Eg', 'Band gap', 0.3, 6, 0.01, 1.12, 'eV'), S('T', 'Temperature', 200, 600, 5, 300, 'K')],
        plots: [{ x: [0.3, 6], y: [0, 4200], xlabel: 'band gap (eV)', ylabel: 'emission wavelength (nm)', curves: () => [{ f: (E) => 1239.84 / E }], pts: (v) => [{ x: v.Eg, y: 1239.84 / v.Eg }], hlines: () => [{ y: 700, label: 'red edge' }, { y: 400, label: 'violet edge' }] }],
        readout: (v) => { const l = 1239.84 / v.Eg; return [['emission wavelength', f(l) + ' nm'], ['region', l > 700 ? 'infrared' : l < 400 ? 'ultraviolet' : 'visible'], ['intrinsic carriers vs Si (same T)', f(Math.exp(-(v.Eg - 1.12) * eV / (2 * kB * v.T)), 3) + '×']]; } } }],
    formulas: [['Fermi energy', 'E_F = \\dfrac{\\hbar^2}{2m}(3\\pi^2n)^{2/3}'], ['Fermi–Dirac', 'f(E) = \\dfrac{1}{e^{(E - E_F)/kT} + 1}'], ['Intrinsic carriers', 'n_i \\propto e^{-E_g/2kT}'], ['Diode', 'I = I_s(e^{eV/kT} - 1)'], ['LED colour', '\\lambda \\approx \\dfrac{1240\\ \\text{nm eV}}{E_g}'], ['fcc packing', '\\pi/(3\\sqrt2) = 0.74']],
    problems: [
      M('concept', 'n-type doping', R`Which element makes silicon n-type?`, ['phosphorus', 'boron', 'gallium', 'aluminium'], 0, [R`It has one more valence electron than Si.`], R`Group 15 donors add electrons.`),
      M('concept', 'Insulators', R`An insulator has…`, ['a full valence band and a large gap to the conduction band', 'a partly filled band', 'no bands', 'a zero band gap'], 0, [R`No nearby empty states.`], R`Electrons cannot gain small amounts of energy.`),
      M('concept', 'Meissner effect', R`The Meissner effect is…`, ['the expulsion of magnetic field from a superconductor', 'the zero resistance of a superconductor', 'the heating of a resistor', 'the splitting of spectral lines'], 0, [R`It distinguishes a superconductor from a perfect conductor.`], R`Field is pushed out as it becomes superconducting.`),
      M('concept', 'Metals', R`Metals conduct electricity because…`, ['their highest occupied band is only partly filled', 'they have a large band gap', 'their electrons are bound to atoms', 'they contain ions'], 0, [R`Nearby empty states.`], R`Electrons can move into empty states just above $E_F$.`),
      P('core', 'num', 'Density of copper', R`fcc copper, edge 361 pm, atomic mass 63.55 u. Density (kg/m³)?`, 4 * 63.55 * 1.66054e-27 / Math.pow(3.61e-10, 3), [R`4 atoms per cell.`], R`$8970$ kg/m³.`),
      P('core', 'num', 'Packing fraction', R`Fraction of space filled by spheres in an fcc lattice?`, Math.PI / (3 * Math.SQRT2), [R`$\pi/(3\sqrt2)$.`], R`$0.740$.`),
      P('core', 'num', 'Fermi energy of copper', R`$n = 8.5\times10^{28}\ \text{m}^{-3}$. $E_F$ (eV)?`, hbar * hbar / (2 * me) * Math.pow(3 * Math.PI * Math.PI * 8.5e28, 2 / 3) / eV, [R`$E_F = \hbar^2(3\pi^2n)^{2/3}/2m$.`], R`$7.0$ eV.`),
      P('core', 'num', 'LED colour', R`Wavelength (nm) emitted by an LED with a 1.9 eV gap?`, 1239.84 / 1.9, [R`$1240/E_g$.`], R`$653$ nm.`),
      P('core', 'num', 'Diode decade', R`Factor by which diode current rises for +60 mV at 300 K?`, Math.exp(0.06 * eV / (kB * 300)), [R`$e^{eV/kT}$.`], R`About 10.`),
      P('core', 'num', 'Hydrogen vibration', R`Vibrational quantum (eV) of H₂ at 4161 cm⁻¹?`, 4161 * 1.23984e-4, [R`1 cm⁻¹ = $1.24\times10^{-4}$ eV.`], R`$0.516$ eV.`),
      P('olympiad', 'num', 'Fermi speed', R`Speed of electrons at the Fermi surface of copper ($E_F = 7.0$ eV), in units of $10^6$ m/s?`, Math.sqrt(2 * 7 * eV / me) / 1e6, [R`$\sqrt{2E_F/m}$.`], R`$1.57\times10^6$ m/s.`),
      P('olympiad', 'num', 'Germanium versus silicon', R`Ignoring prefactors, by what factor does germanium's intrinsic carrier density ($E_g = 0.67$ eV) exceed silicon's (1.12 eV) at 300 K?`, Math.exp((1.12 - 0.67) * eV / (2 * kB * 300)), [R`Ratio $e^{\Delta E_g/2kT}$.`], R`$e^{8.7} \approx 6000$.`),
      P('olympiad', 'num', 'Solar-cell cutoff', R`Longest wavelength (nm) a silicon solar cell ($E_g = 1.12$ eV) can absorb?`, 1239.84 / 1.12, [R`$\lambda = 1240/E_g$.`], R`$1107$ nm, in the near infrared.`),
      P('olympiad', 'num', 'Fermi–Dirac occupation', R`Probability that a state 0.10 eV above $E_F$ is occupied at 300 K?`, fd(0.1, 0, 300), [R`$1/(e^{0.1/0.02585} + 1)$.`], R`$0.020$.`)
    ],
    drills: [
      { title: 'LED wavelength', gen: (r) => { const E = r.pick([1.4, 1.9, 2.1, 2.3, 2.7, 3.4]); return { q: R`<p>Band gap ${E} eV: emitted wavelength (nm)?</p>`, answer: 1239.84 / E, tol: 0.01, solution: R`<p>$1240/${E} = ${f(1239.84 / E, 4)}$ nm.</p>` }; } },
      { title: 'Diode current', gen: (r) => { const dV = r.pick([20, 40, 60, 120]); return { q: R`<p>Factor by which an ideal diode's forward current grows when the voltage rises by ${dV} mV at 300 K?</p>`, answer: Math.exp(dV / 1000 * eV / (kB * 300)), tol: 0.02, solution: R`<p>$e^{${dV}/25.85} = ${f(Math.exp(dV / 1000 * eV / (kB * 300)), 4)}$.</p>` }; } }
    ],
    predict: { q: 'At room temperature, how sharp is the edge of the Fermi–Dirac distribution compared with copper’s Fermi energy (7 eV)?', o: ['very sharp: it blurs over only about 0.1 eV', 'about as wide as 7 eV', 'there is no edge at room temperature'], a: 0, how: 'set Eꜰ = 7 eV and T = 300 K in the Fermi–Dirac figure.', why: 'kT is only 0.026 eV, so the occupation drops from 90% to 10% over about 0.1 eV.' },
    wild: ['The transistor', 'A smartphone chip contains over ten billion transistors, each a few tens of atoms across at its narrowest point, all built on the band theory of doped silicon.']
  });
})();
