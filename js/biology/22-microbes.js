(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  PB.addChapter({
    id: 'bio-microbes', subject: 'biology', num: 22, part: 'Diversity of Life',
    title: 'Viruses, Prokaryotes and Protists',
    subtitle: R`The microbial world. How viruses replicate, the structure and metabolism of bacteria and archaea, bacterial growth and gene transfer, antibiotics and resistance, and the diversity of protists including the malaria parasite.`,
    goals: ['Describe virus structure and the lytic and lysogenic cycles', 'Compare bacteria and archaea, and Gram-positive and Gram-negative walls', 'Classify organisms by nutrition (photo/chemo, auto/hetero)', 'Model bacterial growth and calculate generation times', 'Explain horizontal gene transfer and the spread of antibiotic resistance', 'Outline protist diversity and the life cycle of Plasmodium'],
    sections: [
      {
        title: 'Viruses',
        html: R`
<p>A virus is genetic material (DNA or RNA, single- or double-stranded) inside a protein <strong>capsid</strong>, sometimes wrapped in a membrane <strong>envelope</strong> taken from its host. Viruses have no metabolism and reproduce only inside cells, so they are not usually counted as living organisms.</p>
<ul>
<li><strong>Lytic cycle</strong>: attach, inject the genome, take over the cell to make viral parts, assemble, and burst the cell (phage T4).</li>
<li><strong>Lysogenic cycle</strong>: the phage genome integrates into the host chromosome as a <strong>prophage</strong> and is copied with it, until a stress triggers the lytic cycle (phage λ).</li>
<li><strong>Retroviruses</strong> (HIV) carry RNA and the enzyme <strong>reverse transcriptase</strong>, which makes a DNA copy that integrates into the host genome. Reverse transcriptase is error-prone, so HIV mutates fast and escapes drugs and antibodies.</li>
</ul>
<p>RNA viruses such as influenza also reshuffle segments between strains (antigenic shift), causing pandemics. Prions, misfolded proteins that convert normal ones (BSE, CJD), are infectious with no nucleic acid at all.</p>`
      },
      {
        title: 'Bacteria and archaea',
        html: R`
<p>Prokaryotes are the most diverse and abundant organisms on Earth. Woese’s rRNA sequencing (1977) split them into two domains:</p>
<div class="table-wrap"><table><thead><tr><th></th><th>Bacteria</th><th>Archaea</th></tr></thead><tbody>
<tr><td>Cell wall</td><td>peptidoglycan</td><td>no peptidoglycan</td></tr>
<tr><td>Membrane lipids</td><td>ester-linked, unbranched</td><td>ether-linked, branched (some monolayers)</td></tr>
<tr><td>RNA polymerase, initiator amino acid</td><td>simple; formyl-methionine</td><td>eukaryote-like; methionine</td></tr>
<tr><td>Examples</td><td>E. coli, cyanobacteria</td><td>methanogens, extreme halophiles and thermophiles</td></tr>
</tbody></table></div>
<p>The <strong>Gram stain</strong> divides bacteria: Gram-positive cells have a thick peptidoglycan wall that keeps crystal violet (purple); Gram-negative cells have a thin wall plus an outer membrane with lipopolysaccharide (pink), making them more resistant to many antibiotics. Shapes: cocci, bacilli, spirilla.</p>
<p>By how they get energy and carbon, organisms are <strong>photoautotrophs</strong> (cyanobacteria, plants), <strong>chemoautotrophs</strong> (nitrifying bacteria, deep-sea vent archaea), <strong>photoheterotrophs</strong> and <strong>chemoheterotrophs</strong> (most bacteria, fungi, animals). Prokaryotes alone fix nitrogen, and cyanobacteria made Earth’s oxygen atmosphere.</p>`
      },
      {
        title: 'Growth and gene transfer',
        html: R`
<p>Bacteria divide by binary fission. A culture in fresh medium shows a <strong>lag phase</strong>, an <strong>exponential (log) phase</strong> in which numbers double every generation time $g$, a <strong>stationary phase</strong> when nutrients run out or waste builds up, and a <strong>death phase</strong>.</p>
$$N = N_0\,2^{t/g},\qquad g = \frac{t\ln2}{\ln(N/N_0)}.$$
<p>E. coli can divide every 20 minutes. Bacteria also exchange genes <strong>horizontally</strong>:</p>
<ul>
<li><strong>Transformation</strong>: taking up free DNA (Griffith’s pneumococcus experiment, 1928).</li>
<li><strong>Transduction</strong>: phages carry bacterial DNA between cells.</li>
<li><strong>Conjugation</strong>: plasmids pass through a pilus. R plasmids carry several antibiotic-resistance genes at once.</li>
</ul>
<p><strong>Antibiotics</strong> target bacterial features: penicillin blocks peptidoglycan cross-linking, tetracycline and streptomycin block 70S ribosomes, ciprofloxacin blocks DNA gyrase. Overuse selects resistant strains (MRSA), and horizontal transfer spreads resistance between species.</p>`
      },
      {
        title: 'Protists',
        html: R`
<p>"Protists" are all eukaryotes that are not plants, animals or fungi: a convenient grouping rather than a clade. Modern supergroups include the <strong>excavates</strong> (Giardia; Trypanosoma, which causes sleeping sickness), the <strong>SAR clade</strong> (diatoms and brown algae; ciliates such as Paramecium; foraminiferans; and the apicomplexans), <strong>Archaeplastida</strong> (red and green algae, and land plants) and <strong>Unikonta</strong> (amoebae, and the lineage leading to fungi and animals).</p>
<p><strong>Plasmodium</strong>, an apicomplexan, causes malaria. Sporozoites injected by a female Anopheles mosquito infect liver cells, then merozoites invade red blood cells, multiplying and bursting them in synchronised cycles that cause fever. Some become gametocytes, which a biting mosquito takes up; sexual reproduction occurs in the mosquito. The sickle-cell allele persists because carriers resist malaria (chapter 12).</p>
<p>Diatoms and other phytoplankton carry out about half of Earth’s photosynthesis. Endosymbiosis happened more than once: some algae acquired chloroplasts by engulfing another eukaryotic alga (secondary endosymbiosis), which is why their plastids have three or four membranes.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'The bacterial growth curve', desc: 'Viable cells (log scale) against time: lag, exponential growth, stationary phase and death.',
        tasks: ['Read the generation time from the slope of the log phase.', 'Halve the generation time. When does the culture reach stationary phase?', 'Why does the stationary phase level not depend on the starting number?'],
        params: { controls: [S('g', 'Generation time', 10, 120, 1, 30, 'min'), S('lag', 'Lag phase', 0, 240, 5, 60, 'min'), S('K', 'log₁₀ maximum density', 6, 10, 0.1, 9, 'cells/mL'), S('N0', 'log₁₀ starting density', 2, 6, 0.1, 4, 'cells/mL'), S('d', 'Death rate in decline', 0, 2, 0.05, 0.5, 'log/h')],
          init: (v) => { v.N = (t) => { const r = Math.LN2 / v.g; if (t < v.lag) return v.N0; const te = v.lag + (v.K - v.N0) * Math.LN10 / r; if (t < te) { const x = Math.pow(10, v.N0) * Math.exp(r * (t - v.lag)); return Math.log10(x / (1 + x / Math.pow(10, v.K + 0.3))); } const ts = te + 180; if (t < ts) return v.K - 0.15; return v.K - 0.15 - v.d * (t - ts) / 60; }; },
          plots: [{ x: [0, 1440], y: [0, 11], xlabel: 'time (min)', ylabel: 'log₁₀ cells/mL', curves: (v) => [{ f: (t) => v.N(t) }] }],
          readout: (v) => { const r = Math.LN2 / v.g; return [['growth rate', f(r * 60) + ' per hour'], ['time to stationary phase', f((v.lag + (v.K - v.N0) * Math.LN10 / r) / 60) + ' h'], ['generations', f((v.K - v.N0) / Math.log10(2))]]; } } },
      { sim: 'explore', title: 'Antibiotic selection', desc: 'A mixed population of sensitive and resistant bacteria under a constant antibiotic dose. Sensitive cells are killed above the MIC; resistant cells grow, paying a small fitness cost.',
        tasks: ['Start with 1 resistant cell in a million. How long until resistant cells dominate?', 'What happens when the dose is below the sensitive MIC?', 'Why can stopping a course of antibiotics early be risky?'],
        params: { controls: [S('dose', 'Antibiotic dose (× MIC of sensitive strain)', 0, 10, 0.1, 4), S('lf', 'log₁₀ starting resistant fraction', -9, -1, 0.1, -6), S('c', 'Fitness cost of resistance', 0, 0.3, 0.01, 0.1)],
          init: (v) => { v.sim = () => { let s = 1e8 * (1 - Math.pow(10, v.lf)), rr = 1e8 * Math.pow(10, v.lf); const K = 1e9, out = []; for (let i = 0; i <= 480; i++) { const tot = s + rr, gr = 1.2 * (1 - tot / K); const kill = v.dose > 1 ? 1.5 * Math.log10(v.dose) + 0.6 : 0; s = Math.max(0, s + (gr - kill) * s * 0.05); rr = Math.max(0, rr + gr * (1 - v.c) * rr * 0.05); if (i % 4 === 0) out.push([i * 0.05, Math.log10(s + 1), Math.log10(rr + 1)]); } return out; }; },
          plots: [{ x: [0, 24], y: [0, 9.5], xlabel: 'time (h)', ylabel: 'log₁₀ cells', curves: (v) => { const d = v.sim(); return [{ f: (t) => d[Math.min(d.length - 1, Math.round(t / 0.2))][1], label: 'sensitive' }, { f: (t) => d[Math.min(d.length - 1, Math.round(t / 0.2))][2], color: 'rust', label: 'resistant' }]; } }],
          readout: (v) => { const d = v.sim(), e = d[d.length - 1]; return [['after 24 h: sensitive', '10^' + f(e[1])], ['after 24 h: resistant', '10^' + f(e[2])], ['resistant fraction', f(Math.pow(10, e[2]) / (Math.pow(10, e[1]) + Math.pow(10, e[2])))]]; } } }
    ],
    formulas: [
      ['Exponential growth', R`N = N_0\,2^{t/g}`],
      ['Generation time', R`g = t\ln2/\ln(N/N_0)`],
      ['Number of generations', R`n = \log_2(N/N_0)`],
      ['Serial dilution', R`\text{count} = \text{colonies}\times\text{dilution factor}/\text{volume plated}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Reverse transcriptase', q: R`<p>Which enzyme lets HIV insert its genome into host DNA?</p>`, options: ['DNA polymerase', 'Reverse transcriptase (then integrase)', 'RNA polymerase', 'Ligase only'], answer: 1, hints: [R`RNA → DNA.`], solution: R`<p>Reverse transcriptase makes DNA; integrase inserts it.</p>` },
      { level: 'concept', type: 'mcq', title: 'Gram-negative', q: R`<p>Why are Gram-negative bacteria often resistant to penicillin?</p>`, options: ['They lack ribosomes', 'Their outer membrane blocks entry to the thin peptidoglycan layer', 'They have no cell wall', 'They are archaea'], answer: 1, hints: [R`Extra barrier.`], solution: R`<p>The outer membrane keeps many drugs out.</p>` },
      { level: 'concept', type: 'mcq', title: 'Chemoautotroph', q: R`<p>Nitrifying bacteria oxidise ammonia for energy and fix CO₂. They are…</p>`, options: ['Photoautotrophs', 'Chemoautotrophs', 'Chemoheterotrophs', 'Photoheterotrophs'], answer: 1, hints: [R`Chemical energy, inorganic carbon.`], solution: R`<p>Chemoautotrophs.</p>` },
      { level: 'core', type: 'num', title: 'Generations', q: R`<p>A culture grows from $2\times10^4$ to $6.4\times10^5$ cells/mL. How many generations is that?</p>`, answer: Math.log2(32), tol: 0.005, unit: '', hints: [R`$\log_2 32$.`], solution: R`<p>5.</p>` },
      { level: 'core', type: 'num', title: 'Generation time', q: R`<p>That growth took 2.5 hours. What is the generation time, in minutes?</p>`, answer: 150 / 5, tol: 0.005, unit: 'min', hints: [R`Time / generations.`], solution: R`<p>30 min.</p>` },
      { level: 'core', type: 'num', title: 'Serial dilution', q: R`<p>0.1 mL of a 10⁻⁶ dilution gives 87 colonies. What was the original density, in units of 10⁸ cells/mL?</p>`, answer: 87 * 1e6 / 0.1 / 1e8, tol: 0.005, unit: '×10⁸ /mL', hints: [R`Colonies × dilution / volume.`], solution: R`<p>${f(87 * 1e6 / 0.1 / 1e8)} × 10⁸ cells/mL.</p>` },
      { level: 'core', type: 'num', title: 'Overnight growth', q: R`<p>Starting from one E. coli cell dividing every 20 minutes without limits, how many cells after 10 hours? Give log₁₀.</p>`, answer: 30 * Math.log10(2), tol: 0.005, unit: '', hints: [R`30 doublings.`], solution: R`<p>$2^{30}$, log₁₀ = ${f(30 * Math.log10(2))}.</p>` },
      { level: 'core', type: 'num', title: 'Burst size', q: R`<p>Phage infects bacteria at a ratio of 1 phage per 10 cells; each infected cell releases 150 phages. Starting with 10⁷ bacteria, how many phages after one cycle (ignore the original phages)?</p>`, answer: 1e6 * 150, tol: 0.005, unit: '', hints: [R`10⁶ infected cells.`], solution: R`<p>1.5 × 10⁸.</p>` },
      { level: 'core', type: 'num', title: 'Malaria cycle', q: R`<p>P. falciparum completes a blood cycle every 48 h, each infected cell releasing 16 merozoites. Starting from 10⁵ infected cells, how many after 6 days if all reinvade?</p>`, answer: 1e5 * Math.pow(16, 3), tol: 0.005, unit: '', hints: [R`3 cycles.`], solution: R`<p>$10^5\times16^3 = ${PB.fmt(1e5 * Math.pow(16, 3), 3)}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mutation to resistance', q: R`<p>Resistance mutations arise at $10^{-8}$ per cell per division. In a culture that grows from 1 cell to $10^{10}$, roughly how many resistant mutants arise (about N − 1 divisions)?</p>`, answer: 1e10 * 1e-8, tol: 0.01, unit: '', hints: [R`Divisions × rate.`], solution: R`<p>About 100, before any antibiotic is applied: Luria and Delbrück showed mutations are random, not induced.</p>` },
      { level: 'olympiad', type: 'num', title: 'Fitness cost', q: R`<p>Without antibiotic, resistant cells grow 10% slower (relative fitness 0.9). Starting at 50% resistant, what fraction is resistant after 30 generations?</p>`, answer: Math.pow(0.9, 30) / (1 + Math.pow(0.9, 30)), tol: 0.01, unit: '', hints: [R`Ratio R/S multiplies by 0.9 per generation.`], solution: R`<p>$0.9^{30}/(1 + 0.9^{30}) = ${f(Math.pow(0.9, 30) / (1 + Math.pow(0.9, 30)))}$: resistance declines slowly when the drug is withdrawn.</p>` },
      { level: 'olympiad', type: 'num', title: 'Viral genome size', q: R`<p>A virus capsid is a sphere of inner radius 25 nm. DNA packs at about 0.5 g/cm³ and has 650 Da per base pair. About how many kilobase pairs fit?</p>`, answer: 4 / 3 * Math.PI * Math.pow(25e-7, 3) * 0.5 / (650 * 1.66e-24) / 1000, tol: 0.02, unit: 'kbp', hints: [R`Volume × density ÷ mass per bp.`], solution: R`<p>Volume $6.5\times10^{-17}$ cm³; mass $3.3\times10^{-17}$ g; ${f(4 / 3 * Math.PI * Math.pow(25e-7, 3) * 0.5 / (650 * 1.66e-24) / 1000)} kbp, typical of small DNA viruses.</p>` }
    ]
  });
  PB.addDrills('bio-microbes', [
    { title: 'Generation time', gen(r) { const g = r.int(15, 120), n = r.int(3, 20), N0 = Math.pow(10, r.int(2, 6)); return { q: R`<p>A culture grows from ${PB.fmt(N0, 3)} to ${PB.fmt(N0 * Math.pow(2, n), 3)} cells in ${g * n} min. What is the generation time, in minutes?</p>`, answer: g, tol: 0.005, unit: 'min', solution: R`<p>${n} generations in ${g * n} min: ${g} min.</p>` }; } },
    { title: 'Colony counts', gen(r) { const c = r.int(30, 300), d = r.int(3, 8), V = r.pick([0.1, 0.2, 0.5, 1]); return { q: R`<p>${V} mL of a 10<sup>−${d}</sup> dilution gives ${c} colonies. What was the original density? Give log₁₀ cells/mL.</p>`, answer: Math.log10(c / V) + d, tol: 0.003, unit: '', solution: R`<p>${c}/${V} × 10<sup>${d}</sup> per mL: log₁₀ = ${f(Math.log10(c / V) + d)}.</p>` }; } },
    { title: 'Exponential growth', gen(r) { const g = r.int(15, 90), t = r.int(1, 12); return { q: R`<p>Bacteria divide every ${g} min. By what factor do they increase in ${t} h? Give log₁₀.</p>`, answer: t * 60 / g * Math.log10(2), tol: 0.005, unit: '', solution: R`<p>${f(t * 60 / g)} doublings: log₁₀ = ${f(t * 60 / g * Math.log10(2))}.</p>` }; } }
  ]);
})();
