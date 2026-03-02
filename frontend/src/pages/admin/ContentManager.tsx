import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isAdminAuthenticated } from '../../components/AdminGuard';
import { useAddReview } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function ContentManager() {
  const navigate = useNavigate();
  const addReview = useAddReview();
  const [form, setForm] = useState({ reviewerName: '', text: '', rating: 5 });

  if (!isAdminAuthenticated()) {
    navigate({ to: '/' });
    return null;
  }

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
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => navigate({ to: '/admin' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 style={{ color: '#1a1a1a', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>
          Content Manager
        </h1>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 24px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h2 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>
            Add Patient Review
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '24px' }}>
            Submitted reviews will be in{' '}
            <span style={{ color: '#d97706', fontWeight: 600 }}>pending</span> state and require
            approval before appearing publicly.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginBottom: '6px',
                }}
              >
                Patient Name
              </label>
              <input
                type="text"
                value={form.reviewerName}
                onChange={(e) => setForm((f) => ({ ...f, reviewerName: e.target.value }))}
                placeholder="e.g. Priya Sharma"
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#1a1a1a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginBottom: '6px',
                }}
              >
                Review Text
              </label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="Write the patient's review..."
                rows={4}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#1a1a1a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginBottom: '8px',
                }}
              >
                Rating
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: r }))}
                    style={{
                      fontSize: '1.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: r <= form.rating ? '#f59e0b' : '#d1d5db',
                      transition: 'transform 0.1s',
                      padding: '2px',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={addReview.isPending}
              style={{
                background: '#0d9488',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: addReview.isPending ? 'not-allowed' : 'pointer',
                opacity: addReview.isPending ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
            >
              {addReview.isPending ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
