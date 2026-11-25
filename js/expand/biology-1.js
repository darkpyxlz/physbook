/* Expanded text for biology 1–10: molecules, cells, membranes, enzymes, respiration, photosynthesis,
   the cell cycle, DNA, gene expression, Mendelian inheritance. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('bio-molecules', {
    0: { html: R`<h3 class="sub">Why water's properties matter to life</h3>
<p>Each water molecule can form up to four hydrogen bonds, so liquid water is a constantly reshuffling network. That gives it a high <strong>specific heat capacity</strong> (4.2 J g⁻¹ K⁻¹: oceans and bodies resist temperature swings), a high <strong>latent heat of vaporisation</strong> (sweating removes 2.4 kJ per gram evaporated), strong <strong>cohesion</strong> (water columns in xylem hold together under tension) and <strong>surface tension</strong>. Ice is less dense than liquid water, so lakes freeze from the top and the water beneath stays liquid for fish.</p>
<div class="worked"><p>How much water must a 70 kg runner sweat to remove 1000 kJ of heat, and by how much would that heat raise body temperature if it stayed in? (Body specific heat about 3.5 J g⁻¹ K⁻¹.)</p>
<p>$1\,000\,000/2400 \approx 420$ g of sweat. Retained, it would raise the temperature by $10^6/(70\,000\cdot3.5) \approx 4$ K: dangerous heatstroke territory.</p></div>
<p>As a polar <strong>solvent</strong>, water dissolves ions and polar molecules (hydrophilic) but not fats (hydrophobic), and that difference organises membranes and protein folding.</p>` },
    1: { html: R`<h3 class="sub">Building and breaking polymers</h3>
<p>Monomers join by <strong>condensation</strong> (releasing water) and polymers split by <strong>hydrolysis</strong> (adding water). Glucose exists as α and β ring forms, differing only in the position of the –OH on carbon 1, yet that tiny difference decides everything: α-glucose chains (1,4 links) coil into <strong>starch</strong> and <strong>glycogen</strong>, compact energy stores; β-glucose chains alternate orientation and lie straight, hydrogen-bonding into <strong>cellulose</strong> microfibrils stronger than steel by weight. Humans have enzymes for α links but not β links, which is why we cannot digest grass.</p>
<p>Glycogen is more branched than starch (1,6 branches every 8–12 units), giving many ends for enzymes to release glucose quickly: perfect for animals that need sudden energy. Polysaccharides are insoluble, so storing glucose as them does not draw water into cells by osmosis.</p>` },
    2: { html: R`<h3 class="sub">Fats, phospholipids and steroids</h3>
<p>A triglyceride is glycerol joined to three fatty acids by ester bonds. <strong>Saturated</strong> fatty acids have no C=C double bonds, pack tightly and are solid at room temperature (animal fats); <strong>unsaturated</strong> ones have kinks at their cis double bonds, pack loosely and are liquid (plant oils). Fats store about 38 kJ per gram, more than twice carbohydrate's 17, because they are less oxidised and stored without water.</p>
<p>A <strong>phospholipid</strong> replaces one fatty acid with a phosphate group: a hydrophilic head and two hydrophobic tails. In water they spontaneously form bilayers, the basis of every cell membrane. <strong>Steroids</strong> (cholesterol, testosterone, oestrogen) are four fused rings; cholesterol regulates membrane fluidity, and steroid hormones pass through membranes to act on genes directly.</p>` },
    3: { html: R`<h3 class="sub">Levels of protein structure in one example</h3>
<p>Haemoglobin shows all four levels. Its <strong>primary</strong> structure is the sequence of amino acids in each chain. Parts coil into α-helices (<strong>secondary</strong>), held by hydrogen bonds along the backbone. Each chain folds into a compact globin shape around a haem group (<strong>tertiary</strong>), held by hydrophobic interactions, ionic bonds, hydrogen bonds and sometimes disulfide bridges between cysteines. Four chains fit together (<strong>quaternary</strong>).</p>
<div class="worked"><p>In sickle-cell anaemia one amino acid in the β chain changes from glutamate to valine. Why is that so harmful?</p>
<p>Glutamate is charged and hydrophilic; valine is hydrophobic. At low oxygen the new hydrophobic patch sticks to neighbouring haemoglobin molecules, forming long fibres that bend red cells into sickles that block capillaries. One change in primary structure alters quaternary behaviour.</p></div>
<p>Shape is everything: high temperature, extreme pH or heavy metals <strong>denature</strong> proteins by breaking the weak bonds of the higher structure, usually irreversibly (as in a cooked egg).</p>` },
    4: { html: R`<h3 class="sub">DNA, RNA and the energy currency</h3>
<p>Nucleotides have three parts: a pentose sugar (deoxyribose in DNA, ribose in RNA), a phosphate and a base (A, G purines with two rings; C, T, U pyrimidines with one). Phosphodiester bonds link the 3′ carbon of one sugar to the 5′ carbon of the next, giving each strand a direction. RNA is usually single-stranded, uses uracil instead of thymine, and is less stable (the extra –OH on ribose makes it easier to hydrolyse), which suits its role as a short-lived message.</p>
<p><strong>ATP</strong> is a nucleotide with three phosphates. Hydrolysing the last one releases about 30 kJ mol⁻¹ under standard conditions (more in the cell), coupling energy-releasing reactions to energy-requiring ones. A person turns over roughly their own body weight of ATP each day, regenerating it continuously from ADP.</p>` }
  });

  X('bio-cells', {
    0: { html: R`<h3 class="sub">Prokaryotes and eukaryotes compared</h3>
<div class="table-wrap"><table class="data"><tr><th></th><th>Prokaryote (bacteria, archaea)</th><th>Eukaryote (animals, plants, fungi, protists)</th></tr>
<tr><td>Size</td><td>1–5 μm</td><td>10–100 μm</td></tr><tr><td>DNA</td><td>circular, in the cytoplasm (nucleoid), plus plasmids</td><td>linear chromosomes in a nucleus, with histones</td></tr>
<tr><td>Organelles</td><td>no membrane-bound organelles</td><td>nucleus, mitochondria, ER, Golgi, (chloroplasts)</td></tr>
<tr><td>Ribosomes</td><td>70S</td><td>80S (70S inside mitochondria and chloroplasts)</td></tr>
<tr><td>Cell wall</td><td>peptidoglycan (bacteria)</td><td>cellulose (plants), chitin (fungi), none (animals)</td></tr></table></div>
<p>The <strong>endosymbiotic theory</strong> explains why mitochondria and chloroplasts look like bacteria: they have their own circular DNA and 70S ribosomes, double membranes, and divide by binary fission. They descend from bacteria engulfed over a billion years ago.</p>` },
    1: { html: R`<h3 class="sub">The secretory pathway</h3>
<p>Organelles cooperate like a factory. A protein for export, such as insulin, is made by ribosomes on the <strong>rough ER</strong> and threaded into its interior, where it folds. Vesicles carry it to the <strong>Golgi apparatus</strong>, which modifies it (adding sugars, cutting it to size) and sorts it into vesicles that fuse with the cell membrane and release it (<strong>exocytosis</strong>). <strong>Lysosomes</strong>, also made by the Golgi, digest worn-out organelles and engulfed material. Smooth ER makes lipids and detoxifies drugs; liver cells are packed with it.</p>
<div class="worked"><p>A cell type contains huge numbers of mitochondria and much rough ER. What might its job be?</p>
<p>Making and exporting large amounts of protein, which needs ATP: for example a pancreatic cell secreting digestive enzymes, or a plasma cell making antibodies. Structure follows function.</p></div>
<p>The <strong>cytoskeleton</strong> (actin filaments, microtubules, intermediate filaments) gives shape, moves vesicles along microtubule "tracks" with motor proteins, and builds cilia, flagella and the spindle of dividing cells.</p>` },
    2: { html: R`<h3 class="sub">Magnification and resolution in practice</h3>
<div class="key"><p>Magnification $= \dfrac{\text{image size}}{\text{actual size}}$; 1 mm $= 1000$ μm $= 10^6$ nm.</p></div>
<div class="worked"><p>A mitochondrion measures 25 mm in an electron micrograph at ×10 000. How long is it really?</p>
<p>$25\ \text{mm}/10\,000 = 0.0025$ mm $= 2.5$ μm.</p></div>
<p>To measure cells with a light microscope, calibrate an <strong>eyepiece graticule</strong> against a <strong>stage micrometer</strong> (a slide with a scale of 0.01 mm divisions): if 40 graticule units match 0.1 mm at ×400, each unit is 2.5 μm at that magnification.</p>
<p><strong>Resolution</strong> (the smallest separation still seen as two points) is limited by wavelength: about 200 nm for light microscopes, under 1 nm for electron microscopes, whose electrons have tiny wavelengths. Electron microscopes need vacuum and dead, stained samples; light microscopes show living cells in colour. Fluorescence and super-resolution methods (Nobel prize 2014) now beat the light limit by tagging molecules with glowing labels.</p>` },
    3: { html: R`<h3 class="sub">Surface area, volume and the size of things</h3>
<p>A cube of side $L$ has surface area $6L^2$ and volume $L^3$, so the ratio $SA : V = 6/L$ falls as the cube grows. A cell's needs (oxygen, food, waste removal) scale with its volume, but its supply scales with its surface. Large cells would starve in the middle, which is why cells stay small and divide.</p>
<div class="worked"><p>Compare the SA : V ratio of a 1 μm bacterium and a 20 μm animal cell (treated as cubes).</p>
<p>6 : 1 versus 0.3 : 1, twenty times less. Big cells and big organisms compensate with flattened shapes (red blood cells, leaves), folds (microvilli, intestinal villi) and transport systems (blood, xylem) so that no cell is far from a supply.</p></div>
<p>The same law shapes animals: elephants have huge ears to radiate heat; small mammals and birds lose heat fast and have very high metabolic rates (a shrew eats more than its body weight each day).</p>` }
  });

  X('bio-membranes', {
    0: { html: R`<h3 class="sub">Membrane components and their jobs</h3>
<p><strong>Phospholipids</strong> form the barrier; their fluidity rises with temperature and with unsaturated tails. <strong>Cholesterol</strong> buffers fluidity: it stiffens membranes when warm and stops them freezing solid when cold. <strong>Proteins</strong> do the work: channels and carriers move substances, receptors detect signals, enzymes catalyse reactions at the surface, and junction proteins link cells. <strong>Glycoproteins</strong> and <strong>glycolipids</strong>, with sugar chains outside, act as identity markers (the ABO blood groups are glycolipids) and help cells recognise each other.</p>
<p>Evidence for the fluid mosaic model came from fusing a mouse and a human cell with differently coloured labels on their membrane proteins: within 40 minutes the colours were completely mixed, showing that proteins drift in the lipid "sea".</p>
<div class="worked"><p>Fish living in cold water have more unsaturated fatty acids in their membranes. Why?</p>
<p>Kinked unsaturated tails pack less tightly, so the membrane stays fluid enough for proteins to move and work at low temperatures.</p></div>` },
    1: { html: R`<h3 class="sub">Fick's law</h3>
<p>Diffusion is the net movement of particles down a concentration gradient, by random motion. Its rate across a surface follows</p>
<div class="key"><p>rate $\propto \dfrac{\text{surface area}\times\text{concentration difference}}{\text{thickness of the barrier}}$</p></div>
<p>Exchange surfaces maximise the top and minimise the bottom: the alveoli give 70 m² with a barrier only 0.5 μm thick, and blood flow and breathing keep the concentration difference high. Diffusion is fast over micrometres but hopeless over centimetres, because the time to diffuse grows with the <em>square</em> of the distance: oxygen crosses a cell in milliseconds but would take hours to cross a centimetre of tissue.</p>
<p><strong>Facilitated diffusion</strong> uses channel or carrier proteins for ions and polar molecules (like glucose) that cannot cross the lipid bilayer. It is still passive (down the gradient), but carriers <strong>saturate</strong>: once all are busy, the rate stops rising with concentration.</p>` },
    2: { html: R`<h3 class="sub">Working with water potential</h3>
<p>Water potential ψ (in kPa) measures water's tendency to move; pure water is 0, and solutes make it negative. Water moves from higher (less negative) to lower (more negative) ψ. In plant cells ψ = ψ<sub>s</sub> + ψ<sub>p</sub>: the solute potential (negative) plus the pressure potential (positive when the wall pushes back).</p>
<div class="worked"><p>A plant cell has ψ<sub>s</sub> = −800 kPa and ψ<sub>p</sub> = +300 kPa. It is placed in a solution of ψ = −700 kPa. Which way does water move?</p>
<p>Cell ψ = −500 kPa, higher than the solution's −700: water leaves the cell until the pressure potential drops and the two match.</p></div>
<p>Animal cells have no wall: in pure water they swell and burst (haemolysis for red cells); in strong solutions they shrink (crenate). Plant cells in pure water become <strong>turgid</strong>, which keeps soft tissues upright; in strong solutions the membrane pulls away from the wall (<strong>plasmolysis</strong>). Finding the solution concentration that causes no change in mass of potato cylinders estimates the cells' water potential.</p>` },
    3: { html: R`<h3 class="sub">Pumps and co-transport</h3>
<p><strong>Active transport</strong> uses ATP to move substances <em>against</em> their gradient through carrier proteins. The sodium–potassium pump pushes 3 Na⁺ out and 2 K⁺ in per ATP, and uses about a quarter of your resting energy (two-thirds in nerve cells).</p>
<p>The Na⁺ gradient it builds is then used by <strong>co-transporters</strong>: in the gut and kidney, glucose enters cells together with Na⁺ flowing down its gradient, so glucose can be absorbed even against its own gradient. The ATP is spent indirectly (secondary active transport).</p>
<div class="worked"><p>Cyanide stops ATP production. What happens to glucose absorption in the small intestine?</p>
<p>The Na⁺/K⁺ pump stops, the Na⁺ gradient runs down, and co-transport of glucose stops: absorption falls to the slow passive rate.</p></div>
<p><strong>Endocytosis</strong> (phagocytosis of particles, pinocytosis of fluid, receptor-mediated uptake of cholesterol particles) and <strong>exocytosis</strong> move large items in vesicles, also using ATP.</p>` },
    4: { html: R`<h3 class="sub">Where the resting potential comes from</h3>
<p>The pump makes K⁺ concentrated inside and Na⁺ outside. At rest the membrane is far more permeable to K⁺ (leak channels), so K⁺ diffuses out, leaving the inside negative. The charge separation builds until the electrical pull back balances the concentration push: the K⁺ <strong>equilibrium potential</strong> given by the Nernst equation, $E = \dfrac{RT}{zF}\ln\dfrac{[\mathrm{out}]}{[\mathrm{in}]}$, about −90 mV for K⁺ in neurons.</p>
<div class="worked"><p>With [K⁺] 5 mM outside and 140 mM inside at 37 °C, find $E_K$.</p>
<p>$\dfrac{RT}{F} = 26.7$ mV, and $26.7\ln(5/140) = 26.7\cdot(-3.33) = -89$ mV.</p></div>
<p>The real resting potential (about −70 mV) lies between $E_K$ and $E_{Na}$ (+60 mV), weighted by the permeabilities: the Goldman–Hodgkin–Katz equation in the lab. Only a tiny number of ions need to move to create it, so concentrations hardly change.</p>` }
  });

  X('bio-enzymes', {
    0: { html: R`<h3 class="sub">Lock and key, or induced fit?</h3>
<p>Enzymes are biological catalysts: they speed reactions (often a millionfold or more) by lowering the activation energy, without being used up or changing the equilibrium. The substrate binds the <strong>active site</strong>, forming an enzyme–substrate complex. The older <strong>lock-and-key</strong> model pictured a rigid site; the <strong>induced-fit</strong> model, supported by crystal structures, shows the site changing shape as the substrate binds, straining bonds and bringing reacting groups together.</p>
<p>Enzymes lower activation energy by holding substrates in the right orientation, stretching bonds towards the transition state, providing acidic or basic groups, and excluding water. Many need <strong>cofactors</strong>: metal ions (Zn²⁺ in carbonic anhydrase, Mg²⁺ with ATP) or organic <strong>coenzymes</strong> derived from vitamins (NAD from niacin, coenzyme A from pantothenic acid), which is why vitamins are essential in small amounts.</p>
<div class="worked"><p>Carbonic anhydrase processes about $10^6$ CO<sub>2</sub> molecules per second. Why does the body need such speed?</p>
<p>Red blood cells spend under a second in lung capillaries; CO<sub>2</sub> must be released from hydrogencarbonate in that time, and the uncatalysed reaction would take far longer.</p></div>` },
    1: { html: R`<h3 class="sub">Reading Vmax and Km</h3>
<p>At low substrate concentration the rate rises almost linearly (most active sites are free); at high concentration it levels off at $V_{\max}$ (all sites busy). The Michaelis–Menten equation, $v = \dfrac{V_{\max}[S]}{K_m + [S]}$, describes the curve. $K_m$ is the concentration giving half the maximum rate: a small $K_m$ means high affinity.</p>
<div class="worked"><p>An enzyme has $V_{\max} = 120\ \mu$mol min⁻¹ and $K_m = 2$ mM. What is the rate at 2 mM, 6 mM and 18 mM?</p>
<p>60, 90 and 108 μmol min⁻¹. Tripling the substrate from 6 to 18 mM adds only 20%: the enzyme is near saturation.</p></div>
<p>Plotting $1/v$ against $1/[S]$ (a <strong>Lineweaver–Burk</strong> plot) gives a straight line with intercept $1/V_{\max}$ and slope $K_m/V_{\max}$, an easy way to read both from experiments, and to diagnose inhibitors.</p>` },
    2: { html: R`<h3 class="sub">Temperature and pH curves explained</h3>
<p>Raising temperature increases the kinetic energy of molecules, so collisions are more frequent and more energetic: the rate roughly doubles every 10 °C (the temperature coefficient $Q_{10} \approx 2$). Above the optimum, vibrations break the hydrogen and ionic bonds holding the active site's shape, and the enzyme denatures, sharply and usually permanently.</p>
<p>pH changes the charges on amino acid side chains in the active site (and on the substrate), disrupting binding and ionic bonds. Each enzyme's optimum matches its home: pepsin in the stomach works best near pH 2, trypsin in the small intestine near 8, salivary amylase near 7.</p>
<div class="worked"><p>Enzymes from Thermus aquaticus, a bacterium of hot springs, work at 70 °C. Why is that useful in biotechnology?</p>
<p>Its DNA polymerase (Taq) survives the repeated 95 °C heating steps of PCR, so the enzyme does not need replacing in every cycle.</p></div>` },
    3: { html: R`<h3 class="sub">Inhibitors and metabolic regulation</h3>
<p><strong>Competitive</strong> inhibitors resemble the substrate and occupy the active site; enough substrate outcompetes them, so $V_{\max}$ is unchanged but $K_m$ rises. <strong>Non-competitive</strong> inhibitors bind elsewhere and change the enzyme's shape, lowering $V_{\max}$ whatever the substrate concentration. Some poisons bind irreversibly (nerve agents block acetylcholinesterase; penicillin blocks the bacterial enzyme that builds cell walls).</p>
<div class="worked"><p>Methanol poisoning is treated with ethanol. Why?</p>
<p>Both are substrates of alcohol dehydrogenase. Ethanol competes for the active site, slowing the conversion of methanol into toxic formaldehyde and formic acid while the kidneys excrete the methanol unchanged.</p></div>
<p>Cells control pathways by <strong>end-product inhibition</strong>: the final product inhibits an early enzyme (often <strong>allosterically</strong>, at a separate regulatory site), so production slows when the product accumulates. Enzymes are also switched on and off by adding phosphate groups (by kinases), and their amounts are controlled by gene expression.</p>` }
  });

  X('bio-respiration', {
    0: { html: R`<h3 class="sub">The big picture</h3>
<p>Aerobic respiration: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O, releasing 2870 kJ mol⁻¹, captured as about 30–32 ATP. Rather than burning glucose in one step, cells oxidise it gradually, passing hydrogen atoms (electrons) to carriers NAD and FAD, and finally to oxygen. Four stages, in order: <strong>glycolysis</strong> (cytoplasm), the <strong>link reaction</strong> and <strong>Krebs cycle</strong> (mitochondrial matrix), and <strong>oxidative phosphorylation</strong> (inner mitochondrial membrane).</p>
<div class="worked"><p>What fraction of glucose's energy ends up in ATP, if 32 ATP form at about 50 kJ each under cell conditions?</p>
<p>$32\cdot50/2870 \approx 56\%$, far better than a car engine's 25–30%. The rest is released as heat, which keeps birds and mammals warm.</p></div>` },
    1: { html: R`<h3 class="sub">Following the carbons and the yields</h3>
<p><strong>Glycolysis</strong> splits glucose (6C) into two pyruvate (3C): 2 ATP are spent to activate glucose and 4 made, a net 2 ATP and 2 reduced NAD. The <strong>link reaction</strong> removes CO<sub>2</sub> from each pyruvate and attaches the 2C acetyl group to coenzyme A, making another reduced NAD. In the <strong>Krebs cycle</strong> acetyl (2C) joins oxaloacetate (4C) to form citrate (6C), which is oxidised back to oxaloacetate, releasing 2 CO<sub>2</sub>, and producing 3 reduced NAD, 1 reduced FAD and 1 ATP per turn.</p>
<div class="worked"><p>Count the yield per glucose before the electron transport chain.</p>
<p>Two pyruvates, so two link reactions and two turns: ATP 2 (glycolysis) + 2 (Krebs) = 4; reduced NAD 2 + 2 + 6 = 10; reduced FAD 2. CO<sub>2</sub>: 2 + 4 = 6, accounting for all six carbons.</p></div>` },
    2: { html: R`<h3 class="sub">Chemiosmosis, quantified</h3>
<p>Reduced NAD hands electrons to the electron transport chain; as they pass down a series of carriers to oxygen, the energy released pumps protons from the matrix into the intermembrane space. The protons flow back through <strong>ATP synthase</strong>, a rotary motor that turns about 100 times a second and makes 3 ATP per turn. Mitchell's chemiosmotic theory (Nobel 1978) was controversial until experiments showed an artificial proton gradient alone could drive ATP synthesis.</p>
<p>Each reduced NAD yields about 2.5 ATP and each reduced FAD about 1.5 (FAD enters the chain later, pumping fewer protons). Total: $4 + 10\cdot2.5 + 2\cdot1.5 = 32$ ATP (a little less if NAD from glycolysis is shuttled in as FAD).</p>
<div class="worked"><p>Uncouplers like DNP make the inner membrane leaky to protons. What happens?</p>
<p>The gradient dissipates as heat instead of making ATP. Respiration speeds up to compensate and body temperature rises: DNP was once sold as a diet pill and killed people. Brown fat uses a natural uncoupling protein to generate heat in babies and hibernating animals.</p></div>` },
    3: { html: R`<h3 class="sub">Without oxygen, and with other fuels</h3>
<p>Without oxygen the chain stops and NAD stays reduced, which would halt glycolysis. Cells regenerate NAD by reducing pyruvate: to <strong>lactate</strong> in animals (reversible, converted back in the liver: the "oxygen debt"), or to <strong>ethanol and CO<sub>2</sub></strong> in yeast and plants (irreversible). Only 2 ATP per glucose result, but quickly, which powers sprints.</p>
<p>Other fuels enter the same pathway: fatty acids are cut into 2C acetyl units (β-oxidation) feeding the Krebs cycle; amino acids are deaminated (the nitrogen becomes urea) and their skeletons enter at various points.</p>
<div class="worked"><p>The respiratory quotient RQ = CO<sub>2</sub> produced / O<sub>2</sub> used. What is it for glucose and for a typical fat (C<sub>57</sub>H<sub>104</sub>O<sub>6</sub>, using 80 O<sub>2</sub>)?</p>
<p>Glucose: 6/6 = 1.0. Fat: 57/80 = 0.71. Measuring someone's RQ shows which fuel they are burning; values above 1 suggest fat is being made from carbohydrate.</p></div>` }
  });

  X('bio-photosynthesis', {
    0: { html: R`<h3 class="sub">Absorption and action spectra</h3>
<p>Chlorophyll a and b absorb red and blue light strongly and reflect green, which is why leaves look green. Carotenoids absorb blue-green and pass the energy on, and protect chlorophyll from excess light. An <strong>absorption spectrum</strong> shows which wavelengths pigments absorb; an <strong>action spectrum</strong> shows which wavelengths drive photosynthesis. Their close match is evidence that these pigments power the process.</p>
<p>Engelmann's 1882 experiment showed it elegantly: he shone a spectrum onto a strand of alga in water with oxygen-seeking bacteria, which crowded where oxygen was produced: under red and blue light.</p>
<p>Pigments separate by <strong>chromatography</strong>: carotenes run furthest (most soluble in the solvent), then xanthophylls, chlorophyll a and chlorophyll b, each identified by its $R_f$ value.</p>` },
    1: { html: R`<h3 class="sub">Two photosystems and the Z-scheme</h3>
<p>Light excites electrons in photosystem II; they pass along an electron transport chain to photosystem I, where light boosts them again and they finally reduce NADP to NADPH. Along the way protons are pumped into the thylakoid space, and ATP synthase makes ATP as they flow back: <strong>photophosphorylation</strong>, the same chemiosmosis as in mitochondria. Photosystem II replaces its lost electrons by splitting water (<strong>photolysis</strong>): 2H<sub>2</sub>O → 4H⁺ + 4e⁻ + O<sub>2</sub>. All atmospheric oxygen comes from this reaction.</p>
<div class="worked"><p>How do we know the oxygen comes from water, not from CO<sub>2</sub>?</p>
<p>When plants were given water labelled with the heavy isotope ¹⁸O, the oxygen gas released was labelled; when CO<sub>2</sub> was labelled instead, it was not (Ruben and Kamen, 1941).</p></div>
<p><strong>Cyclic</strong> photophosphorylation sends electrons from photosystem I back to the chain, making extra ATP without NADPH when the Calvin cycle needs more ATP.</p>` },
    2: { html: R`<h3 class="sub">Fixing carbon</h3>
<p>In the stroma, the enzyme <strong>RuBisCO</strong> attaches CO<sub>2</sub> to ribulose bisphosphate (RuBP, 5C), giving two molecules of glycerate 3-phosphate (GP, 3C). ATP and NADPH from the light reactions reduce GP to triose phosphate (TP). For every 6 TP made, 5 are used (with more ATP) to regenerate 3 RuBP, and 1 is the profit, used to build glucose, sucrose, starch, amino acids and lipids.</p>
<div class="worked"><p>How many turns of the cycle, ATP and NADPH make one glucose?</p>
<p>Glucose has 6 carbons: 6 turns (6 CO<sub>2</sub>), using 18 ATP and 12 NADPH.</p></div>
<p>Calvin traced the pathway by feeding algae radioactive ¹⁴CO<sub>2</sub> for a few seconds, then killing them in hot alcohol and identifying which compounds were labelled first: GP after 2 seconds. RuBisCO is slow (a few reactions per second) and probably the most abundant protein on Earth, because plants need so much of it.</p>` },
    3: { html: R`<h3 class="sub">Limiting factors in practice</h3>
<p>The rate is set by whichever factor is in shortest supply (light intensity, CO<sub>2</sub> concentration or temperature); increasing the others has no effect until that one is raised. On a graph of rate against light, the plateau is where something else became limiting.</p>
<div class="worked"><p>A tomato grower adds paraffin heaters to a greenhouse in winter. Why might this increase yield twice over?</p>
<p>The heaters raise the temperature (speeding the enzymes of the Calvin cycle) and release CO<sub>2</sub> from burning. In bright winter light, both are likely limiting. Growers often enrich greenhouses to about 1000 ppm CO<sub>2</sub>.</p></div>
<p>Rates are measured by counting oxygen bubbles from pondweed, by oxygen probes, or by leaf discs that float as they fill with oxygen. At the <strong>compensation point</strong> (dim light) photosynthesis exactly balances respiration: no net gas exchange.</p>` },
    4: { html: R`<h3 class="sub">Beating photorespiration</h3>
<p>RuBisCO also binds O<sub>2</sub>, wasting energy and releasing CO<sub>2</sub> (<strong>photorespiration</strong>), increasingly so in hot, dry conditions when stomata close and O<sub>2</sub> builds up. Up to a quarter of fixed carbon can be lost.</p>
<p><strong>C₄ plants</strong> (maize, sugar cane) first fix CO<sub>2</sub> with PEP carboxylase, which ignores O<sub>2</sub>, in mesophyll cells, then pump it as a 4C acid into bundle-sheath cells, where CO<sub>2</sub> is concentrated around RuBisCO. <strong>CAM plants</strong> (cacti, pineapple) separate the steps in time: they open stomata only at night, storing CO<sub>2</sub> as malic acid, and close them by day to save water.</p>
<div class="worked"><p>Why are C₄ plants rare in cool climates?</p>
<p>The CO<sub>2</sub> pump costs extra ATP. Where it is cool, photorespiration is small and the cost outweighs the benefit, so ordinary C₃ plants such as wheat do better.</p></div>` }
  });

  X('bio-cellcycle', {
    0: { html: R`<h3 class="sub">Checkpoints and cancer</h3>
<p>The cycle is G<sub>1</sub> (growth), S (DNA replication), G<sub>2</sub> (preparation) and M (mitosis and cytokinesis). <strong>Checkpoints</strong> stop it if something is wrong: at G<sub>1</sub> (is the cell big enough, is the DNA undamaged?), at G<sub>2</sub> (is replication complete?), and in mitosis (is every chromosome attached to the spindle?). Proteins called <strong>cyclins</strong> rise and fall through the cycle, switching on cyclin-dependent kinases that drive each transition.</p>
<p><strong>Cancer</strong> is uncontrolled division caused by mutations in two kinds of gene: <strong>proto-oncogenes</strong> that promote division (a mutation acts like a stuck accelerator) and <strong>tumour suppressors</strong> such as p53 that halt it (a mutation removes the brakes). Usually several mutations must accumulate, which is why cancer risk rises with age.</p>
<div class="worked"><p>A drug blocks microtubule assembly. At which stage do treated cells stop, and why is it used against cancer?</p>
<p>In mitosis, at the spindle checkpoint, because the spindle cannot form. Rapidly dividing cancer cells are hit hardest (but so are hair follicles and gut lining, causing side effects). Taxol works this way.</p></div>` },
    1: { html: R`<h3 class="sub">Mitosis step by step</h3>
<p>In <strong>prophase</strong> chromosomes condense (each as two sister chromatids joined at the centromere) and the spindle forms; in <strong>metaphase</strong> they line up at the equator, attached by spindle fibres to both poles; in <strong>anaphase</strong> the centromeres split and the chromatids are pulled to opposite poles; in <strong>telophase</strong> nuclear envelopes reform. <strong>Cytokinesis</strong> then divides the cytoplasm: by a pinching furrow in animal cells, by a new cell plate in plants.</p>
<p>The result is two genetically identical cells, used for growth, repair and asexual reproduction.</p>
<div class="worked"><p>In a root-tip squash, 40 of 500 cells are in mitosis and the cycle takes 20 hours. How long does mitosis last?</p>
<p>Mitotic index 40/500 = 0.08, so mitosis takes about $0.08\cdot20 = 1.6$ hours (assuming cells are spread evenly through the cycle).</p></div>` },
    2: { html: R`<h3 class="sub">How meiosis creates variety</h3>
<p>Meiosis halves the chromosome number (diploid to haploid) in two divisions, producing four genetically different gametes. Variety comes from three sources:</p>
<ul><li><strong>Crossing over</strong> in prophase I: homologous chromosomes pair up and swap segments at chiasmata, making new combinations of alleles on each chromosome.</li>
<li><strong>Independent assortment</strong> in metaphase I: each pair lines up independently, so a human can make $2^{23} \approx 8.4$ million combinations of chromosomes, before crossing over.</li>
<li><strong>Random fertilisation</strong>: any sperm with any egg, $(8.4\times10^6)^2 \approx 7\times10^{13}$ combinations.</li></ul>
<p><strong>Non-disjunction</strong>, when a pair fails to separate, gives gametes with an extra or missing chromosome: trisomy 21 (Down syndrome) is the commonest viable example, becoming more frequent with maternal age.</p>` },
    3: { html: R`<h3 class="sub">Tracking DNA through the cycle</h3>
<p>Let a diploid cell in G<sub>1</sub> have $2n$ chromosomes and DNA content $2C$. After S phase it still has $2n$ chromosomes (each now two chromatids) but $4C$ DNA. Mitosis returns two cells of $2n$, $2C$. In meiosis I the homologues separate: two cells of $n$ chromosomes (still of two chromatids), $2C$; meiosis II separates chromatids: four cells of $n$, $C$.</p>
<div class="worked"><p>A species has $2n = 8$. How many chromosomes, chromatids and DNA "units" (C) are in a cell at metaphase of mitosis, metaphase I and metaphase II?</p>
<p>Mitosis: 8 chromosomes, 16 chromatids, 4C. Metaphase I: 8 chromosomes (as 4 pairs), 16 chromatids, 4C. Metaphase II: 4 chromosomes, 8 chromatids, 2C.</p></div>
<p>A graph of DNA content against time for meiosis therefore shows one doubling followed by two halvings.</p>` }
  });

  X('bio-dna', {
    0: { html: R`<h3 class="sub">How the structure was found</h3>
<p>Several clues came together in 1953. <strong>Chargaff's rules</strong>: in any DNA, A = T and G = C. <strong>Rosalind Franklin's</strong> X-ray photograph 51 showed a helix with regular spacings (0.34 nm between bases, 3.4 nm per turn) and the phosphates on the outside. Watson and Crick built a model that fitted everything: two antiparallel strands, sugar–phosphate backbones outside, bases paired inside, A with T (two hydrogen bonds) and G with C (three).</p>
<div class="worked"><p>A DNA sample has 22% adenine. What are the other percentages, and how long is a 3 million base-pair stretch?</p>
<p>T = 22%, so G + C = 56%: G = C = 28%. Length $3\times10^6\cdot0.34$ nm = 1.0 mm.</p></div>
<p>Complementary pairing immediately suggested how DNA copies itself: "It has not escaped our notice," Watson and Crick wrote, "that the specific pairing we have postulated immediately suggests a possible copying mechanism."</p>` },
    1: { html: R`<h3 class="sub">The machinery of replication</h3>
<p><strong>Helicase</strong> unzips the helix; <strong>DNA polymerase</strong> adds nucleotides complementary to each template strand, but only in the 5′ → 3′ direction, and only extending an existing primer (laid down by primase as a short RNA). So one strand (leading) is made continuously; the other (lagging) is made in short <strong>Okazaki fragments</strong> joined by <strong>ligase</strong>. Polymerase proofreads, giving about one error per $10^9$–$10^{10}$ bases.</p>
<div class="worked"><p>Meselson and Stahl grew bacteria on heavy ¹⁵N, then moved them to ¹⁴N. After one generation the DNA was all of intermediate density; after two, half intermediate and half light. Which model does this support?</p>
<p>Semi-conservative replication: each new double helix keeps one old strand. Conservative replication would give heavy and light bands after one generation; dispersive would never give a pure light band.</p></div>
<p>Linear chromosomes lose a little DNA from their ends each time; <strong>telomeres</strong> (repeats of TTAGGG) buffer this, and their shortening is linked to cell ageing.</p>` },
    2: { html: R`<h3 class="sub">PCR cycle by cycle</h3>
<p>Each PCR cycle has three steps: <strong>denature</strong> at 95 °C (strands separate), <strong>anneal</strong> at about 55 °C (short primers bind on either side of the target), <strong>extend</strong> at 72 °C (Taq polymerase copies). Each cycle doubles the target, so $n$ cycles make up to $2^n$ copies: 30 cycles give about a billion from one molecule, in a couple of hours.</p>
<p><strong>Gel electrophoresis</strong> separates DNA fragments by size: DNA is negatively charged (phosphates), so it moves towards the positive electrode, and the gel's mesh slows longer fragments more. A ladder of known sizes calibrates the gel. DNA profiling compares lengths of short tandem repeats at several places in the genome; the chance two unrelated people match at 20 loci is less than 1 in $10^{20}$.</p>
<div class="worked"><p>A sample starts with 100 copies. After how many cycles are there over a million?</p>
<p>$100\cdot2^n > 10^6$ needs $2^n > 10^4$, so $n = 14$ ($2^{14} = 16\,384$).</p></div>` },
    3: { html: R`<h3 class="sub">Genetic engineering and sequencing</h3>
<p><strong>Restriction enzymes</strong> cut DNA at specific sequences, often leaving single-stranded "sticky ends"; the same enzyme cuts a plasmid, and <strong>ligase</strong> joins the gene in. Bacteria take up the recombinant plasmid (transformation) and are selected with an antibiotic-resistance marker. Human insulin has been made this way since 1982. <strong>CRISPR–Cas9</strong> (Nobel 2020) edits genomes precisely: a guide RNA leads Cas9 to a chosen sequence, where it cuts, and the cell's repair introduces the change.</p>
<p><strong>Sanger sequencing</strong> uses chain-terminating nucleotides that stop copying at each position; separating the fragments by length reads the sequence. Modern methods sequence billions of fragments in parallel: the first human genome took 13 years and about 3 billion dollars; now one takes a day and costs a few hundred dollars.</p>
<div class="worked"><p>A restriction enzyme recognises a 6-base sequence. On average, how often does it cut random DNA?</p>
<p>The chance a given position matches is $(1/4)^6 = 1/4096$: about once every 4 kb.</p></div>` }
  });

  X('bio-expression', {
    0: { html: R`<h3 class="sub">Making and editing the message</h3>
<p><strong>RNA polymerase</strong> binds a <strong>promoter</strong> upstream of a gene, unwinds the DNA and builds mRNA complementary to the template strand (so the mRNA matches the coding strand, with U for T). In eukaryotes the primary transcript is processed before leaving the nucleus: a protective cap and a poly-A tail are added, and <strong>introns</strong> are cut out while <strong>exons</strong> are spliced together.</p>
<p><strong>Alternative splicing</strong> joins exons in different combinations, so one gene can make several proteins: about 20 000 human genes make perhaps 100 000 proteins.</p>
<div class="worked"><p>A gene's coding strand reads 5′-ATGGCCTAA-3′. What is the mRNA, and the template strand?</p>
<p>mRNA 5′-AUGGCCUAA-3′. Template 3′-TACCGGATT-5′ (complementary and antiparallel).</p></div>` },
    1: { html: R`<h3 class="sub">Reading the code</h3>
<p>The code is read in non-overlapping triplets (codons) from a start codon, AUG (methionine), to a stop codon (UAA, UAG, UGA). With 64 codons for 20 amino acids, the code is <strong>degenerate</strong>: most amino acids have several codons, often differing in the third base. It is also nearly <strong>universal</strong>, shared by bacteria and humans, which is why genetic engineering works and strong evidence for common ancestry.</p>
<p>In <strong>translation</strong>, a ribosome moves along the mRNA; tRNAs, each carrying a specific amino acid and an <strong>anticodon</strong>, pair with the codons, and the ribosome joins the amino acids with peptide bonds. Several ribosomes can translate one mRNA at once (a polysome).</p>
<div class="worked"><p>Translate AUG UUU GGC UGA. (UUU = Phe, GGC = Gly.)</p>
<p>Met–Phe–Gly, then stop. Three amino acids from four codons.</p></div>` },
    2: { html: R`<h3 class="sub">Types of mutation and their effects</h3>
<ul><li><strong>Silent</strong>: a base substitution giving a codon for the same amino acid (thanks to degeneracy).</li>
<li><strong>Missense</strong>: a different amino acid, from harmless to devastating depending on where (sickle-cell).</li>
<li><strong>Nonsense</strong>: a premature stop codon, usually destroying function.</li>
<li><strong>Frameshift</strong>: inserting or deleting bases (not in multiples of three) shifts the reading frame, changing every codon afterwards.</li></ul>
<div class="worked"><p>Read THE CAT ATE THE RAT in triplets. What does deleting the first E do, and deleting three letters?</p>
<p>THC ATA TET HER AT: gibberish from the deletion onwards (frameshift). Deleting three adjacent letters removes one "codon" and leaves the rest readable: a much milder effect.</p></div>
<p>Mutations arise from replication errors and from mutagens (UV light, tobacco chemicals, ionising radiation). Most are harmful or neutral, but they are the raw material of evolution.</p>` },
    3: { html: R`<h3 class="sub">Switching genes on and off</h3>
<p>Every cell contains the whole genome, but a liver cell expresses different genes from a nerve cell. Control happens at many levels:</p>
<ul><li><strong>Transcription factors</strong> bind promoters and enhancers to switch genes on or off; oestrogen, for example, enters cells and activates a transcription factor directly.</li>
<li><strong>Epigenetics</strong>: methylating DNA and modifying histones packs genes away (silenced) or opens them; these marks can be inherited by daughter cells and influenced by the environment.</li>
<li>After transcription: RNA interference (small RNAs that destroy specific mRNAs), protein modification and degradation.</li></ul>
<div class="worked"><p>The <em>lac</em> operon of E. coli: when lactose is absent, a repressor blocks the genes for lactose digestion. What happens when lactose appears?</p>
<p>Lactose (as allolactose) binds the repressor, changing its shape so it falls off the DNA; RNA polymerase transcribes the genes and the bacterium makes the enzymes only when they are useful (Jacob and Monod, Nobel 1965).</p></div>` }
  });

  X('bio-mendel', {
    0: { html: R`<h3 class="sub">Mendel's method and the monohybrid cross</h3>
<p>Mendel's success came from method: true-breeding pea lines, single clear-cut traits, controlled pollination, and counting thousands of offspring. Crossing tall (TT) with dwarf (tt) gave all tall F₁ (Tt); selfing the F₁ gave about 3 tall : 1 dwarf. He concluded that each parent passes on one of its two "factors" (alleles), chosen at random: the <strong>law of segregation</strong>, explained later by the separation of homologous chromosomes in meiosis.</p>
<div class="worked"><p>A tall pea plant of unknown genotype is crossed with a dwarf. How do you tell TT from Tt?</p>
<p>This is a <strong>test cross</strong>. TT × tt gives all tall; Tt × tt gives half tall, half dwarf. A single dwarf offspring proves the parent was Tt.</p></div>
<p>Terms: <strong>genotype</strong> (the alleles) versus <strong>phenotype</strong> (the observed trait); <strong>homozygous</strong> (two identical alleles) versus <strong>heterozygous</strong>; <strong>dominant</strong> alleles show in heterozygotes, <strong>recessive</strong> only in homozygotes.</p>` },
    1: { html: R`<h3 class="sub">Probability methods for crosses</h3>
<p>For independent genes, multiply probabilities instead of drawing big Punnett squares. In AaBbCc × AaBbCc, the chance of an aabbcc offspring is $\tfrac14\cdot\tfrac14\cdot\tfrac14 = \tfrac1{64}$; the chance of showing all three dominant traits is $\left(\tfrac34\right)^3 = \tfrac{27}{64}$.</p>
<div class="worked"><p>In a dihybrid cross AaBb × AaBb, what fraction of offspring is heterozygous at both genes? And among plants with both dominant traits, what fraction is true-breeding (AABB)?</p>
<p>$\tfrac12\cdot\tfrac12 = \tfrac14$. Of the 9/16 showing both dominant traits, only 1/16 is AABB: $\tfrac{1}{9}$.</p></div>
<p>The binomial distribution answers family questions: for parents Aa × Aa, the chance that exactly 2 of 4 children are affected (aa) is $\binom42\left(\tfrac14\right)^2\left(\tfrac34\right)^2 = \tfrac{54}{256} \approx 0.21$.</p>` },
    2: { html: R`<h3 class="sub">When ratios change</h3>
<ul><li><strong>Incomplete dominance</strong>: heterozygotes are intermediate (red × white snapdragons give pink; F₂ is 1 red : 2 pink : 1 white).</li>
<li><strong>Codominance</strong>: both alleles show (blood group AB).</li>
<li><strong>Multiple alleles</strong>: the ABO gene has three (I<sup>A</sup>, I<sup>B</sup>, i).</li>
<li><strong>Lethal alleles</strong>: in yellow mice (Yy), YY dies before birth, so Yy × Yy gives 2 yellow : 1 grey.</li>
<li><strong>Epistasis</strong>: one gene masks another. In Labrador dogs, the E gene decides whether pigment is deposited at all (ee is yellow whatever the B gene says), giving 9 black : 3 brown : 4 yellow.</li>
<li><strong>Polygenic</strong> traits like height depend on many genes plus environment, giving continuous, roughly normal variation.</li></ul>
<div class="worked"><p>Can a child with blood group O have a parent with group AB?</p>
<p>No: an AB parent passes on I<sup>A</sup> or I<sup>B</sup>, so the child must have A or B. Such reasoning was used in paternity cases before DNA profiling.</p></div>` },
    3: { html: R`<h3 class="sub">Running a χ² test</h3>
<p>The χ² test asks whether observed counts differ from expected ones by more than chance would explain. Compute $\chi^2 = \sum\dfrac{(O - E)^2}{E}$, find the degrees of freedom (number of categories − 1), and compare with the critical value at $p = 0.05$ (3.84 for 1 d.f., 5.99 for 2, 7.81 for 3). Below it, the deviation is attributed to chance and the hypothesis is accepted.</p>
<div class="worked"><p>A dihybrid cross gives 315 : 108 : 101 : 32 (total 556). Do the data fit 9 : 3 : 3 : 1?</p>
<p>Expected 312.75, 104.25, 104.25, 34.75. $\chi^2 = 0.016 + 0.135 + 0.101 + 0.218 = 0.47$, far below 7.81: an excellent fit. (These are Mendel's own pea data, almost suspiciously good, as Fisher later noted.)</p></div>
<p>A large χ² does not say <em>why</em> the data differ: linkage, lethal alleles or selection are all possible, and the next chapter explores the first.</p>` }
  });
})();
