import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProjectsIndex } from '../hooks/useProjectsIndex';
import { UiProject } from '@/widgets/index';

describe('useProjectsIndex Hook', () => {
    const mockProjects: UiProject[] = [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
    ] as UiProject[];

    it('initializes with closed modal and empty selection', () => {
        const { result } = renderHook(() => useProjectsIndex(mockProjects));

        expect(result.current.isModalOpen).toBe(false);
        expect(result.current.editingProject).toBeUndefined();
        expect(result.current.selectedIds).toEqual([]);
    });

    it('opens create modal correctly', () => {
        const { result } = renderHook(() => useProjectsIndex(mockProjects));

        act(() => {
            result.current.handleOpenCreateModal();
        });

        expect(result.current.isModalOpen).toBe(true);
        expect(result.current.editingProject).toBeUndefined();
    });

    it('opens edit modal with specific project data', () => {
        const { result } = renderHook(() => useProjectsIndex(mockProjects));
        const targetProject = mockProjects[0];

        act(() => {
            result.current.handleOpenEditModal(targetProject);
        });

        expect(result.current.isModalOpen).toBe(true);
        expect(result.current.editingProject).toEqual(targetProject);
    });

    it('closes modal and clears editing project', () => {
        const { result } = renderHook(() => useProjectsIndex(mockProjects));

        act(() => {
            result.current.handleOpenCreateModal();
        });
        expect(result.current.isModalOpen).toBe(true);

        act(() => {
            result.current.handleCloseModal();
        });
        expect(result.current.isModalOpen).toBe(false);
        expect(result.current.editingProject).toBeUndefined();
    });

    it('handles selection correctly', () => {
        const { result } = renderHook(() => useProjectsIndex(mockProjects));

        act(() => {
            result.current.toggleSelectOne(1);
        });

        expect(result.current.selectedIds).toContain(1);
    });
});