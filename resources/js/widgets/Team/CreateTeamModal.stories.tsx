import type { Meta, StoryObj } from '@storybook/react';
import { CreateTeamModal } from './CreateTeamModal';

const meta: Meta<typeof CreateTeamModal> = {
    title: 'Features/Team/CreateTeamModal',
    component: CreateTeamModal,
};

export default meta;
type Story = StoryObj<typeof CreateTeamModal>;

export const CreateMode: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
        team: null,
    },
};

export const EditMode: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
        team: {
            id: 1,
            name: 'Jan Kowalski',
            email: 'jan@easyripok.pl',
            role: 'manager',
        } as any,
    },
};