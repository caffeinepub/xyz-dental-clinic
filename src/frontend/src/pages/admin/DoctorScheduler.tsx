import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Stethoscope, UserPlus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { isAdminAuthenticated } from "../../components/AdminGuard";
import { useAddDoctor, useGetAllDoctors } from "../../hooks/useQueries";

export default function DoctorScheduler() {
  const navigate = useNavigate();
  const { data: doctors, isLoading } = useGetAllDoctors();
  const addDoctor = useAddDoctor();

  const [form, setForm] = useState({ name: "", specialty: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isAdminAuthenticated()) {
    navigate({ to: "/" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.name.trim() || !form.specialty.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      await addDoctor.mutateAsync({
        name: form.name.trim(),
        specialty: form.specialty.trim(),
      });
      setSuccessMsg(`Dr. ${form.name} added successfully!`);
      setForm({ name: "", specialty: "" });
    } catch {
      setErrorMsg("Failed to add doctor. Please try again.");
    }
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
          gap: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/admin" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1
          style={{
            color: "#1a1a1a",
            fontWeight: 800,
            fontSize: "1.3rem",
            margin: 0,
          }}
        >
          Doctor Scheduler
        </h1>
      </div>

      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Add Doctor Form */}
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
            Add New Doctor
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                htmlFor="ds-doctor-name"
                style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  marginBottom: "6px",
                  fontSize: "0.875rem",
                }}
              >
                Doctor Name
              </label>
              <input
                id="ds-doctor-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Dr. Rajesh Kumar"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  color: "#1a1a1a",
                  background: "#FFFFFF",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="ds-specialty"
                style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  marginBottom: "6px",
                  fontSize: "0.875rem",
                }}
              >
                Specialty
              </label>
              <input
                id="ds-specialty"
                type="text"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                placeholder="e.g. Orthodontist"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  color: "#1a1a1a",
                  background: "#FFFFFF",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {successMsg && (
              <p
                style={{
                  color: "#16a34a",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {successMsg}
              </p>
            )}
            {errorMsg && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={addDoctor.isPending}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: addDoctor.isPending ? "#93c5fd" : "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: addDoctor.isPending ? "not-allowed" : "pointer",
                alignSelf: "flex-start",
              }}
            >
              {addDoctor.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Add Doctor
                </>
              )}
            </button>
          </form>
        </div>

        {/* Doctors List */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "28px",
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
            Our Doctors
          </h2>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "32px",
              }}
            >
              <Loader2
                size={24}
                className="animate-spin"
                style={{ color: "#6b7280" }}
              />
            </div>
          ) : !doctors || doctors.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "32px", color: "#9ca3af" }}
            >
              <Stethoscope
                size={40}
                style={{ margin: "0 auto 12px", opacity: 0.4 }}
              />
              <p>No doctors added yet.</p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {doctors.map((doctor) => (
                <div
                  key={String(doctor.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Stethoscope size={20} style={{ color: "#1e40af" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#1a1a1a",
                        fontSize: "0.95rem",
                        margin: 0,
                      }}
                    >
                      {doctor.name}
                    </p>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.85rem",
                        margin: 0,
                      }}
                    >
                      {doctor.specialty}
                    </p>
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
