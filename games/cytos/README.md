# 🧫 Cytos — a cell-biology idle game

You are a cell. Express your genes, build organelles, run the electron transport chain, relay signals, repair your DNA, fight off viruses and replicate. Every process is a **drag-and-drop biology puzzle**, so you need to know how a cell really works to play it well.

**Play:** open `index.html` in a browser, or serve the folder with `python3 -m http.server`. There is no build step.

## How it plays

- **Gene expression.** *Transcription* has three steps: place TFIID and RNA polymerase II on the promoter, pair RNA bases with the template (U, not T!), then cap, splice and polyadenylate the transcript. *Translation*: match tRNA anticodons to mRNA codons and end with a release factor on the stop codon. A perfect puzzle gives bonus yield.
- **Building.** Each organelle or transporter needs a protein sent to the right compartment by its signal sequence: NLS → nucleus, MTS → mitochondrion, SKL → peroxisome, M6P → lysosome, signal peptide + TM helices → plasma membrane, and so on.
- **Respiration.** Assemble Complex I → II → Q → III → cytochrome c → IV → ATP synthase on the inner membrane. Then sort glycolysis, the Krebs cycle and the other stages into the right locations. Your mitochondria respire for a while afterwards.
- **Signalling.** Ligands (insulin, EGF, adrenaline, interferon) bind your receptors. Put each cascade in order (e.g. EGFR → Grb2/SOS → Ras → Raf → MEK → ERK) to get its effect.
- **DNA repair.** ROS and UV damage your DNA, which lowers production. Match each lesion to its repair pathway: BER, NER, MMR, HR or NHEJ.
- **Infection.** Click viruses before they get in, and destroy viral genomes inside the cell.
- **Replication (prestige, about 20 minutes the first time).** Place the fork enzymes (topoisomerase, helicase, SSB, primase, polymerase, ligase), copy the template, then order the stages of mitosis. Dividing resets the cell but gives a permanent lineage bonus and **☢ Mutagen**.
- **🎲 Alleles.** Spend Mutagen to roll a random gene variant for a locus, from Common to Legendary. A variant can carry strong boosts and sometimes harmful traits. Compare it with your current allele, then keep the old one or equip the new.
- **🧠 Cell School.** Five-question rounds on organelles, metabolism, gene expression, signalling, the cell cycle and repair, and immunity. About 150 items use spaced repetition: an item needs 10 well-spaced correct answers to count as learned. **Insight is earned only here**, and it is the only currency for **🧬 Genes**, which automate processes slowly at first and faster with each level.
- **🔬 Microscope view.** Scroll or pinch to zoom up to 2000×, drag to pan, double-click to zoom in. The cell is drawn with realistic structure: mitochondria with cristae, a double nuclear envelope with pores and chromatin, ribosome-studded rough ER, Golgi stacks budding vesicles, polysomes, a centrosome with microtubules carrying vesicles, and a phospholipid bilayer you can see when zoomed in. Labels appear as you zoom. Press 🔦 for a **fluorescence stain** mode (DAPI-blue nucleus, MitoTracker-red mitochondria, GFP-green ER…). Click any structure to open an inspector card with real sizes and facts.
- **✨ Lucky vesicles** drift through the cytoplasm now and then. Catch one for an ATP frenzy, a protein windfall, a clean sweep of damage, a gene surge or even Mutagen.
- **🏆 28 achievements**, each giving +2% ATP and protein, and a **⚡ speed bonus** for fast, perfect puzzles. Sound effects can be muted in Options.
- News ticker, objectives, stats, offline progress for automated genes (up to 8 h), and save export/import.

## Files
- `js/data.js` — resources, structures, genes, allele traits, objectives, news
- `js/puzzles.js` — drag-and-drop engine and the 8 biology puzzles
- `js/quizbank.js`, `js/quiz.js` — Cell School questions and spaced repetition
- `js/game.js` — simulation, automation, replication, alleles, canvas and UI
- `css/style.css` — light theme
