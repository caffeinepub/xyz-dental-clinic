import React, { useState, useEffect } from 'react';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
import { AppointmentStatus } from '../../backend';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, RefreshCw, Clock } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function Appointments() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Do NOT gate on isAdminAuthenticated() here — AdminGuard already protects this route.
  // Passing enabled:true lets the query run as soon as the actor (with admin identity) is ready.
  const {
    data: appointments,
    isLoading,
    isError,
    error,
    dataUpdatedAt,
    refetch,
    isFetching,
  } = useGetAllAppointments({
    refetchInterval: 8000,
  });

  const updateStatus = useUpdateAppointmentStatus();

  useEffect(() => {
    if (dataUpdatedAt) {
      setLastUpdated(new Date(dataUpdatedAt));
    }
  }, [dataUpdatedAt]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', { dateStyle: 'medium' });
  };

  const handleStatusChange = async (appointmentId: bigint, newStatus: AppointmentStatus) => {
    try {
      await updateStatus.mutateAsync({ appointmentId, newStatus });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Appointments
          </h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {formatTime(lastUpdated)}</span>
            {isFetching && (
              <span className="flex items-center gap-1 text-teal-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                Syncing...
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
          <span className="ml-3 text-gray-600">Loading appointments...</span>
        </div>
      ) : isError ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-700 font-medium">
            {(error as Error)?.message?.includes('Unauthorized')
              ? 'Authorization error. Please log out and log back in as admin.'
              : 'Failed to load appointments. Please try refreshing.'}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : !appointments || appointments.length === 0 ? (
        <div className="p-12 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <p className="text-gray-500 text-lg">No appointments yet.</p>
          <p className="text-gray-400 text-sm mt-1">New bookings will appear here automatically.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Patient Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                <TableHead className="font-semibold text-gray-700">Service</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id.toString()} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-mono text-sm text-gray-500">
                    #{apt.id.toString()}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{apt.patientName}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{apt.contactInfo}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{apt.serviceType}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{formatDate(apt.preferredDate)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        statusColors[apt.status] || 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={apt.status}
                      onValueChange={(val) =>
                        handleStatusChange(apt.id, val as AppointmentStatus)
                      }
                    >
                      <SelectTrigger className="w-32 h-8 text-xs bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value={AppointmentStatus.pending}>Pending</SelectItem>
                        <SelectItem value={AppointmentStatus.confirmed}>Confirmed</SelectItem>
                        <SelectItem value={AppointmentStatus.completed}>Completed</SelectItem>
                        <SelectItem value={AppointmentStatus.cancelled}>Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
            Total: {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} • Auto-refreshes every 8 seconds
          </div>
        </div>
      )}
    </div>
  );
}
