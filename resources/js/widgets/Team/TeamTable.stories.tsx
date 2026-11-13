import type { Meta, StoryObj } from '@storybook/react';
import { TeamTable } from './TeamTable';

const meta: Meta<typeof TeamTable> = {
    title: 'Features/Team/TeamTable',
    component: TeamTable,
};

export default meta;
type Story = StoryObj<typeof TeamTable>;

export const Default: Story = {
    args: {
        users: [
            {
                id: 1,
                name: 'Jan Kowalski',
                email: 'jan@easyripok.pl',
                role: 'admin',
                projects_count: 3,
                tasks_count: 12,
                created_at: '2026-01-15T00:00:00.000Z' as any, 
            },
            {
                id: 2,
                name: 'Anna Nowak',
                email: 'anna@easyripok.pl',
                role: 'developer',
                projects_count: 1,
                tasks_count: 5,
                created_at: '2026-02-10T00:00:00.000Z' ,
            },
        ],
    },
};

export const Empty: Story = {
    args: {
        users: [],
    },
};