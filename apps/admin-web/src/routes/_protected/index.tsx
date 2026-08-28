import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Choose the workspace:</h1>
      to{' '}
      <Link to="/$workspace" params={{ workspace: 'default' }}>
        Default Workspace
      </Link>
    </div>
  );
}
