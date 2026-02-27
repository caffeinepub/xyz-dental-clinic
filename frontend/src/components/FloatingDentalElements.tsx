import React from 'react';

const floatingElements = [
  {
    src: '/assets/generated/tooth-float-icon.dim_96x96.png',
    alt: 'tooth',
    style: { top: '15%', left: '3%', width: 48, animationDelay: '0s' },
  },
  {
    src: '/assets/generated/toothbrush-float-icon.dim_96x96.png',
    alt: 'toothbrush',
    style: { top: '40%', right: '3%', width: 44, animationDelay: '1.2s' },
  },
  {
    src: '/assets/generated/dental-mirror-float-icon.dim_96x96.png',
    alt: 'dental mirror',
    style: { top: '70%', left: '2%', width: 40, animationDelay: '2.4s' },
  },
  {
    src: '/assets/generated/plus-float-icon.dim_96x96.png',
    alt: 'plus',
    style: { top: '25%', right: '5%', width: 36, animationDelay: '0.8s' },
  },
];

export default function FloatingDentalElements() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {floatingElements.map((el, i) => (
        <img
          key={i}
          src={el.src}
          alt={el.alt}
          style={{
            position: 'absolute',
            width: el.style.width,
            height: 'auto',
            opacity: 0.12,
            top: el.style.top,
            left: 'left' in el.style ? el.style.left : undefined,
            right: 'right' in el.style ? el.style.right : undefined,
            animation: `bob 4s ease-in-out infinite`,
            animationDelay: el.style.animationDelay,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -5,
          }}
        />
      ))}
    </div>
  );
}
