import { useModal } from '@/shared/hooks/useModal';
import { useTaskSelection } from './useTaskSelection';

export const useTasksIndex = (tasks: App.Data.TaskData[]) => {
    const selection = useTaskSelection(tasks);

    const {
        isOpen: isTaskModalOpen,
        data: editingTask,
        openCreate: handleOpenCreateModal,
        openEdit: handleOpenEditModal,
        close: handleCloseModal,
    } = useModal<App.Data.TaskData>();

    return {
        ...selection,
        isTaskModalOpen,
        editingTask,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    };
};