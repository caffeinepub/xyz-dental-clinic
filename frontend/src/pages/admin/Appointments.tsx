import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
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
  const { data: appointments, isLoading } = useGetAllAppointments();
  const updateStatus = useUpdateAppointmentStatus();
  const [filter, setFilter] = useState<string>('all');

  const filtered = appointments?.filter(a =>
    filter === 'all' ? true : a.status === filter
  ) ?? [];

  const handleStatusChange = async (id: bigint, status: AppointmentStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate({ to: '/admin/dashboard' })} className="text-white/60 hover:text-white transition-colors">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Appointments</h1>
        </div>

        {/* Filter */}
        <div className="glass-card rounded-2xl p-4 mb-6 flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                filter === f
                  ? 'bg-teal-500 border-teal-400 text-white'
                  : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-white/60 text-center py-20">Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center text-white/50">No appointments found.</div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 font-medium">Patient</th>
                  <th className="text-left p-4 text-white/60 font-medium">Contact</th>
                  <th className="text-left p-4 text-white/60 font-medium">Service</th>
                  <th className="text-left p-4 text-white/60 font-medium">Date</th>
                  <th className="text-left p-4 text-white/60 font-medium">Status</th>
                  <th className="text-left p-4 text-white/60 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => (
                  <tr key={String(appt.id)} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white font-medium">{appt.patientName}</td>
                    <td className="p-4 text-white/70">{appt.contactInfo}</td>
                    <td className="p-4 text-white/70">{appt.serviceType}</td>
                    <td className="p-4 text-white/70">
                      {new Date(Number(appt.preferredDate) / 1_000_000).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[appt.status] ?? ''}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        className="bg-white/10 border border-white/20 text-white text-xs rounded-lg px-2 py-1"
                        value={appt.status}
                        onChange={e => handleStatusChange(appt.id, e.target.value as AppointmentStatus)}
                        disabled={updateStatus.isPending}
                      >
                        {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                          <option key={s} value={s} className="bg-gray-900">{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
