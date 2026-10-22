import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { CreateTaskModal , TaskTable,  UiTask  } from '@/widgets/index';

interface User {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    users?: User[];
}

interface TasksIndexProps {
    tasks: {
        data: UiTask[];
        [key: string]: any;
    };
    users: User[];
    projects: Project[];
    filters: {
        status?: string;
        project_id?: string;
    };
}

export default function TasksIndex({ tasks, users, projects = [], filters }: TasksIndexProps) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<UiTask | null>(null);
    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
    const [bulkAction, setBulkAction] = useState<string>('');

=    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTaskIds(tasks.data.map((task) => task.id));
        } else {
            setSelectedTaskIds([]);
        }
    };

    const toggleTaskSelection = (id: number) => {
        if (selectedTaskIds.includes(id)) {
            setSelectedTaskIds(selectedTaskIds.filter((taskId) => taskId !== id));
        } else {
            setSelectedTaskIds([...selectedTaskIds, id]);
        }
    };

    const handleBulkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkAction || selectedTaskIds.length === 0) return;

        router.post('/tasks/bulk-action', {
            action: bulkAction,
            task_ids: selectedTaskIds,
        }, {
            onSuccess: () => {
                setSelectedTaskIds([]);
                setBulkAction('');
            },
        });
    };

    const handleOpenCreateModal = () => {
        setEditingTask(null);
        setIsTaskModalOpen(true);
    };
    const handleOpenEditModal = (task: UiTask) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    return (
        <AppLayout title="Zadania">
            <Head title="Zadania" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Lista zadań</h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Zarządzaj zadaniami we wszystkich projektach.
                    </p>
                </div>
                <Button variant="primary" size="md" onClick={() => setIsTaskModalOpen(true)}>
                    + Utwórz zadanie
                </Button>
            </div>

            
            {selectedTaskIds.length > 0 && (
                <div className="mb-4 p-4 bg-slate-900 border border-indigo-500/30 rounded-xl flex items-center justify-between shadow-lg">
                    <span className="text-sm text-slate-300">
                        Wybrano zadań: <strong className="text-indigo-400">{selectedTaskIds.length}</strong>
                    </span>
                    <form onSubmit={handleBulkSubmit} className="flex items-center gap-3">
                        <select
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">Wybierz akcję...</option>
                            <option value="status_do_zrobienia">Zmień status: Do zrobienia</option>
                            <option value="status_w_trakcie">Zmień status: W trakcie</option>
                            <option value="status_zakonczone">Zmień status: Zakończone</option>
                            <option value="delete">Usuń wybrane</option>
                        </select>
                        <Button type="submit" variant="primary" size="sm" disabled={!bulkAction}>
                            Wykonaj
                        </Button>
                    </form>
                </div>
            )}

           <TaskTable
                tasks={tasks}
                selectedTaskIds={selectedTaskIds}
                toggleSelectAll={toggleSelectAll}
                toggleTaskSelection={toggleTaskSelection}
                onEditTask={handleOpenEditModal}
            />

            <CreateTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                users={users}
                projects={projects}
                task={editingTask}
            />
        </AppLayout>
    );
}