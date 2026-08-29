import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconDownload } from '@tabler/icons-react';

import { Spinner } from '../spinner/spinner';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'destructive',
        'destructive-outline',
        'ghost',
        'link',
        'outline',
        'secondary',
      ],
      control: { type: 'select' },
    },
    size: {
      options: [
        'default',
        'sm',
        'lg',
        'xl',
        'xs',
        'icon',
        'icon-lg',
        'icon-sm',
        'icon-xl',
        'icon-xs',
      ],
      control: { type: 'select' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
    loading: false,
  },
};

export const Icon: Story = {
  args: {
    variant: 'default',
    size: 'icon',
    loading: false,
  },
  render: (args) => (
    <Button aria-label="Add" {...args}>
      <IconDownload aria-hidden="true" />
    </Button>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
    loading: false,
  },
  render: (args) => (
    <Button {...args}>
      <IconDownload aria-hidden="true" />
      Download
    </Button>
  ),
};

export const WithLink: Story = {
  args: {
    variant: 'default',
    size: 'default',
    loading: false,
  },
  render: (args) => <Button render={<a href="/login">Login</a>} {...args} />,
};

export const LoadingBuiltIn: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    loading: true,
  },
};

export const LoadingCustomComposition: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <Spinner />
      Loading...
    </Button>
  ),
};
