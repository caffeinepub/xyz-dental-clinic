import React, { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import MagneticButton from '../components/MagneticButton';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function PediatricDentistryDetail() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(5,40,20,0.85) 0%, rgba(5,60,30,0.75) 100%)',
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
              <div style={{ color: '#86efac', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Kids Dental Care
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
                Pediatric Dentistry
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
                Gentle, fun, and stress-free dental care designed especially for children. We make every visit an adventure!
              </p>
              <MagneticButton>
                <button
                  onClick={() => setDialogOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
                  }}
                >
                  Book Now
                </button>
              </MagneticButton>
            </div>
            <div>
              <img
                src="/assets/generated/pediatric-dentistry-icon.dim_600x400.png"
                alt="Pediatric Dentistry"
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginBottom: '40px', textAlign: 'center' }}>
            Why Kids Love Us
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Child-Friendly Environment', desc: 'Colorful, fun waiting area with toys and games to ease anxiety.' },
              { title: 'Gentle Techniques', desc: 'Specially trained pediatric dentists who know how to work with kids.' },
              { title: 'Preventive Focus', desc: 'We emphasize prevention to build healthy habits from an early age.' },
              { title: 'Parent Education', desc: 'We guide parents on proper oral hygiene for their children.' },
            ].map(b => (
              <div
                key={b.title}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(34,197,94,0.12)',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
              >
                <Heart size={22} color="#22c55e" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} defaultService="Pediatric Dentistry" />
    </div>
  );
}
