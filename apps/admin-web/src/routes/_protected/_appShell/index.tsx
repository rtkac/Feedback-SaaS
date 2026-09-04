import { Card, CardFrame, CardFrameFooter, CardPanel } from '@feedback-saas/ui/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, createLink } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

const CardLink = createLink(Card);

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchUserWorkspacesOptions);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-left">Choose the workspace</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map(({ workspace, workspace_member }) => (
          <CardFrame key={workspace.id}>
            <CardLink
              to="/$workspaceId"
              params={{ workspaceId: workspace.id }}
              className="cursor-pointer"
            >
              <CardPanel>{workspace.name}</CardPanel>
            </CardLink>
            <CardFrameFooter>
              <p className="text-muted-foreground text-xs">Role: {workspace_member.role}</p>
            </CardFrameFooter>
          </CardFrame>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_protected/_appShell/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: m.titleIndex(),
      },
    ],
  }),
});
