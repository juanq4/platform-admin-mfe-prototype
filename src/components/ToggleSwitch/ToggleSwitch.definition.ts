import type { ChangeEvent } from "react";

export type ToggleSwitchProps = {
  id?: string;
  isChecked?: boolean;
  onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
};
