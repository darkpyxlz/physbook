/* Scibook textbook alignment. The subjects follow the books the learner studies from:
   Campbell Biology (12e), Young & Freedman's University Physics, Clayden's Organic Chemistry, Atkins' Physical
   Chemistry, the chemistry olympiad syllabus and a calculus-for-engineers course.
   - Every textbook chapter is mapped to the Scibook modules that teach it (#textbooks, "reading companion").
   - Parts (books on the skill tree) and chapter order follow the textbooks.
   - Each chapter page shows which textbook chapters it covers.
   Scibook text is original: the books set the order and coverage, not the wording. Loaded after prereqs.js and
   before tree.js, so books are built from the new parts. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;

  /* ---------- the textbooks ---------- */
  // Each chapter: [label, title, [Scibook chapter ids]]
  const BOOKS = [
    { id: 'campbell', subject: 'biology', short: 'Campbell 12e', title: 'Campbell Biology', ed: '12th edition', icon: '🧬',
      units: [
        ['Unit 1 · The Chemistry of Life', [[1, 'Evolution, the Themes of Biology, and Scientific Inquiry', ['bio-inquiry']], [2, 'The Chemical Context of Life', ['bio-molecules']], [3, 'Water and Life', ['bio-molecules']], [4, 'Carbon and the Molecular Diversity of Life', ['bio-molecules']], [5, 'The Structure and Function of Large Biological Molecules', ['bio-molecules']]]],
        ['Unit 2 · The Cell', [[6, 'A Tour of the Cell', ['bio-cells']], [7, 'Membrane Structure and Function', ['bio-membranes']], [8, 'An Introduction to Metabolism', ['bio-enzymes']], [9, 'Cellular Respiration and Fermentation', ['bio-respiration']], [10, 'Photosynthesis', ['bio-photosynthesis']], [11, 'Cell Communication', ['bio-signalling']], [12, 'The Cell Cycle', ['bio-cellcycle']]]],
        ['Unit 3 · Genetics', [[13, 'Meiosis and Sexual Life Cycles', ['bio-cellcycle']], [14, 'Mendel and the Gene Idea', ['bio-mendel']], [15, 'The Chromosomal Basis of Inheritance', ['bio-linkage']], [16, 'The Molecular Basis of Inheritance', ['bio-dna']], [17, 'Gene Expression: From Gene to Protein', ['bio-expression']], [18, 'Regulation of Gene Expression', ['bio-regulation', 'bio-expression']], [19, 'Viruses', ['bio-microbes']], [20, 'DNA Tools and Biotechnology', ['bio-dna']], [21, 'Genomes and Their Evolution', ['bio-genomes']]]],
        ['Unit 4 · Mechanisms of Evolution', [[22, 'Descent with Modification: A Darwinian View of Life', ['bio-evolution']], [23, 'The Evolution of Populations', ['bio-popgen']], [24, 'The Origin of Species', ['bio-evolution']], [25, 'The History of Life on Earth', ['bio-history']]]],
        ['Unit 5 · The Evolutionary History of Biological Diversity', [[26, 'Phylogeny and the Tree of Life', ['bio-evolution']], [27, 'Bacteria and Archaea', ['bio-microbes']], [28, 'Protists', ['bio-microbes']], [29, 'Plant Diversity I: How Plants Colonized Land', ['bio-plantdiv']], [30, 'Plant Diversity II: The Evolution of Seed Plants', ['bio-plantdiv']], [31, 'Fungi', ['bio-plantdiv']], [32, 'An Overview of Animal Diversity', ['bio-animaldiv']], [33, 'An Introduction to Invertebrates', ['bio-animaldiv']], [34, 'The Origin and Evolution of Vertebrates', ['bio-animaldiv']]]],
        ['Unit 6 · Plant Form and Function', [[35, 'Vascular Plant Structure, Growth, and Development', ['bio-plantgrowth']], [36, 'Resource Acquisition and Transport in Vascular Plants', ['bio-plants']], [37, 'Soil and Plant Nutrition', ['bio-soil']], [38, 'Angiosperm Reproduction and Biotechnology', ['bio-plantgrowth', 'bio-plantdiv']], [39, 'Plant Responses to Internal and External Signals', ['bio-plantgrowth']]]],
        ['Unit 7 · Animal Form and Function', [[40, 'Basic Principles of Animal Form and Function', ['bio-homeostasis']], [41, 'Animal Nutrition', ['bio-digestion']], [42, 'Circulation and Gas Exchange', ['bio-circulation']], [43, 'The Immune System', ['bio-immunity']], [44, 'Osmoregulation and Excretion', ['bio-homeostasis']], [45, 'Hormones and the Endocrine System', ['bio-endocrine', 'bio-homeostasis']], [46, 'Animal Reproduction', ['bio-reproduction']], [47, 'Animal Development', ['bio-development', 'bio-reproduction']], [48, 'Neurons, Synapses, and Signaling', ['bio-nerves']], [49, 'Nervous Systems', ['bio-nervous']], [50, 'Sensory and Motor Mechanisms', ['bio-senses', 'bio-nerves']], [51, 'Animal Behavior', ['bio-behaviour']]]],
        ['Unit 8 · Ecology', [[52, 'An Introduction to Ecology and the Biosphere', ['bio-biosphere']], [53, 'Population Ecology', ['bio-populations']], [54, 'Community Ecology', ['bio-ecosystems']], [55, 'Ecosystems and Restoration Ecology', ['bio-ecosystems']], [56, 'Conservation Biology and Global Change', ['bio-conservation', 'bio-populations']]]]
      ] },
    { id: 'yf', subject: 'physics', short: 'Young & Freedman', title: 'University Physics (Young & Freedman)', ed: '15th edition', icon: '⚛️',
      units: [
        ['Mechanics', [[1, 'Units, Physical Quantities, and Vectors', ['toolkit']], [2, 'Motion Along a Straight Line', ['kinematics']], [3, 'Motion in Two or Three Dimensions', ['kinematics']], [4, 'Newton’s Laws of Motion', ['newton']], [5, 'Applying Newton’s Laws', ['newton']], [6, 'Work and Kinetic Energy', ['energy']], [7, 'Potential Energy and Energy Conservation', ['energy']], [8, 'Momentum, Impulse, and Collisions', ['momentum']], [9, 'Rotation of Rigid Bodies', ['rotation']], [10, 'Dynamics of Rotational Motion', ['rotation']], [11, 'Equilibrium and Elasticity', ['elasticity']], [12, 'Fluid Mechanics', ['fluids']], [13, 'Gravitation', ['gravitation']], [14, 'Periodic Motion', ['oscillations']]]],
        ['Waves and Acoustics', [[15, 'Mechanical Waves', ['waves']], [16, 'Sound and Hearing', ['waves']]]],
        ['Thermodynamics', [[17, 'Temperature and Heat', ['thermal']], [18, 'Thermal Properties of Matter', ['thermal']], [19, 'The First Law of Thermodynamics', ['thermodynamics']], [20, 'The Second Law of Thermodynamics', ['thermodynamics']]]],
        ['Electromagnetism', [[21, 'Electric Charge and Electric Field', ['electrostatics']], [22, 'Gauss’s Law', ['electrostatics']], [23, 'Electric Potential', ['electrostatics']], [24, 'Capacitance and Dielectrics', ['circuits']], [25, 'Current, Resistance, and Electromotive Force', ['circuits']], [26, 'Direct-Current Circuits', ['circuits']], [27, 'Magnetic Field and Magnetic Forces', ['magnetism']], [28, 'Sources of Magnetic Field', ['magnetism']], [29, 'Electromagnetic Induction', ['induction']], [30, 'Inductance', ['induction']], [31, 'Alternating Current', ['induction']], [32, 'Electromagnetic Waves', ['induction']]]],
        ['Optics', [[33, 'The Nature and Propagation of Light', ['geometric-optics', 'wave-optics']], [34, 'Geometric Optics', ['geometric-optics']], [35, 'Interference', ['wave-optics']], [36, 'Diffraction', ['wave-optics']]]],
        ['Modern Physics', [[37, 'Relativity', ['relativity']], [38, 'Photons: Light Waves Behaving as Particles', ['quantum']], [39, 'Particles Behaving as Waves', ['quantum']], [40, 'Quantum Mechanics I: Wave Functions', ['quantum']], [41, 'Quantum Mechanics II: Atomic Structure', ['atoms']], [42, 'Molecules and Condensed Matter', ['condensed']], [43, 'Nuclear Physics', ['nuclear']], [44, 'Particle Physics and Cosmology', ['nuclear', 'astrophysics']]]]
      ] },
    { id: 'clayden', subject: 'chemistry', short: 'Clayden', title: 'Organic Chemistry (Clayden, Greeves and Warren)', ed: '2nd edition', icon: '⌬',
      units: [
        ['Structure and the first reactions', [[1, 'What is organic chemistry?', ['chem-organic']], [2, 'Organic structures', ['chem-organic']], [3, 'Determining organic structures', ['chem-spectro']], [4, 'Structure of molecules', ['chem-shapes', 'chem-organic']], [5, 'Organic reactions', ['chem-mechanisms']], [6, 'Nucleophilic addition to the carbonyl group', ['chem-carbonyl']], [7, 'Delocalization and conjugation', ['chem-acidity']], [8, 'Acidity, basicity, and pKa', ['chem-acidity']], [9, 'Using organometallic reagents to make C–C bonds', ['chem-carbonyl']], [10, 'Nucleophilic substitution at the carbonyl group', ['chem-carbonyl', 'chem-synthesis']], [11, 'Nucleophilic substitution at C=O with loss of carbonyl oxygen', ['chem-carbonyl']], [12, 'Equilibria, rates, and mechanisms', ['chem-mechdet', 'chem-kinetics']], [13, '¹H NMR: proton nuclear magnetic resonance', ['chem-spectro']]]],
        ['Stereochemistry, substitution and elimination', [[14, 'Stereochemistry', ['chem-stereo']], [15, 'Nucleophilic substitution at saturated carbon', ['chem-mechanisms']], [16, 'Conformational analysis', ['chem-stereo']], [17, 'Elimination reactions', ['chem-mechanisms']], [18, 'Review of spectroscopic methods', ['chem-spectro']], [19, 'Electrophilic addition to alkenes', ['chem-mechanisms']]]],
        ['Enolates, aromatic rings and selectivity', [[20, 'Formation and reactions of enols and enolates', ['chem-enolates']], [21, 'Electrophilic aromatic substitution', ['chem-aromatic']], [22, 'Conjugate addition and nucleophilic aromatic substitution', ['chem-enolates', 'chem-aromatic']], [23, 'Chemoselectivity and protecting groups', ['chem-synthesis']], [24, 'Regioselectivity', ['chem-aromatic', 'chem-synthesis']], [25, 'Alkylation of enolates', ['chem-enolates']], [26, 'Reactions of enolates with carbonyl compounds: the aldol and Claisen reactions', ['chem-enolates']], [27, 'Sulfur, silicon, and phosphorus in organic chemistry', ['chem-organometallic', 'chem-carbonyl']], [28, 'Retrosynthetic analysis', ['chem-synthesis']]]],
        ['Rings, stereoselectivity and pericyclic reactions', [[29, 'Aromatic heterocycles 1: reactions', ['chem-heterocycles']], [30, 'Aromatic heterocycles 2: synthesis', ['chem-heterocycles']], [31, 'Saturated heterocycles and stereoelectronics', ['chem-heterocycles', 'chem-stereo']], [32, 'Stereoselectivity in cyclic molecules', ['chem-stereo']], [33, 'Diastereoselectivity', ['chem-stereo']], [34, 'Pericyclic reactions 1: cycloadditions', ['chem-pericyclic']], [35, 'Pericyclic reactions 2: sigmatropic and electrocyclic reactions', ['chem-pericyclic']], [36, 'Participation, rearrangement, and fragmentation', ['chem-mechdet']]]],
        ['Radicals, mechanisms and modern synthesis', [[37, 'Radical reactions', ['chem-radicals']], [38, 'Synthesis and reactions of carbenes', ['chem-radicals']], [39, 'Determining reaction mechanisms', ['chem-mechdet']], [40, 'Organometallic chemistry', ['chem-organometallic', 'chem-coord']], [41, 'Asymmetric synthesis', ['chem-organometallic', 'chem-stereo']], [42, 'Organic chemistry of life', ['chem-biomolecules', 'bio-molecules']], [43, 'Organic chemistry today', ['chem-biomolecules', 'chem-synthesis']]]]
      ] },
    { id: 'atkins', subject: 'chemistry', short: 'Atkins', title: 'Atkins’ Physical Chemistry', ed: '11th edition (Focus numbering)', icon: '🌡️',
      units: [
        ['Thermodynamics', [['Focus 1', 'The properties of gases', ['chem-gases']], ['Focus 2', 'The First Law', ['chem-thermo']], ['Focus 3', 'The Second and Third Laws', ['chem-gibbs']], ['Focus 4', 'Physical transformations of pure substances', ['chem-phases']], ['Focus 5', 'Simple mixtures', ['chem-solutions', 'chem-phases']], ['Focus 6', 'Chemical equilibrium', ['chem-equilibrium', 'chem-acids', 'chem-titration', 'chem-electro']]]],
        ['Structure', [['Focus 7', 'Quantum theory', ['quantum', 'chem-atom']], ['Focus 8', 'Atomic structure and spectra', ['chem-atom', 'atoms']], ['Focus 9', 'Molecular structure', ['chem-bonding', 'chem-shapes']], ['Focus 10', 'Molecular symmetry', ['chem-symmetry']], ['Focus 11', 'Molecular spectroscopy', ['chem-molspec', 'chem-spectro']], ['Focus 12', 'Magnetic resonance', ['chem-spectro', 'chem-molspec']], ['Focus 13', 'Statistical thermodynamics', ['chem-statmech']], ['Focus 14', 'Molecular interactions', ['chem-shapes', 'chem-gases']], ['Focus 15', 'Solids', ['chem-solid']]]],
        ['Processes', [['Focus 16', 'Molecules in motion', ['chem-dynamics', 'chem-gases']], ['Focus 17', 'Chemical kinetics', ['chem-kinetics']], ['Focus 18', 'Reaction dynamics', ['chem-dynamics']], ['Focus 19', 'Processes at solid surfaces', ['chem-dynamics']]]]
      ] },
    { id: 'olympiad', subject: 'chemistry', short: 'Chem olympiad', title: 'Chemistry olympiad syllabus', ed: 'general and inorganic topics (IChO / national olympiads)', icon: '🏅',
      units: [
        ['General chemistry', [['1', 'Stoichiometry and the mole', ['chem-moles']], ['2', 'Solutions and concentration', ['chem-solutions']], ['3', 'Atomic structure and periodicity', ['chem-atom', 'chem-periodic']], ['4', 'Chemical bonding and molecular shape', ['chem-bonding', 'chem-shapes']], ['5', 'Gases', ['chem-gases']]]],
        ['Physical chemistry', [['6', 'Thermochemistry and thermodynamics', ['chem-thermo', 'chem-gibbs']], ['7', 'Equilibrium and phase equilibria', ['chem-equilibrium', 'chem-phases']], ['8', 'Acid–base and solubility equilibria', ['chem-acids', 'chem-titration']], ['9', 'Electrochemistry', ['chem-electro', 'chem-redox']], ['10', 'Kinetics and reaction dynamics', ['chem-kinetics', 'chem-dynamics']], ['11', 'Spectroscopy and quantum chemistry', ['chem-molspec', 'chem-spectro', 'chem-symmetry']], ['12', 'Solid state', ['chem-solid']]]],
        ['Inorganic chemistry', [['13', 'Main-group trends', ['chem-maingroup']], ['14', 's-block elements', ['chem-sblock']], ['15', 'p-block elements', ['chem-pblock', 'chem-chalcogens']], ['16', 'Transition metals', ['chem-transition']], ['17', 'Coordination chemistry', ['chem-coord']], ['18', 'Redox and analysis', ['chem-redox', 'chem-titration']]]],
        ['Organic chemistry', [['19', 'Structure, isomerism and stereochemistry', ['chem-organic', 'chem-stereo']], ['20', 'Reaction mechanisms', ['chem-mechanisms', 'chem-mechdet']], ['21', 'Carbonyl and enolate chemistry', ['chem-carbonyl', 'chem-enolates']], ['22', 'Aromatic and heterocyclic chemistry', ['chem-aromatic', 'chem-heterocycles']], ['23', 'Pericyclic and radical reactions', ['chem-pericyclic', 'chem-radicals']], ['24', 'Synthesis and structure determination', ['chem-synthesis', 'chem-spectro']], ['25', 'Biomolecules', ['chem-biomolecules']]]]
      ] },
    { id: 'calc', subject: 'maths', short: 'Calculus for Engineers', title: 'Calculus for Engineers', ed: 'matched by topic', icon: '∫', topics: true,
      units: [
        ['Single-variable calculus', [['', 'Plane analytic geometry: lines, conics and polar coordinates', ['math-conics', 'math-functions']], ['', 'Functions', ['math-functions', 'math-trig']], ['', 'Limits and continuity', ['math-limits']], ['', 'Differentiation', ['math-derivatives']], ['', 'Applications of differentiation', ['math-applications']], ['', 'The indefinite and definite integral', ['math-integrals']], ['', 'Techniques of integration', ['math-techniques']], ['', 'Applications of the definite integral', ['math-intapps']], ['', 'Differential equations', ['math-odes']], ['', 'Infinite sequences and series', ['math-series', 'math-sequences']]]],
        ['Several variables', [['', 'Vectors and three-dimensional analytic geometry', ['math-space', 'math-linear']], ['', 'Differential calculus of multivariable functions', ['math-multivar']], ['', 'Multiple integrals', ['math-multiple']], ['', 'Vector calculus', ['math-vectorcalc']], ['', 'Complex numbers', ['math-complex']]]]
      ] }
  ];
  PB.TEXTBOOKS = BOOKS;

  /* ---------- parts and order, following the books ---------- */
  const LAYOUT = {
    maths: [['Precalculus', ['math-functions', 'math-trig', 'math-conics', 'math-sequences']], ['Calculus', ['math-limits', 'math-derivatives', 'math-applications', 'math-integrals', 'math-techniques', 'math-intapps']],
      ['Further Calculus', ['math-series', 'math-odes', 'math-space', 'math-multivar', 'math-multiple', 'math-vectorcalc', 'math-complex']], ['Linear Algebra and Statistics', ['math-linear', 'math-stats']],
      ['Olympiad Foundations', ['math-proof', 'math-numbertheory', 'math-combinatorics', 'math-recurrences']], ['Olympiad Topics', ['math-inequalities', 'math-algebra', 'math-geometry', 'math-graphs', 'math-games', 'math-diophantine']]],
    physics: [['Mechanics', ['toolkit', 'kinematics', 'newton', 'energy', 'momentum', 'rotation', 'elasticity', 'fluids', 'gravitation', 'oscillations']], ['Waves and Thermodynamics', ['waves', 'thermal', 'thermodynamics']],
      ['Electromagnetism', ['electrostatics', 'circuits', 'magnetism', 'induction']], ['Optics', ['geometric-optics', 'wave-optics']], ['Modern Physics', ['relativity', 'quantum', 'atoms', 'condensed', 'nuclear']], ['Olympiad Extensions', ['analytical', 'astrophysics', 'experimental']]],
    chemistry: [['Foundations', ['chem-moles', 'chem-solutions', 'chem-atom', 'chem-periodic', 'chem-bonding', 'chem-shapes']],
      ['Physical Chemistry: Energy and Equilibrium', ['chem-gases', 'chem-thermo', 'chem-gibbs', 'chem-phases', 'chem-equilibrium', 'chem-acids', 'chem-titration', 'chem-electro']],
      ['Physical Chemistry: Structure and Change', ['chem-symmetry', 'chem-molspec', 'chem-statmech', 'chem-solid', 'chem-kinetics', 'chem-dynamics']],
      ['Inorganic Chemistry', ['chem-maingroup', 'chem-sblock', 'chem-pblock', 'chem-chalcogens', 'chem-transition', 'chem-coord', 'chem-redox']],
      ['Organic Chemistry: Structure and Reactivity', ['chem-organic', 'chem-spectro', 'chem-mechanisms', 'chem-acidity', 'chem-stereo', 'chem-synthesis']],
      ['Organic Chemistry: Synthesis and Mechanism', ['chem-carbonyl', 'chem-enolates', 'chem-aromatic', 'chem-heterocycles', 'chem-pericyclic', 'chem-radicals', 'chem-mechdet', 'chem-organometallic', 'chem-biomolecules']]],
    biology: [['The Chemistry of Life', ['bio-inquiry', 'bio-molecules']], ['The Cell', ['bio-cells', 'bio-membranes', 'bio-enzymes', 'bio-respiration', 'bio-photosynthesis', 'bio-signalling', 'bio-cellcycle']],
      ['Genetics', ['bio-mendel', 'bio-linkage', 'bio-dna', 'bio-expression', 'bio-regulation', 'bio-genomes']], ['Mechanisms of Evolution', ['bio-evolution', 'bio-popgen', 'bio-history']],
      ['The Diversity of Life', ['bio-microbes', 'bio-plantdiv', 'bio-animaldiv']], ['Plant Form and Function', ['bio-plants', 'bio-soil', 'bio-plantgrowth']],
      ['Animal Form and Function', ['bio-homeostasis', 'bio-digestion', 'bio-circulation', 'bio-immunity', 'bio-endocrine', 'bio-reproduction', 'bio-development']],
      ['Nerves, Senses and Behaviour', ['bio-nerves', 'bio-nervous', 'bio-senses', 'bio-behaviour']], ['Ecology', ['bio-biosphere', 'bio-populations', 'bio-ecosystems', 'bio-conservation']]]
  };
  PB.PART_ICONS = Object.assign(PB.PART_ICONS || {}, {
    'physics/Mechanics': '⚙️', 'Waves and Thermodynamics': '🌊', 'Electromagnetism': '⚡',
    'Physical Chemistry: Energy and Equilibrium': '🌡️', 'Physical Chemistry: Structure and Change': '🔬', 'Organic Chemistry: Structure and Reactivity': '⌬', 'Organic Chemistry: Synthesis and Mechanism': '⚗️',
    'The Chemistry of Life': '💧', 'The Cell': '🧫', 'biology/Genetics': '🧬', 'Mechanisms of Evolution': '🦕', 'The Diversity of Life': '🦋', 'Plant Form and Function': '🌱',
    'Animal Form and Function': '🫀', 'Nerves, Senses and Behaviour': '🧠', 'Ecology': '🌍'
  });
  // Badges that name chapters by number keep their original meaning after renumbering.
  PB.chapters.forEach((c) => { if (c.legacyNum == null) c.legacyNum = c.num; });
  Object.keys(LAYOUT).forEach((sid) => {
    const sub = PB.subject(sid), placed = {};
    let n = 0;
    sub.parts = LAYOUT[sid].map((p) => p[0]);
    LAYOUT[sid].forEach(([part, ids]) => ids.forEach((id) => { const c = PB.chapter(id); if (!c || c.subject !== sid) return; c.part = part; c.num = ++n; placed[id] = 1; }));
    // Anything not in the layout keeps its place at the end of its old part list.
    PB.chaptersOf(sid).forEach((c) => { if (!placed[c.id]) { c.num = ++n; if (sub.parts.indexOf(c.part) < 0) sub.parts.push(c.part); } });
  });
  const so = (c) => PB.SUBJECTS.findIndex((s) => s.id === c.subject);
  PB.chapters.sort((a, b) => so(a) - so(b) || a.num - b.num);
  // Prerequisites declared by chapters written after prereqs.js was authored.
  PB.chapters.forEach((c) => { if (c.prereqs && !PB.PREREQS[c.id]) PB.PREREQS[c.id] = c.prereqs.filter((x) => PB.chapter(x)); });

  /* ---------- references on each chapter ---------- */
  const refsOf = {};
  BOOKS.forEach((b) => b.units.forEach(([, list]) => list.forEach(([lab, title, ids]) => ids.forEach((id, k) => { (refsOf[id] = refsOf[id] || []).push({ book: b, label: lab, title: title, main: k === 0 }); }))));
  PB.textbookRefs = (ch) => refsOf[ch.id] || [];
  function refLine(ch) {
    const rs = refsOf[ch.id];
    if (!rs || !rs.length) return null;
    const byBook = {};
    rs.forEach((r) => { (byBook[r.book.id] = byBook[r.book.id] || { b: r.book, list: [] }).list.push(r); });
    const wrap = h('div', { class: 'tb-refs' }, [h('span', { class: 'tb-refs-lbl', text: '📘 Read alongside' })]);
    Object.values(byBook).forEach(({ b, list }) => {
      const main = list.filter((r) => r.main), rest = list.filter((r) => !r.main);
      const fmt = (r) => (b.topics ? '' : (typeof r.label === 'number' ? 'ch. ' + r.label : r.label) + ' ') + r.title;
      wrap.appendChild(h('a', { class: 'tb-ref', href: '#textbooks-' + b.id, title: list.map(fmt).join('\n') }, [h('b', { text: b.short }), h('span', { text: ' ' + (main.length ? main : rest).map((r) => b.topics ? r.title : (typeof r.label === 'number' ? r.label : r.label.replace('Focus ', 'F'))).join(', ') + (main.length && rest.length ? ' (+' + rest.length + ' in part)' : '') })]));
    });
    return wrap;
  }
  const prevHead = PB.chapterHeadExtras;
  PB.chapterHeadExtras = function (ch, head) { if (prevHead) prevHead(ch, head); const r = refLine(ch); if (r) head.appendChild(r); };

  /* ---------- #textbooks: the reading companion ---------- */
  let cur = null;
  function progressOf(c) { const st = PB.chapterStats(c); return Math.round(100 * (st.progress || 0)); }
  function chip(id) {
    const c = PB.chapter(id);
    if (!c) return h('span', { class: 'tb-chip soon', text: 'coming soon' });
    const p = progressOf(c), sub = PB.subject(c.subject);
    return h('a', { class: 'tb-chip subj-' + c.subject, href: '#ch-' + c.id, title: sub.name + ' · chapter ' + c.num + ' · ' + p + '% done' }, [h('span', { class: 'tb-chip-t', text: (c.subject !== cur.subject ? sub.mark + ' ' : '') + c.title }), h('span', { class: 'tb-chip-bar' }, [h('i', { style: 'width:' + p + '%' })])]);
  }
  function view(id) {
    cur = BOOKS.find((b) => b.id === id) || BOOKS.find((b) => b.id === S().textbook) || BOOKS[0];
    S().textbook = cur.id; PB.save();
    const wrap = h('div', { class: 'wrap-wide textbooks' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Reading companion' }));
    wrap.appendChild(h('h1', { text: '📘 Your textbooks' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'The subjects follow the books you study from. Every chapter of each book is listed with the Scibook modules that teach it, so you can read a chapter and then practise it here. Scibook explains things in its own words and with its own problems; the books set the order and the coverage.' }));
    const tabs = h('div', { class: 'cc-tabs' });
    BOOKS.forEach((b) => tabs.appendChild(h('a', { class: 'cc-tab subj-' + b.subject + (b.id === cur.id ? ' on' : ''), href: '#textbooks-' + b.id }, [h('span', { text: b.icon }), h('b', { text: b.short })])));
    wrap.appendChild(tabs);
    const all = [].concat(...cur.units.map((u) => u[1])), ids = {};
    all.forEach((r) => r[2].forEach((x) => { ids[x] = 1; }));
    const mods = Object.keys(ids).map(PB.chapter).filter(Boolean), covered = all.filter((r) => r[2].some((x) => PB.chapter(x))).length;
    const avg = mods.length ? Math.round(mods.reduce((a, c) => a + progressOf(c), 0) / mods.length) : 0;
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: cur.title }), h('p', { text: cur.ed + ' · ' + all.length + (cur.topics ? ' topics' : ' chapters') + ', ' + covered + ' covered by ' + mods.length + ' Scibook modules · your progress ' + avg + '%' })]));
    cur.units.forEach(([unit, list]) => {
      wrap.appendChild(h('div', { class: 'part-label', text: unit }));
      const tbl = h('div', { class: 'tb-table' });
      list.forEach(([lab, title, chIds]) => {
        tbl.appendChild(h('div', { class: 'tb-row' }, [h('span', { class: 'tb-num', text: cur.topics ? '•' : String(lab).replace('Focus ', 'F') }), h('span', { class: 'tb-title', text: title }), h('span', { class: 'tb-mods' }, chIds.map(chip))]));
      });
      wrap.appendChild(tbl);
    });
    wrap.appendChild(h('p', { class: 'predict-note', text: 'Progress bars show how much of each Scibook module you have done (sections read and problems solved). Modules from another subject are marked with that subject’s symbol.' }));
    PB.setView([wrap], 'textbooks');
    window.scrollTo(0, 0);
  }
  PB.views.textbooks = () => view();
  BOOKS.forEach((b) => { PB.views['textbooks-' + b.id] = () => view(b.id); });
})();
