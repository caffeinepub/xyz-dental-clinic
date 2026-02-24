import { useGetClinicStatus } from '../hooks/useQueries';
import { AlertTriangle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ClinicStatusBanner() {
  const { data: clinicStatus } = useGetClinicStatus();

  if (!clinicStatus || clinicStatus === 'open') {
    return null;
  }

  const isEmergency = clinicStatus === 'emergency';
  const isClosed = clinicStatus === 'closed';

  return (
    <Alert
      variant="destructive"
      className={`rounded-none border-x-0 border-t-0 ${
        isEmergency ? 'bg-red-50 dark:bg-red-950/20 border-red-500' : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500'
      }`}
    >
      {isEmergency ? (
        <AlertTriangle className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}
      <AlertTitle className="font-bold">
        {isEmergency ? 'Emergency Notice' : 'Clinic Closed'}
      </AlertTitle>
      <AlertDescription>
        {isEmergency
          ? 'We are currently handling an emergency. Please call us for urgent matters.'
          : 'Our clinic is currently closed. Please check back during business hours.'}
      </AlertDescription>
    </Alert>
  );
}
