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
    if (!form.title_th) errs.title_th = 'กรุณากรอก';
    if (!form.title_en) errs.title_en = 'กรุณากรอก';
    if (!form.content_th) errs.content_th = 'กรุณากรอก';
    if (!form.content_en) errs.content_en = 'กรุณากรอก';
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
        <h2 className="mb-4 text-lg font-semibold text-gray-900">ข้อมูลบทความ</h2>
        <div className="grid gap-4">
          <Input
            label="ชื่อบทความ (TH)"
            value={form.title_th}
            onChange={(e) => handleChange('title_th', e.target.value)}
            error={errors.title_th}
          />
          <Input
            label="ชื่อบทความ (EN)"
            value={form.title_en}
            onChange={(e) => handleChange('title_en', e.target.value)}
            error={errors.title_en}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">เนื้อหา</h2>
        <div className="grid gap-4">
          <Textarea
            label="เนื้อหา (TH)"
            rows={8}
            value={form.content_th}
            onChange={(e) => handleChange('content_th', e.target.value)}
            error={errors.content_th}
          />
          <Textarea
            label="เนื้อหา (EN)"
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
          <span className="text-sm font-medium text-gray-700">เผยแพร่</span>
        </label>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" loading={loading}>
          {initialData ? 'อัปเดตบทความ' : 'สร้างบทความ'}
        </Button>
      </div>
    </form>
  );
}
