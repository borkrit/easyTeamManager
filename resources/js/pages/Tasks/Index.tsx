import React, { useState } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { Head, router } from '@inertiajs/react';



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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={tasks.data.length > 0 && selectedTaskIds.length === tasks.data.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                  />
                </th>
                <th className="py-3.5 px-4">Tytuł zadania</th>
                <th className="py-3.5 px-4">Projekt</th>
                <th className="py-3.5 px-4">Wykonawca</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Priorytet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {tasks.data.length > 0 ? (
                tasks.data.map((task) => {
                  const isSelected = selectedTaskIds.includes(task.id);

                  return (
                    <tr
                      key={task.id}
                      className={`transition-colors hover:bg-slate-850/50 ${
                        isSelected ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTaskSelection(task.id)}
                          className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                        />
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        {task.title}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{task.projectName}</td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {task.assigneeName ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                            👤 {task.assigneeName}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs italic">Brak wykonawcy</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            task.status === 'zakonczone'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : task.status === 'w_trakcie'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {task.status === 'zakonczone'
                            ? 'Ukończone'
                            : task.status === 'w_trakcie'
                            ? 'W trakcie'
                            : 'Do zrobienia'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            task.priority === 'wysoki'
                              ? 'text-red-400'
                              : task.priority === 'sredni'
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Brak zadań spełniających kryteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}