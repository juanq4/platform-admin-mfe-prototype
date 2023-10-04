import { ButtonIdModel } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";

export interface CopyButtonProps extends Pick<BaseComponentProps, "id" | "key"> {
  value: string;
  label: string;
}

export enum CopyButtonClassName {
  Base = "copy-button",
}

export const CopyButtonDefault = {
  Label: "value",
};

export { ButtonIdModel as CopyButtonIdModel };
