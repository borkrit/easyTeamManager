import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserProfileHeader } from '../ui/UserProfileHeader';

describe('UserProfileHeader', () => {
    const mockUser: App.Data.UserData = {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
    } as App.Data.UserData;

    it('renders user name, email, and avatar initial correctly', () => {
        render(<UserProfileHeader user={mockUser} />);


        const nameElements = screen.getAllByText('Jan Kowalski');
        expect(nameElements).toHaveLength(2);

        const emailElements = screen.getAllByText('jan.kowalski@example.com');
        expect(emailElements).toHaveLength(2);
    });

    it(`renders fallback initial 'U' when name is empty or missing`, () => {
        const userWithoutName: App.Data.UserData = {
            id: 2,
            name: '',
            email: 'noname@example.com',
        } as App.Data.UserData;

        render(<UserProfileHeader user={userWithoutName} />);

        expect(screen.getByText('U')).toBeInTheDocument();
    });
});