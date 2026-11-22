(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const ANIMALS = [['shrew', 0.004], ['mouse', 0.025], ['rat', 0.3], ['cat', 4], ['dog', 20], ['human', 70], ['horse', 500], ['elephant', 4000], ['blue whale', 1.5e5]];
  PB.addChapter({
    id: 'bio-animaldiv', subject: 'biology', num: 24, part: 'Diversity of Life',
    title: 'Animal Diversity',
    subtitle: R`How animals are built and how they are related. Body plans (symmetry, germ layers, body cavities, development), the major phyla, the chordates and vertebrate classes, and the physics of body size.`,
    goals: ['Use symmetry, tissue layers, body cavity and development to classify animals', 'Describe the features of the major invertebrate phyla', 'List the chordate characteristics and the vertebrate classes', 'Explain how body size affects surface area, metabolism and support', 'Use scaling laws such as Kleiber’s law'],
    sections: [
      {
        title: 'Body plans',
        html: R`
<p>Animals are multicellular heterotrophs that ingest food, have no cell walls, and develop from a blastula. Phylogeny groups them by fundamental features of their body plan:</p>
<ul>
<li><strong>Tissues</strong>: sponges have none; all others (Eumetazoa) do.</li>
<li><strong>Symmetry and germ layers</strong>: radially symmetric cnidarians (jellyfish, corals) are <strong>diploblastic</strong> (ectoderm and endoderm). Bilaterally symmetric animals are <strong>triploblastic</strong>, with mesoderm, and show cephalisation (a head end with concentrated nerves).</li>
<li><strong>Body cavity</strong>: acoelomates (flatworms), pseudocoelomates (nematodes), coelomates (annelids, molluscs, arthropods, echinoderms, chordates). A fluid-filled coelom cushions organs and acts as a hydrostatic skeleton.</li>
<li><strong>Development</strong>: in <strong>protostomes</strong> the blastopore becomes the mouth, cleavage is spiral and determinate; in <strong>deuterostomes</strong> (echinoderms, chordates) the blastopore becomes the anus, cleavage is radial and indeterminate. Molecular phylogeny splits protostomes into Lophotrochozoa (which grow by adding to the body: molluscs, annelids, flatworms) and Ecdysozoa (which moult: arthropods, nematodes).</li>
</ul>`
      },
      {
        title: 'Invertebrate phyla',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Phylum</th><th>Key features</th><th>Examples</th></tr></thead><tbody>
<tr><td>Porifera</td><td>no true tissues; choanocytes filter water</td><td>sponges</td></tr>
<tr><td>Cnidaria</td><td>radial, diploblastic; stinging cnidocytes; polyp and medusa forms</td><td>jellyfish, corals, Hydra</td></tr>
<tr><td>Platyhelminthes</td><td>flat, acoelomate; one opening to the gut</td><td>planarians, tapeworms, flukes</td></tr>
<tr><td>Nematoda</td><td>round, unsegmented, cuticle; pseudocoelom</td><td>C. elegans, Ascaris</td></tr>
<tr><td>Annelida</td><td>segmented, coelomate, closed circulation</td><td>earthworms, leeches</td></tr>
<tr><td>Mollusca</td><td>muscular foot, visceral mass, mantle; often a shell</td><td>snails, clams, octopus</td></tr>
<tr><td>Arthropoda</td><td>jointed limbs, chitin exoskeleton, moulting; open circulation</td><td>insects, crustaceans, spiders</td></tr>
<tr><td>Echinodermata</td><td>adults pentaradial; water vascular system; deuterostomes</td><td>starfish, sea urchins</td></tr>
</tbody></table></div>
<p>Arthropods are the most successful phylum: over a million described species, insects alone dominating land. Their tracheal breathing system limits how large they can grow today.</p>`
      },
      {
        title: 'Chordates and vertebrates',
        html: R`
<p>At some stage every chordate has a <strong>notochord</strong>, a <strong>dorsal hollow nerve cord</strong>, <strong>pharyngeal slits</strong> and a <strong>post-anal tail</strong>. Lancelets and tunicates are invertebrate chordates. Vertebrates add a backbone and skull; the key innovations then form a ladder:</p>
<ul>
<li>jaws (gnathostomes: sharks, bony fish);</li>
<li>four limbs (tetrapods: amphibians, which still need water to breed);</li>
<li>the <strong>amniotic egg</strong> with its membranes (amniotes: reptiles including birds, and mammals), freeing reproduction from water;</li>
<li>endothermy, which evolved separately in birds and mammals; feathers in birds; hair, milk and a single lower-jaw bone in mammals.</li>
</ul>
<p>Mammals divide into monotremes (egg-laying), marsupials (short pregnancy, pouch) and eutherians (placental).</p>`
      },
      {
        title: 'Size and scaling',
        html: R`
<p>Body size shapes everything. If an animal doubles in length, its surface area rises 4 times and its mass 8 times. Consequences:</p>
<ul>
<li><strong>Support</strong>: weight ∝ L³ but bone strength ∝ cross-section ∝ L², so large animals need proportionally thicker bones (Galileo’s argument).</li>
<li><strong>Heat</strong>: small endotherms lose heat fast relative to their mass and must eat constantly; a shrew eats more than its own mass each day.</li>
<li><strong>Metabolism</strong>: basal metabolic rate scales as $B \approx 3.4\,M^{3/4}$ W (M in kg), <strong>Kleiber’s law</strong>. Per kilogram, $B/M \propto M^{-1/4}$: a mouse burns about 13 times more energy per gram than a horse.</li>
<li>Heart rate scales roughly as $M^{-1/4}$ and lifespan as $M^{1/4}$, so most mammals get roughly the same number of heartbeats in a lifetime (about a billion).</li>
</ul>
<details class="example"><summary><span class="lbl">Worked example</span> Estimate the basal metabolic rate of a 70 kg human from Kleiber’s law.<span class="tog">Solution</span></summary><div class="sol"><p>$3.4\times70^{0.75} = ${f(3.4 * Math.pow(70, 0.75))}$ W, close to the measured 80 W.</p></div></details>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Kleiber’s law', desc: 'Basal metabolic rate and rate per kilogram against body mass for mammals from shrews to whales (log scales), $B = 3.4M^{3/4}$ W.',
        tasks: ['How much more energy per gram does a mouse burn than an elephant?', 'Change the exponent to 2/3 (surface-area scaling). How do the predictions differ?', 'Estimate how much food (kJ/day) a 4 g shrew needs.'],
        params: { controls: [S('lm', 'log₁₀ body mass (kg)', -2.5, 5.2, 0.05, 1.85), S('b', 'Scaling exponent', 0.6, 1, 0.01, 0.75)],
          plots: [{ x: [-2.5, 5.2], y: [-1, 5], xlabel: 'log₁₀ mass (kg)', ylabel: 'log₁₀ B (W)', title: 'Total', curves: (v) => [{ f: (lm) => Math.log10(3.4) + v.b * lm }], pts: (v) => ANIMALS.map((a) => ({ x: Math.log10(a[1]), y: Math.log10(3.4) + v.b * Math.log10(a[1]), r: 3.5, label: a[0], color: 'ink3', ring: false })).concat([{ x: v.lm, y: Math.log10(3.4) + v.b * v.lm }]) },
            { x: [-2.5, 5.2], y: [-1, 2.5], xlabel: 'log₁₀ mass (kg)', ylabel: 'log₁₀ W/kg', title: 'Per kilogram', curves: (v) => [{ f: (lm) => Math.log10(3.4) + (v.b - 1) * lm, color: 'rust' }], pts: (v) => [{ x: v.lm, y: Math.log10(3.4) + (v.b - 1) * v.lm }] }],
          readout: (v) => { const M = Math.pow(10, v.lm), B = 3.4 * Math.pow(M, v.b); return [['mass', PB.fmt(M, 3) + ' kg'], ['BMR', PB.fmt(B, 3) + ' W'], ['per kg', PB.fmt(B / M, 3) + ' W/kg'], ['food per day', PB.fmt(B * 86400 / 1000, 3) + ' kJ']]; } } },
      { sim: 'explore', title: 'Why big animals have thick bones', desc: 'Bone diameter needed to keep stress constant, against body length: weight grows as L³, bone strength as d², so d ∝ L^{3/2}. Isometric scaling (d ∝ L) is shown dashed.',
        tasks: ['Scale a 5 cm mouse up to elephant size (3 m) isometrically. By what factor is the bone stress higher?', 'Why could a giant insect not have legs of the same proportions?', 'Real mammals follow roughly d ∝ L^{1.3}. Where does that sit between the two curves?'],
        params: { controls: [S('L', 'Body length', 0.05, 30, 0.05, 3, 'm')],
          plots: [{ x: [0, 30], y: 'auto', xlabel: 'body length (m)', ylabel: 'relative leg-bone diameter', curves: () => [{ f: (L) => Math.pow(L / 0.05, 1.5), label: 'constant stress, d ∝ L^1.5' }, { f: (L) => L / 0.05, color: 'ink3', dash: [5, 4], label: 'isometric, d ∝ L' }], vlines: (v) => [{ x: v.L }] }],
          readout: (v) => { const k = v.L / 0.05; return [['scale factor from a 5 cm mouse', f(k) + '×'], ['bone diameter needed', f(Math.pow(k, 1.5)) + '× (vs ' + f(k) + '× isometric)'], ['stress if isometric', f(k) + '× higher']]; } } }
    ],
    formulas: [
      ['Kleiber’s law', R`B \approx 3.4\,M^{3/4}\ \text{W}`],
      ['Specific metabolic rate', R`B/M \propto M^{-1/4}`],
      ['Surface and volume', R`A \propto L^2,\ \ V \propto L^3`],
      ['Bone scaling (constant stress)', R`d \propto L^{3/2}`],
      ['Heart rate', R`f \propto M^{-1/4}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Deuterostome', q: R`<p>Which phylum is a deuterostome like us?</p>`, options: ['Mollusca', 'Arthropoda', 'Echinodermata', 'Annelida'], answer: 2, hints: [R`Blastopore becomes the anus.`], solution: R`<p>Echinoderms.</p>` },
      { level: 'concept', type: 'mcq', title: 'Amniotic egg', q: R`<p>What was the main advantage of the amniotic egg?</p>`, options: ['Faster development', 'Reproduction free from water', 'Larger brains', 'Live birth'], answer: 1, hints: [R`Amphibians must return to water.`], solution: R`<p>It let reptiles, birds and mammals reproduce on dry land.</p>` },
      { level: 'concept', type: 'mcq', title: 'Chordate features', q: R`<p>Which is NOT one of the four chordate characteristics?</p>`, options: ['Notochord', 'Dorsal hollow nerve cord', 'Backbone', 'Post-anal tail'], answer: 2, hints: [R`Lancelets have none.`], solution: R`<p>A backbone defines vertebrates, not all chordates.</p>` },
      { level: 'core', type: 'num', title: 'Scaling up', q: R`<p>An animal doubles in every length. By what factor does its mass rise?</p>`, answer: 8, tol: 0.001, unit: '×', hints: [R`$2^3$.`], solution: R`<p>8.</p>` },
      { level: 'core', type: 'num', title: 'Horse BMR', q: R`<p>Use $B = 3.4M^{0.75}$ to estimate the basal metabolic rate of a 500 kg horse, in W.</p>`, answer: 3.4 * Math.pow(500, 0.75), tol: 0.005, unit: 'W', hints: [R`Plug in.`], solution: R`<p>${f(3.4 * Math.pow(500, 0.75))} W.</p>` },
      { level: 'core', type: 'num', title: 'Per-gram ratio', q: R`<p>By what factor is the metabolic rate per kilogram of a 25 g mouse greater than that of a 500 kg horse?</p>`, answer: Math.pow(500 / 0.025, 0.25), tol: 0.005, unit: '×', hints: [R`$(M_h/M_m)^{1/4}$.`], solution: R`<p>${f(Math.pow(500 / 0.025, 0.25))}×.</p>` },
      { level: 'core', type: 'num', title: 'Bone stress', q: R`<p>A mouse is scaled up isometrically by a factor of 40. By what factor does the stress in its leg bones rise?</p>`, answer: 40, tol: 0.001, unit: '×', hints: [R`Weight L³ over area L².`], solution: R`<p>40×: the bones would snap.</p>` },
      { level: 'core', type: 'num', title: 'Shrew food', q: R`<p>A 4 g shrew has a field metabolic rate of about 3 times its Kleiber BMR. How many kJ per day does it need?</p>`, answer: 3 * 3.4 * Math.pow(0.004, 0.75) * 86.4, tol: 0.01, unit: 'kJ/day', hints: [R`1 W = 86.4 kJ/day.`], solution: R`<p>${f(3 * 3.4 * Math.pow(0.004, 0.75) * 86.4)} kJ/day: about its own body mass of insects.</p>` },
      { level: 'core', type: 'num', title: 'Heartbeats', q: R`<p>A mouse has a heart rate of 600 per minute and lives 2 years. How many heartbeats is that, in units of 10⁸?</p>`, answer: 600 * 60 * 24 * 365 * 2 / 1e8, tol: 0.005, unit: '×10⁸', hints: [R`Minutes in two years.`], solution: R`<p>${f(600 * 60 * 24 * 365 * 2 / 1e8)} × 10⁸: about the same number as an elephant gets.</p>` },
      { level: 'olympiad', type: 'num', title: 'Insect tracheae', q: R`<p>Oxygen diffuses down tracheae of length L in a time ∝ L². If a 2 cm insect takes 1 s, how long for tracheae 20 times longer (a 40 cm insect)?</p>`, answer: 400, tol: 0.001, unit: 's', hints: [R`$t \propto L^2$.`], solution: R`<p>400 s: far too slow, one reason insects stay small (Carboniferous giants lived with 35% O₂).</p>` },
      { level: 'olympiad', type: 'num', title: 'Surface-area exponent', q: R`<p>If metabolic rate were set by surface area (∝ M^{2/3}), how many times more per kilogram would a 20 g mouse burn than a 70 kg human?</p>`, answer: Math.pow(70 / 0.02, 1 / 3), tol: 0.005, unit: '×', hints: [R`$(M_1/M_2)^{1/3}$.`], solution: R`<p>${f(Math.pow(70 / 0.02, 1 / 3))}× (Kleiber gives ${f(Math.pow(70 / 0.02, 0.25))}×).</p>` },
      { level: 'olympiad', type: 'num', title: 'Swimming whale', q: R`<p>A blue whale of 150 t: estimate its BMR from Kleiber’s law, in kW.</p>`, answer: 3.4 * Math.pow(1.5e5, 0.75) / 1000, tol: 0.01, unit: 'kW', hints: [R`$M = 1.5\times10^5$ kg.`], solution: R`<p>${f(3.4 * Math.pow(1.5e5, 0.75) / 1000)} kW.</p>` }
    ]
  });
  PB.addDrills('bio-animaldiv', [
    { title: 'Kleiber’s law', gen(r) { const a = r.pick(ANIMALS); return { q: R`<p>Estimate the basal metabolic rate of a ${a[0]} (${a[1]} kg) using $B = 3.4M^{0.75}$ W.</p>`, answer: 3.4 * Math.pow(a[1], 0.75), tol: 0.01, unit: 'W', solution: R`<p>${PB.fmt(3.4 * Math.pow(a[1], 0.75), 3)} W.</p>` }; } },
    { title: 'Surface and volume', gen(r) { const k = r.pick([1.5, 2, 3, 4, 5, 10]), what = r.pick(['surface area', 'mass', 'surface area per unit mass']); const v = what === 'mass' ? k * k * k : what === 'surface area' ? k * k : 1 / k; return { q: R`<p>An animal is scaled up by ×${k} in every length. By what factor does its ${what} change?</p>`, answer: v, tol: 0.005, unit: '×', solution: R`<p>${f(v)}.</p>` }; } },
    { title: 'Per-kilogram metabolism', gen(r) { const a = r.pick(ANIMALS), b = r.pick(ANIMALS); if (a[1] === b[1]) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>How many times higher is the metabolic rate per kilogram of a ${a[0]} (${a[1]} kg) than of a ${b[0]} (${b[1]} kg), with $B \propto M^{0.75}$?</p>`, answer: Math.pow(b[1] / a[1], 0.25), tol: 0.01, unit: '×', solution: R`<p>$(${b[1]}/${a[1]})^{0.25} = ${f(Math.pow(b[1] / a[1], 0.25))}$.</p>` }; } }
  ]);
})();
