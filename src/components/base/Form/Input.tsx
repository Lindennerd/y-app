import { type InputHTMLAttributes } from "react";

export type InputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; error?: string };

export const Input = (props: InputProps) => {
  return (
    <div className="flex w-full flex-1 flex-col">
      {props.label && <label>{props.label}</label>}
      <input
        {...props}
        className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          props.className
        } ${props.error ? "border-red-500" : ""}`}
      />
      {props.error && (
        <span className="text-sm text-red-500">{props.error}</span>
      )}
    </div>
  );
};
