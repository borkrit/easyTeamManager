import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Shared/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['do_zrobienia', 'w_trakcie', 'zakonczone', 'niski', 'sredni', 'wysoki', 'default'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Statuses: Story = {
    render: () => (
        <div className="flex gap-2 items-center">
            <Badge variant="do_zrobienia">Do zrobienia</Badge>
            <Badge variant="w_trakcie">W trakcie</Badge>
            <Badge variant="zakonczone">Zakończone</Badge>
        </div>
    ),
};

export const Priorities: Story = {
    render: () => (
        <div className="flex gap-2 items-center">
            <Badge variant="niski">Niski</Badge>
            <Badge variant="sredni">Średni</Badge>
            <Badge variant="wysoki">Wysoki</Badge>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex gap-2 items-center">
            <Badge size="sm" variant="w_trakcie">Small</Badge>
            <Badge size="md" variant="w_trakcie">Medium</Badge>
            <Badge size="lg" variant="w_trakcie">Large</Badge>
        </div>
    ),
};