import { useForm } from "@inertiajs/react";

export interface TeamTableProps {
    users: App.Data.UserData[];
    selectedUserIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
}

export interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: ReturnType<typeof useForm>;
    onSubmit: (e: React.FormEvent) => void;
    team?: App.Data.UserData | null;
}
export interface TeamFormValues {
    name: string;
    email: string;
    password: string;
    role: string;
    [key: string]: any; 
}