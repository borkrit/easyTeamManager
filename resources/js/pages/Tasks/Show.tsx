
import { Head } from '@inertiajs/react';
import { Comments, CreateTaskModal } from '@/widgets/index'; 
import { BackButton } from '@/shared/ui/backButton';
import { useTaskShow } from './hooks/useTaskShow';
import { TaskHeader } from './ui/TaskHeader';
import { TaskDetailsSidebar } from './ui/TaskDetailsSidebar';

interface TaskShowProps {
    task: App.Data.TaskData;
    allProjects?: Array<{ id: number; name: string }>; 
    allUsers?: Array<{ id: number; name: string }>;   
}

export default function TaskShow({ task, allProjects = [], allUsers = [] }: TaskShowProps) {
    const { isEditModalOpen, openEditModal, closeEditModal } = useTaskShow();
    

    return (
        <>
            <Head title={task.title} />

            <BackButton href={'/tasks'}> Wróć do listy zadań </BackButton>

            <TaskHeader task={task} onEditClick={openEditModal} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Opis zadania</h3>
                        <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                            {task.description || <span className="text-slate-500 italic">Brak opisu dla tego zadania.</span>}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                        <Comments
                            comments={task.comments || []}
                            commentableType="task"
                            commentableId={task.id}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <TaskDetailsSidebar task={task} />
                </div>
            </div>

            <CreateTaskModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                projects={allProjects}
                users={allUsers}
                initialData={task}
            />
        </>
    );
}