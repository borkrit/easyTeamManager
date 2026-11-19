import { useState } from 'react';

import { useFormModal } from '@/shared/hooks/useFormModal';


interface TeamFormValues {
    name: string;
    email: string;
    password: string;
    role: string;
}
const defaultState:TeamFormValues = {
        name: '',
        email: '',
        password: '',
        role: 'developer',
    }

export function useTeamForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleClose = ()=>{
        setIsModalOpen(false)
    }


    const {
        data,
        setData,
        errors,
        reset,
        clearErrors,
        isLoading,
        handleSubmit,
    } = useFormModal<TeamFormValues>({isOpen:isModalOpen,
        onClose:handleClose,
    initialData: null,
 defaultValues:defaultState,
 submitUrl: '/team',
        isEditing: false,})



    return {
        isModalOpen,
        setIsModalOpen,
        form: {
            data,
            setData,
            errors,
            reset,
            clearErrors,
            processing: isLoading,
        },
        handleSubmit,
    };
}