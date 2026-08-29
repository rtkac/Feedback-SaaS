import { getSession } from '@feedback-saas/auth/server';
import { Spinner } from '@feedback-saas/ui/components';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { fetchUserWorkspacesOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL,
      });
    }
    return { user: session.user };
  },
  context: () => ({
    fetchUserWorkspacesOptions: fetchUserWorkspacesOptions(),
  }),
  loader: ({ context }) => {
    context.queryClient.query(context.fetchUserWorkspacesOptions);
  },
  component: () => <Outlet />,
  pendingComponent: () => (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
      <h1 className="ml-4 text-lg font-semibold">Loading your workspaces...</h1>
    </div>
  ),
});
