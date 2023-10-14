import type { SelectProps } from "@q4/nimbus-ui";
import type { ChipsHookProps, ChipsHookModel } from "../useChips/useChips.definition";

export interface ComboBoxHookProps {
  createSuffix?: string;
  chipsHookProps: ChipsHookProps;
  maxSearchResultShown?: number;
  minSearchLengthShown?: number;
  options: string[];
}

export interface ComboBoxHookModel {
  allowMenuOpen: Pick<SelectProps<string>, "menuIsOpen">;
  input: string;
  filteredOptions: string[];
  chipsHook: ChipsHookModel;
  handleInputChange: (value: string) => void;
}

export enum ComboBoxDefaultSearchResults {
  Max = 20,
  Length = 2,
}
