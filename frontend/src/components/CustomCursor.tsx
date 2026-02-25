import { useEffect, useRef, useState } from 'react';
import { useCursorContext } from '../context/CursorContext';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const { cursorIcon } = useCursorContext();

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.15;
      current.current.y += (pos.current.y - current.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x - 20}px, ${current.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        pointerEvents: 'none',
        zIndex: 99998,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    >
      {cursorIcon === 'dental' ? (
        // Tooth SVG icon
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <ellipse cx="20" cy="14" rx="10" ry="9" fill="rgba(255,255,255,0.85)" stroke="#0d9488" strokeWidth="1.5"/>
          <path d="M10 14 Q10 28 14 32 Q16 36 18 32 Q19 28 20 28 Q21 28 22 32 Q24 36 26 32 Q30 28 30 14" fill="rgba(255,255,255,0.85)" stroke="#0d9488" strokeWidth="1.5"/>
          <circle cx="16" cy="12" r="2" fill="#0d9488" opacity="0.4"/>
          <circle cx="24" cy="12" r="2" fill="#0d9488" opacity="0.4"/>
        </svg>
      ) : (
        // Default medical cross + ripple
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <circle cx="20" cy="20" r="18" stroke="rgba(13,148,136,0.3)" strokeWidth="1" fill="none"/>
          <circle cx="20" cy="20" r="12" stroke="rgba(13,148,136,0.2)" strokeWidth="1" fill="none"/>
          <rect x="17" y="11" width="6" height="18" rx="2" fill="rgba(13,148,136,0.7)"/>
          <rect x="11" y="17" width="18" height="6" rx="2" fill="rgba(13,148,136,0.7)"/>
        </svg>
      )}
    </div>
  );
}
