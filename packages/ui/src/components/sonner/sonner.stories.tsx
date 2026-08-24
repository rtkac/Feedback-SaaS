import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';

import { Button } from '../button/button';
import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast('Event has been created.')}>Show toast</Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast('Event has been created.', {
            description: 'Monday, January 3rd at 6:00pm',
          })
        }
      >
        Show toast with description
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast('Event has been created.', {
            action: {
              label: 'Undo',
              onClick: () => {},
            },
          })
        }
      >
        Show toast with action
      </Button>
    </div>
  ),
};
