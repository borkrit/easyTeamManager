import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamTasksList } from '../ui/TeamTasksList';

describe('TeamTasksList', () => {
    it('renders tasks list with titles, project names and status badges', () => {
        const tasks = [
            {
                id: 1,
                title: 'Zadanie 1',
                status: 'w_trakcie' as App.Enums.TaskStatus,
                projectName: 'EasyTask',
            },
            {
                id: 2,
                title: 'Zadanie 2',
                status: 'zakonczone' as App.Enums.TaskStatus,
                projectName: null,
            },
        ] as unknown as App.Data.TaskData[];

        render(<TeamTasksList tasks={tasks} />);

        expect(screen.getByText('Zadania użytkownika (2)')).toBeInTheDocument();
        expect(screen.getByText('Zadanie 1')).toBeInTheDocument();
        expect(screen.getByText('Projekt: EasyTask')).toBeInTheDocument();
        expect(screen.getByText('W trakcie')).toBeInTheDocument();

        expect(screen.getByText('Zadanie 2')).toBeInTheDocument();
        expect(screen.getByText('Zakończone')).toBeInTheDocument();
    });

    it('renders empty state message when tasks array is empty', () => {
        render(<TeamTasksList tasks={[]} />);

        expect(screen.getByText('Zadania użytkownika (0)')).toBeInTheDocument();
        expect(screen.getByText('Brak przypisanych zadań.')).toBeInTheDocument();
    });
});