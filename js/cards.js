/* Scibook card collections (#cards). Every problem you solve for the first time drops a card from that
   subject's collection: the periodic table (chemistry), the Messier catalogue (astronomy), the particle zoo
   (physics), the tree of life (biology) and famous numbers (maths). Harder problems roll rarer cards.
   Duplicates become shards, and shards craft any card you are missing, so every solve moves you forward. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  const RAR = [['Common', '#8a93a8'], ['Uncommon', '#2e9d57'], ['Rare', '#2f6fdb'], ['Epic', '#9b4fd6'], ['Legendary', '#e0901a']];
  const ODDS = { concept: [62, 26, 9, 2.5, 0.5], core: [45, 31, 16, 6, 2], olympiad: [24, 30, 26, 14, 6] };
  const SHARD = [1, 2, 5, 12, 30], CRAFT = [10, 25, 60, 150, 400], PITY_EPIC = 25, PITY_LEG = 80;
  PB.RARITY = RAR;
  function K() {
    const s = S();
    if (!s.cards2) {
      s.cards2 = { own: {}, shards: 0, packs: {}, pity: {}, miles: {}, draws: 0 };
      // Existing saves: one unopened card per problem already solved, up to 60 per collection.
      PB.COLLECTIONS.forEach((c) => { const n = Object.keys(s.solved || {}).filter((id) => { const p = PB.problem(id); return p && PB.chapter(p.chapter).subject === c.subject; }).length; if (n) s.cards2.packs[c.id] = Math.min(60, n); });
      PB.save();
    }
    return s.cards2;
  }
  const col = (id) => PB.COLLECTIONS.find((c) => c.id === id);
  const colOf = (subject) => PB.COLLECTIONS.find((c) => c.subject === subject);
  PB.cardStats = function () { const k = K(); let got = 0, total = 0; PB.COLLECTIONS.forEach((c) => { total += c.cards.length; got += c.cards.filter((x) => k.own[x.id]).length; }); return { got: got, total: total, shards: k.shards, packs: Object.values(k.packs).reduce((a, b) => a + b, 0) }; };

  function draw(c, level) {
    const k = K(), pity = k.pity[c.id] = k.pity[c.id] || { e: 0, l: 0 };
    const w = ODDS[level] || ODDS.core;
    let x = Math.random() * 100, r = 0;
    for (r = 0; r < 5; r++) { if (x < w[r]) break; x -= w[r]; }
    if (r > 4) r = 4;
    pity.e++; pity.l++;
    if (pity.l >= PITY_LEG) r = 4; else if (pity.e >= PITY_EPIC && r < 3) r = 3;
    if (r >= 3) pity.e = 0; if (r === 4) pity.l = 0;
    let pool = c.cards.filter((y) => y.rarity === r);
    for (let d = r; !pool.length && d >= 0; d--) pool = c.cards.filter((y) => y.rarity === d);
    // Lean towards cards you do not own yet (2 in 3 chance when any are missing at this rarity).
    const missing = pool.filter((y) => !k.own[y.id]);
    const from = missing.length && Math.random() < 0.67 ? missing : pool;
    const card = from[Math.floor(Math.random() * from.length)];
    const isNew = !k.own[card.id];
    k.own[card.id] = (k.own[card.id] || 0) + 1; k.draws++;
    if (!isNew) k.shards += SHARD[card.rarity];
    PB.save();
    return { card: card, isNew: isNew, col: c };
  }
  function announce(res, quiet) {
    const c = res.card, r = RAR[c.rarity];
    if (PB.toast) PB.toast('<span class="tx" style="color:' + r[1] + '">🃏 ' + r[0] + '</span> ' + c.name + (res.isNew ? ' · new!' : ' · duplicate +' + SHARD[c.rarity] + ' shards'), res.isNew ? 'badge-t' : '');
    if (!quiet && res.isNew && c.rarity >= 3 && PB.rewardModal) PB.rewardModal({ icon: c.icon || c.short || '🃏', eyebrow: r[0] + ' card · ' + res.col.name, title: c.name, text: c.text, button: 'Add to collection', big: c.rarity === 4 });
    milestones(res.col);
  }
  function milestones(c) {
    const k = K(), got = c.cards.filter((x) => k.own[x.id]).length, f = got / c.cards.length;
    [[0.25, 50], [0.5, 100], [0.75, 200], [1, 500]].forEach(([t, gems]) => {
      const key = c.id + ':' + t;
      if (f >= t && !k.miles[key]) {
        k.miles[key] = Date.now(); PB.save();
        if (PB.wallet) PB.wallet.give('gems', gems, c.name, true);
        if (PB.rewardModal) PB.rewardModal({ icon: c.icon, eyebrow: c.name, title: t === 1 ? 'Collection complete!' : Math.round(t * 100) + '% collected', text: got + ' of ' + c.cards.length + ' cards.', rewards: [['gems', gems]].concat(t === 1 ? [['box', 'premium']] : []), big: t === 1 });
        if (t === 1 && PB.openBox) setTimeout(() => PB.openBox('premium', c.name), 900);
      }
    });
  }
  PB.on((ev) => {
    if (ev.type !== 'answer' || !ev.ok || !ev.p) return;
    const ch = PB.chapter(ev.p.chapter), c = ch && colOf(ch.subject);
    if (!c) return;
    const res = draw(c, ev.p.level);
    setTimeout(() => announce(res), 500);
  });

  /* ---------- album ---------- */
  let tab = null;
  function cell(c, x) {
    const k = K(), n = k.own[x.id] || 0, r = RAR[x.rarity];
    const el = h('button', { class: 'cc' + (n ? ' got' : '') + ' r' + x.rarity, type: 'button', style: (c.table ? 'grid-row:' + x.grid[0] + ';grid-column:' + x.grid[1] + ';' : '') + '--rc:' + r[1], title: (n ? x.name : (c.table || c.id === 'messier' ? x.name : '???')) + ' · ' + r[0], onclick: () => detail(c, x) }, [
      x.n ? h('small', { class: 'cc-n', text: String(x.n) }) : null,
      h('b', { class: 'cc-s', text: n || c.table || c.id === 'messier' ? (x.short || x.icon) : '?' }),
      c.table ? null : h('span', { class: 'cc-name', text: n ? (x.icon && x.short ? x.icon + ' ' : '') + (c.id === 'messier' ? (x.name.split(' · ')[1] || x.info) : x.name) : r[0] }),
      n > 1 ? h('span', { class: 'cc-dup', text: '×' + n }) : null
    ]);
    return el;
  }
  function detail(c, x) {
    const k = K(), n = k.own[x.id] || 0, r = RAR[x.rarity], cost = CRAFT[x.rarity];
    const ov = h('div', { class: 'reward-ov', role: 'dialog', 'aria-modal': 'true', onclick: (e) => { if (e.target === ov) ov.remove(); } });
    const box = h('div', { class: 'reward-box cc-detail', style: '--rc:' + r[1] }, [
      h('div', { class: 'cc-big' + (n ? ' got' : '') }, [h('b', { text: n || c.table || c.id === 'messier' ? (x.short || x.icon) : '?' })]),
      h('div', { class: 'eyebrow', style: 'color:' + r[1], text: r[0] + ' · ' + c.name }),
      h('h2', { text: n || c.table || c.id === 'messier' ? x.name : 'Not found yet' }),
      h('p', { text: n ? x.text : 'Solve ' + PB.subject(c.subject).name.toLowerCase() + ' problems to find it. Olympiad problems roll rarer cards.' }),
      h('small', { text: n ? 'Owned ×' + n : 'Or craft it for ' + cost + ' shards (you have ' + k.shards + ').' })
    ]);
    if (!n) box.appendChild(h('button', { class: 'btn ' + (k.shards >= cost ? 'primary' : ''), type: 'button', disabled: k.shards >= cost ? null : 'disabled', text: 'Craft for ' + cost + ' shards', onclick: () => { if (k.shards < cost) return; k.shards -= cost; k.own[x.id] = 1; PB.save(); ov.remove(); milestones(c); view(); } }));
    box.appendChild(h('button', { class: 'btn ghost', type: 'button', text: 'Close', onclick: () => ov.remove() }));
    ov.appendChild(box); document.body.appendChild(ov);
  }
  function view() {
    const k = K();
    tab = tab && col(tab) ? tab : PB.COLLECTIONS[0].id;
    const st = PB.cardStats();
    const wrap = h('div', { class: 'wrap-wide' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Solve problems, collect cards' }));
    wrap.appendChild(h('h1', { text: '🃏 Collections', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every problem you solve for the first time drops a card from that subject’s collection. Olympiad problems roll rarer cards. Duplicates turn into shards, and shards craft any card you are still missing.' }));
    wrap.appendChild(h('div', { class: 'stat-row' }, [[st.got + '/' + st.total, 'cards'], ['✦ ' + k.shards, 'shards'], [st.packs, 'unopened cards'], ['◉ ' + PB.wallet.coins() + ' · 💎 ' + PB.wallet.gems(), 'wallet']].map((x) => h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })]))));
    const tabs = h('div', { class: 'cc-tabs' });
    PB.COLLECTIONS.forEach((c) => { const got = c.cards.filter((x) => k.own[x.id]).length; tabs.appendChild(h('button', { class: 'cc-tab subj-' + c.subject + (c.id === tab ? ' on' : ''), type: 'button', onclick: () => { tab = c.id; view(); } }, [h('span', { text: c.icon }), h('b', { text: c.name }), h('small', { text: got + '/' + c.cards.length })])); });
    wrap.appendChild(tabs);
    const c = col(tab), got = c.cards.filter((x) => k.own[x.id]).length;
    const head = h('div', { class: 'section-head' }, [h('h2', { text: c.icon + ' ' + c.name }), h('p', { text: got + ' / ' + c.cards.length + ' · ' + RAR.map((r, i) => { const all = c.cards.filter((x) => x.rarity === i); return all.length ? r[0] + ' ' + all.filter((x) => k.own[x.id]).length + '/' + all.length : ''; }).filter(Boolean).join(' · ') })]);
    wrap.appendChild(head);
    if (k.packs[c.id]) wrap.appendChild(h('div', { class: 'cc-packs' }, [h('span', { text: '🎴 ' + k.packs[c.id] + ' unopened card' + (k.packs[c.id] > 1 ? 's' : '') + ' from problems you solved before collections existed.' }), h('button', { class: 'btn primary small', type: 'button', text: 'Open ' + Math.min(10, k.packs[c.id]), onclick: () => { const n = Math.min(10, k.packs[c.id]); k.packs[c.id] -= n; const res = []; for (let i = 0; i < n; i++) res.push(draw(c, 'core')); PB.save(); res.forEach((r, i) => setTimeout(() => announce(r, true), i * 150)); setTimeout(view, n * 150 + 200); } })]));
    wrap.appendChild(h('div', { class: 'cc-legend' }, RAR.map((r) => h('span', { style: '--rc:' + r[1] }, [h('i'), r[0]]))));
    const grid = h('div', { class: c.table ? 'cc-table' : 'cc-grid' });
    c.cards.forEach((x) => grid.appendChild(cell(c, x)));
    wrap.appendChild(h('div', { class: c.table ? 'cc-scroll' : '' }, [grid]));
    wrap.appendChild(h('p', { class: 'predict-note', text: 'Drop odds (common → legendary): concept ' + ODDS.concept.join('/') + '%, core ' + ODDS.core.join('/') + '%, olympiad ' + ODDS.olympiad.join('/') + '%. An epic or better is guaranteed within ' + PITY_EPIC + ' cards of a collection, a legendary within ' + PITY_LEG + '.' }));
    PB.setView([wrap], 'cards');
  }
  PB.views.cards = view;

  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const st = PB.cardStats();
    PB.playRow(wrap).appendChild(h('a', { class: 'today-card cards', href: '#cards' }, [h('div', { class: 'eyebrow', text: '🃏 Collections' }), h('h3', { text: st.got + ' / ' + st.total + ' cards' }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(100 * st.got / st.total) + '%"></span>' }), h('small', { text: st.packs ? st.packs + ' unopened cards waiting!' : 'Every solved problem drops a card.' })]));
  };
  K();
})();
