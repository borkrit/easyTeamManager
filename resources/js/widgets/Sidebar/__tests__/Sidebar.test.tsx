import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar } from '../Sidebar';

let mockUrl = '/dashboard';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        url: mockUrl,
    }),
    Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

describe('Sidebar Widget', () => {
    it('renders all navigation items from config', () => {
        render(<Sidebar />);

        expect(screen.getByText('Pulpit')).toBeInTheDocument();
        expect(screen.getByText('Projekty')).toBeInTheDocument();
        expect(screen.getByText('Zadania')).toBeInTheDocument();
        expect(screen.getByText('Zespół')).toBeInTheDocument();
    });

    it('highlights dashboard as active when url is /dashboard', () => {
        mockUrl = '/dashboard';
        render(<Sidebar />);

        const dashboardLink = screen.getByText('Pulpit').closest('a');
        const tasksLink = screen.getByText('Zadania').closest('a');

        expect(dashboardLink).toHaveClass('bg-indigo-600/10');
        expect(tasksLink).not.toHaveClass('bg-indigo-600/10');
    });

    it('highlights tasks as active when url is /tasks', () => {
        mockUrl = '/tasks';
        render(<Sidebar />);

        const tasksLink = screen.getByText('Zadania').closest('a');
        const dashboardLink = screen.getByText('Pulpit').closest('a');

        expect(tasksLink).toHaveClass('bg-indigo-600/10');
        expect(dashboardLink).not.toHaveClass('bg-indigo-600/10');
    });

    it('supports nested routes for active state checking', () => {
        mockUrl = '/tasks/123/edit';
        render(<Sidebar />);

        const tasksLink = screen.getByText('Zadania').closest('a');
        
        expect(tasksLink).toHaveClass('bg-indigo-600/10');
    });
});