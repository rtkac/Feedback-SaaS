import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Button } from '../button/button';
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '../menu/menu';
import { Textarea } from '../textarea/textarea';
import {
  Dialog,
  DialogClose,
  DialogCreateHandle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <DialogPanel>Content</DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

export const BareFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <DialogFooter variant="bare">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

// Not shown as a dedicated example in the coss ui docs, but `showCloseButton` is a documented DialogPopup prop.
export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogPopup showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Use the footer actions below to close this dialog.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Terms & Conditions</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogDescription>Please read the following terms carefully.</DialogDescription>
        </DialogHeader>
        <DialogPanel className="max-h-72">
          {Array.from({ length: 20 }, (_, index) => (
            <p className="mb-4 last:mb-0" key={index}>
              Paragraph {index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Decline</DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open parent</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Parent dialog</DialogTitle>
          <DialogDescription>This dialog can open another dialog on top of it.</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open child</DialogTrigger>
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Child dialog</DialogTitle>
                <DialogDescription>Closing me reveals the parent dialog again.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button />}>Close</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

export const CloseConfirmation: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [text, setText] = React.useState('');

    return (
      <>
        <Dialog
          onOpenChange={(nextOpen) => {
            // Intercept the close request and confirm first when there is a draft to lose.
            if (!nextOpen && text.trim().length > 0) {
              setConfirmOpen(true);
              return;
            }
            setOpen(nextOpen);
          }}
          open={open}
        >
          <DialogTrigger render={<Button />}>Compose</DialogTrigger>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>New message</DialogTitle>
              <DialogDescription>
                Your draft is discarded if you close without sending.
              </DialogDescription>
            </DialogHeader>
            <DialogPanel>
              <Textarea
                onChange={(event) => setText(event.target.value)}
                placeholder="Write your message..."
                rows={4}
                value={text}
              />
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button>Send</Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>

        <Dialog onOpenChange={setConfirmOpen} open={confirmOpen}>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Discard message?</DialogTitle>
              <DialogDescription>
                Your draft will be lost if you discard this message now.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setConfirmOpen(false)} variant="outline">
                Keep editing
              </Button>
              <Button
                onClick={() => {
                  setText('');
                  setConfirmOpen(false);
                  setOpen(false);
                }}
                variant="destructive"
              >
                Discard
              </Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </>
    );
  },
};

export const OpenFromMenu: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
          <MenuPopup>
            <MenuItem onClick={() => setOpen(true)}>Open dialog</MenuItem>
          </MenuPopup>
        </Menu>

        <Dialog onOpenChange={setOpen} open={open}>
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

// Documented in the DialogCreateHandle API entry but missing a dedicated example in the coss ui docs.
export const DetachedTrigger: Story = {
  render: function Render() {
    const [notificationsDialog] = React.useState(() => DialogCreateHandle());

    return (
      <>
        <DialogTrigger handle={notificationsDialog} render={<Button variant="outline" />}>
          View notifications
        </DialogTrigger>

        <Dialog handle={notificationsDialog}>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                This dialog is opened by a trigger rendered outside its root, connected through a
                shared handle.
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
