import { createFileRoute, Link } from '@tanstack/react-router';

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const { user } = Route.useRouteContext();

  return (
    <>
      <>
        Welcome, {user.name}!<br />
      </>
      <br />
      <br />
      <label htmlFor="workspace-select">Your workspace: {workspaceId}</label>
      <br />
      <br />
      to <Link to="/">Workspaces</Link>
      <br />
      <br />
      to <Link to="..">{workspaceId}</Link>
    </>
  );
}

export const Route = createFileRoute('/_protected/_appShell/$workspaceId/_adminLayout/profile/')({
  component: RouteComponent,
  staticData: {
    titleText: 'Profile',
  },
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspacesOptions);
  },
  head: ({ match }) => ({
    meta: [
      {
        title: match.staticData.titleText,
      },
    ],
  }),
});
