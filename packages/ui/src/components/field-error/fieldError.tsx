export const FieldError = ({ children }: { children: React.ReactNode }) => {
  return (
    <p data-slot="field-error" className="text-sm font-base text-destructive-foreground mt-1">
      {children}
    </p>
  );
};
