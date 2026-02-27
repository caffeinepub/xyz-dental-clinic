import React, { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllServices } from '../hooks/useQueries';

const staticServices = [
  {
    id: 'dental-implants',
    displayName: 'Dental Implants',
    description: 'Permanent tooth replacement with titanium implants that look and feel natural.',
    icon: '/assets/generated/icon-implants.dim_256x256.png',
    route: '/services/dental-implants',
    accentColor: '#0ea5e9',
    bgColor: 'rgba(14,165,233,0.08)',
  },
  {
    id: 'invisalign',
    displayName: 'Invisalign',
    description: 'Clear aligners for a straighter smile without traditional metal braces.',
    icon: '/assets/generated/icon-braces.dim_256x256.png',
    route: '/services/invisalign',
    accentColor: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.08)',
  },
  {
    id: 'smile-makeover',
    displayName: 'Smile Makeover',
    description: 'Complete smile transformation combining multiple cosmetic procedures.',
    icon: '/assets/generated/icon-whitening.dim_256x256.png',
    route: '/services/smile-makeover',
    accentColor: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.08)',
  },
  {
    id: 'pediatric-dentistry',
    displayName: 'Pediatric Dentistry',
    description: 'Gentle, child-friendly dental care in a fun and welcoming environment.',
    icon: '/assets/generated/pediatric-dentistry-icon.dim_600x400.png',
    route: '/services/pediatric-dentistry',
    accentColor: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'laser-dentistry',
    displayName: 'Laser Dentistry',
    description: 'Advanced laser treatments for precise, painless dental procedures.',
    icon: '/assets/generated/icon-root-canal.dim_256x256.png',
    route: '/services/laser-dentistry',
    accentColor: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();
  const { data: backendServices } = useGetAllServices();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = staticServices.map((s) => {
    const backend = backendServices?.find((b) => b.id === s.id);
    return backend
      ? { ...s, displayName: backend.displayName, description: backend.description }
      : s;
  });

  // CSS-based staggered reveal using IntersectionObserver (no GSAP needed)
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLDivElement;
            const index = cards.indexOf(card);
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, index * 120);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Our Premium Services
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
            Advanced treatments tailored to give you the smile you deserve.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => navigate({ to: service.route })}
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${service.accentColor}22`,
                borderRadius: '16px',
                padding: '28px 24px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                opacity: 0,
                transform: 'translateY(50px) scale(0.95)',
                transition: 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-10px) scale(1)';
                el.style.boxShadow = `0 20px 40px ${service.accentColor}40`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0) scale(1)';
                el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: service.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  border: `1px solid ${service.accentColor}33`,
                }}
              >
                <img
                  src={service.icon}
                  alt={service.displayName}
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>
                {service.displayName}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                {service.description}
              </p>
              <div style={{ marginTop: '16px', color: service.accentColor, fontSize: '13px', fontWeight: 600 }}>
                Learn More →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
