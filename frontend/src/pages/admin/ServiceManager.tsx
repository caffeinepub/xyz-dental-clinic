import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import { useGetAllServices, useUpdateService } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PREMIUM_SERVICES = [
  { id: 'dental-implants', defaultName: 'Dental Implants', defaultDesc: 'Advanced titanium implants for permanent tooth replacement.' },
  { id: 'invisalign', defaultName: 'Invisalign', defaultDesc: 'Clear aligner therapy for a straighter smile without metal braces.' },
  { id: 'pediatric-dentistry', defaultName: 'Kids Dentistry', defaultDesc: 'Gentle, child-friendly dental care for growing smiles.' },
  { id: 'smile-makeover', defaultName: 'Smile Makeover', defaultDesc: 'Comprehensive cosmetic treatment to transform your smile.' },
  { id: 'laser-dentistry', defaultName: 'Laser Dentistry', defaultDesc: 'Precision laser treatments for painless dental procedures.' },
];

interface ServiceFormState {
  displayName: string;
  description: string;
  photoFile: File | null;
  photoPreview: string | null;
  uploadProgress: number;
}

export default function ServiceManager() {
  const navigate = useNavigate();
  const { data: services } = useGetAllServices();
  const { mutate: updateService, isPending } = useUpdateService();

  const [forms, setForms] = useState<Record<string, ServiceFormState>>(() => {
    const init: Record<string, ServiceFormState> = {};
    PREMIUM_SERVICES.forEach((s) => {
      init[s.id] = {
        displayName: s.defaultName,
        description: s.defaultDesc,
        photoFile: null,
        photoPreview: null,
        uploadProgress: 0,
      };
    });
    return init;
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync form state with backend data
  React.useEffect(() => {
    if (services) {
      setForms((prev) => {
        const updated = { ...prev };
        services.forEach((svc) => {
          if (updated[svc.id]) {
            updated[svc.id] = {
              ...updated[svc.id],
              displayName: svc.displayName || updated[svc.id].displayName,
              description: svc.description || updated[svc.id].description,
              photoPreview: svc.featuredPhoto ? svc.featuredPhoto.getDirectURL() : updated[svc.id].photoPreview,
            };
          }
        });
        return updated;
      });
    }
  }, [services]);

  const updateField = (id: string, field: keyof ServiceFormState, value: string | File | null | number) => {
    setForms((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleFileSelect = (id: string, file: File) => {
    const preview = URL.createObjectURL(file);
    setForms((prev) => ({
      ...prev,
      [id]: { ...prev[id], photoFile: file, photoPreview: preview },
    }));
  };

  const handleSave = async (serviceId: string) => {
    const form = forms[serviceId];
    setSavingId(serviceId);

    try {
      let featuredPhoto: ExternalBlob | null = null;

      if (form.photoFile) {
        const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
        featuredPhoto = ExternalBlob.fromBytes(bytes).withUploadProgress((p) => {
          updateField(serviceId, 'uploadProgress', p);
        });
      }

      updateService(
        {
          id: serviceId,
          displayName: form.displayName,
          description: form.description,
          featuredPhoto,
        },
        {
          onSuccess: () => {
            toast.success(`${form.displayName} updated successfully!`);
            setSavingId(null);
            updateField(serviceId, 'uploadProgress', 0);
          },
          onError: (err) => {
            toast.error('Failed to save: ' + (err as Error).message);
            setSavingId(null);
          },
        }
      );
    } catch {
      toast.error('Failed to process image');
      setSavingId(null);
    }
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
            <h1 className="text-2xl font-display font-bold text-foreground">Service Editor</h1>
            <p className="text-muted-foreground text-sm">Edit service names, descriptions, and featured photos</p>
          </div>
        </div>

        <div className="space-y-6">
          {PREMIUM_SERVICES.map((svc) => {
            const form = forms[svc.id];
            const isSaving = savingId === svc.id && isPending;

            return (
              <div key={svc.id} className="glass-card rounded-2xl border border-border/40 p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">{svc.defaultName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Text fields */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`name-${svc.id}`} className="text-sm font-semibold mb-1 block">
                        Display Name
                      </Label>
                      <Input
                        id={`name-${svc.id}`}
                        value={form.displayName}
                        onChange={(e) => updateField(svc.id, 'displayName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`desc-${svc.id}`} className="text-sm font-semibold mb-1 block">
                        Description
                      </Label>
                      <Textarea
                        id={`desc-${svc.id}`}
                        value={form.description}
                        onChange={(e) => updateField(svc.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Right: Photo upload */}
                  <div>
                    <Label className="text-sm font-semibold mb-1 block">Featured Photo</Label>
                    <div
                      className="border-2 border-dashed border-border/60 rounded-xl p-3 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRefs.current[svc.id]?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files[0];
                        if (f && f.type.startsWith('image/')) handleFileSelect(svc.id, f);
                      }}
                    >
                      {form.photoPreview ? (
                        <img
                          src={form.photoPreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="py-6 text-muted-foreground">
                          <div className="text-2xl mb-1">📷</div>
                          <p className="text-xs">Drag & drop or click to upload</p>
                        </div>
                      )}
                      <input
                        ref={(el) => { fileInputRefs.current[svc.id] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileSelect(svc.id, f);
                        }}
                      />
                    </div>
                    {form.photoFile && (
                      <p className="text-xs text-muted-foreground mt-1">{form.photoFile.name}</p>
                    )}
                  </div>
                </div>

                {isSaving && form.uploadProgress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Uploading photo...</span>
                      <span>{form.uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${form.uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleSave(svc.id)}
                    disabled={isSaving}
                    size="sm"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
