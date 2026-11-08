
import { Head} from '@inertiajs/react';
import { CreateTeamModal, PageHeader, TeamTable, useTeamForm } from '@/widgets';

// type TeamMember = App.Data.UserData;

interface TeamIndexProps {
  members: App.Data.UserData[];
}

export default function TeamIndex({ members }: TeamIndexProps) {
  const { isModalOpen, setIsModalOpen, form, handleSubmit } = useTeamForm();

  return (
    <>
      <Head title="Zespół" />

      <PageHeader
        title="Lista członków zespołu"
        actionLabel="+ Dodaj osobę"
        onActionClick={() => setIsModalOpen(true)} description={''}      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <TeamTable users={members} />
        </div>
      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onSubmit={handleSubmit}
      />
    </>
  );
}
