import { getSession } from '@feedback-saas/auth/server';
import { queryOptions } from '@tanstack/react-query';

export const fetchSessionOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => getSession(),
  });
