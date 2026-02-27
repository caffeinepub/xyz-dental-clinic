import React, { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
}

export default function LiquidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create blobs
    const blobs: Blob[] = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 0.45, color: 'rgba(56, 189, 248, 0.28)', phase: 0, speed: 0.8 },
      { x: 0.7, y: 0.6, vx: -0.0002, vy: 0.0003, radius: 0.4, color: 'rgba(14, 165, 233, 0.22)', phase: 1.2, speed: 0.6 },
      { x: 0.5, y: 0.2, vx: 0.0001, vy: -0.0002, radius: 0.35, color: 'rgba(186, 230, 253, 0.3)', phase: 2.4, speed: 1.0 },
      { x: 0.8, y: 0.1, vx: -0.0003, vy: 0.0001, radius: 0.3, color: 'rgba(125, 211, 252, 0.25)', phase: 0.6, speed: 0.7 },
      { x: 0.1, y: 0.8, vx: 0.0002, vy: -0.0003, radius: 0.38, color: 'rgba(224, 242, 254, 0.35)', phase: 1.8, speed: 0.9 },
      { x: 0.6, y: 0.9, vx: -0.0001, vy: -0.0002, radius: 0.32, color: 'rgba(2, 132, 199, 0.18)', phase: 3.0, speed: 0.5 },
    ];

    let time = 0;

    const draw = () => {
      time += 0.008;

      // Smooth mouse lerp
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

      const w = canvas.width;
      const h = canvas.height;

      // Clear with very light base
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(240, 249, 255, 1)';
      ctx.fillRect(0, 0, w, h);

      // Draw blobs
      blobs.forEach((blob) => {
        // Animate position with sine waves
        const bx = (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.15 + mouseRef.current.x * 0.05) * w;
        const by = (blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.12 + mouseRef.current.y * 0.05) * h;
        const r = blob.radius * Math.min(w, h);

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, '0.1)'));
        grad.addColorStop(1, 'rgba(240, 249, 255, 0)');

        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Subtle wave overlay
      ctx.save();
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        for (let x = 0; x <= w; x += 10) {
          const y = h * 0.5 + Math.sin(x * 0.005 + time * 0.5 + i * 1.2) * h * 0.08;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(14, 165, 233, ${0.08 - i * 0.02})`;
        ctx.fill();
      }
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
