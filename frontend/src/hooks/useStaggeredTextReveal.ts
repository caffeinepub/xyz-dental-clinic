import { useRef, useState, useEffect } from 'react';

export function useStaggeredTextReveal(text: string) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  const wordElements = words.map((word, i) => ({
    word,
    style: {
      display: 'inline-block',
      marginRight: '0.3em',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
      transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.1}s`,
    } as React.CSSProperties,
  }));

  return { ref, wordElements, isVisible };
}
