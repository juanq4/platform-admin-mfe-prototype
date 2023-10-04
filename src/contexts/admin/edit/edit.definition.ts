import type { BaseComponentWithChildrenProps } from "@q4/nimbus-ui";
import type { Dispatch, SetStateAction } from "react";
import type { EntityBase } from "../../../definitions";

export type AdminEditContextProps = Pick<BaseComponentWithChildrenProps, "children" | "key">;

export interface AdminEditContextState {
  entity: EntityBase;
  setEntity: Dispatch<SetStateAction<EntityBase | null>>;
}
