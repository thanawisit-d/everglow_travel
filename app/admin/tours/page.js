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

  useEffect(() => {
    const supabase = createClient();
  }, []);

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
          <p className="text-sm text-gray-500">จัดการทัวร์ทั้งหมด</p>
        </div>
        <Link href="/admin/tours/new">
          <Button>
            <Plus className="h-4 w-4" />
            เพิ่มทัวร์
          </Button>
        </Link>
      </div>
      <DataTable columns={[]} data={[]} />
    </div>
  );
}
