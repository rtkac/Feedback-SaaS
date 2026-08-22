import { Button, FieldError, Input, Label } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { signInUserOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

const formSchema = z.object({
  email: z.email(m.signInEmailInvalid()),
  password: z.string().nonempty(m.signInPasswordRequired()),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: [
      {
        triggers: ['blur'],
        run: formSchema,
      },
    ],
    onSubmit: ({ value }) => mutateAsync(value),
  });

  const { mutateAsync, isError } = useMutation(signInUserOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{m.signInTitle()}</h1>
        <p>{m.signInDesc()}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <>
              <Label htmlFor={field.name}>{m.signInEmailLabel()}</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={m.signInEmailPlaceholder()}
                aria-invalid={field.meta.isInvalid}
              />
              <FieldError>
                {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
              </FieldError>
            </>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <>
              <Label htmlFor={field.name}>{m.signInPasswordLabel()}</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={m.signInPasswordPlaceholder()}
              />
              <FieldError>
                {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
              </FieldError>
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {m.signInSubmitLabel()}
            </Button>
          )}
        </form.Subscribe>
        {isError && <p>{m.signInErrorMessage()}</p>}
      </form>

      <Link to="/forgot-password" className="underline">
        {m.signInForgotPassword()}
      </Link>
      <p>
        {m.signInDontHaveAccount()}&nbsp;
        <Link to="/sign-up" className="underline">
          {m.signInCreateAccount()}
        </Link>
      </p>
    </div>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});
