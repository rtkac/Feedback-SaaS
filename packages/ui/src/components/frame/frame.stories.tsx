import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowRight } from '@tabler/icons-react';

import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from './frame';

const meta: Meta<typeof Frame> = {
  title: 'UI/Frame',
  component: Frame,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Default: Story = {
  render: (args) => (
    <Frame {...args} className="w-96">
      <FrameHeader>
        <FrameTitle>Title</FrameTitle>
        <FrameDescription>Description</FrameDescription>
      </FrameHeader>
      <FramePanel>Content</FramePanel>
      <FrameFooter>Footer</FrameFooter>
    </Frame>
  ),
};

// `FrameHeader` is optional; a frame can hold just a panel and a footer.
export const WithoutHeader: Story = {
  render: (args) => (
    <Frame {...args} className="w-96">
      <FramePanel>Content</FramePanel>
      <FrameFooter>Footer</FrameFooter>
    </Frame>
  ),
};

// `FrameFooter` is optional; a frame can hold just a header and a panel.
export const WithoutFooter: Story = {
  render: (args) => (
    <Frame {...args} className="w-96">
      <FrameHeader>
        <FrameTitle>Title</FrameTitle>
        <FrameDescription>Description</FrameDescription>
      </FrameHeader>
      <FramePanel>Content</FramePanel>
    </Frame>
  ),
};

// Multiple `FramePanel`s are automatically separated with spacing between them.
export const SeparatedPanels: Story = {
  render: (args) => (
    <Frame {...args} className="w-96">
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <FrameTitle>Separated panel</FrameTitle>
        <FrameDescription>Section description</FrameDescription>
      </FramePanel>
      <FramePanel>
        <FrameTitle>Separated panel</FrameTitle>
        <FrameDescription>Section description</FrameDescription>
      </FramePanel>
    </Frame>
  ),
};

// A `FramePanel` can wrap a link to act as a clickable, navigable row.
export const Clickable: Story = {
  render: (args) => (
    <Frame {...args} className="w-96">
      <FrameHeader>
        <FrameTitle>Title</FrameTitle>
        <FrameDescription>Description</FrameDescription>
      </FrameHeader>
      <FramePanel className="p-0">
        <a
          className="flex items-center gap-3 rounded-[calc(var(--radius-xl)-1px)] p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          href="/settings/billing"
        >
          <div className="flex flex-col gap-1">
            <FrameTitle>Billing</FrameTitle>
            <FrameDescription>Manage your subscription and payment methods</FrameDescription>
          </div>
          <IconArrowRight className="ms-auto size-4 shrink-0 text-muted-foreground" />
        </a>
      </FramePanel>
    </Frame>
  ),
};
