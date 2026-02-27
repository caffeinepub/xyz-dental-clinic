import React, { useRef, useState, useEffect } from 'react';
import BookAppointmentDialog from './BookAppointmentDialog';
import MagneticButton from './MagneticButton';
import { useStaggeredTextReveal } from '../hooks/useStaggeredTextReveal';

export default function HeroSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const headingText = 'Your Perfect Smile Starts Here';
  const { ref: headingRef, wordElements } = useStaggeredTextReveal(headingText);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(2,20,50,0.82) 0%, rgba(5,40,80,0.70) 60%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />

      {/* Floating dental icon */}
      <img
        src="/assets/generated/tooth-float-icon.dim_96x96.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: '80px',
          height: '80px',
          opacity: 0.55,
          zIndex: 2,
          animation: 'floatBob 3.5s ease-in-out infinite',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 16px rgba(14,165,233,0.4))',
        }}
      />
      <img
        src="/assets/generated/dental-mirror-float-icon.dim_96x96.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '6%',
          width: '64px',
          height: '64px',
          opacity: 0.4,
          zIndex: 2,
          animation: 'floatBob 4.2s ease-in-out infinite 1s',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 12px rgba(6,182,212,0.35))',
        }}
      />
      <img
        src="/assets/generated/plus-float-icon.dim_96x96.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '4%',
          width: '48px',
          height: '48px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'floatBob 5s ease-in-out infinite 0.5s',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(14,165,233,0.2)',
            border: '1px solid rgba(14,165,233,0.4)',
            borderRadius: '100px',
            padding: '6px 20px',
            marginBottom: '20px',
            color: '#7dd3fc',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          ✦ Premium Dental Care
        </div>

        <h1
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          {wordElements.map(({ word, style }, i) => (
            <span key={i} style={style}>{word}</span>
          ))}
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '36px',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 36px',
          }}
        >
          World-class dental treatments with cutting-edge technology and compassionate care.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticButton>
            <button
              onClick={() => setDialogOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '16px 36px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(14,165,233,0.4)',
                letterSpacing: '0.02em',
              }}
            >
              Book Now
            </button>
          </MagneticButton>

          <button
            onClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: '8px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            Our Services
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            marginTop: '56px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '5000+', label: 'Happy Patients' },
            { value: '15+', label: 'Years Experience' },
            { value: '98%', label: 'Success Rate' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
            animation: 'scrollPulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
