/* Scibook "In the wild" (#wild).
   - Passing a chapter unlocks its "In the wild" card (where the idea is used in real life) and an Olympiad
     challenge: the chapter's hardest problem, worth +25 bonus XP once unlocked. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  const passed = (c) => !!(PB.isPassed && PB.isPassed(c));
  const lvl = (c) => (PB.masteryLevel ? PB.masteryLevel(c) : 0);
  function C() { const s = S(); s.campaign = s.campaign || { beats: {}, wild: {}, oly: {} }; return s.campaign; }
  function progress(sid) { const chs = PB.chaptersOf(sid); const n = chs.filter(passed).length; return { n: n, total: chs.length, f: chs.length ? n / chs.length : 0 }; }
  const beatOf = (f) => (f >= 1 ? 4 : f >= 0.75 ? 3 : f >= 0.5 ? 2 : f >= 0.25 ? 1 : 0);
  function oly(ch) { const os = ch.problems.filter((p) => p.level === 'olympiad'); return os[os.length - 1]; }

  function checkBeats(silent) {
    const c = C();
    PB.chapters.forEach((ch) => {
      if (passed(ch) && !c.wild[ch.id] && PB.WILD[ch.id]) {
        c.wild[ch.id] = Date.now(); PB.save();
        if (!silent && PB.toast) PB.toast('<span class="tx">🌍 In the wild</span> ' + PB.WILD[ch.id][0] + ' · Olympiad challenge unlocked', 'badge-t');
      }
    });
  }
  PB.on((ev) => {
    if (ev.type === 'answer' || ev.type === 'drill' || ev.type === 'quiz') setTimeout(() => checkBeats(false), 80);
    if (ev.type === 'answer' && ev.ok && ev.p) {
      const ch = PB.chapter(ev.p.chapter), c = C();
      if (ch && c.wild[ch.id] && !c.oly[ch.id] && oly(ch) && oly(ch).id === ev.p.id) { c.oly[ch.id] = Date.now(); PB.save(); setTimeout(() => PB.addXP(25, 'Olympiad challenge'), 100); }
    }
  });

  /* ---------- in the wild ---------- */
  function viewWild() {
    checkBeats(false);
    const wrap = h('div', { class: 'wrap' }), c = C();
    const n = Object.keys(c.wild).length;
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Why it matters' }));
    wrap.appendChild(h('h1', { text: '🌍 In the wild', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Pass a chapter to unlock where its ideas are used in real life, plus an Olympiad challenge: the chapter’s hardest problem, worth +25 bonus XP. ' + n + ' of ' + PB.chapters.length + ' unlocked.' }));
    PB.SUBJECTS.forEach((sub) => {
      wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: sub.name }), h('p', { text: PB.chaptersOf(sub.id).filter((x) => c.wild[x.id]).length + ' / ' + PB.chaptersOf(sub.id).length })]));
      const grid = h('div', { class: 'card3-grid wild-grid' });
      PB.chaptersOf(sub.id).forEach((ch) => grid.appendChild(wildCard(ch)));
      wrap.appendChild(grid);
    });
    PB.setView([wrap], 'wild');
  }
  function wildCard(ch) {
    const w = PB.WILD[ch.id], c = C(), open = !!c.wild[ch.id], p = oly(ch);
    if (!w) return null;
    return h('div', { class: 'card3 wild subj-' + ch.subject + (open ? ' got' : ' locked') }, [
      h('small', { class: 'wild-ch', text: ch.title }),
      h('b', { class: 'card3-name', text: open ? w[0] : '???' }),
      open ? h('p', { class: 'card3-fact', text: w[1] }) : h('small', { text: 'Pass this chapter to unlock.' }),
      open && p ? h('a', { class: 'btn small' + (c.oly[ch.id] ? ' done' : ' primary'), href: '#ch-' + ch.id + '--problems', text: c.oly[ch.id] ? '✓ Olympiad challenge solved' : '🏅 Olympiad challenge: ' + (p.title || p.id) + ' (+25 XP)' }) : null
    ]);
  }
  PB.views.map = () => { location.hash = '#home'; };
  PB.views.wild = viewWild;

  // Chapter page: show the card once unlocked, a teaser before.
  const prevHead = PB.chapterHeadExtras;
  PB.chapterHeadExtras = function (ch, head) {
    if (prevHead) prevHead(ch, head);
    const w = PB.WILD[ch.id]; if (!w) return;
    const open = !!C().wild[ch.id];
    head.appendChild(h('a', { class: 'wild-chip', href: '#wild', text: open ? '🌍 In the wild: ' + w[0] : '🌍 Pass this chapter to see where it is used in real life' }));
  };
  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const n = Object.keys(C().wild).length;
    PB.playRow(wrap).appendChild(h('a', { class: 'today-card wild', href: '#wild' }, [h('div', { class: 'eyebrow', text: '🌍 In the wild' }), h('h3', { text: n + ' / ' + PB.chapters.length + ' unlocked' }), h('small', { text: 'Pass a module to see where it is used in real life.' })]));
  };
  checkBeats(true);
})();
