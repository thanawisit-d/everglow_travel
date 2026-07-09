'use client';

import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
}) {
  if (!data.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white py-12 text-center text-gray-500">
        No data found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, idx) => (
            <tr
              key={row.id || row._id || idx}
              className="transition-colors hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-sm text-gray-700',
                    col.className
                  )}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-emerald-600"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
