import { Button, FieldError, Input, Label, toast } from '@feedback-saas/ui/components';
import { useForm } from '@tanstack/react-form';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { fetchUserWorkspaceByIdOptions, updateWorkspaceOptions } from '@/effects/workspace';

const formSchema = z.object({
  name: z
    .string()
    .nonempty('Workspace name is required')
    .max(100, 'Workspace name must be at most 100 characters'),
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(fetchUserWorkspaceByIdOptions(workspaceId));

  const form = useForm({
    defaultValues: {
      name: data?.name ?? '',
    },
    validators: [
      {
        triggers: ['blur'],
        run: formSchema,
      },
    ],
    onSubmit: async ({ value }) => {
      await toast.promise(mutateAsync({ name: value.name }), {
        loading: 'Updating workspace...',
        success: 'Workspace updated successfully',
        error: 'Failed to update workspace',
      });
      form.reset(value);
    },
  });

  const { mutateAsync } = useMutation({
    ...updateWorkspaceOptions(workspaceId),
    onMutate: async (newWorkspace, { client }) => {
      await client.cancelQueries(context.fetchUserWorkspacesOptions);

      const previousWorkspaces = client.getQueryData(context.fetchUserWorkspacesOptions.queryKey);

      client.setQueryData(context.fetchUserWorkspacesOptions.queryKey, (old) => {
        return old?.map((workspace) =>
          workspace.workspace.id === workspaceId
            ? { ...workspace, name: newWorkspace.name }
            : workspace,
        );
      });

      return { previousWorkspaces };
    },
    onError: (_, __, onMutateResult, { client }) => {
      client.setQueryData(
        context.fetchUserWorkspacesOptions.queryKey,
        onMutateResult?.previousWorkspaces,
      );
    },
    onSettled: (_, __, ___, ____, { client }) =>
      client.invalidateQueries(context.fetchUserWorkspacesOptions),
  });

  return (
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
            <Label htmlFor={field.name}>Workspace Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              type="text"
              placeholder="Enter workspace name"
              aria-invalid={field.meta.isInvalid}
            />
            <FieldError>
              {typeof field.errors[0] === 'string' ? field.errors[0] : field.errors[0]?.message}
            </FieldError>
          </div>
        )}
      </form.Field>
      <div>
        <form.Subscribe selector={(state) => [state.isSubmitting, state.isDefaultValue]}>
          {([isSubmitting, isDefaultValue]) => (
            <Button size="lg" type="submit" loading={isSubmitting} disabled={isDefaultValue}>
              Update Workspace
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}

export const Route = createFileRoute('/_protected/_admin-layout/workspace/$workspaceId/settings')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchUserWorkspaceByIdOptions, staleTime: 'static' });
  },
});
