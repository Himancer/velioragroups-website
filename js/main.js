(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  // Mobile navigation
  if (toggle && nav) {
    const setNav = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });
  }

  // Header shadow on scroll
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Scroll reveal + animated counters
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.count) animateCount(el);
        else el.classList.add('visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
    counters.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Project filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filterBtns.forEach((btn) => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    projects.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) card.classList.add('visible');
    });
  }));

  // Contact form (posts to the endpoint in the form's action, e.g. Formspree)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const setStatus = (msg, type) => {
      status.textContent = msg;
      status.className = `form-status ${type}`;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const endpoint = form.getAttribute('action') || '';
      if (endpoint.includes('YOUR_FORM_ID')) {
        setStatus('Our online form is being set up. Please email us directly at info@velioragroups.com.', 'error');
        return;
      }
      submitBtn.disabled = true;
      setStatus('Sending...', '');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        setStatus('Thank you! Your message has been sent. Our team will get back to you shortly.', 'success');
      } catch {
        setStatus('Sorry, something went wrong. Please try again or email info@velioragroups.com.', 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();
