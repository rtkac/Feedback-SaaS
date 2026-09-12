import {
  Button,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@feedback-saas/ui/components';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, createLink, Outlet, useMatch, useParams } from '@tanstack/react-router';

import { AdminLayout } from '@/components/app/admin-layout';
import { Main } from '@/components/app/main';
import { MobileNavigation } from '@/components/app/mobile-navigation';
import { Sidebar } from '@/components/app/sidebar';
import { navMainItems, accountNavMainItems } from '@/lib/navigation-data';
import { m } from '@/paraglide/messages';

const SelectItemLink = createLink(SelectItem);
const ButtonLink = createLink(Button);

function RouteComponent() {
  const context = Route.useRouteContext();

  const workspaceId = useParams({ strict: false, select: (params) => params.workspaceId });

  const isAccountRoute = useMatch({
    from: '/_protected/_admin-layout/account/',
    shouldThrow: false,
  });

  const { data } = useSuspenseQuery({
    ...context.fetchUserWorkspacesOptions,
    select: (data) =>
      data.map(({ workspace }) => ({
        label: workspace.name,
        value: workspace.id,
      })),
  });

  return (
    <AdminLayout>
      <div className="pr-2 md:pr-0 pl-2 py-2 flex flex-col md:h-svh gap-2">
        <div className="flex gap-2">
          <Select
            aria-label={m.selectWorkspace()}
            value={workspaceId ?? m.selectWorkspace()}
            items={data}
          >
            <SelectTrigger size="lg">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {data?.map(({ label, value }) => (
                <SelectItemLink
                  key={value}
                  value={value}
                  to="/workspace/$workspaceId"
                  params={(prev) => ({ ...prev, workspaceId: value })}
                >
                  {label}
                </SelectItemLink>
              ))}
              <SelectItemLink to="/create-workspace">
                <span className="flex items-center gap-2">
                  <IconPlus />
                  {m.createWorkspace()}
                </span>
              </SelectItemLink>
            </SelectPopup>
          </Select>
          {workspaceId && (
            <ButtonLink size="lg" to="/" variant="ghost">
              <IconX />
            </ButtonLink>
          )}
        </div>
        <Sidebar
          navMainItems={workspaceId ? navMainItems : isAccountRoute ? accountNavMainItems : []}
        />
      </div>
      <MobileNavigation
        navMainItems={workspaceId ? navMainItems : isAccountRoute ? accountNavMainItems : []}
      />
      <Main>
        <Outlet />
      </Main>
    </AdminLayout>
  );
}

export const Route = createFileRoute('/_protected/_admin-layout')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchUserWorkspacesOptions, staleTime: 'static' });
  },
});
