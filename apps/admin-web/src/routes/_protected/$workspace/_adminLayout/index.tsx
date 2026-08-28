import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/$workspace/_adminLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspace } = Route.useParams();
  return (
    <>
      <h1>Selected Workspace: {workspace}</h1>
      <br />
      to <Link to="..">Workspaces</Link>
      <br />
      to{' '}
      <Link to="/$workspace/profile" params={{ workspace }}>
        Profile
      </Link>
    </>
  );
}
