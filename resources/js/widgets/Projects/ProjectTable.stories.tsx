import type { Meta, StoryObj } from '@storybook/react';
import { ProjectTable } from './ProjectTable';

const meta: Meta<typeof ProjectTable> = {
    title: 'Widgets/ProjectTable',
    component: ProjectTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ProjectTable>;

const mockProjects = [
    {
        id: 1,
        name: 'System zarządzania magazynem',
        description: 'Aplikacja do kontroli stanów w czasie rzeczywistym.',
        tasks_count: 12,
        users: [
            { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
            { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
        ],
        created_at: '2026-09-01T10:00:00.000000Z',
    },
    {
        id: 2,
        name: 'Portal e-commerce B2B',
        description: 'Sklep internetowy dla partnerów biznesowych.',
        tasks_count: 5,
        users: [],
        created_at: '2026-09-05T14:30:00.000000Z',
    },
];

export const Default: Story = {
    args: {
        projects: mockProjects,
    },
};

export const Empty: Story = {
    args: {
        projects: [],
    },
};