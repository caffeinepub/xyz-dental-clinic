import { useNavigate } from '@tanstack/react-router';
import { useGetPendingReviews, useApproveReview, useRejectReview } from '../../hooks/useQueries';
import { toast } from 'sonner';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'}>★</span>
      ))}
    </div>
  );
}

export default function ReviewApprover() {
  const navigate = useNavigate();
  const { data: pendingReviews, isLoading } = useGetPendingReviews();
  const approveReview = useApproveReview();
  const rejectReview = useRejectReview();

  const handleApprove = async (id: bigint) => {
    try {
      await approveReview.mutateAsync(id);
      toast.success('Review approved and is now live!');
    } catch {
      toast.error('Failed to approve review');
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await rejectReview.mutateAsync(id);
      toast.success('Review rejected');
    } catch {
      toast.error('Failed to reject review');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate({ to: '/admin/dashboard' })} className="text-white/60 hover:text-white transition-colors">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Review Approver</h1>
        </div>

        {isLoading ? (
          <div className="text-white/60 text-center py-20">Loading pending reviews...</div>
        ) : !pendingReviews || pendingReviews.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-white/60 text-lg">No pending reviews</p>
            <p className="text-white/40 text-sm mt-2">All reviews have been processed</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-white/50 text-sm mb-2">{pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} awaiting approval</p>
            {pendingReviews.map(review => (
              <div key={String(review.id)} className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm border border-teal-400/30">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{review.reviewerName}</p>
                        <StarRating rating={Number(review.rating)} />
                      </div>
                    </div>
                    <p className="text-white/75 text-sm leading-relaxed italic">"{review.text}"</p>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(review.id)}
                      disabled={approveReview.isPending || rejectReview.isPending}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      disabled={approveReview.isPending || rejectReview.isPending}
                      className="px-4 py-2 rounded-xl bg-red-500/30 hover:bg-red-500/50 border border-red-400/30 text-red-300 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      ✗ Reject
                    </button>
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
