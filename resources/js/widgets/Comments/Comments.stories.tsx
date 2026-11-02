import type { Meta, StoryObj } from '@storybook/react';
import { Comments } from './Comments';

const meta: Meta<typeof Comments> = {
    title: 'Widgets/Comments',
    component: Comments,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof Comments>;

const mockComments: App.Data.CommentData[] = [
    {
        id: 1,
        body: 'Świetna robota przy tym zadaniu!',
        user_id: 1,
        user: { id: 1, name: 'Anna Nowak', email: 'anna@example.com', role: 'user', tasks_count: 4, projects_count: 2, created_at: null },
        created_at: '2026-06-06T12:00:00.000000Z',
    },
    {
        id: 2,
        body: 'Dziękuję, wprowadzam poprawki.',
        user_id: 2,
        user: { id: 2, name: 'Jan Kowalski', email: 'jan@example.com', role: 'admin', tasks_count: 5, projects_count: 2, created_at: null },
        created_at: '2026-06-06T12:30:00.000000Z',
    },
];

export const Default: Story = {
    args: {
        comments: mockComments,
        commentableType: 'task',
        commentableId: 1,
    },
};

export const Empty: Story = {
    args: {
        comments: [],
        commentableType: 'task',
        commentableId: 1,
    },
};