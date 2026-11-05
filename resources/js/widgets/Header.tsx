import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Panel Główny',
  '/tasks': 'Zarządzanie Zadaniami',
  '/team': 'Zarządzanie Zespołem',
  '/projects': 'Projekty',
  '/profile': 'Profil użytkownika',
};

export const Header: React.FC<HeaderProps> = ({
  userName,
  userEmail,
}) => {
  
  const { url,auth } = usePage().props as unknown as { 
    url?: string,
    auth?: { user?: { name: string; email: string } } 
  };

  const name = userName || auth?.user?.name || 'Administrator';
  const email = userEmail || auth?.user?.email || 'admin@easyripok.pl';
  const urlPage = url ||window.location.pathname;


  const getTitle = () => {
    console.log(urlPage)
    // Точное 
    if (PAGE_TITLES[urlPage]) return PAGE_TITLES[urlPage];

    // Динамический поиск по префиксу (например, /tasks/123 -> "Zarządzanie Zadaniami")
    const matchedKey = Object.keys(PAGE_TITLES).find(
      (path) => path !== '/' && urlPage.startsWith(path)
    );


    return matchedKey ? PAGE_TITLES[matchedKey] : 'Panel Zarządzania';
  };
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-100">{ getTitle()}</h1>
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