import { getSession } from '@feedback-saas/auth/server';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        href: `${import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL}/sign-in`,
      });
    }
    return { user: session.user };
  },
  component: () => <Outlet />,
  pendingComponent: () => <div>Loading protected...</div>,
});
