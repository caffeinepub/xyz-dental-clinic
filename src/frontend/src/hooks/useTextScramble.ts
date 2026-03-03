import { useEffect, useRef, useState } from "react";

// Simplified: returns text immediately without scramble animation
export function useTextScramble(text: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayText] = useState(text);

  // no-op: text is shown immediately via useState initializer

  return { ref, displayText };
}
