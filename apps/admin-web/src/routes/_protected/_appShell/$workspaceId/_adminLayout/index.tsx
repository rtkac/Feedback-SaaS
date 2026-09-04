import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchUserWorkspaceByIdOptions);

  return (
    <div>
      <h1>Selected Workspace: {data.name}</h1>
      <br />
      to <Link to="..">Workspaces</Link>
      <br />
      to{' '}
      <Link to="/$workspaceId/profile" params={{ workspaceId: data.id }}>
        Profile
      </Link>
    </div>
  );
}

export const Route = createFileRoute('/_protected/_appShell/$workspaceId/_adminLayout/')({
  component: RouteComponent,
  staticData: {
    titleText: 'Overview',
  },
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspaceByIdOptions);
  },
});
