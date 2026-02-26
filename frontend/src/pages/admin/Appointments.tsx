import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Clock, CheckCircle, XCircle, Phone, User, Calendar } from 'lucide-react';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
import { AppointmentStatus } from '../../backend';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Appointments() {
  const navigate = useNavigate();
  const { data: appointments, isLoading } = useGetAllAppointments();
  const { mutate: updateStatus } = useUpdateAppointmentStatus();

  const formatDate = (ns: bigint) => {
    const ms = Number(ns) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="flex items-center gap-2 text-gray-500 hover:text-royal-blue transition-colors"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>
          <h1 className="text-3xl font-playfair font-bold text-royal-blue">Appointments</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-royal-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !appointments || appointments.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No appointments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={String(apt.id)} className="glass-card rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-royal-blue" />
                      <span className="font-bold text-gray-800">{apt.patientName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[apt.status] || 'bg-gray-100 text-gray-600'}`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-teal" />
                      <span>{apt.contactInfo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-teal" />
                      <span>{apt.serviceType}</span>
                      <span className="text-gray-400">•</span>
                      <span>{formatDate(apt.preferredDate)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {apt.status === AppointmentStatus.pending && (
                      <>
                        <button
                          onClick={() => updateStatus({ appointmentId: apt.id, newStatus: AppointmentStatus.confirmed })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          <CheckCircle size={14} /> Confirm
                        </button>
                        <button
                          onClick={() => updateStatus({ appointmentId: apt.id, newStatus: AppointmentStatus.cancelled })}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </>
                    )}
                    {apt.status === AppointmentStatus.confirmed && (
                      <button
                        onClick={() => updateStatus({ appointmentId: apt.id, newStatus: AppointmentStatus.completed })}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <CheckCircle size={14} /> Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
