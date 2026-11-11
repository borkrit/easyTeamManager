import React from 'react';
import { Button } from '@/shared/ui/button';

interface ModalFormWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (e: React.FormEvent) => void;
    isEditing?: boolean;
    processing?: boolean;
    children: React.ReactNode;
}

export const ModalFormWrapper = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isEditing = false,
    processing = false,
    children,
}: ModalFormWrapperProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 text-xl font-bold cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

               
                <form onSubmit={onSubmit} className="space-y-4">
                    
                    {children}

                   
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                        <Button
                            type="button"
                            variant="secondary"
                            size="md"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Anuluj
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={processing}
                            isLoading={processing}
                        >
                            {isEditing ? 'Zapisz zmiany' : 'Utwórz'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};