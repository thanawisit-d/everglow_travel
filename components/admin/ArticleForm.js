'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ArticleForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    title_th: '',
    title_en: '',
    content_th: '',
    content_en: '',
    published: false,
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
    if (!form.title_th) errs.title_th = 'Required';
    if (!form.title_en) errs.title_en = 'Required';
    if (!form.content_th) errs.content_th = 'Required';
    if (!form.content_en) errs.content_en = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Article Info</h2>
        <div className="grid gap-4">
          <Input
            label="Title (TH)"
            value={form.title_th}
            onChange={(e) => handleChange('title_th', e.target.value)}
            error={errors.title_th}
          />
          <Input
            label="Title (EN)"
            value={form.title_en}
            onChange={(e) => handleChange('title_en', e.target.value)}
            error={errors.title_en}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Content</h2>
        <div className="grid gap-4">
          <Textarea
            label="Content (TH)"
            rows={8}
            value={form.content_th}
            onChange={(e) => handleChange('content_th', e.target.value)}
            error={errors.content_th}
          />
          <Textarea
            label="Content (EN)"
            rows={8}
            value={form.content_en}
            onChange={(e) => handleChange('content_en', e.target.value)}
            error={errors.content_en}
          />
        </div>
      </Card>

      <Card>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" loading={loading}>
          {initialData ? 'Update Article' : 'Create Article'}
        </Button>
      </div>
    </form>
  );
}
