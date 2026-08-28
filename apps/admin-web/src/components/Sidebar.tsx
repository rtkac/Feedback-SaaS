import {
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  Button,
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@feedback-saas/ui/components';
import {
  IconLogout,
  IconMenu2,
  IconLayoutDashboard,
  IconBuildingBroadcastTower,
  IconBug,
  IconEyeSearch,
  IconSettings,
  IconRocket,
  IconUser,
} from '@tabler/icons-react';
import { createLink, Link } from '@tanstack/react-router';
import { useState } from 'react';

const MenuItemLink = createLink(MenuItem);

type SidebarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  onSignOut: () => Awaited<void>;
  isPending: boolean;
};

export const Sidebar = ({ sidebarOpen, toggleSidebar, onSignOut, isPending }: SidebarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={toggleSidebar}
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'hidden opacity-0'}`}
      >
        <IconMenu2 />
      </button>
      <aside
        id="sidebar"
        className={`sidebar-transition fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white lg:static lg:translate-x-0 dark:border-dark-border dark:bg-dark-card flex flex-col justify-between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
          <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-dark-border">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-brand-900 flex items-center justify-center text-white"></div>
              <span className="dark:text-white text-lg font-extrabold text-slate-900 tracking-tight font-poppins">
                DevLabs
              </span>
            </div>
          </div>

          <nav className="space-y-1 px-3 py-6">
            <Link
              to="/"
              className="group flex items-center gap-3 dark:bg-brand-900/20 dark:text-brand-100 text-sm font-medium text-brand-900 bg-brand-50 rounded-lg pt-2.5 pr-3 pb-2.5 pl-3 bg-slate-50 dark:hover:bg-white/5"
            >
              <IconLayoutDashboard size={20} />
              Overview
            </Link>
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-all"
            >
              <IconBuildingBroadcastTower size={20} />
              Signals
            </Link>
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-all"
            >
              <IconBug size={20} />
              Problems
            </Link>
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-all"
            >
              <IconEyeSearch size={20} />
              Insights
            </Link>
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-all"
            >
              <IconRocket size={20} />
              Releases
            </Link>
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-all"
            >
              <IconSettings size={20} />
              Settings
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-100 p-3 dark:border-dark-border">
          <div className="flex items-center gap-3 px-3">
            <Menu>
              <MenuTrigger render={<Button variant="outline" className="w-full text-left" />}>
                <IconUser size={20} />
                <div className="flex flex-col w-full">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white w-full">
                    Radovan Tkac
                  </span>
                </div>
              </MenuTrigger>
              <MenuPopup align="start" className="w-52">
                <MenuGroup>
                  <MenuGroupLabel>Account</MenuGroupLabel>
                  <MenuItemLink to="/$workspace/profile" params={{ workspace: 'default' }}>
                    Profile
                  </MenuItemLink>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuItem onClick={() => setDialogOpen(true)}>
                    <IconLogout />
                    &nbsp;Log Out
                  </MenuItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>

            <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Log Out</DialogTitle>
                  <DialogDescription>Are you sure you want to log out?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="ghost" />}>Go back</DialogClose>
                  <Button onClick={onSignOut} loading={isPending}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </div>
        </div>
      </aside>
    </>
  );
};
