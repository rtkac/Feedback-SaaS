import { signOut } from '@feedback-saas/auth/auth-client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';
import { fetchUserWorkspacesOptions } from '@/queries/workspace';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(fetchUserWorkspacesOptions());
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const { user } = Route.useRouteContext();

  const { data } = useSuspenseQuery(fetchUserWorkspacesOptions());

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
      <br />
      <br />
      <label htmlFor="workspace-select">Your workspaces</label>
      <select id="workspace-select">
        {data.map(({ workspace }) => (
          <option value={workspace.name} key={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </select>
    </div>
  );
}
