
import { Head } from '@inertiajs/react';
import { CreateTaskModal, PageHeader, TaskTable, TaskFilters, UiTask } from '@/widgets/index';
import { Pagination } from '@/shared/ui/pagination';
import { TasksIndexProps } from './types/types';
import { BulkActionsBar } from './ui/BulkActionsBar';
import { useTasksIndex } from './hooks/useTasksIndex';



export default function TasksIndex({ tasks, users, projects = [], filters }: TasksIndexProps) {
    const {
        selectedTaskIds,
        bulkAction,
        setBulkAction,
        isProcessing,
        toggleSelectAll,
        toggleTaskSelection,
        handleBulkSubmit,
        isTaskModalOpen,
        editingTask,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
    } = useTasksIndex(tasks.data);

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
                initialData={editingTask}
            />
        </>
    );
}