/* Scibook code lab: an in-browser code interpreter and judge.
   - Python runs in a Web Worker with Pyodide (CPython compiled to WebAssembly), loaded on first use.
   - JavaScript runs in a Web Worker, with console.log, readline() and a tiny require('fs') / require('readline') shim.
   - C++ is compiled and run on Compiler Explorer (godbolt.org), with Wandbox as a fallback. It needs internet.
   - Web pages (HTML, CSS and JavaScript) render in a sandboxed iframe, with their console shown underneath.
   Challenges are small judged problems: sample tests are shown, hidden tests are not, and the verdicts follow
   competitive-programming judges (Accepted, Wrong answer, Runtime error, Time limit exceeded, Compilation error). */
(function () {
  'use strict';
  const PB = (window.PB = window.PB || {});
  PB.sims = PB.sims || {};
  PB.views = PB.views || {};

  const LANGS = {
    python: { name: 'Python', ext: 'py', indent: '    ', tl: 3 },
    javascript: { name: 'JavaScript', ext: 'js', indent: '  ', tl: 2 },
    cpp: { name: 'C++', ext: 'cpp', indent: '    ', tl: 2 },
    web: { name: 'Web page', ext: 'html', indent: '  ', tl: 5 }
  };
  PB.CODE_LANGS = LANGS;

  /* ======================= Syntax highlighting ======================= */
  const KW = {
    python: 'False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case',
    javascript: 'break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return super switch this throw try typeof var void while with yield async await null undefined true false static get set',
    cpp: 'alignas auto bool break case catch char class const constexpr continue default delete do double else enum explicit extern false float for friend goto if inline int long mutable namespace new noexcept nullptr operator private protected public return short signed sizeof static struct switch template this throw true try typedef typename union unsigned using virtual void volatile while size_t'
  };
  const BI = {
    python: 'print input len range int str float bool list dict set tuple sorted sum min max abs enumerate zip map filter open super isinstance type round reversed any all ord chr divmod pow hex bin iter next self object Exception ValueError TypeError KeyError IndexError ZeroDivisionError',
    javascript: 'console Math JSON Array Object String Number Boolean Map Set Promise Date Error document window fetch setTimeout setInterval clearTimeout parseInt parseFloat readline require process',
    cpp: 'std cout cin cerr endl vector string map set unordered_map unordered_set pair queue stack priority_queue deque array sort min max swap reverse lower_bound upper_bound make_pair printf scanf ios getline accumulate greater less begin end push_back emplace_back first second'
  };
  const wordSet = {};
  Object.keys(KW).forEach((k) => { wordSet[k] = { kw: new Set(KW[k].split(' ')), bi: new Set(BI[k].split(' ')) }; });
  const RX = {
    python: /(#[^\n]*)|("""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|[rbfuRBFU]{0,2}"(?:\\.|[^"\\\n])*"?|[rbfuRBFU]{0,2}'(?:\\.|[^'\\\n])*'?)|(\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?j?\b|\b0[xob][\da-fA-F_]+\b)|([A-Za-z_]\w*)|(@\w+)/g,
    javascript: /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\[\s\S]|[^`\\])*`?)|(\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?n?\b|\b0[xob][\da-fA-F_]+\b)|([A-Za-z_$][\w$]*)|()/g,
    cpp: /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d[\d']*\.?\d*(?:[eE][+-]?\d+)?[uUlLfF]*\b|\b0[xb][\da-fA-F']+\b)|([A-Za-z_]\w*)|(^[ \t]*#[ \t]*\w+[^\n]*)/gm
  };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  PB.escHTML = esc;
  function highlightWeb(src) {
    // Tags, attributes and comments; <style> and <script> bodies get CSS-ish / JS highlighting.
    let out = '', i = 0;
    const re = /(<!--[\s\S]*?(?:-->|$))|(<\/?[A-Za-z][\w-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"?|'[^']*'?|[^\s>]+))?)*)\s*(\/?>)?/g;
    let m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(i, m.index)); i = re.lastIndex;
      if (m[1]) { out += '<span class="tk-c">' + esc(m[1]) + '</span>'; continue; }
      const attrs = (m[3] || '').replace(/([^\s=]+)(\s*=\s*)?("[^"]*"?|'[^']*'?|[^\s>]+)?/g, (a, n, eq, v) => '<span class="tk-a">' + esc(n) + '</span>' + (eq ? esc(eq) : '') + (v ? '<span class="tk-s">' + esc(v) + '</span>' : ''));
      out += '<span class="tk-t">' + esc(m[2]) + '</span>' + attrs + (m[4] ? '<span class="tk-t">' + esc(m[4]) + '</span>' : '');
      const tag = m[2].toLowerCase();
      if ((tag === '<script' || tag === '<style') && m[4]) {
        const close = src.toLowerCase().indexOf('</' + tag.slice(1), i), end = close < 0 ? src.length : close;
        const body = src.slice(i, end);
        out += tag === '<script' ? highlight(body, 'javascript') : body.replace(/(\/\*[\s\S]*?(?:\*\/|$))|([\w-]+)(\s*:)|([^{};:\n]+)(\s*\{)/g, (a, c, p, col, sel, br) => c ? '<span class="tk-c">' + esc(c) + '</span>' : p ? '<span class="tk-a">' + esc(p) + '</span>' + esc(col) : '<span class="tk-t">' + esc(sel) + '</span>' + esc(br));
        i = end; re.lastIndex = end;
      }
    }
    return out + esc(src.slice(i));
  }
  function highlight(src, lang) {
    if (lang === 'web') return highlightWeb(src);
    const re = RX[lang];
    if (!re) return esc(src);
    const ws = wordSet[lang];
    let out = '', i = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(src))) {
      if (m[0] === '') { re.lastIndex++; continue; }
      out += esc(src.slice(i, m.index)); i = re.lastIndex;
      if (m[1]) out += '<span class="tk-c">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="tk-s">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="tk-n">' + esc(m[3]) + '</span>';
      else if (m[4]) {
        const w = m[4];
        const after = src.slice(re.lastIndex).match(/^\s*\(/);
        out += ws.kw.has(w) ? '<span class="tk-k">' + w + '</span>' : ws.bi.has(w) ? '<span class="tk-b">' + w + '</span>' : after ? '<span class="tk-f">' + w + '</span>' : esc(w);
      } else if (m[5]) out += '<span class="tk-p">' + esc(m[5]) + '</span>';
      else out += esc(m[0]);
    }
    return out + esc(src.slice(i));
  }
  PB.highlightCode = highlight;
  // Highlight every <pre data-lang="..."> code block inside an element (used by the chapter text).
  PB.highlightBlocks = function (root) {
    (root || document).querySelectorAll('pre[data-lang]:not([data-hl])').forEach((pre) => {
      const lang = pre.getAttribute('data-lang');
      pre.setAttribute('data-hl', '1');
      pre.classList.add('code-block');
      if (lang === 'shell' || lang === 'text' || lang === 'http') {
        if (lang === 'shell') pre.innerHTML = pre.innerHTML.replace(/^(\$ )(.*)$/gm, '<span class="tk-p">$1</span><span class="tk-k">$2</span>').replace(/^(#.*)$/gm, '<span class="tk-c">$1</span>');
        return;
      }
      const src = pre.textContent.replace(/^\n/, '');
      pre.innerHTML = highlight(src, lang);
      if (pre.hasAttribute('data-run')) {
        const btn = document.createElement('button');
        btn.className = 'btn small code-try'; btn.type = 'button'; btn.textContent = '▶ Try it';
        btn.addEventListener('click', () => { PB.openPlayground(lang, src); });
        pre.appendChild(btn);
      }
    });
  };

  /* ======================= Editor ======================= */
  // A textarea over a highlighted <pre>: real text editing (undo, selection, mobile keyboards) with colour.
  PB.codeEditor = function (opts) {
    const h = PB.h;
    let lang = opts.lang || 'python';
    const ta = h('textarea', { class: 'ce-ta', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', 'aria-label': opts.label || 'Code editor', wrap: 'off' });
    const hl = h('pre', { class: 'ce-hl', 'aria-hidden': 'true' });
    const gut = h('div', { class: 'ce-gut', 'aria-hidden': 'true' });
    const wrap = h('div', { class: 'ce' + (opts.small ? ' small' : '') }, [gut, h('div', { class: 'ce-wrap' }, [hl, ta])]);
    ta.value = opts.value || '';
    let escaped = false;
    function render() {
      const v = ta.value;
      hl.innerHTML = highlight(v, lang) + '\n';
      const n = v.split('\n').length;
      if (gut.childElementCount !== n) { let s = ''; for (let i = 1; i <= n; i++) s += i + '\n'; gut.textContent = s; }
      const lines = Math.max(opts.minLines || 6, Math.min(opts.maxLines || 30, n));
      const px = lines * 21 + 20;
      wrap.style.height = px + 'px';
      hl.style.transform = 'translate(' + -ta.scrollLeft + 'px,' + -ta.scrollTop + 'px)';
      gut.style.transform = 'translateY(' + -ta.scrollTop + 'px)';
    }
    function insert(text) {
      ta.focus();
      if (!document.execCommand || !document.execCommand('insertText', false, text)) {
        const s = ta.selectionStart, e = ta.selectionEnd;
        ta.setRangeText(text, s, e, 'end');
      }
      render(); if (opts.onChange) opts.onChange(ta.value);
    }
    ta.addEventListener('input', () => { render(); if (opts.onChange) opts.onChange(ta.value); });
    ta.addEventListener('scroll', render);
    ta.addEventListener('keydown', (e) => {
      const ind = (LANGS[lang] || LANGS.python).indent;
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (opts.onRun) opts.onRun(); return; }
      if (e.key === 'Escape') { escaped = true; return; }
      if (e.key === 'Tab' && !escaped) {
        e.preventDefault();
        const v = ta.value, s = ta.selectionStart, en = ta.selectionEnd;
        if (s === en && !e.shiftKey) { insert(ind); return; }
        const ls = v.lastIndexOf('\n', s - 1) + 1, block = v.slice(ls, en);
        const nb = e.shiftKey ? block.replace(new RegExp('^(?:' + ind + '|\\t| {1,' + ind.length + '})', 'gm'), '') : block.replace(/^/gm, ind);
        ta.setSelectionRange(ls, en); insert(nb);
        ta.setSelectionRange(ls, ls + nb.length);
        return;
      }
      escaped = false;
      if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
        const v = ta.value, s = ta.selectionStart, ls = v.lastIndexOf('\n', s - 1) + 1, line = v.slice(ls, s);
        let lead = (line.match(/^[ \t]*/) || [''])[0];
        const t = line.trimEnd();
        if ((lang === 'python' && /:$/.test(t)) || (lang !== 'python' && /[{(\[]$/.test(t))) lead += ind;
        e.preventDefault();
        const nextCh = v.charAt(ta.selectionEnd);
        if (lang !== 'python' && /[{(\[]$/.test(t) && /[})\]]/.test(nextCh)) {
          const base = lead.slice(0, lead.length - ind.length);
          insert('\n' + lead + '\n' + base);
          const p = ta.selectionStart - base.length - 1; ta.setSelectionRange(p, p);
        } else insert('\n' + lead);
        return;
      }
      if (e.key === '}' && lang !== 'python') {
        const v = ta.value, s = ta.selectionStart, ls = v.lastIndexOf('\n', s - 1) + 1, line = v.slice(ls, s);
        if (/^[ \t]+$/.test(line) && ta.selectionStart === ta.selectionEnd) {
          e.preventDefault();
          ta.setSelectionRange(ls, s); insert(line.slice(0, Math.max(0, line.length - ind.length)) + '}');
        }
      }
    });
    render();
    requestAnimationFrame(render);
    return {
      el: wrap, ta: ta,
      get value() { return ta.value; },
      set value(v) { ta.value = v; render(); },
      setLang: (l) => { lang = l; render(); },
      focus: () => ta.focus(),
      refresh: render
    };
  };

  /* ======================= Runners ======================= */
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  const PY_WORKER = `
self.importScripts('${PYODIDE}pyodide.js');
let py = null, buf = [], last = Date.now();
function flush() { if (buf.length) { postMessage({ t: 'out', d: buf.join('') }); buf = []; } last = Date.now(); }
self.pyout = function (k, s) { if (k === 'err') { flush(); postMessage({ t: 'err', d: s }); return; } buf.push(s); if (Date.now() - last > 60 || buf.length > 400) flush(); };
const SETUP = [
'import sys, io, traceback, js',
'class _W(io.TextIOBase):',
'    def __init__(self, k): self.k = k',
'    def writable(self): return True',
'    def write(self, s):',
'        js.pyout(self.k, s)',
'        return len(s)',
'sys.stdout = _W("out")',
'sys.stderr = _W("err")',
'def _scibook_run(src, stdin):',
'    sys.stdin = io.TextIOWrapper(io.BytesIO(stdin.encode("utf-8")), encoding="utf-8")',
'    g = {"__name__": "__main__"}',
'    try:',
'        exec(compile(src, "main.py", "exec"), g)',
'    except SystemExit as e:',
'        return 0 if e.code in (None, 0) else 1',
'    except SyntaxError as e:',
'        sys.stderr.write("".join(traceback.format_exception_only(type(e), e)))',
'        return 1',
'    except BaseException as e:',
'        lines = traceback.format_exception(type(e), e, e.__traceback__)',
'        keep = [lines[0]] + [l for l in lines[1:-1] if \\'File "main.py"\\' in l] + [lines[-1]]',
'        sys.stderr.write("".join(keep))',
'        return 1',
'    return 0'
].join('\\n');
const ready = loadPyodide({ indexURL: '${PYODIDE}' }).then(function (p) { py = p; p.runPython(SETUP); postMessage({ t: 'ready' }); }).catch(function (e) { postMessage({ t: 'fatal', d: String(e && e.message || e) }); });
onmessage = async function (e) {
  await ready;
  if (!py) return;
  const m = e.data;
  try { await py.loadPackagesFromImports(m.code); } catch (err) { /* offline or unknown package: let the import fail normally */ }
  const t0 = performance.now();
  let rc = 0;
  try { rc = py.globals.get('_scibook_run')(m.code, m.stdin || ''); } catch (err) { flush(); postMessage({ t: 'err', d: String(err && err.message || err) }); rc = 1; }
  const ms = performance.now() - t0;
  flush();
  postMessage({ t: 'done', id: m.id, rc: rc, ms: ms });
};`;

  const JS_WORKER = `
const _setT = self.setTimeout, _clrT = self.clearTimeout, _setI = self.setInterval, _clrI = self.clearInterval, _fetch = self.fetch;
let pending = 0, live = new Set(), runId = 0, outBuf = [], lastFlush = Date.now();
function flush() { if (outBuf.length) { postMessage({ t: 'out', d: outBuf.join('') }); outBuf = []; } lastFlush = Date.now(); }
function out(s) { outBuf.push(s); if (Date.now() - lastFlush > 60 || outBuf.length > 400) flush(); }
function err(s) { flush(); postMessage({ t: 'err', d: s }); }
function insp(v, d, seen) {
  if (v === null) return 'null';
  const t = typeof v;
  if (t === 'undefined') return 'undefined';
  if (t === 'string') return d === 0 ? v : "'" + v.replace(/'/g, "\\\\'") + "'";
  if (t === 'number') return Object.is(v, -0) ? '-0' : String(v);
  if (t === 'bigint') return v + 'n';
  if (t === 'boolean' || t === 'symbol') return String(v);
  if (t === 'function') return v.toString().slice(0, 5) === 'class' ? '[class ' + (v.name || '(anonymous)') + ']' : '[Function: ' + (v.name || '(anonymous)') + ']';
  seen = seen || new Set();
  if (seen.has(v)) return '[Circular]';
  if (v instanceof Error) return v.name + ': ' + v.message;
  if (v instanceof Date) return v.toISOString();
  if (v instanceof RegExp) return String(v);
  if (v instanceof Promise) return 'Promise { <pending> }';
  if (d > 3) return Array.isArray(v) ? '[Array]' : '[Object]';
  seen.add(v);
  let r;
  if (Array.isArray(v)) {
    const items = v.slice(0, 100).map(function (x) { return insp(x, d + 1, seen); });
    if (v.length > 100) items.push('... ' + (v.length - 100) + ' more items');
    r = items.length ? '[ ' + items.join(', ') + ' ]' : '[]';
  } else if (v instanceof Map) {
    const items = []; v.forEach(function (val, k) { items.push(insp(k, d + 1, seen) + ' => ' + insp(val, d + 1, seen)); });
    r = 'Map(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}');
  } else if (v instanceof Set) {
    const items = []; v.forEach(function (x) { items.push(insp(x, d + 1, seen)); });
    r = 'Set(' + v.size + ') ' + (items.length ? '{ ' + items.join(', ') + ' }' : '{}');
  } else if (ArrayBuffer.isView(v)) {
    r = v.constructor.name + '(' + v.length + ') [ ' + Array.prototype.slice.call(v, 0, 100).join(', ') + ' ]';
  } else {
    const keys = Object.keys(v);
    const name = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
    const items = keys.map(function (k) { return (/^[A-Za-z_$][\\w$]*$/.test(k) ? k : "'" + k + "'") + ': ' + insp(v[k], d + 1, seen); });
    r = name + (items.length ? '{ ' + items.join(', ') + ' }' : '{}');
  }
  seen.delete(v);
  return r;
}
function fmtArgs(a) {
  if (typeof a[0] === 'string' && /%[sdifoOj]/.test(a[0])) {
    let i = 1;
    const s = a[0].replace(/%([sdifoOj%])/g, function (m, c) { if (c === '%') return '%'; if (i >= a.length) return m; const x = a[i++]; return c === 's' ? String(x) : (c === 'd' || c === 'i') ? String(parseInt(x)) : c === 'f' ? String(parseFloat(x)) : insp(x, 1); });
    return [s].concat(Array.prototype.slice.call(a, i).map(function (x) { return insp(x, 0); })).join(' ');
  }
  return Array.prototype.map.call(a, function (x) { return insp(x, 0); }).join(' ');
}
const con = {
  log: function () { out(fmtArgs(arguments) + '\\n'); }, info: function () { out(fmtArgs(arguments) + '\\n'); }, debug: function () { out(fmtArgs(arguments) + '\\n'); },
  error: function () { err(fmtArgs(arguments) + '\\n'); }, warn: function () { err(fmtArgs(arguments) + '\\n'); },
  table: function (x) { out(insp(x, 1) + '\\n'); }, dir: function (x) { out(insp(x, 1) + '\\n'); },
  time: function (l) { (con._t = con._t || {})[l || 'default'] = performance.now(); },
  timeEnd: function (l) { l = l || 'default'; out(l + ': ' + (performance.now() - ((con._t || {})[l] || 0)).toFixed(3) + 'ms\\n'); }
};
self.console = con;
self.setTimeout = function (f, ms) { const a = Array.prototype.slice.call(arguments, 2); pending++; const id = _setT(function () { pending--; live.delete(id); try { f.apply(null, a); } catch (e) { report(e); } check(); }, ms); live.add(id); return id; };
self.clearTimeout = function (id) { if (live.has(id)) { live.delete(id); pending--; _clrT(id); check(); } };
const intervals = new Set();
self.setInterval = function (f, ms) { pending++; const id = _setI(function () { try { f(); } catch (e) { report(e); } }, ms); intervals.add(id); return id; };
self.clearInterval = function (id) { if (intervals.has(id)) { intervals.delete(id); pending--; _clrI(id); check(); } };
if (_fetch) self.fetch = function () { pending++; return _fetch.apply(self, arguments).finally(function () { pending--; _setT(check, 0); }); };
function report(e) {
  let where = '';
  const m = e && e.stack && /<anonymous>:(\\d+):(\\d+)/.exec(e.stack);
  if (m) where = ' (line ' + (parseInt(m[1]) - 2) + ')';
  err('Uncaught ' + (e && e.name ? e.name + ': ' + e.message : String(e)) + where + '\\n');
  failed = true;
}
let finished = false, failed = false, t0 = 0, mainDone = false;
function check() {
  if (finished || !mainDone) return;
  _setT(function () { if (!finished && pending <= 0) { finished = true; flush(); postMessage({ t: 'done', rc: failed ? 1 : 0, ms: performance.now() - t0 }); } }, 0);
}
self.onunhandledrejection = function (e) { report(e.reason); check(); };
onmessage = async function (e) {
  const m = e.data, stdin = m.stdin || '';
  const lines = stdin.replace(/\\r/g, '').split('\\n'); if (lines.length && lines[lines.length - 1] === '') lines.pop();
  let li = 0;
  self.readline = function () { return li < lines.length ? lines[li++] : undefined; };
  self.input = self.prompt = function (msg) { if (msg) out(String(msg)); return li < lines.length ? lines[li++] : null; };
  self.process = { stdout: { write: function (s) { out(String(s)); return true; } }, stderr: { write: function (s) { err(String(s)); return true; } }, argv: ['node', 'main.js'], env: {}, exit: function () { throw { __exit: true }; }, platform: 'browser', hrtime: { bigint: function () { return BigInt(Math.round(performance.now() * 1e6)); } } };
  self.require = function (name) {
    if (name === 'fs') return { readFileSync: function () { return stdin; } };
    if (name === 'readline') return { createInterface: function () {
      const hs = {}; let closed = false;
      const rl = { on: function (ev, cb) { (hs[ev] = hs[ev] || []).push(cb); return rl; }, close: function () { if (!closed) { closed = true; (hs.close || []).forEach(function (cb) { cb(); }); } },
        question: function (q, cb) { out(q); const l = self.readline(); setTimeout(function () { cb(l === undefined ? '' : l); }, 0); },
        [Symbol.asyncIterator]: async function* () { while (li < lines.length) yield lines[li++]; } };
      setTimeout(function () { while (li < lines.length && !closed) { const l = lines[li++]; (hs.line || []).forEach(function (cb) { cb(l); }); } rl.close(); }, 0);
      return rl;
    } };
    throw new Error("Cannot find module '" + name + "' (only 'fs' and 'readline' work in the browser)");
  };
  self.module = { exports: {} };
  t0 = performance.now();
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  let fn;
  try { fn = new AsyncFunction(m.code); } catch (e2) { err(e2.name + ': ' + e2.message + '\\n'); finished = true; postMessage({ t: 'done', rc: 1, ms: 0 }); return; }
  try { await fn(); } catch (e3) { if (!(e3 && e3.__exit)) report(e3); }
  mainDone = true;
  check();
};`;

  function makeWorker(src) { const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' })); const w = new Worker(url); URL.revokeObjectURL(url); return w; }

  // Python worker: kept alive between runs because Pyodide takes a few seconds to load.
  let pyW = null, pyReady = null, pyStatus = 'cold';
  function pyWorker(onStatus) {
    if (pyW) return pyReady;
    pyStatus = 'loading';
    if (onStatus) onStatus('Loading Python… (the first run downloads about 10 MB)');
    pyW = makeWorker(PY_WORKER);
    pyReady = new Promise((res, rej) => {
      pyW.onmessage = (e) => { if (e.data.t === 'ready') { pyStatus = 'ready'; res(pyW); } else if (e.data.t === 'fatal') { killPy(); rej(new Error('Python could not load: ' + e.data.d)); } };
      pyW.onerror = (e) => { killPy(); rej(new Error('Python could not load (are you offline?)')); e.preventDefault && e.preventDefault(); };
    });
    return pyReady;
  }
  function killPy() { if (pyW) pyW.terminate(); pyW = null; pyReady = null; pyStatus = 'cold'; }
  PB.pythonStatus = () => pyStatus;

  // Each run resolves to { out, err, rc, ms, verdict: 'ok' | 'tle' | 're' | 'ce' | 'net', compile }.
  function runPython(code, stdin, o) {
    return pyWorker(o.onStatus).then((w) => new Promise((resolve) => {
      let out = '', err = '', timer = null, done = false;
      const fin = (r) => { if (done) return; done = true; clearTimeout(timer); resolve(Object.assign({ out: out, err: err }, r)); };
      w.onmessage = (e) => {
        const m = e.data;
        if (m.t === 'out') { out += m.d; if (o.onOut) o.onOut(m.d, 'out'); }
        else if (m.t === 'err') { err += m.d; if (o.onOut) o.onOut(m.d, 'err'); }
        else if (m.t === 'done') fin({ rc: m.rc, ms: m.ms, verdict: m.rc ? 're' : 'ok' });
      };
      timer = setTimeout(() => { killPy(); fin({ rc: -1, ms: o.limit * 1000, verdict: 'tle' }); }, o.limit * 1000 + 400);
      if (o.onStatus) o.onStatus('Running…');
      w.postMessage({ code: code, stdin: stdin, id: Date.now() });
      if (o.cancel) o.cancel.fn = () => { killPy(); fin({ rc: -1, ms: 0, verdict: 'stopped' }); };
    })).catch((e) => ({ out: '', err: e.message + '\n', rc: -1, ms: 0, verdict: 'net' }));
  }
  function runJS(code, stdin, o) {
    return new Promise((resolve) => {
      const w = makeWorker(JS_WORKER);
      let out = '', err = '', done = false;
      const fin = (r) => { if (done) return; done = true; clearTimeout(timer); w.terminate(); resolve(Object.assign({ out: out, err: err }, r)); };
      w.onmessage = (e) => {
        const m = e.data;
        if (m.t === 'out') { out += m.d; if (o.onOut) o.onOut(m.d, 'out'); }
        else if (m.t === 'err') { err += m.d; if (o.onOut) o.onOut(m.d, 'err'); }
        else if (m.t === 'done') fin({ rc: m.rc, ms: m.ms, verdict: m.rc ? 're' : 'ok' });
      };
      w.onerror = (e) => { e.preventDefault(); err += (e.message || 'Error') + '\n'; if (o.onOut) o.onOut((e.message || 'Error') + '\n', 'err'); fin({ rc: 1, ms: 0, verdict: 're' }); };
      const timer = setTimeout(() => fin({ rc: -1, ms: o.limit * 1000, verdict: 'tle' }), o.limit * 1000 + 200);
      if (o.onStatus) o.onStatus('Running…');
      if (o.cancel) o.cancel.fn = () => fin({ rc: -1, ms: 0, verdict: 'stopped' });
      w.postMessage({ code: code, stdin: stdin });
    });
  }
  const ANSI = /\x1b\[[0-9;]*[A-Za-z]/g;
  function cppDone(r, o) { if (o.onOut) { if (r.out) o.onOut(r.out, 'out'); if (r.err) o.onOut(r.err, 'err'); } return r; }
  function godbolt(code, stdin, o) {
    return fetch('https://godbolt.org/api/compiler/g132/compile', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ source: code, lang: 'c++', allowStoreCodeDebug: false, options: { userArguments: '-O2 -std=c++17', executeParameters: { args: [], stdin: stdin }, compilerOptions: { executorRequest: true }, filters: { execute: true }, tools: [], libraries: [] } })
    }).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then((d) => {
      const txt = (a) => (a || []).map((x) => x.text).join('\n').replace(ANSI, '').replace(/<source>/g, 'main.cpp');
      const b = d.buildResult || {};
      if (!d.didExecute && b.code) return { out: '', err: txt(b.stderr) + '\n', rc: 1, ms: 0, verdict: 'ce', compile: true };
      const trunc = !!d.truncated || (d.stdout || []).some((x) => x.text === '[Truncated]');
      const o1 = txt((d.stdout || []).filter((x) => x.text !== '[Truncated]')), e1 = txt(d.stderr);
      const ms = d.execTime != null ? +d.execTime : 0;
      const tle = d.timedOut || ms > o.limit * 1000;
      return { out: o1 + (o1 ? '\n' : ''), err: e1 + (e1 ? '\n' : '') + (d.code && !tle ? 'Exited with code ' + d.code + (d.code === 139 || d.code === -11 ? ' (segmentation fault: memory you may not touch)' : '') + '\n' : ''), rc: d.code, ms: ms, verdict: tle ? 'tle' : d.code ? 're' : 'ok', warn: txt(b.stderr), truncated: trunc };
    });
  }
  function wandbox(code, stdin, o) {
    return fetch('https://wandbox.org/api/compile.json', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code, compiler: 'gcc-13.2.0', stdin: stdin, 'compiler-option-raw': '-O2\n-std=gnu++17' })
    }).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then((d) => {
      const ce = (d.compiler_error || '').replace(ANSI, '').replace(/prog\.cc/g, 'main.cpp');
      if (d.status === undefined && ce) return { out: '', err: ce, rc: 1, ms: 0, verdict: 'ce', compile: true };
      if (ce && /error/.test(ce) && !d.program_output && d.status !== '0') return { out: '', err: ce, rc: 1, ms: 0, verdict: 'ce', compile: true };
      const rc = parseInt(d.status || '0', 10) || (d.signal ? 1 : 0);
      return { out: d.program_output || '', err: (d.program_error || '') + (d.signal ? 'Killed by ' + d.signal + '\n' : rc ? 'Exited with code ' + rc + '\n' : ''), rc: rc, ms: 0, verdict: d.signal === 'Killed' ? 'tle' : rc ? 're' : 'ok' };
    });
  }
  function runCpp(code, stdin, o) {
    if (o.onStatus) o.onStatus('Compiling on Compiler Explorer…');
    return godbolt(code, stdin, o).catch(() => {
      if (o.onStatus) o.onStatus('Compiler Explorer did not answer; trying Wandbox…');
      return wandbox(code, stdin, o);
    }).then((r) => cppDone(r, o)).catch((e) => cppDone({ out: '', err: 'Could not reach an online C++ compiler (' + e.message + '). C++ needs an internet connection.\n', rc: -1, ms: 0, verdict: 'net' }, o));
  }
  // o: { limit (s), onOut(text, stream), onStatus(text), cancel: {} }
  PB.runCode = function (lang, code, stdin, o) {
    o = Object.assign({ limit: (LANGS[lang] || LANGS.python).tl * 3 }, o || {});
    if (lang === 'python') return runPython(code, stdin || '', o);
    if (lang === 'javascript') return runJS(code, stdin || '', o);
    if (lang === 'cpp') return runCpp(code, stdin || '', o);
    return Promise.resolve({ out: '', err: 'Unknown language ' + lang, rc: 1, verdict: 're' });
  };

  /* ---- Web pages: a sandboxed iframe with its console piped out ---- */
  PB.webPreview = function (frame, src, onLog) {
    const token = 'w' + Math.random().toString(36).slice(2);
    const hook = '<script>(function(){var T="' + token + '";function s(k,a){try{parent.postMessage({__ce:T,k:k,d:Array.prototype.map.call(a,function(x){if(typeof x==="string")return x;try{return JSON.stringify(x)}catch(e){return String(x)}}).join(" ")},"*")}catch(e){}}' +
      '["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){s(k==="log"||k==="info"?"out":"err",arguments);o&&o.apply(console,arguments)}});' +
      'window.addEventListener("error",function(e){s("err",["Uncaught "+e.message+(e.lineno?" (line "+e.lineno+")":"")])});' +
      'window.addEventListener("unhandledrejection",function(e){s("err",["Uncaught (in promise) "+(e.reason&&e.reason.message||e.reason)])});' +
      'document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(a&&!/^#/.test(a.getAttribute("href"))){e.preventDefault();s("out",["(link to "+a.getAttribute("href")+" blocked in the preview)"])}});})();<\/script>';
    const html = /<head[^>]*>/i.test(src) ? src.replace(/<head[^>]*>/i, (m) => m + hook) : hook + src;
    if (frame.__ceListener) window.removeEventListener('message', frame.__ceListener);
    frame.__ceListener = (e) => { if (e.data && e.data.__ce === token && e.source === frame.contentWindow) onLog(e.data.d + '\n', e.data.k); };
    window.addEventListener('message', frame.__ceListener);
    frame.srcdoc = html;
  };

  /* ======================= Judge ======================= */
  PB.CHALLENGES = [];
  PB.challenge = (id) => PB.CHALLENGES.find((c) => c.id === id);
  PB.addChallenge = function (c) {
    c.langs = c.langs || ['python', 'cpp', 'javascript'];
    c.starter = c.starter || {};
    c.samples = c.samples || [];
    c.tests = c.tests || [];
    c.xp = c.xp || { easy: 10, medium: 20, hard: 35 }[c.level || 'easy'];
    PB.CHALLENGES.push(c);
    PB.views['code-' + c.id] = () => viewChallenge(c.id);
  };
  const S = () => { const s = PB.S; if (!s.code) s.code = { solved: {}, drafts: {}, tries: {} }; ['solved', 'drafts', 'tries'].forEach((k) => { s.code[k] = s.code[k] || {}; }); return s.code; };
  PB.codeState = S;
  PB.challengeSolved = (id) => !!S().solved[id];

  function norm(s) { return String(s == null ? '' : s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, ''); }
  function tokens(s) { return String(s || '').trim().split(/\s+/).filter(Boolean); }
  function same(got, exp, mode) {
    if (typeof mode === 'function') return mode(got, exp);
    if (mode === 'exact') return norm(got) === norm(exp);
    const a = tokens(got), b = tokens(exp);
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) continue;
      if (mode === 'float') { const x = parseFloat(a[i]), y = parseFloat(b[i]); if (isFinite(x) && isFinite(y) && Math.abs(x - y) <= 1e-6 * Math.max(1, Math.abs(y))) continue; }
      if (typeof mode === 'number') { const x = Number(a[i]), y = Number(b[i]); if (a[i] !== '' && isFinite(x) && isFinite(y) && Math.abs(x - y) <= mode + 1e-12) continue; }
      if (mode === 'nocase' && a[i].toLowerCase() === b[i].toLowerCase()) continue;
      return false;
    }
    return true;
  }
  PB.sameOutput = same;
  function testsOf(c) {
    if (!c._all) {
      const hidden = c.tests.map((t, i) => (t.gen ? Object.assign({}, t.gen(PB.rng(1234567 + 7919 * i)), { big: t.big !== false }) : t));
      c._all = c.samples.map((t) => Object.assign({ sample: true }, t)).concat(hidden);
    }
    return c._all;
  }
  const VERDICT = { ok: ['Accepted', 'ac'], wa: ['Wrong answer', 'wa'], re: ['Runtime error', 're'], tle: ['Time limit exceeded', 'tle'], ce: ['Compilation error', 'ce'], net: ['Could not run', 'ce'], stopped: ['Stopped', 'ce'] };
  PB.CODE_VERDICT = VERDICT;
  // Run all tests; calls onTest(i, result) as each finishes; resolves with { verdict, results }.
  PB.judge = async function (c, lang, code, onTest, onStatus) {
    const tests = testsOf(c), results = [];
    const limit = (c.timeLimit || 1) * (LANGS[lang] || LANGS.python).tl;
    let verdict = 'ok';
    const one = async (t, i) => {
      const r = await PB.runCode(lang, code, t.in, { limit: limit, onStatus: onStatus });
      let v = r.verdict;
      if (v === 'ok' && r.truncated) {
        // The online compiler cut the output off: check what we got as a prefix of the expected answer.
        const a = tokens(r.out), b = tokens(t.out); a.pop();
        if (a.length > b.length || a.some((x, k) => x !== b[k])) v = 'wa';
      } else if (v === 'ok' && !same(r.out, t.out, c.check)) v = 'wa';
      const res = Object.assign({ v: v, test: t, i: i }, r);
      results[i] = res;
      if (onTest) onTest(i, res);
      return res;
    };
    if (lang === 'cpp') {
      // Compile once to catch errors, then run the remaining tests a few at a time.
      const first = await one(tests[0], 0);
      if (first.v === 'ce' || first.v === 'net') return { verdict: first.v, results: results };
      const rest = tests.slice(1).map((t, k) => [t, k + 1]);
      for (let k = 0; k < rest.length; k += 3) await Promise.all(rest.slice(k, k + 3).map((x) => one(x[0], x[1])));
    } else {
      for (let i = 0; i < tests.length; i++) {
        const r = await one(tests[i], i);
        if (r.v === 'net' || r.v === 'ce') return { verdict: r.v, results: results };
      }
    }
    const firstBad = results.find((r) => r.v !== 'ok');
    if (firstBad) verdict = firstBad.v;
    return { verdict: verdict, results: results };
  };

  function template(lang, c) {
    if (c && c.starter && c.starter[lang] != null) return c.starter[lang];
    if (lang === 'python') return c && c.samples.length ? '# Read the input, solve, print the answer.\nline = input()\nprint(line)\n' : '# Write Python here and press Run (or Ctrl+Enter).\nprint("hello")\n';
    if (lang === 'javascript') return c && c.samples.length ? '// readline() returns the next line of input (or undefined at the end).\nconst line = readline();\nconsole.log(line);\n' : 'console.log("hello");\n';
    if (lang === 'cpp') return '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    ' + (c && c.samples.length ? 'int n;\n    cin >> n;\n    cout << n << "\\n";' : 'cout << "hello" << "\\n";') + '\n    return 0;\n}\n';
    return '<!doctype html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; }\n  </style>\n</head>\n<body>\n  <h1>Hello!</h1>\n  <script>\n    console.log("hi from the page");\n  </script>\n</body>\n</html>\n';
  }
  PB.codeTemplate = template;

  /* ======================= Code panel ======================= */
  // opts: { lang, langs, code, stdin, challenge, key (draft key), minLines, onSolved, compact }
  PB.codePanel = function (opts) {
    const h = PB.h, c = opts.challenge ? PB.challenge(opts.challenge) : null;
    const langs = (c ? c.langs : opts.langs) || [opts.lang || 'python'];
    const st = S();
    let lang = opts.lang && langs.indexOf(opts.lang) >= 0 ? opts.lang : (langs.indexOf(st.lang) >= 0 ? st.lang : langs[0]);
    const key = (l) => (opts.key || (c ? 'ch:' + c.id : 'pg')) + '|' + l;
    const initial = (l) => (st.drafts[key(l)] != null ? st.drafts[key(l)] : (opts.code && (typeof opts.code === 'string' ? (l === (opts.lang || langs[0]) ? opts.code : null) : opts.code[l])) || template(l, c));
    const box = h('div', { class: 'cpanel' + (opts.compact ? ' compact' : '') });
    const bar = h('div', { class: 'cp-bar' });
    const sel = h('select', { class: 'cp-lang', 'aria-label': 'Language' });
    langs.forEach((l) => sel.appendChild(h('option', { value: l, text: LANGS[l].name })));
    sel.value = lang;
    const runBtn = h('button', { class: 'btn primary small', type: 'button', title: 'Run (Ctrl+Enter)', text: '▶ Run' });
    const subBtn = c ? h('button', { class: 'btn small cp-submit', type: 'button', text: '✓ Submit' }) : null;
    const stopBtn = h('button', { class: 'btn small', type: 'button', text: '■ Stop', hidden: true });
    const resetBtn = h('button', { class: 'btn ghost small', type: 'button', text: 'Reset', title: 'Go back to the starting code' });
    const status = h('span', { class: 'cp-status', 'aria-live': 'polite' });
    bar.append(langs.length > 1 ? sel : h('span', { class: 'cp-lang-fixed', text: LANGS[lang].name }), runBtn);
    if (subBtn) bar.append(subBtn);
    bar.append(stopBtn, resetBtn, status);
    let saveT = null;
    const ed = PB.codeEditor({ lang: lang, value: initial(lang), minLines: opts.minLines || 8, maxLines: opts.maxLines || 26, onRun: () => run(), onChange: (v) => { clearTimeout(saveT); saveT = setTimeout(() => { st.drafts[key(lang)] = v; PB.save(); }, 400); } });
    box.append(bar, ed.el);
    const isWeb = () => lang === 'web';
    const stdinTa = h('textarea', { class: 'cp-stdin', spellcheck: 'false', rows: 3, 'aria-label': 'Input (stdin)', placeholder: 'Input your program reads (stdin)' });
    stdinTa.value = opts.stdin != null ? opts.stdin : c && c.samples[0] ? c.samples[0].in : '';
    const stdinBox = h('details', { class: 'cp-io' + (c || opts.stdin ? '' : ' muted') }, [h('summary', { text: 'Input (stdin)' }), stdinTa]);
    if (opts.stdin || (c && c.samples.length)) stdinBox.open = !!opts.stdin;
    const outEl = h('pre', { class: 'cp-out', 'aria-live': 'polite', 'aria-label': 'Output' });
    const frame = h('iframe', { class: 'cp-frame', sandbox: 'allow-scripts allow-modals allow-forms', title: 'Page preview', hidden: true });
    const verdictEl = h('div', { class: 'cp-verdicts' });
    box.append(stdinBox, frame, h('div', { class: 'cp-out-head', text: 'Output' }), outEl, verdictEl);
    function setLang(l) {
      st.drafts[key(lang)] = ed.value;
      lang = l; st.lang = l; PB.save();
      ed.setLang(l); ed.value = initial(l);
      stdinBox.hidden = isWeb(); frame.hidden = !isWeb();
      outEl.parentNode && (outEl.previousSibling.textContent = isWeb() ? 'Console' : 'Output');
      if (isWeb()) preview();
    }
    sel.addEventListener('change', () => setLang(sel.value));
    function write(t, k) {
      if (!t) return;
      const span = document.createElement('span');
      if (k === 'err') span.className = 'cp-err';
      span.textContent = t;
      outEl.appendChild(span);
      if (outEl.textContent.length > 200000) { outEl.lastChild.textContent += '\n… output cut off at 200 000 characters'; }
      outEl.scrollTop = outEl.scrollHeight;
    }
    function preview() {
      outEl.textContent = '';
      PB.webPreview(frame, ed.value, write);
      status.textContent = 'Preview updated';
    }
    let busy = false, cancel = {};
    function setBusy(b) { busy = b; runBtn.disabled = b; if (subBtn) subBtn.disabled = b; stopBtn.hidden = !b || lang === 'cpp'; }
    stopBtn.addEventListener('click', () => { if (cancel.fn) cancel.fn(); });
    async function run() {
      if (busy) return;
      st.drafts[key(lang)] = ed.value; PB.save();
      if (opts.onRun) opts.onRun();
      if (isWeb()) { preview(); return; }
      outEl.textContent = ''; verdictEl.innerHTML = '';
      setBusy(true); cancel = {};
      const r = await PB.runCode(lang, ed.value, stdinTa.value, { limit: opts.limit || 10, onOut: write, onStatus: (s) => { status.textContent = s; }, cancel: cancel });
      setBusy(false);
      if (!r.out && !r.err) write('(no output)', 'dim');
      status.textContent = r.verdict === 'tle' ? '⏱ Stopped after ' + (opts.limit || 10) + ' s (infinite loop?)' : r.verdict === 'stopped' ? 'Stopped' : r.verdict === 'ce' ? '✗ Compilation error' : r.verdict === 're' ? '✗ Finished with an error' + (r.ms ? ' · ' + Math.round(r.ms) + ' ms' : '') : r.verdict === 'net' ? '✗ Could not run' : '✓ Finished' + (r.ms != null ? ' in ' + Math.round(r.ms) + ' ms' : '');
      if (r.verdict === 'tle') write('\n⏱ Time limit: the program was stopped.', 'err');
      if (r.warn && lang === 'cpp' && /warning/.test(r.warn)) write('\n' + r.warn + '\n', 'err');
    }
    async function submit() {
      if (busy || !c) return;
      st.drafts[key(lang)] = ed.value;
      st.tries[c.id] = (st.tries[c.id] || 0) + 1; PB.save();
      outEl.textContent = ''; verdictEl.innerHTML = '';
      const tests = testsOf(c);
      const rows = tests.map((t, i) => { const r = h('div', { class: 'cp-test pending' }, [h('b', { text: (t.sample ? 'Sample ' : 'Test ') + (i + 1) }), h('span', { class: 'cp-v', text: 'waiting' })]); verdictEl.appendChild(r); return r; });
      const head = h('div', { class: 'cp-judge-head', text: 'Judging ' + tests.length + ' tests…' });
      verdictEl.insertBefore(head, verdictEl.firstChild);
      setBusy(true);
      const res = await PB.judge(c, lang, ed.value, (i, r) => {
        const V = VERDICT[r.v] || VERDICT.re, row = rows[i];
        row.className = 'cp-test v-' + V[1];
        row.querySelector('.cp-v').textContent = V[0] + (r.ms ? ' · ' + Math.round(r.ms) + ' ms' : '') + (r.truncated && r.v === 'ok' ? ' (first 32 kB of output checked)' : '');
        if (r.v !== 'ok' && !row.__detail) {
          row.__detail = true;
          const t = r.test, show = t.sample || (!t.big && (t.in || '').length < 400);
          const det = h('div', { class: 'cp-detail' });
          if (r.v === 'ce' || r.v === 'net') det.appendChild(h('pre', { class: 'cp-err', text: r.err }));
          else {
            if (show) det.append(h('div', { class: 'cp-dl', text: 'Input' }), h('pre', { text: t.in || '(empty)' }), h('div', { class: 'cp-dl', text: 'Expected' }), h('pre', { text: t.out }));
            else det.appendChild(h('p', { text: t.big ? 'A large hidden test (' + Math.round((t.in || '').length / 1000) + ' kB of input). ' + (r.v === 'tle' ? 'Your program is correct on small inputs but too slow here: think about the complexity.' : '') : 'A hidden test.' }));
            if (r.v === 'wa' || r.v === 're') det.append(h('div', { class: 'cp-dl', text: 'Your output' }), h('pre', { text: (r.out || '(nothing)').slice(0, 2000) }));
            if (r.err) det.appendChild(h('pre', { class: 'cp-err', text: r.err.slice(0, 2000) }));
          }
          row.appendChild(det);
        }
      }, (s) => { status.textContent = s; });
      setBusy(false);
      const V = VERDICT[res.verdict] || VERDICT.re;
      head.className = 'cp-judge-head v-' + V[1];
      const passed = res.results.filter((r) => r && r.v === 'ok').length;
      head.textContent = (res.verdict === 'ok' ? '✅ ' : '❌ ') + V[0] + ' · ' + passed + ' / ' + tests.length + ' tests passed';
      status.textContent = V[0];
      if (res.verdict === 'ok') {
        const first = !st.solved[c.id];
        st.solved[c.id] = st.solved[c.id] || { at: Date.now(), lang: lang };
        st.solved[c.id].langs = st.solved[c.id].langs || {}; st.solved[c.id].langs[lang] = 1;
        PB.save();
        if (first) {
          PB.addXP(c.xp, 'Code challenge: ' + c.title);
          if (PB.toast) PB.toast('<span class="tx">✅ Accepted</span> ' + esc(c.title) + ' · +' + c.xp + ' XP', 'badge-t');
          if (PB.wallet && PB.wallet.give) PB.wallet.give('coins', c.level === 'hard' ? 30 : c.level === 'medium' ? 15 : 8, 'code challenge', true);
        }
        if (opts.onSolved) opts.onSolved(first);
      }
    }
    runBtn.addEventListener('click', run);
    if (subBtn) subBtn.addEventListener('click', submit);
    resetBtn.addEventListener('click', () => { if (!confirm('Replace your code with the starting code?')) return; delete st.drafts[key(lang)]; ed.value = (opts.code && (typeof opts.code === 'string' ? opts.code : opts.code[lang])) || template(lang, c); PB.save(); });
    stdinBox.hidden = isWeb(); frame.hidden = !isWeb();
    if (isWeb()) { outEl.previousSibling.textContent = 'Console'; setTimeout(preview, 50); }
    return { el: box, editor: ed, run: run, get lang() { return lang; }, setCode: (v) => { ed.value = v; } };
  };

  /* ======================= Challenge statement ======================= */
  function statement(c, full) {
    const h = PB.h;
    const box = h('div', { class: 'cc-statement prose' });
    box.appendChild(h('div', { html: c.statement }));
    if (c.input) box.appendChild(h('div', { class: 'cc-io' }, [h('h4', { text: 'Input' }), h('div', { html: c.input })]));
    if (c.output) box.appendChild(h('div', { class: 'cc-io' }, [h('h4', { text: 'Output' }), h('div', { html: c.output })]));
    c.samples.forEach((t, i) => box.appendChild(h('div', { class: 'cc-sample' }, [
      h('div', {}, [h('div', { class: 'cp-dl', text: 'Sample input ' + (i + 1) }), h('pre', { text: t.in })]),
      h('div', {}, [h('div', { class: 'cp-dl', text: 'Sample output ' + (i + 1) }), h('pre', { text: t.out })])
    ])));
    if (c.note) box.appendChild(h('p', { class: 'cc-note', html: c.note }));
    if ((c.hints || []).length) {
      const hb = h('div', { class: 'cc-hints' });
      let shown = 0;
      const btn = h('button', { class: 'btn small', type: 'button', text: 'Show a hint (1 of ' + c.hints.length + ')' });
      btn.addEventListener('click', () => { hb.insertBefore(h('div', { class: 'hint', html: '<b>Hint ' + (shown + 1) + '</b> ' + c.hints[shown] }), btn); shown++; if (shown >= c.hints.length) btn.remove(); else btn.textContent = 'Show another hint (' + (shown + 1) + ' of ' + c.hints.length + ')'; PB.typeset && PB.typeset(hb); });
      hb.appendChild(btn); box.appendChild(hb);
    }
    if (c.solution && full) {
      const sb = h('details', { class: 'cc-solution' }, [h('summary', { text: PB.challengeSolved(c.id) ? 'Model solution' : 'Model solution (try first: reading it now still lets you earn the XP, but you learn less)' })]);
      Object.keys(c.solution).forEach((l) => { sb.appendChild(h('div', { class: 'cp-dl', text: LANGS[l].name })); const pre = h('pre', { 'data-lang': l, text: c.solution[l] }); sb.appendChild(pre); });
      if (c.explain) sb.appendChild(h('div', { html: c.explain }));
      box.appendChild(sb);
      PB.highlightBlocks(sb);
    }
    return box;
  }

  /* ======================= Lab sims ======================= */
  // { sim: 'code', params: { challenge: id } } or { sim: 'code', params: { lang, langs, code, stdin } }
  PB.sims.code = function (api, P) {
    const h = PB.h;
    api.stage.classList.add('code-stage');
    api.controls.remove();
    const c = P.challenge ? PB.challenge(P.challenge) : null;
    if (c) {
      const head = h('div', { class: 'cc-head' }, [h('span', { class: 'cc-level lv-' + (c.level || 'easy'), text: (c.level || 'easy') }), h('span', { class: 'cc-xp', text: '+' + c.xp + ' XP' }), PB.challengeSolved(c.id) ? h('span', { class: 'cc-solved', text: '✓ Solved' }) : null, h('a', { class: 'cc-open', href: '#code-' + c.id, text: 'Open full screen ↗' })]);
      api.stage.append(head, statement(c, true));
    }
    const panel = PB.codePanel(Object.assign({}, P, { onSolved: () => { const s = api.stage.querySelector('.cc-head'); if (s && !s.querySelector('.cc-solved')) s.insertBefore(h('span', { class: 'cc-solved', text: '✓ Solved' }), s.querySelector('.cc-open')); } }));
    api.stage.appendChild(panel.el);
  };

  /* ======================= Pages: #code and #code-<id> ======================= */
  PB.openPlayground = function (lang, code) {
    const st = S();
    st.drafts['pg|' + lang] = code; st.lang = lang; PB.save();
    if (location.hash === '#code') PB.route(); else location.hash = '#code';
  };
  function chLabel(id) { const ch = PB.chapter && PB.chapter(id); return ch ? ch.title : id; }
  function viewCode() {
    const h = PB.h, st = S();
    const wrap = h('div', { class: 'wrap-wide code-page' });
    const nSolved = PB.CHALLENGES.filter((c) => st.solved[c.id]).length;
    wrap.appendChild(h('header', { class: 'subj-head subj-computing' }, [
      h('span', { class: 'subj-badge lg', text: '💻' }),
      h('div', {}, [h('div', { class: 'eyebrow', text: 'Computing · ' + PB.CHALLENGES.length + ' judged challenges · ' + nSolved + ' solved' }), h('h1', { text: 'Code lab' }),
        h('p', { class: 'lede', html: 'Write and run <b>Python</b>, <b>JavaScript</b>, <b>C++</b> or a <b>web page</b> right here. Python runs in your browser (Pyodide), JavaScript in a sandboxed worker, and C++ is compiled online on Compiler Explorer, so it needs internet. Your code is saved as you type. Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run.' })])
    ]));
    const tabs = h('nav', { class: 'tabs code-tabs' });
    const body = h('div');
    const TAB = [['play', 'Playground'], ['problems', 'Problem set'], ['shell', 'Terminal']];
    let tab = st.tab || 'play';
    function show(t) {
      tab = t; st.tab = t; PB.save();
      tabs.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x.getAttribute('data-t') === t));
      if (PB.onViewDestroy && body.__cleanup) body.__cleanup();
      body.innerHTML = '';
      if (t === 'play') {
        body.appendChild(h('p', { class: 'cp-intro', text: 'Pick a language and run anything. Use the Input box for programs that read input().' }));
        const p = PB.codePanel({ langs: ['python', 'javascript', 'cpp', 'web'], minLines: 14, maxLines: 40, limit: 20 });
        body.appendChild(p.el);
      } else if (t === 'problems') body.appendChild(problemList());
      else if (t === 'shell') {
        body.appendChild(h('p', { class: 'cp-intro', html: 'A practice terminal with its own pretend file system (nothing touches your real computer). Type <code>help</code> to see the commands, or <code>missions</code> for guided tasks.' }));
        const holder = h('div', { class: 'term-holder' });
        body.appendChild(holder);
        if (PB.mountTerminal) PB.mountTerminal(holder, { missions: true });
      }
    }
    TAB.forEach((t) => tabs.appendChild(h('a', { class: 'tab', href: '#code', 'data-t': t[0], onclick: (e) => { e.preventDefault(); show(t[0]); } }, [t[1]])));
    wrap.append(tabs, body);
    PB.setView([wrap], 'code');
    show(tab);
    window.scrollTo(0, 0);
  }
  function problemList() {
    const h = PB.h, st = S();
    const box = h('div', { class: 'cc-list' });
    const groups = {};
    PB.CHALLENGES.forEach((c) => { (groups[c.chapter] = groups[c.chapter] || []).push(c); });
    const order = (PB.chapters || []).filter((ch) => groups[ch.id]).map((ch) => ch.id);
    Object.keys(groups).forEach((k) => { if (order.indexOf(k) < 0) order.push(k); });
    order.forEach((chId) => {
      const ch = PB.chapter && PB.chapter(chId);
      box.appendChild(h('div', { class: 'part-label', html: (ch && PB.bookOf ? PB.bookOf(ch).icon + ' ' : '') + esc(chLabel(chId)) }));
      const list = h('div', { class: 'cc-rows' });
      groups[chId].forEach((c) => {
        const ok = st.solved[c.id], tried = st.tries[c.id];
        list.appendChild(h('a', { class: 'cc-row' + (ok ? ' solved' : ''), href: '#code-' + c.id }, [
          h('span', { class: 'cc-mark', text: ok ? '✓' : tried ? '•' : '' }),
          h('span', { class: 'cc-title', text: c.title }),
          h('span', { class: 'cc-level lv-' + (c.level || 'easy'), text: c.level || 'easy' }),
          h('span', { class: 'cc-langs', text: c.langs.map((l) => LANGS[l].name).join(' · ') }),
          h('span', { class: 'cc-xp', text: '+' + c.xp + ' XP' })
        ]));
      });
      box.appendChild(list);
    });
    return box;
  }
  function viewChallenge(id) {
    const h = PB.h, c = PB.challenge(id);
    if (!c) { location.hash = '#code'; return; }
    const ch = PB.chapter && PB.chapter(c.chapter);
    const wrap = h('div', { class: 'wrap-wide code-page' });
    wrap.appendChild(h('div', { class: 'eyebrow', html: '<a href="#code">Code lab</a> · ' + (ch ? '<a href="#ch-' + ch.id + '--lab">' + esc(ch.title) + '</a>' : '') }));
    wrap.appendChild(h('h1', { class: 'cc-h1', text: c.title }));
    wrap.appendChild(h('div', { class: 'cc-head' }, [h('span', { class: 'cc-level lv-' + (c.level || 'easy'), text: c.level || 'easy' }), h('span', { class: 'cc-xp', text: '+' + c.xp + ' XP' }), h('span', { class: 'cc-xp', text: 'time limit ' + (c.timeLimit || 1) + ' s (scaled per language)' }), PB.challengeSolved(c.id) ? h('span', { class: 'cc-solved', text: '✓ Solved' }) : null]));
    const grid = h('div', { class: 'cc-split' });
    grid.appendChild(statement(c, true));
    const right = h('div', { class: 'cc-work' });
    right.appendChild(PB.codePanel({ challenge: c.id, minLines: 16, maxLines: 40 }).el);
    grid.appendChild(right);
    wrap.appendChild(grid);
    const i = PB.CHALLENGES.indexOf(c), next = PB.CHALLENGES[i + 1], prev = PB.CHALLENGES[i - 1];
    wrap.appendChild(h('nav', { class: 'ch-nav' }, [prev ? h('a', { href: '#code-' + prev.id }, [h('small', { text: '← Previous challenge' }), prev.title]) : null, next ? h('a', { class: 'next', href: '#code-' + next.id }, [h('small', { text: 'Next challenge →' }), next.title]) : null]));
    PB.setView([wrap], 'code');
    if (PB.typeset) PB.typeset(wrap);
    window.scrollTo(0, 0);
  }
  PB.views.code = viewCode;

  /* ======================= Authoring kit for the computing chapters ======================= */
  // K(lang, src, run): a highlighted code block (write @{ for a JavaScript ${ ). c(src): inline code.
  PB.csKit = function () {
    const fix = (s) => String(s).replace(/@\{/g, '${').replace(/¨/g, '`');
    const wrapP = (s) => (/^\s*</.test(s) ? s : '<p>' + s + '</p>');
    const K = (lang, src, run) => '<pre data-lang="' + lang + '"' + (run ? ' data-run' : '') + '>' + esc(fix(src).replace(/^\n/, '').replace(/\n\s*$/, '')) + '</pre>';
    const c = (src) => '<code>' + esc(fix(src)) + '</code>';
    const QN = (q, answer, hints, solution, o) => Object.assign({ type: 'num', q: wrapP(q), answer: answer, hints: hints, solution: wrapP(solution), tol: 0.001 }, o || {});
    const QM = (q, options, answer, hints, solution) => ({ type: 'mcq', q: wrapP(q), options: options, answer: answer, hints: hints, solution: wrapP(solution) });
    const P = (level, type, title, q, answer, hints, solution, o) => Object.assign({ level: level, type: type, title: title, q: wrapP(q), answer: answer, hints: hints, solution: wrapP(solution) }, type === 'num' ? { tol: 0.001 } : {}, o || {});
    // Tests computed from a reference solution: T(ref)(input) and G(ref, make, big) for generated ones.
    const T = (ref) => (inp) => ({ in: inp, out: ref(inp) });
    const G = (ref, make, big) => ({ big: big !== false, gen: (r) => { const i = make(r); return { in: i, out: ref(i) }; } });
    return { R: String.raw, K: K, c: c, QN: QN, QM: QM, P: P, T: T, G: G, fix: fix };
  };
})();
