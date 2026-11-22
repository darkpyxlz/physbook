/* Scibook adaptive practice.
   Every answer anywhere in the book (problems, inline checks, worked-example quizzes, gym drills) updates a
   per-chapter skill estimate (a simple logistic, Elo-style model). Adaptive practice then serves the question
   you have about a 70% chance of getting right; after a mistake it steps down to an easier "stepping stone" and
   points you back to the section that explains it; after a run of correct answers it stretches you. Chapters
   where you slipped come back for spaced review after 1, 3, 7, 16 and 35 days. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const B = { concept: -1, core: 0.4, olympiad: 1.6, drill: 0, example: -0.4, check: -0.8 };
  const INTERVALS = [1, 3, 7, 16, 35];
  const DAY = 86400000;
  const sig = (x) => 1 / (1 + Math.exp(-x));
  function M() { if (!S().mastery) S().mastery = {}; return S().mastery; }
  function RV() { if (!S().review) S().review = {}; return S().review; }
  function rec(chId) { const m = M(); if (!m[chId]) m[chId] = { t: -0.5, n: 0 }; return m[chId]; }
  PB.mastery = function (chId) { const r = M()[chId]; return r ? sig(r.t - B.core) : null; };
  PB.masteryLabel = function (m) { return m == null ? 'New' : m < 0.4 ? 'Learning' : m < 0.65 ? 'Getting there' : m < 0.85 ? 'Solid' : 'Mastered'; };

  function update(chId, b, ok, kind) {
    if (!chId || !PB.chapter(chId)) return;
    const r = rec(chId), p = sig(r.t - b), K = 0.9 / (1 + 0.12 * r.n) + 0.2;
    r.t = Math.max(-3, Math.min(4, r.t + K * ((ok ? 1 : 0) - p)));
    r.n++; r.last = Date.now();
    const rv = RV(), now = Date.now();
    if (!ok && kind !== 'olympiad') rv[chId] = { box: 0, due: now + 10 * 60000 };
    else if (ok && rv[chId] && rv[chId].due <= now) {
      const box = rv[chId].box + 1;
      if (box >= INTERVALS.length) delete rv[chId]; else rv[chId] = { box: box, due: now + INTERVALS[box - 1] * DAY };
    }
    PB.save();
  }
  // Report every graded problem attempt.
  const origCheck = PB.check;
  PB.check = function (p, a) { const r = origCheck(p, a); if (r && !r.done && !r.invalid) PB.emit({ type: 'answer', p: p, ok: !!r.ok }); return r; };
  PB.on(function (ev) {
    if (ev.type === 'answer') update(ev.p.chapter, B[ev.p.level], ev.ok, ev.p.level);
    if (ev.type === 'quiz') update(ev.chapter, B[ev.kind] != null ? B[ev.kind] : -0.5, ev.ok, ev.kind);
    if (ev.type === 'drill') update(ev.chapter, B.drill, ev.ok, 'drill');
  });
  PB.reviewsDue = function () { const rv = RV(), now = Date.now(); return Object.keys(rv).filter(function (k) { return rv[k].due <= now && PB.chapter(k) && (!PB.isUnlocked || PB.isUnlocked(PB.chapter(k))); }); };

  /* ---------- Choosing what comes next ---------- */
  const sess = { scope: null, mode: 'normal', streak: 0, answered: 0, correct: 0, last: null, item: null, ch: null, note: '' };
  const open = (c) => !PB.isUnlocked || PB.isUnlocked(c);
  function started(c) { return (M()[c.id] && M()[c.id].n > 0) || c.sections.some(function (_, i) { return S().read[c.id + ':' + i]; }) || c.problems.some(function (p) { return S().solved[p.id] || S().attempts[p.id]; }); }
  function pickChapter() {
    if (sess.scope) return PB.chapter(sess.scope);
    const due = PB.reviewsDue();
    if (due.length) { sess.mode = 'review'; return PB.chapter(due.sort(function (a, b) { return RV()[a].due - RV()[b].due; })[0]); }
    let cands = PB.chapters.filter(function (c) { return open(c) && started(c); });
    if (!cands.length) return PB.chapter(S().lastChapter) || PB.chapters.find(open) || PB.chapters[0];
    // Weight weaker chapters more, but keep some variety.
    const w = cands.map(function (c) { const m = PB.mastery(c.id); return Math.pow(1 - (m == null ? 0.3 : m), 2) + 0.05; });
    let u = Math.random() * w.reduce(function (a, x) { return a + x; }, 0);
    for (let i = 0; i < cands.length; i++) { if (u < w[i]) return cands[i]; u -= w[i]; }
    return cands[0];
  }
  function pickItem(ch) {
    const t = rec(ch.id).t;
    const target = sess.mode === 'step' ? t - 2 : sess.mode === 'stretch' ? t + 0.1 : sess.mode === 'review' ? t - 1.2 : t - 0.85;
    const items = [];
    ch.problems.forEach(function (p) {
      if (S().solved[p.id] || S().revealed[p.id] || p.id === sess.last) return;
      if (sess.mode === 'step' && p.level !== 'concept') return;
      items.push({ kind: 'problem', p: p, b: B[p.level], key: p.id, bonus: -0.25 });
    });
    (PB.drills[ch.id] || []).forEach(function (d, i) { const key = ch.id + '#' + i; if (key !== sess.last) items.push({ kind: 'drill', d: d, b: B.drill + (i - 1) * 0.25, key: key, bonus: 0 }); });
    if (!items.length) return null;
    items.forEach(function (it) { it.score = Math.abs(it.b - target) + it.bonus + Math.random() * 0.5; });
    items.sort(function (a, b) { return a.score - b.score; });
    return items[0];
  }

  /* ---------- View ---------- */
  function masteryBar(chId, big) {
    const m = PB.mastery(chId), pct = m == null ? 0 : Math.round(m * 100);
    return h('div', { class: 'mastery' + (big ? ' big' : ''), title: 'Estimated chance of solving a core problem in this chapter' }, [
      h('span', { class: 'mastery-bar' }, [h('span', { style: 'width:' + pct + '%;background:hsl(' + Math.round(pct * 1.25) + ',65%,45%)' })]),
      h('span', { class: 'mastery-lbl', text: (m == null ? 'New' : pct + '% · ' + PB.masteryLabel(m)) })
    ]);
  }
  PB.masteryBar = masteryBar;
  const MODE = { normal: ['🎯', 'Just right', 'Pitched so you have about a 70% chance.'], step: ['🪜', 'Stepping stone', 'An easier question on the same idea, to rebuild it before climbing again.'], stretch: ['🚀', 'Stretch', 'Three right in a row: here is something harder.'], review: ['🔁', 'Spaced review', 'You slipped on this chapter earlier. Recalling it now makes it stick.'] };

  function view(scope) {
    sess.scope = scope || null;
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: scope ? PB.subject(PB.chapter(scope).subject).name + ' · ' + PB.chapter(scope).title : 'Across everything you have started' }));
    wrap.appendChild(h('h1', { text: 'Adaptive practice', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Questions chosen for you: about a 70% chance of success, an easier stepping stone after a slip, a stretch after a streak, and spaced review of anything you got wrong. Every answer anywhere in the book updates your mastery.' }));
    const stats = h('div', { class: 'stat-row adapt-stats' });
    const stage = h('div', { class: 'adapt-stage' });
    wrap.append(stats, stage);
    function drawStats() {
      stats.innerHTML = '';
      [[sess.answered, 'answered'], [sess.answered ? Math.round(100 * sess.correct / sess.answered) + '%' : '–', 'correct'], [sess.streak, 'streak'], [PB.reviewsDue().length, 'reviews due']].forEach(function (x) { stats.appendChild(h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })])); });
    }
    function outcome(ok, item) {
      sess.answered++;
      if (ok) { sess.correct++; sess.streak++; sess.mode = sess.streak >= 3 ? 'stretch' : 'normal'; }
      else { sess.streak = 0; sess.mode = 'step'; }
      sess.last = item.key;
      drawStats();
    }
    function next() {
      const ch = pickChapter();
      if (!ch) { stage.innerHTML = ''; stage.appendChild(h('p', { class: 'empty', text: 'Read a section or try a problem first, then come back.' })); return; }
      let item = pickItem(ch);
      if (!item) { sess.mode = 'normal'; item = pickItem(ch); }
      sess.item = item; sess.ch = ch;
      render(ch, item);
    }
    function render(ch, item) {
      stage.innerHTML = '';
      const md = MODE[sess.mode] || MODE.normal;
      stage.appendChild(h('div', { class: 'adapt-head subj-' + ch.subject }, [
        h('span', { class: 'adapt-mode', title: md[2], text: md[0] + ' ' + md[1] }),
        h('a', { class: 'adapt-ch', href: '#ch-' + ch.id, text: PB.subject(ch.subject).name + ' · ' + ch.num + '. ' + ch.title }),
        masteryBar(ch.id)
      ]));
      stage.appendChild(h('p', { class: 'input-hint', text: md[2] }));
      const nextRow = h('div', { class: 'hero-cta' });
      const nextBtn = (label, primary) => h('button', { class: 'btn' + (primary ? ' primary' : ''), type: 'button', id: 'adapt-next', text: label, onclick: next });
      const revisit = (p) => { const i = p ? PB.sectionFor(p) : 0; return h('a', { class: 'btn ghost', href: '#ch-' + ch.id, text: 'Reread §' + ch.num + '.' + (i + 1) + ' ' + ch.sections[i].title.replace(/<[^>]+>/g, ''), onclick: function () { PB.pendingSection = i; } }); };
      if (item.kind === 'problem') {
        const p = item.p, before = S().attempts[p.id] || 0;
        let settled = false;
        const card = PB.problemCard(p, { showChapter: false, onChange: function () {
          const st = PB.status(p);
          if (settled) return;
          if (st === 'solved') { settled = true; outcome(true, item); nextRow.innerHTML = ''; nextRow.appendChild(nextBtn('Next question →', true)); setTimeout(function () { const b = document.getElementById('adapt-next'); if (b) b.focus(); }, 30); }
          else if (st === 'revealed') { settled = true; outcome(false, item); nextRow.innerHTML = ''; nextRow.append(nextBtn('Next: a stepping stone →', true), revisit(p)); }
          else if ((S().attempts[p.id] || 0) > before && !nextRow.dataset.wrong) { nextRow.dataset.wrong = '1'; outcome(false, item); nextRow.innerHTML = ''; nextRow.append(h('span', { class: 'input-hint', text: 'Have another go, or ' }), nextBtn('switch to an easier stepping stone', false), revisit(p)); }
        } });
        stage.appendChild(card);
        nextRow.appendChild(h('button', { class: 'btn ghost', type: 'button', text: 'Skip', onclick: function () { sess.last = item.key; next(); } }));
      } else {
        const d = item.d, inst = d.gen(PB.rng((Math.random() * 4294967296) >>> 0));
        const card = h('article', { class: 'prob drill-card' });
        card.appendChild(h('div', { class: 'prob-top' }, [h('span', { class: 'prob-id', text: 'Drill' }), h('span', { class: 'prob-title', text: d.title }), h('span', { class: 'spacer' }), h('span', { class: 'chip core', text: 'Practice' })]));
        const body = h('div', { class: 'prob-body' });
        body.appendChild(h('div', { class: 'prob-q', html: inst.q }));
        const input = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', 'aria-label': 'Your answer', placeholder: 'Your answer' });
        const fb = h('div');
        const go = function () {
          const ok = PB.drillOk(inst, input.value);
          if (ok === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number first.' })); return; }
          input.disabled = true; goBtn.disabled = true;
          PB.emit({ type: 'drill', chapter: ch.id, ok: ok });
          outcome(ok, item);
          fb.innerHTML = '';
          fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), text: ok ? 'Correct.' : 'Not quite: the answer is ' + PB.fmt(inst.answer, 4) + (inst.unit ? ' ' + String(inst.unit).replace(/<[^>]+>/g, '') : '') + '.' }));
          if (inst.solution) { const sol = h('div', { class: 'solution', html: '<b>How to do it</b>' + inst.solution }); fb.appendChild(sol); PB.typeset(sol); }
          nextRow.innerHTML = '';
          nextRow.appendChild(nextBtn(ok ? 'Next question →' : 'Next: a stepping stone →', true));
          if (!ok) nextRow.appendChild(revisit(null));
          setTimeout(function () { const b = document.getElementById('adapt-next'); if (b) b.focus(); }, 30);
        };
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
        const goBtn = h('button', { class: 'btn primary', type: 'button', text: 'Submit', onclick: go });
        body.appendChild(h('div', { class: 'num-row' }, [input, inst.unit ? h('span', { class: 'unit', html: inst.unit }) : null, goBtn]));
        body.appendChild(fb);
        card.appendChild(body);
        stage.appendChild(card);
        PB.typeset(card);
        setTimeout(function () { input.focus({ preventScroll: true }); }, 30);
      }
      stage.appendChild(nextRow);
    }
    // Mastery overview.
    const over = h('div', { class: 'adapt-over' });
    function drawOver() {
      over.innerHTML = '';
      const chs = PB.chapters.filter(function (c) { return M()[c.id] && M()[c.id].n > 0; }).sort(function (a, b) { return PB.mastery(a.id) - PB.mastery(b.id); });
      if (!chs.length) return;
      over.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Your mastery' }), h('p', { text: 'Weakest first. Click a chapter to practise just that one.' })]));
      const g = h('div', { class: 'mastery-grid' });
      chs.slice(0, 24).forEach(function (c) { g.appendChild(h('a', { class: 'mastery-row subj-' + c.subject, href: '#adapt-' + c.id }, [h('span', { class: 'subj-mark', text: PB.subject(c.subject).mark }), h('span', { class: 'mr-name', text: c.title }), masteryBar(c.id), RV()[c.id] ? h('span', { class: 'chip', text: RV()[c.id].due <= Date.now() ? 'review due' : RV()[c.id].due - Date.now() < DAY ? 'review soon' : 'review in ' + Math.round((RV()[c.id].due - Date.now()) / DAY) + 'd' }) : null])); });
      over.appendChild(g);
    }
    wrap.appendChild(over);
    PB.setView([wrap], 'adapt');
    sess.mode = 'normal'; sess.streak = 0; sess.answered = 0; sess.correct = 0;
    drawStats(); next(); drawOver();
    overHook = function () { if (over.isConnected) drawOver(); };
    window.scrollTo(0, 0);
  }
  let overHook = null;
  PB.on(function (ev) { if ((ev.type === 'answer' || ev.type === 'drill') && overHook) overHook(); });
  PB.views = PB.views || {};
  PB.views.adapt = function () { view(null); };
  PB.chapters.forEach(function (c) { PB.views['adapt-' + c.id] = function () { view(c.id); }; });

  /* ---------- Hooks into the chapter page and the dashboard ---------- */
  PB.chapterHeadExtras = function (ch, head) {
    head.appendChild(h('div', { class: 'ch-mastery' }, [h('span', { class: 'eyebrow', text: 'Mastery' }), masteryBar(ch.id), h('a', { class: 'btn small primary', href: '#adapt-' + ch.id, text: '🎯 Adaptive practice' })]));
    if (PB.pendingSection != null) {
      const i = PB.pendingSection; PB.pendingSection = null;
      setTimeout(function () { const t = document.getElementById('sec-' + i); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 250);
    }
  };
  const prevHome = PB.homeExtras;
  PB.homeExtras = function (wrap) {
    const due = PB.reviewsDue();
    const weak = PB.chapters.filter(function (c) { return M()[c.id] && M()[c.id].n >= 2; }).sort(function (a, b) { return PB.mastery(a.id) - PB.mastery(b.id); })[0];
    wrap.appendChild(h('a', { class: 'hero-strip adapt-strip', href: '#adapt' }, [
      h('span', { class: 'class-ico', text: '🎯' }),
      h('div', {}, [h('b', { text: 'Adaptive practice' + (due.length ? ' · ' + due.length + ' review' + (due.length > 1 ? 's' : '') + ' due' : '') }),
        h('small', { text: weak ? 'Weakest so far: ' + weak.title + ' (' + Math.round(PB.mastery(weak.id) * 100) + '%). Questions are pitched to your level.' : 'Questions pitched to your level, with stepping stones after mistakes and spaced review.' })]),
      h('span', { class: 'btn small primary', text: 'Practise' })
    ]));
    if (prevHome) prevHome(wrap);
  };
  // This is the last script: re-route so direct links to late-registered views (hero, adapt, trials…) and the new Learn hooks work on first load.
  PB.route();
})();
