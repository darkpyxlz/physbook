/* Scibook motivation loop. Learning earns XP; XP fills the daily goal, the monthly Study Pass and the weekly
   league; those pay out coins, gems, boosts and mystery boxes (js/wallet.js). Every milestone (goal met, star earned, tier reached, league finished) is celebrated with a reward. */
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

  /* ---------- Study Pass (monthly) ---------- */
  const TIER_XP = 150, TIERS = 40;
  const season = () => dayKey().slice(0, 7);
  function seasonXP() { const p = season(); let s = 0; Object.keys(S().activity).forEach((k) => { if (k.slice(0, 7) === p) s += S().activity[k]; }); return s; }
  function tierReward(t) {
    if (t % 10 === 0) return [['box', 'premium'], ['gems', 100]];
    if (t % 5 === 0) return [['box', 'common']];
    return [[['coins', 150 + 10 * t]], [['coins', 40]], [['coins', 10 * (4)]], [['gems', 40]], [['boost', 1]], [['coins', 250 + 10 * t], ['coins', 40]], [['coins', 10 * (6)]], [['gems', 60]]][t % 8];
  }
  function passState() { const l = L(); if (l.pass.season !== season()) { l.pass = { season: season(), claimed: {} }; } const xp = seasonXP(); return { xp: xp, tier: Math.min(TIERS, Math.floor(xp / TIER_XP)), claimed: l.pass.claimed }; }
  PB.passState = passState;
  function claimTier(t) { const ps = passState(); if (t > ps.tier || ps.claimed[t]) return null; ps.claimed[t] = true; const rw = tierReward(t); pay(rw, 'Study Pass tier ' + t); PB.save(); return rw; }
  let lastTier = null;
  function checkTier() { const ps = passState(); if (lastTier == null) { lastTier = ps.tier; return; } if (ps.tier > lastTier) { const t = ps.tier; lastTier = t; if (PB.toast) PB.toast('<span class="tx">Pass</span> Study Pass tier ' + t + ' reached: claim your reward', 'badge-t'); PB.celebrate(50); } }

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

  /* ---------- Weekly league with rival study bots ---------- */
  const TIERN = [['Bronze', '🥉'], ['Silver', '🥈'], ['Gold', '🥇'], ['Sapphire', '🔷'], ['Ruby', '🔴'], ['Emerald', '🟢'], ['Amethyst', '🟣'], ['Pearl', '⚪'], ['Obsidian', '⚫'], ['Diamond', '💎']];
  const RIVALS = ['QuarkQueen', 'EulerFan', 'MoleMan', 'PhotonPete', 'DrDendrite', 'Nebula9', 'Fermat42', 'LeibnizLad', 'HookesLaw', 'RiemannRider', 'TitrateTaro', 'KelvinK', 'Mitochondria', 'PulsarPal', 'GaussGirl', 'VectorVic', 'Isotopia', 'HelixHana', 'Orbitron', 'Catalyst', 'NoetherNote', 'Bohrderline', 'Synapse', 'Darwinian', 'Entropy', 'Lagrangian', 'Covalent', 'Redshift', 'Mendelian', 'Prime_Time'];
  function weekStart(d) { d = new Date(d || Date.now()); const day = (d.getDay() + 6) % 7; d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - day); return d; }
  const weekKey = (d) => dayKey(weekStart(d));
  function weekXP(ws) { let s = 0; for (let i = 0; i < 7; i++) { const d = new Date(ws); d.setDate(d.getDate() + i); s += S().activity[dayKey(d)] || 0; } return s; }
  function rivals(wk, tier, frac) {
    const r = PB.rng(parseInt(wk.replace(/-/g, ''), 10) * 31 + tier * 7919);
    const pool = RIVALS.slice(), out = [];
    for (let i = 0; i < 14; i++) {
      const name = pool.splice(Math.floor(r() * pool.length), 1)[0];
      const pace = 28 * Math.pow(1.38, tier) * Math.exp(0.65 * (r() + r() + r() - 1.5)) * 7;
      const shape = 0.7 + 0.6 * r();
      out.push({ name: name, xp: Math.round(pace * Math.pow(Math.max(0, Math.min(1, frac)), shape)) });
    }
    return out;
  }
  function standings(wk, tier, myXP, frac) { const all = rivals(wk, tier, frac).concat([{ name: 'You', you: true, xp: myXP }]); all.sort((a, b) => b.xp - a.xp || (a.you ? -1 : 1)); return all; }
  function leagueNow() {
    const l = L(), ws = weekStart(), wk = weekKey();
    const frac = (Date.now() - ws.getTime()) / (7 * DAY);
    const list = standings(wk, l.league.tier, weekXP(ws), frac);
    return { tier: l.league.tier, list: list, rank: list.findIndex((x) => x.you) + 1, endsIn: 7 * DAY - (Date.now() - ws.getTime()) };
  }
  PB.leagueNow = leagueNow;
  function settleLeague() {
    const l = L(), wk = weekKey();
    if (!l.league.week) { l.league.week = wk; PB.save(); return; }
    if (l.league.week === wk) return;
    if (PB.leagueHidden && PB.leagueHidden()) { l.league.week = wk; PB.save(); return; }
    const prevStart = new Date(l.league.week + 'T00:00:00'), my = weekXP(prevStart);
    const tier = l.league.tier;
    l.league.week = wk;
    if (my <= 0) { PB.save(); return; }
    const list = standings(dayKey(prevStart), tier, my, 1), rank = list.findIndex((x) => x.you) + 1;
    let nt = tier, title, rw = [];
    if (rank <= 5 && tier < TIERN.length - 1) { nt = tier + 1; title = 'Promoted to the ' + TIERN[nt][0] + ' league!'; }
    else if (rank > 10 && tier > 0) { nt = tier - 1; title = 'Down to the ' + TIERN[nt][0] + ' league'; }
    else title = 'You stay in the ' + TIERN[tier][0] + ' league';
    if (rank === 1) rw = [['gems', 150 + 30 * tier], ['coins', 80], ['boost', 1]]; else if (rank === 2) rw = [['gems', 100 + 20 * tier], ['coins', 40], ['boost', 1]]; else if (rank === 3) rw = [['gems', 60 + 15 * tier]]; else if (rank <= 5) rw = [['coins', 200]];
    l.league.tier = nt; l.league.best = Math.max(l.league.best || 0, nt);
    if (rw.length) pay(rw, 'league');
    PB.save();
    setTimeout(() => PB.rewardModal({ icon: TIERN[nt][1], eyebrow: 'Last week you finished #' + rank + ' with ' + my + ' XP', title: title, text: 'Top 5 go up a league, bottom 5 go down. A new week has started.', rewards: rw, big: nt > tier }), 900);
  }

  /* ---------- Event wiring ---------- */
  PB.on(function (ev) {
    if (ev.type === 'xp' && ev.amount > 0) {
      checkGoal(); checkTier();
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
  settleLeague();
  lastTier = passState().tier;

  /* ---------- HUD daily-goal ring ---------- */
  PB.hudExtras = function (box) {
    const g = PB.dailyGoal(), fr = Math.min(1, g.xp / g.goal), sz = 26, r = 10, c = 2 * Math.PI * r;
    box.insertBefore(h('a', { class: 'hud-goal' + (g.done ? ' done' : ''), href: '#home', title: 'Daily goal: ' + g.xp + ' / ' + g.goal + ' XP', html: '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="3"/><circle cx="13" cy="13" r="' + r + '" fill="none" stroke="' + (g.done ? 'var(--good)' : 'var(--points)') + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + (c * fr) + ' ' + c + '" transform="rotate(-90 13 13)"/></svg><span>' + (g.done ? '✓' : Math.round(fr * 100) + '%') + '</span>' }), box.children[1] || null);
  };

  /* ---------- Dashboard: Today ---------- */
  const fmtLeft = (ms) => { const d = Math.floor(ms / DAY), hh = Math.floor((ms % DAY) / 3600000); return d ? d + 'd ' + hh + 'h' : hh + 'h'; };
  PB.homeTop = function (wrap) {
    const g = PB.dailyGoal(), ps = passState(), lg = leagueNow(), st = PB.streakAlive();
    const unclaimed = Object.keys(Array.from({ length: ps.tier })).filter((i) => !ps.claimed[+i + 1]).length;
    const sec = h('section', { class: 'today' });
    const fr = Math.min(1, g.xp / g.goal), r = 34, c = 2 * Math.PI * r;
    sec.appendChild(h('div', { class: 'today-goal' }, [
      h('div', { class: 'goal-ring', html: '<svg viewBox="0 0 80 80" width="84" height="84"><circle cx="40" cy="40" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="7"/><circle cx="40" cy="40" r="' + r + '" fill="none" stroke="' + (g.done ? 'var(--good)' : 'var(--points)') + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (c * fr) + ' ' + c + '" transform="rotate(-90 40 40)"/></svg><b>' + g.xp + '</b><small>/ ' + g.goal + ' XP</small>' }),
      h('div', {}, [h('div', { class: 'eyebrow', text: 'Daily goal' }), h('h3', { text: g.done ? 'Done for today! 🎉' : (g.goal - g.xp) + ' XP to go' }), h('p', { html: '<span class="today-flame">🔥 ' + st + '</span> day streak' + (L().freezes ? ' · 🧊 ' + L().freezes + ' freeze' + (L().freezes > 1 ? 's' : '') : '') }), h('small', { text: 'Reward: ' + goalReward(g.goal).map((x) => ICON[x[0]] + x[1]).join('  ') })])
    ]));
    sec.appendChild(h('a', { class: 'today-card pass', href: '#pass' }, [h('div', { class: 'eyebrow', text: 'Study Pass · ' + new Date().toLocaleString('en-GB', { month: 'long' }) }), h('h3', { text: 'Tier ' + ps.tier + ' / ' + TIERS }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(100 * (ps.tier >= TIERS ? 1 : (ps.xp % TIER_XP) / TIER_XP)) + '%"></span>' }), h('small', { text: unclaimed ? unclaimed + ' reward' + (unclaimed > 1 ? 's' : '') + ' to claim!' : (TIER_XP - ps.xp % TIER_XP) + ' XP to the next tier' }), unclaimed ? h('span', { class: 'claim-dot', text: unclaimed }) : null]));
    if (!(PB.leagueHidden && PB.leagueHidden())) sec.appendChild(h('a', { class: 'today-card league', href: '#league' }, [h('div', { class: 'eyebrow', text: TIERN[lg.tier][1] + ' ' + TIERN[lg.tier][0] + ' league' }), h('h3', { text: '#' + lg.rank + ' of 15' }), h('small', { text: (lg.rank <= 5 ? 'In the promotion zone' : lg.rank > 10 ? 'In the danger zone' : 'Safe') + ' · ends in ' + fmtLeft(lg.endsIn) })]));
    wrap.appendChild(sec);
    // Today's plan: the next best actions, each with its payoff.
    const plan = [];
    const cont = S().lastChapter && PB.chapter(S().lastChapter);
    if (cont) { const i = cont.sections.findIndex((_, k) => !S().read[cont.id + ':' + k]); if (i >= 0) plan.push(['📖', 'Read §' + cont.num + '.' + (i + 1) + ' ' + cont.sections[i].title.replace(/<[^>]+>/g, ''), '+5 XP', '#ch-' + cont.id, function () { PB.pendingSection = i; }]); else { const pnext = cont.problems.find((p) => !S().solved[p.id] && !S().revealed[p.id]); if (pnext) plan.push(['✏️', 'Solve ' + (pnext.title || 'a problem') + ' in ' + cont.title, '+' + PB.available(pnext) + ' XP', '#ch-' + cont.id + '--problems']); } }
    const due = PB.reviewsDue ? PB.reviewsDue().length : 0;
    plan.push(due ? ['🔁', due + ' review' + (due > 1 ? 's' : '') + ' due in adaptive practice', 'locks in memory', '#adapt'] : ['🎯', 'Adaptive practice: questions at your level', '+XP & mastery', '#adapt']);
    const dp = PB.dailyProblem && PB.dailyProblem();
    if (dp && !S().solved[dp.id]) plan.push(['⚡', 'Today’s ×2 challenge: ' + (dp.title || 'problem'), '+' + dp.points * 2 + ' XP, +1 key', '#ch-' + dp.chapter + '--problems']);
    if (unclaimed) plan.push(['🎁', 'Claim ' + unclaimed + ' Study Pass reward' + (unclaimed > 1 ? 's' : ''), 'free loot', '#pass']);
    else if (PB.raidAvailable && PB.raidAvailable()) plan.push(['🐉', 'This week’s raid is waiting', 'gems + box', '#raid']);
    const pl = h('div', { class: 'plan' }, [h('div', { class: 'eyebrow', text: 'Today’s plan' })]);
    plan.slice(0, 4).forEach((p) => pl.appendChild(h('a', { class: 'plan-row', href: p[3], onclick: p[4] || null }, [h('span', { class: 'plan-ico', text: p[0] }), h('span', { class: 'plan-txt', text: p[1] }), h('span', { class: 'plan-rw', text: p[2] }), h('span', { class: 'plan-go', text: '→' })])));
    wrap.appendChild(pl);
  };

  /* ---------- Pages: Study Pass and League ---------- */
  function viewPass() {
    const ps = passState(), l = L();
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Season ' + season() + ' · resets on the 1st' }));
    wrap.appendChild(h('h1', { text: 'Study Pass', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every ' + TIER_XP + ' XP you earn this month unlocks a tier of free rewards: coins, gems, Double XP boosts and mystery boxes, with a box every fifth tier and a premium box every tenth. All XP counts: reading, labs, problems, quizzes, drills and quests.' }));
    const pct = Math.min(1, ps.xp / (TIER_XP * TIERS));
    wrap.appendChild(h('div', { class: 'pass-head' }, [h('b', { text: 'Tier ' + ps.tier + ' / ' + TIERS }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(pct * 100) + '%"></span>' }), h('small', { text: ps.xp + ' XP this month' })]));
    const unclaimed = []; for (let t = 1; t <= ps.tier; t++) if (!ps.claimed[t]) unclaimed.push(t);
    if (unclaimed.length) wrap.appendChild(h('div', { class: 'hero-cta' }, [h('button', { class: 'btn primary', type: 'button', text: 'Claim all ' + unclaimed.length + ' rewards', onclick: () => { let all = []; unclaimed.forEach((t) => { const rw = claimTier(t); if (rw) all = all.concat(rw); }); PB.rewardModal({ icon: '🎁', eyebrow: 'Study Pass', title: unclaimed.length + ' tiers claimed', rewards: all, big: true }); viewPass(); } })]));
    const grid = h('div', { class: 'pass-grid' });
    for (let t = 1; t <= TIERS; t++) {
      const got = ps.claimed[t], open = t <= ps.tier, rw = tierReward(t);
      grid.appendChild(h('div', { class: 'pass-tier' + (got ? ' got' : open ? ' open' : '') + (t % 10 === 0 ? ' big' : t % 5 === 0 ? ' mid' : '') }, [
        h('span', { class: 'pass-n', text: String(t) }),
        h('div', { class: 'pass-rw' }, rw.map(chip)),
        got ? h('span', { class: 'pass-state', text: '✓' }) : open ? h('button', { class: 'btn small primary', type: 'button', text: 'Claim', onclick: () => { const r = claimTier(t); if (r) PB.rewardModal({ icon: '🎁', eyebrow: 'Study Pass tier ' + t, title: 'Reward claimed', rewards: r }); viewPass(); } }) : h('span', { class: 'pass-state', text: (t * TIER_XP - ps.xp) + ' XP' })
      ]));
    }
    wrap.appendChild(grid);
    // Settings: daily goal and streak freezes.
    const set = h('section', { class: 'lock-box' }, [h('h2', { text: 'Daily goal' }), h('p', { text: 'Pick a goal you can keep. Reaching it pays coins and keeps your streak.' })]);
    const seg = h('div', { class: 'seg', role: 'group' });
    GOALS.forEach((gg) => seg.appendChild(h('button', { type: 'button', class: l.goal === gg[0] ? 'on' : '', text: gg[1] + ' · ' + gg[0] + ' XP', onclick: () => { l.goal = gg[0]; PB.save(); if (PB.renderHUD) PB.renderHUD(); viewPass(); } })));
    set.appendChild(seg);
    const gemsNow = PB.wallet ? PB.wallet.gems() : 0;
    set.appendChild(h('h2', { text: 'Streak freeze', style: 'margin-top:16px' }));
    set.appendChild(h('p', { text: 'A freeze is used automatically if you miss a day, so your streak survives. You can hold two. You have ' + l.freezes + '.' }));
    set.appendChild(h('button', { class: 'btn', type: 'button', disabled: l.freezes >= 2 || gemsNow < 200, text: 'Buy a freeze: 💎 200', onclick: () => { if (l.freezes >= 2 || !PB.wallet || !PB.wallet.spend('gems', 200)) return; l.freezes++; PB.save(); PB.renderHUD(); viewPass(); } }));
    const ms = h('div', { class: 'streak-row' });
    STREAK.forEach((m) => ms.appendChild(h('div', { class: 'streak-ms' + (l.streakPaid[m[0]] ? ' got' : '') }, [h('b', { text: '🔥 ' + m[0] }), h('div', {}, m[1].map(chip))])));
    set.appendChild(h('h2', { text: 'Streak milestones', style: 'margin-top:16px' }));
    set.appendChild(ms);
    wrap.appendChild(set);
    PB.setView([wrap], 'pass');
    window.scrollTo(0, 0);
  }
  function viewLeague() {
    const lg = leagueNow(), l = L();
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Week of ' + weekKey() + ' · ends in ' + fmtLeft(lg.endsIn) }));
    wrap.appendChild(h('h1', { text: TIERN[lg.tier][1] + ' ' + TIERN[lg.tier][0] + ' league', style: 'font-size:34px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'You and 14 rival study bots, ranked by XP earned this week. The rivals are simulated: each studies at its own pace, and the pace rises in higher leagues. Finish in the top 5 to go up a league; the bottom 5 drop down. The top 3 win gems and keys.' }));
    const ladder = h('div', { class: 'league-ladder' });
    TIERN.forEach((t, i) => ladder.appendChild(h('span', { class: 'league-step' + (i === lg.tier ? ' cur' : i < lg.tier ? ' past' : ''), title: t[0], text: t[1] })));
    wrap.appendChild(ladder);
    const tb = h('ol', { class: 'league-table' });
    lg.list.forEach((x, i) => {
      if (i === 5) tb.appendChild(h('li', { class: 'league-line up', text: '▲ promotion zone' }));
      if (i === 10) tb.appendChild(h('li', { class: 'league-line down', text: '▼ demotion zone' }));
      tb.appendChild(h('li', { class: 'league-row' + (x.you ? ' you' : '') }, [h('span', { class: 'lr-rank', text: String(i + 1) }), h('span', { class: 'lr-ava', text: x.you ? '🧑‍🔬' : '🤖' }), h('span', { class: 'lr-name', text: x.you ? 'You' : x.name }), h('span', { class: 'lr-xp', text: x.xp + ' XP' }), i < 3 ? h('span', { class: 'lr-medal', text: ['🥇', '🥈', '🥉'][i] }) : null]));
    });
    wrap.appendChild(tb);
    wrap.appendChild(h('p', { class: 'input-hint', text: 'Best league reached: ' + TIERN[l.league.best || lg.tier][0] + '.' }));
    const hid = PB.leagueHidden && PB.leagueHidden();
    wrap.appendChild(h('div', { class: 'lock-box' }, [h('h2', { text: 'Prefer to learn without a leaderboard?' }), h('p', { text: 'Some people find rankings motivating and others find them stressful. You can switch the league off: it disappears from the dashboard and weekly results stop. Everything else stays.' }), h('button', { class: 'btn', type: 'button', text: hid ? 'Turn the league back on' : 'Switch the league off', onclick: () => { PB.setLeagueHidden(!hid); viewLeague(); } })]));
    PB.setView([wrap], 'league');
    window.scrollTo(0, 0);
  }
  PB.views = PB.views || {};
  PB.views.pass = viewPass;
  PB.views.league = viewLeague;
})();
