/* Biology: a third batch of problems (one concept, one core, one olympiad per chapter). Answers are computed in code. */
(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3).replace(/^(-?[0-9.]+)e(-?[0-9]+)$/, '$1\\times10^{$2}'), X = PB.addProblems;
  const M = (level, title, q, options, answer, hint, sol) => ({ level: level, type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: [hint], solution: '<p>' + sol + '</p>' });
  const N = (level, title, q, answer, unit, hint, sol, tol) => ({ level: level, type: 'num', title: title, q: '<p>' + q + '</p>', answer: answer, tol: tol || 0.02, unit: unit, hints: [hint], solution: '<p>' + sol + '</p>' });

  X('bio-molecules', [
    M('concept', 'Peptide bond', R`What links amino acids in a protein chain?`, ['Glycosidic bonds', 'Peptide bonds', 'Ester bonds', 'Phosphodiester bonds'], 1, R`It forms between an amino group and a carboxyl group.`, R`Peptide (amide) bonds, formed by condensation.`),
    N('core', 'Condensation count', R`How many water molecules are released when a single polypeptide of 150 amino acids is made?`, 149, '', R`One per bond.`, R`150 residues are joined by 149 peptide bonds.`, 0.001),
    N('olympiad', 'Helix length', R`An α-helix rises 0.15 nm per residue. How long is a helix of 72 residues, in nm?`, 72 * 0.15, 'nm', R`3.6 residues per turn and 0.54 nm per turn give the same answer.`, R`$72 \times 0.15 = ${f(10.8)}$ nm (20 turns).`)
  ]);
  X('bio-cells', [
    M('concept', 'Own DNA', R`Which organelle contains its own circular DNA?`, ['Golgi apparatus', 'Mitochondrion', 'Lysosome', 'Rough ER'], 1, R`Endosymbiosis.`, R`Mitochondria (and chloroplasts), descended from bacteria.`),
    N('core', 'Magnification', R`A cell 15 μm across appears 30 mm wide in a micrograph. What is the magnification?`, 2000, '×', R`Magnification = image size / actual size, in the same units.`, R`$30\,000\text{ μm}/15\text{ μm} = 2000$.`),
    N('olympiad', 'Sphere SA:V', R`What is the surface-area-to-volume ratio of a spherical cell of diameter 6.0 μm, in μm⁻¹?`, 1, 'μm⁻¹', R`For a sphere SA/V $= 3/r$.`, R`$3/3.0 = 1.0$ μm⁻¹. Doubling the diameter halves it.`)
  ]);
  const EK = 8.314 * 310.15 / 96485 * Math.log(5 / 140) * 1000;
  X('bio-membranes', [
    M('concept', 'Water potential', R`Water moves by osmosis…`, ['from low to high water potential', 'from high to low water potential', 'towards higher pressure', 'only through ion channels'], 1, R`Water potential is like a height for water.`, R`From higher (less negative) to lower (more negative) water potential.`),
    N('core', 'Cell water potential', R`A plant cell has solute potential −0.80 MPa and pressure potential +0.30 MPa. What is its water potential?`, -0.5, 'MPa', R`$\psi = \psi_s + \psi_p$.`, R`$-0.80 + 0.30 = -0.50$ MPa.`),
    N('olympiad', 'Potassium equilibrium', R`[K⁺] is 5 mM outside and 140 mM inside a neuron at 37 °C. Find the K⁺ equilibrium potential in mV.`, EK, 'mV', R`Nernst: $E = \dfrac{RT}{zF}\ln\dfrac{[\text{out}]}{[\text{in}]}$.`, R`$E = 26.7\text{ mV}\times\ln(5/140) = ${f(EK)}$ mV.`)
  ]);
  X('bio-enzymes', [
    M('concept', 'Competitive inhibition', R`A competitive inhibitor…`, ['lowers V<sub>max</sub>', 'raises the apparent K<sub>m</sub>', 'binds only the ES complex', 'denatures the enzyme'], 1, R`High [S] can outcompete it.`, R`It raises the apparent K<sub>m</sub>; V<sub>max</sub> is unchanged.`),
    N('core', 'Michaelis–Menten', R`An enzyme has V<sub>max</sub> = 100 μmol/min and K<sub>m</sub> = 2.0 mM. Find the rate at [S] = 6.0 mM.`, 75, 'μmol/min', R`$v = V_{\max}[S]/(K_m + [S])$.`, R`$100 \times 6/8 = 75$ μmol/min.`),
    N('olympiad', 'Using Q₁₀', R`A rate is 12 units at 20 °C and 30 units at 30 °C. Assuming a constant Q₁₀, what is it at 35 °C?`, 30 * Math.sqrt(2.5), 'units', R`$Q_{10} = 30/12$; 5 °C is half of ten.`, R`$Q_{10} = 2.5$, rate $= 30 \times 2.5^{0.5} = ${f(30 * Math.sqrt(2.5))}$.`)
  ]);
  X('bio-respiration', [
    M('concept', 'Glycolysis', R`Where does glycolysis take place?`, ['Mitochondrial matrix', 'Cytoplasm', 'Inner mitochondrial membrane', 'Nucleus'], 1, R`It does not need any organelle.`, R`In the cytoplasm (cytosol).`),
    N('core', 'Fat RQ', R`Tripalmitin, C₅₁H₉₈O₆, is fully oxidised: C₅₁H₉₈O₆ + 72.5 O₂ → 51 CO₂ + 49 H₂O. What is its respiratory quotient?`, 51 / 72.5, '', R`RQ = CO₂ produced / O₂ used.`, R`$51/72.5 = ${f(51 / 72.5)}$, typical for fat.`),
    N('olympiad', 'One acetyl-CoA', R`Using 2.5 ATP per NADH and 1.5 per FADH₂, how many ATP (or GTP) does one acetyl-CoA yield through the Krebs cycle and oxidative phosphorylation?`, 10, 'ATP', R`Each turn gives 3 NADH, 1 FADH₂ and 1 GTP.`, R`$3\times2.5 + 1.5 + 1 = 10$.`, 0.001)
  ]);
  X('bio-photosynthesis', [
    M('concept', 'Source of oxygen', R`The O₂ released in photosynthesis comes from…`, ['CO₂', 'water', 'glucose', 'RuBP'], 1, R`Isotope-labelling experiments with ¹⁸O.`, R`Water, split at photosystem II.`),
    N('core', 'Calvin cycle ATP', R`How many ATP are used in the Calvin cycle to make one glucose (6 CO₂ fixed)?`, 18, 'ATP', R`3 ATP and 2 NADPH per CO₂.`, R`$6 \times 3 = 18$ ATP (and 12 NADPH).`, 0.001),
    M('olympiad', 'CAM plants', R`In CAM plants such as pineapple, CO₂ is first fixed…`, ['by RuBisCO during the day', 'by PEP carboxylase at night', 'in bundle-sheath cells', 'by photorespiration'], 1, R`Stomata open when it is cool.`, R`By PEP carboxylase at night into malate, stored in vacuoles; by day it is released to RuBisCO while the stomata stay shut.`)
  ]);
  X('bio-cellcycle', [
    M('concept', 'Sister chromatids', R`When do sister chromatids separate in meiosis?`, ['Anaphase I', 'Anaphase II', 'Prophase I', 'Telophase I'], 1, R`Homologues separate first.`, R`Anaphase II; anaphase I separates homologous chromosomes.`),
    N('core', 'Chromatids in metaphase I', R`How many chromatids are in a human cell at metaphase I of meiosis?`, 92, '', R`46 chromosomes, each duplicated.`, R`$46 \times 2 = 92$ chromatids (in 23 bivalents).`, 0.001),
    N('olympiad', 'Independent assortment', R`Ignoring crossing over, how many genetically different gametes can a human make from independent assortment alone?`, Math.pow(2, 23), '', R`Each of 23 pairs can go either way.`, R`$2^{23} = 8\,388\,608$.`, 0.001)
  ]);
  X('bio-dna', [
    M('concept', 'Direction', R`DNA polymerase synthesises new DNA in which direction?`, ['3′ → 5′', '5′ → 3′', 'Both', 'Either, depending on the strand'], 1, R`It adds nucleotides to a free 3′-OH.`, R`5′ → 3′, which is why the lagging strand is made in Okazaki fragments.`),
    N('core', 'PCR', R`Starting from one double-stranded molecule, how many copies are there after 30 perfect PCR cycles?`, Math.pow(2, 30), '', R`Doubling each cycle.`, R`$2^{30} \approx 1.07\times10^9$.`),
    N('olympiad', 'Meselson–Stahl', R`E. coli grown in ¹⁵N is moved to ¹⁴N. After three generations, what fraction of DNA molecules is ¹⁵N/¹⁴N hybrid?`, 0.25, '', R`Semi-conservative: the two original strands persist.`, R`8 molecules, 2 hybrid: 0.25.`)
  ]);
  X('bio-expression', [
    M('concept', 'Start codon', R`The start codon AUG codes for…`, ['Methionine', 'Tryptophan', 'Stop', 'Glycine'], 0, R`It is also used inside genes.`, R`Methionine (formyl-methionine in bacteria).`),
    N('core', 'Protein length', R`A coding sequence, from start codon to stop codon inclusive, is 900 nucleotides. How many amino acids are in the protein?`, 299, '', R`300 codons, one of which is the stop.`, R`$900/3 - 1 = 299$.`, 0.001),
    M('olympiad', 'Lac operon', R`When is the lac operon transcribed most strongly?`, ['Glucose present, lactose absent', 'Glucose present, lactose present', 'Glucose absent, lactose present', 'Glucose absent, lactose absent'], 2, R`Two signals: repressor release and CAP–cAMP activation.`, R`Lactose (as allolactose) removes the repressor, and low glucose raises cAMP, which lets CAP boost transcription.`)
  ]);
  X('bio-mendel', [
    M('concept', 'Test cross', R`To find whether a tall pea is TT or Tt, you cross it with…`, ['a TT plant', 'a Tt plant', 'a tt plant', 'itself only'], 2, R`Use a homozygous recessive.`, R`tt: any short offspring reveal that the parent was Tt.`),
    N('core', 'Both dominant', R`In AaBb × AaBb with independent assortment and complete dominance, what fraction of offspring show both dominant traits?`, 9 / 16, '', R`$(3/4)^2$.`, R`$9/16 = ${f(0.5625, 4)}$.`),
    N('olympiad', 'Exactly two heterozygous', R`In AaBbCcDd × AaBbCcDd, what is the probability that an offspring is heterozygous at exactly two of the four loci?`, 6 / 16, '', R`Each locus is heterozygous with probability ½.`, R`$\binom42(1/2)^4 = 6/16 = 0.375$.`)
  ]);
  X('bio-linkage', [
    M('concept', 'X-linked recessive', R`Why are X-linked recessive conditions more common in males?`, ['Males have two X chromosomes', 'Males have one X, so one recessive allele is expressed', 'The Y carries the allele', 'Females inactivate both Xs'], 1, R`Hemizygous.`, R`Males are hemizygous: there is no second X to mask the allele.`),
    N('core', 'Map distance', R`A test cross gives 400 offspring, 60 of them recombinant. How far apart are the genes?`, 15, 'cM', R`1% recombination = 1 cM.`, R`$60/400 = 15\%$, so 15 cM.`),
    N('olympiad', 'Expected doubles', R`Genes are ordered A–B–C with A–B 10 cM and B–C 20 cM. With no interference, how many double crossovers do you expect among 1000 test-cross offspring?`, 20, '', R`Multiply the single-interval frequencies.`, R`$0.10 \times 0.20 \times 1000 = 20$.`)
  ]);
  X('bio-popgen', [
    M('concept', 'Hardy–Weinberg', R`Which is an assumption of Hardy–Weinberg equilibrium?`, ['Strong selection', 'Small population', 'Random mating', 'High mutation'], 2, R`It describes a population with no evolutionary forces.`, R`Random mating (plus large size, no selection, migration or mutation).`),
    N('core', 'Carriers', R`A recessive condition affects 1 in 2500 people. What fraction are carriers?`, 2 * 0.98 * 0.02, '', R`$q^2 = 1/2500$.`, R`$q = 0.02$, $2pq = ${f(0.0392)}$, about 1 in 26.`),
    N('olympiad', 'Lethal recessive', R`A recessive lethal has frequency 0.10. With complete selection against homozygotes, what is its frequency after 10 generations?`, 0.1 / (1 + 10 * 0.1), '', R`$q_n = q_0/(1 + nq_0)$.`, R`$0.10/2 = 0.050$: selection against rare recessives is slow.`)
  ]);
  X('bio-circulation', [
    M('concept', 'Bohr effect', R`More CO₂ in the blood shifts the oxygen dissociation curve…`, ['left, raising affinity', 'right, lowering affinity', 'up', 'not at all'], 1, R`Active tissues need oxygen unloaded.`, R`To the right: haemoglobin releases O₂ more readily.`),
    N('core', 'Cardiac output', R`A heart beats 72 times per minute with a stroke volume of 70 mL. Find the cardiac output in L/min.`, 72 * 0.07, 'L/min', R`CO = HR × SV.`, R`$72\times70 = 5040$ mL/min $= ${f(5.04)}$ L/min.`),
    N('olympiad', 'Fick principle', R`O₂ consumption is 250 mL/min, arterial O₂ content 200 mL/L and mixed venous 150 mL/L. Find the cardiac output.`, 5, 'L/min', R`CO = V̇O₂ / (C<sub>a</sub> − C<sub>v</sub>).`, R`$250/50 = 5.0$ L/min.`)
  ]);
  const Vg = 61.5 * Math.log10((5 + 0.04 * 145) / (140 + 0.04 * 15));
  X('bio-nerves', [
    M('concept', 'Depolarisation', R`The rising phase of an action potential is caused by…`, ['K⁺ leaving', 'Na⁺ entering', 'Cl⁻ entering', 'the Na⁺/K⁺ pump'], 1, R`Voltage-gated channels open.`, R`Na⁺ flowing in through voltage-gated Na⁺ channels.`),
    N('core', 'Conduction time', R`A myelinated axon conducts at 50 m/s. How long does a signal take to travel 1.2 m from spine to foot, in ms?`, 24, 'ms', R`t = d/v.`, R`$1.2/50 = 0.024$ s $= 24$ ms.`),
    N('olympiad', 'Goldman', R`Use the Goldman equation at 37 °C with P<sub>K</sub> : P<sub>Na</sub> = 1 : 0.04, [K⁺] 5 out / 140 in, [Na⁺] 145 out / 15 in (mM). Find the resting potential (ignore Cl⁻).`, Vg, 'mV', R`$V = 61.5\log\dfrac{P_K[K]_o + P_{Na}[Na]_o}{P_K[K]_i + P_{Na}[Na]_i}$.`, R`$V = 61.5\log(10.8/140.6) = ${f(Vg)}$ mV.`)
  ]);
  X('bio-homeostasis', [
    M('concept', 'ADH', R`ADH acts mainly on…`, ['the glomerulus', 'the collecting duct, increasing water reabsorption', 'the loop of Henle, pumping Na⁺', 'the bladder'], 1, R`It inserts aquaporins.`, R`The collecting duct, adding aquaporins so more water is reabsorbed.`),
    N('core', 'Inulin clearance', R`Urine inulin is 30 mg/mL, plasma inulin 0.25 mg/mL, urine flow 1.0 mL/min. Find the GFR.`, 120, 'mL/min', R`Clearance = UV/P.`, R`$30 \times 1.0/0.25 = 120$ mL/min.`),
    N('olympiad', 'Glucose in urine', R`GFR is 125 mL/min and the tubular maximum for glucose is 1.875 mmol/min. How much glucose is excreted per minute when plasma glucose is 20 mM?`, 0.125 * 20 - 1.875, 'mmol/min', R`Filtered load = GFR × plasma concentration.`, R`Filtered $0.125\times20 = 2.5$ mmol/min; excreted $2.5 - 1.875 = ${f(0.625)}$ mmol/min.`)
  ]);
  X('bio-immunity', [
    M('concept', 'Antibody makers', R`Which cells secrete antibodies?`, ['Helper T cells', 'Plasma cells', 'Macrophages', 'Neutrophils'], 1, R`Differentiated B cells.`, R`Plasma cells, derived from activated B cells.`),
    N('core', 'IgM', R`How many antigen-binding sites does a pentameric IgM molecule have?`, 10, '', R`Each monomer has two.`, R`$5 \times 2 = 10$.`, 0.001),
    N('olympiad', 'Herd immunity', R`A disease has R₀ = 4. What percentage of the population must be immune to stop it spreading?`, 75, '%', R`Need $R_0(1 - p) < 1$.`, R`$p = 1 - 1/R_0 = 75\%$.`)
  ]);
  X('bio-plants', [
    M('concept', 'Xylem', R`Water rises in tall trees mainly by…`, ['root pressure', 'cohesion–tension driven by transpiration', 'active transport in xylem', 'capillarity alone'], 1, R`The xylem is dead tissue.`, R`Cohesion–tension: evaporation from leaves pulls a continuous water column.`),
    N('core', 'Stomatal density', R`30 stomata are counted in a field of view of area 0.12 mm². What is the stomatal density per mm²?`, 250, 'per mm²', R`Divide count by area.`, R`$30/0.12 = 250$ mm⁻².`),
    N('olympiad', 'Pulling water', R`What height of water column (m) can a xylem tension of 1.5 MPa support against gravity alone?`, 1.5e6 / (1000 * 9.8), 'm', R`$P = \rho gh$.`, R`$h = 1.5\times10^6/(1000\times9.8) = ${f(1.5e6 / 9800)}$ m, comfortably more than the tallest trees once friction is added.`)
  ]);
  X('bio-evolution', [
    M('concept', 'Homology', R`Which pair are homologous structures?`, ['Bird wing and butterfly wing', 'Whale flipper and human arm', 'Shark fin and dolphin fin', 'Octopus eye and human eye'], 1, R`Same ancestral origin, possibly different function.`, R`Whale flipper and human arm share the tetrapod limb plan. The others are analogous.`),
    N('core', 'Molecular clock', R`Two species differ at 30 sites in a gene that changes at 1.5 substitutions per million years in each lineage. How long ago did they diverge?`, 10, 'million years', R`Both lineages accumulate changes.`, R`$30/(2\times1.5) = 10$ million years.`),
    M('olympiad', 'Monophyly', R`A monophyletic group (clade) consists of…`, ['all species that look similar', 'an ancestor and all its descendants', 'an ancestor and some of its descendants', 'species from different ancestors'], 1, R`"Reptiles" without birds is the classic counterexample.`, R`An ancestor and all of its descendants. Leaving some out makes it paraphyletic.`)
  ]);
  X('bio-populations', [
    M('concept', 'Fastest growth', R`In logistic growth, the population grows fastest when N equals…`, ['0', 'K/4', 'K/2', 'K'], 2, R`$dN/dt = rN(1 - N/K)$.`, R`K/2, which maximises $N(1 - N/K)$; this is the basis of maximum sustainable yield.`),
    N('core', 'Mark–recapture', R`50 snails are marked and released. Later 40 are caught, 8 of them marked. Estimate the population.`, 250, 'snails', R`Lincoln index: $N = n_1n_2/m$.`, R`$50\times40/8 = 250$.`),
    N('olympiad', 'Doubling time', R`A population grows exponentially at r = 0.020 per day. How long does it take to double?`, Math.LN2 / 0.02, 'days', R`$t_d = \ln2/r$.`, R`$0.693/0.020 = ${f(Math.LN2 / 0.02)}$ days.`)
  ]);
  const simp = 1 - (10 * 9 + 20 * 19 + 30 * 29 + 40 * 39) / (100 * 99);
  X('bio-ecosystems', [
    M('concept', 'Ten per cent', R`Roughly what fraction of energy passes from one trophic level to the next?`, ['1%', '10%', '50%', '90%'], 1, R`Most is lost as heat in respiration.`, R`About 10%, so food chains are short.`),
    N('core', 'Tertiary consumers', R`Producers fix 1.0×10⁶ kJ. With 10% transfer at each step, how much reaches tertiary consumers?`, 1000, 'kJ', R`Three transfers.`, R`$10^6 \times 0.1^3 = 1000$ kJ.`),
    N('olympiad', 'Simpson’s index', R`A community has four species with 10, 20, 30 and 40 individuals. Find Simpson's diversity index $D = 1 - \sum n(n-1)/N(N-1)$.`, simp, '', R`N = 100.`, R`$\sum n(n - 1) = 2900$, $D = 1 - 2900/9900 = ${f(simp)}$.`)
  ]);
  X('bio-signalling', [
    M('concept', 'cAMP', R`Which enzyme makes the second messenger cAMP?`, ['Phospholipase C', 'Adenylyl cyclase', 'Protein kinase A', 'Phosphodiesterase'], 1, R`It is activated by Gs proteins.`, R`Adenylyl cyclase, from ATP.`),
    N('core', 'Amplification', R`One adrenaline molecule activates 10 G proteins; each activates an adenylyl cyclase making 1000 cAMP. How many cAMP molecules result?`, 1e4, '', R`Multiply the stages.`, R`$10\times1000 = 10^4$.`),
    M('olympiad', 'Intracellular receptor', R`Which hormone acts through an intracellular receptor that is a transcription factor?`, ['Insulin', 'Adrenaline', 'Testosterone', 'Glucagon'], 2, R`Lipid-soluble hormones cross the membrane.`, R`Testosterone, a steroid. The others bind cell-surface receptors.`)
  ]);
  const gt = 300 / Math.log2(1e5);
  X('bio-microbes', [
    M('concept', 'Prokaryotes', R`Which do prokaryotic cells lack?`, ['Ribosomes', 'A cell membrane', 'A nucleus', 'DNA'], 2, R`"Pro-karyon": before the kernel.`, R`A membrane-bound nucleus; their DNA lies in a nucleoid.`),
    N('core', 'Bacterial growth', R`Bacteria double every 20 minutes. Starting with 100 cells, how many are there after 3 hours of exponential growth?`, 100 * Math.pow(2, 9), 'cells', R`Count the generations.`, R`9 generations: $100 \times 2^9 = 51\,200$.`),
    N('olympiad', 'Generation time', R`A culture grows from 10³ to 10⁸ cells in 5.0 hours. What is the generation time in minutes?`, gt, 'min', R`Number of doublings $= \log_2(10^5)$.`, R`$\log_2 10^5 = ${f(Math.log2(1e5))}$ doublings in 300 min: ${f(gt)} min each.`)
  ]);
  X('bio-plantdiv', [
    M('concept', 'Mosses', R`Which generation is dominant in mosses?`, ['Sporophyte', 'Gametophyte', 'Both equally', 'Neither'], 1, R`The green leafy plant is haploid.`, R`The haploid gametophyte; the sporophyte grows on it.`),
    N('core', 'Endosperm', R`A flowering plant has 2n = 24. How many chromosomes are in its endosperm cells?`, 36, '', R`Double fertilisation gives a triploid endosperm.`, R`3n = 36.`, 0.001),
    M('olympiad', 'Fungal walls', R`Fungal cell walls are made mainly of…`, ['cellulose', 'peptidoglycan', 'chitin', 'silica'], 2, R`Shared with arthropod exoskeletons.`, R`Chitin, one clue that fungi are closer to animals than to plants.`)
  ]);
  X('bio-animaldiv', [
    M('concept', 'Deuterostomes', R`Which phyla are deuterostomes?`, ['Arthropods and molluscs', 'Echinoderms and chordates', 'Annelids and nematodes', 'Cnidarians and sponges'], 1, R`The blastopore becomes the anus.`, R`Echinoderms and chordates (plus hemichordates).`),
    M('core', 'Water vascular system', R`Which phylum has a water vascular system and tube feet?`, ['Cnidaria', 'Mollusca', 'Echinodermata', 'Annelida'], 2, R`Starfish.`, R`Echinodermata.`),
    M('olympiad', 'Arthropod body cavity', R`The main body cavity of an arthropod is…`, ['a true coelom filled with coelomic fluid', 'a haemocoel filled with haemolymph', 'a pseudocoel', 'absent'], 1, R`Their circulation is open.`, R`A haemocoel; the true coelom is reduced to small spaces around the gonads and excretory organs.`)
  ]);
  X('bio-digestion', [
    M('concept', 'Pepsin', R`Pepsin works best…`, ['in the mouth, at pH 7', 'in the stomach, at pH about 2', 'in the small intestine, at pH 8', 'in the colon'], 1, R`It is secreted as pepsinogen and activated by acid.`, R`In the stomach at pH about 2.`),
    N('core', 'Energy in food', R`A snack has 10 g of fat (37 kJ/g) and 30 g of carbohydrate (17 kJ/g). How much energy does it provide?`, 880, 'kJ', R`Sum each nutrient's mass × energy density.`, R`$370 + 510 = 880$ kJ.`),
    M('olympiad', 'Bicarbonate', R`Which hormone stimulates the pancreas to secrete bicarbonate-rich fluid?`, ['Gastrin', 'Secretin', 'Cholecystokinin', 'Insulin'], 1, R`Released when acid reaches the duodenum.`, R`Secretin, the first hormone ever discovered (Bayliss and Starling, 1902).`)
  ]);
  X('bio-reproduction', [
    M('concept', 'Ovulation', R`What directly triggers ovulation?`, ['A fall in progesterone', 'An LH surge', 'A rise in hCG', 'Oxytocin'], 1, R`High oestrogen switches the pituitary to positive feedback.`, R`The mid-cycle LH surge.`),
    N('core', 'Gametes from meiosis', R`How many sperm are made from 50 primary spermatocytes?`, 200, 'sperm', R`Each meiosis gives four.`, R`$50 \times 4 = 200$ (whereas 50 primary oocytes give only 50 eggs).`, 0.001),
    M('olympiad', 'Germ layers', R`The nervous system develops from which germ layer?`, ['Endoderm', 'Mesoderm', 'Ectoderm', 'Trophoblast'], 2, R`The neural tube folds from the outer layer.`, R`Ectoderm, via the neural plate.`)
  ]);
  X('bio-plantgrowth', [
    M('concept', 'Phototropism', R`A shoot bends towards light because auxin…`, ['is destroyed on the shaded side', 'moves to the shaded side and stimulates elongation there', 'inhibits growth on the shaded side', 'moves to the lit side'], 1, R`Cells grow more on one side.`, R`Auxin moves laterally to the shaded side, where cells elongate more.`),
    M('core', 'Short-day plants', R`A short-day plant flowers when…`, ['the day is shorter than a critical length', 'the night is longer than a critical length', 'the night is interrupted by red light', 'the day is longer than the night'], 1, R`It is really night length that matters.`, R`When the uninterrupted night exceeds a critical length; a flash of red light at night prevents flowering.`),
    N('olympiad', 'Embryo sac', R`How many nuclei does a typical mature angiosperm embryo sac contain?`, 8, '', R`Seven cells, one of them binucleate.`, R`8: egg, 2 synergids, 3 antipodals and 2 polar nuclei in the central cell.`, 0.001)
  ]);
  X('bio-behaviour', [
    M('concept', 'Imprinting', R`Goslings following the first moving object they see is an example of…`, ['classical conditioning', 'imprinting', 'habituation', 'insight learning'], 1, R`Lorenz.`, R`Imprinting, learning during a critical period.`),
    N('core', 'Hamilton’s rule', R`Helping a half-sibling (r = 0.25) costs 2 offspring. What is the minimum benefit to the half-sibling for the gene for helping to spread?`, 8, 'offspring', R`$rB > C$.`, R`$B > C/r = 2/0.25 = 8$.`),
    N('olympiad', 'Hawks and doves', R`In the hawk–dove game, the resource is worth V = 4 and injury costs C = 10. What is the evolutionarily stable frequency of hawks?`, 0.4, '', R`At the ESS, hawks and doves have equal payoffs.`, R`$p = V/C = 0.4$.`)
  ]);
})();
