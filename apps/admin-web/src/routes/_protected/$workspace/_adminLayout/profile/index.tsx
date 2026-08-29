import { createFileRoute, Link } from '@tanstack/react-router';

function RouteComponent() {
  const { workspace } = Route.useParams();
  const { user } = Route.useRouteContext();

  return (
    <>
      <>
        Welcome, {user.name}!<br />
      </>
      <br />
      <br />
      <label htmlFor="workspace-select">Your workspace: {workspace}</label>
      <br />
      <br />
      to <Link to="/">Workspaces</Link>
      <br />
      <br />
      to <Link to="..">{workspace}</Link>
    </>
  );
}

export const Route = createFileRoute('/_protected/$workspace/_adminLayout/profile/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspacesOptions);
  },
});
