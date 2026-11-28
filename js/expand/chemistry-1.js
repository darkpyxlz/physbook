/* Expanded text for chemistry 1–9: moles, solutions, atomic structure, the periodic table, bonding,
   shapes and intermolecular forces, gases, thermochemistry, entropy and Gibbs energy. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('chem-moles', {
    0: { html: R`
<h3 class="sub">Inside the atom, by the numbers</h3>
<p>An atom is a tiny nucleus of protons and neutrons (radius about $10^{-15}$ m) surrounded by electrons spread over a region 100 000 times wider. The <strong>atomic number</strong> $Z$ (protons) fixes the element; the <strong>mass number</strong> $A$ counts protons plus neutrons. Written $^{A}_{Z}\mathrm X$: chlorine-37 is $^{37}_{17}\mathrm{Cl}$, with 20 neutrons.</p>
<p><strong>Isotopes</strong> of an element have the same $Z$ but different numbers of neutrons. Their chemistry is almost identical (chemistry is about electrons), but their masses, and sometimes their stability, differ.</p>
<div class="worked"><p>Copper is 69.2% $^{63}$Cu (mass 62.93) and 30.8% $^{65}$Cu (mass 64.93). Find its relative atomic mass.</p>
<p>$A_r = 0.692\cdot62.93 + 0.308\cdot64.93 = 43.55 + 20.00 = 63.55$. The weighted mean lies closer to the more abundant isotope.</p></div>
<p>Working backwards: boron ($A_r = 10.81$) is a mixture of $^{10}$B and $^{11}$B. If $x$ is the fraction of $^{10}$B, $10x + 11(1 - x) = 10.81$, so $x = 0.19$: 19% boron-10. A mass spectrometer measures these abundances directly (see Spectroscopy).</p>` },
    1: { html: R`
<h3 class="sub">Moving between mass, moles and particles</h3>
<div class="key"><p>$n = \dfrac{m}{M}$ (moles = mass ÷ molar mass), &emsp; $N = nN_A$ (particles), &emsp; $N_A = 6.022\times10^{23}\ \text{mol}^{-1}$.</p></div>
<p>The molar mass $M$ in g/mol is numerically the relative formula mass: water is $2(1.008) + 16.00 = 18.02$ g/mol. One mole of anything has the same number of particles, which is why chemists count in moles: equations tell you ratios of <em>particles</em>, and the mole converts them into grams you can weigh.</p>
<div class="worked"><p>How many molecules and how many hydrogen atoms are in a 250 g glass of water?</p>
<p>$n = 250/18.02 = 13.9$ mol. Molecules: $13.9\cdot6.022\times10^{23} = 8.36\times10^{24}$. Each has 2 H atoms: $1.67\times10^{25}$.</p></div>
<p>For gases there is a shortcut: at room temperature and pressure (about 25 °C, 1 atm) one mole of any gas fills about 24 dm³ (22.4 dm³ at 0 °C), because gas molecules are far apart and their own size hardly matters. The Gases chapter explains why.</p>
<div class="warn-box"><p>Diatomic elements: oxygen gas is O<sub>2</sub> with $M = 32$ g/mol, not 16. The same goes for H<sub>2</sub>, N<sub>2</sub>, F<sub>2</sub>, Cl<sub>2</sub>, Br<sub>2</sub> and I<sub>2</sub>.</p></div>` },
    2: { html: R`
<h3 class="sub">From percentages to formulae</h3>
<p>The <strong>empirical formula</strong> is the simplest whole-number ratio of atoms; the <strong>molecular formula</strong> is a whole-number multiple of it, fixed by the molar mass. The recipe: assume 100 g, convert each mass to moles, divide by the smallest, and round (multiplying through if you get halves or thirds).</p>
<div class="worked"><p>A compound is 40.0% C, 6.7% H and 53.3% O by mass, and its molar mass is 180 g/mol. Find its molecular formula.</p>
<p>Moles in 100 g: C $40.0/12.01 = 3.33$, H $6.7/1.008 = 6.65$, O $53.3/16.00 = 3.33$. Ratio 1 : 2 : 1, so CH<sub>2</sub>O ($M = 30$). $180/30 = 6$: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>, glucose.</p></div>
<h3 class="sub">Combustion analysis</h3>
<p>Organic compounds are analysed by burning them: every carbon ends up in CO<sub>2</sub> and every hydrogen in H<sub>2</sub>O. Burning 0.290 g of a hydrocarbon gives 0.880 g CO<sub>2</sub> (0.0200 mol C) and 0.450 g H<sub>2</sub>O (0.0500 mol H): ratio 2 : 5, so C<sub>2</sub>H<sub>5</sub>, i.e. C<sub>4</sub>H<sub>10</sub> (butane) if $M = 58$. Oxygen in the compound is found by difference, since some of the oxygen in the products came from the air.</p>
<p><strong>Water of crystallisation</strong> is found by heating: 2.50 g of CuSO<sub>4</sub>·$x$H<sub>2</sub>O leaves 1.60 g anhydrous salt (0.0100 mol), so 0.90 g water (0.050 mol): $x = 5$.</p>` },
    3: { html: R`
<h3 class="sub">Balancing and using equations</h3>
<p>A balanced equation conserves atoms (and charge). Balance elements that appear in only one substance on each side first, oxygen and hydrogen last, and never change a formula, only the coefficients. The coefficients give <strong>mole ratios</strong>.</p>
<div class="worked"><p>Iron is extracted by Fe<sub>2</sub>O<sub>3</sub> + 3CO → 2Fe + 3CO<sub>2</sub>. What mass of iron comes from 1.00 tonne of ore that is 80% Fe<sub>2</sub>O<sub>3</sub>?</p>
<p>Fe<sub>2</sub>O<sub>3</sub>: $800\,000/159.7 = 5009$ mol, giving $2\cdot5009 = 10\,018$ mol Fe $= 559$ kg.</p></div>
<h3 class="sub">Limiting reagents, yield and atom economy</h3>
<p>The <strong>limiting reagent</strong> runs out first and decides how much product forms; to find it, divide the moles of each reactant by its coefficient, and the smallest result wins. <strong>Percentage yield</strong> = actual ÷ theoretical × 100%; real yields fall short through incomplete reaction, side reactions and losses in purification.</p>
<p><strong>Atom economy</strong> asks how much of the reactants' mass ends up in the product you want: $\dfrac{M(\text{desired product})}{\sum M(\text{all products})}\times100\%$. Addition reactions score 100%; substitutions that throw away a by-product score less. Green chemistry tries to maximise it, because waste costs money and harms the environment.</p>
<div class="worked"><p>10.0 g of H<sub>2</sub> and 64.0 g of O<sub>2</sub> react to form water. Which is limiting, and how much water forms?</p>
<p>2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O. H<sub>2</sub>: 4.96 mol ÷ 2 = 2.48; O<sub>2</sub>: 2.00 mol ÷ 1 = 2.00. Oxygen is limiting: 4.00 mol water = 72.1 g, with 0.96 mol H<sub>2</sub> left over.</p></div>` }
  });

  X('chem-solutions', {
    0: { html: R`
<h3 class="sub">Ways of expressing concentration</h3>
<p><strong>Molarity</strong> $c = n/V$ (mol dm⁻³) is the chemist's default. Others suit other jobs: mass concentration (g dm⁻³), percentage by mass, parts per million (1 ppm = 1 mg per kg, used for pollutants), and <strong>molality</strong> (moles per kg of <em>solvent</em>), which does not change with temperature because masses do not expand.</p>
<div class="worked"><p>What mass of sodium chloride is needed for 250 cm³ of 0.200 mol dm⁻³ solution? What is its concentration in g dm⁻³?</p>
<p>$n = 0.200\cdot0.250 = 0.0500$ mol; $m = 0.0500\cdot58.44 = 2.92$ g. Mass concentration $0.200\cdot58.44 = 11.7$ g dm⁻³.</p></div>
<p>Ionic compounds give several ions: 0.10 mol dm⁻³ CaCl<sub>2</sub> contains 0.10 mol dm⁻³ Ca²⁺ and 0.20 mol dm⁻³ Cl⁻. That matters for anything that counts particles, such as colligative properties.</p>
<div class="warn-box"><p>Convert volumes to dm³ (divide cm³ by 1000) before using $n = cV$.</p></div>` },
    1: { html: R`
<h3 class="sub">Dilution and making a standard solution</h3>
<p>Adding solvent does not change the number of moles of solute, so $c_1V_1 = c_2V_2$. To make 500 cm³ of 0.10 mol dm⁻³ acid from a 2.0 mol dm⁻³ stock, take $V_1 = 0.10\cdot500/2.0 = 25$ cm³ and make up to 500 cm³.</p>
<p>A <strong>standard solution</strong> has an accurately known concentration. To prepare one: weigh the solid accurately (by difference), dissolve it in a beaker, transfer quantitatively to a volumetric flask (rinsing the beaker and funnel into it), make up to the mark with the bottom of the meniscus on the line, and invert to mix. A <strong>primary standard</strong> such as anhydrous sodium carbonate is pure, stable, not hygroscopic and has a high molar mass, so weighing errors are small.</p>
<div class="worked"><p>A 10.0 cm³ sample of sea water is diluted to 250.0 cm³; 25.0 cm³ of the diluted solution contains $5.50\times10^{-4}$ mol Cl⁻. What is the chloride concentration of the sea water?</p>
<p>Diluted: $5.50\times10^{-4}/0.0250 = 0.0220$ mol dm⁻³. The dilution factor is $250/10 = 25$, so the sea water has $0.0220\cdot25 = 0.550$ mol dm⁻³, which matches the known value for sea water. Sanity-checking an answer against a known value is part of the method.</p></div>` },
    2: { html: R`
<h3 class="sub">The titration method</h3>
<p>A <strong>titration</strong> finds an unknown concentration by reacting a measured volume with a standard solution delivered from a burette until the <strong>end point</strong> (shown by an indicator) is reached. Repeat until two titres agree within 0.10 cm³ (concordant), and average those.</p>
<div class="worked"><p>25.0 cm³ of sodium hydroxide needs 21.40 cm³ of 0.100 mol dm⁻³ sulfuric acid. Find [NaOH].</p>
<p>H<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O. Acid: $0.100\cdot0.02140 = 2.14\times10^{-3}$ mol; NaOH is twice that, $4.28\times10^{-3}$ mol, in 0.0250 dm³: 0.171 mol dm⁻³.</p></div>
<h3 class="sub">Back titration</h3>
<p>When a substance is insoluble or reacts slowly, add a known <em>excess</em> of reagent, then titrate what is left. Example: chalk (CaCO<sub>3</sub>) is dissolved in 50.0 cm³ of 1.00 mol dm⁻³ HCl (0.0500 mol); the excess acid needs 0.0200 mol NaOH, so 0.0300 mol HCl reacted with the chalk, which is $0.0150$ mol CaCO<sub>3</sub> = 1.50 g.</p>
<p>Sources of error: reading the burette at eye level, removing the funnel before titrating, filling the jet below the tap, and approaching the end point drop by drop.</p>` },
    3: { html: R`
<h3 class="sub">Why particles, not their identity, matter</h3>
<p>Dissolved particles dilute the solvent, making it less eager to escape into the vapour or to freeze. So a solution has a lower vapour pressure, a higher boiling point and a lower freezing point than the pure solvent, by amounts that depend only on the number of dissolved particles:</p>
<div class="key"><p>$\Delta T_b = iK_bm,\quad \Delta T_f = iK_fm,\quad \Pi = icRT$ (osmotic pressure),<br>where $m$ is molality, $c$ molarity and $i$ the van 't Hoff factor (particles per formula unit: 1 for sugar, about 2 for NaCl, 3 for CaCl<sub>2</sub>).</p></div>
<div class="worked"><p>How much does 58.5 g of NaCl in 1.00 kg of water lower the freezing point? ($K_f = 1.86$ K kg mol⁻¹)</p>
<p>1.00 mol NaCl gives 2 mol ions: $\Delta T_f = 2\cdot1.86\cdot1.00 = 3.7$ K, so the water freezes at about $-3.7$ °C. Road salt works this way, down to about $-21$ °C.</p></div>
<p>Osmotic pressure is large: 0.30 mol dm⁻³ of particles at 310 K gives $\Pi = 300\cdot8.314\cdot310 \approx 7.7\times10^5$ Pa, about 7.6 atm. Red blood cells burst in pure water and shrivel in brine for this reason, and measuring $\Pi$ is a sensitive way to find the molar mass of a protein.</p>` },
    4: { html: R`
<h3 class="sub">The Beer–Lambert law in practice</h3>
<p>Light passing through a coloured solution is absorbed. The <strong>absorbance</strong> $A = \log_{10}(I_0/I)$ is proportional to concentration and path length:</p>
<div class="key"><p>$A = \varepsilon\,c\,l$, where $\varepsilon$ is the molar absorptivity (dm³ mol⁻¹ cm⁻¹), $c$ the concentration and $l$ the path length (usually a 1 cm cuvette).</p></div>
<p>Each absorbance unit cuts the transmitted light tenfold: $A = 1$ passes 10%, $A = 2$ only 1%. Choose the wavelength the substance absorbs most strongly (the complementary colour to what you see), zero the instrument with a blank of pure solvent, and make a <strong>calibration curve</strong> from standards of known concentration.</p>
<div class="worked"><p>A solution of KMnO<sub>4</sub> ($\varepsilon = 2400$ dm³ mol⁻¹ cm⁻¹ at 525 nm) has $A = 0.60$ in a 1.00 cm cell. What is its concentration?</p>
<p>$c = A/(\varepsilon l) = 0.60/2400 = 2.5\times10^{-4}$ mol dm⁻³.</p></div>
<p>The law fails at high concentrations (particles interact) and when the light is not monochromatic, which is why calibration curves bend at the top.</p>` }
  });

  X('chem-atom', {
    0: { html: R`
<h3 class="sub">Energy levels from line spectra</h3>
<p>Heated hydrogen glows only at certain wavelengths. Bohr explained this: the electron can only have certain energies, $E_n = -\dfrac{13.6\ \text{eV}}{n^2}$, and when it drops from level $n_i$ to $n_f$ it emits a photon carrying the difference:</p>
<div class="key"><p>$\Delta E = h\nu = \dfrac{hc}{\lambda} = 13.6\ \text{eV}\left(\dfrac{1}{n_f^2} - \dfrac{1}{n_i^2}\right)$</p></div>
<p>Transitions to $n = 1$ give the ultraviolet Lyman series; to $n = 2$, the visible Balmer series; to $n = 3$, the infrared Paschen series. Lines crowd together towards a <strong>convergence limit</strong>, beyond which the electron is free: the energy of the convergence limit of the Lyman series is the ionisation energy, 13.6 eV (1312 kJ mol⁻¹).</p>
<div class="worked"><p>Find the wavelength of the red Balmer line (3 → 2).</p>
<p>$\Delta E = 13.6\left(\tfrac14 - \tfrac19\right) = 1.89$ eV, and $\lambda = \dfrac{1240\ \text{eV nm}}{1.89\ \text{eV}} = 656$ nm. This line colours nebulae red in astronomical photographs.</p></div>
<p>Each element has its own pattern of lines, a fingerprint used in flame tests and to find what stars are made of.</p>` },
    1: { html: R`
<h3 class="sub">What orbitals look like</h3>
<p>Quantum mechanics replaces Bohr's orbits with <strong>orbitals</strong>: regions where the electron is likely to be found. Each is described by quantum numbers: the principal number $n$ (shell, size and energy), $l$ (subshell shape: $l = 0, 1, 2, 3$ for s, p, d, f), $m_l$ (orientation, from $-l$ to $l$) and the spin $m_s = \pm\tfrac12$.</p>
<ul><li>s orbitals are spheres; each shell has one.</li><li>p orbitals are dumbbells along $x$, $y$ and $z$; three per shell from $n = 2$.</li><li>d orbitals have four-lobed shapes; five per shell from $n = 3$.</li><li>f orbitals: seven per shell from $n = 4$.</li></ul>
<p>The <strong>Pauli exclusion principle</strong> allows at most two electrons per orbital (with opposite spins), so shell $n$ holds $2n^2$ electrons: 2, 8, 18, 32.</p>
<div class="worked"><p>How many orbitals and electrons fit in the $n = 4$ shell? How many radial and angular nodes does a 3p orbital have?</p>
<p>Subshells 4s, 4p, 4d, 4f: $1 + 3 + 5 + 7 = 16$ orbitals, 32 electrons.</p>
<p>Angular nodes $= l = 1$; radial nodes $= n - l - 1 = 1$.</p></div>` },
    2: { html: R`
<h3 class="sub">Filling order and the exceptions</h3>
<p>Electrons fill the lowest available energy first (the <strong>Aufbau principle</strong>), roughly in order of $n + l$: 1s 2s 2p 3s 3p <strong>4s</strong> 3d 4p 5s 4d 5p 6s 4f 5d 6p. Within a subshell, <strong>Hund's rule</strong> puts electrons in separate orbitals with parallel spins before pairing them, which lowers the repulsion.</p>
<div class="worked"><p>Write the configurations of Fe, Fe³⁺, Cr and Cu.</p>
<p>Fe: [Ar] 3d⁶ 4s². Fe³⁺: [Ar] 3d⁵ (the 4s electrons leave first, even though 4s filled first). Cr: [Ar] 3d⁵ 4s¹ and Cu: [Ar] 3d¹⁰ 4s¹, not 3d⁴4s² and 3d⁹4s²: half-filled and filled d subshells are especially stable.</p></div>
<p>Configurations explain the periodic table: the s-block fills s orbitals, the d-block d orbitals, and so on. Atoms with unpaired electrons are <strong>paramagnetic</strong> (attracted into a magnetic field); Fe³⁺ with five unpaired electrons is strongly so.</p>` },
    3: { html: R`
<h3 class="sub">Effective nuclear charge with Slater's rules</h3>
<p>An outer electron feels the nuclear charge $Z$ partly cancelled by inner electrons: $Z_{\text{eff}} = Z - S$. Slater's rules estimate the shielding $S$: electrons in the same group (shell) shield 0.35 each (0.30 within 1s); electrons in shell $n - 1$ shield 0.85 each; deeper ones shield 1.00 each. (For d and f electrons, everything to the left shields 1.00.)</p>
<div class="worked"><p>Estimate $Z_{\text{eff}}$ for the outer electron of sodium and for a 2p electron of fluorine.</p>
<p>Na (1s² 2s² 2p⁶ 3s¹): $S = 8\cdot0.85 + 2\cdot1.00 = 8.8$, $Z_{\text{eff}} = 11 - 8.8 = 2.2$.</p>
<p>F (1s² 2s² 2p⁵): $S = 6\cdot0.35 + 2\cdot0.85 = 3.8$, $Z_{\text{eff}} = 9 - 3.8 = 5.2$. The much larger value explains why fluorine holds its electrons so tightly.</p></div>
<p>$Z_{\text{eff}}$ rises steadily across a period (each proton is only partly shielded by the electron added with it) and changes little down a group: the key to every periodic trend in the next chapter.</p>` }
  });

  X('chem-periodic', {
    0: { html: R`
<h3 class="sub">How Mendeleev built the table</h3>
<p>In 1869 Mendeleev arranged the 63 known elements by atomic mass in rows, starting a new row whenever properties repeated. He left gaps and predicted the elements that would fill them; "eka-silicon", found in 1886 as germanium, matched his predicted mass, density and oxide formula closely. Today the order is by atomic number, which fixes the few places where mass order fails (tellurium before iodine, argon before potassium).</p>
<p>Vertical <strong>groups</strong> share outer-electron configurations and so share chemistry: the alkali metals (group 1), alkaline earth metals (2), halogens (17), noble gases (18). Horizontal <strong>periods</strong> correspond to filling one shell. The <strong>blocks</strong> (s, p, d, f) show which subshell is being filled.</p>
<p>Metals sit on the left and in the middle, non-metals at the top right, and a staircase of <strong>metalloids</strong> (B, Si, Ge, As, Sb, Te) between them. Metallic character increases down a group and decreases across a period.</p>` },
    1: { html: R`
<h3 class="sub">Radius trends explained</h3>
<p>Across a period atoms <em>shrink</em>: the added electrons go into the same shell, while $Z_{\text{eff}}$ rises, pulling the shell in. Down a group atoms <em>grow</em>: each new shell is further out. Sodium (186 pm) to chlorine (99 pm) across period 3; lithium (152 pm) to caesium (265 pm) down group 1.</p>
<p><strong>Ions</strong>: cations are smaller than their atoms (they often lose a whole shell, and the remaining electrons feel more pull: Na 186 pm, Na⁺ 102 pm). Anions are larger (extra electron–electron repulsion: Cl 99 pm, Cl⁻ 181 pm).</p>
<div class="worked"><p>Put in order of size: O²⁻, F⁻, Na⁺, Mg²⁺.</p>
<p>All have 10 electrons (<strong>isoelectronic</strong>), so size depends only on nuclear charge: more protons pull harder. O²⁻ (Z = 8) > F⁻ (9) > Na⁺ (11) > Mg²⁺ (12): 140, 133, 102 and 72 pm.</p></div>
<p>The <strong>lanthanide contraction</strong>: the 4f electrons shield poorly, so after the lanthanides, period-6 elements are almost the same size as those above them. Zirconium and hafnium are so alike that separating them is a famous chemical challenge.</p>` },
    2: { html: R`
<h3 class="sub">Reading a graph of ionisation energies</h3>
<p>First ionisation energy rises across a period (rising $Z_{\text{eff}}$, smaller atoms) and falls down a group (outer electrons further out and better shielded). Two small dips across period 2 and 3 are evidence for subshells:</p>
<ul><li>B is lower than Be: boron's electron is in 2p, higher in energy and better shielded than 2s.</li>
<li>O is lower than N: oxygen's fourth 2p electron must pair up in an occupied orbital, and the extra repulsion makes it easier to remove.</li></ul>
<div class="worked"><p>An element's successive ionisation energies (kJ mol⁻¹) are 578, 1817, 2745, 11 577, 14 842. Which group is it in?</p>
<p>The huge jump comes after the third electron: three electrons in the outer shell, then a full inner shell. Group 13: it is aluminium.</p></div>
<h3 class="sub">Electron affinity</h3>
<p>The first electron affinity (energy released when a gaseous atom gains an electron) is generally larger for non-metals on the right. Chlorine's is the largest of all ($-349$ kJ mol⁻¹), larger than fluorine's, because fluorine's tiny 2p shell is crowded. Second electron affinities are always endothermic: adding an electron to a negative ion needs energy, which is why forming O²⁻ costs energy that a lattice must pay back.</p>` },
    3: { html: R`
<h3 class="sub">Electronegativity and the type of bond</h3>
<p><strong>Electronegativity</strong> is an atom's pull on the electrons in a bond. On Pauling's scale fluorine is 4.0, oxygen 3.4, chlorine 3.2, carbon 2.6, hydrogen 2.2, sodium 0.9. It rises across a period and up a group, for the same reasons as ionisation energy.</p>
<p>The difference $\Delta\chi$ predicts the bond: equal values give a <strong>non-polar covalent</strong> bond (Cl–Cl); a moderate difference a <strong>polar covalent</strong> bond with partial charges δ+ and δ− (H–Cl, $\Delta\chi = 1.0$); a large difference (above about 1.8) a mostly <strong>ionic</strong> bond (NaCl, 2.3). It is a continuum, not three boxes: even "ionic" NaCl has some covalent character.</p>
<div class="worked"><p>Why is the oxide of sodium basic and the oxide of sulfur acidic?</p>
<p>Na<sub>2</sub>O is ionic: the O²⁻ ion grabs a proton from water to form OH⁻. SO<sub>3</sub> is covalent, with a very electron-poor sulfur that water attacks, forming H<sub>2</sub>SO<sub>4</sub>. Across a period, oxides change from basic to amphoteric (Al<sub>2</sub>O<sub>3</sub>) to acidic, following electronegativity.</p></div>
<p>The <strong>diagonal relationship</strong>: Li resembles Mg, Be resembles Al, and B resembles Si, because moving one step right (higher charge) and one step down (larger size) roughly cancel, giving similar charge density.</p>` }
  });

  X('chem-bonding', {
    0: { html: R`
<h3 class="sub">What sets the lattice energy</h3>
<p>Lattice energy is the energy released when gaseous ions come together to form a solid. By Coulomb's law it grows with the ions' charges and shrinks with their separation: roughly $\Delta H_{\text{latt}} \propto \dfrac{z_+z_-}{r_+ + r_-}$.</p>
<div class="worked"><p>Rank NaCl, MgO and NaF by lattice energy.</p>
<p>MgO has charges 2 × 2 = 4, against 1 for the others: by far the largest (3850 kJ mol⁻¹). NaF beats NaCl because F⁻ is smaller (923 vs 787 kJ mol⁻¹). That is why MgO melts at 2852 °C and is used to line furnaces.</p></div>
<p>Ionic solids are hard but brittle: shifting a layer brings like charges side by side, and the crystal splits. They conduct electricity only when molten or dissolved, when the ions can move.</p>` },
    1: { html: R`
<h3 class="sub">Building a Born–Haber cycle</h3>
<p>Lattice energy cannot be measured directly, so we use Hess's law. For NaCl, form the solid from the elements two ways: directly ($\Delta H_f = -411$ kJ mol⁻¹), or step by step through gaseous ions:</p>
<p>atomise Na (+107), ionise Na (+496), atomise ½Cl<sub>2</sub> (+122), add an electron to Cl ($-349$), then bring the ions together ($\Delta H_{\text{latt}}$). The two routes must agree:</p>
$$-411 = 107 + 496 + 122 - 349 + \Delta H_{\text{latt}}\ \Rightarrow\ \Delta H_{\text{latt}} = -787\ \text{kJ mol}^{-1}.$$
<p>Comparing such "experimental" lattice energies with ones calculated from a purely ionic model tests the model: they agree closely for NaCl, but AgCl's experimental value is larger than the ionic prediction, showing extra covalent bonding.</p>
<div class="worked"><p>Why does MgCl exist only in theory while MgCl<sub>2</sub> is real?</p>
<p>Making Mg²⁺ costs an extra 1451 kJ mol⁻¹ of second ionisation energy, but the lattice energy of MgCl<sub>2</sub> (about $-2526$) is so much larger than that of a hypothetical MgCl (about $-750$) that MgCl<sub>2</sub>'s formation enthalpy is far more negative. MgCl would disproportionate into Mg and MgCl<sub>2</sub>.</p></div>` },
    2: { html: R`
<h3 class="sub">Drawing Lewis structures step by step</h3>
<ol><li>Count all valence electrons (add one per negative charge, remove one per positive).</li><li>Connect atoms with single bonds; the least electronegative atom (not H) usually goes in the middle.</li><li>Complete octets on the outer atoms, then put remaining electrons on the central atom.</li><li>If the central atom is short of an octet, turn lone pairs on neighbours into double bonds.</li></ol>
<p><strong>Formal charge</strong> = valence electrons − lone-pair electrons − bonds. The best structure keeps formal charges small and puts negative ones on electronegative atoms.</p>
<div class="worked"><p>Draw CO<sub>2</sub> and the nitrate ion.</p>
<p>CO<sub>2</sub>: 16 electrons; O=C=O with two lone pairs on each O, all formal charges zero.</p>
<p>NO<sub>3</sub>⁻: 24 electrons; N in the middle with one double and two single bonds to O. Formal charges: N +1, the double-bonded O 0, the single-bonded O's −1 each, total −1. The double bond could be to any of the three oxygens: resonance (next section).</p></div>
<p>Exceptions: boron in BF<sub>3</sub> has only six electrons; period-3 atoms can exceed eight, as in SF<sub>6</sub> and PCl<sub>5</sub>; odd-electron molecules like NO are radicals. <strong>Dative</strong> bonds supply both electrons from one atom, as in NH<sub>4</sub>⁺ and the ammonia–BF<sub>3</sub> adduct.</p>` },
    3: { html: R`
<h3 class="sub">Resonance and bond order</h3>
<p>When several Lewis structures differ only in where the electrons sit, the real molecule is a single blend, a <strong>resonance hybrid</strong>, not a flicker between them. In the carbonate ion all three C–O bonds are identical, each with bond order $1\tfrac13$. Benzene's six C–C bonds are all 139 pm, between a single (154 pm) and a double bond (134 pm). Delocalisation spreads charge and lowers energy, so resonance-stabilised species are unusually stable.</p>
<div class="key"><p>Bond order = (total bonding pairs between the two atoms over all equivalent structures) ÷ (number of structures). Higher bond order means a shorter, stronger bond.</p></div>
<h3 class="sub">Metallic bonding</h3>
<p>In a metal, the outer electrons leave their atoms and form a "sea" of delocalised electrons around a lattice of cations. This explains the properties: <strong>conductivity</strong> (mobile electrons), <strong>malleability</strong> (layers slide without breaking the non-directional bonding), lustre (free electrons reflect light) and high melting points for metals with many delocalised electrons per atom (Na melts at 98 °C, Mg at 650 °C, Al at 660 °C; transition metals with d electrons even higher).</p>` }
  });

  X('chem-shapes', {
    0: { html: R`
<h3 class="sub">Working out a shape</h3>
<p>Count the <strong>electron domains</strong> around the central atom: each bond (single, double or triple) counts as one, each lone pair as one. Domains spread out as far as possible; the molecule's shape is named after the atoms only.</p>
<div class="table-wrap"><table class="data"><tr><th>Domains</th><th>Lone pairs</th><th>Shape</th><th>Example</th><th>Angle</th></tr>
<tr><td>2</td><td>0</td><td>linear</td><td>CO<sub>2</sub></td><td>180°</td></tr>
<tr><td>3</td><td>0 / 1</td><td>trigonal planar / bent</td><td>BF<sub>3</sub> / SO<sub>2</sub></td><td>120° / ~119°</td></tr>
<tr><td>4</td><td>0 / 1 / 2</td><td>tetrahedral / pyramidal / bent</td><td>CH<sub>4</sub> / NH<sub>3</sub> / H<sub>2</sub>O</td><td>109.5° / 107° / 104.5°</td></tr>
<tr><td>5</td><td>0 / 1 / 2 / 3</td><td>trigonal bipyramidal / seesaw / T-shaped / linear</td><td>PCl<sub>5</sub> / SF<sub>4</sub> / ClF<sub>3</sub> / XeF<sub>2</sub></td><td>90°, 120°</td></tr>
<tr><td>6</td><td>0 / 1 / 2</td><td>octahedral / square pyramidal / square planar</td><td>SF<sub>6</sub> / BrF<sub>5</sub> / XeF<sub>4</sub></td><td>90°</td></tr></table></div>
<p>Lone pairs repel more than bonding pairs (they sit closer to the nucleus), squeezing bond angles: 109.5° in CH<sub>4</sub>, 107° in NH<sub>3</sub>, 104.5° in H<sub>2</sub>O. In five-domain shapes, lone pairs take the roomier equatorial positions.</p>
<div class="worked"><p>Predict the shape of the I<sub>3</sub>⁻ ion.</p>
<p>Central I: 7 valence electrons + 1 (charge) = 8; two bonds use 2, leaving 3 lone pairs. Five domains, three of them lone pairs, all equatorial: the three iodines are in a straight line.</p></div>` },
    1: { html: R`
<h3 class="sub">Hybrid orbitals</h3>
<p>Carbon's 2s and 2p orbitals do not point in tetrahedral directions, yet methane's bonds do. Valence-bond theory mixes them into <strong>hybrid orbitals</strong> matching the VSEPR geometry: sp (two, linear), sp² (three, trigonal planar, with one p left over) and sp³ (four, tetrahedral).</p>
<p>Head-on overlap of orbitals makes a <strong>σ bond</strong>; sideways overlap of parallel p orbitals makes a <strong>π bond</strong>. A single bond is σ; a double bond σ + π; a triple bond σ + 2π. Because the π overlap needs the p orbitals parallel, double bonds cannot rotate, which is the origin of cis–trans isomerism.</p>
<div class="worked"><p>Count σ and π bonds in ethyne (C<sub>2</sub>H<sub>2</sub>) and give each carbon's hybridisation; do the same for acetone.</p>
<p>Ethyne: H–C≡C–H has 3 σ and 2 π bonds; each C is sp (linear).</p>
<p>Acetone (CH<sub>3</sub>COCH<sub>3</sub>): 9 σ (6 C–H, 2 C–C, 1 C–O) and 1 π; the carbonyl carbon is sp², the methyl carbons sp³.</p></div>` },
    2: { html: R`
<h3 class="sub">Polar bonds, polar molecules</h3>
<p>A molecule is <strong>polar</strong> if its bond dipoles do not cancel. Symmetric shapes cancel them: CO<sub>2</sub> (linear), BF<sub>3</sub>, CCl<sub>4</sub>, SF<sub>6</sub> and XeF<sub>4</sub> are non-polar despite polar bonds. Lone pairs or different atoms usually break the symmetry: H<sub>2</sub>O, NH<sub>3</sub>, CHCl<sub>3</sub> and SO<sub>2</sub> are polar.</p>
<div class="worked"><p>Which isomer of dichloroethene, cis or trans, has a dipole moment?</p>
<p>In trans, the two C–Cl dipoles point in opposite directions and cancel. In cis they add: cis is polar (1.9 D), which also gives it the higher boiling point (60 °C vs 48 °C).</p></div>
<p>A quick test: a charged rod bends a thin stream of water but not of hexane. Polarity decides solubility ("like dissolves like"), boiling points and, in biology, how proteins fold and membranes form.</p>` },
    3: { html: R`
<h3 class="sub">Ranking intermolecular forces</h3>
<p>Forces between molecules are much weaker than bonds within them, but they decide melting and boiling points, solubility and viscosity:</p>
<ul><li><strong>London (dispersion) forces</strong>: momentary dipoles inducing dipoles. Present in all molecules; stronger for more electrons and for long, flat shapes with more contact (pentane boils at 36 °C, its compact isomer neopentane at 10 °C).</li>
<li><strong>Dipole–dipole</strong> forces between permanent dipoles.</li>
<li><strong>Hydrogen bonds</strong>: H bonded to N, O or F, attracted to a lone pair on another N, O or F. The strongest intermolecular force (about 20 kJ mol⁻¹).</li></ul>
<div class="worked"><p>Explain the boiling points of the group 16 hydrides: H<sub>2</sub>O 100 °C, H<sub>2</sub>S −60 °C, H<sub>2</sub>Se −41 °C, H<sub>2</sub>Te −2 °C.</p>
<p>From H<sub>2</sub>S down, boiling point rises with the number of electrons (stronger London forces). Water breaks the trend by over 150 °C because of hydrogen bonding. The same anomaly appears for HF and NH<sub>3</sub>.</p></div>
<p>Hydrogen bonding also explains why ice floats (its open hexagonal network is less dense than liquid water), the double helix of DNA, and the high surface tension that lets insects walk on water.</p>` }
  });

  X('chem-gases', {
    0: { html: R`
<h3 class="sub">From Boyle to the ideal gas equation</h3>
<p>Experiments over two centuries found three laws for a fixed amount of gas: <strong>Boyle</strong> ($pV$ constant at fixed temperature), <strong>Charles</strong> ($V \propto T$ at fixed pressure, with $T$ in kelvin) and <strong>Gay-Lussac</strong> ($p \propto T$ at fixed volume). <strong>Avogadro</strong> added that equal volumes contain equal numbers of molecules. Together:</p>
<div class="key"><p>$pV = nRT$, with $R = 8.314$ J mol⁻¹ K⁻¹. Use SI units: $p$ in Pa, $V$ in m³, $T$ in K. And for a fixed amount, $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$.</p></div>
<div class="worked"><p>A 2.00 dm³ flask holds 0.100 mol of gas at 27 °C. What is the pressure? What is the gas's molar mass if its mass is 3.20 g?</p>
<p>$p = \dfrac{0.100\cdot8.314\cdot300}{2.00\times10^{-3}} = 1.25\times10^5$ Pa. $M = 3.20/0.100 = 32.0$ g/mol: probably oxygen.</p></div>
<p>The density of a gas is $\rho = \dfrac{pM}{RT}$, so heavier gases are denser: CO<sub>2</sub> pools in low places, and helium balloons rise. At 0 °C and 1 atm one mole occupies 22.4 dm³; at 25 °C, 24.5 dm³.</p>
<div class="warn-box"><p>Celsius temperatures in gas laws give nonsense: doubling 10 °C to 20 °C is not doubling the temperature. Always add 273.</p></div>` },
    1: { html: R`
<h3 class="sub">Dalton's law and mole fractions</h3>
<p>In a mixture each gas behaves as if it were alone: the total pressure is the sum of the <strong>partial pressures</strong>, and each partial pressure is the mole fraction times the total, $p_i = x_ip$.</p>
<div class="worked"><p>Air is 78% N<sub>2</sub>, 21% O<sub>2</sub> and 1% Ar by moles. What is the partial pressure of oxygen at sea level and at the top of Everest (total 33.7 kPa)?</p>
<p>Sea level: $0.21\cdot101.3 = 21.3$ kPa. Everest: $0.21\cdot33.7 = 7.1$ kPa, a third as much, which is why climbers need bottled oxygen.</p></div>
<p>Gases collected over water contain water vapour: subtract the vapour pressure of water at that temperature (3.2 kPa at 25 °C) from the measured pressure to get the pressure of the dry gas. Divers breathe mixtures with less oxygen at depth, because at 4 atm even 21% oxygen has a partial pressure that becomes toxic over time.</p>` },
    2: { html: R`
<h3 class="sub">Kinetic theory: temperature is motion</h3>
<p>Molecules fly about at random, colliding elastically. Pressure is the result of their impacts on the walls. Working this through gives $pV = \tfrac13Nm\overline{v^2}$, and comparing with $pV = nRT$ shows that the average kinetic energy is proportional to temperature: $\tfrac12m\overline{v^2} = \tfrac32k_BT$.</p>
<div class="key"><p>$v_{\text{rms}} = \sqrt{\dfrac{3RT}{M}}$ ($M$ in kg/mol). Graham's law: $\dfrac{\text{rate}_1}{\text{rate}_2} = \sqrt{\dfrac{M_2}{M_1}}$.</p></div>
<div class="worked"><p>Find the rms speed of N<sub>2</sub> at 25 °C, and how much faster H<sub>2</sub> effuses than O<sub>2</sub>.</p>
<p>$v_{\text{rms}} = \sqrt{3\cdot8.314\cdot298/0.028} = 515$ m/s, faster than sound.</p>
<p>$\sqrt{32/2} = 4$ times faster.</p></div>
<p>Graham's law was used to enrich uranium for the first reactors: UF<sub>6</sub> containing U-235 effuses just 0.4% faster than that with U-238, so the gas was passed through thousands of porous barriers in series.</p>` },
    3: { html: R`
<h3 class="sub">When gases stop being ideal</h3>
<p>The ideal-gas model assumes molecules have no volume and no attractions. At high pressure the molecules' own volume matters (the gas is harder to compress); at low temperature the attractions matter (molecules pull each other back, reducing the pressure on the walls). The <strong>compressibility factor</strong> $Z = \dfrac{pV}{nRT}$ is 1 for an ideal gas.</p>
<div class="key"><p>van der Waals: $\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT$, where $a$ measures attractions and $b$ the volume of a mole of molecules.</p></div>
<div class="worked"><p>Compare the ideal and van der Waals pressures of 1.00 mol CO<sub>2</sub> in 0.500 dm³ at 300 K ($a = 0.364$ Pa m⁶ mol⁻², $b = 4.27\times10^{-5}$ m³ mol⁻¹).</p>
<p>Ideal: $8.314\cdot300/5\times10^{-4} = 4.99$ MPa. van der Waals: $\dfrac{2494}{4.57\times10^{-4}} - \dfrac{0.364}{2.5\times10^{-7}} = 5.46 - 1.46 = 4.00$ MPa. Attractions lower the pressure by 20%.</p></div>
<p>Gases deviate least at high temperature and low pressure. Below the <strong>critical temperature</strong> (31 °C for CO<sub>2</sub>) a gas can be liquefied by pressure alone; above it, no amount of squeezing forms a liquid, and the dense fluid (supercritical CO<sub>2</sub>) is used to decaffeinate coffee.</p>` }
  });

  X('chem-thermo', {
    0: { html: R`
<h3 class="sub">System, surroundings and sign conventions</h3>
<p><strong>Enthalpy change</strong> $\Delta H$ is the heat exchanged at constant pressure. Exothermic reactions release heat to the surroundings ($\Delta H < 0$: combustion, neutralisation, respiration); endothermic reactions absorb it ($\Delta H > 0$: photosynthesis, thermal decomposition, dissolving ammonium nitrate in a cold pack).</p>
<p>Energy is released when bonds form and absorbed when they break. An exothermic reaction makes stronger bonds than it breaks. On an <strong>enthalpy profile</strong>, the products sit below the reactants for exothermic reactions, and the hump in between is the <strong>activation energy</strong>, needed to get started even when the overall change is downhill.</p>
<p><strong>Standard conditions</strong> (⦵): 100 kPa, a stated temperature (usually 298 K), solutions at 1 mol dm⁻³, substances in their standard states. Standard enthalpies are defined per mole of a specific reaction: of combustion (1 mol burned completely in oxygen), of formation (1 mol formed from its elements in their standard states), of neutralisation (1 mol water formed).</p>` },
    1: { html: R`
<h3 class="sub">Measuring enthalpy changes</h3>
<p>Heat absorbed by water: $q = mc\Delta T$, with $c = 4.18$ J g⁻¹ K⁻¹. Then $\Delta H = -q/n$ (negative if the solution warms up).</p>
<div class="worked"><p>Burning 0.500 g of ethanol heats 200 g of water by 14.0 K. Find $\Delta H_c$ and compare with the data-book value, $-1367$ kJ mol⁻¹.</p>
<p>$q = 200\cdot4.18\cdot14.0 = 11.7$ kJ; $n = 0.500/46.07 = 0.01085$ mol; $\Delta H_c = -1080$ kJ mol⁻¹. Only 79% of the true value: heat escapes to the air and the can, and combustion may be incomplete (soot on the can is the clue).</p></div>
<p>For reactions in solution, use an insulated polystyrene cup and extrapolate the temperature–time graph back to the moment of mixing, to correct for heat lost while the reaction ran. A <strong>bomb calorimeter</strong> (sealed steel vessel in water, calibrated with benzoic acid) gives accurate combustion data at constant volume; the result is $\Delta U$, which differs from $\Delta H$ by $\Delta n_{\text{gas}}RT$.</p>` },
    2: { html: R`
<h3 class="sub">Hess's law: the route does not matter</h3>
<p>Because enthalpy is a <strong>state function</strong>, the total change from reactants to products is the same by any route. So enthalpy changes of awkward reactions can be calculated from easy ones.</p>
<div class="key"><p>$\Delta H_r = \sum\Delta H_f(\text{products}) - \sum\Delta H_f(\text{reactants})$<br>$\Delta H_r = \sum\Delta H_c(\text{reactants}) - \sum\Delta H_c(\text{products})$</p></div>
<div class="worked"><p>Find $\Delta H_f$ of methane from combustion data: C (−394), H<sub>2</sub> (−286), CH<sub>4</sub> (−890 kJ mol⁻¹).</p>
<p>C + 2H<sub>2</sub> → CH<sub>4</sub>. $\Delta H = [-394 + 2(-286)] - (-890) = -76$ kJ mol⁻¹ (data book: −75). You cannot measure this directly: carbon and hydrogen do not simply combine to make methane.</p></div>
<div class="worked"><p>Find $\Delta H$ for C<sub>2</sub>H<sub>4</sub> + H<sub>2</sub>O → C<sub>2</sub>H<sub>5</sub>OH from $\Delta H_f$: C<sub>2</sub>H<sub>4</sub> +52, H<sub>2</sub>O(l) −286, C<sub>2</sub>H<sub>5</sub>OH(l) −277.</p>
<p>$-277 - (52 - 286) = -43$ kJ mol⁻¹.</p></div>
<p>Elements in their standard states have $\Delta H_f = 0$ by definition. Watch states: water vapour has $\Delta H_f = -242$ kJ mol⁻¹, not −286.</p>` },
    3: { html: R`
<h3 class="sub">Estimating with bond enthalpies</h3>
<p><strong>Mean bond enthalpy</strong> is the energy to break one mole of a bond in the gas phase, averaged over many compounds. Then</p>
<div class="key"><p>$\Delta H \approx \sum(\text{bonds broken}) - \sum(\text{bonds formed})$</p></div>
<div class="worked"><p>Estimate $\Delta H$ for CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O (gas) using C–H 413, O=O 498, C=O 805, O–H 464 kJ mol⁻¹.</p>
<p>Broken: $4(413) + 2(498) = 2648$. Formed: $2(805) + 4(464) = 3466$. $\Delta H \approx -818$ kJ mol⁻¹, close to the true −802 for gaseous water.</p></div>
<p>Results are approximate because a bond's strength depends on its environment (the C–H bonds in methane are not identical to "average" C–H bonds) and because the method only works for gases. Still, it explains <em>why</em> fuels release energy: the C=O and O–H bonds of the products are much stronger than the C–H and O=O bonds of the reactants.</p>` }
  });

  X('chem-gibbs', {
    0: { html: R`
<h3 class="sub">Counting ways: what entropy is</h3>
<p>Entropy measures how many microscopic arrangements (microstates) are consistent with what we see: Boltzmann's $S = k_B\ln W$. Spontaneous processes increase the total entropy of the universe, simply because high-entropy states are overwhelmingly more likely: a gas spreads through a room because there are vastly more spread-out arrangements than bunched ones.</p>
<p>Predicting the sign of $\Delta S$ for a reaction: entropy increases when solids or liquids turn into gases, when the number of gas molecules increases, when things dissolve or mix, and on heating.</p>
<div class="worked"><p>Predict the sign of $\Delta S$ for (a) CaCO<sub>3</sub>(s) → CaO(s) + CO<sub>2</sub>(g), (b) N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>, and calculate (b) from $S^\circ$ (J K⁻¹ mol⁻¹): N<sub>2</sub> 192, H<sub>2</sub> 131, NH<sub>3</sub> 193.</p>
<p>(a) A gas is produced: positive. (b) Four gas molecules become two: negative. $\Delta S = 2(193) - [192 + 3(131)] = -199$ J K⁻¹ mol⁻¹.</p></div>
<p>Unlike enthalpies, absolute entropies are known (the third law sets $S = 0$ for a perfect crystal at 0 K), so elements have non-zero $S^\circ$.</p>` },
    1: { html: R`
<h3 class="sub">Why ΔG decides</h3>
<p>A reaction changes the entropy of the system by $\Delta S$ and of the surroundings by $-\Delta H/T$ (the heat it releases spreads out there). The total must increase: $\Delta S - \Delta H/T > 0$. Multiplying by $-T$ gives the condition $\Delta G = \Delta H - T\Delta S < 0$. Gibbs energy is a bookkeeping device that tracks the universe's entropy using only the system.</p>
<div class="table-wrap"><table class="data"><tr><th>ΔH</th><th>ΔS</th><th>Spontaneous?</th><th>Example</th></tr>
<tr><td>−</td><td>+</td><td>always</td><td>combustion</td></tr><tr><td>+</td><td>−</td><td>never</td><td>reverse of combustion</td></tr>
<tr><td>−</td><td>−</td><td>at low T</td><td>freezing water, Haber process</td></tr><tr><td>+</td><td>+</td><td>at high T</td><td>melting ice, decomposing CaCO<sub>3</sub></td></tr></table></div>
<div class="worked"><p>Above what temperature does CaCO<sub>3</sub> decompose? ($\Delta H = +178$ kJ mol⁻¹, $\Delta S = +161$ J K⁻¹ mol⁻¹)</p>
<p>$\Delta G = 0$ when $T = \Delta H/\Delta S = 178\,000/161 = 1106$ K, about 830 °C. Lime kilns run hotter than this.</p></div>
<div class="warn-box"><p>Units: $\Delta H$ is usually in kJ and $\Delta S$ in J. Convert one before combining. And "spontaneous" says nothing about speed: diamond turning into graphite is spontaneous but immeasurably slow.</p></div>` },
    2: { html: R`
<h3 class="sub">ΔG° and the equilibrium constant</h3>
<p>$\Delta G$ changes as a reaction proceeds: $\Delta G = \Delta G^\circ + RT\ln Q$. At equilibrium $\Delta G = 0$ and $Q = K$, giving</p>
<div class="key"><p>$\Delta G^\circ = -RT\ln K$, so $K = e^{-\Delta G^\circ/RT}$.</p></div>
<p>Every 5.7 kJ mol⁻¹ of $\Delta G^\circ$ at 298 K multiplies $K$ by 10. So $\Delta G^\circ = -30$ kJ mol⁻¹ means $K \approx 2\times10^5$ (essentially complete), and $+30$ kJ mol⁻¹ means $K \approx 5\times10^{-6}$ (barely happens). Values between about $-10$ and $+10$ kJ mol⁻¹ give comparable amounts of reactants and products.</p>
<div class="worked"><p>For N<sub>2</sub>O<sub>4</sub> ⇌ 2NO<sub>2</sub>, $\Delta G^\circ = +4.7$ kJ mol⁻¹ at 298 K. Find $K$.</p>
<p>$K = e^{-4700/(8.314\cdot298)} = e^{-1.90} = 0.15$.</p></div>` },
    3: { html: R`
<h3 class="sub">Driving unfavourable reactions</h3>
<p>A reaction with positive $\Delta G$ can be made to go by <strong>coupling</strong> it to one with a larger negative $\Delta G$, so that the sum is negative. In metallurgy, reducing a metal oxide is often unfavourable on its own, but coupling it with burning carbon (to CO or CO<sub>2</sub>) makes the total negative above a certain temperature. An <strong>Ellingham diagram</strong> plots $\Delta G^\circ$ against $T$ for forming each oxide; any line lying below another means that element can reduce the other's oxide.</p>
<div class="worked"><p>In cells, glucose + phosphate → glucose-6-phosphate has $\Delta G^\circ = +13.8$ kJ mol⁻¹. How does the cell make it happen?</p>
<p>It couples the reaction with ATP hydrolysis ($-30.5$ kJ mol⁻¹): the enzyme hexokinase transfers a phosphate from ATP directly to glucose. Overall $\Delta G^\circ = -16.7$ kJ mol⁻¹. Coupling to ATP is how living things build complex molecules uphill.</p></div>
<p>Electrochemical cells are another coupling: $\Delta G = -nFE$ links free energy to voltage, so a battery is a reaction whose $\Delta G$ is turned directly into electrical work (see Electrochemistry).</p>` }
  });
})();
