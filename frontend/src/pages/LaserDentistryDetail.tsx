import React, { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import MagneticButton from '../components/MagneticButton';
import { ArrowLeft, CheckCircle, Zap } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function LaserDentistryDetail() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(20,5,50,0.88) 0%, rgba(40,5,80,0.78) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Laser beam decoration */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '2px',
            height: '60%',
            background: 'linear-gradient(to bottom, transparent, rgba(239,68,68,0.6), transparent)',
            transform: 'rotate(15deg)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              <div style={{ color: '#fca5a5', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Advanced Technology
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
                Laser Dentistry
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
                Experience painless, precise dental treatments using cutting-edge laser technology. Faster healing, minimal discomfort.
              </p>
              <MagneticButton>
                <button
                  onClick={() => setDialogOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
                  }}
                >
                  Book Now
                </button>
              </MagneticButton>
            </div>
            <div>
              <img
                src="/assets/generated/laser-dentistry-card.dim_600x400.png"
                alt="Laser Dentistry"
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginBottom: '40px', textAlign: 'center' }}>
            Benefits of Laser Dentistry
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Virtually Painless', desc: 'Laser treatments minimize discomfort compared to traditional methods.' },
              { title: 'Faster Healing', desc: 'Laser precision reduces trauma, leading to quicker recovery.' },
              { title: 'Reduced Bleeding', desc: 'Lasers cauterize as they cut, minimizing bleeding.' },
              { title: 'No Anesthesia Needed', desc: 'Many procedures can be done without local anesthesia.' },
              { title: 'Precise Treatment', desc: 'Targets only affected tissue, preserving healthy areas.' },
              { title: 'Sterilization', desc: 'Laser energy sterilizes the treatment area, reducing infection risk.' },
            ].map(b => (
              <div
                key={b.title}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(239,68,68,0.1)',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
              >
                <Zap size={22} color="#ef4444" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} defaultService="Laser Dentistry" />
    </div>
  );
}
