import { StatusComponent } from '@feedback-saas/ui/components';
import { QueryClient } from '@tanstack/react-query';
import { createRouteMask, createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { routeTree } from './routeTree.gen';

import { ErrorStatus } from '@/components/ErrorStatus';

export function getRouter() {
  const queryClient = new QueryClient();

  const workspaceIdToWorkspaceSlugMask = createRouteMask({
    routeTree,
    from: '/$workspaceId/',
    to: '/$workspaceId',
    params: (prev) => ({
      workspaceId: prev.workspaceId,
    }),
  });

  const router = createTanStackRouter({
    routeTree,
    routeMasks: [workspaceIdToWorkspaceSlugMask],
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error, reset }) => <ErrorStatus error={error} onReset={reset} />,
    defaultNotFoundComponent: () => (
      <StatusComponent variant="notFound" onClick={() => router.history.back()} />
    ),
    context: { queryClient },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
  interface StaticDataRouteOption {
    titleText?: string;
    // overrides the breadcrumb link target, defaults to the match's own pathname
    breadcrumbTo?: string;
  }
}
