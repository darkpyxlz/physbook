(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'waves', num: 10, part: 'Mechanics',
    title: 'Waves and Sound',
    subtitle: R`Disturbances that carry energy without carrying matter. Travelling and standing waves, interference, sound, decibels, the Doppler effect and shock waves.`,
    goals: ['Describe a travelling wave mathematically', 'Find wave speeds on strings and in gases', 'Build standing waves and harmonics', 'Use intensity and decibels', 'Apply the Doppler effect'],
    sections: [
      {
        title: 'Travelling waves',
        html: R`
<p>A sinusoidal wave moving in the $+x$ direction is described by</p>
<div class="key">$$y(x,t) = A\sin(kx - \omega t),\qquad k = \frac{2\pi}{\lambda},\quad \omega = 2\pi f,\quad v = f\lambda = \frac{\omega}{k}.$$</div>
<p>Any function of $x - vt$ is a wave travelling to the right without changing shape; $x + vt$ travels left. Both satisfy the <strong>wave equation</strong></p>
$$\frac{\partial^2 y}{\partial t^2} = v^2\frac{\partial^2 y}{\partial x^2}.$$
<p>The speed depends on the medium, always as $\sqrt{\text{restoring stiffness}/\text{inertia}}$. On a string with tension $T$ and mass per length $\mu$, $v = \sqrt{T/\mu}$. In a fluid, $v = \sqrt{B/\rho}$ with bulk modulus $B$.</p>
<p>In transverse waves (strings, light) the medium moves perpendicular to the wave; in longitudinal waves (sound in air) it moves along it.</p>`
      },
      {
        title: 'Superposition and standing waves',
        html: R`
<p>Waves in linear media add: the total displacement is the sum of the individual displacements. Two waves in phase interfere constructively; half a wavelength out of phase, destructively.</p>
<p>Two identical waves travelling in opposite directions form a <strong>standing wave</strong>:</p>
$$A\sin(kx - \omega t) + A\sin(kx + \omega t) = 2A\sin kx\cos\omega t.$$
<p>Points with $\sin kx = 0$ never move (<strong>nodes</strong>, spaced $\lambda/2$ apart); halfway between are <strong>antinodes</strong>.</p>
<div class="key"><p><strong>String fixed at both ends</strong> or <strong>pipe open at both ends:</strong> $f_n = \dfrac{nv}{2L}$, $n = 1, 2, 3, \dots$<br><strong>Pipe closed at one end:</strong> $f_n = \dfrac{nv}{4L}$, odd $n$ only.</p></div>
<p>Instruments differ in timbre because they excite different mixtures of these harmonics.</p>`
      },
      {
        title: 'Sound',
        html: R`
<p>Sound in a gas is a pressure wave. The compressions are fast and adiabatic, so</p>
$$v = \sqrt{\frac{\gamma P}{\rho}} = \sqrt{\frac{\gamma RT}{M}},$$
<p>about $343\ \mathrm{m/s}$ in air at $20^\circ\mathrm{C}$. It depends on temperature, not on pressure.</p>
<p>Wave intensity is power per unit area. From a point source it spreads over a sphere, $I = P/(4\pi r^2)$. The ear spans a factor of $10^{12}$ in intensity, so we use the logarithmic <strong>decibel</strong> scale:</p>
<div class="key">$$\beta = 10\log_{10}\frac{I}{I_0},\qquad I_0 = 10^{-12}\ \mathrm{W/m^2}.$$</div>
<p>Each factor of 10 in intensity adds 10 dB. Doubling the distance from a point source subtracts about 6 dB.</p>
<p>Two tones of nearby frequencies $f_1$ and $f_2$ produce <strong>beats</strong> at frequency $|f_1 - f_2|$. Musicians tune by listening for beats to vanish.</p>`
      },
      {
        title: 'The Doppler effect and shock waves',
        html: R`
<p>When a source or observer moves through the medium, the observed frequency shifts:</p>
<div class="key">$$f' = f\,\frac{v \pm v_o}{v \mp v_s},$$</div>
<p>using the upper signs when source and observer approach each other. The asymmetry between source and observer motion is real for sound, because the medium defines a preferred frame. (For light there is no medium, and the relativistic formula of Chapter 19 applies.)</p>
<p>When the source moves faster than the waves ($v_s \gt v$), the wavefronts pile up into a cone, the <strong>Mach cone</strong>, with half-angle</p>
$$\sin\theta = \frac{v}{v_s} = \frac1M.$$
<p>A supersonic plane drags this cone along the ground, and everyone it sweeps over hears a sonic boom.</p>
<div class="insight"><p>For an echo off a moving reflector, apply Doppler twice: the reflector first acts as a moving observer, then re-emits as a moving source. Radar speed guns and bats both use this.</p></div>`
      }
    ],
    labs: [
      { sim: 'superposition', title: 'Superposition', desc: 'Two waves (top, middle) and their sum (bottom). Wave speed is fixed at 1 m/s.',
        tasks: ['Set f₁ = f₂ with wave 2 moving left and equal amplitudes. Locate the nodes; are they λ/2 apart?', 'Make both waves move right with f₁ = 1.0 Hz and f₂ = 1.2 Hz. Measure the beat period.', 'Reduce A₂ to 0.5 in the standing-wave setup. Why are there no longer true nodes?'] },
      { sim: 'doppler', title: 'Doppler and shock cones', desc: 'A source emits circular wavefronts while moving to the right.',
        tasks: ['At Mach 0.5, compare the wavefront spacing ahead of and behind the source with the readout.', 'Increase to Mach 1. What happens to the wavefronts ahead?', 'At Mach 2, measure the cone angle and compare with sin θ = 1/M.'] }
    ],
    formulas: [
      ['Wave speed', R`v = f\lambda = \omega/k`],
      ['Travelling wave', R`y = A\sin(kx - \omega t)`],
      ['String', R`v = \sqrt{T/\mu}`],
      ['Sound in gas', R`v = \sqrt{\gamma RT/M}`],
      ['Fixed–fixed string', R`f_n = nv/2L`],
      ['Closed pipe', R`f_n = nv/4L,\ n\ \text{odd}`],
      ['Decibels', R`\beta = 10\log_{10}(I/I_0)`],
      ['Beat frequency', R`f_b = |f_1 - f_2|`],
      ['Doppler (sound)', R`f' = f\frac{v \pm v_o}{v \mp v_s}`],
      ['Mach cone', R`\sin\theta = v/v_s`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Closed pipe',
        q: R`<p>A pipe closed at one end and open at the other supports which harmonics?</p>`,
        options: ['All integer multiples of the fundamental', 'Only odd multiples of the fundamental', 'Only even multiples of the fundamental', 'Only the fundamental'], answer: 1,
        hints: [R`There must be a node at the closed end and an antinode at the open end, so the length must be an odd number of quarter wavelengths.`],
        solution: R`<p>$L = n\lambda/4$ with $n$ odd, so $f_n = nv/(4L)$ with $n = 1, 3, 5, \dots$. A clarinet behaves roughly like this, giving it a hollow sound.</p>` },
      { level: 'concept', type: 'mcq', title: 'Tightening a string',
        q: R`<p>If the tension in a guitar string is quadrupled, the wave speed on it:</p>`,
        options: ['Is unchanged', 'Doubles', 'Quadruples', 'Halves'], answer: 1,
        hints: [R`$v = \sqrt{T/\mu}$.`],
        solution: R`<p>$v \propto \sqrt T$, so quadrupling $T$ doubles $v$, and every harmonic rises by an octave.</p>` },
      { level: 'concept', type: 'mcq', title: 'Decibels',
        q: R`<p>If the intensity of a sound increases by a factor of 100, the sound level increases by:</p>`,
        options: ['2 dB', '10 dB', '20 dB', '100 dB'], answer: 2,
        hints: [R`$\Delta\beta = 10\log_{10}(I_2/I_1)$.`],
        solution: R`<p>$10\log_{10}100 = 20\ \mathrm{dB}$.</p>` },
      { level: 'core', type: 'num', title: 'Tuning a guitar',
        q: R`<p>A guitar string has vibrating length $0.65\ \mathrm{m}$ and linear density $3.0\ \mathrm{g/m}$. What tension gives a fundamental of $110\ \mathrm{Hz}$?</p>`,
        answer: 0.003 * Math.pow(2 * 0.65 * 110, 2), tol: 0.01, unit: 'N',
        hints: [R`$v = 2Lf$ for the fundamental, and $T = \mu v^2$.`],
        solution: R`<p>$v = 2(0.65)(110) = 143\ \mathrm{m/s}$ and $T = \mu v^2 = (0.0030)(143)^2 = 61.3\ \mathrm{N}$.</p>` },
      { level: 'core', type: 'num', title: 'Middle C pipe',
        q: R`<p>How long must a pipe closed at one end be to have a fundamental of $262\ \mathrm{Hz}$? Take $v = 343\ \mathrm{m/s}$. Give the answer in metres.</p>`,
        answer: 343 / (4 * 262), tol: 0.01, unit: 'm',
        hints: [R`$L = \lambda/4$ for the fundamental of a closed pipe.`],
        solution: R`<p>$L = v/(4f) = 343/1048 = 0.327\ \mathrm{m}$.</p>` },
      { level: 'core', type: 'num', title: 'Approaching siren',
        q: R`<p>An ambulance siren emits $700\ \mathrm{Hz}$. The ambulance drives toward you at $30\ \mathrm{m/s}$. What frequency do you hear? ($v = 343\ \mathrm{m/s}$)</p>`,
        answer: 700 * 343 / (343 - 30), tol: 0.005, unit: 'Hz',
        hints: [R`Moving source, approaching: $f' = fv/(v - v_s)$.`],
        solution: R`<p>$f' = 700 \times \dfrac{343}{313} = 767\ \mathrm{Hz}$. After it passes, you hear $700 \times 343/373 = 644\ \mathrm{Hz}$.</p>` },
      { level: 'core', type: 'num', title: 'Walking away',
        q: R`<p>A loudspeaker (a point source) produces $80\ \mathrm{dB}$ at a distance of $10\ \mathrm{m}$. What is the sound level at $100\ \mathrm{m}$, ignoring absorption?</p>`,
        answer: 60, tol: 0.01, unit: 'dB',
        hints: [R`Intensity falls as $1/r^2$.`],
        solution: R`<p>Ten times farther means $1/100$ of the intensity, which is $-20\ \mathrm{dB}$: $80 - 20 = 60\ \mathrm{dB}$.</p>` },
      { level: 'core', type: 'num', title: 'Third harmonic',
        q: R`<p>A string $1.2\ \mathrm{m}$ long is fixed at both ends and carries waves at $240\ \mathrm{m/s}$. What is the frequency of its third harmonic?</p>`,
        answer: 3 * 240 / 2.4, tol: 0.01, unit: 'Hz',
        hints: [R`$f_n = nv/(2L)$.`],
        solution: R`<p>$f_3 = 3(240)/(2.4) = 300\ \mathrm{Hz}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Bat echo',
        q: R`<p>A bat flies at $10\ \mathrm{m/s}$ straight toward a wall, emitting $40.0\ \mathrm{kHz}$ pulses. What frequency does it hear in the echo? ($v = 343\ \mathrm{m/s}$)</p>`,
        answer: 40000 * (343 + 10) / (343 - 10), tol: 0.002, unit: 'Hz',
        hints: [R`First the wall receives sound from a source moving toward it. Then the wall re-emits at that frequency to an observer moving toward it.`],
        solution: R`<p>At the wall: $f_1 = f\dfrac{v}{v - u}$. At the bat: $f_2 = f_1\dfrac{v + u}{v} = f\dfrac{v + u}{v - u} = 40\,000 \times \dfrac{353}{333} = 42.4\ \mathrm{kHz}$. For $u \ll v$ the shift is about $2u/v$, twice the one-way shift.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sonic boom',
        q: R`<p>A jet flies level at an altitude of $8.0\ \mathrm{km}$ at Mach 2. How far past the point directly overhead has the jet travelled when you hear the boom? Give the answer in kilometres.</p>`,
        answer: 8 / Math.tan(Math.asin(0.5)), tol: 0.01, unit: 'km',
        hints: [R`The Mach cone has half-angle $\sin\theta = 1/M$. You hear the boom when the cone's surface reaches you.`],
        solution: R`<p>$\theta = \arcsin(1/2) = 30^\circ$. The cone passes you when the jet is a horizontal distance $h/\tan\theta = 8.0/0.577 = 13.9\ \mathrm{km}$ beyond the overhead point.</p>` },
      { level: 'olympiad', type: 'num', title: 'Pulse on a hanging rope',
        q: R`<p>A uniform rope $4.0\ \mathrm{m}$ long hangs from the ceiling. How long does a small transverse pulse take to travel from the bottom to the top?</p>`,
        answer: 2 * Math.sqrt(4 / 9.8), tol: 0.01, unit: 's',
        hints: [R`At height $y$ above the free end, the tension supports the rope below: $T = \mu g y$.`, R`So $v = \sqrt{gy}$ and $t = \int_0^L \dd y/\sqrt{gy}$.`],
        solution: R`<p>$v(y) = \sqrt{T/\mu} = \sqrt{gy}$. Then $t = \displaystyle\int_0^L\frac{\dd y}{\sqrt{gy}} = 2\sqrt{L/g} = 2\sqrt{4.0/9.8} = 1.28\ \mathrm{s}$, independent of the rope's mass.</p>` }
    ]
  });
})();
