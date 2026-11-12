import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

// Создаем декоратор для мока Inertia usePage в Storybook
const withInertiaMock = (Story: any, context: { args: any }) => {
    // В реальном проекте можно использовать storybook-addon-inertia или простой мок
    window.history.pushState({}, '', context.args.currentUrl || '/dashboard');
    return <Story />;
};

const meta: Meta<typeof Header> = {
    title: 'Widgets/Header',
    component: Header,
    tags: ['autodocs'],
    decorators: [withInertiaMock],
    argTypes: {
        userName: { control: 'text' },
        userEmail: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    args: {
        userName: 'Jan Kowalski',
        userEmail: 'jan.kowalski@easyripok.pl',
    },
};

export const AdminUser: Story = {
    args: {
        userName: 'Administrator',
        userEmail: 'admin@easyripok.pl',
    },
};