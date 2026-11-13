import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardIndex from '../Index';
import { DashboardProps } from '../types/types';


vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

describe('DashboardIndex Page', () => {
    const mockProps: DashboardProps = {
        stats: {
            totalProjects: 4,
            totalTasks: 25,
            completedTasks: 10,
            totalTeamMembers: 6,
        },
        recentTasks: [
            {
                id: 1,
                title: 'Testowa zadanie',
                description: null,
                status: 'do_zrobienia' ,
                priority: 'niski' ,
                user_id: 1,
                user: null,
                project_id: 1,
                projectName: 'Super Projekt',
                assigneeName: 'Jan',
                comments: [],
                created_at: null,
            },
        ],
    };

    it('renders dashboard with stats and recent tasks', () => {
        render(<DashboardIndex {...mockProps} />);


        expect(screen.getByText('4')).toBeInTheDocument(); // totalProjects
        expect(screen.getByText('25')).toBeInTheDocument(); // totalTasks
        expect(screen.getByText('10')).toBeInTheDocument(); // completedTasks
        expect(screen.getByText('6')).toBeInTheDocument();  // totalTeamMembers

        expect(screen.getByText('Testowa zadanie')).toBeInTheDocument();
        expect(screen.getByText('Super Projekt')).toBeInTheDocument();
        
        expect(screen.getByText('Informacje o systemie')).toBeInTheDocument();
        expect(screen.getByText('1.0.0-rc')).toBeInTheDocument();
    });
});