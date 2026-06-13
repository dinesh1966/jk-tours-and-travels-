import { useEffect, useRef } from 'react';

export const useTilt = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const maxTilt = options.maxTilt || 10;
    const hasGlare = options.hasGlare || false;
    const maxGlare = options.maxGlare || 0.15;

    let glareWrap = null;
    let glareEl = null;

    if (hasGlare) {
      glareWrap = document.createElement('div');
      glareWrap.className = 'tilt-glare-wrap';
      glareWrap.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit;';
      glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare';
      glareEl.style.cssText = `position:absolute;top:50%;left:50%;width:200%;height:200%;transform:translate(-50%,-50%) rotate(180deg);background:linear-gradient(0deg,rgba(255,255,255,0) 0%,rgba(255,255,255,${maxGlare}) 100%);opacity:0;transition:opacity 0.3s ease;pointer-events:none;`;
      glareWrap.appendChild(glareEl);
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(glareWrap);
    }

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

      if (hasGlare && glareEl) {
        const angle = Math.atan2(mouseX, mouseY) * (180 / Math.PI);
        glareEl.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
        glareEl.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      if (hasGlare && glareEl) {
        glareEl.style.opacity = '0';
      }
      setTimeout(() => { el.style.transition = ''; }, 600);
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.15s ease';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
      if (glareWrap && el.contains(glareWrap)) {
        el.removeChild(glareWrap);
      }
    };
  }, [options.maxTilt, options.hasGlare, options.maxGlare]);

  return ref;
};
