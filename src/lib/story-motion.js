/* Scroll story engine, ported as-is from the prototype (prototypes/story-sf4.src.html).
   Drives the hero, the storyboard flow, the brand demo, the sticky bar and the small widgets.
   Runs once in the browser; StoryMotion calls it after the page has mounted. */
let started = false;
export function startStory(gsap, ScrollTrigger) {
  if (started) return;
  started = true;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) document.documentElement.classList.add('static');
  var $ = function (id) { return document.getElementById(id); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var seg = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  function prog(el) {
    if (reduce) return 1;
    var r = el.getBoundingClientRect(), total = el.offsetHeight - window.innerHeight;
    return total <= 0 ? 1 : clamp(-r.top / total, 0, 1);
  }
  // seven-segment readout, drawn as SVG
  var SEGS = { '0':'abcdef','1':'bc','2':'abged','3':'abgcd','4':'fgbc','5':'afgcd','6':'afgedc','7':'abc','8':'abcdefg','9':'abcdfg','-':'g',' ':'' };
  var GEO = { a:'2,0 10,0 9,2 3,2', b:'10,1 12,2 12,10 10,9 10,3', c:'10,12 12,11.5 12,20 10,21 10,13', d:'3,20 9,20 10,22 2,22', e:'0,11.5 2,12 2,19 0,20', f:'0,2 2,1 2,9 0,10', g:'2,10 10,10 10,12 2,12' };
  function seg7(str) {
    var x = 0, out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '/') { out += '<path d="M' + (x + 7) + ' 1 L' + (x + 1) + ' 21" style="stroke:var(--led)" stroke-width="1.6"/>'; x += 10; continue; }
      var on = SEGS[ch] || '';
      for (var k in GEO) out += '<polygon transform="translate(' + x + ' 0) skewX(-6) translate(2 0)" points="' + GEO[k] + '" style="fill:' + (on.indexOf(k) > -1 ? 'var(--led)' : '#2B2B29') + '"/>';
      x += 16;
    }
    return '<svg viewBox="-1 0 ' + (x + 2) + ' 22" style="width:' + ((x + 2) * 22 / 22) + 'px">' + out + '</svg>';
  }
  var lastSeg = {};
  function setSeg(id, str) { if (lastSeg[id] !== str) { lastSeg[id] = str; $(id).innerHTML = seg7(str); } }
  var hero = $('hero'), flow = $('flow'), brand = $('brand'), bar = $('bar'), index = $('index');
  // Lazy asks that earn the generic draft below them. One plays per pass; scroll back to the top and the next one types.
  var PROMPTS = [
    'Write a portfolio homepage for Scott. Make it pop.',
    'Make me sound impressive.',
    'Write my bio. Like everyone else’s, but better.',
    'Describe me in three buzzwords.',
    'Write a homepage that gets me hired.',
    'Make my portfolio stand out. Go.'
  ];
  var pi = 0;
  if (!reduce) { try { var last = sessionStorage.getItem('hb-prompt'); pi = last === null ? 0 : (+last + 1) % PROMPTS.length || 0; } catch (e) { pi = 0; } }
  var promptText = PROMPTS[pi], played = false;
  function setPrompt(i) {
    pi = i; promptText = PROMPTS[i];
    $('hb-prompt').setAttribute('aria-label', 'A prompt that reads: ' + promptText);
    try { sessionStorage.setItem('hb-prompt', i); } catch (e) {}
  }
  setPrompt(pi);
  var files = Array.prototype.slice.call(document.querySelectorAll('#files li'));
  var screen = $('screen');

  function heroFrame(p) {
    // once the draft has been struck out, the next pass (back at an empty box) gets a new prompt
    if (p > .5) played = true;
    else if (played && p < .02) { played = false; setPrompt((pi + 1) % PROMPTS.length); }
    var typed = promptText.slice(0, Math.round(promptText.length * seg(p, .02, .26)));
    $('hb-typed').textContent = typed; $('hb-ph').style.display = typed ? 'none' : '';
    var g = $('hb-generic');
    g.style.opacity = seg(p, .28, .36);
    g.style.setProperty('--s', ease(seg(p, .44, .58)));
    g.style.color = p > .55 ? '#A3A39F' : '';
    g.style.display = p > .66 ? 'none' : '';
    $('hb-tag').style.opacity = seg(p, .38, .42) * (1 - seg(p, .6, .64));
    $('hb-tag').style.display = p > .66 ? 'none' : '';
    $('hb-h').style.setProperty('--r', ease(seg(p, .6, .82)));
    $('hb-h').style.display = p < .58 ? 'none' : '';
    $('hb-hint').style.opacity = 1 - seg(p, 0, .06);
  }
  var opened = false, hold = 0, holdT = null, cta = $('s-cta');
  function setOpen(v) { opened = v; screen.classList.toggle('open', v); if (!v) { hold = 0; screen.style.setProperty('--h', 0); } else screen.style.setProperty('--h', 1); }
  function holdTick() {
    hold = Math.min(1, hold + 1 / 60); screen.style.setProperty('--h', hold);
    if (hold >= 1) { setOpen(true); holdT = null; brandFrame(prog(brand)); return; }
    holdT = requestAnimationFrame(holdTick);
  }
  function holdStart(e) { if (!screen.classList.contains('comps') || opened) return; if (e) e.preventDefault(); if (!holdT) holdT = requestAnimationFrame(holdTick); }
  function holdEnd() { if (holdT) { cancelAnimationFrame(holdT); holdT = null; } if (!opened) { hold = 0; screen.style.setProperty('--h', 0); } }
  cta.addEventListener('pointerdown', holdStart);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (t) { cta.addEventListener(t, holdEnd); });
  cta.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) holdStart(e); });
  cta.addEventListener('keyup', holdEnd);
  cta.addEventListener('dblclick', function () { if (screen.classList.contains('comps') && opened) { setOpen(false); brandFrame(prog(brand)); } });
  function brandFrame(p) {
    var k = reduce ? 5 : Math.floor(seg(p, .06, .62) * 6);   // all five files on by ~60%
    files.forEach(function (li, i) { li.classList.toggle('on', i < k); });
    var on = function (key) { return files.some(function (li) { return li.dataset.k === key && li.classList.contains('on'); }); };
    screen.classList.toggle('tokens', on('tokens'));
    screen.classList.toggle('guard', on('guard'));
    screen.classList.toggle('comps', on('comps'));
    var voice = on('voice'), comps = on('comps');
    $('s-title').textContent = voice ? 'Good evening, Ms. Hart.' : 'Welcome! Check in now';
    $('s-note').textContent = voice ? 'Your room is ready. We never saw you.' : 'Your room is ready for check-in.';
    $('s-sub').textContent = voice ? 'Your room' : 'Room number';
    $('s-room').textContent = voice ? 'Seven' : '412';
    $('s-meta').textContent = voice ? 'Late checkout, already sorted' : 'Check-out: 11:00 AM';
    if (!comps) setOpen(false);
    else if (k >= 6 && p > .68 && !opened) setOpen(true);   // doors open, then the section holds so you see the room
    var open = comps && opened;
    if (open) {
      $('s-title').textContent = 'Welcome in, Ms. Hart.';
      $('s-note').textContent = 'Room Seven, third floor. Nobody saw a thing.';
    }
    $('s-cta-t').textContent = open ? 'You’re in' : comps ? 'Hold to open' : voice ? 'Take me upstairs' : 'Check in';
    $('phone-tag').lastChild.textContent = k >= 5 ? 'on brand' : k === 0 ? 'generic' : 'getting there';
  }
  function barFrame() {
    var past = index.getBoundingClientRect().bottom < 0;
    bar.classList.toggle('show', past);
    bar.setAttribute('aria-hidden', past ? 'false' : 'true');
    bar.querySelectorAll('a').forEach(function (a) { a.tabIndex = past ? 0 : -1; });
    var br = brand.getBoundingClientRect();
    var hr = hero.getBoundingClientRect();
    var flr = flow.getBoundingClientRect();
    bar.classList.toggle('on-coral', (window.__flowFlood || 0) > .35 && flr.top <= 56 && flr.bottom > 56);
    bar.classList.toggle('on-night', (br.top <= 56 && br.bottom > 56) || (hr.top <= 56 && hr.bottom > 56));
  }
  // FLOW: one ScrollTrigger walks the camera across the storyboard; each step builds as it reaches centre
  var flowAPI = (function () {
    var ft = $('ftrack'), art = $('fart'), G = gsap;
    var W = +ft.dataset.w, GAP = +ft.dataset.g, PL = ft.dataset.pl.split(',').map(Number), PR = ft.dataset.pr.split(',').map(Number), OB = JSON.parse(ft.dataset.ob);
    var bars = $('flow-bars').children, threads = art.querySelectorAll('.fthread'), lis = ft.querySelectorAll('.fsteps li');
    var q = function (s) { return art.querySelectorAll(s); };
    var org = function (b, fx, fy) { return (b[0] + (b[2] - b[0]) * fx) + ' ' + (b[1] + (b[3] - b[1]) * fy); };
    threads.forEach(function (t) { var l = t.getTotalLength(); t.style.strokeDasharray = l + ' ' + l; t.style.strokeDashoffset = l; t._l = l; });
    var tl = [];
    for (var k = 0; k < 6; k++) (function (k) {
      var t = G.timeline({ paused: true, defaults: { ease: 'back.out(1.7)', duration: .4 } });
      var key = function (o) { return '[data-o="' + k + '-' + o + '"]'; };
      t.from(lis[k], { y: 28, opacity: 0, duration: .35, ease: 'power2.out' }, 0);
      if (OB[k + '-arrow']) t.from(q(key('arrow')), { x: -36, opacity: 0, duration: .25, ease: 'power2.out' }, 0);
      if (OB[k + '-blob']) t.from(q(key('blob')), { scale: 0, svgOrigin: org(OB[k + '-blob'], .5, .55), duration: .5 }, .05);
      var objs = Object.keys(OB).filter(function (o) { return o.indexOf(k + '-o') === 0 || o.indexOf(k + '-k') === 0; }).sort(function (a, b) { return OB[a][0] - OB[b][0]; });
      objs.forEach(function (o, i) { var card = o.charAt(2) === 'k'; t.from(q(key(o.slice(2))), { scale: card ? .15 : .3, opacity: 0, rotation: card ? (i % 2 ? 70 : -70) : (i % 2 ? 8 : -8), svgOrigin: org(OB[o], .5, .5), duration: card ? .45 : .35 }, .22 + i * (.3 / Math.max(1, objs.length))); });
      var cb = OB[k + '-char'];
      if (cb) t.from(q(key('char')), k === 5 ? { scale: .2, opacity: 0, svgOrigin: org(cb, .2, 1), duration: .45 } : { scaleY: .1, scaleX: .6, opacity: 0, svgOrigin: org(cb, .5, 1), duration: .45, ease: 'back.out(2.2)' }, .4);
      tl.push(t);
    })(k);
    var tw, hover;
    if (!reduce) {
      for (var k = 0; k < 6; k++) {
        if (OB[k + '-char']) tw = G.to(q('[data-o="' + k + '-char"]'), k === 5 ? { x: 10, y: -14, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 } : { y: -5, duration: .9 + k * .13, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: k * .2 });
      }
      hover = tw;
      // 01 the mess never settles: cards drift on their own paths, the motion ticks buzz
      Object.keys(OB).forEach(function (o) {
        if (o.indexOf('0-o') === 0 && o !== '0-o299' && o !== '0-o157' && o !== '0-o163') G.to(q('[data-o="' + o + '"]'), { x: 'random(-3, 3)', y: 'random(-3, 3)', duration: .12, ease: 'none', repeat: -1, repeatRefresh: true, repeatDelay: .05 });
      });
      var pile = Object.keys(OB).filter(function (o) { return (o.indexOf('0-k') === 0 && o !== '0-kchat') || o === '0-o299'; }).map(function (o) { return '[data-o="' + o + '"]'; }).join(',');
      G.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
        .to(q(pile), { x: 7, y: -12, duration: 1.2 })
        .to(q(pile), { x: -6, y: -4, duration: 1.1 });
      G.to(q('[data-o="0-kchat"]'), { x: -5, y: -9, duration: .8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      G.to(q('[data-o="0-o157"],[data-o="0-o163"]'), { opacity: .2, duration: .3, ease: 'steps(1)', yoyo: true, repeat: -1, repeatDelay: .4 });
      G.to(q('[data-o="0-char"]'), { rotation: 4, svgOrigin: org(OB['0-char'], .5, 1), duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      q('.gold').forEach(function (g, i) { G.to(g, { opacity: .45, duration: .6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .21 }); });
    }
    var vw0 = function () { return window.innerWidth; };
    var rkfly = art.querySelector('#rkfly');
    var flowHead = document.querySelector('.flow-head .in') || document.querySelector('.flow-head');
    var puffs = q('[data-o="5-o282"],[data-o="5-o998"],[data-o="5-o34"],[data-o="5-o145"]');
    function puff(v) { puffs.forEach(function (el) { el.style.fillOpacity = v; }); }
    var rocket = q('[data-o="5-char"]'); var s = 1, start = 0, maxX = 0, vw = 0, lastIdx = 0, f = 1, flood = $('fflood'), tr = 0;
    function layout() {
      // size the drawing to the room left under the heading
      var head = document.querySelector('.flow-head').getBoundingClientRect(), stTop = ft.parentNode.getBoundingClientRect().top;
      // keep 40px between the intro copy and the top of the step titles
      var fs = ft.querySelector('.fsteps'), mb = parseFloat(getComputedStyle(fs).marginBottom) || 0, bot = parseFloat(getComputedStyle(ft).bottom) || 0;
      var room = window.innerHeight - (head.bottom - stTop) - bot - mb - 40;
      var ratio = 1 + (vw0() < 641 ? 190 : 170) / 496;
      if (!reduce) ft.style.setProperty('--H', Math.max(220, Math.min(560, window.innerWidth * 1.18, room / ratio)).toFixed(1) + 'px');
      vw = window.innerWidth; s = art.getBoundingClientRect().height / 496;
      start = vw / 2 - (PR[0] - PL[0]) * s / 2 - 20 * s;                 // first step centred
      var lastC = (PL[5] + PR[5]) / 2 + 5 * GAP;
      maxX = lastC * s - vw / 2 + start;                                  // last step centred
      tr = Math.max(0, maxX) * 1.25; var extra = window.innerHeight * .9; f = tr / (tr + extra);
      if (!reduce) flow.style.height = (window.innerHeight + tr + extra) + 'px';
    }
    function render(pAll) {
      var p = reduce ? 1 : Math.min(1, pAll / f), fl = reduce ? 0 : seg(pAll, f + .02, .97);
      // 06 ship it: coral floods the whole page from the rocket
      var x = reduce ? 0 : -start + p * maxX;
      ft.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
      window.__flowFlood = fl;
      if (fl > 0) {
        var fr = flood.getBoundingClientRect(), x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
        var ar = art.getBoundingClientRect(), cb = OB['5-char'];
        var fx = ar.left + ((cb[0] + cb[2]) / 2 + 5 * GAP) * s - fr.left, fy = ar.top + (cb[1] + cb[3]) / 2 * s - fr.top;
        // the rocket takes off as the colour floods in
        if (hover && !hover.paused()) hover.pause();
        var e = fl * fl;
        G.set(rkfly, { x: 520 * e, y: -760 * e });
        puff(Math.max(0, 1 - fl * 4).toFixed(3));   // the clouds go with her
        flood.style.setProperty('--fx', fx.toFixed(1) + 'px'); flood.style.setProperty('--fy', fy.toFixed(1) + 'px');
        var rr = fl * fl * Math.hypot(Math.max(fx, vw - fx), Math.max(fy, window.innerHeight - fy)) * 1.05;
        flood.style.setProperty('--r', rr.toFixed(1) + 'px');
        // the heading turns white once the coral has fully passed behind it
        var hb = flowHead.getBoundingClientRect(), hx = Math.max(Math.abs(hb.left - fr.left - fx), Math.abs(hb.right - fr.left - fx)), hy = Math.max(Math.abs(hb.top - fr.top - fy), Math.abs(hb.bottom - fr.top - fy));
        flow.classList.toggle('flooded', rr > Math.hypot(hx, hy));
      } else { flow.classList.remove('flooded'); flood.style.setProperty('--r', '0px'); puff(''); if (hover && hover.paused()) { G.set(rkfly, { x: 0, y: 0 }); hover.resume(); } }
      var idx = 1;
      for (var k = 0; k < 6; k++) {
        var left = (PL[k] + k * GAP) * s - x, c = (left + (PR[k] + k * GAP) * s - x) / 2;
        var pr = reduce ? 1 : (k === 0 ? 1 : seg(c, vw * .98, vw * .55));
        tl[k].progress(pr);
        if (pr > .5) idx = k + 1;
        if (k) { var th = threads[k - 1]; th.style.strokeDashoffset = th._l * (1 - (reduce ? 1 : seg(c, vw * 1.35, vw * .9))); }
      }
      if (idx !== lastIdx) { lastIdx = idx; setSeg('flow-count', idx + '/6'); for (var b = 0; b < bars.length; b++) bars[b].classList.toggle('on', b < idx); }
    }
    layout(); render(0);
    if (!reduce) {
      tl[0].progress(0);
      G.registerPlugin(ScrollTrigger);
      ScrollTrigger.addEventListener('refreshInit', layout);
      ScrollTrigger.create({ trigger: flow, start: 'top top', end: 'bottom bottom', scrub: .9, onUpdate: function (st) { render(st.progress); } });
      // step 01 builds as the section arrives
      ScrollTrigger.create({ trigger: flow, start: 'top 75%', end: 'top 5%', scrub: .6, onUpdate: function (st) { tl[0].progress(st.progress); }, onLeave: function () { tl[0].progress(1); } });
    } else render(1);
    return { layout: layout, render: render };
  })();
  var ticking = false;
  function frame() {
    ticking = false;
    heroFrame(prog(hero)); brandFrame(prog(brand)); barFrame();
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  frame();


  // Specs components: tick rows (the Specs section is not on the page right now)
  if ($('kp-ticks') && $('ts-scale')) (function () {
    var t = '', n = 60, lit = 42;
    for (var i = 0; i < n; i++) { var x = 1 + i * (298 / (n - 1)); t += '<line x1="' + x + '" x2="' + x + '" y1="1" y2="17" stroke="' + (i < lit ? '#FBFBFA' : '#3A3A37') + '" stroke-width="1.25"/>'; }
    $('kp-ticks').innerHTML = t;
    var u = '', m = 41;
    for (var j = 0; j < m; j++) { var xx = 1 + j * (298 / (m - 1)), tall = j % 5 === 0; u += '<line x1="' + xx + '" x2="' + xx + '" y1="' + (tall ? 8 : 16) + '" y2="36" stroke="#8E8E8A" stroke-width="1"/>'; }
    u += '<line x1="164" x2="164" y1="0" y2="44" style="stroke:var(--led)" stroke-width="2"/>';
    $('ts-scale').innerHTML = u;
  })();

  // product grid click-throughs
  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { var d = $(b.dataset.open); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); });
  });
  document.querySelectorAll('dialog.sheet').forEach(function (d) {
    d.querySelector('.close').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  $('copy').addEventListener('click', function () {
    var l = $('copy-l');
    if (navigator.clipboard) navigator.clipboard.writeText('scottgaletto@gmail.com').then(function () { l.textContent = 'copied'; setTimeout(function () { l.textContent = 'copy'; }, 1600); }, function () {});
  });
}
