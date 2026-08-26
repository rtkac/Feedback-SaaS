import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldError,
  Input,
  Label,
  Separator,
} from '@feedback-saas/ui/components';
import { IconChartLine, IconBolt, IconPalette } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, createLink, Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { signInUserOptions } from '@/effects/auth';
import { m } from '@/paraglide/messages';

const ButtonLink = createLink(Button);

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
      toast.promise(mutateAsync(value), {
        loading: m.signInLoadingMessage(),
        success: () => {
          return m.signInSuccessMessage();
        },
        error: m.signInErrorMessage(),
      });
    },
  });

  const { mutateAsync } = useMutation(signInUserOptions());

  return (
    <div className="flex gap-4 md:gap-6 p-4 md:py-8 sm:py-12 flex-1/2 justify-center max-w-3xl flex-col-reverse md:flex-row items-center md:items-stretch">
      <Card variant="secondary" className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">{m.signInBoxesTitle()}</h1>
          </CardTitle>
          <CardDescription>
            <p>{m.signInBoxesDesc()}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Box className="flex flex-row gap-2 items-center">
            <IconBolt className="shrink-0" />
            <p> {m.signInBox1Title()}</p>
          </Box>
          <Box className="flex flex-row gap-2 items-center">
            <IconChartLine className="shrink-0" />
            <p>{m.signInBox2Title()}</p>
          </Box>
          <Box className="flex flex-row gap-2 items-center">
            <IconPalette className="shrink-0" />
            <p>{m.signInBox3Title()}</p>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">{m.signInTitle()}</h1>
          </CardTitle>
          <CardDescription>
            <p>{m.signInDesc()}</p>
          </CardDescription>
        </CardHeader>
        <span className="px-6">
          <Separator />
        </span>
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
                  <div className="flex justify-between">
                    <Label htmlFor={field.name}>{m.signInPasswordLabel()}</Label>
                    <Link to="/forgot-password" className="text-sm mb-2">
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
                  {m.signInSubmitLabel()}
                </Button>
              )}
            </form.Subscribe>
            <div className="flex flex-col gap-6 mt-5">
              <span>
                <Separator />
              </span>
              <ButtonLink to="/sign-up" variant="secondary">
                {m.signInCreateAccount()}
              </ButtonLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
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
