import { generateId } from 'better-auth';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, pgEnum } from 'drizzle-orm/pg-core';

import { user } from './auth';

export const workspaceMemberRoleEnum = pgEnum('workspace_member_role', [
  'owner',
  'admin',
  'member',
]);

export const workspace = pgTable('workspace', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const workspaceMember = pgTable(
  'workspace_member',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => generateId()),
    workspaceId: text('workspace_id')
      .notNull()
      .references(() => workspace.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: workspaceMemberRoleEnum('role').notNull().default('member'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('workspace_member_workspaceId_idx').on(table.workspaceId),
    index('workspace_member_userId_idx').on(table.userId),
  ],
);

export const workspaceRelations = relations(workspace, ({ many }) => ({
  members: many(workspaceMember),
}));

export const workspaceMemberRelations = relations(workspaceMember, ({ one }) => ({
  workspace: one(workspace, {
    fields: [workspaceMember.workspaceId],
    references: [workspace.id],
  }),
  user: one(user, {
    fields: [workspaceMember.userId],
    references: [user.id],
  }),
}));
