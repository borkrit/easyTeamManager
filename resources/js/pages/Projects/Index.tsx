import { Head } from '@inertiajs/react';
import { ProjectTable, CreateProjectModal, PageHeader } from '@/widgets/index';
import { useProjectsIndex } from './hooks/useProjectsIndex';
import { ProjectsIndexProps } from './types/types';



export default function ProjectsIndex({ projects, users = [] }: ProjectsIndexProps) {
    const {
        selectedIds,
        toggleSelectAll,
        toggleSelectOne,
        isModalOpen,
        editingProject,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    } = useProjectsIndex(projects);

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