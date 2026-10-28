import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
    title: 'Shared/BackButton',
    component: BackButton,
    tags: ['autodocs'],
    argTypes: {
        href: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
    args: {
        href: '/tasks',
        children: 'Wróć do listy zadań',
    },
};

export const ProjectsList: Story = {
    args: {
        href: '/projects',
        children: 'Wróć do listy projektów',
    },
};