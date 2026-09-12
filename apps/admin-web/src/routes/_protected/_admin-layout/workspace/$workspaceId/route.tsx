import { Skeleton } from '@feedback-saas/ui/components';
import { createFileRoute } from '@tanstack/react-router';

import { fetchUserWorkspaceByIdOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected/_admin-layout/workspace/$workspaceId')({
  context: ({ params }) => ({
    fetchUserWorkspaceByIdOptions: fetchUserWorkspaceByIdOptions(params.workspaceId),
  }),
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.query(context.fetchUserWorkspaceByIdOptions);
    } catch {
      throw Route.redirect({ to: '/' });
    }
  },
  loader: ({ context }) => {
    context.queryClient.query({
      ...context.fetchUserWorkspaceByIdOptions,
      staleTime: 'static',
    });
  },
  pendingComponent: () => (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="flex w-full h-50" />
      <Skeleton className="flex w-full h-50" />
      <Skeleton className="flex w-full h-50" />
    </div>
  ),
});
