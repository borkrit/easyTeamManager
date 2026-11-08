import { useState } from 'react';
import { UiTask } from '@/widgets/index';

export const useTaskModal = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<UiTask | null>(null);

    const handleOpenCreateModal = () => {
        setEditingTask(null); 
        setIsTaskModalOpen(true);
    };

    const handleOpenEditModal = (task: UiTask) => {
        setEditingTask(task); 
        setIsTaskModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(null); 
    };

    return {
        isTaskModalOpen,
        editingTask,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    };
};