'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setArticles(data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const supabase = createClient();
    await supabase.from('articles').delete().eq('id', id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  const columns = [
    { key: 'title_th', label: 'Title (TH)' },
    {
      key: 'published',
      label: 'Published',
      render: (row) => (
        <Badge variant={row.published ? 'success' : 'warning'}>
          {row.published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (row) => new Date(row.created_at).toLocaleDateString('th-TH'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/admin/articles/${row.id}`}>
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
          <h2 className="text-2xl font-bold text-gray-900">จัดการบทความ</h2>
          <p className="text-sm text-gray-500">Manage Articles</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มบทความ
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={articles} />
    </div>
  );
}
