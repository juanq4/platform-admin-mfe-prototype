import React, { createContext, useState } from "react";
import type { EntityBase } from "../../definitions/entity.definition";
import type { AdminEditContextProps, AdminEditContextState } from "./edit.definition";

export const AdminEditContext = createContext<Partial<AdminEditContextState>>({});

export const AdminEditProvider = (props: AdminEditContextProps): JSX.Element => {
  const [entity, setEntity] = useState<EntityBase>();

  return <AdminEditContext.Provider value={{ entity, setEntity }}>{props.children}</AdminEditContext.Provider>;
};
