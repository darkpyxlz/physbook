/* Expanded text for chemistry 19–26: carbonyls and synthesis, spectroscopy, the solid state, s-block,
   p-block, chalcogens and halogens, coordination chemistry, redox diagrams and analysis. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('chem-synthesis', {
    0: { html: R`
<h3 class="sub">Nucleophilic addition to C=O</h3>
<p>The carbonyl carbon is δ+ (oxygen pulls the π electrons), so nucleophiles attack it and the π bond's electrons move onto oxygen. Protonation then gives the product. With HCN (from KCN and a little acid), aldehydes and ketones form <strong>hydroxynitriles</strong>, which add a carbon to the chain; with NaBH<sub>4</sub>, hydride (H⁻) adds and gives alcohols (aldehydes → primary, ketones → secondary).</p>
<div class="worked"><p>Why is the product of ethanal + HCN a racemate, and why are aldehydes more reactive than ketones?</p>
<p>The carbonyl is planar, so cyanide attacks from either face with equal chance: equal amounts of the two enantiomers. Aldehydes have only one electron-donating alkyl group (less reduction of the δ+ charge) and less crowding around the carbon.</p></div>
<p>Tests that tell aldehydes from ketones rely on aldehydes being easily oxidised: <strong>Tollens' reagent</strong> gives a silver mirror and <strong>Fehling's solution</strong> a brick-red Cu<sub>2</sub>O precipitate with aldehydes only. <strong>2,4-DNPH</strong> gives an orange precipitate with both; its melting point identifies the compound.</p>` },
    1: { html: R`
<h3 class="sub">The family of acid derivatives</h3>
<p>Carboxylic acid derivatives react by <strong>nucleophilic addition–elimination</strong>: the nucleophile adds to C=O, then the leaving group is expelled and C=O reforms. Their reactivity follows how good the leaving group is: acyl chloride (Cl⁻ leaves easily) > acid anhydride > ester > amide.</p>
<ul><li>Acyl chloride + water → acid; + alcohol → ester; + ammonia → amide; + amine → N-substituted amide. Fast, at room temperature, with HCl fumes.</li>
<li>Acid + alcohol with an acid catalyst ⇌ ester + water (<strong>esterification</strong>): reversible and slow; remove water or use excess alcohol to push it forward.</li>
<li>Ester hydrolysis by acid is reversible; by alkali (<strong>saponification</strong>, how soap is made from fats) it goes to completion because the carboxylate cannot react back.</li></ul>
<div class="worked"><p>Aspirin is made from salicylic acid and ethanoic anhydride rather than ethanoyl chloride. Why?</p>
<p>The anhydride is cheaper, less corrosive and reacts less violently, and its by-product (ethanoic acid) is harmless compared with HCl gas. Industrial chemistry trades reactivity for safety and cost.</p></div>` },
    2: { html: R`
<h3 class="sub">Electrophilic substitution of benzene</h3>
<p>Benzene's six π electrons are delocalised in a ring, making it 150 kJ mol⁻¹ more stable than a hypothetical cyclohexatriene (from enthalpies of hydrogenation). So benzene does not decolorise bromine water: addition would destroy the aromatic ring. Instead it undergoes <strong>substitution</strong>: an electrophile attacks, forming a positive intermediate, and a proton leaves to restore aromaticity.</p>
<ul><li><strong>Nitration</strong>: concentrated HNO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> make NO<sub>2</sub>⁺; below 55 °C to avoid multiple substitution.</li>
<li><strong>Halogenation</strong>: Br<sub>2</sub> with an FeBr<sub>3</sub> or AlCl<sub>3</sub> "halogen carrier" that makes Br⁺.</li>
<li><strong>Friedel–Crafts</strong> alkylation and acylation with RCl/RCOCl and AlCl<sub>3</sub>, making C–C bonds to the ring.</li></ul>
<p>Existing substituents steer the next one: electron donors (–OH, –NH<sub>2</sub>, –CH<sub>3</sub>) activate the ring and direct to the 2- and 4-positions; electron-withdrawers (–NO<sub>2</sub>, –COOH, –CHO) deactivate it and direct to the 3-position. Phenol is so activated that it decolorises bromine water instantly, giving 2,4,6-tribromophenol.</p>` },
    3: { html: R`
<h3 class="sub">Retrosynthesis: working backwards</h3>
<p>To plan a synthesis, start from the target and ask "what simple reaction made this bond?". Disconnect it into simpler precursors, and repeat until you reach available starting materials. Then check the forward route for problems (other groups that would react, wrong isomers, too many steps lowering the overall yield).</p>
<div class="worked"><p>Plan a synthesis of propanoic acid from ethene.</p>
<p>Propanoic acid has one more carbon than ethene, so a C–C bond must form: a nitrile hydrolysis adds the carbon. Route: ethene + HBr → bromoethane; + KCN (ethanol, reflux) → propanenitrile; + dilute acid, reflux → propanoic acid. Three steps; at 80% each the overall yield is about 51%.</p></div>
<p>Useful "carbon-extending" reactions: cyanide (SN2 with haloalkanes, addition to carbonyls), Friedel–Crafts, and Grignard reagents (R–MgBr attacking a carbonyl). Practical skills matter as much as reactions: reflux to heat without losing volatile liquids, distillation to separate, recrystallisation to purify solids, and melting points and spectra to confirm what you made.</p>` }
  });

  X('chem-spectro', {
    0: { html: R`
<h3 class="sub">Reading a mass spectrum</h3>
<p>In a mass spectrometer, molecules are ionised (often by electron impact), accelerated, separated by mass-to-charge ratio $m/z$ and detected. The peak at highest $m/z$ (apart from isotope peaks) is the <strong>molecular ion</strong> M⁺, giving the molar mass. Bonds break to give <strong>fragments</strong>: a loss of 15 suggests CH<sub>3</sub>, 29 suggests C<sub>2</sub>H<sub>5</sub> or CHO, 45 COOH.</p>
<div class="worked"><p>A compound shows M⁺ at 78 and 80 in a 3 : 1 ratio, and a fragment at 43. Identify it.</p>
<p>Two peaks 2 apart in 3 : 1 mean one chlorine ($^{35}$Cl : $^{37}$Cl). 78 − 35 = 43, which is C<sub>3</sub>H<sub>7</sub>: chloropropane, C<sub>3</sub>H<sub>7</sub>Cl. (Bromine gives M and M + 2 in about 1 : 1.)</p></div>
<p>High-resolution mass spectrometry measures masses to four decimal places, telling apart molecules with the same nominal mass: CO (27.9949), N<sub>2</sub> (28.0061) and C<sub>2</sub>H<sub>4</sub> (28.0313).</p>` },
    1: { html: R`
<h3 class="sub">Key IR absorptions</h3>
<p>Bonds vibrate at frequencies set by their stiffness and the masses of the atoms, like springs. Infrared light at those frequencies is absorbed, provided the vibration changes the dipole moment. Absorptions are quoted as wavenumbers (cm⁻¹):</p>
<div class="table-wrap"><table class="data"><tr><th>Bond</th><th>Wavenumber</th><th>Appearance</th></tr>
<tr><td>O–H (alcohol)</td><td>3200–3550</td><td>broad (hydrogen bonding)</td></tr><tr><td>O–H (acid)</td><td>2500–3300</td><td>very broad</td></tr>
<tr><td>N–H</td><td>3300–3500</td><td>medium</td></tr><tr><td>C–H</td><td>2850–3100</td><td>sharp</td></tr>
<tr><td>C≡N</td><td>2220–2260</td><td>sharp</td></tr><tr><td>C=O</td><td>1680–1750</td><td>strong, sharp</td></tr>
<tr><td>C=C</td><td>1620–1680</td><td>medium</td></tr><tr><td>C–O</td><td>1000–1300</td><td>strong</td></tr></table></div>
<p>Below 1500 cm⁻¹ lies the <strong>fingerprint region</strong>, unique to each compound and matched against databases. Breathalysers detect ethanol by its C–H absorption near 2950 cm⁻¹; IR spectroscopy also follows greenhouse gases, which absorb Earth's outgoing infrared.</p>
<div class="worked"><p>A compound C<sub>3</sub>H<sub>6</sub>O has a strong peak at 1715 cm⁻¹ and nothing above 3000 cm⁻¹ except C–H. What could it be?</p>
<p>C=O, no O–H: an aldehyde or a ketone, propanal or propanone. NMR (or Tollens' test) decides.</p></div>` },
    2: { html: R`
<h3 class="sub">Interpreting ¹H NMR</h3>
<p>Four pieces of information come from a proton NMR spectrum:</p>
<ol><li><strong>Number of signals</strong>: the number of different hydrogen environments (symmetry makes environments equivalent).</li>
<li><strong>Chemical shift</strong> δ (ppm, relative to TMS at 0): electronegative neighbours deshield protons and move them downfield. Roughly: alkyl 0.9–1.7, next to C=O 2.0–2.7, next to O 3.3–4.3, alkene 4.5–6, aromatic 6.5–8, aldehyde 9–10, acid 10–12.</li>
<li><strong>Integration</strong>: the area of each signal is proportional to the number of H.</li>
<li><strong>Splitting</strong>: a signal is split by $n$ neighbouring H (on adjacent carbons) into $n + 1$ lines (the <strong>n + 1 rule</strong>): singlet, doublet, triplet, quartet.</li></ol>
<div class="worked"><p>Ethyl ethanoate, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>: predict its spectrum.</p>
<p>Three environments: CH<sub>3</sub>–C=O, singlet, 3H, δ 2.0; O–CH<sub>2</sub>, quartet (3 neighbours), 2H, δ 4.1; CH<sub>3</sub> of ethyl, triplet (2 neighbours), 3H, δ 1.2. The quartet–triplet pair is the signature of an ethyl group.</p></div>
<p>O–H and N–H protons often appear as broad singlets and disappear when D<sub>2</sub>O is shaken with the sample (they exchange with deuterium). ¹³C NMR counts carbon environments, and MRI scanners use the same physics on the protons of water in the body.</p>` },
    3: { html: R`
<h3 class="sub">Putting the evidence together</h3>
<p>A typical structure problem gives an empirical formula (from combustion), a molar mass (mass spectrum), functional groups (IR) and the carbon–hydrogen framework (NMR). First compute the <strong>degree of unsaturation</strong>: $\dfrac{2C + 2 + N - H - X}{2}$ counts rings plus π bonds. A value of 4 or more with signals near δ 7 suggests a benzene ring.</p>
<div class="worked"><p>C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>: IR shows a very broad peak 2500–3300 and a strong peak at 1710 cm⁻¹; ¹H NMR: δ 0.9 (3H, triplet), 1.6 (2H, sextet), 2.3 (2H, triplet), 11.5 (1H, singlet). Identify it.</p>
<p>Unsaturation 1 (the C=O). Very broad O–H plus C=O means a carboxylic acid (δ 11.5). A CH<sub>3</sub>–CH<sub>2</sub>–CH<sub>2</sub>– chain fits the splittings. Butanoic acid.</p></div>
<h3 class="sub">Chromatography</h3>
<p>Chromatography separates mixtures by how strongly each component sticks to a stationary phase compared with how well it dissolves in the moving phase. Thin-layer chromatography gives $R_f$ values (distance moved by the spot ÷ distance moved by the solvent); gas chromatography gives retention times and, coupled to a mass spectrometer (GC–MS), identifies trace substances in forensic, doping and environmental testing.</p>` }
  });

  X('chem-solid', {
    0: { html: R`
<h3 class="sub">Counting atoms in a unit cell</h3>
<p>Atoms on the corners of a cubic cell are shared by 8 cells, on faces by 2, on edges by 4; atoms inside count fully. Simple cubic: $8\cdot\tfrac18 = 1$ atom. Body-centred cubic: 2. Face-centred cubic: $8\cdot\tfrac18 + 6\cdot\tfrac12 = 4$.</p>
<p>The <strong>packing efficiency</strong> follows from geometry: in fcc the atoms touch along the face diagonal, $4r = a\sqrt2$, and four spheres fill $\dfrac{4\cdot\frac43\pi r^3}{a^3} = \dfrac{\pi}{3\sqrt2} = 74\%$ of the cell, the densest possible packing of equal spheres (Kepler's conjecture, proved in 1998 with computer help). Bcc packs 68%, simple cubic 52%.</p>` },
    1: { html: R`
<h3 class="sub">Working a density problem</h3>
<p>$\rho = \dfrac{ZM}{N_Aa^3}$, where $Z$ is the number of formula units per cell.</p>
<div class="worked"><p>Copper is fcc with $a = 361$ pm. Find its density and its atomic radius.</p>
<p>$\rho = \dfrac{4\cdot63.55\times10^{-3}}{6.022\times10^{23}\cdot(3.61\times10^{-10})^3} = 8.97\times10^3$ kg m⁻³ (measured 8.96). Radius $r = a\sqrt2/4 = 128$ pm.</p></div>
<p>Run backwards, density and cell size measured by X-rays gave one of the most precise values of the Avogadro constant, from a near-perfect sphere of silicon-28.</p>` },
    2: { html: R`
<h3 class="sub">Holes and radius ratios</h3>
<p>Many ionic structures are a close-packed array of the larger anions with the smaller cations in the gaps between them. A close-packed array has two tetrahedral holes and one octahedral hole per anion. The <strong>radius ratio</strong> $r_+/r_-$ predicts which gap fits: 0.225–0.414 tetrahedral (coordination 4, zinc blende), 0.414–0.732 octahedral (6, rock salt), above 0.732 cubic (8, caesium chloride).</p>
<div class="worked"><p>Predict the structure of NaCl ($r_+ = 102$ pm, $r_- = 181$ pm) and CsCl ($r_+ = 167$ pm).</p>
<p>NaCl: ratio 0.56, octahedral: rock salt ✓. CsCl: 0.92, cubic coordination: CsCl structure ✓. The rule often fails for more covalent compounds, so treat it as a guide.</p></div>` },
    3: { html: R`
<h3 class="sub">Indexing a powder pattern</h3>
<p>For a cubic crystal, planes $(hkl)$ are spaced $d = \dfrac{a}{\sqrt{h^2 + k^2 + l^2}}$, and Bragg's law $n\lambda = 2d\sin\theta$ turns each into a diffraction angle. So $\sin^2\theta \propto h^2 + k^2 + l^2$. The allowed sums identify the lattice: simple cubic gives 1, 2, 3, 4, 5, 6, 8…; bcc only even sums 2, 4, 6, 8…; fcc only all-odd or all-even indices: 3, 4, 8, 11, 12…</p>
<div class="worked"><p>A cubic metal's first peaks have $\sin^2\theta$ in the ratio 3 : 4 : 8 : 11. What is its lattice?</p>
<p>Those are the fcc sums (111), (200), (220), (311). Face-centred cubic.</p></div>` },
    4: { html: R`
<h3 class="sub">Semiconductors and doping</h3>
<p>In band theory, a solid's electrons occupy bands; the gap between the filled <strong>valence band</strong> and the empty <strong>conduction band</strong> decides conductivity. Metals have no gap, insulators a large one (diamond 5.5 eV), semiconductors a small one (silicon 1.1 eV), so heating them excites more electrons and their conductivity <em>rises</em> with temperature, unlike metals.</p>
<p><strong>Doping</strong> silicon with a group 15 element (P) adds spare electrons (n-type); a group 13 element (B) leaves holes (p-type). A p–n junction conducts one way only: the diode, and with two junctions, the transistor at the heart of every computer chip. The band gap also sets the colour of LEDs and the voltage of solar cells.</p>` }
  });

  X('chem-sblock', {
    0: { html: R`<p>Hydrogen's position is debated: it has one electron like group 1, needs one more like group 17, and has a half-filled shell like group 14. As a fuel it releases 286 kJ mol⁻¹ (about 142 MJ per kg, three times petrol), with only water as the product; but most hydrogen is still made from methane (steam reforming), releasing CO<sub>2</sub>. "Green" hydrogen comes from electrolysis powered by renewable electricity.</p>` },
    1: { html: R`<div class="worked"><p>Why does reactivity with water increase down group 2, while the hydroxides become more soluble?</p>
<p>Reactivity: the outer electrons are further from the nucleus and more shielded, so the ionisation energies fall. Solubility: the lattice energy of the hydroxides falls faster than the hydration energy of the larger cations, so dissolving becomes more favourable.</p></div>
<p>Uses follow the trends: Mg(OH)<sub>2</sub> as an antacid (barely soluble, so mild), Ca(OH)<sub>2</sub> (slaked lime) to neutralise acidic soils, and BaSO<sub>4</sub> meals for X-ray imaging of the gut.</p>` },
    2: { html: R`<div class="worked"><p>Put MgCO<sub>3</sub>, CaCO<sub>3</sub> and BaCO<sub>3</sub> in order of decomposition temperature and explain.</p>
<p>MgCO<sub>3</sub> (about 350 °C) < CaCO<sub>3</sub> (about 840 °C) < BaCO<sub>3</sub> (about 1360 °C). The small Mg²⁺ ion has a high charge density and polarises (distorts) the carbonate's electron cloud, weakening a C–O bond; it also forms a very stable oxide lattice. Larger cations polarise less, so their carbonates need more heat.</p></div>
<p>The same idea explains group 1: only lithium's nitrate decomposes like a group 2 nitrate (to the oxide, NO<sub>2</sub> and O<sub>2</sub>), while the others stop at the nitrite. Lithium's small, polarising ion is again the exception: the diagonal relationship with magnesium.</p>` },
    3: { html: R`<p>Flame colours come from electrons excited by heat falling back to lower levels: Li crimson, Na yellow-orange (589 nm, the sodium D lines of street lights), K lilac, Rb red, Cs blue, Ca brick red, Sr crimson, Ba apple green. Fireworks use these salts; spectroscopes in astronomy use the same lines to find sodium in the Sun.</p>
<p>The anomalies of the first member of each group come from its small size: lithium forms a nitride with nitrogen (like magnesium), beryllium's compounds are covalent and its hydroxide amphoteric (like aluminium).</p>` },
    4: { html: R`<div class="worked"><p>How much chlorine does a membrane cell produce per tonne of sodium hydroxide?</p>
<p>2NaCl + 2H<sub>2</sub>O → 2NaOH + H<sub>2</sub> + Cl<sub>2</sub>. 1 tonne NaOH = 25 000 mol, giving 12 500 mol Cl<sub>2</sub> = 886 kg. The two products are made in a fixed ratio whatever the demand, a classic balancing act for the chlor-alkali industry.</p></div>
<p>The <strong>Solvay process</strong> makes sodium carbonate (for glass) from brine, ammonia and limestone; ammonia is recycled, making it one of the first "closed-loop" industrial processes.</p>` }
  });

  X('chem-pblock', {
    0: { html: R`<p>Boron is a non-metal with only three valence electrons, so its compounds are <strong>electron deficient</strong>: BF<sub>3</sub> is a Lewis acid that grabs lone pairs, and diborane B<sub>2</sub>H<sub>6</sub> holds together with two three-centre two-electron "banana" bonds. Aluminium's oxide layer (only a few nanometres thick) protects it so well that this reactive metal is used for aircraft and cans; anodising thickens the layer deliberately.</p>
<div class="worked"><p>Why does AlCl<sub>3</sub> exist as Al<sub>2</sub>Cl<sub>6</sub> in the vapour at low temperature?</p>
<p>Each Al has only six valence electrons in AlCl<sub>3</sub>. A lone pair on a chlorine of one molecule forms a dative bond to the Al of another, completing both octets.</p></div>` },
    1: { html: R`<p>Group 14 shows the full change from non-metal to metal: carbon, silicon, germanium (metalloids), tin and lead (metals). Carbon's allotropes span the extremes of properties: diamond (hardest natural material, an insulator), graphite (soft, conducting along its layers), graphene (a single layer, 200 times stronger than steel) and the fullerenes.</p>
<p>Carbon dioxide is a gas of small molecules, but silicon dioxide is a giant covalent network: silicon is too large to form strong π bonds with oxygen, so it forms four single bonds instead. That one difference explains why the atmosphere contains CO<sub>2</sub> while rocks are silicates.</p>` },
    2: { html: R`<div class="worked"><p>Why is lead(II) chloride stable but lead(IV) chloride a powerful oxidising agent that decomposes on warming?</p>
<p>Down group 14 the s² pair becomes increasingly reluctant to take part in bonding (the inert-pair effect: relativistic contraction of the 6s orbital, and weaker bonds that do not repay the extra ionisation energy). So +2 becomes the stable state for lead, and Pb(IV) compounds readily gain two electrons: PbCl<sub>4</sub> → PbCl<sub>2</sub> + Cl<sub>2</sub>.</p></div>
<p>The same effect makes thallium(I) more stable than thallium(III) in group 13, and bismuth(III) more stable than bismuth(V) in group 15.</p>` },
    3: { html: R`<p>Nitrogen's triple bond (945 kJ mol⁻¹) makes N<sub>2</sub> almost inert, which is why the Haber process needs a catalyst, and why lightning and nitrogen-fixing bacteria are so important in nature. Its compounds span oxidation states −3 (NH<sub>3</sub>) to +5 (HNO<sub>3</sub>). Nitric acid is made by the <strong>Ostwald process</strong>: ammonia burned over platinum to NO, then oxidised to NO<sub>2</sub> and absorbed in water.</p>
<p>Phosphorus has no triple bonds (its 3p orbitals overlap poorly sideways); white phosphorus is P<sub>4</sub> tetrahedra, so strained that it ignites in air. Phosphates are essential to life: DNA's backbone, ATP, bones and teeth. Fertiliser run-off rich in nitrate and phosphate causes <strong>eutrophication</strong>: algal blooms that strip rivers of oxygen.</p>` }
  });

  X('chem-chalcogens', {
    0: { html: R`<p>Oxides are classified by behaviour: basic (Na<sub>2</sub>O, CaO), acidic (SO<sub>3</sub>, CO<sub>2</sub>, P<sub>4</sub>O<sub>10</sub>), amphoteric (Al<sub>2</sub>O<sub>3</sub>, ZnO) and neutral (CO, N<sub>2</sub>O). Ozone (O<sub>3</sub>) in the stratosphere absorbs UV-B and UV-C; at ground level it is a pollutant formed when sunlight acts on nitrogen oxides from traffic. Hydrogen peroxide (O in state −1) both oxidises and reduces, and decomposes to water and oxygen, catalysed by MnO<sub>2</sub> or the enzyme catalase.</p>` },
    1: { html: R`<div class="worked"><p>Why is concentrated sulfuric acid both a dehydrating agent and an oxidising agent?</p>
<p>It has a very strong affinity for water (the reaction is highly exothermic), so it pulls H and O out of sugars, leaving carbon. And sulfur in state +6 can be reduced to SO<sub>2</sub> (+4), S (0) or H<sub>2</sub>S (−2), as in its reactions with copper and with bromide and iodide.</p></div>
<p>Always add acid to water, never water to acid: the heat released could boil the small amount of water and spray acid out.</p>` },
    2: { html: R`<p>Fluorine is the most reactive element: its F–F bond is unusually weak (repulsion between lone pairs on the small atoms) and it forms very strong bonds to everything else. Hydrofluoric acid is weak (the H–F bond is strong) but extremely dangerous, as it penetrates skin and binds calcium. The halogens' oxidising strength, F<sub>2</sub> > Cl<sub>2</sub> > Br<sub>2</sub> > I<sub>2</sub>, shows directly in their standard electrode potentials: +2.87, +1.36, +1.09 and +0.54 V.</p>
<div class="worked"><p>Starch turns blue-black in iodine solution. How is this used in titrations?</p>
<p>In iodometric titrations, iodine is titrated with sodium thiosulfate (I<sub>2</sub> + 2S<sub>2</sub>O<sub>3</sub>²⁻ → 2I⁻ + S<sub>4</sub>O<sub>6</sub>²⁻). Starch is added near the end point; the blue-black colour vanishes sharply when the last iodine is used.</p></div>` },
    3: { html: R`<p>In <strong>disproportionation</strong> one element is simultaneously oxidised and reduced. Chlorine in cold alkali goes from 0 to −1 (Cl⁻) and +1 (ClO⁻); in hot alkali the chlorate(I) disproportionates further to Cl⁻ and ClO<sub>3</sub>⁻ (+5). Copper(I) in water gives copper metal and copper(II). Whether a species disproportionates can be read from a Frost diagram: a point lying above the line joining its neighbours is unstable.</p>
<p>Interhalogens (ClF, BrF<sub>3</sub>, IF<sub>7</sub>) have shapes predicted by VSEPR: IF<sub>7</sub> is a pentagonal bipyramid. The larger central halogen can hold more fluorines around it.</p>` },
    4: { html: R`<p>Noble-gas compounds need a highly electronegative partner and a large, easily ionised noble gas: xenon forms XeF<sub>2</sub> (linear), XeF<sub>4</sub> (square planar) and XeF<sub>6</sub>, plus oxides; krypton forms only KrF<sub>2</sub>; helium, neon and argon form no stable neutral compounds. Neil Bartlett's 1962 discovery started from his observation that PtF<sub>6</sub> could oxidise O<sub>2</sub>, whose ionisation energy is almost the same as xenon's.</p>
<p>Uses rely on inertness and light: argon fills light bulbs and shields welding, helium cools MRI magnets (boiling at 4.2 K), neon glows red in signs.</p>` }
  });

  X('chem-coord', {
    0: { html: R`<div class="worked"><p>Name [Co(NH<sub>3</sub>)<sub>4</sub>Cl<sub>2</sub>]Cl and K<sub>3</sub>[Fe(CN)<sub>6</sub>], and find the oxidation state of each metal.</p>
<p>First: ligands alphabetically (ammine before chloro), then the metal with its oxidation state: tetraamminedichloridocobalt(III) chloride. Charges: $x + 0 - 2 = +1$, so Co is +3.</p>
<p>Second: anionic complexes end in -ate (with the Latin root for some metals): potassium hexacyanidoferrate(III). Fe: $x - 6 = -3$, +3.</p></div>
<p>Werner proved the structure of such complexes around 1900 by counting ions: [Co(NH<sub>3</sub>)<sub>6</sub>]Cl<sub>3</sub> gives three free Cl⁻ (precipitated by AgNO<sub>3</sub>), while [Co(NH<sub>3</sub>)<sub>4</sub>Cl<sub>2</sub>]Cl gives only one.</p>` },
    1: { html: R`<p>Octahedral MA<sub>4</sub>B<sub>2</sub> has cis and trans isomers; MA<sub>3</sub>B<sub>3</sub> has fac (three B on one face) and mer (three B around a meridian). Complexes with three bidentate ligands, like [Co(en)<sub>3</sub>]³⁺, are chiral, existing as Δ and Λ propeller-shaped enantiomers, and Werner resolved them to prove the octahedral geometry.</p>
<div class="worked"><p>Why is cisplatin an anticancer drug while transplatin is inactive?</p>
<p>In cisplatin, [Pt(NH<sub>3</sub>)<sub>2</sub>Cl<sub>2</sub>], the two chlorides are next to each other. Inside the cell they are replaced by two neighbouring guanine bases on one DNA strand, kinking the DNA so the cell cannot copy it. The trans geometry cannot bind two neighbouring bases.</p></div>` },
    2: { html: R`<p>Stepwise constants usually fall ($K_1 > K_2 > \dots$): there are fewer positions to fill and statistical and charge effects oppose each additional ligand. The overall constant $\beta_n = K_1K_2\cdots K_n$ can be enormous.</p>
<div class="worked"><p>[Ni(NH<sub>3</sub>)<sub>6</sub>]²⁺ has $\log\beta_6 = 8.6$ while [Ni(en)<sub>3</sub>]²⁺ has $\log\beta_3 = 18.3$, though both have six Ni–N bonds. Why?</p>
<p>The chelate effect is mainly entropic: Ni(NH<sub>3</sub>)<sub>6</sub>²⁺ + 3en → Ni(en)<sub>3</sub>²⁺ + 6NH<sub>3</sub> turns 4 particles into 7, increasing entropy. Also, once one end of en is bound, the other end is held close and binds easily.</p></div>
<p>EDTA's chelation is used to treat lead poisoning, soften water and preserve food (by locking up metal ions that catalyse spoilage).</p>` },
    3: { html: R`<div class="worked"><p>Check the 18-electron rule for Fe(CO)<sub>5</sub> and ferrocene, Fe(C<sub>5</sub>H<sub>5</sub>)<sub>2</sub>.</p>
<p>Fe(CO)<sub>5</sub>: Fe(0) has 8 valence electrons, each CO donates 2: $8 + 10 = 18$ ✓. Ferrocene (ionic count): Fe²⁺ has 6, each C<sub>5</sub>H<sub>5</sub>⁻ donates 6: $6 + 12 = 18$ ✓.</p></div>
<p>CO binds metals by σ donation from carbon and <strong>π back-bonding</strong> from filled metal d orbitals into CO's empty π* orbitals; this strengthens the metal–C bond and weakens C≡O (its IR stretch drops from 2143 cm⁻¹ in free CO to about 2000 cm⁻¹). Back-bonding is also why CO is poisonous: it binds the iron of haemoglobin 200 times more strongly than O<sub>2</sub>.</p>` },
    4: { html: R`<p>A Jahn–Teller distortion appears whenever the electrons fill degenerate orbitals unevenly: high-spin d⁴ and d⁹ (and low-spin d⁷) octahedral complexes stretch along one axis, lowering their energy. Cu²⁺ (d⁹) complexes almost always have two long axial bonds, which is why [Cu(NH<sub>3</sub>)<sub>4</sub>(H<sub>2</sub>O)<sub>2</sub>]²⁺ keeps two loosely bound waters.</p>
<p>The <strong>trans effect</strong> (some ligands speed up the replacement of the ligand opposite them: CN⁻ > CO > I⁻ > Cl⁻ > NH<sub>3</sub>) is a synthetic tool: starting from [PtCl<sub>4</sub>]²⁻ and adding ammonia twice gives cisplatin, while starting from [Pt(NH<sub>3</sub>)<sub>4</sub>]²⁺ and adding chloride twice gives transplatin.</p>` }
  });

  X('chem-redox', {
    0: { html: R`<div class="worked"><p>Balance dichromate oxidising ethanol to ethanoic acid in acid.</p>
<p>Reduction: Cr<sub>2</sub>O<sub>7</sub>²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H<sub>2</sub>O. Oxidation: C<sub>2</sub>H<sub>5</sub>OH + H<sub>2</sub>O → CH<sub>3</sub>COOH + 4H⁺ + 4e⁻. Multiply by 2 and 3 (12 electrons) and add: 2Cr<sub>2</sub>O<sub>7</sub>²⁻ + 3C<sub>2</sub>H<sub>5</sub>OH + 16H⁺ → 4Cr³⁺ + 3CH<sub>3</sub>COOH + 11H<sub>2</sub>O. The orange-to-green colour change was the basis of early breathalysers.</p></div>
<p>The <strong>oxidation-number method</strong> is a quicker alternative: find the change in oxidation number of each element that changes, make the total increase equal the total decrease, then balance O with water and H with H⁺.</p>` },
    1: { html: R`<p>A Latimer diagram lists the standard potentials between successive oxidation states. Potentials between non-adjacent states are found by weighting with the number of electrons (potentials do not simply add; free energies do): $E^\circ_{13} = \dfrac{n_1E^\circ_1 + n_2E^\circ_2}{n_1 + n_2}$.</p>
<div class="worked"><p>Given Cu²⁺/Cu⁺ +0.15 V and Cu⁺/Cu +0.52 V, find Cu²⁺/Cu and decide whether Cu⁺ disproportionates.</p>
<p>$E^\circ = \dfrac{0.15 + 0.52}{2} = 0.34$ V. For 2Cu⁺ → Cu + Cu²⁺, $E^\circ_{\text{cell}} = 0.52 - 0.15 = +0.37$ V > 0: Cu⁺ disproportionates in water, which is why copper(I) compounds are found only when insoluble (CuI, Cu<sub>2</sub>O) or complexed.</p></div>
<p>In a Frost diagram ($nE^\circ$ against oxidation state) the most stable state lies lowest, and the slope between two points is their potential; steep downhill lines show strong oxidising agents.</p>` },
    2: { html: R`<p>Pourbaix diagrams add pH: lines show where species are equally stable, sloping where H⁺ or OH⁻ take part (by 0.059 V per pH unit per H⁺ per electron). Two dashed lines bound the region where water itself is stable; above the upper one water is oxidised to O<sub>2</sub>, below the lower one reduced to H<sub>2</sub>.</p>
<p>For iron, the regions show immunity (Fe metal, at low potential), corrosion (soluble Fe²⁺/Fe³⁺ in acid) and passivation (insoluble oxides near neutral and alkaline pH). Corrosion engineers use these maps: keeping steel in concrete (pH about 12.5) passivates it, while chloride ions from road salt break down the passive film.</p>` },
    3: { html: R`<div class="worked"><p>An iron tablet weighing 0.500 g is dissolved in acid; the Fe²⁺ needs 18.40 cm³ of 0.0200 mol dm⁻³ KMnO<sub>4</sub>. What percentage of the tablet is iron?</p>
<p>MnO<sub>4</sub>⁻: $3.68\times10^{-4}$ mol; Fe²⁺ is 5 times that, $1.84\times10^{-3}$ mol = 0.103 g Fe: 20.6%.</p></div>
<p>Permanganate titrations need no indicator: the first excess drop turns the solution pink. They are done in dilute sulfuric acid (not HCl, which would be oxidised to chlorine). Iodometric titrations measure oxidising agents (copper in brass, chlorine in bleach) by letting them liberate iodine from excess iodide, which is then titrated with thiosulfate.</p>` },
    4: { html: R`<p>Classical qualitative analysis identifies ions by reactions with characteristic results. Cations: add NaOH drop by drop and then in excess. Cu²⁺ gives a blue precipitate; Fe²⁺ green (turning brown in air); Fe³⁺ red-brown; Al³⁺, Zn²⁺ and Pb²⁺ white, dissolving in excess (amphoteric hydroxides); NH<sub>4</sub>⁺ gives ammonia gas on warming (turns damp red litmus blue).</p>
<p>Anions: carbonate fizzes with acid (CO<sub>2</sub> turns limewater milky); sulfate gives white BaSO<sub>4</sub> with acidified barium chloride; halides as in Main-Group Chemistry. Today instrumental methods (ICP spectroscopy, ion chromatography) do the same job with parts-per-billion sensitivity, but the classical tests still teach the chemistry behind them.</p>` }
  });
})();
