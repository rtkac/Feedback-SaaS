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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">{m.resetPasswordTitle()}</h1>
        </CardTitle>
        <CardDescription>
          <p>{m.resetPasswordDesc()}</p>
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
          <form.Field name="password">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{m.resetPasswordPasswordLabel()}</Label>
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
                <FieldError>
                  {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
                </FieldError>
              </div>
            )}
          </form.Field>
          <form.Field name="confirm_password">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{m.resetPasswordConfirmPasswordLabel()}</Label>
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
                <FieldError>
                  {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
                </FieldError>
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {m.resetPasswordResetLabel()}
              </Button>
            )}
          </form.Subscribe>
          {isError && (
            <p className="text-sm font-base text-destructive mt-1">
              {m.resetPasswordErrorMessage()}
            </p>
          )}
        </form>
        <p>
          {m.resetPasswordBackTo()}&nbsp;
          <Link to="/">{m.resetPasswordLoginLabel()}</Link>
        </p>
      </CardContent>
    </Card>
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
  head: () => ({
    meta: [
      {
        title: m.resetPasswordMetaTitle(),
      },
    ],
  }),
});
