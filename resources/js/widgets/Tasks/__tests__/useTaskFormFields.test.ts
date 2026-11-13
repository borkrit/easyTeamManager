import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTaskFormFields } from '../hooks/useTaskFormFields';

describe('useTaskFormFields', () => {
    it('adds project_id field when projectId is missing and projects exist', () => {
        const { result } = renderHook(() =>
            useTaskFormFields({
                projectId: undefined,
                projects: [{ id: 1, name: 'Projekt Alpha' }],
                availableUsers: [{ id: 10, name: 'Jan Kowalski' }],
                hasNoUsers: false,
            })
        );

        const projectField = result.current.find((f) => f.name === 'project_id');
        expect(projectField).toBeDefined();
        expect(projectField?.options).toHaveLength(2); // 'Wybierz projekt' + 1 project
    });

    it('omits project_id field when projectId is provided', () => {
        const { result } = renderHook(() =>
            useTaskFormFields({
                projectId: 5,
                projects: [{ id: 1, name: 'Projekt Alpha' }],
                availableUsers: [{ id: 10, name: 'Jan Kowalski' }],
                hasNoUsers: false,
            })
        );

        const projectField = result.current.find((f) => f.name === 'project_id');
        expect(projectField).toBeUndefined();
    });

    it('disables user_id field and shows hint when hasNoUsers is true', () => {
        const { result } = renderHook(() =>
            useTaskFormFields({
                projectId: 1,
                projects: [],
                availableUsers: [],
                hasNoUsers: true,
            })
        );

        const userField = result.current.find((f) => f.name === 'user_id');
        expect(userField?.disabled).toBe(true);
        expect(userField?.hint).toBe('Ten projekt nie ma przypisanych użytkowników.');
    });
});