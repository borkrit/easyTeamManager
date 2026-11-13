// resources/js/pages/Projects/hooks/useProjectShow.ts
import { useModal } from '@/shared/hooks/useModal';
import { useDeleteResource } from '@/shared/hooks/useDeleteResource';

export const useProjectShow = (project: App.Data.ProjectData) => {
    const { 
        isOpen: isEditModalOpen, 
        openEdit: openEditModal, 
        close: closeEditModal 
    } = useModal<App.Data.ProjectData>();
    
    const { deleteItem: deleteProject } = useDeleteResource('projects');

    const handleEditClick = () => openEditModal(project);
    const handleDeleteClick = () => deleteProject(project.id, project.name);

    return {
        isEditModalOpen,
        closeEditModal,
        handleEditClick,
        handleDeleteClick,
    };
};