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
import { toast } from 'sonner';
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
    onSubmit: ({ value }) => {
      toast.promise(
        mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
        }),
        {
          loading: m.signUpLoadingMessage(),
          success: () => {
            return m.signUpSuccessMessage();
          },
          error: m.signUpErrorMessage(),
        },
      );
    },
  });

  const { mutateAsync } = useMutation(signUpUserOptions());

  return (
    <div className="flex gap-4 md:gap-6 p-4 md:py-8 sm:py-12 flex-1/2 justify-center max-w-3xl flex-col-reverse md:flex-row items-center md:items-stretch">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">{m.signUpTitle()}</h1>
          </CardTitle>
          <CardDescription>
            <p>{m.signUpDesc()}</p>
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
                    {typeof field.errors[0] === 'string'
                      ? field.errors[0]
                      : field.errors[0]?.message}
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
                    {typeof field.errors[0] === 'string'
                      ? field.errors[0]
                      : field.errors[0]?.message}
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
                    {typeof field.errors[0] === 'string'
                      ? field.errors[0]
                      : field.errors[0]?.message}
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
                    {typeof field.errors[0] === 'string'
                      ? field.errors[0]
                      : field.errors[0]?.message}
                  </FieldError>
                </div>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {m.signUpCreateAccountLabel()}
                </Button>
              )}
            </form.Subscribe>
          </form>
          <p>
            {m.signUpLoginDesc()}&nbsp;
            <Link to="/">{m.signUpLoginLabel()}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
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
