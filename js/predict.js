/* Scibook prediction bets. At the top of each chapter's Lab tab: commit to a prediction about the first lab
   and stake coins on it, then run the experiment. The answer unlocks only after you have used the lab.
   Right pays back double the stake; wrong loses it but shows exactly where intuition went off.
   Predicting before observing is a well-supported way to expose and fix misconceptions. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  PB.PREDICT = PB.PREDICT || {};
  PB.addPredictions = function (obj) { Object.assign(PB.PREDICT, obj); };
  function P() { const s = S(); s.predict = s.predict || {}; return s.predict; }
  const STAKES = [0, 10, 25, 50];

  PB.predictStats = function () {
    const p = P(), done = Object.keys(p).filter((k) => p[k].done);
    return { made: done.length, right: done.filter((k) => p[k].ok).length, won: done.reduce((a, k) => a + (p[k].ok ? p[k].stake : -p[k].stake), 0) };
  };

  PB.labTabExtras = function (ch, content) {
    const spec = PB.PREDICT[ch.id];
    if (!spec) return;
    // Show the options in a fixed shuffled order per chapter (the data lists the right answer first).
    let seed = 0; for (const c of ch.id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
    const order = spec.o.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { seed = (seed * 1103515245 + 12345) >>> 0; const j = seed % (i + 1); const t = order[i]; order[i] = order[j]; order[j] = t; }
    const L = (i) => String.fromCharCode(65 + order.indexOf(i));
    const box = h('section', { class: 'predict' });
    content.insertBefore(box, content.firstChild);
    const lab = () => content.querySelector('.lab:not(.figure)');
    function draw() {
      const s = P()[ch.id];
      box.innerHTML = '';
      box.appendChild(h('div', { class: 'predict-head' }, [h('span', { class: 'predict-ico', text: '🎯' }), h('div', {}, [h('div', { class: 'eyebrow', text: 'Predict, then test' + (s && s.done ? '' : ' · stake coins on it') }), h('h3', { html: spec.q })])]));
      if (!s) {
        let pick = -1, stake = 10;
        const opts = h('div', { class: 'predict-opts' });
        order.forEach((i, k) => opts.appendChild(h('button', { class: 'opt', type: 'button', html: '<span class="opt-key">' + String.fromCharCode(65 + k) + '</span> ' + spec.o[i], onclick: (e) => { pick = i; opts.querySelectorAll('.opt').forEach((b) => b.classList.remove('sel')); e.currentTarget.classList.add('sel'); lock.disabled = false; } })));
        const stakes = h('div', { class: 'predict-stakes' }, [h('small', { text: 'Stake: ' })]);
        STAKES.forEach((v) => stakes.appendChild(h('button', { class: 'tag-chip' + (v === stake ? ' on' : ''), type: 'button', disabled: v > PB.wallet.coins() ? 'disabled' : null, text: v ? '◉ ' + v : 'Just for fun', onclick: (e) => { stake = v; stakes.querySelectorAll('.tag-chip').forEach((b) => b.classList.remove('on')); e.target.classList.add('on'); } })));
        if (PB.wallet.coins() < 10) stake = 0;
        const lock = h('button', { class: 'btn primary', type: 'button', disabled: 'disabled', text: 'Lock in my prediction', onclick: () => {
          if (pick < 0) return;
          if (stake && !PB.wallet.spend('coins', stake)) stake = 0;
          P()[ch.id] = { pick: pick, stake: stake, t: Date.now(), used: 0 }; PB.save(); draw();
        } });
        box.append(opts, stakes, h('div', { class: 'hero-cta' }, [lock, h('small', { class: 'predict-note', text: 'Right pays back double your stake. You have ◉ ' + PB.wallet.coins() + '.' })]));
      } else if (!s.done) {
        box.appendChild(h('p', { html: 'You predicted <b>' + L(s.pick) + ': ' + spec.o[s.pick] + '</b>' + (s.stake ? ' and staked ◉ ' + s.stake : '') + '. Now test it: <b>' + spec.how + '</b>' }));
        const bar = h('div', { class: 'xpbar' }, [h('span', { style: 'width:' + Math.min(100, s.used * 20) + '%' })]);
        const rev = h('button', { class: 'btn primary', type: 'button', text: 'Reveal the answer', disabled: s.used >= 5 ? null : 'disabled', onclick: reveal });
        box.append(h('div', { class: 'predict-progress' }, [h('small', { text: s.used >= 5 ? 'Experiment done. Ready when you are.' : 'Use the lab below to unlock the answer…' }), bar]), h('div', { class: 'hero-cta' }, [rev]));
        const el = lab();
        if (el && !el._predictHooked) {
          el._predictHooked = true;
          const bump = () => { const c = P()[ch.id]; if (!c || c.done || c.used >= 5) return; c.used++; PB.save(); if (c.used >= 5 || c.used === 1) draw(); else bar.firstChild.style.width = c.used * 20 + '%'; };
          ['input', 'click', 'pointerup'].forEach((t) => el.addEventListener(t, bump));
        }
      } else {
        const ok = s.ok;
        box.classList.toggle('right', ok); box.classList.toggle('wrong', !ok);
        box.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), html: (ok ? '✓ Your prediction was right' + (s.stake ? ': ◉ +' + 2 * s.stake + ' back.' : '.') : '✗ Not this time' + (s.stake ? ' (◉ ' + s.stake + ' lost)' : '') + '. The answer is <b>' + L(spec.a) + ': ' + spec.o[spec.a] + '</b>.') }));
        const ex = h('div', { class: 'solution', html: '<b>Why</b><p>' + spec.why + '</p>' }); box.appendChild(ex);
        const st2 = PB.predictStats();
        box.appendChild(h('small', { class: 'predict-note', text: 'Your prediction record: ' + st2.right + ' of ' + st2.made + ' right · net ◉ ' + (st2.won >= 0 ? '+' : '') + st2.won }));
      }
      PB.typeset(box);
    }
    function reveal() {
      const s = P()[ch.id]; if (!s || s.done) return;
      s.done = Date.now(); s.ok = s.pick === spec.a; PB.save();
      if (s.ok) { if (s.stake) PB.wallet.give('coins', 2 * s.stake, 'prediction', true); PB.addXP(5, 'Prediction right'); }
      else PB.addXP(3, 'Tested a prediction');
      PB.emit({ type: 'prediction', chapter: ch.id, ok: s.ok });
      draw();
    }
    draw();
  };
})();
