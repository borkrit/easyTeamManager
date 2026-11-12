import type { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof SidebarItem> = {
    title: 'Widgets/Sidebar/SidebarItem',
    component: SidebarItem,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-64 bg-slate-950 p-4">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        isActive: {
            control: 'boolean',
            description: 'Определяет, активен ли пункт меню (подсветка и рамка)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
    args: {
        item: {
            href: '/tasks',
            label: 'Zadania',
            icon: '📋',
        },
        isActive: false,
    },
};

export const Active: Story = {
    args: {
        item: {
            href: '/tasks',
            label: 'Zadania',
            icon: '📋',
        },
        isActive: true,
    },
};

export const ProjectItem: Story = {
    args: {
        item: {
            href: '/projects',
            label: 'Projekty',
            icon: '📁',
        },
        isActive: false,
    },
};