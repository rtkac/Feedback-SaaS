import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/_admin-layout/workspace/')({
  beforeLoad: () => {
    throw Route.redirect({ to: '/' });
  },
});
