import { lastLoginMethodClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signUp, signOut, useSession, requestPasswordReset, resetPassword } =
  createAuthClient({
    plugins: [
      lastLoginMethodClient({
        domain: '.devlabs.sk', // Must match server crossSubDomainCookies domain
      }),
    ],
  });
