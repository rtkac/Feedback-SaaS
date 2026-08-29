import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchUserWorkspacesOptions);

  return (
    <div>
      <h1>Choose the workspace:</h1>
      <ul>
        {data.map(({ workspace }) => (
          <li key={workspace.id}>
            <Link to="/$workspace" params={{ workspace: workspace.id }}>
              {workspace.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
});
