import { getSession } from '@feedback-saas/auth/server';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { fetchUserWorkspacesOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        href: `${import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL}/sign-in`,
      });
    }

    const workspaces = await context.queryClient.ensureQueryData(fetchUserWorkspacesOptions());

    return { user: session.user, workspaces };
  },
  component: () => <Outlet />,
  pendingComponent: () => <div>Loading protected...</div>,
});
