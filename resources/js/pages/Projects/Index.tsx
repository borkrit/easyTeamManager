import React from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';

export default function ProjectsIndex() {
  return (
    <AppLayout title="Projekty">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Zarządzanie projektami</h2>
          <p className="text-sm text-slate-400">Przeglądaj, twórz i edytuj projekty zespołu.</p>
        </div>
        <Button variant="primary" size="md">
          + Nowy projekt
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 text-center">
        Brak aktywnych projektów. Utwórz pierwszy projekt, aby zacząć.
      </div>
    </AppLayout>
  );
}