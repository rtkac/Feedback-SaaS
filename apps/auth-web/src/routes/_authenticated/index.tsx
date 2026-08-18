import { Button } from '@feedback-saas/ui/components';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@feedback-saas/ui/components';
import { Input } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { signInUserOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

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
    validators: {
      onSubmit: formSchema,
    },
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
        <FieldSet>
          <FieldGroup>
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{m.signInEmailLabel()}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="email"
                    placeholder={m.signInEmailPlaceholder()}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{m.signInPasswordLabel()}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="password"
                    placeholder={m.signInPasswordPlaceholder()}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {m.signInSubmitLabel()}
              </Button>
            )}
          </form.Subscribe>
        </Field>
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
