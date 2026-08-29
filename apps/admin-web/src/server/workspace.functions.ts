import { ensureSession } from '@feedback-saas/auth/server';
import { getUserWorkspaces, getUserWorkspaceById } from '@feedback-saas/db/queries/workspace';
import { createServerFn } from '@tanstack/react-start';

export const getUserWorkspacesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await ensureSession();
  const workspaces = await getUserWorkspaces(session.user.id);
  return workspaces;
});

export const getUserWorkspaceByIdFn = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const workspace = await getUserWorkspaceById(session.user.id, data.id);
    return workspace;
  });
