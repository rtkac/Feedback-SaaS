import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { signInUserOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

// import { Button } from '@/components/ui/button';
// import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { Spinner } from '@/components/ui/spinner';
// import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/_authenticated/sign-in')({
  component: RouteComponent,
});

// const formSchema = z.object({
//   email: z.email(m.sign_in_email_validation_error_message()),
//   password: z.string().nonempty(m.sign_in_password_validation_error_message()),
// });
const formSchema = z.object({
  email: z.email('email err'),
  password: z.string().nonempty('password err'),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => mutateAsync(value),
  });

  const { mutateAsync, isError } = useMutation(signInUserOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">{m.signIn()}</div>
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
        <form.Field name="password">
          {(field) => (
            <>
              <label htmlFor={field.name}>Password</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={'password placeholder'}
              />
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button type="submit" disabled={isSubmitting} className="w-full">
              {m.signIn()}
            </button>
          )}
        </form.Subscribe>
        {isError && <p>error message</p>}
      </form>
    </div>
  );
}
