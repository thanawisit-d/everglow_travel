'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Backpack, Star, FileText, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tours', label: 'Tours', icon: Backpack },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/th';
    } catch {
      window.location.href = '/th';
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-gray-900 text-white lg:flex">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold text-emerald-400">
          Everglow Admin
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(item.href)
                ? 'bg-gray-800 text-emerald-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
