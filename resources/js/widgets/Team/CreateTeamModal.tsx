import React from 'react';
import { Button } from '@/shared/ui/button';
import { useForm } from '@inertiajs/react';

interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: ReturnType<typeof useForm>;
    onSubmit: (e: React.FormEvent) => void;
}

export function CreateTeamModal({ isOpen, onClose, form, onSubmit }: CreateTeamModalProps) {
    if (!isOpen) return null;

    const { data, setData, processing, errors } = form;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-lg font-bold text-slate-100 mb-4">Dodaj nowego członka zespołu</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Imię i nazwisko
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Jan Kowalski"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                            required
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Adres e-mail
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="jan@easyripok.pl"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                            required
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Hasło
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                            required
                        />
                        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Rola w zespole
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="admin">Administrator</option>
                            <option value="manager">Manager</option>
                            <option value="developer">Developer</option>
                            <option value="viewer">Obserwator</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            onClick={onClose}
                        >
                            Anuluj
                        </Button>
                        <Button variant="primary" size="md" disabled={processing} isLoading={processing}>
                            Zapisz
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}