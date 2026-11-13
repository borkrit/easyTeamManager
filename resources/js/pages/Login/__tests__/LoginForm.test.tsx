import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../ui/LoginForm';

const mockMutate = vi.fn();
const mockSetData = vi.fn();

const mockUseForm = vi.fn();
const mockUseApiMutation = vi.fn();

vi.mock('@inertiajs/react', () => ({
    useForm: () => mockUseForm(),
}));

vi.mock('@/shared/hooks/useApiMutation', () => ({
    useApiMutation: () => mockUseApiMutation(),
}));

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockUseForm.mockReturnValue({
            data: {
                email: '',
                password: '',
                remember: false,
            },
            setData: mockSetData,
            errors: {},
            clearErrors: vi.fn(),
        });

        mockUseApiMutation.mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
        });
    });

    it('renders email, password, remember checkbox and submit button', () => {
        render(<LoginForm />);

        expect(screen.getByPlaceholderText('jan.kowalski@easyteammanager.pl')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
        expect(screen.getByLabelText(/Zapamiętaj mnie/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Zaloguj się/i })).toBeInTheDocument();
    });

    it('calls setData when user types in inputs and toggles checkbox', () => {
        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText('jan.kowalski@easyteammanager.pl');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const rememberCheckbox = screen.getByRole('checkbox');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(mockSetData).toHaveBeenCalledWith('email', 'test@example.com');

        fireEvent.change(passwordInput, { target: { value: 'secret123' } });
        expect(mockSetData).toHaveBeenCalledWith('password', 'secret123');

        fireEvent.click(rememberCheckbox);
        expect(mockSetData).toHaveBeenCalledWith('remember', true);
    });

    it('submits form data via useApiMutation on form submit', () => {
        const formData = {
            email: 'jan.kowalski@easyteammanager.pl',
            password: 'password123',
            remember: true,
        };

        mockUseForm.mockReturnValue({
            data: formData,
            setData: mockSetData,
            errors: {},
            clearErrors: vi.fn(),
        });

        render(<LoginForm />);

        const submitButton = screen.getByRole('button', { name: /Zaloguj się/i });
        fireEvent.click(submitButton);

        expect(mockMutate).toHaveBeenCalledTimes(1);
        expect(mockMutate).toHaveBeenCalledWith(
            'post',
            '/login',
            formData,
            expect.objectContaining({
                onError: expect.any(Function),
            })
        );
    });

    it('displays validation errors when errors object is populated', () => {
        mockUseForm.mockReturnValue({
            data: { email: '', password: '', remember: false },
            setData: mockSetData,
            errors: {
                email: 'Podany adres e-mail jest nieprawidłowy.',
                password: 'Hasło jest wymagane.',
            },
            clearErrors: vi.fn(),
        });

        render(<LoginForm />);

        expect(screen.getByText('Podany adres e-mail jest nieprawidłowy.')).toBeInTheDocument();
        expect(screen.getByText('Hasło jest wymagane.')).toBeInTheDocument();
    });

    it('disables submit button when mutation is loading', () => {
        mockUseApiMutation.mockReturnValue({
            mutate: mockMutate,
            isLoading: true,
        });

        render(<LoginForm />);

        const submitButton = screen.getByRole('button');
        expect(submitButton).toBeDisabled();
    });
});