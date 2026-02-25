import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '@/hooks/useQueries';
import { AppointmentStatus } from '../../backend';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  confirmed: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
  completed: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-400/30',
};

export default function Appointments() {
  const navigate = useNavigate();
  const { data: appointments, isLoading } = useGetAllAppointments({ refetchInterval: 30000 });
  const updateStatus = useUpdateAppointmentStatus();
  const [filter, setFilter] = useState<string>('all');

  const filtered =
    appointments?.filter((a) => (filter === 'all' ? true : a.status === filter)) ?? [];

  const handleStatusChange = async (appointmentId: bigint, newStatus: AppointmentStatus) => {
    try {
      await updateStatus.mutateAsync({ appointmentId, newStatus });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground text-sm">Manage all patient bookings</p>
          </div>
        </div>

        {/* Filter */}
        <div className="glass-card rounded-2xl p-4 mb-6 flex flex-wrap gap-2 border border-border/40">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center text-muted-foreground border border-border/40">
            No appointments found.
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden border border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left p-4 text-muted-foreground font-medium">Patient</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Contact</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Service</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((appt) => (
                    <tr
                      key={String(appt.id)}
                      className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 font-medium text-foreground">{appt.patientName}</td>
                      <td className="p-4 text-muted-foreground">{appt.contactInfo}</td>
                      <td className="p-4 text-muted-foreground">{appt.serviceType}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(Number(appt.preferredDate) / 1_000_000).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs border ${
                            statusColors[String(appt.status)] ?? ''
                          }`}
                        >
                          {String(appt.status)}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          className="bg-muted border border-border text-foreground text-xs rounded-lg px-2 py-1"
                          value={String(appt.status)}
                          onChange={(e) =>
                            handleStatusChange(appt.id, e.target.value as AppointmentStatus)
                          }
                          disabled={updateStatus.isPending}
                        >
                          {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
