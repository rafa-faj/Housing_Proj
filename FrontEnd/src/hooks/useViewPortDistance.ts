import { useState, useEffect } from 'react';

const useViewPortDistance = (className: string) => {
  const [windowHeight, setWindowHeight] = useState<number>();
  const [elementDistanceToTop, setElementDistanceToTop] = useState<number>();

  useEffect(() => {
    const reveal = () => {
      console.log("scroll triggered")
      var reveals = document.querySelectorAll(className);

      for (var i = 0; i < reveals.length; i++) {
        // Sets the viewport height.
        setWindowHeight(window.innerHeight);
        // Sets the distance of the element of interest from top of viewport.
        setElementDistanceToTop(reveals[i].getBoundingClientRect().top);
      }
    };

    window.addEventListener('scroll', reveal);

    return () => window.removeEventListener('scroll', reveal);
  }, [windowHeight, elementDistanceToTop]);

  return [windowHeight, elementDistanceToTop];
};

export default useViewPortDistance;
