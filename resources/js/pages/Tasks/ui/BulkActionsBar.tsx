import React from 'react';
import { Button } from '@/shared/ui/button';

interface BulkActionsBarProps {
    selectedCount: number;
    bulkAction: string;
    onActionChange: (action: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
    selectedCount,
    bulkAction,
    onActionChange,
    onSubmit,
    isLoading = false,
}) => {
    if (selectedCount === 0) return null;

    return (
        <div className="mb-4 p-4 bg-slate-900 border border-indigo-500/30 rounded-xl flex items-center justify-between shadow-lg">
            <span className="text-sm text-slate-300">
                Wybrano zadań: <strong className="text-indigo-400">{selectedCount}</strong>
            </span>
            <form onSubmit={onSubmit} className="flex items-center gap-3">
                <select
                    value={bulkAction}
                    onChange={(e) => onActionChange(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                    <option value="">Wybierz akcję...</option>
                    <option value="status_do_zrobienia">Zmień status: Do zrobienia</option>
                    <option value="status_w_trakcie">Zmień status: W trakcie</option>
                    <option value="status_zakonczone">Zmień status: Zakończone</option>
                    <option value="delete">Usuń wybrane</option>
                </select>
                <Button type="submit" variant="primary" size="sm" disabled={!bulkAction || isLoading}>
                    {isLoading ? 'Przetwarzanie...' : 'Wykonaj'}
                </Button>
            </form>
        </div>
    );
};