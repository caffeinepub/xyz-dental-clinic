import React, { useState } from 'react';
import { X, CheckCircle, Calendar, User, Phone, Stethoscope } from 'lucide-react';
import { useBookAppointment } from '../hooks/useQueries';

interface BookAppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  preselectedService?: string;
}

const SERVICES = [
  'Invisalign',
  'Dental Implants',
  'Laser Dentistry',
  'Pediatric Dentistry',
  'Smile Makeover',
  'General Checkup',
  'Teeth Whitening',
  'Root Canal',
  'Other',
];

export default function BookAppointmentDialog({
  isOpen,
  onClose,
  defaultService,
  preselectedService,
}: BookAppointmentDialogProps) {
  const initialService = preselectedService || defaultService || '';
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bookAppointment = useBookAppointment();

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName.trim()) newErrors.patientName = 'Name is required';
    if (!contactInfo.trim()) newErrors.contactInfo = 'Contact info is required';
    if (!preferredDate) newErrors.preferredDate = 'Date is required';
    if (!serviceType) newErrors.serviceType = 'Please select a service';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dateMs = new Date(preferredDate).getTime();
      const dateNs = BigInt(dateMs) * BigInt(1_000_000);

      await bookAppointment.mutateAsync({
        patientName: patientName.trim(),
        contactInfo: contactInfo.trim(),
        preferredDate: dateNs,
        serviceType,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  const handleClose = () => {
    setPatientName('');
    setContactInfo('');
    setPreferredDate('');
    setServiceType(initialService);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} style={{ color: '#16a34a', margin: '0 auto 1rem' }} />
            <h2 style={{ color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Appointment Booked!
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Thank you, {patientName}! We'll confirm your appointment shortly.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#1e40af',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Book an Appointment
            </h2>
            <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Fill in your details and we'll get back to you soon.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Patient Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#333', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                  <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.patientName ? '1px solid #dc2626' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: '#1a1a1a',
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.patientName && (
                  <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.patientName}</p>
                )}
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#333', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                  <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Phone / Email
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Phone number or email"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.contactInfo ? '1px solid #dc2626' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: '#1a1a1a',
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.contactInfo && (
                  <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.contactInfo}</p>
                )}
              </div>

              {/* Preferred Date */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#333', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.preferredDate ? '1px solid #dc2626' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: '#1a1a1a',
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.preferredDate && (
                  <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.preferredDate}</p>
                )}
              </div>

              {/* Service Type */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#333', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                  <Stethoscope size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Service
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.serviceType ? '1px solid #dc2626' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: serviceType ? '#1a1a1a' : '#999',
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.serviceType}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={bookAppointment.isPending}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: bookAppointment.isPending ? '#93c5fd' : '#1e40af',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: bookAppointment.isPending ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {bookAppointment.isPending ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
