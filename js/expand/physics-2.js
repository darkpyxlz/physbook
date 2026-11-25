/* Expanded text for physics 9–16: fluids, waves, thermal physics, thermodynamics, electrostatics,
   circuits, magnetism, induction. */
(function () {
  const R = PB.R;
  const X = (id, sections) => PB.expand(id, { sections: sections });

  X('fluids', {
    0: { html: R`<h3 class="sub">Pressure at depth and how to measure it</h3>
<p>In a fluid at rest, pressure increases with depth as $p = p_0 + \rho gh$ and is the same at every point of a horizontal level (if the fluid is connected). It acts equally in all directions. <strong>Pascal's principle</strong> follows: a pressure change applied anywhere is transmitted throughout, which is how hydraulic jacks multiply force by the ratio of piston areas.</p>
<div class="worked"><p>How tall would a water barometer be? What is the pressure at the bottom of the Mariana Trench (11 km)?</p>
<p>$h = p_0/(\rho g) = 101\,325/(1000\cdot9.81) = 10.3$ m (mercury, 13.6 times denser, needs 760 mm). Trench: $1025\cdot9.81\cdot11\,000 \approx 1.1\times10^8$ Pa, about 1100 atmospheres.</p></div>
<p>A U-tube <strong>manometer</strong> measures pressure differences by the difference in liquid heights. Blood pressure is still quoted in mmHg: 120 mmHg is 16 kPa above atmospheric.</p>
<div class="worked"><p>A dam holds water of depth $H$ against a wall of width $w$. Find the total force and where it effectively acts.</p>
<p>$F = \int_0^H\rho g y\,w\,dy = \tfrac12\rho gwH^2$, acting at depth $\tfrac23H$ (the centroid of the triangular pressure distribution). Dams are thicker at the bottom for this reason.</p></div>` },
    1: { html: R`<h3 class="sub">Floating, stability and hidden ice</h3>
<p>Archimedes' principle: the upthrust equals the weight of fluid displaced. A floating body displaces its own weight, so the fraction submerged is $\rho_{\text{body}}/\rho_{\text{fluid}}$.</p>
<div class="worked"><p>What fraction of an iceberg (density 917 kg m⁻³) is under seawater (1025 kg m⁻³)? And when ice floating in a glass of water melts, does the level rise?</p>
<p>89.5% is hidden. The water level stays the same: the ice displaces exactly its own mass of water, which is what it becomes. (Floating sea ice melting barely changes sea level; land ice sliding into the sea does raise it.)</p></div>
<div class="worked"><p>A crown weighs 25.0 N in air and 23.4 N in water. Is it gold (19 300 kg m⁻³)?</p>
<p>Upthrust 1.6 N, so its volume is $1.6/(1000\cdot9.81) = 1.63\times10^{-4}$ m³, and its density $25.0/(9.81\cdot1.63\times10^{-4}) = 15\,600$ kg m⁻³: too low, so it is alloyed with something lighter.</p></div>
<p>A floating ship is stable if, when it tilts, the upthrust's line of action (through the new centre of buoyancy) crosses the centre line above the centre of gravity, at the <strong>metacentre</strong>. Top-heavy loading lowers that margin, and ships can capsize.</p>` },
    2: { html: R`<h3 class="sub">Applying Bernoulli</h3>
<p>For steady, incompressible, non-viscous flow along a streamline, $p + \tfrac12\rho v^2 + \rho gh$ is constant; continuity gives $A_1v_1 = A_2v_2$. Faster flow means lower pressure.</p>
<div class="worked"><p>Water drains from a hole 0.8 m below the surface of a large tank. How fast does it emerge?</p>
<p>The surface moves slowly and both points are at atmospheric pressure: $v = \sqrt{2gh} = 3.96$ m s⁻¹ (<strong>Torricelli's law</strong>), the same as a stone falling from the surface.</p></div>
<div class="worked"><p>A Venturi meter narrows a water pipe from 10 cm² to 5 cm²; the pressure difference is 6 kPa. Find the flow rate.</p>
<p>$v_2 = 2v_1$ and $\Delta p = \tfrac12\rho(v_2^2 - v_1^2) = \tfrac32\rho v_1^2$, so $v_1 = \sqrt{2\cdot6000/(3\cdot1000)} = 2$ m s⁻¹ and the flow is $2\times10^{-3}$ m³ s⁻¹ (2 L per second).</p></div>
<p>Uses: a <strong>Pitot tube</strong> measures airspeed on aircraft from $\tfrac12\rho v^2$; atomisers and carburettors draw liquid into a fast air stream. Aircraft lift is often "explained" by equal transit times over the wing, which is false: the air over the top arrives much <em>earlier</em>. Lift is best understood as the wing deflecting air downward, with Bernoulli describing the resulting pressure differences.</p>` },
    3: { html: R`<h3 class="sub">Viscous flow and capillarity</h3>
<p>Viscosity $\eta$ is a fluid's internal friction. For steady flow through a pipe of radius $r$ and length $L$, <strong>Poiseuille's law</strong> gives the volume flow rate</p>
<div class="key"><p>$Q = \dfrac{\pi r^4\Delta p}{8\eta L}$</p></div>
<p>The fourth power means a 10% narrowing of an artery cuts flow by 34% at the same pressure. The <strong>Reynolds number</strong> $Re = \rho vD/\eta$ decides whether flow is smooth (laminar, $Re \lesssim 2000$ in pipes) or turbulent.</p>
<div class="worked"><p>Water ($\eta = 10^{-3}$ Pa s) flows at 1 m s⁻¹ in a 2 cm pipe; a bacterium 2 μm long swims at 30 μm s⁻¹. Compare their Reynolds numbers.</p>
<p>Pipe: $1000\cdot1\cdot0.02/10^{-3} = 2\times10^4$, turbulent. Bacterium: $1000\cdot3\times10^{-5}\cdot2\times10^{-6}/10^{-3} = 6\times10^{-5}$: inertia is irrelevant, and if it stops swimming it stops dead within a fraction of an atom's width.</p></div>
<p><strong>Capillary rise</strong>: in a tube of radius $r$, surface tension lifts water to $h = \dfrac{2\gamma\cos\theta}{\rho gr}$, about 15 mm for a 1 mm radius tube. The pressure inside a bubble of radius $r$ exceeds the outside by $2\gamma/r$ for a drop ($4\gamma/r$ for a soap bubble with two surfaces), so small bubbles have higher pressure: connected, a small bubble empties into a large one.</p>` }
  });

  X('waves', {
    0: { html: R`<h3 class="sub">Wave equation and wave speeds</h3>
<p>A sinusoidal wave travelling in the $+x$ direction is $y = A\sin(kx - \omega t)$, with wavenumber $k = 2\pi/\lambda$, angular frequency $\omega = 2\pi f$ and speed $v = \omega/k = f\lambda$. Any shape moving without change, $y = f(x - vt)$, satisfies the <strong>wave equation</strong> $\dfrac{\partial^2y}{\partial t^2} = v^2\dfrac{\partial^2y}{\partial x^2}$.</p>
<p>The speed is set by the medium: an elastic restoring property against an inertial one.</p>
<ul><li>String: $v = \sqrt{T/\mu}$ (tension over mass per length).</li>
<li>Sound in a gas: $v = \sqrt{\gamma p/\rho} = \sqrt{\gamma RT/M}$.</li>
<li>Sound in a solid rod: $v = \sqrt{E/\rho}$ (Young's modulus).</li>
<li>Deep-water waves: $v = \sqrt{g\lambda/2\pi}$, so long waves travel faster (they are <strong>dispersive</strong>).</li></ul>
<div class="worked"><p>A guitar string 0.65 m long with $\mu = 1.2$ g m⁻¹ should sound 330 Hz. What tension is needed?</p>
<p>The fundamental has $\lambda = 2L = 1.3$ m, so $v = 429$ m s⁻¹ and $T = \mu v^2 = 0.0012\cdot429^2 = 221$ N.</p></div>
<p>The power carried by a wave on a string is $\tfrac12\mu\omega^2A^2v$: it grows with the square of both amplitude and frequency.</p>` },
    1: { html: R`<h3 class="sub">Reflection, standing waves and pipes</h3>
<p>A wave reflected from a fixed end is inverted (a phase change of $\pi$); from a free end it is not. Two equal waves travelling in opposite directions add to a <strong>standing wave</strong>: $2A\sin kx\cos\omega t$, with nodes (no motion) every half-wavelength and antinodes between.</p>
<div class="table-wrap"><table class="data"><tr><th>System</th><th>Allowed wavelengths</th><th>Frequencies</th></tr>
<tr><td>String fixed at both ends; pipe open at both ends</td><td>$\lambda_n = 2L/n$</td><td>$f_n = nv/(2L)$, all harmonics</td></tr>
<tr><td>Pipe closed at one end</td><td>$\lambda_n = 4L/n$, $n$ odd</td><td>$f_n = nv/(4L)$, odd harmonics only</td></tr></table></div>
<div class="worked"><p>A tuning fork of 512 Hz is held over a tube whose water level is lowered. Resonances are heard at air columns of 16.0 cm and 49.5 cm. Find the speed of sound and the end correction.</p>
<p>Successive resonances are half a wavelength apart: $\lambda = 2\cdot33.5 = 67$ cm, so $v = 512\cdot0.67 = 343$ m s⁻¹. The first resonance should be at $\lambda/4 = 16.75$ cm; it occurs at 16.0, so the antinode sits 0.75 cm beyond the open end.</p></div>
<p>The mix of harmonics, set by how an instrument is played, gives its <strong>timbre</strong>: a clarinet (roughly a closed pipe) is rich in odd harmonics, which gives its hollow sound.</p>` },
    2: { html: R`<h3 class="sub">Loudness, decibels and beats</h3>
<p>Sound intensity $I$ (W m⁻²) spreads over a sphere, so $I = P/(4\pi r^2)$ for a point source. The ear responds roughly logarithmically, so we use the <strong>sound level</strong></p>
<div class="key"><p>$\beta = 10\log_{10}\dfrac{I}{I_0}$ dB, with $I_0 = 10^{-12}$ W m⁻² (the threshold of hearing)</p></div>
<div class="worked"><p>One car horn gives 90 dB at 10 m. What do two give? And one horn at 100 m?</p>
<p>Two: intensity doubles, $+10\log_{10}2 = +3$ dB, so 93 dB. At 100 m the intensity is 100 times smaller: $90 - 20 = 70$ dB.</p></div>
<p>Two notes of close frequencies $f_1$ and $f_2$ produce <strong>beats</strong>, a loudness that rises and falls at $|f_1 - f_2|$. Piano tuners listen for beats against a reference and adjust until they vanish.</p>
<p>Sound in air travels at $v \approx 331 + 0.6\,\theta$ m s⁻¹ (θ in °C), independent of pressure. Human hearing spans 20 Hz to 20 kHz (the upper limit falls with age). Bats and dolphins echolocate with ultrasound; elephants communicate with infrasound over kilometres.</p>` },
    3: { html: R`<h3 class="sub">Doppler in both directions, and shocks</h3>
<p>For sound, with source speed $v_s$ and observer speed $v_o$ (both positive when moving towards each other),</p>
<div class="key"><p>$f' = f\dfrac{v + v_o}{v - v_s}$</p></div>
<div class="worked"><p>A police car with a 1000 Hz siren drives at 30 m s⁻¹ towards a stationary listener, then away. What frequencies are heard ($v = 340$ m s⁻¹)?</p>
<p>Approaching: $1000\cdot340/310 = 1097$ Hz. Receding: $1000\cdot340/370 = 919$ Hz. The drop as it passes is about a whole tone.</p></div>
<p>Doppler radar measures speeds from reflected waves: the reflector acts as a moving observer and then a moving source, so for $v \ll c$ the shift is $\Delta f \approx 2fv/c$. Doppler ultrasound measures blood flow in the same way. For light, the Doppler shift reveals the expanding universe and planets around other stars.</p>
<p>When a source moves faster than the waves, the wavefronts pile up into a cone, a <strong>shock wave</strong>, with half-angle $\sin\theta = v/v_s = 1/M$ (Mach number $M$). Supersonic aircraft trail a sonic boom; boats make V-shaped wakes; charged particles faster than light in water emit blue <strong>Cherenkov radiation</strong>, seen glowing in nuclear reactor pools.</p>` }
  });

  X('thermal', {
    0: { html: R`<h3 class="sub">Temperature scales and expansion</h3>
<p>Temperature is what two bodies share when in thermal equilibrium (the zeroth law makes this consistent). The Kelvin scale is absolute: $T/\text{K} = \theta/°\text{C} + 273.15$, with zero where an ideal gas would exert zero pressure. Since 2019 the kelvin is defined by fixing Boltzmann's constant at exactly $1.380649\times10^{-23}$ J K⁻¹.</p>
<p>Solids expand linearly with temperature, $\Delta L = \alpha L\Delta T$, with $\alpha \approx 10^{-5}$ K⁻¹ for metals; the volume coefficient is $\beta \approx 3\alpha$.</p>
<div class="worked"><p>A steel bridge is 500 m long. How much do its expansion joints need to absorb between −20 °C and 40 °C ($\alpha = 1.2\times10^{-5}$ K⁻¹)? What stress would arise if it were rigidly held ($E = 200$ GPa)?</p>
<p>$\Delta L = 1.2\times10^{-5}\cdot500\cdot60 = 0.36$ m. Held rigidly, the strain $\alpha\Delta T = 7.2\times10^{-4}$ would create a stress $E\alpha\Delta T = 144$ MPa, over half the yield strength of ordinary steel: railway lines have buckled this way in heat waves.</p></div>
<p>Water is anomalous: it is densest at 4 °C. Lakes cool until all the water is at 4 °C; further cooled water floats on top and freezes, insulating the life beneath.</p>` },
    1: { html: R`<h3 class="sub">Method of mixtures and latent heat</h3>
<p>Heating with no phase change: $Q = mc\Delta T$. Changing phase at constant temperature: $Q = mL$. In an insulated system, heat lost by the hot parts equals heat gained by the cold parts.</p>
<div class="worked"><p>50 g of ice at −10 °C is dropped into 200 g of water at 30 °C. What is the final state? ($c_{\text{ice}} = 2100$, $c_{\text{water}} = 4200$ J kg⁻¹ K⁻¹, $L_f = 3.34\times10^5$ J kg⁻¹)</p>
<p>Warming the ice to 0 °C: 1050 J. Melting it all: 16 700 J. Cooling the water to 0 °C would release $0.2\cdot4200\cdot30 = 25\,200$ J, which is enough. So all the ice melts, and the final temperature $T$ comes from one balance equation: $0.2\cdot4200(30 - T) = 1050 + 16\,700 + 0.05\cdot4200\,T$, giving $T = 7.1$ °C.</p></div>
<p>Always check first whether all the ice can melt: if the warm water cannot supply enough heat, the final state is a mixture at 0 °C, and the unknown becomes the mass that melts.</p>
<p>Latent heats are large: vaporising water takes 2.26 MJ kg⁻¹, over five times the energy to heat it from 0 to 100 °C, which is why steam burns are so severe.</p>` },
    2: { html: R`<h3 class="sub">Conduction, convection and radiation in numbers</h3>
<p><strong>Conduction</strong>: $P = kA\dfrac{\Delta T}{d}$. Layers in series add their thermal resistances $d/(kA)$, just like electrical resistors.</p>
<div class="worked"><p>A double-glazed window has two 4 mm panes ($k = 1.0$ W m⁻¹ K⁻¹) and a 12 mm air gap ($k = 0.025$). Compare heat loss through 1 m² with a single pane for a 20 K difference (ignoring surface air layers).</p>
<p>Single: $1.0\cdot20/0.004 = 5000$ W. Double: resistance $0.004 + 0.48 + 0.004 = 0.488$ K W⁻¹, so 41 W. The air gap does almost all the work. (Real losses are much less than 5000 W because thin air films on each surface add resistance.)</p></div>
<p><strong>Radiation</strong>: a body emits $P = \varepsilon\sigma AT^4$ with $\sigma = 5.67\times10^{-8}$ W m⁻² K⁻⁴, and absorbs from its surroundings, so the net loss is $\varepsilon\sigma A(T^4 - T_s^4)$. A person (1.8 m², skin 307 K, room 293 K, $\varepsilon \approx 0.97$) radiates a net $0.97\cdot5.67\times10^{-8}\cdot1.8\cdot(307^4 - 293^4) \approx 150$ W.</p>
<p><strong>Newton's law of cooling</strong> (loss proportional to temperature excess) gives exponential decay: $T - T_s = (T_0 - T_s)e^{-t/\tau}$, used in forensic estimates of time of death.</p>` },
    3: { html: R`<h3 class="sub">From molecules to pressure</h3>
<p>Molecules bouncing off walls transfer momentum. For $N$ molecules in volume $V$, kinetic theory gives $pV = \tfrac13Nm\overline{c^2}$; comparing with $pV = NkT$:</p>
<div class="key"><p>$\tfrac12m\overline{c^2} = \tfrac32kT$, so $c_{\text{rms}} = \sqrt{\dfrac{3kT}{m}} = \sqrt{\dfrac{3RT}{M}}$</p></div>
<div class="worked"><p>Find the rms speeds of N<sub>2</sub> and H<sub>2</sub> at 300 K.</p>
<p>N<sub>2</sub>: $\sqrt{3\cdot8.31\cdot300/0.028} = 517$ m s⁻¹. H<sub>2</sub>: $\sqrt{3\cdot8.31\cdot300/0.002} = 1934$ m s⁻¹. Speeds go as $1/\sqrt M$, the principle behind separating uranium isotopes by diffusion of UF<sub>6</sub>.</p></div>
<p>Speeds follow the <strong>Maxwell–Boltzmann distribution</strong>: most probable speed $\sqrt{2kT/m}$, mean $\sqrt{8kT/(\pi m)}$, rms $\sqrt{3kT/m}$. The <strong>equipartition theorem</strong> gives each quadratic degree of freedom $\tfrac12kT$: a monatomic gas has 3 (so $C_V = \tfrac32R$), a diatomic gas at room temperature 5 (3 translational, 2 rotational; vibration is "frozen out" by quantum effects), so $C_V = \tfrac52R$.</p>
<p>The <strong>mean free path</strong> $\lambda = \dfrac{kT}{\sqrt2\pi d^2p}$ is about 70 nm in air at room conditions: molecules collide billions of times a second.</p>` }
  });

  X('thermodynamics', {
    0: { html: R`<h3 class="sub">Internal energy, heat and work</h3>
<p>The first law, $\Delta U = Q - W$ (heat added minus work done <em>by</em> the gas), is energy conservation. Internal energy $U$ is a <strong>state function</strong>: it depends only on the current state (for an ideal gas, only on $T$: $U = nC_VT$). Heat and work are not: they depend on the path. On a $p$–$V$ diagram, the work done by the gas is the area under the path, $W = \int p\,dV$.</p>
<div class="worked"><p>1 mol of monatomic ideal gas goes from A (100 kPa, 10 L) to B (100 kPa, 20 L) at constant pressure. Find $W$, $\Delta U$ and $Q$.</p>
<p>$W = p\Delta V = 1000$ J. Temperatures: $T = pV/(nR)$: 120 K and 241 K, so $\Delta U = \tfrac32R\Delta T = \tfrac32\Delta(pV) = 1500$ J. $Q = 2500$ J. Of the heat added, 60% raises the internal energy and 40% does work.</p></div>
<p>Heat capacities: at constant volume all heat raises $U$, so $C_V$; at constant pressure the gas also does work, so $C_p = C_V + R$ (Mayer's relation) per mole. The ratio $\gamma = C_p/C_V$ is $\tfrac53$ for monatomic gases and $\tfrac75$ for diatomic ones.</p>` },
    1: { html: R`<h3 class="sub">The four standard processes</h3>
<div class="table-wrap"><table class="data"><tr><th>Process</th><th>Constant</th><th>Work by gas</th><th>Heat</th></tr>
<tr><td>Isochoric</td><td>$V$</td><td>0</td><td>$nC_V\Delta T$</td></tr>
<tr><td>Isobaric</td><td>$p$</td><td>$p\Delta V$</td><td>$nC_p\Delta T$</td></tr>
<tr><td>Isothermal</td><td>$T$</td><td>$nRT\ln(V_2/V_1)$</td><td>$= W$</td></tr>
<tr><td>Adiabatic</td><td>$pV^\gamma$</td><td>$\dfrac{p_1V_1 - p_2V_2}{\gamma - 1}$</td><td>0</td></tr></table></div>
<div class="worked"><p>Air ($\gamma = 1.4$) at 300 K is compressed adiabatically to one-tenth its volume in a diesel engine. Find the final temperature.</p>
<p>$TV^{\gamma - 1}$ is constant, so $T_2 = 300\cdot10^{0.4} = 754$ K (481 °C), hot enough to ignite diesel fuel without a spark.</p></div>
<p>Adiabatic curves are steeper than isotherms on a $p$–$V$ diagram (by the factor $\gamma$). Real processes are adiabatic when they are too fast for heat to flow: sound waves, bicycle pumps, rising air. Air rising in the atmosphere expands and cools at about 9.8 K per km (the dry adiabatic lapse rate, $g/c_p$), which is why mountains are cold and clouds form at a definite height.</p>` },
    2: { html: R`<h3 class="sub">Carnot limits and real engines</h3>
<p>A heat engine takes heat $Q_h$ from a hot reservoir, does work $W$ and rejects $Q_c$ to a cold one: efficiency $\eta = W/Q_h = 1 - Q_c/Q_h$. No engine working between $T_h$ and $T_c$ can beat the reversible <strong>Carnot</strong> engine:</p>
<div class="key"><p>$\eta_{\text{Carnot}} = 1 - \dfrac{T_c}{T_h}$</p></div>
<div class="worked"><p>A power station's steam enters at 560 °C and condenses at 30 °C. What is the maximum efficiency? Real stations achieve about 40%: where does the rest go?</p>
<p>$1 - 303/833 = 64\%$. Real losses come from irreversibilities (friction, heat flow across finite temperature differences). The 60% rejected heat warms rivers or rises from cooling towers; combined heat and power plants use it to heat buildings.</p></div>
<p>A <strong>refrigerator</strong> or <strong>heat pump</strong> runs the cycle backwards, using work to move heat from cold to hot. Their coefficients of performance are $Q_c/W \le T_c/(T_h - T_c)$ and $Q_h/W \le T_h/(T_h - T_c)$. A heat pump warming a house to 20 °C from 0 °C outside could, ideally, deliver 14.7 J of heat per joule of electricity; real ones manage 3–4, still far better than an electric heater's 1.</p>` },
    3: { html: R`<h3 class="sub">Calculating entropy changes</h3>
<p>Entropy is defined by $dS = dQ_{\text{rev}}/T$ and is a state function. For any real (irreversible) process in an isolated system, the total entropy increases: the second law. To compute $\Delta S$ for an irreversible change, find any reversible path between the same end states.</p>
<div class="worked"><p>1 kg of water at 80 °C is mixed with 1 kg at 20 °C. Find the entropy change.</p>
<p>Final temperature 50 °C (323 K). Hot water: $mc\ln(323/353) = 4200\cdot(-0.0888) = -373$ J K⁻¹. Cold: $4200\ln(323/293) = +409$ J K⁻¹. Total $+36$ J K⁻¹: positive, as it must be for spontaneous mixing.</p></div>
<div class="worked"><p>1 mol of ideal gas doubles its volume by free expansion into a vacuum (no work, no heat, no temperature change). Find $\Delta S$.</p>
<p>Use a reversible isothermal path: $\Delta S = R\ln2 = 5.76$ J K⁻¹, even though no heat flowed in the actual process.</p></div>
<p>Boltzmann's statistical definition $S = k\ln\Omega$ ($\Omega$ the number of microscopic arrangements) explains why: there are vastly more arrangements with the gas spread out. For $N$ molecules, doubling the volume multiplies $\Omega$ by $2^N$; with $N = 6\times10^{23}$, the chance of all molecules gathering back in one half is $2^{-N}$, which never happens.</p>` }
  });

  X('electrostatics', {
    0: { html: R`<h3 class="sub">Superposition of Coulomb forces</h3>
<p>The force between point charges is $F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}$, with $\dfrac{1}{4\pi\varepsilon_0} = 8.99\times10^9$ N m² C⁻². Forces from several charges add as vectors.</p>
<div class="worked"><p>Charges of $+2$ μC sit at two corners of an equilateral triangle of side 0.1 m. Find the force on a $+1$ μC charge at the third corner.</p>
<p>Each force: $8.99\times10^9\cdot2\times10^{-6}\cdot10^{-6}/0.01 = 1.80$ N, at 60° to each other. Their horizontal parts cancel; the resultant is $2\cdot1.80\cos30° = 3.11$ N, pointing away from the midpoint of the other two.</p></div>
<p>Compared with gravity, the electric force is enormous: between two protons it is $10^{36}$ times stronger. Gravity dominates large scales only because matter is almost exactly neutral. Charge is quantised in units of $e = 1.602\times10^{-19}$ C (Millikan) and conserved in every process.</p>
<div class="worked"><p>Two identical small spheres, each of mass 1 g, hang from 50 cm threads from the same point and repel to 10° from vertical. Find their equal charges.</p>
<p>Separation $2\cdot0.5\sin10° = 0.174$ m. $F = mg\tan10° = 1.73\times10^{-3}$ N $= kq^2/r^2$, so $q = r\sqrt{F/k} = 0.174\sqrt{1.73\times10^{-3}/8.99\times10^9} = 7.6\times10^{-8}$ C.</p></div>` },
    1: { html: R`<h3 class="sub">Fields of extended charges</h3>
<p>Divide the charge into small pieces, add their fields as vectors, and let symmetry kill components.</p>
<div class="worked"><p>Find the field on the axis of a ring of charge $Q$ and radius $a$, at distance $x$ from its centre.</p>
<p>Perpendicular components cancel. Each piece contributes $\dfrac{k\,dq}{a^2 + x^2}\cdot\dfrac{x}{\sqrt{a^2 + x^2}}$ along the axis, so $E = \dfrac{kQx}{(a^2 + x^2)^{3/2}}$. At $x = 0$ it vanishes; far away it becomes $kQ/x^2$, like a point charge; it is largest at $x = a/\sqrt2$.</p></div>
<p>An <strong>electric dipole</strong> (charges $\pm q$ separated by $d$, dipole moment $p = qd$) has a field falling as $1/r^3$: on its axis $E = 2kp/r^3$. In a uniform field it feels no net force but a torque $\mathbf p\times\mathbf E$ that aligns it. Water molecules are dipoles, which is why water dissolves salts so well and why microwave ovens can twist them to heat food.</p>
<p>Field lines start on positive charges and end on negative ones; their density shows field strength; they never cross. A charge in a uniform field $E$ accelerates at $qE/m$: an electron in a 1 kV cm⁻¹ field accelerates at $1.8\times10^{16}$ m s⁻².</p>` },
    2: { html: R`<h3 class="sub">Gauss's law for three symmetries</h3>
<p>$\oint\mathbf E\cdot d\mathbf A = Q_{\text{enc}}/\varepsilon_0$: the flux out of a closed surface depends only on the charge inside. With enough symmetry, it gives fields in one line.</p>
<div class="table-wrap"><table class="data"><tr><th>Charge</th><th>Gaussian surface</th><th>Field</th></tr>
<tr><td>Sphere, total $Q$ (outside)</td><td>concentric sphere</td><td>$Q/(4\pi\varepsilon_0r^2)$</td></tr>
<tr><td>Line, $\lambda$ per metre</td><td>coaxial cylinder</td><td>$\lambda/(2\pi\varepsilon_0r)$</td></tr>
<tr><td>Plane, $\sigma$ per m²</td><td>"pillbox" through the plane</td><td>$\sigma/(2\varepsilon_0)$</td></tr></table></div>
<div class="worked"><p>A uniformly charged solid sphere has radius $R$ and charge $Q$. Find the field inside.</p>
<p>A Gaussian sphere of radius $r &lt; R$ encloses $Q r^3/R^3$, so $E = \dfrac{Qr}{4\pi\varepsilon_0R^3}$, growing linearly from zero at the centre, like gravity inside a uniform planet.</p></div>
<p>In a conductor at equilibrium, $E = 0$ inside, so any excess charge sits on the surface, and the field just outside is $\sigma/\varepsilon_0$, perpendicular to the surface. Charge concentrates at sharp points, which is why lightning rods are pointed. A closed conducting shell shields its interior from outside fields: a <strong>Faraday cage</strong>, which is why you are safe in a car struck by lightning.</p>` },
    3: { html: R`<h3 class="sub">Potential, equipotentials and energy</h3>
<p>Potential is potential energy per unit charge: $V = kQ/r$ for a point charge, adding as scalars (no vectors needed). The field is the downhill slope: $E = -dV/dx$, perpendicular to <strong>equipotential</strong> surfaces. Moving a charge along an equipotential takes no work.</p>
<div class="worked"><p>An electron is accelerated from rest through 2000 V. Find its speed.</p>
<p>$eV = \tfrac12mv^2$: $v = \sqrt{2\cdot1.6\times10^{-19}\cdot2000/9.11\times10^{-31}} = 2.65\times10^7$ m s⁻¹, about 9% of light speed, so relativity is still a small correction. The <strong>electronvolt</strong> (1.6×10⁻¹⁹ J) is the natural energy unit here.</p></div>
<div class="worked"><p>Find the energy needed to assemble four charges $q$ at the corners of a square of side $a$.</p>
<p>Sum over all 6 pairs: four sides at $a$, two diagonals at $\sqrt2a$: $U = \dfrac{kq^2}{a}\left(4 + \dfrac{2}{\sqrt2}\right) = 5.41\dfrac{kq^2}{a}$.</p></div>
<p>The energy of a charged system can be thought of as stored in the field itself, with energy density $u = \tfrac12\varepsilon_0E^2$. Air breaks down (sparks) at about 3 MV m⁻¹; a sphere of radius 10 cm can therefore hold at most about 300 kV before discharging.</p>` }
  });

  X('circuits', {
    0: { html: R`<h3 class="sub">Capacitors in networks and dielectrics</h3>
<p>A parallel-plate capacitor has $C = \varepsilon_0\varepsilon_rA/d$ and stores $\tfrac12CV^2 = \tfrac12QV = Q^2/(2C)$. In <strong>parallel</strong> capacitances add; in <strong>series</strong> their reciprocals add (the opposite of resistors), and series capacitors carry equal charges.</p>
<div class="worked"><p>A 4 μF and a 12 μF capacitor in series are connected to 20 V. Find the charge and each voltage.</p>
<p>$C = (1/4 + 1/12)^{-1} = 3$ μF, so $Q = 60$ μC; $V_4 = 15$ V and $V_{12} = 5$ V. The smaller capacitor takes the larger voltage.</p></div>
<p>A <strong>dielectric</strong> (insulator) between the plates polarises, partly cancelling the field and raising $C$ by the factor $\varepsilon_r$ (about 80 for water, 3–10 for plastics and ceramics).</p>
<div class="worked"><p>A charged, isolated capacitor has a dielectric slab ($\varepsilon_r = 4$) slid in. What happens to $Q$, $V$ and the energy? What if it stays connected to the battery?</p>
<p>Isolated: $Q$ fixed, $V$ and the energy fall to a quarter (the slab is pulled in, so the field does work on it). Connected: $V$ fixed, $Q$ and energy rise fourfold; the battery supplies twice the extra energy, half of it doing work pulling the slab in.</p></div>` },
    1: { html: R`<h3 class="sub">From drift to power</h3>
<p>Current is the flow of charge: $I = nAvq$, where $n$ is the number of carriers per m³ and $v$ their drift speed. Resistance $R = \rho L/A$ depends on the material's <strong>resistivity</strong> (copper $1.7\times10^{-8}$ Ω m; glass about $10^{12}$).</p>
<div class="worked"><p>A 1 mm² copper wire carries 2 A. Copper has $8.5\times10^{28}$ free electrons per m³. Find the drift speed.</p>
<p>$v = I/(nAe) = 2/(8.5\times10^{28}\cdot10^{-6}\cdot1.6\times10^{-19}) = 0.15$ mm s⁻¹. The electrons crawl; the signal (the field) travels at nearly light speed, which is why the lamp lights at once.</p></div>
<p>Power dissipated is $P = IV = I^2R = V^2/R$. That is why electricity is transmitted at high voltage: delivering power $P$ at voltage $V$ needs current $P/V$, and the cable loss $I^2R = P^2R/V^2$ falls as $1/V^2$.</p>
<p>Real sources have <strong>internal resistance</strong> $r$: the terminal voltage is $\mathcal E - Ir$, sagging as current is drawn. Maximum power reaches a load when its resistance equals $r$ (but then half the power is wasted in the source).</p>
<p>Metal resistance rises with temperature (more lattice vibration scatters electrons); semiconductor and thermistor resistance falls (more free carriers).</p>` },
    2: { html: R`<h3 class="sub">Nodal analysis and bridges</h3>
<p>Kirchhoff's current law (charge conservation) and voltage law (energy conservation) solve any network. The quickest systematic method is often <strong>nodal analysis</strong>: pick a reference node at 0 V, call the other node voltages unknowns, and write the current law at each.</p>
<div class="worked"><p>A Wheatstone bridge has 100 Ω and 200 Ω on one side, 150 Ω and an unknown $X$ on the other. The galvanometer between the midpoints reads zero. Find $X$.</p>
<p>Balance means equal ratios: $100/200 = 150/X$, so $X = 300$ Ω. The battery voltage and the meter's resistance do not matter, which is why bridges measure resistance so precisely (and why strain gauges use them).</p></div>
<p>Symmetry shortcuts: points at the same potential can be joined or separated without changing anything. For a cube of twelve 1 Ω resistors, the resistance between opposite corners is $\tfrac56$ Ω: the current splits 3 ways, then 6, then 3, giving $\tfrac13 + \tfrac16 + \tfrac13$.</p>
<p>The <strong>Thévenin</strong> theorem: any linear network seen from two terminals behaves like a single source $\mathcal E_{\text{th}}$ in series with $R_{\text{th}}$. Find $\mathcal E_{\text{th}}$ as the open-circuit voltage, and $R_{\text{th}}$ by replacing sources with their internal resistances.</p>` },
    3: { html: R`<h3 class="sub">Time constants and energy in RC circuits</h3>
<p>Charging through $R$ from a source $\mathcal E$: $V_C = \mathcal E(1 - e^{-t/RC})$; discharging: $V_C = V_0e^{-t/RC}$. The <strong>time constant</strong> $\tau = RC$ is the time to fall to 37% (or rise to 63%); after $5\tau$ the process is over 99% complete. The half-life is $\tau\ln2 = 0.69RC$.</p>
<div class="worked"><p>A camera flash charges a 200 μF capacitor to 300 V. How much energy is stored, and how long does it take to charge to 95% through 5 kΩ?</p>
<p>$\tfrac12\cdot200\times10^{-6}\cdot300^2 = 9$ J. $1 - e^{-t/\tau} = 0.95$ gives $t = \tau\ln20 = 3.0\tau = 3.0$ s ($\tau = 1$ s).</p></div>
<p>A surprise: when a capacitor is charged from a battery through any resistance, the battery supplies $Q\mathcal E = C\mathcal E^2$, but the capacitor ends with only $\tfrac12C\mathcal E^2$. Exactly half is always dissipated in the resistor, whatever its value: a smaller resistance means a bigger current for a shorter time.</p>
<p>RC circuits set timings in electronics (blinking lights, the 555 timer), filter signals (smoothing rectified AC), and model nerve membranes, whose time constant is a few milliseconds.</p>` }
  });

  X('magnetism', {
    0: { html: R`<h3 class="sub">Circles, helices and selectors</h3>
<p>The Lorentz force $\mathbf F = q\mathbf v\times\mathbf B$ is perpendicular to the velocity, so it does no work: it bends paths without changing speed. A charge moving perpendicular to a uniform field circles with radius $r = mv/(qB)$ and angular frequency $\omega = qB/m$, independent of speed (the <strong>cyclotron frequency</strong>). A velocity component along $\mathbf B$ is unaffected, giving a helix.</p>
<div class="worked"><p>A velocity selector uses $E = 2\times10^4$ V m⁻¹ and $B = 0.1$ T crossed. Which ions pass straight through? In a mass spectrometer, singly charged ions at that speed then enter a 0.1 T field. What radii do ¹²C and ¹⁴C ions follow?</p>
<p>Electric and magnetic forces balance when $v = E/B = 2\times10^5$ m s⁻¹. $r = mv/(eB)$: ¹²C: $12\cdot1.66\times10^{-27}\cdot2\times10^5/(1.6\times10^{-19}\cdot0.1) = 0.249$ m; ¹⁴C: 0.291 m. Their landing points differ by $2\cdot0.042 = 8.4$ cm.</p></div>
<p>Earth's magnetic field traps charged particles from the solar wind in the Van Allen belts; they spiral along field lines towards the poles, where they make the aurorae. The Hall effect, a sideways voltage across a current-carrying conductor in a field, measures $B$ and reveals the sign of the charge carriers.</p>` },
    1: { html: R`<h3 class="sub">Motors and magnetic moments</h3>
<p>A wire of length $L$ carrying current $I$ in a field feels $\mathbf F = I\mathbf L\times\mathbf B$. Two parallel wires attract if their currents flow the same way (until 2019 this defined the ampere: 1 A gives $2\times10^{-7}$ N per metre at 1 m separation).</p>
<p>A flat coil of $N$ turns and area $A$ has <strong>magnetic moment</strong> $\mu = NIA$; in a field it feels a torque $\tau = \mu B\sin\theta$ that turns it to align with the field, with potential energy $-\mu B\cos\theta$. This is the principle of electric motors and of moving-coil meters.</p>
<div class="worked"><p>A motor coil has 200 turns of area 4 cm × 5 cm, carrying 0.5 A in a 0.3 T field. What is the maximum torque? Why does a motor need a commutator?</p>
<p>$\tau = 200\cdot0.5\cdot0.002\cdot0.3 = 0.06$ N m. Without reversing the current every half-turn, the torque would reverse too, and the coil would just rock about the aligned position. The commutator flips the current as the coil passes alignment, keeping it turning.</p></div>
<p>Electrons and nuclei have magnetic moments too, from their spin. In a field, protons' moments precess at a frequency proportional to $B$ (42.6 MHz per tesla), which magnetic resonance imaging (MRI) detects.</p>` },
    2: { html: R`<h3 class="sub">Biot–Savart in practice</h3>
<p>Each small piece of current-carrying wire contributes $d\mathbf B = \dfrac{\mu_0}{4\pi}\dfrac{I\,d\mathbf l\times\hat{\mathbf r}}{r^2}$, with $\mu_0 = 4\pi\times10^{-7}$ T m A⁻¹ (to excellent approximation).</p>
<div class="worked"><p>Find the field at the centre of a circular loop of radius $a$, and on its axis at distance $x$.</p>
<p>At the centre every piece is perpendicular to $\hat{\mathbf r}$ at distance $a$: $B = \dfrac{\mu_0I}{4\pi a^2}\cdot2\pi a = \dfrac{\mu_0I}{2a}$. On the axis, components perpendicular to it cancel, leaving $B = \dfrac{\mu_0Ia^2}{2(a^2 + x^2)^{3/2}}$.</p></div>
<p>Results to know: a long straight wire $B = \mu_0I/(2\pi r)$, field lines circling it (right-hand grip rule); a loop's centre $\mu_0I/(2a)$; a long solenoid $\mu_0nI$ inside, uniform and nearly zero outside. Two coaxial loops separated by their radius (a <strong>Helmholtz pair</strong>) give an unusually uniform field between them, used to cancel Earth's field in experiments.</p>
<div class="worked"><p>How strong is the field 5 cm from a wire carrying 20 A? Compare with Earth's field (about 50 μT).</p>
<p>$2\times10^{-7}\cdot20/0.05 = 80$ μT: enough to deflect a nearby compass, as Ørsted discovered in 1820.</p></div>` },
    3: { html: R`<h3 class="sub">Ampère's law at work, and magnetic materials</h3>
<p>$\oint\mathbf B\cdot d\mathbf l = \mu_0I_{\text{enc}}$ around any closed loop. With symmetry it gives fields quickly, just as Gauss's law does for electric fields.</p>
<div class="worked"><p>A toroid (a solenoid bent into a ring) has $N$ turns and carries $I$. Find the field inside at radius $r$.</p>
<p>A circular loop of radius $r$ inside the toroid encloses $NI$: $B\cdot2\pi r = \mu_0NI$, so $B = \dfrac{\mu_0NI}{2\pi r}$. Outside, the enclosed current is zero (as much flows up as down), so $B = 0$: the field is entirely contained, which is why toroidal transformers and tokamak fusion reactors use this shape.</p></div>
<div class="worked"><p>A thick wire of radius $R$ carries current $I$ uniformly. Find $B$ inside.</p>
<p>A circle of radius $r &lt; R$ encloses $I r^2/R^2$, so $B = \dfrac{\mu_0Ir}{2\pi R^2}$, rising linearly to the surface, then falling as $1/r$.</p></div>
<p>Materials respond to fields: <strong>diamagnetic</strong> ones (water, copper, frogs) are weakly repelled; <strong>paramagnetic</strong> ones (aluminium, oxygen) weakly attracted; <strong>ferromagnetic</strong> ones (iron, nickel, cobalt) have domains that align strongly, multiplying the field of a coil hundreds or thousands of times, until above the <strong>Curie temperature</strong> (770 °C for iron) thermal agitation destroys the order.</p>` }
  });

  X('induction', {
    0: { html: R`<h3 class="sub">Motional EMF and eddy currents</h3>
<p>Faraday's law, $\mathcal E = -N\dfrac{d\Phi}{dt}$, covers two situations: a changing field through a fixed loop, and a conductor moving through a field. For a rod of length $L$ moving at speed $v$ perpendicular to $B$, the magnetic force on its charges gives $\mathcal E = BLv$.</p>
<div class="worked"><p>A rod of length 0.5 m and resistance 2 Ω slides at 4 m s⁻¹ on frictionless rails in a 0.8 T field. Find the current, the force needed to keep it moving, and the power.</p>
<p>$\mathcal E = 0.8\cdot0.5\cdot4 = 1.6$ V, $I = 0.8$ A. The induced current feels $BIL = 0.32$ N opposing the motion (Lenz's law), so you must push with 0.32 N. Power $Fv = 1.28$ W $= I^2R$: mechanical work becomes heat, exactly.</p></div>
<p>Lenz's law (the minus sign) is energy conservation: if induced currents aided the change, you would get energy for nothing. A magnet dropped through a copper pipe falls slowly because eddy currents in the pipe oppose its motion. Eddy-current brakes on trains and roller coasters use this, and transformer cores are laminated (made of insulated thin sheets) to suppress wasteful eddy currents.</p>` },
    1: { html: R`<h3 class="sub">Self-inductance and RL circuits</h3>
<p>A changing current in a coil changes its own flux, inducing a back-EMF $-L\,dI/dt$. For a long solenoid, $L = \mu_0N^2A/\ell$, multiplied by the relative permeability if it has an iron core. Inductors resist <em>changes</em> in current, as capacitors resist changes in voltage.</p>
<div class="worked"><p>An inductor of 0.5 H and a 10 Ω resistor are connected to a 12 V battery. How does the current grow, and how much energy is finally stored?</p>
<p>$I = \dfrac{\mathcal E}{R}(1 - e^{-tR/L})$ with time constant $L/R = 0.05$ s, reaching 1.2 A. Energy $\tfrac12LI^2 = 0.36$ J, stored in the magnetic field with density $B^2/(2\mu_0)$.</p></div>
<p>Breaking an inductive circuit suddenly makes $dI/dt$ huge, producing a large voltage spike that can spark across the switch. Car ignition coils use this deliberately to produce the 20 kV for spark plugs from a 12 V battery; electronic circuits protect against it with diodes across relay coils.</p>
<p>An LC circuit oscillates as energy passes between capacitor and inductor, at $\omega = 1/\sqrt{LC}$: the electrical twin of a mass on a spring, and the heart of every radio tuner.</p>` },
    2: { html: R`<h3 class="sub">Generators, transformers and the grid</h3>
<p>A coil of $N$ turns and area $A$ rotating at $\omega$ in a field $B$ has flux $NBA\cos\omega t$, so it generates $\mathcal E = NBA\omega\sin\omega t$: alternating current.</p>
<div class="worked"><p>A generator coil of 100 turns, area 0.05 m², spins at 50 revolutions per second in 0.2 T. Find the peak and rms EMF.</p>
<p>$\mathcal E_0 = 100\cdot0.2\cdot0.05\cdot2\pi\cdot50 = 314$ V; rms $= \mathcal E_0/\sqrt2 = 222$ V.</p></div>
<p>A <strong>transformer</strong> links two coils by an iron core. The same changing flux passes through both, so $V_s/V_p = N_s/N_p$; with little loss, $V_pI_p \approx V_sI_s$, so stepping voltage up steps current down. Transformers only work with AC, which is a major reason AC won the "war of the currents" in the 1890s.</p>
<div class="worked"><p>A power station sends 100 MW through lines of total resistance 5 Ω. Compare losses at 25 kV and 400 kV.</p>
<p>At 25 kV, $I = 4000$ A, loss $I^2R = 80$ MW (most of the power!). At 400 kV, $I = 250$ A, loss 0.31 MW, about 0.3%.</p></div>` },
    3: { html: R`<h3 class="sub">Reactance, impedance and resonance</h3>
<p>In AC circuits, capacitors and inductors oppose current through their <strong>reactance</strong>: $X_C = 1/(\omega C)$ (large at low frequency: capacitors block DC) and $X_L = \omega L$ (large at high frequency). They also shift phase: current leads voltage by 90° in a capacitor and lags by 90° in an inductor. In a series RLC circuit:</p>
<div class="key"><p>$Z = \sqrt{R^2 + (X_L - X_C)^2}$, $\quad I_{\text{rms}} = V_{\text{rms}}/Z$, $\quad$ resonance at $\omega_0 = 1/\sqrt{LC}$</p></div>
<div class="worked"><p>A series circuit has $R = 10$ Ω, $L = 50$ mH and $C = 20$ μF on a 50 V rms supply. Find the resonant frequency and the current there and at 50 Hz.</p>
<p>$\omega_0 = 1/\sqrt{10^{-6}} = 1000$ rad s⁻¹, $f_0 = 159$ Hz, where $Z = R$ and $I = 5$ A. At 50 Hz: $X_L = 15.7$ Ω, $X_C = 159$ Ω, $Z = 144$ Ω, $I = 0.35$ A.</p></div>
<p>Only resistance dissipates energy: average power is $I_{\text{rms}}V_{\text{rms}}\cos\phi$, where $\cos\phi = R/Z$ is the <strong>power factor</strong>. Electricity companies penalise factories with poor power factors because the extra current heats cables without delivering energy.</p>` },
    4: { html: R`<h3 class="sub">Displacement current and electromagnetic waves</h3>
<p>Ampère's law as first written failed for a charging capacitor: a loop around the wire encloses current, but a surface passing between the plates encloses none. Maxwell fixed it by adding the <strong>displacement current</strong> $\varepsilon_0\,d\Phi_E/dt$: a changing electric field creates a magnetic field, just as a changing magnetic field creates an electric one. The four Maxwell equations then predict waves of linked $E$ and $B$ fields travelling at</p>
<div class="key"><p>$c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}} = 3.00\times10^8$ m s⁻¹</p></div>
<p>Maxwell (1865): "We can scarcely avoid the inference that light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena." Hertz produced and detected radio waves in 1887.</p>
<p>In an electromagnetic wave $E = cB$, the fields are perpendicular to each other and to the direction of travel, and the wave carries intensity $I = \tfrac12c\varepsilon_0E_0^2$ and momentum ($I/c$ per unit area per second, giving radiation pressure).</p>
<div class="worked"><p>Sunlight at Earth has intensity 1360 W m⁻². Find the peak electric field and the radiation pressure on a perfect absorber.</p>
<p>$E_0 = \sqrt{2I/(c\varepsilon_0)} = \sqrt{2720/(3\times10^8\cdot8.85\times10^{-12})} = 1010$ V m⁻¹. Pressure $I/c = 4.5$ μPa, tiny but enough to push solar sails such as IKAROS (2010).</p></div>` }
  });
})();
