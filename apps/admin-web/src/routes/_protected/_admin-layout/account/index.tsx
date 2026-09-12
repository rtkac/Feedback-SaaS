import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/_admin-layout/account/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/accout/"!</div>;
}
