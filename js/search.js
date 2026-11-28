/* Scibook site search. Open with the header button, "/" or Ctrl/Cmd + K. Searches chapter titles and
   summaries, section titles, labs, textbook chapters (jumping to the module that teaches them), glossary terms
   and the main pages. Results are ranked by where the words match; arrow keys and Enter navigate. */
(function () {
  'use strict';
  const h = PB.h;
  let index = null, ov = null;
  const norm = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\$[^$]*\$/g, ' ').replace(/&[a-z]+;/g, ' ').toLowerCase();
  const PAGES = [['home', '🌳 Skill tree'], ['library', '📚 Library'], ['textbooks', '📘 Textbooks (reading companion)'], ['adapt', '🎯 Adaptive practice'], ['gym', '🏋 Practice gym'], ['arena', '⚔ Problem arena'], ['journal', '📓 Mistake journal'], ['garden', '🌻 Science garden'], ['cards', '🃏 Collections'], ['wild', '🌍 In the wild'], ['goal', '🔥 Daily goal and streak'], ['profile', '🏅 Level and badges'], ['code', '💻 Code lab'], ['solver', '∑ Equation board'], ['formulas', 'ƒ Formula sheet'], ['glossary', 'Aa Glossary']];

  function build() {
    const L = [];
    PB.chapters.forEach((c) => {
      const sub = PB.subject(c.subject);
      L.push({ type: 'Chapter', icon: sub.mark, title: c.title, sub: sub.name + ' · ' + c.num + ' · ' + c.part, text: norm(c.subtitle) + ' ' + norm(c.big), href: '#ch-' + c.id, w: 3 });
      c.sections.forEach((s, i) => L.push({ type: 'Section', icon: '§', title: s.title, sub: c.title + ' · §' + c.num + '.' + (i + 1), text: '', href: '#ch-' + c.id, sec: i, w: 2 }));
      (c.labs || []).forEach((l) => L.push({ type: 'Lab', icon: '🧪', title: l.title, sub: c.title, text: norm(l.desc), href: '#ch-' + c.id + '--lab', w: 1 }));
    });
    (PB.TEXTBOOKS || []).forEach((b) => b.units.forEach(([unit, list]) => list.forEach(([lab, title, ids]) => {
      const c = ids.map(PB.chapter).find(Boolean);
      L.push({ type: 'Textbook', icon: b.icon, title: (b.topics ? '' : (typeof lab === 'number' ? 'ch. ' + lab + ' ' : lab + ' ')) + title, sub: b.short + (c ? ' → ' + c.title : ''), text: norm(unit), href: c ? '#ch-' + c.id : '#textbooks-' + b.id, w: 2 });
    })));
    Object.keys(PB.GLOSSARY || {}).forEach((k) => { const v = PB.GLOSSARY[k]; L.push({ type: 'Term', icon: 'Aa', title: k.split('|')[0], sub: (Array.isArray(v) ? v[0] : String(v)).slice(0, 110), text: norm(k.replace(/\|/g, ' ')), href: '#glossary', w: 1 }); });
    PAGES.forEach((p) => L.push({ type: 'Page', icon: '↗', title: p[1].replace(/^\S+\s/, ''), sub: 'Scibook page', text: '', href: '#' + p[0], w: 2 }));
    L.forEach((e) => { e.t = norm(e.title); e.o = norm(e.sub) + ' ' + e.text; });
    return L;
  }
  function search(q) {
    const terms = norm(q).split(/\s+/).filter((t) => t.length > 0);
    if (!terms.length) return [];
    index = index || build();
    const out = [];
    index.forEach((e) => {
      let s = 0;
      for (const t of terms) {
        const i = e.t.indexOf(t);
        const stem = t.length >= 6 ? t.slice(0, -2) : null;
        if (i === 0) s += 8; else if (i > 0) s += /[\s(,·:–-]/.test(e.t[i - 1]) ? 5 : 2;
        else if (stem && e.t.indexOf(stem) >= 0) s += 3; // plural and singular forms: mitochondria / mitochondrion
        else if (e.o.indexOf(t) >= 0 || (stem && e.o.indexOf(stem) >= 0)) s += 1; else return;
      }
      if (e.t === norm(q).trim()) s += 6;
      out.push([s * (1 + e.w / 4), e]);
    });
    out.sort((a, b) => b[0] - a[0] || a[1].title.length - b[1].title.length);
    return out.slice(0, 40).map((x) => x[1]);
  }
  function go(e) {
    close();
    if (e.sec != null) PB.pendingSection = e.sec;
    if (location.hash === e.href) PB.route(); else location.hash = e.href;
    // Glossary results open the glossary filtered to that term.
    if (e.type === 'Term') setTimeout(() => { const i = document.querySelector('.gl-search'); if (i) { i.value = e.title; i.dispatchEvent(new Event('input', { bubbles: true })); } }, 350);
  }
  function close() { if (ov) { ov.remove(); ov = null; document.removeEventListener('keydown', keys, true); } }
  let sel = 0, results = [], list = null;
  function draw() {
    list.innerHTML = '';
    results.forEach((e, i) => list.appendChild(h('a', { class: 'sr-item' + (i === sel ? ' on' : ''), href: e.href, onclick: (ev) => { ev.preventDefault(); go(e); }, onmouseenter: () => { sel = i; [...list.children].forEach((c, k) => c.classList.toggle('on', k === i)); } }, [h('span', { class: 'sr-ic', text: e.icon }), h('span', { class: 'sr-main' }, [h('b', { text: e.title }), h('small', { text: e.sub })]), h('span', { class: 'sr-type', text: e.type })])));
    const on = list.children[sel]; if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
  }
  function keys(ev) {
    if (!ov) return;
    if (ev.key === 'Escape') { ev.preventDefault(); close(); }
    else if (ev.key === 'ArrowDown') { ev.preventDefault(); sel = Math.min(results.length - 1, sel + 1); draw(); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); sel = Math.max(0, sel - 1); draw(); }
    else if (ev.key === 'Enter' && results[sel]) { ev.preventDefault(); go(results[sel]); }
  }
  PB.openSearch = function (q0) {
    if (ov) return;
    const input = h('input', { type: 'search', class: 'sr-input', placeholder: 'Search chapters, sections, labs, textbook chapters, terms…', 'aria-label': 'Search Scibook', autocomplete: 'off' });
    list = h('div', { class: 'sr-list', role: 'listbox' });
    const hint = h('p', { class: 'sr-hint', text: 'Try “Krebs”, “Campbell 21”, “pKa”, “Diels–Alder”, “Fermi” or “garden”. ↑↓ to move, Enter to open, Esc to close.' });
    ov = h('div', { class: 'reward-ov sr-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Search', onclick: (e) => { if (e.target === ov) close(); } }, [h('div', { class: 'sr-box' }, [input, hint, list])]);
    document.body.appendChild(ov);
    const run = () => { results = search(input.value); sel = 0; hint.style.display = input.value.trim() ? 'none' : ''; draw(); if (input.value.trim() && !results.length) list.appendChild(h('p', { class: 'sr-none', text: 'Nothing found. Try fewer or shorter words.' })); };
    input.addEventListener('input', run);
    document.addEventListener('keydown', keys, true);
    if (q0) { input.value = q0; run(); }
    setTimeout(() => input.focus(), 30);
  };
  document.addEventListener('keydown', (ev) => {
    const tag = (ev.target && ev.target.tagName) || '', typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (ev.target && ev.target.isContentEditable);
    if ((ev.key === 'k' || ev.key === 'K') && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); PB.openSearch(); }
    else if (ev.key === '/' && !typing && !ov) { ev.preventDefault(); PB.openSearch(); }
  });
  const SEARCH = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const prevHud = PB.hudExtras;
  PB.hudExtras = function (box) {
    if (prevHud) prevHud(box);
    const th = box.querySelector('.hud-theme');
    const b = h('button', { class: 'icon-btn hud-search', type: 'button', 'aria-label': 'Search (/ or Ctrl+K)', title: 'Search (/ or Ctrl+K)', html: SEARCH, onclick: () => PB.openSearch() });
    if (th) box.insertBefore(b, th); else box.appendChild(b);
  };
})();
