import { Head } from '@inertiajs/react';
import { CreateTaskModal, PageHeader, TaskTable, TaskFilters, UiTask } from '@/widgets/index';
import { Pagination } from '@/shared/ui/pagination';
import { useTaskSelection } from './hooks/useTaskSelection';
import { useTaskModal } from './hooks/useTaskModal';
import { BulkActionsBar } from './ui/BulkActionsBar';

interface TasksIndexProps {
    tasks: {
        data: UiTask[];
        links: any[];
        from: number;
        to: number;
        total: number;
        [key: string]: any;
    };
    users: App.Data.UserData[];
    projects: App.Data.ProjectData[];
    filters: {
        status?: string;
        project_id?: string;
        search?: string;
        priority?: string;
    };
}

export default function TasksIndex({ tasks, users, projects = [], filters }: TasksIndexProps) {
    const {
        selectedTaskIds,
        bulkAction,
        setBulkAction,
        isProcessing,
        toggleSelectAll,
        toggleTaskSelection,
        handleBulkSubmit,
    } = useTaskSelection(tasks.data);

    const {
        isTaskModalOpen,
        editingTask,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    } = useTaskModal();

    return (
        <>
            <Head title="Zadania" />

            <PageHeader
                title="Lista zadań"
                description="Zarządzaj zadaniami we wszystkich projektach."
                actionLabel="+ Utwórz zadanie"
                onActionClick={handleOpenCreateModal}
            />

            <BulkActionsBar
                selectedCount={selectedTaskIds.length}
                bulkAction={bulkAction}
                onActionChange={setBulkAction}
                onSubmit={handleBulkSubmit}
                isLoading={isProcessing}
            />

            <TaskFilters 
                filters={filters} 
                users={users} 
                projects={projects} 
            />

            <TaskTable
                tasks={tasks}
                selectedTaskIds={selectedTaskIds}
                toggleSelectAll={toggleSelectAll}
                toggleTaskSelection={toggleTaskSelection}
                onEditTask={handleOpenEditModal}
            />
             
            <Pagination 
                links={tasks.links} 
                from={tasks.from} 
                to={tasks.to} 
                total={tasks.total} 
            />

            <CreateTaskModal
                isOpen={isTaskModalOpen}
                onClose={handleCloseModal}
                users={users}
                projects={projects}
                task={editingTask}
            />
        </>
    );
}