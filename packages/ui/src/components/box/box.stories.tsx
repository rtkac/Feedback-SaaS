import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from './box';

const meta: Meta<typeof Box> = {
  title: 'UI/Box',
  component: ({ variant }) => (
    <Box variant={variant}>
      <p>Box content</p>
    </Box>
  ),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'Box content',
    variant: 'default',
  },
};
