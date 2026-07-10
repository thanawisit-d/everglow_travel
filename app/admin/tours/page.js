'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ToursPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('tours')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(() => {
        console.log('query done');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" /></div>;
  }

  return <div className="p-8"><h1 className="text-2xl font-bold">จัดการทัวร์</h1></div>;
}
