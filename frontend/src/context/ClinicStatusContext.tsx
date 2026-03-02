import React, { createContext, useContext, ReactNode } from 'react';
import { useGetClinicStatus } from '../hooks/useQueries';
import { ClinicStatus } from '../backend';

interface ClinicStatusContextType {
  clinicStatus: ClinicStatus | undefined;
  isLoading: boolean;
  isOpen: boolean;
  isClosed: boolean;
  isEmergency: boolean;
}

const ClinicStatusContext = createContext<ClinicStatusContextType>({
  clinicStatus: undefined,
  isLoading: true,
  isOpen: true,
  isClosed: false,
  isEmergency: false,
});

export function ClinicStatusProvider({ children }: { children: ReactNode }) {
  const { data: clinicStatus, isLoading } = useGetClinicStatus();

  const value: ClinicStatusContextType = {
    clinicStatus,
    isLoading,
    isOpen: clinicStatus === ClinicStatus.open || clinicStatus === undefined,
    isClosed: clinicStatus === ClinicStatus.closed,
    isEmergency: clinicStatus === ClinicStatus.emergency,
  };

  return (
    <ClinicStatusContext.Provider value={value}>
      {children}
    </ClinicStatusContext.Provider>
  );
}

export function useClinicStatusContext() {
  return useContext(ClinicStatusContext);
}
