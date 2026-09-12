import { StatusComponent } from '@feedback-saas/ui/components';
import * as Sentry from '@sentry/tanstackstart-react';
import { useEffect } from 'react';

type ErrorStatusProps = {
  error: Error;
  onReset?: () => void;
};

export const ErrorStatus = ({ error, onReset }: ErrorStatusProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <StatusComponent variant="error" onClick={onReset} />;
};
