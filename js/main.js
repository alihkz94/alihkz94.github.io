/* =============================================================================
   main.js — Ali Hakimzadeh Academic Portfolio
   Dark Scientific Editorial Design
   ============================================================================= */

'use strict';

/* ─── AOS Init ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 60,
      delay: 0,
    });
  }

  initNav();
  initDNA();
  initPubFilters();
  initContactForm();
  setActiveNav();
});

/* ─── Navigation ─────────────────────────────────────────────────────────────── */
function initNav() {
  const nav       = document.querySelector('.site-nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!nav) return;

  // Scroll: add .scrolled class after 40px
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }
}

/* ─── Active nav link (page-based) ─────────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hFile = href.split('/').pop();
    if (
      hFile === path ||
      (path === 'index.html' && hFile === '') ||
      (path === '' && hFile === 'index.html')
    ) {
      a.classList.add('active');
    }
  });
}

/* ─── DNA Canvas Animation ──────────────────────────────────────────────────── */
function initDNA() {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, t = 0, rafId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Particle nodes floating as base-pair network
  const NODE_COUNT = 55;
  const LINK_DIST  = 140;
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * 1600,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  // Helix path params
  const HELIX_COLS = 3;

  function drawHelix(phase) {
    const amplitude = H * 0.22;
    const freq      = 0.012;
    const cx        = W / 2;
    const step      = 4;
    const helixOffset = 28;

    ctx.lineWidth = 2.5;

    for (let col = 0; col < HELIX_COLS; col++) {
      const xBase = (col + 0.5) * (W / HELIX_COLS);

      // Strand A
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 212, 200, 0.65)';
      for (let y = 0; y <= H; y += step) {
        const x = xBase + Math.sin(y * freq + phase + col * 2.1) * amplitude * 0.4;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Strand B
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      for (let y = 0; y <= H; y += step) {
        const x = xBase + Math.sin(y * freq + phase + col * 2.1 + Math.PI) * amplitude * 0.4;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Base pair rungs
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)';
      ctx.lineWidth = 1.8;
      for (let y = 0; y <= H; y += 20) {
        const xA = xBase + Math.sin(y * freq + phase + col * 2.1) * amplitude * 0.4;
        const xB = xBase + Math.sin(y * freq + phase + col * 2.1 + Math.PI) * amplitude * 0.4;
        ctx.beginPath();
        ctx.moveTo(xA, y);
        ctx.lineTo(xB, y);
        ctx.stroke();

        // Node dot at rung ends
        const bright = Math.sin(y * freq * 3 + phase * 2) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(xA, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 200, ${0.4 + bright * 0.45})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xB, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${0.3 + bright * 0.35})`;
        ctx.fill();
      }
    }
  }

  function drawNodes(ts) {
    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.pulse += 0.015;
    });

    // Draw links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.28;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 200, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * (1 + pulse * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + pulse * 0.4})`;
      ctx.fill();
    });
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, W, H);
    t = timestamp * 0.001;
    drawHelix(t);
    drawNodes(t);
    rafId = requestAnimationFrame(draw);
  }

  rafId = requestAnimationFrame(draw);

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(draw);
    }
  });
}

/* ─── Publications Filter ────────────────────────────────────────────────────── */
function initPubFilters() {
  const filters = document.querySelectorAll('.pub-filter');
  const cards   = document.querySelectorAll('.pub-card');
  if (!filters.length || !cards.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const status = card.dataset.status || 'published';
        if (filter === 'all' || status === filter) {
          card.style.display = '';
          // Re-trigger AOS if needed
          card.classList.remove('aos-animate');
          requestAnimationFrame(() => card.classList.add('aos-animate'));
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─── Contact Form ────────────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgEl = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name:    form.querySelector('[name="name"]')?.value || '',
      email:   form.querySelector('[name="email"]')?.value || '',
      subject: form.querySelector('[name="subject"]')?.value || '',
      message: form.querySelector('[name="message"]')?.value || '',
    };

    try {
      const res = await fetch('contactform/contactform.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showMsg(msgEl, 'Message sent — thank you! I will respond soon.', 'success');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showMsg(msgEl, 'Something went wrong. Please email ali.hakimzadeh@ut.ee directly.', 'error');
    } finally {
      btn.textContent = origText;
      btn.disabled = false;
    }
  });
}

function showMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = type;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}
