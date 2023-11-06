import { type ButtonHTMLAttributes } from "react";

export type ButtonProps = React.DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-primary-600 hover:bg-primary-700 border-primary-700 rounded-md border p-2 text-white transition duration-200 ease-in-out"
      {...props}
    ></button>
  );
};
