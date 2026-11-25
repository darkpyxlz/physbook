/* Scibook campaign map (#map) and "In the wild" (#wild).
   - The map shows each subject as a region with a path of chapters, lit up by your mastery level, and a short
     story that moves forward at 25%, 50%, 75% and 100% of the region's chapters passed.
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
    PB.SUBJECTS.forEach((sub) => {
      const story = PB.CAMPAIGN[sub.id]; if (!story) return;
      const b = beatOf(progress(sub.id).f), had = c.beats[sub.id] || 0;
      if (b > had) {
        c.beats[sub.id] = b; PB.save();
        if (!silent && PB.rewardModal) PB.rewardModal({ icon: '🗺️', eyebrow: story[0] + ' · chapter ' + (b + 1) + ' of the story', title: ['', 'A quarter of the way', 'Halfway there', 'Three quarters done', 'Region complete!'][b], text: story[1][b], rewards: [['gems', 40 * b], ['box', b === 4 ? 'premium' : 'common']], big: b === 4 });
        if (!silent) { PB.wallet.give('gems', 40 * b, 'campaign', true); setTimeout(() => PB.openBox(b === 4 ? 'premium' : 'common', 'campaign'), 900); }
      }
    });
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

  /* ---------- map ---------- */
  function pathSVG(sub) {
    const chs = PB.chaptersOf(sub.id), n = chs.length, W = 1000, H = 230;
    const pts = chs.map((c, i) => [40 + (W - 80) * (n > 1 ? i / (n - 1) : 0.5), H / 2 + 62 * Math.sin(i * 0.9)]);
    let d = ''; pts.forEach((p, i) => { d += (i ? ' L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); });
    const col = 'var(--s-' + sub.id + ')';
    let s = '<svg class="map-path" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + sub.name + ' chapters"><path d="' + d + '" fill="none" stroke="var(--line)" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 12"/>';
    chs.forEach((c, i) => {
      const L = lvl(c), p = pts[i], open = !PB.isUnlocked || PB.isUnlocked(c), r = 17 + (L >= 4 ? 4 : 0);
      const fill = L === 0 ? 'var(--surface)' : col, op = [1, 0.35, 0.6, 0.85, 1][L];
      s += '<a href="#ch-' + c.id + '"><title>' + c.title.replace(/</g, '') + ' · ' + ['Not started', 'Attempted', 'Familiar', 'Proficient', 'Mastered'][L] + '</title>' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + fill + '" fill-opacity="' + op + '" stroke="' + (open ? col : 'var(--line)') + '" stroke-width="3"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="14" font-weight="700" fill="' + (L >= 2 ? '#fff' : 'var(--ink-2)') + '">' + (L >= 4 ? '♛' : open ? c.num : '🔒') + '</text></a>';
    });
    return s + '</svg>';
  }
  function viewMap() {
    checkBeats(false);
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Your journey' }));
    wrap.appendChild(h('h1', { text: '🗺️ Campaign map', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Each subject is a region. Chapters light up as your mastery grows (♛ = Mastered), and each region’s story moves on as you pass a quarter, half, three quarters and all of its chapters.' }));
    PB.SUBJECTS.forEach((sub) => {
      const story = PB.CAMPAIGN[sub.id]; if (!story) return;
      const pr = progress(sub.id), b = beatOf(pr.f), next = [0.25, 0.5, 0.75, 1][b];
      const nextN = next ? Math.ceil(next * pr.total) - pr.n : 0;
      const reg = h('section', { class: 'map-region subj-' + sub.id });
      reg.appendChild(h('div', { class: 'map-head' }, [h('span', { class: 'subj-badge subj-' + sub.id, text: sub.mark }), h('div', {}, [h('h2', { text: story[0] }), h('small', { text: sub.name + ' · ' + pr.n + ' of ' + pr.total + ' chapters passed' })])]));
      reg.appendChild(h('div', { class: 'map-wrap', html: pathSVG(sub) }));
      reg.appendChild(h('div', { class: 'map-story' }, [h('p', { text: story[1][b] }), b < 4 ? h('small', { text: 'Next part of the story in ' + Math.max(1, nextN) + ' more chapter' + (nextN === 1 ? '' : 's') + '.' }) : h('small', { text: 'Region complete ✓' })]));
      wrap.appendChild(reg);
    });
    PB.setView([wrap], 'map');
  }

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
  PB.views.map = viewMap;
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
    const total = PB.chapters.length, n = PB.chapters.filter(passed).length;
    PB.playRow(wrap).prepend(h('a', { class: 'today-card map', href: '#map' }, [h('div', { class: 'eyebrow', text: '🗺️ Campaign' }), h('h3', { text: n + ' / ' + total + ' chapters passed' }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(100 * n / total) + '%"></span>' }), h('small', { text: 'Follow the story of each region.' })]));
  };
  checkBeats(true);
})();
