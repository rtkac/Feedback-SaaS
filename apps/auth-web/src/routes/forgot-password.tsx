import { Button, FieldError, Input, Label } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { sendRequestPasswordResetOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.email(m.forgotPasswordEmailInvalid()),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: [
      {
        triggers: ['blur'],
        run: formSchema,
      },
    ],
    onSubmit: ({ value }) => mutateAsync(value.email),
  });

  const { mutateAsync, isError } = useMutation(sendRequestPasswordResetOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <h1 className="flex flex-col gap-2">{m.forgotPasswordTitle()}</h1>
      <p>{m.forgotPasswordDesc()}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <>
              <Label htmlFor={field.name}>{m.forgotPasswordEmailLabel()}</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={m.forgotPasswordEmailPlaceholder()}
                aria-invalid={field.meta.isInvalid}
              />
              <FieldError>
                {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
              </FieldError>
            </>
          )}
        </form.Field>
        <div>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {m.forgotPasswordSendResetLinkLabel()}
              </Button>
            )}
          </form.Subscribe>
        </div>
        {isError && <p>{m.forgotPasswordErrorMessage()}</p>}
      </form>
      <p>
        {m.forgotPasswordBackTo()}&nbsp;
        <Link to="/" className="underline">
          {m.forgotPasswordLoginLabel()}
        </Link>
      </p>
    </div>
  );
}
