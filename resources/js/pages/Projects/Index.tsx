import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { ProjectTable, UiProject, CreateProjectModal, PageHeader } from '@/widgets/index';

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



            <PageHeader
                    title="Zarządzanie projektami"
                    description="Przeglądaj, twórz i edytuj projekty zespołu."
                    actionLabel="+ Nowy projekt"
                    onActionClick={() => setIsModalOpen(true)}
                  />


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