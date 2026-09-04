import { getSession } from '@feedback-saas/auth/server';
import { Skeleton, Spinner } from '@feedback-saas/ui/components';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { fetchUserWorkspacesOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL,
      });
    }
    return { user: session.user };
  },
  context: () => ({
    fetchUserWorkspacesOptions: fetchUserWorkspacesOptions(),
  }),
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspacesOptions);
  },
  component: () => <Outlet />,
  pendingComponent: () => (
    <div className="flex h-screen overflow-hidden">
      <aside className="sidebar-transition fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white lg:static lg:translate-x-0 dark:border-dark-border dark:bg-dark-card flex flex-col justify-between -translate-x-full">
        <div>
          <div className="flex h-16 items-center px-3 py-4 border-b border-slate-100 dark:border-dark-border">
            <Skeleton className="flex w-full h-full" />
          </div>
          <nav className="space-y-2 px-3 py-6">
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
            <div className="rounded-lg">
              <Skeleton className="flex w-full h-10" />
            </div>
          </nav>
        </div>
        <div className="border-t border-slate-100 p-3 dark:border-dark-border">
          <Skeleton className="flex w-full h-6" />
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 glass-effect lg:px-8 dark:border-dark-border dark:bg-dark-bg/80">
          <div className="flex w-full h-full py-4">
            <Skeleton className="flex w-full h-full" />
          </div>
        </header>
        <div>
          <div className="my-4 mx-8 grid grid-cols-3 gap-4">
            <Skeleton className="flex   h-10" />
          </div>
          <div className="my-4 mx-8 grid grid-cols-3 gap-4">
            <Skeleton className="flex   h-50" />
            <Skeleton className="flex   h-50" />
            <Skeleton className="flex  h-50" />
          </div>
        </div>
      </main>
    </div>
  ),
});
