import { createFileRoute } from '@tanstack/react-router';

function RouteComponent() {
  return <div>Hello "/_protected/_appShell/create-workspace"!</div>;
}

export const Route = createFileRoute('/_protected/_appShell/create-workspace')({
  staticData: {
    titleText: 'Create workspace',
  },
  component: RouteComponent,
  head: ({ match }) => ({
    meta: [
      {
        title: match.staticData.titleText,
      },
    ],
  }),
});
