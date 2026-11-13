import { useState, useEffect } from 'react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { CreateTeamModalProps, TeamFormValues } from '../types/types';

export function useCreateTeamModal(props: CreateTeamModalProps) {
    const { isOpen, onClose, team = null } = props;
    const isEditing = !!team;
    const { mutate, isLoading: processing } = useApiMutation();

    const [data, setData] = useState<TeamFormValues>({
        name: team?.name || '',
        email: team?.email || '',
        password: '',
        role: team?.role || 'developer',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            if (team) {
                setData({
                    name: team.name || '',
                    email: team.email || '',
                    password: '',
                    role: team.role || 'developer',
                });
            } else {
                setData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'developer',
                });
            }
            setErrors({});
        }
    }, [isOpen, team]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? 'put' : 'post';
        const url = isEditing && team ? `/team/${team.id}` : '/team';

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
        setData: (field: keyof TeamFormValues, value: any) =>
            setData((prev) => ({ ...prev, [field]: value })),
        processing,
        errors,
        handleSubmit,
    };
}