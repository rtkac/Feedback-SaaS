import { createFileRoute } from '@tanstack/react-router';
function RouteComponent() {
  const { workspaceId } = Route.useParams();

  return <div>{workspaceId} main</div>;
}

export const Route = createFileRoute('/_protected/_admin-layout/workspace/$workspaceId/')({
  component: RouteComponent,
});
