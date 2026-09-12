import { signOut } from '@feedback-saas/auth/client';
import {
  Avatar,
  Button,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from '@feedback-saas/ui/components';
import { useIsMobile } from '@feedback-saas/ui/hooks/use-media-query';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { createLink, Link, useNavigate } from '@tanstack/react-router';
import { useState, useTransition } from 'react';

import { NavItem } from '@/lib/navigation-data';

const MenuItemLink = createLink(MenuItem);

type SidebarProps = {
  navMainItems?: NavItem[];
};

export const Sidebar = ({ navMainItems }: SidebarProps) => {
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
    !isMobile && (
      <aside className="w-75 size-full flex-1">
        <div className="size-full justify-between flex flex-col">
          <nav>
            <ul>
              {navMainItems?.map(({ title, to, items, icon: Icon }) =>
                items?.length ? (
                  <Collapsible key={title}>
                    <CollapsibleTrigger className="w-full data-panel-open:[&_svg]:rotate-90">
                      <span className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-9 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0">
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
                            className="peer/menu-button relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-9 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
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
                      className="peer/menu-button relative flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-base text-sidebar-foreground outline-hidden ring-sidebar-ring after:absolute after:top-full after:h-1 after:w-full hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-pressed:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-pressed:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground sm:text-sm lg:h-9 [&>svg:not([class*='size-'])]:size-4.5 [&>svg]:shrink-0"
                    >
                      {Icon && <Icon />}
                      <span>{title}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <nav>
            <Menu>
              <MenuTrigger
                render={<Button variant="ghost" className="w-full text-left" size="lg" />}
              >
                <Avatar className="size-6">RT</Avatar>
                <div className="flex flex-col w-full">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white w-full">
                    User
                  </span>
                </div>
              </MenuTrigger>
              <MenuPopup align="start" className="w-52">
                <MenuGroup>
                  <MenuGroupLabel>Account</MenuGroupLabel>
                  <MenuItemLink to="/account">Profile</MenuItemLink>
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
                  <Button onClick={handleSignOut} loading={isPending}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </nav>
        </div>
      </aside>
    )
  );
};
