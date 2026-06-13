import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const revealTargets = [
      '.dest-card', '.package-card', '.service-item',
      '.why-choose', '.testimonials-mini', '.newsletter',
      '.section-header', '.hero-search-bar', '.stats-bar',
      '.hero-content', '.hero-badges', '.hero-title', '.hero-desc', '.hero-actions', '.cta-btn', '.explore-pill'
    ];
    
    let revealDelayIndex = 0;
    revealTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          el.style.transitionDelay = `${revealDelayIndex * 0.05}s`;
          revealDelayIndex++;
        }
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

    return () => {
      document.querySelectorAll('.reveal, .reveal-3d').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []); // Run once on mount or when content changes significantly. We might need to call this manually if routes change.
};
