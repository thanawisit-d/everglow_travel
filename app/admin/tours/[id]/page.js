'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import TourForm from '@/components/admin/TourForm';

export default function EditTourPage() {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('tours').select('*').eq('id', params.id).single()
      .then(({ data }) => {
        setTour(data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(form) {
    setSubmitting(true);
    const supabase = createClient();
    const payload = { ...form, price: Number(form.price), sort_order: Number(form.sort_order) };
    const { error } = await supabase.from('tours').update(payload).eq('id', params.id);
    setSubmitting(false);
    if (!error) router.push('/admin/tours');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Tour not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">แก้ไขทัวร์</h2>
        <p className="text-sm text-gray-500">Edit Tour</p>
      </div>
      <TourForm initialData={tour} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
