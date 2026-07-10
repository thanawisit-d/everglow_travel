'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const titleMap = {
  '/admin': 'แดชบอร์ด',
  '/admin/tours': 'จัดการทัวร์',
  '/admin/tours/new': 'เพิ่มทัวร์ใหม่',
  '/admin/reviews': 'จัดการรีวิว',
  '/admin/reviews/new': 'เพิ่มรีวิวใหม่',
  '/admin/articles': 'จัดการบทความ',
  '/admin/articles/new': 'เพิ่มบทความใหม่',
  '/admin/login': 'เข้าสู่ระบบ',
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = useMemo(() => {
    if (titleMap[pathname]) return titleMap[pathname];
    if (pathname.match(/^\/admin\/tours\//)) return 'แก้ไขทัวร์';
    if (pathname.match(/^\/admin\/reviews\//)) return 'แก้ไขรีวิว';
    if (pathname.match(/^\/admin\/articles\//)) return 'แก้ไขบทความ';
    return 'ผู้ดูแล';
  }, [pathname]);

  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <AdminHeader title={title} onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
