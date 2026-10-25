import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface HeaderProps {
  title: string;
  userName?: string;
  userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  userName,
  userEmail,
}) => {
  
  const { auth } = usePage().props as unknown as { 
    auth?: { user?: { name: string; email: string } } 
  };

  const name = userName || auth?.user?.name || 'Administrator';
  const email = userEmail || auth?.user?.email || 'admin@easyripok.pl';

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
      </div>

      <Link
        href="/profile"
        className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-900/80 transition-colors group cursor-pointer"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
            {name}
          </p>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold text-sm group-hover:border-indigo-400 group-hover:bg-indigo-600/30 transition-all">
          {name.charAt(0).toUpperCase()}
        </div>
      </Link>
    </header>
  );
};