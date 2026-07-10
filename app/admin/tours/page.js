'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ToursPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('tours').select('*').order('sort_order', { ascending: true });
        console.log('result:', data, error);
      } catch (e) {
        console.error('caught:', e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" /></div>;
  }

  return <div className="p-8"><h1 className="text-2xl font-bold">จัดการทัวร์</h1></div>;
}
