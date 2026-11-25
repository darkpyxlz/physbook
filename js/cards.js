/* Scibook collection cards (#cards). Each card belongs to a chapter and is won by reaching Proficient
   mastery there, so collecting is the same thing as learning. A won card can be "polished" to foil by
   answering its mini-quiz (+15 gems). Completing a set pays a premium box and unlocks a raid power. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  function K() { const s = S(); s.cards = s.cards || { got: {}, foil: {}, sets: {}, tried: {} }; return s.cards; }
  const all = () => PB.CARD_SETS.reduce((a, st) => a.concat(PB.CARDS[st.id].map((c) => Object.assign({ set: st.id }, c))), []);
  const earnedNow = (c) => { const ch = PB.chapter(c.ch); return !!ch && PB.masteryLevel && PB.masteryLevel(ch) >= 3; };
  PB.setComplete = (sid) => !!K().sets[sid];
  PB.cardStats = function () { const k = K(); return { got: Object.keys(k.got).length, total: all().length, foil: Object.keys(k.foil).length, sets: Object.keys(k.sets).length }; };

  function check(silent) {
    const k = K(), fresh = [];
    all().forEach((c) => { if (!k.got[c.id] && earnedNow(c)) { k.got[c.id] = Date.now(); fresh.push(c); } });
    PB.CARD_SETS.forEach((st) => {
      if (!k.sets[st.id] && PB.CARDS[st.id].every((c) => k.got[c.id])) {
        k.sets[st.id] = Date.now();
        if (!silent) {
          PB.wallet.give('gems', 150, 'set complete', true);
          if (PB.rewardModal) PB.rewardModal({ icon: st.icon, eyebrow: 'Set complete', title: st.name + ' set complete!', text: 'New raid power unlocked: <b>' + st.power[0] + '</b>. ' + st.power[1], rewards: [['gems', 150], ['box', 'premium']], big: true });
          setTimeout(() => PB.openBox('premium', st.name + ' set'), 900);
        }
      }
    });
    PB.save();
    if (!fresh.length || silent) return;
    if (PB.rewardModal) PB.rewardModal({ icon: fresh[0].icon, eyebrow: 'New card' + (fresh.length > 1 ? 's' : ''), title: fresh.map((c) => c.name).join(', '), text: 'You reached Proficient in ' + PB.chapter(fresh[0].ch).title + '. Polish it in your collection for gems.', button: 'Add to collection' });
  }
  PB.on((ev) => { if (ev.type === 'answer' || ev.type === 'drill' || ev.type === 'quiz' || ev.type === 'session') setTimeout(() => check(false), 50); });

  function shuffled(c) {
    let seed = 7; for (const ch of c.id) seed = (seed * 33 + ch.charCodeAt(0)) >>> 0;
    const o = c.o.map((_, i) => i);
    for (let i = o.length - 1; i > 0; i--) { seed = (seed * 1103515245 + 12345) >>> 0; const j = seed % (i + 1); [o[i], o[j]] = [o[j], o[i]]; }
    return o;
  }
  function cardEl(c) {
    const k = K(), got = !!k.got[c.id], foil = !!k.foil[c.id], ch = PB.chapter(c.ch);
    const el = h('div', { class: 'card3 set-' + c.set + (got ? ' got' : ' locked') + (foil ? ' foil' : '') });
    el.appendChild(h('div', { class: 'card3-icon', text: got ? c.icon : '?' }));
    el.appendChild(h('b', { class: 'card3-name', text: got ? c.name : '???' }));
    if (!got) {
      el.appendChild(h('small', { html: 'Reach <b>Proficient</b> in <a href="#ch-' + c.ch + '">' + (ch ? ch.title : c.ch) + '</a> to win this card.' }));
      return el;
    }
    el.appendChild(h('p', { class: 'card3-fact', text: c.fact }));
    if (foil) { el.appendChild(h('small', { class: 'card3-foil', text: '✨ Foil' })); return el; }
    const last = k.tried[c.id] || 0, wait = Date.now() - last < 10 * 60000;
    const quiz = h('div', { class: 'card3-quiz' });
    quiz.appendChild(h('button', { class: 'btn small', type: 'button', disabled: wait ? 'disabled' : null, text: wait ? 'Try again in a few minutes' : 'Polish to foil (+15 💎)', onclick: () => {
      quiz.innerHTML = '';
      quiz.appendChild(h('p', { html: c.q }));
      shuffled(c).forEach((i) => quiz.appendChild(h('button', { class: 'opt small', type: 'button', html: c.o[i], onclick: () => {
        if (i === c.a) { k.foil[c.id] = Date.now(); PB.save(); PB.wallet.give('gems', 15, 'foil card'); PB.addXP(3, 'Polished a card'); }
        else { k.tried[c.id] = Date.now(); PB.save(); if (PB.toast) PB.toast('<span class="tx">Not quite</span> the answer was: ' + c.o[c.a], ''); }
        el.replaceWith(cardEl(c));
      } })));
      PB.typeset(quiz);
    } }));
    el.appendChild(quiz);
    return el;
  }
  function view() {
    check(false);
    const st = PB.cardStats();
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Collect by mastering' }));
    wrap.appendChild(h('h1', { text: '🃏 Card collection', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Each card belongs to a chapter. Reach Proficient mastery there to win it, then answer its mini-quiz to polish it into foil. Completing a set pays a premium mystery box and unlocks a power for the weekly raid.' }));
    wrap.appendChild(h('div', { class: 'stat-row' }, [[st.got + '/' + st.total, 'cards'], [st.foil, 'foil'], [st.sets + '/5', 'sets complete'], ['◉ ' + PB.wallet.coins() + ' · 💎 ' + PB.wallet.gems(), 'wallet']].map((x) => h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })]))));
    PB.CARD_SETS.forEach((set) => {
      const cs = PB.CARDS[set.id], n = cs.filter((c) => K().got[c.id]).length;
      wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: set.icon + ' ' + set.name }), h('p', { text: n + ' / ' + cs.length + (K().sets[set.id] ? ' · power: ' + set.power[0] + ' ✓' : ' · completing it unlocks ' + set.power[0]) })]));
      wrap.appendChild(h('div', { class: 'card3-grid' }, cs.map((c) => cardEl(Object.assign({ set: set.id }, c)))));
    });
    PB.setView([wrap], 'cards');
  }
  PB.views.cards = view;

  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const st = PB.cardStats();
    PB.playRow(wrap).appendChild(h('a', { class: 'today-card cards', href: '#cards' }, [h('div', { class: 'eyebrow', text: '🃏 Collection' }), h('h3', { text: st.got + ' / ' + st.total + ' cards' }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(100 * st.got / st.total) + '%"></span>' }), h('small', { text: 'Reach Proficient in a chapter to win its card.' })]));
  };
  check(true);
})();
