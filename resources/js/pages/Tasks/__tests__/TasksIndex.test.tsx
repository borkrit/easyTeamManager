import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TasksIndex from '../Index'; // Укажите правильный путь к вашему файлу страницы

// Мокаем Inertia Head, чтобы не было ошибок контекста
vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    router: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

// Мокаем хуки выбора задач и модалки
vi.mock('../hooks/useTaskSelection', () => ({
    useTaskSelection: () => ({
        selectedTaskIds: [],
        bulkAction: '',
        setBulkAction: vi.fn(),
        isProcessing: false,
        toggleSelectAll: vi.fn(),
        toggleTaskSelection: vi.fn(),
        handleBulkSubmit: vi.fn(),
    }),
}));

vi.mock('@/shared/hooks/useModal', () => ({
    useModal: () => ({
        isOpen: false,
        data: null,
        openCreate: vi.fn(),
        openEdit: vi.fn(),
        close: vi.fn(),
    }),
}));

describe('TasksIndex Page', () => {
    const mockProps = {
        tasks: {
            data: [
                {
                    id: 1,
                    title: 'Zadanie testowe 1',
                    projectName: 'Projekt Alpha',
                    assigneeName: 'Jan Kowalski',
                    status: 'do_zrobienia',
                    priority: 'sredni',
                },
            ] as any,
            links: [],
            from: 1,
            to: 1,
            total: 1,
        },
        users: [
            { id: 10, name: 'Jan Kowalski' },
        ] as any, 
        projects: [
            { id: 1, name: 'Projekt Alpha' },
        ] as any, 
        filters: {},
    };

    it('renders tasks index page with all main widgets', () => {
        render(<TasksIndex {...mockProps} />);

        expect(screen.getByText('Lista zadań')).toBeInTheDocument();
        expect(screen.getByText('Zarządzaj zadaniami we wszystkich projektach.')).toBeInTheDocument();
        
        expect(screen.getByRole('button', { name: /\+ Utwórz zadanie/i })).toBeInTheDocument();

        expect(screen.getByText('Zadanie testowe 1')).toBeInTheDocument();
    });
});