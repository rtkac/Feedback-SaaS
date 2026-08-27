import { signOut } from '@feedback-saas/auth/client';
import { Button } from '@feedback-saas/ui/components';
import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const { user, workspaces } = Route.useRouteContext();

  console.log(user, workspaces);

  const handleOnSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL });
        },
      },
    });
  };

  return (
    <>
      <>
        Welcome, {user.name}!<br />
      </>
      <Button onClick={handleOnSignOut}>{m.signOut()}</Button>
      <br />
      <br />
      <label htmlFor="workspace-select">Your workspaces</label>
      <select id="workspace-select">
        {workspaces.map(({ workspace }) => (
          <option value={workspace.name} key={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </select>
    </>
  );
}
