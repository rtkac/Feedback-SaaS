import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/_appShell/w/')({
  beforeLoad: () => {
    throw redirect({ to: '/' });
  },
});
