/* Cytos — static game data: resources, structures, genes, alleles, news. */
'use strict';
const CY = (window.CY = window.CY || {});

CY.RES = [
  { id: 'atp', name: 'ATP', icon: '⚡', color: '#1f9d8a', cap: 150,
    tip: 'The energy currency of the cell. Made by glycolysis (a trickle) and by respiration in mitochondria (a flood).' },
  { id: 'aa', name: 'Amino acids', icon: '▲', color: '#8a45c2', cap: 40,
    tip: 'Imported by amino-acid transporters. Ribosomes link them into protein.' },
  { id: 'nuc', name: 'Nucleotides', icon: '≋', color: '#d0467a', cap: 40,
    tip: 'A, G, C, T and U building blocks. Needed to make mRNA, ribosomes and to copy DNA.' },
  { id: 'mrna', name: 'mRNA', icon: '〰', color: '#d4831c', cap: 6,
    tip: 'Messenger RNA: a transcribed copy of a gene. Ribosomes translate it into protein.' },
  { id: 'protein', name: 'Protein', icon: '✦', color: '#2f7fd0', cap: 80,
    tip: 'Folded polypeptides — the building material for every transporter, enzyme and organelle.' },
];
CY.RES_BY_ID = Object.fromEntries(CY.RES.map((r) => [r.id, r]));

// Structures you build. `dest` = where the protein must be targeted in the build puzzle.
CY.STRUCTS = [
  { id: 'glut', name: 'GLUT transporter', icon: '⬡', cost: { protein: 4, atp: 12 }, g: 1.38, dest: 'pm',
    eff: '+0.35 ATP/s from glycolysis',
    bio: 'Facilitated diffusion lets glucose flow in down its gradient. Glycolysis then splits it for a net 2 ATP.' },
  { id: 'aat', name: 'Amino-acid transporter', icon: '▲', cost: { protein: 4, atp: 10 }, g: 1.38, dest: 'pm',
    eff: '+0.2 amino acids/s',
    bio: 'Na⁺-coupled symporters drag amino acids into the cell using the sodium gradient.' },
  { id: 'ent', name: 'Nucleoside transporter', icon: '≋', cost: { protein: 4, atp: 10 }, g: 1.38, dest: 'pm',
    eff: '+0.15 nucleotides/s',
    bio: 'Equilibrative nucleoside transporters (ENTs) import nucleosides for the salvage pathway.' },
  { id: 'ribo', name: 'Ribosome', icon: '●', cost: { protein: 6, nuc: 6, atp: 15 }, g: 1.42, dest: 'nucleus',
    eff: '+50% protein per translation',
    bio: 'Ribosomal proteins are made in the cytosol, imported into the nucleolus, assembled with rRNA and exported back out.' },
  { id: 'mito', name: 'Mitochondrion', icon: '⬭', cost: { protein: 10, atp: 30 }, g: 1.5, dest: 'mito',
    eff: '+2 ATP/s while respiring',
    bio: 'Most mitochondrial proteins are encoded in the nucleus and imported via an N-terminal targeting sequence.', unlock: (S) => S.flags.translated },
  { id: 'receptor', name: 'Surface receptor', icon: 'Y', cost: { protein: 6, atp: 15 }, g: 1.6, dest: 'pm',
    eff: '+1 signal slot; signals arrive more often',
    bio: 'Receptors are made on the rough ER and shipped to the plasma membrane via the Golgi.', unlock: (S) => S.flags.translated },
  { id: 'rer', name: 'Rough ER', icon: '≈', cost: { protein: 14, atp: 40 }, g: 1.55, dest: 'er',
    eff: '+30% protein per translation',
    bio: 'Ribosome-studded membranes where secreted and membrane proteins are made and folded.', unlock: (S) => S.b.ribo >= 2 },
  { id: 'golgi', name: 'Golgi apparatus', icon: '☰', cost: { protein: 18, atp: 50 }, g: 1.6, dest: 'er',
    eff: '−8% build costs',
    bio: 'Modifies, sorts and ships proteins in vesicles. Golgi enzymes enter the secretory pathway through the ER.', unlock: (S) => S.b.rer >= 1 },
  { id: 'perox', name: 'Peroxisome', icon: '◈', cost: { protein: 10, atp: 30 }, g: 1.5, dest: 'perox',
    eff: '−20% DNA damage from ROS',
    bio: 'Catalase in peroxisomes destroys hydrogen peroxide before it can oxidise your DNA.', unlock: (S) => S.stats.lesions > 0 },
  { id: 'lyso', name: 'Lysosome', icon: '◉', cost: { protein: 12, atp: 30 }, g: 1.5, dest: 'lyso',
    eff: 'Digests viruses automatically',
    bio: 'Lysosomal hydrolases are tagged with mannose-6-phosphate in the Golgi so they are sorted to lysosomes.', unlock: (S) => S.flags.seenVirus },
];
CY.STRUCT_BY_ID = Object.fromEntries(CY.STRUCTS.map((s) => [s.id, s]));

// Automation & boost genes, bought with Insight (only earned in Cell School). Permanent.
CY.GENES = [
  { id: 'promoter', name: 'Constitutive promoter', icon: '📜', auto: 'transcribe', cost: 6, g: 1.65, max: 8,
    bio: 'A promoter that is always "on" keeps RNA polymerase transcribing without any signal.' },
  { id: 'polysome', name: 'Polysomes', icon: '🧶', auto: 'translate', cost: 8, g: 1.65, max: 8,
    bio: 'Many ribosomes translating one mRNA at once — a polysome.' },
  { id: 'supercomplex', name: 'Respiratory supercomplex', icon: '🔋', auto: 'respire', cost: 10, g: 1.65, max: 8,
    bio: 'Complexes I, III and IV associate into "respirasomes" that pass electrons more efficiently.' },
  { id: 'srp', name: 'Signal recognition particle', icon: '📮', auto: 'build', cost: 12, g: 1.7, max: 6,
    bio: 'SRP grabs signal peptides as they emerge from the ribosome and docks them at the ER — targeting on autopilot.' },
  { id: 'p53', name: 'p53 guardian', icon: '🛡', auto: 'repair', cost: 8, g: 1.65, max: 8,
    bio: '"Guardian of the genome": p53 pauses the cell cycle and switches on DNA-repair genes.' },
  { id: 'ifn', name: 'Interferon response', icon: '🚨', auto: 'virus', cost: 8, g: 1.65, max: 8,
    bio: 'Interferon-stimulated genes block viral entry and replication.' },
  { id: 'kinase', name: 'Kinase amplification', icon: '📡', auto: 'signal', cost: 8, g: 1.65, max: 8,
    bio: 'Each kinase activates many copies of the next, so cascades run themselves.' },
  { id: 'hexokinase', name: 'Hexokinase isoform', icon: '🍬', boost: 'atp', cost: 5, g: 1.8, max: 10, per: 15,
    bio: 'Hexokinase traps glucose in the cell as glucose-6-phosphate, committing it to glycolysis.' },
  { id: 'codon', name: 'Codon optimisation', icon: '🧩', boost: 'protein', cost: 5, g: 1.8, max: 10, per: 15,
    bio: 'Genes that use common codons are translated faster because matching tRNAs are abundant.' },
  { id: 'chromatin', name: 'Open chromatin', icon: '🧵', boost: 'mrna', cost: 6, g: 1.8, max: 6, per: 20,
    bio: 'Histone acetylation loosens chromatin so transcription factors can reach promoters.' },
];
CY.GENE_BY_ID = Object.fromEntries(CY.GENES.map((g) => [g.id, g]));
CY.autoInterval = (lvl, speed = 1) => (lvl <= 0 ? Infinity : Math.max(8, 80 - 10 * (lvl - 1)) / speed);
CY.AUTO_TEXT = {
  transcribe: 'Transcribes 1 mRNA automatically',
  translate: 'Translates 1 mRNA automatically (75% yield)',
  respire: 'Adds 30 s of respiration automatically',
  build: 'Unlocks Quick build (skip the targeting puzzle) and auto-builds your cheapest transporter',
  repair: 'Repairs a DNA lesion automatically',
  virus: 'Destroys a virus automatically',
  signal: 'Relays a waiting signal automatically',
};

// Allele traits rolled on replication. Positive value = good for the cell.
CY.TRAITS = [
  { id: 'atp', name: 'ATP production', base: 10 },
  { id: 'protein', name: 'Protein yield', base: 10 },
  { id: 'mrna', name: 'Transcription yield', base: 12 },
  { id: 'resp', name: 'Respiration duration', base: 12 },
  { id: 'build', name: 'Cheaper building', base: 7 },
  { id: 'aa', name: 'Amino-acid import', base: 12 },
  { id: 'nuc', name: 'Nucleotide import', base: 12 },
  { id: 'insight', name: 'Insight from Cell School', base: 8 },
  { id: 'auto', name: 'Automation speed', base: 9 },
  { id: 'mutagen', name: 'Mutagen from replication', base: 10 },
  { id: 'damage', name: 'DNA damage resistance', base: 12 },
  { id: 'virus', name: 'Viral resistance', base: 12 },
  { id: 'cap', name: 'Storage capacity', base: 12 },
];
CY.TRAIT_BY_ID = Object.fromEntries(CY.TRAITS.map((t) => [t.id, t]));
CY.RARITY = [
  { n: 'Common', c: '#7b8496', mult: 1, w: 50, neg: 0.55, traits: 2 },
  { n: 'Uncommon', c: '#1f8a5b', mult: 1.6, w: 28, neg: 0.4, traits: 2 },
  { n: 'Rare', c: '#3b5fb8', mult: 2.4, w: 14, neg: 0.3, traits: 3 },
  { n: 'Epic', c: '#8a45c2', mult: 3.6, w: 6, neg: 0.18, traits: 3 },
  { n: 'Legendary', c: '#c98a10', mult: 5.5, w: 2, neg: 0.06, traits: 4 },
];
CY.GENE_FAMILIES = ['ATP5', 'COX', 'MFN', 'NDUF', 'SOD', 'TP53', 'BRCA', 'RPL', 'RPS', 'HSP', 'SLC2A', 'PFK', 'HK', 'IRF', 'MYC', 'KRAS', 'CDK', 'TOP2', 'POLD', 'LIG', 'SRP', 'TIM', 'TOM', 'PEX', 'LAMP'];
CY.GREEK = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'κ', 'λ', 'μ', 'σ', 'ω'];
CY.LOCI = [
  { name: 'Locus I', unlock: 1 },
  { name: 'Locus II', unlock: 2 },
  { name: 'Locus III', unlock: 4 },
];

CY.NEWS = [
  'Did you know? A single human cell contains about 2 metres of DNA.',
  'Breaking: mitochondria still refuse to comment on their bacterial past.',
  'Did you know? Your body turns over roughly its own weight in ATP every day.',
  'Ribosomes report record output: ~10–20 amino acids per second per ribosome.',
  'Local helicase unwinds DNA at up to 1,000 base pairs per second, neighbours alarmed.',
  'Did you know? The Na⁺/K⁺ pump can use a third of a cell’s ATP at rest.',
  'Virus spokesperson: "We just want to borrow your ribosomes for a bit."',
  'Did you know? DNA polymerase makes only about one error per billion bases after proofreading and mismatch repair.',
  'Peroxisome catalase splits millions of H₂O₂ molecules per second. Scientists call it "very fast".',
  'Did you know? There are 64 codons but only 20 standard amino acids — the code is degenerate.',
  'Opinion: "Is the Golgi just the cell’s post office?" — a long read.',
  'Did you know? p53 is mutated in about half of all human cancers.',
  'Weather: UV index high today. Thymine dimers expected; nucleotide excision repair on standby.',
  'Did you know? Each human cell suffers tens of thousands of DNA lesions every day.',
  'Lysosomes hold their contents at pH ~4.5 — about as acidic as tomato juice.',
  'Did you know? The ETC pumps about 10 H⁺ per NADH; ATP synthase needs ~3–4 H⁺ per ATP.',
  'Interview: cytochrome c on its double life as an electron shuttle and an apoptosis trigger.',
  'Did you know? Insulin makes muscle and fat cells move GLUT4 transporters to their surface.',
  'Did you know? Telomeres shorten a little at every division in most somatic cells.',
  'Tip: Insight comes only from Cell School — and spaced reviews pay more over time.',
];

CY.OBJECTIVES = [
  { text: 'Express your DNA: transcribe a gene into mRNA', hint: 'Press "Transcribe" in Processes and drag the pieces into place.', done: (S) => S.stats.transcribed >= 1 },
  { text: 'Translate your mRNA into protein', hint: 'Match each tRNA anticodon to its codon on the mRNA.', done: (S) => S.stats.translated >= 1 },
  { text: 'Build a GLUT transporter', hint: 'Send each new protein to the compartment its signal sequence points to.', done: (S) => S.b.glut >= 2 },
  { text: 'Build a mitochondrion', hint: 'The powerhouse. You will need around 10 protein.', done: (S) => S.b.mito >= 1 },
  { text: 'Run the electron transport chain', hint: 'Assemble the complexes on the inner mitochondrial membrane in the right order.', done: (S) => S.stats.respired >= 1 },
  { text: 'Finish a Cell School round', hint: 'Open 🧠 Cell School. Insight is the only currency for genes.', done: (S) => S.meta.quiz.stats.rounds >= 1 },
  { text: 'Buy a gene in the 🧬 Genes tab', hint: 'Genes automate processes — slowly at first.', done: (S) => Object.values(S.meta.genes).some((v) => v > 0) },
  { text: 'Relay a signal from a receptor', hint: 'When a receptor lights up, put its cascade in order.', done: (S) => S.stats.signals >= 1 },
  { text: 'Repair DNA damage', hint: 'Click a glowing lesion in the nucleus, then pick the right repair pathway.', done: (S) => S.stats.repairs >= 1 },
  { text: 'Replicate! Copy your genome and divide', hint: 'Meet the requirements on the Replication card, then copy the DNA and order the stages of mitosis.', done: (S) => S.meta.reps >= 1 },
  { text: 'Roll an allele in the 🎲 Alleles tab', hint: 'Spend Mutagen for a random gene variant. Keep it or stay with the old one.', done: (S) => S.meta.rolls >= 1 },
  { text: 'Replicate 3 times', hint: 'Each lineage is stronger than the last.', done: (S) => S.meta.reps >= 3 },
  { text: 'Find an Epic or Legendary allele', hint: 'Higher rarities have more and stronger traits, and rarely bad ones.', done: (S) => S.meta.alleles.some((a) => a && a.r >= 3) },
  { text: 'Review 25 items at least 3 times in Cell School', hint: 'Items come back for review after 10 min, 30 min, 2 h… Spaced practice sticks.', done: (S) => Object.values(S.meta.quiz.items).filter((r) => r.box >= 3).length >= 25 },
];

// Inspector cards: click a structure in the cell to read about it.
CY.INFO = {
  nucleus: { name: 'Nucleus', icon: '🟣', size: '~6 µm across', text: 'Holds the genome. A double membrane, the nuclear envelope, is pierced by ~2,000 nuclear pore complexes that let mRNA out and proteins in.', fact: 'Unwound, the DNA in one nucleus would stretch about 2 m.' },
  nucleolus: { name: 'Nucleolus', icon: '⚪', size: '~1–2 µm', text: 'A dense region of the nucleus where rRNA genes are transcribed and ribosomal subunits are assembled.', fact: 'It is not surrounded by a membrane — it forms by phase separation, like oil droplets.' },
  chromatin: { name: 'Chromatin', icon: '🧵', size: '2 nm DNA, 11 nm nucleosomes', text: 'DNA wrapped around histone proteins. Dense heterochromatin (near the envelope) is silent; loose euchromatin is actively transcribed.', fact: 'Each nucleosome wraps ~147 base pairs of DNA nearly twice around eight histones.' },
  mito: { name: 'Mitochondrion', icon: '🔴', size: '~0.5 × 2 µm', text: 'Outer membrane, inner membrane folded into cristae, and the matrix. The Krebs cycle runs in the matrix; the electron transport chain and ATP synthase sit on the cristae.', fact: 'Mitochondria have their own circular DNA (16,569 bp in humans), inherited from your mother.' },
  rer: { name: 'Rough endoplasmic reticulum', icon: '〰️', size: 'sheets ~50 nm thick', text: 'Flattened sacs continuous with the nuclear envelope, studded with ribosomes making membrane and secreted proteins, which fold in its lumen.', fact: 'In antibody-secreting plasma cells the rough ER can fill most of the cytoplasm.' },
  golgi: { name: 'Golgi apparatus', icon: '🟡', size: 'stacks of 4–8 cisternae', text: 'Proteins arrive at the cis face from the ER, are modified (e.g. glycosylated) as they move through the stack, and leave the trans face in vesicles.', fact: 'Camillo Golgi described it in 1898 using a silver stain; many doubted it existed until electron microscopy.' },
  lyso: { name: 'Lysosome', icon: '🟤', size: '0.1–1 µm', text: 'Acidic vesicles (pH ~4.5) full of ~60 hydrolase enzymes that digest worn-out organelles, engulfed material and pathogens.', fact: 'Lysosomal storage diseases, such as Tay–Sachs, happen when one of these enzymes is missing.' },
  perox: { name: 'Peroxisome', icon: '🟢', size: '0.1–1 µm', text: 'Oxidises very-long-chain fatty acids and breaks down hydrogen peroxide with catalase. Many show a crystalline core of urate oxidase.', fact: 'Peroxisomes import fully folded proteins using a C-terminal SKL signal.' },
  ribo: { name: 'Ribosomes & polysomes', icon: '🔵', size: '~25 nm', text: 'Two subunits of rRNA and protein translate mRNA. Several ribosomes reading one mRNA form a polysome, often seen as spirals.', fact: 'The ribosome is a ribozyme: rRNA, not protein, catalyses peptide bond formation.' },
  centrosome: { name: 'Centrosome', icon: '✳️', size: 'two centrioles ~0.5 µm long', text: 'The main microtubule-organising centre: two perpendicular centrioles in a cloud of pericentriolar material. It duplicates once per cell cycle to build the spindle.', fact: 'Each centriole is a cylinder of nine microtubule triplets.' },
  mt: { name: 'Microtubules', icon: '➖', size: '25 nm hollow tubes', text: 'Polymers of tubulin radiating from the centrosome. Kinesin and dynein motors walk along them carrying vesicles and organelles.', fact: 'Kinesin takes 8 nm steps, using one ATP per step.' },
  membrane: { name: 'Plasma membrane', icon: '🧱', size: '~5 nm thick', text: 'A phospholipid bilayer with embedded proteins: hydrophilic heads face outward, hydrophobic tails face each other. Cholesterol tunes its fluidity.', fact: 'Membrane lipids swap places with their neighbours about 10 million times per second.' },
  glut: { name: 'GLUT transporter', icon: '🟨', size: '12 transmembrane helices', text: 'Carries glucose down its concentration gradient by facilitated diffusion, flipping between outward- and inward-facing shapes.', fact: 'GLUT4 sits in vesicles until insulin signals it to fuse with the membrane.' },
  aat: { name: 'Amino-acid transporter', icon: '🟪', size: '', text: 'Secondary active transport: couples amino-acid import to Na⁺ flowing into the cell.', fact: 'Cancer cells often over-express the glutamine transporter SLC1A5.' },
  ent: { name: 'Nucleoside transporter', icon: '🩷', size: '', text: 'Lets nucleosides cross the membrane so the cell can salvage them into nucleotides.', fact: 'Some antiviral and anticancer drugs enter cells through ENTs.' },
  receptor: { name: 'Receptor', icon: '📡', size: '', text: 'A transmembrane protein: the ligand binds outside, and a shape change inside starts a signalling cascade.', fact: 'About a third of all approved drugs target G-protein-coupled receptors.' },
  vesicle: { name: 'Transport vesicle', icon: '🫧', size: '50–100 nm', text: 'Membrane bubbles that carry cargo between the ER, Golgi and plasma membrane, pulled along microtubules by motor proteins.', fact: 'The 2013 Nobel Prize was awarded for discovering how vesicles find their targets.' },
};

// Achievements: each one gives +2% ATP and protein production, permanently.
CY.ACHIEVEMENTS = [
  { id: 'tx1', icon: '📜', name: 'Central dogma', desc: 'Transcribe your first gene.', done: (S) => S.stats.transcribed >= 1 },
  { id: 'tx25', icon: '📚', name: 'Prolific transcriber', desc: 'Transcribe 25 times in one cell.', done: (S) => S.stats.transcribed >= 25 },
  { id: 'tl25', icon: '🧶', name: 'Polypeptide factory', desc: 'Translate 25 times in one cell.', done: (S) => S.stats.translated >= 25 },
  { id: 'b10', icon: '🏗', name: 'Under construction', desc: 'Build 10 structures in one cell.', done: (S) => S.stats.built >= 10 },
  { id: 'm5', icon: '🔋', name: 'Powerhouse', desc: 'Have 5 mitochondria at once.', done: (S) => S.b.mito >= 5 },
  { id: 'atp1k', icon: '⚡', name: 'Kilojoule club', desc: 'Make 1,000 ATP in one cell.', done: (S) => S.stats.atp >= 1000 },
  { id: 'atp10k', icon: '🌩', name: 'Energy surplus', desc: 'Make 10,000 ATP in one cell.', done: (S) => S.stats.atp >= 10000 },
  { id: 'p10', icon: '★', name: 'Flawless', desc: 'Solve 10 puzzles perfectly (all time).', done: (S) => S.meta.totals.perfect >= 10 },
  { id: 'p50', icon: '🌟', name: 'Textbook cell', desc: 'Solve 50 puzzles perfectly (all time).', done: (S) => S.meta.totals.perfect >= 50 },
  { id: 'fast5', icon: '⏱', name: 'Quick study', desc: 'Earn 5 speed bonuses (all time).', done: (S) => (S.meta.totals.fast || 0) >= 5 },
  { id: 'rep10', icon: '🛠', name: 'Genome guardian', desc: 'Repair 20 lesions in one cell.', done: (S) => S.stats.repairs >= 20 },
  { id: 'vir25', icon: '🦠', name: 'Viral bouncer', desc: 'Destroy 25 viruses in one cell.', done: (S) => S.stats.viruses >= 25 },
  { id: 'sig10', icon: '📡', name: 'Good listener', desc: 'Relay 10 signals in one cell.', done: (S) => S.stats.signals >= 10 },
  { id: 'gold1', icon: '✨', name: 'Lucky find', desc: 'Catch a lucky vesicle.', done: (S) => (S.meta.totals.golden || 0) >= 1 },
  { id: 'gold10', icon: '💫', name: 'Fortune favours the cell', desc: 'Catch 10 lucky vesicles.', done: (S) => (S.meta.totals.golden || 0) >= 10 },
  { id: 'r1', icon: '🧬', name: 'Two of me', desc: 'Replicate once.', done: (S) => S.meta.reps >= 1 },
  { id: 'r5', icon: '🌱', name: 'Lineage', desc: 'Replicate 5 times.', done: (S) => S.meta.reps >= 5 },
  { id: 'r15', icon: '🌳', name: 'Dynasty', desc: 'Replicate 15 times.', done: (S) => S.meta.reps >= 15 },
  { id: 'epic', icon: '💜', name: 'Purple prose', desc: 'Equip an Epic allele.', done: (S) => S.meta.alleles.some((a) => a && a.r >= 3) },
  { id: 'leg', icon: '👑', name: 'Legendary genome', desc: 'Equip a Legendary allele.', done: (S) => S.meta.alleles.some((a) => a && a.r >= 4) },
  { id: 'q10', icon: '🧠', name: 'Student', desc: 'Finish 10 Cell School rounds.', done: (S) => S.meta.quiz.stats.rounds >= 10 },
  { id: 'q100', icon: '🎓', name: 'Scholar', desc: 'Answer 100 questions correctly.', done: (S) => S.meta.quiz.stats.correct >= 100 },
  { id: 'streak10', icon: '🔥', name: 'On fire', desc: 'Reach a 10-answer streak.', done: (S) => S.meta.quiz.stats.bestStreak >= 10 },
  { id: 'learn1', icon: '✅', name: 'Committed to memory', desc: 'Fully learn a Cell School item.', done: (S) => Object.values(S.meta.quiz.items).some((r) => r.learned) },
  { id: 'gene', icon: '⚙️', name: 'Autopilot', desc: 'Own 5 levels of automation genes.', done: (S) => CY.GENES.filter((g) => g.auto).reduce((a, g) => a + (S.meta.genes[g.id] || 0), 0) >= 5 },
  { id: 'zoom', icon: '🔍', name: 'Electron microscope', desc: 'Zoom in to 1600× magnification.', done: (S) => (S.meta.maxZoom || 1) >= 4 },
  { id: 'fluo', icon: '🔦', name: 'Immunofluorescence', desc: 'View your cell in fluorescence mode.', done: (S) => !!S.meta.seenFluo },
  { id: 'inspect', icon: '🔬', name: 'Naturalist', desc: 'Inspect 8 different structures.', done: (S) => Object.keys(S.meta.inspected || {}).length >= 8 },
];
