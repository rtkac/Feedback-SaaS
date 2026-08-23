import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../lib/utils';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: ({ orientation }) => (
    <div className={cn('gap-2', orientation === 'horizontal' ? 'flex flex-col' : 'flex flex-row')}>
      Before
      <Separator orientation={orientation} />
      After
    </div>
  ),
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
};
