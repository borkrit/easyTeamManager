import { Head } from '@inertiajs/react';
import { BackButton } from '@/shared/ui/backButton';
import { TeamProfileHeader } from './ui/TeamProfileHeader';
import { TeamTasksList } from './ui/TeamTasksList';
import { TeamProjectsList } from './ui/TeamProjectsList';

interface MemberDetail {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  tasks: App.Data.TaskData[];
  projects: any[];
}

interface TeamShowProps {
  member: MemberDetail;
}

export default function TeamShow({ member }: TeamShowProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <Head title={`Profil: ${member.name}`} />

      <BackButton href={'/team'}> Wróć do listy zespołu </BackButton>

      <TeamProfileHeader 
        name={member.name} 
        email={member.email} 
        role={member.role} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TeamTasksList tasks={member.tasks} />
        <TeamProjectsList projects={member.projects} />
      </div>
    </div>
  );
}