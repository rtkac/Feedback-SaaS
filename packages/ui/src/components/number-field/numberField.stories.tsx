import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Button } from '../button/button';
import { Label } from '../label/label';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from './numberField';

const meta: Meta<typeof NumberField> = {
  title: 'UI/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {
    'aria-label': 'Quantity',
    defaultValue: 0,
    size: 'default',
    disabled: false,
  },
  render: (args) => (
    <div className="max-w-72">
      <NumberField {...args}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

export const WithScrub: Story = {
  args: {
    defaultValue: 0,
  },
  render: (args) => (
    <div className="max-w-72">
      <NumberField {...args}>
        <NumberFieldScrubArea label="Quantity" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

export const WithExternalLabel: Story = {
  render: function Render() {
    const id = React.useId();

    return (
      <div className="flex max-w-72 flex-col items-start gap-2">
        <Label htmlFor={id}>Quantity</Label>
        <NumberField defaultValue={0} id={id}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </div>
    );
  },
};

export const WithRange: Story = {
  args: {
    'aria-label': 'Quantity',
    defaultValue: 5,
    min: 0,
    max: 10,
  },
  render: (args) => (
    <div className="max-w-72">
      <NumberField {...args}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

export const WithFormattedValue: Story = {
  args: {
    'aria-label': 'Amount',
    defaultValue: 0,
    format: { currency: 'USD', style: 'currency' },
  },
  render: (args) => (
    <div className="max-w-72">
      <NumberField {...args}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

export const WithStep: Story = {
  render: () => (
    <div className="grid max-w-72 gap-4">
      <NumberField defaultValue={0} step={10}>
        <NumberFieldScrubArea label="Step 10" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={0} step={0.1}>
        <NumberFieldScrubArea label="Step 0.1" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

export const FormIntegration: Story = {
  render: function Render() {
    const id = React.useId();
    const [submittedValue, setSubmittedValue] = React.useState<string | null>(null);

    return (
      <form
        className="flex max-w-72 flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          setSubmittedValue(formData.get('quantity')?.toString() ?? null);
        }}
      >
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor={id}>Quantity</Label>
          <NumberField defaultValue={1} id={id} max={100} min={1} name="quantity">
            <NumberFieldScrubArea label="Quantity" />
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </div>
        <Button type="submit">Submit</Button>
        {submittedValue && (
          <p className="text-muted-foreground text-sm">Submitted: {submittedValue}</p>
        )}
      </form>
    );
  },
};

export const Playground: StoryObj<{
  allowWheelScrub: boolean;
  defaultValue: number;
  disabled: boolean;
  max: number;
  min: number;
  readOnly: boolean;
  size: 'sm' | 'default' | 'lg';
  step: number;
}> = {
  args: {
    allowWheelScrub: false,
    defaultValue: 0,
    disabled: false,
    max: 100,
    min: 0,
    readOnly: false,
    size: 'default',
    step: 1,
  },
  argTypes: {
    allowWheelScrub: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' },
    },
    step: {
      control: { type: 'number' },
    },
  },
  render: (args) => (
    <div className="max-w-72">
      <NumberField
        allowWheelScrub={args.allowWheelScrub}
        aria-label="Quantity"
        defaultValue={args.defaultValue}
        disabled={args.disabled}
        max={args.max}
        min={args.min}
        readOnly={args.readOnly}
        size={args.size}
        step={args.step}
      >
        <NumberFieldScrubArea label="Quantity" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};
