import { useModal } from '@/shared/hooks/useModal';

export const useTaskShow = () => {
    const {
        isOpen: isEditModalOpen,
        openCreate: openEditModal,
        close: closeEditModal,
    } = useModal<App.Data.TaskData>();

    return {
        isEditModalOpen,
        openEditModal,
        closeEditModal,
    };
};