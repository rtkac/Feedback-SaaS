import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck } from '@tabler/icons-react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'destructive',
        'error',
        'info',
        'outline',
        'secondary',
        'success',
        'warning',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'outline',
    size: 'default',
  },
  render: (args) => (
    <Badge {...args}>
      <IconCheck aria-hidden="true" />
      Verified
    </Badge>
  ),
};

export const WithLink: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => <Badge render={<a href="/pricing">New</a>} {...args} />,
};

export const WithCount: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => (
    <Badge {...args} className="rounded-full">
      7
    </Badge>
  ),
};
