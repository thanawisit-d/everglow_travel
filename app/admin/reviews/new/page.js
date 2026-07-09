'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ReviewForm from '@/components/admin/ReviewForm';

export default function NewReviewPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(form) {
    setLoading(true);
    const supabase = createClient();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    const { error } = await supabase.from('reviews').insert([payload]);
    setLoading(false);
    if (!error) router.push('/admin/reviews');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">เพิ่มรีวิวใหม่</h2>
        <p className="text-sm text-gray-500">Add New Review</p>
      </div>
      <ReviewForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
