import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTeamFormFields } from '../hooks/useTeamFormFields';

describe('useTeamFormFields', () => {
    it('returns correct form fields configuration', () => {
        const { result } = renderHook(() => useTeamFormFields());

        expect(result.current).toHaveLength(4);
        expect(result.current[0].name).toBe('name');
        expect(result.current[1].name).toBe('email');
        expect(result.current[2].name).toBe('password');
        expect(result.current[3].name).toBe('role');
        expect(result.current[3].options).toBeDefined();
    });
});