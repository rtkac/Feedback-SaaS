import {
  IconLayoutDashboard,
  IconBuildingBroadcastTower,
  IconBug,
  IconEyeSearch,
  IconSettings,
  IconRocket,
} from '@tabler/icons-react';

import type { SidebarLink } from './Sidebar';

// destination pages aren't built yet, so every link points at the workspace overview for now
export const workspaceNavLinks = (workspaceId: string): SidebarLink[] => [
  { to: '/$workspaceId', params: { workspaceId }, label: 'Overview', icon: IconLayoutDashboard },
  {
    to: '/$workspaceId',
    params: { workspaceId },
    label: 'Signals',
    icon: IconBuildingBroadcastTower,
  },
  { to: '/$workspaceId', params: { workspaceId }, label: 'Problems', icon: IconBug },
  { to: '/$workspaceId', params: { workspaceId }, label: 'Insights', icon: IconEyeSearch },
  { to: '/$workspaceId', params: { workspaceId }, label: 'Releases', icon: IconRocket },
  { to: '/$workspaceId', params: { workspaceId }, label: 'Settings', icon: IconSettings },
];
