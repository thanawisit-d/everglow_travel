'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { buildImageUrl } from '@/lib/utils';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [deleteError, setDeleteError] = useState('');

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

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    setDeleteError('');
    const supabase = createClient();
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) setDeleteError(error.message);
    else setTours((prev) => prev.filter((t) => t.id !== id));
  }

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <img
          src={buildImageUrl(row.image)}
          alt={row.title_th}
          className="h-10 w-10 rounded object-cover"
        />
      ),
    },
    { key: 'title_th', label: 'Title (TH)' },
    { key: 'type', label: 'Type' },
    {
      key: 'price',
      label: 'Price',
      render: (row) =>
        new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(row.price),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/admin/tours/${row.id}`}>
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
          <h2 className="text-2xl font-bold text-gray-900">จัดการทัวร์</h2>
          <p className="text-sm text-gray-500">Manage Tours</p>
        </div>
        <Link href="/admin/tours/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มทัวร์
          </Button>
        </Link>
      </div>
      {fetchError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{fetchError}</p>}
      {deleteError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{deleteError}</p>}
      <DataTable columns={columns} data={tours} />
    </div>
  );
}
