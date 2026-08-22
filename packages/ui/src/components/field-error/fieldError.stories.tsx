import type { Meta, StoryObj } from '@storybook/react-vite';

import { FieldError } from './fieldError';

const meta: Meta<typeof FieldError> = {
  title: 'UI/FieldError',
  component: FieldError,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FieldError>;

export const Default: Story = {
  args: {
    children: 'Some error message',
  },
};
