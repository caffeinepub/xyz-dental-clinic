import React, { useState, useRef, useCallback, useEffect } from 'react';

interface SliderPair {
  before: string;
  after: string;
  label: string;
}

const STATIC_PAIRS: SliderPair[] = [
  {
    before: '/assets/generated/before-whitening.dim_800x600.png',
    after: '/assets/generated/after-whitening.dim_800x600.png',
    label: 'Teeth Whitening',
  },
  {
    before: '/assets/generated/before-braces.dim_800x600.png',
    after: '/assets/generated/after-braces.dim_800x600.png',
    label: 'Orthodontic Treatment',
  },
  {
    before: '/assets/generated/smile-before-1.dim_800x500.png',
    after: '/assets/generated/smile-after-1.dim_800x500.png',
    label: 'Smile Makeover',
  },
];

export default function BeforeAfterSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePair = STATIC_PAIRS[activeIndex];

  const getPositionFromEvent = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    return pct;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setSliderPos(getPositionFromEvent(e.clientX));
  }, [getPositionFromEvent]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setSliderPos(getPositionFromEvent(e.touches[0].clientX));
  }, [getPositionFromEvent]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setSliderPos(getPositionFromEvent(e.clientX));
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setSliderPos(getPositionFromEvent(e.touches[0].clientX));
    };
    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, getPositionFromEvent]);

  // Reset slider position when switching tabs
  useEffect(() => {
    setSliderPos(50);
  }, [activeIndex]);

  return (
    <section id="gallery" style={{ padding: '80px 0', background: 'rgba(248,250,252,0.8)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px' }}>📸</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before & After</span>
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
            Real Patient Transformations
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
            Drag the slider to reveal the stunning before and after results.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {STATIC_PAIRS.map((pair, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: activeIndex === i ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                background: activeIndex === i ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : '#fff',
                color: activeIndex === i ? '#fff' : '#64748b',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {pair.label}
            </button>
          ))}
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            border: '2px solid rgba(14,165,233,0.2)',
          }}
        >
          {/* After Image (full width, behind) */}
          <img
            src={activePair.after}
            alt="After"
            draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
          />

          {/* Before Image (clipped to left portion) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              transition: isDragging ? 'none' : 'clip-path 0.05s',
            }}
          >
            <img
              src={activePair.before}
              alt="Before"
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
          </div>

          {/* Divider Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              width: '3px',
              background: '#fff',
              boxShadow: '0 0 12px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          />

          {/* Drag Handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '48px',
              height: '48px',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              border: '3px solid #0ea5e9',
            }}
          >
            <span style={{ fontSize: '18px', color: '#0ea5e9', fontWeight: 700, letterSpacing: '-2px' }}>⇔</span>
          </div>

          {/* Labels */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none', backdropFilter: 'blur(4px)' }}>
            BEFORE
          </div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(14,165,233,0.85)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none', backdropFilter: 'blur(4px)' }}>
            AFTER
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '16px' }}>
          👆 Drag the slider left or right to compare
        </p>
      </div>
    </section>
  );
}
