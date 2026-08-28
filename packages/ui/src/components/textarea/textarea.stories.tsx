import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { FieldError } from '../field-error/fieldError';
import { Label } from '../label/label';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' },
    },
    unstyled: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'default',
  },
  render: (args) => (
    <div className="max-w-72">
      <Textarea {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Tell us about yourself…',
  },
  render: (args) => (
    <div className="max-w-72">
      <Label htmlFor="textarea-with-label">Bio</Label>
      <Textarea id="textarea-with-label" {...args} />
    </div>
  ),
};

export const WithFieldError: Story = {
  args: {
    placeholder: 'Enter your message',
  },
  render: (args) => (
    <div className="max-w-72">
      <Label htmlFor="textarea-with-field-error">Message</Label>
      <Textarea id="textarea-with-field-error" aria-invalid="true" {...args} />
      <FieldError>This field is required.</FieldError>
    </div>
  ),
};

export const WithForm: Story = {
  args: {
    placeholder: 'Enter your message',
  },
  render: (args) => (
    <div className="max-w-72">
      <form className="flex flex-col gap-2">
        <div>
          <Label htmlFor="textarea-with-form">Message</Label>
          <Textarea id="textarea-with-form" {...args} />
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  ),
};

// `unstyled` removes all default styling, meant for composing inside another styled container (e.g. InputGroup).
export const Unstyled: Story = {
  args: {
    placeholder: 'Enter text',
    unstyled: true,
  },
  render: (args) => (
    <div className="max-w-72 rounded-lg border border-input p-2">
      <Textarea {...args} />
    </div>
  ),
};
