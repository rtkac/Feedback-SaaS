import { Button } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { z } from 'zod';

import { sendResetPasswordOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

// import { Button } from '@/components/ui/button';
// import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { Spinner } from '@/components/ui/spinner';
// import { m } from '@/paraglide/messages';

const defaultSearchValues = {
  token: '',
};

const searchSchema = z.object({
  token: z.string().default(defaultSearchValues.token).catch(defaultSearchValues.token),
});

export const Route = createFileRoute('/reset-password')({
  validateSearch: searchSchema,
  search: { middlewares: [stripSearchParams(defaultSearchValues)] },
  beforeLoad: async ({ search }) => {
    if (!search.token) {
      throw new Error('Missing token');
    }
  },
  component: RouteComponent,
});

// const formSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, m.signUpPasswordMin())
//       .max(128, m.signUpPasswordMax())
//       .regex(/\p{Lu}/u, m.signUpPasswordUppercase())
//       .regex(/[\p{N}\p{P}\p{S}]/u, m.signUpPasswordNumberOrSpecial()),
//     confirm_password: z.string().nonempty(m.signUpPasswordConfirmRequired()),
//   })
//   .refine((data) => data.password === data.confirm_password, {
//     message: m.signUpPasswordMatch(),
//     path: ['confirm_password'],
//   });

function RouteComponent() {
  const { token } = Route.useSearch();

  const form = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    validators: {
      //   onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      return mutateAsync({ newPassword: value.password, token });
    },
  });

  const { mutateAsync, isError } = useMutation(sendResetPasswordOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <h1 className="flex flex-col gap-2">Reset Password</h1>
      <p>Enter your new password</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="password">
          {(field) => (
            <>
              <label htmlFor={field.name}>New Password</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={'New password'}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
            </>
          )}
        </form.Field>
        <form.Field name="confirm_password">
          {(field) => (
            // <Field>
            //   <FieldLabel htmlFor={field.name}>{m.signUpPasswordConfirmLabel()}</FieldLabel>
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={'Confirm new password'}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Reset Password
              </Button>
            </div>
          )}
        </form.Subscribe>
        {isError && <p>error message</p>}
      </form>
      <p>
        Back to&nbsp;
        <Link to="/" className="underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
