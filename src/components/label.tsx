import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text: string;
  className?: string;
}

export const Label = ({ htmlFor, text, className, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm uppercase text-gray-600 font-bold ${className} `}
      {...props}
    >
      {text}
    </label>
  );
};
