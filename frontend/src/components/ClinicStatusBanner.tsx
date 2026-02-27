import React from 'react';
import { useGetClinicStatus } from '../hooks/useQueries';
import { ClinicStatus } from '../backend';

export default function ClinicStatusBanner() {
  const { data: status } = useGetClinicStatus();

  if (!status || status === ClinicStatus.open) return null;

  const isEmergency = status === ClinicStatus.emergency;

  return (
    <div
      style={{
        backgroundColor: isEmergency ? '#fef2f2' : '#fffbeb',
        borderBottom: `2px solid ${isEmergency ? '#fca5a5' : '#fcd34d'}`,
        padding: '0.75rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: isEmergency ? '#dc2626' : '#92400e',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}
      >
        {isEmergency
          ? '🚨 Emergency Only — Please call +91 63521 74912 for urgent dental care'
          : '🔒 Clinic Currently Closed — We will reopen soon. Call us for appointments.'}
      </p>
    </div>
  );
}
