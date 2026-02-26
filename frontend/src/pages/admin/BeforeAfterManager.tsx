import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import { useGetAllBeforeAfterPairs, useAddBeforeAfterPair } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ImageUploadZone({
  label,
  file,
  preview,
  onFileSelect,
}: {
  label: string;
  file: File | null;
  preview: string | null;
  onFileSelect: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) onFileSelect(f);
  };

  return (
    <div>
      <Label className="text-sm font-semibold mb-2 block">{label}</Label>
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
          dragging ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-teal-400'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-32 object-cover rounded-lg" />
        ) : (
          <div className="py-6 text-slate-400">
            <div className="text-3xl mb-2">📷</div>
            <p className="text-sm">Drag & drop or click to upload</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
        />
      </div>
      {file && <p className="text-xs text-slate-500 mt-1">{file.name}</p>}
    </div>
  );
}

export default function BeforeAfterManager() {
  const navigate = useNavigate();
  const { data: pairs, isLoading } = useGetAllBeforeAfterPairs();
  const { mutate: addPair, isPending } = useAddBeforeAfterPair();

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState<{ before: number; after: number }>({ before: 0, after: 0 });

  const handleFileSelect = (type: 'before' | 'after', file: File) => {
    const url = URL.createObjectURL(file);
    if (type === 'before') {
      setBeforeFile(file);
      setBeforePreview(url);
    } else {
      setAfterFile(file);
      setAfterPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) {
      toast.error('Please select both before and after images');
      return;
    }

    try {
      const beforeBytes = new Uint8Array(await beforeFile.arrayBuffer());
      const afterBytes = new Uint8Array(await afterFile.arrayBuffer());

      const beforeBlob = ExternalBlob.fromBytes(beforeBytes).withUploadProgress((p) =>
        setUploadProgress((prev) => ({ ...prev, before: p }))
      );
      const afterBlob = ExternalBlob.fromBytes(afterBytes).withUploadProgress((p) =>
        setUploadProgress((prev) => ({ ...prev, after: p }))
      );

      addPair(
        { beforeImage: beforeBlob, afterImage: afterBlob, description },
        {
          onSuccess: () => {
            toast.success('Before/After pair uploaded successfully!');
            setBeforeFile(null);
            setAfterFile(null);
            setBeforePreview(null);
            setAfterPreview(null);
            setDescription('');
            setUploadProgress({ before: 0, after: 0 });
          },
          onError: (err) => {
            toast.error('Upload failed: ' + (err as Error).message);
          },
        }
      );
    } catch {
      toast.error('Failed to process images');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 font-playfair">Before/After Manager</h1>
            <p className="text-slate-500 text-sm">Upload and manage transformation photo pairs</p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Upload New Pair</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadZone
                label="Before Image"
                file={beforeFile}
                preview={beforePreview}
                onFileSelect={(f) => handleFileSelect('before', f)}
              />
              <ImageUploadZone
                label="After Image"
                file={afterFile}
                preview={afterPreview}
                onFileSelect={(f) => handleFileSelect('after', f)}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold mb-2 block">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Smile Makeover - Patient transformation"
              />
            </div>

            {isPending && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Before: {uploadProgress.before}%</span>
                  <span>After: {uploadProgress.after}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${(uploadProgress.before + uploadProgress.after) / 2}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !beforeFile || !afterFile}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isPending ? 'Uploading...' : 'Upload Pair'}
            </Button>
          </form>
        </div>

        {/* Existing Pairs */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Existing Pairs ({pairs?.length ?? 0})
          </h2>
          {isLoading ? (
            <div className="text-center py-8 text-slate-400">Loading...</div>
          ) : !pairs || pairs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No pairs uploaded yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pairs.map((pair) => (
                <div key={String(pair.id)} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img
                        src={pair.beforeImage.getDirectURL()}
                        alt="Before"
                        className="w-full h-32 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        Before
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        src={pair.afterImage.getDirectURL()}
                        alt="After"
                        className="w-full h-32 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-teal-600/80 text-white text-xs px-2 py-0.5 rounded">
                        After
                      </span>
                    </div>
                  </div>
                  {pair.description && (
                    <div className="p-3 text-sm text-slate-500">{pair.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
