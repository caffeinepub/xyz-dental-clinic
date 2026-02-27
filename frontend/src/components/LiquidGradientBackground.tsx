import React, { useEffect, useRef } from 'react';

export default function LiquidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

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
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      // Smooth lerp toward mouse
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.04;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const w = canvas.width;
      const h = canvas.height;

      // Base gradient
      const grad = ctx.createLinearGradient(
        w * (0.1 + mx * 0.3 + Math.sin(t) * 0.05),
        h * (0.0 + my * 0.2),
        w * (0.7 + mx * 0.3 + Math.cos(t * 0.7) * 0.05),
        h * (0.8 + my * 0.2)
      );

      grad.addColorStop(0, `hsl(${200 + mx * 20 + Math.sin(t) * 5}, 85%, ${92 + my * 4}%)`);
      grad.addColorStop(0.35, `hsl(${210 + my * 15 + Math.cos(t * 0.8) * 5}, 80%, ${88 + mx * 4}%)`);
      grad.addColorStop(0.65, `hsl(${195 + mx * 10 + Math.sin(t * 1.2) * 4}, 75%, ${90 + my * 3}%)`);
      grad.addColorStop(1, `hsl(${220 + my * 10 + Math.cos(t * 0.6) * 6}, 70%, ${94 + mx * 3}%)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soft radial blobs
      const blobs = [
        { x: 0.2 + mx * 0.3 + Math.sin(t * 0.9) * 0.08, y: 0.3 + my * 0.2 + Math.cos(t * 0.7) * 0.06, r: 0.35, h: 195 + mx * 20, s: 90, l: 75 },
        { x: 0.7 + mx * 0.2 + Math.cos(t * 1.1) * 0.07, y: 0.6 + my * 0.3 + Math.sin(t * 0.8) * 0.07, r: 0.3, h: 210 + my * 15, s: 85, l: 70 },
        { x: 0.5 + Math.sin(t * 0.6) * 0.1, y: 0.15 + Math.cos(t * 0.9) * 0.05, r: 0.25, h: 185 + mx * 15, s: 80, l: 80 },
      ];

      for (const blob of blobs) {
        const rg = ctx.createRadialGradient(
          blob.x * w, blob.y * h, 0,
          blob.x * w, blob.y * h, blob.r * Math.min(w, h)
        );
        rg.addColorStop(0, `hsla(${blob.h}, ${blob.s}%, ${blob.l}%, 0.45)`);
        rg.addColorStop(1, `hsla(${blob.h}, ${blob.s}%, ${blob.l}%, 0)`);
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
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
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
}
