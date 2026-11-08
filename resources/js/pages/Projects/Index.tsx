import { Head } from '@inertiajs/react';
import { ProjectTable, UiProject, CreateProjectModal, PageHeader } from '@/widgets/index';
import { useModal } from '@/shared/hooks/useModal';
import { useSelection } from '@/shared/hooks/useSelection';

interface ProjectsIndexProps {
    projects: UiProject[];
    users?: { id: number; name: string }[];
}

export default function ProjectsIndex({ projects, users = [] }: ProjectsIndexProps) {
    const { selectedIds, toggleSelectAll, toggleSelectOne } = useSelection(projects);

    const { 
        isOpen: isModalOpen, 
        data: editingProject, 
        openCreate: handleOpenCreateModal, 
        openEdit: handleOpenEditModal, 
        close: handleCloseModal 
    } = useModal<UiProject>();

    return (
        <>
            <Head title="Projekty" />

            <PageHeader
                title="Zarządzanie projektami"
                description="Przeglądaj, twórz i edytuj projekty zespołu."
                actionLabel="+ Nowy projekt"
                onActionClick={handleOpenCreateModal}
            />

            <ProjectTable
                projects={projects}
                selectedIds={selectedIds}
                onSelectAll={toggleSelectAll}
                onSelectOne={toggleSelectOne}
                onEditProject={handleOpenEditModal}
            />

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                users={users}
                initialData={editingProject}
            />
        </>
    );
}