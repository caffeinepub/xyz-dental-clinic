import React, { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({ children, strength = 0.35, className, style }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
