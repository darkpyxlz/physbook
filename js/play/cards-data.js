/* Collection cards. C(id, name, icon, chapter, fact, quiz question, options (right one first), ) */
(function () {
  const C = (id, name, icon, ch, fact, q, o) => ({ id: id, name: name, icon: icon, ch: ch, fact: fact, q: q, o: o, a: 0 });
  PB.CARD_SETS = [
    { id: 'theorems', name: 'Theorems', icon: '∑', subject: 'maths', power: ['Lemma', 'Your first wrong answer in a raid costs no heart.'] },
    { id: 'scientists', name: 'Physicists', icon: '⚛', subject: 'physics', power: ['Second opinion', 'Once per raid, skip a stage and count it as cleared.'] },
    { id: 'elements', name: 'Elements', icon: '⚗', subject: 'chemistry', power: ['Catalyst', 'Start every raid with one extra heart.'] },
    { id: 'organisms', name: 'Organisms', icon: '🧬', subject: 'biology', power: ['Regeneration', 'Two right in a row in a raid restores a lost heart.'] },
    { id: 'sky', name: 'Night sky', icon: '✦', subject: 'astronomy', power: ['Navigator', 'Each raid stage shows the chapter’s key formulas.'] }
  ];
  PB.CARDS = {
    theorems: [
      C('t-pythag', 'Pythagoras’ theorem', '📐', 'math-geometry', 'Known to Babylonian scribes over a thousand years before Pythagoras. There are hundreds of different proofs.', 'In a right triangle with legs 5 and 12, the hypotenuse is…', ['13', '17', '15']),
      C('t-ftc', 'Fundamental theorem of calculus', '∫', 'math-integrals', 'Newton and Leibniz each found it independently; it shows that areas and slopes are inverse problems.', 'The derivative of ∫₀ˣ f(t) dt is…', ['f(x)', 'f(0)', 'F(x) − F(0)']),
      C('t-binomial', 'Binomial theorem', '🔺', 'math-sequences', 'Pascal’s triangle was known in China (Yang Hui) and Persia centuries before Pascal.', 'The coefficient of x² in (1 + x)⁵ is…', ['10', '5', '20']),
      C('t-euler', 'Euler’s identity', 'e', 'math-complex', 'e^{iπ} + 1 = 0 links five fundamental constants in one line.', 'e^{iπ} equals…', ['−1', '1', 'i']),
      C('t-taylor', 'Taylor’s theorem', '〰', 'math-series', 'Brook Taylor published it in 1715; calculators still use polynomial approximations like it.', 'The first two terms of the Taylor series of eˣ are…', ['1 + x', 'x + x²', '1 − x']),
      C('t-primes', 'Infinitude of primes', '∞', 'math-numbertheory', 'Euclid’s proof (about 300 BC) is still one of the most quoted proofs in mathematics.', 'Euclid multiplies all known primes together and…', ['adds 1', 'subtracts 2', 'squares the result']),
      C('t-fermat', 'Fermat’s little theorem', '🔑', 'math-numbertheory', 'It underpins RSA encryption, which protects online banking.', '2¹⁰ mod 11 equals…', ['1', '2', '10']),
      C('t-amgm', 'AM–GM inequality', '⚖', 'math-inequalities', 'The arithmetic mean of positive numbers is never less than their geometric mean.', 'For positive a, b: a + b ≥ …', ['2√(ab)', 'ab', '√(a + b)']),
      C('t-cauchy', 'Cauchy–Schwarz', '✕', 'math-inequalities', 'It is the statement that a dot product is at most the product of the lengths.', '(a·b)² is at most…', ['|a|²|b|²', '|a| + |b|', '|a|²']),
      C('t-pigeon', 'Pigeonhole principle', '🕊', 'math-proof', 'Obvious to state, yet it solves surprisingly hard olympiad problems.', 'Among 13 people, at least two share…', ['a birth month', 'a birthday', 'a first name']),
      C('t-euler-graph', 'Euler’s formula for polyhedra', '🔷', 'math-graphs', 'V − E + F = 2 for any convex polyhedron (and any connected planar graph).', 'A cube has 8 vertices and 12 edges, so its number of faces is…', ['6', '4', '8']),
      C('t-bayes', 'Bayes’ theorem', '🎲', 'math-stats', 'Thomas Bayes’ idea was published after his death in 1763; it is now central to machine learning.', 'Bayes’ rule updates a probability using…', ['new evidence', 'a bigger sample only', 'the median']),
      C('t-eigen', 'Spectral theorem', '↗', 'math-linear', 'A symmetric matrix always has real eigenvalues and perpendicular eigenvectors.', 'The eigenvalues of [[2, 0], [0, 5]] are…', ['2 and 5', '7 and 0', '10 and 1']),
      C('t-catalan', 'Catalan numbers', '⛰', 'math-recurrences', 'They count over 200 different kinds of object, from bracketings to mountain ranges.', 'The Catalan numbers start 1, 1, 2, 5, …', ['14', '10', '12'])
    ],
    scientists: [
      C('s-newton', 'Isaac Newton', '🍎', 'newton', 'Wrote the Principia in 1687, laying down the laws of motion and universal gravitation.', 'Newton’s second law says F equals…', ['ma', 'mv', 'mg h']),
      C('s-galileo', 'Galileo Galilei', '🔭', 'kinematics', 'Showed that falling bodies accelerate equally, using balls rolling down slopes.', 'Ignoring air, a heavy and a light ball dropped together land…', ['at the same time', 'heavy first', 'light first']),
      C('s-noether', 'Emmy Noether', '♾', 'analytical', 'Proved that every continuous symmetry gives a conservation law (1918).', 'Symmetry under time shifts gives conservation of…', ['energy', 'momentum', 'charge']),
      C('s-joule', 'James Joule', '🔥', 'energy', 'Showed that work and heat are interchangeable by stirring water with falling weights.', 'The SI unit of energy, the joule, equals one…', ['newton metre', 'watt per second', 'kilogram metre']),
      C('s-kepler', 'Johannes Kepler', '🪐', 'gravitation', 'Found from Tycho Brahe’s data that planets move in ellipses.', 'Kepler’s third law says T² is proportional to…', ['a³', 'a²', 'a']),
      C('s-faraday', 'Michael Faraday', '🧲', 'induction', 'Discovered electromagnetic induction in 1831 with almost no formal mathematics.', 'A changing magnetic flux through a coil induces…', ['an emf', 'a constant current with no change', 'a magnetic monopole']),
      C('s-maxwell', 'James Clerk Maxwell', '💡', 'induction', 'Unified electricity and magnetism and predicted that light is an electromagnetic wave.', 'Maxwell’s equations predict waves travelling at…', ['the speed of light', 'the speed of sound', 'infinite speed']),
      C('s-coulomb', 'Charles-Augustin de Coulomb', '⚡', 'electrostatics', 'Measured the electric force with a torsion balance in 1785.', 'Doubling the distance between two charges makes the force…', ['a quarter', 'half', 'double']),
      C('s-carnot', 'Sadi Carnot', '🚂', 'thermodynamics', 'Found the maximum efficiency of any heat engine in 1824, before energy was understood.', 'A Carnot engine between 600 K and 300 K has efficiency…', ['50%', '100%', '25%']),
      C('s-young', 'Thomas Young', '🌈', 'wave-optics', 'His double-slit experiment (about 1801) showed light behaves as a wave.', 'Bright fringes appear where the path difference is…', ['a whole number of wavelengths', 'half a wavelength', 'zero only']),
      C('s-einstein', 'Albert Einstein', '⏱', 'relativity', 'In 1905 published special relativity and the photon explanation of the photoelectric effect.', 'A moving clock, seen from the ground, runs…', ['slow', 'fast', 'normally']),
      C('s-planck', 'Max Planck', 'ℎ', 'quantum', 'Introduced energy quanta in 1900 to explain blackbody radiation.', 'A photon’s energy is…', ['hf', 'mc', 'hλ']),
      C('s-curie', 'Marie Curie', '☢', 'nuclear', 'The only person to win Nobel Prizes in two different sciences (physics and chemistry).', 'After two half-lives, the fraction left is…', ['a quarter', 'a half', 'zero']),
      C('s-archimedes', 'Archimedes', '🛁', 'fluids', 'Legend says he discovered buoyancy in his bath and shouted “Eureka!”.', 'The buoyant force equals the weight of…', ['the fluid displaced', 'the object', 'the container'])
    ],
    elements: [
      C('e-h', 'Hydrogen', 'H', 'chem-sblock', 'About 74% of the ordinary matter in the universe by mass.', 'Hydrogen’s most common isotope has how many neutrons?', ['0', '1', '2']),
      C('e-c', 'Carbon', 'C', 'chem-organic', 'Forms more compounds than any other element, the basis of organic chemistry.', 'How many bonds does carbon usually form?', ['4', '2', '6']),
      C('e-n', 'Nitrogen', 'N', 'chem-pblock', 'Makes up 78% of air, yet its triple bond makes it hard for living things to use directly.', 'The Haber process makes ammonia from nitrogen and…', ['hydrogen', 'oxygen', 'carbon']),
      C('e-o', 'Oxygen', 'O', 'chem-chalcogens', 'The most abundant element in Earth’s crust, mostly locked in silicates.', 'Oxygen’s common oxidation state in compounds is…', ['−2', '+2', '−1']),
      C('e-na', 'Sodium', 'Na', 'chem-maingroup', 'So reactive that it is stored under oil; it fizzes and melts on water.', 'Sodium forms ions with charge…', ['+1', '+2', '−1']),
      C('e-cl', 'Chlorine', 'Cl', 'chem-chalcogens', 'Used to disinfect drinking water, saving millions of lives.', 'Chlorine displaces which halide from solution?', ['bromide', 'fluoride', 'none']),
      C('e-fe', 'Iron', 'Fe', 'chem-transition', 'Iron-56 nuclei are among the most tightly bound, which is why stars cannot gain energy fusing beyond iron.', 'Fe³⁺ has how many d electrons?', ['5', '6', '3']),
      C('e-cu', 'Copper', 'Cu', 'chem-coord', 'Its deep blue ammine complex is a classic test; it breaks the simple filling order with 3d¹⁰4s¹.', 'The deep blue complex formed with excess ammonia is…', ['[Cu(NH₃)₄(H₂O)₂]²⁺', 'CuCl₂', 'Cu₂O']),
      C('e-zn', 'Zinc', 'Zn', 'chem-electro', 'Coats steel to stop rust (galvanising) because it corrodes first.', 'In a Daniell cell, zinc is the…', ['anode (oxidised)', 'cathode (reduced)', 'salt bridge']),
      C('e-si', 'Silicon', 'Si', 'chem-solid', 'The semiconductor at the heart of almost every computer chip.', 'Pure silicon at room temperature is…', ['a semiconductor', 'a metal', 'an insulator gas']),
      C('e-he', 'Helium', 'He', 'chem-atom', 'First found in the Sun’s spectrum (1868), before it was found on Earth.', 'Helium’s electron configuration is…', ['1s²', '1s¹2s¹', '1s²2s²']),
      C('e-u', 'Uranium', 'U', 'nuclear', 'Uranium-235 can sustain a fission chain reaction.', 'Fission of U-235 is usually started by absorbing a…', ['slow neutron', 'proton', 'photon']),
      C('e-mn', 'Manganese', 'Mn', 'chem-redox', 'Permanganate (MnO₄⁻) is purple and is a powerful oxidising agent used in titrations.', 'In acid, MnO₄⁻ is reduced to…', ['Mn²⁺', 'MnO₂ only', 'Mn metal']),
      C('e-ag', 'Silver', 'Ag', 'chem-titration', 'Silver halide precipitates have different colours, used to identify halide ions.', 'AgCl is…', ['white', 'yellow', 'black'])
    ],
    organisms: [
      C('o-ecoli', 'Escherichia coli', '🦠', 'bio-microbes', 'Can divide every 20 minutes in ideal conditions; the workhorse of molecular biology.', 'Starting with one cell dividing every 20 min, after 2 hours there are…', ['64', '6', '12']),
      C('o-pea', 'Garden pea', '🫛', 'bio-mendel', 'Mendel bred about 28 000 pea plants to discover the rules of inheritance.', 'A cross between two heterozygotes gives a phenotype ratio of…', ['3:1', '1:1', '9:3:3:1']),
      C('o-fruitfly', 'Fruit fly', '🪰', 'bio-linkage', 'Thomas Hunt Morgan’s fly room discovered sex linkage and made the first gene maps.', 'White eyes in Drosophila is linked to the…', ['X chromosome', 'Y chromosome', 'mitochondria']),
      C('o-maize', 'Maize', '🌽', 'bio-photosynthesis', 'A C₄ plant: it concentrates CO₂ so rubisco wastes less energy on oxygen.', 'C₄ plants first fix CO₂ into a…', ['four-carbon acid', 'three-carbon sugar', 'protein']),
      C('o-finch', 'Darwin’s finches', '🐦', 'bio-evolution', 'Beak sizes on the Galápagos shift measurably within a few dry years.', 'After a drought leaves only hard seeds, average beak size…', ['increases', 'decreases', 'stays the same']),
      C('o-squid', 'Giant squid axon', '🦑', 'bio-nerves', 'Up to 1 mm thick, it let Hodgkin and Huxley measure the action potential.', 'The rising phase of an action potential is caused by…', ['Na⁺ rushing in', 'K⁺ rushing in', 'Cl⁻ leaving']),
      C('o-yeast', 'Baker’s yeast', '🍞', 'bio-respiration', 'Without oxygen it ferments sugar into ethanol and CO₂.', 'Anaerobic respiration in yeast produces…', ['ethanol and CO₂', 'lactate', 'oxygen']),
      C('o-hiv', 'HIV', '🧫', 'bio-immunity', 'A retrovirus that infects helper T cells, weakening adaptive immunity.', 'HIV copies its RNA into DNA using…', ['reverse transcriptase', 'DNA polymerase III', 'rubisco']),
      C('o-lynx', 'Lynx and hare', '🐇', 'bio-ecosystems', 'Fur-trade records show linked 10-year cycles in Canadian lynx and snowshoe hares.', 'In the cycles, which peaks first?', ['the hare', 'the lynx', 'both at once']),
      C('o-taq', 'Thermus aquaticus', '♨', 'bio-dna', 'A hot-spring bacterium whose heat-stable polymerase made PCR practical.', 'Taq polymerase survives PCR because it is…', ['heat-stable', 'very small', 'made of RNA']),
      C('o-moss', 'Moss', '🌿', 'bio-plantdiv', 'The green moss carpet is the haploid gametophyte; the stalked capsule is the sporophyte.', 'The dominant generation in mosses is the…', ['gametophyte', 'sporophyte', 'seed']),
      C('o-honeybee', 'Honeybee', '🐝', 'bio-behaviour', 'The waggle dance encodes the direction and distance of food.', 'Worker bees help their queen because they are closely…', ['related', 'paid with nectar', 'unrelated']),
      C('o-mouse', 'House mouse', '🐭', 'bio-animaldiv', 'Its heart beats about 600 times a minute; small animals live fast.', 'Per gram, small mammals burn energy…', ['faster than large ones', 'slower', 'at the same rate']),
      C('o-arabidopsis', 'Arabidopsis', '🌱', 'bio-plantgrowth', 'A tiny weed with a small genome, the model organism of plant biology.', 'Shoots bend towards light because auxin collects on the…', ['shaded side', 'lit side', 'root tip'])
    ],
    sky: [
      C('k-polaris', 'Polaris', '⭐', 'astro-sphere', 'Within 1° of the north celestial pole, it barely moves all night.', 'The altitude of Polaris equals your…', ['latitude', 'longitude', 'local time']),
      C('k-orion', 'Orion', '🏹', 'astro-hr', 'Contains red supergiant Betelgeuse and blue supergiant Rigel.', 'Betelgeuse looks red because its surface is…', ['cooler', 'hotter', 'moving towards us']),
      C('k-sirius', 'Sirius', '✨', 'astro-magnitudes', 'The brightest star in the night sky, 8.6 light-years away.', 'Smaller magnitudes mean a star looks…', ['brighter', 'fainter', 'redder']),
      C('k-moon', 'The Moon', '🌙', 'astro-moon', 'Always shows us the same face because its rotation is tidally locked.', 'A total solar eclipse can only happen at…', ['new moon', 'full moon', 'first quarter']),
      C('k-sun', 'The Sun', '☀', 'astro-hr', 'Fuses about 600 million tonnes of hydrogen every second.', 'The Sun’s energy comes from…', ['nuclear fusion', 'burning gas', 'fission']),
      C('k-jupiter', 'Jupiter', '🟠', 'astro-planets', 'More than twice as massive as all the other planets combined.', 'Jupiter is mostly made of…', ['hydrogen and helium', 'rock', 'iron']),
      C('k-algol', 'Algol', '👁', 'astro-binaries', 'The “demon star” dims every 2.87 days as its companion passes in front.', 'Algol varies in brightness because it is…', ['an eclipsing binary', 'pulsating', 'exploding']),
      C('k-crab', 'Crab Nebula', '🦀', 'astro-evolution', 'Remains of a supernova seen by Chinese astronomers in 1054, with a pulsar at its heart.', 'The pulsar at its centre is a spinning…', ['neutron star', 'white dwarf', 'planet']),
      C('k-andromeda', 'Andromeda Galaxy', '🌌', 'astro-galaxies', 'Hubble used its Cepheids in the 1920s to prove it lies far outside the Milky Way.', 'Cepheids work as standard candles because period sets their…', ['luminosity', 'colour', 'mass']),
      C('k-cmb', 'Cosmic microwave background', '📡', 'astro-cosmology', 'Leftover glow from 380 000 years after the Big Bang, now at 2.7 K.', 'The CMB has a temperature of about…', ['2.7 K', '270 K', '0 K']),
      C('k-halley', 'Halley’s Comet', '☄', 'astro-smallbodies', 'Returns every 75–76 years; its next visit is in 2061.', 'A comet’s tail points…', ['away from the Sun', 'along its path behind it', 'towards the Sun']),
      C('k-proxima', 'Proxima Centauri b', '🪐', 'astro-exoplanets', 'A planet in the habitable zone of the nearest star to the Sun.', 'It was found by detecting its star’s…', ['wobble (radial velocity)', 'colour change', 'sound']),
      C('k-milkyway', 'Milky Way', '🌠', 'astro-milkyway', 'Our galaxy has 100–400 billion stars; the Sun takes about 230 million years to orbit it.', 'Flat rotation curves are evidence for…', ['dark matter', 'black holes only', 'dust']),
      C('k-hubble', 'Hubble Space Telescope', '🛰', 'astro-telescopes', 'Above the atmosphere, it avoids blurring from turbulent air.', 'A larger telescope aperture gives…', ['finer resolution', 'a wider field only', 'redder images'])
    ]
  };
})();
