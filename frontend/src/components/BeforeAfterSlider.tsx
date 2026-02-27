import React, { useState, useRef, useCallback, useEffect } from 'react';

const pairs = [
  {
    id: 1,
    label: 'Braces Treatment',
    before: '/assets/generated/before-braces.dim_800x600.png',
    after: '/assets/generated/after-braces.dim_800x600.png',
  },
  {
    id: 2,
    label: 'Teeth Whitening',
    before: '/assets/generated/before-whitening.dim_800x600.png',
    after: '/assets/generated/after-whitening.dim_800x600.png',
  },
  {
    id: 3,
    label: 'Smile Makeover',
    before: '/assets/generated/smile-before-1.dim_800x500.png',
    after: '/assets/generated/smile-after-1.dim_800x500.png',
  },
];

function SingleSlider({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.touches[0].clientX);
    };
    const stopDrag = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'col-resize',
        userSelect: 'none',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        border: '2px solid rgba(14,165,233,0.2)',
      }}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt="After"
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Before image (clipped) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={before}
          alt="Before"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </div>

      {/* Divider line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: 'translateX(-50%)',
          width: '3px',
          background: '#fff',
          boxShadow: '0 0 12px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }}
      >
        {/* Handle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #0ea5e9',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 4L17 10L13 16" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(0,0,0,0.65)',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        BEFORE
      </div>
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(14,165,233,0.85)',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        AFTER
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="gallery" style={{ padding: '80px 0', background: 'rgba(248,250,252,0.8)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: '20px',
              padding: '6px 16px',
              marginBottom: '16px',
            }}
          >
            <span style={{ fontSize: '14px' }}>📸</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Before & After
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 12px 0',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Real Patient Transformations
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
            Drag the slider to reveal the stunning before and after results.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {pairs.map((pair, i) => (
            <button
              key={pair.id}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: activeTab === i ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                background: activeTab === i ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : '#fff',
                color: activeTab === i ? '#fff' : '#64748b',
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

        <SingleSlider
          key={activeTab}
          before={pairs[activeTab].before}
          after={pairs[activeTab].after}
        />

        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '16px' }}>
          👆 Drag the slider left or right to compare
        </p>
      </div>
    </section>
  );
}
