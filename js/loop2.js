/* Scibook gamification, second layer. Built from what the best learning platforms do and what the research says:
   - combo bonus XP and Double XP boosts (Duolingo), earned by learning well rather than bought;
   - Khan-style mastery levels per chapter (Attempted, Familiar, Proficient, Mastered) and a course mastery %,
     with a no-hints Mastery Challenge that awards a crown;
   - a monthly challenge badge, personal bests and tiered achievements (Duolingo achievements);
   - gentle nudges (goal-gradient "almost there", streak at risk) and a welcome flow with a head start
     (endowed progress);
   - the league can be switched off (leaderboards make some learners anxious). */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const DAY = 86400000, BOOST_MIN = 15;
  function L2() {
    const s = S(); if (!s.loop2) s.loop2 = {};
    const l = s.loop2;
    l.boosts = l.boosts || 0; l.crowns = l.crowns || {}; l.monthly = l.monthly || {}; l.pb = l.pb || {}; l.tiers = l.tiers || {}; l.perfect = l.perfect || 0; l.combo = l.combo || 0; l.nudged = l.nudged || {};
    return l;
  }
  const today = () => PB.today();
  const give = (k, n, why) => { if (PB.rpg) PB.rpg.give(k, n, why, true); };

  /* ---------- Double XP boosts ---------- */
  PB.boostActive = () => (L2().boostUntil || 0) > Date.now();
  PB.grantBoost = function (n, why) { L2().boosts += n || 1; PB.save(); if (PB.toast) PB.toast('<span class="tx">⚡ 2×</span> Double XP boost earned' + (why ? ' · ' + why : '') + '. Activate it when you are ready to study.', 'badge-t'); if (PB.renderHUD) PB.renderHUD(); };
  PB.activateBoost = function () { const l = L2(); if (!l.boosts || PB.boostActive()) return false; l.boosts--; l.boostUntil = Date.now() + BOOST_MIN * 60000; PB.save(); if (PB.celebrate) PB.celebrate(60); if (PB.toast) PB.toast('<span class="tx">⚡ 2×</span> Double XP for ' + BOOST_MIN + ' minutes. Go!', 'badge-t'); if (PB.renderHUD) PB.renderHUD(); return true; };
  setInterval(() => { if (L2().boostUntil && PB.renderHUD) { if (!PB.boostActive()) { L2().boostUntil = 0; PB.save(); } PB.renderHUD(); } }, 20000);

  /* ---------- Mastery levels ---------- */
  const LEVELS = [['Not started', 0, '○'], ['Attempted', 0, '◔'], ['Familiar', 50, '◑'], ['Proficient', 80, '◕'], ['Mastered', 100, '👑']];
  function started(c) { return (S().mastery && S().mastery[c.id] && S().mastery[c.id].n > 0) || c.sections.some((_, i) => S().read[c.id + ':' + i]) || c.problems.some((p) => S().solved[p.id] || S().attempts[p.id]); }
  PB.masteryLevel = function (c) {
    const m = PB.mastery ? PB.mastery(c.id) : null;
    if (L2().crowns[c.id] && (m == null || m >= 0.6)) return 4;
    if (!started(c)) return 0;
    if (m == null || m < 0.4) return 1;
    if (m < 0.65) return 2;
    return 3;
  };
  PB.masteryLevelName = (lv) => LEVELS[lv][0];
  PB.courseMastery = function (sid) { const chs = PB.chaptersOf(sid); if (!chs.length) return 0; return chs.reduce((a, c) => a + LEVELS[PB.masteryLevel(c)][1], 0) / (100 * chs.length); };

  /* ---------- Combo bonus and personal bests ---------- */
  function bump(key, val, label) {
    const pb = L2().pb;
    if (val > (pb[key] || 0)) {
      const old = pb[key] || 0; pb[key] = val; PB.save();
      if (old >= 3 && !L2().nudged['pb-' + key + today()]) { L2().nudged['pb-' + key + today()] = 1; if (PB.toast) PB.toast('<span class="tx">PB</span> New personal best: ' + label(val), 'badge-t'); }
    }
  }
  PB.on(function (ev) {
    const l = L2();
    if (ev.type === 'answer' || ev.type === 'quiz') {
      const guided = ev.p && S().guided && S().guided[ev.p.id];
      const clean = ev.type === 'quiz' ? ev.first : ev.ok && S().solved[ev.p.id] && S().solved[ev.p.id].clean;
      if (ev.ok && clean && !guided) {
        l.combo++;
        bump('combo', l.combo, (v) => v + ' first-try answers in a row');
        if (l.combo >= 2) { const bonus = Math.min(10, 2 * l.combo); setTimeout(() => PB.addXP(bonus, 'Combo ×' + l.combo), 0); }
      } else if (!ev.ok) l.combo = 0;
      PB.save();
    }
    if (ev.type === 'xp' && ev.amount > 0) {
      if (PB.boostActive() && ev.reason !== 'XP boost') setTimeout(() => PB.addXP(ev.amount, 'XP boost'), 0);
      const tx = S().activity[today()] || 0;
      bump('dayXP', tx, (v) => v + ' XP in one day');
      nudgeGoal(); checkMonthly(); checkTiers();
    }
    if (ev.type === 'quest' && ev.quest && /All three/.test(ev.quest.text)) PB.grantBoost(1, 'all three daily quests');
    if (ev.type === 'session') { if (ev.perfect) { l.perfect++; PB.grantBoost(1, 'perfect session'); } PB.save(); checkTiers(); }
    if (ev.type === 'guidestep') checkTiers();
  });

  /* ---------- Nudges ---------- */
  function nudgeGoal() {
    if (!PB.dailyGoal) return;
    const g = PB.dailyGoal(), l = L2(), k = 'goal' + today();
    if (!g.done && g.xp >= 0.7 * g.goal && !l.nudged[k]) { l.nudged[k] = 1; PB.save(); if (PB.toast) PB.toast('<span class="tx">🎯</span> Only ' + (g.goal - g.xp) + ' XP to your daily goal!', 'badge-t'); }
  }

  /* ---------- Monthly challenge ---------- */
  const MONTH_XP = 1500;
  const month = () => today().slice(0, 7);
  function monthXP() { let s = 0; Object.keys(S().activity).forEach((k) => { if (k.slice(0, 7) === month()) s += S().activity[k]; }); return s; }
  const monthName = (m) => new Date(m + '-15T12:00:00').toLocaleString('en-GB', { month: 'long', year: 'numeric' });
  function checkMonthly() {
    const l = L2(), m = month();
    if (l.monthly[m] || monthXP() < MONTH_XP) return;
    l.monthly[m] = Date.now(); PB.save();
    give('gems', 150, 'monthly challenge');
    if (PB.rpg && PB.rpg.grantChest) PB.rpg.grantChest('premium');
    if (PB.rewardModal) PB.rewardModal({ icon: '📅', eyebrow: 'Monthly challenge complete', title: monthName(m) + ' badge earned', text: 'You earned ' + MONTH_XP + ' XP this month. The badge stays in your collection on the Level & badges page.', rewards: [['gems', 150], ['chest', 'premium']], big: true });
  }

  /* ---------- Tiered achievements ---------- */
  const ACH = [
    ['solver', '✏️', 'Problem Solver', 'problems solved', () => Object.keys(S().solved).length, [10, 50, 150, 400, 1000]],
    ['reader', '📖', 'Bookworm', 'sections read', () => Object.keys(S().read).length, [10, 40, 120, 300, 500]],
    ['thinker', '🧭', 'Careful Thinker', 'guided steps answered right', () => Object.keys(S().guideXP || {}).length, [10, 50, 150, 400, 1000]],
    ['explorer', '🔬', 'Experimenter', 'labs explored', () => Object.keys(S().labs || {}).length, [5, 20, 60, 150, 230]],
    ['master', '👑', 'Grand Master', 'chapters mastered (crowns)', () => Object.keys(L2().crowns).length, [1, 3, 10, 25, 60]],
    ['devoted', '🔥', 'Devoted', 'best streak (days)', () => Math.max(S().streak.best || 0, PB.streakAlive()), [3, 7, 30, 100, 365]],
    ['perfect', '🏆', 'Perfectionist', 'perfect practice sessions', () => L2().perfect, [1, 3, 10, 25, 50]]
  ];
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
  const tierOf = (a) => { const v = a[4](); let t = 0; a[5].forEach((x, i) => { if (v >= x) t = i + 1; }); return t; };
  function checkTiers(silent) {
    const l = L2();
    ACH.forEach((a) => {
      const t = tierOf(a), had = l.tiers[a[0]] || 0;
      if (t > had) { l.tiers[a[0]] = t; PB.save(); if (!silent) { give('gems', 25 * t, 'achievement'); if (PB.toast) PB.toast('<span class="tx">' + a[1] + ' ' + ROMAN[t] + '</span> ' + a[2] + ' ' + ROMAN[t] + ': +' + 25 * t + ' gems', 'badge-t'); } }
    });
  }
  if (!L2().tiersSeeded) { checkTiers(true); L2().tiersSeeded = 1; PB.save(); }

  /* ---------- Mastery challenge (no hints, 5 for 5) ---------- */
  const CH_N = 5;
  function viewChallenge(chId) {
    const ch = PB.chapter(chId), drills = PB.drills[chId] || [];
    if (!ch || !drills.length) { location.hash = '#ch-' + chId; return; }
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#ch-' + ch.id + '">' + PB.subject(ch.subject).name + ' · ' + ch.title + '</a>' }));
    wrap.appendChild(h('h1', { text: '👑 Mastery challenge', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: CH_N + ' fresh questions from this chapter, no hints and no guide. Get all ' + CH_N + ' right to earn the crown and Mastered level (like a unit test). You can retry as often as you like.' }));
    const stage = h('div'); wrap.appendChild(stage);
    let k = 0, right = 0;
    const seed = (Date.now() % 1e6) >>> 0;
    function ask() {
      stage.innerHTML = '';
      if (k >= CH_N) return done();
      const d = drills[(k + seed) % drills.length], inst = d.gen(PB.rng(seed * 31 + k * 977));
      const card = h('article', { class: 'prob challenge-card' });
      card.appendChild(h('div', { class: 'prob-top' }, [h('span', { class: 'prob-id', text: 'Question ' + (k + 1) + ' of ' + CH_N }), h('span', { class: 'prob-title', text: d.title }), h('span', { class: 'spacer' }), h('span', { class: 'chip', text: '♛ ' + right + ' right' })]));
      const body = h('div', { class: 'prob-body' }, [h('div', { class: 'prob-q', html: inst.q })]);
      const inp = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'Your answer', 'aria-label': 'Your answer' });
      const fb = h('div');
      const go = () => { const ok = PB.drillOk(inst, inp.value); if (ok === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number.' })); return; } inp.disabled = true; btn.disabled = true; PB.emit({ type: 'drill', chapter: chId, ok: ok }); if (ok) right++; fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), text: ok ? 'Correct.' : 'Not quite: ' + PB.fmt(inst.answer, 4) + (inst.unit ? ' ' + String(inst.unit).replace(/<[^>]+>/g, '') : '') + '.' })); if (!ok && inst.solution) { const so = h('div', { class: 'solution', html: '<b>How to do it</b>' + inst.solution }); fb.appendChild(so); PB.typeset(so); } k++; fb.appendChild(h('div', { class: 'hero-cta' }, [h('button', { class: 'btn primary', type: 'button', id: 'ch-next', text: k >= CH_N ? 'See result' : 'Next question →', onclick: ask })])); setTimeout(() => { const n = document.getElementById('ch-next'); if (n) n.focus(); }, 30); };
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!inp.disabled) go(); } });
      const btn = h('button', { class: 'btn primary', type: 'button', text: 'Submit', onclick: go });
      body.appendChild(h('div', { class: 'num-row' }, [inp, inst.unit ? h('span', { class: 'unit', html: inst.unit }) : null, btn]));
      body.appendChild(fb); card.appendChild(body); stage.appendChild(card); PB.typeset(card);
      setTimeout(() => inp.focus({ preventScroll: true }), 30);
    }
    function done() {
      const pass = right >= CH_N, l = L2(), first = pass && !l.crowns[chId];
      if (pass) { l.crowns[chId] = Date.now(); PB.save(); checkTiers(); }
      if (first) { give('gems', 100, 'mastery'); give('keys', 1, 'mastery'); }
      stage.appendChild(h('section', { class: 'session-end' + (pass ? ' perfect' : '') }, [
        h('div', { class: 'session-ico', text: pass ? '👑' : '💪' }),
        h('h2', { text: pass ? 'Chapter mastered!' : right + ' of ' + CH_N + ': not quite yet' }),
        h('p', { text: pass ? (first ? 'Crown earned: +100 gems and a key. ' : '') + 'This chapter now shows as Mastered.' : 'Mastery needs all ' + CH_N + '. Review what you missed (adaptive practice is a good warm-up), then try again.' }),
        h('div', { class: 'hero-cta' }, [h('button', { class: 'btn primary', type: 'button', text: pass ? 'Do it again' : 'Retry now', onclick: () => viewChallenge(chId) }), h('a', { class: 'btn', href: '#adapt-' + chId, text: 'Adaptive practice' }), h('a', { class: 'btn ghost', href: '#ch-' + chId, text: 'Back to the chapter' })])
      ]));
      if (pass && PB.celebrate) PB.celebrate(150);
    }
    PB.setView([wrap], ch.id);
    ask();
    window.scrollTo(0, 0);
  }
  PB.views = PB.views || {};
  PB.chapters.forEach((c) => { PB.views['challenge-' + c.id] = () => viewChallenge(c.id); });

  /* ---------- Hooks: chapter page, chapter cards, subject header ---------- */
  const prevHead = PB.chapterHeadExtras;
  PB.chapterHeadExtras = function (ch, head) {
    if (prevHead) prevHead(ch, head);
    const lv = PB.masteryLevel(ch), row = head.querySelector('.ch-mastery') || head;
    row.appendChild(h('span', { class: 'mlevel lv' + lv, title: 'Khan-style mastery level', text: LEVELS[lv][2] + ' ' + LEVELS[lv][0] }));
    if ((PB.drills[ch.id] || []).length) row.appendChild(h('a', { class: 'btn small' + (lv >= 3 && lv < 4 ? ' primary' : ''), href: '#challenge-' + ch.id, text: lv >= 4 ? '👑 Re-take challenge' : '👑 Mastery challenge' }));
  };
  PB.cardBadge = function (c, el) { const lv = PB.masteryLevel(c); if (lv) el.appendChild(h('span', { class: 'mlevel-dot lv' + lv, title: LEVELS[lv][0], text: LEVELS[lv][2] })); };
  PB.subjectHeadExtras = function (sid, wrap) {
    const cm = PB.courseMastery(sid), chs = PB.chaptersOf(sid), counts = [0, 0, 0, 0, 0];
    chs.forEach((c) => counts[PB.masteryLevel(c)]++);
    wrap.appendChild(h('div', { class: 'course-mastery' }, [h('b', { text: 'Course mastery ' + Math.round(cm * 100) + '%' }), h('span', { class: 'xpbar lg', html: '<span style="width:' + Math.round(cm * 100) + '%"></span>' }), h('small', { text: LEVELS.slice(1).map((x, i) => x[2] + ' ' + counts[i + 1] + ' ' + x[0]).join(' · ') + '. Familiar counts 50%, Proficient 80%, Mastered 100%.' })]));
  };

  /* ---------- HUD boost chip ---------- */
  const prevHud = PB.hudExtras;
  PB.hudExtras = function (box) {
    if (prevHud) prevHud(box);
    if (PB.boostActive()) { const m = Math.ceil((L2().boostUntil - Date.now()) / 60000); box.insertBefore(h('span', { class: 'hud-boost', title: 'Double XP active', text: '⚡2× ' + m + 'm' }), box.firstChild); }
  };

  /* ---------- Dashboard additions ---------- */
  const prevTop = PB.homeTop;
  PB.homeTop = function (wrap) {
    const l = L2(), st = PB.streakAlive(), hr = new Date().getHours(), g = PB.dailyGoal ? PB.dailyGoal() : null;
    if (st > 0 && S().streak.last !== today() && hr >= 17) wrap.appendChild(h('div', { class: 'nudge-banner' }, [h('span', { text: '🔥' }), h('div', {}, [h('b', { text: 'Your ' + st + '-day streak ends at midnight.' }), h('small', { text: ' One correct answer keeps it alive' + (L2().boosts ? '' : '') + '.' })]), h('a', { class: 'btn small primary', href: '#adapt', text: 'Quick session' })]));
    if (prevTop) prevTop(wrap);
    const row = h('div', { class: 'today' });
    const mx = monthXP(), mm = month();
    row.appendChild(h('div', { class: 'today-card monthly' + (l.monthly[mm] ? ' done' : '') }, [h('div', { class: 'eyebrow', text: '📅 ' + monthName(mm) + ' challenge' }), h('h3', { text: l.monthly[mm] ? 'Badge earned! 🎉' : 'Earn ' + MONTH_XP + ' XP this month' }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.min(100, Math.round(100 * mx / MONTH_XP)) + '%"></span>' }), h('small', { text: Math.min(mx, MONTH_XP) + ' / ' + MONTH_XP + ' XP · reward: 150 gems, a chest and the month’s badge' })]));
    row.appendChild(h('div', { class: 'today-card boost' + (PB.boostActive() ? ' on' : '') }, [h('div', { class: 'eyebrow', text: '⚡ Double XP' }), h('h3', { text: PB.boostActive() ? 'Active: ' + Math.ceil((l.boostUntil - Date.now()) / 60000) + ' min left' : l.boosts + ' boost' + (l.boosts === 1 ? '' : 's') + ' ready' }), PB.boostActive() ? h('small', { text: 'Everything you earn counts double.' }) : l.boosts ? h('button', { class: 'btn small primary', type: 'button', text: 'Activate for ' + BOOST_MIN + ' min', onclick: () => { PB.activateBoost(); PB.route(); } }) : h('small', { text: 'Earn boosts from all three daily quests, perfect sessions and the Study Pass.' })]));
    row.appendChild(h('div', { class: 'today-card combo' }, [h('div', { class: 'eyebrow', text: '🔥 Combo' }), h('h3', { text: l.combo >= 2 ? '×' + l.combo + ' right now' : 'Build a combo' }), h('small', { text: 'Each first-try correct answer in a row adds bonus XP (up to +10). Best: ' + (l.pb.combo || 0) + '.' })]));
    wrap.appendChild(row);
  };

  /* ---------- Profile: mastery, achievements, personal bests, monthly badges ---------- */
  const prevProf = PB.profileExtras;
  PB.profileExtras = function (wrap) {
    if (prevProf) prevProf(wrap);
    const l = L2();
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Achievements' }), h('p', { text: 'Five tiers each; every tier pays gems.' })]));
    const g = h('div', { class: 'ach-grid' });
    ACH.forEach((a) => { const v = a[4](), t = tierOf(a), nx = a[5][t] || a[5][4], pv = t >= 5 ? 1 : (v - (a[5][t - 1] || 0)) / (nx - (a[5][t - 1] || 0)); g.appendChild(h('div', { class: 'ach tier' + t }, [h('span', { class: 'ach-ico', text: a[1] }), h('div', {}, [h('b', { text: a[2] + (t ? ' ' + ROMAN[t] : '') }), h('span', { class: 'xpbar', html: '<span style="width:' + Math.round(Math.max(0, Math.min(1, pv)) * 100) + '%"></span>' }), h('small', { text: v + ' ' + a[3] + (t < 5 ? ' · next tier at ' + nx : ' · maxed!') })])])); });
    wrap.appendChild(g);
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Personal bests' })]));
    const lg = S().loop && S().loop.league ? S().loop.league : {};
    const TIERN = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 'Emerald', 'Amethyst', 'Pearl', 'Obsidian', 'Diamond'];
    wrap.appendChild(h('div', { class: 'stat-row pb-row' }, [[(S().streak.best || 0) + ' d', 'longest streak'], [String(l.pb.dayXP || 0), 'most XP in a day'], [String(l.pb.combo || 0), 'longest combo'], [TIERN[lg.best || 0], 'highest league'], [String(l.perfect), 'perfect sessions'], [String(Object.keys(l.crowns).length), 'crowns']].map((x) => h('div', { class: 'stat' }, [h('b', { text: x[0] }), h('span', { text: x[1] })]))));
    const months = Object.keys(l.monthly).sort();
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Monthly badges' }), h('p', { text: months.length ? months.length + ' collected' : 'Earn ' + MONTH_XP + ' XP in a month to collect its badge.' })]));
    if (months.length) wrap.appendChild(h('div', { class: 'month-badges' }, months.map((m) => h('div', { class: 'month-badge' }, [h('span', { text: '📅' }), h('b', { text: monthName(m) })]))));
  };

  /* ---------- League opt-out ---------- */
  PB.leagueHidden = () => !!L2().noLeague;
  PB.setLeagueHidden = (v) => { L2().noLeague = !!v; PB.save(); };

  /* ---------- Welcome: goal, subject and a head start ---------- */
  function welcome() {
    const l = L2();
    if (l.welcomed) return;
    if (S().xp > 0) { l.welcomed = 1; PB.save(); return; }
    let goal = 60;
    const ov = h('div', { class: 'reward-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Welcome' });
    const close = () => { ov.classList.add('out'); setTimeout(() => ov.remove(), 220); };
    const box = h('div', { class: 'reward-box welcome' }, [h('div', { class: 'reward-icon', text: '👋' }), h('h2', { text: 'Welcome to Scibook' }), h('p', { text: 'Pick a daily goal you can keep. Small and steady beats big and rare.' })]);
    const seg = h('div', { class: 'seg', role: 'group' });
    [[20, 'Casual · 20'], [60, 'Regular · 60'], [120, 'Serious · 120'], [200, 'Intense · 200']].forEach((x) => seg.appendChild(h('button', { type: 'button', class: x[0] === goal ? 'on' : '', text: x[1] + ' XP', onclick: (e) => { goal = x[0]; seg.querySelectorAll('button').forEach((b) => b.classList.remove('on')); e.currentTarget.classList.add('on'); } })));
    box.appendChild(seg);
    box.appendChild(h('p', { text: 'Then choose where to start:', style: 'margin-top:14px' }));
    const subs = h('div', { class: 'welcome-subs' });
    PB.SUBJECTS.forEach((sub) => subs.appendChild(h('button', { class: 'welcome-sub subj-' + sub.id, type: 'button', onclick: () => { if (!S().loop) S().loop = {}; S().loop.goal = goal; S().subject = sub.id; l.welcomed = 1; PB.save(); close(); PB.addXP(10, 'Welcome bonus: you’re on your way'); location.hash = '#' + sub.id; } }, [h('span', { class: 'subj-badge', text: sub.mark }), h('b', { text: sub.name })])));
    box.appendChild(subs);
    box.appendChild(h('small', { style: 'display:block;margin-top:10px;color:var(--ink-3)', text: 'You start with a 10 XP head start towards today’s goal.' }));
    ov.appendChild(box);
    document.body.appendChild(ov);
  }
  setTimeout(welcome, 800);
  PB.route();
})();
