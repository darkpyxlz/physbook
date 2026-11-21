(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'fluids', num: 9, part: 'Mechanics',
    title: 'Fluids',
    subtitle: R`Pressure, buoyancy, flow and the forces of viscosity and surface tension. Fluid problems are a staple of IYPT and SYPT, where real liquids rarely behave ideally.`,
    goals: ['Compute hydrostatic pressure and forces', 'Apply Archimedes’ principle', 'Use continuity and Bernoulli’s equation', 'Estimate viscous drag and Reynolds number', 'Handle surface tension and capillarity'],
    sections: [
      {
        title: 'Pressure and hydrostatics',
        html: R`
<p>Pressure is force per unit area, $P = F/A$, measured in pascals ($1\ \mathrm{Pa} = 1\ \mathrm{N/m^2}$). In a fluid at rest, pressure acts equally in all directions and increases with depth because each layer supports the weight of the fluid above:</p>
<div class="key">$$\frac{\dd P}{\dd z} = -\rho g\quad\Rightarrow\quad P = P_0 + \rho g h.$$</div>
<p>Pressure depends only on depth, not on the shape of the container (the "hydrostatic paradox"). <strong>Pascal's principle</strong> says a pressure change applied anywhere is transmitted throughout the fluid; a hydraulic press multiplies force by the ratio of piston areas.</p>
<p>The total force on a vertical dam of width $W$ holding water of depth $H$ comes from integrating $\rho g z$ over the face: $F = \tfrac12\rho g H^2W$. It grows as the square of the depth.</p>`
      },
      {
        title: 'Buoyancy',
        html: R`
<p><strong>Archimedes' principle:</strong> a body immersed in a fluid feels an upward force equal to the weight of the fluid it displaces:</p>
<div class="key">$$F_b = \rho_{\text{fluid}}\,g\,V_{\text{sub}}.$$</div>
<p>It comes from the pressure difference between the bottom and top of the body. A floating body displaces exactly its own weight, so the submerged fraction is $\rho_{\text{body}}/\rho_{\text{fluid}}$. Ice ($917\ \mathrm{kg/m^3}$) floats about 90% submerged in water.</p>
<details class="example"><summary><span class="lbl">Worked example</span>An ice cube floats in a glass of water. When it melts, does the water level rise, fall, or stay the same?<span class="tog">Solution</span></summary><div class="sol"><p>The floating cube displaces a mass of water equal to its own mass. When it melts it becomes exactly that mass of water, filling exactly the volume it used to displace. The level stays the same. (For ice floating in salt water the level rises slightly, because meltwater is less dense than seawater.)</p></div></details>`
      },
      {
        title: 'Fluid flow: continuity and Bernoulli',
        html: R`
<p>For steady flow of an incompressible fluid, the volume flow rate is the same through every cross-section of a pipe: $A_1v_1 = A_2v_2$ (<strong>continuity</strong>). Narrow sections flow faster.</p>
<p>Along a streamline of steady, incompressible, non-viscous flow, energy per unit volume is conserved. This is <strong>Bernoulli's equation</strong>:</p>
<div class="key">$$P + \tfrac12\rho v^2 + \rho g h = \text{constant}.$$</div>
<p>Faster flow means lower pressure. Applications:</p>
<ul>
<li><strong>Torricelli's law:</strong> water leaves a hole a depth $h$ below the surface at $v = \sqrt{2gh}$, as if it had fallen freely.</li>
<li><strong>Venturi meter:</strong> the pressure drop at a constriction measures the flow speed.</li>
<li><strong>Pitot tube:</strong> the stagnation pressure $\tfrac12\rho v^2$ measures airspeed.</li>
</ul>
<div class="warn-box"><p>"Bernoulli explains lift" is only part of the story. A wing deflects air downward, and Newton's third law pushes the wing up. Bernoulli's equation describes the same flow from the pressure side; neither picture needs the false "equal transit time" argument.</p></div>`
      },
      {
        title: 'Viscosity and surface tension',
        html: R`
<p>Real fluids resist shearing. The viscous stress between layers is $\eta\,\dd v/\dd y$, with viscosity $\eta$ ($10^{-3}\ \mathrm{Pa\,s}$ for water, $1.4\ \mathrm{Pa\,s}$ for glycerin). Two key results:</p>
<ul>
<li><strong>Stokes' law:</strong> a small sphere moving slowly feels drag $F = 6\pi\eta rv$.</li>
<li><strong>Poiseuille's law:</strong> flow through a pipe is $Q = \dfrac{\pi r^4\Delta P}{8\eta L}$. The $r^4$ makes narrowed arteries so dangerous.</li>
</ul>
<p>The <strong>Reynolds number</strong> $\mathrm{Re} = \rho vL/\eta$ compares inertial to viscous effects and decides whether flow is smooth (laminar) or turbulent.</p>
<h3>Surface tension</h3>
<p>A liquid surface behaves like a stretched membrane with tension $\sigma$ (force per unit length; $0.072\ \mathrm{N/m}$ for water). A curved surface sustains a pressure jump. For a drop, $\Delta P = 2\sigma/r$; for a soap bubble with two surfaces, $4\sigma/r$. In a narrow tube of radius $r$, a wetting liquid rises to the <strong>capillary height</strong></p>
<div class="key">$$h = \frac{2\sigma\cos\theta}{\rho g r}.$$</div>
<div class="insight"><p>Comparing gravity with surface tension gives the capillary length $\ell_c = \sqrt{\sigma/(\rho g)} \approx 2.7\ \mathrm{mm}$ for water. Puddles, drops and menisci smaller than this are shaped by surface tension; larger ones are flattened by gravity. This is the kind of scale argument IYPT juries love.</p></div>`
      }
    ],
    labs: [
      { sim: 'buoyancy', title: 'Sink or float', desc: 'Drop a cube into different fluids and watch it settle. The arrows show weight (W) and buoyant force (F_b).',
        tasks: ['Set ρ<sub>b</sub> = 900 kg/m³ and compare fresh water with ethanol. Explain the difference.', 'Find a block density that floats in sea water but sinks in fresh water.', 'Choose mercury. Why does even a dense metal block float?'] }
    ],
    formulas: [
      ['Hydrostatic pressure', R`P = P_0 + \rho g h`],
      ['Force on a dam', R`F = \tfrac12\rho g H^2 W`],
      ['Buoyancy', R`F_b = \rho_f g V_{\text{sub}}`],
      ['Continuity', R`A_1v_1 = A_2v_2`],
      ['Bernoulli', R`P + \tfrac12\rho v^2 + \rho g h = \text{const}`],
      ['Torricelli', R`v = \sqrt{2gh}`],
      ['Stokes drag', R`F = 6\pi\eta r v`],
      ['Poiseuille flow', R`Q = \pi r^4\Delta P/(8\eta L)`],
      ['Reynolds number', R`\mathrm{Re} = \rho v L/\eta`],
      ['Laplace pressure (drop)', R`\Delta P = 2\sigma/r`],
      ['Capillary rise', R`h = 2\sigma\cos\theta/(\rho g r)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Melting ice',
        q: R`<p>An ice cube floats in a glass of fresh water filled to the brim. When it melts completely, the water:</p>`,
        options: ['Overflows', 'Drops below the brim', 'Stays exactly at the brim', 'Overflows only if the ice was hollow'], answer: 2,
        hints: [R`How much water does floating ice displace, by mass?`],
        solution: R`<p>Floating ice displaces its own mass of water. When it melts, it becomes that same mass of water and fills exactly the displaced volume.</p>` },
      { level: 'concept', type: 'mcq', title: 'Hydrostatic paradox',
        q: R`<p>Three containers have the same base area and are filled with water to the same depth. One is a cylinder, one widens upward, and one narrows upward. The pressure on the base is:</p>`,
        options: ['Greatest in the widening container', 'Greatest in the narrowing container', 'The same in all three', 'Greatest in the cylinder'], answer: 2,
        hints: [R`$P = P_0 + \rho g h$ depends only on depth.`],
        solution: R`<p>Pressure depends only on depth, so all three bases feel the same pressure and force, even though the containers hold different weights of water. The sloping walls take up the difference.</p>` },
      { level: 'concept', type: 'mcq', title: 'Blowing between sheets',
        q: R`<p>You hold two sheets of paper parallel and close together, and blow between them. The sheets:</p>`,
        options: ['Move apart', 'Move together', 'Stay still', 'Start to spin'], answer: 1,
        hints: [R`Where is the air moving fastest, and what does Bernoulli say about its pressure?`],
        solution: R`<p>The fast-moving air between the sheets has lower pressure than the still air outside, so the sheets are pushed together.</p>` },
      { level: 'core', type: 'num', title: 'Diving pressure',
        q: R`<p>What is the absolute pressure at a depth of $25\ \mathrm{m}$ in seawater ($\rho = 1025\ \mathrm{kg/m^3}$)? Take atmospheric pressure as $1.013\times10^5\ \mathrm{Pa}$.</p>`,
        answer: 1.013e5 + 1025 * 9.8 * 25, tol: 0.01, unit: 'Pa',
        hints: [R`$P = P_0 + \rho g h$.`],
        solution: R`<p>$P = 1.013\times10^5 + (1025)(9.8)(25) = 3.52\times10^5\ \mathrm{Pa}$, about 3.5 atmospheres.</p>` },
      { level: 'core', type: 'num', title: 'Floating block',
        q: R`<p>A wooden block of density $650\ \mathrm{kg/m^3}$ and height $20\ \mathrm{cm}$ floats upright in fresh water. How many centimetres stick out above the surface?</p>`,
        answer: 20 * (1 - 0.65), tol: 0.01, unit: 'cm',
        hints: [R`The submerged fraction is $\rho_{\text{wood}}/\rho_{\text{water}}$.`],
        solution: R`<p>65% is submerged, so $0.35 \times 20 = 7.0\ \mathrm{cm}$ is above water.</p>` },
      { level: 'core', type: 'num', title: 'Leaking tank',
        q: R`<p>Water stands $2.0\ \mathrm{m}$ deep in an open tank. How fast does water leave a small hole in the bottom?</p>`,
        answer: Math.sqrt(2 * 9.8 * 2), tol: 0.01, unit: 'm/s',
        hints: [R`Torricelli: $v = \sqrt{2gh}$.`],
        solution: R`<p>$v = \sqrt{2(9.8)(2.0)} = 6.26\ \mathrm{m/s}$.</p>` },
      { level: 'core', type: 'num', title: 'Narrowing pipe',
        q: R`<p>Water flows at $1.5\ \mathrm{m/s}$ through a horizontal pipe of diameter $4.0\ \mathrm{cm}$, which then narrows to $2.0\ \mathrm{cm}$. By how much does the pressure drop?</p>`,
        answer: 0.5 * 1000 * (36 - 2.25), tol: 0.01, unit: 'Pa',
        hints: [R`Halving the diameter quarters the area, so the speed rises by a factor of 4.`],
        solution: R`<p>$v_2 = 4(1.5) = 6.0\ \mathrm{m/s}$. $\Delta P = \tfrac12\rho(v_2^2 - v_1^2) = 500(36 - 2.25) = 1.69\times10^4\ \mathrm{Pa}$.</p>` },
      { level: 'core', type: 'num', title: 'Capillary rise',
        q: R`<p>How high does water rise in a clean glass tube of inner radius $0.50\ \mathrm{mm}$? Take $\sigma = 0.072\ \mathrm{N/m}$ and a contact angle of zero. Give the answer in centimetres.</p>`,
        answer: 100 * 2 * 0.072 / (1000 * 9.8 * 5e-4), tol: 0.01, unit: 'cm',
        hints: [R`$h = 2\sigma/(\rho g r)$.`],
        solution: R`<p>$h = \dfrac{2(0.072)}{(1000)(9.8)(5.0\times10^{-4})} = 0.0294\ \mathrm{m} = 2.94\ \mathrm{cm}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Draining a tank',
        q: R`<p>A cylindrical tank with cross-section $1.0\ \mathrm{m^2}$ holds water $2.0\ \mathrm{m}$ deep. A hole of area $1.0\ \mathrm{cm^2}$ is opened in the bottom. How long does the tank take to empty completely? Assume Torricelli's law holds throughout.</p>`,
        answer: 1e4 * Math.sqrt(2 * 2 / 9.8), tol: 0.01, unit: 's',
        hints: [R`$A\,\dd h/\dd t = -a\sqrt{2gh}$.`, R`Separate variables: $\int h^{-1/2}\,\dd h$.`],
        solution: R`<p>$A\,\dd h/\dd t = -a\sqrt{2gh}$ integrates to $2\sqrt{H} = \dfrac{a}{A}\sqrt{2g}\,t$, so</p>$$t = \frac{A}{a}\sqrt{\frac{2H}{g}} = 10^4\sqrt{\frac{4.0}{9.8}} = 6.39\times10^3\ \mathrm{s} \approx 1.8\ \mathrm{h}.$$<p>Half the water drains in only 29% of that time, because the outflow slows as the head falls.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ball in syrup',
        q: R`<p>A steel ball ($\rho = 7800\ \mathrm{kg/m^3}$) of radius $1.0\ \mathrm{mm}$ is dropped into glycerin ($\rho = 1260\ \mathrm{kg/m^3}$, $\eta = 1.41\ \mathrm{Pa\,s}$). Find its terminal speed, assuming Stokes drag.</p>`,
        answer: 2 * 1e-6 * (7800 - 1260) * 9.8 / (9 * 1.41), tol: 0.01, unit: 'm/s',
        hints: [R`At terminal speed: weight = buoyancy + $6\pi\eta rv$.`, R`Check afterwards that the Reynolds number is small.`],
        solution: R`<p>$\tfrac43\pi r^3(\rho_s - \rho_f)g = 6\pi\eta rv$, so $v = \dfrac{2r^2(\rho_s - \rho_f)g}{9\eta} = 1.01\times10^{-2}\ \mathrm{m/s}$. Check: $\mathrm{Re} = \rho_f v(2r)/\eta \approx 0.02 \ll 1$, so Stokes' law is valid. This is how viscosity is measured in a falling-ball viscometer.</p>` },
      { level: 'olympiad', type: 'num', title: 'Spinning bucket',
        q: R`<p>A cylindrical bucket of radius $10\ \mathrm{cm}$ containing water rotates about its vertical axis at $10\ \mathrm{rad/s}$. Once the water rotates rigidly with the bucket, how much higher is the water at the wall than at the centre? Give the answer in centimetres.</p>`,
        answer: 100 * 100 * 0.01 / (2 * 9.8), tol: 0.01, unit: 'cm',
        hints: [R`In the rotating frame, the surface is an equipotential of gravity plus centrifugal potential $-\tfrac12\omega^2r^2$.`],
        solution: R`<p>In the rotating frame the surface satisfies $gz - \tfrac12\omega^2r^2 = \text{const}$, a paraboloid $z = \omega^2r^2/(2g)$. At the wall: $\Delta z = \dfrac{(10)^2(0.10)^2}{2(9.8)} = 5.10\ \mathrm{cm}$. Newton used this bucket to argue for absolute rotation.</p>` }
    ]
  });
})();
