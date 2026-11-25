/* Scibook weekly raid (#raid), a solo take on co-op raids. Each week a new boss is built from five chapters
   you have started, mixing subjects, so one run needs ideas from across the book. You have hearts instead of
   teammates; completed card sets act as allies, each lending a power. Clear it for rewards, then try Heroic. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  const BOSSES = [
    ['🐉', 'The Entropy Dragon', 'It feeds on disorder. Every right answer puts a little order back into the world.'],
    ['🦑', 'The Kraken of Confusion', 'Its tentacles tangle units and signs. Keep your working clean.'],
    ['🤖', 'Unit Golem', 'Built from mismatched units. It crumbles when every quantity is in SI.'],
    ['🌀', 'The Chaos Pendulum', 'Tiny slips grow into huge errors. Check each step.'],
    ['🦠', 'The Mutant Strain', 'It evolves to dodge rote answers. Only understanding works.'],
    ['🕳', 'The Event Horizon', 'Nothing escapes, except a correct answer.'],
    ['🧪', 'The Runaway Reaction', 'Exothermic and accelerating. Cool it with careful reasoning.'],
    ['♾', 'The Infinite Regress', 'An endless chain of “why?”. Answer each link.']
  ];
  function weekKey(d) { const t = new Date(d || Date.now()); const day = (t.getDay() + 6) % 7; t.setDate(t.getDate() - day); return PB.today(t); }
  function R() { const s = S(); s.raid = s.raid || { log: {}, runs: 0 }; return s.raid; }
  function hash(str) { let x = 2166136261; for (const c of str) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; } return x; }
  function pool() {
    const lvl = (c) => (PB.masteryLevel ? PB.masteryLevel(c) : 0);
    return PB.chapters.filter((c) => (PB.drills[c.id] || []).length && lvl(c) >= 1 && (!PB.isUnlocked || PB.isUnlocked(c)));
  }
  PB.raidAvailable = function () { const r = R().log[weekKey()] || {}; return pool().length >= 3 && !r.normal; };
  function boss() { return BOSSES[hash(weekKey()) % BOSSES.length]; }
  function pickStages(n, salt) {
    const p = pool().slice(), seed = hash(weekKey() + salt);
    p.sort((a, b) => hash(a.id + seed) - hash(b.id + seed));
    // Prefer one chapter per subject first, then fill.
    const out = [], seen = {};
    p.forEach((c) => { if (out.length < n && !seen[c.subject]) { seen[c.subject] = 1; out.push(c); } });
    p.forEach((c) => { if (out.length < n && out.indexOf(c) < 0) out.push(c); });
    while (out.length < n && out.length) out.push(out[out.length % Math.max(1, p.length)]);
    return out;
  }
  const has = (sid) => PB.setComplete && PB.setComplete(sid);

  function view() {
    const wrap = h('div', { class: 'wrap' });
    const b = boss(), wk = R().log[weekKey()] || {};
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Weekly raid · resets on Monday' }));
    wrap.appendChild(h('h1', { text: b[0] + ' ' + b[1], style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: b[2] + ' Each stage is a fresh question from a different chapter you have started. Wrong answers cost hearts; lose them all and the boss wins this round (you can try again).' }));
    const p = pool();
    if (p.length < 3) {
      wrap.appendChild(h('div', { class: 'lock-box' }, [h('h2', { text: 'Not yet' }), h('p', { text: 'Start at least three chapters (answer a few questions in each) and the raid will be built from them.' }), h('a', { class: 'btn primary', href: '#adapt', text: 'Adaptive practice' })]));
      PB.setView([wrap], 'raid'); return;
    }
    const allies = h('div', { class: 'raid-allies' }, [h('b', { text: 'Your allies (completed card sets)' })]);
    PB.CARD_SETS.forEach((st) => allies.appendChild(h('div', { class: 'ally' + (has(st.id) ? ' on' : '') }, [h('span', { text: st.icon }), h('div', {}, [h('b', { text: st.power[0] }), h('small', { text: has(st.id) ? st.power[1] : 'Complete the ' + st.name + ' set to unlock.' })])])));
    wrap.appendChild(allies);
    const modes = h('div', { class: 'raid-modes' });
    const mode = (id, name, n, hearts, reward, locked) => h('div', { class: 'today-card raid-mode' + (wk[id] ? ' done' : '') }, [
      h('div', { class: 'eyebrow', text: name + (wk[id] ? ' · cleared ✓' : '') }), h('h3', { text: n + ' stages · ' + hearts + ' ♥' }),
      h('small', { text: (wk[id] ? 'Already cleared this week: practice run, no rewards.' : 'First clear this week: ' + reward) }),
      h('button', { class: 'btn ' + (locked ? '' : 'primary'), type: 'button', disabled: locked ? 'disabled' : null, text: locked ? 'Clear Normal first' : 'Start', onclick: () => run(wrap, id, n, hearts) })
    ]);
    modes.append(mode('normal', 'Normal', 5, 3, '◉ 200, 💎 40 and a mystery box'), mode('heroic', 'Heroic', 7, 2, '◉ 400, 💎 100 and a premium box', !wk.normal));
    wrap.appendChild(modes);
    wrap.appendChild(h('p', { class: 'predict-note', text: 'Raids cleared: ' + Object.keys(R().log).filter((k) => R().log[k].normal).length + ' weeks · Heroic: ' + Object.keys(R().log).filter((k) => R().log[k].heroic).length }));
    PB.setView([wrap], 'raid');
  }

  function run(wrap, mode, n, baseHearts) {
    const b = boss(), stages = pickStages(n, mode);
    let tries = 0, maxH = baseHearts + (has('elements') ? 1 : 0), hearts = maxH, k = 0, streak = 0, lemma = has('theorems'), skip = has('scientists');
    const seed = (Date.now() % 1e6) >>> 0;
    R().runs++; PB.save();
    wrap.innerHTML = '';
    const head = h('div', { class: 'raid-head' });
    const stage = h('div', { class: 'raid-stage' });
    wrap.append(head, stage);
    function drawHead() {
      head.innerHTML = '';
      const hp = Math.max(0, 100 - Math.round(100 * k / n));
      head.append(h('div', { class: 'raid-boss' }, [h('span', { class: 'raid-boss-ico' + (hp < 100 ? ' hit' : ''), text: b[0] }), h('div', { class: 'raid-boss-meta' }, [h('b', { text: b[1] + (mode === 'heroic' ? ' (Heroic)' : '') }), h('div', { class: 'raid-hp' }, [h('span', { style: 'width:' + hp + '%' })]), h('small', { text: hp + ' HP · stage ' + Math.min(k + 1, n) + ' of ' + n })])]),
        h('div', { class: 'raid-hearts', text: '♥'.repeat(hearts) + '♡'.repeat(Math.max(0, maxH - hearts)) }));
    }
    function ask() {
      drawHead();
      stage.innerHTML = '';
      if (hearts <= 0) return end(false);
      if (k >= n) return end(true);
      const ch = stages[k], ds = PB.drills[ch.id], d = ds[(seed + k * 7) % ds.length], inst = d.gen(PB.rng(seed * 13 + k * 977 + 131 * (tries++)));
      const card = h('article', { class: 'prob raid-q' });
      card.appendChild(h('div', { class: 'prob-top' }, [h('span', { class: 'subj-badge subj-' + ch.subject, text: PB.subject(ch.subject).mark }), h('span', { class: 'prob-title', text: ch.title + ' · ' + d.title }), h('span', { class: 'spacer' }), k === n - 1 ? h('span', { class: 'chip', text: 'Final blow' }) : null]));
      const body = h('div', { class: 'prob-body' }, [h('div', { class: 'prob-q', html: inst.q })]);
      if (has('sky') && (ch.formulas || []).length) body.appendChild(h('div', { class: 'formula-list mini' }, ch.formulas.slice(0, 3).map((f) => h('div', { class: 'formula' }, [h('span', { html: f[0] }), h('div', { class: 'm', html: '$' + f[1] + '$' })]))));
      const inp = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'Your answer', 'aria-label': 'Your answer' });
      const fb = h('div');
      const go = () => {
        const ok = PB.drillOk(inst, inp.value);
        if (ok === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number.' })); return; }
        inp.disabled = true; btn.disabled = true; if (sk) sk.disabled = true;
        PB.emit({ type: 'drill', chapter: ch.id, ok: ok });
        fb.innerHTML = '';
        if (ok) {
          k++; streak++;
          let msg = 'Hit! The boss loses ' + Math.round(100 / n) + ' HP.';
          if (has('organisms') && streak >= 2 && hearts < maxH) { hearts++; streak = 0; msg += ' Regeneration: +1 ♥.'; }
          fb.appendChild(h('div', { class: 'feedback ok', text: msg }));
        } else {
          streak = 0;
          if (lemma) { lemma = false; fb.appendChild(h('div', { class: 'feedback no', text: 'Missed, but Lemma saves your heart. Answer: ' + PB.fmt(inst.answer, 4) + '.' })); }
          else { hearts--; fb.appendChild(h('div', { class: 'feedback no', text: 'The boss strikes back: −1 ♥. Answer: ' + PB.fmt(inst.answer, 4) + (inst.unit ? ' ' + String(inst.unit).replace(/<[^>]+>/g, '') : '') + '.' })); }
          if (inst.solution) { const so = h('div', { class: 'solution', html: '<b>How to do it</b>' + inst.solution }); fb.appendChild(so); PB.typeset(so); }
        }
        fb.appendChild(h('div', { class: 'hero-cta' }, [h('button', { class: 'btn primary', type: 'button', id: 'raid-next', text: 'Continue →', onclick: ask })]));
        drawHead();
        setTimeout(() => { const x = document.getElementById('raid-next'); if (x) x.focus(); }, 30);
      };
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!inp.disabled) go(); } });
      const btn = h('button', { class: 'btn primary', type: 'button', text: 'Strike', onclick: go });
      const sk = skip ? h('button', { class: 'btn ghost', type: 'button', text: '⚛ Second opinion: skip', onclick: () => { skip = false; k++; ask(); } }) : null;
      body.append(h('div', { class: 'num-row' }, [inp, inst.unit ? h('span', { class: 'unit', html: inst.unit }) : null, btn]));
      if (sk) body.appendChild(h('div', { class: 'hero-cta' }, [sk]));
      body.appendChild(fb);
      card.appendChild(body); stage.appendChild(card); PB.typeset(card);
      setTimeout(() => inp.focus({ preventScroll: true }), 30);
    }
    function end(won) {
      const wk = R().log[weekKey()] = R().log[weekKey()] || {}, first = won && !wk[mode];
      if (won && first) { wk[mode] = Date.now(); PB.save(); }
      const rw = mode === 'heroic' ? [['coins', 400], ['gems', 100]] : [['coins', 200], ['gems', 40]];
      if (first) { rw.forEach((r) => PB.wallet.give(r[0], r[1], 'raid', true)); PB.addXP(mode === 'heroic' ? 60 : 30, 'Raid cleared'); setTimeout(() => PB.openBox(mode === 'heroic' ? 'premium' : 'common', 'raid'), 800); }
      stage.innerHTML = '';
      stage.appendChild(h('section', { class: 'session-end' + (won ? ' perfect' : '') }, [
        h('div', { class: 'session-ico', text: won ? '🏆' : b[0] }),
        h('h2', { text: won ? b[1] + ' defeated!' : b[1] + ' wins this round' }),
        h('p', { text: won ? (first ? 'First clear this week: ◉ ' + rw[0][1] + ', 💎 ' + rw[1][1] + ' and a mystery box.' : 'Practice clear (rewards already collected this week).') : 'You cleared ' + k + ' of ' + n + ' stages. The questions you missed are worth a look in adaptive practice.' }),
        h('div', { class: 'hero-cta' }, [h('button', { class: 'btn primary', type: 'button', text: won ? 'Back to the raid' : 'Try again', onclick: () => (won ? view() : run(wrap, mode, n, baseHearts)) }), h('a', { class: 'btn', href: '#adapt', text: 'Adaptive practice' })])
      ]));
      if (won && PB.celebrate) PB.celebrate(160);
      drawHead();
      PB.emit({ type: 'raid', won: won, mode: mode });
    }
    ask();
    window.scrollTo(0, 0);
  }
  PB.views.raid = view;

  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const b = boss(), wk = R().log[weekKey()] || {};
    PB.playRow(wrap).appendChild(h('a', { class: 'today-card raid' + (wk.normal ? ' done' : ''), href: '#raid' }, [h('div', { class: 'eyebrow', text: '⚔ Weekly raid' }), h('h3', { text: b[0] + ' ' + b[1] }), h('small', { text: wk.heroic ? 'Heroic cleared. New boss on Monday.' : wk.normal ? 'Cleared! Heroic mode is open.' : pool().length >= 3 ? '5 stages from across the book.' : 'Start 3 chapters to unlock.' })]));
  };
})();
