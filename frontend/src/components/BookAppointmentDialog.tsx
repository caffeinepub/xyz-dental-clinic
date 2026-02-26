import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useBookAppointment } from '@/hooks/useQueries';

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
  'Braces',
  'General Checkup',
  'Other',
];

export default function BookAppointmentDialog({
  open,
  onOpenChange,
  defaultService = '',
}: BookAppointmentDialogProps) {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const bookAppointment = useBookAppointment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !service || !preferredDate) return;

    const dateMs = new Date(preferredDate).getTime();
    const dateNs = BigInt(dateMs) * 1_000_000n;

    await bookAppointment.mutateAsync({
      patientName,
      contactInfo: phone,
      preferredDate: dateNs,
      serviceType: service,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPatientName('');
      setPhone('');
      setService(defaultService);
      setPreferredDate('');
      onOpenChange(false);
    }, 2000);
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm font-medium transition-all duration-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.15)]';

  const labelClass = 'block text-sm font-semibold text-gray-800 mb-1.5';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md w-full"
        style={{
          background: '#ffffff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb',
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{ color: '#111827', fontWeight: 700, fontSize: '1.25rem' }}
          >
            Book an Appointment
          </DialogTitle>
          <DialogDescription style={{ color: '#4b5563', fontSize: '0.875rem' }}>
            Fill in your details and we'll confirm your appointment shortly.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-lg font-semibold text-gray-900">
              Appointment Booked!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              We'll contact you soon to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className={labelClass} htmlFor="patient-name">
                Patient Name
              </label>
              <input
                id="patient-name"
                type="text"
                className={inputClass}
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClass}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="service">
                Service
              </label>
              <select
                id="service"
                className={inputClass}
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                style={{ appearance: 'auto' }}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="preferred-date">
                Preferred Date
              </label>
              <input
                id="preferred-date"
                type="date"
                className={inputClass}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <button
              type="submit"
              disabled={bookAppointment.isPending}
              className="book-appointment-btn w-full mt-2"
            >
              {bookAppointment.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Booking...
                </span>
              ) : (
                'Book Appointment'
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
