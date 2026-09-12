import { createFileRoute } from '@tanstack/react-router';

function RouteComponent() {
  return <div>Hello "/_protected/create-workspace"!</div>;
}

export const Route = createFileRoute('/_protected/create-workspace')({
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
