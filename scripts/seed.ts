import { auth } from '@feedback-saas/auth';
import { db } from '@feedback-saas/db';
import { user } from '@feedback-saas/db/schema/auth-schema';
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

await auth.api.signUpEmail({
  body: {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    name: TEST_NAME,
  },
});

// requireEmailVerification is true but email sending is disabled in dev,
// so manually mark the user as verified.
await db.update(user).set({ emailVerified: true }).where(eq(user.email, TEST_EMAIL));

console.log(`Created test user: ${TEST_EMAIL} / ${TEST_PASSWORD}`);
