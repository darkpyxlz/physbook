/* Cytos — drag-and-drop biology puzzles.
   Each puzzle is a list of stages: an SVG diagram with drop slots and a tray of pieces (some are distractors).
   Pieces can be dragged (mouse/touch) or tapped then a slot tapped. */
'use strict';
(function () {
  const CY = window.CY;
  const W = 600, H = 280;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  /* ---------------- SVG helpers ---------------- */
  function duplex(x1, x2, y1, y2, c1 = '#3b5fb8', c2 = '#d0467a') {
    let s = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="${c1}" stroke-width="4" stroke-linecap="round"/>`;
    s += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>`;
    for (let x = x1 + 6; x < x2; x += 12) s += `<line x1="${x}" y1="${y1 + 3}" x2="${x}" y2="${y2 - 3}" stroke="#b9c3da" stroke-width="2"/>`;
    return s;
  }
  const txt = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 12}" fill="${o.fill || '#66708a'}" text-anchor="${o.anchor || 'middle'}" font-weight="${o.bold ? 650 : 400}" font-family="system-ui, sans-serif">${t}</text>`;
  const arrow = (x1, y1, x2, y2, c = '#9aa3b8') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" marker-end="url(#ah)"/>`;
  const DEFS = `<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#9aa3b8"/></marker></defs>`;

  /* ---------------- shared data ---------------- */
  const CODONS = { AUG: 'Met', UUU: 'Phe', UUC: 'Phe', GGC: 'Gly', GCU: 'Ala', AAA: 'Lys', GAA: 'Glu', UGG: 'Trp', CAU: 'His', UCU: 'Ser',
    CCG: 'Pro', GUU: 'Val', ACU: 'Thr', CGU: 'Arg', GAU: 'Asp', UAU: 'Tyr', UGU: 'Cys', CAA: 'Gln', AAU: 'Asn', CUG: 'Leu', AUU: 'Ile' };
  const STOPS = ['UAA', 'UAG', 'UGA'];
  const RNA_PAIR = { A: 'U', U: 'A', G: 'C', C: 'G' };
  const DNA_TO_RNA = { A: 'U', T: 'A', G: 'C', C: 'G' };
  const DNA_PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
  const BASE_COL = { A: '#2f8f5b', T: '#c2413b', U: '#c98a10', G: '#3b5fb8', C: '#8a45c2' };
  const anticodon = (codon) => codon.split('').map((b) => RNA_PAIR[b]).join('');
  CY.CODONS = CODONS; CY.STOPS = STOPS;

  const COMPARTMENTS = {
    nucleus: { name: 'Nucleus', icon: '🟣' },
    er: { name: 'ER & Golgi', icon: '〰️' },
    mito: { name: 'Mitochondrion', icon: '🔴' },
    perox: { name: 'Peroxisome', icon: '🟢' },
    lyso: { name: 'Lysosome', icon: '🟤' },
    cyto: { name: 'Cytosol', icon: '💧' },
    pm: { name: 'Plasma membrane', icon: '🧱' },
  };
  const SIGNALS = {
    nucleus: { sig: 'Nuclear localisation signal (PKKKRKV)', prot: ['Histone H2B', 'Transcription factor Sp1', 'Lamin A', 'DNA polymerase δ'] },
    er: { sig: 'N-terminal signal peptide + C-terminal KDEL', prot: ['BiP chaperone', 'Protein disulfide isomerase', 'Calreticulin'] },
    mito: { sig: 'N-terminal amphipathic helix (MTS)', prot: ['ATP synthase β', 'Citrate synthase', 'Cytochrome c oxidase IV'] },
    perox: { sig: 'C-terminal SKL tripeptide (PTS1)', prot: ['Catalase', 'Urate oxidase', 'Acyl-CoA oxidase'] },
    lyso: { sig: 'Signal peptide; tagged with mannose-6-phosphate in the Golgi', prot: ['Cathepsin D', 'β-Hexosaminidase', 'Acid lipase'] },
    cyto: { sig: 'No targeting signal at all', prot: ['Hexokinase', 'Actin', 'GAPDH'] },
    pm: { sig: 'Signal peptide + transmembrane helices', prot: ['EGF receptor', 'Na⁺/K⁺-ATPase', 'Aquaporin'] },
  };
  const STRUCT_PROTEIN = {
    glut: ['pm', 'GLUT1 transporter'], aat: ['pm', 'SLC1A5 amino-acid transporter'], ent: ['pm', 'ENT1 nucleoside transporter'],
    ribo: ['nucleus', 'Ribosomal protein L7 (assembled in the nucleolus)'], mito: ['mito', 'TOM40 import pore'], receptor: ['pm', 'Insulin receptor'],
    rer: ['er', 'Sec61 translocon'], golgi: ['er', 'Golgi mannosidase (signal anchor)'], perox: ['perox', 'Catalase'], lyso: ['lyso', 'Cathepsin D'],
  };

  CY.CASCADES = {
    insulin: { name: 'Insulin', color: '#c98a10', steps: ['Insulin receptor (RTK)', 'IRS-1', 'PI3-kinase', 'PIP₃', 'Akt (PKB)', 'GLUT4 vesicles fuse'], effect: 'Glycolysis ×2 for 90 s' },
    egf: { name: 'EGF', color: '#1f8a5b', steps: ['EGF receptor', 'Grb2 / SOS', 'Ras-GTP', 'Raf', 'MEK', 'ERK'], effect: 'Protein yield ×1.5 for 90 s' },
    adrenaline: { name: 'Adrenaline', color: '#d4831c', steps: ['β-adrenergic receptor (GPCR)', 'Gαs-GTP', 'Adenylyl cyclase', 'cAMP', 'Protein kinase A'], effect: '+40 ATP from glycogen and +30 s respiration' },
    ifn: { name: 'Interferon', color: '#c2413b', steps: ['Interferon receptor', 'JAK kinases', 'STAT phosphorylated', 'STAT dimer enters nucleus', 'Antiviral genes on'], effect: 'Viruses cannot enter for 90 s' },
  };

  CY.LESIONS = {
    ox: { name: '8-oxoguanine', desc: 'An oxidised guanine base (from ROS)', fix: 'ber', color: '#d4831c' },
    uv: { name: 'Thymine dimer', desc: 'Two thymines cross-linked by UV light — the helix is distorted', fix: 'ner', color: '#8a45c2' },
    mm: { name: 'Mismatch', desc: 'G paired with T right after replication', fix: 'mmr', color: '#3b5fb8' },
    dsb: { name: 'Double-strand break (S/G2)', desc: 'Both strands cut; a sister chromatid is available as a template', fix: 'hr', color: '#c2413b' },
    dsb1: { name: 'Double-strand break (G1)', desc: 'Both strands cut; no sister chromatid exists yet', fix: 'nhej', color: '#c2413b' },
  };
  const REPAIR = {
    ber: { label: 'Base excision repair', explain: 'BER: a glycosylase removes one damaged base.' },
    ner: { label: 'Nucleotide excision repair', explain: 'NER cuts out a ~30-nucleotide patch around bulky, helix-distorting lesions.' },
    mmr: { label: 'Mismatch repair', explain: 'MMR fixes mispaired bases left by DNA polymerase.' },
    hr: { label: 'Homologous recombination', explain: 'HR copies from the sister chromatid — accurate, but needs S/G2.' },
    nhej: { label: 'Non-homologous end joining', explain: 'NHEJ glues broken ends directly — quick and error-prone, used in G1.' },
    photolyase: { label: 'Photolyase', explain: 'Photolyase reverses thymine dimers using light — but placental mammals like us lost this enzyme!' },
  };

  /* ---------------- puzzle builders ---------------- */
  const P = {};

  P.transcribe = () => {
    const tmpl = Array.from({ length: 6 }, () => pick(['A', 'T', 'G', 'C']));
    const s1 = {
      prompt: 'Initiation: assemble the transcription machinery on the promoter.',
      svg: DEFS + `<rect x="60" y="112" width="170" height="56" rx="8" fill="#fff5d6"/><rect x="230" y="112" width="270" height="56" rx="8" fill="#e3f6f3"/><rect x="500" y="112" width="70" height="56" rx="8" fill="#fde4e4"/>` +
        duplex(30, 570, 125, 155) + `<rect x="95" y="118" width="60" height="44" rx="6" fill="none" stroke="#c98a10" stroke-width="2" stroke-dasharray="4 3"/>` +
        txt(125, 190, 'TATA box', { fill: '#a1701a', bold: true }) + txt(145, 210, 'Promoter') + txt(365, 190, 'Gene (coding region) →') + txt(535, 190, 'Terminator') +
        txt(30, 118, '5′', { anchor: 'start' }) + txt(30, 175, '3′', { anchor: 'start' }) + arrow(240, 240, 360, 240) + txt(300, 262, 'direction of transcription'),
      slots: [
        { x: 60, y: 30, w: 135, h: 58, accept: ['tfiid'], hint: 'Binds the TATA box first' },
        { x: 215, y: 30, w: 150, h: 58, accept: ['rnap'], hint: 'Reads the template and builds RNA' },
      ],
      pieces: [
        { id: 'tfiid', label: 'TFIID', sub: 'TATA-binding protein', explain: 'TFIID recognises the TATA box and recruits the rest of the machinery.' },
        { id: 'rnap', label: 'RNA polymerase II', sub: 'makes mRNA', explain: 'RNA polymerase II transcribes protein-coding genes in eukaryotes.' },
        { id: 'dnap', label: 'DNA polymerase', sub: 'copies DNA', explain: 'DNA polymerase copies DNA during replication, not transcription.' },
        { id: 'ribo', label: 'Ribosome', sub: 'reads mRNA', explain: 'Ribosomes translate mRNA in the cytoplasm — they do not transcribe.' },
      ],
    };
    const s2 = {
      prompt: 'Elongation: build the mRNA by pairing RNA nucleotides with the template strand. (RNA uses U instead of T!)',
      svg: DEFS + txt(40, 72, '3′', { bold: true }) + txt(560, 72, '5′', { bold: true }) + txt(300, 30, 'DNA template strand', { bold: true }) +
        tmpl.map((b, i) => `<rect x="${92 + i * 72}" y="45" width="56" height="44" rx="8" fill="${BASE_COL[b]}22" stroke="${BASE_COL[b]}" stroke-width="2"/>` + txt(120 + i * 72, 74, b, { size: 20, bold: true, fill: BASE_COL[b] }) +
          `<line x1="${120 + i * 72}" y1="92" x2="${120 + i * 72}" y2="140" stroke="#c9d1e3" stroke-width="2" stroke-dasharray="3 3"/>`).join('') +
        txt(40, 178, '5′', { bold: true }) + txt(560, 178, '3′', { bold: true }) + txt(300, 240, 'new mRNA (grows 5′ → 3′)', { bold: true }),
      slots: tmpl.map((b, i) => ({ x: 92 + i * 72, y: 148, w: 56, h: 52, accept: ['nt-' + DNA_TO_RNA[b]], hint: 'pairs with ' + b })),
      pieces: [...tmpl.map((b) => DNA_TO_RNA[b]), 'T', pick(['A', 'G', 'C', 'U'])].map((n) => ({ id: 'nt-' + n, label: n, base: n,
        explain: n === 'T' ? 'Thymine is only found in DNA. In RNA, uracil (U) pairs with adenine.' : `RNA base ${n} pairs with DNA base ${{ U: 'A', A: 'T', G: 'C', C: 'G' }[n]}.` })),
    };
    const s3 = {
      prompt: 'Processing: turn the pre-mRNA into mature mRNA before it leaves the nucleus.',
      svg: DEFS + `<line x1="110" y1="140" x2="500" y2="140" stroke="#d4831c" stroke-width="4"/>` +
        `<rect x="130" y="124" width="120" height="32" rx="6" fill="#d4831c"/><rect x="370" y="124" width="120" height="32" rx="6" fill="#d4831c"/>` +
        `<path d="M250,140 Q310,100 370,140" stroke="#b9c3da" stroke-width="4" fill="none" stroke-dasharray="6 4"/>` +
        txt(190, 145, 'Exon 1', { fill: '#fff', bold: true }) + txt(430, 145, 'Exon 2', { fill: '#fff', bold: true }) + txt(310, 175, 'Intron', { bold: true }) +
        txt(110, 125, '5′', { bold: true }) + txt(500, 125, '3′', { bold: true }) + txt(300, 255, 'Only mature mRNA is exported through the nuclear pores'),
      slots: [
        { x: 10, y: 112, w: 92, h: 58, accept: ['cap'], hint: 'Protects the 5′ end' },
        { x: 255, y: 30, w: 110, h: 58, accept: ['splice'], hint: 'Removes the intron' },
        { x: 508, y: 112, w: 86, h: 58, accept: ['polya'], hint: 'Protects the 3′ end' },
      ],
      pieces: [
        { id: 'cap', label: '5′ cap', sub: '7-methylguanosine', explain: 'The 5′ cap is a modified G added to the start of the mRNA.' },
        { id: 'polya', label: 'Poly-A tail', sub: '~200 adenines', explain: 'The poly-A tail is added to the 3′ end and protects the mRNA from decay.' },
        { id: 'splice', label: 'Spliceosome', sub: 'snRNPs', explain: 'The spliceosome cuts out introns and joins exons.' },
        { id: 'sd', label: 'Shine–Dalgarno', sub: 'sequence', explain: 'Shine–Dalgarno is a ribosome-binding site in bacterial mRNA, not a eukaryotic processing step.' },
      ],
    };
    return { id: 'transcribe', icon: '📜', title: 'Transcription', stages: [s1, s2, s3],
      fact: 'In eukaryotes, transcription happens in the nucleus. The pre-mRNA is capped, spliced and polyadenylated, then exported through nuclear pores to the ribosomes.' };
  };

  P.translate = () => {
    const sense = shuffle(Object.keys(CODONS).filter((c) => c !== 'AUG')).slice(0, 3);
    const codons = ['AUG', ...sense, pick(STOPS)];
    const decoys = shuffle(Object.keys(CODONS).filter((c) => !codons.includes(c) && !codons.map(anticodon).includes(anticodon(c)))).slice(0, 2);
    const s1 = {
      prompt: 'Match each tRNA to its codon. The anticodon pairs with the codon (A–U, G–C). The last codon is a stop codon.',
      svg: DEFS + `<ellipse cx="300" cy="150" rx="285" ry="118" fill="#eef2fb" stroke="#c9d1e3" stroke-width="2"/>` +
        `<line x1="20" y1="215" x2="580" y2="215" stroke="#d4831c" stroke-width="4"/>` + txt(18, 240, '5′', { bold: true, anchor: 'start' }) + txt(582, 240, '3′', { bold: true, anchor: 'end' }) +
        codons.map((c, i) => `<rect x="${60 + i * 100}" y="198" width="80" height="34" rx="6" fill="${i === 4 ? '#fde4e4' : '#fff5d6'}" stroke="${i === 4 ? '#c2413b' : '#d4831c'}" stroke-width="2"/>` +
          txt(100 + i * 100, 221, c.split('').join(' '), { size: 16, bold: true, fill: '#1b2335' }) + txt(100 + i * 100, 258, i === 0 ? 'start' : i === 4 ? 'stop' : 'codon ' + (i + 1), { size: 11 })).join('') +
        txt(300, 26, 'Ribosome', { bold: true }),
      slots: codons.map((c, i) => ({ x: 60 + i * 100, y: 92, w: 80, h: 92, accept: [i === 4 ? 'rf' : 'trna-' + anticodon(c)], hint: i === 4 ? 'stop' : '' })),
      pieces: [...codons.slice(0, 4), ...decoys].map((c) => ({ id: 'trna-' + anticodon(c), label: `3′-${anticodon(c)}-5′`, sub: 'tRNA · ' + CODONS[c],
        explain: `The anticodon ${anticodon(c)} pairs with codon ${c} (${CODONS[c]}).` }))
        .concat([{ id: 'rf', label: 'Release factor', sub: 'eRF1', explain: 'Stop codons are read by release factors, not tRNAs, which ends translation.' }]),
    };
    return { id: 'translate', icon: '🧶', title: 'Translation', stages: [s1],
      fact: `The ribosome read ${codons.join(' ')} → ${codons.slice(0, 4).map((c) => CODONS[c]).join('–')} then stop. A peptide bond formed between each amino acid.` };
  };

  P.respire = () => {
    const xs = [10, 94, 178, 262, 346, 430, 514];
    const s1 = {
      prompt: 'Assemble the electron transport chain on the inner mitochondrial membrane, in the order electrons and protons flow.',
      svg: DEFS + `<rect x="0" y="0" width="600" height="100" fill="#fff1ee"/><rect x="0" y="180" width="600" height="100" fill="#f3f0ff"/>` +
        `<rect x="0" y="108" width="600" height="64" fill="#ffe2c7"/><line x1="0" y1="108" x2="600" y2="108" stroke="#d4831c" stroke-width="3"/><line x1="0" y1="172" x2="600" y2="172" stroke="#d4831c" stroke-width="3"/>` +
        txt(300, 18, 'Intermembrane space (high H⁺)', { bold: true, fill: '#c2413b' }) + txt(300, 272, 'Matrix', { bold: true, fill: '#8a45c2' }) +
        txt(52, 258, 'NADH → NAD⁺') + txt(136, 258, 'FADH₂ → FAD') + txt(472, 258, 'O₂ → H₂O') + txt(556, 258, 'ADP → ATP') +
        arrow(80, 140, 300, 140, '#d4831c'),
      slots: [
        { x: xs[0], y: 102, w: 78, h: 76, accept: ['c1'], hint: 'Takes e⁻ from NADH, pumps H⁺' },
        { x: xs[1], y: 102, w: 78, h: 76, accept: ['c2'], hint: 'Takes e⁻ from FADH₂ (succinate)' },
        { x: xs[2], y: 102, w: 78, h: 76, accept: ['q'], hint: 'Mobile carrier inside the membrane' },
        { x: xs[3], y: 102, w: 78, h: 76, accept: ['c3'], hint: 'Passes e⁻ to a small protein, pumps H⁺' },
        { x: xs[4], y: 28, w: 78, h: 68, accept: ['cytc'], hint: 'Mobile carrier in the intermembrane space' },
        { x: xs[5], y: 102, w: 78, h: 76, accept: ['c4'], hint: 'Final step: reduces O₂ to H₂O' },
        { x: xs[6], y: 102, w: 78, h: 76, accept: ['atps'], hint: 'H⁺ flows back through it' },
      ],
      pieces: [
        { id: 'c1', label: 'Complex I', explain: 'Complex I (NADH dehydrogenase) takes electrons from NADH.' },
        { id: 'c2', label: 'Complex II', explain: 'Complex II (succinate dehydrogenase) is also a Krebs-cycle enzyme; it feeds in electrons from FADH₂.' },
        { id: 'q', label: 'Ubiquinone (Q)', explain: 'Ubiquinone is a lipid-soluble carrier that diffuses within the membrane.' },
        { id: 'c3', label: 'Complex III', explain: 'Complex III (cytochrome bc₁) passes electrons from QH₂ to cytochrome c.' },
        { id: 'cytc', label: 'Cytochrome c', explain: 'Cytochrome c is a small water-soluble protein in the intermembrane space.' },
        { id: 'c4', label: 'Complex IV', explain: 'Complex IV (cytochrome c oxidase) hands electrons to O₂, making water.' },
        { id: 'atps', label: 'ATP synthase', explain: 'ATP synthase is a rotary motor driven by H⁺ flowing back into the matrix.' },
        { id: 'ps2', label: 'Photosystem II', explain: 'Photosystem II is part of photosynthesis in chloroplasts, not respiration.' },
        { id: 'rubisco', label: 'Rubisco', explain: 'Rubisco fixes CO₂ in the Calvin cycle (chloroplasts).' },
      ],
    };
    const items = shuffle([
      ['Glycolysis', 'cyto'], ['Lactate fermentation', 'cyto'], ['Link reaction (pyruvate → acetyl-CoA)', 'matrix'],
      ['Krebs cycle', 'matrix'], ['β-oxidation of fatty acids', 'matrix'], ['Electron transport chain', 'imm'], ['Chemiosmosis (H⁺ gradient used)', 'imm'],
    ]).slice(0, 5);
    const s2 = {
      prompt: 'Where does each stage of respiration happen?',
      svg: `<rect x="8" y="8" width="186" height="264" rx="14" fill="#eaf6ff"/><rect x="207" y="8" width="186" height="264" rx="14" fill="#f3f0ff"/><rect x="406" y="8" width="186" height="264" rx="14" fill="#fff1e2"/>`,
      slots: [
        { x: 8, y: 8, w: 186, h: 264, accept: ['cyto'], multi: true, hint: 'Cytosol' },
        { x: 207, y: 8, w: 186, h: 264, accept: ['matrix'], multi: true, hint: 'Mitochondrial matrix' },
        { x: 406, y: 8, w: 186, h: 264, accept: ['imm'], multi: true, hint: 'Inner mitochondrial membrane' },
      ],
      pieces: items.map(([l, id]) => ({ id, label: l, explain: `${l} happens in the ${{ cyto: 'cytosol', matrix: 'mitochondrial matrix', imm: 'inner mitochondrial membrane' }[id]}.` })),
    };
    return { id: 'respire', icon: '🔋', title: 'Electron transport chain', stages: [s1, s2],
      fact: 'Electrons flow NADH → I → Q → III → cytochrome c → IV → O₂. The pumped H⁺ flow back through ATP synthase, making ~30 ATP per glucose in total.' };
  };

  P.target = (structId) => {
    const [dest, protName] = STRUCT_PROTEIN[structId] || ['pm', 'Membrane protein'];
    const others = shuffle(Object.keys(SIGNALS).filter((k) => k !== dest)).slice(0, 3);
    const pieces = [{ id: dest, label: SIGNALS[dest].sig, sub: protName, main: true }, ...others.map((k) => ({ id: k, label: SIGNALS[k].sig, sub: pick(SIGNALS[k].prot) }))]
      .map((p) => ({ ...p, explain: `"${p.label}" sends a protein to the ${COMPARTMENTS[p.id].name.toLowerCase()}.` }));
    const order = ['nucleus', 'er', 'mito', 'perox', 'lyso', 'cyto', 'pm'];
    const boxes = [[8, 8, 140, 128], [156, 8, 140, 128], [304, 8, 140, 128], [452, 8, 140, 128], [8, 144, 140, 128], [156, 144, 140, 128], [304, 144, 288, 128]];
    const fills = { nucleus: '#efe9ff', er: '#e6f0ff', mito: '#ffe9e4', perox: '#e5f6ea', lyso: '#f6ece2', cyto: '#eef6fb', pm: '#e6f4f1' };
    return { id: 'target', icon: '📮', title: 'Protein targeting', stages: [{
      prompt: 'New proteins carry "address labels". Send each one to the right place — the one you are building is marked ★.',
      svg: order.map((k, i) => `<rect x="${boxes[i][0]}" y="${boxes[i][1]}" width="${boxes[i][2]}" height="${boxes[i][3]}" rx="14" fill="${fills[k]}"/>`).join(''),
      slots: order.map((k, i) => ({ x: boxes[i][0], y: boxes[i][1], w: boxes[i][2], h: boxes[i][3], accept: [k], multi: true, hint: COMPARTMENTS[k].icon + ' ' + COMPARTMENTS[k].name })),
      pieces: pieces.map((p) => (p.main ? { ...p, sub: '★ ' + p.sub } : p)),
    }], fact: 'Proteins are sorted by short signal sequences. ER-bound proteins are recognised by SRP during translation; mitochondrial, nuclear and peroxisomal proteins are imported after translation.' };
  };

  P.signal = (type) => {
    const c = CY.CASCADES[type];
    const others = Object.entries(CY.CASCADES).filter(([k]) => k !== type).flatMap(([, v]) => v.steps.slice(1)).filter((s) => !c.steps.includes(s));
    const decoy = pick(others);
    const n = c.steps.length, w = 86, gap = (600 - n * w) / (n + 1);
    const xs = c.steps.map((_, i) => gap + i * (w + gap));
    return { id: 'signal', icon: '📡', title: c.name + ' signalling', stages: [{
      prompt: `${c.name} has bound a receptor. Put the cascade in order, from the receptor to the response.`,
      svg: DEFS + `<rect x="0" y="0" width="600" height="60" fill="#fff6e8"/><line x1="0" y1="60" x2="600" y2="60" stroke="#2f8f83" stroke-width="5"/>` +
        txt(300, 35, `Outside the cell: ${c.name}`, { bold: true, fill: c.color }) +
        xs.slice(0, -1).map((x, i) => arrow(x + w + 2, 160, xs[i + 1] - 4, 160)).join('') + txt(300, 260, 'Inside the cell →  response'),
      slots: c.steps.map((s, i) => ({ x: xs[i], y: 110, w, h: 100, accept: ['step' + i], hint: i === 0 ? '① at the membrane' : i === n - 1 ? 'response' : '' })),
      pieces: [...c.steps.map((s, i) => ({ id: 'step' + i, label: s, explain: `${s} is step ${i + 1} of the ${c.name} pathway.` })),
        { id: 'decoy', label: decoy, explain: `${decoy} belongs to a different pathway.` }],
    }], fact: `${c.name}: ${c.steps.join(' → ')}. Each step activates many copies of the next, so the signal is amplified.` };
  };

  P.repair = (lesionTypes) => {
    const types = lesionTypes.slice(0, 3);
    const n = types.length, w = 170, gap = (600 - n * w) / (n + 1);
    const need = types.map((t) => CY.LESIONS[t].fix);
    const extra = shuffle(Object.keys(REPAIR).filter((k) => !need.includes(k))).slice(0, 3);
    return { id: 'repair', icon: '🛠', title: 'DNA repair', stages: [{
      prompt: 'Your genome is damaged. Send the right repair pathway to each lesion.',
      svg: DEFS + duplex(10, 590, 200, 230) + types.map((t, i) => {
        const x = gap + i * (w + gap), L = CY.LESIONS[t];
        return `<rect x="${x}" y="10" width="${w}" height="84" rx="10" fill="${L.color}14" stroke="${L.color}" stroke-width="2"/>` +
          txt(x + w / 2, 32, L.name, { bold: true, fill: L.color, size: 13 }) + `<foreignObject x="${x + 6}" y="38" width="${w - 12}" height="54"><div xmlns="http://www.w3.org/1999/xhtml" style="font:11px system-ui;color:#66708a;text-align:center;line-height:1.2">${L.desc}</div></foreignObject>` +
          `<circle cx="${x + w / 2}" cy="215" r="10" fill="${L.color}"/>` + arrow(x + w / 2, 180, x + w / 2, 200);
      }).join(''),
      slots: types.map((t, i) => ({ x: gap + i * (w + gap), y: 102, w, h: 70, accept: [CY.LESIONS[t].fix], hint: 'repair pathway' })),
      pieces: [...need, ...extra].map((k) => ({ id: k, label: REPAIR[k].label, explain: REPAIR[k].explain })),
    }], fact: 'Different damage needs different tools: BER for single bases, NER for bulky lesions, MMR for replication errors, and HR or NHEJ for double-strand breaks.' };
  };

  P.replicate = () => {
    const tmpl = Array.from({ length: 6 }, () => pick(['A', 'T', 'G', 'C']));
    const lag = (x) => 155 + (x - 240) * 70 / 340;
    const s1 = {
      prompt: 'Open a replication fork: put each enzyme where it works.',
      svg: DEFS + duplex(20, 240, 125, 155) +
        `<line x1="240" y1="125" x2="580" y2="55" stroke="#3b5fb8" stroke-width="4"/><line x1="240" y1="155" x2="580" y2="225" stroke="#d0467a" stroke-width="4"/>` +
        `<line x1="262" y1="136" x2="560" y2="75" stroke="#2f8f5b" stroke-width="4"/>` +
        [[300, 380], [400, 480], [500, 560]].map(([a, b]) => `<line x1="${a}" y1="${lag(a) - 13}" x2="${b}" y2="${lag(b) - 13}" stroke="#2f8f5b" stroke-width="4"/><line x1="${b - 12}" y1="${lag(b - 12) - 13}" x2="${b}" y2="${lag(b) - 13}" stroke="#c2413b" stroke-width="5"/>`).join('') +
        txt(530, 40, 'leading strand', { fill: '#2f8f5b', bold: true }) + txt(110, 196, 'lagging strand:', { fill: '#2f8f5b', bold: true }) + txt(110, 212, 'Okazaki fragments', { fill: '#2f8f5b' }) +
        arrow(200, 260, 80, 260) + txt(140, 250, 'fork moves'),
      slots: [
        { x: 20, y: 50, w: 120, h: 52, accept: ['topo'], hint: 'Relieves supercoiling ahead of the fork' },
        { x: 175, y: 112, w: 100, h: 56, accept: ['helicase'], hint: 'Unwinds the double helix' },
        { x: 350, y: 40, w: 120, h: 52, accept: ['pol'], hint: 'Extends new DNA 5′→3′' },
        { x: 225, y: 186, w: 100, h: 46, accept: ['ssb'], hint: 'Coats the single strands' },
        { x: 335, y: 210, w: 100, h: 46, accept: ['primase'], hint: 'Makes short RNA primers' },
        { x: 455, y: 228, w: 120, h: 44, accept: ['ligase'], hint: 'Seals the gaps between fragments' },
      ],
      pieces: [
        { id: 'topo', label: 'Topoisomerase', explain: 'Topoisomerase cuts and rejoins DNA to relieve the overwinding ahead of the fork.' },
        { id: 'helicase', label: 'Helicase', explain: 'Helicase unzips the two strands, breaking hydrogen bonds between bases.' },
        { id: 'pol', label: 'DNA polymerase', explain: 'DNA polymerase adds nucleotides to a 3′ end — it can only build 5′→3′.' },
        { id: 'ssb', label: 'SSB proteins', explain: 'Single-strand binding proteins stop the strands re-annealing.' },
        { id: 'primase', label: 'Primase', explain: 'Primase makes RNA primers because DNA polymerase cannot start a strand from scratch.' },
        { id: 'ligase', label: 'DNA ligase', explain: 'Ligase joins Okazaki fragments with a phosphodiester bond.' },
        { id: 'rnap', label: 'RNA polymerase II', explain: 'RNA polymerase II transcribes genes; it does not replicate DNA.' },
        { id: 'rt', label: 'Reverse transcriptase', explain: 'Reverse transcriptase (from retroviruses) copies RNA into DNA.' },
      ],
    };
    const s2 = {
      prompt: 'Copy the template: pair each DNA nucleotide (A–T, G–C).',
      svg: DEFS + txt(40, 72, '3′', { bold: true }) + txt(560, 72, '5′', { bold: true }) + txt(300, 30, 'Template strand', { bold: true }) +
        tmpl.map((b, i) => `<rect x="${92 + i * 72}" y="45" width="56" height="44" rx="8" fill="${BASE_COL[b]}22" stroke="${BASE_COL[b]}" stroke-width="2"/>` + txt(120 + i * 72, 74, b, { size: 20, bold: true, fill: BASE_COL[b] })).join('') +
        txt(40, 178, '5′', { bold: true }) + txt(560, 178, '3′', { bold: true }) + txt(300, 240, 'new strand', { bold: true }),
      slots: tmpl.map((b, i) => ({ x: 92 + i * 72, y: 148, w: 56, h: 52, accept: ['nt-' + DNA_PAIR[b]], hint: '' })),
      pieces: [...tmpl.map((b) => DNA_PAIR[b]), 'U', pick(['A', 'T', 'G', 'C'])].map((n) => ({ id: 'nt-' + n, label: n, base: n,
        explain: n === 'U' ? 'Uracil belongs in RNA. DNA uses thymine.' : `In DNA, ${n} pairs with ${DNA_PAIR[n]}.` })),
    };
    return { id: 'replicate', icon: '🧬', title: 'DNA replication', stages: [s1, s2],
      fact: 'Replication is semi-conservative: each new double helix has one old strand and one new one. The lagging strand is made in Okazaki fragments because polymerase only builds 5′→3′.' };
  };

  const MITO_PICS = {
    pro: '<circle cx="30" cy="22" r="18" fill="none" stroke="#9aa3b8" stroke-dasharray="3 3"/><path d="M20,15 l8,10 M28,15 l-8,10 M34,14 l8,10 M42,14 l-8,10" stroke="#3b5fb8" stroke-width="3"/>',
    meta: '<line x1="30" y1="2" x2="30" y2="42" stroke="#c9d1e3" stroke-dasharray="2 2"/><path d="M26,8 l8,6 M34,8 l-8,6 M26,19 l8,6 M34,19 l-8,6 M26,30 l8,6 M34,30 l-8,6" stroke="#3b5fb8" stroke-width="3"/><line x1="2" y1="22" x2="24" y2="22" stroke="#9aa3b8"/><line x1="36" y1="22" x2="58" y2="22" stroke="#9aa3b8"/>',
    ana: '<path d="M12,10 l6,4 M12,22 l6,4 M12,34 l6,4 M48,10 l-6,4 M48,22 l-6,4 M48,34 l-6,4" stroke="#3b5fb8" stroke-width="3"/><path d="M22,22 h-14 M38,22 h14" stroke="#9aa3b8"/>',
    telo: '<circle cx="14" cy="22" r="12" fill="none" stroke="#9aa3b8"/><circle cx="46" cy="22" r="12" fill="none" stroke="#9aa3b8"/><path d="M9,18 q5,6 10,0 M41,18 q5,6 10,0" stroke="#3b5fb8" stroke-width="2" fill="none"/>',
    cyto: '<path d="M4,22 q12,-20 26,-4 q14,-16 26,4 q-12,20 -26,4 q-14,16 -26,-4z" fill="#e3f6f3" stroke="#2f8f83"/>',
    meio: '<path d="M18,10 q6,12 0,24 M24,10 q-6,12 0,24 M36,10 q6,12 0,24 M42,10 q-6,12 0,24" stroke="#d0467a" stroke-width="3" fill="none"/>',
  };
  P.mitosis = () => {
    const phases = [['pro', 'Prophase', 'Chromosomes condense; the spindle starts to form'], ['meta', 'Metaphase', 'Chromosomes line up at the cell’s equator'],
      ['ana', 'Anaphase', 'Sister chromatids are pulled to opposite poles'], ['telo', 'Telophase', 'Nuclear envelopes re-form around each set'], ['cyto', 'Cytokinesis', 'A cleavage furrow pinches the cell in two']];
    const w = 106, gap = (600 - 5 * w) / 6;
    return { id: 'mitosis', icon: '🔀', title: 'Mitosis', stages: [{
      prompt: 'Divide! Match each description to its stage of mitosis.',
      svg: DEFS + phases.slice(0, -1).map((_, i) => arrow(gap + i * (w + gap) + w + 1, 150, gap + (i + 1) * (w + gap) - 3, 150)).join('') +
        phases.map((p, i) => txt(gap + i * (w + gap) + w / 2, 70, p[1], { bold: true, fill: '#1b2335', size: 14 })).join('') + txt(300, 30, 'Order of events', { bold: true }),
      slots: phases.map((p, i) => ({ x: gap + i * (w + gap), y: 85, w, h: 130, accept: [p[0]], hint: '' })),
      pieces: [...phases.map((p) => ({ id: p[0], label: p[2], pic: MITO_PICS[p[0]], explain: `"${p[2]}" — that is ${p[1].toLowerCase()}.` })),
        { id: 'meio', label: 'Homologous chromosomes pair and cross over', pic: MITO_PICS.meio, explain: 'Crossing over between homologous chromosomes happens in meiosis I, not mitosis.' }],
    }], fact: 'Mitosis makes two genetically identical daughter cells: prophase → metaphase → anaphase → telophase, followed by cytokinesis.' };
  };

  CY.PUZZLES = P;
  CY.TARGET = { SIGNALS, COMPARTMENTS };
  CY.REPAIR = REPAIR;

  /* =====================================================================
     ENGINE
     ===================================================================== */
  let cur = null;
  const root = () => document.getElementById('puzzle');

  CY.openPuzzle = function (def, onDone, onCancel) {
    cur = { def, stage: 0, mistakes: 0, hints: 0, onDone, onCancel, sel: null, t0: performance.now() };
    root().hidden = false;
    renderStage();
  };
  CY.puzzleOpen = () => !!cur;

  function renderStage() {
    const { def } = cur;
    const st = def.stages[cur.stage];
    st.slots.forEach((s, i) => { s.i = i; s.filled = []; s.need = s.multi ? st.pieces.filter((p) => s.accept.includes(p.id)).length : 1; });
    cur.pieces = shuffle(st.pieces.map((p, k) => ({ ...p, key: k })));
    const pct = (v, t) => (100 * v / t) + '%';
    root().innerHTML = `<div class="pz-card">
      <div class="pz-head"><h2>${def.icon} ${esc(def.title)}</h2>
        <span class="tag">${def.stages.length > 1 ? `Step ${cur.stage + 1} / ${def.stages.length}` : 'Puzzle'}</span>
        <span class="spacer"></span><button class="btn sm" data-pz="cancel">✕ Cancel</button></div>
      <p class="pz-prompt">${esc(st.prompt)}</p>
      <div class="pz-board"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${st.svg}</svg>
        ${st.slots.map((s) => `<div class="slot ${s.multi ? 'multi' : ''}" data-slot="${s.i}" style="left:${pct(s.x, W)};top:${pct(s.y, H)};width:${pct(s.w, W)};height:${pct(s.h, H)}"><span class="slot-hint">${esc(s.hint || '')}</span><div class="slot-items"></div></div>`).join('')}
      </div>
      <div class="pz-tray" id="pz-tray">${cur.pieces.map(pieceHTML).join('')}</div>
      <div class="pz-foot"><span id="pz-feedback" class="muted">Drag a piece onto the diagram (or tap a piece, then tap a spot).</span><span class="spacer"></span>
        <span class="tag" id="pz-mist">Mistakes: ${cur.mistakes}</span><button class="btn sm" data-pz="hint">💡 Hint</button></div>
    </div>`;
  }
  function pieceHTML(p) {
    const base = p.base ? `style="--pc:${BASE_COL[p.base]}"` : '';
    return `<div class="piece ${p.base ? 'base' : ''} ${p.pic ? 'pic' : ''}" data-key="${p.key}" ${base}>
      ${p.pic ? `<svg viewBox="0 0 60 44" class="pc-pic">${p.pic}</svg>` : ''}<span class="pc-l">${esc(p.label)}</span>${p.sub ? `<span class="pc-s">${esc(p.sub)}</span>` : ''}</div>`;
  }
  function feedback(msg, cls = '') { const el = document.getElementById('pz-feedback'); if (el) { el.textContent = msg; el.className = cls; } }

  function tryPlace(key, slotIdx) {
    const st = cur.def.stages[cur.stage];
    const p = cur.pieces.find((x) => x.key === key && !x.placed);
    const s = st.slots[slotIdx];
    if (!p || !s) return;
    const slotEl = root().querySelector(`[data-slot="${slotIdx}"]`);
    const pEl = root().querySelector(`[data-key="${key}"]`);
    if (s.accept.includes(p.id) && s.filled.length < s.need) {
      p.placed = true; s.filled.push(p);
      pEl.remove();
      const chip = document.createElement('div');
      chip.className = 'placed' + (p.base ? ' base' : '');
      if (p.base) chip.style.setProperty('--pc', BASE_COL[p.base]);
      chip.innerHTML = (p.pic ? `<svg viewBox="0 0 60 44" class="pc-pic">${p.pic}</svg>` : '') + `<b>${esc(p.label)}</b>`;
      slotEl.querySelector('.slot-items').appendChild(chip);
      if (s.filled.length >= s.need) slotEl.classList.add('done');
      slotEl.classList.add('ok-flash'); setTimeout(() => slotEl.classList.remove('ok-flash'), 400);
      feedback('✔ ' + (p.explain || 'Correct!'), 'c-good');
      CY.sfx && CY.sfx('good');
      if (st.slots.every((x) => x.filled.length >= x.need)) { const c0 = cur, s0 = cur.stage; setTimeout(() => { if (cur === c0 && cur.stage === s0) nextStage(); }, 650); }
    } else {
      cur.mistakes++;
      document.getElementById('pz-mist').textContent = 'Mistakes: ' + cur.mistakes;
      slotEl.classList.add('bad-flash'); setTimeout(() => slotEl.classList.remove('bad-flash'), 450);
      pEl && pEl.classList.add('shake'); setTimeout(() => pEl && pEl.classList.remove('shake'), 450);
      feedback('✖ ' + (p.explain || 'That does not go there.'), 'c-bad');
      CY.sfx && CY.sfx('bad');
    }
  }
  function nextStage() {
    if (!cur) return;
    cur.stage++;
    if (cur.stage < cur.def.stages.length) { renderStage(); return; }
    const perfect = cur.mistakes === 0 && cur.hints === 0;
    const secs = (performance.now() - cur.t0) / 1000, par = cur.def.par || cur.def.stages.length * 15;
    const fast = perfect && secs <= par;
    const res = { mistakes: cur.mistakes, hints: cur.hints, perfect, fast, secs };
    CY.sfx && CY.sfx(perfect ? 'done' : 'good');
    root().innerHTML = `<div class="pz-card done-card"><h2>${cur.def.icon} ${esc(cur.def.title)} complete!</h2>
      <div class="big-result ${perfect ? 'c-good' : ''}">${fast ? `⚡ Perfect &amp; speedy (${Math.round(secs)} s) — big bonus!` : perfect ? '★ Perfect — bonus yield!' : `${cur.mistakes} mistake${cur.mistakes === 1 ? '' : 's'}${cur.hints ? `, ${cur.hints} hint${cur.hints > 1 ? 's' : ''}` : ''}`}</div>
      <div class="muted">${Math.round(secs)} s${perfect && !fast ? ` · finish within ${par} s for a speed bonus` : ''}</div>
      <p class="fact">🔬 ${esc(cur.def.fact || '')}</p>
      <div class="row center-row"><button class="btn primary" data-pz="collect">Collect</button></div></div>`;
    cur.result = res;
  }
  function close() { root().hidden = true; root().innerHTML = ''; cur = null; }

  /* ---------- input ---------- */
  let drag = null;
  document.addEventListener('pointerdown', (ev) => {
    if (!cur) return;
    const pEl = ev.target.closest('.piece');
    if (!pEl || !root().contains(pEl)) return;
    ev.preventDefault();
    const r = pEl.getBoundingClientRect();
    drag = { key: +pEl.dataset.key, el: pEl, sx: ev.clientX, sy: ev.clientY, ox: ev.clientX - r.left, oy: ev.clientY - r.top, ghost: null, moved: false };
  });
  document.addEventListener('pointermove', (ev) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(ev.clientX - drag.sx, ev.clientY - drag.sy) > 6) {
      drag.moved = true;
      drag.ghost = drag.el.cloneNode(true);
      drag.ghost.classList.add('ghost');
      drag.ghost.style.width = drag.el.offsetWidth + 'px';
      document.body.appendChild(drag.ghost);
      drag.el.classList.add('dragging');
    }
    if (drag.ghost) {
      drag.ghost.style.left = ev.clientX - drag.ox + 'px';
      drag.ghost.style.top = ev.clientY - drag.oy + 'px';
      root().querySelectorAll('.slot.hover').forEach((s) => s.classList.remove('hover'));
      const s = slotAt(ev.clientX, ev.clientY);
      if (s) s.classList.add('hover');
    }
  });
  document.addEventListener('pointerup', (ev) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.ghost) {
      d.ghost.remove(); d.el.classList.remove('dragging');
      root().querySelectorAll('.slot.hover').forEach((s) => s.classList.remove('hover'));
      const s = slotAt(ev.clientX, ev.clientY);
      if (s) tryPlace(d.key, +s.dataset.slot);
    } else {
      // tap to select
      root().querySelectorAll('.piece.sel').forEach((x) => x.classList.remove('sel'));
      if (cur.sel === d.key) cur.sel = null; else { cur.sel = d.key; d.el.classList.add('sel'); }
    }
  });
  function slotAt(x, y) {
    const els = document.elementsFromPoint(x, y);
    for (const e of els) { const s = e.closest && e.closest('.slot'); if (s && root().contains(s)) return s; }
    return null;
  }
  document.addEventListener('click', (ev) => {
    if (!cur) return;
    const b = ev.target.closest('[data-pz]');
    if (b) {
      const a = b.dataset.pz;
      if (a === 'cancel') { const cb = cur.onCancel; close(); cb && cb(); }
      else if (a === 'collect') { const cb = cur.onDone, r = cur.result; close(); cb && cb(r); }
      else if (a === 'hint') giveHint();
      return;
    }
    const s = ev.target.closest('.slot');
    if (s && cur.sel != null && root().contains(s)) { const k = cur.sel; cur.sel = null; tryPlace(k, +s.dataset.slot); }
  });
  function giveHint() {
    const st = cur.def.stages[cur.stage];
    const s = st.slots.find((x) => x.filled.length < x.need);
    if (!s) return;
    const p = cur.pieces.find((x) => !x.placed && s.accept.includes(x.id));
    if (!p) return;
    cur.hints++;
    const pEl = root().querySelector(`[data-key="${p.key}"]`), sEl = root().querySelector(`[data-slot="${s.i}"]`);
    pEl.classList.add('hinted'); sEl.classList.add('hinted');
    setTimeout(() => { pEl.classList.remove('hinted'); sEl.classList.remove('hinted'); }, 2200);
    feedback(`💡 "${p.label}" goes in the highlighted spot. (Hints cost the perfect bonus.)`, 'c-warn');
  }

  // test hook: auto-solve the open puzzle (used by automated tests only)
  CY._solvePuzzle = function (mistakes = 0) {
    if (!cur) return null;
    while (cur && cur.stage < cur.def.stages.length) {
      const st = cur.def.stages[cur.stage];
      for (const s of st.slots) {
        while (s.filled.length < s.need) {
          const p = cur.pieces.find((x) => !x.placed && s.accept.includes(x.id));
          if (!p) break;
          tryPlace(p.key, s.i);
        }
      }
      if (cur.stage < cur.def.stages.length) nextStage();
    }
    cur.mistakes += mistakes;
    cur.result.mistakes = cur.mistakes; cur.result.perfect = cur.mistakes === 0; cur.result.fast = false;
    const cb = cur.onDone, r = cur.result; close(); cb && cb(r);
    return r;
  };
})();
