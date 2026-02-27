import React, { useState, useEffect } from 'react';
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
import { useBookAppointment, useGetClinicStatus } from '../hooks/useQueries';
import { ClinicStatus } from '../backend';
import { CheckCircle, AlertCircle, Loader2, RefreshCw, X } from 'lucide-react';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

const PENDING_KEY = 'pending_appointment';

interface PendingAppointment {
  patientName: string;
  contactInfo: string;
  preferredDate: string;
  serviceType: string;
}

const serviceOptions = [
  'Dental Implants',
  'Invisalign',
  'Smile Makeover',
  'Pediatric Dentistry',
  'Laser Dentistry',
  'Teeth Whitening',
  'Root Canal',
  'General Checkup',
  'Other',
];

/**
 * Returns true only if the stored pending appointment has at least one
 * meaningful (non-empty) field — preventing stale/empty entries from
 * triggering the "Unsaved appointment found" banner.
 */
function isValidPendingAppointment(data: PendingAppointment): boolean {
  return (
    data.patientName.trim().length > 0 ||
    data.contactInfo.trim().length > 0 ||
    data.preferredDate.trim().length > 0 ||
    data.serviceType.trim().length > 0
  );
}

export default function BookAppointmentDialog({ open, onOpenChange, defaultService }: BookAppointmentDialogProps) {
  const { data: clinicStatus } = useGetClinicStatus();
  const isClinicOpen = clinicStatus === ClinicStatus.open || clinicStatus === undefined;

  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [serviceType, setServiceType] = useState(defaultService || '');
  const [success, setSuccess] = useState(false);
  // errorMsg is only set after an actual failed submission attempt in the current session
  const [errorMsg, setErrorMsg] = useState('');
  // hasPending: localStorage has data from a previous failed session
  const [hasPending, setHasPending] = useState(false);
  // submissionFailed: tracks if the current session had a real backend failure
  const [submissionFailed, setSubmissionFailed] = useState(false);

  const bookAppointment = useBookAppointment();

  // Check for pending appointment when dialog opens — only restore data, never show error banner
  useEffect(() => {
    if (!open) return;

    // Always clear the error/failure state on open — it should only appear after a real failure
    setErrorMsg('');
    setSubmissionFailed(false);

    const raw = localStorage.getItem(PENDING_KEY);
    if (raw) {
      try {
        const data: PendingAppointment = JSON.parse(raw);
        // Only restore and show the amber banner if the stored data has real content
        if (isValidPendingAppointment(data)) {
          setPatientName(data.patientName);
          setContactInfo(data.contactInfo);
          setPreferredDate(data.preferredDate);
          setServiceType(data.serviceType || defaultService || '');
          setHasPending(true);
        } else {
          // Stale/empty entry — silently remove it and start fresh
          localStorage.removeItem(PENDING_KEY);
          setPatientName('');
          setContactInfo('');
          setPreferredDate('');
          setServiceType(defaultService || '');
          setHasPending(false);
        }
      } catch {
        // Corrupt entry — remove it
        localStorage.removeItem(PENDING_KEY);
        setPatientName('');
        setContactInfo('');
        setPreferredDate('');
        setServiceType(defaultService || '');
        setHasPending(false);
      }
    } else {
      // No pending entry — start fresh
      setPatientName('');
      setContactInfo('');
      setPreferredDate('');
      setServiceType(defaultService || '');
      setHasPending(false);
    }
  }, [open]); // intentionally omit defaultService to avoid re-running mid-session

  // If clinic is closed while dialog is open, close it
  useEffect(() => {
    if (!isClinicOpen && open) {
      onOpenChange(false);
    }
  }, [isClinicOpen, open, onOpenChange]);

  const resetForm = () => {
    setPatientName('');
    setContactInfo('');
    setPreferredDate('');
    setServiceType(defaultService || '');
    setSuccess(false);
    setErrorMsg('');
    setHasPending(false);
    setSubmissionFailed(false);
    bookAppointment.reset();
  };

  const handleClose = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

  /** User explicitly discards the pending appointment */
  const handleDiscard = () => {
    localStorage.removeItem(PENDING_KEY);
    setHasPending(false);
    setErrorMsg('');
    setSubmissionFailed(false);
    setPatientName('');
    setContactInfo('');
    setPreferredDate('');
    setServiceType(defaultService || '');
    bookAppointment.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isClinicOpen) {
      setErrorMsg('The clinic is currently closed. Please try again later.');
      return;
    }
    setErrorMsg('');
    setSubmissionFailed(false);

    try {
      const dateMs = new Date(preferredDate).getTime();
      const dateNs = BigInt(dateMs) * BigInt(1_000_000);

      const result = await bookAppointment.mutateAsync({
        patientName,
        contactInfo,
        preferredDate: dateNs,
        serviceType,
      });

      if (result === false) {
        setErrorMsg('Booking failed: The clinic is currently closed.');
        // Clear localStorage since the clinic is closed — retrying won't help
        localStorage.removeItem(PENDING_KEY);
        setHasPending(false);
        return;
      }

      // Success — clear localStorage immediately so the banner never reappears
      localStorage.removeItem(PENDING_KEY);
      setSuccess(true);
      setHasPending(false);
      setSubmissionFailed(false);
    } catch (_err) {
      // Only NOW save to localStorage (after a real failure) so data isn't lost
      const pendingData: PendingAppointment = { patientName, contactInfo, preferredDate, serviceType };
      localStorage.setItem(PENDING_KEY, JSON.stringify(pendingData));
      setHasPending(true);
      setSubmissionFailed(true);
      setErrorMsg(
        'Connection issue. Your data has been saved locally. Please click "Retry" to try again.'
      );
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            {success ? 'Appointment Confirmed! 🎉' : 'Book Your Appointment'}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {success
              ? 'We will contact you shortly to confirm your appointment.'
              : 'Fill in your details and we will get back to you.'}
          </DialogDescription>
        </DialogHeader>

        {!isClinicOpen ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-center text-gray-700 dark:text-gray-300 font-medium">
              The clinic is currently closed. Please check back later.
            </p>
            <Button variant="outline" onClick={() => handleClose(false)}>
              Close
            </Button>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white">{patientName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Service: {serviceType}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date: {new Date(preferredDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
              </p>
            </div>
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8"
              onClick={() => handleClose(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            {/* Amber banner: shown when localStorage has data from a previous failed session,
                but only when there was NO failure in the current session (to avoid duplicate banners) */}
            {hasPending && !submissionFailed && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <RefreshCw className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="flex-1">Unsaved appointment found. Review and submit to confirm.</span>
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="ml-1 flex-shrink-0 text-amber-600 hover:text-amber-900 transition-colors"
                  aria-label="Discard saved appointment"
                  title="Discard and start fresh"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Red error banner: only shown after a real failed submission attempt in the current session */}
            {errorMsg && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="patientName" className="text-gray-700 dark:text-gray-300 font-medium">Full Name *</Label>
              <Input
                id="patientName"
                placeholder="Your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contactInfo" className="text-gray-700 dark:text-gray-300 font-medium">Phone / Email *</Label>
              <Input
                id="contactInfo"
                placeholder="Phone number or email"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preferredDate" className="text-gray-700 dark:text-gray-300 font-medium">Preferred Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                min={today}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="serviceType" className="text-gray-700 dark:text-gray-300 font-medium">Service *</Label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <option value="" className="text-gray-400">Select a service</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s} className="text-gray-900 bg-white dark:bg-gray-800 dark:text-white">{s}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => handleClose(false)}
                disabled={bookAppointment.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full"
                disabled={bookAppointment.isPending}
              >
                {bookAppointment.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : submissionFailed ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
