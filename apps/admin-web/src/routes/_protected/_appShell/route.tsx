import { signOut } from '@feedback-saas/auth/client';
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@feedback-saas/ui/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  createLink,
  Outlet,
  useParams,
  useRouterState,
} from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { workspaceNavLinks } from '@/components/Sidebar.links';
import { TopNavigation } from '@/components/TopNavigation';
import { m } from '@/paraglide/messages';

const SelectItemLink = createLink(SelectItem);

function RouteComponent() {
  const { workspaceId } = useParams({ strict: false });
  const matches = useRouterState({ select: (s) => s.matches });

  const context = Route.useRouteContext();

  const breadcrumbs = matches.filter((match) => match.staticData.titleText);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [isPending, startTransition] = useTransition();

  const navigate = Route.useNavigate();

  const { data } = useSuspenseQuery({
    ...context.fetchUserWorkspacesOptions,
    select: (data) =>
      data.map(({ workspace }) => ({
        label: workspace.name,
        value: workspace.id,
      })),
  });

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
      >
        <Select
          aria-label={m.selectWorkspace()}
          value={workspaceId || m.selectWorkspace()}
          items={data}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {data.map(({ label, value }) => (
              <SelectItemLink
                key={value}
                value={value}
                to={workspaceId ? '.' : '/w/$workspaceId'}
                params={(prev) => ({ ...prev, workspaceId: value })}
              >
                {label}
              </SelectItemLink>
            ))}
          </SelectPopup>
        </Select>
      </Sidebar>
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
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchUserWorkspacesOptions, staleTime: 'static' });
  },
});
