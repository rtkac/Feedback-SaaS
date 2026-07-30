import { queryOptions } from '@tanstack/react-query';

import { getUserWorkspacesFn } from '@/server/workspace.functions';

export const fetchUserWorkspacesOptions = () =>
  queryOptions({
    queryKey: ['user-workspaces'],
    queryFn: getUserWorkspacesFn,
  });
