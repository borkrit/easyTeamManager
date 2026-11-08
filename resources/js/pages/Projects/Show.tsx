
import { Head } from '@inertiajs/react';
import { Comments, CreateProjectModal } from '@/widgets/index'; 
import { BackButton } from '@/shared/ui/backButton';
import { useDeleteResource } from '@/shared/hooks/useDeleteResource';
import { ProjectHeader } from './ui/ProjectHeader';
import { ProjectTasksList } from './ui/ProjectTasksList';
import { ProjectTeamList } from './ui/ProjectTeamList';
import { useModal } from '@/shared/hooks/useModal';

interface ShowProps {
    project: App.Data.ProjectData;
    allUsers: { id: number; name: string }[];
}

export default function ProjectShow({ project, allUsers }: ShowProps) {
    const { 
        isOpen: isEditModalOpen, 
        openEdit: openEditModal, 
        close: closeEditModal 
    } = useModal<App.Data.ProjectData>();
    const { deleteItem: deleteProject } = useDeleteResource('projects');

    return (
        <>
            <Head title={project.name} />

            <BackButton href={'/projects'}> Wróć do listy projektów </BackButton>

            <ProjectHeader 
                name={project.name}
                description={project.description}
                onEdit={() => openEditModal(project)}
                onDelete={() => deleteProject(project.id, project.name)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ProjectTasksList tasks={project.tasks} />

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <Comments
                            comments={project.comments || []}
                            commentableType="project" 
                            commentableId={project.id}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <ProjectTeamList users={project.users} />
                </div>
            </div>

            <CreateProjectModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                users={allUsers}
                initialData={project}
            />
        </>
    );
}