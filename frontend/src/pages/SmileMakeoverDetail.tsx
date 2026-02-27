import React, { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import MagneticButton from '../components/MagneticButton';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function SmileMakeoverDetail() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(30,5,60,0.88) 0%, rgba(50,5,80,0.78) 100%)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <button
            onClick={() => navigate({ to: '/' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: '32px',
              fontSize: '14px',
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#d8b4fe', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Complete Transformation
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
                Smile Makeover
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
                A comprehensive smile transformation combining multiple treatments for a stunning, confidence-boosting result.
              </p>
              <MagneticButton>
                <button
                  onClick={() => setDialogOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(168,85,247,0.4)',
                  }}
                >
                  Book Now
                </button>
              </MagneticButton>
            </div>
            <div>
              <img
                src="/assets/generated/smile-makeover-banner.dim_1200x500.png"
                alt="Smile Makeover"
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginBottom: '40px', textAlign: 'center' }}>
            Real Transformations
          </h2>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Treatments */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>
            What's Included
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Teeth Whitening', desc: 'Professional whitening for a brighter, whiter smile.' },
              { title: 'Veneers', desc: 'Thin porcelain shells that cover imperfections.' },
              { title: 'Bonding', desc: 'Repair chips, cracks, and gaps with tooth-colored resin.' },
              { title: 'Gum Contouring', desc: 'Reshape your gum line for a more balanced smile.' },
            ].map(t => (
              <div
                key={t.title}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(168,85,247,0.12)',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
              >
                <Sparkles size={22} color="#a855f7" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{t.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} defaultService="Smile Makeover" />
    </div>
  );
}
