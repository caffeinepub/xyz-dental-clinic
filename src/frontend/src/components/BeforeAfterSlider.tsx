import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const PAIRS = [
  {
    label: "Teeth Whitening",
    before: "/assets/generated/before-whitening.dim_800x600.png",
    after: "/assets/generated/after-whitening.dim_800x600.png",
  },
  {
    label: "Braces Treatment",
    before: "/assets/generated/before-braces.dim_800x600.png",
    after: "/assets/generated/after-braces.dim_800x600.png",
  },
  {
    label: "Smile Makeover",
    before: "/assets/generated/smile-before-1.dim_800x500.png",
    after: "/assets/generated/smile-after-1.dim_800x500.png",
  },
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.95)";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    },
    [isDragging, updateSlider],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    },
    [isDragging, updateSlider],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const pair = PAIRS[activeTab];

  return (
    <section className="py-20 bg-gray-900" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Before & After
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Drag the slider to see the transformation. Real patients, real
            results.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {PAIRS.map((p, i) => (
            <button
              type="button"
              key={p.label}
              onClick={() => {
                setActiveTab(i);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === i
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden cursor-col-resize select-none"
          style={{ aspectRatio: "4/3" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* After image (full) */}
          <img
            src={pair.after}
            alt="After"
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
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${10000 / sliderPos}%`, maxWidth: "none" }}
              draggable={false}
            />
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <title>Drag handle</title>
                <path
                  d="M7 5L2 10L7 15M13 5L18 10L13 15"
                  stroke="#1e40af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
            BEFORE
          </div>
          <div className="absolute top-4 right-4 bg-blue-600/80 text-white text-xs font-bold px-3 py-1 rounded-full">
            AFTER
          </div>
        </div>
      </div>
    </section>
  );
}
