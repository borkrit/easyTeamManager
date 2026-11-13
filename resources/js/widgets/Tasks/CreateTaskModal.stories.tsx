import type { Meta, StoryObj } from '@storybook/react';
import { CreateTaskModal } from './CreateTaskModal';
import { UiTask } from './types/types';

const meta: Meta<typeof CreateTaskModal> = {
    title: 'Features/CreateTaskModal',
    component: CreateTaskModal,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateTaskModal>;

const mockProjects = [
    { 
        id: 1, 
        name: 'Projekt Alpha',
        users: [
            { id: 10, name: 'Jan Kowalski' },
            { id: 11, name: 'Anna Nowak' },
        ] 
    },
    { 
        id: 2, 
        name: 'Projekt Beta',
        users: [
            { id: 12, name: 'Piotr Zieliński' }
        ] 
    },
];

const mockTaskForEdit = {
    id: 1,
    title: 'Naprawa modułu autoryzacji',
    description: 'Pilna poprawka błędu w tokenach JWT.',
    status: 'w_trakcie',
    priority: 'wysoki',
    project_id: 1,
    user_id: 10,
} as unknown as UiTask;

export const CreateMode: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Close modal'),
        projects: mockProjects,
        users: [],
    },
};

export const EditMode: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Close modal'),
        task: mockTaskForEdit,
        projects: mockProjects,
        users: [],
    },
};

export const EmptyProjectUsers: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Close modal'),
        projectId: 99,
        projects: [{ id: 99, name: 'Pusty Projekt', users: [] }],
        users: [],
    },
};