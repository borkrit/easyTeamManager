import React from 'react';
import { useForm } from '@inertiajs/react'; 
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { InputError } from '@/shared/ui/inputError';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { LoginFormData } from '../types/types';


export const LoginForm = () => {
    const { data, setData, errors } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const { mutate, isLoading } = useApiMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        mutate('post', '/login', data, {
            onError: (errs) => {
                console.error(errs);
            },
        });
    };

    return (
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label required>Adres e-mail</Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="jan.kowalski@easyteammanager.pl"
                        autoComplete="username"
                        hasError={Boolean(errors.email)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <Label required>Hasło</Label>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        hasError={Boolean(errors.password)}
                        required
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/20"
                        />
                        <span className="text-xs text-slate-400 font-medium">Zapamiętaj mnie</span>
                    </label>
                </div>

                <div className="pt-2">
                    <Button
                        variant="primary"
                        size="md"
                        className="w-full justify-center py-2.5"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Zaloguj się
                    </Button>
                </div>
            </form>
        </div>
    );
};