import { signOut } from '@feedback-saas/auth/client';
import { Skeleton } from '@feedback-saas/ui/components';
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { TopNavigation } from '@/components/TopNavigation';
import { fetchUserWorkspaceByIdOptions } from '@/effects/workspace';

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [isPending, startTransition] = useTransition();

  const navigate = Route.useNavigate();

  const handleOnSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL });
          },
        },
      });
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSignOut={handleOnSignOut}
        isPending={isPending}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopNavigation toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto lg:p-8 dark:bg-dark-bg bg-slate-50/50 pt-4 pr-4 pb-4 pl-4">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export const Route = createFileRoute('/_protected/$workspace/_adminLayout')({
  component: RouteComponent,
  context: ({ params }) => ({
    fetchUserWorkspaceByIdOptions: fetchUserWorkspaceByIdOptions(params.workspace),
  }),
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspaceByIdOptions);
  },
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
        <div className="my-4 mx-8 grid grid-cols-2 gap-4">
          <Skeleton className="flex w-full h-50" />
          <Skeleton className="flex w-full h-50" />
          <Skeleton className="flex w-full h-50" />
        </div>
      </main>
    </div>
  ),
});
