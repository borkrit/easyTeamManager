import React, { useState } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { Head, router } from '@inertiajs/react';
import { TaskTable } from '@/widgets/index';



type Task = App.Data.TaskData & {
    priority?: 'niski' | 'sredni' | 'wysoki';
    projectName?: string;
    assigneeName?: string | null;
};

interface TasksIndexProps {
  tasks: {
    data: Task[];
    current_page: number;
    last_page: number;
  };
  filters: {
    search?: string;
    status?: string;
  };
}

export default function TasksIndex({ tasks, filters }: TasksIndexProps) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const toggleTaskSelection = (id: number) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  }

  const toggleSelectAll = () => {
    if (selectedTaskIds.length === tasks.data.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasks.data.map((task) => task.id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Czy na pewno chcesz usunąć zaznaczone zadania (${selectedTaskIds.length})?`)) {
      router.post('/tasks/bulk-destroy', { ids: selectedTaskIds }, {
        onSuccess: () => setSelectedTaskIds([]),
      });
    }
  };

  return (
    <AppLayout title="Zarządzanie Zadaniami">
      <Head title="Zadania" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Lista zadań</h2>
          <p className="text-sm text-slate-400">Przeglądaj, filtrowania i wykonuj akcje masowe na zadaniach.</p>
        </div>
        <Button variant="primary" size="md">
          + Nowe zadanie
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Szukaj zadania..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {selectedTaskIds.length > 0 && (
          <div className="flex items-center gap-3 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-lg w-full sm:w-auto justify-between">
            <span className="text-xs font-medium text-indigo-300">
              Zaznaczono: {selectedTaskIds.length}
            </span>
            <Button variant="danger" size="sm" onClick={handleBulkDelete}>
              Usuń zaznaczone
            </Button>
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <TaskTable
                tasks={tasks}
                selectedTaskIds={selectedTaskIds}
                toggleSelectAll={toggleSelectAll}
                toggleTaskSelection={toggleTaskSelection}
            />
        </div>
      </div>
    </AppLayout>
  );
}