import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

export const Button = ({
  className,
  children,
  disabled,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`  transition-colors px-4 py-2 rounded-lg uppercase text-sm font-bold ${className}
      ${
        disabled
          ? "bg-gray-300 hover:cursor-not-allowed"
          : "bg-blue-300 hover:bg-blue-400 hover:cursor-pointer"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
