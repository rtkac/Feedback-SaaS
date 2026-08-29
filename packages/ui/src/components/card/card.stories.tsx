import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardPanel>
        <p>Card content</p>
      </CardPanel>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

// `CardAction` auto-positions to the top-right of `CardHeader`, e.g. for a "Sign up" link next to a login title.
export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardAction>
          <a className="text-muted-foreground text-sm leading-4.5" href="/sign-up">
            Sign up
          </a>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-with-action-email">Email</Label>
            <Input id="card-with-action-email" placeholder="Enter your email" type="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-with-action-password">Password</Label>
            <Input
              id="card-with-action-password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </div>
      </CardPanel>
    </Card>
  ),
};

export const WithFooterHint: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardPanel>
        <div className="flex flex-col gap-2">
          <Label htmlFor="card-with-footer-hint-name">Name</Label>
          <Input id="card-with-footer-hint-name" placeholder="Name of your project" type="text" />
        </div>
      </CardPanel>
      <CardFooter>
        <div className="flex gap-1 text-muted-foreground text-xs">
          <IconAlertCircle className="size-3 h-lh shrink-0" />
          <p>This will take a few seconds to complete.</p>
        </div>
      </CardFooter>
    </Card>
  ),
};

// `Card` supports the `render` prop for polymorphic composition, e.g. rendering as an `<article>`.
export const AsElement: Story = {
  render: (args) => (
    <Card {...args} className="w-96" render={<article aria-label="Project summary" />}>
      <CardHeader>
        <CardTitle>Project summary</CardTitle>
        <CardDescription>Rendered as a semantic article element.</CardDescription>
      </CardHeader>
      <CardPanel>
        <p>Card content</p>
      </CardPanel>
    </Card>
  ),
};

export const FrameDefault: Story = {
  render: (args) => (
    <CardFrame {...args} className="w-96">
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage your project settings and configuration</CardFrameDescription>
      </CardFrameHeader>
      <Card>
        <CardPanel>Content</CardPanel>
      </Card>
    </CardFrame>
  ),
};

// The docs' canonical `CardFrame` example: an action button placed in the header via `CardFrameAction`.
export const FrameWithHeaderAction: Story = {
  render: (args) => (
    <CardFrame {...args} className="w-96">
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage your project settings and configuration</CardFrameDescription>
        <CardFrameAction>
          <Button variant="outline">
            <IconPlus />
            Add
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel>Content</CardPanel>
      </Card>
    </CardFrame>
  ),
};

// `CardFrameFooter` isn't shown in a dedicated docs example, only listed in the API reference.
export const FrameWithFooter: Story = {
  render: (args) => (
    <CardFrame {...args} className="w-96">
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage your project settings and configuration</CardFrameDescription>
      </CardFrameHeader>
      <Card>
        <CardPanel>Content</CardPanel>
      </Card>
      <CardFrameFooter>
        <p className="text-muted-foreground text-xs">Last updated 2 hours ago.</p>
      </CardFrameFooter>
    </CardFrame>
  ),
};
