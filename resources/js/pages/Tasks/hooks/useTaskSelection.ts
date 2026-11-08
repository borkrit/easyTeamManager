import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { UiTask } from "@/widgets";
import { useState } from "react";

export const useTaskSelection = (tasksData:UiTask[])=>{
    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
    const [bulkAction, setBulkAction] = useState<string>('');
    const {mutate, isLoading} = useApiMutation()

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTaskIds(tasksData.map((task) => task.id));
        } else {
            setSelectedTaskIds([]);
        }
    };

    const toggleTaskSelection = (id: number) => {
        if (selectedTaskIds.includes(id)) {
            setSelectedTaskIds(selectedTaskIds.filter((taskId) => taskId !== id));
        } else {
            setSelectedTaskIds([...selectedTaskIds, id]);
        }
    };

    const handleBulkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkAction || selectedTaskIds.length === 0) return;

        mutate('post','/tasks/bulk-action', {
            action: bulkAction,
            task_ids: selectedTaskIds,
        }, {
            onSuccess: () => {
                setSelectedTaskIds([]);
                setBulkAction('');
            },
        });
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

}