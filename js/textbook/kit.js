/* Helpers for chapters written to follow the learner's textbooks (js/textbook/*.js).
   PB.tbKit() gives short constructors; PB.tbChapter(spec) registers a whole chapter in one call: the chapter,
   its drills, plain-words summaries, lab prediction, In the wild card and prerequisites.
   Final parts and numbers are set by js/textbooks.js, which follows the textbooks' order. */
(function () {
  'use strict';
  PB.tbKit = function () {
    const R = PB.R;
    return {
      R: R,
      f: (x, s) => PB.fmt(x, s || 3),
      d2r: Math.PI / 180,
      S: (id, label, min, max, step, value, unit) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit }),
      // Quick checks inside sections.
      QN: (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>', tol: 0.02 }, o || {}),
      QM: (q, options, answer, hints, solution) => ({ type: 'mcq', q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }),
      // Scored problems: level is concept | core | olympiad.
      P: (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: '<p>' + q + '</p>', answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, type === 'num' ? { tol: 0.02 } : {}, o || {}),
      M: (level, title, q, options, answer, hints, solution, o) => Object.assign({ level: level, type: 'mcq', title: title, q: '<p>' + q + '</p>', options: options, answer: answer, hints: hints, solution: '<p>' + solution + '</p>' }, o || {})
    };
  };
  let n = 0;
  PB.tbChapter = function (spec) {
    const ch = {
      id: spec.id, subject: spec.subject, num: 900 + (n++), part: spec.part || 'New', title: spec.title, subtitle: spec.subtitle, big: spec.big, goals: spec.goals,
      sections: spec.sections.map((s) => ({ title: s.title, html: s.html, quizzes: s.quizzes || [] })),
      labs: spec.labs || [], figures: spec.figures || [], formulas: spec.formulas || [], problems: spec.problems || [], prereqs: spec.prereqs || []
    };
    PB.addChapter(ch);
    const reg = PB.chapter(spec.id);
    reg.plainExtra = Object.assign({}, spec.sections.map((s) => s.plain || ''));
    if (spec.drills && spec.drills.length) PB.addDrills(spec.id, spec.drills);
    if (spec.predict) { PB.PREDICT = PB.PREDICT || {}; PB.PREDICT[spec.id] = spec.predict; }
    if (spec.wild) PB.WILD_EXTRA = Object.assign(PB.WILD_EXTRA || {}, { [spec.id]: spec.wild });
    if (spec.glossary && PB.addGlossary) PB.addGlossary(spec.glossary);
    return reg;
  };
})();
