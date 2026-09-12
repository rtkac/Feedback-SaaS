import { Card, CardPanel } from '@feedback-saas/ui/components';
import { PropsWithChildren } from 'react';

import { Footer } from './footer';

export const Main = ({ children }: PropsWithChildren) => (
  <Card className="flex flex-1 m-2">
    <CardPanel>
      <main>{children}</main>
    </CardPanel>
    <Footer />
  </Card>
);
