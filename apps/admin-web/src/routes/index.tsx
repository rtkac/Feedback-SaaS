import { signOut } from '@feedback-saas/auth/auth-client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';
import { fetchUserWorkspacesOptions } from '@/queries/workspace';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchUserWorkspacesOptions());
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const { user } = Route.useRouteContext();

  const { data } = useSuspenseQuery(fetchUserWorkspacesOptions());

  console.log(data);

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
