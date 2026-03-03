import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  Calendar,
  FileText,
  Image,
  LogOut,
  Settings,
  Star,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { ClinicStatus } from "../../backend";
import { isAdminAuthenticated } from "../../components/AdminGuard";
import { useClinicStatusContext } from "../../context/ClinicStatusContext";
import { useSetClinicStatus } from "../../hooks/useQueries";

export default function Dashboard() {
  const navigate = useNavigate();
  const { clinicStatus } = useClinicStatusContext();
  const setClinicStatusMutation = useSetClinicStatus();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isAdminAuthenticated()) {
    navigate({ to: "/" });
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    navigate({ to: "/" });
  };

  const handleStatusChange = async (newStatus: ClinicStatus) => {
    setIsUpdating(true);
    try {
      await setClinicStatusMutation.mutateAsync(newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const navCards = [
    {
      label: "Appointments",
      icon: Calendar,
      route: "/admin/appointments",
      color: "#0d9488",
    },
    {
      label: "Services",
      icon: Settings,
      route: "/admin/services",
      color: "#0ea5e9",
    },
    { label: "Reviews", icon: Star, route: "/admin/reviews", color: "#f59e0b" },
    {
      label: "Before/After",
      icon: Image,
      route: "/admin/before-after",
      color: "#8b5cf6",
    },
    {
      label: "Doctors",
      icon: Users,
      route: "/admin/doctors",
      color: "#ec4899",
    },
    {
      label: "Content",
      icon: FileText,
      route: "/admin/content",
      color: "#10b981",
    },
  ];

  const statusOptions: { value: ClinicStatus; label: string; color: string }[] =
    [
      { value: ClinicStatus.open, label: "🟢 Open", color: "#10b981" },
      { value: ClinicStatus.closed, label: "🔴 Closed", color: "#ef4444" },
      {
        value: ClinicStatus.emergency,
        label: "🟡 Emergency Only",
        color: "#f59e0b",
      },
    ];

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
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Activity className="w-6 h-6" style={{ color: "#0d9488" }} />
          <h1
            style={{
              color: "#1a1a1a",
              fontWeight: 800,
              fontSize: "1.3rem",
              margin: 0,
            }}
          >
            Admin Dashboard
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#fee2e2",
            color: "#dc2626",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Clinic Status Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "32px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: "20px",
            }}
          >
            Clinic Status
          </h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {statusOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleStatusChange(opt.value)}
                disabled={isUpdating || setClinicStatusMutation.isPending}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: "2px solid",
                  borderColor:
                    clinicStatus === opt.value ? opt.color : "#e5e7eb",
                  background:
                    clinicStatus === opt.value ? opt.color : "#FFFFFF",
                  color: clinicStatus === opt.value ? "#fff" : "#374151",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor:
                    isUpdating || setClinicStatusMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    isUpdating || setClinicStatusMutation.isPending ? 0.7 : 1,
                  transition: "all 0.2s",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p
            style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "12px" }}
          >
            Current status:{" "}
            <strong style={{ color: "#1a1a1a" }}>
              {statusOptions.find((o) => o.value === clinicStatus)?.label ??
                clinicStatus ??
                "Loading..."}
            </strong>
            {(isUpdating || setClinicStatusMutation.isPending) &&
              " (updating...)"}
          </p>
        </div>

        {/* Navigation Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
          }}
        >
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                type="button"
                key={card.label}
                onClick={() => navigate({ to: card.route })}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "24px 16px",
                  border: "1.5px solid #e5e7eb",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    card.color;
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    `0 8px 24px ${card.color}22`;
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#e5e7eb";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${card.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <span
                  style={{
                    color: "#1a1a1a",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {card.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
