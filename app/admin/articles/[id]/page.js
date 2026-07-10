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
  const [fetchError, setFetchError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from('articles').select('*').eq('id', params.id).maybeSingle();
        if (err) setFetchError(err.message);
        setArticle(data);
      } catch (e) {
        setFetchError(e.message);
      }
      setLoading(false);
    };
    load();
  }, [params.id]);

  async function handleSubmit(form) {
    setSubmitting(true);
    setSubmitError('');
    const supabase = createClient();
    const { error: err } = await supabase.from('articles').update(form).eq('id', params.id);
    setSubmitting(false);
    if (err) setSubmitError(err.message);
    else router.push('/admin/articles');
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
        <p className="text-gray-500">{fetchError || 'ไม่พบบทความ'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">แก้ไขบทความ</h2>
        <p className="text-sm text-gray-500">แก้ไขบทความ</p>
      </div>
      {submitError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{submitError}</p>}
      <ArticleForm initialData={article} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
