"use client";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type IInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: IInputProps<T>) => {
  const hasError = !!errors[id];

  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute inset-e-3 top-5 text-2xl text-neutral-700">
          ریال
        </span>
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light
          text-start outline-none transition
          disabled:cursor-not-allowed disabled:opacity-70
          ${formatPrice ? "pe-16" : "pe-4"}
          ${hasError ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}
        `}
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none absolute inset-s-4 top-5 z-10
          origin-top-right ltr:origin-top-left
          -translate-y-4 scale-75 transform text-base duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${hasError ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};
