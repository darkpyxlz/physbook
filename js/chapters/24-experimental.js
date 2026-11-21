(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'experimental', num: 24, part: 'Olympiad Extensions',
    title: 'Experimental Physics and Data Analysis',
    subtitle: R`Half of an IPhO and all of an SYPT presentation is experiment. Uncertainties, error propagation, linearised graphs, least-squares fits and how to design and report a measurement.`,
    goals: ['Distinguish random and systematic errors', 'Propagate uncertainties through formulas', 'Linearise data to extract parameters', 'Fit straight lines and judge the fit', 'Plan and report an experiment'],
    sections: [
      {
        title: 'Measurements and uncertainty',
        html: R`
<p>No measurement is exact. Every result should be quoted as a best value with an uncertainty, $x = 9.81 \pm 0.04\ \mathrm{m/s^2}$, meaning the true value probably lies within that range.</p>
<ul>
<li><strong>Random errors</strong> scatter results both ways (reaction time, electrical noise). Repeating and averaging reduces them.</li>
<li><strong>Systematic errors</strong> shift every result the same way (a ruler with a worn end, an uncalibrated thermometer). Averaging does not help; you must find and correct them.</li>
</ul>
<p>Precision is about the scatter; accuracy is about closeness to the true value. A tightly grouped set of wrong answers is precise but inaccurate.</p>
<p>For $N$ repeated readings with mean $\bar x$, the spread is the standard deviation $s = \sqrt{\sum(x_i - \bar x)^2/(N-1)}$, and the uncertainty in the mean (the <strong>standard error</strong>) is</p>
<div class="key">$$\sigma_{\bar x} = \frac{s}{\sqrt N}.$$</div>
<p>Quadrupling the number of readings only halves the uncertainty, so beyond a point it is better to improve the method.</p>`
      },
      {
        title: 'Propagating uncertainties',
        html: R`
<p>If a result $f$ is computed from independent measured quantities, their uncertainties combine <em>in quadrature</em>:</p>
<div class="key">$$\sigma_f^2 = \sum_i\left(\frac{\partial f}{\partial x_i}\right)^2\sigma_{x_i}^2.$$</div>
<p>The common special cases:</p>
<div class="table-wrap"><table><thead><tr><th>Result</th><th>Uncertainty</th></tr></thead><tbody>
<tr><td>$f = x \pm y$</td><td>$\sigma_f = \sqrt{\sigma_x^2 + \sigma_y^2}$ (absolute)</td></tr>
<tr><td>$f = xy$ or $x/y$</td><td>$\dfrac{\sigma_f}{f} = \sqrt{\left(\dfrac{\sigma_x}x\right)^2 + \left(\dfrac{\sigma_y}y\right)^2}$ (relative)</td></tr>
<tr><td>$f = x^n$</td><td>$\dfrac{\sigma_f}{f} = |n|\dfrac{\sigma_x}{x}$</td></tr>
</tbody></table></div>
<div class="warn-box"><p>Subtracting two nearly equal numbers is dangerous: the absolute uncertainties add, but the result is small, so its relative uncertainty explodes. Design experiments to measure differences directly where you can.</p></div>
<p>Uncertainty budgets tell you where to spend effort. For a pendulum, $g = 4\pi^2L/T^2$: a 1% error in $T$ costs 2% in $g$, so timing deserves more care than length.</p>`
      },
      {
        title: 'Linearisation and fitting',
        html: R`
<p>The eye judges straight lines well and curves badly, so rearrange the expected law into the form $Y = a + bX$:</p>
<div class="table-wrap"><table><thead><tr><th>Law</th><th>Plot</th><th>Slope gives</th></tr></thead><tbody>
<tr><td>$T = 2\pi\sqrt{L/g}$</td><td>$T^2$ against $L$</td><td>$4\pi^2/g$</td></tr>
<tr><td>$y = Ax^n$</td><td>$\ln y$ against $\ln x$</td><td>$n$</td></tr>
<tr><td>$y = Ae^{-kt}$</td><td>$\ln y$ against $t$</td><td>$-k$</td></tr>
<tr><td>$1/d_o + 1/d_i = 1/f$</td><td>$1/d_i$ against $1/d_o$</td><td>$-1$ (intercept $1/f$)</td></tr>
</tbody></table></div>
<p>The best straight line minimises the sum of squared deviations (<strong>least squares</strong>). For $N$ points with equal uncertainties,</p>
<div class="key">$$b = \frac{N\sum x_iy_i - \sum x_i\sum y_i}{N\sum x_i^2 - \left(\sum x_i\right)^2},\qquad a = \bar y - b\bar x.$$</div>
<p>The intercept is a useful check: a pendulum's $T^2$–$L$ line should pass through the origin. A nonzero intercept reveals a systematic error such as measuring length to the top of the bob instead of its centre.</p>
<p>The reduced chi-squared $\chi^2/\nu = \frac{1}{N-2}\sum\left(\frac{y_i - a - bx_i}{\sigma_i}\right)^2$ should be close to 1. Much larger means the model or the error bars are wrong; much smaller means the error bars are too generous.</p>`
      },
      {
        title: 'Designing and reporting an experiment',
        html: R`
<p>Strong experimental work, in an olympiad or a tournament, follows a pattern:</p>
<ol>
<li><strong>Model first.</strong> Predict how the result should depend on the parameters, using dimensional analysis if nothing else.</li>
<li><strong>Choose what to vary.</strong> Vary one parameter over as wide a range as possible, ideally a factor of 10, keeping the others fixed.</li>
<li><strong>Measure smartly.</strong> Time 20 oscillations rather than one; use the full scale of instruments; take readings in a random order to expose drifts.</li>
<li><strong>Plot as you go.</strong> Outliers and unexpected curvature are far easier to fix during the session than after.</li>
<li><strong>Linearise and fit</strong>, with error bars and uncertainties on slope and intercept.</li>
<li><strong>Compare with the model</strong> and discuss disagreements honestly: which assumption fails, and where?</li>
</ol>
<div class="insight"><p>In SYPT and IYPT, juries reward the comparison between theory and experiment more than either alone. A clean plot of data with error bars over a theoretical curve with no free parameters, plus an explanation of where they part ways, is the strongest slide you can show.</p></div>
<p>Report results with sensible significant figures: the uncertainty to one or two significant figures, and the value to the same decimal place, such as $g = 9.80 \pm 0.05\ \mathrm{m/s^2}$, not $9.8034 \pm 0.0471$.</p>`
      }
    ],
    labs: [
      { sim: 'fitlab', title: 'Measuring g with a pendulum', desc: 'Simulated pendulum data with timing noise, plotted as T² against L with a weighted least-squares fit. The dashed line is the ideal relation.',
        tasks: ['With 6 points and 0.03 s timing noise, what uncertainty do you get on g? Take several new data sets: how often is the true value within your error bar?', 'Increase the number of lengths from 4 to 15. How does the uncertainty on g change?', 'Add a systematic length offset of +2 cm. Does the slope (and so g) change? What about the intercept?', 'Shrink the timing noise. Watch χ²/dof: what happens if you take new data many times?'] }
    ],
    formulas: [
      ['Standard deviation', R`s = \sqrt{\textstyle\sum(x_i - \bar x)^2/(N - 1)}`],
      ['Standard error', R`\sigma_{\bar x} = s/\sqrt N`],
      ['General propagation', R`\sigma_f^2 = \sum(\partial f/\partial x_i)^2\sigma_i^2`],
      ['Sums and differences', R`\sigma_f = \sqrt{\sigma_x^2 + \sigma_y^2}`],
      ['Products and quotients', R`\sigma_f/f = \sqrt{(\sigma_x/x)^2 + (\sigma_y/y)^2}`],
      ['Powers', R`\sigma_f/f = |n|\sigma_x/x`],
      ['Least-squares slope', R`b = \frac{N\sum xy - \sum x\sum y}{N\sum x^2 - (\sum x)^2}`],
      ['Weighted mean', R`\bar x = \frac{\sum x_i/\sigma_i^2}{\sum 1/\sigma_i^2},\ \sigma = \left(\textstyle\sum 1/\sigma_i^2\right)^{-1/2}`],
      ['Reduced chi-squared', R`\chi^2_\nu = \frac{1}{N - 2}\sum\left(\frac{y_i - f(x_i)}{\sigma_i}\right)^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Repeat to improve',
        q: R`<p>Repeating a measurement many times and averaging reduces which kind of error?</p>`,
        options: ['Random errors only', 'Systematic errors only', 'Both random and systematic errors', 'Neither'], answer: 0,
        hints: [R`Does averaging help if every reading is shifted the same way?`],
        solution: R`<p>Averaging reduces random scatter as $1/\sqrt N$. A systematic offset is in every reading and survives any amount of averaging.</p>` },
      { level: 'concept', type: 'mcq', title: 'Finding an exponent',
        q: R`<p>You suspect $y = Ax^n$ with unknown $A$ and $n$. Which plot gives a straight line with slope $n$?</p>`,
        options: [R`$y$ against $x$`, R`$\ln y$ against $x$`, R`$\ln y$ against $\ln x$`, R`$y$ against $\ln x$`], answer: 2,
        hints: [R`Take logs of both sides.`],
        solution: R`<p>$\ln y = \ln A + n\ln x$: a straight line in $\ln x$ with slope $n$ and intercept $\ln A$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Worn ruler',
        q: R`<p>The end of a metre rule is worn away, so every length you measure reads 2 mm too long. This is:</p>`,
        options: ['A random error', 'A systematic error', 'A rounding error', 'Not an error, since the ruler is consistent'], answer: 1,
        hints: [R`Does it push every reading the same way?`],
        solution: R`<p>It shifts every reading by the same amount: a systematic (zero) error. On a graph it shows up in the intercept, not the slope.</p>` },
      { level: 'core', type: 'num', title: 'Standard error',
        q: R`<p>Five timings of a pendulum's period give $2.31$, $2.35$, $2.29$, $2.33$ and $2.32\ \mathrm s$. What is the standard error of the mean?</p>`,
        answer: Math.sqrt(0.002 / 4) / Math.sqrt(5), tol: 0.02, unit: 's',
        hints: [R`Mean $= 2.32\ \mathrm s$. Compute $s$ with $N - 1 = 4$, then divide by $\sqrt5$.`],
        solution: R`<p>Deviations: $-0.01, 0.03, -0.03, 0.01, 0$; their squares sum to $0.0020$. $s = \sqrt{0.0020/4} = 0.0224\ \mathrm s$ and $\sigma_{\bar x} = 0.0224/\sqrt5 = 0.010\ \mathrm s$. Result: $T = 2.32 \pm 0.01\ \mathrm s$.</p>` },
      { level: 'core', type: 'num', title: 'Density of a cube',
        q: R`<p>A metal cube has side $2.00 \pm 0.02\ \mathrm{cm}$ and mass $62.4 \pm 0.1\ \mathrm g$. What is the uncertainty in its density, in $\mathrm{g/cm^3}$?</p>`,
        answer: 7.8 * Math.sqrt(Math.pow(3 * 0.01, 2) + Math.pow(0.1 / 62.4, 2)), tol: 0.03, unit: 'g/cm³',
        hints: [R`$\rho = m/a^3$, so the side's 1% counts three times.`],
        solution: R`<p>$\rho = 62.4/8.00 = 7.80\ \mathrm{g/cm^3}$. Relative uncertainty $= \sqrt{(3\times1\%)^2 + (0.16\%)^2} = 3.0\%$, so $\sigma_\rho = 0.23\ \mathrm{g/cm^3}$. The side measurement dominates completely.</p>` },
      { level: 'core', type: 'num', title: 'g from a pendulum',
        q: R`<p>A pendulum of length $L = 1.000 \pm 0.002\ \mathrm m$ has period $T = 2.006 \pm 0.004\ \mathrm s$. What is the uncertainty in $g = 4\pi^2L/T^2$?</p>`,
        answer: (4 * Math.PI * Math.PI / (2.006 * 2.006)) * Math.sqrt(Math.pow(0.002, 2) + Math.pow(2 * 0.004 / 2.006, 2)), tol: 0.03, unit: 'm/s²',
        hints: [R`Relative uncertainty $= \sqrt{(\sigma_L/L)^2 + (2\sigma_T/T)^2}$.`],
        solution: R`<p>$g = 9.81\ \mathrm{m/s^2}$. Relative: $\sqrt{(0.20\%)^2 + (2\times0.20\%)^2} = 0.45\%$, so $\sigma_g = 0.044\ \mathrm{m/s^2}$ and $g = 9.81 \pm 0.04\ \mathrm{m/s^2}$.</p>` },
      { level: 'core', type: 'num', title: 'Half-life from a semi-log plot',
        q: R`<p>A plot of $\ln(\text{count rate})$ against time is a straight line with slope $-0.35\ \mathrm{s^{-1}}$. What is the half-life?</p>`,
        answer: Math.LN2 / 0.35, tol: 0.01, unit: 's',
        hints: [R`The slope is $-\lambda$.`],
        solution: R`<p>$T_{1/2} = \ln2/\lambda = 0.693/0.35 = 1.98\ \mathrm s$.</p>` },
      { level: 'core', type: 'num', title: 'Reading an exponent',
        q: R`<p>Two points on a power-law relationship $y = Ax^n$ are $(2, 5.66)$ and $(8, 45.25)$. Find $n$.</p>`,
        answer: Math.log(45.25 / 5.66) / Math.log(4), tol: 0.01, unit: '',
        hints: [R`$n = \ln(y_2/y_1)/\ln(x_2/x_1)$.`],
        solution: R`<p>$n = \ln(8.00)/\ln4 = 1.50$. A $3/2$ power law, like Kepler's third law.</p>` },
      { level: 'olympiad', type: 'num', title: 'Combining two results',
        q: R`<p>Two experiments give $g = 9.79 \pm 0.02$ and $g = 9.83 \pm 0.04\ \mathrm{m/s^2}$. What is their weighted mean?</p>`,
        answer: (9.79 / 0.0004 + 9.83 / 0.0016) / (1 / 0.0004 + 1 / 0.0016), tol: 0.0005, unit: 'm/s²',
        hints: [R`Weights are $1/\sigma^2$: 2500 and 625.`],
        solution: R`<p>$\bar g = \dfrac{2500(9.79) + 625(9.83)}{3125} = 9.798\ \mathrm{m/s^2}$, with uncertainty $1/\sqrt{3125} = 0.018$. The more precise measurement counts four times as much.</p>` },
      { level: 'olympiad', type: 'num', title: 'Dangerous difference',
        q: R`<p>Two lengths are measured as $1.523 \pm 0.002\ \mathrm m$ and $1.498 \pm 0.002\ \mathrm m$. What is the percentage uncertainty of their difference?</p>`,
        answer: 100 * Math.sqrt(2) * 0.002 / 0.025, tol: 0.02, unit: '%',
        hints: [R`Absolute uncertainties add in quadrature for a difference.`],
        solution: R`<p>$d = 0.025\ \mathrm m$ with $\sigma = \sqrt{2}(0.002) = 0.0028\ \mathrm m$: an 11% uncertainty, from inputs good to 0.13%. Measure the difference directly instead.</p>` },
      { level: 'olympiad', type: 'num', title: 'Least squares by hand',
        q: R`<p>Fit a straight line by least squares to the points $(1, 2.1)$, $(2, 3.9)$, $(3, 6.2)$, $(4, 7.8)$. What is the slope?</p>`,
        answer: (4 * 59.7 - 10 * 20) / (4 * 30 - 100), tol: 0.005, unit: '',
        hints: [R`$\sum x = 10$, $\sum y = 20$, $\sum xy = 59.7$, $\sum x^2 = 30$.`],
        solution: R`<p>$b = \dfrac{4(59.7) - 10(20)}{4(30) - 10^2} = \dfrac{38.8}{20} = 1.94$, and $a = \bar y - b\bar x = 5 - 1.94(2.5) = 0.15$.</p>` }
    ]
  });
})();
