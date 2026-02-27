import React, { useEffect, useRef } from 'react';

const DENTAL_EMOJIS = ['🦷', '✨', '💎', '🌟', '⭐'];

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const activeRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    activeRef.current = true;

    function createParticle(): Particle {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
      el.style.userSelect = 'none';
      el.style.zIndex = '-1';

      const size = Math.random() * 16 + 10;
      el.style.fontSize = `${size}px`;
      el.style.lineHeight = '1';
      el.textContent = DENTAL_EMOJIS[Math.floor(Math.random() * DENTAL_EMOJIS.length)];

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = '0';

      container!.appendChild(el);

      return {
        el,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        opacity: 0,
        size,
        life: 0,
        maxLife: Math.random() * 200 + 150,
      };
    }

    function removeParticle(p: Particle) {
      if (p.el.parentNode) {
        p.el.parentNode.removeChild(p.el);
      }
    }

    let frameCount = 0;

    function animate() {
      if (!activeRef.current) return;

      frameCount++;

      // Spawn new particle occasionally (max 12 at a time)
      if (frameCount % 40 === 0 && particlesRef.current.length < 12) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const halfLife = p.maxLife / 2;
        if (p.life < halfLife) {
          p.opacity = (p.life / halfLife) * 0.25;
        } else {
          p.opacity = ((p.maxLife - p.life) / halfLife) * 0.25;
        }

        p.el.style.left = `${p.x}px`;
        p.el.style.top = `${p.y}px`;
        p.el.style.opacity = `${p.opacity}`;

        if (p.life >= p.maxLife) {
          removeParticle(p);
          return false;
        }
        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      particlesRef.current.forEach(removeParticle);
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}
