import React, { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import { useGetService } from '../hooks/useQueries';

export default function ServiceDetail() {
  const { serviceId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: service, isLoading } = useGetService(serviceId ?? '');

  const displayName =
    service?.displayName ||
    (serviceId ?? '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const description =
    service?.description || 'Professional dental care tailored to your needs.';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={() => navigate({ to: '/' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#0ea5e9',
              fontSize: '15px',
              fontWeight: 600,
              marginBottom: '32px',
              padding: 0,
            }}
          >
            <ArrowLeft size={18} /> Back to Home
          </button>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid rgba(14,165,233,0.2)',
                  borderTopColor: '#0ea5e9',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(14,165,233,0.15)',
                borderRadius: '20px',
                padding: '48px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              }}
            >
              {service?.featuredPhoto && (
                <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '32px' }}>
                  <img
                    src={service.featuredPhoto.getDirectURL()}
                    alt={displayName}
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                {displayName}
              </h1>
              <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.7, marginBottom: '36px' }}>
                {description}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '36px',
                }}
              >
                {['Expert Care', 'Modern Equipment', 'Comfortable Experience', 'Affordable Pricing'].map(
                  (feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle size={18} color="#0ea5e9" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#374151', fontSize: '14px', fontWeight: 500 }}>{feature}</span>
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 36px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(14,165,233,0.35)',
                }}
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService={displayName}
      />
    </div>
  );
}
