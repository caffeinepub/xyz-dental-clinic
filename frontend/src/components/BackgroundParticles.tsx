import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'tooth' | 'plus' | 'sparkle' | 'circle';
  opacity: number;
  drift: number;
}

const PARTICLE_COUNT = 18;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 20,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    type: (['tooth', 'plus', 'sparkle', 'circle'] as const)[Math.floor(Math.random() * 4)],
    opacity: 0.04 + Math.random() * 0.08,
    drift: (Math.random() - 0.5) * 60,
  }));
}

const ToothSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <path
      d="M12 2C9.5 2 7 4 7 7c0 1.5.5 3 1 4.5C8.5 13 9 15 9 17c0 2 1 4 3 4s3-2 3-4c0-2 .5-4 1-5.5.5-1.5 1-3 1-4.5C17 4 14.5 2 12 2z"
      fill="currentColor"
    />
  </svg>
);

const PlusSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const SparkleSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <path
      d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z"
      fill="currentColor"
    />
  </svg>
);

const CircleSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const particles = generateParticles();

export default function BackgroundParticles() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-float"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            color: 'var(--color-primary)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        >
          {p.type === 'tooth' && <ToothSVG size={p.size} opacity={p.opacity} />}
          {p.type === 'plus' && <PlusSVG size={p.size} opacity={p.opacity} />}
          {p.type === 'sparkle' && <SparkleSVG size={p.size} opacity={p.opacity} />}
          {p.type === 'circle' && <CircleSVG size={p.size} opacity={p.opacity} />}
        </div>
      ))}
    </div>
  );
}
