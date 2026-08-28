import { InputGroup, InputGroupAddon, InputGroupInput } from '@feedback-saas/ui/components';
import { IconSearch, IconMenu2, IconBell } from '@tabler/icons-react';

type TopNavigationProps = {
  toggleSidebar: () => void;
};

export const TopNavigation = ({ toggleSidebar }: TopNavigationProps) => (
  <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 glass-effect lg:px-8 dark:border-dark-border dark:bg-dark-bg/80">
    <div className="flex items-center gap-4">
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-white/5 border"
      >
        <IconMenu2 />
      </button>
      <InputGroup>
        <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
        <InputGroupAddon>
          <IconSearch aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>

    <div className="flex items-center gap-3">
      <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-dark-border dark:text-slate-400 dark:hover:bg-white/5">
        <IconBell />
        <span className="absolute right-0 top-0 mr-0.5 mt-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-bg"></span>
      </button>
    </div>
  </header>
);
