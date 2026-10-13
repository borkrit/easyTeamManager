import React, { ReactNode } from 'react';
import { Sidebar, Header } from '@/widgets';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title = 'Panel Zarządzania' }) => {
  const { props } = usePage<{ auth?: { user?: { name: string; email: string } } }>();
  const user = props.auth?.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-indigo-500 selection:text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={title} 
          userName={user?.name ?? 'Administrator'} 
          userEmail={user?.email ?? 'admin@easyripok.pl'} 
        />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};