import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectTeamList } from '../ui/ProjectTeamList';

describe('ProjectTeamList', () => {
    it('renders team members list correctly', () => {
        const users = [
            { id: 1, name: 'Jan Kowalski' },
            { id: 2, name: 'Anna Nowak' },
        ];

        render(<ProjectTeamList users={users} />);

        expect(screen.getByText('Zespół projektu')).toBeInTheDocument();
        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    });

    it('renders empty state message when users array is empty or undefined', () => {
        render(<ProjectTeamList users={[]} />);

        expect(screen.getByText('Brak członków w zespole.')).toBeInTheDocument();
    });
});