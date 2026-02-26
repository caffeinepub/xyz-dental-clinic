import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, Save, Loader2 } from 'lucide-react';
import { useGetAllServices, useUpdateService } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PREMIUM_SERVICES = [
  { id: 'dental-implants', name: 'Dental Implants' },
  { id: 'invisalign', name: 'Invisalign' },
  { id: 'laser-dentistry', name: 'Laser Dentistry' },
  { id: 'pediatric-dentistry', name: 'Pediatric Dentistry' },
  { id: 'smile-makeover', name: 'Smile Makeover' },
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
        { displayName: s.name, description: '', photoFile: null, uploadProgress: 0, isSaving: false, savedOk: false },
      ])
    )
  );

  const getForm = (id: string): ServiceForm => {
    const backendService = services?.find((s) => s.id === id);
    const form = forms[id];
    return {
      ...form,
      displayName: form.displayName || backendService?.displayName || '',
      description: form.description || backendService?.description || '',
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
          updateForm(serviceId, { uploadProgress: pct })
        );
      }

      await saveService({
        id: serviceId,
        displayName: form.displayName,
        description: form.description,
        featuredPhoto: blob,
      });

      updateForm(serviceId, { isSaving: false, savedOk: true, uploadProgress: 0 });
      setTimeout(() => updateForm(serviceId, { savedOk: false }), 3000);
    } catch {
      updateForm(serviceId, { isSaving: false });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="flex items-center gap-2 text-gray-500 hover:text-royal-blue transition-colors"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>
          <h1 className="text-3xl font-playfair font-bold text-royal-blue">Service Manager</h1>
        </div>

        <div className="space-y-6">
          {PREMIUM_SERVICES.map((service) => {
            const form = getForm(service.id);
            const backendService = services?.find((s) => s.id === service.id);

            return (
              <div key={service.id} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{service.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <Label>Display Name</Label>
                    <Input
                      value={form.displayName}
                      onChange={(e) => updateForm(service.id, { displayName: e.target.value })}
                      placeholder="Service display name"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>Featured Photo</Label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-sm text-gray-600 transition-colors">
                        <Upload size={14} />
                        {form.photoFile ? form.photoFile.name : 'Choose photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => updateForm(service.id, { photoFile: e.target.files?.[0] || null })}
                        />
                      </label>
                      {backendService?.featuredPhoto && !form.photoFile && (
                        <img
                          src={backendService.featuredPhoto.getDirectURL()}
                          alt="Current"
                          className="w-10 h-10 rounded-lg object-cover border"
                        />
                      )}
                    </div>
                    {form.uploadProgress > 0 && form.uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-teal h-1.5 rounded-full transition-all"
                          style={{ width: `${form.uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <Label>Description</Label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm(service.id, { description: e.target.value })}
                    placeholder="Service description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 resize-none"
                  />
                </div>

                <Button
                  onClick={() => handleSave(service.id)}
                  disabled={form.isSaving}
                  className="bg-royal-blue hover:bg-teal text-white rounded-full px-6"
                >
                  {form.isSaving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </span>
                  ) : form.savedOk ? (
                    '✓ Saved!'
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={14} /> Save Changes
                    </span>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
