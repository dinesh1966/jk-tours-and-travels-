import { useEffect, useRef } from 'react';

export const useCounter = (target, duration = 2000) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(target)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
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
          };
          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target, duration]);

  return ref;
};
