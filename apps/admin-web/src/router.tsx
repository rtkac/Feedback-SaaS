import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@feedback-saas/ui/components';
import { IconRoute, IconUserHexagon } from '@tabler/icons-react';
import { QueryClient } from '@tanstack/react-query';
import { createLink, createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { routeTree } from './routeTree.gen';

import { ErrorStatus } from '@/components/ErrorStatus';

const ButtonLink = createLink(Button);

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error, reset }) => <ErrorStatus error={error} onReset={reset} />,
    defaultNotFoundComponent: () => (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconRoute />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>The page you are looking for does not exist.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <ButtonLink to="/" size="sm">
              Workspaces
            </ButtonLink>
            <ButtonLink to="/profile" size="sm" variant="outline">
              <IconUserHexagon />
              View profile
            </ButtonLink>
          </div>
        </EmptyContent>
      </Empty>
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
