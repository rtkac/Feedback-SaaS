import { PropsWithChildren } from 'react';

export const AdminLayout = ({ children }: PropsWithChildren) => (
  <div className="flex md:min-h-svh flex-col md:flex-row">{children}</div>
);
