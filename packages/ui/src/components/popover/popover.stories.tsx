import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBell, IconInfoCircle, IconUser, IconX } from '@tabler/icons-react';
import type { ComponentType } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { Button } from '../button/button';
import { Textarea } from '../textarea/textarea';
import {
  Popover,
  PopoverClose,
  PopoverCreateHandle,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup className="w-80">
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>Popover Description</PopoverDescription>
        <PopoverClose render={<Button className="mt-4" variant="outline" />}>Close</PopoverClose>
      </PopoverPopup>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup className="w-80">
        <PopoverClose
          aria-label="Close"
          className="absolute inset-e-2 top-2"
          render={<Button size="icon" variant="ghost" />}
        >
          <IconX />
        </PopoverClose>
        <div className="mb-2">
          <PopoverTitle className="text-base">Notifications</PopoverTitle>
          <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
        </div>
        <PopoverClose render={<Button variant="outline" />}>Close</PopoverClose>
      </PopoverPopup>
    </Popover>
  ),
};

// `tooltipStyle` is recommended for popovers whose only purpose is showing extra info via an icon button.
export const TooltipStyle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        openOnHover
        render={<Button aria-label="Password requirements" size="icon-xs" variant="ghost" />}
      >
        <IconInfoCircle />
      </PopoverTrigger>
      <PopoverPopup side="top" tooltipStyle>
        <p>Min. 8 characters</p>
      </PopoverPopup>
    </Popover>
  ),
};

// Documented via `openOnHover`/`delay` on `Trigger` in the base-ui API but has no dedicated coss ui example.
export const OpenOnHover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        delay={200}
        openOnHover
        render={<Button aria-label="Notifications" size="icon" variant="outline" />}
      >
        <IconBell />
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle className="text-base">Notifications</PopoverTitle>
        <PopoverDescription>You have no new notifications at this time.</PopoverDescription>
      </PopoverPopup>
    </Popover>
  ),
};

export const AnimatedPopovers: Story = {
  render: function Render() {
    const popoverHandle = PopoverCreateHandle<ComponentType>();

    function NotificationsContent(): React.ReactElement {
      return (
        <>
          <PopoverTitle className="text-base">Notifications</PopoverTitle>
          <PopoverDescription>You have no new notifications at this time.</PopoverDescription>
        </>
      );
    }

    function ProfileContent(): React.ReactElement {
      return (
        <div className="w-48">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                alt="Mark Andersson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-1 font-medium text-sm">Mark Andersson</h4>
              <div className="text-muted-foreground text-xs">Product Designer</div>
            </div>
          </div>
          <Button className="mt-3 w-full" size="sm" variant="outline">
            Log out
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <PopoverTrigger
          handle={popoverHandle}
          payload={NotificationsContent}
          render={<Button aria-label="Notifications" size="icon" variant="outline" />}
        >
          <IconBell aria-hidden="true" />
        </PopoverTrigger>
        <PopoverTrigger
          handle={popoverHandle}
          payload={ProfileContent}
          render={<Button aria-label="Profile" size="icon" variant="outline" />}
        >
          <IconUser aria-hidden="true" />
        </PopoverTrigger>
        <Popover handle={popoverHandle}>
          {({ payload: Payload }) => (
            <PopoverPopup className="min-w-none">{Payload && <Payload />}</PopoverPopup>
          )}
        </Popover>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup className="w-80">
        <form>
          <div className="mb-4">
            <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
            <PopoverDescription>Let us know how we can improve.</PopoverDescription>
          </div>
          <div className="flex flex-col gap-4">
            <Textarea aria-label="Send feedback" placeholder="How can we improve?" />
            <Button>Send feedback</Button>
          </div>
        </form>
      </PopoverPopup>
    </Popover>
  ),
};

export const Playground: StoryObj<{
  align: 'start' | 'center' | 'end';
  alignOffset: number;
  side: 'top' | 'bottom' | 'left' | 'right';
  sideOffset: number;
  tooltipStyle: boolean;
}> = {
  args: {
    align: 'center',
    alignOffset: 0,
    side: 'bottom',
    sideOffset: 4,
    tooltipStyle: false,
  },
  argTypes: {
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
    },
    alignOffset: {
      control: { type: 'number' },
    },
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    sideOffset: {
      control: { type: 'number' },
    },
    tooltipStyle: {
      control: { type: 'boolean' },
    },
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup
        align={args.align}
        alignOffset={args.alignOffset}
        className={args.tooltipStyle ? undefined : 'w-80'}
        side={args.side}
        sideOffset={args.sideOffset}
        tooltipStyle={args.tooltipStyle}
      >
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>Popover Description</PopoverDescription>
      </PopoverPopup>
    </Popover>
  ),
};
