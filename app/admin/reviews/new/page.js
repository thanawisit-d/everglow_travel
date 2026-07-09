'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ReviewForm from '@/components/admin/ReviewForm';

export default function NewReviewPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(form) {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    const { error: err } = await supabase.from('reviews').insert([payload]);
    setLoading(false);
    if (err) setError(err.message);
    else router.push('/admin/reviews');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">เพิ่มรีวิวใหม่</h2>
        <p className="text-sm text-gray-500">Add New Review</p>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <ReviewForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
