/* Expanded text for biology 20–28: ecosystems, cell signalling, microbes, plant diversity,
   animal diversity, digestion, reproduction, plant growth, behaviour. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('bio-ecosystems', {
    0: { html: R`<h3 class="sub">Competition, niches and symbiosis</h3>
<p>A species' <strong>niche</strong> is its role: what it eats, where and when it is active, the conditions it tolerates. Gause's <strong>competitive exclusion principle</strong>: two species with identical niches cannot coexist indefinitely; one outcompetes the other. Coexisting competitors therefore partition resources, as MacArthur found with five warbler species feeding in different parts of the same spruce trees.</p>
<ul><li><strong>Mutualism</strong> (+/+): pollinators and flowers, nitrogen-fixing bacteria in legume roots, the fungi on 90% of plant roots (mycorrhizae).</li>
<li><strong>Commensalism</strong> (+/0): barnacles riding on whales.</li>
<li><strong>Parasitism</strong> (+/−): tapeworms, mistletoe, malaria parasites.</li></ul>
<div class="worked"><p>Red squirrels have declined in Britain since grey squirrels were introduced from North America. Suggest two mechanisms.</p>
<p>Competition: greys digest acorns more efficiently and reach higher densities on the same food. Disease: greys carry squirrelpox, which they survive but which kills reds. Introduced species often succeed because they leave their own predators and parasites behind.</p></div>` },
    1: { html: R`<h3 class="sub">Predator–prey cycles</h3>
<p>Predator and prey numbers often oscillate: as prey increase, predators thrive and multiply; predation then drives prey down; predators starve and decline; prey recover. Predator peaks lag behind prey peaks. The classic data come from Hudson's Bay Company fur records of lynx and snowshoe hare, cycling with a period of about 10 years. The <strong>Lotka–Volterra</strong> equations model this:</p>
<div class="key"><p>$\dfrac{dH}{dt} = aH - bHP$, $\quad\dfrac{dP}{dt} = cbHP - dP$</p></div>
<div class="worked"><p>At what prey and predator numbers are both populations steady?</p>
<p>Set both rates to zero: $P = a/b$ and $H = d/(cb)$. The model orbits around this point instead of settling on it. Hare cycles also depend on their food plants, so real cycles involve three levels.</p></div>
<p>Prey evolve defences (camouflage, toxins with warning colours, shells, mimicry) and predators evolve countermeasures, an evolutionary arms race.</p>` },
    2: { html: R`<h3 class="sub">Productivity and pyramids</h3>
<p><strong>Gross primary productivity</strong> (GPP) is the total rate of photosynthesis; <strong>net primary productivity</strong> NPP = GPP − R (respiration), the energy available to consumers. Only about 10% of the energy at one trophic level reaches the next: the rest is lost as heat from respiration, in uneaten parts, and in faeces.</p>
<div class="key"><p>efficiency $= \dfrac{\text{energy transferred to next level}}{\text{energy at this level}}\times100\%$</p></div>
<div class="worked"><p>Producers in a grassland have NPP 20 000 kJ m⁻² yr⁻¹. With 10% transfers, how much reaches tertiary consumers? Why are there few top predators?</p>
<p>Primary 2000, secondary 200, tertiary 20 kJ m⁻² yr⁻¹. With so little energy, top predators need huge territories: a tiger ranges over tens of square kilometres.</p></div>
<p>This is also why eating plants feeds more people per hectare than eating meat. Livestock farming improves efficiency by limiting movement and keeping animals warm (less respiration), and by feeding high-protein food. Pyramids of energy are always upright; pyramids of numbers can be inverted (one oak supports thousands of caterpillars).</p>` },
    3: { html: R`<h3 class="sub">The nitrogen cycle</h3>
<p>Nitrogen is 78% of air, but most organisms cannot use N<sub>2</sub>. It enters living things by:</p>
<ul><li><strong>Nitrogen fixation</strong>: N<sub>2</sub> → ammonia, by bacteria (free-living Azotobacter, or Rhizobium in legume root nodules), by lightning, and industrially by the Haber process, which now fixes about as much as all natural land processes combined.</li>
<li><strong>Ammonification</strong>: decomposers turn proteins and urea in dead matter and waste into ammonium.</li>
<li><strong>Nitrification</strong>: Nitrosomonas oxidises ammonium to nitrite, and Nitrobacter nitrite to nitrate, which plants absorb. These bacteria need oxygen.</li>
<li><strong>Denitrification</strong>: in waterlogged, oxygen-poor soils, bacteria reduce nitrate back to N<sub>2</sub>.</li></ul>
<div class="worked"><p>Why do farmers plough and drain soils, and rotate cereals with clover or beans?</p>
<p>Aeration favours nitrifying bacteria and stops denitrification, keeping nitrate in the soil. Legumes fix nitrogen in their nodules; ploughing them in returns it to the soil for the next crop.</p></div>
<p>Excess fertiliser washed into rivers causes <strong>eutrophication</strong>: algal blooms block light, plants below die, decomposers multiply and use up oxygen, and fish suffocate.</p>` },
    4: { html: R`<h3 class="sub">From bare rock to forest, and back</h3>
<p><strong>Primary succession</strong> starts on bare ground (new volcanic islands, retreating glaciers). <strong>Pioneer species</strong> such as lichens and mosses tolerate harsh conditions; they weather rock and add organic matter, forming soil. Grasses, then shrubs, then trees follow, each changing conditions in ways that favour their successors. Biodiversity and biomass generally increase until a stable <strong>climax community</strong> (often woodland in temperate regions). <strong>Secondary succession</strong>, after fire or abandoned farmland, is faster because soil remains.</p>
<div class="worked"><p>The volcanic island Surtsey appeared off Iceland in 1963. Scientists have kept people away ever since. Why?</p>
<p>It is a natural experiment in primary succession: they can record exactly which species arrive by wind, sea and birds, and in what order, without human interference. Over 70 plant species have colonised so far.</p></div>
<p>Humans hold many ecosystems at an early stage (grazing, mowing, burning heather moorland), a practice called <strong>deflected succession</strong>. Deforestation, at about 10 million hectares a year, releases carbon, erodes soils, and destroys the most species-rich habitats on Earth.</p>` }
  });

  X('bio-signalling', {
    0: { html: R`<h3 class="sub">One logic, many signals</h3>
<p>Every signalling pathway has the same three stages. <strong>Reception</strong>: a signal molecule (ligand) binds a specific receptor protein. <strong>Transduction</strong>: the receptor changes shape and passes the signal along a chain of relay molecules, often by adding phosphate groups (kinases) or making small second messengers. <strong>Response</strong>: the final targets alter enzyme activity, open channels, rearrange the cytoskeleton or switch genes on.</p>
<p>Signals act at different ranges: <strong>endocrine</strong> (hormones in the blood), <strong>paracrine</strong> (to neighbouring cells, such as growth factors), <strong>autocrine</strong> (on the cell itself) and <strong>contact-dependent</strong> (through membrane proteins or gap junctions).</p>
<div class="worked"><p>Adrenaline makes liver cells release glucose, heart cells beat faster and gut arterioles constrict. How can one signal have such different effects?</p>
<p>Different cells carry different receptor types and different relay and response proteins. The response depends on the receiving cell, not only on the signal.</p></div>` },
    1: { html: R`<h3 class="sub">Where receptors sit</h3>
<p>Water-soluble signals (peptide hormones, adrenaline, neurotransmitters) cannot cross the membrane, so they bind <strong>cell-surface receptors</strong>:</p>
<ul><li><strong>G protein-coupled receptors</strong> (GPCRs): seven-pass membrane proteins that activate a G protein inside the cell. About a third of all prescription drugs target them, from antihistamines to beta-blockers.</li>
<li><strong>Receptor tyrosine kinases</strong>: pairs of receptors that phosphorylate each other when the ligand binds (the insulin and growth-factor receptors). Mutations that leave them permanently on can cause cancer.</li>
<li><strong>Ligand-gated ion channels</strong>: open when the signal binds (the acetylcholine receptor at muscles).</li></ul>
<p>Lipid-soluble signals (steroids such as oestrogen and cortisol, thyroxine) diffuse through the membrane and bind <strong>intracellular receptors</strong>, which travel to the nucleus and act as transcription factors.</p>
<div class="worked"><p>Why does insulin act within minutes, while cortisol takes hours?</p>
<p>Insulin works through a surface receptor that rapidly changes existing proteins (moving glucose transporters to the membrane). Cortisol changes gene transcription, so new proteins must be made.</p></div>` },
    2: { html: R`<h3 class="sub">The cAMP cascade, counted</h3>
<p>When adrenaline binds its receptor on a liver cell, the G protein activates <strong>adenylyl cyclase</strong>, which makes many molecules of <strong>cyclic AMP</strong> (cAMP) from ATP. cAMP activates protein kinase A, which phosphorylates a further kinase, which activates glycogen phosphorylase, which releases glucose from glycogen. Earl Sutherland won the 1971 Nobel prize for discovering cAMP, the first second messenger.</p>
<div class="worked"><p>Suppose each active receptor activates 10 G proteins, each cyclase makes 100 cAMP, and each later step amplifies tenfold over three steps. How many glucose units can one adrenaline molecule release?</p>
<p>$10\cdot100\cdot10^3 = 10^6$, of the order of the hundred-millionfold amplification estimated for the real pathway.</p></div>
<p>Signals must also stop: <strong>phosphodiesterase</strong> breaks down cAMP (caffeine inhibits it, prolonging the signal) and phosphatases remove phosphates. Other second messengers include Ca²⁺ ions, IP<sub>3</sub> and DAG. Cholera toxin locks a G protein permanently on in gut cells; the cAMP flood opens chloride channels, and water follows, causing massive diarrhoea.</p>` },
    3: { html: R`<h3 class="sub">Affinity, cooperativity and dose–response</h3>
<p>For a receptor with dissociation constant $K_d$, the fraction occupied at ligand concentration $[L]$ is $\theta = \dfrac{[L]}{K_d + [L]}$: half the receptors are filled at $[L] = K_d$. When binding is cooperative, as for haemoglobin, the <strong>Hill equation</strong> $\theta = \dfrac{[L]^n}{K^n + [L]^n}$ describes it, with $n > 1$ giving a steep, switch-like response.</p>
<div class="worked"><p>A receptor has $K_d = 2$ nM. What concentration fills 90% of receptors, with no cooperativity and with $n = 4$ (taking $K = 2$ nM)?</p>
<p>$n = 1$: $[L]/(2 + [L]) = 0.9$ gives $[L] = 18$ nM. $n = 4$: $([L]/2)^4 = 9$ gives $[L] = 2\cdot9^{1/4} \approx 3.5$ nM. Cooperativity compresses the range from half to nearly full response.</p></div>
<p>Pharmacologists describe drugs by their <strong>EC₅₀</strong> (concentration giving half the maximum effect). <strong>Agonists</strong> activate receptors; <strong>antagonists</strong> block them (beta-blockers block adrenaline's receptors on the heart).</p>` },
    4: { html: R`<h3 class="sub">Programmed cell death</h3>
<p><strong>Apoptosis</strong> is a tidy, controlled suicide. The cell shrinks, its DNA is cut into fragments, and it breaks into membrane-wrapped pieces that phagocytes eat, so nothing leaks to cause inflammation. This is unlike <strong>necrosis</strong>, death from injury, in which cells swell, burst and inflame the tissue.</p>
<p>Apoptosis is carried out by protease enzymes called <strong>caspases</strong>. They are triggered from outside (immune cells signalling through "death receptors") or from inside (DNA damage detected by p53, or stress, makes mitochondria release cytochrome c).</p>
<ul><li>It sculpts the body: the webbing between our fingers dies in the embryo.</li>
<li>It removes immune cells that would attack the body.</li>
<li>It kills cells infected by viruses or with damaged DNA. Billions of cells die this way every day.</li></ul>
<div class="worked"><p>Many cancers have mutations in p53 or overproduce Bcl-2, a protein that blocks apoptosis. Why does that help a tumour?</p>
<p>Cells with damaged DNA that should kill themselves survive and keep dividing, accumulating more mutations. Some modern drugs block Bcl-2 to restore the death signal.</p></div>
<p>Sydney Brenner, Robert Horvitz and John Sulston worked out the genetics of apoptosis in a tiny worm, in which exactly 131 cells die during development (Nobel 2002).</p>` }
  });

  X('bio-microbes', {
    0: { html: R`<h3 class="sub">Viral life cycles</h3>
<p>A virus is genetic material (DNA or RNA) inside a protein coat (capsid), sometimes with a lipid envelope taken from the host. It has no metabolism and can only replicate inside a host cell, so whether viruses are "alive" is debated. A virus attaches to specific receptor proteins (which decides which cells it infects), injects or releases its genome, hijacks the cell's ribosomes and enzymes to make new parts, assembles them and leaves.</p>
<p>In the <strong>lytic</strong> cycle the host bursts, releasing hundreds of new virions. In the <strong>lysogenic</strong> cycle (some bacteriophages) the viral DNA joins the host chromosome and is copied quietly with it until stress triggers the lytic cycle. <strong>Retroviruses</strong> such as HIV use reverse transcriptase to copy their RNA into DNA, which integrates into the host genome. About 8% of the human genome is the remains of ancient retroviruses.</p>
<div class="worked"><p>Why don't antibiotics work against viruses?</p>
<p>Antibiotics target bacterial structures (peptidoglycan walls, 70S ribosomes) that viruses lack. Antivirals must target viral enzymes, such as HIV's reverse transcriptase or flu's neuraminidase.</p></div>` },
    1: { html: R`<h3 class="sub">Inside a bacterium</h3>
<p>The <strong>Gram stain</strong> divides bacteria by wall structure. Gram-positive bacteria have a thick peptidoglycan layer that holds the purple dye. Gram-negative bacteria have a thin layer plus an outer membrane and stain pink. The outer membrane makes Gram-negative bacteria harder to kill with some antibiotics, including penicillin.</p>
<p>Bacteria are named by shape: cocci (spheres), bacilli (rods) and spirilla (spirals). Many have flagella, pili for attachment, and capsules that resist phagocytes. Some form <strong>endospores</strong> that survive boiling for hours, which is why autoclaves use 121 °C under pressure.</p>
<div class="worked"><p>Archaea look like bacteria. Why are they classed as a separate domain?</p>
<p>Their ribosomal RNA, membrane lipids (ether-linked, not ester-linked) and transcription machinery are fundamentally different. In some ways, such as their RNA polymerase, they resemble eukaryotes more than bacteria. Carl Woese recognised this from rRNA sequences in 1977.</p></div>
<p>Most bacteria are harmless or vital: they recycle nutrients, fix nitrogen, make vitamins in our gut and outnumber our own cells.</p>` },
    2: { html: R`<h3 class="sub">Growth curves and resistance</h3>
<p>In a closed culture, bacterial numbers follow four phases:</p>
<ol><li><strong>Lag</strong>: the bacteria adjust and make enzymes.</li>
<li><strong>Exponential (log)</strong>: they double at a constant rate.</li>
<li><strong>Stationary</strong>: nutrients run out and waste builds up, so births equal deaths.</li>
<li><strong>Death</strong>: numbers fall.</li></ol>
<p>Because numbers span many orders of magnitude, the curve is drawn on a log scale.</p>
<div class="worked"><p>A culture grows from $2\times10^3$ to $6.4\times10^4$ cells in 100 minutes of exponential growth. What is the generation time?</p>
<p>The ratio is 32 = $2^5$, so there were five doublings: 20 minutes each.</p></div>
<p>Counts come from serial dilution and plating: each colony grows from one viable cell.</p>
<p>Bacteria share genes <strong>horizontally</strong>:</p>
<ul><li><strong>Transformation</strong>: they take up DNA from their surroundings.</li>
<li><strong>Transduction</strong>: phages carry DNA between them.</li>
<li><strong>Conjugation</strong>: plasmids pass through a pilus.</li></ul>
<p>Resistance genes on plasmids therefore spread between species. Antibiotic overuse selects for resistant strains such as MRSA. Finishing prescribed courses, cutting agricultural use and developing new drugs are all part of the response.</p>` },
    3: { html: R`<h3 class="sub">Malaria: a protist parasite</h3>
<p>Protists are the eukaryotes that are not animals, plants or fungi, a mixed group that includes algae, amoebae, ciliates and parasites. The deadliest is <strong>Plasmodium</strong>, which causes malaria and killed about 600 000 people in 2022, mostly young children in Africa.</p>
<p>Its life cycle needs two hosts:</p>
<ol><li>An infected female Anopheles mosquito injects sporozoites as it bites.</li>
<li>The sporozoites multiply in the liver.</li>
<li>The new parasites invade red blood cells, multiply and burst them in synchronised waves, causing the cycles of fever.</li>
<li>Some parasites become gametes, which a mosquito takes up with blood; they fuse inside the mosquito.</li></ol>
<div class="worked"><p>Suggest three ways to attack malaria at different stages of the cycle.</p>
<p>Insecticide-treated bed nets and draining standing water reduce bites and mosquito breeding. Drugs such as artemisinin kill blood-stage parasites. Vaccines (RTS,S and R21, recommended since 2021 and 2023) target the sporozoite stage.</p></div>
<p>Malaria has shaped human genes: sickle-cell, thalassaemia and G6PD-deficiency alleles all persist because carriers resist it.</p>` }
  });

  X('bio-plantdiv', {
    0: { html: R`<h3 class="sub">Two generations in one life</h3>
<p>Plants alternate between two multicellular generations:</p>
<ul><li>The diploid <strong>sporophyte</strong> makes haploid <strong>spores</strong> by meiosis.</li>
<li>A spore grows by mitosis into a haploid <strong>gametophyte</strong>.</li>
<li>The gametophyte makes gametes by mitosis, and these fuse to form a new sporophyte.</li></ul>
<p>Animals have no multicellular haploid stage, so this is a defining feature of plants.</p>
<p>Over evolution the balance shifted:</p>
<ul><li><strong>Mosses</strong>: the green plant is the gametophyte, and the sporophyte is a stalk growing from it.</li>
<li><strong>Ferns</strong>: the leafy plant is the sporophyte, and the gametophyte is a small, separate heart-shaped plate.</li>
<li><strong>Seed plants</strong>: the gametophytes are microscopic and live inside the sporophyte. Pollen grains are the male gametophytes; the embryo sac is the female.</li></ul>
<div class="worked"><p>A moss leaf cell has 10 chromosomes. How many are in its spores, its gametes and its sporophyte cells?</p>
<p>The leafy moss is the gametophyte, so it is haploid (n = 10). Its gametes are made by mitosis (10). Fertilisation gives a sporophyte with 2n = 20. Meiosis in the sporophyte gives spores with 10.</p></div>` },
    1: { html: R`<h3 class="sub">Four innovations that conquered the land</h3>
<ol><li><strong>Cuticle and stomata</strong> (mosses onwards) cut water loss while allowing gas exchange.</li>
<li><strong>Vascular tissue</strong> (ferns onwards): lignified xylem carries water and supports height. Mosses, without it, stay a few centimetres tall in damp places.</li>
<li><strong>Seeds</strong> (conifers and other gymnosperms): an embryo with a food store in a protective coat. Seeds can wait out bad conditions and spread far, and pollen frees fertilisation from water. Ferns still need a film of water for sperm to swim.</li>
<li><strong>Flowers and fruits</strong> (angiosperms): flowers recruit animal pollinators, and fruits enclose seeds and recruit animals to disperse them.</li></ol>
<div class="worked"><p>Angiosperms appear in the fossil record about 140 million years ago, yet they now make up about 90% of plant species. Suggest reasons.</p>
<p>Pollinators allow precise, long-distance mating. Fruits spread seeds widely. Life cycles are fast: some go from seed to seed in weeks. Efficient xylem vessels help too. Coevolution with insects drove rapid speciation, which Darwin called an "abominable mystery".</p></div>` },
    2: { html: R`<h3 class="sub">Pollination and the double fertilisation trick</h3>
<p>A flower's anthers make pollen, and its carpel holds ovules in the ovary. Insect-pollinated flowers have bright petals, scent, nectar and sticky pollen. Wind-pollinated flowers, such as grasses, have small dull petals, dangling anthers, feathery stigmas and huge amounts of light pollen. Many plants avoid self-pollination: anthers and stigmas mature at different times, or the stigma rejects the plant's own pollen.</p>
<p>Fertilisation happens in steps:</p>
<ol><li>A pollen grain lands on a stigma and grows a <strong>pollen tube</strong> down the style to an ovule.</li>
<li>The tube delivers two sperm nuclei.</li>
<li>One sperm fuses with the egg to make the diploid zygote.</li>
<li>The other fuses with two polar nuclei to make the <strong>triploid endosperm</strong>, the food store.</li></ol>
<p>This <strong>double fertilisation</strong> is unique to flowering plants.</p>
<div class="worked"><p>A wheat grain is mostly endosperm. If wheat's somatic cells have 42 chromosomes, how many are in its endosperm?</p>
<p>Gametes have 21, so the endosperm (3n) has 63. White flour is milled endosperm.</p></div>
<p>After fertilisation the ovule becomes the seed and the ovary wall becomes the fruit.</p>` },
    3: { html: R`<h3 class="sub">The hidden kingdom</h3>
<p>Fungi are heterotrophs that digest food <em>outside</em> their bodies: they secrete enzymes and absorb the products. Their bodies are networks of thin threads (<strong>hyphae</strong>) forming a <strong>mycelium</strong>, with walls of chitin, the same material as insect exoskeletons. Mushrooms are only the reproductive structures. One honey fungus in Oregon covers about 9 km² and may be thousands of years old.</p>
<p>Ecological roles:</p>
<ul><li><strong>Decomposers</strong>: they are the main breakers-down of lignin and cellulose in wood.</li>
<li><strong>Mycorrhizal partners</strong>: they give plants phosphate and water in return for sugars.</li>
<li><strong>Lichens</strong>: partnerships between a fungus and an alga.</li>
<li><strong>Pathogens</strong>: Dutch elm disease, potato blight (strictly a water mould, not a fungus), athlete's foot, and chytrid fungus, which has wiped out many frog species.</li></ul>
<div class="worked"><p>Why is it harder to find drugs against fungal infections than against bacterial ones?</p>
<p>Fungi are eukaryotes, so their ribosomes, membranes and metabolism resemble ours. Antifungals must target the few differences, such as ergosterol in place of cholesterol in their membranes.</p></div>
<p>Yeasts are single-celled fungi used in bread, beer and genetics research. <em>Penicillium</em> gave us the first antibiotic.</p>` }
  });

  X('bio-animaldiv', {
    0: { html: R`<h3 class="sub">Symmetry, layers and body cavities</h3>
<p>Animals are classified by their body plan:</p>
<ul><li><strong>Symmetry</strong>: sponges have none. Cnidarians (jellyfish, corals) are <strong>radially</strong> symmetric, which suits life drifting or attached. Most animals are <strong>bilaterally</strong> symmetric, with a head end (cephalisation) that meets the world first as they move.</li>
<li><strong>Germ layers</strong>: cnidarians have two (diploblastic); bilaterians have three (triploblastic), adding mesoderm, which forms muscles and organs.</li>
<li><strong>Body cavity</strong>: flatworms have none; most bilaterians have a fluid-filled <strong>coelom</strong>, which cushions organs and lets gut and body wall move independently.</li></ul>
<p>Bilaterians split into two great branches by how the embryo develops:</p>
<ul><li><strong>Protostomes</strong> (molluscs, annelids, arthropods): the first opening of the embryo becomes the mouth.</li>
<li><strong>Deuterostomes</strong> (echinoderms and chordates): it becomes the anus.</li></ul>
<div class="worked"><p>Starfish are radially symmetric as adults. Why are they grouped with bilateral animals, and closer to us than to jellyfish?</p>
<p>Their larvae are bilateral, they have three germ layers and a coelom, and they develop as deuterostomes. Adult radial symmetry evolved secondarily.</p></div>` },
    1: { html: R`<h3 class="sub">The major invertebrate groups</h3>
<div class="table-wrap"><table class="data"><tr><th>Phylum</th><th>Examples</th><th>Key features</th></tr>
<tr><td>Porifera</td><td>sponges</td><td>no tissues; filter water through pores</td></tr>
<tr><td>Cnidaria</td><td>jellyfish, corals, anemones</td><td>stinging cells; gut with one opening</td></tr>
<tr><td>Platyhelminthes</td><td>flatworms, tapeworms</td><td>flat, so diffusion suffices; no circulation</td></tr>
<tr><td>Annelida</td><td>earthworms, leeches</td><td>segmented; hydrostatic skeleton</td></tr>
<tr><td>Mollusca</td><td>snails, clams, octopuses</td><td>muscular foot, mantle, often a shell</td></tr>
<tr><td>Arthropoda</td><td>insects, spiders, crabs</td><td>jointed legs, chitin exoskeleton, moulting</td></tr>
<tr><td>Echinodermata</td><td>starfish, sea urchins</td><td>water vascular system, tube feet</td></tr></table></div>
<p>Arthropods are the most successful phylum: there are over a million described insect species, and perhaps 10<sup>19</sup> insects alive at once. Their exoskeleton gives protection, support and waterproofing. It also has a cost: to grow they must moult, and while the new skeleton hardens they are vulnerable.</p>
<div class="worked"><p>Why are there no insects the size of dogs today, although Carboniferous dragonflies had 70 cm wingspans?</p>
<p>Insects breathe through tracheae, relying largely on diffusion, which only works over short distances. Carboniferous air had about 30% oxygen, against 21% today, which supported larger bodies. Exoskeletons also become impractically heavy as size grows.</p></div>` },
    2: { html: R`<h3 class="sub">From fish to mammals</h3>
<p>All chordates have, at some stage:</p>
<ul><li>a <strong>notochord</strong>;</li>
<li>a <strong>dorsal hollow nerve cord</strong>;</li>
<li><strong>pharyngeal slits</strong>;</li>
<li>a <strong>post-anal tail</strong>.</li></ul>
<p>Vertebrates add a backbone around the nerve cord, and a skull. Key steps in vertebrate history:</p>
<ol><li>Jaws (from gill arches).</li>
<li>Lungs and limbs with digits (lobe-finned fish to amphibians, about 370 million years ago).</li>
<li>The <strong>amniotic egg</strong>, with membranes and a shell that free reproduction from water (reptiles, birds, mammals).</li>
<li>Endothermy, which evolved separately in birds and mammals.</li></ol>
<div class="worked"><p>Why must amphibians return to water to breed, but reptiles need not?</p>
<p>Amphibian eggs have no shell or amnion and dry out on land, and their larvae (tadpoles) are aquatic. The reptile's amniotic egg carries its own pond: the amnion holds fluid, the yolk feeds the embryo, and the allantois stores waste.</p></div>
<p>Mammals have hair, milk glands, three middle-ear bones (evolved from jaw bones), a diaphragm, and in most species a placenta. Birds are living dinosaurs: feathers first evolved for insulation and display, before flight.</p>` },
    3: { html: R`<h3 class="sub">Kleiber's law and the pace of life</h3>
<p>If metabolism scaled with surface area it would rise as mass<sup>2/3</sup>. Measured across animals from mice to elephants, it rises as mass<sup>3/4</sup> (<strong>Kleiber's law</strong>), probably because of the branching geometry of transport networks. Per kilogram, metabolic rate therefore falls as $M^{-1/4}$: small animals live fast.</p>
<div class="worked"><p>An elephant is about 100 000 times heavier than a mouse. How much higher is its total metabolic rate, and its rate per kilogram?</p>
<p>Total: $(10^5)^{3/4} = 10^{3.75} \approx 5600$ times. Per kilogram: $(10^5)^{-1/4} \approx 1/18$. A mouse's heart beats about 600 times a minute and an elephant's about 30, roughly in the ratio $18$ : 1.</p></div>
<p>Other quantities scale too. Lifespan and heart period scale roughly as $M^{1/4}$, so most mammals live for very roughly a billion heartbeats. Skeletons must thicken disproportionately because strength depends on bone cross-section ($L^2$) while weight goes as $L^3$, which is why elephants have stout, pillar-like legs and an ant can carry many times its own weight.</p>` }
  });

  X('bio-digestion', {
    0: { html: R`<h3 class="sub">A balanced diet in numbers</h3>
<p>Carbohydrates and fats are the main fuels. Proteins supply amino acids, nine of them <strong>essential</strong> because we cannot make them. Vitamins and minerals are needed in small amounts, fibre keeps the gut moving, and water is essential.</p>
<p>Energy values:</p>
<ul><li>carbohydrate about 17 kJ g⁻¹;</li>
<li>protein about 17 kJ g⁻¹;</li>
<li>fat about 37 kJ g⁻¹;</li>
<li>alcohol about 29 kJ g⁻¹.</li></ul>
<p>Deficiencies have specific signs: vitamin C (scurvy, from failing collagen), vitamin D (rickets), iron (anaemia), iodine (goitre).</p>
<div class="worked"><p>A snack contains 30 g carbohydrate, 5 g protein and 12 g fat. How much energy, and how long would it power brisk walking (about 15 kJ per minute above resting)?</p>
<p>$30\cdot17 + 5\cdot17 + 12\cdot37 = 510 + 85 + 444 \approx 1040$ kJ, enough for about 70 minutes of brisk walking, and a tenth of a typical day's 10 000 kJ.</p></div>
<p><strong>Basal metabolic rate</strong> (about 7000 kJ per day for an adult) covers the brain, heart, breathing and keeping warm. The brain alone uses about 20%.</p>` },
    1: { html: R`<h3 class="sub">The enzymes, stage by stage</h3>
<ul><li><strong>Mouth</strong>: chewing increases surface area; salivary amylase starts on starch.</li>
<li><strong>Stomach</strong>: hydrochloric acid (pH about 2) kills microbes and activates <strong>pepsin</strong>, which cuts proteins into polypeptides. Pepsin is secreted as inactive pepsinogen so that it does not digest the cells that make it, and mucus protects the stomach lining.</li>
<li><strong>Duodenum</strong>: the pancreas adds amylase, trypsin (protein), lipase (fat) and hydrogencarbonate to neutralise the acid. Bile from the liver <strong>emulsifies</strong> fats into small droplets, giving lipase more surface area to work on; bile contains no enzymes.</li>
<li><strong>Ileum wall</strong>: membrane-bound enzymes (maltase, sucrase, lactase, dipeptidases) finish the job, producing monosaccharides, amino acids, fatty acids and glycerol.</li></ul>
<div class="worked"><p>Most adults worldwide stop making lactase after weaning. What happens when they drink milk, and why can many Europeans and East African herders digest it?</p>
<p>Undigested lactose reaches the colon, where bacteria ferment it, producing gas and diarrhoea. In dairying populations, mutations keeping the lactase gene switched on spread rapidly under selection over the last 10 000 years: a famous example of recent human evolution.</p></div>` },
    2: { html: R`<h3 class="sub">How the ileum absorbs food</h3>
<p>The small intestine is about 6 m long. Its surface is folded and covered in <strong>villi</strong>, and their cells carry <strong>microvilli</strong>, giving a total area of about 30 m² (older textbooks claim 250 m², but that figure is an overestimate). Each villus has a capillary network and a central lacteal (a lymph vessel), and its epithelium is one cell thick.</p>
<ul><li><strong>Glucose and amino acids</strong> enter by co-transport with Na⁺, then leave the cell by facilitated diffusion into the blood.</li>
<li><strong>Fatty acids and monoglycerides</strong> diffuse into cells. There they are rebuilt into triglycerides, packaged with proteins as <strong>chylomicrons</strong>, and sent into the lacteals, reaching the blood later via the lymph.</li>
<li><strong>Water</strong> follows by osmosis, mostly in the small intestine. The colon absorbs the rest and makes the faeces firm.</li></ul>
<div class="worked"><p>Oral rehydration solution, which has saved millions of children with cholera, contains both salt and glucose. Why does adding glucose help?</p>
<p>The Na⁺–glucose co-transporter still works during cholera. Glucose pulls Na⁺ into the cells, and water follows by osmosis, so the body regains water even while the gut is losing it.</p></div>` },
    3: { html: R`<h3 class="sub">The liver as chemical factory</h3>
<p>Blood from the gut reaches the liver first, through the <strong>hepatic portal vein</strong>. The liver:</p>
<ul><li>stores glucose as glycogen;</li>
<li>makes plasma proteins (albumin, clotting factors) and cholesterol;</li>
<li>stores iron and vitamins A, D and B<sub>12</sub>;</li>
<li><strong>deaminates</strong> excess amino acids, turning the toxic ammonia into urea in the ornithine cycle;</li>
<li>breaks down alcohol, drugs and old red cells, whose haem becomes bilirubin, giving bile its colour.</li></ul>
<div class="worked"><p>Why do people with liver failure develop jaundice and swollen ankles?</p>
<p>Bilirubin builds up, yellowing the skin. Albumin production falls, so plasma has less osmotic pull, more fluid stays in the tissues, and oedema follows.</p></div>
<p>Digestion is coordinated by nerves and hormones. Gastrin from the stomach stimulates acid release. <strong>Secretin</strong> (the first hormone discovered, in 1902) and <strong>CCK</strong> from the duodenum trigger the pancreas and gall bladder when acid and fat arrive. Leptin from fat cells and ghrelin from the empty stomach act on the hypothalamus to control appetite.</p>` },
    4: { html: R`<h3 class="sub">Guts shaped by diet</h3>
<p>Meat is easy to digest, so carnivores have short, simple guts. Plant cellulose cannot be digested by any vertebrate enzyme, so herbivores rely on microbes and long digestive tracts:</p>
<ul><li><strong>Ruminants</strong> (cows, sheep, deer): a four-chambered stomach whose largest chamber, the rumen, houses bacteria and protists that ferment cellulose. The animals regurgitate and rechew the cud, then digest the microbes themselves as protein. Fermentation produces methane, so cattle are a significant source of this greenhouse gas.</li>
<li><strong>Hindgut fermenters</strong> (horses, rabbits): microbes in a large caecum. Rabbits eat their first soft droppings to absorb nutrients made there.</li></ul>
<div class="worked"><p>Koalas eat only eucalyptus leaves, which are low in energy and toxic. Predict features of their gut and lifestyle.</p>
<p>A very long caecum full of microbes, a liver adapted to detoxify, and an energy-saving lifestyle: koalas sleep or rest up to 20 hours a day.</p></div>
<p>Teeth match diet too. Carnivores have pointed canines and blade-like carnassials for slicing. Herbivores have broad, ridged molars for grinding and a gap (the diastema) where the tongue moves food. Omnivores such as humans have a mix.</p>` }
  });

  X('bio-reproduction', {
    0: { html: R`<h3 class="sub">The cost and benefit of sex</h3>
<p><strong>Asexual reproduction</strong> (binary fission, budding, runners, tubers, parthenogenesis) needs one parent and produces genetically identical clones. It is fast and certain: no mate to find, and every individual can reproduce. <strong>Sexual reproduction</strong> combines gametes from two parents, producing variety, but carries a "twofold cost": half the population (males) cannot bear young, so an asexual female's line should grow twice as fast.</p>
<p>Why is sex nearly universal among complex organisms? Leading explanations:</p>
<ul><li>Variety helps offspring cope with changing environments.</li>
<li>Recombination combines good mutations and purges bad ones.</li>
<li>Above all, it helps hosts keep ahead of rapidly evolving parasites: the <strong>Red Queen</strong> hypothesis ("it takes all the running you can do to keep in the same place").</li></ul>
<div class="worked"><p>Water fleas and aphids reproduce asexually in summer and sexually in autumn. Why does this make sense?</p>
<p>In stable, abundant summer conditions, cloning a successful genotype builds numbers fast. Before the uncertain winter, sex creates varied, resistant eggs.</p></div>
<p>Bananas are sterile clones, so a single disease (Panama disease) can threaten an entire variety, as it did the Gros Michel in the 1950s.</p>` },
    1: { html: R`<h3 class="sub">Making sperm and eggs</h3>
<p><strong>Spermatogenesis</strong> takes place in the seminiferous tubules of the testes from puberty onwards. Diploid spermatogonia divide by mitosis; primary spermatocytes undergo meiosis I and II; and each gives four spermatids, which mature into sperm, supported by Sertoli cells. A man makes about 1500 sperm per second.</p>
<p><strong>Oogenesis</strong> is very different:</p>
<ol><li>All primary oocytes form before birth and pause in prophase I.</li>
<li>From puberty, each month one completes meiosis I, giving a large secondary oocyte and a tiny polar body.</li>
<li>Meiosis II is completed only if a sperm enters.</li></ol>
<p>Unequal divisions concentrate the cytoplasm in one cell, the egg, which needs food and organelles for the embryo.</p>
<div class="worked"><p>A woman is born with about 1–2 million oocytes, but ovulates only about 400 eggs in her life. Why might the long pause help explain why chromosome errors rise with maternal age?</p>
<p>An egg ovulated at 40 has been paused in meiosis I for 40 years. The proteins holding paired chromosomes together deteriorate, making non-disjunction more likely when division finally resumes.</p></div>` },
    2: { html: R`<h3 class="sub">Four hormones, one cycle</h3>
<ol><li><strong>FSH</strong> from the pituitary stimulates a follicle to grow.</li>
<li>The follicle makes <strong>oestrogen</strong>, which rebuilds the uterus lining. At low levels oestrogen inhibits FSH (negative feedback); at high levels it triggers a surge of <strong>LH</strong> (positive feedback).</li>
<li>The LH surge causes ovulation around day 14.</li>
<li>The empty follicle becomes the corpus luteum, which secretes <strong>progesterone</strong>. This maintains the lining and inhibits FSH and LH.</li>
<li>Without pregnancy, the corpus luteum degenerates after about 12 days. Progesterone falls, the lining is shed (menstruation), FSH rises again, and the cycle restarts.</li></ol>
<div class="worked"><p>How does the combined contraceptive pill (synthetic oestrogen and progesterone) prevent pregnancy, and how is IVF helped by hormones?</p>
<p>Constant high hormone levels inhibit FSH and LH, so no follicle matures and there is no LH surge or ovulation. In IVF, the opposite: FSH injections make many follicles mature, and an LH-like hormone triggers their release just before collection.</p></div>
<p>If an embryo implants, it secretes <strong>hCG</strong>, which keeps the corpus luteum alive. Pregnancy tests detect hCG in urine with monoclonal antibodies.</p>` },
    3: { html: R`<h3 class="sub">From one cell to a body plan</h3>
<p>After fertilisation the zygote divides by <strong>cleavage</strong>, without growing, into a ball of cells. In mammals this becomes a <strong>blastocyst</strong>, a hollow ball whose outer layer forms the placenta and whose inner cell mass forms the embryo. During <strong>gastrulation</strong> cells move inward to form the three germ layers:</p>
<ul><li><strong>Ectoderm</strong> forms skin and the nervous system.</li>
<li><strong>Mesoderm</strong> forms muscle, bone, blood and the heart.</li>
<li><strong>Endoderm</strong> forms the gut lining, lungs and liver.</li></ul>
<p>"It is not birth, marriage or death, but gastrulation, which is truly the most important time in your life" (Lewis Wolpert).</p>
<div class="worked"><p>Hox genes control which segment becomes which body region, and they are arranged on the chromosome in the same order as the regions they control. A fly mutation turns antennae into legs. What has gone wrong?</p>
<p>A Hox gene that should be active only in the thorax (where legs grow) is switched on in the head. The cells there read the wrong positional "address". Similar Hox genes pattern the bodies of all bilaterian animals, including us.</p></div>
<p>Cells become specialised by <strong>differentiation</strong>, switching on different sets of genes. Embryonic <strong>stem cells</strong> can become any cell type. In 2006 Shinya Yamanaka showed that adult cells can be reprogrammed into induced pluripotent stem cells with just four transcription factors.</p>` }
  });

  X('bio-plantgrowth', {
    0: { html: R`<h3 class="sub">Where plants grow</h3>
<p>Unlike animals, plants grow throughout life, from <strong>meristems</strong>: regions of undifferentiated, dividing cells.</p>
<ul><li><strong>Apical meristems</strong> at shoot and root tips add length (primary growth).</li>
<li>In woody plants, <strong>lateral meristems</strong> add girth (secondary growth): the vascular cambium makes new xylem inwards and phloem outwards, and the cork cambium makes bark.</li></ul>
<p>A shoot or root grows in three zones: cells divide near the tip, elongate behind it (taking up water into vacuoles while auxin loosens their walls), then differentiate into specialised tissues.</p>
<div class="worked"><p>A tree is ringed in temperate forest. Why can you count its age from the stump?</p>
<p>In spring the cambium makes wide, thin-walled xylem vessels. In late summer, as growth slows, it makes narrow, thick-walled ones. Each pair makes one visible ring per year, and ring widths record each year's growing conditions (dendrochronology).</p></div>
<p>Many plant cells remain <strong>totipotent</strong>: a single cell can regenerate a whole plant. That allows cuttings and tissue culture (micropropagation), which produce thousands of identical orchids or bananas from a small sample.</p>` },
    1: { html: R`<h3 class="sub">Waking a seed</h3>
<p>A seed has three parts: an embryo (radicle, plumule and one or two <strong>cotyledons</strong>), a food store (endosperm or cotyledons), and a protective coat (the testa). Many seeds stay <strong>dormant</strong> until conditions are right, which spreads germination over time and avoids sprouting in a brief warm spell in winter. Germination needs water, oxygen and a suitable temperature; some seeds also need light, cold (stratification) or even fire.</p>
<p>In a cereal grain, germination runs as a sequence:</p>
<ol><li>The seed absorbs water.</li>
<li>The embryo releases <strong>gibberellin</strong>.</li>
<li>Gibberellin reaches the aleurone layer and switches on the gene for <strong>amylase</strong>.</li>
<li>Amylase digests the starchy endosperm into maltose, feeding the growing embryo.</li></ol>
<div class="worked"><p>Brewers make malt by germinating barley briefly and then drying it. Why?</p>
<p>Germination produces amylase, which converts the starch into sugars that yeast can ferment. Brewers sometimes add gibberellin to speed this up. Drying stops growth before the sugars are used up.</p></div>
<p>A sacred lotus seed has germinated after about 1300 years, and a date palm from a 2000-year-old seed found at Masada grew in 2005.</p>` },
    2: { html: R`<h3 class="sub">Auxin and bending</h3>
<p>The Darwins (Charles and his son Francis) showed in 1880 that grass seedlings bend towards light only if their tips are exposed. Something made in the tip travels down. Went later collected that substance in agar blocks: <strong>auxin</strong>.</p>
<p>In <strong>phototropism</strong>, light from one side causes auxin to be transported to the shaded side. There it stimulates cell elongation (by activating proton pumps that acidify and loosen cell walls), so the shoot bends towards the light.</p>
<p>In <strong>gravitropism</strong>, starch grains (statoliths) settle in root cap cells and redirect auxin to the lower side. In roots, high auxin <em>inhibits</em> elongation, so the root bends down while the shoot bends up.</p>
<div class="worked"><p>A seedling's tip is cut off and placed on one side of the cut stump in the dark. What happens, and what does it show?</p>
<p>The stump bends away from the side carrying the tip, because more auxin moves down that side and those cells elongate more. The chemical alone, without any light, causes bending.</p></div>
<p>Plants also respond to touch (<strong>thigmotropism</strong>, the coiling of tendrils), to water and to chemicals.</p>` },
    3: { html: R`<h3 class="sub">Night length and the red/far-red switch</h3>
<p>Many plants flower at a particular time of year by measuring night length (<strong>photoperiodism</strong>).</p>
<ul><li><strong>Short-day</strong> plants (chrysanthemums, poinsettias) flower when nights exceed a critical length.</li>
<li><strong>Long-day</strong> plants (spinach, wheat) flower when nights are shorter than critical.</li>
<li><strong>Day-neutral</strong> plants (tomatoes) ignore night length.</li></ul>
<p>The detector is <strong>phytochrome</strong>, which exists in two forms that flip with light:</p>
<div class="key"><p>P<sub>r</sub> $\xrightarrow{\text{red, 660 nm}}$ P<sub>fr</sub> (active) $\xrightarrow{\text{far red, 730 nm, or slowly in darkness}}$ P<sub>r</sub></p></div>
<div class="worked"><p>A short-day plant gets long nights, but a brief flash of red light in the middle of each night. Does it flower? What if the red flash is followed immediately by far red?</p>
<p>A red flash makes P<sub>fr</sub> and "breaks" the night, so the plant reads two short nights and does not flower. Red then far red reverses it, so it flowers. The last flash decides, which is the clue that one reversible pigment is involved.</p></div>
<p>Phytochrome also tells a seed whether it lies under a leaf canopy, since leaves absorb red and pass far red. Seeds such as lettuce wait for gaps. Shaded shoots stretch to grow towards the light.</p>` },
    4: { html: R`<h3 class="sub">How plants fight back</h3>
<p>Plants cannot run, so they defend chemically and structurally.</p>
<ul><li><strong>Physical</strong>: thorns, hairs, waxy cuticles, bark, and silica in grass.</li>
<li><strong>Chemical</strong>: tannins, alkaloids (nicotine, caffeine, morphine, quinine), and cyanide-releasing compounds in cassava and almonds.</li>
<li><strong>Response to attack</strong>: infected cells kill themselves (the <strong>hypersensitive response</strong>), walling the pathogen off. <strong>Salicylic acid</strong> (the source of aspirin) then signals <strong>systemic acquired resistance</strong> throughout the plant.</li></ul>
<div class="worked"><p>When caterpillars chew a tomato leaf, distant leaves begin making protease inhibitors within hours. How, and why is that useful?</p>
<p>Wounding releases signals (systemin, then jasmonic acid) that travel through the plant. Protease inhibitors stop insects digesting the protein they eat, slowing their growth. Some plants also release volatile chemicals that attract parasitic wasps to the caterpillars.</p></div>
<p>Plants also respond to drought (ABA closes stomata), to cold (antifreeze proteins), and to touch: the Venus flytrap snaps shut in a tenth of a second when two trigger hairs are touched within about 20 seconds.</p>` }
  });

  X('bio-behaviour', {
    0: { html: R`<h3 class="sub">Tinbergen's four questions</h3>
<p>Niko Tinbergen argued that every behaviour needs four kinds of explanation, which are complementary, not competing:</p>
<ol><li><strong>Mechanism</strong> (causation): what stimuli, nerves and hormones produce it?</li>
<li><strong>Development</strong> (ontogeny): how does it arise in the individual's lifetime, through genes and learning?</li>
<li><strong>Function</strong> (adaptive value): how does it help survival and reproduction?</li>
<li><strong>Evolution</strong> (phylogeny): how did it arise in the species' history?</li></ol>
<div class="worked"><p>Why do robins sing in spring? Give an answer at each level.</p>
<p>Mechanism: lengthening days raise testosterone, which acts on song centres in the brain. Development: young males learn the song by hearing adults during a sensitive period. Function: song defends a territory and attracts a mate. Evolution: song developed from simpler calls in ancestral songbirds.</p></div>
<p>The first two are called <strong>proximate</strong> causes (how); the last two are <strong>ultimate</strong> causes (why). Confusing them is a common error: "birds migrate because it gets cold" mixes a trigger with a reason. Tinbergen, Lorenz and von Frisch shared the 1973 Nobel prize, the first awarded for the study of behaviour.</p>` },
    1: { html: R`<h3 class="sub">Types of learning</h3>
<p><strong>Innate</strong> behaviours appear complete without practice: reflexes, taxes (movement towards or away from a stimulus), kineses (a change in speed or turning rate with intensity), and fixed action patterns. A greylag goose will roll any egg-shaped object back to its nest and completes the movement even if the egg is removed halfway.</p>
<p><strong>Learned</strong> behaviours change with experience:</p>
<ul><li><strong>Habituation</strong>: ignoring a repeated harmless stimulus.</li>
<li><strong>Imprinting</strong>: Lorenz's goslings followed him, the first moving object they saw during a critical period.</li>
<li><strong>Classical conditioning</strong>: Pavlov's dogs salivated at a bell paired with food.</li>
<li><strong>Operant conditioning</strong>: trial-and-error learning shaped by rewards, as in Skinner's rats pressing levers.</li>
<li><strong>Insight</strong>: solving a new problem without trial and error; New Caledonian crows bend wire into hooks.</li></ul>
<div class="worked"><p>Woodlice move faster and turn more in dry, bright places, and slow down in damp, dark ones. Is this a taxis or a kinesis, and what is its effect?</p>
<p>A kinesis: the response is to intensity, not direction. They spend longer in damp, dark places, where they lose less water, so they accumulate there without "choosing" a direction.</p></div>` },
    2: { html: R`<h3 class="sub">Finding the way and sharing information</h3>
<p>Animals navigate using the sun (with an internal clock to correct for its movement), the stars, Earth's magnetic field, smells and landmarks.</p>
<ul><li>Homing pigeons use the sun on sunny days and switch to magnetism on cloudy ones; small magnets attached to them disrupt homing only under overcast skies.</li>
<li>Indigo buntings learn the pole of rotation of the night sky. In planetarium experiments they oriented to whichever star the sky rotated around.</li>
<li>Arctic terns migrate about 70 000 km a year.</li></ul>
<p>Communication uses sight, sound, smell (pheromones: a female silk moth's attracts males from kilometres away), touch and electricity.</p>
<div class="worked"><p>A honeybee dances a waggle run pointing 40° to the right of vertical, lasting about 1.5 s. What is she telling her hive-mates? (Take 1 s of waggling to mean roughly 1 km.)</p>
<p>Food lies 40° to the right of the sun's direction, at roughly 1.5 km. Von Frisch decoded this "dance language" by moving feeding stations and watching dances change.</p></div>
<p>Signals can be honest, or exploited. Firefly females of one genus mimic the flash code of another species to lure males and eat them.</p>` },
    3: { html: R`<h3 class="sub">Costs, benefits and stable strategies</h3>
<p><strong>Optimal foraging</strong> theory predicts that animals maximise their net energy gain per unit time. The <strong>marginal value theorem</strong> says a forager should leave a patch when its rate of gain there drops to the average rate available in the habitat, including travel time. So the further apart the patches, the longer an animal should stay in each.</p>
<div class="worked"><p>Crows on the Canadian coast drop whelks onto rocks to break them, always from about 5 m. Experiments showed that higher drops break shells in fewer tries. Why stop at 5 m?</p>
<p>The total height flown (drops × height) is lowest at about 5 m. Higher drops break shells sooner, but each flight costs more. The crows minimise total energy (Zach, 1979).</p></div>
<p>When the payoff depends on what others do, <strong>game theory</strong> applies. In Maynard Smith's <strong>hawk–dove</strong> game, a resource worth $V$ is contested and losing a fight costs $C$. If $V &lt; C$, neither pure strategy is stable, and the <strong>evolutionarily stable strategy</strong> is to play hawk with probability $V/C$. This explains why most animal contests are ritual displays, not fights to the death.</p>` },
    4: { html: R`<h3 class="sub">Kin selection and reciprocity</h3>
<p>How can helping others at a cost evolve? <strong>Kin selection</strong>: a gene for helping spreads if it helps copies of itself in relatives. <strong>Hamilton's rule</strong> says altruism is favoured when</p>
<div class="key"><p>$rB &gt; C$: relatedness × benefit to the recipient &gt; cost to the helper.</p></div>
<p>Full siblings share $r = \tfrac12$ and cousins $\tfrac18$. J. B. S. Haldane joked that he would lay down his life for two brothers or eight cousins.</p>
<div class="worked"><p>Worker honeybees are sterile and raise their queen's offspring. Why might this be favoured? (Males are haploid, so sisters share all their father's genes.)</p>
<p>Sisters with the same father share $r = \tfrac34$, more than the $\tfrac12$ they would share with their own offspring. Raising sisters can pass on more of their genes than breeding themselves. In reality queens often mate many times, lowering $r$, so ecological factors matter too.</p></div>
<p>Among non-relatives, <strong>reciprocal altruism</strong> works if individuals meet repeatedly and remember who helped. Vampire bats share blood meals with roost-mates who have fed them before. In computer tournaments of the repeated <strong>prisoner's dilemma</strong>, the simple strategy "tit-for-tat" (cooperate first, then copy your partner's last move) did remarkably well.</p>` }
  });
})();
