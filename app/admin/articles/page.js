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
  const [fetchError, setFetchError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) setFetchError(err.message);
        setArticles(data ?? []);
      } catch (e) {
        setFetchError(e.message);
      }
      setLoading(false);
    };
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) return;
    setDeleteError('');
    try {
      const supabase = createClient();
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) setDeleteError(error.message);
      else setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      setDeleteError(e.message);
    }
  }

  const columns = [
    { key: 'title_th', label: 'ชื่อ (TH)' },
    { key: 'title_en', label: 'ชื่อ (EN)' },
    {
      key: 'published',
      label: 'เผยแพร่',
      render: (row) => (
        <Badge variant={row.published ? 'success' : 'warning'}>
                  {row.published ? 'เผยแพร่' : 'ร่าง'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'สร้างเมื่อ',
      render: (row) => new Date(row.created_at).toLocaleDateString('th-TH'),
    },
    {
      key: 'actions',
      label: 'จัดการ',
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">จัดการบทความ</h2>
          <p className="text-sm text-gray-500">จัดการบทความทั้งหมด</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มบทความ
          </Button>
        </Link>
      </div>
      {fetchError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{fetchError}</p>}
      {deleteError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{deleteError}</p>}
      <DataTable columns={columns} data={articles} />
    </div>
  );
}
