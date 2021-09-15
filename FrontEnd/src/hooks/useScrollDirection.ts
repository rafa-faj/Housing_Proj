import { useState, useEffect } from 'react';
const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<string>('up');
  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false; // flag to make sure we only run event listener once in every AnimationFrame

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir); // requestAnimationFrame makes sure we are calculating offset before page got completely rendered
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);
  return scrollDir;
};

export default useScrollDirection;
