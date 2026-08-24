import { IconArrowLeft, IconZoomQuestion } from '@tabler/icons-react';

import { Button } from '..';
import { Card } from '../card/card';

export const NotFoundComponent = () => {
  return (
    <Card variant="secondary" className="w-full max-w-2xl">
      <div className="grid md:grid-cols-2 py-6 px-8 gap-8">
        <Card className="flex flex-col items-center justify-center gap-4">
          <IconZoomQuestion size={100} />
          <h1 className="text-6xl font-bold">404</h1>
        </Card>
        <div className="flex flex-col gap-4 justify-center">
          <p className="text-3xl font-bold">Page Not Found</p>
          <p>
            The page you are looking for has vanished into the void. It might have been moved,
            deleted, or perhaps it never existed.
          </p>
          <Button size="lg">
            <IconArrowLeft />
            Back to home
          </Button>
        </div>
      </div>
    </Card>
  );
};
