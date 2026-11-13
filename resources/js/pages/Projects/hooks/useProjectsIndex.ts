import { UiProject } from '@/widgets/index';
import { useModal } from '@/shared/hooks/useModal';
import { useSelection } from '@/shared/hooks/useSelection';

export const useProjectsIndex = (projects: UiProject[]) => {
    const { selectedIds, toggleSelectAll, toggleSelectOne } = useSelection(projects);

    const { 
        isOpen: isModalOpen, 
        data: editingProject, 
        openCreate: handleOpenCreateModal, 
        openEdit: handleOpenEditModal, 
        close: handleCloseModal 
    } = useModal<UiProject>();

    return {
        selectedIds,
        toggleSelectAll,
        toggleSelectOne,
        isModalOpen,
        editingProject,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    };
};