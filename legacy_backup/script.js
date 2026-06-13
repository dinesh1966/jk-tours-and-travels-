/* ═══════════ JK Tours & Travels — 3D Interactive Script ═══════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Scroll Progress Bar ───
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
  });

  // ─── Sticky Header ───
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ─── Hamburger Menu ───
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('mobile-open');
    });
    navMenu.querySelectorAll('.nav-item a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // ─── Active Nav Item ───
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });

  // ─── 3D Tilt Effect for Cards ───
  function initTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
      const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
      const hasGlare = el.hasAttribute('data-tilt-glare');
      const maxGlare = parseFloat(el.dataset.tiltMaxGlare) || 0.15;

      // Add glare element if needed
      if (hasGlare) {
        const glareWrap = document.createElement('div');
        glareWrap.className = 'tilt-glare-wrap';
        glareWrap.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit;';
        const glareEl = document.createElement('div');
        glareEl.className = 'tilt-glare';
        glareEl.style.cssText = `position:absolute;top:50%;left:50%;width:200%;height:200%;transform:translate(-50%,-50%) rotate(180deg);background:linear-gradient(0deg,rgba(255,255,255,0) 0%,rgba(255,255,255,${maxGlare}) 100%);opacity:0;transition:opacity 0.3s ease;pointer-events:none;`;
        glareWrap.appendChild(glareEl);
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(glareWrap);
      }

      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
        const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

        if (hasGlare) {
          const glare = el.querySelector('.tilt-glare');
          if (glare) {
            const angle = Math.atan2(mouseX, mouseY) * (180 / Math.PI);
            glare.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
            glare.style.opacity = '1';
          }
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        if (hasGlare) {
          const glare = el.querySelector('.tilt-glare');
          if (glare) glare.style.opacity = '0';
        }
        setTimeout(() => { el.style.transition = ''; }, 600);
      });

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.15s ease';
      });
    });
  }
  initTilt();

  // ─── Hero Parallax on Mouse Move ───
  const heroFloats = document.querySelectorAll('.hero-float');
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroFloats.forEach(float => {
        const speed = parseFloat(float.dataset.speed) || 0.03;
        const moveX = x * speed * 600;
        const moveY = y * speed * 600;
        float.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      // Subtle parallax on hero background
      const heroBg = document.getElementById('hero-bg-img');
      if (heroBg) {
        heroBg.style.transform = `scale(1.04) translate(${x * -15}px, ${y * -15}px)`;
      }
    });
  }

  // ─── Destinations Carousel ───
  const destTrack = document.getElementById('destTrack');
  const destPrev = document.getElementById('destPrev');
  const destNext = document.getElementById('destNext');
  let destPosition = 0;

  if (destTrack && destPrev && destNext) {
    const getCardWidth = () => {
      const card = destTrack.querySelector('.dest-card');
      if (!card) return 260;
      return card.offsetWidth + 20; // gap
    };

    const getMaxScroll = () => {
      const totalWidth = destTrack.scrollWidth;
      const visibleWidth = destTrack.parentElement.offsetWidth;
      return Math.max(0, totalWidth - visibleWidth);
    };

    destNext.addEventListener('click', () => {
      const cardW = getCardWidth();
      const maxScroll = getMaxScroll();
      destPosition = Math.min(destPosition + cardW, maxScroll);
      destTrack.style.transform = `translateX(-${destPosition}px)`;
    });

    destPrev.addEventListener('click', () => {
      const cardW = getCardWidth();
      destPosition = Math.max(destPosition - cardW, 0);
      destTrack.style.transform = `translateX(-${destPosition}px)`;
    });
  }

  // ─── Scroll Reveal Animation ───
  function initReveal() {
    // Add reveal class to elements
    const revealTargets = [
      '.dest-card', '.package-card', '.service-item',
      '.why-choose', '.testimonials-mini', '.newsletter',
      '.section-header', '.hero-search-bar', '.stats-bar',
      // Hero section elements
      '.hero-content', '.hero-badges', '.hero-title', '.hero-desc', '.hero-actions', '.cta-btn', '.explore-pill'
    ];
    // Assign a unique incremental delay across all reveal elements
    let revealDelayIndex = 0;
    revealTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${revealDelayIndex * 0.05}s`;
        revealDelayIndex++;
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-3d').forEach(el => {
      observer.observe(el);
    });
  }
  initReveal();

  // ─── Counter Animation ───
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);

            if (target >= 1000) {
              el.textContent = (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'K';
            } else {
              el.textContent = current;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              if (target >= 1000) {
                el.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
              } else {
                el.textContent = target;
              }
            }
          }
          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
  animateCounters();

  // ─── Smooth Scroll for Nav Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // ─── 3D Card Hover Sound Effect (subtle scale pulse) ───
  document.querySelectorAll('.package-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.4);
        width: 100px; height: 100px;
        left: ${e.offsetX - 50}px; top: ${e.offsetY - 50}px;
        animation: rippleOut 0.6s ease-out forwards;
        pointer-events: none;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ─── Booking Capsule Interactive Fields ───
  const destField = document.getElementById('destinationField');
  const destSelect = document.getElementById('destSelect');
  const destPlaceholder = document.getElementById('destPlaceholder');
  if (destField && destSelect && destPlaceholder) {
    destField.addEventListener('click', (e) => {
      e.stopPropagation();
      try {
        destSelect.showPicker();
      } catch (err) {
        destSelect.click();
      }
    });
    destSelect.addEventListener('change', () => {
      destPlaceholder.textContent = destSelect.value;
      destPlaceholder.style.color = '#ffffff';
    });
  }

  const checkinField = document.getElementById('checkinField');
  const checkinInput = document.getElementById('checkinInput');
  const checkinPlaceholder = document.getElementById('checkinPlaceholder');
  if (checkinField && checkinInput && checkinPlaceholder) {
    checkinField.addEventListener('click', (e) => {
      e.stopPropagation();
      try {
        checkinInput.showPicker();
      } catch (err) {
        checkinInput.click();
      }
    });
    checkinInput.addEventListener('change', () => {
      if (checkinInput.value) {
        const date = new Date(checkinInput.value);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        checkinPlaceholder.textContent = date.toLocaleDateString('en-US', options);
        checkinPlaceholder.style.color = '#ffffff';
      }
    });
  }

  const checkoutField = document.getElementById('checkoutField');
  const checkoutInput = document.getElementById('checkoutInput');
  const checkoutPlaceholder = document.getElementById('checkoutPlaceholder');
  if (checkoutField && checkoutInput && checkoutPlaceholder) {
    checkoutField.addEventListener('click', (e) => {
      e.stopPropagation();
      try {
        checkoutInput.showPicker();
      } catch (err) {
        checkoutInput.click();
      }
    });
    checkoutInput.addEventListener('change', () => {
      if (checkoutInput.value) {
        const date = new Date(checkoutInput.value);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        checkoutPlaceholder.textContent = date.toLocaleDateString('en-US', options);
        checkoutPlaceholder.style.color = '#ffffff';
      }
    });
  }

  const travelersField = document.getElementById('travelersField');
  const travelersSelect = document.getElementById('travelersSelect');
  const travelersPlaceholder = document.getElementById('travelersPlaceholder');
  if (travelersField && travelersSelect && travelersPlaceholder) {
    travelersField.addEventListener('click', (e) => {
      e.stopPropagation();
      try {
        travelersSelect.showPicker();
      } catch (err) {
        travelersSelect.click();
      }
    });
    travelersSelect.addEventListener('change', () => {
      travelersPlaceholder.textContent = travelersSelect.value;
      travelersPlaceholder.style.color = '#ffffff';
    });
  }

  // ─── Parallax on Scroll for Floating Elements ───
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroFloats.forEach(float => {
      const speed = parseFloat(float.dataset.speed) || 0.03;
      float.style.transform = `translateY(${scrollY * speed * -2}px)`;
    });
  });

  // ─── Lazy Loading Background Image for Dest Banner ───
  const destBanner = document.querySelector('.dest-banner');
  if (destBanner) {
    if ('IntersectionObserver' in window) {
      const bannerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px 300px 0px' });
      bannerObserver.observe(destBanner);
    } else {
      destBanner.classList.add('loaded');
    }
  }

  // ─── Lazy Loading Hero Background Video ───
  window.addEventListener('load', () => {
    const video = document.getElementById('hero-bg-video');
    if (video) {
      const source = video.querySelector('source');
      if (source && source.dataset.src) {
        source.src = source.dataset.src;
        video.load();
        video.play().catch(err => console.log("Video autoplay deferred:", err));
      }
    }
  });

});
