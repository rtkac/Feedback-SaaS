import { signIn, signUp } from '@feedback-saas/auth/auth-client';
import { type MutationOptions } from '@tanstack/react-query';

import { SignInBody, SignUpBody, AuthErrorCode } from '../types';

type ApiError = Error & {
  code: AuthErrorCode | undefined;
};

const signUpUser = async (body: SignUpBody) => {
  const response = await signUp.email({
    ...body,
    callbackURL: import.meta.env.VITE_FEEDBACK_SAAS_ADMIN_WEB_URL,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const signUpUserOptions = (): MutationOptions<unknown, ApiError, SignUpBody> => ({
  mutationFn: (body) => signUpUser(body),
});

const signInUser = async (body: SignInBody) => {
  const response = await signIn.email({
    ...body,
    callbackURL: import.meta.env.VITE_FEEDBACK_SAAS_ADMIN_WEB_URL,
    rememberMe: false,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const signInUserOptions = (): MutationOptions<unknown, ApiError, SignInBody> => ({
  mutationFn: (body) => signInUser(body),
});
