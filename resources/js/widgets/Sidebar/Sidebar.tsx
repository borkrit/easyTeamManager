import React from 'react';
import { navItems } from '@/shared/config';
import { useActiveRoute } from './hooks/useActiveRoute';
import { SidebarItem } from './ui/SidebarItem';
import { useLogout } from './hooks/useLogout';

export const Sidebar: React.FC = () => {
    const { isRouteActive } = useActiveRoute();
    const { logout, isLoading } = useLogout();
    

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 border-b border-slate-800 px-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    ER
                </div>
                <span className="font-bold text-slate-100 tracking-wide">EasyTeamManager</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5">
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Menu główne
                </p>
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        item={item}
                        isActive={isRouteActive(item.href)}
                    />
                ))}
            </nav>
              
              <button
                    onClick={logout}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors group"
                >
                    <svg
                        className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    {isLoading ? 'Wychodzenie...' : 'Wyloguj się'}
                </button>
           
            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/60">
                    <p className="text-xs font-medium text-slate-300">Zadanie Rekrutacyjne</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Laravel + Inertia + React</p>
                </div>
            </div>
        </aside>
    );
};