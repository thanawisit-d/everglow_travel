'use client';

import { cn } from '@/lib/utils';

export default function DataTable({
  columns = [],
  data = [],
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

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
