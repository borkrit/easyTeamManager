import { usePage } from '@inertiajs/react';
import { ProfilePageProps } from '../types/types';


export const useUserProfile = () => {
    const { props } = usePage<ProfilePageProps>();
    
    const user = props.auth?.user;
    const tasks = props.tasks;

    return {
        user,
        tasks,
        isAuthenticated: Boolean(user),
    };
};