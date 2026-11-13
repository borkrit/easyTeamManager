import { useState, useEffect } from 'react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { CreateTaskModalProps, TaskFormValues } from '../types/types';

export function useCreateTaskModal({
    isOpen,
    onClose,
    projectId,
    users = [],
    projects = [],
    task = null,
}: CreateTaskModalProps) {
    const isEditing = !!task;
    const { mutate, isLoading: processing } = useApiMutation();

    const [data, setData] = useState<TaskFormValues>({
        project_id: task?.project_id || projectId || (projects[0]?.id ?? ''),
        title: task?.title || '',
        description: task?.description || '',
        user_id: task?.user_id || '',
        status: task?.status || 'do_zrobienia',
        priority: (task?.priority as App.Enums.TaskPriority) || 'sredni',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            if (task) {
                setData({
                    project_id: task.project_id || '',
                    title: task.title,
                    description: task.description || '',
                    user_id: task.user_id || '',
                    status: task.status,
                    priority: (task.priority as App.Enums.TaskPriority) || 'sredni',
                });
            } else {
                setData({
                    project_id: projectId || (projects[0]?.id ?? ''),
                    title: '',
                    description: '',
                    user_id: '',
                    status: 'do_zrobienia',
                    priority: 'sredni',
                });
            }
            setErrors({});
        }
    }, [isOpen, task, projectId]);

    const currentProject = projects.find((p) => p.id === Number(data.project_id));
    const availableUsers = projects.length > 0 ? currentProject?.users || [] : users;
    const hasNoUsers = availableUsers.length === 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? 'put' : 'post';
        const url = isEditing && task ? `/tasks/${task.id}` : '/tasks';

        mutate(method, url, data, {
            onSuccess: () => {
                onClose();
            },
            onError: (errs) => {
                setErrors(errs);
            },
        });
    };

    return {
        isEditing,
        data,
        setData: (field: keyof TaskFormValues, value: any) =>
            setData((prev) => ({ ...prev, [field]: value })),
        processing,
        errors,
        availableUsers,
        hasNoUsers,
        handleSubmit,
    };
}