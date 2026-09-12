import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  getUserWorkspacesFn,
  getUserWorkspaceByIdFn,
  updateWorkspaceNameFn,
} from '@/server/workspace.functions';

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

export const updateWorkspaceOptions = (id: string) =>
  mutationOptions({
    mutationFn: ({ name }: { name: string }) => updateWorkspaceNameFn({ data: { id, name } }),
  });
