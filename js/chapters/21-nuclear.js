(function () {
  const R = PB.R;
  const u = 931.494;
  PB.addChapter({
    id: 'nuclear', num: 21, part: 'Modern Physics',
    title: 'Nuclear and Particle Physics',
    subtitle: R`The nucleus: its size, its binding energy, radioactive decay, fission and fusion, and the particles and forces of the Standard Model.`,
    goals: ['Estimate nuclear sizes and binding energies', 'Balance decays and apply the decay law', 'Compute Q-values of reactions', 'Explain why fission and fusion release energy', 'Use conservation laws in particle reactions'],
    sections: [
      {
        title: 'The nucleus',
        html: R`
<p>A nucleus contains $Z$ protons and $N$ neutrons, with mass number $A = Z + N$. Isotopes share $Z$ but differ in $N$. Rutherford's alpha-scattering experiment showed that the nucleus is tiny: its radius is about</p>
<div class="key">$$R = R_0A^{1/3},\qquad R_0 \approx 1.2\ \mathrm{fm}.$$</div>
<p>Because volume grows as $A$, every nucleus has roughly the same density, about $2\times10^{17}\ \mathrm{kg/m^3}$.</p>
<p>The protons repel each other enormously. They are held together by the <strong>strong nuclear force</strong>, which is attractive, very strong and short-ranged (about $2\ \mathrm{fm}$). Neutrons add strong attraction without electric repulsion, so heavy nuclei need more neutrons than protons to be stable.</p>`
      },
      {
        title: 'Binding energy',
        html: R`
<p>A nucleus weighs less than its separate nucleons. The difference, the <strong>mass defect</strong>, is the binding energy:</p>
<div class="key">$$E_B = \left(Zm_{\text{H}} + Nm_n - M_{\text{atom}}\right)c^2,\qquad 1\ \mathrm u = 931.5\ \mathrm{MeV}/c^2.$$</div>
<p>(Using hydrogen-atom masses rather than bare protons makes the electron masses cancel.)</p>
<p>The binding energy per nucleon rises steeply for light nuclei, peaks near iron-56 at about $8.8\ \mathrm{MeV}$, and falls slowly for heavy nuclei. This one curve explains nuclear energy:</p>
<ul>
<li><strong>Fusion</strong> of light nuclei moves up the steep side and releases energy.</li>
<li><strong>Fission</strong> of heavy nuclei into medium ones moves up the gentle side and also releases energy.</li>
</ul>
<p>The energy released in a reaction is the <strong>Q-value</strong>, $Q = (\text{mass before} - \text{mass after})c^2$. Nuclear reactions release millions of electron-volts per event, a million times more than chemical reactions.</p>`
      },
      {
        title: 'Radioactive decay',
        html: R`
<p>Unstable nuclei decay spontaneously:</p>
<div class="table-wrap"><table><thead><tr><th>Decay</th><th>Emitted</th><th>Change</th></tr></thead><tbody>
<tr><td>Alpha</td><td>Helium-4 nucleus</td><td>$A - 4$, $Z - 2$</td></tr>
<tr><td>Beta minus</td><td>Electron + antineutrino</td><td>$A$ same, $Z + 1$ (a neutron becomes a proton)</td></tr>
<tr><td>Beta plus</td><td>Positron + neutrino</td><td>$A$ same, $Z - 1$</td></tr>
<tr><td>Gamma</td><td>Photon</td><td>Excited nucleus relaxes; $A$, $Z$ same</td></tr>
</tbody></table></div>
<p>Each nucleus has a constant probability $\lambda$ per unit time of decaying, independent of its age. So the number remaining falls exponentially:</p>
<div class="key">$$N(t) = N_0e^{-\lambda t},\qquad T_{1/2} = \frac{\ln2}{\lambda},\qquad A = \lambda N.$$</div>
<p>Activity $A$ is measured in becquerels (decays per second). Carbon-14, with $T_{1/2} = 5730$ years, is continually made in the atmosphere; once an organism dies, its carbon-14 decays, and the fraction left dates it.</p>
<div class="insight"><p>In a decay chain $A \to B \to C$ where $B$ decays much faster than $A$, the system reaches <strong>secular equilibrium</strong>: $\lambda_AN_A = \lambda_BN_B$, so both activities are equal. That is why radon is always present wherever uranium is.</p></div>`
      },
      {
        title: 'Fission, fusion and the Sun',
        html: R`
<p>A uranium-235 nucleus that absorbs a slow neutron splits into two medium nuclei plus two or three neutrons, releasing about $200\ \mathrm{MeV}$. The released neutrons can trigger more fissions: a <strong>chain reaction</strong>, controlled in reactors and uncontrolled in bombs.</p>
<p>Fusion requires overcoming the Coulomb barrier, around $0.4\ \mathrm{MeV}$ for two hydrogen nuclei to touch. In the Sun's core ($1.5\times10^7\ \mathrm K$, average thermal energy only about $2\ \mathrm{keV}$) fusion proceeds only thanks to quantum tunnelling and the high-energy tail of the Maxwell distribution. The proton–proton chain turns four protons into helium-4, releasing $26.7\ \mathrm{MeV}$.</p>
<p>The Sun's luminosity of $3.8\times10^{26}\ \mathrm W$ corresponds to converting over four million tonnes of mass into energy every second.</p>`
      },
      {
        title: 'Particles and forces',
        html: R`
<p>The Standard Model describes matter as made from two families of spin-½ particles:</p>
<ul>
<li><strong>Quarks</strong> (up, down, charm, strange, top, bottom), which feel the strong force and are always bound into hadrons. A proton is $uud$, a neutron $udd$.</li>
<li><strong>Leptons</strong> (electron, muon, tau and their neutrinos), which do not feel the strong force.</li>
</ul>
<p>Forces are carried by bosons: photons (electromagnetic), gluons (strong), $W$ and $Z$ (weak). The Higgs boson is associated with the mechanism that gives particles mass. Every particle has an antiparticle with opposite charge.</p>
<p>Reactions must conserve energy, momentum, charge, <strong>baryon number</strong> (quarks count $+\tfrac13$) and <strong>lepton number</strong>. These rules tell you which reactions can happen, and they predicted the neutrino: beta decay seemed to violate energy conservation until Pauli proposed an unseen particle carrying the missing energy.</p>`
      }
    ],
    labs: [
      { sim: 'decay', title: 'Radioactive decay', desc: 'Four hundred nuclei, each decaying at random with the chosen half-life. The dashed curve is the exponential law.',
        tasks: ['Watch how many remain after one half-life. Restart several times: how much does it vary?', 'Read N after three half-lives and compare with N₀/8.', 'Turn on the chain with B much shorter-lived than A. After a while, compare the activities λ<sub>A</sub>N<sub>A</sub> and λ<sub>B</sub>N<sub>B</sub>.'] }
    ],
    formulas: [
      ['Nuclear radius', R`R = R_0A^{1/3}`],
      ['Binding energy', R`E_B = (Zm_H + Nm_n - M)c^2`],
      ['Mass–energy', R`1\ \mathrm u = 931.5\ \mathrm{MeV}/c^2`],
      ['Q-value', R`Q = (m_{\text{initial}} - m_{\text{final}})c^2`],
      ['Decay law', R`N = N_0e^{-\lambda t}`],
      ['Half-life', R`T_{1/2} = \ln2/\lambda`],
      ['Activity', R`A = \lambda N`],
      ['Mean life', R`\tau = 1/\lambda`],
      ['Coulomb energy', R`U = \frac{1.44\ \mathrm{MeV\,fm}\,Z_1Z_2}{r}`],
      ['Alpha energy share', R`K_\alpha = Q\frac{A - 4}{A}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Beta-minus decay',
        q: R`<p>In beta-minus decay, how do the mass number $A$ and atomic number $Z$ of the nucleus change?</p>`,
        options: ['A decreases by 4, Z decreases by 2', 'A is unchanged, Z increases by 1', 'A is unchanged, Z decreases by 1', 'Both are unchanged'], answer: 1,
        hints: [R`A neutron turns into a proton, emitting an electron and an antineutrino.`],
        solution: R`<p>$n \to p + e^- + \bar\nu_e$: the nucleon count stays the same, but one more proton means $Z$ rises by 1. Carbon-14 becomes nitrogen-14 this way.</p>` },
      { level: 'concept', type: 'mcq', title: 'Three half-lives',
        q: R`<p>What fraction of a radioactive sample remains after three half-lives?</p>`,
        options: ['1/3', '1/6', '1/8', '1/9'], answer: 2,
        hints: [R`Halve, halve, halve.`],
        solution: R`<p>$(1/2)^3 = 1/8$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Why both release energy',
        q: R`<p>Both the fission of uranium and the fusion of hydrogen release energy. Why?</p>`,
        options: ['Both reactions destroy protons', 'In both cases the products have higher binding energy per nucleon than the reactants', 'Both are driven by the electrostatic force alone', 'Both create new neutrons from energy'], answer: 1,
        hints: [R`Think about the binding-energy-per-nucleon curve and where iron sits on it.`],
        solution: R`<p>The curve peaks near iron. Moving toward the peak from either side, by splitting heavy nuclei or joining light ones, makes the nucleons more tightly bound, and the difference is released.</p>` },
      { level: 'core', type: 'num', title: 'Size of a gold nucleus',
        q: R`<p>Estimate the radius of a gold-197 nucleus in femtometres, using $R_0 = 1.2\ \mathrm{fm}$.</p>`,
        answer: 1.2 * Math.cbrt(197), tol: 0.01, unit: 'fm',
        hints: [R`$R = R_0A^{1/3}$.`],
        solution: R`<p>$R = 1.2 \times 197^{1/3} = 1.2 \times 5.82 = 6.98\ \mathrm{fm}$, about $10^{-4}$ of the atom's radius.</p>` },
      { level: 'core', type: 'num', title: 'Binding energy of helium',
        q: R`<p>Find the binding energy of helium-4 in MeV. Atomic masses: $^1\mathrm H = 1.007825\ \mathrm u$, neutron $= 1.008665\ \mathrm u$, $^4\mathrm{He} = 4.002603\ \mathrm u$. ($1\ \mathrm u = 931.5\ \mathrm{MeV}/c^2$)</p>`,
        answer: (2 * 1.007825 + 2 * 1.008665 - 4.002603) * 931.5, tol: 0.01, unit: 'MeV',
        hints: [R`Mass defect $= 2m_H + 2m_n - M_{He}$.`],
        solution: R`<p>$\Delta m = 2(1.007825) + 2(1.008665) - 4.002603 = 0.030377\ \mathrm u$, so $E_B = 28.3\ \mathrm{MeV}$, or $7.07\ \mathrm{MeV}$ per nucleon. Helium-4 is unusually tightly bound, which is why alpha particles are emitted as a unit.</p>` },
      { level: 'core', type: 'num', title: 'Carbon dating',
        q: R`<p>A piece of ancient wood has 30% of the carbon-14 activity of living wood. How old is it? ($T_{1/2} = 5730$ years)</p>`,
        answer: 5730 * Math.log(1 / 0.3) / Math.log(2), tol: 0.01, unit: 'years',
        hints: [R`$t = T_{1/2}\log_2(N_0/N)$.`],
        solution: R`<p>$t = 5730 \times \dfrac{\ln(1/0.30)}{\ln2} = 5730 \times 1.737 = 9950$ years.</p>` },
      { level: 'core', type: 'num', title: 'The curie',
        q: R`<p>Radium-226 has a half-life of $1600$ years. What is the activity of $1.00\ \mathrm g$ of it, in becquerels? (1 year $= 3.156\times10^7\ \mathrm s$)</p>`,
        answer: Math.LN2 / (1600 * 3.156e7) * (6.022e23 / 226), tol: 0.01, unit: 'Bq',
        hints: [R`$N = (1/226)N_A$ and $\lambda = \ln2/T_{1/2}$ in s⁻¹.`],
        solution: R`<p>$N = 6.022\times10^{23}/226 = 2.66\times10^{21}$ and $\lambda = 0.693/(5.05\times10^{10}\ \mathrm s) = 1.37\times10^{-11}\ \mathrm{s^{-1}}$. $A = \lambda N = 3.66\times10^{10}\ \mathrm{Bq}$, which is essentially the original definition of the curie ($3.7\times10^{10}\ \mathrm{Bq}$).</p>` },
      { level: 'core', type: 'num', title: 'D–T fusion',
        q: R`<p>Find the energy released in the fusion reaction $\mathrm D + \mathrm T \to {}^4\mathrm{He} + n$, in MeV. Masses: D $= 2.014102\ \mathrm u$, T $= 3.016049\ \mathrm u$, $^4\mathrm{He} = 4.002603\ \mathrm u$, $n = 1.008665\ \mathrm u$.</p>`,
        answer: (2.014102 + 3.016049 - 4.002603 - 1.008665) * 931.5, tol: 0.01, unit: 'MeV',
        hints: [R`$Q = (m_{\text{before}} - m_{\text{after}})c^2$.`],
        solution: R`<p>$\Delta m = 5.030151 - 5.011268 = 0.018883\ \mathrm u$, so $Q = 17.6\ \mathrm{MeV}$. This is the reaction planned for fusion power plants such as ITER.</p>` },
      { level: 'olympiad', type: 'num', title: 'Alpha recoil',
        q: R`<p>Polonium-210 at rest undergoes alpha decay to lead-206, releasing $Q = 5.41\ \mathrm{MeV}$. What is the kinetic energy of the alpha particle, in MeV? (Use mass numbers for the masses.)</p>`,
        answer: 5.41 * 206 / 210, tol: 0.005, unit: 'MeV',
        hints: [R`The alpha and the lead nucleus have equal and opposite momenta.`, R`With equal momenta, $K = p^2/(2m)$, so kinetic energy is shared in inverse proportion to mass.`],
        solution: R`<p>Equal momenta mean $K_\alpha/K_{Pb} = m_{Pb}/m_\alpha = 206/4$. So $K_\alpha = Q\dfrac{206}{210} = 5.31\ \mathrm{MeV}$, and the recoiling lead nucleus carries $0.10\ \mathrm{MeV}$. Because the split is fixed, alpha particles from a given decay all have the same energy, unlike beta particles.</p>` },
      { level: 'olympiad', type: 'num', title: 'The Sun loses weight',
        q: R`<p>The Sun radiates $3.83\times10^{26}\ \mathrm W$. At what rate is it losing mass, in kilograms per second?</p>`,
        answer: 3.83e26 / Math.pow(2.998e8, 2), tol: 0.01, unit: 'kg/s',
        hints: [R`$\dd m/\dd t = P/c^2$.`],
        solution: R`<p>$\dd m/\dd t = 3.83\times10^{26}/(2.998\times10^8)^2 = 4.26\times10^9\ \mathrm{kg/s}$. Over its 10-billion-year life this is still under 0.1% of its mass.</p>` },
      { level: 'olympiad', type: 'num', title: 'Fusion temperature',
        q: R`<p>Two deuterons must come within about $4.0\ \mathrm{fm}$ of each other to fuse. Taking $ke^2 = 1.44\ \mathrm{MeV\,fm}$, find the temperature at which the average thermal kinetic energy $\tfrac32k_BT$ equals this Coulomb barrier. ($k_B = 8.617\times10^{-5}\ \mathrm{eV/K}$)</p>`,
        answer: 2 * (1.44 / 4) * 1e6 / (3 * 8.617e-5), tol: 0.01, unit: 'K',
        hints: [R`Barrier $= 1.44/4.0\ \mathrm{MeV} = 0.36\ \mathrm{MeV}$.`],
        solution: R`<p>$T = \dfrac{2U}{3k_B} = \dfrac{2(3.6\times10^5\ \mathrm{eV})}{3(8.617\times10^{-5}\ \mathrm{eV/K})} = 2.8\times10^9\ \mathrm K$. The Sun's core is only $1.5\times10^7\ \mathrm K$, nearly 200 times cooler: fusion happens only because of quantum tunnelling and the high-energy tail of the speed distribution.</p>` }
    ]
  });
})();
