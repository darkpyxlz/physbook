/* Plain-words summaries: maths. One entry per section, in section order. */
(function () {
  const P = PB.addPlain;
  P('math-functions', [
    'A function is a rule that takes an input and gives exactly one output. Its graph is a picture of every input–output pair.',
    'Adding a number to the input slides a graph sideways; adding to the output slides it up or down; multiplying stretches it. Functions can also be fed into each other.',
    'Exponentials grow by the same factor each step, like doubling. Logarithms undo them: a log answers “what power do I need?”.',
    'Radians measure angles by arc length on a circle of radius one. Sine and cosine are the height and the sideways position of a point moving round that circle.'
  ]);
  P('math-sequences', [
    'An arithmetic sequence adds the same amount each time. Its sum is the number of terms times the average of the first and last.',
    'A geometric sequence multiplies by the same ratio each time. Its sum has a neat formula, and it settles to a finite total if the ratio is between −1 and 1.',
    'Sigma notation is shorthand for “add up these terms”. A recurrence defines each term from the ones before it.',
    'Multiplying out (a + b) to a power gives terms whose numbers come from Pascal’s triangle. Each number counts the ways to choose which brackets give a b.'
  ]);
  P('math-limits', [
    'A limit asks what value a function gets closer and closer to as the input approaches some point, even if it never actually gets there.',
    'Limits of sums, products and quotients can be found piece by piece. When you get 0/0, cancel or rearrange first to remove the problem.',
    'If a function is trapped between two others that head to the same value, it must head there too. This shows that sin x / x tends to 1.',
    'A function can grow without bound, or level off as the input grows. Continuous means you can draw the graph without lifting your pen.'
  ]);
  P('math-derivatives', [
    'The derivative is the slope of a curve at a single point: the average rate of change over a tiny interval, as that interval shrinks to nothing.',
    'Shortcuts like the power rule, product rule and quotient rule let you find derivatives without working out a limit every time.',
    'For a function inside another function, multiply the outer derivative by the inner derivative. This is the chain rule.',
    'Exponentials, logs and trig functions have their own simple derivatives. When x and y are mixed in one equation, differentiate both sides and use the chain rule on y.'
  ]);
  P('math-applications', [
    'A positive derivative means the function is rising, negative means falling. Where the derivative is zero, the graph may turn at a peak or a valley.',
    'To find the best value (largest or smallest), write the quantity as a function of one variable, set its derivative to zero, and check the ends.',
    'When two quantities are linked and both change in time, differentiate the link with respect to time to connect their rates.',
    'Near a point, a curve is close to its tangent line, which gives quick approximations. Newton’s method uses tangent lines to home in on roots.'
  ]);
  P('math-integrals', [
    'The area under a curve can be estimated with thin rectangles. Making them thinner and thinner gives the exact area, called the integral.',
    'An antiderivative is a function whose derivative is the one you started with. It is differentiation run backwards, plus any constant.',
    'To find an exact area, find an antiderivative and subtract its values at the two ends. Integration and differentiation undo each other.',
    'Integrals add up small pieces of anything: distance from speed, total from a rate, average values and more.'
  ]);
  P('math-techniques', [
    'Substitution is the chain rule backwards: spot an inner function whose derivative also appears, and rename it to simplify the integral.',
    'Integration by parts is the product rule backwards. It swaps one integral for an easier one by differentiating one factor and integrating the other.',
    'Break a fraction into simpler fractions you already know how to integrate. Trig identities turn powers of sine and cosine into easier forms.',
    'Volumes of round solids come from adding up thin discs or shells. Curve lengths come from adding up tiny straight segments.'
  ]);
  P('math-series', [
    'A series is an infinite sum. A geometric series with ratio between −1 and 1 adds up to a finite number.',
    'Tests compare a series with ones you know to decide whether it settles to a finite total. Terms shrinking to zero is needed but not enough.',
    'A Taylor polynomial copies a function’s value and slopes at one point. More terms give a better match nearby.',
    'Many functions equal an infinite power series. Series let you calculate values, estimate errors and solve equations.'
  ]);
  P('math-odes', [
    'A differential equation tells you how something changes, rather than what it is. Solving it means finding the function that changes that way.',
    'If you can put all the y’s on one side and the x’s on the other, integrate both sides. Linear equations can be solved with an integrating factor.',
    'Equations involving the second derivative describe springs and circuits. Their solutions oscillate, decay or both, depending on the damping.',
    'When an equation is too hard to solve exactly, take many small steps along the slope it gives. That is Euler’s method.'
  ]);
  P('math-multivar', [
    'A function of two inputs is like a landscape. Contour lines join points at the same height.',
    'A partial derivative is the slope when you move in one direction only, keeping the other input fixed.',
    'The gradient is an arrow pointing uphill in the steepest direction. Its length tells you how steep the slope is.',
    'To find the best point along a constraint, look where the gradient of the function lines up with the gradient of the constraint. Double integrals add up volume over an area.'
  ]);
  P('math-vectorcalc', [
    'A parametric curve gives x and y as functions of time, like tracing the path of a moving point.',
    'A vector field puts an arrow at every point, like wind on a map. A line integral adds up how much the field pushes along a path.',
    'Divergence measures how much a field spreads out from a point; curl measures how much it swirls around it.',
    'Big theorems link what happens inside a region to what happens on its edge: total spreading inside equals flow out through the boundary.'
  ]);
  P('math-complex', [
    'Mathematicians invented i, a number whose square is −1. Numbers of the form a + bi then let every polynomial equation have solutions.',
    'A complex number is a point on a plane. Its size is the distance from zero and its angle is its direction; multiplying multiplies sizes and adds angles.',
    'Euler’s formula links exponentials to rotation: e to the power iθ is the point at angle θ on the unit circle.',
    'The solutions of zⁿ = 1 sit evenly spaced around the unit circle, like the corners of a regular polygon.'
  ]);
  P('math-linear', [
    'Vectors are arrows you can add and scale. The dot product measures how much two arrows point the same way; the cross product gives a perpendicular arrow.',
    'A matrix is a machine that moves every point of the plane: stretching, rotating, reflecting or shearing. Its columns show where the basic arrows land.',
    'The determinant measures how much a matrix scales area. If it is zero the matrix squashes space flat and cannot be undone.',
    'An eigenvector is a direction the matrix only stretches, without turning. The stretch factor is the eigenvalue.'
  ]);
  P('math-stats', [
    'Conditional probability is the chance of something given that something else happened. Bayes’ rule flips it round to update beliefs with new evidence.',
    'A random variable is a number that depends on chance. Its mean is the long-run average and its variance measures the spread.',
    'Many measurements follow the bell-shaped normal curve. Averages of many random things tend towards that shape, whatever they started as.',
    'From a sample you can estimate a true value with a margin of error. Correlation measures how closely two variables move together in a straight line.'
  ]);
  P('math-proof', [
    'A proof is a chain of steps where each follows from the last. A direct proof starts with what you know and walks to what you want.',
    'To prove something by contradiction, assume it is false and show this leads to something impossible.',
    'Induction proves a statement for every whole number: show it for the first, then show each case implies the next, like falling dominoes.',
    'Clever tricks solve many puzzles: if more pigeons than holes, two share; quantities that never change rule out some outcomes; and the biggest or smallest case often reveals the key.'
  ]);
  P('math-numbertheory', [
    'Every whole number above 1 breaks into primes in exactly one way. Primes are the building blocks of all whole numbers.',
    'The greatest common divisor is the largest number dividing both. Euclid’s algorithm finds it fast by repeated remainders.',
    'Modular arithmetic only keeps the remainder, like hours on a clock. You can add and multiply remainders directly.',
    'Powers of numbers repeat in patterns modulo a prime (Fermat). Remainders for several coprime divisors pin down a number uniquely (Chinese remainder theorem).'
  ]);
  P('math-combinatorics', [
    'If you make several choices one after another, multiply the number of options for each. That counts all the possible outcomes.',
    'Choosing a group where order does not matter is counted by binomial coefficients, which also build Pascal’s triangle.',
    'To count things in overlapping groups, add the groups, subtract the overlaps, add back the triple overlaps. Stars and bars counts ways to share identical items.',
    'Probability is favourable outcomes over all outcomes when each is equally likely. Expected value is the long-run average, and it adds up nicely.'
  ]);
  P('math-recurrences', [
    'Many counting problems are easier if you link each case to smaller ones. That link is a recurrence.',
    'Recurrences like Fibonacci can be solved exactly by guessing powers and solving a quadratic for the base.',
    'Catalan numbers count balanced brackets, mountain paths and triangulations. They all follow the same recurrence.',
    'A generating function packs a whole sequence into one expression. Algebra on that expression solves counting problems.'
  ]);
  P('math-inequalities', [
    'A square is never negative. Many inequalities are proved just by writing one side minus the other as a sum of squares.',
    'The average of some positive numbers is at least their geometric mean, with equality only when all are equal (AM–GM).',
    'Cauchy–Schwarz bounds a sum of products by the sizes of the two lists. It is the dot-product rule in disguise.',
    'Pair big with big to make a sum of products largest (rearrangement). Curved functions satisfy Jensen’s inequality. Always test equal values first to guess where equality holds.'
  ]);
  P('math-algebra', [
    'Dividing a polynomial by x − a leaves the remainder p(a). So a is a root exactly when x − a is a factor.',
    'The sum and product of a polynomial’s roots can be read straight from its coefficients, without finding the roots (Vieta).',
    'Expressions that stay the same when you swap variables can be rewritten using sums and products. This often makes them much easier.',
    'A functional equation asks which functions obey a rule. Plug in clever values like 0, 1 or x = y to pin the function down.'
  ]);
  P('math-geometry', [
    'Angles round a point add up to 360°, in a triangle to 180°. Angles standing on the same arc of a circle are equal.',
    'Similar triangles have the same shape, so their sides are in proportion. Pythagoras links the sides of a right triangle.',
    'For any point and circle, multiplying the two distances along any line through the point to the circle always gives the same value.',
    'The sine and cosine rules solve any triangle. Special points like the centroid and circumcentre come from lines through the triangle.'
  ]);
  P('math-graphs', [
    'A graph is dots (vertices) joined by lines (edges). Adding up all the degrees gives twice the number of edges.',
    'You can draw a graph in one stroke, using every edge once, only if at most two vertices have an odd number of edges.',
    'A tree is a connected graph with no loops; it has one fewer edge than vertices. Planar graphs can be drawn without crossings and obey Euler’s formula.',
    'Colouring gives neighbouring vertices different colours. Ramsey theory says big enough graphs always contain some orderly pattern.'
  ]);
  P('math-games', [
    'A position is losing if every move leads to a winning one for your opponent, and winning if some move leads to a losing one. Work backwards from the end.',
    'In Nim, combine the heap sizes with XOR. If the result is zero the player to move loses; otherwise there is a winning move.',
    'Copying your opponent’s moves can guarantee a win in symmetric games. Strategy stealing shows the first player cannot be losing in some games.',
    'Look for a quantity that never changes or only moves one way. It can prove a target is unreachable or that a game must end.'
  ]);
  P('math-diophantine', [
    'ax + by = c has whole-number solutions exactly when the greatest common divisor of a and b divides c. Then there are infinitely many.',
    'All right triangles with whole-number sides come from one simple formula using two whole numbers.',
    'Factoring both sides or looking at remainders (for example modulo 3 or 4) quickly shows when an equation has no solutions.',
    'If a solution would always produce a smaller one, there can be none at all (infinite descent). Pell’s equation has endless solutions built from the smallest.'
  ]);
})();
