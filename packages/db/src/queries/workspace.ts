import { and, eq } from 'drizzle-orm';

import { db, DbTransaction } from '../index';
import { workspace, workspaceMember } from '../schema/workspace-schema';
import { slugify } from '../utils/slug';

export async function createDefaultWorkspace(userId: string, userName: string) {
  return db.transaction(async (tx) => {
    const name = `${userName}'s Workspace`;
    const slug = await generateUniqueWorkspaceSlug(tx, name);

    const [newWorkspace] = await tx
      .insert(workspace)
      .values({
        name: `${userName}'s Workspace`,
        slug,
      })
      .returning();

    if (!newWorkspace) {
      throw new Error('Failed to create default workspace');
    }

    const [member] = await tx
      .insert(workspaceMember)
      .values({
        workspaceId: newWorkspace.id,
        userId,
        role: 'owner',
      })
      .returning();

    if (!member) {
      throw new Error('Failed to create default workspace member');
    }

    return {
      workspace: newWorkspace,
      member,
    };
  });
}

export function getUserWorkspaces(userId: string) {
  return db
    .select({
      workspace,
      workspaceMember,
    })
    .from(workspaceMember)
    .innerJoin(workspace, eq(workspaceMember.workspaceId, workspace.id))
    .where(eq(workspaceMember.userId, userId));
}

export async function getUserWorkspaceById(userId: string, workspaceId: string) {
  const [result] = await db
    .select({
      workspace,
    })
    .from(workspace)
    .innerJoin(workspaceMember, eq(workspaceMember.workspaceId, workspace.id))
    .where(and(eq(workspace.id, workspaceId), eq(workspaceMember.userId, userId)))
    .limit(1);

  if (!result) {
    throw new Error('Workspace not found');
  }

  return result.workspace;
}

export async function updateWorkspaceName(workspaceId: string, name: string) {
  const [updatedWorkspace] = await db
    .update(workspace)
    .set({
      name,
      updatedAt: new Date(),
    })
    .where(eq(workspace.id, workspaceId))
    .returning();

  if (!updatedWorkspace) {
    throw new Error('Workspace not found');
  }

  return updatedWorkspace;
}

async function workspaceSlugExists(tx: DbTransaction, slug: string): Promise<boolean> {
  const [existingWorkspace] = await tx
    .select({ id: workspace.id })
    .from(workspace)
    .where(eq(workspace.slug, slug))
    .limit(1);

  return !!existingWorkspace;
}

async function generateUniqueWorkspaceSlug(tx: DbTransaction, name: string): Promise<string> {
  const baseSlug = slugify(name) || 'workspace';

  let slug = baseSlug;
  let suffix = 2;

  while (await workspaceSlugExists(tx, slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  return slug;
}
