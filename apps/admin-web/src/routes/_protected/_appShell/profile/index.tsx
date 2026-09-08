import { useSession } from '@feedback-saas/auth/client';
import { createFileRoute, Link } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

function RouteComponent() {
  const { data } = useSession();

  return (
    <div>
      Welcome, {data?.user.name}!<br />
      <br />
      <br />
      to <Link to="/">Workspaces</Link>
    </div>
  );
}

export const Route = createFileRoute('/_protected/_appShell/profile/')({
  component: RouteComponent,
  staticData: {
    titleText: m.titleProfile(),
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
