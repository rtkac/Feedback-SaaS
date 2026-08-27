import * as React from 'react';

export const FieldError = ({ children }: { children: React.ReactNode }) => {
  return (
    <p data-slot="field-error" className="text-destructive-foreground text-xs mt-2">
      {children}
    </p>
  );
};
