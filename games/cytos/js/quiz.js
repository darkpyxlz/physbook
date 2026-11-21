/* Cytos — Cell School: five-question rounds with spaced repetition. Insight (🧠) is earned only here.
   An item is learned after LEARN_BOX counting reviews; a review only counts once its interval has passed.
   First correct answer pays 2, a due review 1, too soon 0; streaks (from the 3rd) +1 each, perfect round +2. */
'use strict';
(function () {
  const CY = window.CY;
  const ROUND = 5, LEARN_BOX = 10;
  const MIN = 60e3, HOUR = 3600e3, DAY = 86400e3;
  const INTERVALS = [0, 10 * MIN, 30 * MIN, 2 * HOUR, 6 * HOUR, 12 * HOUR, DAY, 2 * DAY, 4 * DAY, 7 * DAY, 14 * DAY];
  const PAY = { first: 2, due: 1, soon: 0, streakFrom: 3, streak: 1, perfect: 2 };
  const now = () => Date.now();
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const uniq = (a) => [...new Set(a)];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const fmtDur = (ms) => { if (ms <= 0) return 'now'; const m = ms / MIN; if (m < 60) return Math.ceil(m) + ' min'; const h = m / 60; if (h < 24) return Math.round(h) + ' h'; return Math.round(h / 24) + ' d'; };

  const Q = () => CY.state().meta.quiz;
  const rec = (id) => Q().items[id];

  /* ---------- items ---------- */
  const BANK = CY.QUIZ_BANK;
  const BANK_BY_ID = Object.fromEntries(BANK.map((b) => [b.id, b]));
  function genItems() {
    const out = [];
    for (const c of Object.keys(CY.CODONS)) out.push({ id: 'cod:' + c, cat: 'gene' });
    for (const k of Object.keys(CY.TARGET.SIGNALS)) out.push({ id: 'tgt:' + k, cat: 'org' });
    for (const k of Object.keys(CY.LESIONS)) out.push({ id: 'rep:' + k, cat: 'cyc' });
    for (const [k, c] of Object.entries(CY.CASCADES)) for (let i = 0; i < c.steps.length - 1; i++) out.push({ id: `cas:${k}:${i}`, cat: 'sig' });
    return out;
  }
  const ALL = [...BANK.map((b) => ({ id: b.id, cat: b.cat })), ...genItems()];
  const CAT_OF = Object.fromEntries(ALL.map((x) => [x.id, x.cat]));

  function build(id) {
    if (BANK_BY_ID[id]) {
      const b = BANK_BY_ID[id];
      return finish({ id, cat: b.cat, prompt: b.q, ex: b.ex }, b.a, b.w);
    }
    const [kind, k, i] = id.split(':');
    if (kind === 'cod') {
      const aa = CY.CODONS[k];
      if (Math.random() < 0.6) return finish({ id, cat: 'gene', prompt: `Which amino acid does the mRNA codon ${k} code for?`, ex: `${k} → ${aa}.` }, aa, shuffle(uniq(Object.values(CY.CODONS)).filter((x) => x !== aa)));
      const ac = k.split('').map((b) => ({ A: 'U', U: 'A', G: 'C', C: 'G' })[b]).join('');
      const wrong = shuffle([k, ac.split('').reverse().join(''), k.split('').map((b) => ({ A: 'T', U: 'A', G: 'C', C: 'G' })[b]).join(''), ...Object.keys(CY.CODONS).slice(0, 6)]).filter((x) => x !== ac);
      return finish({ id, cat: 'gene', prompt: `Which tRNA anticodon (written 3′→5′) pairs with the codon 5′-${k}-3′?`, ex: `Anticodons are complementary: ${k} pairs with 3′-${ac}-5′. RNA uses U, not T.` }, ac, wrong);
    }
    if (kind === 'tgt') {
      const S = CY.TARGET.SIGNALS[k], C = CY.TARGET.COMPARTMENTS;
      return finish({ id, cat: 'org', prompt: `A protein with "${S.sig}" ends up in the…`, ex: `e.g. ${S.prot[0]} → ${C[k].name}.` }, C[k].name, shuffle(Object.keys(C).filter((x) => x !== k).map((x) => C[x].name)));
    }
    if (kind === 'rep') {
      const L = CY.LESIONS[k];
      return finish({ id, cat: 'cyc', prompt: `Which pathway repairs this damage: ${L.desc.toLowerCase()}?`, ex: CY.REPAIR[L.fix].explain }, CY.REPAIR[L.fix].label, shuffle(Object.keys(CY.REPAIR).filter((x) => x !== L.fix).map((x) => CY.REPAIR[x].label)));
    }
    if (kind === 'cas') {
      const c = CY.CASCADES[k], n = +i;
      return finish({ id, cat: 'sig', prompt: `In ${c.name} signalling, what comes directly after “${c.steps[n]}”?`, ex: c.steps.join(' → ') },
        c.steps[n + 1], shuffle(uniq([...c.steps.filter((_, j) => j !== n + 1 && j !== n), ...Object.values(CY.CASCADES).flatMap((x) => x.steps)])).filter((x) => x !== c.steps[n + 1] && x !== c.steps[n]));
    }
    return null;
  }
  function finish(q, right, wrongs) {
    const opts = shuffle([right, ...uniq(wrongs).filter((w) => w !== right).slice(0, 3)]);
    q.options = opts; q.answer = opts.indexOf(right);
    return q;
  }

  function priority(id, dueOnly) {
    const r = rec(id);
    if (dueOnly) return r && !r.learned && now() >= r.due ? 40 : 0;
    if (!r) return 2;
    if (r.learned) return now() >= r.due ? 0.4 : 0.04;
    return now() >= r.due ? 3 : 0.12;
  }
  function sampleIds(pool, k, dueOnly) {
    pool = pool.slice(); const out = [];
    while (out.length < k && pool.length) {
      const ws = pool.map((id) => priority(id, dueOnly));
      const tot = ws.reduce((a, b) => a + b, 0);
      if (tot <= 0) break;
      let x = Math.random() * tot, j = 0;
      for (; j < pool.length - 1; j++) { x -= ws[j]; if (x <= 0) break; }
      out.push(pool.splice(j, 1)[0]);
    }
    return out;
  }

  const School = (CY.School = {});
  School.CATS = CY.QUIZ_CATS;
  School.ALL = ALL;
  School.dueCount = () => Object.entries(Q().items).filter(([, r]) => !r.learned && now() >= r.due).length;
  School.start = function (cat, dueOnly) {
    const pool = ALL.filter((x) => cat === 'mixed' || x.cat === cat).map((x) => x.id);
    const ids = sampleIds(pool, ROUND, dueOnly);
    if (!ids.length) return null;
    return { cat: dueOnly ? 'due' : cat, qs: ids.map(build).filter(Boolean), i: 0, streak: 0, earned: 0, correct: 0, last: null };
  };
  School.answer = function (round, opt) {
    const q = round.qs[round.i];
    const st = Q().stats;
    const ok = opt === q.answer;
    const items = Q().items;
    let r = items[q.id], pay = 0, note = '';
    st.answered++;
    if (ok) {
      st.correct++; round.correct++; round.streak++;
      st.bestStreak = Math.max(st.bestStreak, round.streak);
      if (!r) { r = items[q.id] = { box: 1, due: now() + INTERVALS[1], right: 1, wrong: 0 }; pay = PAY.first; note = 'first time'; }
      else if (now() >= r.due) {
        r.box = Math.min(LEARN_BOX, r.box + 1); r.right++; r.due = now() + INTERVALS[r.box];
        if (r.box >= LEARN_BOX && !r.learned) { r.learned = true; note = 'learned!'; } else note = 'review';
        pay = PAY.due;
      } else { r.right++; pay = PAY.soon; note = `too soon — next counting review in ${fmtDur(r.due - now())}`; }
      if (round.streak >= PAY.streakFrom) pay += PAY.streak;
    } else {
      round.streak = 0;
      if (!r) r = items[q.id] = { box: 0, due: now(), right: 0, wrong: 0 };
      r.wrong++; r.box = Math.max(0, r.box - 2); r.due = now(); r.learned = false;
      note = 'back two boxes';
    }
    const gained = pay * CY.insightMult();
    round.earned += gained;
    CY.addInsight(gained);
    round.last = { opt, ok, pay: gained, note, ex: q.ex };
    return round.last;
  };
  School.next = function (round) {
    round.i++; round.last = null;
    if (round.i >= round.qs.length) {
      const st = Q().stats; st.rounds++;
      if (round.correct === round.qs.length) { st.perfect++; const b = PAY.perfect * CY.insightMult(); round.earned += b; round.bonus = b; CY.addInsight(b); }
      round.over = true;
    }
  };

  /* ---------- UI ---------- */
  const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(1));
  School.renderRound = function (rd) {
    const catName = rd.cat === 'due' ? { icon: '🔁', name: 'Review' } : CY.QUIZ_CATS[rd.cat];
    if (rd.over) {
      return `<section class="panel"><h3>${catName.icon} Round complete</h3>
        <div class="big-result">${rd.correct}/${rd.qs.length} correct · <span class="c-insight">+${fmt(rd.earned)} 🧠 Insight</span></div>
        ${rd.bonus ? `<div class="center c-good">★ Perfect round bonus +${fmt(rd.bonus)}</div>` : ''}
        <div class="row center-row" style="margin-top:12px"><button class="btn primary" data-act="school" data-cat="${rd.cat === 'due' ? 'mixed' : rd.cat}" ${rd.cat === 'due' ? 'data-due="1"' : ''}>Another round</button><button class="btn" data-act="schoolQuit">Back to Cell School</button></div></section>`;
    }
    const q = rd.qs[rd.i], res = rd.last;
    const r = rec(q.id);
    const opts = q.options.map((o, i) => {
      let cls = '';
      if (res) cls = i === q.answer ? 'right' : i === res.opt ? 'wrong' : 'dim';
      return `<button class="opt ${cls}" data-act="schoolAns" data-o="${i}" ${res ? 'disabled' : ''}>${'ABCD'[i]}. ${esc(o)}</button>`;
    }).join('');
    const fb = res ? `<div class="answer-fb ${res.ok ? 'ok' : 'no'}"><b>${res.ok ? '✔ Correct' : '✖ Not quite'}</b> ${res.ok ? `<span class="c-insight">+${fmt(res.pay)} 🧠</span>` : ''} <span class="muted">(${esc(res.note)})</span>
        ${res.ex ? `<div class="ex">🔬 ${esc(res.ex)}</div>` : ''}
        <div class="row" style="margin-top:8px"><button class="btn primary" data-act="schoolNext">${rd.i + 1 >= rd.qs.length ? 'See results' : 'Next question →'}</button></div></div>` : '';
    return `<section class="panel"><div class="row between"><h3 style="margin:0">${catName.icon} ${esc(catName.name)} · ${rd.i + 1}/${rd.qs.length}</h3>
      <span class="row">${rd.streak >= 2 ? `<span class="tag warn">🔥 streak ${rd.streak}</span>` : ''}<span class="tag c-insight">+${fmt(rd.earned)} 🧠</span><button class="btn sm" data-act="schoolQuit">Quit</button></span></div>
      <div class="qbox"><div class="qtext">${esc(q.prompt)}</div>
      <div class="muted small">${r ? `Box ${r.box}/${LEARN_BOX}${r.learned ? ' · learned' : ''}` : 'New item'}</div>
      <div class="opts">${opts}</div>${fb}</div></section>`;
  };

  School.renderHome = function () {
    const st = Q().stats, due = School.dueCount();
    const cards = Object.entries(CY.QUIZ_CATS).map(([c, C]) => {
      const pool = ALL.filter((x) => c === 'mixed' || x.cat === c);
      const seen = pool.filter((x) => rec(x.id)).length, learned = pool.filter((x) => rec(x.id)?.learned).length;
      return `<button class="course" data-act="school" data-cat="${c}"><span class="ic">${C.icon}</span><span class="nm">${esc(C.name)}</span><span class="note">${esc(C.blurb)}</span>
        <span class="note">${seen}/${pool.length} seen · ${learned} learned</span></button>`;
    }).join('');
    return `<section class="panel"><h3>🧠 Cell School <span class="spacer"></span><small>${st.rounds} rounds · ${st.correct}/${st.answered} correct · best streak ${st.bestStreak}</small></h3>
      <p class="note">Insight (🧠) is earned <b>only</b> by answering questions, and it is the only currency for 🧬 Genes. The first time you get an item right pays 2, a review that is due pays 1, and a review given too soon pays nothing. A streak (from your 3rd correct answer in a row) pays +1 per answer, and a perfect round +2. Each item needs ${LEARN_BOX} well-spaced reviews (10 min → 2 weeks) before it counts as learned.</p>
      ${due ? `<div class="row" style="margin-bottom:12px"><button class="btn primary" data-act="school" data-cat="mixed" data-due="1">🔁 Review ${due} due item${due > 1 ? 's' : ''}</button></div>` : ''}
      <div class="coursegrid">${cards}</div></section>`;
  };

  School.renderLearning = function (filter) {
    const items = Q().items;
    const rows = ALL.filter((x) => items[x.id]).filter((x) => filter === 'all' || (filter === 'due' ? !items[x.id].learned && now() >= items[x.id].due : filter === 'learned' ? items[x.id].learned : x.cat === filter))
      .sort((a, b) => items[a.id].due - items[b.id].due)
      .map((x) => {
        const r = items[x.id];
        const q = BANK_BY_ID[x.id] ? BANK_BY_ID[x.id].q : (build(x.id) || {}).prompt || x.id;
        return `<tr><td>${CY.QUIZ_CATS[x.cat].icon}</td><td class="lq">${esc(q)}</td><td><div class="minibar"><div style="width:${100 * r.box / LEARN_BOX}%"></div></div><small>${r.box}/${LEARN_BOX}</small></td>
          <td><small>${r.learned ? '✔ learned' : now() >= r.due ? '<b class="c-warn">due</b>' : 'in ' + fmtDur(r.due - now())}</small></td><td><small>${r.right}✔ ${r.wrong}✖</small></td></tr>`;
      }).join('');
    const seen = Object.keys(items).length, learned = Object.values(items).filter((r) => r.learned).length;
    const filters = [['all', 'All'], ['due', 'Due'], ['learned', 'Learned'], ...Object.entries(CY.QUIZ_CATS).filter(([k]) => k !== 'mixed').map(([k, v]) => [k, v.icon])];
    return `<section class="panel"><h3>📈 Learning <span class="spacer"></span><small>${seen}/${ALL.length} seen · ${learned} learned</small></h3>
      <div class="row" style="margin-bottom:10px">${filters.map(([k, l]) => `<button class="btn sm ${filter === k ? 'on' : ''}" data-act="learnFilter" data-f="${k}">${l}</button>`).join('')}</div>
      ${rows ? `<div class="tablewrap"><table class="ltable"><tbody>${rows}</tbody></table></div>` : '<p class="muted">Nothing here yet — answer some questions in Cell School.</p>'}</section>`;
  };
})();
