import { signOut } from '@feedback-saas/auth/client';
import {
  Drawer,
  DrawerTrigger,
  DrawerPopup,
  DrawerPanel,
  Button,
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  Avatar,
  Separator,
  Dialog,
  DialogPopup,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@feedback-saas/ui/components';
import { useIsMobile } from '@feedback-saas/ui/hooks/use-media-query';
import { IconChevronRight, IconLogout, IconMenu4, IconSettings } from '@tabler/icons-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { NavItem } from '@/lib/navigation-data';

type MobileNavigationProps = {
  navMainItems?: NavItem[];
};

export const MobileNavigation = ({ navMainItems }: MobileNavigationProps) => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ href: import.meta.env.VITE_FEEDBACK_SAAS_AUTH_WEB_URL });
          },
        },
      });
    });
  };

  return (
    isMobile && (
      <Drawer>
        <DrawerTrigger
          className="fixed bottom-4 left-1/2 z-50 w-fit -translate-x-1/2"
          render={<Button variant="outline" />}
        >
          Show menu&nbsp;
          <IconMenu4 />
        </DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerPanel>
            <div className="flex flex-col gap-2">
              <nav className="mt-4">
                <ul>
                  {navMainItems?.map(({ title, to, items, icon: Icon }) =>
                    items?.length ? (
                      <Collapsible key={title}>
                        <CollapsibleTrigger className="w-full data-panel-open:[&_svg]:rotate-90">
                          <span className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-8 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0">
                            {Icon && <Icon />}
                            <span>{title}</span>
                            <IconChevronRight className="size-4" />
                          </span>
                        </CollapsibleTrigger>
                        <CollapsiblePanel className="ml-6.5">
                          {items.map(({ title: subTitle, to: subTo, icon: SubIcon }) => (
                            <li key={subTitle}>
                              <Link
                                to={subTo}
                                activeOptions={{ exact: true }}
                                activeProps={{ 'data-active': true }}
                                className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-light text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-8 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
                              >
                                {SubIcon && <SubIcon />}
                                <span>{subTitle}</span>
                              </Link>
                            </li>
                          ))}
                        </CollapsiblePanel>
                      </Collapsible>
                    ) : (
                      <li key={title}>
                        <Link
                          to={to}
                          activeOptions={{ exact: true }}
                          activeProps={{ 'data-active': true }}
                          className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-8 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
                        >
                          {Icon && <Icon />}
                          <span>{title}</span>
                        </Link>
                      </li>
                    ),
                  )}
                  <li>
                    <Separator className="mt-2 mb-4" />
                    <div className="flex gap-2 items-center ml-1 mb-2">
                      <Avatar className="size-6 bg-gray-200">RT</Avatar>
                      <div className="flex flex-col w-full">
                        <span className="text-sm text-slate-900 dark:text-white w-full">User</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/account"
                      activeProps={{ 'data-active': true }}

                      className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-8 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
                    >
                      <IconSettings />
                      <span>Account</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-8 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
                      onClick={() => setDialogOpen(true)}
                    >
                      <IconLogout />
                      Log Out
                    </button>

                    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                      <DialogPopup>
                        <DialogHeader>
                          <DialogTitle>Log Out</DialogTitle>
                          <DialogDescription>Are you sure you want to log out?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose render={<Button variant="ghost" />}>Go back</DialogClose>
                          <Button onClick={handleSignOut} loading={isPending}>
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogPopup>
                    </Dialog>
                  </li>
                </ul>
              </nav>
            </div>
          </DrawerPanel>
        </DrawerPopup>
      </Drawer>
    )
  );
};
