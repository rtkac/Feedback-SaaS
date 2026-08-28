import { signOut } from '@feedback-saas/auth/client';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { TopNavigation } from '@/components/TopNavigation';

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
});
