import React from 'react';


export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    selectable?: boolean;
    selectedIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
    rowKey?: keyof T;
    emptyText?: string;
}

export function DataTable<T>({
    data,
    columns,
    selectable = false,
    selectedIds = [],
    onSelectAll,
    onSelectOne,
    rowKey = 'id' as keyof T,
    emptyText = 'Brak danych do wyświetlenia.',
}: DataTableProps<T>) {
    const isAllSelected = data.length > 0 && data.every((item) => selectedIds.includes(Number(item[rowKey])));

    return (
        <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                        {selectable && (
                            <th className="py-3.5 px-4 w-12 text-center">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={(e) => onSelectAll?.(e.target.checked)}
                                    className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                                />
                            </th>
                        )}
                        {columns.map((col, idx) => (
                            <th key={idx} className={`py-3.5 px-4 ${col.className ?? ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => {
                            const id = Number(item[rowKey]);
                            const isSelected = selectedIds.includes(id);

                            return (
                                <tr
                                    key={rowIndex}
                                    className={`transition-colors hover:bg-slate-850/50 ${
                                        isSelected ? 'bg-indigo-950/20' : ''
                                    }`}
                                >
                                    {selectable && (
                                        <td className="py-3.5 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => onSelectOne?.(id)}
                                                className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className={`py-3.5 px-4 ${col.className ?? ''}`}>
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(item)
                                                : String(item[col.accessor] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (selectable ? 1 : 0)}
                                className="py-8 text-center text-slate-500"
                            >
                                {emptyText}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}