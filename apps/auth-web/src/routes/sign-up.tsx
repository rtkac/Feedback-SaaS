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

import { signUpUserOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

const formSchema = z
  .object({
    name: z.string().nonempty(m.signUpNameErrorRequired()),
    email: z.email(m.signUpEmailInvalid()),
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
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validators: [
      {
        triggers: ['blur'],
        run: formSchema,
      },
    ],
    onSubmit: async ({ value }) => {
      await toast.promise(
        mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
        }),
        {
          loading: m.signUpLoadingMessage(),
          success: m.signUpSuccessMessage(),
          error: m.signUpErrorMessage(),
        },
      );
    },
  });

  const { mutateAsync } = useMutation(signUpUserOptions());

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: 'google',
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl font-bold">{m.signUpTitle()}</h1>
        </CardTitle>
        <CardDescription>
          <p>{m.signUpDesc()}</p>
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
          <form.Field name="name">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{m.signUpNameLabel()}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="text"
                  placeholder={m.signUpNamePlaceholder()}
                  aria-invalid={field.meta.isInvalid}
                />
                <FieldError>
                  {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
                </FieldError>
              </div>
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{m.signUpEmailLabel()}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="email"
                  placeholder={m.signUpEmailPlaceholder()}
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
                <Label htmlFor={field.name}>{m.signUpPasswordLabel()}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="password"
                  placeholder={m.signUpPasswordPlaceholder()}
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
                <Label htmlFor={field.name}>{m.signUpPasswordConfirmLabel()}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="password"
                  placeholder={m.signUpPasswordConfirmPlaceholder()}
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
                {m.signUpCreateAccountLabel()}
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
              <span className="text-muted-foreground">{m.signUpLoginDesc()}</span>
              &nbsp;
              <Link to="/">{m.signUpLoginLabel()}</Link>
            </p>
          </div>
        </form>
      </CardPanel>
    </Card>
  );
}

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: m.signUpMetaTitle(),
      },
    ],
  }),
});
