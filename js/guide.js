/* Scibook guided solving: "Guide me step by step" on every problem.
   Follows Pólya's four phases (understand, plan, carry out, look back). Every step is a small question you
   answer before moving on; feedback explains why. Authored steps (PB.addSteps) are used where they exist;
   otherwise the guide builds checked steps automatically: identify the unit (or rule out a wrong option),
   estimate the size of the answer, then work through the problem's hints one at a time with a
   self-explanation prompt. The guide fades as mastery rises. Guided problems are worth up to 70% of their
   points, and each step answered correctly pays 2 XP. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const CAP = 0.7, STEP_XP = 2;
  const PHASE = { understand: ['🔎', 'Understand'], plan: ['🧭', 'Plan'], estimate: ['📏', 'Estimate'], do: ['✏️', 'Carry out'], check: ['✅', 'Check'], answer: ['🎯', 'Answer'], back: ['🔁', 'Look back'] };

  // Guided problems are capped at 70% of their current value.
  const origAvail = PB.available;
  PB.available = function (p) { const v = origAvail(p); return S().guided && S().guided[p.id] ? Math.max(1, Math.round(v * CAP)) : v; };

  /* ---------- Automatic steps ---------- */
  let unitPool = null;
  const norm = (u) => String(u || '').replace(/<[^>]+>/g, '').replace(/\s+/g, '').toLowerCase();
  function units() { if (!unitPool) { const seen = {}; unitPool = []; PB.allProblems().forEach((q) => { const k = norm(q.unit); if (k && !seen[k]) { seen[k] = 1; unitPool.push(q.unit); } }); } return unitPool; }
  function shuffle(a, seed) { const r = PB.rng(seed); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  const seedOf = (p) => p.id.split('').reduce((a, c) => a * 31 + c.charCodeAt(0) >>> 0, 7);
  function unitStep(p) {
    const good = p.unit, pool = units().filter((u) => norm(u) !== norm(good));
    const pick = shuffle(pool.slice(), seedOf(p)).slice(0, 3);
    const opts = shuffle([good].concat(pick), seedOf(p) + 1);
    return { phase: 'understand', type: 'mcq', q: 'First, what kind of quantity is the answer? Pick its unit.', options: opts, answer: opts.indexOf(good), explain: 'The answer is measured in ' + good + '. Knowing the unit tells you which quantity to aim for and lets you check your working at the end.', auto: true };
  }
  function sizeStep(p) {
    const a = Math.abs(p.answer); if (!(a > 0) || !isFinite(a)) return null;
    const k = Math.floor(Math.log10(a) + 1e-12);
    const fmtP = (e) => (e >= -2 && e <= 4 ? String(+Math.pow(10, e).toPrecision(1)) : '10^' + e);
    const ranges = [[k - 2, k - 1], [k - 1, k], [k, k + 1], [k + 1, k + 2]];
    const rot = seedOf(p) % 3; // the right range is not always in the same place
    const shift = [0, -1, 1][rot];
    const rs = ranges.map((r) => [r[0] + shift, r[1] + shift]);
    let ans = rs.findIndex((r) => r[0] === k);
    if (ans < 0) { rs[0] = [k, k + 1]; ans = 0; }
    const sign = p.answer < 0 ? 'negative, with size ' : '';
    return { phase: 'estimate', type: 'mcq', q: 'Before calculating, estimate. Roughly how big is the answer' + (p.unit ? ' (in ' + p.unit + ')' : '') + '?', options: rs.map((r) => sign + 'between ' + fmtP(r[0]) + ' and ' + fmtP(r[1])), answer: ans, explain: 'The answer is about ' + PB.fmt(p.answer, 2) + (p.unit ? ' ' + p.unit : '') + '. A quick estimate catches slipped powers of ten and wrong units before they cost you.', auto: true };
  }
  function eliminateStep(p) { return { phase: 'understand', type: 'eliminate', q: 'Read every option. Rule out one you are sure is wrong, and say to yourself why.', options: p.options, answer: p.answer, explain: 'Eliminating options forces you to test each one against what you know.', auto: true }; }
  function hintSteps(p) { return (p.hints || []).map((t, i) => ({ phase: i === 0 ? 'plan' : 'do', type: 'reveal', q: t, auto: true })); }
  function plan(p) {
    const st = p.steps || [], m = PB.mastery ? PB.mastery(p.chapter) : null, fade = m != null && m >= 0.65;
    const out = [];
    const auth = (ph) => st.filter((s) => s.phase === ph);
    const u = auth('understand');
    if (u.length) out.push.apply(out, u);
    else if (!fade) out.push(p.type === 'num' ? (p.unit ? unitStep(p) : null) : p.type === 'mcq' ? eliminateStep(p) : null);
    const pl = auth('plan'), dd = auth('do').concat(auth('check'));
    if (pl.length) out.push.apply(out, pl);
    if (p.type === 'num' && !fade) out.push(sizeStep(p));
    if (dd.length) out.push.apply(out, dd);
    if (!pl.length && !dd.length) out.push.apply(out, hintSteps(p));
    return { steps: out.filter(Boolean), fade: fade, authored: st.length > 0 };
  }

  /* ---------- The guide panel ---------- */
  PB.openGuide = function (p, box, refresh) {
    const G = S().guided || (S().guided = {}), XP = S().guideXP || (S().guideXP = {});
    const first = !G[p.id];
    G[p.id] = true; PB.save();
    if (first && refresh) refresh();
    const pl = plan(p);
    box.innerHTML = '';
    const panel = h('div', { class: 'guide' });
    panel.appendChild(h('div', { class: 'guide-head' }, [h('span', { class: 'guide-ico', text: '🧭' }), h('b', { text: 'Guided solution' }), h('small', { text: (pl.fade ? 'You know this chapter well, so the guide is lighter. ' : '') + 'Answer each step to unlock the next. Worth up to 70% of the points, +' + STEP_XP + ' XP per step you get right.' })]));
    const list = h('ol', { class: 'guide-steps' });
    panel.appendChild(list);
    box.appendChild(panel);
    let i = 0;
    const next = () => {
      if (i >= pl.steps.length) { finale(); return; }
      const s = pl.steps[i], idx = i; i++;
      list.appendChild(stepEl(s, idx, next));
    };
    function award(idx) { const k = p.id + ':' + idx; if (XP[k]) return; XP[k] = 1; PB.save(); PB.addXP(STEP_XP, 'Guided step'); PB.emit({ type: 'guidestep', p: p }); }
    function stepEl(s, idx, done) {
      const ph = PHASE[s.phase] || PHASE.do;
      const li = h('li', { class: 'guide-step ' + s.phase });
      li.appendChild(h('div', { class: 'gs-phase', text: ph[0] + ' ' + ph[1] }));
      const qEl = h('div', { class: 'gs-q', html: s.type === 'reveal' ? '<b>Hint:</b> ' + s.q : s.q });
      li.appendChild(qEl);
      const fb = h('div', { class: 'gs-fb' }), act = h('div', { class: 'gs-act' });
      let tries = 0, finished = false;
      const finish = (ok, msg) => {
        if (finished) return; finished = true;
        li.classList.add(ok ? 'ok' : 'shown');
        fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), html: (ok ? '✓ ' : '') + (msg || '') + (s.explain ? ' ' + s.explain : '') }));
        PB.typeset(fb);
        act.innerHTML = '';
        if (ok) award(idx);
        done();
      };
      if (s.type === 'mcq' || s.type === 'eliminate') {
        const row = h('div', { class: 'opts compact' });
        s.options.forEach((o, k) => row.appendChild(h('button', { class: 'opt', type: 'button', onclick: (e) => {
          if (finished) return;
          const ok = s.type === 'eliminate' ? k !== s.answer : k === s.answer;
          if (ok) { e.currentTarget.classList.add(s.type === 'eliminate' ? 'wrong' : 'right'); finish(true, s.type === 'eliminate' ? 'Good: that option is indeed wrong.' : 'Right.'); return; }
          tries++; e.currentTarget.classList.add('wrong-try');
          if (s.type === 'eliminate') { finish(false, 'Careful: that one is actually correct! Keep it in mind as a strong candidate.'); return; }
          fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: tries < 2 ? 'Not quite. Think again: which fits best?' : 'Not quite.' }));
          if (tries >= 2) { row.children[s.answer].classList.add('right'); finish(false, 'The right choice is ' + String.fromCharCode(65 + s.answer) + '.'); }
        } }, [h('span', { class: 'key-l', text: String.fromCharCode(65 + k) }), h('span', { html: o })])));
        li.appendChild(row);
      } else if (s.type === 'num') {
        const inp = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'Your value', 'aria-label': 'Step answer' });
        const go = () => {
          if (finished) return;
          const x = PB.parseNumber(inp.value);
          if (x === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number.' })); return; }
          const tol = s.tol != null ? s.tol : 0.03;
          const ok = s.answer === 0 ? Math.abs(x) < 1e-9 : Math.abs(x - s.answer) <= tol * Math.abs(s.answer);
          if (ok) { finish(true, 'Right: ' + PB.fmt(s.answer, 4) + (s.unit ? ' ' + s.unit : '') + '.'); return; }
          tries++;
          if (tries >= 2) { finish(false, 'It should be ' + PB.fmt(s.answer, 4) + (s.unit ? ' ' + s.unit : '') + '.'); return; }
          fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Not yet. Check units and powers of ten, then try again.' }));
        };
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
        li.appendChild(h('div', { class: 'num-row' }, [inp, s.unit ? h('span', { class: 'unit', html: s.unit }) : null, h('button', { class: 'btn small primary', type: 'button', text: 'Check step', onclick: go })]));
        act.appendChild(h('button', { class: 'btn small ghost', type: 'button', text: 'Show me this step', onclick: () => finish(false, 'It is ' + PB.fmt(s.answer, 4) + (s.unit ? ' ' + s.unit : '') + '.') }));
        setTimeout(() => inp.focus({ preventScroll: true }), 30);
      } else if (s.type === 'reveal') {
        li.appendChild(h('div', { class: 'gs-prompt', text: 'Before you read on: explain to yourself how this helps. Can you take the next step yourself?' }));
        act.appendChild(h('button', { class: 'btn small primary', type: 'button', text: 'Yes, I see it', onclick: () => finish(true, 'Great: try writing that step down now.') }));
        act.appendChild(h('button', { class: 'btn small', type: 'button', text: 'Not yet', onclick: () => finish(false, 'That’s fine. Write down the relevant formula with every symbol, put in the numbers with their units, then read the next hint.') }));
      }
      li.append(fb, act);
      PB.typeset(li);
      return li;
    }
    function finale() {
      const li = h('li', { class: 'guide-step answer' }, [h('div', { class: 'gs-phase', text: PHASE.answer[0] + ' ' + PHASE.answer[1] }), h('div', { class: 'gs-q', text: p.type === 'num' ? 'Now put it together: enter your final answer above and press Submit. Before you do, check the unit and that the size matches your estimate.' : 'Now choose your answer above and press Submit.' })]);
      list.appendChild(li);
      const input = box.closest('.prob') && box.closest('.prob').querySelector('.num-row input');
      if (input) setTimeout(() => input.focus({ preventScroll: true }), 50);
    }
    next();
  };
  // After a guided problem is solved, invite a short reflection (look back).
  PB.on(function (ev) {
    if (ev.type !== 'answer' || !ev.ok || !S().guided || !S().guided[ev.p.id]) return;
    if (S().solved[ev.p.id]) { S().solved[ev.p.id].clean = false; S().solved[ev.p.id].guided = true; PB.save(); }
    setTimeout(() => {
      document.querySelectorAll('#prob-' + ev.p.id + ' .guide-steps, #inl-' + ev.p.id + ' .guide-steps').forEach((list) => {
        if (list.querySelector('.guide-step.back')) return;
        const li = h('li', { class: 'guide-step back' }, [h('div', { class: 'gs-phase', text: PHASE.back[0] + ' ' + PHASE.back[1] }), h('div', { class: 'gs-q', text: 'Solved! Read the worked solution below and ask: what was the key idea, and could you do a similar problem without the guide?' })]);
        li.appendChild(h('div', { class: 'gs-act' }, [h('a', { class: 'btn small primary', href: '#adapt-' + ev.p.chapter, text: 'Try a similar one unguided' })]));
        list.appendChild(li);
      });
    }, 60);
  });
  PB.guideStepsCount = function () { return Object.keys(S().guideXP || {}).length; };
})();
