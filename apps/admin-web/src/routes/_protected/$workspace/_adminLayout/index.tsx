import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchUserWorkspaceByIdOptions);

  return (
    <>
      <h1>Selected Workspace: {data.name}</h1>
      <br />
      to <Link to="..">Workspaces</Link>
      <br />
      to{' '}
      <Link to="/$workspace/profile" params={{ workspace: data.id }}>
        Profile
      </Link>
    </>
  );
}

export const Route = createFileRoute('/_protected/$workspace/_adminLayout/')({
  component: RouteComponent,
});
