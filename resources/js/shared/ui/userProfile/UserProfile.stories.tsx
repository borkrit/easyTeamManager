import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
    title: 'Shared/UI/UserProfile',
    component: UserProfile,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        name: {
            control: 'text',
        },
        email: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
    args: {
        name: 'Jan Kowalski',
        email: 'jan.kowalski@easyripok.pl',
        size: 'md',
    },
};

export const Small: Story = {
    args: {
        name: 'Anna Nowak',
        email: 'anna@easyripok.pl',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        name: 'Administrator Systemu',
        email: 'admin@easyripok.pl',
        size: 'lg',
    },
};