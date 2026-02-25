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
      toast.success('Doctor added successfully');
      setForm({ name: '', specialty: '' });
    } catch {
      toast.error('Failed to add doctor');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate({ to: '/admin/dashboard' })} className="text-white/60 hover:text-white transition-colors">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Doctor Scheduler</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Doctor Form */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-5">Add New Doctor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Doctor Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Dr. Full Name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Specialty</label>
                <input
                  type="text"
                  value={form.specialty}
                  onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
                  placeholder="e.g. Orthodontics"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={addDoctor.isPending}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {addDoctor.isPending ? 'Adding...' : 'Add Doctor'}
              </button>
            </form>
          </div>

          {/* Doctor List */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-5">Current Doctors</h2>
            {isLoading ? (
              <p className="text-white/50 text-sm">Loading...</p>
            ) : !doctors || doctors.length === 0 ? (
              <p className="text-white/50 text-sm">No doctors added yet.</p>
            ) : (
              <div className="space-y-3">
                {doctors.map(doc => (
                  <div key={String(doc.id)} className="glass-card rounded-xl p-4">
                    <p className="text-white font-medium">{doc.name}</p>
                    <p className="text-teal-300 text-sm">{doc.specialty}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
