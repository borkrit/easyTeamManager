import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileShow from '../Show';
import { useUserProfile } from '../hooks/useUserProfile';

vi.mock('../hooks/useUserProfile', () => ({
    useUserProfile: vi.fn(),
}));

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('../ui/UserProfileHeader', () => ({
    UserProfileHeader: () => <div data-testid="user-profile-header">Header Mock</div>,
}));

vi.mock('../ui/UserTasksSection', () => ({
    UserTasksSection: () => <div data-testid="user-tasks-section">Tasks Mock</div>,
}));

const mockedUseUserProfile = vi.mocked(useUserProfile);

describe('ProfileShow Page', () => {
    it('renders loading/unauthorized state when user is not authenticated', () => {
        mockedUseUserProfile.mockReturnValue({
            user: undefined,
            tasks: undefined,
            isAuthenticated: false,
        });

        render(<ProfileShow />);

        expect(screen.getByText('Ładowanie profilu lub brak autoryzacji...')).toBeInTheDocument();
        expect(screen.queryByTestId('user-profile-header')).not.toBeInTheDocument();
    });

    it('renders profile header and tasks section when user is authenticated', () => {
        const mockUser: App.Data.UserData = {
            id: 1,
            name: 'Anna Nowak',
            email: 'anna@example.com',
        } as App.Data.UserData;

        mockedUseUserProfile.mockReturnValue({
            user: mockUser,
            tasks: { data: [], links: [], from: null, to: null, total: 0 },
            isAuthenticated: true,
        });

        render(<ProfileShow />);

        expect(screen.getByText('Profil użytkownika')).toBeInTheDocument();
        expect(screen.getByTestId('user-profile-header')).toBeInTheDocument();
        expect(screen.getByTestId('user-tasks-section')).toBeInTheDocument();
    });
});