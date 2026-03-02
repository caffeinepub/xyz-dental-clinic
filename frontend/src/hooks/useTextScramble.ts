import { useState, useEffect, useRef } from 'react';

// Simplified: returns text immediately without scramble animation
export function useTextScramble(text: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayText] = useState(text);

  useEffect(() => {
    // no-op: text is shown immediately
  }, [text]);

  return { ref, displayText };
}
