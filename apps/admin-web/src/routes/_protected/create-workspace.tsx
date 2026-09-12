import { createFileRoute } from '@tanstack/react-router';

import { AdminLayout } from '@/components/app/admin-layout';
import { Main } from '@/components/app/main';

function RouteComponent() {
  return (
    <AdminLayout>
      <Main>create workspace</Main>
    </AdminLayout>
  );
}

export const Route = createFileRoute('/_protected/create-workspace')({
  staticData: {
    titleText: 'Create workspace',
  },
  component: RouteComponent,
  head: ({ match }) => ({
    meta: [
      {
        title: match.staticData.titleText,
      },
    ],
  }),
});
