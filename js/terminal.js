/* Scibook practice terminal: a pretend Unix shell with its own file system, kept in the browser.
   Supports the everyday commands (pwd, ls, cd, mkdir, touch, cat, echo with > and >>, cp, mv, rm, head, tail,
   wc, grep, sort, uniq, find, tree, chmod, history), pipes with |, chaining with && and ;, globs like *.txt,
   Tab completion, ↑/↓ history, and running scripts: ./script.sh, python3 file.py and node file.js. */
(function () {
  'use strict';
  const PB = window.PB;
  const HOME = '/home/student';
  function seed() {
    const D = (kids) => ({ t: 'd', mode: 'rwxr-xr-x', kids: kids || {} });
    const F = (txt, mode) => ({ t: 'f', mode: mode || 'rw-r--r--', txt: txt });
    return D({
      home: D({ student: D({
        'notes.txt': F('Shopping: milk, eggs, bread\nCall Sam about the olympiad\nRead chapter 3 of the Python book\n'),
        'todo.txt': F('finish homework\npractice binary search\nfix the website\nlearn git\npractice binary search\n'),
        'hello.py': F('name = "world"\nprint(f"Hello, {name}!")\nfor i in range(3):\n    print("line", i)\n'),
        'greet.sh': F('echo Hello from a shell script!\necho You are in:\npwd\n', 'rw-r--r--'),
        Documents: D({ 'essay.txt': F('The internet is a network of networks.\nEvery device has an IP address.\nDNS turns names into addresses.\n'), 'scores.csv': F('name,score\nAda,91\nAlan,78\nGrace,88\nLinus,64\nAda,95\n') }),
        Pictures: D({ 'cat.jpg': F('(binary image data)'), 'holiday.png': F('(binary image data)') }),
        projects: D({ website: D({ 'index.html': F('<!doctype html>\n<html>\n  <body>\n    <h1>My site</h1>\n  </body>\n</html>\n'), 'style.css': F('h1 { color: teal; }\n') }) }),
        '.secret': F('You found a hidden file! Files starting with a dot are hidden from plain ls.\n')
      }) }),
      etc: D({ 'hosts': F('127.0.0.1   localhost\n93.184.215.14   example.com\n'), 'motd': F('Welcome to the Scibook practice terminal.\n') }),
      tmp: D({}),
      bin: D({ ls: F('(program)', 'rwxr-xr-x'), cat: F('(program)', 'rwxr-xr-x'), python3: F('(program)', 'rwxr-xr-x') })
    });
  }
  const MISSIONS = [
    { t: 'Where am I? Print the working directory.', hint: 'pwd', ok: (e) => e.cmd === 'pwd' },
    { t: 'List the files in your home folder.', hint: 'ls', ok: (e) => e.cmd === 'ls' },
    { t: 'Show hidden files too.', hint: 'ls -a', ok: (e) => e.cmd === 'ls' && /a/.test(e.flags) },
    { t: 'Read the file notes.txt.', hint: 'cat notes.txt', ok: (e) => e.cmd === 'cat' && e.args.some((a) => /notes\.txt$/.test(a)) },
    { t: 'Move into the Documents folder.', hint: 'cd Documents', ok: (e, sh) => sh.cwd === HOME + '/Documents' },
    { t: 'Go back up to the parent folder with ..', hint: 'cd ..', ok: (e, sh) => e.cmd === 'cd' && e.args[0] === '..' },
    { t: 'Make a folder called lab inside your home folder.', hint: 'mkdir lab', ok: (e, sh) => sh.get(HOME + '/lab') && sh.get(HOME + '/lab').t === 'd' },
    { t: 'Create an empty file lab/data.txt.', hint: 'touch lab/data.txt', ok: (e, sh) => !!sh.get(HOME + '/lab/data.txt') },
    { t: 'Write the text "hello file" into lab/data.txt using echo and >.', hint: 'echo hello file > lab/data.txt', ok: (e, sh) => { const f = sh.get(HOME + '/lab/data.txt'); return f && /hello file/.test(f.txt); } },
    { t: 'Append a second line with >> (anything you like).', hint: 'echo second line >> lab/data.txt', ok: (e, sh) => { const f = sh.get(HOME + '/lab/data.txt'); return f && f.txt.trim().split('\n').length >= 2; } },
    { t: 'Copy notes.txt to lab/notes-copy.txt.', hint: 'cp notes.txt lab/notes-copy.txt', ok: (e, sh) => !!sh.get(HOME + '/lab/notes-copy.txt') },
    { t: 'Rename lab/notes-copy.txt to lab/old-notes.txt with mv.', hint: 'mv lab/notes-copy.txt lab/old-notes.txt', ok: (e, sh) => !!sh.get(HOME + '/lab/old-notes.txt') && !sh.get(HOME + '/lab/notes-copy.txt') },
    { t: 'Delete lab/old-notes.txt.', hint: 'rm lab/old-notes.txt', ok: (e, sh) => e.cmd === 'rm' && !sh.get(HOME + '/lab/old-notes.txt') && !!sh.get(HOME + '/lab') },
    { t: 'Find the lines of todo.txt that contain "practice".', hint: 'grep practice todo.txt', ok: (e) => e.cmd === 'grep' && /practice/.test(e.line) },
    { t: 'Count the lines of todo.txt with a pipe: cat into wc -l.', hint: 'cat todo.txt | wc -l', ok: (e) => /\|\s*wc/.test(e.line) },
    { t: 'Show todo.txt sorted with duplicates removed (sort, then uniq).', hint: 'sort todo.txt | uniq', ok: (e) => /sort/.test(e.line) && /\|\s*uniq/.test(e.line) },
    { t: 'Find every .txt file below your home folder.', hint: 'find . -name "*.txt"', ok: (e) => e.cmd === 'find' && /\.txt/.test(e.line) },
    { t: 'Try to run ./greet.sh. Permission denied? Make it executable with chmod +x, then run it.', hint: 'chmod +x greet.sh && ./greet.sh', ok: (e) => e.ranScript === 'greet.sh' },
    { t: 'Run the Python program hello.py.', hint: 'python3 hello.py', ok: (e) => e.cmd === 'python3' && /hello\.py/.test(e.line) }
  ];
  PB.TERM_MISSIONS = MISSIONS;
  const HELP = {
    pwd: 'pwd: print the working directory (where you are)', ls: 'ls [-l] [-a] [path]: list a folder (-l long form, -a include hidden dot-files)', cd: 'cd [path]: change directory. cd .. goes up, cd ~ or cd goes home, cd / goes to the root',
    mkdir: 'mkdir [-p] dir: make a directory (-p: make parents too)', touch: 'touch file: create an empty file (or update its time)', cat: 'cat file…: print files one after another', echo: 'echo text: print text. echo text > file writes a file, >> appends',
    cp: 'cp [-r] src dest: copy a file (-r for folders)', mv: 'mv src dest: move or rename', rm: 'rm [-r] path…: delete (no recycle bin!). -r deletes folders and everything inside', rmdir: 'rmdir dir: remove an empty directory',
    head: 'head [-n N] file: first N lines (default 10)', tail: 'tail [-n N] file: last N lines', wc: 'wc [-l] [-w] [-c] file: count lines, words and characters', grep: 'grep [-i] [-n] [-v] [-c] pattern file…: lines that match a pattern',
    sort: 'sort [-r] [-n] file: sort lines', uniq: 'uniq [-c] file: drop repeated neighbouring lines', find: 'find [path] -name "pattern": search for files by name', tree: 'tree [path]: draw the folder tree',
    chmod: 'chmod +x file or chmod 755 file: change permissions', history: 'history: commands you typed', clear: 'clear: clear the screen', whoami: 'whoami: your user name', date: 'date: the date and time',
    python3: 'python3 file.py: run a Python program', node: 'node file.js: run a JavaScript program', man: 'man command: a one-line manual', missions: 'missions: show the guided tasks', reset: 'reset: restore the starting file system', file: 'file path: guess what kind of file it is'
  };

  function Shell(state, print, onEvent) {
    this.state = state; this.print = print; this.onEvent = onEvent;
    if (!state.fs) { state.fs = seed(); state.cwd = HOME; }
    this.cwd = state.cwd || HOME;
    this.hist = state.hist || (state.hist = []);
  }
  Shell.prototype.abs = function (p) {
    if (!p) return this.cwd;
    if (p === '~') p = HOME; else if (p.slice(0, 2) === '~/') p = HOME + p.slice(1);
    const parts = (p[0] === '/' ? p : this.cwd + '/' + p).split('/');
    const out = [];
    parts.forEach((x) => { if (!x || x === '.') return; if (x === '..') out.pop(); else out.push(x); });
    return '/' + out.join('/');
  };
  Shell.prototype.get = function (abs) {
    let n = this.state.fs;
    const parts = abs.split('/').filter(Boolean);
    for (let i = 0; i < parts.length; i++) { if (!n || n.t !== 'd') return null; n = n.kids[parts[i]]; }
    return n || null;
  };
  Shell.prototype.parent = function (abs) { const i = abs.lastIndexOf('/'); return [this.get(abs.slice(0, i) || '/'), abs.slice(i + 1)]; };
  Shell.prototype.short = function (abs) { return abs === HOME ? '~' : abs.indexOf(HOME + '/') === 0 ? '~' + abs.slice(HOME.length) : abs; };
  function globRe(g) { return new RegExp('^' + g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$'); }
  Shell.prototype.expand = function (args) {
    const out = [];
    args.forEach((a) => {
      if (!/[*?]/.test(a.v) || a.q) { out.push(a.v); return; }
      const abs = this.abs(a.v), i = abs.lastIndexOf('/'), dir = this.get(abs.slice(0, i) || '/'), re = globRe(abs.slice(i + 1));
      const prefix = a.v.lastIndexOf('/') >= 0 ? a.v.slice(0, a.v.lastIndexOf('/') + 1) : '';
      const hits = dir && dir.t === 'd' ? Object.keys(dir.kids).filter((k) => k[0] !== '.' && re.test(k)).sort().map((k) => prefix + k) : [];
      if (hits.length) hits.forEach((x) => out.push(x)); else out.push(a.v);
    });
    return out;
  };
  // Split a line into tokens, keeping quotes, |, >, >>, && and ;.
  function lex(line) {
    const toks = []; let i = 0;
    while (i < line.length) {
      const c = line[i];
      if (/\s/.test(c)) { i++; continue; }
      if (line.slice(i, i + 2) === '&&' || line.slice(i, i + 2) === '>>') { toks.push({ op: line.slice(i, i + 2) }); i += 2; continue; }
      if (c === '|' || c === '>' || c === ';' || c === '<') { toks.push({ op: c }); i++; continue; }
      let v = '', q = false;
      while (i < line.length && !/[\s|;<>]/.test(line[i]) && line.slice(i, i + 2) !== '&&') {
        if (line[i] === '"' || line[i] === "'") { const qc = line[i++]; q = true; while (i < line.length && line[i] !== qc) v += line[i++]; i++; }
        else v += line[i++];
      }
      toks.push({ v: v, q: q });
    }
    return toks;
  }
  Shell.prototype.run = async function (line) {
    line = line.trim();
    if (!line) return;
    this.hist.push(line); if (this.hist.length > 200) this.hist.shift();
    const toks = lex(line);
    // Split into && / ; groups, then pipelines.
    const groups = []; let cur = [], sep = ';';
    toks.forEach((t) => { if (t.op === '&&' || t.op === ';') { groups.push([sep, cur]); cur = []; sep = t.op; } else cur.push(t); });
    groups.push([sep, cur]);
    let ok = true;
    for (const [s, g] of groups) {
      if (s === '&&' && !ok) continue;
      if (!g.length) continue;
      ok = await this.pipeline(g, line);
    }
    this.state.cwd = this.cwd;
  };
  Shell.prototype.pipeline = async function (toks, line) {
    const stages = [[]];
    toks.forEach((t) => { if (t.op === '|') stages.push([]); else stages[stages.length - 1].push(t); });
    let input = null, ok = true;
    for (let k = 0; k < stages.length; k++) {
      let st = stages[k], redir = null, inFile = null;
      const ri = st.findIndex((t) => t.op === '>' || t.op === '>>');
      if (ri >= 0) { redir = { op: st[ri].op, file: st[ri + 1] && st[ri + 1].v }; st = st.slice(0, ri).concat(st.slice(ri + 2)); }
      const ii = st.findIndex((t) => t.op === '<');
      if (ii >= 0) { inFile = st[ii + 1] && st[ii + 1].v; st = st.slice(0, ii).concat(st.slice(ii + 2)); }
      if (!st.length) { this.print('syntax error near unexpected token\n', 'err'); return false; }
      const cmd = st[0].v, raw = st.slice(1);
      const words = this.expand(raw);
      const flags = words.filter((w) => /^-[A-Za-z]+$/.test(w)).map((w) => w.slice(1)).join('');
      const last = k === stages.length - 1;
      if (inFile) { const f = this.get(this.abs(inFile)); if (!f || f.t !== 'f') { this.print(cmd + ': ' + inFile + ': No such file or directory\n', 'err'); return false; } input = f.txt; }
      const ev = { cmd: cmd, args: words, flags: flags, line: line };
      let out = '';
      const res = await this.exec(cmd, words, input, ev, (s) => { out += s; }, last && !redir);
      ok = res !== false;
      if (redir) {
        if (!redir.file) { this.print('syntax error: where should the output go?\n', 'err'); return false; }
        const abs = this.abs(redir.file), pr = this.parent(abs);
        if (!pr[0] || pr[0].t !== 'd') { this.print(redir.file + ': No such file or directory\n', 'err'); return false; }
        const ex = pr[0].kids[pr[1]];
        if (ex && ex.t === 'd') { this.print(redir.file + ': Is a directory\n', 'err'); return false; }
        if (redir.op === '>>' && ex) ex.txt += out; else pr[0].kids[pr[1]] = { t: 'f', mode: ex ? ex.mode : 'rw-r--r--', txt: out };
        out = '';
      }
      if (last) { if (out) this.print(out); } else input = out;
      this.onEvent(ev, this);
      if (!ok) break;
    }
    return ok;
  };
  Shell.prototype.read = function (name, cmd) {
    const f = this.get(this.abs(name));
    if (!f) { this.print(cmd + ': ' + name + ': No such file or directory\n', 'err'); return null; }
    if (f.t === 'd') { this.print(cmd + ': ' + name + ': Is a directory\n', 'err'); return null; }
    return f.txt;
  };
  const lines = (t) => { const a = t.split('\n'); if (a[a.length - 1] === '') a.pop(); return a; };
  Shell.prototype.exec = async function (cmd, args, input, ev, out, direct) {
    const sh = this, A = args.filter((a) => !/^-[A-Za-z]+$/.test(a)), fl = ev.flags;
    const err = (m) => { sh.print(m + '\n', 'err'); return false; };
    const textIn = (c) => { if (A.length) { let t = ''; for (const a of A) { const x = sh.read(a, c); if (x == null) return null; t += x; } return t; } return input != null ? input : ''; };
    const numOpt = (def) => { const i = args.indexOf('-n'); if (i >= 0 && args[i + 1]) { const n = parseInt(args[i + 1], 10); A.splice(A.indexOf(args[i + 1]), 1); return n; } const m = args.find((a) => /^-\d+$/.test(a)); return m ? -parseInt(m, 10) : def; };
    switch (cmd) {
      case 'help': out('Commands: ' + Object.keys(HELP).join(', ') + '\nType man <command> for details. Pipes (|), redirection (> and >>), && and globs (*.txt) work.\n'); return true;
      case 'man': if (!A[0]) return err('What manual page do you want? Try: man ls'); out((HELP[A[0]] || 'No manual entry for ' + A[0]) + '\n'); return true;
      case 'pwd': out(sh.cwd + '\n'); return true;
      case 'whoami': out('student\n'); return true;
      case 'date': out(new Date().toString() + '\n'); return true;
      case 'clear': sh.print(null, 'clear'); return true;
      case 'history': sh.hist.forEach((x, i) => out(String(i + 1).padStart(4) + '  ' + x + '\n')); return true;
      case 'missions': sh.print(null, 'missions'); return true;
      case 'reset': sh.state.fs = seed(); sh.cwd = HOME; out('File system restored.\n'); return true;
      case 'echo': out(args.join(' ') + '\n'); return true;
      case 'cd': {
        const p = sh.abs(A[0] || '~'), n = sh.get(p);
        if (!n) return err('cd: ' + A[0] + ': No such file or directory');
        if (n.t !== 'd') return err('cd: ' + A[0] + ': Not a directory');
        sh.cwd = p; return true;
      }
      case 'ls': {
        const targets = A.length ? A : ['.'];
        let okAll = true;
        targets.forEach((t, ti) => {
          const p = sh.abs(t), n = sh.get(p);
          if (!n) { okAll = err('ls: cannot access \'' + t + '\': No such file or directory'); return; }
          const names = n.t === 'd' ? Object.keys(n.kids).filter((k) => /a/.test(fl) || k[0] !== '.').sort() : [t];
          if (/a/.test(fl) && n.t === 'd') names.unshift('.', '..');
          if (targets.length > 1 && n.t === 'd') out((ti ? '\n' : '') + t + ':\n');
          const item = (k) => (k === '.' || k === '..' ? { t: 'd', mode: 'rwxr-xr-x', kids: {} } : n.t === 'd' ? n.kids[k] : n);
          if (/l/.test(fl)) names.forEach((k) => { const x = item(k), size = x.t === 'd' ? 4096 : new Blob([x.txt]).size; out((x.t === 'd' ? 'd' : '-') + x.mode + '  student student ' + String(size).padStart(6) + '  ' + (direct && x.t === 'd' ? '\u0001' + k + '\u0002' : k) + '\n'); });
          else if (names.length) out(names.map((k) => (direct && item(k).t === 'd' ? '\u0001' + k + '\u0002' : direct && /x/.test(item(k).mode) && item(k).t === 'f' ? '\u0003' + k + '\u0002' : k)).join('  ') + '\n');
        });
        return okAll;
      }
      case 'mkdir': {
        if (!A.length) return err('mkdir: missing operand');
        for (const a of A) {
          const p = sh.abs(a);
          if (/p/.test(fl)) { let path = ''; for (const part of p.split('/').filter(Boolean)) { path += '/' + part; const n = sh.get(path); if (!n) { const pr = sh.parent(path); pr[0].kids[pr[1]] = { t: 'd', mode: 'rwxr-xr-x', kids: {} }; } else if (n.t !== 'd') return err('mkdir: ' + path + ': Not a directory'); } continue; }
          const pr = sh.parent(p);
          if (!pr[0] || pr[0].t !== 'd') return err('mkdir: cannot create directory \'' + a + '\': No such file or directory (use -p to make parents)');
          if (pr[0].kids[pr[1]]) return err('mkdir: cannot create directory \'' + a + '\': File exists');
          pr[0].kids[pr[1]] = { t: 'd', mode: 'rwxr-xr-x', kids: {} };
        }
        return true;
      }
      case 'touch': {
        if (!A.length) return err('touch: missing file operand');
        for (const a of A) { const p = sh.abs(a), pr = sh.parent(p); if (!pr[0] || pr[0].t !== 'd') return err('touch: cannot touch \'' + a + '\': No such file or directory'); if (!pr[0].kids[pr[1]]) pr[0].kids[pr[1]] = { t: 'f', mode: 'rw-r--r--', txt: '' }; }
        return true;
      }
      case 'cat': { const t = textIn('cat'); if (t == null) return false; out(t); return true; }
      case 'rm': {
        if (!A.length) return err('rm: missing operand');
        for (const a of A) {
          const p = sh.abs(a), n = sh.get(p);
          if (!n) return err('rm: cannot remove \'' + a + '\': No such file or directory');
          if (n.t === 'd' && !/r/.test(fl)) return err('rm: cannot remove \'' + a + '\': Is a directory (use rm -r)');
          if (p === '/' || p === HOME) return err('rm: refusing to remove \'' + a + '\' (that would delete everything!)');
          if (sh.cwd === p || sh.cwd.indexOf(p + '/') === 0) sh.cwd = sh.parent(p)[0] ? p.slice(0, p.lastIndexOf('/')) || '/' : HOME;
          const pr = sh.parent(p); delete pr[0].kids[pr[1]];
        }
        return true;
      }
      case 'rmdir': {
        const n = A[0] && sh.get(sh.abs(A[0]));
        if (!n) return err('rmdir: failed to remove \'' + (A[0] || '') + '\': No such file or directory');
        if (n.t !== 'd') return err('rmdir: failed to remove \'' + A[0] + '\': Not a directory');
        if (Object.keys(n.kids).length) return err('rmdir: failed to remove \'' + A[0] + '\': Directory not empty');
        const pr = sh.parent(sh.abs(A[0])); delete pr[0].kids[pr[1]]; return true;
      }
      case 'cp': case 'mv': {
        if (A.length < 2) return err(cmd + ': missing destination file operand');
        const dst = A[A.length - 1], srcs = A.slice(0, -1);
        for (const s of srcs) {
          const sp = sh.abs(s), sn = sh.get(sp);
          if (!sn) return err(cmd + ': cannot stat \'' + s + '\': No such file or directory');
          if (sn.t === 'd' && cmd === 'cp' && !/r/.test(fl)) return err('cp: -r not specified; omitting directory \'' + s + '\'');
          let dp = sh.abs(dst); const dn = sh.get(dp);
          if (dn && dn.t === 'd') dp = dp + '/' + sp.slice(sp.lastIndexOf('/') + 1);
          if (dp === sp) continue;
          if (sn.t === 'd' && (dp + '/').indexOf(sp + '/') === 0) return err(cmd + ': cannot move \'' + s + '\' into itself');
          const pr = sh.parent(dp);
          if (!pr[0] || pr[0].t !== 'd') return err(cmd + ': cannot create \'' + dst + '\': No such file or directory');
          pr[0].kids[pr[1]] = cmd === 'cp' ? JSON.parse(JSON.stringify(sn)) : sn;
          if (cmd === 'mv') { const sp2 = sh.parent(sp); delete sp2[0].kids[sp2[1]]; }
        }
        return true;
      }
      case 'head': case 'tail': { const n = Math.abs(numOpt(10)); const t = textIn(cmd); if (t == null) return false; const L = lines(t); (cmd === 'head' ? L.slice(0, n) : L.slice(Math.max(0, L.length - n))).forEach((l) => out(l + '\n')); return true; }
      case 'wc': {
        const t = textIn('wc'); if (t == null) return false;
        const l = (t.match(/\n/g) || []).length, w = t.split(/\s+/).filter(Boolean).length, c = new Blob([t]).size;
        const parts = []; if (/l/.test(fl)) parts.push(l); if (/w/.test(fl)) parts.push(w); if (/c/.test(fl)) parts.push(c);
        out((parts.length ? parts : [l, w, c]).map((x) => String(x).padStart(parts.length === 1 ? 0 : 4)).join(' ') + (A.length === 1 ? ' ' + A[0] : '') + '\n'); return true;
      }
      case 'grep': {
        if (!A.length) return err('usage: grep [-i] [-n] [-v] [-c] pattern [file…]');
        const pat = A.shift();
        let re; try { re = new RegExp(pat, /i/.test(fl) ? 'i' : ''); } catch (e) { return err('grep: bad pattern'); }
        let any = false, count = 0;
        const files = A.length ? A : [null];
        for (const f of files) {
          const t = f == null ? (input || '') : sh.read(f, 'grep'); if (t == null) continue;
          lines(t).forEach((l, i) => { if (re.test(l) !== /v/.test(fl)) { any = true; count++; if (!/c/.test(fl)) out((files.length > 1 ? f + ':' : '') + (/n/.test(fl) ? (i + 1) + ':' : '') + (direct && !/v/.test(fl) ? l.replace(new RegExp(pat, 'g' + (/i/.test(fl) ? 'i' : '')), (m) => '\u0004' + m + '\u0002') : l) + '\n'); } });
        }
        if (/c/.test(fl)) out(count + '\n');
        return any;
      }
      case 'sort': { const t = textIn('sort'); if (t == null) return false; let L = lines(t); L = /n/.test(fl) ? L.sort((a, b) => parseFloat(a) - parseFloat(b)) : L.sort(); if (/r/.test(fl)) L.reverse(); L.forEach((l) => out(l + '\n')); return true; }
      case 'uniq': { const t = textIn('uniq'); if (t == null) return false; const L = lines(t), res = []; L.forEach((l) => { if (res.length && res[res.length - 1][0] === l) res[res.length - 1][1]++; else res.push([l, 1]); }); res.forEach((r) => out((/c/.test(fl) ? String(r[1]).padStart(7) + ' ' : '') + r[0] + '\n')); return true; }
      case 'find': {
        const start = A[0] && A[0] !== '-name' ? A[0] : '.';
        const ni = args.indexOf('-name'), pat = ni >= 0 ? args[ni + 1] : null, re = pat ? globRe(pat) : null;
        const root = sh.get(sh.abs(start)); if (!root) return err('find: \'' + start + '\': No such file or directory');
        const walk = (n, path, name) => { if (!re || re.test(name)) out(path + '\n'); if (n.t === 'd') Object.keys(n.kids).sort().forEach((k) => walk(n.kids[k], path + '/' + k, k)); };
        walk(root, start.replace(/\/$/, ''), start);
        return true;
      }
      case 'tree': {
        const root = sh.get(sh.abs(A[0] || '.')); if (!root || root.t !== 'd') return err('tree: not a directory');
        out((A[0] || '.') + '\n'); let nd = 0, nf = 0;
        const walk = (n, pre) => { const ks = Object.keys(n.kids).filter((k) => k[0] !== '.').sort(); ks.forEach((k, i) => { const last = i === ks.length - 1, c = n.kids[k]; out(pre + (last ? '└── ' : '├── ') + (direct && c.t === 'd' ? '\u0001' + k + '\u0002' : k) + '\n'); if (c.t === 'd') { nd++; walk(c, pre + (last ? '    ' : '│   ')); } else nf++; }); };
        walk(root, ''); out('\n' + nd + ' directories, ' + nf + ' files\n'); return true;
      }
      case 'chmod': {
        if (A.length < 2) return err('usage: chmod +x file  or  chmod 755 file');
        const mode = A[0];
        for (const f of A.slice(1)) {
          const n = sh.get(sh.abs(f)); if (!n) return err('chmod: cannot access \'' + f + '\': No such file or directory');
          if (/^[0-7]{3}$/.test(mode)) n.mode = mode.split('').map((d) => { d = +d; return (d & 4 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 1 ? 'x' : '-'); }).join('');
          else if (/^[ugoa]*[+-][rwx]+$/.test(mode)) { const add = mode.indexOf('+') >= 0, bits = mode.split(/[+-]/)[1], m = n.mode.split(''); for (let k = 0; k < 9; k++) { const b = 'rwx'[k % 3]; if (bits.indexOf(b) >= 0) m[k] = add ? b : '-'; } n.mode = m.join(''); }
          else return err('chmod: invalid mode: \'' + mode + '\'');
        }
        return true;
      }
      case 'file': { const n = A[0] && sh.get(sh.abs(A[0])); if (!n) return err('file: cannot open \'' + (A[0] || '') + '\''); const k = A[0]; out(k + ': ' + (n.t === 'd' ? 'directory' : /\.py$/.test(k) ? 'Python script, ASCII text' : /\.sh$/.test(k) ? 'shell script, ASCII text' : /\.(jpg|png)$/.test(k) ? 'image data' : /\.html?$/.test(k) ? 'HTML document, ASCII text' : /\.csv$/.test(k) ? 'CSV text' : 'ASCII text') + '\n'); return true; }
      case 'python3': case 'python': case 'node': {
        if (!A[0]) return err(cmd + ': interactive mode is not available here; give a file, e.g. ' + cmd + (cmd === 'node' ? ' app.js' : ' hello.py'));
        const src = sh.read(A[0], cmd); if (src == null) return false;
        if (!PB.runCode) return err(cmd + ': not available');
        const r = await PB.runCode(cmd === 'node' ? 'javascript' : 'python', src, input || '', { limit: 10, onStatus: (s) => sh.print(null, 'status', s) });
        sh.print(null, 'status', '');
        if (r.out) out(r.out);
        if (r.err) sh.print(r.err, 'err');
        return r.verdict === 'ok';
      }
      default: {
        if (/^(\.\/|\/|~\/)/.test(cmd)) {
          const p = sh.abs(cmd), n = sh.get(p);
          if (!n) return err('bash: ' + cmd + ': No such file or directory');
          if (n.t === 'd') return err('bash: ' + cmd + ': Is a directory');
          if (n.mode[2] !== 'x') return err('bash: ' + cmd + ': Permission denied (hint: chmod +x ' + cmd.replace(/^\.\//, '') + ')');
          if (/\.py$/.test(cmd) || /^#!.*python/.test(n.txt)) return sh.exec('python3', [cmd], input, ev, out, direct);
          ev.ranScript = cmd.replace(/^.*\//, '');
          for (const l of lines(n.txt)) { if (!l.trim() || /^\s*#/.test(l)) continue; await sh.run(l); }
          return true;
        }
        if (cmd === 'sudo') return err('student is not in the sudoers file. This incident will be reported. (Just kidding: there is no admin here.)');
        if (cmd === 'cls') return err('cls is the Windows command; on Linux and macOS it is clear');
        if (cmd === 'dir') return err('dir is the Windows command; here use ls');
        return err(cmd + ': command not found (type help)');
      }
    }
  };

  /* ---------- UI ---------- */
  PB.mountTerminal = function (holder, opts) {
    const h = PB.h, s = PB.S;
    s.term = s.term || {};
    s.term.done = s.term.done || {};
    const box = h('div', { class: 'term', role: 'region', 'aria-label': 'Practice terminal' });
    const outEl = h('div', { class: 'term-out', 'aria-live': 'polite' });
    const prompt = h('span', { class: 'term-prompt' });
    const inp = h('input', { class: 'term-in', type: 'text', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', 'aria-label': 'Command' });
    const line = h('div', { class: 'term-line' }, [prompt, inp]);
    const statusEl = h('div', { class: 'term-status' });
    box.append(outEl, line, statusEl);
    const side = opts && opts.missions ? h('aside', { class: 'term-missions' }) : null;
    holder.appendChild(h('div', { class: 'term-wrap' + (side ? ' with-missions' : '') }, [box, side]));
    const fmt = (t) => PB.escHTML(t).replace(/\u0001([^\u0002]*)\u0002/g, '<span class="term-dir">$1</span>').replace(/\u0003([^\u0002]*)\u0002/g, '<span class="term-exe">$1</span>').replace(/\u0004([^\u0002]*)\u0002/g, '<mark>$1</mark>');
    function print(t, k, extra) {
      if (k === 'clear') { outEl.innerHTML = ''; return; }
      if (k === 'missions') { if (side) side.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); else print('Missions are in the Code lab: #code → Terminal.\n'); return; }
      if (k === 'status') { statusEl.textContent = extra || ''; return; }
      const sp = document.createElement('span');
      if (k === 'err') { sp.className = 'term-err'; sp.textContent = t; } else sp.innerHTML = fmt(t);
      outEl.appendChild(sp);
      box.scrollTop = box.scrollHeight;
    }
    function renderMissions() {
      if (!side) return;
      side.innerHTML = '';
      const n = MISSIONS.filter((m, i) => s.term.done[i]).length;
      side.appendChild(h('div', { class: 'eyebrow', text: 'Missions · ' + n + ' / ' + MISSIONS.length }));
      const ol = h('ol');
      const next = MISSIONS.findIndex((m, i) => !s.term.done[i]);
      MISSIONS.forEach((m, i) => {
        const li = h('li', { class: s.term.done[i] ? 'done' : i === next ? 'next' : '' }, [h('span', { text: m.t })]);
        if (i === next) li.appendChild(h('button', { class: 'btn ghost small', type: 'button', text: 'Show me', onclick: (e) => { e.target.replaceWith(h('code', { text: m.hint })); } }));
        ol.appendChild(li);
      });
      side.appendChild(ol);
      if (n === MISSIONS.length) side.appendChild(h('p', { class: 'term-win', text: '🎉 All missions done. You can drive a terminal!' }));
    }
    const sh = new Shell(s.term, print, (ev, shell) => {
      if (!side) return;
      let changed = false;
      MISSIONS.forEach((m, i) => {
        if (s.term.done[i]) return;
        const nxt = MISSIONS.findIndex((x, j) => !s.term.done[j]);
        if (i !== nxt) return;
        try { if (m.ok(ev, shell)) { s.term.done[i] = 1; changed = true; PB.addXP(3, 'Terminal mission'); if (PB.toast) PB.toast('<span class="tx">✔ Mission</span> ' + PB.escHTML(m.t), 'badge-t'); } } catch (e) { /* ignore */ }
      });
      if (changed) renderMissions();
    });
    const setPrompt = () => { prompt.innerHTML = '<span class="term-user">student@scibook</span>:<span class="term-path">' + PB.escHTML(sh.short(sh.cwd)) + '</span>$ '; };
    setPrompt();
    print('Scibook practice terminal. Nothing here touches your real computer. Type help, or try ls.\n');
    let hi = -1, busy = false;
    inp.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        if (busy) return;
        const v = inp.value; inp.value = ''; hi = -1;
        print(''); outEl.lastChild.innerHTML = prompt.innerHTML + PB.escHTML(v) + '\n';
        busy = true; inp.disabled = true;
        try { await sh.run(v); } catch (err) { print('error: ' + err.message + '\n', 'err'); }
        busy = false; inp.disabled = false; inp.focus();
        setPrompt(); PB.save();
        box.scrollTop = box.scrollHeight;
      } else if (e.key === 'ArrowUp') { e.preventDefault(); if (!sh.hist.length) return; hi = hi < 0 ? sh.hist.length - 1 : Math.max(0, hi - 1); inp.value = sh.hist[hi]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (hi < 0) return; hi++; if (hi >= sh.hist.length) { hi = -1; inp.value = ''; } else inp.value = sh.hist[hi]; }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const v = inp.value, m = /(\S*)$/.exec(v), word = m[1];
        const slash = word.lastIndexOf('/'), dirPart = slash >= 0 ? word.slice(0, slash + 1) : '', base = word.slice(slash + 1);
        const isCmd = !/\s/.test(v.trim()) && !dirPart;
        let cands;
        if (isCmd) cands = Object.keys(HELP).concat(['help', 'missions']).filter((k) => k.indexOf(base) === 0);
        else { const d = sh.get(sh.abs(dirPart || '.')); cands = d && d.t === 'd' ? Object.keys(d.kids).filter((k) => k.indexOf(base) === 0 && (base[0] === '.' || k[0] !== '.')).map((k) => k + (d.kids[k].t === 'd' ? '/' : '')) : []; }
        if (cands.length === 1) inp.value = v.slice(0, v.length - base.length) + cands[0] + (isCmd || !/\/$/.test(cands[0]) ? ' ' : '');
        else if (cands.length > 1) {
          let pre = cands[0]; cands.forEach((c) => { while (c.indexOf(pre) !== 0) pre = pre.slice(0, -1); });
          if (pre.length > base.length) inp.value = v.slice(0, v.length - base.length) + pre;
          else { print(''); outEl.lastChild.innerHTML = prompt.innerHTML + PB.escHTML(v) + '\n'; print(cands.join('  ') + '\n'); }
        }
      } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); outEl.innerHTML = ''; }
    });
    box.addEventListener('click', () => { if (!window.getSelection().toString()) inp.focus(); });
    renderMissions();
    return { run: (l) => sh.run(l), shell: sh };
  };
  // Lab: { sim: 'terminal', params: { missions: true } }
  PB.sims.terminal = function (api, P) {
    api.stage.classList.add('code-stage');
    api.controls.remove();
    PB.mountTerminal(api.stage, P || {});
  };
})();
