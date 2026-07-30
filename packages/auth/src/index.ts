import { db } from '@feedback-saas/db';
import * as schema from '@feedback-saas/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

import { sendSignUpVerificationEmailFn } from './server-events';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    onExistingUserSignUp: () => {
      throw new Error();
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendSignUpVerificationEmailFn({
        data: {
          to: user.email,
          subject: 'Verify your email address',
          text: `Click the link to verify your email: ${url}`,
        },
      });
    },
  },
  plugins: [tanstackStartCookies()],
});
