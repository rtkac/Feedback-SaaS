import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
        alt="User avatar"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.png" alt="User avatar" />
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
  ),
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args}>
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="size-12">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=144&h=144&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="size-16">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=192&h=192&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const DifferentRadius: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} className="size-8 rounded-none">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="size-8 rounded-md">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="size-8 rounded-full">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User avatar"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const GroupAvatars: Story = {
  render: (args) => (
    <div className="flex space-x-[-0.6rem]">
      <Avatar {...args} className="ring-2 ring-background">
        <AvatarImage
          alt="U1"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="ring-2 ring-background">
        <AvatarImage
          alt="U2"
          src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar {...args} className="ring-2 ring-background">
        <AvatarImage
          alt="U3"
          src="https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
    </div>
  ),
};
