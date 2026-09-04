import { signOut } from '@feedback-saas/auth/client';
import { createFileRoute, Outlet, useParams, useRouterState } from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { workspaceNavLinks } from '@/components/Sidebar.links';
import { TopNavigation } from '@/components/TopNavigation';

function RouteComponent() {
  const { workspaceId } = useParams({ strict: false });
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches.filter((match) => match.staticData.titleText);

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
        links={workspaceId ? workspaceNavLinks(workspaceId) : []}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSignOut={handleOnSignOut}
        isPending={isPending}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopNavigation toggleSidebar={toggleSidebar} breadcrumbs={breadcrumbs} />
        <div className="flex-1 flex-col flex justify-between overflow-y-auto lg:p-8 dark:bg-dark-bg bg-slate-50/50 pt-4 pr-4 pb-4 pl-4">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export const Route = createFileRoute('/_protected/_appShell')({
  component: RouteComponent,
});
