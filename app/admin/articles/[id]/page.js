'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ArticleForm from '@/components/admin/ArticleForm';

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('articles').select('*').eq('id', params.id).single()
      .then(({ data }) => {
        setArticle(data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(form) {
    setSubmitting(true);
    const supabase = createClient();
    const payload = { ...form, published: Boolean(form.published) };
    const { error } = await supabase.from('articles').update(payload).eq('id', params.id);
    setSubmitting(false);
    if (!error) router.push('/admin/articles');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">แก้ไขบทความ</h2>
        <p className="text-sm text-gray-500">Edit Article</p>
      </div>
      <ArticleForm initialData={article} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
