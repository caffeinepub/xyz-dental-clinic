import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetClinicStatus, useSetClinicStatus } from '../../hooks/useQueries';
import { ClinicStatus } from '../../backend';
import { toast } from 'sonner';

const navCards = [
  { title: 'Appointments', desc: 'View and manage all patient bookings', icon: '📅', route: '/admin/appointments' },
  { title: 'Content Manager', desc: 'Add and manage patient reviews', icon: '✍️', route: '/admin/content-manager' },
  { title: 'Doctor Scheduler', desc: 'Manage doctors and availability', icon: '👨‍⚕️', route: '/admin/doctor-scheduler' },
  { title: 'Service Manager', desc: 'Edit service details and photos', icon: '🦷', route: '/admin/service-manager' },
  { title: 'Review Approver', desc: 'Approve or reject pending reviews', icon: '⭐', route: '/admin/review-approver' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: clinicStatus } = useGetClinicStatus();
  const setClinicStatus = useSetClinicStatus();

  const handleStatusChange = async (status: ClinicStatus) => {
    try {
      await setClinicStatus.mutateAsync(status);
      toast.success(`Clinic status updated to ${status}`);
    } catch {
      toast.error('Failed to update clinic status');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p className="text-white/60">Manage your clinic from one place</p>
        </div>

        {/* Clinic Status */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold text-lg mb-4">Clinic Status</h2>
          <div className="flex flex-wrap gap-3">
            {(['open', 'closed', 'emergency'] as ClinicStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={setClinicStatus.isPending}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all border ${
                  clinicStatus === s
                    ? s === 'open'
                      ? 'bg-teal-500 border-teal-400 text-white'
                      : s === 'closed'
                      ? 'bg-red-500 border-red-400 text-white'
                      : 'bg-orange-500 border-orange-400 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-3">
            Current: <span className="text-teal-300 font-medium">{clinicStatus ?? '...'}</span>
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {navCards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate({ to: card.route as any })}
              className="glass-card rounded-2xl p-6 text-left hover:-translate-y-1 transition-all duration-200 hover:shadow-xl group"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-teal-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-white/55 text-sm">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
