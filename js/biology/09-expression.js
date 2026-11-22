(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-expression', subject: 'biology', num: 9, part: 'Genetics',
    title: 'Gene Expression',
    subtitle: R`From gene to protein. Transcription, RNA processing, the genetic code and translation, mutations and their effects, and how genes are switched on and off.`,
    goals: ['Describe transcription and RNA processing', 'Use the genetic code to translate mRNA', 'Classify mutations by their effect on the protein', 'Explain the lac operon', 'Describe eukaryotic gene regulation and epigenetics'],
    sections: [
      {
        title: 'Transcription',
        html: R`
<p>The <strong>central dogma</strong>: DNA is transcribed into RNA, which is translated into protein. <strong>RNA polymerase</strong> binds a <strong>promoter</strong> upstream of a gene, unwinds the DNA and builds mRNA 5′→3′, complementary to the <strong>template strand</strong>. The mRNA therefore has the same sequence as the <strong>coding strand</strong>, with U for T.</p>
<p>In eukaryotes the primary transcript (pre-mRNA) is processed in the nucleus:</p>
<ul>
<li>a 5′ <strong>cap</strong> and a 3′ <strong>poly-A tail</strong> protect it and help export and translation;</li>
<li><strong>introns</strong> are removed by the spliceosome and <strong>exons</strong> joined. <strong>Alternative splicing</strong> lets about 20 000 human genes make well over 100 000 different proteins.</li>
</ul>`
      },
      {
        title: 'The genetic code and translation',
        html: R`
<p>The code is read in non-overlapping triplets, <strong>codons</strong>. With 4 bases there are $4^3 = 64$ codons for 20 amino acids plus stop signals, so the code is <strong>degenerate</strong> (most amino acids have several codons) but <strong>unambiguous</strong> (each codon means one thing). It is almost <strong>universal</strong>. AUG (methionine) is the start codon; UAA, UAG and UGA are stops.</p>
<p><strong>Translation</strong> happens on ribosomes. Each <strong>tRNA</strong> carries a specific amino acid, attached by an aminoacyl-tRNA synthetase using ATP, and has an <strong>anticodon</strong> complementary to a codon. The ribosome moves along the mRNA 5′→3′, matching tRNAs at its A, P and E sites and forming peptide bonds (catalysed by rRNA: the ribosome is a ribozyme). At a stop codon a release factor frees the polypeptide.</p>
<p>Polypeptides made on the rough ER enter it, fold, and go to the Golgi for modification such as glycosylation.</p>`
      },
      {
        title: 'Mutations',
        html: R`
<p>A <strong>gene mutation</strong> changes the base sequence.</p>
<div class="table-wrap"><table><thead><tr><th>Type</th><th>Change</th><th>Typical effect</th></tr></thead><tbody>
<tr><td>Silent</td><td>substitution to a synonymous codon</td><td>none</td></tr>
<tr><td>Missense</td><td>substitution giving a different amino acid</td><td>none to severe (sickle-cell: GAG→GTG, Glu→Val in β-globin)</td></tr>
<tr><td>Nonsense</td><td>substitution creating a stop codon</td><td>truncated, usually non-functional protein</td></tr>
<tr><td>Frameshift</td><td>insertion or deletion not a multiple of 3</td><td>every codon downstream changes; usually severe</td></tr>
</tbody></table></div>
<p>Mutagens include ionising radiation, UV (thymine dimers) and chemicals such as those in tobacco smoke. Mutations in body cells may cause cancer; only those in germ cells are inherited. They are also the raw material of evolution.</p>`
      },
      {
        title: 'Controlling gene expression',
        html: R`
<p>Every cell in your body has the same genes, but a neuron and a liver cell express different sets.</p>
<p><strong>Prokaryotes: the lac operon.</strong> In E. coli the genes for lactose use (lacZ, lacY, lacA) share one promoter and an <strong>operator</strong>. A repressor protein binds the operator and blocks RNA polymerase. Lactose (as allolactose) binds the repressor and releases it, so the genes are transcribed only when lactose is present. When glucose is also present, low cAMP keeps transcription low anyway: the bacterium prefers glucose.</p>
<p><strong>Eukaryotes</strong> regulate at many levels:</p>
<ul>
<li><strong>Transcription factors</strong> bind promoters and enhancers; steroid hormones such as oestrogen act by entering the nucleus with their receptor.</li>
<li><strong>Epigenetics</strong>: DNA methylation silences genes; histone acetylation loosens chromatin and allows transcription. These marks can be inherited through cell division without changing the DNA sequence.</li>
<li>After transcription: alternative splicing, mRNA stability, and <strong>RNA interference</strong> by small RNAs that destroy or block matching mRNAs.</li>
</ul>`
      }
    ],
    labs: [
      { sim: 'translate', title: 'Mutation workbench', desc: 'A random gene, its mRNA and its protein. Apply mutations and compare the new protein with the original, shown in grey.',
        tasks: ['Make several point substitutions. Roughly what fraction are silent? Which codon position is most often silent?', 'Insert one base near the start. What happens to the protein?', 'Insert or delete three bases at once (do it three times). Why is the effect milder?'] }
    ],
    formulas: [
      ['Number of codons', R`4^3 = 64`],
      ['Bases per protein', R`3n + 3\ \text{(with stop)}`],
      ['Template to mRNA', R`\mathrm{A{\to}U,\ T{\to}A,\ G{\to}C,\ C{\to}G}`],
      ['Start and stop', R`\mathrm{AUG};\ \ \mathrm{UAA,\ UAG,\ UGA}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'mRNA sequence', q: R`<p>The template strand reads 3′-TACGGA-5′. What is the mRNA?</p>`, options: ['5′-ATGCCT-3′', '5′-AUGCCU-3′', '5′-UACGGA-3′', '5′-UCCGUA-3′'], answer: 1, hints: [R`Complementary, U for T.`], solution: R`<p>5′-AUGCCU-3′: Met-Pro.</p>` },
      { level: 'concept', type: 'mcq', title: 'Worst mutation', q: R`<p>Which mutation near the start of a gene is most likely to destroy the protein's function?</p>`, options: ['A silent substitution', 'A deletion of one base', 'A deletion of three adjacent bases', 'A substitution in an intron'], answer: 1, hints: [R`Reading frame.`], solution: R`<p>A single-base deletion shifts the frame, changing every downstream codon and usually creating an early stop.</p>` },
      { level: 'concept', type: 'mcq', title: 'lac operon', q: R`<p>In the lac operon, what does lactose do?</p>`, options: ['Binds the operator directly', 'Binds the repressor so it releases the operator', 'Activates RNA polymerase by phosphorylation', 'Is the promoter'], answer: 1, hints: [R`It is an inducer.`], solution: R`<p>Allolactose binds the repressor, changing its shape so it leaves the operator.</p>` },
      { level: 'core', type: 'num', title: 'Gene length', q: R`<p>A protein has 300 amino acids. How many bases of mRNA code for it, including the stop codon (ignore untranslated regions)?</p>`, answer: 903, tol: 0.001, unit: '', hints: [R`3 per amino acid plus 3 for the stop.`], solution: R`<p>$3\times300 + 3 = 903$.</p>` },
      { level: 'core', type: 'num', title: 'Doublet code', q: R`<p>How many different amino acids could a doublet (two-base) code specify at most?</p>`, answer: 16, tol: 0.001, unit: '', hints: [R`$4^2$.`], solution: R`<p>16, fewer than 20: so the code must use at least triplets.</p>` },
      { level: 'core', type: 'num', title: 'Translate', q: R`<p>How many amino acids are in the polypeptide made from 5′-GCAUGUUUGGCAAAUGAGC-3′? (Translation starts at the first AUG.)</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`AUG UUU GGC AAA UGA.`], solution: R`<p>Met-Phe-Gly-Lys, then stop: 4.</p>` },
      { level: 'core', type: 'num', title: 'Splicing', q: R`<p>A gene has 5 exons. If exons 1 and 5 are always kept but each of exons 2, 3 and 4 may be included or skipped, how many different mRNAs are possible?</p>`, answer: 8, tol: 0.001, unit: '', hints: [R`Two choices for each of three exons.`], solution: R`<p>$2^3 = 8$.</p>` },
      { level: 'core', type: 'num', title: 'Ribosome speed', q: R`<p>A ribosome adds 15 amino acids per second. How long, in seconds, does it take to make a 450-residue protein?</p>`, answer: 30, tol: 0.002, unit: 's', hints: [R`Divide.`], solution: R`<p>30 s. Many ribosomes (a polysome) read the same mRNA at once.</p>` },
      { level: 'olympiad', type: 'num', title: 'Codon degeneracy', q: R`<p>Of the 64 codons, 3 are stops. On average, how many codons code for each of the 20 amino acids?</p>`, answer: 3.05, tol: 0.005, unit: '', hints: [R`61/20.`], solution: R`<p>3.05. The real spread runs from 1 (Met, Trp) to 6 (Leu, Ser, Arg).</p>` },
      { level: 'olympiad', type: 'num', title: 'Chance stop', q: R`<p>After a frameshift, codons become effectively random. What is the expected number of codons read before hitting a stop (3 of 64)?</p>`, answer: 21.33, tol: 0.01, unit: '', hints: [R`Geometric distribution, mean 1/p.`], solution: R`<p>$64/3 = 21.3$ codons, so frameshifts usually end the protein soon.</p>` },
      { level: 'olympiad', type: 'num', title: 'Silent substitutions', q: R`<p>For leucine's codon CUU, how many of the 9 possible single-base substitutions are silent? (CUN and UUA/UUG all code for Leu.)</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Check each position.`], solution: R`<p>Third position: CUC, CUA, CUG are Leu (3). First position: UUU is Phe, AUU Ile, GUU Val. Second: CCU Pro, CAU His, CGU Arg. So 3 silent.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-expression', [
    { title: 'Bases for a protein', gen(r) { const n = r.int(50, 1200); return { q: R`<p>How many coding bases (including the stop codon) are needed for a polypeptide of ${n} amino acids?</p>`, answer: 3 * n + 3, tol: 0, atol: 0.01, unit: '', solution: R`<p>$3\times${n} + 3 = ${3 * n + 3}$.</p>` }; } },
    { title: 'Count the residues', gen(r) { const codons = Object.keys(PB.geneticCode).filter((c) => PB.geneticCode[c] !== '*' && c !== 'AUG'); const n = r.int(2, 8); let s = r.pick(['G', 'CC', 'UA', '']) + 'AUG'; for (let i = 0; i < n; i++) s += r.pick(codons); s += r.pick(['UAA', 'UAG', 'UGA']) + r.pick(['GC', 'A', 'CCG']); return { q: R`<p>How many amino acids are encoded by the mRNA 5′-${s}-3′? Start at the first AUG.</p>`, answer: n + 1, tol: 0, atol: 0.01, unit: '', solution: R`<p>Met plus ${n} more before the stop: ${n + 1}.</p>` }; } },
    { title: 'Alternative splicing', gen(r) { const k = r.int(1, 8); return { q: R`<p>A gene has ${k} optional exons, each independently included or skipped. How many mRNA variants are possible?</p>`, answer: Math.pow(2, k), tol: 0, atol: 0.01, unit: '', solution: R`<p>$2^{${k}} = ${Math.pow(2, k)}$.</p>` }; } }
  ]);
})();
