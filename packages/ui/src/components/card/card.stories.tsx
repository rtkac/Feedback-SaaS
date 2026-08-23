import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: ({ variant }) => (
    <Card variant={variant}>
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">Card title</h1>
        </CardTitle>
        <CardDescription>
          <p>Card description</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
    </Card>
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card content',
    variant: 'default',
  },
};
