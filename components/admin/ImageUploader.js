'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ImageUploader({ value, onChange, className }) {
  const isPublicId = value && !value.startsWith('http') && !value.startsWith('blob:');
  const initialPreview = isPublicId
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${value}`
    : value || null;
  const [preview, setPreview] = useState(initialPreview);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกรูปภาพ');
      return;
    }

    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    const blobUrl = URL.createObjectURL(file);
    setPreview(blobUrl);
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || 'อัปโหลดล้มเหลว');
      }

      const data = await res.json();
      onChange(data.public_id);
    } catch (err) {
      setError(err.message || 'อัปโหลดล้มเหลว');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="ตัวอย่างรูป"
            className="h-48 w-48 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">อัปโหลดรูป</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {uploading && (
        <p className="text-sm text-gray-500">กำลังอัปโหลด...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
