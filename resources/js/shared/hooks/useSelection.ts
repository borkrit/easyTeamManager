import { useState } from 'react';

export function useSelection<T extends { id: number }>(items: T[]) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(items.map((item) => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const clearSelection = () => {
        setSelectedIds([]);
    };

    return {
        selectedIds,
        toggleSelectAll,
        toggleSelectOne,
        clearSelection,
    };
}