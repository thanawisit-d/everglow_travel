'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(form) {
    setLoading(true);
    const supabase = createClient();
    const payload = { ...form, published: Boolean(form.published) };
    const { error } = await supabase.from('articles').insert([payload]);
    setLoading(false);
    if (!error) router.push('/admin/articles');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">เพิ่มบทความใหม่</h2>
        <p className="text-sm text-gray-500">Add New Article</p>
      </div>
      <ArticleForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
