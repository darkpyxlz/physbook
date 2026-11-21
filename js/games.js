/* Scibook: the three subject games (ChemCorp, Cytos, Firmament) run inside the platform.
   Their saves live in localStorage on the same origin, so the dashboard can read progress from them,
   and correct answers in each game's quiz school are converted into Scibook XP. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h;
  const fmtNum = function (x) { return x >= 1e6 ? x.toExponential(2) : Math.round(x).toLocaleString('en-GB'); };
  function read(key) { try { const t = localStorage.getItem(key); return t ? JSON.parse(t) : null; } catch (e) { return null; } }

  // Each reader returns { started, correct, rows: [[label, value], ...] } from the game's own save.
  const READERS = {
    chemcorp: function () {
      const s = read('chemcorp-save-v1');
      if (!s) return { started: false, rows: [] };
      const sch = (s.school && s.school.stats) || {};
      return { started: true, correct: sch.correct || 0, rows: [
        ['Money', '$' + fmtNum(s.money || 0)], ['Technologies researched', String(Object.keys(s.tech || {}).length)],
        ['Lab runs', String((s.stats && s.stats.manualRuns) || 0)], ['Chem School correct', String(sch.correct || 0)]
      ] };
    },
    cytos: function () {
      const s = read('cytos-save-v2');
      if (!s || !s.meta) return { started: false, rows: [] };
      const q = (s.meta.quiz && s.meta.quiz.stats) || {};
      return { started: true, correct: q.correct || 0, rows: [
        ['Cell divisions', String(s.meta.reps || 0)], ['Achievements', String(Object.keys(s.meta.ach || {}).length)],
        ['Puzzles solved', String((s.meta.totals && s.meta.totals.puzzles) || 0)], ['Cell School correct', String(q.correct || 0)]
      ] };
    },
    firmament: function () {
      const s = read('firmament.autosave.v1');
      if (!s || !s.stars) return { started: false, rows: [] };
      const q = (s.quiz && s.quiz.stats) || {};
      return { started: true, correct: q.correct || 0, rows: [
        ['Colonies', String(Object.keys(s.stars).length)], ['Cash', '$' + fmtNum(s.cash || 0)],
        ['Charts', String(Math.floor(s.charts || 0))], ['Sky School correct', String(q.correct || 0)]
      ] };
    }
  };
  PB.gameStats = function (gameId) { try { return READERS[gameId](); } catch (e) { return { started: false, rows: [] }; } };
  // Convert new quiz-school answers into XP. Called whenever the dashboard or a subject page is shown, and while a game is open.
  PB.syncGames = function () {
    let total = 0;
    PB.SUBJECTS.forEach(function (sub) { if (!sub.game) return; const st = PB.gameStats(sub.game.id); if (st.started) total += PB.syncGame(sub.game.id, st.correct); });
    return total;
  };

  PB.gameCard = function (sub, compact) {
    const g = sub.game, st = PB.gameStats(g.id);
    const card = h('section', { class: 'game-card game-' + g.id }, [
      h('div', { class: 'game-head' }, [
        h('div', {}, [h('div', { class: 'eyebrow', text: sub.name + ' game' }), h('h3', { text: g.name }), h('p', { text: g.blurb })]),
        h('a', { class: 'btn primary', href: '#game-' + sub.id, text: st.started ? 'Continue playing' : 'Play' })
      ])
    ]);
    if (!compact) {
      if (st.started) {
        const grid = h('div', { class: 'game-stats' });
        st.rows.forEach(function (r) { grid.appendChild(h('div', { class: 'stat' }, [h('b', { text: r[1] }), h('span', { text: r[0] })])); });
        card.appendChild(grid);
      }
      card.appendChild(h('p', { class: 'game-note', text: 'Every correct answer in the game’s quiz school also earns 2 Scibook XP (up to ' + PB.GAME_DAILY_CAP + ' XP a day across all games). ' + (PB.S.gameXP[g.id] ? 'Earned so far: ' + PB.S.gameXP[g.id] + ' XP.' : '') }));
    }
    return card;
  };

  function viewGame(sid) {
    const sub = PB.subject(sid);
    if (!sub || !sub.game) { location.hash = 'home'; return; }
    PB.S.subject = sid; PB.save();
    const bar = h('div', { class: 'game-bar' }, [
      h('a', { class: 'btn small ghost', href: '#' + sid, text: '← ' + sub.name }),
      h('strong', { text: sub.game.name }),
      h('span', { class: 'game-bar-note', text: 'Your game save is kept in this browser and shared with the stand-alone version.' }),
      h('a', { class: 'btn small', href: sub.game.path, target: '_blank', rel: 'noopener', text: 'Open full screen' })
    ]);
    const frame = h('iframe', { class: 'game-frame', src: sub.game.path, title: sub.game.name, allow: 'fullscreen; clipboard-write' });
    const wrap = h('div', { class: 'game-wrap' }, [bar, frame]);
    PB.setView([wrap], 'game-' + sid);
    document.getElementById('main').classList.add('main-game');
    const timer = setInterval(PB.syncGames, 15000);
    PB.onViewDestroy(function () { clearInterval(timer); PB.syncGames(); document.getElementById('main').classList.remove('main-game'); });
  }

  PB.views = PB.views || {};
  PB.SUBJECTS.forEach(function (sub) { if (sub.game) PB.views['game-' + sub.id] = function () { viewGame(sub.id); }; });
  const hs = decodeURIComponent((location.hash || '').replace(/^#/, ''));
  if (PB.views[hs]) PB.views[hs]();
  PB.syncGames();
})();
