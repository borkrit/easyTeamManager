import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardStatsGrid } from '../ui/DashboardStatsGrid';

describe('DashboardStatsGrid', () => {
    const mockStats = {
        totalProjects: 8,
        totalTasks: 42,
        completedTasks: 19,
        totalTeamMembers: 5,
    };

    it('renders all 4 stat cards with correct titles and values', () => {
        render(<DashboardStatsGrid stats={mockStats} />);

        expect(screen.getByText('Wszystkie projekty')).toBeInTheDocument();
        expect(screen.getByText('Zadania w systemie')).toBeInTheDocument();
        expect(screen.getByText('Ukończone zadania')).toBeInTheDocument();
        expect(screen.getByText('Członkowie zespołu')).toBeInTheDocument();

        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
        expect(screen.getByText('19')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('highlights completed tasks value', () => {
        render(<DashboardStatsGrid stats={mockStats} />);

        const completedValue = screen.getByText('19');
        expect(completedValue).toHaveClass('text-emerald-400');
    });
});