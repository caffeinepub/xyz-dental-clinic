import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { isAdminAuthenticated } from "../../components/AdminGuard";
import {
  type LocalAppointment,
  getLocalAppointments,
  updateLocalAppointmentStatus,
} from "../../components/BookAppointmentDialog";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#fef3c7", text: "#b45309" },
  confirmed: { bg: "#ccfbf1", text: "#0f766e" },
  completed: { bg: "#dcfce7", text: "#15803d" },
  cancelled: { bg: "#fee2e2", text: "#b91c1c" },
};

function playDingSound() {
  try {
    const ctx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio not available
  }
}

export default function Appointments() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [appointments, setAppointments] = useState<LocalAppointment[]>([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const prevCountRef = useRef<number>(0);
  const isAuthed = isAdminAuthenticated();

  const loadAppointments = React.useCallback(() => {
    const data = getLocalAppointments();
    data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    setAppointments(data);
    if (prevCountRef.current > 0 && data.length > prevCountRef.current) {
      playDingSound();
      setHasNewNotif(true);
    }
    prevCountRef.current = data.length;
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    loadAppointments();
    const interval = setInterval(loadAppointments, 5000);
    return () => clearInterval(interval);
  }, [isAuthed, loadAppointments]);

  if (!isAuthed) {
    navigate({ to: "/" });
    return null;
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    updateLocalAppointmentStatus(id, newStatus);
    loadAppointments();
  };

  const dismissNotif = () => setHasNewNotif(false);

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const isEmail = (contact: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = (contact: string) =>
    /^[\d\s+\-()\u0900-\u097F]{7,}$/.test(contact.trim());

  const getWhatsAppLink = (contact: string) => {
    if (isPhone(contact)) {
      const cleaned = contact.replace(/[\s\-()+]/g, "");
      return `https://wa.me/${cleaned}`;
    }
    return null;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* New appointment notification banner */}
      {hasNewNotif && (
        <div
          style={{
            background: "linear-gradient(90deg, #dc2626, #b91c1c)",
            color: "#fff",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            animation: "blink-banner 1s ease infinite alternate",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Bell
              size={18}
              style={{ animation: "ring-bell 0.5s ease infinite alternate" }}
            />
            <span style={{ fontWeight: 700 }}>
              Naya Appointment aaya! List refresh ho gayi.
            </span>
          </div>
          <button
            type="button"
            onClick={dismissNotif}
            style={{
              background: "rgba(255,255,255,0.25)",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              padding: "4px 12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            data-ocid="appointments.back_button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1
            style={{
              color: "#1a1a1a",
              fontWeight: 800,
              fontSize: "1.3rem",
              margin: 0,
            }}
          >
            Appointments
          </h1>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              data-ocid="appointments.loading_state"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
                animation: "pulse-live 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 600 }}
            >
              LIVE
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={loadAppointments}
          data-ocid="appointments.secondary_button"
          style={{
            background: "#ffffff",
            border: "1.5px solid #d1d5db",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div
        style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {(
            ["all", "pending", "confirmed", "completed", "cancelled"] as const
          ).map((s) => {
            const count =
              s === "all"
                ? appointments.length
                : appointments.filter((a) => a.status === s).length;
            const colors = STATUS_COLORS[s] || {
              bg: "#e0f2fe",
              text: "#0369a1",
            };
            const isAll = s === "all";
            return (
              <button
                key={s}
                type="button"
                data-ocid={`appointments.${s}.tab`}
                onClick={() => setFilter(s)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border:
                    filter === s
                      ? "2px solid currentColor"
                      : "2px solid transparent",
                  background: isAll
                    ? filter === s
                      ? "#e0f2fe"
                      : "#f0f9ff"
                    : colors.bg,
                  color: isAll ? "#0369a1" : colors.text,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)} (
                {count})
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div
            data-ocid="appointments.empty_state"
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "60px",
              textAlign: "center",
              color: "#6b7280",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "8px" }}
            >
              Koi appointment nahi mili
            </p>
            <p style={{ fontSize: "0.875rem" }}>
              Jab patient form bharein, appointments yahan dikhenge.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[
                      "#",
                      "Patient Ka Naam",
                      "Phone / Email",
                      "Service",
                      "Tarikh",
                      "Status",
                      "Update",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          color: "#374151",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          borderBottom: "1px solid #e5e7eb",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((appt, idx) => {
                    const colors = STATUS_COLORS[appt.status] || {
                      bg: "#f3f4f6",
                      text: "#374151",
                    };
                    const whatsapp = getWhatsAppLink(appt.contactInfo);
                    return (
                      <tr
                        key={appt.id}
                        data-ocid={`appointments.row.${idx + 1}`}
                        style={{
                          borderBottom: "1px solid #f3f4f6",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "#f8fafc";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "";
                        }}
                      >
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "#9ca3af",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {idx + 1}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "#111827",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {appt.patientName}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "#f0f9ff",
                                border: "1px solid #bae6fd",
                                borderRadius: "8px",
                                padding: "5px 10px",
                              }}
                            >
                              {isEmail(appt.contactInfo) ? (
                                <Mail
                                  size={13}
                                  style={{ color: "#0369a1", flexShrink: 0 }}
                                />
                              ) : (
                                <Phone
                                  size={13}
                                  style={{ color: "#0369a1", flexShrink: 0 }}
                                />
                              )}
                              <span
                                style={{
                                  color: "#0369a1",
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  wordBreak: "break-all",
                                }}
                              >
                                {appt.contactInfo}
                              </span>
                            </div>
                            <div style={{ display: "flex", gap: "6px" }}>
                              {isPhone(appt.contactInfo) && (
                                <a
                                  href={`tel:${appt.contactInfo.replace(/\s/g, "")}`}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "3px 10px",
                                    background: "#dcfce7",
                                    color: "#15803d",
                                    borderRadius: "6px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    border: "1px solid #86efac",
                                  }}
                                >
                                  <Phone size={11} /> Call
                                </a>
                              )}
                              {whatsapp && (
                                <a
                                  href={whatsapp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "3px 10px",
                                    background: "#dcfce7",
                                    color: "#15803d",
                                    borderRadius: "6px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    border: "1px solid #86efac",
                                  }}
                                >
                                  <MessageCircle size={11} /> WhatsApp
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "#374151",
                            fontSize: "0.875rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {appt.serviceType}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "#374151",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(appt.preferredDate)}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span
                            style={{
                              background: colors.bg,
                              color: colors.text,
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {appt.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <select
                            value={appt.status}
                            onChange={(e) =>
                              handleStatusChange(appt.id, e.target.value)
                            }
                            data-ocid={`appointments.select.${idx + 1}`}
                            style={{
                              padding: "6px 10px",
                              border: "1.5px solid #d1d5db",
                              borderRadius: "8px",
                              color: "#1a1a1a",
                              fontSize: "0.82rem",
                              background: "#fff",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes blink-banner {
          from { opacity: 1; }
          to { opacity: 0.85; }
        }
        @keyframes ring-bell {
          from { transform: rotate(-15deg); }
          to { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
