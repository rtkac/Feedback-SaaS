import { Button, Field, FieldError, FieldLabel, Input } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { z } from 'zod';

import { sendResetPasswordOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

const defaultSearchValues = {
  token: '',
};

const searchSchema = z.object({
  token: z.string().default(defaultSearchValues.token).catch(defaultSearchValues.token),
});

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, m.signUpPasswordMin())
      .max(128, m.signUpPasswordMax())
      .regex(/\p{Lu}/u, m.signUpPasswordUppercase())
      .regex(/[\p{N}\p{P}\p{S}]/u, m.signUpPasswordNumberOrSpecial()),
    confirm_password: z.string().nonempty(m.signUpPasswordConfirmRequired()),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: m.signUpPasswordMatch(),
    path: ['confirm_password'],
  });

function RouteComponent() {
  const { token } = Route.useSearch();

  const form = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    validators: [
      {
        triggers: ['blur'],
        run: formSchema,
      },
    ],
    onSubmit: ({ value }) => {
      return mutateAsync({ newPassword: value.password, token });
    },
  });

  const { mutateAsync, isError } = useMutation(sendResetPasswordOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <h1 className="flex flex-col gap-2">{m.resetPasswordTitle()}</h1>
      <p>{m.resetPasswordDesc()}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{m.resetPasswordPasswordLabel()}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={m.resetPasswordPasswordPlaceholder()}
                aria-invalid={field.meta.isInvalid}
              />
              <FieldError errors={field.errors} />
            </Field>
          )}
        </form.Field>
        <form.Field name="confirm_password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{m.resetPasswordConfirmPasswordLabel()}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={m.resetPasswordConfirmPasswordPlaceholder()}
                aria-invalid={field.meta.isInvalid}
              />
              <FieldError errors={field.errors} />
            </Field>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div>
              <Button type="submit" disabled={isSubmitting}>
                {m.resetPasswordResetLabel()}
              </Button>
            </div>
          )}
        </form.Subscribe>
        {isError && <p>{m.resetPasswordErrorMessage()}</p>}
      </form>
      <p>
        {m.resetPasswordBackTo()}&nbsp;
        <Link to="/" className="underline">
          {m.resetPasswordLoginLabel()}
        </Link>
      </p>
    </div>
  );
}

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
