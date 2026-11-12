import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../../';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        url: '/dashboard',
        auth: {
            user: {
                name: 'Jan Kowalski',
                email: 'jan@easyripok.pl',
            },
        },
    }),
    Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

describe('Header Widget', () => {
    it('renders correct page title based on current url', () => {
        render(<Header />);

    });

    it('renders user name and email from Inertia props', () => {
        render(<Header />);

        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan@easyripok.pl')).toBeInTheDocument();
    });

    it('allows overriding user data via props', () => {
        vi.mocked(require('@inertiajs/react').usePage).mockReturnValueOnce({
            url: '/tasks',
            auth: { user: { name: 'Default', email: 'default@test.pl' } },
        } as any);

        render(<Header userName="Piotr Zieliński" userEmail="piotr@easyripok.pl" />);

        expect(screen.getByText('Zarządzanie Zadaniami')).toBeInTheDocument();
        expect(screen.getByText('Piotr Zieliński')).toBeInTheDocument();
        expect(screen.getByText('piotr@easyripok.pl')).toBeInTheDocument();
    });
});