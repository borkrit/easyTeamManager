import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginIndex from '../Index';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    useForm: () => ({
        data: { email: '', password: '', remember: false },
        setData: vi.fn(),
        errors: {},
        clearErrors: vi.fn(),
    }),
}));

vi.mock('../ui/LoginHeader', () => ({
    LoginHeader: () => <div data-testid="login-header">Login Header Mock</div>,
}));

vi.mock('../ui/LoginForm', () => ({
    LoginForm: () => <div data-testid="login-form">Login Form Mock</div>,
}));

describe('LoginIndex Page', () => {
    it('renders header, login form, and current year in footer', () => {
        render(<LoginIndex status={undefined} />);

        expect(screen.getByTestId('login-header')).toBeInTheDocument();
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
        
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(`EasyTeamManager.*${currentYear}`, 'i'))).toBeInTheDocument();
    });

    it('renders status message when status prop is provided', () => {
        const successMessage = 'Twoje hasło zostało zmienione.';
        render(<LoginIndex status={successMessage} />);

        expect(screen.getByText(successMessage)).toBeInTheDocument();
    });

    it('does not render status container when status prop is null/undefined', () => {
        render(<LoginIndex status={undefined} />);

        const currentYear = new Date().getFullYear().toString();
        expect(screen.queryByText(/zostalo zmienione/i)).not.toBeInTheDocument();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    });
});