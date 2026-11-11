import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormRenderer, FormFieldConfig } from './';

const sampleFields: FormFieldConfig[] = [
    {
        name: 'title',
        label: 'Tytuł zadania',
        type: 'text',
        required: true,
        placeholder: 'np. Naprawa krytycznego buga',
    },
    {
        name: 'description',
        label: 'Opis',
        type: 'textarea',
        placeholder: 'Dodaj szczegóły zadania...',
        rows: 3,
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'do_zrobienia', label: 'Do zrobienia' },
            { value: 'w_trakcie', label: 'W trakcie' },
            { value: 'zakonczone', label: 'Zakończone' },
        ],
    },
];

const meta: Meta<typeof FormRenderer> = {
    title: 'Shared/UI/FormRenderer',
    component: FormRenderer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormRenderer>;

export const Default: Story = {
    render: () => {
        const [data, setData] = useState({
            title: '',
            description: '',
            status: 'do_zrobienia',
        });

        const handleChange = (name: string, value: any) => {
            setData((prev) => ({ ...prev, [name]: value }));
        };

        return (
            <div className="max-w-md bg-slate-900 p-6 rounded-xl border border-slate-800 text-slate-100">
                <FormRenderer
                    fields={sampleFields}
                    data={data}
                    errors={{}}
                    onChange={handleChange}
                />
            </div>
        );
    },
};

export const WithErrors: Story = {
    render: () => {
        const [data, setData] = useState({
            title: '',
            description: 'Nieprawidłowy opis',
            status: 'do_zrobienia',
        });

        return (
            <div className="max-w-md bg-slate-900 p-6 rounded-xl border border-slate-800 text-slate-100">
                <FormRenderer
                    fields={sampleFields}
                    data={data}
                    errors={{ title: 'To pole jest wymagane.' }}
                    onChange={(name, val) => setData({ ...data, [name]: val })}
                />
            </div>
        );
    },
};