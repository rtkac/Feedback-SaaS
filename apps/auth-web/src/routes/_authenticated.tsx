import { getSession } from '@feedback-saas/auth/server';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw Route.redirect({
        href: import.meta.env.VITE_FEEDBACK_SAAS_ADMIN_WEB_URL,
      });
    }
  },
  component: () => <Outlet />,
});
