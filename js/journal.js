/* Scibook mistake journal (#journal).
   Every wrong answer to a scored problem is logged with what you entered. You can tag what went wrong
   (misread, concept, units, algebra, no idea where to start), and the page shows your most common slip.
   Fixing a mistake at least a day later pays double XP: coming back after a gap (spacing) is what makes
   the fix stick, and the delay stops "answer wrong, retry at once" from paying more than a first-try solve. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  const READY_MS = 20 * 3600 * 1000;
  const TAGS = [['misread', '👀 Misread the question'], ['concept', '💡 Concept'], ['units', '📏 Units or powers of ten'], ['algebra', '✏️ Algebra or arithmetic'], ['start', '🧭 No idea where to start']];
  function J() { const s = S(); s.journal = s.journal || {}; return s.journal; }
  const fmtAns = (p, a) => p.type === 'mcq' ? (p.options && p.options[a] != null ? String.fromCharCode(65 + a) : String(a)) : p.type === 'multi' ? (a || []).map((i) => String.fromCharCode(65 + i)).join(', ') : String(a);

  const orig = PB.check;
  PB.check = function (p, answer) {
    const r = orig(p, answer);
    if (!r || r.done || r.invalid) return r;
    const j = J();
    if (r.ok === false) {
      const e = j[p.id] || (j[p.id] = { t: Date.now(), n: 0, answers: [], tags: [] });
      e.n++; e.last = Date.now(); e.answers.push(fmtAns(p, answer)); if (e.answers.length > 4) e.answers.shift();
      delete e.fixed; PB.save();
    } else if (r.ok && j[p.id] && !j[p.id].fixed) {
      const e = j[p.id], old = Date.now() - e.t >= READY_MS, guided = S().guided && S().guided[p.id];
      e.fixed = Date.now(); e.bonus = old && !guided;
      PB.save();
      if (e.bonus) setTimeout(() => { PB.addXP(r.pts, 'Fixed an old mistake ×2'); if (PB.toast) PB.toast('<span class="tx">📓 ×2</span> You fixed a mistake from ' + ago(e.t) + '. Double XP!', 'badge-t'); PB.emit({ type: 'journalfix', p: p }); }, 200);
    }
    return r;
  };
  function ago(t) { const d = Math.floor((Date.now() - t) / 86400000); return d <= 0 ? 'earlier today' : d === 1 ? 'yesterday' : d + ' days ago'; }
  function entries() {
    const j = J();
    return Object.keys(j).map((id) => ({ id: id, e: j[id], p: PB.problem(id) })).filter((x) => x.p);
  }
  PB.journalStats = function () {
    const all = entries(), open = all.filter((x) => !x.e.fixed && !S().revealed[x.id]);
    return { open: open.length, ready: open.filter((x) => Date.now() - x.e.t >= READY_MS).length, fixed: all.filter((x) => x.e.fixed).length, bonus: all.filter((x) => x.e.bonus).length };
  };

  function view() {
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Learn from what went wrong' }));
    wrap.appendChild(h('h1', { text: '📓 Mistake journal', style: 'font-size:36px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every problem you got wrong is kept here. Tag what went wrong, then come back: a mistake fixed at least a day later pays double XP, because returning after a gap is what makes the fix stick.' }));
    const st = PB.journalStats();
    wrap.appendChild(h('div', { class: 'stat-row' }, [[st.ready, 'ready for ×2'], [st.open, 'still open'], [st.fixed, 'fixed'], [st.bonus, 'fixed for ×2']].map((x) => h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })]))));
    const tagCount = {};
    entries().forEach((x) => (x.e.tags || []).forEach((t) => { tagCount[t] = (tagCount[t] || 0) + 1; }));
    const top = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a])[0];
    if (top) {
      const tips = { misread: 'Underline what the question actually asks before you start, and reread it before submitting.', concept: 'Reread the plain-words summary for that section, then try the guided mode on a similar problem.', units: 'Convert everything to SI units first, and do an order-of-magnitude estimate before calculating.', algebra: 'Solve with symbols first and only put numbers in at the end; check each line.', start: 'Use “Guide me step by step”: it asks what you know and what links it to what you want.' };
      wrap.appendChild(h('div', { class: 'plain-box' }, [h('div', { class: 'plain-ico', text: '🔎' }), h('div', {}, [h('div', { class: 'eyebrow', text: 'Your most common slip' }), h('p', { html: '<b>' + TAGS.find((t) => t[0] === top)[1] + '</b> (' + tagCount[top] + '×). ' + tips[top] })])]));
    }
    const list = entries().sort((a, b) => (!!a.e.fixed - !!b.e.fixed) || (a.e.t - b.e.t));
    if (!list.length) wrap.appendChild(h('p', { class: 'empty', text: 'No mistakes logged yet. When you get a problem wrong it will appear here.' }));
    const sections = [['To fix', list.filter((x) => !x.e.fixed && !S().revealed[x.id])], ['Solution viewed', list.filter((x) => !x.e.fixed && S().revealed[x.id])], ['Fixed', list.filter((x) => x.e.fixed)]];
    sections.forEach(([title, xs]) => {
      if (!xs.length) return;
      wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: title }), h('p', { text: xs.length + '' })]));
      xs.forEach((x) => wrap.appendChild(row(x)));
    });
    PB.setView([wrap], 'journal');
  }
  function row(x) {
    const ch = PB.chapter(x.p.chapter), e = x.e, ready = !e.fixed && Date.now() - e.t >= READY_MS;
    const box = h('div', { class: 'jr-item' + (e.fixed ? ' fixed' : '') + (ready ? ' ready' : '') });
    box.appendChild(h('div', { class: 'jr-top' }, [
      h('span', { class: 'subj-badge subj-' + ch.subject, text: PB.subject(ch.subject).mark }),
      h('div', { class: 'jr-title' }, [h('b', { text: x.p.title || x.p.id }), h('small', { text: ch.title + ' · ' + x.p.level + ' · first wrong ' + ago(e.t) + ' · you answered ' + e.answers.join(', ') })]),
      e.fixed ? h('span', { class: 'chip', text: e.bonus ? '✓ fixed ×2' : '✓ fixed' }) : ready ? h('span', { class: 'chip jr-ready', text: '×2 ready' }) : h('span', { class: 'chip', text: '×2 in ' + Math.ceil((READY_MS - (Date.now() - e.t)) / 3600000) + ' h' })
    ]));
    const tags = h('div', { class: 'jr-tags' }, [h('small', { text: 'What went wrong? ' })]);
    TAGS.forEach((t) => {
      const on = (e.tags || []).indexOf(t[0]) >= 0;
      tags.appendChild(h('button', { class: 'tag-chip' + (on ? ' on' : ''), type: 'button', text: t[1], onclick: (ev) => { e.tags = e.tags || []; const i = e.tags.indexOf(t[0]); if (i >= 0) e.tags.splice(i, 1); else e.tags.push(t[0]); PB.save(); ev.target.classList.toggle('on'); } }));
    });
    box.appendChild(tags);
    if (!e.fixed && !S().revealed[x.id]) {
      const slot = h('div');
      box.appendChild(h('button', { class: 'btn small' + (ready ? ' primary' : ''), type: 'button', text: ready ? 'Fix it now for double XP' : 'Try it again', onclick: (ev) => { ev.target.remove(); slot.appendChild(PB.problemCard(x.p, { compact: true })); PB.typeset(slot); } }), slot);
    } else if (!e.fixed) box.appendChild(h('a', { class: 'btn small ghost', href: '#adapt-' + x.p.chapter, text: 'Practise this idea in adaptive practice' }));
    return box;
  }
  PB.views.journal = view;

  // Dashboard card.
  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const st = PB.journalStats();
    if (!st.open) return;
    const row = PB.playRow(wrap);
    row.appendChild(h('a', { class: 'today-card journal', href: '#journal' }, [h('div', { class: 'eyebrow', text: '📓 Mistake journal' }), h('h3', { text: st.ready ? st.ready + ' ready for ×2 XP' : st.open + ' to fix' }), h('small', { text: st.ready ? 'Fix old mistakes for double XP.' : 'Come back after a day to fix them for double XP.' })]));
  };
})();
