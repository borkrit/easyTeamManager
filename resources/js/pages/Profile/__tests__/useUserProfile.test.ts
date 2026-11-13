// resources/js/pages/Profile/hooks/__tests__/useUserProfile.test.ts
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUserProfile } from '../hooks/useUserProfile';

const mockUsePage = vi.fn();

vi.mock('@inertiajs/react', () => ({
    usePage: () => mockUsePage(),
}));

describe('useUserProfile Hook', () => {
    it('returns user, tasks, and isAuthenticated as true when data exists', () => {
        const mockUser: App.Data.UserData = {
            id: 1,
            name: 'Jan Kowalski',
            email: 'jan@example.com',
        } as App.Data.UserData;

        const mockTasks = {
            data: [],
            links: [],
            from: null,
            to: null,
            total: 0,
        };

        mockUsePage.mockReturnValue({
            props: {
                auth: { user: mockUser },
                tasks: mockTasks,
            },
        });

        const { result } = renderHook(() => useUserProfile());

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.tasks).toEqual(mockTasks);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('returns isAuthenticated as false and undefined user/tasks when not authenticated', () => {
        mockUsePage.mockReturnValue({
            props: {},
        });

        const { result } = renderHook(() => useUserProfile());

        expect(result.current.user).toBeUndefined();
        expect(result.current.tasks).toBeUndefined();
        expect(result.current.isAuthenticated).toBe(false);
    });
});