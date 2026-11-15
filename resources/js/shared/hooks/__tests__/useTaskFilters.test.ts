import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTaskFilters } from '../useTaskFilters';

vi.mock('@inertiajs/react', () => ({
    router: {
        get: vi.fn(),
    },
}));

describe('useTaskFilters Hook', () => {
    it('returns fields configuration mapped from projects and status options', () => {
        const projects = [
            { id: 1, name: 'Projekt Alpha' },
            { id: 2, name: 'Projekt Beta' },
        ];

        const { result } = renderHook(() => useTaskFilters({}, projects));

        expect(result.current.fields).toHaveLength(2);

        expect(result.current.fields[0].name).toBe('status');
        expect(result.current.fields[0].options).toEqual([
            { value: 'do_zrobienia', label: 'Do zrobienia' },
            { value: 'w_trakcie', label: 'W trakcie' },
            { value: 'zakonczone', label: 'Ukończone' },
        ]);

        expect(result.current.fields[1].name).toBe('project_id');
        expect(result.current.fields[1].options).toEqual([
            { value: 1, label: 'Projekt Alpha' },
            { value: 2, label: 'Projekt Beta' },
        ]);
    });
});