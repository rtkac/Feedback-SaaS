import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { AnchoredToastProvider, anchoredToastManager, ToastProvider, toastManager } from './toast';

const meta: Meta<typeof ToastProvider> = {
  title: 'UI/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
    position: {
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <Button onClick={() => toastManager.add({ title: 'Event has been created.' })}>
        Show toast
      </Button>
    </ToastProvider>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ToastProvider>
      <Button
        onClick={() =>
          toastManager.add({
            title: 'Event has been created.',
            description: 'Monday, January 3rd at 6:00pm',
          })
        }
      >
        Show toast with description
      </Button>
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Button
        onClick={() =>
          toastManager.add({
            title: 'Event has been created.',
            actionProps: {
              children: 'Undo',
              onClick: () => {},
            },
          })
        }
      >
        Show toast with action
      </Button>
    </ToastProvider>
  ),
};

export const Types: Story = {
  render: () => (
    <ToastProvider>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toastManager.add({ title: 'Saved successfully.', type: 'success' })}>
          Success
        </Button>
        <Button onClick={() => toastManager.add({ title: 'Something went wrong.', type: 'error' })}>
          Error
        </Button>
        <Button onClick={() => toastManager.add({ title: 'Heads up.', type: 'warning' })}>
          Warning
        </Button>
        <Button onClick={() => toastManager.add({ title: 'For your information.', type: 'info' })}>
          Info
        </Button>
        <Button
          onClick={() => toastManager.add({ title: 'Loading...', type: 'loading', timeout: 0 })}
        >
          Loading
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const WithPromise: Story = {
  render: () => (
    <ToastProvider>
      <Button
        onClick={() =>
          toastManager.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'Loading...',
            success: 'Data loaded successfully.',
            error: 'Something went wrong.',
          })
        }
      >
        Show promise toast
      </Button>
    </ToastProvider>
  ),
};

export const Anchored: Story = {
  render: () => (
    <AnchoredToastProvider>
      <Button
        onClick={(e) =>
          anchoredToastManager.add({
            title: 'Saved',
            positionerProps: { anchor: e.currentTarget },
          })
        }
      >
        Show anchored toast
      </Button>
    </AnchoredToastProvider>
  ),
};
