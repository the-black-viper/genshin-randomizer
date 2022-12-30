import React, { useState } from "react";
// implementation
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isPrimary: boolean;
  label: string;
  isClicked?: boolean;
}
export function Button(props: ButtonProps) {
  const { isPrimary, label, isClicked, ...rest } = props;

  return (
    <div tabIndex={1} id="button-wrapper" role="button">
      <button
        className={`${
          isPrimary
            ? `bg-slate-50 hover:bg-slate-200 text-black ${
                isClicked ? "shadow shadow-neutral-200" : ""
              }`
            : `bg-gray-900 hover:bg-gray-800 text-white ${
                isClicked ? "bg-gray-800 shadow-inner-white" : ""
              }`
        } py-1 px-3 border-2 border-neutral-400 rounded-md font-extrabold shadow-md h-[35px]`}
        {...rest}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
