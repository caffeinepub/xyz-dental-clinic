import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllServices } from '../hooks/useQueries';
import { useStaggeredTextReveal } from '../hooks/useStaggeredTextReveal';

const SERVICE_ICONS: Record<string, string> = {
  'dental-implants': '/assets/generated/icon-implants.dim_256x256.png',
  'invisalign': '/assets/generated/icon-braces.dim_256x256.png',
  'laser-dentistry': '/assets/generated/laser-dentistry-card.dim_600x400.png',
  'pediatric-dentistry': '/assets/generated/pediatric-dentistry-icon.dim_600x400.png',
  'smile-makeover': '/assets/generated/magic-wand-sparkle.dim_300x200.png',
};

const STATIC_SERVICES = [
  { id: 'dental-implants', displayName: 'Dental Implants', description: 'Permanent tooth replacement with natural-looking implants.' },
  { id: 'invisalign', displayName: 'Invisalign', description: 'Clear aligners for a straighter smile without metal braces.' },
  { id: 'laser-dentistry', displayName: 'Laser Dentistry', description: 'Painless, precise treatments using advanced laser technology.' },
  { id: 'pediatric-dentistry', displayName: 'Pediatric Dentistry', description: 'Gentle, fun dental care designed especially for children.' },
  { id: 'smile-makeover', displayName: 'Smile Makeover', description: 'Complete smile transformation combining multiple treatments.' },
];

const GLOW_COLORS: Record<string, string> = {
  'dental-implants': 'rgba(14,165,233,0.35)',
  'invisalign': 'rgba(6,182,212,0.35)',
  'laser-dentistry': 'rgba(239,68,68,0.25)',
  'pediatric-dentistry': 'rgba(34,197,94,0.25)',
  'smile-makeover': 'rgba(168,85,247,0.25)',
};

export default function ServicesGrid() {
  const navigate = useNavigate();
  const { data: backendServices } = useGetAllServices();
  const headingText = 'Our Premium Services';
  const { ref: headingRef, wordElements } = useStaggeredTextReveal(headingText);

  const services = (backendServices && backendServices.length > 0) ? backendServices : STATIC_SERVICES;

  return (
    <section id="services" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
          {services.map(service => (
            <div
              key={service.id}
              onClick={() => navigate({ to: `/services/${service.id}` })}
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(14,165,233,0.15)',
                borderRadius: '16px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-10px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px ${GLOW_COLORS[service.id] || 'rgba(14,165,233,0.25)'}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <img
                  src={SERVICE_ICONS[service.id] || '/assets/generated/tooth-logo-icon.dim_64x64.png'}
                  alt={service.displayName}
                  style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '12px' }}
                />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                {service.displayName}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                {service.description}
              </p>
              <div style={{ marginTop: '16px', color: '#0ea5e9', fontSize: '13px', fontWeight: 600 }}>
                Learn More →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
