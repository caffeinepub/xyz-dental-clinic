import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllAppointments, useGetClinicStatus, useSetClinicStatus } from '../../hooks/useQueries';
import { ClinicStatus, AppointmentStatus } from '../../backend';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const variants: Record<AppointmentStatus, string> = {
    [AppointmentStatus.pending]: 'bg-yellow-100 text-yellow-800',
    [AppointmentStatus.confirmed]: 'bg-blue-100 text-blue-800',
    [AppointmentStatus.completed]: 'bg-green-100 text-green-800',
    [AppointmentStatus.cancelled]: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: appointments, isLoading: apptLoading } = useGetAllAppointments();
  const { data: clinicStatus } = useGetClinicStatus();
  const setClinicStatus = useSetClinicStatus();

  const handleStatusChange = async (status: ClinicStatus) => {
    try {
      await setClinicStatus.mutateAsync(status);
    } catch (err) {
      console.error('Failed to update clinic status:', err);
    }
  };

  const statusConfig = {
    [ClinicStatus.open]: { label: 'Open', color: 'bg-green-500', next: ClinicStatus.closed },
    [ClinicStatus.closed]: { label: 'Closed', color: 'bg-red-500', next: ClinicStatus.emergency },
    [ClinicStatus.emergency]: { label: 'Emergency', color: 'bg-orange-500', next: ClinicStatus.open },
  };

  const current = clinicStatus ? statusConfig[clinicStatus] : statusConfig[ClinicStatus.open];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 font-playfair">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">XYZ Dental Clinic Management</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            className="text-slate-600"
          >
            ← Back to Site
          </Button>
        </div>

        {/* Clinic Status Card */}
        <div className="glass-card rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Clinic Status</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${current.color} animate-pulse`} />
              <span className="font-semibold text-slate-700">Currently: {current.label}</span>
            </div>
            <div className="flex gap-2">
              {Object.entries(statusConfig).map(([status, config]) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status as ClinicStatus)}
                  disabled={setClinicStatus.isPending || clinicStatus === status}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    clinicStatus === status
                      ? `${config.color} text-white`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  } disabled:opacity-50`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="appointments">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">📋 Appointments</TabsTrigger>
            <TabsTrigger value="services">🦷 Service Manager</TabsTrigger>
            <TabsTrigger value="reviews">⭐ Reviews</TabsTrigger>
            <TabsTrigger value="doctors">👨‍⚕️ Doctors</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="glass-card rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">All Appointments</h2>
                <span className="text-slate-500 text-sm">
                  {appointments?.length ?? 0} total
                </span>
              </div>

              {apptLoading ? (
                <div className="text-center py-12 text-slate-400">Loading appointments...</div>
              ) : !appointments || appointments.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <div className="text-4xl mb-3">📋</div>
                  <p>No appointments yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appt) => (
                        <TableRow key={String(appt.id)}>
                          <TableCell className="font-medium">{appt.patientName}</TableCell>
                          <TableCell>{appt.contactInfo}</TableCell>
                          <TableCell>{appt.serviceType}</TableCell>
                          <TableCell>{formatDate(appt.preferredDate)}</TableCell>
                          <TableCell><StatusBadge status={appt.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="glass-card rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Service Manager</h2>
              <p className="text-slate-500 text-sm mb-4">
                Edit service details and photos for all 5 premium services.
              </p>
              <Button
                onClick={() => navigate({ to: '/admin/service-manager' })}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full"
              >
                Open Service Manager →
              </Button>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="glass-card rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Review Approver</h2>
              <p className="text-slate-500 text-sm mb-4">
                Approve or reject pending patient reviews.
              </p>
              <Button
                onClick={() => navigate({ to: '/admin/review-approver' })}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full"
              >
                Open Review Approver →
              </Button>
            </div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <div className="glass-card rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Doctor Management</h2>
              <p className="text-slate-500 text-sm mb-4">
                Add and manage doctors and their schedules.
              </p>
              <Button
                onClick={() => navigate({ to: '/admin/doctors' })}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full"
              >
                Open Doctor Scheduler →
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
