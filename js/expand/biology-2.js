/* Expanded text for biology 11–19: linkage, population genetics, circulation, nerves, homeostasis,
   immunity, plant transport, evolution, populations. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('bio-linkage', {
    0: { html: R`<h3 class="sub">Recombination frequency as a map distance</h3>
<p>Genes on the same chromosome tend to be inherited together, so a dihybrid test cross gives mostly <strong>parental</strong> combinations and fewer <strong>recombinants</strong> (made by crossing over between the two loci). The further apart two genes are, the more likely a crossover falls between them, so the recombination frequency measures distance:</p>
<div class="key"><p>recombination frequency $= \dfrac{\text{recombinant offspring}}{\text{total offspring}}$; 1% = 1 map unit (centimorgan).</p></div>
<div class="worked"><p>A test cross AaBb × aabb gives AB 412, ab 398, Ab 92, aB 98. How far apart are the genes?</p>
<p>Parental types are the common ones (AB and ab), so the F₁ had A and B on the same chromosome. Recombinants $92 + 98 = 190$ out of 1000: 19 map units.</p></div>
<p>Recombination frequency never exceeds 50%: genes far apart on a chromosome behave as if unlinked, because odd and even numbers of crossovers between them become equally likely. Thomas Morgan's student Alfred Sturtevant drew the first genetic map in 1913, as an undergraduate, overnight.</p>` },
    1: { html: R`<h3 class="sub">Ordering three genes</h3>
<p>With three linked genes, the rarest classes of offspring are the <strong>double crossovers</strong>. Compared with the parental types, a double crossover swaps only the <em>middle</em> gene, which identifies the gene order directly.</p>
<div class="worked"><p>Parental classes are ABC and abc; the rarest classes are AbC and aBc. Which gene is in the middle?</p>
<p>The double crossovers differ from the parents only at B, so the order is A–B–C.</p></div>
<p>Distances then come from adding single and double crossovers for each interval (doubles count in both). Often fewer double crossovers appear than the product of the two single-interval frequencies predicts: one crossover suppresses another nearby (<strong>interference</strong>). The coefficient of coincidence is observed doubles ÷ expected doubles, and interference $= 1 -$ coefficient of coincidence.</p>
<div class="worked"><p>Intervals of 10 and 20 map units are expected to give $0.1\cdot0.2 = 2\%$ double crossovers. In 1000 offspring only 12 appear. Find the interference.</p>
<p>Coincidence $12/20 = 0.6$, interference $0.4$.</p></div>` },
    2: { html: R`<h3 class="sub">Sex linkage in practice</h3>
<p>In mammals, females are XX and males XY. The X carries about 800 protein-coding genes and the Y very few, so a male has just one copy of each X-linked gene (he is <strong>hemizygous</strong>). A single recessive allele therefore shows in a male, which is why red–green colour blindness affects about 8% of men of European ancestry but only about 0.5% of women ($0.08^2 \approx 0.0064$).</p>
<div class="worked"><p>A carrier woman (X<sup>H</sup>X<sup>h</sup>) and an unaffected man (X<sup>H</sup>Y) have children. What are the chances for sons and daughters with haemophilia?</p>
<p>Sons get Y from the father and either X from the mother: half the sons are affected. Daughters get X<sup>H</sup> from the father: none are affected, but half are carriers.</p></div>
<p>A father never passes an X-linked allele to his sons. In female mammals one X in each cell is switched off at random early in development (<strong>X-inactivation</strong>), so carriers are mosaics: tortoiseshell cats, almost always female, have orange and black patches from different active X chromosomes. Birds use a different system: females are ZW, males ZZ.</p>` },
    3: { html: R`<h3 class="sub">Reading a pedigree</h3>
<p>Look for these clues in order:</p>
<ul><li>Two unaffected parents with an affected child: the trait is <strong>recessive</strong>.</li>
<li>Two affected parents with an unaffected child: <strong>dominant</strong>.</li>
<li>An affected mother with an unaffected son, or an affected daughter with an unaffected father: <strong>not X-linked recessive</strong>.</li>
<li>Mostly males affected, passed through carrier mothers and never father to son: suggests X-linked recessive.</li></ul>
<div class="worked"><p>Two unaffected parents have an affected daughter and an unaffected son. What is the chance the son is a carrier?</p>
<p>The trait is autosomal recessive (an affected daughter of an unaffected father rules out X-linked). Both parents are Aa. The son is not aa, so among AA : Aa : Aa he is a carrier with probability $\tfrac23$.</p></div>
<p>That $\tfrac23$, not $\tfrac12$, is the classic trap: knowing the phenotype removes the aa outcome. Genetic counsellors use exactly this conditional reasoning.</p>` }
  });

  X('bio-popgen', {
    0: { html: R`<h3 class="sub">Using Hardy–Weinberg</h3>
<p>For a gene with two alleles of frequencies $p$ and $q$ ($p + q = 1$), random mating gives genotype frequencies $p^2$ (AA), $2pq$ (Aa) and $q^2$ (aa), and these stay constant from generation to generation, provided there is no selection, mutation, migration or drift, and mating is random. Real populations break the assumptions, so departures from the prediction are clues that evolution is happening.</p>
<div class="worked"><p>Cystic fibrosis affects about 1 in 2500 births in populations of European ancestry. What fraction of people are carriers?</p>
<p>$q^2 = 1/2500$, so $q = 0.02$ and $p = 0.98$. Carriers: $2pq = 0.039$, about 1 in 25. Most copies of a rare recessive allele hide in heterozygotes, which is why selection against it is so slow.</p></div>
<p>To test whether a population fits, compare observed genotype counts with $p^2N$, $2pqN$, $q^2N$ using χ² (with 1 degree of freedom, since $p$ was estimated from the data).</p>` },
    1: { html: R`<h3 class="sub">How fast selection works</h3>
<p>Selection changes allele frequencies when genotypes differ in <strong>fitness</strong> (relative reproductive success). Against a recessive allele, selection is fast while the allele is common but crawls when it is rare, because rare recessive alleles are almost all in heterozygotes, invisible to selection. With complete selection against aa, $q$ falls from $q_0$ to $q_0/(1 + nq_0)$ after $n$ generations.</p>
<div class="worked"><p>How many generations of removing every aa individual would reduce $q$ from 0.02 to 0.01?</p>
<p>$\tfrac1{q_n} = \tfrac1{q_0} + n$: from 50 to 100 needs $n = 50$ generations. Eugenic programmes that tried this were futile as well as cruel.</p></div>
<p><strong>Heterozygote advantage</strong> keeps harmful alleles common: carriers of the sickle-cell allele are protected against malaria, so in malarial regions the allele reaches frequencies of 10–20%. Selection can be <strong>directional</strong> (favouring one extreme), <strong>stabilising</strong> (favouring the middle, as with human birth weight) or <strong>disruptive</strong> (favouring both extremes).</p>` },
    2: { html: R`<h3 class="sub">Drift, bottlenecks and founders</h3>
<p>In a finite population, which alleles get passed on is partly luck. Each generation's frequencies are a random sample of the last, so they wander; eventually one allele is <strong>fixed</strong> and the others are lost. The smaller the population, the faster this happens. A neutral new mutation is eventually fixed with probability equal to its starting frequency, $1/(2N)$ for a single new copy.</p>
<div class="worked"><p>Northern elephant seals were hunted down to about 20 animals in the 1890s; there are now over 200 000. What would you predict about their genetic variation?</p>
<p>Very low, because the <strong>bottleneck</strong> lost most alleles by chance, and the population regrew from the few that remained. That is exactly what is found.</p></div>
<p>A <strong>founder effect</strong> is a bottleneck caused by a small group starting a new population: Ellis–van Creveld syndrome (extra fingers, short stature) is common among the Old Order Amish of Pennsylvania because one of about 200 founders carried the allele. Drift matters most for neutral alleles and small populations; selection dominates in large ones.</p>` },
    3: { html: R`<h3 class="sub">Gene flow and inbreeding</h3>
<p><strong>Migration</strong> (gene flow) mixes populations: if a fraction $m$ of each generation are migrants with allele frequency $q_m$, the local frequency moves towards $q_m$: $q' = (1 - m)q + mq_m$. Even one migrant per generation is enough to stop populations drifting far apart, which is why conservationists move animals between isolated reserves.</p>
<div class="worked"><p>An island population has $q = 0.6$; 10% of each generation arrive from the mainland where $q = 0.2$. What is $q$ after one generation?</p>
<p>$0.9\cdot0.6 + 0.1\cdot0.2 = 0.56$. The gap to the mainland shrinks by 10% each generation: 0.4, 0.36, 0.324, …</p></div>
<p><strong>Inbreeding</strong> (mating between relatives) does not change allele frequencies but increases homozygosity: the inbreeding coefficient $F$ is the chance that two alleles in an individual are identical copies of one ancestral allele. Homozygotes are then $q^2 + Fpq$ instead of $q^2$. For a child of first cousins $F = 1/16$, so a rare recessive disease becomes many times more common: <strong>inbreeding depression</strong>, seen in cheetahs, royal dynasties and endangered species.</p>` }
  });

  X('bio-circulation', {
    0: { html: R`<h3 class="sub">Breathing mechanics and lung volumes</h3>
<p>Breathing in is active: the diaphragm contracts and flattens and the external intercostal muscles raise the ribs, increasing the volume of the chest; pressure in the lungs drops below atmospheric and air flows in (Boyle's law). Quiet breathing out is passive: the muscles relax and the elastic lungs recoil.</p>
<p>A <strong>spirometer</strong> measures lung volumes: <strong>tidal volume</strong> (about 0.5 L at rest), <strong>vital capacity</strong> (the largest breath, about 4–5 L) and the <strong>residual volume</strong> that always remains (about 1.2 L).</p>
<div class="key"><p>pulmonary ventilation = tidal volume × breathing rate</p></div>
<div class="worked"><p>At rest, tidal volume is 0.5 L and the rate 12 breaths per minute; 0.15 L of each breath fills the airways (dead space). How much fresh air reaches the alveoli each minute?</p>
<p>Total ventilation 6 L min⁻¹, but alveolar ventilation is $(0.5 - 0.15)\cdot12 = 4.2$ L min⁻¹. Deep, slow breathing is more efficient than shallow, fast breathing because less is wasted in dead space.</p></div>` },
    1: { html: R`<h3 class="sub">Reading the dissociation curve</h3>
<p>Each haemoglobin molecule carries up to four O<sub>2</sub>. Binding is <strong>cooperative</strong>: once one O<sub>2</sub> binds, the shape change makes the rest bind more easily, giving an S-shaped (sigmoid) curve. In the lungs (partial pressure about 13 kPa) haemoglobin is about 98% saturated; in resting tissues (5 kPa) about 75%, so a quarter of the oxygen is unloaded; in exercising muscle (2 kPa) far more.</p>
<p>The <strong>Bohr effect</strong>: CO<sub>2</sub> and acid shift the curve right, so haemoglobin releases oxygen more readily in active tissues, exactly where it is needed. Most CO<sub>2</sub> travels as hydrogencarbonate ions, made in red cells by carbonic anhydrase.</p>
<div class="worked"><p>Why is fetal haemoglobin's curve to the left of the mother's, and myoglobin's further left still?</p>
<p>A left-shifted curve means higher affinity: the fetus must pull oxygen from its mother's blood at the placenta, and myoglobin stores oxygen in muscle, releasing it only when levels fall very low. Llamas living at high altitude also have left-shifted haemoglobin.</p></div>
<p>Carbon monoxide binds haemoglobin about 250 times more strongly than oxygen, which makes it deadly even at low concentrations.</p>` },
    2: { html: R`<h3 class="sub">The cardiac cycle and its control</h3>
<p>The heartbeat starts in the <strong>sinoatrial node</strong> (the pacemaker), spreads across the atria, which contract, and is delayed about 0.1 s at the <strong>atrioventricular node</strong> so that the atria finish emptying. It then travels down the bundle of His and the Purkyne fibres to the apex, so the ventricles contract from the bottom up, squeezing blood towards the arteries. Valves open and close purely by pressure differences; their closing makes the "lub-dub" sounds.</p>
<div class="key"><p>cardiac output = stroke volume × heart rate</p></div>
<div class="worked"><p>At rest a heart pumps 70 mL per beat at 72 beats per minute. During exercise output reaches 25 L min⁻¹ at 180 beats per minute. Find both outputs and the exercise stroke volume.</p>
<p>Rest: $0.07\cdot72 = 5.0$ L min⁻¹. Exercise stroke volume $25/180 = 0.14$ L, doubled, because the ventricles fill more and contract harder.</p></div>
<p>The rate is set by the medulla through the autonomic nerves: sympathetic nerves and adrenaline speed it; the vagus nerve slows it. An <strong>ECG</strong> records the electrical waves: P (atria depolarise), QRS (ventricles depolarise) and T (ventricles recover).</p>` },
    3: { html: R`<h3 class="sub">Capillaries, pressure and tissue fluid</h3>
<p>Arteries have thick, elastic walls that smooth the pulsing flow; arterioles control where blood goes by constricting or dilating; capillaries are one cell thick for exchange; veins have low pressure, wide lumens and valves, relying on squeezing by skeletal muscles to return blood.</p>
<p>Flow through a tube follows <strong>Poiseuille's law</strong>: flow $\propto r^4$, so halving a vessel's radius cuts flow sixteenfold. That is why small changes in arteriole diameter control blood distribution so powerfully, and why narrowed arteries (atherosclerosis) are so dangerous.</p>
<div class="worked"><p>At the arterial end of a capillary the blood pressure is 4.3 kPa and the osmotic pull of plasma proteins 3.3 kPa; at the venous end the pressure is 1.6 kPa. Which way does fluid move at each end?</p>
<p>Arterial end: net 1.0 kPa outwards, forming tissue fluid. Venous end: net 1.7 kPa inwards, so most fluid returns. The rest drains into the <strong>lymphatic system</strong>; if it fails (or plasma proteins fall, as in starvation) fluid builds up (oedema).</p></div>` }
  });

  X('bio-nerves', {
    0: { html: R`<h3 class="sub">The action potential, ion by ion</h3>
<p>A stimulus depolarises the membrane. If it reaches the <strong>threshold</strong> (about −55 mV), voltage-gated Na⁺ channels open, Na⁺ rushes in, and the depolarisation opens still more channels: positive feedback drives the membrane to about +40 mV. Na⁺ channels then inactivate and voltage-gated K⁺ channels open; K⁺ flows out and the membrane repolarises, briefly overshooting (<strong>hyperpolarisation</strong>) before the pump and leak channels restore the resting potential.</p>
<p>Action potentials are <strong>all-or-nothing</strong>: a stronger stimulus does not make a bigger spike but more frequent ones. The <strong>refractory period</strong> (while Na⁺ channels are inactivated) limits the frequency to a few hundred per second and makes impulses travel one way only.</p>
<div class="worked"><p>Hodgkin and Huxley worked out the mechanism using giant axons of squid. Why squid?</p>
<p>The axons are up to 1 mm across, wide enough to thread an electrode inside and change the solutions around them. Their equations (Nobel 1963) still describe neurons today.</p></div>` },
    1: { html: R`<h3 class="sub">Faster nerves</h3>
<p>Speed rises with axon diameter (less internal resistance), which is why squid evolved giant axons. Vertebrates found a better solution: <strong>myelin</strong>, layers of Schwann-cell membrane wrapped around the axon, insulating it. Ion exchange happens only at the gaps (nodes of Ranvier), about 1 mm apart, and the impulse jumps from node to node: <strong>saltatory conduction</strong>.</p>
<div class="worked"><p>A myelinated human motor neuron conducts at 100 m s⁻¹; an unmyelinated pain fibre at 1 m s⁻¹. How long does each signal take to travel 1 m from foot to spinal cord?</p>
<p>10 ms against 1 s: which is why you feel a stubbed toe's sharp touch before the slow ache arrives.</p></div>
<p>Myelin also saves energy, since ions move only at nodes, so the pumps restore less. In <strong>multiple sclerosis</strong> the immune system destroys myelin in the brain and spinal cord, slowing or blocking signals.</p>` },
    2: { html: R`<h3 class="sub">How synapses process information</h3>
<p>An action potential reaching the presynaptic terminal opens Ca²⁺ channels; Ca²⁺ triggers vesicles to release neurotransmitter, which diffuses across the 20 nm cleft and binds receptors, opening ion channels in the postsynaptic membrane. Enzymes (acetylcholinesterase for acetylcholine) or reuptake pumps clear the transmitter, ending the signal.</p>
<p>Excitatory synapses depolarise the next neuron; inhibitory ones (often using GABA) hyperpolarise it. One small input rarely reaches threshold, so a neuron <strong>sums</strong> its inputs: over time (<strong>temporal</strong> summation, rapid repeated firing) and over space (<strong>spatial</strong> summation, many synapses at once). Synapses make signals one-way, filter out weak noise and let learning change connection strengths.</p>
<div class="worked"><p>SSRI antidepressants block serotonin reuptake. Organophosphate insecticides block acetylcholinesterase. What does each do at the synapse?</p>
<p>Both keep transmitter in the cleft longer. For SSRIs this boosts serotonin signalling; for organophosphates, acetylcholine floods muscle synapses, causing uncontrolled contraction and paralysis.</p></div>` },
    3: { html: R`<h3 class="sub">Sliding filaments and the energy of contraction</h3>
<p>A muscle fibre is packed with myofibrils divided into <strong>sarcomeres</strong>: thin <strong>actin</strong> filaments anchored at the Z lines overlap thick <strong>myosin</strong> filaments. An impulse spreads into the fibre along T-tubules and releases Ca²⁺ from the sarcoplasmic reticulum. Ca²⁺ binds troponin, which moves tropomyosin off actin's binding sites. Myosin heads attach, pivot (the power stroke, pulling actin towards the centre), detach when a new ATP binds, and re-cock as it is hydrolysed. Filaments slide; they do not shorten.</p>
<div class="worked"><p>During contraction, which bands of the sarcomere shorten?</p>
<p>The I band (actin only) and H zone (myosin only) shrink as the overlap grows; the A band (the length of myosin) stays the same. This observation (Huxley and Huxley, 1954) established the sliding-filament theory.</p></div>
<p>Without ATP, myosin cannot let go: the cause of <strong>rigor mortis</strong>. Muscles keep a small store of <strong>creatine phosphate</strong> to regenerate ATP for the first few seconds of sprinting, before glycolysis and respiration catch up. Slow-twitch fibres (many mitochondria, myoglobin, red) resist fatigue; fast-twitch fibres (glycolytic, pale) are powerful but tire quickly.</p>` }
  });

  X('bio-homeostasis', {
    0: { html: R`<h3 class="sub">Hormones compared with nerves</h3>
<p>Homeostasis keeps internal conditions within narrow limits by <strong>negative feedback</strong>: a receptor detects a change, a coordinator compares it with the set point, and effectors reverse it. <strong>Positive feedback</strong> amplifies change instead and is used only to finish something quickly: oxytocin and contractions in childbirth, blood clotting, the upstroke of an action potential.</p>
<div class="table-wrap"><table class="data"><tr><th></th><th>Nervous</th><th>Hormonal</th></tr>
<tr><td>Signal</td><td>electrical impulses, transmitters</td><td>chemicals in the blood</td></tr>
<tr><td>Speed</td><td>milliseconds</td><td>seconds to hours</td></tr><tr><td>Duration</td><td>brief</td><td>often long-lasting</td></tr>
<tr><td>Targets</td><td>specific cells via neurons</td><td>any cell with the receptor</td></tr></table></div>
<p>The <strong>hypothalamus</strong> links the two: it controls the pituitary, whose hormones command other glands. Thyroid control is a classic loop: TRH from the hypothalamus → TSH from the pituitary → thyroxine from the thyroid, which in turn suppresses TRH and TSH.</p>
<div class="worked"><p>Iodine deficiency means the thyroid cannot make thyroxine. Why does the thyroid then swell (goitre)?</p>
<p>Low thyroxine removes the negative feedback, so TSH stays high and keeps stimulating the gland to grow.</p></div>` },
    1: { html: R`<h3 class="sub">Insulin, glucagon and diabetes</h3>
<p>Blood glucose is held near 5 mmol L⁻¹ (about 90 mg per 100 mL). After a meal, β cells in the pancreatic islets release <strong>insulin</strong>: cells take up glucose (more GLUT4 transporters are inserted into muscle and fat membranes), and the liver stores it as glycogen (glycogenesis). Between meals α cells release <strong>glucagon</strong>: the liver breaks down glycogen (glycogenolysis) and makes new glucose from amino acids and glycerol (gluconeogenesis). Adrenaline also raises glucose in emergencies.</p>
<p><strong>Type 1 diabetes</strong> is autoimmune destruction of β cells, treated with insulin. <strong>Type 2</strong> (about 90% of cases) is insulin resistance, linked to obesity and inactivity, treated first with diet, exercise and drugs such as metformin.</p>
<div class="worked"><p>In a glucose tolerance test a person drinks 75 g of glucose. Blood glucose peaks at 8 mmol L⁻¹ and is back to 5 after 2 hours in one person; in another it peaks at 14 and is still 12 after 2 hours. Interpret.</p>
<p>The first is normal; the second has diabetes (a 2-hour value above 11.1 mmol L⁻¹ is diagnostic): insulin is missing or ineffective.</p></div>` },
    2: { html: R`<h3 class="sub">Keeping warm and keeping cool</h3>
<p>The hypothalamus monitors blood temperature (and receives signals from skin receptors). When too hot: sweating (evaporation), vasodilation of skin arterioles (more blood near the surface to radiate heat), hairs lie flat. When too cold: shivering (heat from muscle respiration), vasoconstriction, hairs erected, and in the longer term more thyroxine raises metabolic rate. Babies also burn brown fat.</p>
<p><strong>Endotherms</strong> (mammals, birds) generate heat internally and keep a constant body temperature at a high energy cost. <strong>Ectotherms</strong> (reptiles, fish, insects) rely on the environment, regulating by behaviour: basking, seeking shade, orienting their bodies to the sun. They need far less food (a python can live a year on a few meals) but are sluggish in the cold.</p>
<div class="worked"><p>Why does a fever help fight infection, and why does the patient shiver as it starts?</p>
<p>Many pathogens grow less well at higher temperature, and some immune responses speed up. Chemicals from immune cells raise the hypothalamus's set point; until the body reaches it, normal temperature is sensed as "too cold".</p></div>` },
    3: { html: R`<h3 class="sub">Concentrating urine</h3>
<p>Each kidney has about a million <strong>nephrons</strong>. In the glomerulus, high pressure forces plasma (minus cells and large proteins) into the Bowman's capsule: <strong>ultrafiltration</strong>, about 180 L per day. The proximal tubule reabsorbs all the glucose and amino acids and most salt and water by active transport and co-transport, using its microvilli and many mitochondria. The <strong>loop of Henle</strong> pumps Na⁺ and Cl⁻ out of the ascending limb (which is impermeable to water) into the medulla, building a salt gradient that becomes saltier deeper in the kidney.</p>
<p>Collecting ducts pass through this gradient. <strong>ADH</strong> from the posterior pituitary inserts water channels (aquaporins) into their walls, so water leaves by osmosis and urine becomes concentrated. Dehydration raises ADH; drinking lots lowers it, and alcohol suppresses it.</p>
<div class="worked"><p>Desert kangaroo rats almost never drink. What would you predict about their nephrons?</p>
<p>Very long loops of Henle, which build a steeper medullary gradient, so their urine can be about five times more concentrated than ours. They also get water from respiring the seeds they eat.</p></div>` }
  });

  X('bio-immunity', {
    0: { html: R`<h3 class="sub">The first lines of defence</h3>
<p>Pathogens (bacteria, viruses, fungi, protists, parasitic worms) must first get in. Skin is a tough, dry, acidic barrier; mucous membranes trap microbes in mucus swept away by cilia; stomach acid, tears and saliva contain lysozyme, which digests bacterial walls; harmless bacteria crowd out harmful ones. Blood clotting seals wounds.</p>
<p>Invaders that get through meet <strong>innate</strong> responses, fast but non-specific. Damaged cells and mast cells release histamine, causing <strong>inflammation</strong>: vessels dilate and leak, bringing fluid and white cells, so the area becomes red, hot, swollen and painful. <strong>Phagocytes</strong> (neutrophils and macrophages) recognise common microbial molecules, engulf invaders into vesicles and digest them with lysosome enzymes. Infected cells release <strong>interferons</strong> that warn neighbours to resist viruses.</p>
<div class="worked"><p>Why can people with a low neutrophil count (after chemotherapy) fall seriously ill from bacteria normally harmless?</p>
<p>Neutrophils are the first phagocytes to reach an infection; without them, even bacteria from the gut or skin can multiply unchecked before the slower adaptive response is ready.</p></div>` },
    1: { html: R`<h3 class="sub">B cells, T cells and clonal selection</h3>
<p>Each lymphocyte carries receptors for one particular <strong>antigen</strong>, created by random shuffling of gene segments, so the body holds millions of different lymphocytes before ever meeting a pathogen. Lymphocytes that react to the body's own molecules are destroyed during development (failures cause autoimmune disease).</p>
<p>When a macrophage digests a pathogen, it displays its antigens on its surface (<strong>antigen presentation</strong>). <strong>Helper T cells</strong> with matching receptors bind, divide and release cytokines, which activate the matching <strong>B cells</strong> (to divide into antibody-secreting plasma cells) and <strong>cytotoxic T cells</strong> (which kill infected body cells). This <strong>clonal selection and expansion</strong> takes several days, which is why you feel ill first.</p>
<p><strong>Memory cells</strong> remain afterwards, so a second exposure triggers a faster, larger <strong>secondary response</strong>, often before symptoms appear.</p>
<div class="worked"><p>HIV infects and destroys helper T cells. Why does that lead to AIDS, in which people die of ordinary infections?</p>
<p>Without helper T cells, neither B cells nor cytotoxic T cells are properly activated, so the whole adaptive response collapses.</p></div>` },
    2: { html: R`<h3 class="sub">How antibodies work and how vaccines train us</h3>
<p>An antibody is a Y-shaped protein of four chains (two heavy, two light, held by disulfide bridges). The tips of the Y are the <strong>variable regions</strong>, whose shape matches one antigen; the stem is the constant region that other immune cells recognise. Antibodies <strong>neutralise</strong> toxins and viruses, <strong>agglutinate</strong> bacteria (two binding sites cross-link them into clumps) and <strong>tag</strong> them for phagocytes.</p>
<p><strong>Active immunity</strong> comes from the body's own response (infection or vaccination) and lasts, thanks to memory cells. <strong>Passive immunity</strong> means receiving ready-made antibodies (across the placenta, in breast milk, or as antivenom) and is immediate but fades in weeks. Vaccines present antigens safely: killed or weakened pathogens, isolated proteins, or mRNA instructions that let our cells make one viral protein briefly.</p>
<div class="worked"><p>Why do we need a new flu vaccine every year, but measles vaccination lasts for life?</p>
<p>Flu's surface antigens mutate rapidly (antigenic drift), so old memory cells no longer recognise them. Measles antigens are stable.</p></div>
<p><strong>Monoclonal antibodies</strong>, made by fusing a single B cell with a tumour cell, give unlimited identical antibodies: used in pregnancy tests, rapid COVID tests and cancer treatments.</p>` },
    3: { html: R`<h3 class="sub">The SIR model in numbers</h3>
<p>Epidemiologists split a population into Susceptible, Infected and Recovered. The <strong>basic reproduction number</strong> $R_0$ is the average number of people one case infects in a fully susceptible population: about 1.3 for seasonal flu, 3–6 for early COVID-19, and 12–18 for measles. An epidemic grows while each case infects more than one other person, i.e. while $R_0 \times$ (fraction susceptible) $> 1$.</p>
<div class="key"><p>Herd immunity threshold: $1 - \dfrac{1}{R_0}$</p></div>
<div class="worked"><p>What fraction must be immune to stop measles ($R_0 = 15$), and what vaccination coverage is needed if the vaccine is 97% effective?</p>
<p>$1 - 1/15 = 0.933$; coverage $0.933/0.97 \approx 96\%$. Measles returns quickly when coverage slips just a few per cent below that.</p></div>
<p>Herd immunity protects people who cannot be vaccinated (newborns, those with weakened immune systems). Hand-washing, masks and isolation work by lowering the effective reproduction number without immunity.</p>` }
  });

  X('bio-plants', {
    0: { html: R`<h3 class="sub">How water enters a root</h3>
<p>Root hair cells give a huge surface area. Their cytoplasm has a lower water potential than soil water (because of dissolved minerals and sugars), so water enters by osmosis. Minerals such as nitrate are actively pumped in, which keeps the root's water potential low.</p>
<p>Water then crosses the root cortex by two routes: the <strong>apoplast</strong> (through cell walls and spaces, the main route, with little resistance) and the <strong>symplast</strong> (through cytoplasm via plasmodesmata). At the endodermis a waxy band of suberin, the <strong>Casparian strip</strong>, blocks the apoplast, forcing water and minerals through cell membranes, so the plant controls what enters the xylem.</p>
<div class="worked"><p>Why do over-fertilised plants wilt?</p>
<p>Too much fertiliser lowers the soil water potential below that of root cells, so water moves <em>out</em> of the roots by osmosis (and the plant cannot replace water lost by transpiration).</p></div>
<p>Active pumping of ions into the xylem also creates <strong>root pressure</strong>, which pushes water up a little way and explains why sap oozes from cut stems in spring.</p>` },
    1: { html: R`<h3 class="sub">The cohesion–tension theory</h3>
<p>Water evaporating from leaf cells diffuses out through stomata. This lowers the water potential in the leaf, drawing water from the xylem. Because water molecules hydrogen-bond to each other (<strong>cohesion</strong>) and to xylem walls (<strong>adhesion</strong>), the whole column is pulled up under <strong>tension</strong>, like a rope. Xylem vessels are dead, hollow, end-to-end tubes stiffened with lignin so that they do not collapse under the negative pressure.</p>
<div class="worked"><p>What pressure would be needed to push water to the top of a 100 m redwood, ignoring friction?</p>
<p>$\rho g h = 1000\cdot9.8\cdot100 \approx 1$ MPa (10 atmospheres). Root pressure gives at most 0.2 MPa, so the water must be pulled from above; measured xylem tensions of −1 to −2 MPa fit.</p></div>
<p>Evidence: tree trunks shrink slightly in diameter during the day when transpiration is fastest; cutting a stem draws air <em>in</em> rather than letting water out; and if an air bubble enters a vessel (<strong>cavitation</strong>), that vessel stops conducting. A <strong>potometer</strong> measures water uptake, which approximates transpiration, by timing a bubble along a capillary tube.</p>` },
    2: { html: R`<h3 class="sub">How guard cells open stomata</h3>
<p>In light, guard cells pump K⁺ ions in (powered by proton pumps), and make malate. Their water potential falls, water flows in by osmosis and they swell. Their inner walls are thicker and cellulose microfibrils are arranged radially, so as they swell they bend apart and the pore opens. In the dark, or when the plant is short of water, the hormone <strong>abscisic acid</strong> (ABA) triggers K⁺ to leave, and the stomata close.</p>
<p>Stomata are the plant's central compromise: open, they let in CO<sub>2</sub> for photosynthesis but lose water; closed, they save water but starve photosynthesis. About 98% of the water a plant takes up is lost through them.</p>
<div class="worked"><p>Transpiration is faster on warm, dry, windy, bright days. Explain each factor.</p>
<p>Warmth speeds evaporation and diffusion; dry air steepens the water vapour gradient; wind removes the humid layer around the leaf; light opens stomata.</p></div>
<p><strong>Xerophytes</strong> (desert plants, marram grass) reduce losses with thick waxy cuticles, sunken stomata in pits or rolled leaves trapping humid air, hairs, and fewer or smaller leaves (cactus spines).</p>` },
    3: { html: R`<h3 class="sub">The pressure-flow model</h3>
<p>Phloem carries sugar (mainly sucrose), amino acids and hormones from <strong>sources</strong> (photosynthesising leaves, or storage organs in spring) to <strong>sinks</strong> (roots, fruits, growing tips), in either direction. It is made of living <strong>sieve tube elements</strong>, with perforated end walls (sieve plates) and few organelles, each kept alive by a neighbouring <strong>companion cell</strong> full of mitochondria.</p>
<p>In the <strong>mass-flow</strong> model, companion cells actively load sucrose into sieve tubes at the source (co-transport with protons). This lowers the water potential, so water enters from the xylem by osmosis, building high pressure. At the sink sucrose is removed, water leaves, and pressure falls. Sap flows from high to low pressure.</p>
<div class="worked"><p>Aphids feed by inserting their mouthparts into a single sieve tube. How did scientists use them?</p>
<p>Cutting off a feeding aphid leaves the stylet as a tiny tap: sap oozes out under pressure, showing that the phloem is pressurised and allowing its contents and flow rate (up to 1 m per hour) to be measured.</p></div>
<p>Ringing experiments (removing a ring of bark, and so the phloem) make the bark above the ring swell with trapped sugars, while the tree's roots eventually starve.</p>` },
    4: { html: R`<h3 class="sub">Five hormone families</h3>
<ul><li><strong>Auxins</strong> (IAA): made at shoot tips, stimulate cell elongation, cause tropisms and apical dominance (the top shoot suppresses side shoots, which is why pinching out the tip makes a plant bushier).</li>
<li><strong>Gibberellins</strong>: stem elongation and germination; dwarf varieties of wheat and rice, central to the Green Revolution, have altered gibberellin responses, so they put more energy into grain and do not fall over.</li>
<li><strong>Cytokinins</strong>: cell division, delay leaf ageing.</li>
<li><strong>Abscisic acid</strong>: stress hormone, closes stomata, keeps seeds and buds dormant.</li>
<li><strong>Ethene</strong>: a gas that ripens fruit and triggers leaf fall. One ripe apple speeds ripening of the fruit around it; bananas are shipped green and ripened with ethene at their destination.</li></ul>
<div class="worked"><p>Synthetic auxins such as 2,4-D are used as selective weedkillers on lawns. How can they kill broad-leaved weeds but spare grass?</p>
<p>Broad-leaved plants absorb more and respond more strongly: their growth runs out of control and they die, while grasses are much less sensitive.</p></div>` }
  });

  X('bio-evolution', {
    0: { html: R`<h3 class="sub">Selection in action</h3>
<p>Darwin's argument needs only four facts: individuals vary; much of the variation is inherited; more offspring are produced than can survive; and survival and reproduction depend partly on the variation. Then favoured variants must increase. Selection acts on phenotypes, but only inherited differences evolve.</p>
<div class="worked"><p>Before 1850 almost all peppered moths near Manchester were pale; by 1895 about 98% were dark. After clean-air laws, the dark form fell back below 10%. Explain.</p>
<p>Soot killed the pale lichens and blackened tree bark, so pale moths were easier for birds to see and eat; dark ones survived to breed more. When the air cleared, selection reversed. Release–recapture and predation experiments confirmed the mechanism.</p></div>
<p>Selection is happening now: bacteria evolve antibiotic resistance within years; insects become resistant to pesticides; Galápagos finches' beak sizes shifted measurably after a single drought year (Grant and Grant). Selection is not forward-looking: it can only work on variation already present, and it builds compromises, not perfect designs.</p>` },
    1: { html: R`<h3 class="sub">Lines of evidence</h3>
<ul><li><strong>Fossils</strong>: transitional forms such as Tiktaalik (fish with limb-like fins, found in 375-million-year-old rocks predicted to hold them) and the whale sequence from land mammals with legs to fully aquatic forms.</li>
<li><strong>Anatomy</strong>: <strong>homologous</strong> structures share an underlying plan despite different uses (the same bones in a human arm, a bat wing and a whale flipper); <strong>vestigial</strong> structures (the whale's tiny hip bones, our tailbone) are remnants.</li>
<li><strong>Embryology</strong>: vertebrate embryos all have pharyngeal pouches and tails at early stages.</li>
<li><strong>Molecules</strong>: the universal genetic code; the number of differences in shared proteins and genes matches the branching order from fossils and anatomy.</li>
<li><strong>Biogeography</strong>: island species resemble those of the nearest mainland; marsupials radiated in isolated Australia.</li></ul>
<div class="worked"><p>Bird wings and insect wings both allow flight. Are they homologous?</p>
<p>No, they are <strong>analogous</strong>: similar function, different structure and origin (convergent evolution). Bird and bat wings are homologous as forelimbs but evolved flight independently.</p></div>` },
    2: { html: R`<h3 class="sub">How new species form</h3>
<p>Under the <strong>biological species concept</strong>, a species is a group that can interbreed to produce fertile offspring. Horses and donkeys produce mules, but mules are sterile, so they are separate species. (The concept fails for asexual organisms and fossils, where morphology or DNA is used instead.)</p>
<p>Speciation needs <strong>reproductive isolation</strong>. In <strong>allopatric</strong> speciation a physical barrier (a mountain range, a sea) splits a population, and the parts diverge by different selection, drift and mutation until they could no longer interbreed. In <strong>sympatric</strong> speciation isolation arises within the same area: by different breeding times, behaviours or habitats, or suddenly by <strong>polyploidy</strong> in plants: a plant with doubled chromosomes cannot produce fertile offspring with its parent species.</p>
<div class="worked"><p>Modern bread wheat is hexaploid (6n = 42). How could it have arisen?</p>
<p>By two rounds of hybridisation between different grass species, each followed by chromosome doubling, which restored pairs for meiosis and made the hybrids fertile. Perhaps half of flowering plant species have polyploidy in their ancestry.</p></div>
<p>Isolating mechanisms are classed as <strong>prezygotic</strong> (preventing mating or fertilisation: different songs, seasons or genitals) or <strong>postzygotic</strong> (hybrids are inviable or sterile).</p>` },
    3: { html: R`<h3 class="sub">Building trees and dating them</h3>
<p>A <strong>phylogenetic tree</strong> shows relationships by common ancestry; organisms are grouped by <strong>shared derived characters</strong> (traits that appeared in their common ancestor), not by overall similarity. A <strong>clade</strong> is an ancestor and all its descendants. "Reptiles" excluding birds is not a clade, because birds descend from dinosaurs.</p>
<p>The <strong>molecular clock</strong> uses the fact that neutral mutations accumulate at a roughly steady rate. Calibrated with fossils, the number of differences between two species' DNA estimates when they split.</p>
<div class="worked"><p>A gene differs by 1.2% between humans and chimpanzees and by 4.8% between humans and macaques, which split from our lineage about 25 million years ago. When did humans and chimps split?</p>
<p>Assuming a constant rate, $25\cdot\dfrac{1.2}{4.8} \approx 6$ million years ago, consistent with the oldest hominin fossils.</p></div>
<p>Molecular trees revealed surprises: the three domains of life (Bacteria, Archaea, Eukarya), fungi being closer to animals than to plants, and hippos being the closest living relatives of whales.</p>` }
  });

  X('bio-populations', {
    0: { html: R`<h3 class="sub">Exponential and logistic growth</h3>
<p>With unlimited resources a population grows <strong>exponentially</strong>: $\dfrac{dN}{dt} = rN$, so $N = N_0e^{rt}$, with doubling time $\ln2/r$. Bacteria dividing every 20 minutes would cover the Earth in days, so growth always runs into limits. The <strong>logistic</strong> model adds a carrying capacity $K$:</p>
<div class="key"><p>$\dfrac{dN}{dt} = rN\left(1 - \dfrac{N}{K}\right)$</p></div>
<p>giving an S-shaped curve. Growth is fastest at $N = K/2$, which is why fisheries aim to keep stocks near half their unfished size to maximise the sustainable yield ($rK/4$ per year).</p>
<div class="worked"><p>A fish stock has $K = 100\,000$ tonnes and $r = 0.4$ per year. What is the maximum sustainable yield, and what happens if 15 000 tonnes are taken each year?</p>
<p>MSY $= 0.4\cdot100\,000/4 = 10\,000$ tonnes. Taking 15 000 exceeds the stock's greatest possible growth, so it collapses, as the Newfoundland cod did in 1992.</p></div>` },
    1: { html: R`<h3 class="sub">r and K strategies and survivorship</h3>
<p>Species trade off many offspring against care for each. <strong>r-selected</strong> species (weeds, insects, mice) mature early, have many small offspring and little care, and thrive in unstable habitats. <strong>K-selected</strong> species (elephants, whales, oaks) mature late, have few large offspring with much care, and live near carrying capacity. Most species fall between.</p>
<p><strong>Survivorship curves</strong> plot the number surviving (on a log scale) against age. Type I: most survive to old age (humans, elephants). Type II: constant death rate at every age (many birds). Type III: huge early mortality, few survivors (fish, oysters, trees from seed).</p>
<div class="worked"><p>An oyster releases 100 million eggs a year. If its population is stable, how many of a lifetime's eggs survive to breed, on average?</p>
<p>In a stable population each parent is replaced, on average, by one breeding offspring (two parents per pair, if sexual). From hundreds of millions of eggs, only about one or two survive: a Type III curve in its extreme form.</p></div>` },
    2: { html: R`<h3 class="sub">Mark–recapture and sampling</h3>
<p>For mobile animals, capture and mark a sample of $M$, release them, then later capture a second sample of $n$ and count the marked ones, $m$. If marked animals mixed evenly, $m/n = M/N$, so</p>
<div class="key"><p>$N \approx \dfrac{Mn}{m}$ (the Lincoln–Petersen index)</p></div>
<div class="worked"><p>60 woodlice are marked and released. Next day, 50 are caught, of which 12 are marked. Estimate the population.</p>
<p>$N \approx 60\cdot50/12 = 250$.</p></div>
<p>The method assumes no births, deaths or migration between samples, that marks do not fall off or make animals easier to catch, and that animals mix randomly. For plants and slow animals, ecologists use <strong>quadrats</strong> placed at random coordinates to estimate density or percentage cover, and <strong>transects</strong> (lines with quadrats at intervals) to see how species change across a gradient, such as up a rocky shore.</p>` },
    3: { html: R`<h3 class="sub">Measuring diversity</h3>
<p>Biodiversity includes genetic diversity within species, species diversity, and ecosystem diversity. Counting species (<strong>richness</strong>) ignores how evenly individuals are spread among them. <strong>Simpson's index</strong> captures both:</p>
<div class="key"><p>$D = 1 - \sum\left(\dfrac{n}{N}\right)^2$: the probability that two individuals picked at random are different species.</p></div>
<div class="worked"><p>Site A has 4 species with 25 individuals each; site B has 4 species with counts 85, 5, 5, 5. Compare.</p>
<p>A: $1 - 4\cdot0.25^2 = 0.75$. B: $1 - (0.85^2 + 3\cdot0.05^2) = 1 - 0.73 = 0.27$. Same richness, very different diversity.</p></div>
<p>Biodiversity is lost mainly through habitat destruction, followed by overexploitation, invasive species, pollution and climate change. Conservation works <strong>in situ</strong> (reserves, protected areas, wildlife corridors) and <strong>ex situ</strong> (zoos with breeding programmes, seed banks such as the Svalbard vault, holding over a million seed samples).</p>` }
  });
})();
