/* Scibook computing labs: bits and text encoding, the journey of a web request, packets on a network,
   an HTTP playground, sorting, binary search, path finding on a grid, dynamic-programming tables,
   recursion trees, the JavaScript event loop, memory diagrams (stack, heap, references and pointers) and a heap. */
(function () {
  'use strict';
  const PB = window.PB;
  const esc = (s) => PB.escHTML(s);
  const H = (...a) => PB.h(...a);

  /* ======================= Bits and bytes ======================= */
  PB.sims.bits = function (api, P) {
    api.stage.classList.add('dom-stage');
    let W = P.width || 8, signed = !!P.signed, val = P.value != null ? P.value : 77;
    const bitsRow = H('div', { class: 'bits-row' }), nums = H('div', { class: 'bits-nums' });
    const numIn = H('input', { type: 'number', class: 'bits-in', 'aria-label': 'Number' });
    const txtIn = H('input', { type: 'text', class: 'bits-in wide', value: P.text || 'Hi €😀', 'aria-label': 'Text to encode' });
    const bytes = H('div', { class: 'bits-bytes' });
    api.stage.append(
      H('div', { class: 'bits-card' }, [H('div', { class: 'eyebrow', text: 'A number in binary: click a bit to flip it' }), H('label', { class: 'bits-lab' }, ['Decimal ', numIn]), bitsRow, nums]),
      H('div', { class: 'bits-card' }, [H('div', { class: 'eyebrow', text: 'Text as bytes (UTF-8)' }), txtIn, bytes])
    );
    api.select({ id: 'w', label: 'Width', value: String(W), options: [['4', '4 bits'], ['8', '8 bits (a byte)'], ['16', '16 bits'], ['32', '32 bits']], onChange: (v) => { W = +v; clamp(); draw(); } });
    api.check({ id: 'signed', label: 'Signed (two’s complement)', value: signed, onChange: (v) => { signed = v; clamp(); draw(); } });
    api.buttons([{ label: '+1', onClick: () => { val++; wrap(); draw(); } }, { label: '−1', onClick: () => { val--; wrap(); draw(); } }, { label: '× 2 (shift left)', onClick: () => { val *= 2; wrap(); draw(); } }, { label: '÷ 2 (shift right)', onClick: () => { val = Math.floor(val / 2); draw(); } }]);
    const out = api.readout();
    const max = () => (signed ? Math.pow(2, W - 1) - 1 : Math.pow(2, W) - 1), min = () => (signed ? -Math.pow(2, W - 1) : 0);
    const uns = () => ((val % Math.pow(2, W)) + Math.pow(2, W)) % Math.pow(2, W);
    function wrap() { const u = uns(); val = signed && u >= Math.pow(2, W - 1) ? u - Math.pow(2, W) : u; }
    function clamp() { wrap(); }
    numIn.addEventListener('input', () => { const x = parseInt(numIn.value, 10); if (!isNaN(x)) { val = x; wrap(); draw(true); } });
    txtIn.addEventListener('input', () => drawText());
    function draw(keepInput) {
      const u = uns();
      if (!keepInput) numIn.value = val;
      numIn.min = min(); numIn.max = max();
      bitsRow.innerHTML = '';
      for (let i = W - 1; i >= 0; i--) {
        const on = Math.floor(u / Math.pow(2, i)) % 2 === 1;
        const place = signed && i === W - 1 ? '−' + Math.pow(2, i) : String(Math.pow(2, i));
        const b = H('button', { type: 'button', class: 'bit' + (on ? ' on' : '') + (i % 4 === 0 && i ? ' gap' : ''), title: 'place value ' + place, 'aria-label': 'bit ' + i + (on ? ' is 1' : ' is 0') }, [H('b', { text: on ? '1' : '0' }), W <= 16 ? H('small', { text: place }) : null]);
        b.addEventListener('click', () => { const nu = on ? u - Math.pow(2, i) : u + Math.pow(2, i); val = nu; wrap(); draw(); });
        bitsRow.appendChild(b);
      }
      const hex = u.toString(16).toUpperCase().padStart(Math.ceil(W / 4), '0');
      nums.innerHTML = '<span>binary <code>' + u.toString(2).padStart(W, '0').replace(/(.{4})(?=.)/g, '$1 ') + '</code></span><span>hex <code>0x' + hex + '</code></span><span>octal <code>0o' + u.toString(8) + '</code></span><span>unsigned <code>' + u + '</code></span>' + (signed ? '<span>signed <code>' + val + '</code></span>' : '');
      out([['range', min() + ' … ' + max()], ['values possible', '2^' + W + ' = ' + Math.pow(2, W).toLocaleString()], ['as ASCII', u >= 32 && u < 127 ? '\'' + String.fromCharCode(u) + '\'' : '—']]);
    }
    function drawText() {
      const t = txtIn.value, enc = new TextEncoder();
      bytes.innerHTML = '';
      let total = 0;
      for (const ch of t) {
        const b = enc.encode(ch); total += b.length;
        const cp = ch.codePointAt(0);
        bytes.appendChild(H('div', { class: 'bits-char' + (b.length > 1 ? ' multi' : '') }, [
          H('b', { text: ch === ' ' ? '␠' : ch }), H('small', { text: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0') + ' · ' + b.length + ' byte' + (b.length > 1 ? 's' : '') }),
          H('code', { text: Array.from(b).map((x) => x.toString(16).toUpperCase().padStart(2, '0')).join(' ') }),
          H('code', { class: 'bin', text: Array.from(b).map((x) => x.toString(2).padStart(8, '0')).join(' ') })
        ]));
      }
      bytes.appendChild(H('p', { class: 'bits-total', text: [...t].length + ' characters → ' + total + ' bytes = ' + total * 8 + ' bits' }));
    }
    draw(); drawText();
  };

  /* ======================= Journey of a web request ======================= */
  PB.sims.journey = function (api, P) {
    api.stage.classList.add('dom-stage');
    let https = true, cached = false, rtt = 80, dnsRtt = 20, step = 0, timer = null, keep = false;
    const svgBox = H('div', { class: 'jr-svg' }), note = H('div', { class: 'jr-note' });
    api.stage.append(svgBox, note);
    const COLS = [['Your browser', 0], ['DNS resolver', 1], ['DNS servers (root, .com, example.com)', 2], ['Web server (93.184.215.14)', 3]];
    function steps() {
      const s = [];
      if (!cached) {
        s.push([0, 1, 'Where is example.com?', 'dns', 'The browser asks a DNS resolver (usually run by your internet provider, or a public one like 1.1.1.1) to turn the name into an IP address.', dnsRtt / 2]);
        s.push([1, 2, 'Root: who handles .com?', 'dns', 'The resolver asks a root server, which only knows who runs each top-level domain such as .com.', 15]);
        s.push([2, 1, 'Ask the .com servers', 'dns', 'The root server points to the .com top-level-domain servers.', 15]);
        s.push([1, 2, '.com: who handles example.com?', 'dns', 'The .com servers know which name servers are authoritative for example.com.', 15]);
        s.push([2, 1, 'Its address is 93.184.215.14', 'dns', 'The authoritative server for example.com answers with an A record: the IP address. It comes with a TTL saying how long it may be cached.', 15]);
        s.push([1, 0, '93.184.215.14', 'dns', 'The resolver passes the address back and caches it, so the next lookup is instant.', dnsRtt / 2]);
      } else s.push([0, 0, 'Cache hit: 93.184.215.14', 'dns', 'The address is already in the browser’s DNS cache, so no lookup is needed.', 0]);
      s.push([0, 3, 'SYN', 'tcp', 'TCP handshake, step 1: the browser asks to open a connection to port ' + (https ? 443 : 80) + ', with a random starting sequence number.', rtt / 2]);
      s.push([3, 0, 'SYN-ACK', 'tcp', 'Step 2: the server agrees and acknowledges.', rtt / 2]);
      s.push([0, 3, 'ACK', 'tcp', 'Step 3: the browser acknowledges. The connection is open: one full round trip has passed.', 0]);
      if (https) {
        s.push([0, 3, 'TLS ClientHello', 'tls', 'TLS 1.3 handshake: the browser offers ciphers and a key share (it sends this together with the ACK).', rtt / 2]);
        s.push([3, 0, 'ServerHello + certificate', 'tls', 'The server sends its key share and its certificate, signed by a certificate authority your browser trusts. Both sides now derive the same secret key.', rtt / 2]);
        s.push([0, 3, 'Finished', 'tls', 'From here on everything is encrypted: eavesdroppers see only scrambled bytes.', 0]);
      }
      s.push([0, 3, 'GET / HTTP/1.1  Host: example.com', 'http', 'The HTTP request: a method (GET), a path (/), and headers such as Host, User-Agent, Accept and cookies.', rtt / 2]);
      s.push([3, 0, '200 OK  (HTML)', 'http', 'The response: a status code (200 = OK), headers like Content-Type: text/html, and the body, the HTML of the page.', rtt / 2 + 10]);
      s.push([0, 3, 'GET /style.css, /app.js', 'http', 'The browser parses the HTML, finds links to CSS, JavaScript and images, and requests them over the same open connection.', rtt / 2]);
      s.push([3, 0, '200 OK  (CSS, JS)', 'http', 'Once they arrive it builds the DOM tree, applies the CSS, runs the JavaScript and paints pixels on the screen.', rtt / 2 + 10]);
      return s;
    }
    function draw() {
      const S = steps(), W = Math.max(520, svgBox.clientWidth || 640), colX = (i) => 70 + i * (W - 140) / 3, rowH = 30, top = 52, Hh = top + S.length * rowH + 20;
      const C = { dns: 'var(--s-astronomy)', tcp: 'var(--accent)', tls: 'var(--good)', http: 'var(--points)' };
      let s = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" width="100%" role="img" aria-label="Sequence diagram of a web request">';
      COLS.forEach((c, i) => { s += '<line x1="' + colX(i) + '" y1="' + (top - 8) + '" x2="' + colX(i) + '" y2="' + (Hh - 8) + '" stroke="var(--line)" stroke-width="2"/><text x="' + colX(i) + '" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">' + esc(c[0].split(' (')[0]) + '</text>' + (c[0].indexOf('(') > 0 ? '<text x="' + colX(i) + '" y="34" text-anchor="middle" font-size="10" fill="var(--ink-3)">(' + esc(c[0].split(' (')[1]) + '</text>' : ''); });
      let t = 0;
      S.forEach((m, k) => {
        if (k >= step) return;
        const y = top + k * rowH + 12, x1 = colX(m[0]), x2 = colX(m[1]), col = C[m[3]], cur = k === step - 1;
        t += m[5];
        if (m[0] === m[1]) s += '<circle cx="' + x1 + '" cy="' + y + '" r="6" fill="' + col + '"/><text x="' + (x1 + 12) + '" y="' + (y + 4) + '" font-size="12" fill="var(--ink)">' + esc(m[2]) + '</text>';
        else {
          const dir = x2 > x1 ? 1 : -1;
          s += '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - dir * 7) + '" y2="' + y + '" stroke="' + col + '" stroke-width="' + (cur ? 3.5 : 2) + '"/><path d="M' + x2 + ' ' + y + ' l' + (-dir * 9) + ' -5 v10 z" fill="' + col + '"/>';
          s += '<text x="' + (x1 + x2) / 2 + '" y="' + (y - 5) + '" text-anchor="middle" font-size="11.5" font-weight="' + (cur ? 700 : 500) + '" fill="var(--ink)" paint-order="stroke" stroke="var(--surface)" stroke-width="4">' + esc(m[2]) + '</text>';
        }
        s += '<text x="6" y="' + (y + 4) + '" font-size="10" fill="var(--ink-3)">' + Math.round(t) + ' ms</text>';
      });
      s += '</svg>';
      svgBox.innerHTML = s;
      const cur = S[step - 1];
      note.innerHTML = cur ? '<span class="jr-tag jr-' + cur[3] + '">' + cur[3].toUpperCase() + '</span> ' + esc(cur[4]) : 'Press <b>Step</b> or <b>Play</b> to follow a request for <code>https://example.com/</code> from your browser to the server and back.';
      let total = 0, ttfb = 0; S.forEach((m, k) => { total += m[5]; if (k <= S.findIndex((x) => /200 OK/.test(x[2]))) ttfb += m[5]; });
      out([['step', step + ' / ' + S.length], ['time to first byte', Math.round(ttfb) + ' ms'], ['page + assets', Math.round(total) + ' ms'], ['round trips to the server', String((https ? 3 : 2) + 1)]]);
      if (step >= S.length && timer) { clearInterval(timer); timer = null; }
    }
    api.check({ id: 'https', label: 'HTTPS (TLS encryption)', value: https, onChange: (v) => { https = v; step = 0; draw(); } });
    api.check({ id: 'cached', label: 'Address already cached', value: cached, onChange: (v) => { cached = v; step = 0; draw(); } });
    api.slider({ id: 'rtt', label: 'Round trip to server', min: 5, max: 300, step: 5, value: rtt, format: (v) => v + ' ms', onChange: (v) => { rtt = v; draw(); } });
    api.buttons([{ label: 'Step', primary: true, onClick: () => { if (step < steps().length) step++; draw(); } }, { label: 'Play', onClick: () => { if (timer) clearInterval(timer); if (step >= steps().length) step = 0; timer = setInterval(() => { step++; draw(); }, 900); } }, { label: 'Reset', onClick: () => { if (timer) clearInterval(timer); timer = null; step = 0; draw(); } }]);
    const out = api.readout();
    api.onDestroy(() => { if (timer) clearInterval(timer); });
    const ro = new ResizeObserver(() => draw()); ro.observe(svgBox); api.onDestroy(() => ro.disconnect());
    draw();
    void keep;
  };

  /* ======================= Packets on a network ======================= */
  PB.sims.packets = function (api, P) {
    const cv = api.canvas(0.55, 300), ctx = cv.ctx;
    const N = [[0.06, 0.5, 'You'], [0.25, 0.2, 'R1'], [0.25, 0.8, 'R2'], [0.47, 0.5, 'R3'], [0.5, 0.12, 'R4'], [0.52, 0.88, 'R5'], [0.73, 0.3, 'R6'], [0.73, 0.72, 'R7'], [0.94, 0.5, 'Server']];
    const E = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [2, 5], [3, 6], [3, 7], [4, 6], [5, 7], [6, 8], [7, 8], [6, 7]];
    const cut = {};
    const MSG = P.message || 'HELLO, WORLD!';
    const CH = 3, chunks = []; for (let i = 0; i < MSG.length; i += CH) chunks.push(MSG.slice(i, i + CH));
    let loss = 0.1, speed = 1, packets = [], got = {}, sentAt = {}, t = 0, running = false, sent = 0, lost = 0, resent = 0;
    const out = api.readout();
    api.slider({ id: 'loss', label: 'Packet loss', min: 0, max: 0.5, step: 0.05, value: loss, format: (v) => Math.round(v * 100) + '%', onChange: (v) => { loss = v; } });
    api.slider({ id: 'speed', label: 'Speed', min: 0.25, max: 3, step: 0.25, value: speed, format: (v) => v + '×', onChange: (v) => { speed = v; } });
    api.buttons([{ label: 'Send message', primary: true, onClick: start }, { label: 'Repair all links', onClick: () => { Object.keys(cut).forEach((k) => delete cut[k]); } }]);
    function adj() { const a = N.map(() => []); E.forEach((e, i) => { if (cut[i]) return; a[e[0]].push([e[1], i]); a[e[1]].push([e[0], i]); }); return a; }
    function route(seed) {
      // Shortest path with a little random jitter per packet, so packets may take different routes.
      const a = adj(), d = N.map(() => Infinity), prev = N.map(() => -1), done = {};
      const L = (i) => { const e = E[i], dx = N[e[0]][0] - N[e[1]][0], dy = N[e[0]][1] - N[e[1]][1]; return Math.hypot(dx * 1.8, dy) * (1 + 0.6 * Math.abs(Math.sin(seed * 12.9898 + i * 78.233))); };
      d[0] = 0;
      for (;;) { let u = -1; d.forEach((x, i) => { if (!done[i] && x < Infinity && (u < 0 || x < d[u])) u = i; }); if (u < 0) break; done[u] = 1; a[u].forEach(([v, ei]) => { if (d[u] + L(ei) < d[v]) { d[v] = d[u] + L(ei); prev[v] = u; } }); }
      if (prev[8] < 0) return null;
      const p = [8]; while (p[0] !== 0) p.unshift(prev[p[0]]);
      return p;
    }
    function launch(seq) { const r = route(Math.random() * 100 + seq); sent++; sentAt[seq] = t; if (!r) { packets.push({ seq: seq, path: null, k: 0, f: 0, dead: true, life: 1 }); lost++; return; } packets.push({ seq: seq, path: r, k: 0, f: 0, drop: Math.random() < loss ? 1 + Math.floor(Math.random() * (r.length - 2)) : -1 }); }
    function start() { packets = []; got = {}; sentAt = {}; t = 0; sent = 0; lost = 0; resent = 0; running = true; chunks.forEach((c, i) => setTimeout(() => launch(i), i * 180 / speed)); }
    cv.el.addEventListener('pointerdown', (e) => {
      const r = cv.el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      let best = -1, bd = 14;
      E.forEach((ed, i) => { const a = N[ed[0]], b = N[ed[1]], ax = a[0] * cv.w, ay = a[1] * cv.h, bx = b[0] * cv.w, by = b[1] * cv.h; const L2 = (bx - ax) ** 2 + (by - ay) ** 2, u = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / L2)); const d = Math.hypot(ax + u * (bx - ax) - x, ay + u * (by - ay) - y); if (d < bd) { bd = d; best = i; } });
      if (best >= 0) { if (cut[best]) delete cut[best]; else cut[best] = 1; }
    });
    api.loop((dt) => {
      t += dt * speed;
      const Cc = api.colors();
      packets.forEach((p) => {
        if (p.dead || p.arrived) { if (p.dead) p.life -= dt; return; }
        p.f += dt * speed * 1.6;
        if (p.f >= 1) { p.f = 0; p.k++; if (p.k === p.drop) { p.dead = true; p.life = 1; lost++; } else if (p.k >= p.path.length - 1) { p.arrived = true; got[p.seq] = 1; } }
      });
      // Retransmit: a packet not acknowledged within a timeout is sent again.
      if (running) chunks.forEach((c, i) => { if (!got[i] && t - sentAt[i] > 3.2 && !packets.some((p) => p.seq === i && !p.dead && !p.arrived)) { resent++; launch(i); } });
      if (running && chunks.every((c, i) => got[i])) running = false;
      packets = packets.filter((p) => !(p.dead && p.life <= 0));
      // Draw.
      ctx.clearRect(0, 0, cv.w, cv.h);
      E.forEach((e, i) => { const a = N[e[0]], b = N[e[1]]; ctx.strokeStyle = cut[i] ? Cc.bad : Cc.line; ctx.lineWidth = cut[i] ? 2 : 3; ctx.setLineDash(cut[i] ? [5, 5] : []); ctx.beginPath(); ctx.moveTo(a[0] * cv.w, a[1] * cv.h); ctx.lineTo(b[0] * cv.w, b[1] * cv.h); ctx.stroke(); if (cut[i]) { const mx = (a[0] + b[0]) / 2 * cv.w, my = (a[1] + b[1]) / 2 * cv.h; ctx.fillStyle = Cc.bad; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✂', mx, my + 5); } });
      ctx.setLineDash([]);
      N.forEach((n, i) => { const x = n[0] * cv.w, y = n[1] * cv.h, big = i === 0 || i === 8; ctx.fillStyle = big ? Cc.accent : Cc.surface2; ctx.strokeStyle = big ? Cc.accent : Cc.ink3; ctx.lineWidth = 2; ctx.beginPath(); if (big) ctx.roundRect(x - 26, y - 16, 52, 32, 6); else ctx.arc(x, y, 14, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = big ? '#fff' : Cc.ink; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(n[2], x, y + 4); });
      packets.forEach((p) => {
        if (!p.path) return;
        const a = N[p.path[p.k]], b = N[p.path[Math.min(p.k + 1, p.path.length - 1)]], f = p.arrived ? 1 : p.f;
        const x = (a[0] + (b[0] - a[0]) * f) * cv.w, y = (a[1] + (b[1] - a[1]) * f) * cv.h;
        if (p.arrived) return;
        ctx.globalAlpha = p.dead ? Math.max(0, p.life) : 1;
        ctx.fillStyle = p.dead ? Cc.bad : Cc.points; ctx.beginPath(); ctx.roundRect(x - 13, y - 9, 26, 18, 4); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.fillText(p.dead ? '✗' : '#' + p.seq, x, y + 4);
        ctx.globalAlpha = 1;
      });
      // Receiver buffer.
      const bx = cv.w * 0.5 - chunks.length * 17, by = cv.h - 4;
      ctx.textAlign = 'center';
      chunks.forEach((c, i) => { ctx.fillStyle = got[i] ? Cc.good : Cc.surface2; ctx.fillRect(bx + i * 34, by - 22, 32, 20); ctx.fillStyle = got[i] ? '#fff' : Cc.ink3; ctx.font = '600 11px monospace'; ctx.fillText(got[i] ? c.replace(/ /g, '·') : '#' + i, bx + i * 34 + 16, by - 8); });
      ctx.fillStyle = Cc.ink2; ctx.font = '11px sans-serif'; ctx.fillText('Server reassembles packets by sequence number (click a link to cut it)', cv.w / 2, by - 28);
      const order = Object.keys(got).length;
      out([['packets sent', String(sent)], ['lost', String(lost)], ['resent after timeout', String(resent)], ['received', order + ' / ' + chunks.length]]);
    });
  };

  /* ======================= HTTP playground ======================= */
  PB.sims.http = function (api, P) {
    api.stage.classList.add('dom-stage');
    const users = [{ id: 1, name: 'Ada' }, { id: 2, name: 'Alan' }];
    let cookie = null;
    const method = H('select', { class: 'http-m', 'aria-label': 'Method' }, ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'].map((m) => H('option', { value: m, text: m })));
    const path = H('input', { class: 'http-path', value: '/api/users', 'aria-label': 'Path', spellcheck: 'false' });
    const hdrs = H('textarea', { class: 'http-h', rows: 2, spellcheck: 'false', 'aria-label': 'Extra request headers' });
    const body = H('textarea', { class: 'http-b', rows: 2, spellcheck: 'false', placeholder: '{"name": "Grace"}', 'aria-label': 'Request body' });
    const send = H('button', { class: 'btn primary small', type: 'button', text: 'Send request' });
    const reqPre = H('pre', { class: 'http-raw' }), resPre = H('pre', { class: 'http-raw' }), why = H('p', { class: 'http-why' });
    const quick = H('div', { class: 'http-quick' });
    [['GET', '/'], ['GET', '/api/users'], ['GET', '/api/users/2'], ['GET', '/api/users/9'], ['POST', '/api/users'], ['DELETE', '/api/users/1'], ['GET', '/old-page'], ['GET', '/secret'], ['POST', '/login'], ['GET', '/crash']].forEach(([m, p]) => quick.appendChild(H('button', { class: 'chip', type: 'button', text: m + ' ' + p, onclick: () => { method.value = m; path.value = p; if (m === 'POST' && p === '/api/users' && !body.value) body.value = '{"name": "Grace"}'; go(); } })));
    api.stage.append(H('div', { class: 'http-form' }, [method, path, send]), quick,
      H('details', { class: 'http-more' }, [H('summary', { text: 'Headers and body' }), H('label', { text: 'Extra headers (Name: value per line)' }), hdrs, H('label', { text: 'Body' }), body]),
      H('div', { class: 'http-pair' }, [H('div', {}, [H('div', { class: 'eyebrow', text: 'Request (what your browser sends)' }), reqPre]), H('div', {}, [H('div', { class: 'eyebrow', text: 'Response (what the server sends back)' }), resPre])]), why);
    const reasons = { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 400: 'Bad Request', 401: 'Unauthorized', 404: 'Not Found', 405: 'Method Not Allowed', 500: 'Internal Server Error' };
    function server(m, p, H2, b) {
      const json = (code, obj, extra, note) => ({ code: code, headers: Object.assign({ 'Content-Type': 'application/json' }, extra || {}), body: obj === undefined ? '' : JSON.stringify(obj, null, 2), note: note });
      if (p === '/' || p === '/index.html') return m === 'GET' || m === 'HEAD' ? { code: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'max-age=60' }, body: '<!doctype html>\n<html><head><title>Demo</title></head>\n<body><h1>Hello from the server</h1></body></html>', note: 'A web page: Content-Type text/html tells the browser to render it. Cache-Control lets it reuse the page for 60 s.' } : json(405, { error: 'Only GET here' }, { Allow: 'GET, HEAD' }, '405: this path exists, but not for that method. The Allow header lists what works.');
      if (p === '/old-page') return { code: 301, headers: { Location: '/' }, body: '', note: '301: a permanent redirect. The browser follows the Location header automatically and requests / instead.' };
      if (p === '/crash') return json(500, { error: 'Something broke on our side' }, null, '5xx codes mean the server failed. 4xx codes mean the request was wrong.');
      if (p === '/login') { if (m !== 'POST') return json(405, { error: 'Use POST to log in' }, { Allow: 'POST' }, 'Logging in changes state, so it uses POST.'); cookie = 'session=' + Math.random().toString(36).slice(2, 10); return json(200, { ok: true }, { 'Set-Cookie': cookie + '; HttpOnly; Secure' }, 'Set-Cookie asks the browser to store a cookie and send it back with every later request: that is how a stateless protocol remembers you. Now try GET /secret.'); }
      if (p === '/secret') { const has = /cookie:\s*session=/i.test(H2) || (cookie && !/cookie:/i.test(H2)); return has ? json(200, { secret: 'The cake is in the fridge.' }, null, 'The browser sent the session cookie automatically, so the server knows who you are.') : json(401, { error: 'Log in first' }, { 'WWW-Authenticate': 'Cookie' }, '401: you must identify yourself first. POST /login to get a session cookie.'); }
      let mm = /^\/api\/users\/?$/.exec(p);
      if (mm) {
        if (m === 'GET' || m === 'HEAD') return json(200, users, null, 'A JSON API: data, not a page. Programs (your JavaScript, apps) read it.');
        if (m === 'POST') { let o; try { o = JSON.parse(b || ''); } catch (e) { return json(400, { error: 'Body must be JSON like {"name": "Grace"}' }, null, '400: the server could not understand the request body.'); } if (!o || !o.name) return json(400, { error: 'name is required' }, null, '400: a required field is missing.'); const u = { id: users.reduce((a, x) => Math.max(a, x.id), 0) + 1, name: String(o.name) }; users.push(u); return json(201, u, { Location: '/api/users/' + u.id }, '201 Created: POST added a new user. GET /api/users again to see it.'); }
        return json(405, { error: 'Not allowed' }, { Allow: 'GET, POST' }, '405 Method Not Allowed.');
      }
      mm = /^\/api\/users\/(\d+)$/.exec(p);
      if (mm) {
        const i = users.findIndex((u) => u.id === +mm[1]);
        if (i < 0) return json(404, { error: 'No user ' + mm[1] }, null, '404: there is nothing at this address.');
        if (m === 'GET' || m === 'HEAD') return json(200, users[i], null, 'One resource, addressed by its id in the path.');
        if (m === 'DELETE') { users.splice(i, 1); return { code: 204, headers: {}, body: '', note: '204 No Content: deleted, nothing to send back.' }; }
        if (m === 'PUT') { try { const o = JSON.parse(b || '{}'); users[i].name = o.name || users[i].name; } catch (e) { return json(400, { error: 'Body must be JSON' }); } return json(200, users[i], null, 'PUT replaces a resource.'); }
      }
      return { code: 404, headers: { 'Content-Type': 'text/html' }, body: '<h1>404 Not Found</h1>', note: '404: no such path on this server.' };
    }
    function go() {
      const m = method.value, p = (path.value.trim() || '/').replace(/^([^/])/, '/$1'), b = m === 'POST' || m === 'PUT' ? body.value : '';
      const extra = hdrs.value.trim();
      const ck = cookie && !/cookie:/i.test(extra) ? 'Cookie: ' + cookie + '\n' : '';
      const req = m + ' ' + p + ' HTTP/1.1\nHost: demo.scibook.test\nUser-Agent: Mozilla/5.0 (your browser)\nAccept: */*\n' + ck + (extra ? extra + '\n' : '') + (b ? 'Content-Type: application/json\nContent-Length: ' + new Blob([b]).size + '\n' : '') + '\n' + b;
      reqPre.textContent = req;
      const r = server(m, p, extra + '\n' + ck, b);
      const bodyTxt = m === 'HEAD' ? '' : r.body;
      const hd = Object.assign({ Date: new Date().toUTCString(), Server: 'demo' }, r.headers, bodyTxt ? { 'Content-Length': new Blob([bodyTxt]).size } : {});
      resPre.innerHTML = '<span class="http-code c' + String(r.code)[0] + '">HTTP/1.1 ' + r.code + ' ' + reasons[r.code] + '</span>\n' + Object.keys(hd).map((k) => esc(k + ': ' + hd[k])).join('\n') + '\n\n' + esc(bodyTxt);
      why.innerHTML = '<b>' + r.code + ' ' + reasons[r.code] + '.</b> ' + esc(r.note || '') + (m === 'HEAD' ? ' HEAD returns only the headers, never a body.' : '');
      if (r.code === 301) setTimeout(() => { why.innerHTML += ' <button class="btn small" type="button">Follow the redirect</button>'; why.querySelector('button').onclick = () => { path.value = r.headers.Location; method.value = 'GET'; go(); }; }, 0);
      log([['last status', r.code + ' ' + reasons[r.code]], ['users on the server', String(users.length)], ['session cookie', cookie ? 'stored' : 'none']]);
    }
    send.addEventListener('click', go);
    path.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    api.controls.appendChild(H('div', { class: 'http-legend', html: '<b>Status codes</b><br>2xx success<br>3xx redirect<br>4xx your mistake<br>5xx server’s mistake' }));
    const log = api.readout();
    go();
  };

  /* ======================= Sorting ======================= */
  function* bubble(a) { const n = a.length; for (let i = 0; i < n; i++) { let sw = false; for (let j = 0; j < n - 1 - i; j++) { yield ['cmp', j, j + 1]; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; sw = true; yield ['swap', j, j + 1]; } } yield ['done', n - 1 - i]; if (!sw) break; } }
  function* insertion(a) { for (let i = 1; i < a.length; i++) { let j = i; while (j > 0) { yield ['cmp', j - 1, j]; if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; yield ['swap', j - 1, j]; j--; } else break; } } }
  function* selection(a) { const n = a.length; for (let i = 0; i < n - 1; i++) { let m = i; for (let j = i + 1; j < n; j++) { yield ['cmp', m, j]; if (a[j] < a[m]) m = j; } if (m !== i) { [a[i], a[m]] = [a[m], a[i]]; yield ['swap', i, m]; } yield ['done', i]; } }
  function* merge(a) {
    function* ms(lo, hi) { if (hi - lo < 2) return; const mid = (lo + hi) >> 1; yield* ms(lo, mid); yield* ms(mid, hi); const t = []; let i = lo, j = mid; while (i < mid && j < hi) { yield ['cmp', i, j]; t.push(a[i] <= a[j] ? a[i++] : a[j++]); } while (i < mid) t.push(a[i++]); while (j < hi) t.push(a[j++]); for (let k = 0; k < t.length; k++) { a[lo + k] = t[k]; yield ['set', lo + k]; } }
    yield* ms(0, a.length);
  }
  function* quick(a) {
    function* qs(lo, hi) { if (lo >= hi) { if (lo === hi) yield ['done', lo]; return; } const p = a[hi]; let i = lo; for (let j = lo; j < hi; j++) { yield ['cmp', j, hi]; if (a[j] < p) { [a[i], a[j]] = [a[j], a[i]]; yield ['swap', i, j]; i++; } } [a[i], a[hi]] = [a[hi], a[i]]; yield ['swap', i, hi]; yield ['done', i]; yield* qs(lo, i - 1); yield* qs(i + 1, hi); }
    yield* qs(0, a.length - 1);
  }
  function* counting(a) { const mx = Math.max(...a), c = new Array(mx + 1).fill(0); for (let i = 0; i < a.length; i++) { c[a[i]]++; yield ['read', i]; } let k = 0; for (let v = 0; v <= mx; v++) for (let r = 0; r < c[v]; r++) { a[k] = v; yield ['set', k++]; } }
  const SORTS = { bubble: ['Bubble sort', bubble, 'n²'], insertion: ['Insertion sort', insertion, 'n²'], selection: ['Selection sort', selection, 'n²'], merge: ['Merge sort', merge, 'n log n'], quick: ['Quicksort', quick, 'n log n (average)'], counting: ['Counting sort', counting, 'n + range'] };
  PB.sims.sortviz = function (api, P) {
    const cv = api.canvas(0.45, 240), ctx = cv.ctx;
    let alg = P.alg || 'bubble', n = P.n || 30, order = 'random', speed = 20, a = [], gen = null, hi = [], done = {}, cmp = 0, wr = 0, running = false, acc = 0, kind = '';
    function fresh() { a = []; for (let i = 0; i < n; i++) a.push(1 + Math.floor((i + 1) * 99 / n)); if (order === 'random') for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } else if (order === 'reversed') a.reverse(); else if (order === 'nearly') for (let k = 0; k < Math.max(1, n / 10); k++) { const i = Math.floor(Math.random() * (n - 1)); [a[i], a[i + 1]] = [a[i + 1], a[i]]; } gen = SORTS[alg][1](a); hi = []; done = {}; cmp = 0; wr = 0; running = false; draw(); }
    function stepOnce() { if (!gen) return false; const r = gen.next(); if (r.done) { gen = null; hi = []; for (let i = 0; i < n; i++) done[i] = 1; running = false; return false; } const [k, i, j] = r.value; kind = k; if (k === 'cmp') { cmp++; hi = [i, j]; } else if (k === 'swap') { wr += 2; hi = [i, j]; } else if (k === 'set') { wr++; hi = [i]; } else if (k === 'read') hi = [i]; else if (k === 'done') done[i] = 1; return true; }
    api.select({ id: 'alg', label: 'Algorithm', value: alg, options: Object.keys(SORTS).map((k) => [k, SORTS[k][0]]), onChange: (v) => { alg = v; fresh(); } });
    api.select({ id: 'order', label: 'Starting order', value: order, options: [['random', 'Random'], ['nearly', 'Nearly sorted'], ['reversed', 'Reversed']], onChange: (v) => { order = v; fresh(); } });
    api.slider({ id: 'n', label: 'n (items)', min: 5, max: 120, step: 1, value: n, format: (v) => String(v), onChange: (v) => { n = v; fresh(); } });
    api.slider({ id: 'speed', label: 'Speed', min: 1, max: 400, step: 1, value: speed, format: (v) => v + ' steps/s', onChange: (v) => { speed = v; } });
    api.buttons([{ label: 'Start / pause', primary: true, onClick: () => { if (!gen) fresh(); running = !running; } }, { label: 'Step', onClick: () => { running = false; stepOnce(); draw(); } }, { label: 'Shuffle', onClick: fresh }, { label: 'Finish', onClick: () => { while (stepOnce()); draw(); } }]);
    const out = api.readout();
    function draw() {
      const Cc = api.colors(); ctx.clearRect(0, 0, cv.w, cv.h);
      const bw = (cv.w - 20) / n;
      a.forEach((v, i) => { const hh = (cv.h - 30) * v / 100; ctx.fillStyle = hi.indexOf(i) >= 0 ? (kind === 'swap' || kind === 'set' ? Cc.bad : Cc.points) : done[i] ? Cc.good : Cc.accent; ctx.fillRect(10 + i * bw + (bw > 4 ? 1 : 0), cv.h - 10 - hh, Math.max(1, bw - (bw > 4 ? 2 : 0)), hh); });
      const lg = n * Math.log2(n);
      out([['comparisons', String(cmp)], ['writes', String(wr)], ['n² / 2', String(Math.round(n * n / 2))], ['n log₂ n', String(Math.round(lg))], ['grows like', SORTS[alg][2]]]);
    }
    cv.onResize = draw;
    api.loop((dt) => { if (!running) return; acc += dt * speed; let k = 0; while (acc >= 1 && k < 2000) { acc -= 1; k++; if (!stepOnce()) { acc = 0; break; } } draw(); });
    fresh();
  };

  /* ======================= Binary search vs linear search ======================= */
  PB.sims.bsearch = function (api, P) {
    const cv = api.canvas(0.36, 200), ctx = cv.ctx;
    let n = 31, arr = [], target = 0, lo = 0, hi = 0, mid = -1, steps = 0, lin = 0, found = -1, log = [];
    function fresh() { arr = []; let x = 2; for (let i = 0; i < n; i++) { x += 1 + Math.floor(Math.random() * 4); arr.push(x); } target = arr[Math.floor(Math.random() * n)]; reset(); }
    function reset() { lo = 0; hi = n - 1; mid = -1; steps = 0; found = -1; lin = arr.indexOf(target) >= 0 ? arr.indexOf(target) + 1 : n; log = []; draw(); }
    function step() {
      if (found >= 0 || lo > hi) return;
      mid = (lo + hi) >> 1; steps++;
      if (arr[mid] === target) { found = mid; log.push('a[' + mid + '] = ' + arr[mid] + ' = target: found!'); }
      else if (arr[mid] < target) { log.push('a[' + mid + '] = ' + arr[mid] + ' < ' + target + ' → search right half'); lo = mid + 1; }
      else { log.push('a[' + mid + '] = ' + arr[mid] + ' > ' + target + ' → search left half'); hi = mid - 1; }
      if (found < 0 && lo > hi) log.push('lo > hi: not in the array');
      draw();
    }
    api.slider({ id: 'n', label: 'Array size', min: 7, max: 63, step: 1, value: n, format: (v) => String(v), onChange: (v) => { n = v; fresh(); } });
    const tSel = api.slider({ id: 't', label: 'Target', min: 0, max: 200, step: 1, value: 0, format: (v) => String(v), onChange: (v) => { target = v; reset(); } });
    api.buttons([{ label: 'Step', primary: true, onClick: step }, { label: 'Run to the end', onClick: () => { let k = 0; while (found < 0 && lo <= hi && k++ < 64) step(); } }, { label: 'New array', onClick: () => { fresh(); tSel.value = target; } }]);
    const out = api.readout();
    function draw() {
      const Cc = api.colors(); ctx.clearRect(0, 0, cv.w, cv.h);
      const bw = Math.min(42, (cv.w - 20) / n), x0 = (cv.w - bw * n) / 2, y = 34;
      arr.forEach((v, i) => {
        const inRange = i >= lo && i <= hi && found < 0;
        ctx.fillStyle = i === found ? Cc.good : i === mid ? Cc.points : inRange ? Cc.accent : Cc.surface2;
        ctx.globalAlpha = inRange || i === mid || i === found ? 1 : 0.5;
        ctx.fillRect(x0 + i * bw + 1, y, bw - 2, 34); ctx.globalAlpha = 1;
        ctx.fillStyle = inRange || i === mid || i === found ? '#fff' : Cc.ink3; ctx.font = (bw > 26 ? 12 : 9) + 'px monospace'; ctx.textAlign = 'center'; ctx.fillText(String(v), x0 + i * bw + bw / 2, y + 21);
        if (bw > 16 || i % 5 === 0) { ctx.fillStyle = Cc.ink3; ctx.font = '9px sans-serif'; ctx.fillText(String(i), x0 + i * bw + bw / 2, y + 48); }
      });
      const mark = (i, lab, col) => { if (i < 0 || i >= n) return; ctx.fillStyle = col; ctx.font = 'bold 11px sans-serif'; ctx.fillText(lab, x0 + i * bw + bw / 2, y - 8); };
      if (found < 0) { mark(lo, 'lo', Cc.accent); mark(hi, 'hi', Cc.rust); }
      ctx.textAlign = 'left'; ctx.fillStyle = Cc.ink2; ctx.font = '12px sans-serif';
      log.slice(-4).forEach((l, i) => ctx.fillText((log.length - Math.min(4, log.length) + i + 1) + '. ' + l, 14, y + 74 + i * 18));
      out([['target', String(target)], ['binary search steps', String(steps)], ['worst case ⌈log₂(n+1)⌉', String(Math.ceil(Math.log2(n + 1)))], ['linear search would take', lin + ' look' + (lin > 1 ? 's' : '')]]);
    }
    cv.onResize = draw;
    fresh(); tSel.value = target;
  };

  /* ======================= Grid path finding ======================= */
  PB.sims.gridpath = function (api, P) {
    const cv = api.canvas(0.55, 280), ctx = cv.ctx;
    const C = 28, R = 15;
    let cell = [], start = [2, 7], goal = [25, 7], alg = P.alg || 'bfs', tool = 'wall', order = [], path = [], seen = {}, anim = 0, running = false, cost = 0, dragging = null;
    const id = (x, y) => y * C + x;
    function clear(keepWalls) { if (!keepWalls) cell = new Array(C * R).fill(0); order = []; path = []; seen = {}; anim = 0; running = false; cost = 0; draw(); }
    function maze() { cell = new Array(C * R).fill(0); for (let x = 5; x < C - 3; x += 4) { const gap = 1 + Math.floor(Math.random() * (R - 2)); for (let y = 0; y < R; y++) if (Math.abs(y - gap) > 1) cell[id(x, y)] = 1; } for (let k = 0; k < 40; k++) { const x = Math.floor(Math.random() * C), y = Math.floor(Math.random() * R); if (!cell[id(x, y)]) cell[id(x, y)] = 2; } cell[id(...start)] = 0; cell[id(...goal)] = 0; clear(true); }
    function solve() {
      const S = id(...start), G = id(...goal), dist = new Array(C * R).fill(Infinity), prev = new Array(C * R).fill(-1), vis = [];
      const nb = (u) => { const x = u % C, y = (u / C) | 0, o = []; [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dx, dy]) => { const a = x + dx, b = y + dy; if (a >= 0 && b >= 0 && a < C && b < R && cell[id(a, b)] !== 1) o.push(id(a, b)); }); return o; };
      const w = (v) => (alg === 'bfs' || alg === 'dfs' ? 1 : cell[v] === 2 ? 5 : 1);
      const hh = (v) => (alg === 'astar' ? Math.abs((v % C) - goal[0]) + Math.abs(((v / C) | 0) - goal[1]) : 0);
      dist[S] = 0;
      if (alg === 'dfs') {
        const st = [S], done = {};
        while (st.length) { const u = st.pop(); if (done[u]) continue; done[u] = 1; vis.push(u); if (u === G) break; nb(u).reverse().forEach((v) => { if (!done[v]) { if (prev[v] < 0 || !done[prev[v]]) { prev[v] = u; dist[v] = dist[u] + 1; } st.push(v); } }); }
      } else if (alg === 'bfs') {
        const q = [S]; let qi = 0; const inq = { [S]: 1 };
        while (qi < q.length) { const u = q[qi++]; vis.push(u); if (u === G) break; nb(u).forEach((v) => { if (!inq[v]) { inq[v] = 1; dist[v] = dist[u] + 1; prev[v] = u; q.push(v); } }); }
      } else {
        const done = {}, open = [[hh(S), S]];
        while (open.length) { open.sort((a, b) => a[0] - b[0]); const [, u] = open.shift(); if (done[u]) continue; done[u] = 1; vis.push(u); if (u === G) break; nb(u).forEach((v) => { const nd = dist[u] + w(v); if (nd < dist[v]) { dist[v] = nd; prev[v] = u; open.push([nd + hh(v), v]); } }); }
      }
      order = vis; path = [];
      if (prev[G] >= 0 || S === G) { let u = G; while (u !== -1) { path.unshift(u); u = prev[u]; } }
      cost = path.slice(1).reduce((a, v) => a + (cell[v] === 2 ? 5 : 1), 0);
      anim = 0; running = true;
    }
    api.select({ id: 'alg', label: 'Algorithm', value: alg, options: [['bfs', 'Breadth-first search (BFS)'], ['dfs', 'Depth-first search (DFS)'], ['dijkstra', 'Dijkstra (mud costs 5)'], ['astar', 'A* (Dijkstra + distance guess)']], onChange: (v) => { alg = v; clear(true); } });
    api.select({ id: 'tool', label: 'Click or drag to draw', value: tool, options: [['wall', 'Walls'], ['mud', 'Mud (cost 5)'], ['erase', 'Eraser']], onChange: (v) => { tool = v; } });
    api.buttons([{ label: 'Find a path', primary: true, onClick: solve }, { label: 'Random maze', onClick: maze }, { label: 'Clear', onClick: () => clear(false) }]);
    const out = api.readout();
    const geo = () => { const s = Math.min((cv.w - 10) / C, (cv.h - 10) / R); return { s: s, x0: (cv.w - s * C) / 2, y0: (cv.h - s * R) / 2 }; };
    const at = (e) => { const r = cv.el.getBoundingClientRect(), g = geo(), x = Math.floor((e.clientX - r.left - g.x0) / g.s), y = Math.floor((e.clientY - r.top - g.y0) / g.s); return x >= 0 && y >= 0 && x < C && y < R ? [x, y] : null; };
    cv.el.addEventListener('pointerdown', (e) => { const p = at(e); if (!p) return; if (p[0] === start[0] && p[1] === start[1]) dragging = 'start'; else if (p[0] === goal[0] && p[1] === goal[1]) dragging = 'goal'; else { dragging = 'paint'; paint(p); } cv.el.setPointerCapture(e.pointerId); });
    cv.el.addEventListener('pointermove', (e) => { if (!dragging) return; const p = at(e); if (!p) return; if (dragging === 'paint') paint(p); else if (!cell[id(...p)]) { if (dragging === 'start') start = p; else goal = p; clear(true); } });
    cv.el.addEventListener('pointerup', () => { dragging = null; });
    function paint(p) { if ((p[0] === start[0] && p[1] === start[1]) || (p[0] === goal[0] && p[1] === goal[1])) return; cell[id(...p)] = tool === 'wall' ? 1 : tool === 'mud' ? 2 : 0; order = []; path = []; draw(); }
    function draw() {
      const Cc = api.colors(), g = geo(); ctx.clearRect(0, 0, cv.w, cv.h);
      const shown = {}; order.slice(0, Math.floor(anim)).forEach((u, k) => { shown[u] = k + 1; });
      const pathOn = anim >= order.length; const pset = {}; if (pathOn) path.forEach((u) => { pset[u] = 1; });
      for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
        const u = id(x, y), c = cell[u];
        ctx.fillStyle = c === 1 ? Cc.ink : pset[u] ? Cc.points : shown[u] ? Cc.accent : c === 2 ? '#8a6a3a' : Cc.surface2;
        ctx.globalAlpha = shown[u] && !pset[u] && c !== 1 ? 0.25 + 0.6 * (shown[u] / Math.max(1, order.length)) : c === 2 && !pset[u] ? 0.55 : 1;
        ctx.fillRect(g.x0 + x * g.s + 0.5, g.y0 + y * g.s + 0.5, g.s - 1, g.s - 1);
        ctx.globalAlpha = 1;
      }
      const dot = (p, col, lab) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(g.x0 + (p[0] + 0.5) * g.s, g.y0 + (p[1] + 0.5) * g.s, g.s * 0.42, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold ' + Math.round(g.s * 0.5) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lab, g.x0 + (p[0] + 0.5) * g.s, g.y0 + (p[1] + 0.68) * g.s); };
      dot(start, Cc.good, 'S'); dot(goal, Cc.bad, 'G');
      out([['cells explored', String(Math.min(Math.floor(anim), order.length))], ['path length', pathOn ? (path.length ? String(path.length - 1) + ' steps' : 'no path!') : '…'], ['path cost', pathOn && path.length ? String(cost) : '…'], ['shortest?', alg === 'dfs' ? 'not guaranteed' : alg === 'bfs' ? 'fewest steps (ignores mud)' : 'cheapest cost']]);
    }
    cv.onResize = draw;
    api.loop((dt) => { if (!running) return; anim += dt * Math.max(30, order.length / 2.5); if (anim >= order.length) { anim = order.length; running = false; } draw(); });
    maze();
  };

  /* ======================= DP table ======================= */
  PB.sims.dptable = function (api, P) {
    api.stage.classList.add('dom-stage');
    let kind = P.kind || 'lcs', A = 'ABCBDAB', B = 'BDCABA', items = [[2, 3], [3, 4], [4, 5], [5, 6]], cap = 5, k = 0, T = null, cells = [], timer = null;
    const tableBox = H('div', { class: 'dp-wrap' }), rule = H('div', { class: 'dp-rule' }), inA = H('input', { class: 'dp-in', value: A, 'aria-label': 'First string' }), inB = H('input', { class: 'dp-in', value: B, 'aria-label': 'Second string' });
    const inputs = H('div', { class: 'dp-inputs' });
    api.stage.append(inputs, rule, tableBox);
    function setup() {
      inputs.innerHTML = '';
      if (kind === 'knap') inputs.append(H('span', { html: 'Items (weight, value): ' + items.map((x) => '(' + x[0] + ', ' + x[1] + ')').join(' ') + ' · capacity ' + cap }));
      else inputs.append(H('label', {}, ['String 1 ', inA]), H('label', {}, ['String 2 ', inB]));
      A = inA.value.toUpperCase().slice(0, 12); B = inB.value.toUpperCase().slice(0, 12);
      const n = kind === 'knap' ? items.length : A.length, m = kind === 'knap' ? cap : B.length;
      T = []; cells = [];
      for (let i = 0; i <= n; i++) { T.push(new Array(m + 1).fill(null)); for (let j = 0; j <= m; j++) cells.push([i, j]); }
      k = 0; render();
    }
    function val(i, j) {
      if (kind === 'lcs') { if (!i || !j) return [0, []]; if (A[i - 1] === B[j - 1]) return [T[i - 1][j - 1] + 1, [[i - 1, j - 1]], 'match: ' + A[i - 1] + ' = ' + B[j - 1] + ', so 1 + the diagonal']; return [Math.max(T[i - 1][j], T[i][j - 1]), [[i - 1, j], [i, j - 1]], A[i - 1] + ' ≠ ' + B[j - 1] + ': the better of above and left']; }
      if (kind === 'edit') { if (!i) return [j, [], 'insert ' + j + ' letters']; if (!j) return [i, [], 'delete ' + i + ' letters']; const same = A[i - 1] === B[j - 1]; return [Math.min(T[i - 1][j] + 1, T[i][j - 1] + 1, T[i - 1][j - 1] + (same ? 0 : 1)), [[i - 1, j], [i, j - 1], [i - 1, j - 1]], same ? A[i - 1] + ' = ' + B[j - 1] + ': the diagonal costs nothing' : 'min(delete, insert, replace) + 1']; }
      if (!i) return [0, [], 'no items: value 0'];
      const [w, v] = items[i - 1];
      if (w > j) return [T[i - 1][j], [[i - 1, j]], 'item ' + i + ' (weight ' + w + ') does not fit: copy from above'];
      return [Math.max(T[i - 1][j], T[i - 1][j - w] + v), [[i - 1, j], [i - 1, j - w]], 'skip item ' + i + ' (above) or take it: ' + v + ' + best with capacity ' + (j - w)];
    }
    function stepOne() { if (k >= cells.length) return false; const [i, j] = cells[k]; T[i][j] = val(i, j)[0]; k++; return true; }
    function render() {
      const n = T.length - 1, m = T[0].length - 1, cur = cells[k - 1], deps = cur ? val(cur[0], cur[1])[1] : [];
      const rowLab = (i) => (kind === 'knap' ? (i ? 'item ' + i : '—') : i ? A[i - 1] : 'ε'), colLab = (j) => (kind === 'knap' ? 'cap ' + j : j ? B[j - 1] : 'ε');
      let s = '<table class="dp-table"><tr><th></th>';
      for (let j = 0; j <= m; j++) s += '<th>' + esc(colLab(j)) + '</th>';
      s += '</tr>';
      const trace = {};
      if (k >= cells.length) {
        let i = n, j = m;
        while (i > 0 && j > 0 && kind !== 'edit') { trace[i + ',' + j] = 1; if (kind === 'lcs') { if (A[i - 1] === B[j - 1]) { i--; j--; } else if (T[i - 1][j] >= T[i][j - 1]) i--; else j--; } else { if (T[i][j] !== T[i - 1][j]) j -= items[i - 1][0]; i--; } }
        if (kind === 'edit') { while (i > 0 || j > 0) { trace[i + ',' + j] = 1; if (i && j && T[i][j] === T[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1)) { i--; j--; } else if (i && T[i][j] === T[i - 1][j] + 1) i--; else j--; } trace['0,0'] = 1; }
      }
      for (let i = 0; i <= n; i++) {
        s += '<tr><th>' + esc(rowLab(i)) + '</th>';
        for (let j = 0; j <= m; j++) {
          const isCur = cur && cur[0] === i && cur[1] === j, isDep = deps.some((d) => d[0] === i && d[1] === j);
          s += '<td class="' + (isCur ? 'cur' : isDep ? 'dep' : '') + (trace[i + ',' + j] ? ' trace' : '') + '">' + (T[i][j] == null ? '' : T[i][j]) + '</td>';
        }
        s += '</tr>';
      }
      tableBox.innerHTML = s + '</table>';
      const R = { lcs: 'LCS[i][j] = LCS[i−1][j−1] + 1 if the letters match, else max(LCS[i−1][j], LCS[i][j−1])', edit: 'D[i][j] = min(D[i−1][j] + 1, D[i][j−1] + 1, D[i−1][j−1] + (a ≠ b))', knap: 'best[i][c] = max(best[i−1][c], value_i + best[i−1][c − weight_i])' }[kind];
      rule.innerHTML = '<code>' + esc(R) + '</code>' + (cur ? '<br><b>Cell (' + cur[0] + ', ' + cur[1] + '):</b> ' + esc(val(cur[0], cur[1])[2] || '') : '') + (k >= cells.length ? '<br><b>Answer: ' + T[n][m] + '</b> (bottom-right cell). The highlighted cells trace back how it was built.' : '');
      out([['cells filled', k + ' / ' + cells.length], ['table size', (n + 1) + ' × ' + (m + 1)], ['work', 'O(' + (kind === 'knap' ? 'n·C' : 'n·m') + ')']]);
    }
    api.select({ id: 'kind', label: 'Problem', value: kind, options: [['lcs', 'Longest common subsequence'], ['edit', 'Edit distance'], ['knap', '0/1 knapsack']], onChange: (v) => { kind = v; if (kind === 'edit' && inA.value === 'ABCBDAB') { inA.value = 'KITTEN'; inB.value = 'SITTING'; } if (kind === 'lcs' && inA.value === 'KITTEN') { inA.value = 'ABCBDAB'; inB.value = 'BDCABA'; } setup(); } });
    [inA, inB].forEach((x) => x.addEventListener('input', setup));
    api.buttons([{ label: 'Step', primary: true, onClick: () => { stepOne(); render(); } }, { label: 'Play', onClick: () => { if (timer) clearInterval(timer); timer = setInterval(() => { if (!stepOne()) { clearInterval(timer); timer = null; } render(); }, 220); } }, { label: 'Fill all', onClick: () => { while (stepOne()); render(); } }, { label: 'Reset', onClick: setup }]);
    const out = api.readout();
    api.onDestroy(() => { if (timer) clearInterval(timer); });
    setup();
  };

  /* ======================= Recursion tree ======================= */
  PB.sims.calltree = function (api, P) {
    const cv = api.canvas(0.5, 280), ctx = cv.ctx;
    let n = 5, memo = false, fnName = P.fn || 'fib';
    api.slider({ id: 'n', label: 'n', min: 1, max: 7, step: 1, value: n, format: (v) => String(v), onChange: (v) => { n = v; draw(); } });
    api.check({ id: 'memo', label: 'Memoise (remember answers)', value: memo, onChange: (v) => { memo = v; draw(); } });
    const out = api.readout();
    const calls = (k, m) => { if (m) return k <= 1 ? 1 : 2 * k - 1; const c = [1, 1]; for (let i = 2; i <= k; i++) c.push(c[i - 1] + c[i - 2] + 1); return c[k]; };
    function draw() {
      const Cc = api.colors(); ctx.clearRect(0, 0, cv.w, cv.h);
      const seen = {}, nodes = [];
      let leaf = 0;
      function build(k, d) { const nd = { k: k, d: d, kids: [], hit: memo && seen[k] }; nodes.push(nd); if (!nd.hit) { seen[k] = 1; if (k > 1) { nd.kids.push(build(k - 1, d + 1)); nd.kids.push(build(k - 2, d + 1)); } } if (!nd.kids.length) nd.x = leaf++; else nd.x = (nd.kids[0].x + nd.kids[nd.kids.length - 1].x) / 2; return nd; }
      const root = build(n, 0);
      const maxD = Math.max(...nodes.map((x) => x.d)), sx = (cv.w - 40) / Math.max(1, leaf - 1 || 1), sy = (cv.h - 50) / Math.max(1, maxD);
      const X = (nd) => (leaf > 1 ? 20 + nd.x * sx : cv.w / 2), Y = (nd) => 22 + nd.d * sy;
      const r = Math.max(7, Math.min(15, sx * 0.42));
      ctx.strokeStyle = Cc.line; ctx.lineWidth = 1.5;
      nodes.forEach((nd) => nd.kids.forEach((c) => { ctx.beginPath(); ctx.moveTo(X(nd), Y(nd)); ctx.lineTo(X(c), Y(c)); ctx.stroke(); }));
      const counts = {}; nodes.forEach((x) => { if (!x.hit) counts[x.k] = (counts[x.k] || 0) + 1; });
      nodes.forEach((nd) => { ctx.fillStyle = nd.hit ? Cc.good : counts[nd.k] > 1 ? Cc.rust : Cc.accent; ctx.beginPath(); ctx.arc(X(nd), Y(nd), r, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold ' + Math.round(r * 0.95) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(String(nd.k), X(nd), Y(nd) + r * 0.35); });
      ctx.textAlign = 'left'; ctx.font = '11px sans-serif'; ctx.fillStyle = Cc.ink2;
      ctx.fillText(memo ? 'green = answer looked up in the memo, no further calls' : 'orange = the same subproblem solved again (wasted work)', 10, cv.h - 8);
      out([['calls to ' + fnName + '(' + n + ')', String(nodes.length)], ['calls for n = 30', memo ? '59' : calls(30, false).toLocaleString()], ['growth', memo ? 'linear, O(n)' : 'exponential, about 1.6ⁿ']]);
      void root;
    }
    cv.onResize = draw;
    draw();
  };

  /* ======================= Event loop ======================= */
  PB.sims.eventloop = function (api, P) {
    api.stage.classList.add('dom-stage');
    const PRE = {
      timeout: { code: ['console.log("A");', 'setTimeout(() => {', '  console.log("B");', '}, 0);', 'console.log("C");'],
        s: [[0, ['main()', 'console.log("A")'], [], [], [], ['A'], 'Synchronous code runs first, one line at a time, on the call stack.'],
          [1, ['main()', 'setTimeout(cb, 0)'], ['timer 0 ms → cb'], [], [], ['A'], 'setTimeout hands the callback to the browser (a Web API) and returns at once. It does not wait.'],
          [1, ['main()'], [], ['cb'], [], ['A'], 'The timer finishes almost instantly, so the browser puts cb in the task queue. It must wait until the stack is empty.'],
          [4, ['main()', 'console.log("C")'], [], ['cb'], [], ['A', 'C'], 'The rest of the script runs: C prints before B even though the delay was 0.'],
          [4, [], [], ['cb'], [], ['A', 'C'], 'The script is done and the call stack is empty. Now the event loop may look at the queues.'],
          [2, ['cb()', 'console.log("B")'], [], [], [], ['A', 'C', 'B'], 'The event loop moves cb from the task queue onto the stack, and it prints B.'],
          [-1, [], [], [], [], ['A', 'C', 'B'], 'Everything has run. Output: A, C, B.']] },
      promise: { code: ['console.log("1");', 'setTimeout(() => console.log("2"), 0);', 'Promise.resolve().then(() => console.log("3"));', 'console.log("4");'],
        s: [[0, ['main()', 'console.log("1")'], [], [], [], ['1'], 'Synchronous code first.'],
          [1, ['main()', 'setTimeout'], ['timer 0 ms'], [], [], ['1'], 'The timer callback will go into the (macro)task queue.'],
          [1, ['main()'], [], ['log 2'], [], ['1'], 'Timer done: its callback waits in the task queue.'],
          [2, ['main()', 'then(cb)'], [], ['log 2'], ['log 3'], ['1'], 'A resolved promise’s .then callback goes into the microtask queue, which has priority.'],
          [3, ['main()', 'console.log("4")'], [], ['log 2'], ['log 3'], ['1', '4'], 'Still synchronous: 4 prints now.'],
          [2, ['log 3'], [], ['log 2'], [], ['1', '4', '3'], 'Stack empty. Microtasks run first, all of them, before any task: 3 prints.'],
          [1, ['log 2'], [], [], [], ['1', '4', '3', '2'], 'Only then does the event loop take the next task: 2.'],
          [-1, [], [], [], [], ['1', '4', '3', '2'], 'Output: 1, 4, 3, 2. Rule: sync code, then all microtasks (promises), then one task (timers, events), repeat.']] },
      async: { code: ['async function load() {', '  console.log("start");', '  const r = await fetch("/data");', '  console.log("got", r.status);', '}', 'load();', 'console.log("waiting…");'],
        s: [[5, ['main()', 'load()'], [], [], [], [], 'Calling an async function runs it synchronously until its first await.'],
          [1, ['main()', 'load()', 'console.log'], [], [], [], ['start'], '"start" prints.'],
          [2, ['main()', 'load()', 'fetch'], ['HTTP GET /data'], [], [], ['start'], 'fetch starts a network request in the background and returns a promise. await pauses load() here and gives control back.'],
          [6, ['main()', 'console.log'], ['HTTP GET /data'], [], [], ['start', 'waiting…'], 'The rest of the script keeps going while the network works: the page does not freeze.'],
          [6, [], ['HTTP GET /data'], [], [], ['start', 'waiting…'], 'The stack is empty; the browser waits for the response (maybe 100 ms).'],
          [2, [], [], [], ['resume load()'], ['start', 'waiting…'], 'The response arrives: the promise resolves and resuming load() is queued as a microtask.'],
          [3, ['load() (resumed)', 'console.log'], [], [], [], ['start', 'waiting…', 'got 200'], 'load() continues after the await with the result.'],
          [-1, [], [], [], [], ['start', 'waiting…', 'got 200'], 'await lets you write asynchronous code that reads top to bottom, without blocking.']] }
    };
    let pre = P.preset || 'timeout', k = 0;
    const codeEl = H('pre', { class: 'el-code' }), grid = H('div', { class: 'el-grid' }), note = H('p', { class: 'el-note' });
    api.stage.append(codeEl, grid, note);
    function render() {
      const p = PRE[pre], st = p.s[k];
      codeEl.innerHTML = p.code.map((l, i) => '<span class="' + (i === st[0] ? 'cur' : '') + '">' + PB.highlightCode(l, 'javascript') + '</span>').join('');
      const col = (t, items, cls) => '<div class="el-col ' + cls + '"><div class="el-h">' + t + '</div>' + (items.length ? items.map((x) => '<div class="el-item">' + esc(x) + '</div>').join('') : '<div class="el-empty">empty</div>') + '</div>';
      grid.innerHTML = col('Call stack', st[1].slice().reverse(), 'stack') + col('Web APIs (browser)', st[2], 'apis') + col('Microtask queue', st[4], 'micro') + col('Task queue', st[3], 'tasks') + col('Console', st[5], 'console');
      note.innerHTML = '<b>Step ' + (k + 1) + ' of ' + p.s.length + '.</b> ' + esc(st[6]);
    }
    api.select({ id: 'pre', label: 'Program', value: pre, options: [['timeout', 'setTimeout with 0 ms'], ['promise', 'Promises versus timers'], ['async', 'async / await with fetch']], onChange: (v) => { pre = v; k = 0; render(); } });
    api.buttons([{ label: '◀ Back', onClick: () => { k = Math.max(0, k - 1); render(); } }, { label: 'Next ▶', primary: true, onClick: () => { k = Math.min(PRE[pre].s.length - 1, k + 1); render(); } }, { label: 'Restart', onClick: () => { k = 0; render(); } }]);
    render();
  };

  /* ======================= Memory diagram ======================= */
  // params.programs: { key: { name, lang, code: [...], steps: [{ line, frames: [{ fn, vars: [[name, value, refId?, addr?]] }], heap: [{ id, label, items: [..], note }], note }] } }
  PB.sims.memory = function (api, P) {
    api.stage.classList.add('dom-stage');
    const progs = P.programs, keys = Object.keys(progs);
    let key = keys[0], k = 0;
    const codeEl = H('pre', { class: 'mem-code' }), board = H('div', { class: 'mem-board' }), note = H('p', { class: 'el-note' });
    const stackCol = H('div', { class: 'mem-col' }), heapCol = H('div', { class: 'mem-col heap' }), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'mem-arrows');
    board.append(stackCol, heapCol, svg);
    api.stage.append(H('div', { class: 'mem-top' }, [codeEl, board]), note);
    function render() {
      const p = progs[key], st = p.steps[k];
      codeEl.innerHTML = p.code.map((l, i) => '<span class="' + (i === st.line ? 'cur' : '') + '">' + PB.highlightCode(l, p.lang) + '</span>').join('');
      stackCol.innerHTML = '<div class="el-h">' + (p.lang === 'cpp' ? 'Stack' : 'Frames (names)') + '</div>';
      (st.frames || []).forEach((f) => {
        const fr = H('div', { class: 'mem-frame' }, [H('div', { class: 'mem-fn', text: f.fn })]);
        (f.vars || []).forEach((v) => fr.appendChild(H('div', { class: 'mem-var' + (v[4] ? ' changed' : '') }, [H('span', { class: 'mem-n', text: v[0] }), v[3] ? H('small', { class: 'mem-addr', text: v[3] }) : null, H('span', { class: 'mem-v' + (v[2] ? ' ref' : ''), 'data-ref': v[2] || null, 'data-addr-id': v[5] || null, text: v[2] ? (v[1] || '') : String(v[1]) })])));
        stackCol.appendChild(fr);
      });
      heapCol.innerHTML = '<div class="el-h">' + (p.lang === 'cpp' ? 'Heap' : 'Objects') + '</div>';
      (st.heap || []).forEach((o) => heapCol.appendChild(H('div', { class: 'mem-obj' + (o.dead ? ' dead' : ''), 'data-id': o.id }, [H('div', { class: 'mem-fn', text: o.label }), H('div', { class: 'mem-items' }, (o.items || []).map((x) => H('span', { text: String(x) }))), o.note ? H('small', { text: o.note }) : null])));
      note.innerHTML = '<b>Step ' + (k + 1) + ' of ' + p.steps.length + '.</b> ' + (st.note || '');
      requestAnimationFrame(arrows);
    }
    function arrows() {
      const br = board.getBoundingClientRect();
      svg.setAttribute('width', br.width); svg.setAttribute('height', br.height);
      let s = '<defs><marker id="mem-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--points)"/></marker></defs>';
      board.querySelectorAll('[data-ref]').forEach((el) => {
        const tgt = board.querySelector('.mem-obj[data-id="' + el.getAttribute('data-ref') + '"]'), tgt2 = !tgt && board.querySelector('[data-addr-id="' + el.getAttribute('data-ref') + '"]');
        const t = tgt || tgt2; if (!t) return;
        const a = el.getBoundingClientRect(), b = t.getBoundingClientRect();
        const x1 = a.right - br.left - 4, y1 = a.top + a.height / 2 - br.top;
        if (tgt) { const x2 = b.left - br.left, y2 = b.top + 14 - br.top; s += '<path d="M' + x1 + ' ' + y1 + ' C' + (x1 + 50) + ' ' + y1 + ' ' + (x2 - 50) + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="var(--points)" stroke-width="2" marker-end="url(#mem-ah)"/>'; }
        else { const x2 = b.right - br.left + 2, y2 = b.top + b.height / 2 - br.top, cx = Math.max(x1, x2) + 46; s += '<path d="M' + x1 + ' ' + y1 + ' C' + cx + ' ' + y1 + ' ' + cx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="var(--points)" stroke-width="2" marker-end="url(#mem-ah)"/>'; }
      });
      svg.innerHTML = s;
    }
    if (keys.length > 1) api.select({ id: 'prog', label: 'Program', value: key, options: keys.map((x) => [x, progs[x].name]), onChange: (v) => { key = v; k = 0; render(); } });
    api.buttons([{ label: '◀ Back', onClick: () => { k = Math.max(0, k - 1); render(); } }, { label: 'Next ▶', primary: true, onClick: () => { k = Math.min(progs[key].steps.length - 1, k + 1); render(); } }, { label: 'Restart', onClick: () => { k = 0; render(); } }]);
    const ro = new ResizeObserver(() => arrows()); ro.observe(board); api.onDestroy(() => ro.disconnect());
    render();
  };

  /* ======================= Binary heap ======================= */
  PB.sims.heapviz = function (api, P) {
    const cv = api.canvas(0.5, 280), ctx = cv.ctx;
    let a = [5, 9, 7, 14, 11, 8, 20], hl = [], msg = 'A min-heap: every parent is at most its children, so the smallest is always at the top (index 0).', queue = [], timer = 0, popped = [];
    const out = api.readout();
    function siftUp(i) { const st = []; while (i > 0) { const p = (i - 1) >> 1; st.push({ hl: [i, p], msg: 'Compare ' + a[i] + ' with its parent ' + a[p] }); if (a[p] <= a[i]) break; [a[p], a[i]] = [a[i], a[p]]; st.push({ hl: [p, i], msg: 'Smaller than the parent: swap up', arr: a.slice() }); i = p; } return st; }
    function siftDown(i) { const st = []; const n = a.length; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < n && a[l] < a[m]) m = l; if (r < n && a[r] < a[m]) m = r; st.push({ hl: [i, l, r].filter((x) => x < n), msg: 'Compare ' + a[i] + ' with its children' }); if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; st.push({ hl: [m, i], msg: 'Swap down with the smaller child', arr: a.slice() }); i = m; } return st; }
    // Build all steps against a working copy, then replay snapshots.
    function push(v) { const before = a.slice(); a.push(v); const s0 = { arr: a.slice(), hl: [a.length - 1], msg: 'Insert ' + v + ' at the end (next free slot)' }; const st = siftUp(a.length - 1); const final = a.slice(); a = before; queue = [s0].concat(st.map((x) => Object.assign({ arr: x.arr }, x))).concat([{ arr: final, hl: [], msg: 'Done: O(log n) swaps at most.' }]); fixArr(queue, before); }
    function pop() { if (!a.length) return; const before = a.slice(), top = a[0]; const last = a.pop(); if (a.length) a[0] = last; const s0 = { arr: a.slice(), hl: [0], msg: 'Remove the minimum ' + top + '; move the last item to the top' }; const st = siftDown(0); const final = a.slice(); a = before; queue = [s0].concat(st).concat([{ arr: final, hl: [], msg: 'Popped ' + top + '. Heap order restored.', popped: top }]); fixArr(queue, s0.arr); }
    function fixArr(q, start) { let cur = start; q.forEach((s) => { if (s.arr) cur = s.arr; else s.arr = cur; }); }
    api.buttons([{ label: 'Insert random', primary: true, onClick: () => push(1 + Math.floor(Math.random() * 40)) }, { label: 'Pop min', onClick: pop }, { label: 'Heapsort out', onClick: () => { const s = a.slice().sort((x, y) => x - y); popped = popped.concat(s); a = []; hl = []; msg = 'Popping everything gives the values in sorted order: heapsort, O(n log n).'; draw(); } }, { label: 'Reset', onClick: () => { a = [5, 9, 7, 14, 11, 8, 20]; popped = []; queue = []; hl = []; draw(); } }]);
    function draw() {
      const Cc = api.colors(); ctx.clearRect(0, 0, cv.w, cv.h);
      const n = a.length, lev = Math.max(1, Math.ceil(Math.log2(n + 1))), th = cv.h - 70;
      const pos = (i) => { const d = Math.floor(Math.log2(i + 1)), k = i - (Math.pow(2, d) - 1), cnt = Math.pow(2, d); return [cv.w * (k + 0.5) / cnt, 24 + d * th / Math.max(1, lev)]; };
      ctx.strokeStyle = Cc.line; ctx.lineWidth = 2;
      for (let i = 1; i < n; i++) { const p = pos(i), q = pos((i - 1) >> 1); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
      for (let i = 0; i < n; i++) { const p = pos(i); ctx.fillStyle = hl.indexOf(i) >= 0 ? Cc.points : i === 0 ? Cc.good : Cc.accent; ctx.beginPath(); ctx.arc(p[0], p[1], 16, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(String(a[i]), p[0], p[1] + 5); }
      const bw = Math.min(34, (cv.w - 20) / Math.max(1, n)), x0 = (cv.w - bw * n) / 2, y = cv.h - 38;
      for (let i = 0; i < n; i++) { ctx.fillStyle = hl.indexOf(i) >= 0 ? Cc.points : Cc.surface2; ctx.fillRect(x0 + i * bw + 1, y, bw - 2, 22); ctx.fillStyle = Cc.ink; ctx.font = '11px monospace'; ctx.fillText(String(a[i]), x0 + i * bw + bw / 2, y + 15); ctx.fillStyle = Cc.ink3; ctx.font = '9px sans-serif'; ctx.fillText(String(i), x0 + i * bw + bw / 2, y + 33); }
      ctx.fillStyle = Cc.ink2; ctx.font = '12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(msg, 10, cv.h - 46);
      out([['size', String(n)], ['minimum', n ? String(a[0]) : '—'], ['height', String(n ? Math.floor(Math.log2(n)) : 0)], ['children of i', '2i + 1 and 2i + 2'], ['popped so far', popped.slice(-8).join(' ') || '—']]);
    }
    cv.onResize = draw;
    api.loop((dt) => { if (!queue.length) return; timer += dt; if (timer < 0.55) return; timer = 0; const s = queue.shift(); a = s.arr.slice(); hl = s.hl || []; msg = s.msg; if (s.popped != null) popped.push(s.popped); draw(); });
    draw();
  };
})();
