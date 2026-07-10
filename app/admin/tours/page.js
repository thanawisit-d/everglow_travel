'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.from('tours')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setFetchError(err.message);
        setTours(data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" /></div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">จัดการทัวร์</h1>
      {fetchError && <p className="text-red-600">{fetchError}</p>}
      <p>Found {tours.length} tours</p>
    </div>
  );
}
