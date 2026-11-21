(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'quantum', num: 20, part: 'Modern Physics',
    title: 'Quantum and Atomic Physics',
    subtitle: R`Light comes in photons, matter behaves as waves, and atoms have discrete energy levels. From blackbody radiation to the particle in a box.`,
    goals: ['Use photon energy and momentum', 'Explain the photoelectric and Compton effects', 'Compute de Broglie wavelengths', 'Apply the Bohr model of hydrogen', 'Solve the particle-in-a-box problem'],
    sections: [
      {
        title: 'Photons',
        html: R`
<p>Classical physics predicted that a hot object should radiate infinite energy at short wavelengths. Planck fixed this in 1900 by assuming energy is emitted in packets $E = hf$. Einstein went further: light itself consists of <strong>photons</strong> with</p>
<div class="key">$$E = hf = \frac{hc}{\lambda},\qquad p = \frac{h}{\lambda},\qquad hc = 1240\ \mathrm{eV\,nm}.$$</div>
<h3>The photoelectric effect</h3>
<p>Light ejects electrons from a metal. Classically, brighter light should eject faster electrons. Instead, experiments showed:</p>
<ul>
<li>Below a threshold frequency, no electrons emerge, however intense the light.</li>
<li>The maximum electron energy depends on frequency, not intensity: $K_{\max} = hf - \phi$, where $\phi$ is the work function.</li>
<li>Intensity only changes the <em>number</em> of electrons.</li>
</ul>
<p>The stopping potential $V_s = K_{\max}/e$ is measured by applying a retarding voltage until the current stops.</p>
<h3>Compton scattering</h3>
<p>X-rays scattered off electrons come out with longer wavelength. Treating the photon as a particle that collides with an electron gives</p>
$$\Delta\lambda = \frac{h}{m_ec}(1 - \cos\theta),\qquad \frac{h}{m_ec} = 2.43\ \mathrm{pm}.$$`
      },
      {
        title: 'Matter waves and uncertainty',
        html: R`
<p>De Broglie proposed that particles also have a wavelength,</p>
<div class="key">$$\lambda = \frac{h}{p}.$$</div>
<p>Electrons accelerated through $100\ \mathrm V$ have $\lambda \approx 0.12\ \mathrm{nm}$, similar to atomic spacings, and Davisson and Germer saw them diffract off a nickel crystal. Electron microscopes exploit these short wavelengths.</p>
<p>A wave localised in a region $\Delta x$ must contain a spread of wavelengths, hence of momenta. Heisenberg's <strong>uncertainty principle</strong> makes this precise:</p>
$$\Delta x\,\Delta p \ge \frac{\hbar}{2},\qquad \Delta E\,\Delta t \gtrsim \frac{\hbar}{2},$$
<p>with $\hbar = h/2\pi$. Confining a particle costs kinetic energy, which is why atoms do not collapse.</p>
<div class="insight"><p>Uncertainty-principle estimates are an olympiad favourite. Set $p \sim \hbar/r$ for a particle confined to size $r$, write the total energy, and minimise it. For hydrogen, $E = \hbar^2/(2mr^2) - ke^2/r$ is smallest at the Bohr radius, giving $-13.6\ \mathrm{eV}$ exactly.</p></div>`
      },
      {
        title: 'The Bohr model of hydrogen',
        html: R`
<p>Bohr assumed the electron's angular momentum is quantised, $L = n\hbar$, equivalent to fitting a whole number of de Broglie wavelengths around the orbit. Combined with the Coulomb force, this gives</p>
<div class="key">$$r_n = n^2a_0,\quad a_0 = 0.0529\ \mathrm{nm};\qquad E_n = -\frac{13.6\ \mathrm{eV}}{n^2}.$$</div>
<p>When the electron drops from level $n_2$ to $n_1$, it emits a photon:</p>
$$\frac1\lambda = R_H\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right),\qquad R_H = 1.097\times10^7\ \mathrm{m^{-1}}.$$
<p>Transitions to $n_1 = 1$ (Lyman) are ultraviolet; to $n_1 = 2$ (Balmer) are visible; to $n_1 = 3$ (Paschen) are infrared.</p>
<p>For a single electron orbiting a nucleus of charge $Ze$, energies scale as $Z^2$. Replacing the electron mass with the reduced mass of the electron–nucleus pair accounts for the nucleus's motion; this matters a great deal for exotic atoms such as positronium and muonic hydrogen.</p>`
      },
      {
        title: 'The Schrödinger equation and the particle in a box',
        html: R`
<p>A particle's state is described by a wavefunction $\psi(x)$, and $|\psi|^2$ gives the probability density for finding it. For stationary states of energy $E$ in a potential $U(x)$:</p>
$$-\frac{\hbar^2}{2m}\frac{\dd^2\psi}{\dd x^2} + U\psi = E\psi.$$
<p>For a particle trapped between infinitely high walls a distance $L$ apart, $\psi$ must vanish at the walls, so a whole number of half-wavelengths must fit: $\lambda_n = 2L/n$. The allowed energies are</p>
<div class="key">$$E_n = \frac{n^2h^2}{8mL^2},\qquad \psi_n = \sqrt{\frac2L}\sin\frac{n\pi x}{L}.$$</div>
<p>The ground state is not zero energy: confinement always costs energy. Superpositions of different $n$ evolve in time, and the probability sloshes back and forth (see the lab).</p>
<p>When walls are finite, the wavefunction leaks into the forbidden region and can emerge on the other side: <strong>tunnelling</strong>, responsible for alpha decay, scanning tunnelling microscopes and the fusion that powers the Sun.</p>`
      }
    ],
    labs: [
      { sim: 'photo', title: 'Photoelectric effect', desc: 'Photons strike the cathode and may eject electrons toward the anode. The graph shows photocurrent against anode voltage.',
        tasks: ['With sodium, increase the wavelength until emission stops. Compare with the threshold wavelength 1240/φ nm.', 'Doubling the intensity: what changes on the I–V graph, and what does not?', 'Find the stopping voltage for 250 nm light on zinc and check K<sub>max</sub> = hf − φ.'] },
      { sim: 'box', title: 'Particle in a box', desc: 'Wavefunctions of an electron in a 1D box. Thin lines are the real and imaginary parts of ψ; the filled curve is the probability density.',
        tasks: ['Step through n = 1 to 6. How many nodes does each state have? Does |ψ|² change in time?', 'Turn on the superposition of n = 1 and 2. Watch ⟨x⟩ oscillate. What sets the oscillation period?', 'Halve the box width. By what factor do the energies change?'] }
    ],
    formulas: [
      ['Photon energy', R`E = hf = hc/\lambda`],
      ['Photon momentum', R`p = h/\lambda`],
      ['hc', R`hc = 1240\ \mathrm{eV\,nm}`],
      ['Photoelectric equation', R`K_{\max} = hf - \phi`],
      ['Compton shift', R`\Delta\lambda = \frac{h}{m_ec}(1 - \cos\theta)`],
      ['de Broglie', R`\lambda = h/p`],
      ['Uncertainty', R`\Delta x\Delta p \ge \hbar/2`],
      ['Bohr energies', R`E_n = -13.6\ \mathrm{eV}/n^2`],
      ['Rydberg formula', R`1/\lambda = R_H(1/n_1^2 - 1/n_2^2)`],
      ['Particle in a box', R`E_n = n^2h^2/(8mL^2)`],
      ['Wien’s law', R`\lambda_{\max}T = 2.898\ \mathrm{mm\,K}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Brighter light',
        q: R`<p>In a photoelectric experiment the light intensity is doubled while its frequency is unchanged (and above threshold). What happens?</p>`,
        options: ['The maximum electron energy doubles', 'The number of electrons emitted per second increases; the maximum energy is unchanged', 'Both double', 'Nothing changes'], answer: 1,
        hints: [R`More intense light means more photons, not more energetic ones.`],
        solution: R`<p>Each photon still carries $hf$, so $K_{\max}$ is unchanged. More photons per second eject more electrons, raising the current.</p>` },
      { level: 'concept', type: 'mcq', title: 'Same energy, different wavelength',
        q: R`<p>An electron and a proton have the same (non-relativistic) kinetic energy. Which has the longer de Broglie wavelength?</p>`,
        options: ['The electron', 'The proton', 'They are equal', 'It depends on the energy'], answer: 0,
        hints: [R`$p = \sqrt{2mK}$, so $\lambda = h/\sqrt{2mK}$.`],
        solution: R`<p>With equal $K$, the lighter particle has less momentum and therefore a longer wavelength, by a factor $\sqrt{1836} \approx 43$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Red line of hydrogen',
        q: R`<p>Which transition in hydrogen produces the visible red line at $656\ \mathrm{nm}$?</p>`,
        options: ['n = 2 → 1', 'n = 3 → 2', 'n = 4 → 3', 'n = 3 → 1'], answer: 1,
        hints: [R`Visible lines belong to the Balmer series, ending on $n = 2$.`],
        solution: R`<p>$n = 3 \to 2$ releases $13.6(1/4 - 1/9) = 1.89\ \mathrm{eV}$, i.e. $1240/1.89 = 656\ \mathrm{nm}$: the H-alpha line.</p>` },
      { level: 'core', type: 'num', title: 'Green photon',
        q: R`<p>What is the energy of a $500\ \mathrm{nm}$ photon, in electron-volts?</p>`,
        answer: 1240 / 500, tol: 0.01, unit: 'eV',
        hints: [R`$E = hc/\lambda$ with $hc = 1240\ \mathrm{eV\,nm}$.`],
        solution: R`<p>$E = 1240/500 = 2.48\ \mathrm{eV}$.</p>` },
      { level: 'core', type: 'num', title: 'Stopping potential',
        q: R`<p>Light of wavelength $250\ \mathrm{nm}$ falls on zinc (work function $4.30\ \mathrm{eV}$). What is the stopping potential, in volts?</p>`,
        answer: 1240 / 250 - 4.3, tol: 0.02, unit: 'V',
        hints: [R`$eV_s = hc/\lambda - \phi$.`],
        solution: R`<p>$hc/\lambda = 4.96\ \mathrm{eV}$, so $K_{\max} = 0.66\ \mathrm{eV}$ and $V_s = 0.66\ \mathrm V$.</p>` },
      { level: 'core', type: 'num', title: 'Electron wavelength',
        q: R`<p>An electron is accelerated from rest through $100\ \mathrm V$. What is its de Broglie wavelength, in nanometres?</p>`,
        answer: 6.626e-34 / Math.sqrt(2 * 9.109e-31 * 1.602e-19 * 100) * 1e9, tol: 0.01, unit: 'nm',
        hints: [R`$p = \sqrt{2meV}$.`],
        solution: R`<p>$p = \sqrt{2(9.109\times10^{-31})(1.602\times10^{-19})(100)} = 5.40\times10^{-24}\ \mathrm{kg\,m/s}$, so $\lambda = h/p = 0.123\ \mathrm{nm}$.</p>` },
      { level: 'core', type: 'num', title: 'H-alpha wavelength',
        q: R`<p>Use the Rydberg formula ($R_H = 1.097\times10^7\ \mathrm{m^{-1}}$) to find the wavelength of the $n = 3 \to 2$ transition in hydrogen, in nanometres.</p>`,
        answer: 1e9 / (1.097e7 * (1 / 4 - 1 / 9)), tol: 0.005, unit: 'nm',
        hints: [R`$1/\lambda = R_H(1/4 - 1/9)$.`],
        solution: R`<p>$1/\lambda = 1.097\times10^7 \times 5/36 = 1.524\times10^6\ \mathrm{m^{-1}}$, so $\lambda = 656\ \mathrm{nm}$.</p>` },
      { level: 'core', type: 'num', title: 'Compton shift',
        q: R`<p>X-rays scatter off free electrons at $90^\circ$. By how much does their wavelength increase, in picometres?</p>`,
        answer: 6.626e-34 / (9.109e-31 * 2.998e8) * 1e12, tol: 0.01, unit: 'pm',
        hints: [R`At $90^\circ$, $1 - \cos\theta = 1$.`],
        solution: R`<p>$\Delta\lambda = h/(m_ec) = 2.43\ \mathrm{pm}$, the Compton wavelength of the electron.</p>` },
      { level: 'olympiad', type: 'num', title: 'Electron in a tiny box',
        q: R`<p>An electron is confined to a one-dimensional box of length $0.10\ \mathrm{nm}$, about the size of an atom. What is its ground-state energy in eV?</p>`,
        answer: Math.pow(6.626e-34, 2) / (8 * 9.109e-31 * 1e-20) / 1.602e-19, tol: 0.01, unit: 'eV',
        hints: [R`$E_1 = h^2/(8mL^2)$.`],
        solution: R`<p>$E_1 = \dfrac{(6.626\times10^{-34})^2}{8(9.109\times10^{-31})(10^{-20})} = 6.02\times10^{-18}\ \mathrm J = 37.6\ \mathrm{eV}$. This is the right order of magnitude for atomic binding energies, showing that confinement energy sets the scale of chemistry.</p>` },
      { level: 'olympiad', type: 'num', title: 'Solar sail',
        q: R`<p>Sunlight near Earth delivers $1361\ \mathrm{W/m^2}$. What force does it exert on a perfectly reflecting $100\ \mathrm{m^2}$ sail facing the Sun? ($c = 2.998\times10^8\ \mathrm{m/s}$)</p>`,
        answer: 2 * 1361 * 100 / 2.998e8, tol: 0.01, unit: 'N',
        hints: [R`Each photon's momentum is reversed on reflection, so the momentum transfer is $2E/c$.`],
        solution: R`<p>$F = 2IA/c = 2(1361)(100)/(2.998\times10^8) = 9.1\times10^{-4}\ \mathrm N$. Tiny, but it never runs out: over a year it would accelerate a $10\ \mathrm{kg}$ craft by about $3\ \mathrm{km/s}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Muonic hydrogen',
        q: R`<p>In muonic hydrogen a muon ($207\,m_e$) replaces the electron in orbit around a proton ($1836\,m_e$). Using the Bohr model with reduced masses, find the ground-state binding energy in keV. (Ordinary hydrogen: $13.6\ \mathrm{eV}$, which already includes the electron–proton reduced mass.)</p>`,
        answer: 13.6 * (207 * 1836 / (207 + 1836)) / (1836 / 1837) / 1000, tol: 0.02, unit: 'keV',
        hints: [R`Bohr energies are proportional to the reduced mass $\mu = m_1m_2/(m_1 + m_2)$.`, R`$\mu_{\text{muonic}} = 186\,m_e$ and $\mu_{\text{H}} = 0.99946\,m_e$.`],
        solution: R`<p>$\mu = \dfrac{207 \times 1836}{2043}m_e = 186.0\,m_e$. Scaling: $E = 13.6\ \mathrm{eV} \times \dfrac{186.0}{0.99946} = 2.53\ \mathrm{keV}$. The orbit is 186 times smaller than hydrogen's, so the muon probes the proton's size; precision measurements here exposed the "proton radius puzzle".</p>` }
    ]
  });
})();
