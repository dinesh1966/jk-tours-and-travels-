import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', updateScroll);
    // Initial call
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return progress;
};
