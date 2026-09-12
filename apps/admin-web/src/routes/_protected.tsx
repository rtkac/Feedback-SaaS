import { Skeleton } from '@feedback-saas/ui/components';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AdminLayout } from '@/components/app/admin-layout';
import { Main } from '@/components/app/main';
import { fetchSessionOptions } from '@/effects/session';
import { fetchUserWorkspacesOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected')({
  context: () => ({
    fetchUserWorkspacesOptions: fetchUserWorkspacesOptions(),
  }),
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.query(fetchSessionOptions());
    if (!session) {
      throw redirect({
        href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL,
      });
    }
  },
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchUserWorkspacesOptions, staleTime: 'static' });
  },
  component: () => <Outlet />,
  pendingComponent: () => (
    <AdminLayout>
      <div className="pr-2 md:pr-0 pl-2 py-2 flex flex-col md:h-svh gap-2">
        <div className="rounded-lg h-9">
          <Skeleton className="flex w-full h-full" />
        </div>
        <div className="rounded-lg h-9">
          <Skeleton className="flex w-full h-full" />
        </div>
        <div className="rounded-lg h-9">
          <Skeleton className="flex w-full h-full" />
        </div>
        <div className="rounded-lg h-9">
          <Skeleton className="flex w-full h-full" />
        </div>
        <div className="rounded-lg h-9">
          <Skeleton className="flex w-full h-full" />
        </div>
        <aside className="w-75 size-full flex-1">
          <div className="size-full justify-end flex flex-col">
            <div className="rounded-lg h-9">
              <Skeleton className="flex w-full h-full" />
            </div>
          </div>
        </aside>
      </div>
      <Main>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-1/3 gap-4">
            <div className="rounded-lg h-9">
              <Skeleton className="flex w-full h-full" />
            </div>
            <div className="rounded-lg h-15">
              <Skeleton className="flex w-full h-full" />
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <div className="rounded-lg h-21">
              <Skeleton className="flex w-full h-full" />
            </div>
            <div className="rounded-lg h-16">
              <Skeleton className="flex w-full h-full" />
            </div>
          </div>
        </div>
      </Main>
    </AdminLayout>
  ),
});
