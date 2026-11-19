import type { ReactNode } from "react";
import type { FieldErrors, FieldError as RHFFieldError } from "react-hook-form";
//Global Imports
import { FieldError, FieldLabel } from "@/components/ui/field";

export const Field = ({
  label,
  name,
  errors,
  children,
}: {
  label: string;
  name: string;
  errors?: FieldErrors;
  children: ReactNode;
}) => {
  const error = errors?.[name] as RHFFieldError | undefined;

  return (
    <div className="grid gap-2">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {children}
      <FieldError errors={[error]} />
    </div>
  );
};
