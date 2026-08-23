import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';

const boxVariants = cva(
  'flex flex-col shadow-shadow border-2 gap-6 p-3 border-border text-foreground font-base',
  {
    variants: {
      variant: {
        default: 'bg-white',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary text-tertiary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Box({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof boxVariants>) {
  return <div data-slot="box" className={cn(boxVariants({ variant, className }))} {...props} />;
}

export { Box };
