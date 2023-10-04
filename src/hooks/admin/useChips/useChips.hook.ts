import type { ChipsItemProps } from "@q4/nimbus-ui";
import { isEmpty } from "@q4/nimbus-ui";
import { useCallback, useMemo } from "react";
import type { ChipsHookProps, ChipsHookModel } from "./useChips.definition";

export const useChips = (props: ChipsHookProps): ChipsHookModel => {
  const { createSuffix, disabled, entities } = props;

  // chips
  const chips: ChipsItemProps<string>[] = useMemo(() => {
    if (isEmpty(entities)) return [];

    return entities.reduce((mapped, entity) => {
      if (isEmpty(entity)) return mapped;

      mapped.push({
        value: entity,
        label: entity,
        locked: !!disabled,
      });
      return mapped;
    }, []);
  }, [disabled, entities]);

  const handleRemove = useCallback(
    (value: string): string[] => {
      if (isEmpty(entities)) return [];
      return entities.filter((x) => x !== value);
    },
    [entities],
  );

  // ComboBox
  function handleAdd(entity: string): string[] {
    if (isEmpty(entity)) return;

    const value = entity.indexOf(createSuffix) > -1 ? entity.slice(0, entity.indexOf(createSuffix)) : entity;
    return isEmpty(entities) ? [value] : entities?.concat(value);
  }

  return [chips, handleAdd, handleRemove];
};
