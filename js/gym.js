/* Scibook practice gym (endless and sprint drills), daily quests panel and activity heatmap. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const SPRINT_SECONDS = 90;

  function drillPool(topic) {
    if (topic === 'all') return Object.keys(PB.drills).reduce(function (a, k) { return a.concat(PB.drills[k]); }, []);
    if (topic.indexOf('subj:') === 0) { const sid = topic.slice(5); return PB.chaptersOf(sid).reduce(function (a, c) { return a.concat(PB.drills[c.id] || []); }, []); }
    return PB.drills[topic] || [];
  }
  function makeDrill(topic) {
    const pool = drillPool(topic);
    const d = pool[Math.floor(Math.random() * pool.length)];
    const r = PB.rng((Math.random() * 4294967296) >>> 0);
    const inst = d.gen(r);
    inst.title = d.title; inst.chapter = d.chapter; inst.xp = d.xp || 5;
    return inst;
  }
  function check(inst, val) {
    const x = PB.parseNumber(val);
    if (x === null) return null;
    const tol = inst.tol != null ? inst.tol : 0.02;
    return inst.answer === 0 ? Math.abs(x) < 1e-9 : Math.abs(x - inst.answer) <= tol * Math.abs(inst.answer);
  }

  const st = { topic: 'all', mode: 'endless', combo: 0, inst: null, phase: 'ask', sprint: null, timer: null };

  function view() {
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Unlimited practice' }));
    wrap.appendChild(h('h1', { text: 'Practice gym', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Fresh numbers every time. Chain correct answers to build a combo multiplier, or race the clock in a 90-second sprint.' }));

    const stats = h('div', { class: 'gym-stats' });
    wrap.appendChild(stats);
    function drawStats() {
      const g = S().gym;
      stats.innerHTML = '';
      [[st.combo ? '×' + st.combo : '–', 'combo now'], ['×' + PB.comboMult(Math.max(1, st.combo + 1)).toFixed(2).replace(/\.?0+$/, ''), 'next multiplier'], [g.bestCombo || 0, 'best combo'], [g.sprintBest || 0, 'sprint best'], [PB.gymXPLeft(), 'gym XP left today']].forEach(function (x) {
        stats.appendChild(h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })]));
      });
    }

    const controls = h('div', { class: 'prob-filters', style: 'margin-top:18px' });
    const sel = h('select', { class: 'filter-select', id: 'gym-topic', 'aria-label': 'Topic', onchange: function () { st.topic = sel.value; st.combo = 0; next(); } });
    sel.appendChild(h('option', { value: 'all', text: 'Mixed: every science' }));
    PB.SUBJECTS.forEach(function (sub) {
      const chs = PB.chaptersOf(sub.id).filter(function (c) { return PB.drills[c.id]; });
      if (!chs.length) return;
      sel.appendChild(h('option', { value: 'subj:' + sub.id, text: 'Mixed: all of ' + sub.name }));
      const og = h('optgroup', { label: sub.name });
      chs.forEach(function (c) { og.appendChild(h('option', { value: c.id, text: c.num + '. ' + c.title + ' (' + PB.drills[c.id].length + ')' })); });
      sel.appendChild(og);
    });
    sel.value = st.topic;
    const seg = h('div', { class: 'seg', role: 'group' });
    [['endless', 'Endless'], ['sprint', 'Sprint · 90 s']].forEach(function (m) {
      seg.appendChild(h('button', { type: 'button', class: st.mode === m[0] ? 'on' : '', text: m[1], onclick: function () { stopSprint(); st.mode = m[0]; view(); } }));
    });
    controls.append(sel, seg);
    wrap.appendChild(controls);

    const timerBar = h('div', { class: 'gym-timer', hidden: st.mode !== 'sprint' }, [h('span')]);
    wrap.appendChild(timerBar);
    const card = h('article', { class: 'prob gym-card lv-core' });
    wrap.appendChild(card);
    wrap.appendChild(h('p', { class: 'input-hint', html: 'Each correct drill earns 5 XP times your combo multiplier (up to ×3). Gym XP is capped at ' + PB.GYM_DAILY_CAP + ' per day so the main problems stay the main event. Press <kbd>Enter</kbd> to submit and again for the next drill.' }));

    function renderAsk() {
      const inst = st.inst, ch = PB.chapter(inst.chapter);
      card.innerHTML = '';
      const top = h('div', { class: 'prob-top' }, [h('span', { class: 'prob-id', text: ch ? ch.title : '' }), h('span', { class: 'prob-title', text: inst.title }), h('span', { class: 'spacer' }), st.combo > 1 ? h('span', { class: 'combo-chip', text: 'Combo ×' + st.combo }) : null, h('span', { class: 'pts', text: '+' + Math.round(inst.xp * PB.comboMult(st.combo + 1)) + ' XP' })].filter(Boolean));
      const body = h('div', { class: 'prob-body' });
      body.appendChild(h('div', { class: 'prob-q', html: inst.q }));
      const input = h('input', { type: 'text', inputmode: 'decimal', id: 'gym-answer', autocomplete: 'off', 'aria-label': 'Your answer', placeholder: 'Your answer' });
      body.appendChild(h('div', { class: 'num-row' }, [input, inst.unit ? h('span', { class: 'unit', html: inst.unit }) : null].filter(Boolean)));
      const fb = h('div');
      const actions = h('div', { class: 'prob-actions' });
      function submit() {
        if (st.phase !== 'ask') { next(); return; }
        const ok = check(inst, input.value);
        if (ok === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number, for example 4.9 or 3e8.' })); return; }
        st.phase = 'done';
        input.disabled = true;
        fb.innerHTML = '';
        if (ok) {
          st.combo++;
          const xp = PB.gymAnswer(true, st.combo, inst.xp);
          if (st.sprint) st.sprint.score++;
          fb.appendChild(h('div', { class: 'feedback ok', text: 'Correct' + (xp ? ' · +' + xp + ' XP' : ' · daily gym XP cap reached') + (st.combo > 1 ? ' · combo ×' + st.combo : '') }));
          card.classList.add('flash-ok');
          if (st.sprint) { setTimeout(next, 450); }
        } else {
          PB.gymAnswer(false, 0);
          const lost = st.combo;
          st.combo = 0;
          fb.appendChild(h('div', { class: 'feedback no', text: 'Not quite. The answer is ' + PB.fmt(inst.answer, 4) + (inst.unit ? ' ' + inst.unit.replace(/<[^>]+>/g, '') : '') + '.' + (lost > 1 ? ' Combo of ' + lost + ' lost.' : '') }));
          if (inst.solution) { const sol = h('div', { class: 'solution', html: '<b>How to do it</b>' + inst.solution }); fb.appendChild(sol); PB.typeset(sol); }
          card.classList.add('flash-no');
        }
        drawStats();
        actions.innerHTML = '';
        actions.appendChild(h('button', { class: 'btn primary', type: 'button', id: 'gym-next', text: 'Next drill', onclick: next }));
        setTimeout(function () { const nb = document.getElementById('gym-next'); if (nb) nb.focus(); }, 20);
      }
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
      actions.appendChild(h('button', { class: 'btn primary', type: 'button', text: 'Submit', onclick: submit }));
      actions.appendChild(h('button', { class: 'btn ghost', type: 'button', text: 'Skip (resets combo)', onclick: function () { st.combo = 0; next(); } }));
      body.append(actions, fb);
      card.append(top, body);
      PB.typeset(card);
      setTimeout(function () { input.focus({ preventScroll: true }); }, 30);
    }
    function next() {
      card.classList.remove('flash-ok', 'flash-no');
      if (st.mode === 'sprint' && !st.sprint) { renderSprintStart(); return; }
      if (!drillPool(st.topic).length) { card.innerHTML = '<p class="empty">No drills for this topic yet.</p>'; return; }
      st.inst = makeDrill(st.topic); st.phase = 'ask';
      renderAsk();
      drawStats();
    }
    function renderSprintStart(result) {
      card.innerHTML = '';
      const body = h('div', { class: 'prob-body sprint-intro' });
      if (result) {
        body.appendChild(h('div', { class: 'sprint-score', text: String(result.score) }));
        body.appendChild(h('p', { text: result.best ? 'New personal best! Correct answers in 90 seconds.' : 'Correct answers in 90 seconds. Your best is ' + (S().gym.sprintBest || 0) + '.' }));
      } else {
        body.appendChild(h('h2', { text: 'Sprint: 90 seconds' }));
        body.appendChild(h('p', { text: 'Answer as many drills as you can. Correct answers move on automatically; wrong ones show the answer and cost you time. Your best score is ' + (S().gym.sprintBest || 0) + '.' }));
      }
      body.appendChild(h('button', { class: 'btn primary', type: 'button', id: 'sprint-go', text: result ? 'Go again' : 'Start sprint', onclick: startSprint }));
      card.appendChild(body);
      timerBar.firstChild.style.width = '100%';
    }
    function startSprint() {
      st.combo = 0;
      st.sprint = { end: Date.now() + SPRINT_SECONDS * 1000, score: 0 };
      st.timer = setInterval(function () {
        const left = st.sprint.end - Date.now();
        timerBar.firstChild.style.width = Math.max(0, (left / (SPRINT_SECONDS * 1000)) * 100) + '%';
        timerBar.classList.toggle('low', left < 15000);
        if (left <= 0) {
          const score = st.sprint.score;
          stopSprint();
          const best = PB.sprintDone(score);
          drawStats();
          renderSprintStart({ score: score, best: best });
        }
      }, 200);
      st.inst = makeDrill(st.topic); st.phase = 'ask';
      renderAsk(); drawStats();
    }
    PB.setView([wrap], 'gym');
    PB.onViewDestroy(stopSprint);
    drawStats();
    next();
    window.scrollTo(0, 0);
  }
  function stopSprint() { if (st.timer) clearInterval(st.timer); st.timer = null; st.sprint = null; }

  /* ---------- Home: quests and gym call-out ---------- */
  PB.homeExtras = function (wrap) {
    const qs = PB.questsToday();
    const box = h('section', { class: 'quests' });
    const allDone = qs.every(function (q) { return q.done; });
    box.appendChild(h('div', { class: 'quests-head' }, [
      h('div', {}, [h('div', { class: 'eyebrow', text: "Today's quests" }), h('h3', { text: allDone ? 'All done. New quests tomorrow.' : 'Finish all three for a 40 XP bonus' })]),
      h('a', { class: 'btn', href: '#gym', text: 'Open the practice gym' })
    ]));
    const list = h('div', { class: 'quest-list' });
    qs.forEach(function (q) {
      list.appendChild(h('div', { class: 'quest' + (q.done ? ' done' : '') }, [
        h('span', { class: 'q-check', text: q.done ? '✓' : '' }),
        h('div', { class: 'q-main' }, [h('div', { class: 'q-text', text: q.text }), h('div', { class: 'q-bar' }, [h('span', { style: 'width:' + Math.round((q.progress / q.n) * 100) + '%' })])]),
        h('span', { class: 'q-meta', text: q.progress + '/' + q.n + ' · +' + q.xp + ' XP' })
      ]));
    });
    box.appendChild(list);
    wrap.appendChild(box);
  };

  /* ---------- Profile: activity heatmap and gym stats ---------- */
  PB.profileExtras = function (wrap) {
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Activity' }), h('p', { text: 'XP earned per day over the last 20 weeks' })]));
    const weeks = 20, grid = h('div', { class: 'heatmap', role: 'img', 'aria-label': 'Daily XP heatmap' });
    const today = new Date(); today.setHours(12);
    const start = new Date(today); start.setDate(today.getDate() - (weeks * 7 - 1) - today.getDay());
    let total = 0, days = 0;
    for (let i = 0; i < weeks * 7 + today.getDay() + 1; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      if (d > today) break;
      const xp = S().activity[PB.today(d)] || 0;
      if (xp) { total += xp; days++; }
      const lv = xp === 0 ? 0 : xp < 30 ? 1 : xp < 80 ? 2 : xp < 160 ? 3 : 4;
      grid.appendChild(h('span', { class: 'hm l' + lv, title: PB.today(d) + ': ' + xp + ' XP' }));
    }
    const scroller = h('div', { class: 'heatmap-wrap' }, [grid]);
    wrap.appendChild(scroller);
    const g = S().gym;
    wrap.appendChild(h('p', { style: 'color:var(--ink-2);font-size:14px;margin:10px 0 0', text: days + ' active days · ' + total + ' XP in this period · ' + (g.correct || 0) + ' gym drills correct (' + (g.answered ? Math.round((100 * g.correct) / g.answered) : 0) + '% accuracy) · ' + Object.keys(S().questDays || {}).length + ' days with all quests done' }));
  };

  PB.views = PB.views || {};
  PB.views.gym = view;
  // app.js routed before this file loaded; re-route views that use these hooks.
  const hs = decodeURIComponent((location.hash || '').replace(/^#/, ''));
  if (hs === 'gym') view();
  else if (hs === '' || hs === 'home' || hs === 'profile') window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
