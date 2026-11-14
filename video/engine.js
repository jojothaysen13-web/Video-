/* Render-Engine: baut aus window.TL eine deterministische GSAP-Timeline.
   window.seek(t) setzt den Frame für Zeit t (Sekunden). */
(() => {
  const TL = window.TL, ICONS = window.ICONS;
  const tl = gsap.timeline({ paused: true });
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const icon = (n, cls = '') => `<div class="ico ${cls}">${ICONS[n] || ''}</div>`;
  const scenesRoot = $('#scenes');
  const E_IN = 'expo.out', E_OUT = 'power2.in';

  // Standard-Animationen
  function inFx(target, t, opt = {}) {
    tl.fromTo(target, { opacity: 0, y: opt.y ?? 46, scale: opt.scale ?? .965, filter: 'blur(14px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: opt.d ?? .6, ease: E_IN, stagger: opt.stagger ?? 0, immediateRender: false }, t);
  }
  function outFx(target, t, opt = {}) {
    tl.to(target, { opacity: 0, y: opt.y ?? -36, scale: opt.scale ?? 1, filter: 'blur(10px)', duration: opt.d ?? .26, ease: E_OUT }, t);
  }
  function sticker(parent, text, t, tEnd, pos) {
    const s = el('div', 'sticker', text);
    Object.assign(s.style, pos || { right: '150px', top: '170px' });
    parent.appendChild(s);
    tl.fromTo(s, { opacity: 0, scale: .4, rotation: -18 }, { opacity: 1, scale: 1, rotation: -6, duration: .55, ease: 'back.out(2.4)', immediateRender: false }, t + .4);
    tl.to(s, { opacity: 0, scale: .8, duration: .2, ease: E_OUT }, tEnd - .22);
  }
  const lineEnd = (sc, i) => (i + 1 < sc.lines.length ? sc.lines[i + 1].start : sc.end);

  // ───────────── Szenen-Typen
  const builders = {};

  builders.big = (sc, root) => {
    sc.lines.forEach((ln, i) => {
      const v = ln.v; if (!v || !Object.keys(v).length) return;
      const b = el('div', 'beat');
      let h = '';
      if (v.kicker) h += `<div class="kicker">${v.kicker}</div>`;
      if (v.icon && !v.versus) h += icon(v.icon, 'acc');
      if (v.big) h += `<div class="big">${v.big}</div>`;
      if (v.equation) h += `<div class="eq">${v.equation.map((w, k) => `<span class="${w === '+' || w === '=' ? 'op' : (k === v.equation.length - 1 ? 'res' : '')}">${w}</span>`).join('')}</div>`;
      if (v.chips) h += `<div class="chips">${v.chips.map(c => `<div class="chip">${c}</div>`).join('')}</div>`;
      if (v.icons) h += `<div class="icons">${v.icons.map(([ic, l]) => `<div class="tile">${icon(ic, 'acc')}<b>${l}</b></div>`).join('')}</div>`;
      if (v.versus) h += `<div class="vs"><div class="side">${icon(v.versus[0][0], 'acc')}<b>${v.versus[0][1]}</b><span>${v.versus[0][2]}</span></div><div class="mid">VS</div><div class="side">${icon(v.versus[1][0], 'acc')}<b>${v.versus[1][1]}</b><span>${v.versus[1][2]}</span></div></div>`;
      if (v.sub) h += `<div class="sub">${v.sub}</div>`;
      b.innerHTML = h;
      root.appendChild(b);
      const t0 = ln.start - .05, t1 = lineEnd(sc, i);
      tl.set(b, { opacity: 1 }, t0);
      inFx(b.children, t0, { stagger: .07 });
      const sub = b.querySelectorAll('.chip, .tile, .side, .eq span');
      if (sub.length) inFx(sub, t0 + .1, { stagger: v.chips ? .32 : .12, y: 30 });
      outFx(b, t1 - .26);
      if (v.sticker) sticker(root, v.sticker, ln.start, t1, { left: '1290px', top: '250px' });
    });
  };

  builders.chapter = (sc, root) => {
    root.classList.add('chapter');
    root.innerHTML = `<div class="bar"></div><div class="wrap"><div class="num">${sc.num}</div><div class="txt">${icon(sc.icon, 'acc')}<div class="title">${sc.title}</div></div></div>`;
    const t = sc.start, d = sc.end - sc.start;
    tl.fromTo($('.bar', root), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: .5, ease: 'expo.inOut', immediateRender: false }, t);
    tl.to($('.bar', root), { opacity: 0, duration: .3 }, t + .5);
    tl.fromTo($('.num', root), { x: -120, opacity: 0, filter: 'blur(20px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: .7, ease: E_IN, immediateRender: false }, t + .08);
    tl.fromTo($('.txt', root).children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: E_IN, stagger: .08, immediateRender: false }, t + .18);
    tl.to($('.wrap', root), { scale: 1.08, opacity: 0, filter: 'blur(16px)', duration: .3, ease: E_OUT }, t + d - .3);
  };

  builders.list = (sc, root) => {
    const head = el('div', 'lhead', `<div class="kicker">${sc.kicker}</div><h2>${sc.title}</h2>`);
    root.appendChild(head);
    const n = sc.items.length, cols = sc.cols;
    const rows = Math.ceil(n / cols);
    const cards = el('div', 'cards ' + (rows > 1 ? 'two' : (cols >= 4 ? 'tall' : 'mid')));
    cards.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    if (sc.groups) {
      const g = el('div', 'groups'); g.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      sc.groups.forEach(([name, a, b]) => { const d = el('div', '', name); d.style.gridColumn = `${a + 1} / ${b + 1}`; g.appendChild(d); });
      root.appendChild(g);
      cards.style.top = '400px';
    }
    const hasShowTags = sc.lines.some(l => l.v && l.v.showTags);
    const map = {};
    sc.items.forEach(it => {
      const c = el('div', 'card');
      let h = `<div class="glow"></div>${icon(it.icon, 'acc')}<h3>${it.title}</h3>`;
      if (it.text) h += `<p>${it.text}</p>`;
      if (it.tag) h += `<div class="tag">${it.tag}</div>`;
      if (it.res) h += `<div class="res">${it.res.map(([a, b]) => `<div>${a}<b>${b}</b></div>`).join('')}</div>`;
      if (it.ex) h += `<div class="ex">z. B. ${it.ex}</div>`;
      c.innerHTML = h;
      cards.appendChild(c);
      map[it.id] = c;
      if (hasShowTags && it.tag) $('.tag', c).style.opacity = 0;
    });
    root.appendChild(cards);
    const t0 = sc.start;
    inFx(head.children, t0, { stagger: .08 });
    if (sc.groups) inFx(root.querySelectorAll('.groups div'), t0 + .2, { stagger: .1, y: 10 });
    const revealed = new Set();
    let focusState = {};
    sc.lines.forEach((ln, i) => {
      const v = ln.v || {}; const t = ln.start;
      if (v.reveal) { const els = v.reveal.map(id => map[id]); v.reveal.forEach(id => revealed.add(id)); inFx(els, t, { stagger: .12, y: 50 }); }
      if (v.focus !== undefined) {
        const f = new Set([].concat(v.focus));
        revealed.forEach(id => {
          const on = f.size === 0 ? null : f.has(id);
          const st = on === null ? 'n' : (on ? 'f' : 'd');
          if (focusState[id] === st) return;
          focusState[id] = st;
          const c = map[id];
          tl.to(c, { opacity: st === 'd' ? .38 : 1, scale: st === 'f' && f.size === 1 ? 1.03 : 1, duration: .4, ease: 'power3.out' }, t + (v.reveal && v.reveal.includes(id) ? .5 : 0));
          tl.to($('.glow', c), { opacity: st === 'f' ? 1 : 0, duration: .4 }, t + (v.reveal && v.reveal.includes(id) ? .3 : 0));
        });
      }
      if (v.showTags) tl.to(root.querySelectorAll('.tag'), { opacity: 1, duration: .4, stagger: .15 }, t);
      if (v.sticker) sticker(root, v.sticker, t, lineEnd(sc, i));
    });
    outFx(root.querySelectorAll('.lhead, .cards, .groups'), sc.end - .28, { y: -20 });
  };

  builders.chart = (sc, root) => {
    const A = sc.axes;
    const W = 1060, H = 760, L = 120, R = 1010, T = 40, B = 670;
    const X = q => L + (q / A.xMax) * (R - L);
    const Y = p => B - ((p - A.yMin) / (A.yMax - A.yMin)) * (B - T);
    const fmtY = p => A.yFmt === 'eur0' ? p.toLocaleString('de-DE') + ' €' : p.toFixed(2).replace('.', ',') + ' €';
    const head = el('div', 'ctitle', `<div class="kicker">${sc.title}</div>`);
    root.appendChild(head);
    const wrap = el('div', 'chartwrap');
    const NS = 'http://www.w3.org/2000/svg';
    let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><marker id="ah_${sc.id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs><g class="axes">`;
    A.yTicks.forEach(p => { s += `<line x1="${L}" x2="${R}" y1="${Y(p)}" y2="${Y(p)}" stroke="rgba(255,255,255,.07)"/><text x="${L - 18}" y="${Y(p) + 8}" fill="rgba(255,255,255,.5)" font-size="22" text-anchor="end" font-family="GeistMono">${fmtY(p)}</text>`; });
    A.xTicks.forEach(q => { s += `<line x1="${X(q)}" x2="${X(q)}" y1="${T}" y2="${B}" stroke="rgba(255,255,255,.05)"/><text x="${X(q)}" y="${B + 38}" fill="rgba(255,255,255,.5)" font-size="22" text-anchor="middle" font-family="GeistMono">${q}</text>`; });
    s += `<line x1="${L}" y1="${B}" x2="${R + 20}" y2="${B}" stroke="rgba(255,255,255,.55)" stroke-width="2" marker-end="url(#ah_${sc.id})"/><line x1="${L}" y1="${B}" x2="${L}" y2="${T - 24}" stroke="rgba(255,255,255,.55)" stroke-width="2" marker-end="url(#ah_${sc.id})"/>`;
    s += `<text x="${L + 16}" y="${T - 14}" fill="#fff" font-size="24" font-weight="600">Preis <tspan fill="rgba(255,255,255,.5)" font-weight="400">(${A.yUnit})</tspan></text><text x="${R + 20}" y="${B - 18}" fill="#fff" font-size="24" font-weight="600" text-anchor="end">Menge <tspan fill="rgba(255,255,255,.5)" font-weight="400">(${A.xUnit})</tspan></text>`;
    s += `</g><g class="layer"></g></svg>`;
    wrap.innerHTML = s;
    root.appendChild(wrap);
    const layer = $('.layer', wrap);
    const svgEl = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); layer.appendChild(e); return e; };
    const notes = el('div', 'notes'); root.appendChild(notes);
    const objs = {}; // id -> [elements]
    const curves = {};
    const add = (id, ...els) => { (objs[id] = objs[id] || []).push(...els); };
    const label = (txt, x, y, color, cls = 'lbl') => { const d = el('div', cls, txt); d.style.left = x + 'px'; d.style.top = y + 'px'; if (cls === 'cl') d.style.background = color; else d.style.borderColor = color; wrap.appendChild(d); return d; };

    const runOp = (o, t) => {
      t += o.delay || 0;
      const fast = o.instant;
      if (o.op === 'curve') {
        const [q1, p1] = o.from, [q2, p2] = o.to;
        const ln = svgEl('line', { x1: X(q1), y1: Y(p1), x2: X(q2), y2: Y(p2), stroke: o.color, 'stroke-width': o.ghost ? 4 : 7, 'stroke-linecap': 'round', opacity: 0 });
        ln.style.filter = o.ghost ? '' : `drop-shadow(0 0 14px ${o.color})`;
        const len = Math.hypot(X(q2) - X(q1), Y(p2) - Y(p1));
        const lb = label(o.label, X(q2) + (q2 > q1 ? 34 : -10), Y(p2) + (p2 > p1 ? -34 : -34), o.color, 'cl');
        curves[o.id] = { ln, lb, q1, p1, q2, p2 };
        if (o.ghost) {
          ln.setAttribute('stroke-dasharray', '10 14');
          tl.fromTo(ln, { opacity: 0 }, { opacity: .45, duration: .5, immediateRender: false }, t);
          tl.fromTo(lb, { opacity: 0 }, { opacity: .5, duration: .5, immediateRender: false }, t);
        } else if (fast) {
          tl.fromTo([ln, lb], { opacity: 0 }, { opacity: 1, duration: .35, immediateRender: false }, t);
        } else {
          ln.setAttribute('stroke-dasharray', `${len} ${len}`);
          tl.fromTo(ln, { opacity: 1, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'power3.inOut', immediateRender: false }, t);
          tl.fromTo(lb, { opacity: 0, scale: .3 }, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)', immediateRender: false }, t + .9);
        }
        add(o.id, ln, lb);
      } else if (o.op === 'point') {
        const x = X(o.q), y = Y(o.p);
        const gx = svgEl('line', { x1: x, y1: y, x2: x, y2: B, stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0 });
        const gy = svgEl('line', { x1: x, y1: y, x2: L, y2: y, stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0 });
        const ring = svgEl('circle', { cx: x, cy: y, r: o.big ? 30 : 20, fill: 'none', stroke: o.color, 'stroke-width': 2, opacity: 0 });
        const dot = svgEl('circle', { cx: x, cy: y, r: o.big ? 13 : 10, fill: o.color, opacity: 0 });
        dot.style.filter = `drop-shadow(0 0 12px ${o.color})`;
        const lx = Math.min(Math.max(x + (o.q > A.xMax * .6 ? -150 : 150), 160), 900);
        const lb = label(o.label, lx, y - 50, o.color);
        if (o.big) { lb.style.fontSize = '28px'; lb.style.background = '#fff'; lb.style.color = '#050507'; }
        const d = fast ? .3 : .5;
        tl.fromTo([gx, gy], { opacity: 0 }, { opacity: 1, duration: d, immediateRender: false }, t);
        tl.fromTo(dot, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(3)', immediateRender: false }, t + .1);
        tl.fromTo(ring, { opacity: .9, scale: .4, transformOrigin: '50% 50%' }, { opacity: o.big ? .6 : 0, scale: 1, duration: .8, ease: 'power2.out', immediateRender: false }, t + .15);
        tl.fromTo(lb, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: E_IN, immediateRender: false }, t + .25);
        add(o.id, gx, gy, ring, dot, lb);
      } else if (o.op === 'gap') {
        const y = Y(o.p), x1 = X(o.q1), x2 = X(o.q2);
        const bar = svgEl('line', { x1, y1: y, x2, y2: y, stroke: o.color, 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0 });
        const c1 = svgEl('circle', { cx: x1, cy: y, r: 9, fill: '#fff', opacity: 0 });
        const c2 = svgEl('circle', { cx: x2, cy: y, r: 9, fill: '#fff', opacity: 0 });
        const lb = label(o.label, (x1 + x2) / 2, y - 46, o.color);
        lb.style.color = o.color;
        tl.fromTo(bar, { opacity: .55, attr: { x2: x1 } }, { attr: { x2 }, duration: .8, ease: 'power3.out', immediateRender: false }, t + .2);
        tl.fromTo([c1, c2], { opacity: 0 }, { opacity: 1, duration: .3, stagger: .5, immediateRender: false }, t + .2);
        tl.fromTo(lb, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: E_IN, immediateRender: false }, t + .8);
        add(o.id, bar, c1, c2, lb);
      } else if (o.op === 'arrow') {
        const x = X(o.q) + 0, y1 = Y(o.p1), y2 = Y(o.p2);
        const ar = svgEl('line', { x1: x + 60, y1, x2: x + 60, y2: y1, stroke: o.color, 'stroke-width': 6, 'stroke-linecap': 'round', 'marker-end': `url(#ah_${sc.id})`, opacity: 0 });
        tl.fromTo(ar, { opacity: 1, attr: { y2: y1 } }, { attr: { y2 }, duration: .7, ease: 'power3.inOut', immediateRender: false }, t);
        add(o.id, ar);
      } else if (o.op === 'hline') {
        const y = Y(o.p);
        const hl = svgEl('line', { x1: L, y1: y, x2: R, y2: y, stroke: o.color, 'stroke-width': 4, 'stroke-dasharray': '14 10', opacity: 0 });
        const lb = label(o.label, R - 90, y + 36, o.color);
        lb.style.background = o.color; lb.style.color = '#050507';
        tl.fromTo(hl, { opacity: 1, attr: { x2: L } }, { attr: { x2: R }, duration: .8, ease: 'power3.inOut', immediateRender: false }, t);
        tl.fromTo(lb, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: .4, ease: E_IN, immediateRender: false }, t + .6);
        add(o.id, hl, lb);
      } else if (o.op === 'shift') {
        const c = curves[o.id];
        const ghost = svgEl('line', { x1: X(c.q1), y1: Y(c.p1), x2: X(c.q2), y2: Y(c.p2), stroke: c.ln.getAttribute('stroke'), 'stroke-width': 4, 'stroke-dasharray': '10 14', opacity: 0 });
        tl.fromTo(ghost, { opacity: 0 }, { opacity: .4, duration: .3, immediateRender: false }, t);
        const [[q1, p1], [q2, p2]] = o.to;
        tl.to(c.ln, { attr: { x1: X(q1), y1: Y(p1), x2: X(q2), y2: Y(p2) }, duration: 1.3, ease: 'power3.inOut' }, t + .2);
        tl.to(c.lb, { left: X(q2) + 34, top: Y(p2) - 34, duration: 1.3, ease: 'power3.inOut' }, t + .2);
        if (o.label) tl.set(c.lb, { innerHTML: o.label }, t + .8);
        // Ghost-Label
        const gl = label(c.lb.textContent, parseFloat(c.lb.style.left), parseFloat(c.lb.style.top), c.ln.getAttribute('stroke'), 'cl');
        tl.fromTo(gl, { opacity: 0 }, { opacity: .35, duration: .3, immediateRender: false }, t + .2);
        // Pfeil für Verschiebung
        const my = Y((c.p1 + c.p2) / 2), mx = X((c.q1 + c.q2) / 2);
        const dx = X((q1 + q2) / 2) - mx;
        const ar = svgEl('line', { x1: mx, y1: my + 0, x2: mx, y2: my, stroke: '#fff', 'stroke-width': 4, 'marker-end': `url(#ah_${sc.id})`, opacity: 0 });
        tl.fromTo(ar, { opacity: 1, attr: { x2: mx } }, { attr: { x2: mx + dx * .9 }, duration: 1, ease: 'power3.out', immediateRender: false }, t + .5);
        add(o.id + '_g', ghost, gl, ar);
      } else if (o.op === 'hide') {
        o.ids.forEach(id => (objs[id] || []).length && tl.to(objs[id], { opacity: 0, duration: .3 }, t));
      } else if (o.op === 'pulse') {
        const c = curves[o.id];
        if (c) tl.to(c.ln, { attr: { 'stroke-width': 13 }, duration: .35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .3);
        else if (objs[o.id]) tl.to(objs[o.id].filter(e => e.tagName === 'circle'), { scale: 1.6, transformOrigin: '50% 50%', duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .3);
      }
    };

    inFx([head, wrap], sc.start, { stagger: .1, y: 30 });
    (sc.preset || []).forEach(o => runOp({ ...o, instant: true }, sc.start + .1));
    let lastNote = null;
    sc.lines.forEach((ln, i) => {
      const v = ln.v || {};
      (v.ops || []).forEach(o => runOp(o, ln.start));
      if (v.note) {
        const n = v.note; const d = el('div', 'note');
        let h = '';
        if (n.kicker) h += `<div><div class="kicker">${n.kicker}</div></div>`;
        if (n.icon) h += icon(n.icon, 'acc');
        if (n.big) h += `<div class="big">${n.big}</div>`;
        if (n.rows) h += `<div class="rows">${n.rows.map(([a, b]) => `<div class="row"><span>${a}</span><span>${b}</span></div>`).join('')}</div>`;
        if (n.sub) h += `<div class="sub">${n.sub}</div>`;
        d.innerHTML = h; notes.appendChild(d);
        if (lastNote) outFx(lastNote, ln.start - .2, { y: -24 });
        tl.set(d, { opacity: 1 }, ln.start);
        inFx(d.children, ln.start, { stagger: .08, y: 34 });
        const rows = d.querySelectorAll('.row'); if (rows.length) inFx(rows, ln.start + .15, { stagger: .18, y: 20 });
        lastNote = d;
      }
      if (v.sticker) sticker(root, v.sticker, ln.start, lineEnd(sc, i));
    });
    outFx([head, wrap, notes], sc.end - .28, { y: -20 });
  };

  builders.matrix = (sc, root) => {
    const names = [['Polypol', 'Angebots&shy;oligopol', 'Angebots&shy;monopol'], ['Nachfrage&shy;oligopol', 'zweiseitiges Oligopol', 'beschränktes Angebots&shy;monopol'], ['Nachfrage&shy;monopol', 'beschränktes Nachfrage&shy;monopol', 'zweiseitiges Monopol']];
    const lab = ['viele', 'wenige', 'einer'];
    const head = el('div', 'mtitle', `<div class="kicker">Marktformen-Schema</div><h2>9 Marktformen</h2>`);
    root.appendChild(head);
    const mx = el('div', 'mx');
    let h = `<div class="h" style="flex-direction:column;align-items:flex-start;font-size:19px;color:#fff;gap:4px"><span>Anbieter →</span><span>Nachfrager ↓</span></div>` + lab.map(l => `<div class="h">${l}</div>`).join('');
    names.forEach((row, r) => { h += `<div class="h">${lab[r]}</div>` + row.map((n, c) => `<div class="cell" data-rc="${r}${c}"><div class="glow"></div>${n}</div>`).join(''); });
    mx.innerHTML = h; root.appendChild(mx);
    inFx([head, ...mx.querySelectorAll('.h')], sc.start, { stagger: .04, y: 20 });
    const cells = [...mx.querySelectorAll('.cell')];
    let hlPrev = [];
    sc.lines.forEach((ln, i) => {
      const v = ln.v || {};
      if (v.fill) inFx(cells, ln.start + .1, { stagger: .09, y: 24 });
      if (v.hl) {
        const tgt = v.hl.map(([r, c]) => mx.querySelector(`[data-rc="${r}${c}"]`));
        hlPrev.forEach(c => { tl.to($('.glow', c), { opacity: 0, duration: .3 }, ln.start); tl.to(c, { color: '#F5F5F7', duration: .3 }, ln.start); });
        tl.to(cells.filter(c => !tgt.includes(c)), { opacity: .35, scale: 1, duration: .4 }, ln.start);
        tgt.forEach(c => { tl.to(c, { opacity: 1, scale: 1.06, color: '#050507', duration: .45, ease: 'back.out(2)' }, ln.start); tl.to($('.glow', c), { opacity: 1, duration: .35 }, ln.start); });
        hlPrev.forEach(c => { if (!tgt.includes(c)) tl.to(c, { scale: 1, duration: .3 }, ln.start); });
        hlPrev = tgt;
      }
      if (v.sticker) sticker(root, v.sticker, ln.start, lineEnd(sc, i), { right: '140px', top: '150px' });
    });
    outFx([head, mx], sc.end - .28, { y: -20 });
  };

  builders.quiz = (sc, root) => {
    const Q = sc.questions;
    const ring = el('div', 'ring', `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="6"/><circle class="rc" cx="50" cy="50" r="44" fill="none" stroke="var(--acc)" stroke-width="6" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="0"/></svg><div class="n">3</div>`);
    const beats = {};
    let current = null;
    const show = (b, t) => { if (current) outFx(current, t - .22); tl.set(b, { opacity: 1 }, t); inFx(b.children, t, { stagger: .08 }); current = b; };
    sc.lines.forEach((ln, i) => {
      const v = ln.v || {};
      if (v.intro) {
        const b = el('div', 'qbeat', `<div class="kicker">Klausur-Check</div><div class="q" style="font-size:150px">Quick Check.</div><div class="sub" style="font-size:40px;color:var(--mut)">5 Fragen · je 3 Sekunden · laut antworten</div>`);
        root.appendChild(b); show(b, ln.start);
      }
      if (v.ask !== undefined) {
        const q = Q[v.ask];
        const b = el('div', 'qbeat', `<div class="kicker">Frage ${v.ask + 1} / ${Q.length}</div><div class="q">${q.q}</div><div class="opts">${q.o.map((o, k) => `<div class="opt"><div class="fill"></div><div class="l">${'ABC'[k]}</div><span>${o}</span></div>`).join('')}</div>`);
        root.appendChild(b); show(b, ln.start); beats[v.ask] = b;
        inFx(b.querySelectorAll('.opt'), ln.start + .2, { stagger: .1, y: 26 });
      }
      if (v.count !== undefined) {
        const t = ln.start, n = $('.n', ring), rc = $('.rc', ring);
        tl.fromTo(ring, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)', immediateRender: false }, t);
        tl.fromTo(rc, { strokeDashoffset: 0 }, { strokeDashoffset: 276.5, duration: 3, ease: 'none', immediateRender: false }, t);
        [3, 2, 1].forEach((k, j) => { tl.set(n, { innerHTML: k }, t + j); tl.fromTo(n, { scale: 1.4 }, { scale: 1, duration: .4, ease: 'expo.out', immediateRender: false }, t + j); });
        tl.to(ring, { opacity: 0, duration: .2 }, t + 2.95);
      }
      if (v.answer !== undefined) {
        const b = beats[v.answer], q = Q[v.answer];
        const opts = b.querySelectorAll('.opt');
        opts.forEach((o, k) => {
          if (k === q.a) { tl.to($('.fill', o), { opacity: 1, duration: .3 }, ln.start); tl.to(o, { color: '#050507', scale: 1.04, duration: .4, ease: 'back.out(2)' }, ln.start); tl.to($('.l', o), { backgroundColor: 'rgba(0,0,0,.15)', duration: .3 }, ln.start); }
          else tl.to(o, { opacity: .3, duration: .3 }, ln.start);
        });
      }
    });
    root.appendChild(ring);
    if (current) outFx(current, sc.end - .26);
  };

  // ───────────── Aufbau
  TL.scenes.forEach(sc => {
    const root = el('div', 'scene');
    root.style.setProperty('--acc', sc.accent);
    scenesRoot.appendChild(root);
    tl.set(root, { visibility: 'visible' }, Math.max(0, sc.start - .3));
    tl.set(root, { visibility: 'hidden' }, sc.end + .05);
    builders[sc.type](sc, root);
  });

  // Captions: Sätze in kurze Häppchen teilen, zeitlich proportional
  const capt = $('#capt');
  const chunk = (s) => {
    const words = s.split(' '); const out = []; let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > 56 && cur) { out.push(cur.trim()); cur = w; }
      else cur += ' ' + w;
      if (/[.!?:]$/.test(w) && cur.trim().length > 28) { out.push(cur.trim()); cur = ''; }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };
  TL.scenes.forEach(sc => sc.lines.forEach(ln => {
    if (!ln.say) return;
    const parts = chunk(ln.say); const tot = parts.reduce((a, p) => a + p.length, 0);
    let t = ln.start;
    parts.forEach(p => { tl.set(capt, { innerHTML: p }, t); t += ln.speech * p.length / tot; });
    tl.set(capt, { innerHTML: '' }, ln.start + ln.speech + .12);
  }));
  tl.set(capt, { innerHTML: '' }, 0);

  // HUD + Hintergrund (pro Frame berechnet)
  const prog = $('#prog');
  const chapters = window.CHAPTERS;
  const chRange = {};
  TL.scenes.forEach(sc => { const r = chRange[sc.chapter] = chRange[sc.chapter] || [sc.start, sc.end]; r[0] = Math.min(r[0], sc.start); r[1] = Math.max(r[1], sc.end); });
  const segs = [];
  for (let c = 1; c < chapters.length; c++) { const s = el('div', 'seg', '<i></i>'); prog.appendChild(s); segs.push([c, s.firstChild]); }
  const b1 = $('.b1'), b2 = $('.b2'), stage = $('#stage');
  const hnum = $('#hnum'), hchap = $('#hchap');
  const accentAt = (t) => {
    let cur = TL.scenes[0], prev = TL.scenes[0];
    for (const sc of TL.scenes) { if (sc.start - .3 <= t) { prev = cur; cur = sc; } }
    return cur;
  };
  function lerpColor(a, b, k) {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k), g = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k), bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
    return `rgb(${r},${g},${bl})`;
  }
  function frameUpdate(t) {
    b1.style.transform = `translate(${-200 + Math.sin(t * .23) * 260}px, ${-380 + Math.cos(t * .17) * 160}px)`;
    b2.style.transform = `translate(${1250 + Math.cos(t * .19) * 220}px, ${450 + Math.sin(t * .21) * 160}px)`;
    // Akzentfarbe weich überblenden
    const idx = TL.scenes.findIndex(sc => sc.start - .3 > t);
    const i = idx === -1 ? TL.scenes.length - 1 : Math.max(0, idx - 1);
    const sc = TL.scenes[i], pv = TL.scenes[Math.max(0, i - 1)];
    const k = Math.min(1, Math.max(0, (t - (sc.start - .3)) / .8));
    const col = lerpColor(pv.accent, sc.accent, k);
    stage.style.setProperty('--acc', col);
    const ch = sc.chapter;
    hnum.textContent = ch ? String(ch).padStart(2, '0') : '';
    hchap.textContent = ch ? chapters[ch] : '';
    segs.forEach(([c, bar]) => {
      const r = chRange[c]; if (!r) return;
      const p = Math.min(1, Math.max(0, (t - r[0]) / (r[1] - r[0])));
      bar.style.width = (p * 100) + '%';
      bar.style.background = c === ch ? col : '#F5F5F7';
    });
    document.getElementById('hud').style.opacity = sc.type === 'chapter' ? .35 : 1;
  }

  tl.progress(1).progress(0);
  window.TOTAL = TL.total;
  window.seek = (t) => { tl.seek(t, true); frameUpdate(t); };
  window.seek(0);
  window.READY = document.fonts.ready.then(() => true);
})();
