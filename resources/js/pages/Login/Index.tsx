import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';

interface LoginProps {
  status?: string;
}

export default function LoginIndex({ status }: LoginProps) {
 
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <Head title="Logowanie - EasyTask" />

      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-2xl font-bold mb-3">
          ⚡
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">EasyTask</h1>
        <p className="text-sm text-slate-400 mt-1">Zaloguj się do systemu zarządzania zadaniami</p>
      </div>

      {status && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs font-medium text-emerald-400 w-full max-w-md">
          {status}
        </div>
      )}

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Adres e-mail
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder="jan.kowalski@easyripok.pl"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              autoComplete="username"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Hasło
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              autoComplete="current-password"
              required
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.password}</p>
            )}
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
              disabled={processing}
              isLoading={processing}
            >
              Zaloguj się
            </Button>
          </div>
        </form>
      </div>

      
      <div className="mt-6 text-center text-xs text-slate-500">
        EasyRIPOK System &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}