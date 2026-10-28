import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { BackButton } from '@/shared/ui/backButton';

interface Task {
  id: number;
  title: string;
  status: 'do_zrobienia' | 'w_trakcie' | 'zakonczone';
  priority: string;
  project?: {
    id: number;
    name: string;
  };
}

interface Project {
  id: number;
  name: string;
  description?: string;
  tasks_count?: number;
}

interface MemberDetail {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  tasks: Task[];
  projects: Project[];
}

interface TeamShowProps {
  member: MemberDetail;
}

const statusBadges: Record<string, { label: string; variant: 'default' | 'warning' | 'success' }> = {
  do_zrobienia: { label: 'Do zrobienia', variant: 'default' },
  w_trakcie: { label: 'W trakcie', variant: 'warning' },
  zakonczone: { label: 'Zakończone', variant: 'success' },
};

export default function TeamShow({ member }: TeamShowProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <Head title={`Profil: ${member.name} - EasyRIPOK`} />

      
      
        <BackButton href={'/team'}> Wróć do listy zespołu </BackButton>
      

      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-2xl uppercase">
            {member.name.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">{member.name}</h1>
            <p className="text-sm text-slate-400">{member.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Rola w zespole</span>
            <Badge variant="purple" size="md" >
              {member.role.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-100">
              Zadania użytkownika ({member.tasks.length})
            </h2>
          </div>

          {member.tasks.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">Brak przypisanych zadań.</p>
          ) : (
            <div className="space-y-3">
              {member.tasks.map((task) => {
                const status = statusBadges[task.status] || { label: task.status, variant: 'default' };

                return (
                  <div
                    key={task.id}
                    className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">{task.title}</h3>
                      {task.project && (
                        <p className="text-xs text-indigo-400 mt-0.5">Projekt: {task.project.name}</p>
                      )}
                    </div>
                    <Badge variant={status.variant} size="sm">
                      {status.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-100">
              Projekty ({member.projects.length})
            </h2>
          </div>

          {member.projects.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">Brak przypisanych projektów.</p>
          ) : (
            <div className="space-y-3">
              {member.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{project.name}</h3>
                    {project.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {project.tasks_count ?? 0} zadań
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}