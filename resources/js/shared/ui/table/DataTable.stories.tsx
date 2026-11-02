import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from './DataTable';

type Task = App.Data.TaskData;

const meta: Meta<typeof DataTable<Task>> = {
    title: 'Shared/UI/DataTable',
    component: DataTable,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<Task>>;

const mockData: Task[] = [
    {
        id: 1,
        title: 'Projekt Alfa',
        description: 'Opis zadania alfa',
        status: 'do_zrobienia',
        priority: 'wysoki',
        user_id: 1,
        user: { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', role: 'admin', tasks_count: 5, projects_count: 2, created_at: null },
        project_id: 1,
        projectName: 'System ERP',
        assigneeName: 'Jan Kowalski',
        comments: undefined,
        created_at: null,
    },
    {
        id: 2,
        title: 'Projekt Beta',
        description: null,
        status: 'w_trakcie',
        priority: 'sredni',
        user_id: 2,
        user: null,
        project_id: 1,
        projectName: 'System ERP',
        assigneeName: null,
        comments: undefined,
        created_at: null,
    },
];

const mockColumns: Column<Task>[] = [
    { header: 'Tytuł', accessor: 'title' },
    { header: 'Status', accessor: 'status' },
    { header: 'Projekt', accessor: 'projectName' },
];

export const Default: Story = {
    args: {
        data: mockData,
        columns: mockColumns,
        selectable: true,
        selectedIds: [1],
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: mockColumns,
        emptyText: 'Brak aktywnych zadań.',
    },
};