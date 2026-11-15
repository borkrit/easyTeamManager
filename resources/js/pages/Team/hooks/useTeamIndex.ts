import { useTeamForm } from '@/widgets';

export const useTeamIndex = () => {
    const { isModalOpen, setIsModalOpen, form, handleSubmit } = useTeamForm();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return {
        isModalOpen,
        form,
        handleSubmit,
        handleOpenModal,
        handleCloseModal,
    };
};