import { useEffect, useRef, useState, RefObject } from 'react';

export function useStaggeredTextReveal(text: string, baseDelay = 0) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');
  const wordStyles = words.map((_, i) => ({
    display: 'inline-block',
    marginRight: '0.25em',
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.5s ease ${baseDelay + i * 80}ms, filter 0.5s ease ${baseDelay + i * 80}ms, transform 0.5s ease ${baseDelay + i * 80}ms`,
  }));

  return { containerRef: containerRef as RefObject<HTMLElement | null>, words, wordStyles, isVisible };
}
