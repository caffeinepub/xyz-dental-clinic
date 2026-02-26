import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAddReview } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function ContentManager() {
  const navigate = useNavigate();
  const addReview = useAddReview();
  const [form, setForm] = useState({ reviewerName: '', text: '', rating: 5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.reviewerName.trim() || !form.text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await addReview.mutateAsync({
        reviewerName: form.reviewerName,
        text: form.text,
        rating: BigInt(form.rating),
      });
      toast.success('Review submitted! It will appear after admin approval.');
      setForm({ reviewerName: '', text: '', rating: 5 });
    } catch {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-slate-800 font-playfair">Content Manager</h1>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-slate-800 font-semibold text-xl mb-2">Add Patient Review</h2>
          <p className="text-slate-500 text-sm mb-6">
            ℹ️ Submitted reviews will be in{' '}
            <span className="text-yellow-600 font-medium">pending</span> state and require
            approval in the Review Approver before appearing publicly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-600 text-sm mb-1.5">Patient Name</label>
              <input
                type="text"
                value={form.reviewerName}
                onChange={(e) => setForm((f) => ({ ...f, reviewerName: e.target.value }))}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-600 text-sm mb-1.5">Review Text</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="Write the patient's review..."
                rows={4}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 text-sm mb-1.5">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: r }))}
                    className={`text-2xl transition-transform hover:scale-110 ${
                      r <= form.rating ? 'text-yellow-400' : 'text-slate-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={addReview.isPending}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors disabled:opacity-50"
            >
              {addReview.isPending ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
