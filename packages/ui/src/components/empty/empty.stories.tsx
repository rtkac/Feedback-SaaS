import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCalendarEvent, IconInbox, IconUserHexagon } from '@tabler/icons-react';

import { Avatar, AvatarFallback } from '..';
import { Button } from '../button/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

const meta: Meta<typeof Empty> = {
  title: 'UI/Empty',
  component: Empty,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconInbox />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Add data</Button>
      </EmptyContent>
    </Empty>
  ),
};

// `EmptyContent` can hold more than one action, e.g. a primary button plus a secondary link.
export const WithMultipleActions: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCalendarEvent />
        </EmptyMedia>
        <EmptyTitle>No upcoming meetings</EmptyTitle>
        <EmptyDescription>Create a meeting to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">Create meeting</Button>
          <Button size="sm" variant="outline">
            <IconUserHexagon />
            View docs
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};

// `EmptyMedia` also accepts arbitrary content such as an `Avatar`, not just an icon.
export const WithAvatar: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar className="size-12">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>Invite people to collaborate on this project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Invite member</Button>
      </EmptyContent>
    </Empty>
  ),
};

// `EmptyContent` is optional; an empty state can be just a header.
export const WithoutContent: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconInbox />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
