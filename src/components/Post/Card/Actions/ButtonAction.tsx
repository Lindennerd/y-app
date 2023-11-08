import React from "react";

export const ButtonAction = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="hover:text-primary-600 flex gap-2 px-2 py-1 align-middle">
      {children}
    </button>
  );
};
