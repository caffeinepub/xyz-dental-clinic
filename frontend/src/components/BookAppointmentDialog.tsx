import { useState } from 'react';
import { useCreateAppointment } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
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
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookAppointmentDialog({ open, onOpenChange }: BookAppointmentDialogProps) {
  const { identity, login } = useInternetIdentity();
  const createAppointment = useCreateAppointment();
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [serviceType, setServiceType] = useState('');

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      login();
      return;
    }

    if (!patientName.trim() || !contactInfo.trim() || !selectedDate || !serviceType) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const preferredDate = BigInt(selectedDate.getTime() * 1_000_000); // Convert to nanoseconds
      await createAppointment.mutateAsync({
        patientName: patientName.trim(),
        contactInfo: contactInfo.trim(),
        preferredDate,
        serviceType,
      });
      toast.success('Appointment booked successfully!');
      onOpenChange(false);
      setPatientName('');
      setContactInfo('');
      setSelectedDate(undefined);
      setServiceType('');
    } catch (error) {
      console.error('Failed to book appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>Fill in your details to schedule your visit.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Full Name</Label>
            <Input
              id="patientName"
              placeholder="Enter your full name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Contact Information</Label>
            <Input
              id="contactInfo"
              placeholder="Phone or email"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
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
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Root Canal">Root Canal Treatment</SelectItem>
                <SelectItem value="Braces">Braces & Orthodontics</SelectItem>
                <SelectItem value="Whitening">Teeth Whitening</SelectItem>
                <SelectItem value="Implants">Dental Implants</SelectItem>
                <SelectItem value="Checkup">General Checkup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={createAppointment.isPending}>
            {createAppointment.isPending ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
