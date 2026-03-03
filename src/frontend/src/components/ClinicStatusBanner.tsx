import { AlertTriangle, XCircle } from "lucide-react";
import React from "react";
import { ClinicStatus } from "../backend";
import { useClinicStatusContext } from "../context/ClinicStatusContext";

export default function ClinicStatusBanner() {
  const { clinicStatus, isLoading } = useClinicStatusContext();

  if (
    isLoading ||
    clinicStatus === ClinicStatus.open ||
    clinicStatus === undefined
  ) {
    return null;
  }

  if (clinicStatus === ClinicStatus.emergency) {
    return (
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <AlertTriangle size={16} />
        <span>
          ⚠️ Emergency: Clinic is currently handling emergency cases only. Please
          call for urgent assistance.
        </span>
      </div>
    );
  }

  if (clinicStatus === ClinicStatus.closed) {
    return (
      <div className="bg-gray-800 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <XCircle size={16} />
        <span>
          Clinic is currently closed. Online booking is temporarily unavailable.
        </span>
      </div>
    );
  }

  return null;
}
