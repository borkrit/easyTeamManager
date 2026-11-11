import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModalFormWrapper } from './ModalFormWrapper';

const meta: Meta<typeof ModalFormWrapper> = {
    title: 'Shared/UI/ModalFormWrapper',
    component: ModalFormWrapper,
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
        },
        isEditing: {
            control: 'boolean',
        },
        processing: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ModalFormWrapper>;

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="p-6 bg-slate-950 min-h-[400px] flex items-center justify-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                >
                    Otwórz modal
                </button>

                <ModalFormWrapper
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert('Formularz wysłany!');
                        setIsOpen(false);
                    }}
                >
                    <div className="space-y-4 text-slate-300">
                        <p className="text-sm">
                            Tutaj znajduje się dowolna zawartość formularza (np. komponenty <code className="text-indigo-400">FormRenderer</code> или кастомные поля ввода).
                        </p>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Przykładowe pole</label>
                            <input
                                type="text"
                                placeholder="Wpisz coś..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </ModalFormWrapper>
            </div>
        );
    },
    args: {
        title: 'Utwórz nowy element',
        isEditing: false,
        processing: false,
    },
};

export const EditingState: Story = {
    ...Default,
    args: {
        title: 'Edytuj element #42',
        isEditing: true,
        processing: false,
    },
};

export const ProcessingState: Story = {
    ...Default,
    args: {
        title: 'Zapisywanie danych...',
        isEditing: false,
        processing: true, 
    },
};