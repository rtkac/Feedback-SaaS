import { db } from '@feedback-saas/db';
import * as schema from '@feedback-saas/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

import { sendSignUpVerificationEmail, sendResetPasswordEmail } from './server-events';

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
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordEmail(user.email, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendSignUpVerificationEmail(user.email, url);
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [tanstackStartCookies()],
  advanced: {
    cookiePrefix: 'feedback-saas',
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.NODE_ENV === 'development' ? undefined : '.devlabs.sk',
    },
  },
});
