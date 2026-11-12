import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SidebarItem } from '../ui/SidebarItem';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

describe('SidebarItem Component', () => {
    const mockItem = {
        href: '/tasks',
        label: 'Zadania',
        icon: '📋',
    };

    it('renders item label, icon and correct href', () => {
        render(<SidebarItem item={mockItem} isActive={false} />);

        expect(screen.getByText('Zadania')).toBeInTheDocument();
        expect(screen.getByText('📋')).toBeInTheDocument();
        expect(screen.getByText('Zadania').closest('a')).toHaveAttribute('href', '/tasks');
    });

    it('applies active styles when isActive is true', () => {
        render(<SidebarItem item={mockItem} isActive={true} />);

        const link = screen.getByText('Zadania').closest('a');
        expect(link).toHaveClass('bg-indigo-600/10');
        expect(link).toHaveClass('text-indigo-400');
    });

    it('applies inactive styles when isActive is false', () => {
        render(<SidebarItem item={mockItem} isActive={false} />);

        const link = screen.getByText('Zadania').closest('a');
        expect(link).toHaveClass('text-slate-400');
        expect(link).not.toHaveClass('bg-indigo-600/10');
    });
});