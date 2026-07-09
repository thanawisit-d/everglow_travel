'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ReviewForm from '@/components/admin/ReviewForm';

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('reviews').select('*').eq('id', params.id).single()
      .then(({ data }) => {
        setReview(data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(form) {
    setSubmitting(true);
    const supabase = createClient();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    const { error } = await supabase.from('reviews').update(payload).eq('id', params.id);
    setSubmitting(false);
    if (!error) router.push('/admin/reviews');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Review not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">แก้ไขรีวิว</h2>
        <p className="text-sm text-gray-500">Edit Review</p>
      </div>
      <ReviewForm initialData={review} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
