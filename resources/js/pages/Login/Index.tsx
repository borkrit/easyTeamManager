// resources/js/pages/Auth/Index.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoginHeader } from './ui/LoginHeader';
import { LoginForm } from './ui/LoginForm';

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

      <LoginHeader />

      {status && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs font-medium text-emerald-400 w-full max-w-md">
          {status}
        </div>
      )}

      <LoginForm 
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
        processing={processing}
        errors={errors}
      />

      <div className="mt-6 text-center text-xs text-slate-500">
        EasyTeamManager &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}