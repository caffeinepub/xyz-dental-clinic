import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isAdminAuthenticated } from '../../components/AdminGuard';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import { useGetAllBeforeAfterPairs, useAddBeforeAfterPair } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

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
      <Label
        style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '8px' }}
      >
        {label}
      </Label>
      <div
        style={{
          border: `2px dashed ${dragging ? '#0d9488' : '#d1d5db'}`,
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? '#f0fdfa' : '#fafafa',
          transition: 'all 0.2s',
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt={label} style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px' }} />
        ) : (
          <div style={{ padding: '24px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📷</div>
            <p style={{ fontSize: '0.875rem' }}>Drag & drop or click to upload</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
        />
      </div>
      {file && <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{file.name}</p>}
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
  const [uploadProgress, setUploadProgress] = useState<{ before: number; after: number }>({
    before: 0,
    after: 0,
  });

  if (!isAdminAuthenticated()) {
    navigate({ to: '/' });
    return null;
  }

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
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => navigate({ to: '/admin' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 style={{ color: '#1a1a1a', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>
            Before/After Manager
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
            Upload and manage transformation photo pairs
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Upload Form */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h2 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.05rem', marginBottom: '20px' }}>
            Upload New Pair
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
              className="ba-upload-grid"
            >
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
              <Label
                htmlFor="ba-description"
                style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '6px' }}
              >
                Description
              </Label>
              <Input
                id="ba-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Smile Makeover - Patient transformation"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #d1d5db',
                  color: '#1a1a1a',
                  borderRadius: '8px',
                }}
              />
            </div>

            {isPending && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    marginBottom: '4px',
                  }}
                >
                  <span>Before: {uploadProgress.before}%</span>
                  <span>After: {uploadProgress.after}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    height: '8px',
                  }}
                >
                  <div
                    style={{
                      background: '#0d9488',
                      height: '8px',
                      borderRadius: '999px',
                      transition: 'width 0.3s',
                      width: `${(uploadProgress.before + uploadProgress.after) / 2}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !beforeFile || !afterFile}
              style={{
                background: '#0d9488',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              {isPending ? 'Uploading...' : 'Upload Pair'}
            </Button>
          </form>
        </div>

        {/* Existing Pairs */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h2 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.05rem', marginBottom: '20px' }}>
            Existing Pairs ({pairs?.length ?? 0})
          </h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>Loading...</div>
          ) : !pairs || pairs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
              No pairs uploaded yet.
            </div>
          ) : (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}
            >
              {pairs.map((pair) => (
                <div
                  key={String(pair.id)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={pair.beforeImage.getDirectURL()}
                        alt="Before"
                        style={{ width: '100%', height: '128px', objectFit: 'cover', display: 'block' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontWeight: 700,
                        }}
                      >
                        Before
                      </span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={pair.afterImage.getDirectURL()}
                        alt="After"
                        style={{ width: '100%', height: '128px', objectFit: 'cover', display: 'block' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(13,148,136,0.8)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontWeight: 700,
                        }}
                      >
                        After
                      </span>
                    </div>
                  </div>
                  {pair.description && (
                    <div style={{ padding: '10px 14px', fontSize: '0.875rem', color: '#6b7280' }}>
                      {pair.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .ba-upload-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
