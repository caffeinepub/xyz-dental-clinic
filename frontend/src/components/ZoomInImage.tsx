import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ZoomInImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ZoomInImage({ src, alt, className = '', style }: ZoomInImageProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        width: '100%',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0.85)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.7s ease',
          width: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
