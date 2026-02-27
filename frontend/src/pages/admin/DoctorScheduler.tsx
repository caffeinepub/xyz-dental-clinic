import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllDoctors, useAddDoctor } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function DoctorScheduler() {
  const navigate = useNavigate();
  const { data: doctors, isLoading } = useGetAllDoctors();
  const addDoctor = useAddDoctor();
  const [form, setForm] = useState({ name: '', specialty: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.specialty.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await addDoctor.mutateAsync({ name: form.name, specialty: form.specialty, availability: [] });
      toast.success('Doctor added successfully!');
      setForm({ name: '', specialty: '' });
    } catch {
      toast.error('Failed to add doctor');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-slate-800 font-playfair">Doctor Scheduler</h1>
        </div>

        {/* Add Doctor Form */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Doctor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 text-sm mb-1.5">Doctor Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Dr. Full Name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-sm mb-1.5">Specialty</label>
                <input
                  type="text"
                  value={form.specialty}
                  onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                  placeholder="e.g. Orthodontics"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={addDoctor.isPending}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-colors disabled:opacity-50"
            >
              {addDoctor.isPending ? 'Adding...' : 'Add Doctor'}
            </button>
          </form>
        </div>

        {/* Doctors List */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Doctors ({doctors?.length ?? 0})
          </h2>
          {isLoading ? (
            <div className="text-center py-8 text-slate-400">Loading...</div>
          ) : !doctors || doctors.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <div className="text-4xl mb-3">👨‍⚕️</div>
              <p>No doctors added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <div
                  key={String(doctor.id)}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{doctor.name}</p>
                    <p className="text-slate-500 text-sm">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
