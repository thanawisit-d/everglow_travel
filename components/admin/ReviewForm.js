'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';

export default function ReviewForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    tag_th: '',
    tag_en: '',
    text_th: '',
    text_en: '',
    sort_order: 0,
    image: null,
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Required';
    if (!form.text_th) errs.text_th = 'Required';
    if (!form.text_en) errs.text_en = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, sort_order: Number(form.sort_order) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Review Info</h2>
        <div className="grid gap-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <Input
            label="Tag (TH)"
            value={form.tag_th}
            onChange={(e) => handleChange('tag_th', e.target.value)}
          />
          <Input
            label="Tag (EN)"
            value={form.tag_en}
            onChange={(e) => handleChange('tag_en', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Content</h2>
        <div className="grid gap-4">
          <Textarea
            label="Text (TH)"
            rows={4}
            value={form.text_th}
            onChange={(e) => handleChange('text_th', e.target.value)}
            error={errors.text_th}
          />
          <Textarea
            label="Text (EN)"
            rows={4}
            value={form.text_en}
            onChange={(e) => handleChange('text_en', e.target.value)}
            error={errors.text_en}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Image</h2>
        <ImageUploader
          value={form.image}
          onChange={(val) => handleChange('image', val)}
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Sort Order</h2>
        <Input
          label="Sort Order"
          type="number"
          value={form.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
        />
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" loading={loading}>
          {initialData ? 'Update Review' : 'Create Review'}
        </Button>
      </div>
    </form>
  );
}
