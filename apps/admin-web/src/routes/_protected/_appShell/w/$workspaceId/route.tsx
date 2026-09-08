import { Skeleton } from '@feedback-saas/ui/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { fetchUserWorkspaceByIdOptions } from '@/effects/workspace';

export const Route = createFileRoute('/_protected/_appShell/w/$workspaceId')({
  component: () => <Outlet />,
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
    <div className="my-4 mx-8 grid grid-cols-2 gap-4">
      <Skeleton className="flex w-full h-50" />
      <Skeleton className="flex w-full h-50" />
      <Skeleton className="flex w-full h-50" />
    </div>
  ),
});
