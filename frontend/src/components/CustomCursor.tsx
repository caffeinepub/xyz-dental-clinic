import React, { useEffect, useRef, useState } from 'react';
import { useCursorContext } from '@/context/CursorContext';

export default function CustomCursor() {
  const posRef = useRef({ x: -100, y: -100 });
  const displayRef = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const { cursorIcon } = useCursorContext();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')
      ) {
        setIsHoveringInteractive(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')
      ) {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    const animate = () => {
      const ease = 0.12;
      displayRef.current.x += (posRef.current.x - displayRef.current.x) * ease;
      displayRef.current.y += (posRef.current.y - displayRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${displayRef.current.x}px, ${displayRef.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDental = cursorIcon === 'dental';
  const isExpanded = isHoveringInteractive && !isDental;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          width: isExpanded ? 64 : isDental ? 40 : 20,
          height: isExpanded ? 64 : isDental ? 40 : 20,
          borderRadius: '50%',
          background: isDental
            ? 'rgba(20, 184, 166, 0.15)'
            : isExpanded
            ? 'rgba(20, 184, 166, 0.25)'
            : 'rgba(255, 255, 255, 0.2)',
          border: `1.5px solid ${isDental ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.4)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
          backdropFilter: 'blur(2px)',
        }}
      >
        {isExpanded && !isDental && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.05em',
              userSelect: 'none',
            }}
          >
            View
          </span>
        )}
        {isDental && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C9.5 2 7 4 7 7c0 1.5.5 3 1 4.5C8.5 13 9 15 9 17c0 2 1 4 3 4s3-2 3-4c0-2 .5-4 1-5.5.5-1.5 1-3 1-4.5C17 4 14.5 2 12 2z"
              fill="rgba(20,184,166,0.8)"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
