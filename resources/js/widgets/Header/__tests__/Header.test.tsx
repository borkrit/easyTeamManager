import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '../Header';

const mockUsePage = vi.fn();

vi.mock('@inertiajs/react', () => ({
    usePage: () => mockUsePage(),
    Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

vi.mock('@/shared/config', () => ({
    getPageTitleByUrl: vi.fn((url: string) => {
        if (url === '/tasks') return 'Zarządzanie Zadaniami';
        return 'Panel Główny'; 
    }),
}));

describe('Header Widget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Структура должна соответствовать usePage().props
        mockUsePage.mockReturnValue({
            props: {
                url: '/dashboard',
                auth: {
                    user: {
                        name: 'Jan Kowalski',
                        email: 'jan@easyripok.pl',
                    },
                },
            },
        });
    });

    it('renders correct page title based on current url', () => {
        render(<Header />);
        expect(screen.getByText('Panel Główny')).toBeInTheDocument();
    });

    it('renders user name and email from Inertia props', () => {
        render(<Header />);

        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan@easyripok.pl')).toBeInTheDocument();
    });

    it('allows overriding user data via props', () => {
        mockUsePage.mockReturnValueOnce({
            url: '/tasks',
            props: {
                
                auth: { user: { name: 'Default', email: 'default@test.pl' } },
            },
        });

        render(<Header userName="Piotr Zieliński" userEmail="piotr@easyripok.pl" />);

        expect(screen.getByText('Zarządzanie Zadaniami')).toBeInTheDocument();
        expect(screen.getByText('Piotr Zieliński')).toBeInTheDocument();
        expect(screen.getByText('piotr@easyripok.pl')).toBeInTheDocument();
    });
});