import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/_admin-layout/(dashboard)/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/(dashboard)/test"!</div>;
}
