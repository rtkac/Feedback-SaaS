import * as Sentry from '@sentry/tanstackstart-react';
import { ErrorComponent } from '@tanstack/react-router';
import { useEffect } from 'react';

export const ErrorStatus = ({ error }: { error: Error }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h1>Error from router</h1>
      <ErrorComponent error={error} />
    </div>
  );
};
