import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Comments } from '../Comments';

const mockPost = vi.fn();
const mockSetData = vi.fn();

// Путь к моку должен точно совпадать с импортом в компоненте Comments.tsx
vi.mock('../hook/useComments', () => ({
    useComments: () => ({
        data: { body: '' },
        setData: mockSetData,
        handleSubmit: (e: React.FormEvent) => {
            e.preventDefault();
            mockPost();
        },
        processing: false,
        errors: {},
    }),
}));

describe('Comments widget component', () => {
    const mockComments: App.Data.CommentData[] = [
        {
            id: 1,
            body: 'Świetna robota przy zadaniu!',
            user_id: 1,
            user: {
                id: 1,
                name: 'Anna Nowak',
                email: 'anna@example.com',
                role: 'user',
                tasks_count: 4,
                projects_count: 2,
                created_at: null,
            },
            created_at: null,
        },
    ];

    it('renders comments list correctly with user names and dates', () => {
        render(<Comments comments={mockComments} commentableType="task" commentableId={1} />);

        expect(screen.getByText('Komentarze')).toBeDefined();
        expect(screen.getByText('Anna Nowak')).toBeDefined();
        expect(screen.getByText('Świetna robota przy zadaniu!')).toBeDefined();
    });

    it('renders empty text when comments array is empty', () => {
        render(<Comments comments={[]} commentableType="task" commentableId={1} />);

        expect(screen.getByText('Brak komentarzy.')).toBeDefined();
    });

    it('handles form submission correctly', () => {
        render(<Comments comments={mockComments} commentableType="task" commentableId={1} />);

        const form = screen.getByPlaceholderText('Napisz komentarz...').closest('form');
        expect(form).not.toBeNull();

        fireEvent.submit(form!);

        expect(mockPost).toHaveBeenCalledTimes(1);
    });
});