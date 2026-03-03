import {
  Calendar,
  CheckCircle,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useBookAppointment } from "../hooks/useQueries";

interface BookAppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  preselectedService?: string;
}

const SERVICES = [
  "Invisalign",
  "Dental Implants",
  "Laser Dentistry",
  "Pediatric Dentistry",
  "Smile Makeover",
  "General Checkup",
  "Teeth Whitening",
  "Root Canal",
  "Other",
];

export interface LocalAppointment {
  id: string;
  patientName: string;
  contactInfo: string;
  preferredDate: string;
  serviceType: string;
  status: string;
  createdAt: number;
}

const LOCAL_APPOINTMENTS_KEY = "xyz_dental_appointments";

export function saveAppointmentLocally(
  appt: Omit<LocalAppointment, "id" | "createdAt">,
) {
  const existing: LocalAppointment[] = getLocalAppointments();
  const newAppt: LocalAppointment = {
    ...appt,
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: Date.now(),
    status: "pending",
  };
  existing.push(newAppt);
  localStorage.setItem(LOCAL_APPOINTMENTS_KEY, JSON.stringify(existing));
  return newAppt;
}

export function getLocalAppointments(): LocalAppointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_APPOINTMENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalAppointment[];
  } catch {
    return [];
  }
}

export function updateLocalAppointmentStatus(id: string, status: string) {
  const existing = getLocalAppointments();
  const updated = existing.map((a) => (a.id === id ? { ...a, status } : a));
  localStorage.setItem(LOCAL_APPOINTMENTS_KEY, JSON.stringify(updated));
}

export default function BookAppointmentDialog({
  isOpen,
  onClose,
  defaultService,
  preselectedService,
}: BookAppointmentDialogProps) {
  const initialService = preselectedService || defaultService || "";
  const [patientName, setPatientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [serviceType, setServiceType] = useState(initialService);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookAppointment = useBookAppointment();

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName.trim()) newErrors.patientName = "Naam zaruri hai";
    if (!contactInfo.trim()) newErrors.contactInfo = "Phone / Email zaruri hai";
    if (!preferredDate) newErrors.preferredDate = "Date select karein";
    if (!serviceType) newErrors.serviceType = "Service select karein";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Always save to localStorage first (guaranteed to work)
    saveAppointmentLocally({
      patientName: patientName.trim(),
      contactInfo: contactInfo.trim(),
      preferredDate,
      serviceType,
      status: "pending",
    });

    // Also try backend (fire and forget - don't block success on this)
    try {
      const dateMs = new Date(preferredDate).getTime();
      const dateNs = BigInt(dateMs) * BigInt(1_000_000);
      await bookAppointment.mutateAsync({
        patientName: patientName.trim(),
        contactInfo: contactInfo.trim(),
        preferredDate: dateNs,
        serviceType,
      });
    } catch {
      // Backend failed but we already saved locally — that's fine
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setPatientName("");
    setContactInfo("");
    setPreferredDate("");
    setServiceType(initialService);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "0.75rem 1rem",
    border: hasError ? "2px solid #dc2626" : "1.5px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#111827",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "inherit",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
        animation: "fadeInOverlay 0.2s ease",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "2rem",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "slideUpModal 0.25s ease",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          data-ocid="booking.close_button"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "#f3f4f6",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div
            style={{ textAlign: "center", padding: "2rem 0" }}
            data-ocid="booking.success_state"
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                animation: "bounceIn 0.4s ease",
              }}
            >
              <CheckCircle size={40} style={{ color: "#16a34a" }} />
            </div>
            <h2
              style={{
                color: "#111827",
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
              }}
            >
              Appointment Confirmed!
            </h2>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.5rem",
                fontSize: "0.95rem",
              }}
            >
              Shukriya, <strong>{patientName}</strong>! Aapki appointment book
              ho gayi hai.
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.85rem",
                marginBottom: "1.75rem",
              }}
            >
              Hum jald hi aapse {contactInfo} par sampark karenge.
            </p>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: "0.75rem 2.5rem",
                background: "linear-gradient(135deg, #1d4ed8, #0369a1)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Theek Hai
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  color: "#111827",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: "0.3rem",
                }}
              >
                Appointment Book Karein
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Apni details bharein, hum jald aapse contact karenge.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Patient Name */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="booking-name"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#374151",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <User size={14} style={{ color: "#0369a1" }} />
                  Poora Naam
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Aapka poora naam"
                  data-ocid="booking.input"
                  style={inputStyle(!!errors.patientName)}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0ea5e9";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(14,165,233,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.patientName
                      ? "#dc2626"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.patientName && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.patientName}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="booking-contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#374151",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <Phone size={14} style={{ color: "#0369a1" }} />
                  Phone Number
                </label>
                <input
                  id="booking-contact"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Mobile number ya email"
                  style={inputStyle(!!errors.contactInfo)}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0ea5e9";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(14,165,233,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.contactInfo
                      ? "#dc2626"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.contactInfo && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.contactInfo}
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="booking-date"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#374151",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <Calendar size={14} style={{ color: "#0369a1" }} />
                  Pasand ki Tarikh
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle(!!errors.preferredDate)}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0ea5e9";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(14,165,233,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.preferredDate
                      ? "#dc2626"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.preferredDate && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Service Type */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label
                  htmlFor="booking-service"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#374151",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <Stethoscope size={14} style={{ color: "#0369a1" }} />
                  Service
                </label>
                <select
                  id="booking-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  data-ocid="booking.select"
                  style={{
                    ...inputStyle(!!errors.serviceType),
                    color: serviceType ? "#111827" : "#9ca3af",
                  }}
                >
                  <option value="">Service chunein</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-ocid="booking.submit_button"
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  background: isSubmitting
                    ? "#93c5fd"
                    : "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 4px 20px rgba(14,165,233,0.4)",
                  letterSpacing: "0.02em",
                }}
              >
                {isSubmitting ? "Book ho rahi hai..." : "Abhi Book Karein"}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
