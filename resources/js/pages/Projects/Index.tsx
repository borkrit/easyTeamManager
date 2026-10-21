import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { ProjectTable, UiProject, CreateProjectModal } from '@/widgets/index';

interface ProjectsIndexProps {
    projects: UiProject[];
    users?: { id: number; name: string }[];
}

export default function ProjectsIndex({ projects, users = [] }: ProjectsIndexProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(projects.map((p) => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item_id) => item_id !== id) : [...prev, id]
        );
    };

    return (
        <AppLayout title="Projekty">
            <Head title="Projekty" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-100">Zarządzanie projektami</h2>
                    <p className="text-sm text-slate-400">Przeglądaj, twórz i edytuj projekty zespołu.</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <span className="text-sm text-indigo-400 font-medium">
                            Zaznaczono: {selectedIds.length}
                        </span>
                    )}
                    <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                        + Nowy projekt
                    </Button>
                </div>
            </div>

            <ProjectTable
                projects={projects}
                selectedIds={selectedIds}
                onSelectAll={toggleSelectAll}
                onSelectOne={toggleSelectOne}
            />

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
            />
        </AppLayout>
    );
}