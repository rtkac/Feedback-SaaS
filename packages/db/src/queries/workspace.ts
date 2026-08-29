import { and, eq } from 'drizzle-orm';

import { db } from '../index';
import { workspace, workspaceMember } from '../schema/workspace-schema';

export async function createDefaultWorkspace(userId: string, userName: string) {
  const slug = userName.toLowerCase().replace(/\s+/g, '-') + '-workspace';
  const [newWorkspace] = await db
    .insert(workspace)
    .values({ name: `${userName}'s Workspace`, slug })
    .returning();
  if (!newWorkspace) throw new Error('Failed to create default workspace');
  const [member] = await db
    .insert(workspaceMember)
    .values({ workspaceId: newWorkspace.id, userId, role: 'owner' })
    .returning();
  if (!member) throw new Error('Failed to create default workspace member');
  return [{ workspace: newWorkspace, workspace_member: member }];
}

export function getUserWorkspaces(userId: string) {
  return db
    .select()
    .from(workspaceMember)
    .innerJoin(workspace, eq(workspaceMember.workspaceId, workspace.id))
    .where(eq(workspaceMember.userId, userId));
}

export async function getUserWorkspaceById(userId: string, id: string) {
  const [result] = await db
    .select({
      workspace,
    })
    .from(workspace)
    .innerJoin(workspaceMember, eq(workspaceMember.workspaceId, workspace.id))
    .where(and(eq(workspace.id, id), eq(workspaceMember.userId, userId)))
    .limit(1);

  if (!result) {
    throw new Error('Workspace not found');
  }

  return result.workspace;
}
