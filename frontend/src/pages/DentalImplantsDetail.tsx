import React, { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import MagneticButton from '../components/MagneticButton';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function DentalImplantsDetail() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(2,20,50,0.85) 0%, rgba(5,40,80,0.75) 100%)',
          overflow: 'hidden',
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
              <div style={{ color: '#7dd3fc', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Premium Service
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
                Dental Implants
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
                Permanent, natural-looking tooth replacements that restore your smile and confidence. Our state-of-the-art implants are designed to last a lifetime.
              </p>
              <MagneticButton>
                <button
                  onClick={() => setDialogOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(14,165,233,0.4)',
                  }}
                >
                  Book Now
                </button>
              </MagneticButton>
            </div>
            <div>
              <img
                src="/assets/generated/dental-implant-diagram.dim_600x400.png"
                alt="Dental Implant Diagram"
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
            Why Choose Dental Implants?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Permanent Solution', desc: 'Implants are designed to last a lifetime with proper care.' },
              { title: 'Natural Look & Feel', desc: 'Indistinguishable from natural teeth in appearance and function.' },
              { title: 'Bone Preservation', desc: 'Prevents bone loss that occurs with missing teeth.' },
              { title: 'No Adhesives', desc: 'No messy adhesives or removal required like dentures.' },
              { title: 'Easy Maintenance', desc: 'Care for them just like your natural teeth.' },
              { title: 'High Success Rate', desc: '98% success rate with our advanced implant technology.' },
            ].map(b => (
              <div
                key={b.title}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(14,165,233,0.12)',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
              >
                <CheckCircle size={22} color="#0ea5e9" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} defaultService="Dental Implants" />
    </div>
  );
}
