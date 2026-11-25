/* Scibook motivation loop. Learning earns XP; XP fills the daily goal and keeps the streak; milestones pay
   coins, gems, boosts and mystery boxes (js/wallet.js). Every milestone (goal met, streak, chapter star,
   chapter passed, mastery) is celebrated with a reward. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const ICON = { coins: '◉', gems: '💎', xp: '✦', boost: '⚡', freeze: '🧊' };
  const NAME = { coins: 'coins', gems: 'gems', xp: 'XP', boost: 'Double XP boost', freeze: 'streak freeze' };
  const DAY = 86400000;
  function L() {
    const s = S();
    if (!s.loop) s.loop = {};
    const l = s.loop;
    l.goal = l.goal || 60; l.goalDays = l.goalDays || {}; l.freezes = l.freezes || 0; l.streakPaid = l.streakPaid || {};
    l.pass = l.pass || {}; l.stars = l.stars || {}; l.passed = l.passed || {}; l.mastery = l.mastery || {}; l.league = l.league || { tier: 0 };
    return l;
  }
  const dayKey = (d) => PB.today(d);
  const todayXP = () => S().activity[dayKey()] || 0;

  /* ---------- Paying rewards ---------- */
  function pay(rewards, why) {
    rewards.forEach((r) => {
      if (r[0] === 'xp') PB.addXP(r[1], why);
      else if (r[0] === 'box') { if (PB.openBox) setTimeout(() => PB.openBox(r[1], why), 400); }
      else if (r[0] === 'boost') { if (PB.grantBoost) PB.grantBoost(r[1], why); }
      else if (r[0] === 'freeze') { const l = L(); l.freezes = Math.min(2, l.freezes + r[1]); PB.save(); }
      else if (PB.wallet) PB.wallet.give(r[0], r[1], why, true);
    });
    PB.save();
    if (PB.renderHUD) PB.renderHUD();
  }
  const chip = (r) => h('span', { class: 'reward-chip' }, [h('b', { text: r[0] === 'box' ? '🎁' : ICON[r[0]] }), h('span', { text: r[0] === 'box' ? (r[1] === 'premium' ? 'Premium mystery box' : 'Mystery box') : '+' + r[1] + ' ' + NAME[r[0]] })]);

  /* ---------- Reward modal and celebrations ---------- */
  const queue = [];
  let showing = false;
  PB.rewardModal = function (o) { queue.push(o); if (!showing) nextModal(); };
  function nextModal() {
    if (!queue.length) { showing = false; return; }
    // Do not interrupt a fight mid-question: wait until the battle is over or left.
    if (document.querySelector('.raid-stage .raid-q')) { showing = true; setTimeout(nextModal, 1000); return; }
    const o = queue.shift();
    showing = true;
    const close = () => { ov.classList.add('out'); setTimeout(() => { ov.remove(); nextModal(); }, 220); };
    const ov = h('div', { class: 'reward-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': o.title, onclick: (e) => { if (e.target === ov) close(); } }, [
      h('div', { class: 'reward-box ' + (o.tone || '') }, [
        h('div', { class: 'reward-rays' }),
        h('div', { class: 'reward-icon', text: o.icon || '🎁' }),
        h('div', { class: 'eyebrow', text: o.eyebrow || 'Reward' }),
        h('h2', { text: o.title }),
        o.text ? h('p', { html: o.text }) : null,
        o.rewards && o.rewards.length ? h('div', { class: 'reward-chips' }, o.rewards.map(chip)) : null,
        h('button', { class: 'btn primary', type: 'button', text: o.button || 'Collect', onclick: close })
      ])
    ]);
    document.body.appendChild(ov);
    PB.celebrate(o.big ? 140 : 70);
    setTimeout(() => { const b = ov.querySelector('button'); if (b) b.focus(); }, 50);
  }
  let fx = null;
  PB.celebrate = function (n, x, y) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!fx) { fx = document.createElement('canvas'); fx.className = 'fx-canvas'; document.body.appendChild(fx); fx.parts = []; }
    const W = window.innerWidth, H = window.innerHeight, dpr = window.devicePixelRatio || 1;
    if (fx.width !== W * dpr) { fx.width = W * dpr; fx.height = H * dpr; }
    const C = PB.colors ? PB.colors() : {}, cols = [C.accent || '#2350c8', C.points || '#c9640f', C.good || '#1d8549', C.rust || '#bf3426', '#f5c518', '#b05cff'];
    x = x == null ? W / 2 : x; y = y == null ? H * 0.38 : y;
    for (let i = 0; i < (n || 60); i++) { const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 8; fx.parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, r: 3 + Math.random() * 4, c: cols[i % cols.length], life: 60 + Math.random() * 40, rot: Math.random() * 6 }); }
    if (fx.running) return;
    fx.running = true;
    const ctx = fx.getContext('2d');
    const tick = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      fx.parts = fx.parts.filter((p) => p.life > 0);
      fx.parts.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.vx *= 0.985; p.life--; p.rot += 0.2; ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 30); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore(); });
      if (fx.parts.length) requestAnimationFrame(tick); else { fx.running = false; ctx.clearRect(0, 0, W, H); }
    };
    requestAnimationFrame(tick);
  };
  // Floating "+XP" next to the card you just solved.
  function floatText(el, txt) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = h('div', { class: 'float-xp', text: txt, style: 'left:' + Math.round(r.left + r.width - 120) + 'px;top:' + Math.round(r.top + 10) + 'px' });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1300);
    PB.celebrate(18, r.left + r.width - 60, r.top + 24);
  }

  /* ---------- Daily goal and streak ---------- */
  const GOALS = [[20, 'Casual'], [60, 'Regular'], [120, 'Serious'], [200, 'Intense']];
  const goalReward = (g) => [['coins', 40 + g], ['coins', 40], ['coins', 10 * (g >= 120 ? 3 : g >= 60 ? 2 : 1)]];
  const STREAK = [[3, [['gems', 50]]], [7, [['gems', 100], ['coins', 80]]], [14, [['gems', 150], ['box', 'premium']]], [30, [['gems', 300], ['box', 'common']]], [60, [['gems', 500], ['box', 'premium']]], [100, [['gems', 1000], ['box', 'premium']]]];
  PB.dailyGoal = () => ({ goal: L().goal, xp: todayXP(), done: !!L().goalDays[dayKey()] });
  function applyFreezes() {
    const s = S().streak, l = L();
    if (!s.last || !s.count) return;
    const last = new Date(s.last + 'T12:00:00'), now = new Date(dayKey() + 'T12:00:00');
    const missed = Math.round((now - last) / DAY) - 1;
    if (missed >= 1 && missed <= l.freezes) {
      l.freezes -= missed;
      const y = new Date(); y.setDate(y.getDate() - 1);
      s.last = dayKey(y);
      PB.save();
      setTimeout(() => PB.rewardModal({ icon: '🧊', eyebrow: 'Streak saved', title: missed === 1 ? 'A streak freeze kept your streak alive' : missed + ' streak freezes kept your streak alive', text: 'Your ' + s.count + '-day streak is safe. ' + l.freezes + ' freeze' + (l.freezes === 1 ? '' : 's') + ' left.', button: 'Keep going' }), 600);
    }
  }
  function checkGoal() {
    const l = L(), d = dayKey();
    if (l.goalDays[d] || todayXP() < l.goal) return;
    l.goalDays[d] = true;
    const rw = goalReward(l.goal);
    pay(rw, 'daily goal');
    PB.rewardModal({ icon: '🎯', eyebrow: 'Daily goal reached', title: l.goal + ' XP today!', text: 'Streak: <b>' + PB.streakAlive() + ' day' + (PB.streakAlive() === 1 ? '' : 's') + '</b>. Come back tomorrow to keep it going.', rewards: rw, big: true });
    const st = PB.streakAlive();
    STREAK.forEach((m) => { if (st >= m[0] && !l.streakPaid[m[0]]) { l.streakPaid[m[0]] = true; pay(m[1], m[0] + '-day streak'); PB.rewardModal({ icon: '🔥', eyebrow: 'Streak milestone', title: m[0] + '-day streak!', text: 'Showing up every day is the habit that makes the biggest difference.', rewards: m[1], big: true }); } });
  }

  /* ---------- Chapter stars, passes and mastery ---------- */
  const STAR_RW = { 1: [['coins', 120], ['coins', 40]], 2: [['gems', 60], ['coins', 10 * (4)]], 3: [['gems', 120], ['box', 'premium']] };
  function checkChapter(ch) {
    if (!ch) return;
    const l = L(), st = PB.chapterStats(ch), had = l.stars[ch.id] || 0;
    if (st.stars > had) {
      l.stars[ch.id] = st.stars;
      for (let k = had + 1; k <= st.stars; k++) { const rw = STAR_RW[k] || STAR_RW[3]; pay(rw, 'chapter star'); PB.rewardModal({ icon: '⭐'.repeat(Math.min(3, k)), eyebrow: PB.subject(ch.subject).name + ' · ' + ch.title, title: k === 3 ? 'Three stars: chapter mastered!' : 'Star ' + k + ' of 3', text: ['', 'Every concept check solved.', 'Every core problem solved.', 'Every olympiad problem solved. Outstanding.'][k] || '', rewards: rw, big: k === 3 }); }
    }
    if (!l.passed[ch.id] && PB.isPassed && PB.isPassed(ch)) { l.passed[ch.id] = true; pay([['coins', 120]], 'chapter passed'); if (PB.toast) PB.toast('<span class="tx">Passed</span> ' + ch.title + ': +1 key, +80 gold', 'badge-t'); }
    PB.save();
  }
  function checkMastery(chId) {
    if (!PB.mastery) return;
    const m = PB.mastery(chId), l = L(), best = l.mastery[chId] || 0;
    [[0.5, 1, [['gems', 20]]], [0.8, 2, [['gems', 50], ['coins', 40]]]].forEach((t) => { if (m >= t[0] && best < t[1]) { l.mastery[chId] = t[1]; pay(t[2], 'mastery'); if (PB.toast) PB.toast('<span class="tx">Mastery</span> ' + PB.chapter(chId).title + ' reached ' + Math.round(t[0] * 100) + '%: ' + t[2].map((r) => ICON[r[0]] + r[1]).join(' '), 'badge-t'); } });
  }

  /* ---------- Event wiring ---------- */
  PB.on(function (ev) {
    if (ev.type === 'xp' && ev.amount > 0) {
      checkGoal();
      const m = /^Solved (.+)$/.exec(ev.reason || '');
      if (m) {
        const p = PB.problem(m[1]);
        if (p) { setTimeout(() => floatText(document.getElementById('prob-' + p.id) || document.getElementById('inl-' + p.id), '+' + ev.amount + ' XP'), 30); checkChapter(PB.chapter(p.chapter)); }
      }
    }
    if (ev.type === 'answer' && ev.p) setTimeout(() => checkMastery(ev.p.chapter), 0);
    if (ev.type === 'drill' && ev.chapter) setTimeout(() => checkMastery(ev.chapter), 0);
    if (ev.type === 'levelup') PB.rewardModal({ icon: '⬆️', eyebrow: 'Level up', title: 'Level ' + ev.level + ': ' + ev.title, text: 'A new title and a level-up reward.', rewards: [['gems', 50], ['box', 'common']], big: true }) || pay([['gems', 50], ['box', 'common']], 'level up');
  });
  // Seed the star record for existing saves so old stars do not all pay out at once.
  (function seed() { const l = L(); if (!l.seeded) { PB.chapters.forEach((c) => { const st = PB.chapterStats(c); if (st.stars) l.stars[c.id] = st.stars; if (PB.isPassed && PB.isPassed(c)) l.passed[c.id] = true; }); l.seeded = true; PB.save(); } })();
  applyFreezes();

  /* ---------- HUD daily-goal ring ---------- */
  PB.hudExtras = function (box) {
    const g = PB.dailyGoal(), fr = Math.min(1, g.xp / g.goal), sz = 26, r = 10, c = 2 * Math.PI * r;
    box.insertBefore(h('a', { class: 'hud-goal' + (g.done ? ' done' : ''), href: '#goal', title: 'Daily goal: ' + g.xp + ' / ' + g.goal + ' XP', html: '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="3"/><circle cx="13" cy="13" r="' + r + '" fill="none" stroke="' + (g.done ? 'var(--good)' : 'var(--points)') + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + (c * fr) + ' ' + c + '" transform="rotate(-90 13 13)"/></svg><span>' + (g.done ? '✓' : Math.round(fr * 100) + '%') + '</span>' }), box.children[1] || null);
  };

  /* ---------- Dashboard: Today ---------- */
  PB.homeTop = function (wrap) {
    const g = PB.dailyGoal(), st = PB.streakAlive();
    const sec = h('section', { class: 'today' });
    const fr = Math.min(1, g.xp / g.goal), r = 34, c = 2 * Math.PI * r;
    sec.appendChild(h('div', { class: 'today-goal' }, [
      h('div', { class: 'goal-ring', html: '<svg viewBox="0 0 80 80" width="84" height="84"><circle cx="40" cy="40" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="7"/><circle cx="40" cy="40" r="' + r + '" fill="none" stroke="' + (g.done ? 'var(--good)' : 'var(--points)') + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (c * fr) + ' ' + c + '" transform="rotate(-90 40 40)"/></svg><b>' + g.xp + '</b><small>/ ' + g.goal + ' XP</small>' }),
      h('div', {}, [h('div', { class: 'eyebrow', text: 'Daily goal' }), h('h3', { text: g.done ? 'Done for today! 🎉' : (g.goal - g.xp) + ' XP to go' }), h('p', { html: '<span class="today-flame">🔥 ' + st + '</span> day streak' + (L().freezes ? ' · 🧊 ' + L().freezes + ' freeze' + (L().freezes > 1 ? 's' : '') : '') }), h('small', { text: 'Reward: ' + goalReward(g.goal).map((x) => ICON[x[0]] + x[1]).join('  ') })])
    ]));
    wrap.appendChild(sec);
    // Today's plan: the next best actions, each with its payoff.
    const plan = [];
    const cont = S().lastChapter && PB.chapter(S().lastChapter);
    if (cont) { const i = cont.sections.findIndex((_, k) => !S().read[cont.id + ':' + k]); if (i >= 0) plan.push(['📖', 'Read §' + cont.num + '.' + (i + 1) + ' ' + cont.sections[i].title.replace(/<[^>]+>/g, ''), '+5 XP', '#ch-' + cont.id, function () { PB.pendingSection = i; }]); else { const pnext = cont.problems.find((p) => !S().solved[p.id] && !S().revealed[p.id]); if (pnext) plan.push(['✏️', 'Solve ' + (pnext.title || 'a problem') + ' in ' + cont.title, '+' + PB.available(pnext) + ' XP', '#ch-' + cont.id + '--problems']); } }
    const due = PB.reviewsDue ? PB.reviewsDue().length : 0;
    plan.push(due ? ['🔁', due + ' review' + (due > 1 ? 's' : '') + ' due in adaptive practice', 'locks in memory', '#adapt'] : ['🎯', 'Adaptive practice: questions at your level', '+XP & mastery', '#adapt']);
    const dp = PB.dailyProblem && PB.dailyProblem();
    if (dp && !S().solved[dp.id]) plan.push(['⚡', 'Today’s ×2 challenge: ' + (dp.title || 'problem'), '+' + dp.points * 2 + ' XP, +1 key', '#ch-' + dp.chapter + '--problems']);
    const pl = h('div', { class: 'plan' }, [h('div', { class: 'eyebrow', text: 'Today’s plan' })]);
    plan.slice(0, 4).forEach((p) => pl.appendChild(h('a', { class: 'plan-row', href: p[3], onclick: p[4] || null }, [h('span', { class: 'plan-ico', text: p[0] }), h('span', { class: 'plan-txt', text: p[1] }), h('span', { class: 'plan-rw', text: p[2] }), h('span', { class: 'plan-go', text: '→' })])));
    wrap.appendChild(pl);
  };

  /* ---------- Page: daily goal and streak ---------- */
  function viewGoal() {
    const l = L();
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Habits' }));
    wrap.appendChild(h('h1', { text: 'Daily goal and streak', style: 'font-size:34px;margin-top:6px' }));
    // Settings: daily goal and streak freezes.
    const set = h('section', { class: 'lock-box' }, [h('h2', { text: 'Daily goal' }), h('p', { text: 'Pick a goal you can keep. Reaching it pays coins and keeps your streak.' })]);
    const seg = h('div', { class: 'seg', role: 'group' });
    GOALS.forEach((gg) => seg.appendChild(h('button', { type: 'button', class: l.goal === gg[0] ? 'on' : '', text: gg[1] + ' · ' + gg[0] + ' XP', onclick: () => { l.goal = gg[0]; PB.save(); if (PB.renderHUD) PB.renderHUD(); viewGoal(); } })));
    set.appendChild(seg);
    const gemsNow = PB.wallet ? PB.wallet.gems() : 0;
    set.appendChild(h('h2', { text: 'Streak freeze', style: 'margin-top:16px' }));
    set.appendChild(h('p', { text: 'A freeze is used automatically if you miss a day, so your streak survives. You can hold two. You have ' + l.freezes + '.' }));
    set.appendChild(h('button', { class: 'btn', type: 'button', disabled: l.freezes >= 2 || gemsNow < 200, text: 'Buy a freeze: 💎 200', onclick: () => { if (l.freezes >= 2 || !PB.wallet || !PB.wallet.spend('gems', 200)) return; l.freezes++; PB.save(); PB.renderHUD(); viewGoal(); } }));
    const ms = h('div', { class: 'streak-row' });
    STREAK.forEach((m) => ms.appendChild(h('div', { class: 'streak-ms' + (l.streakPaid[m[0]] ? ' got' : '') }, [h('b', { text: '🔥 ' + m[0] }), h('div', {}, m[1].map(chip))])));
    set.appendChild(h('h2', { text: 'Streak milestones', style: 'margin-top:16px' }));
    set.appendChild(ms);
    wrap.appendChild(set);
    PB.setView([wrap], 'goal');
    window.scrollTo(0, 0);
  }
  PB.views = PB.views || {};
  PB.views.goal = viewGoal;
  PB.views.pass = viewGoal;
})();
