import { useRef, useState, useEffect, useCallback } from 'react';
import { useGetAllBeforeAfterPairs } from '@/hooks/useQueries';

interface StaticPair {
  beforeImage: string;
  afterImage: string;
  description: string;
}

interface BeforeAfterSliderProps {
  staticPairs?: StaticPair[];
}

const DEFAULT_PAIRS: StaticPair[] = [
  {
    beforeImage: '/assets/generated/before-braces.dim_800x600.png',
    afterImage: '/assets/generated/after-braces.dim_800x600.png',
    description: 'Braces Treatment',
  },
  {
    beforeImage: '/assets/generated/before-whitening.dim_800x600.png',
    afterImage: '/assets/generated/after-whitening.dim_800x600.png',
    description: 'Teeth Whitening',
  },
];

function SingleSlider({
  beforeSrc,
  afterSrc,
  description,
}: {
  beforeSrc: string;
  afterSrc: string;
  description: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setSliderPos(getPos(e.clientX));
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      setSliderPos(getPos(e.touches[0].clientX));
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, getPos]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div
        ref={containerRef}
        className="relative select-none"
        style={{ aspectRatio: '4/3', cursor: isDragging ? 'ew-resize' : 'col-resize' }}
      >
        {/* After image (full width, behind) */}
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped to left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeSrc}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center z-10 border-2 border-teal-500"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <svg
            className="w-5 h-5 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l-4 3 4 3M16 9l4 3-4 3"
            />
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
          BEFORE
        </div>
        <div className="absolute top-3 right-3 bg-teal-600/90 text-white text-xs font-semibold px-2 py-1 rounded">
          AFTER
        </div>
      </div>
      <div className="bg-white px-4 py-2 text-center text-sm font-medium text-gray-700">
        {description}
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ staticPairs }: BeforeAfterSliderProps) {
  const { data: backendPairs } = useGetAllBeforeAfterPairs();

  const pairs: StaticPair[] =
    backendPairs && backendPairs.length > 0
      ? backendPairs.map((p) => ({
          beforeImage: p.beforeImage.getDirectURL(),
          afterImage: p.afterImage.getDirectURL(),
          description: p.description,
        }))
      : staticPairs && staticPairs.length > 0
      ? staticPairs
      : DEFAULT_PAIRS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pairs.map((pair, i) => (
        <SingleSlider
          key={i}
          beforeSrc={pair.beforeImage}
          afterSrc={pair.afterImage}
          description={pair.description}
        />
      ))}
    </div>
  );
}
