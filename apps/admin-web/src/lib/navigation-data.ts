import {
  type TablerIcon,
  IconLayoutDashboard,
  IconBuildingBroadcastTower,
  IconBug,
  IconEyeSearch,
  IconRocket,
  IconSettings,
} from '@tabler/icons-react';
import { LinkProps } from '@tanstack/react-router';

export interface NavItem {
  title: string;
  to?: LinkProps['to'];
  icon?: TablerIcon;
  isActive?: boolean;
  items?: NavItem[];
}

export const navMainItems: NavItem[] = [
  {
    icon: IconLayoutDashboard,
    title: 'Overview',
    to: '/workspace/$workspaceId',
  },
  {
    icon: IconBuildingBroadcastTower,
    title: 'Signals',
    to: '/',
  },
  {
    icon: IconBug,
    title: 'Problems',
    to: '/',
  },
  {
    icon: IconEyeSearch,
    title: 'Insights',
    to: '/',
  },
  {
    icon: IconRocket,
    title: 'Releases',
    to: '/',
  },
  {
    icon: IconSettings,
    title: 'Settings',
    to: '/workspace/$workspaceId/settings',
  },
];

export const accountNavMainItems: NavItem[] = [
  {
    icon: IconLayoutDashboard,
    title: 'Workspaces',
    to: '/',
  },
  {
    icon: IconSettings,
    title: 'Account',
    to: '/account',
  },
];
