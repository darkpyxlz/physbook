(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-dna', subject: 'biology', num: 8, part: 'Genetics',
    title: 'DNA, Replication and Biotechnology',
    subtitle: R`The double helix, base pairing and Chargaff's rules, semi-conservative replication, and the tools of molecular biology: PCR, gel electrophoresis, restriction enzymes and sequencing.`,
    goals: ['Describe the structure of DNA and apply Chargaff\'s rules', 'Explain semi-conservative replication and the Meselson–Stahl experiment', 'Calculate PCR amplification', 'Interpret gel electrophoresis and restriction digests', 'Outline genetic engineering and sequencing'],
    sections: [
      {
        title: 'The double helix',
        html: R`
<p>DNA is two antiparallel polynucleotide strands wound into a right-handed double helix (Watson and Crick, 1953, from Rosalind Franklin's X-ray images). The sugar–phosphate backbones run outside; the bases pair inside by hydrogen bonds: <strong>A–T (two bonds)</strong> and <strong>G–C (three bonds)</strong>. One strand runs 5′→3′, the other 3′→5′.</p>
<ul>
<li>One turn is 10.5 base pairs and 3.4 nm; adjacent pairs are 0.34 nm apart; the helix is 2 nm wide.</li>
<li><strong>Chargaff's rules</strong>: in double-stranded DNA, [A] = [T] and [G] = [C], so purines = pyrimidines.</li>
<li>GC-rich DNA has more hydrogen bonds and a higher melting temperature.</li>
</ul>
<p>The human genome has about $3.1\times10^9$ base pairs per haploid set, about 1 m of DNA per set. It is packed by wrapping around <strong>histones</strong> into nucleosomes and then coiling further into chromatin.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A DNA sample is 22% thymine. What percentage is guanine?<span class="tog">Solution</span></summary><div class="sol"><p>A = T = 22%, so G + C = 56% and G = 28%.</p></div></details>`
      },
      {
        title: 'Replication',
        html: R`
<p>DNA replication is <strong>semi-conservative</strong>: each new molecule has one old strand and one new strand. Meselson and Stahl showed this in 1958 by growing bacteria in heavy ¹⁵N, moving them to ¹⁴N and separating DNA by density: after one generation all DNA was intermediate; after two, half intermediate and half light.</p>
<ol>
<li><strong>Helicase</strong> unwinds and separates the strands at the replication fork; topoisomerase relieves the twisting ahead.</li>
<li><strong>Primase</strong> lays down a short RNA primer.</li>
<li><strong>DNA polymerase III</strong> adds nucleotides only to a 3′ end, so it builds new strands 5′→3′. The <strong>leading strand</strong> is continuous; the <strong>lagging strand</strong> is made in short <strong>Okazaki fragments</strong>.</li>
<li>DNA polymerase I replaces the primers with DNA, and <strong>ligase</strong> seals the gaps.</li>
</ol>
<p>Proofreading gives about one error per $10^9$–$10^{10}$ bases copied. Bacteria copy about 1000 bases per second from one origin; eukaryotes use thousands of origins to copy their much larger genomes in hours.</p>`
      },
      {
        title: 'PCR and gel electrophoresis',
        html: R`
<p>The <strong>polymerase chain reaction</strong> copies a chosen DNA region in a tube. Each cycle: denature at about 95 °C, anneal primers at 50–65 °C, extend at 72 °C with a heat-stable polymerase (Taq). Each cycle can double the target, so after $n$ cycles</p>
$$N_n = N_0(1 + E)^n \approx N_0\cdot2^n,$$
<p>where $E$ is the efficiency. Thirty cycles give about a billion copies. In real-time (quantitative) PCR the cycle at which fluorescence crosses a threshold, $C_t$, falls by about 3.3 cycles for every tenfold increase in starting template, which lets you measure how much DNA or RNA was there.</p>
<p><strong>Gel electrophoresis</strong> separates DNA fragments by size. DNA is negatively charged (phosphates), so it moves towards the anode; small fragments move faster through the gel mesh. Distance travelled is roughly linear in $\log(\text{size})$, so a ladder of known sizes lets you read off unknowns.</p>`
      },
      {
        title: 'Cutting, pasting and reading DNA',
        html: R`
<p><strong>Restriction enzymes</strong> from bacteria cut at specific palindromic sequences: EcoRI cuts G↓AATTC, leaving "sticky ends". A specific 6-base site occurs by chance about once every $4^6 = 4096$ bases. <strong>Ligase</strong> joins fragments with matching ends, so a gene can be inserted into a <strong>plasmid vector</strong> and taken up by bacteria (transformation). Antibiotic-resistance markers select the cells that took it up. Human insulin has been made this way since 1982.</p>
<p><strong>CRISPR–Cas9</strong> uses a guide RNA to direct the Cas9 nuclease to a matching 20-base target, where it cuts both strands; the cell's repair then knocks out or edits the gene.</p>
<p><strong>Sanger sequencing</strong> uses chain-terminating dideoxynucleotides to make fragments ending at every base, read by size. Modern high-throughput methods sequence billions of short fragments in parallel; a human genome now costs a few hundred dollars.</p>
<div class="insight"><strong>DNA fingerprinting.</strong> Short tandem repeats (STRs) vary in length between people. PCR of about 20 STR loci gives a profile with a random match probability far below one in a billion.</div>`
      }
    ],
    labs: [
      { sim: 'pcr', title: 'Amplification curve', desc: 'Copies of a target sequence over 40 PCR cycles. Growth is exponential until primers and nucleotides run short and it plateaus.',
        tasks: ['Start with 1000 copies at 100% efficiency. Find the threshold cycle.', 'Increase the template tenfold. By how many cycles does Ct move?', 'Lower the efficiency to 80%. Why does this matter for quantitative PCR?'] }
    ],
    formulas: [
      ['Chargaff\'s rules', R`[\mathrm A] = [\mathrm T],\ \ [\mathrm G] = [\mathrm C]`],
      ['PCR amplification', R`N_n = N_0(1+E)^n`],
      ['Shift per tenfold template', R`\Delta C_t = \log 10/\log(1+E)`],
      ['Helix geometry', R`0.34\ \text{nm per bp},\ 10.5\ \text{bp per turn}`],
      ['Expected site spacing', R`4^k\ \text{bases}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Base pairing', q: R`<p>Which pair is held by three hydrogen bonds?</p>`, options: ['A–T', 'G–C', 'A–U', 'A–G'], answer: 1, hints: [R`The stronger pair.`], solution: R`<p>G–C has three, A–T two.</p>` },
      { level: 'concept', type: 'mcq', title: 'Meselson–Stahl', q: R`<p>Bacteria grown on ¹⁵N are moved to ¹⁴N. After two generations, what does density centrifugation show?</p>`, options: ['All heavy', 'All intermediate', 'Half intermediate, half light', 'Half heavy, half light'], answer: 2, hints: [R`Semi-conservative replication.`], solution: R`<p>Two old heavy strands end up in two hybrid molecules; the other two are fully light.</p>` },
      { level: 'concept', type: 'mcq', title: 'Direction of synthesis', q: R`<p>Why is the lagging strand made in fragments?</p>`, options: ['Helicase works only on one strand', 'DNA polymerase adds nucleotides only to a 3′ end', 'Primers are only on one strand', 'Ligase cannot work continuously'], answer: 1, hints: [R`Polymerase direction versus fork direction.`], solution: R`<p>Polymerase builds 5′→3′, opposite to fork movement on the lagging strand, so it works backwards in short pieces.</p>` },
      { level: 'core', type: 'num', title: 'Chargaff', q: R`<p>Double-stranded DNA is 31% guanine. What percentage is adenine?</p>`, answer: 19, tol: 0.002, unit: '%', hints: [R`G + C = 62%.`], solution: R`<p>A + T = 38%, so A = 19%.</p>` },
      { level: 'core', type: 'num', title: 'PCR copies', q: R`<p>Starting from 50 copies, how many copies are made after 25 perfect PCR cycles? Give your answer in units of 10⁹.</p>`, answer: 1.678, tol: 0.005, unit: '×10⁹', hints: [R`$50\times2^{25}$.`], solution: R`<p>$50\times3.36\times10^7 = 1.68\times10^9$.</p>` },
      { level: 'core', type: 'num', title: 'Length of DNA', q: R`<p>How long, in mm, is a DNA molecule of 4.6 million base pairs (the E. coli genome)?</p>`, answer: 1.564, tol: 0.005, unit: 'mm', hints: [R`0.34 nm per base pair.`], solution: R`<p>$4.6\times10^6\times0.34\ \text{nm} = 1.56$ mm, about 800 times the cell's length.</p>` },
      { level: 'core', type: 'num', title: 'Restriction sites', q: R`<p>On average, how many sites for a 4-base restriction enzyme are expected in 10 000 base pairs of random DNA?</p>`, answer: 39.06, tol: 0.01, unit: '', hints: [R`One per $4^4$ bases.`], solution: R`<p>$10\,000/256 = 39$.</p>` },
      { level: 'core', type: 'num', title: 'Fragments from a digest', q: R`<p>A linear DNA molecule is cut at 5 sites. How many fragments result? (For a circular plasmid it would be 5.)</p>`, answer: 6, tol: 0.001, unit: '', hints: [R`Cuts plus one for linear DNA.`], solution: R`<p>6.</p>` },
      { level: 'olympiad', type: 'num', title: 'qPCR shift', q: R`<p>A qPCR runs at 90% efficiency. By how many cycles does Ct move for a tenfold change in starting template?</p>`, answer: 3.588, tol: 0.005, unit: 'cycles', hints: [R`$\log10/\log1.9$.`], solution: R`<p>$1/\log_{10}1.9 = 1/0.2788 = 3.59$ cycles.</p>` },
      { level: 'olympiad', type: 'num', title: 'Replication time', q: R`<p>A human chromosome of 150 million base pairs has replication origins every 100 000 bp, each firing two forks at 50 bp/s. If all fire at once, how long does replication take, in minutes?</p>`, answer: 16.67, tol: 0.005, unit: 'min', hints: [R`Each fork must cover 50 000 bp.`], solution: R`<p>$50\,000/50 = 1000$ s $= 16.7$ min. With one origin it would take 17 days.</p>` },
      { level: 'olympiad', type: 'num', title: 'Errors per division', q: R`<p>DNA polymerase with proofreading and mismatch repair makes one error per 10¹⁰ bases. How many new mutations does a diploid human cell (6.2 × 10⁹ bp) acquire per division?</p>`, answer: 0.62, tol: 0.005, unit: '', hints: [R`Multiply.`], solution: R`<p>0.62: roughly one new mutation every two divisions.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-dna', [
    { title: 'Chargaff\'s rules', gen(r) { const b = r.pick(['A', 'T', 'G', 'C']), p = r.int(12, 38), ask = r.pick(['A', 'T', 'G', 'C'].filter((x) => x !== b)); const pair = { A: 'T', T: 'A', G: 'C', C: 'G' }; const v = ask === pair[b] ? p : 50 - p; return { q: R`<p>Double-stranded DNA is ${p}% ${b}. What percentage is ${ask}?</p>`, answer: v, tol: 0.002, unit: '%', solution: R`<p>${b} pairs with ${pair[b]}, so ${ask} = ${v}%.</p>` }; } },
    { title: 'PCR copies', gen(r) { const N0 = r.int(1, 500), n = r.int(10, 35), E = r.pick([1, 0.95, 0.9, 0.85]); const N = N0 * Math.pow(1 + E, n); return { q: R`<p>A PCR starts with ${N0} copies and runs ${n} cycles at ${E * 100}% efficiency. How many copies result? Give the answer as log₁₀ of the number.</p>`, answer: Math.log10(N), tol: 0.003, unit: '', solution: R`<p>$\log_{10}(${N0}\times${f(1 + E)}^{${n}}) = ${f(Math.log10(N))}$.</p>` }; } },
    { title: 'DNA length', gen(r) { const bp = r.int(1, 500) * 1e4; return { q: R`<p>How long, in μm, is a DNA molecule of ${bp.toLocaleString('en-US')} base pairs (0.34 nm per pair)?</p>`, answer: bp * 0.34e-3, tol: 0.005, unit: 'μm', solution: R`<p>$${bp}\times0.34\ \text{nm} = ${f(bp * 0.34e-3)}\ \mu$m.</p>` }; } }
  ]);
})();
