import { eq } from 'drizzle-orm';

import { db } from '../index';
import { workspace, workspaceMember } from '../schemas/workspace-schema';

export function getUserWorkspaces(userId: string) {
  return db
    .select()
    .from(workspaceMember)
    .innerJoin(workspace, eq(workspaceMember.workspaceId, workspace.id))
    .where(eq(workspaceMember.userId, userId));
}

export function createWorkspace(values: typeof workspace.$inferInsert) {
  return db.insert(workspace).values(values).returning();
}
