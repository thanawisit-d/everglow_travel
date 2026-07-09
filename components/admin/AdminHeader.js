'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

export default function AdminHeader({ title, user, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 lg:px-8">
      <button
        onClick={onMenuToggle}
        className="flex items-center lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-medium text-emerald-700">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : 'U'}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {user.name || user.email || 'Admin'}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
