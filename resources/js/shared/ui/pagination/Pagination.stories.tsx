import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Shared/UI/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const mockLinks = [
    { url: '/tasks?page=1', label: '&laquo; Poprzednia', active: false },
    { url: '/tasks?page=1', label: '1', active: false },
    { url: '/tasks?page=2', label: '2', active: true },
    { url: '/tasks?page=3', label: '3', active: false },
    { url: '/tasks?page=3', label: 'Następna &raquo;', active: false },
];

export const Default: Story = {
    args: {
        links: mockLinks,
        from: 11,
        to: 20,
        total: 45,
        prevUrl: '/tasks?page=1',
        nextUrl: '/tasks?page=3',
    },
};

export const FirstPage: Story = {
    args: {
        links: [
            { url: null, label: '&laquo; Poprzednia', active: false },
            { url: '/tasks?page=1', label: '1', active: true },
            { url: '/tasks?page=2', label: '2', active: false },
            { url: '/tasks?page=2', label: 'Następna &raquo;', active: false },
        ],
        from: 1,
        to: 10,
        total: 25,
        prevUrl: null,
        nextUrl: '/tasks?page=2',
    },
};

export const SinglePage: Story = {
    args: {
        links: [
            { url: null, label: '&laquo; Poprzednia', active: false },
            { url: '/tasks?page=1', label: '1', active: true },
            { url: null, label: 'Następna &raquo;', active: false },
        ],
        from: 1,
        to: 5,
        total: 5,
        prevUrl: null,
        nextUrl: null,
    },
};