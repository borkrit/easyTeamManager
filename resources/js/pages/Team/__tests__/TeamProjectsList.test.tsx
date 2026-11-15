import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamProjectsList } from '../ui/TeamProjectsList';

describe('TeamProjectsList', () => {
    it('renders projects list with count, descriptions and tasks count', () => {
        const projects = [
            { id: 1, name: 'Projekt Alpha', description: 'Opis projektu alpha', tasks_count: 5 },
            { id: 2, name: 'Projekt Beta', description: null, tasks_count: undefined },
        ];

        render(<TeamProjectsList projects={projects} />);

        expect(screen.getByText('Projekty (2)')).toBeInTheDocument();
        expect(screen.getByText('Projekt Alpha')).toBeInTheDocument();
        expect(screen.getByText('Opis projektu alpha')).toBeInTheDocument();
        expect(screen.getByText('5 zadań')).toBeInTheDocument();
        
        expect(screen.getByText('Projekt Beta')).toBeInTheDocument();
        expect(screen.getByText('0 zadań')).toBeInTheDocument();
    });

    it('renders empty state message when projects array is empty', () => {
        render(<TeamProjectsList projects={[]} />);

        expect(screen.getByText('Projekty (0)')).toBeInTheDocument();
        expect(screen.getByText('Brak przypisanych projektów.')).toBeInTheDocument();
    });
});