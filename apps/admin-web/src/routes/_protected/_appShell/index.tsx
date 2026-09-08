import { useSession } from '@feedback-saas/auth/client';
import {
  Avatar,
  AvatarFallback,
  Frame,
  FrameDescription,
  FramePanel,
  FrameTitle,
} from '@feedback-saas/ui/components';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data: session } = useSession();

  const { data } = useSuspenseQuery(context.fetchUserWorkspacesOptions);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="flex flex-col text-3xl gap-2">
          <span className="flex text-sm text-muted-foreground">
            {m.workspaceTitleTop({ name: session?.user.name.split(' ')[0] || '' })}&nbsp;
          </span>
          <span className="font-bold">{m.workspaceTitle()}</span>
        </h1>
        <p className="text-muted-foreground">{m.workspaceDesc()}</p>
      </div>
      <div className="w-full max-w-lg">
        {data.map(({ workspace, workspace_member }) => (
          <Frame key={workspace.id}>
            <FramePanel>
              <Link to="/w/$workspaceId" params={{ workspaceId: workspace.id }}>
                <div className="flex gap-1 items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-4 items-center">
                      <Avatar className="size-10">
                        <AvatarFallback>
                          {workspace.name.split(' ')[0]?.charAt(0)}
                          {workspace.name.split(' ')[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <FrameTitle>{workspace.name}</FrameTitle>
                        <FrameDescription>
                          {m.workspaceCardRole()}:&nbsp;{workspace_member.role}
                        </FrameDescription>
                      </div>
                    </div>
                  </div>
                  <IconArrowRight className="ms-auto size-4 shrink-0 text-muted-foreground" />
                </div>
              </Link>
            </FramePanel>
          </Frame>
        ))}
        <Frame>
          <FramePanel>
            <Link to="/">
              <div className="flex gap-3 items-center text-muted-foreground">
                <IconPlus />
                <FrameTitle>{m.workspaceCreate()}</FrameTitle>
              </div>
            </Link>
          </FramePanel>
        </Frame>
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
