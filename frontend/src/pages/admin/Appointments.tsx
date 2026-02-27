import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
import { isAdminAuthenticated } from '../../components/AdminGuard';
import { AppointmentStatus } from '../../backend';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

function formatDate(timestamp: bigint): string {
  try {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleString();
  } catch {
    return 'Invalid date';
  }
}

export default function AdminAppointments() {
  const navigate = useNavigate();
  const isAdmin = isAdminAuthenticated();

  const {
    data: appointments,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetAllAppointments({ enabled: isAdmin });

  const updateStatus = useUpdateAppointmentStatus();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const handleStatusChange = async (appointmentId: bigint, newStatus: AppointmentStatus) => {
    setUpdatingId(appointmentId);
    try {
      await updateStatus.mutateAsync({ appointmentId, newStatus });
    } finally {
      setUpdatingId(null);
    }
  };

  const getErrorMessage = (err: unknown): string => {
    if (!err) return 'Unknown error';
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Unauthorized') || msg.includes('Only admins')) {
      return 'Authorization error: Your session may have expired. Please log out and log in again as admin.';
    }
    return `Failed to load appointments: ${msg}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/admin/dashboard' })}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage all patient appointments
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2"
          >
            {isFetching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Appointments</AlertTitle>
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-500">Loading appointments...</p>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        {!isLoading && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {appointments && appointments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-700">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">ID</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Patient</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Contact</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Service</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow
                      key={appt.id.toString()}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <TableCell className="font-mono text-sm text-gray-600 dark:text-gray-400">
                        #{appt.id.toString()}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {appt.patientName}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                        {appt.contactInfo}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                        {appt.serviceType}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                        {formatDate(appt.preferredDate)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            statusColors[appt.status] || 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {updatingId === appt.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          ) : (
                            <Select
                              value={appt.status}
                              onValueChange={(val) =>
                                handleStatusChange(appt.id, val as AppointmentStatus)
                              }
                            >
                              <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={AppointmentStatus.pending}>Pending</SelectItem>
                                <SelectItem value={AppointmentStatus.confirmed}>Confirmed</SelectItem>
                                <SelectItem value={AppointmentStatus.completed}>Completed</SelectItem>
                                <SelectItem value={AppointmentStatus.cancelled}>Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📅</div>
                <p className="text-lg font-medium text-gray-500">No appointments yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Appointments will appear here once patients book them.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {appointments && appointments.length > 0 && (
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span>Total: {appointments.length}</span>
            <span>
              Pending:{' '}
              {appointments.filter((a) => a.status === AppointmentStatus.pending).length}
            </span>
            <span>
              Confirmed:{' '}
              {appointments.filter((a) => a.status === AppointmentStatus.confirmed).length}
            </span>
            <span>
              Completed:{' '}
              {appointments.filter((a) => a.status === AppointmentStatus.completed).length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
