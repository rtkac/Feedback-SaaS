import { ensureSession } from '@feedback-saas/auth/functions/auth.functions';
import { createDefaultWorkspace, getUserWorkspaces } from '@feedback-saas/db/queries/workspace';
import { createServerFn } from '@tanstack/react-start';

export const getUserWorkspacesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await ensureSession();
  const workspaces = await getUserWorkspaces(session.user.id);
  if (workspaces.length === 0) {
    const newWorkspace = await createDefaultWorkspace(session.user.id, session.user.name);
    return newWorkspace;
  }
  return workspaces;
});
