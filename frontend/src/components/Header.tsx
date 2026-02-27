import React, { useState, useEffect } from 'react';
import BookAppointmentDialog from './BookAppointmentDialog';
import MagneticButton from './MagneticButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(255,255,255,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: 0,
            }}
          >
            <img
              src="/assets/generated/tooth-logo-icon.dim_64x64.png"
              alt="Logo"
              style={{ width: '36px', height: '36px' }}
            />
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: scrolled ? '#0f172a' : '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              SmileCare
            </span>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden-mobile">
            {[
              { label: 'Services', id: 'services' },
              { label: 'Doctor', id: 'doctor' },
              { label: 'Testimonials', id: 'testimonials' },
              { label: 'Contact', id: 'contact' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: scrolled ? '#374151' : 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s',
                  padding: '4px 0',
                }}
              >
                {item.label}
              </button>
            ))}

            <MagneticButton>
              <button
                onClick={() => setDialogOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(14,165,233,0.35)',
                  letterSpacing: '0.02em',
                }}
              >
                Book Now
              </button>
            </MagneticButton>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: scrolled ? '#0f172a' : '#ffffff',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              padding: '16px 24px 24px',
            }}
          >
            {[
              { label: 'Services', id: 'services' },
              { label: 'Doctor', id: 'doctor' },
              { label: 'Testimonials', id: 'testimonials' },
              { label: 'Contact', id: 'contact' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#374151',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setDialogOpen(true); }}
              style={{
                marginTop: '16px',
                width: '100%',
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
