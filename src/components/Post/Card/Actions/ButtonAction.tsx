import React from "react";

export interface ButtonActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonAction = ({
  children,
  onClick,
  disabled,
}: ButtonActionProps) => {
  function handleClick(e: React.SyntheticEvent): void {
    e.preventDefault();
    if (onClick) onClick();
  }

  return (
    <button
      disabled={disabled}
      onClick={(e) => handleClick(e)}
      className="hover:text-primary-600 flex gap-2 px-2 py-1 align-middle"
    >
      {children}
    </button>
  );
};
