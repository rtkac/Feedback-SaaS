import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldError,
  Input,
  Label,
} from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { sendRequestPasswordResetOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">{m.forgotPasswordTitle()}</h1>
        </CardTitle>
        <CardDescription>
          <p>{m.forgotPasswordDesc()}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-2"
        >
          <form.Field name="email">
            {(field) => (
              <div>
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
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {m.forgotPasswordSendResetLinkLabel()}
              </Button>
            )}
          </form.Subscribe>
          {isError && (
            <p className="text-sm font-base text-destructive mt-1">
              {m.forgotPasswordErrorMessage()}
            </p>
          )}
        </form>
        <p>
          {m.forgotPasswordBackTo()}&nbsp;
          <Link to="/">{m.forgotPasswordLoginLabel()}</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: m.forgotPasswordMetaTitle(),
      },
    ],
  }),
});
