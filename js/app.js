/* Physbook app: routing, views, problem cards, labs, HUD and toasts. */
(function () {
  'use strict';
  const PB = window.PB;
  const S = function () { return PB.S; };
  const $ = function (sel, el) { return (el || document).querySelector(sel); };
  const main = $('#main');

  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      const v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    (children || []).forEach(function (c) { if (c == null) return; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }

  function appendAll(el) { for (let i = 1; i < arguments.length; i++) if (arguments[i] != null) el.appendChild(arguments[i]); }

  /* ---------- MathJax ---------- */
  let mjReady = false; const mjQueue = [];
  function typeset(el) {
    if (!el.isConnected) { requestAnimationFrame(function () { if (el.isConnected) typeset(el); }); return; }
    if (mjReady && window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([el]).catch(function (e) { console.warn('MathJax', e); });
    } else mjQueue.push(el);
  }
  document.addEventListener('mathjax-ready', function () {
    mjReady = true;
    const items = mjQueue.splice(0).filter(function (el) { return el.isConnected; });
    if (items.length) MathJax.typesetPromise(items).catch(function () {});
  });

  /* ---------- Theme ---------- */
  function applyTheme() {
    if (S().theme) document.documentElement.setAttribute('data-theme', S().theme);
    else document.documentElement.removeAttribute('data-theme');
  }
  function isDark() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  PB.isDark = isDark;

  /* ---------- Small graphics ---------- */
  function ring(frac, size) {
    size = size || 40;
    const r = size / 2 - 3, c = 2 * Math.PI * r, f = Math.max(0, Math.min(1, frac));
    const wrap = h('span', { class: 'ring' });
    wrap.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="3"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + (f >= 1 ? 'var(--good)' : 'var(--accent)') + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + (c * f) + ' ' + c + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"' + (f <= 0 ? ' visibility="hidden"' : '') + '/>' +
      (size >= 36 ? '<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="' + (size * 0.26) + '" font-weight="600" fill="var(--ink-2)">' + Math.round(f * 100) + '</text>' : '') +
      '</svg>';
    return wrap;
  }
  function stars(n) {
    const s = h('span', { class: 'stars', title: n + ' of 3 stars: concept, core and olympiad sets', 'aria-label': n + ' of 3 stars' });
    for (let i = 0; i < 3; i++) s.appendChild(h('span', { class: i < n ? '' : 'off', text: '★' }));
    return s;
  }
  const FLAME = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 2c1 3.5 5 5.6 5 10.5A5 5 0 0 1 12 18a5 5 0 0 1-5-5.2c0-2.3 1.2-3.8 2.4-5 .2 1.8.9 3 2.1 3.6C11 8.6 11.3 5.2 12 2zm0 20c-3.9 0-7-2.6-7-6 0 0 1.5 2.6 7 2.6s7-2.6 7-2.6c0 3.4-3.1 6-7 6z"/></svg>';
  const SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></g></svg>';
  const MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20 14.6A8.5 8.5 0 0 1 9.4 4a8.5 8.5 0 1 0 10.6 10.6z"/></svg>';

  /* ---------- HUD & sidebar ---------- */
  function renderHUD() {
    const L = PB.levelInfo();
    const box = $('#hudStats');
    box.innerHTML = '';
    const lvl = h('a', { class: 'hud-level', href: '#profile', title: 'Your level and badges' }, [
      h('span', { class: 'lvl-chip', text: 'LV ' + L.level }),
      h('span', { class: 'hud-title', text: L.title }),
      h('span', { class: 'xpbar', html: '<span style="width:' + Math.round(L.frac * 100) + '%"></span>' }),
      h('span', { class: 'hud-xp', text: S().xp + (L.next ? ' / ' + L.next : '') + ' XP' })
    ]);
    const st = h('span', { class: 'hud-streak', title: 'Day streak: solve a problem or read a section each day', html: FLAME + PB.streakAlive() });
    const th = h('button', { class: 'icon-btn hud-theme', 'aria-label': 'Switch light or dark theme', html: isDark() ? SUN : MOON, onclick: function () {
      S().theme = isDark() ? 'light' : 'dark'; PB.save(); applyTheme(); renderHUD(); PB.emit({ type: 'theme' });
    } });
    box.append(lvl, st, th);
  }

  const PARTS = ['Foundations', 'Mechanics', 'Thermal Physics', 'Electricity & Magnetism', 'Optics', 'Modern Physics', 'Olympiad Extensions'];
  function renderSidebar(activeId) {
    const nav = $('#sidebar');
    nav.innerHTML = '';
    nav.appendChild(h('div', { class: 'rail-group', text: 'Book' }));
    [['home', 'Dashboard'], ['arena', 'Problem arena'], ['gym', 'Practice gym'], ['solver', 'Equation board'], ['formulas', 'Formula sheet'], ['profile', 'Level & badges']].forEach(function (x) {
      nav.appendChild(h('a', { class: 'rail-link' + (activeId === x[0] ? ' active' : ''), href: '#' + x[0] }, [h('span', { class: 'rail-num', text: '·' }), h('span', { class: 'rail-name', text: x[1] }), null]));
    });
    PARTS.forEach(function (part) {
      const chs = PB.chapters.filter(function (c) { return c.part === part; });
      if (!chs.length) return;
      nav.appendChild(h('div', { class: 'rail-group', text: part }));
      chs.forEach(function (c) {
        const st = PB.chapterStats(c);
        nav.appendChild(h('a', { class: 'rail-link' + (activeId === c.id ? ' active' : ''), href: '#ch-' + c.id }, [
          h('span', { class: 'rail-num', text: String(c.num).padStart(2, '0') }),
          h('span', { class: 'rail-name', text: c.title }),
          h('span', { class: 'rail-prog' }, [ring(st.progress, 26)])
        ]));
      });
    });
  }
  function setDrawer(open) {
    $('#sidebar').classList.toggle('open', open);
    $('#scrim').hidden = !open;
    $('#menuBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  $('#menuBtn').addEventListener('click', function () { setDrawer(!$('#sidebar').classList.contains('open')); });
  $('#scrim').addEventListener('click', function () { setDrawer(false); });

  /* ---------- Toasts ---------- */
  function toast(html, cls) {
    const t = h('div', { class: 'toast ' + (cls || ''), html: html });
    $('#toasts').appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; }, 2600);
    setTimeout(function () { t.remove(); }, 3100);
  }
  PB.on(function (ev) {
    if (ev.type === 'xp' && ev.amount > 0) toast('<span class="tx">+' + ev.amount + ' XP</span> ' + ev.reason);
    if (ev.type === 'levelup') toast('<span class="tx">LV ' + ev.level + '</span> You are now a ' + ev.title, 'badge-t');
    if (ev.type === 'quest') toast('<span class="tx">Quest</span> ' + ev.quest.text + ' <span class="tx">+' + ev.quest.xp + ' XP</span>', 'badge-t');
    if (ev.type === 'badge') toast('<span class="tx">Badge</span> ' + ev.badge.name + ' <span class="tx">+25 XP</span>', 'badge-t');
    if (ev.type === 'xp' || ev.type === 'badge' || ev.type === 'levelup') { renderHUD(); renderSidebar(currentActive); }
  });

  /* ---------- Problem card ---------- */
  const LEVEL_NAME = { concept: 'Concept', core: 'Core', olympiad: 'Olympiad' };
  function problemCard(p, opts) {
    opts = opts || {};
    const ch = PB.chapter(p.chapter);
    const card = h('article', { class: 'prob lv-' + p.level, id: 'prob-' + p.id });
    let selected = p.type === 'multi' ? [] : null;
    let confirming = false;
    let feedback = null;

    const top = h('div', { class: 'prob-top' });
    const body = h('div', { class: 'prob-body' });
    const q = h('div', { class: 'prob-q', html: p.q });
    body.appendChild(q);
    card.append(top, body);

    let optEls = [], input = null;
    if (p.type === 'mcq' || p.type === 'multi') {
      const box = h('div', { class: 'opts', role: p.type === 'mcq' ? 'radiogroup' : 'group' });
      p.options.forEach(function (o, i) {
        const b = h('button', { class: 'opt', type: 'button', 'aria-pressed': 'false', onclick: function () {
          if (locked()) return;
          if (p.type === 'mcq') selected = i;
          else { const k = selected.indexOf(i); if (k >= 0) selected.splice(k, 1); else selected.push(i); }
          feedback = null; update();
        } }, [h('span', { class: 'key-l', text: String.fromCharCode(65 + i) }), h('span', { html: o })]);
        optEls.push(b); box.appendChild(b);
      });
      body.appendChild(box);
      if (p.type === 'multi') body.appendChild(h('div', { class: 'input-hint', text: 'Select every correct option, then submit.' }));
    } else {
      input = h('input', { type: 'text', inputmode: 'decimal', id: 'in-' + p.id, 'aria-label': 'Your answer' + (p.unit ? ' in ' + p.unit : ''), placeholder: 'e.g. 3.2e4 or 2*pi*sqrt(2)', autocomplete: 'off' });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
      const row = h('div', { class: 'num-row' }, [input, p.unit ? h('span', { class: 'unit', html: p.unit }) : null]);
      body.appendChild(row);
      body.appendChild(h('div', { class: 'input-hint', text: 'Numbers, scientific notation (3e8, 3×10^8) and arithmetic with pi, sqrt, sin, ln are accepted. Graded within ' + Math.round((p.tol != null ? p.tol : 0.02) * 100) + '%.' }));
    }
    const actions = h('div', { class: 'prob-actions' });
    const fb = h('div');
    const hintBox = h('div');
    const solBox = h('div');
    body.append(actions, fb, hintBox, solBox);

    function locked() { return !!(S().solved[p.id] || S().revealed[p.id]); }
    function submit() {
      if (locked()) return;
      let ans;
      if (p.type === 'num') ans = input.value;
      else ans = selected;
      if (ans == null || (Array.isArray(ans) && !ans.length) || ans === '') { feedback = { no: true, msg: p.type === 'num' ? 'Type a number first.' : 'Choose an option first.' }; update(); return; }
      const r = PB.check(p, ans);
      if (r.invalid) feedback = { no: true, msg: 'That is not a number I can read. Try a form like 4.9, 3.0e8 or 2*sqrt(3).' };
      else if (r.ok) feedback = { ok: true, msg: 'Correct. +' + r.pts + ' XP' + (r.clean ? ' (first try, no hints)' : '') };
      else feedback = { no: true, msg: 'Not quite. This problem is now worth ' + PB.available(p) + ' points. Check your work or take a hint.' };
      update();
      if (opts.onChange) opts.onChange();
    }

    function update() {
      const st = PB.status(p);
      const solved = S().solved[p.id];
      top.innerHTML = '';
      appendAll(top,
        h('span', { class: 'prob-id', text: ch.num + '.' + p.num }),
        h('span', { class: 'prob-title', text: p.title || '' }),
        h('span', { class: 'chip ' + p.level, text: LEVEL_NAME[p.level] }),
        PB.isDaily(p) ? h('span', { class: 'chip', style: 'color:var(--points)', text: 'Daily ×2' }) : null,
        h('span', { class: 'spacer' }),
        st === 'solved' ? h('span', { class: 'prob-status solved', text: '✓ Solved' }) : st === 'revealed' ? h('span', { class: 'prob-status revealed', text: 'Solution viewed' }) : null,
        h('span', { class: 'pts', text: solved ? '+' + solved.pts : st === 'revealed' ? '0' : (PB.available(p) + ' pts') })
      );
      if (opts.showChapter) top.insertBefore(h('a', { class: 'prob-id', href: '#ch-' + ch.id + '--problems', text: ch.title }), top.children[1]);

      optEls.forEach(function (b, i) {
        const isSel = p.type === 'mcq' ? selected === i : selected.indexOf(i) >= 0;
        b.classList.toggle('sel', isSel && !locked());
        b.setAttribute('aria-pressed', isSel ? 'true' : 'false');
        const correct = p.type === 'mcq' ? p.answer === i : p.answer.indexOf(i) >= 0;
        b.classList.toggle('right', locked() && correct);
        b.classList.toggle('wrong', locked() && isSel && !correct);
        b.disabled = locked();
      });
      if (input) { input.disabled = locked(); if (locked() && !input.value) input.placeholder = 'Answer: ' + PB.fmt(p.answer, 4); }

      actions.innerHTML = '';
      if (!locked()) {
        actions.appendChild(h('button', { class: 'btn primary', type: 'button', text: 'Submit', onclick: submit }));
        const used = S().hints[p.id] || 0, total = (p.hints || []).length;
        if (used < total) actions.appendChild(h('button', { class: 'btn', type: 'button', text: 'Hint ' + (used + 1) + ' of ' + total + ' (−25%)', onclick: function () { PB.useHint(p); update(); if (opts.onChange) opts.onChange(); } }));
        actions.appendChild(h('button', { class: 'btn ghost warn', type: 'button', text: 'Show solution', onclick: function () { confirming = true; update(); } }));
        actions.appendChild(h('span', { class: 'avail', text: 'Worth ' + PB.available(p) + ' of ' + p.points * (PB.isDaily(p) ? 2 : 1) + ' points now' }));
      }
      fb.innerHTML = '';
      if (feedback) fb.appendChild(h('div', { class: 'feedback ' + (feedback.ok ? 'ok' : 'no'), text: feedback.msg }));
      if (confirming && !locked()) {
        fb.appendChild(h('div', { class: 'confirm' }, [
          h('span', { text: 'Viewing the solution forfeits this problem\u2019s points. Continue?' }),
          h('button', { class: 'btn small warn', type: 'button', text: 'Show it', onclick: function () { confirming = false; PB.reveal(p); update(); if (opts.onChange) opts.onChange(); } }),
          h('button', { class: 'btn small', type: 'button', text: 'Keep trying', onclick: function () { confirming = false; update(); } })
        ]));
      }
      const usedH = locked() ? (p.hints || []).length : (S().hints[p.id] || 0);
      if (hintBox.childElementCount !== usedH) {
        hintBox.innerHTML = '';
        for (let i = 0; i < usedH; i++) hintBox.appendChild(h('div', { class: 'hint', html: '<b>Hint ' + (i + 1) + '</b>' + p.hints[i] }));
        typeset(hintBox);
      }
      if (locked() && !solBox.childElementCount) {
        const ans = p.type === 'num' ? 'Answer: ' + PB.fmt(p.answer, 4) + (p.unit ? ' ' + p.unit : '') :
          'Answer: ' + (p.type === 'mcq' ? String.fromCharCode(65 + p.answer) : p.answer.map(function (i) { return String.fromCharCode(65 + i); }).join(', '));
        solBox.appendChild(h('div', { class: 'solution', html: '<b>Solution</b><p><strong>' + ans + '</strong></p>' + p.solution }));
        typeset(solBox);
      }
    }
    update();
    typeset(q); optEls.forEach(typeset);
    return card;
  }

  /* ---------- Labs ---------- */
  let activeLabs = [];
  function destroyLabs() { activeLabs.forEach(function (fn) { try { fn(); } catch (e) {} }); activeLabs = []; }
  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  let colorCache = null;
  PB.on(function (ev) { if (ev.type === 'theme') colorCache = null; });
  PB.colors = function () {
    if (colorCache) return colorCache;
    return (colorCache = {
      ink: cssVar('--ink'), ink2: cssVar('--ink-2'), ink3: cssVar('--ink-3'), line: cssVar('--line'), surface: cssVar('--surface'),
      surface2: cssVar('--surface-2'), accent: cssVar('--accent'), points: cssVar('--points'), good: cssVar('--good'), bad: cssVar('--bad'),
      teal: cssVar('--lvl-concept'), rust: cssVar('--lvl-olympiad'), paper: cssVar('--paper'), dark: isDark()
    });
  };
  function mountLab(ch, lab) {
    const wrap = h('section', { class: 'lab' });
    wrap.appendChild(h('div', { class: 'lab-head' }, [h('div', { class: 'eyebrow', text: 'Lab' }), h('h2', { text: lab.title }), h('p', { html: lab.desc || '' })]));
    const stage = h('div', { class: 'lab-stage' });
    const controls = h('div', { class: 'lab-controls' });
    wrap.appendChild(h('div', { class: 'lab-body' }, [stage, controls]));
    if (lab.tasks && lab.tasks.length) {
      const ul = h('ul');
      lab.tasks.forEach(function (t) { ul.appendChild(h('li', { html: t })); });
      wrap.appendChild(h('div', { class: 'lab-tasks' }, [h('h3', { text: 'Try this' }), ul]));
    }
    const cleanups = [];
    let rafId = null, loops = [], last = null, visible = true;
    const api = {
      stage: stage, controls: controls,
      colors: PB.colors,
      canvas: function (aspect, minH) {
        const c = h('canvas');
        stage.appendChild(c);
        const ctx = c.getContext('2d');
        const obj = { el: c, ctx: ctx, w: 0, h: 0, aspect: aspect || 0.6, onResize: null };
        function size() {
          const w = stage.clientWidth || 600;
          const hh = Math.max(minH || 260, Math.round(w * obj.aspect));
          const dpr = window.devicePixelRatio || 1;
          c.width = Math.round(w * dpr); c.height = Math.round(hh * dpr);
          c.style.height = hh + 'px';
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          obj.w = w; obj.h = hh;
          if (obj.onResize) obj.onResize();
        }
        size();
        const ro = new ResizeObserver(function () { if (Math.abs((stage.clientWidth || 0) - obj.w) > 1) size(); });
        ro.observe(stage);
        cleanups.push(function () { ro.disconnect(); });
        return obj;
      },
      slider: function (o) {
        const id = 'lab-' + ch.id + '-' + o.id;
        const out = h('output', { for: id });
        const inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || (o.max - o.min) / 100, value: o.value });
        const fmt = o.format || function (v) { return PB.fmt(v, 3) + (o.unit ? ' ' + o.unit : ''); };
        const ctl = h('div', { class: 'ctl' }, [h('label', { for: id }, [h('span', { html: o.label }), out]), inp]);
        const s = { get value() { return parseFloat(inp.value); }, set value(v) { inp.value = v; out.textContent = fmt(parseFloat(inp.value)); } };
        out.textContent = fmt(parseFloat(inp.value));
        inp.addEventListener('input', function () { out.textContent = fmt(parseFloat(inp.value)); if (o.onChange) o.onChange(parseFloat(inp.value)); });
        controls.appendChild(ctl);
        return s;
      },
      select: function (o) {
        const id = 'lab-' + ch.id + '-' + o.id;
        const sel = h('select', { id: id });
        o.options.forEach(function (op) { sel.appendChild(h('option', { value: op[0], text: op[1] })); });
        sel.value = o.value;
        sel.addEventListener('change', function () { if (o.onChange) o.onChange(sel.value); });
        controls.appendChild(h('div', { class: 'ctl' }, [h('label', { for: id }, [h('span', { html: o.label })]), sel]));
        return { get value() { return sel.value; } };
      },
      check: function (o) {
        const id = 'lab-' + ch.id + '-' + o.id;
        const inp = h('input', { type: 'checkbox', id: id });
        inp.checked = !!o.value;
        inp.addEventListener('change', function () { if (o.onChange) o.onChange(inp.checked); });
        controls.appendChild(h('label', { class: 'ctl-check', for: id }, [inp, h('span', { html: o.label })]));
        return { get value() { return inp.checked; } };
      },
      buttons: function (list) {
        const row = h('div', { class: 'ctl-btns' });
        list.forEach(function (b) { row.appendChild(h('button', { class: 'btn small' + (b.primary ? ' primary' : ''), type: 'button', text: b.label, onclick: b.onClick })); });
        controls.appendChild(row);
        return row;
      },
      readout: function () {
        const box = h('div', { class: 'readout', 'aria-live': 'off' });
        controls.appendChild(box);
        return function (rows) {
          box.innerHTML = '';
          rows.forEach(function (r) { box.appendChild(h('div', {}, [h('span', { html: r[0] }), h('b', { html: r[1] })])); });
        };
      },
      loop: function (fn) {
        loops.push(fn);
        if (rafId == null) {
          const tick = function (t) {
            rafId = requestAnimationFrame(tick);
            if (!visible) { last = t; return; }
            let dt = last == null ? 0.016 : (t - last) / 1000;
            last = t;
            dt = Math.min(dt, 0.05);
            loops.forEach(function (f) { f(dt); });
          };
          rafId = requestAnimationFrame(tick);
        }
      },
      onDestroy: function (fn) { cleanups.push(fn); }
    };
    const io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; });
    io.observe(stage);
    const mark = function () { if (PB.markLab(ch.id)) {} wrap.removeEventListener('pointerdown', mark); wrap.removeEventListener('input', mark); };
    wrap.addEventListener('pointerdown', mark);
    wrap.addEventListener('input', mark);
    activeLabs.push(function () { if (rafId != null) cancelAnimationFrame(rafId); io.disconnect(); cleanups.forEach(function (f) { f(); }); });
    return { el: wrap, start: function () {
      const sim = PB.sims[lab.sim];
      if (!sim) { stage.appendChild(h('p', { class: 'empty', text: 'This lab failed to load.' })); return; }
      try { sim(api, lab.params || {}); } catch (e) { console.error(e); stage.appendChild(h('p', { class: 'empty', text: 'This lab hit an error: ' + e.message })); }
      typeset(wrap);
    } };
  }

  /* ---------- Views ---------- */
  let currentActive = 'home';
  function setView(nodes, active) {
    destroyLabs();
    currentActive = active;
    main.innerHTML = '';
    nodes.forEach(function (n) { if (n) main.appendChild(n); });
    renderSidebar(active);
    setDrawer(false);
  }

  function viewHome() {
    const L = PB.levelInfo();
    const all = PB.allProblems();
    const solvedN = Object.keys(S().solved).length;
    const cont = S().lastChapter ? PB.chapter(S().lastChapter) : PB.chapters[0];
    const nBadges = Object.keys(S().badges).length;
    const wrap = h('div', { class: 'wrap-wide' });

    const hero = h('section', { class: 'home-hero' }, [
      h('div', {}, [
        h('div', { class: 'eyebrow', text: PB.chapters.length + ' chapters · ' + all.length + ' scored problems · ' + PB.chapters.reduce(function (a, c) { return a + (c.labs || []).length; }, 0) + ' labs' }),
        h('h1', { text: 'Learn the idea. Run the lab. Earn the points.', style: 'margin-top:10px' }),
        h('p', { class: 'lede', html: 'A physics course that runs from units and vectors to quantum and nuclear physics, in the order of the standard university texts. Every chapter ends in a scored problem set that climbs from concept checks to olympiad-level problems.' }),
        h('div', { class: 'hero-cta' }, [
          h('a', { class: 'btn primary', href: '#ch-' + cont.id, text: (S().lastChapter ? 'Continue: ' : 'Start: ') + cont.num + '. ' + cont.title }),
          h('a', { class: 'btn', href: '#gym', text: 'Practice gym' }),
          h('a', { class: 'btn', href: '#arena', text: 'Problem arena' }),
          h('a', { class: 'btn', href: '#solver', text: 'Equation board' }),
          h('a', { class: 'btn ghost', href: '#formulas', text: 'Formula sheet' })
        ])
      ]),
      h('a', { class: 'profile-card', href: '#profile', style: 'text-decoration:none;color:inherit' }, [
        h('div', { class: 'big-level' }, [h('span', { class: 'n', text: L.level }), h('span', {}, [h('div', { class: 'eyebrow', text: 'Level' }), h('div', { class: 't', text: L.title })])]),
        h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(L.frac * 100) + '%"></span>' }),
        h('div', { class: 'hud-xp', text: S().xp + ' XP' + (L.next ? ' · ' + (L.next - S().xp) + ' to level ' + (L.level + 1) : ' · top level') }),
        h('div', { class: 'stat-row' }, [
          h('div', { class: 'stat' }, [h('b', { text: solvedN + '/' + all.length }), h('span', { text: 'solved' })]),
          h('div', { class: 'stat' }, [h('b', { html: PB.streakAlive() + 'd' }), h('span', { text: 'streak' })]),
          h('div', { class: 'stat' }, [h('b', { text: nBadges + '/' + PB.BADGES.length }), h('span', { text: 'badges' })])
        ])
      ])
    ]);
    wrap.appendChild(hero);

    const dp = PB.dailyProblem();
    if (dp) {
      const dch = PB.chapter(dp.chapter);
      const done = S().solved[dp.id];
      wrap.appendChild(h('section', { class: 'daily' }, [
        h('div', { class: 'daily-badge', html: '<b>×2</b>points' }),
        h('div', {}, [h('div', { class: 'eyebrow', text: "Today's challenge" }), h('h3', { text: dch.num + '.' + dp.num + '  ' + (dp.title || 'Problem') }), h('p', { text: done ? 'Solved today. A new challenge appears tomorrow.' : dch.title + ' · ' + LEVEL_NAME[dp.level] + ' · ' + dp.points * 2 + ' points while it lasts.' })]),
        h('a', { class: 'btn ' + (done ? '' : 'primary'), href: '#ch-' + dch.id + '--problems', 'data-focus': dp.id, text: done ? 'Review' : 'Take it on', onclick: function () { pendingFocus = dp.id; } })
      ]));
    }

    if (PB.homeExtras) PB.homeExtras(wrap);
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'How scoring works' })]));
    const tbl = h('div', { class: 'table-wrap' });
    tbl.innerHTML = '<table class="prose" style="font-size:14px;margin:0;width:100%"><thead><tr><th>Tier</th><th>Base points</th><th>What it tests</th></tr></thead><tbody>' +
      '<tr><td><span class="chip concept">Concept</span></td><td><span class="pts">10</span></td><td>Do you understand the idea? Quick multiple choice.</td></tr>' +
      '<tr><td><span class="chip core">Core</span></td><td><span class="pts">20</span></td><td>Textbook-standard numerical problems.</td></tr>' +
      '<tr><td><span class="chip olympiad">Olympiad</span></td><td><span class="pts">40</span></td><td>Multi-step problems in the style of national and international olympiads.</td></tr>' +
      '</tbody></table><p style="color:var(--ink-2);font-size:13.5px;margin:10px 0 0">Each hint costs 25% of the base points. A wrong numerical answer costs 15%, a wrong multiple-choice answer 34%. A problem never drops below 20% while you keep trying. Viewing the solution forfeits the problem. The daily challenge pays double, every badge adds 25 XP, and each section read or lab explored adds 5 XP. Three daily quests pay bonus XP, and the practice gym pays for streaks of correct drills (combo multiplier up to ×3).</p>';
    wrap.appendChild(tbl);

    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Chapters' }), h('p', { text: 'Rings show reading plus problems completed. Stars mark finished concept, core and olympiad sets.' })]));
    PARTS.forEach(function (part) {
      const chs = PB.chapters.filter(function (c) { return c.part === part; });
      if (!chs.length) return;
      wrap.appendChild(h('div', { class: 'part-label', text: part }));
      const grid = h('div', { class: 'ch-grid' });
      chs.forEach(function (c) {
        const st = PB.chapterStats(c);
        grid.appendChild(h('a', { class: 'ch-card', href: '#ch-' + c.id }, [
          h('div', { class: 'num', text: 'Chapter ' + c.num }),
          ring(st.progress, 42),
          h('h3', { text: c.title }),
          h('div', { class: 'meta' }, [stars(st.stars), h('span', { text: st.solved + '/' + st.total + ' solved' }), h('span', { text: st.earned + ' pts' })])
        ]));
      });
      wrap.appendChild(grid);
    });
    setView([wrap], 'home');
  }

  let pendingFocus = null;
  function viewChapter(id, tab) {
    const ch = PB.chapter(id);
    if (!ch) return viewHome();
    S().lastChapter = ch.id; PB.save();
    tab = tab || 'learn';
    const wrap = h('div', { class: 'wrap' });
    const st = PB.chapterStats(ch);
    const head = h('header', { class: 'ch-head' }, [
      h('div', { class: 'eyebrow', text: 'Chapter ' + ch.num + ' · ' + ch.part }),
      h('h1', { text: ch.title }),
      h('p', { class: 'lede', html: ch.subtitle }),
      h('div', { class: 'ch-progress' }, [
        stars(st.stars),
        h('span', { text: st.read + '/' + st.sections + ' sections read' }),
        h('span', { text: st.solved + '/' + st.total + ' problems solved' }),
        h('span', { class: 'pts', text: st.earned + ' / ' + st.possible + ' pts' })
      ])
    ]);
    wrap.appendChild(head);
    const tabs = h('nav', { class: 'tabs', 'aria-label': 'Chapter sections' });
    [['learn', 'Learn', st.sections], ['lab', 'Lab', (ch.labs || []).length], ['problems', 'Problems', st.total], ['formulas', 'Formulas', (ch.formulas || []).length]].forEach(function (t) {
      tabs.appendChild(h('a', { class: 'tab' + (tab === t[0] ? ' active' : ''), href: '#ch-' + ch.id + (t[0] === 'learn' ? '' : '--' + t[0]) }, [t[1], h('span', { class: 'count', text: String(t[2]) })]));
    });
    wrap.appendChild(tabs);
    const content = h('div');
    wrap.appendChild(content);
    const labStarts = [];

    if (tab === 'learn') {
      if (ch.goals && ch.goals.length) {
        const toc = h('div', { class: 'toc' }, [h('div', { class: 'eyebrow', text: 'In this chapter' })]);
        const ol = h('ol');
        ch.sections.forEach(function (s, i) {
          const done = S().read[ch.id + ':' + i];
          ol.appendChild(h('li', {}, [h('a', { href: '#ch-' + ch.id, onclick: function (e) { e.preventDefault(); const t = document.getElementById('sec-' + i); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, html: s.title }), done ? h('span', { class: 'done', text: '✓ read' }) : null]));
        });
        toc.appendChild(ol);
        toc.appendChild(h('p', { style: 'margin:10px 0 0;font-size:14px;color:var(--ink-2)', html: '<strong>Goals:</strong> ' + ch.goals.join(' · ') }));
        content.appendChild(toc);
      }
      ch.sections.forEach(function (s, i) {
        const sec = h('section', { class: 'section prose' });
        sec.appendChild(h('h2', { id: 'sec-' + i, html: '<span class="sec-num">' + ch.num + '.' + (i + 1) + '</span><span>' + s.title + '</span>' }));
        sec.appendChild(h('div', { html: s.html }));
        const done = !!S().read[ch.id + ':' + i];
        const btn = h('button', { class: 'btn small' + (done ? ' done' : ''), type: 'button', text: done ? '✓ Read' : 'Mark as read (+5 XP)', onclick: function () {
          if (PB.markRead(ch.id, i)) { btn.className = 'btn small done'; btn.textContent = '✓ Read'; }
        } });
        sec.appendChild(h('div', { class: 'read-row' }, [btn]));
        content.appendChild(sec);
      });
      content.appendChild(h('div', { class: 'hero-cta' }, [
        h('a', { class: 'btn primary', href: '#ch-' + ch.id + '--problems', text: 'Go to the problems' }),
        (ch.labs || []).length ? h('a', { class: 'btn', href: '#ch-' + ch.id + '--lab', text: 'Open the lab' }) : null
      ]));
    } else if (tab === 'lab') {
      (ch.labs || []).forEach(function (lab) { const m = mountLab(ch, lab); content.appendChild(m.el); labStarts.push(m.start); });
      if (!(ch.labs || []).length) content.appendChild(h('p', { class: 'empty', text: 'No lab in this chapter.' }));
    } else if (tab === 'problems') {
      [['concept', 'Concept checks'], ['core', 'Core problems'], ['olympiad', 'Olympiad problems']].forEach(function (lv) {
        const ps = ch.problems.filter(function (p) { return p.level === lv[0]; });
        if (!ps.length) return;
        const s = st[lv[0]];
        content.appendChild(h('div', { class: 'section-head', style: 'margin-top:8px' }, [h('h2', { text: lv[1] }), h('p', { text: s.solved + ' of ' + s.total + ' solved' })]));
        const list = h('div', { class: 'prob-list' });
        ps.forEach(function (p) { list.appendChild(problemCard(p, { onChange: function () { renderSidebar(ch.id); } })); });
        content.appendChild(list);
      });
    } else if (tab === 'formulas') {
      content.appendChild(formulaBlock(ch, false));
    }

    const i = PB.chapters.indexOf(ch);
    const prev = PB.chapters[i - 1], next = PB.chapters[i + 1];
    wrap.appendChild(h('nav', { class: 'ch-nav', 'aria-label': 'Previous and next chapter' }, [
      prev ? h('a', { href: '#ch-' + prev.id }, [h('small', { text: '← Chapter ' + prev.num }), prev.title]) : null,
      next ? h('a', { class: 'next', href: '#ch-' + next.id }, [h('small', { text: 'Chapter ' + next.num + ' →' }), next.title]) : null
    ]));
    setView([wrap], ch.id);
    labStarts.forEach(function (f) { f(); });
    typeset(content); typeset(head);
    if (pendingFocus) {
      const el = document.getElementById('prob-' + pendingFocus);
      pendingFocus = null;
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    } else window.scrollTo(0, 0);
  }

  function formulaBlock(ch, withTitle) {
    const b = h('section', { class: 'formula-block' });
    if (withTitle) b.appendChild(h('h3', {}, [h('span', { class: 'prob-id', text: String(ch.num).padStart(2, '0') }), h('a', { href: '#ch-' + ch.id, text: ch.title })]));
    const list = h('div', { class: 'formula-list' });
    (ch.formulas || []).forEach(function (f) { list.appendChild(h('div', { class: 'formula' }, [h('span', { html: f[0] }), h('div', { class: 'm', html: '$' + f[1] + '$' })])); });
    b.appendChild(list);
    return b;
  }

  function viewFormulas() {
    const wrap = h('div', { class: 'wrap-wide' }, [
      h('div', { class: 'eyebrow', text: 'Reference' }), h('h1', { text: 'Formula sheet', style: 'font-size:34px;margin-top:6px' }),
      h('p', { class: 'lede', text: 'Every key result in the book, one block per chapter. Knowing where a formula comes from matters more than memorising it: each one is derived in its chapter.' })
    ]);
    const consts = h('section', { class: 'formula-block', style: 'margin-top:22px' }, [h('h3', { text: 'Constants used in this book' })]);
    const cl = h('div', { class: 'formula-list' });
    [['Gravitational field at Earth\u2019s surface', 'g = 9.8\\ \\mathrm{m\\,s^{-2}}'], ['Gravitational constant', 'G = 6.674\\times10^{-11}\\ \\mathrm{N\\,m^2\\,kg^{-2}}'], ['Speed of light', 'c = 2.998\\times10^{8}\\ \\mathrm{m/s}'],
      ['Elementary charge', 'e = 1.602\\times10^{-19}\\ \\mathrm{C}'], ['Electron mass', 'm_e = 9.109\\times10^{-31}\\ \\mathrm{kg}'], ['Proton mass', 'm_p = 1.673\\times10^{-27}\\ \\mathrm{kg}'],
      ['Planck constant', 'h = 6.626\\times10^{-34}\\ \\mathrm{J\\,s}'], ['Boltzmann constant', 'k_B = 1.381\\times10^{-23}\\ \\mathrm{J/K}'], ['Avogadro constant', 'N_A = 6.022\\times10^{23}\\ \\mathrm{mol^{-1}}'],
      ['Gas constant', 'R = 8.314\\ \\mathrm{J\\,mol^{-1}K^{-1}}'], ['Coulomb constant', 'k = \\tfrac{1}{4\\pi\\varepsilon_0} = 8.988\\times10^{9}\\ \\mathrm{N\\,m^2C^{-2}}'], ['Vacuum permittivity', '\\varepsilon_0 = 8.854\\times10^{-12}\\ \\mathrm{F/m}'],
      ['Vacuum permeability', '\\mu_0 = 4\\pi\\times10^{-7}\\ \\mathrm{T\\,m/A}'], ['Stefan–Boltzmann', '\\sigma = 5.670\\times10^{-8}\\ \\mathrm{W\\,m^{-2}K^{-4}}'], ['Electron-volt', '1\\ \\mathrm{eV} = 1.602\\times10^{-19}\\ \\mathrm{J}'],
      ['Atomic mass unit', '1\\ \\mathrm{u} = 931.5\\ \\mathrm{MeV}/c^2'], ['Earth', 'M_E = 5.97\\times10^{24}\\ \\mathrm{kg},\\ R_E = 6.37\\times10^{6}\\ \\mathrm{m}'], ['hc', 'hc = 1240\\ \\mathrm{eV\\,nm}']
    ].forEach(function (f) { cl.appendChild(h('div', { class: 'formula' }, [h('span', { text: f[0] }), h('div', { class: 'm', html: '$' + f[1] + '$' })])); });
    consts.appendChild(cl);
    wrap.appendChild(consts);
    PB.chapters.forEach(function (c) { wrap.appendChild(formulaBlock(c, true)); });
    setView([wrap], 'formulas');
    typeset(wrap);
    window.scrollTo(0, 0);
  }

  const arenaState = { level: 'all', status: 'all', chapter: 'all', shown: 12 };
  function viewArena() {
    const wrap = h('div', { class: 'wrap' }, [
      h('div', { class: 'eyebrow', text: 'Every problem in one place' }), h('h1', { text: 'Problem arena', style: 'font-size:34px;margin-top:6px' }),
      h('p', { class: 'lede', text: 'Filter by tier, chapter or status and work through problems in any order. Olympiad problems are where the real points are.' })
    ]);
    const filters = h('div', { class: 'prob-filters', style: 'margin-top:20px' });
    function seg(key, opts) {
      const s = h('div', { class: 'seg', role: 'group' });
      opts.forEach(function (o) { s.appendChild(h('button', { type: 'button', class: arenaState[key] === o[0] ? 'on' : '', 'aria-pressed': arenaState[key] === o[0] ? 'true' : 'false', text: o[1], onclick: function () { arenaState[key] = o[0]; arenaState.shown = 12; viewArena(); } })); });
      return s;
    }
    filters.appendChild(seg('level', [['all', 'All tiers'], ['concept', 'Concept'], ['core', 'Core'], ['olympiad', 'Olympiad']]));
    filters.appendChild(seg('status', [['all', 'Any status'], ['open', 'Unsolved'], ['solved', 'Solved']]));
    const sel = h('select', { class: 'filter-select', id: 'arena-chapter', 'aria-label': 'Chapter', onchange: function () { arenaState.chapter = sel.value; arenaState.shown = 12; viewArena(); } });
    sel.appendChild(h('option', { value: 'all', text: 'All chapters' }));
    PB.chapters.forEach(function (c) { sel.appendChild(h('option', { value: c.id, text: c.num + '. ' + c.title })); });
    sel.value = arenaState.chapter;
    filters.appendChild(sel);
    wrap.appendChild(filters);
    const ps = PB.allProblems().filter(function (p) {
      if (arenaState.level !== 'all' && p.level !== arenaState.level) return false;
      if (arenaState.chapter !== 'all' && p.chapter !== arenaState.chapter) return false;
      const st = PB.status(p);
      if (arenaState.status === 'open' && (st === 'solved' || st === 'revealed')) return false;
      if (arenaState.status === 'solved' && st !== 'solved') return false;
      return true;
    });
    const pts = ps.reduce(function (a, p) { return a + (S().solved[p.id] ? 0 : (S().revealed[p.id] ? 0 : PB.available(p))); }, 0);
    wrap.appendChild(h('p', { style: 'color:var(--ink-2);font-size:14px;margin:0 0 14px', text: ps.length + ' problems match · ' + pts + ' points still on the table' }));
    const list = h('div', { class: 'prob-list' });
    ps.slice(0, arenaState.shown).forEach(function (p) { list.appendChild(problemCard(p, { showChapter: true })); });
    if (!ps.length) list.appendChild(h('p', { class: 'empty', text: 'No problems match these filters. Widen a filter to see more.' }));
    wrap.appendChild(list);
    if (ps.length > arenaState.shown) {
      wrap.appendChild(h('div', { class: 'hero-cta', style: 'justify-content:center' }, [h('button', { class: 'btn', type: 'button', text: 'Show 12 more (' + (ps.length - arenaState.shown) + ' left)', onclick: function () {
        const from = arenaState.shown; arenaState.shown += 12;
        ps.slice(from, arenaState.shown).forEach(function (p) { list.appendChild(problemCard(p, { showChapter: true })); });
        if (arenaState.shown >= ps.length) this.parentNode.remove(); else this.textContent = 'Show 12 more (' + (ps.length - arenaState.shown) + ' left)';
      } })]));
    }
    const y = window.scrollY;
    setView([wrap], 'arena');
    window.scrollTo(0, y);
  }

  function viewProfile() {
    const L = PB.levelInfo();
    const all = PB.allProblems();
    const solved = Object.keys(S().solved).map(PB.problem).filter(Boolean);
    const wrap = h('div', { class: 'wrap' }, [
      h('div', { class: 'eyebrow', text: 'Your progress' }), h('h1', { text: 'Level & badges', style: 'font-size:34px;margin-top:6px' })
    ]);
    const card = h('div', { class: 'profile-card', style: 'margin-top:18px' }, [
      h('div', { class: 'big-level' }, [h('span', { class: 'n', text: L.level }), h('span', {}, [h('div', { class: 'eyebrow', text: 'Level' }), h('div', { class: 't', text: L.title })])]),
      h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(L.frac * 100) + '%"></span>' }),
      h('div', { class: 'stat-row' }, [
        h('div', { class: 'stat' }, [h('b', { text: S().xp }), h('span', { text: 'total XP' })]),
        h('div', { class: 'stat' }, [h('b', { text: solved.filter(function (p) { return p.level === 'olympiad'; }).length + '/' + all.filter(function (p) { return p.level === 'olympiad'; }).length }), h('span', { text: 'olympiad solved' })]),
        h('div', { class: 'stat' }, [h('b', { text: (S().streak.best || 0) + 'd' }), h('span', { text: 'best streak' })])
      ])
    ]);
    wrap.appendChild(card);
    if (PB.profileExtras) PB.profileExtras(wrap);
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Badges' }), h('p', { text: Object.keys(S().badges).length + ' of ' + PB.BADGES.length + ' earned' })]));
    const grid = h('div', { class: 'badge-grid' });
    PB.BADGES.forEach(function (b) {
      const got = S().badges[b.id];
      grid.appendChild(h('div', { class: 'badge' + (got ? ' earned' : '') }, [h('div', { class: 'medal', text: b.mark }), h('div', {}, [h('h3', { text: b.name }), h('p', { text: b.desc })])]));
    });
    wrap.appendChild(grid);
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Level ladder' })]));
    const lad = h('div', { class: 'level-ladder' });
    PB.LEVELS.forEach(function (lv, i) {
      lad.appendChild(h('div', { class: 'ladder-row' + (i + 1 === L.level ? ' cur' : '') + (S().xp < lv.xp ? ' locked' : '') }, [h('span', { class: 'n', text: 'LV ' + (i + 1) }), h('span', { text: lv.title }), h('span', { class: 'x', text: lv.xp + ' XP' })]));
    });
    wrap.appendChild(lad);
    wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Move or reset progress' }), h('p', { text: 'Progress lives in this browser only.' })]));
    const ta = h('textarea', { id: 'progress-data', 'aria-label': 'Progress data', placeholder: 'Press Export to get your progress as text, or paste exported text here and press Import.' });
    const msg = h('p', { style: 'font-size:13.5px;color:var(--ink-2);margin:8px 0 0' });
    const tools = h('div', { class: 'data-tools' }, [
      h('button', { class: 'btn small', type: 'button', text: 'Export', onclick: function () {
        ta.value = PB.exportProgress(); ta.select();
        if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(function () { msg.textContent = 'Copied to the clipboard. Paste it into Import on another device.'; }, function () { msg.textContent = 'Text selected. Copy it to move your progress.'; });
        else msg.textContent = 'Text selected. Copy it to move your progress.';
      } }),
      h('button', { class: 'btn small', type: 'button', text: 'Import', onclick: function () {
        try { PB.importProgress(ta.value); applyTheme(); msg.textContent = 'Progress imported.'; renderHUD(); viewProfile(); } catch (e) { msg.textContent = 'Import failed: ' + (e.message || 'the text could not be read') + ' Paste the full export and try again.'; }
      } }),
      h('button', { class: 'btn small warn', type: 'button', text: 'Reset all progress', onclick: function () {
        msg.innerHTML = '';
        msg.append('This erases all XP, solved problems and badges. ', h('button', { class: 'btn small warn', type: 'button', text: 'Erase everything', onclick: function () { PB.resetProgress(); renderHUD(); viewProfile(); } }), ' ', h('button', { class: 'btn small', type: 'button', text: 'Cancel', onclick: function () { msg.textContent = ''; } }));
      } }),
      ta
    ]);
    wrap.appendChild(tools);
    wrap.appendChild(msg);
    setView([wrap], 'profile');
    window.scrollTo(0, 0);
  }

  /* ---------- Router ---------- */
  function route() {
    const hs = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (!hs || hs === 'home') return viewHome();
    if (hs === 'arena') return viewArena();
    if (hs === 'formulas') return viewFormulas();
    if (hs === 'profile') return viewProfile();
    if (PB.views && PB.views[hs]) return PB.views[hs]();
    if (hs.indexOf('ch-') === 0) {
      const rest = hs.slice(3).split('--');
      return viewChapter(rest[0], rest[1]);
    }
    viewHome();
  }
  window.addEventListener('hashchange', route);
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onMq = function () { if (!S().theme) { renderHUD(); PB.emit({ type: 'theme' }); } };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
  }
  applyTheme();
  PB.checkBadges();
  renderHUD();
  route();
  PB.problemCard = problemCard;
  /* Hooks for extra views (such as the equation board in solver.js) */
  PB.h = h;
  PB.typeset = typeset;
  PB.setView = setView;
  PB.onViewDestroy = function (fn) { activeLabs.push(fn); };
  PB.toast = toast;
})();
