import type { ChipsItemProps } from "@q4/nimbus-ui";

export interface ChipsHookProps {
  createSuffix?: string;
  entities: string[];
  disabled?: boolean;
}

export type ChipsHookModel = [
  chips: Pick<ChipsItemProps<string>, "value" | "label" | "data" | "locked">[],
  handleAdd: (option: string) => string[],
  handleRemove: (value: string) => string[],
];
