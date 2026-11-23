/* Plain-words summaries: physics. One entry per section, in section order. */
(function () {
  const P = PB.addPlain;
  P('toolkit', [
    'Every physical quantity has a unit, and both sides of a correct equation must have the same units. Checking units catches mistakes and can even tell you how a formula must look.',
    'Before calculating exactly, guess the answer to the nearest power of ten. A rough estimate tells you whether a later answer is sensible.',
    'Some quantities have only a size (like mass); vectors also have a direction (like velocity). You add vectors tip to tail, or by adding their x and y parts separately.',
    'Derivatives measure how fast something changes; integrals add up lots of small pieces. For small changes, curves look like straight lines, which makes good approximations.',
    'Hard problems get easier with a routine: draw a picture, list what you know, pick the physics law that connects them, solve with symbols, then check units and limits.'
  ]);
  P('kinematics', [
    'Position says where something is, velocity how fast its position changes, and acceleration how fast its velocity changes. On a graph, each is the slope of the one before.',
    'When acceleration stays the same, four short equations link time, distance, starting speed, final speed and acceleration. Pick the one that contains what you know and what you want.',
    'A thrown object moves sideways at a steady speed while gravity pulls it down. Treat the sideways and up-down motions as two separate problems that share the same time.',
    'Speed depends on who is watching. To get the velocity seen by one observer, subtract that observer’s own velocity.',
    'Moving in a circle means your direction keeps changing, so you are accelerating even at constant speed. That acceleration always points to the centre of the circle.'
  ]);
  P('newton', [
    'An object keeps doing what it is doing unless a net force acts; the net force equals mass times acceleration; and forces always come in equal and opposite pairs acting on different objects.',
    'Draw each object alone with every force acting on it as an arrow. Then add the forces in each direction and set the total equal to mass times acceleration.',
    'When objects are tied or pushed together, they share the same acceleration. Write Newton’s second law for each object and solve the equations together.',
    'Something moving in a circle needs a net force pointing to the centre. Inside an accelerating vehicle it feels like there is an extra outward or backward “fictitious” force.',
    'Air or water pushes back harder the faster you go. When the push back equals your weight, you stop speeding up and fall at a steady terminal velocity.'
  ]);
  P('energy', [
    'Work is force times the distance moved in the direction of the force. Pushing along the motion gives energy; pushing against it takes energy away.',
    'Moving things carry kinetic energy, which grows with the square of speed. The total work done on an object equals its change in kinetic energy.',
    'Potential energy is energy stored by position, like height in gravity or stretch in a spring. It only exists for forces where the path taken does not matter.',
    'Energy is never created or destroyed, only changed from one form to another. If there is no friction, kinetic plus potential energy stays the same.',
    'Power is how fast energy is transferred: energy divided by time, or force times speed.'
  ]);
  P('momentum', [
    'Momentum is mass times velocity. A force acting for some time changes momentum by force times time, which is called impulse.',
    'The centre of mass is the average position of all the mass. If no outside force acts, the total momentum of a system never changes.',
    'In every collision momentum is conserved. If the objects bounce perfectly, kinetic energy is also conserved; if they stick together, the most kinetic energy is lost.',
    'A rocket speeds up by throwing mass backwards. Keeping track of momentum, including the mass that leaves, gives the rocket equation.'
  ]);
  P('rotation', [
    'Spinning has its own versions of position, velocity and acceleration: angle, angular velocity and angular acceleration. The same constant-acceleration equations work for them.',
    'Moment of inertia measures how hard something is to spin. Mass far from the axis makes it much harder than mass close in.',
    'Torque is the turning effect of a force: force times its distance from the pivot. Net torque causes angular acceleration, and zero net force plus zero net torque means balance.',
    'A wheel rolling without slipping moves forward one circumference per turn. Its kinetic energy is shared between moving along and spinning.',
    'Angular momentum is the spinning version of momentum. If no outside torque acts it stays fixed, which is why a skater spins faster when pulling their arms in.'
  ]);
  P('gravitation', [
    'Every mass pulls on every other mass. The pull grows with both masses and falls with the square of the distance between them.',
    'Gravitational potential energy is negative and rises towards zero far away. To escape completely, kinetic energy must be enough to reach zero total energy.',
    'Planets move in ellipses, sweep out equal areas in equal times, and take longer to orbit when they are further out (period squared is proportional to size cubed).',
    'Spacecraft change orbit with short engine burns at the right point. Two bodies really orbit their shared centre of mass, and the difference in pull across a body causes tides.'
  ]);
  P('oscillations', [
    'When a restoring force is proportional to how far something is pushed from its resting point, it swings back and forth in a smooth sine wave with a fixed period.',
    'A pendulum swinging through small angles behaves like simple harmonic motion. Its period depends on its length and gravity, not on its mass.',
    'Friction makes oscillations die away. A little damping shrinks the swings slowly; heavy damping stops them from swinging at all.',
    'Pushing an oscillator at its natural frequency makes the swings grow large. This is resonance, and damping controls how tall and sharp the peak is.',
    'Linked oscillators trade energy back and forth. Their motion can be split into normal modes, simple patterns where everything moves at one frequency.'
  ]);
  P('fluids', [
    'Pressure is force per area. In a still fluid it grows with depth, because the fluid above has weight.',
    'A submerged object is pushed up by a force equal to the weight of the fluid it moves aside. If that is more than its own weight, it floats.',
    'Fluid speeds up where a pipe narrows, because the same volume must pass each second. Where it moves faster, its pressure is lower (Bernoulli).',
    'Viscosity is a fluid’s internal friction, like thickness in honey. Surface tension makes a liquid surface act like a stretched skin.'
  ]);
  P('waves', [
    'A wave carries energy without carrying the material along. Its speed equals frequency times wavelength.',
    'When waves overlap, their displacements add. Waves reflecting back and forth on a string make standing waves with fixed points that never move.',
    'Sound is a pressure wave in air. Loudness depends on the energy it carries, pitch on its frequency, and pipes resonate at particular frequencies.',
    'A moving source or listener changes the pitch you hear: higher when approaching, lower when moving away. A source faster than sound makes a shock wave.'
  ]);
  P('thermal', [
    'Temperature measures how much the particles are jiggling. Most materials expand a little when they get hotter.',
    'Heat is energy moving because of a temperature difference. Different materials need different amounts of energy to warm up, and melting or boiling needs extra energy with no temperature rise.',
    'Heat travels by conduction (through touching), convection (moving fluid) and radiation (light). Hotter objects radiate much more strongly.',
    'Gas pressure comes from molecules hitting the walls. The average kinetic energy of the molecules is proportional to temperature.'
  ]);
  P('thermodynamics', [
    'The internal energy of a gas changes by the heat added minus the work the gas does. It is conservation of energy for heat.',
    'Gases can be heated at constant volume, constant pressure, constant temperature or with no heat flow. Each process traces a different path on a pressure–volume graph.',
    'A heat engine turns some heat into work but must dump the rest into a colder place. A refrigerator does the reverse using work.',
    'Entropy measures how spread out energy is. In any real process the total entropy goes up, which sets a maximum efficiency for engines.'
  ]);
  P('electrostatics', [
    'Charges come in two kinds: like charges repel, unlike charges attract. The force falls off with the square of the distance, just like gravity.',
    'An electric field tells you the force a small positive charge would feel at each point. Field lines start on positive charges and end on negative ones.',
    'Gauss’s law counts field lines leaving a closed surface to find the charge inside. Inside a metal in balance the field is zero, so all extra charge sits on the surface.',
    'Electric potential is energy per charge, measured in volts. Charges naturally move from high to low potential energy, and the field points “downhill” in potential.'
  ]);
  P('circuits', [
    'A capacitor stores charge on two plates. The charge it holds is proportional to the voltage across it.',
    'Current is the flow of charge. For many materials the current is proportional to the voltage (Ohm’s law), and resistors turn electrical energy into heat.',
    'At any junction, the current flowing in equals the current flowing out. Around any closed loop, the voltage changes add up to zero.',
    'A capacitor charging through a resistor fills quickly at first and then more slowly. The time constant, resistance times capacitance, sets how quickly.'
  ]);
  P('magnetism', [
    'A magnetic field pushes on a moving charge sideways, at right angles to both its motion and the field. This makes charges curve in circles.',
    'A wire carrying current in a magnetic field feels a force. A loop of current feels a twist, which is how electric motors work.',
    'Moving charges make magnetic fields. A long straight wire makes circles of field around it that get weaker further away.',
    'Ampère’s law adds up the field along a closed path to find the current passing through. It quickly gives the field inside wires and coils.'
  ]);
  P('induction', [
    'Changing the magnetic field through a loop makes a voltage in the loop. The induced current always flows so as to fight the change (Lenz’s law).',
    'A coil resists changes in its own current, a property called inductance. It stores energy in its magnetic field.',
    'Spinning a coil in a magnetic field makes alternating voltage: a generator. Transformers use two coils to step voltages up or down.',
    'In AC circuits voltage and current go up and down like sine waves. Capacitors and inductors shift their timing, and a circuit can resonate at one frequency.',
    'Four equations describe all of electricity and magnetism. Together they predict waves of electric and magnetic field moving at the speed of light: light itself.'
  ]);
  P('geometric-optics', [
    'Light bounces off a mirror at the same angle it arrives. Entering a new material, it bends because it changes speed.',
    'Flat mirrors make images the same size, behind the mirror. Curved mirrors can focus light and make images that are bigger, smaller or upside down.',
    'A lens bends light to a focus. One equation links where the object is, where the image forms and the focal length.',
    'Microscopes, telescopes and eyes all use lenses together. Combining them makes things look bigger or brings distant objects closer.'
  ]);
  P('wave-optics', [
    'Light from two slits overlaps to make bright and dark stripes. Bright stripes appear where the paths differ by a whole number of wavelengths.',
    'Light reflecting off the top and bottom of a thin film can reinforce or cancel, which makes the colours of soap bubbles and oil slicks.',
    'Light spreads out after passing through a small opening. This spreading limits how much detail any telescope or eye can see.',
    'A grating with many slits makes very sharp, bright lines at angles that depend on wavelength, so it splits light into its colours precisely.',
    'Light waves wiggle in a particular direction. A polariser only lets one direction through, and reflection can partly polarise light.'
  ]);
  P('relativity', [
    'The laws of physics are the same for everyone moving steadily, and everyone measures the same speed of light. Surprising effects follow from just these two rules.',
    'Moving clocks run slow and moving objects are shorter along their motion, as measured by someone they pass. The effects only matter near the speed of light.',
    'The Lorentz transformation converts times and positions between observers. Events that are simultaneous for one observer may not be for another.',
    'Mass is a form of energy (E = mc²). As speed approaches light speed, energy and momentum grow without limit, so nothing with mass can reach it.'
  ]);
  P('quantum', [
    'Light comes in packets called photons. Each photon’s energy depends only on its frequency, which explains the photoelectric effect.',
    'Particles like electrons also behave like waves. You cannot know both position and momentum exactly at the same time.',
    'In hydrogen, the electron can only have certain energies. Jumping between levels gives out or absorbs light of exact colours.',
    'The Schrödinger equation describes how quantum waves behave. A particle trapped in a box can only have certain energies, and it is never completely still.'
  ]);
  P('nuclear', [
    'The nucleus is tiny and holds protons and neutrons together with the strong force. Its size grows with the cube root of the number of particles.',
    'A nucleus weighs less than its separate parts; the missing mass is binding energy. Iron-like nuclei are the most tightly bound.',
    'Unstable nuclei decay at random, but a large number halves in a fixed time called the half-life.',
    'Splitting heavy nuclei (fission) or joining light ones (fusion) releases energy because the products are more tightly bound. Fusion powers the Sun.',
    'Matter is made of quarks and leptons. Four fundamental forces act between them, carried by exchange particles.'
  ]);
  P('analytical', [
    'For a force pointing to a centre, angular momentum is fixed, so the radial motion acts like a one-dimensional problem with an extra “centrifugal” term in the energy.',
    'Instead of forces, write down kinetic minus potential energy (the Lagrangian). A single recipe then gives the equations of motion in any coordinates.',
    'Every symmetry gives a conserved quantity: shifting in time gives energy, shifting in space gives momentum, rotating gives angular momentum.',
    'Small wobbles around a stable point can be split into normal modes by solving one matrix problem built from the Lagrangian.',
    'Some simple systems are chaotic: tiny differences in where you start grow so fast that long-term prediction becomes impossible.'
  ]);
  P('astrophysics', [
    'A star’s light tells us its temperature (colour), brightness and composition (dark lines in its spectrum). Distance links brightness to true power.',
    'A star is a balance: gravity pulls in, hot gas pressure pushes out. Fusion in the core supplies the energy that keeps it hot.',
    'Two stars orbiting each other reveal their masses. Planets around other stars are found by the wobble or dimming they cause.',
    'The universe is expanding: distant galaxies move away faster. Running it backwards points to a hot, dense beginning, the Big Bang.'
  ]);
  P('experimental', [
    'Every measurement has an uncertainty. Report the value together with how far off it could reasonably be.',
    'When you combine measurements, their uncertainties combine too. For products and quotients, add the percentage uncertainties.',
    'Rearrange a relationship so it gives a straight line, plot it, and read the gradient and intercept to find unknown constants.',
    'Plan what to change, what to measure and what to keep fixed. Then report results clearly, with units, uncertainties and a fair conclusion.'
  ]);
})();
