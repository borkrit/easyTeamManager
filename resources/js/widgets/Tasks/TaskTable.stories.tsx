import type { Meta, StoryObj } from '@storybook/react';
import { TaskTable } from './TaskTable';
import { UiTask } from './types/types';

const meta: Meta<typeof TaskTable> = {
    title: 'Features/TaskTable',
    component: TaskTable,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskTable>;

// Мок-данные с приведением к UiTask для обхода строгой типизации Laravel Data в Storybook
const mockTasks = [
    {
        id: 1,
        title: 'Implementacja autoryzacji OAuth',
        description: 'Konfiguracja logowania przez Google i GitHub',
        projectName: 'System ERP',
        assigneeName: 'Jan Kowalski',
        status: 'w_trakcie',
        priority: 'wysoki',
        project_id: 1,
        user_id: 10,
    },
    {
        id: 2,
        title: 'Naprawa błędów w raporcie miesięcznym',
        description: 'Korekta sumowania kwot netto/brutto',
        projectName: 'Finanse',
        assigneeName: 'Anna Nowak',
        status: 'do_zrobienia',
        priority: 'sredni',
        project_id: 2,
        user_id: 11,
    },
    {
        id: 3,
        title: 'Migracja bazy danych na PostgreSQL 16',
        description: 'Testy wydajnościowe nowej instancji',
        projectName: 'Infrastruktura',
        assigneeName: null,
        status: 'zakonczone',
        priority: 'niski',
        project_id: 3,
        user_id: null,
    },
] as unknown as UiTask[];

export const Default: Story = {
    args: {
        tasks: {
            data: mockTasks,
        },
        selectable: true,
        selectedTaskIds: [1],
        toggleSelectAll: () => console.log('Toggle select all'),
        toggleTaskSelection: (id) => console.log('Toggle task selection:', id),
        onEditTask: (task) => console.log('Edit task clicked:', task),
    },
};

export const Empty: Story = {
    args: {
        tasks: {
            data: [],
        },
        selectable: true,
        selectedTaskIds: [],
        toggleSelectAll: () => {},
        toggleTaskSelection: () => {},
    },
};