'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import TourForm from '@/components/admin/TourForm';

export default function NewTourPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(form) {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const payload = { ...form, price: Number(form.price), sort_order: Number(form.sort_order) };
    const { error: err } = await supabase.from('tours').insert([payload]);
    setLoading(false);
    if (err) setError(err.message);
    else router.push('/admin/tours');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">เพิ่มทัวร์ใหม่</h2>
        <p className="text-sm text-gray-500">Add New Tour</p>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <TourForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
