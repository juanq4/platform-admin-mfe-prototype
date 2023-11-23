import { isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { AdminEditContext } from "../../contexts/edit/edit.context";
import type { AdminEditContextState } from "../../contexts/edit/edit.definition";
import type { EntityBase, EntityModel } from "../../definitions/entity.definition";

export const useAdminEditContext = <T extends EntityBase>(
  model: EntityModel<T>,
  id: EntityBase["id"],
): { entity: T; setEntity: AdminEditContextState["setEntity"] } => {
  const { entity: original, setEntity } = useContext(AdminEditContext);

  const validateContext = useCallback(
    (context: EntityBase): T => {
      if (isEmpty(context) || isNullOrWhiteSpace(id) || isEmpty(model)) return null;

      if (!(context instanceof model)) return null;

      if (context.id !== id) return null;

      return context;
    },
    [id, model],
  );
  const entity = useMemo(() => validateContext(original), [original, validateContext]);

  useEffect(() => {
    // clean out the context on first mount
    setEntity?.(null);
  }, [setEntity]);

  return { entity, setEntity };
};
