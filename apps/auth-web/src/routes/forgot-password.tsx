import { Button } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { sendRequestPasswordResetOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

// import { Button } from '@/components/ui/button';
// import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { Spinner } from '@/components/ui/spinner';
// import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
});

// const formSchema = z.object({
//   email: z.email(m.sign_in_email_validation_error_message()),
// });
const formSchema = z.object({
  email: z.email('email err'),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => mutateAsync(value.email),
  });

  const { mutateAsync, isError } = useMutation(sendRequestPasswordResetOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <h1 className="flex flex-col gap-2">Forgot Password</h1>
      <p>Enter your email to reset your password</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <>
              <label htmlFor={field.name}>Email</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="email"
                placeholder={'email placeholder'}
              />
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Rend reset link
              </Button>
            </div>
          )}
        </form.Subscribe>
        {isError && <p>error message</p>}
      </form>
      <p>
        Back to&nbsp;
        <Link to="/sign-in" className="underline">
          sign In
        </Link>
      </p>
    </div>
  );
}
