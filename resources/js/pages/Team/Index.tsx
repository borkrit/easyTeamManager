import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

// interface TeamMember {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   created_at: string;
//   tasks_count?: number;
//   projects_count?: number;
// }

type TeamMember = App.Data.UserData


interface TeamIndexProps {
  members: TeamMember[];
}

const roleBadges: Record<string, { label: string; variant: 'purple' | 'primary' | 'success' | 'default' }> = {
  admin: { label: 'Administrator', variant: 'purple' },
  manager: { label: 'Manager', variant: 'primary' },
  developer: { label: 'Developer', variant: 'success' },
  viewer: { label: 'Obserwator', variant: 'default' },
};

export default function TeamIndex({ members }: TeamIndexProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'developer',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/team', {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <Head title="Zespół - EasyRIPOK" />

      {/* Заголовок страницы */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Zarządzanie Zespołem</h1>
          <p className="text-sm text-slate-400 mt-1">
            Lista członków zespołu oraz przydzielanie ról i zadań
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
          + Dodaj osobę
        </Button>
      </div>

      {/* Таблица пользователей */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Imię i nazwisko</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Rola</th>
                <th className="px-6 py-4 font-semibold text-center">Projekty</th>
                <th className="px-6 py-4 font-semibold text-center">Zadania</th>
                <th className="px-6 py-4 font-semibold text-right">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {members.map((member) => {
                const roleConfig = member?.role && roleBadges[member.role] || { label: member.role, variant: 'default' };

                return (
                  <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-100 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold uppercase text-xs">
                        {member.name.slice(0, 2)}
                      </div>
                      <Link href={`/team/${member.id}`} className="hover:text-indigo-400 transition-colors">
                        {member.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{member.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant={roleConfig.variant} size="sm">
                        {roleConfig.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">{member.projects_count ?? 0}</td>
                    <td className="px-6 py-4 text-center font-medium">{member.tasks_count ?? 0}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/team/${member.id}`}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
                      >
                        Zobacz profil
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно создания сотрудника */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-100 mb-4">Dodaj nowego członka zespołu</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Jan Kowalski"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Adres e-mail
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="jan@easyripok.pl"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Hasło
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Rola w zespole
                </label>
                <select
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="viewer">Obserwator</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Anuluj
                </Button>
                <Button variant="primary" size="md" disabled={processing} isLoading={processing}>
                  Zapisz
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}