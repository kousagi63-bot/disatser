document.addEventListener('DOMContentLoaded', function () {

  // ===== PARTICLES =====
  const container = document.querySelector('.hero-particles');
  if (container) {
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 4 + 2) + 'px';
      p.style.height = p.style.width;
      p.style.animationDelay = (Math.random() * 5) + 's';
      p.style.animationDuration = (Math.random() * 4 + 3) + 's';
      container.appendChild(p);
    }
  }

  // ===== FLOATING HERO ICONS =====
  const hero = document.querySelector('.hero');
  if (hero) {
    const symbols = [
      'fa-shield-halved', 'fa-bell', 'fa-truck-medical', 'fa-kit-medical',
      'fa-heart-pulse', 'fa-house-tsunami', 'fa-volcano', 'fa-wind',
      'fa-fire', 'fa-droplet', 'fa-triangle-exclamation', 'fa-tower-broadcast',
    ];
    for (let i = 0; i < 12; i++) {
      const icon = document.createElement('i');
      icon.className = 'fas ' + symbols[i % symbols.length] + ' hero-float-icon';
      icon.style.left = Math.random() * 100 + '%';
      icon.style.top = Math.random() * 100 + '%';
      icon.style.fontSize = (Math.random() * 2 + 1) + 'rem';
      icon.style.opacity = Math.random() * 0.04 + 0.02;
      icon.style.animation = (i % 2 === 0 ? 'float' : 'float-reverse') + ' ' + (Math.random() * 6 + 4) + 's ease-in-out infinite';
      icon.style.animationDelay = (Math.random() * 4) + 's';
      hero.appendChild(icon);
    }
  }

  // ===== MOBILE HAMBURGER =====
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
  }

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    const y = window.pageYOffset;
    if (y > 50) {
      header.style.background = 'rgba(6,9,20,0.95)';
      header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    } else {
      header.style.background = 'rgba(10,14,39,0.85)';
      header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    }
  });

  // ===== BACK TO TOP =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.pageYOffset > 400);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SCROLL REVEAL (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-card h3, .about-stat-mini h4');

  if (counters.length) {
    let counted = false;

    function animateCounters() {
      if (counted) return;
      counted = true;

      counters.forEach(function (el) {
        const raw = el.textContent.replace(/[^0-9.]/g, '');
        const target = parseFloat(raw);
        if (isNaN(target)) return;

        const hasDecimal = raw.includes('.');
        const isK = raw.includes('K') || raw.includes('k');
        const suffix = isK ? '+' : (el.textContent.includes('+') ? '+' : '');
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);

          if (hasDecimal) {
            el.textContent = current.toLocaleString() + suffix;
          } else if (isK) {
            el.textContent = (eased * target).toFixed(0) + '+' + suffix;
          } else {
            el.textContent = current.toLocaleString() + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = el.textContent.replace(/^0+/, '');
            if (!hasDecimal && !isK) el.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(update);
      });
    }

    function isInViewport(el) {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight - 50;
    }

    function checkCounters() {
      const first = document.querySelector('.stats-grid');
      if (first && isInViewport(first)) {
        animateCounters();
        window.removeEventListener('scroll', checkCounters);
      }
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters();
  }

  // ===== AUTH TABS (Login/Register) =====
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');

  if (authTabs.length) {
    authTabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.dataset.tab;
        authTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        authForms.forEach(function (f) { f.classList.remove('active'); });
        var form = document.getElementById(target + '-form');
        if (form) { form.classList.add('active'); }
      });
    });
  }

  // ===== PASSWORD TOGGLE =====
  document.querySelectorAll('.password-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const input = this.parentNode.querySelector('input');
      if (!input) return;
      const icon = this.querySelector('i');
      if (!icon) return;
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye-slash';
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      window.location.href = '404.html';
    });
  }

  // ===== NEWSLETTER FORM =====
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const btn = this.querySelector('button');
      if (input.value.trim()) {
        window.location.href = '404.html';
      }
    });
  });

  // ===== SCROLL VIDEO PARALLAX =====
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      heroVideo.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    });
  }

  // ===== HERO MOUSE PARALLAX =====
  const heroContent = document.querySelector('.hero-content');
  const heroAlert = document.querySelector('.hero-alert-card');

  if (heroContent && heroAlert && window.innerWidth > 768) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroContent.style.transform = 'translate(' + x * 0.3 + 'px, ' + y * 0.3 + 'px)';
      heroContent.style.transition = 'transform 0.1s ease';
      heroAlert.style.transform = 'translate(' + x * -0.2 + 'px, ' + y * -0.2 + 'px)';
      heroAlert.style.transition = 'transform 0.1s ease';
    });
  }

  // ===== SERVICE CARDS TILT =====
  document.querySelectorAll('.service-card').forEach(function (card) {
    if (window.innerWidth > 768) {
      card.addEventListener('mousemove', function (e) {
        const r = this.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const cx = r.width / 2;
        const cy = r.height / 2;
        const rotX = (y - cy) / cy * -8;
        const rotY = (x - cx) / cx * 8;
        this.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-8px)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHORS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== TIMELINE STAGGER REVEAL =====
  document.querySelectorAll('.timeline-item').forEach(function (item, i) {
    item.style.transitionDelay = (i * 0.15) + 's';
  });

  // ===== ALERT ITEM HOVER SOUND (visual only) =====
  document.querySelectorAll('.alert-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      this.style.borderLeft = '3px solid var(--primary)';
    });
    el.addEventListener('mouseleave', function () {
      this.style.borderLeft = '';
    });
  });

  // ===== TIMESTAMP UPDATER =====
  document.querySelectorAll('.alert-card .meta .time').forEach(function (el) {
    const m = Math.floor(Math.random() * 45) + 2;
    el.textContent = m + 'm ago';
  });

  console.log('%c DisasterGuard v2.0 ', 'background:#ff3b30;color:#fff;font-size:1.2rem;padding:8px 16px;border-radius:4px;font-weight:bold;');
  console.log('%c Stay Safe. Stay Informed. ', 'color:#ff9500;font-size:0.9rem;');
});
