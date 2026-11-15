import { useState } from 'react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { useSelection } from '@/shared/hooks/useSelection';

export const useTaskSelection = (tasksData: App.Data.TaskData[]) => {
    const {
        selectedIds: selectedTaskIds,
        toggleSelectAll,
        toggleSelectOne: toggleTaskSelection,
        clearSelection,
    } = useSelection(tasksData);

    const [bulkAction, setBulkAction] = useState<string>('');
    const { mutate, isLoading } = useApiMutation();

    const handleBulkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkAction || selectedTaskIds.length === 0) return;

        mutate(
            'post',
            '/tasks/bulk-action',
            {
                action: bulkAction,
                task_ids: selectedTaskIds,
            },
            {
                onSuccess: () => {
                    clearSelection();
                    setBulkAction('');
                },
            }
        );
    };

    return {
        selectedTaskIds,
        bulkAction,
        setBulkAction,
        isProcessing: isLoading,
        toggleSelectAll,
        toggleTaskSelection,
        handleBulkSubmit,
    };
};