import { Head } from '@inertiajs/react';
import { CreateTeamModal, PageHeader, TeamTable } from '@/widgets';
import { useTeamIndex } from './hooks/useTeamIndex';

interface TeamIndexProps {
  members: App.Data.UserData[];
}

export default function TeamIndex({ members }: TeamIndexProps) {
  const {
    isModalOpen,
    form,
    handleSubmit,
    handleOpenModal,
    handleCloseModal,
  } = useTeamIndex();

  return (
    <>
      <Head title="Zespół" />

      <PageHeader
        title="Lista członków zespołu"
        description=""
        actionLabel="+ Dodaj osobę"
        onActionClick={handleOpenModal}
      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <TeamTable users={members} />
        </div>
      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        form={form}
        onSubmit={handleSubmit}
      />
    </>
  );
}