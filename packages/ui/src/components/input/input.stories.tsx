import type { Meta, StoryObj } from '@storybook/react-vite';

import { FieldError } from '../field-error/fieldError';
import { Label } from '../label/label';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' },
    },
    unstyled: {
      control: { type: 'boolean' },
    },
    nativeInput: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'default',
  },
  render: (args) => (
    <div className="max-w-72">
      <Input {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter text',
  },
  render: (args) => (
    <div className="max-w-72">
      <Label htmlFor="input-with-label">Email</Label>
      <Input id="input-with-label" {...args} />
    </div>
  ),
};

export const WithFieldError: Story = {
  args: {
    placeholder: 'Enter email',
  },
  render: (args) => (
    <div className="max-w-72">
      <Label htmlFor="input-with-field-error">Email</Label>
      <Input id="input-with-field-error" aria-invalid="true" {...args} />
      <FieldError>Please enter a valid email address.</FieldError>
    </div>
  ),
};
