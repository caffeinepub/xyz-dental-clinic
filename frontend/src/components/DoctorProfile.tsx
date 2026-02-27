import React from 'react';
import { useStaggeredTextReveal } from '../hooks/useStaggeredTextReveal';

export default function DoctorProfile() {
  const headingText = 'Meet Dr. Priya Sharma';
  const { ref: headingRef, wordElements } = useStaggeredTextReveal(headingText);

  return (
    <section
      id="doctor"
      style={{
        padding: '100px 24px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Photo */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-12px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.15))',
              borderRadius: '24px',
              zIndex: 0,
            }}
          />
          <img
            src="/assets/generated/doctor-profile.dim_600x800.png"
            alt="Dr. Priya Sharma"
            style={{
              width: '100%',
              maxWidth: '380px',
              borderRadius: '20px',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Info */}
        <div>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.25)',
              borderRadius: '100px',
              padding: '5px 16px',
              marginBottom: '16px',
              color: '#0284c7',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Chief Dental Surgeon
          </div>

          <h2
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            style={{
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {wordElements.map(({ word, style }, i) => (
              <span key={i} style={style}>{word}</span>
            ))}
          </h2>

          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
            With over 15 years of experience in cosmetic and restorative dentistry, Dr. Sharma combines
            artistry with precision to deliver exceptional results. She trained at AIIMS Delhi and completed
            her fellowship in Cosmetic Dentistry at Harvard School of Dental Medicine.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {[
              { value: '5000+', label: 'Patients Treated' },
              { value: '15+', label: 'Years Experience' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0ea5e9' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Specialties */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Laser Dentistry', 'Smile Makeover'].map(tag => (
              <span
                key={tag}
                style={{
                  background: 'rgba(14,165,233,0.1)',
                  color: '#0284c7',
                  border: '1px solid rgba(14,165,233,0.2)',
                  borderRadius: '100px',
                  padding: '5px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
