import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const threshold = 0;
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    // The below varibles are reset everytime scrollDir changes.
    let lastScrollY = window.pageYOffset;
    // Makes sure we request AnimationFrame for onScroll.
    let animationFrameRequested = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        animationFrameRequested = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      animationFrameRequested = false;
    };

    const onScroll = () => {
      if (!animationFrameRequested) {
        // Makes sure we are calculating offset before page got completely rendered.
        window.requestAnimationFrame(updateScrollDir);
        animationFrameRequested = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  return scrollDir;
};

export default useScrollDirection;
