import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardHeader } from '../ui/DashboardHeader';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

vi.mock('@/shared/ui/button', () => ({
    Button: ({ children }: { children: React.ReactNode }) => (
        <button>{children}</button>
    ),
}));

describe('DashboardHeader', () => {
    it('renders welcome message and subtitle', () => {
        render(<DashboardHeader />);

        expect(screen.getByText('Witaj ponownie! 👋')).toBeInTheDocument();
        expect(
            screen.getByText('Oto podsumowanie stanu projektów i zadań w systemie EasyTeamManager.')
        ).toBeInTheDocument();
    });

    it('renders navigation links to projects and tasks', () => {
        render(<DashboardHeader />);

        const projectsLink = screen.getByRole('link', { name: /Zobacz projekty/i });
        const tasksLink = screen.getByRole('link', { name: /\+ Nowe zadanie/i });

        expect(projectsLink).toHaveAttribute('href', '/projects');
        expect(tasksLink).toHaveAttribute('href', '/tasks');
    });
});