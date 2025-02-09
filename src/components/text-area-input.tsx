import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaInputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
}

export const TextAreaInput = ({ className, ...props }: TextAreaInputProps) => {
  return (
    <textarea
      className={`border-2 border-gray-600 rounded-lg px-2 ${className}`}
      {...props}
    />
  );
};
