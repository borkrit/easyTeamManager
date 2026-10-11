import React from 'react';
import { Head } from '@inertiajs/react';

interface Task {
  id: number;
  title: string;
  status: string;
}

interface Props {
  tasks: Task[];
}

export default function TasksIndex({ tasks }: Props) {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-slate-950 min-h-screen text-white">
      <Head title="Inertia & React Integration Test" />
      
      <h1 className="text-2xl font-bold mb-6">🛠️ Integration Verification</h1>
      
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden p-4 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 bg-slate-950/50 rounded border border-slate-800 flex items-center justify-between">
            <div className="text-slate-400 font-mono text-sm">#{task.id}</div>
            <div className="font-semibold text-white flex-1 mx-4">{task.title}</div>
            <div>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}