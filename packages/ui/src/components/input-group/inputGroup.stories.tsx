import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconInfoCircle, IconMail, IconX } from '@tabler/icons-react';

import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { NumberField, NumberFieldInput } from '../number-field/numberField';
import { Popover, PopoverPopup, PopoverTrigger } from '../popover/popover';
import { Spinner } from '../spinner/spinner';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './inputGroup';

const meta: Meta<typeof InputGroup> = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const WithEndIcon: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Email" type="email" />
      <InputGroupAddon>
        <IconMail />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithStartText: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupAddon>
        <InputGroupText>i.cal.com/</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  ),
};

export const WithEndText: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="username" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>@coss.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithStartAndEndText: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

// The docs don't ship a Tooltip component yet, so this uses `Popover` with `tooltipStyle`.
export const WithTooltip: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput aria-label="Password" placeholder="Password" type="password" />
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger
            openOnHover
            render={<Button aria-label="Password requirements" size="icon-xs" variant="ghost" />}
          >
            <IconInfoCircle />
          </PopoverTrigger>
          <PopoverPopup side="top" tooltipStyle>
            <p>Min. 8 characters</p>
          </PopoverPopup>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput defaultValue="Clearable value" />
      <InputGroupAddon align="inline-end">
        <Button aria-label="Clear" size="icon-sm" variant="ghost">
          <IconX />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Search" />
      <InputGroupAddon align="inline-end">
        <Button size="sm">Search</Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBadge: StoryObj<typeof Badge> = {
  args: {
    variant: 'info',
  },
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
  },
  render: (args) => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Type to search…" type="search" />
      <InputGroupAddon align="inline-end">
        <Badge {...args}>Badge</Badge>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <kbd>⌘K</kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithInnerLabel: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupAddon align="block-start">
        <InputGroupText className="text-xs">Email</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="you@example.com" type="email" />
    </InputGroup>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Email" size="sm" type="email" />
      <InputGroupAddon>
        <IconMail />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput placeholder="Email" size="lg" type="email" />
      <InputGroupAddon>
        <IconMail />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput disabled placeholder="Email" type="email" />
      <InputGroupAddon>
        <IconMail />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Loading: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupInput disabled placeholder="Searching..." />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithNumberField: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <NumberField aria-label="Enter the amount" defaultValue={10}>
        <NumberFieldInput className="text-left" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>EUR</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="max-w-72">
      <InputGroupTextarea defaultValue="This textarea grows with content." />
      <InputGroupAddon align="block-end">
        <InputGroupText>78% used</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};
