/* Card collections. Each subject's problems drop cards from its collection; rarer cards drop less often.
   Rarity: 0 common, 1 uncommon, 2 rare, 3 epic, 4 legendary. */
(function () {
  /* ---- Periodic table (chemistry) ---- */
  const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
  const NAME = 'Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Caesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson'.split(' ');
  function place(z) { // [period, group] in the standard 18-column layout; f-block on rows 9 and 10
    if (z === 1) return [1, 1]; if (z === 2) return [1, 18];
    const starts = [[3, 2], [11, 3], [19, 4], [37, 5], [55, 6], [87, 7]];
    let per = 7, st = 87; for (let i = starts.length - 1; i >= 0; i--) if (z >= starts[i][0]) { st = starts[i][0]; per = starts[i][1]; break; }
    const k = z - st;
    if (per <= 3) return [per, k < 2 ? k + 1 : k + 11];
    if (per <= 5) return [per, k + 1];
    if (k < 2) return [per, k + 1];
    if (k < 17) return [per + 3, k + 1]; // La–Lu / Ac–Lr row, columns 3–17
    return [per, k - 13];
  }
  function cat(z) {
    const g = place(z)[1], per = place(z)[0];
    if (per >= 9) return z < 72 ? 'Lanthanide' : 'Actinide';
    if (z === 1) return 'Non-metal'; if (g === 18) return 'Noble gas'; if (g === 17) return 'Halogen'; if (g === 1) return 'Alkali metal'; if (g === 2) return 'Alkaline earth metal';
    if (g >= 3 && g <= 12) return 'Transition metal';
    if ([5, 14, 32, 33, 51, 52].indexOf(z) >= 0) return 'Metalloid';
    if ([6, 7, 8, 15, 16, 34].indexOf(z) >= 0) return 'Non-metal';
    return 'Post-transition metal';
  }
  const COMMON = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 26, 29, 30, 35, 47, 50, 53, 79, 82];
  function rarity(z) { if (COMMON.indexOf(z) >= 0) return 0; if (z <= 56) return 1; if (z <= 86) return 2; if (z <= 103) return 3; return 4; }
  const elements = SYM.map((s, i) => { const z = i + 1, p = place(z); return { id: 'el-' + z, name: NAME[i], short: s, n: z, rarity: rarity(z), info: cat(z), grid: [p[0], p[1]], text: 'Atomic number ' + z + ' · ' + cat(z) + (z > 103 ? ' · made in particle accelerators, a few atoms at a time' : z > 92 ? ' · synthetic, radioactive' : '') }; });

  /* ---- Messier catalogue (astronomy): rarity by how faint it is ---- */
  const MES = `1|Crab Nebula|Supernova remnant|Taurus|8.4
2|-|Globular cluster|Aquarius|6.5
3|-|Globular cluster|Canes Venatici|6.2
4|-|Globular cluster|Scorpius|5.6
5|-|Globular cluster|Serpens|5.6
6|Butterfly Cluster|Open cluster|Scorpius|4.2
7|Ptolemy's Cluster|Open cluster|Scorpius|3.3
8|Lagoon Nebula|Emission nebula|Sagittarius|4.6
9|-|Globular cluster|Ophiuchus|7.7
10|-|Globular cluster|Ophiuchus|6.6
11|Wild Duck Cluster|Open cluster|Scutum|5.8
12|-|Globular cluster|Ophiuchus|6.7
13|Great Hercules Cluster|Globular cluster|Hercules|5.8
14|-|Globular cluster|Ophiuchus|7.6
15|Great Pegasus Cluster|Globular cluster|Pegasus|6.2
16|Eagle Nebula|Emission nebula|Serpens|6.4
17|Omega Nebula|Emission nebula|Sagittarius|6.0
18|-|Open cluster|Sagittarius|7.5
19|-|Globular cluster|Ophiuchus|6.8
20|Trifid Nebula|Emission nebula|Sagittarius|6.3
21|-|Open cluster|Sagittarius|6.5
22|Great Sagittarius Cluster|Globular cluster|Sagittarius|5.1
23|-|Open cluster|Sagittarius|5.5
24|Small Sagittarius Star Cloud|Star cloud|Sagittarius|2.5
25|-|Open cluster|Sagittarius|4.6
26|-|Open cluster|Scutum|8.0
27|Dumbbell Nebula|Planetary nebula|Vulpecula|7.4
28|-|Globular cluster|Sagittarius|6.8
29|-|Open cluster|Cygnus|7.1
30|-|Globular cluster|Capricornus|7.2
31|Andromeda Galaxy|Spiral galaxy|Andromeda|3.4
32|-|Dwarf elliptical galaxy|Andromeda|8.1
33|Triangulum Galaxy|Spiral galaxy|Triangulum|5.7
34|-|Open cluster|Perseus|5.5
35|-|Open cluster|Gemini|5.3
36|-|Open cluster|Auriga|6.3
37|-|Open cluster|Auriga|6.2
38|-|Open cluster|Auriga|7.4
39|-|Open cluster|Cygnus|4.6
40|Winnecke 4|Double star|Ursa Major|8.4
41|-|Open cluster|Canis Major|4.5
42|Orion Nebula|Emission nebula|Orion|4.0
43|De Mairan's Nebula|Emission nebula|Orion|9.0
44|Beehive Cluster|Open cluster|Cancer|3.7
45|Pleiades|Open cluster|Taurus|1.6
46|-|Open cluster|Puppis|6.0
47|-|Open cluster|Puppis|4.4
48|-|Open cluster|Hydra|5.5
49|-|Elliptical galaxy|Virgo|8.4
50|-|Open cluster|Monoceros|5.9
51|Whirlpool Galaxy|Spiral galaxy|Canes Venatici|8.4
52|-|Open cluster|Cassiopeia|7.3
53|-|Globular cluster|Coma Berenices|7.6
54|-|Globular cluster|Sagittarius|7.6
55|-|Globular cluster|Sagittarius|6.3
56|-|Globular cluster|Lyra|8.3
57|Ring Nebula|Planetary nebula|Lyra|8.8
58|-|Barred spiral galaxy|Virgo|9.7
59|-|Elliptical galaxy|Virgo|9.6
60|-|Elliptical galaxy|Virgo|8.8
61|-|Spiral galaxy|Virgo|9.7
62|-|Globular cluster|Ophiuchus|6.5
63|Sunflower Galaxy|Spiral galaxy|Canes Venatici|8.6
64|Black Eye Galaxy|Spiral galaxy|Coma Berenices|8.5
65|Leo Triplet|Barred spiral galaxy|Leo|9.3
66|Leo Triplet|Barred spiral galaxy|Leo|8.9
67|-|Open cluster|Cancer|6.1
68|-|Globular cluster|Hydra|7.8
69|-|Globular cluster|Sagittarius|7.6
70|-|Globular cluster|Sagittarius|7.9
71|-|Globular cluster|Sagitta|8.2
72|-|Globular cluster|Aquarius|9.3
73|-|Asterism|Aquarius|9.0
74|Phantom Galaxy|Spiral galaxy|Pisces|9.4
75|-|Globular cluster|Sagittarius|8.5
76|Little Dumbbell Nebula|Planetary nebula|Perseus|10.1
77|Cetus A|Spiral galaxy|Cetus|8.9
78|-|Reflection nebula|Orion|8.3
79|-|Globular cluster|Lepus|7.7
80|-|Globular cluster|Scorpius|7.3
81|Bode's Galaxy|Spiral galaxy|Ursa Major|6.9
82|Cigar Galaxy|Starburst galaxy|Ursa Major|8.4
83|Southern Pinwheel Galaxy|Barred spiral galaxy|Hydra|7.6
84|-|Lenticular galaxy|Virgo|9.1
85|-|Lenticular galaxy|Coma Berenices|9.1
86|-|Lenticular galaxy|Virgo|8.9
87|Virgo A|Elliptical galaxy|Virgo|8.6
88|-|Spiral galaxy|Coma Berenices|9.6
89|-|Elliptical galaxy|Virgo|9.8
90|-|Spiral galaxy|Virgo|9.5
91|-|Barred spiral galaxy|Coma Berenices|10.2
92|-|Globular cluster|Hercules|6.4
93|-|Open cluster|Puppis|6.0
94|-|Spiral galaxy|Canes Venatici|8.2
95|-|Barred spiral galaxy|Leo|9.7
96|-|Spiral galaxy|Leo|9.2
97|Owl Nebula|Planetary nebula|Ursa Major|9.9
98|-|Spiral galaxy|Coma Berenices|10.1
99|-|Spiral galaxy|Coma Berenices|9.9
100|-|Spiral galaxy|Coma Berenices|9.3
101|Pinwheel Galaxy|Spiral galaxy|Ursa Major|7.9
102|Spindle Galaxy|Lenticular galaxy|Draco|9.9
103|-|Open cluster|Cassiopeia|7.4
104|Sombrero Galaxy|Spiral galaxy|Virgo|8.0
105|-|Elliptical galaxy|Leo|9.3
106|-|Spiral galaxy|Canes Venatici|8.4
107|-|Globular cluster|Ophiuchus|7.9
108|Surfboard Galaxy|Barred spiral galaxy|Ursa Major|10.0
109|-|Barred spiral galaxy|Ursa Major|9.8
110|-|Dwarf elliptical galaxy|Andromeda|8.5`;
  const ICO = (t) => /galaxy/i.test(t) ? '🌀' : /globular/i.test(t) ? '✺' : /open|asterism|star cloud|double/i.test(t) ? '✨' : /planetary/i.test(t) ? '◎' : /supernova/i.test(t) ? '💥' : '☁';
  const messier = MES.split('\n').map((l) => { const f = l.split('|'), m = +f[4]; return { id: 'm-' + f[0], name: 'M' + f[0] + (f[1] !== '-' ? ' · ' + f[1] : ''), short: 'M' + f[0], n: +f[0], icon: ICO(f[2]), rarity: m < 5 ? 0 : m < 7 ? 1 : m < 8.5 ? 2 : m < 9.5 ? 3 : 4, info: f[2], text: f[2] + ' in ' + f[3] + ' · magnitude ' + f[4] + (m < 5 ? ' · visible to the naked eye in dark skies' : m >= 9.5 ? ' · a challenge even for a good telescope' : '') }; });
  messier.find((x) => x.n === 1).rarity = 4; // the Crab: the catalogue's first entry and a famous supernova remnant

  /* ---- Particle zoo (physics) ---- */
  const P = (short, name, rar, info, text) => ({ short: short, name: name, rarity: rar, info: info, text: text });
  const particles = [
    P('e⁻', 'Electron', 0, 'Lepton', 'Charge −1, the carrier of electric current and chemistry.'), P('p', 'Proton', 0, 'Baryon (uud)', 'The nucleus of hydrogen; about 1836 electron masses.'), P('n', 'Neutron', 0, 'Baryon (udd)', 'Free neutrons decay with a half-life of about 10 minutes.'),
    P('γ', 'Photon', 0, 'Gauge boson', 'Carrier of the electromagnetic force; massless.'), P('u', 'Up quark', 0, 'Quark', 'Charge +2/3. Two in every proton.'), P('d', 'Down quark', 0, 'Quark', 'Charge −1/3. Two in every neutron.'),
    P('νₑ', 'Electron neutrino', 1, 'Lepton', 'Trillions pass through you every second from the Sun.'), P('μ⁻', 'Muon', 1, 'Lepton', 'A heavy electron; cosmic-ray muons reach the ground thanks to time dilation.'), P('e⁺', 'Positron', 1, 'Antilepton', 'The antielectron, used in PET scans.'),
    P('π⁺', 'Pion', 1, 'Meson', 'Lightest meson; Yukawa predicted it as the carrier of the nuclear force.'), P('g', 'Gluon', 1, 'Gauge boson', 'Carries the strong force and binds quarks.'), P('s', 'Strange quark', 1, 'Quark', 'Charge −1/3; found in kaons and hyperons.'),
    P('νμ', 'Muon neutrino', 2, 'Lepton', 'Discovered in 1962, showing neutrinos come in flavours.'), P('K⁺', 'Kaon', 2, 'Meson', 'Kaons revealed CP violation in 1964.'), P('Λ⁰', 'Lambda baryon', 2, 'Baryon (uds)', 'The lightest strange baryon.'),
    P('c', 'Charm quark', 2, 'Quark', 'Found in 1974 via the J/ψ: the “November Revolution”.'), P('p̄', 'Antiproton', 2, 'Antibaryon', 'First made at Berkeley in 1955.'), P('τ⁻', 'Tau', 2, 'Lepton', 'The heaviest lepton, about 3500 electron masses.'),
    P('J/ψ', 'J/psi meson', 3, 'Meson (cc̄)', 'Discovered at two labs at once and given two names.'), P('W±', 'W boson', 3, 'Gauge boson', 'Carries the weak force; causes beta decay.'), P('Z⁰', 'Z boson', 3, 'Gauge boson', 'Neutral weak-force carrier, found at CERN in 1983.'),
    P('b', 'Bottom quark', 3, 'Quark', 'Discovered in 1977 in the upsilon meson.'), P('ντ', 'Tau neutrino', 3, 'Lepton', 'The last lepton to be directly observed (2000).'), P('Σ⁺', 'Sigma baryon', 3, 'Baryon (uus)', 'A strange baryon seen in early cosmic-ray tracks.'),
    P('Ω⁻', 'Omega baryon', 4, 'Baryon (sss)', 'Predicted by Gell-Mann’s eightfold way before it was found in 1964.'), P('t', 'Top quark', 4, 'Quark', 'The heaviest known particle, about as heavy as a gold atom.'), P('H⁰', 'Higgs boson', 4, 'Scalar boson', 'Found at the LHC in 2012; gives particles their mass.'),
    P('Υ', 'Upsilon meson', 4, 'Meson (bb̄)', 'Its discovery revealed the bottom quark.'), P('H̄', 'Antihydrogen', 4, 'Antiatom', 'Trapped at CERN in 2010 to test whether antimatter falls like matter.'), P('B⁰', 'B meson', 3, 'Meson', 'B factories used it to measure matter–antimatter asymmetry.')
  ].map((x, i) => Object.assign({ id: 'pa-' + i }, x));

  /* ---- Tree of life (biology) ---- */
  const O = (icon, name, rar, info, text) => ({ icon: icon, name: name, rarity: rar, info: info, text: text });
  const life = [
    O('🦠', 'Escherichia coli', 0, 'Bacteria', 'Workhorse of molecular biology; divides every 20 minutes in ideal conditions.'), O('🍞', 'Baker’s yeast', 0, 'Fungi', 'A single-celled eukaryote that ferments sugar to ethanol and CO₂.'), O('🌱', 'Arabidopsis thaliana', 0, 'Plants', 'Model plant with a small genome.'),
    O('🪰', 'Fruit fly', 0, 'Arthropods', 'Morgan’s flies revealed sex linkage.'), O('🐭', 'House mouse', 0, 'Mammals', 'The standard mammal model for medicine.'), O('🫛', 'Garden pea', 0, 'Plants', 'Mendel’s plant.'), O('🐝', 'Honeybee', 0, 'Arthropods', 'Communicates with the waggle dance.'),
    O('🪱', 'C. elegans', 1, 'Nematodes', 'Every one of its 959 adult body cells has been traced from the egg.'), O('🐟', 'Zebrafish', 1, 'Fish', 'Transparent embryos let us watch organs form.'), O('🌽', 'Maize', 1, 'Plants', 'A C₄ grass; McClintock found jumping genes in it.'),
    O('🍄', 'Fly agaric', 1, 'Fungi', 'A fungus partnering with tree roots (mycorrhiza).'), O('🐸', 'Clawed frog', 1, 'Amphibians', 'Its big eggs made early cloning experiments possible.'), O('🦑', 'Longfin squid', 1, 'Molluscs', 'Its giant axon revealed how nerve impulses work.'), O('🌿', 'Sphagnum moss', 1, 'Plants', 'Peat moss; peatlands store huge amounts of carbon.'),
    O('🧫', 'Amoeba', 2, 'Protists', 'Moves and feeds with pseudopodia.'), O('🌊', 'Diatom', 2, 'Protists', 'Glass-shelled algae that make a large share of Earth’s oxygen.'), O('🐦', 'Galápagos finch', 2, 'Birds', 'Beak shapes evolve measurably within years.'),
    O('🦎', 'Axolotl', 2, 'Amphibians', 'Can regrow whole limbs and parts of its heart.'), O('🐙', 'Octopus', 2, 'Molluscs', 'Most of its neurons are in its arms.'), O('🦇', 'Fruit bat', 2, 'Mammals', 'Pollinates and spreads seeds across the tropics.'), O('🌵', 'Saguaro', 2, 'Plants', 'A CAM plant that opens its stomata at night.'),
    O('🔥', 'Thermus aquaticus', 3, 'Bacteria', 'Hot-spring bacterium whose enzyme made PCR practical.'), O('🧂', 'Halobacterium', 3, 'Archaea', 'Lives in brine and makes ATP with a light-driven pump.'), O('🐻', 'Tardigrade', 3, 'Tardigrades', 'Survives drying out, freezing and even space vacuum.'),
    O('🪸', 'Reef coral', 3, 'Cnidarians', 'An animal partnered with photosynthetic algae.'), O('🦆', 'Platypus', 3, 'Mammals', 'A mammal that lays eggs and senses electric fields.'), O('🐋', 'Blue whale', 3, 'Mammals', 'The largest animal that has ever lived.'), O('🌸', 'Rafflesia', 3, 'Plants', 'The largest single flower; a parasite with no leaves.'),
    O('🐟', 'Coelacanth', 4, 'Fish', 'A “living fossil” thought extinct until 1938.'), O('🌲', 'Bristlecone pine', 4, 'Plants', 'Some individuals are nearly 5000 years old.'), O('🪼', 'Immortal jellyfish', 4, 'Cnidarians', 'Turritopsis can revert to a younger stage.'),
    O('🧬', 'Asgard archaea', 4, 'Archaea', 'Closest known microbial relatives of eukaryotes.'), O('🌿', 'Welwitschia', 4, 'Plants', 'A desert plant with just two leaves that grow for over a thousand years.'), O('🍄', 'Honey fungus', 4, 'Fungi', 'One individual in Oregon spreads over about 9 km².')
  ].map((x, i) => Object.assign({ id: 'tl-' + i }, x));

  /* ---- Famous numbers (maths) ---- */
  const N = (short, name, rar, text) => ({ short: short, name: name, rarity: rar, info: 'Number', text: text });
  const numbers = [
    N('0', 'Zero', 0, 'Indian mathematicians made it a number in its own right.'), N('1', 'One', 0, 'The multiplicative identity; not a prime by convention.'), N('2', 'Two', 0, 'The only even prime.'), N('10', 'Ten', 0, 'The base of our number system.'),
    N('π', 'Pi', 0, 'Circumference over diameter, 3.14159…'), N('√2', 'Root two', 0, 'The first number shown to be irrational.'), N('−1', 'Minus one', 0, 'Square root of nothing real.'),
    N('e', 'Euler’s number', 1, '2.71828…, the base whose exponential is its own derivative.'), N('φ', 'Golden ratio', 1, '(1 + √5)/2 ≈ 1.618; ratios of Fibonacci numbers approach it.'), N('i', 'Imaginary unit', 1, 'i² = −1.'), N('6', 'Six', 1, 'The first perfect number: 1 + 2 + 3.'),
    N('28', 'Twenty-eight', 1, 'The second perfect number.'), N('12', 'Twelve', 1, 'Highly composite: more divisors than any smaller number.'),
    N('1729', 'Hardy–Ramanujan number', 2, 'Smallest number that is a sum of two cubes in two ways.'), N('γ', 'Euler–Mascheroni constant', 2, '0.5772…; nobody knows if it is irrational.'), N('ln 2', 'Natural log of 2', 2, 'The sum 1 − 1/2 + 1/3 − 1/4 + …'),
    N('ζ(2)', 'Basel sum', 2, '1 + 1/4 + 1/9 + … = π²/6, found by Euler.'), N('ℵ₀', 'Aleph-null', 2, 'The size of the set of whole numbers.'), N('561', 'Carmichael number', 2, 'A composite that fools Fermat’s primality test.'),
    N('ζ(3)', 'Apéry’s constant', 3, 'Proved irrational by Apéry in 1978.'), N('δ', 'Feigenbaum constant', 3, '4.669…; universal in period-doubling routes to chaos.'), N('G', 'Catalan’s constant', 3, '0.9159…; unknown whether it is irrational.'),
    N('10¹⁰⁰', 'Googol', 3, 'Inspired the name Google.'), N('𝔠', 'Continuum', 3, 'The size of the real numbers, larger than ℵ₀ (Cantor).'),
    N('Ω', 'Chaitin’s constant', 4, 'A well-defined number whose digits are uncomputable.'), N('g₆₄', 'Graham’s number', 4, 'An upper bound from Ramsey theory, far too large to write.'), N('M₁₃₆₂₇₉₈₄₁', 'Largest known prime', 4, '2^136279841 − 1, a Mersenne prime found in 2024.'),
    N('K₀', 'Khinchin’s constant', 4, 'The geometric mean of continued-fraction terms of almost every number.')
  ].map((x, i) => Object.assign({ id: 'nu-' + i }, x));

  PB.COLLECTIONS = [
    { id: 'numbers', subject: 'maths', name: 'Famous numbers', icon: '∑', cards: numbers },
    { id: 'particles', subject: 'physics', name: 'Particle zoo', icon: '⚛', cards: particles },
    { id: 'elements', subject: 'chemistry', name: 'Periodic table', icon: '⚗', cards: elements, table: true },
    { id: 'life', subject: 'biology', name: 'Tree of life', icon: '🧬', cards: life },
    { id: 'messier', subject: 'astronomy', name: 'Messier catalogue', icon: '🔭', cards: messier }
  ];
})();
