import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Pulpit', href: '/dashboard', icon: '📊' },
  { label: 'Projekty', href: '/projects', icon: '📁' },
  { label: 'Zadania', href: '/tasks', icon: '📋' },
  { label: 'Zespół', href: '/team', icon: '👥' },
];

export const Sidebar: React.FC = () => {
  const { url } = usePage();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Logo / Nazwa aplikacji */}
      <div className="h-16 border-b border-slate-800 px-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          ER
        </div>
        <span className="font-bold text-slate-100 tracking-wide">EasyTeamManager</span>
      </div>

      {/* Menu nawigacyjne */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Menu główne
        </p>
        {navItems.map((item) => {
          const isActive = url.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Stopka panelu bocznego */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/60">
          <p className="text-xs font-medium text-slate-300">Zadanie Rekrutacyjne</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Laravel + Inertia + React</p>
        </div>
      </div>
    </aside>
  );
};