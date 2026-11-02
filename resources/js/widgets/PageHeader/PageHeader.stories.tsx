import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
    title: 'Widgets/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
    args: {
        title: 'Zadania',
        description: 'Przeglądaj, edytuj i śledź postępy bieżących zadań.',
    },
};

export const WithAction: Story = {
    args: {
        title: 'Projekty',
        description: 'Zarządzaj strukturą i zespołami w projektach.',
        actionLabel: 'Dodaj projekt',
        onActionClick: () => alert('Kliknięto akcję!'),
    },
};