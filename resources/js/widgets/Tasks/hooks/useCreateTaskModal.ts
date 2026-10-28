import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { UiTask } from '@/widgets/Tasks/TaskTable';

export interface User {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    name: string;
    users?: User[];
}

export interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId?: number;
    users: User[];
    projects?: Project[];
    task?: UiTask | null;
}

interface TaskFormValues {
    project_id: number | '';
    title: string;
    description: string;
    user_id: number | '';
    status: string;
    priority: 'niski' | 'sredni' | 'wysoki';
}

export function useCreateTaskModal({
    isOpen,
    onClose,
    projectId,
    users = [],
    projects = [],
    task = null,
}: CreateTaskModalProps) {
    const isEditing = !!task;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<TaskFormValues>({
        project_id: task?.project_id || projectId || (projects[0]?.id ?? ''),
        title: task?.title || '',
        description: task?.description || '',
        user_id: task?.user_id || '',
        status: task?.status || 'do_zrobienia',
        priority: (task?.priority as 'niski' | 'sredni' | 'wysoki') || 'sredni',
    });

    useEffect(() => {
        if (isOpen) {
            if (task) {
                setData({
                    project_id: task.project_id || '',
                    title: task.title,
                    description: task.description || '',
                    user_id: task.user_id || '',
                    status: task.status,
                    priority: (task.priority as 'niski' | 'sredni' | 'wysoki') || 'sredni',
                });
            } else {
                setData('project_id', projectId || (projects[0]?.id ?? ''));
                reset('title', 'description', 'user_id', 'status', 'priority');
            }
            clearErrors();
        }
    }, [isOpen, task, projectId]);

    const currentProject = projects.find((p) => p.id === Number(data.project_id));
    const availableUsers = projects.length > 0 ? currentProject?.users || [] : users;
    const hasNoUsers = availableUsers.length === 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && task) {
            put(`/tasks/${task.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/tasks', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return {
        isEditing,
        data,
        setData,
        errors,
        availableUsers,
        hasNoUsers,
        handleSubmit,
    };
}