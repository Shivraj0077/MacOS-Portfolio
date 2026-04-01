import { useState, useEffect, useRef } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({
    winWidth: 1920,
    winHeight: 1080,
  });

  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      setSize({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
      ticking.current = false;
    };
    
    // Set actual size immediately after initial hydration
    update();

    const handleResize = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
