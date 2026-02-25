import { useEffect, useRef, useState } from 'react';

const elements = [
  {
    src: '/assets/generated/tooth-float-icon.dim_96x96.png',
    alt: 'Floating tooth',
    style: { top: '8%', left: '2%' },
    animDelay: '0s',
    parallaxFactor: 0.08,
  },
  {
    src: '/assets/generated/dental-mirror-float-icon.dim_96x96.png',
    alt: 'Floating dental mirror',
    style: { top: '12%', right: '2%' },
    animDelay: '1.2s',
    parallaxFactor: 0.05,
  },
  {
    src: '/assets/generated/toothbrush-float-icon.dim_96x96.png',
    alt: 'Floating toothbrush',
    style: { bottom: '18%', left: '1.5%' },
    animDelay: '0.6s',
    parallaxFactor: 0.1,
  },
  {
    src: '/assets/generated/plus-float-icon.dim_96x96.png',
    alt: 'Floating plus',
    style: { bottom: '22%', right: '1.5%' },
    animDelay: '1.8s',
    parallaxFactor: 0.07,
  },
];

export default function FloatingDentalElements() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {elements.map((el, i) => (
        <img
          key={i}
          src={el.src}
          alt={el.alt}
          style={{
            position: 'absolute',
            ...el.style,
            width: 72,
            height: 72,
            opacity: 0.55,
            transform: `translateY(${scrollY * el.parallaxFactor}px)`,
            animation: `floatBob 4s ease-in-out ${el.animDelay} infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      ))}
    </div>
  );
}
