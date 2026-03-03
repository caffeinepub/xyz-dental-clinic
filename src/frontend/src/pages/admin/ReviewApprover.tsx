import { Button } from "@/components/ui/button";
import {
  useApproveReview,
  useDeleteReview,
  useGetPendingReviews,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { isAdminAuthenticated } from "../../components/AdminGuard";

export default function ReviewApprover() {
  const navigate = useNavigate();
  const { data: pendingReviews, isLoading } = useGetPendingReviews();
  const { mutate: approveReview, isPending: approving } = useApproveReview();
  const { mutate: deleteReview, isPending: deleting } = useDeleteReview();

  if (!isAdminAuthenticated()) {
    navigate({ to: "/" });
    return null;
  }

  const handleApprove = (reviewId: bigint) => {
    approveReview(reviewId, {
      onSuccess: () => toast.success("Review approved and published!"),
      onError: () => toast.error("Failed to approve review"),
    });
  };

  const handleDelete = (reviewId: bigint) => {
    deleteReview(reviewId, {
      onSuccess: () => toast.success("Review deleted"),
      onError: () => toast.error("Failed to delete review"),
    });
  };

  const renderStars = (rating: bigint) => {
    const n = Number(rating);
    return "★".repeat(n) + "☆".repeat(5 - n);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/admin" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1
            style={{
              color: "#1a1a1a",
              fontWeight: 800,
              fontSize: "1.3rem",
              margin: 0,
            }}
          >
            Review Moderator
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>
            Approve or reject pending patient reviews
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}
      >
        {isLoading ? (
          <div
            style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}
          >
            Loading reviews...
          </div>
        ) : !pendingReviews || pendingReviews.length === 0 ? (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "60px",
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
            <h3
              style={{ color: "#1a1a1a", fontWeight: 700, fontSize: "1.1rem" }}
            >
              All caught up!
            </h3>
            <p style={{ color: "#6b7280", marginTop: "8px" }}>
              No pending reviews to moderate.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              {pendingReviews.length} review
              {pendingReviews.length !== 1 ? "s" : ""} pending moderation
            </p>
            {pendingReviews.map((review) => (
              <div
                key={String(review.id)}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#ccfbf1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0d9488",
                          fontWeight: 800,
                          fontSize: "1rem",
                          flexShrink: 0,
                        }}
                      >
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#1a1a1a",
                            margin: 0,
                          }}
                        >
                          {review.reviewerName}
                        </p>
                        <p
                          style={{
                            color: "#f59e0b",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        >
                          {renderStars(review.rating)}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#374151",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {review.text}
                    </p>
                    {review.photo && (
                      <img
                        src={review.photo.getDirectURL()}
                        alt="Patient review"
                        style={{
                          marginTop: "12px",
                          width: "96px",
                          height: "96px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <Button
                      size="sm"
                      onClick={() => handleApprove(review.id)}
                      disabled={approving || deleting}
                      style={{
                        background: "#10b981",
                        color: "#fff",
                        fontWeight: 700,
                      }}
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
