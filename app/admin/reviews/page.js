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

  useEffect(() => {
    const supabase = createClient();
    supabase.from('reviews')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setReviews(data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <img
          src={buildImageUrl(row.image)}
                alt={row.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'tag_th', label: 'Tag (TH)' },
    { key: 'sort_order', label: 'Order' },
    {
      key: 'actions',
      label: 'Actions',
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">จัดการรีวิว</h2>
          <p className="text-sm text-gray-500">Manage Reviews</p>
        </div>
        <Link href="/admin/reviews/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มรีวิว
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
}
