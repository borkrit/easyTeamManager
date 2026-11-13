
import { Head } from '@inertiajs/react';
import { LoginHeader } from './ui/LoginHeader';
import { LoginForm } from './ui/LoginForm';
import { LoginProps } from './types/types';



export default function LoginIndex({ status }: LoginProps) {
  
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
       
      />

      <div className="mt-6 text-center text-xs text-slate-500">
        EasyTeamManager &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}