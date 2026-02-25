import React, { useRef, useState, useEffect } from 'react';
import { useGetAllBeforeAfterPairs } from '@/hooks/useQueries';

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  label?: string;
}

function SingleSlider({ beforeSrc, afterSrc, label }: SliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm text-muted-foreground text-center">{label}</p>}
      <div
        ref={containerRef}
        className="relative w-full h-64 rounded-2xl overflow-hidden cursor-ew-resize select-none"
        onMouseDown={(e) => { dragging.current = true; handleMove(e.clientX); }}
        onMouseMove={(e) => { if (dragging.current) handleMove(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => { dragging.current = true; handleMove(e.touches[0].clientX); }}
        onTouchMove={(e) => { if (dragging.current) handleMove(e.touches[0].clientX); }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        <img src={beforeSrc} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img
            src={afterSrc}
            alt="After"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${10000 / Math.max(sliderPos, 1)}%`, maxWidth: 'none' }}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
            <span className="text-primary font-bold text-sm">⇔</span>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">Before</div>
        <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">After</div>
      </div>
    </div>
  );
}

interface BeforeAfterSliderProps {
  staticPairs?: Array<{ beforeSrc: string; afterSrc: string; label?: string }>;
}

export default function BeforeAfterSlider({ staticPairs }: BeforeAfterSliderProps) {
  const { data: backendPairs } = useGetAllBeforeAfterPairs();

  const pairs: Array<{ beforeSrc: string; afterSrc: string; label?: string }> = [];

  if (backendPairs && backendPairs.length > 0) {
    backendPairs.forEach((p) => {
      pairs.push({
        beforeSrc: p.beforeImage.getDirectURL(),
        afterSrc: p.afterImage.getDirectURL(),
        label: p.description || undefined,
      });
    });
  } else if (staticPairs && staticPairs.length > 0) {
    pairs.push(...staticPairs);
  } else {
    pairs.push(
      { beforeSrc: '/assets/generated/before-whitening.dim_800x600.png', afterSrc: '/assets/generated/after-whitening.dim_800x600.png', label: 'Teeth Whitening' },
      { beforeSrc: '/assets/generated/before-braces.dim_800x600.png', afterSrc: '/assets/generated/after-braces.dim_800x600.png', label: 'Orthodontic Treatment' }
    );
  }

  return (
    <div id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            Before & After Transformations
          </h2>
          <p className="text-muted-foreground">Drag the slider to see real patient results</p>
        </div>
        <div className="space-y-8">
          {pairs.map((pair, i) => (
            <SingleSlider key={i} beforeSrc={pair.beforeSrc} afterSrc={pair.afterSrc} label={pair.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
