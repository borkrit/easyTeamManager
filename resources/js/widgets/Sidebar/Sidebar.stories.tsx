import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

import { vi } from 'vitest'; 

const meta: Meta<typeof Sidebar> = {
    title: 'Widgets/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const createSidebarStory = (currentUrl: string) => {
    return {
        render: () => {
            vi.mock('@inertiajs/react', async (importOriginal) => {
                const actual = await importOriginal<typeof import('@inertiajs/react')>();
                return {
                    ...actual,
                    usePage: () => ({
                        url: currentUrl,
                    }),
                };
            });

            return (
                <div className="flex h-screen bg-slate-900">
                    <Sidebar />
                </div>
            );
        },
    };
};

export const DashboardActive: Story = {
    ...createSidebarStory('/dashboard'),
};

export const ProjectsActive: Story = {
    ...createSidebarStory('/projects'),
};

export const TasksActive: Story = {
    ...createSidebarStory('/tasks'),
};

export const NestedTaskRouteActive: Story = {
    ...createSidebarStory('/tasks/12/edit'),
};