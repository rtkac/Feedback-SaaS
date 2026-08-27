import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
  FieldError,
  Input,
  Label,
  toast,
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
    onSubmit: async ({ value }) => {
      await toast.promise(mutateAsync(value.email), {
        loading: m.forgotPasswordLoadingMessage(),
        success: m.forgotPasswordSuccessMessage(),
        error: m.forgotPasswordErrorMessage(),
      });
    },
  });

  const { mutateAsync } = useMutation(sendRequestPasswordResetOptions());

  return (
    <div className="flex gap-4 md:gap-6 p-4 md:py-8 sm:py-12 flex-1/2 justify-center max-w-3xl flex-col-reverse md:flex-row items-center md:items-stretch">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">{m.forgotPasswordTitle()}</h1>
          </CardTitle>
          <CardDescription>
            <p>{m.forgotPasswordDesc()}</p>
          </CardDescription>
        </CardHeader>
        <CardPanel className="flex flex-col gap-4">
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
                    {typeof field.errors[0] === 'string'
                      ? field.errors[0]
                      : field.errors[0]?.message}
                  </FieldError>
                </div>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" loading={isSubmitting}>
                  {m.forgotPasswordSendResetLinkLabel()}
                </Button>
              )}
            </form.Subscribe>
          </form>
          <p>
            {m.forgotPasswordBackTo()}&nbsp;
            <Link to="/">{m.forgotPasswordLoginLabel()}</Link>
          </p>
        </CardPanel>
      </Card>
    </div>
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
