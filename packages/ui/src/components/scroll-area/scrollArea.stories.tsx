import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from './scrollArea';

const ALICE_PARAGRAPH =
  "Just as suddenly as it had begun, the sensation stopped, leaving Alice feeling slightly disoriented. She looked around and realized that the room hadn't changed at all - it was she who had grown smaller, shrinking down to a fraction of her previous size. Alice felt herself growing larger and larger, filling up the entire room until she feared she might burst. The sensation was both thrilling and terrifying, as if she were expanding beyond the confines of her own body. She wondered if this was what it felt like to be a balloon, swelling with air until it could hold no more.";

const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    scrollFade: {
      control: { type: 'boolean' },
    },
    scrollbarGutter: {
      control: { type: 'boolean' },
    },
    fill: {
      control: { type: 'boolean' },
    },
    clampContentMinWidth: {
      control: { type: 'boolean' },
    },
    overscrollContain: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {
    scrollFade: false,
    scrollbarGutter: false,
    fill: false,
    clampContentMinWidth: true,
    overscrollContain: false,
  },
  render: (args) => (
    <ScrollArea {...args} className="h-64 w-80 rounded-md border">
      <div className="p-4">{ALICE_PARAGRAPH}</div>
    </ScrollArea>
  ),
};

export const ScrollFade: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border" scrollFade>
      <div className="p-4">{ALICE_PARAGRAPH}</div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-md border">
      <div className="flex gap-4 p-4">
        {items.map((item) => (
          <div
            className="flex h-20 w-24 shrink-0 items-center justify-center rounded-md border text-sm"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const ScrollbarGutter: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border" scrollbarGutter>
      <div className="flex flex-col gap-2 p-4">
        {items.map((item) => (
          <div className="rounded-md border p-2 text-sm" key={item}>
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothScrollbars: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border">
      <div className="w-xl p-4">{ALICE_PARAGRAPH}</div>
    </ScrollArea>
  ),
};

// Pins a footer with `mt-auto` at the bottom of a flex column that stretches to the viewport height.
export const FillViewport: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-md border" fill>
      <div className="flex h-full flex-col">
        <nav className="flex flex-col gap-1 p-2">
          {['Dashboard', 'Projects', 'Settings'].map((item) => (
            <div className="rounded-md p-2 text-sm" key={item}>
              {item}
            </div>
          ))}
        </nav>
        <footer className="mt-auto border-t p-2 text-muted-foreground text-xs">
          Signed in as jane@example.com
        </footer>
      </div>
    </ScrollArea>
  ),
};

// Stops wheel/touch scrolling from chaining into a parent scroller once the viewport hits its edge.
export const OverscrollContain: Story = {
  render: () => (
    <div className="h-80 w-80 overflow-y-auto rounded-md border p-4">
      <p className="mb-4 text-muted-foreground text-sm">
        Scroll past the nested area below—overscroll won't chain into this outer scroller.
      </p>
      <ScrollArea className="h-40 rounded-md border" overscrollContain>
        <div className="p-4">{ALICE_PARAGRAPH}</div>
      </ScrollArea>
      <div className="h-96" />
    </div>
  ),
};
