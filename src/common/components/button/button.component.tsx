import React from "react";
import type { ButtonProps } from "./button.definition";

export const Button = ({ label = "text", onClick }: ButtonProps): JSX.Element => {
  return (
    <button className="button" onClick={onClick} type="button">
      {label}
    </button>
  );
};
