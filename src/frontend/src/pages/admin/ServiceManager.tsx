import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import React, { useState } from "react";
import { ExternalBlob } from "../../backend";
import { isAdminAuthenticated } from "../../components/AdminGuard";
import { useGetAllServices, useUpdateService } from "../../hooks/useQueries";

const PREMIUM_SERVICES = [
  { id: "dental-implants", name: "Dental Implants" },
  { id: "invisalign", name: "Invisalign" },
  { id: "laser-dentistry", name: "Laser Dentistry" },
  { id: "pediatric-dentistry", name: "Pediatric Dentistry" },
  { id: "smile-makeover", name: "Smile Makeover" },
];

interface ServiceForm {
  displayName: string;
  description: string;
  photoFile: File | null;
  uploadProgress: number;
  isSaving: boolean;
  savedOk: boolean;
}

export default function ServiceManager() {
  const navigate = useNavigate();
  const { data: services } = useGetAllServices();
  const { mutateAsync: saveService } = useUpdateService();

  const [forms, setForms] = useState<Record<string, ServiceForm>>(() =>
    Object.fromEntries(
      PREMIUM_SERVICES.map((s) => [
        s.id,
        {
          displayName: s.name,
          description: "",
          photoFile: null,
          uploadProgress: 0,
          isSaving: false,
          savedOk: false,
        },
      ]),
    ),
  );

  if (!isAdminAuthenticated()) {
    navigate({ to: "/" });
    return null;
  }

  const getForm = (id: string): ServiceForm => {
    const backendService = services?.find((s) => s.id === id);
    const form = forms[id];
    return {
      ...form,
      displayName: form.displayName || backendService?.displayName || "",
      description: form.description || backendService?.description || "",
    };
  };

  const updateForm = (id: string, updates: Partial<ServiceForm>) => {
    setForms((prev) => ({ ...prev, [id]: { ...prev[id], ...updates } }));
  };

  const handleSave = async (serviceId: string) => {
    const form = forms[serviceId];
    updateForm(serviceId, { isSaving: true, savedOk: false });

    try {
      let blob: ExternalBlob | null = null;
      if (form.photoFile) {
        const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
        blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          updateForm(serviceId, { uploadProgress: pct }),
        );
      }

      await saveService({
        id: serviceId,
        displayName: form.displayName,
        description: form.description,
        featuredPhoto: blob,
      });

      updateForm(serviceId, {
        isSaving: false,
        savedOk: true,
        uploadProgress: 0,
      });
      setTimeout(() => updateForm(serviceId, { savedOk: false }), 3000);
    } catch {
      updateForm(serviceId, { isSaving: false });
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
          Service Manager
        </h1>
      </div>

      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {PREMIUM_SERVICES.map((service) => {
            const form = getForm(service.id);
            const backendService = services?.find((s) => s.id === service.id);

            return (
              <div
                key={service.id}
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
                    fontSize: "1.05rem",
                    marginBottom: "20px",
                  }}
                >
                  {service.name}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                  className="service-form-grid"
                >
                  <div>
                    <Label
                      style={{
                        color: "#1a1a1a",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Display Name
                    </Label>
                    <Input
                      value={form.displayName}
                      onChange={(e) =>
                        updateForm(service.id, { displayName: e.target.value })
                      }
                      placeholder="Service display name"
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #d1d5db",
                        color: "#1a1a1a",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <div>
                    <Label
                      style={{
                        color: "#1a1a1a",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Featured Photo
                    </Label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          border: "1.5px solid #d1d5db",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          color: "#374151",
                          background: "#FFFFFF",
                          transition: "all 0.2s",
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        {form.photoFile ? form.photoFile.name : "Choose photo"}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            updateForm(service.id, {
                              photoFile: e.target.files?.[0] || null,
                            })
                          }
                        />
                      </label>
                      {backendService?.featuredPhoto && !form.photoFile && (
                        <img
                          src={backendService.featuredPhoto.getDirectURL()}
                          alt="Current"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            border: "1px solid #e5e7eb",
                          }}
                        />
                      )}
                    </div>
                    {form.uploadProgress > 0 && form.uploadProgress < 100 && (
                      <div
                        style={{
                          width: "100%",
                          background: "#e5e7eb",
                          borderRadius: "999px",
                          height: "6px",
                          marginTop: "6px",
                        }}
                      >
                        <div
                          style={{
                            background: "#0d9488",
                            height: "6px",
                            borderRadius: "999px",
                            width: `${form.uploadProgress}%`,
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <Label
                    style={{
                      color: "#1a1a1a",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Description
                  </Label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      updateForm(service.id, { description: e.target.value })
                    }
                    placeholder="Service description..."
                    rows={3}
                    style={{
                      width: "100%",
                      background: "#FFFFFF",
                      border: "1.5px solid #d1d5db",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "#1a1a1a",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <Button
                  onClick={() => handleSave(service.id)}
                  disabled={form.isSaving}
                  style={{
                    background: form.savedOk ? "#10b981" : "#0d9488",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: 700,
                    padding: "10px 24px",
                  }}
                >
                  {form.isSaving ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : form.savedOk ? (
                    "✓ Saved!"
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .service-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
