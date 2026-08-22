import { Button, FieldError, Input, Label } from '@feedback-saas/ui/components';
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
    onSubmit: ({ value }) =>
      mutateAsync({
        name: value.name,
        email: value.email,
        password: value.password,
      }),
  });

  const { mutateAsync, isError } = useMutation(signUpUserOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{m.signUpTitle()}</h1>
        <p>{m.signUpDesc()}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {(field) => (
            <>
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
            </>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <>
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
            </>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <>
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
            </>
          )}
        </form.Field>
        <form.Field name="confirm_password">
          {(field) => (
            <>
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
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {m.signUpCreateAccountLabel()}
            </Button>
          )}
        </form.Subscribe>
        {isError && <>{m.signUpErrorMessage()}</>}
      </form>
      <p>
        {m.signUpLoginDesc()}
        <Link to="/" className="underline">
          {m.signUpLoginLabel()}
        </Link>
      </p>
    </div>
  );
}

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});
