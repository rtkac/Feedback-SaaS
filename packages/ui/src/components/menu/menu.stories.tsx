import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconEdit,
  IconLogout,
  IconPlus,
  IconSettings,
  IconShare,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import * as React from 'react';

import { Button } from '../button/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';
import {
  Menu,
  MenuCheckboxItem,
  MenuCreateHandle,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from './menu';

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <IconTrash />
          Delete account
        </MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

// `inset` aligns icon-less items with items that have icons, per the docs' `MenuItem` API entry.
export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>
          <IconEdit />
          Edit
        </MenuItem>
        <MenuItem>
          <IconShare />
          Share
        </MenuItem>
        <MenuItem inset>Profile</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>Profile</MenuItem>
        <MenuItem disabled>Billing (unavailable)</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const OpenOnHover: Story = {
  render: () => (
    <Menu>
      <MenuTrigger openOnHover render={<Button variant="outline" />}>
        Hover me
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>
          <IconPlus />
          Add to playlist
        </MenuItem>
        <MenuItem>Play next</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuCheckboxItem defaultChecked>Shuffle</MenuCheckboxItem>
        <MenuCheckboxItem>Repeat</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  ),
};

// `variant="switch"` is purely visual; the item still behaves like a checkbox item.
export const WithSwitch: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuCheckboxItem defaultChecked variant="switch">
          Auto save
        </MenuCheckboxItem>
        <MenuCheckboxItem variant="switch">Notifications</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuRadioGroup defaultValue="artist">
          <MenuGroupLabel>Sort by</MenuGroupLabel>
          <MenuRadioItem value="artist">Artist</MenuRadioItem>
          <MenuRadioItem value="album">Album</MenuRadioItem>
          <MenuRadioItem value="title">Title</MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuLinkItem href="/docs">Docs</MenuLinkItem>
        <MenuLinkItem href="/settings">Settings</MenuLinkItem>
      </MenuPopup>
    </Menu>
  ),
};

export const WithGroupLabel: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Playback</MenuGroupLabel>
          <MenuItem>Play</MenuItem>
          <MenuItem>Pause</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  ),
};

// `MenuShortcut` is exported and documented in the API reference but has no dedicated docs example.
export const WithShortcut: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>
          <IconUser />
          Profile
          <MenuShortcut>⇧⌘P</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <IconSettings />
          Settings
          <MenuShortcut>⌘S</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <IconLogout />
          Log out
          <MenuShortcut>⇧⌘Q</MenuShortcut>
        </MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const NestedMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>Song info</MenuItem>
        <MenuSub>
          <MenuSubTrigger>Add to playlist</MenuSubTrigger>
          <MenuSubPopup>
            <MenuItem>Jazz</MenuItem>
            <MenuItem>Rock</MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  ),
};

// `closeOnClick` controls whether choosing an item dismisses the menu.
export const CloseOnClick: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem closeOnClick={false}>Keep open</MenuItem>
        <MenuItem>Close on click (default)</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const OpenADialog: Story = {
  render: function Render() {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
      <>
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
          <MenuPopup>
            <MenuItem onClick={() => setDialogOpen(true)}>Open dialog</MenuItem>
          </MenuPopup>
        </Menu>

        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
          {/* Also openable directly, without going through the menu. */}
          <DialogTrigger render={<Button variant="ghost" />}>Open directly</DialogTrigger>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Opened from a menu</DialogTitle>
              <DialogDescription>
                The dialog state is controlled and opened imperatively from the menu item.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </>
    );
  },
};

// Documented in the createHandle API entry but missing a dedicated example in the coss ui docs.
export const DetachedTrigger: Story = {
  render: function Render() {
    const [actionsMenu] = React.useState(() => MenuCreateHandle());

    return (
      <>
        <MenuTrigger handle={actionsMenu} render={<Button variant="outline" />}>
          Actions
        </MenuTrigger>

        <Menu handle={actionsMenu}>
          <MenuPopup>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Share</MenuItem>
          </MenuPopup>
        </Menu>
      </>
    );
  },
};

export const Playground: StoryObj<{
  align: 'start' | 'center' | 'end';
  disabled: boolean;
  inset: boolean;
  side: 'top' | 'bottom' | 'left' | 'right';
  variant: 'default' | 'destructive';
}> = {
  args: {
    align: 'start',
    disabled: false,
    inset: false,
    side: 'bottom',
    variant: 'default',
  },
  argTypes: {
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    inset: {
      control: { type: 'boolean' },
    },
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'destructive'],
      control: { type: 'select' },
    },
  },
  render: (args) => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup align={args.align} side={args.side}>
        <MenuItem disabled={args.disabled} inset={args.inset} variant={args.variant}>
          Profile
        </MenuItem>
      </MenuPopup>
    </Menu>
  ),
};
