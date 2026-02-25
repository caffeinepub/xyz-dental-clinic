import { useState } from 'react';
import { useBookAppointment } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookAppointmentDialog({ open, onOpenChange }: BookAppointmentDialogProps) {
  const bookAppointment = useBookAppointment();
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [serviceType, setServiceType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ patientName?: string; phoneNumber?: string }>({});

  const validate = () => {
    const newErrors: { patientName?: string; phoneNumber?: string } = {};
    if (!patientName.trim()) newErrors.patientName = 'Please enter your name.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Please enter your phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!selectedDate || !serviceType) return;

    try {
      const preferredDate = BigInt(selectedDate.getTime() * 1_000_000); // ms → nanoseconds
      await bookAppointment.mutateAsync({
        patientName: patientName.trim(),
        contactInfo: phoneNumber.trim(),
        preferredDate,
        serviceType,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when closing
      setPatientName('');
      setPhoneNumber('');
      setSelectedDate(undefined);
      setServiceType('');
      setSubmitted(false);
      setErrors({});
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">Thank You!</DialogTitle>
            <p className="text-muted-foreground text-base leading-relaxed">
              Your appointment has been booked successfully.
              <br />
              We will contact you shortly to confirm.
            </p>
            <Button
              className="mt-2 px-8 rounded-full"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Fill in your details below — no login required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {/* Patient Name */}
              <div className="space-y-1">
                <Label htmlFor="patientName">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="patientName"
                  placeholder="Enter your full name"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (errors.patientName) setErrors((prev) => ({ ...prev, patientName: undefined }));
                  }}
                  className={errors.patientName ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.patientName && (
                  <p className="text-xs text-destructive">{errors.patientName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <Label htmlFor="phoneNumber">Phone Number <span className="text-destructive">*</span></Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                  }}
                  className={errors.phoneNumber ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-destructive">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Service Type */}
              <div className="space-y-1">
                <Label htmlFor="serviceType">Service</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Root Canal">Root Canal Treatment</SelectItem>
                    <SelectItem value="Braces">Braces & Orthodontics</SelectItem>
                    <SelectItem value="Whitening">Teeth Whitening</SelectItem>
                    <SelectItem value="Implants">Dental Implants</SelectItem>
                    <SelectItem value="Invisalign">Invisalign Clear Aligners</SelectItem>
                    <SelectItem value="Laser Dentistry">Laser Dentistry</SelectItem>
                    <SelectItem value="Pediatric">Pediatric Dentistry</SelectItem>
                    <SelectItem value="Smile Makeover">Smile Makeover</SelectItem>
                    <SelectItem value="Checkup">General Checkup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-1">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {bookAppointment.isError && (
                <p className="text-xs text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={
                  bookAppointment.isPending ||
                  !patientName.trim() ||
                  !phoneNumber.trim() ||
                  !selectedDate ||
                  !serviceType
                }
              >
                {bookAppointment.isPending ? 'Booking...' : 'Book Now'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
