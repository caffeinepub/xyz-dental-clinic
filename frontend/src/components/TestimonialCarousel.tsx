import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useStaggeredTextReveal } from '../hooks/useStaggeredTextReveal';

const TESTIMONIALS = [
  { name: 'Ananya Kapoor', rating: 5, text: 'Dr. Sharma transformed my smile completely! The Invisalign treatment was painless and the results are stunning.', service: 'Invisalign' },
  { name: 'Rahul Mehta', rating: 5, text: 'Best dental clinic in the city. The staff is incredibly professional and the facilities are world-class.', service: 'Dental Implants' },
  { name: 'Priya Nair', rating: 5, text: 'My kids love coming here! The pediatric team makes every visit fun and stress-free.', service: 'Pediatric Dentistry' },
  { name: 'Vikram Singh', rating: 5, text: 'The laser whitening treatment gave me a Hollywood smile in just one session. Absolutely amazing!', service: 'Laser Dentistry' },
  { name: 'Sneha Patel', rating: 5, text: 'The smile makeover changed my life. I feel so much more confident now. Thank you Dr. Sharma!', service: 'Smile Makeover' },
  { name: 'Arjun Reddy', rating: 5, text: 'Exceptional care from start to finish. The implants look and feel completely natural.', service: 'Dental Implants' },
];

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const headingText = 'Patient Testimonials';
  const { ref: headingRef, wordElements } = useStaggeredTextReveal(headingText);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = 320 + 24;
    const totalWidth = cardWidth * TESTIMONIALS.length;

    const animate = () => {
      posRef.current += 0.5;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="testimonials" style={{ padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 24px' }}>
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          {wordElements.map(({ word, style }, i) => (
            <span key={i} style={style}>{word}</span>
          ))}
        </h2>
        <p style={{ color: '#64748b', fontSize: '17px' }}>
          Real stories from our happy patients
        </p>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              style={{
                width: '320px',
                flexShrink: 0,
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(14,165,233,0.12)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.7, marginBottom: '18px' }}>
                "{t.text}"
              </p>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{t.name}</div>
                <div style={{ color: '#0ea5e9', fontSize: '12px', marginTop: '2px' }}>{t.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
