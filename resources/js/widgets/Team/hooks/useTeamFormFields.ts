import { FormFieldConfig } from '@/shared/ui/formRenderer'; 

export function useTeamFormFields(): FormFieldConfig[] {
    return [
        {
            name: 'name',
            label: 'Imię i nazwisko',
            type: 'text',
            placeholder: 'Jan Kowalski',
            required: true,
        },
        {
            name: 'email',
            label: 'Adres e-mail',
            type: 'text', 
            placeholder: 'jan@easyripok.pl',
            required: true,
        },
        {
            name: 'password',
            label: 'Hasło',
            type: 'text', 
            placeholder: '••••••••',
            required: true,
        },
        {
            name: 'role',
            label: 'Rola w zespole',
            type: 'select',
            options: [
                { value: 'admin', label: 'Administrator' },
                { value: 'manager', label: 'Manager' },
                { value: 'developer', label: 'Developer' },
                { value: 'viewer', label: 'Obserwator' },
            ],
        },
    ];
}