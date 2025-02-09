import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

export const TextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <input
      className={`border-2 border-gray-600 rounded-lg px-2 ${className}`}
      {...props}
    />
  );
};
