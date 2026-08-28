import { signOut } from '@feedback-saas/auth/client';
import { Button } from '@feedback-saas/ui/components';
import { createFileRoute, Link } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/_protected/$workspace/_adminLayout/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspace } = Route.useParams();
  const navigate = Route.useNavigate();

  const { user, workspaces } = Route.useRouteContext();

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
      <label htmlFor="workspace-select">Your workspace: {workspace}</label>
      <select id="workspace-select">
        {workspaces.map(({ workspace }) => (
          <option value={workspace.name} key={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      to <Link to="/">Workspaces</Link>
      <br />
      <br />
      to <Link to="..">{workspace} Workspace</Link>
    </>
  );
}
