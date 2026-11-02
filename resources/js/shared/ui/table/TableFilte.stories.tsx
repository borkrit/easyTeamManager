import type { Meta, StoryObj } from '@storybook/react';
import { TableFilters } from './TableFilter';

const meta: Meta<typeof TableFilters> = {
    title: 'Shared/UI/TableFilters',
    component: TableFilters,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableFilters>;

const mockFields = [
    {
        name: 'search',
        label: 'Szukaj projektu',
        type: 'text' as const,
        placeholder: 'Wpisz nazwę...',
    },
    {
        name: 'status',
        label: 'Status zadania',
        type: 'select' as const,
        options: [
            { value: 'active', label: 'Aktywny' },
            { value: 'completed', label: 'Zakończone' },
        ],
    },
];

export const Default: Story = {
    args: {
        fields: mockFields,
        values: { search: 'Test', status: 'active' },
        onChange: (name, val) => console.log(`Changed ${name} to ${val}`),
        onReset: () => console.log('Reset filters'),
    },
};