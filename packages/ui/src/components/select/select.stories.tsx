import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBrandAstro,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandVite,
  IconTruck,
} from '@tabler/icons-react';
import * as React from 'react';

import { Button } from '../button/button';
import { Label } from '../label/label';
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '../menu/menu';
import {
  Select,
  SelectButton,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const frameworks = [
  { label: 'Select framework', value: null },
  { label: 'Next.js', value: 'next' },
  { label: 'Vite', value: 'vite' },
  { label: 'Astro', value: 'astro' },
];

export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Select items={frameworks}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next" items={frameworks}>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next" items={frameworks}>
        <SelectTrigger size="lg">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next" disabled items={frameworks}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

// `alignItemWithTrigger` defaults to `true`; setting it to `false` opens the popup below the trigger instead of overlapping it.
export const WithoutItemAlignment: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next" items={frameworks}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger={false}>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

interface ProduceGroupItem {
  value: string;
  items: string[];
}

const produceGroups: ProduceGroupItem[] = [
  {
    value: 'Fruits',
    items: ['Apple', 'Banana', 'Orange'],
  },
  {
    value: 'Vegetables',
    items: ['Carrot', 'Lettuce', 'Spinach'],
  },
];

export const WithGroups: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select produce" />
        </SelectTrigger>
        <SelectPopup>
          {produceGroups.map((group, index) => (
            <React.Fragment key={group.value}>
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectGroupLabel>{group.value}</SelectGroupLabel>
                {group.items.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </React.Fragment>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="apple">
        <SelectLabel>Fruits</SelectLabel>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectPopup>
      </Select>
    </div>
  ),
};

// `null` is used as a normal item value so users can clear the selection from within the popup.
export const ClearableValue: Story = {
  render: () => (
    <div className="w-56">
      <Select items={frameworks}>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectPopup>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

const languages = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go'];

export const MultipleSelection: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue={['JavaScript', 'TypeScript']} multiple>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

const frameworkIcons: Record<string, React.ReactNode> = {
  astro: <IconBrandAstro />,
  next: <IconBrandNextjs />,
  react: <IconBrandReact />,
  vite: <IconBrandVite />,
};

const frameworksWithIcons = [
  { label: 'Next.js', value: 'next' },
  { label: 'Vite', value: 'vite' },
  { label: 'Astro', value: 'astro' },
  { label: 'React', value: 'react' },
];

// A function passed as `SelectValue`'s children renders a custom formatted value, here paired with an icon lookup.
export const WithIcon: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next">
        <SelectTrigger>
          <SelectValue>
            {(value: string) => (
              <span className="flex items-center gap-2">
                {frameworkIcons[value]}
                {frameworksWithIcons.find((item) => item.value === value)?.label}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectPopup>
          {frameworksWithIcons.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

export const OptionsWithIcon: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="next">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {frameworksWithIcons.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <span className="flex items-center gap-2">
                {frameworkIcons[item.value]}
                {item.label}
              </span>
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};

interface ShippingMethod {
  label: string;
  description: string;
  price: string;
}

const shippingMethods: ShippingMethod[] = [
  { label: 'Standard', description: 'Delivers in 4-6 business days', price: '$4.99' },
  { label: 'Express', description: 'Delivers in 2-3 business days', price: '$9.99' },
  { label: 'Overnight', description: 'Delivers the next business day', price: '$19.99' },
];

export const WithObjectValues: Story = {
  render: () => (
    <div className="w-64">
      <Select defaultValue={shippingMethods[0]} itemToStringLabel={(method) => method.label}>
        <SelectLabel>Shipping method</SelectLabel>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {shippingMethods.map((method) => (
            <SelectItem key={method.label} value={method}>
              <span className="flex items-center gap-2">
                <IconTruck />
                <span>
                  {method.label}
                  <span className="block text-muted-foreground text-xs">
                    {method.description} ({method.price})
                  </span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
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
          setSubmittedValue(formData.get('framework')?.toString() ?? null);
        }}
      >
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor={id}>Framework</Label>
          <div className="w-56">
            <Select id={id} items={frameworks} name="framework" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectPopup>
                {frameworks.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
          <p className="text-muted-foreground text-xs">Pick your favorite.</p>
        </div>
        <Button className="self-start" type="submit">
          Submit
        </Button>
        {submittedValue && (
          <p className="text-muted-foreground text-sm">Submitted: {submittedValue}</p>
        )}
      </form>
    );
  },
};

// `SelectButton` gives non-select triggers (e.g. `MenuTrigger`) the same look as `SelectTrigger`. No Combobox
// component exists in this package yet, so this uses `Menu` to demonstrate the `render` prop pattern from the docs.
export const StandaloneSelectButton: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<SelectButton className="w-56" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

export const Playground: StoryObj<{
  alignItemWithTrigger: boolean;
  disabled: boolean;
  multiple: boolean;
  size: 'sm' | 'default' | 'lg';
}> = {
  args: {
    alignItemWithTrigger: true,
    disabled: false,
    multiple: false,
    size: 'default',
  },
  argTypes: {
    alignItemWithTrigger: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' },
    },
  },
  render: (args) => (
    <div className="w-56">
      <Select
        defaultValue={args.multiple ? ['next'] : 'next'}
        disabled={args.disabled}
        items={frameworks}
        multiple={args.multiple}
      >
        <SelectTrigger size={args.size}>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger={args.alignItemWithTrigger}>
          {frameworks.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  ),
};
