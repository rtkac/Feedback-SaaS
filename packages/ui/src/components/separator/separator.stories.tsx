import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../lib/utils';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div className="max-w-72">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-sm">coss ui</h4>
        <p className="text-muted-foreground text-sm">
          Unstyled, accessible primitives for fast product UI and design systems.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Releases</span>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
  },
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div
      className={cn(
        'text-sm',
        args.orientation === 'vertical'
          ? 'flex h-5 items-center gap-4'
          : 'flex w-64 flex-col gap-2',
      )}
    >
      <span>Blog</span>
      <Separator {...args} />
      <span>Docs</span>
      <Separator {...args} />
      <span>Source</span>
      <Separator {...args} />
      <span>Releases</span>
    </div>
  ),
};
