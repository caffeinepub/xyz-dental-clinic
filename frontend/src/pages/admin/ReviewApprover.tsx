import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useGetPendingReviews, useApproveReview, useDeleteReview } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';

export default function ReviewApprover() {
  const navigate = useNavigate();
  const { data: pendingReviews, isLoading } = useGetPendingReviews();
  const { mutate: approveReview, isPending: approving } = useApproveReview();
  const { mutate: deleteReview, isPending: deleting } = useDeleteReview();

  const handleApprove = (reviewId: bigint) => {
    approveReview(reviewId, {
      onSuccess: () => toast.success('Review approved and published!'),
      onError: () => toast.error('Failed to approve review'),
    });
  };

  const handleDelete = (reviewId: bigint) => {
    deleteReview(reviewId, {
      onSuccess: () => toast.success('Review deleted'),
      onError: () => toast.error('Failed to delete review'),
    });
  };

  const renderStars = (rating: bigint) => {
    const n = Number(rating);
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Review Moderator</h1>
            <p className="text-muted-foreground text-sm">Approve or reject pending patient reviews</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading reviews...</div>
        ) : !pendingReviews || pendingReviews.length === 0 ? (
          <div className="glass-card rounded-2xl border border-border/40 p-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
            <p className="text-muted-foreground mt-2">No pending reviews to moderate.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} pending moderation
            </p>
            {pendingReviews.map((review) => (
              <div
                key={String(review.id)}
                className="glass-card rounded-2xl border border-border/40 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.reviewerName}</p>
                        <p className="text-yellow-500 text-sm">{renderStars(review.rating)}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                    {review.photo && (
                      <img
                        src={review.photo.getDirectURL()}
                        alt="Review photo"
                        className="mt-3 w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(review.id)}
                      disabled={approving || deleting}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      ✓ Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                      disabled={approving || deleting}
                    >
                      ✕ Delete
                    </Button>
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
