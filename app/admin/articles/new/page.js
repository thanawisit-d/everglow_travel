'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(form) {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.from('articles').insert([form]);
    setLoading(false);
    if (err) setError(err.message);
    else router.push('/admin/articles');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">เพิ่มบทความใหม่</h2>
        <p className="text-sm text-gray-500">Add New Article</p>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <ArticleForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
