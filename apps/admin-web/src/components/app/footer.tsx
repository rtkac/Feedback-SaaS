import { m } from '@/paraglide/messages';

export const Footer = () => (
  <div className="mt-8 mb-2 text-center">
    <p className="text-xs text-slate-400">{m.footerLabel({ date: new Date().getFullYear() })}</p>
  </div>
);
