import { Resend } from 'resend';

export const sendSignUpVerificationEmail = async (email: string, url: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return await resend.emails.send({
    from: 'onboarding@feedback-saas.devlabs.sk',
    to: email,
    subject: 'Verify your email address [Feedback SaaS]',
    html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, url: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return await resend.emails.send({
    from: 'password-reset@feedback-saas.devlabs.sk',
    to: email,
    subject: 'Reset your password [Feedback Saas]',
    text: `Click the link to reset your password: ${url}`,
  });
};
