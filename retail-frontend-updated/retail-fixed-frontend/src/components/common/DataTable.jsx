// src/components/common/DataTable.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function DataTable({ columns, data, searchPlaceholder, onSearch, pageSize = 5 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const pageData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      {onSearch && (
        <div className="mb-4 relative max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder || 'Search...'}
            onChange={(e) => {
              onSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-semibold text-slate-600 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                  No records found
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <tr key={row.id ?? i} className="hover:bg-slate-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap text-slate-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>
            Page {page} of {totalPages} &middot; {data.length} records
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-200 p-1.5 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-slate-200 p-1.5 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
