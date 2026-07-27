import { getSession } from '@feedback-saas/auth/functions/auth.functions';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw redirect({
        href: import.meta.env.VITE_FEEDBACK_SAAS_ADMIN_WEB_URL,
      });
    }
  },
  component: () => <Outlet />,
});
