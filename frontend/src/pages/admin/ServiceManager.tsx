import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllServices, useUpdateService } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';

const DEFAULT_SERVICES = [
  { id: 'dental-implants', displayName: 'Advanced Dental Implants', description: '3D-guided precision implants with lifetime warranty and same-day placement options.' },
  { id: 'invisalign', displayName: 'Invisalign Clear Aligners', description: 'Crystal-clear aligners with AI-powered treatment planning for invisible teeth correction.' },
  { id: 'pediatric-dentistry', displayName: 'Pediatric Dentistry', description: 'Fun, fear-free dental care designed especially for children aged 1–16.' },
  { id: 'smile-makeover', displayName: 'Smile Makeover', description: 'Complete smile transformation combining veneers, whitening, and contouring.' },
  { id: 'laser-dentistry', displayName: 'Laser Dentistry', description: 'Painless precision laser treatments for gums, cavities, and whitening.' },
];

interface ServiceFormState {
  displayName: string;
  description: string;
  photoFile: File | null;
  photoPreview: string | null;
  existingPhotoUrl: string | null;
}

export default function ServiceManager() {
  const navigate = useNavigate();
  const { data: backendServices, isLoading } = useGetAllServices();
  const updateService = useUpdateService();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, ServiceFormState>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getServiceData = (id: string) => {
    const backend = backendServices?.find(s => s.id === id);
    const defaults = DEFAULT_SERVICES.find(s => s.id === id)!;
    return {
      displayName: backend?.displayName ?? defaults.displayName,
      description: backend?.description ?? defaults.description,
      existingPhotoUrl: backend?.featuredPhoto ? backend.featuredPhoto.getDirectURL() : null,
    };
  };

  const startEdit = (id: string) => {
    const data = getServiceData(id);
    setForms(f => ({
      ...f,
      [id]: {
        displayName: data.displayName,
        description: data.description,
        photoFile: null,
        photoPreview: null,
        existingPhotoUrl: data.existingPhotoUrl,
      },
    }));
    setEditingId(id);
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      setForms(f => ({
        ...f,
        [id]: { ...f[id], photoFile: file, photoPreview: e.target?.result as string },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(id, file);
    }
  };

  const handleSave = async (id: string) => {
    const form = forms[id];
    if (!form) return;

    let blob: ExternalBlob | null = null;
    if (form.photoFile) {
      const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
      blob = ExternalBlob.fromBytes(bytes).withUploadProgress(pct => {
        setUploadProgress(p => ({ ...p, [id]: pct }));
      });
    }

    try {
      await updateService.mutateAsync({
        id,
        displayName: form.displayName,
        description: form.description,
        featuredPhoto: blob,
      });
      toast.success('Service updated successfully!');
      setEditingId(null);
      setUploadProgress(p => { const n = { ...p }; delete n[id]; return n; });
    } catch {
      toast.error('Failed to update service');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate({ to: '/admin/dashboard' })} className="text-white/60 hover:text-white transition-colors">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Service Manager</h1>
        </div>

        {isLoading ? (
          <div className="text-white/60 text-center py-20">Loading services...</div>
        ) : (
          <div className="space-y-5">
            {DEFAULT_SERVICES.map(svc => {
              const data = getServiceData(svc.id);
              const isEditing = editingId === svc.id;
              const form = forms[svc.id];
              const progress = uploadProgress[svc.id];

              return (
                <div key={svc.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{data.displayName}</h3>
                      <p className="text-white/50 text-xs mt-0.5">{svc.id}</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => startEdit(svc.id)}
                        className="px-4 py-1.5 rounded-lg bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm hover:bg-teal-500/30 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="flex gap-4">
                      {data.existingPhotoUrl && (
                        <img src={data.existingPhotoUrl} alt={data.displayName} className="w-24 h-16 object-cover rounded-lg border border-white/10" />
                      )}
                      <p className="text-white/65 text-sm leading-relaxed">{data.description}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1.5">Display Name</label>
                        <input
                          type="text"
                          value={form?.displayName ?? ''}
                          onChange={e => setForms(f => ({ ...f, [svc.id]: { ...f[svc.id], displayName: e.target.value } }))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/60 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm mb-1.5">Description</label>
                        <textarea
                          value={form?.description ?? ''}
                          onChange={e => setForms(f => ({ ...f, [svc.id]: { ...f[svc.id], description: e.target.value } }))}
                          rows={3}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/60 transition-colors resize-none"
                        />
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label className="block text-white/70 text-sm mb-1.5">Featured Photo</label>
                        <div
                          className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-teal-400/50 transition-colors"
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => handleDrop(svc.id, e)}
                          onClick={() => fileInputRefs.current[svc.id]?.click()}
                        >
                          {form?.photoPreview ? (
                            <img src={form.photoPreview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                          ) : form?.existingPhotoUrl ? (
                            <div>
                              <img src={form.existingPhotoUrl} alt="Current" className="max-h-24 mx-auto rounded-lg object-cover mb-2 opacity-60" />
                              <p className="text-white/40 text-xs">Drop new image to replace</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-white/50 text-sm">Drag & drop or click to upload</p>
                              <p className="text-white/30 text-xs mt-1">PNG, JPG, WebP</p>
                            </div>
                          )}
                          <input
                            ref={el => { fileInputRefs.current[svc.id] = el; }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleFileChange(svc.id, e.target.files?.[0] ?? null)}
                          />
                        </div>
                        {progress !== undefined && (
                          <div className="mt-2">
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-400 transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="text-white/40 text-xs mt-1">{Math.round(progress)}% uploaded</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => handleSave(svc.id)}
                          disabled={updateService.isPending}
                          className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-medium text-sm transition-colors disabled:opacity-50"
                        >
                          {updateService.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 font-medium text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
