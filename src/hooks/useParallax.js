import { useEffect } from 'react';

export const useParallax = (containerRef) => {
  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const heroFloats = hero.querySelectorAll('.hero-float');

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroFloats.forEach(float => {
        const speed = parseFloat(float.dataset.speed) || 0.03;
        const moveX = x * speed * 600;
        const moveY = y * speed * 600;
        float.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      const heroBg = document.getElementById('hero-bg-img');
      if (heroBg) {
        heroBg.style.transform = `scale(1.04) translate(${x * -15}px, ${y * -15}px)`;
      }
    };

    hero.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      heroFloats.forEach(float => {
        const speed = parseFloat(float.dataset.speed) || 0.03;
        float.style.transform = `translateY(${scrollY * speed * -2}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);
};
