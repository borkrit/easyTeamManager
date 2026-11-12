import React from 'react';
import { Link } from '@inertiajs/react';
import { NavItem } from '@/shared/config';

interface SidebarItemProps {
    item: NavItem;
    isActive: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive }) => {
    return (
        <Link
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
};