import { type ButtonHTMLAttributes } from "react";

export type ButtonProps = React.DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-primary-600 hover:bg-primary-700 border-primary-700 flex justify-center gap-2 rounded-md border p-2 text-center
       text-white transition duration-200 ease-in-out ${props.className}`}
    ></button>
  );
};
