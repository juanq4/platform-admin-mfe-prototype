import { isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { useState, useMemo, useCallback } from "react";
import { useChips } from "../useChips/useChips.hook";
import { ComboBoxDefaultSearchResults } from "./useComboBox.definition";
import type { ComboBoxHookProps, ComboBoxHookModel } from "./useComboBox.definition";

export const useComboBox = (props: ComboBoxHookProps): ComboBoxHookModel => {
  const { createSuffix, options: optionsProp, chipsHookProps, maxSearchResultShown, minSearchLengthShown } = props;
  const { entities, disabled } = chipsHookProps || {};

  const useChipsProps = useMemo(() => ({ entities, createSuffix, disabled }), [createSuffix, disabled, entities]);

  const chipsHook = useChips(useChipsProps);

  const [input, setInput] = useState<string>();

  const allowMenuOpen = useMemo(() => {
    const maxShown = maxSearchResultShown || ComboBoxDefaultSearchResults.Max;
    const searchLength = minSearchLengthShown || ComboBoxDefaultSearchResults.Length;
    if (!isEmpty(entities) && entities.length < maxShown && isNullOrWhiteSpace(createSuffix)) return null;
    return {
      menuIsOpen: !isNullOrWhiteSpace(input) && input.length > searchLength,
    };
  }, [createSuffix, entities, input, maxSearchResultShown, minSearchLengthShown]);

  const selectOptions = useMemo((): string[] => {
    const options = optionsProp ?? [];

    if (isEmpty(options) && !isNullOrWhiteSpace(input) && !isNullOrWhiteSpace(createSuffix)) {
      return [`${input}${createSuffix}`];
    }

    if (isNullOrWhiteSpace(input) || isNullOrWhiteSpace(createSuffix) || typeof options?.[0] !== "string") return options;
    if (options.some((x) => x === input)) return options;

    return [`${input}${createSuffix}`, ...options];
  }, [createSuffix, input, optionsProp]);

  const filteredOptions = useMemo((): string[] => {
    const { entities: selected } = useChipsProps;
    if (isEmpty(selected)) return selectOptions;

    return selectOptions.filter((x: string) => !selected.some((y: string) => x === y));
  }, [selectOptions, useChipsProps]);

  const handleInputChange = useCallback((value: string): void => {
    setInput(value);
  }, []);

  return { allowMenuOpen, input, filteredOptions, chipsHook, handleInputChange };
};
