import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskFilters } from '../TaskFilters';


vi.mock('@inertiajs/react', () => ({
    router: {
        get: vi.fn(),
    },
}));

describe('TaskFilters Widget (Integration)', () => {
    const mockUsers = [{ id: 1, name: 'Jan Kowalski' }];
    const mockProjects = [{ id: 1, name: 'Projekt Alpha' }];

    it('renders search input and select filters correctly', () => {
        render(<TaskFilters filters={{}} users={mockUsers} projects={mockProjects} />);

        expect(screen.getByPlaceholderText('Szukaj zadania...')).toBeDefined();
        expect(screen.getByText('Jan Kowalski')).toBeDefined();
        expect(screen.getByText('Projekt Alpha')).toBeDefined();
    });

    it('updates search input value on typing', () => {
        render(<TaskFilters filters={{}} users={mockUsers} projects={mockProjects} />);

        const input = screen.getByPlaceholderText('Szukaj zadania...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Nowe zadanie' } });

        expect(input.value).toBe('Nowe zadanie');
    });
});