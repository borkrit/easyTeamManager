import React from 'react';

interface HeaderProps {
  title: string;
  userName?: string;
  userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  userName = 'Administrator',
  userEmail = 'admin@easyripok.pl',
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-200">{userName}</p>
          <p className="text-xs text-slate-400">{userEmail}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold text-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};