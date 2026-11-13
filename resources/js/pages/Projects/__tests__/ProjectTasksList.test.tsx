import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectTasksList } from '../ui/ProjectTasksList';

describe('ProjectTasksList', () => {
    it('renders list of tasks with titles and statuses', () => {
        const tasks = [
            { id: 1, title: 'Zadanie 1', status: 'W toku' },
            { id: 2, title: 'Zadanie 2', status: 'Zakończone' },
        ];

        render(<ProjectTasksList tasks={tasks} />);

        expect(screen.getByText('Zadania w projekcie')).toBeInTheDocument();
        expect(screen.getByText('Zadanie 1')).toBeInTheDocument();
        expect(screen.getByText('W toku')).toBeInTheDocument();
        expect(screen.getByText('Zadanie 2')).toBeInTheDocument();
        expect(screen.getByText('Zakończone')).toBeInTheDocument();
    });

    it('renders empty state message when tasks array is empty or undefined', () => {
        render(<ProjectTasksList tasks={[]} />);

        expect(screen.getByText('Brak przypisanych zadań.')).toBeInTheDocument();
    });
});