import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBookAppointment } from '../hooks/useQueries';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

const SERVICES = [
  'Dental Implants',
  'Invisalign',
  'Pediatric Dentistry',
  'Smile Makeover',
  'Laser Dentistry',
  'General Checkup',
  'Teeth Whitening',
  'Root Canal',
  'Other',
];

export default function BookAppointmentDialog({
  open,
  onOpenChange,
  defaultService = '',
}: BookAppointmentDialogProps) {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState(defaultService);
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const bookAppointment = useBookAppointment();

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!patientName.trim()) newErrors.name = 'Please enter your name.';
    if (!phoneNumber.trim()) newErrors.phone = 'Please enter your phone number.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const dateTimestamp = preferredDate
      ? BigInt(new Date(preferredDate).getTime()) * BigInt(1_000_000)
      : BigInt(Date.now()) * BigInt(1_000_000);

    try {
      await bookAppointment.mutateAsync({
        patientName: patientName.trim(),
        contactInfo: phoneNumber.trim(),
        preferredDate: dateTimestamp,
        serviceType: service || 'General Checkup',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      // Reset form on close
      setPatientName('');
      setPhoneNumber('');
      setService(defaultService);
      setPreferredDate('');
      setSubmitted(false);
      setErrors({});
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-teal-700 font-playfair text-xl">
            Book an Appointment
          </DialogTitle>
          <DialogDescription>
            Fill in your details and we'll confirm your appointment shortly.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="text-4xl">🦷</div>
            <h3 className="text-lg font-semibold text-teal-700">Thank You!</h3>
            <p className="text-slate-600 text-sm">
              Your appointment has been booked. We will contact you shortly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Patient Name */}
            <div className="space-y-1">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                type="text"
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className={errors.name ? 'border-red-400' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phone ? 'border-red-400' : ''}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            {/* Service */}
            <div className="space-y-1">
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Preferred Date */}
            <div className="space-y-1">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {bookAppointment.isError && (
              <p className="text-red-500 text-xs">
                Something went wrong. Please try again.
              </p>
            )}

            <Button
              type="submit"
              disabled={bookAppointment.isPending}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold"
            >
              {bookAppointment.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
