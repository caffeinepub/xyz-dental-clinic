import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useBookAppointment } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

const SERVICES = [
  'Dental Implants',
  'Invisalign',
  'Laser Dentistry',
  'Pediatric Dentistry',
  'Smile Makeover',
  'Teeth Whitening',
  'Root Canal',
  'General Checkup',
];

export default function BookAppointmentDialog({ open, onOpenChange, defaultService }: BookAppointmentDialogProps) {
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [serviceType, setServiceType] = useState(defaultService || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const { actor, isFetching: actorLoading } = useActor();
  const bookAppointment = useBookAppointment();

  const isActorReady = !!actor && !actorLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !contactInfo || !preferredDate || !serviceType) return;
    if (!isActorReady) return;

    // Convert date string to nanoseconds (bigint)
    const dateMs = new Date(preferredDate).getTime();
    const dateNs = BigInt(Math.floor(dateMs)) * BigInt(1_000_000);

    try {
      const result = await bookAppointment.mutateAsync({
        patientName,
        contactInfo,
        preferredDate: dateNs,
        serviceType,
      });
      if (result) {
        setShowSuccess(true);
        setPatientName('');
        setContactInfo('');
        setPreferredDate('');
        setServiceType(defaultService || '');
      }
    } catch (_err) {
      // error is shown via bookAppointment.isError
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    bookAppointment.reset();
    onOpenChange(false);
  };

  const getErrorMessage = () => {
    if (!bookAppointment.error) return 'Something went wrong. Please try again.';
    const msg = (bookAppointment.error as Error).message || '';
    if (msg.includes('initializing')) return 'Service is still loading. Please wait a moment and try again.';
    if (msg.includes('Actor not available')) return 'Connection not ready. Please try again.';
    return 'Something went wrong. Please try again.';
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        style={{
          background: '#ffffff',
          border: '2px solid #000',
          borderRadius: '16px',
          maxWidth: '480px',
          width: '95vw',
          padding: '32px',
        }}
      >
        {showSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                marginBottom: '20px',
                animation: 'successPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              }}
            >
              <CheckCircle size={44} color="#fff" strokeWidth={2.5} />
            </div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#059669',
                marginBottom: '8px',
                animation: 'fadeSlideUp 0.4s ease 0.2s both',
              }}
            >
              Appointment Confirmed!
            </h2>
            <p
              style={{
                color: '#6b7280',
                fontSize: '15px',
                marginBottom: '28px',
                animation: 'fadeSlideUp 0.4s ease 0.35s both',
              }}
            >
              We've received your booking request. Our team will contact you shortly to confirm your appointment.
            </p>
            <button
              onClick={handleClose}
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 32px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                animation: 'fadeSlideUp 0.4s ease 0.5s both',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '4px',
                }}
              >
                Book an Appointment
              </DialogTitle>
              <DialogDescription style={{ color: '#64748b', fontSize: '14px' }}>
                Fill in your details and we'll confirm your appointment shortly.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1.5px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0ea5e9')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Phone / Email *
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={e => setContactInfo(e.target.value)}
                  placeholder="Phone number or email"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1.5px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0ea5e9')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1.5px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0ea5e9')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Service *
                </label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1.5px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {bookAppointment.isError && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#dc2626',
                    fontSize: '13px',
                  }}
                >
                  {getErrorMessage()}
                </div>
              )}

              {actorLoading && !bookAppointment.isPending && (
                <div
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#1d4ed8',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Loader2 size={14} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
                  Connecting to service, please wait...
                </div>
              )}

              <button
                type="submit"
                disabled={bookAppointment.isPending || actorLoading}
                style={{
                  background: (bookAppointment.isPending || actorLoading)
                    ? '#94a3b8'
                    : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '13px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: (bookAppointment.isPending || actorLoading) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px',
                  transition: 'background 0.2s',
                }}
              >
                {bookAppointment.isPending ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Booking...
                  </>
                ) : actorLoading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Loading...
                  </>
                ) : (
                  'Book Now'
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
