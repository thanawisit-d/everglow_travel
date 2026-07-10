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
    rating: 5,
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
    if (!form.name) errs.name = 'กรุณากรอก';
    if (!form.text_th) errs.text_th = 'กรุณากรอก';
    if (!form.text_en) errs.text_en = 'กรุณากรอก';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, sort_order: Number(form.sort_order), rating: Number(form.rating) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">ข้อมูลรีวิว</h2>
        <div className="grid gap-4">
          <Input
            label="ชื่อ"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <Input
            label="คะแนน (1-5)"
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) => handleChange('rating', Number(e.target.value))}
          />
          <Input
            label="แท็ก (TH)"
            value={form.tag_th}
            onChange={(e) => handleChange('tag_th', e.target.value)}
          />
          <Input
            label="แท็ก (EN)"
            value={form.tag_en}
            onChange={(e) => handleChange('tag_en', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">เนื้อหา</h2>
        <div className="grid gap-4">
          <Textarea
            label="ข้อความ (TH)"
            rows={4}
            value={form.text_th}
            onChange={(e) => handleChange('text_th', e.target.value)}
            error={errors.text_th}
          />
          <Textarea
            label="ข้อความ (EN)"
            rows={4}
            value={form.text_en}
            onChange={(e) => handleChange('text_en', e.target.value)}
            error={errors.text_en}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">รูปภาพ</h2>
        <ImageUploader
          value={form.image}
          onChange={(val) => handleChange('image', val)}
          folder="reviews"
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">ลำดับ</h2>
        <Input
            label="ลำดับ"
          type="number"
          value={form.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
        />
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" loading={loading}>
          {initialData ? 'อัปเดตรีวิว' : 'สร้างรีวิว'}
        </Button>
      </div>
    </form>
  );
}
