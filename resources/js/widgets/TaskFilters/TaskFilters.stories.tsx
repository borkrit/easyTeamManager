import type { Meta, StoryObj } from '@storybook/react';
import { TaskFilters } from './TaskFilters';

const meta: Meta<typeof TaskFilters> = {
    title: 'Features/TaskFilters',
    component: TaskFilters,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof TaskFilters>;

const mockUsers = [
    { id: 1, name: 'Jan Kowalski' },
    { id: 2, name: 'Anna Nowak' },
];

const mockProjects = [
    { id: 1, name: 'System Magazynowy' },
    { id: 2, name: 'Portal B2B' },
];

export const Default: Story = {
    args: {
        filters: {},
        users: mockUsers,
        projects: mockProjects,
    },
};

export const WithActiveFilters: Story = {
    args: {
        filters: {
            search: 'Optymalizacja',
            status: 'w_trakcie',
            priority: 'wysoki',
            user_id: '1',
            project_id: '1',
        },
        users: mockUsers,
        projects: mockProjects,
    },
};