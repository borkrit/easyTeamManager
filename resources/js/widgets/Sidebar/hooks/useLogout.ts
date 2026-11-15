import { useApiMutation } from "@/shared/hooks/useApiMutation";

export const useLogout = () => {
    const { mutate, isLoading } = useApiMutation();

    const logout = () => {
        mutate('post', '/logout', {}, {
            
            onError: (errs) => {
                console.error(errs);
            },
        });
    };

    return {
        logout,
        isLoading,
    };
};