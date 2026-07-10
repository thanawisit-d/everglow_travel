'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { buildImageUrl } from '@/lib/utils';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.from('reviews')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setFetchError(err.message);
        setReviews(data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรีวิวนี้?')) return;
    setDeleteError('');
    const supabase = createClient();
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) setDeleteError(error.message);
    else setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const columns = [
    {
      key: 'image',
      label: 'รูป',
      render: (row) => (
        <img
          src={buildImageUrl(row.image)}
                alt={row.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    { key: 'name', label: 'ชื่อ' },
    { key: 'tag_th', label: 'แท็ก (TH)' },
    { key: 'sort_order', label: 'ลำดับ' },
    {
      key: 'actions',
      label: 'จัดการ',
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/admin/reviews/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">จัดการรีวิว</h2>
          <p className="text-sm text-gray-500">จัดการรีวิวทั้งหมด</p>
        </div>
        <Link href="/admin/reviews/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มรีวิว
          </Button>
        </Link>
      </div>
      {fetchError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{fetchError}</p>}
      {deleteError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{deleteError}</p>}
      <DataTable columns={columns} data={reviews} />
    </div>
  );
}
