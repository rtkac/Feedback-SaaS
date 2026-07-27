import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { Spinner } from '@/components/ui/spinner';
import { m } from '@/paraglide/messages';
import { signUpUserOptions } from '@/queries';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

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
    validators: {
      // onSubmit: formSchema,
    },
    onSubmit: ({ value }) =>
      mutateAsync({
        name: value.name,
        email: value.email,
        password: value.password,
      }),
  });

  const { mutateAsync, isError, error } = useMutation(signUpUserOptions());

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
        {/* <FieldGroup>
          <FieldSet>
            <FieldGroup> */}
        <form.Field name="name">
          {(field) => (
            // <Field>
            //   <FieldLabel htmlFor={field.name}>{m.signUpNameLabel()}</FieldLabel>
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="text"
                placeholder={m.signUpNamePlaceholder()}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
            </>
            // </Field>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            // <Field>
            //   <FieldLabel htmlFor={field.name}>{m.signUpEmailLabel()}</FieldLabel>
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="email"
                placeholder={m.signUpEmailPlaceholder()}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
              {/* </Field> */}
            </>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            // <Field>
            //   <FieldLabel htmlFor={field.name}>{m.signUpPasswordLabel()}</FieldLabel>
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={m.signUpPasswordPlaceholder()}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
              {/* </Field> */}
            </>
          )}
        </form.Field>
        <form.Field name="confirm_password">
          {(field) => (
            // <Field>
            //   <FieldLabel htmlFor={field.name}>{m.signUpPasswordConfirmLabel()}</FieldLabel>
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="password"
                placeholder={m.signUpPasswordConfirmPlaceholder()}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  // <FieldError errors={field.state.meta.errors} />
                  <div>{field.state.meta.errors.join(', ')}</div>
                )}
              {/* </Field> */}
            </>
          )}
        </form.Field>
        {/* </FieldGroup>
          </FieldSet> */}
        {/* <Field orientation="horizontal"> */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button type="submit" disabled={isSubmitting} className="w-full">
              {m.signUpButtonCreateAccount()}{' '}
              {/* {isSubmitting && <Spinner data-icon="inline-start" />} */}
            </button>
          )}
        </form.Subscribe>
        {/* </Field> */}
        {isError && <>{m.signUpErrorMessage()}</>}
        {/* </FieldGroup> */}
      </form>
      <p>
        {m.signUpLoginDesc()} <Link to="/sign-in">{m.signUpLoginButton()}</Link>
      </p>
    </div>
  );
}
