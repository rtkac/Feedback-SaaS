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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">{m.signInTitle()}</h1>
        </CardTitle>
        <CardDescription>
          <p>{m.signInDesc()}</p>
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
              </div>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <div>
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
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {m.signInSubmitLabel()}
              </Button>
            )}
          </form.Subscribe>
          {isError && (
            <p className="text-sm font-base text-desctructive mt-1">{m.signInErrorMessage()}</p>
          )}
        </form>

        <Link to="/forgot-password">{m.signInForgotPassword()}</Link>
        <p>
          {m.signInDontHaveAccount()}&nbsp;
          <Link to="/sign-up">{m.signInCreateAccount()}</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});
