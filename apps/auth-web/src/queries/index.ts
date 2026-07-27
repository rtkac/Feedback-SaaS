import { signIn, signUp } from '@feedback-saas/auth/auth-client';
import { mutationOptions } from '@tanstack/react-query';

import { SignInBody, SignUpBody } from '@/types';

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

export const signUpUserOptions = () =>
  mutationOptions({
    mutationFn: (body: SignUpBody) => signUpUser(body),
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

export const signInUserOptions = () =>
  mutationOptions({
    mutationFn: (body: SignInBody) => signInUser(body),
  });
