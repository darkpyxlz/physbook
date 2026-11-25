/* Scibook wallet and variable rewards.
   - Two currencies: coins (staked on lab predictions, earned everywhere) and gems (streak freezes, bigger rewards).
   - Mystery boxes: a random reward from a table, so rewards are not fully predictable.
   - Critical insight: a hard problem solved first try, without hints or the guide, sometimes drops a box.
     Chance rises with difficulty, there is a daily cap so it stays special, and a pity counter guarantees one
     eventually so long dry spells do not happen. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  function W() {
    const s = S();
    if (!s.wallet) {
      const r = s.rpg || {};
      // One-time conversion of the old RPG currencies.
      s.wallet = { coins: Math.round((r.gold || 0) + 40 * (r.keys || 0) + 10 * (r.frags || 0)), gems: r.gems || 0, boxes: 0, crit: {}, pity: 0, crits: 0 };
      PB.save();
    }
    return s.wallet;
  }
  const NAME = { coins: 'coins', gems: 'gems' }, ICON = { coins: '◉', gems: '💎' };
  PB.wallet = {
    coins: () => W().coins,
    gems: () => W().gems,
    give: function (kind, n, why, quiet) {
      if (kind === 'gold') kind = 'coins';
      if (kind !== 'coins' && kind !== 'gems') return;
      W()[kind] += n; PB.save();
      if (PB.renderHUD) PB.renderHUD();
      if (!quiet && PB.toast) PB.toast('<span class="tx">' + ICON[kind] + ' +' + n + '</span> ' + NAME[kind] + (why ? ' · ' + why : ''), 'badge-t');
    },
    spend: function (kind, n) {
      if (W()[kind] < n) return false;
      W()[kind] -= n; PB.save(); if (PB.renderHUD) PB.renderHUD(); return true;
    }
  };

  /* ---------- Mystery boxes ---------- */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  function roll(tier) {
    const prem = tier === 'premium', x = Math.random();
    if (x < 0.03) return { big: true, label: 'Jackpot!', rewards: [['coins', prem ? 1000 : 400], ['gems', prem ? 300 : 120]] };
    if (x < 0.13) return { label: 'Double XP boost', rewards: [['boost', 1]].concat(prem ? [['gems', rnd(30, 60)]] : []) };
    if (x < 0.20 && (S().loop || {}).freezes < 2) return { label: 'Streak freeze', rewards: [['freeze', 1]] };
    if (x < 0.50) return { label: 'Gems', rewards: [['gems', prem ? rnd(60, 160) : rnd(15, 45)]] };
    return { label: 'Coins', rewards: [['coins', prem ? rnd(180, 420) : rnd(50, 140)]] };
  }
  function apply(rewards, why) {
    rewards.forEach((r) => {
      if (r[0] === 'boost') { if (PB.grantBoost) PB.grantBoost(r[1], why); }
      else if (r[0] === 'freeze') { const l = S().loop || (S().loop = {}); l.freezes = Math.min(2, (l.freezes || 0) + r[1]); PB.save(); }
      else PB.wallet.give(r[0], r[1], why, true);
    });
    if (PB.renderHUD) PB.renderHUD();
  }
  PB.openBox = function (tier, why) {
    const res = roll(tier); W().boxes++; PB.save();
    apply(res.rewards, why || 'mystery box');
    if (PB.rewardModal) PB.rewardModal({ icon: '🎁', eyebrow: (tier === 'premium' ? 'Premium mystery box' : 'Mystery box') + (why ? ' · ' + why : ''), title: res.label, rewards: res.rewards, big: !!res.big, button: 'Nice' });
    return res;
  };

  /* ---------- Critical insight ---------- */
  const CHANCE = { concept: 0.03, core: 0.08, olympiad: 0.18 }, DAILY_CAP = 3, PITY = 14;
  PB.on(function (ev) {
    if (ev.type !== 'answer' || !ev.ok || !ev.p) return;
    const sol = S().solved[ev.p.id];
    if (!sol || !sol.clean || (S().guided && S().guided[ev.p.id]) || (S().hints && S().hints[ev.p.id])) return;
    const w = W(), d = PB.today();
    w.crit[d] = w.crit[d] || 0;
    if (w.crit[d] >= DAILY_CAP) return;
    w.pity++;
    if (Math.random() < (CHANCE[ev.p.level] || 0.05) || w.pity >= PITY) {
      w.pity = 0; w.crit[d]++; w.crits++;
      PB.save();
      setTimeout(() => {
        if (PB.toast) PB.toast('<span class="tx">✨ Critical insight</span> a clean first-try solve dropped a box!', 'badge-t');
        PB.openBox(ev.p.level === 'olympiad' ? 'premium' : 'common', 'critical insight');
      }, 700);
    } else PB.save();
  });
  /* Shared dashboard row for the play features (campaign, raid, cards, journal, wild). */
  PB.playRow = function (wrap) {
    let row = wrap.querySelector('.today.play-row');
    if (!row) { row = h('div', { class: 'today play-row' }); wrap.appendChild(row); }
    return row;
  };
  W();
})();
