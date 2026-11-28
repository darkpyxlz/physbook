/* Scibook: easier explanations.
   - "In plain words": a one- or two-sentence summary at the top of every section, written without symbols
     (an advance organiser: you know where the section is going before the details start).
   - Glossary: key terms are underlined the first time they appear in a section; hover, tap or focus shows a
     plain definition. A full searchable glossary lives at #glossary.
   - "Say it back": a self-explanation prompt at the end of each section. You write the idea in your own words,
     then compare with the plain-words summary. */
(function () {
  const h = PB.h;
  PB.PLAIN = PB.PLAIN || {};
  PB.addPlain = function (chId, list) { PB.PLAIN[chId] = list; };
  PB.GLOSSARY = PB.GLOSSARY || {};
  /* entries: { 'term|alias|alias': ['definition', 'subject or empty'] } */
  PB.addGlossary = function (obj) { Object.keys(obj).forEach(function (k) { const v = obj[k]; PB.GLOSSARY[k] = Array.isArray(v) ? v : [v, '']; }); index = null; };

  const S = () => PB.S;
  function prefs() { S().plain = S().plain || { on: true, say: {} }; return S().plain; }

  /* ---------- glossary matching ---------- */
  let index = null;
  function build() {
    const terms = [];
    Object.keys(PB.GLOSSARY).forEach(function (k) {
      const names = k.split('|'), def = PB.GLOSSARY[k];
      names.forEach(function (n) { terms.push({ name: n, key: names[0], def: def[0], subj: def[1] || '' }); });
    });
    terms.sort(function (a, b) { return b.name.length - a.name.length; });
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const map = {};
    terms.forEach(function (t) { const n = t.name.toLowerCase(); (map[n] = map[n] || []).push(t); });
    index = { map: map, re: new RegExp('\\b(' + terms.map(function (t) { return esc(t.name); }).join('|') + ')(s|es)?\\b', 'gi') };
    return index;
  }
  PB.glossaryTerms = function () {
    return Object.keys(PB.GLOSSARY).map(function (k) { const n = k.split('|'); return { name: n[0], alias: n.slice(1), def: PB.GLOSSARY[k][0], subj: PB.GLOSSARY[k][1] || '' }; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });
  };

  function pick(list, subj) { return (list || []).find(function (t) { return !t.subj || !subj || t.subj.split(',').indexOf(subj) >= 0; }); }
  function byKey(key) { const out = []; Object.keys((index || build()).map).forEach(function (n) { index.map[n].forEach(function (t) { if (t.key === key) out.push(t); }); }); return out[0]; }
  const SKIP = 'h1,h2,h3,h4,a,button,code,pre,label,input,textarea,select,summary,.quiz-card,.prob,.lab,.plain-box,.say-back,.inline-checks,.formula,.m,dfn,svg,canvas,table.data th';
  const MAX_PER_SECTION = 7;
  function linkTerms(root, subj) {
    const idx = index || build();
    if (!Object.keys(idx.map).length) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = walker.nextNode())) nodes.push(n);
    let dollars = 0, used = {}, count = 0;
    nodes.forEach(function (node) {
      const txt = node.nodeValue;
      const par = node.parentElement;
      const skip = !par || par.closest(SKIP);
      // Split by $ so that text inside $...$ (MathJax source) is never touched; parity carries across nodes.
      const parts = txt.split('$');
      if (skip || count >= MAX_PER_SECTION) { if (!(par && par.closest('code,pre'))) dollars += parts.length - 1; return; }
      let changed = false;
      const frag = document.createDocumentFragment();
      parts.forEach(function (part, i) {
        if (i > 0) { dollars++; frag.appendChild(document.createTextNode('$')); }
        if (dollars % 2 === 1 || !part) { if (part) frag.appendChild(document.createTextNode(part)); return; }
        let last = 0, m;
        idx.re.lastIndex = 0;
        while ((m = idx.re.exec(part)) && count < MAX_PER_SECTION) {
          const t = pick(idx.map[m[1].toLowerCase()], subj);
          if (!t || used[t.key]) continue;
          used[t.key] = 1; count++; changed = true;
          if (m.index > last) frag.appendChild(document.createTextNode(part.slice(last, m.index)));
          frag.appendChild(h('dfn', { class: 'gl', tabindex: '0', 'data-term': t.key, text: m[0] }));
          last = m.index + m[0].length;
        }
        if (last < part.length) frag.appendChild(document.createTextNode(part.slice(last)));
      });
      if (changed) node.parentNode.replaceChild(frag, node);
    });
  }

  /* ---------- floating definition ---------- */
  let tip = null, tipFor = null, tipAt = 0;
  function showTip(el) {
    const t = byKey(el.getAttribute('data-term'));
    if (!t) return;
    if (!tip) { tip = h('div', { class: 'gl-tip', role: 'tooltip' }); document.body.appendChild(tip); }
    tip.innerHTML = '';
    tip.appendChild(h('b', { text: t.key }));
    tip.appendChild(h('span', { html: ' ' + t.def }));
    tip.appendChild(h('a', { href: '#glossary', text: 'All terms →' }));
    tip.style.display = 'block';
    const r = el.getBoundingClientRect(), w = Math.min(320, window.innerWidth - 24);
    tip.style.width = w + 'px';
    let x = r.left + r.width / 2 - w / 2; x = Math.max(12, Math.min(window.innerWidth - w - 12, x));
    tip.style.left = x + 'px';
    const below = r.bottom + 8, th = tip.offsetHeight;
    tip.style.top = (below + th > window.innerHeight - 8 && r.top - th - 8 > 0 ? r.top - th - 8 : below) + 'px';
    tipFor = el; tipAt = Date.now();
    if (PB.typeset) PB.typeset(tip);
  }
  function hideTip() { if (tip) tip.style.display = 'none'; tipFor = null; }
  document.addEventListener('mouseover', function (e) { const d = e.target.closest && e.target.closest('dfn.gl'); if (d && d !== tipFor) showTip(d); else if (!d && tipFor && !(e.target.closest && e.target.closest('.gl-tip'))) hideTip(); });
  document.addEventListener('focusin', function (e) { if (e.target.matches && e.target.matches('dfn.gl')) showTip(e.target); });
  document.addEventListener('click', function (e) { const d = e.target.closest && e.target.closest('dfn.gl'); if (d) { e.preventDefault(); if (tipFor === d && Date.now() - tipAt > 400) hideTip(); else if (tipFor !== d) showTip(d); } else if (!(e.target.closest && e.target.closest('.gl-tip'))) hideTip(); });
  window.addEventListener('scroll', hideTip, { passive: true });
  window.addEventListener('hashchange', hideTip);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });

  /* ---------- section hooks ---------- */
  const prevEnhance = PB.enhanceSection;
  PB.enhanceSection = function (ch, i, secEl, starts) {
    // Glossary runs on the authored prose before quizzes, figures and checks are added.
    if (prefs().on !== false) { const body = secEl.children[1]; if (body) linkTerms(body, ch.subject); }
    if (prevEnhance) prevEnhance(ch, i, secEl, starts);
    const plain = (PB.PLAIN[ch.id] || [])[i] || (ch.plainExtra || {})[i];
    if (!plain) return;
    if (prefs().on !== false) {
      const box = h('div', { class: 'plain-box subj-' + ch.subject }, [h('div', { class: 'plain-ico', text: '🗣️' }), h('div', {}, [h('div', { class: 'eyebrow', text: 'In plain words' }), h('p', { html: plain })])]);
      const head = secEl.querySelector('h2');
      if (head) head.after(box); else secEl.prepend(box);
    }
    secEl.appendChild(sayBack(ch, i, plain));
  };

  function sayBack(ch, i, plain) {
    const key = ch.id + ':' + i, p = prefs();
    const box = h('div', { class: 'say-back' });
    const head = h('div', { class: 'say-head' }, [h('span', { class: 'quiz-badge', text: '✎' }), h('b', { text: 'Say it back' }), h('small', { text: 'Explaining an idea in your own words is one of the best ways to make it stick.' })]);
    box.appendChild(head);
    if (p.say[key]) {
      box.appendChild(h('div', { class: 'say-done' }, [h('small', { text: 'Your words:' }), h('p', { text: p.say[key] }), h('small', { text: 'Plain-words summary:' }), h('p', { html: plain })]));
      return box;
    }
    const ta = h('textarea', { rows: '2', placeholder: 'In one or two sentences, what is this section saying? No symbols needed.' });
    const out = h('div');
    const btn = h('button', { class: 'btn small primary', type: 'button', text: 'Compare with the summary', onclick: function () {
      const v = ta.value.trim();
      if (v.split(/\s+/).length < 5) { out.innerHTML = ''; out.appendChild(h('p', { class: 'say-note', text: 'Try a full sentence of at least five words: it is the effort of putting it into words that helps.' })); return; }
      p.say[key] = v.slice(0, 600); PB.save();
      PB.addXP(3, 'Explained it in your own words');
      out.innerHTML = '';
      out.appendChild(h('div', { class: 'say-done' }, [h('small', { text: 'Plain-words summary:' }), h('p', { html: plain }),
        h('small', { text: 'Did yours say the same thing? If something was missing, skim the section again for it.' })]));
      btn.remove(); ta.disabled = true;
      if (PB.typeset) PB.typeset(out);
    } });
    box.append(ta, h('div', { class: 'say-row' }, [btn]), out);
    return box;
  }

  /* ---------- glossary page ---------- */
  function viewGlossary() {
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'eyebrow', text: 'Plain definitions' }));
    wrap.appendChild(h('h1', { text: 'Glossary', style: 'font-size:38px;margin-top:6px' }));
    wrap.appendChild(h('p', { class: 'lede', text: 'Every term that gets a dotted underline in the text, explained in everyday words. Hover over or tap a term in any chapter to see its definition without leaving the page.' }));
    const p = prefs();
    const tog = h('label', { class: 'gl-toggle' }, [h('input', { type: 'checkbox', checked: p.on !== false ? 'checked' : null, onchange: function (e) { p.on = e.target.checked; PB.save(); } }), h('span', { text: ' Show plain-words summaries and glossary underlines in chapters' })]);
    if (p.on === false) tog.querySelector('input').checked = false;
    wrap.appendChild(tog);
    const q = h('input', { type: 'search', class: 'gl-search', placeholder: 'Search ' + Object.keys(PB.GLOSSARY).length + ' terms…' });
    const subjSel = h('div', { class: 'gl-filters' });
    let subj = '';
    const list = h('div', { class: 'gl-list' });
    function draw() {
      list.innerHTML = '';
      const s = q.value.trim().toLowerCase();
      const terms = PB.glossaryTerms().filter(function (t) { return (!subj || !t.subj || t.subj.split(',').indexOf(subj) >= 0) && (!s || (t.name + ' ' + t.alias.join(' ') + ' ' + t.def).toLowerCase().indexOf(s) >= 0); });
      let letter = '';
      terms.forEach(function (t) {
        const L = t.name[0].toUpperCase();
        if (L !== letter) { letter = L; list.appendChild(h('div', { class: 'gl-letter', text: L })); }
        list.appendChild(h('div', { class: 'gl-item' }, [h('b', { text: t.name }), t.alias.length ? h('small', { text: ' also: ' + t.alias.join(', ') }) : null, h('p', { html: t.def })]));
      });
      if (!terms.length) list.appendChild(h('p', { class: 'empty', text: 'No terms match.' }));
      PB.typeset(list);
    }
    [['', 'All']].concat(PB.SUBJECTS.map(function (x) { return [x.id, x.name]; })).forEach(function (x) {
      subjSel.appendChild(h('button', { class: 'btn small' + (x[0] === subj ? ' primary' : ''), type: 'button', text: x[1], onclick: function (e) { subj = x[0]; subjSel.querySelectorAll('button').forEach(function (b) { b.classList.remove('primary'); }); e.target.classList.add('primary'); draw(); } }));
    });
    q.addEventListener('input', draw);
    wrap.append(q, subjSel, list);
    PB.setView([wrap], 'glossary');
    draw();
  }
  PB.views.glossary = viewGlossary;
  if (location.hash === '#glossary') PB.route();
})();
