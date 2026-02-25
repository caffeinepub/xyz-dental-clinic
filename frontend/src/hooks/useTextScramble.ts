import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useTextScramble(targetText: string) {
  const [displayText, setDisplayText] = useState(targetText);
  const elementRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            startScramble();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetText]);

  const startScramble = () => {
    const totalDuration = 1000; // ms
    const frameInterval = 40; // ms per frame
    const totalFrames = totalDuration / frameInterval;
    let frame = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const resolvedCount = Math.floor(progress * targetText.length);

      const scrambled = targetText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < resolvedCount) return char;
          return randomChar();
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        setDisplayText(targetText);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, frameInterval);
  };

  return { ref: elementRef, displayText };
}
