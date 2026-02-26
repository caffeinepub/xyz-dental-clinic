import { useState, useRef, useCallback, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ImagePair {
  before: string;
  after: string;
  label?: string;
}

interface BeforeAfterSliderProps {
  staticPairs?: ImagePair[];
}

const DEFAULT_PAIRS: ImagePair[] = [
  {
    before: '/assets/generated/before-braces.dim_800x600.png',
    after: '/assets/generated/after-braces.dim_800x600.png',
    label: 'Orthodontic Treatment',
  },
  {
    before: '/assets/generated/before-whitening.dim_800x600.png',
    after: '/assets/generated/after-whitening.dim_800x600.png',
    label: 'Teeth Whitening',
  },
  {
    before: '/assets/generated/smile-before-1.dim_800x500.png',
    after: '/assets/generated/smile-after-1.dim_800x500.png',
    label: 'Smile Makeover',
  },
];

function SingleSlider({ pair }: { pair: ImagePair }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) updateSlider(e.touches[0].clientX);
    };
    const handleTouchEnd = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [updateSlider]);

  return (
    <div className="space-y-3">
      {pair.label && (
        <p className="text-center text-slate-600 font-medium text-sm">{pair.label}</p>
      )}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl cursor-ew-resize select-none"
        style={{ aspectRatio: '4/3' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After image (full) */}
        <img
          src={pair.after}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={pair.before}
            alt="Before treatment"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-teal-400">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
          Before
        </div>
        <div className="absolute bottom-3 right-3 bg-teal-600/80 text-white text-xs px-2 py-1 rounded-full z-20">
          After
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ staticPairs }: BeforeAfterSliderProps) {
  const pairs = staticPairs && staticPairs.length > 0 ? staticPairs : DEFAULT_PAIRS;
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-800 font-playfair mb-4">
              Before &amp; After Results
            </h2>
            <p className="text-slate-500 text-lg">
              Drag the slider to see the transformation
            </p>
          </div>

          {/* Pair selector tabs */}
          {pairs.length > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {pairs.map((pair, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeIndex === i
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pair.label || `Case ${i + 1}`}
                </button>
              ))}
            </div>
          )}

          <SingleSlider pair={pairs[activeIndex]} />

          <p className="text-center text-slate-400 text-xs mt-4">
            ← Drag to compare →
          </p>
        </div>
      </div>
    </section>
  );
}
