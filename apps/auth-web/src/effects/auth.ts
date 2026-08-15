import { signIn, signUp, requestPasswordReset, resetPassword } from '@feedback-saas/auth/client';
import { mutationOptions } from '@tanstack/react-query';

import { ResetPasswordBody, SignInBody, SignUpBody } from '@/types';

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

const sendRequestPasswordReset = async (email: string) => {
  const response = await requestPasswordReset({
    email,
    redirectTo: `${import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL}/reset-password`,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const sendRequestPasswordResetOptions = () =>
  mutationOptions({
    mutationFn: (email: string) => sendRequestPasswordReset(email),
  });

const sendResetPassword = async (body: ResetPasswordBody) => {
  const response = await resetPassword({
    ...body,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const sendResetPasswordOptions = () =>
  mutationOptions({
    mutationFn: (body: ResetPasswordBody) => sendResetPassword(body),
  });
