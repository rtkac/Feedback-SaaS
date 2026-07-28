import { ensureSession } from '@feedback-saas/auth/functions/auth.functions';
import { getUserWorkspaces } from '@feedback-saas/db/queries/workspace';
import { createServerFn } from '@tanstack/react-start';

export const getUserWorkspacesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await ensureSession();
  return getUserWorkspaces(session.user.id);
});
