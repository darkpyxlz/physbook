/* Scibook skill tree: chapters unlock Duolingo-style once their prerequisites are passed.
   A chapter is "passed" when all its concept checks and at least two core problems are solved.
   A locked chapter can also be opened by testing out: 4 of 5 randomised drills from its missing prerequisites. */
(function () {
  'use strict';
  const PB = window.PB;
  PB.PREREQS = {
    // Mathematics (a self-contained track: the other sciences do not require it)
    'math-limits': ['math-functions'], 'math-derivatives': ['math-limits'], 'math-applications': ['math-derivatives'], 'math-integrals': ['math-derivatives'],
    'math-techniques': ['math-integrals'], 'math-series': ['math-techniques'], 'math-odes': ['math-techniques'], 'math-multivar': ['math-applications', 'math-integrals'],
    'math-complex': ['math-functions'], 'math-proof': ['math-functions'], 'math-numbertheory': ['math-proof'], 'math-combinatorics': ['math-proof'],
    'math-inequalities': ['math-proof'], 'math-algebra': ['math-proof', 'math-complex'], 'math-geometry': ['math-proof'],
    'math-sequences': ['math-functions'], 'math-vectorcalc': ['math-multivar'], 'math-linear': ['math-functions'], 'math-stats': ['math-integrals', 'math-combinatorics'],
    'math-recurrences': ['math-combinatorics', 'math-sequences'], 'math-graphs': ['math-proof'], 'math-games': ['math-proof'], 'math-diophantine': ['math-numbertheory'],
    // Physics
    'kinematics': ['toolkit'], 'newton': ['kinematics'], 'energy': ['newton'], 'momentum': ['newton'], 'rotation': ['energy', 'momentum'],
    'gravitation': ['energy'], 'oscillations': ['energy'], 'fluids': ['newton'], 'waves': ['oscillations'], 'thermal': ['energy'],
    'thermodynamics': ['thermal'], 'electrostatics': ['energy'], 'circuits': ['electrostatics'], 'magnetism': ['circuits'], 'induction': ['magnetism'],
    'geometric-optics': ['toolkit'], 'wave-optics': ['waves', 'geometric-optics'], 'relativity': ['momentum'], 'quantum': ['wave-optics', 'electrostatics'],
    'nuclear': ['quantum'], 'analytical': ['rotation', 'oscillations'], 'astrophysics': ['gravitation', 'thermal'], 'experimental': ['toolkit'],
    // Chemistry (physics foundations first)
    'chem-moles': ['toolkit'], 'chem-solutions': ['chem-moles'], 'chem-atom': ['chem-moles', 'electrostatics'], 'chem-periodic': ['chem-atom'],
    'chem-bonding': ['chem-periodic'], 'chem-shapes': ['chem-bonding'], 'chem-gases': ['chem-moles', 'thermal'], 'chem-thermo': ['chem-bonding', 'thermal'],
    'chem-gibbs': ['chem-thermo', 'thermodynamics'], 'chem-equilibrium': ['chem-gibbs', 'chem-solutions'], 'chem-acids': ['chem-equilibrium'],
    'chem-titration': ['chem-acids'], 'chem-kinetics': ['chem-solutions'], 'chem-electro': ['chem-gibbs', 'circuits'], 'chem-maingroup': ['chem-bonding'],
    'chem-transition': ['chem-maingroup', 'chem-shapes'], 'chem-organic': ['chem-shapes'], 'chem-mechanisms': ['chem-organic', 'chem-kinetics'],
    'chem-synthesis': ['chem-mechanisms'], 'chem-spectro': ['chem-organic', 'chem-atom'],
    'chem-solid': ['chem-bonding'], 'chem-sblock': ['chem-maingroup'], 'chem-pblock': ['chem-maingroup', 'chem-shapes'], 'chem-chalcogens': ['chem-pblock', 'chem-acids'],
    'chem-coord': ['chem-transition'], 'chem-redox': ['chem-electro', 'chem-coord'],
    // Biology (chemistry foundations first)
    'bio-molecules': ['chem-bonding'], 'bio-cells': ['bio-molecules'], 'bio-membranes': ['bio-cells', 'chem-solutions'], 'bio-enzymes': ['bio-molecules', 'chem-kinetics'],
    'bio-respiration': ['bio-enzymes', 'chem-thermo'], 'bio-photosynthesis': ['bio-respiration'], 'bio-cellcycle': ['bio-cells'], 'bio-dna': ['bio-molecules', 'bio-cellcycle'],
    'bio-expression': ['bio-dna'], 'bio-mendel': ['bio-cellcycle'], 'bio-linkage': ['bio-mendel'], 'bio-popgen': ['bio-mendel'], 'bio-circulation': ['bio-respiration'],
    'bio-nerves': ['bio-membranes'], 'bio-homeostasis': ['bio-membranes', 'bio-enzymes'], 'bio-immunity': ['bio-expression'], 'bio-plants': ['bio-photosynthesis', 'bio-membranes'],
    'bio-evolution': ['bio-popgen', 'bio-dna'], 'bio-populations': ['bio-cells'], 'bio-ecosystems': ['bio-populations', 'bio-photosynthesis'],
    'bio-signalling': ['bio-membranes', 'bio-enzymes'], 'bio-microbes': ['bio-cells', 'bio-expression'], 'bio-plantdiv': ['bio-microbes'], 'bio-animaldiv': ['bio-plantdiv'],
    'bio-digestion': ['bio-enzymes'], 'bio-reproduction': ['bio-homeostasis', 'bio-cellcycle'], 'bio-behaviour': ['bio-nerves', 'bio-evolution'], 'bio-plantgrowth': ['bio-plants'],
    // Astronomy (physics foundations first)
    'astro-sphere': ['toolkit'], 'astro-time': ['astro-sphere'], 'astro-moon': ['astro-time'], 'astro-telescopes': ['astro-sphere', 'geometric-optics'],
    'astro-kepler': ['astro-sphere', 'gravitation'], 'astro-planets': ['astro-kepler', 'thermal'], 'astro-smallbodies': ['astro-kepler'], 'astro-exoplanets': ['astro-planets', 'astro-telescopes'],
    'astro-magnitudes': ['astro-telescopes'], 'astro-spectra': ['astro-magnitudes', 'chem-atom'], 'astro-hr': ['astro-spectra'], 'astro-binaries': ['astro-hr', 'astro-kepler'],
    'astro-evolution': ['astro-hr'], 'astro-milkyway': ['astro-evolution'], 'astro-galaxies': ['astro-milkyway'], 'astro-cosmology': ['astro-galaxies', 'relativity'],
    // Computing (its own starting point: the command line needs nothing before it)
    'cs-data': ['cs-shell'], 'cs-internet': ['cs-data'], 'cs-web': ['cs-internet'],
    'py-basics': ['cs-shell'], 'py-control': ['py-basics'], 'py-functions': ['py-control'], 'py-objects': ['py-functions'],
    'js-basics': ['py-control'], 'js-dom': ['js-basics', 'cs-web'], 'js-async': ['js-dom'],
    'cpp-basics': ['py-control'], 'cpp-memory': ['cpp-basics', 'cs-data'], 'cpp-stl': ['cpp-basics'],
    'cp-complexity': ['py-functions'], 'cp-sorting': ['cp-complexity'], 'cp-greedy': ['cp-sorting'], 'cp-dp': ['cp-greedy'],
    'cp-graphs': ['cp-sorting'], 'cp-structures': ['cp-graphs'], 'cp-maths': ['cp-complexity']
  };
  PB.prereqsOf = function (ch) { return (PB.PREREQS[ch.id] || []).map(PB.chapter).filter(Boolean); };
  PB.isPassed = function (ch) {
    if (!ch) return true;
    const st = PB.chapterStats(ch);
    return st.concept.solved >= st.concept.total && st.core.solved >= Math.min(2, st.core.total);
  };
  PB.passNeeds = function (ch) {
    const st = PB.chapterStats(ch);
    const out = [];
    if (st.concept.solved < st.concept.total) out.push((st.concept.total - st.concept.solved) + ' concept check' + (st.concept.total - st.concept.solved > 1 ? 's' : ''));
    const core = Math.min(2, st.core.total) - st.core.solved;
    if (core > 0) out.push(core + ' core problem' + (core > 1 ? 's' : ''));
    return out;
  };
  PB.isUnlocked = function (ch) {
    if (!ch) return true;
    const S = PB.S;
    if (S.freeRoam || (S.unlocked && S.unlocked[ch.id])) return true;
    return PB.prereqsOf(ch).every(PB.isPassed);
  };
  PB.missingPrereqs = function (ch) { return PB.prereqsOf(ch).filter(function (c) { return !PB.isPassed(c); }); };
  PB.unlockedCount = function () { return PB.chapters.filter(PB.isUnlocked).length; };

  // Announce chapters that a solve has just unlocked.
  let before = null;
  // Ignore free roam here: only unlocks you earned should be announced (and rewarded).
  function earned(c) { const S = PB.S; return !!(S.unlocked && S.unlocked[c.id]) || PB.prereqsOf(c).every(PB.isPassed); }
  function snapshot() { const m = {}; PB.chapters.forEach(function (c) { m[c.id] = earned(c); }); return m; }
  PB.on(function (ev) {
    if (ev.type !== 'xp') return;
    if (!before) { before = snapshot(); return; }
    const now = snapshot();
    PB.chapters.forEach(function (c) { if (now[c.id] && !before[c.id]) PB.emit({ type: 'unlock', chapter: c }); });
    before = now;
  });
  document.addEventListener('DOMContentLoaded', function () { before = snapshot(); });

  /* ---------- Lock screen with test-out ---------- */
  function drillOk(inst, val) {
    const x = PB.parseNumber(val);
    if (x === null || !isFinite(x)) return null;
    const tol = inst.tol != null ? inst.tol : 0.02;
    if (inst.answer === 0) return Math.abs(x) <= (inst.atol || 1e-6);
    return Math.abs(x - inst.answer) <= tol * Math.abs(inst.answer) || (inst.atol != null && Math.abs(x - inst.answer) <= inst.atol);
  }
  PB.drillOk = drillOk;
  PB.lockView = function (ch) {
    const h = PB.h, sub = PB.subject(ch.subject);
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('header', { class: 'ch-head' }, [
      h('div', { class: 'eyebrow', html: '<a href="#' + ch.subject + '">' + sub.name + '</a> · Chapter ' + ch.num + ' · ' + ch.part }),
      h('h1', { text: '🔒 ' + ch.title }),
      h('p', { class: 'lede', html: ch.subtitle })
    ]));
    const box = h('section', { class: 'lock-box' });
    box.appendChild(h('h2', { text: 'Locked: pass these first' }));
    box.appendChild(h('p', { text: 'A chapter is passed when all its concept checks and at least two core problems are solved. Each one opens the way to what builds on it.' }));
    const list = h('div', { class: 'lock-list' });
    PB.prereqsOf(ch).forEach(function (p) {
      const ok = PB.isPassed(p), open = PB.isUnlocked(p);
      list.appendChild(h('a', { class: 'lock-item subj-' + p.subject + (ok ? ' ok' : ''), href: '#ch-' + p.id + (open ? '--problems' : '') }, [
        h('span', { class: 'subj-badge', text: PB.subject(p.subject).mark }),
        h('span', { class: 'lock-name' }, [h('b', { text: p.title }), h('small', { text: ok ? 'Passed ✓' : (open ? 'Still needed: ' + PB.passNeeds(p).join(' and ') : 'Also locked: unlock its own prerequisites first') })]),
        h('span', { class: 'lock-go', text: ok ? '✓' : '→' })
      ]));
    });
    box.appendChild(list);
    const missing = PB.missingPrereqs(ch).filter(function (c) { return PB.drills[c.id]; });
    if (missing.length) {
      const quiz = h('div', { class: 'testout' });
      quiz.appendChild(h('h3', { text: 'Already know this? Test out' }));
      quiz.appendChild(h('p', { text: 'Answer 5 randomised questions from ' + missing.map(function (c) { return c.title; }).join(', ') + '. Get 4 right and this chapter opens for good.' }));
      quiz.appendChild(h('button', { class: 'btn primary', type: 'button', text: 'Start the test', onclick: function () { startTest(ch, missing, quiz); } }));
      box.appendChild(quiz);
    }
    box.appendChild(h('p', { class: 'input-hint', html: 'Prefer to roam freely? Turn off the skill tree on the <a href="#profile">Level &amp; badges</a> page.' }));
    wrap.appendChild(box);
    return wrap;
  };
  function startTest(ch, pool, root) {
    const h = PB.h;
    const qs = [];
    for (let i = 0; i < 5; i++) {
      const c = pool[i % pool.length], ds = PB.drills[c.id], d = ds[Math.floor(Math.random() * ds.length)];
      const inst = d.gen(PB.rng((Math.random() * 4294967296) >>> 0)); inst.title = d.title; inst.from = c.title; qs.push(inst);
    }
    let i = 0, right = 0;
    function show() {
      root.innerHTML = '';
      if (i >= 5) {
        const pass = right >= 4;
        if (pass) { PB.S.unlocked = PB.S.unlocked || {}; PB.S.unlocked[ch.id] = Date.now(); PB.save(); PB.emit({ type: 'unlock', chapter: ch }); }
        root.appendChild(h('h3', { text: pass ? 'Passed: ' + right + '/5. The chapter is open.' : right + '/5. Not quite: you need 4.' }));
        root.appendChild(h('button', { class: 'btn primary', type: 'button', text: pass ? 'Open the chapter' : 'Try again', onclick: function () { if (pass) PB.route(); else startTest(ch, pool, root); } }));
        return;
      }
      const q = qs[i];
      root.appendChild(h('div', { class: 'eyebrow', text: 'Question ' + (i + 1) + ' of 5 · ' + q.from + ' · ' + q.title + ' · ' + right + ' right so far' }));
      const qel = h('div', { class: 'prob-q', html: q.q });
      root.appendChild(qel);
      const input = h('input', { class: 'num-input', type: 'text', placeholder: 'Your answer' + (q.unit ? ' (' + q.unit + ')' : ''), autocomplete: 'off' });
      const fb = h('div', { class: 'feedback' });
      const go = function () {
        const ok = drillOk(q, input.value);
        if (ok === null) { fb.textContent = 'Enter a number.'; return; }
        if (ok) right++;
        fb.className = 'feedback ' + (ok ? 'ok' : 'no');
        fb.innerHTML = ok ? 'Correct.' : 'Not quite. ' + (q.solution || '');
        PB.typeset(fb);
        input.readOnly = true; btn.textContent = 'Next'; btn.onclick = function () { i++; show(); };
      };
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { if (input.readOnly) { i++; show(); } else go(); } });
      const btn = h('button', { class: 'btn primary', type: 'button', text: 'Check', onclick: go });
      root.appendChild(h('div', { class: 'answer-row' }, [input, btn]));
      root.appendChild(fb);
      PB.typeset(root);
      setTimeout(function () { input.focus(); }, 30);
    }
    show();
  }

  /* ---------- Skill tree view ---------- */
  PB.views = PB.views || {};
  PB.views.tree = function () {
    const h = PB.h;
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: PB.unlockedCount() + ' of ' + PB.chapters.length + ' chapters open' }));
    wrap.appendChild(h('h1', { text: 'Skill tree', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every chapter and what it builds on. Physics foundations open chemistry and astronomy; chemistry opens biology; computing starts from the command line. Pass a chapter (all concept checks plus two core problems) to light up the paths that leave it.' }));
    PB.SUBJECTS.forEach(function (sub) {
      wrap.appendChild(h('h2', { class: 'formula-subject', text: sub.name }));
      sub.parts.forEach(function (part) {
        const chs = PB.chaptersOf(sub.id).filter(function (c) { return c.part === part; });
        if (!chs.length) return;
        wrap.appendChild(h('div', { class: 'part-label', text: part }));
        const row = h('div', { class: 'tree-row' });
        chs.forEach(function (c) {
          const open = PB.isUnlocked(c), passed = PB.isPassed(c);
          const pre = PB.prereqsOf(c);
          row.appendChild(h('a', { class: 'tree-node subj-' + c.subject + (passed ? ' passed' : open ? ' open' : ' locked'), href: '#ch-' + c.id }, [
            h('span', { class: 'tree-ico', text: passed ? '★' : open ? String(c.num) : '🔒' }),
            h('b', { text: c.title }),
            h('small', { text: pre.length ? 'needs ' + pre.map(function (p) { return (p.subject !== c.subject ? PB.subject(p.subject).mark + ' ' : '') + p.title; }).join(' + ') : 'starting point' })
          ]));
        });
        wrap.appendChild(row);
      });
    });
    PB.setView([wrap], 'tree');
    window.scrollTo(0, 0);
  };
  const prevExtras = PB.profileExtras;
  PB.profileExtras = function (wrap) {
    if (prevExtras) prevExtras(wrap);
    const h = PB.h;
    const box = h('section', { class: 'lock-box', style: 'margin-top:24px' });
    box.appendChild(h('h2', { text: 'Skill tree' }));
    box.appendChild(h('p', { text: 'With the skill tree on, chapters open as you pass their prerequisites (or test out of them). Turn it off to open every chapter at once. Progress is kept either way.' }));
    const lab = h('label', { class: 'check-row' });
    const inp = h('input', { type: 'checkbox' });
    inp.checked = !PB.S.freeRoam;
    inp.addEventListener('change', function () { PB.S.freeRoam = !inp.checked; PB.save(); PB.route(); });
    lab.append(inp, document.createTextNode(' Use the skill tree (' + PB.unlockedCount() + ' of ' + PB.chapters.length + ' chapters open)'));
    box.appendChild(lab);
    wrap.appendChild(box);
  };
})();
