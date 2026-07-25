import { signOut } from '@feedback-saas/auth/auth-client';
import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const navigate = Route.useNavigate();

  const handleOnSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ href: `${import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL}/sign-in` });
        },
      },
    });
  };

  return (
    <div>
      Welcome, {user.name}!<br />
      <button onClick={handleOnSignOut}>{m.signOut()}</button>
    </div>
  );
}
