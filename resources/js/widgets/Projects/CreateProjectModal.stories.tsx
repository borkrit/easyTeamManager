import type { Meta, StoryObj } from '@storybook/react';
import { CreateProjectModal } from './CreateProjectModal';

const meta: Meta<typeof CreateProjectModal> = {
    title: 'Features/CreateProjectModal',
    component: CreateProjectModal,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        users: [
            { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
            { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
            { id: 3, name: 'Piotr Zieliński', email: 'piotr@example.com' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof CreateProjectModal>;

export const CreateMode: Story = {
    args: {
        isOpen: true,
        initialData: null,
    },
};

export const EditMode: Story = {
    args: {
        isOpen: true,
        initialData: {
            id: 1,
            name: 'System zarządzania magazynem',
            description: 'Rozbudowany system do kontroli stanów magazynowych w czasie rzeczywistym.',
            users: [{ id: 1, name: 'Jan Kowalski' }],
        },
    },
};