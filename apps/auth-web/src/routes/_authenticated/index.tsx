import { signIn } from '@feedback-saas/auth/client';
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
  Separator,
  toast,
} from '@feedback-saas/ui/components';
import { GoogleIcon } from '@feedback-saas/ui/icons';
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
    onSubmit: async ({ value }) => {
      await toast.promise(mutateAsync(value), {
        loading: m.signInLoadingMessage(),
        success: m.signInSuccessMessage(),
        error: m.signInErrorMessage(),
      });
    },
  });

  const { mutateAsync } = useMutation(signInUserOptions());

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: 'google',
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl font-bold">{m.signInTitle()}</h1>
        </CardTitle>
        <CardDescription>
          <p>{m.signInDesc()}</p>
        </CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-3"
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
                <div className="flex justify-between mb-2">
                  <Label htmlFor={field.name}>{m.signInPasswordLabel()}</Label>
                  <Link to="/forgot-password" className="text-xs">
                    {m.signInForgotPassword()}
                  </Link>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="password"
                  placeholder={m.signInPasswordPlaceholder()}
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
              <Button size="lg" type="submit" loading={isSubmitting}>
                {m.signInSubmitLabel()}
              </Button>
            )}
          </form.Subscribe>
          <div className="flex flex-col gap-6 mt-3">
            <div className="flex overflow-x-auto justify-center items-center gap-3">
              <Separator />
              <span className="text-sm text-muted-foreground">or</span>
              <Separator />
            </div>
            <Button size="lg" variant="outline" onClick={handleGoogleSignIn}>
              <GoogleIcon />
              {m.signInGoogleLabel()}
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-sm">
              <span className="text-muted-foreground">{m.signInCreateAccount()}</span>
              &nbsp;
              <Link to="/sign-up">{m.signInCreateAccountLabel()}</Link>
            </p>
          </div>
        </form>
      </CardPanel>
    </Card>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: m.signInMetaTitle(),
      },
    ],
  }),
});
