import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { toast } from './toast';
import { Toaster } from './toast';

type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'loading';

const meta: Meta<{ variant: ToastVariant } & React.ComponentProps<typeof Toaster>> = {
  title: 'UI/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error', 'loading'],
    },
  },
  args: {
    variant: 'success',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ variant }) => (
    <div>
      <Button onClick={() => toast.add({ description: 'Event has been created.', type: variant })}>
        Show toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const WithDescription: Story = {
  render: ({ variant }) => (
    <div>
      <Button
        onClick={() =>
          toast.add({
            title: 'Event has been created.',
            description: 'Monday, January 3rd at 6:00pm',
            type: variant,
          })
        }
      >
        Show toast with description
      </Button>
      <Toaster />
    </div>
  ),
};

export const WithAction: Story = {
  render: ({ variant }) => (
    <div>
      <Button
        onClick={() => {
          const id = toast.add({
            title: 'Event has been created.',
            type: variant,
            actionProps: {
              children: 'Undo',
              onClick() {
                toast.close(id);
              },
            },
          });
        }}
      >
        Show toast with action
      </Button>
      <Toaster />
    </div>
  ),
};
