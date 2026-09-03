(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  const themeToggle = $('#themeToggle');
  themeToggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const navbar = $('#navbar');
  const onScroll = () => {
    if (window.scrollY > 20) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');

    const backTop = $('#backTop');
    if (window.scrollY > 400) backTop?.classList.add('show');
    else backTop?.classList.remove('show');

    const sections = $$('section[id]');
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      const id = sec.id;
      const link = $(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });
  $$('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  $('#backTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));

  const form = $('#contactForm');
  const formMsg = $('#formMsg');
  form?.addEventListener('submit', async (e) => {
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn ? btn.innerHTML : '';
    e.preventDefault();

    try {
      const keyInput = form.querySelector('input[name="access_key"]');
      const accessKey = keyInput ? keyInput.value : '';
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        showMsg(form, formMsg,
          '⚠️ Not set up yet! Go to https://web3forms.com, click "Create Your Form" — enter your email noahschallehn6@gmail.com to get a free Access Key. Then paste the key into index.html where it says YOUR_ACCESS_KEY_HERE.',
          true);
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Sending...';
        btn.classList.add('btn-loading');
      }

      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      const json = await res.json();

      if (res.ok && json.success) {
        showMsg(form, formMsg,
          '✅ Thanks! Your message was sent. We\'ll get back to you within 24 hours.');
        form.reset();
      } else {
        showMsg(form, formMsg,
          '❌ ' + (json.message || 'Something went wrong. Please email us directly at noahschallehn6@gmail.com.'),
          true);
      }
    } catch (err) {
      showMsg(form, formMsg,
        '❌ Network error — check your connection and try again.', true);
    } finally {
      if (btn) {
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
          btn.classList.remove('btn-loading');
        }, 1200);
      }
    }
  });

  function showMsg(formEl, msgEl, text, isError = false) {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.classList.toggle('is-error', !!isError);
    msgEl.classList.add('show');
    setTimeout(() => msgEl.classList.remove('show'), 12000);
  }
})();
