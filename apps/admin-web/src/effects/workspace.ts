import { queryOptions } from '@tanstack/react-query';

import { getUserWorkspacesFn, getUserWorkspaceByIdFn } from '@/server/workspace.functions';

export const fetchUserWorkspacesOptions = () =>
  queryOptions({
    queryKey: ['workspaces'],
    queryFn: getUserWorkspacesFn,
  });

export const fetchUserWorkspaceByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ['workspace', id],
    queryFn: () => getUserWorkspaceByIdFn({ data: { id } }),
  });
