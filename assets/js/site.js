/* ════════════════════════════════════════════════════════════════
   Ali Hakimzadeh — site interactions
   DNA helix canvas · scroll reveals · scrollspy · counters · nav
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── Year ──────────────────────────────────────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Nav: scroll state + mobile toggle ─────────────── */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinksWrap = $('#navLinks');

  const onScrollNav = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScrollNav();

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  // close mobile menu when a link is chosen
  $$('#navLinks a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ── Scroll progress bar ───────────────────────────── */
  const progress = $('.scroll-progress span');
  const onScrollProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  };

  /* ── Cursor glow (pointer devices only) ────────────── */
  const glow = $('.cursor-glow');
  if (glow && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let raf = null, x = 0, y = 0;
    window.addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      glow.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        raf = null;
      });
    }, { passive: true });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  }

  /* ── Combined scroll listener ──────────────────────── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScrollNav(); onScrollProgress(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScrollProgress();

  /* ── Reveal on scroll ──────────────────────────────── */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ── Animated counters ─────────────────────────────── */
  const counters = $$('.stat__num');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1400; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(runCounter);

  /* ── Scrollspy (active nav link) ───────────────────── */
  const spyLinks = $$('.nav__links a[data-spy]');
  const sections = spyLinks.map((l) => document.getElementById(l.dataset.spy)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          spyLinks.forEach((l) => l.classList.toggle('active', l.dataset.spy === e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => sio.observe(s));
  }

  /* ════════════════════════════════════════════════════
     DNA double-helix canvas
     ════════════════════════════════════════════════════ */
  const canvas = $('#dnaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  const colA = [34, 211, 238];   // cyan
  const colB = [139, 92, 246];   // violet
  const colR = [52, 211, 153];   // emerald (rungs)

  const resize = () => {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    }, { passive: true });
  }

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const lerp = (a, b, t) => a + (b - a) * t;

  // Number of helix segments scales with height
  const NODES = 46;
  let t = 0;

  function drawHelix() {
    ctx.clearRect(0, 0, W, H);

    pointer.x = lerp(pointer.x, pointer.tx, 0.05);
    pointer.y = lerp(pointer.y, pointer.ty, 0.05);

    // Helix runs diagonally across the hero
    const cx = W * (0.62 + (pointer.x - 0.5) * 0.06);
    const amp = Math.min(W, H) * 0.17;
    const topY = -40;
    const botY = H + 40;
    const span = botY - topY;
    const turns = 3.0;
    const tilt = (pointer.y - 0.5) * 0.5;

    const pts = [];
    for (let i = 0; i <= NODES; i++) {
      const f = i / NODES;
      const y = topY + f * span;
      const ang = f * Math.PI * 2 * turns + t;
      const x1 = cx + Math.sin(ang) * amp + (f - 0.5) * W * 0.12 * tilt;
      const x2 = cx + Math.sin(ang + Math.PI) * amp + (f - 0.5) * W * 0.12 * tilt;
      // depth 0..1 for parallax/size (front strand bigger/brighter)
      const d1 = (Math.cos(ang) + 1) / 2;
      const d2 = (Math.cos(ang + Math.PI) + 1) / 2;
      pts.push({ y, x1, x2, d1, d2, f });
    }

    // Rungs (base pairs) — draw behind nodes
    for (let i = 0; i <= NODES; i++) {
      if (i % 2 !== 0) continue;
      const p = pts[i];
      const depth = (p.d1 + p.d2) / 2;
      ctx.strokeStyle = rgba(colR, 0.10 + depth * 0.28);
      ctx.lineWidth = 1 + depth * 1.2;
      ctx.beginPath();
      ctx.moveTo(p.x1, p.y);
      ctx.lineTo(p.x2, p.y);
      ctx.stroke();
    }

    // Strand backbones
    const drawBackbone = (key, col) => {
      ctx.beginPath();
      for (let i = 0; i <= NODES; i++) {
        const p = pts[i];
        if (i === 0) ctx.moveTo(p[key], p.y);
        else ctx.lineTo(p[key], p.y);
      }
      ctx.strokeStyle = rgba(col, 0.16);
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };
    drawBackbone('x1', colA);
    drawBackbone('x2', colB);

    // Nodes
    for (let i = 0; i <= NODES; i++) {
      const p = pts[i];
      // fade near top/bottom edges
      const edge = Math.min(1, Math.min(p.f, 1 - p.f) * 6);
      const node = (x, depth, col) => {
        const r = (1.4 + depth * 3.4);
        const a = (0.25 + depth * 0.75) * edge;
        const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, r * 3);
        g.addColorStop(0, rgba(col, a));
        g.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, p.y, r * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba([255, 255, 255], a * 0.9 * edge);
        ctx.beginPath(); ctx.arc(x, p.y, r * 0.5, 0, Math.PI * 2); ctx.fill();
      };
      node(p.x1, p.d1, colA);
      node(p.x2, p.d2, colB);
    }

    t += 0.006;
  }

  // Static single frame for reduced motion
  if (reduceMotion) { drawHelix(); return; }

  let rafId = null, visible = true;
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

  function loop() {
    if (visible) drawHelix();
    rafId = requestAnimationFrame(loop);
  }
  loop();
})();
