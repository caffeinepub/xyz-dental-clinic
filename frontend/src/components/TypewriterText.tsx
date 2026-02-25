import React, { useEffect, useState, useRef, ElementType } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  tag?: ElementType;
}

export default function TypewriterText({
  text,
  className = '',
  speed = 30,
  tag: Tag = 'span',
}: TypewriterTextProps) {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>();
  const [displayed, setDisplayed] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (isVisible && !started.current) {
      started.current = true;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isVisible, text, speed]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {started.current ? displayed : <span style={{ opacity: 0 }}>{text}</span>}
    </Tag>
  );
}
