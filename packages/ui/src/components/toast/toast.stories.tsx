import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { toast } from './toast';
import { Toaster } from './toast';

type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';

const meta: Meta<{ variant: ToastVariant } & React.ComponentProps<typeof Toaster>> = {
  title: 'UI/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error', 'loading'],
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ variant }) => (
    <div>
      <Button
        onClick={() =>
          toast.add({
            description: 'Event has been created.',
            type: variant === 'default' ? undefined : variant,
          })
        }
      >
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
            type: variant === 'default' ? undefined : variant,
          })
        }
      >
        Show toast with description
      </Button>
      <Toaster />
    </div>
  ),
};

// Matches the docs' "Types" section: each button shows the icon associated with its status.
export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'success', 'info', 'warning', 'error', 'loading'] as const).map((type) => (
        <Button
          key={type}
          onClick={() =>
            toast.add({
              title: 'Event has been created.',
              type: type === 'default' ? undefined : type,
            })
          }
          variant="outline"
        >
          {type[0]?.toUpperCase()}
          {type.slice(1)}
        </Button>
      ))}
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
            type: variant === 'default' ? undefined : variant,
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

// `toast.promise` moves a single toast through loading, success, and error states.
export const Promise: Story = {
  render: () => (
    <div>
      <Button
        onClick={() => {
          const createEvent = new globalThis.Promise<string>((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.5) {
                resolve('Monday, January 3rd at 6:00pm');
              } else {
                reject(new Error('Network error'));
              }
            }, 1500);
          });

          toast.promise(createEvent, {
            loading: 'Creating event…',
            success: (data) => `Event created for ${data}`,
            error: (error) => `Failed to create event: ${error.message}`,
          });
        }}
      >
        Create event
      </Button>
      <Toaster />
    </div>
  ),
};

// Adding a toast with an existing `id` updates it in place instead of creating a duplicate.
export const Update: Story = {
  render: () => {
    const draftToastId = 'draft-toast';

    return (
      <div>
        <Button
          onClick={() => {
            toast.add({
              id: draftToastId,
              title: 'Saving draft…',
              type: 'loading',
            });

            setTimeout(() => {
              toast.update(draftToastId, {
                title: 'Draft saved',
                type: 'success',
              });
            }, 1500);
          }}
        >
          Save draft
        </Button>
        <Toaster />
      </div>
    );
  },
};

// `timeout: 0` keeps a toast open until the user closes it manually, instead of auto-dismissing.
export const Persistent: Story = {
  render: () => (
    <div>
      <Button
        onClick={() =>
          toast.add({
            title: 'Update available',
            description: 'This toast stays open until you close it.',
            timeout: 0,
          })
        }
      >
        Show persistent toast
      </Button>
      <Toaster />
    </div>
  ),
};

// `toast.close()` without an id dismisses every currently visible toast at once.
export const CloseAll: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          toast.add({ description: 'First toast' });
          toast.add({ description: 'Second toast' });
          toast.add({ description: 'Third toast' });
        }}
        variant="outline"
      >
        Show 3 toasts
      </Button>
      <Button onClick={() => toast.close()} variant="destructive-outline">
        Close all
      </Button>
      <Toaster />
    </div>
  ),
};
