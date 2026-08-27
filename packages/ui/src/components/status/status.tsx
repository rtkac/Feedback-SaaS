import {
  IconAlertTriangle,
  IconArrowLeft,
  IconRefresh,
  IconFilter2Search,
  IconProps,
  IconX,
  IconZoomQuestion,
} from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';
import { Button } from '../button/button';
import { Card } from '../card/card';

const statusVariants = cva('', {
  variants: {
    variant: {
      error: '',
      notFound: '',
      empty: '',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

type StatusVariant = NonNullable<VariantProps<typeof statusVariants>['variant']>;

const statusIcons: Record<StatusVariant, React.ComponentType<IconProps>> = {
  error: IconAlertTriangle,
  notFound: IconZoomQuestion,
  empty: IconFilter2Search,
};

const statusContent: Record<
  StatusVariant,
  {
    title: string;
    description: string;
    action?: (onClick?: () => void) => React.ReactNode;
  }
> = {
  error: {
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again or come back later.',
    action: (onClick?: () => void) =>
      onClick && (
        <Button size="lg" onClick={onClick}>
          <IconRefresh />
          Retry
        </Button>
      ),
  },
  notFound: {
    title: 'Page Not Found',
    description:
      'The page you are looking for has vanished into the void. It might have been moved, deleted, or perhaps it never existed.',
    action: (onClick?: () => void) =>
      onClick && (
        <Button size="lg" onClick={onClick}>
          <IconArrowLeft />
          Back to back
        </Button>
      ),
  },
  empty: {
    title: 'Nothing Here Yet',
    description: 'There is no data to display at the moment.',
    action: (onClick?: () => void) =>
      onClick && (
        <Button size="lg" onClick={onClick}>
          <IconX />
          Reset search
        </Button>
      ),
  },
};

export interface StatusProps
  extends Omit<React.ComponentProps<'div'>, 'title'>, VariantProps<typeof statusVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const StatusComponent = ({
  className,
  variant = 'error',
  title,
  description,
  icon,
  onClick,
  ...props
}: StatusProps) => {
  const resolvedVariant = variant ?? 'error';
  const Icon = statusIcons[resolvedVariant];
  const content = statusContent[resolvedVariant];

  return (
    <Card className={cn('w-full max-w-2xl', className)} {...props}>
      <div className="grid md:grid-cols-2 py-6 px-8 gap-8">
        <Card className="flex flex-col items-center justify-center gap-4">
          {icon ?? <Icon size={120} />}
        </Card>
        <div className="flex flex-col gap-4 justify-center">
          {title ?? <p className="text-3xl font-bold">{content.title}</p>}
          {description ?? <p>{content.description}</p>}
          {content.action?.(onClick)}
        </div>
      </div>
    </Card>
  );
};
