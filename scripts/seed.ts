import { auth } from '@feedback-saas/auth';
import { db } from '@feedback-saas/db';
import { user } from '@feedback-saas/db/schemas/auth-schema';
import { workspace, workspaceMember } from '@feedback-saas/db/schemas/workspace-schema';
import { eq } from 'drizzle-orm';

const TEST_EMAIL = 'admin@test.com';
const TEST_PASSWORD = 'Password123!';
const TEST_NAME = 'Admin User';

const existing = await db
  .select()
  .from(user)
  .where(eq(user.email, TEST_EMAIL))
  .then((rows) => rows[0]);

if (existing) {
  console.log(`User ${TEST_EMAIL} already exists, skipping.`);
  process.exit(0);
}

// signUpEmail may fail at the email-sending step in a script context
// (sendSignUpVerificationEmailFn is a createServerFn, no server is running).
// Catch that error — the user row is created before the email step.
try {
  await auth.api.signUpEmail({
    body: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: TEST_NAME,
    },
  });
} catch {
  // expected: email sending fails in script context
}

const seededUser = await db
  .select()
  .from(user)
  .where(eq(user.email, TEST_EMAIL))
  .then((rows) => rows[0]);

if (!seededUser) {
  console.error('User was not created — signUpEmail may have failed before the DB insert.');
  process.exit(1);
}

// Manually mark as verified since email sending is skipped in dev/seed context.
await db.update(user).set({ emailVerified: true }).where(eq(user.id, seededUser.id));

console.log(`Created test user: ${TEST_EMAIL} / ${TEST_PASSWORD} (id: ${seededUser.id})`);

// Seed workspace
const [seededWorkspace] = await db
  .insert(workspace)
  .values({
    name: `${TEST_NAME}'s Workspace`,
    slug: 'admin-workspace',
  })
  .returning();

await db.insert(workspaceMember).values({
  workspaceId: seededWorkspace.id,
  userId: seededUser.id,
  role: 'owner',
});

console.log(`Created workspace: ${seededWorkspace.name} (${seededWorkspace.slug}`);
